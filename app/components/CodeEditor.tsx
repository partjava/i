'use client';

import React, { useState } from 'react';
import { Button, Select, Card, Input, Alert } from 'antd';
import { PlayCircleOutlined, ClearOutlined, CodeOutlined, SaveOutlined } from '@ant-design/icons';

const { TextArea } = Input;

interface CodeEditorProps {
  className?: string;
  height?: string;
}

// 代码模板
const codeTemplates = {
  python: {
    'hello-world': 'print("Hello, World!")',
    'input-output': 'name = input("请输入您的姓名: ")\nprint(f"你好, {name}!")',
    'loop': 'for i in range(5):\n    print(f"数字: {i}")',
    'function': 'def greet(name):\n    return f"Hello, {name}!"\n\nresult = greet("World")\nprint(result)',
    'class': 'class Person:\n    def __init__(self, name):\n        self.name = name\n    \n    def greet(self):\n        return f"Hello, I am {self.name}"\n\nperson = Person("Alice")\nprint(person.greet())'
  },
  javascript: {
    'hello-world': 'console.log("Hello, World!");',
    'function': 'function greet(name) {\n    return `Hello, ${name}!`;\n}\n\nconsole.log(greet("World"));',
    'array': 'const numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(n => n * 2);\nconsole.log(doubled);',
    'async': 'async function fetchData() {\n    try {\n        // 模拟异步操作\n        await new Promise(resolve => setTimeout(resolve, 1000));\n        return "数据获取成功";\n    } catch (error) {\n        console.error("错误:", error);\n    }\n}\n\nfetchData().then(console.log);'
  },
  cpp: {
    'hello-world': '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}',
    'input-output': '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cout << "请输入两个数字: ";\n    cin >> a >> b;\n    cout << "和为: " << a + b << endl;\n    return 0;\n}',
    'vector': '#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> nums = {1, 2, 3, 4, 5};\n    \n    for(int num : nums) {\n        cout << num << " ";\n    }\n    cout << endl;\n    \n    return 0;\n}',
    'competitive': '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    // 你的代码\n    \n    return 0;\n}'
  },
  java: {
    'hello-world': 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
    'input-output': 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        System.out.print("请输入您的姓名: ");\n        String name = scanner.nextLine();\n        System.out.println("你好, " + name + "!");\n        scanner.close();\n    }\n}',
    'class': 'class Person {\n    private String name;\n    \n    public Person(String name) {\n        this.name = name;\n    }\n    \n    public String greet() {\n        return "Hello, I am " + name;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Person person = new Person("Alice");\n        System.out.println(person.greet());\n    }\n}'
  },
  go: {
    'hello-world': 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}',
    'input-output': 'package main\n\nimport (\n    "fmt"\n)\n\nfunc main() {\n    var name string\n    fmt.Print("请输入您的姓名: ")\n    fmt.Scanln(&name)\n    fmt.Printf("你好, %s!\\n", name)\n}',
    'goroutine': 'package main\n\nimport (\n    "fmt"\n    "time"\n)\n\nfunc worker(id int) {\n    fmt.Printf("Worker %d 开始工作\\n", id)\n    time.Sleep(time.Second)\n    fmt.Printf("Worker %d 完成工作\\n", id)\n}\n\nfunc main() {\n    for i := 1; i <= 3; i++ {\n        go worker(i)\n    }\n    time.Sleep(2 * time.Second)\n    fmt.Println("所有工作完成")\n}'
  },
  c: {
    'hello-world': '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
    'input-output': '#include <stdio.h>\n\nint main() {\n    int a, b;\n    printf("请输入两个数字: ");\n    scanf("%d %d", &a, &b);\n    printf("和为: %d\\n", a + b);\n    return 0;\n}'
  },
  php: {
    'hello-world': '<?php\necho "Hello, World!\\n";\n?>',
    'input-output': '<?php\necho "请输入您的姓名: ";\n$name = trim(fgets(STDIN));\necho "你好, " . $name . "!\\n";\n?>'
  }
} as const;

const CodeEditor: React.FC<CodeEditorProps> = ({
  className = '',
  height = '400px'
}) => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // 支持的编程语言
  const languages = [
    { value: 'python', label: 'Python' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'c', label: 'C' },
    { value: 'go', label: 'Go' },
    { value: 'php', label: 'PHP' },
  ];

  // 加载代码模板
  const loadTemplate = (templateKey: string) => {
    const languageTemplates = codeTemplates[language as keyof typeof codeTemplates];
    if (languageTemplates && templateKey in languageTemplates) {
      const template = languageTemplates[templateKey as keyof typeof languageTemplates];
      setCode(template);
      setOutput('');
    }
  };

  // 获取当前语言的模板选项
  const getTemplateOptions = () => {
    const templates = codeTemplates[language as keyof typeof codeTemplates];
    if (!templates) return [];
    
    return Object.keys(templates).map(key => ({
      value: key,
      label: {
        'hello-world': 'Hello World',
        'input-output': '输入输出',
        'loop': '循环示例',
        'function': '函数示例',
        'class': '类示例',
        'array': '数组操作',
        'async': '异步操作',
        'vector': '向量操作',
        'competitive': '竞赛模板',
        'goroutine': '协程示例'
      }[key as keyof typeof templates] || key
    }));
  };

  // 真正运行代码
  const runCode = async () => {
    if (!code.trim()) {
      setOutput('错误：请输入代码');
      return;
    }

    setIsRunning(true);
    setOutput('正在运行...');

    try {
      const response = await fetch('/api/execute-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code,
          language: language,
          input: input
        }),
      });

      const result = await response.json();

      if (result.success) {
        const outputText = `代码执行完成！

语言: ${languages.find(l => l.value === language)?.label}
状态: ${result.status}
执行时间: ${result.time}秒
内存使用: ${result.memory}KB
输入数据: ${input || '无'}

输出结果:
${result.output || '(无输出)'}`;
        
        if (result.error) {
          setOutput(outputText + `\n\n错误信息:\n${result.error}`);
        } else {
          setOutput(outputText);
        }
      } else {
        setOutput(`执行失败！

错误信息:
${result.error}`);
      }
    } catch (error) {
      setOutput(`执行失败！

网络错误: ${error instanceof Error ? error.message : '未知错误'}`);
    } finally {
      setIsRunning(false);
    }
  };

  // 清空所有内容
  const clearAll = () => {
    setCode('');
    setInput('');
    setOutput('');
  };

  // 保存代码为笔记
  const saveCodeAsNote = async () => {
    if (!code.trim()) {
      alert('请输入代码后再保存');
      return;
    }

    setIsSaving(true);
    try {
      const noteContent = `# ${language.toUpperCase()} 代码

## 代码内容
\`\`\`${language}
${code}
\`\`\`

${input ? `## 输入数据
\`\`\`
${input}
\`\`\`
` : ''}

${output ? `## 运行结果
\`\`\`
${output}
\`\`\`
` : ''}

---
*通过在线代码编辑器创建于 ${new Date().toLocaleString()}*`;

      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          title: `${language.toUpperCase()} 代码片段 - ${new Date().toLocaleDateString()}`,
          content: noteContent,
          category: 'programming',
          tags: [language, 'code', 'programming']
        }),
      });

      if (response.ok) {
        alert('代码已保存为笔记！');
      } else {
        alert('保存失败，请重试');
      }
    } catch (error) {
      console.error('保存错误:', error);
      alert('保存失败，请重试');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg ${className}`}>
      {/* 工具栏 */}
      <div className="bg-gray-50 border-b border-gray-200 p-3 md:p-4">
        <div className="flex items-center justify-between flex-wrap gap-2 md:gap-4">
          <div className="flex items-center gap-2 md:gap-4 flex-wrap">
            <CodeOutlined className="text-blue-600 text-lg hidden md:block" />
            <Select
              value={language}
              onChange={setLanguage}
              className="w-24 md:w-32"
              options={languages}
              size="small"
            />
            <Button
              type="primary"
              icon={<PlayCircleOutlined />}
              onClick={runCode}
              loading={isRunning}
              disabled={!code.trim()}
              size="small"
              className="flex-shrink-0"
            >
              <span className="hidden sm:inline">运行代码</span>
              <span className="sm:hidden">运行</span>
            </Button>
          </div>
          <div className="flex items-center gap-1 md:gap-2 flex-wrap">
            <Select
              placeholder="模板"
              className="w-20 md:w-32"
              onChange={loadTemplate}
              options={getTemplateOptions()}
              allowClear
              size="small"
            />
            <Button
              icon={<SaveOutlined />}
              onClick={saveCodeAsNote}
              loading={isSaving}
              disabled={!code.trim()}
              size="small"
              className="flex-shrink-0"
            >
              <span className="hidden sm:inline">保存</span>
            </Button>
            <Button
              icon={<ClearOutlined />}
              onClick={clearAll}
              size="small"
              className="flex-shrink-0"
            >
              <span className="hidden sm:inline">清空</span>
            </Button>
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-3 md:gap-4 p-3 md:p-4">
        {/* 代码编辑器 */}
        <div className="flex-1">
          <div className="mb-2">
            <span className="text-sm font-medium text-gray-700">代码编辑器</span>
          </div>
          <TextArea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={`请输入${languages.find(l => l.value === language)?.label}代码...

示例：
print("Hello, World!")
for i in range(5):
    print(f"数字: {i}")`}
            className="font-mono text-sm"
            style={{ 
              height: typeof window !== 'undefined' && window.innerWidth < 1024 ? '250px' : height, 
              minHeight: typeof window !== 'undefined' && window.innerWidth < 1024 ? '200px' : '300px' 
            }}
            autoSize={false}
          />
        </div>

        {/* 输入输出区域 */}
        <div className="flex-1 space-y-3 md:space-y-4">
          {/* 输入区域 */}
          <div>
            <div className="mb-2">
              <span className="text-sm font-medium text-gray-700">输入数据</span>
            </div>
            <TextArea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="如果程序需要输入数据，请在这里输入..."
              rows={typeof window !== 'undefined' && window.innerWidth < 1024 ? 4 : 6}
              className="font-mono text-sm"
            />
          </div>

          {/* 输出区域 */}
          <div>
            <div className="mb-2">
              <span className="text-sm font-medium text-gray-700">运行结果</span>
            </div>
            <div 
              className="bg-gray-900 text-green-400 p-3 md:p-4 rounded font-mono text-sm overflow-auto custom-scrollbar"
              style={{ 
                height: typeof window !== 'undefined' && window.innerWidth < 1024 ? '200px' : `calc(${height} - 200px)`, 
                minHeight: typeof window !== 'undefined' && window.innerWidth < 1024 ? '150px' : '200px' 
              }}
            >
              {output ? (
                <pre className="whitespace-pre-wrap text-xs md:text-sm">{output}</pre>
              ) : (
                <div className="text-gray-500 text-xs md:text-sm">点击运行按钮查看结果...</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 底部提示 */}
      <div className="bg-green-50 border-t border-green-200 p-3">
        <Alert
          message="在线代码执行器"
          description="支持Python、JavaScript、Java、C++、C、Go、PHP等语言的在线编译和执行。安全沙箱环境，10秒执行超时。"
          type="success"
          showIcon
          className="border-none bg-transparent"
        />
      </div>
    </div>
  );
};

export default CodeEditor;
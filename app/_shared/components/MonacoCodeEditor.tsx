'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button, Select, Input, Alert, message, Tooltip, Spin } from 'antd';
import { 
  PlayCircleOutlined, 
  ClearOutlined, 
  CodeOutlined, 
  SaveOutlined,
  CopyOutlined,
  DownloadOutlined,
  FullscreenOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import dynamic from 'next/dynamic';

// 动态导入Monaco编辑器，减少初始加载大小
const Editor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center" style={{ height: '400px' }}>
      <Spin 
        indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} 
        tip="编辑器加载中，请稍候..." 
      />
    </div>
  )
});

import { useStandaloneExecution } from './useStandaloneExecution';
import InlineCodePatchModal, { CodePatchData } from './InlineCodePatchModal';
import VisualExecutionTracePlayer from './VisualExecutionTracePlayer';
import { emitPetCompanionEvent } from '@shared/lib/pet-companion-bus';
import { Sparkles, Terminal, Cpu } from 'lucide-react';

const { TextArea } = Input;

interface MonacoCodeEditorProps {
  className?: string;
  height?: string;
}

// Monaco Editor 语言映射
const monacoLanguageMap: { [key: string]: string } = {
  'python': 'python',
  'javascript': 'javascript',
  'java': 'java',
  'cpp': 'cpp',
  'c': 'c',
  'csharp': 'csharp',
  'go': 'go',
  'rust': 'rust',
  'php': 'php',
  'ruby': 'ruby',
  'swift': 'swift',
  'kotlin': 'kotlin',
  'typescript': 'typescript',
};

// 代码模板
const codeTemplates = {
  python: {
    'hello-world': 'print("Hello, World!")',
    'input-output': 'name = input("请输入您的姓名: ")\nprint(f"你好, {name}!")',
    'loop': 'for i in range(5):\n    print(f"数字: {i}")',
    'function': 'def greet(name):\n    return f"Hello, {name}!"\n\nresult = greet("World")\nprint(result)',
    'class': 'class Person:\n    def __init__(self, name):\n        self.name = name\n    \n    def greet(self):\n        return f"Hello, I am {self.name}"\n\nperson = Person("Alice")\nprint(person.greet())',
    'algorithm': '# 快速排序算法\ndef quicksort(arr):\n    if len(arr) <= 1:\n        return arr\n    \n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    \n    return quicksort(left) + middle + quicksort(right)\n\n# 测试\narr = [3, 6, 8, 10, 1, 2, 1]\nprint("原数组:", arr)\nprint("排序后:", quicksort(arr))'
  },
  javascript: {
    'hello-world': 'console.log("Hello, World!");',
    'function': 'function greet(name) {\n    return `Hello, ${name}!`;\n}\n\nconsole.log(greet("World"));',
    'array': 'const numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(n => n * 2);\nconsole.log("原数组:", numbers);\nconsole.log("翻倍后:", doubled);',
    'async': 'async function fetchData() {\n    try {\n        // 模拟异步操作\n        await new Promise(resolve => setTimeout(resolve, 1000));\n        return "数据获取成功";\n    } catch (error) {\n        console.error("错误:", error);\n    }\n}\n\nfetchData().then(console.log);',
    'class': 'class Person {\n    constructor(name) {\n        this.name = name;\n    }\n    \n    greet() {\n        return `Hello, I am ${this.name}`;\n    }\n}\n\nconst person = new Person("Alice");\nconsole.log(person.greet());'
  },
  cpp: {
    'hello-world': '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}',
    'input-output': '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cout << "请输入两个数字: ";\n    cin >> a >> b;\n    cout << "和为: " << a + b << endl;\n    return 0;\n}',
    'vector': '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<int> nums = {5, 2, 8, 1, 9};\n    \n    cout << "原数组: ";\n    for(int num : nums) {\n        cout << num << " ";\n    }\n    cout << endl;\n    \n    sort(nums.begin(), nums.end());\n    \n    cout << "排序后: ";\n    for(int num : nums) {\n        cout << num << " ";\n    }\n    cout << endl;\n    \n    return 0;\n}',
    'competitive': '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    cin >> n;\n    \n    // 你的代码\n    \n    return 0;\n}',
    'class': '#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Person {\nprivate:\n    string name;\n    int age;\n\npublic:\n    Person(string n, int a) : name(n), age(a) {}\n    \n    void introduce() {\n        cout << "我是 " << name << "，今年 " << age << " 岁" << endl;\n    }\n};\n\nint main() {\n    Person person("小明", 20);\n    person.introduce();\n    return 0;\n}'
  },
  java: {
    'hello-world': 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
    'input-output': 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        System.out.print("请输入您的姓名: ");\n        String name = scanner.nextLine();\n        System.out.println("你好, " + name + "!");\n        scanner.close();\n    }\n}',
    'array': 'import java.util.Arrays;\n\npublic class Main {\n    public static void main(String[] args) {\n        int[] numbers = {5, 2, 8, 1, 9};\n        \n        System.out.println("原数组: " + Arrays.toString(numbers));\n        \n        Arrays.sort(numbers);\n        \n        System.out.println("排序后: " + Arrays.toString(numbers));\n    }\n}',
    'class': 'class Person {\n    private String name;\n    private int age;\n    \n    public Person(String name, int age) {\n        this.name = name;\n        this.age = age;\n    }\n    \n    public void introduce() {\n        System.out.println("我是 " + name + "，今年 " + age + " 岁");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Person person = new Person("小明", 20);\n        person.introduce();\n    }\n}'
  },
  go: {
    'hello-world': 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}',
    'input-output': 'package main\n\nimport (\n    "fmt"\n)\n\nfunc main() {\n    var name string\n    fmt.Print("请输入您的姓名: ")\n    fmt.Scanln(&name)\n    fmt.Printf("你好, %s!\\n", name)\n}',
    'slice': 'package main\n\nimport (\n    "fmt"\n    "sort"\n)\n\nfunc main() {\n    numbers := []int{5, 2, 8, 1, 9}\n    \n    fmt.Println("原切片:", numbers)\n    \n    sort.Ints(numbers)\n    \n    fmt.Println("排序后:", numbers)\n}',
    'goroutine': 'package main\n\nimport (\n    "fmt"\n    "time"\n)\n\nfunc worker(id int, jobs <-chan int, results chan<- int) {\n    for j := range jobs {\n        fmt.Printf("Worker %d 处理任务 %d\\n", id, j)\n        time.Sleep(time.Second)\n        results <- j * 2\n    }\n}\n\nfunc main() {\n    jobs := make(chan int, 100)\n    results := make(chan int, 100)\n    \n    // 启动3个worker\n    for w := 1; w <= 3; w++ {\n        go worker(w, jobs, results)\n    }\n    \n    // 发送5个任务\n    for j := 1; j <= 5; j++ {\n        jobs <- j\n    }\n    close(jobs)\n    \n    // 收集结果\n    for a := 1; a <= 5; a++ {\n        <-results\n    }\n}'
  },
  c: {
    'hello-world': '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
    'input-output': '#include <stdio.h>\n\nint main() {\n    int a, b;\n    printf("请输入两个数字: ");\n    scanf("%d %d", &a, &b);\n    printf("和为: %d\\n", a + b);\n    return 0;\n}'
  },
  php: {
    'hello-world': '<?php\necho "Hello, World!\\n";\n?>',
    'input-output': '<?php\necho "请输入您的姓名: ";\n$name = trim(fgets(STDIN));\necho "你好, " . $name . "!\\n";\n?>'
  },
  rust: {
    'hello-world': 'fn main() {\n    println!("Hello, World!");\n}',
    'input-output': 'use std::io;\n\nfn main() {\n    println!("请输入您的姓名: ");\n    let mut name = String::new();\n    io::stdin().read_line(&mut name).expect("读取失败");\n    println!("你好, {}!", name.trim());\n}'
  },
  csharp: {
    'hello-world': 'using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World!");\n    }\n}',
    'input-output': 'using System;\n\nclass Program {\n    static void Main() {\n        Console.Write("请输入您的姓名: ");\n        string name = Console.ReadLine();\n        Console.WriteLine($"你好, {name}!");\n    }\n}'
  },
  typescript: {
    'hello-world': 'console.log("Hello, World!");',
    'function': 'function greet(name: string): string {\n    return `Hello, ${name}!`;\n}\n\nconsole.log(greet("World"));',
    'class': 'class Person {\n    private name: string;\n    \n    constructor(name: string) {\n        this.name = name;\n    }\n    \n    greet(): string {\n        return `Hello, I am ${this.name}`;\n    }\n}\n\nconst person = new Person("Alice");\nconsole.log(person.greet());'
  }
} as const;

const MonacoCodeEditor: React.FC<MonacoCodeEditorProps> = ({
  className = '',
  height = '600px'
}) => {
  const [code, setCode] = useState('print("Hello, World!")');
  const [language, setLanguage] = useState('python');
  const [input, setInput] = useState('');
  const { output, setOutput, isRunning, runCode, cancelRun, stale } = useStandaloneExecution(code, language, input);
  const [isSaving, setIsSaving] = useState(false);
  const [theme, setTheme] = useState<'vs-dark' | 'light'>('vs-dark');
  const [rightTab, setRightTab] = useState<'console' | 'trace'>('console');
  const [patchLoading, setPatchLoading] = useState(false);
  const [patchData, setPatchData] = useState<CodePatchData | null>(null);
  const [showPatchModal, setShowPatchModal] = useState(false);
  const editorRef = useRef<any>(null);
  const decorationsRef = useRef<any[]>([]);

  // 监听报错输出，向禾桔广播伴学提示
  useEffect(() => {
    if (output && (output.includes('失败') || output.includes('错误') || output.includes('Error') || output.includes('Exception'))) {
      emitPetCompanionEvent({
        type: 'error_diagnosis',
        title: '沙箱运行异常',
        message: '检测到代码报错喵！可以点击控制台右上方「✨ 禾桔诊断修复」查看一键修复补丁哦~',
        mood: 'curious',
      });
    }
  }, [output]);

  const handleRequestPatch = async () => {
    if (patchLoading || !code.trim()) return;
    setPatchLoading(true);
    try {
      const res = await fetch('/api/ai/code-patch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          language,
          errorOutput: output,
        }),
      });
      const json = await res.json();
      if (json?.success && json.data) {
        setPatchData(json.data);
        setShowPatchModal(true);
      } else {
        message.warning('未能生成修复补丁');
      }
    } catch {
      message.error('请求修复服务失败');
    } finally {
      setPatchLoading(false);
    }
  };

  const handleHighlightLine = (line: number) => {
    if (!editorRef.current || !line) return;
    try {
      editorRef.current.revealLineInCenter(line);
      decorationsRef.current = editorRef.current.deltaDecorations(decorationsRef.current, [
        {
          range: { startLineNumber: line, startColumn: 1, endLineNumber: line, endColumn: 1 },
          options: {
            isWholeLine: true,
            className: 'bg-indigo-500/20 border-l-4 border-indigo-400',
          },
        },
      ]);
    } catch {}
  };
  const [isMobile, setIsMobile] = useState(false);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [editorLoadError, setEditorLoadError] = useState(false);
  
  // 检测移动设备
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // 初始检查
    checkMobile();
    
    // 监听窗口大小变化
    window.addEventListener('resize', checkMobile);
    
    // 设置加载超时
    const timeout = setTimeout(() => {
      if (!editorLoaded) {
        setEditorLoadError(true);
      }
    }, 10000); // 10秒超时
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timeout);
    };
  }, [editorLoaded]);

  // 支持的编程语言
  const languages = [
    { value: 'python', label: 'Python' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'c', label: 'C' },
    { value: 'go', label: 'Go' },
    { value: 'php', label: 'PHP' },
    { value: 'rust', label: 'Rust' },
    { value: 'csharp', label: 'C#' },
    { value: 'typescript', label: 'TypeScript' },
  ];

  // 编辑器配置
  const editorOptions = {
    minimap: { enabled: false },
    fontSize: 14,
    lineNumbers: 'on' as const,
    roundedSelection: false,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    tabSize: 4,
    wordWrap: 'on' as const,
    contextmenu: true,
    selectOnLineNumbers: true,
    lineNumbersMinChars: 3,
  };

  const runCodeRef = useRef(runCode);
  runCodeRef.current = runCode;

  // 编辑器挂载时的回调
  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    setEditorLoaded(true);
    
    // 添加快捷键
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      void runCodeRef.current();
    });
    
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      saveCodeAsNote();
    });
    
    // 针对移动设备优化
    if (isMobile) {
      // 减少编辑器功能，提高性能
      editor.updateOptions({
        minimap: { enabled: false },
        folding: false,
        lineNumbers: 'off',
        glyphMargin: false,
        contextmenu: false,
      });
    }
  };
  
  // 编辑器加载错误处理
  const handleEditorLoadError = (error: any) => {
    console.error('Monaco editor failed to load:', error);
    setEditorLoadError(true);
  };

  // 保存代码为笔记
  const saveCodeAsNote = async () => {
    if (!code.trim()) {
      message.error('请输入代码后再保存');
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
*通过 PartJava 在线代码编辑器创建于 ${new Date().toLocaleString()}*`;

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
          tags: [language, 'code', 'programming', 'partjava']
        }),
      });

      if (response.ok) {
        message.success('代码已保存为笔记！');
      } else {
        message.error('保存失败，请重试');
      }
    } catch (error) {
      console.error('保存错误:', error);
      message.error('保存失败，请重试');
    } finally {
      setIsSaving(false);
    }
  };

  // 复制代码到剪贴板
  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      message.success('代码已复制到剪贴板');
    } catch (error) {
      message.error('复制失败');
    }
  };

  // 下载代码文件
  const downloadCode = () => {
    const extensions: { [key: string]: string } = {
      'python': 'py',
      'javascript': 'js',
      'java': 'java',
      'cpp': 'cpp',
      'c': 'c',
      'go': 'go',
      'php': 'php',
      'rust': 'rs',
      'csharp': 'cs',
      'typescript': 'ts',
    };

    const extension = extensions[language] || 'txt';
    const filename = `code.${extension}`;
    
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    
    message.success(`代码已下载为 ${filename}`);
  };

  // 加载代码模板
  const loadTemplate = (templateKey: string) => {
    const languageTemplates = codeTemplates[language as keyof typeof codeTemplates];
    if (languageTemplates && templateKey in languageTemplates) {
      const template = languageTemplates[templateKey as keyof typeof languageTemplates];
      setCode(template);
      setOutput('');
      message.success('模板已加载');
    }
  };

  // 获取当前语言的模板选项
  const getTemplateOptions = () => {
    const templates = codeTemplates[language as keyof typeof codeTemplates];
    if (!templates) return [];
    
    const templateLabels: Record<string, string> = {
      'hello-world': 'Hello World',
      'input-output': '输入输出',
      'loop': '循环示例',
      'function': '函数示例',
      'class': '类示例',
      'array': '数组操作',
      'async': '异步操作',
      'vector': '向量操作',
      'competitive': '竞赛模板',
      'goroutine': '协程示例',
      'algorithm': '算法示例',
      'slice': '切片操作'
    };
    
    return Object.keys(templates).map(key => ({
      value: key,
      label: templateLabels[key] || key
    }));
  };

  // 清空所有内容
  const clearAll = () => {
    setCode('');
    setInput('');
    setOutput('');
    message.info('已清空所有内容');
  };

  // 切换主题
  const toggleTheme = () => {
    setTheme(theme === 'vs-dark' ? 'light' : 'vs-dark');
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      {/* 工具栏 */}
      <div className="bg-gray-50 border-b border-gray-200 p-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <CodeOutlined className="text-blue-600 text-xl" />
            <Select
              value={language}
              onChange={(value) => {
                setLanguage(value);
                setCode('');
                setOutput('');
              }}
              className="w-36"
              size="large"
              options={languages}
            />
            <Button
              type="primary"
              size="large"
              icon={<PlayCircleOutlined />}
              onClick={runCode}
              loading={isRunning}
              disabled={isRunning || !code.trim()}
            >
              {isRunning ? '执行中...' : '运行 (Ctrl+Enter)'}
            </Button>
            {isRunning && <Button size="small" onClick={cancelRun}>停止等待</Button>}
          </div>
          
          <div className="flex items-center gap-2">
            <Select
              placeholder="选择模板"
              className="w-32"
              onChange={loadTemplate}
              options={getTemplateOptions()}
              allowClear
            />
            
            <Tooltip title="复制代码">
              <Button
                icon={<CopyOutlined />}
                onClick={copyCode}
                disabled={!code.trim()}
              />
            </Tooltip>
            
            <Tooltip title="下载代码">
              <Button
                icon={<DownloadOutlined />}
                onClick={downloadCode}
                disabled={!code.trim()}
              />
            </Tooltip>
            
            <Tooltip title="切换主题">
              <Button
                icon={theme === 'vs-dark' ? '🌞' : '🌙'}
                onClick={toggleTheme}
              />
            </Tooltip>
            
            <Button
              icon={<SaveOutlined />}
              onClick={saveCodeAsNote}
              loading={isSaving}
              disabled={!code.trim()}
            >
              保存 (Ctrl+S)
            </Button>
            
            <Button
              icon={<ClearOutlined />}
              onClick={clearAll}
              danger
            >
              清空
            </Button>
          </div>
        </div>
      </div>

      {/* 主要编辑区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* 左侧：代码编辑器 */}
        <div className="border-r border-gray-200">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <CodeOutlined />
              代码编辑器
              <span className="text-sm font-normal text-gray-500">
                ({languages.find(l => l.value === language)?.label})
              </span>
            </h3>
          </div>
          <div className="relative">
            {editorLoadError ? (
              // 移动设备上的降级方案 - 使用简单的文本区域
              <div className="p-4">
                <Alert
                  message="编辑器加载失败"
                  description="高级编辑器加载失败，已切换到兼容模式。如果您使用的是移动设备，这是正常的。"
                  type="warning"
                  showIcon
                  className="mb-4"
                />
                <TextArea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder={`请输入${languages.find(l => l.value === language)?.label}代码...`}
                  className="font-mono text-sm"
                  style={{ height: height }}
                  autoSize={false}
                />
              </div>
            ) : (
              // 高级编辑器
              <Editor
                height={height}
                language={monacoLanguageMap[language] || language}
                value={code}
                onChange={(value) => setCode(value || '')}
                onMount={handleEditorDidMount}
                theme={theme}
                options={editorOptions}
                // 注意：Monaco Editor React 包装器不直接支持 onError
                // 我们通过 useEffect 和超时检测来处理加载错误
                loading={
                  <div className="flex flex-col items-center justify-center h-full bg-gray-50">
                    <Spin size="large" tip="编辑器加载中..." />
                    <p className="mt-4 text-gray-500">首次加载可能需要一些时间，请耐心等待...</p>
                    <p className="mt-2 text-gray-400 text-sm">如果长时间未加载，将自动切换到兼容模式</p>
                  </div>
                }
              />
            )}
          </div>
        </div>

        {/* 右侧：输入和输出区域 / JVM 变量栈帧回放 */}
        <div className="flex flex-col h-full bg-slate-950 overflow-hidden">
          {/* 右侧模式切换 Tab */}
          <div className="px-4 py-2.5 bg-gray-100 border-b border-gray-200 flex items-center justify-between flex-wrap gap-2 shrink-0">
            <div className="flex items-center gap-1.5 p-1 bg-gray-200/80 rounded-xl">
              <button
                type="button"
                onClick={() => setRightTab('console')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  rightTab === 'console'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>控制台 (Console)</span>
              </button>
              <button
                type="button"
                onClick={() => setRightTab('trace')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  rightTab === 'trace'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>🔬 JVM 栈帧与变量回放</span>
              </button>
            </div>

            {rightTab === 'console' && output && (
              <button
                type="button"
                onClick={handleRequestPatch}
                disabled={patchLoading}
                className="px-2.5 py-1 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 hover:opacity-90 disabled:opacity-50 transition flex items-center gap-1 shadow-sm"
                title="根据当前输出诊断报错并一键生成热修复补丁"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{patchLoading ? '诊断中...' : '✨ 禾桔诊断修复'}</span>
              </button>
            )}
          </div>

          {rightTab === 'console' ? (
            <div className="flex flex-col flex-1 overflow-hidden">
              {/* 输入数据 */}
              <div className="p-4 border-b border-gray-200 bg-white shrink-0">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">标准输入 (stdin)</h3>
                <TextArea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="如果程序需要输入数据，请在这里输入..."
                  className="font-mono text-sm"
                  rows={4}
                />
              </div>

              {/* 输出结果 */}
              <div className="flex-1 p-4 bg-gray-900 flex flex-col overflow-hidden">
                <div className="flex items-center justify-between mb-2 shrink-0">
                  <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-green-400" />
                    <span>运行结果</span>
                  </h3>
                  {output && (
                    <button
                      type="button"
                      onClick={handleRequestPatch}
                      disabled={patchLoading}
                      className="text-xs text-amber-300 hover:text-amber-200 flex items-center gap-1 underline"
                    >
                      <Sparkles className="w-3 h-3" /> 一键诊断
                    </button>
                  )}
                </div>
                <div 
                  className="flex-1 bg-black/60 border border-slate-800 text-green-400 p-4 rounded-xl font-mono text-xs overflow-auto select-text leading-relaxed"
                  style={{ minHeight: '240px' }}
                >
                  {stale && <div className="text-amber-500 text-xs mb-2">代码或输入已更改，以下为上次提交的结果，请重新运行。</div>}
                  {output ? (
                    <pre className="whitespace-pre-wrap">{output}</pre>
                  ) : (
                    <div className="text-gray-500 text-center py-8">
                      <div className="text-4xl mb-4">💻</div>
                      <p>点击运行按钮或按 Ctrl+Enter 查看结果...</p>
                      <p className="text-xs mt-2">PartJava 专业代码编辑器 - 支持语法高亮、代码补全、快捷键等功能</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* 🔬 JVM 栈帧与变量演进可视化回放面板 */
            <div className="flex-1 overflow-hidden" style={{ minHeight: '440px' }}>
              <VisualExecutionTracePlayer
                currentCode={code}
                language={language}
                onLoadScenarioCode={(newCode) => {
                  setCode(newCode);
                  setLanguage('java');
                  message.success('已载入经典算法代码并生成可视化步骤');
                }}
                onHighlightLine={handleHighlightLine}
              />
            </div>
          )}
        </div>
      </div>

      {/* 底部提示 */}
      <div className="bg-blue-50 border-t border-blue-200 p-3">
        <Alert
          message="PartJava 在线代码编辑器"
          description={
            <div className="text-sm">
              <strong>快捷键：</strong> Ctrl+Enter 运行代码 | Ctrl+S 保存代码 | 
              <strong> 功能：</strong> 语法高亮 | 代码补全 | 错误检测 | 多主题支持 | 🔬 JVM 栈帧可视化
            </div>
          }
          type="info"
          showIcon
          className="border-none bg-transparent"
        />
      </div>

      {/* 禾桔 AI 诊断与热修复补丁弹窗 */}
      <InlineCodePatchModal
        open={showPatchModal}
        onClose={() => setShowPatchModal(false)}
        originalCode={code}
        patch={patchData}
        language={language}
        onApplyPatch={(fixedCode) => {
          setCode(fixedCode);
        }}
      />
    </div>
  );
};

export default MonacoCodeEditor;
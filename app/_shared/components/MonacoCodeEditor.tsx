'use client';

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Select, message, Tooltip, Spin } from 'antd';
import dynamic from 'next/dynamic';
import {
  Sparkles,
  Terminal,
  Cpu,
  Play,
  Square,
  Copy,
  Check,
  Download,
  Save,
  Trash2,
  Sun,
  Moon,
  Maximize2,
  Minimize2,
  FileCode,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  HardDrive,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

// 动态导入 Monaco 编辑器，SSR 关闭
const Editor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] bg-slate-950/80 text-slate-300">
      <Spin size="large" />
      <span className="mt-4 font-mono text-xs tracking-wider text-indigo-300">
        正在挂载 Monaco 智能核心引擎...
      </span>
    </div>
  ),
});

import { useStandaloneExecution } from './useStandaloneExecution';
import InlineCodePatchModal, { CodePatchData } from './InlineCodePatchModal';
import VisualExecutionTracePlayer from './VisualExecutionTracePlayer';
import { emitPetCompanionEvent } from '@shared/lib/pet-companion-bus';

interface MonacoCodeEditorProps {
  className?: string;
  height?: string;
  externalCode?: string;
  externalLanguage?: string;
  externalVersion?: number;
}

// Monaco 语言映射
const monacoLanguageMap: Record<string, string> = {
  python: 'python',
  javascript: 'javascript',
  java: 'java',
  cpp: 'cpp',
  c: 'c',
  csharp: 'csharp',
  go: 'go',
  rust: 'rust',
  php: 'php',
  ruby: 'ruby',
  swift: 'swift',
  kotlin: 'kotlin',
  typescript: 'typescript',
};

interface LanguageConfig {
  value: string;
  label: string;
  ext: string;
  fileName: string;
  tag: string;
  badgeColor: string;
}

const LANGUAGES: LanguageConfig[] = [
  { value: 'cpp', label: 'C++', ext: 'cpp', fileName: 'main.cpp', tag: 'GCC 13', badgeColor: '#6366f1' },
  { value: 'python', label: 'Python', ext: 'py', fileName: 'main.py', tag: 'v3.11', badgeColor: '#38bdf8' },
  { value: 'java', label: 'Java', ext: 'java', fileName: 'Main.java', tag: 'JDK 17', badgeColor: '#f97316' },
  { value: 'c', label: 'C', ext: 'c', fileName: 'main.c', tag: 'Clang 16', badgeColor: '#94a3b8' },
  { value: 'javascript', label: 'JavaScript', ext: 'js', fileName: 'index.js', tag: 'Node 20', badgeColor: '#eab308' },
  { value: 'typescript', label: 'TypeScript', ext: 'ts', fileName: 'index.ts', tag: 'TS 5.4', badgeColor: '#3b82f6' },
  { value: 'go', label: 'Go', ext: 'go', fileName: 'main.go', tag: 'v1.22', badgeColor: '#06b6d4' },
  { value: 'rust', label: 'Rust', ext: 'rs', fileName: 'main.rs', tag: 'v1.76', badgeColor: '#fb923c' },
  { value: 'php', label: 'PHP', ext: 'php', fileName: 'index.php', tag: 'v8.3', badgeColor: '#a855f7' },
  { value: 'csharp', label: 'C#', ext: 'cs', fileName: 'Program.cs', tag: '.NET 8', badgeColor: '#c084fc' },
];

// 代码模板库
const codeTemplates = {
  java: {
    'hello-world': `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, PartJava Cloud Studio!");
    }
}`,
    'input-output': `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("请输入您的姓名: ");
        if (scanner.hasNextLine()) {
            String name = scanner.nextLine();
            System.out.println("你好, " + name + "! 欢迎体验 Docker 云端沙箱。");
        }
        scanner.close();
    }
}`,
    'array': `import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] numbers = {15, 3, 28, 7, 92, 44, 1};
        System.out.println("原始序列: " + Arrays.toString(numbers));
        Arrays.sort(numbers);
        System.out.println("升序排序: " + Arrays.toString(numbers));
    }
}`,
    'class': `class Person {
    private String name;
    private int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public void introduce() {
        System.out.println("我是 " + name + "，今年 " + age + " 岁，正在 PartJava 实验室编程！");
    }
}

public class Main {
    public static void main(String[] args) {
        Person dev = new Person("禾桔", 1);
        dev.introduce();
    }
}`,
  },
  python: {
    'hello-world': `print("Hello, PartJava Cloud Studio!")`,
    'input-output': `name = input("请输入您的姓名: ")
print(f"你好, {name}! 欢迎体验 Python 3 隔离沙箱。")`,
    'loop': `for i in range(1, 6):
    print(f"迭代步骤 [{i}]: 2^{i} = {2 ** i}")`,
    'function': `def fibonacci(n):
    a, b = 0, 1
    seq = []
    for _ in range(n):
        seq.append(a)
        a, b = b, a + b
    return seq

print("斐波那契前10项:", fibonacci(10))`,
    'class': `class Developer:
    def __init__(self, name: str, lang: str):
        self.name = name
        self.lang = lang
    
    def greet(self):
        return f"我是 {self.name}，正在使用 {self.lang} 编写高性能服务。"

coder = Developer("禾桔", "Python")
print(coder.greet())`,
    'algorithm': `# 经典快速排序
def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)

data = [34, 7, 23, 32, 5, 62]
print("未排序:", data)
print("快排后:", quicksort(data))`,
  },
  cpp: {
    'hello-world': `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, PartJava Cloud Studio (C++20)!" << endl;
    return 0;
}`,
    'input-output': `#include <iostream>
using namespace std;

int main() {
    int a = 0, b = 0;
    cout << "请输入两个数字: ";
    if (cin >> a >> b) {
        cout << "求和结果: " << (a + b) << endl;
    }
    return 0;
}`,
    'vector': `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> nums = {5, 2, 8, 1, 9};
    cout << "原序列: ";
    for(int n : nums) cout << n << " ";
    cout << endl;

    sort(nums.begin(), nums.end());
    cout << "排序后: ";
    for(int n : nums) cout << n << " ";
    cout << endl;
    return 0;
}`,
    'competitive': `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cout << "竞赛 I/O 加速环境已就绪" << endl;
    return 0;
}`,
  },
  javascript: {
    'hello-world': `console.log("Hello, PartJava Cloud Studio (Node.js)!");`,
    'array': `const scores = [88, 92, 79, 95, 100];
const total = scores.reduce((sum, s) => sum + s, 0);
console.log("平均成绩:", (total / scores.length).toFixed(1));`,
    'async': `async function fetchMock() {
  console.log("正在模拟异步云端沙箱调度...");
  await new Promise(r => setTimeout(r, 400));
  return { status: 200, message: "Docker 容器执行完毕" };
}

fetchMock().then(res => console.log(res));`,
  },
  typescript: {
    'hello-world': `interface StudioUser {
  id: string;
  role: 'developer' | 'researcher';
}

const user: StudioUser = { id: 'TsuYi-禾桔', role: 'developer' };
console.log(\`欢迎 \${user.id}，权限角色: \${user.role}\`);`,
  },
  go: {
    'hello-world': `package main

import "fmt"

func main() {
    fmt.Println("Hello, PartJava Cloud Studio (Go 1.22)!")
}`,
    'goroutine': `package main

import (
    "fmt"
    "sync"
)

func main() {
    var wg sync.WaitGroup
    for i := 1; i <= 3; i++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            fmt.Printf("Goroutine #%d 并发启动\\n", id)
        }(i)
    }
    wg.Wait()
    fmt.Println("所有协程执行完成")
}`,
  },
  rust: {
    'hello-world': `fn main() {
    println!("Hello, PartJava Cloud Studio (Rust 1.76)!");
}`,
  },
  c: {
    'hello-world': `#include <stdio.h>

int main() {
    printf("Hello, PartJava Cloud Studio (C11)!\\n");
    return 0;
}`,
  },
  php: {
    'hello-world': `<?php
echo "Hello, PartJava Cloud Studio (PHP 8.3)!\\n";
?>`,
  },
  csharp: {
    'hello-world': `using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, PartJava Cloud Studio (.NET 8)!");
    }
}`,
  },
} as const;

// 注册与学习页面完全一致的 Atom One 语法高亮主题（保持编辑器原有视窗背景色不变）
const registerAtomOneThemes = (monaco: any) => {
  if (!monaco?.editor) return;
  try {
    monaco.editor.defineTheme('atom-one-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: '', foreground: 'abb2bf' },
        { token: 'comment', foreground: '5c6370', fontStyle: 'italic' },
        { token: 'comment.doc', foreground: '5c6370', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'c678dd' },
        { token: 'keyword.control', foreground: 'c678dd' },
        { token: 'keyword.operator', foreground: '56b6c2' },
        { token: 'keyword.directive', foreground: 'c678dd' },
        { token: 'keyword.directive.include', foreground: 'c678dd' },
        { token: 'storage', foreground: 'c678dd' },
        { token: 'storage.type', foreground: 'c678dd' },
        { token: 'storage.modifier', foreground: 'c678dd' },
        { token: 'string', foreground: '98c379' },
        { token: 'string.escape', foreground: '56b6c2' },
        { token: 'string.regexp', foreground: '98c379' },
        { token: 'number', foreground: 'd19a66' },
        { token: 'number.hex', foreground: 'd19a66' },
        { token: 'number.float', foreground: 'd19a66' },
        { token: 'constant.numeric', foreground: 'd19a66' },
        { token: 'constant.language', foreground: 'd19a66' },
        { token: 'entity.name.function', foreground: '61afef' },
        { token: 'support.function', foreground: '61afef' },
        { token: 'identifier', foreground: 'abb2bf' },
        { token: 'type.identifier', foreground: 'e5c07b' },
        { token: 'entity.name.type', foreground: 'e5c07b' },
        { token: 'entity.name.class', foreground: 'e5c07b' },
        { token: 'support.class', foreground: 'e5c07b' },
        { token: 'support.type', foreground: 'e5c07b' },
        { token: 'type', foreground: 'e5c07b' },
        { token: 'class', foreground: 'e5c07b' },
        { token: 'variable', foreground: 'e06c75' },
        { token: 'variable.parameter', foreground: 'e06c75' },
        { token: 'variable.predefined', foreground: 'e5c07b' },
        { token: 'operator', foreground: '56b6c2' },
        { token: 'delimiter', foreground: 'abb2bf' },
        { token: 'delimiter.bracket', foreground: 'abb2bf' },
        { token: 'delimiter.parenthesis', foreground: 'abb2bf' },
        { token: 'tag', foreground: 'e06c75' },
        { token: 'attribute.name', foreground: 'd19a66' },
        { token: 'attribute.value', foreground: '98c379' },
        { token: 'annotation', foreground: 'e5c07b' },
        { token: 'meta.decorator', foreground: 'e5c07b' },
      ],
      colors: {
        'editor.background': '#1e1e1e', // 保持原有暗黑视窗背景不变（背景不用改）
        'editor.foreground': '#abb2bf',
        'editorLineNumber.foreground': '#4b5263',
        'editorLineNumber.activeForeground': '#abb2bf',
        'editorCursor.foreground': '#528bff',
        'editor.selectionBackground': '#3e445177',
        'editor.inactiveSelectionBackground': '#3e445144',
      },
    });

    monaco.editor.defineTheme('atom-one-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: '', foreground: '383a42' },
        { token: 'comment', foreground: 'a0a1a7', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'a626a4' },
        { token: 'storage', foreground: 'a626a4' },
        { token: 'storage.type', foreground: 'a626a4' },
        { token: 'string', foreground: '50a14f' },
        { token: 'number', foreground: '986801' },
        { token: 'entity.name.function', foreground: '4078f2' },
        { token: 'support.function', foreground: '4078f2' },
        { token: 'entity.name.type', foreground: 'c18401' },
        { token: 'entity.name.class', foreground: 'c18401' },
        { token: 'support.class', foreground: 'c18401' },
        { token: 'variable', foreground: 'e45649' },
        { token: 'operator', foreground: '0184bc' },
        { token: 'delimiter', foreground: '383a42' },
      ],
      colors: {
        'editor.background': '#ffffff', // 保持原有浅色视窗背景不变（背景不用改）
        'editor.foreground': '#383a42',
      },
    });
  } catch (e) {
    console.warn('registerAtomOneThemes warning:', e);
  }
};

export default function MonacoCodeEditor({
  className = '',
  height = '680px',
  externalCode,
  externalLanguage,
  externalVersion = 0,
}: MonacoCodeEditorProps) {
  const [language, setLanguage] = useState<string>(externalLanguage || 'cpp');
  const [code, setCode] = useState<string>(externalCode || codeTemplates.cpp['hello-world']);

  useEffect(() => {
    if (externalLanguage) {
      setLanguage(externalLanguage);
    }
    if (externalCode) {
      setCode(externalCode);
      if (editorRef.current && editorRef.current.getValue() !== externalCode) {
        editorRef.current.setValue(externalCode);
      }
      if (externalVersion > 0) {
        message.success(
          `已将算法源码载入 IDE (${externalLanguage === 'cpp' ? 'C++' : (externalLanguage || 'C++').toUpperCase()})`
        );
      }
    }
  }, [externalCode, externalLanguage, externalVersion]);
  const [input, setInput] = useState<string>('');
  const [theme, setTheme] = useState<'atom-one-dark' | 'atom-one-light'>('atom-one-dark');
  const [rightTab, setRightTab] = useState<'console' | 'trace'>('console');
  const [tracePlaySignal, setTracePlaySignal] = useState<number>(0);
  const [isStdinOpen, setIsStdinOpen] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedOutput, setCopiedOutput] = useState(false);

  // AI 诊断补丁弹窗
  const [patchLoading, setPatchLoading] = useState(false);
  const [patchData, setPatchData] = useState<CodePatchData | null>(null);
  const [showPatchModal, setShowPatchModal] = useState(false);

  const editorRef = useRef<any>(null);
  const decorationsRef = useRef<any[]>([]);

  // 执行引擎
  const { output, setOutput, isRunning, runCode, cancelRun, stale } =
    useStandaloneExecution(code, language, input);

  // 移动端适配
  const [isMobile, setIsMobile] = useState(false);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [editorLoadError, setEditorLoadError] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const timeout = setTimeout(() => {
      if (!editorLoaded) setEditorLoadError(true);
    }, 12000);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timeout);
    };
  }, [editorLoaded]);

  const handleTriggerRun = () => {
    if (rightTab === 'trace') {
      setTracePlaySignal(prev => prev + 1);
    }
    void runCode();
  };

  // 快捷键支持
  const runCodeRef = useRef(handleTriggerRun);
  runCodeRef.current = handleTriggerRun;

  const currentLangConfig = useMemo(() => {
    return (
      LANGUAGES.find((l) => l.value === language) || {
        value: language,
        label: language,
        ext: 'txt',
        fileName: `main.${language}`,
        tag: 'Cloud Sandbox',
        badgeColor: '#6366f1',
      }
    );
  }, [language]);

  // 监听报错输出，向禾桔伴学广播
  useEffect(() => {
    if (
      output &&
      (output.includes('失败') ||
        output.includes('错误') ||
        output.includes('Error') ||
        output.includes('Exception') ||
        output.includes('Traceback'))
    ) {
      emitPetCompanionEvent({
        type: 'error_diagnosis',
        title: '沙箱运行异常',
        message: '检测到代码报错喵！可以点击控制台右上方「✨ 禾桔诊断修复」查看一键修复补丁哦~',
        mood: 'curious',
      });
    }
  }, [output]);

  // 切换编程语言
  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    const langTemplates = codeTemplates[newLang as keyof typeof codeTemplates];
    const defaultCode = langTemplates
      ? (langTemplates as any)['hello-world'] || Object.values(langTemplates)[0]
      : '';
    setCode(defaultCode || '');
    setOutput('');
  };

  // 载入模板
  const handleLoadTemplate = (templateKey: string) => {
    const langTemplates = codeTemplates[language as keyof typeof codeTemplates];
    if (langTemplates && templateKey in langTemplates) {
      setCode((langTemplates as any)[templateKey]);
      setOutput('');
      message.success('已载入模板代码');
    }
  };

  // 模板选项
  const templateOptions = useMemo(() => {
    const templates = codeTemplates[language as keyof typeof codeTemplates];
    if (!templates) return [];
    const labels: Record<string, string> = {
      'hello-world': '⚡ Hello World',
      'input-output': '📥 标准输入输出',
      'array': '📊 数组 / 集合操作',
      'loop': '🔄 循环迭代',
      'function': '🧩 函数与模块',
      'class': '🏛️ 面向对象 / 类',
      'algorithm': '🚀 经典算法',
      'competitive': '🏆 算法竞赛模板',
      'goroutine': '⚡ 高并发协程',
      'vector': '📐 向量序列',
      'async': '⏳ 异步 Promise',
    };
    return Object.keys(templates).map((key) => ({
      value: key,
      label: labels[key] || key,
    }));
  }, [language]);

  // 编辑器挂载
  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    setEditorLoaded(true);

    registerAtomOneThemes(monaco);
    monaco.editor.setTheme(theme);

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      void runCodeRef.current();
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      void saveCodeAsNote();
    });

    if (isMobile) {
      editor.updateOptions({
        minimap: { enabled: false },
        folding: false,
        lineNumbers: 'off',
        glyphMargin: false,
      });
    }
  };

  // 高亮指定行
  const handleHighlightLine = useCallback((line: number) => {
    if (!editorRef.current || !line) return;
    try {
      editorRef.current.revealLineInCenter(line);
      decorationsRef.current = editorRef.current.deltaDecorations(
        decorationsRef.current,
        [
          {
            range: {
              startLineNumber: line,
              startColumn: 1,
              endLineNumber: line,
              endColumn: 1,
            },
            options: {
              isWholeLine: true,
              className: 'bg-indigo-500/25 border-l-4 border-indigo-400',
            },
          },
        ]
      );
    } catch {}
  }, []);

  // 复制代码
  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(true);
      message.success('代码已复制至剪贴板');
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      message.error('复制失败');
    }
  };

  // 复制终端输出
  const copyOutput = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopiedOutput(true);
      message.success('终端输出已复制');
      setTimeout(() => setCopiedOutput(false), 2000);
    } catch {
      message.error('复制失败');
    }
  };

  // 下载文件
  const downloadCode = () => {
    const filename = currentLangConfig.fileName;
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    message.success(`已保存至本地: ${filename}`);
  };

  // 保存为笔记
  const saveCodeAsNote = async () => {
    if (!code.trim()) {
      message.warning('请输入有效代码后再保存');
      return;
    }
    setIsSaving(true);
    try {
      const noteContent = `# ${language.toUpperCase()} 代码归档

\`\`\`${language}
${code}
\`\`\`

${input ? `### 标准输入 (stdin)\n\`\`\`\n${input}\n\`\`\`\n` : ''}
${output ? `### 终端运行输出\n\`\`\`\n${output}\n\`\`\`\n` : ''}

---
*归档于 PartJava 云端极客工坊 · ${new Date().toLocaleString()}*`;

      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          title: `${language.toUpperCase()} 代码归档 - ${new Date().toLocaleDateString()}`,
          content: noteContent,
          category: 'programming',
          tags: [language, 'code', 'partjava-studio'],
        }),
      });

      if (response.ok) {
        message.success('已保存为个人云端笔记！');
      } else {
        message.error('保存失败，请检查登录状态');
      }
    } catch {
      message.error('保存失败，网络异常');
    } finally {
      setIsSaving(false);
    }
  };

  // 请求 AI 诊断补丁
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
        message.warning('未检测到明确语法错误或未能生成修复补丁');
      }
    } catch {
      message.error('请求修复服务失败');
    } finally {
      setPatchLoading(false);
    }
  };

  // 解析终端输出元数据
  const parsedOutputMeta = useMemo(() => {
    if (!output) return null;
    const isSuccess =
      output.includes('代码执行完成') || output.includes('状态: 执行成功');
    const isError =
      output.includes('代码执行失败') ||
      output.includes('错误') ||
      output.includes('Error') ||
      output.includes('Exception') ||
      output.includes('Traceback');

    const timeMatch = output.match(/执行时间:\s*([\d\.]+秒|未知)/);
    const memoryMatch = output.match(/内存使用:\s*([\d\.]+(?:KB|MB)|未知)/);

    return {
      isSuccess,
      isError,
      time: timeMatch ? timeMatch[1] : null,
      memory: memoryMatch ? memoryMatch[1] : null,
    };
  }, [output]);

  // Monaco 编辑器高级选项
  const editorOptions = useMemo(
    () => ({
      minimap: { enabled: !isMobile, maxColumn: 36, renderCharacters: false },
      fontSize: isMobile ? 12.5 : 14,
      lineHeight: 22,
      fontFamily:
        '"JetBrains Mono", "Fira Code", "Cascadia Code", Consolas, monospace',
      fontLigatures: true,
      lineNumbers: (isMobile ? 'off' : 'on') as 'off' | 'on',
      lineNumbersMinChars: 3,
      roundedSelection: true,
      scrollBeyondLastLine: false,
      automaticLayout: true,
      tabSize: 4,
      wordWrap: 'on' as const,
      contextmenu: true,
      selectOnLineNumbers: true,
      cursorBlinking: 'smooth' as const,
      cursorSmoothCaretAnimation: 'on' as const,
      smoothScrolling: true,
      renderLineHighlight: 'all' as const,
      bracketPairColorization: { enabled: true },
      padding: { top: 14, bottom: 14 },
    }),
    [isMobile]
  );

  return (
    <div
      className={`relative flex flex-col rounded-2xl border transition-all duration-300 shadow-2xl ${
        isFullscreen
          ? 'fixed inset-0 z-50 rounded-none border-none p-2 sm:p-4 bg-slate-950/98 backdrop-blur-2xl'
          : 'bg-[#090e1a]/95 border-indigo-500/25 shadow-indigo-950/50'
      } ${className}`}
      style={{
        boxShadow: isFullscreen
          ? 'none'
          : '0 20px 50px -10px rgba(10, 15, 30, 0.7), 0 0 0 1px rgba(99, 102, 241, 0.2)',
      }}
    >
      {/* 顶部 macOS 极客视窗控制栏 */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-slate-950 via-[#0d1424] to-slate-950 border-b border-indigo-500/20 rounded-t-2xl flex-wrap gap-2.5">
        {/* 左侧：Mac 交通灯 + 文件 Tab 胶囊 */}
        <div className="flex items-center gap-3">
          {/* macOS 红黄绿交通灯 */}
          <div className="hidden sm:flex items-center gap-1.5 pr-2 border-r border-white/10">
            <span className="w-3 h-3 rounded-full bg-rose-500/90 shadow-[0_0_8px_rgba(244,63,94,0.6)] cursor-pointer hover:opacity-80" />
            <span className="w-3 h-3 rounded-full bg-amber-400/90 shadow-[0_0_8px_rgba(251,191,36,0.6)] cursor-pointer hover:opacity-80" />
            <span
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="w-3 h-3 rounded-full bg-emerald-400/90 shadow-[0_0_8px_rgba(52,211,153,0.6)] cursor-pointer hover:opacity-80"
              title="切换全屏专注模式"
            />
          </div>

          {/* 当前活动文件 Tab 胶囊 */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-950/40 border border-indigo-400/30 shadow-inner">
            <FileCode
              className="w-4 h-4"
              style={{ color: currentLangConfig.badgeColor }}
            />
            <span className="font-mono text-xs font-bold text-slate-100 tracking-wide">
              {currentLangConfig.fileName}
            </span>
            <span
              className="text-[10px] font-mono px-1.5 py-0.2 rounded font-semibold uppercase tracking-wider"
              style={{
                backgroundColor: `${currentLangConfig.badgeColor}22`,
                color: currentLangConfig.badgeColor,
                border: `1px solid ${currentLangConfig.badgeColor}44`,
              }}
            >
              {currentLangConfig.tag}
            </span>
            {stale && (
              <span
                className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"
                title="代码已修改，尚未提交运行"
              />
            )}
          </div>

          {/* 语言选择下拉 */}
          <div className="relative">
            <Select
              value={language}
              onChange={handleLanguageChange}
              size="middle"
              className="w-28 sm:w-32 custom-dark-select"
              popupClassName="custom-dark-select-dropdown"
              options={LANGUAGES.map((l) => ({
                value: l.value,
                label: (
                  <span className="flex items-center justify-between text-xs font-semibold text-slate-100">
                    <span>{l.label}</span>
                    <span className="font-mono text-[10px] text-slate-400">
                      .{l.ext}
                    </span>
                  </span>
                ),
              }))}
            />
          </div>

          {/* 经典模板快速载入 */}
          {templateOptions.length > 0 && (
            <div className="hidden md:block">
              <Select
                placeholder={
                  <span className="text-slate-200 font-medium flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
                    <span>经典模板</span>
                  </span>
                }
                size="middle"
                className="w-32 lg:w-36 custom-dark-select"
                popupClassName="custom-dark-select-dropdown"
                onChange={handleLoadTemplate}
                options={templateOptions}
                allowClear
              />
            </div>
          )}
        </div>

        {/* 右侧：运行主按键 + 快捷工具组 */}
        <div className="flex items-center gap-2 ml-auto">
          {/* 主运行按钮（霓虹翠绿流光态） */}
          <button
            type="button"
            onClick={handleTriggerRun}
            disabled={isRunning || !code.trim()}
            className={`relative group px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold text-white transition-all duration-200 flex items-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${
              isRunning
                ? 'bg-amber-600/80 shadow-amber-900/40'
                : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:brightness-110 shadow-emerald-950/60 hover:shadow-emerald-500/25'
            }`}
          >
            {isRunning ? (
              <>
                <Spin size="small" />
                <span>编译运行中...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>运行代码</span>
                <kbd className="hidden lg:inline-block font-mono text-[10px] bg-black/30 border border-white/20 px-1.5 py-0.5 rounded text-white/90">
                  Ctrl+↵
                </kbd>
              </>
            )}
          </button>

          {isRunning && (
            <button
              type="button"
              onClick={cancelRun}
              className="px-2.5 py-1.5 rounded-xl text-xs font-semibold text-rose-300 bg-rose-500/15 border border-rose-500/30 hover:bg-rose-500/25 transition flex items-center gap-1"
              title="终止当前容器运行"
            >
              <Square className="w-3 h-3 fill-current" />
              <span>终止</span>
            </button>
          )}

          {/* 辅助快捷操作组 */}
          <div className="flex items-center gap-1 pl-1 border-l border-white/10 text-slate-400">
            {/* 复制代码 */}
            <Tooltip title={copiedCode ? '已复制！' : '复制代码'}>
              <button
                type="button"
                onClick={copyCode}
                disabled={!code.trim()}
                className="p-1.5 sm:p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-slate-100 text-slate-300 transition"
              >
                {copiedCode ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </Tooltip>

            {/* 下载文件 */}
            <Tooltip title={`下载 ${currentLangConfig.fileName}`}>
              <button
                type="button"
                onClick={downloadCode}
                disabled={!code.trim()}
                className="p-1.5 sm:p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-slate-100 text-slate-300 transition"
              >
                <Download className="w-4 h-4" />
              </button>
            </Tooltip>

            {/* 保存至笔记 */}
            <Tooltip title="保存为云端笔记 (Ctrl+S)">
              <button
                type="button"
                onClick={saveCodeAsNote}
                disabled={isSaving || !code.trim()}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-indigo-500/15 border border-indigo-400/30 text-indigo-300 hover:bg-indigo-500/25 hover:text-indigo-100 text-xs font-medium transition"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isSaving ? '保存中...' : '归档笔记'}</span>
              </button>
            </Tooltip>

            {/* 主题切换 */}
            <Tooltip title={theme === 'atom-one-dark' ? '切换浅色主题' : '切换深色主题'}>
              <button
                type="button"
                onClick={() => setTheme(theme === 'atom-one-dark' ? 'atom-one-light' : 'atom-one-dark')}
                className="p-1.5 sm:p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-slate-100 text-slate-300 transition"
              >
                {theme === 'atom-one-dark' ? (
                  <Sun className="w-4 h-4 text-amber-300" />
                ) : (
                  <Moon className="w-4 h-4 text-indigo-300" />
                )}
              </button>
            </Tooltip>

            {/* 全屏切换 */}
            <Tooltip title={isFullscreen ? '退出全屏 (Esc)' : '全屏专注模式'}>
              <button
                type="button"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1.5 sm:p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-slate-100 text-slate-300 transition"
              >
                {isFullscreen ? (
                  <Minimize2 className="w-4 h-4 text-sky-400" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </button>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* 核心工作区分割：左侧代码编辑器 + 右侧终端与 JVM 回放 */}
      <div
        className="grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden"
        style={{
          height: isFullscreen ? 'calc(100vh - 105px)' : height,
          minHeight: '520px',
        }}
      >
        {/* 左侧：Monaco 代码编辑器 */}
        <div className="lg:col-span-7 flex flex-col border-b lg:border-b-0 lg:border-r border-indigo-500/20 bg-slate-950/60 overflow-hidden">
          {/* 编辑器状态小顶栏 */}
          <div className="flex items-center justify-between px-3 py-1.5 bg-slate-950/90 border-b border-white/5 text-[11px] text-slate-400 shrink-0">
            <div className="flex items-center gap-2">
              <span className="font-mono text-slate-300">
                src/{currentLangConfig.fileName}
              </span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-400 font-mono text-[10px]">
                {code.split('\n').length} 行 · {code.length} 字符
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setCode('')}
                className="hover:text-rose-400 transition flex items-center gap-1 text-[11px]"
                title="清空当前代码"
              >
                <Trash2 className="w-3 h-3" />
                <span>清空</span>
              </button>
            </div>
          </div>

          {/* Monaco 编辑器本体 */}
          <div className="flex-1 relative overflow-hidden">
            {editorLoadError ? (
              <div className="p-4 h-full flex flex-col bg-slate-950 text-slate-200">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Monaco 编辑器加载超时，已平滑降级至极速编辑模式。</span>
                </div>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full flex-1 p-3 bg-slate-900 border border-slate-800 rounded-xl font-mono text-sm text-slate-100 focus:outline-none focus:border-indigo-500 custom-scrollbar resize-none"
                  placeholder="在此输入代码..."
                />
              </div>
            ) : (
              <Editor
                height="100%"
                language={monacoLanguageMap[language] || language}
                value={code}
                onChange={(value) => setCode(value || '')}
                beforeMount={registerAtomOneThemes}
                onMount={handleEditorDidMount}
                theme={theme}
                options={editorOptions}
                loading={
                  <div className="flex flex-col items-center justify-center h-full bg-slate-950/90 text-slate-300">
                    <Spin size="large" />
                    <p className="mt-3 text-xs font-mono text-indigo-300">
                      Monaco 智能代码引擎初始化...
                    </p>
                  </div>
                }
              />
            )}
          </div>
        </div>

        {/* 右侧：交互式终端 / JVM 栈帧与变量演进 */}
        <div className="lg:col-span-5 flex flex-col bg-slate-950 overflow-hidden">
          {/* 右侧模式切换 Tab */}
          <div className="px-3 py-2 bg-gradient-to-r from-slate-950 via-[#0b101c] to-slate-950 border-b border-indigo-500/20 flex items-center justify-between flex-wrap gap-2 shrink-0">
            <div className="flex items-center gap-1 p-1 bg-white/[0.04] rounded-xl border border-white/5">
              <button
                type="button"
                onClick={() => setRightTab('console')}
                className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  rightTab === 'console'
                    ? 'bg-gradient-to-r from-indigo-600 to-sky-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>控制台 (Console)</span>
              </button>

              <button
                type="button"
                onClick={() => setRightTab('trace')}
                className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  rightTab === 'trace'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Cpu className="w-3.5 h-3.5 text-amber-300" />
                <span>🔬 JVM 栈帧回放</span>
              </button>
            </div>

            {/* 智能诊断与修复入口（右侧常驻） */}
            {rightTab === 'console' && (
              <button
                type="button"
                onClick={handleRequestPatch}
                disabled={patchLoading}
                className="relative group px-2.5 py-1 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 hover:brightness-110 disabled:opacity-50 transition flex items-center gap-1.5 shadow-md shadow-rose-950/40"
                title="根据当前输出诊断报错并一键生成热修复补丁"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-spin-slow" />
                <span>{patchLoading ? '诊断中...' : '✨ 禾桔诊断修复'}</span>
              </button>
            )}
          </div>

          {rightTab === 'console' ? (
            <div className="flex flex-col flex-1 overflow-hidden">
              {/* 标准输入 (stdin) 折叠/展开区域 */}
              <div className="border-b border-white/5 bg-slate-950/80 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsStdinOpen(!isStdinOpen)}
                  className="w-full px-3 py-2 flex items-center justify-between text-xs text-slate-400 hover:text-slate-200 transition"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-300">
                      标准输入 (stdin)
                    </span>
                    {input.trim() ? (
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                        已就绪 ({input.length} 字符)
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-500">
                        (若程序含 Scanner / cin 则需在此提供)
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-indigo-400">
                    <span>{isStdinOpen ? '收起' : '展开输入'}</span>
                    {isStdinOpen ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </div>
                </button>

                {isStdinOpen && (
                  <div className="p-3 pt-0">
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="如果您的程序需要读取用户输入（例如：Scanner / input / cin），请在这里键入测试数据..."
                      className="w-full px-3 py-2 bg-slate-900/90 border border-indigo-500/25 rounded-xl font-mono text-xs text-slate-200 focus:outline-none focus:border-sky-400 custom-scrollbar resize-none"
                      rows={3}
                    />
                  </div>
                )}
              </div>

              {/* 终端输出视窗 (真正的黑客控制台) */}
              <div className="flex-1 flex flex-col p-3 bg-[#060a12] overflow-hidden">
                {/* 终端 Header 状态栏 */}
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 shrink-0">
                  <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
                    <span className="text-emerald-400">❯_</span>
                    <span className="text-slate-300">bash /run/sandbox.sh</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* 状态徽标 */}
                    {isRunning ? (
                      <span className="flex items-center gap-1.5 text-[11px] font-mono px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-300 border border-sky-400/30">
                        <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                        <span>容器编译执行中</span>
                      </span>
                    ) : parsedOutputMeta?.isSuccess ? (
                      <span className="flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-400/30">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>执行成功</span>
                        {parsedOutputMeta.time && (
                          <span className="text-emerald-400/80">
                            · {parsedOutputMeta.time}
                          </span>
                        )}
                      </span>
                    ) : parsedOutputMeta?.isError ? (
                      <span className="flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-400/30">
                        <AlertCircle className="w-3 h-3" />
                        <span>执行异常</span>
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono text-slate-500">
                        ● 沙箱就绪
                      </span>
                    )}

                    {/* 复制终端内容 */}
                    {output && (
                      <button
                        type="button"
                        onClick={copyOutput}
                        className="p-1 rounded text-slate-400 hover:text-slate-100 hover:bg-white/10 transition"
                        title="复制终端文本"
                      >
                        {copiedOutput ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    )}

                    {/* 清空输出 */}
                    {output && (
                      <button
                        type="button"
                        onClick={() => setOutput('')}
                        className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-white/10 transition"
                        title="清空终端"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* 终端内容滚动区 */}
                <div
                  className="flex-1 bg-black/70 border border-white/5 p-3 rounded-xl font-mono text-xs overflow-auto select-text leading-relaxed custom-scrollbar"
                  style={{ minHeight: '220px' }}
                >
                  {stale && (
                    <div className="mb-2.5 p-2 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                      <span>
                        代码或输入数据已更改，以下为上次执行的缓存，请按 Ctrl+Enter
                        重新运行。
                      </span>
                    </div>
                  )}

                  {output ? (
                    <div className="space-y-1">
                      <pre
                        className={`whitespace-pre-wrap ${
                          parsedOutputMeta?.isError
                            ? 'text-rose-300'
                            : 'text-emerald-300'
                        }`}
                      >
                        {output}
                      </pre>

                      {/* 如果有异常报错，直接在终端底部附赠修复补丁按钮 */}
                      {parsedOutputMeta?.isError && (
                        <div className="pt-3 mt-3 border-t border-rose-500/20 flex items-center justify-between">
                          <span className="text-rose-400/90 text-[11px]">
                            💡 遇到编译或运行错误？禾桔大模型可自动剖析根因并输出
                            Diff 补丁。
                          </span>
                          <button
                            type="button"
                            onClick={handleRequestPatch}
                            disabled={patchLoading}
                            className="px-3 py-1 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-rose-600 hover:brightness-110 transition shadow flex items-center gap-1.5"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                            <span>
                              {patchLoading ? '诊断中...' : '生成一键修复补丁'}
                            </span>
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center py-10 space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                        <Terminal className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-300 text-sm">
                          Docker 隔离容器沙箱已就绪
                        </div>
                        <p className="text-xs text-slate-500 mt-1 max-w-xs">
                          编写代码后按{' '}
                          <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                            Ctrl + Enter
                          </kbd>{' '}
                          或点击上方「运行代码」发起沙箱容器编译
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-[11px] text-slate-400 font-mono">
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5">
                          ✓ cgroups 内存配额防护
                        </span>
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5">
                          ✓ 毫秒级隔离冷启动
                        </span>
                      </div>
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
                playSignal={tracePlaySignal}
                onLoadScenarioCode={(newCode, newLang) => {
                  setCode(newCode);
                  setLanguage(newLang || 'cpp');
                  if (editorRef.current && editorRef.current.getValue() !== newCode) {
                    editorRef.current.setValue(newCode);
                  }
                  message.success('已载入 C++ 经典算法代码并启动栈帧回放');
                }}
                onHighlightLine={handleHighlightLine}
              />
            </div>
          )}
        </div>
      </div>

      {/* 底部 VS Code 风格 Studio 状态条 */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-1.5 bg-[#050811] border-t border-indigo-500/20 text-[11px] font-mono text-slate-400 rounded-b-2xl flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="text-slate-300">Docker Sandbox</span>
            <span className="text-[10px] text-emerald-400/80">Online</span>
          </span>

          <span className="hidden sm:inline-block text-slate-600">|</span>

          <span className="hidden sm:inline-block text-slate-400">
            UTF-8 · LF · 缩进: 4 空格
          </span>

          <span className="hidden md:inline-block text-slate-600">|</span>

          <span className="hidden md:inline-block text-indigo-300">
            {currentLangConfig.label} ({currentLangConfig.tag})
          </span>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <span className="hidden lg:inline-block text-slate-400">
            快捷键: <kbd className="text-slate-300">Ctrl+Enter</kbd> 运行 ·{' '}
            <kbd className="text-slate-300">Ctrl+S</kbd> 存笔记
          </span>

          <span className="text-slate-500">PartJava Studio v3.2</span>
        </div>
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
}

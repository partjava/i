'use client';

import React, { useState } from 'react';
import { Button, Select, Input, Alert } from 'antd';

const { TextArea } = Input;

interface AdvancedCodeEditorProps {
  className?: string;
}

const AdvancedCodeEditor: React.FC<AdvancedCodeEditorProps> = ({
  className = ''
}) => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  // 支持的编程语言
  const languages = [
    { value: 'python', label: 'Python' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'c', label: 'C' },
    { value: 'go', label: 'Go' },
    { value: 'php', label: 'PHP' }
  ];

  // 代码模板
  const templates = {
    python: 'print("Hello, World!")\n\n# 如果需要输入，可以使用：\n# name = input("请输入您的姓名: ")\n# print(f"你好, {name}!")',
    javascript: 'console.log("Hello, World!");',
    java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
    cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}',
    c: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
    go: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}',
    php: '<?php\necho "Hello, World!";\n?>'
  };

  // 运行代码
  const runCode = async () => {
    if (!code.trim()) {
      setError('请输入代码');
      setOutput('');
      return;
    }

    setIsRunning(true);
    setOutput('正在执行代码...');
    setError('');

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
        setOutput(result.output || '(无输出)');
        setError(result.error || '');
      } else {
        setOutput('');
        setError(result.error || '执行失败');
      }
    } catch (error) {
      setOutput('');
      setError(`网络错误: ${error instanceof Error ? error.message : '未知错误'}`);
    } finally {
      setIsRunning(false);
    }
  };

  // 清空所有内容
  const clearAll = () => {
    setCode('');
    setInput('');
    setOutput('');
    setError('');
  };

  // 加载模板
  const loadTemplate = () => {
    const template = templates[language as keyof typeof templates] || '';
    setCode(template);
    setOutput('');
    setError('');
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      {/* 工具栏 */}
      <div className="bg-gray-50 border-b border-gray-200 p-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Select
              value={language}
              onChange={setLanguage}
              className="w-40"
              size="large"
            >
              {languages.map(lang => (
                <Select.Option key={lang.value} value={lang.value}>
                  {lang.label}
                </Select.Option>
              ))}
            </Select>

            <Button
              type="primary"
              size="large"
              onClick={runCode}
              loading={isRunning}
              disabled={!code.trim()}
            >
              {isRunning ? '执行中...' : '运行代码'}
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={loadTemplate}>
              加载模板
            </Button>
            <Button onClick={clearAll} danger>
              清空
            </Button>
          </div>
        </div>
      </div>

      {/* 主要编辑区域 - 左右分栏 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* 左侧：代码编辑器 */}
        <div className="border-r border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">代码编辑器</h3>
          <TextArea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="请输入代码..."
            className="font-mono text-sm resize-none border-2"
            style={{ height: '500px' }}
            autoSize={false}
          />
        </div>

        {/* 右侧：输入和输出区域 */}
        <div className="p-6 space-y-6">
          {/* 输入数据 */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800">输入数据</h3>
            <TextArea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="如果程序需要输入数据，请在这里输入..."
              className="font-mono text-sm resize-none border-2"
              style={{ height: '120px' }}
              autoSize={false}
            />
          </div>

          {/* 输出结果 */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800">
              {error ? '错误信息' : '输出结果'}
            </h3>
            
            {error ? (
              <Alert
                type="error"
                message="执行错误"
                description={
                  <pre className="whitespace-pre-wrap text-sm font-mono mt-2 max-h-64 overflow-auto">
                    {error}
                  </pre>
                }
                showIcon
              />
            ) : output ? (
              <div className="border-2 border-gray-200 rounded-lg p-4 bg-gray-50">
                <pre className="whitespace-pre-wrap text-sm font-mono text-gray-800 max-h-64 overflow-auto">
                  {output}
                </pre>
              </div>
            ) : (
              <div className="border-2 border-gray-200 rounded-lg p-4 bg-gray-50 text-center text-gray-500">
                <div className="text-2xl mb-2">💻</div>
                <p>点击"运行代码"查看执行结果</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedCodeEditor; 
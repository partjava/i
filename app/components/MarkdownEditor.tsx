'use client';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function MarkdownEditor({ value, onChange, placeholder, className }: MarkdownEditorProps) {
  const [mode, setMode] = useState<'edit' | 'preview' | 'split'>('split');

  return (
    <div className={`border border-gray-300 rounded-lg overflow-hidden ${className}`}>
      {/* 工具栏 */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setMode('edit')}
            className={`px-3 py-1 rounded text-sm ${
              mode === 'edit' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            编辑
          </button>
          <button
            type="button"
            onClick={() => setMode('split')}
            className={`px-3 py-1 rounded text-sm ${
              mode === 'split' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            分屏
          </button>
          <button
            type="button"
            onClick={() => setMode('preview')}
            className={`px-3 py-1 rounded text-sm ${
              mode === 'preview' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            预览
          </button>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>支持Markdown语法</span>
        </div>
      </div>

      {/* 编辑器内容区 */}
      <div className="flex" style={{ height: '400px' }}>
        {/* 编辑区域 */}
        {(mode === 'edit' || mode === 'split') && (
          <div className={`${mode === 'split' ? 'w-1/2 border-r border-gray-300' : 'w-full'}`}>
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder || '请输入Markdown格式的内容...\n\n示例：\n# 标题\n## 子标题\n**粗体** *斜体*\n\n```javascript\nconsole.log("代码块");\n```\n\n- 列表项1\n- 列表项2'}
              className="w-full h-full p-4 resize-none border-none outline-none font-mono text-sm"
              style={{ fontFamily: 'Consolas, Monaco, "Courier New", monospace' }}
            />
          </div>
        )}

        {/* 预览区域 */}
        {(mode === 'preview' || mode === 'split') && (
          <div className={`${mode === 'split' ? 'w-1/2' : 'w-full'} bg-white overflow-auto`}>
            <div className="p-4 prose prose-sm max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  code({ node, inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <pre className={className} {...props}>
                        <code className={className}>{children}</code>
                      </pre>
                    ) : (
                      <code className="bg-gray-100 px-1 py-0.5 rounded text-sm" {...props}>
                        {children}
                      </code>
                    );
                  },
                  table({ children }) {
                    return (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
                          {children}
                        </table>
                      </div>
                    );
                  },
                  th({ children }) {
                    return (
                      <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                        {children}
                      </th>
                    );
                  },
                  td({ children }) {
                    return (
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-b border-gray-200">
                        {children}
                      </td>
                    );
                  },
                }}
              >
                {value || '# 预览区域\n\n在左侧编辑区域输入Markdown内容，这里会实时显示预览效果。\n\n支持的功能：\n- **粗体**、*斜体*\n- `行内代码`\n- 代码块\n- 表格\n- 列表\n- 链接等'}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>

      {/* 底部状态栏 */}
      <div className="bg-gray-50 border-t border-gray-300 px-4 py-2 text-xs text-gray-600 flex justify-between">
        <span>字符数: {value.length}</span>
        <span>行数: {value.split('\n').length}</span>
      </div>
    </div>
  );
} 
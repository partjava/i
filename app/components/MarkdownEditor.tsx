'use client';
import { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function MarkdownEditor({ value, onChange, placeholder, className }: MarkdownEditorProps) {
  const [mode, setMode] = useState<'edit' | 'preview' | 'split'>('edit');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 在光标位置插入文本
  const insertAtCursor = (before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.slice(start, end);
    const newValue = value.slice(0, start) + before + selected + after + value.slice(end);
    onChange(newValue);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selected.length);
    }, 0);
  };

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch('/api/upload/image', { method: 'POST', body: formData, credentials: 'include' });
      const data = await res.json();
      if (res.ok && data.url) {
        const altText = file.name.replace(/\.[^.]+$/, '');
        insertAtCursor(`![${altText}](${data.url})`);
      } else {
        alert(data.error || '上传失败');
      }
    } catch {
      alert('上传失败，请重试');
    } finally {
      setUploading(false);
    }
  };

  // 拖拽上传
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file);
    }
  };

  return (
    <div className={`border border-gray-300 rounded-lg overflow-hidden ${className}`}>
      {/* 工具栏 */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-1 flex-wrap">
          {/* 模式切换 */}
          <button type="button" onClick={() => setMode('edit')} className={`px-3 py-1 rounded text-sm ${mode === 'edit' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>编辑</button>
          <button type="button" onClick={() => setMode('split')} className={`px-3 py-1 rounded text-sm ${mode === 'split' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>分屏</button>
          <button type="button" onClick={() => setMode('preview')} className={`px-3 py-1 rounded text-sm ${mode === 'preview' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>预览</button>

          <span className="text-gray-300 mx-1">|</span>

          {/* 格式快捷键 */}
          <button type="button" title="粗体" onClick={() => insertAtCursor('**', '**')} className="px-2 py-1 rounded text-sm bg-gray-200 hover:bg-gray-300 font-bold">B</button>
          <button type="button" title="斜体" onClick={() => insertAtCursor('*', '*')} className="px-2 py-1 rounded text-sm bg-gray-200 hover:bg-gray-300 italic">I</button>
          <button type="button" title="行内代码" onClick={() => insertAtCursor('`', '`')} className="px-2 py-1 rounded text-sm bg-gray-200 hover:bg-gray-300 font-mono">`</button>
          <button type="button" title="代码块" onClick={() => insertAtCursor('```\n', '\n```')} className="px-2 py-1 rounded text-sm bg-gray-200 hover:bg-gray-300 font-mono text-xs">{'{}'}</button>
          <button type="button" title="标题" onClick={() => insertAtCursor('## ')} className="px-2 py-1 rounded text-sm bg-gray-200 hover:bg-gray-300">H</button>
          <button type="button" title="链接" onClick={() => insertAtCursor('[', '](url)')} className="px-2 py-1 rounded text-sm bg-gray-200 hover:bg-gray-300">🔗</button>

          <span className="text-gray-300 mx-1">|</span>

          {/* 图片上传 */}
          <button
            type="button"
            title="上传图片"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className="px-2 py-1 rounded text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 disabled:opacity-50 flex items-center gap-1"
          >
            {uploading ? '上传中...' : '🖼️ 图片'}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImageUpload(file);
              e.target.value = '';
            }}
          />
        </div>

        <span className="text-xs text-gray-500">支持拖拽图片</span>
      </div>

      {/* 编辑器内容区 */}
      <div className="flex" style={{ height: '400px' }}>
        {/* 编辑区域 */}
        {(mode === 'edit' || mode === 'split') && (
          <div className={`${mode === 'split' ? 'w-1/2 border-r border-gray-300' : 'w-full'}`}>
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              placeholder={placeholder || '请输入Markdown格式的内容...\n\n示例：\n# 标题\n## 子标题\n**粗体** *斜体*\n\n```javascript\nconsole.log("代码块");\n```\n\n- 列表项1\n- 列表项2\n\n可直接拖拽图片到此处上传'}
              className="w-full h-full p-4 resize-none border-none outline-none font-mono text-sm bg-white text-gray-900"
              style={{ fontFamily: 'Consolas, Monaco, "Courier New", monospace', lineHeight: '1.6' }}
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
'use client';
import { useState } from 'react';

interface NoteEditorProps {
  onSave: (title: string, content: string) => void;
}

export default function NoteEditor({ onSave }: NoteEditorProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSave(title, content);
      setTitle('');
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-line-subtle bg-surface-raised p-4 shadow-frost">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-content-secondary">
          标题
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field mt-1 block w-full"
          placeholder="输入笔记标题"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-content-secondary">
          内容
        </label>
        <textarea
          id="content"
          rows={8}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="input-field mt-1 block w-full"
          placeholder="输入笔记内容"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="btn btn-primary"
        >
          保存笔记
        </button>
      </div>
    </form>
  );
}

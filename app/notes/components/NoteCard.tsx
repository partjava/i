'use client';

import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import mobileStyles from '../mobile-notes.module.css';
import type { Note } from '../page';

export interface NoteCardProps {
  note: Note;
  viewMode: 'my' | 'public';
  isMultiSelectMode: boolean;
  isSelected: boolean;
  onToggleSelect: (noteId: string, checked: boolean) => void;
  onOpen: (noteId: string) => void;
  onEdit: (noteId: string) => void;
  onDelete: (noteId: string) => void;
}

/**
 * 笔记卡片：多选勾选 / 标题与元信息 / 编辑删除操作 / 内容预览 / 标签与统计
 * （从 notes/page.tsx 抽出，样式与行为保持不变）
 */
export default function NoteCard({
  note, viewMode, isMultiSelectMode, isSelected,
  onToggleSelect, onOpen, onEdit, onDelete,
}: NoteCardProps) {
  const noteId = String(note.id || note._id || '');

  return (
    <div
      id={`note-${noteId}`}
      className={`${mobileStyles.note} bg-surface-raised rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow ${
        isMultiSelectMode && viewMode === 'my' ? 'border-2 ' + (isSelected ? 'border-content-muted' : 'border-transparent') : ''
      } ${!isMultiSelectMode ? 'cursor-pointer' : ''}`}
      onClick={() => {
        if (isMultiSelectMode) return;
        onOpen(noteId);
      }}
    >
      <div className="flex justify-between items-start mb-4">
        {isMultiSelectMode && viewMode === 'my' && (
          <div className="mr-3 mt-1">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => onToggleSelect(noteId, e.target.checked)}
              className="h-5 w-5 rounded border-line-strong text-content-muted focus:ring-content-muted"
            />
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">
            <Link
              href={`/notes/${noteId}`}
              className="text-content-muted hover:text-content-primary"
              onClick={(e) => {
                e.stopPropagation();
                onOpen(noteId);
              }}
            >
              {note.title}
            </Link>
          </h3>
          <div className={`${mobileStyles.metadata} flex items-center space-x-4 text-sm text-content-muted mb-2`}>
            {note.category && (
              <span className="bg-surface-page text-content-primary px-2 py-1 rounded">
                {note.category}
              </span>
            )}
            {note.technology && (
              <span className="bg-surface-muted text-content-secondary px-2 py-1 rounded">
                {note.technology}
              </span>
            )}
            <span>{new Date(note.createdAt).toLocaleDateString()}</span>
            {note.author_name && (
              <span>作者：{note.author_name}</span>
            )}
          </div>
        </div>
        {viewMode === 'my' && !isMultiSelectMode && (
          <div className="flex space-x-2">
            <Link
              href={`/notes/${noteId}/edit`}
              className="text-content-muted hover:text-content-primary text-sm"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(noteId);
              }}
            >
              编辑
            </Link>
            <button
              onClick={(e) => {
                e.stopPropagation();
                // 优先使用数字ID，因为API期望数字ID
                const numericId = note.id || (note._id ? parseInt(note._id.toString(), 10) : null);
                if (numericId) {
                  onDelete(numericId.toString());
                } else {
                  alert('无法删除笔记：无效的笔记ID');
                }
              }}
              onMouseDown={(e) => e.stopPropagation()}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              删除
            </button>
          </div>
        )}
      </div>

      <div className={`${mobileStyles.prose} prose max-w-none mb-4`}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {note.content.length > 200 ? note.content.substring(0, 200) + '...' : note.content}
        </ReactMarkdown>
      </div>

      {/* 标签 */}
      {note.tags && note.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {note.tags.map((tag, index) => (
            <span key={index} className="bg-surface-page text-content-primary px-2 py-1 text-xs rounded">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* 统计信息 */}
      <div className="flex items-center space-x-4 text-sm text-content-muted">
        <span>👍 {note.likeCount || note.like_count || 0}</span>
        <span>🔖 {note.bookmarkCount || note.bookmark_count || 0}</span>
        <span>💬 {note.commentCount || note.comment_count || 0}</span>
        {note.isPublic && <span className="text-green-600">公开</span>}
      </div>
    </div>
  );
}

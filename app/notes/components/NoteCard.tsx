'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Pin,
  BookOpen,
  Layers,
  Heart,
  Bookmark,
  MessageSquare,
  MoreHorizontal,
  FolderInput,
  FolderOutput,
  FilePlus2,
  Download,
  Pencil,
  Trash2,
  Globe,
  Lock,
  GripVertical,
  Clock,
  ChevronRight,
} from 'lucide-react';
import type { Note } from '../page';
import { stripMarkdown, calcReadingStats } from '../utils';

export interface NoteCardProps {
  note: Note;
  layoutMode: 'grid' | 'list';
  canManage: boolean;
  isMultiSelectMode: boolean;
  isSelected: boolean;
  isDragOverTarget: boolean;
  isDraggingSelf: boolean;
  onToggleSelect: (noteId: string, checked: boolean) => void;
  onOpen: (noteId: string) => void;
  onEdit: (noteId: string) => void;
  onDelete: (noteId: string) => void;
  onDragStartNote: (noteId: string, e: React.DragEvent) => void;
  onDragEndNote: () => void;
  onDragOverNote: (noteId: string, e: React.DragEvent) => void;
  onDropOnNote: (targetNoteId: string, e: React.DragEvent) => void;
  onTogglePin: (noteId: string) => void;
  onOpenMoveModal: (note: Note) => void;
  onAddChildChapter: (parentNote: Note) => void;
  onRemoveFromParent: (noteId: string) => void;
  onExportMd: (note: Note) => void;
}

export default function NoteCard({
  note,
  layoutMode,
  canManage,
  isMultiSelectMode,
  isSelected,
  isDragOverTarget,
  isDraggingSelf,
  onToggleSelect,
  onOpen,
  onEdit,
  onDelete,
  onDragStartNote,
  onDragEndNote,
  onDragOverNote,
  onDropOnNote,
  onTogglePin,
  onOpenMoveModal,
  onAddChildChapter,
  onRemoveFromParent,
  onExportMd,
}: NoteCardProps) {
  const noteId = String(note.id || note._id || '');
  const childrenList = note.children || [];
  const childCount = note.childCount ?? childrenList.length;
  const isCollection = childCount > 0;
  const isPinned = Boolean(note.isPinned);

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [menuOpen]);

  const excerpt = stripMarkdown(note.content || '');
  const { words, minutes } = calcReadingStats(note.content || '');
  const likeCount = note.likeCount ?? note.like_count ?? 0;
  const bookmarkCount = note.bookmarkCount ?? note.bookmark_count ?? 0;
  const commentCount = note.commentCount ?? note.comment_count ?? 0;
  const updatedStr = new Date(note.updatedAt || note.createdAt).toLocaleDateString('zh-CN');

  return (
    <div
      id={`note-${noteId}`}
      draggable={canManage && !isMultiSelectMode}
      onDragStart={(e) => canManage && !isMultiSelectMode && onDragStartNote(noteId, e)}
      onDragEnd={onDragEndNote}
      onDragOver={(e) => canManage && onDragOverNote(noteId, e)}
      onDrop={(e) => canManage && onDropOnNote(noteId, e)}
      onClick={() => {
        if (isMultiSelectMode) {
          onToggleSelect(noteId, !isSelected);
          return;
        }
        onOpen(noteId);
      }}
      className={`group relative rounded-2xl border transition-all duration-200 flex flex-col ${
        layoutMode === 'list' ? 'p-4 sm:p-5' : 'p-5'
      } ${
        isDragOverTarget
          ? 'border-[#D4AD72] border-dashed ring-2 ring-[#D4AD72]/50 bg-[#D4AD72]/10 dark:bg-[#D4AD72]/15 scale-[1.01]'
          : isSelected && isMultiSelectMode
          ? 'border-[#1B3B6F] dark:border-[#D4AD72] ring-2 ring-[#1B3B6F]/25 dark:ring-[#D4AD72]/25 bg-surface-raised'
          : isPinned
          ? 'border-[#D4AD72]/55 bg-surface-raised shadow-sm hover:shadow-md'
          : 'border-line-subtle bg-surface-raised shadow-sm hover:shadow-md hover:border-[#D4AD72]/50'
      } ${isDraggingSelf ? 'opacity-45 scale-[0.98]' : ''} ${
        isCollection
          ? 'shadow-[4px_4px_0_0_rgba(27,59,111,0.08)] dark:shadow-[4px_4px_0_0_rgba(212,173,114,0.12)]'
          : ''
      } cursor-pointer`}
    >
      {/* 合集左书脊装饰 */}
      {isCollection && (
        <div
          aria-hidden="true"
          className="absolute left-0 top-4 bottom-4 w-1 rounded-r-full bg-gradient-to-b from-[#1B3B6F] via-[#D4AD72] to-[#1B3B6F] dark:from-[#D4AD72] dark:to-[#8AB4F8]"
        />
      )}

      {/* 拖拽放手提示徽标 */}
      {isDragOverTarget && (
        <div className="absolute -top-3 right-4 z-20 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F1D33] dark:bg-[#D4AD72] text-white dark:text-[#0F1D33] text-xs font-bold shadow-lg animate-bounce">
          <Layers className="w-3.5 h-3.5" />
          <span>松手收纳为子章节</span>
        </div>
      )}

      {/* 顶栏徽标 + 操作 */}
      <div className="flex items-start justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-1.5 flex-wrap min-w-0">
          {isMultiSelectMode && canManage && (
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => onToggleSelect(noteId, e.target.checked)}
              onClick={(e) => e.stopPropagation()}
              className="h-4 w-4 rounded border-line-strong text-[#1B3B6F] focus:ring-[#D4AD72] mr-1 cursor-pointer"
            />
          )}

          {canManage && !isMultiSelectMode && (
            <span
              className="text-content-muted/50 group-hover:text-content-muted transition-colors cursor-grab active:cursor-grabbing"
              title="按住拖拽至其他卡片合并章节，或拖至左侧分类改分类"
            >
              <GripVertical className="w-4 h-4" />
            </span>
          )}

          {isPinned && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#D4AD72]/18 text-[#9A7234] dark:text-[#E8CA96] border border-[#D4AD72]/35">
              <Pin className="w-3 h-3" />
              置顶
            </span>
          )}

          {isCollection && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#1B3B6F]/10 text-[#1B3B6F] dark:bg-sky-500/15 dark:text-sky-300 border border-[#1B3B6F]/20 dark:border-sky-400/25">
              <BookOpen className="w-3 h-3" />
              合集 · {childCount} 章
            </span>
          )}

          {note.parentTitle && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-surface-muted text-content-secondary border border-line-subtle max-w-[160px] truncate">
              属于《{note.parentTitle}》
            </span>
          )}

          {note.isPublic ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
              <Globe className="w-3 h-3" />
              公开
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-surface-muted text-content-muted">
              <Lock className="w-3 h-3" />
              私密
            </span>
          )}
        </div>

        {/* 右上角快捷菜单 */}
        {canManage && !isMultiSelectMode && (
          <div className="relative flex items-center gap-1 shrink-0" ref={menuRef} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => onTogglePin(noteId)}
              title={isPinned ? '取消置顶' : '置顶笔记'}
              className={`p-1.5 rounded-lg transition-colors ${
                isPinned
                  ? 'text-[#D4AD72] bg-[#D4AD72]/12'
                  : 'text-content-muted opacity-0 group-hover:opacity-100 hover:bg-surface-muted hover:text-content-primary'
              }`}
            >
              <Pin className="w-3.5 h-3.5" />
            </button>
            <Link
              href={`/notes/${noteId}/edit`}
              onClick={() => onEdit(noteId)}
              title="编辑笔记"
              className="p-1.5 rounded-lg text-content-muted opacity-0 group-hover:opacity-100 hover:bg-surface-muted hover:text-content-primary transition-colors"
            >
              <Pencil className="w-3.5 h-3.5" />
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              title="更多操作"
              className="p-1.5 rounded-lg text-content-muted hover:bg-surface-muted hover:text-content-primary transition-colors"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-9 w-44 rounded-xl bg-surface-raised border border-line-subtle shadow-xl py-1.5 z-30 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onTogglePin(noteId);
                  }}
                  className="w-full px-3 py-2 text-left flex items-center gap-2 text-content-primary hover:bg-surface-muted transition-colors"
                >
                  <Pin className="w-3.5 h-3.5 text-[#D4AD72]" />
                  <span>{isPinned ? '取消置顶' : '置顶此笔记'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onAddChildChapter(note);
                  }}
                  className="w-full px-3 py-2 text-left flex items-center gap-2 text-content-primary hover:bg-surface-muted transition-colors"
                >
                  <FilePlus2 className="w-3.5 h-3.5 text-sky-500" />
                  <span>新建子章节</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onOpenMoveModal(note);
                  }}
                  className="w-full px-3 py-2 text-left flex items-center gap-2 text-content-primary hover:bg-surface-muted transition-colors"
                >
                  <FolderInput className="w-3.5 h-3.5 text-indigo-500" />
                  <span>移入合集 / 改分类</span>
                </button>
                {note.parentId && (
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      onRemoveFromParent(noteId);
                    }}
                    className="w-full px-3 py-2 text-left flex items-center gap-2 text-content-primary hover:bg-surface-muted transition-colors"
                  >
                    <FolderOutput className="w-3.5 h-3.5 text-amber-500" />
                    <span>移出所属合集</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onExportMd(note);
                  }}
                  className="w-full px-3 py-2 text-left flex items-center gap-2 text-content-primary hover:bg-surface-muted transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-500" />
                  <span>导出 Markdown</span>
                </button>
                <div className="my-1 border-t border-line-subtle" />
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onDelete(noteId);
                  }}
                  className="w-full px-3 py-2 text-left flex items-center gap-2 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>删除笔记</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 标题与摘要 */}
      <h3 className="text-[17px] font-bold font-display text-content-primary group-hover:text-brand-primary dark:group-hover:text-[#D4AD72] transition-colors line-clamp-2 leading-snug mb-2">
        <Link
          href={`/notes/${noteId}`}
          onClick={(e) => {
            e.stopPropagation();
            onOpen(noteId);
          }}
        >
          {note.title}
        </Link>
      </h3>

      <p
        className={`text-sm text-content-secondary leading-relaxed mb-3 ${
          layoutMode === 'list' ? 'line-clamp-2' : 'line-clamp-3 flex-1'
        }`}
      >
        {excerpt || '暂无正文摘要，点击进入编写或阅读详情'}
      </p>

      {/* 合集子章节预览列表 */}
      {childrenList.length > 0 && (
        <div
          className="mb-3.5 rounded-xl bg-surface-page/80 dark:bg-white/[0.03] border border-line-subtle p-2.5 space-y-1"
          onClick={(e) => e.stopPropagation()}
        >
          {childrenList.slice(0, 3).map((ch, idx) => (
            <Link
              key={ch.id}
              href={`/notes/${ch.id}`}
              className="flex items-center justify-between gap-2 px-2 py-1 rounded-lg text-xs text-content-secondary hover:text-content-primary hover:bg-surface-raised transition-colors"
            >
              <span className="flex items-center gap-2 min-w-0">
                <span className="font-mono text-[10px] text-[#9A7234] dark:text-[#D4AD72] font-bold shrink-0">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="truncate">{ch.title}</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-content-muted shrink-0" />
            </Link>
          ))}
          {childrenList.length > 3 && (
            <div className="px-2 pt-0.5 text-[11px] text-content-muted font-mono">
              + 还有 {childrenList.length - 3} 个子章节，点击合集查看全书目录
            </div>
          )}
        </div>
      )}

      {/* 分类与标签 */}
      {(note.category || note.technology || (note.tags && note.tags.length > 0)) && (
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          {note.category && (
            <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-[#1B3B6F]/10 text-[#1B3B6F] dark:bg-sky-500/15 dark:text-sky-300">
              {note.category}
            </span>
          )}
          {note.technology && note.technology !== note.category && (
            <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-surface-muted text-content-secondary">
              {note.technology}
            </span>
          )}
          {note.tags?.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-0.5 rounded-md text-[11px] bg-surface-page text-content-muted border border-line-subtle"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* 底部元信息栏 */}
      <div className="pt-3 mt-auto border-t border-line-subtle flex flex-wrap items-center justify-between gap-2 text-xs text-content-muted">
        <div className="flex items-center gap-3 font-code tabular-nums">
          <span className="inline-flex items-center gap-1" title="点赞数">
            <Heart className={`w-3.5 h-3.5 ${note.liked ? 'text-rose-500 fill-current' : ''}`} />
            {likeCount}
          </span>
          <span className="inline-flex items-center gap-1" title="收藏数">
            <Bookmark className={`w-3.5 h-3.5 ${note.bookmarked ? 'text-[#D4AD72] fill-current' : ''}`} />
            {bookmarkCount}
          </span>
          <span className="inline-flex items-center gap-1" title="评论数">
            <MessageSquare className="w-3.5 h-3.5" />
            {commentCount}
          </span>
        </div>

        <div className="flex items-center gap-2.5 font-mono text-[11px]">
          <span className="inline-flex items-center gap-1" title="字数与预计阅读时长">
            <Clock className="w-3 h-3" />
            {words} 字 · {minutes} 分钟
          </span>
          <span>·</span>
          <span>{updatedStr}</span>
          {note.author_name && (
            <span className="hidden sm:inline text-content-secondary">· {note.author_name}</span>
          )}
        </div>
      </div>
    </div>
  );
}

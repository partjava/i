'use client';

import React, { useState, useMemo } from 'react';
import { Card, Table, Tag, Popconfirm, Button, Input, Modal, Space } from 'antd';
import { Trash2, Eye } from 'lucide-react';
import { SearchOutlined } from '@ant-design/icons';

// 后端 notes 表的实际字段
interface NoteRecord {
  id: number;
  title: string;
  content: string;
  category: string;
  technology?: string;
  tags?: string[] | string;
  isPublic?: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
}

interface NoteTabProps {
  notes: NoteRecord[];
  users?: Array<{ id: number; username: string }>;
  onDeleteNote: (key: string) => void;
  onToggleNotePublic: (key: string, currentPublic: boolean) => void;
  onRefresh?: () => void;
}

function getAuthorName(authorId: number, users?: Array<{ id: number; username: string }>) {
  if (!users) return `UID-${authorId}`;
  const u = users.find(u => u.id === authorId);
  return u ? `@${u.username}` : `UID-${authorId}`;
}

export default function NoteTab({ notes, users, onDeleteNote, onToggleNotePublic, onRefresh }: NoteTabProps) {
  const [search, setSearch] = useState('');
  const [previewNote, setPreviewNote] = useState<NoteRecord | null>(null);

  const filteredNotes = useMemo(() => {
    if (!search.trim()) return notes;
    const kw = search.trim().toLowerCase();
    return notes.filter(n =>
      n.title?.toLowerCase().includes(kw) ||
      n.content?.toLowerCase().includes(kw) ||
      n.category?.toLowerCase().includes(kw) ||
      getAuthorName(n.authorId, users).toLowerCase().includes(kw) ||
      String(n.id).includes(kw)
    );
  }, [notes, users, search]);

  return (
    <Card
      title={<span className="text-slate-200 font-bold">📝 全站随堂笔记内容与分享合规性审核</span>}
      extra={
        <div className="flex items-center gap-3">
          <Input
            prefix={<SearchOutlined />}
            placeholder="搜索标题/内容/作者/ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            allowClear
            size="small"
            className="w-56"
          />
          {onRefresh && (
            <button onClick={onRefresh} className="text-xs text-brand-primary bg-brand-soft hover:bg-surface-muted border border-line-subtle px-3 py-1 rounded-lg transition-colors">
              刷新
            </button>
          )}
        </div>
      }
      bordered={false}
      className="bg-surface-raised border border-line-subtle rounded-2xl shadow-sm"
    >
      <Table
        dataSource={filteredNotes}
        rowKey="id"
        pagination={{ pageSize: 8 }}
        columns={[
          { title: '笔记ID', dataIndex: 'id', key: 'id', width: 60, render: (val: number) => <span className="font-mono text-brand-primary">#{val}</span> },
          { title: '笔记标题', dataIndex: 'title', key: 'title', render: (text: string) => <span className="font-semibold text-content-primary">{text}</span> },
          { title: '作者', dataIndex: 'authorId', key: 'authorId', render: (val: number) => <span className="text-content-muted">{getAuthorName(val, users)}</span> },
          { title: '所属分类', dataIndex: 'category', key: 'category', render: (text: string) => text || '—' },
          { title: '创建日期', dataIndex: 'createdAt', key: 'createdAt', render: (val: string) => val ? new Date(val).toLocaleDateString('zh-CN') : '—' },
          {
            title: '共享类型',
            dataIndex: 'isPublic',
            key: 'isPublic',
            render: (isPublic: boolean, record: NoteRecord) => (
              <Tag
                color={isPublic ? 'blue' : 'gray'}
                style={{ cursor: 'pointer' }}
                onClick={() => onToggleNotePublic(String(record.id), !!isPublic)}
              >
                {isPublic ? '🌐 公开共享' : '🔒 私人笔记'}
              </Tag>
            )
          },
          {
            title: '审核控制',
            key: 'actions',
            render: (_: any, record: NoteRecord) => (
              <Space size="small">
                <Button
                  size="small"
                  icon={<Eye size={12} className="inline mr-1" />}
                  onClick={() => setPreviewNote(record)}
                >
                  预览内容
                </Button>
                <Popconfirm
                  title="确定要物理删除该学员的这篇随堂笔记吗？删除后将无法恢复。"
                  onConfirm={() => onDeleteNote(String(record.id))}
                  okText="确认下架删除"
                  cancelText="取消"
                  okButtonProps={{ danger: true }}
                >
                  <Button
                    type="primary"
                    danger
                    ghost
                    size="small"
                    icon={<Trash2 size={12} className="inline mr-1" />}
                  >
                    违规下架
                  </Button>
                </Popconfirm>
              </Space>
            )
          }
        ]}
      />
      <Modal
        title={previewNote ? `笔记预览 #${previewNote.id}: ${previewNote.title}` : ''}
        open={previewNote !== null}
        onCancel={() => setPreviewNote(null)}
        footer={[
          <Button key="close" type="primary" onClick={() => setPreviewNote(null)}>关闭</Button>
        ]}
        width={680}
      >
        {previewNote && (
          <div className="space-y-3 text-content-secondary text-sm">
            <div className="flex flex-wrap items-center gap-2 text-xs text-content-muted">
              <span>作者: {getAuthorName(previewNote.authorId, users)}</span>
              <span>•</span>
              <span>分类: {previewNote.category || '—'}</span>
              {previewNote.technology && (
                <>
                  <span>•</span>
                  <span>技术栈: {previewNote.technology}</span>
                </>
              )}
              <Tag color={previewNote.isPublic ? 'blue' : 'default'}>
                {previewNote.isPublic ? '公开' : '私有'}
              </Tag>
            </div>
            <div className="p-3 rounded-xl bg-surface-muted border border-line-subtle text-content-primary whitespace-pre-wrap max-h-[380px] overflow-y-auto leading-relaxed">
              {previewNote.content || '(无正文内容)'}
            </div>
          </div>
        )}
      </Modal>
    </Card>
  );
}

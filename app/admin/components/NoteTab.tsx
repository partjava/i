'use client';

import React from 'react';
import { Card, Table, Tag, Popconfirm, Button } from 'antd';
import { Trash2 } from 'lucide-react';

// 后端 notes 表的实际字段
interface NoteRecord {
  id: number;
  title: string;
  content: string;
  category: string;
  technology?: string;
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
}

function getAuthorName(authorId: number, users?: Array<{ id: number; username: string }>) {
  if (!users) return `UID-${authorId}`;
  const u = users.find(u => u.id === authorId);
  return u ? `@${u.username}` : `UID-${authorId}`;
}

export default function NoteTab({ notes, users, onDeleteNote, onToggleNotePublic }: NoteTabProps) {
  return (
    <Card
      title={<span className="text-slate-200 font-bold">📝 全站随堂笔记内容与分享合规性审核</span>}
      bordered={false}
      className="bg-slate-900 border border-slate-800"
    >
      <Table
        dataSource={notes}
        rowKey="id"
        pagination={{ pageSize: 6 }}
        columns={[
          { title: '笔记ID', dataIndex: 'id', key: 'id', width: 60, render: (val: number) => <span className="font-mono text-indigo-400">#{val}</span> },
          { title: '笔记标题', dataIndex: 'title', key: 'title', render: (text: string) => <span className="font-semibold text-slate-200">{text}</span> },
          { title: '作者', dataIndex: 'authorId', key: 'authorId', render: (val: number) => <span className="text-slate-400">{getAuthorName(val, users)}</span> },
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
            )
          }
        ]}
      />
    </Card>
  );
}

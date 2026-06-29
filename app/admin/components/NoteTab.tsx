'use client';

import React from 'react';
import { Card, Table, Tag, Popconfirm, Button } from 'antd';
import { Trash2 } from 'lucide-react';

interface NoteTabProps {
  notes: Array<{ key: string; title: string; author: string; category: string; isPublic: boolean; date: string }>;
  onDeleteNote: (key: string) => void;
  onToggleNotePublic: (key: string, currentPublic: boolean) => void;
}

export default function NoteTab({ notes, onDeleteNote, onToggleNotePublic }: NoteTabProps) {
  return (
    <Card 
      title={<span className="text-slate-200 font-bold">📝 全站随堂笔记内容与分享合规性审核</span>} 
      bordered={false} 
      className="bg-slate-900 border border-slate-800"
    >
      <Table 
        dataSource={notes} 
        pagination={{ pageSize: 6 }}
        columns={[
          { title: '笔记题目', dataIndex: 'title', key: 'title', render: text => <span className="font-semibold text-slate-200">{text}</span> },
          { title: '记录作者', dataIndex: 'author', key: 'author', render: val => <span className="text-slate-400">@{val}</span> },
          { title: '所属关卡分类', dataIndex: 'category', key: 'category' },
          { title: '记录日期', dataIndex: 'date', key: 'date' },
          { 
            title: '共享类型', 
            dataIndex: 'isPublic', 
            key: 'isPublic',
            render: (isPublic, record) => (
              <Tag 
                color={isPublic ? 'blue' : 'gray'} 
                style={{ cursor: 'pointer' }} 
                onClick={() => onToggleNotePublic(record.key, isPublic)}
              >
                {isPublic ? '🌐 公开共享' : '🔒 私人笔记'}
              </Tag>
            )
          },
          {
            title: '审核控制',
            key: 'actions',
            render: (_, record) => (
              <Popconfirm
                title="确定要物理删除该学员的这篇随堂笔记吗？删除后将无法恢复。"
                onConfirm={() => onDeleteNote(record.key)}
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

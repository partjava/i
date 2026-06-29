'use client';

import React from 'react';
import { Card, Table, Tag, Button, Space } from 'antd';

interface UserRecord {
  key: string;
  id: number;
  username: string;
  email: string;
  role: string;
  status: string;
  regDate: string;
  vip?: boolean;
  vipLevel?: number;
  vipExpireTime?: string | null;
}

interface UserTabProps {
  users: UserRecord[];
  onToggleUserStatus: (key: string, currentStatus: string) => void;
  onChangeRole: (key: string, currentRole: string) => void;
  onGrantVip?: (key: string, level: number) => void;
}

const VIP_LEVEL_MAP: Record<number, { label: string; color: string }> = {
  0: { label: '普通用户', color: 'default' },
  1: { label: '👑 体验会员', color: 'gold' },
  2: { label: '🌟 进阶会员', color: 'purple' },
  3: { label: '🔥 永久共创', color: 'volcano' },
};

export default function UserTab({ users, onToggleUserStatus, onChangeRole, onGrantVip }: UserTabProps) {
  return (
    <Card
      title={<span className="text-slate-200 font-bold">👥 全站用户账户及角色限制</span>}
      bordered={false}
      className="bg-slate-900 border border-slate-800"
    >
      <Table
        dataSource={users}
        pagination={{ pageSize: 6 }}
        columns={[
          { title: '用户ID', dataIndex: 'id', key: 'id', render: val => <span className="font-mono text-indigo-400">#{val}</span> },
          { title: '用户名', dataIndex: 'username', key: 'username', render: text => <span className="font-semibold text-slate-200">{text}</span> },
          { title: '注册邮箱', dataIndex: 'email', key: 'email' },
          { title: '注册日期', dataIndex: 'regDate', key: 'regDate' },
          {
            title: '安全角色',
            dataIndex: 'role',
            key: 'role',
            render: role => (
              <Tag color={role === 'ADMIN' ? 'red' : 'blue'}>
                {role}
              </Tag>
            )
          },
          {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: status => (
              <Tag color={status === 'ACTIVE' ? 'green' : 'gray'} className="flex items-center gap-1 w-fit">
                <span className={`w-1.5 h-1.5 rounded-full ${status === 'ACTIVE' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'}`} />
                {status === 'ACTIVE' ? '正常运行' : '账号封禁'}
              </Tag>
            )
          },
          {
            title: '会员状态',
            key: 'vip',
            render: (_, record) => {
              const level = record.vipLevel || 0;
              const info = VIP_LEVEL_MAP[level] || VIP_LEVEL_MAP[0];
              const expired = record.vipExpireTime && new Date(record.vipExpireTime) < new Date();
              return (
                <div className="flex flex-col gap-0.5">
                  <Tag color={expired ? 'default' : info.color}>{expired ? '已过期' : info.label}</Tag>
                  {record.vipExpireTime && level > 0 && (
                    <span className="text-xs text-slate-500">
                      {level === 3 ? '永久' : `至 ${new Date(record.vipExpireTime).toLocaleDateString('zh-CN')}`}
                    </span>
                  )}
                </div>
              );
            }
          },
          {
            title: '管理操作',
            key: 'actions',
            render: (_, record) => (
              <Space size="small" wrap>
                <Button
                  type="primary"
                  danger={record.status === 'ACTIVE'}
                  ghost
                  size="small"
                  onClick={() => onToggleUserStatus(record.key, record.status)}
                >
                  {record.status === 'ACTIVE' ? '封禁' : '解封'}
                </Button>
                <Button
                  size="small"
                  onClick={() => onChangeRole(record.key, record.role)}
                >
                  切换角色
                </Button>
                {onGrantVip && (
                  <Button
                    size="small"
                    style={{ color: '#facc15', borderColor: '#facc1580', background: 'rgba(250,204,21,0.08)' }}
                    onClick={() => onGrantVip(record.key, (record.vipLevel || 0) < 3 ? (record.vipLevel || 0) + 1 : 3)}
                  >
                    👑 赠送会员
                  </Button>
                )}
              </Space>
            )
          }
        ]}
      />
    </Card>
  );
}

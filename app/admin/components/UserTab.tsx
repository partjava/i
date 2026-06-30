'use client';

import React, { useState, useMemo } from 'react';
import { Card, Table, Tag, Button, Space, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

// 后端 users 表的实际字段
interface UserRecord {
  id: number;
  username: string;
  nickname?: string;
  email: string;
  role: string;           // USER / ADMIN / OWNER
  status: string;         // ACTIVE / BANNED
  createdAt: string;      // 注册时间
  vip?: number;           // 0=普通, 1=VIP
  vipLevel?: number;      // 1=体验, 2=进阶, 3=永久共创
  vipExpireTime?: string | null;
}

interface UserTabProps {
  users: UserRecord[];
  onToggleUserStatus: (key: string, currentStatus: string) => void;
  onChangeRole: (key: string, currentRole: string) => void;
  onGrantVip?: (key: string, level: number) => void;
  onRefresh?: () => void;
}

const ROLE_ORDER: Record<string, number> = { OWNER: 0, ADMIN: 1, USER: 2 };
const ROLE_TAG: Record<string, { color: string; label: string }> = {
  OWNER: { color: 'gold', label: '👑 站长' },
  ADMIN: { color: 'red', label: '🛡️ 管理员' },
  USER: { color: 'blue', label: '👤 用户' },
};

const VIP_LEVEL_MAP: Record<number, { label: string; color: string }> = {
  0: { label: '普通用户', color: 'default' },
  1: { label: '👑 体验会员', color: 'gold' },
  2: { label: '🌟 进阶会员', color: 'purple' },
  3: { label: '🔥 永久共创', color: 'volcano' },
};

export default function UserTab({ users, onToggleUserStatus, onChangeRole, onGrantVip, onRefresh }: UserTabProps) {
  const [search, setSearch] = useState('');

  // 排序：站长 → 管理员 → 用户，然后按注册时间倒序；过滤搜索
  const sorted = useMemo(() => {
    let list = [...users];
    // 搜索过滤
    if (search.trim()) {
      const kw = search.trim().toLowerCase();
      list = list.filter(u =>
        u.username?.toLowerCase().includes(kw) ||
        u.nickname?.toLowerCase().includes(kw) ||
        u.email?.toLowerCase().includes(kw) ||
        String(u.id).includes(kw)
      );
    }
    // 角色排序
    list.sort((a, b) => {
      const ra = ROLE_ORDER[a.role] ?? 99;
      const rb = ROLE_ORDER[b.role] ?? 99;
      if (ra !== rb) return ra - rb;
      return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
    });
    return list;
  }, [users, search]);

  return (
    <Card
      title={<span className="text-slate-200 font-bold">👥 全站用户账户及角色限制</span>}
      extra={
        <div className="flex items-center gap-3">
          <Input
            prefix={<SearchOutlined />}
            placeholder="搜索用户名/邮箱/ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            allowClear
            size="small"
            className="w-48"
            style={{ background: '#0f1a2f', borderColor: '#234272', color: '#e2e8f0' }}
          />
          <button onClick={onRefresh} className="text-xs text-indigo-400 hover:text-indigo-300 bg-indigo-900/30 px-3 py-1 rounded">刷新</button>
        </div>
      }
      bordered={false}
      className="bg-slate-900 border border-slate-800"
    >
      <Table
        dataSource={sorted}
        rowKey="id"
        pagination={{ pageSize: 8 }}
        columns={[
          { title: '用户ID', dataIndex: 'id', key: 'id', render: (val: number) => <span className="font-mono text-indigo-400">#{val}</span> },
          { title: '用户名', dataIndex: 'username', key: 'username', render: (text: string) => <span className="font-semibold text-slate-200">{text}</span> },
          { title: '昵称', dataIndex: 'nickname', key: 'nickname', render: (text: string) => text || '—' },
          { title: '注册邮箱', dataIndex: 'email', key: 'email' },
          { title: '注册日期', dataIndex: 'createdAt', key: 'createdAt', render: (val: string) => val ? new Date(val).toLocaleDateString('zh-CN') : '—' },
          {
            title: '安全角色',
            dataIndex: 'role',
            key: 'role',
            render: (role: string) => {
              const info = ROLE_TAG[role] || { color: 'default', label: role };
              return <Tag color={info.color}>{info.label}</Tag>;
            }
          },
          {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
              <Tag color={status === 'ACTIVE' ? 'green' : 'gray'} className="flex items-center gap-1 w-fit">
                <span className={`w-1.5 h-1.5 rounded-full ${status === 'ACTIVE' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'}`} />
                {status === 'ACTIVE' ? '正常运行' : '账号封禁'}
              </Tag>
            )
          },
          {
            title: '会员状态',
            key: 'vip',
            render: (_: any, record: UserRecord) => {
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
            render: (_: any, record: UserRecord) => (
              <Space size="small" wrap>
                <Button
                  type="primary"
                  danger={record.status === 'ACTIVE'}
                  ghost
                  size="small"
                  onClick={() => onToggleUserStatus(String(record.id), record.status)}
                >
                  {record.status === 'ACTIVE' ? '封禁' : '解封'}
                </Button>
                <Button
                  size="small"
                  onClick={() => onChangeRole(String(record.id), record.role)}
                >
                  切换角色
                </Button>
                {onGrantVip && (
                  <Button
                    size="small"
                    style={{ color: '#facc15', borderColor: '#facc1580', background: 'rgba(250,204,21,0.08)' }}
                    onClick={() => onGrantVip(String(record.id), (record.vipLevel || 0) < 3 ? (record.vipLevel || 0) + 1 : 3)}
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

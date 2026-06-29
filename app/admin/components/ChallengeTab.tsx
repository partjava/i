'use client';

import React, { useState } from 'react';
import { Card, Table, Button, Modal, Form, Input, Row, Col } from 'antd';
import { Edit3 } from 'lucide-react';

interface ChallengeTabProps {
  challenges: Array<{ id: number; name: string; desc: string; codeTemplate: string; expectedOutput: string; topicCount: number }>;
  onSaveChallenge: (id: number, values: any) => void;
}

export default function ChallengeTab({ challenges, onSaveChallenge }: ChallengeTabProps) {
  const [editingChallenge, setEditingChallenge] = useState<any>(null);
  const [form] = Form.useForm();

  const openEditChallenge = (record: any) => {
    setEditingChallenge(record);
    form.setFieldsValue(record);
  };

  const handleSave = () => {
    form.validateFields().then(values => {
      onSaveChallenge(editingChallenge.id, values);
      setEditingChallenge(null);
    });
  };

  return (
    <Card 
      title={<span className="text-slate-200 font-bold">🪐 宇宙大地图关卡与评测逻辑维护</span>} 
      bordered={false} 
      className="bg-slate-900 border border-slate-800"
    >
      <Table 
        dataSource={challenges} 
        rowKey="id"
        pagination={false}
        columns={[
          { title: '关卡序号', dataIndex: 'id', key: 'id', render: val => <span className="font-mono">ST-0{val}</span> },
          { title: '行星关卡名称', dataIndex: 'name', key: 'name', render: text => <span className="font-semibold text-slate-100">{text}</span> },
          { title: '关卡描述信息', dataIndex: 'desc', key: 'desc', width: '35%' },
          { title: '关联子题目数', dataIndex: 'topicCount', key: 'topicCount', render: val => <span className="font-semibold text-indigo-400">{val} 道</span> },
          { title: 'Docker 期望输出', dataIndex: 'expectedOutput', key: 'expectedOutput', render: text => <code className="bg-slate-950 px-1.5 py-0.5 rounded text-amber-400 text-xs border border-slate-800 font-mono">{text}</code> },
          {
            title: '大地图维护',
            key: 'actions',
            render: (_, record) => (
              <Button 
                type="primary" 
                ghost 
                size="small" 
                icon={<Edit3 size={12} className="inline mr-1" />}
                onClick={() => openEditChallenge(record)}
              >
                编辑题目与评测
              </Button>
            )
          }
        ]}
      />

      {/* 关卡修改 Modal 弹窗 */}
      <Modal
        title={`🪐 编辑行星关卡 ST-0${editingChallenge?.id} : ${editingChallenge?.name}`}
        open={editingChallenge !== null}
        onOk={handleSave}
        onCancel={() => setEditingChallenge(null)}
        okText="保存修改并热更新"
        cancelText="取消"
        width={720}
        className="admin-edit-modal"
      >
        <Form form={form} layout="vertical" className="mt-4">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="name" label="行星关卡名称" rules={[{ required: true, message: '请输入关卡名称' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="topicCount" label="关联子题目数" rules={[{ required: true }]}>
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="desc" label="关卡导言描述" rules={[{ required: true }]}>
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="expectedOutput" label="Docker 判题期望标准输出 (Expected Output)" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="codeTemplate" label="编辑器起手代码模板 (Python)" rules={[{ required: true }]}>
            <Input.TextArea rows={6} className="font-mono text-xs bg-slate-950 text-emerald-400 border-slate-800" style={{ fontFamily: 'monospace' }} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}

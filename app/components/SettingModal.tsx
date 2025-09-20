import React, { useState, useEffect } from 'react';
import { Modal, Switch, Select, Space, Divider, Tag, Button, Alert, Form, Input, message } from 'antd';
import { useSession } from 'next-auth/react';

const LANG_OPTIONS = [
  { label: '中文', value: 'zh' },
  { label: 'English', value: 'en' },
];

interface SettingModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SettingModal({ open, onClose }: SettingModalProps) {
  const { data: session } = useSession();
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('zh');
  const [emailVerified, setEmailVerified] = useState<boolean | null>(null);
  const [email, setEmail] = useState('');
  const [changePwdOpen, setChangePwdOpen] = useState(false);
  const [pwdLoading, setPwdLoading] = useState(false);

  useEffect(() => {
    setTheme(localStorage.getItem('theme') || 'light');
    setLanguage(localStorage.getItem('language') || 'zh');
    // 暂时禁用邮箱验证状态检查
    if (session?.user) {
      setEmailVerified(false);
      setEmail(session.user.email || '');
    } else {
      setEmailVerified(false);
      setEmail('');
    }
  }, [open, session]);

  const handleThemeChange = (checked: boolean) => {
    const nextTheme = checked ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    document.body.classList.toggle('dark', nextTheme === 'dark');
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    localStorage.setItem('language', value);
    window.location.reload();
  };

  const handleSendVerify = async () => {
    const res = await fetch('/api/user/send-verify-email', { method: 'POST' });
    if (res.ok) {
      message.success('验证邮件已发送，请查收邮箱');
    } else {
      message.error('发送失败，请稍后重试');
    }
  };

  const handleChangePassword = async (values: any) => {
    setPwdLoading(true);
    const res = await fetch('/api/user/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    setPwdLoading(false);
    if (res.ok) {
      message.success('密码修改成功');
      setChangePwdOpen(false);
    } else {
      const data = await res.json();
      message.error(data.detail || '密码修改失败');
    }
  };

  return (
    <>
      <Modal
        title="设置"
        open={open}
        onCancel={onClose}
        onOk={onClose}
        okText="关闭"
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <span style={{ marginRight: 16 }}>深色模式</span>
            <Switch
              checked={theme === 'dark'}
              onChange={handleThemeChange}
              checkedChildren="深色"
              unCheckedChildren="浅色"
            />
          </div>
          <div>
            <span style={{ marginRight: 16 }}>语言</span>
            <Select
              value={language}
              onChange={handleLanguageChange}
              options={LANG_OPTIONS}
              style={{ width: 120 }}
            />
          </div>
          <Divider>账号安全</Divider>
          <div>
            <span style={{ marginRight: 8 }}>邮箱：</span>
            <Tag color={emailVerified ? 'green' : 'red'}>
              {emailVerified ? '已验证' : '未验证'}
            </Tag>
            <span style={{ marginLeft: 8 }}>{email}</span>
            {!emailVerified && (
              <Button size="small" type="link" onClick={handleSendVerify} style={{ marginLeft: 8 }}>
                发送验证邮件
              </Button>
            )}
          </div>
          <div>
            <Button type="primary" onClick={() => setChangePwdOpen(true)}>
              修改密码
            </Button>
          </div>
        </Space>
      </Modal>
      <Modal
        title="修改密码"
        open={changePwdOpen}
        onCancel={() => setChangePwdOpen(false)}
        onOk={() => {}}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleChangePassword}>
          <Form.Item name="oldPassword" label="当前密码" rules={[{ required: true, message: '请输入当前密码' }]}> 
            <Input.Password autoComplete="current-password" />
          </Form.Item>
          <Form.Item name="newPassword" label="新密码" rules={[{ required: true, message: '请输入新密码' }]}> 
            <Input.Password autoComplete="new-password" />
          </Form.Item>
          <Form.Item name="confirmPassword" label="确认新密码" dependencies={["newPassword"]} rules={[
            { required: true, message: '请再次输入新密码' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次输入的新密码不一致'));
              },
            }),
          ]}>
            <Input.Password autoComplete="new-password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={pwdLoading} block>
              修改密码
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
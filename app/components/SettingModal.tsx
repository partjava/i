import React, { useState, useEffect } from 'react';
import { Modal, Switch, Select, Space, Divider, Tag, Button, Alert, Form, Input, message, Tabs, Slider, Radio } from 'antd';
import { useSession } from 'next-auth/react';
import { 
  BellOutlined, 
  LockOutlined, 
  DatabaseOutlined, 
  SettingOutlined,
  ExportOutlined,
  DeleteOutlined,
  FontSizeOutlined,
  CodeOutlined
} from '@ant-design/icons';

const LANG_OPTIONS = [
  { label: '中文', value: 'zh' },
  { label: 'English', value: 'en' },
];

const FONT_SIZE_OPTIONS = [
  { label: '小', value: 'small' },
  { label: '中', value: 'medium' },
  { label: '大', value: 'large' },
];

const CODE_THEME_OPTIONS = [
  { label: 'VS Code Dark', value: 'vs-dark' },
  { label: 'VS Code Light', value: 'vs-light' },
  { label: 'Monokai', value: 'monokai' },
  { label: 'GitHub', value: 'github' },
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
  
  // 新增设置状态
  const [studyReminder, setStudyReminder] = useState(true);
  const [emailNotification, setEmailNotification] = useState(true);
  const [publicProfile, setPublicProfile] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [fontSize, setFontSize] = useState('medium');
  const [codeTheme, setCodeTheme] = useState('vs-dark');

  useEffect(() => {
    setTheme(localStorage.getItem('theme') || 'light');
    setLanguage(localStorage.getItem('language') || 'zh');
    setStudyReminder(localStorage.getItem('studyReminder') !== 'false');
    setEmailNotification(localStorage.getItem('emailNotification') !== 'false');
    setPublicProfile(localStorage.getItem('publicProfile') !== 'false');
    setAutoSave(localStorage.getItem('autoSave') !== 'false');
    setFontSize(localStorage.getItem('fontSize') || 'medium');
    setCodeTheme(localStorage.getItem('codeTheme') || 'vs-dark');
    
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
    
    // 立即应用主题
    if (nextTheme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    
    // 给用户反馈
    message.success(`已切换到${nextTheme === 'dark' ? '深色' : '浅色'}模式`);
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

  const handleExportData = async () => {
    try {
      message.loading('正在导出数据...', 0);
      const response = await fetch('/api/user/export-data');
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `partjava-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        message.destroy();
        message.success('数据导出成功');
      } else {
        message.destroy();
        message.error('数据导出失败');
      }
    } catch (error) {
      message.destroy();
      message.error('数据导出失败');
    }
  };

  const handleClearCache = () => {
    Modal.confirm({
      title: '确认清除缓存？',
      content: '这将清除所有本地缓存数据，但不会删除您的笔记和学习记录。',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        localStorage.clear();
        sessionStorage.clear();
        message.success('缓存已清除，页面将刷新');
        setTimeout(() => window.location.reload(), 1000);
      },
    });
  };

  const handleStudyReminderChange = (checked: boolean) => {
    setStudyReminder(checked);
    localStorage.setItem('studyReminder', String(checked));
    message.success(checked ? '已开启学习提醒' : '已关闭学习提醒');
  };

  const handleEmailNotificationChange = (checked: boolean) => {
    setEmailNotification(checked);
    localStorage.setItem('emailNotification', String(checked));
    message.success(checked ? '已开启邮件通知' : '已关闭邮件通知');
  };

  const handlePublicProfileChange = (checked: boolean) => {
    setPublicProfile(checked);
    localStorage.setItem('publicProfile', String(checked));
    message.success(checked ? '个人资料已设为公开' : '个人资料已设为私密');
  };

  const handleAutoSaveChange = (checked: boolean) => {
    setAutoSave(checked);
    localStorage.setItem('autoSave', String(checked));
    message.success(checked ? '已开启自动保存' : '已关闭自动保存');
  };

  const handleFontSizeChange = (value: string) => {
    setFontSize(value);
    localStorage.setItem('fontSize', value);
    
    // 应用字体大小
    const root = document.documentElement;
    if (value === 'small') {
      root.style.fontSize = '14px';
    } else if (value === 'large') {
      root.style.fontSize = '18px';
    } else {
      root.style.fontSize = '16px';
    }
    
    message.success('字体大小已更新');
  };

  const handleCodeThemeChange = (value: string) => {
    setCodeTheme(value);
    localStorage.setItem('codeTheme', value);
    message.success('代码编辑器主题已更新');
  };

  return (
    <>
      <Modal
        title="设置"
        open={open}
        onCancel={onClose}
        footer={null}
        width={700}
        className="setting-modal"
      >
        <Tabs
          defaultActiveKey="general"
          items={[
            {
              key: 'general',
              label: (
                <span>
                  <SettingOutlined />
                  <span className="ml-2">通用</span>
                </span>
              ),
              children: (
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">深色模式</div>
                      <div className="text-sm text-gray-500">切换界面主题颜色</div>
                    </div>
                    <Switch
                      checked={theme === 'dark'}
                      onChange={handleThemeChange}
                      checkedChildren="深色"
                      unCheckedChildren="浅色"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">语言</div>
                      <div className="text-sm text-gray-500">选择界面显示语言</div>
                    </div>
                    <Select
                      value={language}
                      onChange={handleLanguageChange}
                      options={LANG_OPTIONS}
                      style={{ width: 120 }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">字体大小</div>
                      <div className="text-sm text-gray-500">调整界面文字大小</div>
                    </div>
                    <Radio.Group
                      value={fontSize}
                      onChange={(e) => handleFontSizeChange(e.target.value)}
                      buttonStyle="solid"
                    >
                      <Radio.Button value="small">小</Radio.Button>
                      <Radio.Button value="medium">中</Radio.Button>
                      <Radio.Button value="large">大</Radio.Button>
                    </Radio.Group>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">自动保存</div>
                      <div className="text-sm text-gray-500">编辑笔记时自动保存草稿</div>
                    </div>
                    <Switch
                      checked={autoSave}
                      onChange={handleAutoSaveChange}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">代码编辑器主题</div>
                      <div className="text-sm text-gray-500">选择代码编辑器配色方案</div>
                    </div>
                    <Select
                      value={codeTheme}
                      onChange={handleCodeThemeChange}
                      options={CODE_THEME_OPTIONS}
                      style={{ width: 160 }}
                    />
                  </div>
                </Space>
              ),
            },
            {
              key: 'notification',
              label: (
                <span>
                  <BellOutlined />
                  <span className="ml-2">通知</span>
                </span>
              ),
              children: (
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">学习提醒</div>
                      <div className="text-sm text-gray-500">每日学习打卡提醒</div>
                    </div>
                    <Switch
                      checked={studyReminder}
                      onChange={handleStudyReminderChange}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">邮件通知</div>
                      <div className="text-sm text-gray-500">接收重要更新和活动通知</div>
                    </div>
                    <Switch
                      checked={emailNotification}
                      onChange={handleEmailNotificationChange}
                    />
                  </div>

                  <Alert
                    message="提示"
                    description="开启学习提醒后，系统会在每天固定时间提醒您进行学习打卡。"
                    type="info"
                    showIcon
                  />
                </Space>
              ),
            },
            {
              key: 'privacy',
              label: (
                <span>
                  <LockOutlined />
                  <span className="ml-2">隐私</span>
                </span>
              ),
              children: (
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">公开个人资料</div>
                      <div className="text-sm text-gray-500">允许其他用户查看您的个人资料</div>
                    </div>
                    <Switch
                      checked={publicProfile}
                      onChange={handlePublicProfileChange}
                    />
                  </div>

                  <Divider>账号安全</Divider>
                  
                  <div>
                    <div className="mb-2">
                      <span className="font-semibold">邮箱：</span>
                      <Tag color={emailVerified ? 'green' : 'orange'} className="ml-2">
                        {emailVerified ? '已验证' : '未验证'}
                      </Tag>
                      <span className="ml-2 text-gray-600">{email}</span>
                    </div>
                    {!emailVerified && (
                      <Button size="small" type="link" onClick={handleSendVerify}>
                        发送验证邮件
                      </Button>
                    )}
                  </div>

                  <div>
                    <Button type="primary" onClick={() => setChangePwdOpen(true)} block>
                      修改密码
                    </Button>
                  </div>

                  <Alert
                    message="隐私保护"
                    description="我们重视您的隐私安全，所有数据都经过加密存储。您可以随时导出或删除您的数据。"
                    type="success"
                    showIcon
                  />
                </Space>
              ),
            },
            {
              key: 'data',
              label: (
                <span>
                  <DatabaseOutlined />
                  <span className="ml-2">数据</span>
                </span>
              ),
              children: (
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  <div>
                    <div className="font-semibold mb-2">导出数据</div>
                    <div className="text-sm text-gray-500 mb-3">
                      导出您的所有笔记和学习数据为 JSON 格式
                    </div>
                    <Button 
                      icon={<ExportOutlined />} 
                      onClick={handleExportData}
                      block
                    >
                      导出我的数据
                    </Button>
                  </div>

                  <Divider />

                  <div>
                    <div className="font-semibold mb-2">清除缓存</div>
                    <div className="text-sm text-gray-500 mb-3">
                      清除本地缓存数据，不会删除您的笔记和学习记录
                    </div>
                    <Button 
                      icon={<DeleteOutlined />} 
                      onClick={handleClearCache}
                      block
                    >
                      清除缓存
                    </Button>
                  </div>

                  <Alert
                    message="数据安全"
                    description="导出的数据包含您的所有笔记、学习记录和个人设置。请妥善保管导出的文件。"
                    type="warning"
                    showIcon
                  />
                </Space>
              ),
            },
          ]}
        />
      </Modal>

      <Modal
        title="修改密码"
        open={changePwdOpen}
        onCancel={() => setChangePwdOpen(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleChangePassword}>
          <Form.Item 
            name="oldPassword" 
            label="当前密码" 
            rules={[{ required: true, message: '请输入当前密码' }]}
          > 
            <Input.Password autoComplete="current-password" size="large" />
          </Form.Item>
          <Form.Item 
            name="newPassword" 
            label="新密码" 
            rules={[
              { required: true, message: '请输入新密码' },
              { min: 6, message: '密码至少6个字符' }
            ]}
          > 
            <Input.Password autoComplete="new-password" size="large" />
          </Form.Item>
          <Form.Item 
            name="confirmPassword" 
            label="确认新密码" 
            dependencies={["newPassword"]} 
            rules={[
              { required: true, message: '请再次输入新密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的新密码不一致'));
                },
              }),
            ]}
          >
            <Input.Password autoComplete="new-password" size="large" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={pwdLoading} size="large" block>
              修改密码
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
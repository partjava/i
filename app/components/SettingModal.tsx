import React, { useState, useEffect } from 'react';
import { Modal, Switch, Select, Space, Divider, Tag, Button, Alert, Form, Input, message, Tabs, Slider, Radio } from 'antd';
import { useAuth } from '@/app/hooks/useAuth';
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
  const { data: session } = useAuth();
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
    // 学习提醒：同时检查浏览器通知权限
    const savedReminder = localStorage.getItem('studyReminder') !== 'false';
    const notifPermission = 'Notification' in window ? Notification.permission : 'denied';
    setStudyReminder(savedReminder && notifPermission === 'granted');
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

  const handleInstallPWA = () => {
    // 触发 PWA 安装
    window.dispatchEvent(new CustomEvent('pwa-install-request'));
    message.info('正在尝试安装...');
    // 如果是 iOS，会显示引导提示
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS) {
      Modal.info({
        title: 'iOS 安装指引',
        content: (
          <div>
            <p>请按以下步骤将 PartJava 添加到主屏幕：</p>
            <ol className="list-decimal pl-5 space-y-2 mt-2">
              <li>点击浏览器底部的 <strong>分享</strong> 按钮（<span className="text-lg">⎋</span>）</li>
              <li>向下滑动找到 <strong>添加到主屏幕</strong></li>
              <li>点击右上角 <strong>添加</strong></li>
            </ol>
          </div>
        ),
        okText: '知道了',
      });
    }
  };

  const handleStudyReminderChange = async (checked: boolean) => {
    if (checked) {
      // 请求浏览器通知权限
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          setStudyReminder(true);
          localStorage.setItem('studyReminder', 'true');
          message.success('已开启学习提醒，每天会提醒您打卡学习');
          // 立即发一条测试通知
          new Notification('学习提醒已开启 🎉', {
            body: '每天坚持学习，进步看得见！',
            icon: '/favicon.ico',
          });
        } else if (permission === 'denied') {
          message.warning('浏览器通知权限被拒绝，请在浏览器设置中手动开启');
          setStudyReminder(false);
        } else {
          // dismissed
          setStudyReminder(false);
        }
      } else {
        message.warning('您的浏览器不支持通知功能');
        setStudyReminder(false);
      }
    } else {
      setStudyReminder(false);
      localStorage.setItem('studyReminder', 'false');
      message.success('已关闭学习提醒');
    }
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
        title={<span className="text-white font-bold text-lg font-serif">系统设置 Spec Settings</span>}
        open={open}
        onCancel={onClose}
        footer={null}
        width={700}
        styles={{
          content: {
            backgroundColor: '#0C1F3D',
            border: '1px solid #234272',
            borderRadius: '24px',
            color: '#EDF0F5',
            boxShadow: '0 8px 32px 0 rgba(12, 31, 61, 0.4)',
          },
          header: {
            backgroundColor: '#0C1F3D',
            color: '#EDF0F5',
            borderBottom: '1px solid #1E3E6E',
            paddingBottom: '16px',
            marginBottom: '16px',
          },
          body: {
            backgroundColor: '#0C1F3D',
            color: '#EDF0F5',
          }
        }}
        closeIcon={<span className="text-[#b8bfcc] hover:text-white transition-colors text-base">✕</span>}
      >
        <Tabs
          defaultActiveKey="general"
          tabBarStyle={{ color: '#b8bfcc', borderBottom: '1px solid #1E3E6E' }}
          items={[
            {
              key: 'general',
              label: (
                <span className="flex items-center gap-1.5 text-[#EDF0F5] font-semibold">
                  <SettingOutlined />
                  <span>通用</span>
                </span>
              ),
              children: (
                <Space direction="vertical" size="large" style={{ width: '100%', paddingTop: '12px' }}>
                  <div className="flex items-center justify-between border-b border-[#1E3E6E]/30 pb-4">
                    <div>
                      <div className="font-semibold text-white">深色模式 Theme</div>
                      <div className="text-xs text-[#b8bfcc] mt-0.5">切换界面高对比度纸墨主题</div>
                    </div>
                    <Switch
                      checked={theme === 'dark'}
                      onChange={handleThemeChange}
                      checkedChildren="深色"
                      unCheckedChildren="浅色"
                      style={{ backgroundColor: theme === 'dark' ? '#6366f1' : '#b8bfcc' }}
                    />
                  </div>

                  <div className="flex items-center justify-between border-b border-[#1E3E6E]/30 pb-4">
                    <div>
                      <div className="font-semibold text-white">语言 Language</div>
                      <div className="text-xs text-[#b8bfcc] mt-0.5">选择平台展示语系</div>
                    </div>
                    <Select
                      value={language}
                      onChange={handleLanguageChange}
                      options={LANG_OPTIONS}
                      style={{ width: 120 }}
                      dropdownStyle={{ backgroundColor: '#0C1F3D', border: '1px solid #234272' }}
                    />
                  </div>

                  <div className="flex items-center justify-between border-b border-[#1E3E6E]/30 pb-4">
                    <div>
                      <div className="font-semibold text-white">字号大小 Text Size</div>
                      <div className="text-xs text-[#b8bfcc] mt-0.5">调整全站文字比例</div>
                    </div>
                    <Radio.Group
                      value={fontSize}
                      onChange={(e) => handleFontSizeChange(e.target.value)}
                      buttonStyle="solid"
                    >
                      <Radio.Button value="small" style={{ backgroundColor: fontSize === 'small' ? '#6366f1' : 'transparent', color: '#fff', borderColor: '#234272' }}>小</Radio.Button>
                      <Radio.Button value="medium" style={{ backgroundColor: fontSize === 'medium' ? '#6366f1' : 'transparent', color: '#fff', borderColor: '#234272' }}>中</Radio.Button>
                      <Radio.Button value="large" style={{ backgroundColor: fontSize === 'large' ? '#6366f1' : 'transparent', color: '#fff', borderColor: '#234272' }}>大</Radio.Button>
                    </Radio.Group>
                  </div>

                  <div className="flex items-center justify-between border-b border-[#1E3E6E]/30 pb-4">
                    <div>
                      <div className="font-semibold text-white">自动保存 Auto Save</div>
                      <div className="text-xs text-[#b8bfcc] mt-0.5">随堂笔记编辑时自动持久化草稿</div>
                    </div>
                    <Switch
                      checked={autoSave}
                      onChange={handleAutoSaveChange}
                      style={{ backgroundColor: autoSave ? '#6366f1' : '#b8bfcc' }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">代码编辑器主题 IDE Theme</div>
                      <div className="text-xs text-[#b8bfcc] mt-0.5">设定在线沙箱终端的配色方案</div>
                    </div>
                    <Select
                      value={codeTheme}
                      onChange={handleCodeThemeChange}
                      options={CODE_THEME_OPTIONS}
                      style={{ width: 160 }}
                      dropdownStyle={{ backgroundColor: '#0C1F3D', border: '1px solid #234272' }}
                    />
                  </div>
                </Space>
              ),
            },
            {
              key: 'notification',
              label: (
                <span className="flex items-center gap-1.5 text-[#EDF0F5] font-semibold">
                  <BellOutlined />
                  <span>通知</span>
                </span>
              ),
              children: (
                <Space direction="vertical" size="large" style={{ width: '100%', paddingTop: '12px' }}>
                  <div className="flex items-center justify-between border-b border-[#1E3E6E]/30 pb-4">
                    <div>
                      <div className="font-semibold text-white">每日提醒 Daily Reminder</div>
                      <div className="text-xs text-[#b8bfcc] mt-0.5">每日学习与行星闯关打卡提醒</div>
                    </div>
                    <Switch
                      checked={studyReminder}
                      onChange={handleStudyReminderChange}
                      style={{ backgroundColor: studyReminder ? '#6366f1' : '#b8bfcc' }}
                    />
                  </div>

                  <div className="flex items-center justify-between border-b border-[#1E3E6E]/30 pb-4">
                    <div>
                      <div className="font-semibold text-white">邮件通知 Email Alert</div>
                      <div className="text-xs text-[#b8bfcc] mt-0.5">接收关卡开放与重要系统通知</div>
                    </div>
                    <Switch
                      checked={emailNotification}
                      onChange={handleEmailNotificationChange}
                      style={{ backgroundColor: emailNotification ? '#6366f1' : '#b8bfcc' }}
                    />
                  </div>

                  <Alert
                    message={<span className="text-white font-semibold">学习打卡规则</span>}
                    description={<span className="text-[#b8bfcc] text-xs">开启学习提醒后，系统将在检测到浏览器上线时推送消息，帮助您每天维持热力打卡。</span>}
                    type="info"
                    showIcon
                    style={{ backgroundColor: '#132A4F', border: '1px solid #1E3E6E' }}
                  />
                </Space>
              ),
            },
            {
              key: 'privacy',
              label: (
                <span className="flex items-center gap-1.5 text-[#EDF0F5] font-semibold">
                  <LockOutlined />
                  <span>隐私</span>
                </span>
              ),
              children: (
                <Space direction="vertical" size="large" style={{ width: '100%', paddingTop: '12px' }}>
                  <div className="flex items-center justify-between border-b border-[#1E3E6E]/30 pb-4">
                    <div>
                      <div className="font-semibold text-white">公开个人资料 Public Profile</div>
                      <div className="text-xs text-[#b8bfcc] mt-0.5">允许外部同伴浏览您的成就与笔记</div>
                    </div>
                    <Switch
                      checked={publicProfile}
                      onChange={handlePublicProfileChange}
                      style={{ backgroundColor: publicProfile ? '#6366f1' : '#b8bfcc' }}
                    />
                  </div>

                  <Divider style={{ borderColor: '#1E3E6E', color: '#fff' }}><span className="text-[#b8bfcc] text-xs font-semibold">账号安全</span></Divider>
                  
                  <div className="bg-[#08172F]/50 p-4 rounded-xl border border-[#234272] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="font-semibold text-[#b8bfcc]">认证邮箱：</span>
                      <span className="text-white font-mono">{email}</span>
                      <Tag color={emailVerified ? 'green' : 'orange'} className="ml-2 border-0">
                        {emailVerified ? '已验证' : '未验证'}
                      </Tag>
                    </div>
                    {!emailVerified && (
                      <Button size="small" type="link" onClick={handleSendVerify} style={{ color: '#BBFF5C' }} className="hover:text-[#ccff7a] p-0">
                        发送验证邮件
                      </Button>
                    )}
                  </div>

                  <div>
                    <Button 
                      type="primary" 
                      onClick={() => setChangePwdOpen(true)} 
                      style={{ backgroundColor: '#6366f1', borderColor: '#6366f1' }}
                      className="hover:bg-[#818cf8] font-bold"
                      block
                    >
                      修改账户登录密码
                    </Button>
                  </div>

                  <Alert
                    message={<span className="text-emerald-400 font-semibold">隐私合规保护</span>}
                    description={<span className="text-[#b8bfcc] text-xs">我们采用加盐散列对您的账户密码进行非对称防护，所有数据只在数据库内加密存放。</span>}
                    type="success"
                    showIcon
                    style={{ backgroundColor: '#0f272c', border: '1px solid #143e2b' }}
                  />
                </Space>
              ),
            },
            {
              key: 'data',
              label: (
                <span className="flex items-center gap-1.5 text-[#EDF0F5] font-semibold">
                  <DatabaseOutlined />
                  <span>数据</span>
                </span>
              ),
              children: (
                <Space direction="vertical" size="large" style={{ width: '100%', paddingTop: '12px' }}>
                  <div className="border-b border-[#1E3E6E]/30 pb-4">
                    <div className="font-semibold text-white mb-1">安装渐进式应用 PWA</div>
                    <div className="text-xs text-[#b8bfcc] mb-3">
                      将 PartJava 水墨终端添加到主屏幕，获取与原生 APP 一致的离线沙箱探索体验。
                    </div>
                    <Button 
                      icon={<SettingOutlined />}
                      onClick={handleInstallPWA}
                      style={{ backgroundColor: '#6366f1', borderColor: '#6366f1', color: '#fff' }}
                      className="hover:bg-[#818cf8] font-bold"
                      block
                    >
                      安装到主屏幕 / 桌面
                    </Button>
                  </div>

                  <div className="border-b border-[#1E3E6E]/30 pb-4">
                    <div className="font-semibold text-white mb-1">一键导出数据 Export JSON</div>
                    <div className="text-xs text-[#b8bfcc] mb-3">
                      将您的所有笔记文档、打卡习惯记录、通关成果打包为规范的可携带 JSON 文件。
                    </div>
                    <Button 
                      icon={<ExportOutlined />} 
                      onClick={handleExportData}
                      style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}
                      className="hover:bg-white/20 font-semibold"
                      block
                    >
                      立即导出我的数据
                    </Button>
                  </div>

                  <div>
                    <div className="font-semibold text-white mb-1">清除本地缓存 Reset Cache</div>
                    <div className="text-xs text-[#b8bfcc] mb-3">
                      清空浏览器 localStorage 等缓存介质，数据本身将不会受损。
                    </div>
                    <Button 
                      icon={<DeleteOutlined />} 
                      onClick={handleClearCache}
                      danger
                      style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.25)' }}
                      className="hover:bg-red-600/20 font-semibold"
                      block
                    >
                      清除浏览器缓存数据
                    </Button>
                  </div>

                  <Alert
                    message={<span className="text-amber-400 font-semibold">数据备份建议</span>}
                    description={<span className="text-[#b8bfcc] text-xs">导出的 JSON 记录为标准加密传输包，建议您妥善保管该文件，切勿泄露给第三方。</span>}
                    type="warning"
                    showIcon
                    style={{ backgroundColor: '#2b2316', border: '1px solid #4a3e21' }}
                  />
                </Space>
              ),
            },
          ]}
        />
      </Modal>

      <Modal
        title={<span className="text-white font-bold text-lg font-serif">修改账户密码</span>}
        open={changePwdOpen}
        onCancel={() => setChangePwdOpen(false)}
        footer={null}
        styles={{
          content: {
            backgroundColor: '#0C1F3D',
            border: '1px solid #234272',
            borderRadius: '24px',
            color: '#EDF0F5',
            boxShadow: '0 8px 32px 0 rgba(12, 31, 61, 0.4)',
          },
          header: {
            backgroundColor: '#0C1F3D',
            color: '#EDF0F5',
            borderBottom: '1px solid #1E3E6E',
            paddingBottom: '16px',
          }
        }}
        closeIcon={<span className="text-[#b8bfcc] hover:text-white transition-colors text-base">✕</span>}
      >
        <Form layout="vertical" onFinish={handleChangePassword} style={{ paddingTop: '16px' }}>
          <Form.Item 
            name="oldPassword" 
            label={<span className="text-[#b8bfcc] font-semibold text-xs uppercase tracking-wider">当前密码</span>} 
            rules={[{ required: true, message: '请输入当前密码' }]}
          > 
            <Input.Password 
              autoComplete="current-password" 
              size="large" 
              style={{ backgroundColor: '#08172F/50', color: '#fff', borderColor: '#234272' }}
              className="bg-[#08172F]/50 hover:border-[#6366f1] focus:border-[#6366f1] text-white"
            />
          </Form.Item>
          <Form.Item 
            name="newPassword" 
            label={<span className="text-[#b8bfcc] font-semibold text-xs uppercase tracking-wider">新密码</span>} 
            rules={[
              { required: true, message: '请输入新密码' },
              { min: 6, message: '密码至少6个字符' }
            ]}
          > 
            <Input.Password 
              autoComplete="new-password" 
              size="large" 
              style={{ backgroundColor: '#08172F/50', color: '#fff', borderColor: '#234272' }}
              className="bg-[#08172F]/50 hover:border-[#6366f1] focus:border-[#6366f1] text-white"
            />
          </Form.Item>
          <Form.Item 
            name="confirmPassword" 
            label={<span className="text-[#b8bfcc] font-semibold text-xs uppercase tracking-wider">确认新密码</span>} 
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
            <Input.Password 
              autoComplete="new-password" 
              size="large" 
              style={{ backgroundColor: '#08172F/50', color: '#fff', borderColor: '#234272' }}
              className="bg-[#08172F]/50 hover:border-[#6366f1] focus:border-[#6366f1] text-white"
            />
          </Form.Item>
          <Form.Item style={{ marginTop: '24px', marginBottom: 0 }}>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={pwdLoading} 
              size="large" 
              style={{ backgroundColor: '#6366f1', borderColor: '#6366f1' }}
              className="hover:bg-[#818cf8] font-bold"
              block
            >
              确认提交并更新密码
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
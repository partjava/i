import React, { useState, useEffect } from 'react';
import { Modal, Switch, Select, Space, Divider, Tag, Button, Alert, Form, Input, message, Tabs, Radio, ConfigProvider, theme as antdTheme } from 'antd';
import styles from './SettingModal.module.css';
import { useAuth } from '@shared/hooks/useAuth';
import { 
  BellOutlined, 
  LockOutlined, 
  DatabaseOutlined, 
  SettingOutlined,
  ExportOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

const LANG_OPTIONS = [
  { label: '中文', value: 'zh' },
  { label: 'English', value: 'en' },
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
  const [modal, contextHolder] = Modal.useModal();
  const [pwdForm] = Form.useForm();
  const isDark = theme === 'dark';
  const dialogClassName = `${styles.dialog} ${isDark ? styles.dark : ''}`;
  const popupClassName = `${styles.popup} ${isDark ? styles.dark : ''}`;
  const modalRootClassName = `${styles.root} ${isDark ? styles.dark : ''}`;
  const [language, setLanguage] = useState('zh');
  const [emailVerified, setEmailVerified] = useState<boolean | null>(null);
  const [email, setEmail] = useState('');
  const [changePwdOpen, setChangePwdOpen] = useState(false);
  const [pwdLoading, setPwdLoading] = useState(false);

  const emitSettingsChange = (detail: Record<string, any>) => {
    window.dispatchEvent(new CustomEvent('partjava-settings-change', { detail }));
  };
  
  // 新增设置状态
  const [studyReminder, setStudyReminder] = useState(true);
  const [emailNotification, setEmailNotification] = useState(true);
  const [publicProfile, setPublicProfile] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [fontSize, setFontSize] = useState('medium');
  const [codeTheme, setCodeTheme] = useState('vs-dark');

  useEffect(() => {
    if (!open) return;
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
    
    // 暂时禁用邮箱验证状态检查；同步后端公开资料开关
    if (session?.user) {
      setEmailVerified(false);
      setEmail(session.user.email || '');
      fetch('/api/user/settings')
        .then((res) => (res.ok ? res.json() : null))
        .then((res) => {
          const settings = res?.data;
          if (settings && typeof settings.publicProfile === 'boolean') {
            setPublicProfile(settings.publicProfile);
            localStorage.setItem('publicProfile', String(settings.publicProfile));
          }
          if (settings?.email) {
            setEmail(settings.email);
          }
        })
        .catch(() => {});
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

    emitSettingsChange({ theme: nextTheme });
    
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

  const handleChangePassword = async (values: { oldPassword: string; newPassword: string; confirmPassword: string }) => {
    setPwdLoading(true);
    try {
      const res = await fetch('/api/user/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));
      const isOk = res.ok && data?.success !== false && (data?.code === undefined || data.code === 200);
      if (isOk) {
        message.success(data?.message || data?.data?.message || '密码修改成功');
        pwdForm.resetFields();
        setChangePwdOpen(false);
      } else {
        message.error(data?.message || data?.detail || '密码修改失败');
      }
    } catch {
      message.error('网络异常，密码修改失败');
    } finally {
      setPwdLoading(false);
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
    } catch {
      message.destroy();
      message.error('数据导出失败');
    }
  };

  const handleClearCache = () => {
    modal.confirm({
      rootClassName: modalRootClassName,
      className: dialogClassName,
      centered: true,
      title: '确认清除缓存？',
      content: '这将清除所有本地草稿与缓存数据，但不会退出当前登录状态，也不会删除云端笔记和学习记录。',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        // 保留登录凭据与核心外观偏好，避免误登出
        const preserveKeys = [
          'jwt_token',
          'jwt_user',
          'theme',
          'fontSize',
          'codeTheme',
          'language',
        ];
        const preserved: Record<string, string> = {};
        for (const key of preserveKeys) {
          const val = localStorage.getItem(key);
          if (val !== null) preserved[key] = val;
        }

        localStorage.clear();
        sessionStorage.clear();

        for (const [key, val] of Object.entries(preserved)) {
          localStorage.setItem(key, val);
        }

        message.success('缓存已清除，页面将刷新');
        setTimeout(() => window.location.reload(), 800);
      },
    });
  };

  const handleInstallPWA = () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS) {
      modal.info({
        rootClassName: modalRootClassName,
        className: dialogClassName,
        centered: true,
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
      return;
    }

    if (window.matchMedia('(display-mode: standalone)').matches) {
      message.success('应用已安装，可以直接从桌面打开');
      return;
    }

    // 触发 PWAProvider 中的安装提示处理
    window.dispatchEvent(new CustomEvent('pwa-install-request'));
  };

  const handleStudyReminderChange = async (checked: boolean) => {
    if (checked) {
      // 请求浏览器通知权限
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          setStudyReminder(true);
          localStorage.setItem('studyReminder', 'true');
          emitSettingsChange({ studyReminder: true });
          message.success('已开启学习提醒，每天会提醒您打卡学习');
          // 立即发一条测试通知
          new Notification('学习提醒已开启 🎉', {
            body: '每天坚持学习，进步看得见！',
            icon: '/favicon.ico',
          });
        } else if (permission === 'denied') {
          message.warning('浏览器通知权限被拒绝，请在浏览器设置中手动开启');
          setStudyReminder(false);
          emitSettingsChange({ studyReminder: false });
        } else {
          // dismissed
          setStudyReminder(false);
          emitSettingsChange({ studyReminder: false });
        }
      } else {
        message.warning('您的浏览器不支持通知功能');
        setStudyReminder(false);
      }
    } else {
      setStudyReminder(false);
      localStorage.setItem('studyReminder', 'false');
      emitSettingsChange({ studyReminder: false });
      message.success('已关闭学习提醒');
    }
  };

  const handleEmailNotificationChange = (checked: boolean) => {
    setEmailNotification(checked);
    localStorage.setItem('emailNotification', String(checked));
    message.success(checked ? '已开启邮件通知' : '已关闭邮件通知');
  };

  const handlePublicProfileChange = async (checked: boolean) => {
    setPublicProfile(checked);
    localStorage.setItem('publicProfile', String(checked));
    emitSettingsChange({ publicProfile: checked });
    if (session?.user) {
      try {
        const res = await fetch('/api/user/settings', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ publicProfile: checked }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || data?.success === false) {
          message.warning(data?.message || '云端同步公开设置失败，已保存在本地');
          return;
        }
      } catch {
        message.warning('网络异常，云端同步失败');
        return;
      }
    }
    message.success(checked ? '个人资料已设为公开' : '个人资料已设为私密');
  };

  const handleAutoSaveChange = (checked: boolean) => {
    setAutoSave(checked);
    localStorage.setItem('autoSave', String(checked));
    emitSettingsChange({ autoSave: checked });
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

    emitSettingsChange({ fontSize: value });
    
    message.success('字体大小已更新');
  };

  const handleCodeThemeChange = (value: string) => {
    setCodeTheme(value);
    localStorage.setItem('codeTheme', value);
    emitSettingsChange({ codeTheme: value });
    message.success('代码编辑器主题已更新');
  };

  return (
    <ConfigProvider theme={{
      algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      token: {
        colorPrimary: isDark ? '#dedede' : '#404040',
        colorPrimaryHover: isDark ? '#f5f5f5' : '#262626',
        colorPrimaryActive: isDark ? '#bfbfbf' : '#171717',
        colorTextLightSolid: isDark ? '#171717' : '#ffffff',
        colorText: isDark ? '#f2f2f2' : '#242424',
        colorTextSecondary: isDark ? '#b8b8b8' : '#606060',
        colorTextPlaceholder: isDark ? '#a3a3a3' : '#777777',
        colorIcon: isDark ? '#b8b8b8' : '#606060',
        colorIconHover: isDark ? '#f5f5f5' : '#242424',
        colorBgContainer: isDark ? '#282828' : '#ffffff',
        colorBgElevated: isDark ? '#222222' : '#ffffff',
        colorBorder: isDark ? '#484848' : '#d4d4d4',
        colorInfo: isDark ? '#b8b8b8' : '#606060',
        colorError: isDark ? '#f29b9b' : '#b42318',
        borderRadius: 9,
      },
    }}>
      {contextHolder}
      <Modal
        title={<span className={styles.title}>系统设置 Spec Settings</span>}
        open={open}
        onCancel={onClose}
        footer={null}
        width={700}
        className={dialogClassName}
        rootClassName={modalRootClassName}
        centered
        closeIcon={<span className="text-[var(--settings-secondary)] hover:text-[var(--settings-text)] transition-colors text-base">✕</span>}
      >
        <Tabs
          defaultActiveKey="general"
          className={styles.tabs}
          items={[
            {
              key: 'general',
              label: (
                <span className="flex items-center gap-1.5 text-inherit font-semibold">
                  <SettingOutlined />
                  <span>通用</span>
                </span>
              ),
              children: (
                <Space direction="vertical" size="large" style={{ width: '100%', paddingTop: '12px' }}>
                  <div className={`${styles.row} border-b border-[var(--settings-line)] pb-4`}>
                    <div>
                      <div className="font-semibold text-[var(--settings-text)]">深色模式 Theme</div>
                      <div className="text-xs text-[var(--settings-secondary)] mt-0.5">切换界面高对比度纸墨主题</div>
                    </div>
                    <Switch
                      checked={theme === 'dark'}
                      onChange={handleThemeChange}
                      checkedChildren="深色"
                      unCheckedChildren="浅色"
                    />
                  </div>

                  <div className={`${styles.row} border-b border-[var(--settings-line)] pb-4`}>
                    <div>
                      <div className="font-semibold text-[var(--settings-text)]">语言 Language</div>
                      <div className="text-xs text-[var(--settings-secondary)] mt-0.5">选择平台展示语系</div>
                    </div>
                    <Select
                      value={language}
                      onChange={handleLanguageChange}
                      options={LANG_OPTIONS}
                      style={{ width: 120 }}
                      popupClassName={popupClassName}
                    />
                  </div>

                  <div className={`${styles.row} border-b border-[var(--settings-line)] pb-4`}>
                    <div>
                      <div className="font-semibold text-[var(--settings-text)]">字号大小 Text Size</div>
                      <div className="text-xs text-[var(--settings-secondary)] mt-0.5">调整全站文字比例</div>
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

                  <div className={`${styles.row} border-b border-[var(--settings-line)] pb-4`}>
                    <div>
                      <div className="font-semibold text-[var(--settings-text)]">自动保存 Auto Save</div>
                      <div className="text-xs text-[var(--settings-secondary)] mt-0.5">随堂笔记编辑时自动持久化草稿</div>
                    </div>
                    <Switch
                      checked={autoSave}
                      onChange={handleAutoSaveChange}
                    />
                  </div>

                  <div className={styles.row}>
                    <div>
                      <div className="font-semibold text-[var(--settings-text)]">代码编辑器主题 IDE Theme</div>
                      <div className="text-xs text-[var(--settings-secondary)] mt-0.5">设定在线沙箱终端的配色方案</div>
                    </div>
                    <Select
                      value={codeTheme}
                      onChange={handleCodeThemeChange}
                      options={CODE_THEME_OPTIONS}
                      style={{ width: 160 }}
                      popupClassName={popupClassName}
                    />
                  </div>
                </Space>
              ),
            },
            {
              key: 'notification',
              label: (
                <span className="flex items-center gap-1.5 text-inherit font-semibold">
                  <BellOutlined />
                  <span>通知</span>
                </span>
              ),
              children: (
                <Space direction="vertical" size="large" style={{ width: '100%', paddingTop: '12px' }}>
                  <div className={`${styles.row} border-b border-[var(--settings-line)] pb-4`}>
                    <div>
                      <div className="font-semibold text-[var(--settings-text)]">每日提醒 Daily Reminder</div>
                      <div className="text-xs text-[var(--settings-secondary)] mt-0.5">每日学习与行星闯关打卡提醒</div>
                    </div>
                    <Switch
                      checked={studyReminder}
                      onChange={handleStudyReminderChange}
                    />
                  </div>

                  <div className={`${styles.row} border-b border-[var(--settings-line)] pb-4`}>
                    <div>
                      <div className="font-semibold text-[var(--settings-text)]">邮件通知 Email Alert</div>
                      <div className="text-xs text-[var(--settings-secondary)] mt-0.5">接收关卡开放与重要系统通知</div>
                    </div>
                    <Switch
                      checked={emailNotification}
                      onChange={handleEmailNotificationChange}
                    />
                  </div>

                  <Alert
                    message={<span className="text-[var(--settings-text)] font-semibold">学习打卡规则</span>}
                    description={<span className="text-[var(--settings-secondary)] text-xs">开启学习提醒后，系统将在检测到浏览器上线时推送消息，帮助您每天维持热力打卡。</span>}
                    type="info"
                    showIcon
                  />
                </Space>
              ),
            },
            {
              key: 'privacy',
              label: (
                <span className="flex items-center gap-1.5 text-inherit font-semibold">
                  <LockOutlined />
                  <span>隐私</span>
                </span>
              ),
              children: (
                <Space direction="vertical" size="large" style={{ width: '100%', paddingTop: '12px' }}>
                  <div className={`${styles.row} border-b border-[var(--settings-line)] pb-4`}>
                    <div>
                      <div className="font-semibold text-[var(--settings-text)]">公开个人资料 Public Profile</div>
                      <div className="text-xs text-[var(--settings-secondary)] mt-0.5">允许外部同伴浏览您的成就与笔记</div>
                    </div>
                    <Switch
                      checked={publicProfile}
                      onChange={handlePublicProfileChange}
                    />
                  </div>

                  <Divider><span className="text-[var(--settings-secondary)] text-xs font-semibold">账号安全</span></Divider>
                  
                  <div className="bg-[var(--settings-control)] p-4 rounded-xl border border-[var(--settings-line)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="font-semibold text-[var(--settings-secondary)]">认证邮箱：</span>
                      <span className="text-[var(--settings-text)] font-mono">{email}</span>
                      <Tag color={emailVerified ? 'green' : 'orange'} className="ml-2 border-0">
                        {emailVerified ? '已验证' : '未验证'}
                      </Tag>
                    </div>
                    {!emailVerified && (
                      <Button size="small" type="link" onClick={handleSendVerify} className="p-0">
                        发送验证邮件
                      </Button>
                    )}
                  </div>

                  <div>
                    <Button 
                      type="primary" 
                      onClick={() => setChangePwdOpen(true)}
                      className="font-bold"
                      block
                    >
                      修改账户登录密码
                    </Button>
                  </div>

                  <Alert
                    message={<span className="text-[var(--settings-text)] font-semibold">隐私合规保护</span>}
                    description={<span className="text-[var(--settings-secondary)] text-xs">我们采用加盐散列对您的账户密码进行非对称防护，所有数据只在数据库内加密存放。</span>}
                    type="success"
                    showIcon
                  />
                </Space>
              ),
            },
            {
              key: 'data',
              label: (
                <span className="flex items-center gap-1.5 text-inherit font-semibold">
                  <DatabaseOutlined />
                  <span>数据</span>
                </span>
              ),
              children: (
                <Space direction="vertical" size="large" style={{ width: '100%', paddingTop: '12px' }}>
                  <div className="border-b border-[var(--settings-line)] pb-4">
                    <div className="font-semibold text-[var(--settings-text)] mb-1">安装渐进式应用 PWA</div>
                    <div className="text-xs text-[var(--settings-secondary)] mb-3">
                      将 PartJava 水墨终端添加到主屏幕，获取与原生 APP 一致的离线沙箱探索体验。
                    </div>
                    <Button 
                      icon={<SettingOutlined />}
                      type="primary"
                      onClick={handleInstallPWA}
                      className="font-bold"
                      block
                    >
                      安装到主屏幕 / 桌面
                    </Button>
                  </div>

                  <div className="border-b border-[var(--settings-line)] pb-4">
                    <div className="font-semibold text-[var(--settings-text)] mb-1">一键导出数据 Export JSON</div>
                    <div className="text-xs text-[var(--settings-secondary)] mb-3">
                      将您的所有笔记文档、打卡习惯记录、通关成果打包为规范的可携带 JSON 文件。
                    </div>
                    <Button 
                      icon={<ExportOutlined />} 
                      onClick={handleExportData}
                      className="hover:bg-white/20 font-semibold"
                      block
                    >
                      立即导出我的数据
                    </Button>
                  </div>

                  <div>
                    <div className="font-semibold text-[var(--settings-text)] mb-1">清除本地缓存 Reset Cache</div>
                    <div className="text-xs text-[var(--settings-secondary)] mb-3">
                      清空浏览器 localStorage 等缓存介质，数据本身将不会受损。
                    </div>
                    <Button 
                      icon={<DeleteOutlined />} 
                      onClick={handleClearCache}
                      danger
                      className="hover:bg-red-600/20 font-semibold"
                      block
                    >
                      清除浏览器缓存数据
                    </Button>
                  </div>

                  <Alert
                    message={<span className="text-[var(--settings-text)] font-semibold">数据备份建议</span>}
                    description={<span className="text-[var(--settings-secondary)] text-xs">导出的 JSON 记录为标准加密传输包，建议您妥善保管该文件，切勿泄露给第三方。</span>}
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
        title={<span className={styles.title}>修改账户密码</span>}
        open={changePwdOpen}
        onCancel={() => {
          setChangePwdOpen(false);
          pwdForm.resetFields();
        }}
        footer={null}
        className={dialogClassName}
        rootClassName={modalRootClassName}
        centered
        closeIcon={<span className="text-[var(--settings-secondary)] hover:text-[var(--settings-text)] transition-colors text-base">✕</span>}
      >
        <Form form={pwdForm} layout="vertical" onFinish={handleChangePassword} style={{ paddingTop: '16px' }}>
          <Form.Item 
            name="oldPassword" 
            label={<span className="text-[var(--settings-secondary)] font-semibold text-xs uppercase tracking-wider">当前密码</span>}
            rules={[{ required: true, message: '请输入当前密码' }]}
          > 
            <Input.Password 
              autoComplete="current-password" 
              size="large"
              className="bg-[var(--settings-control)] text-[var(--settings-text)]"
            />
          </Form.Item>
          <Form.Item 
            name="newPassword" 
            label={<span className="text-[var(--settings-secondary)] font-semibold text-xs uppercase tracking-wider">新密码</span>}
            rules={[
              { required: true, message: '请输入新密码' },
              { min: 6, message: '密码至少6个字符' }
            ]}
          > 
            <Input.Password 
              autoComplete="new-password" 
              size="large"
              className="bg-[var(--settings-control)] text-[var(--settings-text)]"
            />
          </Form.Item>
          <Form.Item 
            name="confirmPassword" 
            label={<span className="text-[var(--settings-secondary)] font-semibold text-xs uppercase tracking-wider">确认新密码</span>}
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
              className="bg-[var(--settings-control)] text-[var(--settings-text)]"
            />
          </Form.Item>
          <Form.Item style={{ marginTop: '24px', marginBottom: 0 }}>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={pwdLoading} 
              size="large"
              className="font-bold"
              block
            >
              确认提交并更新密码
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </ConfigProvider>
  );
}
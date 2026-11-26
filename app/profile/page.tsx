'use client';

import { useState, useEffect, useRef } from 'react';
import { compressAvatar, readProfileResponse, saveProfileAvatar, getAchievementSummary } from './profile-client';
import styles from './page.module.css';
import { useAuth } from '@shared/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useUser } from '@shared/providers/UserProvider';
import { 
  Card, 
  Input, 
  Button, 
  Form, 
  Avatar, 
  Progress,
  Timeline,
  Tag,
  Row, 
  Col, 
  Space,
  Typography,
  Divider,
  Select,
  message
} from 'antd';
import { 
  UserOutlined, 
  EditOutlined, 
  BookOutlined, 
  TrophyOutlined, 
  CalendarOutlined,
  GithubOutlined,
  GlobalOutlined,
  EnvironmentOutlined,
  HeartOutlined,
  CommentOutlined,
  FireOutlined,
  ClockCircleOutlined,
  BarChartOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined
} from '@ant-design/icons';
import LearningHeatmap from '@shared/components/LearningHeatmap';
import DataVisualization from '@shared/components/DataVisualization';
import SiteFooter from '@shared/components/SiteFooter';
import AchievementCard from '@shared/components/AchievementCard';
import EyePet from '@shared/components/EyePet';
import { ShieldCheck, ArrowUpRight, Layers } from 'lucide-react';
import AchievementsSection from './components/AchievementsSection';
import RecentActivityTimeline from './components/RecentActivityTimeline';
import type { Achievement as AchievementType } from '@shared/types/achievement';

const { Title, Text, Paragraph } = Typography;

// ─── 统一数据结构（原 dataAdapter.ts 内联）──────────────────────────

interface UnifiedUserStats {
  notes: { total: number; public: number; private: number; firstNoteDate: string; lastActivityDate: string };
  engagement: { likesReceived: number; bookmarksReceived: number; commentsReceived: number };
  learning: { categoriesStudied: number; technologiesStudied: number; totalStudyTime: number; studyDays: number; studyDaysTotal: number };
  achievements: { total: number; earned: number };
  recentActivity: Array<{ id: string; type: string; title: string; content: string; date: string }>;
  monthlyStats: Array<{ month: string; notes: number; studyTime: number }>;
}

interface UnifiedHeatmapData {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
  duration?: number;
}

interface ProfileFormData {
  name: string;
  jobTitle: string;
  company: string;
  bio: string;
  location: string;
  github: string;
  website: string;
  image: string;
  skills: string[];
  username?: string;
  vip?: boolean;
  vipLevel?: number;
  vipExpireTime?: string | null;
  socialLinks: {
    wechat?: string;
    weibo?: string;
    linkedin?: string;
    twitter?: string;
  };
}

// 使用从dataAdapter导入的统一接口
type UserStats = UnifiedUserStats;

export default function ProfilePage() {
  const { data: session, status, update, signOut } = useAuth();
  const router = useRouter();
  const { refreshUser, updateUser } = useUser();
  const [form] = Form.useForm();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileForm, setProfileForm] = useState<ProfileFormData>({
    name: '',
    jobTitle: '',
    company: '',
    bio: '',
    location: '',
    github: '',
    website: '',
    image: '',
    skills: [],
    username: '',
    socialLinks: {}
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [heatmapData, setHeatmapData] = useState<UnifiedHeatmapData[]>([]);
  const [heatmapLoading, setHeatmapLoading] = useState(true);
  const [achievements, setAchievements] = useState<AchievementType[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [showAllAch, setShowAllAch] = useState(false);
  const [showTotalMinutes, setShowTotalMinutes] = useState(false);
  const [activeTab, setActiveTab] = useState<'analytics' | 'achievements' | 'activity' | 'all'>('analytics');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const timeToggleTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const onFullscreenChange = () => {
      if (typeof document !== 'undefined') {
        setIsFullscreen(Boolean(document.fullscreenElement));
      }
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {}
  };

  useEffect(() => {
    return () => {
      if (timeToggleTimerRef.current) {
        clearTimeout(timeToggleTimerRef.current);
      }
    };
  }, []);

  const handleToggleStudyTime = () => {
    if (timeToggleTimerRef.current) {
      clearTimeout(timeToggleTimerRef.current);
      timeToggleTimerRef.current = null;
    }
    setShowTotalMinutes((prev) => {
      const next = !prev;
      if (next) {
        timeToggleTimerRef.current = setTimeout(() => {
          setShowTotalMinutes(false);
        }, 4000);
      }
      return next;
    });
  };

  const refreshInFlight = useRef(false);
  const editingRef = useRef(false);
  editingRef.current = editMode || saving || uploading;

  // 添加刷新数据的函数
  const refreshData = async (notify = false) => {
    // 只有已登录用户才刷新数据
    if (status !== 'authenticated' || editingRef.current || refreshInFlight.current) {
      return;
    }
    
    refreshInFlight.current = true;
    setRefreshing(true);
    try {
      // 并行加载所有数据
      const results = await Promise.allSettled([
        loadUserProfile(),
        loadUserStats(),
        loadHeatmapData(),
      ]);
      
      // 检查结果
      const hasErrors = results.some(result => result.status === 'rejected');
      
      if (hasErrors) {
        console.warn('部分数据加载失败:', results);
        message.warning('部分数据加载失败，请稍后再试');
      } else if (notify) {
        message.success('数据已刷新');
      }
    } catch (error) {
      console.error('刷新数据失败:', error);
      message.error('刷新数据失败');
    } finally {
      refreshInFlight.current = false;
      setRefreshing(false);
    }
  };

  // 检查登录状态（基于 JWT token）
  const checkSession = async () => {
    if (status === 'unauthenticated') return true;
    const { getToken } = await import('@shared/lib/auth-client');
    return !!getToken();
  };

  // 加载平台总体统计数据（未登录用户）
  const loadPlatformStats = async () => {
    try {
      
      const response = await fetch('/api/stats/platform', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store'
      });
      
      if (!response.ok) {
        throw new Error(`API错误: ${response.status}`);
      }
      
      const data = await response.json();
      
      // 如果有真实数据，使用真实数据
      if (data && data.totalUsers > 0) {
        const platformStats: UserStats = {
          notes: {
            total: data.totalNotes || 0,
            public: data.publicNotes || 0,
            private: data.privateNotes || 0,
            firstNoteDate: data.firstNoteDate || '',
            lastActivityDate: data.lastActivityDate || new Date().toISOString()
          },
          engagement: {
            likesReceived: data.totalLikes || 0,
            bookmarksReceived: data.totalBookmarks || 0,
            commentsReceived: data.totalComments || 0
          },
          learning: {
            categoriesStudied: data.totalCategories || 0,
            technologiesStudied: data.totalTechnologies || 0,
            totalStudyTime: data.totalStudyTime || 0,
            studyDays: data.totalStudyDays || 0,
            studyDaysTotal: data.totalStudyDays || 0
          },
          achievements: {
            total: 10,
            earned: Math.floor((data.totalUsers || 0) * 0.6) // 平均60%的成就完成率
          },
          recentActivity: data.recentActivity || [],
          monthlyStats: data.monthlyStats || []
        };
        
        setStats(platformStats);
        
        // 设置平台热力图数据
        if (data.heatmapData && Array.isArray(data.heatmapData)) {
          setHeatmapData(data.heatmapData);
        } else {
          setHeatmapData([]);
        }
        
        // 设置平台信息
        const platformProfile = {
          name: '平台总览',
          jobTitle: '',
          company: '',
          bio: `${data.totalUsers || 0} 位学习者正在使用本平台，共创建了 ${data.totalNotes || 0} 篇学习笔记，累计学习 ${Math.floor((data.totalStudyTime || 0) / 3600)} 小时。${data.todayNotes > 0 ? `今日新增 ${data.todayNotes} 篇笔记，` : ''}${data.weeklyActiveUsers > 0 ? `本周 ${data.weeklyActiveUsers} 位用户活跃。` : ''}加入我们，开始你的学习之旅！`,
          location: '全球',
          github: '',
          website: '',
          image: '',
          skills: [],
          socialLinks: {}
        };
        
        setProfileForm(platformProfile);
        form.setFieldsValue(platformProfile);
        
        setHeatmapLoading(false);
        setStatsLoading(false);
        return;
      }
      
      // 如果没有数据，使用示例数据
      throw new Error('暂无平台数据');
      
    } catch (error) {
      console.error('获取平台统计数据失败，使用示例数据:', error);
      generateDemoData();
    }
  };

  // 生成示例数据供未登录用户查看 - 当平台还没有真实数据时使用
  const generateDemoData = () => {
    
    // 生成过去一年的学习热力图数据 - 模拟真实学习模式
    const demoHeatmap: UnifiedHeatmapData[] = [];
    const today = new Date();
    const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
    
    // 模拟学习习惯：工作日学习多，周末少，有学习周期和间断期
    let studyStreak = 0;
    let breakDays = 0;
    
    for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
      const dateStr = new Date(d).toISOString().split('T')[0];
      const dayOfWeek = d.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      
      // 模拟学习周期：连续学习后会有休息期
      if (breakDays > 0) {
        breakDays--;
        if (Math.random() > 0.8) breakDays = 0; // 有20%概率提前结束休息
        continue;
      }
      
      // 工作日学习概率80%，周末40%
      const studyProbability = isWeekend ? 0.4 : 0.8;
      
      if (Math.random() < studyProbability) {
        studyStreak++;
        
        // 工作日学习强度更高
        const maxCount = isWeekend ? 8 : 15;
        
        // 模拟学习强度波动
        const intensity = Math.random();
        let count: number;
        if (intensity < 0.3) {
          count = Math.floor(Math.random() * 3) + 1; // 轻度学习 1-3
        } else if (intensity < 0.7) {
          count = Math.floor(Math.random() * 5) + 4; // 中度学习 4-8
        } else {
          count = Math.floor(Math.random() * 7) + 9; // 高强度学习 9-15
        }
        
        count = Math.min(count, maxCount);
        
        let level: 0 | 1 | 2 | 3 | 4 = 0;
        if (count <= 2) level = 1;
        else if (count <= 5) level = 2;
        else if (count <= 10) level = 3;
        else level = 4;
        
        demoHeatmap.push({ date: dateStr, count, level });
        
        // 连续学习7-14天后，有概率进入休息期
        if (studyStreak >= 7 && Math.random() > 0.7) {
          breakDays = Math.floor(Math.random() * 4) + 2; // 休息2-5天
          studyStreak = 0;
        }
      } else {
        studyStreak = 0;
      }
    }
    
    // 计算真实的学习天数
    const totalStudyDays = demoHeatmap.length;
    const totalStudyCount = demoHeatmap.reduce((sum, day) => sum + day.count, 0);
    
    // 生成示例统计数据 - 基于热力图数据计算
    const demoStats: UserStats = {
      notes: {
        total: 87,
        public: 63,
        private: 24,
        firstNoteDate: new Date(today.getFullYear() - 1, 8, 15).toISOString(), // 去年9月开始
        lastActivityDate: new Date(Date.now() - Math.floor(Math.random() * 3) * 24 * 60 * 60 * 1000).toISOString()
      },
      engagement: {
        likesReceived: 234,
        bookmarksReceived: 156,
        commentsReceived: 67
      },
      learning: {
        categoriesStudied: 6,
        technologiesStudied: 15,
        totalStudyTime: Math.floor(totalStudyCount * 25), // 每次学习约25分钟
        studyDays: totalStudyDays,
        studyDaysTotal: totalStudyDays
      },
      achievements: {
        total: 10,
        earned: 6
      },
      recentActivity: [
        {
          id: '1',
          type: 'note',
          title: 'React性能优化',
          content: '创建了新笔记：React性能优化最佳实践 - useMemo和useCallback的使用场景',
          date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '2',
          type: 'note',
          title: 'Next.js服务端渲染',
          content: '创建了新笔记：Next.js 14 App Router完全指南',
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '3',
          type: 'study',
          title: '算法练习',
          content: '完成了LeetCode动态规划专题 - 背包问题系列',
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '4',
          type: 'note',
          title: 'TypeScript泛型',
          content: '创建了新笔记：TypeScript高级泛型技巧与实战',
          date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '5',
          type: 'study',
          title: '数据库优化',
          content: '学习了MongoDB索引优化和查询性能调优',
          date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '6',
          type: 'note',
          title: 'Tailwind CSS',
          content: '创建了新笔记：Tailwind CSS响应式设计实践',
          date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '7',
          type: 'study',
          title: '系统设计',
          content: '完成了分布式系统设计课程 - CAP理论与一致性',
          date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
        }
      ],
      monthlyStats: [
        { month: '2025-12', notes: 15, studyTime: 1680 },
        { month: '2026-01', notes: 18, studyTime: 2040 },
        { month: '2026-02', notes: 21, studyTime: 2280 },
        { month: '2026-03', notes: 12, studyTime: 1560 }
      ]
    };
    
    setHeatmapData(demoHeatmap);
    setStats(demoStats);
    setHeatmapLoading(false);
    setStatsLoading(false);
    
    // 设置示例用户资料 - 说明这是示例数据
    const demoProfile = {
      name: '功能演示',
      jobTitle: '',
      company: '',
      bio: '这是示例数据，用于展示平台的学习追踪和数据可视化功能。注册登录后，您可以记录自己的学习历程，查看个性化的学习统计和热力图。',
      location: '示例数据',
      github: '',
      website: '',
      image: '',
      skills: [],
      socialLinks: {}
    };
    
    setProfileForm(demoProfile);
    form.setFieldsValue(demoProfile);
  };

  // 初始加载数据
  useEffect(() => {
    
    if (status === 'unauthenticated') {
      // 未登录用户显示平台总体数据
      setIsGuest(true);
      loadPlatformStats();
      return;
    }
    
    if (status === 'authenticated') {
      setIsGuest(false);
      // 先检查会话状态
      checkSession().then(isAuthenticated => {
        if (isAuthenticated) {
          refreshData();
        } else {
          // 会话无效，尝试重新登录
          router.push('/auth/login');
        }
      });
    }
  }, [status, router]);
  
  // 每次页面获得焦点时刷新数据
  useEffect(() => {
    // 只有已登录用户才监听焦点事件
    if (typeof window !== 'undefined' && status === 'authenticated' && !isGuest) {
      const handleFocus = () => {
        refreshData();
      };
      
      window.addEventListener('focus', handleFocus);
      return () => {
        window.removeEventListener('focus', handleFocus);
      };
    }
  }, [status, isGuest]);
  
  // 同步笔记数量


  const loadUserProfile = async () => {
    try {
      const timestamp = new Date().getTime();
      const res = await fetch(`/api/user/profile?t=${timestamp}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        cache: 'no-store',
      });
      const profileData = await readProfileResponse<ProfileFormData & { avatar?: string }>(res);
        
        const formData = {
          name: profileData.name || session?.user?.name || '',
          jobTitle: profileData.jobTitle || '',
          company: profileData.company || '',
          bio: profileData.bio || '',
          location: profileData.location || '',
          github: profileData.github || '',
          website: profileData.website || '',
          image: profileData.image ?? profileData.avatar ?? session?.user?.image ?? '',
          skills: profileData.skills || [],
          username: profileData.username || session?.user?.username || '',
          vip: profileData.vip || false,
          vipLevel: profileData.vipLevel || 0,
          vipExpireTime: profileData.vipExpireTime || null,
          socialLinks: profileData.socialLinks || {}
        };
        
        if (!editingRef.current) {
          setProfileForm(formData);
          form.setFieldsValue(formData);
        }
        return profileData;
      } catch (fetchError) {
        throw fetchError;
      }
    };

    const loadUserStats = async () => {
      try {
        const res = await fetch('/api/user/stats', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          cache: 'no-store',
        });
        const statsData = await readProfileResponse<UserStats & {
          totalStudyTime?: number;
          achievementList?: Array<Omit<AchievementType, 'unlockedAt'> & { unlockedAt?: string }>;
          achievements: UserStats['achievements'] & {
            list?: Array<Omit<AchievementType, 'unlockedAt'> & { unlockedAt?: string }>;
          };
        }>(res);
        // 补充真实学习时间
        try {
          const sr = await fetch('/api/study/stats', { headers: { 'Content-Type': 'application/json' } });
          const sj = await sr.json();
          if (sj.success && sj.data) statsData.totalStudyTime = sj.data.totalStudyTime ?? statsData.learning?.totalStudyTime ?? statsData.totalStudyTime ?? 0;
        } catch {}
        if (!statsData.learning) statsData.learning = { categoriesStudied: 0, technologiesStudied: 0, totalStudyTime: 0, studyDays: 0, studyDaysTotal: 0 };
        statsData.learning.totalStudyTime = statsData.totalStudyTime ?? statsData.learning.totalStudyTime ?? 0;
        setStats(statsData);
        // 从 stats 响应中提取成就列表（后端已返回 achievementList）
        const rawList = statsData?.achievementList || statsData?.achievements?.list;
        if (rawList && Array.isArray(rawList)) {
          setAchievements(rawList.map(a => ({
            id: String(a.id),
            name: a.name || '',
            description: a.description || '',
            icon: a.icon || '🏆',
            category: a.category || 'learning',
            unlocked: !!a.unlocked,
            unlockedAt: a.unlockedAt ? new Date(a.unlockedAt) : undefined,
            progress: a.progress ?? (a.unlocked ? (a.maxProgress ?? 1) : 0),
            maxProgress: a.maxProgress || 1,
          })));
        } else {
          setAchievements([]);
        }
        return statsData;
      } finally {
        setStatsLoading(false);
      }
    };

    const loadHeatmapData = async () => {
    try {
      const response = await fetch('/api/user/learning-stats', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        cache: 'no-store'
      });
      
      const data = await readProfileResponse<{ heatmapData?: UnifiedHeatmapData[] }>(response);
      const hd = data.heatmapData;
      if (Array.isArray(hd)) {
        setHeatmapData(hd);
        return hd;
      } else {
        setHeatmapData([]);
        return [];
      }
    } finally {
      setHeatmapLoading(false);
    }
  };

  // 从数据库加载真实成就数据

  const handleFormSubmit = async (values: ProfileFormData) => {
    if (uploading || saving) return;
    setSaving(true);
    try {
      // 处理技能标签 - 确保是数组格式
      const submitData = {
        ...values,
        image: profileForm.image,
        skills: Array.isArray(values.skills) ? values.skills : []
      };
      
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
        credentials: 'include',
        cache: 'no-store'
      });

      const updatedProfile = await readProfileResponse<{ user?: Partial<ProfileFormData>; token?: string }>(response);

      if (updatedProfile.token) {
        const { setToken } = await import('@shared/lib/auth-client');
        setToken(updatedProfile.token);
      }

      // 立即更新本地状态
      setProfileForm(submitData);
      form.setFieldsValue(submitData);
      
      // 更新本地缓存的用户状态
      update({
        name: updatedProfile.user?.name || submitData.name,
        image: updatedProfile.user?.image || submitData.image,
        username: updatedProfile.user?.username || submitData.username,
      });

      // 刷新全局用户状态
      await refreshUser();
      
      // 当前表单已经保存；避免刷新覆盖随后输入的内容。

      message.success('个人资料更新成功');
      setEditMode(false);
    } catch (error) {
      message.error(error instanceof Error ? error.message : '更新失败，请重试');
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const file = input.files?.[0];
    input.value = ''; // 允许失败后重新选择同一张图片
    if (!file || uploading || saving) return;
    if (!file.type.startsWith('image/')) {
      message.error('请上传图片文件');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      message.error('图片大小不能超过5MB');
      return;
    }
    setUploading(true);
    try {
      const image = await saveProfileAvatar(await compressAvatar(file));
      // 头像独立保存，保留表单中未提交的文字和技能。
      setProfileForm(previous => ({ ...previous, image }));
      form.setFieldValue('image', image);
      updateUser({ image });
      update({ image });
      message.success('头像上传成功');
    } catch (error) {
      message.error(error instanceof Error ? error.message : '头像上传失败，请重试');
    } finally {
      setUploading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      message.loading('正在退出登录...', 1);
      
      // 使用 JWT 认证方式退出：清除 localStorage 中的 token
      signOut({ redirect: false });
      
      // 4. 强制刷新页面，完全重新加载
      message.success('已成功退出登录', 1);
      
      // 添加延迟确保消息显示
      setTimeout(() => {
        // 使用window.location而不是router，确保完全刷新
        window.location.href = '/auth/login?logout=' + new Date().getTime();
      }, 1000);
    } catch (error) {
      console.error('退出失败', error);
      message.error('退出登录失败', 1);
      
      // 出错时仍然尝试强制刷新
      setTimeout(() => {
        window.location.href = '/auth/login?error=logout&time=' + new Date().getTime();
      }, 1000);
    }
  };

  const getSafeStudyMinutes = (minutes?: number) => {
    if (!minutes || minutes <= 0) return 0;
    return minutes > 86400 ? Math.round(minutes / 60) : Math.round(minutes);
  };

  const formatStudyTime = (minutes: number) => {
    const safeMinutes = getSafeStudyMinutes(minutes);
    if (safeMinutes <= 0) return '0分钟';
    if (safeMinutes < 60) return `${safeMinutes}分钟`;
    
    const hours = Math.floor(safeMinutes / 60);
    const remainingMinutes = safeMinutes % 60;
    
    if (remainingMinutes === 0) {
      return `${hours}小时`;
    }
    return `${hours}小时${remainingMinutes}分`;
  };

  const achievementSummary = getAchievementSummary(achievements, stats?.achievements);

  if (status === 'loading' || (statsLoading && !isGuest)) {
    return (
      <div className={`${styles.page} min-h-[calc(100vh-70px)] bg-surface-page pt-3`}>
        <div className={styles.shell}>
          <div className="space-y-5 animate-pulse">
            <div className="h-64 rounded-[20px] bg-slate-200/80 dark:bg-[#151921] border border-slate-200/60 dark:border-white/10" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-32 rounded-[18px] bg-slate-200/75 dark:bg-[#151921] border border-slate-200/60 dark:border-white/10" />
              ))}
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
              <div className="xl:col-span-5 h-80 rounded-[20px] bg-slate-200/75 dark:bg-[#151921] border border-slate-200/60 dark:border-white/10" />
              <div className="xl:col-span-7 h-80 rounded-[20px] bg-slate-200/75 dark:bg-[#151921] border border-slate-200/60 dark:border-white/10" />
            </div>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className={`${styles.page} min-h-[calc(100vh-70px)] bg-surface-page pt-3 flex flex-col`}>
      <div className="flex-1 w-full">
      <div className={styles.shell}>
      {/* 未登录提示胶囊（轻盈融入主容器，避免双层深蓝砖块堆叠） */}
      {isGuest && (
        <div className={`${styles.revealItem} mb-4 rounded-2xl border border-[#1B3B6F]/15 dark:border-[#D4AD72]/25 bg-[#1B3B6F]/[0.05] dark:bg-[#D4AD72]/[0.08] px-4 sm:px-5 py-3 flex flex-wrap items-center justify-between gap-3`}>
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#1B3B6F]/10 dark:bg-[#D4AD72]/15 text-[#1B3B6F] dark:text-[#D4AD72] flex items-center justify-center shrink-0">
              <BarChartOutlined className="text-base" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm text-[#0F1D33] dark:text-[#F2EDE4] mb-0">
                {(stats?.notes?.total || 0) > 0 ? '平台数据总览' : '功能演示'}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 mb-0">
                {(stats?.notes?.total || 0) > 0 
                  ? '展示所有用户的学习数据汇总 · 登录后即可查看您的个人学习统计'
                  : '当前为示例数据，展示平台的学习追踪与分析功能 · 注册登录后记录个人学习历程'
                }
              </p>
            </div>
          </div>
          <Button 
            type="primary"
            size="middle"
            onClick={() => router.push('/auth/login')}
            style={{ backgroundColor: '#1B3B6F', borderColor: 'rgba(212, 173, 114, 0.45)' }}
            className="rounded-xl font-semibold px-5 text-white hover:opacity-95 shrink-0"
          >
            立即登录
          </Button>
        </div>
      )}

        {/* 主要个人信息卡片 - 深墨青质感名片（1A） */}
        <Card 
          className={`${styles.hero} ${styles.revealItem} mb-6 border-0 overflow-hidden`}
          style={{
            background: 'linear-gradient(135deg, #0D1B30 0%, #16315D 58%, #1B3B6F 100%)',
            color: 'white'
          }}
        >
          <div className="relative">
            <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-center justify-between gap-8">
              <div className={`${styles.identity} flex-1 min-w-0 w-full`}>
              {/* 头像区域 */}
              <div className={styles.avatar}>
                <div className="relative inline-block">
                  <div className="w-30 h-30 sm:w-32 sm:h-32 mx-auto mb-4 rounded-full border-[3px] border-[#D4AD72]/75 ring-4 ring-white/10 shadow-2xl overflow-hidden bg-[#0F1D33]/60">
                    <Avatar
                      size={120}
                      style={{ backgroundColor: 'transparent' }}
                      src={profileForm.image || session?.user?.image || ''}
                      icon={<UserOutlined />}
                      className="w-full h-full"
                    />
                  </div>
                  {editMode && !isGuest && (
                    <div className="absolute bottom-1 right-1">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleAvatarUpload}
                      />
                      <Button
                        type="primary"
                        shape="circle"
                        size="large"
                        icon={<EditOutlined />}
                        loading={uploading}
                        disabled={saving}
                        className="shadow-lg bg-[#D4AD72] text-[#0F1D33] border-2 border-[#0F1D33] hover:opacity-90"
                        onClick={() => fileInputRef.current?.click()}
                      />
                    </div>
                  )}
                </div>
              </div>
              
              {/* 用户信息 */}
              <div className={styles.details}>
                <div className="flex items-center justify-center gap-3 mb-1.5">
                  <Title level={1} className="mb-0" style={{ color: '#F7F4EE', margin: 0, fontSize: '2.25rem' }}>
                    {profileForm.name || session?.user?.name || '未设置用户名'}
                  </Title>
                  {isGuest && (stats?.notes?.total || 0) > 0 && (
                    <span className="px-2.5 py-0.5 bg-white/12 border border-white/20 text-[#F2EDE4] rounded-full text-xs font-semibold backdrop-blur-xs">
                      平台数据
                    </span>
                  )}
                  {isGuest && (stats?.notes?.total || 0) === 0 && (
                    <span className="px-2.5 py-0.5 bg-[#D4AD72]/20 border border-[#D4AD72]/45 text-[#F6DFAF] rounded-full text-xs font-semibold">
                      演示数据
                    </span>
                  )}
                </div>

                {/* 登录账户展示 */}
                {profileForm.username && (
                  <div className="text-[#D4AD72] font-mono text-sm opacity-95 mb-2.5 flex items-center justify-center gap-0.5 font-semibold">
                    <span>@</span>
                    <span>{profileForm.username}</span>
                  </div>
                )}

                {/* VIP 会员徽章 */}
                {profileForm.vip && profileForm.vipLevel && profileForm.vipLevel > 0 && (() => {
                  const badges = [
                    null,
                    { emoji: '👑', label: '体验会员', color: 'from-[#B88E52] to-[#D4AD72]', glow: 'shadow-amber-500/30' },
                    { emoji: '🌟', label: '进阶会员', color: 'from-[#6366F1] to-[#38BDF8]', glow: 'shadow-indigo-500/30' },
                    { emoji: '🔥', label: '永久共创者', color: 'from-[#D4AD72] via-[#F59E0B] to-[#E07A5F]', glow: 'shadow-amber-500/35' },
                  ];
                  const badge = badges[profileForm.vipLevel];
                  const expireText = profileForm.vipLevel === 3
                    ? '永久有效'
                    : profileForm.vipExpireTime
                      ? `有效至 ${new Date(profileForm.vipExpireTime).toLocaleDateString('zh-CN')}`
                      : '';
                  return badge ? (
                    <div className="flex flex-wrap items-center gap-2 mb-2.5">
                      <div className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r ${badge.color} shadow-md ${badge.glow} text-white text-xs font-bold`}>
                        <span>{badge.emoji}</span>
                        <span>{badge.label}</span>
                      </div>
                      {expireText && (
                        <span className="text-xs text-slate-300/80">{expireText}</span>
                      )}
                    </div>
                  ) : null;
                })()}
                
                {/* 职位和公司 */}
                {(profileForm.jobTitle || profileForm.company) && (
                  <Text className="block mb-1.5 text-base opacity-90" style={{ color: '#E8EDF5' }}>
                    {profileForm.jobTitle && <span>{profileForm.jobTitle}</span>}
                    {profileForm.jobTitle && profileForm.company && <span> @ </span>}
                    {profileForm.company && <span>{profileForm.company}</span>}
                  </Text>
                )}
                
                {!isGuest && session?.user?.email && (
                  <Text className="block mb-3 text-sm opacity-75 font-mono" style={{ color: '#CBD5E1' }}>
                    {session.user.email}
                  </Text>
                )}
                
                {profileForm.bio && (
                  <Paragraph className="mb-6 text-sm sm:text-[15px] max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(236, 241, 248, 0.86)' }}>
                    {profileForm.bio}
                  </Paragraph>
                )}

                {/* 个人信息标签 */}
                <div className="flex flex-wrap justify-center gap-2.5 mb-5">
                  {profileForm.location && (
                    <Tag 
                      icon={<EnvironmentOutlined />} 
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.11)', color: '#F2EDE4', borderColor: 'rgba(255, 255, 255, 0.22)', padding: '4px 12px', height: 'auto', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                      className="text-xs sm:text-sm m-0"
                    >
                      {profileForm.location}
                    </Tag>
                  )}
                  {profileForm.github && (
                    <Tag 
                      icon={<GithubOutlined />} 
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.11)', color: '#F2EDE4', borderColor: 'rgba(255, 255, 255, 0.22)', padding: '4px 12px', height: 'auto', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                      className="text-xs sm:text-sm cursor-pointer hover:bg-white/20 transition-colors m-0"
                      onClick={() => window.open(`https://github.com/${profileForm.github}`, '_blank')}
                    >
                      {profileForm.github}
                    </Tag>
                  )}
                  {profileForm.website && (
                    <Tag 
                      icon={<GlobalOutlined />} 
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.11)', color: '#F2EDE4', borderColor: 'rgba(255, 255, 255, 0.22)', padding: '4px 12px', height: 'auto', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                      className="text-xs sm:text-sm cursor-pointer hover:bg-white/20 transition-colors m-0"
                      onClick={() => window.open(profileForm.website, '_blank')}
                    >
                      个人网站
                    </Tag>
                  )}
                </div>
                
                {/* 技能标签（统一磨砂质感胶囊，收束彩虹杂色） */}
                {profileForm.skills && profileForm.skills.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-1.5 mb-5">
                    {profileForm.skills.map((skill: string, index: number) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 border border-[#D4AD72]/30 text-[#F7F4EE] backdrop-blur-xs hover:bg-white/18 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {/* 操作按钮 */}
                {!isGuest && (
                  <Space size="middle" wrap>
                    <Button 
                      type="default"
                      size="large"
                      icon={<EditOutlined />}
                      disabled={saving || uploading || refreshing}
                      onClick={() => {
                        if (editMode) form.setFieldsValue(profileForm);
                        setEditMode(!editMode);
                      }}
                      style={{ backgroundColor: editMode ? '#D4AD72' : 'rgba(255, 255, 255, 0.14)', color: editMode ? '#0F1D33' : '#ffffff', borderColor: editMode ? '#D4AD72' : 'rgba(255, 255, 255, 0.24)' }}
                      className="hover:opacity-95 px-5 py-2 h-auto font-medium"
                    >
                      {editMode ? '收起编辑' : '编辑资料'}
                    </Button>
                    <Button 
                      type="default"
                      size="large"
                      icon={<svg viewBox="0 0 24 24" className="w-4 h-4 inline-block" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>}
                      onClick={() => refreshData(true)}
                      loading={refreshing}
                      disabled={editMode || saving || uploading}
                      style={{ backgroundColor: 'rgba(212, 173, 114, 0.18)', color: '#F6DFAF', borderColor: 'rgba(212, 173, 114, 0.35)' }}
                      className="hover:bg-[#D4AD72]/30 px-5 py-2 h-auto font-medium"
                    >
                      刷新数据
                    </Button>
                    <Button 
                      danger 
                      size="large"
                      onClick={handleSignOut}
                      style={{ backgroundColor: 'rgba(239, 68, 68, 0.16)', color: '#FCA5A5', borderColor: 'rgba(239, 68, 68, 0.32)' }}
                      className="hover:bg-red-500/25 hover:text-red-200 px-5 py-2 h-auto font-medium"
                    >
                      退出登录
                    </Button>
                  </Space>
                )}
              </div>
            </div>

            {/* 右侧：禾硙灵宠伴学互动舞台（通透磨砂玻璃舱，自然融入名片，不再惨白贴纸） */}
            <div className="hidden lg:flex flex-col items-center justify-center flex-shrink-0 self-center my-auto">
              <div className="relative flex flex-col items-center justify-center bg-white/[0.08] backdrop-blur-md pt-9 pb-3 px-5 rounded-3xl border border-white/[0.18] shadow-[0_14px_38px_rgba(6,13,26,0.34)] hover:border-[#D4AD72]/45 transition-all select-none">
                <div className="absolute top-3 left-4 flex items-center gap-1.5 text-[11px] font-mono text-[#F2EDE4]/85">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>禾硙伴学守卫中</span>
                </div>
                <div className="absolute top-3 right-4 text-[11px] text-[#D4AD72] font-medium">
                  眼神跟随
                </div>
                <div className="mt-2">
                  <EyePet 
                    customBubble={saving ? '正在保存你的新资料喵~' : editMode ? '正在用心编辑个人名片喵~' : undefined}
                  />
                </div>
              </div>
            </div>
          </div>
          </div>
        </Card>

        {/* 编辑资料嵌入式面板（展开时保留下方全部学习统计，不再割裂隐藏） */}
        {editMode && !isGuest && (
          <Card 
            title={
              <div className="flex items-center justify-between">
                <div className="flex items-center text-lg font-semibold">
                  <EditOutlined className="mr-2.5 text-[#1B3B6F] dark:text-[#D4AD72]" />
                  <span>编辑个人资料</span>
                </div>
                <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                  修改后即时同步全站个人名片
                </span>
              </div>
            }
            className={`${styles.revealItem} mb-6 border-0`}
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleFormSubmit}
              initialValues={profileForm}
              className="max-w-3xl mx-auto"
            >
              <Form.Item
                label={<span className="text-sm font-semibold">登录账号 (5~16位字母、数字或下划线)</span>}
                name="username"
                rules={[
                  { required: true, message: '请输入登录账号' },
                  { pattern: /^[a-zA-Z0-9_]{5,16}$/, message: '登录账号需为 5~16 位字母、数字或下划线' }
                ]}
              >
                <Input 
                  placeholder="请输入 5~16 位登录账号" 
                  maxLength={16}
                  size="large"
                  className="rounded-xl font-sans"
                />
              </Form.Item>

              <Form.Item
                label={<span className="text-sm font-semibold">显示名称</span>}
                name="name"
                rules={[{ required: true, message: '请输入显示名称' }]}
              >
                <Input 
                  placeholder="请输入您的显示名称" 
                  size="large"
                  className="rounded-xl"
                />
              </Form.Item>

              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item label={<span className="text-sm font-semibold">职位</span>} name="jobTitle">
                    <Input 
                      placeholder="如：全栈工程师" 
                      size="large"
                      className="rounded-xl"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item label={<span className="text-sm font-semibold">公司/学校</span>} name="company">
                    <Input 
                      placeholder="如：某某科技公司" 
                      size="large"
                      className="rounded-xl"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item label={<span className="text-sm font-semibold">个人简介</span>} name="bio">
                <Input.TextArea 
                  rows={4} 
                  placeholder="介绍一下自己..." 
                  maxLength={500}
                  showCount
                  className="rounded-xl"
                />
              </Form.Item>

              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item label={<span className="text-sm font-semibold">所在地</span>} name="location">
                    <Input 
                      prefix={<EnvironmentOutlined className="text-gray-400" />}
                      placeholder="如：中国 安徽省 合肥市" 
                      size="large"
                      className="rounded-xl"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item label={<span className="text-sm font-semibold">GitHub</span>} name="github">
                    <Input 
                      prefix={<GithubOutlined className="text-gray-400" />}
                      placeholder="GitHub用户名" 
                      size="large"
                      className="rounded-xl"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item label={<span className="text-sm font-semibold">个人网站</span>} name="website">
                <Input 
                  prefix={<GlobalOutlined className="text-gray-400" />}
                  placeholder="https://yourwebsite.com" 
                  size="large"
                  className="rounded-xl"
                />
              </Form.Item>

              <Form.Item 
                label={<span className="text-sm font-semibold">技能标签</span>} 
                name="skills"
              >
                <Select
                  mode="tags"
                  size="large"
                  placeholder="输入技能后按回车添加，如：Python、React、Node.js"
                  className="rounded-xl"
                  tokenSeparators={[',']}
                />
              </Form.Item>

              <Form.Item className="mb-0 text-right">
                <Space size="middle">
                  <Button 
                    disabled={saving || uploading}
                    onClick={() => { form.setFieldsValue(profileForm); setEditMode(false); }}
                    size="large"
                    className="rounded-xl px-6 py-2 h-auto"
                  >
                    取消
                  </Button>
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    loading={saving}
                    disabled={uploading}
                    size="large"
                    style={{ backgroundColor: '#1B3B6F' }}
                    className="border-0 rounded-xl px-7 py-2 h-auto font-semibold"
                  >
                    保存更改
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        )}

        {/* 主体 Bento 数据与洞察工作台 */}
        <div className={styles.panels}>
            {/* 4 张高信息密度 KPI 指标卡 */}
            {!statsLoading && stats && (
              <div className={`${styles.metrics} ${styles.revealItem} grid grid-cols-2 lg:grid-cols-4 gap-4`} style={{ animationDelay: '40ms' }}>
                <Card 
                  className={`border-0 ${!isGuest ? 'cursor-pointer' : ''}`}
                  onClick={() => !isGuest && router.push('/notes')}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">笔记总数</span>
                    <span className="w-8 h-8 rounded-xl bg-[#1B3B6F]/10 dark:bg-sky-500/15 text-[#1B3B6F] dark:text-sky-300 flex items-center justify-center">
                      <BookOutlined />
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-[#F2EDE4] tabular-nums mb-2">
                    {stats?.notes?.total || 0}
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                    <span>公开 {stats?.notes?.public || 0} · 私密 {stats?.notes?.private || 0}</span>
                    {!isGuest && <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />}
                  </div>
                </Card>

                <Card 
                  className={`border-0 ${!isGuest ? 'cursor-pointer' : ''}`}
                  onClick={() => !isGuest && router.push('/study')}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">学习天数</span>
                    <span className="w-8 h-8 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 flex items-center justify-center">
                      <CalendarOutlined />
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-300 tabular-nums mb-2">
                    {stats?.learning?.studyDaysTotal || 0}
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                    <span>累计学习 {formatStudyTime(stats?.learning?.totalStudyTime || 0)}</span>
                    {!isGuest && <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />}
                  </div>
                </Card>

                <Card 
                  className={`border-0 ${!isGuest ? 'cursor-pointer' : ''}`}
                  onClick={() => !isGuest && router.push('/profile/bookmarks?tab=received')}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">获得点赞</span>
                    <span className="w-8 h-8 rounded-xl bg-rose-500/10 dark:bg-rose-500/15 text-rose-500 dark:text-rose-300 flex items-center justify-center">
                      <HeartOutlined />
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-rose-600 dark:text-rose-300 tabular-nums mb-2">
                    {stats?.engagement?.likesReceived || 0}
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                    <span>收到评论 {stats?.engagement?.commentsReceived || 0} 条</span>
                    {!isGuest && <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />}
                  </div>
                </Card>

                <Card 
                  className={`border-0 ${!isGuest ? 'cursor-pointer' : ''}`}
                  onClick={() => !isGuest && router.push('/study')}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">技术栈</span>
                    <span className="w-8 h-8 rounded-xl bg-[#D4AD72]/15 text-[#9A7234] dark:text-[#E8CA96] flex items-center justify-center">
                      <FireOutlined />
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-[#9A7234] dark:text-[#E8CA96] tabular-nums mb-2">
                    {stats?.learning?.technologiesStudied || 0}
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                    <span>覆盖 {stats?.learning?.categoriesStudied || 0} 大知识领域</span>
                    {!isGuest && <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />}
                  </div>
                </Card>
              </div>
            )}

            {/* 学习进度 */}
            {!statsLoading && stats && (
              <Card 
                title={
                  <div className="flex items-center text-lg font-semibold">
                    <BarChartOutlined className="mr-2.5 text-[#1B3B6F] dark:text-[#D4AD72]" />
                    <span>学习进度</span>
                  </div>
                }
                className={`${styles.learning} ${styles.revealItem}`}
                style={{ animationDelay: '80ms' }}
              >
                <Row gutter={[14, 14]}>
                  <Col xs={12} sm={12}>
                    <div className="text-center p-3.5 bg-slate-50/90 dark:bg-white/[0.03] border border-slate-200/75 dark:border-white/10 rounded-2xl">
                      <Progress
                        type="circle"
                        percent={Math.min(100, ((stats?.notes?.public || 0) / Math.max(1, stats?.notes?.total || 1)) * 100)}
                        format={() => `${stats?.notes?.public || 0}/${stats?.notes?.total || 0}`}
                        strokeColor={{
                          '0%': '#059669',
                          '100%': '#10B981',
                        }}
                        strokeWidth={7}
                        size={96}
                      />
                      <p className="mt-2.5 text-sm font-semibold text-slate-800 dark:text-[#F2EDE4] mb-0">公开笔记</p>
                    </div>
                  </Col>
                  <Col xs={12} sm={12}>
                    <div className="text-center p-3.5 bg-slate-50/90 dark:bg-white/[0.03] border border-slate-200/75 dark:border-white/10 rounded-2xl">
                      <Progress
                        type="circle"
                        percent={Math.min(100, (stats?.learning?.categoriesStudied || 0) * 10)}
                        format={() => `${stats?.learning?.categoriesStudied || 0}`}
                        strokeColor={{
                          '0%': '#1B3B6F',
                          '100%': '#D4AD72',
                        }}
                        strokeWidth={7}
                        size={96}
                      />
                      <p className="mt-2.5 text-sm font-semibold text-slate-800 dark:text-[#F2EDE4] mb-0">学习领域</p>
                    </div>
                  </Col>
                </Row>

                <Divider style={{ margin: '14px 0' }} />

                <Row gutter={[12, 12]}>
                  {/* 左侧长方形卡片：总学习时间（点击切换分钟/小时，定时自动恢复） */}
                  <Col xs={24} sm={12}>
                    <div 
                      className="group relative p-3.5 bg-slate-50/90 dark:bg-white/[0.03] rounded-2xl flex items-center gap-3 cursor-pointer border border-slate-200/75 dark:border-white/10 hover:border-[#D4AD72]/50 transition-all duration-200 select-none h-full"
                      onClick={handleToggleStudyTime}
                      title="点击切换显示格式（小时/纯分钟）"
                    >
                      <div className="w-9 h-9 rounded-xl bg-[#1B3B6F]/10 dark:bg-[#D4AD72]/15 flex items-center justify-center text-[#1B3B6F] dark:text-[#D4AD72] text-base flex-shrink-0 group-hover:scale-105 transition-transform">
                        <ClockCircleOutlined />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">总学习时间</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#1B3B6F]/10 dark:bg-[#D4AD72]/20 text-[#1B3B6F] dark:text-[#E8CA96] font-medium whitespace-nowrap">
                            {showTotalMinutes ? '纯分钟' : '切分钟'}
                          </span>
                        </div>
                        <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#F2EDE4] whitespace-nowrap tracking-tight tabular-nums">
                          {showTotalMinutes 
                            ? `${getSafeStudyMinutes(stats?.learning?.totalStudyTime).toLocaleString()} 分钟`
                            : formatStudyTime(stats?.learning?.totalStudyTime || 0)}
                        </div>
                      </div>
                    </div>
                  </Col>

                  {/* 右侧长方形卡片：收藏与点赞合并（点击直达对应标签页） */}
                  <Col xs={24} sm={12}>
                    <div className="p-2 bg-slate-50/90 dark:bg-white/[0.03] rounded-2xl flex items-center justify-around border border-slate-200/75 dark:border-white/10 select-none h-full gap-1">
                      {/* 我的收藏 */}
                      <div
                        className={`group flex items-center gap-2 flex-1 justify-center min-w-0 py-1.5 px-2 rounded-xl transition-all ${
                          !isGuest ? 'cursor-pointer hover:bg-white dark:hover:bg-white/[0.06]' : ''
                        }`}
                        onClick={() => !isGuest && router.push('/profile/bookmarks?tab=bookmarks')}
                        title="点击查看我的收藏"
                      >
                        <div className="w-8 h-8 rounded-xl bg-[#D4AD72]/15 flex items-center justify-center text-[#9A7234] dark:text-[#D4AD72] text-base flex-shrink-0 group-hover:scale-105 transition-transform">
                          <BookOutlined />
                        </div>
                        <div className="min-w-0">
                          <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#F2EDE4] leading-tight tabular-nums">
                            {stats?.engagement?.bookmarksReceived || 0}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 whitespace-nowrap">我的收藏</div>
                        </div>
                      </div>

                      {/* 分隔线 */}
                      <div className="h-6 w-[1px] bg-slate-200 dark:bg-white/15 flex-shrink-0" />

                      {/* 获得点赞 */}
                      <div
                        className={`group flex items-center gap-2 flex-1 justify-center min-w-0 py-1.5 px-2 rounded-xl transition-all ${
                          !isGuest ? 'cursor-pointer hover:bg-white dark:hover:bg-white/[0.06]' : ''
                        }`}
                        onClick={() => !isGuest && router.push('/profile/bookmarks?tab=received')}
                        title="点击查看点赞中心"
                      >
                        <div className="w-8 h-8 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500 dark:text-rose-300 text-base flex-shrink-0 group-hover:scale-105 transition-transform">
                          <HeartOutlined />
                        </div>
                        <div className="min-w-0">
                          <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#F2EDE4] leading-tight tabular-nums">
                            {stats?.engagement?.likesReceived || 0}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 whitespace-nowrap">获得点赞</div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card>
            )}

            {/* 学习热力图 */}
            {!heatmapLoading && (
              <Card
                title={
                  <div className="flex items-center text-lg font-semibold">
                    <FireOutlined className="mr-2.5 text-emerald-500" />
                    <span>学习热力图</span>
                  </div>
                }
                className={`${styles.heatmap} ${styles.revealItem}`}
                style={{ animationDelay: '120ms' }}
              >
                <LearningHeatmap
                  data={heatmapData}
                  year={new Date().getFullYear()}
                  hideTitle={true}
                  seamless={true}
                />
              </Card>
            )}

            {/* 下半屏分段导航工作台（2A 推荐 + 一键展开全部视图，保留全部三大板块） */}
            {!statsLoading && stats && (
              <div className="col-span-full space-y-5 mt-1">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className={styles.tabBar} role="tablist" aria-label="学习档案详情视图">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeTab === 'analytics'}
                      onClick={() => setActiveTab('analytics')}
                      className={`${styles.tabBtn} ${activeTab === 'analytics' ? styles.tabBtnActive : ''}`}
                    >
                      <BarChartOutlined />
                      <span>数据洞察</span>
                      <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-slate-200/75 dark:bg-white/10 text-slate-600 dark:text-slate-300 tabular-nums">
                        3
                      </span>
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeTab === 'achievements'}
                      onClick={() => setActiveTab('achievements')}
                      className={`${styles.tabBtn} ${activeTab === 'achievements' ? styles.tabBtnActive : ''}`}
                    >
                      <TrophyOutlined />
                      <span>成就勋章</span>
                      <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-[#D4AD72]/18 text-[#8A662E] dark:text-[#E8CA96] tabular-nums">
                        {achievementSummary.earned}/{achievementSummary.total}
                      </span>
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeTab === 'activity'}
                      onClick={() => setActiveTab('activity')}
                      className={`${styles.tabBtn} ${activeTab === 'activity' ? styles.tabBtnActive : ''}`}
                    >
                      <CalendarOutlined />
                      <span>最近足迹</span>
                      <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-slate-200/75 dark:bg-white/10 text-slate-600 dark:text-slate-300 tabular-nums">
                        {stats?.recentActivity?.length || 0}
                      </span>
                    </button>
                  </div>

                  <div className="inline-flex items-center p-1 rounded-xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#151921] shadow-sm">
                    <button
                      type="button"
                      onClick={() => setActiveTab(activeTab === 'all' ? 'analytics' : 'all')}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        activeTab === 'all'
                          ? 'bg-[#1B3B6F] text-white dark:bg-[#D4AD72] dark:text-[#0F1D33] shadow-sm'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06]'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>{activeTab === 'all' ? '已展开全部' : '全部展开'}</span>
                    </button>
                    {(activeTab === 'analytics' || activeTab === 'all') && (
                      <>
                        <span className="h-4 w-[1px] bg-slate-200 dark:bg-white/15 mx-1" />
                        <button
                          type="button"
                          onClick={toggleFullscreen}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06] hover:text-[#1B3B6F] dark:hover:text-[#D4AD72] transition-all"
                        >
                          {isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
                          <span>{isFullscreen ? '退出全屏' : '全屏展示'}</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {(activeTab === 'analytics' || activeTab === 'all') && (
                  <div className={styles.revealItem}>
                    <DataVisualization stats={stats} isGuest={isGuest} hideFullscreenButton={true} />
                  </div>
                )}

                {(activeTab === 'achievements' || activeTab === 'all') && (
                  <div className={styles.revealItem}>
                    <AchievementsSection
                      achievements={achievements}
                      summary={achievementSummary}
                      showAll={showAllAch}
                      onToggleShowAll={() => setShowAllAch(!showAllAch)}
                    />
                  </div>
                )}

                {(activeTab === 'activity' || activeTab === 'all') && (
                  <div className={styles.revealItem}>
                    <RecentActivityTimeline activities={stats?.recentActivity} />
                  </div>
                )}
              </div>
            )}
          </div>
      </div>
      </div>

      {/* 网站合规备案与页脚 */}
      <SiteFooter className="mt-auto" />
    </div>
  );
} 
'use client';

import { useState, useEffect, useRef } from 'react';
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
  BarChartOutlined
} from '@ant-design/icons';
import LearningHeatmap from '@shared/components/LearningHeatmap';
import DataVisualization from '@shared/components/DataVisualization';
import InkWashDecoration from '@shared/components/InkWashDecoration';
import AchievementCard from '@shared/components/AchievementCard';
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
  const [showVip, setShowVip] = useState(false);

  // 添加刷新数据的函数
  const refreshData = async () => {
    // 只有已登录用户才刷新数据
    if (status !== 'authenticated') {
      return;
    }
    
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
      } else {
        message.success('数据已刷新');
      }
    } catch (error) {
      console.error('刷新数据失败:', error);
      message.error('刷新数据失败');
    } finally {
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
          bio: `${data.totalUsers || 0} 位学习者正在使用本平台，共创建了 ${data.totalNotes || 0} 篇学习笔记，累计学习 ${Math.floor((data.totalStudyTime || 0) / 60)} 小时。${data.todayNotes > 0 ? `今日新增 ${data.todayNotes} 篇笔记，` : ''}${data.weeklyActiveUsers > 0 ? `本周 ${data.weeklyActiveUsers} 位用户活跃。` : ''}加入我们，开始你的学习之旅！`,
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
        let maxCount = isWeekend ? 8 : 15;
        
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
      if (!res.ok) throw new Error(`API 错误: ${res.status}`);
      const json = await res.json();
      const profileData = json.data ?? json;
        
        const formData = {
          name: profileData.name || session?.user?.name || '',
          jobTitle: profileData.jobTitle || '',
          company: profileData.company || '',
          bio: profileData.bio || '',
          location: profileData.location || '',
          github: profileData.github || '',
          website: profileData.website || '',
          image: profileData.image || session?.user?.image || '',
          skills: profileData.skills || [],
          username: profileData.username || (session?.user as any)?.username || '',
          vip: profileData.vip || false,
          vipLevel: profileData.vipLevel || 0,
          vipExpireTime: profileData.vipExpireTime || null,
          socialLinks: profileData.socialLinks || {}
        };
        
        setProfileForm(formData);
        form.setFieldsValue(formData);
        return profileData;
      } catch (fetchError) {
        const defaultFormData = {
          name: session?.user?.name || '',
          jobTitle: '',
          company: '',
          bio: '',
          location: '',
          github: '',
          website: '',
          image: session?.user?.image || '',
          skills: [],
          username: (session?.user as any)?.username || '',
          socialLinks: {}
        };
        
        setProfileForm(defaultFormData);
        form.setFieldsValue(defaultFormData);
        return { name: session?.user?.name || '', email: session?.user?.email || '', image: session?.user?.image || '' };
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
        if (!res.ok) throw new Error(`API错误: ${res.status}`);
        const json = await res.json();
        const statsData = json.data ?? json;
        // 补充真实学习时间
        try {
          const sr = await fetch('/api/study/stats', { headers: { 'Content-Type': 'application/json' } });
          const sj = await sr.json();
          if (sj.success && sj.data) statsData.totalStudyTime = sj.data.totalStudyTime || statsData.totalStudyTime || 0;
        } catch {}
        if (!statsData.learning) statsData.learning = {};
        statsData.learning.totalStudyTime = statsData.totalStudyTime || 0;
        setStats(statsData);
        // 从 stats 响应中提取成就列表（后端已返回 achievementList）
        console.log('statsData keys:', Object.keys(statsData));
        const rawList = statsData?.achievementList || statsData?.achievements?.list;
        if (rawList && Array.isArray(rawList)) {
          console.log('achievementList count:', rawList.length);
          setAchievements(rawList.map((a: any) => ({
            id: String(a.id),
            name: a.name || '',
            description: a.description || '',
            icon: a.icon || '🏆',
            category: a.category || 'learning',
            unlocked: !!a.unlocked,
            unlockedAt: a.unlockedAt ? new Date(a.unlockedAt) : undefined,
            progress: a.progress || (a.unlocked ? (a.maxProgress || 1) : 0),
            maxProgress: a.maxProgress || 1,
          })));
        }
        return statsData;
      } catch {
        const emptyStats = {
          notes: { total: 0, public: 0, private: 0, firstNoteDate: '', lastActivityDate: '' },
          engagement: { likesReceived: 0, bookmarksReceived: 0, commentsReceived: 0 },
          learning: { categoriesStudied: 0, technologiesStudied: 0, totalStudyTime: 0, studyDays: 0, studyDaysTotal: 0 },
          achievements: { total: 10, earned: 0 },
          recentActivity: [],
          monthlyStats: []
        };
        setStats(emptyStats);
        return emptyStats;
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
      
      if (!response.ok) throw new Error(`API错误: ${response.status}`);

      const json = await response.json();
      const hd = json.data?.heatmapData ?? json.heatmapData;
      if (Array.isArray(hd)) {
        setHeatmapData(hd);
        return hd;
      } else {
        setHeatmapData([]);
        return [];
      }
    } catch (error) {
      setHeatmapData([]);
      return { heatmapData: [] };
    } finally {
      setHeatmapLoading(false);
    }
  };

  // 从数据库加载真实成就数据

  const handleFormSubmit = async (values: ProfileFormData) => {
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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '更新失败');
      }

      const updatedProfile = await response.json();
      
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
      
      // 强制重新加载用户资料
      await loadUserProfile();

      message.success('个人资料更新成功');
      setEditMode(false);
    } catch (error) {
      message.error(error instanceof Error ? error.message : '更新失败，请重试');
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 检查文件类型
    if (!file.type.startsWith('image/')) {
      message.error('请上传图片文件');
      return;
    }

    // 检查文件大小 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      message.error('图片大小不能超过5MB');
      return;
    }

    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const base64 = reader.result as string;
          
          // 压缩图片
          const img = new Image();
          img.onload = async () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // 限制最大尺寸为400x400
            let width = img.width;
            let height = img.height;
            const maxSize = 400;
            
            if (width > height) {
              if (width > maxSize) {
                height = (height * maxSize) / width;
                width = maxSize;
              }
            } else {
              if (height > maxSize) {
                width = (width * maxSize) / height;
                height = maxSize;
              }
            }
            
            canvas.width = width;
            canvas.height = height;
            ctx?.drawImage(img, 0, 0, width, height);
            
            // 转换为base64，质量0.7
            const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
            
            
            const response = await fetch('/api/user/avatar', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ image: compressedBase64 }),
              credentials: 'include',
              cache: 'no-store'
            });

            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.error || '上传失败');
            }

            const data = await response.json();
            
            // 立即更新本地状态
            const updatedFormData = {
              ...profileForm,
              image: data.image
            };
            
            setProfileForm(updatedFormData);
            form.setFieldsValue(updatedFormData);
            
            // 更新全局用户状态
            updateUser({ image: data.image });
            
            // 更新本地缓存的用户状态
            update({ image: data.image });
            
            // 重新加载用户资料
            await loadUserProfile();

            message.success('头像上传成功');
            setUploading(false);
          };
          
          img.onerror = () => {
            message.error('图片加载失败');
            setUploading(false);
          };
          
          img.src = base64;
        } catch (error) {
          console.error('头像上传失败:', error);
          message.error(error instanceof Error ? error.message : '头像上传失败，请重试');
          setUploading(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('文件读取失败:', error);
      message.error('文件读取失败，请重试');
      setUploading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      message.loading('正在退出登录...', 1);
      
      // 使用 JWT 认证方式退出：清除 localStorage 中的 token
      signOut({ redirect: false });
      
      // 清除所有localStorage
      if (typeof localStorage !== 'undefined') {
        localStorage.clear();
      }
      
      // 清除所有sessionStorage
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.clear();
      }
      
      // 清除所有cookie
      document.cookie.split(";").forEach(function(c) {
        const cookieName = c.split('=')[0].trim();
        document.cookie = cookieName + "=;expires=" + new Date().toUTCString() + ";path=/";
      });
      
      // 4. 强制刷新页面，完全重新加载
      message.success('已成功退出登录', 1);
      
      // 添加延迟确保消息显示
      setTimeout(() => {
        // 使用window.location而不是router，确保完全刷新
        window.location.href = '/login?logout=' + new Date().getTime();
      }, 1000);
    } catch (error) {
      console.error('退出失败', error);
      message.error('退出登录失败', 1);
      
      // 出错时仍然尝试强制刷新
      setTimeout(() => {
        window.location.href = '/login?error=logout&time=' + new Date().getTime();
      }, 1000);
    }
  };

  const formatStudyTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}分钟`;
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (hours < 24) {
      if (remainingMinutes === 0) {
        return `${hours}小时`;
      } else {
        return `${hours}小时${remainingMinutes}分钟`;
      }
    }
    
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    
    if (remainingHours === 0) {
      return `${days}天`;
    } else {
      return `${days}天${remainingHours}小时`;
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (statsLoading && !isGuest) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-surface-page dark:bg-surface-inverse">
      {/* 水墨画顶部装饰 */}
      <InkWashDecoration variant="landscape" height={180} className="bg-surface-page" />
      <InkWashDecoration variant="birds" height={50} className="bg-surface-page -mt-4" />

      {/* 未登录提示横幅 */}
      {isGuest && (
        <div className="bg-gradient-to-r from-[#0C1F3D] to-[#3d4f6b] text-white py-4 px-6 shadow-lg">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-surface-raised bg-opacity-20 rounded-full flex items-center justify-center">
                <BarChartOutlined className="text-xl" />
              </div>
              <div>
                <p className="font-semibold text-lg">
                  {(stats?.notes?.total || 0) > 0 ? '平台数据总览' : '功能演示'}
                </p>
                <p className="text-sm opacity-90">
                  {(stats?.notes?.total || 0) > 0 
                    ? '展示所有用户的学习数据汇总 · 登录后查看您的个人学习统计'
                    : '这是示例数据，展示平台的学习追踪功能 · 注册登录开始记录您的学习历程'
                  }
                </p>
              </div>
            </div>
            <Button 
              type="default"
              size="large"
              onClick={() => router.push('/auth/login')}
              className="bg-surface-raised text-content-secondary border-0 hover:bg-surface-page font-semibold px-6"
            >
              立即登录
            </Button>
          </div>
        </div>
      )}
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 主要个人信息卡片 - 作为页面头部 */}
        <Card 
          className="mb-8 shadow-xl border-0 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0C1F3D 0%, #3d4f6b 100%)',
            color: 'white'
          }}
        >
          <div className="relative">
            {/* 装饰性背景图案 */}
            <div className="absolute top-0 right-0 w-40 h-40 opacity-10">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="40" fill="currentColor" />
                <circle cx="30" cy="30" r="20" fill="currentColor" />
                <circle cx="70" cy="70" r="15" fill="currentColor" />
              </svg>
            </div>
            
            <div className="relative z-10 text-center py-8">
              {/* 头像区域 */}
              <div className="mb-6">
                <div className="relative inline-block">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-white">
                    <Avatar
                      size={120}
                      src={profileForm.image || session?.user?.image || ''}
                      icon={<UserOutlined />}
                      className="w-full h-full"
                    />
                  </div>
                  {editMode && !isGuest && (
                    <div className="absolute bottom-2 right-2">
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
                        className="shadow-lg bg-surface-raised text-content-secondary border-0 hover:bg-surface-page"
                        onClick={() => fileInputRef.current?.click()}
                      />
                    </div>
                  )}
                </div>
              </div>
              
              {/* 用户信息 */}
              <div className="mb-6">
                <div className="flex items-center justify-center gap-3 mb-1">
                  <Title level={1} className="mb-0" style={{ color: 'white', margin: 0, fontSize: '2.5rem' }}>
                    {profileForm.name || session?.user?.name || '未设置用户名'}
                  </Title>
                  {isGuest && (stats?.notes?.total || 0) > 0 && (
                    <span className="px-3 py-1 bg-surface-raised bg-opacity-20 rounded-full text-sm font-semibold">
                      平台数据
                    </span>
                  )}
                  {isGuest && (stats?.notes?.total || 0) === 0 && (
                    <span className="px-3 py-1 bg-yellow-400 bg-opacity-30 rounded-full text-sm font-semibold">
                      演示数据
                    </span>
                  )}
                </div>

                {/* 登录账户展示 */}
                {profileForm.username && (
                  <div className="text-[#BBFF5C] font-mono text-base opacity-90 mb-3 flex items-center justify-center gap-1 font-semibold">
                    <span>@</span>
                    <span>{profileForm.username}</span>
                  </div>
                )}

                {/* VIP 会员徽章 */}
                {profileForm.vip && profileForm.vipLevel && profileForm.vipLevel > 0 && (() => {
                  const badges = [
                    null,
                    { emoji: '👑', label: '体验会员', color: 'from-yellow-600 to-yellow-400', glow: 'shadow-yellow-500/40' },
                    { emoji: '🌟', label: '进阶会员', color: 'from-purple-600 to-cyan-400', glow: 'shadow-purple-500/40' },
                    { emoji: '🔥', label: '永久共创者', color: 'from-red-500 to-orange-400', glow: 'shadow-orange-500/40' },
                  ];
                  const badge = badges[profileForm.vipLevel];
                  const expireText = profileForm.vipLevel === 3
                    ? '永久有效'
                    : profileForm.vipExpireTime
                      ? `有效至 ${new Date(profileForm.vipExpireTime).toLocaleDateString('zh-CN')}`
                      : '';
                  return badge ? (
                    <div className="flex flex-col items-center gap-1 mb-3">
                      <div className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r ${badge.color} shadow-lg ${badge.glow} text-white text-sm font-bold`}>
                        <span>{badge.emoji}</span>
                        <span>{badge.label}</span>
                      </div>
                      {expireText && (
                        <span className="text-xs text-slate-400">{expireText}</span>
                      )}
                    </div>
                  ) : null;
                })()}
                
                {/* 职位和公司 */}
                {(profileForm.jobTitle || profileForm.company) && (
                  <Text className="block mb-2 text-lg opacity-90" style={{ color: 'white' }}>
                    {profileForm.jobTitle && <span>{profileForm.jobTitle}</span>}
                    {profileForm.jobTitle && profileForm.company && <span> @ </span>}
                    {profileForm.company && <span>{profileForm.company}</span>}
                  </Text>
                )}
                
                {!isGuest && session?.user?.email && (
                  <Text className="block mb-4 text-base opacity-80" style={{ color: 'white' }}>
                    {session.user.email}
                  </Text>
                )}
                
                {profileForm.bio && (
                  <Paragraph className="mb-6 text-lg opacity-90 max-w-2xl mx-auto" style={{ color: 'white' }}>
                    {profileForm.bio}
                  </Paragraph>
                )}

                {/* 个人信息标签 */}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                  {profileForm.location && (
                    <Tag 
                      icon={<EnvironmentOutlined />} 
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', color: '#ffffff', borderColor: 'rgba(255, 255, 255, 0.25)', padding: '6px 16px', height: 'auto', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                      className="text-base"
                    >
                      {profileForm.location}
                    </Tag>
                  )}
                  {profileForm.github && (
                    <Tag 
                      icon={<GithubOutlined />} 
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', color: '#ffffff', borderColor: 'rgba(255, 255, 255, 0.25)', padding: '6px 16px', height: 'auto', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                      className="text-base cursor-pointer hover:bg-white/25 transition-colors"
                      onClick={() => window.open(`https://github.com/${profileForm.github}`, '_blank')}
                    >
                      {profileForm.github}
                    </Tag>
                  )}
                  {profileForm.website && (
                    <Tag 
                      icon={<GlobalOutlined />} 
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', color: '#ffffff', borderColor: 'rgba(255, 255, 255, 0.25)', padding: '6px 16px', height: 'auto', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                      className="text-base cursor-pointer hover:bg-white/25 transition-colors"
                      onClick={() => window.open(profileForm.website, '_blank')}
                    >
                      个人网站
                    </Tag>
                  )}
                </div>
                
                {/* 技能标签 */}
                {profileForm.skills && profileForm.skills.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {profileForm.skills.map((skill: string, index: number) => {
                      const colors = ['#f5222d','#fa541c','#fa8c16','#faad14','#52c41a','#13c2c2','#1677ff','#722ed1','#eb2f96','#2f54eb','#08979c'];
                      return (
                        <Tag 
                          key={index}
                          style={{ backgroundColor: colors[index % colors.length], color: '#fff', border: 'none' }}
                          className="text-sm px-3 py-1"
                        >
                          {skill}
                        </Tag>
                      );
                    })}
                  </div>
                )}

                {/* 操作按钮 */}
                <Space size="large">
                  {!isGuest ? (
                    <>
                      <Button 
                        type="default"
                        size="large"
                        icon={<EditOutlined />}
                        onClick={() => setEditMode(!editMode)}
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', color: '#ffffff', borderColor: 'rgba(255, 255, 255, 0.25)' }}
                        className="hover:bg-white/25 hover:text-white hover:border-white/40 px-6 py-2 h-auto"
                      >
                        {editMode ? '取消编辑' : '编辑资料'}
                      </Button>
                      <Button 
                        type="default"
                        size="large"
                        icon={<svg viewBox="0 0 24 24" className="w-5 h-5 inline-block" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>}
                        onClick={refreshData}
                        loading={refreshing}
                        style={{ backgroundColor: 'rgba(99, 102, 241, 0.25)', color: '#ffffff', borderColor: 'rgba(99, 102, 241, 0.35)' }}
                        className="hover:bg-indigo-600/30 hover:text-white hover:border-indigo-400/40 px-6 py-2 h-auto"
                      >
                        刷新数据
                      </Button>
                      <Button 
                        danger 
                        size="large"
                        onClick={handleSignOut}
                        style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.35)' }}
                        className="hover:bg-red-600/30 hover:text-red-400 hover:border-red-400/40 px-6 py-2 h-auto"
                      >
                        退出登录
                      </Button>
                    </>
                  ) : (
                    <Button 
                      type="default"
                      size="large"
                      onClick={() => router.push('/auth/login')}
                      className="bg-surface-raised text-brand-primary border-0 hover:bg-surface-page px-8 py-2 h-auto font-semibold"
                    >
                      登录查看真实数据
                    </Button>
                  )}
                </Space>
              </div>
            </div>
          </div>
        </Card>

        {editMode && !isGuest ? (
          /* 编辑模式 - 仅登录用户可用 */
          <Card 
            title={
              <div className="flex items-center text-xl">
                <EditOutlined className="mr-3 text-blue-500" />
                <span>编辑个人资料</span>
              </div>
            }
            className="shadow-lg border-0"
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleFormSubmit}
              initialValues={profileForm}
              className="max-w-2xl mx-auto"
            >
              <Form.Item
                label={<span className="text-base font-semibold">登录用户名 (只能是英文与数字的组合)</span>}
                name="username"
                rules={[
                  { required: true, message: '请输入登录用户名' },
                  { pattern: /^[a-zA-Z0-9]+$/, message: '用户名只能由英文和数字组成' }
                ]}
              >
                <Input 
                  placeholder="请输入您的登录用户名" 
                  size="large"
                  className="rounded-lg font-sans"
                />
              </Form.Item>

              <Form.Item
                label={<span className="text-base font-semibold">显示名称</span>}
                name="name"
                rules={[{ required: true, message: '请输入显示名称' }]}
              >
                <Input 
                  placeholder="请输入您的显示名称" 
                  size="large"
                  className="rounded-lg"
                />
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label={<span className="text-base font-semibold">职位</span>} name="jobTitle">
                    <Input 
                      placeholder="如：全栈工程师" 
                      size="large"
                      className="rounded-lg"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={<span className="text-base font-semibold">公司/学校</span>} name="company">
                    <Input 
                      placeholder="如：某某科技公司" 
                      size="large"
                      className="rounded-lg"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item label={<span className="text-base font-semibold">个人简介</span>} name="bio">
                <Input.TextArea 
                  rows={4} 
                  placeholder="介绍一下自己..." 
                  maxLength={500}
                  showCount
                  className="rounded-lg"
                />
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label={<span className="text-base font-semibold">所在地</span>} name="location">
                    <Input 
                      prefix={<EnvironmentOutlined className="text-gray-400" />}
                      placeholder="如：中国 安徽省 合肥市" 
                      size="large"
                      className="rounded-lg"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={<span className="text-base font-semibold">GitHub</span>} name="github">
                    <Input 
                      prefix={<GithubOutlined className="text-gray-400" />}
                      placeholder="GitHub用户名" 
                      size="large"
                      className="rounded-lg"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item label={<span className="text-base font-semibold">个人网站</span>} name="website">
                <Input 
                  prefix={<GlobalOutlined className="text-gray-400" />}
                  placeholder="https://yourwebsite.com" 
                  size="large"
                  className="rounded-lg"
                />
              </Form.Item>

              <Form.Item 
                label={<span className="text-base font-semibold">技能标签</span>} 
                name="skills"
              >
                <Select
                  mode="tags"
                  size="large"
                  placeholder="输入技能后按回车添加，如：Python、React、Node.js"
                  className="rounded-lg"
                  tokenSeparators={[',']}
                />
              </Form.Item>

              <Form.Item className="mb-0 text-center">
                <Space size="large">
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    loading={saving}
                    size="large"
                    className="bg-gradient-to-r from-[#0C1F3D] to-[#6b7d99] border-0 rounded-lg px-8 py-2 h-auto"
                  >
                    保存更改
                  </Button>
                  <Button 
                    onClick={() => setEditMode(false)}
                    size="large"
                    className="rounded-lg px-8 py-2 h-auto"
                  >
                    取消
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        ) : (
          /* 显示模式 */
          <div className="space-y-8">
            {/* 统计数据网格 - 可点击 */}
            {!statsLoading && stats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card 
                  className={`text-center shadow-lg border-0 bg-gradient-to-br from-[#EDF0F5] to-[#e2e6ed] ${!isGuest ? 'cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105' : ''}`}
                  onClick={() => !isGuest && router.push('/notes')}
                >
                  <div className="p-2">
                    <BookOutlined className="text-2xl text-blue-500 mb-2" />
                    <div className="text-3xl font-bold text-content-muted mb-2">
                      {stats?.notes?.total || 0}
                    </div>
                    <div className="text-sm text-content-secondary">笔记总数</div>
                  </div>
                </Card>
                <Card 
                  className={`text-center shadow-lg border-0 bg-gradient-to-br from-[#EDF0F5] to-[#e2e6ed] ${!isGuest ? 'cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105' : ''}`}
                  onClick={() => !isGuest && router.push('/study')}
                >
                  <div className="p-2">
                    <CalendarOutlined className="text-2xl text-green-500 mb-2" />
                    <div className="text-3xl font-bold text-state-success mb-2">
                      {stats?.learning?.studyDaysTotal || 0}
                    </div>
                    <div className="text-sm text-content-secondary">学习天数</div>
                  </div>
                </Card>
                <Card 
                  className={`text-center shadow-lg border-0 bg-gradient-to-br from-[#EDF0F5] to-[#e2e6ed] ${!isGuest ? 'cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105' : ''}`}
                  onClick={() => !isGuest && router.push('/notes')}
                >
                  <div className="p-2">
                    <HeartOutlined className="text-2xl text-pink-500 mb-2" />
                    <div className="text-3xl font-bold text-pink-600 mb-2">
                      {stats?.engagement?.likesReceived || 0}
                    </div>
                    <div className="text-sm text-content-secondary">获得点赞</div>
                  </div>
                </Card>
                <Card 
                  className={`text-center shadow-lg border-0 bg-gradient-to-br from-[#EDF0F5] to-[#e2e6ed] ${!isGuest ? 'cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105' : ''}`}
                  onClick={() => !isGuest && router.push('/study')}
                >
                  <div className="p-2">
                    <FireOutlined className="text-2xl text-orange-500 mb-2" />
                    <div className="text-3xl font-bold text-orange-600 mb-2">
                      {stats?.learning?.technologiesStudied || 0}
                    </div>
                    <div className="text-sm text-content-secondary">技术栈</div>
                  </div>
                </Card>
              </div>
            )}

            {/* 学习进度 */}
            {!statsLoading && stats && (
              <Card 
                title={
                  <div className="flex items-center text-xl">
                    <BarChartOutlined className="mr-3 text-blue-500" />
                    <span>学习进度</span>
                  </div>
                }
                className="shadow-lg border-0"
              >
                <Row gutter={[48, 32]}>
                  <Col xs={24} md={12}>
                    <div className="text-center p-8 bg-gradient-to-br from-[#EDF0F5] to-[#e2e6ed] rounded-xl">
                      <Progress
                        type="circle"
                        percent={Math.min(100, ((stats?.notes?.public || 0) / Math.max(1, stats?.notes?.total || 1)) * 100)}
                        format={() => `${stats?.notes?.public || 0}/${stats?.notes?.total || 0}`}
                        strokeColor={{
                          '0%': '#52c41a',
                          '100%': '#73d13d',
                        }}
                        size={140}
                      />
                      <p className="mt-4 text-xl font-semibold text-content-primary">公开笔记</p>
                    </div>
                  </Col>
                  <Col xs={24} md={12}>
                    <div className="text-center p-8 bg-gradient-to-br from-[#EDF0F5] to-[#e2e6ed] rounded-xl">
                      <Progress
                        type="circle"
                        percent={Math.min(100, (stats?.learning?.categoriesStudied || 0) * 10)}
                        format={() => `${stats?.learning?.categoriesStudied || 0}`}
                        strokeColor={{
                          '0%': '#1890ff',
                          '100%': '#40a9ff',
                        }}
                        size={140}
                      />
                      <p className="mt-4 text-xl font-semibold text-content-primary">学习领域</p>
                    </div>
                  </Col>
                </Row>

                <Divider />

                <Row gutter={[24, 24]}>
                  <Col xs={24} md={8}>
                    <div className="text-center p-6 bg-gradient-to-br from-[#EDF0F5] to-[#e2e6ed] rounded-lg">
                      <ClockCircleOutlined className="text-3xl text-purple-500 mb-3" />
                      <div className="text-xl font-semibold text-content-primary mb-1">
                        {formatStudyTime(stats?.learning?.totalStudyTime || 0)}
                      </div>
                      <div className="text-sm text-content-muted">总学习时间</div>
                    </div>
                  </Col>
                  <Col xs={24} md={8}>
                    <div 
                      className={`text-center p-6 bg-gradient-to-br from-[#EDF0F5] to-[#e2e6ed] rounded-lg ${!isGuest ? 'cursor-pointer hover:shadow-md transition-all duration-200' : ''}`}
                      onClick={() => !isGuest && router.push('/profile/bookmarks')}
                    >
                      <BookOutlined className="text-3xl text-yellow-500 mb-3" />
                      <div className="text-xl font-semibold text-content-primary mb-1">
                        {stats?.engagement?.bookmarksReceived || 0}
                      </div>
                      <div className="text-sm text-content-muted">我的收藏</div>
                    </div>
                  </Col>
                  <Col xs={24} md={8}>
                    <div className="text-center p-6 bg-gradient-to-br from-[#EDF0F5] to-[#e2e6ed] rounded-lg">
                      <CommentOutlined className="text-3xl text-cyan-500 mb-3" />
                      <div className="text-xl font-semibold text-content-primary mb-1">
                        {stats?.engagement?.commentsReceived || 0}
                      </div>
                      <div className="text-sm text-content-muted">评论数</div>
                    </div>
                  </Col>
                </Row>
              </Card>
            )}

            {/* 学习热力图 */}
            {!heatmapLoading && (
              <Card
                title={
                  <div className="flex items-center text-xl">
                    <FireOutlined className="mr-3 text-orange-500" />
                    <span>学习热力图</span>
                  </div>
                }
                className="shadow-lg border-0"
              >
                <div className="p-6 bg-gradient-to-r from-[#EDF0F5] to-[#e2e6ed] rounded-lg">
                  <LearningHeatmap
                    data={heatmapData}
                    year={new Date().getFullYear()}
                  />
                </div>
              </Card>
            )}
            {/* 成就展示 */}
            {!statsLoading && stats && (
              <Card
                title={
                  <div className="flex items-center text-xl">
                    <TrophyOutlined className="mr-3 text-yellow-500" />
                    <span>成就系统</span>
                  </div>
                }
                className="shadow-lg border-0"
              >
                <div className="mb-8">
                  <div className="text-center py-6">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#a5b4fc] to-[#6b7d99] rounded-full flex items-center justify-center">
                      <TrophyOutlined style={{ fontSize: 40, color: 'white' }} />
                    </div>
                    <div className="text-2xl font-semibold text-content-primary mb-4">
                      {[
                        (stats?.learning?.studyDaysTotal || 0) >= 7,
                        (stats?.notes?.total || 0) >= 10,
                        (stats?.engagement?.likesReceived || 0) >= 50,
                        (stats?.learning?.technologiesStudied || 0) >= 5,
                        (stats?.learning?.totalStudyTime || 0) >= 6000,
                        (stats?.engagement?.commentsReceived || 0) >= 20,
                      ].filter(Boolean).length } / {stats?.achievements?.total || 10}
                    </div>
                    <Progress
                      percent={Math.min(100, ([
                        (stats?.learning?.studyDaysTotal || 0) >= 7,
                        (stats?.notes?.total || 0) >= 10,
                        (stats?.engagement?.likesReceived || 0) >= 50,
                        (stats?.learning?.technologiesStudied || 0) >= 5,
                        (stats?.learning?.totalStudyTime || 0) >= 6000,
                        (stats?.engagement?.commentsReceived || 0) >= 20,
                      ].filter(Boolean).length / Math.max(1, stats?.achievements?.total || 10)) * 100)}
                      strokeColor={{
                        '0%': '#ffd700',
                        '100%': '#ff8c00',
                      }}
                      trailColor="#f0f0f0"
                      size={10}
                      className="mb-4 max-w-md mx-auto"
                    />
                    <Text type="secondary" className="text-lg">已解锁成就</Text>
                  </div>
                </div>

                <Divider />

                {/* 成就列表 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-content-primary mb-4">可获得的成就</h3>

                  {achievements.length > 0 ? (
                    <>
                      <Row gutter={[16, 16]}>
                        {(showAllAch ? achievements : achievements.slice(0, 6)).map((ach) => (
                          <Col xs={24} md={12} key={ach.id}>
                            <AchievementCard achievement={ach} />
                          </Col>
                        ))}
                      </Row>
                      {achievements.length > 6 && (
                        <div className="text-center mt-4">
                          <button
                            onClick={() => setShowAllAch(!showAllAch)}
                            className="px-6 py-2 text-sm font-medium text-content-secondary bg-surface-raised border border-line-strong rounded-lg hover:bg-surface-muted transition-colors"
                          >
                            {showAllAch ? '收起' : `展开全部 (${achievements.length}个)`}
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-8 text-content-muted">
                      暂无成就数据
                    </div>
                  )}
                </div>
              </Card>
            )}

            {/* 最近活动 */}
            {stats?.recentActivity && stats?.recentActivity.length > 0 && (
              <Card 
                title={
                  <div className="flex items-center text-xl">
                    <CalendarOutlined className="mr-3 text-green-500" />
                    <span>最近活动</span>
                  </div>
                }
                className="shadow-lg border-0"
              >
                <Timeline>
                  {stats?.recentActivity?.map((activity: any, index: number) => (
                    <Timeline.Item 
                      key={index}
                      dot={
                        <div className="w-10 h-10 bg-gradient-to-br from-[#3d4f6b] to-[#0C1F3D] rounded-full flex items-center justify-center">
                          <BookOutlined style={{ fontSize: 16, color: 'white' }} />
                        </div>
                      }
                    >
                      <div className="ml-4 pb-4">
                        <p className="mb-2 text-content-primary font-medium text-base">{activity.content}</p>
                        <Text type="secondary" className="text-sm">
                          {new Date(activity.date).toLocaleDateString('zh-CN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </Text>
                      </div>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </Card>
            )}

            {/* 数据可视化图表区域 */}
            {!statsLoading && stats && (
              <>
                <Divider className="my-8">
                  <BarChartOutlined className="mr-2" />
                  数据可视化分析
                </Divider>
                
                <DataVisualization stats={stats} isGuest={isGuest} />
              </>
            )}
          </div>
        )}
      </div>

      {/* 水墨画底部装饰 */}
      <InkWashDecoration variant="bamboo" height={100} className="bg-surface-page mt-8" />
      <InkWashDecoration variant="landscape" height={200} className="bg-surface-page" />
    </div>
  );
} 
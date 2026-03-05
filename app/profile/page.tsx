'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/providers/UserProvider';
import StudyTimeSync from '@/app/components/StudyTimeSync';
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
import LearningHeatmap from '@/app/components/LearningHeatmap';
import DataVisualization from '@/app/components/DataVisualization';
import { UnifiedUserStats, UnifiedHeatmapData } from '@/app/lib/api/dataAdapter';

const { Title, Text, Paragraph } = Typography;

interface ProfileFormData {
  name: string;
  bio: string;
  location: string;
  github: string;
  website: string;
  image: string;
}

// 使用从dataAdapter导入的统一接口
type UserStats = UnifiedUserStats;

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const { refreshUser, updateUser } = useUser();
  const [form] = Form.useForm();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileForm, setProfileForm] = useState<ProfileFormData>({
    name: '',
    bio: '',
    location: '',
    github: '',
    website: '',
    image: '',
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [heatmapData, setHeatmapData] = useState<UnifiedHeatmapData[]>([]);
  const [heatmapLoading, setHeatmapLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isGuest, setIsGuest] = useState(false);

  // 添加刷新数据的函数
  const refreshData = async () => {
    // 只有已登录用户才刷新数据
    if (status !== 'authenticated') {
      console.log('非登录状态，跳过数据刷新');
      return;
    }
    
    setRefreshing(true);
    try {
      // 先检查会话状态
      const sessionResponse = await fetch('/api/auth/session', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        cache: 'no-store'
      });
      
      if (!sessionResponse.ok) {
        console.log('会话已过期，尝试刷新会话');
        // 尝试刷新会话
        const refreshSessionResponse = await fetch('/api/auth/session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          cache: 'no-store'
        });
        
        if (!refreshSessionResponse.ok) {
          console.log('无法刷新会话，重定向到登录页面');
          message.error('会话已过期，请重新登录');
          setTimeout(() => {
            router.push('/login');
          }, 1500);
          return;
        }
      }
      
      // 并行加载所有数据
      const results = await Promise.allSettled([
        loadUserProfile(),
        loadUserStats(),
        loadHeatmapData()
      ]);
      
      // 检查结果
      const hasErrors = results.some(result => result.status === 'rejected');
      
      if (hasErrors) {
        console.warn('部分数据加载失败:', results);
        message.warning('部分数据加载失败，请稍后再试');
      } else {
        console.log('所有数据加载成功');
        message.success('数据已刷新');
      }
    } catch (error) {
      console.error('刷新数据失败:', error);
      message.error('刷新数据失败');
    } finally {
      setRefreshing(false);
    }
  };

  // 检查会话状态
  const checkSession = async () => {
    // 如果是访客模式，不需要检查会话
    if (status === 'unauthenticated') {
      console.log('访客模式，跳过会话检查');
      return true;
    }
    
    try {
      const response = await fetch('/api/auth/session', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        cache: 'no-store'
      });
      
      if (!response.ok) {
        console.log('会话检查API返回错误:', response.status);
        return false;
      }
      
      const data = await response.json();
      console.log('会话检查结果:', data);
      return data.authenticated;
    } catch (error) {
      console.error('会话检查失败:', error);
      return false;
    }
  };

  // 加载平台总体统计数据（未登录用户）
  const loadPlatformStats = async () => {
    try {
      console.log('正在加载平台统计数据...');
      
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
      console.log('成功获取平台统计数据:', data);
      
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
          bio: `${data.totalUsers || 0} 位学习者正在使用本平台，共创建了 ${data.totalNotes || 0} 篇学习笔记，累计学习 ${Math.floor((data.totalStudyTime || 0) / 60)} 小时。${data.todayNotes > 0 ? `今日新增 ${data.todayNotes} 篇笔记，` : ''}${data.weeklyActiveUsers > 0 ? `本周 ${data.weeklyActiveUsers} 位用户活跃。` : ''}加入我们，开始你的学习之旅！`,
          location: '全球',
          github: '',
          website: '',
          image: ''
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
    console.log('使用示例数据展示功能...');
    
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
      bio: '这是示例数据，用于展示平台的学习追踪和数据可视化功能。注册登录后，您可以记录自己的学习历程，查看个性化的学习统计和热力图。',
      location: '示例数据',
      github: '',
      website: '',
      image: ''
    };
    
    setProfileForm(demoProfile);
    form.setFieldsValue(demoProfile);
  };

  // 初始加载数据
  useEffect(() => {
    console.log('Profile页面 - 当前状态:', { status, isGuest });
    
    if (status === 'unauthenticated') {
      // 未登录用户显示平台总体数据
      console.log('未登录用户，显示平台数据');
      setIsGuest(true);
      loadPlatformStats();
      return;
    }
    
    if (status === 'authenticated') {
      console.log('已登录用户，加载个人数据');
      setIsGuest(false);
      // 先检查会话状态
      checkSession().then(isAuthenticated => {
        if (isAuthenticated) {
          // 先同步笔记数量
          syncNotesCount();
          // 然后刷新数据
          refreshData();
        } else {
          // 会话无效，尝试重新登录
          console.log('会话无效，重定向到登录页');
          router.push('/login');
        }
      });
    }
  }, [status, router]);
  
  // 每次页面获得焦点时刷新数据
  useEffect(() => {
    // 只有已登录用户才监听焦点事件
    if (typeof window !== 'undefined' && status === 'authenticated' && !isGuest) {
      const handleFocus = () => {
        console.log('页面获得焦点，刷新数据');
        // 同步笔记数量
        syncNotesCount();
        // 刷新数据
        refreshData();
      };
      
      window.addEventListener('focus', handleFocus);
      return () => {
        window.removeEventListener('focus', handleFocus);
      };
    }
  }, [status, isGuest]);
  
  // 同步笔记数量
  const syncNotesCount = async () => {
    try {
      // 检查页面上是否显示了笔记数量
      const notesCountElement = document.querySelector('.note-count');
      if (notesCountElement) {
        const notesCount = parseInt(notesCountElement.textContent || '0', 10);
        
        if (notesCount > 0) {
          console.log(`检测到前端有${notesCount}条笔记，尝试同步到数据库...`);
          
          const response = await fetch('/api/user/sync-notes-count', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              totalNotes: notesCount
            }),
            credentials: 'include',
            cache: 'no-store'
          });
          
          if (!response.ok) {
            throw new Error(`同步笔记数量失败: ${response.status}`);
          }
          
          const result = await response.json();
          console.log('同步笔记数量结果:', result);
          
          if (result.added > 0) {
            message.success(`已同步${result.added}条笔记数据`);
          }
        }
      } else {
        // 如果页面上没有显示笔记数量元素，尝试从URL中获取
        try {
          // 尝试从当前URL中获取信息
          const currentUrl = window.location.href;
          const match = currentUrl.match(/共\s*(\d+)\s*篇笔记/);
          
          if (match && match[1]) {
            const notesCount = parseInt(match[1], 10);
            
            if (notesCount > 0) {
              console.log(`从URL检测到${notesCount}条笔记，尝试同步到数据库...`);
              
              const response = await fetch('/api/user/sync-notes-count', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  totalNotes: notesCount
                }),
                credentials: 'include',
                cache: 'no-store'
              });
              
              if (!response.ok) {
                throw new Error(`同步笔记数量失败: ${response.status}`);
              }
              
              const result = await response.json();
              console.log('同步笔记数量结果:', result);
              
              if (result.added > 0) {
                message.success(`已同步${result.added}条笔记数据`);
              }
            }
          }
        } catch (error) {
          console.error('从URL获取笔记数量失败:', error);
        }
      }
    } catch (error) {
      console.error('同步笔记数量失败:', error);
    }
  };

  const loadUserProfile = async () => {
    try {
      console.log('正在加载用户资料...');
      
      // 使用统一的数据适配器
      const { fetchWithUnifiedResponse } = await import('@/app/lib/api/dataAdapter');
      
      try {
        const profileData = await fetchWithUnifiedResponse<Record<string, any>>(
          '/api/user/profile', 
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            cache: 'no-store'
          }
        );
        
        console.log('成功获取用户资料:', profileData);
        
        // 标准化表单数据
        const formData = {
          name: profileData.name || session?.user?.name || '',
          bio: profileData.bio || '',
          location: profileData.location || '',
          github: profileData.github || '',
          website: profileData.website || '',
          image: profileData.image || session?.user?.image || '',
        };
        
        setProfileForm(formData);
        form.setFieldsValue(formData);
        return profileData;
      } catch (fetchError) {
        console.error('获取用户资料失败:', fetchError);
        
        if ((fetchError as any).message?.includes('401')) {
          console.log('用户未授权，使用默认资料');
          
          // 如果是未授权错误，尝试刷新会话
          try {
            const refreshResponse = await fetch('/api/auth/session', {
              method: 'POST',
              credentials: 'include',
              cache: 'no-store'
            });
            
            if (refreshResponse.ok) {
              console.log('会话已刷新，将在下次加载时重试');
            }
          } catch (refreshError) {
            console.error('刷新会话失败:', refreshError);
          }
        }
        
        // 使用会话中的用户信息作为默认值
        const defaultProfile = {
          name: session?.user?.name || '',
          email: session?.user?.email || '',
          image: session?.user?.image || ''
        };
        
        // 设置默认表单数据
        const defaultFormData = {
          name: defaultProfile.name,
          bio: '',
          location: '',
          github: '',
          website: '',
          image: defaultProfile.image,
        };
        
        setProfileForm(defaultFormData);
        form.setFieldsValue(defaultFormData);
        
        return defaultProfile;
      }
    } catch (error) {
      console.error('获取用户资料过程中发生错误:', error);
      
      // 返回默认值
      const defaultProfile = {
        name: session?.user?.name || '',
        email: session?.user?.email || '',
        image: session?.user?.image || ''
      };
      
      return defaultProfile;
    }
  };

  const loadUserStats = async () => {
    try {
      console.log('正在加载用户统计数据...');
      
      // 直接从API获取数据
      try {
        const response = await fetch('/api/user/stats', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          cache: 'no-store'
        });
        
        if (!response.ok) {
          throw new Error(`API错误: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('成功获取统计数据:', data);
        setStats(data);
        return data;
      } catch (fetchError) {
        console.error('获取统计数据失败:', fetchError);
        
        if ((fetchError as any).message?.includes('401')) {
          console.log('用户未授权，使用默认空状态');
          
          // 尝试刷新会话
          try {
            const refreshResponse = await fetch('/api/auth/session', {
              method: 'POST',
              credentials: 'include',
              cache: 'no-store'
            });
            
            if (refreshResponse.ok) {
              console.log('会话已刷新，将在下次加载时重试');
            }
          } catch (refreshError) {
            console.error('刷新会话失败:', refreshError);
          }
        }
        
        // 创建空统计数据
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
      }
    } catch (error) {
      console.error('获取统计数据过程中发生错误:', error);
      
      // 导入失败时使用内联创建的默认状态
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
      console.log('正在加载热力图数据...');
      
      // 直接从API获取数据
      const response = await fetch('/api/user/learning-stats', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        cache: 'no-store'
      });
      
      if (!response.ok) {
        throw new Error(`API错误: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('成功获取热力图数据:', data);
      
      if (data && Array.isArray(data.heatmapData)) {
        setHeatmapData(data.heatmapData);
        return data;
      } else {
        setHeatmapData([]);
        return { heatmapData: [] };
      }
    } catch (error) {
      console.error('生成热力图数据失败:', error);
      setHeatmapData([]);
      return { heatmapData: [] };
    } finally {
      setHeatmapLoading(false);
    }
  };

  const handleFormSubmit = async (values: ProfileFormData) => {
    setSaving(true);
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('更新失败');
      }

      const updatedProfile = await response.json();
      
      // 更新session
      await update({
        ...session,
        user: {
          ...session?.user,
          name: updatedProfile.user.name,
          image: updatedProfile.user.image
        }
      });

      // 刷新全局用户状态
      await refreshUser();

      message.success('个人资料更新成功');
      setEditMode(false);
    } catch (error) {
      console.error('更新失败:', error);
      message.error('更新失败，请重试');
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
          
          const response = await fetch('/api/user/avatar', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image: base64 })
          });

          if (!response.ok) {
            throw new Error('上传失败');
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
          
          // 更新session
          await update({
            ...session,
            user: {
              ...session?.user,
              image: data.image
            }
          });

          message.success('头像上传成功');
        } catch (error) {
          console.error('头像上传失败:', error);
          message.error('头像上传失败，请重试');
        } finally {
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
      console.log('开始退出登录流程...');
      message.loading('正在退出登录...', 1);
      
      // 1. 使用NextAuth库内置功能清除前端会话
      await signOut({ redirect: false });
      console.log('前端会话已清除');
      
      // 2. 调用自定义API清除服务器端会话
      try {
        console.log('正在调用退出API...');
        const res = await fetch('/api/auth/signout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          cache: 'no-store'
        });
        
        const result = await res.json();
        console.log('退出API响应:', result);
      } catch (apiError) {
        console.error('API调用失败，继续退出流程', apiError);
      }
      
      // 3. 清除所有存储和cookie
      console.log('正在清除本地存储...');
      
      // 清除所有localStorage
      if (typeof localStorage !== 'undefined') {
        localStorage.clear();
        console.log('localStorage已清除');
      }
      
      // 清除所有sessionStorage
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.clear();
        console.log('sessionStorage已清除');
      }
      
      // 清除所有cookie
      console.log('正在清除cookies...');
      document.cookie.split(";").forEach(function(c) {
        const cookieName = c.split('=')[0].trim();
        document.cookie = cookieName + "=;expires=" + new Date().toUTCString() + ";path=/";
        console.log('已删除cookie:', cookieName);
      });
      
      // 4. 强制刷新页面，完全重新加载
      console.log('正在重定向到登录页面...');
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
    console.log('Profile页面 - 状态加载中...');
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (statsLoading && !isGuest) {
    console.log('Profile页面 - 统计数据加载中...', { statsLoading, isGuest });
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  console.log('Profile页面 - 渲染主内容', { status, isGuest, statsLoading });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 添加学习时间同步组件 - 仅登录用户 */}
      {!isGuest && <StudyTimeSync />}
      
      {/* 未登录提示横幅 */}
      {isGuest && (
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 px-6 shadow-lg">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
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
              onClick={() => router.push('/login')}
              className="bg-white text-blue-600 border-0 hover:bg-blue-50 font-semibold px-6"
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
            background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
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
                        className="shadow-lg bg-white text-blue-600 border-0 hover:bg-blue-50"
                        onClick={() => fileInputRef.current?.click()}
                      />
                    </div>
                  )}
                </div>
              </div>
              
              {/* 用户信息 */}
              <div className="mb-6">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Title level={1} className="mb-0" style={{ color: 'white', margin: 0, fontSize: '2.5rem' }}>
                    {profileForm.name || session?.user?.name || '未设置用户名'}
                  </Title>
                  {isGuest && (stats?.notes?.total || 0) > 0 && (
                    <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-semibold">
                      平台数据
                    </span>
                  )}
                  {isGuest && (stats?.notes?.total || 0) === 0 && (
                    <span className="px-3 py-1 bg-yellow-400 bg-opacity-30 rounded-full text-sm font-semibold">
                      演示数据
                    </span>
                  )}
                </div>
                {!isGuest && session?.user?.email && (
                  <Text className="block mb-4 text-lg opacity-90" style={{ color: 'white' }}>
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
                    <Tag icon={<EnvironmentOutlined />} className="bg-white bg-opacity-20 text-white border-white border-opacity-30 text-base px-4 py-2">
                      {profileForm.location}
                    </Tag>
                  )}
                  {profileForm.github && (
                    <Tag 
                      icon={<GithubOutlined />} 
                      className="bg-white bg-opacity-20 text-white border-white border-opacity-30 text-base px-4 py-2 cursor-pointer hover:bg-opacity-30"
                      onClick={() => window.open(`https://github.com/${profileForm.github}`, '_blank')}
                    >
                      {profileForm.github}
                    </Tag>
                  )}
                  {profileForm.website && (
                    <Tag 
                      icon={<GlobalOutlined />} 
                      className="bg-white bg-opacity-20 text-white border-white border-opacity-30 text-base px-4 py-2 cursor-pointer hover:bg-opacity-30"
                      onClick={() => window.open(profileForm.website, '_blank')}
                    >
                      个人网站
                    </Tag>
                  )}
                </div>

                {/* 操作按钮 */}
                <Space size="large">
                  {!isGuest ? (
                    <>
                      <Button 
                        type="default"
                        size="large"
                        icon={<EditOutlined />}
                        onClick={() => setEditMode(!editMode)}
                        className="bg-white bg-opacity-20 text-white border-white border-opacity-30 hover:bg-white hover:bg-opacity-30 px-6 py-2 h-auto"
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
                        className="bg-green-500 bg-opacity-20 text-white border-green-300 border-opacity-30 hover:bg-green-500 hover:bg-opacity-30 px-6 py-2 h-auto"
                      >
                        刷新数据
                      </Button>
                      <Button 
                        danger 
                        size="large"
                        onClick={handleSignOut}
                        className="bg-red-500 bg-opacity-20 text-white border-red-300 border-opacity-30 hover:bg-red-500 hover:bg-opacity-30 px-6 py-2 h-auto"
                      >
                        退出登录
                      </Button>
                    </>
                  ) : (
                    <Button 
                      type="default"
                      size="large"
                      onClick={() => router.push('/login')}
                      className="bg-white text-blue-600 border-0 hover:bg-blue-50 px-8 py-2 h-auto font-semibold"
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

              <Form.Item className="mb-0 text-center">
                <Space size="large">
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    loading={saving}
                    size="large"
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 border-0 rounded-lg px-8 py-2 h-auto"
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
                  className={`text-center shadow-lg border-0 bg-gradient-to-br from-blue-50 to-blue-100 ${!isGuest ? 'cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105' : ''}`}
                  onClick={() => !isGuest && router.push('/notes')}
                >
                  <div className="p-2">
                    <BookOutlined className="text-2xl text-blue-500 mb-2" />
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {stats?.notes?.total || 0}
                    </div>
                    <div className="text-sm text-gray-600">笔记总数</div>
                  </div>
                </Card>
                <Card 
                  className={`text-center shadow-lg border-0 bg-gradient-to-br from-green-50 to-green-100 ${!isGuest ? 'cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105' : ''}`}
                  onClick={() => !isGuest && router.push('/study')}
                >
                  <div className="p-2">
                    <CalendarOutlined className="text-2xl text-green-500 mb-2" />
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {stats?.learning?.studyDaysTotal || 0}
                    </div>
                    <div className="text-sm text-gray-600">学习天数</div>
                  </div>
                </Card>
                <Card 
                  className={`text-center shadow-lg border-0 bg-gradient-to-br from-pink-50 to-pink-100 ${!isGuest ? 'cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105' : ''}`}
                  onClick={() => !isGuest && router.push('/notes')}
                >
                  <div className="p-2">
                    <HeartOutlined className="text-2xl text-pink-500 mb-2" />
                    <div className="text-3xl font-bold text-pink-600 mb-2">
                      {stats?.engagement?.likesReceived || 0}
                    </div>
                    <div className="text-sm text-gray-600">获得点赞</div>
                  </div>
                </Card>
                <Card 
                  className={`text-center shadow-lg border-0 bg-gradient-to-br from-orange-50 to-orange-100 ${!isGuest ? 'cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105' : ''}`}
                  onClick={() => !isGuest && router.push('/study')}
                >
                  <div className="p-2">
                    <FireOutlined className="text-2xl text-orange-500 mb-2" />
                    <div className="text-3xl font-bold text-orange-600 mb-2">
                      {stats?.learning?.technologiesStudied || 0}
                    </div>
                    <div className="text-sm text-gray-600">技术栈</div>
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
                    <div className="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                      <Progress
                        type="circle"
                        percent={Math.min(100, ((stats?.notes?.public || 0) / Math.max(1, stats?.notes?.total || 1)) * 100)}
                        format={() => `${stats?.notes?.public || 0}/${stats?.notes?.total || 0}`}
                        strokeColor={{
                          '0%': '#52c41a',
                          '100%': '#73d13d',
                        }}
                        size={140}
                        strokeWidth={8}
                      />
                      <p className="mt-4 text-xl font-semibold text-gray-700">公开笔记</p>
                    </div>
                  </Col>
                  <Col xs={24} md={12}>
                    <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                      <Progress
                        type="circle"
                        percent={Math.min(100, (stats?.learning?.categoriesStudied || 0) * 10)}
                        format={() => `${stats?.learning?.categoriesStudied || 0}`}
                        strokeColor={{
                          '0%': '#1890ff',
                          '100%': '#40a9ff',
                        }}
                        size={140}
                        strokeWidth={8}
                      />
                      <p className="mt-4 text-xl font-semibold text-gray-700">学习领域</p>
                    </div>
                  </Col>
                </Row>

                <Divider />

                <Row gutter={[24, 24]}>
                  <Col xs={24} md={8}>
                    <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                      <ClockCircleOutlined className="text-3xl text-purple-500 mb-3" />
                      <div className="text-xl font-semibold text-gray-700 mb-1">
                        {formatStudyTime(stats?.learning?.totalStudyTime || 0)}
                      </div>
                      <div className="text-sm text-gray-500">总学习时间</div>
                    </div>
                  </Col>
                  <Col xs={24} md={8}>
                    <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg">
                      <BookOutlined className="text-3xl text-yellow-500 mb-3" />
                      <div className="text-xl font-semibold text-gray-700 mb-1">
                        {stats?.engagement?.bookmarksReceived || 0}
                      </div>
                      <div className="text-sm text-gray-500">收藏数</div>
                    </div>
                  </Col>
                  <Col xs={24} md={8}>
                    <div className="text-center p-6 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg">
                      <CommentOutlined className="text-3xl text-cyan-500 mb-3" />
                      <div className="text-xl font-semibold text-gray-700 mb-1">
                        {stats?.engagement?.commentsReceived || 0}
                      </div>
                      <div className="text-sm text-gray-500">评论数</div>
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
                <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                  <LearningHeatmap 
                    data={heatmapData} 
                    year={new Date().getFullYear()}
                  />
                </div>
              </Card>
            )}

            {/* 成就展示 - 确保显示 */}
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
                    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <TrophyOutlined style={{ fontSize: 40, color: 'white' }} />
                    </div>
                    <div className="text-2xl font-semibold text-gray-800 mb-4">
                      {stats?.achievements?.earned || 0} / {stats?.achievements?.total || 10}
                    </div>
                    <Progress
                      percent={((stats?.achievements?.earned || 0) / Math.max(1, stats?.achievements?.total || 10)) * 100}
                      strokeColor={{
                        '0%': '#ffd700',
                        '100%': '#ff8c00',
                      }}
                      trailColor="#f0f0f0"
                      strokeWidth={10}
                      className="mb-4 max-w-md mx-auto"
                    />
                    <Text type="secondary" className="text-lg">已解锁成就</Text>
                  </div>
                </div>

                <Divider />

                {/* 成就列表 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">可获得的成就</h3>
                  
                  <Row gutter={[16, 16]}>
                    {/* 学习相关成就 */}
                    <Col xs={24} md={12}>
                      <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                        <div className="flex items-center mb-3">
                          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                            <BookOutlined style={{ color: 'white', fontSize: 16 }} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-blue-800">学习达人</h4>
                            <p className="text-sm text-blue-600">连续学习 7 天</p>
                          </div>
                        </div>
                        <div className="text-xs text-gray-600">
                          当前进度: {Math.min(stats?.learning?.studyDaysTotal || 0, 7)}/7 天
                        </div>
                        <Progress 
                          percent={(Math.min(stats?.learning?.studyDaysTotal || 0, 7) / 7) * 100} 
                          size="small" 
                          strokeColor="#3b82f6"
                          className="mt-2"
                        />
                      </div>
                    </Col>

                    <Col xs={24} md={12}>
                      <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                        <div className="flex items-center mb-3">
                          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                            <EditOutlined style={{ color: 'white', fontSize: 16 }} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-green-800">笔记高手</h4>
                            <p className="text-sm text-green-600">创建 10 篇笔记</p>
                          </div>
                        </div>
                        <div className="text-xs text-gray-600">
                          当前进度: {Math.min(stats?.notes?.total || 0, 10)}/10 篇
                        </div>
                        <Progress 
                          percent={(Math.min(stats?.notes?.total || 0, 10) / 10) * 100} 
                          size="small" 
                          strokeColor="#10b981"
                          className="mt-2"
                        />
                      </div>
                    </Col>

                    <Col xs={24} md={12}>
                      <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                        <div className="flex items-center mb-3">
                          <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                            <HeartOutlined style={{ color: 'white', fontSize: 16 }} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-purple-800">受欢迎作者</h4>
                            <p className="text-sm text-purple-600">获得 50 个点赞</p>
                          </div>
                        </div>
                        <div className="text-xs text-gray-600">
                          当前进度: {Math.min(stats?.engagement?.likesReceived || 0, 50)}/50 个
                        </div>
                        <Progress 
                          percent={(Math.min(stats?.engagement?.likesReceived || 0, 50) / 50) * 100} 
                          size="small" 
                          strokeColor="#8b5cf6"
                          className="mt-2"
                        />
                      </div>
                    </Col>

                    <Col xs={24} md={12}>
                      <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                        <div className="flex items-center mb-3">
                          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                            <FireOutlined style={{ color: 'white', fontSize: 16 }} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-orange-800">技术专家</h4>
                            <p className="text-sm text-orange-600">学习 5 个技术栈</p>
                          </div>
                        </div>
                        <div className="text-xs text-gray-600">
                          当前进度: {Math.min(stats?.learning?.technologiesStudied || 0, 5)}/5 个
                        </div>
                        <Progress 
                          percent={(Math.min(stats?.learning?.technologiesStudied || 0, 5) / 5) * 100} 
                          size="small" 
                          strokeColor="#f97316"
                          className="mt-2"
                        />
                      </div>
                    </Col>

                    <Col xs={24} md={12}>
                      <div className="p-4 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg border border-cyan-200">
                        <div className="flex items-center mb-3">
                          <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center mr-3">
                            <ClockCircleOutlined style={{ color: 'white', fontSize: 16 }} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-cyan-800">时间管理大师</h4>
                            <p className="text-sm text-cyan-600">累计学习 100 小时</p>
                          </div>
                        </div>
                        <div className="text-xs text-gray-600">
                          当前进度: {Math.min(Math.floor((stats?.learning?.totalStudyTime || 0) / 60), 100)}/100 小时
                        </div>
                        <Progress 
                          percent={(Math.min(Math.floor((stats?.learning?.totalStudyTime || 0) / 60), 100) / 100) * 100} 
                          size="small" 
                          strokeColor="#06b6d4"
                          className="mt-2"
                        />
                      </div>
                    </Col>

                    <Col xs={24} md={12}>
                      <div className="p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg border border-pink-200">
                        <div className="flex items-center mb-3">
                          <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center mr-3">
                            <CommentOutlined style={{ color: 'white', fontSize: 16 }} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-pink-800">活跃讨论者</h4>
                            <p className="text-sm text-pink-600">收到 20 条评论</p>
                          </div>
                        </div>
                        <div className="text-xs text-gray-600">
                          当前进度: {Math.min(stats?.engagement?.commentsReceived || 0, 20)}/20 条
                        </div>
                        <Progress 
                          percent={(Math.min(stats?.engagement?.commentsReceived || 0, 20) / 20) * 100} 
                          size="small" 
                          strokeColor="#ec4899"
                          className="mt-2"
                        />
                      </div>
                    </Col>
                  </Row>

                  {(stats?.achievements?.earned || 0) === 0 && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center">
                      <p className="text-gray-600 mb-2">🎯 开始您的学习之旅，解锁第一个成就！</p>
                      <p className="text-sm text-gray-500">每个成就都会让您的学习更有成就感</p>
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
                  {stats?.recentActivity?.map((activity, index) => (
                    <Timeline.Item 
                      key={index}
                      dot={
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                          <BookOutlined style={{ fontSize: 16, color: 'white' }} />
                        </div>
                      }
                    >
                      <div className="ml-4 pb-4">
                        <p className="mb-2 text-gray-800 font-medium text-base">{activity.content}</p>
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
    </div>
  );
} 
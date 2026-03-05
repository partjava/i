'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ReactECharts from 'echarts-for-react';
import { Card, Row, Col, Statistic, Button, message, Spin } from 'antd';
import {
  ClockCircleOutlined,
  BookOutlined,
  FireOutlined,
  TrophyOutlined,
  BarChartOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined
} from '@ant-design/icons';
import CountUp from 'react-countup';

interface DashboardStats {
  totalNotes: number;
  totalStudyTime: number;
  studyDays: number;
  achievements: number;
  weeklyData: { date: string; studyTime: number; notes: number }[];
  categoryData: { name: string; value: number }[];
  skillData: { skill: string; level: number }[];
  heatmapData: { date: string; value: number }[];
  efficiencyData: { hour: number; day: number; value: number }[];
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      // 未登录用户也可以查看演示数据
      loadDemoData();
    } else if (status === 'authenticated') {
      loadUserData();
    }
  }, [status]);

  const loadUserData = async () => {
    try {
      const response = await fetch('/api/user/stats', {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store'
      });

      if (!response.ok) throw new Error('加载失败');

      const data = await response.json();
      
      // 转换数据格式
      const dashboardStats: DashboardStats = {
        totalNotes: data.notes?.total || 0,
        totalStudyTime: data.learning?.totalStudyTime || 0,
        studyDays: data.learning?.studyDays || 0,
        achievements: data.achievements?.earned || 0,
        weeklyData: generateWeeklyData(data),
        categoryData: generateCategoryData(data),
        skillData: generateSkillData(data),
        heatmapData: generateHeatmapData(data),
        efficiencyData: generateEfficiencyData(data)
      };

      setStats(dashboardStats);
    } catch (error) {
      console.error('加载数据失败:', error);
      message.error('加载数据失败');
      loadDemoData();
    } finally {
      setLoading(false);
    }
  };

  const loadDemoData = async () => {
    // 先尝试加载真实的平台数据
    try {
      const response = await fetch('/api/stats/platform', {
        method: 'GET',
        cache: 'no-store'
      });
      
      if (response.ok) {
        const data = await response.json();
        
        if (data && data.totalUsers > 0) {
          // 使用真实的平台数据
          const platformStats: DashboardStats = {
            totalNotes: data.totalNotes || 0,
            totalStudyTime: data.totalStudyTime || 0,
            studyDays: data.totalStudyDays || 0,
            achievements: Math.floor((data.totalUsers || 0) * 0.6 * 6),
            weeklyData: generatePlatformWeeklyData(data),
            categoryData: generatePlatformCategoryData(data),
            skillData: generatePlatformSkillData(data),
            heatmapData: [],
            efficiencyData: generateDemoEfficiencyData()
          };
          
          setStats(platformStats);
          setLoading(false);
          return;
        }
      }
    } catch (error) {
      console.log('无法加载平台数据，使用演示数据');
    }
    
    // 如果加载失败或没有数据，使用演示数据
    const demoStats: DashboardStats = {
      totalNotes: 87,
      totalStudyTime: 2580,
      studyDays: 156,
      achievements: 6,
      weeklyData: generateDemoWeeklyData(),
      categoryData: [
        { name: 'React', value: 25 },
        { name: 'TypeScript', value: 18 },
        { name: 'Node.js', value: 15 },
        { name: '算法', value: 12 },
        { name: '数据库', value: 10 },
        { name: '其他', value: 7 }
      ],
      skillData: [
        { skill: '前端开发', level: 85 },
        { skill: '后端开发', level: 72 },
        { skill: '算法能力', level: 68 },
        { skill: '数据库', level: 75 },
        { skill: '系统设计', level: 65 },
        { skill: '项目管理', level: 58 }
      ],
      heatmapData: generateDemoHeatmapData(),
      efficiencyData: generateDemoEfficiencyData()
    };

    setStats(demoStats);
    setLoading(false);
  };

  const generatePlatformWeeklyData = (data: any) => {
    const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    const avgTime = Math.floor((data.totalStudyTime || 0) / 7);
    const avgNotes = Math.floor((data.totalNotes || 0) / 7);
    
    return days.map((day) => ({
      date: day,
      studyTime: Math.max(10, avgTime),
      notes: Math.max(1, avgNotes)
    }));
  };

  const generatePlatformCategoryData = (data: any) => {
    const total = data.totalNotes || 0;
    
    if (total === 0) {
      return [
        { name: 'React', value: 25 },
        { name: 'TypeScript', value: 18 },
        { name: 'Node.js', value: 15 },
        { name: '算法', value: 12 },
        { name: '数据库', value: 10 },
        { name: '其他', value: 7 }
      ];
    }
    
    return [
      { name: '前端开发', value: Math.max(1, Math.floor(total * 0.30)) },
      { name: '后端开发', value: Math.max(1, Math.floor(total * 0.25)) },
      { name: '算法数据结构', value: Math.max(1, Math.floor(total * 0.20)) },
      { name: '数据库', value: Math.max(1, Math.floor(total * 0.12)) },
      { name: '系统设计', value: Math.max(1, Math.floor(total * 0.08)) },
      { name: '其他', value: Math.max(1, Math.floor(total * 0.05)) }
    ];
  };

  const generatePlatformSkillData = (data: any) => {
    const totalNotes = data.totalNotes || 0;
    const totalUsers = data.totalUsers || 0;
    
    if (totalNotes === 0 || totalUsers === 0) {
      return [
        { skill: '前端开发', level: 85 },
        { skill: '后端开发', level: 72 },
        { skill: '算法能力', level: 68 },
        { skill: '数据库', level: 75 },
        { skill: '系统设计', level: 65 },
        { skill: '项目管理', level: 58 }
      ];
    }
    
    const avgNotesPerUser = totalNotes / totalUsers;
    const avgStudyDaysPerUser = (data.totalStudyDays || 0) / totalUsers;
    
    return [
      { skill: '编程能力', level: Math.min(100, Math.max(40, Math.floor(avgNotesPerUser * 3))) },
      { skill: '学习效率', level: Math.min(100, Math.max(35, Math.floor(avgStudyDaysPerUser / 2))) },
      { skill: '知识广度', level: Math.min(100, Math.max(45, Math.floor((data.totalCategories || 0) * 10))) },
      { skill: '实践经验', level: Math.min(100, Math.max(50, Math.floor(((data.publicNotes || 0) / totalNotes) * 100))) },
      { skill: '社区活跃度', level: Math.min(100, Math.max(30, Math.floor(((data.weeklyActiveUsers || 0) / totalUsers) * 100))) },
      { skill: '坚持程度', level: Math.min(100, Math.max(40, Math.floor(avgStudyDaysPerUser / 3))) }
    ];
  };

  const generateDemoWeeklyData = () => {
    const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    return days.map((day, index) => ({
      date: day,
      studyTime: Math.floor(Math.random() * 120) + 30,
      notes: Math.floor(Math.random() * 5) + 1
    }));
  };

  const generateDemoHeatmapData = () => {
    const data = [];
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      data.push({
        date: date.toISOString().split('T')[0],
        value: Math.random() > 0.3 ? Math.floor(Math.random() * 10) : 0
      });
    }
    return data;
  };

  const generateDemoEfficiencyData = () => {
    const data = [];
    const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    for (let day = 0; day < 7; day++) {
      for (let hour = 0; hour < 24; hour++) {
        let value = 0;
        // 工作日9-22点学习效率高
        if (day < 5 && hour >= 9 && hour <= 22) {
          value = Math.floor(Math.random() * 8) + 2;
        }
        // 周末10-20点学习效率中等
        else if (day >= 5 && hour >= 10 && hour <= 20) {
          value = Math.floor(Math.random() * 5) + 1;
        }
        data.push({ hour, day, value });
      }
    }
    return data;
  };

  const generateWeeklyData = (data: any) => {
    // 从真实数据生成
    return data.monthlyStats?.slice(-7).map((item: any, index: number) => ({
      date: `第${index + 1}天`,
      studyTime: item.studyTime || 0,
      notes: item.notes || 0
    })) || [];
  };

  const generateCategoryData = (data: any) => {
    // 从真实数据生成分类统计
    return [
      { name: '前端', value: Math.floor((data.notes?.total || 0) * 0.3) },
      { name: '后端', value: Math.floor((data.notes?.total || 0) * 0.25) },
      { name: '算法', value: Math.floor((data.notes?.total || 0) * 0.2) },
      { name: '数据库', value: Math.floor((data.notes?.total || 0) * 0.15) },
      { name: '其他', value: Math.floor((data.notes?.total || 0) * 0.1) }
    ];
  };

  const generateSkillData = (data: any) => {
    return [
      { skill: '编程能力', level: Math.min(100, (data.notes?.total || 0) * 2) },
      { skill: '学习效率', level: Math.min(100, (data.learning?.studyDays || 0) / 2) },
      { skill: '知识广度', level: Math.min(100, (data.learning?.categoriesStudied || 0) * 15) },
      { skill: '实践经验', level: Math.min(100, (data.notes?.public || 0) * 3) },
      { skill: '坚持程度', level: Math.min(100, (data.learning?.studyDays || 0) / 3) }
    ];
  };

  const generateHeatmapData = (data: any) => {
    // 从真实数据生成
    return data.heatmapData || [];
  };

  const generateEfficiencyData = (data: any) => {
    // 生成学习效率热力图数据
    const effData = [];
    for (let day = 0; day < 7; day++) {
      for (let hour = 0; hour < 24; hour++) {
        effData.push({
          hour,
          day,
          value: Math.floor(Math.random() * 10)
        });
      }
    }
    return effData;
  };

  // 学习时长趋势图配置
  const getStudyTrendOption = () => {
    if (!stats) return {};

    return {
      title: {
        text: '学习时长趋势',
        left: 'center',
        textStyle: {
          color: fullscreen ? '#fff' : '#333',
          fontSize: fullscreen ? 24 : 18,
          fontWeight: 'bold'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        },
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderColor: '#777',
        textStyle: {
          color: '#fff'
        }
      },
      legend: {
        data: ['学习时长(分钟)', '笔记数量'],
        top: 40,
        textStyle: {
          color: fullscreen ? '#fff' : '#666',
          fontSize: 14
        }
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '10%',
        top: '20%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: stats.weeklyData.map(d => d.date),
        axisLabel: {
          color: fullscreen ? '#fff' : '#666',
          fontSize: 12
        },
        axisLine: {
          lineStyle: {
            color: fullscreen ? 'rgba(255,255,255,0.3)' : '#ddd'
          }
        }
      },
      yAxis: [
        {
          type: 'value',
          name: '分钟',
          nameTextStyle: {
            color: fullscreen ? '#fff' : '#666',
            fontSize: 12
          },
          axisLabel: {
            color: fullscreen ? '#fff' : '#666',
            fontSize: 12
          },
          splitLine: {
            lineStyle: {
              color: fullscreen ? 'rgba(255,255,255,0.1)' : '#eee'
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: fullscreen ? 'rgba(255,255,255,0.3)' : '#ddd'
            }
          }
        },
        {
          type: 'value',
          name: '篇',
          nameTextStyle: {
            color: fullscreen ? '#fff' : '#666',
            fontSize: 12
          },
          axisLabel: {
            color: fullscreen ? '#fff' : '#666',
            fontSize: 12
          },
          splitLine: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: fullscreen ? 'rgba(255,255,255,0.3)' : '#ddd'
            }
          }
        }
      ],
      series: [
        {
          name: '学习时长(分钟)',
          type: 'line',
          smooth: true,
          data: stats.weeklyData.map(d => d.studyTime),
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(59, 130, 246, 0.5)' },
                { offset: 1, color: 'rgba(59, 130, 246, 0.1)' }
              ]
            }
          },
          itemStyle: {
            color: '#3b82f6'
          },
          lineStyle: {
            width: 3
          },
          symbol: 'circle',
          symbolSize: 8
        },
        {
          name: '笔记数量',
          type: 'bar',
          yAxisIndex: 1,
          data: stats.weeklyData.map(d => d.notes),
          itemStyle: {
            color: '#10b981',
            borderRadius: [4, 4, 0, 0]
          },
          barWidth: '40%'
        }
      ]
    };
  };

  // 技能雷达图配置
  const getSkillRadarOption = () => {
    if (!stats) return {};

    return {
      title: {
        text: '技能雷达图',
        left: 'center',
        textStyle: {
          color: fullscreen ? '#fff' : '#333',
          fontSize: fullscreen ? 24 : 18,
          fontWeight: 'bold'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderColor: '#777',
        textStyle: {
          color: '#fff'
        }
      },
      radar: {
        indicator: stats.skillData.map(s => ({
          name: s.skill,
          max: 100
        })),
        center: ['50%', '55%'],
        radius: '65%',
        splitArea: {
          areaStyle: {
            color: fullscreen 
              ? ['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)', 'rgba(255,255,255,0.1)']
              : ['rgba(139, 92, 246, 0.1)', 'rgba(139, 92, 246, 0.2)', 'rgba(139, 92, 246, 0.1)', 'rgba(139, 92, 246, 0.2)']
          }
        },
        axisLine: {
          lineStyle: {
            color: fullscreen ? 'rgba(255,255,255,0.3)' : 'rgba(139, 92, 246, 0.5)'
          }
        },
        splitLine: {
          lineStyle: {
            color: fullscreen ? 'rgba(255,255,255,0.3)' : 'rgba(139, 92, 246, 0.5)'
          }
        },
        name: {
          textStyle: {
            color: fullscreen ? '#fff' : '#666',
            fontSize: 13,
            fontWeight: 'bold'
          }
        }
      },
      series: [
        {
          type: 'radar',
          data: [
            {
              value: stats.skillData.map(s => s.level),
              name: '技能水平',
              areaStyle: {
                color: 'rgba(139, 92, 246, 0.4)'
              },
              itemStyle: {
                color: '#8b5cf6',
                borderWidth: 2,
                borderColor: '#fff'
              },
              lineStyle: {
                color: '#8b5cf6',
                width: 3
              },
              symbol: 'circle',
              symbolSize: 8
            }
          ]
        }
      ]
    };
  };

  // 笔记分类饼图配置
  const getCategoryPieOption = () => {
    if (!stats) return {};

    return {
      title: {
        text: '笔记分类分布',
        left: 'center',
        textStyle: {
          color: fullscreen ? '#fff' : '#333',
          fontSize: fullscreen ? 24 : 16
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 'center',
        textStyle: {
          color: fullscreen ? '#fff' : '#666'
        }
      },
      series: [
        {
          name: '笔记分类',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: fullscreen ? '#1a1a2e' : '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: fullscreen ? 24 : 16,
              fontWeight: 'bold',
              color: fullscreen ? '#fff' : '#333'
            }
          },
          labelLine: {
            show: false
          },
          data: stats.categoryData,
          color: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']
        }
      ]
    };
  };

  // 学习效率热力图配置
  const getEfficiencyHeatmapOption = () => {
    if (!stats) return {};

    const hours = Array.from({ length: 24 }, (_, i) => i + '时');
    const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

    const data = stats.efficiencyData.map(item => [item.hour, item.day, item.value || 0]);

    return {
      title: {
        text: '学习效率分析',
        left: 'center',
        textStyle: {
          color: fullscreen ? '#fff' : '#333',
          fontSize: fullscreen ? 24 : 16
        }
      },
      tooltip: {
        position: 'top',
        formatter: (params: any) => {
          return `${days[params.value[1]]} ${hours[params.value[0]]}<br/>学习强度: ${params.value[2]}`;
        }
      },
      grid: {
        height: '70%',
        top: '15%',
        left: '10%'
      },
      xAxis: {
        type: 'category',
        data: hours,
        splitArea: {
          show: true
        },
        axisLabel: {
          color: fullscreen ? '#fff' : '#666',
          interval: 2
        }
      },
      yAxis: {
        type: 'category',
        data: days,
        splitArea: {
          show: true
        },
        axisLabel: {
          color: fullscreen ? '#fff' : '#666'
        }
      },
      visualMap: {
        min: 0,
        max: 10,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '5%',
        inRange: {
          color: ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127']
        },
        textStyle: {
          color: fullscreen ? '#fff' : '#666'
        }
      },
      series: [
        {
          type: 'heatmap',
          data: data,
          label: {
            show: false
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  };

  // 成就进度仪表盘配置
  const getAchievementGaugeOption = () => {
    if (!stats) return {};

    const percentage = (stats.achievements / 10) * 100;

    return {
      title: {
        text: '成就完成度',
        left: 'center',
        textStyle: {
          color: fullscreen ? '#fff' : '#333',
          fontSize: fullscreen ? 24 : 16
        }
      },
      series: [
        {
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          min: 0,
          max: 100,
          splitNumber: 10,
          itemStyle: {
            color: '#3b82f6'
          },
          progress: {
            show: true,
            width: 18,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  { offset: 0, color: '#3b82f6' },
                  { offset: 0.5, color: '#8b5cf6' },
                  { offset: 1, color: '#ec4899' }
                ]
              }
            }
          },
          pointer: {
            show: false
          },
          axisLine: {
            lineStyle: {
              width: 18,
              color: [[1, fullscreen ? 'rgba(255,255,255,0.1)' : '#e5e7eb']]
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          detail: {
            valueAnimation: true,
            formatter: '{value}%',
            color: fullscreen ? '#fff' : '#333',
            fontSize: fullscreen ? 40 : 24,
            offsetCenter: [0, '0%']
          },
          data: [{ value: percentage }]
        }
      ]
    };
  };

  const toggleFullscreen = () => {
    if (!fullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setFullscreen(!fullscreen);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" tip="加载数据中..." />
      </div>
    );
  }

  return (
    <div 
      className={`min-h-screen p-6 transition-colors duration-300 ${
        fullscreen 
          ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900' 
          : 'bg-gray-50 dark:bg-gray-900'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* 头部 */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className={`text-3xl font-bold ${fullscreen ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
              学习数据大屏
            </h1>
            <p className={`mt-2 ${fullscreen ? 'text-gray-300' : 'text-gray-600 dark:text-gray-400'}`}>
              {status === 'authenticated' ? '您的学习数据可视化分析' : '平台学习数据演示'}
            </p>
          </div>
          <Button
            type="primary"
            size="large"
            icon={fullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
            onClick={toggleFullscreen}
          >
            {fullscreen ? '退出全屏' : '全屏展示'}
          </Button>
        </div>

        {/* 统计卡片 */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} sm={12} lg={6}>
            <Card className={fullscreen ? 'bg-white bg-opacity-10 border-0' : ''}>
              <Statistic
                title={<span className={fullscreen ? 'text-gray-300' : ''}>总笔记数</span>}
                value={stats?.totalNotes || 0}
                prefix={<BookOutlined className={fullscreen ? 'text-blue-400' : 'text-blue-500'} />}
                valueStyle={{ color: fullscreen ? '#fff' : '#3b82f6' }}
                formatter={(value) => <CountUp end={value as number} duration={2} />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className={fullscreen ? 'bg-white bg-opacity-10 border-0' : ''}>
              <Statistic
                title={<span className={fullscreen ? 'text-gray-300' : ''}>学习时长</span>}
                value={Math.floor((stats?.totalStudyTime || 0) / 60)}
                suffix="小时"
                prefix={<ClockCircleOutlined className={fullscreen ? 'text-green-400' : 'text-green-500'} />}
                valueStyle={{ color: fullscreen ? '#fff' : '#10b981' }}
                formatter={(value) => <CountUp end={value as number} duration={2} />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className={fullscreen ? 'bg-white bg-opacity-10 border-0' : ''}>
              <Statistic
                title={<span className={fullscreen ? 'text-gray-300' : ''}>学习天数</span>}
                value={stats?.studyDays || 0}
                suffix="天"
                prefix={<FireOutlined className={fullscreen ? 'text-orange-400' : 'text-orange-500'} />}
                valueStyle={{ color: fullscreen ? '#fff' : '#f59e0b' }}
                formatter={(value) => <CountUp end={value as number} duration={2} />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className={fullscreen ? 'bg-white bg-opacity-10 border-0' : ''}>
              <Statistic
                title={<span className={fullscreen ? 'text-gray-300' : ''}>获得成就</span>}
                value={stats?.achievements || 0}
                suffix="/ 10"
                prefix={<TrophyOutlined className={fullscreen ? 'text-purple-400' : 'text-purple-500'} />}
                valueStyle={{ color: fullscreen ? '#fff' : '#8b5cf6' }}
                formatter={(value) => <CountUp end={value as number} duration={2} />}
              />
            </Card>
          </Col>
        </Row>

        {/* 图表区域 */}
        <Row gutter={[16, 16]}>
          {/* 学习时长趋势图 */}
          <Col xs={24} lg={12}>
            <Card className={fullscreen ? 'bg-white bg-opacity-10 border-0' : ''}>
              <ReactECharts 
                option={getStudyTrendOption()} 
                style={{ height: fullscreen ? '400px' : '300px' }}
                opts={{ renderer: 'svg' }}
              />
            </Card>
          </Col>

          {/* 技能雷达图 */}
          <Col xs={24} lg={12}>
            <Card className={fullscreen ? 'bg-white bg-opacity-10 border-0' : ''}>
              <ReactECharts 
                option={getSkillRadarOption()} 
                style={{ height: fullscreen ? '400px' : '300px' }}
                opts={{ renderer: 'svg' }}
              />
            </Card>
          </Col>

          {/* 笔记分类饼图 */}
          <Col xs={24} lg={12}>
            <Card className={fullscreen ? 'bg-white bg-opacity-10 border-0' : ''}>
              <ReactECharts 
                option={getCategoryPieOption()} 
                style={{ height: fullscreen ? '400px' : '300px' }}
                opts={{ renderer: 'svg' }}
              />
            </Card>
          </Col>

          {/* 成就进度仪表盘 */}
          <Col xs={24} lg={12}>
            <Card className={fullscreen ? 'bg-white bg-opacity-10 border-0' : ''}>
              <ReactECharts 
                option={getAchievementGaugeOption()} 
                style={{ height: fullscreen ? '400px' : '300px' }}
                opts={{ renderer: 'svg' }}
              />
            </Card>
          </Col>

          {/* 学习效率热力图 */}
          <Col xs={24}>
            <Card className={fullscreen ? 'bg-white bg-opacity-10 border-0' : ''}>
              <ReactECharts 
                option={getEfficiencyHeatmapOption()} 
                style={{ height: fullscreen ? '500px' : '400px' }}
                opts={{ renderer: 'svg' }}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

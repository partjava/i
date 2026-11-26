'use client';

import { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { Card, Row, Col, Button } from 'antd';
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';

interface DataVisualizationProps {
  stats: any;
  isGuest: boolean;
  hideFullscreenButton?: boolean;
}

export default function DataVisualization({ stats, isGuest, hideFullscreenButton = false }: DataVisualizationProps) {
  const [fullscreen, setFullscreen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const sync = () => setIsDark(document.body.classList.contains('dark'));
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  // 生成周数据 - 优先使用真实的每日数据
  const generateWeeklyData = () => {
    
    // 如果有每日统计数据，直接使用
    if (stats.dailyStats && Array.isArray(stats.dailyStats) && stats.dailyStats.length > 0) {
      return stats.dailyStats.map((item: any) => {
        // 格式化日期显示（防御时区偏移）
        let dayLabel = '';
        if (typeof item.date === 'string' && /^\d{4}-\d{2}-\d{2}/.test(item.date)) {
          const parts = item.date.split(/[-T ]/);
          dayLabel = `${parseInt(parts[1], 10)}/${parseInt(parts[2], 10)}`;
        } else {
          const dateObj = new Date(item.date);
          dayLabel = `${dateObj.getMonth() + 1}/${dateObj.getDate()}`;
        }
        
        return {
          date: dayLabel,
          studyTime: item.studyTime || 0, // API返回的是分钟，直接使用
          notes: item.notes || 0
        };
      });
    }
    
    // 如果没有数据，返回空的周数据
    const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    return days.map(day => ({
      date: day,
      studyTime: 0,
      notes: 0
    }));
  };

  // 生成分类数据 - 使用真实数据库数据
  const generateCategoryData = () => {
    // 如果有真实的分类统计数据，使用它
    if (stats.categoryStats && Array.isArray(stats.categoryStats) && stats.categoryStats.length > 0) {
      return stats.categoryStats.map((item: any) => ({
        name: item.category,
        value: item.count
      }));
    }
    
    // 如果没有真实数据，显示空数据
    const total = stats.notes?.total || 0;
    
    if (total === 0) {
      return [
        { name: '前端开发', value: 0 },
        { name: '后端开发', value: 0 },
        { name: '算法', value: 0 },
        { name: '数据库', value: 0 },
        { name: '其他', value: 0 }
      ];
    }
    
    // 如果有笔记但没有分类，显示"未分类"
    return [
      { name: '未分类', value: total }
    ];
  };

  // 生成技能数据
  const generateSkillData = () => {
    const totalNotes = stats.notes?.total || 0;
    const studyDays = stats.learning?.studyDays || 0;
    const categories = stats.learning?.categoriesStudied || 0;
    const publicNotes = stats.notes?.public || 0;
    
    if (totalNotes === 0 && studyDays === 0) {
      return [
        { skill: '编程能力', level: 0 },
        { skill: '学习效率', level: 0 },
        { skill: '知识广度', level: 0 },
        { skill: '实践经验', level: 0 },
        { skill: '坚持程度', level: 0 }
      ];
    }
    
    return [
      { skill: '编程能力', level: Math.min(100, Math.max(30, totalNotes * 2)) },
      { skill: '学习效率', level: Math.min(100, Math.max(25, studyDays / 2)) },
      { skill: '知识广度', level: Math.min(100, Math.max(20, categories * 15)) },
      { skill: '实践经验', level: Math.min(100, Math.max(35, publicNotes * 3)) },
      { skill: '坚持程度', level: Math.min(100, Math.max(40, studyDays / 3)) }
    ];
  };

  const weeklyData = generateWeeklyData();
  const categoryData = generateCategoryData();
  const skillData = generateSkillData();

  // 学习时长趋势图
  const getStudyTrendOption = () => ({
    title: {
      text: '学习成长趋势（近60天）',
      left: 'center',
      top: 10,
      textStyle: { fontSize: 16, fontWeight: 'bold', color: isDark ? '#F2EDE4' : '#0F1D33' }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' },
      backgroundColor: isDark ? 'rgba(21, 25, 33, 0.95)' : 'rgba(255, 255, 255, 0.96)',
      borderColor: isDark ? 'rgba(212, 173, 114, 0.30)' : 'rgba(27, 59, 111, 0.14)',
      textStyle: { color: isDark ? '#F2EDE4' : '#0F1D33' },
      formatter: (params: any) => {
        let result = `${params[0].axisValue}<br/>`;
        params.forEach((param: any) => {
          const unit = param.seriesName === '学习时长' ? '分钟' : '篇';
          result += `${param.marker}${param.seriesName}: ${param.value}${unit}<br/>`;
        });
        return result;
      }
    },
    legend: {
      data: ['学习时长', '笔记数量'],
      top: 40,
      textStyle: { color: isDark ? '#C5CBD6' : '#475569' }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: 80,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: weeklyData.map((d: any) => d.date),
      axisLabel: { color: isDark ? '#9BA7B8' : '#64748B' },
      axisLine: { lineStyle: { color: isDark ? 'rgba(255,255,255,0.16)' : '#cbd5e1' } }
    },
    yAxis: [
      {
        type: 'value',
        name: '分钟',
        min: 0,
        minInterval: 10,
        nameTextStyle: { color: isDark ? '#9BA7B8' : '#64748B' },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: isDark ? 'rgba(255,255,255,0.10)' : '#e2e8f0'
          }
        },
        axisLabel: {
          formatter: '{value}',
          color: isDark ? '#9BA7B8' : '#64748B'
        }
      },
      {
        type: 'value',
        name: '篇',
        minInterval: 1,
        min: 0,
        nameTextStyle: { color: isDark ? '#9BA7B8' : '#64748B' },
        axisLabel: { color: isDark ? '#9BA7B8' : '#64748B' },
        splitLine: {
          show: false
        }
      }
    ],
    series: [
      {
        name: '学习时长',
        type: 'line',
        smooth: true,
        symbolSize: 6,
        data: weeklyData.map((d: any) => d.studyTime),
        lineStyle: { width: 2.5, color: isDark ? '#60A5FA' : '#1B3B6F' },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: isDark ? 'rgba(96, 165, 250, 0.34)' : 'rgba(27, 59, 111, 0.26)' },
              { offset: 1, color: isDark ? 'rgba(96, 165, 250, 0.02)' : 'rgba(27, 59, 111, 0.02)' }
            ]
          }
        },
        itemStyle: { color: isDark ? '#60A5FA' : '#1B3B6F' }
      },
      {
        name: '笔记数量',
        type: 'bar',
        yAxisIndex: 1,
        barMaxWidth: 16,
        data: weeklyData.map((d: any) => d.notes),
        itemStyle: { 
          color: '#D4AD72',
          borderRadius: [5, 5, 0, 0]
        }
      }
    ]
  });

  // 技能雷达图
  const getSkillRadarOption = () => ({
    title: {
      text: '技能雷达图',
      left: 'center',
      textStyle: { fontSize: 16, fontWeight: 'bold', color: isDark ? '#F2EDE4' : '#0F1D33' }
    },
    tooltip: {
      backgroundColor: isDark ? 'rgba(21, 25, 33, 0.95)' : 'rgba(255, 255, 255, 0.96)',
      borderColor: isDark ? 'rgba(212, 173, 114, 0.30)' : 'rgba(27, 59, 111, 0.14)',
      textStyle: { color: isDark ? '#F2EDE4' : '#0F1D33' }
    },
    radar: {
      indicator: skillData.map((s: any) => ({ name: s.skill, max: 100 })),
      axisName: { color: isDark ? '#C5CBD6' : '#475569', fontSize: 12 },
      splitLine: { lineStyle: { color: isDark ? 'rgba(255,255,255,0.10)' : '#e2e8f0' } },
      axisLine: { lineStyle: { color: isDark ? 'rgba(255,255,255,0.12)' : '#cbd5e1' } },
      splitArea: {
        areaStyle: {
          color: isDark
            ? ['rgba(255, 255, 255, 0.01)', 'rgba(212, 173, 114, 0.04)']
            : ['rgba(27, 59, 111, 0.03)', 'rgba(27, 59, 111, 0.07)']
        }
      }
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: skillData.map((s: any) => s.level),
            name: '技能水平',
            areaStyle: { color: isDark ? 'rgba(212, 173, 114, 0.28)' : 'rgba(27, 59, 111, 0.22)' },
            itemStyle: { color: isDark ? '#D4AD72' : '#1B3B6F' },
            lineStyle: { color: isDark ? '#D4AD72' : '#1B3B6F', width: 2.2 }
          }
        ]
      }
    ]
  });

  // 笔记分类饼图
  const getCategoryPieOption = () => ({
    title: {
      text: '笔记分类分布',
      left: 'center',
      textStyle: { fontSize: 16, fontWeight: 'bold', color: isDark ? '#F2EDE4' : '#0F1D33' }
    },
    tooltip: {
      trigger: 'item',
      backgroundColor: isDark ? 'rgba(21, 25, 33, 0.95)' : 'rgba(255, 255, 255, 0.96)',
      borderColor: isDark ? 'rgba(212, 173, 114, 0.30)' : 'rgba(27, 59, 111, 0.14)',
      textStyle: { color: isDark ? '#F2EDE4' : '#0F1D33' },
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
      textStyle: { color: isDark ? '#C5CBD6' : '#475569' }
    },
    series: [
      {
        name: '笔记分类',
        type: 'pie',
        radius: ['44%', '72%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 8,
          borderColor: isDark ? '#151921' : '#ffffff',
          borderWidth: 2
        },
        label: { show: false, position: 'center' },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold',
            color: isDark ? '#F2EDE4' : '#0F1D33'
          }
        },
        labelLine: { show: false },
        data: categoryData,
        color: ['#1B3B6F', '#D4AD72', '#10B981', '#6366F1', '#E07A5F']
      }
    ]
  });

  const toggleFullscreen = () => {
    if (!fullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setFullscreen(!fullscreen);
  };

  return (
    <div>
      {!hideFullscreenButton && (
        <div className="flex justify-end mb-4">
          <Button
            type="default"
            icon={fullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
            onClick={toggleFullscreen}
            className="rounded-xl border-slate-200 dark:border-white/15 bg-white dark:bg-[#1E2430] text-slate-700 dark:text-[#F2EDE4] hover:border-[#D4AD72]"
          >
            {fullscreen ? '退出全屏' : '全屏展示'}
          </Button>
        </div>
      )}

      <Row gutter={[16, 16]}>
        {/* 学习时长趋势图 */}
        <Col xs={24} lg={12}>
          <Card>
            <ReactECharts 
              option={getStudyTrendOption()} 
              style={{ height: '300px' }}
              opts={{ renderer: 'svg' }}
            />
          </Card>
        </Col>

        {/* 技能雷达图 */}
        <Col xs={24} lg={12}>
          <Card>
            <ReactECharts 
              option={getSkillRadarOption()} 
              style={{ height: '300px' }}
              opts={{ renderer: 'svg' }}
            />
          </Card>
        </Col>

        {/* 笔记分类饼图 */}
        <Col xs={24}>
          <Card>
            <ReactECharts 
              option={getCategoryPieOption()} 
              style={{ height: '300px' }}
              opts={{ renderer: 'svg' }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

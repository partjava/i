'use client';

import { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { Card, Row, Col, Button } from 'antd';
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';

interface DataVisualizationProps {
  stats: any;
  isGuest: boolean;
}

export default function DataVisualization({ stats, isGuest }: DataVisualizationProps) {
  const [fullscreen, setFullscreen] = useState(false);

  // 生成周数据 - 优先使用真实的每日数据
  const generateWeeklyData = () => {
    console.log('生成周数据，stats.dailyStats:', stats.dailyStats);
    
    // 如果有每日统计数据，直接使用
    if (stats.dailyStats && Array.isArray(stats.dailyStats) && stats.dailyStats.length > 0) {
      console.log('使用真实的每日数据:', stats.dailyStats.length, '条');
      return stats.dailyStats.map((item: any) => {
        // 格式化日期显示
        const dateObj = new Date(item.date);
        const dayLabel = `${dateObj.getMonth() + 1}/${dateObj.getDate()}`;
        
        return {
          date: dayLabel,
          studyTime: item.studyTime || 0, // API返回的是分钟，直接使用
          notes: item.notes || 0
        };
      });
    }
    
    console.log('没有每日数据，返回空数据');
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
      textStyle: { fontSize: 16, fontWeight: 'bold' }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' },
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
      top: 40
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
      data: weeklyData.map((d: any) => d.date)
    },
    yAxis: [
      {
        type: 'value',
        name: '分钟',
        min: 0,
        minInterval: 10,
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed'
          }
        },
        axisLabel: {
          formatter: '{value}'
        }
      },
      {
        type: 'value',
        name: '篇',
        minInterval: 1,
        min: 0,
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
        data: weeklyData.map((d: any) => d.studyTime),
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(59, 130, 246, 0.5)' },
              { offset: 1, color: 'rgba(59, 130, 246, 0.1)' }
            ]
          }
        },
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: '笔记数量',
        type: 'bar',
        yAxisIndex: 1,
        data: weeklyData.map((d: any) => d.notes),
        itemStyle: { color: '#10b981' }
      }
    ]
  });

  // 技能雷达图
  const getSkillRadarOption = () => ({
    title: {
      text: '技能雷达图',
      left: 'center',
      textStyle: { fontSize: 16 }
    },
    tooltip: {},
    radar: {
      indicator: skillData.map((s: any) => ({ name: s.skill, max: 100 })),
      splitArea: {
        areaStyle: {
          color: ['rgba(114, 172, 209, 0.2)', 'rgba(114, 172, 209, 0.4)']
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
            areaStyle: { color: 'rgba(139, 92, 246, 0.3)' },
            itemStyle: { color: '#8b5cf6' },
            lineStyle: { color: '#8b5cf6', width: 2 }
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
      textStyle: { fontSize: 16 }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center'
    },
    series: [
      {
        name: '笔记分类',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: { show: false, position: 'center' },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold'
          }
        },
        labelLine: { show: false },
        data: categoryData,
        color: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
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
    <div className="mt-8">
      <div className="flex justify-end mb-4">
        <Button
          type="primary"
          icon={fullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
          onClick={toggleFullscreen}
        >
          {fullscreen ? '退出全屏' : '全屏展示'}
        </Button>
      </div>

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

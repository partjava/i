'use client';

import { HeatmapData } from '@/app/types/achievement';
import { useMemo } from 'react';

interface LearningHeatmapProps {
  data: HeatmapData[];
  year?: number;
}

export default function LearningHeatmap({ data, year }: LearningHeatmapProps) {
  // 自动检测数据中的年份，如果没有数据则使用当前年份
  const detectedYear = year || (data.length > 0 ? new Date(data[0].date).getFullYear() : new Date().getFullYear());
  const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  
  // 生成一年的日期格子
  const yearData = useMemo(() => {
    const startDate = new Date(detectedYear, 0, 1);
    const endDate = new Date(detectedYear, 11, 31);
    const days = [];
    
    // 补充开始的空白格子
    const startDay = startDate.getDay();
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    
    // 生成全年日期
    const current = new Date(startDate);
    while (current <= endDate) {
      const dateStr = current.toISOString().split('T')[0];
      const dayData = data.find(d => d.date === dateStr);
      days.push({
        date: dateStr,
        count: dayData?.count || 0,
        level: dayData?.level || 0
      });
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  }, [data, detectedYear]);
  
  // 获取颜色类
  const getLevelColor = (level: number) => {
    const colors = [
      'bg-gray-100',
      'bg-green-200',
      'bg-green-300',
      'bg-green-400',
      'bg-green-500'
    ];
    return colors[level] || colors[0];
  };
  
  // 计算周数
  const weeks = Math.ceil(yearData.length / 7);
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">学习热力图</h3>
        <p className="text-sm text-gray-500 mt-1">{detectedYear}年学习记录</p>
      </div>
      
      <div className="overflow-x-auto">
        <div className="inline-block">
          {/* 月份标签 */}
          <div className="flex mb-1">
            <div className="w-7"></div>
            {months.map((month, index) => (
              <div
                key={month}
                className="text-xs text-gray-600"
                style={{ width: `${(weeks / 12) * 14}px` }}
              >
                {month}
              </div>
            ))}
          </div>
          
          <div className="flex">
            {/* 星期标签 */}
            <div className="flex flex-col mr-1">
              {weekDays.map((day, index) => (
                <div
                  key={day}
                  className="text-xs text-gray-600 h-3 flex items-center justify-end pr-1"
                  style={{ visibility: index % 2 === 0 ? 'visible' : 'hidden' }}
                >
                  {day}
                </div>
              ))}
            </div>
            
            {/* 热力图格子 */}
            <div className="grid grid-flow-col gap-1" style={{ gridTemplateRows: 'repeat(7, 1fr)' }}>
              {yearData.map((day, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-sm ${
                    day ? getLevelColor(day.level) : ''
                  } ${day ? 'cursor-pointer hover:ring-1 hover:ring-gray-400' : ''}`}
                  title={day ? `${day.date}: ${day.count}次学习` : ''}
                />
              ))}
            </div>
          </div>
          
          {/* 图例 */}
          <div className="flex items-center gap-2 mt-4 text-xs text-gray-600">
            <span>少</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map(level => (
                <div
                  key={level}
                  className={`w-3 h-3 rounded-sm ${getLevelColor(level)}`}
                />
              ))}
            </div>
            <span>多</span>
          </div>
        </div>
      </div>
    </div>
  );
} 
'use client';

import { HeatmapData } from '@shared/types/achievement';
import { useMemo, useState } from 'react';

interface LearningHeatmapProps {
  data: HeatmapData[];
  year?: number;
  hideTitle?: boolean;
}

export default function LearningHeatmap({ data, year, hideTitle = false }: LearningHeatmapProps) {
  // 自动检测数据中的年份，如果没有数据则使用当前年份
  const detectedYear = year || (data.length > 0 ? new Date(data[0].date).getFullYear() : new Date().getFullYear());
  const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

  // 用户点击或选中的具体格子详情
  const [selectedDay, setSelectedDay] = useState<{
    date: string;
    count: number;
    level: number;
    duration: number;
  } | null>(null);

  // 格式化学习总时长展示
  const formatDurationText = (seconds?: number) => {
    if (!seconds || seconds <= 0) return '0 分钟';
    const totalMinutes = Math.floor(seconds / 60);
    if (totalMinutes < 1) {
      return `${seconds} 秒`;
    }
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    if (hours === 0) {
      return `${mins} 分钟`;
    }
    if (mins === 0) {
      return `${hours} 小时`;
    }
    return `${hours} 小时 ${mins} 分钟`;
  };

  // 格式化日期全称
  const formatDateLabel = (dateStr: string) => {
    try {
      const [y, m, d] = dateStr.split('-').map(Number);
      const dateObj = new Date(y, m - 1, d);
      const weekMap = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
      return `${y}年${m}月${d}日 ${weekMap[dateObj.getDay()] || ''}`;
    } catch {
      return dateStr;
    }
  };
  
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
    
    // 创建日期映射以提高查找效率
    const dataMap = new Map();
    data.forEach(d => {
      if (d && d.date) {
        // 标准化日期格式
        const normalizedDate = d.date.split('T')[0];
        dataMap.set(normalizedDate, d);
      }
    });
    
    // 生成全年日期
    const current = new Date(startDate);
    while (current <= endDate) {
      const dateStr = current.toISOString().split('T')[0];
      const dayData = dataMap.get(dateStr);
      
      days.push({
        date: dateStr,
        count: dayData?.count || 0,
        level: dayData?.level || 0,
        duration: dayData?.duration || 0,
      });
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  }, [data, detectedYear]);
  
  // 获取颜色类
  const getLevelColor = (level: number) => {
    const colors = [
      'bg-gray-100',   // 0: 无学习
      'bg-green-300',  // 1: 少量
      'bg-green-400',  // 2: 中等
      'bg-green-500',  // 3: 较多
      'bg-green-700',  // 4: 大量
    ];
    return colors[level] || colors[0];
  };
  
  // 计算周数
  const weeks = Math.ceil(yearData.length / 7);
  
  // 计算每个月的起始周位置
  const monthPositions = useMemo(() => {
    const positions: { month: string; left: number }[] = [];
    const startDate = new Date(detectedYear, 0, 1);
    const startDay = startDate.getDay();
    
    for (let month = 0; month < 12; month++) {
      const monthStart = new Date(detectedYear, month, 1);
      const daysSinceYearStart = Math.floor((monthStart.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      const totalDays = daysSinceYearStart + startDay;
      const weekIndex = Math.floor(totalDays / 7);
      // 每周宽度 = 16px (格子3px + 间隔1px = 4px per day, 4px * 4 = 16px per week)
      const left = weekIndex * 16 + 8; // 往右偏移8px
      positions.push({ month: months[month], left });
    }
    
    return positions;
  }, [detectedYear, months]);
  
  return (
    <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm">
      {!hideTitle ? (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">学习热力图</h3>
          <p className="text-xs text-gray-500 mt-0.5">{detectedYear}年学习记录（点击方块可查看当日学习频次与时长）</p>
        </div>
      ) : (
        <div className="mb-3 flex items-center justify-between text-xs text-gray-500 font-medium">
          <span>{detectedYear} 年全年度打卡热力</span>
          <span>共记录 {yearData.filter(d => d && d.count > 0).length} 天有效打卡</span>
        </div>
      )}
      
      <div className="overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
        <div className="inline-block min-w-full">
          {/* 月份标签 */}
          <div className="flex mb-2 relative" style={{ height: '20px', paddingLeft: '28px' }}>
            {monthPositions.map((pos, index) => (
              <div
                key={pos.month}
                className="text-xs text-gray-600 absolute whitespace-nowrap"
                style={{ left: `${pos.left}px` }}
              >
                {pos.month}
              </div>
            ))}
          </div>
          
          <div className="flex">
            {/* 星期标签 */}
            <div className="flex flex-col mr-2">
              {weekDays.map((day, index) => (
                <div
                  key={day}
                  className="text-xs text-gray-600 flex items-center justify-end pr-1"
                  style={{ 
                    height: '12px',
                    visibility: index % 2 === 0 ? 'visible' : 'hidden' 
                  }}
                >
                  {day}
                </div>
              ))}
            </div>
            
            {/* 热力图格子 */}
            <div className="grid grid-flow-col gap-1" style={{ gridTemplateRows: 'repeat(7, 1fr)' }}>
              {yearData.map((day, index) => {
                const isSelected = selectedDay && day && selectedDay.date === day.date;
                return (
                  <div
                    key={index}
                    onClick={() => {
                      if (day) {
                        setSelectedDay(day);
                      }
                    }}
                    className={`w-3 h-3 rounded-sm transition-all duration-150 ${
                      day ? getLevelColor(day.level) : ''
                    } ${
                      day
                        ? 'cursor-pointer hover:scale-125 hover:ring-2 hover:ring-emerald-400 hover:z-20'
                        : ''
                    } ${
                      isSelected
                        ? 'ring-2 ring-emerald-600 scale-125 z-20 shadow-xs'
                        : ''
                    }`}
                    title={
                      day
                        ? `${formatDateLabel(day.date)}: 学习 ${day.count} 次 · 学习时长 ${formatDurationText(day.duration)}`
                        : ''
                    }
                  />
                );
              })}
            </div>
          </div>
          
          {/* 图例与引导说明 */}
          <div className="flex items-center justify-between flex-wrap gap-2 mt-4 text-xs text-gray-600">
            <div className="flex items-center gap-2">
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

            <span className="text-[11px] text-gray-400">
              💡 提示：点击任意方块可固定查看该日打卡次数与累计时长
            </span>
          </div>

          {/* 选中的日期详情横幅（点击任意方块实时弹出展示：学习频次 + 学习时长） */}
          {selectedDay && (
            <div className="mt-3.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-50 via-teal-50/50 to-sky-50/70 border border-emerald-200/90 shadow-xs flex items-center justify-between flex-wrap gap-2 animate-fadeIn">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-700 flex items-center justify-center text-sm font-bold shrink-0">
                  📅
                </span>
                <div>
                  <div className="text-xs font-bold text-slate-800 flex items-center gap-2">
                    <span>{formatDateLabel(selectedDay.date)}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold ${
                        selectedDay.count > 0
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {selectedDay.count > 0 ? '✓ 已打卡' : '未打卡'}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5 flex items-center gap-3 font-mono">
                    <span>
                      学习频次:{' '}
                      <strong className="text-emerald-700 font-bold">
                        {selectedDay.count}
                      </strong>{' '}
                      次
                    </span>
                    <span>·</span>
                    <span>
                      学习时长:{' '}
                      <strong className="text-sky-700 font-bold">
                        {formatDurationText(selectedDay.duration)}
                      </strong>
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedDay(null)}
                className="text-[11px] text-slate-400 hover:text-slate-600 transition"
              >
                ✕ 关闭
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
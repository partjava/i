'use client';

import React, { useEffect } from 'react';
import { useStudyTimer } from '../hooks/useStudyTimer';
import { Card, Button, Statistic, Progress } from 'antd';
import { ClockCircleOutlined, PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons';

interface StudyTimeTrackerProps {
  category?: string;
  technology?: string;
  autoStart?: boolean;
  showControls?: boolean;
  className?: string;
  variant?: 'card' | 'compact' | 'hud';
}

/**
 * 学习时间追踪组件
 * 自动记录用户在页面上的学习时间，支持卡片式与紧凑 HUD 式呈现
 */
export default function StudyTimeTracker({
  category = '',
  technology = '',
  autoStart = true,
  showControls = true,
  className = '',
  variant = 'card'
}: StudyTimeTrackerProps) {
  const {
    isActive,
    minutes,
    seconds,
    hours,
    totalSeconds,
    formattedTime,
    start,
    pause,
    recordStudyTime
  } = useStudyTimer({
    autoStart,
    category,
    technology
  });

  // 计算进度条
  const progressPercent = (seconds / 60) * 100;
  
  // 实时记录学习时间
  useEffect(() => {
    // 将当前总秒数保存到window对象，便于其他组件访问
    if (typeof window !== 'undefined') {
      (window as any).studyTimeSeconds = totalSeconds;
      (window as any).studyTimeMinutes = minutes + hours * 60;
    }
    
    // 每分钟记录一次学习时间（当秒数为0时）
    if (seconds === 0 && isActive && (minutes > 0 || hours > 0)) {
      recordStudyTime();
    }
  }, [minutes, seconds, hours, totalSeconds, isActive, recordStudyTime]);

  if (variant === 'hud' || variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-indigo-500/30 text-xs shadow-lg backdrop-blur-md ${className}`}>
        <div className="flex items-center gap-1.5 text-slate-300">
          <ClockCircleOutlined className="text-sky-400" />
          <span className="font-semibold text-slate-300 text-xs hidden sm:inline">伴学专注</span>
        </div>
        <div className="font-mono text-sky-300 font-bold tracking-wider text-xs sm:text-sm bg-black/50 px-2 py-0.5 rounded-lg border border-sky-500/25">
          {formattedTime}
        </div>
        {showControls && (
          <button
            type="button"
            onClick={isActive ? pause : start}
            className={`px-2 py-0.5 rounded-lg text-[11px] font-medium transition-all flex items-center gap-1 border ${
              isActive
                ? 'bg-amber-500/15 text-amber-300 border-amber-500/30 hover:bg-amber-500/25'
                : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/25'
            }`}
          >
            {isActive ? (
              <>
                <PauseCircleOutlined />
                <span>暂停</span>
              </>
            ) : (
              <>
                <PlayCircleOutlined />
                <span>继续</span>
              </>
            )}
          </button>
        )}
        <span className="relative flex h-2 w-2 ml-0.5" title={isActive ? '计时中' : '已暂停'}>
          {isActive && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          )}
          <span className={`relative inline-flex rounded-full h-2 w-2 ${isActive ? 'bg-emerald-500' : 'bg-slate-500'}`}></span>
        </span>
      </div>
    );
  }

  return (
    <Card 
      className={`shadow-lg border-indigo-500/20 bg-slate-900/80 backdrop-blur-md rounded-2xl ${className}`}
      title={
        <div className="flex items-center justify-between text-slate-200">
          <div className="flex items-center">
            <ClockCircleOutlined className="mr-2 text-sky-400" />
            <span className="font-bold text-sm">学习时间追踪</span>
          </div>
          <span className="relative flex h-2 w-2">
            {isActive && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            )}
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isActive ? 'bg-emerald-500' : 'bg-slate-500'}`}></span>
          </span>
        </div>
      }
      size="small"
    >
      <div className="text-center">
        <div className="font-mono text-2xl font-bold tracking-wider my-2 text-sky-400 bg-slate-950/70 py-2 rounded-xl border border-indigo-500/20 shadow-inner">
          {formattedTime}
        </div>
        
        <Progress 
          percent={progressPercent} 
          showInfo={false} 
          status={isActive ? "active" : "normal"}
          strokeColor={{
            '0%': '#38bdf8',
            '100%': '#6366f1',
          }}
          className="mb-3"
        />
        
        {showControls && (
          <div className="flex justify-center space-x-2">
            {isActive ? (
              <Button 
                type="primary" 
                danger
                icon={<PauseCircleOutlined />} 
                onClick={pause}
                shape="round"
                size="small"
              >
                暂停
              </Button>
            ) : (
              <Button 
                type="primary" 
                icon={<PlayCircleOutlined />} 
                onClick={start}
                shape="round"
                size="small"
              >
                继续
              </Button>
            )}
          </div>
        )}
        
        <div className="mt-2 text-xs text-slate-400">
          {isActive ? '正在记录专注时间...' : '学习时间已暂停'}
        </div>
      </div>
    </Card>
  );
}

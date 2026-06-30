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
}

/**
 * 学习时间追踪组件
 * 自动记录用户在页面上的学习时间
 */
export default function StudyTimeTracker({
  category = '',
  technology = '',
  autoStart = true,
  showControls = true,
  className = ''
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
  }, [minutes, seconds, hours, totalSeconds, isActive]);

  return (
    <Card 
      className={`shadow-sm ${className}`}
      title={
        <div className="flex items-center">
          <ClockCircleOutlined className="mr-2 text-blue-500" />
          <span>学习时间追踪</span>
        </div>
      }
      size="small"
    >
      <div className="text-center">
        <Statistic 
          value={formattedTime} 
          className="mb-2 timer-display"
          valueStyle={{ color: isActive ? '#1890ff' : '#999' }}
          data-study-time={minutes + hours * 60}
          data-study-seconds={totalSeconds}
        />
        
        <Progress 
          percent={progressPercent} 
          showInfo={false} 
          status={isActive ? "active" : "normal"}
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
          }}
          className="mb-3"
        />
        
        {showControls && (
          <div className="flex justify-center space-x-2">
            {isActive ? (
              <Button 
                type="primary" 
                icon={<PauseCircleOutlined />} 
                onClick={pause}
                shape="round"
              >
                暂停
              </Button>
            ) : (
              <Button 
                type="primary" 
                icon={<PlayCircleOutlined />} 
                onClick={start}
                shape="round"
              >
                继续
              </Button>
            )}
          </div>
        )}
        
        <div className="mt-2 text-xs text-gray-500">
          {isActive ? '正在记录学习时间...' : '学习时间已暂停'}
        </div>
      </div>
    </Card>
  );
}


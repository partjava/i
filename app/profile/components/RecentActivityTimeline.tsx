'use client';

import React from 'react';
import { Card, Timeline, Typography } from 'antd';
import { CalendarOutlined, BookOutlined } from '@ant-design/icons';

const { Text } = Typography;

export interface RecentActivity {
  id?: string | number;
  content: string;
  date: string;
}

export interface RecentActivityTimelineProps {
  activities: RecentActivity[] | undefined;
}

/**
 * 最近活动时间线卡片
 * （从 profile/page.tsx 抽出，样式与行为保持不变）
 */
export default function RecentActivityTimeline({ activities }: RecentActivityTimelineProps) {
  return (
    <Card
      title={
        <div className="flex items-center text-xl">
          <CalendarOutlined className="mr-3 text-green-500" />
          <span>最近活动</span>
        </div>
      }
      className="shadow-lg border-0"
    >
      {(!activities || activities.length === 0) && (
        <div className="py-8 text-center text-content-muted">暂无活动记录，创建笔记或完成学习后会显示在这里。</div>
      )}
      <Timeline>
        {activities?.map((activity, index: number) => (
          <Timeline.Item
            key={activity.id || index}
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
  );
}

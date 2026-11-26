'use client';

import React from 'react';
import { Card, Timeline, Typography } from 'antd';
import { CalendarOutlined, BookOutlined, ThunderboltOutlined } from '@ant-design/icons';

const { Text } = Typography;

export interface RecentActivity {
  id?: string | number;
  type?: string;
  title?: string;
  content: string;
  date: string;
}

export interface RecentActivityTimelineProps {
  activities: RecentActivity[] | undefined;
}

/**
 * 最近活动时间线卡片（按类型区分徽章色彩与图标，全量适配浅/深双模式）
 */
export default function RecentActivityTimeline({ activities }: RecentActivityTimelineProps) {
  return (
    <Card
      title={
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center text-lg font-semibold">
            <CalendarOutlined className="mr-2.5 text-emerald-500" />
            <span>最近活动</span>
          </div>
          {activities && activities.length > 0 && (
            <span className="text-xs font-normal text-slate-500 dark:text-slate-400 tabular-nums">
              近 {activities.length} 条足迹
            </span>
          )}
        </div>
      }
      className="border-0"
    >
      {(!activities || activities.length === 0) && (
        <div className="py-10 text-center text-sm text-slate-500 dark:text-slate-400">
          暂无活动记录，创建笔记或完成学习后会显示在这里。
        </div>
      )}
      <Timeline className="pt-2">
        {activities?.map((activity, index: number) => {
          const isStudy = activity.type === 'study';
          return (
            <Timeline.Item
              key={activity.id || index}
              dot={
                <div
                  className={`w-8 h-8 rounded-xl border flex items-center justify-center shadow-xs ${
                    isStudy
                      ? 'bg-emerald-500/12 border-emerald-500/25 text-emerald-600 dark:text-emerald-300'
                      : 'bg-[#1B3B6F]/10 border-[#1B3B6F]/20 text-[#1B3B6F] dark:bg-[#D4AD72]/15 dark:border-[#D4AD72]/30 dark:text-[#E8CA96]'
                  }`}
                >
                  {isStudy ? <ThunderboltOutlined style={{ fontSize: 14 }} /> : <BookOutlined style={{ fontSize: 14 }} />}
                </div>
              }
            >
              <div className="ml-3 mb-2 px-4 py-3 rounded-xl bg-slate-50/80 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/[0.07] hover:border-[#D4AD72]/40 transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                        isStudy
                          ? 'bg-emerald-500/12 text-emerald-700 dark:text-emerald-300'
                          : 'bg-[#1B3B6F]/10 text-[#1B3B6F] dark:bg-[#D4AD72]/15 dark:text-[#E8CA96]'
                      }`}
                    >
                      {isStudy ? '学习进阶' : '知识笔记'}
                    </span>
                    {activity.title && (
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 truncate">
                        {activity.title}
                      </span>
                    )}
                  </div>
                  <Text type="secondary" className="text-xs font-mono tabular-nums">
                    {new Date(activity.date).toLocaleDateString('zh-CN', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit'
                    })}
                  </Text>
                </div>
                <p className="mb-0 text-slate-800 dark:text-[#E6ECF5] font-medium text-sm leading-relaxed">
                  {activity.content}
                </p>
              </div>
            </Timeline.Item>
          );
        })}
      </Timeline>
    </Card>
  );
}

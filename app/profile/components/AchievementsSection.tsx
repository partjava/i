'use client';

import React from 'react';
import { Card, Progress, Row, Col, Divider, Typography } from 'antd';
import { TrophyOutlined } from '@ant-design/icons';
import AchievementCard from '@shared/components/AchievementCard';
import type { Achievement as AchievementType } from '@shared/types/achievement';
import styles from '../page.module.css';

const { Text } = Typography;

export interface AchievementsSectionProps {
  achievements: AchievementType[];
  summary: { earned: number; total: number; percent: number };
  showAll: boolean;
  onToggleShowAll: () => void;
}

/**
 * 成就系统卡片：总进度环形条 + 成就墙（可展开收起）
 * （从 profile/page.tsx 抽出，样式与行为保持不变）
 */
export default function AchievementsSection({
  achievements, summary, showAll, onToggleShowAll,
}: AchievementsSectionProps) {
  return (
    <Card
      title={
        <div className="flex items-center text-lg font-semibold">
          <TrophyOutlined className="mr-2.5 text-[#D4AD72]" />
          <span>成就系统</span>
        </div>
      }
      className={styles.achievements}
    >
      {/* 紧凑横向成就进度舱 */}
      <div className="mb-6">
        <div className="rounded-2xl border border-[#D4AD72]/25 dark:border-[#D4AD72]/25 bg-gradient-to-r from-[#D4AD72]/10 via-amber-50/40 to-transparent dark:from-[#D4AD72]/14 dark:via-[#1E2430]/60 dark:to-transparent p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#B88E52] to-[#D4AD72] shadow-[0_8px_20px_rgba(212,173,114,0.28)] flex items-center justify-center shrink-0">
              <TrophyOutlined style={{ fontSize: 26, color: '#0F1D33' }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2 mb-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-slate-900 dark:text-[#F2EDE4] tabular-nums">
                    {summary.earned} / {summary.total}
                  </span>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    已解锁成就
                  </span>
                </div>
                <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[#D4AD72]/15 text-[#8A662E] dark:text-[#E8CA96] tabular-nums">
                  {summary.percent}%
                </span>
              </div>
              <Progress
                percent={summary.percent}
                strokeColor={{
                  '0%': '#B88E52',
                  '100%': '#D4AD72',
                }}
                trailColor="rgba(148, 163, 184, 0.24)"
                strokeWidth={8}
                showInfo={false}
                style={{ width: '100%', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </div>

      <Divider className="my-5" />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-900 dark:text-[#F2EDE4] mb-0">可获得的成就</h3>
          <span className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">共 {achievements.length} 项</span>
        </div>

        {achievements.length > 0 ? (
          <>
            <Row gutter={[16, 16]}>
              {(showAll ? achievements : achievements.slice(0, 6)).map((ach) => (
                <Col xs={24} md={12} xl={8} key={ach.id}>
                  <AchievementCard achievement={ach} />
                </Col>
              ))}
            </Row>
            {achievements.length > 6 && (
              <div className="text-center mt-5">
                <button
                  type="button"
                  onClick={onToggleShowAll}
                  className="px-5 py-2 text-xs font-medium text-slate-700 dark:text-[#F2EDE4] bg-white dark:bg-[#1E2430] border border-slate-200 dark:border-white/15 rounded-xl hover:border-[#D4AD72]/60 hover:text-[#1B3B6F] dark:hover:text-[#D4AD72] transition-all"
                >
                  {showAll ? '收起成就墙' : `展开全部 (${achievements.length} 个)`}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8 text-slate-400 dark:text-slate-500">
            暂无成就数据
          </div>
        )}
      </div>
    </Card>
  );
}

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
        <div className="flex items-center text-xl">
          <TrophyOutlined className="mr-3 text-yellow-500" />
          <span>成就系统</span>
        </div>
      }
      className={styles.achievements}
    >
      <div className="mb-8">
        <div className="text-center py-6">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#a5b4fc] to-[#6b7d99] rounded-full flex items-center justify-center">
            <TrophyOutlined style={{ fontSize: 40, color: 'white' }} />
          </div>
          <div className="text-2xl font-semibold text-content-primary mb-4">
            {summary.earned} / {summary.total}
          </div>
          <Progress
            percent={summary.percent}
            strokeColor={{
              '0%': '#ffd700',
              '100%': '#ff8c00',
            }}
            trailColor="#f0f0f0"
            strokeWidth={10}
            showInfo={false}
            style={{ width: '100%', display: 'block' }}
            className="mb-3"
          />
          <Text type="secondary">已解锁成就 · {summary.percent}%</Text>
        </div>
      </div>

      <Divider />

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-content-primary mb-4">可获得的成就</h3>

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
              <div className="text-center mt-4">
                <button
                  onClick={onToggleShowAll}
                  className="px-6 py-2 text-sm font-medium text-content-secondary bg-surface-raised border border-line-strong rounded-lg hover:bg-surface-muted transition-colors"
                >
                  {showAll ? '收起' : `展开全部 (${achievements.length}个)`}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8 text-content-muted">
            暂无成就数据
          </div>
        )}
      </div>
    </Card>
  );
}

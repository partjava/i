'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveMatrixCanvas,
  InteractiveMemoryCanvas,
  type VisualizerTone,
} from '../shared/VisualizerEngine';

// 章节：CSV数据分析

// L1: CSV 分组聚合计算器
export const CsvGroupAggregateVisualizer: React.FC = () => {
  const [metric, setMetric] = useState(0);
  const scenarios = [
    { label: '按部门 SUM', summary: 'groupby("dept").sum() → Eng: 300, Sales: 180。', eng: '300', sales: '180' },
    { label: '按部门 AVG', summary: 'groupby("dept").mean() → Eng: 150.0, Sales: 90.0。', eng: '150.0', sales: '90.0' },
  ];
  const cur = scenarios[metric];
  return (
    <VisualizerFrame
      title="CSV Split-Apply-Combine 分组聚合矩阵"
      subtitle="按键分组归桶后对数值列执行 SUM / AVG 归约"
      badge="group_aggregate"
      scenarios={scenarios.map((s) => ({ label: s.label, summary: s.summary }))}
      activeScenario={metric}
      onScenarioChange={setMetric}
      metrics={[
        { label: 'Eng 聚合', value: cur.eng, tone: 'cyan' },
        { label: 'Sales 聚合', value: cur.sales, tone: 'emerald' },
      ]}
    >
      <InteractiveMatrixCanvas
        operatorLabel="GroupBy"
        left={{
          title: '原始 CSV 行',
          colLabels: ['dept', 'val'],
          rows: [
            [{ value: 'Eng', highlight: 'cyan' }, { value: 120 }],
            [{ value: 'Sales', highlight: 'emerald' }, { value: 80 }],
            [{ value: 'Eng', highlight: 'cyan' }, { value: 180 }],
            [{ value: 'Sales', highlight: 'emerald' }, { value: 100 }],
          ],
        }}
        right={{
          title: metric === 0 ? 'SUM 汇总' : 'AVG 均值',
          colLabels: ['dept', 'agg'],
          rows: [
            [{ value: 'Eng', highlight: 'cyan' }, { value: cur.eng, highlight: 'cyan' }],
            [{ value: 'Sales', highlight: 'emerald' }, { value: cur.sales, highlight: 'emerald' }],
          ],
        }}
      />
    </VisualizerFrame>
  );
};

// L2: CSV 解析器
export const CsvQuoteParserVisualizer: React.FC = () => {
  const [step, setStep] = useState(1);
  const modes = [
    {
      label: 'naive split(",") ✗',
      slots: ['"Smith', ' Jr."', '42', 'NY'],
      tone: 'rose' as VisualizerTone,
      summary: '普通 split(",") 会错误切开双引号内部的逗号，导致列数错乱为 4 列！',
    },
    {
      label: '引号状态机解析 ✓',
      slots: ['Smith, Jr.', '42', 'NY'],
      tone: 'emerald' as VisualizerTone,
      summary: '维护 in_quotes 状态位：引号内的逗号视为普通字符，完整保留 3 列！',
    },
  ];
  const cur = modes[step];
  return (
    <VisualizerFrame
      title="CSV 带转义引号的状态机词法切分"
      subtitle='输入行："Smith, Jr.",42,NY — 区分字段分隔逗号与引号内逗号'
      badge="parse_csv"
      scenarios={modes.map((m) => ({ label: m.label, summary: m.summary }))}
      activeScenario={step}
      onScenarioChange={setStep}
      metrics={[
        { label: '解析列数', value: `${cur.slots.length} 列`, tone: cur.tone },
        { label: '预期列数', value: '3 列', tone: 'indigo' },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: '切分字段',
            slots: cur.slots.map((s, i) => ({ label: s, sublabel: `Col ${i}`, tone: cur.tone })),
          },
        ]}
      />
    </VisualizerFrame>
  );
};

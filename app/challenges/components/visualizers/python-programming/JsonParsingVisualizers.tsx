'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveGraphCanvas,
  InteractiveMemoryCanvas,
} from '../shared/VisualizerEngine';

// 章节：JSON解析

// L1: JSON 数据清洗管道
export const JsonCleanPipelineVisualizer: React.FC = () => {
  const [step, setStep] = useState(1);
  return (
    <VisualizerFrame
      title="脏 JSON 数据清洗与类型标准化管道"
      subtitle="去除空字段 None、trim 字符串并统一嵌套布尔/数值类型"
      badge="clean_json_record"
      scenarios={[
        { label: '清洗前原始 JSON', summary: '存在前后空格 " Alice "、null 键以及字符串数字 "28"。' },
        { label: '清洗后规范字典', summary: '剔除 None 键，trim 字符串并转换 age=28 为整型。' },
      ]}
      activeScenario={step}
      onScenarioChange={setStep}
      metrics={[
        { label: 'name', value: step === 1 ? '"Alice"' : '"  Alice "', tone: step === 1 ? 'emerald' : 'amber' },
        { label: 'age', value: step === 1 ? '28 (int)' : '"28" (str)', tone: step === 1 ? 'emerald' : 'amber' },
        { label: 'extra: null', value: step === 1 ? '已剔除 ✓' : '保留脏键', tone: step === 1 ? 'cyan' : 'rose' },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: step === 0 ? 'Raw JSON' : 'Cleaned Dict',
            slots: [
              { label: step === 0 ? '"  Alice "' : '"Alice"', sublabel: 'name', tone: step === 0 ? 'amber' : 'emerald' },
              { label: step === 0 ? '"28"' : '28', sublabel: 'age', tone: step === 0 ? 'amber' : 'cyan' },
              step === 0
                ? { label: 'null', sublabel: 'extra', tone: 'rose' }
                : { label: '[REMOVED]', sublabel: '无无效空键', tone: 'emerald' },
            ],
          },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: JSON 扁平化器
export const JsonFlattenVisualizer: React.FC = () => {
  const [mode, setMode] = useState(1);
  return (
    <VisualizerFrame
      title="嵌套 JSON 路径拼接扁平化 (a.b.c)"
      subtitle="递归携带 prefix 路径下钻字典节点，将树形文档展平为单层键值表"
      badge="flatten_json"
      scenarios={[
        { label: '原始嵌套树', summary: 'user → { name: "Ada", meta → { tier: "pro" } } 嵌套两层。' },
        { label: '展平扁平字典', summary: '叶子节点按 "." 拼接键名：{ "user.name": "Ada", "user.meta.tier": "pro" }。' },
      ]}
      activeScenario={mode}
      onScenarioChange={setMode}
      metrics={[
        { label: '扁平键 1', value: 'user.name = "Ada"', tone: 'cyan' },
        { label: '扁平键 2', value: 'user.meta.tier = "pro"', tone: 'emerald' },
      ]}
    >
      <InteractiveGraphCanvas
        height={175}
        nodes={
          mode === 0
            ? [
                { id: 'u', x: 85, y: 85, label: 'user', tone: 'indigo', shape: 'pill', active: true },
                { id: 'n', x: 225, y: 45, label: 'name: "Ada"', tone: 'cyan', shape: 'pill' },
                { id: 'm', x: 225, y: 125, label: 'meta', tone: 'amber', shape: 'pill' },
                { id: 't', x: 340, y: 125, label: 'tier: "pro"', tone: 'emerald', shape: 'pill' },
              ]
            : [
                { id: 'f1', x: 140, y: 55, label: '"user.name" : "Ada"', tone: 'cyan', shape: 'pill', active: true },
                { id: 'f2', x: 220, y: 120, label: '"user.meta.tier" : "pro"', tone: 'emerald', shape: 'pill', active: true },
              ]
        }
        edges={
          mode === 0
            ? [
                { from: 'u', to: 'n', tone: 'cyan' },
                { from: 'u', to: 'm', tone: 'amber' },
                { from: 'm', to: 't', tone: 'emerald', animated: true },
              ]
            : [{ from: 'f1', to: 'f2', label: '同级展平', tone: 'indigo', dashed: true }]
        }
      />
    </VisualizerFrame>
  );
};

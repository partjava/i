'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveMemoryCanvas,
} from '../shared/VisualizerEngine';

// 章节：函数

// L1: 最近 N 次缓存装饰器
export const MemoizeNVisualizer: React.FC = () => {
  const [cap, setCap] = useState(2);
  const [step, setStep] = useState(2);
  const calls = ['f(1)', 'f(2)', 'f(3)', 'f(2)'];
  const caches = [
    ['(1)→10'],
    ['(1)→10', '(2)→20'],
    cap === 1 ? ['(3)→30'] : ['(2)→20', '(3)→30'].slice(-cap),
    cap === 1 ? ['(2)→20'] : ['(3)→30', '(2)→20'].slice(-cap),
  ];
  const isHit = step === 3 && cap >= 2;
  return (
    <VisualizerFrame
      title="OrderedDict / LRU 有界缓存淘汰推演"
      subtitle="最近 N 次函数参数结果复用，超出容量淘汰最久未使用条目"
      badge="memoize_n"
      scenarios={calls.map((c, i) => ({
        label: `调用 ${c}`,
        summary: i === 3 ? (isHit ? '缓存命中 f(2)！跳过函数体直接返回 20。' : '容量不足曾淘汰 f(2)，重新计算。') : `计算并写入 ${c} 到缓存尾部。`,
      }))}
      activeScenario={step}
      onScenarioChange={setStep}
      sliders={[
        { label: '缓存容量 maxsize (N)', value: cap, min: 1, max: 3, step: 1, onChange: setCap },
      ]}
      metrics={[
        { label: '当前调用', value: calls[step], tone: 'cyan' },
        { label: '缓存状态', value: isHit ? 'CACHE HIT ⚡' : 'COMPUTE', tone: isHit ? 'emerald' : 'amber' },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: `Cache(N=${cap})`,
            slots: caches[step].map((entry, i, arr) => ({
              label: entry,
              sublabel: i === arr.length - 1 ? 'MRU' : 'LRU',
              tone: i === arr.length - 1 && isHit ? 'emerald' : 'indigo',
            })),
          },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: 回文检测器
export const PalindromePointersVisualizer: React.FC = () => {
  const chars = ['r', 'a', 'c', 'e', 'c', 'a', 'r'];
  const [step, setStep] = useState(1);
  const left = step;
  const right = chars.length - 1 - step;
  const matched = chars[left] === chars[right];
  return (
    <VisualizerFrame
      title="双指针相向收缩回文校验"
      subtitle="left 从头右移、right 从尾左移，零额外字符串拷贝完成验证"
      badge="is_palindrome"
      scenarios={[0, 1, 2, 3].map((s) => ({
        label: `步 ${s + 1}: [${s}] vs [${chars.length - 1 - s}]`,
        summary: `比较 '${chars[s]}' 与 '${chars[chars.length - 1 - s]}'：相等，双指针继续向中心逼近。`,
      }))}
      activeScenario={step}
      onScenarioChange={setStep}
      metrics={[
        { label: 'left 指针', value: `[${left}] = '${chars[left]}'`, tone: 'cyan' },
        { label: 'right 指针', value: `[${right}] = '${chars[right]}'`, tone: 'indigo' },
        { label: '字符比较', value: matched ? 'MATCH ✓' : 'FAIL ✗', tone: matched ? 'emerald' : 'rose' },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: '字符数组',
            slots: chars.map((ch, i) => ({
              label: ch,
              sublabel: `[${i}]`,
              tone: i === left ? 'cyan' : i === right ? 'indigo' : i < left || i > right ? 'emerald' : 'slate',
              pointer: i === left && i === right ? 'L=R' : i === left ? 'L' : i === right ? 'R' : undefined,
            })),
          },
        ]}
      />
    </VisualizerFrame>
  );
};

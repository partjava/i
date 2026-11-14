'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveGraphCanvas,
  InteractiveMemoryCanvas,
  type VisualizerTone,
} from '../shared/VisualizerEngine';

// 章节：自动编程助手

// L1: AI 代码助手补全器
export const CodeAutocompleteFimVisualizer: React.FC = () => {
  const [fim, setFim] = useState(1);
  return (
    <VisualizerFrame
      title="IDE 代码补全 FIM (Fill-in-the-Middle) 光标上下文构造"
      subtitle="同时打包光标前方 Prefix、后方 Suffix 与仓库签名上下文，精准预测中间空缺代码块"
      badge="code_completion"
      scenarios={[
        { label: '仅左向续写 (易漏括号/返回值)', summary: '不知光标后面的 return 逻辑，补全常造成语法重复或不闭合。' },
        { label: 'FIM <PRE>…<SUF>…<MID> ✓', summary: '把光标后文当作条件先验一起送入编码，无缝衔接下方代码！' },
      ]}
      activeScenario={fim}
      onScenarioChange={setFim}
      metrics={[{ label: '光标位置感知', value: fim ? '双向 Prefix + Suffix ✓' : '单向 Prefix', tone: fim ? 'emerald' : 'amber' }]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: 'FIM Prompt 拼接格式',
            slots: [
              { label: '<PRE> def add(a, b):', sublabel: '前文', tone: 'indigo' },
              { label: fim ? '<SUF> return res' : '[忽略后文]', sublabel: '后文约束', tone: fim ? 'cyan' : 'rose' },
              { label: '<MID> res = a + b', sublabel: '补全目标', tone: 'emerald', pointer: 'GEN' },
            ],
          },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: 代码审查工具
export const CodeReviewAstVisualizer: React.FC = () => {
  const [rule, setRule] = useState(0);
  const rules = [
    { name: 'SQL 注入拼接检测', issue: 'f"SELECT * WHERE id={uid}" 🚨', fix: '使用参数化占位符 %s / ?', tone: 'rose' as VisualizerTone },
    { name: '裸露 except 捕获', issue: 'except: pass (吞掉 KeyboardInterrupt)', fix: '显式 except ValueError as e:', tone: 'amber' as VisualizerTone },
    { name: '资源句柄泄漏', issue: 'open() 未配合 with 上下文', fix: 'with open(...) as f:', tone: 'cyan' as VisualizerTone },
  ];
  const cur = rules[rule];
  return (
    <VisualizerFrame
      title="AST 静态规则 + LLM 语义联合代码审查工具"
      subtitle="AST 树先精确定位安全漏洞与高圈复杂度节点坐标，再由 LLM 给出重构 Diff 建议"
      badge="code_reviewer"
      scenarios={rules.map((r) => ({ label: r.name, summary: `问题：${r.issue} → 建议：${r.fix}` }))}
      activeScenario={rule}
      onScenarioChange={setRule}
      metrics={[
        { label: '高危反模式', value: cur.issue, tone: cur.tone },
        { label: '修复建议', value: cur.fix, tone: 'emerald' },
      ]}
    >
      <InteractiveGraphCanvas
        height={165}
        nodes={[
          { id: 'ast', x: 75, y: 82, label: 'Python AST 解析', tone: 'indigo', shape: 'pill', active: true },
          { id: 'hit', x: 205, y: 82, label: cur.name, tone: cur.tone, shape: 'pill', active: true },
          { id: 'fix', x: 335, y: 82, label: 'Patch 建议 ✓', tone: 'emerald', shape: 'pill', active: true },
        ]}
        edges={[
          { from: 'ast', to: 'hit', label: '定位行号', tone: cur.tone, animated: true },
          { from: 'hit', to: 'fix', tone: 'emerald', animated: true },
        ]}
      />
    </VisualizerFrame>
  );
};

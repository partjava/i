'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveGraphCanvas,
} from '../shared/VisualizerEngine';

// 章节：文件读写

// L1: 日志关键词频率统计器
export const LogKeywordStreamVisualizer: React.FC = () => {
  const [lineIdx, setLineIdx] = useState(1);
  const lines = [
    { text: '[INFO] startup ok', match: '—', counts: 'ERR:0 WARN:0' },
    { text: '[WARN] high memory', match: 'WARN +1', counts: 'ERR:0 WARN:1' },
    { text: '[ERROR] disk full', match: 'ERR +1', counts: 'ERR:1 WARN:1' },
  ];
  const cur = lines[lineIdx];
  return (
    <VisualizerFrame
      title="流式逐行读取文件句柄 (with open)"
      subtitle="按行迭代 file iterator，常量内存消耗扫描大日志统计关键词"
      badge="count_keywords"
      scenarios={lines.map((l, i) => ({
        label: `读取第 ${i + 1} 行`,
        summary: `readline → "${l.text}"，命中更新 ${l.match}。`,
      }))}
      activeScenario={lineIdx}
      onScenarioChange={setLineIdx}
      metrics={[
        { label: '当前行', value: cur.text, tone: 'cyan' },
        { label: '累计统计', value: cur.counts, tone: 'emerald' },
      ]}
    >
      <InteractiveGraphCanvas
        height={165}
        nodes={[
          { id: 'ctx', x: 75, y: 82, label: 'with open()', sublabel: '自动关闭句柄', tone: 'indigo', shape: 'pill', active: true },
          { id: 'line', x: 205, y: 82, label: `Line #${lineIdx + 1}`, sublabel: cur.match, tone: 'cyan', shape: 'pill', active: true },
          { id: 'dict', x: 330, y: 82, label: cur.counts, sublabel: 'O(1) 内存', tone: 'emerald', shape: 'pill', active: true },
        ]}
        edges={[
          { from: 'ctx', to: 'line', label: 'for line', tone: 'cyan', animated: true },
          { from: 'line', to: 'dict', label: 'count', tone: 'emerald', animated: true },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: 文件查找器
export const FileFinderTreeVisualizer: React.FC = () => {
  const [ext, setExt] = useState(0);
  const exts = ['.py', '.json'];
  const target = exts[ext];
  return (
    <VisualizerFrame
      title="递归目录遍历与后缀名匹配 (os.walk / Path.rglob)"
      subtitle="深度优先遍历文件夹树，仅收集匹配扩展名的路径"
      badge="find_files"
      scenarios={[
        { label: '过滤 *.py', summary: '匹配并收集 src/app.py 与 src/utils.py。' },
        { label: '过滤 *.json', summary: '匹配并收集 config/settings.json。' },
      ]}
      activeScenario={ext}
      onScenarioChange={setExt}
      metrics={[{ label: '匹配模式', value: `*${target}`, tone: 'cyan' }]}
    >
      <InteractiveGraphCanvas
        height={185}
        nodes={[
          { id: 'root', x: 80, y: 92, label: 'project/', tone: 'indigo', shape: 'pill', active: true },
          { id: 'src', x: 195, y: 50, label: 'src/', tone: 'cyan', shape: 'pill' },
          { id: 'cfg', x: 195, y: 138, label: 'config/', tone: 'cyan', shape: 'pill' },
          { id: 'f1', x: 325, y: 28, label: 'app.py', tone: target === '.py' ? 'emerald' : 'slate', shape: 'pill', active: target === '.py' },
          { id: 'f2', x: 325, y: 74, label: 'utils.py', tone: target === '.py' ? 'emerald' : 'slate', shape: 'pill', active: target === '.py' },
          { id: 'f3', x: 325, y: 138, label: 'settings.json', tone: target === '.json' ? 'emerald' : 'slate', shape: 'pill', active: target === '.json' },
        ]}
        edges={[
          { from: 'root', to: 'src', tone: 'cyan' },
          { from: 'root', to: 'cfg', tone: 'cyan' },
          { from: 'src', to: 'f1', tone: target === '.py' ? 'emerald' : 'slate', animated: target === '.py' },
          { from: 'src', to: 'f2', tone: target === '.py' ? 'emerald' : 'slate', animated: target === '.py' },
          { from: 'cfg', to: 'f3', tone: target === '.json' ? 'emerald' : 'slate', animated: target === '.json' },
        ]}
      />
    </VisualizerFrame>
  );
};

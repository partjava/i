'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveMatrixCanvas,
  InteractiveTimelineCanvas,
  type MatrixCell,
} from '../shared/VisualizerEngine';

export function FileSystemLevel1() {
  const [fileCount, setFileCount] = useState(6);
  const [fileKb, setFileKb] = useState(2);

  const totalBlocks = 12;
  const totalInodes = 8;
  const blocksPerFile = Math.ceil(fileKb / 4);
  const usedBlocks = Math.min(totalBlocks, fileCount * blocksPerFile);
  const usedInodes = Math.min(totalInodes, fileCount);
  const bottleneck =
    fileCount > totalInodes && fileCount * blocksPerFile <= totalBlocks
      ? 'Inode 率先耗尽！'
      : fileCount * blocksPerFile > totalBlocks && fileCount <= totalInodes
      ? '磁盘块率先耗尽！'
      : fileCount > totalInodes || fileCount * blocksPerFile > totalBlocks
      ? '双项资源溢出！'
      : '容量充足';

  const blockGrid: MatrixCell[][] = [0, 1, 2].map((r) =>
    [0, 1, 2, 3].map((c) => {
      const idx = r * 4 + c;
      return {
        value: idx < usedBlocks ? `B${idx}` : '·',
        highlight: idx < usedBlocks ? (usedBlocks >= totalBlocks ? 'rose' : 'cyan') : 'none',
      };
    })
  );

  const inodeGrid: MatrixCell[][] = [0, 1].map((r) =>
    [0, 1, 2, 3].map((c) => {
      const idx = r * 4 + c;
      return {
        value: idx < usedInodes ? `I${idx}` : '·',
        highlight: idx < usedInodes ? (usedInodes >= totalInodes ? 'amber' : 'indigo') : 'none',
      };
    })
  );

  return (
    <VisualizerFrame
      title="小文件存储容量与 Inode 位图"
      subtitle="磁盘总计 12 个 4 KiB 块与 8 个 Inode；调节文件数量与大小，观察哪项资源先耗尽。"
      badge="Block vs Inode 矩阵"
      sliders={[
        {
          label: '待写入文件数',
          value: fileCount,
          min: 1,
          max: 10,
          step: 1,
          displayValue: `${fileCount} 个`,
          onChange: setFileCount,
        },
        {
          label: '单文件大小',
          value: fileKb,
          min: 1,
          max: 8,
          step: 1,
          displayValue: `${fileKb} KiB (占 ${blocksPerFile} 块)`,
          onChange: setFileKb,
        },
      ]}
      metrics={[
        { label: 'Block 占用', value: `${fileCount * blocksPerFile} / ${totalBlocks}`, tone: fileCount * blocksPerFile > totalBlocks ? 'rose' : 'cyan' },
        { label: 'Inode 占用', value: `${fileCount} / ${totalInodes}`, tone: fileCount > totalInodes ? 'amber' : 'indigo' },
        { label: '系统诊断', value: bottleneck, tone: bottleneck.includes('耗尽') || bottleneck.includes('溢出') ? 'rose' : 'emerald' },
      ]}
    >
      <InteractiveMatrixCanvas
        left={{ title: '磁盘块位图 (12 × 4KiB)', rows: blockGrid }}
        operatorLabel="+"
        right={{ title: 'Inode 索引节点表 (8)', rows: inodeGrid }}
      />
    </VisualizerFrame>
  );
}

export function FileSystemLevel2() {
  const [usedMb, setUsedMb] = useState(70);
  const soft = 80;
  const hard = 100;
  const status = usedMb > hard ? 'REJECT (超硬限制)' : usedMb > soft ? 'WARN (超软限制)' : 'ALLOW (正常写入)';
  const tone = usedMb > hard ? 'rose' : usedMb > soft ? 'amber' : 'emerald';

  return (
    <VisualizerFrame
      title="磁盘配额软硬限制分析器"
      subtitle="拖动当前写入量滑块，观察软限制（80 MiB 告警）与硬限制（100 MiB 拒绝）的水位触发。"
      badge="配额水位警戒线"
      sliders={[
        {
          label: '请求后总占用量 (MiB)',
          value: usedMb,
          min: 20,
          max: 120,
          step: 5,
          displayValue: `${usedMb} MiB`,
          onChange: setUsedMb,
        },
      ]}
      metrics={[
        { label: '当前水位', value: `${usedMb} MiB`, tone },
        { label: '剩余可用空间', value: `${Math.max(0, hard - usedMb)} MiB`, tone: 'cyan' },
        { label: '配额策略判定', value: status, tone },
      ]}
    >
      <InteractiveTimelineCanvas
        maxTime={125}
        unit="M"
        thresholds={[
          { value: soft, label: '软限制 80M', tone: 'amber' },
          { value: hard, label: '硬限制 100M', tone: 'rose' },
        ]}
        lanes={[
          {
            name: '已占空间',
            blocks: [{ start: 0, end: usedMb, label: `${usedMb} MiB`, tone }],
          },
        ]}
      />
    </VisualizerFrame>
  );
}

'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveMemoryCanvas,
  InteractiveTimelineCanvas,
} from '../shared/VisualizerEngine';

const LPM_TARGETS = [
  {
    ip: '10.1.2.33',
    octets: ['00001010 (10)', '00000001 (1)', '00000010 (2)', '00100001 (33)'],
    matches: [true, true, true, true],
    winner: '10.1.2.0/24',
    nextHop: 'eth2',
  },
  {
    ip: '10.1.9.33',
    octets: ['00001010 (10)', '00000001 (1)', '00001001 (9)', '00100001 (33)'],
    matches: [true, true, true, false],
    winner: '10.1.0.0/16',
    nextHop: 'eth1',
  },
  {
    ip: '192.0.2.1',
    octets: ['11000000 (192)', '00000000 (0)', '00000010 (2)', '00000001 (1)'],
    matches: [true, false, false, false],
    winner: '0.0.0.0/0',
    nextHop: 'default-gw',
  },
];

export function ComputerNetworkLevel1() {
  const [active, setActive] = useState(0);
  const t = LPM_TARGETS[active];
  const routes = ['0.0.0.0/0', '10.0.0.0/8', '10.1.0.0/16', '10.1.2.0/24'];

  return (
    <VisualizerFrame
      title="路由表最长前缀匹配引擎 (LPM)"
      subtitle="将目标 IP 转为 32 位前缀与路由掩码逐位比对，命中掩码长度最长者胜出。"
      badge="32-bit 前缀匹配"
      scenarios={LPM_TARGETS.map((item) => ({
        label: item.ip,
        summary: `目标 ${item.ip} 命中多条前缀，最长掩码规则 ${item.winner} 获胜，下一跳 → ${item.nextHop}。`,
      }))}
      activeScenario={active}
      onScenarioChange={setActive}
      metrics={[
        { label: '目标 IP', value: t.ip, tone: 'cyan' },
        { label: '获胜前缀', value: t.winner, tone: 'emerald' },
        { label: '转发出口', value: t.nextHop, tone: 'indigo' },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: '目标 32-bit',
            slots: t.octets.map((o, i) => ({
              label: o.split(' ')[1],
              sublabel: o.split(' ')[0],
              tone: i < 3 && t.matches[i + 1] ? 'cyan' : 'slate',
            })),
          },
          {
            name: '路由候选',
            slots: routes.map((r, idx) => {
              const isWinner = r === t.winner;
              const isMatched = t.matches[idx];
              return {
                label: r,
                sublabel: isWinner ? '最长胜出' : isMatched ? '匹配' : '不匹配',
                tone: isWinner ? 'emerald' : isMatched ? 'indigo' : 'slate',
                pointer: isWinner ? 'BEST' : undefined,
              };
            }),
          },
        ]}
      />
    </VisualizerFrame>
  );
}

export function ComputerNetworkLevel2() {
  const [borrowBits, setBorrowBits] = useState(2);
  const subnetCount = 2 ** borrowBits;
  const blockSize = 256 / subnetCount;
  const prefix = 24 + borrowBits;
  const usableHosts = blockSize - 2;

  const displaySubnets = Array.from({ length: Math.min(4, subnetCount) }, (_, i) => {
    const start = i * blockSize;
    const end = (i + 1) * blockSize - 1;
    return {
      name: `子网 #${i + 1}`,
      blocks: [
        { start, end: start + 1, label: `.${start}`, tone: 'indigo' as const },
        { start: start + 1, end, label: `.${start + 1}~.${end - 1}`, tone: 'cyan' as const },
        { start: end, end: end + 1, label: `.${end}`, tone: 'amber' as const },
      ],
    };
  });

  return (
    <VisualizerFrame
      title="CIDR 子网划分计算器"
      subtitle="调整向主机位借用的比特数，把 192.0.2.0/24 地址空间切分为等大小子网。"
      badge="IPv4 地址块划分"
      sliders={[
        {
          label: '借用主机位数 (Borrow Bits)',
          value: borrowBits,
          min: 1,
          max: 4,
          step: 1,
          displayValue: `${borrowBits} bit (/${prefix})`,
          onChange: setBorrowBits,
        },
      ]}
      metrics={[
        { label: '子网掩码前缀', value: `/${prefix}`, tone: 'indigo' },
        { label: '划分总子网数', value: `${subnetCount} 个`, tone: 'cyan' },
        { label: '每子网可用主机', value: `${usableHosts} 台`, tone: 'emerald' },
      ]}
      caption={`块大小 = ${blockSize}；每个子网首地址（紫）为网络号，末地址（黄）为广播地址，其余 ${usableHosts} 个地址分配给主机。`}
    >
      <InteractiveTimelineCanvas
        maxTime={256}
        lanes={displaySubnets}
      />
    </VisualizerFrame>
  );
}

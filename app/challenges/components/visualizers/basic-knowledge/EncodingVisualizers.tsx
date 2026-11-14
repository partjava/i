'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveMemoryCanvas,
  InteractiveGraphCanvas,
} from '../shared/VisualizerEngine';

export function EncodingLevel1() {
  const [active, setActive] = useState(0);
  const cases = [
    {
      label: '正常多字节 UTF-8',
      bytes: [
        { label: '0xE4', sublabel: '1110xxxx', tone: 'cyan' as const },
        { label: '0xB8', sublabel: '10xxxxxx', tone: 'indigo' as const },
        { label: '0xAD', sublabel: '10xxxxxx', tone: 'indigo' as const },
      ],
      result: '中 (U+4E2D)',
      status: 'VALID_UTF8',
      tone: 'emerald' as const,
      summary: '首字节前缀 1110 表示 3 字节字符，后续两个续字节均以 10 开头，解码成功。',
    },
    {
      label: '非法孤立字节',
      bytes: [
        { label: '0xFF', sublabel: '11111111', tone: 'rose' as const, pointer: 'ERR' },
      ],
      result: 'DecodeError',
      status: 'INVALID_UTF8',
      tone: 'rose' as const,
      summary: 'UTF-8 编码表中永远不会出现 0xFE 与 0xFF，严格模式下直接抛出解码异常。',
    },
    {
      label: '替换字符 U+FFFD',
      bytes: [
        { label: '0xEF', sublabel: '11101111', tone: 'amber' as const },
        { label: '0xBF', sublabel: '10111111', tone: 'amber' as const },
        { label: '0xBD', sublabel: '10111101', tone: 'amber' as const },
      ],
      result: ' (U+FFFD)',
      status: 'SUSPECT_REPLACE',
      tone: 'amber' as const,
      summary: '字节序列本身合法，但解码结果为 Unicode 替换符 ，提示上游已曾损坏截断。',
    },
  ];
  const cur = cases[active];

  return (
    <VisualizerFrame
      title="日志编码异常探测器 (UTF-8)"
      subtitle="按比特前缀校验变长字节头（1110 / 10），区分非法字节与上游替换字符 。"
      badge="UTF-8 位前缀校验"
      scenarios={cases.map((c) => ({ label: c.label, summary: c.summary }))}
      activeScenario={active}
      onScenarioChange={setActive}
      metrics={[
        { label: '解码输出', value: cur.result, tone: cur.tone },
        { label: '异常探测状态', value: cur.status, tone: cur.tone },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          { name: '原始字节流', slots: cur.bytes },
          {
            name: '校验决策',
            slots: [
              { label: 'UTF-8 严格解码', tone: 'cyan' },
              { label: cur.result, tone: cur.tone },
              { label: cur.status, tone: cur.tone },
            ],
          },
        ]}
      />
    </VisualizerFrame>
  );
}

export function EncodingLevel2() {
  const [len, setLen] = useState(3);
  const configs = {
    1: {
      raw: 'M',
      bytes: ['01001101 (M)'],
      bits6: ['010011', '010000', 'PAD =', 'PAD ='],
      b64: ['T', 'Q', '=', '='],
      desc: '仅 1 字节 (8 bit) → 补 4 个零凑成两组 6 bit，末尾补两个 "="。',
    },
    2: {
      raw: 'Ma',
      bytes: ['01001101 (M)', '01100001 (a)'],
      bits6: ['010011', '010110', '000100', 'PAD ='],
      b64: ['T', 'W', 'E', '='],
      desc: '2 字节 (16 bit) → 补 2 个零凑成三组 6 bit，末尾补一个 "="。',
    },
    3: {
      raw: 'Man',
      bytes: ['01001101 (M)', '01100001 (a)', '01101110 (n)'],
      bits6: ['010011', '010110', '000101', '101110'],
      b64: ['T', 'W', 'F', 'u'],
      desc: '3 字节 (24 bit) 恰好整除 6，生成 4 个 Base64 字符，无需填充 "="。',
    },
  }[len as 1 | 2 | 3]!;

  return (
    <VisualizerFrame
      title="Base64 编码比特重分组器"
      subtitle="调节输入字节长度（1~3 字节），观察 8-bit 字节流如何按 6-bit 重新切片并补 '='。"
      badge="24-bit → 4×6-bit"
      sliders={[
        {
          label: '输入字节数',
          value: len,
          min: 1,
          max: 3,
          step: 1,
          displayValue: `${len} Bytes ("${configs.raw}")`,
          onChange: setLen,
        },
      ]}
      metrics={[
        { label: '输入字符', value: `"${configs.raw}"`, tone: 'cyan' },
        { label: '有效比特位', value: `${len * 8} bits`, tone: 'indigo' },
        { label: 'Base64 编码结果', value: configs.b64.join(''), tone: 'emerald' },
      ]}
      caption={configs.desc}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: '8-bit 字节',
            slots: configs.bytes.map((b) => ({
              label: b.split(' ')[1],
              sublabel: b.split(' ')[0],
              tone: 'cyan',
            })),
          },
          {
            name: '6-bit 分组',
            slots: configs.bits6.map((b) => ({
              label: b,
              tone: b.startsWith('PAD') ? 'amber' : 'indigo',
            })),
          },
          {
            name: 'Base64 字符',
            slots: configs.b64.map((ch) => ({
              label: ch,
              tone: ch === '=' ? 'amber' : 'emerald',
            })),
          },
        ]}
      />
    </VisualizerFrame>
  );
}

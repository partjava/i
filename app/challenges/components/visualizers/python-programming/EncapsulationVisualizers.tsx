'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveGraphCanvas,
  InteractiveMemoryCanvas,
} from '../shared/VisualizerEngine';

// 章节：封装

// L1: 购物车与价格计算器
export const ShoppingCartEncapVisualizer: React.FC = () => {
  const [discount, setDiscount] = useState(20);
  const subtotal = 250;
  const finalTotal = (subtotal * (1 - discount / 100)).toFixed(1);
  return (
    <VisualizerFrame
      title="ShoppingCart 属性封装与价格不变式"
      subtitle="外部只读 total() 聚合，私有 _items 与折扣边界由类方法统一校验"
      badge="ShoppingCart"
      sliders={[{ label: '会员折扣 (%)', value: discount, min: 0, max: 50, step: 5, displayValue: `${discount}%`, onChange: setDiscount }]}
      metrics={[
        { label: '商品小计', value: `¥${subtotal}`, tone: 'slate' },
        { label: '折后总价', value: `¥${finalTotal}`, tone: 'emerald' },
      ]}
    >
      <InteractiveGraphCanvas
        height={170}
        nodes={[
          { id: 'ext', x: 75, y: 85, label: '调用方 API', sublabel: 'add / apply_discount', tone: 'cyan', shape: 'pill', active: true },
          { id: 'pub', x: 205, y: 85, label: '校验网关', sublabel: '0 <= d <= 50', tone: 'indigo', shape: 'pill', active: true },
          { id: 'priv', x: 330, y: 55, label: '_items (私有)', sublabel: '¥150 + ¥100', tone: 'amber', shape: 'pill' },
          { id: 'tot', x: 330, y: 120, label: `total: ¥${finalTotal}`, tone: 'emerald', shape: 'pill', active: true },
        ]}
        edges={[
          { from: 'ext', to: 'pub', label: '受控访问', tone: 'cyan', animated: true },
          { from: 'pub', to: 'priv', tone: 'amber' },
          { from: 'priv', to: 'tot', label: `×${(1 - discount / 100).toFixed(2)}`, tone: 'emerald', animated: true },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: 银行账户类
export const BankAccountEncapVisualizer: React.FC = () => {
  const [withdraw, setWithdraw] = useState(80);
  const balance = 100;
  const ok = withdraw <= balance && withdraw > 0;
  return (
    <VisualizerFrame
      title="BankAccount 私有余额守卫 (_balance)"
      subtitle="禁止外部直接赋值 account._balance = -999，所有变更经由 deposit/withdraw 守卫"
      badge="BankAccount"
      sliders={[{ label: '申请取款金额', value: withdraw, min: 10, max: 150, step: 10, displayValue: `¥${withdraw}`, onChange: setWithdraw }]}
      metrics={[
        { label: '原余额', value: `¥${balance}`, tone: 'slate' },
        { label: '守卫校验', value: ok ? '允许交易 ✓' : '余额不足拒绝 ✗', tone: ok ? 'emerald' : 'rose' },
        { label: '交易后余额', value: `¥${ok ? balance - withdraw : balance}`, tone: ok ? 'cyan' : 'rose' },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: '_balance 守卫',
            slots: [
              { label: `原 ¥${balance}`, sublabel: '受保护属性', tone: 'indigo' },
              { label: `取 -¥${withdraw}`, sublabel: ok ? 'balance >= amt' : 'ValueError!', tone: ok ? 'cyan' : 'rose' },
              { label: `现 ¥${ok ? balance - withdraw : balance}`, sublabel: '原子更新', tone: ok ? 'emerald' : 'rose', pointer: 'SAFE' },
            ],
          },
        ]}
      />
    </VisualizerFrame>
  );
};

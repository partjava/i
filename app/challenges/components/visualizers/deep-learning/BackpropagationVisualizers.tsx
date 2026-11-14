'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveGraphCanvas,
} from '../shared/VisualizerEngine';

// 章节：反向传播

// L1: 反向传播自动求导器
export const BackpropChainVisualizer: React.FC = () => {
  const [phase, setPhase] = useState(1);
  return (
    <VisualizerFrame
      title="线性层链式法则反向传播 (linear_backward)"
      subtitle="前向缓存激活输入 X；反向利用上游梯度 dY 计算 dW = Xᵀ·dY 与 dX = dY·Wᵀ"
      badge="linear_backward"
      scenarios={[
        { label: '前向传播 (缓存 X, W)', summary: '输入 X=2.0 乘以 W=3.0 得到 Y=6.0，Loss L=0.5(Y-4)²=2.0。' },
        { label: '反向传播 (链式梯度流)', summary: '上游 dL/dY = Y-4 = 2.0；梯度分配：dL/dW = 2.0×X = 4.0，dL/dX = 2.0×W = 6.0。' },
      ]}
      activeScenario={phase}
      onScenarioChange={setPhase}
      metrics={[
        { label: '上游梯度 dL/dY', value: '2.0', tone: 'amber' },
        { label: '权重梯度 dL/dW', value: phase ? '4.0 (更新 W)' : '未计算', tone: phase ? 'emerald' : 'slate' },
        { label: '输入梯度 dL/dX', value: phase ? '6.0 (继续反传)' : '未计算', tone: phase ? 'cyan' : 'slate' },
      ]}
    >
      <InteractiveGraphCanvas
        height={175}
        nodes={[
          { id: 'x', x: 70, y: 55, label: 'X = 2.0', sublabel: phase ? 'dX=6.0' : '输入', tone: 'cyan', shape: 'pill', active: true },
          { id: 'w', x: 70, y: 125, label: 'W = 3.0', sublabel: phase ? 'dW=4.0' : '权重', tone: 'indigo', shape: 'pill', active: true },
          { id: 'mul', x: 200, y: 90, label: 'Y = X·W = 6.0', sublabel: phase ? '链式乘子缓存' : '乘算子', tone: 'amber', shape: 'pill', active: true },
          { id: 'loss', x: 330, y: 90, label: 'L = 2.0', sublabel: phase ? 'dL/dY=2.0' : 'MSE Loss', tone: 'rose', shape: 'pill', active: true },
        ]}
        edges={
          phase === 0
            ? [
                { from: 'x', to: 'mul', label: '前向', tone: 'cyan', animated: true },
                { from: 'w', to: 'mul', label: '前向', tone: 'indigo', animated: true },
                { from: 'mul', to: 'loss', label: '前向', tone: 'amber', animated: true },
              ]
            : [
                { from: 'loss', to: 'mul', label: 'dY=2.0', tone: 'rose', animated: true },
                { from: 'mul', to: 'x', label: 'dY·W=6', tone: 'cyan', animated: true },
                { from: 'mul', to: 'w', label: 'dY·X=4', tone: 'emerald', animated: true },
              ]
        }
      />
    </VisualizerFrame>
  );
};

// L2: 自动微分计算图
export const AutogradDagVisualizer: React.FC = () => {
  const [step, setStep] = useState(1);
  return (
    <VisualizerFrame
      title="Micrograd / Tensor 动态计算图拓扑逆序反传"
      subtitle="每个 Tensor 记录 _prev 前驱与 _backward 闭包，backward() 按拓扑逆序累计 += grad"
      badge="Tensor.backward"
      scenarios={[
        { label: '正向构建 DAG', summary: '计算图边记下 z = a * b + a，其中节点 a 存在两条分支汇流！' },
        { label: '拓扑逆序累加 (+=)', summary: 'a 节点同时收到乘法支路梯度 b 和加法支路梯度 1，必须使用 grad += 而非覆盖。' },
      ]}
      activeScenario={step}
      onScenarioChange={setStep}
      metrics={[
        { label: '偏导 ∂z/∂a', value: 'b + 1 (多路径累加)', tone: 'emerald' },
        { label: '偏导 ∂z/∂b', value: 'a', tone: 'cyan' },
      ]}
    >
      <InteractiveGraphCanvas
        height={180}
        nodes={[
          { id: 'a', x: 65, y: 55, label: 'Tensor a', sublabel: step ? 'grad += b+1' : 'leaf', tone: 'emerald', shape: 'pill', active: true },
          { id: 'b', x: 65, y: 130, label: 'Tensor b', sublabel: step ? 'grad += a' : 'leaf', tone: 'cyan', shape: 'pill', active: true },
          { id: 'mul', x: 195, y: 110, label: 'mul (a*b)', tone: 'indigo', shape: 'pill' },
          { id: 'add', x: 320, y: 75, label: 'z = a*b + a', sublabel: step ? 'topo[::-1]' : 'root', tone: 'amber', shape: 'pill', active: true },
        ]}
        edges={[
          { from: 'a', to: 'mul', tone: 'emerald', animated: step === 1 },
          { from: 'b', to: 'mul', tone: 'cyan', animated: step === 1 },
          { from: 'a', to: 'add', label: '跳连 (+1)', tone: 'emerald', animated: step === 1 },
          { from: 'mul', to: 'add', tone: 'indigo', animated: step === 1 },
        ]}
      />
    </VisualizerFrame>
  );
};

'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveGraphCanvas,
  InteractiveMemoryCanvas,
} from '../shared/VisualizerEngine';

// 章节：模型序列化(ONNX)

// L1: ONNX 模型导出器
export const OnnxExportVisualizer: React.FC = () => {
  const [step, setStep] = useState(1);
  return (
    <VisualizerFrame
      title="PyTorch 动态图 → ONNX 跨框架静态计算图 IR"
      subtitle="通过 Tracing / Scripting 固化算子拓扑与张量 Shape，脱离 Python 解释器在 ORT / TensorRT 高速推理"
      badge="onnx_export"
      scenarios={[
        { label: 'PyTorch eager Python 图', summary: '受限于 Python GIL 与逐算子分发开销，边缘端难部署。' },
        { label: 'ONNX IR + OrtSession ✓', summary: '算子标准固化、支持 C++/Rust/WebGPU/TensorRT 跨平台一键加速。' },
      ]}
      activeScenario={step}
      onScenarioChange={setStep}
      metrics={[
        { label: '静态图运行时', value: step ? 'ONNX Runtime (C++ ✓)' : 'Python Eager', tone: step ? 'emerald' : 'amber' },
      ]}
    >
      <InteractiveGraphCanvas
        height={165}
        nodes={[
          { id: 'pt', x: 75, y: 82, label: 'PyTorch nn.Module', tone: 'indigo', shape: 'pill', active: true },
          { id: 'onnx', x: 205, y: 82, label: 'ONNX (.onnx)', sublabel: 'Opset IR 静态图', tone: 'cyan', shape: 'pill', active: step === 1 },
          { id: 'ort', x: 335, y: 82, label: 'ORT / TensorRT', tone: step ? 'emerald' : 'slate', shape: 'pill', active: step === 1 },
        ]}
        edges={[
          { from: 'pt', to: 'onnx', label: 'torch.onnx.export', tone: 'cyan', animated: step === 1 },
          { from: 'onnx', to: 'ort', label: 'ExecutionProvider', tone: step ? 'emerald' : 'slate', animated: step === 1 },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: ONNX 图优化
export const OnnxGraphFusionVisualizer: React.FC = () => {
  const [fused, setFused] = useState(1);
  return (
    <VisualizerFrame
      title="ONNX 图算子融合优化：Conv + BatchNorm + ReLU 合并为单 Kernel"
      subtitle="把常量折叠后的 BN 权重直接吸收进 Conv 权重，减少显存来回读写次数"
      badge="onnx_optimize"
      scenarios={[
        { label: '未融合 3 个独立 Kernel (慢)', summary: '三次独立 GPU Kernel 启动，且中间张量写回全局 HBM 显存两次！' },
        { label: 'Conv+BN+ReLU 单算子融合 ✓', summary: '常量折叠融合为单一算子 FusedConvRelu，消除中间访存瓶颈！' },
      ]}
      activeScenario={fused}
      onScenarioChange={setFused}
      metrics={[
        { label: 'GPU Kernel 启动次数', value: fused ? '1 次 ⚡' : '3 次', tone: fused ? 'emerald' : 'amber' },
        { label: '中间显存往返写回', value: fused ? '0 次 ✓' : '2 次 HBM 读写', tone: fused ? 'emerald' : 'rose' },
      ]}
    >
      <InteractiveMemoryCanvas
        tracks={[
          {
            name: fused ? 'Fused Kernel (快)' : 'Unfused 算子链',
            slots: fused
              ? [{ label: 'FusedConvBNReLU', sublabel: '寄存器原地激活', tone: 'emerald', pointer: '1x Launch' }]
              : [
                  { label: 'Conv2d', sublabel: '写显存', tone: 'amber' },
                  { label: 'BatchNorm', sublabel: '读写显存', tone: 'rose' },
                  { label: 'ReLU', sublabel: '读写显存', tone: 'rose' },
                ],
          },
        ]}
      />
    </VisualizerFrame>
  );
};

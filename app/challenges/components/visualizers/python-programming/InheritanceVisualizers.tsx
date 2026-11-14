'use client';

import React, { useState } from 'react';
import {
  VisualizerFrame,
  InteractiveVectorCanvas,
  InteractiveGraphCanvas,
} from '../shared/VisualizerEngine';

// 章节：继承

// L1: 缓存后端抽象与继承
export const CacheInheritanceVisualizer: React.FC = () => {
  const [impl, setImpl] = useState(0);
  return (
    <VisualizerFrame
      title="抽象基类 CacheBackend 方法解析顺序 (MRO)"
      subtitle="子类分别覆盖 get/set，共享基类的 get_or_compute 模板逻辑"
      badge="CacheBackend"
      scenarios={[
        { label: 'MemoryCache (dict)', summary: '命中本地字典内存，亚微秒延迟。' },
        { label: 'TTLCache (过期驱逐)', summary: '读取时校验 monotonic() - ts > ttl，超时自动失效。' },
      ]}
      activeScenario={impl}
      onScenarioChange={setImpl}
      metrics={[
        { label: '当前后端', value: impl === 0 ? 'MemoryCache' : 'TTLCache', tone: 'cyan' },
        { label: '共享基类逻辑', value: 'get_or_compute()', tone: 'emerald' },
      ]}
    >
      <InteractiveGraphCanvas
        height={175}
        nodes={[
          { id: 'base', x: 200, y: 36, label: 'ABC: CacheBackend', sublabel: 'get / set / get_or_compute', tone: 'indigo', shape: 'pill', active: true },
          { id: 'mem', x: 105, y: 125, label: 'MemoryCache', sublabel: 'dict 存储', tone: impl === 0 ? 'emerald' : 'slate', shape: 'pill', active: impl === 0 },
          { id: 'ttl', x: 295, y: 125, label: 'TTLCache', sublabel: '带过期时间戳', tone: impl === 1 ? 'emerald' : 'slate', shape: 'pill', active: impl === 1 },
        ]}
        edges={[
          { from: 'base', to: 'mem', label: '继承', tone: impl === 0 ? 'emerald' : 'slate', animated: impl === 0 },
          { from: 'base', to: 'ttl', label: '继承', tone: impl === 1 ? 'emerald' : 'slate', animated: impl === 1 },
        ]}
      />
    </VisualizerFrame>
  );
};

// L2: 形状面积计算
export const ShapeAreaInheritanceVisualizer: React.FC = () => {
  const [shape, setShape] = useState(0);
  const [param, setParam] = useState(2.2);
  const area = shape === 0 ? Math.PI * param * param : param * (param * 1.4);
  return (
    <VisualizerFrame
      title="Shape 几何继承层次与统一 area() 接口"
      subtitle="Circle 与 Rectangle 继承 Shape 抽象类，以同一 area() 契约求几何面积"
      badge="Shape"
      scenarios={[
        { label: 'Circle(r)', summary: `圆形面积 πr² = ${area.toFixed(2)}` },
        { label: 'Rectangle(w, h)', summary: `矩形面积 w×h = ${area.toFixed(2)}` },
      ]}
      activeScenario={shape}
      onScenarioChange={setShape}
      sliders={[{ label: shape === 0 ? '半径 r' : '基准宽 w', value: param, min: 1.0, max: 3.2, step: 0.2, onChange: setParam }]}
      metrics={[
        { label: '派生类', value: shape === 0 ? 'Circle' : 'Rectangle', tone: 'indigo' },
        { label: 'shape.area()', value: area.toFixed(2), tone: 'emerald' },
      ]}
    >
      <InteractiveVectorCanvas
        domainX={[-4, 4]}
        domainY={[-3.5, 3.5]}
        height={200}
        circles={shape === 0 ? [{ cx: 0, cy: 0, r: param, tone: 'cyan', label: `r=${param.toFixed(1)}` }] : []}
        polygons={
          shape === 1
            ? [
                {
                  points: [
                    [-param / 2, -(param * 0.7)],
                    [param / 2, -(param * 0.7)],
                    [param / 2, param * 0.7],
                    [-param / 2, param * 0.7],
                  ],
                  tone: 'emerald',
                  label: `${param.toFixed(1)}×${(param * 1.4).toFixed(1)}`,
                },
              ]
            : []
        }
      />
    </VisualizerFrame>
  );
};

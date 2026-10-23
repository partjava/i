import type React from 'react';

export type AlgorithmCategory =
  | '排序算法'
  | '查找算法'
  | '数据结构'
  | '数学可视化'
  | '机器学习';

export interface CameraPreset {
  position: [number, number, number];
  target: [number, number, number];
  fov?: number;
  autoOrbitSpeed?: number;
}

export interface LegendItem {
  color: string;
  label: string;
  glow?: boolean;
}

export interface AlgorithmMeta {
  id: string;
  name: string;
  icon: string;
  category: AlgorithmCategory;
  difficulty: '简单' | '中等' | '困难';
  needsData: boolean;
  cameraPreset: CameraPreset;
  legends: LegendItem[];
  complexity: string;
  principle: string;
  scenario: string;
}

export interface VisualizationStep {
  type: string;
  description: string;
  metrics?: Record<string, string | number>;
  [key: string]: any;
}

export interface AlgorithmVisualizerProps {
  algorithm: string;
  data: number[];
  speed?: number;
}

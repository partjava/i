import * as THREE from 'three';
import { VisualizationStep } from '../types';
import { createEnergyArc, createGlowingBeam, createHudBadge } from '../core/HudSpriteCache';

export function generateMachineLearningSteps(algorithm: string): VisualizationStep[] {
  switch (algorithm) {
    case 'kmeans':
      return genKMeans3DSteps();
    case 'linear-regression':
      return genLinearRegression3DSteps();
    case 'neural-network':
      return genNeuralNetwork3DSteps();
    case 'gradient-descent':
      return genGradientDescentRaceSteps();
    case 'decision-tree':
      return genDecisionTreeSteps();
    case 'svm':
      return genSvmKernelSteps();
    case 'pca':
      return genPca3DSteps();
    case 'transformer':
      return genTransformerAttentionSteps();
    default:
      return genKMeans3DSteps();
  }
}

export function renderMachineLearning(group: THREE.Group, step: VisualizationStep) {
  switch (step.type) {
    case 'ml-kmeans':
      renderKMeans3D(group, step);
      break;
    case 'ml-linreg-plane':
      renderLinearRegression3D(group, step);
      break;
    case 'ml-deep-nn':
      renderNeuralNetwork3D(group, step);
      break;
    case 'ml-gd-race':
      renderGradientDescentRace(group, step);
      break;
    case 'ml-cart-tree':
      renderCartDecisionTree(group, step);
      break;
    case 'ml-svm-kernel':
      renderSvmKernel(group, step);
      break;
    case 'ml-pca-3d':
      renderPca3D(group, step);
      break;
    case 'ml-transformer':
      renderTransformerAttention(group, step);
      break;
  }
}

// Deterministic pseudo-random helper so steps are reproducible
function seededRand(seed: number) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

// ============================================================================
// 1. K-Means 3D 高斯星云簇 + 半透明聚类包络球壳
// ============================================================================
function genKMeans3DSteps(): VisualizationStep[] {
  const trueCenters = [
    [-4.2, 3.8, -2.5],
    [4.4, 4.1, -2.2],
    [-3.8, 1.4, 3.2],
    [4.0, 1.6, 3.0],
  ];

  const points: { x: number; y: number; z: number; cluster: number }[] = [];
  let s = 1;
  trueCenters.forEach(([cx, cy, cz]) => {
    for (let i = 0; i < 22; i++) {
      const rx = (seededRand(s++) + seededRand(s++) - 1) * 2.1;
      const ry = (seededRand(s++) + seededRand(s++) - 1) * 1.6;
      const rz = (seededRand(s++) + seededRand(s++) - 1) * 2.1;
      points.push({ x: cx + rx, y: cy + ry, z: cz + rz, cluster: -1 });
    }
  });

  // Initial deliberately offset centroids
  let centroids = [
    { x: -1.2, y: 2.5, z: -0.8 },
    { x: 1.5, y: 2.8, z: -0.5 },
    { x: -1.0, y: 2.0, z: 1.2 },
    { x: 1.2, y: 2.1, z: 1.0 },
  ];

  const steps: VisualizationStep[] = [
    {
      type: 'ml-kmeans',
      points: points.map((p) => ({ ...p })),
      centroids: centroids.map((c) => ({ ...c })),
      radii: [1.2, 1.2, 1.2, 1.2],
      showLinks: false,
      description: '初始化 3D 特征空间：生成 88 个三维高斯星云样本点，在中心区域随机投放 K=4 个初始质心',
      metrics: { 聚类数K: 4, 样本总数N: points.length, 簇内误差SSE: '未分配' },
    },
  ];

  for (let iter = 1; iter <= 5; iter++) {
    // E-step: assign points to nearest centroid
    let sse = 0;
    points.forEach((p) => {
      let bestK = 0;
      let bestDist = Infinity;
      centroids.forEach((c, k) => {
        const d2 = (p.x - c.x) ** 2 + (p.y - c.y) ** 2 + (p.z - c.z) ** 2;
        if (d2 < bestDist) {
          bestDist = d2;
          bestK = k;
        }
      });
      p.cluster = bestK;
      sse += bestDist;
    });

    const calcRadii = (cs: typeof centroids) =>
      cs.map((c, k) => {
        const members = points.filter((p) => p.cluster === k);
        if (members.length === 0) return 1.2;
        const maxD = Math.max(
          ...members.map((m) => Math.hypot(m.x - c.x, m.y - c.y, m.z - c.z))
        );
        return Math.min(Math.max(maxD * 0.92, 1.4), 3.4);
      });

    steps.push({
      type: 'ml-kmeans',
      points: points.map((p) => ({ ...p })),
      centroids: centroids.map((c) => ({ ...c })),
      radii: calcRadii(centroids),
      showLinks: true,
      description: `第 ${iter} 轮 [E步 距离划分]：所有样本发射激光连向最近质心并染上对应簇色，当前总误差 SSE = ${sse.toFixed(1)}`,
      metrics: { 迭代轮次: `Iter ${iter} (E-Step)`, 簇内误差SSE: sse.toFixed(1), 聚类数K: 4 },
    });

    // M-step: recompute centroids
    const prevCentroids = centroids.map((c) => ({ ...c }));
    centroids = centroids.map((c, k) => {
      const members = points.filter((p) => p.cluster === k);
      if (members.length === 0) return c;
      const mx = members.reduce((acc, m) => acc + m.x, 0) / members.length;
      const my = members.reduce((acc, m) => acc + m.y, 0) / members.length;
      const mz = members.reduce((acc, m) => acc + m.z, 0) / members.length;
      return { x: mx, y: my, z: mz };
    });

    steps.push({
      type: 'ml-kmeans',
      points: points.map((p) => ({ ...p })),
      centroids: centroids.map((c) => ({ ...c })),
      prevCentroids,
      radii: calcRadii(centroids),
      showLinks: true,
      description: `第 ${iter} 轮 [M步 质心漂移]：4 个质心移向各簇三维几何均值中心，半透明聚类包络球同步收敛`,
      metrics: { 迭代轮次: `Iter ${iter} (M-Step)`, 簇内误差SSE: (sse * 0.72).toFixed(1), 状态: iter === 5 ? '已收敛' : '质心更新' },
    });
  }

  return steps;
}

function renderKMeans3D(group: THREE.Group, step: VisualizationStep) {
  const clusterPalette = [0xef4444, 0x10b981, 0x38bdf8, 0xeab308];
  const clusterHexStr = ['#ef4444', '#10b981', '#38bdf8', '#eab308'];

  const pts = step.points || [];
  const centroids = step.centroids || [];
  const radii = step.radii || [1.8, 1.8, 1.8, 1.8];

  // Render sample points & laser connection lines to centroid
  const linePositions: number[] = [];
  const lineColors: number[] = [];
  const colObj = new THREE.Color();

  pts.forEach((p: any) => {
    const k = p.cluster >= 0 ? p.cluster : 0;
    const col = p.cluster >= 0 ? clusterPalette[k] : 0x64748b;
    const dotGeo = new THREE.SphereGeometry(0.16, 14, 14);
    const dotMat = new THREE.MeshStandardMaterial({
      color: col,
      emissive: col,
      emissiveIntensity: 0.65,
    });
    const dot = new THREE.Mesh(dotGeo, dotMat);
    dot.position.set(p.x, p.y, p.z);
    group.add(dot);

    if (step.showLinks && p.cluster >= 0 && centroids[k]) {
      const c = centroids[k];
      linePositions.push(p.x, p.y, p.z, c.x, c.y, c.z);
      colObj.setHex(col);
      lineColors.push(colObj.r, colObj.g, colObj.b, colObj.r, colObj.g, colObj.b);
    }
  });

  if (linePositions.length > 0) {
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    lineGeo.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));
    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.36,
    });
    group.add(new THREE.LineSegments(lineGeo, lineMat));
  }

  // Render centroids + translucent cluster hull spheres
  centroids.forEach((c: any, k: number) => {
    const col = clusterPalette[k];
    const centerOrb = new THREE.Mesh(
      new THREE.SphereGeometry(0.45, 28, 28),
      new THREE.MeshStandardMaterial({
        color: col,
        emissive: col,
        emissiveIntensity: 1.0,
        metalness: 0.7,
        roughness: 0.15,
      })
    );
    centerOrb.position.set(c.x, c.y, c.z);
    group.add(centerOrb);

    // Translucent breathing cluster hull sphere
    const hullGeo = new THREE.SphereGeometry(radii[k] || 2.0, 24, 24);
    const hullMat = new THREE.MeshStandardMaterial({
      color: col,
      emissive: col,
      emissiveIntensity: 0.2,
      transparent: true,
      opacity: 0.12,
      roughness: 0.2,
      depthWrite: false,
    });
    const hull = new THREE.Mesh(hullGeo, hullMat);
    hull.position.set(c.x, c.y, c.z);
    group.add(hull);

    const count = pts.filter((p: any) => p.cluster === k).length;
    group.add(
      createHudBadge([c.x, c.y + 0.95, c.z], {
        text: `簇 #${k + 1}`,
        subText: `${count} 样本`,
        borderColor: clusterHexStr[k],
        scale: [1.75, 0.82],
      })
    );
  });
}

// ============================================================================
// 2. 3D 多元线性回归超平面 (ŷ = w₁x₁ + w₂x₂ + b) + 垂直残差能量柱
// ============================================================================
function genLinearRegression3DSteps(): VisualizationStep[] {
  // True plane: y = 0.38 * x + 0.26 * z + 2.6
  const trueW1 = 0.38;
  const trueW2 = 0.26;
  const trueB = 2.6;

  const samples: { x: number; z: number; y: number }[] = [];
  let seed = 10;
  for (let i = 0; i < 36; i++) {
    const x = (seededRand(seed++) - 0.5) * 11;
    const z = (seededRand(seed++) - 0.5) * 9;
    const noise = (seededRand(seed++) - 0.5) * 1.5;
    const y = trueW1 * x + trueW2 * z + trueB + noise;
    samples.push({ x, z, y });
  }

  const steps: VisualizationStep[] = [];
  const totalEpochs = 12;

  for (let ep = 0; ep <= totalEpochs; ep++) {
    const t = ep / totalEpochs;
    const ease = 1 - Math.pow(1 - t, 2.4);
    const w1 = -0.35 + (trueW1 - -0.35) * ease;
    const w2 = -0.28 + (trueW2 - -0.28) * ease;
    const b = 1.1 + (trueB - 1.1) * ease;

    let mse = 0;
    samples.forEach((s) => {
      const pred = w1 * s.x + w2 * s.z + b;
      mse += (s.y - pred) ** 2;
    });
    mse /= samples.length;

    steps.push({
      type: 'ml-linreg-plane',
      samples,
      w1,
      w2,
      b,
      mse,
      description: `Epoch ${ep}/${totalEpochs}：多元回归超平面 ŷ = ${w1.toFixed(2)}x₁ + ${w2.toFixed(2)}x₂ + ${b.toFixed(2)}，均方误差 MSE = ${mse.toFixed(3)}`,
      metrics: {
        回归平面参数: `w=(${w1.toFixed(2)}, ${w2.toFixed(2)}), b=${b.toFixed(2)}`,
        均方误差MSE: mse.toFixed(3),
        训练进度: `${Math.round(t * 100)}%`,
      },
    });
  }

  return steps;
}

function renderLinearRegression3D(group: THREE.Group, step: VisualizationStep) {
  const { samples, w1, w2, b } = step;

  // 1. Regression Hyperplane Mesh
  const planeGeo = new THREE.PlaneGeometry(13, 10.5, 16, 16);
  planeGeo.rotateX(-Math.PI / 2);
  const pos = planeGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    pos.setY(i, w1 * x + w2 * z + b);
  }
  planeGeo.computeVertexNormals();

  const planeMat = new THREE.MeshStandardMaterial({
    color: 0x6366f1,
    emissive: 0x4f46e5,
    emissiveIntensity: 0.35,
    transparent: true,
    opacity: 0.45,
    side: THREE.DoubleSide,
  });
  group.add(new THREE.Mesh(planeGeo, planeMat));

  const wireMat = new THREE.MeshBasicMaterial({
    color: 0x818cf8,
    wireframe: true,
    transparent: true,
    opacity: 0.5,
  });
  group.add(new THREE.Mesh(planeGeo.clone(), wireMat));

  // 2. Data points + vertical residual error bars
  samples.forEach((s: any) => {
    const predY = w1 * s.x + w2 * s.z + b;
    const err = Math.abs(s.y - predY);

    // Sample orb
    const orb = new THREE.Mesh(
      new THREE.SphereGeometry(0.22, 16, 16),
      new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x38bdf8,
        emissiveIntensity: 0.85,
      })
    );
    orb.position.set(s.x, s.y, s.z);
    group.add(orb);

    // Vertical residual energy bar connecting sample to plane
    const barCol = err > 1.1 ? 0xf43f5e : err > 0.55 ? 0xf59e0b : 0x10b981;
    const beam = createGlowingBeam(
      new THREE.Vector3(s.x, s.y, s.z),
      new THREE.Vector3(s.x, predY, s.z),
      0.04,
      barCol,
      0.85
    );
    group.add(beam);
  });
}

// ============================================================================
// 3. 5 层立体深度神经网络 (前向/反向传播光流脉冲 + Softmax 分类概率柱)
// ============================================================================
function genNeuralNetwork3DSteps(): VisualizationStep[] {
  const layerSizes = [4, 6, 8, 6, 3];
  const steps: VisualizationStep[] = [
    {
      type: 'ml-deep-nn',
      layerSizes,
      activeLayer: 0,
      phase: 'forward',
      probs: [0.34, 0.33, 0.33],
      loss: 1.098,
      description: '输入层 (4 维特征向量) 注入三维深度网络，准备沿突触矩阵执行前向传播 (Forward Pass)',
      metrics: { 当前阶段: '前向输入层 L0', 交叉熵Loss: '1.098', 预测最高类: '待计算' },
    },
    {
      type: 'ml-deep-nn',
      layerSizes,
      activeLayer: 1,
      phase: 'forward',
      probs: [0.42, 0.31, 0.27],
      loss: 0.92,
      description: '前向传播 L0 → L1 (6 神经元环阵)：线性加权 Z¹ = W¹X + b¹ 并通过 ReLU 激活函数点亮特征',
      metrics: { 当前阶段: '隐藏层 L1 (ReLU)', 激活神经元: '6/6', 交叉熵Loss: '0.920' },
    },
    {
      type: 'ml-deep-nn',
      layerSizes,
      activeLayer: 2,
      phase: 'forward',
      probs: [0.55, 0.28, 0.17],
      loss: 0.68,
      description: '前向传播 L1 → L2 (8 神经元高维特征环)：提取高阶非线性空间组合特征',
      metrics: { 当前阶段: '深层隐藏层 L2', 激活神经元: '8/8', 交叉熵Loss: '0.680' },
    },
    {
      type: 'ml-deep-nn',
      layerSizes,
      activeLayer: 3,
      phase: 'forward',
      probs: [0.68, 0.21, 0.11],
      loss: 0.45,
      description: '前向传播 L2 → L3 (6 神经元瓶颈层)：聚合判别语义特征向量',
      metrics: { 当前阶段: '聚合层 L3', 激活神经元: '6/6', 交叉熵Loss: '0.450' },
    },
    {
      type: 'ml-deep-nn',
      layerSizes,
      activeLayer: 4,
      phase: 'forward',
      probs: [0.76, 0.16, 0.08],
      loss: 0.31,
      description: '抵达输出层 L4 (Softmax 归一化)：输出三分类概率分布 [Cat: 76%, Dog: 16%, Bird: 8%]',
      metrics: { 当前阶段: 'Softmax 输出', 预测概率: 'Cat 76%', 交叉熵Loss: '0.310' },
    },
    {
      type: 'ml-deep-nn',
      layerSizes,
      activeLayer: 3,
      phase: 'backward',
      probs: [0.84, 0.11, 0.05],
      loss: 0.19,
      description: '反向传播 (Backprop L4 → L2)：计算误差梯度 ∂L/∂W，金色梯度脉冲逆流回传更新突触权重',
      metrics: { 当前阶段: '反向传播 ∂L/∂W', 梯度流向: 'L4 → L2', 交叉熵Loss: '0.190' },
    },
    {
      type: 'ml-deep-nn',
      layerSizes,
      activeLayer: 1,
      phase: 'backward',
      probs: [0.92, 0.06, 0.02],
      loss: 0.084,
      description: '反向传播完成全网参数更新 (W ← W - η∇W)！主分类通道强化，Cat 类别置信度跃升至 92%',
      metrics: { 当前阶段: '权重更新收敛', 预测概率: 'Cat 92%', 交叉熵Loss: '0.084' },
    },
  ];
  return steps;
}

function renderNeuralNetwork3D(group: THREE.Group, step: VisualizationStep) {
  const layerSizes: number[] = step.layerSizes || [4, 6, 8, 6, 3];
  const activeLayer: number = step.activeLayer ?? 0;
  const isBackprop = step.phase === 'backward';

  const layerPositions: THREE.Vector3[][] = [];
  const xStart = -7.2;
  const xStep = 3.2;

  layerSizes.forEach((count, lIdx) => {
    const x = xStart + lIdx * xStep;
    const pts: THREE.Vector3[] = [];
    if (lIdx === 0 || lIdx === layerSizes.length - 1) {
      // Vertical column for input and output layers
      const span = (count - 1) * 1.45;
      for (let i = 0; i < count; i++) {
        pts.push(new THREE.Vector3(x, 2.5 + i * 1.45 - span / 2, 0));
      }
    } else {
      // 3D cylindrical ring for hidden layers
      const radius = count === 8 ? 2.65 : 2.1;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        pts.push(
          new THREE.Vector3(
            x,
            2.5 + Math.cos(angle) * radius,
            Math.sin(angle) * radius
          )
        );
      }
    }
    layerPositions.push(pts);
  });

  // Draw synaptic connections
  for (let l = 0; l < layerPositions.length - 1; l++) {
    const currL = layerPositions[l];
    const nextL = layerPositions[l + 1];
    const isSignalWave =
      (!isBackprop && l === activeLayer - 1) || (isBackprop && l === activeLayer);

    const linePts: number[] = [];
    currL.forEach((p1, i) => {
      nextL.forEach((p2, j) => {
        if ((i + j) % 2 === 0 || isSignalWave) {
          linePts.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
        }
      });
    });

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePts, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: isSignalWave ? (isBackprop ? 0xf59e0b : 0x38bdf8) : 0x334155,
      transparent: true,
      opacity: isSignalWave ? 0.72 : 0.22,
    });
    group.add(new THREE.LineSegments(lineGeo, lineMat));
  }

  // Draw neurons
  layerPositions.forEach((pts, lIdx) => {
    const isCurrent = lIdx === activeLayer;
    const col = isCurrent
      ? isBackprop
        ? 0xf59e0b
        : 0x38bdf8
      : lIdx < activeLayer
      ? 0x6366f1
      : 0x475569;

    pts.forEach((pos) => {
      const orb = new THREE.Mesh(
        new THREE.SphereGeometry(isCurrent ? 0.38 : 0.28, 20, 20),
        new THREE.MeshStandardMaterial({
          color: col,
          emissive: col,
          emissiveIntensity: isCurrent ? 0.95 : 0.35,
          metalness: 0.6,
          roughness: 0.2,
        })
      );
      orb.position.copy(pos);
      group.add(orb);
    });
  });

  // Softmax Output Probability Bars on the right
  const probs: number[] = step.probs || [0.34, 0.33, 0.33];
  const labels = ['Cat', 'Dog', 'Bird'];
  const outNodes = layerPositions[layerPositions.length - 1];
  outNodes.forEach((pos, idx) => {
    const p = probs[idx] || 0;
    const barW = Math.max(0.3, p * 3.2);
    const barGeo = new THREE.BoxGeometry(barW, 0.42, 0.42);
    const isTop = idx === 0;
    const barCol = isTop ? 0x10b981 : 0x38bdf8;
    const bar = new THREE.Mesh(
      barGeo,
      new THREE.MeshStandardMaterial({
        color: barCol,
        emissive: barCol,
        emissiveIntensity: 0.75,
      })
    );
    bar.position.set(pos.x + 1.0 + barW / 2, pos.y, pos.z);
    group.add(bar);

    group.add(
      createHudBadge([pos.x + 1.4 + barW, pos.y, pos.z], {
        text: `${labels[idx]} ${(p * 100).toFixed(0)}%`,
        borderColor: isTop ? '#10b981' : '#38bdf8',
        scale: [1.85, 0.68],
      })
    );
  });
}

// ============================================================================
// 4. 梯度下降：连续三维损失地形 + SGD vs Adam 双优化器竞速
// ============================================================================
function lossHeight(x: number, z: number): number {
  // Elongated valley with gentle curvature toward global minimum at (3.2, 0)
  return 0.085 * (x - 3.2) ** 2 + 0.36 * z ** 2 + 0.35 * Math.cos(x * 0.8) + 0.6;
}

function genGradientDescentRaceSteps(): VisualizationStep[] {
  const sgdPath: [number, number, number][] = [];
  const adamPath: [number, number, number][] = [];

  const totalSteps = 14;
  for (let i = 0; i < totalSteps; i++) {
    const t = i / (totalSteps - 1);
    // SGD oscillates across the narrow Z valley walls while progressing slowly in X
    const sx = -5.2 + t * 7.2;
    const sz = Math.pow(1 - t, 0.85) * 3.4 * (i % 2 === 0 ? 1 : -1);
    sgdPath.push([sx, lossHeight(sx, sz) + 0.25, sz]);

    // Adam uses momentum & adaptive variance to damp Z oscillation and accelerate along X
    const ease = 1 - Math.pow(1 - t, 1.85);
    const ax = -5.2 + ease * 8.4;
    const az = Math.pow(1 - t, 2.2) * 3.2 * Math.cos(i * 0.9);
    adamPath.push([ax, lossHeight(ax, az) + 0.25, az]);
  }

  return sgdPath.map((_, idx) => {
    const sCurr = sgdPath[idx];
    const aCurr = adamPath[idx];
    return {
      type: 'ml-gd-race',
      sgdTrail: sgdPath.slice(0, idx + 1),
      adamTrail: adamPath.slice(0, idx + 1),
      description: `迭代步 ${idx + 1}/${totalSteps}：黄色 SGD 在狭长山谷两侧剧烈Z字震荡 (Loss=${(sCurr[1] - 0.25).toFixed(2)}) | 绿色 Adam 自适应动量直冲谷底 (Loss=${(aCurr[1] - 0.25).toFixed(2)})`,
      metrics: {
        'SGD 当前 Loss': (sCurr[1] - 0.25).toFixed(3),
        'Adam 当前 Loss': (aCurr[1] - 0.25).toFixed(3),
        优化器对比: 'Adam 收敛领先',
      },
    };
  });
}

function renderGradientDescentRace(group: THREE.Group, step: VisualizationStep) {
  const size = 13.5;
  const segs = 40;
  const geo = new THREE.PlaneGeometry(size, size, segs, segs);
  geo.rotateX(-Math.PI / 2);

  const pos = geo.attributes.position;
  const colors: number[] = [];
  const col = new THREE.Color();

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const y = lossHeight(x, z);
    pos.setY(i, y);

    const norm = Math.min(1, y / 7.5);
    col.setHSL(0.62 - norm * 0.48, 0.85, 0.28 + norm * 0.32);
    colors.push(col.r, col.g, col.b);
  }
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geo.computeVertexNormals();

  group.add(
    new THREE.Mesh(
      geo,
      new THREE.MeshStandardMaterial({
        vertexColors: true,
        metalness: 0.4,
        roughness: 0.35,
        transparent: true,
        opacity: 0.82,
        side: THREE.DoubleSide,
      })
    )
  );

  // Subtle wireframe contour overlay
  group.add(
    new THREE.Mesh(
      geo.clone(),
      new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.18,
      })
    )
  );

  // Global minimum target beacon at (3.2, 0)
  const minY = lossHeight(3.2, 0);
  const targetRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.65, 0.06, 16, 48),
    new THREE.MeshBasicMaterial({ color: 0xf43f5e })
  );
  targetRing.position.set(3.2, minY + 0.1, 0);
  targetRing.rotation.x = Math.PI / 2;
  group.add(targetRing);

  const renderOptimizerTrail = (
    trail: [number, number, number][],
    color: number,
    name: string,
    border: string
  ) => {
    if (!trail || trail.length === 0) return;
    if (trail.length > 1) {
      const pts = trail.map((p) => new THREE.Vector3(p[0], p[1], p[2]));
      const curve = new THREE.CatmullRomCurve3(pts);
      group.add(
        new THREE.Mesh(
          new THREE.TubeGeometry(curve, pts.length * 4, 0.08, 10, false),
          new THREE.MeshBasicMaterial({ color })
        )
      );
    }
    const curr = trail[trail.length - 1];
    const orb = new THREE.Mesh(
      new THREE.SphereGeometry(0.36, 24, 24),
      new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 1.0,
      })
    );
    orb.position.set(curr[0], curr[1], curr[2]);
    group.add(orb);

    group.add(
      createHudBadge([curr[0], curr[1] + 0.85, curr[2]], {
        text: name,
        subText: `L=${(curr[1] - 0.25).toFixed(2)}`,
        borderColor: border,
        scale: [1.85, 0.82],
      })
    );
  };

  renderOptimizerTrail(step.sgdTrail, 0xfbbf24, 'SGD', '#fbbf24');
  renderOptimizerTrail(step.adamTrail, 0x10b981, 'Adam', '#10b981');
}

// ============================================================================
// 5. CART 分类决策树 (特征阈值 + Gini 系数 + 样本分流动画)
// ============================================================================
function genDecisionTreeSteps(): VisualizationStep[] {
  const treeNodes = [
    { id: 0, label: 'X₁ ≤ 0.45', sub: 'Gini=0.48', x: 0, y: 5.5, z: 0 },
    { id: 1, label: 'X₂ ≤ 1.80', sub: 'Gini=0.32', x: -4.2, y: 3.1, z: 0.4, parent: 0 },
    { id: 2, label: 'X₃ ≤ 0.72', sub: 'Gini=0.29', x: 4.2, y: 3.1, z: -0.4, parent: 0 },
    { id: 3, label: '类别 A (96%)', sub: 'Gini=0.04', x: -6.4, y: 0.6, z: 0.8, parent: 1, isLeaf: true },
    { id: 4, label: '类别 B (91%)', sub: 'Gini=0.08', x: -2.0, y: 0.6, z: 0.2, parent: 1, isLeaf: true },
    { id: 5, label: '类别 B (89%)', sub: 'Gini=0.11', x: 2.0, y: 0.6, z: -0.2, parent: 2, isLeaf: true },
    { id: 6, label: '类别 C (98%)', sub: 'Gini=0.02', x: 6.4, y: 0.6, z: -0.8, parent: 2, isLeaf: true },
  ];

  const paths = [
    { path: [0], desc: '注入测试样本 #1 (X₁=0.28, X₂=1.20)：在根节点检验 X₁ ≤ 0.45 成立，准备走左分支' },
    { path: [0, 1], desc: '样本 #1 滑入左内部节点：检验特征 X₂=1.20 ≤ 1.80 成立，继续向左路由' },
    { path: [0, 1, 3], desc: '样本 #1 落入高纯度叶节点 [类别 A · 置信度 96%]（Gini = 0.04）！' },
    { path: [0, 2], desc: '注入测试样本 #2 (X₁=0.82, X₃=0.95)：根节点 X₁ > 0.45 路由至右子树节点 2' },
    { path: [0, 2, 6], desc: '样本 #2 在节点 2 判定 X₃ > 0.72，精准分流至右侧叶节点 [类别 C · 置信度 98%]！' },
  ];

  return paths.map((p, idx) => ({
    type: 'ml-cart-tree',
    nodes: treeNodes,
    activePath: p.path,
    description: p.desc,
    metrics: {
      分裂准则: 'CART Gini 最小化',
      当前路由深度: p.path.length,
      测试批次: `Sample #${idx < 3 ? 1 : 2}`,
    },
  }));
}

function renderCartDecisionTree(group: THREE.Group, step: VisualizationStep) {
  const nodes: any[] = step.nodes || [];
  const activeSet = new Set<number>(step.activePath || []);
  const lastActive = step.activePath?.[step.activePath.length - 1];

  nodes.forEach((n) => {
    if (n.parent !== undefined) {
      const p = nodes[n.parent];
      const isRoute = activeSet.has(n.id) && activeSet.has(n.parent);
      group.add(
        createGlowingBeam(
          new THREE.Vector3(p.x, p.y, p.z),
          new THREE.Vector3(n.x, n.y, n.z),
          isRoute ? 0.11 : 0.055,
          isRoute ? 0xfbbf24 : 0x475569,
          0.9
        )
      );
    }
  });

  nodes.forEach((n) => {
    const isHit = activeSet.has(n.id);
    const col = n.isLeaf
      ? isHit
        ? 0x10b981
        : 0x0ea5e9
      : isHit
      ? 0xfbbf24
      : 0xec4899;

    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(n.id === lastActive ? 0.58 : 0.45, 28, 28),
      new THREE.MeshStandardMaterial({
        color: col,
        emissive: col,
        emissiveIntensity: isHit ? 0.95 : 0.35,
      })
    );
    mesh.position.set(n.x, n.y, n.z);
    group.add(mesh);

    group.add(
      createHudBadge([n.x, n.y + 1.1, n.z], {
        text: n.label,
        subText: n.sub,
        borderColor: isHit ? '#fbbf24' : n.isLeaf ? '#34d399' : '#f472b6',
        scale: [2.35, 0.92],
      })
    );
  });
}

// ============================================================================
// 6. SVM 支持向量机 (3D RBF 高斯核函数升维超平面分割)
// ============================================================================
function genSvmKernelSteps(): VisualizationStep[] {
  const pts: { x: number; z: number; r2: number; label: 1 | -1; isSV: boolean }[] = [];
  let s = 100;
  // Inner positive ring (+1)
  for (let i = 0; i < 24; i++) {
    const angle = (i / 24) * Math.PI * 2;
    const rad = 1.4 + (seededRand(s++) - 0.5) * 0.7;
    const x = Math.cos(angle) * rad;
    const z = Math.sin(angle) * rad;
    pts.push({ x, z, r2: x * x + z * z, label: 1, isSV: rad > 1.55 });
  }
  // Outer negative ring (-1)
  for (let i = 0; i < 32; i++) {
    const angle = (i / 32) * Math.PI * 2;
    const rad = 4.2 + (seededRand(s++) - 0.5) * 1.1;
    const x = Math.cos(angle) * rad;
    const z = Math.sin(angle) * rad;
    pts.push({ x, z, r2: x * x + z * z, label: -1, isSV: rad < 3.85 });
  }

  const liftLevels = [0, 0.35, 0.7, 1.0, 1.0, 1.0];
  return liftLevels.map((lift, idx) => ({
    type: 'ml-svm-kernel',
    pts,
    lift,
    showPlane: idx >= 3,
    showMargin: idx >= 4,
    description:
      idx === 0
        ? '原始 2D 特征平面：内圈红点 (+1) 被外圈蓝点 (-1) 360° 包围，二维平面不存在任何直线能将其线性切分'
        : idx <= 2
        ? `RBF 高斯核映射升维 (进度 ${(lift * 100).toFixed(0)}%)：通过 φ(x) = exp(-γ||x||²) 将内圈正样本沿三维高度轴向上顶起！`
        : idx === 3
        ? '核升维完成！在三维特征空间插入绿色最大间隔超平面 (Maximum-Margin Hyperplane)，一刀完美切分正负类！'
        : '锁定金色支持向量 (Support Vectors) 并构建上下平行间隔边界平面 Margin = 2 / ||w||',
    metrics: {
      核函数: 'RBF K(x,z)=exp(-γ||x-z||²)',
      升维幅度: `${(lift * 100).toFixed(0)}%`,
      线性可分性: idx >= 3 ? '3D 超平面完美切分' : '2D 不可分',
    },
  }));
}

function renderSvmKernel(group: THREE.Group, step: VisualizationStep) {
  const { pts, lift, showPlane, showMargin } = step;

  pts.forEach((p: any) => {
    const y = 0.4 + lift * 4.5 * Math.exp(-0.18 * p.r2);
    const col = p.label === 1 ? 0xf43f5e : 0x38bdf8;
    const orb = new THREE.Mesh(
      new THREE.SphereGeometry(p.isSV && showMargin ? 0.32 : 0.24, 20, 20),
      new THREE.MeshStandardMaterial({
        color: col,
        emissive: col,
        emissiveIntensity: 0.85,
      })
    );
    orb.position.set(p.x, y, p.z);
    group.add(orb);

    if (p.isSV && showMargin) {
      const halo = new THREE.Mesh(
        new THREE.TorusGeometry(0.48, 0.045, 12, 36),
        new THREE.MeshBasicMaterial({ color: 0xfbbf24 })
      );
      halo.position.set(p.x, y, p.z);
      halo.rotation.x = Math.PI / 2;
      group.add(halo);
    }
  });

  if (showPlane) {
    const planeGeo = new THREE.PlaneGeometry(11.5, 11.5, 16, 16);
    planeGeo.rotateX(-Math.PI / 2);
    const planeMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x10b981,
      emissiveIntensity: 0.45,
      transparent: true,
      opacity: 0.42,
      side: THREE.DoubleSide,
    });
    const plane = new THREE.Mesh(planeGeo, planeMat);
    plane.position.y = 2.35;
    group.add(plane);

    if (showMargin) {
      [1.85, 2.85].forEach((my) => {
        const mWire = new THREE.Mesh(
          planeGeo.clone(),
          new THREE.MeshBasicMaterial({
            color: 0xfbbf24,
            wireframe: true,
            transparent: true,
            opacity: 0.32,
          })
        );
        mWire.position.y = my;
        group.add(mWire);
      });
    }
  }
}

// ============================================================================
// 7. PCA 主成分分析 (3D 点云协方差特征向量与 2D 降维正交投影)
// ============================================================================
function genPca3DSteps(): VisualizationStep[] {
  const rawPts: { x: number; y: number; z: number; px: number; py: number; pz: number }[] = [];
  let s = 200;
  for (let i = 0; i < 48; i++) {
    const u = (seededRand(s++) - 0.5) * 9.5; // Major axis PC1
    const v = (seededRand(s++) - 0.5) * 4.2; // Second axis PC2
    const w = (seededRand(s++) - 0.5) * 1.8; // Minor noise axis PC3

    // Rotate tilted into 3D space
    const x = u * 0.86 - w * 0.3;
    const y = 2.8 + u * 0.42 + w * 0.85;
    const z = v;

    // Projected onto PC1-PC2 plane (w = 0)
    const px = u * 0.86;
    const py = 2.8 + u * 0.42;
    const pz = v;
    rawPts.push({ x, y, z, px, py, pz });
  }

  const phases = [
    { proj: 0, showAxes: false, desc: '步骤 1：原始三维高相关性椭球点云（存在冗余维度与噪声方差）' },
    { proj: 0, showAxes: true, desc: '步骤 2：求解协方差矩阵 Σ=XᵀX/N 特征向量，锁定最大方差主轴 PC₁ (68.4%) 与次主轴 PC₂ (24.1%)' },
    { proj: 0.45, showAxes: true, desc: '步骤 3：展开 PC₁-PC₂ 主成分子空间平面，所有 3D 样本发射正交激光向主平面投影压缩' },
    { proj: 1.0, showAxes: true, desc: '步骤 4：三维点云成功降维至 2D 主成分平面！仅用 2 个维度即保留 92.5% 原始信息量' },
  ];

  return phases.map((ph) => ({
    type: 'ml-pca-3d',
    pts: rawPts,
    proj: ph.proj,
    showAxes: ph.showAxes,
    description: ph.desc,
    metrics: {
      'PC₁ 方差贡献率': '68.4%',
      'PC₂ 方差贡献率': '24.1%',
      累计保留信息: '92.5% (3D→2D)',
    },
  }));
}

function renderPca3D(group: THREE.Group, step: VisualizationStep) {
  const { pts, proj, showAxes } = step;

  if (showAxes) {
    // PC1 major eigenvector axis
    group.add(
      createGlowingBeam(
        new THREE.Vector3(-4.8 * 0.86, 2.8 - 4.8 * 0.42, 0),
        new THREE.Vector3(4.8 * 0.86, 2.8 + 4.8 * 0.42, 0),
        0.1,
        0xf43f5e,
        0.95
      )
    );
    group.add(
      createHudBadge([4.8 * 0.86 + 0.8, 2.8 + 4.8 * 0.42 + 0.5, 0], {
        text: '主轴 PC₁ (68.4%)',
        borderColor: '#f43f5e',
        scale: [2.2, 0.78],
      })
    );

    // PC2 orthogonal eigenvector axis
    group.add(
      createGlowingBeam(
        new THREE.Vector3(0, 2.8, -3.5),
        new THREE.Vector3(0, 2.8, 3.5),
        0.085,
        0x38bdf8,
        0.95
      )
    );
    group.add(
      createHudBadge([0, 3.4, 3.8], {
        text: '次轴 PC₂ (24.1%)',
        borderColor: '#38bdf8',
        scale: [2.2, 0.78],
      })
    );
  }

  pts.forEach((p: any) => {
    const cx = p.x + (p.px - p.x) * proj;
    const cy = p.y + (p.py - p.y) * proj;
    const cz = p.z + (p.pz - p.z) * proj;

    const col = proj > 0.8 ? 0x10b981 : 0xa855f7;
    const orb = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 16, 16),
      new THREE.MeshStandardMaterial({
        color: col,
        emissive: col,
        emissiveIntensity: 0.8,
      })
    );
    orb.position.set(cx, cy, cz);
    group.add(orb);

    if (proj > 0 && proj < 1) {
      group.add(
        createGlowingBeam(
          new THREE.Vector3(p.x, p.y, p.z),
          new THREE.Vector3(p.px, p.py, p.pz),
          0.025,
          0x10b981,
          0.55
        )
      );
    }
  });
}

// ============================================================================
// 8. Transformer 自注意力机制 (Self-Attention QKᵀ 权重矩阵与语义能量拱桥)
// ============================================================================
function genTransformerAttentionSteps(): VisualizationStep[] {
  const tokens = ['小猫', '追逐', '发光', '蝴蝶', '穿过', '花园'];
  const weights: number[][] = [
    [0.52, 0.24, 0.04, 0.12, 0.04, 0.04],
    [0.28, 0.36, 0.06, 0.22, 0.05, 0.03],
    [0.04, 0.06, 0.38, 0.46, 0.03, 0.03],
    [0.18, 0.22, 0.32, 0.20, 0.04, 0.04],
    [0.14, 0.26, 0.04, 0.16, 0.22, 0.18],
    [0.08, 0.06, 0.04, 0.12, 0.28, 0.42],
  ];

  return tokens.map((tok, qIdx) => {
    const row = weights[qIdx];
    const maxW = Math.max(...row);
    const topKIdx = row.indexOf(maxW);
    return {
      type: 'ml-transformer',
      tokens,
      weights,
      activeQuery: qIdx,
      description: `聚焦 Query Token "${tok}"：计算 softmax(Q_${tok} · Kᵀ / √d_k)，最强注意力语义拱桥指向 "${tokens[topKIdx]}" (权重 ${(maxW * 100).toFixed(0)}%)`,
      metrics: {
        当前Query词: `"${tok}"`,
        最高关注Key: `"${tokens[topKIdx]}" (${(maxW * 100).toFixed(0)}%)`,
        注意力缩放: '1 / √d_k',
      },
    };
  });
}

function renderTransformerAttention(group: THREE.Group, step: VisualizationStep) {
  const tokens: string[] = step.tokens || [];
  const weights: number[][] = step.weights || [];
  const qIdx: number = step.activeQuery ?? 0;

  const n = tokens.length;
  const spacing = 2.15;
  const offset = ((n - 1) * spacing) / 2;

  const tokenPositions: THREE.Vector3[] = [];

  // 1. Render Token embeddings along upper arc
  tokens.forEach((tok, i) => {
    const x = i * spacing - offset;
    const y = 3.2;
    const z = -2.2;
    const pos = new THREE.Vector3(x, y, z);
    tokenPositions.push(pos);

    const isQuery = i === qIdx;
    const attWeight = weights[qIdx]?.[i] ?? 0;
    const col = isQuery ? 0xf59e0b : attWeight > 0.2 ? 0x10b981 : 0x38bdf8;

    const box = new THREE.Mesh(
      new THREE.BoxGeometry(1.35, 0.65, 0.65),
      new THREE.MeshStandardMaterial({
        color: col,
        emissive: col,
        emissiveIntensity: isQuery ? 0.95 : 0.4 + attWeight,
        metalness: 0.6,
        roughness: 0.2,
      })
    );
    box.position.copy(pos);
    group.add(box);

    group.add(
      createHudBadge([x, y + 1.05, z], {
        text: tok,
        subText: isQuery ? 'QUERY' : `${(attWeight * 100).toFixed(0)}%`,
        borderColor: isQuery ? '#fbbf24' : attWeight > 0.2 ? '#10b981' : '#38bdf8',
        scale: [1.75, 0.85],
      })
    );
  });

  // 2. Render arched Self-Attention bridges from activeQuery to all Key tokens
  const qPos = tokenPositions[qIdx];
  if (qPos && weights[qIdx]) {
    weights[qIdx].forEach((w, kIdx) => {
      if (w < 0.06) return;
      const kPos = tokenPositions[kIdx];
      const arcH = 1.2 + Math.abs(qIdx - kIdx) * 0.55;
      const col = w > 0.22 ? 0xf59e0b : 0x38bdf8;
      group.add(createEnergyArc(qPos, kPos, arcH, col, 0.03 + w * 0.18, 0.92));
    });
  }

  // 3. Render bottom 6×6 Attention Weight Heatmap Crystal Matrix
  const cellSpacing = 1.15;
  const matOffset = ((n - 1) * cellSpacing) / 2;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      const w = weights[r]?.[c] ?? 0;
      const h = 0.18 + w * 2.2;
      const x = c * cellSpacing - matOffset;
      const z = 1.6 + (r * cellSpacing - matOffset) * 0.65;
      const isActiveRow = r === qIdx;

      const col = isActiveRow ? (w > 0.2 ? 0xf59e0b : 0xa855f7) : 0x334155;
      const bar = new THREE.Mesh(
        new THREE.BoxGeometry(0.85, h, 0.55),
        new THREE.MeshStandardMaterial({
          color: col,
          emissive: col,
          emissiveIntensity: isActiveRow ? 0.75 : 0.15,
        })
      );
      bar.position.set(x, h / 2, z);
      group.add(bar);
    }
  }
}

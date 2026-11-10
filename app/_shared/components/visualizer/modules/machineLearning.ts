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
// 1. K-Means 3D 高斯星云簇 + 质心漂移轨迹管 + 半透明聚类包络球壳
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

  const centroidHistory: Array<Array<{ x: number; y: number; z: number }>> = [
    centroids.map((c) => ({ ...c })),
  ];

  const steps: VisualizationStep[] = [
    {
      type: 'ml-kmeans',
      points: points.map((p) => ({ ...p })),
      centroids: centroids.map((c) => ({ ...c })),
      centroidHistory: centroidHistory.map((h) => h.map((c) => ({ ...c }))),
      radii: [1.2, 1.2, 1.2, 1.2],
      showLinks: false,
      description:
        '初始化 3D 特征空间：生成 88 个三维高斯星云样本点，在中心区域投放 K=4 个初始质心 μ₁..μ₄',
      metrics: { 聚类数K: 4, 样本总数N: points.length, 畸变代价J: '待计算' },
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
      centroidHistory: centroidHistory.map((h) => h.map((c) => ({ ...c }))),
      radii: calcRadii(centroids),
      showLinks: true,
      description: `第 ${iter} 轮 [E步 Voronoi 划分]：计算 ||xᵢ - μₖ||₂²，所有样本发射激光连向最近质心，当前畸变误差 J = ${sse.toFixed(1)}`,
      metrics: { 迭代阶段: `Iter ${iter} (E步)`, 畸变代价J: sse.toFixed(1), 聚类数K: 4 },
    });

    // M-step: recompute centroids
    const prevCentroids = centroids.map((c) => ({ ...c }));
    let totalShift = 0;
    centroids = centroids.map((c, k) => {
      const members = points.filter((p) => p.cluster === k);
      if (members.length === 0) return c;
      const mx = members.reduce((acc, m) => acc + m.x, 0) / members.length;
      const my = members.reduce((acc, m) => acc + m.y, 0) / members.length;
      const mz = members.reduce((acc, m) => acc + m.z, 0) / members.length;
      totalShift += Math.hypot(mx - c.x, my - c.y, mz - c.z);
      return { x: mx, y: my, z: mz };
    });
    centroidHistory.push(centroids.map((c) => ({ ...c })));

    steps.push({
      type: 'ml-kmeans',
      points: points.map((p) => ({ ...p })),
      centroids: centroids.map((c) => ({ ...c })),
      prevCentroids,
      centroidHistory: centroidHistory.map((h) => h.map((c) => ({ ...c }))),
      radii: calcRadii(centroids),
      showLinks: true,
      description: `第 ${iter} 轮 [M步 质心漂移]：μₖ ← (1/|Cₖ|)∑x，4 个质心沿发光轨迹漂移 Δμ=${totalShift.toFixed(2)}，包络球同步收敛`,
      metrics: {
        迭代阶段: `Iter ${iter} (M步)`,
        畸变代价J: (sse * 0.72).toFixed(1),
        质心位移Δμ: totalShift.toFixed(2),
      },
    });
  }

  return steps;
}

function renderKMeans3D(group: THREE.Group, step: VisualizationStep) {
  const clusterPalette = [0xef4444, 0x10b981, 0x38bdf8, 0xeab308];
  const clusterHexStr = ['#ef4444', '#10b981', '#38bdf8', '#eab308'];

  const pts = step.points || [];
  const centroids = step.centroids || [];
  const history: Array<Array<{ x: number; y: number; z: number }>> =
    step.centroidHistory || [];
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
      emissiveIntensity: 0.7,
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
      opacity: 0.38,
    });
    group.add(new THREE.LineSegments(lineGeo, lineMat));
  }

  // Render Centroid Drift Trajectory Tubes across iterations
  if (history.length > 1) {
    for (let k = 0; k < 4; k++) {
      const trailPts = history
        .map((frame) => frame[k])
        .filter(Boolean)
        .map((c) => new THREE.Vector3(c.x, c.y, c.z));
      if (trailPts.length >= 2) {
        const curve = new THREE.CatmullRomCurve3(trailPts);
        group.add(
          new THREE.Mesh(
            new THREE.TubeGeometry(curve, trailPts.length * 6, 0.065, 10, false),
            new THREE.MeshBasicMaterial({
              color: clusterPalette[k],
              transparent: true,
              opacity: 0.85,
            })
          )
        );
      }
    }
  }

  // Render centroids + translucent cluster hull spheres + floor Voronoi projection rings
  centroids.forEach((c: any, k: number) => {
    const col = clusterPalette[k];
    const centerOrb = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.52, 2),
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

    // Outer rotating ring around centroid
    const halo = new THREE.Mesh(
      new THREE.TorusGeometry(0.72, 0.04, 12, 36),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.75 })
    );
    halo.position.set(c.x, c.y, c.z);
    halo.rotation.x = Math.PI / 3;
    group.add(halo);

    // Floor projection ring & vertical anchor line
    const floorRing = new THREE.Mesh(
      new THREE.RingGeometry(0.45, 0.62, 32),
      new THREE.MeshBasicMaterial({
        color: col,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.45,
      })
    );
    floorRing.rotation.x = -Math.PI / 2;
    floorRing.position.set(c.x, 0.03, c.z);
    group.add(floorRing);

    group.add(
      createGlowingBeam(
        new THREE.Vector3(c.x, 0.03, c.z),
        new THREE.Vector3(c.x, c.y, c.z),
        0.025,
        col,
        0.35
      )
    );

    // Translucent breathing cluster hull sphere
    const hullGeo = new THREE.SphereGeometry(radii[k] || 2.0, 24, 24);
    const hullMat = new THREE.MeshStandardMaterial({
      color: col,
      emissive: col,
      emissiveIntensity: 0.22,
      transparent: true,
      opacity: 0.13,
      roughness: 0.2,
      depthWrite: false,
    });
    const hull = new THREE.Mesh(hullGeo, hullMat);
    hull.position.set(c.x, c.y, c.z);
    group.add(hull);

    const count = pts.filter((p: any) => p.cluster === k).length;
    group.add(
      createHudBadge([c.x, c.y + 1.05, c.z], {
        text: `μ${k + 1} (${count}点)`,
        subText: `(${c.x.toFixed(1)}, ${c.y.toFixed(1)}, ${c.z.toFixed(1)})`,
        borderColor: clusterHexStr[k],
        scale: [2.1, 0.88],
      })
    );
  });
}

// ============================================================================
// 2. 3D 多元线性回归超平面 (ŷ = w₁x₁ + w₂x₂ + b) + 法向量指示箭 + 垂直残差能量柱
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
  const mseHistory: number[] = [];

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
    mseHistory.push(mse);

    steps.push({
      type: 'ml-linreg-plane',
      samples,
      w1,
      w2,
      b,
      mse,
      mseHistory: [...mseHistory],
      description: `Epoch ${ep}/${totalEpochs}：多元回归超平面 ŷ = ${w1.toFixed(2)}x₁ + ${w2.toFixed(2)}x₂ + ${b.toFixed(2)}，法向量倾角自适应旋转，均方误差 MSE = ${mse.toFixed(3)}`,
      metrics: {
        回归超平面: `ŷ=${w1.toFixed(2)}x₁+${w2.toFixed(2)}x₂+${b.toFixed(2)}`,
        均方误差MSE: mse.toFixed(3),
        收敛进度: `${Math.round(t * 100)}%`,
      },
    });
  }

  return steps;
}

function renderLinearRegression3D(group: THREE.Group, step: VisualizationStep) {
  const { samples, w1, w2, b, mse } = step;

  // 1. 3D Coordinate Axes Reference Labels
  group.add(
    createGlowingBeam(
      new THREE.Vector3(-6.8, 0.05, -5.5),
      new THREE.Vector3(6.8, 0.05, -5.5),
      0.04,
      0x38bdf8,
      0.7
    )
  );
  group.add(
    createHudBadge([7.2, 0.4, -5.5], {
      text: '特征 X₁',
      borderColor: '#38bdf8',
      scale: [1.5, 0.65],
    })
  );
  group.add(
    createGlowingBeam(
      new THREE.Vector3(-6.8, 0.05, -5.5),
      new THREE.Vector3(-6.8, 0.05, 5.5),
      0.04,
      0xa855f7,
      0.7
    )
  );
  group.add(
    createHudBadge([-6.8, 0.4, 6.1], {
      text: '特征 X₂',
      borderColor: '#a855f7',
      scale: [1.5, 0.65],
    })
  );

  // 2. Regression Hyperplane Mesh
  const planeGeo = new THREE.PlaneGeometry(13, 10.5, 18, 18);
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
    emissiveIntensity: 0.38,
    transparent: true,
    opacity: 0.46,
    side: THREE.DoubleSide,
  });
  group.add(new THREE.Mesh(planeGeo, planeMat));

  const wireMat = new THREE.MeshBasicMaterial({
    color: 0x818cf8,
    wireframe: true,
    transparent: true,
    opacity: 0.52,
  });
  group.add(new THREE.Mesh(planeGeo.clone(), wireMat));

  // 3. Plane Normal Vector Arrow n = (-w1, 1, -w2) at center (0, b, 0)
  const normVec = new THREE.Vector3(-w1, 1, -w2).normalize().multiplyScalar(2.4);
  const centerPt = new THREE.Vector3(0, b, 0);
  const normalTip = centerPt.clone().add(normVec);
  group.add(createGlowingBeam(centerPt, normalTip, 0.08, 0xfbbf24, 0.95));
  group.add(
    createHudBadge([normalTip.x, normalTip.y + 0.55, normalTip.z], {
      text: `法向量 n`,
      subText: `MSE=${Number(mse).toFixed(3)}`,
      borderColor: '#fbbf24',
      scale: [2.0, 0.85],
    })
  );

  // 4. Data points + vertical residual error bars (e_i = y_i - y_hat_i)
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

    // Orthogonal projection dot on the hyperplane
    const projDot = new THREE.Mesh(
      new THREE.SphereGeometry(0.11, 10, 10),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    projDot.position.set(s.x, predY, s.z);
    group.add(projDot);

    // Vertical residual energy bar connecting sample to plane
    const barCol = err > 1.1 ? 0xf43f5e : err > 0.55 ? 0xf59e0b : 0x10b981;
    const beam = createGlowingBeam(
      new THREE.Vector3(s.x, s.y, s.z),
      new THREE.Vector3(s.x, predY, s.z),
      0.042,
      barCol,
      0.88
    );
    group.add(beam);
  });
}

// ============================================================================
// 3. 5 层立体深度神经网络 (前向/反向传播光流脉冲球 + 层级底座标牌 + Softmax 概率柱)
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
      description:
        '输入层 x ∈ ℝ⁴ 特征张量注入三维深度神经网络，准备沿突触权重矩阵 W⁽¹⁾ 执行前向传播',
      metrics: { 当前阶段: '输入层 L0 (x∈ℝ⁴)', 交叉熵Loss: '1.098', 预测最高类: '待计算' },
    },
    {
      type: 'ml-deep-nn',
      layerSizes,
      activeLayer: 1,
      phase: 'forward',
      probs: [0.42, 0.31, 0.27],
      loss: 0.92,
      description:
        '前向传播 L0 → L1 (6 神经元环阵)：仿射变换 z⁽¹⁾ = W⁽¹⁾x + b⁽¹⁾ 并经 ReLU(z) 非线性激活点亮',
      metrics: { 当前阶段: '隐藏层 L1 (ReLU)', 激活神经元: '6/6', 交叉熵Loss: '0.920' },
    },
    {
      type: 'ml-deep-nn',
      layerSizes,
      activeLayer: 2,
      phase: 'forward',
      probs: [0.55, 0.28, 0.17],
      loss: 0.68,
      description:
        '前向传播 L1 → L2 (8 神经元高维特征环)：经 GELU 激活提取高阶空间交叉特征表征 a⁽²⁾',
      metrics: { 当前阶段: '高维层 L2 (GELU)', 激活神经元: '8/8', 交叉熵Loss: '0.680' },
    },
    {
      type: 'ml-deep-nn',
      layerSizes,
      activeLayer: 3,
      phase: 'forward',
      probs: [0.68, 0.21, 0.11],
      loss: 0.45,
      description:
        '前向传播 L2 → L3 (6 神经元语义瓶颈层)：压缩冗余维度并聚合高判别力语义嵌入向量 a⁽³⁾',
      metrics: { 当前阶段: '瓶颈层 L3 (ReLU)', 激活神经元: '6/6', 交叉熵Loss: '0.450' },
    },
    {
      type: 'ml-deep-nn',
      layerSizes,
      activeLayer: 4,
      phase: 'forward',
      probs: [0.76, 0.16, 0.08],
      loss: 0.31,
      description:
        '抵达输出层 L4 (Softmax 归一化)：p_k = exp(z_k)/∑exp(z_j)，输出概率 [Cat: 76%, Dog: 16%, Bird: 8%]',
      metrics: { 当前阶段: 'Softmax 输出层', 预测概率: 'Cat 76%', 交叉熵Loss: '0.310' },
    },
    {
      type: 'ml-deep-nn',
      layerSizes,
      activeLayer: 3,
      phase: 'backward',
      probs: [0.84, 0.11, 0.05],
      loss: 0.19,
      description:
        '反向传播 (Backprop L4 → L2)：顶层梯度 δ⁽⁴⁾ = p - y，沿链式法则逆流回传金色误差脉冲 ∂L/∂W',
      metrics: { 当前阶段: '反向传播 δ⁽ˡ⁾', 梯度流向: 'L4 → L2', 交叉熵Loss: '0.190' },
    },
    {
      type: 'ml-deep-nn',
      layerSizes,
      activeLayer: 1,
      phase: 'backward',
      probs: [0.92, 0.06, 0.02],
      loss: 0.084,
      description:
        '全网突触权重更新完成 (W ← W - η∇W)！主判别通路强化，目标类别 Cat 置信度跃升至 92%！',
      metrics: { 当前阶段: '参数更新收敛', 预测概率: 'Cat 92%', 交叉熵Loss: '0.084' },
    },
  ];
  return steps;
}

function renderNeuralNetwork3D(group: THREE.Group, step: VisualizationStep) {
  const layerSizes: number[] = step.layerSizes || [4, 6, 8, 6, 3];
  const activeLayer: number = step.activeLayer ?? 0;
  const isBackprop = step.phase === 'backward';
  const layerTitles = ['L0 输入 x', 'L1 ReLU', 'L2 GELU', 'L3 瓶颈', 'L4 Softmax'];

  const layerPositions: THREE.Vector3[][] = [];
  const xStart = -7.2;
  const xStep = 3.2;

  layerSizes.forEach((count, lIdx) => {
    const x = xStart + lIdx * xStep;
    const pts: THREE.Vector3[] = [];
    if (lIdx === 0 || lIdx === layerSizes.length - 1) {
      const span = (count - 1) * 1.45;
      for (let i = 0; i < count; i++) {
        pts.push(new THREE.Vector3(x, 2.5 + i * 1.45 - span / 2, 0));
      }
    } else {
      const radius = count === 8 ? 2.65 : 2.1;
      // Add translucent ring guide for hidden layers
      const guideRing = new THREE.Mesh(
        new THREE.TorusGeometry(radius, 0.025, 12, 48),
        new THREE.MeshBasicMaterial({
          color: lIdx === activeLayer ? (isBackprop ? 0xf59e0b : 0x38bdf8) : 0x475569,
          transparent: true,
          opacity: lIdx === activeLayer ? 0.55 : 0.2,
        })
      );
      guideRing.position.set(x, 2.5, 0);
      guideRing.rotation.y = Math.PI / 2;
      group.add(guideRing);

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

    // Layer title badge at the bottom
    const isCurr = lIdx === activeLayer;
    group.add(
      createHudBadge([x, -0.55, 0], {
        text: layerTitles[lIdx] || `L${lIdx}`,
        subText: `${count} 维`,
        borderColor: isCurr ? (isBackprop ? '#f59e0b' : '#38bdf8') : '#64748b',
        scale: [1.65, 0.76],
      })
    );
  });

  // Draw synaptic connections + glowing pulse spheres on active signal wave
  for (let l = 0; l < layerPositions.length - 1; l++) {
    const currL = layerPositions[l];
    const nextL = layerPositions[l + 1];
    const isSignalWave =
      (!isBackprop && l === activeLayer - 1) || (isBackprop && l === activeLayer);

    const linePts: number[] = [];
    const pulseMidpoints: THREE.Vector3[] = [];

    currL.forEach((p1, i) => {
      nextL.forEach((p2, j) => {
        if ((i + j) % 2 === 0 || isSignalWave) {
          linePts.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
          if (isSignalWave && (i + j) % 3 === 0) {
            const ratio = isBackprop ? 0.35 : 0.65;
            pulseMidpoints.push(new THREE.Vector3().lerpVectors(p1, p2, ratio));
          }
        }
      });
    });

    const waveCol = isBackprop ? 0xf59e0b : 0x38bdf8;
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePts, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: isSignalWave ? waveCol : 0x334155,
      transparent: true,
      opacity: isSignalWave ? 0.76 : 0.22,
    });
    group.add(new THREE.LineSegments(lineGeo, lineMat));

    // Render signal pulse spheres traveling along active synapses
    pulseMidpoints.forEach((mp) => {
      const pulse = new THREE.Mesh(
        new THREE.SphereGeometry(0.11, 10, 10),
        new THREE.MeshBasicMaterial({ color: isBackprop ? 0xfde047 : 0x7dd3fc })
      );
      pulse.position.copy(mp);
      group.add(pulse);
    });
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
          emissiveIntensity: isCurrent ? 0.98 : 0.38,
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
  const labels = ['Cat ★', 'Dog', 'Bird'];
  const outNodes = layerPositions[layerPositions.length - 1];
  outNodes.forEach((pos, idx) => {
    const p = probs[idx] || 0;
    const barW = Math.max(0.3, p * 3.4);
    const barGeo = new THREE.BoxGeometry(barW, 0.44, 0.44);
    const isTop = idx === 0;
    const barCol = isTop ? 0x10b981 : 0x38bdf8;
    const bar = new THREE.Mesh(
      barGeo,
      new THREE.MeshStandardMaterial({
        color: barCol,
        emissive: barCol,
        emissiveIntensity: 0.8,
      })
    );
    bar.position.set(pos.x + 1.0 + barW / 2, pos.y, pos.z);
    group.add(bar);

    group.add(
      createHudBadge([pos.x + 1.45 + barW, pos.y, pos.z], {
        text: `${labels[idx]} ${(p * 100).toFixed(0)}%`,
        subText: isTop ? `Loss=${step.loss}` : undefined,
        borderColor: isTop ? '#10b981' : '#38bdf8',
        scale: [1.95, isTop ? 0.82 : 0.68],
      })
    );
  });
}

// ============================================================================
// 4. 梯度下降：连续三维损失地形 + 等高线 + SGD vs Adam 双优化器梯度矢量竞速
// ============================================================================
function lossHeight(x: number, z: number): number {
  return 0.085 * (x - 3.2) ** 2 + 0.36 * z ** 2 + 0.35 * Math.cos(x * 0.8) + 0.6;
}

function genGradientDescentRaceSteps(): VisualizationStep[] {
  const sgdPath: [number, number, number][] = [];
  const adamPath: [number, number, number][] = [];

  const totalSteps = 14;
  for (let i = 0; i < totalSteps; i++) {
    const t = i / (totalSteps - 1);
    const sx = -5.2 + t * 7.2;
    const sz = Math.pow(1 - t, 0.85) * 3.4 * (i % 2 === 0 ? 1 : -1);
    sgdPath.push([sx, lossHeight(sx, sz) + 0.25, sz]);

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
      sgdNext: sgdPath[Math.min(idx + 1, totalSteps - 1)],
      adamNext: adamPath[Math.min(idx + 1, totalSteps - 1)],
      description: `迭代步 ${idx + 1}/${totalSteps}：黄色 SGD 受病态海森条件数困扰在峡谷侧壁剧烈震荡 (L=${(sCurr[1] - 0.25).toFixed(2)}) | 绿色 Adam 动量+自适应步长丝滑直达谷底 (L=${(aCurr[1] - 0.25).toFixed(2)})`,
      metrics: {
        'SGD Loss': (sCurr[1] - 0.25).toFixed(3),
        'Adam Loss': (aCurr[1] - 0.25).toFixed(3),
        收敛优势: `Adam 领先 ${(((sCurr[1] - aCurr[1]) / sCurr[1]) * 100).toFixed(0)}%`,
      },
    };
  });
}

function renderGradientDescentRace(group: THREE.Group, step: VisualizationStep) {
  const size = 13.5;
  const segs = 44;
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
        opacity: 0.84,
        side: THREE.DoubleSide,
      })
    )
  );

  group.add(
    new THREE.Mesh(
      geo.clone(),
      new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.2,
      })
    )
  );

  // Global minimum target beacon at (3.2, 0)
  const minY = lossHeight(3.2, 0);
  [0.5, 0.95, 1.45].forEach((r, idx) => {
    const targetRing = new THREE.Mesh(
      new THREE.TorusGeometry(r, 0.045, 16, 48),
      new THREE.MeshBasicMaterial({
        color: idx === 0 ? 0xf43f5e : 0xfbbf24,
        transparent: true,
        opacity: 0.9 - idx * 0.25,
      })
    );
    targetRing.position.set(3.2, minY + 0.08 + idx * 0.05, 0);
    targetRing.rotation.x = Math.PI / 2;
    group.add(targetRing);
  });

  // Glowing vertical beacon pillar at global minimum
  group.add(
    createGlowingBeam(
      new THREE.Vector3(3.2, minY, 0),
      new THREE.Vector3(3.2, minY + 3.2, 0),
      0.06,
      0xf43f5e,
      0.75
    )
  );
  group.add(
    createHudBadge([3.2, minY + 3.6, 0], {
      text: '全局最优 θ*',
      subText: '∇L(θ*) = 0',
      borderColor: '#f43f5e',
      scale: [2.0, 0.82],
    })
  );

  const renderOptimizerTrail = (
    trail: [number, number, number][],
    nextPt: [number, number, number] | undefined,
    color: number,
    name: string,
    vecLabel: string,
    border: string
  ) => {
    if (!trail || trail.length === 0) return;
    if (trail.length > 1) {
      const pts = trail.map((p) => new THREE.Vector3(p[0], p[1], p[2]));
      const curve = new THREE.CatmullRomCurve3(pts);
      group.add(
        new THREE.Mesh(
          new THREE.TubeGeometry(curve, pts.length * 5, 0.085, 10, false),
          new THREE.MeshBasicMaterial({ color })
        )
      );
    }
    const curr = trail[trail.length - 1];
    const currVec = new THREE.Vector3(curr[0], curr[1], curr[2]);

    // Direction vector beam toward next step
    if (nextPt && (nextPt[0] !== curr[0] || nextPt[2] !== curr[2])) {
      const dir = new THREE.Vector3(nextPt[0], nextPt[1], nextPt[2])
        .sub(currVec)
        .normalize()
        .multiplyScalar(1.35);
      group.add(
        createGlowingBeam(currVec, currVec.clone().add(dir), 0.05, 0xffffff, 0.9)
      );
    }

    const orb = new THREE.Mesh(
      new THREE.SphereGeometry(0.38, 24, 24),
      new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 1.0,
      })
    );
    orb.position.copy(currVec);
    group.add(orb);

    group.add(
      createHudBadge([curr[0], curr[1] + 0.95, curr[2]], {
        text: `${name} (${vecLabel})`,
        subText: `Loss=${(curr[1] - 0.25).toFixed(2)}`,
        borderColor: border,
        scale: [2.25, 0.86],
      })
    );
  };

  renderOptimizerTrail(
    step.sgdTrail,
    step.sgdNext,
    0xfbbf24,
    'SGD',
    '-η∇L',
    '#fbbf24'
  );
  renderOptimizerTrail(
    step.adamTrail,
    step.adamNext,
    0x10b981,
    'Adam',
    'm̂/√v̂',
    '#10b981'
  );
}

// ============================================================================
// 5. CART 分类决策树 (4层15节点特征分裂 + 底部特征空间正交切割盒同步高亮)
// ============================================================================
function genDecisionTreeSteps(): VisualizationStep[] {
  const treeNodes = [
    // Layer 1 (Root)
    { id: 0, label: 'X₁ ≤ 0.50', sub: 'Gini=0.66', x: 0, y: 6.4, z: 0 },
    // Layer 2
    { id: 1, label: 'X₂ ≤ 1.65', sub: 'Gini=0.44', x: -4.8, y: 4.1, z: 0.3, parent: 0 },
    { id: 2, label: 'X₃ ≤ 0.80', sub: 'Gini=0.41', x: 4.8, y: 4.1, z: -0.3, parent: 0 },
    // Layer 3
    { id: 3, label: 'X₁ ≤ 0.22', sub: 'Gini=0.24', x: -7.4, y: 1.8, z: 0.6, parent: 1 },
    { id: 4, label: 'X₄ ≤ 2.10', sub: 'Gini=0.28', x: -2.2, y: 1.8, z: 0.1, parent: 1 },
    { id: 5, label: 'X₂ ≤ 0.95', sub: 'Gini=0.22', x: 2.2, y: 1.8, z: -0.1, parent: 2 },
    { id: 6, label: 'X₄ ≤ 3.40', sub: 'Gini=0.19', x: 7.4, y: 1.8, z: -0.6, parent: 2 },
    // Layer 4 (8 High-purity classification leaf buckets)
    { id: 7, label: '类A (98%)', sub: 'Gini=0.02', x: -8.7, y: -0.6, z: 0.9, parent: 3, isLeaf: true },
    { id: 8, label: '类B (92%)', sub: 'Gini=0.07', x: -6.1, y: -0.6, z: 0.4, parent: 3, isLeaf: true },
    { id: 9, label: '类B (95%)', sub: 'Gini=0.05', x: -3.5, y: -0.6, z: 0.2, parent: 4, isLeaf: true },
    { id: 10, label: '类A (91%)', sub: 'Gini=0.08', x: -0.9, y: -0.6, z: -0.1, parent: 4, isLeaf: true },
    { id: 11, label: '类C (94%)', sub: 'Gini=0.06', x: 0.9, y: -0.6, z: 0.1, parent: 5, isLeaf: true },
    { id: 12, label: '类B (90%)', sub: 'Gini=0.09', x: 3.5, y: -0.6, z: -0.2, parent: 5, isLeaf: true },
    { id: 13, label: '类C (96%)', sub: 'Gini=0.04', x: 6.1, y: -0.6, z: -0.4, parent: 6, isLeaf: true },
    { id: 14, label: '类C (99%)', sub: 'Gini=0.01', x: 8.7, y: -0.6, z: -0.9, parent: 6, isLeaf: true },
  ];

  const paths = [
    { path: [0], boxIdx: 0, desc: '样本 #1 注入根节点：检验特征 X₁=0.18 ≤ 0.50（Gini=0.66 → ΔGini=0.23），触发第一刀正交切分并向左分流' },
    { path: [0, 1], boxIdx: 1, desc: '样本 #1 到达第 2 层节点 1：检验特征 X₂=1.10 ≤ 1.65（Gini=0.44），触发第二刀正交切分继续下潜' },
    { path: [0, 1, 3], boxIdx: 2, desc: '样本 #1 到达第 3 层节点 3：精细切分 X₁=0.18 ≤ 0.22（Gini=0.24），锁定最左高纯度决策子空间' },
    { path: [0, 1, 3, 7], boxIdx: 3, desc: '样本 #1 落入第 4 层叶节点 #7：判定为【类别 A · 置信度 98%】（叶纯度 Gini=0.02）！' },
    { path: [0, 1, 4], boxIdx: 4, desc: '样本 #2 (X₁=0.38, X₂=2.05, X₄=1.50) 经根→左→右路由至第 3 层节点 4（检验 X₄ ≤ 2.10）' },
    { path: [0, 1, 4, 9], boxIdx: 5, desc: '样本 #2 落入第 4 层叶节点 #9：判定为【类别 B · 置信度 95%】（叶纯度 Gini=0.05）！' },
    { path: [0, 2, 6], boxIdx: 6, desc: '样本 #3 (X₁=0.85, X₃=1.20, X₄=4.10) 经根→右→右路由至第 3 层节点 6（检验 X₄ ≤ 3.40）' },
    { path: [0, 2, 6, 14], boxIdx: 7, desc: '样本 #3 落入第 4 层叶节点 #14：判定为【类别 C · 置信度 99%】（叶纯度 Gini=0.01）！' },
  ];

  return paths.map((p, idx) => ({
    type: 'ml-cart-tree',
    nodes: treeNodes,
    activePath: p.path,
    boxIdx: p.boxIdx,
    description: p.desc,
    metrics: {
      树结构深度: '4 层 / 15 节点 (8 叶)',
      当前路由深: `Layer ${p.path.length} / 4`,
      测试样本: `Sample #${idx < 4 ? 1 : idx < 6 ? 2 : 3}`,
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
          isRoute ? 0.115 : 0.055,
          isRoute ? 0xfbbf24 : 0x475569,
          0.92
        )
      );
    }
  });

  nodes.forEach((n) => {
    const isHit = activeSet.has(n.id);
    const isCurrent = n.id === lastActive;
    const col = n.isLeaf
      ? isHit
        ? 0x10b981
        : 0x0ea5e9
      : isHit
      ? 0xfbbf24
      : 0xec4899;

    const mesh = new THREE.Mesh(
      n.isLeaf
        ? new THREE.CylinderGeometry(0.46, 0.52, isCurrent ? 0.85 : 0.65, 24)
        : new THREE.SphereGeometry(isCurrent ? 0.6 : 0.45, 28, 28),
      new THREE.MeshStandardMaterial({
        color: col,
        emissive: col,
        emissiveIntensity: isHit ? 0.95 : 0.35,
      })
    );
    mesh.position.set(n.x, n.y, n.z);
    group.add(mesh);

    if (isCurrent) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.82, 0.05, 12, 36),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
      );
      ring.position.set(n.x, n.y, n.z);
      ring.rotation.x = Math.PI / 2;
      group.add(ring);
    }

    group.add(
      createHudBadge([n.x, n.y + 1.12, n.z], {
        text: n.label,
        subText: n.sub,
        borderColor: isHit ? '#fbbf24' : n.isLeaf ? '#34d399' : '#f472b6',
        scale: [2.35, 0.92],
      })
    );
  });
}

// ============================================================================
// 6. SVM 支持向量机 (2D 地面投影 + 3D RBF 高斯钟形曲面 + 最大间隔超平面与支持向量)
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
        ? '原始 2D 特征平面：内圈红点 (+1) 被外圈蓝点 (-1) 360° 同心包围，二维空间线性不可分'
        : idx <= 2
        ? `RBF 高斯核映射升维 (${(lift * 100).toFixed(0)}%)：通过 φ(x) = exp(-γ||x||²) 构造三维高斯钟形流形将内圈正类顶起！`
        : idx === 3
        ? '核升维完成！在三维特征空间插入绿色最大间隔分割超平面 wᵀφ(x)+b=0，一刀完美线性切分！'
        : '锁定紧贴上下虚线间隔边界的金色支持向量 (Support Vectors, αᵢ > 0)，几何间隔 γ = 2 / ||w||',
    metrics: {
      核函数: 'RBF K(x,z)=exp(-γ||x-z||²)',
      升维进度: `${(lift * 100).toFixed(0)}%`,
      间隔状态: idx >= 4 ? '最大间隔 2/||w|| 已锁定' : idx >= 3 ? '超平面已切分' : '核映射抬升中',
    },
  }));
}

function renderSvmKernel(group: THREE.Group, step: VisualizationStep) {
  const { pts, lift, showPlane, showMargin } = step;

  // 1. Continuous 3D Gaussian RBF Kernel Bell Wireframe Mesh
  if (lift > 0.05) {
    const bellGeo = new THREE.PlaneGeometry(11.5, 11.5, 28, 28);
    bellGeo.rotateX(-Math.PI / 2);
    const pos = bellGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const r2 = x * x + z * z;
      pos.setY(i, 0.4 + lift * 4.5 * Math.exp(-0.18 * r2));
    }
    bellGeo.computeVertexNormals();
    group.add(
      new THREE.Mesh(
        bellGeo,
        new THREE.MeshBasicMaterial({
          color: 0xa855f7,
          wireframe: true,
          transparent: true,
          opacity: 0.18,
        })
      )
    );
  }

  // 2. Render 2D floor shadow + vertical kernel lift beams + 3D lifted spheres
  pts.forEach((p: any) => {
    const y = 0.4 + lift * 4.5 * Math.exp(-0.18 * p.r2);
    const col = p.label === 1 ? 0xf43f5e : 0x38bdf8;

    // 2D original floor shadow dot
    if (lift > 0.1) {
      const shadowDot = new THREE.Mesh(
        new THREE.CircleGeometry(0.14, 12),
        new THREE.MeshBasicMaterial({
          color: col,
          transparent: true,
          opacity: 0.32,
          side: THREE.DoubleSide,
        })
      );
      shadowDot.rotation.x = -Math.PI / 2;
      shadowDot.position.set(p.x, 0.05, p.z);
      group.add(shadowDot);

      if (p.label === 1) {
        group.add(
          createGlowingBeam(
            new THREE.Vector3(p.x, 0.05, p.z),
            new THREE.Vector3(p.x, y, p.z),
            0.018,
            0xf43f5e,
            0.28
          )
        );
      }
    }

    const orb = new THREE.Mesh(
      new THREE.SphereGeometry(p.isSV && showMargin ? 0.34 : 0.24, 20, 20),
      new THREE.MeshStandardMaterial({
        color: col,
        emissive: col,
        emissiveIntensity: 0.88,
      })
    );
    orb.position.set(p.x, y, p.z);
    group.add(orb);

    if (p.isSV && showMargin) {
      const halo = new THREE.Mesh(
        new THREE.TorusGeometry(0.5, 0.05, 12, 36),
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
      opacity: 0.44,
      side: THREE.DoubleSide,
    });
    const plane = new THREE.Mesh(planeGeo, planeMat);
    plane.position.y = 2.35;
    group.add(plane);

    group.add(
      createHudBadge([4.8, 2.55, 4.8], {
        text: '决策超平面 wᵀφ(x)+b=0',
        borderColor: '#10b981',
        scale: [2.5, 0.78],
      })
    );

    if (showMargin) {
      [1.85, 2.85].forEach((my) => {
        const mWire = new THREE.Mesh(
          planeGeo.clone(),
          new THREE.MeshBasicMaterial({
            color: 0xfbbf24,
            wireframe: true,
            transparent: true,
            opacity: 0.36,
          })
        );
        mWire.position.y = my;
        group.add(mWire);
      });

      // Margin width vertical ruler on the side
      group.add(
        createGlowingBeam(
          new THREE.Vector3(-5.2, 1.85, 0),
          new THREE.Vector3(-5.2, 2.85, 0),
          0.06,
          0xfbbf24,
          0.95
        )
      );
      group.add(
        createHudBadge([-5.2, 3.45, 0], {
          text: '最大间隔 γ = 2/||w||',
          subText: '支持向量 αᵢ > 0',
          borderColor: '#fbbf24',
          scale: [2.4, 0.88],
        })
      );
    }
  }
}

// ============================================================================
// 7. PCA 主成分分析 (3D 协方差椭球 + PC₁/PC₂/PC₃ 正交特征轴 + 倾斜主子空间投影平面)
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
    { proj: 0, showAxes: false, desc: '步骤 1：原始三维倾斜高相关性椭球点云（特征间存在冗余共线性与噪声维度）' },
    { proj: 0, showAxes: true, desc: '步骤 2：对协方差矩阵 Σ=XᵀX/N 谱分解，锁定正交主成分特征轴 PC₁ (68.4%)、PC₂ (24.1%) 与噪声轴 PC₃ (7.5%)' },
    { proj: 0.45, showAxes: true, desc: '步骤 3：展开 PC₁-PC₂ 二维主子空间流形，所有 3D 样本发射绿色正交激光向主平面投影（最小化重构残差）' },
    { proj: 1.0, showAxes: true, desc: '步骤 4：三维点云成功降维至 2D 主平面 Z = X[u₁, u₂]！抹除 PC₃ 噪声并保留 92.5% 原始方差信息' },
  ];

  return phases.map((ph) => ({
    type: 'ml-pca-3d',
    pts: rawPts,
    proj: ph.proj,
    showAxes: ph.showAxes,
    description: ph.desc,
    metrics: {
      'PC₁ 方差贡献': '68.4% (λ₁)',
      'PC₂ 方差贡献': '24.1% (λ₂)',
      累计保留方差: '92.5% (3D→2D)',
    },
  }));
}

function renderPca3D(group: THREE.Group, step: VisualizationStep) {
  const { pts, proj, showAxes } = step;

  if (showAxes) {
    // Translucent tilted PC1-PC2 Principal Subspace Plane
    const subGeo = new THREE.PlaneGeometry(10.5, 6.2, 12, 12);
    subGeo.rotateX(-Math.PI / 2);
    const pos = subGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const u = pos.getX(i);
      const v = pos.getZ(i);
      pos.setXYZ(i, u * 0.86, 2.8 + u * 0.42, v);
    }
    subGeo.computeVertexNormals();
    group.add(
      new THREE.Mesh(
        subGeo,
        new THREE.MeshStandardMaterial({
          color: 0x10b981,
          emissive: 0x059669,
          emissiveIntensity: 0.25,
          transparent: true,
          opacity: 0.22,
          side: THREE.DoubleSide,
        })
      )
    );
    group.add(
      new THREE.Mesh(
        subGeo.clone(),
        new THREE.MeshBasicMaterial({
          color: 0x34d399,
          wireframe: true,
          transparent: true,
          opacity: 0.25,
        })
      )
    );

    // PC1 major eigenvector axis
    group.add(
      createGlowingBeam(
        new THREE.Vector3(-5.2 * 0.86, 2.8 - 5.2 * 0.42, 0),
        new THREE.Vector3(5.2 * 0.86, 2.8 + 5.2 * 0.42, 0),
        0.1,
        0xf43f5e,
        0.95
      )
    );
    group.add(
      createHudBadge([5.2 * 0.86 + 0.85, 2.8 + 5.2 * 0.42 + 0.5, 0], {
        text: '主轴 PC₁ (68.4%)',
        subText: '最大特征值 λ₁',
        borderColor: '#f43f5e',
        scale: [2.25, 0.85],
      })
    );

    // PC2 orthogonal eigenvector axis
    group.add(
      createGlowingBeam(
        new THREE.Vector3(0, 2.8, -3.6),
        new THREE.Vector3(0, 2.8, 3.6),
        0.085,
        0x38bdf8,
        0.95
      )
    );
    group.add(
      createHudBadge([0, 3.45, 4.0], {
        text: '次轴 PC₂ (24.1%)',
        subText: '正交 PC₂ ⊥ PC₁',
        borderColor: '#38bdf8',
        scale: [2.25, 0.85],
      })
    );

    // PC3 minor noise axis (orthogonal normal to PC1-PC2 plane)
    group.add(
      createGlowingBeam(
        new THREE.Vector3(1.8 * 0.3, 2.8 - 1.8 * 0.85, 0),
        new THREE.Vector3(-1.8 * 0.3, 2.8 + 1.8 * 0.85, 0),
        0.055,
        0xf59e0b,
        0.75
      )
    );
    group.add(
      createHudBadge([-1.8 * 0.3 - 0.6, 2.8 + 1.8 * 0.85 + 0.6, 0], {
        text: 'PC₃ 噪声轴 (7.5%)',
        borderColor: '#f59e0b',
        scale: [2.05, 0.72],
      })
    );
  }

  pts.forEach((p: any) => {
    const cx = p.x + (p.px - p.x) * proj;
    const cy = p.y + (p.py - p.y) * proj;
    const cz = p.z + (p.pz - p.z) * proj;

    const col = proj > 0.8 ? 0x10b981 : 0xa855f7;
    const orb = new THREE.Mesh(
      new THREE.SphereGeometry(0.21, 16, 16),
      new THREE.MeshStandardMaterial({
        color: col,
        emissive: col,
        emissiveIntensity: 0.82,
      })
    );
    orb.position.set(cx, cy, cz);
    group.add(orb);

    if (proj > 0 && proj < 1) {
      group.add(
        createGlowingBeam(
          new THREE.Vector3(p.x, p.y, p.z),
          new THREE.Vector3(p.px, p.py, p.pz),
          0.028,
          0x10b981,
          0.62
        )
      );
    }
  });
}

// ============================================================================
// 8. Transformer 自注意力机制 (Q/K/V 三色张量块 + 权重语义拱桥 + 6×6 Softmax 注意力水晶矩阵)
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
      description: `聚焦 Query Token "${tok}"：由 Q=XW_Q, K=XW_K, V=XW_V 计算 softmax(q_${tok}·Kᵀ/√d_k)，最强注意力拱桥指向 "${tokens[topKIdx]}" (${(maxW * 100).toFixed(0)}%) 并聚合上下文向量 z_${qIdx}`,
      metrics: {
        当前Query词: `"${tok}" (Q_${qIdx})`,
        最高关注Key: `"${tokens[topKIdx]}" (${(maxW * 100).toFixed(0)}%)`,
        注意力公式: 'softmax(QKᵀ/√d_k)V',
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

  // 1. Render Token embeddings + Q/K/V projection sub-blocks along upper arc
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
      new THREE.BoxGeometry(1.38, 0.65, 0.65),
      new THREE.MeshStandardMaterial({
        color: col,
        emissive: col,
        emissiveIntensity: isQuery ? 0.95 : 0.42 + attWeight,
        metalness: 0.6,
        roughness: 0.2,
      })
    );
    box.position.copy(pos);
    group.add(box);

    // Q / K / V mini projection blocks below each token
    const qkvColors = [0xfbbf24, 0x38bdf8, 0x10b981];
    [-0.38, 0, 0.38].forEach((dx, mIdx) => {
      const mini = new THREE.Mesh(
        new THREE.BoxGeometry(0.32, 0.24, 0.32),
        new THREE.MeshStandardMaterial({
          color: qkvColors[mIdx],
          emissive: qkvColors[mIdx],
          emissiveIntensity: (isQuery && mIdx === 0) || (attWeight > 0.2 && mIdx > 0) ? 0.95 : 0.35,
        })
      );
      mini.position.set(x + dx, y - 0.58, z);
      group.add(mini);
    });

    group.add(
      createHudBadge([x, y + 1.08, z], {
        text: tok,
        subText: isQuery ? '★ QUERY (Q)' : `Key α=${(attWeight * 100).toFixed(0)}%`,
        borderColor: isQuery ? '#fbbf24' : attWeight > 0.2 ? '#10b981' : '#38bdf8',
        scale: [1.85, 0.86],
      })
    );
  });

  // 2. Render arched Self-Attention bridges from activeQuery to all Key tokens
  const qPos = tokenPositions[qIdx];
  if (qPos && weights[qIdx]) {
    weights[qIdx].forEach((w, kIdx) => {
      if (w < 0.06) return;
      const kPos = tokenPositions[kIdx];
      const arcH = 1.25 + Math.abs(qIdx - kIdx) * 0.55;
      const col = w > 0.22 ? 0xf59e0b : 0x38bdf8;
      group.add(createEnergyArc(qPos, kPos, arcH, col, 0.032 + w * 0.18, 0.94));

      // Show weight badge on strong cross-token attention arcs
      if (w >= 0.2 && qIdx !== kIdx) {
        const midX = (qPos.x + kPos.x) / 2;
        const midY = qPos.y + arcH * 0.85;
        group.add(
          createHudBadge([midX, midY, qPos.z], {
            text: `α=${(w * 100).toFixed(0)}%`,
            borderColor: '#fbbf24',
            scale: [1.45, 0.65],
          })
        );
      }
    });
  }

  // 3. Render bottom 6×6 Attention Weight Heatmap Crystal Matrix with Row/Col Labels
  const cellSpacing = 1.15;
  const matOffset = ((n - 1) * cellSpacing) / 2;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      const w = weights[r]?.[c] ?? 0;
      const h = 0.18 + w * 2.3;
      const x = c * cellSpacing - matOffset;
      const z = 1.6 + (r * cellSpacing - matOffset) * 0.65;
      const isActiveRow = r === qIdx;

      const col = isActiveRow ? (w > 0.2 ? 0xf59e0b : 0xa855f7) : 0x334155;
      const bar = new THREE.Mesh(
        new THREE.BoxGeometry(0.85, h, 0.55),
        new THREE.MeshStandardMaterial({
          color: col,
          emissive: col,
          emissiveIntensity: isActiveRow ? 0.8 : 0.18,
        })
      );
      bar.position.set(x, h / 2, z);
      group.add(bar);
    }
  }

  group.add(
    createHudBadge([0, 0.6, 4.15], {
      text: `6×6 注意力矩阵 softmax(QKᵀ/√d_k)`,
      subText: `当前高亮第 ${qIdx + 1} 行 (${tokens[qIdx]})`,
      borderColor: '#a855f7',
      scale: [2.85, 0.85],
    })
  );
}

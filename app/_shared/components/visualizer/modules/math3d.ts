import * as THREE from 'three';
import { VisualizationStep } from '../types';
import { createEnergyArc, createGlowingBeam, createHudBadge } from '../core/HudSpriteCache';

export function generateMath3DSteps(
  algorithm: string,
  rawInput: number[]
): VisualizationStep[] {
  switch (algorithm) {
    case 'fibonacci':
      return genFibonacciSteps(Math.min(Math.max(rawInput.length + 2, 8), 11));
    case 'sine-wave':
      return genFourierSineSteps();
    case 'spiral':
      return genSpiralSteps();
    case 'mandelbrot':
      return genMandelbrotSteps();
    case 'lorenz':
      return genLorenzSteps();
    case 'wave-3d':
      return genWaveInterferenceSteps();
    case 'torus':
      return genTorusKnotSteps();
    case 'klein':
      return genKleinBottleSteps();
    default:
      return genFourierSineSteps();
  }
}

export function renderMath3D(group: THREE.Group, step: VisualizationStep) {
  switch (step.type) {
    case 'fibonacci-3d':
      renderFibonacci3D(group, step);
      break;
    case 'fourier-sine':
      renderFourierSine(group, step);
      break;
    case 'dna-spiral':
      renderDnaSpiral(group, step);
      break;
    case 'mandelbrot-mesh':
      renderMandelbrotMesh(group, step);
      break;
    case 'lorenz-dual':
      renderLorenzDual(group, step);
      break;
    case 'wave-interference':
      renderWaveInterference(group, step);
      break;
    case 'torus-manifold':
      renderTorusManifold(group, step);
      break;
    case 'klein-manifold':
      renderKleinManifold(group, step);
      break;
  }
}

// ============================================================================
// 1. 斐波那契黄金螺旋与动态规划递推
// ============================================================================
function genFibonacciSteps(n: number): VisualizationStep[] {
  const fib = [1, 1];
  const steps: VisualizationStep[] = [
    {
      type: 'fibonacci-3d',
      seq: [1, 1],
      activeIdx: 1,
      description: '初始化斐波那契基准项 F(0)=1, F(1)=1，准备沿黄金螺旋递推生成',
      metrics: { 当前项: 'F(1) = 1', 比值φ: '1.0000', 状态: '基准初始化' },
    },
  ];

  for (let i = 2; i < n; i++) {
    const next = fib[i - 1] + fib[i - 2];
    fib.push(next);
    const ratio = (fib[i] / fib[i - 1]).toFixed(5);
    steps.push({
      type: 'fibonacci-3d',
      seq: [...fib],
      activeIdx: i,
      description: `递推第 ${i} 项：F(${i}) = F(${i - 1}) + F(${i - 2}) = ${fib[i - 1]} + ${fib[i - 2]} = ${next}（比值收敛于 φ ≈ ${ratio}）`,
      metrics: {
        递推公式: `${fib[i - 1]} + ${fib[i - 2]} = ${next}`,
        黄金分割比: `φ ≈ ${ratio}`,
        理想极限: '1.61803',
      },
    });
  }
  return steps;
}

function renderFibonacci3D(group: THREE.Group, step: VisualizationStep) {
  const seq: number[] = step.seq || [1, 1];
  const maxVal = Math.max(...seq, 1);
  const tops: THREE.Vector3[] = [];
  const spiralPts: THREE.Vector3[] = [];

  seq.forEach((val, idx) => {
    const angle = idx * 0.68;
    const radius = 1.4 + idx * 0.65;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const h = 0.7 + (val / maxVal) * 5.6;

    const isCurr = idx === step.activeIdx;
    const isPrev = idx === step.activeIdx - 1 || idx === step.activeIdx - 2;

    const color = isCurr ? 0x10b981 : isPrev ? 0xf59e0b : 0x6366f1;
    const geo = new THREE.CylinderGeometry(0.42, 0.5, h, 24);
    const mat = new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: isCurr ? 0.85 : isPrev ? 0.65 : 0.28,
      metalness: 0.6,
      roughness: 0.2,
    });
    const cyl = new THREE.Mesh(geo, mat);
    cyl.position.set(x, h / 2, z);
    group.add(cyl);

    const top = new THREE.Vector3(x, h, z);
    tops.push(top);
    spiralPts.push(new THREE.Vector3(x, h + 0.15, z));

    const badge = createHudBadge([x, h + 0.85, z], {
      text: `F(${idx})=${val}`,
      borderColor: isCurr ? '#10b981' : isPrev ? '#fbbf24' : '#818cf8',
      scale: [1.85, 0.75],
    });
    group.add(badge);
  });

  if (spiralPts.length > 2) {
    const curve = new THREE.CatmullRomCurve3(spiralPts);
    const tubeGeo = new THREE.TubeGeometry(curve, spiralPts.length * 8, 0.06, 10, false);
    const tubeMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24 });
    group.add(new THREE.Mesh(tubeGeo, tubeMat));
  }

  const curr = step.activeIdx;
  if (curr >= 2 && tops[curr] && tops[curr - 1] && tops[curr - 2]) {
    group.add(createEnergyArc(tops[curr - 1], tops[curr], 1.5, 0xf59e0b, 0.08, 0.95));
    group.add(createEnergyArc(tops[curr - 2], tops[curr], 2.1, 0x38bdf8, 0.08, 0.95));
  }
}

// ============================================================================
// 2. 傅里叶级数 3D 谐波合成 (Fourier Harmonics)
// ============================================================================
function genFourierSineSteps(): VisualizationStep[] {
  const steps: VisualizationStep[] = [];
  const harmonicsList = [1, 2, 3, 4];

  for (let s = 0; s < 16; s++) {
    const numHarmonics = harmonicsList[Math.min(Math.floor(s / 4), 3)];
    const phase = s * 0.42;
    const maxOdd = numHarmonics * 2 - 1;
    steps.push({
      type: 'fourier-sine',
      phase,
      numHarmonics,
      description: `傅里叶级数合成：叠加前 ${numHarmonics} 阶奇次谐波 (最高 ${maxOdd}sin(${maxOdd}x)/${maxOdd})，相位 ωt = ${phase.toFixed(2)} rad`,
      metrics: {
        叠加谐波阶数: `${numHarmonics} 阶 (1..${maxOdd}次)`,
        当前相位: `${phase.toFixed(2)} rad`,
        目标波形: '理想方波逼近',
      },
    });
  }
  return steps;
}

function renderFourierSine(group: THREE.Group, step: VisualizationStep) {
  const phase = step.phase || 0;
  const numH = step.numHarmonics || 3;
  const harmColors = [0x38bdf8, 0xa855f7, 0xf59e0b, 0xf43f5e];

  // Draw rotating phasor epicycles on the left (x = -7.2)
  let cx = -7.2;
  let cy = 2.4;
  for (let hIdx = 0; hIdx < numH; hIdx++) {
    const n = hIdx * 2 + 1;
    const radius = (4 / Math.PI) * (1.35 / n);
    const ringGeo = new THREE.TorusGeometry(radius, 0.03, 12, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: harmColors[hIdx % harmColors.length],
      transparent: true,
      opacity: 0.65,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.set(cx, cy, 2.8);
    group.add(ring);

    const nx = cx + radius * Math.cos(n * phase);
    const ny = cy + radius * Math.sin(n * phase);
    group.add(
      createGlowingBeam(
        new THREE.Vector3(cx, cy, 2.8),
        new THREE.Vector3(nx, ny, 2.8),
        0.045,
        0xfbbf24,
        0.95
      )
    );
    cx = nx;
    cy = ny;
  }

  // Draw individual harmonic wave tubes along Z axis
  for (let hIdx = 0; hIdx < numH; hIdx++) {
    const n = hIdx * 2 + 1;
    const z = -3.2 + hIdx * 1.7;
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 72; i++) {
      const t = (i / 72) * Math.PI * 3;
      const x = -4.5 + (i / 72) * 11.5;
      const y = 2.4 + (4 / Math.PI) * (1.35 / n) * Math.sin(n * (t + phase));
      pts.push(new THREE.Vector3(x, y, z));
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    const tubeGeo = new THREE.TubeGeometry(curve, 90, 0.06, 10, false);
    const col = harmColors[hIdx % harmColors.length];
    const tubeMat = new THREE.MeshStandardMaterial({
      color: col,
      emissive: col,
      emissiveIntensity: 0.7,
      metalness: 0.5,
      roughness: 0.2,
    });
    group.add(new THREE.Mesh(tubeGeo, tubeMat));
  }

  // Synthesized Fourier Sum wave in front (z = 2.8)
  const sumPts: THREE.Vector3[] = [];
  for (let i = 0; i <= 96; i++) {
    const t = (i / 96) * Math.PI * 3;
    const x = -4.5 + (i / 96) * 11.5;
    let y = 2.4;
    for (let hIdx = 0; hIdx < numH; hIdx++) {
      const n = hIdx * 2 + 1;
      y += (4 / Math.PI) * (1.35 / n) * Math.sin(n * (t + phase));
    }
    sumPts.push(new THREE.Vector3(x, y, 2.8));
  }
  const sumCurve = new THREE.CatmullRomCurve3(sumPts);
  const sumGeo = new THREE.TubeGeometry(sumCurve, 120, 0.12, 12, false);
  const sumMat = new THREE.MeshStandardMaterial({
    color: 0x10b981,
    emissive: 0x10b981,
    emissiveIntensity: 0.95,
    metalness: 0.6,
    roughness: 0.15,
  });
  group.add(new THREE.Mesh(sumGeo, sumMat));

  // Beam from epicycle tip to start of synthesized wave
  if (sumPts.length > 0) {
    group.add(
      createGlowingBeam(
        new THREE.Vector3(cx, cy, 2.8),
        sumPts[0],
        0.04,
        0xfbbf24,
        0.85
      )
    );
  }
}

// ============================================================================
// 3. DNA 双螺旋参数管道 + 137.5° 黄金叶序星云
// ============================================================================
function genSpiralSteps(): VisualizationStep[] {
  const steps: VisualizationStep[] = [];
  for (let i = 1; i <= 14; i++) {
    const turns = 0.4 + (i / 14) * 2.2;
    steps.push({
      type: 'dna-spiral',
      turns,
      stepIndex: i,
      description: `三维双螺旋流形生长：当前缠绕 ${turns.toFixed(2)} 圈，底部同步展开 137.5° 黄金角叶序点阵`,
      metrics: {
        螺旋圈数: `${turns.toFixed(2)} Turns`,
        互补相位差: 'π rad (180°)',
        黄金发散角: '137.508°',
      },
    });
  }
  return steps;
}

function renderDnaSpiral(group: THREE.Group, step: VisualizationStep) {
  const turns = step.turns || 2.0;
  const maxT = turns * Math.PI * 2;
  const segments = 64;
  const strandA: THREE.Vector3[] = [];
  const strandB: THREE.Vector3[] = [];

  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * maxT;
    const y = -1.2 + (i / segments) * 6.8;
    const r = 2.4;
    const pA = new THREE.Vector3(r * Math.cos(t), y, r * Math.sin(t));
    const pB = new THREE.Vector3(r * Math.cos(t + Math.PI), y, r * Math.sin(t + Math.PI));
    strandA.push(pA);
    strandB.push(pB);

    if (i % 4 === 0) {
      group.add(createGlowingBeam(pA, pB, 0.055, i % 8 === 0 ? 0xfbbf24 : 0x10b981, 0.85));
    }
  }

  if (strandA.length > 2) {
    const curveA = new THREE.CatmullRomCurve3(strandA);
    const curveB = new THREE.CatmullRomCurve3(strandB);
    const matA = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.8,
      metalness: 0.6,
      roughness: 0.2,
    });
    const matB = new THREE.MeshStandardMaterial({
      color: 0xf43f5e,
      emissive: 0xf43f5e,
      emissiveIntensity: 0.8,
      metalness: 0.6,
      roughness: 0.2,
    });
    group.add(new THREE.Mesh(new THREE.TubeGeometry(curveA, 96, 0.13, 12, false), matA));
    group.add(new THREE.Mesh(new THREE.TubeGeometry(curveB, 96, 0.13, 12, false), matB));
  }

  // Golden angle phyllotaxis base galaxy
  const goldenAngle = 137.50776 * (Math.PI / 180);
  const dotGeo = new THREE.SphereGeometry(0.11, 12, 12);
  const dotMat = new THREE.MeshBasicMaterial({ color: 0xa855f7 });
  const count = Math.floor(turns * 35);
  for (let k = 1; k <= count; k++) {
    const theta = k * goldenAngle;
    const rad = 0.42 * Math.sqrt(k);
    const dot = new THREE.Mesh(dotGeo, dotMat);
    dot.position.set(rad * Math.cos(theta), -1.4, rad * Math.sin(theta));
    group.add(dot);
  }
}

// ============================================================================
// 4. 曼德博集合 3D 分形峡谷地形 + 复平面逃逸轨迹
// ============================================================================
function genMandelbrotSteps(): VisualizationStep[] {
  const maxIters = [6, 10, 16, 24, 32, 42, 54, 68];
  return maxIters.map((maxIter, idx) => ({
    type: 'mandelbrot-mesh',
    maxIter,
    probeC: [-0.74 + idx * 0.015, 0.18],
    description: `曼德博复平面三维高程渲染：迭代深度上限 MaxIter = ${maxIter}，实时追踪边界点 z_{n+1} = z_n² + c 螺旋轨迹`,
    metrics: {
      最大迭代深度: maxIter,
      逃逸判据: '|z| > 2.0',
      网格分辨率: '44 × 44 连续曲面',
    },
  }));
}

function renderMandelbrotMesh(group: THREE.Group, step: VisualizationStep) {
  const maxIter = step.maxIter || 32;
  const gridN = 42;
  const size = 13.5;

  const geometry = new THREE.PlaneGeometry(size, size, gridN, gridN);
  geometry.rotateX(-Math.PI / 2);

  const posAttr = geometry.attributes.position;
  const colors: number[] = [];
  const colorObj = new THREE.Color();

  for (let i = 0; i < posAttr.count; i++) {
    const vx = posAttr.getX(i);
    const vz = posAttr.getZ(i);

    // Map to Mandelbrot complex plane
    const cr = (vx / size) * 2.6 - 0.65;
    const ci = (vz / size) * 2.4;

    let zr = 0;
    let zi = 0;
    let iter = 0;
    while (zr * zr + zi * zi <= 4 && iter < maxIter) {
      const tmp = zr * zr - zi * zi + cr;
      zi = 2 * zr * zi + ci;
      zr = tmp;
      iter++;
    }

    const ratio = iter / maxIter;
    // Canyon depth: inside set is deep calm basin, boundary rises into glowing fractal peaks
    const height = iter === maxIter ? 0.15 : Math.sin(Math.pow(ratio, 0.65) * Math.PI) * 3.8;
    posAttr.setY(i, height);

    if (iter === maxIter) {
      colorObj.setHex(0x0f172a);
    } else {
      colorObj.setHSL(0.58 - ratio * 0.52, 0.92, 0.35 + ratio * 0.32);
    }
    colors.push(colorObj.r, colorObj.g, colorObj.b);
  }

  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.computeVertexNormals();

  const mat = new THREE.MeshStandardMaterial({
    vertexColors: true,
    metalness: 0.45,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });
  group.add(new THREE.Mesh(geometry, mat));

  // Render 3D escape spiral trajectory above the surface
  const [cr, ci] = step.probeC || [-0.72, 0.22];
  let zr = 0,
    zi = 0;
  const orbitPts: THREE.Vector3[] = [];
  for (let k = 0; k < 14; k++) {
    const px = ((cr + zr * 0.45 + 0.65) / 2.6) * size;
    const pz = ((ci + zi * 0.45) / 2.4) * size;
    orbitPts.push(new THREE.Vector3(px, 1.8 + k * 0.25, pz));
    const nr = zr * zr - zi * zi + cr;
    zi = 2 * zr * zi + ci;
    zr = nr;
    if (zr * zr + zi * zi > 6) break;
  }

  if (orbitPts.length > 2) {
    const curve = new THREE.CatmullRomCurve3(orbitPts);
    const tube = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 48, 0.075, 10, false),
      new THREE.MeshBasicMaterial({ color: 0xfbbf24 })
    );
    group.add(tube);
  }
}

// ============================================================================
// 5. 洛伦兹混沌吸引子 (双轨蝴蝶效应对比)
// ============================================================================
function genLorenzSteps(): VisualizationStep[] {
  const sigma = 10,
    rho = 28,
    beta = 8 / 3,
    dt = 0.008;

  const integrate = (x0: number, y0: number, z0: number, total: number) => {
    const pts: [number, number, number][] = [];
    let x = x0,
      y = y0,
      z = z0;
    for (let i = 0; i < total; i++) {
      const dx = sigma * (y - x) * dt;
      const dy = (x * (rho - z) - y) * dt;
      const dz = (x * y - beta * z) * dt;
      x += dx;
      y += dy;
      z += dz;
      if (i % 3 === 0) {
        pts.push([x * 0.28, (z - 18) * 0.24 + 2.5, y * 0.28]);
      }
    }
    return pts;
  };

  const fullA = integrate(0.1, 0, 0, 1350);
  const fullB = integrate(0.1001, 0, 0, 1350);

  const steps: VisualizationStep[] = [];
  const totalSlices = 15;
  for (let s = 1; s <= totalSlices; s++) {
    const count = Math.max(8, Math.floor((s / totalSlices) * fullA.length));
    const sliceA = fullA.slice(0, count);
    const sliceB = fullB.slice(0, count);
    const pA = sliceA[sliceA.length - 1];
    const pB = sliceB[sliceB.length - 1];
    const dist = Math.hypot(pA[0] - pB[0], pA[1] - pB[1], pA[2] - pB[2]).toFixed(2);

    steps.push({
      type: 'lorenz-dual',
      trailA: sliceA,
      trailB: sliceB,
      description:
        Number(dist) < 0.5
          ? `洛伦兹双轨演化（步 ${s}/${totalSlices}）：初值仅差 Δx₀=0.0001，当前双轨仍紧密伴飞（空间偏差 ${dist}）`
          : `蝴蝶效应爆发（步 ${s}/${totalSlices}）：微小初值误差经混沌指数放大，青/红双轨彻底分岔落入不同吸引翼（偏差 ${dist}）！`,
      metrics: {
        初值微扰: 'Δx₀ = 10⁻⁴',
        当前双轨间距: dist,
        状态: Number(dist) < 0.5 ? '同步伴飞期' : '混沌指数分岔',
      },
    });
  }
  return steps;
}

function renderLorenzDual(group: THREE.Group, step: VisualizationStep) {
  const drawRibbon = (ptsRaw: [number, number, number][], color: number, label: string) => {
    if (!ptsRaw || ptsRaw.length < 2) return;
    const pts = ptsRaw.map((p) => new THREE.Vector3(p[0], p[1], p[2]));
    const curve = new THREE.CatmullRomCurve3(pts);
    const geo = new THREE.TubeGeometry(curve, pts.length * 2, 0.085, 10, false);
    const mat = new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: 0.85,
      metalness: 0.5,
      roughness: 0.2,
    });
    group.add(new THREE.Mesh(geo, mat));

    const head = pts[pts.length - 1];
    const headMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.32, 24, 24),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    headMesh.position.copy(head);
    group.add(headMesh);

    const badge = createHudBadge([head.x, head.y + 0.75, head.z], {
      text: label,
      borderColor: color === 0x00f2fe ? '#38bdf8' : '#fb7185',
      scale: [1.75, 0.72],
    });
    group.add(badge);
  };

  drawRibbon(step.trailA, 0x00f2fe, '轨迹 A (0.1000)');
  drawRibbon(step.trailB, 0xff0844, '轨迹 B (0.1001)');

  // Twin butterfly wing attractor centers
  const cVal = Math.sqrt(72) * 0.28;
  const yCenter = (27 - 18) * 0.24 + 2.5;
  [-cVal, cVal].forEach((cx) => {
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(0.28, 20, 20),
      new THREE.MeshBasicMaterial({ color: 0xfbbf24 })
    );
    core.position.set(cx, yCenter, cx);
    group.add(core);
  });
}

// ============================================================================
// 6. 3D 双波源相干水波干涉连续曲面
// ============================================================================
function genWaveInterferenceSteps(): VisualizationStep[] {
  const steps: VisualizationStep[] = [];
  for (let i = 0; i < 16; i++) {
    const phase = i * 0.55;
    steps.push({
      type: 'wave-interference',
      phase,
      sourceDist: 5.2,
      description: `双波源相干干涉场 (ωt = ${phase.toFixed(2)})：波源 S₁(-2.6, 0) 与 S₂(+2.6, 0) 激起相长波脊与相消节线`,
      metrics: {
        波源间距: 'd = 5.2',
        当前相位: `${phase.toFixed(2)} rad`,
        干涉模态: '双源相干叠加',
      },
    });
  }
  return steps;
}

function renderWaveInterference(group: THREE.Group, step: VisualizationStep) {
  const phase = step.phase || 0;
  const gridN = 48;
  const size = 14.0;
  const s1 = new THREE.Vector2(-2.6, 0);
  const s2 = new THREE.Vector2(2.6, 0);

  const geo = new THREE.PlaneGeometry(size, size, gridN, gridN);
  geo.rotateX(-Math.PI / 2);

  const pos = geo.attributes.position;
  const colors: number[] = [];
  const col = new THREE.Color();

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const d1 = Math.hypot(x - s1.x, z - s1.y);
    const d2 = Math.hypot(x - s2.x, z - s2.y);

    const w1 = Math.sin(d1 * 1.65 - phase) * Math.exp(-d1 * 0.08);
    const w2 = Math.sin(d2 * 1.65 - phase) * Math.exp(-d2 * 0.08);
    const y = (w1 + w2) * 0.85 + 1.8;
    pos.setY(i, y);

    const norm = (w1 + w2 + 2) / 4;
    col.setHSL(0.56 - norm * 0.18, 0.9, 0.25 + norm * 0.45);
    colors.push(col.r, col.g, col.b);
  }

  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geo.computeVertexNormals();

  const surfaceMat = new THREE.MeshStandardMaterial({
    vertexColors: true,
    metalness: 0.55,
    roughness: 0.18,
    transparent: true,
    opacity: 0.9,
    side: THREE.DoubleSide,
  });
  group.add(new THREE.Mesh(geo, surfaceMat));

  // Source beacons
  [s1, s2].forEach((s, idx) => {
    const orb = new THREE.Mesh(
      new THREE.SphereGeometry(0.35, 24, 24),
      new THREE.MeshBasicMaterial({ color: 0xfbbf24 })
    );
    orb.position.set(s.x, 2.8, s.y);
    group.add(orb);
    group.add(
      createHudBadge([s.x, 3.65, s.y], {
        text: `波源 S${idx + 1}`,
        borderColor: '#fbbf24',
        scale: [1.65, 0.72],
      })
    );
  });
}

// ============================================================================
// 7. 3D 环面流形 + (3, 5) 环面纽结流光
// ============================================================================
function genTorusKnotSteps(): VisualizationStep[] {
  const steps: VisualizationStep[] = [];
  for (let i = 1; i <= 14; i++) {
    const progress = i / 14;
    steps.push({
      type: 'torus-manifold',
      progress,
      p: 3,
      q: 5,
      description: `三维环面 T² = S¹×S¹ 与 (3,5) 环面纽结：流光沿环面缠绕进度 ${(progress * 100).toFixed(0)}%`,
      metrics: {
        流形亏格: 'Genus g = 1',
        纽结参数: '(p=3, q=5)',
        缠绕进度: `${(progress * 100).toFixed(0)}%`,
      },
    });
  }
  return steps;
}

function renderTorusManifold(group: THREE.Group, step: VisualizationStep) {
  const R = 3.8;
  const r = 1.45;
  const centerY = 2.6;

  // Translucent base torus manifold
  const torusGeo = new THREE.TorusGeometry(R, r, 28, 72);
  const torusMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    emissive: 0x0ea5e9,
    emissiveIntensity: 0.2,
    metalness: 0.7,
    roughness: 0.2,
    transparent: true,
    opacity: 0.38,
    wireframe: true,
  });
  const torus = new THREE.Mesh(torusGeo, torusMat);
  torus.rotation.x = Math.PI / 2;
  torus.position.y = centerY;
  group.add(torus);

  // (3, 5) Torus knot curve wrapping the torus surface
  const p = step.p || 3;
  const q = step.q || 5;
  const progress = step.progress || 1;
  const maxT = Math.PI * 2 * progress;
  const knotPts: THREE.Vector3[] = [];
  const totalSegs = Math.max(16, Math.floor(140 * progress));

  for (let i = 0; i <= totalSegs; i++) {
    const t = (i / totalSegs) * maxT;
    const rad = R + (r + 0.08) * Math.cos(q * t);
    const x = rad * Math.cos(p * t);
    const z = rad * Math.sin(p * t);
    const y = centerY + (r + 0.08) * Math.sin(q * t);
    knotPts.push(new THREE.Vector3(x, y, z));
  }

  if (knotPts.length > 2) {
    const curve = new THREE.CatmullRomCurve3(knotPts);
    const tubeGeo = new THREE.TubeGeometry(curve, knotPts.length * 2, 0.11, 12, false);
    const tubeMat = new THREE.MeshStandardMaterial({
      color: 0xf43f5e,
      emissive: 0xf43f5e,
      emissiveIntensity: 0.9,
      metalness: 0.6,
      roughness: 0.18,
    });
    group.add(new THREE.Mesh(tubeGeo, tubeMat));

    const head = knotPts[knotPts.length - 1];
    const orb = new THREE.Mesh(
      new THREE.SphereGeometry(0.28, 20, 20),
      new THREE.MeshBasicMaterial({ color: 0x10b981 })
    );
    orb.position.copy(head);
    group.add(orb);
  }
}

// ============================================================================
// 8. 四维克莱因瓶三维浸入曲面 + 莫比乌斯内外穿梭粒子
// ============================================================================
function genKleinBottleSteps(): VisualizationStep[] {
  const steps: VisualizationStep[] = [];
  for (let i = 0; i < 14; i++) {
    const uProgress = (i / 13) * Math.PI * 2;
    steps.push({
      type: 'klein-manifold',
      uProgress,
      description: `四维克莱因瓶三维浸入：莫比乌斯探测球沿不可定向表面漫游 (u = ${uProgress.toFixed(2)} rad)，无边界连通内外表面`,
      metrics: {
        流形属性: '不可定向闭曲面',
        欧拉示性数: 'χ = 0',
        漫游相位u: `${uProgress.toFixed(2)} rad`,
      },
    });
  }
  return steps;
}

function kleinPoint(u: number, v: number): THREE.Vector3 {
  const a = 2.6;
  const cosU2 = Math.cos(u / 2);
  const sinU2 = Math.sin(u / 2);
  const sinV = Math.sin(v);
  const sin2V = Math.sin(2 * v);
  const r = a + cosU2 * sinV - sinU2 * sin2V;
  const x = r * Math.cos(u) * 1.15;
  const z = r * Math.sin(u) * 1.15;
  const y = (sinU2 * sinV + cosU2 * sin2V) * 1.85 + 2.5;
  return new THREE.Vector3(x, y, z);
}

function renderKleinManifold(group: THREE.Group, step: VisualizationStep) {
  const uSegs = 48;
  const vSegs = 28;
  const positions: number[] = [];
  const colors: number[] = [];
  const indices: number[] = [];
  const col = new THREE.Color();

  for (let iu = 0; iu <= uSegs; iu++) {
    const u = (iu / uSegs) * Math.PI * 2;
    for (let iv = 0; iv <= vSegs; iv++) {
      const v = (iv / vSegs) * Math.PI * 2;
      const p = kleinPoint(u, v);
      positions.push(p.x, p.y, p.z);

      col.setHSL((iu / uSegs) * 0.45 + 0.48, 0.85, 0.42 + 0.15 * Math.sin(v));
      colors.push(col.r, col.g, col.b);
    }
  }

  for (let iu = 0; iu < uSegs; iu++) {
    for (let iv = 0; iv < vSegs; iv++) {
      const a = iu * (vSegs + 1) + iv;
      const b = (iu + 1) * (vSegs + 1) + iv;
      const c = (iu + 1) * (vSegs + 1) + (iv + 1);
      const d = iu * (vSegs + 1) + (iv + 1);
      indices.push(a, b, d, b, c, d);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setIndex(indices);
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geo.computeVertexNormals();

  const mat = new THREE.MeshStandardMaterial({
    vertexColors: true,
    metalness: 0.45,
    roughness: 0.25,
    transparent: true,
    opacity: 0.72,
    side: THREE.DoubleSide,
  });
  group.add(new THREE.Mesh(geo, mat));

  // Möbius traveler path & orb
  const uCurr = step.uProgress || 0;
  const pathPts: THREE.Vector3[] = [];
  for (let k = 0; k <= 60; k++) {
    const u = (k / 60) * Math.PI * 2;
    pathPts.push(kleinPoint(u, u * 0.5));
  }
  const curve = new THREE.CatmullRomCurve3(pathPts);
  group.add(
    new THREE.Mesh(
      new THREE.TubeGeometry(curve, 90, 0.065, 10, false),
      new THREE.MeshBasicMaterial({ color: 0xfbbf24 })
    )
  );

  const probePos = kleinPoint(uCurr, uCurr * 0.5);
  const probe = new THREE.Mesh(
    new THREE.SphereGeometry(0.36, 24, 24),
    new THREE.MeshBasicMaterial({ color: 0xfbbf24 })
  );
  probe.position.copy(probePos);
  group.add(probe);
}

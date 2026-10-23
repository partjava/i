import * as THREE from 'three';
import { VisualizationStep } from '../types';
import { createEnergyArc, createGlowingBeam, createHudBadge } from '../core/HudSpriteCache';

export function generateMath3DSteps(
  algorithm: string,
  rawInput: number[]
): VisualizationStep[] {
  switch (algorithm) {
    case 'fibonacci':
      return genFibonacciSteps(Math.min(Math.max(rawInput.length + 3, 10), 12));
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
// 1. 斐波那契黄金螺旋 + 黄金矩形分形剖分 + Binet 极限收敛
// ============================================================================
function genFibonacciSteps(n: number): VisualizationStep[] {
  const fib = [1, 1];
  const steps: VisualizationStep[] = [
    {
      type: 'fibonacci-3d',
      seq: [1, 1],
      activeIdx: 1,
      description: '初始化斐波那契基准状态 F(0)=1, F(1)=1，底部同步铺设黄金分割矩形螺线网格',
      metrics: { 当前递推项: 'F(1) = 1', 相邻比值: '1.00000', 黄金常数φ: '1.61803' },
    },
  ];

  for (let i = 2; i < n; i++) {
    const next = fib[i - 1] + fib[i - 2];
    fib.push(next);
    const ratio = (fib[i] / fib[i - 1]).toFixed(5);
    const err = Math.abs(fib[i] / fib[i - 1] - 1.6180339887).toExponential(2);
    steps.push({
      type: 'fibonacci-3d',
      seq: [...fib],
      activeIdx: i,
      description: `第 ${i} 阶递推：F(${i}) = F(${i - 1}) + F(${i - 2}) = ${fib[i - 1]} + ${fib[i - 2]} = ${next}，比值 F(${i})/F(${i - 1}) = ${ratio}（逼近误差 ${err}）`,
      metrics: {
        状态转移: `${fib[i - 1]} + ${fib[i - 2]} = ${next}`,
        黄金分割比: `φ ≈ ${ratio}`,
        收敛误差: err,
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

  // Base concentric golden ratio reference rings
  [2.5, 4.5, 6.8, 9.2].forEach((r) => {
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(r - 0.03, r + 0.03, 64),
      new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.2,
      })
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.02;
    group.add(ring);
  });

  seq.forEach((val, idx) => {
    const angle = idx * 0.65;
    const radius = 1.5 + idx * 0.68;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const h = 0.75 + (val / maxVal) * 5.8;

    const isCurr = idx === step.activeIdx;
    const isPrev = idx === step.activeIdx - 1 || idx === step.activeIdx - 2;

    const color = isCurr ? 0x10b981 : isPrev ? 0xf59e0b : 0x6366f1;
    const cyl = new THREE.Mesh(
      new THREE.CylinderGeometry(0.44, 0.54, h, 24),
      new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: isCurr ? 0.9 : isPrev ? 0.68 : 0.3,
        metalness: 0.6,
        roughness: 0.2,
      })
    );
    cyl.position.set(x, h / 2, z);
    group.add(cyl);

    const top = new THREE.Vector3(x, h, z);
    tops.push(top);
    spiralPts.push(new THREE.Vector3(x, h + 0.15, z));

    group.add(
      createHudBadge([x, h + 0.95, z], {
        text: `${val}`,
        subText: `F(${idx})`,
        borderColor: isCurr ? '#10b981' : isPrev ? '#fbbf24' : '#818cf8',
        scale: [1.75, 0.85],
      })
    );
  });

  if (spiralPts.length > 2) {
    const curve = new THREE.CatmullRomCurve3(spiralPts);
    group.add(
      new THREE.Mesh(
        new THREE.TubeGeometry(curve, spiralPts.length * 8, 0.075, 10, false),
        new THREE.MeshBasicMaterial({ color: 0xfbbf24 })
      )
    );
  }

  const curr = step.activeIdx;
  if (curr >= 2 && tops[curr] && tops[curr - 1] && tops[curr - 2]) {
    group.add(createEnergyArc(tops[curr - 1], tops[curr], 1.6, 0xf59e0b, 0.085, 0.95));
    group.add(createEnergyArc(tops[curr - 2], tops[curr], 2.3, 0x38bdf8, 0.085, 0.95));
  }
}

// ============================================================================
// 2. 傅里叶级数 3D 时频双域合成 (5阶奇次谐波 + 相量本轮圆 + 右侧频谱能量墙)
// ============================================================================
function genFourierSineSteps(): VisualizationStep[] {
  const steps: VisualizationStep[] = [];
  for (let s = 0; s < 16; s++) {
    const numHarmonics = Math.min(5, 1 + Math.floor(s / 3));
    const phase = s * 0.42;
    const maxOdd = numHarmonics * 2 - 1;
    steps.push({
      type: 'fourier-sine',
      phase,
      numHarmonics,
      description: `傅里叶时频双域推演：左侧 ${numHarmonics} 级旋转相量本轮圆 + 中央 1..${maxOdd} 次谐波分量 + 右侧频域幅值谱 Cₙ=4/(nπ) 合成为前方方波`,
      metrics: {
        谐波阶数: `N=${numHarmonics} (1..${maxOdd}ω₀)`,
        基波角频率: `ωt=${phase.toFixed(2)} rad`,
        吉布斯超调: '≈ 8.95% (Gibbs)',
      },
    });
  }
  return steps;
}

function renderFourierSine(group: THREE.Group, step: VisualizationStep) {
  const phase = step.phase || 0;
  const numH = step.numHarmonics || 4;
  const harmColors = [0x38bdf8, 0xa855f7, 0xf59e0b, 0xf43f5e, 0x06b6d4];
  const harmHex = ['#38bdf8', '#a855f7', '#f59e0b', '#f43f5e', '#06b6d4'];

  // 1. Rotating Phasor Epicycles on the left (x = -7.6)
  let cx = -7.6;
  let cy = 2.6;
  for (let hIdx = 0; hIdx < numH; hIdx++) {
    const n = hIdx * 2 + 1;
    const radius = (4 / Math.PI) * (1.45 / n);
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(radius, 0.035, 12, 48),
      new THREE.MeshBasicMaterial({
        color: harmColors[hIdx % harmColors.length],
        transparent: true,
        opacity: 0.75,
      })
    );
    ring.position.set(cx, cy, 3.2);
    group.add(ring);

    const nx = cx + radius * Math.cos(n * phase);
    const ny = cy + radius * Math.sin(n * phase);
    group.add(
      createGlowingBeam(
        new THREE.Vector3(cx, cy, 3.2),
        new THREE.Vector3(nx, ny, 3.2),
        0.05,
        0xfbbf24,
        0.95
      )
    );
    cx = nx;
    cy = ny;
  }

  group.add(
    createHudBadge([-7.6, 5.2, 3.2], {
      text: '相量本轮圆',
      subText: '∑ cₙe^(inωt)',
      borderColor: '#fbbf24',
      scale: [2.2, 0.9],
    })
  );

  // 2. Individual harmonic wave ribbons along Z axis + Frequency Spectrum Pillars on the right
  for (let hIdx = 0; hIdx < numH; hIdx++) {
    const n = hIdx * 2 + 1;
    const z = -3.8 + hIdx * 1.45;
    const amp = (4 / Math.PI) * (1.45 / n);
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 72; i++) {
      const t = (i / 72) * Math.PI * 3;
      const x = -4.8 + (i / 72) * 10.2;
      const y = 2.6 + amp * Math.sin(n * (t + phase));
      pts.push(new THREE.Vector3(x, y, z));
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    const col = harmColors[hIdx % harmColors.length];
    group.add(
      new THREE.Mesh(
        new THREE.TubeGeometry(curve, 90, 0.06, 10, false),
        new THREE.MeshStandardMaterial({
          color: col,
          emissive: col,
          emissiveIntensity: 0.75,
          metalness: 0.5,
          roughness: 0.2,
        })
      )
    );

    // Frequency Domain Spectrum Pillar at x = 6.8
    const specH = Math.max(0.45, amp * 2.4);
    const specBar = new THREE.Mesh(
      new THREE.BoxGeometry(0.55, specH, 0.55),
      new THREE.MeshStandardMaterial({
        color: col,
        emissive: col,
        emissiveIntensity: 0.85,
      })
    );
    specBar.position.set(6.8, specH / 2, z);
    group.add(specBar);

    group.add(
      createHudBadge([6.8, specH + 0.75, z], {
        text: `${n}ω₀`,
        subText: `1/${n}`,
        borderColor: harmHex[hIdx % harmHex.length],
        scale: [1.45, 0.72],
      })
    );
  }

  // 3. Synthesized Square Wave in front (z = 3.2)
  const sumPts: THREE.Vector3[] = [];
  for (let i = 0; i <= 96; i++) {
    const t = (i / 96) * Math.PI * 3;
    const x = -4.8 + (i / 96) * 10.2;
    let y = 2.6;
    for (let hIdx = 0; hIdx < numH; hIdx++) {
      const n = hIdx * 2 + 1;
      y += (4 / Math.PI) * (1.45 / n) * Math.sin(n * (t + phase));
    }
    sumPts.push(new THREE.Vector3(x, y, 3.2));
  }
  const sumCurve = new THREE.CatmullRomCurve3(sumPts);
  group.add(
    new THREE.Mesh(
      new THREE.TubeGeometry(sumCurve, 120, 0.125, 12, false),
      new THREE.MeshStandardMaterial({
        color: 0x10b981,
        emissive: 0x10b981,
        emissiveIntensity: 0.95,
        metalness: 0.6,
        roughness: 0.15,
      })
    )
  );

  if (sumPts.length > 0) {
    group.add(
      createGlowingBeam(
        new THREE.Vector3(cx, cy, 3.2),
        sumPts[0],
        0.045,
        0xfbbf24,
        0.9
      )
    );
  }
}

// ============================================================================
// 3. DNA 双螺旋 + Frenet-Serret 微分标架 (T, N, B) + 黄金叶序对数螺线星云
// ============================================================================
function genSpiralSteps(): VisualizationStep[] {
  const steps: VisualizationStep[] = [];
  for (let i = 1; i <= 16; i++) {
    const turns = 0.8 + (i / 16) * 2.4;
    const probeRatio = i / 16;
    steps.push({
      type: 'dna-spiral',
      turns,
      probeRatio,
      description: `微分几何三维螺旋流形：双链缠绕 ${turns.toFixed(2)} 圈，Frenet-Serret 正交标架 (切向量T/主法N/副法B) 沿曲线巡航，底部展开 F₈=21 / F₁₃=34 黄金叶序螺线臂`,
      metrics: {
        曲率与挠率: 'κ=R/(R²+c²), τ=c/(R²+c²)',
        螺旋圈数: `${turns.toFixed(2)} Turns`,
        黄金发散角: '137.50776°',
      },
    });
  }
  return steps;
}

function renderDnaSpiral(group: THREE.Group, step: VisualizationStep) {
  const turns = step.turns || 2.5;
  const maxT = turns * Math.PI * 2;
  const segments = 84;
  const R = 2.35;
  const strandA: THREE.Vector3[] = [];
  const strandB: THREE.Vector3[] = [];

  // Central helical axis pillar
  group.add(
    createGlowingBeam(
      new THREE.Vector3(0, -1.6, 0),
      new THREE.Vector3(0, 6.2, 0),
      0.035,
      0x475569,
      0.5
    )
  );

  for (let i = 0; i <= segments; i++) {
    const ratio = i / segments;
    const t = ratio * maxT;
    const y = -1.2 + ratio * 7.0;
    const pA = new THREE.Vector3(R * Math.cos(t), y, R * Math.sin(t));
    const pB = new THREE.Vector3(R * Math.cos(t + Math.PI), y, R * Math.sin(t + Math.PI));
    strandA.push(pA);
    strandB.push(pB);

    // Base-pair hydrogen bond rungs + backbone phosphate spheres every 3 steps
    if (i % 3 === 0) {
      const mid = new THREE.Vector3(0, y, 0);
      const isGC = i % 6 === 0;
      group.add(createGlowingBeam(pA, mid, 0.055, isGC ? 0xfbbf24 : 0x38bdf8, 0.9));
      group.add(createGlowingBeam(mid, pB, 0.055, isGC ? 0x10b981 : 0xf43f5e, 0.9));

      const nodeGeo = new THREE.SphereGeometry(0.18, 16, 16);
      const nodeA = new THREE.Mesh(
        nodeGeo,
        new THREE.MeshStandardMaterial({ color: 0x06b6d4, emissive: 0x06b6d4, emissiveIntensity: 0.8 })
      );
      nodeA.position.copy(pA);
      group.add(nodeA);

      const nodeB = new THREE.Mesh(
        nodeGeo,
        new THREE.MeshStandardMaterial({ color: 0xf43f5e, emissive: 0xf43f5e, emissiveIntensity: 0.8 })
      );
      nodeB.position.copy(pB);
      group.add(nodeB);
    }
  }

  if (strandA.length > 2) {
    const curveA = new THREE.CatmullRomCurve3(strandA);
    const curveB = new THREE.CatmullRomCurve3(strandB);
    group.add(
      new THREE.Mesh(
        new THREE.TubeGeometry(curveA, 110, 0.12, 12, false),
        new THREE.MeshStandardMaterial({
          color: 0x06b6d4,
          emissive: 0x06b6d4,
          emissiveIntensity: 0.85,
          metalness: 0.6,
          roughness: 0.2,
        })
      )
    );
    group.add(
      new THREE.Mesh(
        new THREE.TubeGeometry(curveB, 110, 0.12, 12, false),
        new THREE.MeshStandardMaterial({
          color: 0xf43f5e,
          emissive: 0xf43f5e,
          emissiveIntensity: 0.85,
          metalness: 0.6,
          roughness: 0.2,
        })
      )
    );
  }

  // Frenet-Serret Moving Frame (T, N, B) on Strand A
  const pIdx = Math.min(segments - 1, Math.max(1, Math.floor((step.probeRatio || 0.7) * segments)));
  const origin = strandA[pIdx];
  const tangent = new THREE.Vector3().subVectors(strandA[pIdx + 1], strandA[pIdx - 1]).normalize();
  const normal = new THREE.Vector3(-origin.x, 0, -origin.z).normalize();
  const binormal = new THREE.Vector3().crossVectors(tangent, normal).normalize();

  const tEnd = origin.clone().addScaledVector(tangent, 1.8);
  const nEnd = origin.clone().addScaledVector(normal, 1.8);
  const bEnd = origin.clone().addScaledVector(binormal, 1.8);

  group.add(createGlowingBeam(origin, tEnd, 0.065, 0x10b981, 1.0));
  group.add(createGlowingBeam(origin, nEnd, 0.065, 0xfbbf24, 1.0));
  group.add(createGlowingBeam(origin, bEnd, 0.065, 0xa855f7, 1.0));

  group.add(
    createHudBadge([tEnd.x, tEnd.y + 0.45, tEnd.z], {
      text: '切向量 T',
      subText: '主法N · 副法B',
      borderColor: '#10b981',
      scale: [1.9, 0.85],
    })
  );

  // Outer Golden Phyllotaxis Sunflower Galaxy + Fibonacci Parastichy Spiral Arms at base
  const goldenAngle = 137.507764 * (Math.PI / 180);
  const seedCount = 110;
  const seedPositions: THREE.Vector3[] = [];
  const dotGeo = new THREE.SphereGeometry(0.12, 12, 12);

  for (let k = 1; k <= seedCount; k++) {
    const theta = k * goldenAngle;
    const rad = 0.58 * Math.sqrt(k);
    const y = -1.45 - (k / seedCount) * 0.35;
    const pos = new THREE.Vector3(rad * Math.cos(theta), y, rad * Math.sin(theta));
    seedPositions.push(pos);

    const dot = new THREE.Mesh(
      dotGeo,
      new THREE.MeshBasicMaterial({ color: k % 8 === 0 ? 0xfbbf24 : k % 5 === 0 ? 0x38bdf8 : 0xa855f7 })
    );
    dot.position.copy(pos);
    group.add(dot);
  }

  // Draw 8 Fibonacci Parastichy spiral arms (connecting every k -> k+8 seed!)
  for (let arm = 0; arm < 8; arm++) {
    const armPts: THREE.Vector3[] = [];
    for (let idx = arm; idx < seedPositions.length; idx += 8) {
      armPts.push(seedPositions[idx]);
    }
    if (armPts.length > 2) {
      const armCurve = new THREE.CatmullRomCurve3(armPts);
      group.add(
        new THREE.Mesh(
          new THREE.TubeGeometry(armCurve, 32, 0.025, 6, false),
          new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.45 })
        )
      );
    }
  }
}

// ============================================================================
// 4. 曼德博集合 3D 分形峡谷地形 + 双复数轨道 (收敛 vs 混沌逃逸)
// ============================================================================
function genMandelbrotSteps(): VisualizationStep[] {
  const maxIters = [8, 12, 18, 26, 36, 48, 64, 80, 96, 112];
  return maxIters.map((maxIter, idx) => ({
    type: 'mandelbrot-mesh',
    maxIter,
    escapeC: [-0.745 + idx * 0.008, 0.186],
    boundedC: [-0.12, 0.65],
    description: `曼德博复动力分形峡谷 (迭代上限 MaxIter = ${maxIter})：对比主心形线周期吸引子轨道 (绿色收敛) 与分形边界混沌轨道 (金色逃逸)`,
    metrics: {
      最大迭代次数: `MaxIter = ${maxIter}`,
      逃逸半径判据: '|zₙ| > 2.0',
      分形边界维数: 'Hausdorff D ≈ 2.0',
    },
  }));
}

function renderMandelbrotMesh(group: THREE.Group, step: VisualizationStep) {
  const maxIter = step.maxIter || 48;
  const gridN = 48;
  const size = 14.0;

  const geometry = new THREE.PlaneGeometry(size, size, gridN, gridN);
  geometry.rotateX(-Math.PI / 2);

  const posAttr = geometry.attributes.position;
  const colors: number[] = [];
  const colorObj = new THREE.Color();

  for (let i = 0; i < posAttr.count; i++) {
    const vx = posAttr.getX(i);
    const vz = posAttr.getZ(i);

    const cr = (vx / size) * 2.6 - 0.65;
    const ci = (vz / size) * 2.4;

    let zr = 0,
      zi = 0,
      iter = 0;
    while (zr * zr + zi * zi <= 4 && iter < maxIter) {
      const tmp = zr * zr - zi * zi + cr;
      zi = 2 * zr * zi + ci;
      zr = tmp;
      iter++;
    }

    const ratio = iter / maxIter;
    const height = iter === maxIter ? 0.12 : Math.sin(Math.pow(ratio, 0.6) * Math.PI) * 4.2;
    posAttr.setY(i, height);

    if (iter === maxIter) {
      colorObj.setHex(0x0b1120);
    } else {
      colorObj.setHSL(0.62 - ratio * 0.56, 0.92, 0.32 + ratio * 0.36);
    }
    colors.push(colorObj.r, colorObj.g, colorObj.b);
  }

  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.computeVertexNormals();

  group.add(
    new THREE.Mesh(
      geometry,
      new THREE.MeshStandardMaterial({
        vertexColors: true,
        metalness: 0.48,
        roughness: 0.28,
        side: THREE.DoubleSide,
      })
    )
  );

  // Helper to draw a 3D complex iteration orbit z_{n+1} = z_n^2 + c
  const drawComplexOrbit = (cPair: [number, number], color: number, label: string, border: string) => {
    const [cr, ci] = cPair;
    let zr = 0,
      zi = 0;
    const orbitPts: THREE.Vector3[] = [];
    for (let k = 0; k < 16; k++) {
      const px = ((cr + zr * 0.4 + 0.65) / 2.6) * size - size * 0.25;
      const pz = ((ci + zi * 0.4) / 2.4) * size;
      orbitPts.push(new THREE.Vector3(px, 2.2 + k * 0.22, pz));
      const nr = zr * zr - zi * zi + cr;
      zi = 2 * zr * zi + ci;
      zr = nr;
      if (zr * zr + zi * zi > 6) break;
    }
    if (orbitPts.length > 2) {
      const curve = new THREE.CatmullRomCurve3(orbitPts);
      group.add(
        new THREE.Mesh(
          new THREE.TubeGeometry(curve, 48, 0.08, 10, false),
          new THREE.MeshBasicMaterial({ color })
        )
      );
      const top = orbitPts[orbitPts.length - 1];
      group.add(
        createHudBadge([top.x, top.y + 0.7, top.z], {
          text: label,
          subText: `c=${cr.toFixed(2)}+${ci.toFixed(2)}i`,
          borderColor: border,
          scale: [2.3, 0.88],
        })
      );
    }
  };

  drawComplexOrbit(step.escapeC || [-0.74, 0.18], 0xfbbf24, '逃逸发散轨', '#fbbf24');
  drawComplexOrbit(step.boundedC || [-0.12, 0.65], 0x10b981, '周期收敛轨', '#10b981');
}

// ============================================================================
// 5. 洛伦兹混沌双轨吸引子 (双翼不动点圆盘 + 李雅普诺夫分岔测距激光)
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

  const fullA = integrate(0.1, 0, 0, 1440);
  const fullB = integrate(0.1001, 0, 0, 1440);

  const steps: VisualizationStep[] = [];
  const totalSlices = 16;
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
      dist: Number(dist),
      description:
        Number(dist) < 0.6
          ? `洛伦兹相空间积分 (${s}/${totalSlices})：初值微扰 Δx₀=10⁻⁴，当前双轨仍沿同一吸引翼同步伴飞（相空间欧氏距离 ||Δr|| = ${dist}）`
          : `蝴蝶效应指数分岔 (${s}/${totalSlices})：正李雅普诺夫指数 λ₁≈0.9056 放大初值误差，青/红双轨跃迁至不同蝴蝶翼（距离 ||Δr|| = ${dist}）！`,
      metrics: {
        最大李雅普诺夫指数: 'λ₁ ≈ +0.9056',
        相空间距离: `||Δr(t)|| = ${dist}`,
        状态: Number(dist) < 0.6 ? '近距离伴飞' : '跨翼混沌分岔',
      },
    });
  }
  return steps;
}

function renderLorenzDual(group: THREE.Group, step: VisualizationStep) {
  const drawRibbon = (ptsRaw: [number, number, number][], color: number, label: string) => {
    if (!ptsRaw || ptsRaw.length < 2) return null;
    const pts = ptsRaw.map((p) => new THREE.Vector3(p[0], p[1], p[2]));
    const curve = new THREE.CatmullRomCurve3(pts);
    group.add(
      new THREE.Mesh(
        new THREE.TubeGeometry(curve, pts.length * 2, 0.085, 10, false),
        new THREE.MeshStandardMaterial({
          color,
          emissive: color,
          emissiveIntensity: 0.85,
          metalness: 0.5,
          roughness: 0.2,
        })
      )
    );

    const head = pts[pts.length - 1];
    const headMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.34, 24, 24),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    headMesh.position.copy(head);
    group.add(headMesh);

    group.add(
      createHudBadge([head.x, head.y + 0.85, head.z], {
        text: label,
        borderColor: color === 0x00f2fe ? '#38bdf8' : '#fb7185',
        scale: [1.85, 0.78],
      })
    );
    return head;
  };

  const headA = drawRibbon(step.trailA, 0x00f2fe, '轨 A (0.1000)');
  const headB = drawRibbon(step.trailB, 0xff0844, '轨 B (0.1001)');

  // Live divergence laser beam connecting Head A and Head B
  if (headA && headB && step.dist > 0.35) {
    group.add(createGlowingBeam(headA, headB, 0.045, 0xa855f7, 0.85));
    const mid = new THREE.Vector3().addVectors(headA, headB).multiplyScalar(0.5);
    group.add(
      createHudBadge([mid.x, mid.y + 0.65, mid.z], {
        text: `Δr=${step.dist.toFixed(1)}`,
        borderColor: '#a855f7',
        scale: [1.55, 0.72],
      })
    );
  }

  // Twin butterfly wing saddle-focus equilibrium cores C+ and C-
  const cVal = Math.sqrt(72) * 0.28;
  const yCenter = (27 - 18) * 0.24 + 2.5;
  [
    { pos: [-cVal, yCenter, -cVal], name: '不动点 C⁻' },
    { pos: [cVal, yCenter, cVal], name: '不动点 C⁺' },
  ].forEach((eq) => {
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(0.3, 20, 20),
      new THREE.MeshBasicMaterial({ color: 0xfbbf24 })
    );
    core.position.set(eq.pos[0], eq.pos[1], eq.pos[2]);
    group.add(core);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.85, 0.04, 12, 40),
      new THREE.MeshBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.45 })
    );
    ring.position.set(eq.pos[0], eq.pos[1], eq.pos[2]);
    ring.rotation.y = Math.PI / 4;
    group.add(ring);
  });
}

// ============================================================================
// 6. 3D 双波源相干水波干涉 + 双曲干涉腹线/节线光弧
// ============================================================================
function genWaveInterferenceSteps(): VisualizationStep[] {
  const steps: VisualizationStep[] = [];
  for (let i = 0; i < 16; i++) {
    const phase = i * 0.52;
    steps.push({
      type: 'wave-interference',
      phase,
      sourceDist: 5.2,
      description: `三维相干波场叠加 (ωt = ${phase.toFixed(2)} rad)：双振源 S₁, S₂ 激起同心球面波，波程差 Δr = mλ 处形成双曲线型相长干涉波脊`,
      metrics: {
        相长条件: 'Δr = |r₁-r₂| = mλ',
        相消条件: 'Δr = (m+1/2)λ',
        当前相位: `${phase.toFixed(2)} rad`,
      },
    });
  }
  return steps;
}

function renderWaveInterference(group: THREE.Group, step: VisualizationStep) {
  const phase = step.phase || 0;
  const gridN = 52;
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

    const w1 = Math.sin(d1 * 1.65 - phase) * Math.exp(-d1 * 0.07);
    const w2 = Math.sin(d2 * 1.65 - phase) * Math.exp(-d2 * 0.07);
    const y = (w1 + w2) * 0.9 + 1.9;
    pos.setY(i, y);

    const norm = (w1 + w2 + 2) / 4;
    col.setHSL(0.57 - norm * 0.2, 0.92, 0.24 + norm * 0.46);
    colors.push(col.r, col.g, col.b);
  }

  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geo.computeVertexNormals();

  group.add(
    new THREE.Mesh(
      geo,
      new THREE.MeshStandardMaterial({
        vertexColors: true,
        metalness: 0.55,
        roughness: 0.18,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
      })
    )
  );

  // Central Constructive Interference Axis (m = 0, r1 == r2 along x = 0)
  group.add(
    createGlowingBeam(
      new THREE.Vector3(0, 3.2, -6.2),
      new THREE.Vector3(0, 3.2, 6.2),
      0.055,
      0xa855f7,
      0.75
    )
  );
  group.add(
    createHudBadge([0, 4.1, -4.8], {
      text: '中央加强脊 (Δr=0)',
      borderColor: '#a855f7',
      scale: [2.3, 0.82],
    })
  );

  [s1, s2].forEach((s, idx) => {
    const orb = new THREE.Mesh(
      new THREE.SphereGeometry(0.38, 24, 24),
      new THREE.MeshBasicMaterial({ color: 0xfbbf24 })
    );
    orb.position.set(s.x, 2.9, s.y);
    group.add(orb);
    group.add(
      createHudBadge([s.x, 3.85, s.y], {
        text: `相干源 S${idx + 1}`,
        borderColor: '#fbbf24',
        scale: [1.85, 0.78],
      })
    );
  });
}

// ============================================================================
// 7. 3D 环面流形 T² = S¹×S¹ + 同调基圈 (经圈/纬圈) + (3, 5) 环面纽结
// ============================================================================
function genTorusKnotSteps(): VisualizationStep[] {
  const steps: VisualizationStep[] = [];
  for (let i = 1; i <= 15; i++) {
    const progress = i / 15;
    steps.push({
      type: 'torus-manifold',
      progress,
      p: 3,
      q: 5,
      description: `环面代数拓扑 T²=S¹×S¹：展示一阶同调群生成元（青色纬圈 + 金色经圈）及表面缠绕 (p=3, q=5) 环面纽结（进度 ${(progress * 100).toFixed(0)}%）`,
      metrics: {
        基本群: 'π₁(T²) ≅ ℤ × ℤ',
        纽结缠绕数: '(p=3, q=5) 互质',
        流线进度: `${(progress * 100).toFixed(0)}%`,
      },
    });
  }
  return steps;
}

function renderTorusManifold(group: THREE.Group, step: VisualizationStep) {
  const R = 3.8;
  const r = 1.45;
  const centerY = 2.6;

  // 1. Translucent Torus Manifold
  const torusGeo = new THREE.TorusGeometry(R, r, 32, 72);
  const torus = new THREE.Mesh(
    torusGeo,
    new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      emissive: 0x0ea5e9,
      emissiveIntensity: 0.22,
      metalness: 0.7,
      roughness: 0.2,
      transparent: true,
      opacity: 0.36,
      wireframe: true,
    })
  );
  torus.rotation.x = Math.PI / 2;
  torus.position.y = centerY;
  group.add(torus);

  // 2. Fundamental Homology Generators: Longitude (纬圈) & Meridian (经圈)
  const lonRing = new THREE.Mesh(
    new THREE.TorusGeometry(R + r + 0.04, 0.055, 16, 64),
    new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
  );
  lonRing.rotation.x = Math.PI / 2;
  lonRing.position.y = centerY;
  group.add(lonRing);

  const merRing = new THREE.Mesh(
    new THREE.TorusGeometry(r + 0.05, 0.06, 16, 48),
    new THREE.MeshBasicMaterial({ color: 0xfbbf24 })
  );
  merRing.position.set(R, centerY, 0);
  group.add(merRing);

  group.add(
    createHudBadge([R + 1.8, centerY + 1.8, 0], {
      text: '经圈 α · 纬圈 β',
      subText: 'H₁(T²) = ℤ ⊕ ℤ',
      borderColor: '#fbbf24',
      scale: [2.4, 0.9],
    })
  );

  // 3. (3, 5) Torus Knot Ribbon
  const p = step.p || 3;
  const q = step.q || 5;
  const progress = step.progress || 1;
  const maxT = Math.PI * 2 * progress;
  const knotPts: THREE.Vector3[] = [];
  const totalSegs = Math.max(16, Math.floor(150 * progress));

  for (let i = 0; i <= totalSegs; i++) {
    const t = (i / totalSegs) * maxT;
    const rad = R + (r + 0.09) * Math.cos(q * t);
    const x = rad * Math.cos(p * t);
    const z = rad * Math.sin(p * t);
    const y = centerY + (r + 0.09) * Math.sin(q * t);
    knotPts.push(new THREE.Vector3(x, y, z));
  }

  if (knotPts.length > 2) {
    const curve = new THREE.CatmullRomCurve3(knotPts);
    group.add(
      new THREE.Mesh(
        new THREE.TubeGeometry(curve, knotPts.length * 2, 0.115, 12, false),
        new THREE.MeshStandardMaterial({
          color: 0xf43f5e,
          emissive: 0xf43f5e,
          emissiveIntensity: 0.92,
          metalness: 0.6,
          roughness: 0.18,
        })
      )
    );

    const head = knotPts[knotPts.length - 1];
    const orb = new THREE.Mesh(
      new THREE.SphereGeometry(0.3, 20, 20),
      new THREE.MeshBasicMaterial({ color: 0x10b981 })
    );
    orb.position.copy(head);
    group.add(orb);
  }
}

// ============================================================================
// 8. 四维克莱因瓶三维浸入 + 法向量反转箭头 (证明不可定向性)
// ============================================================================
function genKleinBottleSteps(): VisualizationStep[] {
  const steps: VisualizationStep[] = [];
  for (let i = 0; i < 15; i++) {
    const uProgress = (i / 14) * Math.PI * 2;
    const normalFlip = Math.cos(uProgress / 2).toFixed(2);
    steps.push({
      type: 'klein-manifold',
      uProgress,
      description: `四维克莱因瓶三维浸入 (u = ${uProgress.toFixed(2)} rad)：沿莫比乌斯测地线巡航一周后，单位法向量 n 发生反向 (cos(u/2)=${normalFlip})，直观证明曲面不可定向且无内外之分`,
      metrics: {
        拓扑属性: '不可定向闭流形 (χ=0)',
        当前相位u: `${uProgress.toFixed(2)} rad`,
        法向朝向因子: `n·n₀ = ${normalFlip}`,
      },
    });
  }
  return steps;
}

function kleinPoint(u: number, v: number): THREE.Vector3 {
  const a = 2.65;
  const cosU2 = Math.cos(u / 2);
  const sinU2 = Math.sin(u / 2);
  const sinV = Math.sin(v);
  const sin2V = Math.sin(2 * v);
  const r = a + cosU2 * sinV - sinU2 * sin2V;
  const x = r * Math.cos(u) * 1.15;
  const z = r * Math.sin(u) * 1.15;
  const y = (sinU2 * sinV + cosU2 * sin2V) * 1.88 + 2.5;
  return new THREE.Vector3(x, y, z);
}

function renderKleinManifold(group: THREE.Group, step: VisualizationStep) {
  const uSegs = 52;
  const vSegs = 30;
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

  group.add(
    new THREE.Mesh(
      geo,
      new THREE.MeshStandardMaterial({
        vertexColors: true,
        metalness: 0.45,
        roughness: 0.25,
        transparent: true,
        opacity: 0.72,
        side: THREE.DoubleSide,
      })
    )
  );

  // Möbius geodesic curve & Normal Vector reversal demonstration
  const uCurr = step.uProgress || 0;
  const pathPts: THREE.Vector3[] = [];
  for (let k = 0; k <= 64; k++) {
    const u = (k / 64) * Math.PI * 2;
    pathPts.push(kleinPoint(u, u * 0.5));
  }
  const curve = new THREE.CatmullRomCurve3(pathPts);
  group.add(
    new THREE.Mesh(
      new THREE.TubeGeometry(curve, 96, 0.07, 10, false),
      new THREE.MeshBasicMaterial({ color: 0xfbbf24 })
    )
  );

  const probePos = kleinPoint(uCurr, uCurr * 0.5);
  const probe = new THREE.Mesh(
    new THREE.SphereGeometry(0.38, 24, 24),
    new THREE.MeshBasicMaterial({ color: 0xfbbf24 })
  );
  probe.position.copy(probePos);
  group.add(probe);

  // Normal vector arrow flipping direction over [0, 2π]
  const normalDir = new THREE.Vector3(
    Math.cos(uCurr / 2) * Math.cos(uCurr),
    Math.sin(uCurr / 2),
    Math.cos(uCurr / 2) * Math.sin(uCurr)
  ).normalize();
  const nTip = probePos.clone().addScaledVector(normalDir, 1.5);
  group.add(createGlowingBeam(probePos, nTip, 0.06, 0xf43f5e, 1.0));
  group.add(
    createHudBadge([nTip.x, nTip.y + 0.65, nTip.z], {
      text: '法向量 n(u)',
      subText: uCurr > Math.PI ? '已反转至内壁' : '初始外壁朝向',
      borderColor: '#f43f5e',
      scale: [2.2, 0.88],
    })
  );
}

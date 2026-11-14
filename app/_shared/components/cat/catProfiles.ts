import * as THREE from 'three';

/**
 * 黑猫模型的「特征点档案」
 * 所有坐标都在「归一化模型空间」：高度 0→1、xz 以包围盒中心为原点、+Z 为正脸朝向。
 * Tripo 导出的两只猫本身就是这个空间，所以下面的预设值是对 GLB 顶点逐一分析后量出来的。
 */

export type CatEyeStyle = 'amber' | 'emerald' | 'sapphire' | 'pixel';

export interface CatFaceTuning {
  /** 五官水平中心 */
  centerX: number;
  /** 眼睛中心高度 */
  eyeY: number;
  /** 两眼中心间距 */
  eyeSpacing: number;
  /** 像素眼宽 / 高 */
  eyeW: number;
  eyeH: number;
  /** 品字嘴中心高度 */
  mouthY: number;
  /** 品字嘴单个方块边长 */
  mouthSize: number;
  /** 五官离开模型表面的距离（防止被毛刺穿透） */
  surfaceOffset: number;
  /** 眼眸风格：3D 琉璃猫眼（琥珀/翡翠/星河蓝）或经典像素 */
  eyeStyle?: CatEyeStyle;
}

export interface CatProfile {
  id: string;
  face: CatFaceTuning;
  /** 左右耳尖（用于银白耳缘着色 + 耳朵抖动） */
  earTipL: THREE.Vector3;
  earTipR: THREE.Vector3;
  earSize: number;
  /** 头部旋转枢轴（脖子位置）与头部权重范围 */
  headPivot: THREE.Vector3;
  headRange: [number, number];
  /** 头部区域的最小 z（再往后就是背部/尾巴，不跟着转头） */
  headZMin: number;
  /** 尾巴根部 / 尾尖 / 尾巴粗细 / 尾尖银白半径 */
  tailBase: THREE.Vector3;
  tailTip: THREE.Vector3;
  tailRadius: number;
  tailWhiteRadius: number;
  /** 呼吸起伏：胸腔中心与高度权重区间 [淡入起, 淡入止, 淡出起, 淡出止] */
  bodyCenter: THREE.Vector3;
  breathRange: [number, number, number, number];
  /** 肉垫高度（以下为哑光深棕爪子） */
  pawHeight: number;
  /** 胡须遮罩 [中心x, 最小|dx|, y0, y1]，null 表示没有胡须 */
  whisker: [number, number, number, number] | null;
}

const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

/** 乖巧坐姿黑猫（black plush cat 3d model.glb → /models/cat-standing.glb） */
export const SITTING_CAT_PROFILE: CatProfile = {
  id: 'sitting',
  face: {
    centerX: -0.11,
    eyeY: 0.64,
    eyeSpacing: 0.186,
    eyeW: 0.032,
    eyeH: 0.078,
    mouthY: 0.558,
    mouthSize: 0.018,
    surfaceOffset: 0.015,
    eyeStyle: 'amber'
  },
  earTipL: v(-0.268, 1.0, 0.279),
  earTipR: v(0.083, 0.981, 0.294),
  earSize: 0.16,
  headPivot: v(-0.11, 0.47, 0.18),
  headRange: [0.38, 0.50],
  headZMin: -0.06,
  tailBase: v(0.2, 0.09, -0.22),
  tailTip: v(0.43, 0.08, -0.17),
  tailRadius: 0.11,
  tailWhiteRadius: 0.13,
  bodyCenter: v(-0.04, 0.25, -0.1),
  breathRange: [0.1, 0.22, 0.4, 0.52],
  pawHeight: 0.1,
  whisker: null
};

/** 直立站起黑猫（fluffy black cat 3d model.glb → /models/cat-crouching.glb） */
export const UPRIGHT_CAT_PROFILE: CatProfile = {
  id: 'upright',
  face: {
    centerX: -0.004,
    eyeY: 0.684,
    eyeSpacing: 0.206,
    eyeW: 0.032,
    eyeH: 0.076,
    mouthY: 0.602,
    mouthSize: 0.016,
    surfaceOffset: 0.016,
    eyeStyle: 'amber'
  },
  earTipL: v(-0.234, 0.997, 0.17),
  earTipR: v(0.201, 1.0, 0.145),
  earSize: 0.17,
  headPivot: v(-0.004, 0.52, 0.1),
  headRange: [0.42, 0.52],
  headZMin: -0.14,
  tailBase: v(0.06, 0.24, -0.14),
  tailTip: v(0.32, 0.45, -0.36),
  tailRadius: 0.13,
  tailWhiteRadius: 0.11,
  bodyCenter: v(0.0, 0.3, 0.03),
  breathRange: [0.16, 0.26, 0.44, 0.5],
  pawHeight: 0.06,
  whisker: [-0.004, 0.335, 0.54, 0.68]
};

/**
 * 自定义拖入模型：根据顶点分布自动推断特征点（之后可在微调面板里修正五官）
 * positions 必须已经在归一化模型空间
 */
export function autoDetectProfile(positions: Float32Array): CatProfile {
  const n = positions.length / 3;
  let topSumX = 0;
  let topCount = 0;
  let headZMin = Infinity;
  let headSumZ = 0;
  let headCount = 0;
  let lowSumX = 0;
  let lowSumZ = 0;
  let lowCount = 0;

  for (let i = 0; i < n; i++) {
    const x = positions[i * 3];
    const y = positions[i * 3 + 1];
    const z = positions[i * 3 + 2];
    if (y > 0.8) {
      topSumX += x;
      topCount++;
    }
    if (y > 0.6) {
      headZMin = Math.min(headZMin, z);
      headSumZ += z;
      headCount++;
    }
    if (y < 0.35) {
      lowSumX += x;
      lowSumZ += z;
      lowCount++;
    }
  }

  const cx = topCount ? topSumX / topCount : 0;
  const headZ = headCount ? headSumZ / headCount : 0;
  const lowX = lowCount ? lowSumX / lowCount : 0;
  const lowZ = lowCount ? lowSumZ / lowCount : 0;

  const earL = v(cx - 0.15, 0.95, headZ);
  const earR = v(cx + 0.15, 0.95, headZ);
  let tail = v(lowX, 0.15, lowZ - 0.3);
  let tailDist = -1;

  for (let i = 0; i < n; i++) {
    const x = positions[i * 3];
    const y = positions[i * 3 + 1];
    const z = positions[i * 3 + 2];
    if (x < cx - 0.03 && y > earL.y) earL.set(x, y, z);
    if (x > cx + 0.03 && y > earR.y) earR.set(x, y, z);
    if (z < lowZ && y < 0.6) {
      const d = Math.hypot(x - lowX, z - lowZ);
      if (d > tailDist) {
        tailDist = d;
        tail = v(x, y, z);
      }
    }
  }

  const tailBase = v(lowX + (tail.x - lowX) * 0.4, Math.min(tail.y, 0.25), lowZ + (tail.z - lowZ) * 0.4);

  return {
    id: 'custom',
    face: {
      centerX: cx,
      eyeY: 0.64,
      eyeSpacing: 0.19,
      eyeW: 0.032,
      eyeH: 0.076,
      mouthY: 0.556,
      mouthSize: 0.017,
      surfaceOffset: 0.015,
      eyeStyle: 'amber'
    },
    earTipL: earL,
    earTipR: earR,
    earSize: 0.16,
    headPivot: v(cx, 0.5, headZ),
    headRange: [0.40, 0.52],
    headZMin: Number.isFinite(headZMin) ? headZMin + 0.04 : -0.1,
    tailBase,
    tailTip: tail,
    tailRadius: 0.11,
    tailWhiteRadius: 0.12,
    bodyCenter: v(lowX, 0.28, lowZ),
    breathRange: [0.12, 0.24, 0.42, 0.52],
    pawHeight: 0.07,
    whisker: null
  };
}

/** 在模型表面找某个 (x, y) 正前方的落点与法线，用来把立体五官「贴」到脸上 */
export class SurfaceSampler {
  private static readonly GRID_W = 240;
  private static readonly GRID_H = 200;
  private static readonly X_MIN = -0.6;
  private static readonly X_SPAN = 1.2;
  private cellZ: Float32Array;
  private cellNx: Float32Array;
  private cellNy: Float32Array;
  private cellNz: Float32Array;

  constructor(
    private positions: Float32Array,
    private normals: Float32Array,
    private centerX = 0
  ) {
    const size = SurfaceSampler.GRID_W * SurfaceSampler.GRID_H;
    this.cellZ = new Float32Array(size).fill(-Infinity);
    this.cellNx = new Float32Array(size);
    this.cellNy = new Float32Array(size);
    this.cellNz = new Float32Array(size);

    const count = positions.length / 3;
    for (let i = 0; i < count; i++) {
      const x = positions[i * 3];
      const y = positions[i * 3 + 1];
      const z = positions[i * 3 + 2];
      const gx = Math.floor(((x - SurfaceSampler.X_MIN) / SurfaceSampler.X_SPAN) * SurfaceSampler.GRID_W);
      const gy = Math.floor(y * SurfaceSampler.GRID_H);
      if (gx < 0 || gx >= SurfaceSampler.GRID_W || gy < 0 || gy >= SurfaceSampler.GRID_H) continue;
      const idx = gy * SurfaceSampler.GRID_W + gx;
      if (z > this.cellZ[idx]) {
        this.cellZ[idx] = z;
        this.cellNx[idx] = normals[i * 3];
        this.cellNy[idx] = normals[i * 3 + 1];
        this.cellNz[idx] = normals[i * 3 + 2];
      }
    }
  }

  sample(
    x: number,
    y: number,
    radius = 0.01,
    centerX = this.centerX
  ): { point: THREE.Vector3; normal: THREE.Vector3 } {
    const baseRadius = Math.max(radius, 0.028);
    const symNormal = new THREE.Vector3((x - centerX) * 0.6, (y - 0.6) * 0.5, 1.0).normalize();
    const cellW = SurfaceSampler.X_SPAN / SurfaceSampler.GRID_W;
    const cellH = 1.0 / SurfaceSampler.GRID_H;

    for (let attempt = 0; attempt < 4; attempt++) {
      const r = baseRadius * Math.pow(2, attempt);
      const x0 = Math.max(0, Math.floor(((x - r - SurfaceSampler.X_MIN) / SurfaceSampler.X_SPAN) * SurfaceSampler.GRID_W));
      const x1 = Math.min(SurfaceSampler.GRID_W - 1, Math.floor(((x + r - SurfaceSampler.X_MIN) / SurfaceSampler.X_SPAN) * SurfaceSampler.GRID_W));
      const y0 = Math.max(0, Math.floor((y - r) * SurfaceSampler.GRID_H));
      const y1 = Math.min(SurfaceSampler.GRID_H - 1, Math.floor((y + r) * SurfaceSampler.GRID_H));

      let zMax = -Infinity;
      for (let gy = y0; gy <= y1; gy++) {
        const row = gy * SurfaceSampler.GRID_W;
        for (let gx = x0; gx <= x1; gx++) {
          const z = this.cellZ[row + gx];
          if (z > zMax) zMax = z;
        }
      }
      if (!Number.isFinite(zMax)) continue;

      const normal = new THREE.Vector3();
      for (let gy = y0; gy <= y1; gy++) {
        const row = gy * SurfaceSampler.GRID_W;
        for (let gx = x0; gx <= x1; gx++) {
          const idx = row + gx;
          if (this.cellZ[idx] < zMax - 0.014) continue;
          normal.x += this.cellNx[idx];
          normal.y += this.cellNy[idx];
          normal.z += this.cellNz[idx];
        }
      }
      if (normal.lengthSq() < 1e-8) normal.copy(symNormal);
      else normal.normalize();

      // 向对称前向球面法线平滑收敛，避免 Tripo 表面凹坑噪点导致双侧五官倾斜不对称
      normal.lerp(symNormal, 0.68).normalize();
      return {
        point: new THREE.Vector3(
          THREE.MathUtils.clamp(x, SurfaceSampler.X_MIN + cellW, SurfaceSampler.X_MIN + SurfaceSampler.X_SPAN - cellW),
          THREE.MathUtils.clamp(y, cellH, 1.0 - cellH),
          zMax
        ),
        normal
      };
    }

    return { point: new THREE.Vector3(x, y, 0.45), normal: symNormal };
  }
}

import * as THREE from 'three';
import {
  CatProfile,
  CatFaceTuning,
  SITTING_CAT_PROFILE
} from './catProfiles';

export interface CatAnimUniforms {
  uTime: { value: number };
  uHeadYaw: { value: number };
  uHeadPitch: { value: number };
  uHeadRoll: { value: number };
  uEarTwitchL: { value: number };
  uEarTwitchR: { value: number };
  uBreath: { value: number };
  uRimPower: { value: number };
  uRimStrength: { value: number };
  uWhiteTipStrength: { value: number };
}

export interface RiggedCatController {
  root: THREE.Group;
  profile: CatProfile;
  uniforms: CatAnimUniforms;
  furInstancedMesh: THREE.InstancedMesh;
  furShellsGroup?: THREE.Group;
  triggerHappyJump: () => void;
  setTalking: (talking: boolean) => void;
  setMood: (mood: 'happy' | 'curious' | 'normal') => void;
  getMouthScreenCoord: (
    camera: THREE.Camera,
    width: number,
    height: number
  ) => { x: number; y: number; visible: boolean };
  updateFaceTuning: (tuning: Partial<CatFaceTuning>) => void;
  updateRimAndFur: (opts: { rimStrength?: number; whiteTipStrength?: number; showFurTufts?: boolean }) => void;
  update: (
    dt: number,
    elapsed: number,
    mouseNDC: { x: number; y: number }
  ) => void;
}

/**
 * 判断头部局部坐标点 (x, y, z) 是否属于「正八字开脸 + 婴儿肥白脸颊」纯白毛区
 * 返回 0.0 (炭黑毛区) ~ 1.0 (奶油雪白毛区)
 */
function evalHeadWhiteMaskJS(x: number, y: number, z: number): number {
  if (z < -0.08) return 0.0;
  const ax = Math.abs(x);
  // 正八字分界线：从眉心顶点 (x=0, y=0.135) 向下穿过两眼内侧，再向两侧包子脸颊外沿舒展
  let boundaryY: number;
  if (ax < 0.055) {
    // 鼻梁与眉心窄白尖
    const t = ax / 0.055;
    boundaryY = 0.135 - t * 0.115; // 0.135 -> 0.020
  } else {
    // 眼眶下方弧形掠过并包覆整个下腮帮
    const t = Math.min(1.0, (ax - 0.055) / 0.295);
    boundaryY = 0.020 - 0.032 * Math.sin(t * Math.PI * 0.65) - 0.055 * t * t;
  }
  const frontFactor = THREE.MathUtils.smoothstep(z, -0.06, 0.06);
  const mask = 1.0 - THREE.MathUtils.smoothstep(boundaryY - 0.015, boundaryY + 0.015, y);
  return mask * frontFactor;
}

/**
 * 构建二头身 Q 版奶牛猫「禾桔」的梨形婴儿肥头部几何体 (局部原点位于头部中心)
 * 上圆下宽：额头饱满圆润，下半张脸两侧鼓起软萌包子腮帮
 */
function buildPearHeadGeometry(): THREE.BufferGeometry {
  const geo = new THREE.SphereGeometry(1.0, 96, 72);
  const pos = geo.attributes.position as THREE.BufferAttribute;

  for (let i = 0; i < pos.count; i++) {
    const nx = pos.getX(i);
    const ny = pos.getY(i);
    const nz = pos.getZ(i);

    // 婴儿肥腮帮横向与前向膨胀权重（集中在 ny = -0.28 附近）
    const cheekBulge = Math.exp(-Math.pow((ny + 0.26) / 0.46, 2.0));
    // 额头微收但保持圆润
    const foreheadTaper = ny > 0.2 ? 1.0 - 0.08 * Math.pow((ny - 0.2) / 0.8, 1.4) : 1.0;
    // 下巴底部微平收拢，自然衔接胸前 V 字围脖
    const chinFlatten = ny < -0.55 ? 1.0 - 0.16 * Math.pow((-ny - 0.55) / 0.45, 1.6) : 1.0;

    const rx = (0.286 + 0.064 * cheekBulge) * foreheadTaper;
    const ry = 0.258 * chinFlatten;
    const rz = (0.238 + 0.036 * cheekBulge) * (nz > 0 ? 1.04 : 0.94);

    let x = nx * rx;
    let y = ny * ry;
    let z = nz * rz;

    // 脸颊正面稍微平整一点以便贴合大眼眶与花生口套，同时两侧腮肉更饱满
    if (nz > 0.35 && Math.abs(nx) < 0.65 && ny > -0.45 && ny < 0.35) {
      z -= 0.008 * (nz - 0.35);
    }

    pos.setXYZ(i, x, y, z);
  }

  pos.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}

/**
 * 构建圆润三角形猫耳几何体（原点在耳根中心，向上延伸至耳尖）
 */
function buildRoundedEarGeometry(isInner = false): THREE.BufferGeometry {
  const geo = new THREE.ConeGeometry(1.0, 1.0, 48, 24, false);
  geo.translate(0, 0.5, 0);
  const pos = geo.attributes.position as THREE.BufferAttribute;

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i); // 0 .. 1
    const z = pos.getZ(i);

    // 让耳尖圆润不扎手，耳廓中段微鼓
    const t = THREE.MathUtils.clamp(y, 0, 1);
    const widthProfile = Math.sin(Math.acos(Math.min(0.999, t * 0.92))) * (1.08 - 0.18 * t);
    const r = Math.hypot(x, z);
    const angle = Math.atan2(z, x);
    const normR = r > 1e-5 ? Math.min(1.0, r / (1.0 - t + 1e-4)) : 0;

    const halfW = (isInner ? 0.056 : 0.078) * widthProfile * normR;
    const halfD = (isInner ? 0.022 : 0.042) * widthProfile * normR;

    let nx = Math.cos(angle) * halfW;
    let ny = t * (isInner ? 0.145 : 0.172);
    let nz = Math.sin(angle) * halfD;

    // 耳尖轻微向后微弯，正面微凹形成耳窝
    nz -= 0.014 * t * t;
    if (nz > 0) {
      nz *= isInner ? 0.45 : 0.72;
    }
    if (isInner) {
      ny -= 0.004;
      nz += 0.011;
    }

    pos.setXYZ(i, nx, ny, nz);
  }

  pos.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}

/**
 * 构建二头身坐姿/直立身体几何体（原点在地面中心 y=0）
 */
function buildChibiTorsoGeometry(isUpright: boolean): THREE.BufferGeometry {
  const geo = new THREE.SphereGeometry(1.0, 80, 64);
  const pos = geo.attributes.position as THREE.BufferAttribute;
  const heightScale = isUpright ? 0.235 : 0.215;
  const centerY = isUpright ? 0.245 : 0.225;

  for (let i = 0; i < pos.count; i++) {
    const nx = pos.getX(i);
    const ny = pos.getY(i); // -1 .. 1
    const nz = pos.getZ(i);

    // 上窄下宽的乖巧坐姿小身体（像参考图里的敦实小煤球圆柱梯形）
    const h = (ny + 1.0) * 0.5; // 0 (bottom) -> 1 (neck)
    const taperX = 0.205 - 0.042 * Math.pow(h, 1.15) + 0.018 * Math.sin(h * Math.PI);
    const taperZ = 0.168 - 0.032 * Math.pow(h, 1.1) + (nz > 0 ? 0.018 * Math.sin(h * Math.PI) : 0.012 * (1.0 - h));

    // 底部平稳落座
    let y = centerY + ny * heightScale;
    if (y < 0.028) {
      y = 0.028 + (y - 0.028) * 0.2;
    }

    const x = nx * taperX;
    const z = nz * taperZ + 0.015;

    pos.setXYZ(i, x, y, z);
  }

  pos.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}

/**
 * 构建带 3 道立体脚趾沟壑的「山竹白手套」猫爪几何体
 */
function buildMangosteenPawGeometry(radiusX = 0.056, radiusY = 0.038, radiusZ = 0.062): THREE.BufferGeometry {
  const geo = new THREE.SphereGeometry(1.0, 48, 32);
  const pos = geo.attributes.position as THREE.BufferAttribute;

  for (let i = 0; i < pos.count; i++) {
    const nx = pos.getX(i);
    const ny = pos.getY(i);
    const nz = pos.getZ(i);

    let x = nx * radiusX;
    let y = ny * radiusY;
    let z = nz * radiusZ;

    // 底部削平抓地
    if (y < -radiusY * 0.45) {
      y = -radiusY * 0.45 + (y + radiusY * 0.45) * 0.15;
    }

    // 正前方刻出 2 道深邃可爱的山竹瓣分趾凹槽（形成 3 个饱满脚趾瓣）
    if (nz > 0.25 && ny > -0.45 && ny < 0.55) {
      const groove1 = Math.exp(-Math.pow((nx + 0.30) / 0.11, 2.0));
      const groove2 = Math.exp(-Math.pow((nx - 0.30) / 0.11, 2.0));
      const frontWeight = THREE.MathUtils.smoothstep(nz, 0.25, 0.85) * (1.0 - Math.abs(ny) * 0.6);
      const indent = (groove1 + groove2) * frontWeight;
      z -= indent * radiusZ * 0.16;
      x *= 1.0 - indent * 0.04;
    }

    pos.setXYZ(i, x, y, z);
  }

  pos.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}

/**
 * 头部专属着色器材质：100% 实心无噪点「正八字开脸 + 奶油白包子腮帮 + 丝绒炭黑额头 + 根根分明的交界梳毛齿」
 */
function createHejuHeadMaterial(uniforms: CatAnimUniforms): THREE.MeshStandardMaterial {
  const mat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#ffffff'),
    roughness: 0.72,
    metalness: 0.02
  });

  mat.onBeforeCompile = shader => {
    shader.uniforms.uRimPower = uniforms.uRimPower;
    shader.uniforms.uRimStrength = uniforms.uRimStrength;
    shader.uniforms.uWhiteTipStrength = uniforms.uWhiteTipStrength;

    shader.vertexShader =
      `
      varying vec3 vLocalPos;
      varying vec3 vLocalNorm;
      ` +
      shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>
        vLocalPos = position;
        vLocalNorm = normalize(normal);
        `
      );

    shader.fragmentShader =
      `
      uniform float uRimPower;
      uniform float uRimStrength;
      uniform float uWhiteTipStrength;
      varying vec3 vLocalPos;
      varying vec3 vLocalNorm;

      float hash3(vec3 p) {
        p = fract(p * 0.3183099 + 0.1);
        p *= 17.0;
        return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
      }
      float noise3(vec3 p) {
        vec3 i = floor(p);
        vec3 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(mix(hash3(i + vec3(0,0,0)), hash3(i + vec3(1,0,0)), f.x),
              mix(hash3(i + vec3(0,1,0)), hash3(i + vec3(1,1,0)), f.x), f.y),
          mix(mix(hash3(i + vec3(0,0,1)), hash3(i + vec3(1,0,1)), f.x),
              mix(hash3(i + vec3(0,1,1)), hash3(i + vec3(1,1,1)), f.x), f.y),
          f.z
        );
      }

      // 从鼻梁中心向额头与两侧脸颊放射状梳理的顺毛切线场
      vec3 headCombTangent(vec3 p, vec3 n) {
        vec3 center = vec3(0.0, -0.02, 0.22);
        vec3 flow = p - center;
        flow.x *= 1.35;
        flow.y += 0.06;
        vec3 proj = flow - n * dot(flow, n);
        float len = length(proj);
        return len > 1e-4 ? (proj / len) : vec3(1.0, 0.0, 0.0);
      }

      float headFurStrand(vec3 p, vec3 n) {
        vec3 t = headCombTangent(p, n);
        vec3 b = normalize(cross(n, t));
        float along = dot(p, t);
        float across = dot(p, b);
        float radial = dot(p, n);
        float s1 = noise3(vec3(across * 165.0, along * 32.0, radial * 90.0));
        float s2 = noise3(vec3(across * 340.0, along * 68.0, radial * 180.0));
        return s1 * 0.6 + s2 * 0.4;
      }
      ` +
      shader.fragmentShader
        .replace(
          '#include <color_fragment>',
          `
          #include <color_fragment>
          vec3 p = vLocalPos;
          vec3 n = normalize(vLocalNorm);
          float strand = headFurStrand(p, n);

          // 计算正八字开脸分界曲线（还原参考图：眉心白尖 -> 两眼内侧 -> 眼底弧形展开至整个下腮帮）
          float ax = abs(p.x);
          float boundaryY;
          if (ax < 0.055) {
            float t = ax / 0.055;
            boundaryY = 0.138 - t * 0.116;
          } else {
            float t = clamp((ax - 0.055) / 0.295, 0.0, 1.0);
            boundaryY = 0.022 - 0.030 * sin(t * 2.04) - 0.052 * t * t;
          }

          // 交界处顺毛锯齿状羽化（模拟黑白毛丝自然交错覆盖，内部 100% 纯净无杂色）
          float angleFeather = sin(ax * 210.0 + p.y * 85.0) * 0.0055
                             + sin(ax * 430.0 - p.y * 140.0) * 0.0032
                             + (strand - 0.5) * 0.016;
          float frontMask = smoothstep(-0.08, 0.05, p.z);
          float whiteMask = (1.0 - smoothstep(boundaryY - 0.014, boundaryY + 0.014, p.y + angleFeather)) * frontMask;

          // 眉心上方极柔和的灰白过渡绒毛尖（还原参考图眉心尖端细腻渐隐）
          float blazeTipSoft = exp(-pow(ax / 0.036, 2.0)) * smoothstep(0.18, 0.07, p.y) * smoothstep(0.05, 0.13, p.y) * frontMask;
          whiteMask = clamp(max(whiteMask, blazeTipSoft * (0.45 + 0.55 * strand)), 0.0, 1.0);

          // 1) 炭黑丝绒毛区（深邃天鹅绒黑 + 顺毛微光泽）
          vec3 blackRoot = vec3(0.026, 0.029, 0.038);
          vec3 blackTip  = vec3(0.095, 0.105, 0.130);
          vec3 blackFur  = mix(blackRoot, blackTip, smoothstep(0.20, 0.85, strand));

          // 2) 奶油雪白婴儿肥腮帮毛区（100% 实心纯净奶白 + 底部柔和立体体积光影）
          float cheekShade = smoothstep(-0.22, 0.08, p.y) * 0.55 + smoothstep(-0.05, 0.22, p.z) * 0.45;
          vec3 whiteShadow = vec3(0.84, 0.87, 0.92);
          vec3 whiteBright = vec3(0.99, 0.995, 1.00);
          vec3 whiteFur = mix(whiteShadow, whiteBright, cheekShade) * (0.95 + 0.07 * strand);

          diffuseColor.rgb = mix(blackFur, whiteFur, whiteMask);
          `
        )
        .replace(
          '#include <normal_fragment_maps>',
          `
          #include <normal_fragment_maps>
          {
            vec3 pN = vLocalPos;
            vec3 nN = normalize(vLocalNorm);
            vec3 cT = headCombTangent(pN, nN);
            vec3 cB = normalize(cross(nN, cT));
            float s0 = headFurStrand(pN, nN);
            float sAcross = headFurStrand(pN + cB * 0.0022, nN) - s0;
            vec3 perturb = normalize(normalMatrix * (nN + cB * (sAcross * 0.18)));
            normal = normalize(mix(normal, perturb, 0.55));
          }
          `
        )
        .replace(
          '#include <opaque_fragment>',
          `
          vec3 viewDir = normalize(vViewPosition);
          float ndotv = clamp(dot(normalize(normal), viewDir), 0.0, 1.0);
          float fresnel = pow(1.0 - ndotv, uRimPower);
          float strandVal = headFurStrand(vLocalPos, normalize(vLocalNorm));
          vec3 rimCol = vec3(0.92, 0.95, 1.0) * fresnel * uRimStrength * 0.28 * (0.5 + 0.5 * strandVal);
          outgoingLight += rimCol;
          #include <opaque_fragment>
          `
        );
  };

  return mat;
}

/**
 * 身体专属着色器材质：「炭黑燕尾服 + 胸前雪白 V 字大围脖 + 呼吸律动」
 */
function createHejuBodyMaterial(uniforms: CatAnimUniforms): THREE.MeshStandardMaterial {
  const mat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#ffffff'),
    roughness: 0.74,
    metalness: 0.02
  });

  mat.onBeforeCompile = shader => {
    shader.uniforms.uBreath = uniforms.uBreath;
    shader.uniforms.uRimPower = uniforms.uRimPower;
    shader.uniforms.uRimStrength = uniforms.uRimStrength;

    shader.vertexShader =
      `
      uniform float uBreath;
      varying vec3 vBodyPos;
      varying vec3 vBodyNorm;
      ` +
      shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>
        vBodyPos = position;
        vBodyNorm = normalize(normal);
        float breathWeight = smoothstep(0.06, 0.18, position.y) * (1.0 - smoothstep(0.34, 0.44, position.y));
        transformed.x += position.x * uBreath * 0.022 * breathWeight;
        transformed.z += position.z * uBreath * 0.028 * breathWeight;
        `
      );

    shader.fragmentShader =
      `
      uniform float uRimPower;
      uniform float uRimStrength;
      varying vec3 vBodyPos;
      varying vec3 vBodyNorm;

      float bodyHash(vec3 p) {
        p = fract(p * 0.3183099 + 0.1);
        p *= 17.0;
        return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
      }
      float bodyNoise(vec3 p) {
        vec3 i = floor(p);
        vec3 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(mix(bodyHash(i + vec3(0,0,0)), bodyHash(i + vec3(1,0,0)), f.x),
              mix(bodyHash(i + vec3(0,1,0)), bodyHash(i + vec3(1,1,0)), f.x), f.y),
          mix(mix(bodyHash(i + vec3(0,0,1)), bodyHash(i + vec3(1,0,1)), f.x),
              mix(bodyHash(i + vec3(0,1,1)), bodyHash(i + vec3(1,1,1)), f.x), f.y),
          f.z
        );
      }
      ` +
      shader.fragmentShader
        .replace(
          '#include <color_fragment>',
          `
          #include <color_fragment>
          vec3 p = vBodyPos;
          float strand = bodyNoise(vec3(p.x * 220.0, p.y * 42.0, p.z * 160.0)) * 0.65
                       + bodyNoise(vec3(p.x * 420.0, p.y * 85.0, p.z * 280.0)) * 0.35;

          // 胸前雪白 V 字领围脖遮罩（从脖子 y=0.40 宽 0.135 向下收拢至 y=0.14 的 V 字尖端）
          float tV = clamp((p.y - 0.145) / (0.40 - 0.145), 0.0, 1.0);
          float bibHalfWidth = mix(0.008, 0.136, pow(tV, 0.82));
          float feather = sin(p.y * 260.0 + p.x * 120.0) * 0.006 + (strand - 0.5) * 0.015;
          float frontBib = smoothstep(0.02, 0.09, p.z) * smoothstep(0.125, 0.165, p.y);
          float bibMask = (1.0 - smoothstep(bibHalfWidth - 0.012, bibHalfWidth + 0.012, abs(p.x) + feather)) * frontBib;

          vec3 blackFur = mix(vec3(0.026, 0.029, 0.038), vec3(0.092, 0.102, 0.126), smoothstep(0.2, 0.85, strand));
          float bibShade = smoothstep(0.12, 0.38, p.y) * 0.45 + smoothstep(0.04, 0.18, p.z) * 0.55;
          vec3 whiteFur = mix(vec3(0.83, 0.86, 0.92), vec3(0.99, 0.995, 1.0), bibShade) * (0.95 + 0.07 * strand);

          diffuseColor.rgb = mix(blackFur, whiteFur, bibMask);
          `
        )
        .replace(
          '#include <opaque_fragment>',
          `
          vec3 viewDir = normalize(vViewPosition);
          float ndotv = clamp(dot(normalize(normal), viewDir), 0.0, 1.0);
          float fresnel = pow(1.0 - ndotv, uRimPower);
          outgoingLight += vec3(0.88, 0.93, 1.0) * fresnel * uRimStrength * 0.25;
          #include <opaque_fragment>
          `
        );
  };

  return mat;
}

/**
 * 生成 512x512 高清「琥珀流金虹膜底盘」纹理（超大深咖瞳孔独立为可大幅度滑动的 3D 层，使眼神转动极具灵气）
 */
let cachedAmberEyeTexture: THREE.CanvasTexture | null = null;
function getAmberEyeTexture(): THREE.CanvasTexture {
  if (cachedAmberEyeTexture) return cachedAmberEyeTexture;
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const cx = size * 0.5;
  const cy = size * 0.5;
  const rMax = size * 0.49;

  ctx.clearRect(0, 0, size, size);

  // 1. 外圈深棕琥珀角膜暗环 (Limbal Ring) + 饱满流金虹膜
  const irisGrad = ctx.createRadialGradient(cx, cy + size * 0.04, rMax * 0.15, cx, cy, rMax);
  irisGrad.addColorStop(0.0, '#ffe28a');
  irisGrad.addColorStop(0.55, '#f5a932');
  irisGrad.addColorStop(0.82, '#c87112');
  irisGrad.addColorStop(0.95, '#4a2406');
  irisGrad.addColorStop(1.0, '#1a0c03');

  ctx.fillStyle = irisGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, rMax, 0, Math.PI * 2);
  ctx.fill();

  // 2. 放射状琥珀虹膜丝纹理
  ctx.save();
  ctx.translate(cx, cy);
  for (let i = 0; i < 140; i++) {
    const angle = (i / 140) * Math.PI * 2;
    const len = rMax * (0.86 + 0.10 * Math.sin(i * 19.7));
    ctx.strokeStyle = i % 2 === 0 ? 'rgba(255, 232, 150, 0.24)' : 'rgba(120, 52, 6, 0.25)';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(Math.cos(angle) * rMax * 0.22, Math.sin(angle) * rMax * 0.22);
    ctx.lineTo(Math.cos(angle) * len, Math.sin(angle) * len);
    ctx.stroke();
  }
  ctx.restore();

  // 3. 上眼睑投射在虹膜上半部的柔和暗影与底部暖金反光
  const topShadow = ctx.createLinearGradient(0, 0, 0, size);
  topShadow.addColorStop(0.0, 'rgba(15, 6, 2, 0.48)');
  topShadow.addColorStop(0.36, 'rgba(15, 6, 2, 0.06)');
  topShadow.addColorStop(0.75, 'rgba(255, 220, 120, 0.16)');
  topShadow.addColorStop(1.0, 'rgba(255, 235, 165, 0.28)');
  ctx.fillStyle = topShadow;
  ctx.beginPath();
  ctx.arc(cx, cy, rMax * 0.96, 0, Math.PI * 2);
  ctx.fill();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  cachedAmberEyeTexture = tex;
  return tex;
}

/**
 * 生成 512x512 高清「超大深浓咖啡黑瞳孔 + 焦糖底反光弧」独立图层纹理
 */
let cachedPupilTexture: THREE.CanvasTexture | null = null;
function getPupilTexture(): THREE.CanvasTexture {
  if (cachedPupilTexture) return cachedPupilTexture;
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const cx = size * 0.5;
  const cy = size * 0.5;
  const rMax = size * 0.48;

  ctx.clearRect(0, 0, size, size);

  const pupilGrad = ctx.createRadialGradient(cx, cy - rMax * 0.15, rMax * 0.08, cx, cy, rMax);
  pupilGrad.addColorStop(0.0, '#060201');
  pupilGrad.addColorStop(0.68, '#160904');
  pupilGrad.addColorStop(0.90, '#2e1409');
  pupilGrad.addColorStop(0.97, 'rgba(65, 28, 10, 0.85)');
  pupilGrad.addColorStop(1.0, 'rgba(65, 28, 10, 0.0)');
  ctx.fillStyle = pupilGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, rMax, 0, Math.PI * 2);
  ctx.fill();

  // 瞳孔底部温暖焦糖反光弧
  ctx.strokeStyle = 'rgba(195, 102, 38, 0.46)';
  ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.arc(cx, cy, rMax * 0.80, Math.PI * 0.18, Math.PI * 0.82);
  ctx.stroke();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  cachedPupilTexture = tex;
  return tex;
}

/**
 * 构建单只 3D 灵动大眼睛组件（深邃眼窝框 + 琥珀流金虹膜底盘 + 大幅度跟随鼠标滑动的超大深咖瞳孔 + 双层高光 + 眨眼眼皮 + 开心笑眼弧）
 */
function createHejuEyeAssembly(isLeft: boolean) {
  const socketGroup = new THREE.Group();
  const sign = isLeft ? -1 : 1;

  // 1. 眼眶外沿深炭黑浓密眼线框（固定在眼窝，包裹眼球边缘）
  const socketBackGeo = new THREE.CircleGeometry(0.068, 48);
  socketBackGeo.scale(1.10, 0.98, 1.0);
  const socketBackMat = new THREE.MeshBasicMaterial({ color: 0x050608 });
  const socketBackMesh = new THREE.Mesh(socketBackGeo, socketBackMat);
  socketBackMesh.position.z = -0.002;
  socketGroup.add(socketBackMesh);

  // 眼窝周围一圈立体微凸黑眼线环（防止虹膜滑动时露出边界）
  const rimTorusGeo = new THREE.TorusGeometry(0.064, 0.0075, 16, 48);
  rimTorusGeo.scale(1.10, 0.98, 0.65);
  const rimTorusMat = new THREE.MeshStandardMaterial({
    color: 0x07080c,
    roughness: 0.65,
    metalness: 0.05
  });
  const rimTorusMesh = new THREE.Mesh(rimTorusGeo, rimTorusMat);
  rimTorusMesh.position.z = 0.006;
  socketGroup.add(rimTorusMesh);

  // 2. 琥珀流金虹膜层（微幅跟随鼠标）+ 独立超大深咖瞳孔层（在琥珀虹膜内大幅度灵动跟随鼠标！）
  const irisGroup = new THREE.Group();
  irisGroup.position.z = 0.001;

  const irisGeo = new THREE.SphereGeometry(0.063, 40, 32, 0, Math.PI * 2, 0, Math.PI * 0.36);
  // 将球冠朝向 +Z 并压缩 Z 厚度，贴合眼窝弧面
  irisGeo.rotateX(Math.PI * 0.5);
  irisGeo.scale(1.09, 0.97, 0.28);
  // 修正球冠 UV 为正面平面投影 (0..1)
  const uvAttr = irisGeo.attributes.uv as THREE.BufferAttribute;
  const posAttr = irisGeo.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < posAttr.count; i++) {
    const px = posAttr.getX(i) / (0.063 * 1.09);
    const py = posAttr.getY(i) / (0.063 * 0.97);
    uvAttr.setXY(i, px * 0.5 + 0.5, py * 0.5 + 0.5);
  }
  uvAttr.needsUpdate = true;

  const irisMat = new THREE.MeshBasicMaterial({
    map: getAmberEyeTexture()
  });
  const irisMesh = new THREE.Mesh(irisGeo, irisMat);
  irisGroup.add(irisMesh);

  // 独立 3D 大瞳孔组（在琥珀金虹膜内部大幅度丝滑转动，露出动态月牙形琥珀金边）
  const pupilGroup = new THREE.Group();
  pupilGroup.position.z = 0.009;
  const pupilGeo = new THREE.CircleGeometry(0.048, 40);
  pupilGeo.scale(1.05, 0.97, 1.0);
  const pupilMat = new THREE.MeshBasicMaterial({
    map: getPupilTexture(),
    transparent: true,
    depthWrite: false
  });
  const pupilMesh = new THREE.Mesh(pupilGeo, pupilMat);
  pupilGroup.add(pupilMesh);

  // 3. 双高光层（左上角超大水润柔光窗 + 右下角副反光点，随瞳孔带微视差灵动位移）
  const highlightGroup = new THREE.Group();
  highlightGroup.position.z = 0.004;

  const mainCatchGeo = new THREE.CircleGeometry(0.017, 32);
  mainCatchGeo.scale(1.22, 0.92, 1.0);
  const catchMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.96,
    depthWrite: false
  });
  const mainCatchMesh = new THREE.Mesh(mainCatchGeo, catchMat);
  mainCatchMesh.position.set(-0.017 + sign * 0.002, 0.017, 0);
  mainCatchMesh.rotation.z = 0.38;

  const subCatchGeo = new THREE.CircleGeometry(0.0068, 24);
  const subCatchMat = new THREE.MeshBasicMaterial({
    color: 0xfff6e0,
    transparent: true,
    opacity: 0.90,
    depthWrite: false
  });
  const subCatchMesh = new THREE.Mesh(subCatchGeo, subCatchMat);
  subCatchMesh.position.set(0.019, -0.016, 0);

  highlightGroup.add(mainCatchMesh, subCatchMesh);
  pupilGroup.add(highlightGroup);
  irisGroup.add(pupilGroup);
  socketGroup.add(irisGroup);

  // 4. 眨眼上眼睑遮罩（自然眨眼时从上往下闭合）
  const eyelidGeo = new THREE.CircleGeometry(0.070, 36);
  eyelidGeo.scale(1.12, 1.02, 1.0);
  const eyelidMat = new THREE.MeshBasicMaterial({ color: 0x0b0d12 });
  const eyelidMesh = new THREE.Mesh(eyelidGeo, eyelidMat);
  eyelidMesh.position.set(0, 0.068, 0.015);
  eyelidMesh.scale.y = 0.001;
  eyelidMesh.visible = false;
  socketGroup.add(eyelidMesh);

  // 5. 开心撸猫时的 `^ ^` 弯弯笑眼弧
  const happyGroup = new THREE.Group();
  happyGroup.position.z = 0.016;
  happyGroup.visible = false;

  const happyBgMesh = new THREE.Mesh(
    new THREE.CircleGeometry(0.070, 36).scale(1.12, 1.02, 1.0),
    new THREE.MeshBasicMaterial({ color: 0x0d0f15 })
  );
  const archCurve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(-0.046, -0.012, 0.003),
    new THREE.Vector3(0.0, 0.036, 0.006),
    new THREE.Vector3(0.046, -0.012, 0.003)
  );
  const archGeo = new THREE.TubeGeometry(archCurve, 24, 0.0095, 12, false);
  const archMat = new THREE.MeshBasicMaterial({ color: 0xf7b948 });
  const archMesh = new THREE.Mesh(archGeo, archMat);
  happyGroup.add(happyBgMesh, archMesh);
  socketGroup.add(happyGroup);

  return {
    socketGroup,
    irisGroup,
    pupilGroup,
    highlightGroup,
    eyelidMesh,
    happyGroup
  };
}

/**
 * 在猫咪外轮廓边缘（耳廓、婴儿肥腮帮外沿、下巴、胸侧与尾巴）生成与底色 100% 同步的蓬松软毛簇
 * 正脸内部绝不放置任何毛刺，确保正八字白毛区域如羊绒般纯净细腻
 */
function buildHejuSilhouetteFur(uniforms: CatAnimUniforms): THREE.InstancedMesh {
  const maxTufts = 1650;
  // 柔顺纤细的锥形边缘绒毛尖
  const tuftGeo = new THREE.ConeGeometry(0.0046, 0.026, 5, 2, false);
  tuftGeo.translate(0, 0.013, 0);

  const tuftMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.68,
    metalness: 0.02
  });

  tuftMat.onBeforeCompile = shader => {
    shader.uniforms.uTime = uniforms.uTime;
    shader.uniforms.uHeadYaw = uniforms.uHeadYaw;
    shader.uniforms.uHeadPitch = uniforms.uHeadPitch;
    shader.uniforms.uHeadRoll = uniforms.uHeadRoll;
    shader.uniforms.uBreath = uniforms.uBreath;

    shader.vertexShader =
      `
      uniform float uTime;
      uniform float uHeadYaw;
      uniform float uHeadPitch;
      uniform float uHeadRoll;
      uniform float uBreath;

      mat3 fRotY(float a) {
        float s = sin(a), c = cos(a);
        return mat3(c, 0.0, s, 0.0, 1.0, 0.0, -s, 0.0, c);
      }
      mat3 fRotX(float a) {
        float s = sin(a), c = cos(a);
        return mat3(1.0, 0.0, 0.0, 0.0, c, -s, 0.0, s, c);
      }
      mat3 fRotZ(float a) {
        float s = sin(a), c = cos(a);
        return mat3(c, -s, 0.0, s, c, 0.0, 0.0, 0.0, 1.0);
      }
      ` +
      shader.vertexShader.replace(
        '#include <project_vertex>',
        `
        vec4 mvPosition = vec4(transformed, 1.0);
        #ifdef USE_INSTANCING
          vec3 anchor = instanceMatrix[3].xyz;
          mat3 instMat = mat3(instanceMatrix);
          vec3 localBlade = instMat * transformed;

          // 判断属于头部绒毛 (y > 0.39) 还是身体绒毛
          float isHead = step(0.39, anchor.y);
          vec3 worldPos = anchor + localBlade;
          if (isHead > 0.5) {
            vec3 pivot = vec3(0.0, 0.42, 0.03);
            // 与 Three.js YXZ 头部欧拉角一致
            mat3 hRot = fRotY(-uHeadYaw) * fRotX(-uHeadPitch) * fRotZ(-uHeadRoll);
            worldPos = pivot + hRot * (worldPos - pivot);
          } else {
            float bWeight = smoothstep(0.06, 0.18, anchor.y) * (1.0 - smoothstep(0.34, 0.40, anchor.y));
            worldPos.x += anchor.x * uBreath * 0.022 * bWeight;
          }
          mvPosition = modelViewMatrix * vec4(worldPos, 1.0);
        #else
          mvPosition = modelViewMatrix * mvPosition;
        #endif
        gl_Position = projectionMatrix * mvPosition;
        `
      );
  };

  const instanced = new THREE.InstancedMesh(tuftGeo, tuftMat, maxTufts);
  instanced.castShadow = false;
  instanced.receiveShadow = false;

  const dummy = new THREE.Object3D();
  const color = new THREE.Color();
  const up = new THREE.Vector3(0, 1, 0);
  const headCenter = new THREE.Vector3(0, 0.64, 0.03);

  let idx = 0;

  // 1) 头部与婴儿肥脸颊外轮廓一圈炸毛（仅放置在 Z 接近轮廓切线处，绝不污染正脸）
  const headRings = 7;
  const perRing = 128;
  for (let r = 0; r < headRings && idx < maxTufts; r++) {
    const zOffset = -0.05 + (r / (headRings - 1)) * 0.11;
    for (let k = 0; k < perRing && idx < maxTufts; k++) {
      const theta = (k / perRing) * Math.PI * 2;
      const ny = Math.sin(theta);
      const nx = Math.cos(theta);

      const cheekBulge = Math.exp(-Math.pow((ny + 0.26) / 0.46, 2.0));
      const foreheadTaper = ny > 0.2 ? 1.0 - 0.08 * Math.pow((ny - 0.2) / 0.8, 1.4) : 1.0;
      const chinFlatten = ny < -0.55 ? 1.0 - 0.16 * Math.pow((-ny - 0.55) / 0.45, 1.6) : 1.0;

      const rx = (0.282 + 0.062 * cheekBulge) * foreheadTaper;
      const ry = 0.252 * chinFlatten;

      const lx = nx * rx;
      const ly = ny * ry;
      const lz = zOffset + (ny < -0.15 ? 0.035 : 0.0);

      const wx = headCenter.x + lx;
      const wy = headCenter.y + ly;
      const wz = headCenter.z + lz;

      // 跳过底部与脖子重叠区域
      if (ny < -0.82 && Math.abs(nx) < 0.45) continue;

      dummy.position.set(wx, wy, wz);
      const outDir = new THREE.Vector3(nx * 1.15, ny * 0.85 - 0.12, 0.12).normalize();
      const q = new THREE.Quaternion().setFromUnitVectors(up, outDir);
      dummy.quaternion.copy(q);

      const isLowerCheek = ny < 0.05 && Math.abs(nx) > 0.45;
      const lenScale = isLowerCheek ? 1.25 : 0.95 + (k % 3) * 0.12;
      dummy.scale.set(1.05, lenScale, 1.05);
      dummy.updateMatrix();
      instanced.setMatrixAt(idx, dummy.matrix);

      // 关键：毛簇颜色与头部正八字黑白分界 100% 同步！下腮帮外沿全为纯雪白，额头与上脸颊为丝绒炭黑
      const whiteFactor = evalHeadWhiteMaskJS(lx, ly, 0.12);
      if (whiteFactor > 0.5) {
        color.setRGB(0.96, 0.97, 0.99);
      } else {
        color.setRGB(0.055, 0.062, 0.080);
      }
      instanced.setColorAt(idx, color);
      idx++;
    }
  }

  // 2) 左右耳朵外沿聪明毛簇（丝绒炭黑）
  const earConfigs = [
    { side: -1, baseX: -0.185, baseY: 0.815, baseZ: 0.02, rotZ: 0.36 },
    { side: 1, baseX: 0.185, baseY: 0.815, baseZ: 0.02, rotZ: -0.36 }
  ];
  for (const ear of earConfigs) {
    for (let s = 0; s < 160 && idx < maxTufts; s++) {
      const t = (s / 160);
      const isOuterSide = s % 2 === 0;
      const localX = (isOuterSide ? ear.side * 0.072 : -ear.side * 0.058) * (1.0 - t * 0.85);
      const localY = t * 0.168;
      const localZ = (s % 5 - 2) * 0.008;

      const cosR = Math.cos(ear.rotZ);
      const sinR = Math.sin(ear.rotZ);
      const rx = localX * cosR - localY * sinR;
      const ry = localX * sinR + localY * cosR;

      dummy.position.set(ear.baseX + rx, ear.baseY + ry, ear.baseZ + localZ);
      const outDir = new THREE.Vector3(
        rx + ear.side * 0.06,
        ry + 0.08,
        0.04
      ).normalize();
      dummy.quaternion.setFromUnitVectors(up, outDir);
      dummy.scale.set(0.95, 1.15, 0.95);
      dummy.updateMatrix();
      instanced.setMatrixAt(idx, dummy.matrix);
      color.setRGB(0.055, 0.062, 0.080);
      instanced.setColorAt(idx, color);
      idx++;
    }
  }

  // 3) 身体两侧外轮廓与胸前 V 领绒毛簇
  for (let s = 0; s < 380 && idx < maxTufts; s++) {
    const h = (s / 380);
    const wy = 0.07 + h * 0.33;
    const side = s % 2 === 0 ? -1 : 1;
    const isBibEdge = s % 3 === 0 && wy > 0.15;

    if (isBibEdge) {
      // 胸前雪白 V 领立体绒毛簇
      const tV = Math.max(0, Math.min(1, (wy - 0.145) / (0.40 - 0.145)));
      const bibX = side * (0.01 + 0.125 * Math.pow(tV, 0.82)) * (0.65 + 0.35 * ((s * 7) % 5) / 4);
      const wz = 0.165 - Math.abs(bibX) * 0.22;
      dummy.position.set(bibX, wy, wz);
      const outDir = new THREE.Vector3(bibX * 0.6, -0.65, 0.55).normalize();
      dummy.quaternion.setFromUnitVectors(up, outDir);
      dummy.scale.set(1.0, 1.05, 1.0);
      dummy.updateMatrix();
      instanced.setMatrixAt(idx, dummy.matrix);
      color.setRGB(0.96, 0.97, 0.99);
      instanced.setColorAt(idx, color);
      idx++;
    } else {
      // 身体左右两侧炭黑轮廓炸毛
      const radiusX = 0.202 - 0.040 * Math.pow(h, 1.15);
      const wx = side * radiusX;
      const wz = 0.02 + ((s % 7) - 3) * 0.018;
      dummy.position.set(wx, wy, wz);
      const outDir = new THREE.Vector3(side * 0.85, -0.45, 0.15).normalize();
      dummy.quaternion.setFromUnitVectors(up, outDir);
      dummy.scale.set(1.0, 1.08, 1.0);
      dummy.updateMatrix();
      instanced.setMatrixAt(idx, dummy.matrix);
      color.setRGB(0.055, 0.062, 0.080);
      instanced.setColorAt(idx, color);
      idx++;
    }
  }

  instanced.count = idx;
  instanced.instanceMatrix.needsUpdate = true;
  if (instanced.instanceColor) instanced.instanceColor.needsUpdate = true;
  return instanced;
}

/**
 * 构建二头身 Q 版奶牛猫「禾桔 (HeJu)」3D 角色控制器
 * 1:1 复刻参考图：上圆下宽梨形婴儿肥头 + 纯净无噪点正八字白腮帮 + 鼠标跟随琥珀流金大眼 + 立体 ω 花生口套与粉鼻 + 雪白 V 字围脖 + 山竹白手套
 */
export function buildRiggedCatFromGLB(
  _rawScene: THREE.Object3D,
  presetProfile?: CatProfile,
  targetWorldHeight = 2.18
): RiggedCatController {
  const profile: CatProfile = presetProfile
    ? {
        ...presetProfile,
        face: { ...presetProfile.face }
      }
    : {
        ...SITTING_CAT_PROFILE,
        face: { ...SITTING_CAT_PROFILE.face }
      };

  const isUpright = profile.id === 'upright';

  const uniforms: CatAnimUniforms = {
    uTime: { value: 0 },
    uHeadYaw: { value: 0 },
    uHeadPitch: { value: 0 },
    uHeadRoll: { value: 0 },
    uEarTwitchL: { value: 0 },
    uEarTwitchR: { value: 0 },
    uBreath: { value: 0 },
    uRimPower: { value: 2.45 },
    uRimStrength: { value: 1.35 },
    uWhiteTipStrength: { value: 1.0 }
  };

  const root = new THREE.Group();
  root.scale.setScalar(targetWorldHeight);

  // ============ 1. 身体与胸前雪白 V 字领围脖 ============
  const bodyGeo = buildChibiTorsoGeometry(isUpright);
  const bodyMat = createHejuBodyMaterial(uniforms);
  const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
  bodyMesh.castShadow = true;
  bodyMesh.receiveShadow = false;
  root.add(bodyMesh);

  // ============ 2. 四只饱满「山竹白手套」猫爪 ============
  const pawMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#f8fafd'),
    roughness: 0.68,
    metalness: 0.02
  });
  const frontPawGeo = buildMangosteenPawGeometry(0.058, 0.038, 0.064);
  const backPawGeo = buildMangosteenPawGeometry(0.048, 0.034, 0.054);

  const frontLeftPaw = new THREE.Mesh(frontPawGeo, pawMat);
  frontLeftPaw.position.set(-0.072, isUpright ? 0.042 : 0.036, 0.142);
  frontLeftPaw.rotation.y = 0.06;
  frontLeftPaw.castShadow = true;

  const frontRightPaw = new THREE.Mesh(frontPawGeo, pawMat);
  frontRightPaw.position.set(0.072, isUpright ? 0.042 : 0.036, 0.142);
  frontRightPaw.rotation.y = -0.06;
  frontRightPaw.castShadow = true;

  const backLeftPaw = new THREE.Mesh(backPawGeo, pawMat);
  backLeftPaw.position.set(-0.158, 0.032, 0.048);
  backLeftPaw.rotation.y = 0.28;
  backLeftPaw.castShadow = true;

  const backRightPaw = new THREE.Mesh(backPawGeo, pawMat);
  backRightPaw.position.set(0.158, 0.032, 0.048);
  backRightPaw.rotation.y = -0.28;
  backRightPaw.castShadow = true;

  root.add(frontLeftPaw, frontRightPaw, backLeftPaw, backRightPaw);

  // ============ 3. 身后灵动摇摆的毛绒小黑尾 ============
  const tailPivot = new THREE.Group();
  tailPivot.position.set(0.08, 0.075, -0.11);
  const tailCurve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.12, -0.01, -0.02),
    new THREE.Vector3(0.23, 0.035, 0.03)
  );
  const tailGeo = new THREE.TubeGeometry(tailCurve, 24, 0.034, 16, false);
  const tailCapGeo = new THREE.SphereGeometry(0.034, 16, 16);
  tailCapGeo.translate(0.23, 0.035, 0.03);
  const tailMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#10131a'),
    roughness: 0.76,
    metalness: 0.02
  });
  const tailMesh = new THREE.Mesh(tailGeo, tailMat);
  const tailCapMesh = new THREE.Mesh(tailCapGeo, tailMat);
  tailMesh.castShadow = true;
  tailPivot.add(tailMesh, tailCapMesh);
  root.add(tailPivot);

  // ============ 4. 二头身梨形婴儿肥头部总成 (headPivot) ============
  const headPivot = new THREE.Group();
  const baseHeadPivotPos = new THREE.Vector3(0, isUpright ? 0.445 : 0.420, 0.03);
  headPivot.position.copy(baseHeadPivotPos);
  root.add(headPivot);

  // 头部中心位于 headPivot 上方 0.22 处 (世界归一化高度 y ≈ 0.64)
  const headCenterGroup = new THREE.Group();
  headCenterGroup.position.set(0, 0.22, 0);
  headPivot.add(headCenterGroup);

  const headGeo = buildPearHeadGeometry();
  const headMat = createHejuHeadMaterial(uniforms);
  const headMesh = new THREE.Mesh(headGeo, headMat);
  headMesh.castShadow = true;
  headMesh.receiveShadow = false;
  headCenterGroup.add(headMesh);

  // ============ 5. 左右圆润猫耳 + 蜜桃粉内耳窝 + 耳道绒毛 ============
  const outerEarGeo = buildRoundedEarGeometry(false);
  const innerEarGeo = buildRoundedEarGeometry(true);
  const outerEarMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#10131a'),
    roughness: 0.72,
    metalness: 0.02
  });
  const innerEarMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#df5d7a'),
    roughness: 0.62,
    metalness: 0.01
  });

  const buildEarGroup = (side: -1 | 1) => {
    const earGroup = new THREE.Group();
    earGroup.position.set(side * 0.182, 0.175, -0.008);
    earGroup.rotation.z = -side * 0.36;
    earGroup.rotation.x = 0.08;
    earGroup.rotation.y = -side * 0.12;

    const outerMesh = new THREE.Mesh(outerEarGeo, outerEarMat);
    outerMesh.castShadow = true;
    const innerMesh = new THREE.Mesh(innerEarGeo, innerEarMat);
    earGroup.add(outerMesh, innerMesh);

    // 耳道内侧深暗玫瑰红阴影小窝，增强内耳立体深邃感
    const cavityGeo = new THREE.SphereGeometry(0.026, 20, 16);
    cavityGeo.scale(1.1, 1.35, 0.35);
    const cavityMat = new THREE.MeshBasicMaterial({ color: 0x9c2b47 });
    const cavityMesh = new THREE.Mesh(cavityGeo, cavityMat);
    cavityMesh.position.set(0, 0.032, 0.018);
    earGroup.add(cavityMesh);

    return earGroup;
  };

  const leftEarGroup = buildEarGroup(-1);
  const rightEarGroup = buildEarGroup(1);
  headCenterGroup.add(leftEarGroup, rightEarGroup);

  // ============ 6. 鼠标跟随「琥珀流金 + 超大深咖瞳孔」3D 灵动双眸 ============
  const leftEye = createHejuEyeAssembly(true);
  const rightEye = createHejuEyeAssembly(false);

  const baseEyeX = 0.114;
  const baseEyeY = 0.012;
  const baseEyeZ = 0.242;

  leftEye.socketGroup.position.set(-baseEyeX, baseEyeY, baseEyeZ);
  leftEye.socketGroup.rotation.y = -0.14;
  leftEye.socketGroup.rotation.x = -0.03;

  rightEye.socketGroup.position.set(baseEyeX, baseEyeY, baseEyeZ);
  rightEye.socketGroup.rotation.y = 0.14;
  rightEye.socketGroup.rotation.x = -0.03;

  headCenterGroup.add(leftEye.socketGroup, rightEye.socketGroup);

  // ============ 7. 立体饱满 `ω` 花生口套 + 蜜桃粉爱心小鼻头 + 6 根弧形白胡须 ============
  const muzzleGroup = new THREE.Group();
  muzzleGroup.position.set(0, -0.048, 0.256);
  headCenterGroup.add(muzzleGroup);

  const muzzlePadMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#fafbfd'),
    roughness: 0.64,
    metalness: 0.01
  });
  const padGeo = new THREE.SphereGeometry(0.044, 32, 24);
  padGeo.scale(1.18, 0.84, 0.68);

  const leftMuzzlePad = new THREE.Mesh(padGeo, muzzlePadMat);
  leftMuzzlePad.position.set(-0.036, -0.008, 0.004);
  leftMuzzlePad.rotation.z = 0.12;

  const rightMuzzlePad = new THREE.Mesh(padGeo, muzzlePadMat);
  rightMuzzlePad.position.set(0.036, -0.008, 0.004);
  rightMuzzlePad.rotation.z = -0.12;

  muzzleGroup.add(leftMuzzlePad, rightMuzzlePad);

  // ω 微笑唇线凹槽（左弧 + 右弧）
  const smileMat = new THREE.MeshBasicMaterial({ color: 0x3b2c2a });
  const createSmileArc = (side: -1 | 1) => {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(0, -0.006, 0.032),
      new THREE.Vector3(side * 0.034, -0.040, 0.028),
      new THREE.Vector3(side * 0.068, -0.018, 0.016)
    );
    const geo = new THREE.TubeGeometry(curve, 20, 0.0038, 8, false);
    return new THREE.Mesh(geo, smileMat);
  };
  muzzleGroup.add(createSmileArc(-1), createSmileArc(1));

  // 蜜桃粉立体倒三角爱心猫鼻头
  const noseGroup = new THREE.Group();
  noseGroup.position.set(0, 0.014, 0.030);

  const noseGeo = new THREE.SphereGeometry(0.022, 28, 24);
  // 塑造成上宽下尖的饱满爱心小鼻头
  const nPos = noseGeo.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < nPos.count; i++) {
    const x = nPos.getX(i);
    const y = nPos.getY(i);
    const z = nPos.getZ(i);
    const widthScale = y > 0 ? 1.28 : 1.28 * Math.max(0.35, 1.0 + y / 0.028);
    const heartDip = y > 0.01 ? -Math.exp(-Math.pow(x / 0.01, 2.0)) * 0.004 : 0;
    nPos.setXYZ(i, x * widthScale, (y + heartDip) * 0.82, z * 0.68);
  }
  nPos.needsUpdate = true;
  noseGeo.computeVertexNormals();

  const noseMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#f06d88'),
    roughness: 0.42,
    metalness: 0.02
  });
  const noseMesh = new THREE.Mesh(noseGeo, noseMat);

  // 鼻尖水润高光点
  const noseShineMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.0055, 12, 12).scale(1.6, 0.7, 0.5),
    new THREE.MeshBasicMaterial({ color: 0xffd8e2 })
  );
  noseShineMesh.position.set(-0.004, 0.006, 0.014);
  noseGroup.add(noseMesh, noseShineMesh);
  muzzleGroup.add(noseGroup);

  // 说话/开心时微微张开的粉嫩小嘴舌头
  const mouthTongueGeo = new THREE.SphereGeometry(0.016, 20, 16);
  mouthTongueGeo.scale(1.1, 0.85, 0.45);
  const mouthTongueMat = new THREE.MeshBasicMaterial({ color: 0xe65c78 });
  const mouthTongueMesh = new THREE.Mesh(mouthTongueGeo, mouthTongueMat);
  mouthTongueMesh.position.set(0, -0.032, 0.022);
  mouthTongueMesh.scale.set(0.001, 0.001, 0.001);
  mouthTongueMesh.visible = false;
  muzzleGroup.add(mouthTongueMesh);

  // 左右各 3 根自然微弯雪白胡须
  const whiskerMat = new THREE.MeshBasicMaterial({
    color: 0xf4f7fb,
    transparent: true,
    opacity: 0.88
  });
  const whiskerRows = [
    { y0: 0.002, y1: 0.008, y2: -0.006, len: 0.175, z2: -0.018 },
    { y0: -0.008, y1: -0.010, y2: -0.028, len: 0.190, z2: -0.024 },
    { y0: -0.018, y1: -0.026, y2: -0.048, len: 0.165, z2: -0.028 }
  ];
  for (const side of [-1, 1] as const) {
    for (const row of whiskerRows) {
      const wCurve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(side * 0.062, row.y0, 0.014),
        new THREE.Vector3(side * (0.062 + row.len * 0.52), row.y1, 0.006),
        new THREE.Vector3(side * (0.062 + row.len), row.y2, row.z2)
      );
      const wGeo = new THREE.TubeGeometry(wCurve, 16, 0.0018, 6, false);
      const wMesh = new THREE.Mesh(wGeo, whiskerMat);
      muzzleGroup.add(wMesh);
    }
  }

  // ============ 8. 外轮廓边缘同步配色蓬松软毛层 ============
  const furInstancedMesh = buildHejuSilhouetteFur(uniforms);
  root.add(furInstancedMesh);

  const furShellsGroup = new THREE.Group();
  root.add(furShellsGroup);

  // 动画控制状态
  let happyTimer = 0;
  let curiousTimer = 0;
  let jumpProgress = 0;
  let isTalking = false;
  let curYaw = 0;
  let curPitch = 0;
  let curRoll = 0;
  let curLookX = 0;
  let curLookY = 0;
  const tmpMouthWorld = new THREE.Vector3();

  return {
    root,
    profile,
    uniforms,
    furInstancedMesh,
    furShellsGroup,
    triggerHappyJump() {
      happyTimer = 2.4;
      jumpProgress = 1.0;
    },
    setTalking(talking: boolean) {
      isTalking = talking;
      if (talking) {
        happyTimer = Math.max(happyTimer, 0.8);
      }
    },
    setMood(mood: 'happy' | 'curious' | 'normal') {
      if (mood === 'happy') {
        happyTimer = 2.6;
        jumpProgress = 1.0;
      } else if (mood === 'curious') {
        curiousTimer = 3.2;
      }
    },
    getMouthScreenCoord(camera: THREE.Camera, width: number, height: number) {
      noseGroup.getWorldPosition(tmpMouthWorld);
      tmpMouthWorld.y -= 0.06;
      tmpMouthWorld.project(camera);
      return {
        x: (tmpMouthWorld.x * 0.5 + 0.5) * width,
        y: (-tmpMouthWorld.y * 0.5 + 0.5) * height,
        visible: tmpMouthWorld.z < 1.0
      };
    },
    updateFaceTuning(tuning: Partial<CatFaceTuning>) {
      profile.face = { ...profile.face, ...tuning };
      const spacingScale = profile.face.eyeSpacing / 0.198;
      const ex = baseEyeX * THREE.MathUtils.clamp(spacingScale, 0.8, 1.25);
      leftEye.socketGroup.position.x = -ex;
      rightEye.socketGroup.position.x = ex;
    },
    updateRimAndFur(opts) {
      if (opts.rimStrength !== undefined) {
        uniforms.uRimStrength.value = opts.rimStrength;
      }
      if (opts.whiteTipStrength !== undefined) {
        uniforms.uWhiteTipStrength.value = opts.whiteTipStrength;
      }
      if (opts.showFurTufts !== undefined) {
        furInstancedMesh.visible = opts.showFurTufts;
      }
    },
    update(dt: number, elapsed: number, mouseNDC: { x: number; y: number }) {
      uniforms.uTime.value = elapsed;
      const breathWave = Math.sin(elapsed * 2.5);
      uniforms.uBreath.value = breathWave;

      if (happyTimer > 0) {
        happyTimer = Math.max(0, happyTimer - dt);
      }
      if (curiousTimer > 0) {
        curiousTimer = Math.max(0, curiousTimer - dt);
      }
      if (jumpProgress > 0) {
        jumpProgress = Math.max(0, jumpProgress - dt * 2.2);
      }

      // 1) 头部轻柔转向与好奇歪头跟随
      const curiousTiltOffset = curiousTimer > 0 ? Math.sin(elapsed * 3.2) * 0.15 + 0.13 : 0;
      const targetYaw = THREE.MathUtils.clamp(mouseNDC.x * 0.30, -0.34, 0.34);
      const targetPitch = THREE.MathUtils.clamp(-mouseNDC.y * 0.18, -0.20, 0.20);
      const targetRoll =
        THREE.MathUtils.clamp(-mouseNDC.x * 0.12, -0.16, 0.16) +
        Math.sin(elapsed * 1.1) * 0.035 +
        curiousTiltOffset;

      curYaw += (targetYaw - curYaw) * 0.09;
      curPitch += (targetPitch - curPitch) * 0.09;
      curRoll += (targetRoll - curRoll) * 0.09;

      headPivot.rotation.order = 'YXZ';
      headPivot.rotation.set(curPitch, curYaw, curRoll);
      headPivot.position.y = baseHeadPivotPos.y + breathWave * 0.004;

      uniforms.uHeadYaw.value = -curYaw;
      uniforms.uHeadPitch.value = -curPitch;
      uniforms.uHeadRoll.value = -curRoll;

      // 2) 琥珀流金虹膜 + 大瞳孔 + 双高光在眼眶内分层视差跟随鼠标（眼神灵动核心）
      const targetLookX = THREE.MathUtils.clamp(mouseNDC.x, -1.0, 1.0);
      const targetLookY = THREE.MathUtils.clamp(mouseNDC.y, -1.0, 1.0);
      curLookX += (targetLookX - curLookX) * 0.22;
      curLookY += (targetLookY - curLookY) * 0.22;

      // 琥珀虹膜底盘微移，保持包裹在黑色眼线框内
      leftEye.irisGroup.position.set(curLookX * 0.006, curLookY * 0.005, 0.001);
      rightEye.irisGroup.position.set(curLookX * 0.006, curLookY * 0.005, 0.001);

      // 超大深浓咖啡黑瞳孔在琥珀虹膜内部大幅度丝滑转动，自然露出另一侧流金月牙边
      leftEye.pupilGroup.position.set(curLookX * 0.017, curLookY * 0.013, 0.009);
      rightEye.pupilGroup.position.set(curLookX * 0.017, curLookY * 0.013, 0.009);

      // 双水润高光点带角膜球面视差位移，赋予晶莹剔透的玻璃水光感
      leftEye.highlightGroup.position.set(curLookX * 0.004, curLookY * 0.003, 0.004);
      rightEye.highlightGroup.position.set(curLookX * 0.004, curLookY * 0.003, 0.004);

      // 3) 眨眼与开心笑眼切换
      const isHappySmiling = happyTimer > 1.2 && !isTalking;
      leftEye.happyGroup.visible = isHappySmiling;
      rightEye.happyGroup.visible = isHappySmiling;
      leftEye.irisGroup.visible = !isHappySmiling;
      rightEye.irisGroup.visible = !isHappySmiling;

      if (!isHappySmiling) {
        const blinkCycle = (elapsed * 0.88) % 3.8;
        let closeAmount = 0.0;
        if (blinkCycle < 0.11) {
          closeAmount = blinkCycle / 0.11;
        } else if (blinkCycle < 0.22) {
          closeAmount = 1.0 - (blinkCycle - 0.11) / 0.11;
        }
        if (closeAmount > 0.02) {
          leftEye.eyelidMesh.visible = true;
          rightEye.eyelidMesh.visible = true;
          leftEye.eyelidMesh.scale.y = closeAmount;
          rightEye.eyelidMesh.scale.y = closeAmount;
          leftEye.eyelidMesh.position.y = 0.068 * (1.0 - closeAmount);
          rightEye.eyelidMesh.position.y = 0.068 * (1.0 - closeAmount);
        } else {
          leftEye.eyelidMesh.visible = false;
          rightEye.eyelidMesh.visible = false;
        }
      } else {
        leftEye.eyelidMesh.visible = false;
        rightEye.eyelidMesh.visible = false;
      }

      // 4) 耳朵灵动微抽动
      const earWaveL = Math.pow(Math.max(0, Math.sin(elapsed * 1.7 + 0.5)), 14.0);
      const earWaveR = Math.pow(Math.max(0, Math.sin(elapsed * 2.1 + 2.4)), 16.0);
      const twitchL = earWaveL * 0.16 + (happyTimer > 0 ? Math.sin(elapsed * 12) * 0.08 : 0);
      const twitchR = earWaveR * 0.16 + (happyTimer > 0 ? -Math.sin(elapsed * 12) * 0.08 : 0);
      leftEarGroup.rotation.z = 0.36 + twitchL;
      rightEarGroup.rotation.z = -0.36 - twitchR;

      // 5) 说话或开心时花生口套微动与粉嫩小舌头律动
      if (isTalking || happyTimer > 0) {
        const chatter = Math.abs(Math.sin(elapsed * 15.0));
        mouthTongueMesh.visible = true;
        mouthTongueMesh.scale.set(1.0, 0.45 + chatter * 0.75, 1.0);
        leftMuzzlePad.position.y = -0.008 + chatter * 0.003;
        rightMuzzlePad.position.y = -0.008 + chatter * 0.003;
      } else {
        mouthTongueMesh.visible = false;
        leftMuzzlePad.position.y = -0.008;
        rightMuzzlePad.position.y = -0.008;
      }

      // 6) 尾巴轻快摇摆
      tailPivot.rotation.y = Math.sin(elapsed * 3.0) * 0.18;
      tailPivot.rotation.z = Math.cos(elapsed * 2.4) * 0.08;

      // 7) 点击撸猫雀跃跳动
      const jumpY = Math.sin(jumpProgress * Math.PI) * 0.24;
      root.position.y = jumpY;
    }
  };
}

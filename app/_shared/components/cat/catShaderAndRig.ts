import * as THREE from 'three';
import {
  CatProfile,
  CatFaceTuning,
  CatEyeStyle,
  SurfaceSampler,
  autoDetectProfile
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
  uFaceCenter: { value: THREE.Vector2 };
  uEyeY: { value: number };
  uEyeSpacing: { value: number };
  uMouthY: { value: number };
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
 * 将原始 GLB 场景归一化到 [x: centered, y: 0..1, z: centered] 空间，
 * 并对 Tripo 高频坑洼法线进行解剖学球面平滑混合与抛光（面庞前方 75%、身体 45%），
 * 同时提取合并后的顶点/法线缓冲用于精确面部采样与表面植绒
 */
function normalizeAndExtractGeometry(modelScene: THREE.Object3D): {
  meshList: THREE.Mesh[];
  positions: Float32Array;
  normals: Float32Array;
} {
  modelScene.updateMatrixWorld(true);
  const rawBox = new THREE.Box3().setFromObject(modelScene);
  const rawSize = rawBox.getSize(new THREE.Vector3());
  const rawCenter = rawBox.getCenter(new THREE.Vector3());
  const invH = rawSize.y > 1e-5 ? 1.0 / rawSize.y : 1.0;

  const staged: { geom: THREE.BufferGeometry; pArr: Float32Array; nArr: Float32Array }[] = [];
  let headSumX = 0, headSumY = 0, headSumZ = 0, headCount = 0;
  let bodySumX = 0, bodySumY = 0, bodySumZ = 0, bodyCount = 0;
  let totalVerts = 0;

  modelScene.traverse((obj: any) => {
    if (obj.isMesh && obj.geometry) {
      const geom: THREE.BufferGeometry = obj.geometry.clone();
      geom.applyMatrix4(obj.matrixWorld);

      const posAttr = geom.attributes.position as THREE.BufferAttribute;
      if (!geom.attributes.normal) {
        geom.computeVertexNormals();
      }
      const normAttr = geom.attributes.normal as THREE.BufferAttribute;

      const pArr = new Float32Array(posAttr.count * 3);
      const nArr = new Float32Array(normAttr.count * 3);

      for (let i = 0; i < posAttr.count; i++) {
        const nx = (posAttr.getX(i) - rawCenter.x) * invH;
        const ny = (posAttr.getY(i) - rawBox.min.y) * invH;
        const nz = (posAttr.getZ(i) - rawCenter.z) * invH;
        posAttr.setXYZ(i, nx, ny, nz);
        pArr[i * 3] = nx;
        pArr[i * 3 + 1] = ny;
        pArr[i * 3 + 2] = nz;

        if (ny > 0.52 && ny < 0.86) {
          headSumX += nx;
          headSumY += ny;
          headSumZ += nz;
          headCount++;
        } else if (ny >= 0.08 && ny <= 0.48) {
          bodySumX += nx;
          bodySumY += ny;
          bodySumZ += nz;
          bodyCount++;
        }
      }

      posAttr.needsUpdate = true;
      staged.push({ geom, pArr, nArr });
      totalVerts += posAttr.count;
    }
  });

  const hx = headCount > 0 ? headSumX / headCount : 0;
  const hy = headCount > 0 ? headSumY / headCount : 0.68;
  const hz = headCount > 0 ? headSumZ / headCount : 0.1;
  const bx = bodyCount > 0 ? bodySumX / bodyCount : 0;
  const by = bodyCount > 0 ? bodySumY / bodyCount : 0.27;
  const bz = bodyCount > 0 ? bodySumZ / bodyCount : -0.04;

  const meshList: THREE.Mesh[] = [];
  const rawN = new THREE.Vector3();
  const smoothN = new THREE.Vector3();
  const polishedN = new THREE.Vector3();

  for (const item of staged) {
    const { geom, pArr, nArr } = item;
    const normAttr = geom.attributes.normal as THREE.BufferAttribute;
    const count = normAttr.count;

    for (let i = 0; i < count; i++) {
      const nx = pArr[i * 3];
      const ny = pArr[i * 3 + 1];
      const nz = pArr[i * 3 + 2];

      rawN.set(normAttr.getX(i), normAttr.getY(i), normAttr.getZ(i));
      if (rawN.lengthSq() < 1e-8) rawN.set(0, 0, 1);
      else rawN.normalize();

      // 针对头部与躯干分别计算解剖学平滑椭球法线，擦除 AI 白模的高频表面疙瘩
      if (ny > 0.46) {
        smoothN.set((nx - hx) / 0.28, (ny - hy) / 0.23, (nz - hz) / 0.28);
      } else {
        smoothN.set((nx - bx) / 0.26, (ny - by) / 0.24, (nz - bz) / 0.26);
      }
      if (smoothN.lengthSq() < 1e-8) smoothN.copy(rawN);
      else smoothN.normalize();

      const isFrontFace = ny > 0.46 && nz > 0.12;
      const blend = isFrontFace ? 0.75 : 0.45;
      polishedN.copy(rawN).lerp(smoothN, blend);
      if (polishedN.lengthSq() < 1e-8) polishedN.copy(smoothN);
      else polishedN.normalize();

      normAttr.setXYZ(i, polishedN.x, polishedN.y, polishedN.z);
      nArr[i * 3] = polishedN.x;
      nArr[i * 3 + 1] = polishedN.y;
      nArr[i * 3 + 2] = polishedN.z;
    }

    normAttr.needsUpdate = true;
    geom.computeBoundingBox();
    geom.computeBoundingSphere();

    const cleanMesh = new THREE.Mesh(geom);
    cleanMesh.castShadow = true;
    // 关键：关闭自身接收阴影，杜绝毛发凸起在猫脸上投下脏黑斑
    cleanMesh.receiveShadow = false;
    meshList.push(cleanMesh);
  }

  const positions = new Float32Array(totalVerts * 3);
  const normals = new Float32Array(totalVerts * 3);
  let offset = 0;
  for (const item of staged) {
    positions.set(item.pArr, offset);
    normals.set(item.nArr, offset);
    offset += item.pArr.length;
  }

  return { meshList, positions, normals };
}

/**
 * 共享 GLSL 毛流工具与黑白奶牛猫（燕尾服猫）毛色/粉嫩内耳着色函数（body 与 shells 统一使用）
 */
const CAT_SHARED_COAT_GLSL = `
  uniform vec3 uEarTipL;
  uniform vec3 uEarTipR;
  uniform float uEarSize;
  uniform vec3 uHeadPivot;
  uniform vec2 uHeadRange;
  uniform vec3 uTailTip;
  uniform float uTailWhiteRadius;
  uniform vec3 uBodyCenter;
  uniform float uPawHeight;
  uniform vec2 uFaceCenter;
  uniform float uEyeY;
  uniform float uEyeSpacing;
  uniform float uMouthY;
  uniform float uWhiteTipStrength;

  float furHash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  float furNoise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(furHash(i + vec3(0,0,0)), furHash(i + vec3(1,0,0)), f.x),
          mix(furHash(i + vec3(0,1,0)), furHash(i + vec3(1,1,0)), f.x), f.y),
      mix(mix(furHash(i + vec3(0,0,1)), furHash(i + vec3(1,0,1)), f.x),
          mix(furHash(i + vec3(0,1,1)), furHash(i + vec3(1,1,1)), f.x), f.y),
      f.z
    );
  }

  // 计算全身顺毛流切线场（鼻梁向额头、双颊向外、脊背向尾端生长）
  vec3 computeCombTangentModel(vec3 p, vec3 n) {
    vec3 rawFlow = vec3(p.x * 0.42, -0.88, -0.28);
    if (p.y > 0.52) {
      rawFlow = normalize(vec3((p.x - uFaceCenter.x) * 1.12, 0.48, -0.45));
    }
    vec3 proj = rawFlow - n * dot(rawFlow, n);
    float len = length(proj);
    return len > 1e-4 ? (proj / len) : normalize(vec3(1.0, 0.0, 0.0));
  }

  float furStrandField(vec3 p, vec3 n) {
    vec3 t = computeCombTangentModel(p, n);
    vec3 b = normalize(cross(n, t));
    float along = dot(p, t);
    float across = dot(p, b);
    float radial = dot(p, n);
    vec3 clumpPos = vec3(across * 90.0, along * 22.0, radial * 60.0);
    vec3 finePos = vec3(across * 225.0, along * 46.0, radial * 130.0);
    return furNoise(clumpPos) * 0.58 + furNoise(finePos) * 0.42;
  }

  // 计算黑白燕尾服奶牛猫毛色 + 粉嫩内耳廓（输出 Linear RGB）
  vec3 evalTuxedoCoatColor(vec3 p, vec3 n, float strandTex, float clumpTex, out float outWhiteMask, out float outEarPinkMask) {
    float dxHead = p.x - uFaceCenter.x;
    float absDx = abs(dxHead);
    float furJitter = (strandTex - 0.5) * 0.036 + (clumpTex - 0.5) * 0.016;
    float fNoise = strandTex * 0.72 + clumpTex * 0.28;

    // 1) 正脸倒 V 通天鼻梁白毛 + 饱满雪白双颊/下巴
    float bridgePeak = 0.115 * max(0.0, 1.0 - absDx / 0.068);
    float cheekArch = -0.014 + bridgePeak - 0.38 * max(0.0, absDx - 0.145);
    float maskBoundaryY = uEyeY + cheekArch + furJitter;
    float belowMask = 1.0 - smoothstep(maskBoundaryY - 0.024, maskBoundaryY + 0.016, p.y);
    float frontFaceZ = smoothstep(uHeadPivot.z - 0.02, uHeadPivot.z + 0.14, p.z - absDx * 0.18 + furJitter * 0.45);
    float aboveNeck = smoothstep(uHeadRange.x - 0.04, uHeadRange.x + 0.02, p.y);
    float faceWhite = belowMask * frontFaceZ * aboveNeck;

    // 2) 胸前围脖 + 肚皮白毛（同时覆盖坐姿宽胸毛与站姿白肚皮/前爪）
    float inChestY = smoothstep(0.08, 0.15, p.y + furJitter * 0.4) * (1.0 - smoothstep(uHeadRange.x + 0.04, uHeadRange.x + 0.10, p.y));
    float bibHalfW = mix(0.115, 0.195, smoothstep(0.12, 0.40, p.y)) + furJitter * 0.65;
    float bibWidthMask = 1.0 - smoothstep(bibHalfW - 0.030, bibHalfW + 0.018, absDx);
    float chestDepthGate = smoothstep(0.11, 0.21, p.z - absDx * 0.28 - uBodyCenter.z * 0.25 + furJitter * 0.35);
    float chestWhite = inChestY * bibWidthMask * chestDepthGate;

    // 3) 底部四只雪白小猫爪（避开落地尾巴以免尾巴变白）
    float pawHeightGate = 1.0 - smoothstep(uPawHeight * 1.12 + furJitter * 0.4, uPawHeight * 1.56 + furJitter * 0.4, p.y);
    float pawNotTail = smoothstep(-0.08, 0.05, p.z) * smoothstep(uTailWhiteRadius * 1.05, uTailWhiteRadius * 1.45, length(p - uTailTip));
    float pawWhite = pawHeightGate * pawNotTail;

    // 4) 后颈 V 字白领小标记（还原背面视图白领）
    float backGate = smoothstep(uHeadPivot.z - 0.04, uHeadPivot.z - 0.18, p.z) * smoothstep(-0.10, -0.42, n.z);
    float collarY = (uHeadRange.x + 0.042) - absDx * 0.36;
    float collarBand = 1.0 - smoothstep(0.012, 0.032, abs(p.y - collarY + furJitter * 0.35));
    float collarSpan = 1.0 - smoothstep(0.11, 0.18, absDx);
    float backCollarWhite = backGate * collarBand * collarSpan;

    outWhiteMask = clamp(max(max(faceWhite, chestWhite), max(pawWhite, backCollarWhite)), 0.0, 1.0);

    // 5) 粉嫩三角内耳廓（仅正前方内凹耳蜗，外框保留黑色毛边）
    float hL = clamp((p.y - (uEarTipL.y - 0.175)) / 0.135, -0.2, 1.3);
    float triWL = max(0.008, 0.056 * (1.0 - hL * 0.72));
    float inTriL = (1.0 - smoothstep(triWL - 0.016, triWL + 0.010, abs(p.x - (uEarTipL.x + 0.032)) + furJitter * 0.2))
                 * smoothstep(-0.02, 0.10, hL) * (1.0 - smoothstep(0.84, 1.00, hL));

    float hR = clamp((p.y - (uEarTipR.y - 0.175)) / 0.135, -0.2, 1.3);
    float triWR = max(0.008, 0.056 * (1.0 - hR * 0.72));
    float inTriR = (1.0 - smoothstep(triWR - 0.016, triWR + 0.010, abs(p.x - (uEarTipR.x - 0.032)) + furJitter * 0.2))
                 * smoothstep(-0.02, 0.10, hR) * (1.0 - smoothstep(0.84, 1.00, hR));

    float earFrontGate = smoothstep(0.22, 0.56, n.z) * smoothstep(min(uEarTipL.z, uEarTipR.z) - 0.12, min(uEarTipL.z, uEarTipR.z) - 0.02, p.z);
    outEarPinkMask = clamp(max(inTriL, inTriR) * earFrontGate, 0.0, 1.0);

    // Linear 空间调色：深炭黑绒毛 vs 奶油雪白绒毛 vs 柔粉内耳
    vec3 blackFur = mix(vec3(0.022, 0.024, 0.030), vec3(0.088, 0.096, 0.114), smoothstep(0.18, 0.88, fNoise));
    vec3 whiteFur = mix(vec3(0.56, 0.57, 0.60), vec3(0.88, 0.87, 0.85), smoothstep(0.16, 0.88, fNoise));

    // 面部眼窝轻度 AO，令眼周绒毛柔和立体
    if (p.z > 0.18) {
      vec2 leftEyeCenter = vec2(uFaceCenter.x - uEyeSpacing * 0.5, uEyeY);
      vec2 rightEyeCenter = vec2(uFaceCenter.x + uEyeSpacing * 0.5, uEyeY);
      float dSocket = min(length(p.xy - leftEyeCenter), length(p.xy - rightEyeCenter));
      float eyeSocketAO = 1.0 - smoothstep(0.018, 0.068, dSocket);
      blackFur *= mix(1.0, 0.58, eyeSocketAO * 0.72);
    }

    // 前白爪趾缝细腻绒毛阴影
    if (pawWhite > 0.2 && p.y < uPawHeight * 0.78 && p.z > 0.14) {
      float toeWave = pow(max(0.0, sin((p.x - uFaceCenter.x) * 95.0)), 6.0);
      whiteFur *= mix(1.0, 0.68, toeWave * 0.55);
    }

    vec3 coatColor = mix(blackFur, whiteFur, outWhiteMask);
    vec3 innerPink = mix(vec3(0.54, 0.13, 0.19), vec3(0.76, 0.24, 0.30), smoothstep(0.2, 0.85, fNoise));
    coatColor = mix(coatColor, innerPink, outEarPinkMask * 0.92);
    return coatColor;
  }
`;

/**
 * 创建黑白双色燕尾服猫（炭黑丝绒 + 奶油雪白胸爪腮斑 + 粉嫩内耳 + 逆光银边 + 骨骼律动）主材质
 */
function createCatFurMaterial(
  profile: CatProfile,
  uniforms: CatAnimUniforms
): THREE.MeshStandardMaterial {
  const mat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#ffffff'),
    roughness: 0.74,
    metalness: 0.03
  });

  mat.onBeforeCompile = shader => {
    shader.uniforms.uTime = uniforms.uTime;
    shader.uniforms.uHeadYaw = uniforms.uHeadYaw;
    shader.uniforms.uHeadPitch = uniforms.uHeadPitch;
    shader.uniforms.uHeadRoll = uniforms.uHeadRoll;
    shader.uniforms.uEarTwitchL = uniforms.uEarTwitchL;
    shader.uniforms.uEarTwitchR = uniforms.uEarTwitchR;
    shader.uniforms.uBreath = uniforms.uBreath;
    shader.uniforms.uRimPower = uniforms.uRimPower;
    shader.uniforms.uRimStrength = uniforms.uRimStrength;
    shader.uniforms.uWhiteTipStrength = uniforms.uWhiteTipStrength;

    shader.uniforms.uEarTipL = { value: profile.earTipL.clone() };
    shader.uniforms.uEarTipR = { value: profile.earTipR.clone() };
    shader.uniforms.uEarSize = { value: profile.earSize };
    shader.uniforms.uHeadPivot = { value: profile.headPivot.clone() };
    shader.uniforms.uHeadRange = {
      value: new THREE.Vector2(profile.headRange[0], profile.headRange[1])
    };
    shader.uniforms.uHeadZMin = { value: profile.headZMin };
    shader.uniforms.uTailBase = { value: profile.tailBase.clone() };
    shader.uniforms.uTailTip = { value: profile.tailTip.clone() };
    shader.uniforms.uTailWhiteRadius = { value: profile.tailWhiteRadius };
    shader.uniforms.uBodyCenter = { value: profile.bodyCenter.clone() };
    shader.uniforms.uPawHeight = { value: profile.pawHeight };
    shader.uniforms.uFaceCenter = uniforms.uFaceCenter;
    shader.uniforms.uEyeY = uniforms.uEyeY;
    shader.uniforms.uEyeSpacing = uniforms.uEyeSpacing;
    shader.uniforms.uMouthY = uniforms.uMouthY;

    // 注入顶点着色器：先在 <beginnormal_vertex> 同步旋转法线以保证光照正确，再计算视图空间毛流切线传给片元（杜绝片元使用 normalMatrix）
    shader.vertexShader =
      `
      uniform float uTime;
      uniform float uHeadYaw;
      uniform float uHeadPitch;
      uniform float uHeadRoll;
      uniform float uEarTwitchL;
      uniform float uEarTwitchR;
      uniform float uBreath;
      uniform vec3 uEarTipL;
      uniform vec3 uEarTipR;
      uniform float uEarSize;
      uniform vec3 uHeadPivot;
      uniform vec2 uHeadRange;
      uniform float uHeadZMin;
      uniform vec3 uTailBase;
      uniform vec3 uTailTip;
      uniform vec3 uBodyCenter;
      uniform vec2 uFaceCenter;

      varying vec3 vModelPos;
      varying vec3 vModelNormal;
      varying vec3 vViewCombTangent;
      varying vec3 vViewCombBitangent;

      mat3 rotY(float a) {
        float s = sin(a), c = cos(a);
        return mat3(c, 0.0, s, 0.0, 1.0, 0.0, -s, 0.0, c);
      }
      mat3 rotX(float a) {
        float s = sin(a), c = cos(a);
        return mat3(1.0, 0.0, 0.0, 0.0, c, -s, 0.0, s, c);
      }
      mat3 rotZ(float a) {
        float s = sin(a), c = cos(a);
        return mat3(c, -s, 0.0, s, c, 0.0, 0.0, 0.0, 1.0);
      }

      vec3 calcVertexCombTangent(vec3 p, vec3 n) {
        vec3 rawFlow = vec3(p.x * 0.42, -0.88, -0.28);
        if (p.y > 0.52) {
          rawFlow = normalize(vec3((p.x - uFaceCenter.x) * 1.12, 0.48, -0.45));
        }
        vec3 proj = rawFlow - n * dot(rawFlow, n);
        float len = length(proj);
        return len > 1e-4 ? (proj / len) : normalize(vec3(1.0, 0.0, 0.0));
      }
      ` +
      shader.vertexShader
        .replace(
          '#include <beginnormal_vertex>',
          `
          #include <beginnormal_vertex>
          vModelPos = position;
          vModelNormal = normalize(objectNormal);

          mat3 catBoneRot = mat3(1.0);
          float headWeightN = smoothstep(uHeadRange.x, uHeadRange.y, position.y) * smoothstep(uHeadZMin - 0.06, uHeadZMin + 0.06, position.z);
          if (headWeightN > 0.001) {
            catBoneRot = rotY(uHeadYaw * headWeightN) * rotX(uHeadPitch * headWeightN) * rotZ(uHeadRoll * headWeightN);
            objectNormal = catBoneRot * objectNormal;
          }

          float dEarLN = length(position - uEarTipL);
          float wEarLN = 1.0 - smoothstep(0.0, uEarSize, dEarLN);
          if (wEarLN > 0.01) {
            mat3 rLN = rotZ(uEarTwitchL * wEarLN);
            catBoneRot = rLN * catBoneRot;
            objectNormal = rLN * objectNormal;
          }

          float dEarRN = length(position - uEarTipR);
          float wEarRN = 1.0 - smoothstep(0.0, uEarSize, dEarRN);
          if (wEarRN > 0.01) {
            mat3 rRN = rotZ(-uEarTwitchR * wEarRN);
            catBoneRot = rRN * catBoneRot;
            objectNormal = rRN * objectNormal;
          }

          vec3 combTModel = calcVertexCombTangent(position, vModelNormal);
          vec3 combBModel = normalize(cross(vModelNormal, combTModel));
          vViewCombTangent = normalize(normalMatrix * (catBoneRot * combTModel));
          vViewCombBitangent = normalize(normalMatrix * (catBoneRot * combBModel));
          `
        )
        .replace(
          '#include <begin_vertex>',
          `
          #include <begin_vertex>

          // 1) 脚掌锁死权重（y < 0.12 完全抓地不滑步）
          float groundLock = smoothstep(0.08, 0.20, position.y);

          // 2) 胸腔自然呼吸起伏
          float breathMask = smoothstep(0.12, 0.25, position.y) * (1.0 - smoothstep(0.42, 0.54, position.y));
          vec3 toChest = position - uBodyCenter;
          transformed += normalize(vec3(toChest.x, 0.15, toChest.z + 0.05)) * (uBreath * 0.012 * breathMask * groundLock);

          // 3) 头部转头、俯仰与好奇歪头
          float headWeight = smoothstep(uHeadRange.x, uHeadRange.y, position.y) * smoothstep(uHeadZMin - 0.06, uHeadZMin + 0.06, position.z);
          if (headWeight > 0.001) {
            mat3 headRot = rotY(uHeadYaw * headWeight) * rotX(uHeadPitch * headWeight) * rotZ(uHeadRoll * headWeight);
            transformed = uHeadPivot + headRot * (transformed - uHeadPivot);
          }

          // 4) 左右耳朵独立微动抽动
          float dEarL = length(position - uEarTipL);
          float wEarL = 1.0 - smoothstep(0.0, uEarSize, dEarL);
          if (wEarL > 0.01) {
            vec3 earPivotL = uEarTipL - vec3(0.0, uEarSize * 0.65, 0.0);
            mat3 rL = rotZ(uEarTwitchL * wEarL);
            transformed = earPivotL + rL * (transformed - earPivotL);
          }

          float dEarR = length(position - uEarTipR);
          float wEarR = 1.0 - smoothstep(0.0, uEarSize, dEarR);
          if (wEarR > 0.01) {
            vec3 earPivotR = uEarTipR - vec3(0.0, uEarSize * 0.65, 0.0);
            mat3 rR = rotZ(-uEarTwitchR * wEarR);
            transformed = earPivotR + rR * (transformed - earPivotR);
          }

          // 5) 多谐波 S 型尾巴柔顺摇摆
          vec3 tailVec = uTailTip - uTailBase;
          float tailLen = max(length(tailVec), 0.001);
          vec3 tailDir = tailVec / tailLen;
          float tailProj = dot(position - uTailBase, tailDir);
          vec3 tailClosest = uTailBase + clamp(tailProj, 0.0, tailLen) * tailDir;
          float tailDist = length(position - tailClosest);
          float tailMask = smoothstep(0.0, tailLen, tailProj) * (1.0 - smoothstep(0.09, 0.17, tailDist));
          if (tailMask > 0.001) {
            float tailRatio = clamp(tailProj / tailLen, 0.0, 1.0);
            float wag1 = sin(uTime * 2.8 - tailRatio * 4.2) * 0.042 * tailRatio;
            float wag2 = sin(uTime * 5.6 - tailRatio * 7.8) * 0.015 * tailRatio * tailRatio;
            float wag = (wag1 + wag2) * tailMask;
            transformed.x += wag;
            transformed.y += abs(wag) * 0.28 + sin(uTime * 2.8 - tailRatio * 3.0) * 0.008 * tailRatio * tailMask;
          }
          `
        );

    // 注入片元着色器：黑白双色毛斑 + 粉嫩内耳 + 法线微扰 + Kajiya-Kay 高光与 Fresnel 轮廓光（严格避免使用顶点限定 normalMatrix）
    shader.fragmentShader =
      `
      uniform float uRimPower;
      uniform float uRimStrength;

      varying vec3 vModelPos;
      varying vec3 vModelNormal;
      varying vec3 vViewCombTangent;
      varying vec3 vViewCombBitangent;
      ` +
      CAT_SHARED_COAT_GLSL +
      shader.fragmentShader.replace(
        '#include <color_fragment>',
        `
        #include <color_fragment>

        vec3 mPos = vModelPos;
        vec3 mNorm = normalize(vModelNormal);
        float fStrand = furStrandField(mPos, mNorm);
        float fClump = furNoise(mPos * 52.0);
        float coatWhiteMask = 0.0;
        float earPinkMask = 0.0;
        diffuseColor.rgb = evalTuxedoCoatColor(mPos, mNorm, fStrand, fClump, coatWhiteMask, earPinkMask);
        `
      ).replace(
        '#include <normal_fragment_maps>',
        `
        #include <normal_fragment_maps>
        // 沿视图空间毛流切线做微法线扰动（不依赖 normalMatrix）
        {
          vec3 mPosN = vModelPos;
          vec3 mNormN = normalize(vModelNormal);
          vec3 combT = computeCombTangentModel(mPosN, mNormN);
          vec3 combB = normalize(cross(mNormN, combT));
          float s0 = furStrandField(mPosN, mNormN);
          float sAcross = furStrandField(mPosN + combB * 0.0028, mNormN) - s0;
          float sAlong = furStrandField(mPosN + combT * 0.0065, mNormN) - s0;
          vec3 perturbed = normalize(normal + vViewCombBitangent * (sAcross * 0.24) + vViewCombTangent * (sAlong * 0.08));
          float faceKeepSmooth = smoothstep(0.24, 0.40, mPosN.z) * (1.0 - smoothstep(0.42, 0.68, abs(mPosN.x - uFaceCenter.x)));
          normal = normalize(mix(perturbed, normal, faceKeepSmooth * 0.68));
        }
        `
      ).replace(
        '#include <opaque_fragment>',
        `
        vec3 viewDir = normalize(vViewPosition);
        float ndotv = clamp(dot(normalize(normal), viewDir), 0.0, 1.0);

        // Kajiya-Kay 各向异性柔顺毛发光泽（直接复用视图空间 vViewCombTangent）
        vec3 keyLightDir = normalize(vec3(0.32, 0.82, 0.58));
        vec3 halfVec = normalize(viewDir + keyLightDir);
        float tdoth = clamp(dot(normalize(vViewCombTangent), halfVec), -1.0, 1.0);
        float sinTH = sqrt(max(0.0, 1.0 - tdoth * tdoth));
        float strandTex = furStrandField(vModelPos, normalize(vModelNormal));
        float kajiyaSpec = pow(sinTH, 32.0) * (0.35 + 0.85 * strandTex) * smoothstep(0.05, 0.75, ndotv);
        vec3 velvetSheen = mix(vec3(0.35, 0.40, 0.50), vec3(0.68, 0.72, 0.82), strandTex) * kajiyaSpec * 0.14;

        // 截断式毛丝 Fresnel 逆光银边（受 uRimStrength 与 uWhiteTipStrength 联合调节）
        float fresnel = pow(1.0 - ndotv, uRimPower);
        float furTipHighlight = smoothstep(0.28, 0.86, strandTex);
        float rimClump = 0.68 + 0.45 * furNoise(vModelPos * 75.0);
        float dEarEdge = min(length(vModelPos - uEarTipL), length(vModelPos - uEarTipR));
        float tipFrostBoost = 1.0 + (1.0 - smoothstep(0.0, uEarSize * 0.9, dEarEdge)) * uWhiteTipStrength * 0.35;
        vec3 rimGlow = vec3(0.76, 0.80, 0.88) * fresnel * uRimStrength * 0.55 * (0.42 + 0.72 * furTipHighlight) * rimClump * tipFrostBoost;

        // 耳廓薄处逆光暖粉微透（SSS）
        float earBacklight = (1.0 - smoothstep(0.0, uEarSize * 1.1, dEarEdge)) * pow(1.0 - ndotv, 1.8);
        vec3 earWarmGlow = vec3(0.62, 0.22, 0.28) * earBacklight * 0.18;

        outgoingLight += velvetSheen + rimGlow + earWarmGlow;

        #include <opaque_fragment>
        `
      );
  };

  return mat;
}

function smooth01(e0: number, e1: number, x: number): number {
  const t = THREE.MathUtils.clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
}

/** CPU 端同步黑白燕尾服猫毛色分布（与 CAT_SHARED_COAT_GLSL 一致，确保 3D 毛簇完美融合黑/白/粉耳区） */
function sampleTuxedoCoatRgb(
  pos: THREE.Vector3,
  norm: THREE.Vector3,
  profile: CatProfile,
  outColor: THREE.Color
) {
  const dxHead = pos.x - profile.face.centerX;
  const absDx = Math.abs(dxHead);

  const bridgePeak = 0.115 * Math.max(0, 1 - absDx / 0.068);
  const cheekArch = -0.014 + bridgePeak - 0.38 * Math.max(0, absDx - 0.145);
  const maskBoundaryY = profile.face.eyeY + cheekArch;
  const belowMask = 1 - smooth01(maskBoundaryY - 0.024, maskBoundaryY + 0.016, pos.y);
  const frontFaceZ = smooth01(
    profile.headPivot.z - 0.02,
    profile.headPivot.z + 0.14,
    pos.z - absDx * 0.18
  );
  const aboveNeck = smooth01(profile.headRange[0] - 0.04, profile.headRange[0] + 0.02, pos.y);
  const faceWhite = belowMask * frontFaceZ * aboveNeck;

  const inChestY =
    smooth01(0.08, 0.15, pos.y) *
    (1 - smooth01(profile.headRange[0] + 0.04, profile.headRange[0] + 0.10, pos.y));
  const bibHalfW = THREE.MathUtils.lerp(0.115, 0.195, smooth01(0.12, 0.40, pos.y));
  const bibWidthMask = 1 - smooth01(bibHalfW - 0.030, bibHalfW + 0.018, absDx);
  const chestDepthGate = smooth01(
    0.11,
    0.21,
    pos.z - absDx * 0.28 - profile.bodyCenter.z * 0.25
  );
  const chestWhite = inChestY * bibWidthMask * chestDepthGate;

  const pawHeightGate = 1 - smooth01(profile.pawHeight * 1.12, profile.pawHeight * 1.56, pos.y);
  const pawNotTail =
    smooth01(-0.08, 0.05, pos.z) *
    smooth01(profile.tailWhiteRadius * 1.05, profile.tailWhiteRadius * 1.45, pos.distanceTo(profile.tailTip));
  const pawWhite = pawHeightGate * pawNotTail;

  const backGate =
    smooth01(profile.headPivot.z - 0.04, profile.headPivot.z - 0.18, pos.z) *
    smooth01(-0.10, -0.42, norm.z);
  const collarY = profile.headRange[0] + 0.042 - absDx * 0.36;
  const collarBand = 1 - smooth01(0.012, 0.032, Math.abs(pos.y - collarY));
  const collarSpan = 1 - smooth01(0.11, 0.18, absDx);
  const backCollarWhite = backGate * collarBand * collarSpan;

  const whiteMask = THREE.MathUtils.clamp(
    Math.max(faceWhite, chestWhite, pawWhite, backCollarWhite),
    0,
    1
  );

  // 黑色丝绒基底 vs 奶油雪白绒毛（Linear RGB）
  const r = THREE.MathUtils.lerp(0.072, 0.84, whiteMask);
  const g = THREE.MathUtils.lerp(0.078, 0.83, whiteMask);
  const b = THREE.MathUtils.lerp(0.094, 0.81, whiteMask);
  outColor.setRGB(r, g, b);
}

/**
 * 在猫咪耳廓、脸颊腮毛、胸前绒簇、身体外沿与尾巴表面生成柔和贴体的立体绒毛 (InstancedMesh)
 * 自动随黑白双色燕尾服猫斑纹上色，呈现图 2/图 3 般柔软丰满的毛绒轮廓
 */
function buildSurfaceFurTufts(
  positions: Float32Array,
  normals: Float32Array,
  profile: CatProfile,
  uniforms: CatAnimUniforms
): THREE.InstancedMesh {
  const maxTufts = 3400;
  // 柔和细短绒毛叶，顺毛贴伏生长，打造蓬松圆润绒毛轮廓
  const tuftGeo = new THREE.ConeGeometry(0.0035, 0.018, 5, 2, true);
  tuftGeo.translate(0, 0.009, 0);
  tuftGeo.rotateX(Math.PI * 0.5);

  const posAttr = tuftGeo.attributes.position as THREE.BufferAttribute;
  const furCoords = new Float32Array(posAttr.count);
  for (let i = 0; i < posAttr.count; i++) {
    const z = posAttr.getZ(i);
    const t = THREE.MathUtils.clamp(z / 0.018, 0, 1);
    furCoords[i] = t;
    const droop = -0.0028 * t * t;
    const widthTaper = 1.0 - 0.22 * t * t;
    posAttr.setX(i, posAttr.getX(i) * widthTaper);
    posAttr.setY(i, posAttr.getY(i) * widthTaper + droop);
  }
  posAttr.needsUpdate = true;
  tuftGeo.setAttribute('aFurCoord', new THREE.BufferAttribute(furCoords, 1));
  tuftGeo.computeVertexNormals();

  const tuftMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.72,
    metalness: 0.02,
    side: THREE.DoubleSide
  });

  tuftMat.onBeforeCompile = shader => {
    shader.uniforms.uTime = uniforms.uTime;
    shader.uniforms.uHeadYaw = uniforms.uHeadYaw;
    shader.uniforms.uHeadPitch = uniforms.uHeadPitch;
    shader.uniforms.uHeadRoll = uniforms.uHeadRoll;
    shader.uniforms.uEarTwitchL = uniforms.uEarTwitchL;
    shader.uniforms.uEarTwitchR = uniforms.uEarTwitchR;
    shader.uniforms.uBreath = uniforms.uBreath;
    shader.uniforms.uRimStrength = uniforms.uRimStrength;
    shader.uniforms.uEarTipL = { value: profile.earTipL.clone() };
    shader.uniforms.uEarTipR = { value: profile.earTipR.clone() };
    shader.uniforms.uEarSize = { value: profile.earSize };
    shader.uniforms.uHeadPivot = { value: profile.headPivot.clone() };
    shader.uniforms.uHeadRange = {
      value: new THREE.Vector2(profile.headRange[0], profile.headRange[1])
    };
    shader.uniforms.uHeadZMin = { value: profile.headZMin };
    shader.uniforms.uTailBase = { value: profile.tailBase.clone() };
    shader.uniforms.uTailTip = { value: profile.tailTip.clone() };
    shader.uniforms.uBodyCenter = { value: profile.bodyCenter.clone() };

    shader.vertexShader =
      `
      attribute float aFurCoord;
      varying float vFurCoord;
      varying vec3 vTuftViewPos;
      varying vec3 vTuftViewNormal;

      uniform float uTime;
      uniform float uHeadYaw;
      uniform float uHeadPitch;
      uniform float uHeadRoll;
      uniform float uEarTwitchL;
      uniform float uEarTwitchR;
      uniform float uBreath;
      uniform vec3 uEarTipL;
      uniform vec3 uEarTipR;
      uniform float uEarSize;
      uniform vec3 uHeadPivot;
      uniform vec2 uHeadRange;
      uniform float uHeadZMin;
      uniform vec3 uTailBase;
      uniform vec3 uTailTip;
      uniform vec3 uBodyCenter;

      mat3 tuftRotY(float a) {
        float s = sin(a), c = cos(a);
        return mat3(c, 0.0, s, 0.0, 1.0, 0.0, -s, 0.0, c);
      }
      mat3 tuftRotX(float a) {
        float s = sin(a), c = cos(a);
        return mat3(1.0, 0.0, 0.0, 0.0, c, -s, 0.0, s, c);
      }
      mat3 tuftRotZ(float a) {
        float s = sin(a), c = cos(a);
        return mat3(c, -s, 0.0, s, c, 0.0, 0.0, 0.0, 1.0);
      }
      ` +
      shader.vertexShader.replace(
        '#include <project_vertex>',
        `
        vFurCoord = aFurCoord;
        vec4 mvPosition = vec4( transformed, 1.0 );
        #ifdef USE_INSTANCING
          vec3 tuftAnchor = instanceMatrix[3].xyz;
          mat3 instRot = mat3(instanceMatrix);

          float groundLock = smoothstep(0.08, 0.20, tuftAnchor.y);
          float breathMask = smoothstep(0.12, 0.25, tuftAnchor.y) * (1.0 - smoothstep(0.42, 0.54, tuftAnchor.y));
          vec3 toChest = tuftAnchor - uBodyCenter;
          vec3 deformedAnchor = tuftAnchor
            + normalize(vec3(toChest.x, 0.15, toChest.z + 0.05)) * (uBreath * 0.012 * breathMask * groundLock);
          mat3 tuftRot = mat3(1.0);

          float headWeight = smoothstep(uHeadRange.x, uHeadRange.y, tuftAnchor.y) * smoothstep(uHeadZMin - 0.06, uHeadZMin + 0.06, tuftAnchor.z);
          if (headWeight > 0.001) {
            mat3 headRot = tuftRotY(uHeadYaw * headWeight) * tuftRotX(uHeadPitch * headWeight) * tuftRotZ(uHeadRoll * headWeight);
            deformedAnchor = uHeadPivot + headRot * (deformedAnchor - uHeadPivot);
            tuftRot = headRot * tuftRot;
          }

          float dEarL = length(tuftAnchor - uEarTipL);
          float wEarL = 1.0 - smoothstep(0.0, uEarSize, dEarL);
          if (wEarL > 0.01) {
            vec3 earPivotL = uEarTipL - vec3(0.0, uEarSize * 0.65, 0.0);
            mat3 rL = tuftRotZ(uEarTwitchL * wEarL);
            deformedAnchor = earPivotL + rL * (deformedAnchor - earPivotL);
            tuftRot = rL * tuftRot;
          }

          float dEarR = length(tuftAnchor - uEarTipR);
          float wEarR = 1.0 - smoothstep(0.0, uEarSize, dEarR);
          if (wEarR > 0.01) {
            vec3 earPivotR = uEarTipR - vec3(0.0, uEarSize * 0.65, 0.0);
            mat3 rR = tuftRotZ(-uEarTwitchR * wEarR);
            deformedAnchor = earPivotR + rR * (deformedAnchor - earPivotR);
            tuftRot = rR * tuftRot;
          }

          vec3 tailVec = uTailTip - uTailBase;
          float tailLen = max(length(tailVec), 0.001);
          vec3 tailDir = tailVec / tailLen;
          float tailProj = dot(tuftAnchor - uTailBase, tailDir);
          vec3 tailClosest = uTailBase + clamp(tailProj, 0.0, tailLen) * tailDir;
          float tailDist = length(tuftAnchor - tailClosest);
          float tailMask = smoothstep(0.0, tailLen, tailProj) * (1.0 - smoothstep(0.09, 0.17, tailDist));
          if (tailMask > 0.001) {
            float tailRatio = clamp(tailProj / tailLen, 0.0, 1.0);
            float wag1 = sin(uTime * 2.8 - tailRatio * 4.2) * 0.042 * tailRatio;
            float wag2 = sin(uTime * 5.6 - tailRatio * 7.8) * 0.015 * tailRatio * tailRatio;
            float wag = (wag1 + wag2) * tailMask;
            deformedAnchor.x += wag;
            deformedAnchor.y += abs(wag) * 0.28 + sin(uTime * 2.8 - tailRatio * 3.0) * 0.008 * tailRatio * tailMask;
          }

          vec3 localBlade = instRot * transformed;
          float breezePhase = dot(tuftAnchor, vec3(19.0, 27.0, 15.0));
          float tipFlex = aFurCoord * aFurCoord;
          localBlade.x += sin(uTime * 2.8 + breezePhase) * 0.0014 * tipFlex;
          localBlade.y += cos(uTime * 2.3 + breezePhase * 0.7) * 0.0012 * tipFlex;

          mvPosition = vec4(deformedAnchor + tuftRot * localBlade, 1.0);
          vTuftViewNormal = normalize(normalMatrix * (tuftRot * (instRot * objectNormal)));
        #else
          vTuftViewNormal = normalize(normalMatrix * objectNormal);
        #endif
        mvPosition = modelViewMatrix * mvPosition;
        vTuftViewPos = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
        `
      );

    shader.fragmentShader =
      `
      varying float vFurCoord;
      varying vec3 vTuftViewPos;
      varying vec3 vTuftViewNormal;
      uniform float uRimStrength;
      ` +
      shader.fragmentShader.replace(
        '#include <dithering_fragment>',
        `
        // 温和毛根 AO，确保白色腮毛与胸毛保持洁白饱满不发黑
        float rootAO = mix(0.62, 1.06, smoothstep(0.0, 0.85, vFurCoord));
        gl_FragColor.rgb *= rootAO;

        vec3 viewDir = normalize(vTuftViewPos);
        vec3 nrm = normalize(vTuftViewNormal);
        float tipFresnel = pow(1.0 - abs(dot(nrm, viewDir)), 2.1);
        float tipGlow = smoothstep(0.45, 1.0, vFurCoord) * (0.25 + 0.55 * tipFresnel);
        gl_FragColor.rgb += vec3(0.32, 0.36, 0.44) * tipGlow * 0.16 * uRimStrength;
        #include <dithering_fragment>
        `
      );
  };

  const instanced = new THREE.InstancedMesh(tuftGeo, tuftMat, maxTufts);
  instanced.castShadow = false;
  instanced.receiveShadow = false;

  const vertCount = positions.length / 3;
  const dummy = new THREE.Object3D();
  const color = new THREE.Color();
  const up = new THREE.Vector3(0, 1, 0);
  const pos = new THREE.Vector3();
  const norm = new THREE.Vector3();
  const combDir = new THREE.Vector3();
  const target = new THREE.Vector3();

  let placed = 0;
  const step = Math.max(1, Math.floor(vertCount / (maxTufts * 2.2)));

  for (let i = 0; i < vertCount && placed < maxTufts; i += step) {
    pos.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
    norm.set(normals[i * 3], normals[i * 3 + 1], normals[i * 3 + 2]).normalize();

    if (pos.y < 0.025) continue;
    const dxFace = Math.abs(pos.x - profile.face.centerX);
    // 避开正面眼睛、粉鼻头与立体白嘴套位置，以及粉嫩内耳窝
    if (
      pos.z > 0.20 &&
      dxFace < profile.face.eyeSpacing * 0.68 + 0.044 &&
      pos.y > profile.face.mouthY - 0.048 &&
      pos.y < profile.face.eyeY + 0.070
    ) {
      continue;
    }

    const dEar = Math.min(pos.distanceTo(profile.earTipL), pos.distanceTo(profile.earTipR));
    const isInnerEarFront = pos.y > 0.80 && pos.y < 0.96 && dEar < profile.earSize * 0.85 && norm.z > 0.30;
    if (isInnerEarFront) continue;

    const dTail = pos.distanceTo(profile.tailTip);
    const isEarRim = dEar < profile.earSize * 1.12 && norm.z < 0.45;
    const isTailTip = dTail < profile.tailWhiteRadius * 0.95;
    const isCheekRuff =
      pos.y > profile.headRange[0] &&
      pos.y < profile.face.eyeY + 0.03 &&
      dxFace > profile.face.eyeSpacing * 0.65 &&
      pos.z > profile.headPivot.z - 0.06;
    const isChestTuft =
      pos.y > 0.14 &&
      pos.y < profile.headRange[0] + 0.05 &&
      pos.z > profile.bodyCenter.z + 0.12 &&
      dxFace < 0.19;
    const isSilhouette = Math.abs(norm.z) < 0.64;

    if (!isEarRim && !isTailTip && !isCheekRuff && !isChestTuft && !isSilhouette) {
      continue;
    }

    dummy.position.copy(pos);

    if (isEarRim) {
      combDir.set((pos.x - profile.face.centerX) * 0.35, 0.85, 0.1).normalize();
    } else if (isCheekRuff) {
      combDir.set(Math.sign(pos.x - profile.face.centerX) * 0.80, -0.34, 0.22).normalize();
    } else if (isChestTuft) {
      combDir.set((pos.x - profile.face.centerX) * 0.25, -0.80, 0.42).normalize();
    } else {
      combDir.set(norm.x * 0.28, -0.70, norm.z * 0.28).normalize();
    }

    target
      .copy(pos)
      .addScaledVector(norm, isEarRim ? 0.44 : isCheekRuff ? 0.38 : 0.34)
      .addScaledVector(combDir, 0.90)
      .addScaledVector(up, isEarRim ? 0.18 : -0.06);
    dummy.lookAt(target);

    const scaleWidth = isCheekRuff || isChestTuft ? 1.18 : isEarRim ? 1.02 : 0.94;
    const scaleLen = isEarRim
      ? 1.15
      : isTailTip
        ? 1.10
        : isCheekRuff
          ? 1.14
          : isChestTuft
            ? 1.08
            : 0.86;
    dummy.scale.set(scaleWidth, scaleWidth, scaleLen);
    dummy.updateMatrix();
    instanced.setMatrixAt(placed, dummy.matrix);

    sampleTuxedoCoatRgb(pos, norm, profile, color);
    instanced.setColorAt(placed, color);
    placed++;
  }

  instanced.count = placed;
  instanced.instanceMatrix.needsUpdate = true;
  if (instanced.instanceColor) instanced.instanceColor.needsUpdate = true;
  return instanced;
}

/**
 * 构建双层微偏移体积绒毛壳 (Multi-Layer Fur Shells)
 * 通过 <color_fragment> 与场景光源同步着色，黑白胸斑/脸颊/粉耳与主体无缝融为一体
 */
function buildFurShellsGroup(
  meshList: THREE.Mesh[],
  profile: CatProfile,
  uniforms: CatAnimUniforms
): THREE.Group {
  const group = new THREE.Group();
  const shellLayers = [
    { fraction: 0.35, offset: 0.0018 },
    { fraction: 0.78, offset: 0.0036 }
  ];

  for (const layer of shellLayers) {
    const shellMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#ffffff'),
      roughness: 0.68,
      metalness: 0.03,
      alphaTest: 0.5
    });

    shellMat.onBeforeCompile = shader => {
      shader.uniforms.uTime = uniforms.uTime;
      shader.uniforms.uHeadYaw = uniforms.uHeadYaw;
      shader.uniforms.uHeadPitch = uniforms.uHeadPitch;
      shader.uniforms.uHeadRoll = uniforms.uHeadRoll;
      shader.uniforms.uEarTwitchL = uniforms.uEarTwitchL;
      shader.uniforms.uEarTwitchR = uniforms.uEarTwitchR;
      shader.uniforms.uBreath = uniforms.uBreath;
      shader.uniforms.uRimPower = uniforms.uRimPower;
      shader.uniforms.uRimStrength = uniforms.uRimStrength;
      shader.uniforms.uWhiteTipStrength = uniforms.uWhiteTipStrength;
      shader.uniforms.uShellFraction = { value: layer.fraction };
      shader.uniforms.uShellOffset = { value: layer.offset };

      shader.uniforms.uEarTipL = { value: profile.earTipL.clone() };
      shader.uniforms.uEarTipR = { value: profile.earTipR.clone() };
      shader.uniforms.uEarSize = { value: profile.earSize };
      shader.uniforms.uHeadPivot = { value: profile.headPivot.clone() };
      shader.uniforms.uHeadRange = {
        value: new THREE.Vector2(profile.headRange[0], profile.headRange[1])
      };
      shader.uniforms.uHeadZMin = { value: profile.headZMin };
      shader.uniforms.uTailBase = { value: profile.tailBase.clone() };
      shader.uniforms.uTailTip = { value: profile.tailTip.clone() };
      shader.uniforms.uTailWhiteRadius = { value: profile.tailWhiteRadius };
      shader.uniforms.uBodyCenter = { value: profile.bodyCenter.clone() };
      shader.uniforms.uPawHeight = { value: profile.pawHeight };
      shader.uniforms.uFaceCenter = uniforms.uFaceCenter;
      shader.uniforms.uEyeY = uniforms.uEyeY;
      shader.uniforms.uEyeSpacing = uniforms.uEyeSpacing;
      shader.uniforms.uMouthY = uniforms.uMouthY;

      shader.vertexShader =
        `
        varying vec3 vCatOrigPos;
        varying vec3 vCatOrigNormal;
        varying vec3 vCatViewPos;
        varying vec3 vCatViewNormal;

        uniform float uTime;
        uniform float uHeadYaw;
        uniform float uHeadPitch;
        uniform float uHeadRoll;
        uniform float uEarTwitchL;
        uniform float uEarTwitchR;
        uniform float uBreath;
        uniform float uShellFraction;
        uniform float uShellOffset;
        uniform vec3 uEarTipL;
        uniform vec3 uEarTipR;
        uniform float uEarSize;
        uniform vec3 uHeadPivot;
        uniform vec2 uHeadRange;
        uniform float uHeadZMin;
        uniform vec3 uTailBase;
        uniform vec3 uTailTip;
        uniform vec3 uBodyCenter;
        uniform float uPawHeight;
        uniform vec2 uFaceCenter;
        uniform float uEyeY;
        uniform float uEyeSpacing;
        uniform float uMouthY;

        mat3 shellRotY(float a) {
          float s = sin(a), c = cos(a);
          return mat3(c, 0.0, s, 0.0, 1.0, 0.0, -s, 0.0, c);
        }
        mat3 shellRotX(float a) {
          float s = sin(a), c = cos(a);
          return mat3(1.0, 0.0, 0.0, 0.0, c, -s, 0.0, s, c);
        }
        mat3 shellRotZ(float a) {
          float s = sin(a), c = cos(a);
          return mat3(c, -s, 0.0, s, c, 0.0, 0.0, 0.0, 1.0);
        }
        ` +
        shader.vertexShader
          .replace(
            '#include <beginnormal_vertex>',
            `
            #include <beginnormal_vertex>
            vCatOrigNormal = normalize(objectNormal);

            float headWeightN = smoothstep(uHeadRange.x, uHeadRange.y, position.y) * smoothstep(uHeadZMin - 0.06, uHeadZMin + 0.06, position.z);
            if (headWeightN > 0.001) {
              mat3 headRotN = shellRotY(uHeadYaw * headWeightN) * shellRotX(uHeadPitch * headWeightN) * shellRotZ(uHeadRoll * headWeightN);
              objectNormal = headRotN * objectNormal;
            }
            float dEarLN = length(position - uEarTipL);
            float wEarLN = 1.0 - smoothstep(0.0, uEarSize, dEarLN);
            if (wEarLN > 0.01) objectNormal = shellRotZ(uEarTwitchL * wEarLN) * objectNormal;
            float dEarRN = length(position - uEarTipR);
            float wEarRN = 1.0 - smoothstep(0.0, uEarSize, dEarRN);
            if (wEarRN > 0.01) objectNormal = shellRotZ(-uEarTwitchR * wEarRN) * objectNormal;
            `
          )
          .replace(
            '#include <begin_vertex>',
            `
            #include <begin_vertex>
            vCatOrigPos = position;

            // 仅在双眼眼眶与鼻尖核心范围略收薄壳厚，其余面部与白爪均保有柔软绒毛厚度
            float dEyeShellL = length(position.xy - vec2(uFaceCenter.x - uEyeSpacing * 0.5, uEyeY));
            float dEyeShellR = length(position.xy - vec2(uFaceCenter.x + uEyeSpacing * 0.5, uEyeY));
            float dEyeShellMin = min(dEyeShellL, dEyeShellR);
            float dNoseShell = length(position.xy - vec2(uFaceCenter.x, uMouthY + 0.02));
            float faceMask = mix(1.0, smoothstep(0.020, 0.052, min(dEyeShellMin, dNoseShell)), smoothstep(0.22, 0.34, position.z));
            float pawMask = smoothstep(0.015, 0.045, position.y);
            vec3 shellPos = transformed + vCatOrigNormal * (uShellOffset * faceMask * pawMask) + vec3(0.0, -0.0006 * uShellFraction * uShellFraction, 0.0);

            float groundLock = smoothstep(0.08, 0.20, position.y);
            float breathMask = smoothstep(0.12, 0.25, position.y) * (1.0 - smoothstep(0.42, 0.54, position.y));
            vec3 toChest = shellPos - uBodyCenter;
            shellPos += normalize(vec3(toChest.x, 0.15, toChest.z + 0.05)) * (uBreath * 0.012 * breathMask * groundLock);

            float headWeight = smoothstep(uHeadRange.x, uHeadRange.y, position.y) * smoothstep(uHeadZMin - 0.06, uHeadZMin + 0.06, position.z);
            if (headWeight > 0.001) {
              mat3 headRot = shellRotY(uHeadYaw * headWeight) * shellRotX(uHeadPitch * headWeight) * shellRotZ(uHeadRoll * headWeight);
              shellPos = uHeadPivot + headRot * (shellPos - uHeadPivot);
            }

            float dEarL = length(position - uEarTipL);
            float wEarL = 1.0 - smoothstep(0.0, uEarSize, dEarL);
            if (wEarL > 0.01) {
              vec3 earPivotL = uEarTipL - vec3(0.0, uEarSize * 0.65, 0.0);
              shellPos = earPivotL + shellRotZ(uEarTwitchL * wEarL) * (shellPos - earPivotL);
            }

            float dEarR = length(position - uEarTipR);
            float wEarR = 1.0 - smoothstep(0.0, uEarSize, dEarR);
            if (wEarR > 0.01) {
              vec3 earPivotR = uEarTipR - vec3(0.0, uEarSize * 0.65, 0.0);
              shellPos = earPivotR + shellRotZ(-uEarTwitchR * wEarR) * (shellPos - earPivotR);
            }

            vec3 tailVec = uTailTip - uTailBase;
            float tailLen = max(length(tailVec), 0.001);
            vec3 tailDir = tailVec / tailLen;
            float tailProj = dot(position - uTailBase, tailDir);
            vec3 tailClosest = uTailBase + clamp(tailProj, 0.0, tailLen) * tailDir;
            float tailDist = length(position - tailClosest);
            float tailMask = smoothstep(0.0, tailLen, tailProj) * (1.0 - smoothstep(0.09, 0.17, tailDist));
            if (tailMask > 0.001) {
              float tailRatio = clamp(tailProj / tailLen, 0.0, 1.0);
              float wag1 = sin(uTime * 2.8 - tailRatio * 4.2) * 0.042 * tailRatio;
              float wag2 = sin(uTime * 5.6 - tailRatio * 7.8) * 0.015 * tailRatio * tailRatio;
              float wag = (wag1 + wag2) * tailMask;
              shellPos.x += wag;
              shellPos.y += abs(wag) * 0.28 + sin(uTime * 2.8 - tailRatio * 3.0) * 0.008 * tailRatio * tailMask;
            }

            transformed = shellPos;
            `
          )
          .replace(
            '#include <project_vertex>',
            `
            #include <project_vertex>
            vCatViewPos = -mvPosition.xyz;
            vCatViewNormal = normalize(transformedNormal);
            `
          );

      shader.fragmentShader =
        `
        varying vec3 vCatOrigPos;
        varying vec3 vCatOrigNormal;
        varying vec3 vCatViewPos;
        varying vec3 vCatViewNormal;

        uniform float uShellFraction;
        uniform float uRimPower;
        uniform float uRimStrength;
        ` +
        CAT_SHARED_COAT_GLSL +
        shader.fragmentShader
          .replace(
            '#include <color_fragment>',
            `
            #include <color_fragment>
            if (vCatOrigPos.y < 0.015) discard;

            vec3 nOrig = normalize(vCatOrigNormal);
            float fStrand = furStrandField(vCatOrigPos, nOrig);
            float fClump = furNoise(vCatOrigPos * 52.0);

            vec3 combTangent = computeCombTangentModel(vCatOrigPos, nOrig);
            vec3 bitangent = normalize(cross(nOrig, combTangent));
            vec3 anisoCoord = combTangent * dot(vCatOrigPos, combTangent) * 32.0
                            + bitangent * dot(vCatOrigPos, bitangent) * 195.0
                            + nOrig * dot(vCatOrigPos, nOrig) * 85.0;
            float strandDensity = furNoise(anisoCoord) * 0.65 + furNoise(anisoCoord * 2.15) * 0.35;

            vec3 viewDir = normalize(vCatViewPos);
            vec3 nrm = normalize(vCatViewNormal);
            float ndotv = abs(dot(nrm, viewDir));
            float grazingBoost = pow(1.0 - ndotv, 1.45) * 0.26;
            float threshold = mix(0.18, 0.42, uShellFraction) - grazingBoost;

            if (vCatOrigPos.z > 0.24) {
              float dEyeFragL = length(vCatOrigPos.xy - vec2(uFaceCenter.x - uEyeSpacing * 0.5, uEyeY));
              float dEyeFragR = length(vCatOrigPos.xy - vec2(uFaceCenter.x + uEyeSpacing * 0.5, uEyeY));
              float dEyeFrag = min(dEyeFragL, dEyeFragR);
              float eyeFade = smoothstep(0.024, 0.044, dEyeFrag);
              threshold = mix(1.05, threshold, eyeFade);
            }
            if (strandDensity < threshold) discard;

            float shellWhite = 0.0;
            float shellEarPink = 0.0;
            vec3 coatColor = evalTuxedoCoatColor(vCatOrigPos, nOrig, fStrand, fClump, shellWhite, shellEarPink);
            float shellAO = mix(0.76, 1.12, uShellFraction);
            diffuseColor.rgb = coatColor * shellAO;
            `
          )
          .replace(
            '#include <opaque_fragment>',
            `
            vec3 shellViewDir = normalize(vCatViewPos);
            vec3 shellNrm = normalize(vCatViewNormal);
            float shellNdotV = clamp(abs(dot(shellNrm, shellViewDir)), 0.0, 1.0);
            float shellFresnel = pow(1.0 - shellNdotV, uRimPower);
            float dEarShellEdge = min(length(vCatOrigPos - uEarTipL), length(vCatOrigPos - uEarTipR));
            float shellFrost = 1.0 + (1.0 - smoothstep(0.0, uEarSize * 0.9, dEarShellEdge)) * uWhiteTipStrength * 0.30;
            outgoingLight += vec3(0.68, 0.72, 0.80) * shellFresnel * 0.24 * uRimStrength * uShellFraction * shellFrost;
            #include <opaque_fragment>
            `
          );
    };

    meshList.forEach(srcMesh => {
      const shellMesh = new THREE.Mesh(srcMesh.geometry, shellMat);
      shellMesh.position.copy(srcMesh.position);
      shellMesh.rotation.copy(srcMesh.rotation);
      shellMesh.scale.copy(srcMesh.scale);
      shellMesh.castShadow = false;
      shellMesh.receiveShadow = false;
      group.add(shellMesh);
    });
  }

  return group;
}

const IRIS_PALETTES: Record<Exclude<CatEyeStyle, 'pixel'>, { outer: string; mid: string; inner: string; glow: string }> = {
  amber: { outer: '#9b510b', mid: '#e89d1c', inner: '#ffd966', glow: '#d98a1e' },
  emerald: { outer: '#0b4f3a', mid: '#1fb980', inner: '#95f7c9', glow: '#1ea876' },
  sapphire: { outer: '#143370', mid: '#3b82f6', inner: '#9dd0ff', glow: '#2b6de0' },
};

/** 生成高质感放射状猫眼虹膜纹理（边缘深色角膜缘环 + 放射状星芒纤维 + 暖光晕） */
function createCatIrisTexture(style: Exclude<CatEyeStyle, 'pixel'>): THREE.CanvasTexture {
  const palette = IRIS_PALETTES[style];
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const half = size / 2;

  const grad = ctx.createRadialGradient(half, half, 4, half, half, half);
  grad.addColorStop(0.0, palette.inner);
  grad.addColorStop(0.45, palette.inner);
  grad.addColorStop(0.72, palette.mid);
  grad.addColorStop(0.90, palette.outer);
  grad.addColorStop(0.96, '#121114');
  grad.addColorStop(1.0, '#09090b');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  ctx.save();
  ctx.translate(half, half);
  for (let i = 0; i < 64; i++) {
    const angle = (i / 64) * Math.PI * 2;
    const lenInner = 20 + (i % 3) * 3;
    const lenOuter = 54 + (i % 4) * 2;
    ctx.strokeStyle = i % 2 === 0 ? 'rgba(255, 250, 224, 0.20)' : 'rgba(24, 14, 6, 0.22)';
    ctx.lineWidth = i % 3 === 0 ? 1.3 : 0.9;
    ctx.beginPath();
    ctx.moveTo(Math.cos(angle) * lenInner, Math.sin(angle) * lenInner);
    ctx.lineTo(Math.cos(angle) * lenOuter, Math.sin(angle) * lenOuter);
    ctx.stroke();
  }
  ctx.restore();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** 创建带正面前投极坐标 UV 的凸面虹膜几何体（防止极点纹理扭曲） */
function createFrontDomeGeometry(radius: number, wSeg = 26, hSeg = 16, thetaLength = Math.PI * 0.46): THREE.BufferGeometry {
  const geo = new THREE.SphereGeometry(radius, wSeg, hSeg, 0, Math.PI * 2, 0, thetaLength);
  geo.rotateX(Math.PI / 2);
  const pos = geo.attributes.position as THREE.BufferAttribute;
  const uv = geo.attributes.uv as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    uv.setXY(i, 0.5 + (pos.getX(i) / radius) * 0.5, 0.5 + (pos.getY(i) / radius) * 0.5);
  }
  uv.needsUpdate = true;
  return geo;
}

/** 创建脚底柔和径向渐变接触阴影贴图 */
function createContactShadowTexture(): THREE.CanvasTexture {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const half = size / 2;
  const grad = ctx.createRadialGradient(half, half, 4, half, half, half);
  grad.addColorStop(0.0, 'rgba(10, 8, 6, 0.62)');
  grad.addColorStop(0.45, 'rgba(10, 8, 6, 0.36)');
  grad.addColorStop(0.82, 'rgba(10, 8, 6, 0.08)');
  grad.addColorStop(1.0, 'rgba(10, 8, 6, 0.0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

interface GlassEyeParts {
  glassRoot: THREE.Group;
  shellScaler: THREE.Group;
  irisPivot: THREE.Group;
  irisMat: THREE.MeshStandardMaterial;
  pupilMesh: THREE.Mesh;
  happyArc: THREE.Mesh;
}

/**
 * 构建双模式 3D 灵动五官组件：
 * - 3D 琉璃萌眼模式（amber / emerald / sapphire）：大圆琥珀/琉璃猫眼 + 双点眼神光 + 立体胖白嘴套肉垫 + 粉嫩心形小鼻 + ω 微笑 + 6 根白胡须
 * - 经典像素模式（pixel）：圆角竖条像素眼 + `^ ^` 开心笑眼 + 品字形 3 方块像素嘴
 */
class CatPixelFaceRig {
  public group = new THREE.Group();
  private leftEyeGroup = new THREE.Group();
  private rightEyeGroup = new THREE.Group();
  private mouthPivotGroup = new THREE.Group();

  // 经典像素模式零件
  private pixelGroupL = new THREE.Group();
  private pixelGroupR = new THREE.Group();
  private pixelMouthGroup = new THREE.Group();
  private leftNormalBar: THREE.Mesh;
  private rightNormalBar: THREE.Mesh;
  private leftHappyChevron: THREE.Group;
  private rightHappyChevron: THREE.Group;
  private mouthTopBlock: THREE.Mesh;
  private mouthLeftBlock: THREE.Mesh;
  private mouthRightBlock: THREE.Mesh;

  // 3D 琉璃萌眼与立体胖白嘴套口鼻须零件
  private leftGlassEye: GlassEyeParts;
  private rightGlassEye: GlassEyeParts;
  private irisTextures: Record<Exclude<CatEyeStyle, 'pixel'>, THREE.CanvasTexture>;
  private nosePivotGroup = new THREE.Group();
  private muzzlePadsGroup = new THREE.Group();
  private realisticMouthGroup = new THREE.Group();
  private openMouthCavity: THREE.Mesh;
  private whiskersGroup = new THREE.Group();
  private leftWhiskerGroup = new THREE.Group();
  private rightWhiskerGroup = new THREE.Group();

  private baseLeftEyePos = new THREE.Vector3();
  private baseRightEyePos = new THREE.Vector3();
  private baseNosePos = new THREE.Vector3();
  private baseMouthPos = new THREE.Vector3();
  private baseCheekLPos = new THREE.Vector3();
  private baseCheekRPos = new THREE.Vector3();
  private currentPupilScale = 0.94;
  private lastLookX = 0;
  private lastLookY = 0;
  private smoothSafeLeftZ = 0;
  private smoothSafeRightZ = 0;

  constructor(
    private sampler: SurfaceSampler,
    private headPivot: THREE.Vector3,
    private tuning: CatFaceTuning
  ) {
    this.group.position.copy(headPivot);

    // ---- A. 经典像素五官部件 ----
    const pixelWhiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const eyeGeo = new THREE.BoxGeometry(1, 1, 0.45);
    this.leftNormalBar = new THREE.Mesh(eyeGeo, pixelWhiteMat);
    this.rightNormalBar = new THREE.Mesh(eyeGeo, pixelWhiteMat);

    const createHappyChevron = () => {
      const g = new THREE.Group();
      const legGeo = new THREE.BoxGeometry(0.65, 0.24, 0.45);
      const l1 = new THREE.Mesh(legGeo, pixelWhiteMat);
      l1.position.set(-0.2, 0.05, 0);
      l1.rotation.z = 0.55;
      const l2 = new THREE.Mesh(legGeo, pixelWhiteMat);
      l2.position.set(0.2, 0.05, 0);
      l2.rotation.z = -0.55;
      g.add(l1, l2);
      g.visible = false;
      return g;
    };
    this.leftHappyChevron = createHappyChevron();
    this.rightHappyChevron = createHappyChevron();
    this.pixelGroupL.add(this.leftNormalBar, this.leftHappyChevron);
    this.pixelGroupR.add(this.rightNormalBar, this.rightHappyChevron);

    const mouthUnitGeo = new THREE.BoxGeometry(1, 0.88, 0.5);
    this.mouthTopBlock = new THREE.Mesh(mouthUnitGeo, pixelWhiteMat);
    this.mouthLeftBlock = new THREE.Mesh(mouthUnitGeo, pixelWhiteMat);
    this.mouthRightBlock = new THREE.Mesh(mouthUnitGeo, pixelWhiteMat);
    this.pixelMouthGroup.add(this.mouthTopBlock, this.mouthLeftBlock, this.mouthRightBlock);

    // ---- B. 3D 琉璃大圆萌眼 ----
    this.irisTextures = {
      amber: createCatIrisTexture('amber'),
      emerald: createCatIrisTexture('emerald'),
      sapphire: createCatIrisTexture('sapphire'),
    };

    const socketGeo = createFrontDomeGeometry(1.06, 22, 14, Math.PI * 0.52);
    const irisGeo = createFrontDomeGeometry(0.95, 26, 16, Math.PI * 0.45);
    const corneaGeo = createFrontDomeGeometry(1.02, 26, 16, Math.PI * 0.48);
    // 萌系大圆瞳孔（参考图 2/图 3 比例：宽圆亮瞳 + 琥珀月牙外缘）
    const pupilGeo = new THREE.SphereGeometry(0.64, 22, 16);
    const glintGeo = new THREE.SphereGeometry(1, 14, 10);
    const lashCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-0.96, 0.24, 0.34),
      new THREE.Vector3(0, 1.06, 0.56),
      new THREE.Vector3(0.96, 0.24, 0.34)
    );
    const lashGeo = new THREE.TubeGeometry(lashCurve, 18, 0.075, 8, false);

    const happyCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-0.78, -0.14, 0.45),
      new THREE.Vector3(0, 0.44, 0.72),
      new THREE.Vector3(0.78, -0.14, 0.45)
    );
    const happyArcGeo = new THREE.TubeGeometry(happyCurve, 16, 0.13, 8, false);

    const socketMat = new THREE.MeshStandardMaterial({ color: '#090a0e', roughness: 0.72, metalness: 0.05 });
    const pupilMat = new THREE.MeshStandardMaterial({ color: '#0b0807', roughness: 0.12, metalness: 0.06 });
    const lashMat = new THREE.MeshStandardMaterial({ color: '#0c0d12', roughness: 0.65, metalness: 0.05 });
    const corneaMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.03,
      metalness: 0.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      reflectivity: 0.98,
      transparent: true,
      opacity: 0.16,
      depthWrite: false,
    });
    const glintMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.96 });
    const happyArcMat = new THREE.MeshStandardMaterial({
      color: '#fff6e6',
      emissive: '#f5cd8c',
      emissiveIntensity: 0.5,
      roughness: 0.35,
    });

    const createGlassEye = (): GlassEyeParts => {
      const glassRoot = new THREE.Group();
      const shellScaler = new THREE.Group();
      glassRoot.add(shellScaler);

      const socketRim = new THREE.Mesh(socketGeo, socketMat);
      socketRim.scale.set(1.04, 1.04, 0.45);
      shellScaler.add(socketRim);

      const irisPivot = new THREE.Group();
      shellScaler.add(irisPivot);

      const irisMat = new THREE.MeshStandardMaterial({
        map: this.irisTextures.amber,
        roughness: 0.22,
        metalness: 0.04,
        emissive: new THREE.Color(IRIS_PALETTES.amber.glow),
        emissiveIntensity: 0.28,
      });
      const irisMesh = new THREE.Mesh(irisGeo, irisMat);
      irisMesh.scale.set(1.0, 1.0, 0.56);
      irisPivot.add(irisMesh);

      const pupilMesh = new THREE.Mesh(pupilGeo, pupilMat);
      pupilMesh.position.set(0, 0, 0.34);
      pupilMesh.scale.set(0.94, 1.04, 0.36);
      irisPivot.add(pupilMesh);

      const corneaMesh = new THREE.Mesh(corneaGeo, corneaMat);
      corneaMesh.scale.set(1.0, 1.0, 0.66);
      shellScaler.add(corneaMesh);

      const upperLash = new THREE.Mesh(lashGeo, lashMat);
      shellScaler.add(upperLash);

      const catchlightMain = new THREE.Mesh(glintGeo, glintMat);
      catchlightMain.position.set(-0.30, 0.32, 0.69);
      catchlightMain.scale.set(0.21, 0.15, 0.045);
      catchlightMain.rotation.z = 0.32;
      shellScaler.add(catchlightMain);

      const catchlightSub = new THREE.Mesh(glintGeo, glintMat);
      catchlightSub.position.set(0.26, -0.26, 0.67);
      catchlightSub.scale.set(0.095, 0.095, 0.04);
      shellScaler.add(catchlightSub);

      const happyArc = new THREE.Mesh(happyArcGeo, happyArcMat);
      happyArc.visible = false;
      glassRoot.add(happyArc);

      return { glassRoot, shellScaler, irisPivot, irisMat, pupilMesh, happyArc };
    };

    this.leftGlassEye = createGlassEye();
    this.rightGlassEye = createGlassEye();

    this.leftEyeGroup.add(this.pixelGroupL, this.leftGlassEye.glassRoot);
    this.rightEyeGroup.add(this.pixelGroupR, this.rightGlassEye.glassRoot);

    // ---- C. 粉嫩湿润心形小鼻头 ----
    const noseGeo = new THREE.SphereGeometry(1, 18, 14);
    const nosePos = noseGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < nosePos.count; i++) {
      const nx = nosePos.getX(i);
      const ny = nosePos.getY(i);
      const nz = nosePos.getZ(i);
      const widenTop = ny > 0 ? 1.18 : 0.70 + (1 + ny) * 0.36;
      nosePos.setXYZ(i, nx * widenTop, ny * 0.84, nz * 0.78);
    }
    noseGeo.computeVertexNormals();
    const noseMat = new THREE.MeshPhysicalMaterial({
      color: '#ee748e',
      emissive: '#380e16',
      emissiveIntensity: 0.16,
      roughness: 0.24,
      metalness: 0.02,
      clearcoat: 0.85,
      clearcoatRoughness: 0.12,
    });
    const noseMesh = new THREE.Mesh(noseGeo, noseMat);
    noseMesh.scale.set(0.0145, 0.0105, 0.011);
    this.nosePivotGroup.add(noseMesh);

    // ---- D. 立体胖白花生嘴套 + 深炭 ω 微笑猫嘴 + 说话口腔 ----
    const muzzleWhiteMat = new THREE.MeshStandardMaterial({
      color: '#e8e6e2',
      roughness: 0.90,
      metalness: 0.0,
    });
    const muzzleGeo = new THREE.SphereGeometry(1, 20, 16);
    const muzzleLeftPad = new THREE.Mesh(muzzleGeo, muzzleWhiteMat);
    muzzleLeftPad.position.set(-0.019, 0.011, -0.004);
    muzzleLeftPad.scale.set(0.026, 0.0185, 0.017);

    const muzzleRightPad = new THREE.Mesh(muzzleGeo, muzzleWhiteMat);
    muzzleRightPad.position.set(0.019, 0.011, -0.004);
    muzzleRightPad.scale.set(0.026, 0.0185, 0.017);

    const chinPad = new THREE.Mesh(muzzleGeo, muzzleWhiteMat);
    chinPad.position.set(0, -0.009, -0.005);
    chinPad.scale.set(0.026, 0.014, 0.014);

    this.muzzlePadsGroup.add(muzzleLeftPad, muzzleRightPad, chinPad);

    const lipMat = new THREE.MeshStandardMaterial({
      color: '#3a302d',
      roughness: 0.55,
      metalness: 0.02,
    });
    const stemCurve = new THREE.LineCurve3(new THREE.Vector3(0, 0.015, 0.013), new THREE.Vector3(0, 0.002, 0.014));
    const lipL = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(0, 0.002, 0.014),
      new THREE.Vector3(-0.012, -0.008, 0.013),
      new THREE.Vector3(-0.025, 0.003, 0.006)
    );
    const lipR = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(0, 0.002, 0.014),
      new THREE.Vector3(0.012, -0.008, 0.013),
      new THREE.Vector3(0.025, 0.003, 0.006)
    );
    const philtrumMesh = new THREE.Mesh(new THREE.TubeGeometry(stemCurve, 4, 0.0021, 6, false), lipMat);
    const arcMeshL = new THREE.Mesh(new THREE.TubeGeometry(lipL, 12, 0.0022, 6, false), lipMat);
    const arcMeshR = new THREE.Mesh(new THREE.TubeGeometry(lipR, 12, 0.0022, 6, false), lipMat);

    const cavityMat = new THREE.MeshStandardMaterial({
      color: '#d96d78',
      emissive: '#782832',
      emissiveIntensity: 0.25,
      roughness: 0.35,
    });
    this.openMouthCavity = new THREE.Mesh(new THREE.SphereGeometry(0.009, 14, 10), cavityMat);
    this.openMouthCavity.position.set(0, -0.006, 0.010);
    this.openMouthCavity.scale.set(1.1, 0.2, 0.55);
    this.openMouthCavity.visible = false;
    this.realisticMouthGroup.add(philtrumMesh, arcMeshL, arcMeshR, this.openMouthCavity);

    // ---- E. 6 根柔亮白色 3D 胡须 ----
    const whiskerMat = new THREE.MeshStandardMaterial({
      color: '#f5f6f8',
      roughness: 0.35,
      metalness: 0.02,
      transparent: true,
      opacity: 0.78,
    });
    const buildCheekWhiskers = (side: -1 | 1) => {
      const grp = new THREE.Group();
      const specs = [
        { dy: 0.007, ang: 0.14, len: 0.118 },
        { dy: 0.0, ang: 0.0, len: 0.132 },
        { dy: -0.007, ang: -0.16, len: 0.115 },
      ];
      for (const s of specs) {
        const curve = new THREE.QuadraticBezierCurve3(
          new THREE.Vector3(0, s.dy, 0.004),
          new THREE.Vector3(side * s.len * 0.52, s.dy + Math.sin(s.ang) * s.len * 0.4, 0.008),
          new THREE.Vector3(side * s.len, s.dy + Math.sin(s.ang) * s.len - 0.010, -0.015)
        );
        const wGeo = new THREE.TubeGeometry(curve, 10, 0.0012, 5, false);
        grp.add(new THREE.Mesh(wGeo, whiskerMat));
      }
      return grp;
    };
    this.leftWhiskerGroup = buildCheekWhiskers(-1);
    this.rightWhiskerGroup = buildCheekWhiskers(1);
    this.whiskersGroup.add(this.leftWhiskerGroup, this.rightWhiskerGroup);

    this.mouthPivotGroup.add(this.pixelMouthGroup, this.muzzlePadsGroup, this.realisticMouthGroup);

    this.group.add(
      this.leftEyeGroup,
      this.rightEyeGroup,
      this.nosePivotGroup,
      this.mouthPivotGroup,
      this.whiskersGroup
    );

    this.applyTuning(tuning);
  }

  /** 对大圆眼周边 5 个采样点取最大前凸 Z，防止放大眼睛边缘埋进鼻梁或眼框 */
  private sampleEyeEnvelope(cx: number, cy: number, centerX: number) {
    const centerSample = this.sampler.sample(cx, cy, 0.028, centerX);
    let maxZ = centerSample.point.z;
    for (const [dx, dy] of [
      [-0.028, 0],
      [0.028, 0],
      [0, -0.024],
      [0, 0.024],
    ]) {
      const s = this.sampler.sample(cx + dx, cy + dy, 0.028, centerX);
      if (s.point.z > maxZ) maxZ = s.point.z;
    }
    return {
      point: new THREE.Vector3(centerSample.point.x, centerSample.point.y, maxZ),
      normal: centerSample.normal,
    };
  }

  public applyTuning(next: Partial<CatFaceTuning>) {
    this.tuning = { ...this.tuning, ...next };
    const { centerX, eyeY, eyeSpacing, eyeW, eyeH, mouthY, mouthSize, surfaceOffset } =
      this.tuning;
    const eyeStyle: CatEyeStyle = this.tuning.eyeStyle || 'amber';
    const isPixel = eyeStyle === 'pixel';

    const lx = centerX - eyeSpacing * 0.5;
    const rx = centerX + eyeSpacing * 0.5;
    const noseY = mouthY + (eyeY - mouthY) * 0.36;

    const sLeft = this.sampleEyeEnvelope(lx, eyeY, centerX);
    const sRight = this.sampleEyeEnvelope(rx, eyeY, centerX);
    const sNose = this.sampler.sample(centerX, noseY, 0.028, centerX);
    const sMouth = this.sampler.sample(centerX, mouthY, 0.028, centerX);
    const sCheekL = this.sampler.sample(centerX - 0.048, mouthY + 0.010, 0.028, centerX);
    const sCheekR = this.sampler.sample(centerX + 0.048, mouthY + 0.010, 0.028, centerX);

    const safeFrontZ = Math.max(sNose.point.z, sMouth.point.z);

    this.baseLeftEyePos
      .copy(sLeft.point)
      .addScaledVector(sLeft.normal, surfaceOffset)
      .sub(this.headPivot);
    this.baseRightEyePos
      .copy(sRight.point)
      .addScaledVector(sRight.normal, surfaceOffset)
      .sub(this.headPivot);
    this.baseNosePos
      .set(sNose.point.x, sNose.point.y, Math.max(sNose.point.z, safeFrontZ))
      .addScaledVector(sNose.normal, surfaceOffset + 0.015)
      .sub(this.headPivot);
    this.baseMouthPos
      .set(sMouth.point.x, sMouth.point.y, Math.max(sMouth.point.z, safeFrontZ - 0.002))
      .addScaledVector(sMouth.normal, surfaceOffset + 0.006)
      .sub(this.headPivot);
    this.baseCheekLPos
      .copy(sCheekL.point)
      .addScaledVector(sCheekL.normal, surfaceOffset + 0.005)
      .sub(this.headPivot);
    this.baseCheekRPos
      .copy(sCheekR.point)
      .addScaledVector(sCheekR.normal, surfaceOffset + 0.005)
      .sub(this.headPivot);

    this.leftEyeGroup.position.copy(this.baseLeftEyePos);
    this.rightEyeGroup.position.copy(this.baseRightEyePos);
    this.smoothSafeLeftZ = this.baseLeftEyePos.z;
    this.smoothSafeRightZ = this.baseRightEyePos.z;

    const fwd = new THREE.Vector3(0, 0, 1);
    this.leftEyeGroup.quaternion.setFromUnitVectors(fwd, sLeft.normal);
    this.rightEyeGroup.quaternion.setFromUnitVectors(fwd, sRight.normal);
    this.nosePivotGroup.position.copy(this.baseNosePos);
    this.nosePivotGroup.quaternion.setFromUnitVectors(fwd, sNose.normal);
    this.mouthPivotGroup.position.copy(this.baseMouthPos);
    this.mouthPivotGroup.quaternion.setFromUnitVectors(fwd, sMouth.normal);
    this.leftWhiskerGroup.position.copy(this.baseCheekLPos);
    this.rightWhiskerGroup.position.copy(this.baseCheekRPos);

    // 模式可见性切换
    this.pixelGroupL.visible = isPixel;
    this.pixelGroupR.visible = isPixel;
    this.pixelMouthGroup.visible = isPixel;
    this.leftGlassEye.glassRoot.visible = !isPixel;
    this.rightGlassEye.glassRoot.visible = !isPixel;
    this.nosePivotGroup.visible = !isPixel;
    this.muzzlePadsGroup.visible = !isPixel;
    this.realisticMouthGroup.visible = !isPixel;
    this.whiskersGroup.visible = !isPixel;

    // 放大萌系大圆琥珀/琉璃猫眼比例
    const glassRx = Math.max(0.032, eyeH * 0.56);
    const glassRy = Math.max(0.034, eyeH * 0.57);
    const glassRz = Math.max(0.018, eyeW * 0.72);
    this.leftGlassEye.glassRoot.scale.set(glassRx, glassRy, glassRz);
    this.rightGlassEye.glassRoot.scale.set(glassRx, glassRy, glassRz);

    if (!isPixel) {
      const tex = this.irisTextures[eyeStyle];
      const pal = IRIS_PALETTES[eyeStyle];
      for (const eye of [this.leftGlassEye, this.rightGlassEye]) {
        eye.irisMat.map = tex;
        eye.irisMat.emissive.set(pal.glow);
        eye.irisMat.needsUpdate = true;
      }
    }

    // 同步经典像素五官尺寸
    this.leftNormalBar.scale.set(eyeW, eyeH, eyeW);
    this.rightNormalBar.scale.set(eyeW, eyeH, eyeW);
    this.leftHappyChevron.scale.set(eyeH * 0.9, eyeH * 0.9, eyeW);
    this.rightHappyChevron.scale.set(eyeH * 0.9, eyeH * 0.9, eyeW);

    const ms = mouthSize;
    this.mouthTopBlock.scale.set(ms, ms, ms);
    this.mouthLeftBlock.scale.set(ms, ms, ms);
    this.mouthRightBlock.scale.set(ms, ms, ms);
    this.mouthTopBlock.position.set(0, ms * 0.48, 0);
    this.mouthLeftBlock.position.set(-ms * 0.85, -ms * 0.42, 0);
    this.mouthRightBlock.position.set(ms * 0.85, -ms * 0.42, 0);
  }

  public update(
    elapsed: number,
    mouseNDC: { x: number; y: number },
    isHappy: boolean,
    isTalking: boolean,
    isCurious: boolean,
    headQuat: THREE.Quaternion
  ) {
    this.group.quaternion.copy(headQuat);

    const eyeStyle: CatEyeStyle = this.tuning.eyeStyle || 'amber';
    const isPixel = eyeStyle === 'pixel';
    const lookX = THREE.MathUtils.clamp(mouseNDC.x, -1.2, 1.2) * (isPixel ? 0.020 : 0.007);
    const lookY = THREE.MathUtils.clamp(mouseNDC.y, -1.2, 1.2) * (isPixel ? 0.014 : 0.005);

    if (Math.abs(lookX - this.lastLookX) > 0.0008 || Math.abs(lookY - this.lastLookY) > 0.0008) {
      this.lastLookX = lookX;
      this.lastLookY = lookY;
      const lx = this.tuning.centerX - this.tuning.eyeSpacing * 0.5 + lookX;
      const rx = this.tuning.centerX + this.tuning.eyeSpacing * 0.5 + lookX;
      const ly = this.tuning.eyeY + lookY;
      const sL = this.sampleEyeEnvelope(lx, ly, this.tuning.centerX);
      const sR = this.sampleEyeEnvelope(rx, ly, this.tuning.centerX);
      const safeZOffset = this.tuning.surfaceOffset - this.headPivot.z;
      this.smoothSafeLeftZ = Math.max(this.baseLeftEyePos.z, sL.point.z + safeZOffset);
      this.smoothSafeRightZ = Math.max(this.baseRightEyePos.z, sR.point.z + safeZOffset);
    }

    const zL = THREE.MathUtils.lerp(this.leftEyeGroup.position.z, this.smoothSafeLeftZ, 0.25);
    const zR = THREE.MathUtils.lerp(this.rightEyeGroup.position.z, this.smoothSafeRightZ, 0.25);

    this.leftEyeGroup.position.set(this.baseLeftEyePos.x + lookX, this.baseLeftEyePos.y + lookY, zL);
    this.rightEyeGroup.position.set(this.baseRightEyePos.x + lookX, this.baseRightEyePos.y + lookY, zR);

    const blinkCycle = (elapsed * 0.9) % 3.6;
    let blinkScale = 1.0;
    if (!isHappy) {
      if (blinkCycle < 0.11) {
        blinkScale = Math.max(0.08, 1.0 - (blinkCycle / 0.11) * 0.92);
      } else if (blinkCycle < 0.22) {
        blinkScale = 0.08 + ((blinkCycle - 0.11) / 0.11) * 0.92;
      }
    }

    if (isPixel) {
      this.leftHappyChevron.visible = isHappy;
      this.rightHappyChevron.visible = isHappy;
      this.leftNormalBar.visible = !isHappy;
      this.rightNormalBar.visible = !isHappy;
      if (!isHappy) {
        this.leftNormalBar.scale.y = this.tuning.eyeH * blinkScale;
        this.rightNormalBar.scale.y = this.tuning.eyeH * blinkScale;
      }

      const ms = this.tuning.mouthSize;
      if (isTalking || isHappy) {
        const chatter = Math.sin(elapsed * 18.0) * 0.0045;
        const spread = Math.abs(Math.cos(elapsed * 14.0)) * 0.0035;
        this.mouthTopBlock.position.y = ms * 0.48 + Math.abs(chatter);
        this.mouthLeftBlock.position.y = -ms * 0.42 - Math.abs(chatter);
        this.mouthRightBlock.position.y = -ms * 0.42 - Math.abs(chatter);
        this.mouthLeftBlock.position.x = -ms * 0.85 - spread;
        this.mouthRightBlock.position.x = ms * 0.85 + spread;
      } else {
        const idleBreath = Math.sin(elapsed * 2.4) * 0.001;
        this.mouthTopBlock.position.y = ms * 0.48 + idleBreath;
        this.mouthLeftBlock.position.y = -ms * 0.42;
        this.mouthRightBlock.position.y = -ms * 0.42;
        this.mouthLeftBlock.position.x = -ms * 0.85;
        this.mouthRightBlock.position.x = ms * 0.85;
      }
    } else {
      // 3D 琉璃萌眼模式：保持大圆亮瞳并随好奇/说话轻微散大
      const targetPupilScale = isCurious || isTalking ? 1.06 : 0.94;
      this.currentPupilScale += (targetPupilScale - this.currentPupilScale) * 0.1;

      const gazeYaw = THREE.MathUtils.clamp(mouseNDC.x, -1.0, 1.0) * 0.22;
      const gazePitch = THREE.MathUtils.clamp(-mouseNDC.y, -1.0, 1.0) * 0.16;

      for (const eye of [this.leftGlassEye, this.rightGlassEye]) {
        eye.happyArc.visible = isHappy;
        eye.shellScaler.visible = !isHappy;
        eye.shellScaler.scale.y = blinkScale;
        eye.irisPivot.rotation.set(gazePitch, gazeYaw, 0);
        eye.irisPivot.position.set(gazeYaw * 0.34, -gazePitch * 0.30, 0);
        eye.pupilMesh.scale.set(this.currentPupilScale, this.currentPupilScale * 1.08, 0.36);
      }

      if (isTalking || isHappy) {
        const openAmt = isTalking
          ? 0.35 + Math.abs(Math.sin(elapsed * 16.0)) * 0.85
          : 0.45 + Math.sin(elapsed * 5.0) * 0.15;
        this.openMouthCavity.visible = true;
        this.openMouthCavity.scale.set(1.05, openAmt, 0.6);
        this.realisticMouthGroup.position.y = -openAmt * 0.0025;
        this.leftWhiskerGroup.rotation.z = Math.sin(elapsed * 14.0) * 0.045;
        this.rightWhiskerGroup.rotation.z = -Math.sin(elapsed * 14.0) * 0.045;
      } else {
        this.openMouthCavity.visible = false;
        this.realisticMouthGroup.position.y = Math.sin(elapsed * 2.4) * 0.0008;
        this.leftWhiskerGroup.rotation.z = Math.sin(elapsed * 2.2) * 0.015;
        this.rightWhiskerGroup.rotation.z = -Math.sin(elapsed * 2.2) * 0.015;
      }
    }
  }

  public getMouthWorldPosition(target: THREE.Vector3): THREE.Vector3 {
    this.mouthPivotGroup.getWorldPosition(target);
    return target;
  }
}

/**
 * 将任意 GLB 模型装配为具备「平滑法线 + 炭黑丝绒 + 银灰毛边 + 柔和立体绒毛 + 3D琉璃五官 + 物理弹性动效」的完整角色
 */
export function buildRiggedCatFromGLB(
  rawScene: THREE.Object3D,
  presetProfile?: CatProfile,
  targetWorldHeight = 2.18
): RiggedCatController {
  const { meshList, positions, normals } = normalizeAndExtractGeometry(rawScene);
  const profile = presetProfile
    ? {
        ...presetProfile,
        face: { ...presetProfile.face }
      }
    : autoDetectProfile(positions);

  const uniforms: CatAnimUniforms = {
    uTime: { value: 0 },
    uHeadYaw: { value: 0 },
    uHeadPitch: { value: 0 },
    uHeadRoll: { value: 0 },
    uEarTwitchL: { value: 0 },
    uEarTwitchR: { value: 0 },
    uBreath: { value: 0 },
    uRimPower: { value: 2.55 },
    uRimStrength: { value: 1.45 },
    uWhiteTipStrength: { value: 1.0 },
    uFaceCenter: {
      value: new THREE.Vector2(
        profile.face.centerX,
        (profile.face.eyeY + profile.face.mouthY) * 0.5
      )
    },
    uEyeY: { value: profile.face.eyeY },
    uEyeSpacing: { value: profile.face.eyeSpacing },
    uMouthY: { value: profile.face.mouthY }
  };

  const furMaterial = createCatFurMaterial(profile, uniforms);
  const root = new THREE.Group();
  root.scale.setScalar(targetWorldHeight);

  meshList.forEach(m => {
    m.material = furMaterial;
    root.add(m);
  });

  // 双层微偏移体积短绒底毛壳（与身体共享动画 uniforms，消除网格边缘硬切感与脸部秃斑）
  const furShellsGroup = buildFurShellsGroup(meshList, profile, uniforms);
  root.add(furShellsGroup);

  // 表面柔和贴体 3D 绒毛层（与身体共享动画 uniforms，毛随呼吸/转头/摇尾同步变形）
  const furInstancedMesh = buildSurfaceFurTufts(positions, normals, profile, uniforms);
  root.add(furInstancedMesh);

  // 脚底地毯接触软阴影（Contact Shadow，随跳跃高度动态缩放淡出）
  const shadowMat = new THREE.MeshBasicMaterial({
    map: createContactShadowTexture(),
    transparent: true,
    opacity: 0.65,
    depthWrite: false,
  });
  const contactShadow = new THREE.Mesh(new THREE.PlaneGeometry(0.96, 0.86), shadowMat);
  contactShadow.rotation.x = -Math.PI / 2;
  contactShadow.position.set(profile.bodyCenter.x * 0.45, 0.004, 0.0);
  contactShadow.renderOrder = 2;
  root.add(contactShadow);

  // 3D 琉璃五官 & 经典像素双模式组件
  const sampler = new SurfaceSampler(positions, normals, profile.face.centerX);
  const faceRig = new CatPixelFaceRig(sampler, profile.headPivot, profile.face);
  root.add(faceRig.group);

  // 动画状态变量
  let happyTimer = 0;
  let curiousTimer = 0;
  let jumpProgress = 0;
  let isTalking = false;
  let curYaw = 0;
  let curPitch = 0;
  let curRoll = 0;
  const headQuat = new THREE.Quaternion();
  const euler = new THREE.Euler(0, 0, 0, 'YXZ');
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
        happyTimer = Math.max(happyTimer, 1.2);
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
      faceRig.getMouthWorldPosition(tmpMouthWorld);
      tmpMouthWorld.project(camera);
      return {
        x: (tmpMouthWorld.x * 0.5 + 0.5) * width,
        y: (-tmpMouthWorld.y * 0.5 + 0.5) * height,
        visible: tmpMouthWorld.z < 1.0
      };
    },
    updateFaceTuning(tuning: Partial<CatFaceTuning>) {
      Object.assign(profile.face, tuning);
      uniforms.uFaceCenter.value.set(
        profile.face.centerX,
        (profile.face.eyeY + profile.face.mouthY) * 0.5
      );
      uniforms.uEyeY.value = profile.face.eyeY;
      uniforms.uEyeSpacing.value = profile.face.eyeSpacing;
      uniforms.uMouthY.value = profile.face.mouthY;
      faceRig.applyTuning(tuning);
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
        furShellsGroup.visible = opts.showFurTufts;
      }
    },
    update(dt: number, elapsed: number, mouseNDC: { x: number; y: number }) {
      uniforms.uTime.value = elapsed;
      uniforms.uBreath.value = Math.sin(elapsed * 2.5);

      if (happyTimer > 0) {
        happyTimer = Math.max(0, happyTimer - dt);
      }
      if (curiousTimer > 0) {
        curiousTimer = Math.max(0, curiousTimer - dt);
      }
      if (jumpProgress > 0) {
        jumpProgress = Math.max(0, jumpProgress - dt * 1.65);
      }

      // 鼠标视线跟随 + 好奇歪头插值（dt 无关阻尼，60/120 FPS 与 24 FPS 省电模式速度一致）
      const curiousTiltOffset = curiousTimer > 0 ? Math.sin(elapsed * 3.2) * 0.16 + 0.14 : 0;
      const targetYaw = THREE.MathUtils.clamp(mouseNDC.x * 0.32, -0.35, 0.35);
      const targetPitch = THREE.MathUtils.clamp(-mouseNDC.y * 0.2, -0.22, 0.22);
      const targetRoll =
        THREE.MathUtils.clamp(-mouseNDC.x * 0.14, -0.18, 0.18) +
        Math.sin(elapsed * 1.1) * 0.04 +
        curiousTiltOffset;

      const headDamp = 1.0 - Math.exp(-5.8 * dt);
      curYaw += (targetYaw - curYaw) * headDamp;
      curPitch += (targetPitch - curPitch) * headDamp;
      curRoll += (targetRoll - curRoll) * headDamp;

      // GLSL mat3 按列构造，旧 rotX/Y/Z 的符号与 Three.js 四元数相反。
      const shaderDirection = -1;
      uniforms.uHeadYaw.value = curYaw * shaderDirection;
      uniforms.uHeadPitch.value = curPitch * shaderDirection;
      uniforms.uHeadRoll.value = curRoll * shaderDirection;

      // 耳朵不定时灵动抽动
      const earWaveL = Math.pow(Math.max(0, Math.sin(elapsed * 1.7 + 0.5)), 14.0);
      const earWaveR = Math.pow(Math.max(0, Math.sin(elapsed * 2.1 + 2.4)), 16.0);
      uniforms.uEarTwitchL.value = earWaveL * 0.22 + (happyTimer > 0 ? Math.sin(elapsed * 12) * 0.12 : 0);
      uniforms.uEarTwitchR.value = earWaveR * 0.22 + (happyTimer > 0 ? -Math.sin(elapsed * 12) * 0.12 : 0);

      // 计算头部旋转四元数同步给 3D 五官
      euler.set(curPitch, curYaw, curRoll, 'YXZ');
      headQuat.setFromEuler(euler);
      faceRig.update(elapsed, mouseNDC, happyTimer > 0, isTalking, curiousTimer > 0, headQuat);

      // Squash & Stretch 物理弹性跳跃曲线：蓄力下蹲 -> 腾空舒展 -> 落地缓冲回弹
      let jumpY = 0;
      let scaleY = 1.0;
      let scaleXZ = 1.0;
      if (jumpProgress > 0) {
        const phase = 1.0 - jumpProgress;
        if (phase < 0.16) {
          const s = Math.sin((phase / 0.16) * Math.PI);
          jumpY = -0.020 * s;
          scaleY = 1.0 - 0.11 * s;
          scaleXZ = 1.0 + 0.065 * s;
        } else if (phase < 0.78) {
          const arc = Math.sin(((phase - 0.16) / 0.62) * Math.PI);
          jumpY = arc * 0.27;
          scaleY = 1.0 + 0.085 * arc;
          scaleXZ = 1.0 - 0.042 * arc;
        } else {
          const s = Math.sin(((phase - 0.78) / 0.22) * Math.PI);
          jumpY = 0;
          scaleY = 1.0 - 0.095 * s;
          scaleXZ = 1.0 + 0.055 * s;
        }
      }

      root.position.y = jumpY;
      root.scale.set(
        targetWorldHeight * scaleXZ,
        targetWorldHeight * scaleY,
        targetWorldHeight * scaleXZ
      );

      // 接触阴影始终紧贴地毯表面并随跳跃高度柔和缩放淡出
      const heightRatio = THREE.MathUtils.clamp(Math.max(0, jumpY) / 0.27, 0, 1);
      const shadowScale = 1.0 - heightRatio * 0.36;
      contactShadow.position.y = (0.004 * targetWorldHeight - jumpY) / (targetWorldHeight * scaleY);
      contactShadow.scale.set(shadowScale / scaleXZ, shadowScale / scaleXZ, 1);
      shadowMat.opacity = 0.65 * (1.0 - heightRatio * 0.60);
    }
  };
}

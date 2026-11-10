import * as THREE from 'three';
import {
  CatProfile,
  CatFaceTuning,
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
 * 并提取合并后的顶点/法线缓冲用于精确面部采样与表面植绒
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

  const meshList: THREE.Mesh[] = [];
  const posChunks: Float32Array[] = [];
  const normChunks: Float32Array[] = [];
  let totalVerts = 0;

  modelScene.traverse((obj: any) => {
    if (obj.isMesh && obj.geometry) {
      const geom: THREE.BufferGeometry = obj.geometry.clone();
      geom.applyMatrix4(obj.matrixWorld);

      // 变换到归一化模型空间：x/z 居中，y 从 0 到 1
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

        const vnx = normAttr.getX(i);
        const vny = normAttr.getY(i);
        const vnz = normAttr.getZ(i);
        nArr[i * 3] = vnx;
        nArr[i * 3 + 1] = vny;
        nArr[i * 3 + 2] = vnz;
      }

      posAttr.needsUpdate = true;
      geom.computeBoundingBox();
      geom.computeBoundingSphere();

      const cleanMesh = new THREE.Mesh(geom);
      cleanMesh.castShadow = true;
      // 关键：关闭自身接收阴影，杜绝毛发凸起在猫脸上投下脏黑斑
      cleanMesh.receiveShadow = false;
      meshList.push(cleanMesh);

      posChunks.push(pArr);
      normChunks.push(nArr);
      totalVerts += posAttr.count;
    }
  });

  const positions = new Float32Array(totalVerts * 3);
  const normals = new Float32Array(totalVerts * 3);
  let offset = 0;
  for (let c = 0; c < posChunks.length; c++) {
    positions.set(posChunks[c], offset);
    normals.set(normChunks[c], offset);
    offset += posChunks[c].length;
  }

  return { meshList, positions, normals };
}

/**
 * 创建炭黑丝绒 + 银白逆光耳尖/尾尖 + 顶点骨骼律动着色器材质
 */
function createCatFurMaterial(
  profile: CatProfile,
  uniforms: CatAnimUniforms
): THREE.MeshStandardMaterial {
  const mat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#101216'),
    roughness: 0.76,
    metalness: 0.04
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
    shader.uniforms.uWhisker = {
      value: profile.whisker
        ? new THREE.Vector4(
            profile.whisker[0],
            profile.whisker[1],
            profile.whisker[2],
            profile.whisker[3]
          )
        : new THREE.Vector4(0, 99, 0, 0)
    };

    // 注入顶点着色器：传递原始模型空间坐标/法线，并施加锁定脚掌的呼吸、转头、歪头、动耳与摇尾动画
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

      varying vec3 vModelPos;
      varying vec3 vModelNormal;

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
      ` +
      shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>
        vModelPos = position;
        vModelNormal = normal;

        // 1) 脚掌锁死权重（y < 0.12 完全抓地不滑步）
        float groundLock = smoothstep(0.08, 0.20, position.y);

        // 2) 胸腔自然呼吸起伏
        float breathMask = smoothstep(0.12, 0.25, position.y) * (1.0 - smoothstep(0.42, 0.54, position.y));
        vec3 toChest = position - uBodyCenter;
        transformed += normalize(vec3(toChest.x, 0.15, toChest.z + 0.05)) * (uBreath * 0.012 * breathMask * groundLock);

        // 3) 头部转头、俯仰与好奇歪头（仅对脖子以上且非后背尾巴区域生效）
        float headWeight = smoothstep(uHeadRange.x, uHeadRange.y, position.y) * smoothstep(uHeadZMin - 0.06, uHeadZMin + 0.06, position.z);
        if (headWeight > 0.001) {
          mat3 headRot = rotY(uHeadYaw * headWeight) * rotX(uHeadPitch * headWeight) * rotZ(uHeadRoll * headWeight);
          transformed = uHeadPivot + headRot * (transformed - uHeadPivot);
          objectNormal = headRot * objectNormal;
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

        // 5) 尾巴轻柔摇摆
        vec3 tailVec = uTailTip - uTailBase;
        float tailLen = max(length(tailVec), 0.001);
        vec3 tailDir = tailVec / tailLen;
        float tailProj = dot(position - uTailBase, tailDir);
        vec3 tailClosest = uTailBase + clamp(tailProj, 0.0, tailLen) * tailDir;
        float tailDist = length(position - tailClosest);
        float tailMask = smoothstep(0.0, tailLen, tailProj) * (1.0 - smoothstep(0.09, 0.17, tailDist));
        if (tailMask > 0.001) {
          float wag = sin(uTime * 3.2 - tailProj * 8.0) * 0.045 * tailMask;
          transformed.x += wag;
          transformed.y += abs(wag) * 0.25;
        }
        `
      );

    // 注入片元着色器：复刻参考图中的「炭黑丝绒 + 耳廓外沿银白炸毛 + 银白尾尖 + 哑光肉垫 + 摄影棚级 Fresnel 逆光银边」
    shader.fragmentShader =
      `
      uniform float uRimPower;
      uniform float uRimStrength;
      uniform float uWhiteTipStrength;
      uniform vec3 uEarTipL;
      uniform vec3 uEarTipR;
      uniform float uEarSize;
      uniform vec3 uTailTip;
      uniform float uTailWhiteRadius;
      uniform float uPawHeight;
      uniform vec4 uWhisker;

      varying vec3 vModelPos;
      varying vec3 vModelNormal;

      // 3D 程序化高频绒毛噪波
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
      // 计算猫咪全身自然梳理毛流切线场（从鼻梁向头顶、脸颊向两侧、脊背向尾端顺毛生长）
      vec3 computeCombTangent(vec3 p, vec3 n) {
        vec3 rawFlow = vec3(p.x * 0.48, -0.86, -0.32);
        if (p.y > 0.56) {
          // 头部与脸颊：由鼻心向额头与双颊放射梳理
          rawFlow = normalize(vec3(p.x * 1.15, 0.52, -0.45));
        }
        vec3 proj = rawFlow - n * dot(rawFlow, n);
        float len = length(proj);
        return len > 1e-4 ? (proj / len) : normalize(vec3(1.0, 0.0, 0.0));
      }
      // 顺着毛流方向拉伸的各向异性毛丝纹理（模拟成绺的细密猫毛）
      float furStrandField(vec3 p, vec3 n) {
        vec3 t = computeCombTangent(p, n);
        vec3 b = normalize(cross(n, t));
        float along = dot(p, t);
        float across = dot(p, b);
        float radial = dot(p, n);
        vec3 clumpPos = vec3(across * 95.0, along * 24.0, radial * 65.0);
        vec3 finePos = vec3(across * 240.0, along * 48.0, radial * 140.0);
        return furNoise(clumpPos) * 0.58 + furNoise(finePos) * 0.42;
      }
      ` +
      shader.fragmentShader.replace(
        '#include <color_fragment>',
        `
        #include <color_fragment>

        vec3 mPos = vModelPos;
        vec3 mNorm = normalize(vModelNormal);

        // 1) 各向异性毛流纤维 + 多层绒毛团簇明暗纹理（消除塑胶感，呈现真实顺毛拉丝）
        float fStrand = furStrandField(mPos, mNorm);
        float fClump = furNoise(mPos * 52.0);
        float fNoise = fStrand * 0.72 + fClump * 0.28;
        vec3 charcoalRoot = vec3(0.022, 0.024, 0.030);
        vec3 charcoalTip = vec3(0.098, 0.106, 0.128);
        vec3 charcoalBase = mix(charcoalRoot, charcoalTip, smoothstep(0.18, 0.88, fNoise));

        // 2) 耳廓外缘与耳尖银白色长毛 + 耳窝暖粉微透（SSS 次表面散射近似）
        float distEarL = length(mPos - uEarTipL);
        float distEarR = length(mPos - uEarTipR);
        float distEar = min(distEarL, distEarR);
        float earZone = 1.0 - smoothstep(0.02, uEarSize * 1.18, distEar);
        float outerRimMask = smoothstep(0.72, 0.18, mNorm.z) * smoothstep(0.76, 0.96, mPos.y);
        float earTipPeak = 1.0 - smoothstep(0.0, uEarSize * 0.54, distEar);
        float earWhiteMask = clamp((earZone * outerRimMask * 1.28 + earTipPeak * 0.88) * (0.68 + 0.58 * fStrand), 0.0, 1.0);
        // 内耳薄处暖粉次表面透射感
        float innerEarSSS = earZone * smoothstep(0.32, 0.85, mNorm.z) * (1.0 - earTipPeak * 0.7);
        charcoalBase = mix(charcoalBase, vec3(0.19, 0.095, 0.115), innerEarSSS * 0.42);

        // 3) 尾巴尖银白色毛簇
        float distTailTip = length(mPos - uTailTip);
        float tailWhiteMask = (1.0 - smoothstep(0.02, uTailWhiteRadius, distTailTip)) * (0.68 + 0.55 * fStrand);

        // 4) 站立形态两侧胡须银白高亮
        float whiskerMask = 0.0;
        if (abs(mPos.x - uWhisker.x) > uWhisker.y && mPos.y > uWhisker.z && mPos.y < uWhisker.w) {
          whiskerMask = smoothstep(uWhisker.y, uWhisker.y + 0.025, abs(mPos.x - uWhisker.x));
        }

        // 5) 底部圆润深棕小爪子肉垫质感
        float pawMask = (1.0 - smoothstep(0.02, uPawHeight, mPos.y)) * smoothstep(-0.1, 0.35, mNorm.z);
        vec3 pawColor = vec3(0.11, 0.082, 0.068);
        diffuseColor.rgb = mix(charcoalBase, pawColor, pawMask * 0.75);

        // 合成银白毛尖（耳缘 + 尾尖 + 胡须）
        float whiteFurFactor = clamp(max(max(earWhiteMask, tailWhiteMask), whiskerMask) * uWhiteTipStrength, 0.0, 1.0);
        vec3 silverFurColor = vec3(0.93, 0.96, 1.0) * (0.80 + 0.28 * fStrand);
        diffuseColor.rgb = mix(diffuseColor.rgb, silverFurColor, whiteFurFactor);
        `
      ).replace(
        '#include <normal_fragment_maps>',
        `
        #include <normal_fragment_maps>
        // ① 法线毛丝微扰（Normal Micro-Perturbation）：沿毛流法线切平面求导，让每一缕猫毛受光时呈现凹凸体积感
        {
          vec3 mPosN = vModelPos;
          vec3 mNormN = normalize(vModelNormal);
          vec3 combT = computeCombTangent(mPosN, mNormN);
          vec3 combB = normalize(cross(mNormN, combT));
          float s0 = furStrandField(mPosN, mNormN);
          float sAcross = furStrandField(mPosN + combB * 0.0028, mNormN) - s0;
          float sAlong = furStrandField(mPosN + combT * 0.0065, mNormN) - s0;
          vec3 modelPerturb = combB * (sAcross * 0.34) + combT * (sAlong * 0.12);
          vec3 viewPerturb = normalize(normalMatrix * (mNormN + modelPerturb));
          float faceKeepSmooth = smoothstep(0.28, 0.42, mPosN.z) * (1.0 - smoothstep(0.50, 0.72, abs(mPosN.x)));
          normal = normalize(mix(viewPerturb, normal, faceKeepSmooth * 0.65));
        }
        `
      ).replace(
        '#include <opaque_fragment>',
        `
        // ① Kajiya-Kay 各向异性丝绸高光带 + ④ 毛丝截断式 Fresnel 逆光银边 + 耳廓背光暖透
        vec3 viewDir = normalize(vViewPosition);
        float ndotv = clamp(dot(normalize(normal), viewDir), 0.0, 1.0);

        // Kajiya-Kay 各向异性天鹅绒高光（模拟顺毛梳理的黑曜石丝缎光泽）
        vec3 combTangentModel = computeCombTangent(vModelPos, normalize(vModelNormal));
        vec3 combTangentView = normalize(normalMatrix * combTangentModel);
        vec3 keyLightDir = normalize(vec3(0.32, 0.82, 0.58));
        vec3 halfVec = normalize(viewDir + keyLightDir);
        float tdoth = clamp(dot(combTangentView, halfVec), -1.0, 1.0);
        float sinTH = sqrt(max(0.0, 1.0 - tdoth * tdoth));
        float strandTex = furStrandField(vModelPos, normalize(vModelNormal));
        float kajiyaSpec = pow(sinTH, 34.0) * (0.35 + 0.85 * strandTex) * smoothstep(0.05, 0.75, ndotv);
        vec3 velvetSheen = mix(vec3(0.38, 0.45, 0.62), vec3(0.75, 0.82, 0.96), strandTex) * kajiyaSpec * 0.16;

        // 截断式毛丝逆光轮廓（让边缘不是死板塑料亮圈，而是根根分明的绒毛逆光）
        float fresnel = pow(1.0 - ndotv, uRimPower);
        float furTipHighlight = smoothstep(0.28, 0.86, strandTex);
        float rimClump = 0.65 + 0.55 * furNoise(vModelPos * 75.0);
        vec3 rimGlow = vec3(0.90, 0.95, 1.0) * fresnel * uRimStrength * (0.42 + 0.78 * furTipHighlight) * rimClump;

        // 耳廓薄处逆光暖粉微透（SSS）
        float dEarMin = min(length(vModelPos - uEarTipL), length(vModelPos - uEarTipR));
        float earBacklight = (1.0 - smoothstep(0.0, uEarSize * 1.1, dEarMin)) * pow(1.0 - ndotv, 1.8);
        vec3 earWarmGlow = vec3(0.62, 0.25, 0.29) * earBacklight * 0.16;

        outgoingLight += velvetSheen + rimGlow + earWarmGlow;

        #include <opaque_fragment>
        `
      );
  };

  return mat;
}

/**
 * 在猫咪耳廓、脸颊腮毛、胸前绒簇、身体外沿与尾巴表面生成 3段微弯锥化软毛叶 (InstancedMesh)
 * 配备毛根 AO 阴影渐变、逆光毛尖透光高光、以及微风随动摆动
 */
function buildSurfaceFurTufts(
  positions: Float32Array,
  normals: Float32Array,
  profile: CatProfile,
  uniforms: CatAnimUniforms
): THREE.InstancedMesh {
  const maxTufts = 3800;
  // 3 段式微弯锥化软毛叶（替代原本僵硬的单段四棱锥）
  const tuftGeo = new THREE.ConeGeometry(0.0044, 0.030, 5, 3, true);
  tuftGeo.translate(0, 0.015, 0);
  tuftGeo.rotateX(Math.PI * 0.5);

  // 对几何顶点注入毛根->毛尖归一化高度属性 aFurCoord (0~1)，并施加自然弧度微弯
  const posAttr = tuftGeo.attributes.position as THREE.BufferAttribute;
  const furCoords = new Float32Array(posAttr.count);
  for (let i = 0; i < posAttr.count; i++) {
    const z = posAttr.getZ(i);
    const t = THREE.MathUtils.clamp(z / 0.030, 0, 1);
    furCoords[i] = t;
    // 抛物线自然微弯 + 中段饱满度微调，避免几何硬刺感
    const droop = -0.0046 * t * t;
    const widthTaper = 1.0 - 0.15 * t * t;
    posAttr.setX(i, posAttr.getX(i) * widthTaper);
    posAttr.setY(i, posAttr.getY(i) * widthTaper + droop);
  }
  posAttr.needsUpdate = true;
  tuftGeo.setAttribute('aFurCoord', new THREE.BufferAttribute(furCoords, 1));
  tuftGeo.computeVertexNormals();

  const tuftMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.56,
    metalness: 0.04,
    side: THREE.DoubleSide
  });

  // 毛簇同步变形 + 软毛风摆 + 根部 AO 与毛尖逆光透光
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
            float wag = sin(uTime * 3.2 - tailProj * 8.0) * 0.045 * tailMask;
            deformedAnchor.x += wag;
            deformedAnchor.y += abs(wag) * 0.25;
          }

          // 软毛尖端随呼吸与微风产生柔和的二阶弹性摆动
          vec3 localBlade = instRot * transformed;
          float breezePhase = dot(tuftAnchor, vec3(19.0, 27.0, 15.0));
          float tipFlex = aFurCoord * aFurCoord;
          localBlade.x += sin(uTime * 2.8 + breezePhase) * 0.0018 * tipFlex;
          localBlade.y += cos(uTime * 2.3 + breezePhase * 0.7) * 0.0015 * tipFlex;

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
        // 毛根环境光遮蔽 (Root AO) -> 毛尖清透渐变，彻底消除硬刺塑料感
        float rootAO = mix(0.30, 1.22, smoothstep(0.0, 0.88, vFurCoord));
        gl_FragColor.rgb *= rootAO;

        // 毛尖逆光透射银边高光
        vec3 viewDir = normalize(vTuftViewPos);
        vec3 nrm = normalize(vTuftViewNormal);
        float tipFresnel = pow(1.0 - abs(dot(nrm, viewDir)), 1.85);
        float tipGlow = smoothstep(0.35, 1.0, vFurCoord) * (0.35 + 0.65 * tipFresnel);
        gl_FragColor.rgb += vec3(0.45, 0.52, 0.64) * tipGlow * 0.26 * uRimStrength;
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
  const step = Math.max(1, Math.floor(vertCount / (maxTufts * 2.1)));

  for (let i = 0; i < vertCount && placed < maxTufts; i += step) {
    pos.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
    norm.set(normals[i * 3], normals[i * 3 + 1], normals[i * 3 + 2]).normalize();

    // 跳过脚底和正脸五官中心区（避免毛刺遮挡像素眼与品字嘴）
    if (pos.y < profile.pawHeight) continue;
    const dxFace = Math.abs(pos.x - profile.face.centerX);
    const dyFace = Math.abs(pos.y - (profile.face.eyeY + profile.face.mouthY) * 0.5);
    if (pos.z > 0.24 && dxFace < 0.16 && dyFace < 0.14) continue;

    // 细分采样区域：耳廓聪明毛、尾尖白毛、脸颊蓬松腮毛、胸前领口绒簇、外轮廓与稀疏银尖针毛
    const dEar = Math.min(pos.distanceTo(profile.earTipL), pos.distanceTo(profile.earTipR));
    const dTail = pos.distanceTo(profile.tailTip);
    const isEarRim = dEar < profile.earSize * 1.18 && norm.z < 0.65;
    const isTailTip = dTail < profile.tailWhiteRadius * 1.05;
    const isCheekRuff =
      pos.y > profile.headRange[0] - 0.02 &&
      pos.y < profile.face.eyeY + 0.05 &&
      Math.abs(pos.x - profile.face.centerX) > 0.14 &&
      pos.z > profile.headPivot.z - 0.08;
    const isChestTuft =
      pos.y > 0.24 &&
      pos.y < profile.headRange[0] + 0.04 &&
      pos.z > profile.bodyCenter.z + 0.08 &&
      Math.abs(pos.x - profile.bodyCenter.x) < 0.14;
    const isSilhouette = Math.abs(norm.z) < 0.64;
    // 确定性哈希挑选约 18% 的表面点作为稀疏突破轮廓的「长护毛 / 银尖针毛」
    const hash = Math.abs(Math.sin(i * 12.9898 + pos.x * 78.233 + pos.y * 37.719) * 43758.5453) % 1;
    const isGuardHair = hash < 0.18 && norm.y > -0.35;

    if (!isEarRim && !isTailTip && !isCheekRuff && !isChestTuft && !isSilhouette && !isGuardHair) {
      continue;
    }

    dummy.position.copy(pos);

    // 计算与表面 Shader 一致的梳毛流向，让实体毛簇顺着毛流自然披散
    if (isEarRim) {
      combDir.set(pos.x * 0.35, 0.85, 0.1).normalize();
    } else if (isCheekRuff) {
      combDir.set(Math.sign(pos.x - profile.face.centerX) * 0.78, -0.36, 0.22).normalize();
    } else if (isChestTuft) {
      combDir.set(pos.x * 0.25, -0.72, 0.55).normalize();
    } else {
      combDir.set(norm.x * 0.35, -0.52, norm.z * 0.35).normalize();
    }

    target
      .copy(pos)
      .addScaledVector(norm, isEarRim ? 0.82 : isCheekRuff ? 0.78 : 0.72)
      .addScaledVector(combDir, 0.48)
      .addScaledVector(up, isEarRim ? 0.25 : -0.12);
    dummy.lookAt(target);

    const scaleWidth = isCheekRuff || isChestTuft ? 1.24 : isEarRim ? 1.08 : 0.96;
    const scaleLen = isEarRim
      ? 1.32
      : isTailTip
        ? 1.22
        : isCheekRuff
          ? 1.26
          : isChestTuft
            ? 1.18
            : isGuardHair
              ? 1.12
              : 0.88;
    dummy.scale.set(scaleWidth, scaleWidth, scaleLen);
    dummy.updateMatrix();
    instanced.setMatrixAt(placed, dummy.matrix);

    if (isEarRim || isTailTip) {
      color.setRGB(0.93, 0.96, 1.0);
    } else if (isGuardHair && hash < 0.045) {
      // 少量点缀银灰针毛（呼应黑猫逆光银白毛尖质感）
      color.setRGB(0.46, 0.51, 0.60);
    } else if (isCheekRuff || isChestTuft) {
      color.setRGB(0.11, 0.13, 0.16);
    } else {
      color.setRGB(0.08, 0.09, 0.12);
    }
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
 * 在身体网格与离散长毛簇之间补充绵密的短绒底毛过渡，消除网格边缘硬切感
 */
function buildFurShellsGroup(
  meshList: THREE.Mesh[],
  profile: CatProfile,
  uniforms: CatAnimUniforms
): THREE.Group {
  const group = new THREE.Group();
  const shellLayers = [
    { fraction: 0.45, offset: 0.0022 },
    { fraction: 0.88, offset: 0.0044 }
  ];

  for (const layer of shellLayers) {
    const shellMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#090a0e'),
      roughness: 0.58,
      metalness: 0.04,
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
      shader.uniforms.uFaceCenter = {
        value: new THREE.Vector2(
          profile.face.centerX,
          (profile.face.eyeY + profile.face.mouthY) * 0.5
        )
      };

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
            `
          )
          .replace(
            '#include <begin_vertex>',
            `
            #include <begin_vertex>
            vCatOrigPos = position;

            // 正脸五官区域与脚底不向外膨胀绒毛壳，保证像素眼与地面接触干净利落
            float faceMask = smoothstep(0.11, 0.18, length(position.xy - uFaceCenter)) + (1.0 - smoothstep(0.18, 0.25, position.z));
            faceMask = clamp(faceMask, 0.0, 1.0);
            float pawMask = smoothstep(uPawHeight * 0.7, uPawHeight * 1.2, position.y);
            vec3 shellPos = transformed + objectNormal * (uShellOffset * faceMask * pawMask) + vec3(0.0, -0.0009 * uShellFraction * uShellFraction, 0.0);

            float groundLock = smoothstep(0.08, 0.20, position.y);
            float breathMask = smoothstep(0.12, 0.25, position.y) * (1.0 - smoothstep(0.42, 0.54, position.y));
            vec3 toChest = shellPos - uBodyCenter;
            shellPos += normalize(vec3(toChest.x, 0.15, toChest.z + 0.05)) * (uBreath * 0.012 * breathMask * groundLock);

            float headWeight = smoothstep(uHeadRange.x, uHeadRange.y, position.y) * smoothstep(uHeadZMin - 0.06, uHeadZMin + 0.06, position.z);
            if (headWeight > 0.001) {
              mat3 headRot = shellRotY(uHeadYaw * headWeight) * shellRotX(uHeadPitch * headWeight) * shellRotZ(uHeadRoll * headWeight);
              shellPos = uHeadPivot + headRot * (shellPos - uHeadPivot);
              objectNormal = headRot * objectNormal;
            }

            float dEarL = length(position - uEarTipL);
            float wEarL = 1.0 - smoothstep(0.0, uEarSize, dEarL);
            if (wEarL > 0.01) {
              vec3 earPivotL = uEarTipL - vec3(0.0, uEarSize * 0.65, 0.0);
              mat3 rL = shellRotZ(uEarTwitchL * wEarL);
              shellPos = earPivotL + rL * (shellPos - earPivotL);
              objectNormal = rL * objectNormal;
            }

            float dEarR = length(position - uEarTipR);
            float wEarR = 1.0 - smoothstep(0.0, uEarSize, dEarR);
            if (wEarR > 0.01) {
              vec3 earPivotR = uEarTipR - vec3(0.0, uEarSize * 0.65, 0.0);
              mat3 rR = shellRotZ(-uEarTwitchR * wEarR);
              shellPos = earPivotR + rR * (shellPos - earPivotR);
              objectNormal = rR * objectNormal;
            }

            vec3 tailVec = uTailTip - uTailBase;
            float tailLen = max(length(tailVec), 0.001);
            vec3 tailDir = tailVec / tailLen;
            float tailProj = dot(position - uTailBase, tailDir);
            vec3 tailClosest = uTailBase + clamp(tailProj, 0.0, tailLen) * tailDir;
            float tailDist = length(position - tailClosest);
            float tailMask = smoothstep(0.0, tailLen, tailProj) * (1.0 - smoothstep(0.09, 0.17, tailDist));
            if (tailMask > 0.001) {
              float wag = sin(uTime * 3.2 - tailProj * 8.0) * 0.045 * tailMask;
              shellPos.x += wag;
              shellPos.y += abs(wag) * 0.25;
            }

            transformed = shellPos;
            `
          )
          .replace(
            '#include <project_vertex>',
            `
            #include <project_vertex>
            vCatViewPos = -mvPosition.xyz;
            vCatViewNormal = normalize(normalMatrix * objectNormal);
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
        uniform float uWhiteTipStrength;
        uniform vec3 uEarTipL;
        uniform vec3 uEarTipR;
        uniform float uEarSize;
        uniform vec3 uTailTip;
        uniform float uTailWhiteRadius;
        uniform vec3 uHeadPivot;
        uniform vec3 uBodyCenter;
        uniform float uPawHeight;
        uniform vec2 uFaceCenter;

        float shellHash(vec3 p) {
          p = fract(p * 0.3183099 + 0.1);
          p *= 17.0;
          return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
        }

        float shellNoise(vec3 x) {
          vec3 i = floor(x);
          vec3 f = fract(x);
          f = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(mix(shellHash(i + vec3(0,0,0)), shellHash(i + vec3(1,0,0)), f.x),
                mix(shellHash(i + vec3(0,1,0)), shellHash(i + vec3(1,1,0)), f.x), f.y),
            mix(mix(shellHash(i + vec3(0,0,1)), shellHash(i + vec3(1,0,1)), f.x),
                mix(shellHash(i + vec3(0,1,1)), shellHash(i + vec3(1,1,1)), f.x), f.y),
            f.z
          );
        }
        ` +
        shader.fragmentShader.replace(
          '#include <dithering_fragment>',
          `
          // 跳过正脸中心与脚底
          if (vCatOrigPos.y < uPawHeight * 0.85) discard;
          if (vCatOrigPos.z > 0.24 && length(vCatOrigPos.xy - uFaceCenter) < 0.145) discard;

          vec3 nOrig = normalize(vCatOrigNormal);
          vec3 flowDir = normalize(vec3(vCatOrigPos.x, -0.85, vCatOrigPos.z) - uBodyCenter);
          vec3 combTangent = normalize(flowDir - nOrig * dot(flowDir, nOrig) + vec3(0.0, -0.001, 0.0));
          vec3 bitangent = normalize(cross(nOrig, combTangent));
          vec3 anisoCoord = combTangent * dot(vCatOrigPos, combTangent) * 32.0
                          + bitangent * dot(vCatOrigPos, bitangent) * 195.0
                          + nOrig * dot(vCatOrigPos, nOrig) * 85.0;
          float strandDensity = shellNoise(anisoCoord) * 0.65 + shellNoise(anisoCoord * 2.15) * 0.35;

          vec3 viewDir = normalize(vCatViewPos);
          vec3 nrm = normalize(vCatViewNormal);
          float ndotv = abs(dot(nrm, viewDir));
          // 掠射角自动加密绒毛壳可见度，使轮廓边缘呈现饱满天鹅绒厚度
          float grazingBoost = pow(1.0 - ndotv, 1.45) * 0.30;
          float threshold = mix(0.32, 0.60, uShellFraction) - grazingBoost;
          if (strandDensity < threshold) discard;

          float dEar = min(length(vCatOrigPos - uEarTipL), length(vCatOrigPos - uEarTipR));
          float earTipMask = 1.0 - smoothstep(0.0, uEarSize * 0.92, dEar);
          float dTail = length(vCatOrigPos - uTailTip);
          float tailTipMask = 1.0 - smoothstep(0.0, uTailWhiteRadius * 0.85, dTail);
          float whiteMask = clamp(max(earTipMask, tailTipMask) * uWhiteTipStrength, 0.0, 1.0);

          float fresnel = pow(1.0 - ndotv, uRimPower);
          float shellAO = mix(0.68, 1.18, uShellFraction);
          vec3 baseShellCol = mix(vec3(0.04, 0.05, 0.07), vec3(0.92, 0.95, 0.99), whiteMask * 0.88) * shellAO;
          vec3 rimCol = mix(vec3(0.65, 0.72, 0.84), vec3(0.98, 0.99, 1.0), whiteMask);
          gl_FragColor.rgb = baseShellCol + rimCol * fresnel * 0.42 * uRimStrength * uShellFraction;
          #include <dithering_fragment>
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

/**
 * 构建 3D 发光像素五官组件（圆角竖条像素眼 + `^ ^` 开心笑眼 + 品字形 3 方块像素嘴）
 * 挂载于 headPivot 下，随猫咪转头/歪头 100% 同步运动
 */
class CatPixelFaceRig {
  public group = new THREE.Group();
  private leftEyeGroup = new THREE.Group();
  private rightEyeGroup = new THREE.Group();
  private leftNormalBar: THREE.Mesh;
  private rightNormalBar: THREE.Mesh;
  private leftHappyChevron: THREE.Group;
  private rightHappyChevron: THREE.Group;
  private mouthTopBlock: THREE.Mesh;
  private mouthLeftBlock: THREE.Mesh;
  private mouthRightBlock: THREE.Mesh;

  private baseLeftEyePos = new THREE.Vector3();
  private baseRightEyePos = new THREE.Vector3();
  private baseMouthPos = new THREE.Vector3();

  constructor(
    private sampler: SurfaceSampler,
    private headPivot: THREE.Vector3,
    private tuning: CatFaceTuning
  ) {
    this.group.position.copy(headPivot);

    const pixelWhiteMat = new THREE.MeshBasicMaterial({
      color: 0xffffff
    });

    // 正常竖长条像素眼（带极轻微圆角感）
    const eyeGeo = new THREE.BoxGeometry(1, 1, 0.45);
    this.leftNormalBar = new THREE.Mesh(eyeGeo, pixelWhiteMat);
    this.rightNormalBar = new THREE.Mesh(eyeGeo, pixelWhiteMat);

    // 开心 ^ ^ 眯眼笑像素折线
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

    this.leftEyeGroup.add(this.leftNormalBar, this.leftHappyChevron);
    this.rightEyeGroup.add(this.rightNormalBar, this.rightHappyChevron);

    // “品”字形 3 方块像素小嘴（上方居中 1 块 + 下方左右各 1 块，还原参考图）
    const mouthUnitGeo = new THREE.BoxGeometry(1, 0.88, 0.5);
    this.mouthTopBlock = new THREE.Mesh(mouthUnitGeo, pixelWhiteMat);
    this.mouthLeftBlock = new THREE.Mesh(mouthUnitGeo, pixelWhiteMat);
    this.mouthRightBlock = new THREE.Mesh(mouthUnitGeo, pixelWhiteMat);

    this.group.add(
      this.leftEyeGroup,
      this.rightEyeGroup,
      this.mouthTopBlock,
      this.mouthLeftBlock,
      this.mouthRightBlock
    );

    this.applyTuning(tuning);
  }

  public applyTuning(next: Partial<CatFaceTuning>) {
    this.tuning = { ...this.tuning, ...next };
    const { centerX, eyeY, eyeSpacing, eyeW, eyeH, mouthY, mouthSize, surfaceOffset } =
      this.tuning;

    const lx = centerX - eyeSpacing * 0.5;
    const rx = centerX + eyeSpacing * 0.5;

    const sLeft = this.sampler.sample(lx, eyeY, 0.018);
    const sRight = this.sampler.sample(rx, eyeY, 0.018);
    const sMouth = this.sampler.sample(centerX, mouthY, 0.02);

    this.baseLeftEyePos
      .copy(sLeft.point)
      .addScaledVector(sLeft.normal, surfaceOffset)
      .sub(this.headPivot);
    this.baseRightEyePos
      .copy(sRight.point)
      .addScaledVector(sRight.normal, surfaceOffset)
      .sub(this.headPivot);
    this.baseMouthPos
      .copy(sMouth.point)
      .addScaledVector(sMouth.normal, surfaceOffset + 0.004)
      .sub(this.headPivot);

    this.leftEyeGroup.position.copy(this.baseLeftEyePos);
    this.rightEyeGroup.position.copy(this.baseRightEyePos);

    this.leftNormalBar.scale.set(eyeW, eyeH, eyeW);
    this.rightNormalBar.scale.set(eyeW, eyeH, eyeW);
    this.leftHappyChevron.scale.set(eyeH * 0.9, eyeH * 0.9, eyeW);
    this.rightHappyChevron.scale.set(eyeH * 0.9, eyeH * 0.9, eyeW);

    // 品字嘴：上方1块，下方左右各1块
    const ms = mouthSize;
    this.mouthTopBlock.scale.set(ms, ms, ms);
    this.mouthLeftBlock.scale.set(ms, ms, ms);
    this.mouthRightBlock.scale.set(ms, ms, ms);

    this.mouthTopBlock.position.set(
      this.baseMouthPos.x,
      this.baseMouthPos.y + ms * 0.48,
      this.baseMouthPos.z
    );
    this.mouthLeftBlock.position.set(
      this.baseMouthPos.x - ms * 0.85,
      this.baseMouthPos.y - ms * 0.42,
      this.baseMouthPos.z
    );
    this.mouthRightBlock.position.set(
      this.baseMouthPos.x + ms * 0.85,
      this.baseMouthPos.y - ms * 0.42,
      this.baseMouthPos.z
    );
  }

  public update(
    elapsed: number,
    mouseNDC: { x: number; y: number },
    isHappy: boolean,
    isTalking: boolean,
    headQuat: THREE.Quaternion
  ) {
    // 五官组同步头部旋转
    this.group.quaternion.copy(headQuat);

    // 眼神跟随鼠标视差偏移（全屏灵敏跟随）
    const lookX = THREE.MathUtils.clamp(mouseNDC.x, -1.2, 1.2) * 0.022;
    const lookY = THREE.MathUtils.clamp(mouseNDC.y, -1.2, 1.2) * 0.015;
    this.leftEyeGroup.position.set(
      this.baseLeftEyePos.x + lookX,
      this.baseLeftEyePos.y + lookY,
      this.baseLeftEyePos.z
    );
    this.rightEyeGroup.position.set(
      this.baseRightEyePos.x + lookX,
      this.baseRightEyePos.y + lookY,
      this.baseRightEyePos.z
    );

    // 切换开心 ^ ^ 笑眼 vs 正常竖条像素眼（带自然眨眼）
    this.leftHappyChevron.visible = isHappy;
    this.rightHappyChevron.visible = isHappy;
    this.leftNormalBar.visible = !isHappy;
    this.rightNormalBar.visible = !isHappy;

    if (!isHappy) {
      // 每 3.6 秒一次快速自然眨眼
      const blinkCycle = (elapsed * 0.9) % 3.6;
      let blinkScale = 1.0;
      if (blinkCycle < 0.11) {
        blinkScale = Math.max(0.08, 1.0 - (blinkCycle / 0.11) * 0.92);
      } else if (blinkCycle < 0.22) {
        blinkScale = 0.08 + ((blinkCycle - 0.11) / 0.11) * 0.92;
      }
      this.leftNormalBar.scale.y = this.tuning.eyeH * blinkScale;
      this.rightNormalBar.scale.y = this.tuning.eyeH * blinkScale;
    }

    // 说话或开心时，“品”字形像素嘴随语调律动跳动
    const ms = this.tuning.mouthSize;
    if (isTalking || isHappy) {
      const chatter = Math.sin(elapsed * 18.0) * 0.0045;
      const spread = Math.abs(Math.cos(elapsed * 14.0)) * 0.0035;
      this.mouthTopBlock.position.y = this.baseMouthPos.y + ms * 0.48 + Math.abs(chatter);
      this.mouthLeftBlock.position.y = this.baseMouthPos.y - ms * 0.42 - Math.abs(chatter);
      this.mouthRightBlock.position.y = this.baseMouthPos.y - ms * 0.42 - Math.abs(chatter);
      this.mouthLeftBlock.position.x = this.baseMouthPos.x - ms * 0.85 - spread;
      this.mouthRightBlock.position.x = this.baseMouthPos.x + ms * 0.85 + spread;
    } else {
      const idleBreath = Math.sin(elapsed * 2.4) * 0.001;
      this.mouthTopBlock.position.y = this.baseMouthPos.y + ms * 0.48 + idleBreath;
      this.mouthLeftBlock.position.y = this.baseMouthPos.y - ms * 0.42;
      this.mouthRightBlock.position.y = this.baseMouthPos.y - ms * 0.42;
      this.mouthLeftBlock.position.x = this.baseMouthPos.x - ms * 0.85;
      this.mouthRightBlock.position.x = this.baseMouthPos.x + ms * 0.85;
    }
  }

  public getMouthWorldPosition(target: THREE.Vector3): THREE.Vector3 {
    this.mouthTopBlock.getWorldPosition(target);
    return target;
  }
}

/**
 * 将任意 GLB 模型装配为具备「炭黑丝绒 + 银白逆光毛尖 + 3D 绒毛层 + 灵动像素五官 + 骨骼级呼吸歪头摇尾」的完整角色
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
    uWhiteTipStrength: { value: 1.0 }
  };

  const furMaterial = createCatFurMaterial(profile, uniforms);
  const root = new THREE.Group();
  root.scale.setScalar(targetWorldHeight);

  meshList.forEach(m => {
    m.material = furMaterial;
    root.add(m);
  });

  // 双层微偏移体积短绒底毛壳（与身体共享动画 uniforms，消除网格边缘硬切感）
  const furShellsGroup = buildFurShellsGroup(meshList, profile, uniforms);
  root.add(furShellsGroup);

  // 表面 3D 立体毛簇层（与身体共享动画 uniforms，毛随呼吸/转头/摇尾同步变形）
  const furInstancedMesh = buildSurfaceFurTufts(positions, normals, profile, uniforms);
  root.add(furInstancedMesh);

  // 3D 发光像素五官组件
  const sampler = new SurfaceSampler(positions, normals);
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
        jumpProgress = Math.max(0, jumpProgress - dt * 2.2);
      }

      // 鼠标视线跟随 + 好奇歪头插值
      const curiousTiltOffset = curiousTimer > 0 ? Math.sin(elapsed * 3.2) * 0.16 + 0.14 : 0;
      const targetYaw = THREE.MathUtils.clamp(mouseNDC.x * 0.32, -0.35, 0.35);
      const targetPitch = THREE.MathUtils.clamp(-mouseNDC.y * 0.2, -0.22, 0.22);
      const targetRoll =
        THREE.MathUtils.clamp(-mouseNDC.x * 0.14, -0.18, 0.18) +
        Math.sin(elapsed * 1.1) * 0.04 +
        curiousTiltOffset;

      curYaw += (targetYaw - curYaw) * 0.08;
      curPitch += (targetPitch - curPitch) * 0.08;
      curRoll += (targetRoll - curRoll) * 0.08;

      // GLSL mat3 按列构造，旧 rotX/Y/Z 的符号与 Three.js 四元数相反。
      // 所有设备都与 Three.js 的 YXZ 面部四元数保持同向。
      const shaderDirection = -1;
      uniforms.uHeadYaw.value = curYaw * shaderDirection;
      uniforms.uHeadPitch.value = curPitch * shaderDirection;
      uniforms.uHeadRoll.value = curRoll * shaderDirection;

      // 耳朵不定时灵动抽动
      const earWaveL = Math.pow(Math.max(0, Math.sin(elapsed * 1.7 + 0.5)), 14.0);
      const earWaveR = Math.pow(Math.max(0, Math.sin(elapsed * 2.1 + 2.4)), 16.0);
      uniforms.uEarTwitchL.value = earWaveL * 0.22 + (happyTimer > 0 ? Math.sin(elapsed * 12) * 0.12 : 0);
      uniforms.uEarTwitchR.value = earWaveR * 0.22 + (happyTimer > 0 ? -Math.sin(elapsed * 12) * 0.12 : 0);

      // 计算头部旋转四元数同步给 3D 像素五官
      euler.set(curPitch, curYaw, curRoll, 'YXZ');
      headQuat.setFromEuler(euler);
      faceRig.update(elapsed, mouseNDC, happyTimer > 0, isTalking, headQuat);

      // 点击撸猫开心跳跃
      const jumpY = Math.sin(jumpProgress * Math.PI) * 0.26;
      root.position.y = jumpY;
    }
  };
}

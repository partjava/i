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
  triggerHappyJump: () => void;
  setTalking: (talking: boolean) => void;
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
      ` +
      shader.fragmentShader.replace(
        '#include <color_fragment>',
        `
        #include <color_fragment>

        vec3 mPos = vModelPos;
        vec3 mNorm = normalize(vModelNormal);

        // 1) 多层高频绒毛纤维明暗纹理（消除白模塑料感）
        float fNoise = furNoise(mPos * 95.0) * 0.65 + furNoise(mPos * 210.0) * 0.35;
        vec3 charcoalBase = mix(vec3(0.032, 0.034, 0.040), vec3(0.095, 0.100, 0.118), fNoise);

        // 2) 耳廓外缘与耳尖银白色长毛（参考图核心特征：耳蜗内部保持深炭黑，耳尖与外侧边缘呈蓬松银白色）
        float distEarL = length(mPos - uEarTipL);
        float distEarR = length(mPos - uEarTipR);
        float distEar = min(distEarL, distEarR);
        float earZone = 1.0 - smoothstep(0.02, uEarSize * 1.18, distEar);
        // 耳廓外侧/上方/侧面法线权重高，正前方内耳窝(mNorm.z > 0.68)保持深色
        float outerRimMask = smoothstep(0.72, 0.18, mNorm.z) * smoothstep(0.76, 0.96, mPos.y);
        float earTipPeak = 1.0 - smoothstep(0.0, uEarSize * 0.52, distEar);
        float earWhiteMask = clamp((earZone * outerRimMask * 1.25 + earTipPeak * 0.85) * (0.75 + 0.5 * fNoise), 0.0, 1.0);

        // 3) 尾巴尖银白色毛簇
        float distTailTip = length(mPos - uTailTip);
        float tailWhiteMask = (1.0 - smoothstep(0.02, uTailWhiteRadius, distTailTip)) * (0.7 + 0.5 * fNoise);

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
        vec3 silverFurColor = vec3(0.93, 0.95, 0.98) * (0.82 + 0.25 * fNoise);
        diffuseColor.rgb = mix(diffuseColor.rgb, silverFurColor, whiteFurFactor);
        `
      ).replace(
        '#include <opaque_fragment>',
        `
        // 摄影棚级 Fresnel 银白逆光轮廓（让每一簇炸毛边缘都透出银白微光）
        vec3 viewDir = normalize(vViewPosition);
        float ndotv = clamp(dot(normalize(normal), viewDir), 0.0, 1.0);
        float fresnel = pow(1.0 - ndotv, uRimPower);
        float furTipHighlight = smoothstep(0.38, 0.88, furNoise(vModelPos * 140.0));
        vec3 rimGlow = vec3(0.90, 0.94, 1.0) * fresnel * uRimStrength * (0.55 + 0.65 * furTipHighlight);
        outgoingLight += rimGlow;

        #include <opaque_fragment>
        `
      );
  };

  return mat;
}

/**
 * 在猫咪耳廓、脸颊外沿与尾巴表面生成 3D 立体毛簇 (InstancedMesh)
 * 让轮廓边缘具有真正突破网格边界的炸毛绒感
 */
function buildSurfaceFurTufts(
  positions: Float32Array,
  normals: Float32Array,
  profile: CatProfile
): THREE.InstancedMesh {
  const maxTufts = 2200;
  // 纤细微弯的四棱锥毛簇
  const tuftGeo = new THREE.ConeGeometry(0.0048, 0.028, 4);
  tuftGeo.translate(0, 0.012, 0);
  tuftGeo.rotateX(Math.PI * 0.5);

  const tuftMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.65,
    metalness: 0.05
  });

  const instanced = new THREE.InstancedMesh(tuftGeo, tuftMat, maxTufts);
  instanced.castShadow = false;
  instanced.receiveShadow = false;

  const vertCount = positions.length / 3;
  const dummy = new THREE.Object3D();
  const color = new THREE.Color();
  const up = new THREE.Vector3(0, 1, 0);
  const pos = new THREE.Vector3();
  const norm = new THREE.Vector3();
  const target = new THREE.Vector3();

  let placed = 0;
  const step = Math.max(1, Math.floor(vertCount / (maxTufts * 2.4)));

  for (let i = 0; i < vertCount && placed < maxTufts; i += step) {
    pos.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
    norm.set(normals[i * 3], normals[i * 3 + 1], normals[i * 3 + 2]).normalize();

    // 跳过脚底和正脸五官中心区（避免毛刺遮挡像素眼与品字嘴）
    if (pos.y < profile.pawHeight) continue;
    const dxFace = Math.abs(pos.x - profile.face.centerX);
    const dyFace = Math.abs(pos.y - (profile.face.eyeY + profile.face.mouthY) * 0.5);
    if (pos.z > 0.25 && dxFace < 0.16 && dyFace < 0.14) continue;

    // 优先在耳廓边缘、脸颊外侧与尾巴采样
    const dEar = Math.min(pos.distanceTo(profile.earTipL), pos.distanceTo(profile.earTipR));
    const dTail = pos.distanceTo(profile.tailTip);
    const isEarRim = dEar < profile.earSize * 1.15 && norm.z < 0.6;
    const isTailTip = dTail < profile.tailWhiteRadius;
    const isSilhouette = Math.abs(norm.z) < 0.58;

    if (!isEarRim && !isTailTip && !isSilhouette) continue;

    dummy.position.copy(pos);
    // 毛簇顺着表面法线生长并略带重力自然微垂
    target.copy(pos).addScaledVector(norm, 0.85).addScaledVector(up, isEarRim ? 0.35 : -0.22);
    dummy.lookAt(target);
    const scaleLen = isEarRim ? 1.25 : isTailTip ? 1.15 : 0.85;
    dummy.scale.set(1, 1, scaleLen);
    dummy.updateMatrix();
    instanced.setMatrixAt(placed, dummy.matrix);

    if (isEarRim || isTailTip) {
      color.setRGB(0.92, 0.95, 0.99);
    } else {
      color.setRGB(0.08, 0.09, 0.11);
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

    // 眼神跟随鼠标微视差偏移
    const lookX = mouseNDC.x * 0.012;
    const lookY = mouseNDC.y * 0.008;
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

  // 表面 3D 立体毛簇层
  const furInstancedMesh = buildSurfaceFurTufts(positions, normals, profile);
  root.add(furInstancedMesh);

  // 3D 发光像素五官组件
  const sampler = new SurfaceSampler(positions, normals);
  const faceRig = new CatPixelFaceRig(sampler, profile.headPivot, profile.face);
  root.add(faceRig.group);

  // 动画状态变量
  let happyTimer = 0;
  let jumpProgress = 0;
  let isTalking = false;
  let curYaw = 0;
  let curPitch = 0;
  let curRoll = 0;
  const headQuat = new THREE.Quaternion();
  const euler = new THREE.Euler(0, 0, 0, 'YXZ');

  return {
    root,
    profile,
    uniforms,
    furInstancedMesh,
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
      }
    },
    update(dt: number, elapsed: number, mouseNDC: { x: number; y: number }) {
      uniforms.uTime.value = elapsed;
      uniforms.uBreath.value = Math.sin(elapsed * 2.5);

      if (happyTimer > 0) {
        happyTimer = Math.max(0, happyTimer - dt);
      }
      if (jumpProgress > 0) {
        jumpProgress = Math.max(0, jumpProgress - dt * 2.2);
      }

      // 鼠标视线跟随 + 好奇歪头插值
      const targetYaw = THREE.MathUtils.clamp(mouseNDC.x * 0.32, -0.35, 0.35);
      const targetPitch = THREE.MathUtils.clamp(-mouseNDC.y * 0.2, -0.22, 0.22);
      const targetRoll =
        THREE.MathUtils.clamp(-mouseNDC.x * 0.14, -0.18, 0.18) +
        Math.sin(elapsed * 1.1) * 0.04;

      curYaw += (targetYaw - curYaw) * 0.08;
      curPitch += (targetPitch - curPitch) * 0.08;
      curRoll += (targetRoll - curRoll) * 0.08;

      uniforms.uHeadYaw.value = curYaw;
      uniforms.uHeadPitch.value = curPitch;
      uniforms.uHeadRoll.value = curRoll;

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

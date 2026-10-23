import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

export interface WarmStudyRoomController {
  robotAnchor: THREE.Group;
  virtualPropsGroup: THREE.Group;
  update: (time: number) => void;
}

/**
 * 构建「PartJava · 温暖书房」原版 3D 场景（零位置改动）
 * + 环绕中央 3D 模型的 9 件可隐藏虚拟科技配饰 (编号 2, 3, 4, 8, 9, 10, 11, 12, 13)
 */
export function buildSpaceCapsuleRoom(scene: THREE.Scene): WarmStudyRoomController {
  scene.background = new THREE.Color('#2c2723');
  scene.fog = new THREE.FogExp2('#2c2723', 0.0115);

  // 确定性伪随机数，保证每次加载书籍与植物细节一致且自然
  let seed = 1337;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  // ==========================================
  // 2. 高精度程序化 PBR 纹理生成器 (原版保持不变)
  // ==========================================
  function createWoodPlankTextures() {
    const c = document.createElement('canvas');
    c.width = 1024;
    c.height = 1024;
    const ctx = c.getContext('2d')!;

    const b = document.createElement('canvas');
    b.width = 1024;
    b.height = 1024;
    const bctx = b.getContext('2d')!;

    ctx.fillStyle = '#5c3f2c';
    ctx.fillRect(0, 0, 1024, 1024);
    bctx.fillStyle = '#808080';
    bctx.fillRect(0, 0, 1024, 1024);

    const rows = 8;
    const rowH = 1024 / rows;
    const tones = ['#684833', '#5c3f2b', '#6f4e37', '#553927', '#634430', '#73523a'];

    for (let r = 0; r < rows; r++) {
      const y = r * rowH;
      const cols = 3;
      const colW = 1024 / cols;
      const offset = (r % 2) * (colW * 0.45);

      for (let col = -1; col <= cols; col++) {
        const x = col * colW + offset;
        const base = tones[Math.floor(rand() * tones.length)];
        ctx.fillStyle = base;
        ctx.fillRect(x, y, colW, rowH);

        for (let i = 0; i < 65; i++) {
          const gy = y + rand() * rowH;
          const gh = 1 + rand() * 3.5;
          ctx.fillStyle = rand() > 0.5 ? 'rgba(35, 20, 10, 0.08)' : 'rgba(220, 175, 130, 0.05)';
          ctx.fillRect(x, gy, colW, gh);
          bctx.fillStyle = rand() > 0.5 ? 'rgba(100,100,100,0.12)' : 'rgba(155,155,155,0.12)';
          bctx.fillRect(x, gy, colW, gh);
        }

        ctx.fillStyle = '#2a1b12';
        ctx.fillRect(x, y, colW, 2.5);
        ctx.fillRect(x, y, 2.5, rowH);
        bctx.fillStyle = '#151515';
        bctx.fillRect(x, y, colW, 3);
        bctx.fillRect(x, y, 3, rowH);
      }
    }

    const map = new THREE.CanvasTexture(c);
    map.colorSpace = THREE.SRGBColorSpace;
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.repeat.set(3.4, 2.8);
    map.anisotropy = 8;

    const bump = new THREE.CanvasTexture(b);
    bump.wrapS = bump.wrapT = THREE.RepeatWrapping;
    bump.repeat.set(3.4, 2.8);

    return { map, bump };
  }

  function createFineWoodTexture(baseHex: string, grainDarkHex: string, grainLightHex: string, repeatX = 1, repeatY = 1) {
    const c = document.createElement('canvas');
    c.width = 512;
    c.height = 512;
    const ctx = c.getContext('2d')!;
    ctx.fillStyle = baseHex;
    ctx.fillRect(0, 0, 512, 512);

    for (let i = 0; i < 260; i++) {
      const y = rand() * 512;
      const h = 1 + rand() * 4;
      ctx.fillStyle = i % 2 === 0 ? grainDarkHex : grainLightHex;
      ctx.globalAlpha = 0.04 + rand() * 0.06;
      ctx.fillRect(0, y, 512, h);
    }
    ctx.globalAlpha = 1;

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(repeatX, repeatY);
    tex.anisotropy = 4;
    return tex;
  }

  function createPlasterWallTexture() {
    const c = document.createElement('canvas');
    c.width = 512;
    c.height = 512;
    const ctx = c.getContext('2d')!;
    ctx.fillStyle = '#d7cab6';
    ctx.fillRect(0, 0, 512, 512);

    for (let i = 0; i < 4500; i++) {
      const x = rand() * 512;
      const y = rand() * 512;
      const r = 1 + rand() * 3;
      ctx.fillStyle = rand() > 0.5 ? 'rgba(255,250,242,0.035)' : 'rgba(90,75,60,0.035)';
      ctx.fillRect(x, y, r, r);
    }
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4, 2);
    return tex;
  }

  function createWovenRugTexture() {
    const c = document.createElement('canvas');
    c.width = 1024;
    c.height = 1024;
    const ctx = c.getContext('2d')!;

    ctx.fillStyle = '#cfc2ad';
    ctx.fillRect(0, 0, 1024, 1024);

    for (let y = 0; y < 1024; y += 4) {
      ctx.fillStyle = y % 8 === 0 ? 'rgba(105, 90, 72, 0.08)' : 'rgba(250, 244, 232, 0.08)';
      ctx.fillRect(0, y, 1024, 2);
    }
    for (let x = 0; x < 1024; x += 4) {
      ctx.fillStyle = x % 8 === 0 ? 'rgba(95, 82, 66, 0.07)' : 'rgba(255, 250, 240, 0.06)';
      ctx.fillRect(x, 0, 2, 1024);
    }

    ctx.strokeStyle = 'rgba(128, 108, 86, 0.32)';
    ctx.lineWidth = 18;
    ctx.strokeRect(54, 54, 916, 916);

    ctx.strokeStyle = 'rgba(155, 134, 108, 0.22)';
    ctx.lineWidth = 4;
    ctx.strokeRect(86, 86, 852, 852);

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    return tex;
  }

  // ==========================================
  // 3. 材质库定义 (原版保持不变)
  // ==========================================
  const floorTex = createWoodPlankTextures();
  const walnutTex = createFineWoodTexture('#6b4832', '#2d1a0e', '#9c7152', 1, 1);
  const walnutDarkTex = createFineWoodTexture('#462f21', '#1c1008', '#6e4d37', 1, 1);
  const oakTex = createFineWoodTexture('#a6835c', '#5e4429', '#cfa97e', 1, 1);
  const wallTex = createPlasterWallTexture();
  const rugTex = createWovenRugTexture();

  const matFloor = new THREE.MeshStandardMaterial({
    map: floorTex.map,
    bumpMap: floorTex.bump,
    bumpScale: 0.008,
    roughness: 0.56,
    metalness: 0.04
  });

  const matWalnut = new THREE.MeshStandardMaterial({
    map: walnutTex,
    bumpMap: walnutTex,
    bumpScale: 0.003,
    roughness: 0.52,
    metalness: 0.04
  });

  const matWalnutDeep = new THREE.MeshStandardMaterial({
    map: walnutDarkTex,
    bumpMap: walnutDarkTex,
    bumpScale: 0.003,
    roughness: 0.58,
    metalness: 0.05
  });

  const matOak = new THREE.MeshStandardMaterial({
    map: oakTex,
    bumpMap: oakTex,
    bumpScale: 0.003,
    roughness: 0.64,
    metalness: 0.02
  });

  const matWallBack = new THREE.MeshStandardMaterial({
    map: wallTex,
    bumpMap: wallTex,
    bumpScale: 0.004,
    color: '#dfd3c0',
    roughness: 0.94
  });

  const matWallSide = new THREE.MeshStandardMaterial({
    map: wallTex,
    bumpMap: wallTex,
    bumpScale: 0.004,
    color: '#cbbba6',
    roughness: 0.95
  });

  const M = (color: string, roughness = 0.8, metalness = 0) =>
    new THREE.MeshStandardMaterial({ color, roughness, metalness });

  const matMatteBlack = M('#1e2226', 0.45, 0.18);
  const matSpaceGray = M('#6e7275', 0.35, 0.72);
  const matBrushedSilver = M('#adb2b5', 0.28, 0.82);
  const matBrass = M('#b8935c', 0.34, 0.76);
  const matCeramicCream = M('#f0e7d8', 0.32, 0.04);
  const matTerracotta = M('#b57c5e', 0.78, 0.02);
  const matStonePot = M('#9c9284', 0.85, 0.02);
  const matPaper = M('#ebe1cf', 0.92, 0);
  const matDeskFelt = M('#323639', 0.94, 0.02);
  const matLeatherChair = M('#5e4332', 0.52, 0.06);
  const matLinen = M('#d6c8b2', 0.92, 0);
  const matLeafDark = M('#3b5e3e', 0.65, 0.02);
  const matLeafMid = M('#4f7750', 0.62, 0.02);

  function box(w: number, h: number, d: number, x: number, y: number, z: number, material: THREE.Material, parent: THREE.Object3D = scene, cast = true, receive = true) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
    m.position.set(x, y, z);
    m.castShadow = cast;
    m.receiveShadow = receive;
    parent.add(m);
    return m;
  }

  function rbox(w: number, h: number, d: number, r: number, x: number, y: number, z: number, material: THREE.Material, parent: THREE.Object3D = scene, cast = true, receive = true) {
    const m = new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 4, r), material);
    m.position.set(x, y, z);
    m.castShadow = cast;
    m.receiveShadow = receive;
    parent.add(m);
    return m;
  }

  function cyl(r1: number, r2: number, h: number, x: number, y: number, z: number, material: THREE.Material, parent: THREE.Object3D = scene, segs = 28) {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, h, segs), material);
    m.position.set(x, y, z);
    m.castShadow = true;
    m.receiveShadow = true;
    parent.add(m);
    return m;
  }

  // ==========================================
  // 4. 建筑空间外壳 (原版位置完全不变)
  // ==========================================
  box(18.4, 0.24, 14.0, 0, -0.12, -0.5, matFloor, scene, false, true);

  box(18.4, 0.24, 14.0, 0, 7.32, -0.5, M('#d4c7b4', 0.95), scene, false, true);
  for (const bx of [-6.0, -2.0, 2.0, 6.0]) {
    box(0.22, 0.28, 13.6, bx, 7.06, -0.5, matWalnutDeep, scene, true, true);
  }

  box(3.8, 7.2, 0.28, -7.3, 3.6, -6.5, matWallBack, scene, true, true);
  box(10.5, 7.2, 0.28, 3.95, 3.6, -6.5, matWallBack, scene, true, true);
  box(4.1, 2.35, 0.28, -3.35, 1.175, -6.5, matWallBack, scene, true, true);
  box(4.1, 1.45, 0.28, -3.35, 6.475, -6.5, matWallBack, scene, true, true);

  box(0.28, 7.2, 14.0, -8.8, 3.6, -0.5, matWallSide, scene, true, true);
  box(0.28, 7.2, 14.0, 8.8, 3.6, -0.5, matWallSide, scene, true, true);

  box(17.6, 0.16, 0.05, 0, 0.08, -6.34, matOak, scene, true, true);
  box(0.05, 0.16, 13.6, -8.64, 0.08, -0.5, matOak, scene, true, true);
  box(0.05, 0.16, 13.6, 8.64, 0.08, -0.5, matOak, scene, true, true);

  const slatGroup = new THREE.Group();
  scene.add(slatGroup);
  box(3.4, 4.5, 0.03, 6.2, 3.65, -6.35, matWalnutDeep, slatGroup);
  for (let sx = 4.58; sx <= 7.82; sx += 0.12) {
    box(0.055, 4.46, 0.055, sx, 3.65, -6.32, matOak, slatGroup);
  }
  box(3.46, 0.07, 0.08, 6.2, 5.9, -6.32, matWalnut, slatGroup);
  box(3.46, 0.07, 0.08, 6.2, 1.4, -6.32, matWalnut, slatGroup);

  // ==========================================
  // 5. 建筑深凹木窗与窗外静谧远山林景 (原版位置完全不变)
  // ==========================================
  function createScenicViewTexture() {
    const c = document.createElement('canvas');
    c.width = 1400;
    c.height = 1100;
    const g = c.getContext('2d')!;

    const sky = g.createLinearGradient(0, 0, 0, 740);
    sky.addColorStop(0.0, '#8ba9bc');
    sky.addColorStop(0.38, '#bfd0d4');
    sky.addColorStop(0.72, '#e8DFC9');
    sky.addColorStop(1.0, '#f3e5c8');
    g.fillStyle = sky;
    g.fillRect(0, 0, 1400, 1100);

    const sun = g.createRadialGradient(340, 260, 20, 340, 260, 560);
    sun.addColorStop(0, 'rgba(255, 248, 225, 0.85)');
    sun.addColorStop(0.45, 'rgba(255, 236, 195, 0.28)');
    sun.addColorStop(1, 'rgba(255, 236, 195, 0)');
    g.fillStyle = sun;
    g.fillRect(0, 0, 1400, 1100);

    g.fillStyle = 'rgba(255, 250, 240, 0.42)';
    for (let i = 0; i < 6; i++) {
      g.beginPath();
      g.ellipse(220 + i * 210, 210 + (i % 2) * 45, 160, 28, 0, 0, Math.PI * 2);
      g.fill();
    }

    const hillColors = ['#9cb0b3', '#7f9995', '#617d73', '#496354'];
    const hillBaseY = [590, 680, 775, 870];
    for (let l = 0; l < 4; l++) {
      g.fillStyle = hillColors[l];
      g.beginPath();
      g.moveTo(0, 1100);
      for (let x = 0; x <= 1400; x += 12) {
        const y =
          hillBaseY[l] +
          Math.sin(x * 0.0035 + l * 1.4) * 58 +
          Math.cos(x * 0.009 - l * 0.8) * 26 +
          Math.sin(x * 0.022 + l) * 10;
        g.lineTo(x, y);
      }
      g.lineTo(1400, 1100);
      g.closePath();
      g.fill();

      const mist = g.createLinearGradient(0, hillBaseY[l] - 20, 0, hillBaseY[l] + 110);
      mist.addColorStop(0, 'rgba(238, 232, 218, 0.0)');
      mist.addColorStop(0.5, 'rgba(238, 232, 218, 0.22)');
      mist.addColorStop(1, 'rgba(238, 232, 218, 0.0)');
      g.fillStyle = mist;
      g.fillRect(0, hillBaseY[l] - 20, 1400, 130);
    }

    const treePalette = ['#3f5846', '#334a3a', '#4f6850', '#2b3e30'];
    for (let i = 0; i < 68; i++) {
      const tx = (i / 68) * 1440 - 20;
      const ty = 845 + Math.sin(i * 1.7) * 45 + (i % 3) * 22;
      const tr = 36 + (i % 5) * 14;
      g.fillStyle = treePalette[i % treePalette.length];
      g.beginPath();
      g.arc(tx, ty, tr, 0, Math.PI * 2);
      g.arc(tx + tr * 0.5, ty + 10, tr * 0.8, 0, Math.PI * 2);
      g.arc(tx - tr * 0.45, ty + 12, tr * 0.75, 0, Math.PI * 2);
      g.fill();
    }

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  const winX = -3.35, winY = 4.05, winW = 4.1, winH = 3.4;
  const outsideMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(4.9, 4.1),
    new THREE.MeshBasicMaterial({ map: createScenicViewTexture() })
  );
  outsideMesh.position.set(winX, winY, -7.05);
  scene.add(outsideMesh);

  box(winW + 0.24, 0.12, 0.42, winX, winY + winH / 2 + 0.02, -6.48, matWalnutDeep);
  box(winW + 0.36, 0.14, 0.48, winX, winY - winH / 2 - 0.03, -6.38, matOak);
  box(0.12, winH + 0.1, 0.42, winX - winW / 2 - 0.02, winY, -6.48, matWalnutDeep);
  box(0.12, winH + 0.1, 0.42, winX + winW / 2 + 0.02, winY, -6.48, matWalnutDeep);

  for (const mx of [winX - 1.32, winX, winX + 1.32]) {
    box(0.075, winH, 0.09, mx, winY, -6.45, matWalnutDeep);
  }
  for (const my of [winY - 0.65, winY + 0.75]) {
    box(winW, 0.075, 0.09, winX, my, -6.45, matWalnutDeep);
  }

  const sillY = 2.39;
  cyl(0.13, 0.095, 0.22, -4.55, sillY + 0.11, -6.28, matTerracotta);
  cyl(0.115, 0.115, 0.02, -4.55, sillY + 0.21, -6.28, M('#3d2c20', 0.95));
  for (let i = 0; i < 8; i++) {
    const ang = (i / 8) * Math.PI * 2;
    const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.11, 12, 8), i % 2 ? matLeafMid : matLeafDark);
    leaf.scale.set(0.55, 1.35, 0.35);
    leaf.position.set(-4.55 + Math.cos(ang) * 0.09, sillY + 0.31 + (i % 3) * 0.04, -6.28 + Math.sin(ang) * 0.08);
    leaf.rotation.z = -Math.cos(ang) * 0.45;
    leaf.rotation.x = Math.sin(ang) * 0.35;
    leaf.castShadow = true;
    scene.add(leaf);
  }
  rbox(0.38, 0.055, 0.26, 0.01, -2.15, sillY + 0.028, -6.26, M('#7d5c45', 0.85));
  rbox(0.34, 0.048, 0.24, 0.01, -2.16, sillY + 0.08, -6.26, M('#9e886c', 0.85));

  // ==========================================
  // 6. 多层次自然与室内灯光系统 (原版完全不变)
  // ==========================================
  const hemiLight = new THREE.HemisphereLight(0xeef4ff, 0x70513b, 1.55);
  scene.add(hemiLight);

  const sunLight = new THREE.DirectionalLight(0xffe5c2, 2.85);
  sunLight.position.set(-5.8, 7.6, -9.8);
  sunLight.target.position.set(0.8, 0.5, -1.2);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.set(2048, 2048);
  sunLight.shadow.camera.near = 1;
  sunLight.shadow.camera.far = 25;
  sunLight.shadow.camera.left = -10.5;
  sunLight.shadow.camera.right = 10.5;
  sunLight.shadow.camera.top = 9.5;
  sunLight.shadow.camera.bottom = -9.5;
  sunLight.shadow.bias = -0.00035;
  sunLight.shadow.normalBias = 0.02;
  scene.add(sunLight, sunLight.target);

  const windowBounce = new THREE.DirectionalLight(0xd9e8f5, 0.95);
  windowBounce.position.set(-3.2, 4.2, -5.5);
  windowBounce.target.position.set(1.5, 1.2, 0);
  scene.add(windowBounce, windowBounce.target);

  const roomFill = new THREE.DirectionalLight(0xf7e3c8, 0.62);
  roomFill.position.set(2.5, 5.2, 8.5);
  scene.add(roomFill);

  const shelfLampLight = new THREE.PointLight(0xffb86c, 16, 6.5, 1.8);
  shelfLampLight.position.set(-6.35, 2.82, -5.58);
  shelfLampLight.castShadow = true;
  shelfLampLight.shadow.bias = -0.0005;
  scene.add(shelfLampLight);

  const readingWarmLight = new THREE.PointLight(0xffc98b, 11, 6.0, 1.9);
  readingWarmLight.position.set(-5.8, 2.6, -2.4);
  scene.add(readingWarmLight);

  const deskSpot = new THREE.SpotLight(0xffd59e, 32, 7.5, Math.PI / 2.6, 0.78, 1.7);
  deskSpot.position.set(6.92, 2.38, -4.62);
  deskSpot.target.position.set(5.35, 1.3, -4.25);
  deskSpot.castShadow = true;
  deskSpot.shadow.bias = -0.0004;
  scene.add(deskSpot, deskSpot.target);

  const monitorGlow = new THREE.PointLight(0x9ec5e8, 2.8, 3.2, 2.0);
  monitorGlow.position.set(5.2, 1.95, -4.35);
  scene.add(monitorGlow);

  // ==========================================
  // 7. 左侧温暖书房区 (原版位置完全不变)
  // ==========================================
  const bookcase = new THREE.Group();
  const bcX = -7.05, bcZ = -5.98, bcW = 2.28, bcH = 4.68, bcD = 0.72;
  scene.add(bookcase);

  box(bcW, 0.14, bcD - 0.04, bcX, 0.07, bcZ - 0.01, matWalnutDeep, bookcase);
  box(bcW - 0.08, bcH - 0.14, 0.04, bcX, bcH / 2 + 0.04, bcZ - bcD / 2 + 0.02, matWalnutDeep, bookcase);
  box(0.08, bcH, bcD, bcX - bcW / 2 + 0.04, bcH / 2, bcZ, matWalnut, bookcase);
  box(0.08, bcH, bcD, bcX + bcW / 2 - 0.04, bcH / 2, bcZ, matWalnut, bookcase);
  box(bcW + 0.08, 0.09, bcD + 0.06, bcX, bcH + 0.045, bcZ + 0.02, matWalnut, bookcase);

  const shelfHeights = [0.16, 1.06, 1.96, 2.86, 3.76, 4.62];
  for (const sy of shelfHeights) {
    box(bcW - 0.12, 0.055, bcD - 0.04, bcX, sy, bcZ + 0.01, matOak, bookcase);
  }
  rbox(1.02, 0.83, 0.04, 0.01, bcX - 0.52, 0.605, bcZ + bcD / 2 - 0.03, matWalnut, bookcase);
  rbox(1.02, 0.83, 0.04, 0.01, bcX + 0.52, 0.605, bcZ + bcD / 2 - 0.03, matWalnut, bookcase);
  cyl(0.018, 0.018, 0.04, bcX - 0.08, 0.65, bcZ + bcD / 2, matBrass, bookcase).rotation.x = Math.PI / 2;
  cyl(0.018, 0.018, 0.04, bcX + 0.08, 0.65, bcZ + bcD / 2, matBrass, bookcase).rotation.x = Math.PI / 2;

  const bookPalette = [
    '#8d5b44', '#4e6766', '#a8845e', '#6d5849', '#b89e7d',
    '#586954', '#874c42', '#3f515c', '#c8b496', '#746757'
  ];
  function addDetailedBook(x: number, shelfTopY: number, z: number, w: number, h: number, d: number, colorHex: string, tiltZ = 0) {
    const bookGrp = new THREE.Group();
    bookGrp.position.set(x, shelfTopY + h / 2, z);
    bookGrp.rotation.z = tiltZ;
    bookcase.add(bookGrp);

    const coverMat = M(colorHex, 0.82, 0.02);
    rbox(w, h, d, 0.006, 0, 0, 0, coverMat, bookGrp);
    box(w - 0.012, h - 0.016, d - 0.014, 0, 0, 0.004, matPaper, bookGrp, false, true);
    if (rand() > 0.35) {
      box(w + 0.002, 0.012, 0.02, 0, h * 0.28, d / 2 - 0.012, matBrass, bookGrp, false, false);
    }
  }

  {
    const topY = 1.088;
    let curX = bcX - 0.98;
    while (curX < bcX + 0.25) {
      const bw = 0.055 + rand() * 0.055;
      const bh = 0.42 + rand() * 0.24;
      const bd = 0.36 + rand() * 0.08;
      const col = bookPalette[Math.floor(rand() * bookPalette.length)];
      addDetailedBook(curX + bw / 2, topY, bcZ + 0.06, bw, bh, bd, col);
      curX += bw + 0.006;
    }
    addDetailedBook(curX + 0.09, topY, bcZ + 0.06, 0.065, 0.52, 0.38, '#874c42', 0.22);
    let stackY = topY;
    for (let s = 0; s < 3; s++) {
      const sh = 0.058;
      const sw = 0.42 - s * 0.03;
      rbox(sw, sh, 0.32, 0.008, bcX + 0.72, stackY + sh / 2, bcZ + 0.08, M(bookPalette[(s + 2) % bookPalette.length], 0.85), bookcase);
      stackY += sh;
    }
  }

  {
    const topY = 1.988;
    let curX = bcX - 0.98;
    while (curX < bcX + 0.05) {
      const bw = 0.05 + rand() * 0.055;
      const bh = 0.38 + rand() * 0.25;
      const bd = 0.34 + rand() * 0.08;
      const col = bookPalette[Math.floor(rand() * bookPalette.length)];
      addDetailedBook(curX + bw / 2, topY, bcZ + 0.06, bw, bh, bd, col);
      curX += bw + 0.006;
    }
    const lampX = bcX + 0.65, lampZ = bcZ + 0.08;
    cyl(0.11, 0.14, 0.04, lampX, topY + 0.02, lampZ, matWalnutDeep, bookcase);
    cyl(0.13, 0.11, 0.24, lampX, topY + 0.16, lampZ, matCeramicCream, bookcase);
    cyl(0.02, 0.02, 0.12, lampX, topY + 0.32, lampZ, matBrass, bookcase);
    const shadeMat = new THREE.MeshStandardMaterial({
      color: '#f5e4c8',
      emissive: '#ffae52',
      emissiveIntensity: 0.65,
      roughness: 0.85,
      side: THREE.DoubleSide
    });
    const lampShade = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.23, 0.28, 28, 1, true), shadeMat);
    lampShade.position.set(lampX, topY + 0.46, lampZ);
    bookcase.add(lampShade);
    const bulb = new THREE.Mesh(
      new THREE.SphereGeometry(0.055, 16, 12),
      new THREE.MeshBasicMaterial({ color: '#ffdfac' })
    );
    bulb.position.set(lampX, topY + 0.42, lampZ);
    bookcase.add(bulb);
  }

  {
    const topY = 2.888;
    const potX = bcX - 0.68, potZ = bcZ + 0.1;
    cyl(0.15, 0.11, 0.26, potX, topY + 0.13, potZ, matStonePot, bookcase);
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * Math.PI * 2;
      const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 8), i % 2 ? matLeafMid : matLeafDark);
      leaf.scale.set(0.6, 1.25, 0.45);
      leaf.position.set(potX + Math.cos(a) * 0.11, topY + 0.31 + (i % 3) * 0.04, potZ + Math.sin(a) * 0.1);
      leaf.rotation.z = -Math.cos(a) * 0.5;
      bookcase.add(leaf);
    }
    for (let v = 0; v < 5; v++) {
      const vineLeaf = new THREE.Mesh(new THREE.SphereGeometry(0.075, 8, 6), matLeafMid);
      vineLeaf.scale.set(0.55, 1.15, 0.35);
      vineLeaf.position.set(potX - 0.06 + (v % 2) * 0.08, topY + 0.18 - v * 0.075, potZ + 0.18);
      vineLeaf.rotation.x = 0.4;
      bookcase.add(vineLeaf);
    }

    cyl(0.08, 0.1, 0.03, bcX - 0.12, topY + 0.015, potZ, matWalnutDeep, bookcase);
    cyl(0.015, 0.015, 0.16, bcX - 0.12, topY + 0.1, potZ, matBrass, bookcase);
    const orb = new THREE.Mesh(new THREE.SphereGeometry(0.11, 20, 16), matCeramicCream);
    orb.position.set(bcX - 0.12, topY + 0.22, potZ);
    orb.castShadow = true;
    bookcase.add(orb);

    let curX = bcX + 0.14;
    while (curX < bcX + 0.94) {
      const bw = 0.055 + rand() * 0.05;
      const bh = 0.4 + rand() * 0.22;
      const bd = 0.35 + rand() * 0.07;
      addDetailedBook(curX + bw / 2, topY, bcZ + 0.06, bw, bh, bd, bookPalette[Math.floor(rand() * bookPalette.length)]);
      curX += bw + 0.006;
    }
  }

  {
    const topY = 3.788;
    let curX = bcX - 0.96;
    while (curX < bcX - 0.15) {
      const bw = 0.06 + rand() * 0.05;
      const bh = 0.38 + rand() * 0.2;
      addDetailedBook(curX + bw / 2, topY, bcZ + 0.06, bw, bh, 0.35, bookPalette[Math.floor(rand() * bookPalette.length)]);
      curX += bw + 0.007;
    }
    rbox(0.36, 0.26, 0.36, 0.015, bcX + 0.28, topY + 0.13, bcZ + 0.06, matOak, bookcase);
    rbox(0.36, 0.26, 0.36, 0.015, bcX + 0.68, topY + 0.13, bcZ + 0.06, matWalnut, bookcase);
    box(0.1, 0.025, 0.02, bcX + 0.28, topY + 0.15, bcZ + 0.245, matBrass, bookcase);
    box(0.1, 0.025, 0.02, bcX + 0.68, topY + 0.15, bcZ + 0.245, matBrass, bookcase);
  }

  const benchGroup = new THREE.Group();
  const benchX = -6.05, benchZ = -2.65;
  scene.add(benchGroup);
  rbox(1.96, 0.09, 0.96, 0.02, benchX, 0.515, benchZ, matOak, benchGroup);
  for (const lx of [benchX - 0.84, benchX + 0.84]) {
    for (const lz of [benchZ - 0.38, benchZ + 0.38]) {
      cyl(0.048, 0.036, 0.47, lx, 0.235, lz, matWalnutDeep, benchGroup, 16);
    }
    box(0.05, 0.05, 0.76, lx, 0.18, benchZ, matWalnutDeep, benchGroup);
  }
  rbox(1.84, 0.11, 0.86, 0.04, benchX, 0.615, benchZ, matLinen, benchGroup);
  const pillowColors = ['#b58263', '#d6c7b0', '#798c7d'];
  for (let i = 0; i < 3; i++) {
    const p = rbox(0.42, 0.32, 0.14, 0.045, benchX - 0.52 + i * 0.52, 0.81, benchZ - 0.24, M(pillowColors[i], 0.9), benchGroup);
    p.rotation.x = -0.22;
    p.rotation.z = (i - 1) * 0.06;
  }

  const floorPlantX = -4.65, floorPlantZ = -4.95;
  cyl(0.24, 0.21, 0.42, floorPlantX, 0.21, floorPlantZ, matCeramicCream);
  cyl(0.21, 0.21, 0.03, floorPlantX, 0.42, floorPlantZ, M('#3a2a1d', 0.95));
  cyl(0.022, 0.032, 0.72, floorPlantX, 0.75, floorPlantZ, matWalnutDeep);
  for (let i = 0; i < 11; i++) {
    const ang = (i / 11) * Math.PI * 2 + 0.3;
    const tier = Math.floor(i / 4);
    const radius = 0.22 + (i % 3) * 0.08;
    const ly = 0.75 + tier * 0.22 + (i % 2) * 0.07;
    const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.18, 14, 10), i % 2 === 0 ? matLeafDark : matLeafMid);
    leaf.scale.set(0.75, 0.14, 1.35);
    leaf.position.set(floorPlantX + Math.cos(ang) * radius, ly, floorPlantZ + Math.sin(ang) * radius);
    leaf.rotation.y = -ang + Math.PI / 2;
    leaf.rotation.x = 0.35 + (i % 3) * 0.1;
    leaf.castShadow = true;
    leaf.receiveShadow = true;
    scene.add(leaf);
  }

  const wallShelfX = 0.85, wallShelfY = 4.45;
  box(1.45, 0.07, 0.34, wallShelfX, wallShelfY, -6.19, matOak);
  for (const bx of [wallShelfX - 0.52, wallShelfX + 0.52]) {
    box(0.035, 0.26, 0.03, bx, wallShelfY - 0.15, -6.34, matMatteBlack);
    box(0.035, 0.03, 0.3, bx, wallShelfY - 0.04, -6.2, matMatteBlack);
  }
  box(0.46, 0.58, 0.035, wallShelfX - 0.28, wallShelfY + 0.32, -6.22, matWalnutDeep);
  box(0.38, 0.50, 0.04, wallShelfX - 0.28, wallShelfY + 0.32, -6.218, matPaper);
  cyl(0.09, 0.07, 0.22, wallShelfX + 0.35, wallShelfY + 0.145, -6.16, matTerracotta);
  cyl(0.06, 0.08, 0.15, wallShelfX + 0.54, wallShelfY + 0.11, -6.18, matCeramicCream);

  // ==========================================
  // 8. 右侧写实程序员工作台 (原版位置与物品完全不变)
  // ==========================================
  const deskGroup = new THREE.Group();
  scene.add(deskGroup);

  const deskX = 5.35, deskZ = -4.45, deskW = 4.65, deskD = 1.72, deskTopY = 1.28, slabH = 0.09;

  rbox(deskW, slabH, deskD, 0.02, deskX, deskTopY - slabH / 2, deskZ, matWalnut, deskGroup);

  const legH = deskTopY - slabH;
  for (const lx of [deskX - 2.08, deskX + 2.08]) {
    for (const lz of [deskZ - 0.68, deskZ + 0.68]) {
      box(0.11, legH, 0.11, lx, legH / 2, lz, matWalnutDeep, deskGroup);
      cyl(0.06, 0.06, 0.04, lx, 0.02, lz, matBrass, deskGroup, 16);
    }
    box(0.09, 0.09, 1.36, lx, 0.22, deskZ, matWalnutDeep, deskGroup);
    box(0.09, 0.12, 1.36, lx, legH - 0.06, deskZ, matWalnutDeep, deskGroup);
  }
  box(4.16, 0.18, 0.07, deskX, legH - 0.12, deskZ - 0.66, matWalnutDeep, deskGroup);

  const cabX = deskX + 1.52, cabW = 0.92, cabD = 1.32;
  rbox(cabW, legH - 0.02, cabD, 0.015, cabX, (legH - 0.02) / 2, deskZ, matWalnutDeep, deskGroup);
  for (let d = 0; d < 3; d++) {
    const dy = 0.24 + d * 0.34;
    rbox(cabW - 0.08, 0.30, 0.03, 0.01, cabX, dy, deskZ + cabD / 2 + 0.01, matWalnut, deskGroup);
    box(0.22, 0.022, 0.025, cabX, dy + 0.04, deskZ + cabD / 2 + 0.03, matBrass, deskGroup);
  }

  const matY = deskTopY + 0.008;
  rbox(2.75, 0.008, 0.98, 0.003, deskX - 0.15, deskTopY + 0.004, deskZ + 0.22, matDeskFelt, deskGroup);

  function createMainMonitorTexture() {
    const c = document.createElement('canvas');
    c.width = 1280;
    c.height = 720;
    const g = c.getContext('2d')!;

    g.fillStyle = '#14191e';
    g.fillRect(0, 0, 1280, 720);

    g.fillStyle = '#101418';
    g.fillRect(0, 0, 230, 720);
    g.fillStyle = '#1b2228';
    g.fillRect(230, 0, 1050, 44);
    g.fillStyle = '#14191e';
    g.fillRect(230, 0, 240, 44);
    g.fillStyle = '#d4a36a';
    g.fillRect(230, 0, 240, 3);

    ['#e06c75', '#e5c07b', '#98c379'].forEach((col, idx) => {
      g.fillStyle = col;
      g.beginPath();
      g.arc(28 + idx * 22, 22, 6, 0, Math.PI * 2);
      g.fill();
    });

    g.font = '17px Consolas, monospace';
    const files = [
      '▼ partjava-studio',
      '  ▼ src/core',
      '    • RobotStage.ts',
      '    • RoomScene.ts',
      '    • LightingRig.ts',
      '  ▼ assets/models',
      '    • assistant.glb',
      '  • package.json',
      '  • tsconfig.json'
    ];
    files.forEach((f, i) => {
      g.fillStyle = i === 2 ? '#e8dcc8' : '#6c7b88';
      g.fillText(f, 22, 85 + i * 34);
    });

    g.fillStyle = '#e5dbc9';
    g.font = '16px Consolas, monospace';
    g.fillText('RobotStage.ts — PartJava AI Core', 255, 28);

    const codeLines = [
      ['import', ' { Scene, Group, Box3 } ', 'from', " 'three';"],
      ['import', ' { GLTFLoader } ', 'from', " 'three/addons/loaders/GLTFLoader.js';"],
      ['', '', '', ''],
      ['export class', ' AIStageController ', '{', ''],
      ['  private', ' anchor: Group;', '', ''],
      ['', '', '', ''],
      ['  public async', ' mountCharacter(glbUrl: string): Promise<void> {', '', ''],
      ['    const', ' model = ', 'await', ' this.loader.loadAsync(glbUrl);'],
      ['    this.alignToCenterRug(model.scene);', '', '', ''],
      ['    this.anchor.add(model.scene);', '', '', ''],
      ['  }', '', '', ''],
      ['  // Ready for interactive 3D AI companion in center stage', '', '', '']
    ];

    codeLines.forEach((parts, i) => {
      const y = 96 + i * 42;
      g.fillStyle = '#495662';
      g.font = '18px Consolas, monospace';
      g.fillText(String(i + 1).padStart(2, '0'), 256, y);

      let x = 308;
      const colors = i === 11 ? ['#6a8773'] : ['#c678dd', '#e5c07b', '#56b6c2', '#98c379'];
      parts.forEach((txt, pIdx) => {
        g.fillStyle = colors[pIdx % colors.length];
        g.font = '20px Consolas, monospace';
        g.fillText(txt, x, y);
        x += g.measureText(txt).width;
      });
    });

    g.fillStyle = '#1b2228';
    g.fillRect(230, 620, 1050, 100);
    g.fillStyle = '#7ec699';
    g.font = '17px Consolas, monospace';
    g.fillText('✓ [PartJava Vite] Built in 412ms · Center anchor ready at (0.0, 0.03, -1.55)', 256, 668);

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    return tex;
  }

  function createSideMonitorTexture() {
    const c = document.createElement('canvas');
    c.width = 600;
    c.height = 960;
    const g = c.getContext('2d')!;

    g.fillStyle = '#12161a';
    g.fillRect(0, 0, 600, 960);

    g.fillStyle = '#1d242b';
    g.fillRect(28, 32, 544, 240);
    g.fillStyle = '#d4a36a';
    g.font = '20px Consolas, monospace';
    g.fillText('NODE TELEMETRY · AI ENGINE', 54, 76);

    g.strokeStyle = '#68a8ad';
    g.lineWidth = 4;
    g.beginPath();
    for (let x = 54; x <= 540; x += 18) {
      const y = 175 + Math.sin(x * 0.035) * 36 + Math.cos(x * 0.08) * 16;
      if (x === 54) g.moveTo(x, y);
      else g.lineTo(x, y);
    }
    g.stroke();

    g.fillStyle = '#192026';
    g.fillRect(28, 300, 544, 620);
    const logs = [
      '> Scene: Warm Study Room v2',
      '> Lighting: Natural + Warm Lamps',
      '> ShadowMap: 2048px PCFSoft',
      '> Center Stage: Reserved Clean',
      '> GLB Loader: Drag & Drop Active',
      '',
      'Architecture Notes:',
      '• Left: Solid Walnut Bookcase',
      '• Center: Woven Wool Rug Area',
      '• Right: Dual-Screen Dev Desk'
    ];
    logs.forEach((l, idx) => {
      g.fillStyle = idx < 5 ? '#98c379' : '#b8c4ce';
      g.font = '20px Consolas, monospace';
      g.fillText(l, 52, 358 + idx * 50);
    });

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return tex;
  }

  const riserY = deskTopY + 0.11;
  rbox(2.45, 0.028, 0.34, 0.008, deskX - 0.15, riserY - 0.014, deskZ - 0.44, matWalnut, deskGroup);
  box(0.04, 0.09, 0.30, deskX - 1.15, deskTopY + 0.045, deskZ - 0.44, matMatteBlack, deskGroup);
  box(0.04, 0.09, 0.30, deskX + 0.85, deskTopY + 0.045, deskZ - 0.44, matMatteBlack, deskGroup);

  const mainMon = new THREE.Group();
  mainMon.position.set(deskX - 0.02, riserY, deskZ - 0.42);
  mainMon.rotation.y = -0.14;
  deskGroup.add(mainMon);

  rbox(0.46, 0.02, 0.26, 0.006, 0, 0.01, 0.02, matSpaceGray, mainMon);
  rbox(0.075, 0.52, 0.045, 0.008, 0, 0.27, -0.05, matSpaceGray, mainMon);
  box(0.14, 0.12, 0.08, 0, 0.48, -0.01, matMatteBlack, mainMon);
  rbox(1.58, 0.92, 0.045, 0.012, 0, 0.62, 0.03, matMatteBlack, mainMon);
  box(1.58, 0.032, 0.048, 0, 0.175, 0.032, matSpaceGray, mainMon);
  const mainScreenMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1.52, 0.85),
    new THREE.MeshBasicMaterial({ map: createMainMonitorTexture() })
  );
  mainScreenMesh.position.set(0, 0.63, 0.054);
  mainMon.add(mainScreenMesh);
  cyl(0.014, 0.014, 0.82, 0, 1.10, 0.09, matMatteBlack, mainMon).rotation.z = Math.PI / 2;
  box(0.06, 0.04, 0.09, 0, 1.09, 0.05, matSpaceGray, mainMon);

  const sideMon = new THREE.Group();
  sideMon.position.set(deskX - 1.12, riserY, deskZ - 0.34);
  sideMon.rotation.y = 0.26;
  deskGroup.add(sideMon);

  rbox(0.32, 0.018, 0.22, 0.005, 0, 0.009, 0.02, matSpaceGray, sideMon);
  rbox(0.055, 0.48, 0.04, 0.006, 0, 0.25, -0.04, matSpaceGray, sideMon);
  box(0.1, 0.1, 0.07, 0, 0.45, 0, matMatteBlack, sideMon);
  rbox(0.58, 0.94, 0.04, 0.01, 0, 0.56, 0.03, matMatteBlack, sideMon);
  const sideScreenMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(0.53, 0.88),
    new THREE.MeshBasicMaterial({ map: createSideMonitorTexture() })
  );
  sideScreenMesh.position.set(0, 0.56, 0.052);
  sideMon.add(sideScreenMesh);

  const kbGroup = new THREE.Group();
  kbGroup.position.set(deskX - 0.22, matY, deskZ + 0.22);
  kbGroup.rotation.y = -0.06;
  deskGroup.add(kbGroup);

  rbox(0.74, 0.022, 0.14, 0.006, 0, 0.011, 0.21, matWalnut, kbGroup);
  const kbCase = rbox(0.74, 0.038, 0.28, 0.008, 0, 0.02, -0.02, matMatteBlack, kbGroup);
  kbCase.rotation.x = 0.06;

  const keyAlphaMat = M('#dfd9ce', 0.65);
  const keyModMat = M('#4b5258', 0.7);
  const keyEscMat = M('#c46851', 0.65);
  const keyEnterMat = M('#d4a36a', 0.65);

  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 14; c++) {
      if (r === 4 && c >= 4 && c <= 8) {
        if (c === 6) {
          rbox(0.22, 0.02, 0.038, 0.004, (c - 6.5) * 0.048, 0.043 - r * 0.002, -0.11 + r * 0.046, keyEnterMat, kbGroup);
        }
        continue;
      }
      let kMat = keyAlphaMat;
      if (r === 0 && c === 0) kMat = keyEscMat;
      else if (r === 2 && c === 13) kMat = keyEnterMat;
      else if (c === 0 || c === 13 || r === 4) kMat = keyModMat;

      rbox(
        0.039,
        0.02,
        0.039,
        0.004,
        (c - 6.5) * 0.048,
        0.045 - r * 0.002,
        -0.11 + r * 0.046,
        kMat,
        kbGroup
      );
    }
  }
  cyl(0.018, 0.018, 0.025, 6.5 * 0.048, 0.048, -0.11, matBrass, kbGroup, 16);

  const mouseGroup = new THREE.Group();
  mouseGroup.position.set(deskX + 0.48, matY, deskZ + 0.22);
  mouseGroup.rotation.y = -0.12;
  deskGroup.add(mouseGroup);
  const mouseBody = new THREE.Mesh(new THREE.SphereGeometry(0.068, 20, 14), matMatteBlack);
  mouseBody.scale.set(0.88, 0.52, 1.45);
  mouseBody.position.set(0, 0.022, 0);
  mouseBody.castShadow = true;
  mouseGroup.add(mouseBody);
  cyl(0.008, 0.008, 0.022, 0, 0.052, -0.035, matBrushedSilver, mouseGroup, 12).rotation.z = Math.PI / 2;

  const dLamp = new THREE.Group();
  dLamp.position.set(deskX + 1.65, deskTopY, deskZ - 0.36);
  dLamp.rotation.y = 0.42;
  deskGroup.add(dLamp);

  cyl(0.18, 0.20, 0.036, 0, 0.018, 0, matMatteBlack, dLamp);
  cyl(0.035, 0.035, 0.06, 0, 0.05, 0, matBrass, dLamp);
  const lowerArm = cyl(0.018, 0.018, 0.56, 0.08, 0.31, 0, matSpaceGray, dLamp);
  lowerArm.rotation.z = -0.28;
  cyl(0.03, 0.03, 0.05, 0.155, 0.57, 0, matBrass, dLamp).rotation.x = Math.PI / 2;
  const upperArm = cyl(0.016, 0.016, 0.54, -0.06, 0.76, 0, matSpaceGray, dLamp);
  upperArm.rotation.z = 0.88;
  const headPivot = new THREE.Group();
  headPivot.position.set(-0.27, 0.93, 0);
  headPivot.rotation.z = 0.48;
  dLamp.add(headPivot);
  cyl(0.045, 0.045, 0.09, 0, 0.06, 0, matBrass, headPivot);
  const taskShade = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.26, 28, 1, true), matMatteBlack);
  taskShade.position.set(0, -0.05, 0);
  taskShade.castShadow = true;
  headPivot.add(taskShade);
  const innerBulb = new THREE.Mesh(
    new THREE.SphereGeometry(0.055, 16, 12),
    new THREE.MeshBasicMaterial({ color: '#ffe3b3' })
  );
  innerBulb.position.set(0, -0.06, 0);
  headPivot.add(innerBulb);

  const mugX = deskX + 1.12, mugZ = deskZ + 0.34;
  cyl(0.11, 0.11, 0.01, mugX, deskTopY + 0.005, mugZ, matOak, deskGroup);
  cyl(0.082, 0.068, 0.16, mugX, deskTopY + 0.09, mugZ, matCeramicCream, deskGroup);
  cyl(0.074, 0.074, 0.006, mugX, deskTopY + 0.165, mugZ, M('#3b2314', 0.25), deskGroup);
  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.042, 0.011, 10, 20, Math.PI), matCeramicCream);
  handle.position.set(mugX + 0.078, deskTopY + 0.09, mugZ);
  handle.rotation.z = -Math.PI / 2;
  deskGroup.add(handle);

  rbox(0.32, 0.022, 0.42, 0.005, deskX - 1.52, deskTopY + 0.011, deskZ + 0.26, M('#6e4f3a', 0.8), deskGroup);
  cyl(0.008, 0.008, 0.28, deskX - 1.32, deskTopY + 0.012, deskZ + 0.26, matBrass, deskGroup, 12).rotation.x = Math.PI / 2;
  for (const spkX of [deskX - 0.88, deskX + 0.82]) {
    const spk = rbox(0.16, 0.24, 0.18, 0.015, spkX, riserY + 0.12, deskZ - 0.42, matWalnutDeep, deskGroup);
    spk.rotation.y = spkX < deskX ? 0.18 : -0.18;
    cyl(0.045, 0.045, 0.01, 0, -0.03, 0.09, matMatteBlack, spk).rotation.x = Math.PI / 2;
    cyl(0.022, 0.022, 0.01, 0, 0.05, 0.09, matBrass, spk).rotation.x = Math.PI / 2;
  }

  const chairGroup = new THREE.Group();
  chairGroup.position.set(deskX - 0.05, 0, deskZ + 1.18);
  chairGroup.rotation.y = 2.75;
  scene.add(chairGroup);

  cyl(0.04, 0.04, 0.46, 0, 0.28, 0, matMatteBlack, chairGroup);
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    const leg = box(0.045, 0.035, 0.42, Math.sin(a) * 0.2, 0.075, Math.cos(a) * 0.2, matSpaceGray, chairGroup);
    leg.rotation.y = a;
    cyl(0.035, 0.035, 0.03, Math.sin(a) * 0.39, 0.035, Math.cos(a) * 0.39, matMatteBlack, chairGroup, 14).rotation.z = Math.PI / 2;
  }
  rbox(0.68, 0.10, 0.64, 0.04, 0, 0.54, 0, matLeatherChair, chairGroup);
  rbox(0.70, 0.04, 0.65, 0.02, 0, 0.50, 0, matWalnut, chairGroup);
  box(0.12, 0.48, 0.035, 0, 0.76, -0.31, matMatteBlack, chairGroup);
  rbox(0.64, 0.54, 0.08, 0.035, 0, 0.98, -0.26, matLeatherChair, chairGroup);
  rbox(0.66, 0.56, 0.03, 0.02, 0, 0.98, -0.30, matWalnut, chairGroup);
  for (const side of [-0.36, 0.36]) {
    box(0.035, 0.24, 0.035, side, 0.65, -0.05, matMatteBlack, chairGroup);
    rbox(0.075, 0.03, 0.34, 0.01, side, 0.77, -0.02, matWalnut, chairGroup);
  }

  // ==========================================
  // 9. 中央预留 AI 机器人展示空间 (原版地毯完全不变)
  // ==========================================
  const centerZ = -1.55;
  const rugGroup = new THREE.Group();
  rugGroup.position.set(0, 0, centerZ);
  scene.add(rugGroup);

  const rugMat = new THREE.MeshStandardMaterial({
    map: rugTex,
    bumpMap: rugTex,
    bumpScale: 0.005,
    roughness: 0.92,
    metalness: 0.0
  });
  rbox(3.55, 0.016, 2.55, 0.007, 0, 0.008, 0, rugMat, rugGroup, false, true);

  const fringeMat = M('#dfd3be', 0.95);
  for (let fz = -1.18; fz <= 1.18; fz += 0.055) {
    box(0.09, 0.007, 0.024, -1.81, 0.004, fz, fringeMat, rugGroup, false, true);
    box(0.09, 0.007, 0.024, 1.81, 0.004, fz, fringeMat, rugGroup, false, true);
  }

  const robotAnchor = new THREE.Group();
  robotAnchor.position.set(0, 0.016, centerZ);
  scene.add(robotAnchor);

  // ==========================================
  // 10. 环绕中央 3D 模型的 9 件精致虚拟配饰 (编号 2, 3, 4, 8, 9, 10, 11, 12, 13)
  // 可通过 virtualPropsGroup.visible 一键隐藏/开启，绝不改动原场景任何物体
  // ==========================================
  const virtualPropsGroup = new THREE.Group();
  scene.add(virtualPropsGroup);

  const matCyberDark = new THREE.MeshStandardMaterial({
    color: '#161b26',
    roughness: 0.28,
    metalness: 0.78
  });
  const matCyberTrim = new THREE.MeshStandardMaterial({
    color: '#253042',
    roughness: 0.22,
    metalness: 0.88
  });
  const matNeonCyan = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
  const matNeonPurple = new THREE.MeshBasicMaterial({ color: 0xa855f7 });
  const matNeonPink = new THREE.MeshBasicMaterial({ color: 0xf43f5e });
  const matNeonGreen = new THREE.MeshBasicMaterial({ color: 0x34d399 });

  // ------------------------------------------
  // 物品 ②：全息发光底座 (正中央猫咪脚下, y = 0.02, z = centerZ)
  // ------------------------------------------
  const pedestalGroup = new THREE.Group();
  pedestalGroup.position.set(0, 0.02, centerZ);
  virtualPropsGroup.add(pedestalGroup);

  // 超薄金属暗环衬底
  const basePlate = new THREE.Mesh(
    new THREE.RingGeometry(0.72, 1.08, 64),
    new THREE.MeshStandardMaterial({
      color: '#111827',
      roughness: 0.3,
      metalness: 0.85,
      transparent: true,
      opacity: 0.75,
      side: THREE.DoubleSide
    })
  );
  basePlate.rotation.x = -Math.PI / 2;
  pedestalGroup.add(basePlate);

  // 外圈青色发光全息环
  const holoRingOuter = new THREE.Mesh(
    new THREE.TorusGeometry(1.02, 0.018, 16, 96),
    matNeonCyan
  );
  holoRingOuter.rotation.x = Math.PI / 2;
  holoRingOuter.position.y = 0.012;
  pedestalGroup.add(holoRingOuter);

  // 内圈紫色发光全息环
  const holoRingInner = new THREE.Mesh(
    new THREE.TorusGeometry(0.82, 0.015, 16, 96),
    matNeonPurple
  );
  holoRingInner.rotation.x = Math.PI / 2;
  holoRingInner.position.y = 0.015;
  pedestalGroup.add(holoRingInner);

  // ------------------------------------------
  // 物品 ③：AI 算力机柜书架 (环绕在猫咪左身旁，微向中心旋转 24°)
  // ------------------------------------------
  const rackGroup = new THREE.Group();
  rackGroup.position.set(-1.95, 0, centerZ - 0.15);
  rackGroup.rotation.y = 0.42;
  virtualPropsGroup.add(rackGroup);

  // 圆角金属机柜主体与发光边框
  rbox(0.86, 1.72, 0.38, 0.025, 0, 0.86, 0, matCyberDark, rackGroup);
  rbox(0.90, 0.04, 0.42, 0.01, 0, 0.02, 0, matCyberTrim, rackGroup);
  rbox(0.90, 0.04, 0.42, 0.01, 0, 1.71, 0, matCyberTrim, rackGroup);
  // 左右竖向霓虹边条
  box(0.014, 1.64, 0.014, -0.42, 0.86, 0.19, matNeonPurple, rackGroup, false, false);
  box(0.014, 1.64, 0.014, 0.42, 0.86, 0.19, matNeonCyan, rackGroup, false, false);

  // 上层书架隔板 + 6 本圆角立体彩色编程书
  box(0.78, 0.025, 0.34, 0, 1.05, 0.02, matCyberTrim, rackGroup);
  const cyberBookColors = ['#ef4444', '#38bdf8', '#f59e0b', '#10b981', '#a855f7', '#fb923c'];
  for (let i = 0; i < 6; i++) {
    const bx = -0.28 + i * 0.11;
    const bh = 0.32 + (i % 3) * 0.04;
    const bookMesh = rbox(
      0.072,
      bh,
      0.24,
      0.008,
      bx,
      1.065 + bh / 2,
      0.03,
      new THREE.MeshStandardMaterial({
        color: cyberBookColors[i],
        roughness: 0.35,
        metalness: 0.25,
        emissive: cyberBookColors[i],
        emissiveIntensity: 0.18
      }),
      rackGroup
    );
    // 书页白边细节
    box(0.056, bh - 0.02, 0.22, bx, 1.065 + bh / 2, 0.04, matPaper, rackGroup, false, false);
  }

  // 下层 4 组 AI 算力服务器刀片 + 呼吸 LED 灯条
  const serverLeds: THREE.Mesh[] = [];
  for (let s = 0; s < 4; s++) {
    const sy = 0.24 + s * 0.20;
    rbox(0.74, 0.13, 0.32, 0.012, 0, sy, 0.04, matCyberTrim, rackGroup);
    const ledBar = new THREE.Mesh(
      new THREE.BoxGeometry(0.62, 0.022, 0.012),
      s % 2 === 0 ? matNeonGreen : matNeonCyan
    );
    ledBar.position.set(0, sy, 0.205);
    rackGroup.add(ledBar);
    serverLeds.push(ledBar);
  }

  // ------------------------------------------
  // 物品 ④：左后方悬浮全息监控屏 (漂浮在猫咪左肩侧后方)
  // ------------------------------------------
  function createHoloTelemetryTexture() {
    const c = document.createElement('canvas');
    c.width = 640;
    c.height = 400;
    const ctx = c.getContext('2d')!;

    ctx.fillStyle = 'rgba(12, 22, 38, 0.82)';
    ctx.fillRect(0, 0, 640, 400);

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 5;
    ctx.strokeRect(8, 8, 624, 384);

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 22px Consolas, monospace';
    ctx.fillText('PARTJAVA AI ENGINE · TELEMETRY', 28, 44);

    // 实时波形折线图
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 4.5;
    ctx.beginPath();
    const pts = [210, 145, 165, 195, 250, 220, 150, 185, 225, 140];
    pts.forEach((py, idx) => {
      const px = 34 + idx * 42;
      if (idx === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.stroke();

    // 右侧彩色算力柱状图
    const barCols = ['#a855f7', '#38bdf8', '#34d399', '#f59e0b'];
    const barHeights = [90, 135, 175, 150];
    barCols.forEach((col, idx) => {
      ctx.fillStyle = col;
      const bh = barHeights[idx];
      ctx.fillRect(450 + idx * 38, 280 - bh, 26, bh);
    });

    ctx.fillStyle = '#94a3b8';
    ctx.font = '18px Consolas, monospace';
    ctx.fillText('GPU CLUSTER · 99.8% ONLINE', 28, 352);

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  const holoFloatingGroup = new THREE.Group();
  holoFloatingGroup.position.set(-1.18, 1.38, centerZ - 0.55);
  holoFloatingGroup.rotation.y = 0.28;
  virtualPropsGroup.add(holoFloatingGroup);

  const holoFrame = rbox(
    0.86,
    0.54,
    0.02,
    0.01,
    0,
    0,
    -0.012,
    new THREE.MeshStandardMaterial({
      color: '#1e293b',
      transparent: true,
      opacity: 0.55,
      roughness: 0.2,
      metalness: 0.8
    }),
    holoFloatingGroup,
    false,
    false
  );
  const holoScreen = new THREE.Mesh(
    new THREE.PlaneGeometry(0.82, 0.50),
    new THREE.MeshBasicMaterial({
      map: createHoloTelemetryTexture(),
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide
    })
  );
  holoFloatingGroup.add(holoScreen);

  // ------------------------------------------
  // 物品 ⑧：赛博开发办公桌 (环绕在猫咪右身旁，微向中心旋转 -24°)
  // 桌面之上搭载 ⑨ 左联代码屏、⑩ 右联监控屏、⑪ 水冷主机、⑫ 发光键鼠桌垫、⑬ 黄色咖啡杯
  // ------------------------------------------
  const cyberDeskGroup = new THREE.Group();
  cyberDeskGroup.position.set(1.92, 0, centerZ - 0.12);
  cyberDeskGroup.rotation.y = -0.42;
  virtualPropsGroup.add(cyberDeskGroup);

  const cDeskTopY = 0.78;
  const cDeskW = 1.62;
  const cDeskD = 0.74;

  // 圆角碳纤暗夜桌面
  rbox(cDeskW, 0.045, cDeskD, 0.015, 0, cDeskTopY - 0.022, 0, matCyberDark, cyberDeskGroup);

  // 桌面四周青色发光霓虹灯带包边
  box(cDeskW + 0.012, 0.014, 0.014, 0, cDeskTopY - 0.008, cDeskD / 2, matNeonCyan, cyberDeskGroup, false, false);
  box(cDeskW + 0.012, 0.014, 0.014, 0, cDeskTopY - 0.008, -cDeskD / 2, matNeonCyan, cyberDeskGroup, false, false);
  box(0.014, 0.014, cDeskD + 0.012, -cDeskW / 2, cDeskTopY - 0.008, 0, matNeonCyan, cyberDeskGroup, false, false);
  box(0.014, 0.014, cDeskD + 0.012, cDeskW / 2, cDeskTopY - 0.008, 0, matNeonCyan, cyberDeskGroup, false, false);

  // 4 根金属圆角桌腿与横撑（严密落地 y = 0）
  const cLegH = cDeskTopY - 0.045;
  for (const lx of [-cDeskW / 2 + 0.09, cDeskW / 2 - 0.09]) {
    for (const lz of [-cDeskD / 2 + 0.08, cDeskD / 2 - 0.08]) {
      rbox(0.055, cLegH, 0.055, 0.01, lx, cLegH / 2, lz, matCyberTrim, cyberDeskGroup);
    }
    box(0.04, 0.04, cDeskD - 0.16, lx, 0.14, 0, matCyberTrim, cyberDeskGroup);
  }

  // ------------------------------------------
  // 物品 ⑨：左联代码显示器 (显示彩色语法高亮代码行)
  // ------------------------------------------
  function createCyberCodeScreenTexture() {
    const c = document.createElement('canvas');
    c.width = 640;
    c.height = 400;
    const ctx = c.getContext('2d')!;

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 640, 400);

    // 顶部窗口栏与三色圆点
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, 640, 34);
    ['#f43f5e', '#f59e0b', '#10b981'].forEach((col, i) => {
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(22 + i * 20, 17, 6, 0, Math.PI * 2);
      ctx.fill();
    });

    // 彩色代码条块（高对比度还原截图风格）
    const barPalette = ['#38bdf8', '#a855f7', '#f43f5e', '#34d399', '#f59e0b', '#e2e8f0'];
    for (let row = 0; row < 12; row++) {
      const y = 52 + row * 27;
      let x = 24 + (row % 3) * 24;
      const segments = 2 + (row % 3);
      for (let s = 0; s < segments; s++) {
        const w = 55 + ((row * 37 + s * 53) % 110);
        ctx.fillStyle = barPalette[(row + s) % barPalette.length];
        ctx.beginPath();
        ctx.roundRect(x, y, w, 13, 4);
        ctx.fill();
        x += w + 14;
      }
    }

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  const leftMonGroup = new THREE.Group();
  leftMonGroup.position.set(-0.34, cDeskTopY, -0.14);
  leftMonGroup.rotation.y = 0.14;
  cyberDeskGroup.add(leftMonGroup);

  rbox(0.18, 0.016, 0.12, 0.005, 0, 0.008, 0, matCyberTrim, leftMonGroup);
  rbox(0.035, 0.22, 0.025, 0.005, 0, 0.11, -0.02, matCyberTrim, leftMonGroup);
  rbox(0.56, 0.36, 0.026, 0.01, 0, 0.30, 0, matCyberDark, leftMonGroup);
  const leftMonScreen = new THREE.Mesh(
    new THREE.PlaneGeometry(0.52, 0.32),
    new THREE.MeshBasicMaterial({ map: createCyberCodeScreenTexture() })
  );
  leftMonScreen.position.set(0, 0.30, 0.015);
  leftMonGroup.add(leftMonScreen);

  // ------------------------------------------
  // 物品 ⑩：右联算力监控显示器 (显示波形折线与彩色柱状图)
  // ------------------------------------------
  const rightMonGroup = new THREE.Group();
  rightMonGroup.position.set(0.24, cDeskTopY, -0.14);
  rightMonGroup.rotation.y = -0.12;
  cyberDeskGroup.add(rightMonGroup);

  rbox(0.18, 0.016, 0.12, 0.005, 0, 0.008, 0, matCyberTrim, rightMonGroup);
  rbox(0.035, 0.22, 0.025, 0.005, 0, 0.11, -0.02, matCyberTrim, rightMonGroup);
  rbox(0.56, 0.36, 0.026, 0.01, 0, 0.30, 0, matCyberDark, rightMonGroup);
  const rightMonScreen = new THREE.Mesh(
    new THREE.PlaneGeometry(0.52, 0.32),
    new THREE.MeshBasicMaterial({ map: createHoloTelemetryTexture() })
  );
  rightMonScreen.position.set(0, 0.30, 0.015);
  rightMonGroup.add(rightMonScreen);

  // ------------------------------------------
  // 物品 ⑪：水冷电脑主机箱 (桌面右侧，带 3 个青/粉发光风扇环)
  // ------------------------------------------
  const pcTowerGroup = new THREE.Group();
  pcTowerGroup.position.set(0.64, cDeskTopY, -0.02);
  pcTowerGroup.rotation.y = -0.18;
  cyberDeskGroup.add(pcTowerGroup);

  // 海景房蓝青金属机箱外壳
  rbox(
    0.24,
    0.50,
    0.36,
    0.016,
    0,
    0.25,
    0,
    new THREE.MeshStandardMaterial({
      color: '#0e7490',
      roughness: 0.25,
      metalness: 0.65
    }),
    pcTowerGroup
  );
  // 机箱正面深色钢化玻璃面板
  const frontGlass = new THREE.Mesh(
    new THREE.PlaneGeometry(0.21, 0.46),
    new THREE.MeshStandardMaterial({
      color: '#083344',
      roughness: 0.15,
      metalness: 0.8
    })
  );
  frontGlass.position.set(0, 0.25, 0.182);
  pcTowerGroup.add(frontGlass);

  // 3 个发光旋转水冷风扇环（青 - 粉 - 青）
  const pcFans: THREE.Mesh[] = [];
  const fanMats = [matNeonCyan, matNeonPink, matNeonCyan];
  for (let f = 0; f < 3; f++) {
    const fanRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.056, 0.012, 14, 32),
      fanMats[f]
    );
    fanRing.position.set(0, 0.39 - f * 0.14, 0.186);
    pcTowerGroup.add(fanRing);
    pcFans.push(fanRing);
  }

  // ------------------------------------------
  // 物品 ⑫：粉青发光机械键盘 + 鼠标 + 桌垫
  // ------------------------------------------
  // 深海蓝灰桌垫
  rbox(
    0.82,
    0.008,
    0.26,
    0.004,
    -0.05,
    cDeskTopY + 0.004,
    0.16,
    new THREE.MeshStandardMaterial({ color: '#1e3a5f', roughness: 0.8 }),
    cyberDeskGroup
  );
  // 粉色发光机械键盘
  const cyberKb = rbox(
    0.44,
    0.024,
    0.14,
    0.006,
    -0.14,
    cDeskTopY + 0.016,
    0.15,
    new THREE.MeshStandardMaterial({
      color: '#ec4899',
      emissive: '#db2777',
      emissiveIntensity: 0.45,
      roughness: 0.35
    }),
    cyberDeskGroup
  );
  cyberKb.rotation.x = 0.06;

  // 青色发光无线鼠标
  const cyberMouse = new THREE.Mesh(
    new THREE.SphereGeometry(0.038, 16, 12),
    new THREE.MeshStandardMaterial({
      color: '#06b6d4',
      emissive: '#0891b2',
      emissiveIntensity: 0.4,
      roughness: 0.3
    })
  );
  cyberMouse.scale.set(0.85, 0.5, 1.35);
  cyberMouse.position.set(0.22, cDeskTopY + 0.018, 0.16);
  cyberDeskGroup.add(cyberMouse);

  // ------------------------------------------
  // 物品 ⑬：黄色咖啡杯 (桌面左下角，带把手与深色咖啡液面)
  // ------------------------------------------
  const yellowMugGroup = new THREE.Group();
  yellowMugGroup.position.set(-0.62, cDeskTopY, 0.14);
  cyberDeskGroup.add(yellowMugGroup);

  const matYellowMug = new THREE.MeshStandardMaterial({
    color: '#eab308',
    roughness: 0.28,
    metalness: 0.08
  });
  cyl(0.048, 0.042, 0.11, 0, 0.055, 0, matYellowMug, yellowMugGroup);
  cyl(0.043, 0.043, 0.005, 0, 0.108, 0, M('#3b2314', 0.25), yellowMugGroup);
  const yellowHandle = new THREE.Mesh(
    new THREE.TorusGeometry(0.026, 0.007, 10, 20, Math.PI),
    matYellowMug
  );
  yellowHandle.position.set(0.046, 0.055, 0);
  yellowHandle.rotation.z = -Math.PI / 2;
  yellowMugGroup.add(yellowHandle);

  return {
    robotAnchor,
    virtualPropsGroup,
    update(time: number) {
      // ② 脚下全息圆环底座平滑反向旋转
      holoRingOuter.rotation.z = time * 0.45;
      holoRingInner.rotation.z = -time * 0.65;

      // ④ 左后方悬浮全息屏柔和上下呼吸浮动
      holoFloatingGroup.position.y = 1.38 + Math.sin(time * 1.8) * 0.04;

      // ⑪ 水冷主机风扇旋转动画
      pcFans.forEach((fan, idx) => {
        fan.rotation.z = time * (3.2 + idx * 0.5);
      });
    }
  };
}

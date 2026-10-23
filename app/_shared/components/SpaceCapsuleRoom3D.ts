import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

export interface WarmStudyRoomController {
  robotAnchor: THREE.Group;
  virtualPropsGroup: THREE.Group;
  update: (time: number) => void;
}

/**
 * 构建「PartJava · 温暖书房」3D 写实场景 + 虚实结合动态科技配饰
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
  // 2. 高精度程序化 PBR 纹理生成器 (拒绝塑料感)
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

        // 细腻木纹纤维与早晚材明暗变化
        for (let i = 0; i < 65; i++) {
          const gy = y + rand() * rowH;
          const gh = 1 + rand() * 3.5;
          ctx.fillStyle = rand() > 0.5 ? 'rgba(35, 20, 10, 0.08)' : 'rgba(220, 175, 130, 0.05)';
          ctx.fillRect(x, gy, colW, gh);
          bctx.fillStyle = rand() > 0.5 ? 'rgba(100,100,100,0.12)' : 'rgba(155,155,155,0.12)';
          bctx.fillRect(x, gy, colW, gh);
        }

        // 板间微倒角接缝
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

    // 温暖的羊毛亚麻编织底色
    ctx.fillStyle = '#cfc2ad';
    ctx.fillRect(0, 0, 1024, 1024);

    // 细密经纬编织纹理
    for (let y = 0; y < 1024; y += 4) {
      ctx.fillStyle = y % 8 === 0 ? 'rgba(105, 90, 72, 0.08)' : 'rgba(250, 244, 232, 0.08)';
      ctx.fillRect(0, y, 1024, 2);
    }
    for (let x = 0; x < 1024; x += 4) {
      ctx.fillStyle = x % 8 === 0 ? 'rgba(95, 82, 66, 0.07)' : 'rgba(255, 250, 240, 0.06)';
      ctx.fillRect(x, 0, 2, 1024);
    }

    // 极简织物内嵌暗纹边框
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
  // 3. 材质库定义
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

  // 基础几何构建辅助函数
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
  // 4. 建筑空间外壳 (带真实窗洞、踢脚线、护墙板与顶角线)
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
  // 5. 建筑深凹木窗与窗外静谧远山林景 (z = -6.5)
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
  // 6. 多层次自然与室内灯光系统
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
  // 7. 左侧温暖书房区：落地实木书柜、书籍、绿植、暖光灯与阅读长椅
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
  // 8. 右侧写实程序员工作台：胡桃木书桌、双显示器+支架、机械键盘、鼠标、工作灯、咖啡杯
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
      '    • cat-standing.glb',
      '    • cat-crouching.glb',
      '  • package.json'
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
      ['  // Dual-form 3D plush cat companion active in study', '', '', '']
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
    g.fillText('✓ [PartJava AI] Dual GLB Cat Forms Ready · Center anchor (0.0, 0.016, -1.55)', 256, 668);

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
      '> Active Model: 3D Black Cat GLB',
      '> Forms: Standing / Crouching',
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
  // 9. 中央预留 AI 机器人展示空间 (纯自然家居地毯与柔和光影)
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
  // 10. 虚实结合动态科技配饰 (Virtual & Cyber Props)
  // ==========================================
  const virtualPropsGroup = new THREE.Group();
  scene.add(virtualPropsGroup);

  // 配饰 A: 桌面右侧胡桃木+侧透铝合金水冷迷你工作站主机（带3个动态旋转发光风扇）
  const pcGroup = new THREE.Group();
  pcGroup.position.set(deskX + 2.02, deskTopY, deskZ - 0.12);
  pcGroup.rotation.y = -0.28;
  virtualPropsGroup.add(pcGroup);

  rbox(0.32, 0.56, 0.52, 0.016, 0, 0.28, 0, matMatteBlack, pcGroup);
  // 胡桃木前饰板格栅（呼应书房风格）
  rbox(0.28, 0.50, 0.02, 0.006, 0, 0.28, 0.255, matWalnut, pcGroup);
  // 侧透钢化玻璃面板
  const glassPanel = new THREE.Mesh(
    new THREE.PlaneGeometry(0.46, 0.48),
    new THREE.MeshStandardMaterial({
      color: '#9ec5e8',
      transparent: true,
      opacity: 0.22,
      roughness: 0.1,
      metalness: 0.8
    })
  );
  glassPanel.position.set(-0.162, 0.28, 0);
  glassPanel.rotation.y = -Math.PI / 2;
  pcGroup.add(glassPanel);

  const pcFans: THREE.Mesh[] = [];
  const fanColors = [0x38bdf8, 0xf59e0b, 0xa855f7];
  for (let i = 0; i < 3; i++) {
    const fanRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.062, 0.01, 10, 24),
      new THREE.MeshBasicMaterial({ color: fanColors[i] })
    );
    fanRing.position.set(-0.15, 0.43 - i * 0.15, -0.04);
    fanRing.rotation.y = Math.PI / 2;
    pcGroup.add(fanRing);
    pcFans.push(fanRing);
  }

  // 配饰 B: 书桌上方悬浮半透明全息状态小看板 (Floating Hologram Widget)
  const holoCanvas = document.createElement('canvas');
  holoCanvas.width = 512;
  holoCanvas.height = 256;
  const hctx = holoCanvas.getContext('2d')!;
  hctx.fillStyle = 'rgba(16, 24, 36, 0.72)';
  hctx.fillRect(0, 0, 512, 256);
  hctx.strokeStyle = 'rgba(212, 163, 106, 0.85)';
  hctx.lineWidth = 4;
  hctx.strokeRect(8, 8, 496, 240);
  hctx.fillStyle = '#f5d096';
  hctx.font = 'bold 24px Consolas, monospace';
  hctx.fillText('PARTJAVA · AI COMPANION', 28, 48);
  hctx.fillStyle = '#7ec699';
  hctx.font = '19px Consolas, monospace';
  hctx.fillText('● STATUS: ONLINE (DUAL-GLB)', 28, 92);
  hctx.strokeStyle = '#56b6c2';
  hctx.lineWidth = 3.5;
  hctx.beginPath();
  for (let x = 28; x <= 480; x += 14) {
    const y = 175 + Math.sin(x * 0.04) * 32;
    if (x === 28) hctx.moveTo(x, y);
    else hctx.lineTo(x, y);
  }
  hctx.stroke();
  const holoTex = new THREE.CanvasTexture(holoCanvas);
  holoTex.colorSpace = THREE.SRGBColorSpace;

  const holoPanel = new THREE.Mesh(
    new THREE.PlaneGeometry(0.92, 0.46),
    new THREE.MeshBasicMaterial({
      map: holoTex,
      transparent: true,
      opacity: 0.84,
      side: THREE.DoubleSide
    })
  );
  holoPanel.position.set(deskX - 1.12, riserY + 1.24, deskZ - 0.32);
  holoPanel.rotation.y = 0.26;
  virtualPropsGroup.add(holoPanel);

  // 配饰 C: 地毯中央柔和暖金+青蓝双层微光全息环与阳光浮尘粒子
  const stageRingOuter = new THREE.Mesh(
    new THREE.RingGeometry(0.95, 0.985, 64),
    new THREE.MeshBasicMaterial({
      color: 0xd4a36a,
      transparent: true,
      opacity: 0.42,
      side: THREE.DoubleSide
    })
  );
  stageRingOuter.rotation.x = -Math.PI / 2;
  stageRingOuter.position.set(0, 0.022, centerZ);
  virtualPropsGroup.add(stageRingOuter);

  const stageRingInner = new THREE.Mesh(
    new THREE.RingGeometry(0.76, 0.785, 64),
    new THREE.MeshBasicMaterial({
      color: 0x56b6c2,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide
    })
  );
  stageRingInner.rotation.x = -Math.PI / 2;
  stageRingInner.position.set(0, 0.023, centerZ);
  virtualPropsGroup.add(stageRingInner);

  // 阳光丁达尔暖金微粒
  const dustCount = 45;
  const dustPositions = new Float32Array(dustCount * 3);
  for (let i = 0; i < dustCount; i++) {
    dustPositions[i * 3] = (rand() - 0.5) * 9.5;
    dustPositions[i * 3 + 1] = 0.4 + rand() * 4.2;
    dustPositions[i * 3 + 2] = -5.0 + rand() * 5.5;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
  const dustMat = new THREE.PointsMaterial({
    color: 0xffe4b5,
    size: 0.045,
    transparent: true,
    opacity: 0.55
  });
  const dustParticles = new THREE.Points(dustGeo, dustMat);
  virtualPropsGroup.add(dustParticles);

  return {
    robotAnchor,
    virtualPropsGroup,
    update(time: number) {
      // 水冷风扇旋转
      pcFans.forEach((fan, idx) => {
        fan.rotation.z = time * (3.5 + idx * 0.6);
      });
      // 悬浮全息面板轻微呼吸上下浮动
      holoPanel.position.y = riserY + 1.24 + Math.sin(time * 1.8) * 0.035;
      // 中央全息环慢速旋转与呼吸
      stageRingOuter.rotation.z = time * 0.25;
      stageRingInner.rotation.z = -time * 0.38;
      // 阳光微粒缓慢漂浮
      dustParticles.position.y = Math.sin(time * 0.5) * 0.08;
    }
  };
}

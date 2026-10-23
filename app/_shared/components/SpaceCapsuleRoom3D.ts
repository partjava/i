import * as THREE from 'three';

export interface SpaceRoomHandles {
  update: (time: number) => void;
}

function createCodeScreenTexture(mode: 'code' | 'dashboard'): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 320;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Dark IDE background
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, 512, 320);

    // Top window bar
    ctx.fillStyle = '#161f33';
    ctx.fillRect(0, 0, 512, 28);
    ['#f43f5e', '#f59e0b', '#10b981'].forEach((col, i) => {
      ctx.beginPath();
      ctx.arc(18 + i * 16, 14, 5, 0, Math.PI * 2);
      ctx.fillStyle = col;
      ctx.fill();
    });

    if (mode === 'code') {
      // Sidebar
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 28, 76, 292);

      // Colored syntax lines
      const palette = ['#38bdf8', '#a855f7', '#34d399', '#fbbf24', '#f472b6', '#e2e8f0'];
      for (let row = 0; row < 15; row++) {
        const y = 44 + row * 17;
        const indent = (row % 4) * 18;
        let x = 92 + indent;
        const segments = 2 + (row % 3);
        for (let s = 0; s < segments; s++) {
          const w = 36 + ((row * 29 + s * 43) % 85);
          ctx.fillStyle = palette[(row + s) % palette.length];
          ctx.beginPath();
          ctx.roundRect(x, y, w, 9, 4);
          ctx.fill();
          x += w + 10;
        }
      }
    } else {
      // AI Telemetry & 3D Graph Dashboard
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let x = 24; x < 320; x += 12) {
        const y = 130 + Math.sin(x * 0.04) * 45 + Math.cos(x * 0.09) * 20;
        if (x === 24) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Metric bars on the right
      const barColors = ['#10b981', '#38bdf8', '#a855f7', '#f59e0b'];
      for (let i = 0; i < 4; i++) {
        const bh = 60 + i * 28;
        ctx.fillStyle = barColors[i];
        ctx.fillRect(350 + i * 34, 210 - bh, 22, bh);
      }

      // Bottom status blocks
      ctx.fillStyle = 'rgba(56, 189, 248, 0.18)';
      ctx.fillRect(24, 232, 464, 64);
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 20px monospace';
      ctx.fillText('PARTJAVA AI CORE · GPU 98% · ONLINE', 42, 270);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createNeonBannerTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, 512, 128);
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.beginPath();
    ctx.roundRect(8, 12, 496, 104, 24);
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#38bdf8';
    ctx.stroke();

    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 42px "Inter", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 16;
    ctx.fillText('PartJava · AI 太空舱', 256, 64);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/**
 * Builds Option B: Futuristic AI Holographic Space Capsule Room
 * complete with a 3D Cyber Developer Desk, Dual Curved Code Monitors,
 * RGB Mechanical Keyboard, Glass Water-Cooled PC Tower, Left AI Server/Bookshelf,
 * and Panoramic Space Window with a Ringed Planet.
 */
export function buildSpaceCapsuleRoom(scene: THREE.Scene): SpaceRoomHandles {
  const roomGroup = new THREE.Group();
  scene.add(roomGroup);

  // Deep space cabin atmosphere
  scene.background = new THREE.Color(0x080f1e);
  scene.fog = new THREE.FogExp2(0x080f1e, 0.025);

  // Cabin accent lights
  const cyanLight = new THREE.PointLight(0x38bdf8, 1.35, 18);
  cyanLight.position.set(3.6, 2.6, 1.8);
  roomGroup.add(cyanLight);

  const purpleLight = new THREE.PointLight(0xa855f7, 1.15, 18);
  purpleLight.position.set(-3.6, 2.6, 1.8);
  roomGroup.add(purpleLight);

  // ==========================================================================
  // 1. Space Capsule Floor, Walls & Neon Baseboard Trim
  // ==========================================================================
  const floorGeo = new THREE.PlaneGeometry(24, 18);
  const floorMat = new THREE.MeshStandardMaterial({
    color: 0x0d1629,
    metalness: 0.65,
    roughness: 0.3,
  });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1.0;
  floor.receiveShadow = true;
  roomGroup.add(floor);

  const grid = new THREE.GridHelper(22, 32, 0x0ea5e9, 0x1e293b);
  grid.position.y = -0.98;
  const gridMat = grid.material as THREE.Material;
  if (gridMat) {
    gridMat.transparent = true;
    gridMat.opacity = 0.42;
  }
  roomGroup.add(grid);

  // Back wall & side angled walls
  const wallMat = new THREE.MeshStandardMaterial({
    color: 0x0b1324,
    metalness: 0.45,
    roughness: 0.45,
  });
  const backWall = new THREE.Mesh(new THREE.PlaneGeometry(24, 12), wallMat);
  backWall.position.set(0, 4.8, -5.2);
  roomGroup.add(backWall);

  // Glowing neon baseboard strip along back wall
  const baseboard = new THREE.Mesh(
    new THREE.BoxGeometry(18, 0.08, 0.08),
    new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
  );
  baseboard.position.set(0, -0.94, -5.12);
  roomGroup.add(baseboard);

  // Sci-fi structural pillars framing the back wall
  [-5.6, 5.6].forEach((px) => {
    const pillar = new THREE.Mesh(
      new THREE.BoxGeometry(0.45, 9.5, 0.55),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.75, roughness: 0.25 })
    );
    pillar.position.set(px, 3.6, -4.95);
    roomGroup.add(pillar);

    const strip = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 8.5, 0.58),
      new THREE.MeshBasicMaterial({ color: px < 0 ? 0xa855f7 : 0x38bdf8 })
    );
    strip.position.set(px, 3.6, -4.95);
    roomGroup.add(strip);
  });

  // ==========================================================================
  // 2. Back Wall Panoramic Space Window + Ringed Planet + Neon Sign
  // ==========================================================================
  const winFrame = new THREE.Mesh(
    new THREE.BoxGeometry(9.0, 4.2, 0.22),
    new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.8,
      roughness: 0.2,
    })
  );
  winFrame.position.set(0, 2.65, -5.08);
  roomGroup.add(winFrame);

  const spaceBackdrop = new THREE.Mesh(
    new THREE.PlaneGeometry(8.5, 3.75),
    new THREE.MeshBasicMaterial({ color: 0x030611 })
  );
  spaceBackdrop.position.set(0, 2.65, -4.95);
  roomGroup.add(spaceBackdrop);

  // Ringed Saturn-like Planet outside the window
  const planetGroup = new THREE.Group();
  planetGroup.position.set(-2.1, 2.95, -4.65);

  const planet = new THREE.Mesh(
    new THREE.SphereGeometry(0.72, 32, 32),
    new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      emissive: 0x3730a3,
      emissiveIntensity: 0.45,
      roughness: 0.35,
    })
  );
  planetGroup.add(planet);

  const planetRing = new THREE.Mesh(
    new THREE.RingGeometry(0.98, 1.48, 48),
    new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.78,
    })
  );
  planetRing.rotation.x = 1.15;
  planetRing.rotation.y = 0.35;
  planetGroup.add(planetRing);
  roomGroup.add(planetGroup);

  // Distant glowing moon & stars in window
  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(0.24, 20, 20),
    new THREE.MeshBasicMaterial({ color: 0xfbbf24 })
  );
  moon.position.set(2.4, 3.5, -4.75);
  roomGroup.add(moon);

  const starGeo = new THREE.SphereGeometry(0.035, 8, 8);
  const starMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  for (let i = 0; i < 28; i++) {
    const s = new THREE.Mesh(starGeo, starMat);
    s.position.set(
      (Math.sin(i * 19.3) - 0.5) * 3.8,
      2.65 + (Math.cos(i * 31.7) - 0.5) * 1.6,
      -4.88
    );
    roomGroup.add(s);
  }

  // Neon sign above window
  const bannerMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(3.8, 0.92),
    new THREE.MeshBasicMaterial({
      map: createNeonBannerTexture(),
      transparent: true,
    })
  );
  bannerMesh.position.set(0, 5.25, -4.9);
  roomGroup.add(bannerMesh);

  // ==========================================================================
  // 3. Center Glowing Holographic Pedestal Under "袋子"
  // ==========================================================================
  const pedestalBase = new THREE.Mesh(
    new THREE.CylinderGeometry(1.75, 1.98, 0.14, 48),
    new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.8,
      roughness: 0.2,
    })
  );
  pedestalBase.position.set(0, -0.92, 0);
  pedestalBase.receiveShadow = true;
  roomGroup.add(pedestalBase);

  const holoRingOuter = new THREE.Mesh(
    new THREE.TorusGeometry(1.68, 0.04, 16, 64),
    new THREE.MeshBasicMaterial({ color: 0x00f2fe })
  );
  holoRingOuter.rotation.x = Math.PI / 2;
  holoRingOuter.position.set(0, -0.83, 0);
  roomGroup.add(holoRingOuter);

  const holoRingInner = new THREE.Mesh(
    new THREE.TorusGeometry(1.28, 0.03, 16, 64),
    new THREE.MeshBasicMaterial({ color: 0xa855f7 })
  );
  holoRingInner.rotation.x = Math.PI / 2;
  holoRingInner.position.set(0, -0.82, 0);
  roomGroup.add(holoRingInner);

  // ==========================================================================
  // 4. RIGHT SIDE: 3D Cyber Developer Desk + Dual Curved Code Monitors + PC
  // ==========================================================================
  const deskGroup = new THREE.Group();
  deskGroup.position.set(3.55, -1.0, -1.15);
  deskGroup.rotation.y = -0.42;

  // Tabletop
  const deskTop = new THREE.Mesh(
    new THREE.BoxGeometry(3.6, 0.12, 1.75),
    new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.72,
      roughness: 0.22,
    })
  );
  deskTop.position.y = 1.48;
  deskTop.castShadow = true;
  deskTop.receiveShadow = true;
  deskGroup.add(deskTop);

  // Glowing cyan neon edge around tabletop
  const deskNeonEdge = new THREE.Mesh(
    new THREE.BoxGeometry(3.65, 0.035, 1.79),
    new THREE.MeshBasicMaterial({ color: 0x00f2fe })
  );
  deskNeonEdge.position.y = 1.48;
  deskGroup.add(deskNeonEdge);

  // Desk legs
  [-1.55, 1.55].forEach((lx) => {
    const leg = new THREE.Mesh(
      new THREE.BoxGeometry(0.14, 1.48, 1.35),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.85, roughness: 0.2 })
    );
    leg.position.set(lx, 0.74, 0);
    deskGroup.add(leg);
  });

  // Dual Widescreen Monitors (Left: Code IDE, Right: AI Telemetry Dashboard)
  const codeTex = createCodeScreenTexture('code');
  const dashTex = createCodeScreenTexture('dashboard');

  [
    { x: -0.78, rotY: 0.2, tex: codeTex },
    { x: 0.56, rotY: -0.16, tex: dashTex },
  ].forEach((m) => {
    const monGroup = new THREE.Group();
    monGroup.position.set(m.x, 2.18, -0.36);
    monGroup.rotation.y = m.rotY;

    // Bezel frame
    const bezel = new THREE.Mesh(
      new THREE.BoxGeometry(1.32, 0.84, 0.06),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8, roughness: 0.2 })
    );
    monGroup.add(bezel);

    // Glowing code/dashboard screen
    const screen = new THREE.Mesh(
      new THREE.PlaneGeometry(1.24, 0.76),
      new THREE.MeshBasicMaterial({ map: m.tex })
    );
    screen.position.z = 0.035;
    monGroup.add(screen);

    // Monitor stand
    const standNeck = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.05, 0.42, 16),
      new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8 })
    );
    standNeck.position.set(0, -0.52, -0.05);
    monGroup.add(standNeck);

    deskGroup.add(monGroup);
  });

  // RGB Mechanical Keyboard + Mouse Pad + Mouse
  const pad = new THREE.Mesh(
    new THREE.BoxGeometry(1.65, 0.015, 0.58),
    new THREE.MeshStandardMaterial({ color: 0x090d16, emissive: 0x38bdf8, emissiveIntensity: 0.15 })
  );
  pad.position.set(-0.1, 1.55, 0.34);
  deskGroup.add(pad);

  const keyboard = new THREE.Mesh(
    new THREE.BoxGeometry(0.92, 0.045, 0.32),
    new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      emissive: 0xec4899,
      emissiveIntensity: 0.55,
    })
  );
  keyboard.position.set(-0.24, 1.57, 0.34);
  deskGroup.add(keyboard);

  const mouse = new THREE.Mesh(
    new THREE.SphereGeometry(0.075, 16, 16),
    new THREE.MeshStandardMaterial({ color: 0x1e293b, emissive: 0x00f2fe, emissiveIntensity: 0.6 })
  );
  mouse.scale.set(0.85, 0.5, 1.35);
  mouse.position.set(0.45, 1.57, 0.34);
  deskGroup.add(mouse);

  // Transparent Glass Water-Cooled PC Tower on right corner of desk
  const pcTower = new THREE.Mesh(
    new THREE.BoxGeometry(0.52, 1.08, 0.96),
    new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.28,
      metalness: 0.75,
      roughness: 0.15,
      transparent: true,
      opacity: 0.88,
    })
  );
  pcTower.position.set(1.42, 2.08, -0.12);
  deskGroup.add(pcTower);

  // 3 RGB Fans on the front of the PC Tower
  const fanRings: THREE.Mesh[] = [];
  [1.76, 2.08, 2.4].forEach((fy, idx) => {
    const fan = new THREE.Mesh(
      new THREE.TorusGeometry(0.12, 0.024, 12, 24),
      new THREE.MeshBasicMaterial({ color: idx % 2 === 0 ? 0x00f2fe : 0xec4899 })
    );
    fan.position.set(1.42, fy, 0.37);
    deskGroup.add(fan);
    fanRings.push(fan);
  });

  // Coffee Mug on left side of desk
  const mug = new THREE.Mesh(
    new THREE.CylinderGeometry(0.11, 0.095, 0.24, 20),
    new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.3 })
  );
  mug.position.set(-1.38, 1.66, 0.28);
  deskGroup.add(mug);

  roomGroup.add(deskGroup);

  // ==========================================================================
  // 5. LEFT SIDE: 3D AI Server Rack & Programming Bookshelf + Hologram HUD
  // ==========================================================================
  const leftUnit = new THREE.Group();
  leftUnit.position.set(-3.75, -1.0, -1.25);
  leftUnit.rotation.y = 0.42;

  // Tall frame
  const cabinet = new THREE.Mesh(
    new THREE.BoxGeometry(1.85, 4.1, 1.1),
    new THREE.MeshStandardMaterial({ color: 0x111c33, metalness: 0.7, roughness: 0.25 })
  );
  cabinet.position.y = 2.05;
  leftUnit.add(cabinet);

  // Colorful 3D programming books on upper shelf
  const bookColors = [0xf43f5e, 0x38bdf8, 0xfbbf24, 0x10b981, 0xa855f7, 0xf97316];
  bookColors.forEach((col, idx) => {
    const book = new THREE.Mesh(
      new THREE.BoxGeometry(0.14, 0.55 + (idx % 2) * 0.08, 0.48),
      new THREE.MeshStandardMaterial({ color: col, roughness: 0.35 })
    );
    book.position.set(-0.55 + idx * 0.21, 3.15, 0.35);
    leftUnit.add(book);
  });

  // Lower AI Server Blades with pulsing LED strips
  const serverLeds: THREE.Mesh[] = [];
  for (let i = 0; i < 4; i++) {
    const led = new THREE.Mesh(
      new THREE.BoxGeometry(1.45, 0.065, 0.05),
      new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? 0x38bdf8 : 0x10b981 })
    );
    led.position.set(0, 0.65 + i * 0.48, 0.56);
    leftUnit.add(led);
    serverLeds.push(led);
  }

  // Floating translucent Holographic Screen beside left unit
  const holoPanel = new THREE.Mesh(
    new THREE.PlaneGeometry(1.45, 0.95),
    new THREE.MeshBasicMaterial({
      map: dashTex,
      transparent: true,
      opacity: 0.78,
      side: THREE.DoubleSide,
    })
  );
  holoPanel.position.set(1.45, 2.65, 0.45);
  leftUnit.add(holoPanel);

  roomGroup.add(leftUnit);

  return {
    update: (time: number) => {
      holoRingOuter.rotation.z = time * 0.6;
      holoRingInner.rotation.z = -time * 0.85;
      planetGroup.rotation.y = time * 0.15;
      holoPanel.position.y = 2.65 + Math.sin(time * 1.8) * 0.08;
      fanRings.forEach((f, idx) => {
        f.rotation.z = time * (4 + idx);
      });
    },
  };
}

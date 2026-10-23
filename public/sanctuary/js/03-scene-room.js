    /**
     * ============================================================================
     * 3. THREE.JS SCENE, 2/3 ANGLED CAMERA RIG & 3-LAYER CINEMATIC LIGHTING
     * ============================================================================
     */
    const container = document.getElementById('webgl-container');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f1318);
    scene.fog = new THREE.FogExp2(0x0f1318, 0.055);

    // 采用 34° 中焦镜头，彻底消除广角边缘拉伸畸变
    const camera = new THREE.PerspectiveCamera(
      isMobile ? 44 : 34,
      window.innerWidth / window.innerHeight,
      0.1,
      40
    );

    /**
     * 电影级三分之二侧向构图 (2/3 Angled Perspective Rig):
     * - 相机位于书桌左前方偏侧，视线斜向穿过桌面指向偏右侧的显示器与书本核心区。
     * - 画面左侧自然留出深邃的建筑景深负空间，供主标题与 CTA 按钮优雅排布，互不遮挡。
     */
    const CAMERA_SHOTS = {
      INTRO_START: {
        pos: new THREE.Vector3(-1.68, 1.18, 2.88),
        look: new THREE.Vector3(0.15, 0.34, -0.18)
      },
      HERO_HOME: {
        pos: new THREE.Vector3(isMobile ? -0.95 : -1.16, isMobile ? 1.08 : 0.86, isMobile ? 2.65 : 2.16),
        look: new THREE.Vector3(isMobile ? 0.12 : 0.18, 0.36, -0.10)
      },
      FIRST_PERSON: {
        pos: new THREE.Vector3(0.05, 0.72, 1.38),
        look: new THREE.Vector3(0.06, 0.19, -0.12)
      },
      PROJECTS_MONITOR: {
        pos: new THREE.Vector3(0.32, 0.66, 0.84),
        look: new THREE.Vector3(0.42, 0.56, -0.35)
      },
      KNOWLEDGE_BOOK: {
        pos: new THREE.Vector3(-0.34, 0.78, 1.06),
        look: new THREE.Vector3(-0.18, 0.06, 0.26)
      },
      ABOUT_STUDIO: {
        pos: new THREE.Vector3(-0.75, 0.92, 1.85),
        look: new THREE.Vector3(0.05, 0.42, -0.25)
      }
    };

    const camRig = {
      posX: CAMERA_SHOTS.INTRO_START.pos.x,
      posY: CAMERA_SHOTS.INTRO_START.pos.y,
      posZ: CAMERA_SHOTS.INTRO_START.pos.z,
      lookX: CAMERA_SHOTS.INTRO_START.look.x,
      lookY: CAMERA_SHOTS.INTRO_START.look.y,
      lookZ: CAMERA_SHOTS.INTRO_START.look.z,
      parallaxWeight: 0.0
    };

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.20;
    container.appendChild(renderer.domElement);

    /**
     * 三层电影级灯光系统 (Three-Layer Cinematic Lighting Architecture)
     */
    // Layer A: 低强度冷蓝环境基础光（保留暗部建筑细节，不死黑）
    const ambientLight = new THREE.AmbientLight(0x354257, 0.56);
    scene.add(ambientLight);

    const duskHemiLight = new THREE.HemisphereLight(0x6b7a8b, 0x292017, 0.62);
    scene.add(duskHemiLight);

    // 侧后方建筑天窗冷调轮廓光（勾勒显示器金属边框与台灯机械臂高光）
    const architecturalRimLight = new THREE.DirectionalLight(0x95a8bb, 0.68);
    architecturalRimLight.position.set(-2.6, 2.8, -1.8);
    scene.add(architecturalRimLight);

    // Layer B: 2850K 建筑台灯暖色主光（照亮书本、键盘与胡桃木桌面，投射柔和阴影）
    const lampKeySpot = new THREE.SpotLight(0xffdfb0, 0.0, 10, Math.PI / 2.1, 0.72, 1.4);
    lampKeySpot.position.set(-0.52, 0.92, -0.02);
    lampKeySpot.target.position.set(-0.02, 0.0, 0.22);
    lampKeySpot.castShadow = true;
    lampKeySpot.shadow.mapSize.width = isMobile ? 1024 : 2048;
    lampKeySpot.shadow.mapSize.height = isMobile ? 1024 : 2048;
    lampKeySpot.shadow.bias = -0.00035;
    lampKeySpot.shadow.radius = 4.5; // 柔和阴影边缘
    scene.add(lampKeySpot);
    scene.add(lampKeySpot.target);

    // 台灯近场漫反射柔光（消除阴影死黑，形成温暖光池）
    const lampWarmBounce = new THREE.PointLight(0xd4ad72, 0.0, 4.5, 1.6);
    lampWarmBounce.position.set(-0.15, 0.55, 0.24);
    scene.add(lampWarmBounce);

    // 背景建筑灯槽与暖色氛围点光源（呼应参考图1左上角的温暖光晕）
    const wallWarmSconce = new THREE.PointLight(0xffa94d, 0.0, 5.0, 1.8);
    wallWarmSconce.position.set(-1.35, 0.75, -0.85);
    scene.add(wallWarmSconce);

    // Layer C: 显示器屏幕冷青色辅助光（轻微染亮键盘后沿与桌面）
    const screenCyanGlow = new THREE.PointLight(0x67d9d2, 0.0, 3.2, 1.7);
    screenCyanGlow.position.set(0.38, 0.52, -0.02);
    scene.add(screenCyanGlow);

    /**
     * ============================================================================
     * 4. PROCEDURAL PBR TEXTURES & CONTACT SHADOW GENERATOR
     * ============================================================================
     */
    // 生成柔和径向接触阴影贴图（让每个桌面物体底部都有真实的 Contact AO）
    const contactShadowTex = (() => {
      const c = document.createElement('canvas');
      c.width = 256; c.height = 256;
      const ctx = c.getContext('2d');
      const g = ctx.createRadialGradient(128, 128, 12, 128, 128, 120);
      g.addColorStop(0, 'rgba(6, 4, 3, 0.72)');
      g.addColorStop(0.5, 'rgba(6, 4, 3, 0.32)');
      g.addColorStop(1, 'rgba(6, 4, 3, 0.0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 256, 256);
      return new THREE.CanvasTexture(c);
    })();

    function addContactShadow(parent, width, depth, x, z, opacity = 0.65) {
      const mat = new THREE.MeshBasicMaterial({
        map: contactShadowTex,
        transparent: true,
        opacity,
        depthWrite: false
      });
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, depth), mat);
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.set(x, 0.0015, z);
      parent.add(mesh);
      return mesh;
    }

    // 生成细腻横向胡桃木 PBR Albedo + Roughness 贴图
    function createWalnutTextures() {
      const aCanvas = document.createElement('canvas');
      const rCanvas = document.createElement('canvas');
      aCanvas.width = 1024; aCanvas.height = 512;
      rCanvas.width = 1024; rCanvas.height = 512;
      const aCtx = aCanvas.getContext('2d');
      const rCtx = rCanvas.getContext('2d');

      aCtx.fillStyle = '#31231B';
      aCtx.fillRect(0, 0, 1024, 512);
      rCtx.fillStyle = '#707070';
      rCtx.fillRect(0, 0, 1024, 512);

      for (let i = 0; i < 480; i++) {
        const y = Math.random() * 512;
        const h = 0.8 + Math.random() * 3.2;
        const alpha = 0.035 + Math.random() * 0.09;
        const dark = i % 2 === 0;
        aCtx.fillStyle = dark ? `rgba(18, 11, 8, ${alpha})` : `rgba(68, 48, 36, ${alpha * 0.8})`;
        rCtx.fillStyle = dark ? `rgba(130, 130, 130, ${alpha})` : `rgba(85, 85, 85, ${alpha})`;

        aCtx.beginPath();
        rCtx.beginPath();
        aCtx.moveTo(0, y);
        rCtx.moveTo(0, y);
        for (let x = 0; x <= 1024; x += 64) {
          const wy = y + Math.sin(x * 0.006 + i * 0.7) * 3.5;
          aCtx.lineTo(x, wy);
          rCtx.lineTo(x, wy);
        }
        aCtx.lineTo(1024, y + h);
        aCtx.lineTo(0, y + h);
        aCtx.closePath();
        aCtx.fill();

        rCtx.lineTo(1024, y + h);
        rCtx.lineTo(0, y + h);
        rCtx.closePath();
        rCtx.fill();
      }

      const colorMap = new THREE.CanvasTexture(aCanvas);
      colorMap.encoding = THREE.sRGBEncoding;
      colorMap.anisotropy = renderer.capabilities.getMaxAnisotropy();

      const roughnessMap = new THREE.CanvasTexture(rCanvas);
      roughnessMap.anisotropy = renderer.capabilities.getMaxAnisotropy();
      return { colorMap, roughnessMap };
    }

    /**
     * ============================================================================
     * 5. ARCHITECTURAL ROOM BACKDROP & DEEP WALNUT DESK (消除廉价竖条纹背景)
     * ============================================================================
     */
    const studioGroup = new THREE.Group();
    scene.add(studioGroup);

    const walnutTex = createWalnutTextures();
    const walnutMat = new THREE.MeshStandardMaterial({
      map: walnutTex.colorMap,
      roughnessMap: walnutTex.roughnessMap,
      roughness: 0.42,
      metalness: 0.06
    });

    const anodizedDarkMat = new THREE.MeshStandardMaterial({
      color: 0x1b1f26,
      roughness: 0.30,
      metalness: 0.84
    });

    const spaceSilverMat = new THREE.MeshStandardMaterial({
      color: 0x8a929e,
      roughness: 0.26,
      metalness: 0.88
    });

    const brushedBrassMat = new THREE.MeshStandardMaterial({
      color: 0xD4AD72,
      roughness: 0.25,
      metalness: 0.86
    });

    // 1. 建筑微水泥深色背景墙与左侧暮色玻璃窗框（形成高级空间层次，绝无重复竖条纹）
    const backWall = new THREE.Mesh(
      new THREE.PlaneGeometry(12, 6),
      new THREE.MeshStandardMaterial({ color: 0x12161c, roughness: 0.88, metalness: 0.05 })
    );
    backWall.position.set(0, 1.4, -1.15);
    backWall.receiveShadow = true;
    studioGroup.add(backWall);

    // 墙面水平建筑凹槽与暖色搁板（呼应参考图1背景层次）
    const wallShelf = new THREE.Mesh(
      new THREE.BoxGeometry(2.8, 0.035, 0.24),
      walnutMat
    );
    wallShelf.position.set(-0.55, 0.96, -1.02);
    wallShelf.castShadow = true;
    studioGroup.add(wallShelf);
    wallShelf.visible = false; // 隐藏画面上方突兀的深色横梁，保留模型以便未来重新布景

    // 远景景深暖色散景光斑（Warm Amber Bokeh Orbs，复刻参考图1背景氛围）
    function createBokehTexture() {
      const c = document.createElement('canvas');
      c.width = 128; c.height = 128;
      const ctx = c.getContext('2d');
      const g = ctx.createRadialGradient(64, 64, 8, 64, 64, 60);
      g.addColorStop(0, 'rgba(255, 190, 105, 0.85)');
      g.addColorStop(0.55, 'rgba(245, 148, 55, 0.38)');
      g.addColorStop(0.85, 'rgba(245, 148, 55, 0.12)');
      g.addColorStop(1, 'rgba(245, 148, 55, 0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 128, 128);
      return new THREE.CanvasTexture(c);
    }
    const bokehTex = createBokehTexture();
    const bokehSprites = [];
    const bokehCoords = [
      { x: -1.15, y: 0.42, z: -0.82, s: 0.22 },
      { x: -0.92, y: 0.36, z: -0.88, s: 0.16 },
      { x: -0.45, y: 0.58, z: -0.92, s: 0.26 },
      { x: -0.18, y: 0.48, z: -0.86, s: 0.18 },
      { x: 0.98, y: 0.72, z: -0.95, s: 0.24 },
      { x: 1.25, y: 0.44, z: -0.88, s: 0.19 }
    ];
    bokehCoords.forEach((b, idx) => {
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({
        map: bokehTex,
        transparent: true,
        opacity: 0.0,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      }));
      sp.position.set(b.x, b.y, b.z);
      sp.scale.set(b.s, b.s, 1);
      studioGroup.add(sp);
      bokehSprites.push({ sprite: sp, baseScale: b.s, phase: idx * 1.1 });
    });

    // 2. 深胡桃木实木斜切边缘书桌
    const DESK_W = 2.95;
    const DESK_D = 1.38;
    const DESK_H = 0.055;

    const deskSlab = new THREE.Mesh(
      new THREE.BoxGeometry(DESK_W, DESK_H, DESK_D),
      walnutMat
    );
    deskSlab.position.set(0, -DESK_H / 2, 0.08);
    deskSlab.castShadow = true;
    deskSlab.receiveShadow = true;
    studioGroup.add(deskSlab);

    // 桌面细腻前缘黄铜装饰线与深色桌腿
    const deskBrassTrim = new THREE.Mesh(
      new THREE.BoxGeometry(DESK_W, 0.005, 0.006),
      brushedBrassMat
    );
    deskBrassTrim.position.set(0, -0.012, DESK_D / 2 + 0.081);
    studioGroup.add(deskBrassTrim);

    const deskLegGeo = new THREE.BoxGeometry(0.065, 1.3, DESK_D - 0.16);
    const leftDeskLeg = new THREE.Mesh(deskLegGeo, anodizedDarkMat);
    leftDeskLeg.position.set(-DESK_W / 2 + 0.14, -0.68, 0.08);
    studioGroup.add(leftDeskLeg);

    const rightDeskLeg = new THREE.Mesh(deskLegGeo, anodizedDarkMat);
    rightDeskLeg.position.set(DESK_W / 2 - 0.14, -0.68, 0.08);
    studioGroup.add(rightDeskLeg);

    // 深炭灰微纹理皮革桌垫（偏右侧围绕显示器与键盘区域）
    const deskPadMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1.75, 0.004, 0.78),
      new THREE.MeshStandardMaterial({ color: 0x24282d, roughness: 0.90, metalness: 0.02 })
    );
    deskPadMesh.position.set(0.28, 0.002, 0.12);
    deskPadMesh.receiveShadow = true;
    studioGroup.add(deskPadMesh);


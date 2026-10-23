    /**
     * ============================================================================
     * 8. ARCHITECTURAL BALANCED-ARM LAMP, CNC MECHANICAL KEYBOARD & POUR-OVER COFFEE
     * ============================================================================
     */
    // 1. 建筑师平衡臂金属台灯（比例协调，置于书桌左后侧，向右下方的书本与键盘投射暖光）
    const lampGroup = new THREE.Group();
    lampGroup.position.set(-0.68, 0.004, -0.18);
    lampGroup.rotation.y = 0.55;
    studioGroup.add(lampGroup);

    addContactShadow(lampGroup, 0.28, 0.28, 0, 0, 0.8);

    // 沉稳圆柱铸铁底座 + 黄铜调光旋钮
    const lampBaseCylinder = new THREE.Mesh(
      new THREE.CylinderGeometry(0.105, 0.112, 0.022, 36),
      anodizedDarkMat
    );
    lampBaseCylinder.position.y = 0.011;
    lampBaseCylinder.castShadow = true;
    lampBaseCylinder.receiveShadow = true;
    lampBaseCylinder.userData.interactiveType = 'LAMP';
    lampGroup.add(lampBaseCylinder);

    const lampRotarySwitch = new THREE.Mesh(
      new THREE.CylinderGeometry(0.016, 0.016, 0.014, 24),
      brushedBrassMat
    );
    lampRotarySwitch.position.set(0.055, 0.024, 0.035);
    lampRotarySwitch.userData.interactiveType = 'LAMP';
    lampGroup.add(lampRotarySwitch);

    // 下立柱与黄铜阻尼转轴
    const lampStem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.011, 0.011, 0.56, 20),
      anodizedDarkMat
    );
    lampStem.position.set(0, 0.29, 0);
    lampStem.rotation.z = -0.06;
    lampStem.castShadow = true;
    lampStem.userData.interactiveType = 'LAMP';
    lampGroup.add(lampStem);

    const lampHinge = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.02, 0.028, 24),
      brushedBrassMat
    );
    lampHinge.rotation.x = Math.PI / 2;
    lampHinge.position.set(0.02, 0.56, 0);
    lampHinge.userData.interactiveType = 'LAMP';
    lampGroup.add(lampHinge);

    // 悬臂横梁与配重块
    const lampBoomArm = new THREE.Mesh(
      new THREE.BoxGeometry(0.43, 0.014, 0.016),
      anodizedDarkMat
    );
    // 几何两端分别与阻尼铰链和灯头相连，不再出现悬臂脱节
    lampBoomArm.position.set(0.215, 0.64, 0);
    lampBoomArm.rotation.z = Math.atan2(0.16, 0.39);
    lampBoomArm.castShadow = true;
    lampBoomArm.userData.interactiveType = 'LAMP';
    lampGroup.add(lampBoomArm);

    // 极简锥形金属灯罩与真实暖白发光体
    const lampShadeHolder = new THREE.Group();
    lampShadeHolder.position.set(0.41, 0.72, 0);
    // 灯头朝桌面前侧的打开书本倾斜：-X 表示照向桌面前方(+Z)，而非照向背景墙
    lampShadeHolder.rotation.x = -0.65;
    lampShadeHolder.rotation.z = 0.23;
    lampGroup.add(lampShadeHolder);

    const lampShadeCone = new THREE.Mesh(
      // 截锥形金属灯罩，上窄下宽，开放式底沿指向实际照明区域
      new THREE.CylinderGeometry(0.046, 0.105, 0.105, 48, 1, true),
      new THREE.MeshStandardMaterial({
        color: 0x1c2026,
        roughness: 0.32,
        metalness: 0.85,
        side: THREE.DoubleSide
      })
    );
    lampShadeCone.castShadow = true;
    lampShadeCone.userData.interactiveType = 'LAMP';
    lampShadeHolder.add(lampShadeCone);

    const lampBrassRim = new THREE.Mesh(
      new THREE.TorusGeometry(0.105, 0.0035, 12, 48),
      brushedBrassMat
    );
    lampBrassRim.rotation.x = Math.PI / 2;
    lampBrassRim.position.y = -0.0525;
    lampShadeHolder.add(lampBrassRim);

    const bulbEmitterMat = new THREE.MeshBasicMaterial({ color: 0x2a241d });
    const bulbEmitter = new THREE.Mesh(
      new THREE.CircleGeometry(0.086, 48),
      bulbEmitterMat
    );
    bulbEmitter.rotation.x = Math.PI / 2;
    bulbEmitter.position.y = -0.049;
    bulbEmitter.userData.interactiveType = 'LAMP';
    lampShadeHolder.add(bulbEmitter);

    // 禁用实体几何光锥。真实聚光由 SpotLight 提供，避免舞台灯般的巨大灰白三角形。
    // 保留同名材质供原有灯光色温逻辑兼容，不创建占据屏幕的 ConeGeometry。
    const lightConeMat = new THREE.MeshBasicMaterial({
      color: 0xffdfb0, transparent: true, opacity: 0, depthWrite: false
    });

    // 灯罩与实际光源位置绑定，以书本中心为目标，不再让光源与灯罩各自偏移。
    studioGroup.updateMatrixWorld(true);
    const lampSourceWorld = lampShadeHolder.localToWorld(new THREE.Vector3(0, -0.065, 0));
    lampKeySpot.position.copy(lampSourceWorld);
    lampKeySpot.target.position.set(-0.22, 0.012, 0.28);
    lampKeySpot.angle = Math.PI / 5.8;
    lampKeySpot.penumbra = 0.92;
    lampKeySpot.distance = 3.2;
    lampKeySpot.decay = 1.7;
    lampWarmBounce.position.set(-0.20, 0.22, 0.16);

    // 2. CNC 铝合金 65% 客制化机械键盘（带微倒角内凹键帽、独立悬停高光、局部1~3键下压与轴体背光扩散）
    const keyboardGroup = new THREE.Group();
    keyboardGroup.position.set(0.46, 0.005, 0.22);
    keyboardGroup.rotation.y = -0.18;
    studioGroup.add(keyboardGroup);

    addContactShadow(keyboardGroup, 0.54, 0.24, 0, 0, 0.72);

    // CNC 阶梯式阳极氧化铝下壳与上盖边框
    const kbChassis = new THREE.Mesh(
      new THREE.BoxGeometry(0.468, 0.020, 0.180),
      anodizedDarkMat
    );
    kbChassis.position.y = 0.010;
    kbChassis.rotation.x = 0.055;
    kbChassis.castShadow = true;
    kbChassis.receiveShadow = true;
    kbChassis.userData.interactiveType = 'KEYBOARD';
    keyboardGroup.add(kbChassis);

    // 铝合金窄边框上沿与黄铜配重铭牌
    const kbTopBezel = new THREE.Mesh(
      new THREE.BoxGeometry(0.456, 0.006, 0.168),
      new THREE.MeshStandardMaterial({ color: 0x222730, roughness: 0.26, metalness: 0.88 })
    );
    kbTopBezel.position.set(0, 0.018, 0);
    kbTopBezel.rotation.x = 0.055;
    keyboardGroup.add(kbTopBezel);

    const kbAccentBar = new THREE.Mesh(
      new THREE.BoxGeometry(0.125, 0.004, 0.009),
      brushedBrassMat
    );
    kbAccentBar.position.set(0.14, 0.023, -0.074);
    kbAccentBar.rotation.x = 0.055;
    keyboardGroup.add(kbAccentBar);

    // 键盘轴体定位板局部柔和背光扩散层 (Tactile Key Press Underglow Ripple)
    const kbRippleCanvas = document.createElement('canvas');
    kbRippleCanvas.width = 128; kbRippleCanvas.height = 128;
    const kbRippleCtx = kbRippleCanvas.getContext('2d');
    const kbRippleGrad = kbRippleCtx.createRadialGradient(64, 64, 4, 64, 64, 60);
    kbRippleGrad.addColorStop(0, 'rgba(103, 217, 210, 0.95)');
    kbRippleGrad.addColorStop(0.45, 'rgba(103, 217, 210, 0.38)');
    kbRippleGrad.addColorStop(0.8, 'rgba(242, 233, 220, 0.12)');
    kbRippleGrad.addColorStop(1, 'rgba(103, 217, 210, 0.0)');
    kbRippleCtx.fillStyle = kbRippleGrad;
    kbRippleCtx.fillRect(0, 0, 128, 128);
    const kbRippleTex = new THREE.CanvasTexture(kbRippleCanvas);

    const kbGlowMat = new THREE.MeshBasicMaterial({
      map: kbRippleTex,
      transparent: true,
      opacity: 0.0,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    const kbGlowMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.13, 0.13), kbGlowMat);
    kbGlowMesh.rotation.x = -Math.PI / 2 + 0.055;
    kbGlowMesh.position.set(0, 0.022, 0);
    keyboardGroup.add(kbGlowMesh);

    // 局部按键触发时的柔和微点光源（短时间、低强度、克制不霓虹）
    const kbTapLight = new THREE.PointLight(0x67D9D2, 0.0, 0.35, 1.8);
    kbTapLight.position.set(0, 0.045, 0);
    keyboardGroup.add(kbTapLight);

    // 构建具有真实梯形倒角与指腹微凹曲面的高精度键帽网格 (Sculpted Beveled & Dished Keycap)
    function createSculptedKeycapGeometry(kw, kh, kd) {
      const geo = new THREE.BoxGeometry(kw, kh, kd, 4, 2, 4);
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        let vx = pos.getX(i);
        let vy = pos.getY(i);
        let vz = pos.getZ(i);
        if (vy > 0) {
          // 顶面梯形内收倒角 (Cherry Profile Taper)
          const nx = vx / (kw * 0.5);
          const nz = vz / (kd * 0.5);
          vx *= 0.84;
          vz *= 0.82;
          // 指腹中央微凹弧面 (Cylindrical Finger Dish)
          const dish = (1.0 - Math.min(1.0, nx * nx * 0.85 + nz * nz * 0.35)) * 0.0014;
          vy -= dish;
        }
        pos.setXYZ(i, vx, vy, vz);
      }
      pos.needsUpdate = true;
      geo.computeVertexNormals();
      return geo;
    }

    // 真实 5 行键位宽度与功能定义（区分 ESC、ENTER、SPACE、修饰键与字母键）
    const KEY_ROWS = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.8, 1],
      [1.4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.4, 1],
      [1.65, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.15, 1],
      [2.1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.7, 1, 1],
      [1.25, 1.25, 1.25, 6.25, 1.25, 1.25, 1, 1, 1]
    ];

    const KEY_LABELS = [
      ['ESC', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'BKSP', '~'],
      ['TAB', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\', 'DEL'],
      ['CAPS', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'ENTER', 'PGUP'],
      ['SHIFT', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'SHIFT', '↑', 'PGDN'],
      ['CTRL', 'OPT', 'CMD', 'SPACE', 'CMD', 'FN', '←', '↓', '→']
    ];

    const keycapMeshes = [];
    const unitSize = 0.0252;
    const gap = 0.0033;

    KEY_ROWS.forEach((row, rIdx) => {
      let cursorX = -0.208;
      const zPos = -0.056 + rIdx * (unitSize + gap);
      const yPos = 0.0245 - rIdx * 0.0012;

      row.forEach((wUnit, cIdx) => {
        const kw = wUnit * unitSize + (wUnit - 1) * gap;
        const kh = 0.0115;
        const kd = unitSize;
        const label = (KEY_LABELS[rIdx] && KEY_LABELS[rIdx][cIdx]) || 'KEY';

        let baseHex = 0x282e38;
        let rough = 0.36;
        let metal = 0.16;
        let isActionKey = false;

        if (rIdx === 0 && cIdx === 0) {
          baseHex = 0xD4AD72; rough = 0.28; metal = 0.42; isActionKey = true; // ESC
        } else if (rIdx === 2 && cIdx === 12) {
          baseHex = 0x3f8884; rough = 0.30; metal = 0.28; isActionKey = true; // ENTER
        } else if (rIdx === 4 && cIdx === 3) {
          baseHex = 0x20252e; rough = 0.38; metal = 0.18; // SPACEBAR
        } else if (wUnit > 1.05 || rIdx === 4) {
          baseHex = 0x1b2028; rough = 0.40; metal = 0.18;
        }

        // 独立材质实例以支持单键悬停微高光与按下发光反馈
        const kMat = new THREE.MeshStandardMaterial({
          color: baseHex,
          roughness: rough,
          metalness: metal,
          emissive: new THREE.Color(0x000000),
          emissiveIntensity: 0.0
        });

        const kGeo = createSculptedKeycapGeometry(kw, kh, kd);
        const kMesh = new THREE.Mesh(kGeo, kMat);
        const centerX = cursorX + kw / 2;
        kMesh.position.set(centerX, yPos, zPos);
        kMesh.rotation.x = 0.055;
        kMesh.castShadow = true;
        kMesh.receiveShadow = true;
        kMesh.userData.interactiveType = 'KEYBOARD';

        const keyItem = {
          mesh: kMesh,
          mat: kMat,
          baseColor: new THREE.Color(baseHex),
          baseY: yPos,
          x: centerX,
          z: zPos,
          wUnit,
          rIdx,
          cIdx,
          label,
          isActionKey,
          hoverAmount: 0.0
        };
        kMesh.userData.keyItem = keyItem;

        keyboardGroup.add(kMesh);
        keycapMeshes.push(keyItem);

        cursorX += kw + gap;
      });
    });

    // 人体工学无线鼠标（置于键盘右侧）
    const mouseGroup = new THREE.Group();
    mouseGroup.position.set(0.82, 0.005, 0.23);
    mouseGroup.rotation.y = -0.22;
    studioGroup.add(mouseGroup);
    addContactShadow(mouseGroup, 0.12, 0.16, 0, 0, 0.65);

    const mouseShell = new THREE.Mesh(
      new THREE.SphereGeometry(0.042, 24, 20),
      anodizedDarkMat
    );
    mouseShell.scale.set(0.78, 0.45, 1.35);
    mouseShell.position.y = 0.014;
    mouseShell.castShadow = true;
    mouseGroup.add(mouseShell);

    // 3. 哑光黑粗陶咖啡杯与木质托盘（复刻参考图1左侧深色暖调茶歇意境）
    const coffeeGroup = new THREE.Group();
    coffeeGroup.position.set(-0.76, 0.004, 0.14);
    studioGroup.add(coffeeGroup);

    addContactShadow(coffeeGroup, 0.24, 0.24, 0, 0, 0.75);

    const woodTray = new THREE.Mesh(
      new THREE.BoxGeometry(0.22, 0.012, 0.15),
      new THREE.MeshStandardMaterial({ color: 0x1e1612, roughness: 0.6 })
    );
    woodTray.position.y = 0.006;
    woodTray.castShadow = true;
    woodTray.receiveShadow = true;
    coffeeGroup.add(woodTray);

    const cupProfile = [
      new THREE.Vector2(0.0, 0.012),
      new THREE.Vector2(0.048, 0.012),
      new THREE.Vector2(0.062, 0.045),
      new THREE.Vector2(0.065, 0.105),
      new THREE.Vector2(0.061, 0.108),
      new THREE.Vector2(0.057, 0.102),
      new THREE.Vector2(0.045, 0.022),
      new THREE.Vector2(0.0, 0.022)
    ];
    const ceramicCup = new THREE.Mesh(
      new THREE.LatheGeometry(cupProfile, 36),
      new THREE.MeshStandardMaterial({
        color: 0x1f2329,
        roughness: 0.52,
        metalness: 0.08,
        side: THREE.DoubleSide
      })
    );
    ceramicCup.castShadow = true;
    ceramicCup.receiveShadow = true;
    ceramicCup.userData.interactiveType = 'COFFEE';
    coffeeGroup.add(ceramicCup);

    const espressoLiquid = new THREE.Mesh(
      new THREE.CircleGeometry(0.056, 32),
      new THREE.MeshStandardMaterial({ color: 0x7a4824, roughness: 0.16, metalness: 0.05 })
    );
    espressoLiquid.rotation.x = -Math.PI / 2;
    espressoLiquid.position.y = 0.092;
    espressoLiquid.userData.interactiveType = 'COFFEE';
    coffeeGroup.add(espressoLiquid);

    // 细腻热气粒子
    const steamWisps = [];
    const wispCanvas = document.createElement('canvas');
    wispCanvas.width = 64; wispCanvas.height = 64;
    const wCtx = wispCanvas.getContext('2d');
    const wGrad = wCtx.createRadialGradient(32, 32, 2, 32, 32, 30);
    wGrad.addColorStop(0, 'rgba(242, 233, 220, 0.25)');
    wGrad.addColorStop(1, 'rgba(242, 233, 220, 0)');
    wCtx.fillStyle = wGrad;
    wCtx.fillRect(0, 0, 64, 64);
    const wispTex = new THREE.CanvasTexture(wispCanvas);

    for (let i = 0; i < 5; i++) {
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({
        map: wispTex,
        transparent: true,
        opacity: 0,
        depthWrite: false
      }));
      coffeeGroup.add(sp);
      steamWisps.push({ sprite: sp, phase: i / 5 });
    }

    // 4. 后景柔焦深绿阔叶植物（置于左后侧与显示器旁，增添自然生机与景深遮挡层次）
    const plantGroup = new THREE.Group();
    plantGroup.position.set(-0.22, 0.004, -0.42);
    studioGroup.add(plantGroup);
    addContactShadow(plantGroup, 0.22, 0.22, 0, 0, 0.7);

    const planterPot = new THREE.Mesh(
      new THREE.CylinderGeometry(0.072, 0.058, 0.12, 28),
      new THREE.MeshStandardMaterial({ color: 0x252930, roughness: 0.78 })
    );
    planterPot.position.y = 0.06;
    planterPot.castShadow = true;
    plantGroup.add(planterPot);

    const foliageMat = new THREE.MeshStandardMaterial({ color: 0x234236, roughness: 0.52 });
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.042, 14, 12), foliageMat);
      leaf.scale.set(0.65, 1.55, 0.25);
      leaf.position.set(Math.cos(a) * 0.036, 0.14 + (i % 2) * 0.02, Math.sin(a) * 0.036);
      leaf.rotation.z = -Math.cos(a) * 0.48;
      leaf.rotation.x = Math.sin(a) * 0.48;
      leaf.castShadow = true;
      plantGroup.add(leaf);
    }


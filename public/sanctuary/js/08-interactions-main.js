    /**
     * ============================================================================
     * 11. PROGRESSIVE HOVER TOOLTIPS & OBJECT MICRO-INTERACTIONS
     * ============================================================================
     */
    const raycaster = new THREE.Raycaster();
    const pointerNDC = new THREE.Vector2();
    let targetMouseX = 0, targetMouseY = 0;
    let smoothMouseX = 0, smoothMouseY = 0;
    let hoveredType = null;
    let hoveredKeyItem = null;
    let rightCornerHover = 0, leftCornerHover = 0;

    const hoverTooltip = document.getElementById('hover-tooltip');
    const tooltipTitle = document.getElementById('tooltip-title');
    const tooltipSub = document.getElementById('tooltip-sub');
    const tooltipDot = document.getElementById('tooltip-dot');

    const HOVER_METADATA = {
      MONITOR: { title: 'Studio Display', sub: '点击进入 C++ 数据结构实验室 (Code Lab)', color: '#67D9D2' },
      BOOK_RIGHT: { title: '精装技术手稿', sub: '点击翻阅或进入 Knowledge', color: '#D4AD72' },
      BOOK_LEFT: { title: '精装技术手稿', sub: '点击回翻或进入 Knowledge', color: '#D4AD72' },
      LAMP: { title: '建筑平衡臂台灯', sub: '点击切换色温与照明', color: '#D4AD72' },
      KEYBOARD: { title: 'CNC 机械键盘', sub: '点击按下键帽，触发触觉音效与代码反馈', color: '#67D9D2' },
      COFFEE: { title: '手冲浓缩咖啡', sub: '点击品尝或续杯', color: '#D4AD72' }
    };

    const interactiveObjects = [
      screenMesh, monitorChassis,
      rightSheetMesh, leftSheetMesh,
      lampBaseCylinder, lampRotarySwitch, lampStem, lampBoomArm, lampShadeCone, bulbEmitter,
      kbChassis, ...keycapMeshes.map(k => k.mesh),
      ceramicCup, espressoLiquid
    ];

    window.addEventListener('pointermove', (e) => {
      pointerNDC.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerNDC.y = -(e.clientY / window.innerHeight) * 2 + 1;
      targetMouseX = pointerNDC.x;
      targetMouseY = pointerNDC.y;

      if (currentRoute === 'INTRO' || currentRoute === 'PROJECTS' || currentRoute === 'ABOUT') {
        hoverTooltip.classList.add('opacity-0', 'scale-95');
        document.body.style.cursor = 'default';
        hoveredType = null;
        hoveredKeyItem = null;
        return;
      }

      raycaster.setFromCamera(pointerNDC, camera);
      const hits = raycaster.intersectObjects(interactiveObjects, false);

      if (hits.length > 0 && hits[0].object.userData.interactiveType) {
        const hitObj = hits[0].object;
        const type = hitObj.userData.interactiveType;
        hoveredType = type;
        hoveredKeyItem = hitObj.userData.keyItem || null;
        document.body.style.cursor = 'pointer';

        const meta = HOVER_METADATA[type];
        if (meta) {
          if (type === 'KEYBOARD' && hoveredKeyItem) {
            tooltipTitle.textContent = `CNC 机械键盘 [${hoveredKeyItem.label}]`;
            tooltipSub.textContent = hoveredKeyItem.isActionKey
              ? '点击同步算法代码并进入实验室 (Code Lab)'
              : '点击触发局部机械轴体 · 双击打开代码实验室';
          } else {
            tooltipTitle.textContent = meta.title;
            tooltipSub.textContent = meta.sub;
          }
          tooltipDot.style.backgroundColor = meta.color;
          hoverTooltip.style.left = `${e.clientX}px`;
          hoverTooltip.style.top = `${e.clientY - 10}px`;
          hoverTooltip.classList.remove('opacity-0', 'scale-95');
        }
      } else {
        hoveredType = null;
        hoveredKeyItem = null;
        document.body.style.cursor = 'default';
        hoverTooltip.classList.add('opacity-0', 'scale-95');
      }
    });

    window.addEventListener('pointerdown', (e) => {
      if (
        e.target.closest('header') ||
        e.target.closest('main') ||
        e.target.closest('footer') ||
        e.target.closest('#projects-dialog') ||
        e.target.closest('#about-dialog') ||
        e.target.closest('#manuscript-drawer') ||
        e.target.closest('#workspace-hud')
      ) {
        return;
      }
      if (currentRoute === 'INTRO') return;

      pointerNDC.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerNDC.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(pointerNDC, camera);
      const hits = raycaster.intersectObjects(interactiveObjects, false);

      if (hits.length > 0 && hits[0].object.userData.interactiveType) {
        const hit = hits[0];
        const type = hit.object.userData.interactiveType;
        if (type === 'MONITOR') {
          navigateToSection('PROJECTS');
        } else if (type === 'BOOK_RIGHT') {
          if (currentRoute === 'WORKSPACE') workspaceTurnPage(1);
          else if (currentRoute !== 'KNOWLEDGE') navigateToSection('KNOWLEDGE');
          else flipBookSpread(1);
        } else if (type === 'BOOK_LEFT') {
          if (currentRoute === 'WORKSPACE') workspaceTurnPage(-1);
          else if (currentRoute !== 'KNOWLEDGE') navigateToSection('KNOWLEDGE');
          else flipBookSpread(-1);
        } else if (type === 'LAMP') {
          cycleLampKelvinMode();
        } else if (type === 'KEYBOARD') {
          triggerTactileKeyPress(hit);
        } else if (type === 'COFFEE') {
          triggerCoffeeInteraction();
        }
      }
    });

    // 台灯三档色温切换
    let lampMode = 0; // 0: 2850K 暖光, 1: 4200K 晨间白光, 2: 静谧暗场
    const btnLampCycle = document.getElementById('btn-lamp-cycle');

    function cycleLampKelvinMode() {
      lampMode = (lampMode + 1) % 3;
      SoundEngine.playClick(760);
      if (lampMode === 0) {
        lampKeySpot.color.setHex(0xffdfb0);
        lightConeMat.color.setHex(0xffdfb0);
        setLampIllumination(1.0);
        btnLampCycle.textContent = '2850K 暖光';
      } else if (lampMode === 1) {
        lampKeySpot.color.setHex(0xf2f7ff);
        lightConeMat.color.setHex(0xf2f7ff);
        setLampIllumination(1.1);
        btnLampCycle.textContent = '4200K 柔白';
      } else {
        setLampIllumination(0.0);
        btnLampCycle.textContent = '台灯: 待机';
      }
    }

    // 机械键盘真实局部按键下压 (1~3 个相邻键帽) + 柔和青白背光扩散 + 屏幕代码刷新 + 渐进式模块切换
    let lastKbClickTime = 0;

    function triggerTactileKeyPress(hit) {
      const now = performance.now();
      const isRapidDoubleTap = (now - lastKbClickTime) < 420;
      lastKbClickTime = now;

      // 1. 定位被点击的主键帽（若点击在边框上则取距离点击坐标最近的键帽）
      let primaryKey = hit.object.userData.keyItem;
      if (!primaryKey) {
        const localPt = keyboardGroup.worldToLocal(hit.point.clone());
        let minDist = Infinity;
        keycapMeshes.forEach((k) => {
          const d = Math.hypot(k.x - localPt.x, k.z - localPt.z);
          if (d < minDist) {
            minDist = d;
            primaryKey = k;
          }
        });
      }
      if (!primaryKey) return;

      // 2. 查找紧邻的 1~2 个辅助联动键帽（模拟真实手指按压时周边的微弱机械耦合）
      const neighbors = keycapMeshes
        .filter((k) => k !== primaryKey)
        .map((k) => ({
          item: k,
          dist: Math.hypot((k.x - primaryKey.x) * 0.85, k.z - primaryKey.z)
        }))
        .filter((n) => n.dist < 0.036)
        .sort((a, b) => a.dist - b.dist)
        .slice(0, 2);

      // 3. 播放真实客制化机械轴体敲击音（大键带卫星轴低频共鸣，字母键清脆干练）
      const isStabilized = primaryKey.wUnit >= 1.6;
      const pitchScale = 0.94 + ((primaryKey.cIdx % 5) * 0.028);
      SoundEngine.playMechKey(pitchScale, isStabilized);

      // 4. 主键帽真实行程下压与轴体弹簧回弹动画 (Key Travel: -4.8mm scale equivalent)
      gsap.killTweensOf(primaryKey.mesh.position);
      gsap.killTweensOf(primaryKey.mat);
      const travelDepth = 0.0052;
      gsap.timeline()
        .to(primaryKey.mesh.position, {
          y: primaryKey.baseY - travelDepth,
          duration: 0.042,
          ease: 'power3.out'
        })
        .to(primaryKey.mesh.position, {
          y: primaryKey.baseY,
          duration: 0.16,
          ease: 'back.out(2.1)'
        });

      // 主键帽瞬时柔和微光
      primaryKey.mat.emissive.setHex(primaryKey.isActionKey ? 0xD4AD72 : 0x67D9D2);
      gsap.fromTo(
        primaryKey.mat,
        { emissiveIntensity: 0.55 },
        { emissiveIntensity: 0.0, duration: 0.38, ease: 'power2.out' }
      );

      // 5. 附近 1~2 个相邻键帽轻微协同下沉与回弹
      neighbors.forEach((n, idx) => {
        const nk = n.item;
        const subTravel = travelDepth * (idx === 0 ? 0.42 : 0.24);
        gsap.killTweensOf(nk.mesh.position);
        gsap.timeline({ delay: 0.012 + idx * 0.008 })
          .to(nk.mesh.position, {
            y: nk.baseY - subTravel,
            duration: 0.048,
            ease: 'power2.out'
          })
          .to(nk.mesh.position, {
            y: nk.baseY,
            duration: 0.15,
            ease: 'power2.out'
          });

        nk.mat.emissive.setHex(0x67D9D2);
        gsap.fromTo(
          nk.mat,
          { emissiveIntensity: 0.22 },
          { emissiveIntensity: 0.0, duration: 0.28, ease: 'power2.out' }
        );
      });

      // 6. 定位板局部柔和青色/暖白光晕扩散 (时间短、强度克制、不霓虹化)
      kbGlowMesh.position.set(primaryKey.x, 0.022, primaryKey.z);
      kbTapLight.position.set(primaryKey.x, 0.042, primaryKey.z);
      kbTapLight.color.setHex(primaryKey.isActionKey ? 0xF2E9DC : 0x67D9D2);

      gsap.killTweensOf(kbGlowMesh.scale);
      gsap.killTweensOf(kbGlowMat);
      gsap.killTweensOf(kbTapLight);

      gsap.fromTo(
        kbGlowMesh.scale,
        { x: 0.35, y: 0.35, z: 1 },
        { x: 1.35, y: 1.35, z: 1, duration: 0.36, ease: 'power2.out' }
      );
      gsap.fromTo(
        kbGlowMat,
        { opacity: 0.46 },
        { opacity: 0.0, duration: 0.38, ease: 'power2.out' }
      );
      gsap.fromTo(
        kbTapLight,
        { intensity: 0.45 },
        { intensity: 0.0, duration: 0.34, ease: 'power2.out' }
      );

      // 7. 渐进式反馈第二阶段（110ms 后）：显示器屏幕代码行与终端轻微刷新闪烁
      const shouldEnterModule = primaryKey.isActionKey || isRapidDoubleTap;
      gsap.delayedCall(0.11, () => {
        screenState.keystrokeCount += 1;
        screenState.activeLineIndex = (screenState.activeLineIndex + 1) % CODE_LINES.length;
        if (CODE_LINES[screenState.activeLineIndex].segs.length === 0) {
          screenState.activeLineIndex = 5;
        }
        screenState.lastKeyCmd = shouldEnterModule
          ? `sanctuary_cli --exec [${primaryKey.label}] -> launching portfolio`
          : `key_event [${primaryKey.label}] -> ninja -C build/release check_ast`;

        gsap.killTweensOf(screenState, 'refreshFlash');
        gsap.fromTo(
          screenState,
          { refreshFlash: shouldEnterModule ? 0.95 : 0.65 },
          { refreshFlash: 0.0, duration: 0.52, ease: 'power2.out' }
        );
      });

      // 8. 渐进式反馈第三阶段（460ms 后）：当点击功能键 (Enter/ESC) 或双击任意键时，在按键下压与屏幕代码刷新后平滑推进镜头进入模块
      if (shouldEnterModule && currentRoute === 'HOME') {
        gsap.delayedCall(0.46, () => {
          navigateToSection('PROJECTS');
        });
      }
    }

    // 手冲咖啡品尝微交互
    let coffeeLevel = 1.0;
    function triggerCoffeeInteraction() {
      SoundEngine.playClick(620);
      coffeeLevel = coffeeLevel <= 0.3 ? 1.0 : coffeeLevel - 0.35;
      const targetY = 0.035 + coffeeLevel * 0.057;
      gsap.to(espressoLiquid.position, { y: targetY, duration: 0.55, ease: 'power2.out' });
    }

    /**
     * 12. FIRST-PERSON WORKSPACE (NO HAND AVATAR)
     * Keep camera, book/page, and mechanical keyboard interactions.
     */
    function workspaceTurnPage(direction = 1) {
      if (currentRoute !== 'WORKSPACE' || isFlipping) return;
      if (direction > 0 && currentSpread >= totalSpreads - 1) direction = -1;
      else if (direction < 0 && currentSpread <= 0) direction = 1;
      flipBookSpread(direction);
    }

    function workspaceKeyPress() {
      if (currentRoute !== 'WORKSPACE') return;
      const sample = keycapMeshes.find(k => k.label === 'J') || keycapMeshes[Math.floor(keycapMeshes.length / 2)];
      if (!sample) return;
      keyboardGroup.updateMatrixWorld(true);
      const worldPoint = keyboardGroup.localToWorld(new THREE.Vector3(sample.x, sample.baseY + 0.017, sample.z));
      triggerTactileKeyPress({ object: sample.mesh, point: worldPoint });
    }

    document.getElementById('workspace-key-demo').addEventListener('click', workspaceKeyPress);
    document.getElementById('workspace-page-demo').addEventListener('click', () => workspaceTurnPage(1));
    document.getElementById('workspace-exit').addEventListener('click', () => navigateToSection('HOME'));

    /**
     * ============================================================================
     * 13. UI EVENT LISTENERS & POMODORO TIMER
     * ============================================================================
     */
    document.getElementById('brand-home-btn').addEventListener('click', () => navigateToSection('HOME'));
    document.querySelectorAll('.nav-link').forEach((btn) => {
      btn.addEventListener('click', () => navigateToSection(btn.dataset.route.toUpperCase()));
    });

    btnSkipIntro.addEventListener('click', completeIntroAndSettle);
    document.getElementById('btn-hero-explore').addEventListener('click', () => navigateToSection('WORKSPACE'));
    document.getElementById('btn-hero-projects').addEventListener('click', () => navigateToSection('PROJECTS'));

    document.getElementById('btn-close-projects').addEventListener('click', () => navigateToSection('HOME'));
    document.getElementById('btn-projects-to-book').addEventListener('click', () => navigateToSection('KNOWLEDGE'));
    document.getElementById('btn-close-about').addEventListener('click', () => navigateToSection('HOME'));

    document.getElementById('btn-book-prev').addEventListener('click', () => flipBookSpread(-1));
    document.getElementById('btn-book-next').addEventListener('click', () => flipBookSpread(1));
    document.getElementById('btn-book-back').addEventListener('click', () => navigateToSection('HOME'));
    document.getElementById('btn-open-manuscript-drawer').addEventListener('click', () => {
      manuscriptDrawer.classList.remove('translate-x-full');
    });
    document.getElementById('btn-close-drawer').addEventListener('click', () => {
      manuscriptDrawer.classList.add('translate-x-full');
    });
    document.getElementById('btn-drawer-prev').addEventListener('click', () => flipBookSpread(-1));
    document.getElementById('btn-drawer-next').addEventListener('click', () => flipBookSpread(1));

    // Studio Controls 折叠面板
    const studioPopover = document.getElementById('studio-settings-popover');
    document.getElementById('btn-studio-settings').addEventListener('click', (e) => {
      e.stopPropagation();
      studioPopover.classList.toggle('hidden');
    });
    document.addEventListener('pointerdown', (e) => {
      if (!e.target.closest('#studio-settings-popover') && !e.target.closest('#btn-studio-settings')) {
        studioPopover.classList.add('hidden');
      }
    });

    document.getElementById('btn-lamp-cycle').addEventListener('click', cycleLampKelvinMode);
    document.getElementById('btn-pop-prev').addEventListener('click', () => flipBookSpread(-1));
    document.getElementById('btn-pop-next').addEventListener('click', () => flipBookSpread(1));
    document.getElementById('btn-replay-intro').addEventListener('click', () => {
      studioPopover.classList.add('hidden');
      projectsModal.classList.add('opacity-0', 'pointer-events-none');
      aboutModal.classList.add('opacity-0', 'pointer-events-none');
      manuscriptDrawer.classList.add('translate-x-full');
      startCinematicIntro();
    });

    const btnAmbientAudio = document.getElementById('btn-ambient-audio');
    btnAmbientAudio.addEventListener('click', () => {
      const active = SoundEngine.toggleRain();
      btnAmbientAudio.classList.toggle('text-[#67D9D2]', active);
      btnAmbientAudio.classList.toggle('border-[#67D9D2]/50', active);
    });

    // 番茄专注计时器
    let pomoSeconds = 25 * 60;
    let pomoInterval = null;
    const pomoDisplay = document.getElementById('pomo-time-display');
    const pomoMiniBadge = document.getElementById('pomo-mini-badge');
    const btnPomoToggle = document.getElementById('btn-pomo-toggle');

    function updatePomoText() {
      const m = String(Math.floor(pomoSeconds / 60)).padStart(2, '0');
      const s = String(pomoSeconds % 60).padStart(2, '0');
      pomoDisplay.textContent = `${m}:${s}`;
      pomoMiniBadge.textContent = `${m}:${s}`;
    }

    btnPomoToggle.addEventListener('click', () => {
      SoundEngine.playClick(680);
      if (pomoInterval) {
        clearInterval(pomoInterval);
        pomoInterval = null;
        btnPomoToggle.textContent = '继续';
      } else {
        btnPomoToggle.textContent = '暂停';
        pomoInterval = setInterval(() => {
          if (pomoSeconds > 0) {
            pomoSeconds--;
            updatePomoText();
          } else {
            clearInterval(pomoInterval);
            pomoInterval = null;
            btnPomoToggle.textContent = '完成';
          }
        }, 1000);
      }
    });

    document.getElementById('btn-pomo-reset').addEventListener('click', () => {
      if (pomoInterval) clearInterval(pomoInterval);
      pomoInterval = null;
      pomoSeconds = 25 * 60;
      updatePomoText();
      btnPomoToggle.textContent = '开始';
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') navigateToSection('HOME');
      else if (e.key === 'ArrowRight') flipBookSpread(1);
      else if (e.key === 'ArrowLeft') flipBookSpread(-1);
    });

    /**
     * ============================================================================
     * 14. MAIN RENDER LOOP & PRELOAD SHADER COMPILATION GATE
     * ============================================================================
     */
    window.addEventListener('resize', () => {
      const mob = window.innerWidth < 768;
      camera.fov = currentRoute === 'WORKSPACE' ? (mob ? 52 : 43) : (mob ? 44 : 34);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    let isViewportVisible = true;
    let lastIdeTextureRefresh = -1e6;
    function animate(nowMs) {
      requestAnimationFrame(animate);
      if (!isViewportVisible) return;
      const tSec = nowMs * 0.001;

      // 1. 细腻平滑视差相机更新（体现三分之二侧向空间纵深）
      smoothMouseX += (targetMouseX - smoothMouseX) * 0.045;
      smoothMouseY += (targetMouseY - smoothMouseY) * 0.045;

      const px = smoothMouseX * 0.055 * camRig.parallaxWeight;
      const py = -smoothMouseY * 0.032 * camRig.parallaxWeight;

      camera.position.set(camRig.posX + px, camRig.posY + py, camRig.posZ);
      camera.lookAt(camRig.lookX + px * 0.3, camRig.lookY + py * 0.25, camRig.lookZ);
      const desiredFov = currentRoute === 'WORKSPACE' ? (window.innerWidth < 768 ? 52 : 43) : (window.innerWidth < 768 ? 44 : 34);
      if (Math.abs(camera.fov - desiredFov) > 0.015) {
        camera.fov += (desiredFov - camera.fov) * 0.065;
        camera.updateProjectionMatrix();
      }

      // 2. 更新 Studio Display 屏幕代码与悬停微光
      const monHoverTarget = hoveredType === 'MONITOR' ? 1.0 : 0.0;
      screenState.hoverBorder += (monHoverTarget - screenState.hoverBorder) * 0.12;
      // 高清 2K 代码纹理按约 12 FPS 更新，避免每帧重传大纹理带来 GPU 带宽压力。
      if (tSec - lastIdeTextureRefresh > 1 / 12) {
        drawIDECanvas(tSec);
        lastIdeTextureRefresh = tSec;
      }

      // 3. 书页悬停微卷反馈
      const rHoverTarget = hoveredType === 'BOOK_RIGHT' ? 1.0 : 0.0;
      const lHoverTarget = hoveredType === 'BOOK_LEFT' ? 1.0 : 0.0;
      rightCornerHover += (rHoverTarget - rightCornerHover) * 0.14;
      leftCornerHover += (lHoverTarget - leftCornerHover) * 0.14;
      if (rightCornerHover > 0.004) applyGullWingCurve(rightSheetGeo, 1, rightCornerHover);
      if (leftCornerHover > 0.004) applyGullWingCurve(leftSheetGeo, -1, leftCornerHover);

      // 3.B 机械键盘单键悬停极轻高光与微浮反馈
      keycapMeshes.forEach((k) => {
        const isHovered = (hoveredKeyItem === k) ? 1.0 : 0.0;
        k.hoverAmount += (isHovered - k.hoverAmount) * 0.18;
        if (k.hoverAmount > 0.002 && !gsap.isTweening(k.mat)) {
          k.mat.emissive.setHex(k.isActionKey ? 0xD4AD72 : 0x67D9D2);
          k.mat.emissiveIntensity = k.hoverAmount * 0.18;
        } else if (k.hoverAmount <= 0.002 && !gsap.isTweening(k.mat)) {
          k.mat.emissiveIntensity = 0.0;
        }
      });

      // 4. 书页上方 1主+2辅 全息知识卡片：缓慢悬浮 + 轻微呼吸透明度变化 + 极弱鼠标视差偏移
      holoPanes.forEach((p) => {
        const floatY = Math.sin(tSec * 1.25 + p.phase) * 0.0065;
        const parallaxX = smoothMouseX * 0.012 * p.parallaxFactor;
        const parallaxZ = smoothMouseY * 0.008 * p.parallaxFactor;

        p.holder.position.set(
          p.baseX + parallaxX,
          p.baseY + floatY,
          p.baseZ + parallaxZ
        );
        p.holder.rotation.y = p.baseRotY + smoothMouseX * 0.035 * p.parallaxFactor;
        p.holder.rotation.x = p.baseRotX - smoothMouseY * 0.022 * p.parallaxFactor;

        const breath = 1.0 + Math.sin(tSec * 1.85 + p.phase) * 0.08;
        const targetOpacity = p.baseOpacity * breath * holoState.energy;
        p.mat.opacity = targetOpacity;
        p.glowMat.opacity = targetOpacity * (p.role === 'main' ? 0.22 : 0.14);
        p.shadowMat.opacity = targetOpacity * 0.55;
        p.tetherMat.opacity = targetOpacity * 0.28;
      });

      holoMotes.forEach((m, idx) => {
        m.phase = (m.phase + 0.0026 * m.speed) % 1.0;
        const h = m.phase;
        m.mesh.position.set(
          m.x + Math.sin(tSec * 1.3 + idx) * 0.012,
          0.045 + h * 0.22,
          m.z + Math.cos(tSec * 1.1 + idx) * 0.012
        );
        m.mesh.rotation.y = tSec * 1.1 + idx;
        m.mat.opacity = Math.sin(h * Math.PI) * 0.45 * holoState.energy;
      });

      // 5. 远景散景光斑呼吸与咖啡热气上升
      bokehSprites.forEach((b) => {
        const s = b.baseScale * (1 + Math.sin(tSec * 1.2 + b.phase) * 0.06);
        b.sprite.scale.set(s, s, 1);
      });

      steamWisps.forEach((w, i) => {
        w.phase = (w.phase + 0.0035) % 1.0;
        const p = w.phase;
        w.sprite.position.set(
          Math.sin(tSec * 1.4 + i) * 0.01,
          0.10 + p * 0.14,
          Math.cos(tSec * 1.2 + i) * 0.01
        );
        const sc = 0.035 + p * 0.045;
        w.sprite.scale.set(sc, sc, 1);
        w.sprite.material.opacity = Math.sin(p * Math.PI) * 0.22;
      });

      renderer.render(scene, camera);
    }

    // 视口可见性控制与父窗口向下滚动联动
    window.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'SANCTUARY_VISIBILITY') {
        isViewportVisible = Boolean(event.data.visible);
      }
    });

    const btnScrollDown = document.getElementById('btn-scroll-down');
    if (btnScrollDown) {
      btnScrollDown.addEventListener('click', () => {
        SoundEngine.playClick(640);
        if (window.parent && window.parent !== window) {
          window.parent.postMessage({ type: 'SANCTUARY_SCROLL_DOWN' }, '*');
        }
      });
    }

    // 鼠标滚轮无缝传递到父级页面（在弹窗/抽屉内部滚动代码时不触发父页面滚动）
    window.addEventListener('wheel', (e) => {
      if (e.target && e.target.closest && e.target.closest('.custom-scroll')) {
        return;
      }
      if (currentRoute === 'PROJECTS' || currentRoute === 'ABOUT') {
        return;
      }
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({ type: 'SANCTUARY_WHEEL', deltaY: e.deltaY }, '*');
      }
    }, { passive: true });

    // 预编译着色器，彻底消除开屏首帧卡顿或贴图闪烁
    window.addEventListener('DOMContentLoaded', () => {
      const loaderBar = document.getElementById('loader-bar');
      const loaderCurtain = document.getElementById('loader-curtain');

      renderer.compile(scene, camera);
      drawIDECanvas(0);
      renderer.render(scene, camera);

      loaderBar.style.width = '100%';
      setTimeout(() => {
        loaderCurtain.classList.add('opacity-0', 'pointer-events-none');
        startCinematicIntro();
        requestAnimationFrame(animate);
      }, 400);
    });

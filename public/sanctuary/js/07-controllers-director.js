    /**
     * 9. BOOK FLIP CONTROLLER & MANUSCRIPT DRAWER SYNCHRONIZATION
     * ============================================================================
     */
    const DS_CHAPTER_TITLES = [
      '线性结构与受限端口', '串匹配、高维数组与压缩存储',
      '树形拓扑与优先队列', '平衡搜索树与散列表', '排序体系与图论算法'
    ];
    const DS_CHAPTER_DESCRIPTIONS = [
      '从顺序表、链表到栈与单调队列，理解连续内存和指针拓扑的不同访问代价。',
      '通过 KMP 前缀函数与 CSR 稀疏矩阵，探索文本匹配和紧凑数据表达。',
      '从树的遍历、哈夫曼编码到堆的数组映射与 Floyd 线性建堆。',
      '通过旋转维持树的平衡，以哈希索引和双向链表构建 LRU 缓存。',
      '比较排序与非比较排序，再进入图的遍历、最小生成树和最短路径。'
    ];
    const DS_CODE_FILE_NAMES = [
      ['linear_list.cpp','monotonic_deque.cpp'],
      ['kmp_prefix.cpp','csr_matrix.cpp'],
      ['union_find.cpp','binary_heap.cpp'],
      ['balanced_tree.cpp','lru_cache.cpp'],
      ['introsort.cpp','graph_dijkstra.cpp']
    ];
    function escapeCodeHtml(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

    function renderLessonCard(p){
      return `
        <article class="ds-page-card">
          <div class="ds-page-meta"><span>${escapeCodeHtml(p.chapter)}</span><span>FOLIO ${String(p.page).padStart(2,'0')}</span></div>
          <div class="ds-page-title">${escapeCodeHtml(p.title)}</div>
          <div class="ds-page-sub">${escapeCodeHtml(p.chapter.replace('CHAPTER ','Chapter '))}</div>
          <blockquote class="ds-quote" style="margin-top:14px;">${escapeCodeHtml(p.quote)}</blockquote>
          <ul class="ds-page-list">${p.points.map(pt=>`<li>${escapeCodeHtml(pt)}</li>`).join('')}</ul>
          <pre class="ds-editor-code" style="margin-top:14px;border-radius:16px;border:1px solid rgba(255,255,255,.05);background:#090e15;"><code>${escapeCodeHtml(p.code.join('\n'))}</code></pre>
        </article>
      `;
    }
    function updateLearningConsole(){
      const chapter=currentSpread;
      const page=MANUSCRIPT_PAGES[chapter*2+activeLessonSide];
      const folios=[MANUSCRIPT_PAGES[chapter*2],MANUSCRIPT_PAGES[chapter*2+1]];
      const byId=id=>document.getElementById(id);
      byId('ds-current-chapter').textContent='C++ DATA STRUCTURES · 5 CHAPTERS';
      byId('ds-chapter-heading').textContent=`Chapter ${['I','II','III','IV','V'][chapter]} · ${DS_CHAPTER_TITLES[chapter]}`;
      byId('ds-chapter-summary').textContent=DS_CHAPTER_DESCRIPTIONS[chapter];
      document.querySelectorAll('[data-ds-chapter]').forEach(btn=>btn.classList.toggle('active',Number(btn.dataset.dsChapter)===chapter));
      byId('ds-left-page').classList.toggle('active', activeLessonSide===0);
      byId('ds-right-page').classList.toggle('active', activeLessonSide===1);
      byId('ds-preview-quote').textContent = page.quote.replace(/^“|”$/g,'');
      byId('ds-code-label').textContent=`${DS_CODE_FILE_NAMES[chapter][activeLessonSide]}  ·  C++20`;
      byId('ds-code-content').textContent=page.code.join('\n');
      byId('ds-knowledge-points').innerHTML=page.points.map(pt=>`<div class="ds-note">${escapeCodeHtml(pt)}</div>`).join('');
      byId('ds-page-cards').innerHTML = folios.map(renderLessonCard).join('');
      byId('ds-progress').textContent=`${String(page.page).padStart(2,'0')} / 10 · 书页 / 全息卡片 / 屏幕同步`;
      byId('ds-next-lesson').textContent=page.page===10?'回到第一章 ↺':'下一知识点 →';
    }
    const totalSpreads = Math.floor(MANUSCRIPT_PAGES.length / 2);
    let currentSpread = 0;
    let isFlipping = false;
    const flipProgressObj = { t: 0 };

    const spreadIndicatorEl = document.getElementById('book-spread-indicator');
    const drawerTitleEl = document.getElementById('drawer-title');
    const drawerBodyEl = document.getElementById('drawer-body');
    const drawerPageLabelEl = document.getElementById('drawer-page-label');

    function syncBookSpreadUI() {
      if (typeof activeLessonSide !== 'undefined' && document.getElementById('projects-modal').classList.contains('pointer-events-none')) activeLessonSide = 0;
      const leftIdx = currentSpread * 2;
      const rightIdx = currentSpread * 2 + 1;
      leftSheetMat.map = manuscriptTextures[leftIdx];
      rightSheetMat.map = manuscriptTextures[rightIdx];
      leftSheetMat.needsUpdate = true;
      rightSheetMat.needsUpdate = true;

      const pLStr = String(leftIdx + 1).padStart(2, '0');
      const pRStr = String(rightIdx + 1).padStart(2, '0');
      const totalStr = String(MANUSCRIPT_PAGES.length).padStart(2, '0');

      spreadIndicatorEl.textContent = `P. ${pLStr}-${pRStr} / ${totalStr}`;
      const leftData = MANUSCRIPT_PAGES[leftIdx];
      const rightData = MANUSCRIPT_PAGES[rightIdx];

      drawerTitleEl.textContent = leftData.chapter;
      drawerPageLabelEl.textContent = `Pages ${String(leftData.page).padStart(2, '0')} - ${String(rightData.page).padStart(2, '0')}`;
      drawerBodyEl.innerHTML = [leftData, rightData].map((p) => `
        <article class="p-5 rounded-2xl bg-white/[0.03] border border-[#D4AD72]/20 space-y-3">
          <div class="flex items-center justify-between text-[11px] font-mono-code text-[#D4AD72]">
            <span>${p.chapter}</span>
            <span>FOLIO ${String(p.page).padStart(2, '0')}</span>
          </div>
          <h4 class="text-base font-serif-editorial font-semibold text-[#F2E9DC]">${p.title}</h4>
          <blockquote class="pl-3 border-l-2 border-[#D4AD72] text-xs italic text-[#F2E9DC]/75">${p.quote}</blockquote>
          <ul class="space-y-1.5 text-xs text-[#F2E9DC]/80 leading-relaxed">
            ${p.points.map(pt => `<li>${pt}</li>`).join('')}
          </ul>
          <pre class="p-3 rounded-xl bg-[#0a0c10] text-[11px] font-mono-code text-[#67D9D2] overflow-x-auto border border-white/5"><code>${p.code.join('\n')}</code></pre>
        </article>
      `).join('');

      // 同步更新书本上方 1主+2辅 全息小屏幕内容 + Studio Display 大屏幕章节代码与可视化
      if (typeof updateHoloCardsContent === 'function') {
        updateHoloCardsContent(currentSpread);
      }
      if (typeof CHAPTER_IDE_WORKSPACES !== 'undefined') {
        screenState.chapterIdx = currentSpread % CHAPTER_IDE_WORKSPACES.length;
        screenState.lastKeyCmd = CHAPTER_IDE_WORKSPACES[screenState.chapterIdx].cmd;
        updateLearningConsole();
        gsap.fromTo(screenState, { refreshFlash: 0.72 }, { refreshFlash: 0.0, duration: 0.45, ease: 'power2.out' });
      }
    }
    syncBookSpreadUI();
    document.querySelectorAll('[data-ds-chapter]').forEach(el=>el.addEventListener('click',()=>{
      currentSpread=Number(el.dataset.dsChapter);
      activeLessonSide=0;
      syncBookSpreadUI();
      screenState.typedLines=CHAPTER_IDE_WORKSPACES[currentSpread].lines.length;
      SoundEngine.playClick(700);
    }));
    document.querySelectorAll('[data-ds-side]').forEach(el=>el.addEventListener('click',()=>{
      activeLessonSide=Number(el.dataset.dsSide);
      updateLearningConsole();
      screenState.refreshFlash=.85;
      SoundEngine.playClick(650);
    }));
    document.getElementById('ds-next-lesson').addEventListener('click',()=>{
      activeLessonSide++;
      if(activeLessonSide>1){activeLessonSide=0;currentSpread=(currentSpread+1)%totalSpreads;syncBookSpreadUI();}
      else updateLearningConsole();
      screenState.refreshFlash=.65;
    });
    document.getElementById('ds-copy-code').addEventListener('click',async e=>{
      const content=MANUSCRIPT_PAGES[currentSpread*2+activeLessonSide].code.join('\n');
      try{
        await navigator.clipboard.writeText(content);
        e.currentTarget.textContent='已复制 ✓';
        setTimeout(()=>{e.currentTarget.textContent='复制代码';},1300);
      }catch(_){
        // file:// 或未授权剪贴板时，可直接从可选择的代码面板手动复制。
        const sel=window.getSelection();const range=document.createRange();
        range.selectNodeContents(document.getElementById('ds-code-content'));
        sel.removeAllRanges();sel.addRange(range);
        e.currentTarget.textContent='已选中 · Ctrl+C';
        setTimeout(()=>{e.currentTarget.textContent='复制代码';},1800);
      }
    });

    function flipBookSpread(dir = 1, silent = false) {
      if (isFlipping) return;
      if (dir === 1 && currentSpread >= totalSpreads - 1) return;
      if (dir === -1 && currentSpread <= 0) return;

      isFlipping = true;
      if (!silent) SoundEngine.playPageFlip(false);

      if (dir === 1) {
        const cL = currentSpread * 2;
        const cR = currentSpread * 2 + 1;
        const nL = (currentSpread + 1) * 2;
        const nR = (currentSpread + 1) * 2 + 1;
        leftSheetMat.map = manuscriptTextures[cL];
        flipFrontMat.map = manuscriptTextures[cR];
        flipBackMat.map = manuscriptTextures[nL];
        rightSheetMat.map = manuscriptTextures[nR];
      } else {
        const pL = (currentSpread - 1) * 2;
        const pR = (currentSpread - 1) * 2 + 1;
        const cL = currentSpread * 2;
        const cR = currentSpread * 2 + 1;
        leftSheetMat.map = manuscriptTextures[pL];
        flipFrontMat.map = manuscriptTextures[pR];
        flipBackMat.map = manuscriptTextures[cL];
        rightSheetMat.map = manuscriptTextures[cR];
      }
      leftSheetMat.needsUpdate = true;
      rightSheetMat.needsUpdate = true;
      flipFrontMat.needsUpdate = true;
      flipBackMat.needsUpdate = true;

      flipProgressObj.t = dir === 1 ? 0.0 : 1.0;
      deformFlippingSheet(flipProgressObj.t);
      flipPivotGroup.visible = true;

      gsap.fromTo(holoState, { energy: 1.0 }, { energy: 0.65, duration: 1.8, ease: 'power2.out' });

      gsap.to(flipProgressObj, {
        t: dir === 1 ? 1.0 : 0.0,
        duration: 1.15,
        ease: 'power2.inOut',
        onUpdate: () => deformFlippingSheet(flipProgressObj.t),
        onComplete: () => {
          currentSpread += dir;
          flipPivotGroup.visible = false;
          isFlipping = false;
          syncBookSpreadUI();
        }
      });
    }

    /**
     * ============================================================================
     * 10. DIRECTOR'S 7.2-SECOND CINEMATIC INTRO TIMELINE & ROUTE TRANSITIONS
     * ============================================================================
     */
    let currentRoute = 'INTRO'; // INTRO | HOME | WORKSPACE | PROJECTS | KNOWLEDGE | ABOUT
    let masterTimeline = null;

    const heroSection = document.getElementById('hero-section');
    const bottomBar = document.getElementById('bottom-bar');
    const btnSkipIntro = document.getElementById('btn-skip-intro');
    const bookControlsBar = document.getElementById('book-controls-bar');
    const projectsModal = document.getElementById('projects-modal');
    const projectsDialog = document.getElementById('projects-dialog');
    const aboutModal = document.getElementById('about-modal');
    const aboutDialog = document.getElementById('about-dialog');
    const manuscriptDrawer = document.getElementById('manuscript-drawer');
    const workspaceHud = document.getElementById('workspace-hud');

    function setWorkspaceMode(enabled) {
      document.body.classList.toggle('fp-active', enabled);
      if (workspaceHud) workspaceHud.classList.toggle('is-open', enabled);
    }

    function setLampIllumination(level) {
      lampKeySpot.intensity = level * 2.55;
      lampWarmBounce.intensity = level * 0.92;
      wallWarmSconce.intensity = level * 0.68;
      lightConeMat.opacity = 0; // 不使用实体光锥，避免遮挡文字和工作台
      bulbEmitterMat.color.lerpColors(new THREE.Color(0x2a241d), new THREE.Color(0xfff0cf), level);
      bokehSprites.forEach((b) => {
        b.sprite.material.opacity = level * 0.55;
      });
    }

    function updateActiveNavLink(routeKey) {
      document.querySelectorAll('.nav-link').forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.route === routeKey);
        if (btn.dataset.route === routeKey) {
          btn.classList.remove('text-[#F2E9DC]/65');
          btn.classList.add('text-[#F2E9DC]');
        } else {
          btn.classList.add('text-[#F2E9DC]/65');
        }
      });
    }

    function completeIntroAndSettle() {
      if (masterTimeline) masterTimeline.pause();
      currentRoute = 'HOME';
      setWorkspaceMode(false);
      updateActiveNavLink('home');

      setLampIllumination(1.0);
      screenState.power = 1.0;
      screenState.typedLines = CODE_LINES.length;
      screenCyanGlow.intensity = 0.48;
      holoState.energy = 0.65;

      gsap.to(camRig, {
        posX: CAMERA_SHOTS.HERO_HOME.pos.x,
        posY: CAMERA_SHOTS.HERO_HOME.pos.y,
        posZ: CAMERA_SHOTS.HERO_HOME.pos.z,
        lookX: CAMERA_SHOTS.HERO_HOME.look.x,
        lookY: CAMERA_SHOTS.HERO_HOME.look.y,
        lookZ: CAMERA_SHOTS.HERO_HOME.look.z,
        parallaxWeight: 1.0,
        duration: 1.0,
        ease: 'power3.out'
      });

      btnSkipIntro.classList.add('hidden');
      heroSection.classList.remove('opacity-0', 'translate-y-4');
      bottomBar.classList.remove('opacity-0');
    }

    function startCinematicIntro() {
      if (prefersReducedMotion) {
        completeIntroAndSettle();
        return;
      }

      if (masterTimeline) masterTimeline.kill();
      currentRoute = 'INTRO';
      setWorkspaceMode(false);
      btnSkipIntro.classList.remove('hidden');
      heroSection.classList.add('opacity-0', 'translate-y-4');
      bottomBar.classList.add('opacity-0');
      bookControlsBar.classList.add('hidden');
      bookControlsBar.classList.remove('flex');

      // 初始化暗场与远景侧向机位
      camRig.posX = CAMERA_SHOTS.INTRO_START.pos.x;
      camRig.posY = CAMERA_SHOTS.INTRO_START.pos.y;
      camRig.posZ = CAMERA_SHOTS.INTRO_START.pos.z;
      camRig.lookX = CAMERA_SHOTS.INTRO_START.look.x;
      camRig.lookY = CAMERA_SHOTS.INTRO_START.look.y;
      camRig.lookZ = CAMERA_SHOTS.INTRO_START.look.z;
      camRig.parallaxWeight = 0.0;

      setLampIllumination(0.0);
      screenState.power = 0.1;
      screenState.typedLines = 0.0;
      screenCyanGlow.intensity = 0.05;
      holoState.energy = 0.0;

      const lampProxy = { v: 0 };

      masterTimeline = gsap.timeline({
        onComplete: () => completeIntroAndSettle()
      });

      // 0.0s – 1.5s: 从柔和暗场渐入，镜头沿弧线缓慢靠近工作室
      masterTimeline.to(camRig, {
        posX: -1.42,
        posY: 1.02,
        posZ: 2.52,
        lookX: 0.16,
        lookY: 0.35,
        lookZ: -0.14,
        duration: 1.5,
        ease: 'sine.inOut'
      }, 0.0);

      // 1.5s – 3.0s: 台灯渐亮，2850K 暖光照亮胡桃木书桌，显示器产生细微冷光
      masterTimeline.call(() => SoundEngine.playClick(780), null, 1.5);
      masterTimeline.to(lampProxy, {
        v: 1.0,
        duration: 1.5,
        ease: 'power2.out',
        onUpdate: () => setLampIllumination(lampProxy.v)
      }, 1.5);

      masterTimeline.to(screenCyanGlow, {
        intensity: 0.48,
        duration: 1.5,
        ease: 'power2.out'
      }, 1.5);

      // 3.0s – 4.5s: 显示器点亮开发环境，C++20 / CUDA 代码逐行克制显现
      masterTimeline.to(screenState, {
        power: 1.0,
        typedLines: CODE_LINES.length,
        duration: 1.5,
        ease: 'power2.out'
      }, 3.0);

      // 4.5s – 6.0s: 书页轻轻翻动，全息知识切片缓缓升起，镜头滑向最终三分之二侧向构图
      masterTimeline.call(() => {
        if (currentSpread === 0) flipBookSpread(1, false);
        else flipBookSpread(-1, false);
      }, null, 4.5);

      masterTimeline.to(holoState, {
        energy: 0.65,
        duration: 1.5,
        ease: 'power2.out'
      }, 4.6);

      masterTimeline.to(camRig, {
        posX: CAMERA_SHOTS.HERO_HOME.pos.x,
        posY: CAMERA_SHOTS.HERO_HOME.pos.y,
        posZ: CAMERA_SHOTS.HERO_HOME.pos.z,
        lookX: CAMERA_SHOTS.HERO_HOME.look.x,
        lookY: CAMERA_SHOTS.HERO_HOME.look.y,
        lookZ: CAMERA_SHOTS.HERO_HOME.look.z,
        parallaxWeight: 1.0,
        duration: 2.3,
        ease: 'power3.out'
      }, 4.5);

      // 6.0s – 7.2s: 主标题、副标题与交互按钮按层级优雅淡入
      masterTimeline.call(() => {
        btnSkipIntro.classList.add('hidden');
        heroSection.classList.remove('opacity-0', 'translate-y-4');
        bottomBar.classList.remove('opacity-0');
      }, null, 6.0);
    }

    /**
     * 网站导航与 3D 器物聚焦的无缝过渡（禁止黑屏硬切）
     */
    function navigateToSection(section) {
      if (currentRoute === 'INTRO') completeIntroAndSettle();
      currentRoute = section;
      if (section === 'WORKSPACE') updateActiveNavLink('home');
      else updateActiveNavLink(section.toLowerCase());
      setWorkspaceMode(section === 'WORKSPACE');
      gsap.to(holoState, { energy: section === 'WORKSPACE' ? 0.33 : 0.65, duration: 0.9, ease: 'power2.out' });

      // 先收起弹窗
      projectsModal.classList.add('opacity-0', 'pointer-events-none');
      projectsDialog.classList.add('scale-95');
      aboutModal.classList.add('opacity-0', 'pointer-events-none');
      aboutDialog.classList.add('scale-95');
      manuscriptDrawer.classList.add('translate-x-full');

      if (section === 'HOME') {
        heroSection.classList.remove('opacity-0', 'translate-y-4');
        bookControlsBar.classList.add('hidden');
        bookControlsBar.classList.remove('flex');

        gsap.to(camRig, {
          posX: CAMERA_SHOTS.HERO_HOME.pos.x,
          posY: CAMERA_SHOTS.HERO_HOME.pos.y,
          posZ: CAMERA_SHOTS.HERO_HOME.pos.z,
          lookX: CAMERA_SHOTS.HERO_HOME.look.x,
          lookY: CAMERA_SHOTS.HERO_HOME.look.y,
          lookZ: CAMERA_SHOTS.HERO_HOME.look.z,
          parallaxWeight: 1.0,
          duration: 1.2,
          ease: 'power3.inOut'
        });
      } else if (section === 'WORKSPACE') {
        SoundEngine.playClick(680);
        heroSection.classList.add('opacity-0', 'translate-y-4');
        bookControlsBar.classList.add('hidden');
        bookControlsBar.classList.remove('flex');
        gsap.to(camRig, {
          posX: CAMERA_SHOTS.FIRST_PERSON.pos.x,
          posY: CAMERA_SHOTS.FIRST_PERSON.pos.y,
          posZ: CAMERA_SHOTS.FIRST_PERSON.pos.z,
          lookX: CAMERA_SHOTS.FIRST_PERSON.look.x,
          lookY: CAMERA_SHOTS.FIRST_PERSON.look.y,
          lookZ: CAMERA_SHOTS.FIRST_PERSON.look.z,
          parallaxWeight: 0.36,
          duration: prefersReducedMotion ? 0.15 : 1.65,
          ease: 'power3.inOut'
        });
      } else if (section === 'PROJECTS') {
        SoundEngine.playClick(880);
        updateLearningConsole();
        heroSection.classList.add('opacity-0', 'translate-y-4');
        bookControlsBar.classList.add('hidden');
        bookControlsBar.classList.remove('flex');

        gsap.to(camRig, {
          posX: CAMERA_SHOTS.PROJECTS_MONITOR.pos.x,
          posY: CAMERA_SHOTS.PROJECTS_MONITOR.pos.y,
          posZ: CAMERA_SHOTS.PROJECTS_MONITOR.pos.z,
          lookX: CAMERA_SHOTS.PROJECTS_MONITOR.look.x,
          lookY: CAMERA_SHOTS.PROJECTS_MONITOR.look.y,
          lookZ: CAMERA_SHOTS.PROJECTS_MONITOR.look.z,
          parallaxWeight: 0.15,
          duration: 1.15,
          ease: 'power3.inOut',
          onComplete: () => {
            if (currentRoute === 'PROJECTS') {
              projectsModal.classList.remove('opacity-0', 'pointer-events-none');
              projectsDialog.classList.remove('scale-95');
            }
          }
        });
      } else if (section === 'KNOWLEDGE') {
        SoundEngine.playPageFlip(true);
        heroSection.classList.add('opacity-0', 'translate-y-4');
        bookControlsBar.classList.remove('hidden');
        bookControlsBar.classList.add('flex');

        gsap.to(camRig, {
          posX: CAMERA_SHOTS.KNOWLEDGE_BOOK.pos.x,
          posY: CAMERA_SHOTS.KNOWLEDGE_BOOK.pos.y,
          posZ: CAMERA_SHOTS.KNOWLEDGE_BOOK.pos.z,
          lookX: CAMERA_SHOTS.KNOWLEDGE_BOOK.look.x,
          lookY: CAMERA_SHOTS.KNOWLEDGE_BOOK.look.y,
          lookZ: CAMERA_SHOTS.KNOWLEDGE_BOOK.look.z,
          parallaxWeight: 0.2,
          duration: 1.2,
          ease: 'power3.inOut'
        });
      } else if (section === 'ABOUT') {
        SoundEngine.playClick(660);
        heroSection.classList.add('opacity-0', 'translate-y-4');
        bookControlsBar.classList.add('hidden');
        bookControlsBar.classList.remove('flex');

        gsap.to(camRig, {
          posX: CAMERA_SHOTS.ABOUT_STUDIO.pos.x,
          posY: CAMERA_SHOTS.ABOUT_STUDIO.pos.y,
          posZ: CAMERA_SHOTS.ABOUT_STUDIO.pos.z,
          lookX: CAMERA_SHOTS.ABOUT_STUDIO.look.x,
          lookY: CAMERA_SHOTS.ABOUT_STUDIO.look.y,
          lookZ: CAMERA_SHOTS.ABOUT_STUDIO.look.z,
          parallaxWeight: 0.25,
          duration: 1.1,
          ease: 'power3.inOut',
          onComplete: () => {
            if (currentRoute === 'ABOUT') {
              aboutModal.classList.remove('opacity-0', 'pointer-events-none');
              aboutDialog.classList.remove('scale-95');
            }
          }
        });
      }
    }


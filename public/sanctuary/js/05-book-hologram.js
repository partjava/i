    /**
     * ============================================================================
     * 7. HARDCOVER TECHNICAL BOOK, LAYERED PAPER EDGES & HOLOGRAPHIC KNOWLEDGE PANES
     * (置于左前景偏中位置，与右侧键盘和后方显示器形成自然视觉引导线，复刻参考图1与图2精髓)
     * ============================================================================
     */
    const PAGE_W = 0.34;
    const PAGE_H = 0.46;

    const bookGroup = new THREE.Group();
    bookGroup.position.set(-0.22, 0.004, 0.28);
    bookGroup.rotation.y = 0.24;
    studioGroup.add(bookGroup);

    addContactShadow(bookGroup, PAGE_W * 2.35, PAGE_H * 1.22, 0, 0, 0.78);

    // 生成多层书页侧面纸张叠压条纹纹理（呼应参考图2真实的厚书页层次）
    function createPaperStackEdgeTexture() {
      const c = document.createElement('canvas');
      c.width = 256; c.height = 128;
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#dfd3be';
      ctx.fillRect(0, 0, 256, 128);
      for (let y = 0; y < 128; y += 3) {
        ctx.fillStyle = y % 6 === 0 ? 'rgba(65, 48, 32, 0.28)' : 'rgba(255, 250, 240, 0.35)';
        ctx.fillRect(0, y, 256, 1.5);
      }
      const tex = new THREE.CanvasTexture(c);
      tex.encoding = THREE.sRGBEncoding;
      return tex;
    }
    const paperStackEdgeTex = createPaperStackEdgeTexture();

    // 生成温暖米白（#EAE0D0，绝不过曝惨白）的高清书页纹理
    function renderManuscriptPageTexture(data, isLeft) {
      const c = document.createElement('canvas');
      c.width = 768; c.height = 1024;
      const ctx = c.getContext('2d');

      // 温暖米白/象牙色纸张基底（拒绝刺眼纯白）
      ctx.fillStyle = '#EAE0D0';
      ctx.fillRect(0, 0, c.width, c.height);

      // 细微纸张纤维质感与边缘暗角
      const edgeGrad = ctx.createRadialGradient(384, 512, 220, 384, 512, 620);
      edgeGrad.addColorStop(0, 'rgba(234, 224, 208, 0)');
      edgeGrad.addColorStop(1, 'rgba(168, 146, 118, 0.22)');
      ctx.fillStyle = edgeGrad;
      ctx.fillRect(0, 0, c.width, c.height);

      // 书脊中缝立体阴影
      const spineGrad = ctx.createLinearGradient(
        isLeft ? c.width : 0, 0,
        isLeft ? c.width - 135 : 135, 0
      );
      spineGrad.addColorStop(0, 'rgba(32, 22, 14, 0.36)');
      spineGrad.addColorStop(0.4, 'rgba(32, 22, 14, 0.10)');
      spineGrad.addColorStop(1, 'rgba(32, 22, 14, 0.0)');
      ctx.fillStyle = spineGrad;
      ctx.fillRect(0, 0, c.width, c.height);

      // 页眉与页码
      ctx.fillStyle = '#6e553c';
      ctx.font = '600 17px "JetBrains Mono", monospace';
      ctx.fillText(data.chapter, 68, 76);
      ctx.fillText(String(data.page).padStart(2, '0'), c.width - 96, 76);

      ctx.strokeStyle = 'rgba(140, 105, 68, 0.38)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(68, 94);
      ctx.lineTo(c.width - 68, 94);
      ctx.stroke();

      // 章节主标题
      ctx.fillStyle = '#231810';
      ctx.font = 'bold 30px "Noto Serif SC", serif';
      ctx.fillText(data.title, 68, 148);

      // 引言卡片
      ctx.fillStyle = 'rgba(180, 140, 88, 0.14)';
      ctx.fillRect(68, 174, c.width - 136, 54);
      ctx.fillStyle = '#9c6e38';
      ctx.fillRect(68, 174, 4, 54);
      ctx.fillStyle = '#4a3523';
      ctx.font = 'italic 19px "Noto Serif SC", serif';
      ctx.fillText(data.quote, 86, 208);

      // 技术要点
      ctx.fillStyle = '#2e2118';
      ctx.font = '400 19px Inter, sans-serif';
      let cy = 272;
      data.points.forEach((pt) => {
        ctx.fillText(pt.slice(0, 31), 68, cy);
        if (pt.length > 31) {
          cy += 28;
          ctx.fillText('   ' + pt.slice(31), 68, cy);
        }
        cy += 40;
      });

      // 嵌入式代码框
      if (data.code) {
        cy += 6;
        const boxH = data.code.length * 30 + 28;
        ctx.fillStyle = '#1b1e24';
        ctx.fillRect(68, cy, c.width - 136, boxH);
        ctx.strokeStyle = '#b58d52';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(68, cy, c.width - 136, boxH);

        ctx.fillStyle = '#67D9D2';
        ctx.font = '500 16px "JetBrains Mono", monospace';
        data.code.forEach((line, idx) => {
          ctx.fillText(line, 86, cy + 28 + idx * 28);
        });
        cy += boxH + 30;
      }

      // 底部金色电路拓扑与几何推演示意图
      const diagY = Math.max(cy, 640);
      const diagH = 220;
      ctx.strokeStyle = 'rgba(125, 92, 58, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(68, diagY, c.width - 136, diagH);

      ctx.strokeStyle = '#9c6b30';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let x = 0; x <= 520; x += 10) {
        const py = diagY + 110 + Math.sin(x * 0.03 + data.page) * 48 * Math.exp(-x * 0.0012);
        if (x === 0) ctx.moveTo(110 + x, py);
        else ctx.lineTo(110 + x, py);
      }
      ctx.stroke();

      ctx.fillStyle = '#7a5c3e';
      ctx.font = '500 15px "JetBrains Mono", monospace';
      ctx.fillText(`SANCTUARY MANUSCRIPT // FOLIO ${String(data.page).padStart(2, '0')}`, 68, 945);

      const tex = new THREE.CanvasTexture(c);
      tex.encoding = THREE.sRGBEncoding;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      return tex;
    }

    const manuscriptTextures = MANUSCRIPT_PAGES.map((p, idx) => renderManuscriptPageTexture(p, idx % 2 === 0));

    // 深咖亚麻精装书封皮与黄铜包角
    const coverMat = new THREE.MeshStandardMaterial({ color: 0x241914, roughness: 0.65, metalness: 0.08 });
    const leftBoard = new THREE.Mesh(new THREE.BoxGeometry(PAGE_W + 0.022, 0.01, PAGE_H + 0.026), coverMat);
    leftBoard.position.set(-PAGE_W / 2 - 0.004, 0.005, 0);
    leftBoard.castShadow = true;
    leftBoard.receiveShadow = true;
    bookGroup.add(leftBoard);

    const rightBoard = new THREE.Mesh(new THREE.BoxGeometry(PAGE_W + 0.022, 0.01, PAGE_H + 0.026), coverMat);
    rightBoard.position.set(PAGE_W / 2 + 0.004, 0.005, 0);
    rightBoard.castShadow = true;
    rightBoard.receiveShadow = true;
    bookGroup.add(rightBoard);

    const spineHub = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, PAGE_H + 0.026, 20), brushedBrassMat);
    spineHub.rotation.x = Math.PI / 2;
    spineHub.position.set(0, 0.005, 0);
    bookGroup.add(spineHub);

    // 真实多层纸张厚度底座（带侧面纸纹）
    const stackMat = new THREE.MeshStandardMaterial({
      map: paperStackEdgeTex,
      roughness: 0.78,
      metalness: 0.02
    });
    const leftPaperStack = new THREE.Mesh(new THREE.BoxGeometry(PAGE_W, 0.028, PAGE_H), stackMat);
    leftPaperStack.position.set(-PAGE_W / 2, 0.022, 0);
    leftPaperStack.castShadow = true;
    leftPaperStack.receiveShadow = true;
    bookGroup.add(leftPaperStack);

    const rightPaperStack = new THREE.Mesh(new THREE.BoxGeometry(PAGE_W, 0.028, PAGE_H), stackMat);
    rightPaperStack.position.set(PAGE_W / 2, 0.022, 0);
    rightPaperStack.castShadow = true;
    rightPaperStack.receiveShadow = true;
    bookGroup.add(rightPaperStack);

    // 高细分海鸥翼曲面书页网格
    function buildCurvedPageGeometry() {
      const geo = new THREE.PlaneGeometry(PAGE_W, PAGE_H, 42, 26);
      geo.rotateX(-Math.PI / 2);
      const pos = geo.attributes.position;
      const uArr = new Float32Array(pos.count);
      const vArr = new Float32Array(pos.count);
      for (let i = 0; i < pos.count; i++) {
        uArr[i] = THREE.MathUtils.clamp((pos.getX(i) + PAGE_W / 2) / PAGE_W, 0, 1);
        vArr[i] = THREE.MathUtils.clamp((pos.getZ(i) + PAGE_H / 2) / PAGE_H, 0, 1);
      }
      geo.userData.uArr = uArr;
      geo.userData.vArr = vArr;
      return geo;
    }

    const leftSheetGeo = buildCurvedPageGeometry();
    const rightSheetGeo = buildCurvedPageGeometry();

    function applyGullWingCurve(geo, side, cornerLift = 0) {
      const pos = geo.attributes.position;
      const uArr = geo.userData.uArr;
      const vArr = geo.userData.vArr;
      for (let i = 0; i < pos.count; i++) {
        const u = uArr[i];
        const v = vArr[i];
        const spineDist = side === 1 ? u : (1 - u);
        const x = side === 1 ? u * PAGE_W : -(1 - u) * PAGE_W;
        const z = (v - 0.5) * PAGE_H;
        // 真实海鸥翼隆起与边缘微垂
        const arch = Math.sin(spineDist * Math.PI * 0.86) * 0.024 * (1 - spineDist * 0.18);
        const peel = cornerLift * Math.pow(spineDist, 2.1) * Math.pow(v, 1.7) * 0.036;
        pos.setXYZ(i, x, 0.036 + arch + peel, z);
      }
      pos.needsUpdate = true;
      geo.computeVertexNormals();
    }

    const leftSheetMat = new THREE.MeshStandardMaterial({
      map: manuscriptTextures[0],
      roughness: 0.76,
      metalness: 0.02,
      side: THREE.DoubleSide
    });
    const rightSheetMat = new THREE.MeshStandardMaterial({
      map: manuscriptTextures[1],
      roughness: 0.76,
      metalness: 0.02,
      side: THREE.DoubleSide
    });

    const leftSheetMesh = new THREE.Mesh(leftSheetGeo, leftSheetMat);
    leftSheetMesh.receiveShadow = true;
    leftSheetMesh.userData.interactiveType = 'BOOK_LEFT';
    bookGroup.add(leftSheetMesh);

    const rightSheetMesh = new THREE.Mesh(rightSheetGeo, rightSheetMat);
    rightSheetMesh.receiveShadow = true;
    rightSheetMesh.userData.interactiveType = 'BOOK_RIGHT';
    bookGroup.add(rightSheetMesh);

    applyGullWingCurve(leftSheetGeo, -1, 0);
    applyGullWingCurve(rightSheetGeo, 1, 0);

    // 动态翻页双面曲面网格
    const flipPivotGroup = new THREE.Group();
    flipPivotGroup.visible = false;
    bookGroup.add(flipPivotGroup);

    const flipFrontGeo = buildCurvedPageGeometry();
    const flipBackGeo = buildCurvedPageGeometry();
    const flipFrontMat = new THREE.MeshStandardMaterial({ map: manuscriptTextures[1], roughness: 0.74, side: THREE.FrontSide });
    const flipBackMat = new THREE.MeshStandardMaterial({ map: manuscriptTextures[2], roughness: 0.74, side: THREE.BackSide });

    const flipFrontMesh = new THREE.Mesh(flipFrontGeo, flipFrontMat);
    const flipBackMesh = new THREE.Mesh(flipBackGeo, flipBackMat);
    flipFrontMesh.castShadow = true;
    flipPivotGroup.add(flipFrontMesh);
    flipPivotGroup.add(flipBackMesh);

    function deformFlippingSheet(t) {
      const posF = flipFrontGeo.attributes.position;
      const posB = flipBackGeo.attributes.position;
      const uArr = flipFrontGeo.userData.uArr;
      const vArr = flipFrontGeo.userData.vArr;

      for (let i = 0; i < posF.count; i++) {
        const u = uArr[i];
        const v = vArr[i];
        const lag = (1 - v) * 0.12 * Math.sin(t * Math.PI);
        const localT = THREE.MathUtils.clamp(t - lag, 0, 1);
        const theta = localT * Math.PI;
        const sWave = Math.sin(localT * Math.PI) * Math.sin(u * Math.PI * 0.85) * 0.30;
        const effAngle = THREE.MathUtils.clamp(theta - sWave * 0.48, 0, Math.PI);

        const r = u * PAGE_W;
        const x = Math.cos(effAngle) * r;
        const gull = Math.sin(u * Math.PI * 0.86) * 0.022 * Math.abs(Math.cos(theta));
        const lift = Math.sin(effAngle) * r * 0.68 + Math.sin(localT * Math.PI) * u * 0.042;
        const y = 0.038 + gull + lift;
        const z = (v - 0.5) * PAGE_H;

        posF.setXYZ(i, x, y, z);
        posB.setXYZ(i, x, y - 0.001, z);
      }
      posF.needsUpdate = true;
      posB.needsUpdate = true;
      flipFrontGeo.computeVertexNormals();
      flipBackGeo.computeVertexNormals();
    }

    /**
     * ============================================================================
     * 7.B SPATIAL LAYERED HOLOGRAPHIC TECHNICAL UI (1个主卡片 + 2个辅助卡片)
     * 风格：Premium Holographic Technical UI · Glassmorphism · Subtle Cyan Edge Glow
     * 与当前打开的书本章节实时同步，呈现“知识从书页中投射而出”的空间层次感
     * ============================================================================
     */
    const holoProjectionGroup = new THREE.Group();
    bookGroup.add(holoProjectionGroup);

    // 针对 5 个 Chapter 跨页（Pages 01-02, 03-04, 05-06, 07-08, 09-10）定制真实 C++ 数据结构指标、专属结构图与代码摘要
    const HOLO_SPREAD_SPECS = [
      {
        // Spread 0: Chapter I (Pages 01 - 02 · 线性表、栈与队列)
        visualType: 'linear',
        main: {
          tag: 'CHAPTER I // LISTS, STACKS & QUEUES',
          concept: 'std::vector, Doubly-List & Monotonic Deque',
          summary: '动态数组倍增扩容均摊 O(1) · 双向链表指针拓扑与单调队列滑动窗口极值',
          code: [
            'while (!dq.empty() && a[dq.back()] <= a[i]) dq.pop_back();',
            'dq.push_back(i);',
            'if (dq.front() <= i - k) dq.pop_front();'
          ],
          metrics: [
            { k: 'VECTOR CAP', v: '2.0x Amortized' },
            { k: 'LIST INSERT', v: 'O(1) Pointer' },
            { k: 'SLIDING WIN', v: 'O(n) Monotonic' }
          ],
          nodes: ['Head Ptr', 'Prev/Next', 'MonoDeque', 'Tail Ptr']
        },
        auxLeft: {
          tag: 'CH.01 // CONTIGUOUS VS LINKED',
          title: 'Cache-Line Locality',
          subtitle: 'std::vector vs std::list',
          mode: 'linear_blocks',
          statA: 'L1 HIT: 98.4%',
          statB: 'ALLOC: Continuous',
          series: [0.95, 0.92, 0.89, 0.94, 0.35, 0.28, 0.31]
        },
        auxRight: {
          tag: 'CH.01 // MONOTONIC WINDOW',
          title: 'O(n) vs Brute-Force O(nk)',
          subtitle: 'Deque Amortized 1-Push/1-Pop',
          mode: 'chart',
          statA: 'TIME: O(n) Linear',
          statB: 'SPACE: O(k) Deque',
          series: [0.18, 0.22, 0.25, 0.27, 0.29, 0.31, 0.32]
        }
      },
      {
        // Spread 1: Chapter II (Pages 03 - 04 · 串与模式匹配、数组、特殊矩阵与广义表)
        visualType: 'kmp_csr',
        main: {
          tag: 'CHAPTER II // STRINGS, KMP & SPARSE MATRIX',
          concept: 'KMP Prefix Automaton & CSR Matrix',
          summary: 'KMP 前缀 next 数组零回溯匹配 · CSR 稀疏矩阵三元组高维压缩存储',
          code: [
            'while (j > 0 && text[i] != pat[j]) j = next[j - 1];',
            'if (text[i] == pat[j]) ++j;',
            'y[r] += csr.val[k] * x[csr.col_idx[k]];'
          ],
          metrics: [
            { k: 'KMP MATCH', v: 'O(n + m) Time' },
            { k: 'SSO STRING', v: '≤15B In-Stack' },
            { k: 'CSR MATRIX', v: 'O(nnz) Space' }
          ],
          nodes: ['MainStr', 'Next[j-1]', 'TrieNode', 'CSR RowPtr']
        },
        auxLeft: {
          tag: 'CH.02 // KMP NEXT AUTOMATON',
          title: 'Prefix Border Jump',
          subtitle: 'Zero Backtracking on Text[i]',
          mode: 'kmp_automaton',
          statA: 'STATES: m Nodes',
          statB: 'BACKTRACK: 0',
          series: [0.25, 0.50, 0.75, 0.40, 0.65, 0.85, 0.95]
        },
        auxRight: {
          tag: 'CH.02 // CSR SPARSE FORMAT',
          title: 'Sparse Matrix SpMV Gain',
          subtitle: 'RowPtr + ColIdx + Values',
          mode: 'chart',
          statA: 'DENSITY: 1.8% NNZ',
          statB: 'MEM SAVE: -91.4%',
          series: [0.28, 0.45, 0.62, 0.74, 0.83, 0.90, 0.96]
        }
      },
      {
        // Spread 2: Chapter III (Pages 05 - 06 · 树与二叉树、堆与优先队列)
        visualType: 'binary_heap',
        main: {
          tag: 'CHAPTER III // BINARY TREES & HEAPS',
          concept: 'Iterative Traversal, Huffman & Binary Heap',
          summary: '显式栈非递归遍历与并查集路径压缩 · Floyd O(n) 建堆与 Top-K 优先队列',
          code: [
            'int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }',
            'for (int i = n / 2 - 1; i >= 0; --i) siftDown(heap, i, n);',
            'pq.push(node); // std::priority_queue'
          ],
          metrics: [
            { k: 'HEAPIFY', v: 'O(n) Floyd' },
            { k: 'TOP-K PUSH', v: 'O(log K) Sift' },
            { k: 'UNION-FIND', v: 'O(α(n)) Const' }
          ],
          nodes: ['Root [0]', 'Left 2i+1', 'Right 2i+2', 'SiftDown']
        },
        auxLeft: {
          tag: 'CH.03 // TREE & BINARY HEAP',
          title: 'Complete Binary Tree Array',
          subtitle: 'Parent (i-1)/2 · Child 2i+1',
          mode: 'tree_topology',
          statA: 'WPL: Optimal',
          statB: 'HEIGHT: ⌊log2 N⌋',
          series: [0.92, 0.86, 0.78, 0.72, 0.68, 0.64, 0.60]
        },
        auxRight: {
          tag: 'CH.03 // FLOYD BUILD HEAP',
          title: 'O(n) vs O(n log n) Proof',
          subtitle: 'Sum(h / 2^h) Converges to 2',
          mode: 'chart',
          statA: 'BUILD: O(n) Exact',
          statB: 'EXTRACT: O(log n)',
          series: [0.32, 0.48, 0.61, 0.73, 0.82, 0.89, 0.95]
        }
      },
      {
        // Spread 3: Chapter IV (Pages 07 - 08 · 查找表与平衡搜索树 + 散列表与 LRU 缓存)
        visualType: 'rbtree_hash',
        main: {
          tag: 'CHAPTER IV // RB-TREE & HASH TABLE',
          concept: 'Red-Black Tree Rotations & O(1) LRU Cache',
          summary: 'AVL 四种旋转与红黑树五性质平衡 · 拉链法 Rehash 与哈希双向链表 LRU',
          code: [
            'Node* y = x->right; x->right = y->left; // Left Rotate',
            'y->left = x; x->parent = y;',
            'lru_list_.splice(lru_list_.begin(), lru_list_, it->second);'
          ],
          metrics: [
            { k: 'RB-TREE ROT', v: '≤3 Rot / Del' },
            { k: 'B+ TREE', v: 'Leaf Linked' },
            { k: 'LRU CACHE', v: 'O(1) Splice' }
          ],
          nodes: ['BST/AVL', 'RB-Node', 'HashBucket', 'LRU Head']
        },
        auxLeft: {
          tag: 'CH.04 // RED-BLACK & B+ TREE',
          title: 'RB-Tree Rotation Balance',
          subtitle: 'Max Depth ≤ 2·log2(N+1)',
          mode: 'rbtree_buckets',
          statA: 'LOOKUP: O(log N)',
          statB: 'ROTATIONS: ≤2 Ins',
          series: [0.48, 0.52, 0.50, 0.54, 0.49, 0.51, 0.50]
        },
        auxRight: {
          tag: 'CH.04 // HASH BUCKET & LRU',
          title: 'Load Factor & O(1) Splice',
          subtitle: 'unordered_map + list::splice',
          mode: 'chart',
          statA: 'ALPHA: 0.75 Max',
          statB: 'HIT LATENCY: O(1)',
          series: [0.88, 0.76, 0.58, 0.42, 0.34, 0.28, 0.24]
        }
      },
      {
        // Spread 4: Chapter V (Pages 09 - 10 · 排序算法体系 + 图论及其算法)
        visualType: 'sort_graph',
        main: {
          tag: 'CHAPTER V // INTROSORT & GRAPH ALGORITHMS',
          concept: 'std::sort IntroSort & Heap-Dijkstra',
          summary: '快排+堆排+插排三合一内省排序 · Kruskal 最小生成树与 Dijkstra 最短路松弛',
          code: [
            'if (depth_limit == 0) { heapSort(first, last); return; }',
            'for (auto [v, w] : adj[u])',
            '  if (dist[u] + w < dist[v]) pq.emplace(dist[v] = dist[u] + w, v);'
          ],
          metrics: [
            { k: 'INTROSORT', v: 'O(N log N) Worst' },
            { k: 'DIJKSTRA', v: 'O((V+E)logV)' },
            { k: 'KRUSKAL MST', v: 'O(E log E) UF' }
          ],
          nodes: ['Partition', 'HeapFallback', 'DijkstraPQ', 'TopoDAG']
        },
        auxLeft: {
          tag: 'CH.05 // HYBRID INTROSORT',
          title: 'Quick + Heap + Insertion',
          subtitle: 'Depth Limit 2·⌊log2 N⌋',
          mode: 'sort_bars',
          statA: 'THRESHOLD: ≤16 Ins',
          statB: 'WORST: O(N log N)',
          series: [0.35, 0.68, 0.46, 0.88, 0.58, 0.95, 0.74]
        },
        auxRight: {
          tag: 'CH.05 // SHORTEST PATH & MST',
          title: 'Edge Relaxation Convergence',
          subtitle: 'PriorityQueue Dijkstra + Kahn DAG',
          mode: 'chart',
          statA: 'RELAX: Greedy PQ',
          statB: 'DAG: Zero-Cycle',
          series: [0.22, 0.44, 0.63, 0.77, 0.86, 0.93, 0.98]
        }
      }
    ];

    // 圆角路径辅助函数
    function traceRoundedRect(ctx, x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
    }

    // 绘制玻璃拟态背景、内部细网格、技术标尺刻度与极细青色发光描边
    function drawGlassmorphicCardBase(ctx, w, h, radius, isPrimary) {
      ctx.clearRect(0, 0, w, h);
      const pad = 18;
      const cw = w - pad * 2;
      const ch = h - pad * 2;

      // 1. 外围柔和青色边缘辉光 (Subtle Cyan Edge Glow)
      ctx.save();
      traceRoundedRect(ctx, pad, pad, cw, ch, radius);
      ctx.shadowColor = 'rgba(103, 217, 210, 0.38)';
      ctx.shadowBlur = isPrimary ? 18 : 12;
      ctx.fillStyle = 'rgba(11, 18, 25, 0.82)';
      ctx.fill();
      ctx.restore();

      // 2. 玻璃拟态渐变填充 (Translucent Glassmorphism)
      ctx.save();
      traceRoundedRect(ctx, pad, pad, cw, ch, radius);
      ctx.clip();

      const glassGrad = ctx.createLinearGradient(pad, pad, pad + cw * 0.6, pad + ch);
      if (isPrimary) {
        glassGrad.addColorStop(0, 'rgba(18, 30, 40, 0.88)');
        glassGrad.addColorStop(0.55, 'rgba(12, 20, 28, 0.82)');
        glassGrad.addColorStop(1, 'rgba(16, 26, 34, 0.86)');
      } else {
        glassGrad.addColorStop(0, 'rgba(15, 25, 34, 0.74)');
        glassGrad.addColorStop(1, 'rgba(10, 17, 24, 0.68)');
      }
      ctx.fillStyle = glassGrad;
      ctx.fillRect(pad, pad, cw, ch);

      // 顶部微妙光泽反射带
      const sheenGrad = ctx.createLinearGradient(pad, pad, pad + cw, pad + 70);
      sheenGrad.addColorStop(0, 'rgba(103, 217, 210, 0.12)');
      sheenGrad.addColorStop(0.5, 'rgba(242, 233, 220, 0.04)');
      sheenGrad.addColorStop(1, 'rgba(103, 217, 210, 0.0)');
      ctx.fillStyle = sheenGrad;
      ctx.fillRect(pad, pad, cw, 70);

      // 3. 内部细微技术网格 (Internal Fine Technical Grid)
      const gridStep = isPrimary ? 28 : 24;
      ctx.strokeStyle = 'rgba(103, 217, 210, 0.045)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let gx = pad + gridStep; gx < pad + cw; gx += gridStep) {
        ctx.moveTo(gx, pad);
        ctx.lineTo(gx, pad + ch);
      }
      for (let gy = pad + gridStep; gy < pad + ch; gy += gridStep) {
        ctx.moveTo(pad, gy);
        ctx.lineTo(pad + cw, gy);
      }
      ctx.stroke();

      // 4. 顶部与右侧技术标尺刻度线 (Technical Ruler Ticks)
      ctx.strokeStyle = 'rgba(103, 217, 210, 0.22)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let rx = pad + 24; rx < pad + cw - 24; rx += 12) {
        const tickH = (rx % 48 === 0) ? 6 : 3;
        ctx.moveTo(rx, pad + ch - 2);
        ctx.lineTo(rx, pad + ch - 2 - tickH);
      }
      for (let ry = pad + 48; ry < pad + ch - 32; ry += 12) {
        const tickW = (ry % 48 === 0) ? 6 : 3;
        ctx.moveTo(pad + cw - 2, ry);
        ctx.lineTo(pad + cw - 2 - tickW, ry);
      }
      ctx.stroke();

      // 四角精密十字准星标记 (Precision Corner Reticles)
      const corners = [
        [pad + 12, pad + 12],
        [pad + cw - 12, pad + 12],
        [pad + 12, pad + ch - 12],
        [pad + cw - 12, pad + ch - 12]
      ];
      ctx.strokeStyle = 'rgba(212, 173, 114, 0.45)';
      corners.forEach(([cx, cy]) => {
        ctx.beginPath();
        ctx.moveTo(cx - 4, cy);
        ctx.lineTo(cx + 4, cy);
        ctx.moveTo(cx, cy - 4);
        ctx.lineTo(cx, cy + 4);
        ctx.stroke();
      });

      ctx.restore();

      // 5. 极细青色外描边 + 内部微弱金青双色高光边 (Ultra-thin Cyan Edge Stroke)
      traceRoundedRect(ctx, pad, pad, cw, ch, radius);
      const borderGrad = ctx.createLinearGradient(pad, pad, pad + cw, pad + ch);
      borderGrad.addColorStop(0, 'rgba(103, 217, 210, 0.72)');
      borderGrad.addColorStop(0.5, 'rgba(103, 217, 210, 0.28)');
      borderGrad.addColorStop(1, 'rgba(212, 173, 114, 0.48)');
      ctx.strokeStyle = borderGrad;
      ctx.lineWidth = isPrimary ? 1.6 : 1.3;
      ctx.stroke();

      // 顶部高亮细微光条
      ctx.beginPath();
      ctx.moveTo(pad + radius + 12, pad + 0.5);
      ctx.lineTo(pad + cw * 0.42, pad + 0.5);
      ctx.strokeStyle = 'rgba(103, 217, 210, 0.95)';
      ctx.lineWidth = 2.2;
      ctx.stroke();
    }

    // 渲染主全息卡片 (1个主卡片：展示章节标题、知识点摘要、代码摘要、节点结构与指标标签)
    function renderPrimaryHoloCard(canvas, spec) {
      const ctx = canvas.getContext('2d');
      const w = canvas.width;
      const h = canvas.height;
      drawGlassmorphicCardBase(ctx, w, h, 20, true);

      const x0 = 42;
      // 顶部章节与状态标签栏
      ctx.fillStyle = '#67D9D2';
      ctx.font = '600 13px "JetBrains Mono", monospace';
      ctx.fillText(spec.tag, x0, 52);

      // 右上角实时同步指示器
      ctx.fillStyle = 'rgba(103, 217, 210, 0.14)';
      traceRoundedRect(ctx, w - 185, 34, 142, 24, 12);
      ctx.fill();
      ctx.strokeStyle = 'rgba(103, 217, 210, 0.42)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = '#67D9D2';
      ctx.beginPath();
      ctx.arc(w - 169, 46, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#F2E9DC';
      ctx.font = '500 11px "JetBrains Mono", monospace';
      ctx.fillText('SYNC // FOLIO', w - 157, 50);

      // 主概念标题
      ctx.fillStyle = '#F2E9DC';
      ctx.font = '600 22px "Inter", "Noto Serif SC", sans-serif';
      ctx.fillText(spec.concept, x0, 86);

      // 知识点摘要
      ctx.fillStyle = 'rgba(242, 233, 220, 0.74)';
      ctx.font = '400 14px "Inter", sans-serif';
      ctx.fillText(spec.summary, x0, 112);

      // 分隔标尺线
      ctx.strokeStyle = 'rgba(103, 217, 210, 0.18)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x0, 126);
      ctx.lineTo(w - 42, 126);
      ctx.stroke();

      // 左侧：精简代码摘要面板
      const codeX = x0;
      const codeY = 140;
      const codeW = 435;
      const codeH = 114;
      traceRoundedRect(ctx, codeX, codeY, codeW, codeH, 10);
      ctx.fillStyle = 'rgba(7, 12, 17, 0.72)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(103, 217, 210, 0.24)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = '#D4AD72';
      ctx.font = '500 11px "JetBrains Mono", monospace';
      ctx.fillText('C++ STL / KERNEL SNIPPET // LIVE', codeX + 14, codeY + 22);

      ctx.font = '400 13px "JetBrains Mono", monospace';
      spec.code.forEach((line, idx) => {
        ctx.fillStyle = idx === 1 ? '#67D9D2' : 'rgba(242, 233, 220, 0.88)';
        ctx.fillText(line, codeX + 14, codeY + 48 + idx * 24);
      });

      // 右侧：根据当前章节绘制专属 C++ 数据结构拓扑图（链表/KMP/二叉树/红黑树/图论）
      const diagX = codeX + codeW + 16;
      const diagW = w - 42 - diagX;
      traceRoundedRect(ctx, diagX, codeY, diagW, codeH, 10);
      ctx.fillStyle = 'rgba(7, 12, 17, 0.58)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(212, 173, 114, 0.25)';
      ctx.stroke();

      ctx.fillStyle = '#67D9D2';
      ctx.font = '500 11px "JetBrains Mono", monospace';
      ctx.fillText('STRUCTURE TOPOLOGY', diagX + 14, codeY + 22);

      // 4 节点章节专属拓扑连线
      const nCoords = [
        [diagX + 42, codeY + 52],
        [diagX + diagW - 48, codeY + 52],
        [diagX + 42, codeY + 92],
        [diagX + diagW - 48, codeY + 92]
      ];
      ctx.strokeStyle = 'rgba(103, 217, 210, 0.52)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(nCoords[0][0], nCoords[0][1]);
      ctx.lineTo(nCoords[1][0], nCoords[1][1]);
      ctx.moveTo(nCoords[0][0], nCoords[0][1]);
      ctx.lineTo(nCoords[2][0], nCoords[2][1]);
      ctx.moveTo(nCoords[1][0], nCoords[1][1]);
      ctx.lineTo(nCoords[3][0], nCoords[3][1]);
      ctx.moveTo(nCoords[2][0], nCoords[2][1]);
      ctx.lineTo(nCoords[3][0], nCoords[3][1]);
      ctx.stroke();

      nCoords.forEach(([nx, ny], idx) => {
        ctx.fillStyle = idx % 2 === 0 ? '#67D9D2' : '#D4AD72';
        ctx.beginPath();
        ctx.arc(nx, ny, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(242, 233, 220, 0.85)';
        ctx.font = '500 10px "JetBrains Mono", monospace';
        ctx.fillText(spec.nodes[idx] || 'Node', nx - 22, ny - 9);
      });

      // 底部：三枚结构/内存/延迟真实技术指标胶囊 (Metric Pills)
      const pillY = 270;
      const pillW = (w - 84 - 24) / 3;
      spec.metrics.forEach((m, idx) => {
        const px = x0 + idx * (pillW + 12);
        traceRoundedRect(ctx, px, pillY, pillW, 48, 8);
        ctx.fillStyle = 'rgba(16, 28, 38, 0.56)';
        ctx.fill();
        ctx.strokeStyle = idx === 2 ? 'rgba(212, 173, 114, 0.36)' : 'rgba(103, 217, 210, 0.24)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = 'rgba(242, 233, 220, 0.52)';
        ctx.font = '500 10px "JetBrains Mono", monospace';
        ctx.fillText(m.k, px + 12, pillY + 18);

        ctx.fillStyle = idx === 2 ? '#D4AD72' : '#67D9D2';
        ctx.font = '600 14px "JetBrains Mono", monospace';
        ctx.fillText(m.v, px + 12, pillY + 38);
      });
    }

    // 渲染辅助全息卡片 (2个侧后方辅助卡片：展示内存拓扑结构图或延迟折线图)
    function renderAuxiliaryHoloCard(canvas, spec) {
      const ctx = canvas.getContext('2d');
      const w = canvas.width;
      const h = canvas.height;
      drawGlassmorphicCardBase(ctx, w, h, 16, false);

      const x0 = 34;
      ctx.fillStyle = spec.mode === 'chart' ? '#D4AD72' : '#67D9D2';
      ctx.font = '600 11px "JetBrains Mono", monospace';
      ctx.fillText(spec.tag, x0, 48);

      ctx.fillStyle = '#F2E9DC';
      ctx.font = '600 17px "Inter", sans-serif';
      ctx.fillText(spec.title, x0, 74);

      ctx.fillStyle = 'rgba(242, 233, 220, 0.62)';
      ctx.font = '400 12px "JetBrains Mono", monospace';
      ctx.fillText(spec.subtitle, x0, 94);

      // 中部图形绘制区：为 5 个章节绘制各自专属的左侧结构可视化与右侧曲线
      const boxX = x0;
      const boxY = 108;
      const boxW = w - 68;
      const boxH = 110;
      traceRoundedRect(ctx, boxX, boxY, boxW, boxH, 8);
      ctx.fillStyle = 'rgba(7, 12, 17, 0.56)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(103, 217, 210, 0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();

      if (spec.mode === 'linear_blocks') {
        // Chapter I 左辅卡：连续内存块 vs 链式节点指针
        for (let i = 0; i < 5; i++) {
          const bx = boxX + 18 + i * 36;
          ctx.fillStyle = i === 2 ? 'rgba(212, 173, 114, 0.28)' : 'rgba(103, 217, 210, 0.18)';
          ctx.fillRect(bx, boxY + 22, 30, 26);
          ctx.strokeStyle = i === 2 ? '#D4AD72' : '#67D9D2';
          ctx.strokeRect(bx, boxY + 22, 30, 26);
        }
        // 下排双向链表节点
        for (let i = 0; i < 4; i++) {
          const nx = boxX + 34 + i * 54;
          const ny = boxY + 78;
          ctx.strokeStyle = '#D4AD72';
          ctx.beginPath();
          ctx.arc(nx, ny, 10, 0, Math.PI * 2);
          ctx.stroke();
          if (i < 3) {
            ctx.beginPath();
            ctx.moveTo(nx + 10, ny);
            ctx.lineTo(nx + 44, ny);
            ctx.stroke();
          }
        }
        // 右侧 L1 命中条
        spec.series.slice(0, 3).forEach((val, idx) => {
          const by = boxY + 26 + idx * 24;
          ctx.fillStyle = idx === 2 ? '#D4AD72' : '#67D9D2';
          ctx.fillRect(boxX + 220, by, (boxW - 238) * val, 9);
        });
      } else if (spec.mode === 'kmp_automaton') {
        // Chapter II 左辅卡：KMP 自动机跳转弧线 + CSR 非零元矩阵网格
        for (let i = 0; i < 4; i++) {
          const cx = boxX + 36 + i * 44;
          const cy = boxY + 56;
          ctx.strokeStyle = '#67D9D2';
          ctx.beginPath();
          ctx.arc(cx, cy, 12, 0, Math.PI * 2);
          ctx.stroke();
          ctx.fillStyle = '#F2E9DC';
          ctx.font = '500 10px "JetBrains Mono", monospace';
          ctx.fillText(`q${i}`, cx - 6, cy + 4);
        }
        ctx.strokeStyle = '#D4AD72';
        ctx.beginPath();
        ctx.arc(boxX + 102, boxY + 56, 42, Math.PI * 1.15, Math.PI * 1.85);
        ctx.stroke();
        // 右侧稀疏矩阵点阵
        for (let r = 0; r < 4; r++) {
          for (let c = 0; c < 5; c++) {
            const isNnz = (r + c) % 3 === 0;
            ctx.fillStyle = isNnz ? '#67D9D2' : 'rgba(255,255,255,0.08)';
            ctx.fillRect(boxX + 235 + c * 28, boxY + 22 + r * 19, 18, 12);
          }
        }
      } else if (spec.mode === 'tree_topology') {
        // Chapter III 左辅卡：完全二叉树与二叉堆层级结构
        const nodes = [
          [boxX + 105, boxY + 24],
          [boxX + 60, boxY + 56],
          [boxX + 150, boxY + 56],
          [boxX + 38, boxY + 88],
          [boxX + 82, boxY + 88],
          [boxX + 128, boxY + 88],
          [boxX + 172, boxY + 88]
        ];
        const links = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]];
        ctx.strokeStyle = 'rgba(103, 217, 210, 0.45)';
        ctx.beginPath();
        links.forEach(([u, v]) => {
          ctx.moveTo(nodes[u][0], nodes[u][1]);
          ctx.lineTo(nodes[v][0], nodes[v][1]);
        });
        ctx.stroke();
        nodes.forEach(([nx, ny], idx) => {
          ctx.fillStyle = idx === 0 ? '#D4AD72' : '#67D9D2';
          ctx.beginPath();
          ctx.arc(nx, ny, 6, 0, Math.PI * 2);
          ctx.fill();
        });
        // 右侧堆数组映射条
        spec.series.slice(0, 4).forEach((val, idx) => {
          const by = boxY + 20 + idx * 21;
          ctx.fillStyle = idx === 0 ? '#D4AD72' : '#67D9D2';
          ctx.fillRect(boxX + 215, by, (boxW - 235) * val, 8);
        });
      } else if (spec.mode === 'rbtree_buckets') {
        // Chapter IV 左辅卡：红黑树着色节点 + 哈希桶拉链结构
        const rbNodes = [
          { x: boxX + 82, y: boxY + 26, red: false },
          { x: boxX + 46, y: boxY + 58, red: true },
          { x: boxX + 118, y: boxY + 58, red: true },
          { x: boxX + 30, y: boxY + 88, red: false },
          { x: boxX + 64, y: boxY + 88, red: false }
        ];
        ctx.strokeStyle = 'rgba(242, 233, 220, 0.35)';
        ctx.beginPath();
        ctx.moveTo(rbNodes[0].x, rbNodes[0].y); ctx.lineTo(rbNodes[1].x, rbNodes[1].y);
        ctx.moveTo(rbNodes[0].x, rbNodes[0].y); ctx.lineTo(rbNodes[2].x, rbNodes[2].y);
        ctx.moveTo(rbNodes[1].x, rbNodes[1].y); ctx.lineTo(rbNodes[3].x, rbNodes[3].y);
        ctx.moveTo(rbNodes[1].x, rbNodes[1].y); ctx.lineTo(rbNodes[4].x, rbNodes[4].y);
        ctx.stroke();
        rbNodes.forEach((n) => {
          ctx.fillStyle = n.red ? '#e05d5d' : '#2b3645';
          ctx.beginPath();
          ctx.arc(n.x, n.y, 7, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = n.red ? '#ff9494' : '#67D9D2';
          ctx.stroke();
        });
        // 右侧哈希桶拉链
        for (let b = 0; b < 4; b++) {
          const by = boxY + 18 + b * 22;
          ctx.strokeStyle = '#67D9D2';
          ctx.strokeRect(boxX + 185, by, 28, 16);
          const chainLen = (b % 2 === 0) ? 3 : 2;
          for (let c = 0; c < chainLen; c++) {
            ctx.fillStyle = c === 0 ? '#D4AD72' : '#67D9D2';
            ctx.fillRect(boxX + 225 + c * 42, by + 3, 30, 10);
          }
        }
      } else if (spec.mode === 'sort_bars') {
        // Chapter V 左辅卡：IntroSort 分区柱状图 + 图论节点环
        spec.series.forEach((val, idx) => {
          const bh = val * 76;
          const bx = boxX + 24 + idx * 24;
          const by = boxY + 94 - bh;
          ctx.fillStyle = idx === 3 ? '#D4AD72' : '#67D9D2';
          ctx.fillRect(bx, by, 16, bh);
        });
        // 右侧图论最短路带权拓扑环
        const cx = boxX + 295;
        const cy = boxY + 55;
        const r = 34;
        ctx.strokeStyle = 'rgba(103, 217, 210, 0.4)';
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
        for (let i = 0; i < 5; i++) {
          const ang = (i / 5) * Math.PI * 2;
          const nx = cx + Math.cos(ang) * r;
          const ny = cy + Math.sin(ang) * r;
          ctx.fillStyle = i === 0 ? '#D4AD72' : '#67D9D2';
          ctx.beginPath();
          ctx.arc(nx, ny, 4.5, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        // 绘制高精折线图与渐变面积图 (Mini Telemetry Line Chart)
        const padX = boxX + 16;
        const padY = boxY + 18;
        const plotW = boxW - 32;
        const plotH = boxH - 34;
        const pts = spec.series.map((v, idx) => [
          padX + (idx / (spec.series.length - 1)) * plotW,
          padY + plotH * (1 - v * 0.85)
        ]);

        const areaGrad = ctx.createLinearGradient(0, padY, 0, padY + plotH);
        areaGrad.addColorStop(0, 'rgba(103, 217, 210, 0.28)');
        areaGrad.addColorStop(1, 'rgba(103, 217, 210, 0.0)');
        ctx.beginPath();
        ctx.moveTo(pts[0][0], padY + plotH);
        pts.forEach(([px, py]) => ctx.lineTo(px, py));
        ctx.lineTo(pts[pts.length - 1][0], padY + plotH);
        ctx.closePath();
        ctx.fillStyle = areaGrad;
        ctx.fill();

        ctx.strokeStyle = '#67D9D2';
        ctx.lineWidth = 2;
        ctx.beginPath();
        pts.forEach(([px, py], i) => {
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.stroke();

        pts.forEach(([px, py], i) => {
          ctx.fillStyle = i === pts.length - 1 ? '#D4AD72' : '#67D9D2';
          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // 底部指标行
      ctx.fillStyle = '#67D9D2';
      ctx.font = '500 11px "JetBrains Mono", monospace';
      ctx.fillText(spec.statA, x0, 244);

      ctx.fillStyle = '#D4AD72';
      ctx.fillText(spec.statB, w - 165, 244);
    }

    // 创建 1 主卡片 + 2 辅助卡片的空间分层结构（包含背部柔和阴影层与书页向上投射光束线）
    const holoPanes = [];
    const HOLO_LAYER_CONFIGS = [
      {
        role: 'main',
        canvasW: 768,
        canvasH: 360,
        w: 0.35,
        h: 0.165,
        x: 0.01,
        y: 0.155,
        z: 0.068,
        rotY: 0.04,
        rotX: -0.10,
        baseOpacity: 0.90,
        parallaxFactor: 1.0,
        phase: 0.0
      },
      {
        role: 'auxLeft',
        canvasW: 480,
        canvasH: 276,
        w: 0.215,
        h: 0.124,
        x: -0.215,
        y: 0.185,
        z: -0.052,
        rotY: 0.24,
        rotX: -0.08,
        baseOpacity: 0.56,
        parallaxFactor: 0.52,
        phase: 1.6
      },
      {
        role: 'auxRight',
        canvasW: 480,
        canvasH: 276,
        w: 0.215,
        h: 0.124,
        x: 0.225,
        y: 0.192,
        z: -0.042,
        rotY: -0.22,
        rotX: -0.08,
        baseOpacity: 0.52,
        parallaxFactor: 0.62,
        phase: 3.1
      }
    ];

    // 生成卡片背部柔和空間阴影贴图（赋予卡片真实悬浮景深，绝非平面贴纸）
    const cardSoftShadowTex = (() => {
      const c = document.createElement('canvas');
      c.width = 256; c.height = 160;
      const ctx = c.getContext('2d');
      const g = ctx.createRadialGradient(128, 80, 18, 128, 80, 118);
      g.addColorStop(0, 'rgba(4, 8, 13, 0.62)');
      g.addColorStop(0.6, 'rgba(4, 8, 13, 0.24)');
      g.addColorStop(1, 'rgba(4, 8, 13, 0.0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 256, 160);
      return new THREE.CanvasTexture(c);
    })();

    HOLO_LAYER_CONFIGS.forEach((cfg) => {
      const cardCanvas = document.createElement('canvas');
      cardCanvas.width = cfg.canvasW;
      cardCanvas.height = cfg.canvasH;
      const tex = new THREE.CanvasTexture(cardCanvas);
      tex.encoding = THREE.sRGBEncoding;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();

      const cardHolder = new THREE.Group();
      cardHolder.position.set(cfg.x, cfg.y, cfg.z);
      cardHolder.rotation.set(cfg.rotX, cfg.rotY, 0);
      holoProjectionGroup.add(cardHolder);

      // 1. 背部柔和景深暗影层 (Soft Spatial Drop Shadow)
      const backShadowMat = new THREE.MeshBasicMaterial({
        map: cardSoftShadowTex,
        transparent: true,
        opacity: 0.0,
        depthWrite: false
      });
      const backShadowMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(cfg.w * 1.18, cfg.h * 1.22),
        backShadowMat
      );
      backShadowMesh.position.set(0, -0.006, -0.012);
      cardHolder.add(backShadowMesh);

      // 2. 玻璃拟态全息主面板 (NormalBlending 保留深色玻璃质感与高对比文字)
      const cardMat = new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        opacity: 0.0,
        side: THREE.DoubleSide,
        depthWrite: false
      });
      const cardMesh = new THREE.Mesh(new THREE.PlaneGeometry(cfg.w, cfg.h), cardMat);
      cardMesh.userData.interactiveType = cfg.role === 'main' ? 'BOOK_RIGHT' : 'BOOK_LEFT';
      cardHolder.add(cardMesh);

      // 3. 边缘微弱青色辉光叠加层 (Subtle Additive Edge Glow Halo)
      const glowMat = new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        opacity: 0.0,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });
      const glowMesh = new THREE.Mesh(new THREE.PlaneGeometry(cfg.w * 1.01, cfg.h * 1.01), glowMat);
      glowMesh.position.z = 0.001;
      cardHolder.add(glowMesh);

      // 4. 从书页表面向上延伸至卡片底部的细微全息投射光丝 (Projection Light Tethers)
      const tetherGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(cfg.x * 0.72, 0.042, cfg.z * 0.65),
        new THREE.Vector3(cfg.x, cfg.y - cfg.h * 0.44, cfg.z)
      ]);
      const tetherMat = new THREE.LineBasicMaterial({
        color: cfg.role === 'main' ? 0x67D9D2 : 0xD4AD72,
        transparent: true,
        opacity: 0.0,
        blending: THREE.AdditiveBlending
      });
      const tetherLine = new THREE.Line(tetherGeo, tetherMat);
      holoProjectionGroup.add(tetherLine);

      holoPanes.push({
        role: cfg.role,
        canvas: cardCanvas,
        tex,
        holder: cardHolder,
        mat: cardMat,
        glowMat,
        shadowMat: backShadowMat,
        tetherMat,
        baseX: cfg.x,
        baseY: cfg.y,
        baseZ: cfg.z,
        baseRotX: cfg.rotX,
        baseRotY: cfg.rotY,
        baseOpacity: cfg.baseOpacity,
        parallaxFactor: cfg.parallaxFactor,
        phase: cfg.phase
      });
    });

    // 根据当前打开的书本跨页动态刷新 3 张全息卡片内容
    function updateHoloCardsContent(spreadIdx) {
      const spec = HOLO_SPREAD_SPECS[spreadIdx % HOLO_SPREAD_SPECS.length];
      holoPanes.forEach((p) => {
        if (p.role === 'main') {
          renderPrimaryHoloCard(p.canvas, spec.main);
        } else if (p.role === 'auxLeft') {
          renderAuxiliaryHoloCard(p.canvas, spec.auxLeft);
        } else if (p.role === 'auxRight') {
          renderAuxiliaryHoloCard(p.canvas, spec.auxRight);
        }
        p.tex.needsUpdate = true;
      });
    }
    updateHoloCardsContent(0);

    // 从书脊与书页缓缓升起的流金与青色微粒（克制、精致）
    const holoMotes = [];
    const moteGeo = new THREE.OctahedronGeometry(0.0045, 0);
    for (let i = 0; i < 18; i++) {
      const isGold = i % 2 === 0;
      const mMat = new THREE.MeshBasicMaterial({
        color: isGold ? 0xD4AD72 : 0x67D9D2,
        transparent: true,
        opacity: 0.0,
        blending: THREE.AdditiveBlending
      });
      const mMesh = new THREE.Mesh(moteGeo, mMat);
      holoProjectionGroup.add(mMesh);
      holoMotes.push({
        mesh: mMesh,
        mat: mMat,
        x: (Math.random() - 0.5) * PAGE_W * 1.45,
        z: (Math.random() - 0.5) * PAGE_H * 0.72,
        phase: Math.random(),
        speed: 0.12 + Math.random() * 0.10
      });
    }

    const holoState = { energy: 0.0 };


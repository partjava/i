    /**
     * ============================================================================
     * 6. APPLE STUDIO-GRADE DISPLAY & REALISTIC IDE CANVAS (位于右中景黄金视觉中心)
     * ============================================================================
     */
    const monitorGroup = new THREE.Group();
    // 置于偏右侧视觉中心，略微朝向相机偏转，建立自然透视关系
    monitorGroup.position.set(0.42, 0.004, -0.26);
    monitorGroup.rotation.y = -0.18;
    studioGroup.add(monitorGroup);

    addContactShadow(monitorGroup, 0.42, 0.28, 0, 0, 0.75);

    // 精密铝合金 L 型支架底座与立柱
    const standFoot = new THREE.Mesh(
      new THREE.BoxGeometry(0.28, 0.008, 0.20),
      spaceSilverMat
    );
    standFoot.position.set(0, 0.004, 0);
    standFoot.castShadow = true;
    standFoot.receiveShadow = true;
    monitorGroup.add(standFoot);

    const standPillar = new THREE.Mesh(
      new THREE.BoxGeometry(0.075, 0.44, 0.018),
      spaceSilverMat
    );
    standPillar.position.set(0, 0.22, -0.05);
    standPillar.rotation.x = -0.06;
    standPillar.castShadow = true;
    monitorGroup.add(standPillar);

    // 极窄边框深空灰铝合金机身 + 防眩光玻璃屏幕
    const MON_W = 1.18;
    const MON_H = 0.64;

    const monitorChassis = new THREE.Mesh(
      new THREE.BoxGeometry(MON_W + 0.024, MON_H + 0.024, 0.022),
      anodizedDarkMat
    );
    monitorChassis.position.set(0, 0.49, -0.01);
    monitorChassis.castShadow = true;
    monitorChassis.userData.interactiveType = 'MONITOR';
    monitorGroup.add(monitorChassis);

    // 极细银色金属外缘倒角框
    const monitorRim = new THREE.Mesh(
      new THREE.BoxGeometry(MON_W + 0.028, MON_H + 0.028, 0.016),
      spaceSilverMat
    );
    monitorRim.position.set(0, 0.49, -0.013);
    monitorGroup.add(monitorRim);

    // 动态高分 C++20 / STL 数据结构与算法开发环境纹理（随当前书本 5 大 Chapter 实时联动切换）
    const ideCanvas = document.createElement('canvas');
    ideCanvas.width = 2560;
    ideCanvas.height = 1400;
    const ideCtx = ideCanvas.getContext('2d', { alpha: false });
    const ideTexture = new THREE.CanvasTexture(ideCanvas);
    ideTexture.encoding = THREE.sRGBEncoding;
    ideTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const CHAPTER_IDE_WORKSPACES = [
      {
        chapterBadge: 'CHAPTER I // LINEAR LISTS, STACKS & QUEUES',
        fileTitle: 'cpp-ds-core — chapter01_linear_monotonic.cpp',
        activeFile: 'linear_list_deque.hpp',
        cmd: 'g++ -std=c++20 -O3 bench_monotonic_deque.cpp -o bin/ch01_linear',
        buildLog: '[1/5] Benchmarking std::vector 2x capacity vs std::deque monotonic window (0.09s)',
        telemetry: '✓ Vector L1 Hit: 98.4%  |  List Reverse: O(1) Space  |  Sliding Window: O(n) Linear',
        lines: [
          { ln: 1, indent: 0, segs: [{ t: '#include ', c: '#D4AD72' }, { t: '<vector>', c: '#67D9D2' }, { t: ', ', c: '#F2E9DC' }, { t: '<deque>', c: '#67D9D2' }, { t: ' // Chapter I: 线性表、栈与队列', c: '#6e7681' }] },
          { ln: 2, indent: 0, segs: [{ t: 'namespace ', c: '#D4AD72' }, { t: 'ds::chapter1 ', c: '#F2E9DC' }, { t: '{', c: '#7d8590' }] },
          { ln: 3, indent: 1, segs: [{ t: '// 1. 原地反转单链表 O(n) Time, O(1) Aux Space', c: '#6e7681' }] },
          { ln: 4, indent: 1, segs: [{ t: 'ListNode* ', c: '#D4AD72' }, { t: 'reverseList', c: '#67D9D2' }, { t: '(ListNode* head) noexcept {', c: '#F2E9DC' }] },
          { ln: 5, indent: 2, segs: [{ t: 'ListNode *prev = ', c: '#F2E9DC' }, { t: 'nullptr', c: '#D4AD72' }, { t: ', *curr = head;', c: '#F2E9DC' }] },
          { ln: 6, indent: 2, segs: [{ t: 'while ', c: '#D4AD72' }, { t: '(curr) { ', c: '#F2E9DC' }, { t: 'auto', c: '#D4AD72' }, { t: '* nxt = curr->next; curr->next = prev; prev = curr; curr = nxt; }', c: '#F2E9DC' }] },
          { ln: 7, indent: 2, segs: [{ t: 'return ', c: '#D4AD72' }, { t: 'prev;', c: '#F2E9DC' }] },
          { ln: 8, indent: 1, segs: [{ t: '}', c: '#F2E9DC' }] },
          { ln: 9, indent: 1, segs: [{ t: '// 2. 单调双端队列求解滑动窗口最大值 O(n)', c: '#6e7681' }] },
          { ln: 10, indent: 1, segs: [{ t: 'std::vector<int> ', c: '#9ecbff' }, { t: 'maxSlidingWindow', c: '#67D9D2' }, { t: '(const std::vector<int>& a, int k) {', c: '#F2E9DC' }] },
          { ln: 11, indent: 2, segs: [{ t: 'std::deque<int> dq; std::vector<int> ans;', c: '#F2E9DC' }] },
          { ln: 12, indent: 2, segs: [{ t: 'for ', c: '#D4AD72' }, { t: '(int i = 0; i < a.size(); ++i) {', c: '#F2E9DC' }] },
          { ln: 13, indent: 3, segs: [{ t: 'while ', c: '#D4AD72' }, { t: '(!dq.empty() && a[dq.back()] <= a[i]) dq.pop_back();', c: '#67D9D2' }] },
          { ln: 14, indent: 0, segs: [{ t: '} // namespace ds::chapter1', c: '#6e7681' }] }
        ]
      },
      {
        chapterBadge: 'CHAPTER II // STRINGS, KMP & SPARSE MATRIX',
        fileTitle: 'cpp-ds-core — chapter02_kmp_csr_matrix.cpp',
        activeFile: 'kmp_sparse_csr.hpp',
        cmd: 'g++ -std=c++20 -O3 bench_kmp_csr.cpp -o bin/ch02_string_matrix',
        buildLog: '[2/5] Verified KMP prefix automaton & CSR Sparse Matrix SpMV kernel (0.11s)',
        telemetry: '✓ KMP Backtrack: 0 Steps O(n+m)  |  std::string SSO: <=15B  |  CSR Memory Saved: 91.4%',
        lines: [
          { ln: 1, indent: 0, segs: [{ t: '#include ', c: '#D4AD72' }, { t: '<string_view>', c: '#67D9D2' }, { t: ', ', c: '#F2E9DC' }, { t: '<vector>', c: '#67D9D2' }, { t: ' // Chapter II: 串匹配、数组与稀疏矩阵', c: '#6e7681' }] },
          { ln: 2, indent: 0, segs: [{ t: 'namespace ', c: '#D4AD72' }, { t: 'ds::chapter2 ', c: '#F2E9DC' }, { t: '{', c: '#7d8590' }] },
          { ln: 3, indent: 1, segs: [{ t: '// 1. KMP 模式匹配前缀转移表 next[i] 构建 O(m)', c: '#6e7681' }] },
          { ln: 4, indent: 1, segs: [{ t: 'std::vector<int> ', c: '#9ecbff' }, { t: 'buildKmpNext', c: '#67D9D2' }, { t: '(std::string_view pat) {', c: '#F2E9DC' }] },
          { ln: 5, indent: 2, segs: [{ t: 'std::vector<int> next(pat.size(), ', c: '#F2E9DC' }, { t: '0', c: '#D4AD72' }, { t: ');', c: '#F2E9DC' }] },
          { ln: 6, indent: 2, segs: [{ t: 'for ', c: '#D4AD72' }, { t: '(int i = 1, j = 0; i < pat.size(); ++i) {', c: '#F2E9DC' }] },
          { ln: 7, indent: 3, segs: [{ t: 'while ', c: '#D4AD72' }, { t: '(j > 0 && pat[i] != pat[j]) j = next[j - 1];', c: '#67D9D2' }] },
          { ln: 8, indent: 3, segs: [{ t: 'if ', c: '#D4AD72' }, { t: '(pat[i] == pat[j]) ++j; next[i] = j;', c: '#F2E9DC' }] },
          { ln: 9, indent: 2, segs: [{ t: '} ', c: '#F2E9DC' }, { t: 'return ', c: '#D4AD72' }, { t: 'next;', c: '#F2E9DC' }] },
          { ln: 10, indent: 1, segs: [{ t: '}', c: '#F2E9DC' }] },
          { ln: 11, indent: 1, segs: [{ t: '// 2. CSR 压缩稀疏行矩阵乘法 y = A * x', c: '#6e7681' }] },
          { ln: 12, indent: 1, segs: [{ t: 'for ', c: '#D4AD72' }, { t: '(int r = 0; r < rows; ++r)', c: '#F2E9DC' }] },
          { ln: 13, indent: 2, segs: [{ t: 'for ', c: '#D4AD72' }, { t: '(int k = row_ptr[r]; k < row_ptr[r+1]; ++k) y[r] += val[k] * x[col_idx[k]];', c: '#67D9D2' }] },
          { ln: 14, indent: 0, segs: [{ t: '} // namespace ds::chapter2', c: '#6e7681' }] }
        ]
      },
      {
        chapterBadge: 'CHAPTER III // BINARY TREES, HUFFMAN & HEAPS',
        fileTitle: 'cpp-ds-core — chapter03_tree_heap_uf.cpp',
        activeFile: 'binary_tree_heap.hpp',
        cmd: 'g++ -std=c++20 -O3 bench_floyd_heap.cpp -o bin/ch03_tree_heap',
        buildLog: '[3/5] Built Binary Heap via Floyd O(n) & Disjoint-Set path compression (0.10s)',
        telemetry: '✓ Floyd BuildHeap: O(n) Exact  |  Top-K Push: O(log K)  |  Union-Find: O(α(n))',
        lines: [
          { ln: 1, indent: 0, segs: [{ t: '#include ', c: '#D4AD72' }, { t: '<vector>', c: '#67D9D2' }, { t: ', ', c: '#F2E9DC' }, { t: '<stack>', c: '#67D9D2' }, { t: ' // Chapter III: 树与二叉树、堆与优先队列', c: '#6e7681' }] },
          { ln: 2, indent: 0, segs: [{ t: 'namespace ', c: '#D4AD72' }, { t: 'ds::chapter3 ', c: '#F2E9DC' }, { t: '{', c: '#7d8590' }] },
          { ln: 3, indent: 1, segs: [{ t: '// 1. 并查集路径压缩查找 O(α(n))', c: '#6e7681' }] },
          { ln: 4, indent: 1, segs: [{ t: 'int ', c: '#D4AD72' }, { t: 'findRoot', c: '#67D9D2' }, { t: '(int x) noexcept { ', c: '#F2E9DC' }, { t: 'return ', c: '#D4AD72' }, { t: 'parent[x] == x ? x : (parent[x] = findRoot(parent[x])); }', c: '#F2E9DC' }] },
          { ln: 5, indent: 1, segs: [{ t: '// 2. 完全二叉树数组大根堆下沉原语 siftDown O(log n)', c: '#6e7681' }] },
          { ln: 6, indent: 1, segs: [{ t: 'void ', c: '#D4AD72' }, { t: 'siftDown', c: '#67D9D2' }, { t: '(std::vector<int>& h, int i, int n) noexcept {', c: '#F2E9DC' }] },
          { ln: 7, indent: 2, segs: [{ t: 'while ', c: '#D4AD72' }, { t: '(2 * i + 1 < n) {', c: '#F2E9DC' }] },
          { ln: 8, indent: 3, segs: [{ t: 'int c = 2 * i + 1;', c: '#F2E9DC' }, { t: ' // 左孩子 2i+1, 右孩子 2i+2', c: '#6e7681' }] },
          { ln: 9, indent: 3, segs: [{ t: 'if ', c: '#D4AD72' }, { t: '(c + 1 < n && h[c + 1] > h[c]) ++c;', c: '#F2E9DC' }] },
          { ln: 10, indent: 3, segs: [{ t: 'if ', c: '#D4AD72' }, { t: '(h[i] >= h[c]) ', c: '#F2E9DC' }, { t: 'break', c: '#D4AD72' }, { t: ';', c: '#F2E9DC' }] },
          { ln: 11, indent: 3, segs: [{ t: 'std::swap(h[i], h[c]); i = c;', c: '#67D9D2' }] },
          { ln: 12, indent: 2, segs: [{ t: '}', c: '#F2E9DC' }] },
          { ln: 13, indent: 1, segs: [{ t: '} // Floyd 线性建堆: for (int i = n/2 - 1; i >= 0; --i) siftDown(h, i, n);', c: '#D4AD72' }] },
          { ln: 14, indent: 0, segs: [{ t: '} // namespace ds::chapter3', c: '#6e7681' }] }
        ]
      },
      {
        chapterBadge: 'CHAPTER IV // RB-TREE, B+ TREE & HASH LRU CACHE',
        fileTitle: 'cpp-ds-core — chapter04_rbtree_hash_lru.cpp',
        activeFile: 'rbtree_hash_lru.hpp',
        cmd: 'g++ -std=c++20 -O3 bench_rbtree_lru.cpp -o bin/ch04_search_hash',
        buildLog: '[4/5] Verified Red-Black Tree rotation invariants & O(1) Hash-LRU splice (0.12s)',
        telemetry: '✓ RB-Tree Rotations: <=3/Del  |  Hash LoadFactor: 0.72  |  LRU Get/Put: O(1)',
        lines: [
          { ln: 1, indent: 0, segs: [{ t: '#include ', c: '#D4AD72' }, { t: '<map>', c: '#67D9D2' }, { t: ', ', c: '#F2E9DC' }, { t: '<unordered_map>', c: '#67D9D2' }, { t: ', ', c: '#F2E9DC' }, { t: '<list>', c: '#67D9D2' }, { t: ' // Chapter IV: 平衡树与哈希表', c: '#6e7681' }] },
          { ln: 2, indent: 0, segs: [{ t: 'namespace ', c: '#D4AD72' }, { t: 'ds::chapter4 ', c: '#F2E9DC' }, { t: '{', c: '#7d8590' }] },
          { ln: 3, indent: 1, segs: [{ t: '// 1. AVL / 红黑树核心左旋平衡原语 O(1) Pointer Rewire', c: '#6e7681' }] },
          { ln: 4, indent: 1, segs: [{ t: 'RBNode* ', c: '#D4AD72' }, { t: 'rotateLeft', c: '#67D9D2' }, { t: '(RBNode* x) noexcept {', c: '#F2E9DC' }] },
          { ln: 5, indent: 2, segs: [{ t: 'RBNode* y = x->right; x->right = y->left;', c: '#F2E9DC' }] },
          { ln: 6, indent: 2, segs: [{ t: 'if ', c: '#D4AD72' }, { t: '(y->left) y->left->parent = x;', c: '#F2E9DC' }] },
          { ln: 7, indent: 2, segs: [{ t: 'y->parent = x->parent; y->left = x; x->parent = y; ', c: '#67D9D2' }, { t: 'return ', c: '#D4AD72' }, { t: 'y;', c: '#F2E9DC' }] },
          { ln: 8, indent: 1, segs: [{ t: '}', c: '#F2E9DC' }] },
          { ln: 9, indent: 1, segs: [{ t: '// 2. 工业级 LRU 缓存: unordered_map + std::list::splice O(1)', c: '#6e7681' }] },
          { ln: 10, indent: 1, segs: [{ t: 'Value ', c: '#D4AD72' }, { t: 'get', c: '#67D9D2' }, { t: '(Key k) {', c: '#F2E9DC' }] },
          { ln: 11, indent: 2, segs: [{ t: 'auto it = hash_idx_.find(k);', c: '#F2E9DC' }] },
          { ln: 12, indent: 2, segs: [{ t: 'lru_list_.splice(lru_list_.begin(), lru_list_, it->second);', c: '#67D9D2' }] },
          { ln: 13, indent: 2, segs: [{ t: 'return ', c: '#D4AD72' }, { t: 'it->second->second;', c: '#F2E9DC' }] },
          { ln: 14, indent: 0, segs: [{ t: '} } // namespace ds::chapter4', c: '#6e7681' }] }
        ]
      },
      {
        chapterBadge: 'CHAPTER V // INTROSORT & GRAPH ALGORITHMS',
        fileTitle: 'cpp-ds-core — chapter05_introsort_dijkstra.cpp',
        activeFile: 'introsort_graph.hpp',
        cmd: 'g++ -std=c++20 -O3 bench_introsort_dijkstra.cpp -o bin/ch05_sort_graph',
        buildLog: '[5/5] Verified std::sort IntroSort hybrid & Heap-Dijkstra relaxation (0.11s)',
        telemetry: '✓ IntroSort Worst: O(N log N)  |  Dijkstra PQ: O((V+E)logV)  |  Kruskal MST: Ready',
        lines: [
          { ln: 1, indent: 0, segs: [{ t: '#include ', c: '#D4AD72' }, { t: '<algorithm>', c: '#67D9D2' }, { t: ', ', c: '#F2E9DC' }, { t: '<queue>', c: '#67D9D2' }, { t: ' // Chapter V: 排序体系与图论最短路', c: '#6e7681' }] },
          { ln: 2, indent: 0, segs: [{ t: 'namespace ', c: '#D4AD72' }, { t: 'ds::chapter5 ', c: '#F2E9DC' }, { t: '{', c: '#7d8590' }] },
          { ln: 3, indent: 1, segs: [{ t: '// 1. std::sort 内省排序: 快排主干 + 深度超限转堆排 + 小区间插入排序', c: '#6e7681' }] },
          { ln: 4, indent: 1, segs: [{ t: 'void ', c: '#D4AD72' }, { t: 'introSortLoop', c: '#67D9D2' }, { t: '(Iter first, Iter last, int depth_limit) {', c: '#F2E9DC' }] },
          { ln: 5, indent: 2, segs: [{ t: 'if ', c: '#D4AD72' }, { t: '(last - first <= 16) { insertionSort(first, last); ', c: '#F2E9DC' }, { t: 'return', c: '#D4AD72' }, { t: '; }', c: '#F2E9DC' }] },
          { ln: 6, indent: 2, segs: [{ t: 'if ', c: '#D4AD72' }, { t: '(depth_limit == 0) { std::make_heap(first, last); std::sort_heap(first, last); ', c: '#67D9D2' }, { t: 'return', c: '#D4AD72' }, { t: '; }', c: '#F2E9DC' }] },
          { ln: 7, indent: 2, segs: [{ t: 'Iter cut = medianOfThreePartition(first, last);', c: '#F2E9DC' }] },
          { ln: 8, indent: 2, segs: [{ t: 'introSortLoop(first, cut, depth_limit - 1); introSortLoop(cut, last, depth_limit - 1);', c: '#F2E9DC' }] },
          { ln: 9, indent: 1, segs: [{ t: '}', c: '#F2E9DC' }] },
          { ln: 10, indent: 1, segs: [{ t: '// 2. 优先队列优化 Dijkstra 单源最短路边松弛 O((V+E) log V)', c: '#6e7681' }] },
          { ln: 11, indent: 1, segs: [{ t: 'for ', c: '#D4AD72' }, { t: '(auto [v, w] : adj[u])', c: '#F2E9DC' }] },
          { ln: 12, indent: 2, segs: [{ t: 'if ', c: '#D4AD72' }, { t: '(dist[u] + w < dist[v]) pq.emplace(dist[v] = dist[u] + w, v);', c: '#67D9D2' }] },
          { ln: 13, indent: 0, segs: [{ t: '} // namespace ds::chapter5', c: '#6e7681' }] }
        ]
      }
    ];

    let CODE_LINES = CHAPTER_IDE_WORKSPACES[0].lines;
    let activeLessonSide = 0; // 0 左页，1 右页；显示器与学习控制台共用选中知识点

    const screenState = {
      power: 0.08,
      typedLines: 0.0,
      hoverBorder: 0.0,
      refreshFlash: 0.0,
      activeLineIndex: 5,
      keystrokeCount: 0,
      chapterIdx: 0,
      lastKeyCmd: CHAPTER_IDE_WORKSPACES[0].cmd
    };

    // 实体显示器「投影可读性」优先：2 倍画布采样、较大字号、精简代码行数、清晰语义高亮。
    // 书页内容才是唯一的数据源，不显示与课程无关的模拟项目或虚构遥测。
    function drawIDECanvas(tSec) {
      // Restored original rich IDE layout; draw all 13–14 chapter code lines.
      // 2x supersampling retains the original composition on the high-res display.
      ideCtx.setTransform(2, 0, 0, 2, 0, 0);
      const ws = CHAPTER_IDE_WORKSPACES[screenState.chapterIdx % CHAPTER_IDE_WORKSPACES.length];
      CODE_LINES = ws.lines;

      ideCtx.fillStyle = '#0b0e13';
      ideCtx.fillRect(0, 0, 1280, 700);

      ideCtx.save();
      ideCtx.globalAlpha = THREE.MathUtils.clamp(screenState.power, 0.06, 1.0);

      // 顶部极简 IDE 栏 + 当前 C++ 数据结构章节徽章
      ideCtx.fillStyle = '#11161e';
      ideCtx.fillRect(0, 0, 1280, 42);
      const macDots = ['#ff5f56', '#ffbd2e', '#27c93f'];
      macDots.forEach((c, i) => {
        ideCtx.fillStyle = c;
        ideCtx.beginPath();
        ideCtx.arc(24 + i * 18, 21, 5, 0, Math.PI * 2);
        ideCtx.fill();
      });

      ideCtx.fillStyle = '#8b949e';
      ideCtx.font = '500 13px "JetBrains Mono", monospace';
      ideCtx.fillText(ws.fileTitle, 92, 26);

      // 右上角显示当前同步的 Chapter 标识
      ideCtx.fillStyle = 'rgba(103, 217, 210, 0.14)';
      ideCtx.fillRect(885, 9, 375, 24);
      ideCtx.strokeStyle = 'rgba(103, 217, 210, 0.45)';
      ideCtx.strokeRect(885, 9, 375, 24);
      ideCtx.fillStyle = '#67D9D2';
      ideCtx.font = '600 11px "JetBrains Mono", monospace';
      ideCtx.fillText(ws.chapterBadge, 898, 25);

      // 左侧 5 大章节工程目录树（随当前书本章节高亮对应文件）
      ideCtx.fillStyle = '#0e1218';
      ideCtx.fillRect(0, 42, 248, 658);
      ideCtx.strokeStyle = 'rgba(242, 233, 220, 0.06)';
      ideCtx.beginPath();
      ideCtx.moveTo(248, 42);
      ideCtx.lineTo(248, 700);
      ideCtx.stroke();

      const treeItems = [
        { label: '▾ include/cpp_ds', active: false },
        { label: '  01_linear_deque.hpp', active: screenState.chapterIdx === 0 },
        { label: '  02_kmp_sparse_csr.hpp', active: screenState.chapterIdx === 1 },
        { label: '  03_tree_heap_uf.hpp', active: screenState.chapterIdx === 2 },
        { label: '  04_rbtree_hash_lru.hpp', active: screenState.chapterIdx === 3 },
        { label: '  05_introsort_graph.hpp', active: screenState.chapterIdx === 4 },
        { label: '▾ benchmarks/', active: false },
        { label: '  stl_complexity_suite.cpp', active: false }
      ];
      treeItems.forEach((item, i) => {
        const y = 84 + i * 32;
        if (item.active) {
          ideCtx.fillStyle = 'rgba(103, 217, 210, 0.12)';
          ideCtx.fillRect(10, y - 19, 228, 27);
          ideCtx.fillStyle = '#D4AD72';
          ideCtx.fillRect(10, y - 19, 3, 27);
        }
        ideCtx.fillStyle = item.active ? '#67D9D2' : '#6e7681';
        ideCtx.font = item.active ? '600 13px "JetBrains Mono", monospace' : '400 13px "JetBrains Mono", monospace';
        ideCtx.fillText((item.active ? '● ' : '  ') + item.label, 16, y);
      });

      // 左下角实时章节迷你可视化框
      ideCtx.fillStyle = 'rgba(17, 24, 34, 0.85)';
      ideCtx.fillRect(14, 355, 220, 160);
      ideCtx.strokeStyle = 'rgba(212, 173, 114, 0.3)';
      ideCtx.strokeRect(14, 355, 220, 160);
      ideCtx.fillStyle = '#D4AD72';
      ideCtx.font = '600 11px "JetBrains Mono", monospace';
      ideCtx.fillText(`VISUAL // CH.0${screenState.chapterIdx + 1} TOPOLOGY`, 26, 378);

      // 根据当前章节在大屏幕左下角绘制对应的数据结构动态图
      ideCtx.strokeStyle = '#67D9D2';
      ideCtx.lineWidth = 1.6;
      if (screenState.chapterIdx === 0) {
        // 线性表/单调队列连续块
        for (let b = 0; b < 5; b++) {
          const bx = 28 + b * 38;
          ideCtx.strokeStyle = b === 2 ? '#D4AD72' : '#67D9D2';
          ideCtx.strokeRect(bx, 415, 32, 32);
          ideCtx.fillStyle = '#F2E9DC';
          ideCtx.fillText(String((b + 1) * 8), bx + 8, 435);
        }
      } else if (screenState.chapterIdx === 1) {
        // KMP 状态跳转弧线
        for (let b = 0; b < 4; b++) {
          const cx = 42 + b * 48;
          ideCtx.beginPath();
          ideCtx.arc(cx, 435, 13, 0, Math.PI * 2);
          ideCtx.stroke();
        }
        ideCtx.strokeStyle = '#D4AD72';
        ideCtx.beginPath();
        ideCtx.arc(114, 435, 48, Math.PI * 1.15, Math.PI * 1.85);
        ideCtx.stroke();
      } else if (screenState.chapterIdx === 2 || screenState.chapterIdx === 3) {
        // 二叉树 / 红黑树节点
        const treePts = [[124, 398], [78, 442], [170, 442], [56, 485], [100, 485], [148, 485], [192, 485]];
        const edges = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]];
        ideCtx.beginPath();
        edges.forEach(([u, v]) => {
          ideCtx.moveTo(treePts[u][0], treePts[u][1]);
          ideCtx.lineTo(treePts[v][0], treePts[v][1]);
        });
        ideCtx.stroke();
        treePts.forEach(([nx, ny], idx) => {
          ideCtx.fillStyle = (screenState.chapterIdx === 3 && idx % 2 === 1) ? '#e05d5d' : '#67D9D2';
          ideCtx.beginPath();
          ideCtx.arc(nx, ny, 7, 0, Math.PI * 2);
          ideCtx.fill();
        });
      } else {
        // 排序柱状图与图论最短路
        const heights = [28, 52, 38, 74, 60, 88, 46];
        heights.forEach((h, idx) => {
          ideCtx.fillStyle = idx === 5 ? '#D4AD72' : '#67D9D2';
          ideCtx.fillRect(32 + idx * 26, 492 - h, 18, h);
        });
      }

      // 中央代码编辑区逐行显现 + 键盘交互时的代码行扫描微闪回馈
      const visibleCount = Math.floor(screenState.typedLines);
      ideCtx.font = '400 15px "JetBrains Mono", monospace';
      for (let i = 0; i < Math.min(visibleCount, CODE_LINES.length); i++) {
        const row = CODE_LINES[i];
        const y = 88 + i * 31;

        if (i === screenState.activeLineIndex && screenState.refreshFlash > 0.01) {
          ideCtx.fillStyle = `rgba(103, 217, 210, ${0.06 + screenState.refreshFlash * 0.16})`;
          ideCtx.fillRect(256, y - 20, 1010, 28);
          ideCtx.fillStyle = `rgba(103, 217, 210, ${screenState.refreshFlash * 0.85})`;
          ideCtx.fillRect(256, y - 20, 3, 28);
        }

        ideCtx.fillStyle = 'rgba(242, 233, 220, 0.22)';
        ideCtx.fillText(String(row.ln).padStart(2, '0'), 268, y);

        let cx = 310 + row.indent * 22;
        row.segs.forEach((seg) => {
          ideCtx.fillStyle = seg.c;
          ideCtx.fillText(seg.t, cx, y);
          cx += ideCtx.measureText(seg.t).width;
        });

        if (i === visibleCount - 1 && Math.sin(tSec * 6) > 0) {
          ideCtx.fillStyle = '#D4AD72';
          ideCtx.fillRect(cx + 5, y - 14, 8, 17);
        }
      }

      // 底部实时编译与性能遥测栏
      ideCtx.fillStyle = '#0e131a';
      ideCtx.fillRect(248, 535, 1032, 165);
      ideCtx.strokeStyle = `rgba(103, 217, 210, ${0.14 + screenState.refreshFlash * 0.35})`;
      ideCtx.beginPath();
      ideCtx.moveTo(248, 535);
      ideCtx.lineTo(1280, 535);
      ideCtx.stroke();

      ideCtx.fillStyle = '#D4AD72';
      ideCtx.font = '500 12px "JetBrains Mono", monospace';
      ideCtx.fillText(`TERMINAL // ${screenState.lastKeyCmd}`, 268, 566);

      if (screenState.power > 0.45) {
        ideCtx.fillStyle = '#8b949e';
        ideCtx.font = '400 13px "JetBrains Mono", monospace';
        const buildTag = screenState.keystrokeCount > 0
          ? `${ws.buildLog} · Keystroke #${screenState.keystrokeCount}`
          : ws.buildLog;
        ideCtx.fillText(buildTag, 268, 598);
        ideCtx.fillStyle = '#67D9D2';
        ideCtx.fillText(ws.telemetry, 268, 628);
      }

      // 右侧克制的算法复杂度波形卡片
      ideCtx.strokeStyle = `rgba(212, 173, 114, ${0.28 + screenState.refreshFlash * 0.4})`;
      ideCtx.lineWidth = 1.5;
      ideCtx.beginPath();
      for (let x = 0; x <= 210; x += 6) {
        const py = 605 + Math.sin(x * 0.05 + tSec * 2.2 + screenState.chapterIdx * 1.1 + screenState.keystrokeCount * 0.6) * (16 + screenState.refreshFlash * 6) * Math.sin(x * 0.015);
        if (x === 0) ideCtx.moveTo(1020 + x, py);
        else ideCtx.lineTo(1020 + x, py);
      }
      ideCtx.stroke();

      // 键盘或章节切换触发时的柔和青色微闪遮罩
      if (screenState.refreshFlash > 0.01) {
        const flashGrad = ideCtx.createLinearGradient(0, 0, 1280, 700);
        flashGrad.addColorStop(0, `rgba(103, 217, 210, ${screenState.refreshFlash * 0.08})`);
        flashGrad.addColorStop(1, `rgba(212, 173, 114, ${screenState.refreshFlash * 0.05})`);
        ideCtx.fillStyle = flashGrad;
        ideCtx.fillRect(0, 0, 1280, 700);
      }

      if (screenState.hoverBorder > 0.01) {
        ideCtx.strokeStyle = `rgba(103, 217, 210, ${screenState.hoverBorder * 0.7})`;
        ideCtx.lineWidth = 5;
        ideCtx.strokeRect(2.5, 2.5, 1275, 695);
      }

      ideCtx.restore();
      ideTexture.needsUpdate = true;
    }

    const screenMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(MON_W, MON_H),
      new THREE.MeshBasicMaterial({ map: ideTexture, toneMapped: false })
    );
    screenMesh.position.set(0, 0.49, 0.002);
    screenMesh.userData.interactiveType = 'MONITOR';
    monitorGroup.add(screenMesh);


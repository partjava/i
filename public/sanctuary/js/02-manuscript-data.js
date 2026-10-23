    /**
     * ============================================================================
     * 2. TECHNICAL MANUSCRIPT PAGES DATA (5 CHAPTERS / 10 PAGES C++ DATA STRUCTURES)
     * ============================================================================
     */
    const MANUSCRIPT_PAGES = [
      {
        page: 1,
        chapter: 'CHAPTER I · 线性表 (LINEAR LISTS)',
        title: '顺序表动态扩容与双向链表指针拓扑',
        quote: '“连续内存赋予极致缓存局部性，链式节点换取 O(1) 任意位置增删。”',
        points: [
          '• 顺序表 (std::vector)：倍增扩容均摊复杂度 O(1)，注意扩容导致的迭代器失效。',
          '• 单链表与双向链表 (std::list)：头插/尾插、原地逆置、快慢指针判环与入环点定位。',
          '• 静态链表：利用数组游标模拟指针，适用于无堆内存分配的嵌入式与内核场景。'
        ],
        code: [
          'ListNode* reverseList(ListNode* head) noexcept {',
          '  ListNode *prev = nullptr, *curr = head;',
          '  while (curr) { auto* next = curr->next; curr->next = prev; prev = curr; curr = next; }',
          '  return prev;',
          '}'
        ],
        diagram: 'nodes'
      },
      {
        page: 2,
        chapter: 'CHAPTER I · 栈与队列 (STACKS & QUEUES)',
        title: '双端分段队列、单调栈与滑动窗口极值',
        quote: '“受限的线性端口，恰恰构成了状态回溯与异步调度的秩序基石。”',
        points: [
          '• 栈 (std::stack)：函数调用栈帧、括号匹配、逆波兰表达式求值与单调栈找下一个更大元素。',
          '• 循环队列：利用 (tail + 1) % capacity == head 判满，消除假溢出。',
          '• 单调队列 (std::deque)：双端维护区间单调递减序列，O(n) 求解滑动窗口最大值。'
        ],
        code: [
          'while (!mono_dq.empty() && nums[mono_dq.back()] <= nums[i])',
          '  mono_dq.pop_back(); // 维护队列单调递减性',
          'mono_dq.push_back(i);'
        ],
        diagram: 'wave'
      },
      {
        page: 3,
        chapter: 'CHAPTER II · 串与模式匹配 (STRINGS & KMP)',
        title: 'SSO 小字符串优化、KMP 自动机与字典树',
        quote: '“利用已匹配前缀的最长公共前后缀信息，让主串指针永不回溯。”',
        points: [
          '• std::string SSO 优化：短串（≤15字节）直接存于栈对象内部缓冲区，零堆内存分配。',
          '• KMP 模式匹配：构建 next 前缀转移表，将暴力匹配 O(nm) 降至线性 O(n + m)。',
          '• 字典树 (Trie)：共享公共前缀路径，高效支撑词频统计、前缀自动补全与 AC 自动机。'
        ],
        code: [
          'for (int i = 1, j = 0; i < m; ++i) {',
          '  while (j > 0 && pat[i] != pat[j]) j = next[j - 1];',
          '  if (pat[i] == pat[j]) ++j;',
          '  next[i] = j;',
          '}'
        ],
        diagram: 'circuit'
      },
      {
        page: 4,
        chapter: 'CHAPTER II · 数组、特殊矩阵与广义表',
        title: '多维行优先寻址、CSR 稀疏矩阵压缩与广义表',
        quote: '“通过数学映射与三元组索引，将高维稀疏空间浓缩为紧凑线性存储。”',
        points: [
          '• 多维数组寻址：C++ 采用行优先存储，A[i][j] 地址 = base + (i * N + j) * sizeof(T)。',
          '• 特殊与稀疏矩阵：对称/三角矩阵一维映射；CSR 格式通过 row_ptr、col_idx 压缩非零元。',
          '• 广义表 (Generalized List)：支持原子与子表递归嵌套，通过 head() 与 tail() 解构。'
        ],
        code: [
          'struct CSRMatrix {',
          '  std::vector<double> values;      // 非零元素值 (NNZ)',
          '  std::vector<int> col_idx, row_ptr; // 列号与行起始偏移',
          '};'
        ],
        diagram: 'nodes'
      },
      {
        page: 5,
        chapter: 'CHAPTER III · 树与二叉树 (TREES & BINARY TREES)',
        title: '非递归遍历、线索二叉树、哈夫曼编码与并查集',
        quote: '“递归是树的天然语言，而显式栈与线索化则揭开了底层的时空转换。”',
        points: [
          '• 遍历体系：前序、中序、后序（递归与显式栈非递归）、层序 BFS 与 Morris O(1) 空间遍历。',
          '• 哈夫曼树 (Huffman)：每次合并权值最小的两棵子树，达到带权路径长度 WPL 最优前缀编码。',
          '• 并查集 (Union-Find)：路径压缩 + 按秩合并，单次合并与连通查询逼近常数级 O(α(n))。'
        ],
        code: [
          'int findRoot(int x) noexcept {',
          '  return parent[x] == x ? x : (parent[x] = findRoot(parent[x]));',
          '}'
        ],
        diagram: 'nodes'
      },
      {
        page: 6,
        chapter: 'CHAPTER III · 堆与优先队列 (HEAPS & PRIORITY QUEUES)',
        title: '完全二叉树数组映射、Floyd 线性建堆与 Top-K',
        quote: '“无需单个指针域，仅凭数组下标算术即可驾驭动态极值调度。”',
        points: [
          '• 数组下标映射：父节点 (i - 1) / 2，左孩子 2i + 1，右孩子 2i + 2，零指针内存开销。',
          '• 核心原语：插入元素上浮 siftUp O(logN)，弹出堆顶下沉 siftDown O(logN)。',
          '• Floyd 自底向上建堆：从最后一个非叶节点 n/2 - 1 逆序下沉，总体时间复杂度严格为 O(n)。'
        ],
        code: [
          'void siftDown(std::vector<int>& h, int i, int n) {',
          '  while (2 * i + 1 < n) {',
          '    int c = 2 * i + 1;',
          '    if (c + 1 < n && h[c + 1] > h[c]) ++c;',
          '    if (h[i] >= h[c]) break;',
          '    std::swap(h[i], h[c]); i = c;',
          '  }',
          '}'
        ],
        diagram: 'wave'
      },
      {
        page: 7,
        chapter: 'CHAPTER IV · 查找表与平衡搜索树 (树表专页 I)',
        title: '二分查找边界、AVL 四种旋转、红黑树与 B+ 树',
        quote: '“在严格高度平衡与局部旋转代价之间，红黑树找到了工程最优解。”',
        points: [
          '• 二分查找 (std::lower_bound)：左闭右开区间 [l, r) 不变量，精准定位首个 ≥ target 元素。',
          '• AVL 树 vs 红黑树 (std::map)：AVL 严格控制高度差 ≤1；红黑树借五条性质保证最长路径 ≤2倍最短路径，删除最多旋转 3 次。',
          '• B 树与 B+ 树：多路平衡搜索树，B+ 树非叶节点仅存索引、叶节点双向链表串联，适配磁盘页预读。'
        ],
        code: [
          'Node* rotateLeft(Node* x) noexcept {',
          '  Node* y = x->right; x->right = y->left;',
          '  if (y->left) y->left->parent = x;',
          '  y->parent = x->parent; y->left = x; x->parent = y;',
          '  return y;',
          '}'
        ],
        diagram: 'nodes'
      },
      {
        page: 8,
        chapter: 'CHAPTER IV · 散列表与工业级缓存 (哈希专页 II)',
        title: '冲突消解策略、Rehash 扩容与 O(1) LRU 淘汰算法',
        quote: '“用空间换取时间的艺术：哈希映射负责 O(1) 寻址，双向链表维护时序。”',
        points: [
          '• 散列冲突处理：拉链法（std::unordered_map 桶+链表）与开放定址法（线性探测/二次探测）。',
          '• 负载因子与 Rehash：当 α = size / bucket_count 超阈值时翻倍桶数组并重新映射所有节点。',
          '• LRU Cache 经典架构：哈希表存储 key -> std::list::iterator，利用 splice 实现 O(1) 节点提至表头。'
        ],
        code: [
          'void touch(Key k) { // O(1) 将访问节点移至双向链表头部',
          '  auto it = index_map_.find(k);',
          '  lru_list_.splice(lru_list_.begin(), lru_list_, it->second);',
          '}'
        ],
        diagram: 'circuit'
      },
      {
        page: 9,
        chapter: 'CHAPTER V · 排序算法体系 (SORTING ALGORITHMS)',
        title: '快排分区、归并分治、堆排与 std::sort 内省排序',
        quote: '“没有单一排序能通吃所有分布，融合快排、堆排与插排的 IntroSort 才是工业答案。”',
        points: [
          '• 三大 O(n log n) 排序：快速排序（三数取中+双指针分区）、归并排序（稳定排序+逆序对统计）、堆排序（O(1) 额外空间原地排序）。',
          '• 非比较排序：计数排序、桶排序与基数排序，突破基于比较的 Ω(n log n) 理论下界。',
          '• C++ std::sort 底层：递归深度超 2·log2(N) 自动转堆排序防退化，子区间 ≤16 转插入排序。'
        ],
        code: [
          'if (right - left <= kInsertionThreshold) {',
          '  insertionSort( left, right ); return;',
          '}',
          'if (depth_limit == 0) { heapSort(left, right); return; }'
        ],
        diagram: 'wave'
      },
      {
        page: 10,
        chapter: 'CHAPTER V · 图论及其算法 (GRAPH ALGORITHMS)',
        title: '邻接表、最小生成树、堆优化 Dijkstra 与拓扑排序',
        quote: '“万物皆可抽象为顶点与边，松弛操作（Relaxation）是探索最短路径的指南针。”',
        points: [
          '• 图的存储与搜索：邻接矩阵 O(V²) 与邻接表 O(V + E)；DFS 连通分量回溯与 BFS 无权最短路。',
          '• 最小生成树 (MST)：Kruskal 算法（按边权排序 + 并查集判环 O(E log E)）与 Prim 贪心加点法。',
          '• 最短路与 DAG：堆优化 Dijkstra O((V+E)logV)、Floyd 动态规划，以及 Kahn 入度队列拓扑排序。'
        ],
        code: [
          'while (!pq.empty()) {',
          '  auto [d, u] = pq.top(); pq.pop();',
          '  if (d > dist[u]) continue;',
          '  for (auto [v, w] : adj[u])',
          '    if (dist[u] + w < dist[v]) pq.emplace(dist[v] = dist[u] + w, v);',
          '}'
        ],
        diagram: 'nodes'
      }
    ];


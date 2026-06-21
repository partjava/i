'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
  TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '数据结构与算法',
  chapterTitle: '面试题与实战',
  chapterNumber: 10,
  totalChapters: 10,
  subjectHref: '/study/computer/ds',
  prevChapter: { label: '动态规划', href: '/study/computer/ds/dp' },
  theme: THEMES.computer,
}

const sortData = [
  { algo: '冒泡排序', avg: 'O(n²)', best: 'O(n)', worst: 'O(n²)', space: 'O(1)', stable: '稳定', features: ['简单实现', '适合小数据量'] },
  { algo: '选择排序', avg: 'O(n²)', best: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stable: '不稳定', features: ['实现简单', '数据移动少'] },
  { algo: '插入排序', avg: 'O(n²)', best: 'O(n)', worst: 'O(n²)', space: 'O(1)', stable: '稳定', features: ['适合小规模', '近乎有序高效'] },
  { algo: '希尔排序', avg: 'O(n^1.3)', best: 'O(n)', worst: 'O(n²)', space: 'O(1)', stable: '不稳定', features: ['插入排序改进', '中等规模高效'] },
  { algo: '归并排序', avg: 'O(n log n)', best: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)', stable: '稳定', features: ['分治思想', '外部排序'] },
  { algo: '快速排序', avg: 'O(n log n)', best: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)', stable: '不稳定', features: ['应用最广泛', '原地排序'] },
  { algo: '堆排序', avg: 'O(n log n)', best: 'O(n log n)', worst: 'O(n log n)', space: 'O(1)', stable: '不稳定', features: ['原地排序', '求TopK'] },
  { algo: '计数排序', avg: 'O(n+k)', best: 'O(n+k)', worst: 'O(n+k)', space: 'O(n+k)', stable: '稳定', features: ['非比较排序', '整数范围集中'] },
  { algo: '桶排序', avg: 'O(n+k)', best: 'O(n)', worst: 'O(n²)', space: 'O(n+k)', stable: '稳定', features: ['非比较排序', '分布均匀高效'] },
  { algo: '基数排序', avg: 'O(d(n+k))', best: 'O(d(n+k))', worst: 'O(d(n+k))', space: 'O(n+k)', stable: '稳定', features: ['非比较排序', '适合字符串/整数'] },
]

const SPREADS = [
  {
    label: '排序算法专题',
    left: (
      <div className="space-y-4">
        <PageTitle>排序算法全解析</PageTitle>
        <BookParagraph>排序算法是算法面试的基础，也是理解算法复杂度与设计思想的良好入口。本专题详细介绍常见排序算法的原理、实现与应用。</BookParagraph>
        <SectionTitle>排序算法对比</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead><tr className="border-b-2 text-left" style={{ borderColor: '#90caf9' }}>
              <th className="p-1 font-semibold">算法</th><th className="p-1 font-semibold">平均</th><th className="p-1 font-semibold">最好</th><th className="p-1 font-semibold">最坏</th><th className="p-1 font-semibold">空间</th><th className="p-1 font-semibold">稳定</th>
            </tr></thead>
            <tbody>
              {sortData.map((d, i) => (
                <tr key={i} className="border-b"><td className="p-1 font-medium">{d.algo}</td><td className="p-1">{d.avg}</td><td className="p-1">{d.best}</td><td className="p-1">{d.worst}</td><td className="p-1">{d.space}</td><td className="p-1">{d.stable}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <BookAlert type="info" message="实际应用中，小规模数据用插入排序，中等规模用快速排序，大规模且要求稳定用归并排序，特定范围整数用计数排序。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>冒泡排序</SectionTitle>
        <BookParagraph><b>原理：</b>每次遍历将未排序区间中最大的元素「冒泡」到末尾。</BookParagraph>
        <BookCode language="cpp" code={`void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; ++i) {
        bool swapped = false;
        for (int j = 0; j < n - 1 - i; ++j) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`} />
        <SectionTitle>快速排序</SectionTitle>
        <BookParagraph><b>原理：</b>选定基准，将数组分为小于和大于基准两部分，递归排序。</BookParagraph>
        <BookCode language="cpp" code={`void quickSort(vector<int>& arr, int l, int r) {
    if (l >= r) return;
    int pivot = arr[r];
    int i = l - 1;
    for (int j = l; j < r; ++j) {
        if (arr[j] < pivot) swap(arr[++i], arr[j]);
    }
    swap(arr[i + 1], arr[r]);
    int mid = i + 1;
    quickSort(arr, l, mid - 1);
    quickSort(arr, mid + 1, r);
}`} />
        <TagGrid items={['排序', '冒泡', '快排', '归并', '堆排', '插入排序']} />
      </div>
    ),
  },
  {
    label: '排序算法详解',
    left: (
      <div className="space-y-4">
        <SectionTitle>插入排序</SectionTitle>
        <BookParagraph><b>原理：</b>每次将一个元素插入到前面已排序的序列中。</BookParagraph>
        <BookCode language="cpp" code={`void insertionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 1; i < n; ++i) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j]; --j;
        }
        arr[j + 1] = key;
    }
}`} />
        <SectionTitle>归并排序</SectionTitle>
        <BookParagraph><b>原理：</b>分治思想，分成两半分别排序后合并。</BookParagraph>
        <BookCode language="cpp" code={`void merge(vector<int>& arr, int l, int m, int r) {
    vector<int> tmp(r - l + 1);
    int i = l, j = m + 1, k = 0;
    while (i <= m && j <= r)
        tmp[k++] = arr[i] <= arr[j] ? arr[i++] : arr[j++];
    while (i <= m) tmp[k++] = arr[i++];
    while (j <= r) tmp[k++] = arr[j++];
    for (int t = 0; t < tmp.size(); ++t) arr[l + t] = tmp[t];
}
void mergeSort(vector<int>& arr, int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>堆排序</SectionTitle>
        <BookParagraph><b>原理：</b>利用堆数据结构，每次取出堆顶元素。</BookParagraph>
        <BookCode language="cpp" code={`void heapify(vector<int>& arr, int n, int i) {
    int largest = i, l = 2 * i + 1, r = 2 * i + 2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}
void heapSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = n / 2 - 1; i >= 0; --i) heapify(arr, n, i);
    for (int i = n - 1; i > 0; --i) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}`} />
        <BookParagraph><b>典型题型：</b>手写排序函数，第K大元素（快速选择），逆序对（归并思想）。</BookParagraph>
        <TagGrid items={['插入排序', '归并排序', '堆排序', '分治', '原地排序']} />
      </div>
    ),
  },
  {
    label: '查找算法专题',
    left: (
      <div className="space-y-4">
        <PageTitle>查找算法全解析</PageTitle>
        <BookParagraph>查找算法是数据结构与算法面试的高频考点，涵盖顺序查找、二分查找、哈希查找、树结构查找等。</BookParagraph>
        <SectionTitle>查找算法对比</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead><tr className="border-b-2 text-left" style={{ borderColor: '#90caf9' }}>
              <th className="p-1 font-semibold">算法</th><th className="p-1 font-semibold">时间复杂度</th><th className="p-1 font-semibold">空间</th><th className="p-1 font-semibold">适用场景</th>
            </tr></thead>
            <tbody>
              <tr className="border-b"><td className="p-1 font-medium">顺序查找</td><td className="p-1">O(n)</td><td className="p-1">O(1)</td><td className="p-1">无序数组</td></tr>
              <tr className="border-b"><td className="p-1 font-medium">二分查找</td><td className="p-1">O(log n)</td><td className="p-1">O(1)</td><td className="p-1">有序数组</td></tr>
              <tr className="border-b"><td className="p-1 font-medium">哈希查找</td><td className="p-1">O(1)</td><td className="p-1">O(n)</td><td className="p-1">哈希表</td></tr>
              <tr className="border-b"><td className="p-1 font-medium">平衡树查找</td><td className="p-1">O(log n)</td><td className="p-1">O(n)</td><td className="p-1">平衡二叉树</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>顺序查找</SectionTitle>
        <BookCode language="cpp" code={`int linearSearch(const vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); ++i)
        if (arr[i] == target) return i;
    return -1;
}`} />
        <SectionTitle>二分查找</SectionTitle>
        <BookCode language="cpp" code={`int binarySearch(const vector<int>& arr, int target) {
    int l = 0, r = arr.size() - 1;
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (arr[m] == target) return m;
        else if (arr[m] < target) l = m + 1;
        else r = m - 1;
    }
    return -1;
}`} />
        <SectionTitle>哈希查找</SectionTitle>
        <BookCode language="cpp" code={`// 使用unordered_map
int hashSearch(const vector<int>& arr, int target) {
    unordered_map<int, int> mp;
    for (int i = 0; i < arr.size(); ++i) mp[arr[i]] = i;
    return mp.count(target) ? mp[target] : -1;
}`} />
        <TagGrid items={['二分查找', '顺序查找', '哈希查找', '平衡树', '查找']} />
      </div>
    ),
  },
  {
    label: '图论算法专题',
    left: (
      <div className="space-y-4">
        <PageTitle>图论算法全解析</PageTitle>
        <BookParagraph>图论算法是面试和竞赛中的高频考点，涵盖图的存储、遍历、最短路径、最小生成树等。</BookParagraph>
        <SectionTitle>常见图论算法对比</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead><tr className="border-b-2 text-left" style={{ borderColor: '#90caf9' }}>
              <th className="p-1 font-semibold">算法</th><th className="p-1 font-semibold">时间复杂度</th><th className="p-1 font-semibold">空间</th><th className="p-1 font-semibold">适用场景</th>
            </tr></thead>
            <tbody>
              <tr className="border-b"><td className="p-1 font-medium">BFS</td><td className="p-1">O(V+E)</td><td className="p-1">O(V)</td><td className="p-1">最短路/连通性</td></tr>
              <tr className="border-b"><td className="p-1 font-medium">DFS</td><td className="p-1">O(V+E)</td><td className="p-1">O(V)</td><td className="p-1">连通分量/拓扑</td></tr>
              <tr className="border-b"><td className="p-1 font-medium">Dijkstra</td><td className="p-1">O(E log V)</td><td className="p-1">O(V)</td><td className="p-1">单源最短路（正权）</td></tr>
              <tr className="border-b"><td className="p-1 font-medium">Floyd</td><td className="p-1">O(V³)</td><td className="p-1">O(V²)</td><td className="p-1">多源最短路</td></tr>
              <tr className="border-b"><td className="p-1 font-medium">Kruskal</td><td className="p-1">O(E log E)</td><td className="p-1">O(V)</td><td className="p-1">最小生成树（稀疏）</td></tr>
              <tr className="border-b"><td className="p-1 font-medium">Prim</td><td className="p-1">O(E log V)</td><td className="p-1">O(V)</td><td className="p-1">最小生成树（稠密）</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>图的存储与遍历</SectionTitle>
        <BookCode language="cpp" code={`// 邻接表存储 + BFS/DFS
vector<vector<int>> graph;
vector<bool> visited;
void bfs(int start) {
    queue<int> q; q.push(start); visited[start] = true;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : graph[u]) if (!visited[v]) { q.push(v); visited[v] = true; }
    }
}
void dfs(int u) {
    visited[u] = true;
    for (int v : graph[u]) if (!visited[v]) dfs(v);
}`} />
        <SectionTitle>Dijkstra最短路</SectionTitle>
        <BookCode language="cpp" code={`vector<int> dijkstra(int n, vector<vector<pair<int,int>>>& graph, int src) {
    vector<int> dist(n, INT_MAX); dist[src] = 0;
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    pq.push({0, src});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        for (auto [v, w] : graph[u]) {
            if (dist[v] > d + w) { dist[v] = d + w; pq.push({dist[v], v}); }
        }
    }
    return dist;
}`} />
        <SectionTitle>Kruskal最小生成树</SectionTitle>
        <BookCode language="cpp" code={`struct Edge { int u, v, w; };
struct DSU {
    vector<int> fa;
    DSU(int n): fa(n) { iota(fa.begin(), fa.end(), 0); }
    int find(int x) { return fa[x] == x ? x : fa[x] = find(fa[x]); }
    void unite(int x, int y) { fa[find(x)] = find(y); }
};
int kruskal(int n, vector<Edge>& edges) {
    sort(edges.begin(), edges.end(), [](Edge a, Edge b){ return a.w < b.w; });
    DSU dsu(n); int res = 0, cnt = 0;
    for (auto& e : edges) {
        if (dsu.find(e.u) != dsu.find(e.v)) {
            dsu.unite(e.u, e.v); res += e.w; ++cnt;
        }
    }
    return cnt == n - 1 ? res : -1;
}`} />
        <TagGrid items={['BFS', 'DFS', 'Dijkstra', 'Floyd', 'Kruskal', 'Prim']} />
      </div>
    ),
  },
  {
    label: '动态规划专题',
    left: (
      <div className="space-y-4">
        <PageTitle>动态规划全解析</PageTitle>
        <BookParagraph>动态规划（DP）是解决最优子结构和重叠子问题的强大工具，常用于背包、序列、区间、编辑距离等问题。</BookParagraph>
        <SectionTitle>常见DP问题对比</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead><tr className="border-b-2 text-left" style={{ borderColor: '#90caf9' }}>
              <th className="p-1 font-semibold">类型</th><th className="p-1 font-semibold">状态表示</th><th className="p-1 font-semibold">转移方程</th><th className="p-1 font-semibold">复杂度</th>
            </tr></thead>
            <tbody>
              <tr className="border-b"><td className="p-1 font-medium">01背包</td><td className="p-1">f[i][j]</td><td className="p-1">max(f[i-1][j], f[i-1][j-w]+v)</td><td className="p-1">O(nW)</td></tr>
              <tr className="border-b"><td className="p-1 font-medium">完全背包</td><td className="p-1">f[i][j]</td><td className="p-1">max(f[i-1][j], f[i][j-w]+v)</td><td className="p-1">O(nW)</td></tr>
              <tr className="border-b"><td className="p-1 font-medium">LIS</td><td className="p-1">f[i]</td><td className="p-1">f[i]=max(f[j])+1</td><td className="p-1">O(n²)</td></tr>
              <tr className="border-b"><td className="p-1 font-medium">LCS</td><td className="p-1">f[i][j]</td><td className="p-1">f[i-1][j-1]+1 / max</td><td className="p-1">O(nm)</td></tr>
              <tr className="border-b"><td className="p-1 font-medium">区间DP</td><td className="p-1">f[i][j]</td><td className="p-1">min(f[i][k]+f[k+1][j]+cost)</td><td className="p-1">O(n³)</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>01背包</SectionTitle>
        <BookCode language="cpp" code={`int knapsack01(int n, int W, vector<int>& w, vector<int>& v) {
    vector<int> f(W+1, 0);
    for (int i = 0; i < n; ++i)
        for (int j = W; j >= w[i]; --j)
            f[j] = max(f[j], f[j-w[i]] + v[i]);
    return f[W];
}`} />
        <SectionTitle>完全背包</SectionTitle>
        <BookCode language="cpp" code={`int knapsackFull(int n, int W, vector<int>& w, vector<int>& v) {
    vector<int> f(W+1, 0);
    for (int i = 0; i < n; ++i)
        for (int j = w[i]; j <= W; ++j)
            f[j] = max(f[j], f[j-w[i]] + v[i]);
    return f[W];
}`} />
        <SectionTitle>LIS & LCS</SectionTitle>
        <BookCode language="cpp" code={`// 最长上升子序列 O(n²)
int lengthOfLIS(vector<int>& nums) {
    int n = nums.size(), res = 1;
    vector<int> f(n, 1);
    for (int i = 1; i < n; ++i)
        for (int j = 0; j < i; ++j)
            if (nums[i] > nums[j]) f[i] = max(f[i], f[j] + 1);
    for (int x : f) res = max(res, x);
    return res;
}
// 最长公共子序列 O(nm)
int longestCommonSubsequence(string text1, string text2) {
    int n = text1.size(), m = text2.size();
    vector<vector<int>> f(n+1, vector<int>(m+1, 0));
    for (int i = 1; i <= n; ++i)
        for (int j = 1; j <= m; ++j)
            if (text1[i-1] == text2[j-1])
                f[i][j] = f[i-1][j-1] + 1;
            else f[i][j] = max(f[i-1][j], f[i][j-1]);
    return f[n][m];
}`} />
        <TagGrid items={['01背包', '完全背包', 'LIS', 'LCS', '区间DP']} />
      </div>
    ),
  },
  {
    label: '系统设计专题',
    left: (
      <div className="space-y-4">
        <PageTitle>系统设计全解析</PageTitle>
        <BookParagraph>系统设计是高级面试的重头戏，考查架构能力、扩展性、可用性、性能优化等。</BookParagraph>
        <SectionTitle>核心原则</SectionTitle>
        <BookList items={[
          '高可用性（HA）：系统持续可用，单点故障自动切换',
          '高扩展性：支持水平/垂直扩展，弹性伸缩',
          '高性能：低延迟、高吞吐，合理利用缓存和异步',
          '一致性：数据一致性模型（强一致、最终一致等）',
          '可维护性：分层、解耦、自动化运维',
        ]} />
        <SectionTitle>高频场景</SectionTitle>
        <BookList items={[
          '分布式缓存（如Redis）：缓存穿透、雪崩、击穿防护',
          '消息队列（如Kafka）：解耦、削峰填谷、异步处理',
          '负载均衡：DNS、反向代理、LVS、Nginx',
          '数据库分库分表：水平/垂直拆分、分布式事务',
          '高并发系统：限流、降级、熔断、异步、批量处理',
          '秒杀系统：令牌桶、预减库存、异步下单',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>LRU缓存设计</SectionTitle>
        <BookParagraph><b>原理：</b>最近最少使用淘汰策略，哈希表+双向链表实现。</BookParagraph>
        <BookCode language="cpp" code={`class LRUCache {
    int cap;
    list<pair<int,int>> cache;
    unordered_map<int, list<pair<int,int>>::iterator> mp;
public:
    LRUCache(int capacity): cap(capacity) {}
    int get(int key) {
        if (!mp.count(key)) return -1;
        auto it = mp[key];
        cache.splice(cache.begin(), cache, it);
        return it->second;
    }
    void put(int key, int value) {
        if (mp.count(key)) {
            auto it = mp[key]; it->second = value;
            cache.splice(cache.begin(), cache, it);
        } else {
            if (cache.size() == cap) {
                int old = cache.back().first;
                mp.erase(old); cache.pop_back();
            }
            cache.emplace_front(key, value);
            mp[key] = cache.begin();
        }
    }
};`} />
        <SectionTitle>限流算法（令牌桶）</SectionTitle>
        <BookCode language="cpp" code={`class TokenBucket {
    int capacity, tokens;
    double rate, lastTime;
public:
    TokenBucket(int cap, double r): capacity(cap), tokens(cap), rate(r), lastTime(now()) {}
    bool allow() {
        double t = now();
        tokens = min(capacity, tokens + (t - lastTime) * rate);
        lastTime = t;
        if (tokens >= 1) { tokens--; return true; }
        return false;
    }
};`} />
        <SectionTitle>雪花算法（分布式ID）</SectionTitle>
        <BookCode language="cpp" code={`class Snowflake {
    int machineId, sequence;
    long lastTimestamp;
public:
    long nextId() {
        long ts = now();
        if (ts == lastTimestamp) ++sequence;
        else sequence = 0;
        lastTimestamp = ts;
        return (ts << 22) | (machineId << 12) | sequence;
    }
};`} />
        <TagGrid items={['LRU', '系统设计', '缓存', '限流', '雪花算法']} />
      </div>
    ),
  },
  {
    label: '面试技巧',
    left: (
      <div className="space-y-4">
        <PageTitle>系统设计面试技巧</PageTitle>
        <BookParagraph><b>答题技巧：</b></BookParagraph>
        <BookList items={[
          '需求澄清：明确功能、非功能需求、约束条件',
          '画架构图，分层拆解，逐步细化',
          '考虑扩展性、可用性、容错、数据一致性、性能瓶颈',
          '用例驱动，举例说明设计方案',
          '总结亮点与权衡，展示全局观',
        ]} />
        <SectionTitle>经典易错点</SectionTitle>
        <BookList items={[
          '子网掩码与可用主机数计算错误',
          '静态/动态路由混淆',
          'VLAN间通信与三层交换原理',
          '协议端口号记忆混乱',
          '云网络安全策略理解不清',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>答题结构建议</SectionTitle>
        <BookParagraph>定义→原理→流程→应用→优缺点</BookParagraph>
        <BookAlert type="info" message="建议梳理知识体系，整理常见配置与命令，多做真题和场景题，注重原理与实际结合。" />
        <TagGrid items={['面试技巧', '系统设计', '答题框架', '易错点', '场景题']} />
      </div>
    ),
  },
]

export default function DsInterviewPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

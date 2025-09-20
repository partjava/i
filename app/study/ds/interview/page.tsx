'use client';
import React from 'react';
import { Typography, Card, Alert, Tabs, Table, Space, Tag, Collapse } from 'antd';
import { CodeBlock } from '@/app/components/ui/CodeBlock';

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

export default function InterviewPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Title level={2} className="mb-6">面试专题详解</Title>
      <Paragraph className="mb-8">
        本页面集合了数据结构与算法面试中的重点专题，包括排序算法、查找算法、图论算法、动态规划以及系统设计。每个专题都包含了基本原理、C++实现、复杂度分析以及典型面试题目。
      </Paragraph>
      <Tabs
        defaultActiveKey="sorting"
        className="mt-4"
        items={[
          {
            key: 'sorting',
            label: '排序算法专题',
            children: (
              <div className="space-y-6">
                <Title level={3}>排序算法全解析</Title>
                <Paragraph>
                  排序算法是算法面试的基础，也是理解算法复杂度与设计思想的良好入口。本专题详细介绍常见排序算法的原理、实现与应用。
                </Paragraph>
            <Card className="mb-6">
              <Title level={4}>排序算法对比</Title>
              <Table 
                dataSource={[
                  {
                    key: '1',
                    algorithm: '冒泡排序',
                    timeAverage: 'O(n²)',
                    timeBest: 'O(n)',
                    timeWorst: 'O(n²)',
                    space: 'O(1)',
                    stability: '稳定',
                    features: ['简单实现', '适合小数据量'],
                  },
                  {
                    key: '2',
                    algorithm: '选择排序',
                    timeAverage: 'O(n²)',
                    timeBest: 'O(n²)',
                    timeWorst: 'O(n²)',
                    space: 'O(1)',
                    stability: '不稳定',
                    features: ['实现简单', '数据移动少'],
                  },
                  {
                    key: '3',
                    algorithm: '插入排序',
                    timeAverage: 'O(n²)',
                    timeBest: 'O(n)',
                    timeWorst: 'O(n²)',
                    space: 'O(1)',
                    stability: '稳定',
                    features: ['适合小规模数据', '近乎有序效率高'],
                  },
                  {
                    key: '4',
                    algorithm: '希尔排序',
                    timeAverage: 'O(n^1.3)',
                    timeBest: 'O(n)',
                    timeWorst: 'O(n²)',
                    space: 'O(1)',
                    stability: '不稳定',
                    features: ['插入排序改进版', '对中等规模数据高效'],
                  },
                  {
                    key: '5',
                    algorithm: '归并排序',
                    timeAverage: 'O(n log n)',
                    timeBest: 'O(n log n)',
                    timeWorst: 'O(n log n)',
                    space: 'O(n)',
                    stability: '稳定',
                    features: ['分治思想', '外部排序'],
                  },
                  {
                    key: '6',
                    algorithm: '快速排序',
                    timeAverage: 'O(n log n)',
                    timeBest: 'O(n log n)',
                    timeWorst: 'O(n²)',
                    space: 'O(log n)',
                    stability: '不稳定',
                    features: ['实际应用最广泛', '原地排序优化'],
                  },
                  {
                    key: '7',
                    algorithm: '堆排序',
                    timeAverage: 'O(n log n)',
                    timeBest: 'O(n log n)',
                    timeWorst: 'O(n log n)',
                    space: 'O(1)',
                    stability: '不稳定',
                    features: ['原地排序', '求TopK问题'],
                  },
                  {
                    key: '8',
                    algorithm: '计数排序',
                    timeAverage: 'O(n+k)',
                    timeBest: 'O(n+k)',
                    timeWorst: 'O(n+k)',
                    space: 'O(n+k)',
                    stability: '稳定',
                    features: ['非比较排序', '适合范围集中的整数'],
                  },
                  {
                    key: '9',
                    algorithm: '桶排序',
                    timeAverage: 'O(n+k)',
                    timeBest: 'O(n)',
                    timeWorst: 'O(n²)',
                    space: 'O(n+k)',
                    stability: '稳定',
                    features: ['非比较排序', '数据分布均匀时高效'],
                  },
                  {
                    key: '10',
                    algorithm: '基数排序',
                    timeAverage: 'O(d(n+k))',
                    timeBest: 'O(d(n+k))',
                    timeWorst: 'O(d(n+k))',
                    space: 'O(n+k)',
                    stability: '稳定',
                    features: ['非比较排序', '适合字符串或整数'],
                  },
                ]}
                columns={[
                  {
                    title: '算法',
                    dataIndex: 'algorithm',
                    key: 'algorithm',
                  },
                  {
                    title: '平均时间',
                    dataIndex: 'timeAverage',
                    key: 'timeAverage',
                  },
                  {
                    title: '最好时间',
                    dataIndex: 'timeBest',
                    key: 'timeBest',
                  },
                  {
                    title: '最坏时间',
                    dataIndex: 'timeWorst',
                    key: 'timeWorst',
                  },
                  {
                    title: '空间复杂度',
                    dataIndex: 'space',
                    key: 'space',
                  },
                  {
                    title: '稳定性',
                    dataIndex: 'stability',
                    key: 'stability',
                  },
                  {
                    title: '特点',
                    dataIndex: 'features',
                    key: 'features',
                    render: (features: string[]) => (
                      <>
                        {features.map(feature => (
                          <Tag color="blue" key={feature}>
                            {feature}
                          </Tag>
                        ))}
                      </>
                    ),
                  },
                ]}
                size="small"
                pagination={false}
                scroll={{ x: 'max-content' }}
              />
              <Alert
                type="info"
                message="排序算法应用指南"
                description="实际应用中，对于小规模数据通常使用插入排序，中等规模数据使用快速排序，大规模且稳定性要求高的使用归并排序，特定范围整数使用计数排序或基数排序。"
                className="mt-4"
              />
            </Card>
            
            <Collapse className="mt-6" accordion>
            <Panel header="冒泡排序（Bubble Sort）" key="bubble">
              <Paragraph>
                <b>原理：</b> 每次遍历将未排序区间中最大的元素"冒泡"到末尾，重复n-1轮即可完成排序。
              </Paragraph>
              <Paragraph>
                <b>复杂度：</b> 最好O(n)（已排序时），最坏/平均O(n²)，空间O(1)，<Text type="success">稳定</Text>
              </Paragraph>
              <CodeBlock language="cpp">{
`// 冒泡排序 C++实现
void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; ++i) {
        bool swapped = false;
        for (int j = 0; j < n - 1 - i; ++j) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break; // 已有序提前结束
    }
}
`}
              </CodeBlock>
              <Paragraph>
                <b>典型题型：</b> <br />
                1. 手写冒泡排序函数<br />
                2. 判断数组是否已经有序（可在冒泡排序中优化）
              </Paragraph>
            </Panel>
            <Panel header="快速排序（Quick Sort）" key="quick">
              <Paragraph>
                <b>原理：</b> 选定基准，将数组分为小于和大于基准两部分，递归排序，分治思想。
              </Paragraph>
              <Paragraph>
                <b>复杂度：</b> 最好/平均O(n log n)，最坏O(n²)，空间O(log n)，<Text type="danger">不稳定</Text>
              </Paragraph>
              <CodeBlock language="cpp">{
`// 快速排序 C++实现
void quickSort(vector<int>& arr, int l, int r) {
    if (l >= r) return;
    int pivot = arr[r]; // 选最右为基准
    int i = l - 1;
    for (int j = l; j < r; ++j) {
        if (arr[j] < pivot) {
            ++i;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[r]);
    int mid = i + 1;
    quickSort(arr, l, mid - 1);
    quickSort(arr, mid + 1, r);
}
// 调用：quickSort(arr, 0, arr.size() - 1);
`}
              </CodeBlock>
              <Paragraph>
                <b>典型题型：</b> <br />
                1. 手写快速排序函数<br />
                2. 数组中第K大元素（可用快排思想的快速选择算法）
              </Paragraph>
            </Panel>
            <Panel header="插入排序（Insertion Sort）" key="insertion">
              <Paragraph>
                <b>原理：</b> 每次将一个元素插入到前面已排序的序列中，直到全部有序。
              </Paragraph>
              <Paragraph>
                <b>复杂度：</b> 最好O(n)（近乎有序），最坏/平均O(n²)，空间O(1)，<Text type="success">稳定</Text>
              </Paragraph>
              <CodeBlock language="cpp">{
`// 插入排序 C++实现
void insertionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 1; i < n; ++i) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            --j;
        }
        arr[j + 1] = key;
    }
}
`}
              </CodeBlock>
              <Paragraph>
                <b>典型题型：</b> <br />
                1. 手写插入排序函数<br />
                2. 适合处理小规模、近乎有序的数据
              </Paragraph>
            </Panel>
            <Panel header="归并排序（Merge Sort）" key="merge">
              <Paragraph>
                <b>原理：</b> 分治思想，将数组递归分成两半，分别排序后合并。
              </Paragraph>
              <Paragraph>
                <b>复杂度：</b> 最好/最坏/平均O(n log n)，空间O(n)，<Text type="success">稳定</Text>
              </Paragraph>
              <CodeBlock language="cpp">{
`// 归并排序 C++实现
void merge(vector<int>& arr, int l, int m, int r) {
    vector<int> tmp(r - l + 1);
    int i = l, j = m + 1, k = 0;
    while (i <= m && j <= r) {
        if (arr[i] <= arr[j]) tmp[k++] = arr[i++];
        else tmp[k++] = arr[j++];
    }
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
}
// 调用：mergeSort(arr, 0, arr.size() - 1);
`}
              </CodeBlock>
              <Paragraph>
                <b>典型题型：</b> <br />
                1. 手写归并排序函数<br />
                2. 求逆序对数量（归并排序思想）
              </Paragraph>
            </Panel>
            <Panel header="堆排序（Heap Sort）" key="heap">
              <Paragraph>
                <b>原理：</b> 利用堆这种数据结构，每次取出堆顶元素放到已排序区间。
              </Paragraph>
              <Paragraph>
                <b>复杂度：</b> 最好/最坏/平均O(n log n)，空间O(1)，<Text type="danger">不稳定</Text>
              </Paragraph>
              <CodeBlock language="cpp">{
`// 堆排序 C++实现
void heapify(vector<int>& arr, int n, int i) {
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
}
`}
              </CodeBlock>
              <Paragraph>
                <b>典型题型：</b> <br />
                1. 手写堆排序函数<br />
                2. 求数组第K大元素（堆排序思想）
              </Paragraph>
            </Panel>
          </Collapse>
          </div>
        ),
      },
      {
        key: 'searching',
        label: '查找算法专题',
        children: (
          <div className="space-y-6">
            <Title level={3}>查找算法全解析</Title>
            <Paragraph>
              查找算法是数据结构与算法面试的高频考点，涵盖顺序查找、二分查找、哈希查找、树结构查找等。不同查找方法适用于不同场景。
            </Paragraph>
            <Card className="mb-6">
              <Title level={4}>查找算法对比</Title>
              <Table
                dataSource={[
                  { key: '1', algorithm: '顺序查找', time: 'O(n)', space: 'O(1)', scene: '无序数组', features: ['实现简单', '无需有序'] },
                  { key: '2', algorithm: '二分查找', time: 'O(log n)', space: 'O(1)', scene: '有序数组', features: ['高效', '需有序'] },
                  { key: '3', algorithm: '哈希查找', time: 'O(1)', space: 'O(n)', scene: '哈希表', features: ['极快', '需哈希函数'] },
                  { key: '4', algorithm: '平衡树查找', time: 'O(log n)', space: 'O(n)', scene: '平衡二叉树', features: ['动态有序', '支持区间'] },
                ]}
                columns={[
                  { title: '算法', dataIndex: 'algorithm', key: 'algorithm' },
                  { title: '时间复杂度', dataIndex: 'time', key: 'time' },
                  { title: '空间复杂度', dataIndex: 'space', key: 'space' },
                  { title: '适用场景', dataIndex: 'scene', key: 'scene' },
                  { title: '特点', dataIndex: 'features', key: 'features', render: (features: string[],record:any,index:number) => (<>{features.map((f,index) => <Tag color="blue" key={index}>{f}</Tag>)}</>) },
                ]}
                size="small"
                pagination={false}
                scroll={{ x: 'max-content' }}
              />
            </Card>
            <Collapse className="mt-6" accordion>
              <Panel header="顺序查找（Linear Search）" key="linear">
                <Paragraph>
                  <b>原理：</b> 依次遍历数组，找到目标元素。
                </Paragraph>
                <Paragraph>
                  <b>复杂度：</b> 时间O(n)，空间O(1)
                </Paragraph>
                <CodeBlock language="cpp">{
`// 顺序查找 C++实现
int linearSearch(const vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); ++i) {
        if (arr[i] == target) return i;
    }
    return -1;
}
`}
                </CodeBlock>
                <Paragraph>
                  <b>典型题型：</b> <br />
                  1. 无序数组查找目标值<br />
                  2. 查找所有等于目标的下标
                </Paragraph>
              </Panel>
              <Panel header="二分查找（Binary Search）" key="binary">
                <Paragraph>
                  <b>原理：</b> 针对有序数组，每次折半查找目标。
                </Paragraph>
                <Paragraph>
                  <b>复杂度：</b> 时间O(log n)，空间O(1)
                </Paragraph>
                <CodeBlock language="cpp">{
`// 二分查找 C++实现
int binarySearch(const vector<int>& arr, int target) {
    int l = 0, r = arr.size() - 1;
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (arr[m] == target) return m;
        else if (arr[m] < target) l = m + 1;
        else r = m - 1;
    }
    return -1;
}
`}
                </CodeBlock>
                <Paragraph>
                  <b>典型题型：</b> <br />
                  1. 有序数组查找目标值<br />
                  2. 查找第一个/最后一个等于目标的位置（变形题）
                </Paragraph>
              </Panel>
              <Panel header="哈希查找（Hash Search）" key="hash">
                <Paragraph>
                  <b>原理：</b> 通过哈希函数将元素映射到哈希表，查找效率极高。
                </Paragraph>
                <Paragraph>
                  <b>复杂度：</b> 时间O(1)，空间O(n)
                </Paragraph>
                <CodeBlock language="cpp">{
`// 哈希查找 C++实现（使用unordered_map）
int hashSearch(const vector<int>& arr, int target) {
    unordered_map<int, int> mp;
    for (int i = 0; i < arr.size(); ++i) mp[arr[i]] = i;
    return mp.count(target) ? mp[target] : -1;
}
`}
                </CodeBlock>
                <Paragraph>
                  <b>典型题型：</b> <br />
                  1. 两数之和（Two Sum）<br />
                  2. 查找重复元素
                </Paragraph>
              </Panel>
              <Panel header="平衡树查找（Balanced Tree Search）" key="bst">
                <Paragraph>
                  <b>原理：</b> 通过平衡二叉搜索树（如AVL、红黑树）实现高效查找和区间操作。
                </Paragraph>
                <Paragraph>
                  <b>复杂度：</b> 时间O(log n)，空间O(n)
                </Paragraph>
                <CodeBlock language="cpp">{
`// C++ STL set查找
set<int> s;
// 插入：s.insert(x);
// 查找：s.count(x) > 0
`}
                </CodeBlock>
                <Paragraph>
                  <b>典型题型：</b> <br />
                  1. 区间第K大/小元素<br />
                  2. 动态维护有序集合
                </Paragraph>
              </Panel>
            </Collapse>
          </div>
        ),
      },
      {
        key: 'graph',
        label: '图论算法专题',
        children: (
          <div className="space-y-6">
            <Title level={3}>图论算法全解析</Title>
            <Paragraph>
              图论算法是面试和竞赛中的高频考点，涵盖图的存储、遍历、最短路径、最小生成树等。掌握这些算法有助于解决复杂的关系建模与路径优化问题。
            </Paragraph>
            <Card className="mb-6">
              <Title level={4}>常见图论算法对比</Title>
              <Table
                dataSource={[
                  { key: '1', algorithm: 'BFS', time: 'O(V+E)', space: 'O(V)', scene: '最短路/连通性', features: ['层次遍历', '无权最短路'] },
                  { key: '2', algorithm: 'DFS', time: 'O(V+E)', space: 'O(V)', scene: '连通分量/拓扑排序', features: ['递归/栈', '路径搜索'] },
                  { key: '3', algorithm: 'Dijkstra', time: 'O(E log V)', space: 'O(V)', scene: '单源最短路', features: ['正权图', '优先队列'] },
                  { key: '4', algorithm: 'Floyd', time: 'O(V^3)', space: 'O(V^2)', scene: '多源最短路', features: ['任意两点', '稠密图'] },
                  { key: '5', algorithm: 'Kruskal', time: 'O(E log E)', space: 'O(V)', scene: '最小生成树', features: ['并查集', '稀疏图'] },
                  { key: '6', algorithm: 'Prim', time: 'O(E log V)', space: 'O(V)', scene: '最小生成树', features: ['优先队列', '稠密图'] },
                ]}
                columns={[
                  { title: '算法', dataIndex: 'algorithm', key: 'algorithm' },
                  { title: '时间复杂度', dataIndex: 'time', key: 'time' },
                  { title: '空间复杂度', dataIndex: 'space', key: 'space' },
                  { title: '适用场景', dataIndex: 'scene', key: 'scene' },
                  { title: '特点', dataIndex: 'features', key: 'features', render: (features: string[],record:any,index:number) => (<>{features.map((f,index) => <Tag color="blue" key={index}>{f}</Tag>)}</>) },
                ]}
                size="small"
                pagination={false}
                scroll={{ x: 'max-content' }}
              />
            </Card>
            <Collapse className="mt-6" accordion>
              <Panel header="图的存储与遍历（邻接表/BFS/DFS）" key="storage">
                <Paragraph>
                  <b>原理：</b> 图可用邻接表或邻接矩阵存储，BFS适合层次遍历，DFS适合路径搜索。
                </Paragraph>
                <Paragraph>
                  <b>复杂度：</b> O(V+E)
                </Paragraph>
                <CodeBlock language="cpp">{
`// 邻接表存储+BFS/DFS遍历
vector<vector<int>> graph; // 邻接表
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
}
`}
                </CodeBlock>
                <Paragraph>
                  <b>典型题型：</b> <br />
                  1. 求连通分量个数<br />
                  2. 判断有向图是否有环（DFS变形）
                </Paragraph>
              </Panel>
              <Panel header="单源最短路径（Dijkstra）" key="dijkstra">
                <Paragraph>
                  <b>原理：</b> 适用于正权图，利用优先队列贪心扩展最短路径。
                </Paragraph>
                <Paragraph>
                  <b>复杂度：</b> O(E log V)
                </Paragraph>
                <CodeBlock language="cpp">{
`// Dijkstra算法 C++实现
vector<int> dijkstra(int n, vector<vector<pair<int,int>>>& graph, int src) {
    vector<int> dist(n, INT_MAX); dist[src] = 0;
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    pq.push({0, src});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        for (auto [v, w] : graph[u]) {
            if (dist[v] > d + w) {
                dist[v] = d + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}
`}
                </CodeBlock>
                <Paragraph>
                  <b>典型题型：</b> <br />
                  1. 单源最短路径（LeetCode 743等）<br />
                  2. 网络延迟时间
                </Paragraph>
              </Panel>
              <Panel header="多源最短路径（Floyd）" key="floyd">
                <Paragraph>
                  <b>原理：</b> 适用于稠密图，动态规划思想，枚举所有中转点。
                </Paragraph>
                <Paragraph>
                  <b>复杂度：</b> O(V^3)
                </Paragraph>
                <CodeBlock language="cpp">{
`// Floyd算法 C++实现
void floyd(vector<vector<int>>& dist) {
    int n = dist.size();
    for (int k = 0; k < n; ++k)
        for (int i = 0; i < n; ++i)
            for (int j = 0; j < n; ++j)
                dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
}
`}
                </CodeBlock>
                <Paragraph>
                  <b>典型题型：</b> <br />
                  1. 所有点对最短路径<br />
                  2. 判断有向图的传递闭包
                </Paragraph>
              </Panel>
              <Panel header="最小生成树（Kruskal/Prim）" key="mst">
                <Paragraph>
                  <b>原理：</b> Kruskal适合稀疏图，用并查集判断环；Prim适合稠密图，用优先队列扩展树。
                </Paragraph>
                <Paragraph>
                  <b>复杂度：</b> Kruskal: O(E log E)，Prim: O(E log V)
                </Paragraph>
                <CodeBlock language="cpp">{
`// Kruskal算法 C++实现
struct Edge { int u, v, w; };
bool cmp(const Edge& a, const Edge& b) { return a.w < b.w; }
struct DSU {
    vector<int> fa;
    DSU(int n): fa(n) { iota(fa.begin(), fa.end(), 0); }
    int find(int x) { return fa[x] == x ? x : fa[x] = find(fa[x]); }
    void unite(int x, int y) { fa[find(x)] = find(y); }
};
int kruskal(int n, vector<Edge>& edges) {
    sort(edges.begin(), edges.end(), cmp);
    DSU dsu(n); int res = 0, cnt = 0;
    for (auto& e : edges) {
        if (dsu.find(e.u) != dsu.find(e.v)) {
            dsu.unite(e.u, e.v); res += e.w; ++cnt;
        }
    }
    return cnt == n - 1 ? res : -1;
}
`}
                </CodeBlock>
                <Paragraph>
                  <b>典型题型：</b> <br />
                  1. 最小生成树权值和<br />
                  2. 判断图是否连通
                </Paragraph>
              </Panel>
            </Collapse>
          </div>
        ),
      },
      {
        key: 'dp',
        label: '动态规划专题',
        children: (
          <div className="space-y-6">
            <Title level={3}>动态规划全解析</Title>
            <Paragraph>
              动态规划（DP）是解决最优子结构和重叠子问题的强大工具，常用于背包、序列、区间、编辑距离等问题。
            </Paragraph>
            <Card className="mb-6">
              <Title level={4}>常见DP问题对比</Title>
              <Table
                dataSource={[
                  { key: '1', type: '01背包', state: 'f[i][j]', transfer: 'f[i][j]=max(f[i-1][j],f[i-1][j-w]+v)', complexity: 'O(nW)', scene: '选或不选', features: ['物品不可重复'] },
                  { key: '2', type: '完全背包', state: 'f[i][j]', transfer: 'f[i][j]=max(f[i-1][j],f[i][j-w]+v)', complexity: 'O(nW)', scene: '可重复选', features: ['物品可重复'] },
                  { key: '3', type: '最长上升子序列', state: 'f[i]', transfer: 'f[i]=max(f[j])+1', complexity: 'O(n^2)', scene: '子序列', features: ['序列型'] },
                  { key: '4', type: '最长公共子序列', state: 'f[i][j]', transfer: 'f[i][j]=f[i-1][j-1]+1/else', complexity: 'O(nm)', scene: '两个序列', features: ['双序列'] },
                  { key: '5', type: '区间DP', state: 'f[i][j]', transfer: 'f[i][j]=min(f[i][k]+f[k+1][j]+cost)', complexity: 'O(n^3)', scene: '区间合并', features: ['区间型'] },
                ]}
                columns={[
                  { title: '类型', dataIndex: 'type', key: 'type' },
                  { title: '状态表示', dataIndex: 'state', key: 'state' },
                  { title: '转移方程', dataIndex: 'transfer', key: 'transfer' },
                  { title: '复杂度', dataIndex: 'complexity', key: 'complexity' },
                  { title: '场景', dataIndex: 'scene', key: 'scene' },
                  { title: '特点', dataIndex: 'features', key: 'features', render: (features: string[],record:any,index:number) => (<>{features.map((f,index) => <Tag color="blue" key={index}>{f}</Tag>)}</>) },
                ]}
                size="small"
                pagination={false}
                scroll={{ x: 'max-content' }}
              />
            </Card>
            <Collapse className="mt-6" accordion>
              <Panel header="01背包问题" key="knapsack01">
                <Paragraph>
                  <b>原理：</b> 每个物品只能选一次，求最大价值。
                </Paragraph>
                <Paragraph>
                  <b>复杂度：</b> O(nW)
                </Paragraph>
                <CodeBlock language="cpp">{
`// 01背包 C++实现
int knapsack01(int n, int W, vector<int>& w, vector<int>& v) {
    vector<vector<int>> f(n+1, vector<int>(W+1, 0));
    for (int i = 1; i <= n; ++i)
        for (int j = W; j >= w[i-1]; --j)
            f[i][j] = max(f[i-1][j], f[i-1][j-w[i-1]] + v[i-1]);
    return f[n][W];
}
`}
                </CodeBlock>
                <Paragraph>
                  <b>典型题型：</b> <br />
                  1. 01背包最大价值<br />
                  2. 子集和问题
                </Paragraph>
              </Panel>
              <Panel header="完全背包问题" key="knapsackfull">
                <Paragraph>
                  <b>原理：</b> 每个物品可选多次，求最大价值。
                </Paragraph>
                <Paragraph>
                  <b>复杂度：</b> O(nW)
                </Paragraph>
                <CodeBlock language="cpp">{
`// 完全背包 C++实现
int knapsackFull(int n, int W, vector<int>& w, vector<int>& v) {
    vector<int> f(W+1, 0);
    for (int i = 0; i < n; ++i)
        for (int j = w[i]; j <= W; ++j)
            f[j] = max(f[j], f[j-w[i]] + v[i]);
    return f[W];
}
`}
                </CodeBlock>
                <Paragraph>
                  <b>典型题型：</b> <br />
                  1. 完全背包最大价值<br />
                  2. 硬币兑换问题
                </Paragraph>
              </Panel>
              <Panel header="最长上升子序列（LIS）" key="lis">
                <Paragraph>
                  <b>原理：</b> 求一个序列的最长严格递增子序列长度。
                </Paragraph>
                <Paragraph>
                  <b>复杂度：</b> O(n^2)（可优化为O(n log n)）
                </Paragraph>
                <CodeBlock language="cpp">{
`// LIS C++实现（O(n^2)）
int lengthOfLIS(vector<int>& nums) {
    int n = nums.size(), res = 1;
    vector<int> f(n, 1);
    for (int i = 1; i < n; ++i)
        for (int j = 0; j < i; ++j)
            if (nums[i] > nums[j]) f[i] = max(f[i], f[j] + 1);
    for (int x : f) res = max(res, x);
    return res;
}
`}
                </CodeBlock>
                <Paragraph>
                  <b>典型题型：</b> <br />
                  1. 最长上升子序列<br />
                  2. 最长递增子数组
                </Paragraph>
              </Panel>
              <Panel header="最长公共子序列（LCS）" key="lcs">
                <Paragraph>
                  <b>原理：</b> 求两个序列的最长公共子序列长度。
                </Paragraph>
                <Paragraph>
                  <b>复杂度：</b> O(nm)
                </Paragraph>
                <CodeBlock language="cpp">{
`// LCS C++实现
int longestCommonSubsequence(string text1, string text2) {
    int n = text1.size(), m = text2.size();
    vector<vector<int>> f(n+1, vector<int>(m+1, 0));
    for (int i = 1; i <= n; ++i)
        for (int j = 1; j <= m; ++j)
            if (text1[i-1] == text2[j-1])
                f[i][j] = f[i-1][j-1] + 1;
            else
                f[i][j] = max(f[i-1][j], f[i][j-1]);
    return f[n][m];
}
`}
                </CodeBlock>
                <Paragraph>
                  <b>典型题型：</b> <br />
                  1. 最长公共子序列<br />
                  2. 编辑距离（变形题）
                </Paragraph>
              </Panel>
              <Panel header="区间DP（石子合并等）" key="intervaldp">
                <Paragraph>
                  <b>原理：</b> 区间DP适合区间合并、矩阵连乘等问题，枚举分割点转移。
                </Paragraph>
                <Paragraph>
                  <b>复杂度：</b> O(n^3)
                </Paragraph>
                <CodeBlock language="cpp">{
`// 区间DP C++实现（石子合并）
int mergeStones(vector<int>& stones) {
    int n = stones.size();
    vector<vector<int>> f(n, vector<int>(n, 0)), sum(n+1, vector<int>(n+1, 0));
    for (int i = 0; i < n; ++i) sum[i+1][i+1] = stones[i];
    for (int i = 0; i < n; ++i)
        for (int j = i+1; j < n; ++j)
            sum[i+1][j+1] = sum[i+1][j] + stones[j];
    for (int len = 2; len <= n; ++len)
        for (int i = 0; i + len - 1 < n; ++i) {
            int j = i + len - 1;
            f[i][j] = INT_MAX;
            for (int k = i; k < j; ++k)
                f[i][j] = min(f[i][j], f[i][k] + f[k+1][j] + sum[i+1][j+1] - sum[i+1][i+1]);
        }
    return f[0][n-1];
}
`}
                </CodeBlock>
                <Paragraph>
                  <b>典型题型：</b> <br />
                  1. 石子合并/矩阵连乘<br />
                  2. 区间最小代价合并
                </Paragraph>
              </Panel>
            </Collapse>
          </div>
        ),
      },
      {
        key: 'system',
        label: '系统设计专题',
        children: (
          <div className="space-y-6">
            <Title level={3}>系统设计全解析</Title>
            <Paragraph>
              系统设计是高级面试的重头戏，考查候选人架构能力、扩展性、可用性、性能优化等。以下梳理常见系统设计知识点与经典场景。
            </Paragraph>
            <Card className="mb-6">
              <Title level={4}>系统设计核心原则</Title>
              <Paragraph>
                <ul>
                  <li>高可用性（HA）：系统持续可用，单点故障自动切换</li>
                  <li>高扩展性（Scalability）：支持水平/垂直扩展，弹性伸缩</li>
                  <li>高性能（Performance）：低延迟、高吞吐，合理利用缓存和异步</li>
                  <li>一致性（Consistency）：数据一致性模型（强一致、最终一致等）</li>
                  <li>可维护性（Maintainability）：分层、解耦、自动化运维</li>
                  <li>分层架构、解耦、冗余、限流、降级、缓存、异步、分布式等设计思想</li>
                </ul>
              </Paragraph>
            </Card>
            <Card className="mb-6">
              <Title level={4}>高频系统设计场景</Title>
              <Paragraph>
                <ul>
                  <li>分布式缓存（如Redis）：缓存穿透、雪崩、击穿防护，热点数据、失效策略</li>
                  <li>消息队列（如Kafka）：解耦、削峰填谷、异步处理，消息可靠性与顺序性</li>
                  <li>负载均衡：DNS、反向代理、LVS、Nginx等，关注流量分发与容灾</li>
                  <li>数据库分库分表：水平/垂直拆分、分布式事务、全局ID生成</li>
                  <li>高并发系统：限流、降级、熔断、异步、批量处理</li>
                  <li>秒杀系统：令牌桶、预减库存、异步下单、热点隔离</li>
                  <li>短链服务、文件存储、搜索引擎等</li>
                  <li>常见面试题：设计LRU缓存、短网址系统、消息推送系统等</li>
                </ul>
              </Paragraph>
            </Card>
            <Collapse className="mt-6" accordion>
              <Panel header="LRU缓存设计与实现" key="lru">
                <Paragraph>
                  <b>原理：</b> 最近最少使用（LRU）缓存淘汰策略，常用哈希表+双向链表实现。
                </Paragraph>
                <CodeBlock language="cpp">{
`// LRU缓存 C++实现
class LRUCache {
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
            auto it = mp[key];
            it->second = value;
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
};
`}
                </CodeBlock>
                <Paragraph>
                  <b>典型题型：</b> <br />
                  1. 设计LRU缓存类<br />
                  2. 高频缓存淘汰策略
                </Paragraph>
              </Panel>
              <Panel header="限流算法（令牌桶/漏桶）" key="ratelimit">
                <Paragraph>
                  <b>原理：</b> 令牌桶算法通过定时生成令牌控制请求速率，漏桶算法通过固定速率处理请求。
                </Paragraph>
                <CodeBlock language="cpp">{
`// 令牌桶伪代码
class TokenBucket {
    int capacity, tokens;
    double rate, lastTime;
public:
    TokenBucket(int cap, double r): capacity(cap), tokens(cap), rate(r), lastTime(now()) {}
    bool allow() {
        double nowTime = now();
        tokens = min(capacity, tokens + (nowTime - lastTime) * rate);
        lastTime = nowTime;
        if (tokens >= 1) { tokens -= 1; return true; }
        return false;
    }
};
`}
                </CodeBlock>
                <Paragraph>
                  <b>典型题型：</b> <br />
                  1. 高并发限流设计<br />
                  2. 秒杀系统流量控制
                </Paragraph>
              </Panel>
              <Panel header="分布式唯一ID生成（雪花算法）" key="snowflake">
                <Paragraph>
                  <b>原理：</b> 雪花算法（Snowflake）通过时间戳+机器ID+自增序列生成全局唯一ID。
                </Paragraph>
                <CodeBlock language="cpp">{
`// 雪花算法伪代码
class Snowflake {
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
};
`}
                </CodeBlock>
                <Paragraph>
                  <b>典型题型：</b> <br />
                  1. 分布式ID生成方案<br />
                  2. 高并发下ID唯一性保证
                </Paragraph>
              </Panel>
              <Panel header="系统设计面试技巧" key="tips">
                <Paragraph>
                  <b>答题技巧：</b>
                  <ul>
                    <li>需求澄清：明确功能、非功能需求、约束条件</li>
                    <li>画架构图，分层拆解，逐步细化</li>
                    <li>考虑扩展性、可用性、容错、数据一致性、性能瓶颈</li>
                    <li>用例驱动，举例说明设计方案</li>
                    <li>总结亮点与权衡，展示全局观</li>
                  </ul>
                </Paragraph>
              </Panel>
            </Collapse>
          </div>
        ),
      },
    ]}
  />
    </div>

  );
}
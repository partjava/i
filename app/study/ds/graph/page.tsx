'use client';

import React from 'react';
import { Card, Tabs, Progress, Alert, Typography, Collapse } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { CodeBlock } from '@/app/components/ui/CodeBlock';

const { Paragraph } = Typography;

export default function DsGraphPage() {
  const tabItems = [
    {
      key: '1',
      label: '🌐 图的基本概念与存储',
      children: (
        <Card title="图的基本概念与存储结构" className="mb-6">
          <Paragraph>图分为有向图、无向图、带权图等。常用存储方式有邻接矩阵和邻接表：</Paragraph>
          <CodeBlock language="cpp">{`// 邻接矩阵存储
const int N = 100;
int g[N][N]; // g[i][j]=1表示i到j有边
// 邻接表存储
vector<int> adj[N]; // adj[i]存储与i相邻的点
// 带权邻接表
vector<pair<int,int>> adjw[N]; // adjw[i]存储(i,权值)`}</CodeBlock>
        </Card>
      )
    },
    {
      key: '2',
      label: '🔍 图的遍历算法',
      children: (
        <Card title="图的遍历算法（DFS与BFS）" className="mb-6">
          <Paragraph>图的遍历主要有深度优先搜索（DFS）和广度优先搜索（BFS）：</Paragraph>
          <CodeBlock language="cpp">{`// DFS递归
void dfs(int u, vector<bool>& vis, vector<int> adj[]) {
    vis[u] = true;
    cout << u << ' ';
    for (int v : adj[u]) if (!vis[v]) dfs(v, vis, adj);
}
// DFS非递归
void dfsIter(int start, vector<bool>& vis, vector<int> adj[]) {
    stack<int> st; st.push(start);
    while (!st.empty()) {
        int u = st.top(); st.pop();
        if (vis[u]) continue;
        vis[u] = true;
        cout << u << ' ';
        for (auto it = adj[u].rbegin(); it != adj[u].rend(); ++it)
            if (!vis[*it]) st.push(*it); // 保证顺序
    }
}
// BFS
void bfs(int start, vector<bool>& vis, vector<int> adj[]) {
    queue<int> q; q.push(start); vis[start] = true;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        cout << u << ' ';
        for (int v : adj[u]) if (!vis[v]) { vis[v] = true; q.push(v); }
    }
}`}</CodeBlock>
        </Card>
      )
    },
    {
      key: '3',
      label: '🛠️ 经典图算法',
      children: (
        <Card title="经典图算法" className="mb-6">
          <Paragraph>常用算法：拓扑排序、最短路、最小生成树等。</Paragraph>
          <CodeBlock language="cpp">{`// 拓扑排序（Kahn算法，适用于DAG）
vector<int> topoSort(int n, vector<int> adj[]) {
    vector<int> in(n, 0);
    for (int u = 0; u < n; ++u)
        for (int v : adj[u]) in[v]++;
    queue<int> q;
    for (int i = 0; i < n; ++i) if (in[i] == 0) q.push(i);
    vector<int> res;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        res.push_back(u);
        for (int v : adj[u]) if (--in[v] == 0) q.push(v);
    }
    return res;
}
// Dijkstra最短路（适用于正权图）
vector<int> dijkstra(int n, vector<pair<int,int>> adj[], int src) {
    vector<int> dist(n, 1e9);
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    dist[src] = 0; pq.push({0, src});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        for (auto [v, w] : adj[u]) {
            if (dist[v] > dist[u] + w) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}
// Floyd多源最短路
void floyd(int n, int g[][N]) {
    for (int k = 0; k < n; ++k)
        for (int i = 0; i < n; ++i)
            for (int j = 0; j < n; ++j)
                g[i][j] = min(g[i][j], g[i][k] + g[k][j]);
}
// Kruskal最小生成树
struct Edge { int u, v, w; };
bool cmp(Edge a, Edge b) { return a.w < b.w; }
int find(int x, vector<int>& fa) { return fa[x] == x ? x : fa[x] = find(fa[x], fa); }
int kruskal(int n, vector<Edge>& edges) {
    sort(edges.begin(), edges.end(), cmp);
    vector<int> fa(n);
    for (int i = 0; i < n; ++i) fa[i] = i;
    int res = 0, cnt = 0;
    for (auto& e : edges) {
        int fu = find(e.u, fa), fv = find(e.v, fa);
        if (fu != fv) {
            fa[fu] = fv; res += e.w; cnt++;
        }
    }
    return cnt == n - 1 ? res : -1;
}`}</CodeBlock>
        </Card>
      )
    },
    {
      key: '4',
      label: '🌟 典型例题与完整解答',
      children: (
        <Card title="典型例题与完整解答" className="mb-6">
          <Paragraph>1. 求无向图连通分量个数</Paragraph>
          <CodeBlock language="cpp">{`// 连通分量个数
#include <iostream>
#include <vector>
using namespace std;
void dfs(int u, vector<bool>& vis, vector<int> adj[]) {
    vis[u] = true;
    for (int v : adj[u]) if (!vis[v]) dfs(v, vis, adj);
}
int countComponents(int n, vector<int> adj[]) {
    vector<bool> vis(n, false);
    int cnt = 0;
    for (int i = 0; i < n; ++i) if (!vis[i]) { dfs(i, vis, adj); cnt++; }
    return cnt;
}
int main() {
    int n = 5;
    vector<int> adj[5] = {{1,2},{0,3},{0,4},{1},{2}};
    cout << countComponents(n, adj) << endl; // 输出2
    return 0;
}`}</CodeBlock>
          <Paragraph>2. 岛屿数量（LeetCode 200）</Paragraph>
          <CodeBlock language="cpp">{`// 岛屿数量
#include <vector>
#include <queue>
using namespace std;
void bfs(int x, int y, vector<vector<char>>& g) {
    int n = g.size(), m = g[0].size();
    queue<pair<int,int>> q; q.push({x,y}); g[x][y] = '0';
    int dx[4] = {-1,1,0,0}, dy[4] = {0,0,-1,1};
    while (!q.empty()) {
        auto [i,j] = q.front(); q.pop();
        for (int d = 0; d < 4; ++d) {
            int ni = i + dx[d], nj = j + dy[d];
            if (ni>=0&&ni<n&&nj>=0&&nj<m&&g[ni][nj]=='1') {
                g[ni][nj]='0'; q.push({ni,nj});
            }
        }
    }
}
int numIslands(vector<vector<char>>& grid) {
    int n = grid.size(), m = grid[0].size(), cnt = 0;
    for (int i = 0; i < n; ++i)
        for (int j = 0; j < m; ++j)
            if (grid[i][j] == '1') { bfs(i, j, grid); cnt++; }
    return cnt;
}`}</CodeBlock>
          <Paragraph>3. 单源最短路径（Dijkstra）</Paragraph>
          <CodeBlock language="cpp">{`// Dijkstra最短路
#include <iostream>
#include <vector>
#include <queue>
using namespace std;
vector<int> dijkstra(int n, vector<pair<int,int>> adj[], int src) {
    vector<int> dist(n, 1e9);
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    dist[src] = 0; pq.push({0, src});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        for (auto [v, w] : adj[u]) {
            if (dist[v] > dist[u] + w) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}
int main() {
    int n = 3;
    vector<pair<int,int>> adj[3];
    adj[0].push_back({1,1}); adj[0].push_back({2,4});
    adj[1].push_back({2,2});
    vector<int> d = dijkstra(n, adj, 0);
    for(int x:d) cout<<x<<' '; // 输出0 1 3
    return 0;
}`}</CodeBlock>
        </Card>
      )
    },
    {
      key: '5',
      label: '💡 练习题与参考答案',
      children: (
        <Card title="练习题与参考答案" className="mb-6">
          <Paragraph><b>练习题：</b></Paragraph>
          <ul className="list-disc pl-6">
            <li>
              实现无向图的BFS遍历，并输出遍历顺序。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="1">
                  <CodeBlock language="cpp">{`// 无向图BFS遍历
#include <iostream>
#include <vector>
#include <queue>
using namespace std;
void bfs(int start, vector<bool>& vis, vector<int> adj[]) {
    queue<int> q; q.push(start); vis[start] = true;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        cout << u << ' ';
        for (int v : adj[u]) if (!vis[v]) { vis[v] = true; q.push(v); }
    }
}
int main() {
    int n = 4;
    vector<int> adj[4] = {{1,2},{0,3},{0,3},{1,2}};
    vector<bool> vis(n, false);
    bfs(0, vis, adj); // 输出0 1 2 3
    return 0;
}`}</CodeBlock>
                </Collapse.Panel>
              </Collapse>
            </li>
            <li>
              实现有向无环图的拓扑排序，并输出结果。
              <Collapse className="mt-2">
                <Collapse.Panel header="参考答案" key="2">
                  <CodeBlock language="cpp">{`// 拓扑排序
#include <iostream>
#include <vector>
#include <queue>
using namespace std;
vector<int> topoSort(int n, vector<int> adj[]) {
    vector<int> in(n, 0);
    for (int u = 0; u < n; ++u)
        for (int v : adj[u]) in[v]++;
    queue<int> q;
    for (int i = 0; i < n; ++i) if (in[i] == 0) q.push(i);
    vector<int> res;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        res.push_back(u);
        for (int v : adj[u]) if (--in[v] == 0) q.push(v);
    }
    return res;
}
int main() {
    int n = 4;
    vector<int> adj[4] = {{1,2},{2},{3},{}};
    vector<int> res = topoSort(n, adj);
    for(int x:res) cout<<x<<' '; // 输出0 1 2 3
    return 0;
}`}</CodeBlock>
                </Collapse.Panel>
              </Collapse>
            </li>
          </ul>
          <Alert message="温馨提示" description="建议多练习图的遍历、最短路、连通分量等高频题型，理解每个算法的实现细节。" type="info" showIcon />
        </Card>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面头部 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">图与图算法</h1>
              <p className="text-gray-600 mt-2">掌握图的存储、遍历、经典算法与高频题型</p>
            </div>
            <Progress type="circle" percent={50} size={100} strokeColor="#13c2c2" />
          </div>
        </div>

        {/* 课程内容 */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <Tabs items={tabItems} tabPosition="left" className="p-6" />
        </div>

        {/* 底部导航 */}
        <div className="flex justify-between mt-8">
          <Link
            href="/study/ds/tree"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700"
          >
            <LeftOutlined className="mr-2" />
            上一课：树与二叉树
          </Link>
          <Link
            href="/study/ds/sort"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            下一课：排序与查找
            <RightOutlined className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 
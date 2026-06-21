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
  chapterTitle: '图与图算法',
  chapterNumber: 5,
  totalChapters: 10,
  subjectHref: '/study/computer/ds',
  prevChapter: { label: '树与二叉树', href: '/study/computer/ds/tree' },
  nextChapter: { label: '排序与查找', href: '/study/computer/ds/sort' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '基本概念与遍历',
    left: (
      <div className="space-y-4">
        <PageTitle>图的基本概念与存储</PageTitle>
        <BookParagraph>图分为有向图、无向图、带权图等。常用存储方式有邻接矩阵和邻接表：</BookParagraph>
        <BookCode language="cpp" code={`// 邻接矩阵存储
const int N = 100;
int g[N][N]; // g[i][j]=1表示i到j有边
// 邻接表存储
vector<int> adj[N]; // adj[i]存储与i相邻的点
// 带权邻接表
vector<pair<int,int>> adjw[N]; // adjw[i]存储(i,权值)`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>图的遍历算法（DFS与BFS）</SectionTitle>
        <BookParagraph>图的遍历主要有深度优先搜索（DFS）和广度优先搜索（BFS）：</BookParagraph>
        <BookCode language="cpp" code={`// DFS递归
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
            if (!vis[*it]) st.push(*it);
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
}`} />
        <TagGrid items={['邻接矩阵', '邻接表', 'DFS', 'BFS', '有向图', '无向图']} />
      </div>
    ),
  },
  {
    label: '经典图算法',
    left: (
      <div className="space-y-4">
        <PageTitle>经典图算法</PageTitle>
        <BookParagraph>常用算法：拓扑排序、最短路、最小生成树等。</BookParagraph>
        <SectionTitle>拓扑排序（Kahn算法）</SectionTitle>
        <BookCode language="cpp" code={`// 拓扑排序（Kahn算法，适用于DAG）
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
}`} />
        <SectionTitle>Dijkstra最短路</SectionTitle>
        <BookCode language="cpp" code={`// Dijkstra最短路（适用于正权图）
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
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>Floyd多源最短路</SectionTitle>
        <BookCode language="cpp" code={`// Floyd多源最短路
void floyd(int n, int g[][N]) {
    for (int k = 0; k < n; ++k)
        for (int i = 0; i < n; ++i)
            for (int j = 0; j < n; ++j)
                g[i][j] = min(g[i][j], g[i][k] + g[k][j]);
}`} />
        <SectionTitle>Kruskal最小生成树</SectionTitle>
        <BookCode language="cpp" code={`// Kruskal最小生成树
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
        if (fu != fv) { fa[fu] = fv; res += e.w; cnt++; }
    }
    return cnt == n - 1 ? res : -1;
}`} />
        <TagGrid items={['拓扑排序', 'Dijkstra', 'Floyd', 'Kruskal', 'MST']} />
      </div>
    ),
  },
  {
    label: '例题与练习',
    left: (
      <div className="space-y-4">
        <PageTitle>典型例题与完整解答</PageTitle>
        <SectionTitle>1. 求无向图连通分量个数</SectionTitle>
        <BookCode language="cpp" code={`// 连通分量个数
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
}`} />
        <SectionTitle>2. 岛屿数量（LeetCode 200）</SectionTitle>
        <BookCode language="cpp" code={`// 岛屿数量
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
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>3. 单源最短路径（Dijkstra）</SectionTitle>
        <BookCode language="cpp" code={`// Dijkstra最短路
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
}`} />
        <SectionTitle>练习题与参考答案</SectionTitle>
        <BookParagraph><b>练习题1：</b>实现无向图的BFS遍历，并输出遍历顺序。</BookParagraph>
        <BookCode language="cpp" code={`// 无向图BFS遍历
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
}`} />
        <BookParagraph><b>练习题2：</b>实现有向无环图的拓扑排序，并输出结果。</BookParagraph>
        <BookCode language="cpp" code={`// 拓扑排序
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
}`} />
        <BookAlert type="info" message="建议多练习图的遍历、最短路、连通分量等高频题型，理解每个算法的实现细节。" />
        <TagGrid items={['连通分量', '岛屿', 'Dijkstra', '拓扑排序', 'BFS', 'DFS']} />
      </div>
    ),
  },
]

export default function DsGraphPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

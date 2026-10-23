import * as THREE from 'three';
import { VisualizationStep } from '../types';
import { createEnergyArc, createGlowingBeam, createHudBadge } from '../core/HudSpriteCache';

export function generateDataStructureSteps(algorithm: string): VisualizationStep[] {
  switch (algorithm) {
    case 'astar':
      return genAStarSteps();
    case 'dijkstra':
      return genDijkstraSteps();
    case 'bfs-dfs':
      return genBfsDfsSteps();
    case 'avl-tree':
      return genAvlTreeSteps();
    case 'bst':
      return genBstSteps();
    case 'n-queens':
      return genNQueensSteps();
    case 'knapsack-dp':
      return genKnapsackDpSteps();
    default:
      return genAStarSteps();
  }
}

export function renderDataStructure(group: THREE.Group, step: VisualizationStep) {
  switch (step.type) {
    case 'astar-grid':
      renderAStarGrid(group, step);
      break;
    case 'dijkstra-graph':
      renderDijkstraGraph(group, step);
      break;
    case 'bfs-dfs-dual':
      renderBfsDfsDual(group, step);
      break;
    case 'tree-3d':
      renderTree3D(group, step);
      break;
    case 'n-queens-board':
      renderNQueensBoard(group, step);
      break;
    case 'knapsack-3d':
      renderKnapsack3D(group, step);
      break;
  }
}

// ============================================================================
// 1. A* 启发式寻路 (3D 城市迷宫)
// ============================================================================
function genAStarSteps(): VisualizationStep[] {
  const size = 9;
  const start: [number, number] = [1, 1];
  const goal: [number, number] = [7, 7];

  const walls = new Set<string>([
    '3,1', '3,2', '3,3', '3,4', '3,5',
    '5,3', '5,4', '5,5', '5,6', '5,7',
    '1,6', '2,6', '7,2', '7,3',
  ]);

  const key = (r: number, c: number) => `${r},${c}`;
  const h = (r: number, c: number) => Math.abs(goal[0] - r) + Math.abs(goal[1] - c);

  const openSet = new Map<string, { r: number; c: number; g: number; f: number }>();
  const closedSet = new Set<string>();
  const parent = new Map<string, string>();
  const gScore = new Map<string, number>();
  const fScore = new Map<string, number>();

  const startKey = key(start[0], start[1]);
  gScore.set(startKey, 0);
  fScore.set(startKey, h(start[0], start[1]));
  openSet.set(startKey, { r: start[0], c: start[1], g: 0, f: h(start[0], start[1]) });

  const steps: VisualizationStep[] = [];

  steps.push({
    type: 'astar-grid',
    size,
    start,
    goal,
    walls: Array.from(walls),
    open: Array.from(openSet.values()),
    closed: [],
    current: start,
    path: [],
    description: `初始化 9×9 三维城市迷宫：起点 (1,1) → 终点 (7,7)，启发代价 h(n) = 曼哈顿距离`,
    metrics: { 开放节点: 1, 已评估: 0, 当前最小f: h(start[0], start[1]) },
  });

  const dirs = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  while (openSet.size > 0) {
    // Pick lowest f
    let bestKey = '';
    let bestNode: { r: number; c: number; g: number; f: number } | null = null;
    openSet.forEach((node, k) => {
      if (!bestNode || node.f < bestNode.f || (node.f === bestNode.f && node.g > bestNode.g)) {
        bestKey = k;
        bestNode = node;
      }
    });
    if (!bestNode) break;
    const currentNode: { r: number; c: number; g: number; f: number } = bestNode;

    openSet.delete(bestKey);
    closedSet.add(bestKey);

    if (currentNode.r === goal[0] && currentNode.c === goal[1]) {
      // Reconstruct path
      const path: [number, number][] = [];
      let curr: string | undefined = bestKey;
      while (curr) {
        const [pr, pc] = curr.split(',').map(Number);
        path.unshift([pr, pc]);
        curr = parent.get(curr);
      }

      steps.push({
        type: 'astar-grid',
        size,
        start,
        goal,
        walls: Array.from(walls),
        open: Array.from(openSet.values()),
        closed: Array.from(closedSet),
        current: [currentNode.r, currentNode.c],
        path,
        description: `A* 寻路成功！架起跨越迷宫的黄金最短路径光桥（总步数 ${path.length - 1}）`,
        metrics: { 最短路径长: path.length - 1, 累计扩展节点: closedSet.size, 状态: '抵达终点' },
      });
      break;
    }

    for (const [dr, dc] of dirs) {
      const nr = currentNode.r + dr;
      const nc = currentNode.c + dc;
      const nk = key(nr, nc);
      if (nr < 0 || nr >= size || nc < 0 || nc >= size) continue;
      if (walls.has(nk) || closedSet.has(nk)) continue;

      const tentativeG = currentNode.g + 1;
      const prevG = gScore.get(nk) ?? Infinity;
      if (tentativeG < prevG) {
        parent.set(nk, bestKey);
        gScore.set(nk, tentativeG);
        const nf = tentativeG + h(nr, nc);
        fScore.set(nk, nf);
        openSet.set(nk, { r: nr, c: nc, g: tentativeG, f: nf });
      }
    }

    steps.push({
      type: 'astar-grid',
      size,
      start,
      goal,
      walls: Array.from(walls),
      open: Array.from(openSet.values()),
      closed: Array.from(closedSet),
      current: [currentNode.r, currentNode.c],
      path: [],
      description: `扩展最优前沿格 (${currentNode.r},${currentNode.c})：g=${currentNode.g}, h=${currentNode.f - currentNode.g}, 综合代价 f=${currentNode.f}`,
      metrics: { 当前f值: `f=${currentNode.f} (${currentNode.g}+${currentNode.f - currentNode.g})`, 开放集: openSet.size, 已评估: closedSet.size },
    });
  }

  return steps;
}

function renderAStarGrid(group: THREE.Group, step: VisualizationStep) {
  const size = step.size || 9;
  const tileSpacing = 1.45;
  const offset = ((size - 1) * tileSpacing) / 2;

  const wallSet = new Set<string>(step.walls || []);
  const closedSet = new Set<string>(step.closed || []);
  const openMap = new Map<string, { r: number; c: number; g: number; f: number }>();
  (step.open || []).forEach((o: any) => openMap.set(`${o.r},${o.c}`, o));
  const pathSet = new Set<string>((step.path || []).map((p: [number, number]) => `${p[0]},${p[1]}`));

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const k = `${r},${c}`;
      const x = c * tileSpacing - offset;
      const z = r * tileSpacing - offset;

      const isStart = r === step.start[0] && c === step.start[1];
      const isGoal = r === step.goal[0] && c === step.goal[1];
      const isWall = wallSet.has(k);
      const isPath = pathSet.has(k);
      const isCurrent = step.current && step.current[0] === r && step.current[1] === c;
      const openInfo = openMap.get(k);
      const isClosed = closedSet.has(k);

      let height = 0.25;
      let color = 0x1e293b;
      let emissiveIntensity = 0.1;

      if (isWall) {
        height = 1.85;
        color = 0x334155;
        emissiveIntensity = 0.05;
      } else if (isStart) {
        height = 1.1;
        color = 0x10b981;
        emissiveIntensity = 0.85;
      } else if (isGoal) {
        height = 1.25;
        color = 0xf43f5e;
        emissiveIntensity = 0.9;
      } else if (isPath) {
        height = 0.95;
        color = 0xfbbf24;
        emissiveIntensity = 0.95;
      } else if (isCurrent) {
        height = 0.85;
        color = 0xf59e0b;
        emissiveIntensity = 0.85;
      } else if (openInfo) {
        height = 0.52;
        color = 0x38bdf8;
        emissiveIntensity = 0.65;
      } else if (isClosed) {
        height = 0.38;
        color = 0x6366f1;
        emissiveIntensity = 0.35;
      }

      const geo = new THREE.BoxGeometry(tileSpacing * 0.86, height, tileSpacing * 0.86);
      const mat = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity,
        metalness: isWall ? 0.8 : 0.5,
        roughness: 0.25,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, height / 2, z);
      group.add(mesh);

      if (isStart || isGoal) {
        const badge = createHudBadge([x, height + 0.9, z], {
          text: isStart ? 'START' : 'GOAL',
          borderColor: isStart ? '#10b981' : '#f43f5e',
          scale: [1.7, 0.72],
        });
        group.add(badge);
      } else if (openInfo && !isPath) {
        const badge = createHudBadge([x, height + 0.55, z], {
          text: `f=${openInfo.f}`,
          borderColor: '#38bdf8',
          scale: [1.3, 0.58],
          fontSize: 26,
        });
        group.add(badge);
      }
    }
  }

  // Golden shortest path tube bridge
  if (Array.isArray(step.path) && step.path.length > 1) {
    const pts = step.path.map(([r, c]: [number, number]) => {
      const x = c * tileSpacing - offset;
      const z = r * tileSpacing - offset;
      return new THREE.Vector3(x, 1.35, z);
    });
    const curve = new THREE.CatmullRomCurve3(pts);
    const tubeGeo = new THREE.TubeGeometry(curve, pts.length * 6, 0.14, 12, false);
    const tubeMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      emissive: 0xfbbf24,
      emissiveIntensity: 1.1,
      metalness: 0.7,
      roughness: 0.15,
    });
    group.add(new THREE.Mesh(tubeGeo, tubeMat));
  }
}

// ============================================================================
// 2. Dijkstra 最短路径 (3D 空间拓扑星图)
// ============================================================================
function genDijkstraSteps(): VisualizationStep[] {
  const nodes = [
    { id: 0, label: 'S', x: -7.5, y: 2.2, z: 0 },
    { id: 1, label: 'A', x: -3.8, y: 4.8, z: -2.8 },
    { id: 2, label: 'B', x: -3.5, y: 1.2, z: 3.2 },
    { id: 3, label: 'C', x: 0.2, y: 5.4, z: 1.5 },
    { id: 4, label: 'D', x: 0.5, y: 1.6, z: -3.2 },
    { id: 5, label: 'E', x: 4.2, y: 4.4, z: -1.8 },
    { id: 6, label: 'F', x: 4.0, y: 1.4, z: 2.8 },
    { id: 7, label: 'T', x: 7.8, y: 3.0, z: 0.2 },
  ];

  const edges = [
    { u: 0, v: 1, w: 4 },
    { u: 0, v: 2, w: 2 },
    { u: 1, v: 2, w: 1 },
    { u: 1, v: 3, w: 5 },
    { u: 1, v: 4, w: 3 },
    { u: 2, v: 3, w: 8 },
    { u: 2, v: 6, w: 7 },
    { u: 4, v: 3, w: 2 },
    { u: 4, v: 5, w: 4 },
    { u: 3, v: 5, w: 1 },
    { u: 3, v: 6, w: 3 },
    { u: 5, v: 7, w: 3 },
    { u: 6, v: 7, w: 2 },
    { u: 5, v: 6, w: 2 },
  ];

  const dist = Array(nodes.length).fill(Infinity);
  const parent = Array(nodes.length).fill(-1);
  const visited = new Set<number>();
  dist[0] = 0;

  const steps: VisualizationStep[] = [];

  steps.push({
    type: 'dijkstra-graph',
    nodes,
    edges,
    dist: [...dist],
    parent: [...parent],
    visited: [],
    current: 0,
    relaxEdge: null,
    description: `初始化 3D 拓扑星图：源点 S(0) 距离设为 0，其余星座节点初始距离为 ∞`,
    metrics: { 源点: 'S(0)', 已收敛节点: `0/${nodes.length}`, 终点T距离: '∞' },
  });

  for (let stepIdx = 0; stepIdx < nodes.length; stepIdx++) {
    let u = -1;
    let bestD = Infinity;
    for (let i = 0; i < nodes.length; i++) {
      if (!visited.has(i) && dist[i] < bestD) {
        bestD = dist[i];
        u = i;
      }
    }
    if (u === -1) break;
    visited.add(u);

    steps.push({
      type: 'dijkstra-graph',
      nodes,
      edges,
      dist: [...dist],
      parent: [...parent],
      visited: Array.from(visited),
      current: u,
      relaxEdge: null,
      description: `贪心锁定当前最近未访问节点 ${nodes[u].label}（最短距离确定为 dist=${dist[u]}）`,
      metrics: { 当前节点: nodes[u].label, 节点距离: dist[u], 已收敛: `${visited.size}/${nodes.length}` },
    });

    for (const e of edges) {
      const nb = e.u === u ? e.v : e.v === u ? e.u : -1;
      if (nb === -1 || visited.has(nb)) continue;

      if (dist[u] + e.w < dist[nb]) {
        const old = dist[nb];
        dist[nb] = dist[u] + e.w;
        parent[nb] = u;
        steps.push({
          type: 'dijkstra-graph',
          nodes,
          edges,
          dist: [...dist],
          parent: [...parent],
          visited: Array.from(visited),
          current: u,
          relaxEdge: [u, nb],
          description: `边松弛成功 (${nodes[u].label}→${nodes[nb].label}, 权重 ${e.w})：dist[${nodes[nb].label}] 从 ${old === Infinity ? '∞' : old} 更新为 ${dist[nb]}`,
          metrics: { 松弛边: `${nodes[u].label}→${nodes[nb].label}`, 新距离: dist[nb], 终点T距离: dist[7] === Infinity ? '∞' : dist[7] },
        });
      }
    }
  }

  return steps;
}

function renderDijkstraGraph(group: THREE.Group, step: VisualizationStep) {
  const { nodes, edges, dist, parent, visited, current, relaxEdge } = step;
  const visitedSet = new Set<number>(visited || []);

  // Draw edges
  edges.forEach((e: any) => {
    const n1 = nodes[e.u];
    const n2 = nodes[e.v];
    const p1 = new THREE.Vector3(n1.x, n1.y, n1.z);
    const p2 = new THREE.Vector3(n2.x, n2.y, n2.z);

    const isRelaxing =
      relaxEdge &&
      ((relaxEdge[0] === e.u && relaxEdge[1] === e.v) ||
        (relaxEdge[0] === e.v && relaxEdge[1] === e.u));
    const isSptEdge = parent[e.u] === e.v || parent[e.v] === e.u;

    let color = 0x334155;
    let radius = 0.045;
    let opacity = 0.45;

    if (isRelaxing) {
      color = 0xf59e0b;
      radius = 0.12;
      opacity = 0.95;
    } else if (isSptEdge) {
      color = 0x10b981;
      radius = 0.095;
      opacity = 0.9;
    }

    const beam = createGlowingBeam(p1, p2, radius, color, opacity);
    group.add(beam);

    // Weight label at midpoint
    const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
    const wBadge = createHudBadge([mid.x, mid.y + 0.35, mid.z], {
      text: `${e.w}`,
      borderColor: isRelaxing ? '#fbbf24' : isSptEdge ? '#10b981' : '#475569',
      scale: [0.95, 0.48],
      fontSize: 26,
    });
    group.add(wBadge);
  });

  // Draw nodes
  nodes.forEach((n: any, idx: number) => {
    const isCurrent = current === idx;
    const isVisited = visitedSet.has(idx);
    const dVal = dist[idx] === Infinity ? '∞' : `${dist[idx]}`;

    let color = 0x64748b;
    let border = '#94a3b8';
    if (isCurrent) {
      color = 0xf59e0b;
      border = '#fbbf24';
    } else if (isVisited) {
      color = 0x38bdf8;
      border = '#38bdf8';
    }

    const sphereGeo = new THREE.SphereGeometry(isCurrent ? 0.62 : 0.48, 28, 28);
    const sphereMat = new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: isCurrent ? 0.95 : isVisited ? 0.65 : 0.2,
      metalness: 0.6,
      roughness: 0.2,
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    sphere.position.set(n.x, n.y, n.z);
    group.add(sphere);

    if (isCurrent) {
      const ringGeo = new THREE.TorusGeometry(0.88, 0.06, 16, 48);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(n.x, n.y, n.z);
      ring.rotation.x = Math.PI / 2;
      group.add(ring);
    }

    const badge = createHudBadge([n.x, n.y + 1.05, n.z], {
      text: `${n.label}`,
      subText: `d=${dVal}`,
      borderColor: border,
      scale: [1.7, 0.85],
    });
    group.add(badge);
  });
}

// ============================================================================
// 3. BFS vs DFS 广度/深度优先搜索同屏双迷宫对比
// ============================================================================
function genBfsDfsSteps(): VisualizationStep[] {
  const size = 6;
  const walls = new Set(['1,1', '1,2', '2,4', '3,1', '3,2', '3,4', '4,2']);
  const start: [number, number] = [0, 0];
  const goal: [number, number] = [5, 5];

  // Generate BFS sequence
  const bfsOrder: [number, number][] = [];
  const bfsQueue: [number, number][] = [start];
  const bfsSeen = new Set<string>(['0,0']);
  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  while (bfsQueue.length > 0) {
    const [r, c] = bfsQueue.shift()!;
    bfsOrder.push([r, c]);
    if (r === goal[0] && c === goal[1]) break;
    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      const k = `${nr},${nc}`;
      if (nr >= 0 && nr < size && nc >= 0 && nc < size && !walls.has(k) && !bfsSeen.has(k)) {
        bfsSeen.add(k);
        bfsQueue.push([nr, nc]);
      }
    }
  }

  // Generate DFS sequence
  const dfsOrder: [number, number][] = [];
  const dfsSeen = new Set<string>();
  let foundDfs = false;
  function dfs(r: number, c: number) {
    if (foundDfs) return;
    const k = `${r},${c}`;
    dfsSeen.add(k);
    dfsOrder.push([r, c]);
    if (r === goal[0] && c === goal[1]) {
      foundDfs = true;
      return;
    }
    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      const nk = `${nr},${nc}`;
      if (nr >= 0 && nr < size && nc >= 0 && nc < size && !walls.has(nk) && !dfsSeen.has(nk)) {
        dfs(nr, nc);
      }
    }
  }
  dfs(0, 0);

  const maxSteps = Math.max(bfsOrder.length, dfsOrder.length);
  const steps: VisualizationStep[] = [];

  for (let i = 0; i < maxSteps; i++) {
    const bfsVisited = bfsOrder.slice(0, Math.min(i + 1, bfsOrder.length));
    const dfsVisited = dfsOrder.slice(0, Math.min(i + 1, dfsOrder.length));
    const bCurr = bfsVisited[bfsVisited.length - 1];
    const dCurr = dfsVisited[dfsVisited.length - 1];

    steps.push({
      type: 'bfs-dfs-dual',
      size,
      walls: Array.from(walls),
      start,
      goal,
      bfsVisited,
      dfsVisited,
      bfsCurrent: bCurr,
      dfsCurrent: dCurr,
      description: `第 ${i + 1} 步对比：左迷宫 BFS 队列层序扩散至 (${bCurr[0]},${bCurr[1]}) | 右迷宫 DFS 栈深度钻取至 (${dCurr[0]},${dCurr[1]})`,
      metrics: {
        'BFS 已探索': `${bfsVisited.length} 格`,
        'DFS 已探索': `${dfsVisited.length} 格`,
        模式对比: '水波队列 vs 深度栈',
      },
    });
  }

  return steps;
}

function renderBfsDfsDual(group: THREE.Group, step: VisualizationStep) {
  const size = step.size || 6;
  const spacing = 1.18;
  const wallSet = new Set<string>(step.walls || []);
  const bfsSet = new Set<string>((step.bfsVisited || []).map((p: [number, number]) => `${p[0]},${p[1]}`));
  const dfsSet = new Set<string>((step.dfsVisited || []).map((p: [number, number]) => `${p[0]},${p[1]}`));

  const renderSubGrid = (
    centerX: number,
    title: string,
    visitedSet: Set<string>,
    curr: [number, number],
    themeColor: number,
    badgeColor: string
  ) => {
    const titleBadge = createHudBadge([centerX, 3.1, -((size * spacing) / 2) - 0.6], {
      text: title,
      borderColor: badgeColor,
      scale: [3.4, 0.9],
    });
    group.add(titleBadge);

    const offset = ((size - 1) * spacing) / 2;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const k = `${r},${c}`;
        const x = centerX + (c * spacing - offset);
        const z = r * spacing - offset;

        const isWall = wallSet.has(k);
        const isCurr = curr && curr[0] === r && curr[1] === c;
        const isGoal = r === step.goal[0] && c === step.goal[1];
        const isVis = visitedSet.has(k);

        let h = 0.22;
        let col = 0x1e293b;
        let em = 0.1;

        if (isWall) {
          h = 1.4;
          col = 0x334155;
        } else if (isCurr) {
          h = 0.95;
          col = 0xfbbf24;
          em = 0.95;
        } else if (isGoal && isVis) {
          h = 1.1;
          col = 0x10b981;
          em = 0.95;
        } else if (isVis) {
          h = 0.55;
          col = themeColor;
          em = 0.65;
        }

        const geo = new THREE.BoxGeometry(spacing * 0.85, h, spacing * 0.85);
        const mat = new THREE.MeshStandardMaterial({
          color: col,
          emissive: col,
          emissiveIntensity: em,
          metalness: 0.5,
          roughness: 0.25,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(x, h / 2, z);
        group.add(mesh);
      }
    }
  };

  renderSubGrid(-4.6, 'BFS 广度优先 (队列水波)', bfsSet, step.bfsCurrent, 0x0ea5e9, '#38bdf8');
  renderSubGrid(4.6, 'DFS 深度优先 (栈式钻取)', dfsSet, step.dfsCurrent, 0xec4899, '#f472b6');
}

// ============================================================================
// 4 & 5. AVL 平衡二叉树 & BST 二叉搜索树 (3D 树结构与旋转平衡)
// ============================================================================
interface TreeNode3D {
  val: number;
  x: number;
  y: number;
  z: number;
  bf?: number;
  parentVal?: number;
  status?: 'normal' | 'active' | 'unbalanced' | 'pivot' | 'balanced' | 'range';
}

function genAvlTreeSteps(): VisualizationStep[] {
  const steps: VisualizationStep[] = [
    {
      type: 'tree-3d',
      nodes: [
        { val: 40, x: 0, y: 5.2, z: 0, bf: 1, status: 'normal' },
        { val: 20, x: -3.5, y: 3.0, z: 0.5, bf: 0, parentVal: 40, status: 'active' },
      ],
      description: '步骤 1：插入节点 40 与 20，根节点平衡因子 BF(40) = +1，树处于平衡状态',
      metrics: { 插入键值: 20, 最大失衡度: '|BF|=1', 状态: '平衡' },
    },
    {
      type: 'tree-3d',
      nodes: [
        { val: 40, x: 0, y: 5.2, z: 0, bf: 2, status: 'unbalanced' },
        { val: 20, x: -3.5, y: 3.0, z: 0.5, bf: 1, parentVal: 40, status: 'pivot' },
        { val: 10, x: -6.2, y: 0.8, z: 1.0, bf: 0, parentVal: 20, status: 'active' },
      ],
      rotationArc: { from: [0, 5.2, 0], to: [3.5, 3.0, 0.5], label: 'LL 右旋 (Right Rotate)' },
      description: '步骤 2：插入 10 导致节点 40 的 BF = +2（LL 型失衡）！触发以 20 为轴心的三维右旋',
      metrics: { 插入键值: 10, 失衡节点: '40 (BF=+2)', 旋转类型: 'LL 单右旋' },
    },
    {
      type: 'tree-3d',
      nodes: [
        { val: 20, x: 0, y: 5.2, z: 0, bf: 0, status: 'balanced' },
        { val: 10, x: -3.8, y: 2.8, z: 0.5, bf: 0, parentVal: 20, status: 'normal' },
        { val: 40, x: 3.8, y: 2.8, z: -0.5, bf: 0, parentVal: 20, status: 'balanced' },
      ],
      description: '步骤 3：右旋完成！节点 20 升任新根，10 与 40 分居左右，全树 BF 归零恢复完美平衡',
      metrics: { 当前根节点: 20, 树高: 2, 状态: '重平衡完成' },
    },
    {
      type: 'tree-3d',
      nodes: [
        { val: 20, x: 0, y: 5.4, z: 0, bf: -2, status: 'unbalanced' },
        { val: 10, x: -4.2, y: 3.0, z: 0.5, bf: 0, parentVal: 20, status: 'normal' },
        { val: 40, x: 4.2, y: 3.0, z: -0.5, bf: 2, parentVal: 20, status: 'unbalanced' },
        { val: 30, x: 2.0, y: 0.8, z: 0.6, bf: 0, parentVal: 40, status: 'pivot' },
        { val: 50, x: 6.4, y: 0.8, z: -0.8, bf: 0, parentVal: 40, status: 'normal' },
        { val: 25, x: 0.8, y: -1.1, z: 1.2, bf: 0, parentVal: 30, status: 'active' },
      ],
      rotationArc: { from: [2.0, 0.8, 0.6], to: [0, 5.4, 0], label: 'RL 双旋提根' },
      description: '步骤 4：继续插入 30, 50, 25 触发 RL 型双失衡，将节点 30 先右旋再左旋提拔上移',
      metrics: { 插入键值: 25, 失衡类型: 'RL 型双旋', 旋转轴心: 30 },
    },
    {
      type: 'tree-3d',
      nodes: [
        { val: 30, x: 0, y: 5.4, z: 0, bf: 0, status: 'balanced' },
        { val: 20, x: -4.2, y: 3.0, z: 0.4, bf: 0, parentVal: 30, status: 'balanced' },
        { val: 40, x: 4.2, y: 3.0, z: -0.4, bf: -1, parentVal: 30, status: 'balanced' },
        { val: 10, x: -6.2, y: 0.8, z: 0.8, bf: 0, parentVal: 20, status: 'normal' },
        { val: 25, x: -2.2, y: 0.8, z: 0.2, bf: 0, parentVal: 20, status: 'normal' },
        { val: 50, x: 6.2, y: 0.8, z: -0.8, bf: 0, parentVal: 40, status: 'normal' },
      ],
      description: '步骤 5：AVL 树全部旋转修复完毕！6 个节点严格保持 O(log n) 平衡高度，所有 |BF| ≤ 1',
      metrics: { 节点总数: 6, 树高: 3, 最大失衡度: '|BF| ≤ 1' },
    },
  ];
  return steps;
}

function genBstSteps(): VisualizationStep[] {
  const baseNodes: TreeNode3D[] = [
    { val: 30, x: 0, y: 5.4, z: 0 },
    { val: 18, x: -4.4, y: 3.1, z: 0.4, parentVal: 30 },
    { val: 45, x: 4.4, y: 3.1, z: -0.4, parentVal: 30 },
    { val: 10, x: -6.6, y: 0.8, z: 0.8, parentVal: 18 },
    { val: 24, x: -2.2, y: 0.8, z: 0.2, parentVal: 18 },
    { val: 36, x: 2.2, y: 0.8, z: -0.2, parentVal: 45 },
    { val: 52, x: 6.6, y: 0.8, z: -0.8, parentVal: 45 },
  ];

  const cloneWith = (overrides: Record<number, TreeNode3D['status']>): TreeNode3D[] =>
    baseNodes.map((n) => ({ ...n, status: overrides[n.val] || 'normal' }));

  return [
    {
      type: 'tree-3d',
      nodes: cloneWith({ 30: 'active' }),
      description: '步骤 1：检索并插入新键值 27 — 从根节点 30 出发，因 27 < 30 路由至左子树',
      metrics: { 目标操作: 'Insert(27)', 当前比较: '27 < 30 (向左)', 搜索深度: 1 },
    },
    {
      type: 'tree-3d',
      nodes: cloneWith({ 30: 'normal', 18: 'active' }),
      description: '步骤 2：到达节点 18，因 27 > 18 沿着右分支管道继续向下路由',
      metrics: { 目标操作: 'Insert(27)', 当前比较: '27 > 18 (向右)', 搜索深度: 2 },
    },
    {
      type: 'tree-3d',
      nodes: [
        ...cloneWith({ 24: 'active' }),
        { val: 27, x: -1.0, y: -1.2, z: 0.6, parentVal: 24, status: 'balanced' },
      ],
      description: '步骤 3：到达节点 24，27 > 24 且右孩子为空，将新节点 27 挂载为 24 的右孩子！',
      metrics: { 插入成功: 'Node(27)', 父节点: 24, 树高: 4 },
    },
    {
      type: 'tree-3d',
      nodes: [
        ...cloneWith({ 18: 'range', 24: 'range', 30: 'range', 36: 'range' }),
        { val: 27, x: -1.0, y: -1.2, z: 0.6, parentVal: 24, status: 'range' },
      ],
      rangeBox: { minX: -5.2, maxX: 3.0 },
      description: '步骤 4：执行三维区间范围查询 RangeQuery[18, 38] — 自动剪枝两侧越界子树，一次性命中 5 个有序节点',
      metrics: { 查询区间: '[18, 38]', 命中集合: '{18, 24, 27, 30, 36}', 剪枝节点: '{10, 45, 52}' },
    },
  ];
}

function renderTree3D(group: THREE.Group, step: VisualizationStep) {
  const nodes: TreeNode3D[] = step.nodes || [];
  const nodeMap = new Map<number, TreeNode3D>();
  nodes.forEach((n) => nodeMap.set(n.val, n));

  // Optional range query bounding box
  if (step.rangeBox) {
    const w = step.rangeBox.maxX - step.rangeBox.minX;
    const cx = (step.rangeBox.maxX + step.rangeBox.minX) / 2;
    const boxGeo = new THREE.BoxGeometry(w, 8.2, 3.2);
    const boxMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.08,
    });
    const box = new THREE.Mesh(boxGeo, boxMat);
    box.position.set(cx, 2.2, 0);
    group.add(box);
  }

  // Draw edges
  nodes.forEach((n) => {
    if (n.parentVal !== undefined && nodeMap.has(n.parentVal)) {
      const p = nodeMap.get(n.parentVal)!;
      const start = new THREE.Vector3(p.x, p.y, p.z);
      const end = new THREE.Vector3(n.x, n.y, n.z);
      const isHighlighted = n.status && n.status !== 'normal';
      const beam = createGlowingBeam(
        start,
        end,
        isHighlighted ? 0.085 : 0.055,
        isHighlighted ? 0x38bdf8 : 0x475569,
        0.85
      );
      group.add(beam);
    }
  });

  // Draw nodes
  nodes.forEach((n) => {
    let color = 0x6366f1;
    let border = '#818cf8';
    if (n.status === 'active') {
      color = 0xf59e0b;
      border = '#fbbf24';
    } else if (n.status === 'unbalanced') {
      color = 0xf43f5e;
      border = '#fb7185';
    } else if (n.status === 'pivot') {
      color = 0xfbbf24;
      border = '#fde047';
    } else if (n.status === 'balanced') {
      color = 0x10b981;
      border = '#34d399';
    } else if (n.status === 'range') {
      color = 0x0ea5e9;
      border = '#38bdf8';
    }

    const sphereGeo = new THREE.SphereGeometry(0.62, 32, 32);
    const sphereMat = new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: n.status && n.status !== 'normal' ? 0.85 : 0.35,
      metalness: 0.65,
      roughness: 0.2,
    });
    const mesh = new THREE.Mesh(sphereGeo, sphereMat);
    mesh.position.set(n.x, n.y, n.z);
    group.add(mesh);

    if (n.status === 'pivot' || n.status === 'unbalanced') {
      const ringGeo = new THREE.TorusGeometry(0.92, 0.06, 16, 48);
      const ringMat = new THREE.MeshBasicMaterial({ color });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(n.x, n.y, n.z);
      ring.rotation.x = Math.PI / 2;
      group.add(ring);
    }

    const badge = createHudBadge([n.x, n.y + 1.15, n.z], {
      text: `${n.val}`,
      subText: n.bf !== undefined ? `BF=${n.bf > 0 ? '+' + n.bf : n.bf}` : undefined,
      borderColor: border,
      scale: n.bf !== undefined ? [1.85, 0.88] : [1.45, 0.72],
    });
    group.add(badge);
  });

  if (step.rotationArc) {
    const start = new THREE.Vector3(...step.rotationArc.from);
    const end = new THREE.Vector3(...step.rotationArc.to);
    const arc = createEnergyArc(start, end, 2.2, 0xfbbf24, 0.09, 0.95);
    group.add(arc);

    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const rotBadge = createHudBadge([mid.x, mid.y + 2.5, mid.z], {
      text: step.rotationArc.label,
      borderColor: '#fbbf24',
      scale: [3.1, 0.85],
    });
    group.add(rotBadge);
  }
}

// ============================================================================
// 6. N 皇后回溯棋盘 (3D 国际象棋水晶棋盘 + 激光冲突线)
// ============================================================================
function genNQueensSteps(): VisualizationStep[] {
  const n = 4;
  const steps: VisualizationStep[] = [
    {
      type: 'n-queens-board',
      n,
      queens: [{ r: 0, c: 0, status: 'safe' }],
      conflictRay: null,
      description: '步骤 1：在 4×4 水晶棋盘第 0 行列 0 放置第 1 枚皇后 Q₀(0,0)',
      metrics: { 棋盘规模: '4×4', 已放置皇后: '1/4', 回溯次数: 0 },
    },
    {
      type: 'n-queens-board',
      n,
      queens: [
        { r: 0, c: 0, status: 'safe' },
        { r: 1, c: 1, status: 'conflict' },
      ],
      conflictRay: [
        [0, 0],
        [1, 1],
      ],
      description: '步骤 2：试探 (1,1) 触发主对角线红色激光冲突！立刻剪枝跳过',
      metrics: { 试探位置: '(1, 1)', 冲突源: 'Q₀(0,0) 对角线', 回溯次数: 0 },
    },
    {
      type: 'n-queens-board',
      n,
      queens: [
        { r: 0, c: 0, status: 'safe' },
        { r: 1, c: 2, status: 'safe' },
        { r: 2, c: 1, status: 'conflict' },
      ],
      conflictRay: [
        [1, 2],
        [2, 1],
      ],
      description: '步骤 3：第 1 行放 (1,2) 安全；但第 2 行所有列均被激光封锁，触发回溯撤销！',
      metrics: { 当前行: 'Row 2 死胡同', 动作: 'Backtrack 回溯', 回溯次数: 1 },
    },
    {
      type: 'n-queens-board',
      n,
      queens: [
        { r: 0, c: 1, status: 'safe' },
        { r: 1, c: 3, status: 'safe' },
        { r: 2, c: 0, status: 'safe' },
      ],
      conflictRay: null,
      description: '步骤 4：回溯将首行皇后右移至 Q₀(0,1)，随后顺利放置 Q₁(1,3) 与 Q₂(2,0)',
      metrics: { 棋盘规模: '4×4', 已放置皇后: '3/4', 回溯次数: 2 },
    },
    {
      type: 'n-queens-board',
      n,
      queens: [
        { r: 0, c: 1, status: 'solved' },
        { r: 1, c: 3, status: 'solved' },
        { r: 2, c: 0, status: 'solved' },
        { r: 3, c: 2, status: 'solved' },
      ],
      conflictRay: null,
      description: '步骤 5：第 3 行成功放置 Q₃(3,2)！4 枚皇后互不攻击，锁定全局合法解 [1, 3, 0, 2]',
      metrics: { 全局解向量: '[1, 3, 0, 2]', 已放置皇后: '4/4', 状态: '搜索成功' },
    },
  ];
  return steps;
}

function renderNQueensBoard(group: THREE.Group, step: VisualizationStep) {
  const n = step.n || 4;
  const tileSize = 2.1;
  const offset = ((n - 1) * tileSize) / 2;

  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      const isDark = (r + c) % 2 === 1;
      const x = c * tileSize - offset;
      const z = r * tileSize - offset;
      const geo = new THREE.BoxGeometry(tileSize * 0.94, 0.3, tileSize * 0.94);
      const mat = new THREE.MeshStandardMaterial({
        color: isDark ? 0x1e293b : 0x334155,
        metalness: 0.7,
        roughness: 0.2,
      });
      const tile = new THREE.Mesh(geo, mat);
      tile.position.set(x, 0.15, z);
      group.add(tile);
    }
  }

  // Render Queens
  (step.queens || []).forEach((q: any, idx: number) => {
    const x = q.c * tileSize - offset;
    const z = q.r * tileSize - offset;
    const color =
      q.status === 'conflict'
        ? 0xf43f5e
        : q.status === 'solved'
        ? 0xfbbf24
        : 0x10b981;

    // Queen pedestal + crown cone
    const bodyGeo = new THREE.CylinderGeometry(0.35, 0.58, 1.55, 24);
    const bodyMat = new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: 0.75,
      metalness: 0.75,
      roughness: 0.18,
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.set(x, 1.05, z);
    group.add(body);

    const orbGeo = new THREE.SphereGeometry(0.36, 24, 24);
    const orb = new THREE.Mesh(orbGeo, bodyMat);
    orb.position.set(x, 2.0, z);
    group.add(orb);

    const badge = createHudBadge([x, 2.85, z], {
      text: `Q${idx} (${q.r},${q.c})`,
      borderColor: q.status === 'conflict' ? '#fb7185' : '#34d399',
      scale: [1.9, 0.75],
    });
    group.add(badge);
  });

  if (step.conflictRay) {
    const [[r1, c1], [r2, c2]] = step.conflictRay;
    const p1 = new THREE.Vector3(c1 * tileSize - offset, 1.4, r1 * tileSize - offset);
    const p2 = new THREE.Vector3(c2 * tileSize - offset, 1.4, r2 * tileSize - offset);
    const laser = createGlowingBeam(p1, p2, 0.11, 0xf43f5e, 0.95);
    group.add(laser);
  }
}

// ============================================================================
// 7. 0-1 背包动态规划 (3D 状态递推水晶矩阵)
// ============================================================================
function genKnapsackDpSteps(): VisualizationStep[] {
  const items = [
    { name: '宝石A', w: 2, v: 3 },
    { name: '金块B', w: 3, v: 4 },
    { name: '圣杯C', w: 4, v: 5 },
  ];
  const maxW = 6;
  const dp: number[][] = Array.from({ length: items.length + 1 }, () =>
    Array(maxW + 1).fill(0)
  );

  const steps: VisualizationStep[] = [];

  for (let i = 1; i <= items.length; i++) {
    const item = items[i - 1];
    for (let w = 1; w <= maxW; w++) {
      const withoutItem = dp[i - 1][w];
      let withItem = -1;
      if (w >= item.w) {
        withItem = dp[i - 1][w - item.w] + item.v;
        dp[i][w] = Math.max(withoutItem, withItem);
      } else {
        dp[i][w] = withoutItem;
      }

      if (w === item.w || w === maxW || (i === items.length && w === maxW)) {
        steps.push({
          type: 'knapsack-3d',
          items,
          maxW,
          dp: dp.map((row) => [...row]),
          activeCell: [i, w],
          fromSkip: [i - 1, w],
          fromTake: w >= item.w ? [i - 1, w - item.w] : null,
          description:
            w >= item.w
              ? `计算 dp[${i}][${w}] (${item.name} 重${item.w}价${item.v})：对比不装(${withoutItem}) vs 装入(dp[${i - 1}][${w - item.w}]+${item.v}=${withItem}) → 取极值 ${dp[i][w]}`
              : `计算 dp[${i}][${w}]：当前容量 ${w} < ${item.name}重量 ${item.w}，直接继承上方状态 dp[${i - 1}][${w}] = ${withoutItem}`,
          metrics: {
            当前物品: `${item.name}(w=${item.w},v=${item.v})`,
            背包容量w: w,
            最优价值: dp[i][w],
          },
        });
      }
    }
  }

  return steps;
}

function renderKnapsack3D(group: THREE.Group, step: VisualizationStep) {
  const dp: number[][] = step.dp || [];
  const rows = dp.length;
  const cols = (dp[0] || []).length;
  const spacingX = 1.75;
  const spacingZ = 1.95;
  const offX = ((cols - 1) * spacingX) / 2;
  const offZ = ((rows - 1) * spacingZ) / 2;

  const cellTop = (r: number, c: number) => {
    const val = dp[r]?.[c] ?? 0;
    const h = 0.35 + val * 0.52;
    return new THREE.Vector3(c * spacingX - offX, h, r * spacingZ - offZ);
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const val = dp[r][c];
      const h = 0.35 + val * 0.52;
      const x = c * spacingX - offX;
      const z = r * spacingZ - offZ;

      const isActive = step.activeCell && step.activeCell[0] === r && step.activeCell[1] === c;
      const isSkip = step.fromSkip && step.fromSkip[0] === r && step.fromSkip[1] === c;
      const isTake = step.fromTake && step.fromTake[0] === r && step.fromTake[1] === c;

      let color = val === 0 ? 0x334155 : 0x6366f1;
      if (isActive) color = 0x10b981;
      else if (isTake) color = 0xf59e0b;
      else if (isSkip) color = 0x38bdf8;

      const geo = new THREE.BoxGeometry(1.15, h, 1.15);
      const mat = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: isActive || isTake || isSkip ? 0.8 : 0.25,
        metalness: 0.6,
        roughness: 0.22,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, h / 2, z);
      group.add(mesh);

      if (val > 0 || isActive) {
        const badge = createHudBadge([x, h + 0.55, z], {
          text: `${val}`,
          borderColor: isActive ? '#10b981' : isTake ? '#fbbf24' : '#818cf8',
          scale: [1.1, 0.55],
        });
        group.add(badge);
      }
    }
  }

  if (step.activeCell && step.fromSkip) {
    const dest = cellTop(step.activeCell[0], step.activeCell[1]);
    const srcSkip = cellTop(step.fromSkip[0], step.fromSkip[1]);
    group.add(createEnergyArc(srcSkip, dest, 1.4, 0x38bdf8, 0.065, 0.9));

    if (step.fromTake) {
      const srcTake = cellTop(step.fromTake[0], step.fromTake[1]);
      group.add(createEnergyArc(srcTake, dest, 1.8, 0xf59e0b, 0.075, 0.95));
    }
  }
}

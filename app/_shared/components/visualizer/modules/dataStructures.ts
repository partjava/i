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
// 1. A* 启发式寻路 (9×9 3D 城市迷宫 + 实时 g/h/f 能量塔)
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
    description: `初始化 9×9 三维城市迷宫：起点 (1,1) → 终点 (7,7)，启发函数 h(n) = |x₁-x₂| + |y₁-y₂|`,
    metrics: { 开放集Open: 1, 已评估Closed: 0, 初始代价值: `f=${h(start[0], start[1])}` },
  });

  const dirs = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  while (openSet.size > 0) {
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
        description: `A* 寻路成功！回溯父指针架起跨越迷宫的黄金最短路径光桥（总步数 ${path.length - 1}，扩展 ${closedSet.size} 格）`,
        metrics: { 最短路径步数: path.length - 1, 累计评估节点: closedSet.size, 状态: '锁定全局最短路' },
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
      description: `弹出优先队列队首 (${currentNode.r},${currentNode.c})：已走代价 g=${currentNode.g} + 曼哈顿预估 h=${currentNode.f - currentNode.g} → 综合代价 f=${currentNode.f}`,
      metrics: { 当前评估: `f=${currentNode.f} (g=${currentNode.g},h=${currentNode.f - currentNode.g})`, 开放集: openSet.size, 已评估: closedSet.size },
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
        height = 1.95;
        color = 0x334155;
        emissiveIntensity = 0.05;
      } else if (isStart) {
        height = 1.15;
        color = 0x10b981;
        emissiveIntensity = 0.85;
      } else if (isGoal) {
        height = 1.3;
        color = 0xf43f5e;
        emissiveIntensity = 0.9;
      } else if (isPath) {
        height = 1.0;
        color = 0xfbbf24;
        emissiveIntensity = 0.95;
      } else if (isCurrent) {
        height = 0.88;
        color = 0xf59e0b;
        emissiveIntensity = 0.85;
      } else if (openInfo) {
        height = 0.55;
        color = 0x38bdf8;
        emissiveIntensity = 0.65;
      } else if (isClosed) {
        height = 0.4;
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
        const badge = createHudBadge([x, height + 0.95, z], {
          text: isStart ? '起点 S' : '终点 G',
          borderColor: isStart ? '#10b981' : '#f43f5e',
          scale: [1.85, 0.82],
        });
        group.add(badge);
      } else if (openInfo && !isPath) {
        const badge = createHudBadge([x, height + 0.65, z], {
          text: `f=${openInfo.f}`,
          subText: `${openInfo.g}+${openInfo.f - openInfo.g}`,
          borderColor: '#38bdf8',
          scale: [1.55, 0.78],
        });
        group.add(badge);
      }
    }
  }

  if (Array.isArray(step.path) && step.path.length > 1) {
    const pts = step.path.map(([r, c]: [number, number]) => {
      const x = c * tileSpacing - offset;
      const z = r * tileSpacing - offset;
      return new THREE.Vector3(x, 1.4, z);
    });
    const curve = new THREE.CatmullRomCurve3(pts);
    const tubeGeo = new THREE.TubeGeometry(curve, pts.length * 6, 0.15, 12, false);
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
// 2. Dijkstra 最短路径 (10 节点 3 层立体拓扑星图 + 最短路径回溯光桥)
// ============================================================================
function genDijkstraSteps(): VisualizationStep[] {
  const nodes = [
    { id: 0, label: 'S', x: -8.2, y: 2.6, z: 0 },
    { id: 1, label: 'A', x: -4.8, y: 5.2, z: -2.8 },
    { id: 2, label: 'B', x: -4.6, y: 1.2, z: 3.0 },
    { id: 3, label: 'C', x: -1.4, y: 3.4, z: -0.4 },
    { id: 4, label: 'D', x: -0.8, y: 5.8, z: 2.4 },
    { id: 5, label: 'E', x: 0.2, y: 1.0, z: -3.2 },
    { id: 6, label: 'F', x: 3.4, y: 4.8, z: -1.8 },
    { id: 7, label: 'G', x: 3.6, y: 1.5, z: 2.8 },
    { id: 8, label: 'H', x: 5.8, y: 3.8, z: 0.8 },
    { id: 9, label: 'T', x: 8.4, y: 2.8, z: -0.2 },
  ];

  const edges = [
    { u: 0, v: 1, w: 4 },
    { u: 0, v: 2, w: 2 },
    { u: 0, v: 3, w: 7 },
    { u: 1, v: 3, w: 2 },
    { u: 1, v: 4, w: 5 },
    { u: 2, v: 3, w: 3 },
    { u: 2, v: 5, w: 6 },
    { u: 3, v: 4, w: 2 },
    { u: 3, v: 5, w: 2 },
    { u: 3, v: 6, w: 5 },
    { u: 4, v: 7, w: 4 },
    { u: 5, v: 6, w: 2 },
    { u: 5, v: 7, w: 3 },
    { u: 6, v: 8, w: 2 },
    { u: 7, v: 8, w: 3 },
    { u: 6, v: 9, w: 5 },
    { u: 8, v: 9, w: 2 },
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
    finalPath: [],
    description: `初始化 10 节点三维空间拓扑图：源点 S(0) 距离 dist=0 入队，其余 9 个星座节点初始 dist=∞`,
    metrics: { 源点: 'S(0)', 已收敛节点: `0/${nodes.length}`, 终点T最短距: '∞' },
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
      finalPath: [],
      description: `从优先队列弹出最近未收敛节点 ${nodes[u].label}（锁定全局最短距离 dist[${nodes[u].label}] = ${dist[u]}）`,
      metrics: { 锁定节点: `${nodes[u].label} (d=${dist[u]})`, 已收敛: `${visited.size}/${nodes.length}`, 终点T距离: dist[9] === Infinity ? '∞' : dist[9] },
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
          finalPath: [],
          description: `松弛边 (${nodes[u].label} → ${nodes[nb].label}, 权 w=${e.w})：dist[${nodes[nb].label}] 由 ${old === Infinity ? '∞' : old} 缩短为 ${dist[nb]}`,
          metrics: { 松弛边: `${nodes[u].label}→${nodes[nb].label} (+${e.w})`, 更新后距离: `d(${nodes[nb].label})=${dist[nb]}`, 终点T距离: dist[9] === Infinity ? '∞' : dist[9] },
        });
      }
    }
  }

  // Reconstruct final shortest path S -> T
  const finalPath: number[] = [];
  let cur = 9;
  while (cur !== -1) {
    finalPath.unshift(cur);
    cur = parent[cur];
  }

  steps.push({
    type: 'dijkstra-graph',
    nodes,
    edges,
    dist: [...dist],
    parent: [...parent],
    visited: Array.from(visited),
    current: 9,
    relaxEdge: null,
    finalPath,
    description: `Dijkstra 最短路径树构建完成！源点 S 到终点 T 最短路径：${finalPath.map((i) => nodes[i].label).join(' → ')}（总权重 ${dist[9]}）`,
    metrics: { 最短路径链: finalPath.map((i) => nodes[i].label).join('→'), 最短总权重: dist[9], 状态: '全图收敛' },
  });

  return steps;
}

function renderDijkstraGraph(group: THREE.Group, step: VisualizationStep) {
  const { nodes, edges, dist, parent, visited, current, relaxEdge, finalPath } = step;
  const visitedSet = new Set<number>(visited || []);
  const finalPathPairs = new Set<string>();
  if (Array.isArray(finalPath)) {
    for (let i = 0; i < finalPath.length - 1; i++) {
      finalPathPairs.add(`${finalPath[i]}-${finalPath[i + 1]}`);
      finalPathPairs.add(`${finalPath[i + 1]}-${finalPath[i]}`);
    }
  }

  edges.forEach((e: any) => {
    const n1 = nodes[e.u];
    const n2 = nodes[e.v];
    const p1 = new THREE.Vector3(n1.x, n1.y, n1.z);
    const p2 = new THREE.Vector3(n2.x, n2.y, n2.z);

    const isFinalEdge = finalPathPairs.has(`${e.u}-${e.v}`);
    const isRelaxing =
      relaxEdge &&
      ((relaxEdge[0] === e.u && relaxEdge[1] === e.v) ||
        (relaxEdge[0] === e.v && relaxEdge[1] === e.u));
    const isSptEdge = parent[e.u] === e.v || parent[e.v] === e.u;

    let color = 0x334155;
    let radius = 0.045;
    let opacity = 0.42;

    if (isFinalEdge) {
      color = 0xfbbf24;
      radius = 0.14;
      opacity = 1.0;
    } else if (isRelaxing) {
      color = 0xf59e0b;
      radius = 0.12;
      opacity = 0.95;
    } else if (isSptEdge) {
      color = 0x10b981;
      radius = 0.095;
      opacity = 0.88;
    }

    group.add(createGlowingBeam(p1, p2, radius, color, opacity));

    const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
    group.add(
      createHudBadge([mid.x, mid.y + 0.38, mid.z], {
        text: `${e.w}`,
        borderColor: isFinalEdge ? '#fbbf24' : isRelaxing ? '#f59e0b' : isSptEdge ? '#10b981' : '#475569',
        scale: [1.1, 0.55],
      })
    );
  });

  nodes.forEach((n: any, idx: number) => {
    const isCurrent = current === idx;
    const isVisited = visitedSet.has(idx);
    const isInFinal = Array.isArray(finalPath) && finalPath.includes(idx);
    const dVal = dist[idx] === Infinity ? '∞' : `${dist[idx]}`;

    let color = 0x64748b;
    let border = '#94a3b8';
    if (isInFinal) {
      color = 0xfbbf24;
      border = '#fbbf24';
    } else if (isCurrent) {
      color = 0xf59e0b;
      border = '#fbbf24';
    } else if (isVisited) {
      color = 0x38bdf8;
      border = '#38bdf8';
    }

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(isCurrent || isInFinal ? 0.62 : 0.48, 28, 28),
      new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: isCurrent || isInFinal ? 0.95 : isVisited ? 0.65 : 0.2,
        metalness: 0.6,
        roughness: 0.2,
      })
    );
    sphere.position.set(n.x, n.y, n.z);
    group.add(sphere);

    group.add(
      createHudBadge([n.x, n.y + 1.15, n.z], {
        text: `${n.label}`,
        subText: `d=${dVal}`,
        borderColor: border,
        scale: [1.85, 0.92],
      })
    );
  });
}

// ============================================================================
// 3. BFS vs DFS 搜索对比 (7×7 双核迷宫 + 队列/栈状态轨迹线)
// ============================================================================
function genBfsDfsSteps(): VisualizationStep[] {
  const size = 7;
  const walls = new Set([
    '1,1', '1,2', '1,3', '1,5',
    '2,5', '3,1', '3,2', '3,3',
    '4,3', '4,5', '5,1', '5,2', '5,5',
  ]);
  const start: [number, number] = [0, 0];
  const goal: [number, number] = [6, 6];

  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  // BFS
  const bfsOrder: [number, number][] = [];
  const bfsQueue: [number, number][] = [start];
  const bfsSeen = new Set<string>(['0,0']);
  while (bfsQueue.length > 0) {
    const [r, c] = bfsQueue.shift()!;
    bfsOrder.push([r, c]);
    if (r === goal[0] && c === goal[1]) break;
    for (const [dr, dc] of dirs) {
      const nr = r + dr,
        nc = c + dc,
        k = `${nr},${nc}`;
      if (nr >= 0 && nr < size && nc >= 0 && nc < size && !walls.has(k) && !bfsSeen.has(k)) {
        bfsSeen.add(k);
        bfsQueue.push([nr, nc]);
      }
    }
  }

  // DFS
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
      const nr = r + dr,
        nc = c + dc,
        nk = `${nr},${nc}`;
      if (nr >= 0 && nr < size && nc >= 0 && nc < size && !walls.has(nk) && !dfsSeen.has(nk)) {
        dfs(nr, nc);
        if (!foundDfs) {
          dfsOrder.push([r, c]); // record backtrack step!
        }
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
    const bLayer = bCurr[0] + bCurr[1];

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
      description: `第 ${i + 1} 步：左迷宫 BFS 沿等距水波第 ${bLayer} 层推进至 (${bCurr[0]},${bCurr[1]}) | 右迷宫 DFS 栈探针深入/回溯至 (${dCurr[0]},${dCurr[1]})`,
      metrics: {
        'BFS 波前层深': `Layer ${bLayer} (${bfsVisited.length}格)`,
        'DFS 栈轨迹步': `${dfsVisited.length} 步`,
        机制对比: 'FIFO队列 vs LIFO递归栈',
      },
    });
  }

  return steps;
}

function renderBfsDfsDual(group: THREE.Group, step: VisualizationStep) {
  const size = step.size || 7;
  const spacing = 1.08;
  const wallSet = new Set<string>(step.walls || []);
  const bfsSet = new Set<string>((step.bfsVisited || []).map((p: [number, number]) => `${p[0]},${p[1]}`));
  const dfsSet = new Set<string>((step.dfsVisited || []).map((p: [number, number]) => `${p[0]},${p[1]}`));

  const renderSubGrid = (
    centerX: number,
    title: string,
    visitedList: [number, number][],
    visitedSet: Set<string>,
    curr: [number, number],
    themeColor: number,
    badgeColor: string
  ) => {
    const offset = ((size - 1) * spacing) / 2;
    group.add(
      createHudBadge([centerX, 3.2, -offset - 0.8], {
        text: title,
        borderColor: badgeColor,
        scale: [3.2, 0.95],
      })
    );

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
          h = 1.45;
          col = 0x334155;
        } else if (isCurr) {
          h = 1.05;
          col = 0xfbbf24;
          em = 0.95;
        } else if (isGoal && isVis) {
          h = 1.15;
          col = 0x10b981;
          em = 0.95;
        } else if (isVis) {
          h = 0.58;
          col = themeColor;
          em = 0.65;
        }

        const mesh = new THREE.Mesh(
          new THREE.BoxGeometry(spacing * 0.85, h, spacing * 0.85),
          new THREE.MeshStandardMaterial({
            color: col,
            emissive: col,
            emissiveIntensity: em,
            metalness: 0.5,
            roughness: 0.25,
          })
        );
        mesh.position.set(x, h / 2, z);
        group.add(mesh);
      }
    }

    // Draw trajectory tube on top of visited cells
    if (visitedList && visitedList.length > 1) {
      const pts = visitedList.map(([r, c]) => {
        const x = centerX + (c * spacing - offset);
        const z = r * spacing - offset;
        return new THREE.Vector3(x, 0.82, z);
      });
      const curve = new THREE.CatmullRomCurve3(pts);
      group.add(
        new THREE.Mesh(
          new THREE.TubeGeometry(curve, pts.length * 3, 0.065, 8, false),
          new THREE.MeshBasicMaterial({ color: 0xfbbf24 })
        )
      );
    }
  };

  renderSubGrid(-4.8, 'BFS 广度优先 (队列层序水波)', step.bfsVisited, bfsSet, step.bfsCurrent, 0x0ea5e9, '#38bdf8');
  renderSubGrid(4.8, 'DFS 深度优先 (栈探针与回溯)', step.dfsVisited, dfsSet, step.dfsCurrent, 0xec4899, '#f472b6');
}

// ============================================================================
// 4 & 5. 4-5层深度 AVL 平衡二叉树 & 15节点 BST 二叉搜索树
// ============================================================================
interface TreeNode3D {
  val: number;
  x: number;
  y: number;
  z: number;
  bf?: number;
  h?: number;
  parentVal?: number;
  status?: 'normal' | 'active' | 'unbalanced' | 'pivot' | 'balanced' | 'range' | 'pruned';
}

function genAvlTreeSteps(): VisualizationStep[] {
  const steps: VisualizationStep[] = [
    {
      type: 'tree-3d',
      nodes: [
        { val: 50, x: 0, y: 6.2, z: 0, bf: 1, h: 2, status: 'normal' },
        { val: 30, x: -4.2, y: 4.0, z: 0.4, bf: 0, h: 1, parentVal: 50, status: 'active' },
      ],
      description: '阶段 1 [LL 失衡构建]：依次插入 50, 30，根节点 50 左高 1、右高 0，平衡因子 BF(50) = +1',
      metrics: { 当前操作: 'Insert(30)', 根平衡因子: 'BF(50)=+1', 树高度: 2 },
    },
    {
      type: 'tree-3d',
      nodes: [
        { val: 50, x: 0, y: 6.2, z: 0, bf: 2, h: 3, status: 'unbalanced' },
        { val: 30, x: -4.2, y: 4.0, z: 0.4, bf: 1, h: 2, parentVal: 50, status: 'pivot' },
        { val: 15, x: -7.0, y: 1.8, z: 0.8, bf: 0, h: 1, parentVal: 30, status: 'active' },
      ],
      rotationArc: { from: [0, 6.2, 0], to: [4.2, 4.0, 0.4], label: 'LL 单右旋 (Right Rotate)' },
      description: '阶段 1 [触发 LL 右旋]：插入 15 后回溯更新高度，节点 50 的 BF = 2 - 0 = +2 失衡！以 30 为轴心执行右旋',
      metrics: { 失衡节点: '50 (BF=+2)', 旋转类型: 'LL 单右旋', 旋转轴心: 30 },
    },
    {
      type: 'tree-3d',
      nodes: [
        { val: 30, x: 0, y: 6.2, z: 0, bf: 0, h: 2, status: 'balanced' },
        { val: 15, x: -4.2, y: 4.0, z: 0.4, bf: 0, h: 1, parentVal: 30, status: 'normal' },
        { val: 50, x: 4.2, y: 4.0, z: -0.4, bf: 0, h: 1, parentVal: 30, status: 'balanced' },
      ],
      description: '阶段 1 [LL 修复完成]：节点 30 升为新根，15 与 50 对称分布在第 2 层，全树高度压回 2，所有 BF = 0',
      metrics: { 当前根节点: 30, 树高度: 2, 状态: 'LL 平衡恢复' },
    },
    {
      type: 'tree-3d',
      nodes: [
        { val: 30, x: 0, y: 6.2, z: 0, bf: -2, h: 4, status: 'unbalanced' },
        { val: 15, x: -4.4, y: 4.0, z: 0.4, bf: 0, h: 1, parentVal: 30, status: 'normal' },
        { val: 50, x: 4.4, y: 4.0, z: -0.4, bf: -2, h: 3, parentVal: 30, status: 'unbalanced' },
        { val: 70, x: 7.2, y: 1.8, z: -0.8, bf: -1, h: 2, parentVal: 50, status: 'pivot' },
        { val: 85, x: 9.2, y: -0.4, z: -1.2, bf: 0, h: 1, parentVal: 70, status: 'active' },
      ],
      rotationArc: { from: [4.4, 4.0, -0.4], to: [1.8, 1.8, 0], label: 'RR 单左旋 (Left Rotate)' },
      description: '阶段 2 [触发 RR 左旋]：连续插入右子树 70, 85，导致节点 50 的 BF = -2（RR 型失衡）！以 70 为轴执行左旋',
      metrics: { 失衡节点: '50 (BF=-2)', 旋转类型: 'RR 单左旋', 旋转轴心: 70 },
    },
    {
      type: 'tree-3d',
      nodes: [
        { val: 30, x: 0, y: 6.2, z: 0, bf: -1, h: 3, status: 'balanced' },
        { val: 15, x: -4.4, y: 4.0, z: 0.4, bf: 0, h: 1, parentVal: 30, status: 'normal' },
        { val: 70, x: 4.4, y: 4.0, z: -0.4, bf: 0, h: 2, parentVal: 30, status: 'balanced' },
        { val: 50, x: 2.0, y: 1.8, z: 0.2, bf: 0, h: 1, parentVal: 70, status: 'balanced' },
        { val: 85, x: 6.8, y: 1.8, z: -0.8, bf: 0, h: 1, parentVal: 70, status: 'normal' },
      ],
      description: '阶段 2 [RR 修复完成]：节点 70 提拔取代 50，50 降为 70 的左孩子，右子树高度由 3 降为 2',
      metrics: { 右子树新根: 70, 根BF: 'BF(30)=-1', 树高度: 3 },
    },
    {
      type: 'tree-3d',
      nodes: [
        { val: 30, x: 0, y: 6.2, z: 0, bf: -2, h: 4, status: 'unbalanced' },
        { val: 15, x: -4.6, y: 4.0, z: 0.4, bf: 0, h: 1, parentVal: 30, status: 'normal' },
        { val: 70, x: 4.6, y: 4.0, z: -0.4, bf: 1, h: 3, parentVal: 30, status: 'pivot' },
        { val: 50, x: 2.0, y: 1.8, z: 0.2, bf: -1, h: 2, parentVal: 70, status: 'pivot' },
        { val: 85, x: 7.2, y: 1.8, z: -0.8, bf: 0, h: 1, parentVal: 70, status: 'normal' },
        { val: 60, x: 3.4, y: -0.4, z: 0.6, bf: 0, h: 1, parentVal: 50, status: 'active' },
      ],
      rotationArc: { from: [2.0, 1.8, 0.2], to: [0, 6.2, 0], label: 'RL 先右旋后左旋提根' },
      description: '阶段 3 [触发 RL 双旋]：在第 4 层插入节点 60，导致根节点 30 的 BF = -2 且右孩子 70 的 BF = +1（RL 型）',
      metrics: { 失衡节点: '30 (BF=-2)', 子树符号: 'BF(70)=+1 异号', 旋转类型: 'RL 双旋' },
    },
    {
      type: 'tree-3d',
      nodes: [
        { val: 50, x: 0, y: 6.2, z: 0, bf: 0, h: 3, status: 'balanced' },
        { val: 30, x: -4.4, y: 3.8, z: 0.4, bf: 1, h: 2, parentVal: 50, status: 'balanced' },
        { val: 70, x: 4.4, y: 3.8, z: -0.4, bf: 0, h: 2, parentVal: 50, status: 'balanced' },
        { val: 15, x: -6.8, y: 1.4, z: 0.8, bf: 0, h: 1, parentVal: 30, status: 'normal' },
        { val: 60, x: 2.0, y: 1.4, z: 0.2, bf: 0, h: 1, parentVal: 70, status: 'balanced' },
        { val: 85, x: 6.8, y: 1.4, z: -0.8, bf: 0, h: 1, parentVal: 70, status: 'normal' },
      ],
      description: '阶段 3 [RL 双旋完成]：节点 50 跃升为整棵树的新根，60 挂载至 70 左子树，树高重新锁定为 3！',
      metrics: { 全树新根: 50, 树高度: 3, 状态: 'RL 双旋收敛' },
    },
    {
      type: 'tree-3d',
      nodes: [
        { val: 50, x: 0, y: 6.4, z: 0, bf: 0, h: 4, status: 'balanced' },
        { val: 25, x: -4.6, y: 4.0, z: 0.4, bf: 0, h: 3, parentVal: 50, status: 'balanced' },
        { val: 70, x: 4.6, y: 4.0, z: -0.4, bf: 0, h: 3, parentVal: 50, status: 'balanced' },
        { val: 15, x: -7.0, y: 1.6, z: 0.8, bf: 0, h: 2, parentVal: 25, status: 'normal' },
        { val: 35, x: -2.2, y: 1.6, z: 0.2, bf: 0, h: 2, parentVal: 25, status: 'normal' },
        { val: 60, x: 2.2, y: 1.6, z: -0.2, bf: 0, h: 2, parentVal: 70, status: 'normal' },
        { val: 85, x: 7.0, y: 1.6, z: -0.8, bf: 0, h: 2, parentVal: 70, status: 'normal' },
        { val: 10, x: -8.2, y: -0.8, z: 1.1, bf: 0, h: 1, parentVal: 15, status: 'active' },
        { val: 40, x: -1.0, y: -0.8, z: 0.5, bf: 0, h: 1, parentVal: 35, status: 'active' },
        { val: 65, x: 3.4, y: -0.8, z: 0.1, bf: 0, h: 1, parentVal: 60, status: 'active' },
        { val: 92, x: 8.2, y: -0.8, z: -1.1, bf: 0, h: 1, parentVal: 85, status: 'active' },
      ],
      description: '阶段 4 [4层11节点完全平衡态]：继续插入 10, 25, 35, 40, 65, 92，构建出 4 层高密度严格平衡 AVL 树（任意节点 |BF| ≤ 1）',
      metrics: { 节点总数: 11, 树层深: '4 层 (O(log n))', 最大失衡度: 'max|BF| = 0' },
    },
  ];
  return steps;
}

function genBstSteps(): VisualizationStep[] {
  // 4-layer 15-node complete Binary Search Tree!
  const fullTree: TreeNode3D[] = [
    // Layer 1 (Root)
    { val: 50, x: 0, y: 6.4, z: 0 },
    // Layer 2
    { val: 26, x: -4.8, y: 4.1, z: 0.3, parentVal: 50 },
    { val: 74, x: 4.8, y: 4.1, z: -0.3, parentVal: 50 },
    // Layer 3
    { val: 14, x: -7.4, y: 1.8, z: 0.6, parentVal: 26 },
    { val: 38, x: -2.2, y: 1.8, z: 0.1, parentVal: 26 },
    { val: 62, x: 2.2, y: 1.8, z: -0.1, parentVal: 74 },
    { val: 86, x: 7.4, y: 1.8, z: -0.6, parentVal: 74 },
    // Layer 4 (8 leaves)
    { val: 8, x: -8.7, y: -0.6, z: 0.9, parentVal: 14 },
    { val: 20, x: -6.1, y: -0.6, z: 0.4, parentVal: 14 },
    { val: 32, x: -3.5, y: -0.6, z: 0.2, parentVal: 38 },
    { val: 44, x: -0.9, y: -0.6, z: -0.1, parentVal: 38 },
    { val: 56, x: 0.9, y: -0.6, z: 0.1, parentVal: 62 },
    { val: 68, x: 3.5, y: -0.6, z: -0.2, parentVal: 62 },
    { val: 80, x: 6.1, y: -0.6, z: -0.4, parentVal: 86 },
    { val: 92, x: 8.7, y: -0.6, z: -0.9, parentVal: 86 },
  ];

  const mark = (statusMap: Record<number, TreeNode3D['status']>, extra: TreeNode3D[] = []) => [
    ...fullTree.map((n) => ({ ...n, status: statusMap[n.val] || 'normal' })),
    ...extra,
  ];

  return [
    {
      type: 'tree-3d',
      nodes: mark({ 50: 'active' }),
      description: '步骤 1 [4层15节点 BST 检索]：查找目标值 32 并插入 35 — 从第 1 层根节点 50 出发，因 32 < 50 折向左子树',
      metrics: { 树规模: '4 层 / 15 节点', 当前节点: '50 (Layer 1)', 比较方向: '32 < 50 → 左' },
    },
    {
      type: 'tree-3d',
      nodes: mark({ 50: 'balanced', 26: 'active' }),
      description: '步骤 2 [第 2 层路由]：到达节点 26，比較得 32 > 26，排除左子树 {8,14,20}，沿右管道进入节点 38',
      metrics: { 当前节点: '26 (Layer 2)', 比较方向: '32 > 26 → 右', 已排除节点: '11 个' },
    },
    {
      type: 'tree-3d',
      nodes: mark({ 50: 'balanced', 26: 'balanced', 38: 'active' }),
      description: '步骤 3 [第 3 层路由]：到达节点 38，比较得 32 < 38，继续向左下潜至第 4 层叶节点',
      metrics: { 当前节点: '38 (Layer 3)', 比较方向: '32 < 38 → 左', 搜索深度: '3 / 4' },
    },
    {
      type: 'tree-3d',
      nodes: mark(
        { 50: 'balanced', 26: 'balanced', 38: 'balanced', 32: 'active' },
        [{ val: 35, x: -2.6, y: -2.5, z: 0.5, parentVal: 32, status: 'balanced' }]
      ),
      description: '步骤 4 [第 4 层命中 & 第 5 层插入]：精准命中节点 32！同时将新元素 35 挂载为 32 的右孩子（扩展至第 5 层）',
      metrics: { 命中节点: '32 (Layer 4)', 新增挂载: 'Node(35) → Layer 5', 比较耗时: '仅 4 次' },
    },
    {
      type: 'tree-3d',
      nodes: mark({ 26: 'unbalanced', 38: 'active', 32: 'pivot' }),
      rotationArc: { from: [-3.5, -0.6, 0.2], to: [-4.8, 4.1, 0.3], label: '后继节点 32 提拔替换' },
      description: '步骤 5 [Hibbard 节点删除 Delete(26)]：待删节点 26 拥有左右双子树，在右子树中锁定最小中序后继节点 32 向上替换！',
      metrics: { 删除目标: 'Delete(26)', 中序后继: 'Min(Right) = 32', 树结构: '保持 BST 有序性' },
    },
    {
      type: 'tree-3d',
      nodes: fullTree
        .filter((n) => n.val !== 32)
        .map((n) =>
          n.val === 26
            ? { ...n, val: 32, status: 'balanced' }
            : { ...n, parentVal: n.parentVal === 26 ? 32 : n.parentVal, status: 'normal' }
        ),
      description: '步骤 6 [删除替换完成]：后继节点 32 成功接管原 26 的位置与左右子树，全树依然严格满足左 < 根 < 右',
      metrics: { 替换完成: '32 接管 26', 剩余节点: 14, 有序不变量: '左 < 根 < 右 成立' },
    },
    {
      type: 'tree-3d',
      nodes: mark({
        20: 'range',
        26: 'range',
        32: 'range',
        38: 'range',
        44: 'range',
        50: 'range',
        56: 'range',
        62: 'range',
        68: 'range',
        8: 'pruned',
        14: 'pruned',
        74: 'pruned',
        80: 'pruned',
        86: 'pruned',
        92: 'pruned',
      }),
      rangeBox: { minX: -6.6, maxX: 4.1 },
      description: '步骤 7 [三维空间范围查询 Range[20, 68]]：体渲染蓝色包围盒一次性锁定区间内 9 个有序节点，自动剪枝两侧越界子树',
      metrics: { 查询区间: '[20, 68]', 区间命中: '9 个节点', 整枝剪除: '6 个越界节点' },
    },
  ];
}

function renderTree3D(group: THREE.Group, step: VisualizationStep) {
  const nodes: TreeNode3D[] = step.nodes || [];
  const nodeMap = new Map<number, TreeNode3D>();
  nodes.forEach((n) => nodeMap.set(n.val, n));

  if (step.rangeBox) {
    const w = step.rangeBox.maxX - step.rangeBox.minX;
    const cx = (step.rangeBox.maxX + step.rangeBox.minX) / 2;
    const boxGeo = new THREE.BoxGeometry(w, 9.2, 3.4);
    const boxMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.08,
    });
    const box = new THREE.Mesh(boxGeo, boxMat);
    box.position.set(cx, 2.6, 0);
    group.add(box);
  }

  // Draw parent-child edges
  nodes.forEach((n) => {
    if (n.parentVal !== undefined && nodeMap.has(n.parentVal)) {
      const p = nodeMap.get(n.parentVal)!;
      const start = new THREE.Vector3(p.x, p.y, p.z);
      const end = new THREE.Vector3(n.x, n.y, n.z);
      const isPruned = n.status === 'pruned';
      const isHighlighted = n.status && n.status !== 'normal' && !isPruned;
      group.add(
        createGlowingBeam(
          start,
          end,
          isHighlighted ? 0.09 : 0.05,
          isHighlighted ? 0x38bdf8 : isPruned ? 0x1e293b : 0x475569,
          isPruned ? 0.35 : 0.88
        )
      );
    }
  });

  // Draw tree nodes
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
    } else if (n.status === 'pruned') {
      color = 0x334155;
      border = '#475569';
    }

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.56, 28, 28),
      new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: n.status === 'pruned' ? 0.05 : n.status && n.status !== 'normal' ? 0.88 : 0.35,
        metalness: 0.65,
        roughness: 0.2,
        transparent: n.status === 'pruned',
        opacity: n.status === 'pruned' ? 0.45 : 1,
      })
    );
    sphere.position.set(n.x, n.y, n.z);
    group.add(sphere);

    if (n.status === 'pivot' || n.status === 'unbalanced') {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.86, 0.06, 16, 48),
        new THREE.MeshBasicMaterial({ color })
      );
      ring.position.set(n.x, n.y, n.z);
      ring.rotation.x = Math.PI / 2;
      group.add(ring);
    }

    const subText =
      n.bf !== undefined
        ? `BF=${n.bf > 0 ? '+' + n.bf : n.bf}${n.h ? ` h=${n.h}` : ''}`
        : undefined;

    group.add(
      createHudBadge([n.x, n.y + 1.12, n.z], {
        text: `${n.val}`,
        subText,
        borderColor: border,
        scale: subText ? [1.95, 0.92] : [1.45, 0.78],
      })
    );
  });

  if (step.rotationArc) {
    const start = new THREE.Vector3(...step.rotationArc.from);
    const end = new THREE.Vector3(...step.rotationArc.to);
    group.add(createEnergyArc(start, end, 2.2, 0xfbbf24, 0.095, 0.95));

    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    group.add(
      createHudBadge([mid.x, mid.y + 2.55, mid.z], {
        text: step.rotationArc.label,
        borderColor: '#fbbf24',
        scale: [3.2, 0.92],
      })
    );
  }
}

// ============================================================================
// 6. N 皇后回溯棋盘 (6×6 皇家水晶棋盘 + 完整冲突激光线与回溯过程)
// ============================================================================
function genNQueensSteps(): VisualizationStep[] {
  const n = 6;
  // Valid 6-queens solution is [1, 3, 5, 0, 2, 4]
  return [
    {
      type: 'n-queens-board',
      n,
      queens: [
        { r: 0, c: 0, status: 'safe' },
        { r: 1, c: 2, status: 'safe' },
        { r: 2, c: 4, status: 'safe' },
      ],
      conflictRay: null,
      description: '阶段 1 [前向试探]：在 6×6 水晶棋盘前 3 行依次安全放置皇后 Q₀(0,0), Q₁(1,2), Q₂(2,4)',
      metrics: { 棋盘规模: '6×6 (36格)', 当前递归深: 'Row 3 / 6', 回溯次数: 0 },
    },
    {
      type: 'n-queens-board',
      n,
      queens: [
        { r: 0, c: 0, status: 'safe' },
        { r: 1, c: 2, status: 'safe' },
        { r: 2, c: 4, status: 'safe' },
        { r: 3, c: 1, status: 'safe' },
        { r: 4, c: 3, status: 'safe' },
        { r: 5, c: 5, status: 'conflict' },
      ],
      conflictRay: [
        [0, 0],
        [5, 5],
      ],
      description: '阶段 2 [深层主对角线冲突]：推进至最后一行 (5,5) 时，被首行皇后 Q₀(0,0) 的长程主对角激光击中，触发回溯！',
      metrics: { 冲突位置: 'Row 5, Col 5', 攻击源: 'Q₀(0,0) 主对角线', 动作: '触发深层回溯' },
    },
    {
      type: 'n-queens-board',
      n,
      queens: [
        { r: 0, c: 1, status: 'safe' },
        { r: 1, c: 3, status: 'safe' },
        { r: 2, c: 5, status: 'safe' },
        { r: 3, c: 0, status: 'safe' },
      ],
      conflictRay: null,
      description: '阶段 3 [回溯重排首行]：将首行皇后右移至 Q₀(0,1)，随后顺次锁定 Q₁(1,3), Q₂(2,5), Q₃(3,0)',
      metrics: { 首行新分支: 'Q₀ → Col 1', 已安全放置: '4 / 6', 剩余待排: '2 行' },
    },
    {
      type: 'n-queens-board',
      n,
      queens: [
        { r: 0, c: 1, status: 'safe' },
        { r: 1, c: 3, status: 'safe' },
        { r: 2, c: 5, status: 'safe' },
        { r: 3, c: 0, status: 'safe' },
        { r: 4, c: 2, status: 'safe' },
        { r: 5, c: 3, status: 'conflict' },
      ],
      conflictRay: [
        [1, 3],
        [5, 3],
      ],
      description: '阶段 4 [同列激光拦截]：第 4 行放置 Q₄(4,2) 后，第 5 行试探 (5,3) 被 Q₁(1,3) 的纵向激光直接拦截，继续右移',
      metrics: { 试探位置: '(5, 3)', 拦截源: 'Q₁(1,3) 同列冲突', 动作: '右移试探 Col 4' },
    },
    {
      type: 'n-queens-board',
      n,
      queens: [
        { r: 0, c: 1, status: 'solved' },
        { r: 1, c: 3, status: 'solved' },
        { r: 2, c: 5, status: 'solved' },
        { r: 3, c: 0, status: 'solved' },
        { r: 4, c: 2, status: 'solved' },
        { r: 5, c: 4, status: 'solved' },
      ],
      conflictRay: null,
      description: '阶段 5 [6皇后全局完美解]：Q₅(5,4) 落子无任何行/列/斜线冲突！成功锁定 6 皇后对称完美解 [1, 3, 5, 0, 2, 4]',
      metrics: { 完美解向量: '[1, 3, 5, 0, 2, 4]', 皇后总数: '6 / 6 互不攻击', 状态: '全局解达成' },
    },
  ];
}

function renderNQueensBoard(group: THREE.Group, step: VisualizationStep) {
  const n = step.n || 6;
  const tileSize = 1.65;
  const offset = ((n - 1) * tileSize) / 2;

  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      const isDark = (r + c) % 2 === 1;
      const x = c * tileSize - offset;
      const z = r * tileSize - offset;
      const tile = new THREE.Mesh(
        new THREE.BoxGeometry(tileSize * 0.94, 0.28, tileSize * 0.94),
        new THREE.MeshStandardMaterial({
          color: isDark ? 0x1e293b : 0x334155,
          metalness: 0.7,
          roughness: 0.2,
        })
      );
      tile.position.set(x, 0.14, z);
      group.add(tile);
    }
  }

  (step.queens || []).forEach((q: any, idx: number) => {
    const x = q.c * tileSize - offset;
    const z = q.r * tileSize - offset;
    const color =
      q.status === 'conflict'
        ? 0xf43f5e
        : q.status === 'solved'
        ? 0xfbbf24
        : 0x10b981;

    const bodyMat = new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: 0.8,
      metalness: 0.75,
      roughness: 0.18,
    });
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.5, 1.45, 24), bodyMat);
    body.position.set(x, 0.95, z);
    group.add(body);

    const orb = new THREE.Mesh(new THREE.SphereGeometry(0.32, 24, 24), bodyMat);
    orb.position.set(x, 1.85, z);
    group.add(orb);

    group.add(
      createHudBadge([x, 2.7, z], {
        text: `Q${idx}(${q.r},${q.c})`,
        borderColor: q.status === 'conflict' ? '#fb7185' : q.status === 'solved' ? '#fbbf24' : '#34d399',
        scale: [1.85, 0.78],
      })
    );
  });

  if (step.conflictRay) {
    const [[r1, c1], [r2, c2]] = step.conflictRay;
    const p1 = new THREE.Vector3(c1 * tileSize - offset, 1.3, r1 * tileSize - offset);
    const p2 = new THREE.Vector3(c2 * tileSize - offset, 1.3, r2 * tileSize - offset);
    group.add(createGlowingBeam(p1, p2, 0.11, 0xf43f5e, 0.95));
  }
}

// ============================================================================
// 7. 0-1 背包动态规划 (4件宝物 × 容量 0..7 + 最优解回溯链)
// ============================================================================
function genKnapsackDpSteps(): VisualizationStep[] {
  const items = [
    { name: '蓝宝石A', w: 2, v: 3 },
    { name: '黄金盾B', w: 3, v: 4 },
    { name: '龙晶冠C', w: 4, v: 6 },
    { name: '圣光剑D', w: 5, v: 7 },
  ];
  const maxW = 7;
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

      if (w === item.w || w === maxW) {
        steps.push({
          type: 'knapsack-3d',
          items,
          maxW,
          dp: dp.map((row) => [...row]),
          activeCell: [i, w],
          fromSkip: [i - 1, w],
          fromTake: w >= item.w ? [i - 1, w - item.w] : null,
          backtrackChain: null,
          description:
            w >= item.w
              ? `状态转移 dp[${i}][${w}] (${item.name} 重${item.w}价${item.v})：max(不装=${withoutItem}, 装入=dp[${i - 1}][${w - item.w}]+${item.v}=${withItem}) → ${dp[i][w]}`
              : `状态转移 dp[${i}][${w}]：容量 w=${w} < ${item.name}重 ${item.w}，继承上方状态 dp[${i - 1}][${w}] = ${withoutItem}`,
          metrics: {
            当前考察宝物: `${item.name} (w=${item.w},v=${item.v})`,
            当前容量w: w,
            状态极值: `dp[${i}][${w}] = ${dp[i][w]}`,
          },
        });
      }
    }
  }

  // Final step: backtrack optimal items from dp[4][7] = 10 (Items B w=3,v=4 + C w=4,v=6)
  steps.push({
    type: 'knapsack-3d',
    items,
    maxW,
    dp: dp.map((row) => [...row]),
    activeCell: [4, 7],
    fromSkip: null,
    fromTake: null,
    backtrackChain: [
      [4, 7],
      [3, 7],
      [2, 3],
      [1, 0],
    ],
    description: 'DP 最优方案回溯完成！从 dp[4][7]=10 逆向追踪：选中【黄金盾B (w=3,v=4)】+【龙晶冠C (w=4,v=6)】，总重 7、最大总价值 10！',
    metrics: {
      最优组合: '黄金盾B + 龙晶冠C',
      总重量利用: '7 / 7 (100%)',
      全局最大价值: 10,
    },
  });

  return steps;
}

function renderKnapsack3D(group: THREE.Group, step: VisualizationStep) {
  const dp: number[][] = step.dp || [];
  const rows = dp.length;
  const cols = (dp[0] || []).length;
  const spacingX = 1.65;
  const spacingZ = 1.85;
  const offX = ((cols - 1) * spacingX) / 2;
  const offZ = ((rows - 1) * spacingZ) / 2;

  const backtrackSet = new Set<string>(
    (step.backtrackChain || []).map(([r, c]: [number, number]) => `${r},${c}`)
  );

  const cellTop = (r: number, c: number) => {
    const val = dp[r]?.[c] ?? 0;
    const h = 0.35 + val * 0.42;
    return new THREE.Vector3(c * spacingX - offX, h, r * spacingZ - offZ);
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const val = dp[r][c];
      const h = 0.35 + val * 0.42;
      const x = c * spacingX - offX;
      const z = r * spacingZ - offZ;

      const isBacktrack = backtrackSet.has(`${r},${c}`);
      const isActive = step.activeCell && step.activeCell[0] === r && step.activeCell[1] === c;
      const isSkip = step.fromSkip && step.fromSkip[0] === r && step.fromSkip[1] === c;
      const isTake = step.fromTake && step.fromTake[0] === r && step.fromTake[1] === c;

      let color = val === 0 ? 0x334155 : 0x6366f1;
      if (isBacktrack || isActive) color = 0x10b981;
      else if (isTake) color = 0xf59e0b;
      else if (isSkip) color = 0x38bdf8;

      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1.12, h, 1.12),
        new THREE.MeshStandardMaterial({
          color,
          emissive: color,
          emissiveIntensity: isBacktrack || isActive || isTake || isSkip ? 0.85 : 0.25,
          metalness: 0.6,
          roughness: 0.22,
        })
      );
      mesh.position.set(x, h / 2, z);
      group.add(mesh);

      if (val > 0 || isActive) {
        group.add(
          createHudBadge([x, h + 0.58, z], {
            text: `${val}`,
            borderColor: isBacktrack || isActive ? '#10b981' : isTake ? '#fbbf24' : '#818cf8',
            scale: [1.15, 0.58],
          })
        );
      }
    }
  }

  if (step.activeCell && step.fromSkip) {
    const dest = cellTop(step.activeCell[0], step.activeCell[1]);
    const srcSkip = cellTop(step.fromSkip[0], step.fromSkip[1]);
    group.add(createEnergyArc(srcSkip, dest, 1.5, 0x38bdf8, 0.07, 0.9));

    if (step.fromTake) {
      const srcTake = cellTop(step.fromTake[0], step.fromTake[1]);
      group.add(createEnergyArc(srcTake, dest, 1.9, 0xf59e0b, 0.08, 0.95));
    }
  }

  if (Array.isArray(step.backtrackChain) && step.backtrackChain.length > 1) {
    for (let i = 0; i < step.backtrackChain.length - 1; i++) {
      const p1 = cellTop(step.backtrackChain[i][0], step.backtrackChain[i][1]);
      const p2 = cellTop(step.backtrackChain[i + 1][0], step.backtrackChain[i + 1][1]);
      group.add(createEnergyArc(p1, p2, 1.6, 0xfbbf24, 0.09, 0.98));
    }
  }
}

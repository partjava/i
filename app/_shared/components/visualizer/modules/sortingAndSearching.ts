import * as THREE from 'three';
import { VisualizationStep } from '../types';
import { createEnergyArc, createGlowingBeam, createHudBadge } from '../core/HudSpriteCache';

export function generateSortingAndSearchingSteps(
  algorithm: string,
  rawInput: number[]
): VisualizationStep[] {
  const arr = rawInput.length > 0 ? [...rawInput] : [5, 3, 8, 4, 2, 7, 1, 6];

  switch (algorithm) {
    case 'bubble':
      return genBubbleSort(arr);
    case 'quick':
      return genQuickSort(arr);
    case 'merge':
      return genMergeSort(arr);
    case 'heap':
      return genHeapSort(arr);
    case 'insertion':
      return genInsertionSort(arr);
    case 'selection':
      return genSelectionSort(arr);
    case 'binary':
      return genBinarySearch(arr);
    case 'linear':
      return genLinearSearch(arr);
    default:
      return genBubbleSort(arr);
  }
}

function genBubbleSort(input: number[]): VisualizationStep[] {
  const a = [...input];
  const n = a.length;
  const steps: VisualizationStep[] = [];
  let comparisons = 0;
  let swaps = 0;

  steps.push({
    type: 'array-bars',
    subType: 'bubble',
    data: [...a],
    comparing: [],
    swapping: [],
    sorted: [],
    description: `初始化冒泡排序序列 (${n} 个元素)，准备从左向右逐对扫描`,
    metrics: { 比较次数: 0, 交换次数: 0, 已归位: `0/${n}` },
  });

  for (let i = 0; i < n - 1; i++) {
    const sorted = Array.from({ length: i }, (_, k) => n - 1 - k);
    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;
      steps.push({
        type: 'array-bars',
        subType: 'bubble',
        data: [...a],
        comparing: [j, j + 1],
        swapping: [],
        sorted,
        description: `第 ${i + 1} 轮：比较相邻元素 a[${j}]=${a[j]} 与 a[${j + 1}]=${a[j + 1]}`,
        metrics: { 比较次数: comparisons, 交换次数: swaps, 已归位: `${i}/${n}` },
      });

      if (a[j] > a[j + 1]) {
        swaps++;
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        steps.push({
          type: 'array-bars',
          subType: 'bubble',
          data: [...a],
          comparing: [],
          swapping: [j, j + 1],
          sorted,
          description: `逆序交换：将较大值 ${a[j + 1]} 向右浮移至索引 ${j + 1}`,
          metrics: { 比较次数: comparisons, 交换次数: swaps, 已归位: `${i}/${n}` },
        });
      }
    }
  }

  steps.push({
    type: 'array-bars',
    subType: 'bubble',
    data: [...a],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, k) => k),
    description: `冒泡排序完成！共执行 ${comparisons} 次比较、${swaps} 次交换`,
    metrics: { 比较次数: comparisons, 交换次数: swaps, 已归位: `${n}/${n}` },
  });
  return steps;
}

function genQuickSort(input: number[]): VisualizationStep[] {
  const a = [...input];
  const n = a.length;
  const steps: VisualizationStep[] = [];
  const sortedSet = new Set<number>();
  let comparisons = 0;
  let swaps = 0;

  steps.push({
    type: 'array-bars',
    subType: 'quick',
    data: [...a],
    comparing: [],
    swapping: [],
    sorted: [],
    description: `初始化快速排序：采用分治基准划分 (Pivot Partition)`,
    metrics: { 比较次数: 0, 交换次数: 0, 已锁定基准: 0 },
  });

  function partition(low: number, high: number): number {
    const pivot = a[high];
    let i = low - 1;

    steps.push({
      type: 'array-bars',
      subType: 'quick',
      data: [...a],
      comparing: [high],
      swapping: [],
      sorted: Array.from(sortedSet),
      range: [low, high],
      pivotIndex: high,
      description: `分区 [${low}..${high}]：选取右侧元素 a[${high}]=${pivot} 作为基准值 Pivot`,
      metrics: { 基准值: pivot, 区间: `[${low}, ${high}]`, 比较次数: comparisons },
    });

    for (let j = low; j < high; j++) {
      comparisons++;
      steps.push({
        type: 'array-bars',
        subType: 'quick',
        data: [...a],
        comparing: [j, high],
        swapping: [],
        sorted: Array.from(sortedSet),
        range: [low, high],
        pivotIndex: high,
        description: `扫描比较 a[${j}]=${a[j]} 与基准值 ${pivot}`,
        metrics: { 基准值: pivot, 比较次数: comparisons, 交换次数: swaps },
      });

      if (a[j] < pivot) {
        i++;
        if (i !== j) {
          swaps++;
          [a[i], a[j]] = [a[j], a[i]];
          steps.push({
            type: 'array-bars',
            subType: 'quick',
            data: [...a],
            comparing: [high],
            swapping: [i, j],
            sorted: Array.from(sortedSet),
            range: [low, high],
            pivotIndex: high,
            description: `a[${j}] < ${pivot}，交换索引 ${i} 与 ${j} 扩充左半小于区`,
            metrics: { 基准值: pivot, 比较次数: comparisons, 交换次数: swaps },
          });
        }
      }
    }

    if (i + 1 !== high) {
      swaps++;
      [a[i + 1], a[high]] = [a[high], a[i + 1]];
    }
    sortedSet.add(i + 1);
    steps.push({
      type: 'array-bars',
      subType: 'quick',
      data: [...a],
      comparing: [],
      swapping: [i + 1, high],
      sorted: Array.from(sortedSet),
      range: [low, high],
      pivotIndex: i + 1,
      description: `基准值 ${pivot} 归位至最终索引 ${i + 1}（左侧全小、右侧全大）`,
      metrics: { 基准归位: i + 1, 比较次数: comparisons, 交换次数: swaps },
    });
    return i + 1;
  }

  function sort(low: number, high: number) {
    if (low < high) {
      const pi = partition(low, high);
      sort(low, pi - 1);
      sort(pi + 1, high);
    } else if (low === high) {
      sortedSet.add(low);
    }
  }

  sort(0, n - 1);

  steps.push({
    type: 'array-bars',
    subType: 'quick',
    data: [...a],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, k) => k),
    description: `快速排序全部递归分区完成！共比较 ${comparisons} 次，交换 ${swaps} 次`,
    metrics: { 比较次数: comparisons, 交换次数: swaps, 状态: '全部有序' },
  });

  return steps;
}

function genMergeSort(input: number[]): VisualizationStep[] {
  const a = [...input];
  const n = a.length;
  const steps: VisualizationStep[] = [];
  let ops = 0;

  steps.push({
    type: 'array-bars',
    subType: 'merge',
    data: [...a],
    comparing: [],
    swapping: [],
    sorted: [],
    description: `初始化归并排序：自顶向下折半拆分，自底向上有序合并`,
    metrics: { 序列长度: n, 归并写入: 0 },
  });

  function mergeSort(l: number, r: number) {
    if (l >= r) return;
    const m = Math.floor((l + r) / 2);
    mergeSort(l, m);
    mergeSort(m + 1, r);

    const left = a.slice(l, m + 1);
    const right = a.slice(m + 1, r + 1);
    let i = 0,
      j = 0,
      k = l;

    steps.push({
      type: 'array-bars',
      subType: 'merge',
      data: [...a],
      comparing: [l, r],
      swapping: [],
      sorted: [],
      range: [l, r],
      description: `准备归并左子区间 [${l}..${m}] 与右子区间 [${m + 1}..${r}]`,
      metrics: { 左区间: `[${l},${m}]`, 右区间: `[${m + 1},${r}]`, 归并写入: ops },
    });

    while (i < left.length && j < right.length) {
      ops++;
      if (left[i] <= right[j]) {
        a[k] = left[i++];
      } else {
        a[k] = right[j++];
      }
      steps.push({
        type: 'array-bars',
        subType: 'merge',
        data: [...a],
        comparing: [l + i - 1, m + 1 + j - 1].filter((idx) => idx >= l && idx <= r),
        swapping: [k],
        sorted: [],
        range: [l, r],
        description: `双指针择小写入位置 a[${k}] = ${a[k]}`,
        metrics: { 当前写入索引: k, 写入值: a[k], 归并写入: ops },
      });
      k++;
    }

    while (i < left.length) {
      ops++;
      a[k] = left[i++];
      steps.push({
        type: 'array-bars',
        subType: 'merge',
        data: [...a],
        comparing: [],
        swapping: [k],
        sorted: [],
        range: [l, r],
        description: `追加左半剩余有序元素 a[${k}] = ${a[k]}`,
        metrics: { 当前写入索引: k, 写入值: a[k], 归并写入: ops },
      });
      k++;
    }

    while (j < right.length) {
      ops++;
      a[k] = right[j++];
      steps.push({
        type: 'array-bars',
        subType: 'merge',
        data: [...a],
        comparing: [],
        swapping: [k],
        sorted: [],
        range: [l, r],
        description: `追加右半剩余有序元素 a[${k}] = ${a[k]}`,
        metrics: { 当前写入索引: k, 写入值: a[k], 归并写入: ops },
      });
      k++;
    }
  }

  mergeSort(0, n - 1);

  steps.push({
    type: 'array-bars',
    subType: 'merge',
    data: [...a],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, idx) => idx),
    description: `归并排序完成！整体区间 [0..${n - 1}] 已稳定归并有序`,
    metrics: { 序列长度: n, 归并写入: ops, 稳定性: '稳定' },
  });

  return steps;
}

function genHeapSort(input: number[]): VisualizationStep[] {
  const a = [...input];
  const n = a.length;
  const steps: VisualizationStep[] = [];
  const sorted: number[] = [];
  let swaps = 0;

  steps.push({
    type: 'array-bars',
    subType: 'heap',
    data: [...a],
    comparing: [],
    swapping: [],
    sorted: [],
    heapSize: n,
    description: `初始化堆排序：先将无序序列原地调整为大顶堆 (Max-Heap)`,
    metrics: { 堆大小: n, 交换次数: 0, 阶段: '建堆阶段' },
  });

  function heapify(size: number, root: number, phase: string) {
    let largest = root;
    const left = 2 * root + 1;
    const right = 2 * root + 2;

    if (left < size) {
      steps.push({
        type: 'array-bars',
        subType: 'heap',
        data: [...a],
        comparing: [largest, left],
        swapping: [],
        sorted: [...sorted],
        heapSize: size,
        description: `${phase}：比较父节点 a[${root}]=${a[root]} 与左孩子 a[${left}]=${a[left]}`,
        metrics: { 堆大小: size, 父节点: root, 交换次数: swaps },
      });
      if (a[left] > a[largest]) largest = left;
    }

    if (right < size) {
      steps.push({
        type: 'array-bars',
        subType: 'heap',
        data: [...a],
        comparing: [largest, right],
        swapping: [],
        sorted: [...sorted],
        heapSize: size,
        description: `${phase}：比较当前最大候选 a[${largest}]=${a[largest]} 与右孩子 a[${right}]=${a[right]}`,
        metrics: { 堆大小: size, 最大候选: largest, 交换次数: swaps },
      });
      if (a[right] > a[largest]) largest = right;
    }

    if (largest !== root) {
      swaps++;
      [a[root], a[largest]] = [a[largest], a[root]];
      steps.push({
        type: 'array-bars',
        subType: 'heap',
        data: [...a],
        comparing: [],
        swapping: [root, largest],
        sorted: [...sorted],
        heapSize: size,
        description: `下滤调整：交换父节点 a[${root}] 与子节点 a[${largest}] 维护大顶堆性质`,
        metrics: { 堆大小: size, 交换次数: swaps, 阶段: phase },
      });
      heapify(size, largest, phase);
    }
  }

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i, '自底向上建堆');
  }

  for (let i = n - 1; i > 0; i--) {
    swaps++;
    [a[0], a[i]] = [a[i], a[0]];
    sorted.push(i);
    steps.push({
      type: 'array-bars',
      subType: 'heap',
      data: [...a],
      comparing: [],
      swapping: [0, i],
      sorted: [...sorted],
      heapSize: i,
      description: `弹出堆顶最大值 ${a[i]} 与末尾索引 ${i} 交换并锁定归位`,
      metrics: { 堆顶弹出值: a[i], 剩余堆大小: i, 交换次数: swaps },
    });
    heapify(i, 0, '下滤重建堆');
  }

  sorted.push(0);
  steps.push({
    type: 'array-bars',
    subType: 'heap',
    data: [...a],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, k) => k),
    heapSize: 0,
    description: `堆排序完成！所有元素均通过大顶堆原地弹出归位`,
    metrics: { 堆大小: 0, 交换次数: swaps, 状态: '完成' },
  });

  return steps;
}

function genInsertionSort(input: number[]): VisualizationStep[] {
  const a = [...input];
  const n = a.length;
  const steps: VisualizationStep[] = [];
  let shifts = 0;

  steps.push({
    type: 'array-bars',
    subType: 'insertion',
    data: [...a],
    comparing: [],
    swapping: [],
    sorted: [0],
    description: `初始化插入排序：默认首元素 a[0]=${a[0]} 构成初始有序区`,
    metrics: { 有序区长度: 1, 平移次数: 0 },
  });

  for (let i = 1; i < n; i++) {
    const key = a[i];
    let j = i - 1;

    steps.push({
      type: 'array-bars',
      subType: 'insertion',
      data: [...a],
      comparing: [i],
      swapping: [],
      sorted: Array.from({ length: i }, (_, k) => k),
      description: `提取待插入牌 a[${i}]=${key}，向左扫描有序区 [0..${i - 1}]`,
      metrics: { 待插元素: key, 有序区长度: i, 平移次数: shifts },
    });

    while (j >= 0 && a[j] > key) {
      shifts++;
      a[j + 1] = a[j];
      steps.push({
        type: 'array-bars',
        subType: 'insertion',
        data: [...a],
        comparing: [j],
        swapping: [j, j + 1],
        sorted: Array.from({ length: i }, (_, k) => k),
        description: `a[${j}]=${a[j]} > ${key}，向右平移至索引 ${j + 1}`,
        metrics: { 待插元素: key, 扫描位置: j, 平移次数: shifts },
      });
      j--;
    }

    a[j + 1] = key;
    steps.push({
      type: 'array-bars',
      subType: 'insertion',
      data: [...a],
      comparing: [],
      swapping: [j + 1],
      sorted: Array.from({ length: i + 1 }, (_, k) => k),
      description: `将元素 ${key} 插入至有序区正确位置索引 ${j + 1}`,
      metrics: { 插入位置: j + 1, 有序区长度: i + 1, 平移次数: shifts },
    });
  }

  steps.push({
    type: 'array-bars',
    subType: 'insertion',
    data: [...a],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, k) => k),
    description: `插入排序完成！全序列已构建为完整有序序列`,
    metrics: { 有序区长度: n, 平移次数: shifts, 状态: '完成' },
  });
  return steps;
}

function genSelectionSort(input: number[]): VisualizationStep[] {
  const a = [...input];
  const n = a.length;
  const steps: VisualizationStep[] = [];
  let comparisons = 0;

  steps.push({
    type: 'array-bars',
    subType: 'selection',
    data: [...a],
    comparing: [],
    swapping: [],
    sorted: [],
    description: `初始化选择排序：每轮扫描未排序区挑选最小值归位`,
    metrics: { 比较次数: 0, 已归位: `0/${n}` },
  });

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    const sorted = Array.from({ length: i }, (_, k) => k);

    for (let j = i + 1; j < n; j++) {
      comparisons++;
      steps.push({
        type: 'array-bars',
        subType: 'selection',
        data: [...a],
        comparing: [minIdx, j],
        swapping: [],
        sorted,
        description: `第 ${i + 1} 轮：比较当前最小值 a[${minIdx}]=${a[minIdx]} 与候选 a[${j}]=${a[j]}`,
        metrics: { 当前最小索引: minIdx, 当前最小值: a[minIdx], 比较次数: comparisons },
      });
      if (a[j] < a[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      [a[i], a[minIdx]] = [a[minIdx], a[i]];
    }
    steps.push({
      type: 'array-bars',
      subType: 'selection',
      data: [...a],
      comparing: [],
      swapping: minIdx !== i ? [i, minIdx] : [i],
      sorted: Array.from({ length: i + 1 }, (_, k) => k),
      description: `将本轮最小值 ${a[i]} 交换锁定至前端位置 a[${i}]`,
      metrics: { 归位值: a[i], 比较次数: comparisons, 已归位: `${i + 1}/${n}` },
    });
  }

  steps.push({
    type: 'array-bars',
    subType: 'selection',
    data: [...a],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, k) => k),
    description: `选择排序完成！共比较 ${comparisons} 次，仅执行 O(n) 次交换`,
    metrics: { 比较次数: comparisons, 已归位: `${n}/${n}`, 状态: '完成' },
  });
  return steps;
}

function genBinarySearch(input: number[]): VisualizationStep[] {
  const a = [...input].sort((x, y) => x - y);
  const n = a.length;
  const targetIdx = Math.max(0, Math.min(n - 1, Math.floor(n * 0.68)));
  const target = a[targetIdx];
  const steps: VisualizationStep[] = [];

  let left = 0;
  let right = n - 1;
  let round = 0;

  steps.push({
    type: 'array-bars',
    subType: 'binary',
    data: [...a],
    comparing: [],
    swapping: [],
    sorted: [],
    range: [left, right],
    target,
    description: `二分查找需先保证单调有序，目标检索值 Target = ${target}`,
    metrics: { 目标值: target, 左边界L: left, 右边界R: right },
  });

  while (left <= right) {
    round++;
    const mid = Math.floor((left + right) / 2);
    steps.push({
      type: 'array-bars',
      subType: 'binary',
      data: [...a],
      comparing: [mid],
      swapping: [],
      sorted: [],
      range: [left, right],
      midIndex: mid,
      target,
      description: `第 ${round} 次折半：区间 [${left}..${right}]，中点 mid=${mid} (a[${mid}]=${a[mid]})`,
      metrics: { 目标值: target, 区间: `[${left}, ${right}]`, 中点值: a[mid] },
    });

    if (a[mid] === target) {
      steps.push({
        type: 'array-bars',
        subType: 'binary',
        data: [...a],
        comparing: [],
        swapping: [],
        sorted: [mid],
        range: [mid, mid],
        midIndex: mid,
        target,
        description: `命中目标！a[${mid}] == ${target}，仅耗时 ${round} 次折半探测`,
        metrics: { 命中索引: mid, 目标值: target, 探测轮数: round },
      });
      break;
    } else if (a[mid] < target) {
      left = mid + 1;
      steps.push({
        type: 'array-bars',
        subType: 'binary',
        data: [...a],
        comparing: [],
        swapping: [],
        sorted: [],
        range: [left, right],
        target,
        description: `a[${mid}]=${a[mid]} < ${target}，剪枝左半部，左边界收缩至 L = ${left}`,
        metrics: { 目标值: target, 新区间: `[${left}, ${right}]`, 探测轮数: round },
      });
    } else {
      right = mid - 1;
      steps.push({
        type: 'array-bars',
        subType: 'binary',
        data: [...a],
        comparing: [],
        swapping: [],
        sorted: [],
        range: [left, right],
        target,
        description: `a[${mid}]=${a[mid]} > ${target}，剪枝右半部，右边界收缩至 R = ${right}`,
        metrics: { 目标值: target, 新区间: `[${left}, ${right}]`, 探测轮数: round },
      });
    }
  }

  return steps;
}

function genLinearSearch(input: number[]): VisualizationStep[] {
  const a = [...input];
  const n = a.length;
  const targetIdx = Math.max(0, Math.min(n - 1, Math.floor(n * 0.65)));
  const target = a[targetIdx];
  const steps: VisualizationStep[] = [];

  steps.push({
    type: 'array-bars',
    subType: 'linear',
    data: [...a],
    comparing: [],
    swapping: [],
    sorted: [],
    target,
    description: `线性查找：在无序序列中从索引 0 开始逐个寻找目标值 Target = ${target}`,
    metrics: { 目标值: target, 当前索引: '-', 已扫描: 0 },
  });

  for (let i = 0; i < n; i++) {
    steps.push({
      type: 'array-bars',
      subType: 'linear',
      data: [...a],
      comparing: [i],
      swapping: [],
      sorted: [],
      range: [i, n - 1],
      target,
      description: `探测索引 ${i}：检验 a[${i}]=${a[i]} 是否等于目标值 ${target}`,
      metrics: { 目标值: target, 当前索引: i, 已扫描: i + 1 },
    });

    if (a[i] === target) {
      steps.push({
        type: 'array-bars',
        subType: 'linear',
        data: [...a],
        comparing: [],
        swapping: [],
        sorted: [i],
        range: [i, i],
        target,
        description: `查找成功！在索引 ${i} 处命中目标值 ${target}（共扫描 ${i + 1} 个元素）`,
        metrics: { 命中索引: i, 目标值: target, 扫描次数: i + 1 },
      });
      break;
    }
  }

  return steps;
}

/**
 * Renders 3D Pillars for Sorting & Searching with overhead comparison laser arcs,
 * search range window boxes, and heap parent-child beams.
 */
export function renderSortingAndSearching(
  group: THREE.Group,
  step: VisualizationStep
) {
  const data: number[] = step.data || [];
  const n = data.length;
  if (n === 0) return;

  const maxValue = Math.max(...data, 1);
  const spacing = Math.min(2.1, 17.5 / Math.max(n, 1));
  const barRadius = Math.min(0.55, spacing * 0.34);
  const totalWidth = (n - 1) * spacing;
  const maxHeight = 6.2;

  // 1. Obsidian stage platform
  const stageGeo = new THREE.BoxGeometry(totalWidth + 4.5, 0.28, 5.2);
  const stageMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    metalness: 0.75,
    roughness: 0.25,
  });
  const stage = new THREE.Mesh(stageGeo, stageMat);
  stage.position.set(0, -0.14, 0);
  stage.receiveShadow = true;
  group.add(stage);

  // Subtle active range box for binary search / quick sort / merge sort
  if (Array.isArray(step.range) && step.range.length === 2) {
    const [rStart, rEnd] = step.range;
    if (rStart <= rEnd && rStart >= 0 && rEnd < n) {
      const x1 = rStart * spacing - totalWidth / 2;
      const x2 = rEnd * spacing - totalWidth / 2;
      const boxW = Math.max(x2 - x1 + spacing * 0.9, spacing * 0.9);
      const rangeGeo = new THREE.BoxGeometry(boxW, maxHeight + 1.2, 2.2);
      const rangeMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.06,
        wireframe: false,
      });
      const rangeMesh = new THREE.Mesh(rangeGeo, rangeMat);
      rangeMesh.position.set((x1 + x2) / 2, (maxHeight + 1.2) / 2, 0);
      group.add(rangeMesh);

      const edges = new THREE.EdgesGeometry(rangeGeo);
      const line = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.32 })
      );
      line.position.copy(rangeMesh.position);
      group.add(line);
    }
  }

  const topPositions: THREE.Vector3[] = [];

  data.forEach((value, idx) => {
    const height = Math.max(0.55, (value / maxValue) * maxHeight);
    const x = idx * spacing - totalWidth / 2;
    topPositions.push(new THREE.Vector3(x, height, 0));

    const isSorted = step.sorted?.includes(idx);
    const isSwapping = step.swapping?.includes(idx);
    const isComparing = step.comparing?.includes(idx);
    const isExcluded =
      (step.subType === 'binary' || step.subType === 'linear') &&
      Array.isArray(step.range) &&
      (idx < step.range[0] || idx > step.range[1]) &&
      !isSorted;

    let colorHex = 0x6366f1;
    let badgeBorder = '#818cf8';
    let emissiveIntensity = 0.25;

    if (isSorted) {
      colorHex = 0x10b981;
      badgeBorder = '#34d399';
      emissiveIntensity = 0.65;
    } else if (isSwapping) {
      colorHex = 0xf43f5e;
      badgeBorder = '#fb7185';
      emissiveIntensity = 0.8;
    } else if (isComparing) {
      colorHex = 0xf59e0b;
      badgeBorder = '#fbbf24';
      emissiveIntensity = 0.75;
    } else if (isExcluded) {
      colorHex = 0x334155;
      badgeBorder = '#475569';
      emissiveIntensity = 0.05;
    } else if (
      step.subType === 'binary' &&
      Array.isArray(step.range) &&
      idx >= step.range[0] &&
      idx <= step.range[1]
    ) {
      colorHex = 0x0ea5e9;
      badgeBorder = '#38bdf8';
      emissiveIntensity = 0.4;
    }

    // Main cylinder pillar
    const barGeo = new THREE.CylinderGeometry(barRadius * 0.9, barRadius, height, 24);
    const barMat = new THREE.MeshStandardMaterial({
      color: colorHex,
      emissive: colorHex,
      emissiveIntensity,
      metalness: 0.55,
      roughness: 0.22,
      transparent: isExcluded,
      opacity: isExcluded ? 0.45 : 0.96,
    });
    const bar = new THREE.Mesh(barGeo, barMat);
    bar.position.set(x, height / 2, 0);
    bar.castShadow = true;
    bar.receiveShadow = true;
    if (isComparing || isSwapping) {
      bar.userData.pulseGlow = true;
      bar.userData.baseEmissive = emissiveIntensity;
      bar.userData.phaseOffset = idx * 0.7;
    }
    group.add(bar);

    // Glowing top cap disc
    const capGeo = new THREE.CylinderGeometry(barRadius * 0.92, barRadius * 0.92, 0.1, 24);
    const capMat = new THREE.MeshBasicMaterial({
      color: isComparing || isSwapping || isSorted ? 0xffffff : colorHex,
    });
    const cap = new THREE.Mesh(capGeo, capMat);
    cap.position.set(x, height + 0.05, 0);
    group.add(cap);

    // Base halo ring
    const ringGeo = new THREE.RingGeometry(barRadius * 1.05, barRadius * 1.4, 24);
    const ringMat = new THREE.MeshBasicMaterial({
      color: colorHex,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: isComparing || isSwapping || isSorted ? 0.75 : 0.25,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(x, 0.02, 0);
    group.add(ring);

    // Top value badge
    const subLabel =
      step.pivotIndex === idx
        ? 'PIVOT'
        : step.midIndex === idx
        ? 'MID'
        : `[${idx}]`;

    const badge = createHudBadge([x, height + 0.82, 0], {
      text: `${value}`,
      subText: subLabel,
      borderColor: badgeBorder,
      scale: [1.55, 0.78],
    });
    group.add(badge);
  });

  // 2. Overhead energy arc connecting active comparing/swapping pairs
  const activeIndices: number[] =
    step.swapping?.length === 2
      ? step.swapping
      : step.comparing?.length === 2
      ? step.comparing
      : [];

  if (activeIndices.length === 2) {
    const [i1, i2] = activeIndices;
    if (topPositions[i1] && topPositions[i2]) {
      const arcColor = step.swapping?.length === 2 ? 0xf43f5e : 0xfbbf24;
      const start = topPositions[i1].clone().add(new THREE.Vector3(0, 0.15, 0));
      const end = topPositions[i2].clone().add(new THREE.Vector3(0, 0.15, 0));
      const arc = createEnergyArc(start, end, 1.6, arcColor, 0.075, 0.92);
      group.add(arc);
    }
  }

  // 3. For Heap Sort: draw binary tree parent-child links in the active heap
  if (step.subType === 'heap' && typeof step.heapSize === 'number') {
    for (let i = 0; i < step.heapSize; i++) {
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      if (left < step.heapSize && topPositions[i] && topPositions[left]) {
        const beam = createEnergyArc(
          topPositions[i],
          topPositions[left],
          0.8,
          0x38bdf8,
          0.03,
          0.35
        );
        group.add(beam);
      }
      if (right < step.heapSize && topPositions[i] && topPositions[right]) {
        const beam = createEnergyArc(
          topPositions[i],
          topPositions[right],
          0.8,
          0x38bdf8,
          0.03,
          0.35
        );
        group.add(beam);
      }
    }
  }
}

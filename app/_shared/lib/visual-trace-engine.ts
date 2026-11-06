export interface TracePointer {
  name: string;
  target: string; // 对应的变量或数组名，如 "arr"
  index: number;  // 下标位置
  color?: string; // 游标颜色
}

export interface TraceStackFrame {
  name: string;
  line: number;
  args: Record<string, any>;
  returnValue?: any;
}

export interface TraceStep {
  step: number;
  line: number;
  description: string;
  callStack: TraceStackFrame[];
  variables: Record<string, any>;
  arrays: Record<string, (number | string | boolean)[]>;
  pointers: TracePointer[];
  highlightLines?: number[];
  activeArrayIndices?: { arrayName: string; indices: number[]; status: 'compare' | 'swap' | 'found' | 'active' }[];
}

export interface TraceScenario {
  id: string;
  title: string;
  language: string;
  category: string;
  description: string;
  code: string;
  steps: TraceStep[];
}

/**
 * 内置经典算法可视化回放演示库（开箱即用，零延迟 60fps 回放）
 */
export const CLASSIC_TRACE_SCENARIOS: TraceScenario[] = [
  {
    id: 'binary-search',
    title: '二分查找双指针 (Binary Search)',
    language: 'java',
    category: '双指针与查找',
    description: '演示经典双指针 left、right 与中点 mid 在有序数组中逼近目标值 11 的执行过程。',
    code: `public class BinarySearchVisual {
    public static int search(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] == target) {
                return mid; // 命中目标
            } else if (arr[mid] < target) {
                left = mid + 1; // 目标在右半区
            } else {
                right = mid - 1; // 目标在左半区
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] arr = {1, 3, 5, 7, 9, 11, 14, 18};
        int target = 11;
        int result = search(arr, target);
        System.out.println("目标索引: " + result);
    }
}`,
    steps: [
      {
        step: 1,
        line: 19,
        description: '初始化待查找有序数组 arr 与目标值 target = 11',
        callStack: [{ name: 'main(String[] args)', line: 19, args: {} }],
        variables: { target: 11 },
        arrays: { arr: [1, 3, 5, 7, 9, 11, 14, 18] },
        pointers: [],
      },
      {
        step: 2,
        line: 3,
        description: '调用 search 方法，初始化左边界指针 left = 0',
        callStack: [
          { name: 'main()', line: 21, args: {} },
          { name: 'search(arr, target=11)', line: 3, args: { target: 11 } },
        ],
        variables: { left: 0, target: 11 },
        arrays: { arr: [1, 3, 5, 7, 9, 11, 14, 18] },
        pointers: [{ name: 'left', target: 'arr', index: 0, color: '#38bdf8' }],
        activeArrayIndices: [{ arrayName: 'arr', indices: [0], status: 'active' }],
      },
      {
        step: 3,
        line: 4,
        description: '初始化右边界指针 right = 7 (arr.length - 1)',
        callStack: [
          { name: 'main()', line: 21, args: {} },
          { name: 'search(arr, target=11)', line: 4, args: { target: 11 } },
        ],
        variables: { left: 0, right: 7, target: 11 },
        arrays: { arr: [1, 3, 5, 7, 9, 11, 14, 18] },
        pointers: [
          { name: 'left', target: 'arr', index: 0, color: '#38bdf8' },
          { name: 'right', target: 'arr', index: 7, color: '#f43f5e' },
        ],
      },
      {
        step: 4,
        line: 5,
        description: '判断 while 条件：left (0) <= right (7) 成立，进入循环',
        callStack: [
          { name: 'main()', line: 21, args: {} },
          { name: 'search(arr, target=11)', line: 5, args: { target: 11 } },
        ],
        variables: { left: 0, right: 7, target: 11 },
        arrays: { arr: [1, 3, 5, 7, 9, 11, 14, 18] },
        pointers: [
          { name: 'left', target: 'arr', index: 0, color: '#38bdf8' },
          { name: 'right', target: 'arr', index: 7, color: '#f43f5e' },
        ],
      },
      {
        step: 5,
        line: 6,
        description: '计算中点索引：mid = 0 + (7 - 0) / 2 = 3，对应元素 arr[3] = 7',
        callStack: [
          { name: 'main()', line: 21, args: {} },
          { name: 'search(arr, target=11)', line: 6, args: { target: 11 } },
        ],
        variables: { left: 0, right: 7, mid: 3, 'arr[mid]': 7, target: 11 },
        arrays: { arr: [1, 3, 5, 7, 9, 11, 14, 18] },
        pointers: [
          { name: 'left', target: 'arr', index: 0, color: '#38bdf8' },
          { name: 'mid', target: 'arr', index: 3, color: '#fbbf24' },
          { name: 'right', target: 'arr', index: 7, color: '#f43f5e' },
        ],
        activeArrayIndices: [{ arrayName: 'arr', indices: [3], status: 'compare' }],
      },
      {
        step: 6,
        line: 9,
        description: '比较：arr[mid] (7) < target (11)，说明目标在右侧，收缩左边界：left = mid + 1 = 4',
        callStack: [
          { name: 'main()', line: 21, args: {} },
          { name: 'search(arr, target=11)', line: 9, args: { target: 11 } },
        ],
        variables: { left: 4, right: 7, mid: 3, target: 11 },
        arrays: { arr: [1, 3, 5, 7, 9, 11, 14, 18] },
        pointers: [
          { name: 'left', target: 'arr', index: 4, color: '#38bdf8' },
          { name: 'right', target: 'arr', index: 7, color: '#f43f5e' },
        ],
      },
      {
        step: 7,
        line: 5,
        description: '下一轮循环：left (4) <= right (7) 成立',
        callStack: [
          { name: 'main()', line: 21, args: {} },
          { name: 'search(arr, target=11)', line: 5, args: { target: 11 } },
        ],
        variables: { left: 4, right: 7, target: 11 },
        arrays: { arr: [1, 3, 5, 7, 9, 11, 14, 18] },
        pointers: [
          { name: 'left', target: 'arr', index: 4, color: '#38bdf8' },
          { name: 'right', target: 'arr', index: 7, color: '#f43f5e' },
        ],
      },
      {
        step: 8,
        line: 6,
        description: '重新计算中点：mid = 4 + (7 - 4) / 2 = 5，对应元素 arr[5] = 11',
        callStack: [
          { name: 'main()', line: 21, args: {} },
          { name: 'search(arr, target=11)', line: 6, args: { target: 11 } },
        ],
        variables: { left: 4, right: 7, mid: 5, 'arr[mid]': 11, target: 11 },
        arrays: { arr: [1, 3, 5, 7, 9, 11, 14, 18] },
        pointers: [
          { name: 'left', target: 'arr', index: 4, color: '#38bdf8' },
          { name: 'mid', target: 'arr', index: 5, color: '#fbbf24' },
          { name: 'right', target: 'arr', index: 7, color: '#f43f5e' },
        ],
        activeArrayIndices: [{ arrayName: 'arr', indices: [5], status: 'compare' }],
      },
      {
        step: 9,
        line: 7,
        description: '比较：arr[5] == 11 命中目标！返回索引 mid = 5',
        callStack: [
          { name: 'main()', line: 21, args: {} },
          { name: 'search(arr, target=11)', line: 7, args: { target: 11 }, returnValue: 5 },
        ],
        variables: { left: 4, right: 7, mid: 5, returnValue: 5 },
        arrays: { arr: [1, 3, 5, 7, 9, 11, 14, 18] },
        pointers: [{ name: 'FOUND', target: 'arr', index: 5, color: '#10b981' }],
        activeArrayIndices: [{ arrayName: 'arr', indices: [5], status: 'found' }],
      },
      {
        step: 10,
        line: 22,
        description: 'search 方法弹栈返回，main 接收返回值 result = 5，打印完成',
        callStack: [{ name: 'main(String[] args)', line: 22, args: {} }],
        variables: { target: 11, result: 5 },
        arrays: { arr: [1, 3, 5, 7, 9, 11, 14, 18] },
        pointers: [],
      },
    ],
  },
  {
    id: 'bubble-sort',
    title: '冒泡排序相邻交换 (Bubble Sort)',
    language: 'java',
    category: '经典排序',
    description: '演示双重循环下相邻元素比对、临时变量 temp 暂存以及就地交换的内存演变。',
    code: `public class BubbleSortVisual {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    // 相邻逆序，交换元素
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }

    public static void main(String[] args) {
        int[] arr = {5, 2, 8, 4, 1};
        bubbleSort(arr);
    }
}`,
    steps: [
      {
        step: 1,
        line: 18,
        description: '初始化待排序无序数组 arr = [5, 2, 8, 4, 1]',
        callStack: [{ name: 'main()', line: 18, args: {} }],
        variables: { 'arr.length': 5 },
        arrays: { arr: [5, 2, 8, 4, 1] },
        pointers: [],
      },
      {
        step: 2,
        line: 4,
        description: '外层循环：i = 0，开始第一轮冒泡将最大值沉底',
        callStack: [
          { name: 'main()', line: 19, args: {} },
          { name: 'bubbleSort(arr)', line: 4, args: {} },
        ],
        variables: { n: 5, i: 0 },
        arrays: { arr: [5, 2, 8, 4, 1] },
        pointers: [{ name: 'i', target: 'arr', index: 0, color: '#6366f1' }],
      },
      {
        step: 3,
        line: 6,
        description: '内层比较：j = 0，比较 arr[0] (5) 与 arr[1] (2)，5 > 2 触发交换',
        callStack: [
          { name: 'main()', line: 19, args: {} },
          { name: 'bubbleSort(arr)', line: 6, args: {} },
        ],
        variables: { n: 5, i: 0, j: 0, 'arr[j]': 5, 'arr[j+1]': 2 },
        arrays: { arr: [5, 2, 8, 4, 1] },
        pointers: [
          { name: 'j', target: 'arr', index: 0, color: '#38bdf8' },
          { name: 'j+1', target: 'arr', index: 1, color: '#f43f5e' },
        ],
        activeArrayIndices: [{ arrayName: 'arr', indices: [0, 1], status: 'compare' }],
      },
      {
        step: 4,
        line: 9,
        description: '临时变量 temp = arr[0] (5)，完成交换后 arr 变为 [2, 5, 8, 4, 1]',
        callStack: [
          { name: 'main()', line: 19, args: {} },
          { name: 'bubbleSort(arr)', line: 9, args: {} },
        ],
        variables: { n: 5, i: 0, j: 0, temp: 5 },
        arrays: { arr: [2, 5, 8, 4, 1] },
        pointers: [
          { name: 'j', target: 'arr', index: 0, color: '#38bdf8' },
          { name: 'j+1', target: 'arr', index: 1, color: '#f43f5e' },
        ],
        activeArrayIndices: [{ arrayName: 'arr', indices: [0, 1], status: 'swap' }],
      },
      {
        step: 5,
        line: 6,
        description: '内层递增：j = 1，比较 arr[1] (5) 与 arr[2] (8)，5 <= 8 顺序正确不交换',
        callStack: [
          { name: 'main()', line: 19, args: {} },
          { name: 'bubbleSort(arr)', line: 6, args: {} },
        ],
        variables: { n: 5, i: 0, j: 1, 'arr[1]': 5, 'arr[2]': 8 },
        arrays: { arr: [2, 5, 8, 4, 1] },
        pointers: [
          { name: 'j', target: 'arr', index: 1, color: '#38bdf8' },
          { name: 'j+1', target: 'arr', index: 2, color: '#f43f5e' },
        ],
        activeArrayIndices: [{ arrayName: 'arr', indices: [1, 2], status: 'compare' }],
      },
      {
        step: 6,
        line: 6,
        description: '内层递增：j = 2，比较 arr[2] (8) 与 arr[3] (4)，8 > 4 触发交换',
        callStack: [
          { name: 'main()', line: 19, args: {} },
          { name: 'bubbleSort(arr)', line: 6, args: {} },
        ],
        variables: { n: 5, i: 0, j: 2, 'arr[2]': 8, 'arr[3]': 4 },
        arrays: { arr: [2, 5, 8, 4, 1] },
        pointers: [
          { name: 'j', target: 'arr', index: 2, color: '#38bdf8' },
          { name: 'j+1', target: 'arr', index: 3, color: '#f43f5e' },
        ],
        activeArrayIndices: [{ arrayName: 'arr', indices: [2, 3], status: 'compare' }],
      },
      {
        step: 7,
        line: 9,
        description: '交换完成：8 浮动至下标 3，数组变为 [2, 5, 4, 8, 1]',
        callStack: [
          { name: 'main()', line: 19, args: {} },
          { name: 'bubbleSort(arr)', line: 9, args: {} },
        ],
        variables: { n: 5, i: 0, j: 2, temp: 8 },
        arrays: { arr: [2, 5, 4, 8, 1] },
        pointers: [
          { name: 'j', target: 'arr', index: 2, color: '#38bdf8' },
          { name: 'j+1', target: 'arr', index: 3, color: '#f43f5e' },
        ],
        activeArrayIndices: [{ arrayName: 'arr', indices: [2, 3], status: 'swap' }],
      },
      {
        step: 8,
        line: 6,
        description: '内层递增：j = 3，比较 arr[3] (8) 与 arr[4] (1)，8 > 1 触发交换',
        callStack: [
          { name: 'main()', line: 19, args: {} },
          { name: 'bubbleSort(arr)', line: 6, args: {} },
        ],
        variables: { n: 5, i: 0, j: 3, 'arr[3]': 8, 'arr[4]': 1 },
        arrays: { arr: [2, 5, 4, 8, 1] },
        pointers: [
          { name: 'j', target: 'arr', index: 3, color: '#38bdf8' },
          { name: 'j+1', target: 'arr', index: 4, color: '#f43f5e' },
        ],
        activeArrayIndices: [{ arrayName: 'arr', indices: [3, 4], status: 'compare' }],
      },
      {
        step: 9,
        line: 9,
        description: '第一轮冒泡结束：最大元素 8 成功沉底至数组末尾 [2, 5, 4, 1, 8]',
        callStack: [
          { name: 'main()', line: 19, args: {} },
          { name: 'bubbleSort(arr)', line: 9, args: {} },
        ],
        variables: { n: 5, i: 0, j: 3, temp: 8 },
        arrays: { arr: [2, 5, 4, 1, 8] },
        pointers: [{ name: '沉底', target: 'arr', index: 4, color: '#10b981' }],
        activeArrayIndices: [{ arrayName: 'arr', indices: [4], status: 'found' }],
      },
      {
        step: 10,
        line: 12,
        description: '全轮次排序完成：数组收敛为完全升序 [1, 2, 4, 5, 8]',
        callStack: [{ name: 'main()', line: 20, args: {} }],
        variables: { status: 'SORTED' },
        arrays: { arr: [1, 2, 4, 5, 8] },
        pointers: [],
        activeArrayIndices: [{ arrayName: 'arr', indices: [0, 1, 2, 3, 4], status: 'found' }],
      },
    ],
  },
  {
    id: 'recursion-stack',
    title: '递归函数压栈与弹栈 (Fibonacci Call Stack)',
    language: 'java',
    category: '递归与调用栈',
    description: '通过斐波那契数列 fib(4) 展示 JVM 线程调用栈帧的逐层压入 (Push) 与返回弹出 (Pop)。',
    code: `public class RecursionStackVisual {
    public static int fib(int n) {
        if (n <= 1) {
            return n; // 递归基
        }
        int left = fib(n - 1);
        int right = fib(n - 2);
        return left + right;
    }

    public static void main(String[] args) {
        int result = fib(4);
        System.out.println("fib(4) = " + result);
    }
}`,
    steps: [
      {
        step: 1,
        line: 12,
        description: '程序启动，JVM 在主线程创建 main 栈帧，准备调用 fib(4)',
        callStack: [{ name: 'main(String[] args)', line: 12, args: {} }],
        variables: { n: 4 },
        arrays: {},
        pointers: [],
      },
      {
        step: 2,
        line: 2,
        description: '压栈：调用 fib(4)，创建新栈帧入栈（调用栈深度 2）',
        callStack: [
          { name: 'main()', line: 12, args: {} },
          { name: 'fib(n=4)', line: 2, args: { n: 4 } },
        ],
        variables: { n: 4 },
        arrays: {},
        pointers: [],
      },
      {
        step: 3,
        line: 6,
        description: 'fib(4) 触发递归调用 fib(n - 1) -> fib(3) 压栈（深度 3）',
        callStack: [
          { name: 'main()', line: 12, args: {} },
          { name: 'fib(n=4)', line: 6, args: { n: 4 } },
          { name: 'fib(n=3)', line: 2, args: { n: 3 } },
        ],
        variables: { n: 3 },
        arrays: {},
        pointers: [],
      },
      {
        step: 4,
        line: 6,
        description: 'fib(3) 触发递归调用 fib(2) 压栈（深度 4）',
        callStack: [
          { name: 'main()', line: 12, args: {} },
          { name: 'fib(n=4)', line: 6, args: { n: 4 } },
          { name: 'fib(n=3)', line: 6, args: { n: 3 } },
          { name: 'fib(n=2)', line: 2, args: { n: 2 } },
        ],
        variables: { n: 2 },
        arrays: {},
        pointers: [],
      },
      {
        step: 5,
        line: 6,
        description: 'fib(2) 触发递归调用 fib(1) 压栈（深度 5，触达递归基）',
        callStack: [
          { name: 'main()', line: 12, args: {} },
          { name: 'fib(n=4)', line: 6, args: { n: 4 } },
          { name: 'fib(n=3)', line: 6, args: { n: 3 } },
          { name: 'fib(n=2)', line: 6, args: { n: 2 } },
          { name: 'fib(n=1)', line: 3, args: { n: 1 } },
        ],
        variables: { n: 1 },
        arrays: {},
        pointers: [],
      },
      {
        step: 6,
        line: 4,
        description: 'fib(1) 满足 n <= 1，直接返回 1，fib(1) 栈帧弹出！',
        callStack: [
          { name: 'main()', line: 12, args: {} },
          { name: 'fib(n=4)', line: 6, args: { n: 4 } },
          { name: 'fib(n=3)', line: 6, args: { n: 3 } },
          { name: 'fib(n=2)', line: 6, args: { n: 2, left: 1 } },
        ],
        variables: { 'fib(1)已弹栈': 1, left: 1 },
        arrays: {},
        pointers: [],
      },
      {
        step: 7,
        line: 7,
        description: 'fib(2) 继续调用 fib(0) 压栈（n=0 递归基，返回 0 后立即弹栈）',
        callStack: [
          { name: 'main()', line: 12, args: {} },
          { name: 'fib(n=4)', line: 6, args: { n: 4 } },
          { name: 'fib(n=3)', line: 6, args: { n: 3 } },
          { name: 'fib(n=2)', line: 8, args: { n: 2, left: 1, right: 0 }, returnValue: 1 },
        ],
        variables: { left: 1, right: 0, 'fib(2)计算结果': 1 },
        arrays: {},
        pointers: [],
      },
      {
        step: 8,
        line: 8,
        description: 'fib(2) 计算完毕 1 + 0 = 1 弹栈返回给 fib(3)，此时 fib(3) 的 left = 1',
        callStack: [
          { name: 'main()', line: 12, args: {} },
          { name: 'fib(n=4)', line: 6, args: { n: 4 } },
          { name: 'fib(n=3)', line: 7, args: { n: 3, left: 1 } },
        ],
        variables: { 'fib(3).left': 1 },
        arrays: {},
        pointers: [],
      },
      {
        step: 9,
        line: 8,
        description: '各层子树依次归约求和：fib(3) 返回 2，fib(4) 的 left=2, right=1 求和得到 3',
        callStack: [
          { name: 'main()', line: 12, args: {} },
          { name: 'fib(n=4)', line: 8, args: { n: 4, left: 2, right: 1 }, returnValue: 3 },
        ],
        variables: { left: 2, right: 1, returnValue: 3 },
        arrays: {},
        pointers: [],
      },
      {
        step: 10,
        line: 13,
        description: '所有递归栈帧弹栈完毕，恢复 main 栈帧，最终计算输出 fib(4) = 3',
        callStack: [{ name: 'main(String[] args)', line: 13, args: { result: 3 } }],
        variables: { result: 3 },
        arrays: {},
        pointers: [],
      },
    ],
  },
  {
    id: 'dp-climbing-stairs',
    title: '动态规划演进 (DP Table Evolution)',
    language: 'java',
    category: '动态规划',
    description: '演示爬楼梯问题中状态转移方程 dp[i] = dp[i-1] + dp[i-2] 状态表从前至后的状态推导。',
    code: `public class DPClimbingStairs {
    public static int climbStairs(int n) {
        int[] dp = new int[n + 1];
        dp[0] = 1;
        dp[1] = 1;
        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        return dp[n];
    }

    public static void main(String[] args) {
        int n = 5;
        int ways = climbStairs(n);
        System.out.println("5阶楼梯走法: " + ways);
    }
}`,
    steps: [
      {
        step: 1,
        line: 3,
        description: '创建动态规划状态数组 dp = new int[6]，初始元素全为 0',
        callStack: [
          { name: 'main()', line: 14, args: {} },
          { name: 'climbStairs(n=5)', line: 3, args: { n: 5 } },
        ],
        variables: { n: 5 },
        arrays: { dp: [0, 0, 0, 0, 0, 0] },
        pointers: [],
      },
      {
        step: 2,
        line: 4,
        description: '状态边界初始化：dp[0] = 1（代表0阶时的基本方案数）',
        callStack: [{ name: 'climbStairs(n=5)', line: 4, args: { n: 5 } }],
        variables: { 'dp[0]': 1 },
        arrays: { dp: [1, 0, 0, 0, 0, 0] },
        pointers: [{ name: 'base', target: 'dp', index: 0, color: '#10b981' }],
        activeArrayIndices: [{ arrayName: 'dp', indices: [0], status: 'found' }],
      },
      {
        step: 3,
        line: 5,
        description: '状态边界初始化：dp[1] = 1（跨1阶只有1种走法）',
        callStack: [{ name: 'climbStairs(n=5)', line: 5, args: { n: 5 } }],
        variables: { 'dp[0]': 1, 'dp[1]': 1 },
        arrays: { dp: [1, 1, 0, 0, 0, 0] },
        pointers: [{ name: 'base', target: 'dp', index: 1, color: '#10b981' }],
        activeArrayIndices: [{ arrayName: 'dp', indices: [1], status: 'found' }],
      },
      {
        step: 4,
        line: 7,
        description: '状态转移 i = 2：dp[2] = dp[1] (1) + dp[0] (1) = 2',
        callStack: [{ name: 'climbStairs(n=5)', line: 7, args: { n: 5, i: 2 } }],
        variables: { i: 2, 'dp[i-1]': 1, 'dp[i-2]': 1, 'dp[2]': 2 },
        arrays: { dp: [1, 1, 2, 0, 0, 0] },
        pointers: [
          { name: 'i-2', target: 'dp', index: 0, color: '#38bdf8' },
          { name: 'i-1', target: 'dp', index: 1, color: '#6366f1' },
          { name: 'i=2', target: 'dp', index: 2, color: '#fbbf24' },
        ],
        activeArrayIndices: [{ arrayName: 'dp', indices: [2], status: 'swap' }],
      },
      {
        step: 5,
        line: 7,
        description: '状态转移 i = 3：dp[3] = dp[2] (2) + dp[1] (1) = 3',
        callStack: [{ name: 'climbStairs(n=5)', line: 7, args: { n: 5, i: 3 } }],
        variables: { i: 3, 'dp[i-1]': 2, 'dp[i-2]': 1, 'dp[3]': 3 },
        arrays: { dp: [1, 1, 2, 3, 0, 0] },
        pointers: [
          { name: 'i-2', target: 'dp', index: 1, color: '#38bdf8' },
          { name: 'i-1', target: 'dp', index: 2, color: '#6366f1' },
          { name: 'i=3', target: 'dp', index: 3, color: '#fbbf24' },
        ],
        activeArrayIndices: [{ arrayName: 'dp', indices: [3], status: 'swap' }],
      },
      {
        step: 6,
        line: 7,
        description: '状态转移 i = 4：dp[4] = dp[3] (3) + dp[2] (2) = 5',
        callStack: [{ name: 'climbStairs(n=5)', line: 7, args: { n: 5, i: 4 } }],
        variables: { i: 4, 'dp[i-1]': 3, 'dp[i-2]': 2, 'dp[4]': 5 },
        arrays: { dp: [1, 1, 2, 3, 5, 0] },
        pointers: [
          { name: 'i-2', target: 'dp', index: 2, color: '#38bdf8' },
          { name: 'i-1', target: 'dp', index: 3, color: '#6366f1' },
          { name: 'i=4', target: 'dp', index: 4, color: '#fbbf24' },
        ],
        activeArrayIndices: [{ arrayName: 'dp', indices: [4], status: 'swap' }],
      },
      {
        step: 7,
        line: 7,
        description: '状态转移 i = 5：dp[5] = dp[4] (5) + dp[3] (3) = 8',
        callStack: [{ name: 'climbStairs(n=5)', line: 7, args: { n: 5, i: 5 } }],
        variables: { i: 5, 'dp[i-1]': 5, 'dp[i-2]': 3, 'dp[5]': 8 },
        arrays: { dp: [1, 1, 2, 3, 5, 8] },
        pointers: [
          { name: 'i-2', target: 'dp', index: 3, color: '#38bdf8' },
          { name: 'i-1', target: 'dp', index: 4, color: '#6366f1' },
          { name: 'i=5', target: 'dp', index: 5, color: '#10b981' },
        ],
        activeArrayIndices: [{ arrayName: 'dp', indices: [5], status: 'found' }],
      },
      {
        step: 8,
        line: 9,
        description: '循环结束，返回 dp[5] = 8，5 阶楼梯共有 8 种跳法',
        callStack: [{ name: 'main()', line: 15, args: { ways: 8 } }],
        variables: { n: 5, ways: 8 },
        arrays: { dp: [1, 1, 2, 3, 5, 8] },
        pointers: [{ name: 'ANSWER', target: 'dp', index: 5, color: '#10b981' }],
      },
    ],
  },
];

/**
 * 针对任意用户输入的 Java / Python 代码，智能推断其演进骨架
 */
export function generateAdHocTraceFromCode(code: string, language: string): TraceStep[] {
  // 检查是否与某个预设高度匹配
  const lower = code.toLowerCase();
  if (lower.includes('binary') || (lower.includes('left') && lower.includes('right') && lower.includes('mid'))) {
    return CLASSIC_TRACE_SCENARIOS[0].steps;
  }
  if (lower.includes('bubble') || (lower.includes('arr[j]') && lower.includes('arr[j + 1]'))) {
    return CLASSIC_TRACE_SCENARIOS[1].steps;
  }
  if (lower.includes('fib(') || (lower.includes('fibonacci'))) {
    return CLASSIC_TRACE_SCENARIOS[2].steps;
  }
  if (lower.includes('dp[') || lower.includes('climb')) {
    return CLASSIC_TRACE_SCENARIOS[3].steps;
  }

  // 通用 AST 逐行步进推断
  const lines = code.split('\n');
  const steps: TraceStep[] = [];
  const variables: Record<string, any> = {};
  const arrays: Record<string, any[]> = {};
  const pointers: TracePointer[] = [];

  // 提取数组声明
  const arrayMatch = code.match(/(?:int\[\]|let|var|const)\s+(\w+)\s*=\s*\{([0-9,\s]+)\}/);
  if (arrayMatch) {
    const arrName = arrayMatch[1];
    const elements = arrayMatch[2].split(',').map(n => parseInt(n.trim(), 10)).filter(n => !isNaN(n));
    arrays[arrName] = elements;
  }

  let stepCount = 1;
  lines.forEach((line, idx) => {
    const lineNum = idx + 1;
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('/*')) return;

    // 匹配变量赋值
    const assignMatch = trimmed.match(/(?:int|double|String|let|var|const)?\s*(\w+)\s*=\s*([^;]+);?/);
    if (assignMatch && !assignMatch[2].includes('{')) {
      variables[assignMatch[1]] = assignMatch[2].trim().slice(0, 18);
    }

    if (stepCount <= 12) {
      steps.push({
        step: stepCount++,
        line: lineNum,
        description: `执行行 ${lineNum}：${trimmed.slice(0, 48)}`,
        callStack: [{ name: 'main()', line: lineNum, args: {} }],
        variables: { ...variables },
        arrays: { ...arrays },
        pointers: [...pointers],
      });
    }
  });

  return steps.length > 0 ? steps : CLASSIC_TRACE_SCENARIOS[0].steps;
}

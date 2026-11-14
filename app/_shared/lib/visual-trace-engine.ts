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
  codeByLang?: Record<string, string>;
  stepsByLang?: Record<string, TraceStep[]>;
}

function normalizeTraceLang(lang?: string): string {
  const l = (lang || 'cpp').toLowerCase().trim();
  if (l === 'c++' || l === 'cpp') return 'cpp';
  if (l === 'py' || l === 'python') return 'python';
  if (l === 'java') return 'java';
  if (l === 'js' || l === 'javascript' || l === 'ts' || l === 'typescript') return 'javascript';
  return l;
}

function findLineNumber(lines: string[], patterns: RegExp[], fallback: number): number {
  for (const pat of patterns) {
    const idx = lines.findIndex((line) => pat.test(line));
    if (idx !== -1) return idx + 1;
  }
  return Math.max(1, Math.min(lines.length, fallback));
}

function extractNumericArrays(code: string): Record<string, number[]> {
  const arrays: Record<string, number[]> = {};
  const patterns: RegExp[] = [
    // C++ vector<int> arr = {1, 2, 3}; / int arr[] = {1, 2, 3};
    /(?:std::)?vector<\s*\w+\s*>\s+(\w+)\s*=\s*\{([0-9,\s-]+)\}/g,
    /(?:int|long|double)\s+(\w+)\s*\[\s*\]\s*=\s*\{([0-9,\s-]+)\}/g,
    // Java int[] arr = {1, 2, 3}; or new int[]{1, 2, 3};
    /(?:int|long|double)\s*\[\s*\]\s+(\w+)\s*=\s*(?:new\s+\w+\s*\[\s*\]\s*)?\{([0-9,\s-]+)\}/g,
    // JS/TS const/let/var arr = [1, 2, 3]
    /(?:const|let|var)\s+(\w+)\s*=\s*\[([0-9,\s-]+)\]/g,
    // Python arr = [1, 2, 3]
    /^\s*(\w+)\s*=\s*\[([0-9,\s-]+)\]\s*(?:#.*)?$/gm,
  ];

  for (const regex of patterns) {
    let match: RegExpExecArray | null;
    while ((match = regex.exec(code)) !== null) {
      const name = match[1];
      const nums = match[2]
        .split(',')
        .map((s) => parseInt(s.trim(), 10))
        .filter((n) => !Number.isNaN(n));
      if (nums.length > 0 && !arrays[name]) {
        arrays[name] = nums.slice(0, 16);
      }
    }
  }
  return arrays;
}

function extractScalarInt(code: string, names: string[]): number | null {
  for (const name of names) {
    const pat = new RegExp(`(?:int|let|var|const)?\\s*${name}\\s*=\\s*(-?\\d+)\\b`);
    const m = code.match(pat);
    if (m) {
      const val = parseInt(m[1], 10);
      if (!Number.isNaN(val)) return val;
    }
  }
  return null;
}

function buildBinarySearchSteps(code: string, rawArr: number[], target: number, lang: string): TraceStep[] {
  const arr = [...rawArr];
  const arrName = Object.keys(extractNumericArrays(code))[0] || 'arr';
  const lines = code.split('\n');
  const mainLabel = lang === 'python' ? '<module>' : 'main()';

  const arrDeclLine = findLineNumber(lines, [new RegExp(`${arrName}\\s*=`), /vector<|int\[\]/], 1);
  const callLine = findLineNumber(lines, [/search\s*\(/, /binary_search\s*\(/], arrDeclLine + 1);
  const leftInitLine = findLineNumber(lines, [/\bleft\s*=\s*0/], 2);
  const rightInitLine = findLineNumber(lines, [/\bright\s*=/], leftInitLine + 1);
  const whileLine = findLineNumber(lines, [/while\s*\(?\s*left\s*<=\s*right/], rightInitLine + 1);
  const midLine = findLineNumber(lines, [/\bmid\s*=/], whileLine + 1);
  const foundLine = findLineNumber(lines, [/return\s+mid\b/], midLine + 2);
  const moveLeftLine = findLineNumber(lines, [/left\s*=\s*mid\s*\+\s*1/], foundLine + 2);
  const moveRightLine = findLineNumber(lines, [/right\s*=\s*mid\s*-\s*1/], moveLeftLine + 2);
  const notFoundLine = findLineNumber(lines, [/return\s+-1\b/], moveRightLine + 2);
  const outputLine = findLineNumber(lines, [/cout\b|System\.out|print\s*\(/], lines.length);

  const steps: TraceStep[] = [];
  let stepNum = 1;
  let left = 0;
  let right = arr.length - 1;
  let result = -1;

  steps.push({
    step: stepNum++,
    line: arrDeclLine,
    description: `初始化待查找数组 ${arrName} = [${arr.join(', ')}] 与目标值 target = ${target}`,
    callStack: [{ name: mainLabel, line: arrDeclLine, args: {} }],
    variables: { target },
    arrays: { [arrName]: [...arr] },
    pointers: [],
  });

  steps.push({
    step: stepNum++,
    line: leftInitLine,
    description: `调用查找函数，初始化左边界指针 left = 0`,
    callStack: [
      { name: mainLabel, line: callLine, args: {} },
      { name: `search(${arrName}, target=${target})`, line: leftInitLine, args: { target } },
    ],
    variables: { left: 0, target },
    arrays: { [arrName]: [...arr] },
    pointers: [{ name: 'left', target: arrName, index: 0, color: '#38bdf8' }],
    activeArrayIndices: [{ arrayName: arrName, indices: [0], status: 'active' }],
  });

  steps.push({
    step: stepNum++,
    line: rightInitLine,
    description: `初始化右边界指针 right = ${right}`,
    callStack: [
      { name: mainLabel, line: callLine, args: {} },
      { name: `search(${arrName}, target=${target})`, line: rightInitLine, args: { target } },
    ],
    variables: { left, right, target },
    arrays: { [arrName]: [...arr] },
    pointers: [
      { name: 'left', target: arrName, index: left, color: '#38bdf8' },
      { name: 'right', target: arrName, index: right, color: '#f43f5e' },
    ],
  });

  while (left <= right && steps.length < 28) {
    steps.push({
      step: stepNum++,
      line: whileLine,
      description: `判断循环条件：left (${left}) <= right (${right}) 成立`,
      callStack: [
        { name: mainLabel, line: callLine, args: {} },
        { name: `search(${arrName}, target=${target})`, line: whileLine, args: { target } },
      ],
      variables: { left, right, target },
      arrays: { [arrName]: [...arr] },
      pointers: [
        { name: 'left', target: arrName, index: left, color: '#38bdf8' },
        { name: 'right', target: arrName, index: right, color: '#f43f5e' },
      ],
    });

    const mid = left + Math.floor((right - left) / 2);
    steps.push({
      step: stepNum++,
      line: midLine,
      description: `计算中点 mid = ${mid}，读取 ${arrName}[${mid}] = ${arr[mid]}`,
      callStack: [
        { name: mainLabel, line: callLine, args: {} },
        { name: `search(${arrName}, target=${target})`, line: midLine, args: { target } },
      ],
      variables: { left, right, mid, [`${arrName}[mid]`]: arr[mid], target },
      arrays: { [arrName]: [...arr] },
      pointers: [
        { name: 'left', target: arrName, index: left, color: '#38bdf8' },
        { name: 'mid', target: arrName, index: mid, color: '#fbbf24' },
        { name: 'right', target: arrName, index: right, color: '#f43f5e' },
      ],
      activeArrayIndices: [{ arrayName: arrName, indices: [mid], status: 'compare' }],
    });

    if (arr[mid] === target) {
      result = mid;
      steps.push({
        step: stepNum++,
        line: foundLine,
        description: `比较：${arrName}[${mid}] == ${target} 命中目标！返回索引 mid = ${mid}`,
        callStack: [
          { name: mainLabel, line: callLine, args: {} },
          { name: `search(${arrName}, target=${target})`, line: foundLine, args: { target }, returnValue: mid },
        ],
        variables: { left, right, mid, returnValue: mid },
        arrays: { [arrName]: [...arr] },
        pointers: [{ name: 'FOUND', target: arrName, index: mid, color: '#10b981' }],
        activeArrayIndices: [{ arrayName: arrName, indices: [mid], status: 'found' }],
      });
      break;
    } else if (arr[mid] < target) {
      left = mid + 1;
      steps.push({
        step: stepNum++,
        line: moveLeftLine,
        description: `${arrName}[${mid}] (${arr[mid]}) < ${target}，右移左边界：left = ${left}`,
        callStack: [
          { name: mainLabel, line: callLine, args: {} },
          { name: `search(${arrName}, target=${target})`, line: moveLeftLine, args: { target } },
        ],
        variables: { left, right, mid, target },
        arrays: { [arrName]: [...arr] },
        pointers: [
          ...(left < arr.length ? [{ name: 'left', target: arrName, index: left, color: '#38bdf8' }] : []),
          ...(right >= 0 ? [{ name: 'right', target: arrName, index: right, color: '#f43f5e' }] : []),
        ],
      });
    } else {
      right = mid - 1;
      steps.push({
        step: stepNum++,
        line: moveRightLine,
        description: `${arrName}[${mid}] (${arr[mid]}) > ${target}，左移右边界：right = ${right}`,
        callStack: [
          { name: mainLabel, line: callLine, args: {} },
          { name: `search(${arrName}, target=${target})`, line: moveRightLine, args: { target } },
        ],
        variables: { left, right, mid, target },
        arrays: { [arrName]: [...arr] },
        pointers: [
          ...(left < arr.length ? [{ name: 'left', target: arrName, index: left, color: '#38bdf8' }] : []),
          ...(right >= 0 ? [{ name: 'right', target: arrName, index: right, color: '#f43f5e' }] : []),
        ],
      });
    }
  }

  if (result === -1) {
    steps.push({
      step: stepNum++,
      line: notFoundLine,
      description: `left (${left}) > right (${right})，区间耗尽，未找到目标值 ${target}，返回 -1`,
      callStack: [
        { name: mainLabel, line: callLine, args: {} },
        { name: `search(${arrName}, target=${target})`, line: notFoundLine, args: { target }, returnValue: -1 },
      ],
      variables: { left, right, returnValue: -1 },
      arrays: { [arrName]: [...arr] },
      pointers: [],
    });
  }

  steps.push({
    step: stepNum++,
    line: outputLine,
    description: `函数弹栈返回，最终结果 result = ${result}，输出完成`,
    callStack: [{ name: mainLabel, line: outputLine, args: {} }],
    variables: { target, result },
    arrays: { [arrName]: [...arr] },
    pointers: result >= 0 ? [{ name: 'ANSWER', target: arrName, index: result, color: '#10b981' }] : [],
    activeArrayIndices: result >= 0 ? [{ arrayName: arrName, indices: [result], status: 'found' }] : undefined,
  });

  return steps;
}

function buildBubbleSortSteps(code: string, rawArr: number[], lang: string): TraceStep[] {
  const arr = [...rawArr];
  const arrName = Object.keys(extractNumericArrays(code))[0] || 'arr';
  const lines = code.split('\n');
  const mainLabel = lang === 'python' ? '<module>' : 'main()';

  const initLine = findLineNumber(lines, [new RegExp(`${arrName}\\s*=`), /vector<|int\[\]/], 1);
  const callLine = findLineNumber(lines, [/bubbleSort\s*\(/, /bubble_sort\s*\(/], initLine + 1);
  const outerLine = findLineNumber(lines, [/for\s*.*?\bi\b/], 3);
  const compareLine = findLineNumber(lines, [/if\s*.*?\[j\]\s*>\s*.*?\[j\s*\+\s*1\]/], outerLine + 2);
  const swapLine = findLineNumber(lines, [/temp\s*=|arr\[j\],\s*arr\[j\s*\+\s*1\]\s*=/], compareLine + 1);
  const outputLine = findLineNumber(lines, [/cout\b|System\.out|print\s*\(/], lines.length);

  const steps: TraceStep[] = [];
  let stepNum = 1;
  const n = arr.length;

  steps.push({
    step: stepNum++,
    line: initLine,
    description: `初始化待排序序列 ${arrName} = [${arr.join(', ')}] (长度 ${n})`,
    callStack: [{ name: mainLabel, line: initLine, args: {} }],
    variables: { n },
    arrays: { [arrName]: [...arr] },
    pointers: [],
  });

  for (let i = 0; i < n - 1 && steps.length < 26; i++) {
    steps.push({
      step: stepNum++,
      line: outerLine,
      description: `外层循环 i = ${i}，开启第 ${i + 1} 轮相邻比较`,
      callStack: [
        { name: mainLabel, line: callLine, args: {} },
        { name: `bubbleSort(${arrName})`, line: outerLine, args: { n, i } },
      ],
      variables: { n, i },
      arrays: { [arrName]: [...arr] },
      pointers: [{ name: 'i', target: arrName, index: i, color: '#6366f1' }],
    });

    let swappedInPass = false;
    for (let j = 0; j < n - 1 - i && steps.length < 27; j++) {
      const needSwap = arr[j] > arr[j + 1];
      steps.push({
        step: stepNum++,
        line: compareLine,
        description: `比较 ${arrName}[${j}] (${arr[j]}) 与 ${arrName}[${j + 1}] (${arr[j + 1]})${needSwap ? '，逆序触发交换' : '，已有序不交换'}`,
        callStack: [
          { name: mainLabel, line: callLine, args: {} },
          { name: `bubbleSort(${arrName})`, line: compareLine, args: { i, j } },
        ],
        variables: { n, i, j, [`${arrName}[j]`]: arr[j], [`${arrName}[j+1]`]: arr[j + 1] },
        arrays: { [arrName]: [...arr] },
        pointers: [
          { name: 'j', target: arrName, index: j, color: '#38bdf8' },
          { name: 'j+1', target: arrName, index: j + 1, color: '#f43f5e' },
        ],
        activeArrayIndices: [{ arrayName: arrName, indices: [j, j + 1], status: 'compare' }],
      });

      if (needSwap) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swappedInPass = true;
        steps.push({
          step: stepNum++,
          line: swapLine,
          description: `完成交换：temp=${temp}，序列更新为 [${arr.join(', ')}]`,
          callStack: [
            { name: mainLabel, line: callLine, args: {} },
            { name: `bubbleSort(${arrName})`, line: swapLine, args: { i, j } },
          ],
          variables: { n, i, j, temp },
          arrays: { [arrName]: [...arr] },
          pointers: [
            { name: 'j', target: arrName, index: j, color: '#38bdf8' },
            { name: 'j+1', target: arrName, index: j + 1, color: '#f43f5e' },
          ],
          activeArrayIndices: [{ arrayName: arrName, indices: [j, j + 1], status: 'swap' }],
        });
      }
    }
    if (!swappedInPass) break;
  }

  // Ensure array finishes sorted in final frame
  const finalSorted = [...rawArr].sort((a, b) => a - b);
  steps.push({
    step: stepNum++,
    line: outputLine,
    description: `排序完成：序列最终收敛为 [${finalSorted.join(', ')}]`,
    callStack: [{ name: mainLabel, line: outputLine, args: {} }],
    variables: { n, status: 'SORTED' },
    arrays: { [arrName]: finalSorted },
    pointers: [],
    activeArrayIndices: [{ arrayName: arrName, indices: finalSorted.map((_, k) => k), status: 'found' }],
  });

  return steps;
}

function buildFibSteps(code: string, rawN: number, lang: string): TraceStep[] {
  const n = Math.max(1, Math.min(5, rawN));
  const lines = code.split('\n');
  const mainLabel = lang === 'python' ? '<module>' : 'main()';

  const entryLine = findLineNumber(lines, [/int\s+fib\s*\(/, /def\s+fib\s*\(/, /static\s+int\s+fib\s*\(/], 1);
  const baseLine = findLineNumber(lines, [/return\s+n\b/], entryLine + 2);
  const leftCallLine = findLineNumber(lines, [/fib\s*\(\s*n\s*-\s*1\s*\)/], baseLine + 2);
  const rightCallLine = findLineNumber(lines, [/fib\s*\(\s*n\s*-\s*2\s*\)/], leftCallLine + 1);
  const combineLine = findLineNumber(lines, [/return\s+left\s*\+\s*right|return\s+fib/], rightCallLine + 1);
  const callLine = findLineNumber(lines, [/=\s*fib\s*\(/], lines.length - 2);
  const outputLine = findLineNumber(lines, [/cout\b|System\.out|print\s*\(/], lines.length);

  const steps: TraceStep[] = [];
  let stepNum = 1;
  const activeStack: TraceStackFrame[] = [{ name: mainLabel, line: callLine, args: {} }];

  steps.push({
    step: stepNum++,
    line: callLine,
    description: `程序启动，准备在主调用栈发起 fib(${n})`,
    callStack: activeStack.map((f) => ({ ...f })),
    variables: { n },
    arrays: {},
    pointers: [],
  });

  function sim(curN: number): number {
    if (steps.length >= 28) {
      return curN <= 1 ? curN : simFast(curN);
    }
    activeStack.push({ name: `fib(n=${curN})`, line: entryLine, args: { n: curN } });
    steps.push({
      step: stepNum++,
      line: entryLine,
      description: `压栈：调用 fib(${curN})（调用栈深度 ${activeStack.length}）`,
      callStack: activeStack.map((f) => ({ ...f })),
      variables: { n: curN, depth: activeStack.length },
      arrays: {},
      pointers: [],
    });

    if (curN <= 1) {
      const top = activeStack[activeStack.length - 1];
      top.line = baseLine;
      top.returnValue = curN;
      steps.push({
        step: stepNum++,
        line: baseLine,
        description: `触发递归基 n=${curN} <= 1，返回 ${curN} 并准备弹栈`,
        callStack: activeStack.map((f) => ({ ...f })),
        variables: { n: curN, returnValue: curN },
        arrays: {},
        pointers: [],
      });
      activeStack.pop();
      return curN;
    }

    activeStack[activeStack.length - 1].line = leftCallLine;
    const leftVal = sim(curN - 1);

    if (steps.length < 28 && activeStack.length > 0) {
      activeStack[activeStack.length - 1].line = rightCallLine;
      activeStack[activeStack.length - 1].args = { n: curN, left: leftVal };
    }
    const rightVal = sim(curN - 2);
    const total = leftVal + rightVal;

    if (steps.length < 28 && activeStack.length > 0) {
      const top = activeStack[activeStack.length - 1];
      top.line = combineLine;
      top.args = { n: curN, left: leftVal, right: rightVal };
      top.returnValue = total;
      steps.push({
        step: stepNum++,
        line: combineLine,
        description: `fib(${curN}) 归约：left (${leftVal}) + right (${rightVal}) = ${total}，弹栈返回`,
        callStack: activeStack.map((f) => ({ ...f })),
        variables: { n: curN, left: leftVal, right: rightVal, returnValue: total },
        arrays: {},
        pointers: [],
      });
    }
    activeStack.pop();
    return total;
  }

  function simFast(k: number): number {
    return k <= 1 ? k : simFast(k - 1) + simFast(k - 2);
  }

  const finalRes = sim(n);
  steps.push({
    step: stepNum++,
    line: outputLine,
    description: `全部栈帧弹出，回到 ${mainLabel}，输出 fib(${n}) = ${finalRes}`,
    callStack: [{ name: mainLabel, line: outputLine, args: { result: finalRes } }],
    variables: { n, result: finalRes },
    arrays: {},
    pointers: [],
  });

  return steps;
}

function buildClimbStairsSteps(code: string, rawN: number, lang: string): TraceStep[] {
  const n = Math.max(2, Math.min(10, rawN));
  const lines = code.split('\n');
  const mainLabel = lang === 'python' ? '<module>' : 'main()';

  const dpInitLine = findLineNumber(lines, [/dp\s*=\s*\[|vector<int>\s+dp|new\s+int\[/], 2);
  const dp0Line = findLineNumber(lines, [/dp\[0\]\s*=\s*1/], dpInitLine + 1);
  const dp1Line = findLineNumber(lines, [/dp\[1\]\s*=\s*1/], dp0Line + 1);
  const transLine = findLineNumber(lines, [/dp\[i\]\s*=\s*dp\[i\s*-\s*1\]/], dp1Line + 2);
  const callLine = findLineNumber(lines, [/climbStairs\s*\(|climb_stairs\s*\(/], lines.length - 2);
  const outputLine = findLineNumber(lines, [/cout\b|System\.out|print\s*\(/], lines.length);

  const dp = Array(n + 1).fill(0);
  const steps: TraceStep[] = [];
  let stepNum = 1;

  steps.push({
    step: stepNum++,
    line: dpInitLine,
    description: `初始化状态表 dp[${n + 1}] 全为 0`,
    callStack: [
      { name: mainLabel, line: callLine, args: {} },
      { name: `climbStairs(n=${n})`, line: dpInitLine, args: { n } },
    ],
    variables: { n },
    arrays: { dp: [...dp] },
    pointers: [],
  });

  dp[0] = 1;
  steps.push({
    step: stepNum++,
    line: dp0Line,
    description: '边界条件：dp[0] = 1（0阶共有 1 种基态）',
    callStack: [{ name: `climbStairs(n=${n})`, line: dp0Line, args: { n } }],
    variables: { 'dp[0]': 1 },
    arrays: { dp: [...dp] },
    pointers: [{ name: 'base', target: 'dp', index: 0, color: '#10b981' }],
    activeArrayIndices: [{ arrayName: 'dp', indices: [0], status: 'found' }],
  });

  dp[1] = 1;
  steps.push({
    step: stepNum++,
    line: dp1Line,
    description: '边界条件：dp[1] = 1（1阶共有 1 种走法）',
    callStack: [{ name: `climbStairs(n=${n})`, line: dp1Line, args: { n } }],
    variables: { 'dp[0]': 1, 'dp[1]': 1 },
    arrays: { dp: [...dp] },
    pointers: [{ name: 'base', target: 'dp', index: 1, color: '#10b981' }],
    activeArrayIndices: [{ arrayName: 'dp', indices: [1], status: 'found' }],
  });

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
    steps.push({
      step: stepNum++,
      line: transLine,
      description: `状态转移 i=${i}：dp[${i}] = dp[${i - 1}] (${dp[i - 1]}) + dp[${i - 2}] (${dp[i - 2]}) = ${dp[i]}`,
      callStack: [{ name: `climbStairs(n=${n})`, line: transLine, args: { n, i } }],
      variables: { i, 'dp[i-1]': dp[i - 1], 'dp[i-2]': dp[i - 2], [`dp[${i}]`]: dp[i] },
      arrays: { dp: [...dp] },
      pointers: [
        { name: 'i-2', target: 'dp', index: i - 2, color: '#38bdf8' },
        { name: 'i-1', target: 'dp', index: i - 1, color: '#6366f1' },
        { name: `i=${i}`, target: 'dp', index: i, color: i === n ? '#10b981' : '#fbbf24' },
      ],
      activeArrayIndices: [{ arrayName: 'dp', indices: [i], status: i === n ? 'found' : 'swap' }],
    });
  }

  steps.push({
    step: stepNum++,
    line: outputLine,
    description: `循环结束，返回 dp[${n}] = ${dp[n]}，${n} 阶楼梯共有 ${dp[n]} 种走法`,
    callStack: [{ name: mainLabel, line: outputLine, args: { ways: dp[n] } }],
    variables: { n, ways: dp[n] },
    arrays: { dp: [...dp] },
    pointers: [{ name: 'ANSWER', target: 'dp', index: n, color: '#10b981' }],
  });

  return steps;
}

const BINARY_SEARCH_CODES = {
  cpp: `#include <iostream>
#include <vector>
using namespace std;

int search(const vector<int>& arr, int target) {
    int left = 0;
    int right = (int)arr.size() - 1;
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

int main() {
    vector<int> arr = {1, 3, 5, 7, 9, 11, 14, 18};
    int target = 11;
    int result = search(arr, target);
    cout << "目标索引: " << result << endl;
    return 0;
}`,
  python: `def binary_search(arr, target):
    left = 0
    right = len(arr) - 1
    while left <= right:
        mid = left + (right - left) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

arr = [1, 3, 5, 7, 9, 11, 14, 18]
target = 11
result = binary_search(arr, target)
print(f"目标索引: {result}")`,
  java: `import java.util.*;

public class Main {
    static int search(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] == target) {
                return mid;
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
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
};

const BUBBLE_SORT_CODES = {
  cpp: `#include <iostream>
#include <vector>
using namespace std;

void bubbleSort(vector<int>& arr) {
    int n = (int)arr.size();
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

int main() {
    vector<int> arr = {5, 2, 8, 4, 1};
    bubbleSort(arr);
    for (int x : arr) cout << x << " ";
    cout << endl;
    return 0;
}`,
  python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(n - 1 - i):
            if arr[j] > arr[j + 1]:
                temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp

arr = [5, 2, 8, 4, 1]
bubble_sort(arr)
print("排序结果:", arr)`,
  java: `import java.util.*;

public class Main {
    static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
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
        System.out.println(Arrays.toString(arr));
    }
}`,
};

const FIB_CODES = {
  cpp: `#include <iostream>
using namespace std;

int fib(int n) {
    if (n <= 1) {
        return n; // 递归基
    }
    int left = fib(n - 1);
    int right = fib(n - 2);
    return left + right;
}

int main() {
    int result = fib(4);
    cout << "fib(4) = " << result << endl;
    return 0;
}`,
  python: `def fib(n):
    if n <= 1:
        return n
    left = fib(n - 1)
    right = fib(n - 2)
    return left + right

result = fib(4)
print(f"fib(4) = {result}")`,
  java: `public class Main {
    static int fib(int n) {
        if (n <= 1) {
            return n;
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
};

const CLIMB_STAIRS_CODES = {
  cpp: `#include <iostream>
#include <vector>
using namespace std;

int climbStairs(int n) {
    vector<int> dp(n + 1, 0);
    dp[0] = 1;
    dp[1] = 1;
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}

int main() {
    int n = 5;
    int ways = climbStairs(n);
    cout << "5阶楼梯走法: " << ways << endl;
    return 0;
}`,
  python: `def climb_stairs(n):
    dp = [0] * (n + 1)
    dp[0] = 1
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]

n = 5
ways = climb_stairs(n)
print(f"{n}阶楼梯走法: {ways}")`,
  java: `public class Main {
    static int climbStairs(int n) {
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
        System.out.println(n + "阶楼梯走法: " + ways);
    }
}`,
};

/**
 * 内置经典算法可视化回放演示库（支持 C++ / Python / Java 三语言）
 */
export const CLASSIC_TRACE_SCENARIOS: TraceScenario[] = [
  {
    id: 'binary-search',
    title: '二分查找双指针 (Binary Search)',
    language: 'cpp',
    category: '双指针与查找',
    description: '演示经典双指针 left、right 与中点 mid 在有序数组中逼近目标值 11 的执行过程。',
    code: BINARY_SEARCH_CODES.cpp,
    codeByLang: BINARY_SEARCH_CODES,
    steps: buildBinarySearchSteps(BINARY_SEARCH_CODES.cpp, [1, 3, 5, 7, 9, 11, 14, 18], 11, 'cpp'),
    stepsByLang: {
      cpp: buildBinarySearchSteps(BINARY_SEARCH_CODES.cpp, [1, 3, 5, 7, 9, 11, 14, 18], 11, 'cpp'),
      python: buildBinarySearchSteps(BINARY_SEARCH_CODES.python, [1, 3, 5, 7, 9, 11, 14, 18], 11, 'python'),
      java: buildBinarySearchSteps(BINARY_SEARCH_CODES.java, [1, 3, 5, 7, 9, 11, 14, 18], 11, 'java'),
    },
  },
  {
    id: 'bubble-sort',
    title: '冒泡排序相邻交换 (Bubble Sort)',
    language: 'cpp',
    category: '经典排序',
    description: '演示双重循环下相邻元素比对、临时变量 temp 暂存以及就地交换的内存演变。',
    code: BUBBLE_SORT_CODES.cpp,
    codeByLang: BUBBLE_SORT_CODES,
    steps: buildBubbleSortSteps(BUBBLE_SORT_CODES.cpp, [5, 2, 8, 4, 1], 'cpp'),
    stepsByLang: {
      cpp: buildBubbleSortSteps(BUBBLE_SORT_CODES.cpp, [5, 2, 8, 4, 1], 'cpp'),
      python: buildBubbleSortSteps(BUBBLE_SORT_CODES.python, [5, 2, 8, 4, 1], 'python'),
      java: buildBubbleSortSteps(BUBBLE_SORT_CODES.java, [5, 2, 8, 4, 1], 'java'),
    },
  },
  {
    id: 'recursion-stack',
    title: '递归函数压栈与弹栈 (Fibonacci Call Stack)',
    language: 'cpp',
    category: '递归与调用栈',
    description: '通过斐波那契数列 fib(4) 展示调用栈帧的逐层压入 (Push) 与返回弹出 (Pop)。',
    code: FIB_CODES.cpp,
    codeByLang: FIB_CODES,
    steps: buildFibSteps(FIB_CODES.cpp, 4, 'cpp'),
    stepsByLang: {
      cpp: buildFibSteps(FIB_CODES.cpp, 4, 'cpp'),
      python: buildFibSteps(FIB_CODES.python, 4, 'python'),
      java: buildFibSteps(FIB_CODES.java, 4, 'java'),
    },
  },
  {
    id: 'dp-climbing-stairs',
    title: '动态规划演进 (DP Table Evolution)',
    language: 'cpp',
    category: '动态规划',
    description: '演示爬楼梯问题中状态转移方程 dp[i] = dp[i-1] + dp[i-2] 状态表从前至后的状态推导。',
    code: CLIMB_STAIRS_CODES.cpp,
    codeByLang: CLIMB_STAIRS_CODES,
    steps: buildClimbStairsSteps(CLIMB_STAIRS_CODES.cpp, 5, 'cpp'),
    stepsByLang: {
      cpp: buildClimbStairsSteps(CLIMB_STAIRS_CODES.cpp, 5, 'cpp'),
      python: buildClimbStairsSteps(CLIMB_STAIRS_CODES.python, 5, 'python'),
      java: buildClimbStairsSteps(CLIMB_STAIRS_CODES.java, 5, 'java'),
    },
  },
];

/**
 * 按当前编辑器语言获取经典算法回放场景
 */
export function getScenarioForLanguage(scenarioId: string, lang: string): TraceScenario {
  const base = CLASSIC_TRACE_SCENARIOS.find((s) => s.id === scenarioId) || CLASSIC_TRACE_SCENARIOS[0];
  const normalized = normalizeTraceLang(lang);
  const resolvedLang = normalized === 'python' || normalized === 'java' || normalized === 'cpp' ? normalized : 'cpp';
  return {
    ...base,
    language: resolvedLang,
    code: base.codeByLang?.[resolvedLang] || base.code,
    steps: base.stepsByLang?.[resolvedLang] || base.steps,
  };
}

const POINTER_COLORS = ['#38bdf8', '#f43f5e', '#fbbf24', '#10b981', '#a855f7'];
const INDEX_VAR_NAMES = ['i', 'j', 'k', 'left', 'right', 'mid', 'low', 'high'];

function buildPointersFromVariables(
  variables: Record<string, any>,
  arrays: Record<string, any[]>
): TracePointer[] {
  const arrNames = Object.keys(arrays);
  if (arrNames.length === 0) return [];
  const primaryName = arrNames[0];
  const primaryLen = arrays[primaryName].length;
  const ptrs: TracePointer[] = [];

  INDEX_VAR_NAMES.forEach((varName, cIdx) => {
    const val = variables[varName];
    if (typeof val === 'number' && Number.isInteger(val) && val >= 0 && val < primaryLen) {
      ptrs.push({
        name: varName,
        target: primaryName,
        index: val,
        color: POINTER_COLORS[cIdx % POINTER_COLORS.length],
      });
    }
  });
  return ptrs;
}

function isNonExecutableLine(trimmed: string): boolean {
  if (!trimmed) return true;
  if (
    trimmed.startsWith('//') ||
    trimmed.startsWith('/*') ||
    trimmed.startsWith('*') ||
    trimmed.startsWith('*/') ||
    trimmed.startsWith('#include') ||
    trimmed.startsWith('#define') ||
    trimmed.startsWith('using namespace') ||
    trimmed.startsWith('import ') ||
    trimmed.startsWith('from ') ||
    trimmed.startsWith('package ') ||
    trimmed.startsWith('#')
  ) {
    return true;
  }
  if (trimmed === '{' || trimmed === '}' || trimmed === '};') return true;
  if (/^(?:public\s+|private\s+|protected\s+)?(?:class|interface|struct)\s+\w+/.test(trimmed)) {
    return true;
  }
  if (/^(?:def|function)\s+\w+\s*\(.*\)\s*[:{]?$/.test(trimmed)) return true;
  if (/^(?:public\s+)?(?:static\s+)?(?:void|int|long|double|boolean|String)\s+(?:main|search|bubbleSort|fib|climbStairs|\w+)\s*\([^)]*\)\s*\{?$/.test(trimmed)) {
    return true;
  }
  return false;
}

function evalSimpleNumericExpr(exprRaw: string, vars: Record<string, any>, arrays: Record<string, number[]>): any {
  const expr = exprRaw.trim().replace(/;$/, '');
  if (/^-?\d+$/.test(expr)) return parseInt(expr, 10);
  if (/^-?\d+\.\d+$/.test(expr)) return parseFloat(expr);

  // 数组元素读取 arr[idxVar]
  const arrIdxMatch = expr.match(/^(\w+)\[(\w+)\]$/);
  if (arrIdxMatch && arrays[arrIdxMatch[1]]) {
    const idxVal = /^\d+$/.test(arrIdxMatch[2]) ? parseInt(arrIdxMatch[2], 10) : vars[arrIdxMatch[2]];
    if (typeof idxVal === 'number' && idxVal >= 0 && idxVal < arrays[arrIdxMatch[1]].length) {
      return arrays[arrIdxMatch[1]][idxVal];
    }
  }

  // 简单二元数值运算 a + b / a - b / a * b
  const binMatch = expr.match(/^(\w+)\s*([+\-*])\s*(\w+)$/);
  if (binMatch) {
    const leftVal = /^-?\d+$/.test(binMatch[1]) ? parseInt(binMatch[1], 10) : vars[binMatch[1]];
    const rightVal = /^-?\d+$/.test(binMatch[3]) ? parseInt(binMatch[3], 10) : vars[binMatch[3]];
    if (typeof leftVal === 'number' && typeof rightVal === 'number') {
      if (binMatch[2] === '+') return leftVal + rightVal;
      if (binMatch[2] === '-') return leftVal - rightVal;
      if (binMatch[2] === '*') return leftVal * rightVal;
    }
  }

  return expr.slice(0, 24);
}

/**
 * 针对任意用户输入的 C++ / Python / Java / JS 代码，智能推断其动态演进骨架
 */
export function generateAdHocTraceFromCode(code: string, language: string): TraceStep[] {
  const normalizedLang = normalizeTraceLang(language);
  const extractedArrays = extractNumericArrays(code);
  const primaryArr = Object.values(extractedArrays)[0];
  const lower = code.toLowerCase();

  // 1. 识别经典算法模式并结合用户真实数组/参数生成精准回放帧
  if (lower.includes('binary') || (lower.includes('left') && lower.includes('right') && lower.includes('mid'))) {
    const arr = primaryArr || [1, 3, 5, 7, 9, 11, 14, 18];
    const target = extractScalarInt(code, ['target', 'key', 'x']) ?? arr[Math.min(arr.length - 1, Math.floor(arr.length * 0.65))];
    return buildBinarySearchSteps(code, arr, target, normalizedLang);
  }
  if (lower.includes('bubble') || (lower.includes('arr[j]') && lower.includes('arr[j + 1]'))) {
    const arr = primaryArr || [5, 2, 8, 4, 1];
    return buildBubbleSortSteps(code, arr, normalizedLang);
  }
  if (lower.includes('fib(') || lower.includes('fibonacci')) {
    const callArgMatch = code.match(/fib\s*\(\s*(\d+)\s*\)/);
    const n = callArgMatch ? parseInt(callArgMatch[1], 10) : (extractScalarInt(code, ['n']) ?? 4);
    return buildFibSteps(code, n, normalizedLang);
  }
  if (lower.includes('dp[') || lower.includes('climb')) {
    const n = extractScalarInt(code, ['n']) ?? 5;
    return buildClimbStairsSteps(code, n, normalizedLang);
  }

  // 2. 通用多语言逐行步进推断与简单循环展开模拟（上限 30 帧）
  const lines = code.split('\n');
  const steps: TraceStep[] = [];
  const variables: Record<string, any> = {};
  const arrays: Record<string, number[]> = { ...extractedArrays };
  const mainLabel = normalizedLang === 'python' ? '<module>' : 'main()';
  const maxSteps = 30;

  const pushStep = (lineNum: number, desc: string, activeIdx?: { arrayName: string; indices: number[]; status: 'compare' | 'swap' | 'found' | 'active' }[]) => {
    if (steps.length >= maxSteps) return;
    steps.push({
      step: steps.length + 1,
      line: lineNum,
      description: desc,
      callStack: [{ name: mainLabel, line: lineNum, args: {} }],
      variables: { ...variables },
      arrays: Object.fromEntries(Object.entries(arrays).map(([k, v]) => [k, [...v]])),
      pointers: buildPointersFromVariables(variables, arrays),
      activeArrayIndices: activeIdx,
    });
  };

  let idx = 0;
  while (idx < lines.length && steps.length < maxSteps) {
    const lineNum = idx + 1;
    const rawLine = lines[idx];
    const trimmed = rawLine.trim();

    if (isNonExecutableLine(trimmed)) {
      idx++;
      continue;
    }

    // 识别 Python `for var in range(...)` 或 C-style `for (int i = 0; i < N; i++)` 简单循环并展开最多 6 轮
    const pyFor = trimmed.match(/^for\s+(\w+)\s+in\s+range\(\s*(?:(\d+)\s*,\s*)?(\w+)\s*(?:,\s*(\d+)\s*)?\)\s*:/);
    const cFor = trimmed.match(/^for\s*\(\s*(?:int\s+)?(\w+)\s*=\s*(-?\d+)\s*;\s*\1\s*(<=?)\s*(\w+)\s*;\s*(?:\1\+\+|\+\+\1|\1\s*\+=\s*(\d+))\s*\)/);

    if (pyFor || cFor) {
      let loopVar = 'i';
      let start = 0;
      let endInclusive = 0;
      let stepInc = 1;
      const baseIndent = rawLine.search(/\S/);

      if (pyFor) {
        loopVar = pyFor[1];
        start = pyFor[2] !== undefined ? parseInt(pyFor[2], 10) : 0;
        const rawEnd = /^\d+$/.test(pyFor[3]) ? parseInt(pyFor[3], 10) : (typeof variables[pyFor[3]] === 'number' ? variables[pyFor[3]] : (primaryArr ? primaryArr.length : 4));
        endInclusive = rawEnd - 1;
        stepInc = pyFor[4] ? Math.max(1, parseInt(pyFor[4], 10)) : 1;
      } else if (cFor) {
        loopVar = cFor[1];
        start = parseInt(cFor[2], 10);
        const op = cFor[3];
        const rawEnd = /^\d+$/.test(cFor[4]) ? parseInt(cFor[4], 10) : (typeof variables[cFor[4]] === 'number' ? variables[cFor[4]] : (primaryArr ? primaryArr.length : 4));
        endInclusive = op === '<=' ? rawEnd : rawEnd - 1;
        stepInc = cFor[5] ? Math.max(1, parseInt(cFor[5], 10)) : 1;
      }

      // 收集循环体内的单层简单语句（最多 10 行）
      const bodyLines: { lineNum: number; trimmed: string }[] = [];
      let look = idx + 1;
      let braceDepth = trimmed.endsWith('{') ? 1 : 0;
      while (look < lines.length && bodyLines.length < 10) {
        const lt = lines[look].trim();
        const indent = lines[look].search(/\S/);
        if (pyFor) {
          if (lt && indent <= baseIndent) break;
        } else {
          if (lt === '}') {
            braceDepth--;
            look++;
            if (braceDepth <= 0) break;
            continue;
          }
          if (lt.includes('{')) braceDepth++;
          if (lt.includes('}')) braceDepth--;
        }
        if (!isNonExecutableLine(lt)) {
          bodyLines.push({ lineNum: look + 1, trimmed: lt });
        }
        look++;
        if (!pyFor && braceDepth === 0) break;
      }

      if (bodyLines.length > 0 && endInclusive >= start) {
        let rounds = 0;
        for (let val = start; val <= endInclusive && rounds < 6 && steps.length < maxSteps; val += stepInc, rounds++) {
          variables[loopVar] = val;
          pushStep(lineNum, `循环迭代：${loopVar} = ${val}`);
          for (const b of bodyLines) {
            if (steps.length >= maxSteps) break;
            const compound = b.trimmed.match(/^(\w+)\s*([+\-*])=\s*([^;]+);?$/);
            const assign = b.trimmed.match(/^(?:int|long|double|let|var|const|auto)?\s*(\w+)\s*=\s*([^;]+);?$/);
            const arrRefMatch = b.trimmed.match(/(\w+)\[(\w+)\]/);

            if (compound) {
              const cur = typeof variables[compound[1]] === 'number' ? variables[compound[1]] : 0;
              const rhs = evalSimpleNumericExpr(compound[3], variables, arrays);
              if (typeof rhs === 'number') {
                variables[compound[1]] =
                  compound[2] === '+' ? cur + rhs : compound[2] === '-' ? cur - rhs : cur * rhs;
              }
            } else if (assign && !assign[2].includes('{')) {
              variables[assign[1]] = evalSimpleNumericExpr(assign[2], variables, arrays);
            }

            let activeIdx: { arrayName: string; indices: number[]; status: 'active' }[] | undefined;
            if (arrRefMatch && arrays[arrRefMatch[1]]) {
              const refIdx = /^\d+$/.test(arrRefMatch[2]) ? parseInt(arrRefMatch[2], 10) : variables[arrRefMatch[2]];
              if (typeof refIdx === 'number' && refIdx >= 0 && refIdx < arrays[arrRefMatch[1]].length) {
                activeIdx = [{ arrayName: arrRefMatch[1], indices: [refIdx], status: 'active' }];
              }
            }
            pushStep(b.lineNum, `第 ${rounds + 1} 轮循环 · 行 ${b.lineNum}：${b.trimmed.slice(0, 44)}`, activeIdx);
          }
        }
        idx = look;
        continue;
      }
    }

    // 复合赋值与常规变量赋值
    const compound = trimmed.match(/^(\w+)\s*([+\-*])=\s*([^;]+);?$/);
    const incDec = trimmed.match(/^(\w+)(\+\+|--);?$/);
    const assignMatch = trimmed.match(/^(?:int|long|double|float|boolean|String|let|var|const|auto)?\s*(\w+)\s*=\s*([^;]+);?$/);

    if (compound) {
      const cur = typeof variables[compound[1]] === 'number' ? variables[compound[1]] : 0;
      const rhs = evalSimpleNumericExpr(compound[3], variables, arrays);
      if (typeof rhs === 'number') {
        variables[compound[1]] =
          compound[2] === '+' ? cur + rhs : compound[2] === '-' ? cur - rhs : cur * rhs;
      }
    } else if (incDec) {
      const cur = typeof variables[incDec[1]] === 'number' ? variables[incDec[1]] : 0;
      variables[incDec[1]] = incDec[2] === '++' ? cur + 1 : cur - 1;
    } else if (assignMatch && !assignMatch[2].includes('{') && !assignMatch[2].startsWith('[')) {
      variables[assignMatch[1]] = evalSimpleNumericExpr(assignMatch[2], variables, arrays);
    }

    pushStep(lineNum, `执行行 ${lineNum}：${trimmed.slice(0, 48)}`);
    idx++;
  }

  return steps.length > 0 ? steps : getScenarioForLanguage('binary-search', normalizedLang).steps;
}

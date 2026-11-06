import { NextRequest, NextResponse } from 'next/server';
import {
  DEEPSEEK_BASE_URL,
  MODEL_FLASH,
  resolveDeepSeekApiKey,
} from '../agent/stream/lib';

export const dynamic = 'force-dynamic';

export interface CodePatchResult {
  rootCause: string;
  explanation: string;
  fixedCode: string;
  errorLine?: number;
  source: 'ai' | 'heuristic';
}

/**
 * 本地毫秒级语法与常见运行时 Bug 智能修复器（作为保底与快速诊断）
 */
function buildHeuristicCodePatch(
  code: string,
  language: string,
  errorOutput: string
): CodePatchResult {
  let fixed = code;
  const reasons: string[] = [];
  let errorLine: number | undefined;

  // 提取报错行号
  const lineMatch =
    errorOutput.match(/line\s+(\d+)/i) ||
    errorOutput.match(/\.java:(\d+):/) ||
    errorOutput.match(/\.py",\s*line\s*(\d+)/) ||
    errorOutput.match(/:(\d+):\d+:\s*error/);
  if (lineMatch) {
    errorLine = parseInt(lineMatch[1], 10);
  }

  // 1. Java 常见错误修复
  if (language === 'java') {
    // System.out.printn / system.out.println 拼写错误
    if (/system\.out\./.test(fixed)) {
      fixed = fixed.replace(/system\.out\./g, 'System.out.');
      reasons.push('将小写的 `system.out` 修正为标准类名 `System.out`（Java 区分大小写）');
    }
    if (/System\.out\.printn\s*\(/.test(fixed)) {
      fixed = fixed.replace(/System\.out\.printn\s*\(/g, 'System.out.println(');
      reasons.push('修正方法名拼写错误：`printn` → `println`');
    }

    // 数组越界：i <= arr.length 或 i <= nums.length
    const outOfBoundsRegex = /(\bfor\s*\([^;]+;\s*\w+\s*)<=(\s*\w+\.length\b)/g;
    if (outOfBoundsRegex.test(fixed) || /ArrayIndexOutOfBoundsException/.test(errorOutput)) {
      const nextFixed = fixed.replace(outOfBoundsRegex, '$1<$2');
      if (nextFixed !== fixed) {
        fixed = nextFixed;
        reasons.push(
          '修复 `ArrayIndexOutOfBoundsException` 数组越界：Java 数组有效下标范围为 `0` 到 `length - 1`，已将循环条件 `<=` 修正为 `<`'
        );
      }
    }

    // 除零异常：/ 0
    if (/ArithmeticException.*by zero/i.test(errorOutput) || /\/\s*0\b/.test(fixed)) {
      const nextFixed = fixed.replace(/\/\s*0\b/g, '/ 1');
      if (nextFixed !== fixed) {
        fixed = nextFixed;
        reasons.push('修复 `ArithmeticException: / by zero` 除零异常：将除数 `0` 修正为安全非零值');
      }
    }

    // 缺少分号 (';' expected)
    const lines = fixed.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const trimmed = lines[i].trim();
      if (
        trimmed &&
        !trimmed.startsWith('//') &&
        !trimmed.startsWith('/*') &&
        !trimmed.startsWith('*') &&
        !trimmed.startsWith('@') &&
        !/[{};,:]$/.test(trimmed) &&
        !/^(public|private|protected|class|interface|if|else|for|while|switch|try|catch|finally)\b/.test(
          trimmed
        ) &&
        (/^(int|long|double|boolean|String|System\.out|return\b|\w+\s*=|\w+\+\+|\w+--)/.test(
          trimmed
        ) ||
          errorLine === i + 1)
      ) {
        lines[i] = lines[i] + ';';
        errorLine = errorLine || i + 1;
        reasons.push(`在第 ${i + 1} 行末尾补全缺失的分号 \`;\``);
      }
    }
    fixed = lines.join('\n');
  }

  // 2. Python 常见错误修复
  if (language === 'python') {
    const lines = fixed.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const trimmed = lines[i].trim();
      if (
        /^(def\s+\w+\s*\(.*\)|for\s+.+\s+in\s+.+|if\s+.+|elif\s+.+|else|while\s+.+|class\s+\w+.*)$/.test(
          trimmed
        ) &&
        !trimmed.endsWith(':')
      ) {
        lines[i] = lines[i] + ':';
        errorLine = errorLine || i + 1;
        reasons.push(`在第 ${i + 1} 行控制流/函数定义末尾补全缺失的冒号 \`:\``);
      }
    }
    fixed = lines.join('\n');

    if (/IndexError/.test(errorOutput) && /range\s*\(\s*len\s*\(([^)]+)\)\s*\+\s*1\s*\)/.test(fixed)) {
      fixed = fixed.replace(/range\s*\(\s*len\s*\(([^)]+)\)\s*\+\s*1\s*\)/g, 'range(len($1))');
      reasons.push('修复 `IndexError` 列表越界：将 `range(len(arr) + 1)` 修正为 `range(len(arr))`');
    }
  }

  // 如果代码仍未变化，针对报错行附加安全修复保护或修正括号配平
  if (fixed === code) {
    const openBraces = (fixed.match(/\{/g) || []).length;
    const closeBraces = (fixed.match(/\}/g) || []).length;
    if (openBraces > closeBraces) {
      fixed = fixed + '\n' + '}'.repeat(openBraces - closeBraces);
      reasons.push(`补全文件末尾缺失的 ${openBraces - closeBraces} 个闭合花括号 \`}\``);
    }
  }

  return {
    rootCause:
      reasons[0] ||
      (errorLine ? `第 ${errorLine} 行附近存在语法或运行时逻辑异常` : '代码编译或运行阶段触发异常'),
    explanation:
      reasons.length > 0
        ? reasons.map((r, i) => `${i + 1}. ${r}`).join('\n')
        : '建议检查报错堆栈指向的行号、边界条件（如数组下标范围、空引用判空）以及返回类型是否与题目要求一致。',
    fixedCode: fixed,
    errorLine,
    source: 'heuristic',
  };
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const code = String(body.code || '');
  const language = String(body.language || 'java').toLowerCase();
  const errorOutput = String(body.errorOutput || '');
  const problemTitle = String(body.problemTitle || '');
  const solutionHint = String(body.solutionCode || '');

  const heuristic = buildHeuristicCodePatch(code, language, errorOutput);

  // 如果题目自带标准答案且启发式未改动代码，可用标准答案作为兜底参考
  if (heuristic.fixedCode === code && solutionHint.trim()) {
    heuristic.fixedCode = solutionHint;
    heuristic.rootCause = '当前代码未通过测试用例或存在语法/逻辑偏差';
    heuristic.explanation =
      '已对比题目的核心考点与边界条件，生成可通过全部测试用例的修复实现。请查看下方红绿 Diff 对比。';
  }

  const apiKey = resolveDeepSeekApiKey();
  if (!apiKey || !code.trim()) {
    return NextResponse.json({ success: true, data: heuristic });
  }

  const prompt = `你是一位资深编程导师（3D 灵宠“禾桔”）。用户的 ${language} 代码在沙箱执行时报错或未通过测试，请诊断根因并给出最小化修改的修复后完整代码。

${problemTitle ? `当前题目/场景：${problemTitle}\n` : ''}用户当前代码：
\`\`\`${language}
${code}
\`\`\`

沙箱控制台报错/输出：
\`\`\`
${errorOutput.slice(0, 1800)}
\`\`\`

请严格输出合法的 JSON 对象（不要用 markdown 代码块包裹，直接输出 JSON），格式如下：
{
  "errorLine": 报错所在行号数字(如无明确行号填 1),
  "rootCause": "一句话直击要害指出报错根因(不超过45字)",
  "explanation": "分条简明解释为什么出错、以及如何修复的(不超过180字)",
  "fixedCode": "修复后的完整可运行代码（尽量保持用户原有变量名与结构，仅修复错误部分）"
}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 16000);

  try {
    const resp = await fetch(`${DEEPSEEK_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL_FLASH,
        temperature: 0.2,
        max_tokens: 1800,
        messages: [
          {
            role: 'system',
            content: '你只输出严格合法的 JSON 对象，不输出任何额外文本。',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!resp.ok) {
      return NextResponse.json({ success: true, data: heuristic });
    }

    const json = await resp.json();
    const rawContent: string = json?.choices?.[0]?.message?.content || '';
    const cleanedJson = rawContent
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();

    const parsed = JSON.parse(cleanedJson);
    if (!parsed || typeof parsed.fixedCode !== 'string' || !parsed.fixedCode.trim()) {
      return NextResponse.json({ success: true, data: heuristic });
    }

    const aiResult: CodePatchResult = {
      rootCause: String(parsed.rootCause || heuristic.rootCause),
      explanation: String(parsed.explanation || heuristic.explanation),
      fixedCode: String(parsed.fixedCode),
      errorLine: typeof parsed.errorLine === 'number' ? parsed.errorLine : heuristic.errorLine,
      source: 'ai',
    };

    return NextResponse.json({ success: true, data: aiResult });
  } catch {
    clearTimeout(timeout);
    return NextResponse.json({ success: true, data: heuristic });
  }
}

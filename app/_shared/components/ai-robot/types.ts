/**
 * AI 黑猫「禾桔」组件族的共享类型
 * 拆分自原 AI3DRobot.tsx（1880+ 行）：
 *   AI3DRobot.tsx    —— 编排层（状态 / Agent 调度 / 弹窗）
 *   ai-robot/CatStage.tsx    —— 3D 舞台（场景 / 灯光 / 注意力 / 思维气泡）
 *   ai-robot/ChatPanel.tsx   —— 对话气泡（消息流 / 产出物卡片）
 *   ai-robot/Composer.tsx    —— 输入坞（快捷操作 / 开关 / 语音 / 发送）
 *   ai-robot/TracePanel.tsx  —— Agent 执行轨迹（plan → act → observe）
 */

export interface SiteLinkItem {
  category: string;
  subject: string;
  name: string;
  href: string;
}

export interface CitationItem {
  index: number;
  title: string;
  url: string;
  domain: string;
  snippet: string;
}

export interface NoteDraftItem {
  title: string;
  content: string;
  category: string;
  technology: string;
  subcategory: string;
  tags: string[];
  isPublic: boolean;
}

export interface AgentStepItem {
  phase: 'plan' | 'act' | 'observe';
  tool?: string;
  label: string;
  detail?: string;
  status?: 'running' | 'done';
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  siteLinks?: SiteLinkItem[];
  citations?: CitationItem[];
  noteDraft?: NoteDraftItem;
  activeAgents?: string[];
  modelUsed?: string;
  agentSteps?: AgentStepItem[];
  offline?: boolean;
}

export type CatPosture = 'standing' | 'crouching' | 'custom';
export type BubbleSide = 'right' | 'left';

/** 舞台灯光情绪（B8：环境光随对话状态变化） */
export type StageMood = 'idle' | 'thinking' | 'searching' | 'speaking' | 'celebrate';

/** 思维气泡状态（B5：猫头顶的过程可视化） */
export interface ThoughtBubbleState {
  phase: 'thinking' | 'tool' | 'speaking';
  icon: string; // 💭 / 🧭 / 🌐 / 📝 / 🐾 / 🗣
  label?: string;
}

/** 采集当前背后打开页面的正文上下文（供站内伴读与笔记提炼使用） */
export function collectCurrentPageContext(): { pathname: string; contextText: string } {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return { pathname: '', contextText: '' };
  }
  const pathname = window.location.pathname;
  const h = document.querySelector('main h1, main h2, h1');
  const title = h?.textContent?.trim() || document.title || '';
  const mainEl = document.querySelector('main');
  const rawText = mainEl?.textContent || '';
  const cleaned = rawText.replace(/\s{3,}/g, '\n').trim();
  const body =
    cleaned.length > 6000
      ? cleaned.slice(0, 6000) + '\n...(内容过长已截断)'
      : cleaned;
  if (!title && !body) {
    return { pathname, contextText: '' };
  }
  return {
    pathname,
    contextText: `[当前学习页面]\n标题: ${title}\n路径: ${pathname}\n\n页面内容:\n${body}`
  };
}

// ============================================================
// 上下文快捷操作：按当前路由动态生成 chips（伴学叙事闭环）
// ============================================================

export interface QuickAction {
  label: string;
  text: string;
  opts?: { explicitAgent?: string };
}

/** 默认快捷操作（任意页面可用） */
const DEFAULT_ACTIONS: QuickAction[] = [
  { label: '解释当前页', text: '请解释当前页面的核心知识点，并举一个容易理解的例子。', opts: { explicitAgent: 'navigator' } },
  { label: '找课程', text: '请根据当前页面内容，帮我找相关的站内课程与练习。', opts: { explicitAgent: 'navigator' } },
  { label: '整理笔记', text: '请结合当前页面和我们的对话，整理一份学习笔记草稿，供我预览后保存。', opts: { explicitAgent: 'note' } },
  { label: '学习路线', text: '请结合我的问题，帮我制定一份循序渐进的学习路线。' },
];

/** 按路由返回上下文化的快捷操作 */
export function buildQuickActions(pathname: string): QuickAction[] {
  if (!pathname) return DEFAULT_ACTIONS;

  if (pathname.startsWith('/study')) {
    return [
      { label: '解释当前页', text: '请解释当前页面的核心知识点，并举一个容易理解的例子。', opts: { explicitAgent: 'navigator' } },
      { label: '出 3 道练习题', text: '请根据当前页面内容出 3 道由浅入深的练习题（先不给答案，我做完再请你批改）。' },
      { label: '本页重点笔记', text: '请结合当前页面，整理一份学习笔记草稿，供我预览后保存。', opts: { explicitAgent: 'note' } },
      { label: '相关课程', text: '请根据当前页面内容，帮我找相关的站内课程与练习。', opts: { explicitAgent: 'navigator' } },
    ];
  }
  if (pathname.startsWith('/challenges')) {
    return [
      { label: '给这题一点提示', text: '请根据我当前正在做的挑战题目，给一点循序渐进的提示（不要直接给完整答案）。' },
      { label: '相关知识点', text: '请帮我找与当前挑战题目相关的站内课程，我想先补补基础。', opts: { explicitAgent: 'navigator' } },
      { label: '错题总结笔记', text: '请结合我们刚才的讨论，把我容易出错的知识点整理成一份笔记草稿。', opts: { explicitAgent: 'note' } },
      { label: '讲解同类题型', text: '请讲解与当前题目同类型的题目的通用解法套路。' },
    ];
  }
  if (pathname.startsWith('/notes')) {
    return [
      { label: '总结我的笔记', text: '请总结我当前正在看的笔记的核心要点，帮我快速复习。' },
      { label: '笔记复习计划', text: '请根据这篇笔记的内容，帮我安排一个 3 天的复习计划。' },
      { label: '找相关课程', text: '请根据这篇笔记的主题，帮我找相关的站内课程深入学习。', opts: { explicitAgent: 'navigator' } },
    ];
  }
  if (pathname.startsWith('/code')) {
    return [
      { label: '解释这段代码', text: '请解释我编辑器里这段代码的作用与执行流程，指出可以改进的地方。' },
      { label: '帮我找 bug', text: '请帮我检查当前代码可能存在的 bug 或边界问题，给出修改建议。' },
      { label: '保存为笔记', text: '请把当前代码和你的讲解整理成一份笔记草稿，供我预览后保存。', opts: { explicitAgent: 'note' } },
    ];
  }
  return DEFAULT_ACTIONS;
}

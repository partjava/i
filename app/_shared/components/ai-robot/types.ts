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

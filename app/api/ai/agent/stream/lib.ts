/**
 * AI Agent 流式接口的纯逻辑层
 * ============================================================
 * 从 route.ts 抽出的可单测部分（vitest 用例见同目录 *.test.ts）：
 * - 密钥解析 / 站内路由关键词检索（兜底层）
 * - RAG 向量检索（4096 维特征哈希 + TF-IDF + 标题词面混合打分）
 * - Function Calling 工具 schema / 参数容错解析 / 结果摘要
 * - 工具执行器（站内检索 / 联网深搜 / 写笔记 / 3D 神态控制）
 *
 * 注意：fnv1a / tokenize / DIM 必须与 scripts/build-rag-index.mjs 和
 * partjava-ai/agents/rag_index.py 严格一致，否则双端向量空间错位。
 * ============================================================
 */

import fs from 'fs';
import path from 'path';
import { navigationItems } from '@shared/data/navigation';
import ragIndexJson from '@shared/data/rag-index.json';

export const DEEPSEEK_BASE_URL = (process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com/v1').replace(/\/$/, '');
export const MODEL_FLASH = process.env.DEEPSEEK_MODEL_FLASH || 'deepseek-flash';
export const MODEL_PRO = process.env.DEEPSEEK_MODEL_PRO || 'deepseek-v4-pro';
export const MAX_TOOL_STEPS = 4;

// ============ 密钥解析 ============

// 自动从环境变量或 ../partjavadata/secrets/partjava-ai.env 读取统一管理的 DeepSeek API Key
export function resolveDeepSeekApiKey(): string {
  if (process.env.DEEPSEEK_API_KEY && !process.env.DEEPSEEK_API_KEY.startsWith('your_')) {
    return process.env.DEEPSEEK_API_KEY.trim();
  }
  if (process.env.AI_API_KEY && !process.env.AI_API_KEY.startsWith('your_')) {
    return process.env.AI_API_KEY.trim();
  }
  const candidateFiles = [
    path.resolve(process.cwd(), '../partjavadata/secrets/partjava-ai.env'),
    path.resolve(process.cwd(), '../partjavadata/secrets/.env.local'),
    path.resolve(process.cwd(), '../partjavadata/secrets/.env.production'),
    path.resolve(process.cwd(), '.env.local'),
    path.resolve(process.cwd(), '.env.production'),
  ];
  for (const filePath of candidateFiles) {
    try {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const m =
          content.match(/DEEPSEEK_API_KEY\s*=\s*([^\s#]+)/) ||
          content.match(/AI_API_KEY\s*=\s*([^\s#]+)/);
        if (m && m[1]) {
          return m[1].trim().replace(/^['"]|['"]$/g, '');
        }
      }
    } catch {}
  }
  return '';
}

// ============ 站内路由：关键词检索（RAG 兜底层） ============

export interface SiteRouteItem {
  category: string;
  subject: string;
  name: string;
  href: string;
  keywords: string;
}

export interface SiteLinkResult {
  category: string;
  subject: string;
  name: string;
  href: string;
}

// 构建全站 310+ 页面路由索引
export function buildAllSiteRoutes(): SiteRouteItem[] {
  const routes: SiteRouteItem[] = [
    { category: '核心功能', subject: '星际编程闯关', name: '编程挑战与题库闯关', href: '/challenges', keywords: '挑战 刷题 题库 闯关 排行榜 练习 编程题' },
    { category: '核心功能', subject: '在线代码沙箱', name: '多语言在线代码编辑器与3D算法推演', href: '/code/editor', keywords: '代码 编辑器 运行 编译 在线编程 沙箱 ide 3d算法 可视化' },
    { category: '核心功能', subject: '全栈知识图谱', name: '全栈知识星系图谱与进阶路线', href: '/knowledge-graph', keywords: '知识图谱 图谱 学习路线 知识库 星系 体系 导图' },
    { category: '核心功能', subject: '随堂笔记中心', name: '学习笔记广场与我的笔记', href: '/notes', keywords: '笔记 markdown 记录 总结 收藏 公开笔记' },
    { category: '核心功能', subject: '3D算法可视化', name: '3D 交互式算法实验室', href: '/study/computer/ds/basic', keywords: '3d算法 可视化 红黑树 排序 图论 链表 二叉树 动画' },
    { category: '核心功能', subject: '极客解压游戏', name: '趣味编程小游戏中心', href: '/tools/game', keywords: '游戏 放松 解压 贪吃蛇 2048' },
  ];

  Object.entries(navigationItems).forEach(([catName, subjects]) => {
    subjects.forEach((subj) => {
      if (subj.href) {
        routes.push({
          category: catName,
          subject: subj.name,
          name: subj.name,
          href: subj.href,
          keywords: `${catName} ${subj.name} ${subj.href}`.toLowerCase(),
        });
      }
      subj.subitems?.forEach((sub) => {
        routes.push({
          category: catName,
          subject: subj.name,
          name: `${subj.name} · ${sub.name}`,
          href: sub.href,
          keywords: `${catName} ${subj.name} ${sub.name} ${sub.href}`.toLowerCase(),
        });
      });
    });
  });

  return routes;
}

const ALL_SITE_ROUTES = buildAllSiteRoutes();

export function matchSiteRoutes(query: string, currentPath?: string, topK = 4): SiteLinkResult[] {
  const q = (query || '').toLowerCase().trim();
  if (!q) return [];
  const terms = new Set<string>(q.match(/[a-z0-9+#.]+|[\u4e00-\u9fa5]{2,}/g) || []);
  const zhBlocks = q.match(/[\u4e00-\u9fa5]{2,}/g) || [];
  zhBlocks.forEach((b) => {
    for (let i = 0; i < b.length - 1; i++) {
      terms.add(b.slice(i, i + 2));
    }
  });

  const scored: Array<{ score: number; item: SiteRouteItem }> = [];
  for (const item of ALL_SITE_ROUTES) {
    let score = item.href === currentPath ? 1.5 : 0;
    const nameLower = item.name.toLowerCase();
    const subjLower = item.subject.toLowerCase();
    terms.forEach((t) => {
      if (t.length < 2) return;
      if (nameLower.includes(t)) score += 5;
      else if (subjLower.includes(t)) score += 3.5;
      else if (item.keywords.includes(t)) score += 2;
    });
    if (score >= 2) scored.push({ score, item });
  }
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK).map(({ item }) => ({
    category: item.category,
    subject: item.subject,
    name: item.name,
    href: item.href,
  }));
}

// ============ RAG 向量检索（与 build-rag-index.mjs 同构） ============

const RAG_DIM = 4096;
const RAG_THRESHOLD = 0.15; // 混合得分低于该值视为无强相关结果，回落关键词检索

interface RagDoc {
  href: string;
  title: string;
  category: string;
  subject: string;
  text: string;
  vec: number[][];
}

interface RagIndexFile {
  version: number;
  dim: number;
  docCount: number;
  idf: Record<string, number>;
  docs: RagDoc[];
}

const RAG_INDEX: RagIndexFile = ragIndexJson as unknown as RagIndexFile;

const STOPWORDS = new Set([
  '的', '了', '是', '在', '和', '与', '或', '及', '等', '着', '有', '无', '这', '那', '你', '我',
  '他', '她', '它', '们', '个', '也', '不', '为', '到', '说', '要', '会', '对', '上', '下',
  'the', 'a', 'an', 'of', 'to', 'and', 'or', 'in', 'on', 'for', 'with', 'is', 'are', 'be', 'as', 'by', 'at', 'it', 'this', 'that',
]);

// FNV-1a 32 位哈希（与索引构建脚本 / Python 端严格一致，不可改动）
export function fnv1a(str: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

function featureIndex(token: string): number {
  return fnv1a(token) % RAG_DIM;
}

function featureSign(token: string): number {
  return (fnv1a(token + '~') & 1) === 1 ? -1 : 1;
}

export function tokenize(text: string): string[] {
  const tokens: string[] = [];
  const lower = String(text || '').toLowerCase();
  for (const w of lower.match(/[a-z0-9][a-z0-9+#.]{1,30}/g) || []) {
    if (!STOPWORDS.has(w)) tokens.push(w);
  }
  for (const run of lower.match(/[\u4e00-\u9fa5]{2,}/g) || []) {
    for (let i = 0; i < run.length - 1; i++) {
      const bg = run.slice(i, i + 2);
      if (!STOPWORDS.has(bg)) tokens.push(bg);
    }
    if (run.length === 2) tokens.push(run);
  }
  return tokens;
}

/** 稀疏向量余弦相似度（vec 为 [idx, weight] 数组，按 idx 有序性不假设，用 Map 加速） */
function cosineSparse(docVec: number[][], queryVec: Array<[number, number]>): number {
  if (queryVec.length === 0 || docVec.length === 0) return 0;
  const useMap = docVec.length > 32;
  const docMap = useMap ? new Map<number, number>(docVec.map(([i, w]) => [i, w])) : null;
  let dot = 0;
  for (const [idx, w] of Array.from(queryVec)) {
    if (docMap) {
      const dw = docMap.get(idx);
      if (dw !== undefined) dot += w * dw;
    } else {
      for (const [i2, w2] of docVec) {
        if (i2 === idx) {
          dot += w * w2;
          break;
        }
      }
    }
  }
  return dot; // 双方都已 L2 归一化，点积即余弦
}

export interface RagSearchResult extends SiteLinkResult {
  score: number;
  snippet?: string;
}

/**
 * RAG 混合检索：0.6 × 向量余弦 + 0.4 × 标题词面匹配（TF-IDF 加权）。
 * 无强相关结果时返回空数组，由调用方回落关键词检索。
 */
export function ragSearch(query: string, topK = 4): RagSearchResult[] {
  const qTokens = tokenize(query);
  if (qTokens.length === 0 || !RAG_INDEX.docs?.length) return [];

  const qf = new Map<string, number>();
  for (const t of qTokens) {
    const idf = RAG_INDEX.idf?.[t] || 1.0;
    qf.set(t, (qf.get(t) || 0) + idf);
  }
  let qnorm = 0;
  const qFeats: Array<[number, number]> = [];
  for (const [t, w] of Array.from(qf.entries())) {
    const v = featureSign(t) * w;
    qnorm += v * v;
    qFeats.push([featureIndex(t), v]);
  }
  qnorm = Math.sqrt(qnorm) || 1;
  const qFeatN: Array<[number, number]> = qFeats.map(([i, w]) => [i, w / qnorm]);

  let lexDen = 0;
  for (const t of Array.from(qf.keys())) lexDen += qf.get(t) || 0;

  const scored: RagSearchResult[] = RAG_INDEX.docs.map((d) => {
    const cos = cosineSparse(d.vec, qFeatN);
    let lexNum = 0;
    if (lexDen > 0) {
      const titleToks = new Set(tokenize(`${d.title} ${d.subject} ${d.href}`));
      for (const t of Array.from(qf.keys())) {
        if (titleToks.has(t)) lexNum += qf.get(t) || 0;
      }
    }
    const lexical = lexDen > 0 ? lexNum / lexDen : 0;
    return {
      category: d.category,
      subject: d.subject,
      name: d.title,
      href: d.href,
      score: 0.6 * cos + 0.4 * lexical,
      snippet: d.text?.slice(0, 100),
    };
  });

  scored.sort((a, b) => b.score - a.score);
  const hits = scored.filter((r) => r.score >= RAG_THRESHOLD).slice(0, topK);
  return hits;
}

/** 站内检索统一入口：RAG 优先，低置信回落关键词（混合检索兜底链） */
export function searchSitePages(query: string, currentPath?: string, topK = 4): SiteLinkResult[] {
  const ragHits = ragSearch(query, topK);
  if (ragHits.length > 0) {
    return ragHits.map(({ score, snippet, ...link }) => link);
  }
  return matchSiteRoutes(query, currentPath, topK);
}

// ============ 精选权威索引（联网深搜离线兜底） ============

export const CURATED_AUTHORITIES = [
  {
    keywords: 'java 虚拟线程 virtual thread jdk21 jep444 多线程 并发 thread',
    title: 'JEP 444: Virtual Threads - OpenJDK Official Specification',
    url: 'https://openjdk.org/jeps/444',
    domain: 'openjdk.org',
    snippet: 'OpenJDK 官方 JEP 444 规范文档：深入解析 Java 虚拟线程的设计目标、调度模型与高并发最佳实践。',
  },
  {
    keywords: 'java 文档 教程 标准库 api jdk oracle collections stream',
    title: 'Oracle Java SE Documentation & Dev.java Official Portal',
    url: 'https://dev.java/learn/',
    domain: 'dev.java',
    snippet: 'Oracle 官方现代 Java 开发者门户（Dev.java），涵盖 Java 核心语法、集合框架、Stream API 与 JVM 调优。',
  },
  {
    keywords: 'spring boot springcloud 微服务 框架 后端 javaee',
    title: 'Spring Boot & Spring Framework Official Reference',
    url: 'https://docs.spring.io/spring-boot/index.html',
    domain: 'docs.spring.io',
    snippet: 'Spring 官方参考手册：涵盖 Spring Boot 自动装配、Spring AI 与微服务架构治理。',
  },
  {
    keywords: '红黑树 二叉树 算法 数据结构 排序 动态规划 图论 复杂度',
    title: 'Hello Algo - 交互式数据结构与算法权威图解指南',
    url: 'https://www.hello-algo.com/',
    domain: 'hello-algo.com',
    snippet: '开源数据结构与算法动画图解教程，详细推导二叉树、红黑树旋转、图论最短路径与动态规划。',
  },
  {
    keywords: 'react 前端 js javascript css html mdn 浏览器 dom',
    title: 'MDN Web Docs (Mozilla Developer Network)',
    url: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript',
    domain: 'developer.mozilla.org',
    snippet: 'Web 前端权威 MDN 官方技术文档，涵盖 ES6+ 标准、Promise 异步机制与浏览器渲染原理。',
  },
  {
    keywords: '安全 渗透 xss csrf sql注入 漏洞 owasp 密码学 防护',
    title: 'OWASP Top 10 & Cheat Sheet Series - Web 安全权威指南',
    url: 'https://cheatsheetseries.owasp.org/',
    domain: 'owasp.org',
    snippet: 'OWASP 官方安全编码备忘录：详解 SQL 注入防护、XSS 防御、CSRF 令牌与渗透测试规范。',
  },
];

// ============ Function Calling 工具层 ============

export const TOOL_LABELS: Record<string, { label: string; desc: string }> = {
  search_site_pages: { label: '🧭 站内课程检索', desc: 'RAG 向量检索 PartJava 310+ 站内课程页面' },
  web_search: { label: '🌐 联网深搜', desc: '调用搜索引擎检索并抓取权威外部资料' },
  draft_note: { label: '📝 提炼写笔记', desc: '把对话或当前页面提炼为结构化 Markdown 笔记草稿' },
  set_companion_state: { label: '🐾 3D 神态控制', desc: '控制 3D 黑猫禾桔的情绪、动作与姿态' },
};

export const TOOL_AGENT_BADGE: Record<string, string> = {
  search_site_pages: '🧭 站内课程检索',
  web_search: '🌐 联网深搜',
  draft_note: '📝 笔记提炼',
  set_companion_state: '🐾 3D 伴侣',
};

export const TOOL_SCHEMAS = [
  {
    type: 'function',
    function: {
      name: 'search_site_pages',
      description:
        '基于 RAG 向量检索在 PartJava 平台 310+ 个站内课程页面中找到与用户问题最语义相关的页面，返回可点击直达的课程链接列表。当用户想找学习资源、课程、教程，或问题与站内某一门课程强相关时调用。',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: '检索关键词，从用户问题中提炼出的技术主题词' },
        },
        required: ['query'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'web_search',
      description:
        '联网检索外部权威技术资料（官方文档、规范、教程）并抓取正文供回答引用。当问题涉及最新版本特性、官方规范、站内未覆盖的知识，或用户要求联网搜索/给出权威来源时调用。',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: '面向搜索引擎的专业检索词（可为英文）' },
        },
        required: ['query'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'draft_note',
      description:
        '把当前对话与页面内容提炼为一篇结构化 Markdown 学习笔记草稿（自动分类、打标签，用户可一键保存入库）。当用户表达『写笔记 / 总结一下 / 记下来』等意图时调用。',
      parameters: {
        type: 'object',
        properties: {
          topic: { type: 'string', description: '笔记主题，默认取用户当前的问题' },
        },
        required: [],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'set_companion_state',
      description:
        '控制 3D 黑猫助教『禾桔』的神态与动作。当用户撸猫、夸奖、要求坐下/站起来/跳一下，或回答场景值得庆祝时调用，增强陪伴感。',
      parameters: {
        type: 'object',
        properties: {
          mood: { type: 'string', enum: ['happy', 'curious', 'normal'], description: '情绪：开心/好奇/平静' },
          action: { type: 'string', enum: ['jump', 'tilt_head', 'wag_tail', 'talk'], description: '动作：跳跃/歪头/摇尾/说话' },
          posture: { type: 'string', enum: ['standing', 'crouching'], description: '姿态切换：乖巧坐姿/爬起站姿' },
        },
        required: ['mood'],
      },
    },
  },
];

export function summarizeToolResult(name: string, result: any): string {
  try {
    if (name === 'search_site_pages') return `RAG 命中 ${(result.links || []).length} 个站内课程页`;
    if (name === 'web_search') return result.source === 'recommended' ? `实时搜索不可用，推荐 ${(result.citations || []).length} 篇文档` : `实时搜索获得 ${(result.citations || []).length} 条结果，读取 ${result.fetchedCount || 0} 篇正文`;
    if (name === 'draft_note') return `已生成笔记草稿《${result.title || ''}》`;
    if (name === 'set_companion_state') return `禾桔已切换神态：${result.state || ''}`;
  } catch {}
  return '执行完成';
}

export function parseToolArguments(raw: unknown): Record<string, any> {
  if (!raw) return {};
  if (typeof raw === 'object') return raw as Record<string, any>;
  try {
    const parsed = JSON.parse(String(raw));
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    const s = String(raw);
    const start = s.indexOf('{');
    const end = s.lastIndexOf('}');
    if (start >= 0 && end > start) {
      try {
        const parsed = JSON.parse(s.slice(start, end + 1));
        return parsed && typeof parsed === 'object' ? parsed : {};
      } catch {}
    }
    return {};
  }
}

export const AGENCY_INSTRUCTIONS =
  '\n【自主决策与工具使用说明】\n' +
  '你是一个具备工具调用能力的智能体（Agent），可以在回答前自主决定调用下列工具获取信息：\n' +
  '- search_site_pages：RAG 检索站内课程页面（找学习资源/课程时用）\n' +
  '- web_search：联网检索权威外部资料（最新特性/官方规范/用户要求权威来源时用）\n' +
  '- draft_note：为用户生成结构化笔记草稿（用户表达『写笔记/总结/记下来』意图时必须调用）\n' +
  '- set_companion_state：控制你的 3D 猫咪神态（用户撸猫/夸奖/要求动作时调用）\n' +
  '规则：需要信息就先调用工具再回答，不需要就直接回答；一次可以调用多个工具；引用检索结果时使用 [编号] 角标或 Markdown 链接。\n';

// ============ 工具执行器（副作用经 sendSSE 回调推送） ============

export interface ToolCtx {
  message: string;
  history: Array<{ role: string; content: string }>;
  pageContext: string;
  apiKey: string;
  sendSSE: (event: string, data: any) => void;
  state: {
    siteLinks: any[];
    citations: any[];
    ragFragments: string[];
    noteDraft: any;
    reaction: any;
  };
}

/** 执行 LLM 决策出的工具调用；副作用（site_links/citations/note_draft/cat_command）通过 SSE 推送 */
export async function executeTool(name: string, args: Record<string, any>, ctx: ToolCtx): Promise<Record<string, any>> {
  try {
    switch (name) {
      case 'search_site_pages': {
        const query = String(args.query || '').trim();
        if (!query) return { ok: false, error: '缺少检索关键词 query' };
        const links = searchSitePages(query, undefined, 4);
        if (links.length > 0) {
          ctx.state.siteLinks = links;
          ctx.sendSSE('site_links', { links });
          return { ok: true, count: links.length, links };
        }
        return { ok: true, count: 0, links: [], note: '站内暂无强相关页面' };
      }
      case 'web_search': {
        const query = String(args.query || '').trim();
        if (!query) return { ok: false, error: '缺少检索词 query' };
        ctx.sendSSE('search_status', { stage: 'searching', text: '🌐 正在检索权威技术站点并抓取正文...' });
        let citations: any[] = [];
        const fetchedSnippets: string[] = [];
        if (ctx.apiKey) {
          try {
            const sResp = await fetch(`${DEEPSEEK_BASE_URL}/tools/search`, {
              method: 'POST',
              headers: { Authorization: `Bearer ${ctx.apiKey}`, 'Content-Type': 'application/json' },
              body: JSON.stringify({ query, top_k: 4 }),
              signal: AbortSignal.timeout(10000),
            });
            if (sResp.ok) {
              const sJson = await sResp.json();
              const rawList = sJson.results || sJson.data || [];
              citations = rawList.slice(0, 4).map((it: any, idx: number) => {
                const url = it.url || it.link || '';
                let domain = 'authority.org';
                try {
                  domain = new URL(url).hostname.replace(/^www\./, '');
                } catch {}
                return {
                  index: idx + 1,
                  title: it.title || domain,
                  url,
                  domain,
                  snippet: it.snippet || it.content || '',
                  source: 'live', contentFetched: false,
                };
              });
            }
            for (const cite of citations.slice(0, 2)) {
              try {
                const fResp = await fetch(`${DEEPSEEK_BASE_URL}/tools/fetch`, {
                  method: 'POST',
                  headers: { Authorization: `Bearer ${ctx.apiKey}`, 'Content-Type': 'application/json' },
                  body: JSON.stringify({ url: cite.url }),
                  signal: AbortSignal.timeout(8000),
                });
                if (fResp.ok) {
                  const fJson = await fResp.json();
                  const textBody = fJson.content || fJson.markdown || fJson.text || '';
                  if (textBody) {
                    cite.contentFetched = true;
                    fetchedSnippets.push(`[${cite.index}] ${cite.title} (${cite.url}):\n${String(textBody).slice(0, 2500)}`);
                  }
                }
              } catch {}
            }
          } catch {}
        }
        if (citations.length === 0) {
          const msgLower = query.toLowerCase();
          const matchedAuth = CURATED_AUTHORITIES.filter((doc) =>
            doc.keywords.split(' ').some((kw) => msgLower.includes(kw))
          );
          const finalAuth = matchedAuth.length > 0 ? matchedAuth.slice(0, 3) : CURATED_AUTHORITIES.slice(0, 2);
          citations = finalAuth.map((d, idx) => ({
            index: idx + 1,
            title: d.title,
            url: d.url,
            domain: d.domain,
            snippet: d.snippet,
            source: 'recommended', contentFetched: false,
          }));
        }
        ctx.state.citations = citations;
        if (fetchedSnippets.length > 0) {
          ctx.state.ragFragments.push(
            '【联网深搜抓取到的权威外部资料】:\n' + fetchedSnippets.join('\n\n')
          );
        }
        const source = citations.every(c => c.source === 'recommended') ? 'recommended' : 'live';
        ctx.sendSSE('citations', { stage: 'completed', source, citations });
        return {
          ok: true,
          count: citations.length,
          citations: citations.map((c) => ({ index: c.index, title: c.title, url: c.url, domain: c.domain, snippet: c.snippet, source: c.source, contentFetched: c.contentFetched })),
          source,
          fetchedCount: fetchedSnippets.length,
          fetchedExcerpts: fetchedSnippets.map((s) => s.slice(0, 1200)),
          note: source === 'recommended'
            ? '实时搜索未获得结果，以下为预置推荐文档，未验证实时内容；请明确告知用户，不要声称已经联网检索或读取正文。'
            : fetchedSnippets.length > 0 ? '已读取部分正文，回答时请引用 [编号] 并区分摘要与正文。' : '仅获得实时搜索摘要，未读取正文；不要声称已经读取文档全文。',
        };
      }
      case 'draft_note': {
        const topic = String(args.topic || ctx.message || '').trim();
        ctx.sendSSE('search_status', { stage: 'writing_note', text: '📝 正在提炼对话与当前页面，生成结构化 Markdown 笔记...' });
        const convStr = ctx.history
          .slice(-6)
          .map((m) => `${m.role === 'user' ? '用户' : '禾桔'}: ${m.content}`)
          .join('\n');
        let noteDraft: any = null;
        if (ctx.apiKey) {
          try {
            const notePrompt =
              `你是 PartJava 温暖书房的【智能体二：知识提炼与自动写笔记专家】。\n` +
              `请将以下内容整理为高质量 Markdown 学习笔记，严格只返回一个 JSON 对象（不含 \`\`\`json 标记）：\n` +
              `{"title":"不超过28字标题","content":"Markdown正文(含##分节、列表与代码块)","category":"算法/前端/后端/数据库/AI/安全/软件工程","technology":"Java/Python/React等","subcategory":"子分类","tags":["标签1","标签2"],"isPublic":false}\n\n` +
              `对话内容:\n${convStr}\n\n当前页面:\n${ctx.pageContext.slice(0, 8000)}`;
            const nResp = await fetch(`${DEEPSEEK_BASE_URL}/chat/completions`, {
              method: 'POST',
              headers: { Authorization: `Bearer ${ctx.apiKey}`, 'Content-Type': 'application/json' },
              body: JSON.stringify({
                model: MODEL_FLASH,
                messages: [{ role: 'user', content: notePrompt }],
                stream: false,
              }),
              signal: AbortSignal.timeout(25000),
            });
            if (nResp.ok) {
              const nData = await nResp.json();
              let rawJson = nData?.choices?.[0]?.message?.content || '';
              const mBlock = rawJson.match(/```(?:json)?\s*([\s\S]*?)```/);
              if (mBlock) rawJson = mBlock[1];
              const sIdx = rawJson.indexOf('{');
              const eIdx = rawJson.lastIndexOf('}');
              if (sIdx >= 0 && eIdx > sIdx) {
                noteDraft = JSON.parse(rawJson.slice(sIdx, eIdx + 1));
              }
            }
          } catch {}
        }
        if (!noteDraft) {
          const mTitle = ctx.pageContext.match(/标题:\s*(.+)/);
          const autoTitle = mTitle
            ? `${mTitle[1].trim()} · 禾桔智能提炼笔记`
            : `PartJava 学习笔记 · ${topic.slice(0, 18)}`;
          noteDraft = {
            title: autoTitle.slice(0, 35),
            content:
              `## 一、 核心知识点提炼\n\n` +
              (convStr ? `${convStr}\n\n` : '') +
              (ctx.pageContext ? `## 二、 当前课程页面重点\n\n${ctx.pageContext.slice(0, 1800)}\n\n` : '') +
              `## 三、 实战与复习建议\n\n- 建议前往 PartJava **在线代码编辑器 (\`/code/editor\`)** 动手实践；\n- 在 **星际编程挑战 (\`/challenges\`)** 中完成对应专项刷题巩固。`,
            category: ctx.pageContext.includes('/ai/')
              ? 'AI'
              : ctx.pageContext.includes('/security/')
              ? '安全'
              : ctx.pageContext.includes('/frontend/')
              ? '前端'
              : '后端',
            technology: ctx.pageContext.includes('/python/') ? 'Python' : 'Java',
            subcategory: 'AI智能总结',
            tags: ['禾桔笔记', '核心考点', 'PartJava'],
            isPublic: false,
          };
        }
        ctx.state.noteDraft = noteDraft;
        ctx.sendSSE('note_draft', { note: noteDraft });
        return {
          ok: true,
          title: noteDraft.title || '',
          category: noteDraft.category || '',
          technology: noteDraft.technology || '',
          note: '笔记草稿已推送给用户预览，可在回答中提示用户点击保存',
        };
      }
      case 'set_companion_state': {
        const reaction: any = { mood: args.mood || 'normal', action: args.action || 'talk' };
        if (args.posture) reaction.posture = args.posture;
        ctx.state.reaction = reaction;
        ctx.sendSSE('cat_command', reaction);
        return { ok: true, state: `${reaction.mood} / ${reaction.action}${args.posture ? ` / ${args.posture}` : ''}` };
      }
      default:
        return { ok: false, error: `未知工具: ${name}` };
    }
  } catch (e: any) {
    return { ok: false, error: `工具执行异常: ${e?.message || e}` };
  }
}

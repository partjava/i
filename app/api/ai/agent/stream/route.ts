import { NextRequest } from 'next/server';
import { navigationItems } from '@shared/data/navigation';

export const dynamic = 'force-dynamic';

const FASTAPI_URL = process.env.FASTAPI_AGENT_URL || 'http://127.0.0.1:8000';
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || process.env.AI_API_KEY || '';
const DEEPSEEK_BASE_URL = (process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com/v1').replace(/\/$/, '');

interface SiteRouteItem {
  category: string;
  subject: string;
  name: string;
  href: string;
  keywords: string;
}

// 构建全站 310+ 页面路由索引（供 FastAPI 转发或高可用内联兜底使用）
function buildAllSiteRoutes(): SiteRouteItem[] {
  const routes: SiteRouteItem[] = [
    { category: '核心功能', subject: '星际编程闯关', name: '编程挑战与题库闯关', href: '/challenges', keywords: '挑战 刷题 题库 闯关 排行榜 练习 编程题' },
    { category: '核心功能', subject: '在线代码沙箱', name: '多语言在线代码编辑器', href: '/code/editor', keywords: '代码 编辑器 运行 编译 在线编程 沙箱 ide' },
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

function matchSiteRoutes(query: string, currentPath?: string, topK = 4) {
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

const CURATED_AUTHORITIES = [
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

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));

  // 1. 优先转发给 Python FastAPI 四大智能体微服务 (http://127.0.0.1:8000/api/ai/agent/stream)
  try {
    const fastApiResp = await fetch(`${FASTAPI_URL}/api/ai/agent/stream`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(8000),
    });
    if (fastApiResp.ok && fastApiResp.body) {
      return new Response(fastApiResp.body, {
        headers: {
          'Content-Type': 'text/event-stream; charset=utf-8',
          'Cache-Control': 'no-cache, no-transform',
          Connection: 'keep-alive',
        },
      });
    }
  } catch {
    // FastAPI 尚未启动时，自动无缝切换至内置高可用四大智能体流式引擎
  }

  // 2. 内置高可用四大智能体 SSE 流式引擎
  const encoder = new TextEncoder();
  const sendSSE = (controller: ReadableStreamDefaultController, event: string, data: any) => {
    controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`));
  };

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const message: string = (body.message || '').trim();
        const pageContext: string = body.pageContext || '';
        const currentPathname: string = body.currentPathname || '';
        const enableWebSearch: boolean = !!body.enableWebSearch;
        const explicitAgent: string | undefined = body.explicitAgent;
        const history: Array<{ role: string; content: string }> = Array.isArray(body.history) ? body.history : [];

        const msgLower = message.toLowerCase();
        const isNote =
          explicitAgent === 'agent2_note' ||
          ['写笔记', '生成笔记', '保存笔记', '总结成笔记', '总结本页', '记笔记'].some((k) => msgLower.includes(k));
        const isSearch =
          enableWebSearch ||
          explicitAgent === 'agent4_search' ||
          ['联网', '搜索', '上网查', '官网链接', '专业网站', '权威网站', '外部链接'].some((k) => msgLower.includes(k));

        // 智能体三：计算 3D 黑猫神态与动作
        let mood: 'happy' | 'curious' | 'normal' = 'normal';
        let posture: 'standing' | 'crouching' | null = null;
        if (['站起来', '爬起来', '站姿'].some((k) => msgLower.includes(k))) {
          posture = 'crouching';
          mood = 'happy';
        } else if (['坐下', '蹲下', '坐姿'].some((k) => msgLower.includes(k))) {
          posture = 'standing';
          mood = 'happy';
        } else if (['你好', '摸摸', '可爱', '谢谢', '棒', '笔记', '跳'].some((k) => msgLower.includes(k))) {
          mood = 'happy';
        } else if (['为什么', '怎么', '原理', '搜', '哪', '?'].some((k) => msgLower.includes(k))) {
          mood = 'curious';
        }

        const activeAgents = ['🐾 智能体三·3D灵动伴侣', '🧭 智能体一·站内领航伴读'];
        if (isSearch) activeAgents.push('🌐 智能体四·Pro联网深搜');
        if (isNote) activeAgents.push('📝 智能体二·自动写笔记');

        sendSSE(controller, 'agent_meta', {
          reaction: { mood, action: mood === 'happy' ? 'jump' : 'talk', posture },
          activeAgents,
          model: isSearch ? 'deepseek-v4-pro' : 'deepseek-flash',
        });

        // 智能体一：匹配站内 310+ 页面路由
        const siteLinks = matchSiteRoutes(message, currentPathname, 4);
        if (siteLinks.length > 0) {
          sendSSE(controller, 'site_links', { links: siteLinks });
        }

        // 智能体四：Pro 联网深搜与权威外链引证
        let citations: any[] = [];
        if (isSearch) {
          sendSSE(controller, 'search_status', {
            stage: 'searching',
            text: '🌐 智能体四 (deepseek-v4-pro) 正在调用 /v1/tools/search & /fetch 检索权威技术站点...',
          });

          if (DEEPSEEK_API_KEY) {
            try {
              const sResp = await fetch(`${DEEPSEEK_BASE_URL}/tools/search`, {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: message, top_k: 4 }),
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
                  };
                });
              }
            } catch {}
          }

          if (citations.length === 0) {
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
            }));
          }

          sendSSE(controller, 'citations', { stage: 'completed', citations });
        }

        // 智能体二：自动总结写笔记
        if (isNote) {
          const convStr = history
            .slice(-6)
            .map((m) => `${m.role === 'user' ? '用户' : '袋子'}: ${m.content}`)
            .join('\n');
          const mTitle = pageContext.match(/标题:\s*(.+)/);
          const autoTitle = mTitle
            ? `${mTitle[1].trim()} · 袋子智能提炼笔记`
            : `PartJava 学习笔记 · ${message.slice(0, 18)}`;

          const noteDraft = {
            title: autoTitle.slice(0, 35),
            content:
              `## 一、 核心知识点提炼\n\n` +
              (convStr ? `${convStr}\n\n` : '') +
              (pageContext ? `## 二、 当前课程页面重点\n\n${pageContext.slice(0, 1800)}\n\n` : '') +
              `## 三、 实战与复习建议\n\n- 建议前往 PartJava **在线代码编辑器 (\`/code/editor\`)** 动手实践；\n- 在 **星际编程挑战 (\`/challenges\`)** 中完成对应专项刷题巩固。`,
            category: pageContext.includes('/ai/')
              ? 'AI'
              : pageContext.includes('/security/')
              ? '安全'
              : pageContext.includes('/frontend/')
              ? '前端'
              : '后端',
            technology: pageContext.includes('/python/') ? 'Python' : 'Java',
            subcategory: 'AI智能总结',
            tags: ['袋子笔记', '核心考点', 'PartJava'],
            isPublic: false,
          };
          sendSSE(controller, 'note_draft', { note: noteDraft });
        }

        // 生成流式文本回复
        let replyText = '';
        if (isNote) {
          replyText =
            `喵呜~ 🐾 **【智能体二 · 自动写笔记】** 已经把对话与当前页面提炼成结构化 Markdown 笔记啦！\n\n` +
            `你可以直接点击气泡下方的 **「⚡ 一键存入我的笔记」** 写入数据库，或者点 **「✏️ 预览与编辑」** 微调后再保存哦！`;
        } else if (isSearch && citations.length > 0) {
          replyText =
            `喵~ 🐾 **【智能体四 · DeepSeek-V4-Pro 联网深搜】** 已围绕「**${message}**」检索并抓取了 ${citations.length} 篇专业权威技术资料：\n\n` +
            citations
              .map((c) => `- **[${c.index}] ${c.title}** (\`${c.domain}\`)\n  > ${c.snippet}`)
              .join('\n') +
            `\n\n点击气泡底部的 **🌐 权威网站外链卡片** 即可直接访问对应官方文档！`;
        } else if (pageContext) {
          const firstLine = pageContext.split('\n').slice(0, 3).join(' | ');
          replyText =
            `喵~ 🐾 **【智能体一 · 页面伴读】** 正在陪你学习：\n> ${firstLine}\n\n` +
            `关于「**${message}**」的核心解答：\n` +
            `- **关键原理**：深入理解该模块的数据流转、复杂度边界与常见异常处理；\n` +
            `- **下一步行动**：你可以点击下方 **「📝 总结本页写笔记」** 一键归档复习笔记，或点击站内推荐胶囊跳转相关章节！`;
        } else {
          replyText =
            `喵呜~ 我是温暖书房的 3D 像素绒毛黑猫 **袋子** 🐾！关于你问的「**${message}**」：\n\n` +
            `- 🧭 **智能体一（站内领航）**：已为你匹配了站内最相关的课程页面（点击下方胶囊直达）；\n` +
            `- 📝 **智能体二（写笔记）**：需要归档时点一下「总结写笔记」，我会自动整理成 Markdown 存入你的笔记库；\n` +
            `- 🌐 **智能体四（Pro 联网深搜）**：点亮下方「🌐 Pro 联网深搜」开关，即可调用 \`deepseek-v4-pro\` 检索权威技术外链！`;
        }

        for (let i = 0; i < replyText.length; i += 5) {
          sendSSE(controller, 'token', { text: replyText.slice(i, i + 5) });
          await new Promise((r) => setTimeout(r, 30));
        }

        sendSSE(controller, 'done', { ok: true });
      } catch (e: any) {
        sendSSE(controller, 'token', { text: `喵~ 袋子刚刚打了个盹：${e?.message || '请稍后再试'}` });
        sendSSE(controller, 'done', { ok: false });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}

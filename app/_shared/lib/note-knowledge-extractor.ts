export type GraphNodeCategory = 'root' | 'chapter' | 'concept' | 'code' | 'pitfall';

export interface KnowledgeGraphNode {
  id: string;
  name: string;
  category: GraphNodeCategory;
  symbolSize: number;
  summary: string;
  snippet?: string;
  sectionHeading?: string;
  value?: number;
}

export interface KnowledgeGraphLink {
  source: string;
  target: string;
  relation: string;
}

export interface TreeMindmapNode {
  name: string;
  category?: GraphNodeCategory;
  summary?: string;
  children?: TreeMindmapNode[];
}

export interface NoteFlashcard {
  id: string;
  question: string;
  answer: string;
  hint: string;
  difficulty: '基础' | '进阶' | '高频考点';
  tag: string;
  sectionHeading?: string;
}

export interface NoteInsightsData {
  nodes: KnowledgeGraphNode[];
  links: KnowledgeGraphLink[];
  tree: TreeMindmapNode;
  flashcards: NoteFlashcard[];
  source: 'ai' | 'ast';
}

interface ParsedSection {
  level: number;
  heading: string;
  body: string;
  bullets: string[];
  boldTerms: string[];
  codeTerms: string[];
  codeBlock?: string;
}

function cleanMarkdownText(raw: string): string {
  return raw
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^#+\s+/gm, '')
    .replace(/^>\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * 规范化笔记 Markdown：
 * 将仅包含单个短变量名/短算式（无换行、无语言标识且长度较短）的三反引号代码块收敛为行内代码，
 * 避免短短几个字母在正文中独占一整行厚重代码块。
 */
export function normalizeNoteMarkdown(raw: string): string {
  if (!raw) return '';
  return raw.replace(/```([a-zA-Z0-9_-]*)\r?\n([\s\S]*?)```/g, (fullMatch, lang: string, body: string) => {
    const trimmed = body.trim();
    const lines = trimmed.split(/\r?\n/);
    // 多行代码块保留原样
    if (lines.length !== 1) return fullMatch;
    const singleLine = lines[0].trim();
    // 仅有单个变量名、常数或极短表达式（如 v_new, -inf, P(s,a,s)=0, R(s,a,s), P*R）且无语句特征时，转为行内代码
    const isShortInlineToken =
      !lang &&
      singleLine.length > 0 &&
      singleLine.length <= 26 &&
      !/^(def |class |public |private |function |const |let |var |import |from |return |if |for |while |SELECT |INSERT |UPDATE )/i.test(singleLine) &&
      !singleLine.endsWith(';') &&
      !singleLine.endsWith('{') &&
      !singleLine.endsWith(':');

    if (isShortInlineToken) {
      return `\`${singleLine}\``;
    }
    return fullMatch;
  });
}

function isMeaningfulCodeTerm(term: string): boolean {
  const t = term.trim();
  if (t.length < 3 || t.length > 28) return false;
  if (/^[-+]?(?:inf|nan|\d+(?:\.\d+)?)$/i.test(t)) return false;
  if (/^(?:true|false|null|none|pass|break|continue)$/i.test(t)) return false;
  // 过滤纯短数学单字母乘加项（如 P*R, s', a, γ, P(s,a,s)=0）
  if (/^[A-Za-z]\s*[*+\-/=]\s*[A-Za-z0-9]+$/.test(t)) return false;
  if (/^[A-Za-z]\([a-z0-9,'"\s]+\)(?:=[0-9a-zA-Z+-]+)?$/i.test(t) && t.length <= 12) return false;
  return /[a-zA-Z_]{2,}/.test(t);
}

/**
 * 解析 Markdown 笔记结构，提取章节、加粗术语、行内代码、代码块与要点列表
 */
function parseMarkdownSections(title: string, content: string): ParsedSection[] {
  const normalizedContent = normalizeNoteMarkdown(content || '');
  const lines = normalizedContent.split(/\r?\n/);
  const sections: ParsedSection[] = [];
  let current: ParsedSection = {
    level: 1,
    heading: title || '核心概述',
    body: '',
    bullets: [],
    boldTerms: [],
    codeTerms: [],
  };

  let inCodeBlock = false;
  let currentCode = '';

  const flushSection = () => {
    const bodyText = current.body.trim();
    if (bodyText || current.bullets.length > 0 || current.codeBlock) {
      // 提取加粗词
      const boldMatches = Array.from(bodyText.matchAll(/\*\*([^*\n]{2,28})\*\*/g)).map(m =>
        m[1].replace(/[：:，,。！!？?]$/g, '').trim()
      );
      current.boldTerms = Array.from(new Set(boldMatches)).slice(0, 5);

      // 提取行内代码词（过滤无意义的极短算式或字面量，如 -inf, P*R, P(s,a,s)=0）
      const strippedCodeBlocks = bodyText.replace(/```[\s\S]*?```/g, '');
      const codeMatches = Array.from(strippedCodeBlocks.matchAll(/`([^`\n]{2,30})`/g))
        .map(m => m[1].trim())
        .filter(isMeaningfulCodeTerm);
      current.codeTerms = Array.from(new Set(codeMatches)).slice(0, 5);

      sections.push(current);
    }
  };

  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        currentCode = '';
      } else {
        inCodeBlock = false;
        if (!current.codeBlock && currentCode.trim()) {
          current.codeBlock = currentCode.trim().slice(0, 260);
        }
      }
      current.body += line + '\n';
      continue;
    }

    if (inCodeBlock) {
      currentCode += line + '\n';
      current.body += line + '\n';
      continue;
    }

    const headingMatch = line.match(/^(#{1,4})\s+(.+)$/);
    if (headingMatch) {
      flushSection();
      current = {
        level: headingMatch[1].length,
        heading: cleanMarkdownText(headingMatch[2]).slice(0, 32),
        body: '',
        bullets: [],
        boldTerms: [],
        codeTerms: [],
      };
      continue;
    }

    const bulletMatch = line.match(/^\s*(?:[-*+]|\d+\.)\s+(.+)$/);
    if (bulletMatch) {
      const cleanedBullet = cleanMarkdownText(bulletMatch[1]);
      if (cleanedBullet.length >= 4) {
        current.bullets.push(cleanedBullet);
      }
    }

    current.body += line + '\n';
  }

  flushSection();

  if (sections.length === 0) {
    sections.push({
      level: 1,
      heading: title || '核心笔记',
      body: content || title,
      bullets: [],
      boldTerms: [],
      codeTerms: [],
    });
  }

  return sections;
}

/**
 * 基于笔记内容即时构建可视化知识图谱（力导向图 + 树状思维导图）与 3D 记忆闪卡
 */
export function extractNoteInsightsLocally(
  title: string,
  content: string,
  category?: string,
  technology?: string,
  tags: string[] = []
): NoteInsightsData {
  const safeTitle = (title || '核心知识笔记').trim();
  const sections = parseMarkdownSections(safeTitle, content || '');

  const nodes: KnowledgeGraphNode[] = [];
  const links: KnowledgeGraphLink[] = [];
  const nodeIds = new Set<string>();

  const addNode = (node: KnowledgeGraphNode) => {
    if (nodeIds.has(node.id)) return;
    nodeIds.add(node.id);
    nodes.push(node);
  };

  // 1. 中心根节点
  const rootId = 'node_root';
  addNode({
    id: rootId,
    name: safeTitle.slice(0, 22),
    category: 'root',
    symbolSize: 54,
    summary: cleanMarkdownText(sections[0]?.body || content || safeTitle).slice(0, 140) || `${safeTitle} 核心知识体系总览`,
    sectionHeading: sections[0]?.heading || safeTitle,
  });

  const treeChildren: TreeMindmapNode[] = [];
  const conceptTermToNodeId = new Map<string, string>();

  // 2. 遍历章节生成一级节点与二级概念/代码节点
  sections.slice(0, 8).forEach((sec, idx) => {
    const chapId = idx === 0 && sec.heading === safeTitle ? rootId : `node_chap_${idx}`;
    const secCleanSummary = cleanMarkdownText(sec.body).slice(0, 140) || sec.bullets[0] || sec.heading;

    const treeBranch: TreeMindmapNode = {
      name: sec.heading.slice(0, 20),
      category: 'chapter',
      summary: secCleanSummary,
      children: [],
    };

    if (chapId !== rootId) {
      addNode({
        id: chapId,
        name: sec.heading.slice(0, 18),
        category: 'chapter',
        symbolSize: 38,
        summary: secCleanSummary,
        snippet: sec.codeBlock,
        sectionHeading: sec.heading,
      });
      links.push({
        source: rootId,
        target: chapId,
        relation: '核心模块',
      });
      treeChildren.push(treeBranch);
    }

    // 提取章节下的加粗核心概念
    sec.boldTerms.slice(0, 3).forEach((term, tIdx) => {
      if (term === sec.heading || term === safeTitle) return;
      const conceptId = `node_concept_${idx}_${tIdx}`;
      const matchingBullet =
        sec.bullets.find(b => b.includes(term)) ||
        secCleanSummary;

      const isPitfall = /注意|易错|区别|对比|为什么|痛点|死锁|异常|优化|原则|缺点/.test(term + matchingBullet);
      const cat: GraphNodeCategory = isPitfall ? 'pitfall' : 'concept';

      addNode({
        id: conceptId,
        name: term.slice(0, 16),
        category: cat,
        symbolSize: 27,
        summary: matchingBullet.slice(0, 130),
        sectionHeading: sec.heading,
      });

      links.push({
        source: chapId,
        target: conceptId,
        relation: isPitfall ? '重点辨析' : '包含概念',
      });

      treeBranch.children?.push({
        name: term.slice(0, 18),
        category: cat,
        summary: matchingBullet.slice(0, 100),
      });

      // 如果其他章节也出现了相同概念词，建立跨章节横向知识连接
      const normKey = term.toLowerCase();
      if (conceptTermToNodeId.has(normKey)) {
        const prevId = conceptTermToNodeId.get(normKey)!;
        if (prevId !== conceptId) {
          links.push({
            source: prevId,
            target: conceptId,
            relation: '跨节呼应',
          });
        }
      } else {
        conceptTermToNodeId.set(normKey, conceptId);
      }
    });

    // 提取章节下的关键代码/API 节点
    sec.codeTerms.slice(0, 2).forEach((codeTerm, cIdx) => {
      const codeId = `node_code_${idx}_${cIdx}`;
      addNode({
        id: codeId,
        name: codeTerm.slice(0, 18),
        category: 'code',
        symbolSize: 24,
        summary: `源自「${sec.heading}」的关键 API / 语法结构：${codeTerm}`,
        snippet: sec.codeBlock || codeTerm,
        sectionHeading: sec.heading,
      });

      links.push({
        source: chapId,
        target: codeId,
        relation: '代码实现',
      });

      treeBranch.children?.push({
        name: `\`${codeTerm.slice(0, 16)}\``,
        category: 'code',
        summary: sec.codeBlock || codeTerm,
      });
    });

    // 若该章节既无加粗词也无行内代码，则从要点列表中提取子节点
    if (sec.boldTerms.length === 0 && sec.codeTerms.length === 0 && sec.bullets.length > 0) {
      sec.bullets.slice(0, 2).forEach((bullet, bIdx) => {
        const shortLabel = bullet.split(/[：:，,——]/)[0].trim().slice(0, 15) || `核心要点 ${bIdx + 1}`;
        const bulletId = `node_bullet_${idx}_${bIdx}`;
        addNode({
          id: bulletId,
          name: shortLabel,
          category: 'concept',
          symbolSize: 25,
          summary: bullet.slice(0, 130),
          sectionHeading: sec.heading,
        });
        links.push({
          source: chapId,
          target: bulletId,
          relation: '核心要点',
        });
        treeBranch.children?.push({
          name: shortLabel,
          category: 'concept',
          summary: bullet.slice(0, 100),
        });
      });
    }

    if (chapId === rootId && treeBranch.children && treeBranch.children.length > 0) {
      treeChildren.push(...treeBranch.children);
    }
  });

  // 3. 补充技术栈与标签关联节点（保证即使短笔记也有饱满的星系图谱）
  const extraTags = Array.from(new Set([category, technology, ...(tags || [])].filter(Boolean) as string[]));
  extraTags.slice(0, 4).forEach((tag, idx) => {
    if (nodes.some(n => n.name.toLowerCase() === tag.toLowerCase())) return;
    const tagId = `node_tag_${idx}`;
    addNode({
      id: tagId,
      name: tag.slice(0, 14),
      category: idx === 0 ? 'chapter' : 'concept',
      symbolSize: 28,
      summary: `所属技术领域与标签：${tag}，与「${safeTitle}」紧密关联。`,
      sectionHeading: safeTitle,
    });
    links.push({
      source: rootId,
      target: tagId,
      relation: '技术归属',
    });
    if (treeChildren.length < 6) {
      treeChildren.push({
        name: tag,
        category: 'concept',
        summary: `技术标签：${tag}`,
      });
    }
  });

  // 建立相邻章节之间的递进演进连线，增强图谱连通性
  const chapNodes = nodes.filter(n => n.category === 'chapter');
  for (let i = 0; i < chapNodes.length - 1; i++) {
    links.push({
      source: chapNodes[i].id,
      target: chapNodes[i + 1].id,
      relation: '知识递进',
    });
  }

  // 4. 构建主动回忆 3D 记忆闪卡 (Active Recall Flashcards)
  const flashcards: NoteFlashcard[] = [];

  sections.forEach((sec, idx) => {
    const cleanBody = cleanMarkdownText(sec.body);
    if (!cleanBody && sec.bullets.length === 0) return;

    // 优先基于「概念：解释」格式的列表项生成高价值问答卡
    for (const bullet of sec.bullets) {
      const colonIdx = bullet.search(/[：:]/);
      if (colonIdx >= 2 && colonIdx <= 22 && bullet.length > colonIdx + 6 && flashcards.length < 8) {
        const term = bullet.slice(0, colonIdx).trim();
        const explanation = bullet.slice(colonIdx + 1).trim();
        flashcards.push({
          id: `fc_${idx}_${flashcards.length}`,
          question: `在「${sec.heading}」中，如何理解【${term}】的核心作用与机制？`,
          answer: explanation,
          hint: `回忆章节「${sec.heading}」中关于 ${term} 的关键描述`,
          difficulty: /原理|底层|并发|锁|内存|复杂度|优化/.test(term + explanation) ? '高频考点' : '进阶',
          tag: sec.heading.slice(0, 12),
          sectionHeading: sec.heading,
        });
      }
    }

    // 基于章节主题生成总结型闪卡
    if (flashcards.length < 8 && (cleanBody.length > 20 || sec.bullets.length > 0)) {
      const answerSummary =
        sec.bullets.length > 0
          ? sec.bullets.slice(0, 3).map((b, i) => `${i + 1}. ${b}`).join('\n')
          : cleanBody.slice(0, 220);

      if (!flashcards.some(f => f.sectionHeading === sec.heading)) {
        flashcards.push({
          id: `fc_sec_${idx}`,
          question: `请简述「${sec.heading}」的核心要点与实现细节？`,
          answer: answerSummary,
          hint: sec.boldTerms.length > 0 ? `关键词提示：${sec.boldTerms.join('、')}` : `结合「${safeTitle}」上下文思考`,
          difficulty: idx === 0 ? '基础' : sec.codeBlock ? '高频考点' : '进阶',
          tag: technology || category || '核心考点',
          sectionHeading: sec.heading,
        });
      }
    }
  });

  // 保底确保至少有 3 张闪卡
  if (flashcards.length === 0) {
    flashcards.push({
      id: 'fc_fallback_1',
      question: `「${safeTitle}」的核心解决思路与应用场景是什么？`,
      answer: cleanMarkdownText(content).slice(0, 240) || `掌握 ${safeTitle} 的核心概念、常见用法与最佳实践。`,
      hint: `提示：${extraTags.join(' / ') || safeTitle}`,
      difficulty: '基础',
      tag: technology || category || '核心概念',
      sectionHeading: safeTitle,
    });
  }

  return {
    nodes,
    links,
    tree: {
      name: safeTitle.slice(0, 22),
      category: 'root',
      summary: nodes[0]?.summary,
      children: treeChildren,
    },
    flashcards: flashcards.slice(0, 8),
    source: 'ast',
  };
}

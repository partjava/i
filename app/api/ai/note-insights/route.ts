import { NextRequest, NextResponse } from 'next/server';
import {
  DEEPSEEK_BASE_URL,
  MODEL_FLASH,
  resolveDeepSeekApiKey,
} from '../agent/stream/lib';
import {
  extractNoteInsightsLocally,
  GraphNodeCategory,
  KnowledgeGraphLink,
  KnowledgeGraphNode,
  NoteFlashcard,
  NoteInsightsData,
  TreeMindmapNode,
} from '@shared/lib/note-knowledge-extractor';

export const dynamic = 'force-dynamic';

const VALID_CATEGORIES = new Set<GraphNodeCategory>([
  'root',
  'chapter',
  'concept',
  'code',
  'pitfall',
]);

function normalizeCategory(raw: unknown): GraphNodeCategory {
  if (typeof raw === 'string' && VALID_CATEGORIES.has(raw as GraphNodeCategory)) {
    return raw as GraphNodeCategory;
  }
  return 'concept';
}

function buildTreeFromGraph(
  title: string,
  nodes: KnowledgeGraphNode[],
  links: KnowledgeGraphLink[]
): TreeMindmapNode {
  const rootNode = nodes.find(n => n.category === 'root') || nodes[0];
  if (!rootNode) {
    return { name: title, category: 'root', children: [] };
  }

  const nodeMap = new Map<string, KnowledgeGraphNode>();
  nodes.forEach(n => nodeMap.set(n.id, n));

  const childrenMap = new Map<string, string[]>();
  links.forEach(l => {
    if (!childrenMap.has(l.source)) childrenMap.set(l.source, []);
    childrenMap.get(l.source)!.push(l.target);
  });

  const visited = new Set<string>([rootNode.id]);

  const buildSubtree = (nodeId: string, depth: number): TreeMindmapNode => {
    const node = nodeMap.get(nodeId)!;
    if (depth >= 3) {
      return {
        name: node.name,
        category: node.category,
        summary: node.summary,
      };
    }
    const childIds = (childrenMap.get(nodeId) || []).filter(cid => !visited.has(cid) && nodeMap.has(cid));
    childIds.forEach(cid => visited.add(cid));

    return {
      name: node.name,
      category: node.category,
      summary: node.summary,
      children: childIds.map(cid => buildSubtree(cid, depth + 1)),
    };
  };

  return buildSubtree(rootNode.id, 0);
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const title = String(body.title || '技术学习笔记').trim();
  const content = String(body.content || '').trim();
  const category = String(body.category || '').trim();
  const technology = String(body.technology || '').trim();
  const tags = Array.isArray(body.tags) ? body.tags.map(String) : [];

  // 先生成本地 AST 基准图谱与闪卡（毫秒级，作为保底与补充）
  const fallback = extractNoteInsightsLocally(title, content, category, technology, tags);

  const apiKey = resolveDeepSeekApiKey();
  if (!apiKey || !content) {
    return NextResponse.json({ success: true, data: fallback });
  }

  const prompt = `你是一位资深计算机教育专家与知识图谱架构师。请深入分析以下学习笔记，提炼出结构化的「交互式知识图谱」和「主动回忆 3D 闪卡」。

笔记标题：${title}
分类/技术栈：${category} / ${technology}
笔记正文（截取前 4500 字）：
${content.slice(0, 4500)}

请严格输出合法的 JSON 对象（不要使用 markdown 代码块包裹，直接输出 JSON），结构如下：
{
  "nodes": [
    {
      "id": "n1",
      "name": "节点名称(不超过14字)",
      "category": "root | chapter | concept | code | pitfall",
      "summary": "该知识点的精炼解释或核心作用(40~110字)",
      "snippet": "可选的关键代码片段或公式(不超过120字)",
      "sectionHeading": "对应原文的章节标题(用于点击定位原文)"
    }
  ],
  "links": [
    {
      "source": "起点id",
      "target": "终点id",
      "relation": "关系词(如: 核心模块 / 底层实现 / 重点辨析 / 依赖 / 优化)"
    }
  ],
  "flashcards": [
    {
      "id": "fc1",
      "question": "具有启发性和考察价值的自测问题",
      "answer": "条理清晰的标准答案与原理总结",
      "hint": "简短的思考线索或关键词提示",
      "difficulty": "基础 | 进阶 | 高频考点",
      "tag": "所属小节或考点标签",
      "sectionHeading": "对应原文的章节标题"
    }
  ]
}

要求：
1. nodes 数量控制在 8~16 个，必须有且仅有 1 个 category 为 "root" 的中心节点；涵盖章节模块(chapter)、核心概念(concept)、关键代码/API(code) 和易错点/高频考点(pitfall)。
2. links 确保所有节点连通，并包含 2~3 条跨概念的横向关联边。
3. flashcards 数量控制在 5~7 张，问题要有深度（避免填空式机械提问）。`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 18000);

  try {
    const resp = await fetch(`${DEEPSEEK_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL_FLASH,
        temperature: 0.3,
        max_tokens: 2200,
        messages: [
          {
            role: 'system',
            content: '你只输出严格合法的 JSON 对象，不输出任何额外解释文本。',
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
      return NextResponse.json({ success: true, data: fallback });
    }

    const json = await resp.json();
    const rawContent: string = json?.choices?.[0]?.message?.content || '';
    const cleanedJson = rawContent
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();

    const parsed = JSON.parse(cleanedJson);

    const aiNodes: KnowledgeGraphNode[] = Array.isArray(parsed.nodes)
      ? parsed.nodes
          .filter((n: any) => n && n.id && n.name)
          .map((n: any, idx: number) => {
            const cat = idx === 0 && !parsed.nodes.some((x: any) => x.category === 'root')
              ? 'root'
              : normalizeCategory(n.category);
            const sizeMap: Record<GraphNodeCategory, number> = {
              root: 56,
              chapter: 40,
              concept: 29,
              code: 25,
              pitfall: 30,
            };
            return {
              id: String(n.id),
              name: String(n.name).slice(0, 18),
              category: cat,
              symbolSize: sizeMap[cat] || 28,
              summary: String(n.summary || n.name).slice(0, 160),
              snippet: n.snippet ? String(n.snippet).slice(0, 220) : undefined,
              sectionHeading: n.sectionHeading ? String(n.sectionHeading) : undefined,
            };
          })
      : [];

    if (aiNodes.length < 3) {
      return NextResponse.json({ success: true, data: fallback });
    }

    const validNodeIds = new Set(aiNodes.map(n => n.id));
    const aiLinks: KnowledgeGraphLink[] = Array.isArray(parsed.links)
      ? parsed.links
          .filter(
            (l: any) =>
              l &&
              validNodeIds.has(String(l.source)) &&
              validNodeIds.has(String(l.target)) &&
              String(l.source) !== String(l.target)
          )
          .map((l: any) => ({
            source: String(l.source),
            target: String(l.target),
            relation: String(l.relation || '关联').slice(0, 10),
          }))
      : [];

    const aiFlashcards: NoteFlashcard[] = Array.isArray(parsed.flashcards)
      ? parsed.flashcards
          .filter((f: any) => f && f.question && f.answer)
          .map((f: any, idx: number) => ({
            id: String(f.id || `ai_fc_${idx}`),
            question: String(f.question),
            answer: String(f.answer),
            hint: String(f.hint || '结合笔记上下文与核心原理解答'),
            difficulty:
              f.difficulty === '基础' || f.difficulty === '进阶' || f.difficulty === '高频考点'
                ? f.difficulty
                : '进阶',
            tag: String(f.tag || technology || category || '核心考点').slice(0, 14),
            sectionHeading: f.sectionHeading ? String(f.sectionHeading) : undefined,
          }))
      : [];

    const resultData: NoteInsightsData = {
      nodes: aiNodes,
      links: aiLinks.length > 0 ? aiLinks : fallback.links,
      tree: buildTreeFromGraph(title, aiNodes, aiLinks),
      flashcards: aiFlashcards.length > 0 ? aiFlashcards : fallback.flashcards,
      source: 'ai',
    };

    return NextResponse.json({ success: true, data: resultData });
  } catch {
    clearTimeout(timeout);
    return NextResponse.json({ success: true, data: fallback });
  }
}

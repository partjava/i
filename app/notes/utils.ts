export interface NoteTemplate {
  id: string;
  label: string;
  shortDesc: string;
  category: string;
  technology: string;
  subcategory: string;
  tags: string;
  titlePrefix?: string;
  content: string;
}

export const NOTE_TEMPLATES: NoteTemplate[] = [
  {
    id: 'study',
    label: '学习笔记',
    shortDesc: '概念梳理 · 核心原理 · 总结',
    category: '学习',
    technology: '',
    subcategory: '',
    tags: '学习,核心笔记',
    content: '## 学习目标\n\n\n## 核心知识点\n\n\n## 示例代码\n\n```java\n\n```\n\n## 复盘总结\n\n',
  },
  {
    id: 'algorithm',
    label: '算法题解',
    shortDesc: '思路分析 · 代码 · 复杂度',
    category: '计算机',
    technology: '数据结构与算法',
    subcategory: '算法题解',
    tags: '算法,LeetCode,复杂度',
    content: '## 题目描述\n\n\n## 解题思路\n\n\n## 代码实现\n\n```python\n\n```\n\n## 复杂度分析\n\n- 时间复杂度：$O()$\n- 空间复杂度：$O()$\n\n## 关联题目\n\n- [[]] \n',
  },
  {
    id: 'source',
    label: '源码剖析',
    shortDesc: '调用链 · 关键类 · 设计模式',
    category: '软件工程',
    technology: 'Java',
    subcategory: '源码解析',
    tags: '源码,架构,设计模式',
    content: '## 模块定位与入口\n\n\n## 核心调用链路\n\n1. \n2. \n\n## 关键源码摘录\n\n```java\n\n```\n\n## 设计亮点与反思\n\n',
  },
  {
    id: 'debug',
    label: '踩坑复盘',
    shortDesc: '现象 · 根因 · 解决与预防',
    category: '开发',
    technology: '',
    subcategory: '故障排查',
    tags: 'Bug复盘,调试',
    content: '## 异常现象\n\n\n## 复现步骤\n\n1. \n2. \n\n## 根因定位\n\n\n## 解决方案与验证\n\n\n## 后续预防清单\n\n- [ ] \n',
  },
  {
    id: 'reading',
    label: '读书摘录',
    shortDesc: '观点提炼 · 金句 · 感悟',
    category: '阅读',
    technology: '',
    subcategory: '书评笔记',
    tags: '读书,知识沉淀',
    content: '## 书目 / 章节来源\n\n\n## 核心观点脉络\n\n\n## 精彩原文摘录\n\n> \n\n## 个人思考与延伸\n\n',
  },
  {
    id: 'collection',
    label: '合集导言',
    shortDesc: '适合作为多章节专栏封面',
    category: '专栏合集',
    technology: '',
    subcategory: '系列目录',
    tags: '合集,体系化学习',
    titlePrefix: '【系列专栏】',
    content: '## 专栏简介\n\n本合集用于系统梳理相关专题知识，支持将零散笔记拖拽归纳为子章节。\n\n## 学习路线建议\n\n1. 按左侧章节顺序逐篇精读\n2. 结合 `[[笔记标题]]` 串联前置概念\n\n## 参考资料\n\n- \n',
  },
];

export function stripMarkdown(md: string): string {
  if (!md) return '';
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[.*?\]\(.*?\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\[\[([^\]]+)\]\]/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/^>\s+/gm, '')
    .replace(/^[-*+]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/\|/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function calcReadingStats(md: string): { words: number; minutes: number } {
  const plain = stripMarkdown(md || '');
  if (!plain) return { words: 0, minutes: 1 };
  const cjk = (plain.match(/[\u4e00-\u9fa5]/g) || []).length;
  const latin = (plain.replace(/[\u4e00-\u9fa5]/g, ' ').match(/[A-Za-z0-9_]+/g) || []).length;
  const words = cjk + latin;
  const minutes = Math.max(1, Math.ceil(words / 320));
  return { words, minutes };
}

export interface TocHeading {
  index: number;
  level: 1 | 2 | 3;
  text: string;
}

export function extractHeadings(md: string): TocHeading[] {
  if (!md) return [];
  const lines = md.split(/\r?\n/);
  const result: TocHeading[] = [];
  let inFence = false;
  for (const line of lines) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = /^(#{1,3})\s+(.+)$/.exec(line.trim());
    if (m) {
      const level = m[1].length as 1 | 2 | 3;
      const text = m[2].replace(/[*_`[\]]/g, '').trim();
      if (text) {
        result.push({ index: result.length, level, text });
      }
    }
  }
  return result;
}

/**
 * 将正文中的 [[笔记标题]]（非代码块内）转换为可点击的内部双链 Markdown 链接
 */
export function preprocessWikilinks(md: string): string {
  if (!md) return '';
  const parts = md.split(/(```[\s\S]*?```|`[^`\n]+`)/g);
  return parts
    .map((segment, idx) => {
      if (idx % 2 === 1) return segment;
      return segment.replace(/\[\[([^\]\n|]+?)(?:\|([^\]\n]+?))?\]\]/g, (_m, target, alias) => {
        const cleanTarget = String(target).trim();
        const label = alias ? String(alias).trim() : cleanTarget;
        return `[${label}](#wikilink:${encodeURIComponent(cleanTarget)})`;
      });
    })
    .join('');
}

export function downloadMarkdownFile(filename: string, content: string) {
  const safeName = (filename || 'note').replace(/[\\/:*?"<>|]/g, '_');
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = safeName.endsWith('.md') ? safeName : `${safeName}.md`;
  a.click();
  URL.revokeObjectURL(url);
}

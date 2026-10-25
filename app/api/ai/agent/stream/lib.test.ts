/**
 * Agent 纯逻辑层单测：RAG 检索相关性 / 关键词兜底 / 工具参数容错 / 哈希一致性
 */
import { describe, it, expect } from 'vitest';
import {
  ragSearch,
  searchSitePages,
  matchSiteRoutes,
  parseToolArguments,
  summarizeToolResult,
  fnv1a,
  tokenize,
  TOOL_SCHEMAS,
} from './lib';

describe('ragSearch — RAG 向量混合检索', () => {
  it('「java 虚拟线程」首位应命中 Java 多线程课程页', () => {
    const hits = ragSearch('java 虚拟线程', 3);
    expect(hits.length).toBeGreaterThan(0);
    expect(hits[0].href).toBe('/study/computer/java/thread');
  });

  it('「sql 注入 防护」应命中安全课程页', () => {
    const hits = ragSearch('sql 注入 防护', 3);
    expect(hits[0].href).toContain('/security/');
  });

  it('「transformer 注意力机制」应命中深度学习相关页', () => {
    const hits = ragSearch('transformer 注意力机制', 3);
    expect(hits[0].href).toContain('/ai/dl/');
  });

  it('得分应达到置信阈值（强相关 > 0.15）', () => {
    const hits = ragSearch('docker 容器化部署', 1);
    if (hits.length > 0) {
      expect(hits[0].score).toBeGreaterThanOrEqual(0.15);
    }
  });

  it('空查询返回空数组', () => {
    expect(ragSearch('')).toEqual([]);
    expect(ragSearch('   ')).toEqual([]);
  });
});

describe('searchSitePages — RAG 低置信回落关键词层', () => {
  it('「红黑树」语料外查询应回落关键词层命中数据结构页', () => {
    const links = searchSitePages('红黑树 旋转', undefined, 3);
    expect(links.length).toBeGreaterThan(0);
    expect(links.some((l) => l.href.includes('/ds/'))).toBe(true);
  });
});

describe('matchSiteRoutes — 关键词检索兜底层', () => {
  it('「笔记」能命中笔记中心', () => {
    const links = matchSiteRoutes('我想写学习笔记', undefined, 3);
    expect(links.some((l) => l.href === '/notes')).toBe(true);
  });
});

describe('parseToolArguments — LLM 工具参数容错解析', () => {
  it('标准 JSON 字符串', () => {
    expect(parseToolArguments('{"query":"红黑树"}')).toEqual({ query: '红黑树' });
  });

  it('带 ```json 包裹的输出', () => {
    expect(parseToolArguments('```json\n{"query":"jvm"}\n```')).toEqual({ query: 'jvm' });
  });

  it('前后带解释文字的输出（截取花括号）', () => {
    expect(parseToolArguments('好的，参数如下：{"topic":"总结"} 请执行')).toEqual({ topic: '总结' });
  });

  it('对象直接透传', () => {
    expect(parseToolArguments({ mood: 'happy' })).toEqual({ mood: 'happy' });
  });

  it('垃圾输入返回空对象而非抛异常', () => {
    expect(parseToolArguments('这不是参数')).toEqual({});
    expect(parseToolArguments('')).toEqual({});
    expect(parseToolArguments(null)).toEqual({});
  });
});

describe('summarizeToolResult — 工具结果摘要', () => {
  it('各工具生成可读摘要', () => {
    expect(summarizeToolResult('search_site_pages', { links: [1, 2] })).toContain('2 个站内课程页');
    expect(summarizeToolResult('web_search', { citations: [1] })).toContain('1 条权威资料');
    expect(summarizeToolResult('draft_note', { title: 'JVM 笔记' })).toContain('JVM 笔记');
    expect(summarizeToolResult('set_companion_state', { state: 'happy / jump' })).toContain('happy');
    expect(summarizeToolResult('unknown_tool', {})).toBe('执行完成');
  });
});

describe('fnv1a — 双端向量空间一致性锚点', () => {
  // 标准 FNV-1a 32 位测试向量：与 Python 端 rag_index.py 必须逐位一致
  it('空串与单字符的已知哈希值', () => {
    expect(fnv1a('')).toBe(0x811c9dc5);
    expect(fnv1a('a')).toBe(0xe40c292c);
  });

  it('哈希确定性（同输入同输出）', () => {
    expect(fnv1a('红黑树')).toBe(fnv1a('红黑树'));
    expect(fnv1a('红黑树')).not.toBe(fnv1a('黑红树'));
  });
});

describe('tokenize — 中英混合分词', () => {
  it('中文转 bigram、英文保留原词', () => {
    const tokens = tokenize('Transformer 注意力机制');
    expect(tokens).toContain('transformer');
    expect(tokens).toContain('注意');
    expect(tokens).toContain('力机');
  });

  it('停用词被过滤', () => {
    const tokens = tokenize('the 的 java');
    expect(tokens).not.toContain('the');
    expect(tokens).not.toContain('的');
    expect(tokens).toContain('java');
  });
});

describe('TOOL_SCHEMAS — Function Calling 工具定义', () => {
  it('四个工具且 schema 结构完整', () => {
    expect(TOOL_SCHEMAS).toHaveLength(4);
    for (const t of TOOL_SCHEMAS) {
      expect(t.type).toBe('function');
      expect(t.function.name).toBeTruthy();
      expect(t.function.parameters.type).toBe('object');
    }
  });
});

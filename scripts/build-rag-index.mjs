#!/usr/bin/env node
/**
 * RAG 索引构建脚本（站内课程语料向量化）
 * ============================================================
 * 用法：node scripts/build-rag-index.mjs
 *
 * 做什么：
 * 1. 遍历 app/study 下所有 page.tsx（约 509 个课程页）抽取正文文本
 *    （import/注释剥离 + 字符串字面量 + 中文文本段）；
 * 2. 分词（中文二元 bigram + 英文单词）→ FNV-1a 特征哈希到固定维度；
 * 3. 以 TF-IDF 加权、L2 归一化生成每页的稀疏向量；
 * 4. 输出 app/_shared/data/rag-index.json，供 Next.js 与 Python
 *    双端用同一套哈希函数做余弦向量检索（详见 lib.ts / rag_index.py）。
 *
 * 哈希函数与维度必须与 TS/Python 两端的检索实现严格一致：
 *   DIM = 1024；idx = fnv1a(token) % DIM；sign = fnv1a(token + '~') & 1
 * ============================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const STUDY_DIR = path.join(ROOT, 'app', 'study');
const NAV_PATH = path.join(ROOT, 'app', '_shared', 'data', 'navigation.ts');
const OUT_PATH = path.join(ROOT, 'app', '_shared', 'data', 'rag-index.json');

const DIM = 4096;
const MAX_FEATURES_PER_DOC = 150; // 每页最多保留的向量特征数（控制索引体积）
const MAX_TEXT_SNIPPET = 400; // 每页正文摘录上限（供前端展示与 LLM 上下文）

// 与 partjava-ai/agents/agent1_navigator.py 的 subject_map 保持一致
const SUBJECT_MAP = {
  cpp: ['计算机', 'C++'], python: ['计算机', 'Python'], java: ['计算机', 'Java'],
  sql: ['计算机', 'SQL数据库'], ds: ['计算机', '数据结构与算法'], os: ['计算机', '操作系统'],
  linux: ['计算机', 'Linux系统'], network: ['计算机网络', '计算机网络'],
  frontend: ['Web前端', 'Web前端开发'], go: ['计算机', 'Go语言'], php: ['计算机', 'PHP'],
  iot: ['计算机', '物联网'], composition: ['计算机', '计算机组成原理'],
  ml: ['人工智能', '机器学习'], dl: ['人工智能', '深度学习'], rl: ['人工智能', '强化学习'],
  nlp: ['人工智能', '自然语言处理'], cv: ['人工智能', '计算机视觉'],
  recsys: ['人工智能', '推荐系统'], robot: ['人工智能', '智能机器人'],
  programming: ['人工智能', 'AI程序设计'], datamining: ['人工智能', '数据挖掘'],
  protection: ['网络安全', '安全防护'], penetration: ['网络安全', '渗透测试'],
  crypto: ['网络安全', '密码学'], reverse: ['网络安全', '逆向工程'],
  dev: ['网络安全', '安全开发'], ops: ['网络安全', '安全运维'], blockchain: ['网络安全', '区块链安全'],
  'architecture-design': ['软件工程', '架构与设计模式'], 'standards-testing': ['软件工程', '开发规范与测试'],
  javaee: ['软件工程', 'Java EE企业级开发'], android: ['软件工程', '安卓开发'],
  dotnet: ['软件工程', '.NET开发'], cloud: ['软件工程', '云计算与容器'],
  bigdata: ['软件工程', '大数据分析'], search: ['软件工程', '智能搜索引擎'],
  modeling: ['软件工程', '软件建模与UML'], game: ['软件工程', '动画与游戏设计'],
  ai: ['人工智能', 'AI综合'], se: ['软件工程', '软件工程综合'], computer: ['计算机', '计算机综合'],
  security: ['网络安全', '网络安全综合'],
};

const STOPWORDS = new Set([
  '的', '了', '是', '在', '和', '与', '或', '及', '等', '着', '有', '无', '这', '那', '你', '我',
  '他', '她', '它', '们', '个', '也', '不', '为', '到', '说', '要', '会', '对', '上', '下',
  'the', 'a', 'an', 'of', 'to', 'and', 'or', 'in', 'on', 'for', 'with', 'is', 'are', 'be', 'as', 'by', 'at', 'it', 'this', 'that',
]);

// ---------- FNV-1a 32 位哈希（与 TS/Python 检索端严格一致，不可改动） ----------
function fnv1a(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}
function featureIndex(token) {
  return fnv1a(token) % DIM;
}
function featureSign(token) {
  return (fnv1a(token + '~') & 1) === 1 ? -1 : 1;
}

// ---------- 分词：中文 bigram + 英文/数字词 ----------
function tokenize(text) {
  const tokens = [];
  const lower = String(text || '').toLowerCase();
  // 英文与数字词（含 c++ / c# / b+树 里的符号）
  for (const w of lower.match(/[a-z0-9][a-z0-9+#.]{1,30}/g) || []) {
    if (!STOPWORDS.has(w)) tokens.push(w);
  }
  // 中文连续段 → 二元 bigram
  for (const run of lower.match(/[\u4e00-\u9fa5]{2,}/g) || []) {
    for (let i = 0; i < run.length - 1; i++) {
      const bg = run.slice(i, i + 2);
      if (!STOPWORDS.has(bg)) tokens.push(bg);
    }
    if (run.length === 2) tokens.push(run);
  }
  return tokens;
}

// ---------- 从 page.tsx 源码抽取正文文本 ----------
function extractText(src) {
  let s = src;
  s = s.replace(/^import[^;]+;$/gm, ' ');
  s = s.replace(/\/\*[\s\S]*?\*\//g, ' ');
  s = s.replace(/(^|[^:])\/\/.*$/gm, '$1 ');
  s = s.replace(/\$\{[^}]*\}/g, ' ');
  // 字符串字面量（课程数据基本都在字符串里）
  const strs = [];
  const re = /(['"])((?:\\.|(?!\1)[^\\\n])*)\1/g;
  let m;
  while ((m = re.exec(s)) && strs.length < 4000) strs.push(m[2]);
  // JSX 标签外的中文正文段
  const zhRuns = s.match(/[\u4e00-\u9fa5][\u4e00-\u9fa5，。：；、！？（）《》“”\s]{3,}/g) || [];
  return (strs.join(' \n ') + ' \n ' + zhRuns.join(' ')).replace(/\\n/g, ' ').slice(0, 40000);
}

// ---------- 遍历 study 页面 ----------
function walkPages(dir, acc) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkPages(full, acc);
    } else if (entry.name === 'page.tsx') {
      acc.push(full);
    }
  }
  return acc;
}

// ---------- 从 navigation.ts 建立 href -> 页面名 映射 ----------
function parseNavigation() {
  const content = fs.readFileSync(NAV_PATH, 'utf-8');
  const map = new Map();
  const re = /\{\s*name:\s*['"]([^'"]+)['"]\s*,\s*href:\s*['"]([^'"]+)['"]\s*\}/g;
  let m;
  while ((m = re.exec(content))) {
    if (!map.has(m[2])) map.set(m[2], m[1]);
  }
  return map;
}

// ---------- 主流程 ----------
const navMap = parseNavigation();
const pageFiles = walkPages(STUDY_DIR, []);
const docs = [];
const df = new Map(); // token -> 出现文档数

for (const file of pageFiles) {
  const rel = path.relative(path.join(ROOT, 'app'), file); // study/computer/java/thread/page.tsx
  const href = '/' + rel.replace(/\/page\.tsx$/, '');
  const parts = href.split('/').filter(Boolean); // [study, computer, java, thread]
  const subjKey = parts[2] || '';
  const [category, subject] = SUBJECT_MAP[subjKey] || ['课程中心', subjKey || '综合'];
  const navName = navMap.get(href) || '';
  let src = '';
  try {
    src = fs.readFileSync(file, 'utf-8');
  } catch {
    continue;
  }
  const text = extractText(src);
  // 标题：导航名 > 源码里的中文短标题 > 路径末段
  let title = navName;
  if (!title) {
    const h1 = src.match(/<h1[^>]*>([^<{}]{2,40})</) || src.match(/title:\s*['"]([^'"]{2,40})['"]/);
    title = h1 ? h1[1].trim() : parts[parts.length - 1];
  }
  const tokens = [
    ...tokenize(`${navName} ${title}`),
    ...tokenize(`${navName} ${title}`),
    ...tokenize(`${navName} ${title}`), // 标题词 3 倍加权（检索质量关键）
    ...tokenize(`${subject} ${text}`),
  ];
  if (tokens.length < 4) continue; // 过滤几乎无正文的页面

  // 文档内词频
  const tf = new Map();
  for (const t of tokens) tf.set(t, (tf.get(t) || 0) + 1);
  for (const t of tf.keys()) df.set(t, (df.get(t) || 0) + 1);

  docs.push({
    href,
    title: `${subject} · ${title}`.replace(/·\s*$/, ''),
    category,
    subject,
    text: text.replace(/\s{3,}/g, ' ').trim().slice(0, MAX_TEXT_SNIPPET),
    tf,
  });
}

// ---------- TF-IDF 向量化（L2 归一化稀疏向量） ----------
const N = docs.length;
for (const doc of docs) {
  const feats = [];
  let norm = 0;
  for (const [token, count] of doc.tf) {
    const idf = Math.log(1 + N / (df.get(token) || 1));
    const w = (1 + Math.log(count)) * idf; // 次线性 TF × idf（抑制长文档稀释）
    if (w <= 0) continue;
    feats.push([featureIndex(token), featureSign(token) * w]);
    norm += (featureSign(token) * w) ** 2;
  }
  norm = Math.sqrt(norm) || 1;
  feats.sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]));
  const trimmed = feats.slice(0, MAX_FEATURES_PER_DOC).map(([i, w]) => [i, +(w / norm).toFixed(5)]);
  doc.vec = trimmed;
  delete doc.tf;
}

const index = {
  version: 1,
  dim: DIM,
  builtAt: new Date().toISOString(),
  docCount: N,
  idf: {}, // token -> idf（查询侧加权用；只保留中高频 token 控制体积）
  docs,
};
for (const [token, cnt] of df) {
  if (cnt >= 2 && cnt <= N * 0.7) {
    index.idf[token] = +Math.log(1 + N / cnt).toFixed(4);
  }
}

fs.writeFileSync(OUT_PATH, JSON.stringify(index));
const sizeMB = (fs.statSync(OUT_PATH).size / 1024 / 1024).toFixed(2);
console.log(`✅ RAG 索引构建完成：${N} 个课程页，维度 ${DIM}，idf 词条 ${Object.keys(index.idf).length} 个`);
console.log(`   输出：app/_shared/data/rag-index.json (${sizeMB} MB)`);

// ---------- 自检：几个典型查询的检索结果 ----------
function cosine(vecA, queryFeats) {
  let dot = 0;
  for (const [idx, w] of queryFeats) {
    for (const [i2, w2] of vecA) {
      if (i2 === idx) dot += w * w2;
    }
  }
  return dot;
}
for (const q of ['红黑树 旋转', 'java 虚拟线程', 'sql 注入 防护', 'transformer 注意力机制']) {
  const qTokens = tokenize(q);
  const qf = new Map();
  for (const t of qTokens) {
    const idf = index.idf[t] || 1.0;
    qf.set(t, (qf.get(t) || 0) + idf);
  }
  let qnorm = 0;
  const qFeats = [...qf.entries()].map(([t, w]) => {
    const v = featureSign(t) * w;
    qnorm += v * v;
    return [featureIndex(t), v];
  });
  qnorm = Math.sqrt(qnorm) || 1;
  const qFeatN = qFeats.map(([i, w]) => [i, w / qnorm]);
  const ranked = docs
    .map((d) => {
      const titleToks = new Set(tokenize(`${d.title} ${d.subject} ${d.href}`));
      let lexNum = 0;
      let lexDen = 0;
      for (const t of qTokens) {
        const idf = index.idf[t] || 1.0;
        lexDen += idf;
        if (titleToks.has(t)) lexNum += idf;
      }
      const lexical = lexDen > 0 ? lexNum / lexDen : 0;
      return { href: d.href, title: d.title, score: 0.6 * cosine(d.vec, qFeatN) + 0.4 * lexical };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
  console.log(`\n🔍 「${q}」 Top3:`);
  for (const r of ranked) console.log(`   ${r.score.toFixed(4)}  ${r.title}  ${r.href}`);
}

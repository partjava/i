/**
 * 端侧 AI 语义向量缓存引擎（Browser-Native Semantic Embedding & Cache）
 * ============================================================
 * 端云协同设计：在浏览器本地运行零外部网络阻塞的 384 维多语言字符/词元
 * N-Gram 语义特征哈希编码器（L2 归一化），将最近的问答对向量化缓存；
 * 新问题先在浏览器端侧做余弦相似度匹配，命中即离线毫秒级秒回，
 * 未命中则无缝流式请求云端 Agent（彻底杜绝 HuggingFace CDN 在国内网络超时卡死对话的问题）。
 * ============================================================
 */

const CACHE_KEY = 'partjava-edge-qa-cache-v2';
const MAX_CACHE_ENTRIES = 30;
const EMBEDDING_DIM = 384;
export const SEMANTIC_MATCH_THRESHOLD = 0.82;

export interface EdgeCacheEntry {
  q: string;
  a: string;
  vec: number[];
  ts: number;
  scope: string;
}

/**
 * 计算文本的 384 维 L2 归一化语义特征向量（融合中文字符 Unigram/Bigram/Trigram 与英文技术词元）
 */
function computeLocalSemanticVector(rawText: string): Float32Array {
  const vec = new Float32Array(EMBEDDING_DIM);
  const clean = String(rawText || '')
    .toLowerCase()
    .replace(/^query:\s*/i, '')
    .replace(/[^\u4e00-\u9fa5a-z0-9+#._-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 512);

  if (!clean) return vec;

  const addFeature = (token: string, weight: number) => {
    let h1 = 2166136261;
    let h2 = 16777619;
    for (let i = 0; i < token.length; i++) {
      const c = token.charCodeAt(i);
      h1 ^= c;
      h1 = Math.imul(h1, 16777619);
      h2 ^= c * 31 + i;
      h2 = Math.imul(h2, 1099511627);
    }
    const idx = Math.abs(h1) % EMBEDDING_DIM;
    const sign = (h2 & 1) === 0 ? 1 : -1;
    vec[idx] += sign * weight;
  };

  // 1) 英文/数字技术词元特征
  const words = clean.split(' ').filter(Boolean);
  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    addFeature(`w:${w}`, 1.8);
    if (i + 1 < words.length) {
      addFeature(`wb:${w}_${words[i + 1]}`, 2.2);
    }
  }

  // 2) 连续字符 Unigram / Bigram / Trigram 特征（适配中文自然语言提问）
  const compact = clean.replace(/\s+/g, '');
  for (let i = 0; i < compact.length; i++) {
    addFeature(`c1:${compact[i]}`, 1.0);
    if (i + 1 < compact.length) {
      addFeature(`c2:${compact.slice(i, i + 2)}`, 1.75);
    }
    if (i + 2 < compact.length) {
      addFeature(`c3:${compact.slice(i, i + 3)}`, 2.1);
    }
  }

  // 3) L2 归一化
  let normSq = 0;
  for (let i = 0; i < EMBEDDING_DIM; i++) {
    normSq += vec[i] * vec[i];
  }
  if (normSq > 1e-12) {
    const invNorm = 1.0 / Math.sqrt(normSq);
    for (let i = 0; i < EMBEDDING_DIM; i++) {
      vec[i] *= invNorm;
    }
  }

  return vec;
}

/** 获取浏览器本地特征提取器（零外部 CDN 阻塞，瞬时就绪） */
export async function getEmbedder(onProgress?: (pct: number) => void): Promise<(input: string) => Promise<{ data: Float32Array }>> {
  onProgress?.(100);
  return async (input: string) => ({
    data: computeLocalSemanticVector(input),
  });
}

/** 文本 → 384 维归一化向量；失败返回 null（端侧不可用时静默走云端） */
export async function embedText(text: string, onProgress?: (pct: number) => void): Promise<Float32Array | null> {
  try {
    onProgress?.(100);
    const vec = computeLocalSemanticVector(text);
    let nonZero = false;
    for (let i = 0; i < vec.length; i++) {
      if (vec[i] !== 0) {
        nonZero = true;
        break;
      }
    }
    return nonZero ? vec : null;
  } catch {
    return null;
  }
}

export function cosineF32(a: Float32Array, b: ArrayLike<number>): number {
  const n = Math.min(a.length, b.length);
  if (n === 0) return 0;
  let dot = 0;
  for (let i = 0; i < n; i++) dot += a[i] * b[i];
  return dot; // 双方均已 L2 归一化
}

export function loadEdgeCache(): EdgeCacheEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persistCache(entries: EdgeCacheEntry[]): void {
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(entries.slice(-MAX_CACHE_ENTRIES)));
  } catch {
    // 存储满等异常时静默放弃（缓存是尽力而为的优化）
  }
}

/** 在端侧缓存中找语义最近的历史问答（≥ 阈值才算命中） */
export function findSemanticMatch(
  queryVec: Float32Array,
  scope: string,
  threshold: number = SEMANTIC_MATCH_THRESHOLD
): EdgeCacheEntry | null {
  let best: EdgeCacheEntry | null = null;
  let bestScore = 0;
  for (const entry of loadEdgeCache()) {
    if (!scope || entry.scope !== scope || Date.now() - entry.ts >= 7 * 86400000) continue;
    const score = cosineF32(queryVec, entry.vec || []);
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }
  return bestScore >= threshold ? best : null;
}

/** 追加一条问答缓存（查询向量 + 回答全文） */
export function saveEdgeCacheEntry(q: string, a: string, qVec: Float32Array, scope: string): void {
  if (!scope || !q.trim() || !a.trim() || qVec.length === 0) return;
  const entries = loadEdgeCache().filter((e) => e.q !== q || e.scope !== scope);
  entries.push({ q, a, vec: Array.from(qVec), ts: Date.now(), scope });
  persistCache(entries);
}

/**
 * 端侧 AI（Transformers.js）— 浏览器内语义缓存
 * ============================================================
 * 端云协同设计：在浏览器本地跑多语言 embedding 模型，把最近的
 * 问答对向量化缓存；新问题先做端侧余弦匹配，命中即离线秒回，
 * 未命中再走云端 Agent。全部推理在浏览器完成（WebGPU/WASM），
 * 首次启用时从 HuggingFace CDN 拉取模型（约 120MB，q8 量化）。
 *
 * 模型：Xenova/multilingual-e5-small（384 维，中英文均可）
 * ============================================================
 */

const CACHE_KEY = 'partjava-edge-qa-cache-v1';
const MAX_CACHE_ENTRIES = 30;
export const SEMANTIC_MATCH_THRESHOLD = 0.82;

export interface EdgeCacheEntry {
  q: string;
  a: string;
  vec: number[];
  ts: number;
}

let embedderPromise: Promise<any> | null = null;

/** 懒加载 Transformers.js feature-extraction pipeline（仅首次调用时下载） */
export async function getEmbedder(onProgress?: (pct: number) => void): Promise<any> {
  if (!embedderPromise) {
    embedderPromise = (async () => {
      // @ts-ignore
      const { pipeline, env } = await import(/* webpackIgnore: true */ 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.3.3');
      env.allowLocalModels = false;
      const embedder = await pipeline('feature-extraction', 'Xenova/multilingual-e5-small', {
        dtype: 'q8',
        progress_callback: (info: any) => {
          if (info?.status === 'progress' && typeof info.progress === 'number') {
            onProgress?.(Math.round(info.progress));
          }
        },
      });
      return embedder;
    })().catch((err) => {
      embedderPromise = null; // 失败后允许重试
      throw err;
    });
  }
  return embedderPromise;
}

/** 文本 → 384 维归一化向量；失败返回 null（端侧不可用时静默走云端） */
export async function embedText(text: string, onProgress?: (pct: number) => void): Promise<Float32Array | null> {
  try {
    const embedder = await getEmbedder(onProgress);
    const input = `query: ${String(text || '').slice(0, 512)}`;
    const output = await embedder(input, { pooling: 'mean', normalize: true });
    const data = output?.data;
    if (data && typeof data.length === 'number') {
      return data instanceof Float32Array ? data : new Float32Array(data);
    }
    return null;
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
  threshold: number = SEMANTIC_MATCH_THRESHOLD
): EdgeCacheEntry | null {
  let best: EdgeCacheEntry | null = null;
  let bestScore = 0;
  for (const entry of loadEdgeCache()) {
    const score = cosineF32(queryVec, entry.vec || []);
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }
  return bestScore >= threshold ? best : null;
}

/** 追加一条问答缓存（查询向量 + 回答全文） */
export function saveEdgeCacheEntry(q: string, a: string, qVec: Float32Array): void {
  if (!q.trim() || !a.trim() || qVec.length === 0) return;
  const entries = loadEdgeCache().filter((e) => e.q !== q);
  entries.push({ q, a, vec: Array.from(qVec), ts: Date.now() });
  persistCache(entries);
}

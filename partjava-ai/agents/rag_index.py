"""
站内课程语料 RAG 向量检索（Python 端）
============================================================
与 app/api/ai/agent/stream/lib.ts 及 scripts/build-rag-index.mjs 共享
同一套向量空间（必须严格一致，否则双端检索结果错位）：

- 分词：中文二元 bigram + 英文/数字词（共享停用词表）
- 哈希：FNV-1a 32 位；idx = fnv1a(token) % 4096；sign = fnv1a(token+'~') & 1
- 打分：0.6 × 向量余弦 + 0.4 × 标题词面匹配（TF-IDF 加权）
- 阈值：混合得分 ≥ 0.15 视为强相关，否则回落关键词检索

索引文件 app/_shared/data/rag-index.json 由 `node scripts/build-rag-index.mjs`
生成（509 个课程页，4096 维特征哈希 TF-IDF 稀疏向量）。
============================================================
"""

import json
import math
import re
from pathlib import Path
from typing import Dict, List, Optional, Tuple

from config import settings

RAG_DIM = 4096
RAG_THRESHOLD = 0.15

STOPWORDS = {
    "的", "了", "是", "在", "和", "与", "或", "及", "等", "着", "有", "无", "这", "那", "你", "我",
    "他", "她", "它", "们", "个", "也", "不", "为", "到", "说", "要", "会", "对", "上", "下",
    "the", "a", "an", "of", "to", "and", "or", "in", "on", "for", "with", "is", "are", "be", "as",
    "by", "at", "it", "this", "that",
}

_WORD_RE = re.compile(r"[a-z0-9][a-z0-9+#.]{1,30}")
_ZH_RUN_RE = re.compile(r"[\u4e00-\u9fa5]{2,}")


def fnv1a(s: str) -> int:
    """FNV-1a 32 位哈希 —— 与 TS 端实现逐字符等价（仅覆盖 BMP 字符，足够本场景）。"""
    h = 0x811C9DC5
    for ch in s:
        h ^= ord(ch)
        h = (h * 0x01000193) & 0xFFFFFFFF
    return h


def tokenize(text: str) -> List[str]:
    tokens: List[str] = []
    lower = str(text or "").lower()
    for w in _WORD_RE.findall(lower):
        if w not in STOPWORDS:
            tokens.append(w)
    for run in _ZH_RUN_RE.findall(lower):
        for i in range(len(run) - 1):
            bg = run[i : i + 2]
            if bg not in STOPWORDS:
                tokens.append(bg)
        if len(run) == 2:
            tokens.append(run)
    return tokens


class RagIndex:
    """加载预构建的稀疏向量索引，提供混合检索（余弦 + 标题词面）。"""

    def __init__(self) -> None:
        self.docs: List[Dict] = []
        self.idf: Dict[str, float] = {}
        self.dim = RAG_DIM
        index_path: Optional[Path] = None
        if settings.NAVIGATION_TS_PATH.exists():
            index_path = settings.NAVIGATION_TS_PATH.parent / "rag-index.json"
        if index_path and index_path.exists():
            try:
                data = json.loads(index_path.read_text(encoding="utf-8"))
                self.docs = data.get("docs", [])
                self.idf = data.get("idf", {})
                self.dim = int(data.get("dim", RAG_DIM))
            except Exception as exc:
                print(f"[RagIndex] 索引加载失败，回落关键词检索: {exc}")

    @property
    def available(self) -> bool:
        return len(self.docs) > 0

    def _query_vector(self, tokens: List[str]) -> Tuple[List[Tuple[int, float]], Dict[str, float], float]:
        """返回 (L2归一化查询向量, token->idf权重, 权重总和)。"""
        qf: Dict[str, float] = {}
        for t in tokens:
            idf = self.idf.get(t, 1.0)
            qf[t] = qf.get(t, 0.0) + idf
        qnorm = 0.0
        vec: List[Tuple[int, float]] = []
        for t, w in qf.items():
            v = (-1.0 if fnv1a(t + "~") & 1 else 1.0) * w
            qnorm += v * v
            vec.append((fnv1a(t) % self.dim, v))
        qnorm = math.sqrt(qnorm) or 1.0
        return [(i, w / qnorm) for i, w in vec], qf, sum(qf.values())

    def search(self, query: str, top_k: int = 4) -> List[Dict]:
        """混合检索：0.6×余弦 + 0.4×标题词面；低于阈值的结果过滤掉。"""
        tokens = tokenize(query)
        if not tokens or not self.available:
            return []

        q_vec, q_weights, weight_sum = self._query_vector(tokens)
        q_map: Dict[int, float] = {}
        for idx, w in q_vec:
            q_map[idx] = q_map.get(idx, 0.0) + w

        scored: List[Tuple[float, Dict]] = []
        for doc in self.docs:
            # 余弦（双方已归一化）
            dot = 0.0
            for idx, w in doc.get("vec", []):
                qv = q_map.get(idx)
                if qv is not None:
                    dot += qv * w
            # 标题词面匹配
            lex_num = 0.0
            if weight_sum > 0:
                title_toks = set(tokenize(f"{doc.get('title','')} {doc.get('subject','')} {doc.get('href','')}"))
                for t, w in q_weights.items():
                    if t in title_toks:
                        lex_num += w
            lexical = lex_num / weight_sum if weight_sum > 0 else 0.0
            score = 0.6 * dot + 0.4 * lexical
            if score >= RAG_THRESHOLD:
                scored.append((score, doc))

        scored.sort(key=lambda x: x[0], reverse=True)
        results = []
        for score, doc in scored[:top_k]:
            results.append(
                {
                    "category": doc.get("category", ""),
                    "subject": doc.get("subject", ""),
                    "name": doc.get("title", ""),
                    "href": doc.get("href", ""),
                    "score": round(score, 4),
                }
            )
        return results


rag_index = RagIndex()

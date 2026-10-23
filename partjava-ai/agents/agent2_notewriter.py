"""
智能体二：【知识提炼与自动写笔记智能体 (Note Summarizer & Writer Agent)】
职责：
1. 将「对话上下文」+「当前正在浏览的课程页面正文」+「刚才联网检索到的权威资料」提炼为高质量 Markdown 学习笔记；
2. 返回严格匹配后端 MySQL `notes` 表 (`Note.java`) 结构的 JSON：
   `{ title, content, category, technology, subcategory, tags, isPublic }`；
3. 支持多重 JSON 容错解析与离线智能降级生成（即便未配置 Key 也能基于页面/对话自动提取结构化 Markdown 笔记）。
"""

import json
import re
from datetime import datetime
from typing import Dict, Any, Optional, List
import httpx
from config import settings


class NoteWriterAgent:
    def __init__(self) -> None:
        self.valid_categories = ["算法", "前端", "后端", "数据库", "AI", "工具", "安全", "软件工程"]

    async def generate_note(
        self,
        conversation_text: str = "",
        page_context: str = "",
        custom_topic: str = "",
    ) -> Dict[str, Any]:
        source_material = ""
        if custom_topic:
            source_material += f"【用户指定笔记主题/要求】:\n{custom_topic}\n\n"
        if conversation_text.strip():
            source_material += f"【最近对话记录】:\n{conversation_text.strip()}\n\n"
        if page_context.strip():
            source_material += f"【当前所在学习页面内容】:\n{page_context.strip()[:15000]}\n\n"

        if not source_material.strip():
            return {
                "title": f"PartJava 学习随笔 · {datetime.now().strftime('%m-%d %H:%M')}",
                "content": "## 核心要点\n\n- 暂无对话或页面上下文，可在此处自由编写 Markdown 笔记。",
                "category": "后端",
                "technology": "Java",
                "subcategory": "综合",
                "tags": ["学习笔记", "PartJava"],
                "isPublic": False,
            }

        system_prompt = (
            "你是 PartJava 温暖书房的【智能体二：知识提炼与自动写笔记专家（黑猫袋子）】。\n"
            "请将用户提供的对话内容或当前学习页面内容，提炼整理为一篇结构严谨、重点突出的高质量 Markdown 学习笔记。\n"
            "必须只返回一个合法的 JSON 对象（不要用 ```json 包裹，不要输出多余解释），字段严格如下：\n"
            "{\n"
            '  "title": "精准简短的笔记标题（不超过28字）",\n'
            '  "content": "结构清晰的 Markdown 正文（必须包含：## 1. 核心概念、## 2. 重点原理与代码示例（用 ```代码块）、## 3. 常见易错点与总结）",\n'
            '  "category": "分类（从 算法/前端/后端/数据库/AI/工具/安全/软件工程 中选一）",\n'
            '  "technology": "核心技术栈（如 Java, Python, C++, React, SQL, DeepSeek, Linux 等）",\n'
            '  "subcategory": "子分类（如 多线程、二叉树、渗透测试 等）",\n'
            '  "tags": ["标签1", "标签2", "标签3"],\n'
            '  "isPublic": false\n'
            "}"
        )

        api_key = settings.DEEPSEEK_API_KEY
        if api_key and not api_key.startswith("your_"):
            try:
                async with httpx.AsyncClient(timeout=45.0) as client:
                    resp = await client.post(
                        f"{settings.DEEPSEEK_BASE_URL}/chat/completions",
                        headers={
                            "Authorization": f"Bearer {api_key}",
                            "Content-Type": "application/json",
                        },
                        json={
                            "model": settings.DEEPSEEK_MODEL_FLASH,
                            "messages": [
                                {"role": "system", "content": system_prompt},
                                {"role": "user", "content": source_material},
                            ],
                            "temperature": 0.3,
                            "stream": False,
                        },
                    )
                    if resp.status_code == 200:
                        data = resp.json()
                        raw_reply = (
                            data.get("choices", [{}])[0]
                            .get("message", {})
                            .get("content", "")
                        )
                        parsed = self._parse_note_json(raw_reply)
                        if parsed:
                            return self._normalize_note(parsed)
            except Exception as e:
                print(f"[Agent2 NoteWriter] DeepSeek API 调用异常，启用本地智能提炼兜底: {e}")

        # 离线/未配 Key 时的结构化智能提炼兜底
        return self._fallback_extract_note(conversation_text, page_context, custom_topic)

    def _parse_note_json(self, raw: str) -> Optional[Dict[str, Any]]:
        if not raw:
            return None
        clean = raw.strip()
        md_match = re.search(r"```(?:json)?\s*\n?([\s\S]*?)```", clean)
        if md_match:
            clean = md_match.group(1).strip()

        start = clean.find("{")
        end = clean.rfind("}")
        if start >= 0 and end > start:
            clean = clean[start : end + 1]

        for candidate in (clean, clean.replace("“", '"').replace("”", '"')):
            try:
                return json.loads(candidate)
            except Exception:
                pass
        return None

    def _normalize_note(self, d: Dict[str, Any]) -> Dict[str, Any]:
        tags = d.get("tags") or ["学习笔记"]
        if isinstance(tags, str):
            tags = [t.strip() for t in re.split(r"[,，\s]+", tags) if t.strip()]
        return {
            "title": str(d.get("title") or f"学习笔记 · {datetime.now().strftime('%m-%d %H:%M')}")[:50],
            "content": str(d.get("content") or ""),
            "category": str(d.get("category") or "后端"),
            "technology": str(d.get("technology") or "Java"),
            "subcategory": str(d.get("subcategory") or ""),
            "tags": [str(t) for t in tags[:6]],
            "isPublic": bool(d.get("isPublic", False)),
        }

    def _fallback_extract_note(
        self, conversation_text: str, page_context: str, custom_topic: str
    ) -> Dict[str, Any]:
        title = custom_topic.strip() if custom_topic else ""
        tech = "Java"
        cat = "后端"
        if page_context:
            m_title = re.search(r"标题:\s*(.+)", page_context)
            if m_title and not title:
                title = f"{m_title.group(1).strip()} · 核心总结笔记"
            if "/ai/" in page_context:
                cat, tech = "AI", "Python"
            elif "/security/" in page_context:
                cat, tech = "安全", "Security"
            elif "/frontend/" in page_context:
                cat, tech = "前端", "React/JS"
            elif "/ds/" in page_context:
                cat, tech = "算法", "数据结构与算法"

        if not title:
            title = f"袋子助教总结笔记 · {datetime.now().strftime('%Y-%m-%d %H:%M')}"

        sections: List[str] = [f"# {title}\n"]
        if conversation_text.strip():
            sections.append("## 一、 核心问答与要点回顾\n\n" + conversation_text.strip())
        if page_context.strip():
            sections.append("## 二、 当前课程页面重点摘录\n\n" + page_context.strip()[:2500])
        sections.append(
            "## 三、 袋子复习建议\n\n"
            "- 建议结合 PartJava **在线代码沙箱 (`/code/editor`)** 动手敲一遍核心代码；\n"
            "- 前往 **星际编程挑战 (`/challenges`)** 完成对应章节闯关练习。"
        )
        return {
            "title": title[:40],
            "content": "\n\n".join(sections),
            "category": cat,
            "technology": tech,
            "subcategory": "AI智能提炼",
            "tags": [cat, tech, "袋子笔记"],
            "isPublic": False,
        }


note_writer_agent = NoteWriterAgent()

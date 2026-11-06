"""
【站内领航与页面伴读 (Site Navigator)】
职责：
1. 自动解析 `app/_shared/data/navigation.ts`，构建全站 310+ 学习页面与功能页路由知识库；
2. 根据用户提问检索最匹配的站内页面（返回可直接点击跳转的 `siteLinks` 胶囊列表）；
3. 结合前端传来的 `pageContext`（当前打开页面的标题、路径与正文），用 `deepseek-flash`（1M 上下文）精准伴读答疑。
"""

import re
from typing import List, Dict, Any, Optional
from config import settings
from agents.rag_index import rag_index


class SiteNavigator:
    def __init__(self) -> None:
        self.routes: List[Dict[str, str]] = []
        self._load_routes()

    def _load_routes(self) -> None:
        """从 navigation.ts 动态解析全站 310+ 课程路由，并补充核心功能页路由"""
        core_routes = [
            {"category": "核心功能", "subject": "星际编程闯关", "name": "编程挑战与题库闯关", "href": "/challenges", "keywords": "挑战 刷题 题库 闯关 排行榜 练习 编程题"},
            {"category": "核心功能", "subject": "在线代码沙箱", "name": "多语言在线代码编辑器", "href": "/code/editor", "keywords": "代码 编辑器 运行 编译 在线编程 沙箱 IDE"},
            {"category": "核心功能", "subject": "随堂笔记中心", "name": "学习笔记广场与我的笔记", "href": "/notes", "keywords": "笔记 markdown 记录 总结 收藏 公开笔记"},
            {"category": "核心功能", "subject": "3D算法可视化", "name": "3D 交互式算法与数据结构可视化实验室", "href": "/study/computer/ds/basic", "keywords": "3d算法 可视化 红黑树 排序 图论 链表 二叉树 动画"},
            {"category": "核心功能", "subject": "极客解压游戏", "name": "趣味编程小游戏中心", "href": "/tools/game", "keywords": "游戏 放松 解压 贪吃蛇 2048"},
            {"category": "核心功能", "subject": "全局知识搜索", "name": "全站课程与笔记搜索", "href": "/tools/search", "keywords": "搜索 查找 检索"},
        ]
        self.routes.extend(core_routes)

        nav_path = settings.NAVIGATION_TS_PATH
        if not nav_path.exists():
            return

        content = nav_path.read_text(encoding="utf-8", errors="ignore")
        # 解析形如 { name: '多线程与并发', href: '/study/computer/java/thread' }
        pattern = re.compile(
            r"\{\s*name:\s*['\"]([^'\"]+)['\"]\s*,\s*href:\s*['\"]([^'\"]+)['\"]\s*\}"
        )
        subject_map = {
            "cpp": ("计算机", "C++"),
            "python": ("计算机", "Python"),
            "java": ("计算机", "Java"),
            "sql": ("计算机", "SQL数据库"),
            "ds": ("计算机", "数据结构与算法"),
            "os": ("计算机", "操作系统"),
            "linux": ("计算机", "Linux系统"),
            "network": ("计算机/安全", "计算机网络"),
            "frontend": ("计算机/安全", "Web前端开发"),
            "go": ("计算机", "Go语言"),
            "php": ("计算机", "PHP"),
            "iot": ("计算机", "物联网"),
            "composition": ("计算机", "计算机组成原理"),
            "ml": ("人工智能", "机器学习"),
            "dl": ("人工智能", "深度学习"),
            "rl": ("人工智能", "强化学习"),
            "nlp": ("人工智能", "自然语言处理"),
            "cv": ("人工智能", "计算机视觉"),
            "recsys": ("人工智能", "推荐系统"),
            "robot": ("人工智能", "智能机器人"),
            "programming": ("人工智能", "AI程序设计"),
            "datamining": ("人工智能", "数据挖掘"),
            "protection": ("网络安全", "安全防护"),
            "penetration": ("网络安全", "渗透测试"),
            "crypto": ("网络安全", "密码学"),
            "reverse": ("网络安全", "逆向工程"),
            "dev": ("网络安全", "安全开发"),
            "ops": ("网络安全", "安全运维"),
            "blockchain": ("网络安全", "区块链安全"),
            "architecture-design": ("软件工程", "架构与设计模式"),
            "standards-testing": ("软件工程", "开发规范与测试"),
            "javaee": ("软件工程", "Java EE企业级开发"),
            "android": ("软件工程", "安卓开发"),
            "dotnet": ("软件工程", ".NET开发"),
            "cloud": ("软件工程", "云计算与容器"),
            "bigdata": ("软件工程", "大数据分析"),
            "search": ("软件工程", "智能搜索引擎"),
            "modeling": ("软件工程", "软件建模与UML"),
            "game": ("软件工程", "动画与游戏设计"),
        }

        seen = set()
        for match in pattern.finditer(content):
            name, href = match.group(1).strip(), match.group(2).strip()
            if href in seen:
                continue
            seen.add(href)
            parts = [p for p in href.split("/") if p]
            subj_key = parts[2] if len(parts) >= 3 else ""
            cat, subj = subject_map.get(subj_key, ("课程中心", subj_key))
            self.routes.append(
                {
                    "category": cat,
                    "subject": subj,
                    "name": f"{subj} · {name}" if subj and subj not in name else name,
                    "href": href,
                    "keywords": f"{cat} {subj} {name} {' '.join(parts)}".lower(),
                }
            )

    def match_site_links(self, query: str, current_pathname: Optional[str] = None, top_k: int = 4) -> List[Dict[str, str]]:
        """根据用户问题检索最匹配的站内页面链接（RAG 向量检索优先，低置信回落关键词）"""
        q = (query or "").strip().lower()
        if not q:
            return []

        # 1) RAG 混合检索（0.6×余弦 + 0.4×标题词面，共享 rag-index.json 向量空间）
        if rag_index.available:
            rag_hits = rag_index.search(query, top_k=top_k)
            if rag_hits:
                return [
                    {
                        "category": h["category"],
                        "subject": h["subject"],
                        "name": h["name"],
                        "href": h["href"],
                    }
                    for h in rag_hits
                ]
            # RAG 无强相关命中 → 回落关键词打分（同义词映射在关键词层，与 TS 端行为一致）

        # 2) 关键词打分（索引不可用 / RAG 低置信时的兜底层）
        # 提取中文词块与英文单词
        tokens = re.findall(r"[a-z0-9\+\#\.]+|[\u4e00-\u9fa5]{2,}", q)
        # 针对常见同义词扩展
        synonyms = {
            "红黑树": ["树与二叉树", "ds", "tree"],
            "二叉树": ["树与二叉树", "tree"],
            "链表": ["线性表", "linear"],
            "排序": ["排序与查找", "sort"],
            "动态规划": ["dp", "动态规划"],
            "多线程": ["thread", "concurrency", "并发", "进程与线程"],
            "并发": ["thread", "concurrency", "async"],
            "虚拟机": ["jvm", "java"],
            "spring": ["javaee", "frameworks", "microservice"],
            "微服务": ["microservice", "microservices"],
            "docker": ["container", "docker", "cloud"],
            "k8s": ["container", "cloud"],
            "设计模式": ["patterns", "architecture-design"],
            "大模型": ["transformer", "nlp", "dl", "attention"],
            "神经网络": ["neural-networks", "cnn", "rnn", "dl"],
            "sql注入": ["sql", "frontend", "penetration"],
            "xss": ["xss", "frontend"],
            "笔记": ["/notes"],
            "刷题": ["/challenges"],
            "题目": ["/challenges"],
            "挑战": ["/challenges"],
            "编辑器": ["/code/editor"],
        }
        expanded_terms = set(tokens)
        for k, vals in synonyms.items():
            if k in q:
                expanded_terms.update(vals)
        # 二字切分兜底
        for ch_block in re.findall(r"[\u4e00-\u9fa5]{2,}", q):
            for i in range(len(ch_block) - 1):
                expanded_terms.add(ch_block[i : i + 2])

        scored: List[tuple[float, Dict[str, str]]] = []
        for item in self.routes:
            score = 0.0
            kw = item["keywords"]
            name_lower = item["name"].lower()
            subj_lower = item["subject"].lower()

            if item["href"] == current_pathname:
                score += 1.5

            for term in expanded_terms:
                if len(term) < 2 and term not in ("c", "r"):
                    continue
                if term in name_lower:
                    score += 5.0
                elif term in subj_lower:
                    score += 3.5
                elif term in kw:
                    score += 2.0

            if score > 0:
                scored.append((score, item))

        scored.sort(key=lambda x: x[0], reverse=True)
        results = []
        for score, item in scored[:top_k]:
            if score >= 2.0:
                results.append(
                    {
                        "category": item["category"],
                        "subject": item["subject"],
                        "name": item["name"],
                        "href": item["href"],
                    }
                )
        return results

    def build_system_prompt_fragment(
        self, query: str, page_context: Optional[str] = None, current_pathname: Optional[str] = None
    ) -> tuple[str, List[Dict[str, str]]]:
        """生成注入给大模型的站内路由地图与当前页面伴读上下文"""
        matched_links = self.match_site_links(query, current_pathname=current_pathname, top_k=4)
        links_text = ""
        if matched_links:
            lines = [f"- 《{m['name']}》 (路径: `{m['href']}`)" for m in matched_links]
            links_text = (
                "\n【站内检索 · 命中的 PartJava 相关课程页面】:\n"
                + "\n".join(lines)
                + "\n请在回答中自然地向用户推荐这些站内页面（可写成 Markdown 链接如 `[Java · 多线程与并发](/study/computer/java/thread)`）。"
            )

        page_ctx_text = ""
        if page_context and page_context.strip():
            page_ctx_text = (
                f"\n【用户当前正在浏览的 PartJava 页面正文上下文】:\n"
                f"{page_context[:12000]}\n"
                "如果用户的问题与当前页面相关，请优先结合当前页面内容深入浅出地讲解！"
            )

        return links_text + page_ctx_text, matched_links


navigator = SiteNavigator()

"""
【全网深搜与权威引证 (Web Search)】
职责：
1. 对接 DeepSeek 2026-10-17 新开放的自研搜索引擎与网页抓取独立工具接口：
   - `POST https://api.deepseek.com/v1/tools/search` (执行网页搜索，5元/千次)
   - `POST https://api.deepseek.com/v1/tools/fetch`  (抓取网页正文内容，5元/千次)
2. 同时支持调用 `deepseek-v4-pro` (`DeepSeek-V4-Pro-0813`) 模型原生内置的 `web_search` 工具；
3. 先自主生成专业技术搜索词 -> 检索权威站点 -> 抓取核心正文 -> 返回给大模型总结，并生成带编号角标的专业外链卡片 `citations`！
"""

import re
from urllib.parse import urlparse
from typing import List, Dict, Any, Tuple
import httpx
from config import settings


class WebSearch:
    # 针对常见技术主题的高权重权威官方文档保底/增强库（当未配置 Key 或网络受限时也能精准给出顶级专业链接）
    CURATED_AUTHORITY_DOCS: List[Dict[str, str]] = [
        {
            "keywords": "java 虚拟线程 virtual thread jdk21 jep444 多线程 并发 thread",
            "title": "JEP 444: Virtual Threads - OpenJDK Official Specification",
            "url": "https://openjdk.org/jeps/444",
            "domain": "openjdk.org",
            "snippet": "OpenJDK 官方 JEP 444 规范文档：深入解析 Java 虚拟线程（Virtual Threads）的设计目标、M:N 调度模型、Pinned 线程规避与高并发最佳实践。",
        },
        {
            "keywords": "java 文档 教程 标准库 api jdk oracle collections stream",
            "title": "Oracle Java SE Documentation & Dev.java Official Portal",
            "url": "https://dev.java/learn/",
            "domain": "dev.java",
            "snippet": "Oracle 官方维护的现代 Java 开发者门户（Dev.java），涵盖 Java 基础语法、集合框架、Stream API、JVM 垃圾回收与最新 JDK 特性。",
        },
        {
            "keywords": "spring boot springcloud 微服务 框架 后端 javaee",
            "title": "Spring Boot & Spring Framework Official Reference Documentation",
            "url": "https://docs.spring.io/spring-boot/index.html",
            "domain": "docs.spring.io",
            "snippet": "Spring 官方参考手册：涵盖 Spring Boot 自动装配原理、Spring AI、Spring Cloud 微服务治理与生产级监控配置。",
        },
        {
            "keywords": "红黑树 二叉树 算法 数据结构 排序 动态规划 图论 复杂度",
            "title": "OI Wiki & Hello Algo - 交互式数据结构与算法权威指南",
            "url": "https://www.hello-algo.com/",
            "domain": "hello-algo.com",
            "snippet": "开源高分数据结构与算法动画图解教程，详细推导二叉树、红黑树旋转、图论最短路径、动态规划状态转移方程与复杂度分析。",
        },
        {
            "keywords": "deepseek 大模型 agent rag 工具调用 web_search api 人工智能 深度学习",
            "title": "DeepSeek API Official Platform Documentation (V4 & Search Tools)",
            "url": "https://platform.deepseek.com/api-docs/",
            "domain": "platform.deepseek.com",
            "snippet": "DeepSeek 官方开放平台文档：包含 deepseek-flash (1M上下文)、deepseek-v4-pro、内置 web_search 以及 /v1/tools/search 与 /v1/tools/fetch 接口说明。",
        },
        {
            "keywords": "react 前端 js javascript css html mdn 浏览器 dom nextjs",
            "title": "MDN Web Docs (Mozilla Developer Network) & React Official Docs",
            "url": "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript",
            "domain": "developer.mozilla.org",
            "snippet": "Web 前端最具权威性的 MDN 官方技术文档，涵盖 ES6+ 标准、事件循环、Promise 异步机制、浏览器渲染原理与网络安全策略。",
        },
        {
            "keywords": "安全 渗透 xss csrf sql注入 漏洞 owasp 密码学 防护",
            "title": "OWASP Top 10 & Cheat Sheet Series - 全球 Web 应用安全权威指南",
            "url": "https://cheatsheetseries.owasp.org/",
            "domain": "owasp.org",
            "snippet": "OWASP 基金会官方安全编码备忘录：详解 SQL 注入防护、XSS 跨站脚本防御、CSRF 令牌机制、JWT 认证安全与渗透测试规范。",
        },
        {
            "keywords": "python pytorch 机器学习 神经网络 transformer 强化学习 nlp cv",
            "title": "PyTorch & Hugging Face Official Documentation",
            "url": "https://pytorch.org/tutorials/",
            "domain": "pytorch.org",
            "snippet": "PyTorch 官方教程与深度学习实战指南：涵盖张量计算、自动求导 Autograd、Transformer 注意力机制实现与分布式模型训练。",
        },
        {
            "keywords": "mysql sql 数据库 索引 事务 锁 优化 b+树 explain",
            "title": "MySQL 8.4 Official Reference Manual - Optimization & Indexes",
            "url": "https://dev.mysql.com/doc/refman/8.4/en/optimization.html",
            "domain": "dev.mysql.com",
            "snippet": "MySQL 官方参考手册优化章节：详述 InnoDB B+ 树聚簇索引、MVCC 多版本并发控制、事务隔离级别与 EXPLAIN 执行计划调优。",
        },
    ]

    async def search_and_fetch(self, user_query: str, max_results: int = 4) -> Tuple[List[Dict[str, Any]], str]:
        """
        执行「POST /v1/tools/search 搜索 -> POST /v1/tools/fetch 抓取正文」全流程
        返回: (citations 权威外链列表, 拼接好的网页抓取正文 RAG 上下文)
        """
        api_key = settings.DEEPSEEK_API_KEY
        citations: List[Dict[str, Any]] = []
        fetched_texts: List[str] = []

        # 1. 如果配置了真实 DeepSeek API Key，优先调用官方 2026-10-17 开放的 /v1/tools/search 与 /v1/tools/fetch
        if api_key and not api_key.startswith("your_"):
            try:
                async with httpx.AsyncClient(timeout=20.0) as client:
                    headers = {
                        "Authorization": f"Bearer {api_key}",
                        "Content-Type": "application/json",
                    }
                    # Step A: 调用 POST https://api.deepseek.com/v1/tools/search
                    search_resp = await client.post(
                        settings.DEEPSEEK_SEARCH_URL,
                        headers=headers,
                        json={
                            "query": user_query,
                            "top_k": max_results,
                        },
                    )
                    if search_resp.status_code == 200:
                        s_data = search_resp.json()
                        raw_items = (
                            s_data.get("results")
                            or s_data.get("data")
                            or s_data.get("organic")
                            or []
                        )
                        for idx, item in enumerate(raw_items[:max_results], start=1):
                            url = item.get("url") or item.get("link") or ""
                            if not url:
                                continue
                            domain = urlparse(url).netloc.replace("www.", "")
                            citations.append(
                                {
                                    "index": idx,
                                    "title": item.get("title") or domain,
                                    "url": url,
                                    "domain": domain,
                                    "snippet": item.get("snippet") or item.get("content") or item.get("summary") or "",
                                    "source": "live",
                                    "contentFetched": False,
                                }
                            )

                    # Step B: 对排名前 2 的权威网页调用 POST https://api.deepseek.com/v1/tools/fetch 抓取详细正文
                    for cite in citations[:2]:
                        try:
                            fetch_resp = await client.post(
                                settings.DEEPSEEK_FETCH_URL,
                                headers=headers,
                                json={"url": cite["url"]},
                            )
                            if fetch_resp.status_code == 200:
                                f_data = fetch_resp.json()
                                page_body = (
                                    f_data.get("content")
                                    or f_data.get("markdown")
                                    or f_data.get("text")
                                    or ""
                                )
                                if page_body:
                                    cite["contentFetched"] = True
                                    fetched_texts.append(
                                        f"### 来源 [{cite['index']}] {cite['title']} ({cite['url']})\n"
                                        f"{str(page_body)[:3500]}"
                                    )
                        except Exception as fe:
                            print(f"[Agent4 Fetch Warning] 抓取 {cite['url']} 略过: {fe}")
            except Exception as se:
                print(f"[Agent4 Search Warning] DeepSeek /v1/tools/search 调用回退: {se}")

        # 2. 如果未配置 Key 或官方搜索返回为空，补充精选权威技术站点索引，确保永远返回有价值的专业外链卡片
        if not citations:
            citations = self._match_curated_authorities(user_query, max_results=max_results)

        rag_context = ""
        if fetched_texts:
            rag_context = (
                "\n【联网深搜检索并抓取的权威外部网站资料】:\n"
                + "\n\n".join(fetched_texts)
                + "\n请在回答中充分融合上述权威资料，并在提及对应观点时使用 `[1]`、`[2]` 标注来源，或引导用户点击气泡下方的权威外部链接卡片！"
            )

        return citations, rag_context

    def _match_curated_authorities(self, query: str, max_results: int = 3) -> List[Dict[str, Any]]:
        q = (query or "").lower()
        scored = []
        for doc in self.CURATED_AUTHORITY_DOCS:
            score = 0
            for kw in doc["keywords"].split():
                if kw in q:
                    score += 3
            for ch_word in re.findall(r"[\u4e00-\u9fa5]{2,}", q):
                if ch_word in doc["keywords"] or ch_word in doc["snippet"]:
                    score += 2
            scored.append((score, doc))

        scored.sort(key=lambda x: x[0], reverse=True)
        picked = [item[1] for item in scored[:max_results] if item[0] > 0]
        if not picked:
            picked = self.CURATED_AUTHORITY_DOCS[:2]

        return [
            {
                "index": idx + 1,
                "title": d["title"],
                "url": d["url"],
                "domain": d["domain"],
                "snippet": d["snippet"],
                "source": "recommended",
                "contentFetched": False,
            }
            for idx, d in enumerate(picked)
        ]


web_search = WebSearch()

'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, SectionTitle, BookParagraph, BookList, BookCode } from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '高级搜索特性',
  chapterNumber: 6,
  totalChapters: 6,
  subjectHref: '/study/se/search',
  prevChapter: { label: 'Elasticsearch示例', href: '/study/se/search/elasticsearch' },
  theme: THEMES.software,
}

const SPREADS = [
{ label: "先定义搜索质量", left: (<div className="space-y-4">
<PageTitle>先定义搜索质量</PageTitle>
<BookParagraph>高级搜索首先要能证明改动有用。以课程检索为例，收集真实但脱敏的查询，标注哪些课程相关，并按术语查询、自然语言提问和拼写错误分组。留出独立评估集，不能一边用同一批查询调权重，一边用它宣布效果提升。</BookParagraph>
<BookParagraph>标注样本还应区分“正确但太深”和“适合当前学习阶段”。新手搜事务，底层源码课可能相关却不是最佳首条结果。可以把相关性分成多个等级，再选择与产品目标相符的指标，而不是默认所有相关课程价值完全相同。</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>准确率、召回率与首条结果</PageTitle>
<BookParagraph>Precision@K 衡量前 K 条有多少相关结果；Recall@K 衡量已知相关文档中找回多少；MRR 关注首条相关结果的位置。已知相关集合不完整时，召回率只能按当前标注集合估计。平均数还应按查询类型拆开，避免热门词掩盖少见术语的退步。</BookParagraph>
<BookParagraph>这些指标回答不同问题：前几条是否有用、相关内容是否漏掉、用户能否尽早找到答案。一次改动可能让首条更好却减少长尾覆盖，因此评估报告应把多个视角并列，解释所选择的权衡。</BookParagraph>
<BookList items={["前五条中三条相关：Precision@5 为 3/5。", "已标注四条相关，前五条找到三条：Recall@5 为 3/4。", "第一条相关排第三：该查询的倒数排名为 1/3。"]} />
</div>) },
{ label: "用小程序比较排序", left: (<div className="space-y-4">
<PageTitle>用小程序比较排序</PageTitle>
<BookParagraph>下面 Python 3 程序计算二元相关性下的 MRR。分数为每个查询首条相关结果倒数的平均值，无相关命中计零。示例没有调用模型，适合先验证指标实现；正式评估还应记录样本数、相关性标注规则和查询分布。</BookParagraph>
<BookCode language="python" code={"def reciprocal_rank(results, relevant):\n    for rank, doc_id in enumerate(results, 1):\n        if doc_id in relevant:\n            return 1 / rank\n    return 0.0\n\nlabels = [{\"a\"}, {\"b\"}]\nbefore = [[\"x\", \"a\"], [\"x\", \"y\"]]\nafter = [[\"a\", \"x\"], [\"x\", \"b\"]]\nfor runs in (before, after):\n    mrr = sum(reciprocal_rank(r, y)\n              for r, y in zip(runs, labels)) / len(labels)\n    print(mrr)  # 0.25，再输出 0.75"} />
</div>), right: (<div className="space-y-4">
<PageTitle>同义词和纠错的取舍</PageTitle>
<BookParagraph>“数据库”和“DB”可能是同义表达，但 Java 与 JavaScript 不能因为前缀相近就视为同义。纠错应保留原查询并给用户选择，特别是类名、错误码和版本号。先在查询日志中找到高频零结果模式，再小范围加入规则，检查是否引入无关召回。</BookParagraph>
<BookParagraph>同义关系也有方向和上下文。例如“Spring事务”是具体框架主题，不能把任何事务查询都强制改成Spring。规则加入前应写出改善样本与反例，并记录规则适用字段，便于后续回滚。</BookParagraph>
</div>) },
{ label: "词法与语义可以互补", left: (<div className="space-y-4">
<PageTitle>词法与语义可以互补</PageTitle>
<BookParagraph>词法检索擅长精确术语和标识符，向量检索更容易覆盖自然语言表达。可分别召回候选，再用 RRF 按排名融合；直接相加原始分数往往缺乏可比尺度。融合只能重排已召回的文档，任一分支遗漏的相关内容仍可能找不到，需要同时检查候选池。</BookParagraph>
<BookParagraph>混合检索的工程难点不仅是融合公式，还包括两路结果的同一文档去重、权限一致和超时协调。若向量分支较慢，要约定等待预算及降级行为；否则一条新增路径可能让原本快速的精确检索变得难用。</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>上线还要考虑代价</PageTitle>
<BookParagraph>向量模型、索引版本、延迟和计算成本都应记录。任何分支都必须应用同样的权限约束，融合后再检查也不能让私密内容进入摘要或模型上下文。高亮片段只是文本匹配提示；生成回答时应保留可访问的原文链接，并允许用户核对出处。</BookParagraph>
<BookParagraph>模型更新会改变向量空间，旧文档向量与新查询向量不一定可直接混用。需要记录嵌入模型与切分版本，在离线评估和重建计划中一起管理，不能只替换接口里的模型名就假定检索语义保持一致。</BookParagraph>
<BookList items={["对比基线：相关性指标、零结果率和 P95 响应时间。", "更新策略：模型变更时评估是否重建全部向量。", "故障降级：向量服务失败时保留可用的词法查询。"]} />
</div>) },
{ label: "从单一平均分走向查询集合", left: (<div className="space-y-4">
<PageTitle>从单一平均分走向查询集合</PageTitle>
<BookParagraph>把查询按精确术语、问题描述、版本号和拼写错误分组，再比较同一配置在各组的结果。总 MRR 上升不代表每类查询都更好：自然语言提问可能改善，类名检索却变差。标注时保留分歧与理由，同一课程是否相关应由用户意图决定，不能只用词面出现次数代替判断。</BookParagraph>
<SectionTitle>评估对象对比</SectionTitle>
<div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><thead><tr><th className="border-b p-2 text-left">查询类型</th><th className="border-b p-2 text-left">主要期望</th><th className="border-b p-2 text-left">容易发生的问题</th></tr></thead><tbody><tr><td className="border-b p-2 align-top">精确错误码</td><td className="border-b p-2 align-top">命中原样标识符</td><td className="border-b p-2 align-top">语义近似掩盖精确匹配</td></tr><tr><td className="border-b p-2 align-top">自然语言提问</td><td className="border-b p-2 align-top">理解同义表达</td><td className="border-b p-2 align-top">只按相同词检索漏召回</td></tr><tr><td className="border-b p-2 align-top">版本号</td><td className="border-b p-2 align-top">保持版本区别</td><td className="border-b p-2 align-top">过度归一化混淆版本</td></tr><tr><td className="border-b p-2 align-top">拼写错误</td><td className="border-b p-2 align-top">给可解释的纠错</td><td className="border-b p-2 align-top">误改专业术语</td></tr></tbody></table></div>
</div>), right: (<div className="space-y-4">
<PageTitle>用Precision与Recall看截断结果</PageTitle>
<BookParagraph>若相关集合是 A、C、D，前五条结果为 A、B、C、E、F，则 Precision@5 为二除五，Recall@5 为二除三。把 K 从五提高到十可能增加召回，但用户未必会看后面的结果，因此还应关注前几条体验。代码只使用已标注集合，没有覆盖到的相关文档不能被凭空计入分母。</BookParagraph>
<SectionTitle>Python 3计算例子</SectionTitle>
<BookCode language="python" showLineNumbers code={"relevant = {\"A\", \"C\", \"D\"}\nranking = [\"A\", \"B\", \"C\", \"E\", \"F\"]\nk = 5\ntop = ranking[:k]\nfound = len(set(top) & relevant)\nprecision = found / k\nrecall = found / len(relevant)\nprint(round(precision, 2), round(recall, 2))  # 0.4 0.67\n# 本例恰有5条；若不足K条，应预先约定指标分母策略。"} />
</div>) },
{ label: "RRF为什么使用名次", left: (<div className="space-y-4">
<PageTitle>RRF为什么使用名次</PageTitle>
<BookParagraph>两路检索分数尺度可能不同，一路最高是二十，另一路最高是零点八，直接相加会让前者主导。RRF 按每路排名贡献一除以常数加名次，再对同一文档累加。它不能证明文档必然正确，只是一种融合顺序的办法；常数和候选窗口也要通过固定评估集选择。</BookParagraph>
<SectionTitle>Python 3手算融合</SectionTitle>
<BookCode language="python" showLineNumbers code={"from collections import defaultdict\nlists = [[\"A\", \"B\", \"C\"], [\"C\", \"A\", \"D\"]]\nscores = defaultdict(float)\nconstant = 60\nfor ranking in lists:\n    for rank, doc_id in enumerate(ranking, 1):\n        scores[doc_id] += 1 / (constant + rank)\norder = sorted(scores, key=lambda d: (-scores[d], d))\nprint(order)  # ['A', 'C', 'B', 'D']"} />
</div>), right: (<div className="space-y-4">
<PageTitle>融合例子的结果解释</PageTitle>
<BookParagraph>A 在两路分别第一、第二，C 分别第三、第一，因此 A 的两项贡献总和略高于 C。B 和 D 都只出现一次，但 B 排第二、D 排第三，B 因此靠前。若候选窗口只取每路第一条，A 与 C 以外的文档根本没有参与机会；这说明融合配置同时影响候选覆盖与最终排序。</BookParagraph>
<SectionTitle>演算表</SectionTitle>
<div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><thead><tr><th className="border-b p-2 text-left">文档</th><th className="border-b p-2 text-left">词法名次</th><th className="border-b p-2 text-left">语义名次</th><th className="border-b p-2 text-left">融合贡献</th></tr></thead><tbody><tr><td className="border-b p-2 align-top">A</td><td className="border-b p-2 align-top">1</td><td className="border-b p-2 align-top">2</td><td className="border-b p-2 align-top">1/61 + 1/62</td></tr><tr><td className="border-b p-2 align-top">C</td><td className="border-b p-2 align-top">3</td><td className="border-b p-2 align-top">1</td><td className="border-b p-2 align-top">1/63 + 1/61</td></tr><tr><td className="border-b p-2 align-top">B</td><td className="border-b p-2 align-top">2</td><td className="border-b p-2 align-top">无</td><td className="border-b p-2 align-top">1/62</td></tr><tr><td className="border-b p-2 align-top">D</td><td className="border-b p-2 align-top">无</td><td className="border-b p-2 align-top">3</td><td className="border-b p-2 align-top">1/63</td></tr></tbody></table></div>
</div>) },
{ label: "向量检索的表达边界", left: (<div className="space-y-4">
<PageTitle>向量检索的表达边界</PageTitle>
<BookParagraph>向量将文本映射为固定维度数值，近似相似不等于逻辑等价。“支持事务”和“不支持事务”可能共享很多词，模型也可能无法稳定区分。课程按段切分时，应保留标题、章节路径与原文位置；段太小会丢上下文，太大可能让多个主题混在一起。切分策略也属于评估对象。</BookParagraph>
<SectionTitle>具体切分练习</SectionTitle>
<BookParagraph>将一篇含定义、反例和代码的课程分别按固定长度和标题结构切分。检索“何时不支持回滚”，检查命中段是否含否定条件与前提；只有标题命中而正文缺失，不能算回答依据完整。</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>模糊匹配不宜无限扩展</PageTitle>
<BookParagraph>拼写容错按编辑差异扩展候选，适合少量错字的普通术语，但对短词、类名和错误码可能引入大量无关结果。先尝试原查询，再提示候选纠错，或对特定字段使用有限模糊匹配。应同时测零结果减少多少和误召回增加多少，不把“搜出更多”自动视为质量提升。</BookParagraph>
<SectionTitle>Dev Tools示意请求</SectionTitle>
<BookCode language="text" showLineNumbers code={"GET lessons_lab/_search\n{\n  \"query\": {\"match\": {\"title\": {\n    \"query\": \"transactoin\",\n    \"fuzziness\": \"AUTO\",\n    \"prefix_length\": 1\n  }}}\n}\n// 需先按前章写入含transaction的文档；实际候选取决于词项。"} />
</div>) },
{ label: "重排与生成回答的职责不同", left: (<div className="space-y-4">
<PageTitle>重排与生成回答的职责不同</PageTitle>
<BookParagraph>重排器在候选中估计相关性，生成模型则组织文本回答，不能因此跳过检索权限和来源核对。给模型的段落应包含可追踪 ID 与链接，并防止来源内容指令改变系统任务。遇到资料不足，应说明缺少依据而不是编造章节。评估时同时检查检索结果、引用支撑和答案是否忠于原文。</BookParagraph>
<SectionTitle>过程示意</SectionTitle>
<BookCode language="text" showLineNumbers code={"用户问题 → 受控权限条件 → 多路召回\n → 候选去重/重排 → 选择可访问的原文段落\n → 生成含来源的回答 → 核对引用与回答依据\n注：每个阶段分别记录版本、结果ID与耗时。"} />
</div>), right: (<div className="space-y-4">
<PageTitle>评估报告应能解释退步</PageTitle>
<BookParagraph>把同一批查询在基线与新配置的前五条并排展示，记录最明显的改善与退步，再看总体指标与延迟。对“HTTP 500”这类精确词查询，若语义方案总把类似网络错误排前面，应保留精确术语的权重或路由策略，而不是删除这类评估样本。负面案例是改进依据，不应被平均数隐藏。</BookParagraph>
<SectionTitle>本章思考题</SectionTitle>
<BookParagraph>若 MRR 提高而 P95 延迟翻倍，你会如何按用户等待、查询类型和资源成本决策？参考答案应提出约束与分组结果，也可以采用两阶段召回或故障降级，不能只写“更高分所以发布”。</BookParagraph>
</div>) },
{ label: "练习：设计一次改进实验", left: (<div className="space-y-4">
<PageTitle>练习：设计一次改进实验</PageTitle>
<BookParagraph>选二十条课程查询，人工标注相关文档，并拆成调参与评估两组。只改变一项策略，例如标题权重或增加同义词；保存两份排名，计算 MRR 和 Precision@5，逐条检查变好与变差的查询。样本很小时应描述观察，不把偶然提升当作普遍结论。</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>验收与参考</PageTitle>
<BookParagraph>程序应输出 0.25 和 0.75；实验报告需包含基线、改动、固定评估集、失败案例及延迟代价。能解释“为什么更好”和“哪些查询变差”，才能决定是否上线。RRF 的具体接口与可用条件随部署版本变化，接入前对照所用版本文档。</BookParagraph>
<BookList items={[<a key="https://www.elastic.co/docs/reference/elasticsearch/rest-apis/retrievers/rrf-retriever" href="https://www.elastic.co/docs/reference/elasticsearch/rest-apis/retrievers/rrf-retriever" target="_blank" rel="noopener noreferrer">Elastic：RRF retriever</a>, <a key="https://www.elastic.co/docs/solutions/search/full-text/search-with-full-text-queries" href="https://www.elastic.co/docs/solutions/search/full-text/search-with-full-text-queries" target="_blank" rel="noopener noreferrer">Elastic：全文检索</a>]} />
</div>) }
]

export default function SearchAdvancedPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

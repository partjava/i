'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, BookParagraph, BookList, BookCode } from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '大数据安全与运维',
  chapterNumber: 7,
  totalChapters: 8,
  subjectHref: '/study/se/bigdata',
  prevChapter: { label: '可视化与BI', href: '/study/se/bigdata/bi' },
  nextChapter: { label: '实战案例与项目', href: '/study/se/bigdata/projects' },
  theme: THEMES.software,
}

const SPREADS = [
{ label: "问题与概念", left: (<div className="space-y-4">
<PageTitle>{"数据安全从采集目的开始"}</PageTitle>
<BookParagraph>{"学习平台分析课程效果通常不需要姓名、手机号或完整IP。事件schema优先使用内部标识，并为字段记录用途、负责人、可访问角色和保留期限。原始数据、清洗数据、报表和备份都可能包含敏感信息，不能仅删除主表中的手机号就宣称完成清理。设计阶段就应确定到期删除和例外留存流程。"}</BookParagraph>
<BookParagraph>{"为每个字段回答为何采集、谁能访问、保存多久和如何删除。没有明确用途的字段不应因“以后也许有用”无限进入原始层。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"角色与最小权限"}</PageTitle>
<BookParagraph>{"采集服务只写接入区域，清洗作业读原始层并写清洗层，运营只查询获准的汇总表。权限要覆盖数据库、对象存储、计算日志和下载导出，前端隐藏按钮并不能阻止直接读取底层数据。共享超级管理员账号会失去责任追踪，应使用独立身份、定期复查权限，并记录授权原因与到期时间。"}</BookParagraph>
<BookParagraph>{"机器身份同样需要分离，接入与清洗不应共享宽泛管理员凭证。授权变更记录原因与期限，定期清查不再使用的任务。"}</BookParagraph>
</div>) },
{ label: "数据与可复现实验", left: (<div className="space-y-4">
<PageTitle>{"脱敏不是自动匿名化"}</PageTitle>
<BookParagraph>{"遮盖手机号便于人工展示，但内部用户号与其他表连接仍可能识别个人。简单哈希低熵手机号容易被枚举，带密钥的伪名映射能提高保护程度，但仍要按可关联数据管理。最有效的报表保护往往是减少字段、降低粒度和限制导出；极小人群的统计也可能泄露个体，应依据业务规则合并或抑制。"}</BookParagraph>
<BookParagraph>{"跨表关联和外部信息都可能重新识别个人，评估应考虑可连接性。脱敏后的数据仍按剩余风险管理，不因格式变化自动公开。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"可复现：报表只投影必要字段"}</PageTitle>
<BookParagraph>{"下例仅依赖Python 3，不访问真实个人数据。输入为虚构课程汇总，输出仅保留课程号与播放人数，断言确保联系人未进入导出。它演示数据最小化而非完整访问控制：真实导出必须由服务端检查角色和范围，字段白名单也应作为接口契约维护，不能只靠调用者自觉。"}</BookParagraph>
<BookParagraph>{"白名单之外字段新增时应默认不导出，再由评审决定是否允许。代码断言能防止意外投影，却不能代替调用者身份检查。"}</BookParagraph>
<BookCode language="python" showLineNumbers code={"rows = [{'course_id': 'c1', 'players': 12, 'contact': 'demo@example.test'}]\nallowed = ('course_id', 'players')\nreport = [{key: row[key] for key in allowed} for row in rows]\nassert all('contact' not in row for row in report)\nprint(report)"} />
</div>) },
{ label: "工程方法与边界", left: (<div className="space-y-4">
<PageTitle>{"数据库权限与行级策略"}</PageTitle>
<BookParagraph>{"PostgreSQL可以授予角色对指定表或列的权限；需要按机构隔离时，可进一步使用行级安全策略约束可见记录。表所有者、超级用户和具备绕过权限的身份存在特殊行为，因此不能仅用管理员账号测试隔离效果。验证时使用与真实应用相同权限的测试角色，分别检查允许和拒绝路径，防止跨机构读取。"}</BookParagraph>
<BookParagraph>{"权限测试必须包含拒绝案例，并用真实应用角色执行。若测试账号能绕过策略，看到正确结果也无法证明机构隔离有效。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"传输、密钥与日志"}</PageTitle>
<BookParagraph>{"跨网络传输应使用受保护连接，密钥存入受控配置服务并按角色授权，不能硬编码在课程脚本或提交到仓库。日志记录批次、操作者、资源、动作和结果，避免输出完整令牌、原始手机号及敏感事件载荷。监控系统本身也需要访问限制，因为错误堆栈和查询文本可能暴露敏感信息。"}</BookParagraph>
<BookParagraph>{"记录必要的动作和结果即可，避免把完整原始载荷带入调试日志。日志保留和导出同样需要权限，不能成为绕过主表保护的旁路。"}</BookParagraph>
</div>) },
{ label: "按处理目的限制数据流",
left: (<div className="space-y-4">
<PageTitle>{"按处理目的限制数据流"}</PageTitle>
<BookParagraph>{"例一：运营需要比较课程效果，只需课程与去重人数，不需要姓名和联系电话。把敏感字段从接入契约中移除，可同时减少存储副本、日志暴露和后续删除工作。已经采集的数据仍应按明确目的、权限和保留期限处理。"}</BookParagraph>
<BookParagraph>{"数据最小化需要贯穿原始、清洗、服务和导出层：不能主表删了手机号，调试日志和缓存仍保留完整载荷。为每层记录负责人、字段及到期机制，再验证普通分析身份确实无法绕过汇总接口读取更细明细。"}</BookParagraph>
</div>),
right: (<div className="space-y-4">
<PageTitle>{"行权限与列权限一起验证"}</PageTitle>
<BookParagraph>{"同一张表可能存放多个机构的用户进度。行约束限定本机构记录，列投影去掉不需要的联系字段；两者缺一不可。只隐藏列而保留全部行可能暴露其他机构的活动，只有行过滤却暴露手机号仍超过分析目的。"}</BookParagraph>
<BookParagraph>{"Python 3模拟两条虚构记录，机构a身份仅得到本机构课程和人数。它演示预期规则，不代替数据库或服务端授权；真实调用者的机构必须来自可信身份上下文，不能由请求参数任意声明。下表把角色与输入输出边界列清楚。"}</BookParagraph>
<div className="overflow-x-auto"><table className="min-w-[480px] w-full text-sm border-collapse"><thead><tr><th className="border border-paper-300/80 p-2 text-left">角色</th><th className="border border-paper-300/80 p-2 text-left">可读</th><th className="border border-paper-300/80 p-2 text-left">可写</th></tr></thead><tbody><tr><td className="border border-paper-300/80 p-2">接入服务</td><td className="border border-paper-300/80 p-2">必要配置</td><td className="border border-paper-300/80 p-2">接入区域</td></tr><tr><td className="border border-paper-300/80 p-2">清洗任务</td><td className="border border-paper-300/80 p-2">授权原始分区</td><td className="border border-paper-300/80 p-2">清洗分区与质量报告</td></tr><tr><td className="border border-paper-300/80 p-2">运营</td><td className="border border-paper-300/80 p-2">获准汇总范围</td><td className="border border-paper-300/80 p-2">无原始数据修改权</td></tr></tbody></table></div>
<BookCode language="python" code={"rows = [{\"org\": \"a\", \"course\": \"c1\", \"players\": 8, \"contact\": \"private\"},\n        {\"org\": \"b\", \"course\": \"c2\", \"players\": 9, \"contact\": \"private\"}]\ntrusted_org = \"a\"  # 仅为演示，实际来自可信身份上下文\nreport = [{k: row[k] for k in (\"course\", \"players\")}\n          for row in rows if row[\"org\"] == trusted_org]\nassert len(report) == 1 and \"contact\" not in report[0]\nprint(report)"} />
</div>),
},
{ label: "伪名化不等于不可关联",
left: (<div className="space-y-4">
<PageTitle>{"伪名化不等于不可关联"}</PageTitle>
<BookParagraph>{"例二：把用户号替换成稳定摘要可以减少明文传播，但同一摘要跨表仍可连接行为，知道映射或额外信息的人仍可能识别个人。因此稳定标识通常仍需权限和保留控制，不能仅因做了哈希就宣称完全匿名。"}</BookParagraph>
<BookParagraph>{"低熵手机号或顺序编号的无密钥哈希容易被枚举。实际方案可评估受控映射或带密钥伪名化，但密钥管理、轮换和跨用途关联都需要设计。本课程不发放真实密钥，重点是理解保护措施减少了什么风险、仍留下什么风险。"}</BookParagraph>
</div>),
right: (<div className="space-y-4">
<PageTitle>{"小人群统计也会泄漏"}</PageTitle>
<BookParagraph>{"例三：某机构课程只有一人参加，即使报表只显示平均分，也可能暴露个人成绩。设置最小展示人数可减少部分风险；若允许频繁改变过滤条件，还可能通过两次结果做差推断个人值，因此简单阈值并非完整保证。"}</BookParagraph>
<BookParagraph>{"下面Python 3对人数小于五的组返回受限，其余显示人数，输出受限和8。五只是教学阈值，不是通用安全标准。生产规则应结合数据敏感性、筛选能力和使用目的评估，必要时限制细分、导出与查询频率，并保留访问审计。"}</BookParagraph>
<BookCode language="python" code={"def show_group(size):\n    return \"受限\" if size < 5 else size\nprint(show_group(1))\nprint(show_group(8))"} />
</div>),
},
{ label: "删除请求沿血缘传播",
left: (<div className="space-y-4">
<PageTitle>{"删除请求沿血缘传播"}</PageTitle>
<BookParagraph>{"若用户提出有效的数据删除需求，处理范围可能包括原始事件、清洗明细、服务表、缓存和可访问导出。先用血缘登记查找所有派生位置，再按制度执行删除或不可逆去关联，并记录完成状态与例外保留依据。"}</BookParagraph>
<BookParagraph>{"备份可能按周期滚动过期，不能为了即时处理单条记录任意破坏恢复链。需要明确恢复后如何重新应用删除标记，防止旧备份把已删除数据重新引入服务。具体义务由业务和适用规则决定，本章只提供工程追踪方法，不作个案法律判断。"}</BookParagraph>
</div>),
right: (<div className="space-y-4">
<PageTitle>{"权限撤销必须覆盖导出路径"}</PageTitle>
<BookParagraph>{"案例：分析师离职后数据库访问已关闭，但先前生成的长期下载链接仍有效。权限回收应覆盖交互登录、服务账号、对象链接、共享目录和自动任务，而不只是从组织通讯录删掉名字。期限较短的授权可减少遗留暴露，但不能替代清单复查。"}</BookParagraph>
<BookParagraph>{"审计记录谁在何时以何目的导出哪份数据，下载文件应有明确范围与到期政策。对大批量或异常时段访问设置可处理告警，调查时保留必要证据并限制进一步导出。日志本身含用户和查询信息，也需限制读取。"}</BookParagraph>
</div>),
},
{ label: "运维指标应显示数据是否可信",
left: (<div className="space-y-4">
<PageTitle>{"运维指标应显示数据是否可信"}</PageTitle>
<BookParagraph>{"作业成功、数据新鲜和数据质量是不同维度。CPU正常而上游断流时，计算可能按时完成旧数据；数据量正常但用户字段缺失时，统计人数会偏低。监控组合应包含来源覆盖、最大事件时间、坏记录率和输出对账结果。"}</BookParagraph>
<BookParagraph>{"设日报要求八点可用，七点五十发现输入落后两小时，应提示业务日期和受影响看板，而不是等八点任务失败。恢复后重算并标记更正版本。告警应提供接入批次、作业版本与负责人，帮助把技术信号连接到业务影响。"}</BookParagraph>
</div>),
right: (<div className="space-y-4">
<PageTitle>{"备份演练与权限演练配套"}</PageTitle>
<BookParagraph>{"恢复数据时常需要临时扩大访问，这正是容易遗漏安全边界的时刻。隔离恢复环境应使用测试角色和受控网络，避免将真实数据恢复成公开服务；演练后按制度回收临时凭证与多余副本，保留非敏感操作证据。"}</BookParagraph>
<BookParagraph>{"同时执行拒绝用例：普通运营不能读原始层，机构a不能读机构b，清洗任务不能修改访问策略。若只用管理员检查恢复成功，就可能错过真实应用身份的权限缺陷。可靠性与安全需要在同一演练中验证，而不是分别画两张互不关联的图。"}</BookParagraph>
</div>),
},
{ label: "排错、练习与参考", left: (<div className="space-y-4">
<PageTitle>{"删除与审计的边界"}</PageTitle>
<BookParagraph>{"当保留期限到期或触发合规删除时，需定位原始层、派生层、缓存及备份的副本，明确何时真正不可恢复。对追加文件不能只删除一个索引就假定数据消失；重放历史输入还可能把已删除数据重新引入，因此应维护删除约束。审计记录保留必要证据，但同样应限制访问并规定保留周期。"}</BookParagraph>
<BookParagraph>{"删除后的历史恢复应重新应用删除标记，防止数据复活。血缘与版本记录帮助找到受影响副本，也要说明依法或依制度保留的例外。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"练习：建立权限验收矩阵"}</PageTitle>
<BookParagraph>{"列出采集、计算、运营、审计四种角色，针对原始事件、清洗明细、课程汇总和导出功能写出允许与拒绝项。验收：运营读不到个人明细，跨机构查询失败，导出没有联系人字段，拒绝操作仍有不含敏感值的审计记录。参考思路：用最小测试身份逐项验证，包括直接查询和下载地址访问，不能仅观察页面按钮。"}</BookParagraph>
<BookParagraph>{"验收矩阵逐格验证角色、资源和动作，并记录允许与拒绝证据。权限撤销后再次测试旧会话和旧下载路径，防止遗漏长期授权。"}</BookParagraph>
<BookList items={[<a key="https://www.postgresql.org/docs/current/ddl-priv.html" href="https://www.postgresql.org/docs/current/ddl-priv.html" target="_blank" rel="noreferrer" className="underline">PostgreSQL对象权限</a>,<a key="https://www.postgresql.org/docs/current/ddl-rowsecurity.html" href="https://www.postgresql.org/docs/current/ddl-rowsecurity.html" target="_blank" rel="noreferrer" className="underline">PostgreSQL行级安全策略</a>]} />
</div>) }
]

export default function SecurityPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

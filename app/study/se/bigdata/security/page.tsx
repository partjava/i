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
</div>), right: (<div className="space-y-4">
<PageTitle>{"角色与最小权限"}</PageTitle>
<BookParagraph>{"采集服务只写接入区域，清洗作业读原始层并写清洗层，运营只查询获准的汇总表。权限要覆盖数据库、对象存储、计算日志和下载导出，前端隐藏按钮并不能阻止直接读取底层数据。共享超级管理员账号会失去责任追踪，应使用独立身份、定期复查权限，并记录授权原因与到期时间。"}</BookParagraph>
</div>) },
{ label: "数据与可复现实验", left: (<div className="space-y-4">
<PageTitle>{"脱敏不是自动匿名化"}</PageTitle>
<BookParagraph>{"遮盖手机号便于人工展示，但内部用户号与其他表连接仍可能识别个人。简单哈希低熵手机号容易被枚举，带密钥的伪名映射能提高保护程度，但仍要按可关联数据管理。最有效的报表保护往往是减少字段、降低粒度和限制导出；极小人群的统计也可能泄露个体，应依据业务规则合并或抑制。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"可复现：报表只投影必要字段"}</PageTitle>
<BookParagraph>{"下例仅依赖Python 3，不访问真实个人数据。输入为虚构课程汇总，输出仅保留课程号与播放人数，断言确保联系人未进入导出。它演示数据最小化而非完整访问控制：真实导出必须由服务端检查角色和范围，字段白名单也应作为接口契约维护，不能只靠调用者自觉。"}</BookParagraph>
<BookCode language="python" showLineNumbers code={"rows = [{'course_id': 'c1', 'players': 12, 'contact': 'demo@example.test'}]\nallowed = ('course_id', 'players')\nreport = [{key: row[key] for key in allowed} for row in rows]\nassert all('contact' not in row for row in report)\nprint(report)"} />
</div>) },
{ label: "工程方法与边界", left: (<div className="space-y-4">
<PageTitle>{"数据库权限与行级策略"}</PageTitle>
<BookParagraph>{"PostgreSQL可以授予角色对指定表或列的权限；需要按机构隔离时，可进一步使用行级安全策略约束可见记录。表所有者、超级用户和具备绕过权限的身份存在特殊行为，因此不能仅用管理员账号测试隔离效果。验证时使用与真实应用相同权限的测试角色，分别检查允许和拒绝路径，防止跨机构读取。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"传输、密钥与日志"}</PageTitle>
<BookParagraph>{"跨网络传输应使用受保护连接，密钥存入受控配置服务并按角色授权，不能硬编码在课程脚本或提交到仓库。日志记录批次、操作者、资源、动作和结果，避免输出完整令牌、原始手机号及敏感事件载荷。监控系统本身也需要访问限制，因为错误堆栈和查询文本可能暴露敏感信息。"}</BookParagraph>
</div>) },
{ label: "排错、练习与参考", left: (<div className="space-y-4">
<PageTitle>{"删除与审计的边界"}</PageTitle>
<BookParagraph>{"当保留期限到期或触发合规删除时，需定位原始层、派生层、缓存及备份的副本，明确何时真正不可恢复。对追加文件不能只删除一个索引就假定数据消失；重放历史输入还可能把已删除数据重新引入，因此应维护删除约束。审计记录保留必要证据，但同样应限制访问并规定保留周期。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"练习：建立权限验收矩阵"}</PageTitle>
<BookParagraph>{"列出采集、计算、运营、审计四种角色，针对原始事件、清洗明细、课程汇总和导出功能写出允许与拒绝项。验收：运营读不到个人明细，跨机构查询失败，导出没有联系人字段，拒绝操作仍有不含敏感值的审计记录。参考思路：用最小测试身份逐项验证，包括直接查询和下载地址访问，不能仅观察页面按钮。"}</BookParagraph>
<BookList items={[<a key="https://www.postgresql.org/docs/current/ddl-priv.html" href="https://www.postgresql.org/docs/current/ddl-priv.html" target="_blank" rel="noreferrer" className="underline">PostgreSQL对象权限</a>,<a key="https://www.postgresql.org/docs/current/ddl-rowsecurity.html" href="https://www.postgresql.org/docs/current/ddl-rowsecurity.html" target="_blank" rel="noreferrer" className="underline">PostgreSQL行级安全策略</a>]} />
</div>) }
]

export default function SecurityPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  BookList,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '云存储与数据库',
  chapterNumber: 4,
  totalChapters: 7,
  subjectHref: '/study/se/cloud',
  prevChapter: { label: '虚拟化与容器化', href: '/study/se/cloud/container' },
  nextChapter: { label: '云安全与合规', href: '/study/se/cloud/security' },
  theme: THEMES.software,
}


const SPREADS = [
  {
    label: "对象、块与文件存储",
    left: (
      <div className="space-y-4">
        <PageTitle>对象、块与文件存储</PageTitle>
        <BookParagraph>对象存储通过键访问对象及元数据，适合图片、附件与备份；块存储提供磁盘块，通常由操作系统建立文件系统；文件存储提供目录与共享文件协议。它们的访问接口、并发语义和延迟不同，不能随意互换。</BookParagraph>
        <BookParagraph>学习网站的封面图片适合对象存储，数据库底层数据通常使用数据库服务管理的块设备，共享素材目录可以评估文件存储。对象存储不是可直接替代数据库数据目录的普通磁盘。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>按访问方式选型</PageTitle>
        <BookParagraph>先列出对象大小、更新频率、并发读写、权限与恢复需求，再比较容量、请求、取回和出站费用。低频层可能降低容量费用，却增加读取成本或恢复等待时间；生命周期策略必须符合真实访问规律。</BookParagraph>
        <BookParagraph>公开文章插图与私人学习记录应采用不同访问策略。通过受控应用接口或限时授权链接交付私人对象，不能为了方便访问而把整个存储空间公开；缓存也要遵循内容的权限边界。</BookParagraph>
      </div>
    ),
  },
  {
    label: "关系型与其他数据模型",
    left: (
      <div className="space-y-4">
        <PageTitle>关系型与其他数据模型</PageTitle>
        <BookParagraph>关系型数据库适合事务、约束与关联查询；文档或键值系统适合相应访问模式，但高并发不是选择NoSQL的充分理由。先设计主键、查询条件和一致性需求，再依据测量结果选择产品。</BookParagraph>
        <BookParagraph>学习记录可使用用户与章节组成的唯一键，避免重试生成重复数据。缓存用于加速可重建数据，不应未经设计就成为唯一事实来源；数据库写入成功后缓存更新失败需要失效或补偿策略。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>托管仍需要管理</PageTitle>
        <BookParagraph>托管数据库减少部分安装、补丁或备份工作，具体范围取决于产品与配置。客户仍负责账户权限、查询效率、连接池、数据生命周期、容量和恢复演练，自动备份也需要确认保留期与成功状态。</BookParagraph>
        <BookParagraph>应用通过私有网络使用受限数据库用户，密码由秘密系统注入，连接启用适当的传输加密与证书校验。不要用root业务连接，也不要将数据库端口向全互联网开放来排查连通问题。</BookParagraph>
      </div>
    ),
  },
  {
    label: "先定义RPO与RTO",
    left: (
      <div className="space-y-4">
        <PageTitle>先定义RPO与RTO</PageTitle>
        <BookParagraph>RPO是故障后可接受的数据丢失时间范围，RTO是业务恢复所需时间目标。每天备份一次并不能自然满足十五分钟RPO；有备份文件也不代表能在半小时内完成恢复、校验和切换。</BookParagraph>
        <BookParagraph>为学习网站设定RPO十五分钟、RTO一小时只是练习目标，需要日志归档或时间点恢复等能力支撑。故障切换解决服务连续性，备份应对误删与逻辑损坏，两者不能互相替代。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>本地备份恢复演练</PageTitle>
        <BookParagraph>环境为Python 3标准库，文件名均为当前练习目录专用；下面建立独立内存库并备份到新文件，再恢复到另一内存库，避免覆盖现有数据库。目标文件若已存在则停止，预期查询输出为1。</BookParagraph>
        <BookParagraph>真实系统应在隔离位置恢复指定备份，校验记录数、关键业务约束与应用读取，再记录恢复耗时和数据时间点。只看备份任务绿色完成，不足以证明恢复目标能够实现。</BookParagraph>
        <BookCode language="python" code={"import sqlite3\nfrom pathlib import Path\nbackup = Path(\"study-demo-backup.sqlite\")\nif backup.exists():\n    raise SystemExit(\"请改用新的练习文件名\")\nwith sqlite3.connect(\":memory:\") as source:\n    source.execute(\"CREATE TABLE progress (id INTEGER)\")\n    source.execute(\"INSERT INTO progress VALUES (1)\")\n    source.commit()\n    with sqlite3.connect(backup) as saved:\n        source.backup(saved)\n        with sqlite3.connect(\":memory:\") as restored:\n            saved.backup(restored)\n            print(restored.execute(\"SELECT COUNT(*) FROM progress\").fetchone()[0])"} />
      </div>
    ),
  },
  { label: "读写语义决定存储选择",
    left: (<div className="space-y-4">
      <PageTitle>读写语义决定存储选择</PageTitle>
      <BookParagraph>{"例一：封面图片通常整体上传、按键读取，适合对象接口；应用要频繁随机修改数据库页，则需要数据库支持的存储语义；多人共同编辑目录，还要考虑文件锁和权限模型。对象键中含斜杠可以组织命名，却不意味着它提供完整的目录与原子重命名语义。"}</BookParagraph>
      <BookParagraph>{"不要仅比较每GB价格。单对象大小、请求频率、延迟、并发写入和授权方式都会影响总成本。对私人上传文件先验证归属再生成受限访问，公开素材可缓存；同一存储产品也应按数据类别配置权限和生命周期。"}</BookParagraph>
    </div>),
    right: (<div className="space-y-4">
      <PageTitle>容量增长如何进入预算</PageTitle>
      <BookParagraph>{"若每天新增两GB素材，保留九十天，则稳态原始容量约一百八十GB；若备份与历史版本再占原始容量的一倍，总计约三百六十GB。这个计算假设到期数据按时清理，且未包含元数据和请求成本；实际应根据观测修正。"}</BookParagraph>
      <BookParagraph>{"例二：删除应用里的文件引用后，对象可能还被历史版本或备份保留。生命周期策略需要与恢复和隐私要求协调，不能只看当前对象数。下面Python 3显示原始与含额外副本的估算，输出180和360，单位统一为教学GB。"}</BookParagraph>
<div className="overflow-x-auto"><table className="min-w-[480px] w-full text-sm border-collapse"><thead><tr><th className="border border-paper-300/80 p-2 text-left">类型</th><th className="border border-paper-300/80 p-2 text-left">操作模型</th><th className="border border-paper-300/80 p-2 text-left">示例与注意</th></tr></thead><tbody><tr><td className="border border-paper-300/80 p-2">对象</td><td className="border border-paper-300/80 p-2">按键读写整体对象</td><td className="border border-paper-300/80 p-2">图片；不能假定完整目录语义</td></tr><tr><td className="border border-paper-300/80 p-2">块</td><td className="border border-paper-300/80 p-2">随机访问设备块</td><td className="border border-paper-300/80 p-2">数据库磁盘；需文件系统或数据库管理</td></tr><tr><td className="border border-paper-300/80 p-2">文件</td><td className="border border-paper-300/80 p-2">目录与文件协议</td><td className="border border-paper-300/80 p-2">共享素材；关注锁与权限</td></tr></tbody></table></div>
<BookCode language="python" code={"new_gb, days, extra_ratio = 2, 90, 1\nraw = new_gb * days\nprint(raw, raw * (1 + extra_ratio))"} />
    </div>),
  },
  { label: "事务把多个变化连在一起",
    left: (<div className="space-y-4">
      <PageTitle>事务把多个变化连在一起</PageTitle>
      <BookParagraph>{"用户完成章节时可能既更新进度又增加积分。如果先保存进度后增加积分时失败，两张表可能不一致；事务把这组变化作为整体提交或撤销。隔离级别影响并发读取与修改的行为，不同数据库默认值可能不同，必须根据产品文档与测试确认。"}</BookParagraph>
      <BookParagraph>{"例三：重复提交同一次完成事件不能重复加积分。可将稳定事件编号设为唯一键，再在同一事务中登记事件和更新进度。只在应用内存里检查是否处理过，在多实例和重启后会失效；唯一约束提供数据库层面的并发仲裁。"}</BookParagraph>
    </div>),
    right: (<div className="space-y-4">
      <PageTitle>本地观察唯一键与幂等</PageTitle>
      <BookParagraph>{"以下Python 3标准库代码只创建内存SQLite数据库，将同一事件插入两次。第二次由唯一约束与冲突处理忽略，计数仍为1。它演示“重试不扩大结果”，不表示可以忽略所有数据库错误；字段格式或权限失败仍应中断并记录。"}</BookParagraph>
      <BookParagraph>{"运行预期输出1。真正的业务处理需要把事件登记与对应更新放在同一事务，并检测同编号但不同载荷的冲突。若只是先查有无再插入，并发请求可能同时读到不存在；必须由约束或适当锁机制收敛最终状态。"}</BookParagraph>
<BookCode language="python" code={"import sqlite3\nwith sqlite3.connect(\":memory:\") as db:\n    db.execute(\"CREATE TABLE events (event_id TEXT PRIMARY KEY)\")\n    for _ in range(2):\n        db.execute(\"INSERT OR IGNORE INTO events VALUES (?)\", (\"complete-1\",))\n    print(db.execute(\"SELECT COUNT(*) FROM events\").fetchone()[0])"} />
    </div>),
  },
  { label: "索引从查询条件推导",
    left: (<div className="space-y-4">
      <PageTitle>索引从查询条件推导</PageTitle>
      <BookParagraph>{"若常按用户查询最近的学习记录，可以考虑用户与更新时间组成的索引，而不是为每个字段随意建一个索引。索引提供额外查找结构，减少读取范围，也会占存储并增加写入维护成本。查询返回大部分表数据时，扫描可能反而合理。"}</BookParagraph>
      <BookParagraph>{"教学例：一百万条进度记录只需查某用户的十条，合适索引能避免逐行筛选；但统计全部用户总进度时仍需读取广泛数据。验证应查看执行计划与实测读写开销，比较相同样本和缓存条件，不把“有索引”当作一定更快。"}</BookParagraph>
    </div>),
    right: (<div className="space-y-4">
      <PageTitle>恢复是一个有顺序的流程</PageTitle>
      <BookParagraph>{"设故障发生在十四点，最近可恢复数据点为十三点五十五分，则实际数据间隙五分钟；若十四点四十分完成业务校验并切换，则恢复耗时四十分钟。分别与十五分钟RPO、一小时RTO比较，两个目标都满足，但必须说明计时起点与统计条件。"}</BookParagraph>
      <BookParagraph>{"恢复顺序通常是确定范围、选择恢复点、在隔离位置恢复、核验数据、准备应用配置、切换并观察。单纯计算文件下载时间会遗漏索引重建、权限、网络和业务验证。演练时使用接近真实规模的数据，避免小样本产生过于乐观的承诺。"}</BookParagraph>
    </div>),
  },
  { label: "复制与备份应对不同故障",
    left: (<div className="space-y-4">
      <PageTitle>复制与备份应对不同故障</PageTitle>
      <BookParagraph>{"案例：应用错误地删除了一批进度，复制会把删除同步到副本，主备都可能快速失去记录。备份或时间点恢复保留历史状态，才有机会找回；副本的价值主要在于缩短设备等故障后的服务中断。两种能力往往需要同时配置。"}</BookParagraph>
      <BookParagraph>{"如果备份与业务账号使用同一宽泛权限，账号失陷时两者都可能被破坏。备份应限制访问与删除，记录保留时间和恢复所需密钥；跨地域保存还能降低部分共同故障风险，但增加传输费用与数据治理要求。"}</BookParagraph>
    </div>),
    right: (<div className="space-y-4">
      <PageTitle>数据迁移时核对什么</PageTitle>
      <BookParagraph>{"从旧数据库迁到新服务，除了表记录数，还要核对唯一约束、时区、字符集、默认值与排序行为。相同文本在不同排序规则下可能比较结果不同，时间字段的解释也可能发生变化。先用边界样本验证，再做完整数据校验。"}</BookParagraph>
      <BookParagraph>{"迁移可以先复制基线，再补齐增量，在短暂停写窗口核对最后位置后切换；具体方案由数据库能力决定。本课程只要求纸面流程与内存实验，不执行真实迁移。回退计划要解释切换后新增数据去哪里，不能只保留旧服务器就称为可回退。"}</BookParagraph>
    </div>),
  },
  {
    label: "练习：应对误删",
    left: (
      <div className="space-y-4">
        <PageTitle>练习：应对误删</PageTitle>
        <BookParagraph>场景：下午两点发现学习记录被误删，最近一次快照在凌晨。请说明还需哪些日志与时间点恢复能力，如何选择误删前的恢复位置，以及为什么不能直接覆盖正在运行的数据库。</BookParagraph>
        <BookParagraph>参考思路是在隔离环境恢复到误删前时间，核对受影响用户和后续合法写入，再设计合并或切换方案。恢复完成后保留审计记录并修正权限；整个流程应由测试数据演练验证。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>验收与常见错误</PageTitle>
        <BookParagraph>交付存储选型表、备份保留策略和恢复记录，写清数据量、费用项目、RPO与RTO。验收必须包含恢复后的业务查询结果及实测耗时，并说明备份是否覆盖误删、账号失陷或地域故障。</BookParagraph>
        <BookParagraph>常见错误包括把副本当备份、只备份数据不记录恢复配置、忽略取回和流量费用。需要长期保留的备份应具备独立访问控制，备份过期与删除规则也应经过评审。</BookParagraph>
        <BookList items={[
          <a key="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithAutomatedBackups.html" href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithAutomatedBackups.html" target="_blank" rel="noopener noreferrer" className="underline">AWS RDS 备份</a>,
          <a key="https://aws.amazon.com/compare/the-difference-between-block-file-object-storage/" href="https://aws.amazon.com/compare/the-difference-between-block-file-object-storage/" target="_blank" rel="noopener noreferrer" className="underline">AWS 对象、块与文件存储</a>,
        ]} />
      </div>
    ),
  },
]

export default function CloudStoragePage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

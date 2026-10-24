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

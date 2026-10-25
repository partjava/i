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
  chapterTitle: '实战案例与应用',
  chapterNumber: 7,
  totalChapters: 7,
  subjectHref: '/study/se/cloud',
  prevChapter: { label: '自动化与DevOps', href: '/study/se/cloud/devops' },
  theme: THEMES.software,
}


const SPREADS = [
  {
    label: "项目目标与范围",
    left: (
      <div className="space-y-4">
        <PageTitle>项目目标与范围</PageTitle>
        <BookParagraph>本项目把个人学习网站的云迁移设计串起来，不创建收费资源。输入为静态课程、登录接口、用户进度和上传图片；目标是明确部署、数据保护、发布与恢复流程，并在本地或纸面完成验证。</BookParagraph>
        <BookParagraph>先写约束：预计日访问量、峰值并发、预算上限、维护人数和敏感数据类型。可用性及恢复目标应有业务依据，小团队可以接受有限停机，但必须说清停机与丢失数据的影响。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>画出数据与请求路径</PageTitle>
        <BookParagraph>公开章节经缓存分发，动态请求经HTTPS入口进入无状态应用；应用在私有网络访问数据库，上传内容进入受控对象存储，日志与备份采用各自的权限及保留策略。</BookParagraph>
        <BookParagraph>这是一份逻辑架构，不意味着所有网站都必须购买负载均衡或编排集群。先选择能够维护的最小方案，标出单点，再说明访问量增长或故障目标变化时如何演进。</BookParagraph>
      </div>
    ),
  },
  {
    label: "阶段一：建立迁移基线",
    left: (
      <div className="space-y-4">
        <PageTitle>阶段一：建立迁移基线</PageTitle>
        <BookParagraph>先盘点现有域名、运行时、依赖、配置与数据，记录响应时间和错误率。用测试数据验证本地构建，确认公开内容与私人记录分离，并给当前可用版本与数据库备份建立对应记录。</BookParagraph>
        <BookParagraph>然后列出迁移顺序与暂停条件：先静态内容，再应用验证，最后讨论数据迁移与入口切换。每一步都有核对结果和负责人，避免在一次没有记录的操作中同时更换网络、应用和数据库。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>阶段二：验证而后切换</PageTitle>
        <BookParagraph>在隔离环境使用同一制品验证登录、进度读写、对象权限和恢复流程，检查网络访问矩阵。演练数据同步时，明确是否需要短暂停写、如何补齐增量以及如何检查记录数和关键约束。</BookParagraph>
        <BookParagraph>入口切换必须考虑DNS缓存或流量路由延迟，以及旧环境仍可能收到请求。双写引入一致性难题，不能随意启用；先制定明确的数据写入归属和回退条件，再安排切换窗口。</BookParagraph>
      </div>
    ),
  },
  {
    label: "阶段三：观察与回退",
    left: (
      <div className="space-y-4">
        <PageTitle>阶段三：观察与回退</PageTitle>
        <BookParagraph>发布后同时观察成功率、响应时间、数据库连接和资源费用。预先定义回退门槛、负责人、旧制品位置和配置版本；若已经产生新数据，必须说明旧版本如何读取，不能直接覆盖数据库。</BookParagraph>
        <BookParagraph>故障演练可用桌面推演模拟一个应用副本失效、对象访问被拒绝和恢复备份。对于每次演练记录发现时间、判断过程、恢复时间与损失范围，区分可用性故障和数据完整性故障。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>比较成本与可靠性</PageTitle>
        <BookParagraph>方案甲采用单应用实例与可恢复备份，部署简单但存在计算单点；方案乙增加多故障域应用副本及数据库故障切换，减少局部停机，却增加费用、配置与演练工作。</BookParagraph>
        <BookParagraph>无论方案都要考虑备份和私人数据权限。费用表应覆盖计算、存储、请求、出站流量及观测保留，并写明估算假设；预算提醒不一定会阻止扣费，不应把免费额度当长期运行保证。</BookParagraph>
      </div>
    ),
  },
  { label: "为迁移定义可测量目标",
    left: (<div className="space-y-4">
      <PageTitle>为迁移定义可测量目标</PageTitle>
      <BookParagraph>{"例一：现有学习网站峰值每秒二十请求，页面响应分位数在可接受范围，但机器故障后人工恢复需两小时。迁移目标可以优先缩短恢复时间，而不是追求十倍吞吐。先记录基线、目标值和测量方法，才能判断云方案解决了什么问题。"}</BookParagraph>
      <BookParagraph>{"需求文档还应列出不迁移的内容和依赖，例如第三方登录及邮件服务仍保持原接口。记录每个外部依赖的超时、配额与数据边界。迁移是一组风险受控的变化，不应同时重写全部业务、替换所有数据库并引入新编排系统。"}</BookParagraph>
    </div>),
    right: (<div className="space-y-4">
      <PageTitle>架构方案按约束比较</PageTitle>
      <BookParagraph>{"方案一是单应用实例加托管数据库，运维较少但应用仍有单点；方案二增加跨故障域应用副本与冗余入口，减少局部故障影响；方案三跨地域复制及切换，覆盖更多故障却增加一致性与值班复杂度。"}</BookParagraph>
      <BookParagraph>{"以维护者只有一人且允许短暂停机为例，方案一可能更符合当前能力，但必须通过恢复演练证明风险可接受。下表不是优劣排名，而是把成本、恢复步骤与故障覆盖范围写清楚。选择最复杂方案却无法维护，可能使实际恢复能力更差。"}</BookParagraph>
<div className="overflow-x-auto"><table className="min-w-[480px] w-full text-sm border-collapse"><thead><tr><th className="border border-paper-300/80 p-2 text-left">方案</th><th className="border border-paper-300/80 p-2 text-left">覆盖重点</th><th className="border border-paper-300/80 p-2 text-left">新增代价</th></tr></thead><tbody><tr><td className="border border-paper-300/80 p-2">单实例加恢复</td><td className="border border-paper-300/80 p-2">机器故障后重建</td><td className="border border-paper-300/80 p-2">恢复期间停机</td></tr><tr><td className="border border-paper-300/80 p-2">多故障域副本</td><td className="border border-paper-300/80 p-2">部分机器或区域单元故障</td><td className="border border-paper-300/80 p-2">冗余资源和验证</td></tr><tr><td className="border border-paper-300/80 p-2">跨地域灾备</td><td className="border border-paper-300/80 p-2">更大故障范围</td><td className="border border-paper-300/80 p-2">复制、切换与一致性复杂度</td></tr></tbody></table></div>
    </div>),
  },
  { label: "用请求预算找迁移瓶颈",
    left: (<div className="space-y-4">
      <PageTitle>用请求预算找迁移瓶颈</PageTitle>
      <BookParagraph>{"例二：请求平均需要应用处理五十毫秒、数据库一百毫秒、外部接口二百毫秒，忽略重叠时共三百五十毫秒。即使应用计算耗时减少一半，总时间也只是降为三百二十五毫秒。单纯升级计算规格不能解决主要等待。"}</BookParagraph>
      <BookParagraph>{"Python 3给出350和325，单位毫秒。这个模型忽略并行调用和排队，适合作为定位方向，不是性能保证。迁移后用相同请求样本对照各段耗时，若外部接口占主导，应研究缓存、超时和降级，避免把预算全部投向实例规格。"}</BookParagraph>
<BookCode language="python" code={"app, database, external = 50, 100, 200\nprint(app + database + external)\nprint(app / 2 + database + external)"} />
    </div>),
    right: (<div className="space-y-4">
      <PageTitle>迁移数据的四次核对</PageTitle>
      <BookParagraph>{"先核对结构：字段、约束、索引与时区；再核对数量：按日期和用户分组检查；第三核对内容：抽查关键记录或计算稳定摘要；最后核对行为：登录、读取和更新是否符合业务规则。只比较总行数不能发现同数量的错配。"}</BookParagraph>
      <BookParagraph>{"例三：源库和目标库各有一百条记录，但两个用户的进度被互换，总数完全一致。需要按稳定主键连接后比较业务字段，发现差异再查映射和转换逻辑。校验记录应注明数据时间点，否则迁移期间继续写入会使比较失去意义。"}</BookParagraph>
    </div>),
  },
  { label: "本地模拟对账差异",
    left: (<div className="space-y-4">
      <PageTitle>本地模拟对账差异</PageTitle>
      <BookParagraph>{"下面Python 3用虚构字典模拟源库与目标库，以用户和章节组成稳定键。目标库缺少u2记录，u1进度不同，输出missing和changed对应集合。这里只演示对账，不连接或覆盖真实数据库，可反复执行。"}</BookParagraph>
      <BookParagraph>{"将真实对账扩展为分批读取与分组统计时，必须保持一致的比较时点和字段规范，例如空值、时区与数值精度。摘要可快速定位不同批次，但最终仍需检查具体差异，不能仅凭随机抽样无误就断言所有数据完全一致。"}</BookParagraph>
<BookCode language="python" code={"source = {(\"u1\", \"c1\"): 80, (\"u2\", \"c1\"): 50}\ntarget = {(\"u1\", \"c1\"): 70}\nmissing = source.keys() - target.keys()\nchanged = {k for k in source.keys() & target.keys() if source[k] != target[k]}\nprint(\"missing\", sorted(missing))\nprint(\"changed\", sorted(changed))"} />
    </div>),
    right: (<div className="space-y-4">
      <PageTitle>入口切换与数据写入归属</PageTitle>
      <BookParagraph>{"切换前把旧环境写入流程和新环境同步关系讲清楚，必要时安排短暂停写窗口。DNS缓存会让一部分用户继续进入旧环境；如果两边都接受写入而没有协调机制，会出现同一进度被不同版本覆盖的问题。"}</BookParagraph>
      <BookParagraph>{"为每个阶段写清唯一写入方、读取方和回退条件，切换后持续检查新旧入口流量。若需要回退，先确认新数据能否兼容或安全补齐旧环境。仅把域名改回去不能恢复数据一致性，回退也应是一份有前提的操作计划。"}</BookParagraph>
    </div>),
  },
  { label: "把故障演练设计成证据",
    left: (<div className="space-y-4">
      <PageTitle>把故障演练设计成证据</PageTitle>
      <BookParagraph>{"例四：桌面推演应用实例突然失联。维护者先从监控确认影响，再按手册找到当前制品和配置，在隔离环境恢复，验证进度读取后计时。记录发现耗时、定位耗时、恢复耗时，能看出改进应落在告警还是自动部署上。"}</BookParagraph>
      <BookParagraph>{"再推演数据库误删，使用不同流程在隔离位置恢复历史状态并核对合法新增记录。两个演练的目标不同：前者恢复服务，后者恢复正确数据。若把副本故障切换当成误删恢复，就会很快切换到同样缺失记录的副本。"}</BookParagraph>
    </div>),
    right: (<div className="space-y-4">
      <PageTitle>验收材料形成因果链</PageTitle>
      <BookParagraph>{"一份可审查交付应能从业务约束走到架构选择，再走到配置、费用和实测证据。例如“只有一名维护者”支持减少自建组件，“允许一小时恢复”要求演练确实在该范围内完成，“记录敏感”要求私人网络与对象级授权用例。"}</BookParagraph>
      <BookParagraph>{"最后进行反向检查：任一收费资源是否对应需求，任一可靠性承诺是否有测试，任一风险是否有负责人。没有验证的目标应明确标为待完成，保留下一阶段计划。这样课程项目才能成为可讨论的工程设计，而不仅是一张包含产品图标的图片。"}</BookParagraph>
    </div>),
  },
  {
    label: "综合练习与参考思路",
    left: (
      <div className="space-y-4">
        <PageTitle>综合练习与参考思路</PageTitle>
        <BookParagraph>请提交一页迁移方案：给出数据流、服务模式、身份权限、资源清单、发布步骤和恢复目标，再解释“考试周访问量翻倍”和“误删学习记录”两个事件的不同处理方式。</BookParagraph>
        <BookParagraph>参考思路：流量增长先查瓶颈再扩无状态层，误删则在隔离环境恢复并校验数据；多副本不能找回误删。两种事件都需关注下游依赖、维护成本和用户影响，避免只给出某个产品名。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>验收：让另一人能执行</PageTitle>
        <BookParagraph>验收要求另一名学习者仅凭文档就能指出请求经过哪里、谁能读取私人记录、哪个制品正在运行，以及恢复时需要什么备份和配置。本地验证不通过时记录原因，不以架构图代替运行证据。</BookParagraph>
        <BookParagraph>最终交付架构图、费用表、访问矩阵和演练记录，各有明确假设和待解决风险。常见错误是一次迁移引入过多新技术、没有旧版本及数据回退计划，或将自动化命令成功误当业务验证成功。</BookParagraph>
        <BookList items={[
          <a key="https://aws.amazon.com/compliance/shared-responsibility-model/" href="https://aws.amazon.com/compliance/shared-responsibility-model/" target="_blank" rel="noopener noreferrer" className="underline">AWS 责任共担</a>,
          <a key="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithAutomatedBackups.html" href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithAutomatedBackups.html" target="_blank" rel="noopener noreferrer" className="underline">AWS RDS 备份恢复</a>,
        ]} />
      </div>
    ),
  },
]

export default function CloudProjectsPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

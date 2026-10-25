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
  chapterTitle: '云服务基础',
  chapterNumber: 2,
  totalChapters: 7,
  subjectHref: '/study/se/cloud',
  prevChapter: { label: '概述', href: '/study/se/cloud/intro' },
  nextChapter: { label: '虚拟化与容器化', href: '/study/se/cloud/container' },
  theme: THEMES.software,
}


const SPREADS = [
  {
    label: "先区分服务与部署",
    left: (
      <div className="space-y-4">
        <PageTitle>先区分服务与部署</PageTitle>
        <BookParagraph>IaaS、PaaS、SaaS说明交付哪一层能力；公有云、私有云、社区云、混合云说明资源如何供组织使用。两组概念不是同一条分类轴，私有云也能提供平台服务，公有云也能运行自行维护的虚拟机。</BookParagraph>
        <BookParagraph>为学习网站选型时先问团队能维护多少层系统。自行管理虚拟机获得更多控制，但需要处理补丁与进程管理；托管应用平台减少底层操作，却要求遵循平台支持的运行时和部署约定。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>地域与可用区</PageTitle>
        <BookParagraph>地域是地理范围内的资源部署区域，可用区是地域中的独立故障隔离单元，具体设计由厂商定义。靠近用户通常有利于延迟，但数据位置、跨区传输费用和服务可用范围同样影响选择。</BookParagraph>
        <BookParagraph>低预算网站可以先部署在一个地域，再记录这一选择的故障风险。增加同地域多个可用区有助于应对局部故障，但不自动覆盖整个地域失效，跨地域灾备还涉及复制延迟和恢复演练。</BookParagraph>
      </div>
    ),
  },
  {
    label: "从请求看资源关系",
    left: (
      <div className="space-y-4">
        <PageTitle>从请求看资源关系</PageTitle>
        <BookParagraph>浏览器先解析域名，通过HTTPS进入反向代理或负载均衡，再访问应用接口。应用只在私有网络连接数据库，图片等公开内容可以通过对象存储与缓存分发。安全组定义允许哪些来源访问哪些端口。</BookParagraph>
        <BookParagraph>不要把所有资源都开放给互联网来解决连接失败。先核对域名、路由、监听地址和访问规则，再检查应用日志；数据库入站仅允许应用身份或应用所在安全组所需端口。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>建立资源清单</PageTitle>
        <BookParagraph>先写资源名称、环境、负责人和用途，再决定实例规格、网络和数据位置。同一网站的练习环境与正式环境应使用不同配置，防止测试脚本误连真实数据；标签有助于统计用途与费用。</BookParagraph>
        <BookParagraph>下面是本地纸面清单，不调用任何云API。环境为任意文本编辑器，study-app是示例资源名，费用填入你自行查询的计价结果；预期产物是一份可逐项核对的配置草案。</BookParagraph>
        <BookCode language="text" code={"resource: study-app\nenvironment: practice\nowner: learner\nnetwork: private-app-to-db\nmonthly_estimate: 待填\nrecovery_owner: learner"} />
      </div>
    ),
  },
  {
    label: "权限与配置的入口",
    left: (
      <div className="space-y-4">
        <PageTitle>权限与配置的入口</PageTitle>
        <BookParagraph>人工操作使用独立身份、多因素认证与短期凭证；程序优先使用工作负载角色。不要让应用使用主账户，也不要把访问密钥提交到仓库。权限从完成任务所需的最小动作与资源范围开始。</BookParagraph>
        <BookParagraph>配置中区分公开参数与秘密：地域和资源名称可以进入版本管理，数据库密码应从秘密管理系统注入并支持轮换。读取失败时报告缺少的配置名称，避免在日志中输出凭证内容。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>估算与观察</PageTitle>
        <BookParagraph>先根据预期请求量、处理时间和内存估算容量，再在隔离环境压测。关注响应时间分位数、错误率、资源使用率与数据库连接数，避免只看平均CPU；内存泄漏和连接耗尽可能先于CPU饱和出现。</BookParagraph>
        <BookParagraph>费用核算至少包含运行时间、磁盘、备份、请求和流量。开通前确定预算及告警负责人，停用时检查残留磁盘、快照与公网地址；本课程只制作清单，不执行创建或删除收费资源的命令。</BookParagraph>
      </div>
    ),
  },
  { label: "拆开一次HTTPS访问",
    left: (<div className="space-y-4">
      <PageTitle>拆开一次HTTPS访问</PageTitle>
      <BookParagraph>{"例一：用户访问课程页，解析域名取得入口地址，建立受保护连接，入口按路由转给应用，应用校验身份后查询进度。每一步都有独立超时与错误来源：域名解析错误时应用可能没有日志，数据库连接失败时入口却仍能正常接收请求。"}</BookParagraph>
      <BookParagraph>{"排障先确定失败发生在哪一段，分别检查解析结果、连接建立、入口状态和应用请求编号。不要把“页面打不开”直接归因于实例性能。记录各层的责任与观测点，还能决定哪些告警由应用维护者处理，哪些需要网络或平台维护者介入。"}</BookParagraph>
    </div>),
    right: (<div className="space-y-4">
      <PageTitle>路由与访问控制不是同一件事</PageTitle>
      <BookParagraph>{"路由描述数据包去哪里，访问规则决定到达路径上的请求能否通过，应用鉴权则决定连接建立后是否有权读取具体对象。私有地址不会自动意味着安全，处于同一网络的另一个被攻陷服务也可能尝试访问数据库。"}</BookParagraph>
      <BookParagraph>{"示例：入口能访问应用的服务端口，应用能访问数据库的业务端口，运营浏览器只能访问入口。按这个矩阵逐格验证允许与拒绝路径。若应用连不上数据库，应先查目标地址、规则来源与监听状态，而不是把数据库来源改成任意地址。"}</BookParagraph>
<div className="overflow-x-auto"><table className="min-w-[480px] w-full text-sm border-collapse"><thead><tr><th className="border border-paper-300/80 p-2 text-left">路径</th><th className="border border-paper-300/80 p-2 text-left">允许范围</th><th className="border border-paper-300/80 p-2 text-left">拒绝场景</th></tr></thead><tbody><tr><td className="border border-paper-300/80 p-2">浏览器→入口</td><td className="border border-paper-300/80 p-2">必要HTTPS请求</td><td className="border border-paper-300/80 p-2">直接访问数据库</td></tr><tr><td className="border border-paper-300/80 p-2">入口→应用</td><td className="border border-paper-300/80 p-2">指定服务端口</td><td className="border border-paper-300/80 p-2">任意宿主管理端口</td></tr><tr><td className="border border-paper-300/80 p-2">应用→数据库</td><td className="border border-paper-300/80 p-2">业务身份与必要端口</td><td className="border border-paper-300/80 p-2">来自任意公网地址</td></tr></tbody></table></div>
    </div>),
  },
  { label: "用预算公式比较方案",
    left: (<div className="space-y-4">
      <PageTitle>用预算公式比较方案</PageTitle>
      <BookParagraph>{"例二：以下均为教学假设价格，单实例月费八十元、数据库一百二十元、备份二十元，出站流量按每GB零点五元计算。每月一百GB流量时总计二百七十元，若活动使流量达到八百GB，总计六百二十元；计算实例没有变化，费用仍大幅增加。"}</BookParagraph>
      <BookParagraph>{"Python 3示例输出两个方案值，显示固定费用和可变费用应分开预测。真实报价要记录地域、规格、计费单位、折扣期限与税费，不能拿不同假设下的数字比较。另给峰值和故障恢复预留预算，费用告警阈值应联系维护者的响应时间。"}</BookParagraph>
<BookCode language="python" code={"for traffic_gb in (100, 800):\n    total = 80 + 120 + 20 + 0.5 * traffic_gb\n    print(total)"} />
    </div>),
    right: (<div className="space-y-4">
      <PageTitle>吞吐、延迟与瓶颈定位</PageTitle>
      <BookParagraph>{"假设一个接口每秒可处理五十请求，而峰值持续到达八十请求，队列每秒净增加三十。十秒后约积累三百个未完成请求；即使此时流量恢复正常，积压也需要剩余处理能力慢慢消化。延迟上升通常比进程崩溃更早提示容量不足。"}</BookParagraph>
      <BookParagraph>{"扩容前检查瓶颈是否在应用层。若数据库锁等待占主要时间，增加应用实例可能无效；若是CPU密集转换，则增加副本并限制每实例并发可能有效。用同一请求分布对照前后错误率和尾部延迟，避免仅看吞吐峰值就宣告优化成功。"}</BookParagraph>
    </div>),
  },
  { label: "配置从文件走向运行时",
    left: (<div className="space-y-4">
      <PageTitle>配置从文件走向运行时</PageTitle>
      <BookParagraph>{"例三：同一镜像在测试和正式环境使用不同数据库地址，应用启动时读取环境变量并验证必填参数。数据库地址不是密码，但错误地址也可能导致越界访问，因此配置必须版本化并经过环境校验，秘密本身只保存受控引用。"}</BookParagraph>
      <BookParagraph>{"下面Python 3演示内存配置检查，不读取机器上的真实秘密。合法输入得到practice，缺少数据库配置或环境名称不在允许范围时立即停止。真实应用还需验证URL格式与传输要求，并对日志脱敏；提早失败比上线后随机报错更易定位。"}</BookParagraph>
<BookCode language="python" code={"config = {\"environment\": \"practice\", \"database\": \"private-db.test\"}\nassert config[\"environment\"] in {\"practice\", \"production\"}\nassert config.get(\"database\"), \"missing database\"\nprint(config[\"environment\"])"} />
    </div>),
    right: (<div className="space-y-4">
      <PageTitle>配额与容量不是账单余额</PageTitle>
      <BookParagraph>{"配额限制可创建资源数、并发操作或API速率，余额充足也不保证能立即获得特定容量。部署设计需记录最低可运行配置和扩容上限，提前验证失败时应用如何表现；有些配额可申请提高，有些受地域物理容量约束。"}</BookParagraph>
      <BookParagraph>{"例如预期从两个副本扩到十个，却给数据库连接数和出口带宽保留原配置，最终仍可能超时。容量评估应沿整条依赖链进行，还要检查日志、磁盘与证书等容易被遗漏的长期限制。扩容策略必须有上限，防止异常请求触发无界费用增长。"}</BookParagraph>
    </div>),
  },
  { label: "把告警改成可行动的信号",
    left: (<div className="space-y-4">
      <PageTitle>把告警改成可行动的信号</PageTitle>
      <BookParagraph>{"案例：CPU连续高于阈值，但用户延迟与错误率均正常，可能是后台压缩作业；另一时段CPU很低，登录错误率却突然升高，可能是身份依赖不可用。两者应有不同优先级。面向用户的服务指标帮助判断影响，资源指标帮助定位原因。"}</BookParagraph>
      <BookParagraph>{"告警正文写明环境、服务、开始时间、影响指标、近期变更与排查入口；设置持续时间防止瞬间抖动反复通知。解除告警前确认业务请求恢复，并记录是否依赖临时容量，避免维护者离开后系统再次超过限制。"}</BookParagraph>
    </div>),
    right: (<div className="space-y-4">
      <PageTitle>资源生命周期中的隐藏费用</PageTitle>
      <BookParagraph>{"资源停止运行不一定停止所有收费，例如保留磁盘、快照、地址或观测数据仍可能占用资源。建立所有者标签与到期日期，在清理前确认依赖和备份恢复用途，避免为省费用误删唯一恢复材料。课程只要求制作检查清单，不执行清理命令。"}</BookParagraph>
      <BookParagraph>{"逐月把账单按环境和用途归类，比较预计与实际差异。若流量费偏高，先查看缓存命中、对象大小和来源分布；若存储持续增长，检查保留策略及重复备份。每项优化应同时解释节省金额、可靠性影响和恢复成本。"}</BookParagraph>
    </div>),
  },
  {
    label: "练习：比较两个方案",
    left: (
      <div className="space-y-4">
        <PageTitle>练习：比较两个方案</PageTitle>
        <BookParagraph>为每天一千次访问的学习网站比较“虚拟机自建数据库”和“托管平台加托管数据库”。分别写出操作系统补丁、数据库升级、索引优化、备份验证由谁负责，并说明团队时间如何计入成本。</BookParagraph>
        <BookParagraph>参考思路：小团队可能愿意用托管减少例行维护，但仍负责数据模型与应用安全。访问量小不代表数据不重要，学习进度丢失的影响应单独评估，不能仅按服务器价格作结论。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>验收与常见错误</PageTitle>
        <BookParagraph>验收交付资源清单、网络访问矩阵和费用估算。每个条目应包含环境和负责人，每条连接写清来源与目标，数据库不出现来自全互联网的入站规则，敏感配置没有明文凭证。</BookParagraph>
        <BookParagraph>常见错误是照搬厂商产品名却说不出责任边界，或只买高规格机器却没有告警和恢复方案。回顾你的清单，确认即使主要维护者不在场，另一人也能找到资源和处理步骤。</BookParagraph>
        <BookList items={[
          <a key="https://csrc.nist.gov/pubs/sp/800/145/final" href="https://csrc.nist.gov/pubs/sp/800/145/final" target="_blank" rel="noopener noreferrer" className="underline">NIST 服务与部署模型</a>,
          <a key="https://aws.amazon.com/compliance/shared-responsibility-model/" href="https://aws.amazon.com/compliance/shared-responsibility-model/" target="_blank" rel="noopener noreferrer" className="underline">AWS 责任共担</a>,
        ]} />
      </div>
    ),
  },
]

export default function CloudBasicPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

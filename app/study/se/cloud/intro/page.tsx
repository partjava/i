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
  chapterTitle: '概述',
  chapterNumber: 1,
  totalChapters: 7,
  subjectHref: '/study/se/cloud',
  nextChapter: { label: '云服务基础', href: '/study/se/cloud/basic' },
  theme: THEMES.software,
}


const SPREADS = [
  {
    label: "云计算究竟提供什么",
    left: (
      <div className="space-y-4">
        <PageTitle>云计算究竟提供什么</PageTitle>
        <BookParagraph>云计算把可配置的计算、网络和存储等资源组成共享资源池，通过网络按需交付。NIST归纳了按需自助、广泛网络访问、资源池化、快速弹性和可计量服务五项特征。虚拟化常用于实现资源隔离，但买一台远程虚拟机并不等于理解了整个云服务模型。</BookParagraph>
        <BookParagraph>云计算来自长期发展的分时、网络服务和效用计算等思想，不能归结为某家公司在某一年发明。这里关注服务能力与责任边界，而不把产品发布时间当成概念起源。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>三种服务模式</PageTitle>
        <BookParagraph>IaaS提供虚拟机、磁盘和网络，使用者管理操作系统与应用；PaaS提供应用运行平台，团队重点维护代码、配置与数据；SaaS直接提供可使用的软件，例如在线邮箱。服务名称不是分类的充分条件，应阅读具体产品承担哪些工作。</BookParagraph>
        <BookParagraph>托管数据库往往提供平台能力，但团队仍需设计表结构、索引、访问权限和恢复流程。抽象层越高，日常维护可能越少，同时运行环境和迁移方式受平台约束更多。</BookParagraph>
      </div>
    ),
  },
  {
    label: "部署模式与学习案例",
    left: (
      <div className="space-y-4">
        <PageTitle>部署模式与学习案例</PageTitle>
        <BookParagraph>公有云服务多个客户，私有云供单一组织使用；混合云连接不同云环境，社区云面向具有共同需求的组织。私有云并不只是办公室里的一台服务器，混合云也不是随意购买两个厂商的账户。</BookParagraph>
        <BookParagraph>后续以个人学习网站为例：静态章节、登录接口和学习记录分别需要内容分发、计算与持久化。先列出访问量、数据敏感性和可接受停机时间，再决定哪些能力值得托管。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>弹性不等于可用性</PageTitle>
        <BookParagraph>弹性解决负载变化时资源能否及时增加或减少；高可用关注部分组件故障后服务是否仍能工作。单机升级规格可以增强处理能力，却不能消除单机故障；两个副本放在同一故障域也可能同时中断。</BookParagraph>
        <BookParagraph>网站考试周流量上升，可以增加无状态应用副本；数据库故障则需要故障切换和恢复设计。扩容有启动延迟、配额和下游容量限制，不能用自动扩容替代压测和容量预留。</BookParagraph>
      </div>
    ),
  },
  {
    label: "责任共担从第一天开始",
    left: (
      <div className="space-y-4">
        <PageTitle>责任共担从第一天开始</PageTitle>
        <BookParagraph>云厂商一般负责物理设施及其管理的基础层，客户负责自己控制的身份、数据与应用配置；具体边界随产品变化。选择托管服务后仍要检查权限、日志、版本兼容性和备份是否真正可恢复。</BookParagraph>
        <BookParagraph>为网站建立责任表：谁修补系统，谁处理依赖漏洞，谁接收告警，谁批准数据导出。责任必须对应实际负责人和检查频率，否则“交给云了”很容易成为没有人维护的空白。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>费用与可靠性的预算</PageTitle>
        <BookParagraph>按使用量计费可以降低初始投入，却不保证总成本更低。持续运行的实例、数据库、备份、请求次数和出站流量都可能收费；扩容提高峰值能力，也会提高费用。预算提醒通常不是强制停费开关。</BookParagraph>
        <BookParagraph>练习时先用纸面估算：固定资源月费加存储、请求和网络费用，再加入预留空间。比较单实例和多故障域方案时，同时写出月成本与可接受停机时间，不虚构统一云价格。</BookParagraph>
      </div>
    ),
  },
  { label: "把服务抽象放回系统分层",
    left: (<div className="space-y-4">
      <PageTitle>把服务抽象放回系统分层</PageTitle>
      <BookParagraph>{"例一：学习网站需要安装操作系统、运行接口和保存进度。把系统画成物理设施、虚拟化、操作系统、运行时、应用与数据六层，逐层标出谁能修改。选择IaaS时，客户可以调整系统参数，也必须处理系统安全；选择托管运行时后，客户通常不能任意替换宿主内核，却仍要修补自己的依赖。"}</BookParagraph>
      <BookParagraph>{"抽象改变的是控制范围和工作分配，并非责任凭空消失。例如平台自动替换故障机器，仍无法知道你的业务代码把用户进度写错了。采购时把“平台支持什么”转为可检查条目，再确认升级窗口、数据导出接口与终止服务后的迁移途径。"}</BookParagraph>
    </div>),
    right: (<div className="space-y-4">
      <PageTitle>为什么资源池能按需交付</PageTitle>
      <BookParagraph>{"资源池把多个客户需求汇集，调度系统按配额与策略分配容量。隔离机制减少相互干扰，计量系统记录资源使用，控制接口允许用户申请和释放。由此才能把等待人工采购的过程缩短为自助操作，但容量并非无限，热门地域、特定规格或账号配额都可能成为边界。"}</BookParagraph>
      <BookParagraph>{"例二：两个班级分别在白天和晚上访问网站，共享资源池能平滑峰值；若都在考试前五分钟访问，峰值仍会叠加。不能用“用户数平均下来很小”规划资源。先估算并发和处理时间，再实测扩容启动时间，并为同时到来的请求保留缓冲。"}</BookParagraph>
<div className="overflow-x-auto"><table className="min-w-[480px] w-full text-sm border-collapse"><thead><tr><th className="border border-paper-300/80 p-2 text-left">层次</th><th className="border border-paper-300/80 p-2 text-left">客户关注</th><th className="border border-paper-300/80 p-2 text-left">典型取舍</th></tr></thead><tbody><tr><td className="border border-paper-300/80 p-2">IaaS</td><td className="border border-paper-300/80 p-2">系统、运行时、应用与数据</td><td className="border border-paper-300/80 p-2">控制更多，维护更多</td></tr><tr><td className="border border-paper-300/80 p-2">PaaS</td><td className="border border-paper-300/80 p-2">应用、配置与数据</td><td className="border border-paper-300/80 p-2">减少底层工作，平台约束增加</td></tr><tr><td className="border border-paper-300/80 p-2">SaaS</td><td className="border border-paper-300/80 p-2">身份、配置与使用数据</td><td className="border border-paper-300/80 p-2">交付更快，可定制范围较小</td></tr></tbody></table></div>
    </div>),
  },
  { label: "用并发数估算容量",
    left: (<div className="space-y-4">
      <PageTitle>用并发数估算容量</PageTitle>
      <BookParagraph>{"在稳定状态下，可用平均并发量约等于每秒到达请求数乘平均在系统停留时间理解负载。假设每秒四十请求、平均处理零点二秒，则平均约八个请求同时在系统内；若外部数据库使处理时间升到一秒，并发会上升到约四十，而入口流量没有变化。"}</BookParagraph>
      <BookParagraph>{"这是容量讨论的近似关系，不能直接把八个并发换成八个CPU核。请求可能等待网络或磁盘，突发与长尾也会偏离平均值。下面Python 3只计算教学输入，输出8.0和40.0；它帮助识别延迟如何放大资源占用，生产规格仍需压测确定。"}</BookParagraph>
<BookCode language="python" code={"for seconds in (0.2, 1.0):\n    print(40 * seconds)"} />
    </div>),
    right: (<div className="space-y-4">
      <PageTitle>可用性数字如何落到用户</PageTitle>
      <BookParagraph>{"例三：按三十天即四万三千二百分钟粗算，目标可用性百分之九十九点九允许约四十三点二分钟不可用；百分之九十九点九九约四点三二分钟。这个差距会明显改变冗余、值班与演练投入，并不是把宣传页的小数点多写一位。"}</BookParagraph>
      <BookParagraph>{"先定义哪些请求计入分母、什么算失败、维护窗口是否计入，以及统计窗口。首页能打开而进度无法保存时，学习体验仍然失败。服务商单项资源承诺与整个网站的端到端目标不同，应用、网络与数据库依赖都需要纳入故障分析。"}</BookParagraph>
    </div>),
  },
  { label: "串联依赖为何放大风险",
    left: (<div className="space-y-4">
      <PageTitle>串联依赖为何放大风险</PageTitle>
      <BookParagraph>{"简化假设应用与数据库故障相互独立，可用性分别为百分之九十九点九，两者都工作才能完成请求，乘积约为百分之九十九点八。真实故障常存在共同原因，例如网络或身份配置失误，所以不能把独立假设下的数字当保证。"}</BookParagraph>
      <BookParagraph>{"提高其中一个组件规格不会消除另一组件的故障。分析请求链时列出每个必需依赖，再判断能否降级：文章内容可暂时使用缓存，进度写入则不能无提示丢弃。降级必须向用户说明状态，并为后续重试保持稳定业务编号。"}</BookParagraph>
    </div>),
    right: (<div className="space-y-4">
      <PageTitle>用退出成本检验选型</PageTitle>
      <BookParagraph>{"例四：平台甲每月费用较低，却只支持专有函数接口；平台乙费用较高，支持标准容器和常见数据库导出。若未来迁移需要重写鉴权与事件接口，甲的账单节省可能被维护时间抵消。成本比较应同时列出运行、学习、排障、迁移与停机成本。"}</BookParagraph>
      <BookParagraph>{"避免把可移植性理解为不使用任何托管能力。可以把核心业务与平台适配代码分层，定期导出可恢复数据，用一套本地契约测试验证关键行为。对业务价值较低且易替换的边缘功能，接受平台特性可能是合理取舍。"}</BookParagraph>
    </div>),
  },
  { label: "从描述推导故障路径",
    left: (<div className="space-y-4">
      <PageTitle>从描述推导故障路径</PageTitle>
      <BookParagraph>{"桌面推演：考试前网站变慢，监控显示应用CPU很低、数据库连接已满。先确认错误与延迟开始时间，再查看连接持有时间及近期发布；盲目增加应用副本反而可能创建更多连接，使数据库更快达到上限。此时应限制并发并检查慢查询，而非只扩机器。"}</BookParagraph>
      <BookParagraph>{"恢复之后再判断长期方案：缩短事务、设置有界连接池、优化索引或升级数据库容量。把现象、证据、临时止损与长期修复分开记录，能避免每次类似故障都从猜测开始，也能检验“弹性”是否真的作用于瓶颈。"}</BookParagraph>
    </div>),
    right: (<div className="space-y-4">
      <PageTitle>把云能力写成决策记录</PageTitle>
      <BookParagraph>{"为上述案例写一份具体决策：目前单地域运行，应用使用托管平台，数据库采用定期备份与恢复演练；理由是维护人数有限、允许短暂停机，暂不承担跨地域复制复杂度。列出触发升级的证据，例如连续峰值超过压测安全容量或恢复演练超过目标。"}</BookParagraph>
      <BookParagraph>{"这种记录应包含日期、假设、候选方案与复查时间。需求变化时重新评估，而不是把第一次选择变成永久标准。完成本章后，应能从用户影响推导服务边界、容量与恢复策略，而不仅能背出三个服务模式缩写。"}</BookParagraph>
    </div>),
  },
  {
    label: "练习：拆解学习网站",
    left: (
      <div className="space-y-4">
        <PageTitle>练习：拆解学习网站</PageTitle>
        <BookParagraph>请把静态文章、用户登录、学习进度、访问日志分配到服务层，并说明选择IaaS或PaaS的理由。再设计一次考试周访问量翻倍和一次应用机器故障，分别写出应对步骤。</BookParagraph>
        <BookParagraph>参考思路是静态资源缓存、接口无状态化、学习记录持久化、日志限期保留。缓存可以降低负载，但私人学习记录不能直接放进公共缓存；增加应用副本也不能自动扩展数据库写入能力。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>验收与继续阅读</PageTitle>
        <BookParagraph>交付一张包含用户到数据流向的架构图、一份责任表和一个费用清单。验收时检查每种数据都有保存位置，弹性与可用性分别有措施，故障时能指出由谁采取什么行动。</BookParagraph>
        <BookParagraph>常见错误包括把公有云等同于数据公开、把托管等同于免维护、把多副本等同于有备份。下一章将把这些设计落到地域、网络、身份和资源管理流程。</BookParagraph>
        <BookList items={[
          <a key="https://csrc.nist.gov/pubs/sp/800/145/final" href="https://csrc.nist.gov/pubs/sp/800/145/final" target="_blank" rel="noopener noreferrer" className="underline">NIST 云计算定义</a>,
          <a key="https://aws.amazon.com/compliance/shared-responsibility-model/" href="https://aws.amazon.com/compliance/shared-responsibility-model/" target="_blank" rel="noopener noreferrer" className="underline">AWS 责任共担</a>,
        ]} />
      </div>
    ),
  },
]

export default function CloudIntroPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

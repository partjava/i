'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
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

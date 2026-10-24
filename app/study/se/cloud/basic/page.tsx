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

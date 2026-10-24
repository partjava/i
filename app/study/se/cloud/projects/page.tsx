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

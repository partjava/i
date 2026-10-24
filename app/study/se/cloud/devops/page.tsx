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
  chapterTitle: '自动化与DevOps',
  chapterNumber: 6,
  totalChapters: 7,
  subjectHref: '/study/se/cloud',
  prevChapter: { label: '云安全与合规', href: '/study/se/cloud/security' },
  nextChapter: { label: '实战案例与应用', href: '/study/se/cloud/projects' },
  theme: THEMES.software,
}


const SPREADS = [
  {
    label: "让发布成为可复现流程",
    left: (
      <div className="space-y-4">
        <PageTitle>让发布成为可复现流程</PageTitle>
        <BookParagraph>DevOps强调开发与运行共同负责交付结果，CI在变更进入主分支前持续构建和验证；持续交付让通过验证的版本随时可发布，持续部署则进一步自动发布，两者不要混为一谈。</BookParagraph>
        <BookParagraph>学习网站的一次修改应产生可追溯制品：提交号、依赖锁定文件、测试结果与镜像摘要。不要在生产机器上临时修改代码后再补记录，否则同一版本名称可能对应不同实际内容。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>流水线的门禁</PageTitle>
        <BookParagraph>合理顺序是检出代码、安装锁定依赖、静态检查与测试、构建制品、安全检查、部署隔离环境、冒烟验证，最后依据风险审批正式发布。每一步失败都应停止后续阶段并保存诊断信息。</BookParagraph>
        <BookParagraph>流水线身份只获得发布特定环境所需权限，优先短期身份联邦或工作负载角色；秘密由受控环境注入，不能打印到日志。测试环境与正式环境配置分开，但使用同一份已验证制品。</BookParagraph>
      </div>
    ),
  },
  {
    label: "把回滚写进发布计划",
    left: (
      <div className="space-y-4">
        <PageTitle>把回滚写进发布计划</PageTitle>
        <BookParagraph>滚动更新逐步替换实例，蓝绿部署保留旧环境并切换流量，金丝雀先让少量请求验证新版本。无论策略如何，都需定义成功指标、观察时间和停止条件，例如错误率持续上升即暂停。</BookParagraph>
        <BookParagraph>回滚需要旧制品和兼容的数据结构。若新版本删除旧字段，回滚应用可能依然失败；数据库迁移可先新增兼容字段，再迁移读写，确认后另行收缩，避免把不可逆变更和发布绑在一起。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>只读检查发布状态</PageTitle>
        <BookParagraph>下面面向已有的本地练习Kubernetes集群和已存在的study-web Deployment，命令只查询，不创建云资源。study-lab是练习命名空间占位符，需替换为你自己的隔离环境。</BookParagraph>
        <BookParagraph>预期看到部署历史及滚动更新完成或失败信息；若资源不存在，应先回到实验准备，不要对不明集群直接部署。真正回退前先核对目标版本、配置兼容性和数据库状态，并按运行手册执行。</BookParagraph>
        <BookCode language="bash" code={"kubectl -n study-lab rollout history deployment/study-web\nkubectl -n study-lab rollout status deployment/study-web --timeout=60s\nkubectl -n study-lab get pods"} />
      </div>
    ),
  },
  {
    label: "基础设施也进入评审",
    left: (
      <div className="space-y-4">
        <PageTitle>基础设施也进入评审</PageTitle>
        <BookParagraph>IaC用声明描述网络、计算和权限，使变更能够审查与复现，但不代表任何计划都安全。先格式与语法检查，再生成变更计划，核对哪些资源将新增、修改或替换，执行后记录结果。</BookParagraph>
        <BookParagraph>状态文件可能包含敏感信息，需要访问控制、加密与并发锁。测试与正式环境状态分离，避免两个操作同时修改；不能为快速修复绕过评审后长期让实际配置与代码漂移。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>监控反馈与成本</PageTitle>
        <BookParagraph>发布后观察错误率、响应时间分位数、流量和关键依赖，而不是只看进程是否还活着。为请求携带关联标识以追踪日志，告警应说明影响、排查入口及负责人，避免只发送一条CPU数字。</BookParagraph>
        <BookParagraph>双环境部署和额外副本提高回退能力，也增加暂时资源成本；保留制品和日志需要生命周期策略。比较方案时记录恢复速度与费用，不要为了节省一台练习机器而省略恢复演练。</BookParagraph>
      </div>
    ),
  },
  {
    label: "练习：失败版本处理",
    left: (
      <div className="space-y-4">
        <PageTitle>练习：失败版本处理</PageTitle>
        <BookParagraph>假设新版本上线五分钟后登录错误率从正常水平明显升高。请写出如何确认影响、停止继续更新、选择旧制品、检查数据库兼容性、验证恢复，并将事件关联到具体提交。</BookParagraph>
        <BookParagraph>参考思路：先依据指标判断是否满足回退条件，保留现场日志，再按已验证流程恢复。恢复后补充针对该失败的验证项，区分临时止损与根因修复，不把“重新发布成功”当作问题彻底解决。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>验收与常见错误</PageTitle>
        <BookParagraph>交付流水线阶段图、版本清单、发布门槛和回退演练记录。验收要求能由提交找到制品，由制品找到部署环境；失败步骤阻断发布，并能用测试数据证明旧版本仍可正确读取记录。</BookParagraph>
        <BookParagraph>常见错误是测试通过就自动认定业务健康、用latest作为唯一版本号、将任意失败交给无限重试。发布流程应有超时、有限重试与人工接管入口，使故障不会变成持续扩大的自动操作。</BookParagraph>
        <BookList items={[
          <a key="https://kubernetes.io/docs/concepts/workloads/controllers/deployment/" href="https://kubernetes.io/docs/concepts/workloads/controllers/deployment/" target="_blank" rel="noopener noreferrer" className="underline">Kubernetes 更新与回退</a>,
          <a key="https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html" href="https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html" target="_blank" rel="noopener noreferrer" className="underline">AWS IAM 临时凭证实践</a>,
        ]} />
      </div>
    ),
  },
]

export default function CloudDevopsPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

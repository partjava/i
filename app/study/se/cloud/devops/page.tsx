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
  { label: "同一提交为何仍可能构建不同",
    left: (<div className="space-y-4">
      <PageTitle>同一提交为何仍可能构建不同</PageTitle>
      <BookParagraph>{"例一：代码提交未变，但构建时下载未固定版本的依赖，或使用会移动的基础镜像标签，两次构建可能产出不同内容。记录提交号还不够，还要锁定依赖、基础镜像和构建参数，并保存制品摘要来确认实际交付内容。"}</BookParagraph>
      <BookParagraph>{"构建应产生一次可验证制品，再按测试、预发布、正式环境逐步提升，不要每到一个环境都重新构建。环境差异通过配置注入，同时记录配置版本。这样发生故障时，才能区分代码制品变化与环境配置变化，缩小排查范围。"}</BookParagraph>
    </div>),
    right: (<div className="space-y-4">
      <PageTitle>持续集成中的三类检查</PageTitle>
      <BookParagraph>{"单元检查验证小范围逻辑，契约或集成检查验证数据库与接口约定，冒烟检查验证部署后关键路径。三者发现问题的位置不同，不能用大量单元测试替代真实连接验证，也不能只靠上线后点一下首页证明核心业务健康。"}</BookParagraph>
      <BookParagraph>{"学习网站的核心冒烟包括登录、读取章节、保存并重新读取进度，数据使用专用测试账号并清理范围受限。流水线输出测试环境和制品编号，失败必须阻断后续阶段；检查本身也要有限超时，避免挂起任务占用发布通道。"}</BookParagraph>
<div className="overflow-x-auto"><table className="min-w-[480px] w-full text-sm border-collapse"><thead><tr><th className="border border-paper-300/80 p-2 text-left">检查</th><th className="border border-paper-300/80 p-2 text-left">输入与时机</th><th className="border border-paper-300/80 p-2 text-left">能发现什么</th></tr></thead><tbody><tr><td className="border border-paper-300/80 p-2">单元</td><td className="border border-paper-300/80 p-2">函数输入，提交阶段</td><td className="border border-paper-300/80 p-2">边界逻辑错误</td></tr><tr><td className="border border-paper-300/80 p-2">集成</td><td className="border border-paper-300/80 p-2">真实契约，隔离环境</td><td className="border border-paper-300/80 p-2">字段或接口不兼容</td></tr><tr><td className="border border-paper-300/80 p-2">冒烟</td><td className="border border-paper-300/80 p-2">已部署制品</td><td className="border border-paper-300/80 p-2">入口、身份与读写失效</td></tr></tbody></table></div>
    </div>),
  },
  { label: "量化金丝雀放量",
    left: (<div className="space-y-4">
      <PageTitle>量化金丝雀放量</PageTitle>
      <BookParagraph>{"例二：新版本接收一千请求，其中三十失败，错误率为百分之三；旧版本一万请求中五十失败，为百分之零点五。虽然旧版本失败次数更多，新版本比例明显更差，应暂停放量并查看按路径和用户群分解后的证据。"}</BookParagraph>
      <BookParagraph>{"Python 3输出0.03与0.005，表达同一分母下的比较。样本太小时比例波动大，不能以一次成功就决定全量发布；还要检查请求分布是否一致、低频关键接口是否覆盖、观察窗口是否包含异步任务。门槛应事先约定并关联用户影响。"}</BookParagraph>
<BookCode language="python" code={"new = {\"failed\": 30, \"total\": 1000}\nold = {\"failed\": 50, \"total\": 10000}\nprint(new[\"failed\"] / new[\"total\"], old[\"failed\"] / old[\"total\"])"} />
    </div>),
    right: (<div className="space-y-4">
      <PageTitle>数据结构的扩展与收缩</PageTitle>
      <BookParagraph>{"例三：旧应用只读progress字段，新版希望使用progress_percent。先新增可空字段并部署兼容读写版本，回填历史数据并对照校验，再切换读取；旧版本退出且回退窗口结束后，才讨论删除旧字段。"}</BookParagraph>
      <BookParagraph>{"若同次发布直接重命名或删除旧字段，回滚应用仍会因缺字段失败。迁移脚本必须可追踪并解释重复执行的行为，长时间回填应限制负载。备份有助于恢复，但不是对破坏性结构变更随时一键回退的承诺，恢复还会影响之后的合法写入。"}</BookParagraph>
    </div>),
  },
  { label: "流水线状态机阻断错误发布",
    left: (<div className="space-y-4">
      <PageTitle>流水线状态机阻断错误发布</PageTitle>
      <BookParagraph>{"将阶段看作状态机：只有检查通过才能构建，只有制品验证通过才能发布，只有观察窗口满足指标才能完成。失败不是跳过阶段继续前进，而是形成可诊断的终止状态。手工批准也不能替代机器检查，只承担需要人判断的风险确认。"}</BookParagraph>
      <BookParagraph>{"下面Python 3模拟测试失败，输出blocked，说明部署函数不会执行。生产流水线还应控制同环境发布并发，防止两个版本交错修改配置；取消旧任务时保留其日志与制品状态，避免把部分完成误记为完全未执行。"}</BookParagraph>
<BookCode language="python" code={"checks = {\"unit\": True, \"integration\": False, \"artifact\": True}\nif all(checks.values()):\n    print(\"ready-to-deploy\")\nelse:\n    print(\"blocked\")"} />
    </div>),
    right: (<div className="space-y-4">
      <PageTitle>从告警推导回退决策</PageTitle>
      <BookParagraph>{"假设发布后进度写入错误率升高，但静态页面正常。先按版本拆分指标，确认错误集中于新实例，再核对数据库是否发生结构变更；若旧版兼容当前数据且已验证，则回退新应用制品并继续观察。"}</BookParagraph>
      <BookParagraph>{"如果两版同时出错，可能是公共依赖故障，此时回退未必有效。需要检查连接、权限和数据库状态，避免重复发布造成更多干扰。运行手册应明确谁有权暂停、需要哪些证据以及何时升级事件；止损后再完成根因修复。"}</BookParagraph>
    </div>),
  },
  { label: "基础设施计划也需要差异语义",
    left: (<div className="space-y-4">
      <PageTitle>基础设施计划也需要差异语义</PageTitle>
      <BookParagraph>{"例四：IaC计划显示实例需要替换，原因可能只是改变了不可原地修改的属性。评审不能只看“代码改一行”，而要看它会造成哪些资源动作、数据是否外置、地址是否变化以及预计中断时间。"}</BookParagraph>
      <BookParagraph>{"安全与可靠性检查同样适用：访问规则扩大、日志保留减少、备份关闭都应被识别。计划与执行之间若环境变化，应重新确认计划有效性。状态文件并不等于完整恢复资料，还需要代码、版本、凭证访问方式和可恢复数据。"}</BookParagraph>
    </div>),
    right: (<div className="space-y-4">
      <PageTitle>发布频率与恢复能力一起衡量</PageTitle>
      <BookParagraph>{"频繁发布能够缩小单次变更范围，却不能独自证明质量提高。结合从提交到交付的时间、失败变更比例、用户影响和恢复耗时观察，避免团队为追求发布次数把同一功能拆成无意义操作。"}</BookParagraph>
      <BookParagraph>{"对学习网站可记录最近十次发布的制品、持续时间、是否回退及原因，寻找重复失败模式。若失败集中在配置，应改进环境校验；若集中在数据兼容，应完善迁移流程。指标用来发现系统性问题，不用于让维护者隐藏失败记录。"}</BookParagraph>
    </div>),
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

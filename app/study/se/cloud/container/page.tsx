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
  chapterTitle: '虚拟化与容器化',
  chapterNumber: 3,
  totalChapters: 7,
  subjectHref: '/study/se/cloud',
  prevChapter: { label: '云服务基础', href: '/study/se/cloud/basic' },
  nextChapter: { label: '云存储与数据库', href: '/study/se/cloud/storage' },
  theme: THEMES.software,
}


const SPREADS = [
  {
    label: "虚拟机与容器的隔离",
    left: (
      <div className="space-y-4">
        <PageTitle>虚拟机与容器的隔离</PageTitle>
        <BookParagraph>虚拟机通过虚拟化层运行独立客户操作系统，容器通常共享宿主内核，使用进程与资源隔离机制。容器较易打包和启动，但不是安全边界的万能替代；不可信任务仍需要额外隔离与运行策略。</BookParagraph>
        <BookParagraph>学习网站可以在虚拟机内运行容器，两者并不互斥。选型应考虑内核依赖、团队维护能力、启动时间和资源开销；不要仅用“虚拟机慢、容器快”判断适用场景。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>镜像、容器与数据卷</PageTitle>
        <BookParagraph>镜像是构建后的只读模板，容器是运行实例，容器可写层随实例删除而失去。命名数据卷的生命周期可以独立于容器，适合保存需要跨实例保留的数据；卷仍需要备份与权限管理。</BookParagraph>
        <BookParagraph>应用版本进入镜像，学习记录进入数据库或明确挂载的卷，配置从运行环境注入。不要把生产数据库文件烘焙进镜像，也不要认为重新拉取镜像就能恢复用户数据。</BookParagraph>
      </div>
    ),
  },
  {
    label: "本地持久化实验",
    left: (
      <div className="space-y-4">
        <PageTitle>本地持久化实验</PageTitle>
        <BookParagraph>环境为已安装并运行Docker Engine的本地Linux或WSL，预先准备alpine:3.20镜像；下面只操作学习专用卷，不连接云账户。第二个容器读到第一个容器写入的字符串，说明数据独立于容器实例。</BookParagraph>
        <BookParagraph>命令会创建study-demo-data卷并在其中写入练习文件；同名卷可能已有数据，执行前先确认它专用于本实验。预期输出为lesson-data，命令没有自动删除卷，不影响其他卷。</BookParagraph>
        <BookCode language="bash" code={"docker volume create study-demo-data\ndocker run --rm --mount source=study-demo-data,target=/data alpine:3.20 sh -c \"echo lesson-data > /data/check.txt\"\ndocker run --rm --mount source=study-demo-data,target=/data,readonly alpine:3.20 cat /data/check.txt"} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>可重复交付的镜像</PageTitle>
        <BookParagraph>镜像应固定基础版本并记录内容摘要，构建时只复制必要文件，排除本地秘密、缓存和无关目录。运行进程尽量使用非特权用户，声明资源限制，向标准输出写日志以便收集。</BookParagraph>
        <BookParagraph>同一个镜像应在测试和正式环境使用，差异通过配置注入。latest标签会随推送改变，发布记录仅写latest难以复现问题；应保留提交号、镜像摘要、构建时间与上一可用版本。</BookParagraph>
      </div>
    ),
  },
  {
    label: "编排解决什么",
    left: (
      <div className="space-y-4">
        <PageTitle>编排解决什么</PageTitle>
        <BookParagraph>Kubernetes的Deployment描述期望副本与更新过程，调度器安排Pod运行位置；Service提供稳定访问入口。副本数只说明期望数量，不保证跨节点分布，也不说明应用能否正确处理并发和共享状态。</BookParagraph>
        <BookParagraph>就绪探针控制是否接收流量，存活探针用于识别需要重启的状态。不要把数据库短暂不可用直接变成所有实例不断重启；应根据失败模式设置超时、重试上限和独立的健康语义。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>成本与可靠性取舍</PageTitle>
        <BookParagraph>一个低流量网站未必需要自建编排集群，单机容器或托管容器平台可能更符合维护预算。多副本提高可用性的前提是有足够节点、故障域隔离以及可用的数据库与网络依赖。</BookParagraph>
        <BookParagraph>容器启动快不代表扩容立即完成，镜像下载、应用预热和数据库连接都需要时间。记录冷启动耗时并保留最低容量，同时限制日志增长与无用镜像，防止磁盘耗尽拖垮所有服务。</BookParagraph>
      </div>
    ),
  },
  { label: "镜像分层与构建缓存",
    left: (<div className="space-y-4">
      <PageTitle>镜像分层与构建缓存</PageTitle>
      <BookParagraph>{"例一：网站镜像先复制依赖锁定文件安装依赖，再复制业务源码。仅修改文章展示逻辑时，前面的依赖层可以复用；如果一开始复制整个目录，任意文件变化都可能使后续缓存失效，增加构建时间。缓存命中提高速度，但不能取代依赖完整性和漏洞检查。"}</BookParagraph>
      <BookParagraph>{"镜像层是分发与复用单位，容器运行时另有可写层。构建阶段删除曾经复制进某一层的秘密，并不意味着历史层中没有它；因此从第一步就排除凭证和私有配置。多阶段构建可以减少最终运行镜像中的工具与源文件暴露面。"}</BookParagraph>
    </div>),
    right: (<div className="space-y-4">
      <PageTitle>比较三种数据位置</PageTitle>
      <BookParagraph>{"将数据写入容器可写层，生命周期跟随容器；绑定挂载直接映射宿主路径，适合本地开发但依赖宿主目录结构；命名卷由容器引擎管理，便于独立于容器保存。三者都不能自动解决跨机器复制、并发写入与备份恢复问题。"}</BookParagraph>
      <BookParagraph>{"例二：两个应用容器都写同一SQLite文件，不能仅因为共享目录存在就认为并发安全。数据库的锁机制、网络文件系统语义和负载类型仍要评估。学习记录需要可靠多实例写入时，通常应通过合适的数据库服务访问，而非任意共享文件。"}</BookParagraph>
<div className="overflow-x-auto"><table className="min-w-[480px] w-full text-sm border-collapse"><thead><tr><th className="border border-paper-300/80 p-2 text-left">位置</th><th className="border border-paper-300/80 p-2 text-left">生命周期</th><th className="border border-paper-300/80 p-2 text-left">主要限制</th></tr></thead><tbody><tr><td className="border border-paper-300/80 p-2">可写层</td><td className="border border-paper-300/80 p-2">随容器实例</td><td className="border border-paper-300/80 p-2">不可当持久数据仓库</td></tr><tr><td className="border border-paper-300/80 p-2">绑定挂载</td><td className="border border-paper-300/80 p-2">宿主路径管理</td><td className="border border-paper-300/80 p-2">依赖目录与权限</td></tr><tr><td className="border border-paper-300/80 p-2">命名卷</td><td className="border border-paper-300/80 p-2">独立于容器</td><td className="border border-paper-300/80 p-2">仍需复制与备份</td></tr></tbody></table></div>
    </div>),
  },
  { label: "资源限制与请求上限",
    left: (<div className="space-y-4">
      <PageTitle>资源限制与请求上限</PageTitle>
      <BookParagraph>{"一个应用实例空载占用二百MB，每个并发请求额外占用八MB，容器内存限制五百MB。教学近似模型给出理论并发上限三十七，但实际还需为线程、缓存和运行时波动预留空间。下面Python 3按百分之八十安全预算计算，输出25。"}</BookParagraph>
      <BookParagraph>{"这不是任何运行时的通用内存公式，而是说明如何把测量结果转为有界并发。只设置容器内存上限而不限制应用并发，可能导致进程因内存不足被终止；限制过低又可能频繁拒绝请求。应压测并验证错误响应与上游重试不会造成新的尖峰。"}</BookParagraph>
<BookCode language="python" code={"limit_mb, baseline_mb, per_request_mb = 500, 200, 8\nsafe_budget = limit_mb * 0.8\nprint(int((safe_budget - baseline_mb) // per_request_mb))"} />
    </div>),
    right: (<div className="space-y-4">
      <PageTitle>健康探针如何改变流量</PageTitle>
      <BookParagraph>{"例三：应用启动需要加载词典二十秒，若一启动就接收请求，用户会得到大量错误。就绪检查在词典加载完成后才允许接流量；存活检查关注进程是否陷入不能恢复的异常，而不是把所有依赖抖动都解释为需要重启。"}</BookParagraph>
      <BookParagraph>{"进一步考虑数据库短暂超时：就绪失败可暂时停止引入请求，但若所有副本同时依赖同一数据库，全部退出流量也不会修好数据库。设置超时与有限重试、观测失败原因，再决定降级或人工处理。探针本身应轻量，避免重复执行昂贵查询。"}</BookParagraph>
    </div>),
  },
  { label: "无状态副本的请求分发",
    left: (<div className="space-y-4">
      <PageTitle>无状态副本的请求分发</PageTitle>
      <BookParagraph>{"将请求编号和实例名写入日志可以观察负载分发。教学输入依次把六个请求按轮询送给三个实例，输出a、b、c各两次。轮询只说明分配规则，并未考虑请求耗时、连接复用或某实例是否健康，生产入口往往需要更完整的策略。"}</BookParagraph>
      <BookParagraph>{"下面Python 3只模拟调度，不启动容器。若把一个实例设为不健康，应先从候选集合移除，再进行分发；如果候选集合为空，要返回明确不可用状态而非除零或无限等待。副本的可替换性依赖会话和持久数据已移到适当位置。"}</BookParagraph>
<BookCode language="python" code={"from collections import Counter\ninstances = [\"a\", \"b\", \"c\"]\nassigned = [instances[i % len(instances)] for i in range(6)]\nprint(dict(Counter(assigned)))"} />
    </div>),
    right: (<div className="space-y-4">
      <PageTitle>优雅终止保护进行中请求</PageTitle>
      <BookParagraph>{"滚动更新停止旧实例时，应用先停止接收新请求，再给进行中请求有限完成时间，最后退出。若直接强制终止，用户提交可能在数据库已写入但响应尚未返回时断开，随后重试需要稳定业务编号防止重复写入。"}</BookParagraph>
      <BookParagraph>{"为学习进度写入设计幂等键，并限制终止宽限期内的最大请求时长。后台任务要有可恢复检查点或明确重派机制。优雅终止不能无限等候异常连接，应记录超时后未完成任务，并在恢复流程中解释如何核对其最终状态。"}</BookParagraph>
    </div>),
  },
  { label: "镜像正确却无法运行的排查",
    left: (<div className="space-y-4">
      <PageTitle>镜像正确却无法运行的排查</PageTitle>
      <BookParagraph>{"案例：测试镜像在开发机器可用，部署后报权限错误。先检查运行用户、挂载目录所有权与只读设置，再核对环境变量和架构兼容性，不要立即改为特权容器。特权模式扩大容器对宿主的控制范围，可能把小问题变成整体安全风险。"}</BookParagraph>
      <BookParagraph>{"另一种失败是磁盘已满：即使应用代码无变化，日志、镜像缓存和卷增长也会阻止启动。分别观察各类占用，按保留策略处理，并确认恢复材料不受影响。排障记录应带镜像摘要与配置版本，保证别人能重现当时的运行条件。"}</BookParagraph>
    </div>),
    right: (<div className="space-y-4">
      <PageTitle>从一个容器演进到编排</PageTitle>
      <BookParagraph>{"单机运行先解决可重复构建、启动配置、数据持久化和日志收集；当多个服务需要跨节点调度、自动替换或规范发布，再评估编排平台。控制平面、网络、证书与存储插件也要维护，集群不会自动降低所有运行复杂度。"}</BookParagraph>
      <BookParagraph>{"为你的学习网站画出演进路径：先固定版本与备份，再加入健康检测和部署记录，最后考虑多故障域调度。每次增加技术都应对应明确问题及可量化收益，例如把恢复时间从人工半小时缩短到演练验证的几分钟，而不只是增加工具名称。"}</BookParagraph>
    </div>),
  },
  {
    label: "练习：无状态应用改造",
    left: (
      <div className="space-y-4">
        <PageTitle>练习：无状态应用改造</PageTitle>
        <BookParagraph>假设学习网站把用户上传图片放在容器内，把登录会话放在内存。请解释扩为两个副本后为何可能看不到图片或随机退出登录，再提出可以迁移与恢复的存储方案。</BookParagraph>
        <BookParagraph>参考思路是将图片放到对象存储，会话采用共享会话存储或适当的令牌方案，持久化学习进度进入数据库。会话存储的过期时间和权限也要设计，不能只把目录换一个位置。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>验收与常见错误</PageTitle>
        <BookParagraph>提交镜像版本记录、数据流图以及本地卷实验的输出。验收时应解释删除容器与删除卷的区别，说明镜像更新后数据仍保留的条件，并为数据卷写出备份和恢复责任人。</BookParagraph>
        <BookParagraph>常见错误有把容器当完整虚拟机、使用特权模式解决所有权限问题、仅靠副本保护数据。能运行容器只是起点，可重复构建、明确持久化边界和故障恢复才能形成可靠部署。</BookParagraph>
        <BookList items={[
          <a key="https://docs.docker.com/engine/storage/volumes/" href="https://docs.docker.com/engine/storage/volumes/" target="_blank" rel="noopener noreferrer" className="underline">Docker 数据卷</a>,
          <a key="https://kubernetes.io/docs/concepts/workloads/controllers/deployment/" href="https://kubernetes.io/docs/concepts/workloads/controllers/deployment/" target="_blank" rel="noopener noreferrer" className="underline">Kubernetes Deployment</a>,
        ]} />
      </div>
    ),
  },
]

export default function CloudContainerPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

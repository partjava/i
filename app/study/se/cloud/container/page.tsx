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

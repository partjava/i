'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
  TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '计算机网络',
  chapterTitle: '网络基础与入门',
  chapterNumber: 1,
  totalChapters: 17,
  subjectHref: '/study/computer/network',
  nextChapter: { label: '网络通信原理', href: '/study/computer/network/comm-principle' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '网络基础概念',
    left: (
      <div className="space-y-4">
        <PageTitle>计算机网络基础</PageTitle>
        <BookParagraph>
          计算机网络是将地理位置不同的具有独立功能的多台计算机及其外部设备，通过通信线路连接起来，在网络操作系统、网络管理软件及网络通信协议的管理和协调下，实现资源共享和信息传递的计算机系统。
        </BookParagraph>
        <SectionTitle>为什么学习计算机网络？</SectionTitle>
        <BookList items={[
          '🌐 互联网时代的基础技能',
          '💼 IT行业的必备知识',
          '🔧 解决网络问题的能力',
          '🚀 理解新技术的基础',
        ]} />
        <BookAlert type="info" message="网络知识是IT从业者的基本功，无论前端、后端、运维都需要扎实的网络基础。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>网络的基本功能</PageTitle>
        <SectionTitle>1. 资源共享</SectionTitle>
        <BookList items={[
          '硬件共享：打印机、存储设备、扫描仪等',
          '软件共享：应用程序、数据库、系统软件等',
          '数据共享：文件、信息、多媒体资源等',
        ]} />
        <SectionTitle>2. 信息传输与通信</SectionTitle>
        <BookList items={[
          '电子邮件：快速、便捷的信息传递',
          '即时通讯：实时交流与协作',
          '视频会议：远程会议与沟通',
          '网络电话：低成本的长途通信',
        ]} />
        <SectionTitle>3. 分布式处理</SectionTitle>
        <BookList items={[
          '提高系统可靠性：多节点备份，避免单点故障',
          '提高系统处理能力：多节点并行处理',
          '实现负载均衡：合理分配计算资源',
        ]} />
        <TagGrid items={['资源共享', '信息传输', '分布式处理', '可靠性']} />
      </div>
    ),
  },
  {
    label: '网络分类',
    left: (
      <div className="space-y-4">
        <PageTitle>网络的基本分类</PageTitle>
        <SectionTitle>按覆盖范围分类：</SectionTitle>
        <BookList items={[
          '个人区域网（PAN）：覆盖范围约10米内，如蓝牙设备、智能手表',
          '局域网（LAN）：覆盖范围在几百米到几公里，如办公室、教室网络',
          '城域网（MAN）：覆盖一个城市范围，如城市监控网络',
          '广域网（WAN）：跨国家、跨洲际的网络，如互联网',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>按拓扑结构分类</PageTitle>
        <BookList items={[
          '星型网络：所有设备连接到中央节点，易于管理但依赖中心节点',
          '环形网络：设备形成闭合环路，传输距离远但单个故障影响大',
          '总线型网络：所有设备共享一条通信线路，结构简单但容易形成瓶颈',
          '网状网络：设备间有多条路径，可靠性高但造价昂贵',
        ]} />
        <BookAlert type="info" message="现代企业网络通常采用混合拓扑结构，结合星型和树型拓扑的优点。" />
        <TagGrid items={['PAN', 'LAN', 'MAN', 'WAN', '星型', '网状']} />
      </div>
    ),
  },
  {
    label: '学习建议',
    left: (
      <div className="space-y-4">
        <PageTitle>学习建议</PageTitle>
        <BookParagraph>
          计算机网络知识点多且抽象，需要循序渐进地学习。
        </BookParagraph>
        <BookList items={[
          '📚 从基础概念开始，循序渐进',
          '🔍 理解网络分层模型，掌握各层功能',
          '📝 熟悉常用网络协议，了解其工作原理',
          '🔧 动手实践网络配置，积累实战经验',
          '🛡️ 关注网络安全知识，培养安全意识',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>学习路径建议</PageTitle>
        <BookParagraph>
          建议按照以下路径系统学习：
        </BookParagraph>
        <BookList items={[
          '先掌握基础概念（网络分类、拓扑结构）',
          '再学习分层模型（OSI/TCPIP）',
          '深入各层协议（IP、TCP、UDP、HTTP等）',
          '掌握网络安全与配置管理',
          '通过抓包和项目实战巩固理解',
        ]} />
        <TagGrid items={['学习建议', '循序渐进', '动手实践', '分层模型', '协议']} />
      </div>
    ),
  },
]

export default function NetworkIntroPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

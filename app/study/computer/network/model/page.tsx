'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
  TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '计算机网络',
  chapterTitle: 'OSI与TCPIP模型',
  chapterNumber: 3,
  totalChapters: 17,
  subjectHref: '/study/computer/network',
  prevChapter: { label: '网络通信原理', href: '/study/computer/network/comm-principle' },
  nextChapter: { label: '物理层与数据链路层', href: '/study/computer/network/link' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: 'OSI七层模型',
    left: (
      <div className="space-y-4">
        <PageTitle>OSI七层模型</PageTitle>
        <BookParagraph>
          OSI（Open System Interconnection）模型是国际标准化组织提出的网络分层参考模型，将网络通信过程分为七层，每层各司其职。
        </BookParagraph>
        <BookList items={[
          '物理层：比特流的传输，接口标准、传输介质',
          '数据链路层：成帧、差错检测、流量控制，协议如以太网、PPP',
          '网络层：路由选择、逻辑寻址，协议如IP、ICMP',
          '传输层：端到端通信、可靠性，协议如TCP、UDP',
          '会话层：建立、管理和终止会话',
          '表示层：数据格式转换、加密解密、压缩',
          '应用层：为用户提供网络服务，协议如HTTP、FTP、SMTP',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>OSI七层模型结构图</PageTitle>
        <div style={{ textAlign: 'center', margin: '24px 0' }}>
          <svg width="320" height="260">
            {[...Array(7)].map((_, i) => (
              <g key={i}>
                <rect x="80" y={20 + i * 30} width="160" height="28" fill="#e3eafe" stroke="#386ff6" rx="8" />
                <text x="160" y={38 + i * 30} textAnchor="middle" fontSize="14" fill="#386ff6">
                  {['应用层', '表示层', '会话层', '传输层', '网络层', '数据链路层', '物理层'][6 - i]}
                </text>
              </g>
            ))}
            <text x="160" y="245" textAnchor="middle" fontSize="13" fill="#888">OSI七层模型结构示意图</text>
          </svg>
        </div>
        <BookAlert type="info" message="OSI模型是理论参考模型，实际网络协议并不严格遵循七层划分，但其分层思想对理解网络通信至关重要。" />
        <TagGrid items={['OSI', '物理层', '数据链路层', '网络层', '传输层', '应用层']} />
      </div>
    ),
  },
  {
    label: 'TCP/IP模型',
    left: (
      <div className="space-y-4">
        <PageTitle>TCP/IP四层模型</PageTitle>
        <BookParagraph>
          TCP/IP模型是互联网实际采用的分层模型，共四层，简化了OSI模型。
        </BookParagraph>
        <BookList items={[
          '应用层：对应OSI的应用层、表示层、会话层，协议如HTTP、FTP、SMTP、DNS',
          '传输层：端到端通信，协议如TCP、UDP',
          '网络层（网际层）：路由与寻址，协议如IP、ICMP、ARP',
          '网络接口层（链路层）：物理传输，协议如以太网、PPP',
        ]} />
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="320" height="170">
            {[...Array(4)].map((_, i) => (
              <g key={i}>
                <rect x="80" y={20 + i * 30} width="160" height="28" fill="#e3eafe" stroke="#386ff6" rx="8" />
                <text x="160" y={38 + i * 30} textAnchor="middle" fontSize="14" fill="#386ff6">
                  {['应用层', '传输层', '网际层', '网络接口层'][3 - i]}
                </text>
              </g>
            ))}
            <text x="160" y="155" textAnchor="middle" fontSize="13" fill="#888">TCP/IP四层模型结构示意图</text>
          </svg>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>模型对比与联系</PageTitle>
        <BookParagraph>
          OSI与TCP/IP模型虽然层数不同，但核心思想一致，都采用分层结构，便于网络设计和实现。
        </BookParagraph>
        <BookList items={[
          'OSI模型理论性强，层次细致，便于教学和理解',
          'TCP/IP模型实用性强，互联网广泛采用，层次简化',
        ]} />
        <SectionTitle>层次对应关系</SectionTitle>
        <BookList items={[
          'OSI的应用层、表示层、会话层 ≈ TCP/IP的应用层',
          'OSI的传输层 ≈ TCP/IP的传输层',
          'OSI的网络层 ≈ TCP/IP的网际层',
          'OSI的数据链路层、物理层 ≈ TCP/IP的网络接口层',
        ]} />
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="420" height="260">
            {[...Array(7)].map((_, i) => (
              <g key={i}>
                <rect x="40" y={20 + i * 30} width="100" height="28" fill="#e3eafe" stroke="#386ff6" rx="8" />
                <text x="90" y={38 + i * 30} textAnchor="middle" fontSize="13" fill="#386ff6">
                  {['应用层', '表示层', '会话层', '传输层', '网络层', '数据链路层', '物理层'][6 - i]}
                </text>
              </g>
            ))}
            {[...Array(4)].map((_, i) => (
              <g key={i}>
                <rect x="280" y={50 + i * 45} width="100" height="38" fill="#e3eafe" stroke="#386ff6" rx="8" />
                <text x="330" y={75 + i * 45} textAnchor="middle" fontSize="13" fill="#386ff6">
                  {['应用层', '传输层', '网际层', '网络接口层'][3 - i]}
                </text>
              </g>
            ))}
            <text x="210" y="250" textAnchor="middle" fontSize="13" fill="#888">OSI与TCP/IP模型对比示意图</text>
          </svg>
        </div>
        <TagGrid items={['TCP/IP', 'OSI', '对比', '分层', '互联网']} />
      </div>
    ),
  },
]

export default function NetworkModelPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

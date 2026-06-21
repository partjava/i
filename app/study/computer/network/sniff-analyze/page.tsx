'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookList,
  TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '计算机网络',
  chapterTitle: '网络抓包与协议分析',
  chapterNumber: 13,
  totalChapters: 17,
  subjectHref: '/study/computer/network',
  prevChapter: { label: '云网络与新技术', href: '/study/computer/network/cloud-newtech' },
  nextChapter: { label: '网络配置与管理', href: '/study/computer/network/config-manage' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '抓包工具与原理',
    left: (
      <div className="space-y-4">
        <PageTitle>抓包工具与原理</PageTitle>
        <BookParagraph>抓包是指捕获网络中传输的数据包，常用工具有Wireshark、tcpdump等。抓包可用于协议分析、故障排查和安全检测。</BookParagraph>
        <BookList items={[
          'Wireshark：图形化抓包与协议分析工具，支持多种协议解析',
          'tcpdump：命令行抓包工具，适合快速定位问题',
          '原理：通过网卡混杂模式捕获经过主机的所有数据包',
        ]} />
        <SectionTitle>典型抓包流程图</SectionTitle>
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="700" height="120">
            <rect x="60" y="40" width="100" height="40" fill="#e3eafe" stroke="#386ff6" rx="8" />
            <text x="110" y="65" textAnchor="middle" fontSize="14" fill="#386ff6">终端主机</text>
            <rect x="300" y="40" width="100" height="40" fill="#fff7e6" stroke="#faad14" rx="8" />
            <text x="350" y="65" textAnchor="middle" fontSize="14" fill="#faad14">抓包工具</text>
            <rect x="540" y="40" width="100" height="40" fill="#e3eafe" stroke="#386ff6" rx="8" />
            <text x="590" y="65" textAnchor="middle" fontSize="14" fill="#386ff6">网络流量</text>
            <line x1="160" y1="60" x2="300" y2="60" stroke="#386ff6" strokeWidth="2" />
            <line x1="400" y1="60" x2="540" y2="60" stroke="#faad14" strokeWidth="2" />
          </svg>
          <div style={{ color: '#888' }}>抓包工具捕获主机与网络间的所有数据包</div>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>常见协议分析方法</SectionTitle>
        <BookParagraph>协议分析是指对捕获的数据包进行解码和内容解析，常见协议有HTTP、TCP、DNS等。</BookParagraph>
        <BookList items={[
          'HTTP：分析请求/响应头、内容、状态码等',
          'TCP：分析三次握手、四次挥手、重传等过程',
          'DNS：分析域名解析请求与响应',
        ]} />
        <SectionTitle>协议分析流程</SectionTitle>
        <BookParagraph>通过抓包工具查看协议字段，结合协议规范判断通信过程是否正常。</BookParagraph>
        <SectionTitle>抓包与协议分析应用</SectionTitle>
        <BookParagraph>抓包与协议分析广泛应用于网络故障排查、安全检测、性能优化等场景。</BookParagraph>
        <BookList items={[
          '排查网络连接异常、丢包、延迟等问题',
          '检测恶意流量、入侵行为',
          '分析应用层协议性能瓶颈',
        ]} />
        <TagGrid items={['Wireshark', 'tcpdump', '协议分析', '抓包', '排障']} />
      </div>
    ),
  },
  {
    label: '例题与思考题',
    left: (
      <div className="space-y-4">
        <PageTitle>例题与思考题</PageTitle>
        <div className="rounded-lg p-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-1">例题：</p>
          <p className="text-xs mb-1">使用Wireshark抓包时，如何定位TCP三次握手过程？</p>
          <p className="text-xs" style={{ color: '#666' }}>解析：在Wireshark中过滤「tcp.handshake」或「tcp.flags.syn==1」；观察SYN、SYN-ACK、ACK三个数据包的时序；结合源/目的IP和端口判断连接双方。</p>
        </div>
        <SectionTitle>思考题</SectionTitle>
        <BookParagraph>1. 为什么抓包工具需要网卡混杂模式？</BookParagraph>
        <BookParagraph>2. 如何通过协议分析发现网络安全隐患？</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <TagGrid items={['TCP三次握手', '混杂模式', '流量分析', '安全检测']} />
      </div>
    ),
  },
]

export default function NetworkSniffAnalyzePage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

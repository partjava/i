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
  chapterTitle: 'TCP与UDP',
  chapterNumber: 6,
  totalChapters: 17,
  subjectHref: '/study/computer/network',
  prevChapter: { label: 'IP与路由', href: '/study/computer/network/ip-routing' },
  nextChapter: { label: '应用层协议', href: '/study/computer/network/application' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: 'TCP协议',
    left: (
      <div className="space-y-4">
        <PageTitle>TCP协议</PageTitle>
        <BookParagraph>TCP（传输控制协议）是一种面向连接的、可靠的传输层协议。</BookParagraph>
        <BookList items={[
          '面向连接：通信前需要建立连接',
          '可靠传输：通过确认机制、重传机制等保证数据可靠传输',
          '流量控制：通过滑动窗口机制控制发送速率',
          '拥塞控制：通过慢启动、拥塞避免等算法控制网络拥塞',
        ]} />
        <SectionTitle>TCP可靠传输机制</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2" style={{ borderColor: '#90caf9' }}>
                <th className="text-left p-1 font-semibold">机制</th><th className="text-left p-1 font-semibold">说明</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b"><td className="p-1">确认机制</td><td className="p-1">接收方发送确认报文</td></tr>
              <tr className="border-b"><td className="p-1">重传机制</td><td className="p-1">超时重传、快速重传</td></tr>
              <tr><td className="p-1">滑动窗口</td><td className="p-1">流量控制</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>TCP三次握手</PageTitle>
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="600" height="130">
            <rect x="30" y="20" width="120" height="40" fill="#e3eafe" stroke="#386ff6" rx="8" />
            <text x="90" y="45" textAnchor="middle" fontSize="14" fill="#386ff6">客户端</text>
            <rect x="450" y="20" width="120" height="40" fill="#e3eafe" stroke="#386ff6" rx="8" />
            <text x="510" y="45" textAnchor="middle" fontSize="14" fill="#386ff6">服务器</text>
            <line x1="150" y1="35" x2="450" y2="35" stroke="#386ff6" strokeWidth="2" />
            <text x="300" y="30" textAnchor="middle" fontSize="11" fill="#386ff6">SYN=1, seq=x</text>
            <line x1="450" y1="55" x2="150" y2="55" stroke="#386ff6" strokeWidth="2" />
            <text x="300" y="50" textAnchor="middle" fontSize="11" fill="#386ff6">SYN=1, ACK=1, seq=y, ack=x+1</text>
            <line x1="150" y1="75" x2="450" y2="75" stroke="#386ff6" strokeWidth="2" />
            <text x="300" y="70" textAnchor="middle" fontSize="11" fill="#386ff6">ACK=1, seq=x+1, ack=y+1</text>
          </svg>
        </div>
        <div className="rounded-lg p-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-1">例题：</p>
          <p className="text-xs mb-1">简述TCP三次握手的过程。</p>
          <p className="text-xs" style={{ color: '#666' }}>第一次：客户端发SYN；第二次：服务端发SYN+ACK；第三次：客户端发ACK。建立双向连接。</p>
        </div>
        <TagGrid items={['TCP', '三次握手', '可靠传输', '滑动窗口', '拥塞控制']} />
      </div>
    ),
  },
  {
    label: 'UDP协议',
    left: (
      <div className="space-y-4">
        <PageTitle>UDP协议</PageTitle>
        <BookParagraph>UDP（用户数据报协议）是一种无连接的、不可靠的传输层协议。</BookParagraph>
        <BookList items={[
          '无连接：通信前不需要建立连接',
          '不可靠传输：不保证数据可靠到达',
          '无流量控制：发送速率不受限制',
          '无拥塞控制：不控制网络拥塞',
        ]} />
        <SectionTitle>UDP报文格式</SectionTitle>
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="600" height="80">
            <rect x="30" y="10" width="540" height="50" fill="#e3eafe" stroke="#386ff6" rx="8" />
            <text x="165" y="30" textAnchor="middle" fontSize="13" fill="#386ff6">源端口</text>
            <text x="300" y="30" textAnchor="middle" fontSize="13" fill="#386ff6">目的端口</text>
            <text x="435" y="30" textAnchor="middle" fontSize="13" fill="#386ff6">长度</text>
            <text x="570" y="30" textAnchor="middle" fontSize="13" fill="#386ff6">校验和</text>
            <line x1="270" y1="10" x2="270" y2="60" stroke="#386ff6" strokeWidth="1" />
            <line x1="405" y1="10" x2="405" y2="60" stroke="#386ff6" strokeWidth="1" />
            <line x1="540" y1="10" x2="540" y2="60" stroke="#386ff6" strokeWidth="1" />
          </svg>
        </div>
        <SectionTitle>UDP应用场景</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2" style={{ borderColor: '#90caf9' }}>
                <th className="text-left p-1 font-semibold">应用</th><th className="text-left p-1 font-semibold">说明</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b"><td className="p-1">DNS</td><td className="p-1">域名解析</td></tr>
              <tr className="border-b"><td className="p-1">DHCP</td><td className="p-1">动态主机配置</td></tr>
              <tr><td className="p-1">视频流</td><td className="p-1">实时视频传输</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>TCP与UDP比较</PageTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2" style={{ borderColor: '#90caf9' }}>
                <th className="text-left p-1 font-semibold">特性</th><th className="text-left p-1 font-semibold">TCP</th><th className="text-left p-1 font-semibold">UDP</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b"><td className="p-1">连接性</td><td className="p-1">面向连接</td><td className="p-1">无连接</td></tr>
              <tr className="border-b"><td className="p-1">可靠性</td><td className="p-1">可靠</td><td className="p-1">不可靠</td></tr>
              <tr className="border-b"><td className="p-1">流量控制</td><td className="p-1">有</td><td className="p-1">无</td></tr>
              <tr className="border-b"><td className="p-1">拥塞控制</td><td className="p-1">有</td><td className="p-1">无</td></tr>
              <tr><td className="p-1">传输效率</td><td className="p-1">较低</td><td className="p-1">较高</td></tr>
            </tbody>
          </table>
        </div>
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="600" height="160">
            <rect x="30" y="10" width="260" height="140" fill="#e3eafe" stroke="#386ff6" rx="8" />
            <text x="160" y="35" textAnchor="middle" fontSize="15" fill="#386ff6">TCP应用场景</text>
            <text x="160" y="65" textAnchor="middle" fontSize="13">HTTP/HTTPS</text>
            <text x="160" y="90" textAnchor="middle" fontSize="13">FTP</text>
            <text x="160" y="115" textAnchor="middle" fontSize="13">SMTP</text>
            <text x="160" y="140" textAnchor="middle" fontSize="13">SSH</text>
            <rect x="310" y="10" width="260" height="140" fill="#e3eafe" stroke="#386ff6" rx="8" />
            <text x="440" y="35" textAnchor="middle" fontSize="15" fill="#386ff6">UDP应用场景</text>
            <text x="440" y="65" textAnchor="middle" fontSize="13">DNS</text>
            <text x="440" y="90" textAnchor="middle" fontSize="13">DHCP</text>
            <text x="440" y="115" textAnchor="middle" fontSize="13">视频流</text>
            <text x="440" y="140" textAnchor="middle" fontSize="13">语音通话</text>
          </svg>
        </div>
        <BookAlert type="info" message="TCP和UDP的选择取决于应用需求：需要可靠性选TCP，需要实时性选UDP。" />
        <TagGrid items={['UDP', 'TCP vs UDP', 'DNS', 'DHCP', '视频流', '实时性']} />
      </div>
    ),
  },
]

export default function NetworkTcpUdpPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

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
  chapterTitle: '应用层协议',
  chapterNumber: 7,
  totalChapters: 17,
  subjectHref: '/study/computer/network',
  prevChapter: { label: 'TCP与UDP', href: '/study/computer/network/tcp-udp' },
  nextChapter: { label: '局域网与广域网', href: '/study/computer/network/lan-wan' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: 'HTTP协议',
    left: (
      <div className="space-y-4">
        <PageTitle>HTTP协议</PageTitle>
        <BookParagraph>HTTP（超文本传输协议）是Web通信的基础协议，工作在应用层。</BookParagraph>
        <BookList items={[
          '基于请求-响应模式',
          '通常运行在TCP之上，端口号80',
          '通信前需通过DNS解析获得目标主机IP',
        ]} />
        <SectionTitle>HTTP通信流程与IP关系</SectionTitle>
        <BookList items={[
          '用户输入URL（如 http://www.example.com）',
          '浏览器通过DNS解析获得目标主机IP地址',
          'HTTP请求封装在TCP段，再封装在IP包，目的IP为目标主机IP',
          '数据包在网络中通过路由器转发，最终到达目标主机',
        ]} />
        <div className="rounded-lg p-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-1">例题：</p>
          <p className="text-xs mb-1">用户访问 http://www.example.com，简述数据包从客户端到服务器的全过程。</p>
          <p className="text-xs" style={{ color: '#666' }}>解析：DNS解析→获取IP→封装TCP/IP包（目的IP: 203.0.113.10）→路由转发→服务器响应</p>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>HTTP请求与IP寻址流程</PageTitle>
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="700" height="180">
            <rect x="30" y="60" width="120" height="40" fill="#e3eafe" stroke="#386ff6" rx="8" />
            <text x="90" y="85" textAnchor="middle" fontSize="14">客户端</text>
            <text x="90" y="105" textAnchor="middle" fontSize="11" fill="#888">源IP: 192.168.1.2</text>
            <rect x="200" y="60" width="120" height="40" fill="#f0f5ff" stroke="#386ff6" rx="8" />
            <text x="260" y="85" textAnchor="middle" fontSize="14">路由器</text>
            <ellipse cx="400" cy="80" rx="60" ry="30" fill="#f0f5ff" stroke="#386ff6" />
            <text x="400" y="85" textAnchor="middle" fontSize="14">互联网</text>
            <rect x="520" y="60" width="120" height="40" fill="#e3eafe" stroke="#386ff6" rx="8" />
            <text x="580" y="85" textAnchor="middle" fontSize="14">Web服务器</text>
            <text x="580" y="105" textAnchor="middle" fontSize="11" fill="#888">目的IP: 203.0.113.10</text>
            <line x1="150" y1="80" x2="200" y2="80" stroke="#386ff6" strokeWidth="2" />
            <line x1="320" y1="80" x2="340" y2="80" stroke="#386ff6" strokeWidth="2" />
            <line x1="460" y1="80" x2="520" y2="80" stroke="#386ff6" strokeWidth="2" />
          </svg>
        </div>
        <TagGrid items={['HTTP', 'URL', 'DNS解析', 'TCP封装', 'IP路由']} />
      </div>
    ),
  },
  {
    label: 'DNS与SMTP',
    left: (
      <div className="space-y-4">
        <PageTitle>DNS协议</PageTitle>
        <BookParagraph>DNS（域名系统）用于将域名解析为IP地址，便于主机间通信。</BookParagraph>
        <BookList items={[
          '基于UDP（有时TCP）传输，端口号53',
          '每次查询都需指定目标DNS服务器的IP',
        ]} />
        <SectionTitle>DNS查询流程与IP关系</SectionTitle>
        <BookList items={[
          '客户端向本地DNS发送查询，目的IP为DNS服务器IP（如114.114.114.114）',
          '若本地DNS无法解析，则递归/迭代查询其他DNS服务器',
          '最终获得目标主机的IP地址',
        ]} />
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="700" height="130">
            <rect x="30" y="40" width="120" height="40" fill="#e3eafe" stroke="#386ff6" rx="8" />
            <text x="90" y="65" textAnchor="middle" fontSize="13">客户端</text>
            <text x="90" y="20" textAnchor="middle" fontSize="11" fill="#888">源IP: 192.168.1.2</text>
            <rect x="200" y="40" width="120" height="40" fill="#f0f5ff" stroke="#386ff6" rx="8" />
            <text x="260" y="65" textAnchor="middle" fontSize="13">本地DNS</text>
            <text x="260" y="20" textAnchor="middle" fontSize="11" fill="#888">目的IP: 114.114.114.114</text>
            <rect x="520" y="40" width="120" height="40" fill="#e3eafe" stroke="#386ff6" rx="8" />
            <text x="580" y="65" textAnchor="middle" fontSize="13">权威DNS</text>
            <text x="580" y="20" textAnchor="middle" fontSize="11" fill="#888">目的IP: 198.51.100.1</text>
            <line x1="150" y1="60" x2="200" y2="60" stroke="#386ff6" strokeWidth="2" />
            <line x1="320" y1="60" x2="520" y2="60" stroke="#386ff6" strokeWidth="2" />
          </svg>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>SMTP协议</PageTitle>
        <BookParagraph>SMTP（简单邮件传输协议）用于邮件发送，POP3/IMAP用于邮件接收。</BookParagraph>
        <BookList items={[
          'SMTP通常运行在TCP之上，端口号25',
          '邮件发送时，数据包的目的IP为目标邮件服务器IP',
        ]} />
        <SectionTitle>SMTP通信流程与IP关系</SectionTitle>
        <BookList items={[
          '客户端准备邮件内容，封装为SMTP报文',
          'SMTP报文封装在TCP段，再封装在IP包，目的IP为目标邮件服务器IP',
          '数据包通过路由器和互联网转发，最终到达目标邮件服务器',
        ]} />
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="700" height="130">
            <rect x="30" y="40" width="120" height="40" fill="#e3eafe" stroke="#386ff6" rx="8" />
            <text x="90" y="65" textAnchor="middle" fontSize="13">发件人客户端</text>
            <text x="90" y="20" textAnchor="middle" fontSize="11" fill="#888">源IP: 192.168.1.2</text>
            <rect x="200" y="40" width="120" height="40" fill="#f0f5ff" stroke="#386ff6" rx="8" />
            <text x="260" y="65" textAnchor="middle" fontSize="13">路由器</text>
            <ellipse cx="400" cy="60" rx="60" ry="25" fill="#f0f5ff" stroke="#386ff6" />
            <text x="400" y="65" textAnchor="middle" fontSize="13">互联网</text>
            <rect x="520" y="40" width="120" height="40" fill="#e3eafe" stroke="#386ff6" rx="8" />
            <text x="580" y="65" textAnchor="middle" fontSize="13">邮件服务器</text>
            <text x="580" y="20" textAnchor="middle" fontSize="11" fill="#888">目的IP: 203.0.113.20</text>
            <line x1="150" y1="60" x2="200" y2="60" stroke="#386ff6" strokeWidth="2" />
            <line x1="320" y1="60" x2="340" y2="60" stroke="#386ff6" strokeWidth="2" />
            <line x1="460" y1="60" x2="520" y2="60" stroke="#386ff6" strokeWidth="2" />
          </svg>
        </div>
        <BookAlert type="info" message="应用层协议都依赖于下层TCP/UDP和IP协议。理解数据封装过程（数据→应用层报文→TCP/UDP段→IP包→帧）是网络学习的重点。" />
        <TagGrid items={['DNS', 'SMTP', 'POP3', 'IMAP', 'UDP 53', 'TCP 25']} />
      </div>
    ),
  },
]

export default function NetworkApplicationPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookList,
  TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '计算机网络',
  chapterTitle: '网络安全基础',
  chapterNumber: 11,
  totalChapters: 17,
  subjectHref: '/study/computer/network',
  prevChapter: { label: 'VPN与代理技术', href: '/study/computer/network/vpn-proxy' },
  nextChapter: { label: '云网络与新技术', href: '/study/computer/network/cloud-newtech' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '防火墙与ACL',
    left: (
      <div className="space-y-4">
        <PageTitle>防火墙与ACL</PageTitle>
        <BookParagraph>防火墙和访问控制列表（ACL）是网络安全的基础手段，主要通过IP地址、端口等信息对数据包进行过滤和控制。</BookParagraph>
        <BookList items={[
          '防火墙根据源IP、目的IP、端口等规则决定是否允许数据包通过',
          'ACL常用于路由器、交换机上，基于IP地址进行访问控制',
        ]} />
        <SectionTitle>防火墙过滤流程与IP关系</SectionTitle>
        <BookParagraph>防火墙过滤流程如下：</BookParagraph>
        <BookList items={[
          '数据包到达防火墙，检查源IP和目的IP',
          '根据安全策略判断是否允许转发到目标主机',
          '若被拒绝，数据包被丢弃，无法到达终点IP',
        ]} />
        <div style={{ textAlign: 'center', margin: '24px 0' }}>
          <svg width="700" height="180">
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L10,5 L0,10" fill="#faad14" />
              </marker>
            </defs>
            <rect x="30" y="60" width="120" height="40" fill="#e3eafe" stroke="#386ff6" rx="8" />
            <text x="90" y="85" textAnchor="middle" fontSize="14" fill="#386ff6">外部主机</text>
            <text x="90" y="105" textAnchor="middle" fontSize="12" fill="#888">源IP: 8.8.8.8</text>
            <rect x="200" y="60" width="120" height="40" fill="#fff7e6" stroke="#faad14" rx="8" />
            <text x="260" y="85" textAnchor="middle" fontSize="14" fill="#faad14">防火墙</text>
            <rect x="520" y="60" width="120" height="40" fill="#e3eafe" stroke="#386ff6" rx="8" />
            <text x="580" y="85" textAnchor="middle" fontSize="14" fill="#386ff6">内部服务器</text>
            <text x="580" y="105" textAnchor="middle" fontSize="12" fill="#888">目的IP: 192.168.1.10</text>
            <line x1="150" y1="80" x2="200" y2="80" stroke="#faad14" strokeWidth="2" markerEnd="url(#arrow)" />
            <line x1="320" y1="80" x2="520" y2="80" stroke="#386ff6" strokeWidth="2" markerEnd="url(#arrow)" />
          </svg>
          <div style={{ color: '#888' }}>防火墙根据源IP和目的IP决定数据包能否到达终点</div>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <div className="rounded-lg p-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-1">例题：</p>
          <p className="text-xs mb-1">某防火墙规则禁止8.8.8.8访问192.168.1.10，若外部主机8.8.8.8尝试访问内部服务器192.168.1.10，数据包能否到达？请说明IP的作用。</p>
          <p className="text-xs" style={{ color: '#666' }}>解析：数据包的源IP为8.8.8.8，目的IP为192.168.1.10；防火墙检查到该规则，拒绝转发，数据包被丢弃；数据包无法到达终点IP（192.168.1.10）。</p>
        </div>
        <TagGrid items={['防火墙', 'ACL', '访问控制', '源IP', '目的IP']} />
      </div>
    ),
  },
  {
    label: 'NAT与IP映射',
    left: (
      <div className="space-y-4">
        <PageTitle>NAT与IP映射</PageTitle>
        <BookParagraph>NAT（网络地址转换）用于在私有网络和公网之间转换IP地址，实现地址复用和隐藏内部结构。</BookParagraph>
        <BookList items={[
          '源IP和/或目的IP在NAT设备处被转换',
          '常见有SNAT（源地址转换）、DNAT（目的地址转换）',
        ]} />
        <SectionTitle>NAT转换流程与IP关系</SectionTitle>
        <BookParagraph>NAT转换流程如下：</BookParagraph>
        <BookList items={[
          '内部主机发送数据包，源IP为私有地址',
          'NAT设备将源IP转换为公网IP，转发到目标主机',
          '响应数据包返回时，NAT设备将目的IP转换回内部主机IP',
        ]} />
        <div style={{ textAlign: 'center', margin: '24px 0' }}>
          <svg width="700" height="180">
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L10,5 L0,10" fill="#faad14" />
              </marker>
            </defs>
            <rect x="30" y="60" width="120" height="40" fill="#e3eafe" stroke="#386ff6" rx="8" />
            <text x="90" y="85" textAnchor="middle" fontSize="14" fill="#386ff6">内部主机</text>
            <text x="90" y="105" textAnchor="middle" fontSize="12" fill="#888">源IP: 192.168.1.2</text>
            <rect x="200" y="60" width="120" height="40" fill="#fff7e6" stroke="#faad14" rx="8" />
            <text x="260" y="85" textAnchor="middle" fontSize="14" fill="#faad14">NAT设备</text>
            <rect x="520" y="60" width="120" height="40" fill="#e3eafe" stroke="#386ff6" rx="8" />
            <text x="580" y="85" textAnchor="middle" fontSize="14" fill="#386ff6">公网主机</text>
            <text x="580" y="105" textAnchor="middle" fontSize="12" fill="#888">目的IP: 8.8.8.8</text>
            <line x1="150" y1="80" x2="200" y2="80" stroke="#faad14" strokeWidth="2" markerEnd="url(#arrow)" />
            <line x1="320" y1="80" x2="520" y2="80" stroke="#386ff6" strokeWidth="2" markerEnd="url(#arrow)" />
          </svg>
          <div style={{ color: '#888' }}>NAT设备将源IP/目的IP进行转换，实现私有网络与公网通信</div>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <div className="rounded-lg p-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-1">例题：</p>
          <p className="text-xs mb-1">内部主机192.168.1.2访问公网主机8.8.8.8，NAT设备如何处理IP地址？</p>
          <p className="text-xs" style={{ color: '#666' }}>解析：内部主机发出数据包，源IP为192.168.1.2，目的IP为8.8.8.8；NAT设备将源IP转换为公网IP（如203.0.113.5），转发到8.8.8.8；响应包返回时，NAT设备将目的IP转换回192.168.1.2。</p>
        </div>
        <TagGrid items={['NAT', 'SNAT', 'DNAT', 'IP映射', '私有IP', '公网IP']} />
      </div>
    ),
  },
  {
    label: 'IP欺骗与DDoS',
    left: (
      <div className="space-y-4">
        <PageTitle>IP欺骗与DDoS</PageTitle>
        <BookParagraph>IP欺骗和DDoS攻击是常见的网络攻击方式，均与IP地址密切相关。</BookParagraph>
        <BookList items={[
          'IP欺骗：攻击者伪造源IP，迷惑目标主机',
          'DDoS：大量主机向同一目的IP发起攻击，耗尽目标资源',
        ]} />
        <SectionTitle>攻击流程与IP关系</SectionTitle>
        <BookParagraph>攻击流程如下：</BookParagraph>
        <BookList items={[
          '攻击者伪造源IP或控制大量主机，向目标IP发送大量数据包',
          '数据包在网络中路由，最终到达目标主机（终点IP）',
          '目标主机资源耗尽，服务中断',
        ]} />
        <div style={{ textAlign: 'center', margin: '24px 0' }}>
          <svg width="700" height="180">
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L10,5 L0,10" fill="#ff4d4f" />
              </marker>
            </defs>
            <rect x="30" y="30" width="120" height="40" fill="#fff1f0" stroke="#ff4d4f" rx="8" />
            <text x="90" y="55" textAnchor="middle" fontSize="14" fill="#ff4d4f">攻击者群体</text>
            <text x="90" y="75" textAnchor="middle" fontSize="12" fill="#888">伪造/真实源IP</text>
            <ellipse cx="400" cy="80" rx="60" ry="30" fill="#f0f5ff" stroke="#386ff6" />
            <text x="400" y="85" textAnchor="middle" fontSize="14" fill="#386ff6">互联网</text>
            <rect x="520" y="60" width="120" height="40" fill="#e3eafe" stroke="#386ff6" rx="8" />
            <text x="580" y="85" textAnchor="middle" fontSize="14" fill="#386ff6">目标主机</text>
            <text x="580" y="105" textAnchor="middle" fontSize="12" fill="#888">目的IP: 203.0.113.10</text>
            <line x1="150" y1="50" x2="340" y2="80" stroke="#ff4d4f" strokeWidth="2" markerEnd="url(#arrow)" />
            <line x1="460" y1="80" x2="520" y2="80" stroke="#386ff6" strokeWidth="2" markerEnd="url(#arrow)" />
          </svg>
          <div style={{ color: '#888' }}>DDoS攻击：大量数据包最终到达目标主机（终点IP），导致服务瘫痪</div>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <div className="rounded-lg p-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-1">例题：</p>
          <p className="text-xs mb-1">DDoS攻击中，为什么目标主机的IP地址是攻击的关键？</p>
          <p className="text-xs" style={{ color: '#666' }}>解析：攻击者通过大量主机向同一目的IP发送数据包；数据包在网络中路由，最终都到达目标主机（终点IP）；目标主机因接收过多数据包，资源耗尽，服务中断。</p>
        </div>
        <TagGrid items={['IP欺骗', 'DDoS', '源IP伪造', '安全攻击', '防护']} />
      </div>
    ),
  },
]

export default function NetworkSecurityPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

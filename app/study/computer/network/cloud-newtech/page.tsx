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
  chapterTitle: '云网络与新技术',
  chapterNumber: 12,
  totalChapters: 17,
  subjectHref: '/study/computer/network',
  prevChapter: { label: '网络安全基础', href: '/study/computer/network/security' },
  nextChapter: { label: '网络抓包与协议分析', href: '/study/computer/network/sniff-analyze' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '云网络基本概念',
    left: (
      <div className="space-y-4">
        <PageTitle>云网络基本概念</PageTitle>
        <BookParagraph>云网络是指基于云计算平台构建的虚拟化网络环境，支持弹性资源分配、按需服务和多租户隔离。</BookParagraph>
        <BookList items={[
          '核心特征：虚拟化、弹性伸缩、集中管理、自动化运维',
          '典型结构：云数据中心、虚拟交换机、虚拟路由器、云主机',
        ]} />
        <SectionTitle>云网络结构图</SectionTitle>
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="700" height="180">
            <ellipse cx="350" cy="60" rx="80" ry="40" fill="#e3eafe" stroke="#386ff6" />
            <text x="350" y="65" textAnchor="middle" fontSize="16" fill="#386ff6">云平台</text>
            <rect x="120" y="120" width="120" height="40" fill="#fff7e6" stroke="#faad14" rx="8" />
            <text x="180" y="145" textAnchor="middle" fontSize="14" fill="#faad14">虚拟交换机</text>
            <rect x="460" y="120" width="120" height="40" fill="#fff7e6" stroke="#faad14" rx="8" />
            <text x="520" y="145" textAnchor="middle" fontSize="14" fill="#faad14">虚拟路由器</text>
            <rect x="60" y="160" width="60" height="30" fill="#e3eafe" stroke="#386ff6" rx="6" />
            <text x="90" y="180" textAnchor="middle" fontSize="12" fill="#386ff6">云主机A</text>
            <rect x="200" y="160" width="60" height="30" fill="#e3eafe" stroke="#386ff6" rx="6" />
            <text x="230" y="180" textAnchor="middle" fontSize="12" fill="#386ff6">云主机B</text>
            <rect x="500" y="160" width="60" height="30" fill="#e3eafe" stroke="#386ff6" rx="6" />
            <text x="530" y="180" textAnchor="middle" fontSize="12" fill="#386ff6">云主机C</text>
            <line x1="350" y1="100" x2="180" y2="120" stroke="#386ff6" strokeWidth="2" />
            <line x1="350" y1="100" x2="520" y2="120" stroke="#386ff6" strokeWidth="2" />
            <line x1="180" y1="160" x2="90" y2="160" stroke="#faad14" strokeWidth="2" />
            <line x1="180" y1="160" x2="230" y2="160" stroke="#faad14" strokeWidth="2" />
            <line x1="520" y1="160" x2="530" y2="160" stroke="#faad14" strokeWidth="2" />
          </svg>
          <div style={{ color: '#888' }}>云平台通过虚拟交换机、虚拟路由器连接多台云主机</div>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>云服务与新技术</SectionTitle>
        <BookParagraph>云服务分为IaaS、PaaS、SaaS三种主要类型，支撑多样化的业务需求。新兴技术如SDN（软件定义网络）、NFV（网络功能虚拟化）、云安全等推动云网络发展。</BookParagraph>
        <BookList items={[
          'IaaS：基础设施即服务，提供虚拟机、存储、网络等资源',
          'PaaS：平台即服务，提供开发、运行环境',
          'SaaS：软件即服务，直接提供应用软件',
          'SDN：通过集中控制器灵活管理网络流量',
          'NFV：将网络功能以软件方式运行在通用硬件上',
          '云安全：包括访问控制、加密、隔离等多种安全机制',
        ]} />
        <BookParagraph>SDN控制器可动态调整云网络流量，NFV实现弹性部署防火墙、负载均衡等功能，云安全保障多租户环境下的数据隔离与安全。</BookParagraph>
        <TagGrid items={['IaaS', 'PaaS', 'SaaS', 'SDN', 'NFV', '云安全']} />
      </div>
    ),
  },
  {
    label: 'IP寻址与通信流程',
    left: (
      <div className="space-y-4">
        <PageTitle>IP寻址与通信流程</PageTitle>
        <BookParagraph>云环境下每台云主机分配独立虚拟IP，支持弹性扩展。终端通信流程包括：</BookParagraph>
        <BookList items={[
          '云主机启动时由云平台分配虚拟IP',
          '虚拟交换机/路由器负责内部转发与隔离',
          '跨云通信通过公网IP或VPN等方式实现',
        ]} />
        <SectionTitle>通信流程图</SectionTitle>
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="700" height="120">
            <rect x="60" y="40" width="100" height="40" fill="#e3eafe" stroke="#386ff6" rx="8" />
            <text x="110" y="65" textAnchor="middle" fontSize="14" fill="#386ff6">云主机A</text>
            <rect x="300" y="40" width="100" height="40" fill="#fff7e6" stroke="#faad14" rx="8" />
            <text x="350" y="65" textAnchor="middle" fontSize="14" fill="#faad14">虚拟交换机</text>
            <rect x="540" y="40" width="100" height="40" fill="#e3eafe" stroke="#386ff6" rx="8" />
            <text x="590" y="65" textAnchor="middle" fontSize="14" fill="#386ff6">云主机B</text>
            <line x1="160" y1="60" x2="300" y2="60" stroke="#386ff6" strokeWidth="2" />
            <line x1="400" y1="60" x2="540" y2="60" stroke="#386ff6" strokeWidth="2" />
          </svg>
          <div style={{ color: '#888' }}>云主机间通过虚拟交换机通信，IP寻址由云平台统一管理</div>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>例题与思考题</SectionTitle>
        <div className="rounded-lg p-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-1">例题：</p>
          <p className="text-xs mb-1">某企业在云平台上部署多台云主机，如何实现主机间的安全隔离与高效通信？</p>
          <p className="text-xs" style={{ color: '#666' }}>解析：通过虚拟局域网（VLAN）、安全组等机制实现隔离；利用虚拟交换机/路由器进行高效转发；采用云安全策略（如访问控制、加密）保障通信安全。</p>
        </div>
        <SectionTitle>思考题</SectionTitle>
        <BookParagraph>1. SDN和传统网络管理方式有何本质区别？</BookParagraph>
        <BookParagraph>2. 云环境下IP地址的动态分配对网络管理有何影响？</BookParagraph>
        <TagGrid items={['虚拟化', '弹性IP', 'VPC', '安全组', '虚拟网络']} />
      </div>
    ),
  },
]

export default function NetworkCloudNewtechPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

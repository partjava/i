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
  chapterTitle: '网络配置与管理',
  chapterNumber: 14,
  totalChapters: 17,
  subjectHref: '/study/computer/network',
  prevChapter: { label: '网络抓包与协议分析', href: '/study/computer/network/sniff-analyze' },
  nextChapter: { label: '网络项目实战', href: '/study/computer/network/projects' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '网络设备配置基础',
    left: (
      <div className="space-y-4">
        <PageTitle>网络设备配置基础</PageTitle>
        <BookParagraph>网络配置是指对交换机、路由器等设备进行参数设置，实现网络的正常通信与安全隔离。</BookParagraph>
        <BookList items={[
          '交换机配置：VLAN划分、端口管理、生成树协议等',
          '路由器配置：静态路由、动态路由、NAT、ACL等',
          '常用命令：Cisco IOS、华为VRP等主流厂商命令',
        ]} />
        <SectionTitle>典型配置流程图</SectionTitle>
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="700" height="120">
            <rect x="60" y="40" width="100" height="40" fill="#e3eafe" stroke="#386ff6" rx="8" />
            <text x="110" y="65" textAnchor="middle" fontSize="14" fill="#386ff6">管理终端</text>
            <rect x="300" y="40" width="100" height="40" fill="#fff7e6" stroke="#faad14" rx="8" />
            <text x="350" y="65" textAnchor="middle" fontSize="14" fill="#faad14">网络设备</text>
            <rect x="540" y="40" width="100" height="40" fill="#e3eafe" stroke="#386ff6" rx="8" />
            <text x="590" y="65" textAnchor="middle" fontSize="14" fill="#386ff6">网络运行</text>
            <line x1="160" y1="60" x2="300" y2="60" stroke="#386ff6" strokeWidth="2" />
            <line x1="400" y1="60" x2="540" y2="60" stroke="#faad14" strokeWidth="2" />
          </svg>
          <div style={{ color: '#888' }}>通过管理终端配置网络设备，保障网络正常运行</div>
        </div>
        <SectionTitle>典型配置流程</SectionTitle>
        <BookList items={[
          '管理终端通过Console/SSH等方式登录网络设备',
          '进入特权模式，配置接口、VLAN、路由、ACL等参数',
          '保存配置，确保重启后生效',
          '测试网络连通性与安全性',
          '设备投入正式运行',
        ]} />
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="600" height="60">
            <rect x="10" y="20" width="90" height="32" fill="#e3eafe" stroke="#386ff6" rx="8" />
            <text x="55" y="40" textAnchor="middle" fontSize="14" fill="#386ff6">管理终端</text>
            <rect x="120" y="20" width="90" height="32" fill="#fff7e6" stroke="#faad14" rx="8" />
            <text x="165" y="40" textAnchor="middle" fontSize="14" fill="#faad14">登录设备</text>
            <rect x="230" y="20" width="110" height="32" fill="#e3eafe" stroke="#386ff6" rx="8" />
            <text x="285" y="40" textAnchor="middle" fontSize="14" fill="#386ff6">配置参数</text>
            <rect x="350" y="20" width="90" height="32" fill="#fff7e6" stroke="#faad14" rx="8" />
            <text x="395" y="40" textAnchor="middle" fontSize="14" fill="#faad14">保存配置</text>
            <rect x="460" y="20" width="110" height="32" fill="#e3eafe" stroke="#386ff6" rx="8" />
            <text x="515" y="40" textAnchor="middle" fontSize="14" fill="#386ff6">网络运行</text>
            <line x1="100" y1="36" x2="120" y2="36" stroke="#386ff6" strokeWidth="2" markerEnd="url(#arrow)" />
            <line x1="210" y1="36" x2="230" y2="36" stroke="#faad14" strokeWidth="2" markerEnd="url(#arrow)" />
            <line x1="340" y1="36" x2="350" y2="36" stroke="#386ff6" strokeWidth="2" markerEnd="url(#arrow)" />
            <line x1="440" y1="36" x2="460" y2="36" stroke="#faad14" strokeWidth="2" markerEnd="url(#arrow)" />
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L10,5 L0,10" fill="#faad14" />
              </marker>
            </defs>
          </svg>
          <div style={{ color: '#888' }}>管理终端→登录设备→配置参数→保存配置→网络运行</div>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>常见配置命令与管理方法</SectionTitle>
        <BookParagraph>网络设备配置常用命令包括接口配置、VLAN划分、路由设置、ACL访问控制等。</BookParagraph>
        <BookList items={[
          '接口配置：interface、ip address、shutdown/no shutdown',
          'VLAN配置：vlan、switchport access vlan',
          '路由配置：ip route、router ospf、network',
          'ACL配置：access-list、permit/deny等',
        ]} />
        <SectionTitle>配置管理方法</SectionTitle>
        <BookParagraph>通过命令行、Web界面或集中管理平台对设备进行批量配置和远程管理。</BookParagraph>
        <SectionTitle>配置管理应用</SectionTitle>
        <BookParagraph>配置管理在企业网络、数据中心、云环境等场景广泛应用，保障网络安全、稳定与高效。</BookParagraph>
        <BookList items={[
          '企业网络：VLAN隔离、ACL安全策略',
          '数据中心：大规模设备自动化配置',
          '云环境：弹性网络资源自动部署',
        ]} />
        <TagGrid items={['交换机', '路由器', 'VLAN', 'ACL', 'CLI']} />
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
          <p className="text-xs mb-1">如何通过ACL实现只允许特定IP访问某台服务器？</p>
          <p className="text-xs" style={{ color: '#666' }}>解析：编写ACL规则，permit指定IP，deny其他；将ACL应用到服务器接口的入方向；验证配置生效。</p>
        </div>
        <SectionTitle>思考题</SectionTitle>
        <BookParagraph>1. 为什么企业网络需要划分VLAN？</BookParagraph>
        <BookParagraph>2. 自动化配置管理对大规模网络有何意义？</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <TagGrid items={['ACL', 'VLAN', '自动化', 'CLI配置', '网络管理']} />
      </div>
    ),
  },
]

export default function NetworkConfigManagePage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

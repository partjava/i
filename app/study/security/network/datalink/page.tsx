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
  subject: '网络安全',
  chapterTitle: '数据链路层安全',
  chapterNumber: 5,
  totalChapters: 10,
  subjectHref: '/study/security/network',
  prevChapter: { label: '物理层安全', href: '/study/security/network/physical' },
  nextChapter: { label: '网络层安全', href: '/study/security/network/network' },
  theme: THEMES.security,
}

const SPREADS = [
  {
    label: '基础原理',
    left: (
      <div className="space-y-4">
        <PageTitle>数据链路层基础原理</PageTitle>
        <BookParagraph>数据链路层是OSI模型的第二层，主要负责在同一局域网内实现可靠的数据帧传输、差错检测与纠正、物理寻址等。常见设备有交换机、网桥等。</BookParagraph>
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="420" height="120" viewBox="0 0 420 120">
            <rect x="20" y="40" width="80" height="40" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" rx="8" />
            <text x="60" y="65" fontSize="14" fill="#0ea5e9" textAnchor="middle">主机A</text>
            <rect x="120" y="40" width="80" height="40" fill="#fef9c3" stroke="#facc15" strokeWidth="2" rx="8" />
            <text x="160" y="65" fontSize="14" fill="#eab308" textAnchor="middle">交换机</text>
            <rect x="220" y="40" width="80" height="40" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" rx="8" />
            <text x="260" y="65" fontSize="14" fill="#db2777" textAnchor="middle">主机B</text>
            <rect x="320" y="40" width="80" height="40" fill="#f1f5f9" stroke="#64748b" strokeWidth="2" rx="8" />
            <text x="360" y="65" fontSize="14" fill="#334155" textAnchor="middle">攻击者</text>
            <line x1="100" y1="60" x2="120" y2="60" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow5)" />
            <line x1="200" y1="60" x2="220" y2="60" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow5)" />
            <line x1="300" y1="60" x2="320" y2="60" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow5)" />
            <defs>
              <marker id="arrow5" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L8,4 L0,8" fill="#64748b" />
              </marker>
            </defs>
          </svg>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>重点术语解释</PageTitle>
        <BookList items={[
          'MAC地址：网卡的物理地址，全球唯一，数据链路层寻址的基础',
          'VLAN：虚拟局域网，用于逻辑隔离不同部门或业务的数据流',
          'ARP协议：地址解析协议，将IP地址解析为MAC地址，是局域网通信的关键',
          '帧：数据链路层的基本传输单元，包含源/目的MAC、数据、校验等',
        ]} />
        <BookAlert type="info" message="数据链路层是局域网安全的第一道防线。交换机端口安全、VLAN隔离、ARP防护是该层最核心的安全措施。" />
      </div>
    ),
  },
  {
    label: '常见威胁',
    left: (
      <div className="space-y-4">
        <PageTitle>数据链路层常见威胁</PageTitle>
        <BookList items={[
          'ARP欺骗：攻击者伪造ARP响应，劫持局域网内的数据流，实现中间人攻击',
          'MAC泛洪攻击：向交换机发送大量伪造MAC地址，导致交换机转发失效，数据被广播',
          'VLAN跳跃：攻击者利用配置漏洞跨越VLAN边界，访问本不应访问的网络',
          '端口镜像滥用：未授权人员利用端口镜像功能窃听网络流量',
          '交换机配置弱点：如未启用端口安全、未关闭未用端口等',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>常见安全问题</PageTitle>
        <BookAlert type="warning" message="常见问题：ARP表污染、VLAN配置混乱、端口安全策略缺失、交换机固件未及时更新等。这些问题通常可以通过合理配置交换机安全功能来解决。" />
        <TagGrid items={['ARP欺骗', 'MAC泛洪', 'VLAN跳跃', '端口镜像', '配置弱点']} />
      </div>
    ),
  },
  {
    label: '防护措施',
    left: (
      <div className="space-y-4">
        <PageTitle>数据链路层防护措施</PageTitle>
        <BookList items={[
          '启用端口安全：限制每个端口允许的MAC地址数量，防止MAC泛洪',
          '动态ARP检测：检测并阻断ARP欺骗行为',
          'VLAN隔离：合理划分VLAN，限制广播域，防止VLAN跳跃',
          '关闭未用端口：防止非法设备接入',
          '定期更新固件：修复交换机安全漏洞',
          '端口镜像权限管理：仅授权人员可配置端口镜像',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>交换机端口安全配置</PageTitle>
        <BookCode language="bash" code={`interface FastEthernet0/1
 switchport mode access
 switchport port-security
 switchport port-security maximum 2
 switchport port-security violation restrict
 switchport port-security mac-address sticky`} />
        <BookAlert type="info" message="以上是Cisco IOS交换机端口安全配置示例。限制每个端口最多学习2个MAC地址，违规时限制访问，并启用Sticky MAC自动学习。" />
      </div>
    ),
  },
  {
    label: '实际案例',
    left: (
      <div className="space-y-4">
        <PageTitle>数据链路层安全实际案例</PageTitle>
        <BookList items={[
          '案例1：某公司因未启用端口安全，攻击者通过MAC泛洪导致内网数据被广播，敏感信息泄露。启示：必须配置端口安全，限制MAC数量。',
          '案例2：某高校实验室遭遇ARP欺骗，学生间互相劫持流量，导致账号密码泄露。启示：应启用动态ARP检测，定期检查ARP表。',
          '案例3：某企业VLAN划分不合理，攻击者通过VLAN跳跃访问到财务系统。启示：VLAN划分需严格，敏感系统应物理隔离。',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>案例启示</PageTitle>
        <BookAlert type="warning" message="数据链路层安全是局域网安全的核心。与网络层安全不同，数据链路层攻击往往来自内部网络，因此「内部威胁」同样需要高度重视。合理的VLAN规划、端口安全配置和ARP防护是构建安全局域网的基础。" />
        <TagGrid items={['端口安全', 'ARP防护', 'VLAN隔离', '内部威胁', '交换机加固']} />
      </div>
    ),
  },
]

export default function DataLinkLayerSecurityPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

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
  chapterTitle: '网络设备安全',
  chapterNumber: 10,
  totalChapters: 10,
  subjectHref: '/study/security/network',
  prevChapter: { label: '网络协议分析', href: '/study/security/network/protocol' },
  nextChapter: { label: '访问控制', href: '/study/security/protection/access' },
  theme: THEMES.security,
}

const SPREADS = [
  {
    label: '基础原理',
    left: (
      <div className="space-y-4">
        <PageTitle>网络设备安全基础原理</PageTitle>
        <BookParagraph>网络设备是网络基础设施的核心组件，包括路由器、交换机、防火墙等。设备安全涉及物理安全、访问控制、配置管理、漏洞防护等多个方面。</BookParagraph>
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="520" height="120" viewBox="0 0 520 120">
            <rect x="20" y="40" width="80" height="40" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" rx="8" />
            <text x="60" y="65" fontSize="14" fill="#0ea5e9" textAnchor="middle">路由器</text>
            <rect x="120" y="40" width="80" height="40" fill="#fef9c3" stroke="#facc15" strokeWidth="2" rx="8" />
            <text x="160" y="65" fontSize="14" fill="#eab308" textAnchor="middle">交换机</text>
            <rect x="220" y="40" width="80" height="40" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" rx="8" />
            <text x="260" y="65" fontSize="14" fill="#db2777" textAnchor="middle">防火墙</text>
            <rect x="320" y="40" width="80" height="40" fill="#f1f5f9" stroke="#64748b" strokeWidth="2" rx="8" />
            <text x="360" y="65" fontSize="14" fill="#334155" textAnchor="middle">负载均衡</text>
            <rect x="420" y="40" width="80" height="40" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="8" />
            <text x="460" y="65" fontSize="14" fill="#ef4444" textAnchor="middle">入侵检测</text>
            <line x1="100" y1="60" x2="120" y2="60" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow10)" />
            <line x1="200" y1="60" x2="220" y2="60" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow10)" />
            <line x1="300" y1="60" x2="320" y2="60" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow10)" />
            <line x1="380" y1="60" x2="400" y2="60" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow10)" />
            <defs>
              <marker id="arrow10" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth">
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
          'ACL：访问控制列表，用于控制网络流量',
          'SNMP：简单网络管理协议，用于设备监控',
          'VLAN：虚拟局域网，实现网络隔离',
          'AAA：认证、授权、审计，设备访问控制',
          'NTP：网络时间协议，同步设备时间',
          'Syslog：系统日志，记录设备事件',
          'SSH：安全外壳协议，加密远程管理',
        ]} />
        <BookAlert type="info" message="网络设备是网络基础设施的基石。设备安全配置的疏忽可能导致整个网络被攻破。" />
      </div>
    ),
  },
  {
    label: '设备类型',
    left: (
      <div className="space-y-4">
        <PageTitle>网络设备类型与安全特性</PageTitle>
        <SectionTitle>路由器</SectionTitle>
        <BookList items={[
          '路由表安全：防止路由欺骗',
          '访问控制：ACL配置',
          '认证机制：AAA服务',
          '加密通信：IPSec VPN',
          '日志审计：Syslog配置',
        ]} />
        <SectionTitle>交换机</SectionTitle>
        <BookList items={[
          '端口安全：MAC地址绑定',
          'VLAN隔离：广播域控制',
          '生成树保护：STP安全',
          'DHCP防护：DHCP Snooping',
          'ARP防护：DAI配置',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>更多设备类型</PageTitle>
        <SectionTitle>防火墙</SectionTitle>
        <BookList items={[
          '访问控制：策略配置',
          'NAT转换：地址映射',
          'VPN接入：远程访问',
          '入侵检测：IPS功能',
          '应用控制：应用识别',
        ]} />
        <SectionTitle>负载均衡器</SectionTitle>
        <BookList items={[
          '会话保持：Cookie绑定',
          '健康检查：服务监控',
          'SSL卸载：证书管理',
          'DDoS防护：流量清洗',
          '访问控制：ACL配置',
        ]} />
      </div>
    ),
  },
  {
    label: '安全配置',
    left: (
      <div className="space-y-4">
        <PageTitle>基础安全配置</PageTitle>
        <SectionTitle>1. 访问控制配置</SectionTitle>
        <BookCode language="bash" code={`# 配置SSH访问
Router(config)# username admin privilege 15 secret Admin@123
Router(config)# ip ssh version 2
Router(config)# line vty 0 4
Router(config-line)# login local
Router(config-line)# transport input ssh`} />
        <SectionTitle>2. 日志配置</SectionTitle>
        <BookCode language="bash" code={`# 配置Syslog服务器
Router(config)# logging host 192.168.1.100
Router(config)# logging trap informational
Router(config)# logging facility local6
Router(config)# logging on`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>SNMP安全配置</PageTitle>
        <BookCode language="bash" code={`# 配置SNMPv3
Router(config)# snmp-server group AdminGroup v3 priv
Router(config)# snmp-server user Admin AdminGroup v3 auth sha AuthPass priv aes 128 PrivPass`} />
        <BookAlert type="info" message="使用SNMPv3而非SNMPv1/v2c，因为SNMPv3提供加密和认证功能。所有设备远程管理都应使用SSH而非Telnet。" />
      </div>
    ),
  },
  {
    label: '防护措施',
    left: (
      <div className="space-y-4">
        <PageTitle>网络设备防护措施</PageTitle>
        <SectionTitle>物理安全</SectionTitle>
        <BookList items={[
          '设备放置在安全机房',
          '门禁系统控制访问',
          '环境监控（温湿度）',
          'UPS电源保护',
          '设备标签管理',
        ]} />
        <SectionTitle>访问控制</SectionTitle>
        <BookList items={[
          '强密码策略',
          '多因素认证',
          '最小权限原则',
          '定期密码更换',
          '登录失败限制',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>配置管理与监控告警</PageTitle>
        <SectionTitle>配置管理</SectionTitle>
        <BookList items={[
          '配置备份',
          '变更管理',
          '版本控制',
          '配置审计',
          '定期巡检',
        ]} />
        <SectionTitle>监控告警</SectionTitle>
        <BookList items={[
          '性能监控',
          '安全告警',
          '日志分析',
          '异常检测',
          '事件响应',
        ]} />
      </div>
    ),
  },
  {
    label: '实际案例',
    left: (
      <div className="space-y-4">
        <PageTitle>网络设备安全实际案例</PageTitle>
        <SectionTitle>案例1：路由器配置泄露事件</SectionTitle>
        <BookParagraph>某企业路由器配置文件被泄露，导致网络拓扑和访问控制策略暴露。问题分析：配置文件未加密存储、未启用配置加密功能、备份文件权限设置不当。</BookParagraph>
        <BookCode language="bash" code={`# 启用配置加密
Router(config)# service password-encryption
Router(config)# enable secret YourStrongPassword
Router(config)# service encryption`} />
        <SectionTitle>案例2：VLAN跳跃攻击防护</SectionTitle>
        <BookParagraph>攻击者利用VLAN跳跃漏洞，跨VLAN访问敏感数据。</BookParagraph>
        <BookCode language="bash" code={`# 配置VLAN安全
Switch(config)# vtp mode transparent
Switch(config)# spanning-tree mode rapid-pvst
Switch(config)# spanning-tree vlan 1-4094 priority 24576`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>案例3与最佳实践</PageTitle>
        <SectionTitle>案例3：防火墙策略优化</SectionTitle>
        <BookParagraph>某企业防火墙策略过于宽松，导致内网服务器暴露。</BookParagraph>
        <BookCode language="bash" code={`# 配置严格访问控制
Firewall(config)# access-list 100 deny ip any any
Firewall(config)# access-list 100 permit tcp host 192.168.1.100 any eq 80
Firewall(config)# access-list 100 permit tcp host 192.168.1.100 any eq 443`} />
        <SectionTitle>网络设备安全最佳实践</SectionTitle>
        <BookList items={[
          '定期更新设备固件和补丁',
          '实施严格的访问控制策略',
          '启用日志审计和监控',
          '定期进行安全评估',
          '建立应急响应机制',
        ]} />
      </div>
    ),
  },
]

export default function NetworkDeviceSecurityPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

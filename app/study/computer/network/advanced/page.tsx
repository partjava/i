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
  chapterTitle: '网络进阶与拓展',
  chapterNumber: 17,
  totalChapters: 17,
  subjectHref: '/study/computer/network',
  prevChapter: { label: '面试题与答疑', href: '/study/computer/network/interview' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '常用网络技巧',
    left: (
      <div className="space-y-4">
        <PageTitle>常用网络技巧</PageTitle>
        <BookParagraph>本节介绍电脑常用的网络诊断、排障与优化技巧，涵盖抓包、端口测试、远程连接等实用操作。</BookParagraph>
        <BookList items={[
          '网络连通性测试与路由追踪',
          '端口与服务状态检测',
          '远程登录与文件传输',
          'DNS与ARP排障',
          '批量脚本与自动化运维',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>终端命令与用法</SectionTitle>
        <BookParagraph>下表汇总了常用网络命令的功能、用法与实用技巧，适用于Windows与Linux终端。</BookParagraph>
        <TagGrid items={['ping', 'tracert', 'netstat', 'telnet', 'ssh', 'curl', 'nmap']} />
      </div>
    ),
  },
  {
    label: '终端命令速查表',
    left: (
      <div className="space-y-4">
        <PageTitle>常用网络命令速查表</PageTitle>
        <div className="overflow-x-auto">
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#f0f5ff' }}>
                <th style={{ padding: '6px 8px', border: '1px solid #d9d9d9', whiteSpace: 'nowrap' }}>命令</th>
                <th style={{ padding: '6px 8px', border: '1px solid #d9d9d9' }}>功能说明</th>
                <th style={{ padding: '6px 8px', border: '1px solid #d9d9d9' }}>常用示例</th>
                <th style={{ padding: '6px 8px', border: '1px solid #d9d9d9' }}>实用技巧</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={{ padding: '6px 8px', border: '1px solid #d9d9d9', fontWeight: 600 }}>ping</td><td style={{ padding: '6px 8px', border: '1px solid #d9d9d9' }}>测试主机连通性</td><td style={{ padding: '6px 8px', border: '1px solid #d9d9d9' }}>ping www.baidu.com</td><td style={{ padding: '6px 8px', border: '1px solid #d9d9d9' }}>可加-t持续测试，-n指定次数</td></tr>
              <tr style={{ background: '#fafafa' }}><td style={{ padding: '6px 8px', border: '1px solid #d9d9d9', fontWeight: 600 }}>tracert/traceroute</td><td style={{ padding: '6px 8px', border: '1px solid #d9d9d9' }}>路由路径追踪</td><td style={{ padding: '6px 8px', border: '1px solid #d9d9d9' }}>tracert www.baidu.com</td><td style={{ padding: '6px 8px', border: '1px solid #d9d9d9' }}>Linux用traceroute</td></tr>
              <tr><td style={{ padding: '6px 8px', border: '1px solid #d9d9d9', fontWeight: 600 }}>ipconfig/ifconfig</td><td style={{ padding: '6px 8px', border: '1px solid #d9d9d9' }}>查看/配置IP地址</td><td style={{ padding: '6px 8px', border: '1px solid #d9d9d9' }}>ipconfig /all</td><td style={{ padding: '6px 8px', border: '1px solid #d9d9d9' }}>Linux用ifconfig或ip addr</td></tr>
              <tr style={{ background: '#fafafa' }}><td style={{ padding: '6px 8px', border: '1px solid #d9d9d9', fontWeight: 600 }}>netstat</td><td style={{ padding: '6px 8px', border: '1px solid #d9d9d9' }}>查看网络连接与端口</td><td style={{ padding: '6px 8px', border: '1px solid #d9d9d9' }}>netstat -an</td><td style={{ padding: '6px 8px', border: '1px solid #d9d9d9' }}>-a显示所有，-n数字显示，-o显示PID</td></tr>
              <tr><td style={{ padding: '6px 8px', border: '1px solid #d9d9d9', fontWeight: 600 }}>telnet</td><td style={{ padding: '6px 8px', border: '1px solid #d9d9d9' }}>测试端口连通性</td><td style={{ padding: '6px 8px', border: '1px solid #d9d9d9' }}>telnet 192.168.1.1 80</td><td style={{ padding: '6px 8px', border: '1px solid #d9d9d9' }}>如无telnet需先安装</td></tr>
              <tr style={{ background: '#fafafa' }}><td style={{ padding: '6px 8px', border: '1px solid #d9d9d9', fontWeight: 600 }}>ssh</td><td style={{ padding: '6px 8px', border: '1px solid #d9d9d9' }}>远程安全登录</td><td style={{ padding: '6px 8px', border: '1px solid #d9d9d9' }}>ssh user@192.168.1.10</td><td style={{ padding: '6px 8px', border: '1px solid #d9d9d9' }}>常用于Linux远程管理</td></tr>
              <tr><td style={{ padding: '6px 8px', border: '1px solid #d9d9d9', fontWeight: 600 }}>curl</td><td style={{ padding: '6px 8px', border: '1px solid #d9d9d9' }}>命令行HTTP请求</td><td style={{ padding: '6px 8px', border: '1px solid #d9d9d9' }}>curl https://www.baidu.com</td><td style={{ padding: '6px 8px', border: '1px solid #d9d9d9' }}>-I仅请求头，-d发送数据</td></tr>
              <tr style={{ background: '#fafafa' }}><td style={{ padding: '6px 8px', border: '1px solid #d9d9d9', fontWeight: 600 }}>arp</td><td style={{ padding: '6px 8px', border: '1px solid #d9d9d9' }}>查看/管理ARP缓存</td><td style={{ padding: '6px 8px', border: '1px solid #d9d9d9' }}>arp -a</td><td style={{ padding: '6px 8px', border: '1px solid #d9d9d9' }}>可用于排查IP-MAC映射</td></tr>
              <tr><td style={{ padding: '6px 8px', border: '1px solid #d9d9d9', fontWeight: 600 }}>route</td><td style={{ padding: '6px 8px', border: '1px solid #d9d9d9' }}>查看/管理路由表</td><td style={{ padding: '6px 8px', border: '1px solid #d9d9d9' }}>route print</td><td style={{ padding: '6px 8px', border: '1px solid #d9d9d9' }}>Linux用route -n或ip route</td></tr>
              <tr style={{ background: '#fafafa' }}><td style={{ padding: '6px 8px', border: '1px solid #d9d9d9', fontWeight: 600 }}>nslookup</td><td style={{ padding: '6px 8px', border: '1px solid #d9d9d9' }}>DNS解析测试</td><td style={{ padding: '6px 8px', border: '1px solid #d9d9d9' }}>nslookup www.baidu.com</td><td style={{ padding: '6px 8px', border: '1px solid #d9d9d9' }}>可指定DNS服务器</td></tr>
              <tr><td style={{ padding: '6px 8px', border: '1px solid #d9d9d9', fontWeight: 600 }}>nmap</td><td style={{ padding: '6px 8px', border: '1px solid #d9d9d9' }}>端口/主机扫描</td><td style={{ padding: '6px 8px', border: '1px solid #d9d9d9' }}>nmap -sS 192.168.1.1</td><td style={{ padding: '6px 8px', border: '1px solid #d9d9d9' }}>需单独安装，功能强大</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>故障排查与优化建议</SectionTitle>
        <BookParagraph>网络故障排查建议：</BookParagraph>
        <BookList items={[
          '先本地ping/ifconfig排查自身网络',
          'tracert/traceroute定位链路故障点',
          'netstat/arp/route分析端口与路由',
          'telnet/ssh/curl测试服务可达性',
          '结合抓包工具（如Wireshark）分析协议细节',
        ]} />
        <BookParagraph>优化建议：合理配置DNS、定期清理ARP缓存、关闭无用端口、使用自动化脚本批量管理。</BookParagraph>
        <TagGrid items={['排障', '运维', 'DNS', 'ARP', '自动化']} />
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
          <p className="text-xs mb-1">某主机无法访问外网，如何用终端命令快速定位问题？</p>
          <p className="text-xs" style={{ color: '#666' }}>解析：用ipconfig/ifconfig检查本地IP与网关；ping网关、8.8.8.8、域名，判断故障环节；tracert/traceroute追踪路由路径；nslookup测试DNS解析；netstat/arp/route排查端口与路由。</p>
        </div>
        <SectionTitle>思考题</SectionTitle>
        <BookParagraph>1. 如何用nmap快速发现局域网内存活主机？</BookParagraph>
        <BookParagraph>2. 批量脚本如何提升网络运维效率？</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <TagGrid items={['排障流程', 'ping', 'tracert', 'nslookup', 'netstat']} />
      </div>
    ),
  },
]

export default function NetworkAdvancedPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

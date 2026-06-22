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
  chapterTitle: '后渗透测试',
  chapterNumber: 5,
  totalChapters: 10,
  subjectHref: '/study/security/penetration',
  prevChapter: { label: '漏洞利用', href: '/study/security/penetration/exploit' },
  nextChapter: { label: 'Web应用测试', href: '/study/security/penetration/web' },
  theme: THEMES.security,
}

const SPREADS = [
  {
    label: '基础概念',
    left: (
      <div className="space-y-4">
        <PageTitle>后渗透测试基础概念</PageTitle>
        <BookParagraph>后渗透测试是指在成功获取目标系统初步访问权限后，进一步扩展控制范围、提升权限、收集敏感信息、建立持久化后门等一系列操作。其目的是最大化渗透测试的影响力，模拟真实攻击者的后续行为。</BookParagraph>
        <BookList items={[
          '横向移动：在内网中寻找并攻陷更多主机',
          '权限提升：利用系统漏洞获取更高权限',
          '凭证收集：获取账号密码、哈希、票据等敏感凭证',
          '数据提取：窃取敏感文件、数据库、邮件等信息',
          '持久化控制：植入后门，确保长期访问',
          '痕迹清理：清除日志，隐藏攻击行为',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>后渗透测试主要环节</PageTitle>
        <BookList items={[
          '横向移动：利用已控主机为跳板，攻击内网其他主机，实现权限扩散',
          '权限提升：利用本地提权漏洞、配置错误等手段获取管理员权限',
          '凭证收集：获取系统、数据库、域控等账号密码、哈希、票据',
          '数据提取：搜集并窃取敏感文件、数据库、邮件等核心数据',
          '持久化控制：部署后门、计划任务、注册表等方式维持长期访问',
          '痕迹清理：删除日志、清理命令历史、隐藏恶意文件',
        ]} />
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="860" height="380" viewBox="0 0 860 380">
            <defs>
              <radialGradient id="posCenter" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#f59e42" />
              </radialGradient>
              <linearGradient id="posNode" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
              <filter id="posShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#888" />
              </filter>
              <marker id="posArrow1" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1" />
              </marker>
              <marker id="posArrow2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#f59e42" />
              </marker>
            </defs>
            <circle cx="430" cy="190" r="45" fill="url(#posCenter)" filter="url(#posShadow)" />
            <rect x="410" y="175" width="40" height="25" rx="4" fill="#fff" opacity="0.7" />
            <rect x="418" y="188" width="24" height="8" rx="2" fill="#6366f1" />
            <text x="430" y="165" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">已控主机</text>
            <ellipse cx="180" cy="80" rx="60" ry="28" fill="url(#posNode)" filter="url(#posShadow)" />
            <text x="180" y="85" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">横向移动</text>
            <ellipse cx="680" cy="80" rx="60" ry="28" fill="url(#posNode)" filter="url(#posShadow)" />
            <text x="680" y="85" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">权限提升</text>
            <ellipse cx="180" cy="300" rx="60" ry="28" fill="url(#posNode)" filter="url(#posShadow)" />
            <text x="180" y="305" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">凭证收集</text>
            <ellipse cx="680" cy="300" rx="60" ry="28" fill="url(#posNode)" filter="url(#posShadow)" />
            <text x="680" y="305" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">数据提取</text>
            <ellipse cx="430" cy="350" rx="60" ry="28" fill="url(#posNode)" filter="url(#posShadow)" />
            <text x="430" y="355" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">持久化</text>
            <path d="M430,145 Q310,100 240,95" stroke="#6366f1" strokeWidth="3" markerEnd="url(#posArrow1)" fill="none" />
            <path d="M430,145 Q550,100 620,95" stroke="#6366f1" strokeWidth="3" markerEnd="url(#posArrow1)" fill="none" />
            <path d="M430,235 Q310,280 240,290" stroke="#6366f1" strokeWidth="3" markerEnd="url(#posArrow1)" fill="none" />
            <path d="M430,235 Q550,280 620,290" stroke="#6366f1" strokeWidth="3" markerEnd="url(#posArrow1)" fill="none" />
            <path d="M430,235 L430,325" stroke="#f59e42" strokeWidth="3" markerEnd="url(#posArrow2)" fill="none" />
          </svg>
        </div>
      </div>
    ),
  },
  {
    label: '常用技术',
    left: (
      <div className="space-y-4">
        <PageTitle>常用后渗透技术</PageTitle>
        <BookList items={[
          '横向移动：SMB Relay、Pass-the-Hash、RDP、WMI、PsExec、远程桌面等',
          '权限提升：本地提权漏洞（如CVE-2016-0099）、提权脚本、服务配置错误',
          '凭证收集：Mimikatz、lsass转储、浏览器密码、注册表、票据窃取',
          '数据提取：文件打包、数据库导出、邮件抓取、内网流量转发',
          '持久化控制：注册表启动项、计划任务、服务植入、WebShell、Rootkit',
          '痕迹清理：清除日志、删除命令历史、隐藏文件、时间戳伪造',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>工具与实践案例</PageTitle>
        <BookList items={[
          'Mimikatz：Windows凭证抓取与票据窃取利器',
          'PowerView：内网信息收集与域渗透工具',
          'Impacket：支持SMB、RDP、WMI等协议的横向移动工具集',
          'CrackMapExec：内网批量操作与横向移动自动化工具',
          'SharpHound/BloodHound：域控关系分析与权限路径可视化',
          'Rubeus：Kerberos票据操作与攻击工具',
          'Netcat/Socat：反弹Shell、端口转发、隧道搭建',
        ]} />
        <SectionTitle>实践案例</SectionTitle>
        <BookList items={[
          '利用Mimikatz抓取域控主机的明文密码和哈希，实现横向移动',
          '使用Impacket的smbexec/psexec模块批量控制内网主机',
          '通过BloodHound分析域权限关系，寻找最短提权路径',
          '利用计划任务和注册表实现持久化后门',
          '清理Windows日志和命令历史，规避检测',
        ]} />
      </div>
    ),
  },
]

export default function PenetrationPostPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

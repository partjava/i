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
  chapterTitle: '物理层安全',
  chapterNumber: 4,
  totalChapters: 10,
  subjectHref: '/study/security/network',
  prevChapter: { label: '安全模型与框架', href: '/study/security/network/framework' },
  nextChapter: { label: '数据链路层安全', href: '/study/security/network/datalink' },
  theme: THEMES.security,
}

const SPREADS = [
  {
    label: '基础原理',
    left: (
      <div className="space-y-4">
        <PageTitle>物理层安全基础原理</PageTitle>
        <BookParagraph>物理层是OSI模型的第一层，负责数据的物理传输，包括电缆、光纤、无线信号等。物理层安全关注硬件设备、传输介质和物理环境的保护，防止因物理破坏、窃听、非法接入等导致的信息泄露和服务中断。</BookParagraph>
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="380" height="120" viewBox="0 0 380 120">
            <rect x="20" y="40" width="80" height="40" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" rx="8" />
            <text x="60" y="65" fontSize="14" fill="#0ea5e9" textAnchor="middle">终端设备</text>
            <rect x="120" y="40" width="80" height="40" fill="#fef9c3" stroke="#facc15" strokeWidth="2" rx="8" />
            <text x="160" y="65" fontSize="14" fill="#eab308" textAnchor="middle">交换机/路由器</text>
            <rect x="220" y="40" width="80" height="40" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" rx="8" />
            <text x="260" y="65" fontSize="14" fill="#db2777" textAnchor="middle">传输介质</text>
            <rect x="320" y="40" width="40" height="40" fill="#f1f5f9" stroke="#64748b" strokeWidth="2" rx="8" />
            <text x="340" y="65" fontSize="14" fill="#334155" textAnchor="middle">外部</text>
            <line x1="100" y1="60" x2="120" y2="60" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow4)" />
            <line x1="200" y1="60" x2="220" y2="60" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow4)" />
            <line x1="300" y1="60" x2="320" y2="60" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow4)" />
            <defs>
              <marker id="arrow4" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L8,4 L0,8" fill="#64748b" />
              </marker>
            </defs>
          </svg>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>重点术语</PageTitle>
        <BookList items={[
          '物理介质：如双绞线、光纤、无线信号，是数据传输的载体',
          '物理隔离：通过断开网络或使用专用线路，防止外部非法访问',
          '入侵检测：通过物理传感器监控机房、机柜等关键区域',
          '环境安全：包括防火、防水、防尘、防静电等措施',
        ]} />
        <BookAlert type="info" message="物理层安全是所有安全的基础——如果物理访问得不到控制，其他所有安全措施都可能被绕过。" />
      </div>
    ),
  },
  {
    label: '常见威胁',
    left: (
      <div className="space-y-4">
        <PageTitle>物理层常见威胁</PageTitle>
        <BookList items={[
          '物理破坏：如火灾、水灾、地震、暴力破坏等导致设备损坏',
          '非法接入：攻击者通过插入网线、无线接入点等方式接入内部网络',
          '窃听与信号干扰：利用专用设备监听有线/无线信号，或通过电磁干扰破坏通信',
          '设备盗窃：服务器、交换机等关键设备被盗，导致数据泄露或业务中断',
          '环境威胁：如温湿度异常、静电、灰尘等影响设备正常运行',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>常见安全问题</PageTitle>
        <BookAlert type="warning" message="常见问题：机房门禁失效、监控盲区、未定期巡检、设备标签混乱等。这些问题看似简单，但往往是重大安全事件的根源。" />
        <TagGrid items={['物理破坏', '非法接入', '信号窃听', '设备盗窃', '环境威胁']} />
      </div>
    ),
  },
  {
    label: '防护措施',
    left: (
      <div className="space-y-4">
        <PageTitle>物理层防护措施</PageTitle>
        <BookList items={[
          '门禁与监控：部署门禁系统和视频监控，限制和记录人员进出',
          '设备加固：机柜加锁、设备加固螺丝，防止随意拆卸',
          '物理隔离：关键网络采用专线或断网，防止外部接入',
          '环境监控：实时监测温湿度、烟雾、漏水等，及时预警',
          '定期巡检：制定巡检计划，检查设备运行状态和安全隐患',
          '资产管理：设备编号、标签管理，防止设备丢失和误用',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>自动化巡检脚本</PageTitle>
        <BookCode language="python" code={`import os
import datetime

def check_device_status(device_list):
    for device in device_list:
        status = os.system(f'ping -n 1 {device}')
        print(f"{datetime.datetime.now()} {device} 状态: {'正常' if status == 0 else '异常'}")

devices = ['192.168.1.1', '192.168.1.2']
check_device_status(devices)`} />
      </div>
    ),
  },
  {
    label: '实际案例',
    left: (
      <div className="space-y-4">
        <PageTitle>物理层安全实际案例</PageTitle>
        <BookList items={[
          '案例1：某公司因机房门禁失效，外部人员进入机房拔掉核心交换机，导致全公司网络瘫痪。启示：门禁和监控必须定期检查，关键设备应加锁。',
          '案例2：某高校实验室因未加装烟雾报警器，火灾导致服务器损毁，重要科研数据丢失。启示：环境监控和数据备份同等重要。',
          '案例3：某企业无线网络被外部人员利用高增益天线窃听，敏感数据泄露。启示：无线信号应物理屏蔽，敏感数据需加密。',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>案例启示总结</PageTitle>
        <BookAlert type="warning" message="物理层安全是整个安全体系的基石。一个能够物理接触设备的攻击者，最终可以绕过绝大多数软件层面的安全防护。因此，门禁、监控、环境控制等物理安全措施必须得到足够重视。" />
        <TagGrid items={['门禁管理', '环境监控', '设备加固', '数据备份', '物理隔离']} />
      </div>
    ),
  },
]

export default function PhysicalLayerSecurityPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

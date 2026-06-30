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
  chapterTitle: '物理层与数据链路层',
  chapterNumber: 4,
  totalChapters: 17,
  subjectHref: '/study/computer/network',
  prevChapter: { label: 'OSI与TCPIP模型', href: '/study/computer/network/model' },
  nextChapter: { label: 'IP与路由', href: '/study/computer/network/ip-routing' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '物理层',
    left: (
      <div className="space-y-4">
        <PageTitle>物理层</PageTitle>
        <BookParagraph>
          物理层负责比特流的传输，是网络通信的基础。它定义了硬件设备的电气、机械、过程和功能特性。
        </BookParagraph>
        <BookList items={[
          '主要功能：实现0/1比特的透明传输',
          '常见设备：集线器、网线、光纤、调制解调器',
          '信号与编码：曼彻斯特编码、NRZ编码等',
          '传输介质：双绞线、同轴电缆、光纤、无线',
        ]} />
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="400" height="80">
            <rect x="30" y="30" width="60" height="30" fill="#e3eafe" stroke="#386ff6" rx="8" />
            <text x="60" y="50" textAnchor="middle" fontSize="14">主机A</text>
            <rect x="310" y="30" width="60" height="30" fill="#e3eafe" stroke="#386ff6" rx="8" />
            <text x="340" y="50" textAnchor="middle" fontSize="14">主机B</text>
            <rect x="110" y="40" width="180" height="10" fill="#386ff6" rx="5" />
            <text x="200" y="35" textAnchor="middle" fontSize="12" fill="#386ff6">物理介质</text>
          </svg>
          <div style={{ color: '#888' }}>物理层比特流传输示意图</div>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>物理层特性</PageTitle>
        <BookParagraph>
          物理层协议主要规定四个特性：
        </BookParagraph>
        <BookList items={[
          '机械特性：接口形状、引脚数量、尺寸等',
          '电气特性：电压范围、信号速率、传输距离',
          '功能特性：各引脚的功能定义',
          '过程特性：信号传输的时间顺序',
        ]} />
        <BookAlert type="info" message="物理层是网络通信的最底层，所有上层数据最终都要通过物理层传输。理解物理层特性有助于解决网络底层问题。" />
        <TagGrid items={['物理层', '比特流', '集线器', '调制解调器', '传输介质']} />
      </div>
    ),
  },
  {
    label: '数据链路层',
    left: (
      <div className="space-y-4">
        <PageTitle>数据链路层</PageTitle>
        <BookParagraph>
          数据链路层负责在物理层提供可靠的数据传输，主要实现成帧、差错检测、流量控制等功能。
        </BookParagraph>
        <BookList items={[
          '成帧：将比特流划分为帧，便于管理和差错检测',
          '差错检测：常用CRC校验、奇偶校验',
          '流量控制：防止发送方过快导致接收方缓冲区溢出',
          '常见协议：以太网、PPP、HDLC',
        ]} />
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="400" height="80">
            <rect x="30" y="40" width="60" height="20" fill="#e3eafe" stroke="#386ff6" rx="6" />
            <text x="60" y="55" textAnchor="middle" fontSize="12">帧头</text>
            <rect x="100" y="40" width="200" height="20" fill="#e3eafe" stroke="#386ff6" rx="6" />
            <text x="200" y="55" textAnchor="middle" fontSize="12">数据</text>
            <rect x="310" y="40" width="60" height="20" fill="#e3eafe" stroke="#386ff6" rx="6" />
            <text x="340" y="55" textAnchor="middle" fontSize="12">帧尾/校验</text>
          </svg>
          <div style={{ color: '#888' }}>数据链路层成帧与校验示意图</div>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>两者关系与应用</PageTitle>
        <BookParagraph>
          物理层与数据链路层紧密配合，共同实现数据的可靠传输。
        </BookParagraph>
        <BookList items={[
          '物理层提供原始比特流，数据链路层将其组织成帧',
          '数据链路层通过差错检测和流量控制提升传输可靠性',
          '实际网络中，二者常集成在网卡、交换机等设备中',
        ]} />
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="400" height="100">
            <rect x="40" y="30" width="320" height="20" fill="#e3eafe" stroke="#386ff6" rx="6" />
            <text x="200" y="45" textAnchor="middle" fontSize="13">物理层：比特流传输</text>
            <rect x="100" y="60" width="200" height="20" fill="#e3eafe" stroke="#386ff6" rx="6" />
            <text x="200" y="75" textAnchor="middle" fontSize="13">数据链路层：帧的传输与校验</text>
          </svg>
          <div style={{ color: '#888' }}>物理层与数据链路层协作示意图</div>
        </div>
        <BookAlert type="success" message="以太网（Ethernet）是最广泛使用的链路层协议，包含MAC寻址、CSMA/CD冲突检测、帧格式等核心机制。" />
        <TagGrid items={['数据链路层', '成帧', 'CRC', '以太网', 'MAC地址', '交换机']} />
      </div>
    ),
  },
]

export default function NetworkLinkPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

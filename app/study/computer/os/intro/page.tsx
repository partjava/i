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
  subject: '操作系统',
  chapterTitle: '操作系统概述',
  chapterNumber: 1,
  totalChapters: 10,
  subjectHref: '/study/computer/os',
  nextChapter: { label: '进程与线程管理', href: '/study/computer/os/process' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '什么是操作系统',
    left: (
      <div className="space-y-4">
        <PageTitle>什么是操作系统？</PageTitle>
        <BookParagraph>
          操作系统（Operating System, OS）是管理计算机硬件与软件资源、为应用程序提供运行环境的系统软件，是计算机系统的核心。
        </BookParagraph>
        <SectionTitle>核心作用</SectionTitle>
        <BookList items={[
          '资源管理：统一管理CPU、内存、I/O、文件等资源',
          '程序运行控制：进程/线程调度与切换',
          '用户接口：命令行/图形界面',
          '安全与保护：权限、隔离、加密等',
        ]} />
        <BookAlert type="info" message="操作系统是计算机系统中最基础的软件层，所有应用程序都运行在操作系统之上。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>操作系统结构图</PageTitle>
        <BookParagraph>操作系统位于硬件和应用程序之间，承担资源管理与协调的职责。</BookParagraph>
        <div style={{ overflowX: 'auto', margin: '16px 0' }}>
          <svg width="520" height="180" viewBox="0 0 520 180">
            {/* 用户层 */}
            <rect x="40" y="20" width="440" height="40" rx="10" fill="#e3f2fd" />
            <text x="260" y="45" textAnchor="middle" fontSize="16">用户/应用程序</text>
            {/* 系统调用箭头 */}
            <g stroke="#1976d2" strokeWidth="2" markerEnd="url(#arrow1)">
              <line x1="260" y1="60" x2="260" y2="80" />
            </g>
            {/* OS内核层 */}
            <rect x="100" y="80" width="320" height="40" rx="10" fill="#bbdefb" />
            <text x="260" y="105" textAnchor="middle" fontSize="14">操作系统内核（进程管理 | 内存管理 | 文件系统 | 设备管理 | 安全）</text>
            {/* 硬件层 */}
            <g stroke="#1976d2" strokeWidth="2" markerEnd="url(#arrow1)">
              <line x1="260" y1="120" x2="260" y2="140" />
            </g>
            <rect x="180" y="140" width="160" height="30" rx="8" fill="#c8e6c9" />
            <text x="260" y="160" textAnchor="middle" fontSize="15">硬件（CPU/内存/设备）</text>
            <defs>
              <marker id="arrow1" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L10,5 L0,10 Z" fill="#1976d2" />
              </marker>
            </defs>
          </svg>
        </div>
        <BookParagraph>
          操作系统向上为应用程序提供系统调用接口，向下直接管理硬件资源，是计算机系统的核心枢纽。
        </BookParagraph>
        <TagGrid items={['操作系统', '内核', '系统调用', '资源管理']} />
      </div>
    ),
  },
  {
    label: '发展历史',
    left: (
      <div className="space-y-4">
        <PageTitle>发展历史</PageTitle>
        <BookParagraph>
          操作系统的发展经历了从批处理到分时系统，从UNIX到现代操作系统的演进过程。
        </BookParagraph>
        <div style={{ overflowX: 'auto', margin: '16px 0' }}>
          <svg width="600" height="80" viewBox="0 0 600 80">
            <line x1="40" y1="40" x2="560" y2="40" stroke="#90caf9" strokeWidth="6" />
            {/* 节点 */}
            <g fontSize="13" fontFamily="monospace">
              <circle cx="60" cy="40" r="10" fill="#1976d2" />
              <text x="60" y="25" textAnchor="middle">1950s</text>
              <text x="60" y="65" textAnchor="middle">批处理</text>
              <circle cx="130" cy="40" r="10" fill="#1976d2" />
              <text x="130" y="25" textAnchor="middle">1960s</text>
              <text x="130" y="65" textAnchor="middle">分时</text>
              <circle cx="200" cy="40" r="10" fill="#1976d2" />
              <text x="200" y="25" textAnchor="middle">1970s</text>
              <text x="200" y="65" textAnchor="middle">UNIX</text>
              <circle cx="270" cy="40" r="10" fill="#1976d2" />
              <text x="270" y="25" textAnchor="middle">1980s</text>
              <text x="270" y="65" textAnchor="middle">微机OS</text>
              <circle cx="340" cy="40" r="10" fill="#1976d2" />
              <text x="340" y="25" textAnchor="middle">1990s</text>
              <text x="340" y="65" textAnchor="middle">Linux</text>
              <circle cx="410" cy="40" r="10" fill="#1976d2" />
              <text x="410" y="25" textAnchor="middle">2000s</text>
              <text x="410" y="65" textAnchor="middle">移动/嵌入式</text>
              <circle cx="480" cy="40" r="10" fill="#1976d2" />
              <text x="480" y="25" textAnchor="middle">2007</text>
              <text x="480" y="65" textAnchor="middle">ROS</text>
              <circle cx="550" cy="40" r="10" fill="#1976d2" />
              <text x="550" y="25" textAnchor="middle">未来</text>
              <text x="550" y="65" textAnchor="middle">云/智能</text>
            </g>
          </svg>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>关键里程碑</PageTitle>
        <BookParagraph>
          操作系统的发展与硬件技术进步紧密相关，每一代操作系统都充分利用了当时最新的硬件特性。
        </BookParagraph>
        <BookList items={[
          '1950s 批处理：作业批量输入，无交互能力',
          '1960s 分时系统：引入时间片轮转，支持多用户交互',
          '1970s UNIX：Ken Thompson和Dennis Ritchie在贝尔实验室开发',
          '1980s 微机OS：MS-DOS、Mac OS 等个人计算机操作系统兴起',
          '1990s Linux：Linus Torvalds发布Linux内核，开源运动兴起',
          '2000s 移动/嵌入式：Android、iOS 等移动操作系统崛起',
          '近年趋势：云计算、容器化、物联网操作系统快速发展',
        ]} />
        <BookAlert type="info" message="理解操作系统的发展脉络，有助于把握技术演进的方向和动力。" />
        <TagGrid items={['批处理', '分时系统', 'UNIX', 'Linux', '移动OS']} />
      </div>
    ),
  },
  {
    label: '常见类型',
    left: (
      <div className="space-y-4">
        <PageTitle>常见操作系统类型</PageTitle>
        <BookParagraph>
          现代操作系统种类繁多，各具特色，适用于不同的应用场景。
        </BookParagraph>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-lg p-4" style={{ border: '1px solid rgba(0,0,0,0.06)', background: 'rgba(0,0,0,0.02)' }}>
            <h4 className="font-semibold mb-1">Windows</h4>
            <p className="text-sm opacity-70">微软公司开发，桌面和企业市场占有率高，界面友好。</p>
          </div>
          <div className="rounded-lg p-4" style={{ border: '1px solid rgba(0,0,0,0.06)', background: 'rgba(0,0,0,0.02)' }}>
            <h4 className="font-semibold mb-1">Linux</h4>
            <p className="text-sm opacity-70">开源、稳定，广泛用于服务器、嵌入式和云计算。</p>
          </div>
          <div className="rounded-lg p-4" style={{ border: '1px solid rgba(0,0,0,0.06)', background: 'rgba(0,0,0,0.02)' }}>
            <h4 className="font-semibold mb-1">macOS</h4>
            <p className="text-sm opacity-70">苹果公司开发，基于UNIX，界面美观，安全性高。</p>
          </div>
          <div className="rounded-lg p-4" style={{ border: '1px solid rgba(0,0,0,0.06)', background: 'rgba(0,0,0,0.02)' }}>
            <h4 className="font-semibold mb-1">Android/iOS</h4>
            <p className="text-sm opacity-70">主流移动操作系统，分别由Google和Apple开发。</p>
          </div>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>更多操作系统</PageTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-lg p-4" style={{ border: '1px solid rgba(0,0,0,0.06)', background: 'rgba(0,0,0,0.02)' }}>
            <h4 className="font-semibold mb-1">UNIX</h4>
            <p className="text-sm opacity-70">历史悠久，影响深远，许多现代OS源自UNIX。</p>
          </div>
          <div className="rounded-lg p-4" style={{ border: '1px solid rgba(0,0,0,0.06)', background: 'rgba(0,0,0,0.02)' }}>
            <h4 className="font-semibold mb-1">嵌入式/实时OS</h4>
            <p className="text-sm opacity-70">如RTOS，专为嵌入式和实时应用设计。</p>
          </div>
          <div className="rounded-lg p-4" style={{ border: '1px solid rgba(0,0,0,0.06)', background: 'rgba(0,0,0,0.02)' }}>
            <h4 className="font-semibold mb-1">机器人操作系统ROS</h4>
            <p className="text-sm opacity-70">开源机器人软件平台，推动机器人智能发展。</p>
          </div>
        </div>
        <BookAlert type="success" message="选择操作系统需要根据应用场景：桌面首选Windows/macOS，服务器多用Linux，移动端为Android/iOS。" />
        <TagGrid items={['Windows', 'Linux', 'macOS', 'UNIX', 'RTOS', 'ROS']} />
      </div>
    ),
  },
  {
    label: '学习建议',
    left: (
      <div className="space-y-4">
        <PageTitle>学习建议</PageTitle>
        <BookParagraph>
          操作系统是计算机科学的基石，掌握它需要理论与实践的有机结合。
        </BookParagraph>
        <BookList items={[
          '理解操作系统的基本功能和作用',
          '关注主流操作系统的异同',
          '多做实验，结合实际理解原理',
          '阅读Linux内核源码加深理解',
          '动手配置和调试系统验证理论',
        ]} />
        <BookAlert type="info" message="学习操作系统需要耐心，建议结合 《Operating Systems: Three Easy Pieces》 等经典教材深入学习。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>核心知识点</PageTitle>
        <BookParagraph>
          操作系统课程的核心知识涵盖以下几个关键领域：
        </BookParagraph>
        <BookList items={[
          '进程管理：进程与线程的概念、调度算法、同步互斥',
          '内存管理：虚拟内存、分页、分段、页面置换',
          '文件系统：文件组织、目录结构、磁盘调度',
          'I/O管理：设备驱动程序、缓冲技术、SPOOLing',
          '安全与保护：访问控制、认证机制、加密技术',
        ]} />
        <TagGrid items={['学习建议', '核心知识', '进程管理', '内存管理', '文件系统']} />
      </div>
    ),
  },
]

export default function OsIntroPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

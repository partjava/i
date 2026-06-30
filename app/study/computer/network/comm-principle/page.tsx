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
  chapterTitle: '网络通信原理',
  chapterNumber: 2,
  totalChapters: 17,
  subjectHref: '/study/computer/network',
  prevChapter: { label: '网络基础与入门', href: '/study/computer/network/intro' },
  nextChapter: { label: 'OSI与TCPIP模型', href: '/study/computer/network/model' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '数据通信基础',
    left: (
      <div className="space-y-4">
        <PageTitle>数据通信基础</PageTitle>
        <BookParagraph>
          数据通信是指数据在两台或多台设备之间的传输过程，是计算机网络的核心功能之一。
        </BookParagraph>
        <SectionTitle>通信系统组成</SectionTitle>
        <BookList items={[
          '信源（发送方）：产生和发送数据',
          '信宿（接收方）：接收和处理数据',
          '信道（传输介质）：数据传输的通道',
          '信号：数据在信道中的表现形式',
          '噪声：干扰信号传输的因素',
        ]} />
        <SectionTitle>信号类型</SectionTitle>
        <BookList items={[
          '模拟信号：连续变化（如声音）',
          '数字信号：离散变化（如计算机数据）',
        ]} />
        <BookParagraph>信号特性：带宽、码元/比特、速率、信噪比。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>通信系统结构</PageTitle>
        <div style={{ textAlign: 'center', margin: '24px 0' }}>
          <svg width="400" height="80">
            <rect x="10" y="30" width="60" height="30" fill="#e3eafe" stroke="#386ff6" rx="8" />
            <text x="40" y="50" textAnchor="middle" fontSize="14">信源</text>
            <rect x="90" y="30" width="60" height="30" fill="#e3eafe" stroke="#386ff6" rx="8" />
            <text x="120" y="50" textAnchor="middle" fontSize="14">信道</text>
            <rect x="170" y="30" width="60" height="30" fill="#e3eafe" stroke="#386ff6" rx="8" />
            <text x="200" y="50" textAnchor="middle" fontSize="14">噪声</text>
            <rect x="250" y="30" width="60" height="30" fill="#e3eafe" stroke="#386ff6" rx="8" />
            <text x="280" y="50" textAnchor="middle" fontSize="14">信道</text>
            <rect x="330" y="30" width="60" height="30" fill="#e3eafe" stroke="#386ff6" rx="8" />
            <text x="360" y="50" textAnchor="middle" fontSize="14">信宿</text>
            <polygon points="70,45 90,45 90,50 70,50" fill="#386ff6" />
            <polygon points="150,45 170,45 170,50 150,50" fill="#386ff6" />
            <polygon points="230,45 250,45 250,50 230,50" fill="#386ff6" />
            <polygon points="310,45 330,45 330,50 310,50" fill="#386ff6" />
          </svg>
          <div style={{ color: '#888' }}>数据通信系统结构示意图</div>
        </div>
        <TagGrid items={['信源', '信宿', '信道', '信号', '噪声']} />
      </div>
    ),
  },
  {
    label: '传输介质',
    left: (
      <div className="space-y-4">
        <PageTitle>传输介质</PageTitle>
        <BookParagraph>
          传输介质分为有线和无线两大类，各有优缺点和典型应用。
        </BookParagraph>
        <SectionTitle>有线介质</SectionTitle>
        <BookList items={[
          '双绞线：常用于局域网，价格低，抗干扰一般',
          '同轴电缆：抗干扰强，常用于有线电视、早期以太网',
          '光纤：速率高，距离远，抗干扰强，适合骨干网',
        ]} />
        <SectionTitle>无线介质</SectionTitle>
        <BookList items={[
          '无线电波：Wi-Fi、蓝牙等',
          '微波：远距离点对点通信',
          '红外：短距离遥控',
          '卫星通信：全球覆盖，延迟高',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>通信方式与信号编码</PageTitle>
        <SectionTitle>通信方式</SectionTitle>
        <BookList items={[
          '单工通信：数据只能单向传输（如电视广播）',
          '半双工通信：可双向但不能同时（如对讲机）',
          '全双工通信：可双向同时传输（如电话）',
          '点对点通信：两台设备直接通信',
          '广播通信：一个发送方对多个接收方',
        ]} />
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="400" height="80">
            <circle cx="60" cy="40" r="20" fill="#e3eafe" stroke="#386ff6" />
            <text x="60" y="45" textAnchor="middle" fontSize="14">A</text>
            <circle cx="160" cy="40" r="20" fill="#e3eafe" stroke="#386ff6" />
            <text x="160" y="45" textAnchor="middle" fontSize="14">B</text>
            <polygon points="80,40 140,40 140,45 80,45" fill="#386ff6" />
            <polygon points="140,50 80,50 80,55 140,55" fill="#386ff6" opacity="0.5" />
            <text x="110" y="70" textAnchor="middle" fontSize="12" fill="#386ff6">全双工</text>
          </svg>
        </div>
        <TagGrid items={['双绞线', '光纤', '同轴电缆', '单工', '双工', '无线']} />
      </div>
    ),
  },
  {
    label: '编码与调制',
    left: (
      <div className="space-y-4">
        <PageTitle>信号编码与调制</PageTitle>
        <BookParagraph>
          信号编码与调制是数据传输的关键，决定了信号的可靠性和效率。
        </BookParagraph>
        <BookList items={[
          '数字信号编码：NRZ、RZ、曼彻斯特编码、差分曼彻斯特编码',
          '模拟信号调制：ASK、FSK、PSK、QAM',
          '采样定理：采样频率要大于信号最高频率的2倍',
          '香农定理：信道最大数据速率 = 带宽 × log₂(1+信噪比)',
        ]} />
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="400" height="60">
            <polyline points="10,30 50,30 50,10 90,10 90,30 130,30 130,10 170,10 170,30 210,30" fill="none" stroke="#386ff6" strokeWidth="3" />
            <line x1="10" y1="40" x2="210" y2="40" stroke="#aaa" strokeDasharray="4 2" />
            <text x="110" y="55" textAnchor="middle" fontSize="12" fill="#386ff6">曼彻斯特编码波形</text>
          </svg>
        </div>
        <SectionTitle>多路复用技术</SectionTitle>
        <BookList items={[
          '频分复用（FDM）：不同信号占用不同频率带宽',
          '时分复用（TDM）：不同信号在不同时间片上传输',
          '统计时分复用（STDM）：动态分配时间片',
          '波分复用（WDM）：光纤通信中用不同波长',
          '码分多址（CDMA）：每个信号用不同编码',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>差错控制</PageTitle>
        <BookParagraph>
          差错控制用于发现和纠正数据传输中的错误，保证通信可靠性。
        </BookParagraph>
        <BookList items={[
          '差错类型：单比特、多比特、突发误码',
          '检错技术：奇偶校验、CRC校验、校验和',
          '纠错技术：海明码、里德-所罗门码',
          '自动重传请求（ARQ）机制：发现错误自动重发',
        ]} />
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="320" height="60">
            <rect x="20" y="20" width="40" height="20" fill="#e3eafe" stroke="#386ff6" rx="6" />
            <text x="40" y="35" textAnchor="middle" fontSize="12">数据</text>
            <rect x="80" y="20" width="40" height="20" fill="#e3eafe" stroke="#386ff6" rx="6" />
            <text x="100" y="35" textAnchor="middle" fontSize="12">校验位</text>
            <polygon points="60,30 80,30 80,35 60,35" fill="#386ff6" />
            <rect x="140" y="20" width="60" height="20" fill="#e3eafe" stroke="#386ff6" rx="6" />
            <text x="170" y="35" textAnchor="middle" fontSize="12">发送帧</text>
          </svg>
        </div>
        <SectionTitle>数据交换技术</SectionTitle>
        <BookList items={[
          '电路交换：通信前建立专用通路，适合实时通信',
          '报文交换：整包转发，适合大数据量但延迟高',
          '分组交换：数据分成小包独立转发，互联网采用',
        ]} />
        <TagGrid items={['曼彻斯特编码', 'QAM', 'CRC', '海明码', 'ARQ', '分组交换']} />
      </div>
    ),
  },
  {
    label: '同步与流量控制',
    left: (
      <div className="space-y-4">
        <PageTitle>同步与异步通信</PageTitle>
        <BookParagraph>
          同步与异步通信方式决定了数据的传输节奏和同步机制。
        </BookParagraph>
        <BookList items={[
          '同步传输：数据流连续，需时钟同步，适合高速通信',
          '异步传输：数据以字符为单位，带起止位，适合低速通信',
          '位同步与帧同步：保证数据边界正确识别',
        ]} />
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="400" height="60">
            <rect x="20" y="20" width="80" height="20" fill="#e3eafe" stroke="#386ff6" rx="6" />
            <text x="60" y="35" textAnchor="middle" fontSize="12">同步传输</text>
            <rect x="120" y="20" width="80" height="20" fill="#e3eafe" stroke="#386ff6" rx="6" />
            <text x="160" y="35" textAnchor="middle" fontSize="12">异步传输</text>
            <polygon points="100,30 120,30 120,35 100,35" fill="#386ff6" />
          </svg>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>流量与拥塞控制</PageTitle>
        <BookParagraph>
          流量控制和拥塞控制用于保证网络高效、可靠地传输数据。
        </BookParagraph>
        <BookList items={[
          '流量控制：防止发送方过快导致接收方缓冲区溢出（如滑动窗口协议）',
          '拥塞控制：防止网络中数据过多导致性能下降（如TCP慢启动）',
        ]} />
        <BookAlert type="info" message="流量控制是端到端的控制，而拥塞控制是全局性的网络状态控制。TCP协议通过滑动窗口实现流量控制，通过拥塞窗口实现拥塞控制。" />
        <TagGrid items={['同步传输', '异步传输', '流量控制', '拥塞控制', '滑动窗口']} />
      </div>
    ),
  },
]

export default function NetworkCommPrinciplePage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

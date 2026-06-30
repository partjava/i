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
  chapterTitle: 'IP与路由',
  chapterNumber: 5,
  totalChapters: 17,
  subjectHref: '/study/computer/network',
  prevChapter: { label: '物理层与数据链路层', href: '/study/computer/network/link' },
  nextChapter: { label: 'TCP与UDP', href: '/study/computer/network/tcp-udp' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: 'IP地址基础',
    left: (
      <div className="space-y-4">
        <PageTitle>IP地址基础</PageTitle>
        <BookParagraph>IP地址用于唯一标识网络中的每一台主机。常见有IPv4和IPv6两种。</BookParagraph>
        <BookList items={[
          'IPv4地址：32位，点分十进制表示，如192.168.1.1',
          'IPv6地址：128位，冒号十六进制表示',
          'IP地址分类：A类、B类、C类、D类、E类',
          '子网掩码：区分网络号和主机号，如255.255.255.0',
          '私有地址与公网地址',
        ]} />
        <SectionTitle>解题方法详解</SectionTitle>
        <BookParagraph>IP地址计算题解题步骤：</BookParagraph>
        <BookList items={[
          '将IP地址和子网掩码转换为二进制',
          '进行「与」运算得到网络号',
          '主机号 = IP地址 - 网络号',
        ]} />
        <SectionTitle>常用掩码对应表</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2" style={{ borderColor: '#90caf9' }}>
                <th className="text-left p-1 font-semibold">掩码</th><th className="text-left p-1 font-semibold">位数</th><th className="text-left p-1 font-semibold">可用主机数</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b"><td className="p-1">255.255.255.0</td><td className="p-1">/24</td><td className="p-1">254</td></tr>
              <tr className="border-b"><td className="p-1">255.255.255.128</td><td className="p-1">/25</td><td className="p-1">126</td></tr>
              <tr><td className="p-1">255.255.255.192</td><td className="p-1">/26</td><td className="p-1">62</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>IP地址计算过程</PageTitle>
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="600" height="200">
            <rect x="30" y="20" width="540" height="30" fill="#e3eafe" stroke="#386ff6" rx="8" />
            <text x="300" y="40" textAnchor="middle" fontSize="14" fill="#386ff6">IP地址：192.168.10.5</text>
            <text x="30" y="15" fontSize="12" fill="#888">步骤1：原始IP地址</text>
            <rect x="30" y="60" width="540" height="30" fill="#e3eafe" stroke="#386ff6" rx="8" />
            <text x="300" y="80" textAnchor="middle" fontSize="14" fill="#386ff6">11000000.10101000.00001010.00000101</text>
            <text x="30" y="55" fontSize="12" fill="#888">步骤2：转换为二进制</text>
            <rect x="30" y="100" width="540" height="30" fill="#e3eafe" stroke="#386ff6" rx="8" />
            <text x="300" y="120" textAnchor="middle" fontSize="14" fill="#386ff6">11000000.10101000.00001010.00000000</text>
            <text x="30" y="95" fontSize="12" fill="#888">步骤3：与运算结果</text>
            <rect x="30" y="140" width="540" height="30" fill="#e3eafe" stroke="#386ff6" rx="8" />
            <text x="300" y="160" textAnchor="middle" fontSize="14" fill="#386ff6">网络号：192.168.10.0，主机号：0.0.0.5</text>
            <text x="30" y="135" fontSize="12" fill="#888">步骤4：最终结果</text>
          </svg>
        </div>
        <div className="rounded-lg p-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-1">例题：</p>
          <p className="text-sm mb-1">IP地址192.168.10.5，子网掩码255.255.255.0，求网络号和主机号？</p>
          <p className="text-xs" style={{ color: '#666' }}>解析：IP与掩码进行与运算。网络号=192.168.10.0，主机号=0.0.0.5</p>
        </div>
        <TagGrid items={['IPv4', 'IPv6', '子网掩码', 'CIDR', '网络号', '主机号']} />
      </div>
    ),
  },
  {
    label: '子网划分',
    left: (
      <div className="space-y-4">
        <PageTitle>子网划分与VLSM</PageTitle>
        <BookParagraph>子网划分用于提高IP地址利用率和网络管理灵活性。VLSM允许不同子网使用不同掩码。</BookParagraph>
        <BookList items={[
          '子网划分：将一个大网络分成多个小子网',
          'VLSM：根据实际需求灵活分配子网掩码',
          'CIDR表示法：如192.168.1.0/24',
        ]} />
        <SectionTitle>子网划分解题步骤</SectionTitle>
        <BookList items={[
          '确定需要划分的子网数量',
          '计算需要借用的主机位数：2^n ≥ 子网数',
          '新的子网掩码 = 原掩码 + 借用的位数',
          '计算每个子网的网络号',
        ]} />
        <SectionTitle>子网划分公式</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2" style={{ borderColor: '#90caf9' }}>
                <th className="text-left p-1 font-semibold">公式</th><th className="text-left p-1 font-semibold">说明</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b"><td className="p-1">2^n ≥ 子网数</td><td className="p-1">计算需要借用的位数</td></tr>
              <tr className="border-b"><td className="p-1">2^m - 2 ≥ 主机数</td><td className="p-1">计算每个子网的主机位数</td></tr>
              <tr><td className="p-1">256 - 2^n</td><td className="p-1">计算子网大小</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>子网划分过程</PageTitle>
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="600" height="200">
            <rect x="30" y="20" width="540" height="30" fill="#e3eafe" stroke="#386ff6" rx="8" />
            <text x="300" y="40" textAnchor="middle" fontSize="14" fill="#386ff6">原始网络：192.168.10.0/24</text>
            <text x="30" y="15" fontSize="12" fill="#888">步骤1：原始网络</text>
            <rect x="30" y="60" width="540" height="30" fill="#e3eafe" stroke="#386ff6" rx="8" />
            <text x="300" y="80" textAnchor="middle" fontSize="14" fill="#386ff6">需要4个子网，借用2位（2^2=4）</text>
            <text x="30" y="55" fontSize="12" fill="#888">步骤2：计算借用位数</text>
            <rect x="30" y="100" width="540" height="30" fill="#e3eafe" stroke="#386ff6" rx="8" />
            <text x="300" y="120" textAnchor="middle" fontSize="14" fill="#386ff6">新掩码：/26（255.255.255.192）</text>
            <text x="30" y="95" fontSize="12" fill="#888">步骤3：计算新掩码</text>
            <rect x="30" y="140" width="540" height="30" fill="#e3eafe" stroke="#386ff6" rx="8" />
            <text x="300" y="160" textAnchor="middle" fontSize="14" fill="#386ff6">子网1：192.168.10.0/26 ... 子网4：192.168.10.192/26</text>
            <text x="30" y="135" fontSize="12" fill="#888">步骤4：子网划分结果</text>
          </svg>
        </div>
        <div className="rounded-lg p-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-1">思考题：</p>
          <p className="text-xs mb-1">192.168.10.0/24划分4个相等大小子网，各子网网络号和掩码？</p>
          <p className="text-xs" style={{ color: '#666' }}>解析：4个子网需借2位，新掩码/26。子网：.0/26、.64/26、.128/26、.192/26</p>
        </div>
        <TagGrid items={['子网划分', 'VLSM', 'CIDR', '借位', '子网掩码']} />
      </div>
    ),
  },
  {
    label: '路由原理',
    left: (
      <div className="space-y-4">
        <PageTitle>路由原理与协议</PageTitle>
        <BookParagraph>路由是指数据包在网络中从源主机到目的主机的路径选择。</BookParagraph>
        <BookList items={[
          '静态路由：管理员手动配置，适合小型网络',
          '动态路由：路由器自动学习，适合大型网络',
          '常见动态路由协议：RIP、OSPF、BGP',
        ]} />
        <SectionTitle>路由协议比较</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2" style={{ borderColor: '#90caf9' }}>
                <th className="text-left p-1 font-semibold">协议</th><th className="text-left p-1 font-semibold">算法</th><th className="text-left p-1 font-semibold">适用网络</th><th className="text-left p-1 font-semibold">收敛速度</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b"><td className="p-1">RIP</td><td className="p-1">距离向量</td><td className="p-1">小型网络</td><td className="p-1">慢</td></tr>
              <tr className="border-b"><td className="p-1">OSPF</td><td className="p-1">链路状态</td><td className="p-1">大型网络</td><td className="p-1">快</td></tr>
              <tr><td className="p-1">BGP</td><td className="p-1">路径向量</td><td className="p-1">互联网</td><td className="p-1">较慢</td></tr>
            </tbody>
          </table>
        </div>
        <BookAlert type="info" message="路由协议面试高频题：RIP基于距离向量算法、OSPF基于链路状态算法、BGP是EGP（外部网关协议）用于AS之间。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>路由选择与最长前缀匹配</PageTitle>
        <BookParagraph>路由选择题解题步骤：</BookParagraph>
        <BookList items={[
          '将目的地址转换为二进制',
          '比较所有可能路由的掩码',
          '应用最长前缀匹配原则',
          '选择掩码最长的匹配路由',
        ]} />
        <SectionTitle>路由表查找规则</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2" style={{ borderColor: '#90caf9' }}>
                <th className="text-left p-1 font-semibold">规则</th><th className="text-left p-1 font-semibold">说明</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b"><td className="p-1">最长前缀匹配</td><td className="p-1">选择掩码最长的匹配项</td></tr>
              <tr className="border-b"><td className="p-1">默认路由</td><td className="p-1">0.0.0.0/0作为最后选择</td></tr>
              <tr><td className="p-1">直连路由</td><td className="p-1">优先于其他路由</td></tr>
            </tbody>
          </table>
        </div>
        <div className="rounded-lg p-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-1">例题：</p>
          <p className="text-xs mb-1">简述RIP和OSPF的主要区别。</p>
          <p className="text-xs" style={{ color: '#666' }}>算法不同（距离向量vs链路状态），适用场景不同（小型vs大型），收敛速度不同（慢vs快）。</p>
        </div>
        <TagGrid items={['RIP', 'OSPF', 'BGP', '静态路由', '动态路由', '最长前缀匹配']} />
      </div>
    ),
  },
]

export default function NetworkIpRoutingPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

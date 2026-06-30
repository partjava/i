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
  subject: '网络安全',
  chapterTitle: '网络基础架构',
  chapterNumber: 2,
  totalChapters: 10,
  subjectHref: '/study/security/network',
  prevChapter: { label: '网络安全概述', href: '/study/security/network/intro' },
  nextChapter: { label: '安全模型与框架', href: '/study/security/network/framework' },
  theme: THEMES.security,
}

const SPREADS = [
  {
    label: '网络架构',
    left: (
      <div className="space-y-4">
        <PageTitle>OSI七层模型</PageTitle>
        <BookParagraph>OSI（开放系统互连）模型将网络通信分为七个层次：</BookParagraph>
        <BookList items={[
          '应用层（第7层）：提供用户接口和网络服务，如HTTP、FTP、SMTP等',
          '表示层（第6层）：负责数据格式转换、加密解密等',
          '会话层（第5层）：建立、管理和终止会话',
          '传输层（第4层）：提供端到端的可靠传输，如TCP、UDP',
          '网络层（第3层）：负责路由选择和IP地址分配',
          '数据链路层（第2层）：提供物理寻址和错误检测',
          '物理层（第1层）：负责物理介质上的比特流传输',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>TCP/IP四层模型</PageTitle>
        <BookParagraph>TCP/IP模型是互联网实际使用的协议栈，分为四层：</BookParagraph>
        <BookList items={[
          '应用层：对应OSI的应用层、表示层和会话层，包括HTTP（80）、HTTPS（443）、FTP（21）、SMTP（25）、POP3（110）、DNS（53）等协议',
          '传输层：对应OSI的传输层，包括TCP（面向连接，可靠传输）和UDP（无连接，快速传输）',
          '网络层：对应OSI的网络层，包括IP（网络寻址）、ICMP（网络控制）、ARP（地址解析）',
          '网络接口层：对应OSI的数据链路层和物理层，包括以太网、Wi-Fi、PPP等',
        ]} />
        <BookAlert type="info" message="OSI是理论模型（7层），TCP/IP是实际协议栈（4层）。理解两者的对应关系是网络学习的基础。实际开发中主要关注TCP/IP模型。" />
      </div>
    ),
  },
  {
    label: '网络协议',
    left: (
      <div className="space-y-4">
        <PageTitle>应用层协议</PageTitle>
        <SectionTitle>HTTP/HTTPS</SectionTitle>
        <BookList items={[
          'HTTP：明文传输，端口80',
          'HTTPS：加密传输，端口443',
          '主要方法：GET、POST、PUT、DELETE等',
          '状态码：200（成功）、404（未找到）、500（服务器错误）等',
        ]} />
        <SectionTitle>FTP</SectionTitle>
        <BookList items={[
          '控制连接：端口21',
          '数据连接：端口20',
          '支持匿名和认证两种模式',
        ]} />
        <SectionTitle>SMTP/POP3/IMAP</SectionTitle>
        <BookList items={[
          'SMTP：发送邮件，端口25',
          'POP3：接收邮件，端口110',
          'IMAP：邮件管理，端口143',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>传输层协议</PageTitle>
        <SectionTitle>TCP（传输控制协议）</SectionTitle>
        <BookList items={[
          '面向连接',
          '可靠传输',
          '流量控制',
          '拥塞控制',
          '三次握手建立连接',
          '四次挥手断开连接',
        ]} />
        <SectionTitle>UDP（用户数据报协议）</SectionTitle>
        <BookList items={[
          '无连接',
          '不可靠传输',
          '无流量控制',
          '无拥塞控制',
          '适用于实时应用',
        ]} />
        <BookAlert type="info" message="TCP提供可靠传输但速度较慢，适合网页浏览、文件传输等；UDP提供快速传输但不可靠，适合视频直播、在线游戏等实时场景。" />
      </div>
    ),
  },
  {
    label: 'IP地址',
    left: (
      <div className="space-y-4">
        <PageTitle>IPv4地址</PageTitle>
        <SectionTitle>地址格式</SectionTitle>
        <BookList items={[
          '32位二进制数',
          '点分十进制表示（如：192.168.1.1）',
          '每个字节范围：0-255',
        ]} />
        <SectionTitle>地址分类</SectionTitle>
        <BookList items={[
          'A类：1.0.0.0 - 126.255.255.255',
          'B类：128.0.0.0 - 191.255.255.255',
          'C类：192.0.0.0 - 223.255.255.255',
          'D类：224.0.0.0 - 239.255.255.255（组播）',
          'E类：240.0.0.0 - 255.255.255.255（保留）',
        ]} />
        <SectionTitle>特殊地址</SectionTitle>
        <BookList items={[
          '127.0.0.1：本地回环地址',
          '0.0.0.0：默认路由',
          '255.255.255.255：广播地址',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>IPv6与子网划分</PageTitle>
        <SectionTitle>IPv6地址</SectionTitle>
        <BookParagraph>IPv6采用128位二进制数，使用冒号分隔的十六进制表示，例如：2001:0db8:85a3:0000:0000:8a2e:0370:7334。</BookParagraph>
        <BookList items={[
          '单播地址：一对一通信',
          '多播地址：一对多通信',
          '任播地址：一对最近通信',
        ]} />
        <SectionTitle>特殊IPv6地址</SectionTitle>
        <BookList items={[
          '::1：本地回环地址',
          '::：未指定地址',
          'fe80::/10：链路本地地址',
        ]} />
        <SectionTitle>子网划分</SectionTitle>
        <BookList items={[
          '子网掩码：用于划分网络和主机部分，例如255.255.255.0（/24）',
          '常用掩码：/8、/16、/24、/32',
          'CIDR表示法：例如192.168.1.0/24，表示前24位为网络部分',
        ]} />
        <BookAlert type="info" message="IPv4私有地址范围：10.0.0.0/8（10.0.0.0 - 10.255.255.255）、172.16.0.0/12（172.16.0.0 - 172.31.255.255）、192.168.0.0/16（192.168.0.0 - 192.168.255.255）。" />
      </div>
    ),
  },
  {
    label: '网络设备',
    left: (
      <div className="space-y-4">
        <PageTitle>物理层与数据链路层设备</PageTitle>
        <SectionTitle>1. 物理层设备</SectionTitle>
        <BookParagraph>网卡（NIC）：速率包括10Mbps、100Mbps、1Gbps、10Gbps，接口类型有RJ45、光纤、无线，拥有48位MAC地址唯一标识符。</BookParagraph>
        <BookParagraph>集线器（Hub）：工作在物理层，广播式传输，半双工通信。</BookParagraph>
        <SectionTitle>2. 数据链路层设备</SectionTitle>
        <BookParagraph>交换机（Switch）：工作在数据链路层，基于MAC地址转发，全双工通信，支持VLAN划分。</BookParagraph>
        <BookParagraph>网桥（Bridge）：连接不同网段，过滤和转发数据帧。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>网络层设备</PageTitle>
        <SectionTitle>3. 路由器（Router）</SectionTitle>
        <BookList items={[
          '工作在网络层',
          '基于IP地址转发',
          '支持路由协议',
          'NAT地址转换',
          'ACL访问控制',
        ]} />
        <SectionTitle>三层交换机</SectionTitle>
        <BookList items={[
          '结合交换机和路由器功能',
          '支持VLAN间路由',
          '高性能转发',
        ]} />
        <BookAlert type="info" message="不同网络层的设备工作在不同OSI层次：集线器（物理层）→ 交换机（数据链路层）→ 路由器（网络层）。层次越高，功能越强大，转发决策越智能。" />
      </div>
    ),
  },
]

export default function NetworkArchitecturePage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

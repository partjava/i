'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookList,
  TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '物联网',
  chapterTitle: '物联网基础',
  chapterNumber: 1,
  totalChapters: 8,
  subjectHref: '/study/computer/iot',
  nextChapter: { label: '通信技术', href: '/study/computer/iot/communication' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '基础概念',
    left: (
      <div className="space-y-4">
        <PageTitle>物联网基础概念</PageTitle>
        <SectionTitle>1. 物联网定义</SectionTitle>
        <BookParagraph>
          物联网（Internet of Things，IoT）是指通过信息传感设备，按约定的协议，将任何物体与网络相连接，物体通过信息传播媒介进行信息交换和通信，以实现智能化识别、定位、跟踪、监管等功能。
        </BookParagraph>
        <SectionTitle>2. 核心特征</SectionTitle>
        <BookList items={[
          '全面感知：利用传感器、RFID等技术获取物体信息',
          '可靠传输：通过各种网络传输数据',
          '智能处理：利用云计算、大数据等技术处理数据',
          '自动控制：根据处理结果进行智能决策和控制',
        ]} />
        <SectionTitle>3. 发展历程</SectionTitle>
        <BookList items={[
          '1999年：Kevin Ashton首次提出物联网概念',
          '2005年：国际电信联盟发布物联网报告',
          '2009年：IBM提出「智慧地球」概念',
          '2010年：中国将物联网列为战略性新兴产业',
          '至今：物联网技术快速发展，应用场景不断扩展',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>物联网技术架构</SectionTitle>
        <SectionTitle>1. 感知层</SectionTitle>
        <BookList items={['传感器技术', 'RFID技术', '二维码技术', '摄像头', '智能终端']} />
        <SectionTitle>2. 网络层</SectionTitle>
        <BookList items={['有线网络', '无线网络', '移动通信网络', '卫星通信', '互联网']} />
        <SectionTitle>3. 平台层</SectionTitle>
        <BookList items={['云计算平台', '大数据平台', '人工智能平台', '物联网平台', '边缘计算平台']} />
        <SectionTitle>4. 应用层</SectionTitle>
        <BookList items={['智能家居', '智慧城市', '工业物联网', '农业物联网', '车联网']} />
        <TagGrid items={['IoT', '感知层', '网络层', '平台层', '应用层']} />
      </div>
    ),
  },
  {
    label: '通信协议与传感器',
    left: (
      <div className="space-y-4">
        <PageTitle>物联网通信协议</PageTitle>
        <SectionTitle>1. 短距离通信协议</SectionTitle>
        <BookList items={['Bluetooth：低功耗蓝牙（BLE）', 'WiFi：IEEE 802.11', 'Zigbee：IEEE 802.15.4', 'Z-Wave：专有协议', 'NFC：近场通信']} />
        <SectionTitle>2. 长距离通信协议</SectionTitle>
        <BookList items={['LoRa：远距离低功耗', 'NB-IoT：窄带物联网', '4G/5G：移动通信', 'Sigfox：超窄带', 'LTE-M：低功耗广域网']} />
        <SectionTitle>3. 应用层协议</SectionTitle>
        <BookList items={['MQTT：消息队列遥测传输', 'CoAP：受限应用协议', 'HTTP/HTTPS：超文本传输协议', 'AMQP：高级消息队列协议', 'DDS：数据分发服务']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>传感器技术</SectionTitle>
        <BookList items={['温度传感器', '湿度传感器', '压力传感器', '光照传感器', '加速度传感器', '陀螺仪', '气体传感器', '声音传感器']} />
        <SectionTitle>传感器选型原则</SectionTitle>
        <BookList items={['测量范围', '精度要求', '响应时间', '工作环境', '功耗要求', '成本预算', '接口类型', '可靠性']} />
        <TagGrid items={['MQTT', 'CoAP', 'LoRa', 'NB-IoT', '传感器']} />
      </div>
    ),
  },
  {
    label: '数据处理与安全',
    left: (
      <div className="space-y-4">
        <PageTitle>数据处理</PageTitle>
        <SectionTitle>1. 数据采集</SectionTitle>
        <BookList items={['传感器数据采集', '数据预处理', '数据过滤', '数据压缩', '数据加密']} />
        <SectionTitle>2. 数据存储</SectionTitle>
        <BookList items={['时序数据库', '关系型数据库', 'NoSQL数据库', '分布式存储', '数据备份']} />
        <SectionTitle>3. 数据分析</SectionTitle>
        <BookList items={['实时分析', '离线分析', '机器学习', '预测分析', '异常检测']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>安全防护</SectionTitle>
        <BookParagraph>物联网安全涉及多个层面：</BookParagraph>
        <BookList items={['设备安全', '网络安全', '数据安全', '应用安全', '隐私保护']} />
        <SectionTitle>防护措施</SectionTitle>
        <BookList items={['身份认证', '访问控制', '数据加密', '安全传输', '安全审计', '漏洞管理']} />
        <TagGrid items={['数据采集', '时序数据库', '数据分析', '安全防护', '隐私']} />
      </div>
    ),
  },
  {
    label: '应用场景与练习',
    left: (
      <div className="space-y-4">
        <PageTitle>应用场景</PageTitle>
        <SectionTitle>1. 智能家居</SectionTitle>
        <BookList items={['智能照明', '智能安防', '智能家电', '环境监测', '能源管理']} />
        <SectionTitle>2. 智慧城市</SectionTitle>
        <BookList items={['智能交通', '环境监测', '公共安全', '城市管理', '公共服务']} />
        <SectionTitle>3. 工业物联网</SectionTitle>
        <BookList items={['设备监控', '生产管理', '质量控制', '能源管理', '预测维护']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>练习</SectionTitle>
        <BookParagraph>基础练习：</BookParagraph>
        <BookList items={['了解常见的物联网设备', '学习基本的通信协议', '掌握传感器使用方法', '搭建简单的物联网系统']} />
        <BookParagraph>进阶练习：</BookParagraph>
        <BookList items={['设计智能家居系统', '实现数据采集和分析', '开发物联网应用', '解决实际场景问题']} />
        <TagGrid items={['智能家居', '智慧城市', '工业物联网', '实践']} />
      </div>
    ),
  },
]

export default function IoTIntroPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

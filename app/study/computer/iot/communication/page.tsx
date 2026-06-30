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
  chapterTitle: '通信技术',
  chapterNumber: 2,
  totalChapters: 8,
  subjectHref: '/study/computer/iot',
  prevChapter: { label: '物联网基础', href: '/study/computer/iot/intro' },
  nextChapter: { label: '传感器技术', href: '/study/computer/iot/sensors' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '短距离通信',
    left: (
      <div className="space-y-4">
        <PageTitle>短距离通信技术</PageTitle>
        <BookParagraph>短距离通信技术适用于设备间近距离数据传输，具有低功耗、低成本的特点。</BookParagraph>
        <SectionTitle>1. 蓝牙（Bluetooth）</SectionTitle>
        <BookList items={[
          '工作频段：2.4GHz ISM频段',
          '传输距离：经典蓝牙10-100米，BLE约50米',
          '特点：低功耗设计，适合电池供电设备',
          '应用：智能家居、可穿戴设备、音频设备',
        ]} />
        <SectionTitle>2. Zigbee</SectionTitle>
        <BookList items={[
          '工作频段：2.4GHz（全球通用），868MHz（欧洲），915MHz（美国）',
          '传输距离：室内10-20米，室外可达100米',
          '特点：超低功耗，电池寿命可达数年，支持网状网络，自组网能力强',
          '应用：工业自动化、智能家居、农业物联网',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>3. WiFi</SectionTitle>
        <BookList items={[
          '工作频段：2.4GHz（覆盖广、穿透强），5GHz（速率高、干扰少）',
          '传输距离：室内50-100米',
          '特点：高速率，支持视频传输，高功耗需要持续供电',
          '应用：视频监控、智能家居、工业物联网',
        ]} />
        <TagGrid items={['蓝牙', 'Zigbee', 'WiFi', '短距离', '低功耗']} />
      </div>
    ),
  },
  {
    label: '长距离通信',
    left: (
      <div className="space-y-4">
        <PageTitle>长距离通信技术</PageTitle>
        <BookParagraph>长距离通信技术适用于广域覆盖场景，支持远距离数据传输。</BookParagraph>
        <SectionTitle>1. LoRa</SectionTitle>
        <BookList items={[
          '工作频段：433MHz（亚洲），868MHz（欧洲），915MHz（美洲）',
          '传输距离：城市2-5公里，郊区可达15公里',
          '特点：超低功耗，电池寿命可达10年，远距离传输，穿透性强',
          '应用：智慧城市、农业监测、资产追踪',
        ]} />
        <SectionTitle>2. NB-IoT</SectionTitle>
        <BookList items={[
          '工作频段：授权频段（运营商频段）',
          '传输距离：覆盖范围与4G基站相同',
          '特点：低功耗支持深度睡眠，广覆盖室内穿透性强，单基站支持10万设备',
          '应用：智能抄表、环境监测、智慧停车',
        ]} />
        <SectionTitle>3. 4G/5G</SectionTitle>
        <BookList items={[
          '工作频段：授权频段',
          '传输距离：覆盖广',
          '特点：高速率、低时延',
          '应用：视频监控、车联网',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>应用层协议</SectionTitle>
        <BookParagraph>应用层协议定义了物联网设备之间的通信规则和数据格式。</BookParagraph>
        <SectionTitle>1. MQTT</SectionTitle>
        <BookList items={[
          '特点：轻量级、发布/订阅模式',
          '适用场景：低带宽、不稳定网络',
          '优势：低功耗、小数据包',
        ]} />
        <SectionTitle>2. CoAP</SectionTitle>
        <BookList items={[
          '特点：RESTful风格、UDP基础',
          '适用场景：资源受限设备',
          '优势：低开销、简单实现',
        ]} />
        <SectionTitle>3. HTTP/HTTPS</SectionTitle>
        <BookList items={[
          '特点：通用、安全',
          '适用场景：需要安全传输',
          '优势：广泛支持、安全性高',
        ]} />
        <TagGrid items={['LoRa', 'NB-IoT', 'MQTT', 'CoAP', '4G/5G']} />
      </div>
    ),
  },
]

export default function IoTCommunicationPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

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
  chapterTitle: '项目实战',
  chapterNumber: 8,
  totalChapters: 8,
  subjectHref: '/study/computer/iot',
  prevChapter: { label: '开发平台', href: '/study/computer/iot/platforms' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '项目简介与类型',
    left: (
      <div className="space-y-4">
        <PageTitle>项目实战简介</PageTitle>
        <BookParagraph>物联网项目实战旨在通过真实案例，帮助学习者掌握物联网系统的完整开发流程和关键技术，提升实际动手能力。</BookParagraph>
        <BookParagraph>典型项目包括智能家居、环境监测、工业设备监控、智慧农业等，涵盖从设备接入、数据采集、通信、平台开发到应用实现的全流程。</BookParagraph>
        <SectionTitle>常见项目类型与案例</SectionTitle>
        <BookList items={[
          '智能家居系统：实现远程灯光、空调、安防等设备的智能控制',
          '环境监测平台：采集温湿度、空气质量等数据，支持实时预警和历史分析',
          '工业设备监控：对生产线设备进行状态监控、故障报警和能耗分析',
          '智慧农业：实现温室自动灌溉、环境调控和作物生长数据分析',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>项目开发流程与关键技术</SectionTitle>
        <BookParagraph>项目开发流程如下：</BookParagraph>
        <BookList items={[
          '需求分析：明确项目目标、功能需求和应用场景',
          '方案设计：选择合适的传感器、通信方式和平台架构，设计系统流程',
          '硬件开发与接入：设备选型、传感器接线、嵌入式开发（如 Arduino、ESP32 等）',
          '数据采集与通信：采集数据并通过 MQTT、HTTP、LoRa 等协议上传至平台',
          '平台开发：搭建数据接收、存储、分析和可视化的后端平台（如 Node.js、Python、云平台等）',
          '前端应用开发：实现数据展示、设备控制和用户交互（如 Web、App、小程序等）',
          '测试与部署：进行系统联调、功能测试和上线部署',
        ]} />
        <TagGrid items={['智能家居', '环境监测', '工业监控', '智慧农业', 'Arduino']} />
      </div>
    ),
  },
  {
    label: '技术要点与建议',
    left: (
      <div className="space-y-4">
        <PageTitle>关键技术要点</PageTitle>
        <BookList items={[
          '嵌入式开发与传感器数据采集',
          '无线通信与协议（如 MQTT、CoAP、LoRa 等）',
          '云平台/本地服务器的数据处理与存储',
          '数据可视化与前端开发',
          '系统安全与权限管理',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>实践建议与资源推荐</SectionTitle>
        <BookList items={[
          '从小型项目入手，逐步扩展功能，积累经验',
          '多参考开源项目和社区资源，提升开发效率',
          '注重代码规范和文档编写，便于后期维护',
          '关注物联网安全，做好数据加密和权限控制',
          '推荐平台：ThingsBoard、OneNet、阿里云IoT、腾讯云IoT等',
          '开源项目参考：ThingsBoard、ESPEasy',
        ]} />
        <TagGrid items={['ESP32', 'Arduino', 'MQTT', 'ThingsBoard', '云平台']} />
      </div>
    ),
  },
]

export default function IoTProjectsPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

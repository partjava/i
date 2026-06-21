'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookList,
  TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '物联网',
  chapterTitle: '应用场景',
  chapterNumber: 6,
  totalChapters: 8,
  subjectHref: '/study/computer/iot',
  prevChapter: { label: '安全防护', href: '/study/computer/iot/security' },
  nextChapter: { label: '开发平台', href: '/study/computer/iot/platforms' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '智能家居',
    left: (
      <div className="space-y-4">
        <PageTitle>智能家居</PageTitle>
        <SectionTitle>1. 场景概述</SectionTitle>
        <BookParagraph>智能家居是指通过物联网技术将家庭中的各种设备连接起来，实现智能化控制和管理。它能够提高生活便利性、安全性和舒适度，同时实现能源的智能管理。</BookParagraph>
        <BookParagraph>主要应用包括：智能照明、智能安防、智能家电、环境监测、能源管理等。通过手机APP或语音助手，用户可以随时随地控制家中的设备，实现远程监控和自动化控制。</BookParagraph>
        <SectionTitle>2. 技术特点</SectionTitle>
        <BookParagraph><strong>通信技术：</strong></BookParagraph>
        <BookList items={['WiFi：高速数据传输，适合视频监控等大流量应用', 'Zigbee：低功耗，适合传感器网络', '蓝牙：短距离通信，适合个人设备连接', 'Z-Wave：专为智能家居设计的无线协议']} />
        <BookParagraph><strong>控制方式：</strong></BookParagraph>
        <BookList items={['手机APP远程控制', '语音助手智能控制', '场景模式自动化控制', '传感器联动控制']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>3. 应用案例</SectionTitle>
        <div className="bg-white p-4 rounded-lg shadow mb-4">
          <h4 className="font-bold mb-2">智能照明系统</h4>
          <p className="mb-2">通过智能灯泡和传感器，实现：</p>
          <BookList items={['根据环境光线自动调节亮度', '定时开关和场景模式', '远程控制和语音控制', '能耗统计和节能建议']} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-bold mb-2">智能安防系统</h4>
          <p className="mb-2">集成多种安防设备，提供：</p>
          <BookList items={['门窗传感器实时监控', '智能摄像头远程查看', '烟雾和燃气报警', '紧急情况自动报警']} />
        </div>
        <TagGrid items={['智能家居', 'WiFi', 'Zigbee', '安防', '照明']} />
      </div>
    ),
  },
  {
    label: '工业物联网',
    left: (
      <div className="space-y-4">
        <PageTitle>工业物联网</PageTitle>
        <SectionTitle>1. 场景概述</SectionTitle>
        <BookParagraph>工业物联网（IIoT）是将物联网技术应用于工业生产领域，实现设备、系统、人员之间的互联互通。它能够提高生产效率、降低运营成本、优化资源配置，是工业4.0的核心技术。</BookParagraph>
        <BookParagraph>主要应用包括：设备监控、预测性维护、生产过程优化、能源管理、质量控制等。通过实时数据采集和分析，帮助企业实现智能化生产和精细化管理。</BookParagraph>
        <SectionTitle>2. 技术特点</SectionTitle>
        <BookParagraph><strong>通信技术：</strong></BookParagraph>
        <BookList items={['工业以太网：高速可靠，适合工厂内部网络', '5G：低延迟，适合移动设备连接', 'LoRa：长距离，适合广域覆盖', 'NB-IoT：低功耗，适合传感器网络']} />
        <BookParagraph><strong>数据处理：</strong></BookParagraph>
        <BookList items={['边缘计算：实时数据处理', '大数据分析：趋势预测', '人工智能：智能决策', '数字孪生：虚拟仿真']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>3. 应用案例</SectionTitle>
        <div className="bg-white p-4 rounded-lg shadow mb-4">
          <h4 className="font-bold mb-2">智能工厂</h4>
          <p className="mb-2">实现生产全流程智能化：</p>
          <BookList items={['设备状态实时监控', '生产过程自动优化', '产品质量在线检测', '能源消耗智能管理']} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-bold mb-2">预测性维护</h4>
          <p className="mb-2">基于数据分析的维护方案：</p>
          <BookList items={['设备故障预测', '维护计划优化', '备件库存管理', '维护成本降低']} />
        </div>
        <TagGrid items={['IIoT', '工业4.0', '边缘计算', '数字孪生', '5G']} />
      </div>
    ),
  },
  {
    label: '智慧城市',
    left: (
      <div className="space-y-4">
        <PageTitle>智慧城市</PageTitle>
        <SectionTitle>1. 场景概述</SectionTitle>
        <BookParagraph>智慧城市是利用物联网、大数据、人工智能等技术，实现城市基础设施的智能化管理和服务。它能够提高城市运行效率、改善居民生活质量、促进可持续发展。</BookParagraph>
        <BookParagraph>主要应用包括：智能交通、环境监测、公共安全、城市管理、便民服务等。通过数据共享和协同管理，打造更加宜居、便捷、安全的城市环境。</BookParagraph>
        <SectionTitle>2. 技术特点</SectionTitle>
        <BookParagraph><strong>感知层：</strong></BookParagraph>
        <BookList items={['视频监控：城市安全监控', '环境传感器：空气质量监测', '交通检测器：车流量统计', '智能终端：便民服务设备']} />
        <BookParagraph><strong>平台层：</strong></BookParagraph>
        <BookList items={['城市大脑：数据分析和决策', '云计算：资源调度和管理', '大数据：信息挖掘和应用', '人工智能：智能预测和优化']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>3. 应用案例</SectionTitle>
        <div className="bg-white p-4 rounded-lg shadow mb-4">
          <h4 className="font-bold mb-2">智能交通系统</h4>
          <p className="mb-2">实现交通智能化管理：</p>
          <BookList items={['交通信号智能控制', '停车位智能管理', '公交调度优化', '交通拥堵预测']} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-bold mb-2">环境监测系统</h4>
          <p className="mb-2">实时监测城市环境：</p>
          <BookList items={['空气质量监测', '噪声污染监控', '水质监测', '气象数据采集']} />
        </div>
        <TagGrid items={['智慧城市', '城市大脑', '智能交通', '环境监测', 'AI']} />
      </div>
    ),
  },
  {
    label: '智慧农业',
    left: (
      <div className="space-y-4">
        <PageTitle>智慧农业</PageTitle>
        <SectionTitle>1. 场景概述</SectionTitle>
        <BookParagraph>智慧农业是利用物联网、大数据、人工智能等技术，实现农业生产全过程的智能化管理。它能够提高农业生产效率、降低资源消耗、改善农产品质量，是现代农业发展的重要方向。</BookParagraph>
        <BookParagraph>主要应用包括：环境监测、精准灌溉、智能施肥、病虫害防治、农产品溯源等。通过数据分析和智能决策，实现农业生产的精细化管理。</BookParagraph>
        <SectionTitle>2. 技术特点</SectionTitle>
        <BookParagraph><strong>感知技术：</strong></BookParagraph>
        <BookList items={['土壤传感器：监测土壤温湿度', '气象站：采集环境数据', '图像识别：病虫害检测', 'RFID：农产品溯源']} />
        <BookParagraph><strong>控制技术：</strong></BookParagraph>
        <BookList items={['自动灌溉系统', '智能施肥设备', '环境调控系统', '无人机作业']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>3. 应用案例</SectionTitle>
        <div className="bg-white p-4 rounded-lg shadow mb-4">
          <h4 className="font-bold mb-2">智能温室</h4>
          <p className="mb-2">实现温室环境智能控制：</p>
          <BookList items={['温湿度自动调节', '光照强度控制', 'CO2浓度监测', '水肥一体化管理']} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-bold mb-2">精准农业</h4>
          <p className="mb-2">实现农业生产精准管理：</p>
          <BookList items={['土壤养分分析', '作物生长监测', '病虫害预警', '产量预测']} />
        </div>
        <TagGrid items={['智慧农业', '精准农业', '智能温室', '无人机', '溯源']} />
      </div>
    ),
  },
]

export default function IoTApplicationsPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

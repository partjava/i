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
  chapterTitle: '开发平台',
  chapterNumber: 7,
  totalChapters: 8,
  subjectHref: '/study/computer/iot',
  prevChapter: { label: '应用场景', href: '/study/computer/iot/applications' },
  nextChapter: { label: '项目实战', href: '/study/computer/iot/projects' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '平台介绍',
    left: (
      <div className="space-y-4">
        <PageTitle>平台架构</PageTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="text-lg font-semibold mb-2">感知层</h3>
            <BookList items={['支持多种传感器和设备的接入', '设备管理与远程监控', '实时数据采集与预处理']} />
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="text-lg font-semibold mb-2">网络层</h3>
            <BookList items={['多种通信协议支持（Wi-Fi、以太网、4G/5G、LoRa等）', '数据安全传输与加密', '网络状态监控与管理']} />
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="text-lg font-semibold mb-2">应用层</h3>
            <BookList items={['数据分析与可视化', '业务逻辑与自动化控制', '多终端应用接入']} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">易用性</h3>
            <BookList items={['可视化配置界面，操作简单', '丰富的开发文档和示例', '支持多种开发语言和平台']} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">可扩展性</h3>
            <BookList items={['模块化设计，便于功能扩展', '插件化架构，支持第三方集成', '灵活的API接口']} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-2">安全性</h3>
            <BookList items={['数据加密与安全传输', '多级权限与访问控制', '安全审计与日志管理']} />
          </div>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>功能特点</SectionTitle>
        <SectionTitle>核心功能</SectionTitle>
        <BookList items={['设备管理：设备注册、配置、监控、固件升级', '数据管理：数据采集、存储、分析、可视化', '规则引擎：事件触发、自动化处理', '告警管理：阈值设置、异常通知']} />
        <SectionTitle>扩展功能</SectionTitle>
        <BookList items={['应用开发支持：SDK、API、开发工具', '系统管理：用户、角色、权限分配', '运维管理：监控、日志、备份恢复', '数据分析：报表、统计、预测']} />
        <TagGrid items={['感知层', '网络层', '应用层', 'SDK', 'API']} />
      </div>
    ),
  },
  {
    label: '开发工具',
    left: (
      <div className="space-y-4">
        <PageTitle>开发工具概述</PageTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="text-lg font-semibold mb-2">SDK</h3>
            <BookList items={['设备端SDK：便于设备快速接入平台', '服务端SDK：支持数据处理与业务逻辑开发', '移动端SDK：实现移动应用与平台互通']} />
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="text-lg font-semibold mb-2">IDE</h3>
            <BookList items={['代码编辑器：支持多语言开发', '调试工具：便于问题定位与修复', '模拟器：测试设备与平台交互']} />
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="text-lg font-semibold mb-2">API</h3>
            <BookList items={['REST API：标准化接口，便于集成', 'WebSocket：实时数据通信', 'MQTT：轻量级物联网消息协议']} />
          </div>
        </div>
        <SectionTitle>开发流程</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4"><div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 font-bold">1</div><h3 className="font-semibold">需求分析</h3></div>
          <div className="text-center p-4"><div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 font-bold">2</div><h3 className="font-semibold">方案设计</h3></div>
          <div className="text-center p-4"><div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 font-bold">3</div><h3 className="font-semibold">开发实现</h3></div>
          <div className="text-center p-4"><div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 font-bold">4</div><h3 className="font-semibold">测试部署</h3></div>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>案例展示</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="text-lg font-semibold mb-2">智能家居案例</h3>
            <BookList items={['智能灯光控制：通过手机或语音实现远程开关和调节亮度', '环境监测系统：实时采集温湿度、空气质量等数据', '安防监控系统：远程视频监控与报警联动']} />
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="text-lg font-semibold mb-2">工业物联网案例</h3>
            <BookList items={['设备状态监控：实时采集设备运行数据，异常自动报警', '生产过程优化：数据驱动生产调度与能耗优化', '能源管理系统：集中监控与分析工厂能耗']} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">实施效果</h3>
            <BookList items={['系统稳定性提升，故障率降低', '运维效率提高，人工成本下降', '数据驱动决策，提升企业竞争力']} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">用户反馈</h3>
            <BookList items={['操作便捷，界面友好', '功能丰富，满足多样化需求', '服务响应及时，技术支持到位']} />
          </div>
        </div>
        <TagGrid items={['SDK', 'API', 'REST', 'WebSocket', 'MQTT']} />
      </div>
    ),
  },
]

export default function IoTPlatformsPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

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
  chapterTitle: '传感器技术',
  chapterNumber: 3,
  totalChapters: 8,
  subjectHref: '/study/computer/iot',
  prevChapter: { label: '通信技术', href: '/study/computer/iot/communication' },
  nextChapter: { label: '数据处理', href: '/study/computer/iot/data-processing' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '环境传感器',
    left: (
      <div className="space-y-4">
        <PageTitle>环境传感器</PageTitle>
        <SectionTitle>1. 温度传感器</SectionTitle>
        <BookParagraph><strong>工作原理：</strong></BookParagraph>
        <BookList items={['热敏电阻：电阻值随温度变化', '热电偶：利用热电效应', '数字温度传感器：集成ADC转换']} />
        <BookParagraph><strong>特点：</strong></BookParagraph>
        <BookList items={['测量范围：-55℃ ~ 125℃', '精度：±0.5℃', '响应时间：毫秒级']} />
        <BookParagraph><strong>应用场景：</strong></BookParagraph>
        <BookList items={['智能家居：室内温度监测', '工业控制：设备温度监控', '农业：温室环境控制']} />
        <SectionTitle>2. 湿度传感器</SectionTitle>
        <BookParagraph><strong>工作原理：</strong></BookParagraph>
        <BookList items={['电容式：介电常数随湿度变化', '电阻式：电阻值随湿度变化', '光学式：利用湿度对光的影响']} />
        <BookParagraph><strong>特点：</strong></BookParagraph>
        <BookList items={['测量范围：0-100%RH', '精度：±2%RH', '响应时间：秒级']} />
        <BookParagraph><strong>应用场景：</strong></BookParagraph>
        <BookList items={['气象监测：环境湿度测量', '仓储管理：货物存储环境监控', '农业：土壤湿度监测']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>3. 气体传感器</SectionTitle>
        <BookParagraph><strong>工作原理：</strong></BookParagraph>
        <BookList items={['电化学式：气体与电极反应', '半导体式：气体吸附改变电阻', '红外式：气体吸收特定波长']} />
        <BookParagraph><strong>特点：</strong></BookParagraph>
        <BookList items={['检测范围：ppm级', '选择性：针对特定气体', '寿命：1-3年']} />
        <BookParagraph><strong>应用场景：</strong></BookParagraph>
        <BookList items={['环境监测：空气质量检测', '工业安全：有害气体报警', '智能家居：厨房燃气监测']} />
        <TagGrid items={['温度传感器', '湿度传感器', '气体传感器', '环境监测']} />
      </div>
    ),
  },
  {
    label: '运动传感器',
    left: (
      <div className="space-y-4">
        <PageTitle>运动传感器</PageTitle>
        <SectionTitle>1. 加速度传感器</SectionTitle>
        <BookParagraph><strong>工作原理：</strong></BookParagraph>
        <BookList items={['MEMS技术：微机械结构', '压电效应：受力产生电荷', '电容式：位移改变电容']} />
        <BookParagraph><strong>特点：</strong></BookParagraph>
        <BookList items={['测量范围：±2g ~ ±16g', '精度：±0.1g', '采样率：可达1kHz']} />
        <BookParagraph><strong>应用场景：</strong></BookParagraph>
        <BookList items={['可穿戴设备：运动监测', '汽车电子：碰撞检测', '工业设备：振动分析']} />
        <SectionTitle>2. 陀螺仪</SectionTitle>
        <BookParagraph><strong>工作原理：</strong></BookParagraph>
        <BookList items={['MEMS技术：科里奥利力', '光学式：Sagnac效应', '机械式：角动量守恒']} />
        <BookParagraph><strong>特点：</strong></BookParagraph>
        <BookList items={['测量范围：±2000°/s', '精度：±0.1°/s', '零偏稳定性：&lt;0.1°/s']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookParagraph><strong>应用场景：</strong></BookParagraph>
        <BookList items={['无人机：姿态控制', 'VR/AR：头部追踪', '导航系统：方向感知']} />
        <SectionTitle>3. 磁力计</SectionTitle>
        <BookParagraph><strong>工作原理：</strong></BookParagraph>
        <BookList items={['霍尔效应：磁场影响电流', '磁阻效应：磁场改变电阻', '磁通门：磁场感应']} />
        <BookParagraph><strong>特点：</strong></BookParagraph>
        <BookList items={['测量范围：±8高斯', '精度：±0.1高斯', '分辨率：0.1毫高斯']} />
        <BookParagraph><strong>应用场景：</strong></BookParagraph>
        <BookList items={['电子罗盘：方向指示', '位置检测：接近开关', '电流检测：非接触测量']} />
        <TagGrid items={['加速度计', '陀螺仪', '磁力计', 'MEMS', '运动追踪']} />
      </div>
    ),
  },
  {
    label: '生物传感器',
    left: (
      <div className="space-y-4">
        <PageTitle>生物传感器</PageTitle>
        <SectionTitle>1. 心率传感器</SectionTitle>
        <BookParagraph><strong>工作原理：</strong></BookParagraph>
        <BookList items={['光电式：血液流动吸收光', 'ECG：心电信号检测', 'PPG：光电容积脉搏波']} />
        <BookParagraph><strong>特点：</strong></BookParagraph>
        <BookList items={['测量范围：30-250BPM', '精度：±1BPM', '采样率：100Hz']} />
        <BookParagraph><strong>应用场景：</strong></BookParagraph>
        <BookList items={['可穿戴设备：健康监测', '医疗设备：患者监护', '运动设备：训练指导']} />
        <SectionTitle>2. 血氧传感器</SectionTitle>
        <BookParagraph><strong>工作原理：</strong></BookParagraph>
        <BookList items={['双波长法：红光和红外光', '反射式：皮肤表面测量', '透射式：组织穿透测量']} />
        <BookParagraph><strong>特点：</strong></BookParagraph>
        <BookList items={['测量范围：70-100%', '精度：±2%', '响应时间：&lt;10秒']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookParagraph><strong>应用场景：</strong></BookParagraph>
        <BookList items={['医疗监护：重症监测', '运动健康：高原训练', '睡眠监测：呼吸暂停检测']} />
        <SectionTitle>3. 生物电传感器</SectionTitle>
        <BookParagraph><strong>工作原理：</strong></BookParagraph>
        <BookList items={['电极检测：生物电信号', '阻抗测量：组织特性', '电位测量：神经信号']} />
        <BookParagraph><strong>特点：</strong></BookParagraph>
        <BookList items={['信号范围：μV级', '带宽：0.5-100Hz', '共模抑制比：&gt;80dB']} />
        <BookParagraph><strong>应用场景：</strong></BookParagraph>
        <BookList items={['脑电图：脑电信号检测', '肌电图：肌肉活动监测', '心电监护：心脏功能评估']} />
        <TagGrid items={['心率', '血氧', '生物电', '可穿戴', '健康监测']} />
      </div>
    ),
  },
]

export default function IoTSensorsPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

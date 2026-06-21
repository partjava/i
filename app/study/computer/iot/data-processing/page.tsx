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
  chapterTitle: '数据处理',
  chapterNumber: 4,
  totalChapters: 8,
  subjectHref: '/study/computer/iot',
  prevChapter: { label: '传感器技术', href: '/study/computer/iot/sensors' },
  nextChapter: { label: '安全防护', href: '/study/computer/iot/security' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '数据采集与预处理',
    left: (
      <div className="space-y-4">
        <PageTitle>数据采集</PageTitle>
        <SectionTitle>1. 传感器数据采集</SectionTitle>
        <BookParagraph><strong>采集方式：</strong></BookParagraph>
        <BookList items={['定时采集：固定时间间隔', '触发采集：事件触发', '连续采集：实时数据流']} />
        <BookParagraph><strong>数据格式：</strong></BookParagraph>
        <BookList items={['JSON：轻量级数据交换', 'CSV：表格数据存储', '二进制：高效传输']} />
        <BookParagraph><strong>采集协议：</strong></BookParagraph>
        <BookList items={['MQTT：轻量级消息传输', 'CoAP：资源受限设备', 'HTTP/HTTPS：通用协议']} />
        <SectionTitle>2. 数据预处理</SectionTitle>
        <BookParagraph><strong>数据清洗：</strong></BookParagraph>
        <BookList items={['异常值处理：去除噪声', '缺失值处理：插值填充', '数据标准化：统一量纲']} />
        <BookParagraph><strong>数据转换：</strong></BookParagraph>
        <BookList items={['数据格式转换', '数据编码转换', '数据压缩']} />
        <BookParagraph><strong>数据验证：</strong></BookParagraph>
        <BookList items={['数据完整性检查', '数据一致性验证', '数据有效性检验']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>3. 边缘计算</SectionTitle>
        <BookParagraph><strong>边缘节点：</strong></BookParagraph>
        <BookList items={['网关设备：数据汇聚', '边缘服务器：本地处理', '智能终端：设备端计算']} />
        <BookParagraph><strong>处理方式：</strong></BookParagraph>
        <BookList items={['数据过滤：去除冗余', '数据聚合：统计汇总', '实时分析：快速响应']} />
        <BookParagraph><strong>优势：</strong></BookParagraph>
        <BookList items={['降低网络负载', '减少响应延迟', '提高数据安全性']} />
        <TagGrid items={['数据采集', '预处理', '边缘计算', 'MQTT', 'JSON']} />
      </div>
    ),
  },
  {
    label: '数据存储',
    left: (
      <div className="space-y-4">
        <PageTitle>数据存储</PageTitle>
        <SectionTitle>1. 数据库选择</SectionTitle>
        <BookParagraph><strong>关系型数据库：</strong></BookParagraph>
        <BookList items={['MySQL：通用数据库', 'PostgreSQL：高级特性', 'SQLite：嵌入式数据库']} />
        <BookParagraph><strong>时序数据库：</strong></BookParagraph>
        <BookList items={['InfluxDB：高性能时序', 'TimescaleDB：时序扩展', 'Prometheus：监控数据']} />
        <BookParagraph><strong>NoSQL数据库：</strong></BookParagraph>
        <BookList items={['MongoDB：文档存储', 'Redis：内存数据库', 'Cassandra：分布式存储']} />
        <SectionTitle>2. 数据存储策略</SectionTitle>
        <BookParagraph><strong>存储方式：</strong></BookParagraph>
        <BookList items={['本地存储：设备端数据', '云端存储：集中管理', '混合存储：分级存储']} />
        <BookParagraph><strong>数据备份：</strong></BookParagraph>
        <BookList items={['定时备份：定期保存', '增量备份：变化数据', '异地备份：容灾恢复']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookParagraph><strong>数据归档：</strong></BookParagraph>
        <BookList items={['冷热数据分离', '历史数据压缩', '数据生命周期管理']} />
        <SectionTitle>3. 数据安全</SectionTitle>
        <BookParagraph><strong>访问控制：</strong></BookParagraph>
        <BookList items={['身份认证：用户验证', '权限管理：访问控制', '审计日志：操作记录']} />
        <BookParagraph><strong>数据加密：</strong></BookParagraph>
        <BookList items={['传输加密：SSL/TLS', '存储加密：AES加密', '端到端加密：数据保护']} />
        <BookParagraph><strong>安全策略：</strong></BookParagraph>
        <BookList items={['数据脱敏：隐私保护', '安全审计：风险评估', '应急响应：安全事件处理']} />
        <TagGrid items={['关系型', '时序数据库', 'NoSQL', '备份', '加密']} />
      </div>
    ),
  },
  {
    label: '数据分析与可视化',
    left: (
      <div className="space-y-4">
        <PageTitle>数据分析</PageTitle>
        <SectionTitle>1. 实时分析</SectionTitle>
        <BookParagraph><strong>流处理：</strong></BookParagraph>
        <BookList items={['Apache Kafka：消息队列', 'Apache Flink：流处理引擎', 'Apache Spark：实时计算']} />
        <BookParagraph><strong>分析方式：</strong></BookParagraph>
        <BookList items={['窗口计算：时间窗口', '状态管理：状态更新', '事件处理：模式匹配']} />
        <BookParagraph><strong>应用场景：</strong></BookParagraph>
        <BookList items={['实时监控：设备状态', '异常检测：故障预警', '实时决策：快速响应']} />
        <SectionTitle>2. 离线分析</SectionTitle>
        <BookParagraph><strong>批处理：</strong></BookParagraph>
        <BookList items={['Hadoop：分布式计算', 'Spark：大数据处理', 'Hive：数据仓库']} />
        <BookParagraph><strong>分析方法：</strong></BookParagraph>
        <BookList items={['统计分析：数据统计', '机器学习：模式识别', '数据挖掘：知识发现']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookParagraph><strong>应用场景：</strong></BookParagraph>
        <BookList items={['趋势分析：长期变化', '预测分析：未来趋势', '优化建议：改进方案']} />
        <SectionTitle>3. 机器学习</SectionTitle>
        <BookParagraph><strong>算法类型：</strong></BookParagraph>
        <BookList items={['监督学习：分类预测', '无监督学习：聚类分析', '强化学习：决策优化']} />
        <BookParagraph><strong>应用场景：</strong></BookParagraph>
        <BookList items={['异常检测：设备故障', '预测维护：设备寿命', '优化控制：系统调节']} />
        <BookParagraph><strong>工具框架：</strong></BookParagraph>
        <BookList items={['TensorFlow：深度学习', 'PyTorch：灵活开发', 'Scikit-learn：传统算法']} />
        <TagGrid items={['Kafka', 'Flink', 'Spark', 'TensorFlow', 'ML']} />
      </div>
    ),
  },
  {
    label: '数据可视化',
    left: (
      <div className="space-y-4">
        <PageTitle>数据可视化</PageTitle>
        <SectionTitle>1. 实时监控</SectionTitle>
        <BookParagraph><strong>监控面板：</strong></BookParagraph>
        <BookList items={['仪表盘：关键指标', '状态图：设备状态', '趋势图：实时变化']} />
        <BookParagraph><strong>告警系统：</strong></BookParagraph>
        <BookList items={['阈值告警：超限提醒', '异常告警：异常检测', '事件告警：重要事件']} />
        <BookParagraph><strong>工具选择：</strong></BookParagraph>
        <BookList items={['Grafana：监控面板', 'Kibana：日志分析', 'Prometheus：指标监控']} />
        <SectionTitle>2. 报表分析</SectionTitle>
        <BookParagraph><strong>报表类型：</strong></BookParagraph>
        <BookList items={['日报表：日常统计', '周报表：周度分析', '月报表：月度总结']} />
        <BookParagraph><strong>分析维度：</strong></BookParagraph>
        <BookList items={['时间维度：趋势分析', '空间维度：区域分布', '业务维度：业务指标']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookParagraph><strong>工具选择：</strong></BookParagraph>
        <BookList items={['Tableau：商业智能', 'Power BI：数据分析', 'Metabase：开源BI']} />
        <SectionTitle>3. 交互式分析</SectionTitle>
        <BookParagraph><strong>交互方式：</strong></BookParagraph>
        <BookList items={['数据筛选：条件过滤', '数据钻取：层级分析', '数据联动：关联分析']} />
        <BookParagraph><strong>可视化类型：</strong></BookParagraph>
        <BookList items={['地图可视化：地理分布', '关系图：网络关系', '热力图：密度分布']} />
        <BookParagraph><strong>工具选择：</strong></BookParagraph>
        <BookList items={['ECharts：图表库', 'D3.js：数据驱动', 'Plotly：交互式图表']} />
        <TagGrid items={['Grafana', 'ECharts', 'D3.js', '可视化', '监控']} />
      </div>
    ),
  },
]

export default function IoTDataProcessingPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

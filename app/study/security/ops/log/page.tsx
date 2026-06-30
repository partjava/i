'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookList,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: '日志分析',
  chapterNumber: 4,
  totalChapters: 7,
  subjectHref: '/study/security/ops',
  prevChapter: { label: '安全监控', href: '/study/security/ops/monitor' },
  nextChapter: { label: '漏洞管理', href: '/study/security/ops/vulnerability' },
  theme: THEMES.security,
}

// ==================== 代码常量 ====================

const CODE_FILEBEAT = `# Filebeat采集系统和应用日志
filebeat.inputs:
- type: log
  enabled: true
  paths:
    - /var/log/*.log
    - /var/log/syslog
    - /var/log/auth.log
output.elasticsearch:
  hosts: ["localhost:9200"]`

const CODE_RSYSLOG = `# rsyslog集中采集配置
# /etc/rsyslog.conf
*.* @@192.168.1.100:514`

const CODE_GREP = `# 查找登录失败记录
grep 'Failed password' /var/log/auth.log

# 统计某IP登录失败次数
grep 'Failed password' /var/log/auth.log | grep '192.168.1.100' | wc -l

# 统计每天的登录失败次数
awk '/Failed password/ {print $1}' /var/log/auth.log | sort | uniq -c`

const CODE_ES_QUERY = `# 查询最近1小时内登录失败日志
GET filebeat-*/_search
{
  "query": {
    "bool": {
      "must": [
        { "match": { "message": "Failed password" } },
        { "range": { "@timestamp": { "gte": "now-1h" } } }
      ]
    }
  }
}`

const CODE_KIBANA = `# 查询近24小时登录失败次数
message: "Failed password" AND @timestamp:[now-24h TO now]

# 查询某IP的所有操作
client.ip: "192.168.1.100"

# 统计不同IP的登录失败次数
GET filebeat-*/_search
{
  "size": 0,
  "aggs": {
    "by_ip": {
      "terms": { "field": "client.ip", "size": 10 }
    }
  }
}`

const CODE_KIBANA_CHART = `# 创建折线图：统计每天登录失败次数
X轴：@timestamp（日）
Y轴：message: "Failed password" 的计数

# 创建饼图：统计不同IP的登录失败占比
饼图分组字段：client.ip`

const CODE_GRAFANA = `# Loki数据源日志查询
{job="varlogs"} |= "error" | unwrap msg | line_format "{{.msg}}"`

const CODE_WATCHER = `PUT _watcher/watch/login_fail_alert
{
  "trigger": { "schedule": { "interval": "5m" } },
  "input": {
    "search": {
      "request": {
        "indices": [ "filebeat-*" ],
        "body": {
          "query": {
            "bool": {
              "must": [
                { "match": { "message": "Failed password" } },
                { "range": { "@timestamp": { "gte": "now-5m" } } }
              ]
            }
          }
        }
      }
    }
  },
  "condition": {
    "script": { "source": "ctx.payload.hits.total > 10" }
  },
  "actions": {
    "email_admin": {
      "email": {
        "to": "admin@example.com",
        "subject": "登录失败告警",
        "body": "5分钟内登录失败次数超过10次，请检查系统安全。"
      }
    }
  }
}`

const CODE_SHELL_ALERT = `#!/bin/bash
COUNT=$(grep 'Failed password' /var/log/auth.log | wc -l)
if [ $COUNT -gt 10 ]; then
  echo "登录失败次数过多，可能存在暴力破解！" | mail -s "登录告警" admin@example.com
fi`

// ==================== SPREADS ====================

const SPREADS = [
  {
    label: '概述与日志采集',
    left: (
      <div className="space-y-4">
        <PageTitle>日志分析概述</PageTitle>
        <BookParagraph>日志分析是安全运维的重要环节，通过对系统、应用、网络等各类日志的收集、分析和处理，可以及时发现安全威胁、追踪安全事件、满足合规要求。日志分析不仅依赖于工具，更需要合理的分析方法和规范的日志管理流程。</BookParagraph>
        <SectionTitle>日志分析的目的</SectionTitle>
        <BookList items={[
          '发现安全威胁和异常行为',
          '追踪和溯源安全事件',
          '分析系统和业务性能',
          '满足合规和审计要求',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>日志类型与采集</PageTitle>
        <SectionTitle>常见日志类型</SectionTitle>
        <BookList items={[
          '系统日志：如/var/log/syslog、/var/log/messages、/var/log/auth.log',
          '应用日志：Web服务器、数据库、中间件等应用产生的日志',
          '安全日志：防火墙、IDS/IPS、WAF等安全设备日志',
          '审计日志：操作审计、访问审计、合规审计',
          '自定义业务日志：接口调用、异常、业务流程等',
        ]} />
        <SectionTitle>日志采集工具与配置</SectionTitle>
        <BookCode language="yaml" code={CODE_FILEBEAT} />
        <BookCode language="bash" code={CODE_RSYSLOG} />
      </div>
    ),
  },
  {
    label: '分析方法与查询',
    left: (
      <div className="space-y-4">
        <PageTitle>日志分析方法</PageTitle>
        <BookList items={[
          '关键字检索：通过grep、Elasticsearch等工具检索异常关键字',
          '正则表达式匹配：提取特定格式的日志内容',
          '多维度聚合：按时间、主机、用户、事件类型等聚合统计',
          '关联分析：跨日志源、跨系统的事件关联',
          '异常检测：基于规则或机器学习的异常行为检测',
        ]} />
        <SectionTitle>grep/awk/sed日志分析示例</SectionTitle>
        <BookCode language="bash" code={CODE_GREP} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>日志查询与统计</PageTitle>
        <SectionTitle>Elasticsearch日志分析DSL示例</SectionTitle>
        <BookCode language="json" code={CODE_ES_QUERY} />
        <SectionTitle>常用查询与统计场景</SectionTitle>
        <BookList items={[
          '统计某类事件的发生次数（如登录失败、异常访问）',
          '查询某IP、某用户的操作记录',
          '分析高频异常、攻击源IP分布',
          '统计业务接口调用量、错误率',
        ]} />
        <SectionTitle>Kibana可视化查询示例</SectionTitle>
        <BookCode language="json" code={CODE_KIBANA} />
      </div>
    ),
  },
  {
    label: '可视化与告警',
    left: (
      <div className="space-y-4">
        <PageTitle>日志可视化</PageTitle>
        <BookList items={[
          'Kibana仪表盘：展示登录失败趋势、异常分布、接口调用量等',
          'Grafana日志面板：结合Promtail/Loki实现日志流可视化',
          '自定义大屏：结合Echarts、D3.js等实现安全态势展示',
        ]} />
        <SectionTitle>Kibana仪表盘配置示例</SectionTitle>
        <BookCode language="text" code={CODE_KIBANA_CHART} />
        <SectionTitle>Grafana日志面板配置片段</SectionTitle>
        <BookCode language="text" code={CODE_GRAFANA} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>日志告警</PageTitle>
        <BookList items={[
          '基于日志内容的规则告警（如登录失败次数超阈值）',
          '日志异常模式检测（如暴力破解、批量扫描）',
          '自动化告警联动（如自动拉黑IP、重启服务）',
          '多渠道告警推送（邮件、Webhook、IM等）',
        ]} />
        <SectionTitle>Elasticsearch Watcher告警配置</SectionTitle>
        <BookCode language="json" code={CODE_WATCHER} />
        <SectionTitle>Shell脚本日志告警示例</SectionTitle>
        <BookCode language="bash" code={CODE_SHELL_ALERT} />
      </div>
    ),
  },
  {
    label: '实践案例',
    left: (
      <div className="space-y-4">
        <PageTitle>日志分析实践案例</PageTitle>
        <SectionTitle>案例：企业安全日志分析与告警</SectionTitle>
        <BookList items={[
          '部署Filebeat+ELK采集分析主机和应用日志',
          '自定义Kibana仪表盘展示安全态势',
          '配置Elasticsearch Watcher实现自动告警',
          '定期分析高危IP和异常行为',
          '结合Shell/Python脚本实现自动化巡检',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>常见问题与建议</PageTitle>
        <BookList items={[
          '日志格式要统一，便于分析和检索',
          '日志采集要全量、实时、可靠',
          '定期清理和归档历史日志，节省存储',
          '日志分析要结合安全场景和业务需求',
        ]} />
      </div>
    ),
  },
]

export default function SecurityOpsLogPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookAlert, BookList,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '安全运维',
  chapterTitle: '安全监控',
  chapterNumber: 3,
  totalChapters: 10,
  subjectHref: '/study/security/ops',
  prevChapter: { label: '系统加固', href: '/study/security/ops/hardening' },
  nextChapter: { label: '日志分析', href: '/study/security/ops/log' },
  theme: THEMES.security,
}

const SPREADS = [
  {
    label: '概述',
    left: (
      <div className="space-y-4">
        <PageTitle>安全监控概述</PageTitle>
        <BookParagraph>安全监控是指通过技术手段对IT系统、网络、应用等进行实时监测，及时发现异常行为和安全威胁，保障系统安全稳定运行。安全监控是安全运维的核心环节，涵盖数据采集、指标分析、告警响应、日志审计等多个方面。</BookParagraph>
        <BookList items={['实时发现安全事件和异常', '支撑应急响应和溯源分析', '提升整体安全防护能力', '满足合规和审计要求']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>典型安全监控架构</PageTitle>
        <BookParagraph>监控体系自下而上分为多个层次，从数据采集到可视化展示，形成完整的安全监控链路。</BookParagraph>
        <BookCode language="text" code={`安全监控体系
├── 数据采集层（Agent、采集器）
│   ├── 主机监控（CPU、内存、磁盘、进程、端口）
│   ├── 网络监控（流量、连接、端口扫描）
│   ├── 应用监控（服务状态、接口调用、异常日志）
│   └── 安全事件采集（IDS/IPS、WAF、审计日志）
├── 数据传输层（消息队列、API）
├── 数据存储层（时序数据库、日志库、ES）
├── 分析与处理层（规则引擎、AI检测、关联分析）
├── 告警与响应层（邮件、短信、Webhook、自动化脚本）
└── 展示与可视化层（Grafana、Kibana、定制大屏）`} />
      </div>
    ),
  },
  {
    label: '监控体系与架构',
    left: (
      <div className="space-y-4">
        <PageTitle>主流监控平台</PageTitle>
        <BookList items={['Zabbix：企业级开源监控，支持多种数据采集和告警', 'Prometheus：云原生监控，适合微服务和容器', 'ELK/EFK：日志采集、分析与可视化', 'Grafana：多数据源可视化平台', 'Wazuh/Splunk：安全事件监控与SIEM']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>监控项与指标</PageTitle>
        <BookParagraph>安全监控覆盖主机、网络、应用及安全事件等多个维度的监控指标。</BookParagraph>
        <BookList items={['主机资源：CPU、内存、磁盘、负载、进程、端口', '网络流量：带宽、连接数、异常流量、端口扫描', '服务状态：Web、数据库、中间件等服务存活与性能', '安全事件：登录失败、暴力破解、异常提权、恶意进程', '日志监控：系统日志、应用日志、安全日志', '自定义业务指标：接口QPS、错误率、延迟等']} />
      </div>
    ),
  },
  {
    label: '监控项与指标',
    left: (
      <div className="space-y-4">
        <PageTitle>Zabbix自定义监控项示例</PageTitle>
        <BookParagraph>通过Zabbix的UserParameter机制可以自定义监控脚本，实现对特定指标的灵活采集。</BookParagraph>
        <BookCode language="bash" code={`# 监控Nginx进程存活
UserParameter=nginx.status,ps -C nginx --no-header | wc -l

# 监控指定端口
UserParameter=check.port.2222,netstat -an | grep 2222 | wc -l

# 监控登录失败次数
UserParameter=login.fail,grep 'Failed password' /var/log/auth.log | wc -l`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>告警配置</PageTitle>
        <BookParagraph>多渠道告警机制确保安全事件能够及时通知到相关人员，支持分级处理和自动化联动。</BookParagraph>
        <BookList items={['多渠道告警：邮件、短信、微信、钉钉、Webhook', '分级告警：根据事件严重性分级处理', '告警抑制与合并：防止告警风暴', '自动化响应：触发脚本、工单、API联动']} />
      </div>
    ),
  },
  {
    label: '告警配置',
    left: (
      <div className="space-y-4">
        <PageTitle>Zabbix邮件告警配置示例</PageTitle>
        <BookParagraph>通过自定义Shell脚本实现Zabbix邮件告警通知，在Zabbix Web界面配置动作调用该脚本。</BookParagraph>
        <BookCode language="bash" code={`# /etc/zabbix/alertscripts/sendmail.sh
#!/bin/bash
TO=$1
SUBJECT=$2
BODY=$3
echo "$BODY" | mail -s "$SUBJECT" $TO

# Zabbix Web界面配置动作，调用sendmail.sh脚本`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>Prometheus Alertmanager告警规则示例</PageTitle>
        <BookParagraph>Alertmanager支持丰富的告警规则定义，可根据指标表达式触发不同级别的告警。</BookParagraph>
        <BookCode language="yaml" code={`groups:
- name: instance-down
  rules:
  - alert: InstanceDown
    expr: up == 0
    for: 1m
    labels:
      severity: critical
    annotations:
      summary: "实例宕机"
      description: "{{ $labels.instance }} 已经宕机1分钟以上"`} />
      </div>
    ),
  },
  {
    label: '日志与可视化',
    left: (
      <div className="space-y-4">
        <PageTitle>日志与可视化</PageTitle>
        <BookParagraph>日志是安全监控的重要数据源，通过集中采集和分析可以有效发现安全威胁和异常行为。</BookParagraph>
        <BookList items={['日志采集：Filebeat、Fluentd、Logstash等', '日志分析：Elasticsearch、Graylog、Splunk', '可视化：Kibana、Grafana、定制大屏', '日志告警：基于日志内容触发安全告警']} />
        <SectionTitle>Filebeat采集系统日志配置</SectionTitle>
        <BookCode language="yaml" code={`filebeat.inputs:
- type: log
  enabled: true
  paths:
    - /var/log/syslog
    - /var/log/auth.log
output.elasticsearch:
  hosts: ["localhost:9200"]`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>Kibana仪表盘可视化示例</PageTitle>
        <BookParagraph>在Kibana中创建仪表盘，通过可视化图表直观展示安全监控数据。</BookParagraph>
        <BookList items={['主机CPU/内存/磁盘趋势', '登录失败次数统计', '端口扫描告警趋势', '业务接口异常统计']} />
        <BookCode language="text" code={`Kibana仪表盘常用可视化组件：
- 折线图：展示CPU/内存/磁盘随时间变化趋势
- 柱状图：统计登录失败次数分布
- 热力图：展示端口扫描来源与时间
- 指标卡片：实时显示关键业务指标`} />
      </div>
    ),
  },
  {
    label: '自动化与脚本',
    left: (
      <div className="space-y-4">
        <PageTitle>自动化与脚本</PageTitle>
        <BookParagraph>通过自动化脚本提升监控运维效率，实现快速检测、告警和修复的闭环处理。</BookParagraph>
        <BookList items={['自定义Shell/Python脚本定时巡检', '自动化修复（如重启服务、拉黑IP）', 'API联动自动化运维平台', '批量推送监控配置']} />
        <SectionTitle>Shell脚本：检测高CPU进程并告警</SectionTitle>
        <BookCode language="bash" code={`#!/bin/bash
THRESHOLD=80
ps -eo pid,comm,%cpu --sort=-%cpu | awk 'NR>1 && $3>'"$THRESHOLD"' {print $1,$2,$3}' | while read pid comm cpu; do
  echo "高CPU进程: $comm (PID:$pid) 占用: $cpu%" | mail -s "CPU告警" admin@example.com
  # 可扩展为自动kill进程或API联动
done`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>Python脚本：批量检测主机存活</PageTitle>
        <BookParagraph>通过Python脚本批量检查主机是否在线，适合日常巡检和资产盘点场景。</BookParagraph>
        <BookCode language="python" code={`import os
hosts = ["192.168.1.1", "192.168.1.2", "192.168.1.3"]
for host in hosts:
    response = os.system(f"ping -c 1 {host}")
    if response == 0:
        print(f"{host} 存活")
    else:
        print(f"{host} 不可达")`} />
      </div>
    ),
  },
  {
    label: '实践案例',
    left: (
      <div className="space-y-4">
        <PageTitle>企业级主机与安全监控平台建设</PageTitle>
        <BookParagraph>以下是一个典型的企业级安全监控平台建设方案，涵盖从部署到运维的全流程。</BookParagraph>
        <BookList items={['部署Zabbix/Prometheus采集主机与服务指标', 'Filebeat+ELK采集分析安全日志', '配置多渠道告警与自动化响应', '定制Grafana/Kibana大屏可视化', '定期巡检与脚本自动化运维']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>常见问题与建议</PageTitle>
        <BookAlert type="info" message="监控项要覆盖主机、网络、应用和安全事件；告警要分级、抑制和联动自动化；日志采集要合规、可溯源；定期优化监控指标和告警规则。" />
        <BookList items={['监控项要覆盖主机、网络、应用和安全事件', '告警要分级、抑制和联动自动化', '日志采集要合规、可溯源', '定期优化监控指标和告警规则']} />
      </div>
    ),
  },
]

export default function SecurityOpsMonitorPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

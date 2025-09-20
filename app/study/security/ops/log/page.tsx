'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function SecurityOpsLogPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 顶部返回导航 */}
      <div className="mb-4">
        <Link href="/study/security/ops" className="px-4 py-2 text-blue-600 hover:text-blue-800">← 返回安全运维</Link>
      </div>
      <h1 className="text-3xl font-bold mb-8">日志分析</h1>

      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        <button onClick={() => setActiveTab('overview')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>概述</button>
        <button onClick={() => setActiveTab('type')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'type' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>日志类型与采集</button>
        <button onClick={() => setActiveTab('method')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'method' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>日志分析方法</button>
        <button onClick={() => setActiveTab('query')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'query' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>日志查询与统计</button>
        <button onClick={() => setActiveTab('visual')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'visual' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>日志可视化</button>
        <button onClick={() => setActiveTab('alert')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'alert' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>日志告警</button>
        <button onClick={() => setActiveTab('case')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'case' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>实践案例</button>
      </div>

      {/* 内容区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">日志分析概述</h3>
            <div className="prose max-w-none">
              <p>日志分析是安全运维的重要环节，通过对系统、应用、网络等各类日志的收集、分析和处理，可以及时发现安全威胁、追踪安全事件、满足合规要求。日志分析不仅依赖于工具，更需要合理的分析方法和规范的日志管理流程。</p>
              <ul className="list-disc pl-6">
                <li>发现安全威胁和异常行为</li>
                <li>追踪和溯源安全事件</li>
                <li>分析系统和业务性能</li>
                <li>满足合规和审计要求</li>
              </ul>
            </div>
          </div>
        )}
        {activeTab === 'type' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">日志类型与采集</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold text-lg mb-2">常见日志类型</h4>
              <ul className="list-disc pl-6">
                <li>系统日志：如/var/log/syslog、/var/log/messages、/var/log/auth.log</li>
                <li>应用日志：Web服务器、数据库、中间件等应用产生的日志</li>
                <li>安全日志：防火墙、IDS/IPS、WAF等安全设备日志</li>
                <li>审计日志：操作审计、访问审计、合规审计</li>
                <li>自定义业务日志：接口调用、异常、业务流程等</li>
              </ul>
              <h4 className="font-semibold text-lg mb-2">日志采集工具与配置</h4>
              <pre className="bg-gray-100 p-4 rounded mb-4">
{`# Filebeat采集系统和应用日志
filebeat.inputs:
- type: log
  enabled: true
  paths:
    - /var/log/*.log
    - /var/log/syslog
    - /var/log/auth.log
output.elasticsearch:
  hosts: ["localhost:9200"]`}
              </pre>
              <pre className="bg-gray-100 p-4 rounded mb-4">
{`# rsyslog集中采集配置
# /etc/rsyslog.conf
*.* @@192.168.1.100:514`}
              </pre>
            </div>
          </div>
        )}
        {activeTab === 'method' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">日志分析方法</h3>
            <div className="prose max-w-none">
              <ul className="list-disc pl-6">
                <li>关键字检索：通过grep、Elasticsearch等工具检索异常关键字</li>
                <li>正则表达式匹配：提取特定格式的日志内容</li>
                <li>多维度聚合：按时间、主机、用户、事件类型等聚合统计</li>
                <li>关联分析：跨日志源、跨系统的事件关联</li>
                <li>异常检测：基于规则或机器学习的异常行为检测</li>
              </ul>
              <h4 className="font-semibold text-lg mb-2">grep/awk/sed日志分析示例</h4>
              <pre className="bg-gray-100 p-4 rounded mb-4">
{`# 查找登录失败记录
grep 'Failed password' /var/log/auth.log

# 统计某IP登录失败次数
grep 'Failed password' /var/log/auth.log | grep '192.168.1.100' | wc -l

# 统计每天的登录失败次数
awk '/Failed password/ {print $1}' /var/log/auth.log | sort | uniq -c`}
              </pre>
              <h4 className="font-semibold text-lg mb-2">Elasticsearch日志分析DSL示例</h4>
              <pre className="bg-gray-100 p-4 rounded mb-4">
{`# 查询最近1小时内登录失败日志
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
}`}
              </pre>
            </div>
          </div>
        )}
        {activeTab === 'query' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">日志查询与统计</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold text-lg mb-2">常用查询与统计场景</h4>
              <ul className="list-disc pl-6">
                <li>统计某类事件的发生次数（如登录失败、异常访问）</li>
                <li>查询某IP、某用户的操作记录</li>
                <li>分析高频异常、攻击源IP分布</li>
                <li>统计业务接口调用量、错误率</li>
              </ul>
              <h4 className="font-semibold text-lg mb-2">Kibana可视化查询示例</h4>
              <pre className="bg-gray-100 p-4 rounded mb-4">
{`# 查询近24小时登录失败次数
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
}`}
              </pre>
            </div>
          </div>
        )}
        {activeTab === 'visual' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">日志可视化</h3>
            <div className="prose max-w-none">
              <ul className="list-disc pl-6">
                <li>Kibana仪表盘：展示登录失败趋势、异常分布、接口调用量等</li>
                <li>Grafana日志面板：结合Promtail/Loki实现日志流可视化</li>
                <li>自定义大屏：结合Echarts、D3.js等实现安全态势展示</li>
              </ul>
              <h4 className="font-semibold text-lg mb-2">Kibana仪表盘配置示例</h4>
              <pre className="bg-gray-100 p-4 rounded mb-4">
{`# 创建折线图：统计每天登录失败次数
X轴：@timestamp（日）
Y轴：message: "Failed password" 的计数

# 创建饼图：统计不同IP的登录失败占比
饼图分组字段：client.ip`}
              </pre>
              <h4 className="font-semibold text-lg mb-2">Grafana日志面板配置片段</h4>
              <pre className="bg-gray-100 p-4 rounded mb-4">
{`# Loki数据源日志查询
{job="varlogs"} |= "error" | unwrap msg | line_format "{{.msg}}"`}
              </pre>
            </div>
          </div>
        )}
        {activeTab === 'alert' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">日志告警</h3>
            <div className="prose max-w-none">
              <ul className="list-disc pl-6">
                <li>基于日志内容的规则告警（如登录失败次数超阈值）</li>
                <li>日志异常模式检测（如暴力破解、批量扫描）</li>
                <li>自动化告警联动（如自动拉黑IP、重启服务）</li>
                <li>多渠道告警推送（邮件、Webhook、IM等）</li>
              </ul>
              <h4 className="font-semibold text-lg mb-2">Elasticsearch Watcher告警配置</h4>
              <pre className="bg-gray-100 p-4 rounded mb-4">
{`PUT _watcher/watch/login_fail_alert
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
}`}
              </pre>
              <h4 className="font-semibold text-lg mb-2">Shell脚本日志告警示例</h4>
              <pre className="bg-gray-100 p-4 rounded mb-4">
{`#!/bin/bash
COUNT=$(grep 'Failed password' /var/log/auth.log | wc -l)
if [ $COUNT -gt 10 ]; then
  echo "登录失败次数过多，可能存在暴力破解！" | mail -s "登录告警" admin@example.com
fi`}
              </pre>
            </div>
          </div>
        )}
        {activeTab === 'case' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">日志分析实践案例</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold text-lg mb-2">案例：企业安全日志分析与告警</h4>
              <ol className="list-decimal pl-6">
                <li>部署Filebeat+ELK采集分析主机和应用日志</li>
                <li>自定义Kibana仪表盘展示安全态势</li>
                <li>配置Elasticsearch Watcher实现自动告警</li>
                <li>定期分析高危IP和异常行为</li>
                <li>结合Shell/Python脚本实现自动化巡检</li>
              </ol>
              <h4 className="font-semibold text-lg mb-2">常见问题与建议</h4>
              <ul className="list-disc pl-6">
                <li>日志格式要统一，便于分析和检索</li>
                <li>日志采集要全量、实时、可靠</li>
                <li>定期清理和归档历史日志，节省存储</li>
                <li>日志分析要结合安全场景和业务需求</li>
              </ul>
            </div>
          </div>
        )}
      </div>
      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/security/ops/monitor"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回安全监控
        </Link>
        <Link 
          href="/study/security/ops/vulnerability"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          漏洞管理 →
        </Link>
      </div>
    </div>
  );
} 
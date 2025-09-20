'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function SecurityOpsMonitorPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 顶部返回导航 */}
      <div className="mb-4">
        <Link href="/study/security/ops" className="px-4 py-2 text-blue-600 hover:text-blue-800">← 返回安全运维</Link>
      </div>
      <h1 className="text-3xl font-bold mb-8">安全监控</h1>

      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        <button onClick={() => setActiveTab('overview')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>概述</button>
        <button onClick={() => setActiveTab('arch')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'arch' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>监控体系与架构</button>
        <button onClick={() => setActiveTab('metrics')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'metrics' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>监控项与指标</button>
        <button onClick={() => setActiveTab('alert')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'alert' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>告警配置</button>
        <button onClick={() => setActiveTab('log')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'log' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>日志与可视化</button>
        <button onClick={() => setActiveTab('auto')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'auto' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>自动化与脚本</button>
        <button onClick={() => setActiveTab('case')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'case' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>实践案例</button>
      </div>

      {/* 内容区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">安全监控概述</h3>
            <div className="prose max-w-none">
              <p>安全监控是指通过技术手段对IT系统、网络、应用等进行实时监测，及时发现异常行为和安全威胁，保障系统安全稳定运行。安全监控是安全运维的核心环节，涵盖数据采集、指标分析、告警响应、日志审计等多个方面。</p>
              <ul className="list-disc pl-6">
                <li>实时发现安全事件和异常</li>
                <li>支撑应急响应和溯源分析</li>
                <li>提升整体安全防护能力</li>
                <li>满足合规和审计要求</li>
              </ul>
            </div>
          </div>
        )}
        {activeTab === 'arch' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">监控体系与架构</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold text-lg mb-2">典型安全监控架构</h4>
              <pre className="bg-gray-100 p-4 rounded mb-4">
{`安全监控体系
├── 数据采集层（Agent、采集器）
│   ├── 主机监控（CPU、内存、磁盘、进程、端口）
│   ├── 网络监控（流量、连接、端口扫描）
│   ├── 应用监控（服务状态、接口调用、异常日志）
│   └── 安全事件采集（IDS/IPS、WAF、审计日志）
├── 数据传输层（消息队列、API）
├── 数据存储层（时序数据库、日志库、ES）
├── 分析与处理层（规则引擎、AI检测、关联分析）
├── 告警与响应层（邮件、短信、Webhook、自动化脚本）
└── 展示与可视化层（Grafana、Kibana、定制大屏）`}
              </pre>
              <h4 className="font-semibold text-lg mb-2">主流监控平台</h4>
              <ul className="list-disc pl-6">
                <li>Zabbix：企业级开源监控，支持多种数据采集和告警</li>
                <li>Prometheus：云原生监控，适合微服务和容器</li>
                <li>ELK/EFK：日志采集、分析与可视化</li>
                <li>Grafana：多数据源可视化平台</li>
                <li>Wazuh/Splunk：安全事件监控与SIEM</li>
              </ul>
            </div>
          </div>
        )}
        {activeTab === 'metrics' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">监控项与指标</h3>
            <div className="prose max-w-none">
              <ul className="list-disc pl-6">
                <li>主机资源：CPU、内存、磁盘、负载、进程、端口</li>
                <li>网络流量：带宽、连接数、异常流量、端口扫描</li>
                <li>服务状态：Web、数据库、中间件等服务存活与性能</li>
                <li>安全事件：登录失败、暴力破解、异常提权、恶意进程</li>
                <li>日志监控：系统日志、应用日志、安全日志</li>
                <li>自定义业务指标：接口QPS、错误率、延迟等</li>
              </ul>
              <h4 className="font-semibold text-lg mb-2">Zabbix自定义监控项示例</h4>
              <pre className="bg-gray-100 p-4 rounded mb-4">
{`# 监控Nginx进程存活
UserParameter=nginx.status,ps -C nginx --no-header | wc -l

# 监控指定端口
UserParameter=check.port.2222,netstat -an | grep 2222 | wc -l

# 监控登录失败次数
UserParameter=login.fail,grep 'Failed password' /var/log/auth.log | wc -l`}
              </pre>
            </div>
          </div>
        )}
        {activeTab === 'alert' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">告警配置</h3>
            <div className="prose max-w-none">
              <ul className="list-disc pl-6">
                <li>多渠道告警：邮件、短信、微信、钉钉、Webhook</li>
                <li>分级告警：根据事件严重性分级处理</li>
                <li>告警抑制与合并：防止告警风暴</li>
                <li>自动化响应：触发脚本、工单、API联动</li>
              </ul>
              <h4 className="font-semibold text-lg mb-2">Zabbix邮件告警配置示例</h4>
              <pre className="bg-gray-100 p-4 rounded mb-4">
{`# 配置Zabbix服务器邮件发送
# /etc/zabbix/alertscripts/sendmail.sh
#!/bin/bash
TO=$1
SUBJECT=$2
BODY=$3
echo "$BODY" | mail -s "$SUBJECT" $TO

# Zabbix Web界面配置动作，调用sendmail.sh脚本`}
              </pre>
              <h4 className="font-semibold text-lg mb-2">Prometheus Alertmanager告警规则示例</h4>
              <pre className="bg-gray-100 p-4 rounded mb-4">
{`groups:
- name: instance-down
  rules:
  - alert: InstanceDown
    expr: up == 0
    for: 1m
    labels:
      severity: critical
    annotations:
      summary: "实例宕机"
      description: "{{ $labels.instance }} 已经宕机1分钟以上"`}
              </pre>
            </div>
          </div>
        )}
        {activeTab === 'log' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">日志与可视化</h3>
            <div className="prose max-w-none">
              <ul className="list-disc pl-6">
                <li>日志采集：Filebeat、Fluentd、Logstash等</li>
                <li>日志分析：Elasticsearch、Graylog、Splunk</li>
                <li>可视化：Kibana、Grafana、定制大屏</li>
                <li>日志告警：基于日志内容触发安全告警</li>
              </ul>
              <h4 className="font-semibold text-lg mb-2">Filebeat采集系统日志配置</h4>
              <pre className="bg-gray-100 p-4 rounded mb-4">
{`filebeat.inputs:
- type: log
  enabled: true
  paths:
    - /var/log/syslog
    - /var/log/auth.log
output.elasticsearch:
  hosts: ["localhost:9200"]`}
              </pre>
              <h4 className="font-semibold text-lg mb-2">Kibana仪表盘可视化示例</h4>
              <pre className="bg-gray-100 p-4 rounded mb-4">
{`# 在Kibana中创建仪表盘，展示如下内容：
- 主机CPU/内存/磁盘趋势
- 登录失败次数统计
- 端口扫描告警趋势
- 业务接口异常统计`}
              </pre>
            </div>
          </div>
        )}
        {activeTab === 'auto' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">自动化与脚本</h3>
            <div className="prose max-w-none">
              <ul className="list-disc pl-6">
                <li>自定义Shell/Python脚本定时巡检</li>
                <li>自动化修复（如重启服务、拉黑IP）</li>
                <li>API联动自动化运维平台</li>
                <li>批量推送监控配置</li>
              </ul>
              <h4 className="font-semibold text-lg mb-2">Shell脚本：检测高CPU进程并告警</h4>
              <pre className="bg-gray-100 p-4 rounded mb-4">
{`#!/bin/bash
THRESHOLD=80
ps -eo pid,comm,%cpu --sort=-%cpu | awk 'NR>1 && $3>'$THRESHOLD' {print $1,$2,$3}' | while read pid comm cpu; do
  echo "高CPU进程: $comm (PID:$pid) 占用: $cpu%" | mail -s "CPU告警" admin@example.com
  # 可扩展为自动kill进程或API联动
done`}
              </pre>
              <h4 className="font-semibold text-lg mb-2">Python脚本：批量检测主机存活</h4>
              <pre className="bg-gray-100 p-4 rounded mb-4">
{`import os
hosts = ["192.168.1.1", "192.168.1.2", "192.168.1.3"]
for host in hosts:
    response = os.system(f"ping -c 1 {host}")
    if response == 0:
        print(f"{host} 存活")
    else:
        print(f"{host} 不可达")`}
              </pre>
            </div>
          </div>
        )}
        {activeTab === 'case' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">安全监控实践案例</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold text-lg mb-2">案例：企业级主机与安全监控平台建设</h4>
              <ol className="list-decimal pl-6">
                <li>部署Zabbix/Prometheus采集主机与服务指标</li>
                <li>Filebeat+ELK采集分析安全日志</li>
                <li>配置多渠道告警与自动化响应</li>
                <li>定制Grafana/Kibana大屏可视化</li>
                <li>定期巡检与脚本自动化运维</li>
              </ol>
              <h4 className="font-semibold text-lg mb-2">常见问题与建议</h4>
              <ul className="list-disc pl-6">
                <li>监控项要覆盖主机、网络、应用和安全事件</li>
                <li>告警要分级、抑制和联动自动化</li>
                <li>日志采集要合规、可溯源</li>
                <li>定期优化监控指标和告警规则</li>
              </ul>
            </div>
          </div>
        )}
      </div>
      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/security/ops/hardening"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回系统加固
        </Link>
        <Link 
          href="/study/security/ops/log"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          日志分析 →
        </Link>
      </div>
    </div>
  );
} 
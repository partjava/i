'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function SecurityOpsBasicPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 顶部返回导航 */}
      <div className="mb-4">
        <Link href="/study/security/ops" className="px-4 py-2 text-blue-600 hover:text-blue-800">← 返回安全运维</Link>
      </div>
      <h1 className="text-3xl font-bold mb-8">安全运维基础</h1>

      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'overview'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          概述
        </button>
        <button
          onClick={() => setActiveTab('architecture')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'architecture'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          体系架构
        </button>
        <button
          onClick={() => setActiveTab('workflow')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'workflow'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          工作流程
        </button>
        <button
          onClick={() => setActiveTab('tools')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'tools'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          运维工具
        </button>
        <button
          onClick={() => setActiveTab('practice')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'practice'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          最佳实践
        </button>
        <button
          onClick={() => setActiveTab('assessment')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'assessment'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          运维评估
        </button>
      </div>

      {/* 内容区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">安全运维概述</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold text-lg mb-2">什么是安全运维？</h4>
              <p>安全运维（SecOps）是指将信息安全与运维管理深度融合，通过流程、技术和管理手段，保障IT系统和数据的安全稳定运行。它不仅关注系统的可用性和性能，更强调对安全威胁的防范、检测和响应。</p>
              <h4 className="font-semibold text-lg mb-2">安全运维的目标</h4>
              <ul className="list-disc pl-6">
                <li>保护系统和数据安全：防止数据泄露、篡改和丢失，确保业务数据的完整性和保密性。</li>
                <li>确保业务连续性：通过高可用架构、灾备方案和应急响应，保障系统在遭受攻击或故障时能快速恢复。</li>
                <li>降低安全风险：定期进行漏洞扫描、补丁管理和安全评估，及时发现和修复安全隐患。</li>
                <li>提高运维效率：通过自动化工具和流程规范，减少人为操作失误，提高效率。</li>
                <li>满足合规要求：遵循国家和行业的安全法规、标准和政策，确保企业合规运营。</li>
              </ul>
            </div>
          </div>
        )}
        {activeTab === 'architecture' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">安全运维体系架构</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold text-lg mb-2">核心组件</h4>
              <ul className="list-disc pl-6">
                <li>安全监控系统：实时监控系统、网络、应用和安全事件，及时发现异常。</li>
                <li>日志管理系统：收集、分析、存储和审计各类日志，支持溯源和合规。</li>
                <li>配置管理系统：统一管理系统配置，防止配置漂移和弱口令。</li>
                <li>漏洞管理平台：自动化发现、跟踪和修复系统漏洞。</li>
                <li>应急响应平台：快速响应和处置安全事件，减少损失。</li>
              </ul>
              <h4 className="font-semibold text-lg mb-2">技术架构图</h4>
              <pre className="bg-gray-100 p-4 rounded mb-4">
{`安全运维技术架构
├── 基础设施层
│   ├── 服务器
│   ├── 网络设备
│   └── 存储设备
├── 平台层
│   ├── 操作系统
│   ├── 数据库
│   └── 中间件
├── 应用层
│   ├── 安全监控系统
│   ├── 日志管理系统
│   └── 配置管理系统
└── 管理层
    ├── 策略管理
    ├── 流程管理
    └── 人员管理`}
              </pre>
            </div>
          </div>
        )}
        {activeTab === 'workflow' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">安全运维工作流程</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold text-lg mb-2">日常运维流程</h4>
              <ol className="list-decimal pl-6">
                <li>系统巡检：定期检查系统状态、性能、安全漏洞和日志，发现潜在风险。</li>
                <li>变更管理：规范变更申请、评估、实施和验证，防止因变更引发安全问题。</li>
                <li>事件响应：及时发现、分析和处理安全事件，事后总结经验。</li>
              </ol>
              <h4 className="font-semibold text-lg mb-2">应急响应流程</h4>
              <ol className="list-decimal pl-6">
                <li>发现和报告：及时发现异常并上报。</li>
                <li>初步评估：判断事件影响范围和严重性。</li>
                <li>应急处理：隔离、修复和恢复受影响系统。</li>
                <li>系统恢复：确保业务恢复正常。</li>
                <li>事后分析：复盘事件原因，总结改进措施。</li>
              </ol>
            </div>
          </div>
        )}
        {activeTab === 'tools' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">安全运维工具</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold text-lg mb-2">监控工具</h4>
              <ul className="list-disc pl-6">
                <li><b>Zabbix：</b>开源监控系统，支持多种监控项和告警。</li>
                <li><b>Nagios：</b>经典监控工具，适合中小型环境。</li>
                <li><b>Prometheus：</b>云原生监控，适合微服务和容器。</li>
                <li><b>Grafana：</b>可视化展示监控数据，支持多数据源。</li>
              </ul>
              <h4 className="font-semibold text-lg mb-2">日志工具</h4>
              <ul className="list-disc pl-6">
                <li><b>ELK Stack：</b>Elasticsearch、Logstash、Kibana组合，强大的日志收集、分析和可视化能力。</li>
                <li><b>Graylog：</b>开源日志管理平台，易于扩展。</li>
                <li><b>Splunk：</b>商业级日志分析平台，功能强大。</li>
                <li><b>LogRhythm：</b>集成安全信息与事件管理（SIEM）。</li>
              </ul>
              <h4 className="font-semibold text-lg mb-2">安全工具</h4>
              <ul className="list-disc pl-6">
                <li><b>Nessus：</b>漏洞扫描器，支持多种漏洞检测。</li>
                <li><b>OpenVAS：</b>开源漏洞扫描平台。</li>
                <li><b>Wireshark：</b>网络抓包分析工具。</li>
                <li><b>Metasploit：</b>渗透测试与漏洞利用框架。</li>
              </ul>
            </div>
          </div>
        )}
        {activeTab === 'practice' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">安全运维最佳实践</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold text-lg mb-2">系统加固</h4>
              <ul className="list-disc pl-6">
                <li>及时更新系统和软件补丁，修复已知漏洞。</li>
                <li>关闭不必要的端口和服务，减少攻击面。</li>
                <li>配置防火墙和访问控制，限制非法访问。</li>
                <li>加强SSH安全，如禁用root远程登录、使用密钥认证、修改默认端口。</li>
                <li>合理设置文件权限，防止敏感信息泄露。</li>
              </ul>
              <h4 className="font-semibold text-lg mb-2">安全监控</h4>
              <pre className="bg-gray-100 p-4 rounded mb-4">
{`# Zabbix Agent安装与配置
sudo apt install zabbix-agent
sudo nano /etc/zabbix/zabbix_agentd.conf
Server=zabbix.example.com
ServerActive=zabbix.example.com
Hostname=server1
sudo systemctl enable zabbix-agent
sudo systemctl start zabbix-agent`}
              </pre>
              <h4 className="font-semibold text-lg mb-2">日志管理</h4>
              <pre className="bg-gray-100 p-4 rounded mb-4">
{`# Filebeat收集日志示例
sudo apt install filebeat
sudo nano /etc/filebeat/filebeat.yml
filebeat.inputs:
- type: log
  paths:
    - /var/log/*.log
    - /var/log/syslog
    - /var/log/auth.log
output.elasticsearch:
  hosts: ["elasticsearch:9200"]
sudo systemctl enable filebeat
sudo systemctl start filebeat`}
              </pre>
            </div>
          </div>
        )}
        {activeTab === 'assessment' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">安全运维评估</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold text-lg mb-2">评估指标</h4>
              <ul className="list-disc pl-6">
                <li>系统可用性：系统运行的稳定性和持续性。</li>
                <li>安全事件响应时间：发现和处理安全事件的速度。</li>
                <li>漏洞修复率：已发现漏洞的修复比例。</li>
                <li>补丁更新及时率：补丁发布后应用的及时性。</li>
                <li>流程执行效率：运维流程的规范性和高效性。</li>
                <li>人员培训覆盖率：运维人员安全意识和技能培训情况。</li>
                <li>合规达标率：是否满足相关法规和标准。</li>
              </ul>
              <h4 className="font-semibold text-lg mb-2">持续改进（PDCA循环）</h4>
              <ol className="list-decimal pl-6">
                <li>Plan（计划）：制定安全目标，识别风险，制定改进计划。</li>
                <li>Do（执行）：实施安全措施，执行安全流程。</li>
                <li>Check（检查）：评估执行效果，分析安全事件。</li>
                <li>Act（改进）：优化安全措施，持续改进。</li>
              </ol>
            </div>
          </div>
        )}
      </div>
      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/security/ops"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回安全运维
        </Link>
        <Link 
          href="/study/security/ops/hardening"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          系统加固 →
        </Link>
      </div>
    </div>
  );
}

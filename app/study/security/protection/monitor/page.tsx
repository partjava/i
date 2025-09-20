'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function SecurityMonitorPage() {
  const [activeTab, setActiveTab] = useState('intro');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">安全监控</h1>

      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        <button
          onClick={() => setActiveTab('intro')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'intro'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          基础概念
        </button>
        <button
          onClick={() => setActiveTab('methods')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'methods'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          监控方法
        </button>
        <button
          onClick={() => setActiveTab('tools')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'tools'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          监控工具
        </button>
        <button
          onClick={() => setActiveTab('cases')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'cases'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          实践案例
        </button>
      </div>

      {/* 内容区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === 'intro' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">安全监控基础概念</h3>
            
            <div className="prose max-w-none">
              <h4 className="font-semibold text-lg mb-2">什么是安全监控？</h4>
              <p className="mb-4">
                安全监控是指通过技术手段对信息系统进行实时监控，及时发现和预警安全威胁，确保系统安全稳定运行的过程。它是安全防护体系中的重要组成部分，通过持续监控系统运行状态、网络流量、用户行为等，实现对安全事件的及时发现和快速响应。
              </p>

              <h4 className="font-semibold text-lg mb-2">安全监控的目标</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">1. 威胁检测</h5>
                  <p className="text-sm text-gray-700">
                    及时发现各类安全威胁，包括：
                    <ul className="list-disc pl-6 mt-2">
                      <li>恶意攻击行为：检测各类网络攻击、入侵尝试等</li>
                      <li>异常访问：识别非正常的访问模式和可疑行为</li>
                      <li>漏洞利用：发现针对系统漏洞的攻击行为</li>
                      <li>数据泄露：监控敏感数据的异常传输</li>
                    </ul>
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">2. 系统监控</h5>
                  <p className="text-sm text-gray-700">
                    监控系统运行状态，确保系统安全：
                    <ul className="list-disc pl-6 mt-2">
                      <li>性能监控：CPU、内存、磁盘等资源使用情况</li>
                      <li>服务状态：关键服务的运行状态和可用性</li>
                      <li>配置变更：系统配置的变更和修改</li>
                      <li>资源访问：系统资源的访问和使用情况</li>
                    </ul>
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">3. 合规监控</h5>
                  <p className="text-sm text-gray-700">
                    确保系统符合安全规范和标准：
                    <ul className="list-disc pl-6 mt-2">
                      <li>策略执行：安全策略的执行情况</li>
                      <li>访问控制：用户权限和访问控制的有效性</li>
                      <li>审计日志：系统审计日志的完整性</li>
                      <li>合规检查：定期进行合规性检查</li>
                    </ul>
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">4. 风险预警</h5>
                  <p className="text-sm text-gray-700">
                    提前发现和预警潜在风险：
                    <ul className="list-disc pl-6 mt-2">
                      <li>威胁情报：基于威胁情报的风险预警</li>
                      <li>趋势分析：安全事件的发展趋势分析</li>
                      <li>风险评估：定期进行安全风险评估</li>
                      <li>预警机制：建立多级预警机制</li>
                    </ul>
                  </p>
                </div>
              </div>

              <h4 className="font-semibold text-lg mb-2">安全监控的重要性</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="mb-2">安全监控在现代企业中的重要性体现在以下几个方面：</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <b>主动防御：</b>
                    通过实时监控，可以主动发现和防御安全威胁，而不是被动应对。这有助于在攻击发生前就采取预防措施，降低安全风险。
                  </li>
                  <li>
                    <b>快速响应：</b>
                    及时发现安全事件，可以快速启动应急响应机制，减少安全事件造成的损失。监控系统可以自动触发告警，通知相关人员及时处理。
                  </li>
                  <li>
                    <b>合规要求：</b>
                    许多行业标准和法规要求企业实施安全监控，确保系统安全。通过监控可以证明企业符合相关合规要求，避免合规风险。
                  </li>
                  <li>
                    <b>安全态势感知：</b>
                    通过持续监控，可以全面了解系统的安全状况，及时发现潜在的安全隐患，为安全决策提供依据。
                  </li>
                  <li>
                    <b>成本控制：</b>
                    通过预防性监控，可以减少安全事件的发生，降低安全事件带来的损失，从而控制安全成本。
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'methods' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">安全监控方法</h3>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">1. 网络流量监控</h4>
                <p className="mb-2">网络流量监控是安全监控的基础方法，主要包括：</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <b>流量分析：</b>
                    <ul className="list-disc pl-6 mt-1">
                      <li>协议分析：分析网络协议的使用情况，发现异常协议</li>
                      <li>流量特征：识别异常流量特征，如DDoS攻击特征</li>
                      <li>带宽监控：监控网络带宽使用情况，发现带宽异常</li>
                      <li>会话分析：分析网络会话，发现可疑连接</li>
                    </ul>
                  </li>
                  <li>
                    <b>行为分析：</b>
                    <ul className="list-disc pl-6 mt-1">
                      <li>访问模式：分析用户访问模式，发现异常访问</li>
                      <li>通信行为：监控异常通信行为，如大量数据外传</li>
                      <li>时间特征：分析访问时间特征，发现非工作时间访问</li>
                      <li>地理位置：监控异常地理位置访问</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">2. 系统监控</h4>
                <p className="mb-2">系统监控关注系统运行状态和安全状况：</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <b>性能监控：</b>
                    <ul className="list-disc pl-6 mt-1">
                      <li>资源使用：监控CPU、内存、磁盘等资源使用情况</li>
                      <li>服务状态：监控关键服务的运行状态</li>
                      <li>响应时间：监控系统响应时间，发现性能问题</li>
                      <li>并发连接：监控系统并发连接数</li>
                    </ul>
                  </li>
                  <li>
                    <b>安全监控：</b>
                    <ul className="list-disc pl-6 mt-1">
                      <li>进程监控：监控异常进程的创建和运行</li>
                      <li>文件监控：监控关键文件的访问和修改</li>
                      <li>配置监控：监控系统配置的变更</li>
                      <li>权限监控：监控权限变更和提权行为</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">3. 日志监控</h4>
                <p className="mb-2">日志监控是安全监控的重要手段：</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <b>日志收集：</b>
                    <ul className="list-disc pl-6 mt-1">
                      <li>系统日志：收集操作系统日志</li>
                      <li>应用日志：收集应用程序日志</li>
                      <li>安全日志：收集安全设备日志</li>
                      <li>审计日志：收集审计系统日志</li>
                    </ul>
                  </li>
                  <li>
                    <b>日志分析：</b>
                    <ul className="list-disc pl-6 mt-1">
                      <li>实时分析：对日志进行实时分析</li>
                      <li>关联分析：关联分析多源日志</li>
                      <li>趋势分析：分析日志变化趋势</li>
                      <li>异常检测：检测日志中的异常模式</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">4. 威胁情报监控</h4>
                <p className="mb-2">基于威胁情报的安全监控：</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <b>情报收集：</b>
                    <ul className="list-disc pl-6 mt-1">
                      <li>漏洞情报：收集最新漏洞信息</li>
                      <li>攻击情报：收集攻击特征和手法</li>
                      <li>恶意IP：收集恶意IP地址</li>
                      <li>恶意域名：收集恶意域名信息</li>
                    </ul>
                  </li>
                  <li>
                    <b>情报应用：</b>
                    <ul className="list-disc pl-6 mt-1">
                      <li>实时匹配：实时匹配威胁情报</li>
                      <li>预警分析：基于情报进行预警</li>
                      <li>风险评估：评估系统安全风险</li>
                      <li>防护建议：提供安全防护建议</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tools' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">安全监控工具</h3>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">1. 网络监控工具</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold mb-1">Wireshark</h5>
                    <p className="text-sm text-gray-700">
                      网络协议分析工具，功能包括：
                      <ul className="list-disc pl-6 mt-1">
                        <li>数据包捕获和分析</li>
                        <li>协议解析和过滤</li>
                        <li>流量统计和分析</li>
                        <li>异常流量检测</li>
                      </ul>
                    </p>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-1">Snort</h5>
                    <p className="text-sm text-gray-700">
                      网络入侵检测系统，特点：
                      <ul className="list-disc pl-6 mt-1">
                        <li>实时流量分析</li>
                        <li>攻击特征检测</li>
                        <li>协议分析</li>
                        <li>告警生成</li>
                      </ul>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">2. 系统监控工具</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold mb-1">Nagios</h5>
                    <p className="text-sm text-gray-700">
                      系统监控工具，功能：
                      <ul className="list-disc pl-6 mt-1">
                        <li>服务器性能监控</li>
                        <li>服务状态监控</li>
                        <li>告警管理</li>
                        <li>报表生成</li>
                      </ul>
                    </p>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-1">Zabbix</h5>
                    <p className="text-sm text-gray-700">
                      企业级监控平台，特点：
                      <ul className="list-disc pl-6 mt-1">
                        <li>分布式监控</li>
                        <li>自动发现</li>
                        <li>可视化展示</li>
                        <li>告警管理</li>
                      </ul>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">3. 日志分析工具</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold mb-1">ELK Stack</h5>
                    <p className="text-sm text-gray-700">
                      日志分析平台，组件：
                      <ul className="list-disc pl-6 mt-1">
                        <li>Elasticsearch：数据存储</li>
                        <li>Logstash：日志收集</li>
                        <li>Kibana：数据可视化</li>
                        <li>Beats：数据采集</li>
                      </ul>
                    </p>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-1">Splunk</h5>
                    <p className="text-sm text-gray-700">
                      企业级日志分析平台，功能：
                      <ul className="list-disc pl-6 mt-1">
                        <li>实时日志分析</li>
                        <li>安全事件关联</li>
                        <li>自定义报表</li>
                        <li>告警管理</li>
                      </ul>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cases' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">安全监控实践案例</h3>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">案例1：企业安全监控体系建设</h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    <b>背景：</b>某大型企业需要建立完整的安全监控体系
                  </p>
                  <p className="text-sm text-gray-700">
                    <b>挑战：</b>
                    <ul className="list-disc pl-6 mt-1">
                      <li>系统规模大，监控范围广</li>
                      <li>安全事件频发，需要快速响应</li>
                      <li>监控数据量大，分析困难</li>
                      <li>缺乏统一管理平台</li>
                    </ul>
                  </p>
                  <p className="text-sm text-gray-700">
                    <b>解决方案：</b>
                    <ul className="list-disc pl-6 mt-1">
                      <li>建立统一监控平台</li>
                      <li>实施自动化监控</li>
                      <li>部署智能分析系统</li>
                      <li>建立应急响应机制</li>
                    </ul>
                  </p>
                  <p className="text-sm text-gray-700">
                    <b>效果：</b>
                    <ul className="list-disc pl-6 mt-1">
                      <li>安全事件发现率提升90%</li>
                      <li>响应时间缩短80%</li>
                      <li>误报率降低70%</li>
                      <li>运维效率提升60%</li>
                    </ul>
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">案例2：云平台安全监控实践</h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    <b>背景：</b>某云服务提供商需要优化安全监控流程
                  </p>
                  <p className="text-sm text-gray-700">
                    <b>挑战：</b>
                    <ul className="list-disc pl-6 mt-1">
                      <li>多租户环境复杂</li>
                      <li>动态资源管理困难</li>
                      <li>安全隔离要求高</li>
                      <li>合规性要求严格</li>
                    </ul>
                  </p>
                  <p className="text-sm text-gray-700">
                    <b>解决方案：</b>
                    <ul className="list-disc pl-6 mt-1">
                      <li>实施DevSecOps</li>
                      <li>部署云原生监控</li>
                      <li>建立统一身份认证</li>
                      <li>实施自动化响应</li>
                    </ul>
                  </p>
                  <p className="text-sm text-gray-700">
                    <b>效果：</b>
                    <ul className="list-disc pl-6 mt-1">
                      <li>安全事件响应时间缩短75%</li>
                      <li>自动化程度提升65%</li>
                      <li>客户满意度提升45%</li>
                      <li>运维成本降低35%</li>
                    </ul>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/security/protection/audit"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 安全审计
        </Link>
        <Link 
          href="/study/security/protection/response"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          应急响应 →
        </Link>
      </div>
    </div>
  );
} 
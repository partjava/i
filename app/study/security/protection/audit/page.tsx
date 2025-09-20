'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function AuditPage() {
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">安全审计</h1>

      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        <button
          onClick={() => setActiveTab('basic')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'basic'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          基础原理
        </button>
        <button
          onClick={() => setActiveTab('types')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'types'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          审计类型
        </button>
        <button
          onClick={() => setActiveTab('process')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'process'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          审计流程
        </button>
        <button
          onClick={() => setActiveTab('tools')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'tools'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          审计工具
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
        {activeTab === 'basic' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">安全审计基础原理</h3>
            <div className="prose max-w-none mb-4">
              <p>安全审计是对信息系统安全性的系统性评估过程，通过收集、分析和评估安全相关的信息，发现潜在的安全风险，并提供改进建议。</p>
              
              <h4 className="font-semibold mt-4 mb-2">核心目标</h4>
              <ol className="list-decimal pl-6 space-y-2">
                <li><b>合规性验证：</b>确保符合相关法规和标准</li>
                <li><b>风险评估：</b>识别和评估安全风险</li>
                <li><b>漏洞发现：</b>发现系统安全漏洞</li>
                <li><b>改进建议：</b>提供安全改进方案</li>
                <li><b>持续监控：</b>建立持续审计机制</li>
              </ol>

              <h4 className="font-semibold mt-4 mb-2">基本原则</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li><b>独立性：</b>审计过程保持独立</li>
                <li><b>客观性：</b>基于事实进行评估</li>
                <li><b>全面性：</b>覆盖所有关键领域</li>
                <li><b>持续性：</b>建立持续审计机制</li>
                <li><b>可追溯性：</b>保留完整审计记录</li>
              </ul>
            </div>

            {/* 安全审计原理SVG图 */}
            <div className="flex justify-center mb-6">
              <svg width="800" height="400" viewBox="0 0 800 400">
                {/* 标题 */}
                <text x="400" y="30" fontSize="18" fill="#1e293b" textAnchor="middle">安全审计原理</text>

                {/* 中心圆 */}
                <circle cx="400" cy="200" r="150" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />
                <text x="400" y="200" fontSize="20" fill="#0f172a" textAnchor="middle">安全审计</text>

                {/* 合规性验证 */}
                <circle cx="200" cy="150" r="80" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" />
                <text x="200" y="140" fontSize="16" fill="#0ea5e9" textAnchor="middle">合规性验证</text>
                <text x="200" y="160" fontSize="12" fill="#0ea5e9" textAnchor="middle">法规/标准</text>

                {/* 风险评估 */}
                <circle cx="600" cy="150" r="80" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" />
                <text x="600" y="140" fontSize="16" fill="#db2777" textAnchor="middle">风险评估</text>
                <text x="600" y="160" fontSize="12" fill="#db2777" textAnchor="middle">威胁/漏洞</text>

                {/* 改进建议 */}
                <circle cx="400" cy="350" r="80" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" />
                <text x="400" y="340" fontSize="16" fill="#16a34a" textAnchor="middle">改进建议</text>
                <text x="400" y="360" fontSize="12" fill="#16a34a" textAnchor="middle">方案/措施</text>

                {/* 连接线 */}
                <line x1="300" y1="200" x2="400" y2="200" stroke="#94a3b8" strokeWidth="2" />
                <line x1="500" y1="200" x2="400" y2="200" stroke="#94a3b8" strokeWidth="2" />
                <line x1="400" y1="300" x2="400" y2="270" stroke="#94a3b8" strokeWidth="2" />
              </svg>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">重点术语解释</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li><b>审计范围：</b>审计活动覆盖的系统、网络和应用范围</li>
                <li><b>审计证据：</b>支持审计结论的事实和数据</li>
                <li><b>审计发现：</b>审计过程中发现的问题和风险</li>
                <li><b>审计建议：</b>针对发现的问题提出的改进建议</li>
                <li><b>审计报告：</b>记录审计过程和结果的正式文档</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'types' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">安全审计类型</h3>
            <div className="prose max-w-none mb-4">
              <h4 className="font-semibold mb-2">1. 合规性审计</h4>
              <p>评估系统是否符合相关法规和标准要求。</p>
              <ul className="list-disc pl-6 mb-4">
                <li><b>审计内容：</b>
                  <ul className="list-disc pl-6">
                    <li>法规遵从性</li>
                    <li>标准符合性</li>
                    <li>政策执行情况</li>
                  </ul>
                </li>
                <li><b>适用标准：</b>
                  <ul className="list-disc pl-6">
                    <li>ISO 27001</li>
                    <li>等级保护</li>
                    <li>行业规范</li>
                  </ul>
                </li>
              </ul>

              <h4 className="font-semibold mb-2">2. 技术审计</h4>
              <p>评估系统技术实现的安全性。</p>
              <ul className="list-disc pl-6 mb-4">
                <li><b>审计内容：</b>
                  <ul className="list-disc pl-6">
                    <li>系统架构</li>
                    <li>代码安全</li>
                    <li>配置安全</li>
                  </ul>
                </li>
                <li><b>技术领域：</b>
                  <ul className="list-disc pl-6">
                    <li>网络安全</li>
                    <li>应用安全</li>
                    <li>数据安全</li>
                  </ul>
                </li>
              </ul>

              <h4 className="font-semibold mb-2">3. 运营审计</h4>
              <p>评估安全运营管理的有效性。</p>
              <ul className="list-disc pl-6 mb-4">
                <li><b>审计内容：</b>
                  <ul className="list-disc pl-6">
                    <li>安全策略</li>
                    <li>运维管理</li>
                    <li>事件响应</li>
                  </ul>
                </li>
                <li><b>管理领域：</b>
                  <ul className="list-disc pl-6">
                    <li>人员管理</li>
                    <li>流程管理</li>
                    <li>资产管理</li>
                  </ul>
                </li>
              </ul>
            </div>

            {/* 审计类型SVG图 */}
            <div className="flex justify-center mt-4">
              <svg width="800" height="400" viewBox="0 0 800 400">
                {/* 标题 */}
                <text x="400" y="30" fontSize="18" fill="#1e293b" textAnchor="middle">安全审计类型</text>

                {/* 合规性审计 */}
                <rect x="50" y="60" width="200" height="300" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" rx="8" />
                <text x="150" y="90" fontSize="16" fill="#0f172a" textAnchor="middle">合规性审计</text>
                <text x="150" y="120" fontSize="12" fill="#475569" textAnchor="middle">法规遵从性</text>
                <text x="150" y="140" fontSize="12" fill="#475569" textAnchor="middle">标准符合性</text>
                <text x="150" y="160" fontSize="12" fill="#475569" textAnchor="middle">政策执行</text>
                <text x="150" y="200" fontSize="12" fill="#475569" textAnchor="middle">适用标准：</text>
                <text x="150" y="220" fontSize="12" fill="#475569" textAnchor="middle">- ISO 27001</text>
                <text x="150" y="240" fontSize="12" fill="#475569" textAnchor="middle">- 等级保护</text>
                <text x="150" y="260" fontSize="12" fill="#475569" textAnchor="middle">- 行业规范</text>

                {/* 技术审计 */}
                <rect x="300" y="60" width="200" height="300" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" rx="8" />
                <text x="400" y="90" fontSize="16" fill="#0f172a" textAnchor="middle">技术审计</text>
                <text x="400" y="120" fontSize="12" fill="#475569" textAnchor="middle">系统架构</text>
                <text x="400" y="140" fontSize="12" fill="#475569" textAnchor="middle">代码安全</text>
                <text x="400" y="160" fontSize="12" fill="#475569" textAnchor="middle">配置安全</text>
                <text x="400" y="200" fontSize="12" fill="#475569" textAnchor="middle">技术领域：</text>
                <text x="400" y="220" fontSize="12" fill="#475569" textAnchor="middle">- 网络安全</text>
                <text x="400" y="240" fontSize="12" fill="#475569" textAnchor="middle">- 应用安全</text>
                <text x="400" y="260" fontSize="12" fill="#475569" textAnchor="middle">- 数据安全</text>

                {/* 运营审计 */}
                <rect x="550" y="60" width="200" height="300" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" rx="8" />
                <text x="650" y="90" fontSize="16" fill="#0f172a" textAnchor="middle">运营审计</text>
                <text x="650" y="120" fontSize="12" fill="#475569" textAnchor="middle">安全策略</text>
                <text x="650" y="140" fontSize="12" fill="#475569" textAnchor="middle">运维管理</text>
                <text x="650" y="160" fontSize="12" fill="#475569" textAnchor="middle">事件响应</text>
                <text x="650" y="200" fontSize="12" fill="#475569" textAnchor="middle">管理领域：</text>
                <text x="650" y="220" fontSize="12" fill="#475569" textAnchor="middle">- 人员管理</text>
                <text x="650" y="240" fontSize="12" fill="#475569" textAnchor="middle">- 流程管理</text>
                <text x="650" y="260" fontSize="12" fill="#475569" textAnchor="middle">- 资产管理</text>
              </svg>
            </div>
          </div>
        )}

        {activeTab === 'process' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">安全审计流程</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">1. 审计准备</h4>
                <p className="mb-2">确定审计范围和目标。</p>
                <ul className="list-disc pl-6 text-sm">
                  <li>确定审计范围</li>
                  <li>制定审计计划</li>
                  <li>准备审计工具</li>
                  <li>组建审计团队</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">2. 信息收集</h4>
                <p className="mb-2">收集审计所需信息。</p>
                <ul className="list-disc pl-6 text-sm">
                  <li>系统配置信息</li>
                  <li>安全策略文档</li>
                  <li>运行日志数据</li>
                  <li>历史审计报告</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">3. 分析评估</h4>
                <p className="mb-2">分析收集的信息并评估风险。</p>
                <ul className="list-disc pl-6 text-sm">
                  <li>漏洞分析</li>
                  <li>风险评估</li>
                  <li>合规性检查</li>
                  <li>问题分类</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">4. 报告生成</h4>
                <p className="mb-2">生成审计报告并提出建议。</p>
                <ul className="list-disc pl-6 text-sm">
                  <li>问题描述</li>
                  <li>风险评估</li>
                  <li>改进建议</li>
                  <li>优先级排序</li>
                </ul>
              </div>
            </div>

            {/* 审计流程SVG图 */}
            <div className="flex justify-center mt-4">
              <svg width="800" height="400" viewBox="0 0 800 400">
                {/* 标题 */}
                <text x="400" y="30" fontSize="18" fill="#1e293b" textAnchor="middle">安全审计流程</text>

                {/* 流程框 */}
                <rect x="50" y="100" width="150" height="80" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" rx="8" />
                <text x="125" y="145" fontSize="16" fill="#0ea5e9" textAnchor="middle">审计准备</text>

                <rect x="250" y="100" width="150" height="80" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" rx="8" />
                <text x="325" y="145" fontSize="16" fill="#db2777" textAnchor="middle">信息收集</text>

                <rect x="450" y="100" width="150" height="80" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" rx="8" />
                <text x="525" y="145" fontSize="16" fill="#16a34a" textAnchor="middle">分析评估</text>

                <rect x="650" y="100" width="150" height="80" fill="#fef9c3" stroke="#facc15" strokeWidth="2" rx="8" />
                <text x="725" y="145" fontSize="16" fill="#eab308" textAnchor="middle">报告生成</text>

                {/* 连接线 */}
                <line x1="200" y1="140" x2="250" y2="140" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="400" y1="140" x2="450" y2="140" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="600" y1="140" x2="650" y2="140" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />

                {/* 子步骤 */}
                <rect x="50" y="250" width="150" height="40" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" rx="8" />
                <text x="125" y="275" fontSize="12" fill="#475569" textAnchor="middle">确定范围</text>

                <rect x="250" y="250" width="150" height="40" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" rx="8" />
                <text x="325" y="275" fontSize="12" fill="#475569" textAnchor="middle">收集数据</text>

                <rect x="450" y="250" width="150" height="40" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" rx="8" />
                <text x="525" y="275" fontSize="12" fill="#475569" textAnchor="middle">分析问题</text>

                <rect x="650" y="250" width="150" height="40" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" rx="8" />
                <text x="725" y="275" fontSize="12" fill="#475569" textAnchor="middle">提出建议</text>

                {/* 箭头定义 */}
                <defs>
                  <marker id="arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L8,4 L0,8" fill="#94a3b8" />
                  </marker>
                </defs>
              </svg>
            </div>
          </div>
        )}

        {activeTab === 'tools' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">安全审计工具</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">1. 漏洞扫描工具</h4>
                <p className="mb-2">用于发现系统安全漏洞。</p>
                <ul className="list-disc pl-6 text-sm">
                  <li><b>Nessus：</b>全面的漏洞扫描工具</li>
                  <li><b>OpenVAS：</b>开源的漏洞扫描系统</li>
                  <li><b>Nmap：</b>网络探测和安全审计</li>
                  <li><b>Acunetix：</b>Web应用漏洞扫描</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">2. 日志分析工具</h4>
                <p className="mb-2">用于分析系统日志和安全事件。</p>
                <ul className="list-disc pl-6 text-sm">
                  <li><b>Splunk：</b>日志管理和分析平台</li>
                  <li><b>ELK Stack：</b>开源日志分析套件</li>
                  <li><b>Graylog：</b>集中式日志管理</li>
                  <li><b>LogRhythm：</b>安全信息和事件管理</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">3. 合规性检查工具</h4>
                <p className="mb-2">用于检查系统合规性。</p>
                <ul className="list-disc pl-6 text-sm">
                  <li><b>OpenSCAP：</b>安全配置评估</li>
                  <li><b>Lynis：</b>系统安全审计</li>
                  <li><b>Security Center：</b>合规性管理平台</li>
                  <li><b>Qualys：</b>云安全与合规性</li>
                </ul>
              </div>
            </div>

            {/* 审计工具SVG图 */}
            <div className="flex justify-center mt-4">
              <svg width="800" height="400" viewBox="0 0 800 400">
                {/* 标题 */}
                <text x="400" y="30" fontSize="18" fill="#1e293b" textAnchor="middle">安全审计工具分类</text>

                {/* 漏洞扫描工具 */}
                <rect x="50" y="60" width="200" height="300" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" rx="8" />
                <text x="150" y="90" fontSize="16" fill="#0f172a" textAnchor="middle">漏洞扫描工具</text>
                <text x="150" y="120" fontSize="12" fill="#475569" textAnchor="middle">- Nessus</text>
                <text x="150" y="140" fontSize="12" fill="#475569" textAnchor="middle">- OpenVAS</text>
                <text x="150" y="160" fontSize="12" fill="#475569" textAnchor="middle">- Nmap</text>
                <text x="150" y="180" fontSize="12" fill="#475569" textAnchor="middle">- Acunetix</text>

                {/* 日志分析工具 */}
                <rect x="300" y="60" width="200" height="300" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" rx="8" />
                <text x="400" y="90" fontSize="16" fill="#0f172a" textAnchor="middle">日志分析工具</text>
                <text x="400" y="120" fontSize="12" fill="#475569" textAnchor="middle">- Splunk</text>
                <text x="400" y="140" fontSize="12" fill="#475569" textAnchor="middle">- ELK Stack</text>
                <text x="400" y="160" fontSize="12" fill="#475569" textAnchor="middle">- Graylog</text>
                <text x="400" y="180" fontSize="12" fill="#475569" textAnchor="middle">- LogRhythm</text>

                {/* 合规性检查工具 */}
                <rect x="550" y="60" width="200" height="300" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" rx="8" />
                <text x="650" y="90" fontSize="16" fill="#0f172a" textAnchor="middle">合规性检查工具</text>
                <text x="650" y="120" fontSize="12" fill="#475569" textAnchor="middle">- OpenSCAP</text>
                <text x="650" y="140" fontSize="12" fill="#475569" textAnchor="middle">- Lynis</text>
                <text x="650" y="160" fontSize="12" fill="#475569" textAnchor="middle">- Security Center</text>
                <text x="650" y="180" fontSize="12" fill="#475569" textAnchor="middle">- Qualys</text>
              </svg>
            </div>
          </div>
        )}

        {activeTab === 'cases' && (
          <div className="space-y-8">
            <h3 className="text-xl font-semibold mb-3">实践案例</h3>
            
            {/* 案例1：企业安全审计 */}
            <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
              <h4 className="font-bold text-lg mb-2 text-blue-700">案例1：企业安全审计实践</h4>
              <div className="mb-2 text-gray-700 text-sm">
                <p>某大型企业进行全面的安全审计评估。</p>
              </div>
              <div className="mb-2">
                <span className="font-semibold">审计范围：</span>
                <ul className="list-disc pl-6 text-sm">
                  <li>网络基础设施</li>
                  <li>应用系统</li>
                  <li>数据安全</li>
                  <li>运维管理</li>
                </ul>
              </div>
              <div className="mb-2">
                <span className="font-semibold">审计方法：</span>
                <ul className="list-disc pl-6 text-sm">
                  <li>漏洞扫描</li>
                  <li>渗透测试</li>
                  <li>配置检查</li>
                  <li>日志分析</li>
                </ul>
              </div>
              <div className="mb-2">
                <span className="font-semibold">审计发现：</span>
                <ul className="list-disc pl-6 text-sm">
                  <li>发现高危漏洞5个</li>
                  <li>中危漏洞12个</li>
                  <li>低危漏洞25个</li>
                  <li>配置问题15个</li>
                </ul>
              </div>
              <div className="mb-2">
                <span className="font-semibold">改进建议：</span>
                <ul className="list-disc pl-6 text-sm">
                  <li>修复高危漏洞</li>
                  <li>加强访问控制</li>
                  <li>完善安全策略</li>
                  <li>建立监控机制</li>
                </ul>
              </div>
            </div>

            {/* 案例2：云平台安全审计 */}
            <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
              <h4 className="font-bold text-lg mb-2 text-green-700">案例2：云平台安全审计</h4>
              <div className="mb-2 text-gray-700 text-sm">
                <p>某云服务提供商进行安全合规审计。</p>
              </div>
              <div className="mb-2">
                <span className="font-semibold">审计范围：</span>
                <ul className="list-disc pl-6 text-sm">
                  <li>云基础设施</li>
                  <li>虚拟化平台</li>
                  <li>云管理平台</li>
                  <li>安全服务</li>
                </ul>
              </div>
              <div className="mb-2">
                <span className="font-semibold">审计方法：</span>
                <ul className="list-disc pl-6 text-sm">
                  <li>云安全评估</li>
                  <li>合规性检查</li>
                  <li>服务审计</li>
                  <li>用户权限审计</li>
                </ul>
              </div>
              <div className="mb-2">
                <span className="font-semibold">审计发现：</span>
                <ul className="list-disc pl-6 text-sm">
                  <li>配置不当3处</li>
                  <li>权限过大5处</li>
                  <li>日志不完整2处</li>
                  <li>备份不足1处</li>
                </ul>
              </div>
              <div className="mb-2">
                <span className="font-semibold">改进建议：</span>
                <ul className="list-disc pl-6 text-sm">
                  <li>优化安全配置</li>
                  <li>实施最小权限</li>
                  <li>完善日志记录</li>
                  <li>加强备份管理</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/security/protection/vpn"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← VPN技术
        </Link>
        <Link 
          href="/study/security/protection/monitor"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          安全监控 →
        </Link>
      </div>
    </div>
  );
} 
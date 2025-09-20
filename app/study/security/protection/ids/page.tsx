 'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function IDSPage() {
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">入侵检测系统（IDS）</h1>

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
          类型与架构
        </button>
        <button
          onClick={() => setActiveTab('detection')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'detection'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          检测方法
        </button>
        <button
          onClick={() => setActiveTab('config')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'config'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          配置与部署
        </button>
        <button
          onClick={() => setActiveTab('cases')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'cases'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          实际案例
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
      </div>

      {/* 内容区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === 'basic' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">入侵检测系统基础原理</h3>
            <div className="prose max-w-none mb-4">
              <p>入侵检测系统(IDS)是一种网络安全设备或软件，用于监控网络或系统中的可疑活动，并在发现潜在威胁时发出警报。它是网络安全防护体系中的重要组成部分，能够及时发现和响应安全威胁。</p>
              <ul className="list-disc pl-6">
                <li><b>实时监控：</b>持续监控网络流量和系统活动，及时发现异常。</li>
                <li><b>威胁检测：</b>识别已知攻击特征和异常行为模式。</li>
                <li><b>告警响应：</b>对检测到的威胁进行分级告警和响应。</li>
                <li><b>日志记录：</b>记录安全事件，用于后续分析和取证。</li>
              </ul>
            </div>
            {/* SVG结构图 */}
            <div className="flex justify-center mb-6">
              <svg width="600" height="200" viewBox="0 0 600 200">
                {/* 网络流量 */}
                <rect x="50" y="50" width="100" height="40" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" rx="8" />
                <text x="100" y="75" fontSize="14" fill="#0ea5e9" textAnchor="middle">网络流量</text>
                
                {/* 数据采集 */}
                <rect x="200" y="50" width="100" height="40" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" rx="8" />
                <text x="250" y="75" fontSize="14" fill="#db2777" textAnchor="middle">数据采集</text>
                
                {/* 分析引擎 */}
                <rect x="350" y="50" width="100" height="40" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="8" />
                <text x="400" y="75" fontSize="14" fill="#ef4444" textAnchor="middle">分析引擎</text>
                
                {/* 告警系统 */}
                <rect x="500" y="50" width="100" height="40" fill="#fef9c3" stroke="#facc15" strokeWidth="2" rx="8" />
                <text x="550" y="75" fontSize="14" fill="#eab308" textAnchor="middle">告警系统</text>
                
                {/* 连接线 */}
                <line x1="150" y1="70" x2="200" y2="70" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="300" y1="70" x2="350" y2="70" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="450" y1="70" x2="500" y2="70" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
                
                {/* 特征库 */}
                <rect x="350" y="120" width="100" height="40" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" rx="8" />
                <text x="400" y="145" fontSize="14" fill="#16a34a" textAnchor="middle">特征库</text>
                <line x1="400" y1="90" x2="400" y2="120" stroke="#64748b" strokeWidth="2" />
                
                <defs>
                  <marker id="arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L8,4 L0,8" fill="#64748b" />
                  </marker>
                </defs>
              </svg>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">重点术语解释</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li><b>特征检测：</b>基于已知攻击特征进行匹配检测。</li>
                <li><b>异常检测：</b>基于行为基线识别异常活动。</li>
                <li><b>误报：</b>将正常行为误判为攻击。</li>
                <li><b>漏报：</b>未能检测到实际攻击。</li>
                <li><b>告警阈值：</b>触发告警的判定标准。</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'types' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">IDS类型与架构</h3>
            <div className="prose max-w-none mb-4">
              <h4 className="font-semibold mb-2">1. 基于网络的IDS (NIDS)</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>部署在网络边界或关键节点</li>
                <li>监控网络流量</li>
                <li>检测网络层面的攻击行为</li>
                <li>不影响网络性能</li>
                <li>典型产品：Snort、Suricata</li>
              </ul>

              <h4 className="font-semibold mb-2">2. 基于主机的IDS (HIDS)</h4>
              <ul className="list-disc pl-6 mb-4">
                <li>部署在单个主机上</li>
                <li>监控系统日志、文件完整性</li>
                <li>检测主机层面的异常行为</li>
                <li>可以检测到NIDS无法发现的攻击</li>
                <li>典型产品：OSSEC、Tripwire</li>
              </ul>
            </div>
            {/* 架构SVG */}
            <div className="flex justify-center mt-4">
              <svg width="600" height="200" viewBox="0 0 600 200">
                {/* 互联网 */}
                <rect x="50" y="50" width="100" height="40" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" rx="8" />
                <text x="100" y="75" fontSize="14" fill="#0ea5e9" textAnchor="middle">互联网</text>
                
                {/* NIDS */}
                <rect x="200" y="50" width="100" height="40" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="8" />
                <text x="250" y="75" fontSize="14" fill="#ef4444" textAnchor="middle">NIDS</text>
                
                {/* 内网 */}
                <rect x="350" y="50" width="100" height="40" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" rx="8" />
                <text x="400" y="75" fontSize="14" fill="#db2777" textAnchor="middle">内网</text>
                
                {/* HIDS */}
                <rect x="350" y="120" width="100" height="40" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="8" />
                <text x="400" y="145" fontSize="14" fill="#ef4444" textAnchor="middle">HIDS</text>
                
                {/* 连接线 */}
                <line x1="150" y1="70" x2="200" y2="70" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="300" y1="70" x2="350" y2="70" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="400" y1="90" x2="400" y2="120" stroke="#64748b" strokeWidth="2" />
                
                <defs>
                  <marker id="arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L8,4 L0,8" fill="#64748b" />
                  </marker>
                </defs>
              </svg>
            </div>
          </div>
        )}

        {activeTab === 'detection' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">检测方法</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">1. 特征检测</h4>
                <ul className="list-disc pl-6 mb-2">
                  <li>基于已知攻击特征</li>
                  <li>使用预定义的规则</li>
                  <li>误报率较低</li>
                  <li>无法检测新型攻击</li>
                  <li>需要定期更新特征库</li>
                </ul>
                <pre className="bg-white border rounded p-2 text-xs overflow-x-auto">{`# Snort规则示例
alert tcp $EXTERNAL_NET any -> $HOME_NET 80 (
    msg:"SQL Injection Attack";
    flow:established,to_server;
    content:"' OR '1'='1";
    nocase;
    classtype:web-application-attack;
    sid:1000001;
    rev:1;
)`}</pre>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">2. 异常检测</h4>
                <ul className="list-disc pl-6 mb-2">
                  <li>基于行为基线</li>
                  <li>使用机器学习算法</li>
                  <li>可以发现未知攻击</li>
                  <li>误报率较高</li>
                  <li>需要持续学习优化</li>
                </ul>
                <pre className="bg-white border rounded p-2 text-xs overflow-x-auto">{`# 使用Python实现简单的异常检测
import numpy as np
from sklearn.ensemble import IsolationForest

# 训练异常检测模型
def train_anomaly_detector(normal_data):
    model = IsolationForest(contamination=0.1)
    model.fit(normal_data)
    return model

# 检测异常
def detect_anomalies(model, new_data):
    predictions = model.predict(new_data)
    return predictions == -1  # -1表示异常`}</pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'config' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">配置与部署</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">1. Snort配置示例</h4>
                <pre className="bg-white border rounded p-2 text-xs overflow-x-auto">{`# snort.conf 基本配置
# 网络变量定义
var HOME_NET 192.168.1.0/24
var EXTERNAL_NET !$HOME_NET

# 预处理器配置
preprocessor frag3_global
preprocessor stream5_global

# 输出配置
output unified2: filename snort.log, limit 128

# 规则配置
include $RULE_PATH/local.rules
include $RULE_PATH/community.rules`}</pre>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">2. OSSEC配置示例</h4>
                <pre className="bg-white border rounded p-2 text-xs overflow-x-auto">{`# ossec.conf 基本配置
<global>
    <email_notification>yes</email_notification>
    <smtp_server>smtp.example.com</smtp_server>
    <email_from>ossec@example.com</email_from>
    <email_to>admin@example.com</email_to>
</global>

<rules>
    <include>rules_config.xml</include>
    <include>pam_rules.xml</include>
    <include>sshd_rules.xml</include>
</rules>

<syscheck>
    <frequency>43200</frequency>
    <alert_new_files>yes</alert_new_files>
    <auto_ignore>no</auto_ignore>
</syscheck>`}</pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cases' && (
          <div className="space-y-8">
            <h3 className="text-xl font-semibold mb-3">实际案例</h3>
            {/* 案例1：SQL注入攻击检测 */}
            <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
              <h4 className="font-bold text-lg mb-2 text-blue-700">案例1：SQL注入攻击检测</h4>
              <div className="mb-2 text-gray-700 text-sm">某网站遭受SQL注入攻击，通过IDS及时发现并阻止。</div>
              <div className="mb-2">
                <span className="font-semibold">攻击特征：</span>
                <pre className="bg-white border rounded p-2 text-xs mt-1">{`GET /login.php?username=admin' OR '1'='1&password=anything HTTP/1.1`}</pre>
              </div>
              <div className="mb-2">
                <span className="font-semibold">IDS响应：</span>
                <ul className="list-disc pl-6 text-sm">
                  <li>特征匹配触发告警</li>
                  <li>记录攻击源IP</li>
                  <li>通知安全管理员</li>
                </ul>
              </div>
            </div>

            {/* 案例2：异常登录检测 */}
            <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
              <h4 className="font-bold text-lg mb-2 text-green-700">案例2：异常登录检测</h4>
              <div className="mb-2 text-gray-700 text-sm">通过行为分析发现异常登录行为。</div>
              <div className="mb-2">
                <span className="font-semibold">异常特征：</span>
                <ul className="list-disc pl-6 text-sm">
                  <li>非工作时间登录</li>
                  <li>非常用IP地址</li>
                  <li>多次登录失败</li>
                </ul>
              </div>
              <div className="mb-2">
                <span className="font-semibold">处理措施：</span>
                <ul className="list-disc pl-6 text-sm">
                  <li>临时封禁可疑IP</li>
                  <li>通知账户所有者</li>
                  <li>加强账户安全措施</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'practice' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">最佳实践</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">1. 部署建议</h4>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li>关键网络节点部署NIDS</li>
                  <li>重要服务器部署HIDS</li>
                  <li>合理配置检测深度</li>
                  <li>定期更新特征库</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">2. 运维管理</h4>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li>定期检查系统状态</li>
                  <li>及时处理告警信息</li>
                  <li>优化检测规则</li>
                  <li>备份重要数据</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">3. 性能优化</h4>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  <li>合理配置资源</li>
                  <li>优化检测算法</li>
                  <li>负载均衡部署</li>
                  <li>定期性能评估</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/security/protection/firewall"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 防火墙技术
        </Link>
        <Link 
          href="/study/security/protection/ips"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          入侵防御 →
        </Link>
      </div>
    </div>
  );
}
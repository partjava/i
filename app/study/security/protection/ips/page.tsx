'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function IPSPage() {
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">入侵防御系统（IPS）</h1>

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
          onClick={() => setActiveTab('defense')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'defense'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          防御方法
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
            <h3 className="text-xl font-semibold mb-3">入侵防御系统基础原理</h3>
            <div className="prose max-w-none mb-4">
              <p>入侵防御系统(Intrusion Prevention System, IPS)是一种主动防御的安全设备或软件，它不仅能够检测网络攻击，还能主动阻止攻击行为。与IDS相比，IPS具有更强的主动防御能力，能够实时阻断恶意流量，保护网络和系统安全。</p>
              
              <h4 className="font-semibold mt-4 mb-2">工作原理</h4>
              <p>IPS通过以下步骤实现入侵防御：</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li><b>流量分析：</b>实时分析网络流量，识别可疑数据包。</li>
                <li><b>特征匹配：</b>将流量与已知攻击特征进行匹配。</li>
                <li><b>行为分析：</b>分析流量行为模式，发现异常活动。</li>
                <li><b>威胁判定：</b>根据预设规则判定是否为攻击。</li>
                <li><b>防御响应：</b>对确认的攻击采取阻断措施。</li>
                <li><b>日志记录：</b>记录攻击事件和防御动作。</li>
              </ol>

              <h4 className="font-semibold mt-4 mb-2">核心功能</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li><b>实时防御：</b>能够实时检测和阻断攻击，保护系统安全。</li>
                <li><b>深度检测：</b>支持应用层协议分析，识别复杂攻击。</li>
                <li><b>智能防护：</b>结合机器学习等技术，提高检测准确性。</li>
                <li><b>联动防御：</b>可与防火墙、IDS等设备联动，形成立体防护。</li>
                <li><b>策略管理：</b>支持灵活的策略配置和更新。</li>
              </ul>
            </div>

            {/* SVG结构图 */}
            <div className="flex justify-center mb-6">
              <svg width="600" height="300" viewBox="0 0 600 300">
                {/* 网络流量 */}
                <rect x="50" y="50" width="100" height="40" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" rx="8" />
                <text x="100" y="75" fontSize="14" fill="#0ea5e9" textAnchor="middle">网络流量</text>
                
                {/* 流量分析 */}
                <rect x="200" y="50" width="100" height="40" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" rx="8" />
                <text x="250" y="75" fontSize="14" fill="#db2777" textAnchor="middle">流量分析</text>
                
                {/* 威胁检测 */}
                <rect x="350" y="50" width="100" height="40" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="8" />
                <text x="400" y="75" fontSize="14" fill="#ef4444" textAnchor="middle">威胁检测</text>
                
                {/* 防御响应 */}
                <rect x="500" y="50" width="100" height="40" fill="#fef9c3" stroke="#facc15" strokeWidth="2" rx="8" />
                <text x="550" y="75" fontSize="14" fill="#eab308" textAnchor="middle">防御响应</text>
                
                {/* 特征库 */}
                <rect x="350" y="120" width="100" height="40" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" rx="8" />
                <text x="400" y="145" fontSize="14" fill="#16a34a" textAnchor="middle">特征库</text>
                
                {/* 策略管理 */}
                <rect x="350" y="190" width="100" height="40" fill="#f3e8ff" stroke="#a855f7" strokeWidth="2" rx="8" />
                <text x="400" y="215" fontSize="14" fill="#9333ea" textAnchor="middle">策略管理</text>
                
                {/* 连接线 */}
                <line x1="150" y1="70" x2="200" y2="70" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="300" y1="70" x2="350" y2="70" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="450" y1="70" x2="500" y2="70" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="400" y1="90" x2="400" y2="120" stroke="#64748b" strokeWidth="2" />
                <line x1="400" y1="160" x2="400" y2="190" stroke="#64748b" strokeWidth="2" />
                
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
                <li><b>深度包检测(DPI)：</b>对数据包内容进行深度分析，识别应用层攻击。</li>
                <li><b>行为分析：</b>通过分析流量行为模式，发现异常活动。</li>
                <li><b>防御策略：</b>定义如何响应不同类型的攻击。</li>
                <li><b>误报率：</b>将正常流量误判为攻击的比例。</li>
                <li><b>漏报率：</b>未能检测到实际攻击的比例。</li>
                <li><b>防御延迟：</b>从检测到攻击到实施防御的时间。</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'types' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">IPS类型与架构</h3>
            <div className="prose max-w-none mb-4">
              <h4 className="font-semibold mb-2">1. 基于网络的IPS (NIPS)</h4>
              <p>部署在网络边界或关键节点，监控和防御网络层面的攻击。</p>
              <ul className="list-disc pl-6 mb-4">
                <li><b>部署位置：</b>网络边界、核心交换机、重要服务器前</li>
                <li><b>主要功能：</b>
                  <ul className="list-disc pl-6">
                    <li>网络流量监控</li>
                    <li>攻击检测与阻断</li>
                    <li>带宽管理</li>
                    <li>协议分析</li>
                  </ul>
                </li>
                <li><b>优势：</b>
                  <ul className="list-disc pl-6">
                    <li>不影响网络性能</li>
                    <li>集中管理</li>
                    <li>全局防护</li>
                  </ul>
                </li>
                <li><b>典型产品：</b>Palo Alto Networks、Cisco IPS、Fortinet IPS</li>
              </ul>

              <h4 className="font-semibold mb-2">2. 基于主机的IPS (HIPS)</h4>
              <p>部署在单个主机上，保护主机系统安全。</p>
              <ul className="list-disc pl-6 mb-4">
                <li><b>部署位置：</b>服务器、工作站、终端设备</li>
                <li><b>主要功能：</b>
                  <ul className="list-disc pl-6">
                    <li>系统调用监控</li>
                    <li>文件完整性检查</li>
                    <li>进程行为分析</li>
                    <li>注册表监控</li>
                  </ul>
                </li>
                <li><b>优势：</b>
                  <ul className="list-disc pl-6">
                    <li>细粒度控制</li>
                    <li>主机级防护</li>
                    <li>可检测内部威胁</li>
                  </ul>
                </li>
                <li><b>典型产品：</b>Symantec HIPS、McAfee HIPS、Trend Micro HIPS</li>
              </ul>

              <h4 className="font-semibold mb-2">3. 应用层IPS (WAF)</h4>
              <p>专门保护Web应用安全的IPS。</p>
              <ul className="list-disc pl-6 mb-4">
                <li><b>部署位置：</b>Web服务器前、应用网关</li>
                <li><b>主要功能：</b>
                  <ul className="list-disc pl-6">
                    <li>SQL注入防护</li>
                    <li>XSS攻击防护</li>
                    <li>CSRF防护</li>
                    <li>应用层DDoS防护</li>
                  </ul>
                </li>
                <li><b>优势：</b>
                  <ul className="list-disc pl-6">
                    <li>专业Web防护</li>
                    <li>细粒度控制</li>
                    <li>应用层可见性</li>
                  </ul>
                </li>
                <li><b>典型产品：</b>ModSecurity、Imperva WAF、F5 ASM</li>
              </ul>
            </div>

            {/* 架构SVG */}
            <div className="flex justify-center mt-4">
              <svg width="600" height="300" viewBox="0 0 600 300">
                {/* 互联网 */}
                <rect x="50" y="50" width="100" height="40" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" rx="8" />
                <text x="100" y="75" fontSize="14" fill="#0ea5e9" textAnchor="middle">互联网</text>
                
                {/* NIPS */}
                <rect x="200" y="50" width="100" height="40" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="8" />
                <text x="250" y="75" fontSize="14" fill="#ef4444" textAnchor="middle">NIPS</text>
                
                {/* 内网 */}
                <rect x="350" y="50" width="100" height="40" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" rx="8" />
                <text x="400" y="75" fontSize="14" fill="#db2777" textAnchor="middle">内网</text>
                
                {/* Web服务器 */}
                <rect x="350" y="120" width="100" height="40" fill="#fef9c3" stroke="#facc15" strokeWidth="2" rx="8" />
                <text x="400" y="145" fontSize="14" fill="#eab308" textAnchor="middle">Web服务器</text>
                
                {/* WAF */}
                <rect x="350" y="190" width="100" height="40" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" rx="8" />
                <text x="400" y="215" fontSize="14" fill="#16a34a" textAnchor="middle">WAF</text>
                
                {/* 连接线 */}
                <line x1="150" y1="70" x2="200" y2="70" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="300" y1="70" x2="350" y2="70" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="400" y1="90" x2="400" y2="120" stroke="#64748b" strokeWidth="2" />
                <line x1="400" y1="160" x2="400" y2="190" stroke="#64748b" strokeWidth="2" />
                
                <defs>
                  <marker id="arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L8,4 L0,8" fill="#64748b" />
                  </marker>
                </defs>
              </svg>
            </div>
          </div>
        )}

        {activeTab === 'defense' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">防御方法</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">1. 特征匹配防御</h4>
                <p className="mb-2">基于已知攻击特征进行匹配和阻断。</p>
                <pre className="bg-white border rounded p-2 text-xs overflow-x-auto">{`# Snort IPS规则示例
drop tcp $EXTERNAL_NET any -> $HOME_NET 80 (
    msg:"SQL Injection Attack";
    flow:established,to_server;
    content:"' OR '1'='1";
    nocase;
    classtype:web-application-attack;
    sid:1000001;
    rev:1;
)`}</pre>
                <ul className="list-disc pl-6 mt-2 text-sm">
                  <li>优点：准确率高，误报率低</li>
                  <li>缺点：无法防御未知攻击</li>
                  <li>适用场景：已知攻击防御</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">2. 行为分析防御</h4>
                <p className="mb-2">基于行为模式分析进行防御。</p>
                <pre className="bg-white border rounded p-2 text-xs overflow-x-auto">{`# Python实现简单的行为分析
import numpy as np
from sklearn.ensemble import IsolationForest

class BehaviorAnalyzer:
    def __init__(self):
        self.model = IsolationForest(contamination=0.1)
        
    def train(self, normal_data):
        self.model.fit(normal_data)
        
    def detect(self, new_data):
        predictions = self.model.predict(new_data)
        return predictions == -1  # -1表示异常
        
    def block_attack(self, is_attack):
        if is_attack:
            # 实现阻断逻辑
            return "Blocked"
        return "Allowed"`}</pre>
                <ul className="list-disc pl-6 mt-2 text-sm">
                  <li>优点：可以发现未知攻击</li>
                  <li>缺点：误报率较高</li>
                  <li>适用场景：异常行为检测</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">3. 协议分析防御</h4>
                <p className="mb-2">基于协议规范进行防御。</p>
                <pre className="bg-white border rounded p-2 text-xs overflow-x-auto">{`# HTTP协议分析示例
def analyze_http_request(request):
    # 检查请求方法
    if request.method not in ['GET', 'POST', 'PUT', 'DELETE']:
        return False
        
    # 检查Content-Length
    if 'Content-Length' in request.headers:
        try:
            length = int(request.headers['Content-Length'])
            if length > MAX_CONTENT_LENGTH:
                return False
        except ValueError:
            return False
            
    # 检查URL长度
    if len(request.url) > MAX_URL_LENGTH:
        return False
        
    return True`}</pre>
                <ul className="list-disc pl-6 mt-2 text-sm">
                  <li>优点：基于协议规范，可靠性高</li>
                  <li>缺点：需要深入了解协议</li>
                  <li>适用场景：协议合规性检查</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'config' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">配置与部署</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">1. Snort IPS配置</h4>
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
include $RULE_PATH/community.rules

# 防御模式配置
config daq: afpacket
config daq_mode: inline
config daq_var: buffer_size_mb=128`}</pre>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">2. ModSecurity WAF配置</h4>
                <pre className="bg-white border rounded p-2 text-xs overflow-x-auto">{`# modsecurity.conf 基本配置
SecRuleEngine On
SecRequestBodyAccess On
SecResponseBodyAccess On

# 基本规则
SecRule REQUEST_HEADERS:User-Agent "^$" \
    "id:1,\
    phase:1,\
    deny,\
    status:403,\
    msg:'Empty User Agent'"

# SQL注入防护
SecRule ARGS:username "@contains ' OR '1'='1" \
    "id:2,\
    phase:2,\
    deny,\
    status:403,\
    msg:'SQL Injection Attack'"

# XSS防护
SecRule ARGS "@contains <script>" \
    "id:3,\
    phase:2,\
    deny,\
    status:403,\
    msg:'XSS Attack'"`}</pre>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">3. 部署建议</h4>
                <ul className="list-disc pl-6 text-sm space-y-2">
                  <li><b>网络部署：</b>
                    <ul className="list-disc pl-6">
                      <li>部署在网络边界</li>
                      <li>关键服务器前</li>
                      <li>DMZ区域</li>
                      <li>内部网络边界</li>
                    </ul>
                  </li>
                  <li><b>主机部署：</b>
                    <ul className="list-disc pl-6">
                      <li>关键服务器</li>
                      <li>数据库服务器</li>
                      <li>应用服务器</li>
                      <li>终端设备</li>
                    </ul>
                  </li>
                  <li><b>高可用部署：</b>
                    <ul className="list-disc pl-6">
                      <li>主备部署</li>
                      <li>负载均衡</li>
                      <li>故障转移</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cases' && (
          <div className="space-y-8">
            <h3 className="text-xl font-semibold mb-3">实际案例</h3>
            
            {/* 案例1：SQL注入攻击防御 */}
            <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
              <h4 className="font-bold text-lg mb-2 text-blue-700">案例1：SQL注入攻击防御</h4>
              <div className="mb-2 text-gray-700 text-sm">
                <p>某电商网站遭受SQL注入攻击，通过IPS成功防御。</p>
              </div>
              <div className="mb-2">
                <span className="font-semibold">攻击特征：</span>
                <pre className="bg-white border rounded p-2 text-xs mt-1">{`GET /search.php?keyword=product' OR '1'='1 HTTP/1.1
Host: example.com
User-Agent: Mozilla/5.0`}</pre>
              </div>
              <div className="mb-2">
                <span className="font-semibold">防御措施：</span>
                <ul className="list-disc pl-6 text-sm">
                  <li>特征匹配识别SQL注入</li>
                  <li>实时阻断攻击请求</li>
                  <li>记录攻击源IP</li>
                  <li>通知安全管理员</li>
                </ul>
              </div>
              <div className="mb-2">
                <span className="font-semibold">防御效果：</span>
                <ul className="list-disc pl-6 text-sm">
                  <li>成功阻断攻击</li>
                  <li>保护数据库安全</li>
                  <li>无业务中断</li>
                </ul>
              </div>
            </div>

            {/* 案例2：DDoS攻击防御 */}
            <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
              <h4 className="font-bold text-lg mb-2 text-green-700">案例2：DDoS攻击防御</h4>
              <div className="mb-2 text-gray-700 text-sm">
                <p>某企业网站遭受大规模DDoS攻击，通过IPS成功防御。</p>
              </div>
              <div className="mb-2">
                <span className="font-semibold">攻击特征：</span>
                <ul className="list-disc pl-6 text-sm">
                  <li>大量SYN请求</li>
                  <li>异常流量模式</li>
                  <li>多源IP攻击</li>
                </ul>
              </div>
              <div className="mb-2">
                <span className="font-semibold">防御措施：</span>
                <ul className="list-disc pl-6 text-sm">
                  <li>流量清洗</li>
                  <li>SYN Cookie防护</li>
                  <li>IP限速</li>
                  <li>黑名单封禁</li>
                </ul>
              </div>
              <div className="mb-2">
                <span className="font-semibold">防御效果：</span>
                <ul className="list-disc pl-6 text-sm">
                  <li>成功抵御攻击</li>
                  <li>保持服务可用</li>
                  <li>自动恢复</li>
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
                <ul className="list-disc pl-6 text-sm space-y-2">
                  <li><b>网络部署：</b>
                    <ul className="list-disc pl-6">
                      <li>合理规划部署位置</li>
                      <li>考虑网络性能影响</li>
                      <li>确保高可用性</li>
                      <li>做好容灾备份</li>
                    </ul>
                  </li>
                  <li><b>策略配置：</b>
                    <ul className="list-disc pl-6">
                      <li>基于风险评估</li>
                      <li>最小权限原则</li>
                      <li>定期更新规则</li>
                      <li>测试验证有效性</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">2. 运维管理</h4>
                <ul className="list-disc pl-6 text-sm space-y-2">
                  <li><b>日常维护：</b>
                    <ul className="list-disc pl-6">
                      <li>定期检查系统状态</li>
                      <li>更新特征库</li>
                      <li>优化检测规则</li>
                      <li>备份配置数据</li>
                    </ul>
                  </li>
                  <li><b>性能优化：</b>
                    <ul className="list-disc pl-6">
                      <li>合理配置资源</li>
                      <li>优化检测算法</li>
                      <li>负载均衡部署</li>
                      <li>定期性能评估</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">3. 安全建议</h4>
                <ul className="list-disc pl-6 text-sm space-y-2">
                  <li><b>防护策略：</b>
                    <ul className="list-disc pl-6">
                      <li>多层次防护</li>
                      <li>纵深防御</li>
                      <li>定期评估</li>
                      <li>及时更新</li>
                    </ul>
                  </li>
                  <li><b>应急响应：</b>
                    <ul className="list-disc pl-6">
                      <li>制定应急预案</li>
                      <li>定期演练</li>
                      <li>快速响应</li>
                      <li>持续改进</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/security/protection/ids"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 入侵检测
        </Link>
        <Link 
          href="/study/security/protection/vpn"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          VPN技术 →
        </Link>
      </div>
    </div>
  );
} 
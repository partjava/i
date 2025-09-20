'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ProtocolAnalysisPage() {
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">网络协议分析</h1>

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
          onClick={() => setActiveTab('tools')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'tools'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          常用工具
        </button>
        <button
          onClick={() => setActiveTab('process')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'process'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          分析流程
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
      </div>

      {/* 内容区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === 'basic' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">协议分析基础原理</h3>
            <div className="prose max-w-none mb-4">
              <p>网络协议分析是通过抓包工具对网络通信数据进行捕获、解析和分析，发现异常流量、攻击行为或故障原因。常用于安全检测、故障排查、取证分析等场景。</p>
            </div>
            {/* SVG结构图 */}
            <div className="flex justify-center mb-6">
              <svg width="520" height="120" viewBox="0 0 520 120">
                <rect x="20" y="40" width="80" height="40" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" rx="8" />
                <text x="60" y="65" fontSize="14" fill="#0ea5e9" textAnchor="middle">终端A</text>
                <rect x="120" y="40" width="80" height="40" fill="#fef9c3" stroke="#facc15" strokeWidth="2" rx="8" />
                <text x="160" y="65" fontSize="14" fill="#eab308" textAnchor="middle">交换机</text>
                <rect x="220" y="40" width="80" height="40" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" rx="8" />
                <text x="260" y="65" fontSize="14" fill="#db2777" textAnchor="middle">路由器</text>
                <rect x="320" y="40" width="80" height="40" fill="#f1f5f9" stroke="#64748b" strokeWidth="2" rx="8" />
                <text x="360" y="65" fontSize="14" fill="#334155" textAnchor="middle">终端B</text>
                <rect x="420" y="40" width="80" height="40" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="8" />
                <text x="460" y="65" fontSize="14" fill="#ef4444" textAnchor="middle">抓包分析</text>
                <line x1="100" y1="60" x2="120" y2="60" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="200" y1="60" x2="220" y2="60" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="300" y1="60" x2="320" y2="60" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
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
                <li><b>抓包：</b>捕获网络中的数据包，分析其内容和结构。</li>
                <li><b>协议栈：</b>网络通信的分层结构，如TCP/IP协议栈。</li>
                <li><b>流量过滤：</b>根据条件筛选感兴趣的数据包。</li>
                <li><b>会话重组：</b>将分片的数据包还原为完整会话。</li>
                <li><b>协议字段：</b>如IP、端口、序列号、负载等。</li>
                <li><b>流量特征：</b>如异常流量、攻击特征、明文敏感信息等。</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'tools' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">常用协议分析工具</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="list-disc pl-6 space-y-2">
                <li><b>Wireshark：</b>图形化抓包分析工具，支持多种协议解码。</li>
                <li><b>tcpdump：</b>命令行抓包工具，适合快速过滤和远程分析。</li>
                <li><b>Fiddler：</b>专注于HTTP/HTTPS流量分析，常用于Web调试。</li>
                <li><b>Burp Suite：</b>Web安全测试平台，支持抓包、重放、漏洞扫描等。</li>
                <li><b>Scapy：</b>Python库，可自定义抓包和协议解析。</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded border mt-2">
              <span className="text-xs text-gray-500">代码示例：Python scapy抓包</span>
              <pre className="overflow-x-auto text-sm mt-1"><code>{`from scapy.all import sniff

def packet_callback(packet):
    print(packet.summary())

sniff(filter='tcp', prn=packet_callback, count=5)`}</code></pre>
            </div>
          </div>
        )}

        {activeTab === 'process' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">协议分析流程</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ol className="list-decimal pl-6 space-y-2">
                <li>抓包与过滤：使用工具捕获目标流量，设置过滤条件。</li>
                <li>协议解码与重组：分析协议字段，还原会话内容。</li>
                <li>关键字段提取与统计：提取IP、端口、URL、敏感数据等。</li>
                <li>异常检测与溯源：发现异常流量、攻击行为，定位源头。</li>
              </ol>
            </div>
            <div className="bg-white p-3 rounded border mt-2">
              <span className="text-xs text-gray-500">代码示例：用scapy解析HTTP包</span>
              <pre className="overflow-x-auto text-sm mt-1"><code>{`from scapy.all import sniff
from scapy.layers.inet import TCP
from scapy.layers.http import HTTPRequest

def http_callback(packet):
    if packet.haslayer(HTTPRequest):
        print('HTTP请求:', packet[HTTPRequest].Host, packet[HTTPRequest].Path)

sniff(filter='tcp port 80', prn=http_callback, count=5)`}</code></pre>
            </div>
          </div>
        )}

        {activeTab === 'cases' && (
          <div className="space-y-8">
            <h3 className="text-xl font-semibold mb-3">网络协议分析实际案例</h3>

            {/* 案例1：明文密码泄露分析 */}
            <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
              <h4 className="font-bold text-lg mb-2 text-blue-700">案例1：明文密码泄露分析</h4>
              <div className="mb-2 text-gray-700 text-sm">某公司员工登录OA系统时，安全团队通过抓包发现登录请求为明文HTTP，存在密码泄露风险。</div>
              {/* 抓包流程SVG */}
              <div className="flex justify-center my-3">
                <svg width="420" height="60" viewBox="0 0 420 60">
                  <rect x="10" y="20" width="80" height="30" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" rx="8" />
                  <text x="50" y="40" fontSize="13" fill="#0ea5e9" textAnchor="middle">员工电脑</text>
                  <rect x="110" y="20" width="80" height="30" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" rx="8" />
                  <text x="150" y="40" fontSize="13" fill="#db2777" textAnchor="middle">OA服务器</text>
                  <rect x="210" y="20" width="80" height="30" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="8" />
                  <text x="250" y="40" fontSize="13" fill="#ef4444" textAnchor="middle">抓包分析</text>
                  <line x1="90" y1="35" x2="110" y2="35" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
                  <line x1="190" y1="35" x2="210" y2="35" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
                  <defs>
                    <marker id="arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth">
                      <path d="M0,0 L8,4 L0,8" fill="#64748b" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <div className="mb-2">
                <span className="font-semibold">分析过程：</span>
                <ol className="list-decimal pl-6 text-sm space-y-1">
                  <li>使用Wireshark抓取员工电脑与OA服务器的HTTP流量。</li>
                  <li>筛选<code>POST /login</code>请求，发现<code>password=123456</code>明文传输。</li>
                  <li>确认未使用HTTPS，存在中间人窃听风险。</li>
                </ol>
              </div>
              <div className="mb-2">
                <span className="font-semibold">关键数据：</span>
                <pre className="bg-white border rounded p-2 text-xs overflow-x-auto">POST /login HTTP/1.1
Host: oa.example.com
Content-Type: application/x-www-form-urlencoded

username=alice&password=123456</pre>
              </div>
              <div className="mb-2">
                <span className="font-semibold">结论与建议：</span>
                <ul className="list-disc pl-6 text-sm">
                  <li>敏感数据必须加密传输，强制启用HTTPS。</li>
                  <li>定期巡检业务系统，防止明文传输。</li>
                </ul>
              </div>
            </div>

            {/* 案例2：DDoS攻击溯源 */}
            <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
              <h4 className="font-bold text-lg mb-2 text-green-700">案例2：DDoS攻击溯源与防御</h4>
              <div className="mb-2 text-gray-700 text-sm">某企业网站突发访问量激增，疑似遭遇DDoS攻击。安全团队通过协议分析定位攻击源。</div>
              {/* 攻击流量表格 */}
              <div className="overflow-x-auto my-2">
                <table className="min-w-full text-xs border">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border px-2 py-1">源IP</th>
                      <th className="border px-2 py-1">目标端口</th>
                      <th className="border px-2 py-1">包数</th>
                      <th className="border px-2 py-1">特征</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-2 py-1">192.168.1.100</td>
                      <td className="border px-2 py-1">80</td>
                      <td className="border px-2 py-1">50000</td>
                      <td className="border px-2 py-1">SYN泛洪</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-1">203.0.113.5</td>
                      <td className="border px-2 py-1">80</td>
                      <td className="border px-2 py-1">48000</td>
                      <td className="border px-2 py-1">SYN泛洪</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mb-2">
                <span className="font-semibold">分析过程：</span>
                <ol className="list-decimal pl-6 text-sm space-y-1">
                  <li>用tcpdump抓包，统计SYN包异常流量。</li>
                  <li>分析源IP分布，发现部分IP异常活跃。</li>
                  <li>配合运营商封堵攻击源IP。</li>
                </ol>
              </div>
              <div className="mb-2">
                <span className="font-semibold">关键命令：</span>
                <pre className="bg-white border rounded p-2 text-xs overflow-x-auto">tcpdump 'tcp[tcpflags] & tcp-syn != 0' -n -c 1000</pre>
              </div>
              <div className="mb-2">
                <span className="font-semibold">结论与建议：</span>
                <ul className="list-disc pl-6 text-sm">
                  <li>协议分析有助于快速定位攻击源。</li>
                  <li>建议部署DDoS防护设备，设置流量阈值告警。</li>
                </ul>
              </div>
            </div>

            {/* 案例3：业务逻辑漏洞还原 */}
            <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
              <h4 className="font-bold text-lg mb-2 text-purple-700">案例3：协议分析发现业务逻辑漏洞</h4>
              <div className="mb-2 text-gray-700 text-sm">某电商平台用户反馈账户被盗，安全人员通过抓包还原攻击过程，发现登录接口存在验证码绕过漏洞。</div>
              {/* 攻击流程SVG */}
              <div className="flex justify-center my-3">
                <svg width="340" height="60" viewBox="0 0 340 60">
                  <rect x="10" y="20" width="80" height="30" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" rx="8" />
                  <text x="50" y="40" fontSize="13" fill="#0ea5e9" textAnchor="middle">攻击者</text>
                  <rect x="110" y="20" width="80" height="30" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" rx="8" />
                  <text x="150" y="40" fontSize="13" fill="#db2777" textAnchor="middle">登录接口</text>
                  <rect x="210" y="20" width="80" height="30" fill="#f1f5f9" stroke="#64748b" strokeWidth="2" rx="8" />
                  <text x="250" y="40" fontSize="13" fill="#334155" textAnchor="middle">数据库</text>
                  <line x1="90" y1="35" x2="110" y2="35" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
                  <line x1="190" y1="35" x2="210" y2="35" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
                  <defs>
                    <marker id="arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth">
                      <path d="M0,0 L8,4 L0,8" fill="#64748b" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <div className="mb-2">
                <span className="font-semibold">分析过程：</span>
                <ol className="list-decimal pl-6 text-sm space-y-1">
                  <li>抓包发现登录接口未校验验证码字段。</li>
                  <li>攻击者批量爆破，成功登录多个账户。</li>
                  <li>通过协议重放工具复现漏洞。</li>
                </ol>
              </div>
              <div className="mb-2">
                <span className="font-semibold">关键代码片段：</span>
                <pre className="bg-white border rounded p-2 text-xs overflow-x-auto">{`# Python requests重放登录请求
import requests
url = 'https://shop.example.com/api/login'
data = {"username": "test", "password": "123456"}
for i in range(100):
    r = requests.post(url, data=data)
    print(r.status_code, r.text)`}</pre>
              </div>
              <div className="mb-2">
                <span className="font-semibold">结论与建议：</span>
                <ul className="list-disc pl-6 text-sm">
                  <li>接口必须严格校验验证码，防止自动化爆破。</li>
                  <li>建议增加登录频率限制与异常告警。</li>
                </ul>
              </div>
            </div>

            {/* 实战Tips小结 */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-6">
              <h4 className="font-semibold mb-2 text-blue-800">协议分析实战Tips</h4>
              <ul className="list-disc pl-6 text-sm space-y-1">
                <li>抓包时注意过滤条件，聚焦目标流量。</li>
                <li>结合图形化和命令行工具，提升分析效率。</li>
                <li>多用协议重放、自动化脚本复现问题。</li>
                <li>分析结果要形成报告，便于复盘与整改。</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/security/network/application"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 应用层安全
        </Link>
        <Link 
          href="/study/security/network/device"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          网络设备安全 →
        </Link>
      </div>
    </div>
  );
} 
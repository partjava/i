"use client";
import { useState } from "react";
import Link from "next/link";

export default function SecurityToolsPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">安全工具使用</h1>
      
      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "overview"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          概述
        </button>
        <button
          onClick={() => setActiveTab("network")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "network"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          网络安全工具
        </button>
        <button
          onClick={() => setActiveTab("system")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "system"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          系统安全工具
        </button>
        <button
          onClick={() => setActiveTab("application")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "application"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          应用安全工具
        </button>
        <button
          onClick={() => setActiveTab("best-practices")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "best-practices"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          最佳实践
        </button>
      </div>

      {/* 内容区域 */}
      <div className="space-y-6">
        {activeTab === "overview" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">安全工具概述</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 定义与范畴</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="mb-4">
                  安全工具是指为保障网络、系统、应用程序等信息安全而设计使用的软件或硬件产品。主要包括：
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>网络安全工具：用于监测网络流量、扫描网络漏洞等</li>
                  <li>系统安全工具：用于系统加固、病毒查杀等</li>
                  <li>应用安全工具：用于检测Web应用漏洞、代码审计等</li>
                </ul>
              </div>

              <h4 className="font-semibold">2. 工具分类依据</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">按功能分类</h5>
                    <ul className="list-disc pl-6">
                      <li>检测类工具
                        <ul className="list-disc pl-6 mt-2">
                          <li>漏洞扫描工具</li>
                          <li>入侵检测系统</li>
                          <li>日志分析工具</li>
                        </ul>
                      </li>
                      <li>防护类工具
                        <ul className="list-disc pl-6 mt-2">
                          <li>防火墙</li>
                          <li>杀毒软件</li>
                          <li>WAF</li>
                        </ul>
                      </li>
                      <li>分析类工具
                        <ul className="list-disc pl-6 mt-2">
                          <li>流量分析工具</li>
                          <li>行为分析工具</li>
                          <li>取证分析工具</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">按应用场景分类</h5>
                    <ul className="list-disc pl-6">
                      <li>Web安全工具
                        <ul className="list-disc pl-6 mt-2">
                          <li>Web漏洞扫描器</li>
                          <li>Web应用防火墙</li>
                          <li>Web代理工具</li>
                        </ul>
                      </li>
                      <li>终端安全工具
                        <ul className="list-disc pl-6 mt-2">
                          <li>终端防护软件</li>
                          <li>系统加固工具</li>
                          <li>加密工具</li>
                        </ul>
                      </li>
                      <li>网络安全工具
                        <ul className="list-disc pl-6 mt-2">
                          <li>网络监控工具</li>
                          <li>网络扫描工具</li>
                          <li>流量分析工具</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "network" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">网络安全工具</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 网络流量分析工具</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">Wireshark</h5>
                    <ul className="list-disc pl-6">
                      <li>功能特性
                        <ul className="list-disc pl-6 mt-2">
                          <li>数据包捕获和分析</li>
                          <li>协议解析和过滤</li>
                          <li>流量统计和分析</li>
                          <li>异常流量检测</li>
                        </ul>
                      </li>
                      <li>工作原理
                        <ul className="list-disc pl-6 mt-2">
                          <li>基于libpcap库</li>
                          <li>支持多种协议解析</li>
                          <li>实时捕获和分析</li>
                        </ul>
                      </li>
                      <li>安装配置
                        <pre className="bg-gray-200 p-2 rounded mt-2">
                          <code>{`# Ubuntu安装
sudo apt-get install wireshark

# 配置权限
sudo usermod -a -G wireshark $USER

# 启动Wireshark
wireshark`}</code>
                        </pre>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">tcpdump</h5>
                    <ul className="list-disc pl-6">
                      <li>功能特性
                        <ul className="list-disc pl-6 mt-2">
                          <li>命令行抓包工具</li>
                          <li>支持多种过滤条件</li>
                          <li>适合远程分析</li>
                        </ul>
                      </li>
                      <li>常用命令
                        <pre className="bg-gray-200 p-2 rounded mt-2">
                          <code>{`# 捕获所有接口的流量
tcpdump -i any

# 捕获特定端口的流量
tcpdump port 80

# 保存捕获的数据包
tcpdump -w capture.pcap

# 读取保存的数据包
tcpdump -r capture.pcap`}</code>
                        </pre>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold">2. 网络扫描工具</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">Nmap</h5>
                    <ul className="list-disc pl-6">
                      <li>功能特性
                        <ul className="list-disc pl-6 mt-2">
                          <li>端口扫描</li>
                          <li>服务版本检测</li>
                          <li>操作系统识别</li>
                          <li>漏洞扫描</li>
                        </ul>
                      </li>
                      <li>常用命令
                        <pre className="bg-gray-200 p-2 rounded mt-2">
                          <code>{`# 基本扫描
nmap 192.168.1.1

# 详细扫描
nmap -sV -sC 192.168.1.1

# 操作系统检测
nmap -O 192.168.1.1

# 保存扫描结果
nmap -oN output.txt 192.168.1.1`}</code>
                        </pre>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">Masscan</h5>
                    <ul className="list-disc pl-6">
                      <li>功能特性
                        <ul className="list-disc pl-6 mt-2">
                          <li>高速端口扫描</li>
                          <li>支持大范围IP扫描</li>
                          <li>适合大规模网络</li>
                        </ul>
                      </li>
                      <li>常用命令
                        <pre className="bg-gray-200 p-2 rounded mt-2">
                          <code>{`# 扫描特定端口
masscan 192.168.1.0/24 -p80,443

# 设置扫描速率
masscan 192.168.1.0/24 -p80 --rate 1000

# 保存扫描结果
masscan 192.168.1.0/24 -p80 -oJ output.json`}</code>
                        </pre>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "system" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">系统安全工具</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 系统加固工具</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">Bastille Linux</h5>
                    <ul className="list-disc pl-6">
                      <li>功能特性
                        <ul className="list-disc pl-6 mt-2">
                          <li>系统安全加固</li>
                          <li>服务配置优化</li>
                          <li>访问控制管理</li>
                        </ul>
                      </li>
                      <li>安装配置
                        <pre className="bg-gray-200 p-2 rounded mt-2">
                          <code>{`# 安装Bastille
sudo apt-get install bastille

# 运行加固向导
sudo bastille

# 查看加固状态
sudo bastille --status`}</code>
                        </pre>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">Lynis</h5>
                    <ul className="list-disc pl-6">
                      <li>功能特性
                        <ul className="list-disc pl-6 mt-2">
                          <li>系统安全审计</li>
                          <li>漏洞检测</li>
                          <li>合规性检查</li>
                        </ul>
                      </li>
                      <li>常用命令
                        <pre className="bg-gray-200 p-2 rounded mt-2">
                          <code>{`# 运行安全审计
sudo lynis audit system

# 生成详细报告
sudo lynis audit system --report-file /tmp/lynis-report.txt

# 检查特定类别
sudo lynis audit system --tests-from-group malware`}</code>
                        </pre>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold">2. 杀毒软件</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">ClamAV</h5>
                    <ul className="list-disc pl-6">
                      <li>功能特性
                        <ul className="list-disc pl-6 mt-2">
                          <li>开源杀毒引擎</li>
                          <li>支持多种平台</li>
                          <li>实时监控</li>
                        </ul>
                      </li>
                      <li>常用命令
                        <pre className="bg-gray-200 p-2 rounded mt-2">
                          <code>{`# 安装ClamAV
sudo apt-get install clamav

# 更新病毒库
sudo freshclam

# 扫描文件
clamscan /path/to/file

# 扫描目录
clamscan -r /path/to/directory`}</code>
                        </pre>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">rkhunter</h5>
                    <ul className="list-disc pl-6">
                      <li>功能特性
                        <ul className="list-disc pl-6 mt-2">
                          <li>Rootkit检测</li>
                          <li>系统完整性检查</li>
                          <li>后门检测</li>
                        </ul>
                      </li>
                      <li>常用命令
                        <pre className="bg-gray-200 p-2 rounded mt-2">
                          <code>{`# 安装rkhunter
sudo apt-get install rkhunter

# 更新数据库
sudo rkhunter --update

# 系统检查
sudo rkhunter --check

# 生成报告
sudo rkhunter --report`}</code>
                        </pre>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "application" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">应用安全工具</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. Web应用安全工具</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">OWASP ZAP</h5>
                    <ul className="list-disc pl-6">
                      <li>功能特性
                        <ul className="list-disc pl-6 mt-2">
                          <li>自动化漏洞扫描</li>
                          <li>手动测试工具</li>
                          <li>API测试</li>
                        </ul>
                      </li>
                      <li>使用示例
                        <pre className="bg-gray-200 p-2 rounded mt-2">
                          <code>{`# 启动ZAP
zap.sh

# 命令行扫描
zap-cli quick-scan --self-contained \
  --spider http://example.com \
  --ajax-spider \
  --scan \
  --alert-level High

# 生成报告
zap-cli report -o report.html`}</code>
                        </pre>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">Burp Suite</h5>
                    <ul className="list-disc pl-6">
                      <li>功能特性
                        <ul className="list-disc pl-6 mt-2">
                          <li>Web代理</li>
                          <li>漏洞扫描</li>
                          <li>自动化测试</li>
                        </ul>
                      </li>
                      <li>配置示例
                        <pre className="bg-gray-200 p-2 rounded mt-2">
                          <code>{`# Burp Suite配置
{
  "proxy": {
    "port": 8080,
    "intercept": true
  },
  "scanner": {
    "active_scan": true,
    "passive_scan": true
  }
}`}</code>
                        </pre>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold">2. 代码审计工具</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">SonarQube</h5>
                    <ul className="list-disc pl-6">
                      <li>功能特性
                        <ul className="list-disc pl-6 mt-2">
                          <li>代码质量分析</li>
                          <li>安全漏洞检测</li>
                          <li>多语言支持</li>
                        </ul>
                      </li>
                      <li>配置示例
                        <pre className="bg-gray-200 p-2 rounded mt-2">
                          <code>{`# sonar-project.properties
sonar.projectKey=my-project
sonar.projectName=My Project
sonar.projectVersion=1.0

sonar.sources=src
sonar.java.binaries=target/classes
sonar.java.source=11

# 安全规则配置
sonar.security.sources.javasecurity=true
sonar.security.sources.owasp=true`}</code>
                        </pre>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">CodeQL</h5>
                    <ul className="list-disc pl-6">
                      <li>功能特性
                        <ul className="list-disc pl-6 mt-2">
                          <li>语义代码分析</li>
                          <li>自定义查询</li>
                          <li>多语言支持</li>
                        </ul>
                      </li>
                      <li>使用示例
                        <pre className="bg-gray-200 p-2 rounded mt-2">
                          <code>{`# 创建数据库
codeql database create my-db --language=java

# 运行分析
codeql database analyze my-db \
  security-extended.qls \
  --format=csv \
  --output=results.csv`}</code>
                        </pre>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "best-practices" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">最佳实践</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 工具选择原则</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">选择考虑因素</h5>
                    <ul className="list-disc pl-6">
                      <li>企业预算
                        <ul className="list-disc pl-6 mt-2">
                          <li>开源工具：适合预算有限</li>
                          <li>商业工具：功能完善，技术支持好</li>
                        </ul>
                      </li>
                      <li>网络规模
                        <ul className="list-disc pl-6 mt-2">
                          <li>大型网络：需要可扩展性强的工具</li>
                          <li>小型网络：简单易用的工具即可</li>
                        </ul>
                      </li>
                      <li>业务类型
                        <ul className="list-disc pl-6 mt-2">
                          <li>金融行业：重点关注数据安全</li>
                          <li>电商行业：关注交易安全</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold">2. 使用策略</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">工具组合使用</h5>
                    <ul className="list-disc pl-6">
                      <li>扫描工具组合
                        <ul className="list-disc pl-6 mt-2">
                          <li>Nmap + Nessus：全面扫描</li>
                          <li>OWASP ZAP + Burp Suite：Web安全测试</li>
                        </ul>
                      </li>
                      <li>监控工具组合
                        <ul className="list-disc pl-6 mt-2">
                          <li>Wireshark + Snort：网络监控</li>
                          <li>ELK Stack + Splunk：日志分析</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">使用频率建议</h5>
                    <ul className="list-disc pl-6">
                      <li>定期扫描
                        <ul className="list-disc pl-6 mt-2">
                          <li>漏洞扫描：每月一次</li>
                          <li>系统审计：每季度一次</li>
                        </ul>
                      </li>
                      <li>实时监控
                        <ul className="list-disc pl-6 mt-2">
                          <li>入侵检测：7×24小时</li>
                          <li>日志分析：实时</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold">3. 实用代码示例</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">自动化批量漏洞扫描（Python+Nmap）</h5>
                    <pre className="bg-gray-200 p-2 rounded text-xs overflow-x-auto">
                      <code>{`import nmap

# 批量扫描多个主机的常用端口
scanner = nmap.PortScanner()
targets = ['192.168.1.1', '192.168.1.2']
for host in targets:
    scanner.scan(host, '22,80,443')
    print(scanner[host].state())
    for proto in scanner[host].all_protocols():
        lport = scanner[host][proto].keys()
        for port in lport:
            print(f'{host}:{port} => {scanner[host][proto][port]["state"]}')`}</code>
                    </pre>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h5 className="font-semibold mb-2">CI集成安全扫描（Jenkins+SonarQube）</h5>
                    <pre className="bg-gray-200 p-2 rounded text-xs overflow-x-auto">
                      <code>{`pipeline {
  agent any
  stages {
    stage('代码扫描') {
      steps {
        script {
          sh 'sonar-scanner -Dsonar.projectKey=my-project -Dsonar.sources=src'
        }
      }
    }
    stage('结果分析') {
      steps {
        script {
          // 可根据SonarQube API获取扫描结果并自动阻断
        }
      }
    }
  }
}`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 导航链接 */}
      <div className="mt-8 flex justify-between">
        <Link
          href="/study/security/dev/audit"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 代码审计
        </Link>
        <Link
          href="/study/security/dev/fix"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          漏洞修复 →
        </Link>
      </div>
    </div>
  );
} 
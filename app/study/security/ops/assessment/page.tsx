'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function SecurityOpsAssessmentPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 顶部返回导航 */}
      <div className="mb-4">
        <Link href="/study/security/ops" className="px-4 py-2 text-blue-600 hover:text-blue-800">← 返回安全运维</Link>
      </div>
      <h1 className="text-3xl font-bold mb-8">安全评估</h1>

      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        <button onClick={() => setActiveTab('overview')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>概述</button>
        <button onClick={() => setActiveTab('method')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'method' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>评估方法</button>
        <button onClick={() => setActiveTab('tool')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'tool' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>评估工具</button>
        <button onClick={() => setActiveTab('process')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'process' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>评估流程</button>
        <button onClick={() => setActiveTab('report')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'report' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>评估报告</button>
        <button onClick={() => setActiveTab('case')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'case' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>实践案例</button>
      </div>

      {/* 内容区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">安全评估概述</h3>
            <div className="prose max-w-none">
              <p>安全评估是识别、分析和评估系统安全风险的重要过程，通过系统化的方法发现潜在的安全问题，并提供改进建议。</p>
              <ul className="list-disc pl-6">
                <li>识别安全风险</li>
                <li>评估安全控制</li>
                <li>发现安全漏洞</li>
                <li>提供改进建议</li>
                <li>验证安全措施</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'method' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">评估方法</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold text-lg mb-2">主要评估方法</h4>
              <ul className="list-disc pl-6">
                <li>漏洞扫描
                  <ul className="list-disc pl-6">
                    <li>自动化扫描工具</li>
                    <li>漏洞库比对</li>
                    <li>配置检查</li>
                  </ul>
                </li>
                <li>渗透测试
                  <ul className="list-disc pl-6">
                    <li>模拟攻击</li>
                    <li>漏洞利用</li>
                    <li>权限提升</li>
                  </ul>
                </li>
                <li>代码审计
                  <ul className="list-disc pl-6">
                    <li>静态分析</li>
                    <li>动态分析</li>
                    <li>人工审查</li>
                  </ul>
                </li>
                <li>安全配置检查
                  <ul className="list-disc pl-6">
                    <li>基线检查</li>
                    <li>合规性检查</li>
                    <li>最佳实践检查</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'tool' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">评估工具</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold text-lg mb-2">常用评估工具</h4>
              <ul className="list-disc pl-6">
                <li>漏洞扫描工具
                  <ul className="list-disc pl-6">
                    <li>Nessus</li>
                    <li>OpenVAS</li>
                    <li>Nmap</li>
                  </ul>
                </li>
                <li>渗透测试工具
                  <ul className="list-disc pl-6">
                    <li>Metasploit</li>
                    <li>Burp Suite</li>
                    <li>OWASP ZAP</li>
                  </ul>
                </li>
                <li>代码审计工具
                  <ul className="list-disc pl-6">
                    <li>SonarQube</li>
                    <li>Fortify</li>
                    <li>Checkmarx</li>
                  </ul>
                </li>
                <li>配置检查工具
                  <ul className="list-disc pl-6">
                    <li>OpenSCAP</li>
                    <li>CIS-CAT</li>
                    <li>Lynis</li>
                  </ul>
                </li>
              </ul>

              <h4 className="font-semibold text-lg mb-2">进阶：综合漏洞扫描与报告自动生成脚本</h4>
              <pre className="bg-gray-100 p-4 rounded mb-4">
{`import subprocess
import json
from datetime import datetime

def run_nmap(target):
    cmd = f"nmap -sV -oX nmap_result.xml {target}"
    subprocess.run(cmd, shell=True)
    print("Nmap 扫描完成，结果已保存为 nmap_result.xml")

def run_openvas(target):
    # 这里只做命令示例，实际需配置OpenVAS环境
    cmd = f"omp -u admin -w admin --xml '<create_target><name>target1</name><hosts>{target}</hosts></create_target>'"
    subprocess.run(cmd, shell=True)
    print("OpenVAS 扫描命令已执行")

def generate_report(results):
    report = {
        "scan_time": datetime.now().isoformat(),
        "findings": results
    }
    with open('security_report.json', 'w') as f:
        json.dump(report, f, indent=2)
    print("安全评估报告已生成：security_report.json")

if __name__ == '__main__':
    run_nmap('192.168.1.1')
    run_openvas('192.168.1.1')
    generate_report([
        {"type": "port_scan", "result": "无高危端口暴露"},
        {"type": "vuln_scan", "result": "发现1个中危漏洞"}
    ])
`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'process' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">评估流程</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold text-lg mb-2">评估步骤</h4>
              <ol className="list-decimal pl-6">
                <li>准备阶段
                  <ul className="list-disc pl-6">
                    <li>确定评估范围</li>
                    <li>制定评估计划</li>
                    <li>准备评估工具</li>
                  </ul>
                </li>
                <li>信息收集
                  <ul className="list-disc pl-6">
                    <li>系统信息收集</li>
                    <li>网络拓扑分析</li>
                    <li>资产清单整理</li>
                  </ul>
                </li>
                <li>漏洞扫描
                  <ul className="list-disc pl-6">
                    <li>执行自动化扫描</li>
                    <li>分析扫描结果</li>
                    <li>验证漏洞真实性</li>
                  </ul>
                </li>
                <li>渗透测试
                  <ul className="list-disc pl-6">
                    <li>模拟攻击测试</li>
                    <li>漏洞利用验证</li>
                    <li>权限提升测试</li>
                  </ul>
                </li>
                <li>结果分析
                  <ul className="list-disc pl-6">
                    <li>风险评估</li>
                    <li>漏洞分类</li>
                    <li>改进建议</li>
                  </ul>
                </li>
              </ol>

              <h4 className="font-semibold text-lg mb-2">进阶：自动化配置基线检查脚本</h4>
              <pre className="bg-gray-100 p-4 rounded mb-4">
{`import subprocess

def check_password_policy():
    result = subprocess.getoutput("grep PASS_MAX_DAYS /etc/login.defs")
    print("密码最大使用天数配置：", result)

def check_firewall():
    result = subprocess.getoutput("ufw status")
    print("防火墙状态：", result)

def check_ssh():
    result = subprocess.getoutput("grep PermitRootLogin /etc/ssh/sshd_config")
    print("SSH Root 登录配置：", result)

if __name__ == '__main__':
    check_password_policy()
    check_firewall()
    check_ssh()
`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'report' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">评估报告</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold text-lg mb-2">报告内容</h4>
              <ul className="list-disc pl-6">
                <li>执行摘要
                  <ul className="list-disc pl-6">
                    <li>评估概述</li>
                    <li>主要发现</li>
                    <li>风险等级</li>
                  </ul>
                </li>
                <li>评估详情
                  <ul className="list-disc pl-6">
                    <li>评估范围</li>
                    <li>评估方法</li>
                    <li>评估过程</li>
                  </ul>
                </li>
                <li>漏洞清单
                  <ul className="list-disc pl-6">
                    <li>漏洞描述</li>
                    <li>风险等级</li>
                    <li>影响范围</li>
                  </ul>
                </li>
                <li>改进建议
                  <ul className="list-disc pl-6">
                    <li>修复方案</li>
                    <li>加固建议</li>
                    <li>最佳实践</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'case' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">实践案例</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold text-lg mb-2">案例一：Web应用安全评估</h4>
              <ol className="list-decimal pl-6">
                <li>评估背景
                  <ul className="list-disc pl-6">
                    <li>电商网站安全评估</li>
                    <li>发现多个高危漏洞</li>
                    <li>涉及用户数据安全</li>
                  </ul>
                </li>
                <li>评估过程
                  <ul className="list-disc pl-6">
                    <li>漏洞扫描</li>
                    <li>渗透测试</li>
                    <li>代码审计</li>
                  </ul>
                </li>
                <li>主要发现
                  <ul className="list-disc pl-6">
                    <li>SQL注入漏洞</li>
                    <li>XSS跨站脚本</li>
                    <li>越权访问</li>
                  </ul>
                </li>
                <li>改进建议
                  <ul className="list-disc pl-6">
                    <li>输入验证</li>
                    <li>参数过滤</li>
                    <li>访问控制</li>
                  </ul>
                </li>
              </ol>

              <h4 className="font-semibold text-lg mb-2">案例二：系统安全评估</h4>
              <ol className="list-decimal pl-6">
                <li>评估背景
                  <ul className="list-disc pl-6">
                    <li>企业内网系统评估</li>
                    <li>发现配置问题</li>
                    <li>存在安全隐患</li>
                  </ul>
                </li>
                <li>评估过程
                  <ul className="list-disc pl-6">
                    <li>配置检查</li>
                    <li>漏洞扫描</li>
                    <li>渗透测试</li>
                  </ul>
                </li>
                <li>主要发现
                  <ul className="list-disc pl-6">
                    <li>弱密码策略</li>
                    <li>未打补丁</li>
                    <li>权限过大</li>
                  </ul>
                </li>
                <li>改进建议
                  <ul className="list-disc pl-6">
                    <li>密码策略</li>
                    <li>补丁管理</li>
                    <li>权限控制</li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/security/ops/recovery"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回灾难恢复
        </Link>
        <Link 
          href="/study/security/ops"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          返回安全运维 →
        </Link>
      </div>
    </div>
  );
} 
'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: '安全评估',
  chapterNumber: 10,
  totalChapters: 10,
  subjectHref: '/study/security/ops',
  prevChapter: { label: '灾难恢复', href: '/study/security/ops/recovery' },
  nextChapter: { label: '区块链安全基础', href: '/study/security/blockchain/basic' },
  theme: THEMES.security,
}

const vulnScanCode = `import subprocess
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
    ])`

const configCheckCode = `import subprocess

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
    check_ssh()`

const SPREADS = [
  {
    label: '概述',
    left: (
      <div className="space-y-4">
        <PageTitle>安全评估概述</PageTitle>
        <BookParagraph>
          安全评估是识别、分析和评估系统安全风险的重要过程，通过系统化的方法发现潜在的安全问题，并提供改进建议。
        </BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>核心目标</SectionTitle>
        <BookList items={[
          '识别安全风险',
          '评估安全控制',
          '发现安全漏洞',
          '提供改进建议',
          '验证安全措施',
        ]} />
      </div>
    ),
  },
  {
    label: '评估方法',
    left: (
      <div className="space-y-4">
        <PageTitle>评估方法</PageTitle>
        <SectionTitle>主要评估方法</SectionTitle>
        <BookParagraph>
          安全评估采用多种方法相结合的方式，从不同角度全面评估系统的安全状况。
        </BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookList items={[
          <span key="1">漏洞扫描<BookList tight items={['自动化扫描工具', '漏洞库比对', '配置检查']} /></span>,
          <span key="2">渗透测试<BookList tight items={['模拟攻击', '漏洞利用', '权限提升']} /></span>,
          <span key="3">代码审计<BookList tight items={['静态分析', '动态分析', '人工审查']} /></span>,
          <span key="4">安全配置检查<BookList tight items={['基线检查', '合规性检查', '最佳实践检查']} /></span>,
        ]} />
      </div>
    ),
  },
  {
    label: '评估工具',
    left: (
      <div className="space-y-4">
        <PageTitle>评估工具</PageTitle>
        <SectionTitle>常用评估工具</SectionTitle>
        <BookList items={[
          <span key="1">漏洞扫描工具<BookList tight items={['Nessus', 'OpenVAS', 'Nmap']} /></span>,
          <span key="2">渗透测试工具<BookList tight items={['Metasploit', 'Burp Suite', 'OWASP ZAP']} /></span>,
          <span key="3">代码审计工具<BookList tight items={['SonarQube', 'Fortify', 'Checkmarx']} /></span>,
          <span key="4">配置检查工具<BookList tight items={['OpenSCAP', 'CIS-CAT', 'Lynis']} /></span>,
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>进阶：综合漏洞扫描与报告自动生成脚本</SectionTitle>
        <BookCode language="python" code={vulnScanCode} />
      </div>
    ),
  },
  {
    label: '评估流程',
    left: (
      <div className="space-y-4">
        <PageTitle>评估流程</PageTitle>
        <SectionTitle>评估步骤</SectionTitle>
        <BookParagraph>
          安全评估需要遵循标准化的流程，确保评估工作的系统性和完整性。
        </BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookList ordered items={[
          <span key="1">准备阶段<BookList tight items={['确定评估范围', '制定评估计划', '准备评估工具']} /></span>,
          <span key="2">信息收集<BookList tight items={['系统信息收集', '网络拓扑分析', '资产清单整理']} /></span>,
          <span key="3">漏洞扫描<BookList tight items={['执行自动化扫描', '分析扫描结果', '验证漏洞真实性']} /></span>,
          <span key="4">渗透测试<BookList tight items={['模拟攻击测试', '漏洞利用验证', '权限提升测试']} /></span>,
          <span key="5">结果分析<BookList tight items={['风险评估', '漏洞分类', '改进建议']} /></span>,
        ]} />
        <SectionTitle>进阶：自动化配置基线检查脚本</SectionTitle>
        <BookCode language="python" code={configCheckCode} />
      </div>
    ),
  },
  {
    label: '评估报告',
    left: (
      <div className="space-y-4">
        <PageTitle>评估报告</PageTitle>
        <SectionTitle>报告内容</SectionTitle>
        <BookParagraph>
          评估报告是安全评估的重要产出，需要全面、清晰地呈现评估结果和改进建议。
        </BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookList items={[
          <span key="1">执行摘要<BookList tight items={['评估概述', '主要发现', '风险等级']} /></span>,
          <span key="2">评估详情<BookList tight items={['评估范围', '评估方法', '评估过程']} /></span>,
          <span key="3">漏洞清单<BookList tight items={['漏洞描述', '风险等级', '影响范围']} /></span>,
          <span key="4">改进建议<BookList tight items={['修复方案', '加固建议', '最佳实践']} /></span>,
        ]} />
      </div>
    ),
  },
  {
    label: '实践案例',
    left: (
      <div className="space-y-4">
        <PageTitle>实践案例</PageTitle>
        <SectionTitle>案例一：Web应用安全评估</SectionTitle>
        <BookList ordered items={[
          <span key="1">评估背景<BookList tight items={['电商网站安全评估', '发现多个高危漏洞', '涉及用户数据安全']} /></span>,
          <span key="2">评估过程<BookList tight items={['漏洞扫描', '渗透测试', '代码审计']} /></span>,
          <span key="3">主要发现<BookList tight items={['SQL注入漏洞', 'XSS跨站脚本', '越权访问']} /></span>,
          <span key="4">改进建议<BookList tight items={['输入验证', '参数过滤', '访问控制']} /></span>,
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>案例二：系统安全评估</SectionTitle>
        <BookList ordered items={[
          <span key="1">评估背景<BookList tight items={['企业内网系统评估', '发现配置问题', '存在安全隐患']} /></span>,
          <span key="2">评估过程<BookList tight items={['配置检查', '漏洞扫描', '渗透测试']} /></span>,
          <span key="3">主要发现<BookList tight items={['弱密码策略', '未打补丁', '权限过大']} /></span>,
          <span key="4">改进建议<BookList tight items={['密码策略', '补丁管理', '权限控制']} /></span>,
        ]} />
      </div>
    ),
  },
]

export default function SecurityOpsAssessmentPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

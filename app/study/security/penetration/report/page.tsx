"use client";
import { useState } from "react";
import Link from "next/link";

export default function PenetrationReportPage() {
  const [activeTab, setActiveTab] = useState("structure");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">渗透测试报告</h1>
      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        <button
          onClick={() => setActiveTab("structure")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "structure"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          报告结构
        </button>
        <button
          onClick={() => setActiveTab("writing")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "writing"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          编写要点
        </button>
        <button
          onClick={() => setActiveTab("template")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "template"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          常见模板
        </button>
        <button
          onClick={() => setActiveTab("tools")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "tools"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          自动化工具与示例
        </button>
      </div>
      {/* 内容区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === "structure" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">渗透测试报告结构</h3>
            <div className="prose max-w-none">
              <ol className="list-decimal pl-6">
                <li>封面与声明：项目名称、测试时间、测试范围、保密声明等</li>
                <li>管理摘要：整体风险、主要发现、修复建议，适合管理层快速了解</li>
                <li>测试方法与范围：测试目标、测试流程、工具与方法说明</li>
                <li>详细漏洞列表：每个漏洞的描述、复现过程、截图、危害、修复建议</li>
                <li>风险评估与优先级：风险矩阵、漏洞分级、修复优先级</li>
                <li>结论与建议：整体安全建议、后续改进方向</li>
                <li>附录：测试日志、工具清单、参考资料等</li>
              </ol>
              <h4 className="font-semibold mt-4">典型报告片段示例</h4>
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                <code>{`## 管理摘要
本次渗透测试共发现高危漏洞3项，中危漏洞7项，低危漏洞12项。建议优先修复高危和中危问题。

## 漏洞详情
### SQL注入漏洞
- 位置：/login
- 影响：可获取全部用户信息
- 复现：' OR 1=1--
- 修复建议：使用参数化查询，过滤特殊字符`}</code>
              </pre>
            </div>
            {/* SVG报告流程与风险矩阵图 */}
            <div className="my-8">
              <svg width="900" height="420" viewBox="0 0 900 420" className="w-full">
                <defs>
                  <linearGradient id="reportMain" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                  <linearGradient id="riskMatrix" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#f472b6" />
                  </linearGradient>
                  <filter id="reportShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#888" />
                  </filter>
                </defs>
                {/* 报告流程 */}
                <g filter="url(#reportShadow)">
                  <rect x="80" y="60" width="120" height="60" rx="20" fill="url(#reportMain)" />
                  <text x="140" y="95" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold">管理摘要</text>
                  <rect x="240" y="60" width="120" height="60" rx="20" fill="url(#reportMain)" />
                  <text x="300" y="95" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold">测试方法</text>
                  <rect x="400" y="60" width="120" height="60" rx="20" fill="url(#reportMain)" />
                  <text x="460" y="95" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold">漏洞列表</text>
                  <rect x="560" y="60" width="120" height="60" rx="20" fill="url(#reportMain)" />
                  <text x="620" y="95" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold">风险评估</text>
                  <rect x="720" y="60" width="120" height="60" rx="20" fill="url(#reportMain)" />
                  <text x="780" y="95" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold">结论建议</text>
                </g>
                {/* 风险矩阵 */}
                <g>
                  <rect x="200" y="180" width="500" height="200" rx="24" fill="url(#riskMatrix)" opacity="0.15" />
                  {/* 矩阵分区 */}
                  <rect x="220" y="200" width="140" height="60" fill="#fbbf24" opacity="0.7" />
                  <rect x="360" y="200" width="140" height="60" fill="#f59e42" opacity="0.7" />
                  <rect x="500" y="200" width="140" height="60" fill="#f472b6" opacity="0.7" />
                  <rect x="220" y="260" width="140" height="60" fill="#34d399" opacity="0.7" />
                  <rect x="360" y="260" width="140" height="60" fill="#06b6d4" opacity="0.7" />
                  <rect x="500" y="260" width="140" height="60" fill="#6366f1" opacity="0.7" />
                  {/* 文字 */}
                  <text x="290" y="235" textAnchor="middle" fill="#fff" fontSize="16">高危</text>
                  <text x="430" y="235" textAnchor="middle" fill="#fff" fontSize="16">中危</text>
                  <text x="570" y="235" textAnchor="middle" fill="#fff" fontSize="16">低危</text>
                  <text x="290" y="295" textAnchor="middle" fill="#fff" fontSize="16">高影响</text>
                  <text x="430" y="295" textAnchor="middle" fill="#fff" fontSize="16">中影响</text>
                  <text x="570" y="295" textAnchor="middle" fill="#fff" fontSize="16">低影响</text>
                </g>
              </svg>
            </div>
          </div>
        )}
        {activeTab === "writing" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">渗透测试报告编写要点</h3>
            <div className="prose max-w-none">
              <ul>
                <li>语言简明、结构清晰，便于管理层和技术人员理解</li>
                <li>每个漏洞需包含：描述、影响、复现步骤、截图、危害、修复建议</li>
                <li>风险分级要有依据（CVSS、业务影响等）</li>
                <li>建议部分要具体可操作，避免空泛</li>
                <li>敏感信息脱敏，遵守保密协议</li>
                <li>可附加自动化脚本、POC、复现命令等</li>
              </ul>
              <h4 className="font-semibold mt-4">漏洞复现命令/脚本示例</h4>
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                <code>{`# SQL注入POC
curl "http://target.com/login?user=admin'--&pass=123"

# XSS复现
curl "http://target.com/search?q=<script>alert(1)</script>"

# 自动化报告生成脚本
python3 gen_report.py --input result.json --output report.md`}</code>
              </pre>
            </div>
          </div>
        )}
        {activeTab === "template" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">常见渗透测试报告模板</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">Markdown报告模板片段</h4>
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                <code>{`# 渗透测试报告

## 一、管理摘要
简要说明测试目标、主要发现、整体风险。

## 二、测试范围与方法
- 测试目标：
- 测试时间：
- 测试方法：

## 三、漏洞详情
### 漏洞名称
- 位置：
- 影响：
- 复现步骤：
- 修复建议：

## 四、风险评估
| 漏洞 | 风险等级 | 影响范围 | 修复建议 |
|------|----------|----------|----------|
| SQL注入 | 高 | 全站 | 参数化查询 |

## 五、结论与建议
整体安全建议与后续改进方向。

## 六、附录
工具清单、测试日志、参考资料等。`}</code>
              </pre>
              <h4 className="font-semibold mt-4">自动化报告生成工具</h4>
              <ul>
                <li><b>Dradis：</b> 专业渗透测试报告协作平台</li>
                <li><b>Serpico：</b> 可自定义模板的自动化报告工具</li>
                <li><b>Faraday：</b> 多人协作与自动化集成平台</li>
                <li><b>自定义Python脚本：</b> 解析扫描结果自动生成Markdown/PDF</li>
              </ul>
            </div>
          </div>
        )}
        {activeTab === "tools" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">自动化工具与报告实践</h3>
            <div className="prose max-w-none">
              <ul>
                <li><b>Vulnreport：</b> 漏洞管理与报告自动化平台</li>
                <li><b>ReportPortal：</b> 集成测试与报告自动化</li>
                <li><b>自定义脚本：</b> 结合Jinja2、Pandoc等批量生成报告</li>
                <li><b>截图与证据自动整理：</b> 使用Pillow、Selenium等自动化截图</li>
              </ul>
              <h4 className="font-semibold mt-4">自动化报告脚本示例</h4>
              <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto mt-2">
                <code>{`# Jinja2批量生成报告
python3 render_report.py --template template.md --data result.json --output report.md

# Pandoc转换Markdown为PDF
pandoc report.md -o report.pdf

# Selenium自动截图
python3 screenshot.py --url http://target.com --output shot.png`}</code>
              </pre>
              <h4 className="font-semibold mt-4">报告交付与沟通建议</h4>
              <ul>
                <li>报告交付前再次校对，确保无敏感信息泄露</li>
                <li>与客户进行报告讲解，答疑解惑</li>
                <li>协助制定修复计划，跟踪整改进度</li>
                <li>可提供二次复测与安全加固建议</li>
              </ul>
            </div>
          </div>
        )}
      </div>
      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link
          href="/study/security/penetration/social"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 社会工程学
        </Link>
        <Link
          href="/study/security/penetration/basic"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          渗透测试基础
        </Link>
      </div>
    </div>
  );
} 
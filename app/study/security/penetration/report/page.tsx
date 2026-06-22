'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookAlert, BookList, TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全', chapterTitle: '渗透测试报告', chapterNumber: 10,
  totalChapters: 10, subjectHref: '/study/security/penetration',
  prevChapter: { label: '社会工程学', href: '/study/security/penetration/social' },
  theme: THEMES.security,
}

const SPREADS = [
  {
    label: '报告结构',
    left: (
      <div className="space-y-4">
        <PageTitle>渗透测试报告结构</PageTitle>
        <BookList items={['封面与声明：项目名称、测试时间、测试范围、保密声明等', '管理摘要：整体风险、主要发现、修复建议，适合管理层快速了解', '测试方法与范围：测试目标、测试流程、工具与方法说明', '详细漏洞列表：每个漏洞的描述、复现过程、截图、危害、修复建议', '风险评估与优先级：风险矩阵、漏洞分级、修复优先级', '结论与建议：整体安全建议、后续改进方向', '附录：测试日志、工具清单、参考资料等']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>典型报告片段</PageTitle>
        <BookCode language="text" code={`## 管理摘要
本次渗透测试共发现高危漏洞3项，中危漏洞7项，低危漏洞12项。建议优先修复高危和中危问题。

## 漏洞详情
### SQL注入漏洞
- 位置：/login
- 影响：可获取全部用户信息
- 复现：' OR 1=1--
- 修复建议：使用参数化查询，过滤特殊字符`} />
      </div>
    ),
  },
  {
    label: '编写要点',
    left: (
      <div className="space-y-4">
        <PageTitle>报告编写要点</PageTitle>
        <BookList items={['语言简明、结构清晰，便于管理层和技术人员理解', '每个漏洞需包含：描述、影响、复现步骤、截图、危害、修复建议', '风险分级要有依据（CVSS、业务影响等）', '建议部分要具体可操作，避免空泛', '敏感信息脱敏，遵守保密协议', '可附加自动化脚本、POC、复现命令等']} />
        <BookCode language="bash" code={`# SQL注入POC
curl "http://target.com/login?user=admin'--&pass=123"

# XSS复现
curl "http://target.com/search?q=<script>alert(1)</script>"

# 自动化报告生成脚本
python3 gen_report.py --input result.json --output report.md`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>报告模板</PageTitle>
        <BookCode language="markdown" code={`# 渗透测试报告

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
工具清单、测试日志、参考资料等。`} />
      </div>
    ),
  },
  {
    label: '自动化工具',
    left: (
      <div className="space-y-4">
        <PageTitle>自动化报告生成工具</PageTitle>
        <BookList items={['Dradis：专业渗透测试报告协作平台', 'Serpico：可自定义模板的自动化报告工具', 'Faraday：多人协作与自动化集成平台', '自定义Python脚本：解析扫描结果自动生成Markdown/PDF']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>自动化脚本示例</PageTitle>
        <BookCode language="bash" code={`# Jinja2批量生成报告
python3 render_report.py --template template.md --data result.json --output report.md

# Pandoc转换Markdown为PDF
pandoc report.md -o report.pdf

# Selenium自动截图
python3 screenshot.py --url http://target.com --output shot.png`} />
        <BookAlert type="info" message="报告交付前再次校对，确保无敏感信息泄露。与客户进行报告讲解，答疑解惑。协助制定修复计划，跟踪整改进度。可提供二次复测与安全加固建议。" />
      </div>
    ),
  },
]

export default function PenetrationReportPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

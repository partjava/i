# 旧页面迁移模板指南

## 任务

将旧格式的学习页面（Ant Design Tabs / useState 手动 Tab / 纯 Tailwind）迁移为书本翻页模板格式。

---

## 模板格式

### 首页（科目封面）

```tsx
'use client'

import BookCover from '@/app/components/ui/book/BookCover'
import { THEMES } from '@/app/components/ui/book/theme'

const CHAPTERS = [
  { number: 1, title: '第一章', description: '描述', href: '/study/ai/xxx/ch1' },
  // ... 全部章节，从导航数据获取
]

export default function SubjectHomePage() {
  return (
    <BookCover
      title="科目名"
      subtitle="English Name"
      description="一句话描述"
      chapterCount={CHAPTERS.length}
      totalHours={??}
      chapters={CHAPTERS}
      icon="🤖"
      startHref="/study/ai/xxx/ch1"
      theme={THEMES.ai}           // 主题按方向选
    />
  )
}
```

> ⚠️ 旧首页的额外内容（课程特点、学习路径、职业发展、学习建议等）必须保留，放在 `BookCover` 下方。

### 章节页

```tsx
'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookAlert, BookList, TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '科目名',
  chapterTitle: '当前章节标题',
  chapterNumber: 1,                // 从1开始
  totalChapters: 10,               // 该科目总章数
  subjectHref: '/study/ai/xxx',
  prevChapter: { label: '上一章', href: '/study/ai/xxx/prev' },   // 第一章无
  nextChapter: { label: '下一章', href: '/study/ai/xxx/next' },   // 最后一章无
  theme: THEMES.ai,                // 必填！
}

const SPREADS = [
  {
    label: '标签名',               // 相当于tab名
    left: (<div className="space-y-4">{/* 左页 */}</div>),
    right: (<div className="space-y-4">{/* 右页 */}</div>),
  },
]

export default function Page() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
```

---

## 组件映射

| 旧格式 | 新模板组件 | 说明 |
|--------|-----------|------|
| `<Title>` / `<h1>`~`<h3>` | `<PageTitle>` | 页面标题 |
| `<h3>` / `<h4>` | `<SectionTitle>` | 小节标题 |
| `<Paragraph>` / `<p>` | `<BookParagraph>` | 正文段落 |
| `<pre>` / `<CodeBlock>` | `<BookCode language="..." code={...} />` | code 是 prop！ |
| `<Alert>` (antd) | `<BookAlert type="info/success/warning"` | message 传纯字符串 |
| `<ul>` / `<li>` | `<BookList items={[...]} />` | **items 必须纯字符串！** |
| `<ol>` | `<BookList items={[...]} ordered />` | **items 必须纯字符串！** |
| `<Collapse>` | 直接展示，不要折叠 |
| `<Divider>` | `<BookDivider />` |

---

## 🚨 铁律（违反必报错/扣分）

### 0. 🔴 代码示例一字不改（最优先级）
**所有代码示例（示例代码/代码块/完整可运行代码）必须逐字保留，不得做任何修改。**
- 不能压缩代码行数（多行代码保持多行）
- 不能删除代码注释和docstring
- 不能改写代码逻辑或变量名
- 不能将多行代码合并为单行
- 不能修改代码格式和缩进
- 代码段中所有文字（中文注释、英文注释、输出文本）全部保留

```tsx
// ❌ 禁止：压缩代码
<BookCode language="python" code={`import torch\nmodel=torch.nn.Linear(10,1)`} />

// ✅ 正确：保留原始多行格式
<BookCode language="python" code={`import torch
import torch.nn as nn

# 定义模型
class SimpleModel(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc = nn.Linear(10, 1)

    def forward(self, x):
        return self.fc(x)`} />
```

> **这些代码是用于学习者参考的示例，任何修改都会导致学习者无法正常学习使用。**

### 1. BookList items 必须纯字符串
```tsx
// ❌ 禁止
<BookList items={[<><strong>硬件层：</strong>物理设备</>]} />
// ✅ 正确
<BookList items={['硬件层：物理设备']} />
```

### 2. BookAlert message 必须纯字符串
```tsx
// ❌ 禁止
<BookAlert type="info" message={<ul><li>要点A</li></ul>} />
// ✅ 正确
<BookAlert type="info" message="要点A，要点B。" />
```

### 3. BookCode 用 code prop，不用 children
```tsx
// ❌ 禁止
<BookCode language="python">{`code`}</BookCode>
// ✅ 正确
<BookCode language="python" code={`code`} />
```

### 4. 关闭标签名必须匹配
```tsx
// ❌ Syntax Error
<BookParagraph>内容</Paragraph>
// ✅ 正确
<BookParagraph>内容</BookParagraph>
```

### 5. 中文引号用「」不用""
```tsx
// ❌ 双引号会关闭JSX属性值
<BookAlert message="冯·诺依曼瓶颈是"冯诺依曼瓶颈"" />
// ✅
<BookAlert message="冯·诺依曼瓶颈是「冯诺依曼瓶颈」" />
```

### 6. JSX文本中 {id} 花括号要转义
```tsx
// ❌ 报 Cannot find name 'id'
<BookParagraph>GET /user/{id}</BookParagraph>
// ✅
<BookParagraph>{`GET /user/{id}`}</BookParagraph>
```

### 7. JSX文本中 > 用 &gt;，& 用 &amp;
BookCode 的 code 模板字符串内不需要转义，只有 JSX 文本中需要。

### 8. 模板字面量中的 ${VAR} 要转义
```tsx
// ❌ 报 Cannot find name 'BACKUP_PATH'
<BookCode language="bash" code={`tar czf "${BACKUP_PATH}/backup.tar.gz"`} />
// ✅ 转义 $
<BookCode language="bash" code={`tar czf "\${BACKUP_PATH}/backup.tar.gz"`} />
// ✅ 或用外部常量
const script = '...${BACKUP_PATH}...'
<BookCode language="bash" code={script} />
```

### 9. 智能引号 "" 是非法字符
U+201C/U+201D 会被 TS 解析为非法字符，只能用普通引号或「」。

### 10. 不要使用任何 antd 组件
禁止使用 Card、Typography、Title、Paragraph、Text、Tabs、Divider、Table 等。

### 11. Collapse 全部展开显示
原 Collapse 面板内容直接展示，不要折叠。

---

## 📐 内容完整性核对方法

**写完后必须逐页对比原始文件，确保不丢内容：**

```bash
# 获取原始 tab 数
git show HEAD:path/to/page.tsx | grep "label:" | wc -l

# 对比迁移后的 spread 数
grep "label:" path/to/page.tsx | wc -l
```

**经验法则：每个原始 tab ≈ 0.5~1 个 spread。** 如果 spread 数明显少于 tab 数，说明压缩了。

**最容易丢失的内容：**
- 「综合示例/代码示例」tab — 完整可运行代码
- 「练习/练习题」— 列表项数量（原文3题只写2题）
- 「拓展资源/拓展阅读」— 外部链接
- 「常见问题」— FAQ 列表项被合并
- SVG 示意图、流程图
- 详细的代码注释/docstring

**代码块的常见问题：**
- Python f-string 中的 `{epoch+1}` 在 JS 模板字面量中是合法的（只有 `${}` 触发解析）
- 大段代码应抽成外部 `const xxxCode = \`...\`` 再传入 `code={xxxCode}`
- 不要压缩代码行数，原始完整代码全部保留

---

## 主题配色

```tsx
import { THEMES } from '@/app/components/ui/book/theme'

THEMES.computer  // 💻 宣纸白 + 鸾尾蓝（计算机用）
THEMES.ai        // 🤖 嫩菊绿 + 幽谷灰（人工智能用）
THEMES.software  // 🧩 海天蓝 + 蒽油绿（软工用）
THEMES.security  // 🔒 烟雨白 + 紫幽兰（安全用）
THEMES.frost     // ❄️ 冰雾白 + 雾灰蓝（可选）
THEMES.cream     // 🧈 冰雾白 + 奶油杏（可选）
```

---

## META 导航规则

```
第一章：无 prevChapter
中间章：prevChapter + nextChapter 首尾相连
最后一章：无 nextChapter
```

### 科目间导航链（网络安全）

```
密码学(10) → 前端安全(10) → 逆向工程(10) → 安全开发(10) → 安全运维(10) → 区块链安全(10)
```

各科第一/最后一章的跨科链接：

| 位置 | 科目 | 链接 |
|------|------|------|
| 前端安全 第1章(basic) prev | 密码学应用 | `/study/security/crypto/application` |
| 逆向工程 第1章(basic) prev | 前端安全测试 | `/study/security/frontend/testing` |
| 安全开发 第1章(basic) prev | 恶意代码分析 | `/study/security/reverse/malware` |
| 安全运维 第1章(basic) prev | 安全项目管理 | `/study/security/dev/project` |
| 区块链安全 第1章(basic) prev | 安全评估 | `/study/security/ops/assessment` |
| 密码学 第1章(basic) prev | 无（科目首页/study/security/crypto） |
| 密码学 第10章(application) next | 前端安全基础 | `/study/security/frontend/basic` |
| 前端安全 第10章(testing) next | 逆向工程基础 | `/study/security/reverse/basic` |
| 逆向工程 第10章(malware) next | 安全开发基础 | `/study/security/dev/basic` |
| 安全开发 第10章(project) next | 安全运维基础 | `/study/security/ops/basic` |
| 安全运维 第10章(assessment) next | 区块链安全基础 | `/study/security/blockchain/basic` |
| 区块链安全 第10章(audit) next | 无 |

从 `app/data/navigation.ts` 获取各科内部章节顺序和标题。

---

## 参考示例

| 文件 | 说明 |
|------|------|
| `computer/network/application/page.tsx` | 标准章节页，含SVG+例题 |
| `computer/go/arrays-slices/page.tsx` | 4 spreads，含例题+练习+FAQ |
| `computer/php/file-exception/page.tsx` | 4 spreads，含综合代码示例 |
| `computer/frontend/projects/page.tsx` | 含实战案例+完整组件代码 |

---

## 执行步骤

1. 从 `app/data/navigation.ts` 获取科目的章节顺序
2. 确认旧格式类型（antd Tabs / useState Tab / 纯 Tailwind）
3. 查看1个示例页面确认模式
4. 逐个迁移，每页写完后用 `git show HEAD` 对比检查完整性
5. `npx tsc --noEmit` 检查无类型错误

---

## ✅ 迁移进度

### 已完成（96页）

| 科目 | 分类 | 页数 | 说明 |
|------|------|------|------|
| 网络安全 | 网络基础 | 10章 + 首页 | ✅ 全部完成 |
| 网络安全 | 安全防护 | 10章 | ✅ 全部完成 |
| 网络安全 | 渗透测试 | 10章 | ✅ 全部完成 |
| 网络安全 | 密码学 | 10章 + 首页 | ✅ 全部完成 |
| 网络安全 | 前端安全 | 10章 + 首页 | ✅ 全部完成 |
| 网络安全 | 逆向工程 | 10章 + 首页 | ✅ 全部完成 |
| 网络安全 | 安全开发 | 10章 + 首页 | ✅ 全部完成 |
| 网络安全 | 安全运维 | 10章 + 首页 | ✅ 全部完成 |
| 网络安全 | 区块链安全 | 10章 + 首页 | ✅ 全部完成 |
| 网络安全 | 安全科目首页 | 1章 | ✅ 新建完成 |

### 待迁移（~90页）

#### 软件工程（~90页）

| 分类 | 页数 | 状态 |
|------|------|------|
| 架构与设计模式 | 5章 | ⏳ |
| 开发规范与测试 | 9章 | ⏳ |
| Java EE | 17章 | ⏳ |
| 安卓开发 | 11章 | ⏳ |
| .NET开发 | 10章 | ⏳ |
| 云计算 | 7章 | ⏳ |
| 大数据分析 | 8章 | ⏳ |
| 智能搜索引擎 | 6章 | ⏳ |
| 软件建模与设计 | 7章 | ⏳ |
| 动画与游戏设计 | 10章 | ⏳ |

---

## 🧩 迁移要点

### 逐页迁移规则
- 每一页必须逐字保留所有代码示例（多行代码保持多行）
- SVG 示意图必须保留，不能省略
- 嵌套列表不能合并，每项内容独立保留
- 完成一页立即 `npx tsc --noEmit` 检查

### 常见错误提醒
| 错误类型 | 示例 | 修复 |
|----------|------|------|
| `</Paragraph>` | `<BookParagraph>...</Paragraph>` | 改为 `</BookParagraph>` |
| 中文引号冲突 | `message="内容"值""` | 用「」代替双引号 |
| 未读文件写保护 | 直接 Write 未 Read 的文件 | 先 Read 再 Write |
| 大段代码内联 | 代码挤在一行 | 抽成 `const xxxCode =\`...\`` 外部常量 |

---

## 🤖 Agent 提示词模板（批量迁移用）

当用 Claude Agent 进行批量迁移时，使用以下提示词模板效果最佳。每个 Agent 处理一页，支持并行执行。

### 章节页迁移提示词

```
你是 Next.js/TypeScript 专家。请把旧格式页面迁移为书本翻页新格式。

## 任务
1. 读取旧文件：/root/aidnz/i/app/study/security/{category}/{slug}/page.tsx
2. 将其重写为 LessonLayout + SPREADS + BookContent 组件格式
3. 写回到同一路径

## META
const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: '章节标题',
  chapterNumber: N,
  totalChapters: 10,
  subjectHref: '/study/security/{category}',
  prevChapter: { label: '上一章', href: '/study/security/{category}/prev' },
  nextChapter: { label: '下一章', href: '/study/security/{category}/next' },
  theme: THEMES.security,
}

## 转换规则
1. 旧文件是 useState Tab 格式，每个 tab 变成一个 SPREADS 项，label 用 tab 名称
2. 组件映射：
   | 旧元素 | 新组件 |
   |--------|--------|
   | `<h1>`/`<h3>` | `<PageTitle>` |
   | `<h4>`/`<h5>` | `<SectionTitle>` |
   | `<p>` | `<BookParagraph>` |
   | `<pre><code>{...}</code></pre>` | `<BookCode language="..." code={...} />` |
   | `<ul><li>` | `<BookList items={[...]} />` |
   | 嵌套`<ul>` | 合并为纯字符串：「父项：子项1、子项2」 |
3. 大段代码抽成外部常量：const xxxCode = `...`
4. SPREADS 左右分栏，内容均匀分配
5. 只输出完整 TSX 文件内容，写回原路径

## 铁律
- 代码示例逐字保留，不修改任何字符
- BookList items 必须纯字符串数组
- BookCode 用 code prop（不用 children）
- 中文引号用「」不用 ""
- JSX 中 {id} 用模板字面量 {\`{id}\`}
- 模板字面量中 ${VAR} 转义为 \\${VAR}
- 不要用任何 antd 组件
- Collapse 展开显示
```

### 分类首页迁移提示词

```
你是 Next.js/TypeScript 专家。请迁移分类首页为 BookCover 格式。

## 任务
1. 读取旧首页：/root/aidnz/i/app/study/security/{category}/page.tsx
2. 从旧首页提取：课程特色(features)、学习路径(roadmap)、先修知识、职业方向
3. 写回同一路径

## CHAPTERS
const CHAPTERS = [
  { number: 1, title: '第一章', description: '描述', href: '/study/security/{category}/{slug}' },
  // ... 全部章节
]

## BookCover
title="科目名"
subtitle="English Name"
description="..."
icon="🔐"
startHref="/study/security/{category}/basic"
totalHours={30}

## 格式参考
参考 /root/aidnz/i/app/study/security/network/page.tsx 样式：
BookCover + 课程特色(theme.paperBg区块) + 学习路径(theme.paperCard区块) + 先修知识与职业方向(theme.paperBg区块)

使用 THEMES.security 主题，保留旧首页所有内容。
```

### 关键要点
- **开头带角色设定**（「你是 Next.js/TypeScript 专家」）让 Agent 自动使用正确工具
- **META 参数明确给出**，减少 Agent 自己推断出错
- **组件映射表清晰**，一目了然
- **铁律部分完整保留**，避免常见错误
- **每个 Agent 只处理一页**，并发执行不受影响

# 🔄 旧页面迁移模板指南

## 用途

将旧格式的学习页面（Ant Design Tabs / useState 手动 Tab / 纯 Tailwind 平铺）迁移为书本翻页模板格式。

---

## 快速对照

### 首页（科目封面）

```tsx
'use client'

import BookCover from '@/app/components/ui/book/BookCover'
import { THEMES } from '@/app/components/ui/book/theme'

const CHAPTERS = [
  { number: 1, title: '第一章', description: '描述', href: '/study/computer/xxx/ch1' },
  // ... 全部章节
]

export default function SubjectHomePage() {
  return (
    <BookCover
      title="科目名"
      subtitle="English Name"
      description="一句话描述该科目..."
      chapterCount={CHAPTERS.length}
      totalHours={??}
      chapters={CHAPTERS}
      icon="📖"
      startHref="/study/computer/xxx/ch1"
      theme={THEMES.computer}
    />
  )
}
```

> ⚠️ 旧首页的额外内容（课程特点、学习路径、职业发展、学习建议等）必须保留，放在 `BookCover` 下方。

---

### 章节页

```tsx
'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
  TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '科目名',
  chapterTitle: '当前章节标题',
  chapterNumber: 1,                // 从1开始
  totalChapters: 10,               // 该科目总章数
  subjectHref: '/study/computer/xxx',
  prevChapter: { label: '上一章', href: '/study/computer/xxx/prev' },   // 第一章无 prevChapter
  nextChapter: { label: '下一章', href: '/study/computer/xxx/next' },   // 最后一章无 nextChapter
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '标签名',
    left: (
      <div className="space-y-4">{/* 左页内容 */}</div>
    ),
    right: (
      <div className="space-y-4">{/* 右页内容 */}</div>
    ),
  },
  // ... 更多 spread
]

export default function Page() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
```

---

## 组件映射表

| 旧格式 | 新模板组件 | 说明 |
|--------|-----------|------|
| `<Title>` / `<h1>`~`<h3>` | `<PageTitle>` | 页面标题 |
| `<h3>` / `<h4>` | `<SectionTitle>` | 小节标题（需额外 import） |
| `<Paragraph>` / `<p>` | `<BookParagraph>` | 正文段落 |
| `<pre>` / `<CodeBlock>` | `<BookCode language="..." code={...} />` | 代码块，`code` 是 prop 不是 children |
| `<Alert>` (antd) | `<BookAlert type="info"` / `"success"` / `"warning"` | 提示框 |
| `<ul>` / `<li>` | `<BookList items={[...]} />` | **items 必须只用纯字符串！** |
| `<ol>` | `<BookList items={[...]} ordered />` | **items 必须只用纯字符串！** |
| `<Collapse>` (参考答案) | 直接展示，不要折叠 |
| `<TagGrid>` | 每个 spread 末尾加一组标签 |
| `<Divider>` | `<BookDivider />` |

---

## ⚠️ 常见错误（避坑必读）

### 1. BookList items 必须纯字符串

```tsx
// ❌ 禁止！会报 Missing "key" prop
<BookList items={[
  <><strong>硬件层：</strong>物理设备</>,
  <span><InlineCode>/etc/passwd</InlineCode> — 用户信息</span>,
]} />

// ✅ 正确
<BookList items={[
  '硬件层：物理设备',
  '/etc/passwd — 用户信息',
]} />
```

### 2. 中文引号用「」代替""

```tsx
// ❌ 禁止！双引号会提前关闭 JSX 属性值
<BookAlert message="冯·诺依曼结构的主要瓶颈是"冯·诺依曼瓶颈"" />

// ✅ 正确
<BookAlert message="冯·诺依曼结构的主要瓶颈是「冯·诺依曼瓶颈」" />
```

### 3. BookCode 用 code prop

```tsx
// ❌ 禁止
<BookCode language="sql">{`SELECT * FROM users;`}</BookCode>

// ✅ 正确
<BookCode language="sql" code={`SELECT * FROM users;`} />
```

### 4. 导航链接路径要更新

旧路径 `/study/composition/intro` → 新路径 `/study/computer/composition/intro`

### 5. BookAlert message 必须传纯字符串，不能传 JSX

```tsx
// ❌ 禁止！BookAlert 的 message prop 只接受 string 类型
<BookAlert type="info" message={
  <ul className="list-disc pl-4 space-y-1">
    <li>要点A</li>
    <li>要点B</li>
  </ul>
} />

// ✅ 正确：用纯文本，用标点分隔
<BookAlert type="info" message="要点A，要点B。" />
```

### 6. 组件关闭标签名称必须匹配

```tsx
// ❌ 禁止！关闭标签名不匹配会报 Syntax Error
<BookParagraph>内容</Paragraph>
<BookAlert type="info" message="提示" />   // ← 用 /> 短写没问题

// ✅ 正确
<BookParagraph>内容</BookParagraph>
<BookAlert type="info" message="提示" />
```

### 7. JSX 文本中的 `>` 和 `&` 要转义

在 JSX 文本内容中（非代码块内），`>` 和 `&` 会被解析为 JSX 语法：

```tsx
// ❌ 禁止！> 和 & 在 JSX 文本中会报错
<p>nohup command 2>&1 将错误输出重定向</p>

// ✅ 正确：用 HTML 实体
<p>nohup command 2&gt;1 将错误输出重定向</p>
```

**注意：** `BookCode code={...}` 内的模板字符串中不需要转义，只有 JSX 文本中需要。

### 8. JSX 花括号中的逗号表达式

JSX 用 `{}` 包裹的表达式会被执行，不能直接写花括号字面量：

```tsx
// ❌ 禁止！{7, 0, 1, 2} 被解析为逗号表达式
<p>页面序列为 {7, 0, 1, 2}</p>

// ✅ 正确：用模板字符串包一层
<p>页面序列为 {`{7, 0, 1, 2}`}</p>
```

---

## META 导航规则

```
第一章：无 prevChapter
中间章：prevChapter + nextChapter 首尾相连
最后一章：无 nextChapter
```

从 `app/data/navigation.ts` 的 `'计算机'` 分类下获取章节顺序和标题。

---

## 📐 已完成计算机科目（13科，~180章）

所有路径均在 `/study/computer/` 下。

| 科目 | 章节数 | 状态 |
|------|--------|------|
| C++ | 20章 | ✅ |
| Python | 11章 | ✅ |
| Java | 10章 | ✅ |
| SQL | 9章 | ✅ |
| 计算机组成原理 | 10章 | ✅ |
| 操作系统 | 10章 | ✅ |
| Linux系统 | 9章 | ✅ |
| 计算机网络 | 17章 | ✅ |
| 数据结构与算法 | 10章 | ✅ |
| 物联网 | 8章 | ✅ |
| Web前端开发 | 20章 | ✅ |
| Go | 23章 | ✅ |
| PHP | 22章 | ✅ |
| **合计** | **~180章** | **全部完成** |

---

## 🚀 计划：迁移人工智能科目

从 `app/data/navigation.ts` 的 `'人工智能'` 分类下获取章节顺序和标题。

| # | 科目 | 章节数 | 旧格式类型 | 进度 |
|---|------|--------|-----------|------|
| 1 | 机器学习 | 11章 | 未知 | ⏳ 未开始 |
| 2 | 深度学习 | 14章 | 未知 | ⏳ 未开始 |
| 3 | 强化学习 | 14章 | 未知 | ⏳ 未开始 |
| 4 | 自然语言处理 | 14章 | 未知 | ⏳ 未开始 |
| 5 | 计算机视觉 | 13章 | 未知 | ⏳ 未开始 |
| 6 | 推荐系统 | 12章 | 未知 | ⏳ 未开始 |
| 7 | 智能机器人 | 12章 | 未知 | ⏳ 未开始 |
| 8 | 人工智能程序设计 | 8章 | 未知 | ⏳ 未开始 |
| 9 | 数据挖掘 | 10章 | 未知 | ⏳ 未开始 |
| | **合计** | **~108章** | | |

**主题配色：** `THEMES.ai`（嫩菊绿 + 幽谷灰）

> ⚠️ 迁移前需先确认各科目的旧格式类型（antd Tabs / useState Tab / 纯 Tailwind），再按对应模板迁移。步骤：先看首页格式 → 看一个子页面格式 → 批量迁移。

## ⚠️ 迁移硬性规则

**内容只能增不能减！迁移时必须保留原始页面的全部内容，包括：**
- 所有文字描述、章节说明
- 所有例题、习题与参考答案（含详细解析注释）
- 所有代码示例（含注释）
- 所有 SVG 示意图、流程图、表格
- 所有提示框、注意事项、要点总结
- 导航按钮（已由 LessonLayout 自带，旧按钮改为 META 中的 prevChapter/nextChapter）

## 🚨 构建不报错的铁律（迁移前必看）

以下是真实踩坑记录，违反任一条件都会导致 **构建失败**：

### JSX 语法类
- **BookList items 必须只用纯字符串**，不能放 `<span>`、`<strong>` 等 JSX 元素
- **BookAlert message 必须传纯字符串**，不能传 `<ul>` `<li>` 等 JSX 元素（`message` prop 类型为 `string`）
- **关闭标签名必须匹配**：`<BookParagraph>` 对应 `</BookParagraph>`，不能写成 `</Paragraph>`
- **JSX 文本中 `>` 用 `&gt;`**，`&` 用 `&amp;`（`BookCode` 的 code 模板字符串内不需要转义）
- **JSX 文本中的花括号**要用模板字符串包裹：`{`{1, 2, 3}`}`

### 组件使用类
- BookCode 使用 `code` prop 而非 children：`<BookCode language="..." code={...} />`
- 中文引号用「」代替双引号避免 JSX 属性冲突
- 不要折叠任何内容（原 Collapse 面板展开显示）
- 不要使用 antd 的 `<Card>`、`<Paragraph>`、`<Title>`、`<Text>`、`<Divider>`、`<Tabs>` 等组件
- antd `<Alert>` → 用 `BookAlert`（`type` 值不变：`"info"`/`"success"`/`"warning"`）
- antd `<Table>` → 用原生 HTML `<table>`

### 模板字面量 $ 符号转义

`BookCode` 的 `code` 用模板字面量时，`${VAR}` 会被 JS 当作变量解析：

```tsx
// ❌ 报 Cannot find name 'BACKUP_PATH'
<BookCode language="bash" code={`tar -czf "${BACKUP_PATH}/backup.tar.gz"`} />

// ✅ 方案A：转义 $
<BookCode language="bash" code={`tar -czf "\${BACKUP_PATH}/backup.tar.gz"`} />

// ✅ 方案B：外部常量（适合大段脚本）
const script = 'tar -czf "${BACKUP_PATH}/backup.tar.gz"'
<BookCode language="bash" code={script} />
```

**注意：** `$this`、`$var` 不包含 `{`，不会触发 JS 模板解析。

### JSX 文本中的 {id} 花括号

```tsx
// ❌ 报 Cannot find name 'id'
<BookParagraph>GET /user/{id}</BookParagraph>

// ✅ 用模板字符串包裹
<BookParagraph>{`GET /user/{id}`}</BookParagraph>
```

### 中文引号用「」而非智能引号

智能引号 `""`（U+201C/U+201D）会被 TS 解析为非法字符：

```tsx
// ❌ TS1127: Invalid character
<BookList items={['「Service」层']} />

// ✅ 去掉引号或改用「」
<BookList items={['Service层']} />
```

### 迁移后逐 tab 核对内容完整性

**最容易丢失的内容：**
- **「综合示例」tab** — 完整的可运行代码块，容易整个tab被忽略
- **「练习」** — 列表项数量可能减少（原文件3-4题只写了2-3题）
- **「拓展资源」** — 外部链接（MDN、W3School等）容易遗漏
- **「常见问题」** — FAQ 列表项被合并简化

**核对方法：** `git show HEAD:path | grep "label:"` 获取原始 tab 数，对比迁移后的 spread 数，每个 tab 内容必须对应到一个 spread。经验：每个原始 tab ≈ 0.5~1 个 spread。

### 参考示例文件

| 文件 | 说明 |
|------|------|
| `computer/sql/select/page.tsx` | 章节页标准格式（Ant Design Tabs 迁移） |
| `computer/sql/page.tsx` | 首页标准格式（BookCover + 额外内容保留） |
| `computer/composition/intro/page.tsx` | 纯 Tailwind 平铺模式迁移 |
| `computer/network/application/page.tsx` | 标准章节页，含SVG流程图+例题（推荐参考） |
| `computer/go/arrays-slices/page.tsx` | 4 spreads，含例题+练习+FAQ完整结构 |
| `computer/php/file-exception/page.tsx` | 4 spreads，含综合代码示例+异常处理模式 |
| `computer/frontend/projects/page.tsx` | 含实战案例+完整TodoList组件代码 |

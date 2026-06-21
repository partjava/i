# 📖 书本翻页模板使用指南

## 文件结构

```
app/components/ui/book/
├── LessonLayout.tsx     ← 📖 页面模板（章节页直接用）
├── BookSpread.tsx       ←   书本引擎（不用直接碰）
├── BookContent.tsx      ← 🧱 内容积木组件
└── theme.ts             ← 🎨 主题配色
```

---

## 快速开始

```tsx
'use client'

// ① 导入模板 + 主题
import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'

// ② 按需导入内容组件
import { PageTitle, BookParagraph, BookCode, BookAlert, BookList, StepList, BookImage, TagGrid, BookDivider, InlineCode, SectionTitle } from '@/app/components/ui/book/BookContent'

// ③ 章节元信息（必须包含 theme）
const META: LessonMeta = {
  subject: 'C++编程',
  chapterTitle: '章节标题',
  chapterNumber: 2,
  totalChapters: 18,
  subjectHref: '/study/computer/cpp',
  theme: THEMES.computer,   // 必填！选对应方向的主题
  prevChapter: { label: '上一章', href: '/study/computer/cpp/xxx' },
  nextChapter: { label: '下一章', href: '/study/computer/cpp/xxx' },
  // spreadsPerChapter: [4, 3, 5, ...],  // 可选：精确进度
}

// ④ 内容（每个标签 = 两页，left + right）
const SPREADS = [
  {
    label: '标签名',
    left: <div className="space-y-4">{/* 左页内容 */}</div>,
    right: <div className="space-y-4">{/* 右页内容 */}</div>,
  },
]

// ⑤ 导出页面
export default function Page() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}
```

---

## 主题配色

```tsx
import { THEMES } from '@/app/components/ui/book/theme'

THEMES.computer  // 💻 计算机 → 宣纸白 + 鸾尾蓝
THEMES.ai        // 🤖 AI      → 嫩菊绿 + 幽谷灰
THEMES.software  // 🧩 软工    → 海天蓝 + 蒽油绿
THEMES.security  // 🔒 安全    → 烟雨白 + 紫幽兰
```

在 `META` 的 `theme` 字段填入即可，标签、进度条、导航点全部自动变色。

---

## 内容组件速查

### 代码块 `BookCode`

```tsx
// 基础用法 — 默认显示行号，超过15行自动折叠
<BookCode language="cpp" code={`int main() { return 0; }`} />

// 不折叠
<BookCode language="bash" code="g++ --version" maxLines={0} />
```

### 标题与正文

```tsx
<PageTitle icon={<CodeOutlined />}>带图标的标题</PageTitle>
<BookParagraph>正文段落</BookParagraph>
<SectionTitle>小标题</SectionTitle>
```

### 提示框 `BookAlert`

```tsx
<BookAlert type="info" message="提示信息" />
<BookAlert type="success" message="成功了！" />
<BookAlert type="warning" message="注意这里" />
```

> ⚠️ **`message` 只接受纯字符串**，不能传 `<ul>` / `<li>` 等 JSX 元素。多要点用标点符号分隔在同一字符串中。

### 列表 `BookList` / `StepList`

```tsx
<BookList items={['A', 'B', 'C']} />
<BookList items={['A', 'B']} ordered />
<StepList items={[{ title: '第一步', content: <p>内容</p> }]} />
```

### 其他

```tsx
<BookImage src="/img.png" alt="说明" caption="图注" />
<TagGrid items={['标签1', '标签2']} />
<BookDivider />   // 分割线
<InlineCode>code</InlineCode>  // 行内代码
```

---

## Meta 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `subject` | `string` | ✅ | 科目名（如 "C++编程"） |
| `chapterTitle` | `string` | ✅ | 当前章节标题 |
| `chapterNumber` | `number` | ✅ | 第几章（从1开始） |
| `totalChapters` | `number` | ✅ | 总章数 |
| `theme` | `SubjectTheme` | ✅ | 从 THEMES 选一个 |
| `subjectHref` | `string` | 可选 | 科目首页链接 |
| `prevChapter` | `{label, href}` | 可选 | 上一章 |
| `nextChapter` | `{label, href}` | 可选 | 下一章 |
| `spreadsPerChapter` | `number[]` | 可选 | 每章标签数，精确进度 |

---

## 注意事项

- `left` 和 `right` 可以放**任意 ReactNode** — 图片、表格、Ant Design 组件都行
- 标签不够就加 `{ label:'', left: < />, right: < /> }`
- 代码里双引号冲突用 `{' " ... "' }`
- 第一页 `prevChapter: undefined`，最后一页 `nextChapter: undefined`

# 📕 书本封面模板使用指南

## 用途

每个**科目首页**使用，如：
- `/study/ai/ml` → 机器学习
- `/study/computer/cpp` → C++ 编程
- `/study/se/architecture-design` → 架构设计
- `/study/security/network` → 网络安全

---

## 完整示例

```tsx
'use client'

import BookCover from '@/app/components/ui/book/BookCover'
import { THEMES } from '@/app/components/ui/book/theme'

// 章节列表
const CHAPTERS = [
  { number: 1,  title: '机器学习基础',  description: '概念与原理',  href: '/study/ai/ml/basic' },
  { number: 2,  title: '项目流程',      description: '开发流程',    href: '/study/ai/ml/workflow' },
  // ... 全部章节
]

export default function SubjectHomePage() {
  return (
    <BookCover
      title="机器学习"
      subtitle="Machine Learning"
      description="一句话描述该科目..."
      chapterCount={CHAPTERS.length}
      totalHours={150}
      chapters={CHAPTERS}
      icon="🤖"
      startHref="/study/ai/ml/basic"
      theme={THEMES.ai}          // 必填！选对应方向的主题
    />
  )
}
```

---

## 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | `string` | ✅ | 科目名称 |
| `description` | `string` | ✅ | 一句话描述 |
| `chapterCount` | `number` | ✅ | 章节总数 |
| `chapters` | `ChapterLink[]` | ✅ | 章节列表 |
| `theme` | `SubjectTheme` | ✅ | 从 THEMES 选一个 |
| `subtitle` | `string` | 可选 | 英文名 |
| `totalHours` | `number` | 可选 | 总学时 |
| `icon` | `string` | 可选 | Emoji 图标 |
| `startHref` | `string` | 可选 | 开始学习链接 |

### ChapterLink

```tsx
{
  number: number      // 章节序号
  title: string       // 章节名称
  description: string // 一句话说明
  href: string        // 跳转链接
}
```

---

## 主题选择

```tsx
import { THEMES } from '@/app/components/ui/book/theme'

THEMES.computer  // 💻 宣纸白 + 鸾尾蓝
THEMES.ai        // 🤖 嫩菊绿 + 幽谷灰
THEMES.software  // 🧩 海天蓝 + 蒽油绿
THEMES.security  // 🔒 烟雨白 + 紫幽兰
```

---

## 快速填空

```tsx
'use client'

import BookCover from '@/app/components/ui/book/BookCover'
import { THEMES } from '@/app/components/ui/book/theme'

const CHAPTERS = [
  { number: 1, title: '第一章', description: '说明', href: '/study/xxx/xxx' },
  // ...
]

export default function SubjectHomePage() {
  return (
    <BookCover
      title="科目名"
      description="描述"
      chapterCount={CHAPTERS.length}
      chapters={CHAPTERS}
      icon="📖"
      startHref="/study/xxx/xxx"
      theme={THEMES.computer}
    />
  )
}
```

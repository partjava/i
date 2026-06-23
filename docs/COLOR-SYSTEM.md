# 配色体系文档

> 全站冷色纸墨主题，靛蓝为主色。仅 4 个科目章节保留独立暖色主题。

---

## 一、Tailwind 色板 (`tailwind.config.js`)

### 1.1 纸墨色系（paper / ink）

全站背景和文字的基准色板，所有页面共用。

| Token | 值 | 用途 |
|-------|-----|------|
| `paper-50` | `#f5f7fa` | 最白 — 卡片背景、弹窗 |
| `paper-100` | `#EDF0F5` | 宣纸冷白 — 主页面背景 |
| `paper-200` | `#e2e6ed` | 素笺 — 区块/次级卡片背景 |
| `paper-300` | `#d1d6e0` | 纸边 — 边框、分割线、旧页面背景色 |
| `paper-400` | `#b8bfcc` | 旧纸 — 装饰边框、淡色分隔 |
| `ink` | `#0C1F3D` | 深藏青 — 正文、标题、最深色 |
| `ink-light` | `#3d4f6b` | 蓝灰 — 辅助文字 |
| `ink-lighter` | `#6b7d99` | 浅灰蓝 — 注释/装饰文字 |
| `ink-fade` | `#a0aec0` | 更淡 — 极淡装饰/禁用态 |

### 1.2 页面背景（page）

| Token | 值 | 用途 |
|-------|-----|------|
| `page-bg` | `#EDF0F5` | 同 paper-100 |
| `page-dark` | `#0C1F3D` | 深色模式背景，同 ink |

### 1.3 点缀色（amber / jade / rust / azure）

> ⚠️ `amber` 只是 token 名，实际是**靛蓝色**，不是琥珀色。

| Token | 值 | 语义 |
|-------|-----|------|
| `amber` | `#6366f1` | **主色** — 按钮、强调、激活态 |
| `amber-light` | `#818cf8` | 主色浅 — hover 态 |
| `amber-dark` | `#4f46e5` | 主色深 — 按压态 |
| `amber-pale` | `#e0e7ff` | 主色极浅 — 标签背景、悬停高亮 |
| `jade` | `#BBFF5C` | 荧光绿 — 成功/完成/高亮 |
| `jade-light` | `#ccff7a` | |
| `jade-pale` | `#e8ffcc` | |
| `rust` | `#8b5cf6` | 紫罗兰 — 危险/删除/警告（冷色版） |
| `rust-light` | `#a78bfa` | |
| `rust-pale` | `#ede9fe` | |
| `azure` | `#044BB5` | 亮蓝 — 链接 |
| `azure-light` | `#2a6fd4` | |
| `azure-pale` | `#dce8f7` | |

---

## 二、CSS 变量 (`app/globals.css`)

定义在 `:root`，与 Tailwind token 对应：

```css
:root {
  --color-primary:   #6366f1;   /* = amber */
  --color-secondary: #8b5cf6;   /* = rust */
  --color-accent:    #f59e0b;   /* 保留 amber 真色，极少用 */
  --color-success:   #10b981;   /* 比 jade 更通用的绿色 */
  --background:      #ffffff;
  --foreground:      #1f2937;
}
```

### 暗色模式

```css
body.dark {
  --color-primary:   #818cf8;
  --color-secondary: #a78bfa;
  --color-accent:    #fbbf24;
  --color-success:   #34d399;
  --background:      #111827;
  --foreground:      #f9fafb;
}
```

### 暖→冷过渡期的灰度加深

```css
/* 冷色背景上灰色文字对比度修复 */
.text-gray-400 { color: #6b7280 !important; }  /* gray-500 */
.text-gray-500 { color: #4b5563 !important; }  /* gray-600 */
.text-gray-600 { color: #374151 !important; }  /* gray-700 */
```

---

## 三、水墨装饰组件 (`InkWashDecoration.tsx`)

6 种 SVG 变体，颜色全部硬编码（不跟随 Tailwind token）：

| 变体 | 主色 | 辅色 | 点缀 |
|------|------|------|------|
| `mountains` 远中近山 | `#6b7d99` / `#3d4f6b` / `#0C1F3D` | — | `#0C1F3D` 松树 |
| `mist` 云雾 | `#a0aec0` | `#b8bfcc` | — |
| `bamboo` 墨竹 | `#4f6b8a` 竿 | `#3d5a8a` 叶 | — |
| `birds` 飞鸟 | `#0C1F3D` | — | — |
| `divider` 分隔线 | `#3d4f6b` 笔触 | `#6b7d99` 墨点 | `#8090a8` 点缀 |
| `landscape` 山水全景 | `#6b7d99` / `#3d4f6b` / `#0C1F3D` 山 | `#818cf8` / `#a5b4fc` 冷月 | `#0C1F3D` 飞鸟/孤舟 |

---

## 四、科目主题 (`app/components/ui/book/theme.ts`)

> ⚠️ **这 4 个科目使用独立配色，不跟随全局冷色调。重构时注意区分。**

| 科目 | accent 主色 | paperBg 纸色 | 风格 |
|------|------------|-------------|------|
| 💻 计算机 | `#1660AB` 鸾尾蓝 | `#BDE0FE` 冰川白 | 冷蓝 |
| 🤖 人工智能 | `#2B313F` 幽谷灰 | `#E2E7BF` 嫩菊绿 | 暖绿 |
| 🔧 软件工程 | `#373834` 蒽油绿 | `#C6E6E8` 海天蓝 | 冷青 |
| 🔒 网络安全 | `#707899` 紫幽兰 | `#E3E3E5` 烟雨白 | 冷紫 |

主题通过 `<BookCover theme={THEMES.computer}>` 传入组件，各章节页面无需单独改色。

---

## 五、组件硬编码颜色速查

> 以下组件使用硬编码颜色（非 Tailwind class），重构时优先级最高。

| 组件 | 关键色值 | 用途 |
|------|---------|------|
| `FlipCard` 正面 | `#f5f7fa → #f0f3f8 → #f5f7fa → #eef1f6` | 卡片渐变 |
| `FlipCard` 背面 | `#0C1F3D → #1a2d4a → #0C1F3D` | 翻转深色面 |
| `HeroSection` | `#EDF0F5 → #e8ecf2 → #e2e6ed` | Hero 背景渐变 |
| `StatsSection` | `#e2e6ed → #d1d6e0` | 统计区背景 |
| `StatsSection` 卡片 | `#f5f7fa → #f0f3f8 → #f5f7fa → #eef1f6` | 统计卡片渐变 |
| `StudyProgressBar` | `#6366f1` 完成态, `#EDF0F5` 默认态 | 学习进度按钮 |
| `BottomNavigation` | `#f5f7fa` 底栏, `#EDF0F5` 悬停, `#d1d6e0` 按下 | 移动端导航 |
| `Sidebar` | `#f5f7fa` 背景, `#EDF0F5` / `#d1d6e0` 悬停 | 桌面端侧栏 |
| `StudyScreenshot` 按钮 | `#6366f1 → #4f46e5` | 截图按钮渐变 |
| `BookCover` 书脊 | `#d1d6e0` / `#e2e6ed` / `#b8bfcc` | 书本 3D 装饰 |
| `BookSpread` 页面 | `#EDF0F5` 纸色, `#d1d6e0→#d1d6e0` 厚度 | 翻页纸质感 |
| `BookSpread` 默认 accent | `#6366f1` | 无 theme prop 时的回退色 |
| `BookContent` callout | info `#6366f1`, success `#10b981`, danger `#8b5cf6` | 提示框图标色 |

---

## 六、暖→冷迁移对照表

重构时如果需要从旧版暖色切换，参照此表：

| 旧暖色 | 新冷色 | 语义 |
|--------|--------|------|
| `#faf6f0` | `#f5f7fa` | 最白卡片 |
| `#f5f0e8` | `#EDF0F5` | 宣纸白 |
| `#f5efe6` | `#f0f3f8` | 卡片渐变起 |
| `#f3ede2` | `#eef1f6` | 卡片渐变止 |
| `#f0ebe0` | `#e8ecf2` | 工具栏渐变 |
| `#ebe5d8` | `#e2e6ed` | 次级背景 |
| `#e5dfd0` | `#d1d6e0` | 页面底层 |
| `#e8ddd0` | `#d1d6e0` | 悬停态/旧纸 |
| `#d4c8b8` | `#b8bfcc` | 边框 |
| `#c4b8a0` | `#a0aec0` | 淡边框 |
| `#FFD6A5` | `#e0e7ff` | 高亮/标签背景 |
| `#8b7355` | `#6b7d99` | 暖棕→灰蓝 |
| `#7a5c3e` | `#3d4f6b` | 中棕→蓝灰 |
| `#5c4033` | `#0C1F3D` | 深棕→藏青 |
| `#6b5a45` | `#4a5d7a` | 棕灰→蓝灰 |
| `#4a3728` | `#1a2d4a` | 深咖→深蓝 |
| `#3d2e20` | `#0C1F3D` | 最深棕→藏青 |
| `#d4a888` | `#a5b4fc` | 暖粉→冷紫 |
| `#e8c8a8` | `#c7d2fe` | 暖肤→冷紫 |
| `#c4a882` | `#a0aec0` | 暖驼→灰蓝 |
| `#4a6741` | `#4f6b8a` | 暖绿→蓝灰 |
| `#5a6b3a` | `#4f6b8a` | 竹绿→蓝灰 |
| `#8b4513` | `#5a6b8a` | 红棕→紫蓝 |
| `#8b2500` | `#5a3d6b` | 暗红→暗紫 |
| `#a0522d` | `#5a6b8a` | 赭色→蓝灰 |
| `#f0c08a` | `#a5b4fc` | 暖金→冷紫 |
| `#e8b883` | `#818cf8` | 暖金→靛蓝 |
| `#a0846c` | `#8090a8` | 驼灰→蓝灰 |
| `#b85a48` | `#8b5cf6` | 赭石→紫罗兰 |
| `#f0ddd8` | `#ede9fe` | 暖粉底→冷紫底 |

---

## 七、重构注意事项

1. **4 个科目页面**（计算机/AI/软件工程/网络安全）的 `theme.ts` 配色**不要改**，它们故意保持独立风格。
2. **InkWashDecoration** 是纯硬编码 SVG，改色需要直接改文件中的 `fill`/`stroke` 属性。
3. **Tailwind class** 优先使用 `text-ink`、`bg-paper-100`、`border-paper-300` 等语义 token，不要用 `text-[#xxx]` 硬编码。
4. **暗色模式**在 `globals.css` 中通过 `body.dark` 选择器处理，新增组件需补充对应暗色规则。
5. **灰色文字**已全局加深一档（`text-gray-400` → `gray-500` 色值），不要在组件里再次覆盖。

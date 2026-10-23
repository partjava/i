# PartJava 3D 数字书房首屏 (Sanctuary Hero) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 4,271 行的 `abcd.html` 拆分为 `public/sanctuary/` 下的模块化目录结构，并通过 `app/_shared/components/sanctuary/SanctuaryHero.tsx` 作为 PartJava 首页第一屏（100vh）展示，同时升级 `partjavadata/sync.sh`。

**Architecture:** 采用独立沙箱容器（`public/sanctuary/index.html` + 8 个按职责拆分的 JS 模块 + 1 个独立 CSS 文件 + 本地化 `three.min.js`/`gsap.min.js`/`tailwind.min.js`）避免 Three.js r128 与主站 Three.js 0.180 的版本冲突及全局样式污染；通过 `SanctuaryHero.tsx` 实现首屏布局、`postMessage` 平滑向下滚动联动以及 `IntersectionObserver` 视口外自动暂停 WebGL 渲染。

**Tech Stack:** Next.js 14 (App Router), React 18, TypeScript, Three.js r128, GSAP 3.12.5, Web Audio API.

---

### Task 1: 下载并本地化第三方依赖到 `public/sanctuary/vendor/`
- [x] Step 1: 创建 `public/sanctuary/vendor`、`public/sanctuary/css`、`public/sanctuary/js` 目录
- [x] Step 2: 下载 `three.min.js` (r128)、`gsap.min.js` (3.12.5)、`tailwind.min.js` 到 `public/sanctuary/vendor/`

### Task 2: 拆分 `abcd.html` 为 CSS、HTML 骨架与 8 个 JS 模块
- [x] Step 1: 提取样式表到 `public/sanctuary/css/sanctuary.css`
- [x] Step 2: 拆分 JS 模块 `01-audio.js` ~ `08-interactions-main.js`（加入 `postMessage` 向下滚动通知与视口可见性暂停渲染控制）
- [x] Step 3: 生成精简后的 `public/sanctuary/index.html`（品牌标识改为 `PartJava`，底部增加「向下滚动浏览平台 ↓」按钮）

### Task 3: 创建 `SanctuaryHero.tsx` 并集成到 `app/page.tsx`
- [x] Step 1: 创建 `app/_shared/components/sanctuary/SanctuaryHero.tsx`
- [x] Step 2: 修改 `app/page.tsx`，使用 `<SanctuaryHero />` 替换 `<HeroSection />`

### Task 4: 优化 `partjavadata/sync.sh` 并验证构建
- [x] Step 1: 优化 `partjavadata/sync.sh`（支持前后端构建同步，消除重复拷贝）
- [x] Step 2: 在 WSL 中运行 `npm run build` 验证 TypeScript 与 ESLint 零报错

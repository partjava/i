# PartJava 首页 3D 数字书房首屏 (Sanctuary Hero) 模块化设计方案

## 1. 背景与目标

将现有的单文件 3D 数字书房（`abcd.html`，共 4,271 行）拆分为职责清晰的多文件目录结构，并作为 PartJava 首页（`app/page.tsx`）的第一屏（首屏 100vh）展示，替换原有的水墨 `HeroSection`。用户可在首屏体验完整的 3D 书房交互（显示器代码实验室、精装技术手稿翻页、全息知识卡片、机械键盘敲击音效、台灯色温切换、番茄钟与夜雨白噪音），并通过底部「向下滚动浏览平台 ↓」按钮或页面滚动无缝衔接至下方的统计数据、学习中心与常用软件导航区域。

---

## 2. 模块化目录拆分结构

原 `abcd.html` 单文件有 4,271 行，包含样式、DOM 结构、音频合成、数据字典、3D 场景构建、Canvas 纹理绘制和交互控制器。我们将新建独立文件夹 `public/sanctuary/` 与前端组件文件夹 `app/_shared/components/sanctuary/`，将其拆分为 **10 个职责单一的模块文件**：

```text
i/
├── app/
│   ├── _shared/components/sanctuary/
│   │   └── SanctuaryHero.tsx          # Next.js 首页首屏容器组件（负责首屏视口布局、postMessage 滚动联动、视口外自动休眠渲染）
│   └── page.tsx                       # 首页入口（使用 <SanctuaryHero /> 替换原 <HeroSection />）
│
└── public/sanctuary/                  # 3D 数字书房独立沙箱目录
    ├── index.html                     # 精简后的 HTML 骨架与 UI 弹层（约 260 行，仅保留 DOM 结构与模块引入）
    ├── css/
    │   └── sanctuary.css              # 书房专属样式表（约 230 行：毛玻璃、暗角遮罩、第一人称 HUD、C++ 实验室样式）
    ├── vendor/
    │   ├── three.min.js               # 本地化的 Three.js r128（避免外网 CDN 被拦截或加载慢）
    │   ├── gsap.min.js                # 本地化的 GSAP 3.12.5
    │   └── tailwind.min.js            # 本地化的 Tailwind 运行时（符合主站 CSP 'self' 策略）
    └── js/
        ├── 01-audio.js                # Web Audio 合成引擎（纸张翻页、微动点击、机械键盘轴体声、夜雨白噪音）
        ├── 02-manuscript-data.js      # 5 章 10 页 C++ 数据结构手稿数据与全息卡片配置数据
        ├── 03-scene-room.js           # Three.js 场景、2/3 视角相机架、三层电影打光、PBR 程序化木纹材质与胡桃木书桌
        ├── 04-display-ide.js          # Studio Display 3D 显示器模型与 2K IDE 动态代码 Canvas 渲染器
        ├── 05-book-hologram.js        # 精装技术手稿 3D 书本、书页弯曲网格与 1主+2辅 全息悬浮知识卡片
        ├── 06-desk-props.js           # 建筑平衡臂台灯、CNC 客制化机械键盘、手冲咖啡杯与热气粒子
        ├── 07-controllers-director.js # 书页翻动控制器、C++ 代码实验室弹窗联动、7.2 秒电影级运镜开屏与视角路由切换
        └── 08-interactions-main.js    # 悬停微提示、键帽按压与台灯调光交互、第一人称工作台、番茄钟与主渲染循环（支持视口休眠）
```

---

## 3. 核心交互与定制细节

1. **品牌标识定制**：
   - 加载帷幕（`#loader-curtain`）与左上角导航栏品牌名称由 `Sanctuary.dev` 改为 **`PartJava`**。
   - 完整保留原有的 3D 场景、C++ 数据结构代码实验室、手稿抽屉、音效与文字内容。
2. **首屏向下滚动引导**：
   - 在首屏底部中央新增「**向下滚动浏览平台 ↓**」胶囊按钮。
   - 点击该按钮时，通过 `window.parent.postMessage({ type: 'SANCTUARY_SCROLL_DOWN' }, '*')` 通知外层 Next.js 首页平滑滚动至第二屏（数据统计与学习中心区域）。
3. **性能优化（视口感知休眠）**：
   - `SanctuaryHero.tsx` 使用 `IntersectionObserver` 监听首屏可见性。
   - 当用户向下滚动离开首屏后，自动向 `iframe` 发送 `{ type: 'SANCTUARY_VISIBILITY', visible: false }`，暂停 `requestAnimationFrame` 中的 3D 渲染与 Canvas 纹理刷新，确保浏览下方工具卡片时 GPU 零额外占用；滚回首屏时立即无缝恢复渲染。
4. **安全头（CSP）与国内网络兼容**：
   - 将 Three.js、GSAP 等脚本下载并放入 `public/sanctuary/vendor/`，全部通过本地同源路径加载，不依赖国外 CDN，完全适配 `next.config.js` 的 `Content-Security-Policy`。
5. **部署脚本同步升级**：
   - 优化 `partjavadata/sync.sh`，移除重复的静态文件拷贝，并支持将新增的 `public/sanctuary/` 与构建产物一键同步至新服务器 `121.40.134.229`。

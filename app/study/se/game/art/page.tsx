'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '游戏美术',
  chapterNumber: 8,
  totalChapters: 10,
  subjectHref: '/study/se/game',
  prevChapter: { label: '游戏引擎', href: '/study/se/game/engine' },
  nextChapter: { label: '游戏音效', href: '/study/se/game/sound' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: "视觉首先传递信息",
    left: (
      <div className="space-y-4">
        <PageTitle>视觉首先传递信息</PageTitle>
        <BookParagraph>游戏美术既塑造风格，也负责让玩家识别角色、障碍、交互对象与危险。先用黑白剪影验证轮廓，再通过色彩、层级与动画增强信息。若背景比可碰撞物更醒目，画面可能漂亮却难以操作；重要状态应同时使用形状、位置或文字，避免仅靠颜色区分。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>制定资产规格</PageTitle>
        <BookParagraph>开始制作前确定角色高度、像素密度、视角、光源方向、调色板和UI缩放。二维项目可以约定每格三十二像素，角色脚底为锚点，所有行走帧同一画布尺寸。没有这些规格，后续会反复修正角色大小、脚底滑动和碰撞盒位置。</BookParagraph>
        <SectionTitle>实施顺序</SectionTitle>
        <BookList ordered items={["先写风格与尺寸规范，用占位图验证玩法中的识别度。", "统一锚点后打图集；在目标分辨率检查过滤、透明边缘和内存。"]} />
      </div>
    ),
  },
  {
    label: "图集与锚点",
    left: (
      <div className="space-y-4">
        <PageTitle>图集与锚点</PageTitle>
        <BookParagraph>精灵图集把多张图放入一张纹理，渲染时用源矩形选取。切图必须注明帧尺寸、边距、间隔和帧序；不能把透明空白自动裁切后仍沿用旧锚点。相邻图块在缩放和滤波时可能互相渗色，应按管线预留边缘并在真实缩放比例下检查。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>计算资源预算</PageTitle>
        <BookParagraph>文件下载体积和运行纹理内存不同。未压缩RGBA每像素四字节，一张二千零四十八见方纹理约十六MiB；带完整mipmap时还会增加，GPU压缩与格式会改变实际值。示例估算只是预算起点，最终要用目标设备分析工具验证。</BookParagraph>
        <BookParagraph>JavaScript 预算函数可运行；Canvas切片为需提供已加载图片与绘图上下文的示意。</BookParagraph>
        <BookCode language="javascript" showLineNumbers code={"// JavaScript：浏览器控制台或 Node.js，RGBA8预算\nfunction textureMiB(width, height, count, mipmaps = false) {\n  const bytes = width * height * 4 * count;\n  return bytes * (mipmaps ? 4 / 3 : 1) / 1024 ** 2;\n}\nconsole.log(textureMiB(2048, 2048, 1)); // 16\nconsole.log(textureMiB(2048, 2048, 4, true).toFixed(2));\n// 约85.33 MiB：仅纹理像素估算，不含额外缓冲\n// Canvas图集切片伪代码，需先加载image与ctx：\n// ctx.drawImage(image, frame * 32, 0, 32, 32,\n//               x, y, 64, 64);"} />
      </div>
    ),
  },
  {
    label: "导入与运行验证",
    left: (
      <div className="space-y-4">
        <PageTitle>导入与运行验证</PageTitle>
        <BookParagraph>导入时检查透明通道、颜色空间、过滤方式和缩放。像素画常需最近邻与整数倍缩放，写实插画通常需要平滑采样，但应由目标风格决定。先在运行场景观察远近缩放、动画、不同背景和UI叠层，再确认资产通过，而不是只看绘图软件中的原图。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>授权与交接</PageTitle>
        <BookParagraph>资产清单记录文件名、用途、作者、来源、授权条件和修改记录。免费素材也可能要求署名或限制再分发，发布前逐项核对具体许可。保留可编辑源文件与导出设置，让接手者能重建资产；删除无用超大源文件前先确认它不属于需要交付的创作源。</BookParagraph>
        <SectionTitle>常见错误</SectionTitle>
        <BookList items={["只看PNG文件大小估算纹理内存，忽略解码尺寸和mipmap。", "每帧自动裁切透明边，未同步调整锚点，角色原地行走却上下抖动。"]} />
      </div>
    ),
  },
  {
    label: "练习：一套可用资产",
    left: (
      <div className="space-y-4">
        <PageTitle>练习：一套可用资产</PageTitle>
        <BookParagraph>为小型收集游戏制作一个角色四帧行走、两种障碍和一个金币。可以使用简单几何画风，但必须遵守统一格子、锚点、命名和透明背景。给每类对象画独立碰撞轮廓，说明视觉边界与实际碰撞边界为何可能不同。</BookParagraph>
        <BookAlert type="info" message={"交付七项资产及四帧角色图集，附预算与运行截图；在两种缩放比例检查边缘和锚点。"} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>验收与资料</PageTitle>
        <BookParagraph>验收在两种背景上能识别所有交互物；动画脚底锚点不跳；图集切片没有串帧；缩小与放大后危险仍可辨识。提交资产表、图集坐标、纹理预算与授权记录，并解释一项从资源体积到运行内存的估算差异。</BookParagraph>
        <SectionTitle>参考思路</SectionTitle>
        <BookParagraph>参考思路：先用统一三十二像素格子和脚底十字线；预算分别列下载字节、解码像素和估计GPU纹理占用。</BookParagraph>
        <SectionTitle>官方资料</SectionTitle>
        <BookParagraph><a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage" target="_blank" rel="noreferrer">MDN：Canvas图像切片</a></BookParagraph>
        <BookParagraph><a href="https://docs.godotengine.org/en/stable/tutorials/2d/2d_sprite_animation.html" target="_blank" rel="noreferrer">Godot：精灵动画资产导入</a></BookParagraph>
      </div>
    ),
  },
]

export default function GameArtPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

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
        <BookParagraph>同一张角色图既有视觉轮廓，也有锚点、碰撞范围和导入参数。美术交接不能只给一张看起来正确的图片，还要说明它在世界中占多大、从哪里定位、如何切帧，以及缩放后哪些信息必须仍然可读。</BookParagraph>
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
  { label: "从剪影建立视觉层级", left: (<div className="space-y-4"><PageTitle>从剪影建立视觉层级</PageTitle><BookParagraph>先将角色、敌人、金币与背景转成灰度，观察交互对象是否仍突出。若金币与背景纹理大小、明度和细节相近，增加饱和度未必能解决识别困难；可以改变轮廓、留白和运动节奏，让对象的功能不依赖单一颜色。</BookParagraph>
<BookParagraph>视觉层级应服务当前任务。危险预告比装饰粒子优先，正在选择的按钮比非交互标题更突出。把画面缩成手机缩略图观察，能发现局部精致但整体焦点混乱的问题；最终仍需在实际操作距离与目标设备验证。</BookParagraph></div>), right: (<div className="space-y-4"><PageTitle>同一风格需要可执行规格</PageTitle><BookParagraph>规格表可以规定格子三十二像素、角色脚底对齐格子底边、光源来自左上、轮廓线一像素。统一规则减少不同作者资产混搭时的修整，但还要允许特殊对象例外，并在资产表注明尺寸与锚点，不让例外靠口头记忆传播。</BookParagraph><div className="overflow-x-auto my-4"><table className="w-full text-sm border-collapse"><thead><tr className="border-b-2"><th className="text-left p-2 font-semibold">尺寸或预算</th><th className="text-left p-2 font-semibold">表示什么</th><th className="text-left p-2 font-semibold">验证方式</th></tr></thead><tbody><tr className="border-b"><td className="p-2">下载体积</td><td className="p-2">分发与加载需要的字节</td><td className="p-2">查看最终压缩资源包</td></tr><tr className="border-b"><td className="p-2">解码像素</td><td className="p-2">宽高乘通道形成的内存</td><td className="p-2">列尺寸、格式与驻留数量</td></tr><tr className="border-b"><td className="p-2">画面占比</td><td className="p-2">玩家实际看到的大小</td><td className="p-2">目标分辨率运行观察</td></tr></tbody></table></div></div>) },
  { label: "像素密度与显示尺寸", left: (<div className="space-y-4"><PageTitle>像素密度与显示尺寸</PageTitle><BookParagraph>若角色设计高度三十二像素，运行时显示六十四像素，它的每个源像素占二乘二个屏幕像素。整数倍缩放便于保持像素格均匀；显示为四十八像素时比例为一点五，部分源像素可能占一列、部分占两列，产生不均匀边缘。</BookParagraph>
<BookParagraph>最近邻保持硬边，但不能自动解决非整数缩放带来的步进。平滑过滤减轻块状感，却可能模糊像素轮廓。选择应结合画风、摄像机缩放与目标分辨率，而不是把某个过滤模式视为所有二维资产的正确答案。</BookParagraph></div>), right: (<div className="space-y-4"><PageTitle>图集布局与透明边缘</PageTitle><BookParagraph>图集外边距在整张纹理周围，间距在相邻帧之间。切片坐标必须同时考虑两者。自动打包还可能旋转或裁剪素材，运行端需读取对应元数据；若只按规则网格切图，就应关闭这些变换，保持固定帧尺寸。</BookParagraph>
<BookParagraph>透明像素的颜色也可能参与平滑采样，相邻帧又可能通过过滤或低分辨率层级渗入。管线可以扩展边缘颜色并留间隔，但所需宽度取决于缩放和采样方式。用深浅两种背景放大检查，比只看透明棋盘格更容易发现色边。</BookParagraph></div>) },
  { label: "切图坐标的逐步推演", left: (<div className="space-y-4"><PageTitle>切图坐标的逐步推演</PageTitle><BookParagraph>每帧宽三十二、间隔二，所以列跨度为三十四。第五号帧在四列图集中位于第二行第二列：横坐标为外边距二加一乘三十四，纵坐标同理都是三十六。宽高仍为三十二，不能把间隔也当作图像区域。</BookParagraph>
<BookParagraph>锚点用帧内坐标记录，例如脚底中心十六、三十二。若导出时裁掉左边四个透明像素，新锚点横坐标也应减四；只改图片尺寸不改锚点，就会让同一角色在切帧时左右跳。</BookParagraph></div>), right: (<div className="space-y-4"><PageTitle>独立计算图集切片位置</PageTitle><BookParagraph>示例输入非负整数帧号和正整数列数，输出源图中的左上角。完整加载器还需检查帧号小于总帧数，确认切片未越过纹理尺寸。把图集参数纳入资源清单，能够在导入时提前发现错列、漏帧和间隔配置错误。</BookParagraph><BookParagraph>JavaScript；浏览器控制台或 Node.js 独立运行。输入与预期输出见注释。</BookParagraph><BookCode language="javascript" showLineNumbers code={"// 图集：4列、每帧32×32、外边距2、帧间距2；帧号从0起\n// 输入帧号与列数，输出切片左上角，不包含旋转或自动裁切\nfunction frameOrigin(index, columns) {\n  return { x: 2 + (index % columns) * 34,\n           y: 2 + Math.floor(index / columns) * 34 };\n}\nconsole.log(frameOrigin(0, 4)); // {x:2,y:2}\nconsole.log(frameOrigin(5, 4)); // {x:36,y:36}"} /></div>) },
  { label: "纹理驻留与压缩的区别", left: (<div className="space-y-4"><PageTitle>纹理驻留与压缩的区别</PageTitle><BookParagraph>一张二千零四十八见方的RGBA8纹理包含四百多万个像素，乘四字节得到十六MiB。PNG在磁盘上可能只有几百KiB，那是文件压缩结果，解码后并不会仍占同样小的体积。运行时还可能存在CPU副本、GPU副本和临时加载缓冲。</BookParagraph>
<BookParagraph>完整mipmap逐级把宽高各减半，像素量约为原图的四分之一、十六分之一依次相加，总计接近原图的三分之一额外开销。四比三是近似预算，实际格式、对齐与压缩块会改变数字，因此应分别记录估计与实测。</BookParagraph></div>), right: (<div className="space-y-4"><PageTitle>资产变更如何不破坏玩法</PageTitle><BookParagraph>替换敌人图片时检查剪影、锚点、尺寸、帧序和危险提示。新的武器看起来更长却仍沿用旧碰撞盒，会造成玩家对命中距离的误判；可以调整画面或规则，但需要同时更新规格和对应场景，而不是只批准图片美观。</BookParagraph>
<BookParagraph>交付源文件、导出参数、图集元数据与用途说明，能让后来者修改一帧后正确重建整张图集。来源与许可记录应跟资产版本对应；当资产被替换或改编，更新记录，避免发布时无法判断最终使用的是哪一份素材。</BookParagraph></div>) },
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

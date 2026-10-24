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
  chapterTitle: '游戏引擎',
  chapterNumber: 7,
  totalChapters: 10,
  subjectHref: '/study/se/game',
  prevChapter: { label: '实战案例与项目', href: '/study/se/game/projects' },
  nextChapter: { label: '游戏美术', href: '/study/se/game/art' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: "引擎负责哪些工作",
    left: (
      <div className="space-y-4">
        <PageTitle>引擎负责哪些工作</PageTitle>
        <BookParagraph>游戏引擎通常整合渲染、输入、物理、音频、资源与编辑工具。使用引擎仍要理解调用时机和数据所有权：同一帧既用物理系统移动物体，又直接改显示位置，常会让碰撞与画面分离。先掌握一个二维场景，再比较其他工具能否满足目标平台和团队能力。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>场景与生命周期</PageTitle>
        <BookParagraph>Godot以节点组成场景，场景可以作为可复用对象实例化。初始化阶段获取子节点与配置，逐帧处理用于视觉更新，固定物理处理用于碰撞相关运动，退出时释放外部订阅与计时任务。不要假定每个子节点初始化的时机都与父节点完全相同。</BookParagraph>
        <SectionTitle>实施顺序</SectionTitle>
        <BookList ordered items={["建立节点树并配置碰撞形状，先验证生命周期回调再添加运动。", "为所有坐标变量注明局部、全局或屏幕空间，并在边界处统一转换。"]} />
      </div>
    ),
  },
  {
    label: "坐标系不能混用",
    left: (
      <div className="space-y-4">
        <PageTitle>坐标系不能混用</PageTitle>
        <BookParagraph>局部坐标相对父节点，世界坐标描述场景中的位置，屏幕坐标还受相机、视口和缩放影响。父节点平移后，子节点局部位置可以不变而世界位置改变。把屏幕鼠标位置直接赋给局部位置，在相机移动或父节点缩放后就会偏离；必须明确转换方向。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>Godot移动示例</PageTitle>
        <BookParagraph>下面脚本用于Godot 4系的CharacterBody2D，需添加碰撞形状，将Motion Mode设为Floating，并在Input Map配置四个方向动作。输入向量限制斜向长度，velocity使用每秒单位，move_and_slide根据引擎物理步处理移动，不再手动乘delta后传入速度。脚本不包含跳跃与重力。</BookParagraph>
        <BookParagraph>Godot 4系二维项目，CharacterBody2D加CollisionShape2D，Motion Mode选Floating；先配置Input Map动作。</BookParagraph>
        <BookCode language="gdscript" showLineNumbers code={"# Godot 4系 GDScript，挂到 CharacterBody2D\nextends CharacterBody2D\n\n@export var speed: float = 180.0\n\nfunc _physics_process(_delta: float) -> void:\n    var direction := Input.get_vector(\n        \"move_left\", \"move_right\", \"move_up\", \"move_down\"\n    )\n    velocity = direction * speed\n    move_and_slide()\n\n# 本地与世界坐标转换示例（Node2D）：\n# var world_point = to_global(Vector2(10, 0))\n# var local_point = to_local(world_point)"} />
      </div>
    ),
  },
  {
    label: "组件通信与资源",
    left: (
      <div className="space-y-4">
        <PageTitle>组件通信与资源</PageTitle>
        <BookParagraph>节点之间尽量通过明确定义的信号传递“受伤”“金币收集”等事件；接收方自行决定界面如何变化。资源是可共享数据，修改同一资源可能影响多个实例；需要实例独立状态时使用各自字段或复制资源。不要把玩家本局生命值存在所有敌人共享的配置对象中。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>选型与排错</PageTitle>
        <BookParagraph>选型先列需要的平台、二维或三维、资源规模、协作方式与导出流程，再做小型验证。排错时先看节点树是否存在、回调是否启用、坐标属于哪个空间、碰撞层与遮罩是否匹配。引擎名称不能解释问题，具体生命周期和数据流才能。</BookParagraph>
        <SectionTitle>常见错误</SectionTitle>
        <BookList items={["给velocity乘delta后又交给move_and_slide，导致速度受物理频率影响。", "直接比较屏幕鼠标位置与局部目标位置，忽略相机和父节点变换。"]} />
      </div>
    ),
  },
  {
    label: "练习：移动的平台",
    left: (
      <div className="space-y-4">
        <PageTitle>练习：移动的平台</PageTitle>
        <BookParagraph>建立一个父节点缓慢水平移动的平台，在其下放置角色标记，同时放一个世界坐标固定的目标。输出标记的局部和全局坐标，拖动相机后仍让鼠标点击正确选择目标；使用引擎提供的坐标转换而非硬编码屏幕偏移。</BookParagraph>
        <BookAlert type="info" message={"制作父节点移动与相机缩放的坐标验证场景，提交三组局部/全局坐标对照及斜向移动检查。"} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>验收与资料</PageTitle>
        <BookParagraph>验收父节点移动时标记的局部坐标不变、全局坐标改变；相机平移及缩放后点击仍命中同一目标；角色斜向速度不超过水平速度。附场景树、输入动作配置和一次退出后无残留信号的检查记录。</BookParagraph>
        <SectionTitle>参考思路</SectionTitle>
        <BookParagraph>参考思路：用to_global与to_local做往返验证；点选优先在目标所属坐标空间完成，记录转换前后的数值。</BookParagraph>
        <SectionTitle>官方资料</SectionTitle>
        <BookParagraph><a href="https://docs.godotengine.org/en/stable/tutorials/scripting/idle_and_physics_processing.html" target="_blank" rel="noreferrer">Godot：处理与物理处理</a></BookParagraph>
        <BookParagraph><a href="https://docs.godotengine.org/en/stable/tutorials/2d/2d_transforms.html" target="_blank" rel="noreferrer">Godot：视口与画布变换</a></BookParagraph>
      </div>
    ),
  },
]

export default function GameEnginePage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

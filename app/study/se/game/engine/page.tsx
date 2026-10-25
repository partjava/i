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
        <BookParagraph>引擎提供约定好的运行框架，学习重点是对象什么时候进入世界、哪些数据由哪个系统维护，以及命令如何转成画面。用最小场景验证一条链路，比先记住大量编辑器按钮更有迁移价值；换引擎时仍然可以沿这些问题重新建立认识。</BookParagraph>
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
  { label: "生命周期决定依赖时机", left: (<div className="space-y-4"><PageTitle>生命周期决定依赖时机</PageTitle><BookParagraph>以父节点关卡和子节点玩家为例，进入场景树时先执行父节点的进入回调，再进入子节点；就绪回调则从子节点向父节点进行。父节点可在就绪时读取已就绪的子节点，但子节点不应假定父节点的就绪工作已经完成。</BookParagraph>
<BookParagraph>初始化、重新开局与重新进入树不是同一件事。若对象被保留后重新挂接，不能假定所有初始化回调都会按首次创建方式重复执行。把本局重置做成显式规则，让生命、计时与输入的恢复不依赖碰巧触发某个回调。</BookParagraph></div>), right: (<div className="space-y-4"><PageTitle>用日志验证回调顺序</PageTitle><BookParagraph>先给父子节点各打印进入、就绪和退出消息，再创建第二个实例。通过对象编号区分两组日志，观察同类场景的实例各自执行生命周期。官方Node类文档给出了顺序约定，实际调试仍需结合节点何时被添加到树中。</BookParagraph><div className="overflow-x-auto my-4"><table className="w-full text-sm border-collapse"><thead><tr className="border-b-2"><th className="text-left p-2 font-semibold">阶段</th><th className="text-left p-2 font-semibold">Godot节点的顺序</th><th className="text-left p-2 font-semibold">适合放的工作</th></tr></thead><tbody><tr className="border-b"><td className="p-2">进入树</td><td className="p-2">父节点先进入、子节点后进入</td><td className="p-2">建立树内关联与登记</td></tr><tr className="border-b"><td className="p-2">就绪</td><td className="p-2">子节点先就绪、父节点后就绪</td><td className="p-2">访问已就绪子节点</td></tr><tr className="border-b"><td className="p-2">退出与销毁</td><td className="p-2">明确清理外部资源</td><td className="p-2">停止外部订阅与异步结果写入</td></tr></tbody></table></div></div>) },
  { label: "物理对象类型的职责", left: (<div className="space-y-4"><PageTitle>物理对象类型的职责</PageTitle><BookParagraph>静态墙体用于阻挡，受物理模拟的刚体由力与碰撞推动，角色控制器则接受脚本给出的运动意图。选择对象类型应依据谁拥有位移控制权：既让物理解算推动刚体，又每步直接覆盖其位置，会让速度和接触结果互相冲突。</BookParagraph>
<BookParagraph>二维躲避角色通常适合脚本控制的角色体。配置碰撞形状后，还需确认形状未禁用、尺寸有效、物理层与遮罩正确。可见图像不是碰撞形状；把图片放大两倍，并不会自动证明伤害范围也按设计变大。</BookParagraph></div>), right: (<div className="space-y-4"><PageTitle>层与遮罩的实际含义</PageTitle><BookParagraph>层表示自己属于哪些类别，遮罩表示本对象检测哪些类别。可将世界、玩家、敌人、拾取物划到不同位，列出哪些配对需要接触。传感区域的检测方向与物理体阻挡规则不同，必须结合具体节点的官方文档验证，不能只凭名称判断。</BookParagraph>
<BookParagraph>当角色穿墙时，先显示碰撞形状，再核对墙与角色的类型和检测配置；当碰撞正常却没有伤害，检查事件连接与规则条件。把空间接触和玩法伤害分开，能缩小排错范围，避免通过乱改层编号碰运气。</BookParagraph></div>) },
  { label: "坐标变换可以手算", left: (<div className="space-y-4"><PageTitle>坐标变换可以手算</PageTitle><BookParagraph>父节点在世界位置一百、五十，统一缩放为二，子节点局部位置十、五，则世界位置为一百二十、六十。子节点局部坐标未变，但父节点向右移动十像素后，它的世界横坐标也增加十。这是父子变换组合的结果。</BookParagraph>
<BookParagraph>有旋转时不能只加位置，必须使用完整变换；相机与视口又在世界到屏幕之间加入另一层映射。选择目标时先决定比较发生在哪个空间，再统一转换两个点。变量名加local、world或screen比注释“位置”更能防止误用。</BookParagraph></div>), right: (<div className="space-y-4"><PageTitle>用简化模型建立直觉</PageTitle><BookParagraph>下面只计算平移和缩放，输出与手算结果一致。它的作用是解释局部点为何受父节点影响，不能替代引擎完整变换。真实场景应使用引擎提供的转换方法，并做局部到世界再返回局部的往返检查。</BookParagraph><BookParagraph>JavaScript；浏览器控制台或 Node.js 独立运行。输入与预期输出见注释。</BookParagraph><BookCode language="javascript" showLineNumbers code={"// 仅演示无旋转时的二维坐标变换；非引擎API\n// 输入：父节点平移与缩放、子节点局部点；输出：世界点\nfunction toWorld(parent, local) {\n  return { x: parent.x + local.x * parent.sx,\n           y: parent.y + local.y * parent.sy };\n}\nconsole.log(toWorld({x:100, y:50, sx:2, sy:2}, {x:10, y:5}));\n// { x: 120, y: 60 }，旋转或多层父子关系需完整变换"} /></div>) },
  { label: "信号连接与实例边界", left: (<div className="space-y-4"><PageTitle>信号连接与实例边界</PageTitle><BookParagraph>玩家发出生命改变信号，界面接收并更新显示；玩家不需要知道界面节点放在哪个绝对路径。信号载荷包含新生命值与实体编号，可让接收方判断事件归属。若每次重试重复连接同一监听逻辑，一次受伤可能刷新或播放多次反馈。</BookParagraph>
<BookParagraph>共享资源适合纹理、音频和只读配置；本局生命、冷却与任务进度属于实例状态。复制资源时还应确认嵌套资源是否仍被共享。先做两个敌人实例，只修改其中一个的状态，观察另一个是否变化，可以直接发现意外共享。</BookParagraph></div>), right: (<div className="space-y-4"><PageTitle>选型用小型验证回答</PageTitle><BookParagraph>引擎评估应制作同一小场景：角色移动、若干碰撞体、一组动画、声音和一次目标平台导出。记录编辑效率、产物大小与运行性能，再看团队是否能维护。宣传中的支持某平台，不等于项目使用的每种插件都能顺利导出。</BookParagraph>
<BookParagraph>选择成熟引擎仍需要保留可独立测试的规则。若计分与胜负完全依赖节点路径，场景改名就可能影响逻辑；把规则数据从节点组织中抽离，可以让编辑器负责表现组合，规则函数负责可解释的状态变化。</BookParagraph></div>) },
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
        <BookParagraph><a href="https://docs.godotengine.org/en/stable/classes/class_node.html" target="_blank" rel="noreferrer">Godot：节点生命周期顺序</a></BookParagraph>
        <BookParagraph><a href="https://docs.godotengine.org/en/stable/classes/class_characterbody2d.html" target="_blank" rel="noreferrer">Godot：CharacterBody2D速度与移动接口</a></BookParagraph>
        <BookParagraph><a href="https://docs.godotengine.org/en/stable/tutorials/scripting/idle_and_physics_processing.html" target="_blank" rel="noreferrer">Godot：处理与物理处理</a></BookParagraph>
        <BookParagraph><a href="https://docs.godotengine.org/en/stable/tutorials/2d/2d_transforms.html" target="_blank" rel="noreferrer">Godot：视口与画布变换</a></BookParagraph>
      </div>
    ),
  },
]

export default function GameEnginePage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

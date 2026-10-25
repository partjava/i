'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, BookParagraph, BookCode, BookList, BookAlert, BookDivider } from '@shared/components/ui/book/BookContent'
import { CodeOutlined } from '@ant-design/icons'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '基础语法与组件',
  chapterNumber: 3,
  totalChapters: 11,
  subjectHref: '/study/se/android',
  prevChapter: { label: '开发环境配置', href: '/study/se/android/setup' },
  nextChapter: { label: 'UI开发与布局', href: '/study/se/android/ui' },
  theme: THEMES.software,
}

const JAVA_KOTLIN_CODE = `// Java
String msg = "Hello Android";
System.out.println(msg);

// Kotlin
val msg = "Hello Android"
println(msg)`

const ACTIVITY_LIFECYCLE_CODE = `@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
}

@Override
protected void onStart() { super.onStart(); }
@Override
protected void onResume() { super.onResume(); }
@Override
protected void onPause() { super.onPause(); }
@Override
protected void onStop() { super.onStop(); }
@Override
protected void onDestroy() { super.onDestroy(); }`

const SPREADS = [
  // ===== 跨页 1: Java/Kotlin基础 =====
  {
    label: '语言基础',
    left: (
      <div className="space-y-4">
        <PageTitle icon={<CodeOutlined />}>Java / Kotlin 基础</PageTitle>
<BookParagraph>{"原GlobalScope示例仅说明协程语法，不适合作为页面任务生命周期范式；fetchData、资源id和组件注册均需宿主提供。新增内容区分Activity、ViewModel与进程状态，避免把内存保留误认为永久保存。"}</BookParagraph>
        <BookParagraph>
          Android 开发支持 Java 和 Kotlin 两种语言。Kotlin 已成为官方推荐语言，但与 Java 完全互操作。
        </BookParagraph>
<BookParagraph>{"Java与Kotlin可调用相同平台接口，差别不只在语法长度。可空类型帮助表达缺失值，但空字符串、无效邮箱和越权用户仍需业务校验。先在纯函数里验证规则，再放进生命周期回调，可避免把语言特性与系统状态混在一起排错。"}</BookParagraph>
        <BookCode
          language="java"
          showLineNumbers
          code={JAVA_KOTLIN_CODE}
        />
        <BookDivider />
        <PageTitle icon={<CodeOutlined />}>Kotlin 常用特性</PageTitle>
        <BookCode
          language="kotlin"
          showLineNumbers
          code={`// 空安全
var name: String? = null
val length = name?.length ?: 0

// 数据类
data class User(val id: Int, val name: String)

// 扩展函数
fun String.isEmail(): Boolean = contains("@")

// Activity片段：需引入lifecycle-runtime-ktx及lifecycleScope，fetchData由业务提供。
lifecycleScope.launch {
    val result = withContext(Dispatchers.IO) { fetchData() }
    textView.text = result
}`}
        />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle icon={<CodeOutlined />}>四大组件简介</PageTitle>
        <BookParagraph>
          Android 应用由四大组件构成，每个组件都有独立的生命周期与职责。
        </BookParagraph>
<BookParagraph>{"四大组件由系统在特定入口创建和调度，不是四个随意互相new的普通工具类。一次页面操作可能跨过组件、线程和存储边界；画出触发者与拥有者，能帮助判断回调结束后哪些工作仍在进行，以及退出页面时谁负责取消。"}</BookParagraph>
        <BookList items={[
          'Activity —— 界面交互，每个屏幕对应一个 Activity',
          'Service —— 后台服务，执行长时间运行的操作（音乐播放、文件下载）',
          'BroadcastReceiver —— 广播接收，响应系统或应用发出的广播事件',
          'ContentProvider —— 数据共享，向其他应用提供统一的数据访问接口',
        ]} />
        <BookAlert type="info" message="四大组件都需要在 AndroidManifest.xml 中注册才能使用" />
      </div>
    ),
  },

  // ===== 跨页 2: Activity生命周期 =====
{ label: "组件回调不是顺序执行的main", left: (<div className="space-y-4">
<PageTitle>{"组件回调不是顺序执行的main"}</PageTitle>
<BookParagraph>{"Activity由系统根据导航、窗口与资源情况调用生命周期方法，开发者不能假设onCreate之后应用永远保持前台。onStart表示进入可见状态，onResume表示进入可交互的恢复状态；进入后台后还可能恢复或被结束。回调中应完成与该状态对应的操作，不能把网络结果仅绑定到首次创建。返回页面可能不重新执行onCreate，因此刷新策略要由业务决定，而非盲目在所有回调重复请求。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"推演一：旋转屏幕后的搜索页"}</PageTitle>
<BookParagraph>{"用户输入“协程”，列表请求尚未完成时旋转屏幕，旧Activity可能销毁并创建新实例。若线程捕获旧textView，结果返回时更新的是离开屏幕的View，并可能让旧Activity无法回收。ViewModel可持有跨配置变化的查询状态，新Activity重新观察它；已经启动的请求是否复用、取消或重新请求需要明确规则。配置变化保留不等于进程死亡保留，必须区分对象存活边界。"}</BookParagraph>
</div>) },
{ label: "三种状态放在哪里", left: (<div className="space-y-4">
<PageTitle>{"三种状态放在哪里"}</PageTitle>
<BookParagraph>{"编辑框草稿、正在查看的课程编号和下载完成的任务并非同一种数据。临时界面状态可放内存与保存状态机制，长期业务事实应放数据库或服务端。Bundle不适合装大量列表或图片，保存稳定标识后重新查询通常更可靠。ViewModel也不应持有Activity或View引用。下表按恢复目标选择位置，避免因为某次旋转测试通过就误认为系统回收进程后仍能完整恢复。"}</BookParagraph>
<div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><thead><tr><th className="border-b p-2 text-left">{"状态类型"}</th><th className="border-b p-2 text-left">{"适合位置"}</th><th className="border-b p-2 text-left">{"不能保证什么"}</th></tr></thead><tbody><tr><td className="border-b p-2 align-top">{"当前界面对象"}</td><td className="border-b p-2 align-top">{"Activity/Fragment View"}</td><td className="border-b p-2 align-top">{"配置变化后对象相同"}</td></tr><tr><td className="border-b p-2 align-top">{"配置变化业务状态"}</td><td className="border-b p-2 align-top">{"ViewModel"}</td><td className="border-b p-2 align-top">{"进程结束后仍在"}</td></tr><tr><td className="border-b p-2 align-top">{"少量恢复参数"}</td><td className="border-b p-2 align-top">{"保存状态机制"}</td><td className="border-b p-2 align-top">{"存放大图片与全量结果"}</td></tr><tr><td className="border-b p-2 align-top">{"持久业务事实"}</td><td className="border-b p-2 align-top">{"数据库或服务端"}</td><td className="border-b p-2 align-top">{"自动恢复全部UI细节"}</td></tr></tbody></table></div>
</div>), right: (<div className="space-y-4">
<PageTitle>{"可观察的生命周期日志"}</PageTitle>
<BookParagraph>{"下例是Java Activity宿主中的覆写片段，需已有AppCompatActivity、android.util.Log导入与合法清单入口。运行后先打开页面，再按Home，再返回，观察回调实际序列；不同窗口场景的可见性不能靠背诵固定序列代替。预期是每次进入与离开可见状态有对应日志，日志用于验证资源订阅时机，不应在其中输出令牌或个人输入。"}</BookParagraph>
<BookCode language="java" showLineNumbers code={"@Override protected void onStart() {\n    super.onStart();\n    Log.d(\"Lifecycle\", \"visible\");\n}\n@Override protected void onStop() {\n    Log.d(\"Lifecycle\", \"not visible\");\n    super.onStop();\n}"} />
</div>) },
{ label: "推演二：Fragment的View先结束", left: (<div className="space-y-4">
<PageTitle>{"推演二：Fragment的View先结束"}</PageTitle>
<BookParagraph>{"Fragment对象与它的View拥有不同生命周期。在返回栈中，Fragment对象可能存在而onDestroyView已经发生。若绑定对象一直引用旧View，后续观察数据可能更新错误界面并泄漏资源。把仅用于界面的观察绑定到viewLifecycleOwner，并在onDestroyView释放View绑定引用。重新进入时用同一份业务状态生成新View，避免把“还有Fragment对象”误解成“仍然可以操作旧按钮”。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"空安全与边界校验的区别"}</PageTitle>
<BookParagraph>{"Kotlin的可空类型让缺失值在类型层面可见，但非空字符串仍可能是空白、格式错误或超过长度限制。旧isEmail只检查是否含有@，只能作为扩展函数语法例子，不能证明地址可投递。UI输入先规范化，再按规则验证，服务端仍需重复校验。强行使用双感叹号会把暂时缺失的数据变成崩溃；合理的空状态应显示加载、缺失或错误，而不是随便补一个看似合法的值。"}</BookParagraph>
</div>) },
{ label: "练习：验证状态恢复边界", left: (<div className="space-y-4">
<PageTitle>{"练习：验证状态恢复边界"}</PageTitle>
<BookParagraph>{"建立一个含搜索词和结果列表的页面，分别执行旋转、返回栈切换和后台进程被系统回收后的恢复。验收：搜索词按需求恢复，旧View不再收到更新，不重复提交修改操作；解释哪些状态由ViewModel保留，哪些需保存状态或持久层。参考思路是记录Activity与Fragment实例标识、查询参数和订阅时间，逐步比较状态归属，而不是仅看页面最后是否出现数据。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"组件协作要有明确入口"}</PageTitle>
<BookParagraph>{"Activity负责用户交互入口，Service承载适合的服务工作，BroadcastReceiver响应广播，ContentProvider按契约提供数据访问，它们不应随意互相持有对象。Intent传递稳定小参数并验证来源，不能把整个复杂对象图作为跨组件共享内存。长时间后台工作还要遵守系统调度限制。现有Java/Kotlin对照用于理解语法，真正调用系统能力时必须同时考虑清单、权限、线程与生命周期。"}</BookParagraph>
<BookList items={[<a key="https://developer.android.com/guide/components/activities/activity-lifecycle" href="https://developer.android.com/guide/components/activities/activity-lifecycle" target="_blank" rel="noopener noreferrer" className="underline">{"Activity生命周期"}</a>]} />
</div>) },
  {
    label: '生命周期',
    left: (
      <div className="space-y-4">
        <PageTitle icon={<CodeOutlined />}>Activity 生命周期</PageTitle>
        <BookParagraph>
          Activity 从创建到销毁会经历一系列回调方法，理解生命周期是 Android 开发的基础。
        </BookParagraph>
        <BookCode
          language="java"
          showLineNumbers
          code={ACTIVITY_LIFECYCLE_CODE}
        />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle icon={<CodeOutlined />}>生命周期各阶段说明</PageTitle>
        <BookList items={[
          'onCreate() —— Activity 创建，执行初始化操作（setContentView、绑定数据）',
          'onStart() —— Activity 可见但无法交互',
          'onResume() —— Activity 获得焦点，可交互',
          'onPause() —— Activity 失去焦点，保存轻量级状态',
          'onStop() —— Activity 完全不可见，释放资源',
          'onDestroy() —— Activity 销毁，清理所有资源',
          'onRestart() —— Activity 从停止状态重新启动',
        ]} />
        <BookDivider />
        <PageTitle icon={<CodeOutlined />}>Fragment 生命周期</PageTitle>
        <BookParagraph>
          Fragment 拥有类似的生命周期，但附加在 Activity 上。关键方法包括：
        </BookParagraph>
        <BookList items={[
          'onAttach() —— 绑定到 Activity',
          'onCreateView() —— 创建 Fragment 布局',
          'onViewCreated() —— 视图创建完成',
          'onDestroyView() —— 视图销毁',
          'onDetach() —— 与 Activity 解绑',
        ]} />
      </div>
    ),
  },
]

export default function BasicPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

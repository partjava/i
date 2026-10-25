'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, BookParagraph, BookCode, BookList, BookDivider } from '@shared/components/ui/book/BookContent'
import { InfoCircleOutlined } from '@ant-design/icons'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '概述',
  chapterNumber: 1,
  totalChapters: 11,
  subjectHref: '/study/se/android',
  nextChapter: { label: '开发环境配置', href: '/study/se/android/setup' },
  theme: THEMES.software,
}

const SPREADS = [
  // ===== 跨页 1: 平台简介与发展历程 =====
  {
    label: '平台简介',
    left: (
      <div className="space-y-4">
        <PageTitle icon={<InfoCircleOutlined />}>平台简介</PageTitle>
<BookParagraph>{"本章保留Java与XML的Views入门路线。Activity代码需要Android应用模块、AppCompat依赖、清单注册和对应布局资源；不是单文件Java程序。平台和市场描述属于概览，不应据此选择生产版本。"}</BookParagraph>
        <BookParagraph>
          Android 是基于 Linux 的开源移动操作系统，广泛应用于手机、平板、智能硬件等领域。自 2008 年首个 Android 手机发布以来，Android 已成为全球最大的移动操作系统。
        </BookParagraph>
<BookParagraph>{"入口不是任意Java类：系统按清单和Intent启动组件。先确认应用模块、包身份和启动Activity，再检查布局资源是否存在。Hello页面只验证启动与渲染，任务保存、离线恢复和权限属于后续独立职责，不能由一行文本成功显示推断整个应用链路正常。"}</BookParagraph>
        <BookDivider />
        <PageTitle icon={<InfoCircleOutlined />}>发展历程</PageTitle>
        <BookList items={[
          '2008 年 —— 首个 Android 手机（HTC Dream）发布',
          '2014 年 —— Android 成为全球最大移动平台',
          '持续迭代 —— 支持手机、平板、电视、手表、车载等多种设备形态',
          '最新版本 —— 持续引入 Material Design、隐私保护、AI 等新特性',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle icon={<InfoCircleOutlined />}>主流应用场景</PageTitle>
        <BookList items={[
          '移动 App 开发 —— 社交、电商、金融、教育等各类应用',
          '物联网与智能硬件 —— Android Things 与嵌入式设备',
          '车载系统 —— Android Auto 与车载信息娱乐系统',
          '智能电视 —— Android TV 大屏应用开发',
          '可穿戴设备 —— Wear OS 手表应用开发',
        ]} />
        <BookDivider />
        <PageTitle icon={<InfoCircleOutlined />}>技术栈概览</PageTitle>
        <BookList items={[
          '开发语言：Java / Kotlin',
          '开发工具：Android Studio',
          '构建工具：Gradle',
          'UI 框架：Jetpack Compose / XML',
          '架构模式：MVC / MVP / MVVM',
        ]} />
      </div>
    ),
  },

  // ===== 跨页 2: Hello World =====
{ label: "一次点击如何变成屏幕变化", left: (<div className="space-y-4">
<PageTitle>{"一次点击如何变成屏幕变化"}</PageTitle>
<BookParagraph>{"把待办应用看成一组由系统托管的入口，而不是从main函数一直运行的桌面程序。桌面图标触发启动Intent，系统查找清单中可处理启动动作的Activity，创建应用进程和组件实例，再调用生命周期方法。onCreate中加载XML会生成View对象树，随后系统测量、布局和绘制。点击按钮则进入主线程消息队列中的监听回调，修改状态后请求刷新；XML文件本身不会自动存储任务。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"推演一：界面、内存和持久数据"}</PageTitle>
<BookParagraph>{"学生输入“复习接口”后点击保存：输入框先持有文本，监听器读取并去掉首尾空格，业务规则检查非空，仓库保存任务，界面观察列表更新。若只把字符串加入Activity里的ArrayList，旋转屏幕重建Activity后可能丢失，进程退出更不会保留。把任务写入数据库后，新Activity仍需重新查询并渲染；屏幕仍显示旧列表不等于写入失败，应分别检查存储结果和观察链路。"}</BookParagraph>
</div>) },
{ label: "应用运行边界对照", left: (<div className="space-y-4">
<PageTitle>{"应用运行边界对照"}</PageTitle>
<BookParagraph>{"Android SDK提供系统接口，AndroidX是可随应用分发的支持库，Gradle负责组织构建，它们不是同一个层次。设备版本影响实际存在的系统能力，编译版本影响编译器认识哪些API，依赖版本影响打包进去的库。即使编辑器没有红线，低版本设备仍可能缺少某项系统方法。下表用同一个待办应用区分职责，遇到错误时先确定发生在哪一层，再寻找配置或代码。"}</BookParagraph>
<div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><thead><tr><th className="border-b p-2 text-left">{"层次"}</th><th className="border-b p-2 text-left">{"负责内容"}</th><th className="border-b p-2 text-left">{"待办案例"}</th></tr></thead><tbody><tr><td className="border-b p-2 align-top">{"SDK/系统"}</td><td className="border-b p-2 align-top">{"组件与生命周期"}</td><td className="border-b p-2 align-top">{"系统创建Activity"}</td></tr><tr><td className="border-b p-2 align-top">{"AndroidX"}</td><td className="border-b p-2 align-top">{"支持库能力"}</td><td className="border-b p-2 align-top">{"AppCompat与Room"}</td></tr><tr><td className="border-b p-2 align-top">{"应用代码"}</td><td className="border-b p-2 align-top">{"业务状态和规则"}</td><td className="border-b p-2 align-top">{"空标题禁止保存"}</td></tr><tr><td className="border-b p-2 align-top">{"构建工具"}</td><td className="border-b p-2 align-top">{"资源与字节码打包"}</td><td className="border-b p-2 align-top">{"生成可安装产物"}</td></tr></tbody></table></div>
</div>), right: (<div className="space-y-4">
<PageTitle>{"推演二：dp为什么不等于像素"}</PageTitle>
<BookParagraph>{"假设布局宽度为120dp，在密度比例为1的设备约占120像素，在比例为3的设备约占360像素，目的在于保持近似的物理显示尺寸。文字使用sp还会响应用户字体设置。下面是可在Python 3运行的尺寸换算教学模型，不是Android布局引擎；预期输出120和360。真实布局还涉及可用窗口、系统栏和测量约束，因此不能拿换算结果硬编码每台设备的控件宽度。"}</BookParagraph>
<BookCode language="python" showLineNumbers code={"for density in (1, 3):\n    print(round(120 * density))"} />
</div>) },
{ label: "首个应用的观察步骤", left: (<div className="space-y-4">
<PageTitle>{"首个应用的观察步骤"}</PageTitle>
<BookParagraph>{"先在现有Android Studio模板中确认启动Activity和清单入口一致，再把旧例中的XML放到res/layout/activity_main.xml，导入AppCompatActivity并确认主题兼容。启动后检查日志中的onCreate，再修改字符串资源并重新运行，观察打包后的文本是否变化。给TextView增加稳定id后才能通过findViewById查找；找不到资源通常应检查文件名、资源编译错误与模块，而不是随意导入其他包的R类。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"失败路径同样要有界面"}</PageTitle>
<BookParagraph>{"空标题不能创建任务，数据库暂时失败不能立即显示“保存成功”，重复点击不应无意创建两份相同操作。可以先禁用提交按钮，等待保存结果后恢复，并在失败时保留用户输入。这里的交互状态至少有编辑、保存中、保存失败和保存成功，不能仅用一个布尔变量描述所有情况。业务数据与临时提示分开管理，页面重建时应恢复草稿或已保存列表，而不是再次执行提交动作。"}</BookParagraph>
</div>) },
{ label: "练习：完成可解释的首次启动", left: (<div className="space-y-4">
<PageTitle>{"练习：完成可解释的首次启动"}</PageTitle>
<BookParagraph>{"为待办应用画出“启动请求、Activity创建、布局实例化、点击回调、数据写入、列表渲染”的六步流程，并在每一步标明由系统还是业务代码负责。验收时需展示首次启动、空标题和保存后重启三种结果，能够说明为何只改XML不会让任务自动持久化。参考思路是先打印关键步骤，再用一条固定任务核对输入和输出；不要把大量日志当成功证据，最终仍要检查屏幕与存储。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"学习路线与案例边界"}</PageTitle>
<BookParagraph>{"本方向先沿Java与XML理解组件、资源和生命周期，再学习仓库、异步和测试；已有项目采用Compose时也可复用状态与数据分层知识。Views与Compose是不同的界面表达方式，不决定是否需要验证输入或处理进程死亡。旧Hello示例只证明界面入口可以运行，不包含发布签名、网络权限或数据库。完成入门后应能独立定位“构建失败、启动崩溃、界面未更新、数据未保存”这四类问题。"}</BookParagraph>
<BookList items={[<a key="https://developer.android.com/guide/components/fundamentals" href="https://developer.android.com/guide/components/fundamentals" target="_blank" rel="noopener noreferrer" className="underline">{"Android应用基础"}</a>]} />
</div>) },
  {
    label: 'Hello World',
    left: (
      <div className="space-y-4">
        <PageTitle icon={<InfoCircleOutlined />}>第一个 Android 应用</PageTitle>
        <BookParagraph>
          创建一个基本的 Android Activity，这是 Android 应用的入口点。MainActivity 继承自 AppCompatActivity，通过 setContentView 加载布局文件。
        </BookParagraph>
<BookParagraph>{"阅读平台演进时要把系统能力、应用兼容库与开发工具分开。学习目标是识别当前项目依赖的接口边界；旧设备不会因为升级IDE自动获得新系统API。选择技术路线应依据目标设备、现有项目与功能，而非只依赖年份列表。"}</BookParagraph>
        <BookCode
          language="java"
          showLineNumbers
          code={`public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }
}`}
        />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle icon={<InfoCircleOutlined />}>布局文件</PageTitle>
        <BookParagraph>
          对应的 XML 布局文件 <code className="px-1 py-0.5 bg-paper-200 rounded text-xs font-code">res/layout/activity_main.xml</code>：
        </BookParagraph>
        <BookCode
          language="xml"
          showLineNumbers
          code={`<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:gravity="center">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello, Android!"
        android:textSize="24sp" />

</LinearLayout>`}
        />
      </div>
    ),
  },
]

export default function IntroPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  BookList,
  BookAlert,
  BookDivider,
} from '@shared/components/ui/book/BookContent'
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
        <BookParagraph>
          Android 开发支持 Java 和 Kotlin 两种语言。Kotlin 已成为官方推荐语言，但与 Java 完全互操作。
        </BookParagraph>
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

// 协程
GlobalScope.launch {
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

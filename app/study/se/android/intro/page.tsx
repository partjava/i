'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  BookList,
  BookDivider,
} from '@shared/components/ui/book/BookContent'
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
        <BookParagraph>
          Android 是基于 Linux 的开源移动操作系统，广泛应用于手机、平板、智能硬件等领域。自 2008 年首个 Android 手机发布以来，Android 已成为全球最大的移动操作系统。
        </BookParagraph>
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
  {
    label: 'Hello World',
    left: (
      <div className="space-y-4">
        <PageTitle icon={<InfoCircleOutlined />}>第一个 Android 应用</PageTitle>
        <BookParagraph>
          创建一个基本的 Android Activity，这是 Android 应用的入口点。MainActivity 继承自 AppCompatActivity，通过 setContentView 加载布局文件。
        </BookParagraph>
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

'use client'

import BookCover from '@/app/components/ui/book/BookCover'
import { THEMES } from '@/app/components/ui/book/theme'

const CHAPTERS = [
  { number: 1,  title: '概述',         description: 'Android平台简介、发展历程与Hello World',     href: '/study/se/android/intro' },
  { number: 2,  title: '开发环境配置',  description: 'JDK、Android Studio安装与Gradle构建',        href: '/study/se/android/setup' },
  { number: 3,  title: '基础语法与组件', description: 'Java/Kotlin语法与四大组件概述',              href: '/study/se/android/basic' },
  { number: 4,  title: 'UI开发与布局',  description: 'XML布局、ConstraintLayout与RecyclerView',    href: '/study/se/android/ui' },
  { number: 5,  title: '数据存储与网络', description: 'SharedPreferences、SQLite、Room与OkHttp',   href: '/study/se/android/data-network' },
  { number: 6,  title: '多媒体与传感器', description: 'Glide、MediaPlayer、相机与传感器使用',       href: '/study/se/android/media-sensor' },
  { number: 7,  title: '高级特性与性能优化', description: '多线程、性能优化与自定义View',           href: '/study/se/android/advanced' },
  { number: 8,  title: '安全与权限管理', description: '运行时权限、数据加密与代码混淆',             href: '/study/se/android/security' },
  { number: 9,  title: '第三方库与架构模式', description: 'MVP架构、Jetpack组件与Retrofit',         href: '/study/se/android/frameworks' },
  { number: 10, title: '测试与发布',    description: 'JUnit、Espresso测试与APK打包发布',            href: '/study/se/android/testing' },
  { number: 11, title: '实战项目与案例', description: '项目开发流程、Todo应用综合案例',              href: '/study/se/android/projects' },
]

export default function AndroidHomePage() {
  return (
    <BookCover
      title="安卓开发"
      subtitle="Android Development"
      description="从零开始学习Android开发，掌握现代移动应用开发技术，打造优秀的移动应用。本课程涵盖Java/Kotlin语法、Android SDK、Jetpack组件、Material Design等核心技术。"
      chapterCount={CHAPTERS.length}
      totalHours={35}
      chapters={CHAPTERS}
      icon="📱"
      startHref="/study/se/android/intro"
      theme={THEMES.software}
    />
  )
}

'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  BookList,
  BookAlert,
  BookDivider,
} from '@/app/components/ui/book/BookContent'
import { ToolOutlined, CodeOutlined } from '@ant-design/icons'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '开发环境配置',
  chapterNumber: 2,
  totalChapters: 11,
  subjectHref: '/study/se/android',
  prevChapter: { label: '概述', href: '/study/se/android/intro' },
  nextChapter: { label: '基础语法与组件', href: '/study/se/android/basic' },
  theme: THEMES.software,
}

const GRADLE_BUILD_CODE = `apply plugin: 'com.android.application'

android {
    compileSdkVersion 33
    defaultConfig {
        applicationId "com.example.demo"
        minSdkVersion 21
        targetSdkVersion 33
        versionCode 1
        versionName "1.0"
    }
}

dependencies {
    implementation 'androidx.core:core-ktx:1.9.0'
    implementation 'androidx.appcompat:appcompat:1.6.0'
    implementation 'com.google.android.material:material:1.8.0'
}`

const SPREADS = [
  // ===== 跨页 1: JDK与Android Studio =====
  {
    label: '环境安装',
    left: (
      <div className="space-y-4">
        <PageTitle icon={<ToolOutlined />}>JDK 安装</PageTitle>
        <BookParagraph>
          Android 开发需要 JDK 8 或以上版本。推荐使用 JDK 11 或 JDK 17，以获得更好的性能和兼容性。
        </BookParagraph>
        <BookList items={[
          '下载 JDK：访问 Oracle 官网或使用 OpenJDK',
          '配置 JAVA_HOME 环境变量',
          '验证安装：java -version',
          'Android Studio 内置了 JDK，也可单独安装',
        ]} />
        <BookDivider />
        <PageTitle icon={<ToolOutlined />}>Android Studio 安装</PageTitle>
        <BookParagraph>
          官方 IDE，集成了开发、调试、性能分析等工具。下载并安装后，SDK Manager 会自动下载所需的 SDK 版本。
        </BookParagraph>
        <BookList items={[
          '下载 Android Studio（当前最新版本为 Giraffe / Hedgehog）',
          '运行安装程序，选择安装路径',
          '启动后通过 SDK Manager 下载所需 SDK',
          '推荐安装 Android 12 (API 31) 或 Android 13 (API 33)',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle icon={<ToolOutlined />}>SDK 配置与 AVD 模拟器</PageTitle>
        <BookParagraph>
          配置 SDK 路径并创建 Android 虚拟设备（AVD），用于在开发阶段测试应用。
        </BookParagraph>
        <BookList items={[
          'SDK 路径：Android Studio → Settings → Appearance & Behavior → System Settings → Android SDK',
          'SDK Platforms：勾选目标 API Level',
          'SDK Tools：勾选 Android SDK Build-Tools、Emulator',
          '创建 AVD：Tools → AVD Manager → Create Virtual Device',
          '选择设备型号（推荐 Pixel 6）与系统镜像',
        ]} />
        <BookAlert type="info" message="如果电脑支持 Intel HAXM 或 Windows Hyper-V，开启硬件加速可大幅提升模拟器运行速度" />
      </div>
    ),
  },

  // ===== 跨页 2: 插件与构建 =====
  {
    label: '构建工具',
    left: (
      <div className="space-y-4">
        <PageTitle icon={<CodeOutlined />}>常用插件与调试工具</PageTitle>
        <BookList items={[
          'ADB (Android Debug Bridge) —— 设备连接与调试命令行工具',
          'Android Lint —— 静态代码分析，检测潜在 bug 与性能问题',
          'LeakCanary —— 内存泄漏自动检测库',
          'StrictMode —— 检测主线程中的磁盘/网络操作',
          'Profile 工具 —— CPU、内存、网络性能分析',
          'Logcat —— 实时日志查看与过滤',
        ]} />
        <BookDivider />
        <PageTitle icon={<CodeOutlined />}>Gradle 构建配置</PageTitle>
        <BookParagraph>
          Gradle 是 Android 的官方构建系统，通过 <code className="px-1 py-0.5 bg-paper-200 rounded text-xs font-code">build.gradle</code> 管理项目的依赖与构建配置。
        </BookParagraph>
        <BookCode
          language="groovy"
          showLineNumbers
          code={GRADLE_BUILD_CODE}
        />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle icon={<CodeOutlined />}>项目结构</PageTitle>
        <BookParagraph>
          一个标准的 Android 项目目录结构如下：
        </BookParagraph>
        <BookCode
          language="text"
          code={`app/
├── build.gradle          # 模块级构建配置
├── src/
│   ├── main/
│   │   ├── java/         # Java/Kotlin 源代码
│   │   ├── res/          # 资源文件（布局、图片、字符串等）
│   │   │   ├── layout/   # XML 布局文件
│   │   │   ├── drawable/ # 图片与形状资源
│   │   │   ├── values/   # 字符串、颜色、主题
│   │   │   └── mipmap/   # 应用图标
│   │   └── AndroidManifest.xml  # 应用清单
│   └── test/             # 单元测试
├── proguard-rules.pro    # 混淆规则
build.gradle              # 项目级构建配置
settings.gradle           # 项目设置`}
        />
        <BookAlert type="success" message="环境搭建完成后，下一步将学习 Kotlin/Java 基础语法与 Android 四大组件" />
      </div>
    ),
  },
]

export default function SetupPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

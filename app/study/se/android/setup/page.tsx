'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, BookParagraph, BookCode, BookList, BookAlert, BookDivider } from '@shared/components/ui/book/BookContent'
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
<BookParagraph>{"原JDK、SDK和依赖数字是历史示例，不是任意项目均兼容的安装建议。实际按AGP、Gradle和JDK兼容关系选择，并保留仓库Gradle Wrapper；本章不会要求直接升级所有组件。"}</BookParagraph>
        <BookParagraph>
          Android 开发需要 JDK 8 或以上版本。推荐使用 JDK 11 或 JDK 17，以获得更好的性能和兼容性。
        </BookParagraph>
<BookParagraph>{"先让项目自带Wrapper输出Gradle与JVM信息，再核对插件要求。终端默认JDK、IDE自身运行时和Gradle JDK可能不同；看到java命令成功并不能证明Android构建使用了同一环境。记录实际版本比反复重装全部工具更便于复现故障。"}</BookParagraph>
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
<BookParagraph>{"SDK Manager提供编译平台和设备工具，AVD提供受控运行环境，两者解决不同问题。先完成一次debug构建，再检查设备连接与安装；如果构建已经失败，重建模拟器通常不能修复XML、依赖或Java语法问题。"}</BookParagraph>
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
{ label: "构建环境是一条兼容链", left: (<div className="space-y-4">
<PageTitle>{"构建环境是一条兼容链"}</PageTitle>
<BookParagraph>{"构建失败可能发生在Java启动Gradle、Gradle加载Android Gradle Plugin、插件定位SDK或依赖下载等不同阶段。Android Studio内置运行时、终端JAVA_HOME和Gradle设置使用的JDK还可能不同。不要只看java -version就认定IDE构建使用同一版本。先记录项目Wrapper、插件版本、Gradle实际JVM及compileSdk，再对照兼容要求；同时更换四项会让原本简单的版本不匹配难以定位。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"推演一：同仓库为何只有一台机器失败"}</PageTitle>
<BookParagraph>{"甲在IDE中构建成功，乙在终端提示需要较新的Java。两人源代码和SDK相同，不代表启动Gradle的JVM相同。让两人先执行仓库中的./gradlew --version，比较输出里的Gradle与JVM，再检查IDE的Gradle JDK设置及JAVA_HOME。修复后应再次运行同一个命令，确认生效。不要先删除全局缓存，因为缓存清理既不能改变JVM，还可能增加网络下载与新的失败点。"}</BookParagraph>
</div>) },
{ label: "三个SDK数字影响不同问题", left: (<div className="space-y-4">
<PageTitle>{"三个SDK数字影响不同问题"}</PageTitle>
<BookParagraph>{"minSdk表示允许安装的最低系统级别；compileSdk决定编译时可使用的系统接口集合；targetSdk表示应用针对哪些行为变化完成适配，它不表示设备必须达到该版本。假设minSdk较低而代码调用较新接口，需要运行时版本判断或兼容库路径。仅把compileSdk改高不会为老设备补齐系统实现。下表用安装、编译和运行三个环节区分检查方法，避免看到“API级别”就修改同一处数字。"}</BookParagraph>
<div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><thead><tr><th className="border-b p-2 text-left">{"配置"}</th><th className="border-b p-2 text-left">{"作用"}</th><th className="border-b p-2 text-left">{"如何验收"}</th></tr></thead><tbody><tr><td className="border-b p-2 align-top">{"minSdk"}</td><td className="border-b p-2 align-top">{"安装最低系统限制"}</td><td className="border-b p-2 align-top">{"在最低版本设备安装"}</td></tr><tr><td className="border-b p-2 align-top">{"compileSdk"}</td><td className="border-b p-2 align-top">{"编译可识别API"}</td><td className="border-b p-2 align-top">{"编译并检查API调用"}</td></tr><tr><td className="border-b p-2 align-top">{"targetSdk"}</td><td className="border-b p-2 align-top">{"适配系统行为"}</td><td className="border-b p-2 align-top">{"测试权限及后台行为"}</td></tr><tr><td className="border-b p-2 align-top">{"Gradle JVM"}</td><td className="border-b p-2 align-top">{"运行构建工具"}</td><td className="border-b p-2 align-top">{"核对Wrapper版本输出"}</td></tr></tbody></table></div>
</div>), right: (<div className="space-y-4">
<PageTitle>{"可重复诊断而非盲目重装"}</PageTitle>
<BookParagraph>{"以下命令在已有Android项目根目录、已配置JDK与SDK时执行，不会创建项目。第一条查看实际构建环境，第二条查看连接设备，第三条构建debug变体。预期分别是版本信息、设备列表和成功产物；设备为空不意味着Java编译失败。Windows终端使用gradlew.bat，类Unix环境使用./gradlew。命令能否访问网络还取决于依赖缓存，离线构建前要先确认所需依赖已齐备。"}</BookParagraph>
<BookCode language="bash" showLineNumbers code={"./gradlew --version\nadb devices\n./gradlew :app:assembleDebug"} />
</div>) },
{ label: "推演二：包名、命名空间与资源", left: (<div className="space-y-4">
<PageTitle>{"推演二：包名、命名空间与资源"}</PageTitle>
<BookParagraph>{"applicationId决定设备上应用的身份，namespace影响生成代码的命名空间，源代码package描述类的位置，这些概念经常被历史模板写成同一个字符串。复制项目只改Java包名时，可能仍覆盖旧应用或引用错误R类。应先决定是否创建一个独立应用，再检查安装身份、清单组件名、测试包及资源引用。修改后同时安装两个变体，确认桌面入口和数据目录分别对应各自身份。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"从资源编译到安装的流程"}</PageTitle>
<BookParagraph>{"资源合并和编译先处理XML、字符串与图片，再编译Java或Kotlin代码，之后转换并打包成安装产物，最后安装到设备。XML属性拼错可能导致R类无法生成，后面的“找不到R”是连锁错误。排错应从构建日志第一个有意义的错误开始。若APK生成成功但安装失败，再检查设备系统版本、签名是否冲突和可用存储，不要继续修改语法已经通过的Activity。"}</BookParagraph>
</div>) },
{ label: "练习：形成可复现环境清单", left: (<div className="space-y-4">
<PageTitle>{"练习：形成可复现环境清单"}</PageTitle>
<BookParagraph>{"记录项目的Wrapper、插件、JDK、SDK路径、应用模块和运行设备，给出一条构建命令及产物位置。验收是另一台具备相同依赖的环境能按清单构建debug，并能解释终端成功而IDE失败的检查顺序。参考思路：分别记录构建工具使用的JDK与系统默认JDK；用模拟器验证最低支持版本和一个较新版本，不以单台高版本真机启动成功替代兼容性验证。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"维护版本与依赖的规则"}</PageTitle>
<BookParagraph>{"使用版本控制保存构建脚本和Wrapper，密钥、个人SDK绝对路径与本机local.properties通常不进入共享配置。依赖应来自可信仓库并固定可解释的版本范围，升级时一次处理相关兼容链并记录原因。旧脚本中的apply plugin与compileSdkVersion可帮助阅读遗留项目，但新旧DSL不能随意混拼。遇到代理、证书或仓库不可达时，应明确是下载问题，不能用关闭安全校验来掩盖失败。"}</BookParagraph>
<BookList items={[<a key="https://developer.android.com/build/jdks" href="https://developer.android.com/build/jdks" target="_blank" rel="noopener noreferrer" className="underline">{"Android构建的Java版本关系"}</a>]} />
</div>) },
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

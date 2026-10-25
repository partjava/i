'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, BookParagraph, BookCode, BookAlert, BookList } from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '开发环境配置',
  chapterNumber: 2,
  totalChapters: 10,
  subjectHref: '/study/se/dotnet',
  prevChapter: { label: '概述', href: '/study/se/dotnet/intro' },
  nextChapter: { label: 'C#基础与语法', href: '/study/se/dotnet/csharp' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: '环境安装',
    left: (
      <div className="space-y-4">
        <PageTitle>.NET SDK安装</PageTitle>
<BookParagraph>{"原8.0.100输出是示例，不是要求安装的固定版本。dotnet new模板随所选SDK变化；创建控制器API时要核对模板选项与服务注册，不能假定所有webapi模板都会生成相同结构。"}</BookParagraph>
        <BookParagraph>.NET SDK是开发.NET应用的核心工具包，包含编译器、运行时和命令行工具。</BookParagraph>
<BookParagraph>{"先用--info和已安装列表观察真实环境，再检查仓库global.json与项目TargetFramework。一个选择构建SDK，一个约束目标API，修改其中之一不会自动修复另一项。把工作目录与完整命令写进复现记录，避免不同终端选中不同工具链。"}</BookParagraph>
        <BookList items={[
          '安装.NET SDK（官方下载：dotnet.microsoft.com）',
          '推荐使用Visual Studio或VS Code',
          '安装完成后打开终端验证',
        ]} />
        <BookCode language="bash" showLineNumbers code={`# 验证 .NET SDK 安装
dotnet --version
# 输出示例: 8.0.100`} />
        <BookAlert type="success" message="看到版本号说明 .NET SDK 安装成功" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>项目创建与管理</PageTitle>
        <BookParagraph>使用dotnet命令行工具可以快速创建和管理项目。</BookParagraph>
<BookParagraph>{"创建项目后先确认模板生成了什么文件、注册哪些服务，再访问日志显示的监听地址。Web API模板可能采用不同端点形式，控制器代码需要对应注册与映射。启动成功但路由404时应先检查端点，而不是立即重装SDK或修改数据库。"}</BookParagraph>
        <BookCode language="bash" showLineNumbers code={`# 创建控制台项目
dotnet new console -n HelloDotnet
cd HelloDotnet
# 运行项目
dotnet run`} />
        <BookCode language="bash" showLineNumbers code={`# 创建Web API项目
dotnet new webapi -n MyApi
cd MyApi
dotnet run`} />
      </div>
    ),
  },
{ label: "SDK选择与目标框架是两条线", left: (<div className="space-y-4">
<PageTitle>{"SDK选择与目标框架是两条线"}</PageTitle>
<BookParagraph>{"dotnet命令首先选择SDK执行构建，项目中的TargetFramework说明应用面向的API与运行时目标。global.json可约束SDK选择，安装了多个SDK时尤其重要；它不直接修改目标框架。构建成功后，运行仍可能需要对应运行时。先记录dotnet --info、已安装SDK和运行时，再检查仓库配置，避免因为命令行能输出一个版本就假定它满足所有项目要求。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"推演一：父目录配置影响子项目"}</PageTitle>
<BookParagraph>{"开发者在项目目录运行正常，CI从仓库根目录运行却选择了不同SDK，可能与global.json查找位置有关。检查当前工作目录、配置文件所在目录和选择策略，而不是先改业务代码。SDK版本锁定还要考虑团队升级和安全维护流程，不应永远停留在某个历史补丁。复现时给出完整命令与工作目录，单独贴一行“build failed”无法证明版本选择是否一致。"}</BookParagraph>
</div>) },
{ label: "restore、build、run、publish的职责", left: (<div className="space-y-4">
<PageTitle>{"restore、build、run、publish的职责"}</PageTitle>
<BookParagraph>{"restore解析和获取NuGet依赖，build编译项目，run面向开发执行并按需构建，publish生成交付产物。这些命令可能隐式触发前置步骤，但排错时仍应区分逻辑边界。下表用失败信息解释应该检查什么，避免把源下载失败当作C#语法错误。项目引用和包引用也不同：前者连接仓库内项目，后者依赖包源与版本解析，应在审查时明确新增依赖来自哪里。"}</BookParagraph>
<div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><thead><tr><th className="border-b p-2 text-left">{"阶段"}</th><th className="border-b p-2 text-left">{"输入与输出"}</th><th className="border-b p-2 text-left">{"常见失败"}</th></tr></thead><tbody><tr><td className="border-b p-2 align-top">{"restore"}</td><td className="border-b p-2 align-top">{"包引用到依赖资产"}</td><td className="border-b p-2 align-top">{"源不可达或认证失败"}</td></tr><tr><td className="border-b p-2 align-top">{"build"}</td><td className="border-b p-2 align-top">{"源码到程序集"}</td><td className="border-b p-2 align-top">{"类型或语法不匹配"}</td></tr><tr><td className="border-b p-2 align-top">{"run"}</td><td className="border-b p-2 align-top">{"开发宿主启动"}</td><td className="border-b p-2 align-top">{"端口占用或配置错误"}</td></tr><tr><td className="border-b p-2 align-top">{"publish"}</td><td className="border-b p-2 align-top">{"生成部署产物"}</td><td className="border-b p-2 align-top">{"目标运行时或原生依赖问题"}</td></tr></tbody></table></div>
</div>), right: (<div className="space-y-4">
<PageTitle>{"只读诊断先于配置修改"}</PageTitle>
<BookParagraph>{"以下命令在已安装.NET工具的终端执行，预期分别列出环境、SDK和运行时；它们不创建项目也不访问业务数据库。随后在已有项目根目录读取.csproj与global.json，比较目标框架和SDK选择规则。若dotnet不存在，应检查安装位置与PATH；若restore失败，应检查包源、凭据和网络；若某个包不可用，则确认版本和源，而不是关闭完整性或证书校验来强行继续。"}</BookParagraph>
<BookCode language="bash" showLineNumbers code={"dotnet --info\ndotnet --list-sdks\ndotnet --list-runtimes"} />
</div>) },
{ label: "推演二：项目能启动但接口是404", left: (<div className="space-y-4">
<PageTitle>{"推演二：项目能启动但接口是404"}</PageTitle>
<BookParagraph>{"新建Web项目启动后，访问/api/users返回404，不一定是服务器没启动。先检查模板是否生成控制器，是否调用AddControllers与MapControllers，控制器路由和监听地址是否一致，再查看日志中的请求路径。只有确认路由匹配后才讨论数据库结果。开发环境launchSettings中的端口也不代表生产监听端口；把浏览器旧书签指向另一个进程，会制造非常迷惑的“代码修改没生效”。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"调试器要回答一个明确问题"}</PageTitle>
<BookParagraph>{"为标题为空仍落库的问题，在输入绑定后、业务校验前和保存前各设断点，观察同一请求的值如何变化。先确认程序加载的是当前构建，再检查条件与调用栈。不要通过不断增加Console.WriteLine试图重建所有状态；结构化日志更适合跨请求追踪，断点更适合单次局部状态。异步方法可能在线程间恢复，追踪时应关注任务与请求身份，而不是假定某个线程号始终对应同一用户。"}</BookParagraph>
</div>) },
{ label: "练习：交付最小可复现项目说明", left: (<div className="space-y-4">
<PageTitle>{"练习：交付最小可复现项目说明"}</PageTitle>
<BookParagraph>{"记录工作目录、SDK选择、目标框架、包源、启动命令、监听URL和一个预期返回值。验收：清晰区分缺少SDK、包还原失败、编译失败、启动失败与路由404，并为每类提供第一条检查证据。参考思路：按环境、依赖、编译、宿主、路由逐层排查，先复现控制台或空Web宿主，再加入数据库；不要一次引入全部服务后才开始验证工具链。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"配置共享与本机秘密的边界"}</PageTitle>
<BookParagraph>{"项目文件、global.json和可复现依赖配置进入版本控制，本机路径、开发口令和令牌不应进入公共示例。开发秘密存储也不等于生产密钥服务，部署时需要独立注入。多人协作时记录包源来源和升级理由，避免依赖只存在于某台机器的缓存。模板示例是起点，团队仍要补充格式、分析器和最小验证命令；新增工具应解决具体质量问题，而非装得越多越完整。"}</BookParagraph>
<BookList items={[<a key="https://learn.microsoft.com/en-us/dotnet/core/tools/global-json" href="https://learn.microsoft.com/en-us/dotnet/core/tools/global-json" target="_blank" rel="noopener noreferrer" className="underline">{"global.json与SDK选择"}</a>]} />
</div>) },
  {
    label: '开发工具',
    left: (
      <div className="space-y-4">
        <PageTitle>常用插件与调试工具</PageTitle>
        <BookParagraph>选择合适的开发工具和插件可以大幅提升开发效率。</BookParagraph>
        <BookList items={[
          'C#插件（VS Code）——语法高亮、智能提示',
          'NuGet包管理器——管理第三方依赖',
          '调试与断点——单步调试、变量监视',
          '日志输出——使用Console.WriteLine或ILogger',
        ]} />
        <BookAlert type="warning" message="建议使用最新稳定版的 .NET SDK，长期支持（LTS）版本为生产环境首选" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>课后练习</PageTitle>
        <div className="p-3 bg-paper-200/80 rounded-md border border-paper-300">
          <p className="text-sm text-ink font-medium mb-1">练习题</p>
          <BookList items={[
            '安装 .NET SDK 并验证版本号',
            '创建控制台项目并输出 "Hello World"',
            '创建 Web API 项目并运行默认模板',
            '熟悉 VS Code / Visual Studio 的基本调试功能',
          ]} />
        </div>
        <BookAlert type="info" message="动手实践是最好的学习方式。完成练习后可进入下一章学习C#基础语法" />
      </div>
    ),
  },
]

export default function DotnetSetupPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

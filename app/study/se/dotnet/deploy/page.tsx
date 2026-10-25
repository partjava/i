'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, BookParagraph, BookCode, BookAlert, BookList, TagGrid } from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '部署与运维',
  chapterNumber: 8,
  totalChapters: 10,
  subjectHref: '/study/se/dotnet',
  prevChapter: { label: '安全与身份认证', href: '/study/se/dotnet/security' },
  nextChapter: { label: '测试与调试', href: '/study/se/dotnet/testing' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: '发布部署',
    left: (
      <div className="space-y-4">
        <PageTitle>发布流程</PageTitle>
<BookParagraph>{"原.NET 7镜像及Azure运行时值仅为历史部署示例，不是当前生产选型。发布前应使用项目验证过且仍受支持的版本，SDK与运行时镜像要匹配；命令涉及真实云资源时需核对目标与费用范围。"}</BookParagraph>
        <BookParagraph>使用 dotnet publish 命令可以将应用编译并输出到指定目录，准备部署。</BookParagraph>
<BookParagraph>{"发布目标包含运行方式、操作系统与架构，必须与服务器匹配。开发机能run不代表生产已具备运行时、配置与数据库权限；先列运行前提再选择框架依赖或自包含。单文件也是打包选择，不承诺任何系统均可运行或完全没有外部依赖。"}</BookParagraph>
        <BookCode language="bash" showLineNumbers code={`# 发布应用（Release配置）
dotnet publish -c Release -o ./publish

# 指定目标运行时
dotnet publish -c Release -r linux-x64 --self-contained true -o ./publish

# 创建运行时包（单文件）
dotnet publish -c Release -r win-x64 --self-contained true -p:PublishSingleFile=true -o ./publish`} />
        <BookAlert type="info" message="--self-contained 打包运行时，目标机器无需安装 .NET SDK。PublishSingleFile 发布为单个文件" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>Docker容器化</PageTitle>
        <BookParagraph>Docker可以将应用及其依赖打包成容器镜像，实现环境一致性和便捷部署。</BookParagraph>
<BookParagraph>{"多阶段镜像把构建与运行环境分开，运行层通常不需要完整SDK。EXPOSE仅描述端口意图，真正监听由应用配置决定，映射目标必须一致。原7.0标签属于历史示例，生产采用受支持并经项目验证的版本，且持续维护基础镜像与运行时。"}</BookParagraph>
        <BookCode language="dockerfile" showLineNumbers code={`FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["MyApp.csproj", "."]
RUN dotnet restore
COPY . .
RUN dotnet publish -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "MyApp.dll"]`} />
        <TagGrid items={['Docker', '容器化', '发布', '部署', 'CI/CD', '运维']} />
      </div>
    ),
  },
{ label: "发布产物不是源码目录的复制", left: (<div className="space-y-4">
<PageTitle>{"发布产物不是源码目录的复制"}</PageTitle>
<BookParagraph>{"dotnet publish组合编译输出、依赖和运行配置，具体内容取决于目标框架、运行标识与发布方式。开发机有SDK、用户秘密和本地数据库，不代表服务器也具备这些条件。先列出运行所需的环境变量、数据库、文件权限、网络出口与监听端口，再打包。交付物应带唯一版本和校验信息，部署同一版本时使用同一产物，避免在每台服务器重新构建产生难以追踪差异。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"推演一：容器启动但外部访问失败"}</PageTitle>
<BookParagraph>{"应用日志显示正常监听容器内8080，运行命令却把宿主8080映射到容器80，外部请求会失败。检查实际绑定地址与端口、容器端口映射及代理配置，不能只看Dockerfile的EXPOSE；EXPOSE描述意图，不会自动改变应用监听。若只绑定容器内localhost，也可能无法从外部访问。先从容器内部请求，再从宿主和代理逐层检查，区分宿主未就绪与网络路径错误。"}</BookParagraph>
</div>) },
{ label: "框架依赖与自包含交付取舍", left: (<div className="space-y-4">
<PageTitle>{"框架依赖与自包含交付取舍"}</PageTitle>
<BookParagraph>{"框架依赖发布通常更小，由环境提供匹配运行时；自包含携带运行时，减少一部分环境前提，但体积、目标平台和维护方式不同。单文件又是另一项打包维度，不代表没有本地依赖或可以跨系统通用。下表以运维责任比较，不把自包含误解成永不需要安全更新。应用、运行时和基础镜像都要有更新策略，生产机也不应因为是.NET应用就必须安装全部SDK。"}</BookParagraph>
<div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><thead><tr><th className="border-b p-2 text-left">{"方式"}</th><th className="border-b p-2 text-left">{"环境责任"}</th><th className="border-b p-2 text-left">{"维护注意"}</th></tr></thead><tbody><tr><td className="border-b p-2 align-top">{"框架依赖"}</td><td className="border-b p-2 align-top">{"提供匹配运行时"}</td><td className="border-b p-2 align-top">{"环境运行时更新"}</td></tr><tr><td className="border-b p-2 align-top">{"自包含"}</td><td className="border-b p-2 align-top">{"提供目标系统基础能力"}</td><td className="border-b p-2 align-top">{"随应用重发运行时更新"}</td></tr><tr><td className="border-b p-2 align-top">{"单文件"}</td><td className="border-b p-2 align-top">{"按发布配置打包"}</td><td className="border-b p-2 align-top">{"不承诺跨平台或无本地依赖"}</td></tr><tr><td className="border-b p-2 align-top">{"容器"}</td><td className="border-b p-2 align-top">{"镜像、端口、存储与配置"}</td><td className="border-b p-2 align-top">{"基础镜像和应用共同维护"}</td></tr></tbody></table></div>
</div>), right: (<div className="space-y-4">
<PageTitle>{"一份只描述契约的部署清单"}</PageTitle>
<BookParagraph>{"下面JSON是可解析的部署契约示例，不会创建云资源，也不是特定平台配置。预期应用监听8080，健康路由分为存活和就绪，秘密通过环境注入而非写入清单。项目需自行实现这些路由并与实际代理对应。发布验收应检查真实监听与清单一致；若健康检查永远返回200却数据库不可用，负载均衡仍可能把流量送到无法服务的实例。"}</BookParagraph>
<BookCode language="json" showLineNumbers code={"{\n  \"artifact\": \"task-api-build-042\",\n  \"listenPort\": 8080,\n  \"livenessPath\": \"/health/live\",\n  \"readinessPath\": \"/health/ready\",\n  \"requiredEnvironment\": [\"ConnectionStrings__DefaultConnection\"]\n}"} />
</div>) },
{ label: "推演二：回滚代码却无法回滚数据", left: (<div className="space-y-4">
<PageTitle>{"推演二：回滚代码却无法回滚数据"}</PageTitle>
<BookParagraph>{"新版把Title列删除并迁移成另一结构，发现业务错误后换回旧镜像，旧代码仍查询Title，结果继续失败。回滚策略必须考虑数据库和消息格式兼容，常采用先扩展、再迁移、最后收紧的分阶段变更。破坏性迁移前要验证备份和恢复时间，不要假设每个Down脚本都能无损恢复删除数据。部署成功的定义是关键业务可用，而非某个进程处于Running状态。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"配置、代理与优雅停止"}</PageTitle>
<BookParagraph>{"数据库口令、签名密钥和环境地址在运行时注入，测试与生产使用不同身份及最小权限。反向代理后的真实来源、HTTPS与转发头必须按可信代理配置，不能盲目信任任何客户端自带头。停止实例时先退出就绪状态，停止接新请求，再等待进行中的工作完成或安全保存。后台队列需要明确停止与重放协议，否则滚动更新期间可能丢任务或重复发送通知。"}</BookParagraph>
</div>) },
{ label: "练习：写出可执行发布验收表", left: (<div className="space-y-4">
<PageTitle>{"练习：写出可执行发布验收表"}</PageTitle>
<BookParagraph>{"选择一份已构建产物，记录版本、目标运行时、启动参数、环境配置、端口与数据库结构。验收覆盖启动、健康检查、新增读取任务、停止重启和回退旧版本，并指出哪些动作可能修改数据。参考思路：先在隔离环境使用虚构数据演练，再核对日志中的构建标识与数据库迁移版本；不给出“部署到云上就行”的空泛结论，也不使用真实管理员密钥完成教学测试。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"监控与容量是持续责任"}</PageTitle>
<BookParagraph>{"发布后监控错误率、响应延迟、任务积压、数据库连接与资源使用，并把变化关联到部署版本。CPU低仍可能因为数据库等待而慢，平均延迟正常也可能掩盖少量超时。报警要连接用户影响与恢复动作，包含受影响服务、时间范围和最近变更。镜像不应以root权限执行所有操作，写入目录与持久卷有明确边界；容器文件系统丢失不能导致业务数据随实例重建消失。"}</BookParagraph>
<BookList items={[<a key="https://learn.microsoft.com/en-us/dotnet/core/deploying/" href="https://learn.microsoft.com/en-us/dotnet/core/deploying/" target="_blank" rel="noopener noreferrer" className="underline">{".NET应用发布概览"}</a>]} />
</div>) },
  {
    label: '云平台部署',
    left: (
      <div className="space-y-4">
        <PageTitle>Azure云部署</PageTitle>
        <BookParagraph>Azure提供了全面的.NET应用托管服务，从App Service到容器实例。</BookParagraph>
        <BookCode language="bash" showLineNumbers code={`# 使用 Azure CLI 部署 Web 应用
az webapp up --name my-dotnet-app --resource-group my-rg --runtime "DOTNET|7.0"

# 创建 Azure SQL 数据库
az sql db create --resource-group my-rg \
    --server my-server --name mydb \
    --service-objective S0

# 配置连接字符串
az webapp config connection-string set \
    --resource-group my-rg --name my-dotnet-app \
    --settings DefaultConnection="..." \
    --connection-string-type SQLAzure`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>课后练习</PageTitle>
        <div className="p-3 bg-paper-200/80 rounded-md border border-paper-300">
          <p className="text-sm text-ink font-medium mb-1">练习题</p>
          <BookList items={[
            '使用 dotnet publish 发布控制台应用',
            '编写 Dockerfile 将 .NET 应用容器化',
            '在本地运行 Docker 容器并测试',
            '了解 Azure App Service 的部署流程',
          ]} />
        </div>
        <BookCode language="bash" showLineNumbers code={`# 参考：Docker 构建与运行
docker build -t my-dotnet-app .
docker run -d -p 8080:80 --name myapp my-dotnet-app
curl http://localhost:8080`} />
      </div>
    ),
  },
]

export default function DotnetDeployPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

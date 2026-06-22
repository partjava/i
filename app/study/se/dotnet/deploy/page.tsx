'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
  TagGrid,
} from '@/app/components/ui/book/BookContent'

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
        <BookParagraph>使用 dotnet publish 命令可以将应用编译并输出到指定目录，准备部署。</BookParagraph>
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

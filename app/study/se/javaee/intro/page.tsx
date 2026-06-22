'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
  BookDivider,
  TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: 'JavaEE概述',
  chapterNumber: 1,
  totalChapters: 17,
  subjectHref: '/study/se/javaee',
  nextChapter: { label: 'JavaEE核心组件', href: '/study/se/javaee/components' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: 'JavaEE概述',
    left: (
      <div className="space-y-4">
        <PageTitle>JavaEE概述</PageTitle>
        <BookParagraph>JavaEE（Java Enterprise Edition）是一种基于Java语言的企业级应用开发平台，它提供了一系列的API和规范，用于构建大型、分布式、高性能、安全可靠的企业级应用程序。JavaEE的核心目标是简化企业级应用的开发、部署和管理，通过提供标准的技术和框架，让开发者能够专注于业务逻辑的实现，而不必重复造轮子。</BookParagraph>
        <h3 className="text-sm font-medium text-ink mt-4">核心优势</h3>
        <BookList items={[
          '标准化：提供统一的API和规范，降低学习成本和技术风险',
          '企业级服务：内置事务管理、安全认证、消息队列等企业级功能',
          '可扩展性：支持分布式架构和集群部署，轻松应对高并发场景',
          '成熟生态：拥有大量的开源框架、工具和社区支持',
          '跨平台兼容：基于Java语言，支持多种操作系统和应用服务器',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookAlert type="info" message="JavaEE最初由Sun Microsystems开发，后由Oracle维护，现由Eclipse基金会以Jakarta EE名义继续发展。" />
        <div className="grid grid-cols-1 gap-4 mt-4">
          <div className="rounded-lg p-5" style={{ background: THEMES.software.paperCard, border: '1px solid rgba(0,0,0,0.06)' }}>
            <h3 className="font-semibold mb-2">企业级平台</h3>
            <p className="text-sm opacity-70">专为构建大型、分布式、高可靠性企业应用而设计的平台，提供完整的解决方案。</p>
          </div>
          <div className="rounded-lg p-5" style={{ background: THEMES.software.paperCard, border: '1px solid rgba(0,0,0,0.06)' }}>
            <h3 className="font-semibold mb-2">标准规范</h3>
            <p className="text-sm opacity-70">定义了一套完整的API和规范，确保不同厂商实现的兼容性和互操作性。</p>
          </div>
          <div className="rounded-lg p-5" style={{ background: THEMES.software.paperCard, border: '1px solid rgba(0,0,0,0.06)' }}>
            <h3 className="font-semibold mb-2">简化开发</h3>
            <p className="text-sm opacity-70">通过提供企业级服务如事务管理、安全认证、数据库连接等，简化开发流程。</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    label: '发展历程',
    left: (
      <div className="space-y-4">
        <PageTitle>发展历程</PageTitle>
        <BookParagraph>JavaEE自1999年诞生以来，经历了从J2EE到JavaEE再到Jakarta EE的演进历程，不断引入新技术和简化开发模型。</BookParagraph>
        <h3 className="text-sm font-medium text-ink mt-4">J2EE 1.2 (1999)</h3>
        <BookParagraph>Sun Microsystems发布J2EE 1.2，包含Servlet 2.2、JSP 1.1、EJB 1.1等核心技术，奠定了企业级Java开发的基础。</BookParagraph>
        <h3 className="text-sm font-medium text-ink mt-4">J2EE 1.4 (2003)</h3>
        <BookParagraph>引入Servlet 2.4、JSP 2.0、JSTL等技术，简化了Web开发，并提供了更好的XML处理支持。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">JavaEE 5 (2006)</h3>
        <BookParagraph>更名为JavaEE 5，引入注解、JPA 1.0、EJB 3.0等特性，大幅简化了企业级开发，降低了学习曲线。</BookParagraph>
        <h3 className="text-sm font-medium text-ink mt-4">JavaEE 7 (2013)</h3>
        <BookParagraph>增强对WebSocket、JSON处理、Batch Processing等现代Web技术的支持，进一步提升开发效率。</BookParagraph>
        <h3 className="text-sm font-medium text-ink mt-4">Jakarta EE (2018至今)</h3>
        <BookParagraph>Oracle将JavaEE捐赠给Eclipse基金会后更名为Jakarta EE，继续发展企业级Java技术，保持与JavaEE的兼容性。</BookParagraph>
        <BookAlert type="success" message="Jakarta EE继承了JavaEE的全部规范，并持续引入新的技术和特性，保持企业级Java的活力。" />
      </div>
    ),
  },
  {
    label: '平台架构',
    left: (
      <div className="space-y-4">
        <PageTitle>分层架构</PageTitle>
        <BookParagraph>JavaEE采用分层架构设计，将应用程序划分为不同的功能层，各层之间职责明确，便于开发和维护。</BookParagraph>
        <div className="rounded-lg p-4" style={{ background: THEMES.software.paperCard, border: '1px solid rgba(0,0,0,0.06)' }}>
          <h3 className="font-semibold mb-2" style={{ color: THEMES.software.accent }}>表示层</h3>
          <p className="text-sm opacity-70">负责与用户交互，处理HTTP请求和响应，常用技术包括Servlet、JSP、JSF等。</p>
        </div>
        <div className="rounded-lg p-4" style={{ background: THEMES.software.paperCard, border: '1px solid rgba(0,0,0,0.06)' }}>
          <h3 className="font-semibold mb-2" style={{ color: THEMES.software.accent }}>业务逻辑层</h3>
          <p className="text-sm opacity-70">实现核心业务逻辑，通过EJB或Spring等框架提供事务管理和业务服务。</p>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <div className="rounded-lg p-4" style={{ background: THEMES.software.paperCard, border: '1px solid rgba(0,0,0,0.06)' }}>
          <h3 className="font-semibold mb-2" style={{ color: THEMES.software.accent }}>持久层</h3>
          <p className="text-sm opacity-70">负责数据存储和访问，使用JPA、Hibernate等技术与数据库交互。</p>
        </div>
        <div className="rounded-lg p-4" style={{ background: THEMES.software.paperCard, border: '1px solid rgba(0,0,0,0.06)' }}>
          <h3 className="font-semibold mb-2" style={{ color: THEMES.software.accent }}>企业信息系统层</h3>
          <p className="text-sm opacity-70">集成外部系统如ERP、CRM等，实现企业级数据共享和业务集成。</p>
        </div>
        <h3 className="text-sm font-medium text-ink mt-4">容器架构</h3>
        <BookParagraph>JavaEE应用运行在容器中，容器提供了运行环境和企业级服务支持。Web容器（如Tomcat、Jetty）管理Servlet、JSP等Web组件；EJB容器管理EJB组件，提供事务管理、安全认证、资源池等企业级服务。</BookParagraph>
      </div>
    ),
  },
  {
    label: '核心组件',
    left: (
      <div className="space-y-4">
        <PageTitle>核心组件</PageTitle>
        <BookParagraph>JavaEE提供了丰富的核心组件来支持企业级应用开发。每个组件都有特定的职责和应用场景。</BookParagraph>
        <div className="rounded-lg p-4" style={{ background: THEMES.software.paperCard, border: '1px solid rgba(0,0,0,0.06)' }}>
          <h3 className="font-semibold mb-2">Servlet</h3>
          <p className="text-sm opacity-70">处理Web请求的核心组件，运行在Web容器中，接收HTTP请求并生成动态响应。</p>
        </div>
        <div className="rounded-lg p-4" style={{ background: THEMES.software.paperCard, border: '1px solid rgba(0,0,0,0.06)' }}>
          <h3 className="font-semibold mb-2">JSP</h3>
          <p className="text-sm opacity-70">在HTML页面中嵌入Java代码的技术，用于生成动态Web内容，最终会被编译为Servlet。</p>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <div className="rounded-lg p-4" style={{ background: THEMES.software.paperCard, border: '1px solid rgba(0,0,0,0.06)' }}>
          <h3 className="font-semibold mb-2">EJB</h3>
          <p className="text-sm opacity-70">用于实现企业级业务逻辑的组件，提供事务管理、安全、远程访问等企业级服务。</p>
        </div>
        <div className="rounded-lg p-4" style={{ background: THEMES.software.paperCard, border: '1px solid rgba(0,0,0,0.06)' }}>
          <h3 className="font-semibold mb-2">JPA</h3>
          <p className="text-sm opacity-70">用于对象关系映射的标准API，简化数据库操作，支持ORM框架如Hibernate。</p>
        </div>
        <BookAlert type="info" message="其他重要组件包括：JSF（组件化Web界面）、JMS（消息队列）、JAX-RS（RESTful API）、CDI（依赖注入）、JTA（分布式事务）。" />
      </div>
    ),
  },
  {
    label: '对比',
    left: (
      <div className="space-y-4">
        <PageTitle>JavaEE与JavaSE对比</PageTitle>
        <BookParagraph>JavaSE是标准版，适用于桌面应用和控制台程序；JavaEE是企业版，专为大型分布式企业应用设计。两者在定位、核心API和部署环境上有显著差异。</BookParagraph>
        <BookCode language="text" code={`特性        | JavaSE                    | JavaEE
定位        | 标准版，基础开发平台      | 企业版，大型分布式应用
适用场景    | 桌面应用、控制台程序      | 企业级Web应用、分布式系统
核心API     | 基础类库、集合框架、多线程 | Servlet、JSP、EJB、JPA等
事务管理    | 需手动实现                | 内置JTA，支持分布式事务
安全机制    | 基本安全API               | 企业级安全认证和授权
部署环境    | 直接运行在JVM上           | 需部署在应用服务器中
数据库访问  | JDBC（需手动管理连接）    | JPA、连接池、事务管理`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookAlert type="info" message="JavaEE包含了JavaSE的全部功能，并在其基础上增加了企业级API。学习JavaEE需要先掌握JavaSE基础。" />
        <h3 className="text-sm font-medium text-ink mt-4">迁移到Jakarta EE</h3>
        <BookParagraph>JavaEE 8之后，Oracle将JavaEE移交给Eclipse基金会，更名为Jakarta EE。主要的命名空间从 javax.* 迁移到 jakarta.*。当前主流版本为Jakarta EE 9/10，开发者需要注意包名的变化。</BookParagraph>
        <BookCode language="xml" code={`<!-- Maven依赖示例 -->
<dependency>
    <groupId>jakarta.platform</groupId>
    <artifactId>jakarta.jakartaee-api</artifactId>
    <version>10.0.0</version>
    <scope>provided</scope>
</dependency>`} />
        <TagGrid items={['JavaSE', 'JavaEE', 'Jakarta EE', '企业级开发', '分布式系统']} />
      </div>
    ),
  },
]

export default function JavaEEIntroPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

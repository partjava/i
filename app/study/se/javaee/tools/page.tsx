'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
  TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '开发工具与环境',
  chapterNumber: 12,
  totalChapters: 17,
  subjectHref: '/study/se/javaee',
  prevChapter: { label: '实战项目开发', href: '/study/se/javaee/project' },
  nextChapter: { label: '性能调优与监控', href: '/study/se/javaee/performance' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: '概述',
    left: (
      <div className="space-y-4">
        <PageTitle>开发工具与环境概述</PageTitle>
        <BookParagraph>JavaEE开发需要配置完整的开发环境和工具链，包括JDK、IDE、构建工具、Web服务器和数据库等。</BookParagraph>
        <h3 className="text-sm font-medium text-ink mt-4">常用工具与环境</h3>
        <BookList items={[
          'JDK（Java开发工具包）',
          'IDE（IntelliJ IDEA、Eclipse等）',
          '构建工具（Maven、Gradle）',
          'Web服务器（Tomcat、Jetty等）',
          '数据库（MySQL、PostgreSQL等）',
          '版本管理（Git）',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookAlert type="info" message="推荐使用IntelliJ IDEA Ultimate版本开发JavaEE应用，它对Jakarta EE、Spring、JPA等提供了最好的支持。Community版需要额外安装插件。" />
        <TagGrid items={['JDK', 'IDE', 'Maven', 'Tomcat', 'Git']} />
      </div>
    ),
  },
  {
    label: 'IDE与环境',
    left: (
      <div className="space-y-4">
        <PageTitle>开发工具</PageTitle>
        <BookParagraph>主流IDE各有特点，选择合适的工具可以提高开发效率。</BookParagraph>
        <BookList items={[
          'IntelliJ IDEA：强大、智能、插件丰富',
          'Eclipse：开源、插件生态好',
          'VS Code：轻量级、适合多语言开发',
        ]} />
        <h3 className="text-sm font-medium text-ink mt-4">常用插件</h3>
        <BookList items={[
          'Lombok - 减少样板代码',
          'MyBatisX - MyBatis代码辅助',
          'Spring Assistant - Spring配置辅助',
          'Git Integration - 版本控制',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>环境配置</PageTitle>
        <BookParagraph>JDK和环境变量的配置是Java开发的基础。</BookParagraph>
        <BookCode language="bash" code={`# 设置JAVA_HOME
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk
export PATH=$JAVA_HOME/bin:$PATH`} />
        <BookParagraph>Tomcat作为常用的Servlet容器，端口配置在 server.xml 中：</BookParagraph>
        <BookCode language="xml" code={`<!-- conf/server.xml 端口配置 -->
<Connector port="8080" protocol="HTTP/1.1" ... />`} />
        <TagGrid items={['IDEA', 'Eclipse', 'JDK', 'Tomcat', '环境变量']} />
      </div>
    ),
  },
  {
    label: '构建工具',
    left: (
      <div className="space-y-4">
        <PageTitle>构建与依赖管理</PageTitle>
        <BookParagraph>Maven和Gradle是Java项目最常用的构建工具，管理项目构建生命周期和依赖。</BookParagraph>
        <h3 className="text-sm font-medium text-ink mt-4">Maven依赖示例</h3>
        <BookCode language="xml" code={`<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <version>2.7.0</version>
</dependency>`} />
        <h3 className="text-sm font-medium text-ink mt-4">Gradle依赖示例</h3>
        <BookCode language="groovy" code={`implementation 'org.springframework.boot:spring-boot-starter-web:2.7.0'`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookAlert type="info" message="Maven使用pom.xml管理依赖和构建配置，Gradle使用build.gradle（Groovy）或build.gradle.kts（Kotlin DSL）。Gradle相比Maven构建速度更快，配置更简洁。" />
        <h3 className="text-sm font-medium text-ink mt-4">Maven常用命令</h3>
        <BookCode language="bash" code={`# 清理并编译
mvn clean compile

# 运行测试
mvn test

# 打包
mvn clean package

# 安装到本地仓库
mvn clean install

# 跳过测试打包
mvn clean package -DskipTests`} />
        <TagGrid items={['Maven', 'Gradle', 'pom.xml', '依赖管理', '构建']} />
      </div>
    ),
  },
  {
    label: '调试与测试',
    left: (
      <div className="space-y-4">
        <PageTitle>调试与测试</PageTitle>
        <BookParagraph>高效的调试和全面的测试是保证代码质量的关键。</BookParagraph>
        <h3 className="text-sm font-medium text-ink mt-4">断点调试</h3>
        <BookList items={[
          '使用IDEA/Eclipse设置断点',
          '远程调试（配置JPDA）',
        ]} />
        <BookCode language="bash" code={`# 远程调试启动参数
-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">单元测试与集成测试</h3>
        <BookCode language="java" code={`@SpringBootTest
public class UserServiceTest {
    @Autowired
    private UserService userService;

    @Test
    public void testRegister() {
        userService.register(new User());
    }
}`} />
        <BookAlert type="info" message="测试金字塔：单元测试（70%）> 集成测试（20%）> E2E测试（10%）。JUnit 5 + Mockito 是Java测试的标准组合。" />
        <TagGrid items={['JUnit', 'Mockito', '断点调试', '远程调试', '测试']} />
      </div>
    ),
  },
  {
    label: '常见问题',
    left: (
      <div className="space-y-4">
        <PageTitle>常见问题与实用示例</PageTitle>
        <BookParagraph>开发和部署过程中常见的报错及解决方法：</BookParagraph>
        <BookList items={[
          '端口被占用：更换端口或释放进程',
          '依赖冲突：排查Maven依赖树（mvn dependency:tree）',
          '编码问题：统一UTF-8编码',
          '数据库连接失败：检查配置与网络',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">Maven打包与运行</h3>
        <BookCode language="bash" code={`# 打包
mvn clean package

# 运行
java -jar target/app.jar`} />
        <BookAlert type="success" message="使用 spring-boot-maven-plugin 可以将应用打包为可执行JAR，内置Tomcat服务器，简化部署流程。" />
        <TagGrid items={['端口冲突', '依赖冲突', '编码问题', '打包部署', '问题排查']} />
      </div>
    ),
  },
]

export default function JavaEEToolsPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

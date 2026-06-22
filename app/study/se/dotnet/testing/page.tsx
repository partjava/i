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
  chapterTitle: '测试与调试',
  chapterNumber: 9,
  totalChapters: 10,
  subjectHref: '/study/se/dotnet',
  prevChapter: { label: '部署与运维', href: '/study/se/dotnet/deploy' },
  nextChapter: { label: '实战项目与案例', href: '/study/se/dotnet/projects' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: '单元测试',
    left: (
      <div className="space-y-4">
        <PageTitle>xUnit单元测试</PageTitle>
        <BookParagraph>xUnit是.NET生态中最流行的单元测试框架，与 MSTest 和 NUnit 相比更加轻量和现代化。</BookParagraph>
        <BookCode language="csharp" showLineNumbers code={`public class Calculator {
    public int Add(int a, int b) => a + b;
    public int Divide(int a, int b) {
        if (b == 0) throw new DivideByZeroException();
        return a / b;
    }
}

// xUnit 测试
public class CalculatorTests {
    [Fact]
    public void Add_ReturnsSum() {
        var calc = new Calculator();
        var result = calc.Add(2, 3);
        Assert.Equal(5, result);
    }

    [Theory]
    [InlineData(10, 2, 5)]
    [InlineData(9, 3, 3)]
    public void Divide_ReturnsQuotient(int a, int b, int expected) {
        var calc = new Calculator();
        var result = calc.Divide(a, b);
        Assert.Equal(expected, result);
    }
}`} />
        <BookAlert type="info" message="[Fact] 表示一个测试方法，[Theory] 结合 [InlineData] 实现参数化测试" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>集成测试</PageTitle>
        <BookParagraph>集成测试验证多个组件协同工作，WebApplicationFactory 可以模拟完整的HTTP请求。</BookParagraph>
        <BookCode language="csharp" showLineNumbers code={`public class ApiTests
    : IClassFixture<WebApplicationFactory<Program>> {

    private readonly WebApplicationFactory<Program> _factory;

    public ApiTests(WebApplicationFactory<Program> factory) {
        _factory = factory;
    }

    [Fact]
    public async Task GetUsers_ReturnsSuccess() {
        var client = _factory.CreateClient();
        var response = await client.GetAsync("/api/users");
        response.EnsureSuccessStatusCode();

        var json = await response.Content
            .ReadAsStringAsync();
        Assert.Contains("Tom", json);
    }
}`} />
        <TagGrid items={['xUnit', 'NUnit', '集成测试', 'Mock', 'TDD', '覆盖率']} />
      </div>
    ),
  },
  {
    label: '日志分析',
    left: (
      <div className="space-y-4">
        <PageTitle>日志与性能分析</PageTitle>
        <BookParagraph>良好的日志实践和性能分析工具是保障应用质量的关键。</BookParagraph>
        <BookCode language="csharp" showLineNumbers code={`// 不同日志级别
logger.LogTrace("详细的跟踪信息");
logger.LogDebug("调试信息");
logger.LogInformation("应用启动");
logger.LogWarning("潜在问题警告");
logger.LogError("发生错误: {Error}", error.Message);
logger.LogCritical("严重错误，需要立即关注");

// 结构化日志
logger.LogInformation("用户 {Name} 于 {Time} 登录",
    userName, DateTime.UtcNow);`} />
        <BookAlert type="warning" message="生产环境建议只记录 Information 及以上级别，避免日志过多影响性能" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>课后练习</PageTitle>
        <div className="p-3 bg-paper-200/80 rounded-md border border-paper-300">
          <p className="text-sm text-ink font-medium mb-1">练习题</p>
          <BookList items={[
            '编写xUnit测试验证 Calculator 类的减法方法',
            '使用 [Theory] 和 [InlineData] 测试多种输入',
            '创建集成测试验证 API 端点',
            '配置日志记录到文件或数据库',
          ]} />
        </div>
        <BookCode language="csharp" showLineNumbers code={`// 参考：Mock 测试
public class UserServiceTests {
    [Fact]
    public void CreateUser_ShouldLog() {
        var logger = new Mock<ILogger<UserService>>();
        var service = new UserService(logger.Object);
        // 验证业务逻辑
    }
}`} />
      </div>
    ),
  },
]

export default function DotnetTestingPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

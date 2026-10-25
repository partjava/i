'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, BookParagraph, BookCode, BookAlert, BookList, TagGrid } from '@shared/components/ui/book/BookContent'

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
<BookParagraph>{"原xUnit、Moq和WebApplicationFactory示例依赖测试项目、包引用与可访问的应用入口；仅验证Contains(“Tom”)不足以证明API契约。参考Mock例已补充实际调用和结果断言，避免空测试造成虚假通过。"}</BookParagraph>
        <BookParagraph>xUnit是.NET生态中最流行的单元测试框架，与 MSTest 和 NUnit 相比更加轻量和现代化。</BookParagraph>
<BookParagraph>{"Arrange建立已知状态，Act执行业务动作，Assert检查结果与关键副作用。除法用例还应覆盖除数为零和整数截断，标题用例覆盖空白与边界长度。空测试或只验证框架能相加会制造虚假通过，必须证明规则被破坏时测试确实失败。"}</BookParagraph>
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
<BookParagraph>{"集成测试需要真实注册路由与服务，并明确替换了哪些外部依赖。成功状态码不代表响应归属正确，检查结构、数量和持久化结果；每例使用独立状态，避免依赖执行顺序。假认证有助测业务，但还需单独验证真实令牌配置。"}</BookParagraph>
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
{ label: "测试首先描述业务风险", left: (<div className="space-y-4">
<PageTitle>{"测试首先描述业务风险"}</PageTitle>
<BookParagraph>{"一项测试应指出初始条件、执行动作与可观察结果。例如“空标题创建任务返回400且数据库无新增行”，比测试名称“Test1”更能表达约束。纯业务规则用单元测试，路由、认证、序列化与数据库协作用集成测试，真实部署的网络与配置用受控端到端验证。测试层级由风险决定，不能只追求数量或覆盖率数字，因为执行到某行代码并不证明结果符合契约。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"推演一：断言HTTP成功仍可能漏错"}</PageTitle>
<BookParagraph>{"GET任务列表返回200，却把另一个用户任务一并返回。如果测试仅调用EnsureSuccessStatusCode就会通过。应固定当前身份和两位用户样本，反序列化响应并检查字段、数量、归属与排序。POST还要检查201位置可读取、失败时没有副作用。查询结果里含有Tom这一个字符串，不足以判断JSON结构、授权或分页是否正确，应依据契约断言最重要的不变量。"}</BookParagraph>
</div>) },
{ label: "替身与真实实现的分工", left: (<div className="space-y-4">
<PageTitle>{"替身与真实实现的分工"}</PageTitle>
<BookParagraph>{"Mock可验证是否发出调用，Fake可模拟受控状态，真实数据库测试可暴露SQL约束与提供者差异。内存替身未必支持真实事务、排序或唯一约束，不能把替身测试通过等同于生产数据库语义正确。下表按目标选依赖，尽量保持测试独立和可重复。为了验证私有实现而模拟每一层调用，会使正常重构频繁破坏测试，应优先断言用户可见结果与关键副作用。"}</BookParagraph>
<div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><thead><tr><th className="border-b p-2 text-left">{"依赖形式"}</th><th className="border-b p-2 text-left">{"适合验证"}</th><th className="border-b p-2 text-left">{"局限"}</th></tr></thead><tbody><tr><td className="border-b p-2 align-top">{"纯函数测试"}</td><td className="border-b p-2 align-top">{"标题与状态规则"}</td><td className="border-b p-2 align-top">{"不覆盖宿主管道"}</td></tr><tr><td className="border-b p-2 align-top">{"Mock/Fake"}</td><td className="border-b p-2 align-top">{"异常顺序与副作用"}</td><td className="border-b p-2 align-top">{"不等同真实数据库语义"}</td></tr><tr><td className="border-b p-2 align-top">{"集成宿主"}</td><td className="border-b p-2 align-top">{"路由、绑定、认证协作"}</td><td className="border-b p-2 align-top">{"环境可能替换依赖"}</td></tr><tr><td className="border-b p-2 align-top">{"部署冒烟"}</td><td className="border-b p-2 align-top">{"真实配置和网络路径"}</td><td className="border-b p-2 align-top">{"范围应小且避免破坏数据"}</td></tr></tbody></table></div>
</div>), right: (<div className="space-y-4">
<PageTitle>{"可运行的错误路径与副作用验证"}</PageTitle>
<BookParagraph>{"下面Python 3模型用内存仓库固定创建规则，输出1 passed，说明空输入被拒绝且只保存一条合法任务。它不模拟ASP.NET网络管道，只演示一个测试同时检查结果和副作用。C#可用xUnit按Arrange、Act、Assert组织对应规则，再增加真实HTTP集成用例。故意移除strip后的非空判断，测试应失败；若始终通过，说明断言没有覆盖要保护的业务风险。"}</BookParagraph>
<BookCode language="python" showLineNumbers code={"stored = []\ndef create(title):\n    clean = title.strip()\n    if not clean:\n        return 400\n    stored.append(clean)\n    return 201\nassert create('   ') == 400\nassert stored == []\nassert create(' Review ') == 201\nassert stored == ['Review']\nprint('1 passed')"} />
</div>) },
{ label: "推演二：测试之间共享数据库", left: (<div className="space-y-4">
<PageTitle>{"推演二：测试之间共享数据库"}</PageTitle>
<BookParagraph>{"测试A新增任务，测试B假定数据库为空；单独运行都成功，整套并行执行却失败。问题在共享状态而非业务随机错误。使用独立数据库或明确清理策略，控制种子数据与事务边界，不依赖测试顺序。唯一数据库名只解决名称冲突，不一定清理外部资源；测试结束仍要释放宿主与连接。固定时钟和随机种子可减少不确定性，涉及时间与并发时更应控制调度条件。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"集成宿主与生产宿主的差异"}</PageTitle>
<BookParagraph>{"WebApplicationFactory可以在测试内启动应用并替换依赖，但仍需保证入口Program可访问、测试环境配置和包引用匹配。替换认证便于测试业务授权，另需真实认证配置测试验证错误令牌被拒绝。关闭HTTPS或使用假数据库是测试选择，应在报告中说明，不能据此声称生产代理、证书和数据库配置都已验证。测试服务器没有真正跨公网传输，部署冒烟检查仍有独立价值。"}</BookParagraph>
</div>) },
{ label: "练习：证明测试真的能拦住回归", left: (<div className="space-y-4">
<PageTitle>{"练习：证明测试真的能拦住回归"}</PageTitle>
<BookParagraph>{"为新增任务写合法、空白、数据库失败三例，再写其他用户不可读取的集成例。验收：故意移除归属过滤时授权用例失败；恢复过滤后通过；每个用例可单独或并行执行，结果一致且不依赖外部账号。参考思路：对可重现故障先写最小断言，检查状态码、响应字段和数据库行数，不用过度宽泛的字符串包含测试代替结构化断言，保留失败诊断所需的请求标识。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"性能测试与日志不混为一谈"}</PageTitle>
<BookParagraph>{"单元测试耗时短不证明生产吞吐高，性能评估需固定负载、数据量、并发与环境，观察延迟分位数、错误率和资源。日志帮助解释失败，但不应成为过度耦合的唯一断言；除非日志本身是审计契约，否则主要验证业务结果。报告区分实际运行的测试、模拟依赖和未覆盖场景。CI通过也不保证迁移脚本、安全策略与部署配置完整，它们需要对应的验证入口和责任人。"}</BookParagraph>
<BookList items={[<a key="https://learn.microsoft.com/en-us/aspnet/core/test/integration-tests" href="https://learn.microsoft.com/en-us/aspnet/core/test/integration-tests" target="_blank" rel="noopener noreferrer" className="underline">{"ASP.NET Core集成测试"}</a>]} />
</div>) },
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

'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, BookParagraph, BookCode, BookList, BookAlert, BookDivider } from '@shared/components/ui/book/BookContent'
import { ExperimentOutlined } from '@ant-design/icons'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '测试与发布',
  chapterNumber: 10,
  totalChapters: 11,
  subjectHref: '/study/se/android',
  prevChapter: { label: '第三方库与架构模式', href: '/study/se/android/frameworks' },
  nextChapter: { label: '实战项目与案例', href: '/study/se/android/projects' },
  theme: THEMES.software,
}

const ESPRESSO_CODE = `// 点击按钮
onView(withId(R.id.btn_click)).perform(click());

// 检查文本
onView(withId(R.id.tv_hello))
    .check(matches(withText("Hello Android")));

// 输入文本
onView(withId(R.id.edit_input)).perform(typeText("测试输入"));

// 滚动列表并点击
onView(withId(R.id.recycler))
    .perform(RecyclerViewActions.actionOnItemAtPosition(3, click()));`

const SPREADS = [
  // ===== 跨页 1: 单元测试与UI测试 =====
  {
    label: '测试',
    left: (
      <div className="space-y-4">
        <PageTitle icon={<ExperimentOutlined />}>单元测试（JUnit）</PageTitle>
<BookParagraph>{"旧JUnit、Mockito和Espresso片段需对应测试依赖、宿主Activity及业务实现；登录固定账号仅为测试替身情境。原工具版本和签名命令是示例，不能直接替代项目发布配置或密钥管理。"}</BookParagraph>
        <BookParagraph>
          单元测试用于验证独立模块的业务逻辑。Android 项目支持在 JVM 上运行的本地单元测试和在设备上运行的 Instrumented 测试。
        </BookParagraph>
<BookParagraph>{"先选一条真实规则，例如空标题不保存，再写输入、预期结果和副作用断言。2加2只是框架冒烟，不能证明业务正确；Mockito也应模拟可控依赖，而不是把每个方法都设为成功，导致错误处理路径从未被执行。"}</BookParagraph>
        <BookCode
          language="java"
          showLineNumbers
          code={`@Test
public void testAddition() {
    assertEquals(4, 2 + 2);
}

// 使用 Mockito 模拟依赖
@Test
public void testLoginPresenter() {
    LoginView mockView = mock(LoginView.class);
    LoginPresenter presenter = new LoginPresenter(mockView);

    presenter.login("admin", "123456");

    verify(mockView).showLoading();
    verify(mockView).onLoginSuccess(anyString());
    verify(mockView, never()).onLoginError(anyString());
}`}
        />
        <BookAlert type="info" message="测试文件放在 src/test/java/ 目录下，使用 JUnit 4 + Mockito 进行单元测试" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle icon={<ExperimentOutlined />}>UI 自动化测试（Espresso）</PageTitle>
        <BookParagraph>
          Espresso 是 Google 官方 UI 测试框架，可模拟用户交互并验证界面状态。
        </BookParagraph>
<BookParagraph>{"UI测试要等待可观察的异步完成条件，不能用固定长睡眠掩盖竞争。验证按钮结果时还应核对任务身份与存储变化；设备、权限和动画状态会影响运行，因此每个用例应建立已知起点并清理自己创建的数据。"}</BookParagraph>
        <BookCode
          language="java"
          showLineNumbers
          code={ESPRESSO_CODE}
        />
        <BookDivider />
        <PageTitle icon={<ExperimentOutlined />}>测试配置</PageTitle>
        <BookCode
          language="groovy"
          showLineNumbers
          code={`// build.gradle 依赖配置
androidTestImplementation 'androidx.test:runner:1.5.2'
androidTestImplementation 'androidx.test.espresso:espresso-core:3.5.1'
androidTestImplementation 'androidx.test.espresso:espresso-contrib:3.5.1'
testImplementation 'junit:junit:4.13.2'
testImplementation 'org.mockito:mockito-core:5.3.0'`}
        />
      </div>
    ),
  },

  // ===== 跨页 2: 打包与发布 =====
{ label: "测试按依赖边界分层", left: (<div className="space-y-4">
<PageTitle>{"测试按依赖边界分层"}</PageTitle>
<BookParagraph>{"标题校验和排序是纯逻辑，适合本地JVM测试；数据库SQL与迁移需要真实或受控数据库；按钮点击、旋转恢复和系统权限需要设备测试。每层选择能揭露目标风险的最低成本环境。仅测试2加2只能证明测试框架在工作，不能证明待办保存正确。测试名要表达业务条件和期望结果，失败消息应指出哪个规则被破坏，而不是只留下一个泛化的false。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"推演一：空标题不能偷偷落库"}</PageTitle>
<BookParagraph>{"给输入“空格空格”，用户点击保存，预期出现校验提示且仓库保存调用次数为零。合法标题则规范化为“复习”，保存一次，成功后显示列表。若测试只验证Toast出现，后台可能仍插入空记录。应同时断言外部可见结果和重要副作用，并覆盖仓库失败时输入保留。测试不必检查每个内部私有方法，否则正常重构会造成大量无价值失败。"}</BookParagraph>
</div>) },
{ label: "本地、设备与发布检查的分工", left: (<div className="space-y-4">
<PageTitle>{"本地、设备与发布检查的分工"}</PageTitle>
<BookParagraph>{"本地单元测试反馈快但没有完整Android系统，设备测试更接近用户操作却更耗时且受设备状态影响，发布检查面向真实签名、资源压缩和安装升级。三者不能替代。下表以待办应用分配风险，避免把所有用例放到慢速UI测试。使用假网络可以固定超时和错误，不应让基础测试依赖某个外部服务恰好在线，发布前再安排受控端到端验证。"}</BookParagraph>
<div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><thead><tr><th className="border-b p-2 text-left">{"层次"}</th><th className="border-b p-2 text-left">{"待办用例"}</th><th className="border-b p-2 text-left">{"主要边界"}</th></tr></thead><tbody><tr><td className="border-b p-2 align-top">{"本地JVM"}</td><td className="border-b p-2 align-top">{"标题、排序、状态规则"}</td><td className="border-b p-2 align-top">{"无真实设备能力"}</td></tr><tr><td className="border-b p-2 align-top">{"数据库测试"}</td><td className="border-b p-2 align-top">{"迁移与唯一约束"}</td><td className="border-b p-2 align-top">{"需真实SQL语义"}</td></tr><tr><td className="border-b p-2 align-top">{"设备UI"}</td><td className="border-b p-2 align-top">{"点击、旋转、权限"}</td><td className="border-b p-2 align-top">{"需同步和设备矩阵"}</td></tr><tr><td className="border-b p-2 align-top">{"发布验证"}</td><td className="border-b p-2 align-top">{"签名升级与混淆"}</td><td className="border-b p-2 align-top">{"必须使用实际release产物"}</td></tr></tbody></table></div>
</div>), right: (<div className="space-y-4">
<PageTitle>{"用数据表驱动标题边界"}</PageTitle>
<BookParagraph>{"下面Python 3示例是可运行的业务边界教学模型，不依赖Android；它把空白、单字符、最大长度和超长输入分别列成用例。所有断言通过时输出4 cases passed。Java项目可用JUnit参数化用例表达同样规则，长度定义需明确是字符还是产品认可的文本单位，复杂Unicode情境不能随便用字节长度代替。把边界写成数据便于审查遗漏。"}</BookParagraph>
<BookCode language="python" showLineNumbers code={"def valid_title(text):\n    return 1 <= len(text.strip()) <= 20\ncases = [('  ', False), ('A', True), ('A' * 20, True), ('A' * 21, False)]\nfor text, expected in cases:\n    assert valid_title(text) == expected\nprint('4 cases passed')"} />
</div>) },
{ label: "推演二：等待异步结果而非睡眠", left: (<div className="space-y-4">
<PageTitle>{"推演二：等待异步结果而非睡眠"}</PageTitle>
<BookParagraph>{"点击后仓库在一百到两千毫秒内返回，固定sleep一秒会时好时坏，sleep十秒则拖慢全部测试。应让测试等待可观察的空闲条件或同步机制，在超时后报告当前状态。Espresso对某些主线程操作能自动同步，但不认识所有自定义后台任务，需要配套同步设计。不要在测试里把异步实现改成永远立即成功而完全跳过Saving状态，否则难以发现重复点击和结果竞态。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"签名、版本与升级是另一组不变量"}</PageTitle>
<BookParagraph>{"同一应用升级需要符合签名身份和版本规则。debug可安装不代表release的混淆、资源裁剪与反射仍正常；发布前应安装真实release变体并执行关键路径。签名密钥和口令由安全渠道保管，不能写入构建脚本或日志。AAB是面向分发的包形式，不能直接当作普通APK逐文件安装；选择产物时应根据分发渠道流程，而非只比较文件大小。"}</BookParagraph>
</div>) },
{ label: "练习：建立有失败证据的测试集", left: (<div className="space-y-4">
<PageTitle>{"练习：建立有失败证据的测试集"}</PageTitle>
<BookParagraph>{"为任务新增流程写四个本地规则测试、一个数据库迁移测试、两个设备交互测试，包含旋转和保存失败。验收：故意破坏空标题规则能使对应测试失败，修复后通过；用例可重复且不依赖真实账号。参考思路：对纯逻辑断言返回值，对持久化断言最终行数，对UI断言用户能看到和操作的状态；保留失败截图或状态日志，不把整个录屏作为唯一诊断资料。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"发布后也要能定位问题"}</PageTitle>
<BookParagraph>{"测试覆盖已知风险，无法保证所有设备与数据组合正确。发布记录要关联版本、构建标识和混淆映射，崩溃分析才能还原有意义的调用位置。分阶段验证启动、登录、持久化与升级路径，并准备停止扩大分发或回退的决策条件。日志中使用匿名追踪编号，不采集任务明文。质量报告应区分已执行用例、未覆盖设备和已知限制，不能用“全部测试通过”掩盖没有运行的设备场景。"}</BookParagraph>
<BookList items={[<a key="https://developer.android.com/training/testing/fundamentals" href="https://developer.android.com/training/testing/fundamentals" target="_blank" rel="noopener noreferrer" className="underline">{"Android测试基础"}</a>]} />
</div>) },
  {
    label: '发布',
    left: (
      <div className="space-y-4">
        <PageTitle icon={<ExperimentOutlined />}>打包与签名</PageTitle>
        <BookParagraph>
          Android 应用发布前需要使用密钥进行签名，确保应用的完整性和身份认证。
        </BookParagraph>
        <BookCode
          language="bash"
          showLineNumbers
          code={`# 生成签名密钥
keytool -genkey -v -keystore my-release-key.jks \\
    -keyalg RSA -keysize 2048 -validity 10000 \\
    -alias my-key

# 查看密钥信息
keytool -list -v -keystore my-release-key.jks

# 生成 release APK
./gradlew assembleRelease

# 优化对齐
zipalign -v 4 app-release-unsigned.apk app-release-aligned.apk

# 签名 APK
apksigner sign --ks my-release-key.jks \\
    --out app-release-signed.apk app-release-aligned.apk`}
        />
        <BookAlert type="warning" message="签名密钥必须妥善保管，丢失密钥将无法更新已发布的应用" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle icon={<ExperimentOutlined />}>发布到应用市场</PageTitle>
        <BookParagraph>
          完成开发与测试后，将应用发布到 Google Play 或其他应用市场。
        </BookParagraph>
        <BookList items={[
          '生成 release APK 或 AAB（Android App Bundle）',
          '注册 Google Play 开发者账号（一次性费用 $25）',
          '创建应用列表 —— 填写名称、描述、分类等',
          '准备应用截图与宣传素材 —— 至少 2 张截图',
          '设置定价与分发范围 —— 免费或付费、国家选择',
          '提交审核 —— 审核通过后应用上线',
          '后续更新 —— 使用签名密钥签署新版本',
        ]} />
        <BookDivider />
        <PageTitle icon={<ExperimentOutlined />}>AAB vs APK</PageTitle>
        <BookList items={[
          'APK —— 传统格式，包含所有资源，包体较大',
          'AAB（Android App Bundle）—— 官方推荐格式，Google Play 按需分发',
          'AAB 可减少安装包大小 30%-50%',
          '2021 年 8 月起，新应用必须使用 AAB 格式发布',
        ]} />
      </div>
    ),
  },
]

export default function TestingPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

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
        <BookParagraph>
          单元测试用于验证独立模块的业务逻辑。Android 项目支持在 JVM 上运行的本地单元测试和在设备上运行的 Instrumented 测试。
        </BookParagraph>
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

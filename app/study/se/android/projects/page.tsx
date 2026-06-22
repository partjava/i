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
import { ProjectOutlined } from '@ant-design/icons'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '实战项目与案例',
  chapterNumber: 11,
  totalChapters: 11,
  subjectHref: '/study/se/android',
  prevChapter: { label: '测试与发布', href: '/study/se/android/testing' },
  theme: THEMES.software,
}

const SPREADS = [
  // ===== 跨页 1: 项目开发流程 =====
  {
    label: '项目流程',
    left: (
      <div className="space-y-4">
        <PageTitle icon={<ProjectOutlined />}>项目开发流程</PageTitle>
        <BookParagraph>
          一个完整的 Android 项目开发遵循以下流程，从需求分析到上线发布。
        </BookParagraph>
        <BookList items={[
          '需求分析与原型设计 —— 明确功能、绘制 UI 原型图',
          '架构设计与技术选型 —— 选择架构模式（MVP/MVVM）与技术栈',
          '环境搭建 —— 初始化项目、配置 Gradle 依赖',
          '代码开发 —— 分模块迭代开发，持续集成',
          '测试阶段 —— 单元测试、UI 测试、性能测试、兼容性测试',
          '部署上线 —— 签名打包、发布到 Google Play',
          '运维与迭代 —— 监控崩溃、用户反馈、版本更新',
        ]} />
        <BookDivider />
        <PageTitle icon={<ProjectOutlined />}>项目技术栈推荐</PageTitle>
        <BookCode language="text" code={`语言：Kotlin
架构：MVVM + Jetpack
UI：Jetpack Compose / XML
网络：Retrofit + OkHttp
图片：Coil / Glide
数据库：Room
DI：Hilt
异步：Kotlin 协程 + Flow
测试：JUnit + Mockito + Espresso`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle icon={<ProjectOutlined />}>综合案例：Todo 应用</PageTitle>
        <BookParagraph>
          从零构建一个 Todo 待办事项应用，涵盖 Android 开发核心知识点。
        </BookParagraph>
        <BookCode
          language="java"
          showLineNumbers
          code={`// Todo 数据模型
@Entity(tableName = "todos")
public class TodoItem {
    @PrimaryKey(autoGenerate = true)
    public long id;
    public String title;
    public String description;
    public boolean completed;
    public long createdAt;
}

// 添加任务的交互逻辑
editText.setOnEditorActionListener((v, actionId, event) -> {
    String todo = v.getText().toString().trim();
    if (!todo.isEmpty()) {
        TodoItem item = new TodoItem();
        item.title = todo;
        item.createdAt = System.currentTimeMillis();

        // 通过 ViewModel 保存
        viewModel.insert(item);

        v.setText("");
        Toast.makeText(context, "任务已添加", Toast.LENGTH_SHORT).show();
    }
    return true;
});`}
        />
      </div>
    ),
  },

  // ===== 跨页 2: 常见问题与面试 =====
  {
    label: '面试题',
    left: (
      <div className="space-y-4">
        <PageTitle icon={<ProjectOutlined />}>常见面试题</PageTitle>
        <BookParagraph>
          以下是 Android 开发面试中常见的技术问题，覆盖基础到进阶。
        </BookParagraph>
        <BookDivider />
        <PageTitle icon={<ProjectOutlined />}>基础问题</PageTitle>
        <BookList items={[
          'Activity 与 Fragment 的区别与联系？',
          'Activity 的生命周期有哪些？什么情况下会调用 onSaveInstanceState？',
          'Android 中如何实现数据持久化？对比 SharedPreferences、SQLite、Room 的优劣。',
          'Intent 的显式与隐式有什么区别？Filter 的作用是什么？',
          'Handler、Looper、MessageQueue 的工作原理是什么？',
          'Service 的两种启动方式（startService / bindService）有什么区别？',
        ]} />
        <BookDivider />
        <PageTitle icon={<ProjectOutlined />}>进阶问题</PageTitle>
        <BookList items={[
          '如何优化 RecyclerView 性能？',
          'Android 内存泄漏的常见场景与解决方案？',
          '说说 Android 的动画机制，属性动画与视图动画的区别？',
          'Kotlin 协程的原理，与 RxJava 相比有什么优势？',
          'Jetpack Compose 与传统 XML 布局的对比？',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle icon={<ProjectOutlined />}>项目实战建议</PageTitle>
        <BookParagraph>
          通过以下练习巩固所学知识，建议按难度循序渐进。
        </BookParagraph>
        <BookList items={[
          '入门项目 —— 计算器 App，练习基本 UI 布局与事件处理',
          '进阶项目 —— 天气 App（调用 API），练习网络请求与数据展示',
          '综合项目 —— 笔记 App（Room 存储 + Material Design）',
          '高阶项目 —— 即时通讯 App，练习 WebSocket、推送通知',
          '开源贡献 —— 参与知名开源项目，学习最佳实践',
        ]} />
        <BookDivider />
        <PageTitle icon={<ProjectOutlined />}>推荐学习资源</PageTitle>
        <BookList items={[
          '官方文档 —— Android Developers（developer.android.com）',
          'Google Codelabs —— 官方手把手教程',
          '《第一行代码 Android》 —— 中文入门经典书籍',
          '《Android 开发艺术探索》 —— 进阶必读',
          'GitHub 开源项目 —— 学习优秀项目的代码架构',
        ]} />
        <BookAlert type="success" message="恭喜完成全部 11 章安卓开发课程！持续实践是成为优秀 Android 开发者的关键。" />
      </div>
    ),
  },
]

export default function ProjectsPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

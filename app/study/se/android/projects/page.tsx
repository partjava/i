'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, BookParagraph, BookCode, BookList, BookAlert, BookDivider } from '@shared/components/ui/book/BookContent'
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
<BookParagraph>{"原Todo实体和输入监听是综合项目片段，需Room、DAO、ViewModel、布局和后台执行环境。下面补足需求、状态、失败恢复及验收；不把创建一个@Entity类描述为完整可运行应用。"}</BookParagraph>
        <BookParagraph>
          一个完整的 Android 项目开发遵循以下流程，从需求分析到上线发布。
        </BookParagraph>
<BookParagraph>{"先把功能写成可验收行为：合法新增、空白拒绝、保存后重启仍在、完成状态可恢复。技术栈选择应围绕这些行为，不能用Room或MVVM名称代替数据一致性证明。每一阶段都保留小样本，便于判断问题发生在输入、规则、存储还是渲染。"}</BookParagraph>
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
<BookParagraph>{"Todo实体只定义数据形状，完整新增还需DAO、后台仓库、ViewModel状态和列表观察。点击后先显示保存中，只有数据库提交成功才确认完成；失败时保留草稿并允许重试。创建时间和稳定id由契约确定，不能用当前列表下标代替身份。"}</BookParagraph>
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
{ label: "把Todo项目限定为可交付闭环", left: (<div className="space-y-4">
<PageTitle>{"把Todo项目限定为可交付闭环"}</PageTitle>
<BookParagraph>{"首个版本只包含新增、列表、完成切换和删除，明确任务标题一到五十个规范化字符、创建时间记录UTC时刻、列表按完成状态与创建时间排序。网络同步、附件和提醒可以后续扩展，不要让初版同时承担全部系统能力。每项需求都配一个可观察结果，例如“关闭进程重新进入，已保存任务仍存在”；功能清单只有按钮名时，容易遗漏失败与状态恢复要求。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"推演一：新增操作跨过四个边界"}</PageTitle>
<BookParagraph>{"输入框提供原始文本，ViewModel进行业务校验，Repository在后台调用DAO，数据库提交成功后观察流更新列表。提交按钮在保存中避免重复操作，失败时恢复可编辑并保留文本。唯一任务id由数据库生成或按契约分配，不能用列表位置。创建时间只在首次成功创建时确定，重试不应无意改变原始时间。这个执行链可以逐层替换假实现，定位到底是未保存还是未渲染。"}</BookParagraph>
</div>) },
{ label: "需求、状态与验收对照", left: (<div className="space-y-4">
<PageTitle>{"需求、状态与验收对照"}</PageTitle>
<BookParagraph>{"一个需求至少描述正常输入、边界和失败。删除任务需说明是否允许撤销，完成切换需说明是否持久化，搜索需说明是否包含已完成项。下表把产品动作映射到数据不变量，避免只测试界面动画。先用固定三条任务手算排序和过滤结果，再在设备上核对；当实际结果不符时，可直接定位哪条规则不一致，不依赖对“看起来正常”的主观判断。"}</BookParagraph>
<div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><thead><tr><th className="border-b p-2 text-left">{"动作"}</th><th className="border-b p-2 text-left">{"数据不变量"}</th><th className="border-b p-2 text-left">{"验收观察"}</th></tr></thead><tbody><tr><td className="border-b p-2 align-top">{"新增"}</td><td className="border-b p-2 align-top">{"合法标题只创建一次"}</td><td className="border-b p-2 align-top">{"保存后重启仍存在"}</td></tr><tr><td className="border-b p-2 align-top">{"完成切换"}</td><td className="border-b p-2 align-top">{"只修改指定业务id"}</td><td className="border-b p-2 align-top">{"滚动与重进后勾选正确"}</td></tr><tr><td className="border-b p-2 align-top">{"排序过滤"}</td><td className="border-b p-2 align-top">{"同一输入顺序可复现"}</td><td className="border-b p-2 align-top">{"固定三行样本手算一致"}</td></tr><tr><td className="border-b p-2 align-top">{"删除"}</td><td className="border-b p-2 align-top">{"目标不存在且状态明确"}</td><td className="border-b p-2 align-top">{"失败可恢复且无幽灵任务"}</td></tr></tbody></table></div>
</div>), right: (<div className="space-y-4">
<PageTitle>{"可运行的排序与过滤规则模型"}</PageTitle>
<BookParagraph>{"以下Python 3程序用三条内存任务推演“未完成在前，同组较新在前”，不替代Android工程。预期输出2、1、3组成的列表；搜索“SQL”后只剩2。把这些固定样本迁移到Java或Kotlin本地测试，可以让Repository实现变化时仍保持相同业务行为。真实界面应观察不可变列表快照，并把任务id传给点击操作，不能把排序后的下标当作数据库主键。"}</BookParagraph>
<BookCode language="python" showLineNumbers code={"tasks = [\n {'id': 1, 'title': 'Read Java', 'done': False, 'created': 10},\n {'id': 2, 'title': 'Review SQL', 'done': False, 'created': 20},\n {'id': 3, 'title': 'Draw UI', 'done': True, 'created': 30},\n]\nordered = sorted(tasks, key=lambda t: (t['done'], -t['created'], t['id']))\nprint([t['id'] for t in ordered])\nprint([t['id'] for t in ordered if 'sql' in t['title'].lower()])"} />
</div>) },
{ label: "推演二：删除与撤销如何一致", left: (<div className="space-y-4">
<PageTitle>{"推演二：删除与撤销如何一致"}</PageTitle>
<BookParagraph>{"用户删除id为2的任务，界面先显示撤销入口。如果立即从数据库物理删除，再靠内存保存对象恢复，进程结束后撤销上下文会丢失；若延迟删除，则需明确撤销窗口和重启后的策略。初版可以不提供撤销，使用清晰确认与可靠删除；也可以保存带状态的删除标记。无论采用哪种方式，都要保证错误回调不会把已经成功删除的任务凭空恢复到列表。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"最小同步扩展的设计"}</PageTitle>
<BookParagraph>{"需要跨设备后，先给本地任务增加稳定同步标识和待同步状态，再设计服务端幂等操作与冲突策略。两个设备同时改标题时，最后写入覆盖、版本冲突提示和人工合并是不同产品方案。不能只把本地数据库每秒全量上传并认为同步已完成。请求失败仍保留本地修改，响应成功后在事务中更新同步状态；登出清理缓存时也要避免把未上传任务无提示丢弃。"}</BookParagraph>
</div>) },
{ label: "练习：提交可审查项目证据", left: (<div className="space-y-4">
<PageTitle>{"练习：提交可审查项目证据"}</PageTitle>
<BookParagraph>{"按新增、重启、完成、过滤、删除、数据库失败六条路径执行演示，并提交对应输入和预期结果。验收：空白标题不落库、快速重复点击不意外创建重复项、旋转不重新提交、排序结果稳定、任务切换使用业务id、导出日志无任务明文。参考思路：先用本章固定样本验证纯规则，再接Room和UI，最后检查真实设备生命周期，逐层推进能减少排错范围。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"项目复盘比技术名词更重要"}</PageTitle>
<BookParagraph>{"README写清所需Android Studio与构建兼容链、运行设备、依赖获取、测试命令及已知限制；没有实现的同步和提醒要明确列出。面试讲解应能追踪一次操作的状态变化，解释为什么选择仓库、在哪里关闭资源、失败后如何恢复。使用Hilt、Room或MVVM只是实现选择，若无法说明同一任务重复提交和进程恢复后的结果，框架数量不能证明项目已经完整。"}</BookParagraph>
<BookList items={[<a key="https://developer.android.com/topic/architecture" href="https://developer.android.com/topic/architecture" target="_blank" rel="noopener noreferrer" className="underline">{"Android应用架构"}</a>, <a key="https://developer.android.com/training/data-storage/room/async-queries" href="https://developer.android.com/training/data-storage/room/async-queries" target="_blank" rel="noopener noreferrer" className="underline">{"Room异步数据访问"}</a>]} />
</div>) },
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

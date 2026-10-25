'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, BookParagraph, BookCode, BookList, BookAlert, BookDivider } from '@shared/components/ui/book/BookContent'
import { RocketOutlined } from '@ant-design/icons'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '高级特性与性能优化',
  chapterNumber: 7,
  totalChapters: 11,
  subjectHref: '/study/se/android',
  prevChapter: { label: '多媒体与传感器', href: '/study/se/android/media-sensor' },
  nextChapter: { label: '安全与权限管理', href: '/study/se/android/security' },
  theme: THEMES.software,
}

const THREAD_HANDLER_CODE = `// 子线程执行任务
new Thread(() -> {
    // 耗时操作
    final String result = doHeavyWork();
    // 切换到主线程更新 UI
    runOnUiThread(() -> textView.setText(result));
}).start();

// Handler 用法
Handler handler = new Handler(Looper.getMainLooper());
handler.post(() -> {
    // 主线程更新 UI
    textView.setText("更新完成");
});

// 延迟执行
handler.postDelayed(() -> {
    // 延迟 1 秒执行
}, 1000);`

const ANIMATION_VIEW_CODE = `// 属性动画
ObjectAnimator animator = ObjectAnimator.ofFloat(view, "alpha", 0f, 1f);
animator.setDuration(1000);
animator.start();

// 组合动画
ObjectAnimator scaleX = ObjectAnimator.ofFloat(view, "scaleX", 1f, 2f);
ObjectAnimator scaleY = ObjectAnimator.ofFloat(view, "scaleY", 1f, 2f);
AnimatorSet set = new AnimatorSet();
set.playTogether(scaleX, scaleY);
set.setDuration(500);
set.start();

// 自定义 View
public class MyView extends View {
    private Paint paint = new Paint();

    public MyView(Context context) {
        super(context);
        paint.setColor(Color.BLUE);
        paint.setStyle(Paint.Style.FILL);
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        canvas.drawCircle(100, 100, 50, paint);
        canvas.drawText("自定义 View", 100, 200, paint);
    }
}`

const SPREADS = [
  // ===== 跨页 1: 多线程与性能 =====
  {
    label: '多线程',
    left: (
      <div className="space-y-4">
        <PageTitle icon={<RocketOutlined />}>多线程与异步</PageTitle>
<BookParagraph>{"原线程与Handler示例依赖Activity、View和业务函数；异步任务还需取消与结果归属。性能建议不是通用开关：弱引用不能代替清理，setHasFixedSize也不能修复错误尺寸假设。"}</BookParagraph>
        <BookParagraph>
          Android 主线程（UI 线程）负责界面更新，耗时操作必须在子线程执行，否则会导致 ANR（应用无响应）。
        </BookParagraph>
<BookParagraph>{"耗时任务迁出主线程只是第一步，还要控制并发、取消和结果归属。页面离开时任务未必停止，较旧请求也可能比新请求晚返回。先定义当前请求身份与拥有者，再判断回调能否更新界面，不能只依赖一次runOnUiThread保证所有异步正确性。"}</BookParagraph>
        <BookCode
          language="java"
          showLineNumbers
          code={THREAD_HANDLER_CODE}
        />
        <BookAlert type="info" message="Android 不允许在子线程直接更新 UI，必须通过 runOnUiThread 或 Handler 切换到主线程" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle icon={<RocketOutlined />}>性能优化技巧</PageTitle>
        <BookList items={[
          '避免内存泄漏 —— 使用弱引用（WeakReference）、及时释放资源、注意静态变量引用',
          '布局优化 —— 减少布局嵌套深度，使用 ConstraintLayout 替代多层 LinearLayout',
          '图片压缩与缓存 —— 使用 Glide 等图片库自动处理，避免大图直接加载到内存',
          'ViewStub 延迟加载 —— 不常用的布局使用 ViewStub 按需加载',
          'SparseArray —— 替代 HashMap<Integer, Object>，内存更高效',
          '避免在 onDraw 中创建对象 —— 在构造函数中预先创建 Paint、Path 等对象',
          '使用 RecyclerView 的 setHasFixedSize(true) 提高列表性能',
        ]} />
        <BookDivider />
        <PageTitle icon={<RocketOutlined />}>常用性能分析工具</PageTitle>
        <BookList items={[
          'Android Profiler —— CPU、内存、网络实时监控',
          'Memory Profiler —— 检测内存泄漏与内存抖动',
          'CPU Profiler —— 分析方法耗时与线程状态',
          'LeakCanary —— 自动检测内存泄漏',
          'StrictMode —— 检测主线程上的 IO 与网络操作',
        ]} />
      </div>
    ),
  },

  // ===== 跨页 2: 动画与自定义View =====
{ label: "帧预算解释界面为什么卡顿", left: (<div className="space-y-4">
<PageTitle>{"帧预算解释界面为什么卡顿"}</PageTitle>
<BookParagraph>{"以六十次每秒刷新作教学近似，一帧总时间约十六点七毫秒，输入处理、布局、绘制及相关工作共同消耗预算。把一百毫秒JSON解析放进点击监听器，期间主线程不能及时处理滚动，就可能连续错过数帧。高刷新率设备预算更短。ANR与掉帧不是同一阈值：没达到无响应判定仍可能很卡，因此性能验收应记录帧耗时分布，而非仅确认没有ANR弹窗。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"推演一：异步不等于工作消失"}</PageTitle>
<BookParagraph>{"主线程启动子线程后可以继续响应，但CPU解析仍消耗核心，磁盘读写仍消耗带宽。每次点击都创建一个新线程，十次点击就可能产生十份重复任务和结果竞态。用受限执行器或合适调度器控制并发，把IO与计算任务分开。显示结果之前检查请求身份和宿主状态；仅在子线程末尾调用runOnUiThread，不能保证页面仍然存在或结果仍是用户需要的最新查询。"}</BookParagraph>
</div>) },
{ label: "不同优化手段解决不同瓶颈", left: (<div className="space-y-4">
<PageTitle>{"不同优化手段解决不同瓶颈"}</PageTitle>
<BookParagraph>{"主线程阻塞应迁移合适工作并控制结果回传，内存泄漏需切断错误引用链，分配抖动需减少频繁短命对象，渲染过重则要检查布局与绘制。把所有问题都归结为“内存不足”容易选错方案。下表按可观察症状连接证据和行动；先用Profiler或跟踪记录定位，再改变一个条件复测。一次短暂流畅并不能证明长期泄漏已消失，也不能用更多缓存解决无限增长。"}</BookParagraph>
<div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><thead><tr><th className="border-b p-2 text-left">{"症状"}</th><th className="border-b p-2 text-left">{"应看证据"}</th><th className="border-b p-2 text-left">{"可能措施"}</th></tr></thead><tbody><tr><td className="border-b p-2 align-top">{"点击或滚动停顿"}</td><td className="border-b p-2 align-top">{"主线程跟踪与帧时间"}</td><td className="border-b p-2 align-top">{"迁移耗时工作并限并发"}</td></tr><tr><td className="border-b p-2 align-top">{"退出后内存持续上涨"}</td><td className="border-b p-2 align-top">{"对象引用链"}</td><td className="border-b p-2 align-top">{"取消回调并释放引用"}</td></tr><tr><td className="border-b p-2 align-top">{"短时间大量GC"}</td><td className="border-b p-2 align-top">{"分配记录"}</td><td className="border-b p-2 align-top">{"复用对象与减少临时分配"}</td></tr><tr><td className="border-b p-2 align-top">{"单项巨大耗时"}</td><td className="border-b p-2 align-top">{"任务耗时分布"}</td><td className="border-b p-2 align-top">{"分块、缓存或算法调整"}</td></tr></tbody></table></div>
</div>), right: (<div className="space-y-4">
<PageTitle>{"用数据而不是平均值判断改善"}</PageTitle>
<BookParagraph>{"下面Python 3模型输入五次任务耗时，其中一次一百毫秒。程序打印均值28.0与最大值100，说明均值会掩盖偶发长任务。它不是Android基准测试，只用于理解指标。实际测量需使用相同设备、数据量和场景，并观察尾部耗时、帧时间及内存趋势；调试构建、首次编译与热缓存都会改变结果，应记录环境，不把一次运行数字当成通用性能结论。"}</BookParagraph>
<BookCode language="python" showLineNumbers code={"samples_ms = [10, 10, 10, 10, 100]\nprint(sum(samples_ms) / len(samples_ms), max(samples_ms))"} />
</div>) },
{ label: "推演二：延迟回调如何留住页面", left: (<div className="space-y-4">
<PageTitle>{"推演二：延迟回调如何留住页面"}</PageTitle>
<BookParagraph>{"Activity创建匿名Runnable并通过Handler延迟五分钟执行，Runnable若引用textView，就可能沿View引用保留整个页面。用户离开后，消息仍在队列中，垃圾回收无法释放仍可达对象。正确处理是让拥有者保存回调并在合适生命周期移除，或用与生命周期绑定的任务机制。弱引用只改变可达性，不会取消无意义计算，也不能证明资源已经关闭。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"协程取消与异常的语义"}</PageTitle>
<BookParagraph>{"viewModelScope使任务与ViewModel生命周期关联，但协程取消是协作式的，阻塞调用仍需选择支持取消的API。捕获所有Exception后直接显示失败，可能把取消也误当业务错误；应保留取消传播，并区分网络、解析与业务错误。数据层不应偷偷指定永不结束的全局作用域。原协程代码中的apiService需注入实现，结果如何覆盖旧请求与是否缓存仍要定义，语法简洁不能替代并发协议。"}</BookParagraph>
</div>) },
{ label: "练习：给优化建立因果证据", left: (<div className="space-y-4">
<PageTitle>{"练习：给优化建立因果证据"}</PageTitle>
<BookParagraph>{"为长列表准备固定一千条数据，记录首次进入、连续滚动和反复退出进入的基线。验收：指出一个可重现瓶颈，提交对应引用链或耗时记录，修改后在相同输入下比较，保证列表内容与交互结果一致。参考思路：一次只改变图片目标尺寸或主线程解析位置等一个因素，比较尾部耗时和内存回落；不能同时改五项后声称某一项必然有效。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"自定义绘制与动画的约束"}</PageTitle>
<BookParagraph>{"onDraw可能频繁执行，应复用Paint和Path，避免在其中请求网络、查数据库或分配大量对象。动画改变alpha或缩放仍可能受合成、层与绘制内容影响，不能假定属性动画永远零成本。坐标使用像素时还要根据实际尺寸与密度计算，原圆形固定坐标只用于演示Canvas调用。交互区域、无障碍描述和状态恢复也属于自定义View职责，画出来只是第一步。"}</BookParagraph>
<BookList items={[<a key="https://developer.android.com/topic/performance/threads" href="https://developer.android.com/topic/performance/threads" target="_blank" rel="noopener noreferrer" className="underline">{"Android线程与性能"}</a>]} />
</div>) },
  {
    label: '动画',
    left: (
      <div className="space-y-4">
        <PageTitle icon={<RocketOutlined />}>动画与自定义 View</PageTitle>
        <BookParagraph>
          Android 提供属性动画（Property Animation）和视图动画（View Animation）。属性动画更灵活，可作用于任何对象的属性。
        </BookParagraph>
<BookParagraph>{"优化前记录设备、输入、帧耗时和内存趋势；修改后在同场景比较。弱引用不能取消后台计算，更多缓存也可能放大内存压力。每项技巧都有前提，先用Profiler找到实际瓶颈，再选择布局、图片或对象生命周期方面的措施。"}</BookParagraph>
        <BookCode
          language="java"
          showLineNumbers
          code={ANIMATION_VIEW_CODE}
        />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle icon={<RocketOutlined />}>Kotlin 协程</PageTitle>
        <BookParagraph>
          Kotlin 协程是 Android 官方推荐的异步解决方案，比线程更轻量，代码更简洁。
        </BookParagraph>
        <BookCode
          language="kotlin"
          showLineNumbers
          code={`// 在 ViewModel 中使用协程
class MainViewModel : ViewModel() {
    private val _data = MutableLiveData<String>()
    val data: LiveData<String> = _data

    fun fetchData() {
        viewModelScope.launch {
            try {
                val result = withContext(Dispatchers.IO) {
                    // 网络请求
                    apiService.getData()
                }
                _data.value = result
            } catch (e: Exception) {
                _data.value = "加载失败"
            }
        }
    }
}`}
        />
        <BookDivider />
        <PageTitle icon={<RocketOutlined />}>协程调度器</PageTitle>
        <BookList items={[
          'Dispatchers.Main —— 主线程，更新 UI',
          'Dispatchers.IO —— IO 操作（网络、文件、数据库）',
          'Dispatchers.Default —— CPU 密集型任务',
          'Dispatchers.Unconfined —— 不限定线程',
          'withContext() —— 切换到指定调度器执行',
        ]} />
      </div>
    ),
  },
]

export default function AdvancedPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

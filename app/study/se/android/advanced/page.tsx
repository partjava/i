'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  BookList,
  BookAlert,
  BookDivider,
} from '@shared/components/ui/book/BookContent'
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
        <BookParagraph>
          Android 主线程（UI 线程）负责界面更新，耗时操作必须在子线程执行，否则会导致 ANR（应用无响应）。
        </BookParagraph>
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
  {
    label: '动画',
    left: (
      <div className="space-y-4">
        <PageTitle icon={<RocketOutlined />}>动画与自定义 View</PageTitle>
        <BookParagraph>
          Android 提供属性动画（Property Animation）和视图动画（View Animation）。属性动画更灵活，可作用于任何对象的属性。
        </BookParagraph>
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

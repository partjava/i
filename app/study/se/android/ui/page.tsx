'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, BookParagraph, BookCode, BookAlert, BookDivider, BookList } from '@shared/components/ui/book/BookContent'
import { LayoutOutlined } from '@ant-design/icons'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: 'UI开发与布局',
  chapterNumber: 4,
  totalChapters: 11,
  subjectHref: '/study/se/android',
  prevChapter: { label: '基础语法与组件', href: '/study/se/android/basic' },
  nextChapter: { label: '数据存储与网络', href: '/study/se/android/data-network' },
  theme: THEMES.software,
}

const LAYOUT_XML_CODE = `<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <TextView
        android:id="@+id/tv_hello"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello Android"
        android:textSize="18sp" />

    <Button
        android:id="@+id/btn_click"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="点击我" />

</LinearLayout>`

const CONSTRAINT_LAYOUT_CODE = `<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <Button
        android:id="@+id/btn"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="按钮"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintBottom_toBottomOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>`

const RECYCLER_VIEW_ADAPTER_CODE = `public class MyAdapter extends RecyclerView.Adapter<MyAdapter.ViewHolder> {
    private List<String> data;

    public MyAdapter(List<String> data) { this.data = data; }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
            .inflate(R.layout.item_text, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        holder.textView.setText(data.get(position));
    }

    @Override
    public int getItemCount() { return data.size(); }

    static class ViewHolder extends RecyclerView.ViewHolder {
        TextView textView;

        ViewHolder(View itemView) {
            super(itemView);
            textView = itemView.findViewById(R.id.text);
        }
    }
}`

const SPREADS = [
  // ===== 跨页 1: 布局XML与ConstraintLayout =====
  {
    label: '布局基础',
    left: (
      <div className="space-y-4">
        <PageTitle icon={<LayoutOutlined />}>布局 XML 基础</PageTitle>
<BookParagraph>{"原Java/XML和RecyclerView示例需AndroidX依赖、对应布局与模型。后续对绑定位置、复用状态和约束测量作具体推演；setHasFixedSize仅在列表自身尺寸不受内容变化影响时适用。"}</BookParagraph>
        <BookParagraph>
          Android 使用 XML 定义界面布局。常用布局容器包括 LinearLayout（线性布局）、RelativeLayout（相对布局）和 ConstraintLayout（约束布局）。
        </BookParagraph>
<BookParagraph>{"布局尺寸由父约束与子控件需求共同决定。先用短标题、超长标题和大字体观察同一行，说明哪段空间可伸缩、哪段必须保留。不要只凭默认模拟器截图调固定像素，否则换密度、窗口宽度或语言后很容易重叠。"}</BookParagraph>
        <BookCode
          language="xml"
          showLineNumbers
          code={LAYOUT_XML_CODE}
        />
        <BookAlert type="info" message="match_parent 填充父容器，wrap_content 包裹内容，dp/sp 是屏幕密度无关的单位" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle icon={<LayoutOutlined />}>ConstraintLayout 约束布局</PageTitle>
        <BookParagraph>
          ConstraintLayout 是官方推荐的布局方式，通过约束关系定位子视图，可大幅减少布局嵌套深度。
        </BookParagraph>
<BookParagraph>{"约束必须形成可解释的位置与尺寸关系。标题宽0dp时应同时具备有效两端约束，让剩余空间由布局求解；仅设置bias不能补齐缺失约束。先在布局检查器确认实际边界，再判断是尺寸规则还是文字换行造成效果不符。"}</BookParagraph>
        <BookCode
          language="xml"
          showLineNumbers
          code={CONSTRAINT_LAYOUT_CODE}
        />
        <BookDivider />
        <PageTitle icon={<LayoutOutlined />}>常用约束属性</PageTitle>
        <BookCode language="xml" code={`app:layout_constraintTop_toTopOf="parent"
app:layout_constraintBottom_toBottomOf="parent"
app:layout_constraintStart_toStartOf="parent"
app:layout_constraintEnd_toEndOf="parent"
app:layout_constraintLeft_toLeftOf="parent"
app:layout_constraintRight_toRightOf="parent"
app:layout_constraintHorizontal_bias="0.5"
app:layout_constraintVertical_bias="0.3"`} />
      </div>
    ),
  },

  // ===== 跨页 2: RecyclerView =====
{ label: "布局先测量，再布局与绘制", left: (<div className="space-y-4">
<PageTitle>{"布局先测量，再布局与绘制"}</PageTitle>
<BookParagraph>{"XML描述父子关系和约束，不是像素截图。父布局把约束传给子View，子View报告期望尺寸，父布局决定位置，再由绘制过程显示。match_parent与wrap_content表达不同意图，ConstraintLayout中的0dp常用于匹配约束范围。只有宽度0dp却没有两端约束，结果可能不可见或不符合预期。先确定父容器可用空间，再解释子控件为何被拉伸、截断或挤出屏幕。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"推演一：同一行任务标题与删除按钮"}</PageTitle>
<BookParagraph>{"父容器宽360dp，左右边距各16dp，删除按钮占48dp，按钮与标题间隔8dp，则标题可用空间最多272dp。若标题写死300dp，长标题可能与按钮重叠。把标题起点约束到父起点、终点约束到按钮起点，宽度匹配约束，再设置单行省略或多行策略。开启大字体与更窄窗口后再次观察，确保按钮仍可操作，不能只用默认字号下的截图验收。"}</BookParagraph>
</div>) },
{ label: "列表复用解决什么问题", left: (<div className="space-y-4">
<PageTitle>{"列表复用解决什么问题"}</PageTitle>
<BookParagraph>{"一千条待办不需要同时创建一千份完整View，RecyclerView保留屏幕附近的ViewHolder，滚动时重新绑定模型。模型id代表业务身份，position只是当前排列位置，过滤或插入后会变化。点击监听若捕获旧位置，可能删除错误任务。应在点击时取得有效位置或直接绑定稳定业务id，并处理位置失效。下表区分对象身份与状态来源，帮助定位滚动后勾选错乱的问题。"}</BookParagraph>
<div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><thead><tr><th className="border-b p-2 text-left">{"概念"}</th><th className="border-b p-2 text-left">{"代表含义"}</th><th className="border-b p-2 text-left">{"错误用法"}</th></tr></thead><tbody><tr><td className="border-b p-2 align-top">{"业务id"}</td><td className="border-b p-2 align-top">{"一条任务的稳定身份"}</td><td className="border-b p-2 align-top">{"使用列表下标当主键"}</td></tr><tr><td className="border-b p-2 align-top">{"Adapter位置"}</td><td className="border-b p-2 align-top">{"当前展示次序"}</td><td className="border-b p-2 align-top">{"过滤后仍用旧位置"}</td></tr><tr><td className="border-b p-2 align-top">{"ViewHolder"}</td><td className="border-b p-2 align-top">{"可复用显示容器"}</td><td className="border-b p-2 align-top">{"把勾选事实仅存View"}</td></tr><tr><td className="border-b p-2 align-top">{"绑定函数"}</td><td className="border-b p-2 align-top">{"模型到界面的投影"}</td><td className="border-b p-2 align-top">{"只更新部分可变属性"}</td></tr></tbody></table></div>
</div>), right: (<div className="space-y-4">
<PageTitle>{"绑定必须写出所有可变状态"}</PageTitle>
<BookParagraph>{"下例是Adapter的绑定方法内部片段，依赖已有holder、item和监听器，不是独立Java程序。先移除旧勾选监听器，再写入当前模型的状态，最后安装新监听，避免程序赋值被当作用户操作。标题、勾选、可见性和启用状态都应在每次绑定中覆盖。预期是完成项滚出再滚回仍正确，未完成项不会继承被复用View上的勾选状态。"}</BookParagraph>
<BookCode language="java" showLineNumbers code={"holder.checkBox.setOnCheckedChangeListener(null);\nholder.title.setText(item.title);\nholder.checkBox.setChecked(item.completed);\nholder.checkBox.setOnCheckedChangeListener((button, checked) -> {\n    onCompletedChanged(item.id, checked);\n});"} />
</div>) },
{ label: "推演二：异步图片加载错位", left: (<div className="space-y-4">
<PageTitle>{"推演二：异步图片加载错位"}</PageTitle>
<BookParagraph>{"Holder先绑定任务A并发出图片请求，快速滚动后同一Holder绑定任务B，若A的结果稍后到达并直接设置ImageView，B会显示A的图片。把图片请求绑定到当前View和请求生命周期，并在新绑定时替换目标或取消旧请求。占位图和失败图也要按当前项设置。不能用列表位置作为图片身份；数据源的稳定id与图片地址才适合组成缓存或请求键。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"数据更新与差分通知"}</PageTitle>
<BookParagraph>{"修改模型后必须让渲染层获知变化，直接修改一个没有被观察的ArrayList不会保证界面更新。差分更新需要旧列表和新列表在比较时保持一致的快照；若原地同时修改两份引用，比较可能看不到变化。业务身份相同但标题不同属于内容变化，身份不同则是删除与插入。先解释正确的变更语义，再选择ListAdapter或合适通知方式，不要用全量刷新掩盖身份错误。"}</BookParagraph>
</div>) },
{ label: "练习：复现并修复复用错误", left: (<div className="space-y-4">
<PageTitle>{"练习：复现并修复复用错误"}</PageTitle>
<BookParagraph>{"创建二十条任务，仅第一个已完成，滚动到末尾再返回，随后在顶部插入一项并点击原第二项。验收：勾选不串行，点击操作命中业务id，空列表有清晰状态，长标题和大字体下按钮可达。参考思路：在绑定日志记录holder标识、任务id和当前位置；对比一次复用前后的所有可变属性，找出没有覆盖的状态，而不是关闭复用功能。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"可访问性与性能的共同边界"}</PageTitle>
<BookParagraph>{"可点击图标要有可理解标签，控件焦点顺序应符合阅读顺序，不能只靠颜色表达是否完成。复杂列表要避免每次绑定都做数据库查询、图像解码或深层布局计算；这些工作会占用主线程帧预算。减少嵌套是否有效要用测量与渲染耗时验证。UI演示不意味着必须迁移到另一套框架，已有Views项目同样可以通过正确状态绑定和布局约束获得稳定交互。"}</BookParagraph>
<BookList items={[<a key="https://developer.android.com/develop/ui/views/layout/recyclerview" href="https://developer.android.com/develop/ui/views/layout/recyclerview" target="_blank" rel="noopener noreferrer" className="underline">{"RecyclerView动态列表"}</a>]} />
</div>) },
  {
    label: 'RecyclerView',
    left: (
      <div className="space-y-4">
        <PageTitle icon={<LayoutOutlined />}>RecyclerView 适配器</PageTitle>
        <BookParagraph>
          RecyclerView 是高效的列表/网格组件，通过 ViewHolder 模式实现视图复用，大幅提升长列表性能。
        </BookParagraph>
        <BookCode
          language="java"
          showLineNumbers
          code={RECYCLER_VIEW_ADAPTER_CODE}
        />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle icon={<LayoutOutlined />}>RecyclerView 配置</PageTitle>
        <BookParagraph>
          在 Activity 或 Fragment 中配置 RecyclerView：
        </BookParagraph>
        <BookCode
          language="java"
          showLineNumbers
          code={`RecyclerView recyclerView = findViewById(R.id.recycler);
recyclerView.setLayoutManager(new LinearLayoutManager(this));
recyclerView.setAdapter(new MyAdapter(dataList));

// 添加分割线
recyclerView.addItemDecoration(
    new DividerItemDecoration(this, LinearLayoutManager.VERTICAL));`}
        />
        <BookDivider />
        <PageTitle icon={<LayoutOutlined />}>常用 LayoutManager</PageTitle>
        <BookCode language="java" code={`// 线性列表
LinearLayoutManager layoutManager = new LinearLayoutManager(this);

// 水平列表
LinearLayoutManager horizontalManager =
    new LinearLayoutManager(this, LinearLayoutManager.HORIZONTAL, false);

// 网格列表
GridLayoutManager gridManager = new GridLayoutManager(this, 2);

// 瀑布流
StaggeredGridLayoutManager staggeredManager =
    new StaggeredGridLayoutManager(2, StaggeredGridLayoutManager.VERTICAL);`} />
      </div>
    ),
  },
]

export default function UIPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

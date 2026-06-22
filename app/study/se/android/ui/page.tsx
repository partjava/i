'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookDivider,
} from '@/app/components/ui/book/BookContent'
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
        <BookParagraph>
          Android 使用 XML 定义界面布局。常用布局容器包括 LinearLayout（线性布局）、RelativeLayout（相对布局）和 ConstraintLayout（约束布局）。
        </BookParagraph>
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

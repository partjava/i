'use client';
export default function AndroidUIPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">UI开发与布局</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">布局XML示例</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">
    <TextView
        android:id="@+id/tv_hello"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello Android" />
    <Button
        android:id="@+id/btn_click"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="点击我" />
</LinearLayout>`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">ConstraintLayout用法</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`<androidx.constraintlayout.widget.ConstraintLayout
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
        app:layout_constraintStart_toStartOf="parent"/>
</androidx.constraintlayout.widget.ConstraintLayout>`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">RecyclerView适配器示例</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`public class MyAdapter extends RecyclerView.Adapter<MyAdapter.ViewHolder> {
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
}`}
        </pre>
      </div>
      <div className="mt-10 flex justify-between">
        <a href="/study/se/android/basic" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← 基础语法与组件
        </a>
        <a href="/study/se/android/data-network" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          数据存储与网络 →
        </a>
      </div>
    </div>
  );
} 
'use client';
export default function AndroidAdvancedPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">高级特性与性能优化</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">多线程与异步</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`new Thread(() -> {
    // 子线程任务
}).start();

// Handler用法
Handler handler = new Handler(Looper.getMainLooper());
handler.post(() -> {
    // 主线程更新UI
});`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">性能优化技巧</h2>
        <ul className="mb-4 space-y-2 text-gray-700">
          <li>• 避免内存泄漏（使用弱引用、及时释放资源）</li>
          <li>• 布局优化（减少嵌套、使用ConstraintLayout）</li>
          <li>• 图片压缩与缓存</li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">动画与自定义View</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`// 属性动画
ObjectAnimator animator = ObjectAnimator.ofFloat(view, "alpha", 0f, 1f);
animator.setDuration(1000);
animator.start();

// 自定义View
public class MyView extends View {
    public MyView(Context context) { super(context); }
    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        canvas.drawCircle(100, 100, 50, new Paint());
    }
}`}
        </pre>
      </div>
      <div className="mt-10 flex justify-between">
        <a href="/study/se/android/media-sensor" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← 多媒体与传感器
        </a>
        <a href="/study/se/android/security" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          安全与权限管理 →
        </a>
      </div>
    </div>
  );
} 
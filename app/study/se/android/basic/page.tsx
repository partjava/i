'use client';
export default function AndroidBasicPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">基础语法与组件</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">Java/Kotlin基础</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`// Java
String msg = "Hello Android";
System.out.println(msg);

// Kotlin
val msg = "Hello Android"
println(msg)`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">四大组件简介</h2>
        <ul className="mb-4 space-y-2 text-gray-700">
          <li>• Activity：界面交互</li>
          <li>• Service：后台服务</li>
          <li>• BroadcastReceiver：广播接收</li>
          <li>• ContentProvider：数据共享</li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">Activity生命周期示例</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
}

@Override
protected void onStart() { super.onStart(); }
@Override
protected void onResume() { super.onResume(); }
@Override
protected void onPause() { super.onPause(); }
@Override
protected void onStop() { super.onStop(); }
@Override
protected void onDestroy() { super.onDestroy(); }`}
        </pre>
      </div>
      <div className="mt-10 flex justify-between">
        <a href="/study/se/android/setup" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← 开发环境配置
        </a>
        <a href="/study/se/android/ui" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          UI开发与布局 →
        </a>
      </div>
    </div>
  );
} 
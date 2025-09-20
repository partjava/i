'use client';
export default function AndroidProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">实战项目与案例</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">项目开发流程</h2>
        <ul className="mb-4 space-y-2 text-gray-700">
          <li>• 需求分析与原型设计</li>
          <li>• 架构设计与技术选型</li>
          <li>• 代码开发与测试</li>
          <li>• 部署上线与运维</li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">综合案例：Todo应用</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`// 添加任务
editText.setOnEditorActionListener((v, actionId, event) -> {
    String todo = v.getText().toString();
    todoList.add(todo);
    adapter.notifyDataSetChanged();
    return true;
});`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">常见问题与面试题</h2>
        <ul className="mb-4 space-y-2 text-gray-700">
          <li>• Activity与Fragment的区别？</li>
          <li>• 如何优化RecyclerView性能？</li>
          <li>• Android中如何实现数据持久化？</li>
        </ul>
      </div>
      <div className="mt-10 flex justify-start">
        <a href="/study/se/android/testing" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← 测试与发布
        </a>
      </div>
    </div>
  );
} 
'use client';
export default function BigdataProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">实战案例与项目</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">项目开发流程</h2>
        <ul className="mb-4 space-y-2 text-gray-700">
          <li>• 需求分析与数据采集</li>
          <li>• 数据建模与开发</li>
          <li>• 计算与分析</li>
          <li>• 可视化与上线</li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">综合案例：日志分析平台</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`# Flume采集 -> HDFS存储 -> Spark分析 -> Superset可视化`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">常见问题与面试题</h2>
        <ul className="mb-4 space-y-2 text-gray-700">
          <li>• HDFS和传统文件系统的区别？</li>
          <li>• Spark和MapReduce的优劣？</li>
          <li>• 如何保障大数据平台安全？</li>
        </ul>
      </div>
      <div className="mt-10 flex justify-start">
        <a href="/study/se/bigdata/security" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← 大数据安全与运维
        </a>
      </div>
    </div>
  );
} 
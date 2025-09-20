'use client';
export default function BigdataBIPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">可视化与BI</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">数据可视化工具</h2>
        <ul className="mb-4 space-y-2 text-gray-700">
          <li>• Tableau：拖拽式分析</li>
          <li>• Apache Superset：开源BI平台</li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">BI平台集成</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`# Superset连接Hive
superset db upgrade
superset fab create-admin
superset run -p 8088 --with-threads`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">可视化代码示例（Python）</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`import matplotlib.pyplot as plt
plt.plot([1,2,3],[4,5,6])
plt.show()`}
        </pre>
      </div>
      <div className="mt-10 flex justify-between">
        <a href="/study/se/bigdata/analysis" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← 数据分析与挖掘
        </a>
        <a href="/study/se/bigdata/security" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          大数据安全与运维 →
        </a>
      </div>
    </div>
  );
} 
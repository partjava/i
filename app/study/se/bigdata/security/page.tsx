'use client';
export default function BigdataSecurityPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">大数据安全与运维</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">权限管理与认证</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`# Hadoop权限
hdfs dfs -chmod 700 /user/hadoop`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">数据加密与安全</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`# Hive加密表
CREATE TABLE secret (id INT, data STRING) STORED AS TEXTFILE TBLPROPERTIES ('encryption'='true');`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">集群监控与运维</h2>
        <ul className="mb-4 space-y-2 text-gray-700">
          <li>• Ambari、Cloudera Manager集群管理</li>
          <li>• Ganglia、Prometheus监控</li>
        </ul>
      </div>
      <div className="mt-10 flex justify-between">
        <a href="/study/se/bigdata/bi" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← 可视化与BI
        </a>
        <a href="/study/se/bigdata/projects" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          实战案例与项目 →
        </a>
      </div>
    </div>
  );
} 
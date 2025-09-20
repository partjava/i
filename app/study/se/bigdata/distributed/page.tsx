'use client';
export default function BigdataDistributedPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">分布式存储与计算</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">HDFS分布式文件系统</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`hdfs dfs -ls /data
hdfs dfs -put local.txt /data/`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">Hive数据仓库</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`CREATE TABLE users(id INT, name STRING);
SELECT * FROM users;`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">HBase NoSQL数据库</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`create 'user', 'info'
put 'user', '1001', 'info:name', 'Tom'`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">分布式计算原理</h2>
        <ul className="mb-4 space-y-2 text-gray-700">
          <li>• MapReduce：分而治之，批量处理</li>
          <li>• Spark/Flink：内存计算与流式处理</li>
        </ul>
      </div>
      <div className="mt-10 flex justify-between">
        <a href="/study/se/bigdata/ingest" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← 数据采集与预处理
        </a>
        <a href="/study/se/bigdata/analysis" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          数据分析与挖掘 →
        </a>
      </div>
    </div>
  );
}
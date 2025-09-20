'use client';
export default function BigdataPlatformPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">大数据平台与生态</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">主流大数据平台</h2>
        <ul className="mb-4 space-y-2 text-gray-700">
          <li>• Hadoop：分布式存储与批处理</li>
          <li>• Spark：内存计算、批流一体</li>
          <li>• Flink：高性能流式处理</li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">生态组件简介</h2>
        <ul className="mb-4 space-y-2 text-gray-700">
          <li>• Hive：数据仓库</li>
          <li>• HBase：NoSQL数据库</li>
          <li>• Zookeeper：分布式协调</li>
          <li>• Kafka：消息队列</li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">Spark作业示例</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`from pyspark import SparkContext
sc = SparkContext()
rdd = sc.textFile('data.txt')
print(rdd.count())`}
        </pre>
      </div>
      <div className="mt-10 flex justify-between">
        <a href="/study/se/bigdata/intro" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← 概述
        </a>
        <a href="/study/se/bigdata/ingest" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          数据采集与预处理 →
        </a>
      </div>
    </div>
  );
} 
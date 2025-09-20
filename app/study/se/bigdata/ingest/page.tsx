'use client';
export default function BigdataIngestPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">数据采集与预处理</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">数据采集工具</h2>
        <ul className="mb-4 space-y-2 text-gray-700">
          <li>• Flume：日志采集</li>
          <li>• Logstash：多源数据采集与转换</li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">数据清洗与转换</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`# Logstash配置示例
input { file { path => "/var/log/syslog" } }
filter { grok { match => { "message" => "%{SYSLOGBASE}" } } }
output { elasticsearch { hosts => ["localhost:9200"] } }`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">ETL流程</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`# PySpark数据清洗
from pyspark.sql import functions as F
df = df.withColumn('age', F.col('age').cast('int'))
df = df.dropna()`}
        </pre>
      </div>
      <div className="mt-10 flex justify-between">
        <a href="/study/se/bigdata/platform" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← 大数据平台与生态
        </a>
        <a href="/study/se/bigdata/distributed" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          分布式存储与计算 →
        </a>
      </div>
    </div>
  );
} 
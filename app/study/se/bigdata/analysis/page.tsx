'use client';
export default function BigdataAnalysisPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">数据分析与挖掘</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">Spark SQL分析</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`df.createOrReplaceTempView('users')
spark.sql('SELECT COUNT(*) FROM users').show()`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">机器学习与挖掘</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`from pyspark.ml.classification import LogisticRegression
lr = LogisticRegression()
model = lr.fit(df)`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">流式分析</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`from pyspark.sql import SparkSession
spark = SparkSession.builder.getOrCreate()
ds = spark.readStream.format('kafka').option('subscribe', 'topic').load()`}
        </pre>
      </div>
      <div className="mt-10 flex justify-between">
        <a href="/study/se/bigdata/distributed" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← 分布式存储与计算
        </a>
        <a href="/study/se/bigdata/bi" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          可视化与BI →
        </a>
      </div>
    </div>
  );
} 
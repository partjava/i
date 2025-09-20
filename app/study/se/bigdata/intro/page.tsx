'use client';
export default function BigdataIntroPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">大数据分析概述</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">大数据定义</h2>
        <p className="mb-4 text-gray-700">大数据是指规模巨大、类型多样、增长快速的数据集合，具有4V特征：体量大（Volume）、类型多（Variety）、速度快（Velocity）、价值密度低（Value）。</p>
        <h2 className="text-2xl font-bold mb-4">发展历程</h2>
        <ul className="mb-4 space-y-2 text-gray-700">
          <li>• 2005年Hadoop开源，推动大数据技术发展</li>
          <li>• 2010年Spark、Flink等新一代平台兴起</li>
          <li>• 2020年云原生大数据、AI融合趋势明显</li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">应用场景</h2>
        <ul className="mb-4 space-y-2 text-gray-700">
          <li>• 智能推荐与广告</li>
          <li>• 金融风控与反欺诈</li>
          <li>• 智慧医疗与城市</li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">大数据Hello World（PySpark）</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`from pyspark.sql import SparkSession
spark = SparkSession.builder.appName('demo').getOrCreate()
df = spark.read.json('data.json')
df.show()`}
        </pre>
      </div>
      <div className="mt-10 flex justify-end">
        <a href="/study/se/bigdata/platform" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          大数据平台与生态 →
        </a>
      </div>
    </div>
  );
} 
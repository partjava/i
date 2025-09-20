'use client';
export default function SearchIndexPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">索引构建</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">索引基础</h2>
        <ul className="mb-4 space-y-2 text-gray-700">
          <li>• 索引的定义与作用</li>
          <li>• 索引的基本组成</li>
          <li>• 索引的工作流程</li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">Elasticsearch索引示例</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`# 创建索引
PUT /my_index
{
  "mappings": {
    "properties": {
      "title": { "type": "text" },
      "content": { "type": "text" }
    }
  }
}

# 添加文档
POST /my_index/_doc
{
  "title": "示例标题",
  "content": "示例内容"
}`}
        </pre>
      </div>
      <div className="mt-10 flex justify-between">
        <a href="/study/se/search/crawler" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← 爬虫与数据采集
        </a>
        <a href="/study/se/search/query" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          查询处理 →
        </a>
      </div>
    </div>
  );
} 
'use client';
export default function SearchElasticsearchPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Elasticsearch示例</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">Elasticsearch基础</h2>
        <ul className="mb-4 space-y-2 text-gray-700">
          <li>• Elasticsearch的定义与作用</li>
          <li>• Elasticsearch的基本组成</li>
          <li>• Elasticsearch的工作流程</li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">Elasticsearch示例</h2>
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

# 搜索文档
GET /my_index/_search
{
  "query": {
    "match": {
      "content": "搜索关键词"
    }
  }
}`}
        </pre>
      </div>
      <div className="mt-10 flex justify-between">
        <a href="/study/se/search/query" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← 查询处理
        </a>
        <a href="/study/se/search/advanced" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          高级搜索特性 →
        </a>
      </div>
    </div>
  );
} 
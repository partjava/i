'use client';
export default function SearchBasicPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">搜索引擎基础</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">搜索引擎概述</h2>
        <ul className="mb-4 space-y-2 text-gray-700">
          <li>• 搜索引擎的定义与作用</li>
          <li>• 搜索引擎的基本组成</li>
          <li>• 搜索引擎的工作流程</li>
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
        <a href="/study/se/search" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← 智能搜索引擎
        </a>
        <a href="/study/se/search/crawler" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          爬虫与数据采集 →
        </a>
      </div>
    </div>
  );
} 
'use client';
export default function SearchAdvancedPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">高级搜索特性</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">高级搜索基础</h2>
        <ul className="mb-4 space-y-2 text-gray-700">
          <li>• 模糊匹配</li>
          <li>• 同义词处理</li>
          <li>• 地理位置搜索</li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">Elasticsearch高级示例</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`# 模糊匹配
GET /my_index/_search
{
  "query": {
    "fuzzy": {
      "content": "搜索关键词"
    }
  }
}

# 地理位置搜索
GET /my_index/_search
{
  "query": {
    "geo_distance": {
      "distance": "10km",
      "location": {
        "lat": 40.73,
        "lon": -74.1
      }
    }
  }
}`}
        </pre>
      </div>
      <div className="mt-10 flex justify-between">
        <a href="/study/se/search/elasticsearch" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← Elasticsearch示例
        </a>
        <a href="/study/se/modeling" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          软件建模与设计 →
        </a>
      </div>
    </div>
  );
} 
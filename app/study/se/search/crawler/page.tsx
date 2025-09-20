'use client';
export default function SearchCrawlerPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">爬虫与数据采集</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">爬虫基础</h2>
        <ul className="mb-4 space-y-2 text-gray-700">
          <li>• 爬虫的定义与作用</li>
          <li>• 爬虫的基本组成</li>
          <li>• 爬虫的工作流程</li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">Python爬虫示例</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`import requests
from bs4 import BeautifulSoup

url = 'https://example.com'
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')
print(soup.title.string)`}
        </pre>
      </div>
      <div className="mt-10 flex justify-between">
        <a href="/study/se/search/basic" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← 搜索引擎基础
        </a>
        <a href="/study/se/search/index" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          索引构建 →
        </a>
      </div>
    </div>
  );
} 
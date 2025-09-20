'use client';

import { useState } from 'react';

const tabs = [
  { key: 'unit', label: '单元测试' },
  { key: 'bench', label: '基准测试' },
  { key: 'mock', label: 'Mock与覆盖率' },
  { key: 'profile', label: '性能分析' },
  { key: 'opt', label: '优化技巧' },
  { key: 'practice', label: '例题与练习' },
  { key: 'faq', label: '常见问题' },
];

export default function GoTestingPage() {
  const [activeTab, setActiveTab] = useState('unit');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 mt-4">Go语言测试与性能优化</h1>
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none ${
                activeTab === tab.key
                  ? 'border-blue-500 text-blue-600 font-bold'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="bg-white rounded-lg shadow p-8">
        {activeTab === 'unit' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">单元测试</h2>
            <p>Go内置testing包，支持简单高效的单元测试。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  'package mathutil',
  '',
  'import "testing"',
  '',
  'func Add(a, b int) int {',
  '    return a + b',
  '}',
  '',
  'func TestAdd(t *testing.T) {',
  '    if Add(2, 3) != 5 {',
  '        t.Error("Add(2,3) 应为5")',
  '    }',
  '}',
].join('\n')}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>测试文件以<code>_test.go</code>结尾</li>
              <li>测试函数以<code>Test</code>开头</li>
              <li>用<code>go test</code>命令运行</li>
            </ul>
          </div>
        )}
        {activeTab === 'bench' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">基准测试</h2>
            <p>基准测试用于评估代码性能，函数名以<code>Benchmark</code>开头。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  'func BenchmarkAdd(b *testing.B) {',
  '    for i := 0; i < b.N; i++ {',
  '        Add(1, 2)',
  '    }',
  '}',
  '',
  '// 运行基准测试',
  '// go test -bench=.',
].join('\n')}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>基准测试函数参数为<code>*testing.B</code></li>
              <li>用<code>go test -bench=.</code>运行</li>
            </ul>
          </div>
        )}
        {activeTab === 'mock' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Mock与覆盖率</h2>
            <p>可用接口+自定义实现进行Mock，go test支持覆盖率统计。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '// Mock接口',
  'type DB interface {',
  '    GetUser(id int) string',
  '}',
  '',
  'type MockDB struct{}',
  'func (m *MockDB) GetUser(id int) string { return "Tom" }',
  '',
  '// 覆盖率统计',
  '// go test -cover',
].join('\n')}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>接口Mock适合隔离依赖</li>
              <li>go test -cover 查看覆盖率</li>
            </ul>
          </div>
        )}
        {activeTab === 'profile' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">性能分析</h2>
            <p>Go内置pprof包支持CPU、内存等性能分析。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  'import _ "net/http/pprof"',
  '',
  'func main() {',
  '    go http.ListenAndServe(":6060", nil)',
  '    // ...业务代码...',
  '}',
  '',
  '// 运行后访问 http://localhost:6060/debug/pprof/',
  '// 命令行分析：go tool pprof',
].join('\n')}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>pprof支持CPU、内存、阻塞等分析</li>
              <li>可用go tool pprof命令分析结果</li>
            </ul>
          </div>
        )}
        {activeTab === 'opt' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">优化技巧</h2>
            <p>常见性能优化技巧：</p>
            <ul className="list-disc pl-6 mt-2">
              <li>减少内存分配，复用对象</li>
              <li>避免不必要的Goroutine</li>
              <li>合理使用缓冲区和池（sync.Pool）</li>
              <li>热点路径用基准测试定位</li>
              <li>数据库操作用连接池</li>
            </ul>
          </div>
        )}
        {activeTab === 'practice' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">例题与练习</h2>
            <p className="mb-2 font-semibold">例题1：测试加法函数的正确性</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  'func TestAdd(t *testing.T) {',
  '    if Add(1, 2) != 3 {',
  '        t.Error("Add(1,2) 应为3")',
  '    }',
  '}',
].join('\n')}
            </pre>
            <p className="mb-2 font-semibold">例题2：基准测试字符串拼接</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  'func BenchmarkConcat(b *testing.B) {',
  '    for i := 0; i < b.N; i++ {',
  '        _ = "a" + "b"',
  '    }',
  '}',
].join('\n')}
            </pre>
            <p className="mb-2 font-semibold">练习：用pprof分析内存泄漏</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  'import _ "net/http/pprof"',
  'go http.ListenAndServe(":6060", nil)',
  '// 业务代码...'
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'faq' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">常见问题</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><b>Q: 如何测试私有函数？</b><br />A: 可通过测试包内的公有接口间接测试。</li>
              <li><b>Q: 如何提高测试覆盖率？</b><br />A: 细化测试用例，覆盖各种分支。</li>
              <li><b>Q: 性能测试结果不稳定怎么办？</b><br />A: 多次运行取平均，排除外部干扰。</li>
            </ul>
          </div>
        )}
        <div className="mt-8 flex justify-between">
          <a
            href="/study/go/database"
            className="inline-flex items-center bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            上一页：数据库操作
          </a>
          <a
            href="/study/go/microservices"
            className="inline-flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            下一页：微服务开发
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
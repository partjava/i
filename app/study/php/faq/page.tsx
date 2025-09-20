'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const tabs = [
  { key: 'faq', label: '常见问题' },
  { key: 'interview', label: '面试题' },
  { key: 'algo', label: '算法题' },
  { key: 'system', label: '系统设计' },
  { key: 'best', label: '最佳实践' },
  { key: 'review', label: '代码审查' },
  { key: 'exercise', label: '练习' },
]

export default function FAQPage() {
  const [activeTab, setActiveTab] = useState('faq')
  const router = useRouter()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 mt-4 text-center">常见问题与面试题</h1>
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

      {/* 内容区域 */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        {activeTab === 'faq' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">常见问题</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">1. PHP 7和PHP 8的主要区别是什么？</h3>
                <div className="space-y-3">
                  <p className="text-gray-700">PHP 8引入了许多新特性，包括：</p>
                  <ul className="list-disc pl-4 text-gray-700 space-y-2">
                    <li>JIT编译器</li>
                    <li>联合类型</li>
                    <li>命名参数</li>
                    <li>属性</li>
                    <li>构造器属性提升</li>
                    <li>匹配表达式</li>
                    <li>Nullsafe运算符</li>
                    <li>字符串与数字比较更严格</li>
                  </ul>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">2. 如何优化PHP应用的性能？</h3>
                <div className="space-y-3">
                  <p className="text-gray-700">性能优化策略包括：</p>
                  <ul className="list-disc pl-4 text-gray-700 space-y-2">
                    <li>使用OPcache</li>
                    <li>优化数据库查询</li>
                    <li>实现缓存机制</li>
                    <li>使用异步处理</li>
                    <li>代码优化</li>
                    <li>使用CDN</li>
                    <li>启用HTTP/2</li>
                    <li>使用Swoole等高性能框架</li>
                  </ul>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">3. 如何处理PHP中的内存泄漏？</h3>
                <div className="space-y-3">
                  <p className="text-gray-700">内存泄漏处理方法：</p>
                  <ul className="list-disc pl-4 text-gray-700 space-y-2">
                    <li>使用内存分析工具</li>
                    <li>及时释放资源</li>
                    <li>避免循环引用</li>
                    <li>使用unset()释放变量</li>
                    <li>监控内存使用</li>
                    <li>优化数据结构</li>
                    <li>使用垃圾回收</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'interview' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">面试题</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">1. 解释PHP的生命周期</h3>
                <div className="space-y-3">
                  <p className="text-gray-700">PHP的生命周期包括：</p>
                  <ul className="list-disc pl-4 text-gray-700 space-y-2">
                    <li>模块初始化</li>
                    <li>请求初始化</li>
                    <li>脚本执行</li>
                    <li>请求关闭</li>
                    <li>模块关闭</li>
                  </ul>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">2. 解释PHP的垃圾回收机制</h3>
                <div className="space-y-3">
                  <p className="text-gray-700">PHP使用引用计数和循环引用检测的垃圾回收机制：</p>
                  <ul className="list-disc pl-4 text-gray-700 space-y-2">
                    <li>每个变量都有引用计数</li>
                    <li>当引用计数为0时，内存被释放</li>
                    <li>使用标记清除算法处理循环引用</li>
                    <li>垃圾回收在特定条件下触发</li>
                  </ul>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">3. 解释PHP的命名空间</h3>
                <div className="space-y-3">
                  <p className="text-gray-700">命名空间的作用：</p>
                  <ul className="list-disc pl-4 text-gray-700 space-y-2">
                    <li>解决命名冲突</li>
                    <li>组织代码结构</li>
                    <li>实现自动加载</li>
                    <li>提高代码可维护性</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'algo' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">算法题</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">1. 实现快速排序</h3>
                <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto text-sm">
{`function quickSort($array) {
    if (count($array) <= 1) {
        return $array;
    }
    
    $pivot = $array[0];
    $left = $right = [];
    
    for ($i = 1; $i < count($array); $i++) {
        if ($array[$i] < $pivot) {
            $left[] = $array[$i];
        } else {
            $right[] = $array[$i];
        }
    }
    
    return array_merge(quickSort($left), [$pivot], quickSort($right));
}`}
                </pre>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">2. 实现二分查找</h3>
                <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto text-sm">
{`function binarySearch($array, $target) {
    $left = 0;
    $right = count($array) - 1;
    
    while ($left <= $right) {
        $mid = floor(($left + $right) / 2);
        
        if ($array[$mid] == $target) {
            return $mid;
        }
        
        if ($array[$mid] < $target) {
            $left = $mid + 1;
        } else {
            $right = $mid - 1;
        }
    }
    
    return -1;
}`}
                </pre>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'system' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">系统设计</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">1. 设计一个高并发的Web应用</h3>
                <div className="space-y-3">
                  <p className="text-gray-700">设计要点：</p>
                  <ul className="list-disc pl-4 text-gray-700 space-y-2">
                    <li>使用负载均衡</li>
                    <li>实现缓存层</li>
                    <li>数据库分片</li>
                    <li>异步处理</li>
                    <li>使用消息队列</li>
                    <li>CDN加速</li>
                    <li>微服务架构</li>
                  </ul>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">2. 设计一个分布式缓存系统</h3>
                <div className="space-y-3">
                  <p className="text-gray-700">设计要点：</p>
                  <ul className="list-disc pl-4 text-gray-700 space-y-2">
                    <li>一致性哈希</li>
                    <li>数据分片</li>
                    <li>复制策略</li>
                    <li>失效处理</li>
                    <li>监控系统</li>
                    <li>故障转移</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'best' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">最佳实践</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">1. 代码规范</h3>
                <div className="space-y-3">
                  <ul className="list-disc pl-4 text-gray-700 space-y-2">
                    <li>遵循PSR标准</li>
                    <li>使用类型声明</li>
                    <li>编写单元测试</li>
                    <li>文档注释</li>
                    <li>代码审查</li>
                    <li>持续集成</li>
                  </ul>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">2. 安全实践</h3>
                <div className="space-y-3">
                  <ul className="list-disc pl-4 text-gray-700 space-y-2">
                    <li>输入验证</li>
                    <li>输出转义</li>
                    <li>使用预处理语句</li>
                    <li>CSRF防护</li>
                    <li>XSS防护</li>
                    <li>密码加密</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'review' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">代码审查</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">1. 代码质量检查点</h3>
                <div className="space-y-3">
                  <ul className="list-disc pl-4 text-gray-700 space-y-2">
                    <li>代码可读性</li>
                    <li>性能问题</li>
                    <li>安全问题</li>
                    <li>错误处理</li>
                    <li>测试覆盖</li>
                    <li>文档完整性</li>
                  </ul>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">2. 常见代码问题</h3>
                <div className="space-y-3">
                  <ul className="list-disc pl-4 text-gray-700 space-y-2">
                    <li>重复代码</li>
                    <li>过长函数</li>
                    <li>复杂条件</li>
                    <li>魔法数字</li>
                    <li>命名不规范</li>
                    <li>注释不足</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'exercise' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">练习</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">1. 算法练习</h3>
                <div className="space-y-3">
                  <ul className="list-disc pl-4 text-gray-700 space-y-2">
                    <li>实现常见排序算法</li>
                    <li>解决动态规划问题</li>
                    <li>实现数据结构</li>
                    <li>解决字符串问题</li>
                  </ul>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">2. 系统设计练习</h3>
                <div className="space-y-3">
                  <ul className="list-disc pl-4 text-gray-700 space-y-2">
                    <li>设计短链接系统</li>
                    <li>设计秒杀系统</li>
                    <li>设计搜索引擎</li>
                    <li>设计即时通讯系统</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => router.push('/study/php/cloud-docker')}
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          上一页：云原生与容器化
        </button>
      </div>
    </div>
  )
} 
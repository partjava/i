'use client';
import { useState } from 'react';

const tabs = [
  { key: 'overview', label: '概述' },
  { key: 'jvm', label: 'JVM调优' },
  { key: 'sql', label: 'SQL优化' },
  { key: 'code', label: '代码优化' },
  { key: 'monitor', label: '监控工具' },
  { key: 'example', label: '实用示例' },
];

export default function JavaEEPerformancePage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 页面大标题 */}
      <h1 className="text-4xl font-bold mb-6">性能调优与监控</h1>

      {/* 下划线风格Tab栏 */}
      <div className="flex border-b mb-6 space-x-8">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-2 text-lg font-medium focus:outline-none transition-colors duration-200
              ${activeTab === tab.key
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-blue-500'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-8">
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">性能调优与监控概述</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">JavaEE性能优化与监控要点</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• JVM参数调优</li>
                <li>• 数据库SQL优化</li>
                <li>• 代码性能提升</li>
                <li>• 实时监控与告警</li>
                <li>• 性能瓶颈定位与排查</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'jvm' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">JVM调优</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">常用JVM参数</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`-Xms512m -Xmx2048m -Xss256k -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=512m
-XX:+PrintGCDetails -XX:+HeapDumpOnOutOfMemoryError
`}
              </pre>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">GC日志分析</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`# 启用GC日志
-XX:+PrintGCDetails -Xloggc:gc.log
`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'sql' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">SQL优化</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">索引与慢查询</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`-- 创建索引
CREATE INDEX idx_user_name ON users(name);

-- 查询慢SQL
SELECT * FROM users WHERE name = 'Tom';
`}
              </pre>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">SQL调优建议</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 避免全表扫描，合理使用索引</li>
                <li>• 使用预编译SQL防止注入</li>
                <li>• 分页、分库分表优化大数据量</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'code' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">代码优化</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">常见优化技巧</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 减少不必要的对象创建</li>
                <li>• 使用StringBuilder拼接字符串</li>
                <li>• 合理使用缓存（如Guava、Redis）</li>
                <li>• 并发优化（线程池、异步处理）</li>
              </ul>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">代码优化示例</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`// 字符串拼接优化
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 100; i++) {
    sb.append(i);
}
String result = sb.toString();
`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'monitor' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">监控工具</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">常用监控工具</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• JVisualVM：JVM监控与分析</li>
                <li>• Prometheus + Grafana：系统与业务监控</li>
                <li>• Spring Boot Actuator：应用健康检查</li>
                <li>• ELK（Elasticsearch、Logstash、Kibana）：日志分析</li>
              </ul>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Spring Boot Actuator配置</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`# application.properties
management.endpoints.web.exposure.include=*
`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'example' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">实用示例</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">JVM监控与GC分析</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`# 启动JVisualVM，连接本地或远程JVM进程
# 分析内存、线程、GC等性能指标
`}
              </pre>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Prometheus监控Spring Boot</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`# 添加依赖
<dependency>
  <groupId>io.micrometer</groupId>
  <artifactId>micrometer-registry-prometheus</artifactId>
</dependency>
# 配置
management.endpoints.web.exposure.include=*
management.metrics.export.prometheus.enabled=true
`}
              </pre>
            </div>
          </div>
        )}
      </div>

      <div className="mt-10 flex justify-between">
        <a href="/study/se/javaee/tools" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← 开发工具与环境
        </a>
        <a
          href="/study/se/javaee/cloud"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          容器化与云服务 →
        </a>
      </div>
    </div>
  );
} 
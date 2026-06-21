'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function IoTDataProcessing() {
  const [activeTab, setActiveTab] = useState('数据采集');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">数据处理</h1>
      
      {/* 标签导航 */}
      <div className="flex space-x-4 mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('数据采集')}
          className={`px-4 py-2 rounded-md ${
            activeTab === '数据采集'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          数据采集
        </button>
        <button
          onClick={() => setActiveTab('数据存储')}
          className={`px-4 py-2 rounded-md ${
            activeTab === '数据存储'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          数据存储
        </button>
        <button
          onClick={() => setActiveTab('数据分析')}
          className={`px-4 py-2 rounded-md ${
            activeTab === '数据分析'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          数据分析
        </button>
        <button
          onClick={() => setActiveTab('数据可视化')}
          className={`px-4 py-2 rounded-md ${
            activeTab === '数据可视化'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          数据可视化
        </button>
      </div>

      {/* 内容区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === '数据采集' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">数据采集</h2>
            
            {/* 传感器数据采集 */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">1. 传感器数据采集</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="mb-2"><strong>采集方式：</strong></p>
                <ul className="list-disc pl-6 mb-2">
                  <li>定时采集：固定时间间隔</li>
                  <li>触发采集：事件触发</li>
                  <li>连续采集：实时数据流</li>
                </ul>
                <p className="mb-2"><strong>数据格式：</strong></p>
                <ul className="list-disc pl-6 mb-2">
                  <li>JSON：轻量级数据交换</li>
                  <li>CSV：表格数据存储</li>
                  <li>二进制：高效传输</li>
                </ul>
                <p className="mb-2"><strong>采集协议：</strong></p>
                <ul className="list-disc pl-6">
                  <li>MQTT：轻量级消息传输</li>
                  <li>CoAP：资源受限设备</li>
                  <li>HTTP/HTTPS：通用协议</li>
                </ul>
              </div>
            </div>

            {/* 数据预处理 */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">2. 数据预处理</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="mb-2"><strong>数据清洗：</strong></p>
                <ul className="list-disc pl-6 mb-2">
                  <li>异常值处理：去除噪声</li>
                  <li>缺失值处理：插值填充</li>
                  <li>数据标准化：统一量纲</li>
                </ul>
                <p className="mb-2"><strong>数据转换：</strong></p>
                <ul className="list-disc pl-6 mb-2">
                  <li>数据格式转换</li>
                  <li>数据编码转换</li>
                  <li>数据压缩</li>
                </ul>
                <p className="mb-2"><strong>数据验证：</strong></p>
                <ul className="list-disc pl-6">
                  <li>数据完整性检查</li>
                  <li>数据一致性验证</li>
                  <li>数据有效性检验</li>
                </ul>
              </div>
            </div>

            {/* 边缘计算 */}
            <div>
              <h3 className="text-xl font-semibold mb-2">3. 边缘计算</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="mb-2"><strong>边缘节点：</strong></p>
                <ul className="list-disc pl-6 mb-2">
                  <li>网关设备：数据汇聚</li>
                  <li>边缘服务器：本地处理</li>
                  <li>智能终端：设备端计算</li>
                </ul>
                <p className="mb-2"><strong>处理方式：</strong></p>
                <ul className="list-disc pl-6 mb-2">
                  <li>数据过滤：去除冗余</li>
                  <li>数据聚合：统计汇总</li>
                  <li>实时分析：快速响应</li>
                </ul>
                <p className="mb-2"><strong>优势：</strong></p>
                <ul className="list-disc pl-6">
                  <li>降低网络负载</li>
                  <li>减少响应延迟</li>
                  <li>提高数据安全性</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === '数据存储' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">数据存储</h2>
            
            {/* 数据库选择 */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">1. 数据库选择</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="mb-2"><strong>关系型数据库：</strong></p>
                <ul className="list-disc pl-6 mb-2">
                  <li>MySQL：通用数据库</li>
                  <li>PostgreSQL：高级特性</li>
                  <li>SQLite：嵌入式数据库</li>
                </ul>
                <p className="mb-2"><strong>时序数据库：</strong></p>
                <ul className="list-disc pl-6 mb-2">
                  <li>InfluxDB：高性能时序</li>
                  <li>TimescaleDB：时序扩展</li>
                  <li>Prometheus：监控数据</li>
                </ul>
                <p className="mb-2"><strong>NoSQL数据库：</strong></p>
                <ul className="list-disc pl-6">
                  <li>MongoDB：文档存储</li>
                  <li>Redis：内存数据库</li>
                  <li>Cassandra：分布式存储</li>
                </ul>
              </div>
            </div>

            {/* 数据存储策略 */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">2. 数据存储策略</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="mb-2"><strong>存储方式：</strong></p>
                <ul className="list-disc pl-6 mb-2">
                  <li>本地存储：设备端数据</li>
                  <li>云端存储：集中管理</li>
                  <li>混合存储：分级存储</li>
                </ul>
                <p className="mb-2"><strong>数据备份：</strong></p>
                <ul className="list-disc pl-6 mb-2">
                  <li>定时备份：定期保存</li>
                  <li>增量备份：变化数据</li>
                  <li>异地备份：容灾恢复</li>
                </ul>
                <p className="mb-2"><strong>数据归档：</strong></p>
                <ul className="list-disc pl-6">
                  <li>冷热数据分离</li>
                  <li>历史数据压缩</li>
                  <li>数据生命周期管理</li>
                </ul>
              </div>
            </div>

            {/* 数据安全 */}
            <div>
              <h3 className="text-xl font-semibold mb-2">3. 数据安全</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="mb-2"><strong>访问控制：</strong></p>
                <ul className="list-disc pl-6 mb-2">
                  <li>身份认证：用户验证</li>
                  <li>权限管理：访问控制</li>
                  <li>审计日志：操作记录</li>
                </ul>
                <p className="mb-2"><strong>数据加密：</strong></p>
                <ul className="list-disc pl-6 mb-2">
                  <li>传输加密：SSL/TLS</li>
                  <li>存储加密：AES加密</li>
                  <li>端到端加密：数据保护</li>
                </ul>
                <p className="mb-2"><strong>安全策略：</strong></p>
                <ul className="list-disc pl-6">
                  <li>数据脱敏：隐私保护</li>
                  <li>安全审计：风险评估</li>
                  <li>应急响应：安全事件处理</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === '数据分析' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">数据分析</h2>
            
            {/* 实时分析 */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">1. 实时分析</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="mb-2"><strong>流处理：</strong></p>
                <ul className="list-disc pl-6 mb-2">
                  <li>Apache Kafka：消息队列</li>
                  <li>Apache Flink：流处理引擎</li>
                  <li>Apache Spark：实时计算</li>
                </ul>
                <p className="mb-2"><strong>分析方式：</strong></p>
                <ul className="list-disc pl-6 mb-2">
                  <li>窗口计算：时间窗口</li>
                  <li>状态管理：状态更新</li>
                  <li>事件处理：模式匹配</li>
                </ul>
                <p className="mb-2"><strong>应用场景：</strong></p>
                <ul className="list-disc pl-6">
                  <li>实时监控：设备状态</li>
                  <li>异常检测：故障预警</li>
                  <li>实时决策：快速响应</li>
                </ul>
              </div>
            </div>

            {/* 离线分析 */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">2. 离线分析</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="mb-2"><strong>批处理：</strong></p>
                <ul className="list-disc pl-6 mb-2">
                  <li>Hadoop：分布式计算</li>
                  <li>Spark：大数据处理</li>
                  <li>Hive：数据仓库</li>
                </ul>
                <p className="mb-2"><strong>分析方法：</strong></p>
                <ul className="list-disc pl-6 mb-2">
                  <li>统计分析：数据统计</li>
                  <li>机器学习：模式识别</li>
                  <li>数据挖掘：知识发现</li>
                </ul>
                <p className="mb-2"><strong>应用场景：</strong></p>
                <ul className="list-disc pl-6">
                  <li>趋势分析：长期变化</li>
                  <li>预测分析：未来趋势</li>
                  <li>优化建议：改进方案</li>
                </ul>
              </div>
            </div>

            {/* 机器学习 */}
            <div>
              <h3 className="text-xl font-semibold mb-2">3. 机器学习</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="mb-2"><strong>算法类型：</strong></p>
                <ul className="list-disc pl-6 mb-2">
                  <li>监督学习：分类预测</li>
                  <li>无监督学习：聚类分析</li>
                  <li>强化学习：决策优化</li>
                </ul>
                <p className="mb-2"><strong>应用场景：</strong></p>
                <ul className="list-disc pl-6 mb-2">
                  <li>异常检测：设备故障</li>
                  <li>预测维护：设备寿命</li>
                  <li>优化控制：系统调节</li>
                </ul>
                <p className="mb-2"><strong>工具框架：</strong></p>
                <ul className="list-disc pl-6">
                  <li>TensorFlow：深度学习</li>
                  <li>PyTorch：灵活开发</li>
                  <li>Scikit-learn：传统算法</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === '数据可视化' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">数据可视化</h2>
            
            {/* 实时监控 */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">1. 实时监控</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="mb-2"><strong>监控面板：</strong></p>
                <ul className="list-disc pl-6 mb-2">
                  <li>仪表盘：关键指标</li>
                  <li>状态图：设备状态</li>
                  <li>趋势图：实时变化</li>
                </ul>
                <p className="mb-2"><strong>告警系统：</strong></p>
                <ul className="list-disc pl-6 mb-2">
                  <li>阈值告警：超限提醒</li>
                  <li>异常告警：异常检测</li>
                  <li>事件告警：重要事件</li>
                </ul>
                <p className="mb-2"><strong>工具选择：</strong></p>
                <ul className="list-disc pl-6">
                  <li>Grafana：监控面板</li>
                  <li>Kibana：日志分析</li>
                  <li>Prometheus：指标监控</li>
                </ul>
              </div>
            </div>

            {/* 报表分析 */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">2. 报表分析</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="mb-2"><strong>报表类型：</strong></p>
                <ul className="list-disc pl-6 mb-2">
                  <li>日报表：日常统计</li>
                  <li>周报表：周度分析</li>
                  <li>月报表：月度总结</li>
                </ul>
                <p className="mb-2"><strong>分析维度：</strong></p>
                <ul className="list-disc pl-6 mb-2">
                  <li>时间维度：趋势分析</li>
                  <li>空间维度：区域分布</li>
                  <li>业务维度：业务指标</li>
                </ul>
                <p className="mb-2"><strong>工具选择：</strong></p>
                <ul className="list-disc pl-6">
                  <li>Tableau：商业智能</li>
                  <li>Power BI：数据分析</li>
                  <li>Metabase：开源BI</li>
                </ul>
              </div>
            </div>

            {/* 交互式分析 */}
            <div>
              <h3 className="text-xl font-semibold mb-2">3. 交互式分析</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="mb-2"><strong>交互方式：</strong></p>
                <ul className="list-disc pl-6 mb-2">
                  <li>数据筛选：条件过滤</li>
                  <li>数据钻取：层级分析</li>
                  <li>数据联动：关联分析</li>
                </ul>
                <p className="mb-2"><strong>可视化类型：</strong></p>
                <ul className="list-disc pl-6 mb-2">
                  <li>地图可视化：地理分布</li>
                  <li>关系图：网络关系</li>
                  <li>热力图：密度分布</li>
                </ul>
                <p className="mb-2"><strong>工具选择：</strong></p>
                <ul className="list-disc pl-6">
                  <li>ECharts：图表库</li>
                  <li>D3.js：数据驱动</li>
                  <li>Plotly：交互式图表</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link
          href="/study/iot/sensors"
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          上一页：传感器技术
        </Link>
        <Link
          href="/study/iot/security"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          下一页：安全防护
        </Link>
      </div>
    </div>
  );
} 
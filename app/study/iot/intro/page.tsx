'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function IoTIntroPage() {
  const [activeTab, setActiveTab] = useState('基础概念')
  const router = useRouter()

  const tabs = [
    '基础概念',
    '技术架构',
    '通信协议',
    '传感器技术',
    '数据处理',
    '安全防护',
    '应用场景',
    '练习'
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">物联网基础</h1>

      {/* 标签导航 */}
      <div className="flex space-x-4 mb-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md ${
              activeTab === tab
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 内容区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === '基础概念' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">物联网基础概念</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">1. 物联网定义</h3>
                <p className="text-gray-700">
                  物联网（Internet of Things，IoT）是指通过信息传感设备，按约定的协议，将任何物体与网络相连接，物体通过信息传播媒介进行信息交换和通信，以实现智能化识别、定位、跟踪、监管等功能。
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">2. 核心特征</h3>
                <p className="text-gray-700">
                  - 全面感知：利用传感器、RFID等技术获取物体信息
                  - 可靠传输：通过各种网络传输数据
                  - 智能处理：利用云计算、大数据等技术处理数据
                  - 自动控制：根据处理结果进行智能决策和控制
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">3. 发展历程</h3>
                <p className="text-gray-700">
                  - 1999年：Kevin Ashton首次提出物联网概念
                  - 2005年：国际电信联盟发布物联网报告
                  - 2009年：IBM提出"智慧地球"概念
                  - 2010年：中国将物联网列为战略性新兴产业
                  - 至今：物联网技术快速发展，应用场景不断扩展
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === '技术架构' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">物联网技术架构</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">1. 感知层</h3>
                <p className="text-gray-700">
                  - 传感器技术
                  - RFID技术
                  - 二维码技术
                  - 摄像头
                  - 智能终端
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">2. 网络层</h3>
                <p className="text-gray-700">
                  - 有线网络
                  - 无线网络
                  - 移动通信网络
                  - 卫星通信
                  - 互联网
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">3. 平台层</h3>
                <p className="text-gray-700">
                  - 云计算平台
                  - 大数据平台
                  - 人工智能平台
                  - 物联网平台
                  - 边缘计算平台
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">4. 应用层</h3>
                <p className="text-gray-700">
                  - 智能家居
                  - 智慧城市
                  - 工业物联网
                  - 农业物联网
                  - 车联网
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === '通信协议' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">物联网通信协议</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">1. 短距离通信协议</h3>
                <p className="text-gray-700">
                  - Bluetooth：低功耗蓝牙（BLE）
                  - WiFi：IEEE 802.11
                  - Zigbee：IEEE 802.15.4
                  - Z-Wave：专有协议
                  - NFC：近场通信
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">2. 长距离通信协议</h3>
                <p className="text-gray-700">
                  - LoRa：远距离低功耗
                  - NB-IoT：窄带物联网
                  - 4G/5G：移动通信
                  - Sigfox：超窄带
                  - LTE-M：低功耗广域网
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">3. 应用层协议</h3>
                <p className="text-gray-700">
                  - MQTT：消息队列遥测传输
                  - CoAP：受限应用协议
                  - HTTP/HTTPS：超文本传输协议
                  - AMQP：高级消息队列协议
                  - DDS：数据分发服务
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === '传感器技术' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">传感器技术</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">1. 常见传感器类型</h3>
                <p className="text-gray-700">
                  - 温度传感器
                  - 湿度传感器
                  - 压力传感器
                  - 光照传感器
                  - 加速度传感器
                  - 陀螺仪
                  - 气体传感器
                  - 声音传感器
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">2. 传感器选型原则</h3>
                <p className="text-gray-700">
                  - 测量范围
                  - 精度要求
                  - 响应时间
                  - 工作环境
                  - 功耗要求
                  - 成本预算
                  - 接口类型
                  - 可靠性
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === '数据处理' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">数据处理</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">1. 数据采集</h3>
                <p className="text-gray-700">
                  - 传感器数据采集
                  - 数据预处理
                  - 数据过滤
                  - 数据压缩
                  - 数据加密
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">2. 数据存储</h3>
                <p className="text-gray-700">
                  - 时序数据库
                  - 关系型数据库
                  - NoSQL数据库
                  - 分布式存储
                  - 数据备份
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">3. 数据分析</h3>
                <p className="text-gray-700">
                  - 实时分析
                  - 离线分析
                  - 机器学习
                  - 预测分析
                  - 异常检测
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === '安全防护' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">安全防护</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">1. 安全威胁</h3>
                <p className="text-gray-700">
                  - 设备安全
                  - 网络安全
                  - 数据安全
                  - 应用安全
                  - 隐私保护
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">2. 防护措施</h3>
                <p className="text-gray-700">
                  - 身份认证
                  - 访问控制
                  - 数据加密
                  - 安全传输
                  - 安全审计
                  - 漏洞管理
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === '应用场景' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">应用场景</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">1. 智能家居</h3>
                <p className="text-gray-700">
                  - 智能照明
                  - 智能安防
                  - 智能家电
                  - 环境监测
                  - 能源管理
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">2. 智慧城市</h3>
                <p className="text-gray-700">
                  - 智能交通
                  - 环境监测
                  - 公共安全
                  - 城市管理
                  - 公共服务
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">3. 工业物联网</h3>
                <p className="text-gray-700">
                  - 设备监控
                  - 生产管理
                  - 质量控制
                  - 能源管理
                  - 预测维护
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === '练习' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">练习</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">1. 基础练习</h3>
                <p className="text-gray-700">
                  - 了解常见的物联网设备
                  - 学习基本的通信协议
                  - 掌握传感器使用方法
                  - 搭建简单的物联网系统
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">2. 进阶练习</h3>
                <p className="text-gray-700">
                  - 设计智能家居系统
                  - 实现数据采集和分析
                  - 开发物联网应用
                  - 解决实际场景问题
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => router.push('/study/php/faq')}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
        >
          上一页：常见问题与面试题
        </button>
        <button
          onClick={() => router.push('/study/iot/communication')}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          下一页：通信技术
        </button>
      </div>
    </div>
  )
} 
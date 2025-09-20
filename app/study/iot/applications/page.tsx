'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function IoTApplications() {
  const [activeTab, setActiveTab] = useState('智能家居');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">应用场景</h1>
      
      {/* 标签导航 */}
      <div className="flex space-x-4 mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('智能家居')}
          className={`px-4 py-2 rounded-md ${
            activeTab === '智能家居'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          智能家居
        </button>
        <button
          onClick={() => setActiveTab('工业物联网')}
          className={`px-4 py-2 rounded-md ${
            activeTab === '工业物联网'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          工业物联网
        </button>
        <button
          onClick={() => setActiveTab('智慧城市')}
          className={`px-4 py-2 rounded-md ${
            activeTab === '智慧城市'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          智慧城市
        </button>
        <button
          onClick={() => setActiveTab('智慧农业')}
          className={`px-4 py-2 rounded-md ${
            activeTab === '智慧农业'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          智慧农业
        </button>
      </div>

      {/* 内容区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === '智能家居' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">智能家居</h2>
            
            {/* 场景概述 */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">1. 场景概述</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="mb-4">
                  智能家居是指通过物联网技术将家庭中的各种设备连接起来，实现智能化控制和管理。它能够提高生活便利性、安全性和舒适度，同时实现能源的智能管理。
                </p>
                <p>
                  主要应用包括：智能照明、智能安防、智能家电、环境监测、能源管理等。通过手机APP或语音助手，用户可以随时随地控制家中的设备，实现远程监控和自动化控制。
                </p>
              </div>
            </div>

            {/* 技术特点 */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">2. 技术特点</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold mb-2">通信技术</h4>
                    <ul className="list-disc pl-6">
                      <li>WiFi：高速数据传输，适合视频监控等大流量应用</li>
                      <li>Zigbee：低功耗，适合传感器网络</li>
                      <li>蓝牙：短距离通信，适合个人设备连接</li>
                      <li>Z-Wave：专为智能家居设计的无线协议</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">控制方式</h4>
                    <ul className="list-disc pl-6">
                      <li>手机APP远程控制</li>
                      <li>语音助手智能控制</li>
                      <li>场景模式自动化控制</li>
                      <li>传感器联动控制</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 应用案例 */}
            <div>
              <h3 className="text-xl font-semibold mb-2">3. 应用案例</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-bold mb-2">智能照明系统</h4>
                    <p className="mb-2">通过智能灯泡和传感器，实现：</p>
                    <ul className="list-disc pl-6">
                      <li>根据环境光线自动调节亮度</li>
                      <li>定时开关和场景模式</li>
                      <li>远程控制和语音控制</li>
                      <li>能耗统计和节能建议</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-bold mb-2">智能安防系统</h4>
                    <p className="mb-2">集成多种安防设备，提供：</p>
                    <ul className="list-disc pl-6">
                      <li>门窗传感器实时监控</li>
                      <li>智能摄像头远程查看</li>
                      <li>烟雾和燃气报警</li>
                      <li>紧急情况自动报警</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === '工业物联网' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">工业物联网</h2>
            
            {/* 场景概述 */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">1. 场景概述</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="mb-4">
                  工业物联网（IIoT）是将物联网技术应用于工业生产领域，实现设备、系统、人员之间的互联互通。它能够提高生产效率、降低运营成本、优化资源配置，是工业4.0的核心技术。
                </p>
                <p>
                  主要应用包括：设备监控、预测性维护、生产过程优化、能源管理、质量控制等。通过实时数据采集和分析，帮助企业实现智能化生产和精细化管理。
                </p>
              </div>
            </div>

            {/* 技术特点 */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">2. 技术特点</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold mb-2">通信技术</h4>
                    <ul className="list-disc pl-6">
                      <li>工业以太网：高速可靠，适合工厂内部网络</li>
                      <li>5G：低延迟，适合移动设备连接</li>
                      <li>LoRa：长距离，适合广域覆盖</li>
                      <li>NB-IoT：低功耗，适合传感器网络</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">数据处理</h4>
                    <ul className="list-disc pl-6">
                      <li>边缘计算：实时数据处理</li>
                      <li>大数据分析：趋势预测</li>
                      <li>人工智能：智能决策</li>
                      <li>数字孪生：虚拟仿真</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 应用案例 */}
            <div>
              <h3 className="text-xl font-semibold mb-2">3. 应用案例</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-bold mb-2">智能工厂</h4>
                    <p className="mb-2">实现生产全流程智能化：</p>
                    <ul className="list-disc pl-6">
                      <li>设备状态实时监控</li>
                      <li>生产过程自动优化</li>
                      <li>产品质量在线检测</li>
                      <li>能源消耗智能管理</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-bold mb-2">预测性维护</h4>
                    <p className="mb-2">基于数据分析的维护方案：</p>
                    <ul className="list-disc pl-6">
                      <li>设备故障预测</li>
                      <li>维护计划优化</li>
                      <li>备件库存管理</li>
                      <li>维护成本降低</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === '智慧城市' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">智慧城市</h2>
            
            {/* 场景概述 */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">1. 场景概述</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="mb-4">
                  智慧城市是利用物联网、大数据、人工智能等技术，实现城市基础设施的智能化管理和服务。它能够提高城市运行效率、改善居民生活质量、促进可持续发展。
                </p>
                <p>
                  主要应用包括：智能交通、环境监测、公共安全、城市管理、便民服务等。通过数据共享和协同管理，打造更加宜居、便捷、安全的城市环境。
                </p>
              </div>
            </div>

            {/* 技术特点 */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">2. 技术特点</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold mb-2">感知层</h4>
                    <ul className="list-disc pl-6">
                      <li>视频监控：城市安全监控</li>
                      <li>环境传感器：空气质量监测</li>
                      <li>交通检测器：车流量统计</li>
                      <li>智能终端：便民服务设备</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">平台层</h4>
                    <ul className="list-disc pl-6">
                      <li>城市大脑：数据分析和决策</li>
                      <li>云计算：资源调度和管理</li>
                      <li>大数据：信息挖掘和应用</li>
                      <li>人工智能：智能预测和优化</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 应用案例 */}
            <div>
              <h3 className="text-xl font-semibold mb-2">3. 应用案例</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-bold mb-2">智能交通系统</h4>
                    <p className="mb-2">实现交通智能化管理：</p>
                    <ul className="list-disc pl-6">
                      <li>交通信号智能控制</li>
                      <li>停车位智能管理</li>
                      <li>公交调度优化</li>
                      <li>交通拥堵预测</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-bold mb-2">环境监测系统</h4>
                    <p className="mb-2">实时监测城市环境：</p>
                    <ul className="list-disc pl-6">
                      <li>空气质量监测</li>
                      <li>噪声污染监控</li>
                      <li>水质监测</li>
                      <li>气象数据采集</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === '智慧农业' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">智慧农业</h2>
            
            {/* 场景概述 */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">1. 场景概述</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="mb-4">
                  智慧农业是利用物联网、大数据、人工智能等技术，实现农业生产全过程的智能化管理。它能够提高农业生产效率、降低资源消耗、改善农产品质量，是现代农业发展的重要方向。
                </p>
                <p>
                  主要应用包括：环境监测、精准灌溉、智能施肥、病虫害防治、农产品溯源等。通过数据分析和智能决策，实现农业生产的精细化管理。
                </p>
              </div>
            </div>

            {/* 技术特点 */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">2. 技术特点</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold mb-2">感知技术</h4>
                    <ul className="list-disc pl-6">
                      <li>土壤传感器：监测土壤温湿度</li>
                      <li>气象站：采集环境数据</li>
                      <li>图像识别：病虫害检测</li>
                      <li>RFID：农产品溯源</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">控制技术</h4>
                    <ul className="list-disc pl-6">
                      <li>自动灌溉系统</li>
                      <li>智能施肥设备</li>
                      <li>环境调控系统</li>
                      <li>无人机作业</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 应用案例 */}
            <div>
              <h3 className="text-xl font-semibold mb-2">3. 应用案例</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-bold mb-2">智能温室</h4>
                    <p className="mb-2">实现温室环境智能控制：</p>
                    <ul className="list-disc pl-6">
                      <li>温湿度自动调节</li>
                      <li>光照强度控制</li>
                      <li>CO2浓度监测</li>
                      <li>水肥一体化管理</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-bold mb-2">精准农业</h4>
                    <p className="mb-2">实现农业生产精准管理：</p>
                    <ul className="list-disc pl-6">
                      <li>土壤养分分析</li>
                      <li>作物生长监测</li>
                      <li>病虫害预警</li>
                      <li>产量预测</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link
          href="/study/iot/security"
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          上一页：安全防护
        </Link>
        <Link
          href="/study/iot/platforms"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          下一页：开发平台
        </Link>
      </div>
    </div>
  );
} 
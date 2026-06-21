'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function IoTSensors() {
  const [activeTab, setActiveTab] = useState('环境传感器');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">传感器技术</h1>
      
      {/* 标签导航 */}
      <div className="flex space-x-4 mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('环境传感器')}
          className={`px-4 py-2 rounded-md ${
            activeTab === '环境传感器'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          环境传感器
        </button>
        <button
          onClick={() => setActiveTab('运动传感器')}
          className={`px-4 py-2 rounded-md ${
            activeTab === '运动传感器'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          运动传感器
        </button>
        <button
          onClick={() => setActiveTab('生物传感器')}
          className={`px-4 py-2 rounded-md ${
            activeTab === '生物传感器'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          生物传感器
        </button>
      </div>

      {/* 内容区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === '环境传感器' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">环境传感器</h2>
            
            {/* 温度传感器 */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">1. 温度传感器</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="mb-2"><strong>工作原理：</strong></p>
                <ul className="list-disc pl-6 mb-2">
                  <li>热敏电阻：电阻值随温度变化</li>
                  <li>热电偶：利用热电效应</li>
                  <li>数字温度传感器：集成ADC转换</li>
                </ul>
                <p className="mb-2"><strong>特点：</strong></p>
                <ul className="list-disc pl-6 mb-2">
                  <li>测量范围：-55℃ ~ 125℃</li>
                  <li>精度：±0.5℃</li>
                  <li>响应时间：毫秒级</li>
                </ul>
                <p className="mb-2"><strong>应用场景：</strong></p>
                <ul className="list-disc pl-6">
                  <li>智能家居：室内温度监测</li>
                  <li>工业控制：设备温度监控</li>
                  <li>农业：温室环境控制</li>
                </ul>
              </div>
            </div>

            {/* 湿度传感器 */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">2. 湿度传感器</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="mb-2"><strong>工作原理：</strong></p>
                <ul className="list-disc pl-6 mb-2">
                  <li>电容式：介电常数随湿度变化</li>
                  <li>电阻式：电阻值随湿度变化</li>
                  <li>光学式：利用湿度对光的影响</li>
                </ul>
                <p className="mb-2"><strong>特点：</strong></p>
                <ul className="list-disc pl-6 mb-2">
                  <li>测量范围：0-100%RH</li>
                  <li>精度：±2%RH</li>
                  <li>响应时间：秒级</li>
                </ul>
                <p className="mb-2"><strong>应用场景：</strong></p>
                <ul className="list-disc pl-6">
                  <li>气象监测：环境湿度测量</li>
                  <li>仓储管理：货物存储环境监控</li>
                  <li>农业：土壤湿度监测</li>
                </ul>
              </div>
            </div>

            {/* 气体传感器 */}
            <div>
              <h3 className="text-xl font-semibold mb-2">3. 气体传感器</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="mb-2"><strong>工作原理：</strong></p>
                <ul className="list-disc pl-6 mb-2">
                  <li>电化学式：气体与电极反应</li>
                  <li>半导体式：气体吸附改变电阻</li>
                  <li>红外式：气体吸收特定波长</li>
                </ul>
                <p className="mb-2"><strong>特点：</strong></p>
                <ul className="list-disc pl-6 mb-2">
                  <li>检测范围：ppm级</li>
                  <li>选择性：针对特定气体</li>
                  <li>寿命：1-3年</li>
                </ul>
                <p className="mb-2"><strong>应用场景：</strong></p>
                <ul className="list-disc pl-6">
                  <li>环境监测：空气质量检测</li>
                  <li>工业安全：有害气体报警</li>
                  <li>智能家居：厨房燃气监测</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === '运动传感器' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">运动传感器</h2>
            
            {/* 加速度传感器 */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">1. 加速度传感器</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="mb-2"><strong>工作原理：</strong></p>
                <ul className="list-disc pl-6 mb-2">
                  <li>MEMS技术：微机械结构</li>
                  <li>压电效应：受力产生电荷</li>
                  <li>电容式：位移改变电容</li>
                </ul>
                <p className="mb-2"><strong>特点：</strong></p>
                <ul className="list-disc pl-6 mb-2">
                  <li>测量范围：±2g ~ ±16g</li>
                  <li>精度：±0.1g</li>
                  <li>采样率：可达1kHz</li>
                </ul>
                <p className="mb-2"><strong>应用场景：</strong></p>
                <ul className="list-disc pl-6">
                  <li>可穿戴设备：运动监测</li>
                  <li>汽车电子：碰撞检测</li>
                  <li>工业设备：振动分析</li>
                </ul>
              </div>
            </div>

            {/* 陀螺仪 */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">2. 陀螺仪</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="mb-2"><strong>工作原理：</strong></p>
                <ul className="list-disc pl-6 mb-2">
                  <li>MEMS技术：科里奥利力</li>
                  <li>光学式：Sagnac效应</li>
                  <li>机械式：角动量守恒</li>
                </ul>
                <p className="mb-2"><strong>特点：</strong></p>
                <ul className="list-disc pl-6 mb-2">
                  <li>测量范围：±2000°/s</li>
                  <li>精度：±0.1°/s</li>
                  <li>零偏稳定性：&lt;0.1°/s</li>
                </ul>
                <p className="mb-2"><strong>应用场景：</strong></p>
                <ul className="list-disc pl-6">
                  <li>无人机：姿态控制</li>
                  <li>VR/AR：头部追踪</li>
                  <li>导航系统：方向感知</li>
                </ul>
              </div>
            </div>

            {/* 磁力计 */}
            <div>
              <h3 className="text-xl font-semib mb-2">3. 磁力计</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="mb-2"><strong>工作原理：</strong></p>
                <ul className="list-disc pl-6 mb-2">
                  <li>霍尔效应：磁场影响电流</li>
                  <li>磁阻效应：磁场改变电阻</li>
                  <li>磁通门：磁场感应</li>
                </ul>
                <p className="mb-2"><strong>特点：</strong></p>
                <ul className="list-disc pl-6 mb-2">
                  <li>测量范围：±8高斯</li>
                  <li>精度：±0.1高斯</li>
                  <li>分辨率：0.1毫高斯</li>
                </ul>
                <p className="mb-2"><strong>应用场景：</strong></p>
                <ul className="list-disc pl-6">
                  <li>电子罗盘：方向指示</li>
                  <li>位置检测：接近开关</li>
                  <li>电流检测：非接触测量</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === '生物传感器' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">生物传感器</h2>
            
            {/* 心率传感器 */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">1. 心率传感器</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="mb-2"><strong>工作原理：</strong></p>
                <ul className="list-disc pl-6 mb-2">
                  <li>光电式：血液流动吸收光</li>
                  <li>ECG：心电信号检测</li>
                  <li>PPG：光电容积脉搏波</li>
                </ul>
                <p className="mb-2"><strong>特点：</strong></p>
                <ul className="list-disc pl-6 mb-2">
                  <li>测量范围：30-250BPM</li>
                  <li>精度：±1BPM</li>
                  <li>采样率：100Hz</li>
                </ul>
                <p className="mb-2"><strong>应用场景：</strong></p>
                <ul className="list-disc pl-6">
                  <li>可穿戴设备：健康监测</li>
                  <li>医疗设备：患者监护</li>
                  <li>运动设备：训练指导</li>
                </ul>
              </div>
            </div>

            {/* 血氧传感器 */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">2. 血氧传感器</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="mb-2"><strong>工作原理：</strong></p>
                <ul className="list-disc pl-6 mb-2">
                  <li>双波长法：红光和红外光</li>
                  <li>反射式：皮肤表面测量</li>
                  <li>透射式：组织穿透测量</li>
                </ul>
                <p className="mb-2"><strong>特点：</strong></p>
                <ul className="list-disc pl-6 mb-2">
                  <li>测量范围：70-100%</li>
                  <li>精度：±2%</li>
                  <li>响应时间：&lt;10秒</li>
                </ul>
                <p className="mb-2"><strong>应用场景：</strong></p>
                <ul className="list-disc pl-6">
                  <li>医疗监护：重症监测</li>
                  <li>运动健康：高原训练</li>
                  <li>睡眠监测：呼吸暂停检测</li>
                </ul>
              </div>
            </div>

            {/* 生物电传感器 */}
            <div>
              <h3 className="text-xl font-semibold mb-2">3. 生物电传感器</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="mb-2"><strong>工作原理：</strong></p>
                <ul className="list-disc pl-6 mb-2">
                  <li>电极检测：生物电信号</li>
                  <li>阻抗测量：组织特性</li>
                  <li>电位测量：神经信号</li>
                </ul>
                <p className="mb-2"><strong>特点：</strong></p>
                <ul className="list-disc pl-6 mb-2">
                  <li>信号范围：μV级</li>
                  <li>带宽：0.5-100Hz</li>
                  <li>共模抑制比：&gt;80dB</li>
                </ul>
                <p className="mb-2"><strong>应用场景：</strong></p>
                <ul className="list-disc pl-6">
                  <li>脑电图：脑电信号检测</li>
                  <li>肌电图：肌肉活动监测</li>
                  <li>心电监护：心脏功能评估</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link
          href="/study/iot/communication"
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          上一页：通信技术
        </Link>
        <Link
          href="/study/iot/data-processing"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          下一页：数据处理
        </Link>
      </div>
    </div>
  );
} 
'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function IoTPlatformsPage() {
  const [activeTab, setActiveTab] = useState('平台介绍');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">物联网开发平台</h1>
      {/* 导航按钮 */}
      <div className="flex space-x-4 mb-8">
        <button onClick={() => setActiveTab('平台介绍')} className={`px-4 py-2 rounded ${activeTab === '平台介绍' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>平台介绍</button>
        <button onClick={() => setActiveTab('功能特点')} className={`px-4 py-2 rounded ${activeTab === '功能特点' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>功能特点</button>
        <button onClick={() => setActiveTab('开发工具')} className={`px-4 py-2 rounded ${activeTab === '开发工具' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>开发工具</button>
        <button onClick={() => setActiveTab('案例展示')} className={`px-4 py-2 rounded ${activeTab === '案例展示' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>案例展示</button>
      </div>

      {/* 平台介绍 */}
      {activeTab === '平台介绍' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">平台架构</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="text-lg font-semibold mb-2">感知层</h3>
                <ul className="list-disc pl-4 space-y-1">
                  <li>支持多种传感器和设备的接入</li>
                  <li>设备管理与远程监控</li>
                  <li>实时数据采集与预处理</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="text-lg font-semibold mb-2">网络层</h3>
                <ul className="list-disc pl-4 space-y-1">
                  <li>多种通信协议支持（如Wi-Fi、以太网、4G/5G、LoRa等）</li>
                  <li>数据安全传输与加密</li>
                  <li>网络状态监控与管理</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="text-lg font-semibold mb-2">应用层</h3>
                <ul className="list-disc pl-4 space-y-1">
                  <li>数据分析与可视化</li>
                  <li>业务逻辑与自动化控制</li>
                  <li>多终端应用接入</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-2">易用性</h3>
              <ul className="list-disc pl-4 space-y-1">
                <li>可视化配置界面，操作简单</li>
                <li>丰富的开发文档和示例</li>
                <li>支持多种开发语言和平台</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-2">可扩展性</h3>
              <ul className="list-disc pl-4 space-y-1">
                <li>模块化设计，便于功能扩展</li>
                <li>插件化架构，支持第三方集成</li>
                <li>灵活的API接口</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-2">安全性</h3>
              <ul className="list-disc pl-4 space-y-1">
                <li>数据加密与安全传输</li>
                <li>多级权限与访问控制</li>
                <li>安全审计与日志管理</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 功能特点 */}
      {activeTab === '功能特点' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">功能架构</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">核心功能</h3>
                <ul className="list-disc pl-4 space-y-1">
                  <li>设备管理：设备注册、配置、监控、固件升级</li>
                  <li>数据管理：数据采集、存储、分析、可视化</li>
                  <li>规则引擎：事件触发、自动化处理</li>
                  <li>告警管理：阈值设置、异常通知</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">扩展功能</h3>
                <ul className="list-disc pl-4 space-y-1">
                  <li>应用开发支持：SDK、API、开发工具</li>
                  <li>系统管理：用户、角色、权限分配</li>
                  <li>运维管理：监控、日志、备份恢复</li>
                  <li>数据分析：报表、统计、预测</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 开发工具 */}
      {activeTab === '开发工具' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">开发工具概述</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="text-lg font-semibold mb-2">SDK</h3>
                <ul className="list-disc pl-4 space-y-1">
                  <li>设备端SDK：便于设备快速接入平台</li>
                  <li>服务端SDK：支持数据处理与业务逻辑开发</li>
                  <li>移动端SDK：实现移动应用与平台互通</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="text-lg font-semibold mb-2">IDE</h3>
                <ul className="list-disc pl-4 space-y-1">
                  <li>代码编辑器：支持多语言开发</li>
                  <li>调试工具：便于问题定位与修复</li>
                  <li>模拟器：测试设备与平台交互</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="text-lg font-semibold mb-2">API</h3>
                <ul className="list-disc pl-4 space-y-1">
                  <li>REST API：标准化接口，便于集成</li>
                  <li>WebSocket：实时数据通信</li>
                  <li>MQTT：轻量级物联网消息协议</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">开发流程</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">1</div>
                <h3 className="font-semibold">需求分析</h3>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">2</div>
                <h3 className="font-semibold">方案设计</h3>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">3</div>
                <h3 className="font-semibold">开发实现</h3>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">4</div>
                <h3 className="font-semibold">测试部署</h3>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 案例展示 */}
      {activeTab === '案例展示' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">案例概述</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="text-lg font-semibold mb-2">智能家居案例</h3>
                <ul className="list-disc pl-4 space-y-1">
                  <li>智能灯光控制：通过手机或语音实现远程开关和调节亮度</li>
                  <li>环境监测系统：实时采集温湿度、空气质量等数据</li>
                  <li>安防监控系统：远程视频监控与报警联动</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="text-lg font-semibold mb-2">工业物联网案例</h3>
                <ul className="list-disc pl-4 space-y-1">
                  <li>设备状态监控：实时采集设备运行数据，异常自动报警</li>
                  <li>生产过程优化：数据驱动生产调度与能耗优化</li>
                  <li>能源管理系统：集中监控与分析工厂能耗</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4">实施效果</h3>
              <ul className="list-disc pl-4 space-y-1">
                <li>系统稳定性提升，故障率降低</li>
                <li>运维效率提高，人工成本下降</li>
                <li>数据驱动决策，提升企业竞争力</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4">用户反馈</h3>
              <ul className="list-disc pl-4 space-y-1">
                <li>操作便捷，界面友好</li>
                <li>功能丰富，满足多样化需求</li>
                <li>服务响应及时，技术支持到位</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 底部导航 */}
      <div className="flex justify-between mt-8">
        <Link href="/study/iot/applications" className="text-blue-500 hover:underline">上一页：应用场景</Link>
        <Link href="/study/iot/projects" className="text-blue-500 hover:underline">下一页：项目实战</Link>
      </div>
    </div>
  );
} 
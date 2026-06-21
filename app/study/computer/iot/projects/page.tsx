import React from 'react';
import Link from 'next/link';

export default function IoTProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">物联网项目实战</h1>

      {/* 项目实战简介 */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-2xl font-bold mb-4">项目实战简介</h2>
        <p className="mb-2">物联网项目实战旨在通过真实案例，帮助学习者掌握物联网系统的完整开发流程和关键技术，提升实际动手能力。</p>
        <p>典型项目包括智能家居、环境监测、工业设备监控、智慧农业等，涵盖从设备接入、数据采集、通信、平台开发到应用实现的全流程。</p>
      </div>

      {/* 常见项目类型与案例 */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-2xl font-bold mb-4">常见项目类型与案例</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>智能家居系统：</strong> 实现远程灯光、空调、安防等设备的智能控制。
          </li>
          <li>
            <strong>环境监测平台：</strong> 采集温湿度、空气质量等数据，支持实时预警和历史分析。
          </li>
          <li>
            <strong>工业设备监控：</strong> 对生产线设备进行状态监控、故障报警和能耗分析。
          </li>
          <li>
            <strong>智慧农业：</strong> 实现温室自动灌溉、环境调控和作物生长数据分析。
          </li>
        </ul>
      </div>

      {/* 项目开发流程与关键技术 */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-2xl font-bold mb-4">项目开发流程与关键技术</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <strong>需求分析：</strong> 明确项目目标、功能需求和应用场景。
          </li>
          <li>
            <strong>方案设计：</strong> 选择合适的传感器、通信方式和平台架构，设计系统流程。
          </li>
          <li>
            <strong>硬件开发与接入：</strong> 设备选型、传感器接线、嵌入式开发（如 Arduino、ESP32 等）。
          </li>
          <li>
            <strong>数据采集与通信：</strong> 采集数据并通过 MQTT、HTTP、LoRa 等协议上传至平台。
          </li>
          <li>
            <strong>平台开发：</strong> 搭建数据接收、存储、分析和可视化的后端平台（如 Node.js、Python、云平台等）。
          </li>
          <li>
            <strong>前端应用开发：</strong> 实现数据展示、设备控制和用户交互（如 Web、App、小程序等）。
          </li>
          <li>
            <strong>测试与部署：</strong> 进行系统联调、功能测试和上线部署。
          </li>
        </ol>
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">关键技术要点：</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>嵌入式开发与传感器数据采集</li>
            <li>无线通信与协议（如 MQTT、CoAP、LoRa 等）</li>
            <li>云平台/本地服务器的数据处理与存储</li>
            <li>数据可视化与前端开发</li>
            <li>系统安全与权限管理</li>
          </ul>
        </div>
      </div>

      {/* 实践建议与资源推荐 */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-2xl font-bold mb-4">实践建议与资源推荐</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>从小型项目入手，逐步扩展功能，积累经验。</li>
          <li>多参考开源项目和社区资源，提升开发效率。</li>
          <li>注重代码规范和文档编写，便于后期维护。</li>
          <li>关注物联网安全，做好数据加密和权限控制。</li>
          <li>推荐平台：ThingsBoard、OneNet、阿里云IoT、腾讯云IoT等。</li>
          <li>开源项目参考：<a href="https://github.com/thingsboard/thingsboard" className="text-blue-500 underline" target="_blank">ThingsBoard</a>、<a href="https://github.com/letscontrolit/ESPEasy" className="text-blue-500 underline" target="_blank">ESPEasy</a></li>
        </ul>
      </div>

      {/* 底部导航 */}
      <div className="flex justify-between mt-8">
        <Link href="/study/iot/platforms" className="text-blue-500 hover:underline">上一页：开发平台</Link>
        <Link href="/study/iot/intro" className="text-blue-500 hover:underline">返回物联网首页</Link>
      </div>
    </div>
  );
} 
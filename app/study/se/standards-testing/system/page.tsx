"use client";
import React, { useState } from "react";
import Link from "next/link";

const tabList = [
  { key: "concept", label: "系统测试概念" },
  { key: "types", label: "系统测试类型" },
  { key: "process", label: "系统测试流程" },
  { key: "compare", label: "与集成测试对比" },
  { key: "example", label: "系统测试示例" },
  { key: "best", label: "最佳实践" }
];

const tabContent: Record<string, { desc: string[]; exampleTitle: string; example: React.ReactNode }> = {
  concept: {
    desc: [
      "系统测试是将整个系统作为一个整体进行的测试，目的是验证系统是否满足需求规格说明书中的要求。",
      "系统测试在集成测试之后进行，确保系统在真实环境中能够正常工作，发现集成测试未能发现的问题。",
      "系统测试涉及功能测试、非功能测试（如性能、安全性、兼容性等）和用户验收测试等方面。",
      "系统测试通常由独立的测试团队执行，以确保测试的客观性。"
    ],
    exampleTitle: "系统测试在软件开发流程中的位置",
    example: (
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <svg width="600" height="250" viewBox="0 0 600 250" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* 背景网格 */}
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f0f0f0" strokeWidth="0.5" />
          </pattern>
          <rect width="600" height="250" fill="url(#grid)" />
          
          {/* 开发阶段 */}
          <rect x="50" y="50" width="100" height="40" fill="#e3f2fd" stroke="#2196f3" strokeWidth="2" rx="4" />
          <text x="100" y="75" textAnchor="middle" fontSize="14" fill="#1e293b">需求分析</text>
          
          <rect x="180" y="50" width="100" height="40" fill="#e3f2fd" stroke="#2196f3" strokeWidth="2" rx="4" />
          <text x="230" y="75" textAnchor="middle" fontSize="14" fill="#1e293b">设计阶段</text>
          
          <rect x="310" y="50" width="100" height="40" fill="#e3f2fd" stroke="#2196f3" strokeWidth="2" rx="4" />
          <text x="360" y="75" textAnchor="middle" fontSize="14" fill="#1e293b">编码阶段</text>
          
          <rect x="440" y="50" width="100" height="40" fill="#e3f2fd" stroke="#2196f3" strokeWidth="2" rx="4" />
          <text x="490" y="75" textAnchor="middle" fontSize="14" fill="#1e293b">部署阶段</text>
          
          {/* 测试阶段 */}
          <rect x="120" y="130" width="100" height="40" fill="#e8f5e9" stroke="#4caf50" strokeWidth="2" rx="4" />
          <text x="170" y="155" textAnchor="middle" fontSize="14" fill="#1e293b">单元测试</text>
          
          <rect x="250" y="130" width="100" height="40" fill="#c8e6c9" stroke="#4caf50" strokeWidth="2" rx="4" />
          <text x="300" y="155" textAnchor="middle" fontSize="14" fill="#1e293b">集成测试</text>
          
          <rect x="380" y="130" width="100" height="40" fill="#a5d6a7" stroke="#4caf50" strokeWidth="2" rx="4" />
          <text x="430" y="155" textAnchor="middle" fontSize="14" fill="#1e293b">系统测试</text>
          
          <rect x="510" y="130" width="100" height="40" fill="#81c784" stroke="#4caf50" strokeWidth="2" rx="4" />
          <text x="560" y="155" textAnchor="middle" fontSize="14" fill="#1e293b">验收测试</text>
          
          {/* 连接线 */}
          <line x1="150" y1="90" x2="170" y2="130" stroke="#90caf9" strokeWidth="2" strokeDasharray="5,3" />
          <line x1="280" y1="90" x2="290" y2="130" stroke="#90caf9" strokeWidth="2" strokeDasharray="5,3" />
          <line x1="410" y1="90" x2="420" y2="130" stroke="#90caf9" strokeWidth="2" strokeDasharray="5,3" />
          
          {/* 箭头标记 */}
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#90caf9" />
            </marker>
          </defs>
          
          {/* 阶段箭头 */}
          <line x1="150" y1="70" x2="180" y2="70" stroke="#2196f3" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <line x1="280" y1="70" x2="310" y2="70" stroke="#2196f3" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <line x1="410" y1="70" x2="440" y2="70" stroke="#2196f3" strokeWidth="2" markerEnd="url(#arrowhead)" />
          
          <line x1="220" y1="150" x2="250" y2="150" stroke="#4caf50" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <line x1="350" y1="150" x2="380" y2="150" stroke="#4caf50" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <line x1="480" y1="150" x2="510" y2="150" stroke="#4caf50" strokeWidth="2" markerEnd="url(#arrowhead)" />
          
          {/* 标题 */}
          <text x="300" y="20" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1e293b">软件开发与测试流程</text>
          
          {/* 图例 */}
          <rect x="50" y="200" width="20" height="10" fill="#e3f2fd" stroke="#2196f3" strokeWidth="2" />
          <text x="80" y="208" fontSize="12" fill="#1e293b">开发阶段</text>
          
          <rect x="180" y="200" width="20" height="10" fill="#e8f5e9" stroke="#4caf50" strokeWidth="2" />
          <text x="210" y="208" fontSize="12" fill="#1e293b">测试阶段</text>
        </svg>
      </div>
    )
  },
  types: {
    desc: [
      "功能测试：验证系统的功能是否符合需求规格，包括输入输出验证、业务逻辑测试等。",
      "性能测试：评估系统在不同负载下的性能，如响应时间、吞吐量、资源利用率等。",
      "安全性测试：检测系统的安全性漏洞，如身份验证、授权、数据加密等。",
      "兼容性测试：检查系统在不同环境（操作系统、浏览器、设备等）下的兼容性。",
      "可靠性测试：测试系统在长时间运行中的稳定性和可靠性，如故障恢复、数据一致性等。",
      "易用性测试：评估系统的用户界面和交互设计，确保用户能够方便地使用系统。"
    ],
    exampleTitle: "系统测试类型示例",
    example: (
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <svg width="600" height="300" viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* 背景网格 */}
          <pattern id="grid-light" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f8f8f8" strokeWidth="0.5" />
          </pattern>
          <rect width="600" height="300" fill="url(#grid-light)" />
          
          {/* 功能测试部分 */}
          <rect x="50" y="50" width="180" height="80" fill="#e8f5e9" stroke="#4caf50" strokeWidth="2" rx="8" />
          <text x="140" y="90" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#2e7d32">功能测试</text>
          <rect x="80" y="120" width="120" height="40" fill="#f0f9e8" stroke="#4caf50" strokeWidth="1" rx="4" />
          <text x="140" y="140" textAnchor="middle" fontSize="12" fill="#1e293b">登录功能</text>
          <rect x="80" y="170" width="120" height="40" fill="#f0f9e8" stroke="#4caf50" strokeWidth="1" rx="4" />
          <text x="140" y="190" textAnchor="middle" fontSize="12" fill="#1e293b">数据提交功能</text>
          
          {/* 性能测试部分 */}
          <rect x="250" y="50" width="180" height="80" fill="#bbdefb" stroke="#2196f3" strokeWidth="2" rx="8" />
          <text x="340" y="90" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0d47a1">性能测试</text>
          <rect x="280" y="120" width="120" height="40" fill="#e3f2fd" stroke="#2196f3" strokeWidth="1" rx="4" />
          <text x="340" y="140" textAnchor="middle" fontSize="12" fill="#1e293b">响应时间测试</text>
          <rect x="280" y="170" width="120" height="40" fill="#e3f2fd" stroke="#2196f3" strokeWidth="1" rx="4" />
          <text x="340" y="190" textAnchor="middle" fontSize="12" fill="#1e293b">吞吐量测试</text>
          
          {/* 安全性测试部分 */}
          <rect x="450" y="50" width="180" height="80" fill="#f0f4fd" stroke="#60a5fa" strokeWidth="2" rx="8" />
          <text x="540" y="90" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1e64c8">安全性测试</text>
          <rect x="480" y="120" width="120" height="40" fill="#e0e7ff" stroke="#60a5fa" strokeWidth="1" rx="4" />
          <text x="540" y="140" textAnchor="middle" fontSize="12" fill="#1e293b">身份验证测试</text>
          <rect x="480" y="170" width="120" height="40" fill="#e0e7ff" stroke="#60a5fa" strokeWidth="1" rx="4" />
          <text x="540" y="190" textAnchor="middle" fontSize="12" fill="#1e293b">数据加密测试</text>
          
          {/* 兼容性测试部分 */}
          <rect x="50" y="200" width="180" height="80" fill="#f5f3ff" stroke="#8e54e9" strokeWidth="2" rx="8" />
          <text x="140" y="240" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#4c288a">兼容性测试</text>
          <rect x="80" y="270" width="120" height="40" fill="#ede9fe" stroke="#8e54e9" strokeWidth="1" rx="4" />
          <text x="140" y="290" textAnchor="middle" fontSize="12" fill="#1e293b">不同浏览器测试</text>
          <rect x="80" y="230" width="120" height="40" fill="#ede9fe" stroke="#8e54e9" strokeWidth="1" rx="4" />
          <text x="140" y="250" textAnchor="middle" fontSize="12" fill="#1e293b">不同操作系统测试</text>
          
          {/* 可靠性测试部分 */}
          <rect x="250" y="200" width="180" height="80" fill="#fae2e8" stroke="#f472b6" strokeWidth="2" rx="8" />
          <text x="340" y="240" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#c026d3">可靠性测试</text>
          <rect x="280" y="230" width="120" height="40" fill="#fce7f3" stroke="#f472b6" strokeWidth="1" rx="4" />
          <text x="340" y="250" textAnchor="middle" fontSize="12" fill="#1e293b">故障恢复测试</text>
          <rect x="280" y="270" width="120" height="40" fill="#fce7f3" stroke="#f472b6" strokeWidth="1" rx="4" />
          <text x="340" y="290" textAnchor="middle" fontSize="12" fill="#1e293b">数据一致性测试</text>
          
          {/* 易用性测试部分 */}
          <rect x="450" y="200" width="180" height="80" fill="#fef0c7" stroke="#fbbf24" strokeWidth="2" rx="8" />
          <text x="540" y="240" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#d97706">易用性测试</text>
          <rect x="480" y="230" width="120" height="40" fill="#fef9c3" stroke="#fbbf24" strokeWidth="1" rx="4" />
          <text x="540" y="250" textAnchor="middle" fontSize="12" fill="#1e293b">界面友好性测试</text>
          <rect x="480" y="270" width="120" height="40" fill="#fef9c3" stroke="#fbbf24" strokeWidth="1" rx="4" />
          <text x="540" y="290" textAnchor="middle" fontSize="12" fill="#1e293b">操作便捷性测试</text>
          
          {/* 标题 */}
          <text x="300" y="30" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1e293b">系统测试类型分类</text>
        </svg>
      </div>
    )
  },
  process: {
    desc: [
      "测试计划：定义测试范围、测试方法、测试资源和测试进度安排。",
      "测试设计：基于需求规格说明书设计测试用例，确定测试数据和预期结果。",
      "测试环境准备：搭建与生产环境相似的测试环境，包括硬件、软件和网络配置。",
      "测试执行：按照测试计划和测试用例执行测试，记录测试结果。",
      "缺陷管理：发现缺陷后，记录、跟踪和管理缺陷，直到问题解决。",
      "测试评估：分析测试结果，评估系统质量，决定是否可以进入下一阶段。",
      "测试报告：生成测试报告，总结测试过程和结果，提供给相关人员。"
    ],
    exampleTitle: "系统测试流程",
    example: (
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <svg width="600" height="350" viewBox="0 0 600 350" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* 背景 */}
          <rect width="600" height="350" rx="4" fill="#f8fafc" />
          
          {/* 流程步骤 */}
          <rect x="50" y="50" width="100" height="60" rx="4" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" />
          <text x="100" y="85" textAnchor="middle" fontSize="14" fill="#1e293b">测试计划</text>
          
          <rect x="200" y="50" width="100" height="60" rx="4" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" />
          <text x="250" y="85" textAnchor="middle" fontSize="14" fill="#1e293b">测试设计</text>
          
          <rect x="350" y="50" width="100" height="60" rx="4" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" />
          <text x="400" y="85" textAnchor="middle" fontSize="14" fill="#1e293b">环境准备</text>
          
          <rect x="500" y="50" width="100" height="60" rx="4" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" />
          <text x="550" y="85" textAnchor="middle" fontSize="14" fill="#1e293b">测试执行</text>
          
          <rect x="350" y="160" width="100" height="60" rx="4" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" />
          <text x="400" y="195" textAnchor="middle" fontSize="14" fill="#1e293b">缺陷管理</text>
          
          <rect x="200" y="160" width="100" height="60" rx="4" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" />
          <text x="250" y="195" textAnchor="middle" fontSize="14" fill="#1e293b">测试评估</text>
          
          <rect x="50" y="160" width="100" height="60" rx="4" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" />
          <text x="100" y="195" textAnchor="middle" fontSize="14" fill="#1e293b">测试报告</text>
          
          {/* 决策点 */}
          <polygon points="350,270 400,250 450,270 400,290" fill="#f8fafc" stroke="#3b82f6" strokeWidth="2" />
          <text x="400" y="275" textAnchor="middle" fontSize="14" fill="#1e293b">是否通过?</text>
          
          {/* 通过 */}
          <rect x="500" y="250" width="100" height="60" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
          <text x="550" y="285" textAnchor="middle" fontSize="14" fill="#166534">进入下一阶段</text>
          
          {/* 不通过 */}
          <rect x="50" y="250" width="100" height="60" rx="4" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
          <text x="100" y="285" textAnchor="middle" fontSize="14" fill="#b91c1c">重新测试</text>
          
          {/* 箭头 */}
          <defs>
            <marker id="arrowhead-blue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
            </marker>
            <marker id="arrowhead-green" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#16a34a" />
            </marker>
            <marker id="arrowhead-red" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
            </marker>
          </defs>
          
          {/* 水平箭头 */}
          <line x1="150" y1="80" x2="200" y2="80" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead-blue)" />
          <line x1="300" y1="80" x2="350" y2="80" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead-blue)" />
          <line x1="450" y1="80" x2="500" y2="80" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead-blue)" />
          
          {/* 垂直箭头 */}
          <line x1="500" y1="110" x2="500" y2="160" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead-blue)" />
          <line x1="400" y1="110" x2="400" y2="160" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead-blue)" />
          <line x1="300" y1="110" x2="300" y2="160" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead-blue)" />
          <line x1="200" y1="110" x2="200" y2="160" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead-blue)" />
          
          {/* 决策箭头 */}
          <line x1="400" y1="290" x2="400" y2="310" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead-blue)" />
          <line x1="400" y1="310" x2="50" y2="310" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead-blue)" />
          <line x1="400" y1="310" x2="550" y2="310" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead-blue)" />
          
          <line x1="50" y1="310" x2="50" y2="250" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowhead-red)" />
          <line x1="550" y1="310" x2="550" y2="250" stroke="#16a34a" strokeWidth="2" markerEnd="url(#arrowhead-green)" />
          
          {/* 循环箭头 */}
          <path d="M100,160 A40,40 0 0,0 100,50" fill="none" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead-blue)" />
          
          {/* 标题 */}
          <text x="300" y="30" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1e293b">系统测试流程</text>
          
          {/* 图例 */}
          <rect x="50" y="320" width="20" height="10" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" />
          <text x="80" y="328" fontSize="12" fill="#1e293b">测试阶段</text>
          
          <rect x="180" y="320" width="20" height="10" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
          <text x="210" y="328" fontSize="12" fill="#1e293b">通过</text>
          
          <rect x="310" y="320" width="20" height="10" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
          <text x="340" y="328" fontSize="12" fill="#1e293b">不通过</text>
        </svg>
      </div>
    )
  },
  compare: {
    desc: [
      "系统测试关注整个系统的行为和性能，而集成测试关注组件之间的交互。",
      "系统测试通常在集成测试之后进行，验证系统是否满足用户需求。",
      "系统测试的范围更广，包括功能测试和非功能测试，而集成测试主要关注功能方面。",
      "系统测试通常由独立的测试团队执行，而集成测试可能由开发团队或测试团队执行。",
      "系统测试使用的测试环境更接近生产环境，而集成测试可能使用简化的测试环境。"
    ],
    exampleTitle: "系统测试与集成测试对比",
    example: (
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3 text-gray-800">对比维度</h4>
            <ul className="space-y-3">
              <li className="font-medium text-gray-800">测试目标</li>
              <li className="font-medium text-gray-800">测试范围</li>
              <li className="font-medium text-gray-800">测试对象</li>
              <li className="font-medium text-gray-800">测试环境</li>
              <li className="font-medium text-gray-800">测试人员</li>
              <li className="font-medium text-gray-800">测试依据</li>
              <li className="font-medium text-gray-800">测试重点</li>
              <li className="font-medium text-gray-800">测试阶段</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-gray-800">对比结果</h4>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-blue-50 p-2 rounded text-center">系统测试</div>
                <div className="bg-green-50 p-2 rounded text-center">集成测试</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-blue-50 p-2 rounded">验证整个系统是否满足需求</div>
                <div className="bg-green-50 p-2 rounded">验证组件之间的交互是否正常</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-blue-50 p-2 rounded">整个系统</div>
                <div className="bg-green-50 p-2 rounded">一组相互依赖的组件</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-blue-50 p-2 rounded">接近生产环境</div>
                <div className="bg-green-50 p-2 rounded">简化的测试环境</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-blue-50 p-2 rounded">独立测试团队</div>
                <div className="bg-green-50 p-2 rounded">开发团队或测试团队</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-blue-50 p-2 rounded">需求规格说明书</div>
                <div className="bg-green-50 p-2 rounded">设计文档和接口规范</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-blue-50 p-2 rounded">功能和非功能需求</div>
                <div className="bg-green-50 p-2 rounded">组件间接口和数据流</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-blue-50 p-2 rounded">集成测试之后</div>
                <div className="bg-green-50 p-2 rounded">单元测试之后</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 对比雷达图 */}
        <div className="mt-6">
          <h4 className="font-semibold mb-3 text-gray-800">测试特性对比雷达图</h4>
          <svg width="500" height="300" viewBox="0 0 500 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* 背景 */}
            <rect width="500" height="300" rx="4" fill="#f8fafc" />
            
            {/* 雷达图网格 */}
            <g transform="translate(250, 150)">
              {/* 圆形网格 */}
              <circle cx="0" cy="0" r="100" fill="none" stroke="#e2e8f0" strokeWidth="1" />
              <circle cx="0" cy="0" r="80" fill="none" stroke="#e2e8f0" strokeWidth="1" />
              <circle cx="0" cy="0" r="60" fill="none" stroke="#e2e8f0" strokeWidth="1" />
              <circle cx="0" cy="0" r="40" fill="none" stroke="#e2e8f0" strokeWidth="1" />
              <circle cx="0" cy="0" r="20" fill="none" stroke="#e2e8f0" strokeWidth="1" />
              
              {/* 坐标轴 */}
              <line x1="0" y1="0" x2="0" y2="-100" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="0" y1="0" x2="70.7" y2="-70.7" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="0" y1="0" x2="100" y2="0" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="0" y1="0" x2="70.7" y2="70.7" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="0" y1="0" x2="0" y2="100" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="0" y1="0" x2="-70.7" y2="70.7" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="0" y1="0" x2="-100" y2="0" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="0" y1="0" x2="-70.7" y2="-70.7" stroke="#cbd5e1" strokeWidth="1" />
              
              {/* 标签 */}
              <text x="0" y="-110" textAnchor="middle" fontSize="10" fill="#475569">系统完整性</text>
              <text x="80" y="-80" textAnchor="middle" fontSize="10" fill="#475569">用户体验</text>
              <text x="110" y="0" textAnchor="middle" fontSize="10" fill="#475569">性能测试</text>
              <text x="80" y="80" textAnchor="middle" fontSize="10" fill="#475569">组件交互</text>
              <text x="0" y="110" textAnchor="middle" fontSize="10" fill="#475569">接口测试</text>
              <text x="-80" y="80" textAnchor="middle" fontSize="10" fill="#475569">功能覆盖</text>
              <text x="-110" y="0" textAnchor="middle" fontSize="10" fill="#475569">测试效率</text>
              <text x="-80" y="-80" textAnchor="middle" fontSize="10" fill="#475569">测试深度</text>
              
              {/* 系统测试数据 */}
              <polygon points="0,-90 70,-60 90,0 40,60 0,70 -60,50 -70,0 -60,-50" fill="rgba(33, 150, 243, 0.2)" stroke="#2196f3" strokeWidth="2" />
              <circle cx="0" cy="-90" r="3" fill="#2196f3" />
              <circle cx="70" cy="-60" r="3" fill="#2196f3" />
              <circle cx="90" cy="0" r="3" fill="#2196f3" />
              <circle cx="40" cy="60" r="3" fill="#2196f3" />
              <circle cx="0" cy="70" r="3" fill="#2196f3" />
              <circle cx="-60" cy="50" r="3" fill="#2196f3" />
              <circle cx="-70" cy="0" r="3" fill="#2196f3" />
              <circle cx="-60" cy="-50" r="3" fill="#2196f3" />
              
              {/* 集成测试数据 */}
              <polygon points="0,-60 40,-40 60,0 80,80 50,70 -30,30 -40,0 -40,-40" fill="rgba(76, 175, 80, 0.2)" stroke="#4caf50" strokeWidth="2" />
              <circle cx="0" cy="-60" r="3" fill="#4caf50" />
              <circle cx="40" cy="-40" r="3" fill="#4caf50" />
              <circle cx="60" cy="0" r="3" fill="#4caf50" />
              <circle cx="80" cy="80" r="3" fill="#4caf50" />
              <circle cx="50" cy="70" r="3" fill="#4caf50" />
              <circle cx="-30" cy="30" r="3" fill="#4caf50" />
              <circle cx="-40" cy="0" r="3" fill="#4caf50" />
              <circle cx="-40" cy="-40" r="3" fill="#4caf50" />
              
              {/* 图例 */}
              <circle cx="380" cy="20" r="5" fill="#2196f3" />
              <text x="400" y="24" fontSize="10" fill="#475569">系统测试</text>
              
              <circle cx="380" cy="40" r="5" fill="#4caf50" />
              <text x="400" y="44" fontSize="10" fill="#475569">集成测试</text>
            </g>
          </svg>
        </div>
      </div>
    )
  },
  example: {
    desc: [
      "系统测试示例展示了如何测试整个系统的功能和性能，确保系统满足用户需求。",
      "示例包括测试计划、测试用例设计、测试执行和测试报告等方面。",
      "系统测试通常使用与生产环境相似的测试环境，使用真实数据或代表性测试数据。",
      "测试结果应记录详细，包括测试通过或失败的原因，以便开发团队修复问题。"
    ],
    exampleTitle: "系统测试完整示例",
    example: (
      <div className="space-y-6">
        {/* 测试计划示例 */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h4 className="font-semibold mb-2 text-gray-800">测试计划示例</h4>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg border border-gray-200 text-sm">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="p-3 text-left font-medium">测试计划项</th>
                  <th className="p-3 text-left font-medium">详情</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-medium">测试目标</td>
                  <td className="p-3">验证在线购物系统在各种场景下的功能和性能是否满足需求规格说明书</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-medium">测试范围</td>
                  <td className="p-3">用户注册/登录、商品浏览/搜索、购物车、订单管理、支付流程、用户评价</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-medium">测试方法</td>
                  <td className="p-3">黑盒测试、功能测试、性能测试、安全性测试、兼容性测试</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-medium">测试环境</td>
                  <td className="p-3">
                    <div>服务器: AWS EC2 (t3.xlarge)</div>
                    <div>数据库: MySQL 8.0</div>
                    <div>Web服务器: Nginx</div>
                    <div>浏览器: Chrome最新版、Firefox最新版、Safari最新版</div>
                    <div>操作系统: Windows 10、macOS Monterey、Ubuntu 20.04</div>
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-medium">测试进度</td>
                  <td className="p-3">
                    <div>测试准备: 2025-05-10至2025-05-12</div>
                    <div>功能测试: 2025-05-13至2025-05-20</div>
                    <div>性能测试: 2025-05-21至2025-05-25</div>
                    <div>安全性测试: 2025-05-26至2025-05-28</div>
                    <div>兼容性测试: 2025-05-29至2025-05-31</div>
                    <div>测试报告: 2025-06-01至2025-06-03</div>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">测试资源</td>
                  <td className="p-3">
                    <div>测试人员: 5名</div>
                    <div>测试工具: Selenium、JMeter、OWASP ZAP、Postman</div>
                    <div>测试数据: 1000个用户账户、5000个商品信息、10000个历史订单</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* 测试用例示例 */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h4 className="font-semibold mb-2 text-gray-800">测试用例示例</h4>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg border border-gray-200 text-sm">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="p-3 text-left font-medium">测试用例ID</th>
                  <th className="p-3 text-left font-medium">测试用例名称</th>
                  <th className="p-3 text-left font-medium">测试步骤</th>
                  <th className="p-3 text-left font-medium">预期结果</th>
                  <th className="p-3 text-left font-medium">实际结果</th>
                  <th className="p-3 text-left font-medium">测试状态</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-medium">TC-001</td>
                  <td className="p-3">用户注册功能测试</td>
                  <td className="p-3">
                    <div>1. 访问注册页面</div>
                    <div>2. 输入有效的用户名、密码和邮箱</div>
                    <div>3. 点击注册按钮</div>
                  </td>
                  <td className="p-3">
                    <div>1. 成功跳转到登录页面</div>
                    <div>2. 系统发送验证邮件</div>
                    <div>3. 用户信息成功保存到数据库</div>
                  </td>
                  <td className="p-3">
                    <div>1. 成功跳转到登录页面</div>
                    <div>2. 验证邮件已发送</div>
                    <div>3. 用户信息已保存</div>
                  </td>
                  <td className="p-3 text-green-600">通过</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-medium">TC-002</td>
                  <td className="p-3">商品搜索功能测试</td>
                  <td className="p-3">
                    <div>1. 登录系统</div>
                    <div>2. 在搜索框中输入"手机"</div>
                    <div>3. 点击搜索按钮</div>
                  </td>
                  <td className="p-3">
                    <div>1. 显示搜索结果页面</div>
                    <div>2. 搜索结果包含"手机"相关商品</div>
                    <div>3. 显示正确的商品数量</div>
                  </td>
                  <td className="p-3">
                    <div>1. 成功显示搜索结果页面</div>
                    <div>2. 搜索结果包含手机商品</div>
                    <div>3. 显示商品数量正确</div>
                  </td>
                  <td className="p-3 text-green-600">通过</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-medium">TC-003</td>
                  <td className="p-3">购物车功能测试</td>
                  <td className="p-3">
                    <div>1. 登录系统</div>
                    <div>2. 浏览商品并添加到购物车</div>
                    <div>3. 访问购物车页面</div>
                    <div>4. 修改商品数量</div>
                    <div>5. 删除商品</div>
                  </td>
                  <td className="p-3">
                    <div>1. 商品成功添加到购物车</div>
                    <div>2. 购物车页面显示正确的商品信息</div>
                    <div>3. 商品数量修改成功</div>
                    <div>4. 商品删除成功</div>
                  </td>
                  <td className="p-3">
                    <div>1. 商品添加成功</div>
                    <div>2. 购物车显示正确</div>
                    <div>3. 商品数量修改成功</div>
                    <div>4. 删除商品时系统崩溃</div>
                  </td>
                  <td className="p-3 text-red-600">失败</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">TC-004</td>
                  <td className="p-3">支付流程测试</td>
                  <td className="p-3">
                    <div>1. 登录系统</div>
                    <div>2. 添加商品到购物车</div>
                    <div>3. 结算购物车</div>
                    <div>4. 选择支付方式</div>
                    <div>5. 完成支付</div>
                  </td>
                  <td className="p-3">
                    <div>1. 结算页面显示正确的订单信息</div>
                    <div>2. 支付方式选择成功</div>
                    <div>3. 支付成功后跳转到订单确认页面</div>
                    <div>4. 订单状态更新为"已支付"</div>
                    <div>5. 库存数量相应减少</div>
                  </td>
                  <td className="p-3">
                    <div>1. 结算页面显示正确</div>
                    <div>2. 支付方式选择成功</div>
                    <div>3. 支付成功后跳转正确</div>
                    <div>4. 订单状态更新成功</div>
                    <div>5. 库存数量减少正确</div>
                  </td>
                  <td className="p-3 text-green-600">通过</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* 测试结果图表 */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h4 className="font-semibold mb-2 text-gray-800">测试结果统计</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-gray-700 mb-2">测试类型分布</h5>
              <svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="150" cy="100" r="80" fill="#f0f0f0" />
                <path d="M150,20 A80,80 0 0,1 150,180 L150,100 Z" fill="#3b82f6" />
                <path d="M150,180 A80,80 0 0,1 290,100 L150,100 Z" fill="#16a34a" />
                <path d="M290,100 A80,80 0 0,1 150,20 L150,100 Z" fill="#f97316" />
                
                <text x="150" y="70" textAnchor="middle" fontSize="14" fill="white">功能测试</text>
                <text x="220" y="120" textAnchor="middle" fontSize="14" fill="white">性能测试</text>
                <text x="80" y="120" textAnchor="middle" fontSize="14" fill="white">安全测试</text>
                
                <text x="150" y="190" textAnchor="middle" fontSize="12" fill="#64748b">测试类型分布</text>
              </svg>
            </div>
            <div>
              <h5 className="font-medium text-gray-700 mb-2">测试结果分布</h5>
              <svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="50" y="100" width="40" height="80" fill="#16a34a" rx="2" />
                <text x="70" y="95" textAnchor="middle" fontSize="12" fill="#1e293b">通过</text>
                <text x="70" y="60" textAnchor="middle" fontSize="14" fill="#1e293b">75%</text>
                
                <rect x="120" y="120" width="40" height="60" fill="#f97316" rx="2" />
                <text x="140" y="115" textAnchor="middle" fontSize="12" fill="#1e293b">失败</text>
                <text x="140" y="90" textAnchor="middle" fontSize="14" fill="#1e293b">15%</text>
                
                <rect x="190" y="140" width="40" height="40" fill="#64748b" rx="2" />
                <text x="210" y="135" textAnchor="middle" fontSize="12" fill="#1e293b">阻塞</text>
                <text x="210" y="110" textAnchor="middle" fontSize="14" fill="#1e293b">10%</text>
                
                <text x="150" y="190" textAnchor="middle" fontSize="12" fill="#64748b">测试结果分布</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    )
  },
  best: {
    desc: [
      "从用户角度设计测试用例，确保系统满足用户需求和期望。",
      "建立全面的测试覆盖，包括功能测试、性能测试、安全性测试等多个方面。",
      "使用真实数据或代表性测试数据，确保测试结果反映实际情况。",
      "自动化可重复的测试用例，提高测试效率和一致性。",
      "建立明确的缺陷管理流程，确保发现的问题得到及时解决。",
      "与开发团队密切合作，理解系统架构和设计，更好地设计测试用例。",
      "定期审查和更新测试用例，随着系统的演进保持测试的有效性。",
      "记录详细的测试结果和测试环境信息，便于问题排查和结果验证。"
    ],
    exampleTitle: "系统测试最佳实践",
    example: (
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 测试计划和设计 */}
          <div>
            <h4 className="font-semibold mb-3 text-gray-800">测试计划和设计</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">基于需求规格说明书制定详细的测试计划</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">设计测试用例时考虑各种场景，包括正常情况、边界条件和异常情况</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">使用测试用例管理工具组织和跟踪测试用例</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">建立测试数据管理策略，确保测试数据的一致性和可重复性</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-exclamation-circle text-yellow-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">考虑使用测试自动化框架来执行重复性测试</span>
              </li>
            </ul>
            
            <h4 className="font-semibold mt-6 mb-3 text-gray-800">测试执行和报告</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">按照测试计划和测试用例执行测试，记录详细的测试结果</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">发现缺陷后，使用缺陷管理工具记录和跟踪缺陷</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">定期生成测试报告，向相关人员汇报测试进度和结果</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-exclamation-circle text-yellow-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">分析测试结果，识别潜在的质量问题和风险</span>
              </li>
            </ul>
          </div>
          
          {/* 测试环境和工具 */}
          <div>
            <h4 className="font-semibold mb-3 text-gray-800">测试环境和工具</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">建立与生产环境相似的测试环境，确保测试结果的可靠性</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">使用适当的测试工具来提高测试效率，如自动化测试工具、性能测试工具等</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">定期维护和更新测试环境和测试工具</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-exclamation-circle text-yellow-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">考虑使用容器化技术（如Docker）管理测试环境</span>
              </li>
            </ul>
            
            <h4 className="font-semibold mt-6 mb-3 text-gray-800">团队协作和沟通</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">与开发团队保持密切沟通，及时解决测试中发现的问题</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">参与需求评审和设计评审，确保测试工作的可执行性</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">向项目团队和管理层定期汇报测试进展和质量状况</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-exclamation-circle text-yellow-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">建立跨团队的协作机制，共同解决系统集成和测试中的挑战</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* 系统测试成熟度模型 */}
        <div className="mt-6">
          <h4 className="font-semibold mb-3 text-gray-800">系统测试成熟度模型</h4>
          <svg width="600" height="250" viewBox="0 0 600 250" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* 背景 */}
            <rect width="600" height="250" rx="4" fill="#f8fafc" />
            
            {/* 成熟度级别 */}
            <rect x="50" y="150" width="100" height="80" rx="4" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
            <text x="100" y="180" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#b91c1c">初始级</text>
            <text x="100" y="205" textAnchor="middle" fontSize="12" fill="#1e293b">无结构化测试</text>
            
            <rect x="180" y="120" width="100" height="110" rx="4" fill="#fecaca" stroke="#ef4444" strokeWidth="2" />
            <text x="230" y="150" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#b91c1c">基本级</text>
            <text x="230" y="175" textAnchor="middle" fontSize="12" fill="#1e293b">临时测试计划</text>
            <text x="230" y="200" textAnchor="middle" fontSize="12" fill="#1e293b">手工测试为主</text>
            
            <rect x="310" y="90" width="100" height="140" rx="4" fill="#fed7aa" stroke="#f97316" strokeWidth="2" />
            <text x="360" y="120" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#c2410c">定义级</text>
            <text x="360" y="145" textAnchor="middle" fontSize="12" fill="#1e293b">标准化测试流程</text>
            <text x="360" y="170" textAnchor="middle" fontSize="12" fill="#1e293b">测试用例管理</text>
            <text x="360" y="195" textAnchor="middle" fontSize="12" fill="#1e293b">部分自动化</text>
            
            <rect x="440" y="60" width="100" height="170" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
            <text x="490" y="90" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#166534">管理级</text>
            <text x="490" y="115" textAnchor="middle" fontSize="12" fill="#1e293b">全面测试覆盖</text>
            <text x="490" y="140" textAnchor="middle" fontSize="12" fill="#1e293b">测试过程监控</text>
            <text x="490" y="165" textAnchor="middle" fontSize="12" fill="#1e293b">测试度量分析</text>
            <text x="490" y="190" textAnchor="middle" fontSize="12" fill="#1e293b">持续改进</text>
            
            {/* 标题 */}
            <text x="300" y="30" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1e293b">系统测试成熟度模型</text>
            
            {/* 图例 */}
            <rect x="50" y="230" width="20" height="10" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
            <text x="80" y="238" fontSize="12" fill="#1e293b">低成熟度</text>
            
            <rect x="180" y="230" width="20" height="10" fill="#fed7aa" stroke="#f97316" strokeWidth="2" />
            <rect x="180" y="230" width="20" height="10" fill="#fed7aa" stroke="#f97316" strokeWidth="2" />
            <text x="210" y="238" fontSize="12" fill="#1e293b">中等成熟度</text>
            
            <rect x="310" y="230" width="20" height="10" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
            <text x="340" y="238" fontSize="12" fill="#1e293b">高成熟度</text>
          </svg>
        </div>
      </div>
    )
  }
};

const SystemTesting = () => {
  const [activeTab, setActiveTab] = useState("concept");
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">系统测试</h1>
      
      {/* 标签页导航 */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex flex-wrap -mb-px">
          {tabList.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-2 px-4 text-sm font-medium rounded-t-lg border-b-2 focus:outline-none ${
                activeTab === tab.key
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* 标签页内容 */}
      <div>
        <div className="space-y-4">
          {tabContent[activeTab].desc.map((desc, index) => (
            <p key={index} className="text-gray-700">{desc}</p>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="font-semibold mb-3 text-gray-800">{tabContent[activeTab].exampleTitle}</h3>
          {tabContent[activeTab].example}
        </div>
      </div>
      
      {/* 相关资源链接 */}
      <div className="mt-8 border-t border-gray-200 pt-6">
        <h3 className="font-semibold mb-4 text-gray-800">相关资源</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="#" className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <i className="fa fa-book text-blue-600 mr-3"></i>
            <span className="text-gray-800">《软件测试艺术》</span>
          </a>
          <a href="#" className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <i className="fa fa-file-pdf text-red-600 mr-3"></i>
            <span className="text-gray-800">系统测试标准指南</span>
          </a>
          <a href="#" className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <i className="fa fa-play-circle text-red-600 mr-3"></i>
            <span className="text-gray-800">系统测试在线教程</span>
          </a>
          <a href="#" className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <i className="fa fa-code text-green-600 mr-3"></i>
            <span className="text-gray-800">测试自动化框架示例</span>
          </a>
        </div>
      </div>
      {/* 底部导航 */}
      <div className="mt-10 flex justify-between">
        <Link href="/study/se/standards-testing/integration" className="px-4 py-2 text-blue-600 hover:text-blue-800">集成测试 →</Link>
        <Link href="/study/se/standards-testing/automation" className="px-4 py-2 text-blue-600 hover:text-blue-800">自动化测试 →</Link>
      </div>
    </div>
  );
};

export default SystemTesting;
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RobotInterviewPage() {
  const [activeTab, setActiveTab] = useState('basic');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'basic', label: '基础知识' },
    { id: 'algorithm', label: '算法题' },
    { id: 'system', label: '系统设计' },
    { id: 'project', label: '项目经验' }
  ];

  const toggleContent = (contentId: string) => {
    setExpandedContent(expandedContent === contentId ? null : contentId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">机器人面试题</h1>
      
      {/* 标签导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-medium whitespace-nowrap ${
              activeTab === tab.id 
                ? 'border-b-2 border-blue-500 text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 内容区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === 'basic' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">基础知识面试题</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 机器人运动学</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      问题：请解释机器人运动学中的正向运动学和逆向运动学的区别，并说明它们各自的应用场景。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">参考答案：</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>正向运动学：已知关节角度，求解末端执行器的位置和姿态</li>
                        <li>逆向运动学：已知末端执行器的位置和姿态，求解关节角度</li>
                        <li>应用场景：
                          <ul className="list-disc pl-6 mt-2">
                            <li>正向运动学：轨迹规划、碰撞检测</li>
                            <li>逆向运动学：路径规划、任务执行</li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 传感器与感知</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      问题：请列举机器人常用的传感器类型，并说明它们各自的特点和应用场景。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">参考答案：</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>视觉传感器：
                          <ul className="list-disc pl-6 mt-2">
                            <li>RGB摄像头：获取彩色图像</li>
                            <li>深度相机：获取深度信息</li>
                            <li>应用：目标识别、场景理解</li>
                          </ul>
                        </li>
                        <li>距离传感器：
                          <ul className="list-disc pl-6 mt-2">
                            <li>激光雷达：高精度测距</li>
                            <li>超声波：近距离测距</li>
                            <li>应用：避障、建图</li>
                          </ul>
                        </li>
                        <li>惯性传感器：
                          <ul className="list-disc pl-6 mt-2">
                            <li>IMU：测量加速度和角速度</li>
                            <li>应用：姿态估计、定位</li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'algorithm' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">算法面试题</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 路径规划算法</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      问题：请实现一个基于A*算法的路径规划函数，并分析其时间复杂度和空间复杂度。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">参考答案：</h5>
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`def astar(grid, start, goal):
    def heuristic(a, b):
        return abs(a[0] - b[0]) + abs(a[1] - b[1])
    
    def get_neighbors(node):
        directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]
        neighbors = []
        for dx, dy in directions:
            new_x, new_y = node[0] + dx, node[1] + dy
            if 0 <= new_x < len(grid) and 0 <= new_y < len(grid[0]) and grid[new_x][new_y] != 1:
                neighbors.append((new_x, new_y))
        return neighbors
    
    open_set = {start}
    closed_set = set()
    came_from = {}
    g_score = {start: 0}
    f_score = {start: heuristic(start, goal)}
    
    while open_set:
        current = min(open_set, key=lambda x: f_score.get(x, float('inf')))
        if current == goal:
            path = []
            while current in came_from:
                path.append(current)
                current = came_from[current]
            path.append(start)
            return path[::-1]
            
        open_set.remove(current)
        closed_set.add(current)
        
        for neighbor in get_neighbors(current):
            if neighbor in closed_set:
                continue
                
            tentative_g_score = g_score[current] + 1
            
            if neighbor not in open_set:
                open_set.add(neighbor)
            elif tentative_g_score >= g_score.get(neighbor, float('inf')):
                continue
                
            came_from[neighbor] = current
            g_score[neighbor] = tentative_g_score
            f_score[neighbor] = g_score[neighbor] + heuristic(neighbor, goal)
    
    return None`}
                      </pre>
                      <p className="mt-4">
                        时间复杂度：O(|V| log |V|)，其中|V|是网格中的节点数<br />
                        空间复杂度：O(|V|)，用于存储开放集、关闭集和路径信息
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. SLAM算法</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      问题：请解释SLAM（同时定位与地图构建）的基本原理，并说明如何解决数据关联问题。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">参考答案：</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>SLAM基本原理：
                          <ul className="list-disc pl-6 mt-2">
                            <li>前端：特征提取、数据关联、位姿估计</li>
                            <li>后端：位姿图优化、回环检测</li>
                          </ul>
                        </li>
                        <li>数据关联方法：
                          <ul className="list-disc pl-6 mt-2">
                            <li>特征匹配：SIFT、ORB等</li>
                            <li>最近邻搜索：KD树、R树</li>
                            <li>概率模型：多假设跟踪</li>
                          </ul>
                        </li>
                        <li>优化方法：
                          <ul className="list-disc pl-6 mt-2">
                            <li>图优化：g2o、Ceres</li>
                            <li>滤波方法：EKF、UKF</li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'system' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">系统设计面试题</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 机器人控制系统</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      问题：请设计一个机器人控制系统的架构，要求支持实时控制、多传感器融合和任务调度。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">参考答案：</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>系统架构：
                          <ul className="list-disc pl-6 mt-2">
                            <li>感知层：传感器数据采集和预处理</li>
                            <li>决策层：任务规划和运动控制</li>
                            <li>执行层：电机控制和执行器管理</li>
                          </ul>
                        </li>
                        <li>关键模块：
                          <ul className="list-disc pl-6 mt-2">
                            <li>实时操作系统：ROS2、Xenomai</li>
                            <li>通信机制：DDS、ZeroMQ</li>
                            <li>任务调度：优先级调度、时间触发</li>
                          </ul>
                        </li>
                        <li>性能优化：
                          <ul className="list-disc pl-6 mt-2">
                            <li>多线程处理</li>
                            <li>内存池管理</li>
                            <li>实时性保证</li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 分布式机器人系统</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      问题：如何设计一个支持多机器人协同工作的分布式系统？需要考虑哪些关键问题？
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">参考答案：</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>系统架构：
                          <ul className="list-disc pl-6 mt-2">
                            <li>中心化架构：主从模式</li>
                            <li>分布式架构：P2P模式</li>
                            <li>混合架构：分层设计</li>
                          </ul>
                        </li>
                        <li>关键问题：
                          <ul className="list-disc pl-6 mt-2">
                            <li>通信机制：消息传递、状态同步</li>
                            <li>任务分配：负载均衡、优先级</li>
                            <li>故障处理：容错、恢复</li>
                            <li>安全性：认证、授权</li>
                          </ul>
                        </li>
                        <li>实现方案：
                          <ul className="list-disc pl-6 mt-2">
                            <li>通信框架：ROS2、MQTT</li>
                            <li>任务调度：Kubernetes、Docker</li>
                            <li>数据存储：分布式数据库</li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'project' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">项目经验面试题</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 项目经验分享</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      问题：请分享一个你参与过的机器人项目，包括项目背景、你的角色、技术难点和解决方案。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">参考答案：</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>项目背景：
                          <ul className="list-disc pl-6 mt-2">
                            <li>项目目标：开发一个自主导航的服务机器人</li>
                            <li>应用场景：医院、商场等公共场所</li>
                            <li>项目规模：团队规模、开发周期</li>
                          </ul>
                        </li>
                        <li>个人角色：
                          <ul className="list-disc pl-6 mt-2">
                            <li>负责模块：导航系统开发</li>
                            <li>技术栈：ROS、C++、Python</li>
                            <li>工作内容：算法实现、系统集成</li>
                          </ul>
                        </li>
                        <li>技术难点：
                          <ul className="list-disc pl-6 mt-2">
                            <li>实时性要求：控制延迟</li>
                            <li>环境适应性：动态障碍物</li>
                            <li>系统稳定性：长期运行</li>
                          </ul>
                        </li>
                        <li>解决方案：
                          <ul className="list-disc pl-6 mt-2">
                            <li>算法优化：改进路径规划</li>
                            <li>架构设计：模块化、可扩展</li>
                            <li>测试验证：仿真、实机测试</li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 技术选型</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      问题：在机器人项目开发中，如何选择合适的硬件平台和软件框架？请结合具体案例说明。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">参考答案：</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>硬件选型：
                          <ul className="list-disc pl-6 mt-2">
                            <li>计算平台：CPU、GPU、FPGA</li>
                            <li>传感器：精度、成本、功耗</li>
                            <li>执行器：力矩、速度、精度</li>
                          </ul>
                        </li>
                        <li>软件框架：
                          <ul className="list-disc pl-6 mt-2">
                            <li>操作系统：ROS、Linux</li>
                            <li>开发语言：C++、Python</li>
                            <li>工具链：编译、调试、测试</li>
                          </ul>
                        </li>
                        <li>选型考虑因素：
                          <ul className="list-disc pl-6 mt-2">
                            <li>性能需求：实时性、计算能力</li>
                            <li>成本预算：硬件成本、开发成本</li>
                            <li>开发周期：时间限制、团队能力</li>
                            <li>可维护性：文档、社区支持</li>
                          </ul>
                        </li>
                      </ul>
                    </div>
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
          href="/study/ai/robot/cases"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回实战案例
        </Link>
        <Link 
          href="/study/ai/robot/advanced"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          进阶与前沿 →
        </Link>
      </div>
    </div>
  );
} 
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RobotControlPage() {
  const [activeTab, setActiveTab] = useState('basic');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'basic', label: '基础控制' },
    { id: 'advanced', label: '高级控制' },
    { id: 'application', label: '实际应用' }
  ];

  const toggleContent = (contentId: string) => {
    setExpandedContent(expandedContent === contentId ? null : contentId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">机器人控制</h1>
      
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
              <h3 className="text-xl font-semibold mb-3">基础控制算法</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. PID控制</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      PID控制器是最常用的反馈控制器，通过比例、积分和微分三个环节实现精确控制。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">控制原理</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>比例控制(P)：与误差成正比</li>
                        <li>积分控制(I)：消除稳态误差</li>
                        <li>微分控制(D)：抑制超调和振荡</li>
                      </ul>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mt-4">
                      <h5 className="font-semibold mb-2">控制框图</h5>
                      <svg className="w-full h-48" viewBox="0 0 800 200">
                        <defs>
                          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
                          </marker>
                        </defs>
                        <rect x="50" y="80" width="100" height="40" fill="none" stroke="#666" strokeWidth="2"/>
                        <text x="100" y="105" textAnchor="middle" fill="#666">PID控制器</text>
                        <rect x="250" y="80" width="100" height="40" fill="none" stroke="#666" strokeWidth="2"/>
                        <text x="300" y="105" textAnchor="middle" fill="#666">机器人系统</text>
                        <rect x="450" y="80" width="100" height="40" fill="none" stroke="#666" strokeWidth="2"/>
                        <text x="500" y="105" textAnchor="middle" fill="#666">传感器</text>
                        <line x1="150" y1="100" x2="250" y2="100" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        <line x1="350" y1="100" x2="450" y2="100" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        <line x1="550" y1="100" x2="650" y2="100" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        <line x1="650" y1="100" x2="650" y2="150" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        <line x1="650" y1="150" x2="50" y2="150" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        <text x="350" y="170" textAnchor="middle" fill="#666">反馈回路</text>
                      </svg>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mt-4">
                      <h5 className="font-semibold mb-2">Python实现示例：</h5>
                      <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`import numpy as np

class PIDController:
    def __init__(self, kp, ki, kd):
        self.kp = kp  # 比例增益
        self.ki = ki  # 积分增益
        self.kd = kd  # 微分增益
        self.previous_error = 0
        self.integral = 0
        
    def compute(self, error, dt):
        """计算控制输出"""
        # 计算积分项
        self.integral += error * dt
        
        # 计算微分项
        derivative = (error - self.previous_error) / dt
        
        # 计算控制输出
        output = (self.kp * error + 
                 self.ki * self.integral + 
                 self.kd * derivative)
        
        # 更新误差
        self.previous_error = error
        
        return output
        
    def reset(self):
        """重置控制器状态"""
        self.previous_error = 0
        self.integral = 0`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 计算力矩控制</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      计算力矩控制利用机器人动力学模型计算所需的关节力矩，
                      实现精确的轨迹跟踪控制。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">控制原理</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>动力学模型补偿</li>
                        <li>重力补偿</li>
                        <li>摩擦力补偿</li>
                        <li>PD反馈控制</li>
                      </ul>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mt-4">
                      <h5 className="font-semibold mb-2">控制框图</h5>
                      <svg className="w-full h-48" viewBox="0 0 800 200">
                        <defs>
                          <marker id="arrowhead2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
                          </marker>
                        </defs>
                        <rect x="50" y="80" width="100" height="40" fill="none" stroke="#666" strokeWidth="2"/>
                        <text x="100" y="105" textAnchor="middle" fill="#666">PD控制器</text>
                        <rect x="250" y="80" width="100" height="40" fill="none" stroke="#666" strokeWidth="2"/>
                        <text x="300" y="105" textAnchor="middle" fill="#666">动力学补偿</text>
                        <rect x="450" y="80" width="100" height="40" fill="none" stroke="#666" strokeWidth="2"/>
                        <text x="500" y="105" textAnchor="middle" fill="#666">机器人系统</text>
                        <line x1="150" y1="100" x2="250" y2="100" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead2)"/>
                        <line x1="350" y1="100" x2="450" y2="100" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead2)"/>
                        <line x1="550" y1="100" x2="650" y2="100" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead2)"/>
                        <line x1="650" y1="100" x2="650" y2="150" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead2)"/>
                        <line x1="650" y1="150" x2="50" y2="150" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead2)"/>
                        <text x="350" y="170" textAnchor="middle" fill="#666">反馈回路</text>
                      </svg>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mt-4">
                      <h5 className="font-semibold mb-2">Python实现示例：</h5>
                      <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`import numpy as np

class ComputedTorqueController:
    def __init__(self, robot, kp, kd):
        self.robot = robot
        self.kp = kp  # 位置增益
        self.kd = kd  # 速度增益
        
    def compute_control(self, q_des, dq_des, q, dq):
        """计算控制力矩"""
        # 计算位置和速度误差
        e = q_des - q
        de = dq_des - dq
        
        # 计算PD控制项
        u_pd = self.kp * e + self.kd * de
        
        # 计算动力学补偿项
        M = self.robot.mass_matrix(q)
        C = self.robot.coriolis_matrix(q, dq)
        G = self.robot.gravity_vector(q)
        
        # 计算总控制力矩
        tau = M @ (u_pd + dq_des) + C @ dq + G
        
        return tau`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'advanced' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">高级控制算法</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 自适应控制</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      自适应控制器能够在线估计系统参数，
                      适应系统参数变化和外部干扰。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">控制原理</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>参数估计</li>
                        <li>自适应律</li>
                        <li>鲁棒性设计</li>
                        <li>稳定性分析</li>
                      </ul>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mt-4">
                      <h5 className="font-semibold mb-2">控制框图</h5>
                      <svg className="w-full h-48" viewBox="0 0 800 200">
                        <defs>
                          <marker id="arrowhead3" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
                          </marker>
                        </defs>
                        <rect x="50" y="80" width="100" height="40" fill="none" stroke="#666" strokeWidth="2"/>
                        <text x="100" y="105" textAnchor="middle" fill="#666">控制器</text>
                        <rect x="250" y="80" width="100" height="40" fill="none" stroke="#666" strokeWidth="2"/>
                        <text x="300" y="105" textAnchor="middle" fill="#666">参数估计器</text>
                        <rect x="450" y="80" width="100" height="40" fill="none" stroke="#666" strokeWidth="2"/>
                        <text x="500" y="105" textAnchor="middle" fill="#666">机器人系统</text>
                        <line x1="150" y1="100" x2="250" y2="100" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead3)"/>
                        <line x1="350" y1="100" x2="450" y2="100" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead3)"/>
                        <line x1="550" y1="100" x2="650" y2="100" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead3)"/>
                        <line x1="650" y1="100" x2="650" y2="150" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead3)"/>
                        <line x1="650" y1="150" x2="50" y2="150" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead3)"/>
                        <line x1="300" y1="120" x2="300" y2="150" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead3)"/>
                        <text x="350" y="170" textAnchor="middle" fill="#666">自适应回路</text>
                      </svg>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mt-4">
                      <h5 className="font-semibold mb-2">Python实现示例：</h5>
                      <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`import numpy as np

class AdaptiveController:
    def __init__(self, robot, kp, kd, gamma):
        self.robot = robot
        self.kp = kp  # 位置增益
        self.kd = kd  # 速度增益
        self.gamma = gamma  # 自适应增益
        self.theta_hat = np.zeros(robot.num_params)  # 参数估计
        
    def compute_control(self, q_des, dq_des, q, dq):
        """计算控制力矩"""
        # 计算位置和速度误差
        e = q_des - q
        de = dq_des - dq
        
        # 计算PD控制项
        u_pd = self.kp * e + self.kd * de
        
        # 计算回归矩阵
        Y = self.robot.regression_matrix(q, dq, dq_des, u_pd)
        
        # 更新参数估计
        self.theta_hat += self.gamma * Y.T @ (e + de)
        
        # 计算控制力矩
        tau = Y @ self.theta_hat + u_pd
        
        return tau`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 鲁棒控制</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      鲁棒控制器能够处理系统参数不确定性和外部干扰，
                      保证控制性能的稳定性。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">控制原理</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>滑模控制</li>
                        <li>H∞控制</li>
                        <li>干扰观测器</li>
                        <li>鲁棒稳定性</li>
                      </ul>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mt-4">
                      <h5 className="font-semibold mb-2">Python实现示例：</h5>
                      <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`import numpy as np

class RobustController:
    def __init__(self, robot, kp, kd, k_robust):
        self.robot = robot
        self.kp = kp  # 位置增益
        self.kd = kd  # 速度增益
        self.k_robust = k_robust  # 鲁棒增益
        
    def compute_control(self, q_des, dq_des, q, dq):
        """计算控制力矩"""
        # 计算位置和速度误差
        e = q_des - q
        de = dq_des - dq
        
        # 计算滑模面
        s = de + self.kp * e
        
        # 计算鲁棒控制项
        u_robust = -self.k_robust * np.sign(s)
        
        # 计算PD控制项
        u_pd = self.kp * e + self.kd * de
        
        # 计算总控制力矩
        tau = u_pd + u_robust
        
        return tau`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'application' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">实际应用</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 工业机器人控制</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      工业机器人控制需要高精度、高速度和高可靠性，
                      通常采用计算力矩控制和自适应控制。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">应用场景</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>轨迹跟踪控制</li>
                        <li>力控制</li>
                        <li>阻抗控制</li>
                        <li>多机器人协同控制</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 移动机器人控制</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      移动机器人控制需要考虑非完整约束和动态特性，
                      通常采用滑模控制和鲁棒控制。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">应用场景</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>路径跟踪控制</li>
                        <li>编队控制</li>
                        <li>避障控制</li>
                        <li>自适应导航</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 人机交互控制</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      人机交互控制需要保证安全性和柔顺性，
                      通常采用阻抗控制和自适应控制。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">应用场景</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>物理人机交互</li>
                        <li>康复机器人</li>
                        <li>协作机器人</li>
                        <li>遥操作控制</li>
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
          href="/study/ai/robot/path-planning"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回路径规划
        </Link>
        <Link 
          href="/study/ai/robot/sensors"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          传感器与感知 →
        </Link>
      </div>
    </div>
  );
} 
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RobotBasicPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'overview', label: '概述' },
    { id: 'kinematics', label: '运动学基础' },
    { id: 'dynamics', label: '动力学基础' },
    { id: 'control', label: '控制基础' }
  ];

  const toggleContent = (contentId: string) => {
    setExpandedContent(expandedContent === contentId ? null : contentId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">机器人学基础</h1>
      
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
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">机器人学概述</h3>
              <div className="prose max-w-none">
                <p className="mb-4">
                  机器人学是研究机器人设计、制造、控制和应用的科学与技术。
                  它融合了机械工程、电子工程、计算机科学、控制理论等多个学科的知识。
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">主要研究领域</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>机器人运动学与动力学</li>
                    <li>机器人控制理论</li>
                    <li>机器人感知与规划</li>
                    <li>机器人智能与学习</li>
                    <li>机器人应用与集成</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">机器人分类</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">按结构分类</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>串联机器人</li>
                    <li>并联机器人</li>
                    <li>混合机器人</li>
                    <li>移动机器人</li>
                    <li>软体机器人</li>
                  </ul>
                </div>

                {/* 机器人分类图 */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">机器人分类图</h4>
                  <svg className="w-full h-64" viewBox="0 0 800 300">
                    <defs>
                      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{stopColor: '#4F46E5', stopOpacity: 0.8}} />
                        <stop offset="100%" style={{stopColor: '#7C3AED', stopOpacity: 0.8}} />
                      </linearGradient>
                    </defs>
                    {/* 串联机器人 */}
                    <rect x="50" y="50" width="150" height="50" rx="5" fill="url(#grad1)" />
                    <text x="125" y="80" textAnchor="middle" fill="white" className="font-medium">串联机器人</text>
                    
                    {/* 并联机器人 */}
                    <rect x="250" y="50" width="150" height="50" rx="5" fill="url(#grad1)" />
                    <text x="325" y="80" textAnchor="middle" fill="white" className="font-medium">并联机器人</text>
                    
                    {/* 混合机器人 */}
                    <rect x="450" y="50" width="150" height="50" rx="5" fill="url(#grad1)" />
                    <text x="525" y="80" textAnchor="middle" fill="white" className="font-medium">混合机器人</text>
                    
                    {/* 移动机器人 */}
                    <rect x="650" y="50" width="100" height="50" rx="5" fill="url(#grad1)" />
                    <text x="700" y="80" textAnchor="middle" fill="white" className="font-medium">移动机器人</text>
                    
                    {/* 软体机器人 */}
                    <rect x="50" y="120" width="150" height="50" rx="5" fill="url(#grad1)" />
                    <text x="125" y="150" textAnchor="middle" fill="white" className="font-medium">软体机器人</text>
                    
                    {/* 工业机器人 */}
                    <rect x="250" y="120" width="150" height="50" rx="5" fill="url(#grad1)" />
                    <text x="325" y="150" textAnchor="middle" fill="white" className="font-medium">工业机器人</text>
                    
                    {/* 服务机器人 */}
                    <rect x="450" y="120" width="150" height="50" rx="5" fill="url(#grad1)" />
                    <text x="525" y="150" textAnchor="middle" fill="white" className="font-medium">服务机器人</text>
                    
                    {/* 特种机器人 */}
                    <rect x="650" y="120" width="100" height="50" rx="5" fill="url(#grad1)" />
                    <text x="700" y="150" textAnchor="middle" fill="white" className="font-medium">特种机器人</text>
                    
                    {/* 连接线 */}
                    <line x1="200" y1="75" x2="250" y2="75" stroke="#4B5563" strokeWidth="2" />
                    <line x1="400" y1="75" x2="450" y2="75" stroke="#4B5563" strokeWidth="2" />
                    <line x1="600" y1="75" x2="650" y2="75" stroke="#4B5563" strokeWidth="2" />
                    <line x1="200" y1="145" x2="250" y2="145" stroke="#4B5563" strokeWidth="2" />
                    <line x1="400" y1="145" x2="450" y2="145" stroke="#4B5563" strokeWidth="2" />
                    <line x1="600" y1="145" x2="650" y2="145" stroke="#4B5563" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">基础概念</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">关键概念</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>自由度（DOF）</li>
                    <li>工作空间</li>
                    <li>末端执行器</li>
                    <li>关节空间</li>
                    <li>笛卡尔空间</li>
                  </ul>
                </div>

                {/* 基础概念图 */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">机器人基本结构图</h4>
                  <svg className="w-full h-64" viewBox="0 0 800 300">
                    <defs>
                      <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{stopColor: '#10B981', stopOpacity: 0.8}} />
                        <stop offset="100%" style={{stopColor: '#059669', stopOpacity: 0.8}} />
                      </linearGradient>
                    </defs>
                    {/* 基座 */}
                    <rect x="350" y="250" width="100" height="20" fill="url(#grad2)" />
                    <text x="400" y="265" textAnchor="middle" fill="white" className="font-medium">基座</text>
                    
                    {/* 连杆1 */}
                    <rect x="375" y="150" width="20" height="100" fill="url(#grad2)" />
                    <text x="385" y="200" textAnchor="middle" fill="white" className="font-medium">连杆1</text>
                    
                    {/* 连杆2 */}
                    <rect x="375" y="50" width="20" height="100" fill="url(#grad2)" />
                    <text x="385" y="100" textAnchor="middle" fill="white" className="font-medium">连杆2</text>
                    
                    {/* 末端执行器 */}
                    <rect x="350" y="20" width="50" height="30" fill="url(#grad2)" />
                    <text x="375" y="40" textAnchor="middle" fill="white" className="font-medium">末端执行器</text>
                    
                    {/* 关节1 */}
                    <circle cx="385" cy="150" r="10" fill="#EF4444" />
                    <text x="385" y="155" textAnchor="middle" fill="white" className="font-medium">J1</text>
                    
                    {/* 关节2 */}
                    <circle cx="385" cy="50" r="10" fill="#EF4444" />
                    <text x="385" y="55" textAnchor="middle" fill="white" className="font-medium">J2</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'kinematics' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">运动学基础</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 正运动学</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      正运动学研究如何从关节角度计算末端执行器的位置和姿态。
                      使用DH参数法和齐次变换矩阵进行描述。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">Python实现示例：</h5>
                      <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`import numpy as np
from scipy.spatial.transform import Rotation

class ForwardKinematics:
    def __init__(self):
        self.dh_params = []  # DH参数表
        
    def set_dh_params(self, dh_params):
        self.dh_params = dh_params
        
    def transform_matrix(self, a, alpha, d, theta):
        """计算单个关节的变换矩阵"""
        ct = np.cos(theta)
        st = np.sin(theta)
        ca = np.cos(alpha)
        sa = np.sin(alpha)
        
        return np.array([
            [ct, -st*ca, st*sa, a*ct],
            [st, ct*ca, -ct*sa, a*st],
            [0, sa, ca, d],
            [0, 0, 0, 1]
        ])
        
    def forward_kinematics(self, joint_angles):
        """计算正运动学"""
        T = np.eye(4)
        for i, (a, alpha, d, theta) in enumerate(self.dh_params):
            theta = theta + joint_angles[i]
            T = T @ self.transform_matrix(a, alpha, d, theta)
        return T`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 逆运动学</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      逆运动学研究如何从末端执行器的位置和姿态计算关节角度。
                      通常使用解析法或数值法求解。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">Python实现示例：</h5>
                      <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`import numpy as np
from scipy.optimize import minimize

class InverseKinematics:
    def __init__(self, robot):
        self.robot = robot
        
    def objective_function(self, joint_angles, target_pose):
        """目标函数：最小化末端执行器位置误差"""
        current_pose = self.robot.forward_kinematics(joint_angles)
        position_error = np.linalg.norm(current_pose[:3, 3] - target_pose[:3, 3])
        orientation_error = np.linalg.norm(current_pose[:3, :3] - target_pose[:3, :3])
        return position_error + orientation_error
        
    def solve_ik(self, target_pose, initial_angles=None):
        """求解逆运动学"""
        if initial_angles is None:
            initial_angles = np.zeros(self.robot.num_joints)
            
        result = minimize(
            self.objective_function,
            initial_angles,
            args=(target_pose,),
            method='SLSQP',
            bounds=[(-np.pi, np.pi) for _ in range(self.robot.num_joints)]
        )
        
        return result.x`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 雅可比矩阵</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      雅可比矩阵描述了关节速度与末端执行器速度之间的关系，
                      在速度控制和奇异点分析中起重要作用。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">Python实现示例：</h5>
                      <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`import numpy as np

class Jacobian:
    def __init__(self, robot):
        self.robot = robot
        
    def compute_jacobian(self, joint_angles):
        """计算雅可比矩阵"""
        n = len(joint_angles)
        J = np.zeros((6, n))
        T = np.eye(4)
        z_axes = []
        origins = []
        
        # 计算每个关节的变换矩阵和z轴
        for i in range(n):
            T = T @ self.robot.transform_matrix(i, joint_angles[i])
            z_axes.append(T[:3, 2])
            origins.append(T[:3, 3])
            
        # 计算雅可比矩阵
        for i in range(n):
            J[:3, i] = np.cross(z_axes[i], origins[-1] - origins[i])
            J[3:, i] = z_axes[i]
            
        return J
        
    def check_singularity(self, joint_angles, threshold=1e-6):
        """检查奇异点"""
        J = self.compute_jacobian(joint_angles)
        det = np.linalg.det(J[:3, :3])
        return abs(det) < threshold`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'dynamics' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">动力学基础</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 拉格朗日动力学</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      拉格朗日动力学通过系统的动能和势能描述机器人运动，
                      是机器人动力学分析的重要工具。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">Python实现示例：</h5>
                      <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`import numpy as np
from scipy.integrate import odeint

class LagrangianDynamics:
    def __init__(self, robot):
        self.robot = robot
        
    def compute_kinetic_energy(self, q, dq):
        """计算系统动能"""
        M = self.robot.mass_matrix(q)
        return 0.5 * dq.T @ M @ dq
        
    def compute_potential_energy(self, q):
        """计算系统势能"""
        g = 9.81
        U = 0
        for i in range(self.robot.num_links):
            com = self.robot.link_com(i, q)
            U += self.robot.link_mass(i) * g * com[2]
        return U
        
    def lagrangian(self, q, dq):
        """计算拉格朗日量"""
        return self.compute_kinetic_energy(q, dq) - self.compute_potential_energy(q)
        
    def dynamics_equations(self, state, t, tau):
        """动力学方程"""
        n = self.robot.num_joints
        q = state[:n]
        dq = state[n:]
        
        M = self.robot.mass_matrix(q)
        C = self.robot.coriolis_matrix(q, dq)
        G = self.robot.gravity_vector(q)
        
        ddq = np.linalg.solve(M, tau - C @ dq - G)
        return np.concatenate([dq, ddq])`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 牛顿-欧拉动力学</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      牛顿-欧拉动力学通过递推方式计算关节力矩，
                      计算效率高，适合实时控制。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">Python实现示例：</h5>
                      <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`import numpy as np

class NewtonEulerDynamics:
    def __init__(self, robot):
        self.robot = robot
        
    def forward_recursion(self, q, dq, ddq):
        """前向递推：计算速度和加速度"""
        n = self.robot.num_joints
        v = [np.zeros(6) for _ in range(n+1)]
        a = [np.zeros(6) for _ in range(n+1)]
        
        for i in range(n):
            # 计算关节变换
            T = self.robot.transform_matrix(i, q[i])
            R = T[:3, :3]
            p = T[:3, 3]
            
            # 计算速度和加速度
            v[i+1] = R.T @ (v[i] + np.array([0, 0, 0, 0, 0, dq[i]]))
            a[i+1] = R.T @ (a[i] + np.array([0, 0, 0, 0, 0, ddq[i]]) + 
                           np.cross(v[i+1], np.array([0, 0, 0, 0, 0, dq[i]])))
            
        return v, a
        
    def backward_recursion(self, q, v, a):
        """后向递推：计算力和力矩"""
        n = self.robot.num_joints
        f = [np.zeros(6) for _ in range(n+1)]
        tau = np.zeros(n)
        
        for i in range(n-1, -1, -1):
            # 计算关节变换
            T = self.robot.transform_matrix(i, q[i])
            R = T[:3, :3]
            p = T[:3, 3]
            
            # 计算力和力矩
            f[i] = R @ f[i+1] + self.robot.link_force(i, v[i+1], a[i+1])
            tau[i] = f[i][5]
            
        return tau`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'control' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">控制基础</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. PID控制</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      PID控制器是最基本的机器人控制方法，
                      通过比例、积分、微分三个环节实现控制目标。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">Python实现示例：</h5>
                      <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`import numpy as np

class PIDController:
    def __init__(self, kp, ki, kd):
        self.kp = kp
        self.ki = ki
        self.kd = kd
        self.prev_error = 0
        self.integral = 0
        
    def compute(self, error, dt):
        """计算控制输出"""
        # 计算积分项
        self.integral += error * dt
        
        # 计算微分项
        derivative = (error - self.prev_error) / dt
        
        # 计算控制输出
        output = (self.kp * error + 
                 self.ki * self.integral + 
                 self.kd * derivative)
        
        # 更新误差
        self.prev_error = error
        
        return output
        
    def reset(self):
        """重置控制器状态"""
        self.prev_error = 0
        self.integral = 0`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 计算力矩控制</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      计算力矩控制通过动力学模型计算所需的关节力矩，
                      实现精确的轨迹跟踪。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">Python实现示例：</h5>
                      <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`import numpy as np

class ComputedTorqueController:
    def __init__(self, robot):
        self.robot = robot
        self.kp = np.diag([100, 100, 100])  # 位置增益
        self.kd = np.diag([20, 20, 20])     # 速度增益
        
    def compute_control(self, q, dq, qd, dqd, ddqd):
        """计算控制力矩"""
        # 计算跟踪误差
        e = qd - q
        de = dqd - dq
        
        # 计算前馈项
        M = self.robot.mass_matrix(q)
        C = self.robot.coriolis_matrix(q, dq)
        G = self.robot.gravity_vector(q)
        
        # 计算控制力矩
        tau = (M @ (ddqd + self.kp @ e + self.kd @ de) + 
               C @ dq + G)
        
        return tau
        
    def update_gains(self, kp, kd):
        """更新控制器增益"""
        self.kp = np.diag(kp)
        self.kd = np.diag(kd)`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 阻抗控制</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      阻抗控制通过调节机器人的动态特性，
                      实现与环境的安全交互。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">Python实现示例：</h5>
                      <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`import numpy as np

class ImpedanceController:
    def __init__(self, robot):
        self.robot = robot
        # 期望阻抗参数
        self.Md = np.diag([1.0, 1.0, 1.0])  # 期望质量
        self.Bd = np.diag([10.0, 10.0, 10.0])  # 期望阻尼
        self.Kd = np.diag([100.0, 100.0, 100.0])  # 期望刚度
        
    def compute_control(self, x, dx, xd, dxd, F_ext):
        """计算控制输出"""
        # 计算位置和速度误差
        e = xd - x
        de = dxd - dx
        
        # 计算期望加速度
        ddxd = np.linalg.solve(self.Md, 
                              F_ext - self.Bd @ de - self.Kd @ e)
        
        # 计算控制力矩
        J = self.robot.jacobian(x)
        tau = J.T @ (self.robot.mass_matrix(x) @ ddxd + 
                    self.robot.coriolis_matrix(x, dx) @ dx + 
                    self.robot.gravity_vector(x))
        
        return tau
        
    def update_impedance(self, Md, Bd, Kd):
        """更新阻抗参数"""
        self.Md = np.diag(Md)
        self.Bd = np.diag(Bd)
        self.Kd = np.diag(Kd)`}
                      </pre>
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
          href="/study/ai/robot/kinematics"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回运动学与动力学
        </Link>
        <Link 
          href="/study/ai/robot/path-planning"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          路径规划 →
        </Link>
      </div>
    </div>
  );
} 
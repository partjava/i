'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RobotKinematicsPage() {
  const [activeTab, setActiveTab] = useState('kinematics');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'kinematics', label: '运动学' },
    { id: 'dynamics', label: '动力学' },
    { id: 'advanced', label: '高级主题' }
  ];

  const toggleContent = (contentId: string) => {
    setExpandedContent(expandedContent === contentId ? null : contentId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">机器人运动学与动力学</h1>
      
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
                      <h5 className="font-semibold mb-2">DH参数法</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>连杆长度(a)：相邻关节轴之间的公垂线长度</li>
                        <li>连杆扭角(α)：相邻关节轴之间的夹角</li>
                        <li>连杆偏移(d)：相邻连杆之间的偏移距离</li>
                        <li>关节角度(θ)：相邻连杆之间的旋转角度</li>
                      </ul>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mt-4">
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
                      <h5 className="font-semibold mb-2">解析法</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>几何法：利用几何关系直接求解</li>
                        <li>代数法：通过代数方程求解</li>
                        <li>适用于简单机器人结构</li>
                      </ul>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mt-4">
                      <h5 className="font-semibold mb-2">数值法</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>雅可比矩阵法</li>
                        <li>优化方法</li>
                        <li>适用于复杂机器人结构</li>
                      </ul>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mt-4">
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
                      <h5 className="font-semibold mb-2">应用场景</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>速度控制</li>
                        <li>奇异点分析</li>
                        <li>工作空间分析</li>
                        <li>力控制</li>
                      </ul>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mt-4">
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
                      <h5 className="font-semibold mb-2">基本原理</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>动能：系统运动状态的能量</li>
                        <li>势能：系统位置状态的能量</li>
                        <li>拉格朗日量：动能与势能之差</li>
                        <li>拉格朗日方程：描述系统运动规律</li>
                      </ul>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mt-4">
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
                      <h5 className="font-semibold mb-2">计算步骤</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>前向递推：计算速度和加速度</li>
                        <li>后向递推：计算力和力矩</li>
                        <li>考虑重力、惯性力和科里奥利力</li>
                      </ul>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mt-4">
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

        {activeTab === 'advanced' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">高级主题</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 奇异点分析</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      奇异点是机器人工作空间中的特殊位置，
                      在这些位置机器人失去某些方向的运动能力。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">奇异点类型</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>工作空间边界奇异点</li>
                        <li>内部奇异点</li>
                        <li>姿态奇异点</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 动力学优化</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      动力学优化通过优化机器人运动轨迹，
                      提高运动效率和减少能量消耗。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">优化目标</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>最小化能量消耗</li>
                        <li>最小化关节力矩</li>
                        <li>最小化运动时间</li>
                        <li>避免奇异点</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 实时控制</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      实时控制要求控制系统能够快速响应，
                      保证机器人运动的精确性和稳定性。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">控制策略</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>计算力矩控制</li>
                        <li>自适应控制</li>
                        <li>鲁棒控制</li>
                        <li>模型预测控制</li>
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
          href="/study/ai/robot/basic"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回机器人学基础
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
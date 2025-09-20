'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PathPlanningPage() {
  const [activeTab, setActiveTab] = useState('basic');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'basic', label: '基础算法' },
    { id: 'advanced', label: '高级算法' },
    { id: 'application', label: '实际应用' }
  ];

  const toggleContent = (contentId: string) => {
    setExpandedContent(expandedContent === contentId ? null : contentId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">机器人路径规划</h1>
      
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
              <h3 className="text-xl font-semibold mb-3">基础路径规划算法</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. A*算法</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      A*算法是一种启发式搜索算法，通过评估函数选择最优路径。
                      它结合了Dijkstra算法的完备性和贪心算法的效率。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">算法特点</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>使用启发式函数估计到目标点的距离</li>
                        <li>保证找到最优路径</li>
                        <li>适用于静态环境</li>
                        <li>计算效率较高</li>
                      </ul>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mt-4">
                      <h5 className="font-semibold mb-2">Python实现示例：</h5>
                      <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`import numpy as np
from heapq import heappush, heappop

class AStar:
    def __init__(self, grid):
        self.grid = grid
        self.rows, self.cols = grid.shape
        
    def heuristic(self, a, b):
        """计算启发式函数值（曼哈顿距离）"""
        return abs(a[0] - b[0]) + abs(a[1] - b[1])
        
    def get_neighbors(self, node):
        """获取相邻节点"""
        x, y = node
        neighbors = []
        for dx, dy in [(0, 1), (1, 0), (0, -1), (-1, 0)]:
            nx, ny = x + dx, y + dy
            if 0 <= nx < self.rows and 0 <= ny < self.cols and self.grid[nx, ny] == 0:
                neighbors.append((nx, ny))
        return neighbors
        
    def find_path(self, start, goal):
        """寻找路径"""
        frontier = []
        heappush(frontier, (0, start))
        came_from = {start: None}
        cost_so_far = {start: 0}
        
        while frontier:
            current = heappop(frontier)[1]
            
            if current == goal:
                break
                
            for next_node in self.get_neighbors(current):
                new_cost = cost_so_far[current] + 1
                if next_node not in cost_so_far or new_cost < cost_so_far[next_node]:
                    cost_so_far[next_node] = new_cost
                    priority = new_cost + self.heuristic(goal, next_node)
                    heappush(frontier, (priority, next_node))
                    came_from[next_node] = current
                    
        # 重建路径
        path = []
        current = goal
        while current is not None:
            path.append(current)
            current = came_from[current]
        path.reverse()
        
        return path`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. RRT算法</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      快速随机树(RRT)算法是一种基于采样的路径规划算法，
                      适用于高维空间和复杂环境。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">算法特点</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>随机采样探索空间</li>
                        <li>适用于高维空间</li>
                        <li>不保证最优解</li>
                        <li>计算效率高</li>
                      </ul>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mt-4">
                      <h5 className="font-semibold mb-2">Python实现示例：</h5>
                      <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`import numpy as np
from scipy.spatial import KDTree

class RRT:
    def __init__(self, start, goal, bounds, obstacles, max_iter=1000):
        self.start = np.array(start)
        self.goal = np.array(goal)
        self.bounds = bounds
        self.obstacles = obstacles
        self.max_iter = max_iter
        self.vertices = [self.start]
        self.parents = {tuple(self.start): None}
        
    def random_state(self):
        """生成随机状态"""
        return np.random.uniform(self.bounds[:, 0], self.bounds[:, 1])
        
    def nearest_vertex(self, state):
        """找到最近的顶点"""
        vertices = np.array(self.vertices)
        tree = KDTree(vertices)
        return self.vertices[tree.query(state)[1]]
        
    def new_state(self, nearest, random_state, step_size):
        """生成新状态"""
        direction = random_state - nearest
        norm = np.linalg.norm(direction)
        if norm > step_size:
            direction = direction / norm * step_size
        return nearest + direction
        
    def is_collision_free(self, state):
        """检查是否发生碰撞"""
        for obstacle in self.obstacles:
            if np.linalg.norm(state - obstacle) < obstacle.radius:
                return False
        return True
        
    def plan(self):
        """规划路径"""
        for _ in range(self.max_iter):
            # 随机采样
            if np.random.random() < 0.1:
                random_state = self.goal
            else:
                random_state = self.random_state()
                
            # 找到最近顶点
            nearest = self.nearest_vertex(random_state)
            
            # 生成新状态
            new_state = self.new_state(nearest, random_state, 0.5)
            
            # 检查是否发生碰撞
            if not self.is_collision_free(new_state):
                continue
                
            # 添加新顶点
            self.vertices.append(new_state)
            self.parents[tuple(new_state)] = tuple(nearest)
            
            # 检查是否到达目标
            if np.linalg.norm(new_state - self.goal) < 0.5:
                return self.reconstruct_path(new_state)
                
        return None
        
    def reconstruct_path(self, state):
        """重建路径"""
        path = [state]
        while state is not None:
            state = self.parents[tuple(state)]
            if state is not None:
                path.append(state)
        return path[::-1]`}
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
              <h3 className="text-xl font-semibold mb-3">高级路径规划算法</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. PRM算法</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      概率路线图(PRM)算法通过构建路线图来规划路径，
                      适用于复杂环境中的路径规划。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">算法特点</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>构建路线图</li>
                        <li>适用于复杂环境</li>
                        <li>可重用路线图</li>
                        <li>支持多查询</li>
                      </ul>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mt-4">
                      <h5 className="font-semibold mb-2">Python实现示例：</h5>
                      <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`import numpy as np
from scipy.spatial import KDTree

class PRM:
    def __init__(self, bounds, obstacles, num_samples=1000):
        self.bounds = bounds
        self.obstacles = obstacles
        self.num_samples = num_samples
        self.vertices = []
        self.edges = {}
        
    def sample_configuration(self):
        """采样配置空间"""
        while True:
            q = np.random.uniform(self.bounds[:, 0], self.bounds[:, 1])
            if self.is_collision_free(q):
                return q
                
    def is_collision_free(self, q):
        """检查配置是否无碰撞"""
        for obstacle in self.obstacles:
            if np.linalg.norm(q - obstacle.center) < obstacle.radius:
                return False
        return True
        
    def build_roadmap(self):
        """构建路线图"""
        # 采样顶点
        for _ in range(self.num_samples):
            q = self.sample_configuration()
            self.vertices.append(q)
            
        # 构建KD树
        tree = KDTree(self.vertices)
        
        # 连接顶点
        for i, q in enumerate(self.vertices):
            # 找到k个最近邻
            distances, indices = tree.query(q, k=10)
            
            # 添加边
            self.edges[i] = []
            for j in indices[1:]:  # 跳过自身
                if self.is_path_collision_free(q, self.vertices[j]):
                    self.edges[i].append(j)
                    
    def is_path_collision_free(self, q1, q2, num_checks=10):
        """检查路径是否无碰撞"""
        for i in range(num_checks):
            t = i / (num_checks - 1)
            q = (1 - t) * q1 + t * q2
            if not self.is_collision_free(q):
                return False
        return True
        
    def find_path(self, start, goal):
        """寻找路径"""
        # 添加起点和终点
        self.vertices.append(start)
        self.vertices.append(goal)
        start_idx = len(self.vertices) - 2
        goal_idx = len(self.vertices) - 1
        
        # 连接起点和终点
        tree = KDTree(self.vertices[:-2])
        for idx in [start_idx, goal_idx]:
            distances, indices = tree.query(self.vertices[idx], k=10)
            self.edges[idx] = []
            for j in indices:
                if self.is_path_collision_free(self.vertices[idx], self.vertices[j]):
                    self.edges[idx].append(j)
                    if j not in self.edges:
                        self.edges[j] = []
                    self.edges[j].append(idx)
                    
        # 使用A*算法寻找路径
        return self.astar(start_idx, goal_idx)
        
    def astar(self, start_idx, goal_idx):
        """A*算法"""
        frontier = [(0, start_idx)]
        came_from = {start_idx: None}
        cost_so_far = {start_idx: 0}
        
        while frontier:
            current = frontier.pop(0)[1]
            
            if current == goal_idx:
                break
                
            for next_idx in self.edges[current]:
                new_cost = cost_so_far[current] + np.linalg.norm(
                    self.vertices[current] - self.vertices[next_idx])
                    
                if next_idx not in cost_so_far or new_cost < cost_so_far[next_idx]:
                    cost_so_far[next_idx] = new_cost
                    priority = new_cost + np.linalg.norm(
                        self.vertices[next_idx] - self.vertices[goal_idx])
                    frontier.append((priority, next_idx))
                    came_from[next_idx] = current
                    
        # 重建路径
        path = []
        current = goal_idx
        while current is not None:
            path.append(self.vertices[current])
            current = came_from[current]
        return path[::-1]`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 动态路径规划</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      动态路径规划算法能够处理动态环境中的路径规划问题，
                      包括障碍物移动和机器人运动约束。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">算法特点</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>实时更新路径</li>
                        <li>处理动态障碍物</li>
                        <li>考虑运动约束</li>
                        <li>平滑轨迹生成</li>
                      </ul>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mt-4">
                      <h5 className="font-semibold mb-2">Python实现示例：</h5>
                      <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`import numpy as np
from scipy.optimize import minimize

class DynamicPathPlanner:
    def __init__(self, robot, obstacles):
        self.robot = robot
        self.obstacles = obstacles
        
    def predict_obstacle_positions(self, t):
        """预测障碍物位置"""
        positions = []
        for obstacle in self.obstacles:
            pos = obstacle.predict_position(t)
            positions.append(pos)
        return positions
        
    def collision_cost(self, path, t):
        """计算碰撞代价"""
        cost = 0
        obstacle_positions = self.predict_obstacle_positions(t)
        
        for i in range(len(path) - 1):
            p1, p2 = path[i], path[i + 1]
            for obs_pos in obstacle_positions:
                # 计算线段到障碍物的距离
                dist = self.distance_to_segment(p1, p2, obs_pos)
                if dist < self.robot.radius + obstacle.radius:
                    cost += (self.robot.radius + obstacle.radius - dist) ** 2
                    
        return cost
        
    def distance_to_segment(self, p1, p2, p):
        """计算点到线段的距离"""
        v = p2 - p1
        w = p - p1
        
        # 计算投影
        t = np.dot(w, v) / np.dot(v, v)
        t = max(0, min(1, t))
        
        # 计算最近点
        projection = p1 + t * v
        
        # 返回距离
        return np.linalg.norm(p - projection)
        
    def smoothness_cost(self, path):
        """计算平滑度代价"""
        cost = 0
        for i in range(1, len(path) - 1):
            v1 = path[i] - path[i-1]
            v2 = path[i+1] - path[i]
            cost += np.linalg.norm(v2 - v1) ** 2
        return cost
        
    def optimize_path(self, initial_path, t):
        """优化路径"""
        def objective(x):
            path = x.reshape(-1, 2)
            return (self.collision_cost(path, t) + 
                    0.1 * self.smoothness_cost(path))
                    
        # 优化
        result = minimize(
            objective,
            initial_path.flatten(),
            method='SLSQP',
            bounds=[(0, 100) for _ in range(len(initial_path.flatten()))]
        )
        
        return result.x.reshape(-1, 2)
        
    def plan_path(self, start, goal, t):
        """规划路径"""
        # 初始路径
        initial_path = np.linspace(start, goal, 10)
        
        # 优化路径
        path = self.optimize_path(initial_path, t)
        
        return path`}
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
                  <h4 className="font-semibold mb-2">1. 工业机器人应用</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      工业机器人路径规划需要考虑工作空间约束、
                      运动学约束和任务要求。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">应用场景</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>焊接路径规划</li>
                        <li>喷涂路径规划</li>
                        <li>装配路径规划</li>
                        <li>物料搬运路径规划</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 移动机器人应用</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      移动机器人路径规划需要考虑环境地图、
                      动态障碍物和运动学约束。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">应用场景</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>室内导航</li>
                        <li>室外导航</li>
                        <li>多机器人协同</li>
                        <li>动态避障</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 无人机应用</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      无人机路径规划需要考虑三维空间、
                      能量约束和通信要求。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">应用场景</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>航拍路径规划</li>
                        <li>巡检路径规划</li>
                        <li>编队飞行</li>
                        <li>自主导航</li>
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
          href="/study/ai/robot/kinematics"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回运动学与动力学
        </Link>
        <Link 
          href="/study/ai/robot/control"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          机器人控制 →
        </Link>
      </div>
    </div>
  );
} 
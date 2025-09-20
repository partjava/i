'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RobotNavigationPage() {
  const [activeTab, setActiveTab] = useState('basic');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'basic', label: '导航基础' },
    { id: 'localization', label: '定位技术' },
    { id: 'mapping', label: '环境建图' },
    { id: 'planning', label: '路径规划' }
  ];

  const toggleContent = (contentId: string) => {
    setExpandedContent(expandedContent === contentId ? null : contentId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">机器人导航</h1>
      
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
              <h3 className="text-xl font-semibold mb-3">导航基础</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 机器人导航概述</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      机器人导航是机器人自主运动的核心技术，包括定位、建图、路径规划等环节。
                      导航系统使机器人能够在未知环境中自主移动，完成特定任务。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">导航系统组成</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>定位系统：确定机器人位置</li>
                        <li>建图系统：构建环境地图</li>
                        <li>路径规划：规划运动路径</li>
                        <li>运动控制：执行运动指令</li>
                      </ul>
                    </div>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">代码示例：ROS导航系统</h5>
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`#!/usr/bin/env python
import rospy
from nav_msgs.msg import Odometry
from geometry_msgs.msg import Twist
from sensor_msgs.msg import LaserScan

class RobotNavigation:
    def __init__(self):
        rospy.init_node('robot_navigation')
        self.odom_sub = rospy.Subscriber('/odom', Odometry, self.odom_callback)
        self.scan_sub = rospy.Subscriber('/scan', LaserScan, self.scan_callback)
        self.cmd_vel_pub = rospy.Publisher('/cmd_vel', Twist, queue_size=10)
        
        self.current_pose = None
        self.scan_data = None
        
    def odom_callback(self, msg):
        self.current_pose = msg.pose.pose
        
    def scan_callback(self, msg):
        self.scan_data = msg.ranges
        
    def navigate(self):
        rate = rospy.Rate(10)
        while not rospy.is_shutdown():
            if self.scan_data and self.current_pose:
                # 简单的避障逻辑
                if min(self.scan_data) < 0.5:
                    self.stop_robot()
                else:
                    self.move_forward()
            rate.sleep()
            
    def move_forward(self):
        cmd = Twist()
        cmd.linear.x = 0.5
        self.cmd_vel_pub.publish(cmd)
        
    def stop_robot(self):
        cmd = Twist()
        cmd.linear.x = 0.0
        self.cmd_vel_pub.publish(cmd)

if __name__ == '__main__':
    try:
        nav = RobotNavigation()
        nav.navigate()
    except rospy.ROSInterruptException:
        pass`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 导航传感器</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      导航传感器是机器人感知环境的重要工具，不同类型的传感器具有不同的
                      特性和应用场景。选择合适的传感器对于实现可靠的导航至关重要。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">常见导航传感器</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>激光雷达：获取环境点云数据</li>
                        <li>摄像头：获取图像信息</li>
                        <li>IMU：测量加速度和角速度</li>
                        <li>GPS：获取全局位置信息</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 导航系统架构</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      导航系统的架构设计需要考虑实时性、可靠性和可扩展性等因素。
                      合理的系统架构可以提高导航系统的性能和稳定性。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">系统架构特点</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>模块化设计：便于维护和扩展</li>
                        <li>实时性：满足控制需求</li>
                        <li>可靠性：保证系统稳定运行</li>
                        <li>可扩展性：支持新功能添加</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'localization' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">定位技术</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 定位方法</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      定位是确定机器人在环境中的位置和姿态的过程。不同的定位方法
                      适用于不同的应用场景，选择合适的定位方法对于实现可靠的导航至关重要。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">常见定位方法</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>GPS定位：适用于室外环境</li>
                        <li>视觉定位：基于图像特征</li>
                        <li>激光定位：基于点云匹配</li>
                        <li>惯性定位：基于IMU数据</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. SLAM技术</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      SLAM（同时定位与地图构建）是机器人导航的核心技术，通过传感器数据
                      同时实现定位和建图。SLAM技术广泛应用于室内导航、自动驾驶等领域。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">SLAM算法</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>视觉SLAM：基于图像特征</li>
                        <li>激光SLAM：基于点云数据</li>
                        <li>视觉惯性SLAM：结合视觉和IMU</li>
                        <li>激光视觉SLAM：结合激光和视觉</li>
                      </ul>
                    </div>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">代码示例：ORB-SLAM2实现</h5>
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`import cv2
import numpy as np
import g2o
from scipy.spatial import KDTree

class ORBSLAM:
    def __init__(self):
        self.orb = cv2.ORB_create()
        self.bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
        self.keyframes = []
        self.map_points = []
        
    def extract_features(self, frame):
        keypoints, descriptors = self.orb.detectAndCompute(frame, None)
        return keypoints, descriptors
        
    def match_features(self, desc1, desc2):
        matches = self.bf.match(desc1, desc2)
        matches = sorted(matches, key=lambda x: x.distance)
        return matches
        
    def estimate_motion(self, kp1, kp2, matches):
        if len(matches) < 8:
            return None
            
        src_pts = np.float32([kp1[m.queryIdx].pt for m in matches])
        dst_pts = np.float32([kp2[m.trainIdx].pt for m in matches])
        
        E, mask = cv2.findEssentialMat(src_pts, dst_pts, focal=1.0, pp=(0., 0.))
        _, R, t, mask = cv2.recoverPose(E, src_pts, dst_pts)
        
        return R, t
        
    def update_map(self, frame, pose):
        keypoints, descriptors = self.extract_features(frame)
        self.keyframes.append((frame, keypoints, descriptors, pose))
        
        if len(self.keyframes) > 1:
            prev_frame = self.keyframes[-2]
            matches = self.match_features(prev_frame[2], descriptors)
            R, t = self.estimate_motion(prev_frame[1], keypoints, matches)
            
            if R is not None:
                self.update_pose(R, t)`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 定位精度</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      定位精度是评估定位系统性能的重要指标，影响导航的准确性和可靠性。
                      提高定位精度需要综合考虑传感器性能、算法优化等因素。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">提高精度方法</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>传感器融合：结合多种传感器数据</li>
                        <li>算法优化：改进定位算法</li>
                        <li>环境特征：利用环境特征提高精度</li>
                        <li>误差补偿：补偿系统误差</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'mapping' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">环境建图</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 地图类型</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      环境地图是机器人导航的基础，不同类型的地图适用于不同的应用场景。
                      选择合适的地图类型对于实现可靠的导航至关重要。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">常见地图类型</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>栅格地图：适用于室内导航</li>
                        <li>点云地图：适用于3D环境</li>
                        <li>特征地图：适用于视觉导航</li>
                        <li>拓扑地图：适用于路径规划</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 建图方法</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      建图是构建环境地图的过程，不同的建图方法适用于不同的应用场景。
                      选择合适的建图方法对于实现可靠的地图至关重要。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">常见建图方法</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>激光建图：基于点云数据</li>
                        <li>视觉建图：基于图像特征</li>
                        <li>混合建图：结合多种传感器</li>
                        <li>增量建图：动态更新地图</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 地图更新</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      地图更新是保持地图准确性的重要环节，需要处理环境变化、传感器误差等问题。
                      有效的地图更新策略可以提高导航的可靠性。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">更新策略</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>增量更新：动态更新地图</li>
                        <li>全局更新：定期重建地图</li>
                        <li>局部更新：更新变化区域</li>
                        <li>多尺度更新：不同精度更新</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'planning' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">路径规划</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 规划算法</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      路径规划是确定机器人从起点到目标点的运动路径的过程。不同的规划算法
                      适用于不同的应用场景，选择合适的算法对于实现可靠的导航至关重要。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">规划算法</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>A*算法：适用于静态环境</li>
                        <li>Dijkstra算法：适用于最短路径</li>
                        <li>RRT算法：适用于复杂环境</li>
                        <li>PRM算法：适用于高维空间</li>
                      </ul>
                    </div>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">代码示例：A*算法</h5>
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`import numpy as np
from heapq import heappush, heappop

class AStar:
    def __init__(self, grid):
        self.grid = grid
        self.rows, self.cols = grid.shape
        
    def heuristic(self, a, b):
        return np.sqrt((b[0] - a[0]) ** 2 + (b[1] - a[1]) ** 2)
        
    def get_neighbors(self, node):
        neighbors = []
        for i, j in [(0, 1), (1, 0), (0, -1), (-1, 0)]:
            new_i, new_j = node[0] + i, node[1] + j
            if 0 <= new_i < self.rows and 0 <= new_j < self.cols:
                if self.grid[new_i, new_j] == 0:  # 0表示可通行
                    neighbors.append((new_i, new_j))
        return neighbors
        
    def find_path(self, start, goal):
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
                    
        return self.reconstruct_path(came_from, start, goal)
        
    def reconstruct_path(self, came_from, start, goal):
        current = goal
        path = []
        while current is not None:
            path.append(current)
            current = came_from.get(current)
        path.reverse()
        return path if path[0] == start else []`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 动态规划</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      动态规划是处理环境变化和动态障碍物的路径规划方法。动态规划算法
                      需要实时更新路径，适应环境变化。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">动态规划方法</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>D*算法：适用于动态环境</li>
                        <li>LPA*算法：适用于增量更新</li>
                        <li>AD*算法：适用于实时规划</li>
                        <li>RRT*算法：适用于动态障碍物</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 避障策略</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      避障是路径规划中的重要环节，需要处理静态和动态障碍物。有效的避障策略
                      可以提高导航的安全性和可靠性。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">避障方法</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>局部避障：处理动态障碍物</li>
                        <li>全局避障：处理静态障碍物</li>
                        <li>混合避障：结合局部和全局</li>
                        <li>预测避障：预测障碍物运动</li>
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
          href="/study/ai/robot/vision"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回机器人视觉
        </Link>
        <Link 
          href="/study/ai/robot/hci"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          人机交互 →
        </Link>
      </div>
    </div>
  );
} 
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RobotCasesPage() {
  const [activeTab, setActiveTab] = useState('industrial');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'industrial', label: '工业应用' },
    { id: 'service', label: '服务机器人' },
    { id: 'autonomous', label: '自动驾驶' },
    { id: 'research', label: '研究案例' }
  ];

  const toggleContent = (contentId: string) => {
    setExpandedContent(expandedContent === contentId ? null : contentId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">机器人实战案例</h1>
      
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
        {activeTab === 'industrial' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">工业机器人应用</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 工业机器人控制系统</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      工业机器人控制系统是工业自动化的核心，需要实现精确的运动控制、
                      轨迹规划和任务调度。本案例展示了一个基于ROS的工业机器人控制系统。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">代码示例：工业机器人控制</h5>
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`import rospy
from moveit_commander import MoveGroupCommander
from geometry_msgs.msg import Pose
import numpy as np

class IndustrialRobot:
    def __init__(self):
        rospy.init_node('industrial_robot_control')
        self.arm = MoveGroupCommander("manipulator")
        self.gripper = MoveGroupCommander("gripper")
        
    def move_to_position(self, x, y, z):
        pose_target = Pose()
        pose_target.position.x = x
        pose_target.position.y = y
        pose_target.position.z = z
        self.arm.set_pose_target(pose_target)
        self.arm.go(wait=True)
        
    def pick_and_place(self, pick_pose, place_pose):
        # 移动到抓取位置
        self.move_to_position(*pick_pose)
        # 抓取物体
        self.gripper.set_named_target("close")
        self.gripper.go(wait=True)
        # 移动到放置位置
        self.move_to_position(*place_pose)
        # 释放物体
        self.gripper.set_named_target("open")
        self.gripper.go(wait=True)
        
    def execute_trajectory(self, waypoints):
        for point in waypoints:
            self.move_to_position(*point)
            rospy.sleep(0.5)`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 视觉引导装配系统</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      视觉引导装配系统结合了机器视觉和机器人控制，实现高精度的零件装配。
                      系统通过视觉识别零件位置，引导机器人完成装配任务。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">代码示例：视觉引导装配</h5>
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`import cv2
import numpy as np
from industrial_robot import IndustrialRobot

class VisionGuidedAssembly:
    def __init__(self):
        self.robot = IndustrialRobot()
        self.camera = cv2.VideoCapture(0)
        
    def detect_part(self, image):
        # 图像预处理
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        blur = cv2.GaussianBlur(gray, (5, 5), 0)
        
        # 边缘检测
        edges = cv2.Canny(blur, 50, 150)
        
        # 轮廓检测
        contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        # 找到最大轮廓
        if contours:
            max_contour = max(contours, key=cv2.contourArea)
            M = cv2.moments(max_contour)
            if M["m00"] != 0:
                cx = int(M["m10"] / M["m00"])
                cy = int(M["m01"] / M["m00"])
                return (cx, cy)
        return None
        
    def assemble_parts(self):
        while True:
            ret, frame = self.camera.read()
            if not ret:
                break
                
            part_position = self.detect_part(frame)
            if part_position:
                # 转换坐标到机器人坐标系
                robot_x, robot_y = self.transform_coordinates(part_position)
                # 执行装配
                self.robot.pick_and_place(
                    (robot_x, robot_y, 0.1),
                    (robot_x + 0.1, robot_y, 0.1)
                )`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'service' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">服务机器人应用</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 家庭服务机器人</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      家庭服务机器人需要具备环境感知、任务规划和执行能力，能够完成
                      日常家务、陪伴等任务。本案例展示了一个基于ROS的家庭服务机器人系统。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">代码示例：家庭服务机器人</h5>
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`import rospy
from std_msgs.msg import String
from geometry_msgs.msg import Twist
import numpy as np

class HomeServiceRobot:
    def __init__(self):
        rospy.init_node('home_service_robot')
        self.cmd_vel_pub = rospy.Publisher('/cmd_vel', Twist, queue_size=10)
        self.speech_pub = rospy.Publisher('/speech', String, queue_size=10)
        
    def navigate_to_room(self, room_name):
        # 导航到指定房间
        self.speech_pub.publish(f"正在前往{room_name}")
        # 执行导航
        self.execute_navigation(room_name)
        
    def clean_room(self):
        # 执行清洁任务
        self.speech_pub.publish("开始清洁房间")
        # 规划清洁路径
        cleaning_path = self.plan_cleaning_path()
        # 执行清洁
        for point in cleaning_path:
            self.move_to_point(point)
            self.clean_area()
            
    def interact_with_human(self):
        # 人机交互
        self.speech_pub.publish("您好，有什么可以帮您？")
        # 等待语音输入
        response = self.listen_to_human()
        # 处理用户请求
        self.process_request(response)`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'autonomous' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">自动驾驶应用</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 自动驾驶系统</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      自动驾驶系统需要实现环境感知、决策规划和运动控制等功能。
                      本案例展示了一个基于ROS的自动驾驶系统实现。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">代码示例：自动驾驶系统</h5>
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`import rospy
from sensor_msgs.msg import Image, LaserScan
from geometry_msgs.msg import Twist
import cv2
import numpy as np

class AutonomousVehicle:
    def __init__(self):
        rospy.init_node('autonomous_vehicle')
        self.cmd_vel_pub = rospy.Publisher('/cmd_vel', Twist, queue_size=10)
        self.image_sub = rospy.Subscriber('/camera/image', Image, self.image_callback)
        self.scan_sub = rospy.Subscriber('/scan', LaserScan, self.scan_callback)
        
    def image_callback(self, msg):
        # 处理图像数据
        image = self.bridge.imgmsg_to_cv2(msg)
        # 车道线检测
        lanes = self.detect_lanes(image)
        # 交通标志识别
        signs = self.detect_signs(image)
        # 更新控制决策
        self.update_control(lanes, signs)
        
    def scan_callback(self, msg):
        # 处理激光雷达数据
        ranges = msg.ranges
        # 障碍物检测
        obstacles = self.detect_obstacles(ranges)
        # 更新避障策略
        self.update_obstacle_avoidance(obstacles)
        
    def control_vehicle(self):
        rate = rospy.Rate(10)
        while not rospy.is_shutdown():
            # 执行控制命令
            self.execute_control()
            rate.sleep()`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'research' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">研究案例</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 机器人学习系统</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      机器人学习系统通过强化学习等方法，使机器人能够从经验中学习
                      和改进。本案例展示了一个基于深度强化学习的机器人控制系统。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">代码示例：机器人学习系统</h5>
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`import torch
import torch.nn as nn
import numpy as np
import gym

class RobotLearningSystem:
    def __init__(self):
        self.env = gym.make('RobotEnv-v0')
        self.actor = ActorNetwork()
        self.critic = CriticNetwork()
        self.optimizer = torch.optim.Adam(self.actor.parameters())
        
    def train(self, episodes):
        for episode in range(episodes):
            state = self.env.reset()
            done = False
            total_reward = 0
            
            while not done:
                # 选择动作
                action = self.select_action(state)
                # 执行动作
                next_state, reward, done, _ = self.env.step(action)
                # 更新网络
                self.update_networks(state, action, reward, next_state)
                state = next_state
                total_reward += reward
                
            print(f"Episode {episode}, Total Reward: {total_reward}")
            
    def select_action(self, state):
        state = torch.FloatTensor(state)
        action_probs = self.actor(state)
        action = torch.multinomial(action_probs, 1)
        return action.item()
        
    def update_networks(self, state, action, reward, next_state):
        # 计算优势函数
        value = self.critic(state)
        next_value = self.critic(next_state)
        advantage = reward + 0.99 * next_value - value
        
        # 更新策略网络
        action_probs = self.actor(state)
        log_prob = torch.log(action_probs[action])
        loss = -log_prob * advantage
        
        self.optimizer.zero_grad()
        loss.backward()
        self.optimizer.step()`}
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
          href="/study/ai/robot/hci"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回人机交互
        </Link>
        <Link 
          href="/study/ai/robot/interview"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          机器人面试题 →
        </Link>
      </div>
    </div>
  );
} 
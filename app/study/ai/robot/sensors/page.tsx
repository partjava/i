'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RobotSensorsPage() {
  const [activeTab, setActiveTab] = useState('sensors');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'sensors', label: '传感器类型' },
    { id: 'perception', label: '感知算法' },
    { id: 'application', label: '实际应用' }
  ];

  const toggleContent = (contentId: string) => {
    setExpandedContent(expandedContent === contentId ? null : contentId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">传感器与感知</h1>
      
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
        {activeTab === 'sensors' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">传感器类型</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 视觉传感器</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      视觉传感器是机器人感知环境的重要工具，
                      包括相机、深度相机和激光雷达等。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">传感器类型</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>RGB相机：获取彩色图像</li>
                        <li>深度相机：获取深度信息</li>
                        <li>激光雷达：获取3D点云</li>
                        <li>事件相机：高速动态场景</li>
                      </ul>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mt-4">
                      <h5 className="font-semibold mb-2">传感器特性</h5>
                      <svg className="w-full h-48" viewBox="0 0 800 200">
                        <defs>
                          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
                          </marker>
                        </defs>
                        <rect x="50" y="80" width="100" height="40" fill="none" stroke="#666" strokeWidth="2"/>
                        <text x="100" y="105" textAnchor="middle" fill="#666">RGB相机</text>
                        <rect x="250" y="80" width="100" height="40" fill="none" stroke="#666" strokeWidth="2"/>
                        <text x="300" y="105" textAnchor="middle" fill="#666">深度相机</text>
                        <rect x="450" y="80" width="100" height="40" fill="none" stroke="#666" strokeWidth="2"/>
                        <text x="500" y="105" textAnchor="middle" fill="#666">激光雷达</text>
                        <line x1="150" y1="100" x2="250" y2="100" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        <line x1="350" y1="100" x2="450" y2="100" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                        <text x="300" y="170" textAnchor="middle" fill="#666">传感器融合</text>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 力传感器</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      力传感器用于测量机器人与环境之间的相互作用力，
                      实现精确的力控制和交互。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">传感器类型</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>六维力传感器</li>
                        <li>触觉传感器</li>
                        <li>压力传感器</li>
                        <li>力矩传感器</li>
                      </ul>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mt-4">
                      <h5 className="font-semibold mb-2">传感器特性</h5>
                      <svg className="w-full h-48" viewBox="0 0 800 200">
                        <defs>
                          <marker id="arrowhead2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
                          </marker>
                        </defs>
                        <rect x="50" y="80" width="100" height="40" fill="none" stroke="#666" strokeWidth="2"/>
                        <text x="100" y="105" textAnchor="middle" fill="#666">力传感器</text>
                        <rect x="250" y="80" width="100" height="40" fill="none" stroke="#666" strokeWidth="2"/>
                        <text x="300" y="105" textAnchor="middle" fill="#666">控制器</text>
                        <rect x="450" y="80" width="100" height="40" fill="none" stroke="#666" strokeWidth="2"/>
                        <text x="500" y="105" textAnchor="middle" fill="#666">执行器</text>
                        <line x1="150" y1="100" x2="250" y2="100" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead2)"/>
                        <line x1="350" y1="100" x2="450" y2="100" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead2)"/>
                        <line x1="550" y1="100" x2="650" y2="100" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead2)"/>
                        <line x1="650" y1="100" x2="650" y2="150" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead2)"/>
                        <line x1="650" y1="150" x2="50" y2="150" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead2)"/>
                        <text x="350" y="170" textAnchor="middle" fill="#666">力控制回路</text>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 位置传感器</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      位置传感器用于测量机器人的位置和姿态，
                      包括编码器、IMU和GPS等。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">传感器类型</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>编码器：测量关节角度</li>
                        <li>IMU：测量加速度和角速度</li>
                        <li>GPS：测量全局位置</li>
                        <li>磁力计：测量方向</li>
                      </ul>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mt-4">
                      <h5 className="font-semibold mb-2">传感器特性</h5>
                      <svg className="w-full h-48" viewBox="0 0 800 200">
                        <defs>
                          <marker id="arrowhead3" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
                          </marker>
                        </defs>
                        <rect x="50" y="80" width="100" height="40" fill="none" stroke="#666" strokeWidth="2"/>
                        <text x="100" y="105" textAnchor="middle" fill="#666">编码器</text>
                        <rect x="250" y="80" width="100" height="40" fill="none" stroke="#666" strokeWidth="2"/>
                        <text x="300" y="105" textAnchor="middle" fill="#666">IMU</text>
                        <rect x="450" y="80" width="100" height="40" fill="none" stroke="#666" strokeWidth="2"/>
                        <text x="500" y="105" textAnchor="middle" fill="#666">GPS</text>
                        <line x1="150" y1="100" x2="250" y2="100" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead3)"/>
                        <line x1="350" y1="100" x2="450" y2="100" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead3)"/>
                        <text x="300" y="170" textAnchor="middle" fill="#666">位置估计</text>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'perception' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">感知算法</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 视觉感知</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      视觉感知算法用于处理图像和点云数据，
                      实现目标检测、跟踪和场景理解。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">算法类型</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>目标检测</li>
                        <li>目标跟踪</li>
                        <li>场景分割</li>
                        <li>姿态估计</li>
                      </ul>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mt-4">
                      <h5 className="font-semibold mb-2">Python实现示例：</h5>
                      <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`import numpy as np
import cv2

class VisualPerception:
    def __init__(self):
        self.detector = cv2.dnn.readNetFromDarknet(
            'yolov3.cfg', 'yolov3.weights')
        self.classes = []
        with open('coco.names', 'r') as f:
            self.classes = [line.strip() for line in f.readlines()]
            
    def detect_objects(self, image):
        """目标检测"""
        height, width = image.shape[:2]
        blob = cv2.dnn.blobFromImage(
            image, 1/255.0, (416, 416), swapRB=True, crop=False)
            
        self.detector.setInput(blob)
        outputs = self.detector.forward(self.get_output_layers())
        
        boxes = []
        confidences = []
        class_ids = []
        
        for output in outputs:
            for detection in output:
                scores = detection[5:]
                class_id = np.argmax(scores)
                confidence = scores[class_id]
                
                if confidence > 0.5:
                    center_x = int(detection[0] * width)
                    center_y = int(detection[1] * height)
                    w = int(detection[2] * width)
                    h = int(detection[3] * height)
                    
                    x = int(center_x - w/2)
                    y = int(center_y - h/2)
                    
                    boxes.append([x, y, w, h])
                    confidences.append(float(confidence))
                    class_ids.append(class_id)
                    
        indices = cv2.dnn.NMSBoxes(boxes, confidences, 0.5, 0.4)
        
        return boxes, confidences, class_ids
        
    def get_output_layers(self):
        """获取输出层"""
        layer_names = self.detector.getLayerNames()
        return [layer_names[i-1] for i in self.detector.getUnconnectedOutLayers()]`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 力感知</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      力感知算法用于处理力传感器数据，
                      实现力控制和交互控制。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">算法类型</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>力估计</li>
                        <li>接触检测</li>
                        <li>阻抗控制</li>
                        <li>力反馈</li>
                      </ul>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mt-4">
                      <h5 className="font-semibold mb-2">Python实现示例：</h5>
                      <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`import numpy as np

class ForcePerception:
    def __init__(self, robot):
        self.robot = robot
        self.force_threshold = 10.0  # 力阈值
        
    def estimate_contact_force(self, force_sensor_data):
        """估计接触力"""
        # 滤波处理
        filtered_force = self.filter_force(force_sensor_data)
        
        # 接触检测
        is_contact = np.linalg.norm(filtered_force) > self.force_threshold
        
        if is_contact:
            # 计算接触力方向
            force_direction = filtered_force / np.linalg.norm(filtered_force)
            
            # 计算接触点
            contact_point = self.estimate_contact_point(filtered_force)
            
            return {
                'is_contact': True,
                'force': filtered_force,
                'direction': force_direction,
                'point': contact_point
            }
        else:
            return {
                'is_contact': False,
                'force': np.zeros(3),
                'direction': np.zeros(3),
                'point': np.zeros(3)
            }
            
    def filter_force(self, force_data):
        """力数据滤波"""
        # 使用低通滤波器
        alpha = 0.1
        filtered = np.zeros_like(force_data)
        filtered[0] = force_data[0]
        
        for i in range(1, len(force_data)):
            filtered[i] = alpha * force_data[i] + (1 - alpha) * filtered[i-1]
            
        return filtered
        
    def estimate_contact_point(self, force):
        """估计接触点"""
        # 基于机器人运动学和力传感器数据
        # 计算接触点位置
        jacobian = self.robot.jacobian()
        contact_point = np.linalg.pinv(jacobian.T) @ force
        
        return contact_point`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 位置感知</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      位置感知算法用于处理位置传感器数据，
                      实现位置估计和导航。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">算法类型</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>位置估计</li>
                        <li>姿态估计</li>
                        <li>SLAM</li>
                        <li>导航</li>
                      </ul>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg mt-4">
                      <h5 className="font-semibold mb-2">Python实现示例：</h5>
                      <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`import numpy as np
from scipy.spatial.transform import Rotation

class PositionPerception:
    def __init__(self):
        self.position = np.zeros(3)
        self.orientation = Rotation.from_quat([0, 0, 0, 1])
        
    def update_position(self, encoder_data, imu_data, gps_data):
        """更新位置估计"""
        # 处理编码器数据
        joint_angles = self.process_encoder_data(encoder_data)
        
        # 处理IMU数据
        accel, gyro = self.process_imu_data(imu_data)
        
        # 处理GPS数据
        gps_position = self.process_gps_data(gps_data)
        
        # 融合数据
        self.fuse_sensor_data(joint_angles, accel, gyro, gps_position)
        
    def process_encoder_data(self, encoder_data):
        """处理编码器数据"""
        # 将编码器数据转换为关节角度
        joint_angles = encoder_data * self.encoder_resolution
        return joint_angles
        
    def process_imu_data(self, imu_data):
        """处理IMU数据"""
        # 分离加速度和角速度数据
        accel = imu_data[:3]
        gyro = imu_data[3:]
        
        # 应用校准和滤波
        accel = self.calibrate_accel(accel)
        gyro = self.calibrate_gyro(gyro)
        
        return accel, gyro
        
    def process_gps_data(self, gps_data):
        """处理GPS数据"""
        # 转换GPS坐标
        position = self.convert_gps_to_local(gps_data)
        return position
        
    def fuse_sensor_data(self, joint_angles, accel, gyro, gps_position):
        """融合传感器数据"""
        # 使用扩展卡尔曼滤波
        # 预测步骤
        self.predict_state(accel, gyro)
        
        # 更新步骤
        self.update_state(joint_angles, gps_position)
        
    def predict_state(self, accel, gyro):
        """预测状态"""
        # 更新位置
        dt = 0.01  # 时间步长
        self.position += self.velocity * dt + 0.5 * accel * dt**2
        
        # 更新速度
        self.velocity += accel * dt
        
        # 更新姿态
        self.orientation = self.orientation * Rotation.from_rotvec(gyro * dt)
        
    def update_state(self, joint_angles, gps_position):
        """更新状态"""
        # 使用观测数据更新状态估计
        # 这里使用简单的加权平均
        alpha = 0.7
        self.position = alpha * self.position + (1 - alpha) * gps_position`}
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
                      工业机器人需要精确的感知能力，
                      用于定位、检测和装配等任务。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">应用场景</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>视觉引导装配</li>
                        <li>力控制装配</li>
                        <li>质量检测</li>
                        <li>物料搬运</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 移动机器人应用</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      移动机器人需要多传感器融合，
                      实现定位、导航和避障。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">应用场景</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>自主导航</li>
                        <li>环境建图</li>
                        <li>目标跟踪</li>
                        <li>多机器人协同</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 人机交互应用</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      人机交互需要精确的力感知和视觉感知，
                      实现安全和自然的交互。
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
          href="/study/ai/robot/control"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回机器人控制
        </Link>
        <Link 
          href="/study/ai/robot/ros"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          机器人操作系统 →
        </Link>
      </div>
    </div>
  );
} 
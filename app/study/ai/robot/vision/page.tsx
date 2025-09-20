'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RobotVisionPage() {
  const [activeTab, setActiveTab] = useState('basic');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'basic', label: '视觉基础' },
    { id: 'processing', label: '图像处理' },
    { id: 'recognition', label: '目标识别' },
    { id: 'application', label: '实际应用' }
  ];

  const toggleContent = (contentId: string) => {
    setExpandedContent(expandedContent === contentId ? null : contentId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">机器人视觉</h1>
      
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
              <h3 className="text-xl font-semibold mb-3">视觉基础</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 机器人视觉概述</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      机器人视觉是机器人感知环境的重要方式，通过摄像头等视觉传感器获取图像信息，
                      经过处理和分析后，为机器人提供环境感知和决策支持。机器人视觉系统通常包括
                      图像获取、预处理、特征提取、目标识别等环节。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">视觉系统组成</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>视觉传感器：摄像头、深度相机等</li>
                        <li>图像处理单元：CPU、GPU等</li>
                        <li>视觉算法：图像处理、特征提取、目标识别等</li>
                        <li>控制系统：决策、执行等</li>
                      </ul>
                    </div>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">代码示例：OpenCV图像处理</h5>
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`import cv2
import numpy as np

# 读取图像
img = cv2.imread('robot_vision.jpg')

# 图像预处理
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
blur = cv2.GaussianBlur(gray, (5, 5), 0)

# 边缘检测
edges = cv2.Canny(blur, 50, 150)

# 特征提取
sift = cv2.SIFT_create()
keypoints, descriptors = sift.detectAndCompute(gray, None)

# 显示结果
cv2.imshow('Edges', edges)
cv2.waitKey(0)
cv2.destroyAllWindows()`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 视觉传感器</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      视觉传感器是机器人视觉系统的基础，不同类型的传感器具有不同的特性和应用场景。
                      选择合适的视觉传感器对于实现特定的视觉任务至关重要。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">常见视觉传感器</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>RGB摄像头：获取彩色图像</li>
                        <li>深度相机：获取深度信息</li>
                        <li>红外相机：在低光环境下工作</li>
                        <li>激光雷达：获取3D点云数据</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 视觉系统架构</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      机器人视觉系统的架构设计需要考虑实时性、可靠性和可扩展性等因素。
                      合理的系统架构可以提高视觉系统的性能和稳定性。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">系统架构特点</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>模块化设计：便于维护和扩展</li>
                        <li>并行处理：提高处理效率</li>
                        <li>实时性：满足控制需求</li>
                        <li>可靠性：保证系统稳定运行</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'processing' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">图像处理</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 图像预处理</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      图像预处理是视觉系统的基础环节，通过一系列处理步骤提高图像质量，
                      为后续的特征提取和目标识别提供更好的输入。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">预处理步骤</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>图像去噪：去除图像中的噪声</li>
                        <li>图像增强：提高图像对比度和清晰度</li>
                        <li>图像校正：校正图像畸变</li>
                        <li>图像分割：将图像分割为感兴趣区域</li>
                      </ul>
                    </div>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">代码示例：图像预处理</h5>
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`import cv2
import numpy as np

def preprocess_image(image):
    # 图像去噪
    denoised = cv2.fastNlMeansDenoisingColored(image)
    
    # 图像增强
    lab = cv2.cvtColor(denoised, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab)
    clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8,8))
    cl = clahe.apply(l)
    enhanced = cv2.merge((cl,a,b))
    enhanced = cv2.cvtColor(enhanced, cv2.COLOR_LAB2BGR)
    
    # 图像校正
    gray = cv2.cvtColor(enhanced, cv2.COLOR_BGR2GRAY)
    corners = cv2.goodFeaturesToTrack(gray, 25, 0.01, 10)
    corners = np.int0(corners)
    
    return enhanced, corners`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 特征提取</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      特征提取是从图像中提取有用信息的过程，这些特征可以用于目标识别、
                      场景理解等任务。选择合适的特征提取方法对于提高视觉系统的性能至关重要。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">特征类型</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>颜色特征：RGB、HSV等</li>
                        <li>纹理特征：LBP、GLCM等</li>
                        <li>形状特征：轮廓、面积等</li>
                        <li>深度特征：CNN提取的特征</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 图像分析</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      图像分析是对提取的特征进行进一步处理和分析的过程，包括目标检测、
                      跟踪、识别等任务。图像分析的结果为机器人的决策提供依据。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">分析方法</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>目标检测：检测图像中的目标</li>
                        <li>目标跟踪：跟踪目标的运动</li>
                        <li>目标识别：识别目标的类别</li>
                        <li>场景理解：理解场景的语义信息</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'recognition' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">目标识别</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 目标检测</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      目标检测是识别图像中特定目标的位置和类别的过程。现代目标检测算法
                      通常基于深度学习，具有较高的准确性和实时性。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">检测算法</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>YOLO：实时目标检测</li>
                        <li>Faster R-CNN：高精度目标检测</li>
                        <li>SSD：单阶段目标检测</li>
                        <li>RetinaNet：平衡速度和精度</li>
                      </ul>
                    </div>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">代码示例：YOLO目标检测</h5>
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`import cv2
import numpy as np
import torch

# 加载YOLO模型
model = torch.hub.load('ultralytics/yolov5', 'yolov5s')

def detect_objects(image):
    # 执行目标检测
    results = model(image)
    
    # 处理检测结果
    detections = results.xyxy[0].cpu().numpy()
    
    # 绘制检测框
    for det in detections:
        x1, y1, x2, y2, conf, cls = det
        cv2.rectangle(image, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 2)
        cv2.putText(image, f'{model.names[int(cls)]} {conf:.2f}',
                    (int(x1), int(y1)-10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
    
    return image`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 目标跟踪</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      目标跟踪是在视频序列中跟踪目标的位置和运动的过程。目标跟踪算法
                      需要处理目标的外观变化、遮挡等问题。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">跟踪算法</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>SORT：简单在线实时跟踪</li>
                        <li>DeepSORT：基于深度学习的跟踪</li>
                        <li>KCF：核相关滤波器</li>
                        <li>CSRT：判别相关滤波器</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 目标识别</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      目标识别是识别图像中目标的类别的过程。现代目标识别算法通常基于
                      深度学习，具有较高的准确性和泛化能力。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">识别算法</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>CNN：卷积神经网络</li>
                        <li>ResNet：残差网络</li>
                        <li>Inception：多尺度特征提取</li>
                        <li>MobileNet：轻量级网络</li>
                      </ul>
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
                  <h4 className="font-semibold mb-2">1. 工业应用</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      机器人视觉在工业领域有广泛应用，包括质量检测、零件识别、装配等。
                      工业应用对视觉系统的实时性和可靠性有较高要求。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">应用场景</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>质量检测：检测产品缺陷</li>
                        <li>零件识别：识别和分类零件</li>
                        <li>装配：辅助机器人装配</li>
                        <li>物流：分拣和包装</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 服务机器人</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      服务机器人需要与人类交互，视觉系统是其感知环境的重要方式。
                      服务机器人的视觉系统需要处理复杂的环境和动态目标。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">应用场景</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>人机交互：识别和跟踪人类</li>
                        <li>环境感知：理解周围环境</li>
                        <li>任务执行：辅助完成特定任务</li>
                        <li>安全监控：确保安全运行</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 自动驾驶</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      自动驾驶是机器人视觉的重要应用领域，视觉系统需要处理复杂的
                      交通环境和动态目标，确保安全驾驶。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">应用场景</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>道路识别：识别道路和车道</li>
                        <li>障碍物检测：检测车辆和行人</li>
                        <li>交通标志识别：识别交通标志</li>
                        <li>环境感知：理解周围环境</li>
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
          href="/study/ai/robot/ros"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回机器人操作系统
        </Link>
        <Link 
          href="/study/ai/robot/navigation"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          机器人导航 →
        </Link>
      </div>
    </div>
  );
} 
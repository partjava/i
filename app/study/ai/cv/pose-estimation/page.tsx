'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PoseEstimationPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'overview', label: '概述' },
    { id: '2d', label: '2D姿态估计' },
    { id: '3d', label: '3D姿态估计' },
    { id: 'applications', label: '应用场景' },
    { id: 'code', label: '代码示例' }
  ];

  const toggleContent = (contentId: string) => {
    setExpandedContent(expandedContent === contentId ? null : contentId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">姿态估计</h1>
      
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
              <h3 className="text-xl font-semibold mb-3">姿态估计概述</h3>
              <div className="prose max-w-none">
                <p className="mb-4">
                  姿态估计是计算机视觉中的重要任务，旨在从图像或视频中估计人体或物体的空间位置和姿态。
                  根据输出维度的不同，可以分为2D姿态估计和3D姿态估计。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-semibold mb-2">主要任务：</h4>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>关键点检测：定位身体关键点</li>
                      <li>骨架估计：连接关键点形成骨架</li>
                      <li>姿态分析：理解动作和姿态</li>
                      <li>3D重建：估计3D空间中的姿态</li>
                    </ul>
                  </div>
                  <div className="relative h-48">
                    <svg viewBox="0 0 300 200" className="w-full h-full">
                      {/* 姿态估计示意图 */}
                      <rect x="50" y="50" width="200" height="100" fill="#f0f0f0" stroke="#333" strokeWidth="2"/>
                      <circle cx="150" cy="75" r="5" fill="#4a90e2"/>
                      <circle cx="120" cy="100" r="5" fill="#4a90e2"/>
                      <circle cx="180" cy="100" r="5" fill="#4a90e2"/>
                      <line x1="150" y1="75" x2="120" y2="100" stroke="#333" strokeWidth="2"/>
                      <line x1="150" y1="75" x2="180" y2="100" stroke="#333" strokeWidth="2"/>
                      <text x="140" y="70" className="text-sm">2D/3D</text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">技术挑战</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="list-disc pl-6 space-y-2">
                  <li>遮挡问题
                    <ul className="list-disc pl-6 mt-2">
                      <li>自遮挡</li>
                      <li>物体遮挡</li>
                      <li>多人遮挡</li>
                    </ul>
                  </li>
                  <li>姿态多样性
                    <ul className="list-disc pl-6 mt-2">
                      <li>复杂动作</li>
                      <li>快速运动</li>
                      <li>极端姿态</li>
                    </ul>
                  </li>
                  <li>环境因素
                    <ul className="list-disc pl-6 mt-2">
                      <li>光照变化</li>
                      <li>背景干扰</li>
                      <li>视角变化</li>
                    </ul>
                  </li>
                  <li>实时性要求
                    <ul className="list-disc pl-6 mt-2">
                      <li>计算效率</li>
                      <li>延迟控制</li>
                      <li>资源限制</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === '2d' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">传统方法</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">基于图形模型</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Pictorial Structures
                      <ul className="list-disc pl-6 mt-2">
                        <li>部件检测</li>
                        <li>空间关系建模</li>
                        <li>图模型推理</li>
                      </ul>
                    </li>
                    <li>Deformable Part Models
                      <ul className="list-disc pl-6 mt-2">
                        <li>可变形部件</li>
                        <li>空间约束</li>
                        <li>结构预测</li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">基于回归</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>随机森林
                      <ul className="list-disc pl-6 mt-2">
                        <li>特征提取</li>
                        <li>回归预测</li>
                        <li>级联回归</li>
                      </ul>
                    </li>
                    <li>深度回归
                      <ul className="list-disc pl-6 mt-2">
                        <li>CNN特征</li>
                        <li>坐标回归</li>
                        <li>多任务学习</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">深度学习方法</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="list-disc pl-6 space-y-2">
                  <li>基于热图
                    <ul className="list-disc pl-6 mt-2">
                      <li>Stacked Hourglass</li>
                      <li>HRNet</li>
                      <li>CPN</li>
                    </ul>
                  </li>
                  <li>基于回归
                    <ul className="list-disc pl-6 mt-2">
                      <li>DeepPose</li>
                      <li>DensePose</li>
                      <li>OpenPose</li>
                    </ul>
                  </li>
                  <li>混合方法
                    <ul className="list-disc pl-6 mt-2">
                      <li>热图+回归</li>
                      <li>多尺度特征</li>
                      <li>注意力机制</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === '3d' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">单目3D姿态估计</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">基于模型</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>SMPL模型
                      <ul className="list-disc pl-6 mt-2">
                        <li>参数化人体模型</li>
                        <li>姿态参数估计</li>
                        <li>形状参数估计</li>
                      </ul>
                    </li>
                    <li>骨架模型
                      <ul className="list-disc pl-6 mt-2">
                        <li>关节角度估计</li>
                        <li>骨骼长度约束</li>
                        <li>运动学约束</li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">基于学习</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>端到端方法
                      <ul className="list-disc pl-6 mt-2">
                        <li>直接回归</li>
                        <li>多任务学习</li>
                        <li>自监督学习</li>
                      </ul>
                    </li>
                    <li>两阶段方法
                      <ul className="list-disc pl-6 mt-2">
                        <li>2D检测</li>
                        <li>3D重建</li>
                        <li>优化后处理</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">多视角方法</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="list-disc pl-6 space-y-2">
                  <li>多相机系统
                    <ul className="list-disc pl-6 mt-2">
                      <li>相机标定</li>
                      <li>三角测量</li>
                      <li>多视角融合</li>
                    </ul>
                  </li>
                  <li>深度相机
                    <ul className="list-disc pl-6 mt-2">
                      <li>深度信息</li>
                      <li>点云处理</li>
                      <li>实时跟踪</li>
                    </ul>
                  </li>
                  <li>混合方法
                    <ul className="list-disc pl-6 mt-2">
                      <li>RGB-D融合</li>
                      <li>多模态学习</li>
                      <li>传感器融合</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">应用领域</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">人机交互</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>动作控制
                      <ul className="list-disc pl-6 mt-2">
                        <li>手势识别</li>
                        <li>体感游戏</li>
                        <li>虚拟现实</li>
                      </ul>
                    </li>
                    <li>行为分析
                      <ul className="list-disc pl-6 mt-2">
                        <li>动作识别</li>
                        <li>姿态评估</li>
                        <li>异常检测</li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">医疗健康</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>康复训练
                      <ul className="list-disc pl-6 mt-2">
                        <li>动作指导</li>
                        <li>姿态纠正</li>
                        <li>进度评估</li>
                      </ul>
                    </li>
                    <li>运动分析
                      <ul className="list-disc pl-6 mt-2">
                        <li>运动捕捉</li>
                        <li>生物力学</li>
                        <li>运动评估</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">其他应用</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="list-disc pl-6 space-y-2">
                  <li>安防监控
                    <ul className="list-disc pl-6 mt-2">
                      <li>行为分析</li>
                      <li>异常检测</li>
                      <li>人数统计</li>
                    </ul>
                  </li>
                  <li>智能零售
                    <ul className="list-disc pl-6 mt-2">
                      <li>顾客行为</li>
                      <li>商品交互</li>
                      <li>客流分析</li>
                    </ul>
                  </li>
                  <li>体育分析
                    <ul className="list-disc pl-6 mt-2">
                      <li>动作分析</li>
                      <li>技术评估</li>
                      <li>训练指导</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">OpenPose示例</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  <code>{`# 导入必要的库
import cv2
import numpy as np
from openpose import OpenPose

# 初始化OpenPose
op = OpenPose()

# 读取图像
image = cv2.imread('person.jpg')

# 进行姿态估计
keypoints = op.detect(image)

# 绘制骨架
def draw_skeleton(image, keypoints):
    # 定义骨架连接
    skeleton = [
        [0,1], [1,2], [2,3], [3,4],  # 右臂
        [0,5], [5,6], [6,7], [7,8],  # 左臂
        [0,9], [9,10], [10,11], [11,12],  # 右腿
        [0,13], [13,14], [14,15], [15,16]  # 左腿
    ]
    
    # 绘制关键点
    for point in keypoints:
        x, y = point
        cv2.circle(image, (int(x), int(y)), 4, (0, 255, 0), -1)
    
    # 绘制骨架连接
    for connection in skeleton:
        start_point = keypoints[connection[0]]
        end_point = keypoints[connection[1]]
        cv2.line(image, 
                (int(start_point[0]), int(start_point[1])),
                (int(end_point[0]), int(end_point[1])),
                (0, 255, 0), 2)
    
    return image

# 绘制结果
result = draw_skeleton(image.copy(), keypoints)

# 显示结果
cv2.imshow('Pose Estimation', result)
cv2.waitKey(0)
cv2.destroyAllWindows()`}</code>
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">3D姿态估计示例</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  <code>{`# 导入必要的库
import torch
import torch.nn as nn
import torchvision.models as models

class Pose3DNet(nn.Module):
    def __init__(self, num_joints=17):
        super().__init__()
        # 使用ResNet作为特征提取器
        resnet = models.resnet50(pretrained=True)
        self.features = nn.Sequential(*list(resnet.children())[:-1])
        
        # 3D姿态回归头
        self.pose_head = nn.Sequential(
            nn.Linear(2048, 1024),
            nn.ReLU(),
            nn.Dropout(0.5),
            nn.Linear(1024, num_joints * 3)  # 每个关节3个坐标
        )
        
    def forward(self, x):
        # 提取特征
        features = self.features(x)
        features = features.view(features.size(0), -1)
        
        # 预测3D姿态
        pose_3d = self.pose_head(features)
        pose_3d = pose_3d.view(-1, 17, 3)  # 重塑为关节数x3的格式
        
        return pose_3d

# 训练函数
def train_pose3d(model, train_loader, criterion, optimizer):
    model.train()
    for batch_idx, (data, target) in enumerate(train_loader):
        optimizer.zero_grad()
        output = model(data)
        loss = criterion(output, target)
        loss.backward()
        optimizer.step()
        
        if batch_idx % 100 == 0:
            print(f'Train Epoch: {epoch} [{batch_idx}/{len(train_loader)}] '
                  f'Loss: {loss.item():.6f}')

# 评估函数
def evaluate_pose3d(model, test_loader):
    model.eval()
    total_error = 0
    with torch.no_grad():
        for data, target in test_loader:
            output = model(data)
            # 计算MPJPE (Mean Per Joint Position Error)
            error = torch.norm(output - target, dim=2).mean()
            total_error += error.item()
    
    return total_error / len(test_loader)`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/ai/cv/face-recognition"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回人脸识别
        </Link>
        <Link 
          href="/study/ai/cv/video-analysis"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          视频分析 →
        </Link>
      </div>
    </div>
  );
} 
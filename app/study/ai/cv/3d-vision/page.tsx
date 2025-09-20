'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ThreeDVisionPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'overview', label: '概述' },
    { id: 'reconstruction', label: '3D重建' },
    { id: 'depth', label: '深度估计' },
    { id: 'pointcloud', label: '点云处理' },
    { id: 'code', label: '代码示例' }
  ];

  const toggleContent = (contentId: string) => {
    setExpandedContent(expandedContent === contentId ? null : contentId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">3D视觉</h1>
      
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
              <h3 className="text-xl font-semibold mb-3">3D视觉概述</h3>
              <div className="prose max-w-none">
                <p className="mb-4">
                  3D视觉是计算机视觉的重要分支，致力于从2D图像或视频中恢复和理解3D场景信息。
                  它结合了几何学、光学和计算机图形学等多个领域的知识。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-semibold mb-2">主要任务：</h4>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>3D重建：从多视角图像重建3D场景</li>
                      <li>深度估计：估计场景的深度信息</li>
                      <li>点云处理：处理和分析3D点云数据</li>
                      <li>3D目标检测：检测和识别3D空间中的物体</li>
                    </ul>
                  </div>
                  <div className="relative h-48">
                    <svg viewBox="0 0 300 200" className="w-full h-full">
                      {/* 3D视觉示意图 */}
                      <rect x="50" y="50" width="200" height="100" fill="#f0f0f0" stroke="#333" strokeWidth="2"/>
                      <path d="M50,50 L150,30 L250,50 L250,150 L150,170 L50,150 Z" fill="#4a90e2" opacity="0.3"/>
                      <line x1="50" y1="50" x2="150" y2="30" stroke="#333" strokeWidth="2"/>
                      <line x1="150" y1="30" x2="250" y2="50" stroke="#333" strokeWidth="2"/>
                      <text x="120" y="100" className="text-sm">3D重建</text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">技术挑战</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="list-disc pl-6 space-y-2">
                  <li>几何约束
                    <ul className="list-disc pl-6 mt-2">
                      <li>相机标定</li>
                      <li>多视角几何</li>
                      <li>尺度一致性</li>
                    </ul>
                  </li>
                  <li>数据获取
                    <ul className="list-disc pl-6 mt-2">
                      <li>传感器噪声</li>
                      <li>数据缺失</li>
                      <li>分辨率限制</li>
                    </ul>
                  </li>
                  <li>计算效率
                    <ul className="list-disc pl-6 mt-2">
                      <li>实时处理</li>
                      <li>大规模数据</li>
                      <li>资源优化</li>
                    </ul>
                  </li>
                  <li>应用需求
                    <ul className="list-disc pl-6 mt-2">
                      <li>精度要求</li>
                      <li>鲁棒性</li>
                      <li>通用性</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reconstruction' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">多视角重建</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">特征匹配</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>特征提取
                      <ul className="list-disc pl-6 mt-2">
                        <li>SIFT特征</li>
                        <li>SURF特征</li>
                        <li>ORB特征</li>
                      </ul>
                    </li>
                    <li>匹配策略
                      <ul className="list-disc pl-6 mt-2">
                        <li>最近邻匹配</li>
                        <li>比率测试</li>
                        <li>几何验证</li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">三角测量</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>相机位姿
                      <ul className="list-disc pl-6 mt-2">
                        <li>本质矩阵</li>
                        <li>基础矩阵</li>
                        <li>PnP问题</li>
                      </ul>
                    </li>
                    <li>点云生成
                      <ul className="list-disc pl-6 mt-2">
                        <li>三角化</li>
                        <li>深度估计</li>
                        <li>点云优化</li>
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
                  <li>端到端重建
                    <ul className="list-disc pl-6 mt-2">
                      <li>MVSNet</li>
                      <li>DenseFusion</li>
                      <li>NeRF</li>
                    </ul>
                  </li>
                  <li>混合方法
                    <ul className="list-disc pl-6 mt-2">
                      <li>传统+深度学习</li>
                      <li>多阶段处理</li>
                      <li>自适应融合</li>
                    </ul>
                  </li>
                  <li>优化策略
                    <ul className="list-disc pl-6 mt-2">
                      <li>几何约束</li>
                      <li>光度一致性</li>
                      <li>正则化</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'depth' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">单目深度估计</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">传统方法</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>基于线索
                      <ul className="list-disc pl-6 mt-2">
                        <li>纹理梯度</li>
                        <li>遮挡关系</li>
                        <li>相对大小</li>
                      </ul>
                    </li>
                    <li>基于学习
                      <ul className="list-disc pl-6 mt-2">
                        <li>MRF模型</li>
                        <li>CRF模型</li>
                        <li>结构化预测</li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">深度学习方法</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>监督学习
                      <ul className="list-disc pl-6 mt-2">
                        <li>深度网络</li>
                        <li>多尺度特征</li>
                        <li>损失函数</li>
                      </ul>
                    </li>
                    <li>自监督学习
                      <ul className="list-disc pl-6 mt-2">
                        <li>光度一致性</li>
                        <li>几何约束</li>
                        <li>多视角监督</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">立体视觉</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="list-disc pl-6 space-y-2">
                  <li>立体匹配
                    <ul className="list-disc pl-6 mt-2">
                      <li>局部方法</li>
                      <li>全局方法</li>
                      <li>半全局方法</li>
                    </ul>
                  </li>
                  <li>深度相机
                    <ul className="list-disc pl-6 mt-2">
                      <li>结构光</li>
                      <li>飞行时间</li>
                      <li>双目相机</li>
                    </ul>
                  </li>
                  <li>应用场景
                    <ul className="list-disc pl-6 mt-2">
                      <li>AR/VR</li>
                      <li>机器人导航</li>
                      <li>3D扫描</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pointcloud' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">点云处理</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">预处理</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>降噪滤波
                      <ul className="list-disc pl-6 mt-2">
                        <li>统计滤波</li>
                        <li>半径滤波</li>
                        <li>体素滤波</li>
                      </ul>
                    </li>
                    <li>配准对齐
                      <ul className="list-disc pl-6 mt-2">
                        <li>ICP算法</li>
                        <li>NDT算法</li>
                        <li>特征匹配</li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">特征提取</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>局部特征
                      <ul className="list-disc pl-6 mt-2">
                        <li>FPFH</li>
                        <li>SHOT</li>
                        <li>Spin Image</li>
                      </ul>
                    </li>
                    <li>全局特征
                      <ul className="list-disc pl-6 mt-2">
                        <li>VFH</li>
                        <li>ESF</li>
                        <li>3D Shape Context</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">深度学习应用</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="list-disc pl-6 space-y-2">
                  <li>点云网络
                    <ul className="list-disc pl-6 mt-2">
                      <li>PointNet</li>
                      <li>PointNet++</li>
                      <li>DGCNN</li>
                    </ul>
                  </li>
                  <li>应用任务
                    <ul className="list-disc pl-6 mt-2">
                      <li>分类</li>
                      <li>分割</li>
                      <li>配准</li>
                    </ul>
                  </li>
                  <li>优化方法
                    <ul className="list-disc pl-6 mt-2">
                      <li>数据增强</li>
                      <li>损失函数</li>
                      <li>训练策略</li>
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
              <h3 className="text-xl font-semibold mb-3">3D重建示例</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  <code>{`# 导入必要的库
import cv2
import numpy as np
import open3d as o3d

def reconstruct_3d(images, camera_matrix):
    # 特征提取和匹配
    sift = cv2.SIFT_create()
    keypoints = []
    descriptors = []
    
    for img in images:
        kp, des = sift.detectAndCompute(img, None)
        keypoints.append(kp)
        descriptors.append(des)
    
    # 特征匹配
    matcher = cv2.BFMatcher()
    matches = matcher.knnMatch(descriptors[0], descriptors[1], k=2)
    
    # 筛选好的匹配点
    good_matches = []
    for m, n in matches:
        if m.distance < 0.75 * n.distance:
            good_matches.append(m)
    
    # 获取匹配点坐标
    pts1 = np.float32([keypoints[0][m.queryIdx].pt for m in good_matches])
    pts2 = np.float32([keypoints[1][m.trainIdx].pt for m in good_matches])
    
    # 计算本质矩阵
    E, mask = cv2.findEssentialMat(pts1, pts2, camera_matrix)
    
    # 恢复相机运动
    _, R, t, mask = cv2.recoverPose(E, pts1, pts2, camera_matrix)
    
    # 三角化
    P1 = np.dot(camera_matrix, np.hstack((np.eye(3), np.zeros((3, 1)))))
    P2 = np.dot(camera_matrix, np.hstack((R, t)))
    
    points_4d = cv2.triangulatePoints(P1, P2, pts1.T, pts2.T)
    points_3d = points_4d[:3, :] / points_4d[3, :]
    
    return points_3d.T

# 创建点云
def create_point_cloud(points_3d, colors):
    pcd = o3d.geometry.PointCloud()
    pcd.points = o3d.utility.Vector3dVector(points_3d)
    pcd.colors = o3d.utility.Vector3dVector(colors)
    return pcd`}</code>
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">深度估计示例</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  <code>{`# 导入必要的库
import torch
import torch.nn as nn
import torchvision.models as models

class DepthNet(nn.Module):
    def __init__(self):
        super().__init__()
        # 使用预训练的ResNet作为编码器
        resnet = models.resnet50(pretrained=True)
        self.encoder = nn.Sequential(*list(resnet.children())[:-2])
        
        # 解码器
        self.decoder = nn.Sequential(
            nn.ConvTranspose2d(2048, 1024, kernel_size=3, stride=2, padding=1, output_padding=1),
            nn.ReLU(),
            nn.ConvTranspose2d(1024, 512, kernel_size=3, stride=2, padding=1, output_padding=1),
            nn.ReLU(),
            nn.ConvTranspose2d(512, 256, kernel_size=3, stride=2, padding=1, output_padding=1),
            nn.ReLU(),
            nn.ConvTranspose2d(256, 128, kernel_size=3, stride=2, padding=1, output_padding=1),
            nn.ReLU(),
            nn.ConvTranspose2d(128, 64, kernel_size=3, stride=2, padding=1, output_padding=1),
            nn.ReLU(),
            nn.Conv2d(64, 1, kernel_size=3, padding=1),
            nn.Sigmoid()
        )
        
    def forward(self, x):
        # 编码
        features = self.encoder(x)
        # 解码
        depth = self.decoder(features)
        return depth

# 损失函数
def depth_loss(pred, target):
    # 梯度损失
    grad_pred_x = torch.abs(pred[:, :, :, :-1] - pred[:, :, :, 1:])
    grad_pred_y = torch.abs(pred[:, :, :-1, :] - pred[:, :, 1:, :])
    grad_target_x = torch.abs(target[:, :, :, :-1] - target[:, :, :, 1:])
    grad_target_y = torch.abs(target[:, :, :-1, :] - target[:, :, 1:, :])
    
    grad_loss = torch.mean(torch.abs(grad_pred_x - grad_target_x) + 
                         torch.abs(grad_pred_y - grad_target_y))
    
    # 深度损失
    depth_loss = torch.mean(torch.abs(pred - target))
    
    return depth_loss + 0.5 * grad_loss`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/ai/cv/video-analysis"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回视频分析
        </Link>
        <Link 
          href="/study/ai/cv/frameworks"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          视觉框架与工具 →
        </Link>
      </div>
    </div>
  );
} 
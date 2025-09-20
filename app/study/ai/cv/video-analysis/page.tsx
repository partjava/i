'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function VideoAnalysisPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'overview', label: '概述' },
    { id: 'processing', label: '视频处理' },
    { id: 'tracking', label: '目标跟踪' },
    { id: 'recognition', label: '行为识别' },
    { id: 'code', label: '代码示例' }
  ];

  const toggleContent = (contentId: string) => {
    setExpandedContent(expandedContent === contentId ? null : contentId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">视频分析</h1>
      
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
              <h3 className="text-xl font-semibold mb-3">视频分析概述</h3>
              <div className="prose max-w-none">
                <p className="mb-4">
                  视频分析是计算机视觉的重要分支，它通过分析视频序列来理解场景、跟踪目标、识别行为等。
                  相比图像分析，视频分析需要考虑时序信息和运动特征。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-semibold mb-2">主要任务：</h4>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>视频预处理：降噪、稳定、增强</li>
                      <li>目标检测：定位视频中的目标</li>
                      <li>目标跟踪：跟踪目标的运动轨迹</li>
                      <li>行为识别：理解目标的动作和行为</li>
                    </ul>
                  </div>
                  <div className="relative h-48">
                    <svg viewBox="0 0 300 200" className="w-full h-full">
                      {/* 视频分析示意图 */}
                      <rect x="50" y="50" width="200" height="100" fill="#f0f0f0" stroke="#333" strokeWidth="2"/>
                      <circle cx="100" cy="100" r="20" fill="#4a90e2" opacity="0.3"/>
                      <circle cx="150" cy="100" r="20" fill="#4a90e2" opacity="0.3"/>
                      <circle cx="200" cy="100" r="20" fill="#4a90e2" opacity="0.3"/>
                      <line x1="100" y1="100" x2="200" y2="100" stroke="#333" strokeWidth="2" strokeDasharray="5,5"/>
                      <text x="120" y="90" className="text-sm">时序分析</text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">技术挑战</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="list-disc pl-6 space-y-2">
                  <li>实时性要求
                    <ul className="list-disc pl-6 mt-2">
                      <li>计算效率</li>
                      <li>延迟控制</li>
                      <li>资源优化</li>
                    </ul>
                  </li>
                  <li>环境变化
                    <ul className="list-disc pl-6 mt-2">
                      <li>光照变化</li>
                      <li>视角变化</li>
                      <li>遮挡问题</li>
                    </ul>
                  </li>
                  <li>目标变化
                    <ul className="list-disc pl-6 mt-2">
                      <li>外观变化</li>
                      <li>尺度变化</li>
                      <li>运动模糊</li>
                    </ul>
                  </li>
                  <li>场景复杂度
                    <ul className="list-disc pl-6 mt-2">
                      <li>多目标交互</li>
                      <li>背景干扰</li>
                      <li>场景切换</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'processing' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">视频预处理</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">图像增强</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>降噪处理
                      <ul className="list-disc pl-6 mt-2">
                        <li>高斯滤波</li>
                        <li>中值滤波</li>
                        <li>非局部均值去噪</li>
                      </ul>
                    </li>
                    <li>图像增强
                      <ul className="list-disc pl-6 mt-2">
                        <li>直方图均衡化</li>
                        <li>对比度增强</li>
                        <li>锐化处理</li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">视频稳定</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>运动估计
                      <ul className="list-disc pl-6 mt-2">
                        <li>光流估计</li>
                        <li>特征匹配</li>
                        <li>运动补偿</li>
                      </ul>
                    </li>
                    <li>稳定处理
                      <ul className="list-disc pl-6 mt-2">
                        <li>运动平滑</li>
                        <li>帧对齐</li>
                        <li>抖动消除</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">视频编码</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="list-disc pl-6 space-y-2">
                  <li>编码标准
                    <ul className="list-disc pl-6 mt-2">
                      <li>H.264/AVC</li>
                      <li>H.265/HEVC</li>
                      <li>AV1</li>
                    </ul>
                  </li>
                  <li>压缩技术
                    <ul className="list-disc pl-6 mt-2">
                      <li>帧内预测</li>
                      <li>帧间预测</li>
                      <li>变换编码</li>
                    </ul>
                  </li>
                  <li>质量评估
                    <ul className="list-disc pl-6 mt-2">
                      <li>PSNR</li>
                      <li>SSIM</li>
                      <li>VMAF</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tracking' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">传统跟踪方法</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">基于相关滤波</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>KCF
                      <ul className="list-disc pl-6 mt-2">
                        <li>循环矩阵</li>
                        <li>核相关</li>
                        <li>快速计算</li>
                      </ul>
                    </li>
                    <li>CSK
                      <ul className="list-disc pl-6 mt-2">
                        <li>密集采样</li>
                        <li>核函数</li>
                        <li>尺度估计</li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">基于粒子滤波</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>粒子采样
                      <ul className="list-disc pl-6 mt-2">
                        <li>状态预测</li>
                        <li>权重更新</li>
                        <li>重采样</li>
                      </ul>
                    </li>
                    <li>观测模型
                      <ul className="list-disc pl-6 mt-2">
                        <li>特征提取</li>
                        <li>相似度计算</li>
                        <li>状态估计</li>
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
                  <li>Siam系列
                    <ul className="list-disc pl-6 mt-2">
                      <li>SiamFC</li>
                      <li>SiamRPN</li>
                      <li>SiamMask</li>
                    </ul>
                  </li>
                  <li>MDNet系列
                    <ul className="list-disc pl-6 mt-2">
                      <li>MDNet</li>
                      <li>RT-MDNet</li>
                      <li>VITAL</li>
                    </ul>
                  </li>
                  <li>Transformer系列
                    <ul className="list-disc pl-6 mt-2">
                      <li>TransT</li>
                      <li>STARK</li>
                      <li>TrDiMP</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'recognition' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">行为识别方法</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">传统方法</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>基于特征
                      <ul className="list-disc pl-6 mt-2">
                        <li>HOG特征</li>
                        <li>光流特征</li>
                        <li>轨迹特征</li>
                      </ul>
                    </li>
                    <li>基于模型
                      <ul className="list-disc pl-6 mt-2">
                        <li>隐马尔可夫模型</li>
                        <li>条件随机场</li>
                        <li>动态贝叶斯网络</li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">深度学习方法</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>CNN系列
                      <ul className="list-disc pl-6 mt-2">
                        <li>3D CNN</li>
                        <li>C3D</li>
                        <li>I3D</li>
                      </ul>
                    </li>
                    <li>RNN系列
                      <ul className="list-disc pl-6 mt-2">
                        <li>LSTM</li>
                        <li>GRU</li>
                        <li>BiLSTM</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">应用场景</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="list-disc pl-6 space-y-2">
                  <li>安防监控
                    <ul className="list-disc pl-6 mt-2">
                      <li>异常行为检测</li>
                      <li>人群行为分析</li>
                      <li>安全预警</li>
                    </ul>
                  </li>
                  <li>智能零售
                    <ul className="list-disc pl-6 mt-2">
                      <li>顾客行为分析</li>
                      <li>商品交互识别</li>
                      <li>客流统计</li>
                    </ul>
                  </li>
                  <li>体育分析
                    <ul className="list-disc pl-6 mt-2">
                      <li>动作识别</li>
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
              <h3 className="text-xl font-semibold mb-3">视频目标跟踪示例</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  <code>{`# 导入必要的库
import cv2
import numpy as np
from siamrpn import SiamRPN

# 初始化跟踪器
tracker = SiamRPN()

# 打开视频
cap = cv2.VideoCapture('video.mp4')

# 读取第一帧
ret, frame = cap.read()
if not ret:
    exit()

# 选择目标区域
bbox = cv2.selectROI('Select Target', frame, False)
tracker.init(frame, bbox)

# 跟踪循环
while True:
    ret, frame = cap.read()
    if not ret:
        break
        
    # 更新跟踪器
    bbox = tracker.update(frame)
    
    # 绘制边界框
    x, y, w, h = [int(v) for v in bbox]
    cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
    
    # 显示结果
    cv2.imshow('Tracking', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()`}</code>
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">行为识别示例</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  <code>{`# 导入必要的库
import torch
import torch.nn as nn
import torchvision.models as models

class ActionRecognitionNet(nn.Module):
    def __init__(self, num_classes):
        super().__init__()
        # 使用3D ResNet作为特征提取器
        self.backbone = models.video.r3d_18(pretrained=True)
        self.backbone.fc = nn.Linear(512, num_classes)
        
    def forward(self, x):
        # 输入形状: (batch_size, channels, frames, height, width)
        return self.backbone(x)

# 数据预处理
def preprocess_video(video_path, num_frames=16):
    frames = []
    cap = cv2.VideoCapture(video_path)
    
    while len(frames) < num_frames:
        ret, frame = cap.read()
        if not ret:
            break
        # 调整大小和归一化
        frame = cv2.resize(frame, (224, 224))
        frame = frame / 255.0
        frames.append(frame)
    
    cap.release()
    
    # 填充或截断到指定帧数
    if len(frames) < num_frames:
        frames.extend([frames[-1]] * (num_frames - len(frames)))
    else:
        frames = frames[:num_frames]
    
    return torch.FloatTensor(frames).permute(3, 0, 1, 2).unsqueeze(0)

# 预测函数
def predict_action(model, video_path):
    model.eval()
    with torch.no_grad():
        # 预处理视频
        video = preprocess_video(video_path)
        # 预测动作
        output = model(video)
        # 获取预测结果
        pred = output.argmax(dim=1).item()
        return pred`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/ai/cv/pose-estimation"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回姿态估计
        </Link>
        <Link 
          href="/study/ai/cv/3d-vision"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          3D视觉 →
        </Link>
      </div>
    </div>
  );
} 
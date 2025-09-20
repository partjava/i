'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ObjectDetectionPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'overview', label: '概述' },
    { id: 'traditional', label: '传统方法' },
    { id: 'deep', label: '深度学习方法' },
    { id: 'code', label: '代码示例' }
  ];

  const toggleContent = (contentId: string) => {
    setExpandedContent(expandedContent === contentId ? null : contentId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">目标检测</h1>
      
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
              <h3 className="text-xl font-semibold mb-3">目标检测概述</h3>
              <div className="prose max-w-none">
                <p className="mb-4">
                  目标检测是计算机视觉中的基础任务，旨在定位和识别图像中的目标对象。
                  它不仅需要识别目标的类别，还需要确定目标在图像中的位置（通常用边界框表示）。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-semibold mb-2">主要任务：</h4>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>目标定位：确定目标位置</li>
                      <li>目标分类：识别目标类别</li>
                      <li>实例分割：像素级目标分割</li>
                    </ul>
                  </div>
                  <div className="relative h-48">
                    <svg viewBox="0 0 300 200" className="w-full h-full">
                      {/* 目标检测示意图 */}
                      <rect x="50" y="50" width="200" height="100" fill="#f0f0f0" stroke="#333" strokeWidth="2"/>
                      <rect x="100" y="70" width="60" height="40" fill="#4a90e2" opacity="0.3" stroke="#4a90e2" strokeWidth="2"/>
                      <text x="110" y="95" className="text-sm">目标</text>
                      <rect x="180" y="80" width="40" height="30" fill="#e24a90" opacity="0.3" stroke="#e24a90" strokeWidth="2"/>
                      <text x="185" y="100" className="text-sm">目标</text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">评估指标</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="list-disc pl-6 space-y-2">
                  <li>IoU（交并比）
                    <ul className="list-disc pl-6 mt-2">
                      <li>预测框与真实框的重叠程度</li>
                      <li>取值范围：0-1</li>
                    </ul>
                  </li>
                  <li>mAP（平均精度均值）
                    <ul className="list-disc pl-6 mt-2">
                      <li>不同IoU阈值下的平均精度</li>
                      <li>综合评估检测性能</li>
                    </ul>
                  </li>
                  <li>FPS（每秒帧数）
                    <ul className="list-disc pl-6 mt-2">
                      <li>检测速度的衡量指标</li>
                      <li>实时性要求</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'traditional' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">传统目标检测方法</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">滑动窗口</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>基本思想：
                      <ul className="list-disc pl-6 mt-2">
                        <li>在图像上滑动固定大小的窗口</li>
                        <li>对每个窗口进行分类</li>
                        <li>合并重叠的检测结果</li>
                      </ul>
                    </li>
                    <li>特点：
                      <ul className="list-disc pl-6 mt-2">
                        <li>计算量大</li>
                        <li>难以处理多尺度目标</li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">选择性搜索</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>基本思想：
                      <ul className="list-disc pl-6 mt-2">
                        <li>基于图像分割生成候选区域</li>
                        <li>合并相似区域</li>
                        <li>提取候选框</li>
                      </ul>
                    </li>
                    <li>特点：
                      <ul className="list-disc pl-6 mt-2">
                        <li>计算效率较高</li>
                        <li>召回率较好</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">经典算法</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Viola-Jones
                    <ul className="list-disc pl-6 mt-2">
                      <li>Haar特征</li>
                      <li>AdaBoost分类器</li>
                      <li>级联结构</li>
                    </ul>
                  </li>
                  <li>HOG+SVM
                    <ul className="list-disc pl-6 mt-2">
                      <li>方向梯度直方图</li>
                      <li>支持向量机分类</li>
                      <li>滑动窗口检测</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'deep' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">深度学习目标检测方法</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">两阶段检测器</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>R-CNN系列
                      <ul className="list-disc pl-6 mt-2">
                        <li>R-CNN：区域提议+CNN分类</li>
                        <li>Fast R-CNN：共享特征提取</li>
                        <li>Faster R-CNN：区域提议网络</li>
                      </ul>
                    </li>
                    <li>特点：
                      <ul className="list-disc pl-6 mt-2">
                        <li>精度高</li>
                        <li>速度相对较慢</li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">单阶段检测器</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>YOLO系列
                      <ul className="list-disc pl-6 mt-2">
                        <li>YOLOv1：端到端检测</li>
                        <li>YOLOv3：多尺度预测</li>
                        <li>YOLOv5：高效实现</li>
                      </ul>
                    </li>
                    <li>特点：
                      <ul className="list-disc pl-6 mt-2">
                        <li>速度快</li>
                        <li>适合实时应用</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">最新进展</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Transformer-based检测器
                    <ul className="list-disc pl-6 mt-2">
                      <li>DETR：端到端目标检测</li>
                      <li>Swin Transformer</li>
                      <li>Deformable DETR</li>
                    </ul>
                  </li>
                  <li>无锚框检测器
                    <ul className="list-disc pl-6 mt-2">
                      <li>FCOS</li>
                      <li>CenterNet</li>
                      <li>CornerNet</li>
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
              <h3 className="text-xl font-semibold mb-3">YOLOv5目标检测示例</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  <code>{`# 安装依赖
pip install torch torchvision
pip install ultralytics

# 导入必要的库
import torch
from ultralytics import YOLO

# 加载预训练模型
model = YOLO('yolov5s.pt')

# 图像检测
results = model('image.jpg')

# 处理检测结果
for result in results:
    boxes = result.boxes
    for box in boxes:
        # 获取边界框坐标
        x1, y1, x2, y2 = box.xyxy[0]
        # 获取置信度
        confidence = box.conf[0]
        # 获取类别
        class_id = box.cls[0]
        class_name = model.names[int(class_id)]
        
        print(f'检测到 {class_name}，置信度：{confidence:.2f}')
        print(f'位置：({x1:.0f}, {y1:.0f}, {x2:.0f}, {y2:.0f})')`}</code>
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Faster R-CNN示例</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  <code>{`# 导入必要的库
import torch
import torchvision
from torchvision.models.detection import fasterrcnn_resnet50_fpn
from torchvision.transforms import functional as F

# 加载预训练模型
model = fasterrcnn_resnet50_fpn(pretrained=True)
model.eval()

# 图像预处理
image = Image.open('image.jpg')
image_tensor = F.to_tensor(image)

# 执行检测
with torch.no_grad():
    prediction = model([image_tensor])

# 处理检测结果
boxes = prediction[0]['boxes']
scores = prediction[0]['scores']
labels = prediction[0]['labels']

# 显示结果
for box, score, label in zip(boxes, scores, labels):
    if score > 0.5:  # 置信度阈值
        print(f'类别：{label}，置信度：{score:.2f}')
        print(f'边界框：{box.tolist()}')`}</code>
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">自定义数据集训练</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  <code>{`# 数据集准备
from torch.utils.data import Dataset
import json

class CustomDataset(Dataset):
    def __init__(self, image_dir, annotation_file):
        self.image_dir = image_dir
        with open(annotation_file, 'r') as f:
            self.annotations = json.load(f)
    
    def __len__(self):
        return len(self.annotations)
    
    def __getitem__(self, idx):
        # 加载图像
        image = Image.open(self.image_dir + self.annotations[idx]['image'])
        # 获取标注
        boxes = torch.tensor(self.annotations[idx]['boxes'])
        labels = torch.tensor(self.annotations[idx]['labels'])
        
        return image, {'boxes': boxes, 'labels': labels}

# 训练配置
def train_one_epoch(model, optimizer, data_loader):
    model.train()
    for images, targets in data_loader:
        loss_dict = model(images, targets)
        losses = sum(loss for loss in loss_dict.values())
        
        optimizer.zero_grad()
        losses.backward()
        optimizer.step()

# 训练循环
num_epochs = 10
for epoch in range(num_epochs):
    train_one_epoch(model, optimizer, train_loader)
    # 验证
    evaluate(model, val_loader)`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/ai/cv/feature-extraction"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回特征提取与匹配
        </Link>
        <Link 
          href="/study/ai/cv/image-segmentation"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          图像分割 →
        </Link>
      </div>
    </div>
  );
} 
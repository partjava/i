'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ImageSegmentationPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'overview', label: '概述' },
    { id: 'traditional', label: '传统方法' },
    { id: 'deep', label: '深度学习方法' },
    { id: 'metrics', label: '评估指标' },
    { id: 'code', label: '代码示例' }
  ];

  const toggleContent = (contentId: string) => {
    setExpandedContent(expandedContent === contentId ? null : contentId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">图像分割</h1>
      
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
              <h3 className="text-xl font-semibold mb-3">图像分割概述</h3>
              <div className="prose max-w-none">
                <p className="mb-4">
                  图像分割是计算机视觉中的基础任务，旨在将图像分割成多个具有语义的区域。
                  根据任务的不同，可以分为语义分割、实例分割和全景分割等。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-semibold mb-2">主要类型：</h4>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>语义分割：为每个像素分配类别标签</li>
                      <li>实例分割：区分同类别的不同实例</li>
                      <li>全景分割：同时进行语义分割和实例分割</li>
                    </ul>
                  </div>
                  <div className="relative h-48">
                    <svg viewBox="0 0 300 200" className="w-full h-full">
                      {/* 图像分割示意图 */}
                      <rect x="50" y="50" width="200" height="100" fill="#f0f0f0" stroke="#333" strokeWidth="2"/>
                      <rect x="50" y="50" width="100" height="100" fill="#4a90e2" opacity="0.3"/>
                      <rect x="150" y="50" width="100" height="50" fill="#e24a90" opacity="0.3"/>
                      <rect x="150" y="100" width="100" height="50" fill="#90e24a" opacity="0.3"/>
                      <text x="75" y="100" className="text-sm">类别1</text>
                      <text x="175" y="75" className="text-sm">类别2</text>
                      <text x="175" y="125" className="text-sm">类别3</text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">应用场景</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="list-disc pl-6 space-y-2">
                  <li>医学图像分析
                    <ul className="list-disc pl-6 mt-2">
                      <li>器官分割</li>
                      <li>病变区域识别</li>
                      <li>细胞分析</li>
                    </ul>
                  </li>
                  <li>自动驾驶
                    <ul className="list-disc pl-6 mt-2">
                      <li>道路场景理解</li>
                      <li>障碍物检测</li>
                      <li>车道线识别</li>
                    </ul>
                  </li>
                  <li>遥感图像处理
                    <ul className="list-disc pl-6 mt-2">
                      <li>土地利用分类</li>
                      <li>建筑物提取</li>
                      <li>植被监测</li>
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
              <h3 className="text-xl font-semibold mb-3">传统分割方法</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">基于阈值的分割</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>基本思想：
                      <ul className="list-disc pl-6 mt-2">
                        <li>设定阈值将图像分为前景和背景</li>
                        <li>全局阈值和局部阈值</li>
                        <li>自适应阈值选择</li>
                      </ul>
                    </li>
                    <li>特点：
                      <ul className="list-disc pl-6 mt-2">
                        <li>计算简单</li>
                        <li>对噪声敏感</li>
                        <li>难以处理复杂场景</li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">基于区域的分割</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>基本思想：
                      <ul className="list-disc pl-6 mt-2">
                        <li>区域生长算法</li>
                        <li>分水岭算法</li>
                        <li>区域合并与分裂</li>
                      </ul>
                    </li>
                    <li>特点：
                      <ul className="list-disc pl-6 mt-2">
                        <li>考虑空间信息</li>
                        <li>计算复杂度较高</li>
                        <li>需要种子点选择</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">基于边缘的分割</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Canny边缘检测
                    <ul className="list-disc pl-6 mt-2">
                      <li>高斯滤波</li>
                      <li>梯度计算</li>
                      <li>非极大值抑制</li>
                      <li>双阈值处理</li>
                    </ul>
                  </li>
                  <li>主动轮廓模型
                    <ul className="list-disc pl-6 mt-2">
                      <li>Snake模型</li>
                      <li>水平集方法</li>
                      <li>能量最小化</li>
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
              <h3 className="text-xl font-semibold mb-3">深度学习分割方法</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">全卷积网络（FCN）</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>网络结构：
                      <ul className="list-disc pl-6 mt-2">
                        <li>编码器-解码器结构</li>
                        <li>跳跃连接</li>
                        <li>转置卷积上采样</li>
                      </ul>
                    </li>
                    <li>特点：
                      <ul className="list-disc pl-6 mt-2">
                        <li>端到端训练</li>
                        <li>任意尺寸输入</li>
                        <li>像素级预测</li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">U-Net</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>网络结构：
                      <ul className="list-disc pl-6 mt-2">
                        <li>U形对称结构</li>
                        <li>多尺度特征融合</li>
                        <li>跳跃连接</li>
                      </ul>
                    </li>
                    <li>特点：
                      <ul className="list-disc pl-6 mt-2">
                        <li>适合医学图像</li>
                        <li>小样本学习</li>
                        <li>精确边界定位</li>
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
                  <li>Transformer-based分割
                    <ul className="list-disc pl-6 mt-2">
                      <li>SETR</li>
                      <li>TransUNet</li>
                      <li>Swin Transformer</li>
                    </ul>
                  </li>
                  <li>实例分割
                    <ul className="list-disc pl-6 mt-2">
                      <li>Mask R-CNN</li>
                      <li>SOLO</li>
                      <li>YOLACT</li>
                    </ul>
                  </li>
                  <li>全景分割
                    <ul className="list-disc pl-6 mt-2">
                      <li>Panoptic FPN</li>
                      <li>UPSNet</li>
                      <li>DETR</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'metrics' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">评估指标</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">像素级指标</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>像素准确率（Pixel Accuracy）
                      <ul className="list-disc pl-6 mt-2">
                        <li>正确分类的像素比例</li>
                        <li>简单直观</li>
                        <li>类别不平衡时不够准确</li>
                      </ul>
                    </li>
                    <li>平均像素准确率（Mean Pixel Accuracy）
                      <ul className="list-disc pl-6 mt-2">
                        <li>各类别像素准确率的平均</li>
                        <li>考虑类别平衡</li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">区域级指标</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>IoU（交并比）
                      <ul className="list-disc pl-6 mt-2">
                        <li>预测区域与真实区域的重叠度</li>
                        <li>取值范围：0-1</li>
                        <li>常用评估指标</li>
                      </ul>
                    </li>
                    <li>mIoU（平均交并比）
                      <ul className="list-disc pl-6 mt-2">
                        <li>各类别IoU的平均值</li>
                        <li>综合评估分割性能</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">实例级指标</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="list-disc pl-6 space-y-2">
                  <li>平均精度（AP）
                    <ul className="list-disc pl-6 mt-2">
                      <li>不同IoU阈值下的精度</li>
                      <li>考虑检测和分割质量</li>
                    </ul>
                  </li>
                  <li>全景质量（PQ）
                    <ul className="list-disc pl-6 mt-2">
                      <li>分割质量（SQ）</li>
                      <li>识别质量（RQ）</li>
                      <li>PQ = SQ × RQ</li>
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
              <h3 className="text-xl font-semibold mb-3">U-Net分割示例</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  <code>{`# 导入必要的库
import torch
import torch.nn as nn
import torch.nn.functional as F

class DoubleConv(nn.Module):
    def __init__(self, in_channels, out_channels):
        super().__init__()
        self.double_conv = nn.Sequential(
            nn.Conv2d(in_channels, out_channels, kernel_size=3, padding=1),
            nn.BatchNorm2d(out_channels),
            nn.ReLU(inplace=True),
            nn.Conv2d(out_channels, out_channels, kernel_size=3, padding=1),
            nn.BatchNorm2d(out_channels),
            nn.ReLU(inplace=True)
        )

    def forward(self, x):
        return self.double_conv(x)

class UNet(nn.Module):
    def __init__(self, n_channels, n_classes):
        super().__init__()
        self.n_channels = n_channels
        self.n_classes = n_classes

        # 编码器
        self.inc = DoubleConv(n_channels, 64)
        self.down1 = nn.Sequential(
            nn.MaxPool2d(2),
            DoubleConv(64, 128)
        )
        self.down2 = nn.Sequential(
            nn.MaxPool2d(2),
            DoubleConv(128, 256)
        )
        self.down3 = nn.Sequential(
            nn.MaxPool2d(2),
            DoubleConv(256, 512)
        )
        self.down4 = nn.Sequential(
            nn.MaxPool2d(2),
            DoubleConv(512, 1024)
        )

        # 解码器
        self.up1 = nn.ConvTranspose2d(1024, 512, kernel_size=2, stride=2)
        self.up_conv1 = DoubleConv(1024, 512)
        self.up2 = nn.ConvTranspose2d(512, 256, kernel_size=2, stride=2)
        self.up_conv2 = DoubleConv(512, 256)
        self.up3 = nn.ConvTranspose2d(256, 128, kernel_size=2, stride=2)
        self.up_conv3 = DoubleConv(256, 128)
        self.up4 = nn.ConvTranspose2d(128, 64, kernel_size=2, stride=2)
        self.up_conv4 = DoubleConv(128, 64)
        
        self.outc = nn.Conv2d(64, n_classes, kernel_size=1)

    def forward(self, x):
        # 编码路径
        x1 = self.inc(x)
        x2 = self.down1(x1)
        x3 = self.down2(x2)
        x4 = self.down3(x3)
        x5 = self.down4(x4)

        # 解码路径
        x = self.up1(x5)
        x = torch.cat([x4, x], dim=1)
        x = self.up_conv1(x)
        
        x = self.up2(x)
        x = torch.cat([x3, x], dim=1)
        x = self.up_conv2(x)
        
        x = self.up3(x)
        x = torch.cat([x2, x], dim=1)
        x = self.up_conv3(x)
        
        x = self.up4(x)
        x = torch.cat([x1, x], dim=1)
        x = self.up_conv4(x)
        
        logits = self.outc(x)
        return logits

# 训练代码
def train_model(model, train_loader, criterion, optimizer, device):
    model.train()
    for batch_idx, (data, target) in enumerate(train_loader):
        data, target = data.to(device), target.to(device)
        optimizer.zero_grad()
        output = model(data)
        loss = criterion(output, target)
        loss.backward()
        optimizer.step()

# 评估代码
def evaluate_model(model, test_loader, criterion, device):
    model.eval()
    test_loss = 0
    correct = 0
    with torch.no_grad():
        for data, target in test_loader:
            data, target = data.to(device), target.to(device)
            output = model(data)
            test_loss += criterion(output, target).item()
            pred = output.argmax(dim=1)
            correct += pred.eq(target).sum().item()
    
    test_loss /= len(test_loader.dataset)
    accuracy = 100. * correct / len(test_loader.dataset)
    return test_loss, accuracy`}</code>
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Mask R-CNN示例</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  <code>{`# 导入必要的库
import torch
import torchvision
from torchvision.models.detection import maskrcnn_resnet50_fpn
from torchvision.transforms import functional as F

# 加载预训练模型
model = maskrcnn_resnet50_fpn(pretrained=True)
model.eval()

# 图像预处理
image = Image.open('image.jpg')
image_tensor = F.to_tensor(image)

# 执行分割
with torch.no_grad():
    prediction = model([image_tensor])

# 处理分割结果
masks = prediction[0]['masks']
scores = prediction[0]['scores']
labels = prediction[0]['labels']

# 显示结果
for mask, score, label in zip(masks, scores, labels):
    if score > 0.5:  # 置信度阈值
        print(f'类别：{label}，置信度：{score:.2f}')
        print(f'掩码形状：{mask.shape}')`}</code>
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">评估指标计算</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  <code>{`def calculate_iou(pred_mask, gt_mask):
    """计算IoU"""
    intersection = np.logical_and(pred_mask, gt_mask).sum()
    union = np.logical_or(pred_mask, gt_mask).sum()
    return intersection / union if union > 0 else 0

def calculate_pixel_accuracy(pred_mask, gt_mask):
    """计算像素准确率"""
    return (pred_mask == gt_mask).mean()

def calculate_mean_iou(pred_masks, gt_masks, num_classes):
    """计算平均IoU"""
    ious = []
    for cls in range(num_classes):
        pred_cls = pred_masks == cls
        gt_cls = gt_masks == cls
        iou = calculate_iou(pred_cls, gt_cls)
        ious.append(iou)
    return np.mean(ious)

def calculate_pq(pred_masks, gt_masks):
    """计算全景质量"""
    # 计算分割质量
    sq = calculate_mean_iou(pred_masks, gt_masks, num_classes)
    # 计算识别质量
    rq = calculate_pixel_accuracy(pred_masks, gt_masks)
    # 计算全景质量
    pq = sq * rq
    return pq`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/ai/cv/object-detection"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回目标检测
        </Link>
        <Link 
          href="/study/ai/cv/face-recognition"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          人脸识别 →
        </Link>
      </div>
    </div>
  );
} 
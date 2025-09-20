'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CasesPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'overview', label: '概述' },
    { id: 'process', label: '项目流程' },
    { id: 'cases', label: '实战案例' },
    { id: 'best-practices', label: '最佳实践' },
    { id: 'code', label: '代码示例' }
  ];

  const toggleContent = (contentId: string) => {
    setExpandedContent(expandedContent === contentId ? null : contentId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">计算机视觉实战</h1>
      
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
              <h3 className="text-xl font-semibold mb-3">实战概述</h3>
              <div className="prose max-w-none">
                <p className="mb-4">
                  计算机视觉实战是将理论知识应用到实际项目中的重要环节。
                  通过实践案例，我们可以更好地理解和掌握计算机视觉技术。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-semibold mb-2">主要方向：</h4>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>目标检测与识别</li>
                      <li>图像分割与理解</li>
                      <li>人脸识别与分析</li>
                      <li>视频分析与处理</li>
                    </ul>
                  </div>
                  <div className="relative h-48">
                    <svg viewBox="0 0 300 200" className="w-full h-full">
                      {/* 实战示意图 */}
                      <rect x="50" y="50" width="200" height="100" fill="#f0f0f0" stroke="#333" strokeWidth="2"/>
                      <circle cx="100" cy="100" r="20" fill="#4a90e2" opacity="0.3"/>
                      <circle cx="150" cy="100" r="20" fill="#4a90e2" opacity="0.3"/>
                      <circle cx="200" cy="100" r="20" fill="#4a90e2" opacity="0.3"/>
                      <line x1="100" y1="100" x2="200" y2="100" stroke="#333" strokeWidth="2"/>
                      <text x="120" y="90" className="text-sm">实战流程</text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">实践要点</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="list-disc pl-6 space-y-2">
                  <li>数据准备
                    <ul className="list-disc pl-6 mt-2">
                      <li>数据收集</li>
                      <li>数据清洗</li>
                      <li>数据标注</li>
                    </ul>
                  </li>
                  <li>模型选择
                    <ul className="list-disc pl-6 mt-2">
                      <li>任务需求</li>
                      <li>性能要求</li>
                      <li>资源限制</li>
                    </ul>
                  </li>
                  <li>训练优化
                    <ul className="list-disc pl-6 mt-2">
                      <li>超参数调优</li>
                      <li>模型改进</li>
                      <li>性能评估</li>
                    </ul>
                  </li>
                  <li>部署应用
                    <ul className="list-disc pl-6 mt-2">
                      <li>模型转换</li>
                      <li>性能优化</li>
                      <li>系统集成</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'process' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">项目流程</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">前期准备</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>需求分析
                      <ul className="list-disc pl-6 mt-2">
                        <li>任务定义</li>
                        <li>性能指标</li>
                        <li>资源评估</li>
                      </ul>
                    </li>
                    <li>技术选型
                      <ul className="list-disc pl-6 mt-2">
                        <li>算法选择</li>
                        <li>框架确定</li>
                        <li>工具准备</li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">开发流程</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>数据处理
                      <ul className="list-disc pl-6 mt-2">
                        <li>数据获取</li>
                        <li>预处理</li>
                        <li>增强</li>
                      </ul>
                    </li>
                    <li>模型开发
                      <ul className="list-disc pl-6 mt-2">
                        <li>模型设计</li>
                        <li>训练优化</li>
                        <li>评估验证</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">部署流程</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="list-disc pl-6 space-y-2">
                  <li>模型优化
                    <ul className="list-disc pl-6 mt-2">
                      <li>模型压缩</li>
                      <li>量化加速</li>
                      <li>推理优化</li>
                    </ul>
                  </li>
                  <li>系统集成
                    <ul className="list-disc pl-6 mt-2">
                      <li>接口设计</li>
                      <li>性能测试</li>
                      <li>监控部署</li>
                    </ul>
                  </li>
                  <li>维护更新
                    <ul className="list-disc pl-6 mt-2">
                      <li>性能监控</li>
                      <li>模型更新</li>
                      <li>问题修复</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cases' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">目标检测案例</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">工业质检</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>任务目标
                      <ul className="list-disc pl-6 mt-2">
                        <li>缺陷检测</li>
                        <li>尺寸测量</li>
                        <li>质量评估</li>
                      </ul>
                    </li>
                    <li>技术方案
                      <ul className="list-disc pl-6 mt-2">
                        <li>YOLO检测</li>
                        <li>图像分割</li>
                        <li>实时处理</li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">安防监控</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>任务目标
                      <ul className="list-disc pl-6 mt-2">
                        <li>人员检测</li>
                        <li>行为分析</li>
                        <li>异常识别</li>
                      </ul>
                    </li>
                    <li>技术方案
                      <ul className="list-disc pl-6 mt-2">
                        <li>多目标跟踪</li>
                        <li>行为识别</li>
                        <li>实时预警</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">图像分割案例</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="list-disc pl-6 space-y-2">
                  <li>医疗影像
                    <ul className="list-disc pl-6 mt-2">
                      <li>器官分割</li>
                      <li>病变检测</li>
                      <li>辅助诊断</li>
                    </ul>
                  </li>
                  <li>自动驾驶
                    <ul className="list-disc pl-6 mt-2">
                      <li>道路分割</li>
                      <li>障碍物识别</li>
                      <li>场景理解</li>
                    </ul>
                  </li>
                  <li>遥感图像
                    <ul className="list-disc pl-6 mt-2">
                      <li>地物分类</li>
                      <li>变化检测</li>
                      <li>资源监测</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'best-practices' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">开发实践</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">数据处理</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>数据质量
                      <ul className="list-disc pl-6 mt-2">
                        <li>数据清洗</li>
                        <li>标注规范</li>
                        <li>质量控制</li>
                      </ul>
                    </li>
                    <li>数据增强
                      <ul className="list-disc pl-6 mt-2">
                        <li>几何变换</li>
                        <li>颜色变换</li>
                        <li>噪声添加</li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">模型开发</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>模型选择
                      <ul className="list-disc pl-6 mt-2">
                        <li>任务匹配</li>
                        <li>性能评估</li>
                        <li>资源考虑</li>
                      </ul>
                    </li>
                    <li>训练优化
                      <ul className="list-disc pl-6 mt-2">
                        <li>超参数调优</li>
                        <li>损失函数</li>
                        <li>优化策略</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">部署实践</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="list-disc pl-6 space-y-2">
                  <li>性能优化
                    <ul className="list-disc pl-6 mt-2">
                      <li>模型压缩</li>
                      <li>推理加速</li>
                      <li>资源利用</li>
                    </ul>
                  </li>
                  <li>系统集成
                    <ul className="list-disc pl-6 mt-2">
                      <li>接口设计</li>
                      <li>错误处理</li>
                      <li>监控告警</li>
                    </ul>
                  </li>
                  <li>维护更新
                    <ul className="list-disc pl-6 mt-2">
                      <li>版本控制</li>
                      <li>性能监控</li>
                      <li>问题修复</li>
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
              <h3 className="text-xl font-semibold mb-3">目标检测示例</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  <code>{`# 导入必要的库
import torch
import torchvision
from torchvision.models.detection import FasterRCNN
from torchvision.models.detection.rpn import AnchorGenerator

# 定义模型
def create_model(num_classes):
    # 加载预训练模型
    backbone = torchvision.models.mobilenet_v2(pretrained=True).features
    backbone.out_channels = 1280
    
    # 定义RPN
    anchor_generator = AnchorGenerator(
        sizes=((32, 64, 128, 256, 512),),
        aspect_ratios=((0.5, 1.0, 2.0),)
    )
    
    # 定义ROI池化
    roi_pooler = torchvision.ops.MultiScaleRoIAlign(
        featmap_names=['0'],
        output_size=7,
        sampling_ratio=2
    )
    
    # 创建模型
    model = FasterRCNN(
        backbone,
        num_classes=num_classes,
        rpn_anchor_generator=anchor_generator,
        box_roi_pool=roi_pooler
    )
    
    return model

# 训练函数
def train_one_epoch(model, optimizer, data_loader, device):
    model.train()
    total_loss = 0
    
    for images, targets in data_loader:
        images = [image.to(device) for image in images]
        targets = [{k: v.to(device) for k, v in t.items()} for t in targets]
        
        loss_dict = model(images, targets)
        losses = sum(loss for loss in loss_dict.values())
        
        optimizer.zero_grad()
        losses.backward()
        optimizer.step()
        
        total_loss += losses.item()
    
    return total_loss / len(data_loader)

# 评估函数
def evaluate(model, data_loader, device):
    model.eval()
    total_loss = 0
    
    with torch.no_grad():
        for images, targets in data_loader:
            images = [image.to(device) for image in images]
            targets = [{k: v.to(device) for k, v in t.items()} for t in targets]
            
            loss_dict = model(images, targets)
            losses = sum(loss for loss in loss_dict.values())
            total_loss += losses.item()
    
    return total_loss / len(data_loader)`}</code>
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">图像分割示例</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  <code>{`# 导入必要的库
import torch
import torch.nn as nn
import torch.nn.functional as F

class UNet(nn.Module):
    def __init__(self, n_channels, n_classes):
        super().__init__()
        self.n_channels = n_channels
        self.n_classes = n_classes
        
        # 编码器
        self.inc = DoubleConv(n_channels, 64)
        self.down1 = Down(64, 128)
        self.down2 = Down(128, 256)
        self.down3 = Down(256, 512)
        self.down4 = Down(512, 1024)
        
        # 解码器
        self.up1 = Up(1024, 512)
        self.up2 = Up(512, 256)
        self.up3 = Up(256, 128)
        self.up4 = Up(128, 64)
        self.outc = OutConv(64, n_classes)
        
    def forward(self, x):
        x1 = self.inc(x)
        x2 = self.down1(x1)
        x3 = self.down2(x2)
        x4 = self.down3(x3)
        x5 = self.down4(x4)
        
        x = self.up1(x5, x4)
        x = self.up2(x, x3)
        x = self.up3(x, x2)
        x = self.up4(x, x1)
        logits = self.outc(x)
        
        return logits

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

class Down(nn.Module):
    def __init__(self, in_channels, out_channels):
        super().__init__()
        self.maxpool_conv = nn.Sequential(
            nn.MaxPool2d(2),
            DoubleConv(in_channels, out_channels)
        )
        
    def forward(self, x):
        return self.maxpool_conv(x)

class Up(nn.Module):
    def __init__(self, in_channels, out_channels):
        super().__init__()
        self.up = nn.ConvTranspose2d(in_channels, in_channels // 2, kernel_size=2, stride=2)
        self.conv = DoubleConv(in_channels, out_channels)
        
    def forward(self, x1, x2):
        x1 = self.up(x1)
        diffY = x2.size()[2] - x1.size()[2]
        diffX = x2.size()[3] - x1.size()[3]
        
        x1 = F.pad(x1, [diffX // 2, diffX - diffX // 2,
                       diffY // 2, diffY - diffY // 2])
        x = torch.cat([x2, x1], dim=1)
        return self.conv(x)

class OutConv(nn.Module):
    def __init__(self, in_channels, out_channels):
        super().__init__()
        self.conv = nn.Conv2d(in_channels, out_channels, kernel_size=1)
        
    def forward(self, x):
        return self.conv(x)`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/ai/cv/frameworks"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回视觉框架与工具
        </Link>
        <Link 
          href="/study/ai/cv/interview"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          计算机视觉面试题 →
        </Link>
      </div>
    </div>
  );
} 
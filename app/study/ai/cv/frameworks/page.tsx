'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FrameworksPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'overview', label: '概述' },
    { id: 'frameworks', label: '主流框架' },
    { id: 'tools', label: '工具库' },
    { id: 'environment', label: '开发环境' },
    { id: 'code', label: '代码示例' }
  ];

  const toggleContent = (contentId: string) => {
    setExpandedContent(expandedContent === contentId ? null : contentId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">视觉框架与工具</h1>
      
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
              <h3 className="text-xl font-semibold mb-3">框架与工具概述</h3>
              <div className="prose max-w-none">
                <p className="mb-4">
                  计算机视觉领域有众多优秀的框架和工具，它们为开发者提供了强大的支持。
                  选择合适的框架和工具可以大大提高开发效率和项目质量。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-semibold mb-2">主要类别：</h4>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>深度学习框架：PyTorch、TensorFlow等</li>
                      <li>计算机视觉库：OpenCV、PIL等</li>
                      <li>开发工具：CUDA、cuDNN等</li>
                      <li>可视化工具：TensorBoard、Visdom等</li>
                    </ul>
                  </div>
                  <div className="relative h-48">
                    <svg viewBox="0 0 300 200" className="w-full h-full">
                      {/* 框架工具示意图 */}
                      <rect x="50" y="50" width="200" height="100" fill="#f0f0f0" stroke="#333" strokeWidth="2"/>
                      <circle cx="100" cy="100" r="20" fill="#4a90e2" opacity="0.3"/>
                      <circle cx="150" cy="100" r="20" fill="#4a90e2" opacity="0.3"/>
                      <circle cx="200" cy="100" r="20" fill="#4a90e2" opacity="0.3"/>
                      <line x1="100" y1="100" x2="200" y2="100" stroke="#333" strokeWidth="2"/>
                      <text x="120" y="90" className="text-sm">框架生态</text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">选择考虑因素</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="list-disc pl-6 space-y-2">
                  <li>性能需求
                    <ul className="list-disc pl-6 mt-2">
                      <li>计算效率</li>
                      <li>内存占用</li>
                      <li>并行能力</li>
                    </ul>
                  </li>
                  <li>开发效率
                    <ul className="list-disc pl-6 mt-2">
                      <li>API友好度</li>
                      <li>文档完善度</li>
                      <li>社区活跃度</li>
                    </ul>
                  </li>
                  <li>部署要求
                    <ul className="list-disc pl-6 mt-2">
                      <li>平台支持</li>
                      <li>模型转换</li>
                      <li>优化工具</li>
                    </ul>
                  </li>
                  <li>生态支持
                    <ul className="list-disc pl-6 mt-2">
                      <li>预训练模型</li>
                      <li>扩展库</li>
                      <li>工具链</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'frameworks' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">深度学习框架</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">PyTorch</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>特点
                      <ul className="list-disc pl-6 mt-2">
                        <li>动态计算图</li>
                        <li>Python优先</li>
                        <li>灵活性强</li>
                      </ul>
                    </li>
                    <li>应用
                      <ul className="list-disc pl-6 mt-2">
                        <li>研究开发</li>
                        <li>原型验证</li>
                        <li>快速迭代</li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">TensorFlow</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>特点
                      <ul className="list-disc pl-6 mt-2">
                        <li>静态计算图</li>
                        <li>部署友好</li>
                        <li>生态完善</li>
                      </ul>
                    </li>
                    <li>应用
                      <ul className="list-disc pl-6 mt-2">
                        <li>生产部署</li>
                        <li>大规模应用</li>
                        <li>跨平台支持</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">其他框架</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="list-disc pl-6 space-y-2">
                  <li>MXNet
                    <ul className="list-disc pl-6 mt-2">
                      <li>多语言支持</li>
                      <li>分布式训练</li>
                      <li>内存优化</li>
                    </ul>
                  </li>
                  <li>PaddlePaddle
                    <ul className="list-disc pl-6 mt-2">
                      <li>国产框架</li>
                      <li>产业应用</li>
                      <li>工具丰富</li>
                    </ul>
                  </li>
                  <li>JAX
                    <ul className="list-disc pl-6 mt-2">
                      <li>函数式编程</li>
                      <li>自动微分</li>
                      <li>高性能计算</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tools' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">计算机视觉库</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">OpenCV</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>功能
                      <ul className="list-disc pl-6 mt-2">
                        <li>图像处理</li>
                        <li>特征提取</li>
                        <li>目标检测</li>
                      </ul>
                    </li>
                    <li>优势
                      <ul className="list-disc pl-6 mt-2">
                        <li>功能全面</li>
                        <li>性能优化</li>
                        <li>跨平台</li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">PIL/Pillow</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>功能
                      <ul className="list-disc pl-6 mt-2">
                        <li>图像处理</li>
                        <li>格式转换</li>
                        <li>图像增强</li>
                      </ul>
                    </li>
                    <li>优势
                      <ul className="list-disc pl-6 mt-2">
                        <li>简单易用</li>
                        <li>Python集成</li>
                        <li>轻量级</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">开发工具</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="list-disc pl-6 space-y-2">
                  <li>CUDA/cuDNN
                    <ul className="list-disc pl-6 mt-2">
                      <li>GPU加速</li>
                      <li>深度学习优化</li>
                      <li>并行计算</li>
                    </ul>
                  </li>
                  <li>TensorRT
                    <ul className="list-disc pl-6 mt-2">
                      <li>模型优化</li>
                      <li>推理加速</li>
                      <li>部署支持</li>
                    </ul>
                  </li>
                  <li>ONNX
                    <ul className="list-disc pl-6 mt-2">
                      <li>模型转换</li>
                      <li>跨框架支持</li>
                      <li>标准化</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'environment' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">开发环境配置</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">基础环境</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Python环境
                      <ul className="list-disc pl-6 mt-2">
                        <li>Anaconda</li>
                        <li>虚拟环境</li>
                        <li>包管理</li>
                      </ul>
                    </li>
                    <li>CUDA环境
                      <ul className="list-disc pl-6 mt-2">
                        <li>驱动安装</li>
                        <li>工具包配置</li>
                        <li>版本匹配</li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">IDE工具</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>PyCharm
                      <ul className="list-disc pl-6 mt-2">
                        <li>专业版</li>
                        <li>社区版</li>
                        <li>插件支持</li>
                      </ul>
                    </li>
                    <li>VS Code
                      <ul className="list-disc pl-6 mt-2">
                        <li>轻量级</li>
                        <li>扩展丰富</li>
                        <li>调试支持</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">开发工具链</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="list-disc pl-6 space-y-2">
                  <li>版本控制
                    <ul className="list-disc pl-6 mt-2">
                      <li>Git</li>
                      <li>GitHub</li>
                      <li>GitLab</li>
                    </ul>
                  </li>
                  <li>项目管理
                    <ul className="list-disc pl-6 mt-2">
                      <li>Jupyter</li>
                      <li>Docker</li>
                      <li>CI/CD</li>
                    </ul>
                  </li>
                  <li>监控工具
                    <ul className="list-disc pl-6 mt-2">
                      <li>TensorBoard</li>
                      <li>Weights & Biases</li>
                      <li>MLflow</li>
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
              <h3 className="text-xl font-semibold mb-3">环境配置示例</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  <code>{`# 创建虚拟环境
conda create -n cv_env python=3.8
conda activate cv_env

# 安装基础包
pip install numpy pandas matplotlib

# 安装PyTorch
conda install pytorch torchvision torchaudio cudatoolkit=11.3 -c pytorch

# 安装OpenCV
pip install opencv-python

# 安装其他工具
pip install tensorboard
pip install jupyter
pip install pillow

# 验证安装
python -c "import torch; print(torch.cuda.is_available())"
python -c "import cv2; print(cv2.__version__)"`}</code>
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">基础使用示例</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  <code>{`# 导入必要的库
import torch
import torch.nn as nn
import torchvision.transforms as transforms
import cv2
import numpy as np

# 定义数据预处理
transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                       std=[0.229, 0.224, 0.225])
])

# 图像处理函数
def process_image(image_path):
    # 读取图像
    image = cv2.imread(image_path)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    
    # 调整大小
    image = cv2.resize(image, (224, 224))
    
    # 转换为张量
    image_tensor = transform(image)
    
    return image_tensor.unsqueeze(0)

# 模型定义
class SimpleCNN(nn.Module):
    def __init__(self, num_classes):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(3, 64, kernel_size=3, padding=1),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=2, stride=2),
            nn.Conv2d(64, 128, kernel_size=3, padding=1),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=2, stride=2)
        )
        self.classifier = nn.Sequential(
            nn.Linear(128 * 56 * 56, 512),
            nn.ReLU(inplace=True),
            nn.Dropout(),
            nn.Linear(512, num_classes)
        )
    
    def forward(self, x):
        x = self.features(x)
        x = torch.flatten(x, 1)
        x = self.classifier(x)
        return x

# 训练函数
def train_model(model, train_loader, criterion, optimizer, num_epochs):
    for epoch in range(num_epochs):
        model.train()
        running_loss = 0.0
        
        for inputs, labels in train_loader:
            optimizer.zero_grad()
            outputs = model(inputs)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()
            
            running_loss += loss.item()
            
        print(f'Epoch {epoch+1}, Loss: {running_loss/len(train_loader):.4f}')`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/ai/cv/3d-vision"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回3D视觉
        </Link>
        <Link 
          href="/study/ai/cv/cases"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          计算机视觉实战 →
        </Link>
      </div>
    </div>
  );
} 
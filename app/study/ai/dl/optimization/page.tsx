'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaRobot, FaBrain, FaChartLine, FaCode, FaLightbulb, FaNetworkWired, FaArrowLeft, FaArrowRight, FaFolder } from 'react-icons/fa';
import { SiTensorflow, SiPytorch, SiKeras } from 'react-icons/si';

export default function DLOptimizationPage() {
  const [activeTab, setActiveTab] = useState('theory');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">模型压缩与优化</h1>
      
     

      {/* 介绍部分 */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">模型压缩与优化概述</h2>
        <div className="space-y-4 text-gray-700">
          <p>
            深度学习模型压缩与优化是提高模型部署效率的关键技术。随着深度学习模型规模的不断增大，如何在保持模型性能的同时减小模型体积、提高推理速度，成为了一个重要的研究方向。
          </p>
          <p>
            本课程将详细介绍模型压缩与优化的主要方法，包括模型量化、模型剪枝、知识蒸馏等技术，以及相关的优化工具和框架。通过学习这些技术，您将能够：
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>理解模型压缩与优化的基本原理</li>
            <li>掌握常用的模型压缩技术</li>
            <li>学会使用各种优化工具和框架</li>
            <li>在实际项目中应用这些技术</li>
          </ul>
        </div>
      </section>

      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('theory')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'theory'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          理论知识
        </button>
        <button
          onClick={() => setActiveTab('practice')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'practice'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          代码实践
        </button>
        <button
          onClick={() => setActiveTab('exercise')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'exercise'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          实战练习
        </button>
      </div>

      {activeTab === 'theory' ? (
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">模型压缩与优化理论</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">优化方法</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">1. 模型量化</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>INT8量化</li>
                        <li>混合精度训练</li>
                        <li>量化感知训练</li>
                        <li>后训练量化</li>
                        <li>量化误差分析</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">2. 模型剪枝</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>结构化剪枝</li>
                        <li>非结构化剪枝</li>
                        <li>通道剪枝</li>
                        <li>层剪枝</li>
                        <li>稀疏训练</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">3. 知识蒸馏</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>教师-学生模型</li>
                        <li>软标签蒸馏</li>
                        <li>特征蒸馏</li>
                        <li>注意力蒸馏</li>
                        <li>多教师蒸馏</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">优化工具</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">TensorRT</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>高性能推理引擎</li>
                        <li>自动优化</li>
                        <li>多精度支持</li>
                        <li>动态形状</li>
                        <li>跨平台部署</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">ONNX Runtime</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>跨框架支持</li>
                        <li>图优化</li>
                        <li>量化支持</li>
                        <li>硬件加速</li>
                        <li>动态推理</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">OpenVINO</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>Intel优化</li>
                        <li>模型转换</li>
                        <li>量化工具</li>
                        <li>性能分析</li>
                        <li>部署工具</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">模型压缩与优化流程</h3>
                <div className="flex justify-center">
                  <svg width="800" height="200" className="bg-white rounded-lg shadow-md">
                    {/* 原始模型 */}
                    <rect x="50" y="50" width="120" height="100" fill="#E3F2FD" stroke="#2196F3" strokeWidth="2" rx="10" />
                    <text x="110" y="100" textAnchor="middle" fill="#1565C0" className="font-semibold">原始模型</text>
                    
                    {/* 箭头 */}
                    <path d="M170 100 L230 100" stroke="#2196F3" strokeWidth="2" />
                    <polygon points="230,100 220,95 220,105" fill="#2196F3" />
                    
                    {/* 压缩方法 */}
                    <rect x="230" y="50" width="120" height="100" fill="#E8F5E9" stroke="#4CAF50" strokeWidth="2" rx="10" />
                    <text x="290" y="85" textAnchor="middle" fill="#2E7D32" className="font-semibold">压缩方法</text>
                    <text x="290" y="105" textAnchor="middle" fill="#2E7D32" className="text-sm">量化/剪枝/蒸馏</text>
                    
                    {/* 箭头 */}
                    <path d="M350 100 L410 100" stroke="#2196F3" strokeWidth="2" />
                    <polygon points="410,100 400,95 400,105" fill="#2196F3" />
                    
                    {/* 优化后模型 */}
                    <rect x="410" y="50" width="120" height="100" fill="#FFF3E0" stroke="#FF9800" strokeWidth="2" rx="10" />
                    <text x="470" y="85" textAnchor="middle" fill="#E65100" className="font-semibold">优化后模型</text>
                    <text x="470" y="105" textAnchor="middle" fill="#E65100" className="text-sm">更小/更快</text>
                    
                    {/* 评估指标 */}
                    <rect x="230" y="170" width="120" height="60" fill="#F3E5F5" stroke="#9C27B0" strokeWidth="2" rx="10" />
                    <text x="290" y="195" textAnchor="middle" fill="#6A1B9A" className="font-semibold">评估指标</text>
                    <text x="290" y="215" textAnchor="middle" fill="#6A1B9A" className="text-sm">性能/大小/速度</text>
                    
                    {/* 连接线 */}
                    <path d="M290 170 L290 150" stroke="#9C27B0" strokeWidth="2" strokeDasharray="5,5" />
                  </svg>
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">压缩方法对比</h3>
                <div className="flex justify-center">
                  <svg width="800" height="300" className="bg-white rounded-lg shadow-md">
                    {/* 量化 */}
                    <rect x="50" y="50" width="200" height="200" fill="#E3F2FD" stroke="#2196F3" strokeWidth="2" rx="10" />
                    <text x="150" y="80" textAnchor="middle" fill="#1565C0" className="font-semibold">模型量化</text>
                    <text x="150" y="110" textAnchor="middle" fill="#1565C0" className="text-sm">• INT8量化</text>
                    <text x="150" y="130" textAnchor="middle" fill="#1565C0" className="text-sm">• 混合精度训练</text>
                    <text x="150" y="150" textAnchor="middle" fill="#1565C0" className="text-sm">• 量化感知训练</text>
                    <text x="150" y="170" textAnchor="middle" fill="#1565C0" className="text-sm">• 后训练量化</text>
                    
                    {/* 剪枝 */}
                    <rect x="300" y="50" width="200" height="200" fill="#E8F5E9" stroke="#4CAF50" strokeWidth="2" rx="10" />
                    <text x="400" y="80" textAnchor="middle" fill="#2E7D32" className="font-semibold">模型剪枝</text>
                    <text x="400" y="110" textAnchor="middle" fill="#2E7D32" className="text-sm">• 结构化剪枝</text>
                    <text x="400" y="130" textAnchor="middle" fill="#2E7D32" className="text-sm">• 非结构化剪枝</text>
                    <text x="400" y="150" textAnchor="middle" fill="#2E7D32" className="text-sm">• 通道剪枝</text>
                    <text x="400" y="170" textAnchor="middle" fill="#2E7D32" className="text-sm">• 层剪枝</text>
                    
                    {/* 知识蒸馏 */}
                    <rect x="550" y="50" width="200" height="200" fill="#FFF3E0" stroke="#FF9800" strokeWidth="2" rx="10" />
                    <text x="650" y="80" textAnchor="middle" fill="#E65100" className="font-semibold">知识蒸馏</text>
                    <text x="650" y="110" textAnchor="middle" fill="#E65100" className="text-sm">• 教师-学生模型</text>
                    <text x="650" y="130" textAnchor="middle" fill="#E65100" className="text-sm">• 软标签蒸馏</text>
                    <text x="650" y="150" textAnchor="middle" fill="#E65100" className="text-sm">• 特征蒸馏</text>
                    <text x="650" y="170" textAnchor="middle" fill="#E65100" className="text-sm">• 注意力蒸馏</text>
                  </svg>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : null}

      {activeTab === 'practice' ? (
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">代码实践</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">模型量化示例</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm text-gray-800">
{`import torch
import torch.nn as nn
import torch.quantization

# 定义模型
class SimpleModel(nn.Module):
    def __init__(self):
        super(SimpleModel, self).__init__()
        self.conv = nn.Conv2d(3, 64, kernel_size=3)
        self.relu = nn.ReLU()
        self.pool = nn.MaxPool2d(2)
        self.fc = nn.Linear(64 * 14 * 14, 10)

    def forward(self, x):
        x = self.conv(x)
        x = self.relu(x)
        x = self.pool(x)
        x = x.view(-1, 64 * 14 * 14)
        x = self.fc(x)
        return x

# 准备量化
def prepare_for_quantization(model):
    # 设置量化配置
    model.qconfig = torch.quantization.get_default_qconfig('fbgemm')
    
    # 准备模型
    torch.quantization.prepare(model, inplace=True)
    
    # 校准
    with torch.no_grad():
        for data in calibration_data:
            model(data)
    
    # 转换模型
    torch.quantization.convert(model, inplace=True)
    
    return model

# 主函数
def main():
    # 创建模型
    model = SimpleModel()
    
    # 训练模型
    # ... 训练代码 ...
    
    # 量化模型
    quantized_model = prepare_for_quantization(model)
    
    # 保存量化模型
    torch.save(quantized_model.state_dict(), 'quantized_model.pth')
    
    # 评估量化模型
    evaluate_model(quantized_model)`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">模型剪枝示例</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm text-gray-800">
{`import torch
import torch.nn as nn
import torch.nn.utils.prune as prune

class PrunedModel(nn.Module):
    def __init__(self):
        super(PrunedModel, self).__init__()
        self.conv1 = nn.Conv2d(3, 64, kernel_size=3)
        self.conv2 = nn.Conv2d(64, 128, kernel_size=3)
        self.fc1 = nn.Linear(128 * 6 * 6, 512)
        self.fc2 = nn.Linear(512, 10)

    def forward(self, x):
        x = self.conv1(x)
        x = nn.functional.relu(x)
        x = self.conv2(x)
        x = nn.functional.relu(x)
        x = x.view(-1, 128 * 6 * 6)
        x = self.fc1(x)
        x = nn.functional.relu(x)
        x = self.fc2(x)
        return x

def prune_model(model, amount=0.3):
    # 对卷积层进行剪枝
    for name, module in model.named_modules():
        if isinstance(module, nn.Conv2d):
            prune.l1_unstructured(
                module,
                name='weight',
                amount=amount
            )
    
    # 对全连接层进行剪枝
    for name, module in model.named_modules():
        if isinstance(module, nn.Linear):
            prune.l1_unstructured(
                module,
                name='weight',
                amount=amount
            )
    
    return model

def main():
    # 创建模型
    model = PrunedModel()
    
    # 训练模型
    # ... 训练代码 ...
    
    # 剪枝模型
    pruned_model = prune_model(model, amount=0.3)
    
    # 保存剪枝后的模型
    torch.save(pruned_model.state_dict(), 'pruned_model.pth')
    
    # 评估剪枝后的模型
    evaluate_model(pruned_model)`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : null}

      {activeTab === 'exercise' ? (
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">实战练习</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">练习一：模型量化实践</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">要求：</h4>
                  <p className="text-gray-700 mb-4">
                    对预训练的ResNet18模型进行INT8量化，并比较量化前后的模型大小和推理速度。
                  </p>
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">参考答案：</h4>
                    <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-sm text-gray-800">
{`import torch
import torchvision.models as models
import torch.quantization
import time

def quantize_resnet18():
    # 加载预训练模型
    model = models.resnet18(pretrained=True)
    model.eval()
    
    # 准备量化
    model.qconfig = torch.quantization.get_default_qconfig('fbgemm')
    torch.quantization.prepare(model, inplace=True)
    
    # 校准
    with torch.no_grad():
        for data in calibration_data:
            model(data)
    
    # 转换模型
    torch.quantization.convert(model, inplace=True)
    
    return model

def compare_models(original_model, quantized_model):
    # 比较模型大小
    original_size = sum(p.numel() * p.element_size() for p in original_model.parameters())
    quantized_size = sum(p.numel() * p.element_size() for p in quantized_model.parameters())
    
    print(f"Original model size: {original_size / 1024 / 1024:.2f} MB")
    print(f"Quantized model size: {quantized_size / 1024 / 1024:.2f} MB")
    
    # 比较推理速度
    input_tensor = torch.randn(1, 3, 224, 224)
    
    # 原始模型推理时间
    start_time = time.time()
    with torch.no_grad():
        original_model(input_tensor)
    original_time = time.time() - start_time
    
    # 量化模型推理时间
    start_time = time.time()
    with torch.no_grad():
        quantized_model(input_tensor)
    quantized_time = time.time() - start_time
    
    print(f"Original model inference time: {original_time:.4f} seconds")
    print(f"Quantized model inference time: {quantized_time:.4f} seconds")

def main():
    # 加载原始模型
    original_model = models.resnet18(pretrained=True)
    original_model.eval()
    
    # 量化模型
    quantized_model = quantize_resnet18()
    
    # 比较模型
    compare_models(original_model, quantized_model)
    
    # 保存量化模型
    torch.save(quantized_model.state_dict(), 'quantized_resnet18.pth')`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">练习二：知识蒸馏实践</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">要求：</h4>
                  <p className="text-gray-700 mb-4">
                    使用ResNet50作为教师模型，ResNet18作为学生模型，实现知识蒸馏。
                  </p>
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">参考答案：</h4>
                    <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-sm text-gray-800">
{`import torch
import torch.nn as nn
import torchvision.models as models
import torch.optim as optim

class DistillationLoss(nn.Module):
    def __init__(self, alpha=0.5, temperature=2.0):
        super(DistillationLoss, self).__init__()
        self.alpha = alpha
        self.temperature = temperature
        self.ce_loss = nn.CrossEntropyLoss()
        self.kl_loss = nn.KLDivLoss(reduction='batchmean')
    
    def forward(self, student_logits, teacher_logits, labels):
        # 计算硬标签损失
        hard_loss = self.ce_loss(student_logits, labels)
        
        # 计算软标签损失
        soft_loss = self.kl_loss(
            nn.functional.log_softmax(student_logits / self.temperature, dim=1),
            nn.functional.softmax(teacher_logits / self.temperature, dim=1)
        ) * (self.temperature ** 2)
        
        # 组合损失
        total_loss = self.alpha * hard_loss + (1 - self.alpha) * soft_loss
        return total_loss

def train_distillation(teacher_model, student_model, train_loader, num_epochs=10):
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    teacher_model = teacher_model.to(device)
    student_model = student_model.to(device)
    
    # 设置教师模型为评估模式
    teacher_model.eval()
    
    # 定义损失函数和优化器
    criterion = DistillationLoss(alpha=0.5, temperature=2.0)
    optimizer = optim.Adam(student_model.parameters(), lr=0.001)
    
    for epoch in range(num_epochs):
        student_model.train()
        running_loss = 0.0
        
        for inputs, labels in train_loader:
            inputs = inputs.to(device)
            labels = labels.to(device)
            
            # 获取教师模型的输出
            with torch.no_grad():
                teacher_outputs = teacher_model(inputs)
            
            # 获取学生模型的输出
            student_outputs = student_model(inputs)
            
            # 计算蒸馏损失
            loss = criterion(student_outputs, teacher_outputs, labels)
            
            # 反向传播和优化
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()
            
            running_loss += loss.item()
        
        print(f'Epoch [{epoch+1}/{num_epochs}], Loss: {running_loss/len(train_loader):.4f}')

def main():
    # 加载预训练模型
    teacher_model = models.resnet50(pretrained=True)
    student_model = models.resnet18(pretrained=False)
    
    # 准备数据加载器
    # ... 数据加载代码 ...
    
    # 训练蒸馏
    train_distillation(teacher_model, student_model, train_loader)
    
    # 保存学生模型
    torch.save(student_model.state_dict(), 'distilled_resnet18.pth')`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : null}

      {/* 导航链接 */}
      <div className="flex justify-between mt-8">
        <Link 
          href="/study/ai/dl/frameworks"
          className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 flex items-center"
        >
          <FaArrowLeft className="mr-2" />
          上一课：深度学习框架
        </Link>
        <Link 
          href="/study/ai/dl/cases"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center"
        >
          下一课：深度学习实战
          <FaArrowRight className="ml-2" />
        </Link>
      </div>
    </div>
  );
} 
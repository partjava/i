'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaArrowRight, FaProjectDiagram, FaTasks, FaCode, FaLightbulb } from 'react-icons/fa';

export default function DLCasesPage() {
  const [activeTab, setActiveTab] = useState('intro');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">深度学习实战</h1>

      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('intro')}
          className={`px-4 py-2 rounded-lg ${activeTab === 'intro' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          实战简介
        </button>
        <button
          onClick={() => setActiveTab('cases')}
          className={`px-4 py-2 rounded-lg ${activeTab === 'cases' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          典型案例
        </button>
        <button
          onClick={() => setActiveTab('project')}
          className={`px-4 py-2 rounded-lg ${activeTab === 'project' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          项目结构
        </button>
        <button
          onClick={() => setActiveTab('practice')}
          className={`px-4 py-2 rounded-lg ${activeTab === 'practice' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          实战练习
        </button>
      </div>

      {/* 实战简介 */}
      {activeTab === 'intro' && (
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center"><FaLightbulb className="mr-2" />深度学习实战简介</h2>
          <p className="text-gray-700 mb-2">
            深度学习实战是将理论知识应用于真实世界问题的关键环节。通过实战项目，您可以掌握模型训练、调优、部署等全流程技能，提升工程能力。
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>了解深度学习在图像、文本、语音等领域的典型应用</li>
            <li>掌握数据预处理、模型设计、训练与评估、部署等完整流程</li>
            <li>积累项目经验，提升解决实际问题的能力</li>
          </ul>
        </section>
      )}

      {/* 典型案例 */}
      {activeTab === 'cases' && (
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center"><FaCode className="mr-2" />典型实战案例</h2>
          <div className="space-y-6">
            {/* 图像分类案例 */}
            <div>
              <h3 className="text-xl font-semibold mb-2">1. 图像分类（Image Classification）</h3>
              <p className="text-gray-700 mb-2">图像分类是计算机视觉中最基础的任务之一，广泛应用于自动驾驶、医学影像、安防监控等领域。常用数据集有CIFAR-10、ImageNet等。</p>
              <p className="text-gray-700 mb-2">使用PyTorch实现CIFAR-10图像分类：</p>
              <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm text-gray-800">
{`import torch
import torchvision
import torchvision.transforms as transforms
import torch.nn as nn
import torch.optim as optim

# 数据加载
transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))
])
trainset = torchvision.datasets.CIFAR10(root='./data', train=True, download=True, transform=transform)
trainloader = torch.utils.data.DataLoader(trainset, batch_size=32, shuffle=True)

# 简单CNN模型
def get_model():
    return nn.Sequential(
        nn.Conv2d(3, 32, 3, 1), nn.ReLU(),
        nn.Conv2d(32, 64, 3, 1), nn.ReLU(),
        nn.Flatten(),
        nn.Linear(64*28*28, 128), nn.ReLU(),
        nn.Linear(128, 10)
    )

model = get_model()
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# 训练循环
for epoch in range(5):
    for images, labels in trainloader:
        outputs = model(images)
        loss = criterion(outputs, labels)
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()`}
              </pre>
            </div>
            {/* 文本分类案例 */}
            <div>
              <h3 className="text-xl font-semibold mb-2">2. 文本分类（Text Classification）</h3>
              <p className="text-gray-700 mb-2">文本分类是自然语言处理中的核心任务，常用于垃圾邮件识别、情感分析、新闻分类等。IMDB数据集是情感分析的经典数据集。</p>
              <p className="text-gray-700 mb-2">使用TensorFlow实现IMDB情感分析：</p>
              <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm text-gray-800">
{`import tensorflow as tf
from tensorflow.keras import layers, models, datasets

# 加载数据
(train_data, train_labels), (test_data, test_labels) = tf.keras.datasets.imdb.load_data(num_words=10000)
train_data = tf.keras.preprocessing.sequence.pad_sequences(train_data, maxlen=256)
test_data = tf.keras.preprocessing.sequence.pad_sequences(test_data, maxlen=256)

# 构建模型
model = models.Sequential([
    layers.Embedding(10000, 16),
    layers.GlobalAveragePooling1D(),
    layers.Dense(16, activation='relu'),
    layers.Dense(1, activation='sigmoid')
])
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# 训练
model.fit(train_data, train_labels, epochs=5, batch_size=512, validation_split=0.2)`}
              </pre>
            </div>
            {/* 目标检测案例 */}
            <div>
              <h3 className="text-xl font-semibold mb-2">3. 目标检测（Object Detection）</h3>
              <p className="text-gray-700 mb-2">目标检测用于识别图像中的所有目标及其位置，广泛应用于自动驾驶、安防、工业检测等。YOLOv5是当前主流的目标检测算法之一。</p>
              <p className="text-gray-700 mb-2">使用YOLOv5进行目标检测（伪代码）：</p>
              <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm text-gray-800">
{`# 安装YOLOv5依赖
!git clone https://github.com/ultralytics/yolov5
%cd yolov5
!pip install -r requirements.txt

# 训练自己的数据集
!python train.py --img 640 --batch 16 --epochs 50 --data data.yaml --weights yolov5s.pt

# 推理
!python detect.py --weights runs/train/exp/weights/best.pt --img 640 --source data/images/`}
              </pre>
            </div>
          </div>
        </section>
      )}

      {/* 项目结构与实用技巧 */}
      {activeTab === 'project' && (
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center"><FaProjectDiagram className="mr-2" />项目结构与实用技巧</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>合理划分数据、代码、模型、结果、文档等文件夹</li>
            <li>使用虚拟环境和requirements.txt管理依赖</li>
            <li>采用版本控制（如Git）管理项目</li>
            <li>记录实验参数和结果，便于复现</li>
            <li>编写README文档，说明项目结构和使用方法</li>
          </ul>
          <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm text-gray-800 mb-2">
{`project-root/
├── data/         # 数据集
├── code/         # 代码文件
├── models/       # 训练好的模型
├── results/      # 结果输出
├── docs/         # 文档说明
├── requirements.txt
├── README.md
`}
          </pre>
        </section>
      )}

      {/* 实战练习 */}
      {activeTab === 'practice' && (
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center"><FaTasks className="mr-2" />实战练习</h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-6 mb-4">
            <li>
              基于CIFAR-10实现一个完整的图像分类项目，并尝试提升准确率
              <div className="mt-2 text-gray-600 text-sm">
                <b>实现思路：</b> 数据增强、优化网络结构、调整超参数等。
                <br />
                <b>参考代码：</b>
                <pre className="bg-gray-50 p-2 rounded-lg overflow-x-auto">
{`# 数据增强
transform = transforms.Compose([
    transforms.RandomHorizontalFlip(),
    transforms.RandomCrop(32, padding=4),
    transforms.ToTensor(),
    transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))
])
# 其余代码同典型案例，可尝试更深的网络结构如ResNet等`}
                </pre>
              </div>
            </li>
            <li>
              用IMDB数据集完成情感分析，并对比不同模型的效果
              <div className="mt-2 text-gray-600 text-sm">
                <b>实现思路：</b> 尝试不同的网络结构（如LSTM、GRU、CNN）、调整embedding维度等。
                <br />
                <b>参考代码：</b>
                <pre className="bg-gray-50 p-2 rounded-lg overflow-x-auto">
{`# 替换模型部分为LSTM
model = models.Sequential([
    layers.Embedding(10000, 32),
    layers.LSTM(32),
    layers.Dense(1, activation='sigmoid')
])
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])`}
                </pre>
              </div>
            </li>
            <li>
              尝试用YOLOv5训练自己的目标检测数据集
              <div className="mt-2 text-gray-600 text-sm">
                <b>实现思路：</b> 按YOLOv5官方文档准备数据集（VOC/COCO格式），修改data.yaml，运行训练命令。
                <br />
                <b>参考代码：</b>
                <pre className="bg-gray-50 p-2 rounded-lg overflow-x-auto">
{`# 训练命令
!python train.py --img 640 --batch 16 --epochs 50 --data data.yaml --weights yolov5s.pt`}
                </pre>
              </div>
            </li>
            <li>
              整理项目结构，撰写项目文档和复现说明
              <div className="mt-2 text-gray-600 text-sm">
                <b>实现思路：</b> 按推荐的项目结构组织文件，编写README，记录依赖和运行步骤。
                <br />
                <b>参考代码：</b>
                <pre className="bg-gray-50 p-2 rounded-lg overflow-x-auto">
{`# README.md 示例
# 项目名称
## 简介
## 环境依赖
## 运行方法
## 结果展示
`}
                </pre>
              </div>
            </li>
          </ol>
        </section>
      )}

      {/* 导航链接 */}
      <div className="flex justify-between mt-8">
        <Link 
          href="/study/ai/dl/optimization"
          className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 flex items-center"
        >
          <FaArrowLeft className="mr-2" />
          上一课：模型压缩与优化
        </Link>
        <Link 
          href="/study/ai/dl/interview"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center"
        >
          下一课：深度学习面试题
          <FaArrowRight className="ml-2" />
        </Link>
      </div>
    </div>
  );
} 
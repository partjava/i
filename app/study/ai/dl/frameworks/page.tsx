'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaRobot, FaBrain, FaChartLine, FaCode, FaLightbulb, FaNetworkWired, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { SiTensorflow, SiPytorch, SiKeras } from 'react-icons/si';

export default function DeepLearningFrameworksPage() {
  const [activeTab, setActiveTab] = useState('theory');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">深度学习框架 (Deep Learning Frameworks)</h1>
      
      

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
            <h2 className="text-2xl font-semibold mb-4">深度学习框架概述</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">什么是深度学习框架？</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 mb-4">
                    深度学习框架是用于构建、训练和部署深度学习模型的软件工具。它们提供了高级API和底层优化，使得开发者能够更高效地实现复杂的神经网络。
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">框架的主要功能：</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>自动微分：自动计算梯度</li>
                        <li>张量运算：高效的矩阵运算</li>
                        <li>模型构建：预定义层和模型架构</li>
                        <li>优化器：各种优化算法实现</li>
                        <li>数据加载：高效的数据处理管道</li>
                        <li>分布式训练：多GPU/多机训练支持</li>
                        <li>模型部署：模型导出和推理优化</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">主流深度学习框架</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2">1. PyTorch</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>特点：
                          <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                            <li>动态计算图</li>
                            <li>Python优先</li>
                            <li>灵活性强</li>
                            <li>调试方便</li>
                          </ul>
                        </li>
                        <li>应用场景：
                          <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                            <li>研究原型开发</li>
                            <li>学术研究</li>
                            <li>快速实验</li>
                          </ul>
                        </li>
                        <li>生态系统：
                          <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                            <li>torchvision：计算机视觉</li>
                            <li>torchaudio：音频处理</li>
                            <li>torchtext：文本处理</li>
                          </ul>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">2. TensorFlow</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>特点：
                          <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                            <li>静态计算图</li>
                            <li>生产就绪</li>
                            <li>跨平台支持</li>
                            <li>部署便捷</li>
                          </ul>
                        </li>
                        <li>应用场景：
                          <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                            <li>大规模部署</li>
                            <li>企业应用</li>
                            <li>移动端部署</li>
                          </ul>
                        </li>
                        <li>生态系统：
                          <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                            <li>Keras：高级API</li>
                            <li>TensorFlow Lite：移动端</li>
                            <li>TensorFlow.js：Web端</li>
                          </ul>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">3. Keras</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>特点：
                          <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                            <li>用户友好</li>
                            <li>模块化设计</li>
                            <li>易于扩展</li>
                            <li>多后端支持</li>
                          </ul>
                        </li>
                        <li>应用场景：
                          <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                            <li>快速原型开发</li>
                            <li>教育学习</li>
                            <li>小型项目</li>
                          </ul>
                        </li>
                        <li>主要功能：
                          <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                            <li>预定义模型</li>
                            <li>层和损失函数</li>
                            <li>优化器</li>
                            <li>回调函数</li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">框架选择指南</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">选择考虑因素：</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>项目需求
                          <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                            <li>研究还是生产</li>
                            <li>部署环境</li>
                            <li>性能要求</li>
                          </ul>
                        </li>
                        <li>团队因素
                          <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                            <li>技术栈熟悉度</li>
                            <li>开发效率</li>
                            <li>维护成本</li>
                          </ul>
                        </li>
                        <li>生态系统
                          <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                            <li>社区活跃度</li>
                            <li>文档质量</li>
                            <li>工具支持</li>
                          </ul>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">框架比较：</h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                          <thead>
                            <tr>
                              <th className="px-4 py-2 border">特性</th>
                              <th className="px-4 py-2 border">PyTorch</th>
                              <th className="px-4 py-2 border">TensorFlow</th>
                              <th className="px-4 py-2 border">Keras</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="px-4 py-2 border">学习曲线</td>
                              <td className="px-4 py-2 border">中等</td>
                              <td className="px-4 py-2 border">较陡</td>
                              <td className="px-4 py-2 border">平缓</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-2 border">灵活性</td>
                              <td className="px-4 py-2 border">高</td>
                              <td className="px-4 py-2 border">中等</td>
                              <td className="px-4 py-2 border">中等</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-2 border">部署难度</td>
                              <td className="px-4 py-2 border">中等</td>
                              <td className="px-4 py-2 border">低</td>
                              <td className="px-4 py-2 border">低</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-2 border">社区支持</td>
                              <td className="px-4 py-2 border">强</td>
                              <td className="px-4 py-2 border">强</td>
                              <td className="px-4 py-2 border">中等</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : null}

      {activeTab === 'practice' ? (
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">框架实践</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">1. PyTorch基础示例</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm text-gray-800">
{`import torch
import torch.nn as nn
import torch.optim as optim

# 定义神经网络
class SimpleNN(nn.Module):
    def __init__(self):
        super(SimpleNN, self).__init__()
        self.layer1 = nn.Linear(10, 64)
        self.layer2 = nn.Linear(64, 32)
        self.layer3 = nn.Linear(32, 1)
        self.relu = nn.ReLU()
        
    def forward(self, x):
        x = self.relu(self.layer1(x))
        x = self.relu(self.layer2(x))
        x = self.layer3(x)
        return x

# 创建模型实例
model = SimpleNN()

# 定义损失函数和优化器
criterion = nn.MSELoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# 准备数据
x = torch.randn(100, 10)  # 100个样本，每个样本10个特征
y = torch.randn(100, 1)   # 100个目标值

# 训练循环
for epoch in range(100):
    # 前向传播
    outputs = model(x)
    loss = criterion(outputs, y)
    
    # 反向传播和优化
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
    
    if (epoch + 1) % 10 == 0:
        print(f'Epoch [{epoch+1}/100], Loss: {loss.item():.4f}')

# 保存模型
torch.save(model.state_dict(), 'simple_nn.pth')`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">2. TensorFlow基础示例</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm text-gray-800">
{`import tensorflow as tf
from tensorflow.keras import layers, models

# 定义神经网络
def create_model():
    model = models.Sequential([
        layers.Dense(64, activation='relu', input_shape=(10,)),
        layers.Dense(32, activation='relu'),
        layers.Dense(1)
    ])
    return model

# 创建模型实例
model = create_model()

# 编译模型
model.compile(
    optimizer='adam',
    loss='mse',
    metrics=['mae']
)

# 准备数据
import numpy as np
x = np.random.randn(100, 10)  # 100个样本，每个样本10个特征
y = np.random.randn(100, 1)   # 100个目标值

# 训练模型
history = model.fit(
    x, y,
    epochs=100,
    batch_size=32,
    validation_split=0.2,
    verbose=1
)

# 保存模型
model.save('simple_nn.h5')

# 加载模型
loaded_model = models.load_model('simple_nn.h5')

# 预测
predictions = loaded_model.predict(x)`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">3. Keras基础示例</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm text-gray-800">
{`from keras.models import Sequential
from keras.layers import Dense, Dropout
from keras.optimizers import Adam
import numpy as np

# 定义神经网络
def create_model():
    model = Sequential([
        Dense(64, activation='relu', input_shape=(10,)),
        Dropout(0.2),
        Dense(32, activation='relu'),
        Dropout(0.2),
        Dense(1)
    ])
    return model

# 创建模型实例
model = create_model()

# 编译模型
model.compile(
    optimizer=Adam(learning_rate=0.001),
    loss='mse',
    metrics=['mae']
)

# 准备数据
x = np.random.randn(100, 10)  # 100个样本，每个样本10个特征
y = np.random.randn(100, 1)   # 100个目标值

# 训练模型
history = model.fit(
    x, y,
    epochs=100,
    batch_size=32,
    validation_split=0.2,
    verbose=1
)

# 保存模型
model.save('simple_nn_keras.h5')

# 加载模型
from keras.models import load_model
loaded_model = load_model('simple_nn_keras.h5')

# 预测
predictions = loaded_model.predict(x)`}
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
                <h3 className="text-xl font-semibold mb-2">题目一：图像分类模型</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">要求：</h4>
                  <p className="text-gray-700 mb-4">
                    使用PyTorch实现一个图像分类模型，对CIFAR-10数据集进行分类。
                  </p>
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">参考答案：</h4>
                    <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-sm text-gray-800">
{`import torch
import torch.nn as nn
import torch.optim as optim
import torchvision
import torchvision.transforms as transforms
from torch.utils.data import DataLoader

# 定义CNN模型
class CNN(nn.Module):
    def __init__(self):
        super(CNN, self).__init__()
        self.conv1 = nn.Conv2d(3, 32, 3)
        self.conv2 = nn.Conv2d(32, 64, 3)
        self.conv3 = nn.Conv2d(64, 64, 3)
        self.pool = nn.MaxPool2d(2, 2)
        self.fc1 = nn.Linear(64 * 4 * 4, 64)
        self.fc2 = nn.Linear(64, 10)
        self.relu = nn.ReLU()
        
    def forward(self, x):
        x = self.pool(self.relu(self.conv1(x)))
        x = self.pool(self.relu(self.conv2(x)))
        x = self.pool(self.relu(self.conv3(x)))
        x = x.view(-1, 64 * 4 * 4)
        x = self.relu(self.fc1(x))
        x = self.fc2(x)
        return x

# 数据预处理
transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))
])

# 加载数据集
trainset = torchvision.datasets.CIFAR10(
    root='./data', 
    train=True,
    download=True, 
    transform=transform
)
trainloader = DataLoader(
    trainset, 
    batch_size=64,
    shuffle=True, 
    num_workers=2
)

# 创建模型实例
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = CNN().to(device)

# 定义损失函数和优化器
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# 训练模型
for epoch in range(10):
    running_loss = 0.0
    for i, data in enumerate(trainloader, 0):
        inputs, labels = data[0].to(device), data[1].to(device)
        
        optimizer.zero_grad()
        outputs = model(inputs)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()
        
        running_loss += loss.item()
        if i % 200 == 199:
            print(f'[{epoch + 1}, {i + 1:5d}] loss: {running_loss / 200:.3f}')
            running_loss = 0.0

print('Finished Training')

# 保存模型
torch.save(model.state_dict(), 'cifar10_cnn.pth')`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">题目二：文本分类模型</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">要求：</h4>
                  <p className="text-gray-700 mb-4">
                    使用TensorFlow实现一个文本分类模型，对电影评论进行情感分析。
                  </p>
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">参考答案：</h4>
                    <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-sm text-gray-800">
{`import tensorflow as tf
from tensorflow.keras import layers, models
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
import numpy as np

# 准备数据
def load_data():
    # 这里使用示例数据，实际应用中应该使用真实数据集
    texts = [
        "This movie was great!",
        "I really enjoyed this film.",
        "Terrible movie, waste of time.",
        "The acting was poor.",
        # ... 更多数据
    ]
    labels = [1, 1, 0, 0]  # 1表示正面，0表示负面
    return texts, labels

# 文本预处理
def preprocess_text(texts, max_words=10000, max_len=100):
    tokenizer = Tokenizer(num_words=max_words)
    tokenizer.fit_on_texts(texts)
    sequences = tokenizer.texts_to_sequences(texts)
    x = pad_sequences(sequences, maxlen=max_len)
    return x, tokenizer

# 创建模型
def create_model(max_words, max_len):
    model = models.Sequential([
        layers.Embedding(max_words, 32, input_length=max_len),
        layers.Conv1D(32, 7, activation='relu'),
        layers.MaxPooling1D(5),
        layers.Conv1D(32, 7, activation='relu'),
        layers.GlobalMaxPooling1D(),
        layers.Dense(1, activation='sigmoid')
    ])
    return model

# 主函数
def main():
    # 加载数据
    texts, labels = load_data()
    x, tokenizer = preprocess_text(texts)
    y = np.array(labels)
    
    # 创建模型
    model = create_model(10000, 100)
    
    # 编译模型
    model.compile(
        optimizer='adam',
        loss='binary_crossentropy',
        metrics=['accuracy']
    )
    
    # 训练模型
    history = model.fit(
        x, y,
        epochs=10,
        batch_size=32,
        validation_split=0.2
    )
    
    # 保存模型
    model.save('sentiment_model.h5')
    
    # 测试模型
    test_text = "This movie was fantastic!"
    test_sequence = tokenizer.texts_to_sequences([test_text])
    test_padded = pad_sequences(test_sequence, maxlen=100)
    prediction = model.predict(test_padded)
    print(f"Sentiment: {'Positive' if prediction[0] > 0.5 else 'Negative'}")

if __name__ == '__main__':
    main()`}
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
          href="/study/ai/dl/transfer-learning"
          className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 flex items-center"
        >
          <FaArrowLeft className="mr-2" />
          上一课：迁移学习
        </Link>
        <Link 
          href="/study/ai/dl/optimization"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center"
        >
          下一课：模型压缩与优化
          <FaArrowRight className="ml-2" />
        </Link>
      </div>
    </div>
  );
} 
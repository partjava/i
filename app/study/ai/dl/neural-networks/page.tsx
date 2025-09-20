'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaRobot, FaBrain, FaChartLine, FaCode, FaLightbulb, FaNetworkWired, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { SiTensorflow, SiPytorch, SiKeras } from 'react-icons/si';

export default function NeuralNetworksPage() {
  const [activeTab, setActiveTab] = useState('theory');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">神经网络基础</h1>
      
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
          例题练习
        </button>
      </div>

      {activeTab === 'theory' ? (
        <div className="space-y-8">
          {/* 神经网络结构SVG图 */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">神经网络结构可视化</h2>
            <div className="flex justify-center mb-6">
              <svg width="600" height="220">
                {/* 输入层 */}
                <circle cx="100" cy="60" r="20" fill="#90caf9" stroke="#1976d2" strokeWidth="2" />
                <circle cx="100" cy="110" r="20" fill="#90caf9" stroke="#1976d2" strokeWidth="2" />
                <circle cx="100" cy="160" r="20" fill="#90caf9" stroke="#1976d2" strokeWidth="2" />
                <text x="100" y="200" textAnchor="middle" fill="#1976d2" fontSize="14">输入层</text>
                {/* 隐藏层 */}
                <circle cx="300" cy="40" r="20" fill="#a5d6a7" stroke="#388e3c" strokeWidth="2" />
                <circle cx="300" cy="90" r="20" fill="#a5d6a7" stroke="#388e3c" strokeWidth="2" />
                <circle cx="300" cy="140" r="20" fill="#a5d6a7" stroke="#388e3c" strokeWidth="2" />
                <circle cx="300" cy="190" r="20" fill="#a5d6a7" stroke="#388e3c" strokeWidth="2" />
                <text x="300" y="215" textAnchor="middle" fill="#388e3c" fontSize="14">隐藏层</text>
                {/* 输出层 */}
                <circle cx="500" cy="100" r="20" fill="#ffe082" stroke="#fbc02d" strokeWidth="2" />
                <text x="500" y="140" textAnchor="middle" fill="#fbc02d" fontSize="14">输出层</text>
                {/* 连接线 */}
                <line x1="120" y1="60" x2="280" y2="40" stroke="#bdbdbd" strokeWidth="2" />
                <line x1="120" y1="60" x2="280" y2="90" stroke="#bdbdbd" strokeWidth="2" />
                <line x1="120" y1="110" x2="280" y2="90" stroke="#bdbdbd" strokeWidth="2" />
                <line x1="120" y1="110" x2="280" y2="140" stroke="#bdbdbd" strokeWidth="2" />
                <line x1="120" y1="160" x2="280" y2="140" stroke="#bdbdbd" strokeWidth="2" />
                <line x1="120" y1="160" x2="280" y2="190" stroke="#bdbdbd" strokeWidth="2" />
                {/* 隐藏层到输出层 */}
                <line x1="320" y1="40" x2="480" y2="100" stroke="#bdbdbd" strokeWidth="2" />
                <line x1="320" y1="90" x2="480" y2="100" stroke="#bdbdbd" strokeWidth="2" />
                <line x1="320" y1="140" x2="480" y2="100" stroke="#bdbdbd" strokeWidth="2" />
                <line x1="320" y1="190" x2="480" y2="100" stroke="#bdbdbd" strokeWidth="2" />
              </svg>
            </div>
          </section>

          {/* 前向/反向传播流程SVG图 */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">前向传播与反向传播流程</h2>
            <div className="flex justify-center mb-6">
              <svg width="700" height="120">
                {/* 前向传播箭头 */}
                <rect x="40" y="30" width="120" height="40" fill="#e3f2fd" stroke="#1976d2" strokeWidth="2" rx="8" />
                <text x="100" y="55" textAnchor="middle" fill="#1976d2">输入数据</text>
                <polygon points="160,50 180,40 180,60" fill="#1976d2" />
                <rect x="180" y="30" width="120" height="40" fill="#a5d6a7" stroke="#388e3c" strokeWidth="2" rx="8" />
                <text x="240" y="55" textAnchor="middle" fill="#388e3c">前向传播</text>
                <polygon points="300,50 320,40 320,60" fill="#388e3c" />
                <rect x="320" y="30" width="120" height="40" fill="#ffe082" stroke="#fbc02d" strokeWidth="2" rx="8" />
                <text x="380" y="55" textAnchor="middle" fill="#fbc02d">输出/损失</text>
                <polygon points="440,50 460,40 460,60" fill="#fbc02d" />
                <rect x="460" y="30" width="120" height="40" fill="#f8bbd0" stroke="#c2185b" strokeWidth="2" rx="8" />
                <text x="520" y="55" textAnchor="middle" fill="#c2185b">反向传播</text>
                <polygon points="580,50 600,40 600,60" fill="#c2185b" />
                <rect x="600" y="30" width="80" height="40" fill="#b0bec5" stroke="#37474f" strokeWidth="2" rx="8" />
                <text x="640" y="55" textAnchor="middle" fill="#37474f">参数更新</text>
              </svg>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">神经网络的基本概念</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">神经元模型</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 mb-4">
                    神经元是神经网络的基本单元，模拟了生物神经元的工作方式：
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>输入：接收多个输入信号</li>
                    <li>权重：每个输入都有对应的权重</li>
                    <li>偏置：用于调整神经元的激活阈值</li>
                    <li>激活函数：引入非线性变换</li>
                    <li>输出：产生单个输出信号</li>
                  </ul>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">网络结构</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 mb-4">
                    神经网络由多层神经元组成，主要包括：
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>输入层：接收原始数据</li>
                    <li>隐藏层：进行特征提取和转换</li>
                    <li>输出层：产生最终预测结果</li>
                    <li>层间连接：全连接或部分连接</li>
                    <li>前向传播：信息从输入层流向输出层</li>
                  </ul>
                </div>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">学习过程</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 mb-4">
                    神经网络通过以下步骤进行学习：
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>前向传播：计算预测值</li>
                    <li>损失计算：评估预测误差</li>
                    <li>反向传播：计算梯度</li>
                    <li>参数更新：优化网络权重</li>
                    <li>迭代训练：重复以上步骤</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">激活函数</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">常用激活函数</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Sigmoid函数
                      <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                        <li>输出范围：(0,1)</li>
                        <li>特点：平滑、可导</li>
                        <li>缺点：梯度消失问题</li>
                      </ul>
                    </li>
                    <li>ReLU函数
                      <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                        <li>输出范围：[0,∞)</li>
                        <li>特点：计算简单、缓解梯度消失</li>
                        <li>缺点：死亡ReLU问题</li>
                      </ul>
                    </li>
                    <li>Tanh函数
                      <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                        <li>输出范围：(-1,1)</li>
                        <li>特点：零中心化</li>
                        <li>缺点：梯度消失问题</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">激活函数的选择</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 mb-4">
                    选择激活函数时需要考虑的因素：
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>任务类型：分类/回归</li>
                    <li>网络深度：深层网络常用ReLU</li>
                    <li>计算效率：ReLU计算简单</li>
                    <li>梯度特性：避免梯度消失/爆炸</li>
                    <li>输出范围：根据任务需求选择</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : null}

      {activeTab === 'practice' ? (
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">神经网络实现</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">1. 使用PyTorch实现多层感知机</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm text-gray-800">
{`import torch
import torch.nn as nn
import torch.optim as optim

class MLP(nn.Module):
    def __init__(self, input_size, hidden_sizes, output_size):
        super(MLP, self).__init__()
        layers = []
        
        # 添加输入层到第一个隐藏层
        layers.append(nn.Linear(input_size, hidden_sizes[0]))
        layers.append(nn.ReLU())
        
        # 添加隐藏层
        for i in range(len(hidden_sizes)-1):
            layers.append(nn.Linear(hidden_sizes[i], hidden_sizes[i+1]))
            layers.append(nn.ReLU())
        
        # 添加输出层
        layers.append(nn.Linear(hidden_sizes[-1], output_size))
        
        self.model = nn.Sequential(*layers)
    
    def forward(self, x):
        return self.model(x)

# 创建模型实例
input_size = 784  # MNIST输入大小
hidden_sizes = [128, 64]  # 两个隐藏层
output_size = 10  # 10个类别
model = MLP(input_size, hidden_sizes, output_size)

# 定义损失函数和优化器
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# 训练函数
def train(model, train_loader, criterion, optimizer, num_epochs=10):
    for epoch in range(num_epochs):
        running_loss = 0.0
        for i, data in enumerate(train_loader):
            inputs, labels = data
            
            # 前向传播
            outputs = model(inputs)
            loss = criterion(outputs, labels)
            
            # 反向传播和优化
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()
            
            running_loss += loss.item()
            
        print(f'Epoch {epoch+1}, Loss: {running_loss/len(train_loader)}')`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">2. 使用TensorFlow实现多层感知机</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm text-gray-800">
{`import tensorflow as tf
from tensorflow.keras import layers, models

def create_mlp(input_shape, hidden_sizes, output_size):
    model = models.Sequential()
    
    # 添加输入层到第一个隐藏层
    model.add(layers.Dense(hidden_sizes[0], activation='relu', input_shape=input_shape))
    
    # 添加隐藏层
    for size in hidden_sizes[1:]:
        model.add(layers.Dense(size, activation='relu'))
    
    # 添加输出层
    model.add(layers.Dense(output_size, activation='softmax'))
    
    return model

# 创建模型实例
input_shape = (784,)  # MNIST输入形状
hidden_sizes = [128, 64]  # 两个隐藏层
output_size = 10  # 10个类别
model = create_mlp(input_shape, hidden_sizes, output_size)

# 编译模型
model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

# 训练函数
def train_model(model, train_data, train_labels, epochs=10, batch_size=32):
    history = model.fit(
        train_data,
        train_labels,
        epochs=epochs,
        batch_size=batch_size,
        validation_split=0.2
    )
    return history`}
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
                <h3 className="text-xl font-semibold mb-2">题目一：手写数字识别</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">要求：</h4>
                  <p className="text-gray-700 mb-4">
                    使用PyTorch实现一个多层感知机(MLP)来识别MNIST手写数字数据集。
                  </p>
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">参考答案：</h4>
                    <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-sm text-gray-800">
{`import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import datasets, transforms
from torch.utils.data import DataLoader

# 定义MLP模型
class MLP(nn.Module):
    def __init__(self):
        super(MLP, self).__init__()
        self.flatten = nn.Flatten()
        self.fc1 = nn.Linear(784, 512)
        self.relu1 = nn.ReLU()
        self.dropout1 = nn.Dropout(0.2)
        self.fc2 = nn.Linear(512, 256)
        self.relu2 = nn.ReLU()
        self.dropout2 = nn.Dropout(0.2)
        self.fc3 = nn.Linear(256, 10)

    def forward(self, x):
        x = self.flatten(x)
        x = self.fc1(x)
        x = self.relu1(x)
        x = self.dropout1(x)
        x = self.fc2(x)
        x = self.relu2(x)
        x = self.dropout2(x)
        x = self.fc3(x)
        return x

# 数据加载和预处理
def load_data():
    transform = transforms.Compose([
        transforms.ToTensor(),
        transforms.Normalize((0.1307,), (0.3081,))
    ])
    
    train_dataset = datasets.MNIST('data', train=True, download=True, transform=transform)
    test_dataset = datasets.MNIST('data', train=False, transform=transform)
    
    train_loader = DataLoader(train_dataset, batch_size=64, shuffle=True)
    test_loader = DataLoader(test_dataset, batch_size=1000)
    
    return train_loader, test_loader

# 训练函数
def train(model, train_loader, optimizer, criterion, epoch):
    model.train()
    running_loss = 0.0
    for batch_idx, (data, target) in enumerate(train_loader):
        optimizer.zero_grad()
        output = model(data)
        loss = criterion(output, target)
        loss.backward()
        optimizer.step()
        running_loss += loss.item()
        
        if batch_idx % 100 == 99:
            print(f'Train Epoch: {epoch} [{batch_idx * len(data)}/{len(train_loader.dataset)} '
                  f'({100. * batch_idx / len(train_loader):.0f}%)]\\tLoss: {running_loss / 100:.6f}')
            running_loss = 0.0

# 测试函数
def test(model, test_loader, criterion):
    model.eval()
    test_loss = 0
    correct = 0
    with torch.no_grad():
        for data, target in test_loader:
            output = model(data)
            test_loss += criterion(output, target).item()
            pred = output.argmax(dim=1, keepdim=True)
            correct += pred.eq(target.view_as(pred)).sum().item()

    test_loss /= len(test_loader.dataset)
    print(f'\\nTest set: Average loss: {test_loss:.4f}, '
          f'Accuracy: {correct}/{len(test_loader.dataset)} '
          f'({100. * correct / len(test_loader.dataset):.0f}%)\\n')

def main():
    # 设置随机种子
    torch.manual_seed(42)
    
    # 加载数据
    train_loader, test_loader = load_data()
    
    # 创建模型
    model = MLP()
    
    # 定义损失函数和优化器
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=0.001)
    
    # 训练模型
    for epoch in range(1, 11):
        train(model, train_loader, optimizer, criterion, epoch)
        test(model, test_loader, criterion)
    
    # 保存模型
    torch.save(model.state_dict(), "mnist_mlp.pt")

if __name__ == '__main__':
    main()`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">题目二：二分类问题</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">要求：</h4>
                  <p className="text-gray-700 mb-4">
                    使用TensorFlow实现一个多层感知机，解决二分类问题。
                  </p>
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">参考答案：</h4>
                    <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-sm text-gray-800">
{`import tensorflow as tf
from tensorflow.keras import layers, models
import numpy as np

# 定义MLP模型
def create_mlp(input_shape):
    model = models.Sequential([
        layers.Dense(64, activation='relu', input_shape=input_shape),
        layers.Dropout(0.2),
        layers.Dense(32, activation='relu'),
        layers.Dropout(0.2),
        layers.Dense(1, activation='sigmoid')
    ])
    return model

# 生成示例数据
def generate_data(n_samples=1000):
    np.random.seed(42)
    X = np.random.randn(n_samples, 10)  # 10个特征
    y = (np.sum(X, axis=1) > 0).astype(int)  # 简单的二分类规则
    return X, y

# 数据预处理
def preprocess_data(X, y):
    # 划分训练集和测试集
    from sklearn.model_selection import train_test_split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    return (X_train, y_train), (X_test, y_test)

def main():
    # 生成数据
    X, y = generate_data()
    
    # 数据预处理
    (X_train, y_train), (X_test, y_test) = preprocess_data(X, y)
    
    # 创建模型
    model = create_mlp(input_shape=(10,))
    
    # 编译模型
    model.compile(
        optimizer='adam',
        loss='binary_crossentropy',
        metrics=['accuracy']
    )
    
    # 训练模型
    history = model.fit(
        X_train,
        y_train,
        epochs=50,
        batch_size=32,
        validation_split=0.2,
        callbacks=[
            tf.keras.callbacks.EarlyStopping(
                monitor='val_loss',
                patience=5,
                restore_best_weights=True
            )
        ]
    )
    
    # 评估模型
    test_loss, test_acc = model.evaluate(X_test, y_test)
    print(f'Test accuracy: {test_acc:.4f}')
    
    # 保存模型
    model.save('binary_classification_mlp.h5')

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
          href="/study/ai/dl/basic"
          className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 flex items-center"
        >
          <FaArrowLeft className="mr-2" />
          上一课：深度学习基础
        </Link>
        <Link 
          href="/study/ai/dl/cnn"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center"
        >
          下一课：卷积神经网络
          <FaArrowRight className="ml-2" />
        </Link>
      </div>
    </div>
  );
} 
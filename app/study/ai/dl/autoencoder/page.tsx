'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaRobot, FaBrain, FaChartLine, FaCode, FaLightbulb, FaNetworkWired, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { SiTensorflow, SiPytorch, SiKeras } from 'react-icons/si';

export default function AutoencoderPage() {
  const [activeTab, setActiveTab] = useState('theory');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">自编码器 (Autoencoder)</h1>
      
      

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
            <h2 className="text-2xl font-semibold mb-4">自编码器概述</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">基本概念</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 mb-4">
                    自编码器是一种无监督学习的神经网络模型，主要用于数据压缩和特征学习：
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>编码器：将输入数据压缩到低维潜在空间</li>
                    <li>解码器：从潜在表示重建原始数据</li>
                    <li>无监督学习：不需要标签数据</li>
                    <li>降维和特征提取：学习数据的重要特征</li>
                  </ul>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">自编码器的类型</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>基本自编码器
                      <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                        <li>简单的编码器-解码器结构</li>
                        <li>用于数据压缩和降维</li>
                      </ul>
                    </li>
                    <li>稀疏自编码器
                      <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                        <li>添加稀疏性约束</li>
                        <li>学习更有效的特征表示</li>
                      </ul>
                    </li>
                    <li>去噪自编码器
                      <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                        <li>输入加入噪声</li>
                        <li>提高模型的鲁棒性</li>
                      </ul>
                    </li>
                    <li>变分自编码器
                      <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                        <li>生成模型</li>
                        <li>学习数据的概率分布</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">应用场景</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>数据降维和压缩</li>
                    <li>特征提取和表示学习</li>
                    <li>异常检测</li>
                    <li>图像去噪和修复</li>
                    <li>生成模型</li>
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
            <h2 className="text-2xl font-semibold mb-4">自编码器实现</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">1. 使用PyTorch实现基本自编码器</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm text-gray-800">
{`import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import datasets, transforms
from torch.utils.data import DataLoader

class Autoencoder(nn.Module):
    def __init__(self, input_dim, encoding_dim):
        super(Autoencoder, self).__init__()
        
        # 编码器
        self.encoder = nn.Sequential(
            nn.Linear(input_dim, 128),
            nn.ReLU(),
            nn.Linear(128, 64),
            nn.ReLU(),
            nn.Linear(64, encoding_dim)
        )
        
        # 解码器
        self.decoder = nn.Sequential(
            nn.Linear(encoding_dim, 64),
            nn.ReLU(),
            nn.Linear(64, 128),
            nn.ReLU(),
            nn.Linear(128, input_dim),
            nn.Sigmoid()  # 输出范围在[0,1]之间
        )
    
    def forward(self, x):
        # 编码
        encoded = self.encoder(x)
        # 解码
        decoded = self.decoder(encoded)
        return decoded

def train_autoencoder(model, train_loader, criterion, optimizer, num_epochs=10):
    for epoch in range(num_epochs):
        running_loss = 0.0
        for data, _ in train_loader:
            # 将数据展平
            data = data.view(data.size(0), -1)
            
            # 前向传播
            output = model(data)
            loss = criterion(output, data)
            
            # 反向传播和优化
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()
            
            running_loss += loss.item()
        
        print(f'Epoch {epoch+1}, Loss: {running_loss/len(train_loader):.4f}')

def main():
    # 设置参数
    input_dim = 784  # MNIST图像大小
    encoding_dim = 32  # 编码维度
    
    # 数据加载和预处理
    transform = transforms.Compose([
        transforms.ToTensor()
    ])
    
    train_dataset = datasets.MNIST('data', train=True, download=True, transform=transform)
    train_loader = DataLoader(train_dataset, batch_size=128, shuffle=True)
    
    # 创建模型
    model = Autoencoder(input_dim, encoding_dim)
    
    # 定义损失函数和优化器
    criterion = nn.MSELoss()
    optimizer = optim.Adam(model.parameters(), lr=0.001)
    
    # 训练模型
    train_autoencoder(model, train_loader, criterion, optimizer)
    
    # 保存模型
    torch.save(model.state_dict(), "autoencoder.pt")

if __name__ == '__main__':
    main()`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">2. 使用TensorFlow实现去噪自编码器</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm text-gray-800">
{`import tensorflow as tf
from tensorflow.keras import layers, Model
import numpy as np

class DenoisingAutoencoder(Model):
    def __init__(self, input_dim, encoding_dim):
        super(DenoisingAutoencoder, self).__init__()
        
        # 编码器
        self.encoder = tf.keras.Sequential([
            layers.Dense(128, activation='relu'),
            layers.Dense(64, activation='relu'),
            layers.Dense(encoding_dim)
        ])
        
        # 解码器
        self.decoder = tf.keras.Sequential([
            layers.Dense(64, activation='relu'),
            layers.Dense(128, activation='relu'),
            layers.Dense(input_dim, activation='sigmoid')
        ])
    
    def call(self, x):
        encoded = self.encoder(x)
        decoded = self.decoder(encoded)
        return decoded

def add_noise(x, noise_factor=0.3):
    """添加高斯噪声"""
    noise = np.random.normal(0, noise_factor, x.shape)
    noisy_x = x + noise
    return np.clip(noisy_x, 0, 1)

def train_denoising_autoencoder(model, train_data, epochs=10, batch_size=128):
    optimizer = tf.keras.optimizers.Adam(learning_rate=0.001)
    
    for epoch in range(epochs):
        total_loss = 0
        for i in range(0, len(train_data), batch_size):
            batch = train_data[i:i + batch_size]
            
            # 添加噪声
            noisy_batch = add_noise(batch)
            
            with tf.GradientTape() as tape:
                # 前向传播
                reconstructed = model(noisy_batch)
                # 计算损失
                loss = tf.reduce_mean(tf.square(batch - reconstructed))
            
            # 反向传播
            gradients = tape.gradient(loss, model.trainable_variables)
            optimizer.apply_gradients(zip(gradients, model.trainable_variables))
            
            total_loss += loss
        
        print(f'Epoch {epoch+1}, Loss: {total_loss/len(train_data):.4f}')

def main():
    # 设置参数
    input_dim = 784  # MNIST图像大小
    encoding_dim = 32  # 编码维度
    
    # 加载数据
    (x_train, _), (_, _) = tf.keras.datasets.mnist.load_data()
    x_train = x_train.astype('float32') / 255.0
    x_train = x_train.reshape((len(x_train), input_dim))
    
    # 创建模型
    model = DenoisingAutoencoder(input_dim, encoding_dim)
    
    # 训练模型
    train_denoising_autoencoder(model, x_train)
    
    # 保存模型
    model.save_weights("denoising_autoencoder.h5")

if __name__ == '__main__':
    main()`}
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
                <h3 className="text-xl font-semibold mb-2">题目一：图像重建</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">要求：</h4>
                  <p className="text-gray-700 mb-4">
                    使用自编码器对MNIST数据集进行图像重建，并比较不同编码维度的重建效果。
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
import matplotlib.pyplot as plt

class Autoencoder(nn.Module):
    def __init__(self, input_dim, encoding_dim):
        super(Autoencoder, self).__init__()
        
        # 编码器
        self.encoder = nn.Sequential(
            nn.Linear(input_dim, 256),
            nn.ReLU(),
            nn.Linear(256, 128),
            nn.ReLU(),
            nn.Linear(128, encoding_dim)
        )
        
        # 解码器
        self.decoder = nn.Sequential(
            nn.Linear(encoding_dim, 128),
            nn.ReLU(),
            nn.Linear(128, 256),
            nn.ReLU(),
            nn.Linear(256, input_dim),
            nn.Sigmoid()
        )
    
    def forward(self, x):
        encoded = self.encoder(x)
        decoded = self.decoder(encoded)
        return decoded

def train_and_evaluate(encoding_dim):
    # 设置参数
    input_dim = 784
    batch_size = 128
    num_epochs = 10
    
    # 数据加载
    transform = transforms.Compose([transforms.ToTensor()])
    train_dataset = datasets.MNIST('data', train=True, download=True, transform=transform)
    train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)
    
    # 创建模型
    model = Autoencoder(input_dim, encoding_dim)
    criterion = nn.MSELoss()
    optimizer = optim.Adam(model.parameters(), lr=0.001)
    
    # 训练模型
    for epoch in range(num_epochs):
        running_loss = 0.0
        for data, _ in train_loader:
            data = data.view(data.size(0), -1)
            output = model(data)
            loss = criterion(output, data)
            
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()
            
            running_loss += loss.item()
        
        print(f'Encoding dim: {encoding_dim}, Epoch {epoch+1}, Loss: {running_loss/len(train_loader):.4f}')
    
    return model

def visualize_results(models, test_loader):
    # 获取一批测试数据
    data, _ = next(iter(test_loader))
    data = data.view(data.size(0), -1)
    
    # 创建图像网格
    fig, axes = plt.subplots(len(models) + 1, 5, figsize=(15, 3 * (len(models) + 1)))
    
    # 显示原始图像
    for i in range(5):
        axes[0, i].imshow(data[i].view(28, 28).numpy(), cmap='gray')
        axes[0, i].axis('off')
    
    # 显示重建图像
    for i, (name, model) in enumerate(models.items(), 1):
        with torch.no_grad():
            output = model(data)
        for j in range(5):
            axes[i, j].imshow(output[j].view(28, 28).numpy(), cmap='gray')
            axes[i, j].axis('off')
    
    plt.tight_layout()
    plt.savefig('reconstruction_comparison.png')
    plt.close()

def main():
    # 测试不同的编码维度
    encoding_dims = [2, 8, 32, 128]
    models = {}
    
    for dim in encoding_dims:
        print(f"\\nTraining model with encoding dimension {dim}")
        model = train_and_evaluate(dim)
        models[f'Dim {dim}'] = model
    
    # 加载测试数据
    transform = transforms.Compose([transforms.ToTensor()])
    test_dataset = datasets.MNIST('data', train=False, download=True, transform=transform)
    test_loader = DataLoader(test_dataset, batch_size=5, shuffle=True)
    
    # 可视化结果
    visualize_results(models, test_loader)

if __name__ == '__main__':
    main()`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">题目二：异常检测</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">要求：</h4>
                  <p className="text-gray-700 mb-4">
                    使用自编码器对MNIST数据集进行异常检测，识别出异常样本。
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
import numpy as np
import matplotlib.pyplot as plt

class Autoencoder(nn.Module):
    def __init__(self, input_dim, encoding_dim):
        super(Autoencoder, self).__init__()
        
        # 编码器
        self.encoder = nn.Sequential(
            nn.Linear(input_dim, 256),
            nn.ReLU(),
            nn.Linear(256, 128),
            nn.ReLU(),
            nn.Linear(128, encoding_dim)
        )
        
        # 解码器
        self.decoder = nn.Sequential(
            nn.Linear(encoding_dim, 128),
            nn.ReLU(),
            nn.Linear(128, 256),
            nn.ReLU(),
            nn.Linear(256, input_dim),
            nn.Sigmoid()
        )
    
    def forward(self, x):
        encoded = self.encoder(x)
        decoded = self.decoder(encoded)
        return decoded

def train_autoencoder(model, train_loader, criterion, optimizer, num_epochs=10):
    for epoch in range(num_epochs):
        running_loss = 0.0
        for data, _ in train_loader:
            data = data.view(data.size(0), -1)
            output = model(data)
            loss = criterion(output, data)
            
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()
            
            running_loss += loss.item()
        
        print(f'Epoch {epoch+1}, Loss: {running_loss/len(train_loader):.4f}')

def detect_anomalies(model, test_loader, threshold):
    anomalies = []
    reconstruction_errors = []
    
    with torch.no_grad():
        for data, _ in test_loader:
            data = data.view(data.size(0), -1)
            output = model(data)
            
            # 计算重建误差
            error = torch.mean((data - output) ** 2, dim=1)
            reconstruction_errors.extend(error.numpy())
            
            # 识别异常样本
            anomaly_mask = error > threshold
            anomalies.extend(anomaly_mask.numpy())
    
    return np.array(anomalies), np.array(reconstruction_errors)

def visualize_anomalies(test_loader, anomalies, reconstruction_errors):
    # 获取一批测试数据
    data, _ = next(iter(test_loader))
    data = data.view(data.size(0), -1)
    
    # 选择前5个异常样本
    anomaly_indices = np.where(anomalies)[0][:5]
    
    # 创建图像网格
    fig, axes = plt.subplots(2, 5, figsize=(15, 6))
    
    # 显示原始图像
    for i, idx in enumerate(anomaly_indices):
        axes[0, i].imshow(data[idx].view(28, 28).numpy(), cmap='gray')
        axes[0, i].set_title(f'Error: {reconstruction_errors[idx]:.4f}')
        axes[0, i].axis('off')
    
    # 显示重建图像
    with torch.no_grad():
        output = model(data)
    for i, idx in enumerate(anomaly_indices):
        axes[1, i].imshow(output[idx].view(28, 28).numpy(), cmap='gray')
        axes[1, i].axis('off')
    
    plt.tight_layout()
    plt.savefig('anomaly_detection.png')
    plt.close()

def main():
    # 设置参数
    input_dim = 784
    encoding_dim = 32
    batch_size = 128
    num_epochs = 10
    threshold = 0.1  # 异常检测阈值
    
    # 数据加载
    transform = transforms.Compose([transforms.ToTensor()])
    train_dataset = datasets.MNIST('data', train=True, download=True, transform=transform)
    test_dataset = datasets.MNIST('data', train=False, download=True, transform=transform)
    
    train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)
    test_loader = DataLoader(test_dataset, batch_size=batch_size, shuffle=False)
    
    # 创建模型
    model = Autoencoder(input_dim, encoding_dim)
    criterion = nn.MSELoss()
    optimizer = optim.Adam(model.parameters(), lr=0.001)
    
    # 训练模型
    train_autoencoder(model, train_loader, criterion, optimizer, num_epochs)
    
    # 检测异常
    anomalies, reconstruction_errors = detect_anomalies(model, test_loader, threshold)
    
    # 可视化结果
    visualize_anomalies(test_loader, anomalies, reconstruction_errors)
    
    # 打印统计信息
    print(f"\\n检测到的异常样本数量: {np.sum(anomalies)}")
    print(f"异常样本比例: {np.mean(anomalies):.2%}")

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
          href="/study/ai/dl/gan"
          className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 flex items-center"
        >
          <FaArrowLeft className="mr-2" />
          上一课：生成对抗网络
        </Link>
        <Link 
          href="/study/ai/dl/transfer-learning"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center"
        >
          下一课：迁移学习
          <FaArrowRight className="ml-2" />
        </Link>
      </div>
    </div>
  );
} 
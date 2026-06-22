'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@/app/components/ui/book/BookContent'

const basicAutoencoderCode = `import torch
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
    main()`

const denoisingAutoencoderCode = `import tensorflow as tf
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
    main()`

const imageReconCode = `import torch
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
    main()`

const anomalyCode = `import torch
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

def visualize_anomalies(test_loader, anomalies, reconstruction_errors, model):
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
    visualize_anomalies(test_loader, anomalies, reconstruction_errors, model)

    # 打印统计信息
    print(f"\\n检测到的异常样本数量: {np.sum(anomalies)}")
    print(f"异常样本比例: {np.mean(anomalies):.2%}")

if __name__ == '__main__':
    main()`

const META: LessonMeta = {
  subject: '深度学习',
  chapterTitle: '自编码器',
  chapterNumber: 8,
  totalChapters: 14,
  subjectHref: '/study/ai/dl',
  prevChapter: { label: '生成对抗网络', href: '/study/ai/dl/gan' },
  nextChapter: { label: '迁移学习', href: '/study/ai/dl/transfer-learning' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '理论知识',
    left: (
      <div className="space-y-4">
        <PageTitle>自编码器概述</PageTitle>

        <SectionTitle>基本概念</SectionTitle>
        <BookParagraph>
          自编码器是一种无监督学习的神经网络模型，主要用于数据压缩和特征学习：
        </BookParagraph>
        <BookList items={[
          '编码器：将输入数据压缩到低维潜在空间',
          '解码器：从潜在表示重建原始数据',
          '无监督学习：不需要标签数据',
          '降维和特征提取：学习数据的重要特征',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>自编码器的类型</SectionTitle>
        <BookList items={[
          '基本自编码器：简单的编码器-解码器结构，用于数据压缩和降维',
          '稀疏自编码器：添加稀疏性约束，学习更有效的特征表示',
          '去噪自编码器：输入加入噪声，提高模型的鲁棒性',
          '变分自编码器：生成模型，学习数据的概率分布',
        ]} />

        <SectionTitle>应用场景</SectionTitle>
        <BookList items={[
          '数据降维和压缩',
          '特征提取和表示学习',
          '异常检测',
          '图像去噪和修复',
          '生成模型',
        ]} />
      </div>
    ),
  },
  {
    label: '代码实践',
    left: (
      <div className="space-y-4">
        <PageTitle>自编码器实现</PageTitle>

        <SectionTitle>1. 使用PyTorch实现基本自编码器</SectionTitle>
        <BookCode language="python" code={basicAutoencoderCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>2. 使用TensorFlow实现去噪自编码器</SectionTitle>
        <BookCode language="python" code={denoisingAutoencoderCode} />
      </div>
    ),
  },
  {
    label: '例题练习',
    left: (
      <div className="space-y-4">
        <PageTitle>实战练习</PageTitle>

        <SectionTitle>题目一：图像重建</SectionTitle>
        <BookParagraph><b>要求：</b>使用自编码器对MNIST数据集进行图像重建，并比较不同编码维度的重建效果。</BookParagraph>
        <BookParagraph><b>参考答案：</b></BookParagraph>
        <BookCode language="python" code={imageReconCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>题目二：异常检测</SectionTitle>
        <BookParagraph><b>要求：</b>使用自编码器对MNIST数据集进行异常检测，识别出异常样本。</BookParagraph>
        <BookParagraph><b>参考答案：</b></BookParagraph>
        <BookCode language="python" code={anomalyCode} />
      </div>
    ),
  },
]

export default function DlAutoencoderPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

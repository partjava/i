'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaRobot, FaBrain, FaChartLine, FaCode, FaLightbulb, FaNetworkWired, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { SiTensorflow, SiPytorch, SiKeras } from 'react-icons/si';

export default function GANPage() {
  const [activeTab, setActiveTab] = useState('theory');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">生成对抗网络(GAN)</h1>
      
      

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
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">GAN基础理论</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">基本概念</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 mb-4">
                    GAN（生成对抗网络）是一种生成模型，由生成器(Generator)和判别器(Discriminator)两个网络组成：
                  </p>
                  <div className="mb-4">
                    <svg width="100%" height="300" viewBox="0 0 800 300">
                      {/* GAN架构图 */}
                      <rect x="50" y="50" width="300" height="200" fill="#e2e8f0" stroke="#64748b" strokeWidth="2"/>
                      <text x="200" y="40" textAnchor="middle" fill="#64748b">生成器</text>
                      
                      <rect x="450" y="50" width="300" height="200" fill="#e2e8f0" stroke="#64748b" strokeWidth="2"/>
                      <text x="600" y="40" textAnchor="middle" fill="#64748b">判别器</text>
                      
                      {/* 生成器组件 */}
                      <rect x="100" y="100" width="200" height="50" fill="#93c5fd" stroke="#3b82f6" strokeWidth="2"/>
                      <text x="200" y="130" textAnchor="middle" fill="#3b82f6">随机噪声输入</text>
                      
                      <rect x="100" y="170" width="200" height="50" fill="#93c5fd" stroke="#3b82f6" strokeWidth="2"/>
                      <text x="200" y="200" textAnchor="middle" fill="#3b82f6">生成假样本</text>
                      
                      {/* 判别器组件 */}
                      <rect x="500" y="100" width="200" height="50" fill="#86efac" stroke="#22c55e" strokeWidth="2"/>
                      <text x="600" y="130" textAnchor="middle" fill="#22c55e">输入样本</text>
                      
                      <rect x="500" y="170" width="200" height="50" fill="#86efac" stroke="#22c55e" strokeWidth="2"/>
                      <text x="600" y="200" textAnchor="middle" fill="#22c55e">真假判断</text>
                      
                      {/* 连接箭头 */}
                      <path d="M350 200 L450 200" stroke="#64748b" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)"/>
                      <path d="M600 150 L500 150" stroke="#64748b" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)"/>
                      
                      {/* 箭头标记定义 */}
                      <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                          <polygon points="0 0, 10 3.5, 0 7" fill="#64748b"/>
                        </marker>
                      </defs>
                    </svg>
                  </div>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>生成器
                      <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                        <li>输入：随机噪声</li>
                        <li>输出：生成的假样本</li>
                        <li>目标：生成逼真的样本</li>
                      </ul>
                    </li>
                    <li>判别器
                      <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                        <li>输入：真实样本或生成样本</li>
                        <li>输出：样本为真的概率</li>
                        <li>目标：准确区分真假样本</li>
                      </ul>
                    </li>
                    <li>对抗训练
                      <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                        <li>生成器和判别器相互对抗</li>
                        <li>生成器试图欺骗判别器</li>
                        <li>判别器试图识破生成器</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">训练过程</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 mb-4">
                    GAN的训练过程是一个极小极大博弈：
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>判别器训练
                      <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                        <li>最大化真实样本的判别概率</li>
                        <li>最小化生成样本的判别概率</li>
                        <li>使用二元交叉熵损失函数</li>
                      </ul>
                    </li>
                    <li>生成器训练
                      <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                        <li>最大化生成样本的判别概率</li>
                        <li>欺骗判别器认为生成样本为真</li>
                        <li>使用对抗损失函数</li>
                      </ul>
                    </li>
                    <li>训练技巧
                      <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                        <li>交替训练生成器和判别器</li>
                        <li>使用标签平滑化</li>
                        <li>添加噪声增加稳定性</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">GAN变体</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 mb-4">
                    GAN的几种主要变体：
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>DCGAN
                      <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                        <li>使用卷积神经网络</li>
                        <li>更稳定的训练过程</li>
                        <li>更好的生成质量</li>
                      </ul>
                    </li>
                    <li>WGAN
                      <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                        <li>使用Wasserstein距离</li>
                        <li>解决模式崩溃问题</li>
                        <li>更稳定的训练</li>
                      </ul>
                    </li>
                    <li>CycleGAN
                      <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                        <li>无配对图像转换</li>
                        <li>循环一致性损失</li>
                        <li>风格迁移应用</li>
                      </ul>
                    </li>
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
            <h2 className="text-2xl font-semibold mb-4">GAN实现</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">1. 使用PyTorch实现DCGAN</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm text-gray-800">
{`import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader
from torchvision import datasets, transforms
import numpy as np

class Generator(nn.Module):
    """
    生成器网络：将随机噪声转换为图像
    使用转置卷积层进行上采样
    """
    def __init__(self, latent_dim, channels=3):
        super(Generator, self).__init__()
        
        self.main = nn.Sequential(
            # 输入: latent_dim x 1 x 1
            nn.ConvTranspose2d(latent_dim, 512, 4, 1, 0, bias=False),
            nn.BatchNorm2d(512),
            nn.ReLU(True),
            # 状态尺寸: 512 x 4 x 4
            
            nn.ConvTranspose2d(512, 256, 4, 2, 1, bias=False),
            nn.BatchNorm2d(256),
            nn.ReLU(True),
            # 状态尺寸: 256 x 8 x 8
            
            nn.ConvTranspose2d(256, 128, 4, 2, 1, bias=False),
            nn.BatchNorm2d(128),
            nn.ReLU(True),
            # 状态尺寸: 128 x 16 x 16
            
            nn.ConvTranspose2d(128, 64, 4, 2, 1, bias=False),
            nn.BatchNorm2d(64),
            nn.ReLU(True),
            # 状态尺寸: 64 x 32 x 32
            
            nn.ConvTranspose2d(64, channels, 4, 2, 1, bias=False),
            nn.Tanh()
            # 输出: channels x 64 x 64
        )

    def forward(self, x):
        return self.main(x)

class Discriminator(nn.Module):
    """
    判别器网络：判断输入图像是真实的还是生成的
    使用卷积层进行特征提取
    """
    def __init__(self, channels=3):
        super(Discriminator, self).__init__()
        
        self.main = nn.Sequential(
            # 输入: channels x 64 x 64
            nn.Conv2d(channels, 64, 4, 2, 1, bias=False),
            nn.LeakyReLU(0.2, inplace=True),
            # 状态尺寸: 64 x 32 x 32
            
            nn.Conv2d(64, 128, 4, 2, 1, bias=False),
            nn.BatchNorm2d(128),
            nn.LeakyReLU(0.2, inplace=True),
            # 状态尺寸: 128 x 16 x 16
            
            nn.Conv2d(128, 256, 4, 2, 1, bias=False),
            nn.BatchNorm2d(256),
            nn.LeakyReLU(0.2, inplace=True),
            # 状态尺寸: 256 x 8 x 8
            
            nn.Conv2d(256, 512, 4, 2, 1, bias=False),
            nn.BatchNorm2d(512),
            nn.LeakyReLU(0.2, inplace=True),
            # 状态尺寸: 512 x 4 x 4
            
            nn.Conv2d(512, 1, 4, 1, 0, bias=False),
            nn.Sigmoid()
            # 输出: 1 x 1 x 1
        )

    def forward(self, x):
        return self.main(x).view(-1, 1).squeeze(1)

def train_gan(generator, discriminator, dataloader, num_epochs, latent_dim, device):
    """
    训练GAN模型
    generator: 生成器网络
    discriminator: 判别器网络
    dataloader: 数据加载器
    num_epochs: 训练轮数
    latent_dim: 潜在空间维度
    device: 训练设备
    """
    # 定义损失函数和优化器
    criterion = nn.BCELoss()
    g_optimizer = optim.Adam(generator.parameters(), lr=0.0002, betas=(0.5, 0.999))
    d_optimizer = optim.Adam(discriminator.parameters(), lr=0.0002, betas=(0.5, 0.999))
    
    # 训练循环
    for epoch in range(num_epochs):
        for i, real_images in enumerate(dataloader):
            batch_size = real_images.size(0)
            real_images = real_images.to(device)
            
            # 训练判别器
            d_optimizer.zero_grad()
            
            # 真实图像的损失
            label_real = torch.ones(batch_size, device=device)
            output_real = discriminator(real_images)
            d_loss_real = criterion(output_real, label_real)
            
            # 生成图像的损失
            noise = torch.randn(batch_size, latent_dim, 1, 1, device=device)
            fake_images = generator(noise)
            label_fake = torch.zeros(batch_size, device=device)
            output_fake = discriminator(fake_images.detach())
            d_loss_fake = criterion(output_fake, label_fake)
            
            # 判别器总损失
            d_loss = d_loss_real + d_loss_fake
            d_loss.backward()
            d_optimizer.step()
            
            # 训练生成器
            g_optimizer.zero_grad()
            
            # 生成器损失
            label_real = torch.ones(batch_size, device=device)
            output_fake = discriminator(fake_images)
            g_loss = criterion(output_fake, label_real)
            
            g_loss.backward()
            g_optimizer.step()
            
            # 打印训练信息
            if i % 100 == 0:
                print(f'Epoch [{epoch}/{num_epochs}] Batch [{i}/{len(dataloader)}] '
                      f'd_loss: {d_loss.item():.4f} g_loss: {g_loss.item():.4f}')

def main():
    """
    主函数：设置参数并开始训练
    """
    # 设置参数
    latent_dim = 100
    num_epochs = 100
    batch_size = 64
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    
    # 数据预处理
    transform = transforms.Compose([
        transforms.Resize(64),
        transforms.CenterCrop(64),
        transforms.ToTensor(),
        transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))
    ])
    
    # 加载数据集
    dataset = datasets.ImageFolder(root='path/to/dataset', transform=transform)
    dataloader = DataLoader(dataset, batch_size=batch_size, shuffle=True, num_workers=2)
    
    # 创建模型
    generator = Generator(latent_dim).to(device)
    discriminator = Discriminator().to(device)
    
    # 训练模型
    train_gan(generator, discriminator, dataloader, num_epochs, latent_dim, device)
    
    # 保存模型
    torch.save(generator.state_dict(), 'generator.pth')
    torch.save(discriminator.state_dict(), 'discriminator.pth')

if __name__ == '__main__':
    main()`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">2. 使用TensorFlow实现WGAN</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm text-gray-800">
{`import tensorflow as tf
from tensorflow.keras import layers, Model
import numpy as np

class Generator(Model):
    """
    生成器网络：将随机噪声转换为图像
    使用转置卷积层进行上采样
    """
    def __init__(self, latent_dim):
        super(Generator, self).__init__()
        
        self.model = tf.keras.Sequential([
            # 输入: latent_dim
            layers.Dense(7*7*256, use_bias=False, input_shape=(latent_dim,)),
            layers.BatchNormalization(),
            layers.LeakyReLU(),
            layers.Reshape((7, 7, 256)),
            
            # 上采样块1
            layers.Conv2DTranspose(128, (5, 5), strides=(1, 1), padding='same', use_bias=False),
            layers.BatchNormalization(),
            layers.LeakyReLU(),
            
            # 上采样块2
            layers.Conv2DTranspose(64, (5, 5), strides=(2, 2), padding='same', use_bias=False),
            layers.BatchNormalization(),
            layers.LeakyReLU(),
            
            # 上采样块3
            layers.Conv2DTranspose(1, (5, 5), strides=(2, 2), padding='same', use_bias=False, activation='tanh')
            # 输出: 28 x 28 x 1
        ])
    
    def call(self, x):
        return self.model(x)

class Critic(Model):
    """
    判别器网络：使用Wasserstein距离评估生成样本的质量
    不使用sigmoid激活函数
    """
    def __init__(self):
        super(Critic, self).__init__()
        
        self.model = tf.keras.Sequential([
            # 输入: 28 x 28 x 1
            layers.Conv2D(64, (5, 5), strides=(2, 2), padding='same'),
            layers.LeakyReLU(),
            layers.Dropout(0.3),
            
            layers.Conv2D(128, (5, 5), strides=(2, 2), padding='same'),
            layers.LeakyReLU(),
            layers.Dropout(0.3),
            
            layers.Flatten(),
            layers.Dense(1)
            # 输出: 1 (Wasserstein距离)
        ])
    
    def call(self, x):
        return self.model(x)

class WGAN:
    """
    WGAN模型：使用Wasserstein距离的GAN
    """
    def __init__(self, latent_dim):
        self.latent_dim = latent_dim
        self.generator = Generator(latent_dim)
        self.critic = Critic()
        
        self.generator_optimizer = tf.keras.optimizers.RMSprop(learning_rate=0.00005)
        self.critic_optimizer = tf.keras.optimizers.RMSprop(learning_rate=0.00005)
        
        self.critic_steps = 5  # 判别器训练步数
        self.clip_value = 0.01  # 权重裁剪值
    
    def gradient_penalty(self, real_images, fake_images):
        """
        计算梯度惩罚项
        """
        alpha = tf.random.uniform([real_images.shape[0], 1, 1, 1])
        interpolated = alpha * real_images + (1 - alpha) * fake_images
        
        with tf.GradientTape() as tape:
            tape.watch(interpolated)
            pred = self.critic(interpolated)
        
        gradients = tape.gradient(pred, interpolated)
        slopes = tf.sqrt(tf.reduce_sum(tf.square(gradients), axis=[1, 2, 3]))
        gradient_penalty = tf.reduce_mean((slopes - 1.) ** 2)
        return gradient_penalty
    
    @tf.function
    def train_step(self, real_images):
        """
        训练步骤
        """
        batch_size = tf.shape(real_images)[0]
        
        # 训练判别器
        for _ in range(self.critic_steps):
            noise = tf.random.normal([batch_size, self.latent_dim])
            
            with tf.GradientTape() as tape:
                fake_images = self.generator(noise, training=True)
                real_output = self.critic(real_images, training=True)
                fake_output = self.critic(fake_images, training=True)
                
                # 计算Wasserstein距离
                critic_loss = tf.reduce_mean(fake_output) - tf.reduce_mean(real_output)
                
                # 添加梯度惩罚
                gp = self.gradient_penalty(real_images, fake_images)
                critic_loss += 10.0 * gp
            
            # 更新判别器参数
            critic_gradients = tape.gradient(critic_loss, self.critic.trainable_variables)
            self.critic_optimizer.apply_gradients(zip(critic_gradients, self.critic.trainable_variables))
            
            # 权重裁剪
            for w in self.critic.trainable_variables:
                w.assign(tf.clip_by_value(w, -self.clip_value, self.clip_value))
        
        # 训练生成器
        noise = tf.random.normal([batch_size, self.latent_dim])
        
        with tf.GradientTape() as tape:
            fake_images = self.generator(noise, training=True)
            fake_output = self.critic(fake_images, training=True)
            generator_loss = -tf.reduce_mean(fake_output)
        
        # 更新生成器参数
        generator_gradients = tape.gradient(generator_loss, self.generator.trainable_variables)
        self.generator_optimizer.apply_gradients(zip(generator_gradients, self.generator.trainable_variables))
        
        return critic_loss, generator_loss
    
    def train(self, dataset, epochs):
        """
        训练模型
        dataset: 训练数据集
        epochs: 训练轮数
        """
        for epoch in range(epochs):
            for batch in dataset:
                critic_loss, generator_loss = self.train_step(batch)
                
                if batch % 100 == 0:
                    print(f'Epoch {epoch+1} Batch {batch} '
                          f'Critic Loss: {critic_loss:.4f} '
                          f'Generator Loss: {generator_loss:.4f}')
            
            # 保存生成的图像
            if (epoch + 1) % 10 == 0:
                self.generate_and_save_images(epoch + 1)
    
    def generate_and_save_images(self, epoch):
        """
        生成并保存图像
        """
        predictions = self.generator(tf.random.normal([16, self.latent_dim]), training=False)
        
        fig = plt.figure(figsize=(4, 4))
        for i in range(predictions.shape[0]):
            plt.subplot(4, 4, i+1)
            plt.imshow(predictions[i, :, :, 0] * 127.5 + 127.5, cmap='gray')
            plt.axis('off')
        
        plt.savefig(f'image_at_epoch_{epoch}.png')
        plt.close()

def main():
    """
    主函数：设置参数并开始训练
    """
    # 设置参数
    latent_dim = 100
    epochs = 100
    batch_size = 64
    
    # 加载数据集
    (train_images, _), (_, _) = tf.keras.datasets.mnist.load_data()
    train_images = train_images.reshape(train_images.shape[0], 28, 28, 1).astype('float32')
    train_images = (train_images - 127.5) / 127.5
    
    train_dataset = tf.data.Dataset.from_tensor_slices(train_images)
    train_dataset = train_dataset.shuffle(60000).batch(batch_size)
    
    # 创建和训练模型
    wgan = WGAN(latent_dim)
    wgan.train(train_dataset, epochs)
    
    # 保存模型
    wgan.generator.save_weights('generator_weights.h5')
    wgan.critic.save_weights('critic_weights.h5')

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
                <h3 className="text-xl font-semibold mb-2">题目一：图像生成</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">要求：</h4>
                  <p className="text-gray-700 mb-4">
                    使用DCGAN生成手写数字图像。
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
import numpy as np

def train_dcgan():
    """
    训练DCGAN模型生成手写数字
    """
    # 设置参数
    latent_dim = 100
    num_epochs = 100
    batch_size = 64
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    
    # 数据预处理
    transform = transforms.Compose([
        transforms.ToTensor(),
        transforms.Normalize((0.5,), (0.5,))
    ])
    
    # 加载MNIST数据集
    dataset = datasets.MNIST(root='./data', train=True, download=True, transform=transform)
    dataloader = DataLoader(dataset, batch_size=batch_size, shuffle=True)
    
    # 创建模型
    generator = Generator(latent_dim, channels=1).to(device)
    discriminator = Discriminator(channels=1).to(device)
    
    # 定义损失函数和优化器
    criterion = nn.BCELoss()
    g_optimizer = optim.Adam(generator.parameters(), lr=0.0002, betas=(0.5, 0.999))
    d_optimizer = optim.Adam(discriminator.parameters(), lr=0.0002, betas=(0.5, 0.999))
    
    # 训练循环
    for epoch in range(num_epochs):
        for i, (real_images, _) in enumerate(dataloader):
            batch_size = real_images.size(0)
            real_images = real_images.to(device)
            
            # 训练判别器
            d_optimizer.zero_grad()
            
            # 真实图像的损失
            label_real = torch.ones(batch_size, device=device)
            output_real = discriminator(real_images)
            d_loss_real = criterion(output_real, label_real)
            
            # 生成图像的损失
            noise = torch.randn(batch_size, latent_dim, 1, 1, device=device)
            fake_images = generator(noise)
            label_fake = torch.zeros(batch_size, device=device)
            output_fake = discriminator(fake_images.detach())
            d_loss_fake = criterion(output_fake, label_fake)
            
            # 判别器总损失
            d_loss = d_loss_real + d_loss_fake
            d_loss.backward()
            d_optimizer.step()
            
            # 训练生成器
            g_optimizer.zero_grad()
            
            # 生成器损失
            label_real = torch.ones(batch_size, device=device)
            output_fake = discriminator(fake_images)
            g_loss = criterion(output_fake, label_real)
            
            g_loss.backward()
            g_optimizer.step()
            
            # 打印训练信息
            if i % 100 == 0:
                print(f'Epoch [{epoch}/{num_epochs}] Batch [{i}/{len(dataloader)}] '
                      f'd_loss: {d_loss.item():.4f} g_loss: {g_loss.item():.4f}')
        
        # 保存生成的图像
        if (epoch + 1) % 10 == 0:
            save_generated_images(generator, epoch + 1, latent_dim, device)

def save_generated_images(generator, epoch, latent_dim, device):
    """
    保存生成的图像
    """
    # 生成图像
    noise = torch.randn(16, latent_dim, 1, 1, device=device)
    generated_images = generator(noise)
    
    # 将图像转换为numpy数组
    generated_images = generated_images.cpu().detach().numpy()
    
    # 创建图像网格
    fig, axes = plt.subplots(4, 4, figsize=(8, 8))
    for i, ax in enumerate(axes.flat):
        ax.imshow(generated_images[i, 0], cmap='gray')
        ax.axis('off')
    
    # 保存图像
    plt.savefig(f'generated_images_epoch_{epoch}.png')
    plt.close()

if __name__ == '__main__':
    train_dcgan()`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">题目二：风格迁移</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">要求：</h4>
                  <p className="text-gray-700 mb-4">
                    使用CycleGAN实现图像风格迁移。
                  </p>
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">参考答案：</h4>
                    <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-sm text-gray-800">
{`import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
from torchvision import transforms
import numpy as np
from PIL import Image

class CycleGAN:
    """
    CycleGAN模型：实现无配对图像风格迁移
    """
    def __init__(self):
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        
        # 创建生成器和判别器
        self.G_AB = Generator().to(self.device)  # A域到B域的生成器
        self.G_BA = Generator().to(self.device)  # B域到A域的生成器
        self.D_A = Discriminator().to(self.device)  # A域的判别器
        self.D_B = Discriminator().to(self.device)  # B域的判别器
        
        # 定义损失函数
        self.criterion_gan = nn.MSELoss()
        self.criterion_cycle = nn.L1Loss()
        self.criterion_identity = nn.L1Loss()
        
        # 定义优化器
        self.optimizer_G = optim.Adam(
            list(self.G_AB.parameters()) + list(self.G_BA.parameters()),
            lr=0.0002, betas=(0.5, 0.999)
        )
        self.optimizer_D_A = optim.Adam(self.D_A.parameters(), lr=0.0002, betas=(0.5, 0.999))
        self.optimizer_D_B = optim.Adam(self.D_B.parameters(), lr=0.0002, betas=(0.5, 0.999))
    
    def train_step(self, real_A, real_B):
        """
        训练步骤
        real_A: A域的真实图像
        real_B: B域的真实图像
        """
        # 设置输入
        real_A = real_A.to(self.device)
        real_B = real_B.to(self.device)
        
        # 训练生成器
        self.optimizer_G.zero_grad()
        
        # 身份损失
        same_B = self.G_AB(real_B)
        loss_identity_B = self.criterion_identity(same_B, real_B) * 5.0
        same_A = self.G_BA(real_A)
        loss_identity_A = self.criterion_identity(same_A, real_A) * 5.0
        
        # GAN损失
        fake_B = self.G_AB(real_A)
        pred_fake = self.D_B(fake_B)
        loss_GAN_AB = self.criterion_gan(pred_fake, torch.ones_like(pred_fake))
        
        fake_A = self.G_BA(real_B)
        pred_fake = self.D_A(fake_A)
        loss_GAN_BA = self.criterion_gan(pred_fake, torch.ones_like(pred_fake))
        
        # 循环一致性损失
        recov_A = self.G_BA(fake_B)
        loss_cycle_A = self.criterion_cycle(recov_A, real_A) * 10.0
        
        recov_B = self.G_AB(fake_A)
        loss_cycle_B = self.criterion_cycle(recov_B, real_B) * 10.0
        
        # 总生成器损失
        loss_G = loss_identity_A + loss_identity_B + loss_GAN_AB + loss_GAN_BA + loss_cycle_A + loss_cycle_B
        loss_G.backward()
        self.optimizer_G.step()
        
        # 训练判别器A
        self.optimizer_D_A.zero_grad()
        pred_real = self.D_A(real_A)
        loss_D_real = self.criterion_gan(pred_real, torch.ones_like(pred_real))
        
        pred_fake = self.D_A(fake_A.detach())
        loss_D_fake = self.criterion_gan(pred_fake, torch.zeros_like(pred_fake))
        
        loss_D_A = (loss_D_real + loss_D_fake) * 0.5
        loss_D_A.backward()
        self.optimizer_D_A.step()
        
        # 训练判别器B
        self.optimizer_D_B.zero_grad()
        pred_real = self.D_B(real_B)
        loss_D_real = self.criterion_gan(pred_real, torch.ones_like(pred_real))
        
        pred_fake = self.D_B(fake_B.detach())
        loss_D_fake = self.criterion_gan(pred_fake, torch.zeros_like(pred_fake))
        
        loss_D_B = (loss_D_real + loss_D_fake) * 0.5
        loss_D_B.backward()
        self.optimizer_D_B.step()
        
        return {
            'G_loss': loss_G.item(),
            'D_A_loss': loss_D_A.item(),
            'D_B_loss': loss_D_B.item()
        }
    
    def train(self, dataloader_A, dataloader_B, num_epochs):
        """
        训练模型
        dataloader_A: A域数据加载器
        dataloader_B: B域数据加载器
        num_epochs: 训练轮数
        """
        for epoch in range(num_epochs):
            for i, (real_A, real_B) in enumerate(zip(dataloader_A, dataloader_B)):
                losses = self.train_step(real_A, real_B)
                
                if i % 100 == 0:
                    print(f'Epoch [{epoch+1}/{num_epochs}] Batch [{i}] '
                          f'G_loss: {losses["G_loss"]:.4f} '
                          f'D_A_loss: {losses["D_A_loss"]:.4f} '
                          f'D_B_loss: {losses["D_B_loss"]:.4f}')
            
            # 保存生成的图像
            if (epoch + 1) % 10 == 0:
                self.save_generated_images(epoch + 1)
    
    def save_generated_images(self, epoch):
        """
        保存生成的图像
        """
        self.G_AB.eval()
        self.G_BA.eval()
        
        with torch.no_grad():
            # 生成A域到B域的图像
            fake_B = self.G_AB(real_A)
            # 生成B域到A域的图像
            fake_A = self.G_BA(real_B)
            
            # 保存图像
            save_image(fake_B, f'fake_B_epoch_{epoch}.png')
            save_image(fake_A, f'fake_A_epoch_{epoch}.png')
        
        self.G_AB.train()
        self.G_BA.train()

def main():
    """
    主函数：设置参数并开始训练
    """
    # 设置参数
    num_epochs = 200
    batch_size = 1
    
    # 数据预处理
    transform = transforms.Compose([
        transforms.Resize(256),
        transforms.RandomCrop(256),
        transforms.ToTensor(),
        transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))
    ])
    
    # 加载数据集
    dataset_A = ImageDataset('path/to/domain_A', transform=transform)
    dataset_B = ImageDataset('path/to/domain_B', transform=transform)
    
    dataloader_A = DataLoader(dataset_A, batch_size=batch_size, shuffle=True)
    dataloader_B = DataLoader(dataset_B, batch_size=batch_size, shuffle=True)
    
    # 创建和训练模型
    cyclegan = CycleGAN()
    cyclegan.train(dataloader_A, dataloader_B, num_epochs)
    
    # 保存模型
    torch.save(cyclegan.G_AB.state_dict(), 'G_AB.pth')
    torch.save(cyclegan.G_BA.state_dict(), 'G_BA.pth')
    torch.save(cyclegan.D_A.state_dict(), 'D_A.pth')
    torch.save(cyclegan.D_B.state_dict(), 'D_B.pth')

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
          href="/study/ai/dl/transformer"
          className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 flex items-center"
        >
          <FaArrowLeft className="mr-2" />
          上一课：Transformer架构
        </Link>
        <Link 
          href="/study/ai/dl/autoencoder"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center"
        >
          下一课：自编码器
          <FaArrowRight className="ml-2" />
        </Link>
      </div>
    </div>
  );
} 
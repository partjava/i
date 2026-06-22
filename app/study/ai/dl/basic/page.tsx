'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '深度学习',
  chapterTitle: '深度学习基础',
  chapterNumber: 1,
  totalChapters: 14,
  subjectHref: '/study/ai/dl',
  nextChapter: { label: '神经网络基础', href: '/study/ai/dl/neural-networks' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '理论知识(1)',
    left: (
      <div className="space-y-4">
        <PageTitle>深度学习概述</PageTitle>

        <SectionTitle>什么是深度学习？</SectionTitle>
        <BookParagraph>
          深度学习是机器学习的一个分支，核心思想是通过多层神经网络自动提取数据的层次化特征，实现端到端的学习。它能够处理大规模、复杂的数据，广泛应用于图像、语音、文本等领域。
        </BookParagraph>
        <BookList items={[
          '多层神经网络结构（深度模型）',
          '自动特征提取与表达',
          '端到端训练（无需手工特征）',
          '强大的非线性建模能力',
          '适合大数据和高维数据',
        ]} />

        <SectionTitle>深度学习的发展简史</SectionTitle>
        <BookList items={[
          '1943年：提出第一个人工神经元模型（McCulloch & Pitts）',
          '1958年：感知器（Perceptron）提出，开启神经网络研究',
          '1986年：反向传播算法（BP）推动多层网络训练',
          '2006年：深度信念网络（Hinton）引发深度学习热潮',
          '2012年：AlexNet在ImageNet竞赛中大放异彩，推动深度学习应用',
          '2014年：GAN、Seq2Seq等创新模型提出',
          '2017年：Transformer架构横空出世，开启大模型时代',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>深度学习的主要应用</SectionTitle>
        <BookList items={[
          '计算机视觉（CV）：图像分类、目标检测、图像分割、人脸识别等',
          '自然语言处理（NLP）：机器翻译、文本生成、情感分析、问答系统等',
          '语音与音频：语音识别、语音合成、语音分离等',
          '推荐系统、金融风控、医疗诊断、自动驾驶等',
        ]} />
      </div>
    ),
  },
  {
    label: '理论知识(2)',
    left: (
      <div className="space-y-4">
        <PageTitle>深度学习基础核心概念</PageTitle>

        <SectionTitle>神经元、激活函数与网络结构</SectionTitle>
        <BookParagraph>
          神经元是神经网络的基本单元，激活函数赋予网络非线性能力。常见网络结构有全连接网络、卷积神经网络（CNN）、循环神经网络（RNN）等。
        </BookParagraph>
        <BookList items={[
          '激活函数：Sigmoid、ReLU、Tanh、Softmax等',
          '网络结构：MLP、CNN、RNN、LSTM、Transformer等',
        ]} />

        <SectionTitle>损失函数与优化器</SectionTitle>
        <BookParagraph>
          损失函数衡量模型预测与真实值的差距，优化器用于最小化损失并更新参数。
        </BookParagraph>
        <BookList items={[
          '常见损失函数：均方误差（MSE）、交叉熵、二元交叉熵、Huber损失等',
          '常见优化器：SGD、Adam、RMSprop、AdaGrad等',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>深度学习训练流程与要点</SectionTitle>
        <BookList items={[
          '数据准备与预处理（归一化、增强等）',
          '模型设计与搭建',
          '前向传播与损失计算',
          '反向传播与参数更新',
          '模型评估与调优（验证集、超参数调整等）',
        ]} />
      </div>
    ),
  },
  {
    label: '代码实践',
    left: (
      <div className="space-y-4">
        <PageTitle>基础代码实现</PageTitle>

        <SectionTitle>1. 使用PyTorch实现简单神经网络</SectionTitle>
        <BookCode language="python" code={`import torch
import torch.nn as nn
import torch.optim as optim

# 定义神经网络模型
class SimpleNN(nn.Module):
    def __init__(self, input_size, hidden_size, output_size):
        super(SimpleNN, self).__init__()
        self.layer1 = nn.Linear(input_size, hidden_size)
        self.relu = nn.ReLU()
        self.layer2 = nn.Linear(hidden_size, output_size)

    def forward(self, x):
        x = self.layer1(x)
        x = self.relu(x)
        x = self.layer2(x)
        return x

# 创建模型实例
model = SimpleNN(input_size=10, hidden_size=20, output_size=2)

# 定义损失函数和优化器
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# 训练模型
def train_model(model, train_loader, criterion, optimizer, num_epochs=10):
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

        print(f'Epoch {epoch+1}, Loss: {running_loss/len(train_loader)}')`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>2. 使用TensorFlow实现简单神经网络</SectionTitle>
        <BookCode language="python" code={`import tensorflow as tf
from tensorflow.keras import layers, models

# 定义神经网络模型
def create_model(input_shape, num_classes):
    model = models.Sequential([
        layers.Dense(64, activation='relu', input_shape=input_shape),
        layers.Dropout(0.2),
        layers.Dense(32, activation='relu'),
        layers.Dropout(0.2),
        layers.Dense(num_classes, activation='softmax')
    ])
    return model

# 创建模型实例
model = create_model(input_shape=(10,), num_classes=2)

# 编译模型
model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

# 训练模型
def train_model(model, train_data, train_labels, epochs=10, batch_size=32):
    history = model.fit(
        train_data,
        train_labels,
        epochs=epochs,
        batch_size=batch_size,
        validation_split=0.2
    )
    return history`} />
      </div>
    ),
  },
  {
    label: '例题练习',
    left: (
      <div className="space-y-4">
        <PageTitle>实战练习</PageTitle>

        <SectionTitle>题目一：手写数字识别</SectionTitle>
        <BookParagraph><b>要求：</b>使用PyTorch实现一个简单的卷积神经网络(CNN)来识别MNIST手写数字数据集。</BookParagraph>
        <BookParagraph><b>参考答案：</b></BookParagraph>
        <BookCode language="python" code={`import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import datasets, transforms
from torch.utils.data import DataLoader

# 定义CNN模型
class CNN(nn.Module):
    def __init__(self):
        super(CNN, self).__init__()
        self.conv1 = nn.Conv2d(1, 32, kernel_size=3)
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3)
        self.conv2_drop = nn.Dropout2d()
        self.fc1 = nn.Linear(1600, 100)
        self.fc2 = nn.Linear(100, 10)

    def forward(self, x):
        x = torch.relu(self.conv1(x))
        x = torch.max_pool2d(x, 2)
        x = torch.relu(self.conv2(x))
        x = torch.max_pool2d(x, 2)
        x = self.conv2_drop(x)
        x = x.view(-1, 1600)
        x = torch.relu(self.fc1(x))
        x = self.fc2(x)
        return torch.log_softmax(x, dim=1)

# 数据加载和预处理
def load_data():
    transform = transforms.Compose([
        transforms.ToTensor(),
        transforms.Normalize((0.1307,), (0.3081,))
    ])

    train_dataset = datasets.MNIST('data', train=True, download=True, transform=transform)
    test_dataset = datasets.MNIST('data', test=False, transform=transform)

    train_loader = DataLoader(train_dataset, batch_size=64, shuffle=True)
    test_loader = DataLoader(test_dataset, batch_size=1000)

    return train_loader, test_loader

# 训练函数
def train(model, train_loader, optimizer, epoch):
    model.train()
    for batch_idx, (data, target) in enumerate(train_loader):
        optimizer.zero_grad()
        output = model(data)
        loss = nn.CrossEntropyLoss()(output, target)
        loss.backward()
        optimizer.step()
        if batch_idx % 100 == 0:
            print(f'Train Epoch: {epoch} [{batch_idx * len(data)}/{len(train_loader.dataset)} '
                  f'({100. * batch_idx / len(train_loader):.0f}%)]\\tLoss: {loss.item():.6f}')

# 测试函数
def test(model, test_loader):
    model.eval()
    test_loss = 0
    correct = 0
    with torch.no_grad():
        for data, target in test_loader:
            output = model(data)
            test_loss += nn.CrossEntropyLoss()(output, target).item()
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
    model = CNN()

    # 定义优化器
    optimizer = optim.Adam(model.parameters())

    # 训练模型
    for epoch in range(1, 11):
        train(model, train_loader, optimizer, epoch)
        test(model, test_loader)

    # 保存模型
    torch.save(model.state_dict(), "mnist_cnn.pt")

if __name__ == '__main__':
    main()`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>题目二：图像分类</SectionTitle>
        <BookParagraph><b>要求：</b>使用TensorFlow实现一个简单的图像分类模型，对CIFAR-10数据集进行分类。</BookParagraph>
        <BookParagraph><b>参考答案：</b></BookParagraph>
        <BookCode language="python" code={`import tensorflow as tf
from tensorflow.keras import layers, models
from tensorflow.keras.datasets import cifar10
import numpy as np

# 定义CNN模型
def create_cnn_model():
    model = models.Sequential([
        # 第一个卷积块
        layers.Conv2D(32, (3, 3), activation='relu', padding='same', input_shape=(32, 32, 3)),
        layers.Conv2D(32, (3, 3), activation='relu', padding='same'),
        layers.MaxPooling2D((2, 2)),
        layers.Dropout(0.25),

        # 第二个卷积块
        layers.Conv2D(64, (3, 3), activation='relu', padding='same'),
        layers.Conv2D(64, (3, 3), activation='relu', padding='same'),
        layers.MaxPooling2D((2, 2)),
        layers.Dropout(0.25),

        # 全连接层
        layers.Flatten(),
        layers.Dense(512, activation='relu'),
        layers.Dropout(0.5),
        layers.Dense(10, activation='softmax')
    ])
    return model

# 数据预处理
def preprocess_data():
    (x_train, y_train), (x_test, y_test) = cifar10.load_data()

    # 归一化
    x_train = x_train.astype('float32') / 255
    x_test = x_test.astype('float32') / 255

    # 转换为one-hot编码
    y_train = tf.keras.utils.to_categorical(y_train, 10)
    y_test = tf.keras.utils.to_categorical(y_test, 10)

    return (x_train, y_train), (x_test, y_test)

# 数据增强
def create_data_generator():
    datagen = tf.keras.preprocessing.image.ImageDataGenerator(
        rotation_range=20,
        width_shift_range=0.2,
        height_shift_range=0.2,
        horizontal_flip=True,
        fill_mode='nearest'
    )
    return datagen

def main():
    # 加载和预处理数据
    (x_train, y_train), (x_test, y_test) = preprocess_data()

    # 创建模型
    model = create_cnn_model()

    # 编译模型
    model.compile(
        optimizer='adam',
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )

    # 创建数据生成器
    datagen = create_data_generator()

    # 训练模型
    history = model.fit(
        datagen.flow(x_train, y_train, batch_size=64),
        epochs=50,
        validation_data=(x_test, y_test),
        steps_per_epoch=len(x_train) // 64
    )

    # 评估模型
    test_loss, test_acc = model.evaluate(x_test, y_test)
    print(f'Test accuracy: {test_acc:.4f}')

    # 保存模型
    model.save('cifar10_cnn.h5')

if __name__ == '__main__':
    main()`} />
      </div>
    ),
  },
]

export default function DlBasicPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

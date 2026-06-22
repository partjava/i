'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@/app/components/ui/book/BookContent'

const convCode = `import torch
import torch.nn as nn
import torch.optim as optim

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

# 创建模型实例
model = CNN()

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

        print(f'Epoch {epoch+1}, Loss: {running_loss/len(train_loader)}')`

const tfCnnCode = `import tensorflow as tf
from tensorflow.keras import layers, models

def create_cnn():
    model = models.Sequential([
        # 第一个卷积块
        layers.Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)),
        layers.MaxPooling2D((2, 2)),

        # 第二个卷积块
        layers.Conv2D(64, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),

        # 第三个卷积块
        layers.Conv2D(64, (3, 3), activation='relu'),

        # 全连接层
        layers.Flatten(),
        layers.Dense(64, activation='relu'),
        layers.Dense(10, activation='softmax')
    ])
    return model

# 创建模型实例
model = create_cnn()

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
    return history`

const cifar10Code = `import torch
import torch.nn as nn
import torch.optim as optim
import torchvision
import torchvision.transforms as transforms

# 定义CNN模型
class CIFAR10CNN(nn.Module):
    def __init__(self):
        super(CIFAR10CNN, self).__init__()
        self.conv1 = nn.Conv2d(3, 32, 3)
        self.conv2 = nn.Conv2d(32, 64, 3)
        self.conv3 = nn.Conv2d(64, 64, 3)
        self.pool = nn.MaxPool2d(2, 2)
        self.fc1 = nn.Linear(64 * 4 * 4, 64)
        self.fc2 = nn.Linear(64, 10)
        self.dropout = nn.Dropout(0.5)

    def forward(self, x):
        x = self.pool(torch.relu(self.conv1(x)))
        x = self.pool(torch.relu(self.conv2(x)))
        x = torch.relu(self.conv3(x))
        x = x.view(-1, 64 * 4 * 4)
        x = self.dropout(x)
        x = torch.relu(self.fc1(x))
        x = self.fc2(x)
        return x

# 数据加载和预处理
def load_data():
    transform = transforms.Compose([
        transforms.ToTensor(),
        transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))
    ])

    trainset = torchvision.datasets.CIFAR10(root='./data', train=True,
                                          download=True, transform=transform)
    trainloader = torch.utils.data.DataLoader(trainset, batch_size=64,
                                            shuffle=True, num_workers=2)

    testset = torchvision.datasets.CIFAR10(root='./data', train=False,
                                         download=True, transform=transform)
    testloader = torch.utils.data.DataLoader(testset, batch_size=64,
                                           shuffle=False, num_workers=2)

    return trainloader, testloader

# 训练函数
def train(model, trainloader, criterion, optimizer, epoch):
    model.train()
    running_loss = 0.0
    for i, data in enumerate(trainloader):
        inputs, labels = data

        optimizer.zero_grad()
        outputs = model(inputs)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()

        running_loss += loss.item()
        if i % 100 == 99:
            print(f'[{epoch + 1}, {i + 1:5d}] loss: {running_loss / 100:.3f}')
            running_loss = 0.0

# 测试函数
def test(model, testloader):
    model.eval()
    correct = 0
    total = 0
    with torch.no_grad():
        for data in testloader:
            images, labels = data
            outputs = model(images)
            _, predicted = torch.max(outputs.data, 1)
            total += labels.size(0)
            correct += (predicted == labels).sum().item()

    print(f'Accuracy: {100 * correct / total:.2f}%')

def main():
    # 设置随机种子
    torch.manual_seed(42)

    # 加载数据
    trainloader, testloader = load_data()

    # 创建模型
    model = CIFAR10CNN()

    # 定义损失函数和优化器
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=0.001)

    # 训练模型
    for epoch in range(10):
        train(model, trainloader, criterion, optimizer, epoch)
        test(model, testloader)

    # 保存模型
    torch.save(model.state_dict(), "cifar10_cnn.pt")

if __name__ == '__main__':
    main()`

const detectionCode = `import tensorflow as tf
from tensorflow.keras import layers, models
import numpy as np

# 定义目标检测模型
def create_detection_model(input_shape):
    model = models.Sequential([
        # 特征提取
        layers.Conv2D(32, (3, 3), activation='relu', input_shape=input_shape),
        layers.MaxPooling2D((2, 2)),
        layers.Conv2D(64, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),
        layers.Conv2D(64, (3, 3), activation='relu'),

        # 检测头
        layers.Flatten(),
        layers.Dense(64, activation='relu'),
        layers.Dense(4, activation='sigmoid')  # 边界框坐标 (x, y, w, h)
    ])
    return model

# 生成示例数据
def generate_data(n_samples=1000):
    np.random.seed(42)
    # 生成随机图像
    X = np.random.rand(n_samples, 64, 64, 3)
    # 生成随机边界框
    y = np.random.rand(n_samples, 4)
    return X, y

# 数据预处理
def preprocess_data(X, y):
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
    model = create_detection_model(input_shape=(64, 64, 3))

    # 编译模型
    model.compile(
        optimizer='adam',
        loss='mse',
        metrics=['mae']
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
    test_loss, test_mae = model.evaluate(X_test, y_test)
    print(f'Test MAE: {test_mae:.4f}')

    # 保存模型
    model.save('object_detection_model.h5')

if __name__ == '__main__':
    main()`

const META: LessonMeta = {
  subject: '深度学习',
  chapterTitle: '卷积神经网络',
  chapterNumber: 3,
  totalChapters: 14,
  subjectHref: '/study/ai/dl',
  prevChapter: { label: '神经网络基础', href: '/study/ai/dl/neural-networks' },
  nextChapter: { label: '循环神经网络', href: '/study/ai/dl/rnn' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '理论知识',
    left: (
      <div className="space-y-4">
        <PageTitle>卷积神经网络（CNN）概述</PageTitle>

        <SectionTitle>核心思想与优势</SectionTitle>
        <BookParagraph>
          卷积神经网络（CNN）是一类专门用于处理具有类似网格结构的数据（如图像）的深度学习模型。其核心思想是通过卷积操作自动提取局部特征，利用参数共享和稀疏连接大幅减少模型参数量。
        </BookParagraph>
        <BookList items={[
          '局部感受野：每个神经元只关注输入的一小块区域',
          '参数共享：同一卷积核在不同位置重复使用',
          '稀疏连接：减少参数，提升泛化能力',
          '强大的特征提取能力，适合图像、语音等任务',
        ]} />

        <SectionTitle>典型应用场景</SectionTitle>
        <BookList items={[
          '图像分类、目标检测、图像分割',
          '人脸识别、自动驾驶、医学影像分析',
          '语音识别、视频分析等',
        ]} />

        <SectionTitle>卷积层</SectionTitle>
        <div className="mb-2">
          <svg width="100%" height="160" viewBox="0 0 800 160">
            {/* 输入特征图 */}
            <rect x="50" y="40" width="80" height="80" fill="#e2e8f0" stroke="#64748b" strokeWidth="2"/>
            <text x="90" y="30" textAnchor="middle" fill="#64748b">输入特征图</text>
            {/* 卷积核 */}
            <rect x="250" y="50" width="50" height="50" fill="#93c5fd" stroke="#3b82f6" strokeWidth="2"/>
            <text x="275" y="40" textAnchor="middle" fill="#3b82f6">卷积核</text>
            {/* 输出特征图 */}
            <rect x="450" y="40" width="80" height="80" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
            <text x="490" y="30" textAnchor="middle" fill="#2563eb">输出特征图</text>
            {/* 箭头 */}
            <path d="M130 80 L250 75" stroke="#64748b" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)"/>
            <path d="M300 75 L450 80" stroke="#64748b" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)"/>
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#64748b"/>
              </marker>
            </defs>
          </svg>
        </div>
        <BookList items={[
          '卷积核：可学习的参数矩阵',
          '步长：卷积核移动的步长',
          '填充：保持特征图大小',
          '特征图：卷积运算的输出',
          '多通道：处理彩色图像',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>池化层</SectionTitle>
        <div className="mb-2">
          <svg width="100%" height="160" viewBox="0 0 800 160">
            {/* 输入特征图 */}
            <rect x="50" y="40" width="100" height="100" fill="#e2e8f0" stroke="#64748b" strokeWidth="2"/>
            <text x="100" y="30" textAnchor="middle" fill="#64748b">输入特征图</text>
            {/* 池化窗口 */}
            <rect x="250" y="40" width="100" height="100" fill="#86efac" stroke="#22c55e" strokeWidth="2" fillOpacity="0.3"/>
            <text x="300" y="30" textAnchor="middle" fill="#22c55e">池化窗口</text>
            {/* 输出特征图 */}
            <rect x="450" y="60" width="50" height="50" fill="#dcfce7" stroke="#16a34a" strokeWidth="2"/>
            <text x="475" y="50" textAnchor="middle" fill="#16a34a">输出特征图</text>
            {/* 箭头 */}
            <path d="M150 90 L250 90" stroke="#64748b" strokeWidth="2" fill="none" markerEnd="url(#arrowhead2)"/>
            <path d="M350 90 L450 85" stroke="#64748b" strokeWidth="2" fill="none" markerEnd="url(#arrowhead2)"/>
            <defs>
              <marker id="arrowhead2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#64748b"/>
              </marker>
            </defs>
          </svg>
        </div>
        <BookList items={[
          '最大池化：取区域最大值',
          '平均池化：取区域平均值',
          '池化窗口：通常为2x2',
          '步长：通常等于窗口大小',
          '作用：减少参数、防止过拟合',
        ]} />

        <SectionTitle>全连接层</SectionTitle>
        <div className="mb-2">
          <svg width="100%" height="160" viewBox="0 0 800 160">
            {/* 特征图 */}
            <rect x="50" y="40" width="80" height="80" fill="#e2e8f0" stroke="#64748b" strokeWidth="2"/>
            <text x="90" y="30" textAnchor="middle" fill="#64748b">特征图</text>
            {/* 展平 */}
            <rect x="250" y="40" width="80" height="80" fill="#f3e8ff" stroke="#9333ea" strokeWidth="2"/>
            <text x="290" y="30" textAnchor="middle" fill="#9333ea">展平</text>
            {/* 全连接层 */}
            <rect x="450" y="40" width="80" height="80" fill="#fae8ff" stroke="#c026d3" strokeWidth="2"/>
            <text x="490" y="30" textAnchor="middle" fill="#c026d3">全连接层</text>
            {/* 箭头 */}
            <path d="M130 80 L250 80" stroke="#64748b" strokeWidth="2" fill="none" markerEnd="url(#arrowhead3)"/>
            <path d="M330 80 L450 80" stroke="#64748b" strokeWidth="2" fill="none" markerEnd="url(#arrowhead3)"/>
            <defs>
              <marker id="arrowhead3" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#64748b"/>
              </marker>
            </defs>
          </svg>
        </div>
        <BookList items={[
          '特征整合：将特征图展平',
          '分类决策：输出类别概率',
          'Dropout：防止过拟合',
          '激活函数：通常使用Softmax',
        ]} />

        <SectionTitle>经典CNN架构</SectionTitle>
        <BookParagraph><b>LeNet-5</b></BookParagraph>
        <BookList items={[
          '第一个成功的CNN架构',
          '用于手写数字识别',
          '包含2个卷积层和3个全连接层',
          '使用Sigmoid激活函数',
        ]} />
        <BookParagraph><b>AlexNet</b></BookParagraph>
        <BookList items={[
          '2012年ImageNet竞赛冠军',
          '使用ReLU激活函数',
          '引入Dropout技术',
          '使用GPU加速训练',
        ]} />
        <BookParagraph><b>VGGNet</b></BookParagraph>
        <BookList items={[
          '使用小尺寸卷积核(3x3)',
          '结构简单规整',
          '易于迁移学习',
          '参数量较大',
        ]} />
      </div>
    ),
  },
  {
    label: '代码实践',
    left: (
      <div className="space-y-4">
        <PageTitle>CNN实现</PageTitle>

        <SectionTitle>1. 使用PyTorch实现CNN</SectionTitle>
        <BookCode language="python" code={convCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>2. 使用TensorFlow实现CNN</SectionTitle>
        <BookCode language="python" code={tfCnnCode} />
      </div>
    ),
  },
  {
    label: '例题练习',
    left: (
      <div className="space-y-4">
        <PageTitle>实战练习</PageTitle>

        <SectionTitle>题目一：图像分类</SectionTitle>
        <BookParagraph><b>要求：</b>使用PyTorch实现一个CNN模型，对CIFAR-10数据集进行分类。</BookParagraph>
        <BookParagraph><b>参考答案：</b></BookParagraph>
        <BookCode language="python" code={cifar10Code} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>题目二：目标检测</SectionTitle>
        <BookParagraph><b>要求：</b>使用TensorFlow实现一个简单的目标检测模型。</BookParagraph>
        <BookParagraph><b>参考答案：</b></BookParagraph>
        <BookCode language="python" code={detectionCode} />
      </div>
    ),
  },
]

export default function DlCnnPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

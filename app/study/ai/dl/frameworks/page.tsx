'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@/app/components/ui/book/BookContent'

const pytorchBasicCode = `import torch
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
torch.save(model.state_dict(), 'simple_nn.pth')`

const tfBasicCode = `import tensorflow as tf
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
predictions = loaded_model.predict(x)`

const kerasBasicCode = `from keras.models import Sequential
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
predictions = loaded_model.predict(x)`

const cifar10CnnCode = `import torch
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
torch.save(model.state_dict(), 'cifar10_cnn.pth')`

const textClassTfCode = `import tensorflow as tf
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
    main()`

const META: LessonMeta = {
  subject: '深度学习',
  chapterTitle: '深度学习框架',
  chapterNumber: 10,
  totalChapters: 14,
  subjectHref: '/study/ai/dl',
  prevChapter: { label: '迁移学习', href: '/study/ai/dl/transfer-learning' },
  nextChapter: { label: '模型压缩与优化', href: '/study/ai/dl/optimization' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '理论知识',
    left: (
      <div className="space-y-4">
        <PageTitle>深度学习框架概述</PageTitle>

        <SectionTitle>什么是深度学习框架？</SectionTitle>
        <BookParagraph>
          深度学习框架是用于构建、训练和部署深度学习模型的软件工具。它们提供了高级API和底层优化，使得开发者能够更高效地实现复杂的神经网络。
        </BookParagraph>
        <BookParagraph><b>框架的主要功能：</b></BookParagraph>
        <BookList items={[
          '自动微分：自动计算梯度',
          '张量运算：高效的矩阵运算',
          '模型构建：预定义层和模型架构',
          '优化器：各种优化算法实现',
          '数据加载：高效的数据处理管道',
          '分布式训练：多GPU/多机训练支持',
          '模型部署：模型导出和推理优化',
        ]} />

        <SectionTitle>1. PyTorch</SectionTitle>
        <BookList items={[
          '特点：动态计算图、Python优先、灵活性强、调试方便',
          '应用场景：研究原型开发、学术研究、快速实验',
          '生态系统：torchvision(计算机视觉)、torchaudio(音频处理)、torchtext(文本处理)',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>2. TensorFlow</SectionTitle>
        <BookList items={[
          '特点：静态计算图、生产就绪、跨平台支持、部署便捷',
          '应用场景：大规模部署、企业应用、移动端部署',
          '生态系统：Keras(高级API)、TensorFlow Lite(移动端)、TensorFlow.js(Web端)',
        ]} />

        <SectionTitle>3. Keras</SectionTitle>
        <BookList items={[
          '特点：用户友好、模块化设计、易于扩展、多后端支持',
          '应用场景：快速原型开发、教育学习、小型项目',
          '主要功能：预定义模型、层和损失函数、优化器、回调函数',
        ]} />

        <SectionTitle>框架选择指南</SectionTitle>
        <BookParagraph><b>选择考虑因素：</b></BookParagraph>
        <BookList items={[
          '项目需求：研究还是生产、部署环境、性能要求',
          '团队因素：技术栈熟悉度、开发效率、维护成本',
          '生态系统：社区活跃度、文档质量、工具支持',
        ]} />

        <BookParagraph><b>框架比较：</b></BookParagraph>
        <table className="min-w-full bg-white border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">特性</th>
              <th className="px-4 py-2 border">PyTorch</th>
              <th className="px-4 py-2 border">TensorFlow</th>
              <th className="px-4 py-2 border">Keras</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="px-4 py-2 border">学习曲线</td><td className="px-4 py-2 border">中等</td><td className="px-4 py-2 border">较陡</td><td className="px-4 py-2 border">平缓</td></tr>
            <tr><td className="px-4 py-2 border">灵活性</td><td className="px-4 py-2 border">高</td><td className="px-4 py-2 border">中等</td><td className="px-4 py-2 border">中等</td></tr>
            <tr><td className="px-4 py-2 border">部署难度</td><td className="px-4 py-2 border">中等</td><td className="px-4 py-2 border">低</td><td className="px-4 py-2 border">低</td></tr>
            <tr><td className="px-4 py-2 border">社区支持</td><td className="px-4 py-2 border">强</td><td className="px-4 py-2 border">强</td><td className="px-4 py-2 border">中等</td></tr>
          </tbody>
        </table>
      </div>
    ),
  },
  {
    label: '代码实践',
    left: (
      <div className="space-y-4">
        <PageTitle>框架实践</PageTitle>

        <SectionTitle>1. PyTorch基础示例</SectionTitle>
        <BookCode language="python" code={pytorchBasicCode} />

        <SectionTitle>2. TensorFlow基础示例</SectionTitle>
        <BookCode language="python" code={tfBasicCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>3. Keras基础示例</SectionTitle>
        <BookCode language="python" code={kerasBasicCode} />
      </div>
    ),
  },
  {
    label: '实战练习',
    left: (
      <div className="space-y-4">
        <PageTitle>实战练习</PageTitle>

        <SectionTitle>题目一：图像分类模型</SectionTitle>
        <BookParagraph><b>要求：</b>使用PyTorch实现一个图像分类模型，对CIFAR-10数据集进行分类。</BookParagraph>
        <BookParagraph><b>参考答案：</b></BookParagraph>
        <BookCode language="python" code={cifar10CnnCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>题目二：文本分类模型</SectionTitle>
        <BookParagraph><b>要求：</b>使用TensorFlow实现一个文本分类模型，对电影评论进行情感分析。</BookParagraph>
        <BookParagraph><b>参考答案：</b></BookParagraph>
        <BookCode language="python" code={textClassTfCode} />
      </div>
    ),
  },
]

export default function DlFrameworksPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

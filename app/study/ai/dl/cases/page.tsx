'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@shared/components/ui/book/BookContent'

const imageClassCode = `import torch
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
        optimizer.step()`

const textClassCode = `import tensorflow as tf
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
model.fit(train_data, train_labels, epochs=5, batch_size=512, validation_split=0.2)`

const detectCode = `# 安装YOLOv5依赖
!git clone https://github.com/ultralytics/yolov5
%cd yolov5
!pip install -r requirements.txt

# 训练自己的数据集
!python train.py --img 640 --batch 16 --epochs 50 --data data.yaml --weights yolov5s.pt

# 推理
!python detect.py --weights runs/train/exp/weights/best.pt --img 640 --source data/images/`

const imageAugCode = `# 数据增强
transform = transforms.Compose([
    transforms.RandomHorizontalFlip(),
    transforms.RandomCrop(32, padding=4),
    transforms.ToTensor(),
    transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))
])
# 其余代码同典型案例，可尝试更深的网络结构如ResNet等`

const lstmCode = `# 替换模型部分为LSTM
model = models.Sequential([
    layers.Embedding(10000, 32),
    layers.LSTM(32),
    layers.Dense(1, activation='sigmoid')
])
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])`

const META: LessonMeta = {
  subject: '深度学习',
  chapterTitle: '深度学习实战',
  chapterNumber: 12,
  totalChapters: 14,
  subjectHref: '/study/ai/dl',
  prevChapter: { label: '模型压缩与优化', href: '/study/ai/dl/optimization' },
  nextChapter: { label: '深度学习面试题', href: '/study/ai/dl/interview' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '实战简介',
    left: (
      <div className="space-y-4">
        <PageTitle>深度学习实战简介</PageTitle>
        <BookParagraph>
          深度学习实战是将理论知识应用于真实世界问题的关键环节。通过实战项目，您可以掌握模型训练、调优、部署等全流程技能，提升工程能力。
        </BookParagraph>
        <BookList items={[
          '了解深度学习在图像、文本、语音等领域的典型应用',
          '掌握数据预处理、模型设计、训练与评估、部署等完整流程',
          '积累项目经验，提升解决实际问题的能力',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>学习目标</SectionTitle>
        <BookParagraph>
          通过本课程的实战项目，您将能够独立完成一个完整的深度学习项目，从需求分析到模型部署的全流程。
        </BookParagraph>
      </div>
    ),
  },
  {
    label: '典型案例',
    left: (
      <div className="space-y-4">
        <PageTitle>典型实战案例</PageTitle>

        <SectionTitle>1. 图像分类（Image Classification）</SectionTitle>
        <BookParagraph>
          图像分类是计算机视觉中最基础的任务之一，广泛应用于自动驾驶、医学影像、安防监控等领域。常用数据集有CIFAR-10、ImageNet等。
        </BookParagraph>
        <BookParagraph>使用PyTorch实现CIFAR-10图像分类：</BookParagraph>
        <BookCode language="python" code={imageClassCode} />

        <SectionTitle>2. 文本分类（Text Classification）</SectionTitle>
        <BookParagraph>
          文本分类是自然语言处理中的核心任务，常用于垃圾邮件识别、情感分析、新闻分类等。IMDB数据集是情感分析的经典数据集。
        </BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookParagraph>使用TensorFlow实现IMDB情感分析：</BookParagraph>
        <BookCode language="python" code={textClassCode} />

        <SectionTitle>3. 目标检测（Object Detection）</SectionTitle>
        <BookParagraph>
          目标检测用于识别图像中的所有目标及其位置，广泛应用于自动驾驶、安防、工业检测等。YOLOv5是当前主流的目标检测算法之一。
        </BookParagraph>
        <BookParagraph>使用YOLOv5进行目标检测（伪代码）：</BookParagraph>
        <BookCode language="bash" code={detectCode} />
      </div>
    ),
  },
  {
    label: '项目结构',
    left: (
      <div className="space-y-4">
        <PageTitle>项目结构与实用技巧</PageTitle>
        <BookList items={[
          '合理划分数据、代码、模型、结果、文档等文件夹',
          '使用虚拟环境和requirements.txt管理依赖',
          '采用版本控制（如Git）管理项目',
          '记录实验参数和结果，便于复现',
          '编写README文档，说明项目结构和使用方法',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookCode language="text" code={`project-root/
├── data/         # 数据集
├── code/         # 代码文件
├── models/       # 训练好的模型
├── results/      # 结果输出
├── docs/         # 文档说明
├── requirements.txt
├── README.md`} />
      </div>
    ),
  },
  {
    label: '实战练习',
    left: (
      <div className="space-y-4">
        <PageTitle>实战练习</PageTitle>

        <SectionTitle>练习一：CIFAR-10图像分类</SectionTitle>
        <BookParagraph>
          基于CIFAR-10实现一个完整的图像分类项目，并尝试提升准确率。
        </BookParagraph>
        <BookParagraph><b>实现思路：</b>数据增强、优化网络结构、调整超参数等。</BookParagraph>
        <BookParagraph><b>参考代码：</b></BookParagraph>
        <BookCode language="python" code={imageAugCode} />

        <SectionTitle>练习二：IMDB情感分析</SectionTitle>
        <BookParagraph>
          用IMDB数据集完成情感分析，并对比不同模型的效果。
        </BookParagraph>
        <BookParagraph><b>实现思路：</b>尝试不同的网络结构（如LSTM、GRU、CNN）、调整embedding维度等。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookParagraph><b>参考代码：</b></BookParagraph>
        <BookCode language="python" code={lstmCode} />

        <SectionTitle>练习三：YOLOv5目标检测</SectionTitle>
        <BookParagraph>
          尝试用YOLOv5训练自己的目标检测数据集。
        </BookParagraph>
        <BookParagraph><b>实现思路：</b>按YOLOv5官方文档准备数据集（VOC/COCO格式），修改data.yaml，运行训练命令。</BookParagraph>
        <BookParagraph><b>训练命令：</b></BookParagraph>
        <BookCode language="bash" code={`python train.py --img 640 --batch 16 --epochs 50 --data data.yaml --weights yolov5s.pt`} />

        <SectionTitle>练习四：整理项目结构</SectionTitle>
        <BookParagraph>
          整理项目结构，撰写项目文档和复现说明。
        </BookParagraph>
        <BookParagraph><b>README.md 示例：</b></BookParagraph>
        <BookCode language="markdown" code={`# 项目名称
## 简介
## 环境依赖
## 运行方法
## 结果展示`} />
      </div>
    ),
  },
]

export default function DlCasesPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

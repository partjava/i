'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@shared/components/ui/book/BookContent'

const pytorchTransferCode = `import torch
import torch.nn as nn
import torchvision
import torchvision.transforms as transforms
from torch.utils.data import DataLoader
from torchvision.datasets import ImageFolder

def create_transfer_model():
    # 加载预训练的ResNet50模型
    model = torchvision.models.resnet50(pretrained=True)

    # 冻结所有层
    for param in model.parameters():
        param.requires_grad = False

    # 修改最后的全连接层
    num_features = model.fc.in_features
    num_classes = 10  # 目标任务的类别数
    model.fc = nn.Sequential(
        nn.Linear(num_features, 512),
        nn.ReLU(),
        nn.Dropout(0.5),
        nn.Linear(512, num_classes)
    )

    return model

def train_model(model, train_loader, val_loader, num_epochs=10):
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model = model.to(device)

    # 只训练最后的全连接层
    optimizer = torch.optim.Adam(model.fc.parameters(), lr=0.001)
    criterion = nn.CrossEntropyLoss()

    for epoch in range(num_epochs):
        model.train()
        running_loss = 0.0

        for images, labels in train_loader:
            images = images.to(device)
            labels = labels.to(device)

            optimizer.zero_grad()
            outputs = model(images)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()

            running_loss += loss.item()

        # 验证
        model.eval()
        correct = 0
        total = 0

        with torch.no_grad():
            for images, labels in val_loader:
                images = images.to(device)
                labels = labels.to(device)

                outputs = model(images)
                _, predicted = torch.max(outputs.data, 1)

                total += labels.size(0)
                correct += (predicted == labels).sum().item()

        print(f'Epoch {epoch+1}, Loss: {running_loss/len(train_loader):.4f}, '
              f'Accuracy: {100 * correct / total:.2f}%')

def main():
    # 数据预处理
    transform = transforms.Compose([
        transforms.Resize(256),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406],
                           std=[0.229, 0.224, 0.225])
    ])

    # 加载数据集
    train_dataset = ImageFolder('path/to/train', transform=transform)
    val_dataset = ImageFolder('path/to/val', transform=transform)

    train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)
    val_loader = DataLoader(val_dataset, batch_size=32, shuffle=False)

    # 创建模型
    model = create_transfer_model()

    # 训练模型
    train_model(model, train_loader, val_loader)

    # 保存模型
    torch.save(model.state_dict(), 'transfer_model.pt')

if __name__ == '__main__':
    main()`

const tfTransferCode = `import tensorflow as tf
from tensorflow.keras.applications import ResNet50
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D
from tensorflow.keras.models import Model
from tensorflow.keras.preprocessing.image import ImageDataGenerator

def create_transfer_model():
    # 加载预训练的ResNet50模型
    base_model = ResNet50(weights='imagenet', include_top=False)

    # 冻结基础模型的层
    for layer in base_model.layers:
        layer.trainable = False

    # 添加新的分类层
    x = base_model.output
    x = GlobalAveragePooling2D()(x)
    x = Dense(512, activation='relu')(x)
    predictions = Dense(10, activation='softmax')(x)  # 10个类别

    model = Model(inputs=base_model.input, outputs=predictions)
    return model

def prepare_data():
    # 数据增强
    train_datagen = ImageDataGenerator(
        rescale=1./255,
        rotation_range=20,
        width_shift_range=0.2,
        height_shift_range=0.2,
        horizontal_flip=True,
        fill_mode='nearest'
    )

    val_datagen = ImageDataGenerator(rescale=1./255)

    # 加载数据
    train_generator = train_datagen.flow_from_directory(
        'path/to/train',
        target_size=(224, 224),
        batch_size=32,
        class_mode='categorical'
    )

    validation_generator = val_datagen.flow_from_directory(
        'path/to/val',
        target_size=(224, 224),
        batch_size=32,
        class_mode='categorical'
    )

    return train_generator, validation_generator

def train_model(model, train_generator, validation_generator, epochs=10):
    # 编译模型
    model.compile(
        optimizer='adam',
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )

    # 训练模型
    history = model.fit(
        train_generator,
        steps_per_epoch=train_generator.samples // train_generator.batch_size,
        epochs=epochs,
        validation_data=validation_generator,
        validation_steps=validation_generator.samples // validation_generator.batch_size
    )

    return history

def fine_tune_model(model, train_generator, validation_generator, epochs=10):
    # 解冻ResNet50的最后几层
    for layer in model.layers[-20:]:
        layer.trainable = True

    # 重新编译模型
    model.compile(
        optimizer=tf.keras.optimizers.Adam(1e-5),  # 较小的学习率
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )

    # 微调训练
    history = model.fit(
        train_generator,
        steps_per_epoch=train_generator.samples // train_generator.batch_size,
        epochs=epochs,
        validation_data=validation_generator,
        validation_steps=validation_generator.samples // validation_generator.batch_size
    )

    return history

def main():
    # 创建模型
    model = create_transfer_model()

    # 准备数据
    train_generator, validation_generator = prepare_data()

    # 训练模型
    print("Phase 1: Training only the top layers")
    history1 = train_model(model, train_generator, validation_generator)

    print("Phase 2: Fine-tuning the model")
    history2 = fine_tune_model(model, train_generator, validation_generator)

    # 保存模型
    model.save('transfer_model.h5')

if __name__ == '__main__':
    main()`

const flowerClassifierCode = `import torch
import torch.nn as nn
import torchvision
import torchvision.transforms as transforms
from torch.utils.data import DataLoader
from torchvision.datasets import ImageFolder
import matplotlib.pyplot as plt

class FlowerClassifier(nn.Module):
    def __init__(self, num_classes=5):
        super(FlowerClassifier, self).__init__()
        # 加载预训练的ResNet50
        self.resnet = torchvision.models.resnet50(pretrained=True)

        # 冻结特征提取层
        for param in self.resnet.parameters():
            param.requires_grad = False

        # 修改分类层
        num_features = self.resnet.fc.in_features
        self.resnet.fc = nn.Sequential(
            nn.Linear(num_features, 256),
            nn.ReLU(),
            nn.Dropout(0.5),
            nn.Linear(256, num_classes)
        )

    def forward(self, x):
        return self.resnet(x)

def train_flower_classifier():
    # 数据预处理
    transform = transforms.Compose([
        transforms.RandomResizedCrop(224),
        transforms.RandomHorizontalFlip(),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])

    # 加载数据集
    train_dataset = ImageFolder('flowers/train', transform=transform)
    val_dataset = ImageFolder('flowers/val', transform=transform)

    train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)
    val_loader = DataLoader(val_dataset, batch_size=32)

    # 创建模型
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model = FlowerClassifier().to(device)

    # 训练参数
    criterion = nn.CrossEntropyLoss()
    optimizer = torch.optim.Adam(model.resnet.fc.parameters(), lr=0.001)
    num_epochs = 10

    # 训练循环
    train_losses = []
    val_accuracies = []

    for epoch in range(num_epochs):
        model.train()
        running_loss = 0.0

        for images, labels in train_loader:
            images = images.to(device)
            labels = labels.to(device)

            optimizer.zero_grad()
            outputs = model(images)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()

            running_loss += loss.item()

        epoch_loss = running_loss / len(train_loader)
        train_losses.append(epoch_loss)

        # 验证
        model.eval()
        correct = 0
        total = 0

        with torch.no_grad():
            for images, labels in val_loader:
                images = images.to(device)
                labels = labels.to(device)

                outputs = model(images)
                _, predicted = torch.max(outputs.data, 1)

                total += labels.size(0)
                correct += (predicted == labels).sum().item()

        accuracy = 100 * correct / total
        val_accuracies.append(accuracy)

        print(f'Epoch [{epoch+1}/{num_epochs}], Loss: {epoch_loss:.4f}, Accuracy: {accuracy:.2f}%')

    # 绘制训练曲线
    plt.figure(figsize=(10, 5))
    plt.subplot(1, 2, 1)
    plt.plot(train_losses)
    plt.title('Training Loss')
    plt.xlabel('Epoch')
    plt.ylabel('Loss')

    plt.subplot(1, 2, 2)
    plt.plot(val_accuracies)
    plt.title('Validation Accuracy')
    plt.xlabel('Epoch')
    plt.ylabel('Accuracy (%)')

    plt.tight_layout()
    plt.savefig('training_curves.png')

    # 保存模型
    torch.save(model.state_dict(), 'flower_classifier.pt')

if __name__ == '__main__':
    train_flower_classifier()`

const bertSentimentCode = `from transformers import BertTokenizer, BertForSequenceClassification
import torch
from torch.utils.data import Dataset, DataLoader
import pandas as pd
import numpy as np

class ReviewDataset(Dataset):
    def __init__(self, reviews, labels, tokenizer, max_len=128):
        self.reviews = reviews
        self.labels = labels
        self.tokenizer = tokenizer
        self.max_len = max_len

    def __len__(self):
        return len(self.reviews)

    def __getitem__(self, idx):
        review = str(self.reviews[idx])
        label = self.labels[idx]

        encoding = self.tokenizer.encode_plus(
            review,
            add_special_tokens=True,
            max_length=self.max_len,
            return_token_type_ids=False,
            padding='max_length',
            truncation=True,
            return_attention_mask=True,
            return_tensors='pt'
        )

        return {
            'review_text': review,
            'input_ids': encoding['input_ids'].flatten(),
            'attention_mask': encoding['attention_mask'].flatten(),
            'label': torch.tensor(label, dtype=torch.long)
        }

def train_sentiment_classifier():
    # 加载预训练模型和分词器
    tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
    model = BertForSequenceClassification.from_pretrained(
        'bert-base-uncased',
        num_labels=2
    )

    # 准备数据
    df = pd.read_csv('movie_reviews.csv')
    train_data = ReviewDataset(
        reviews=df['review'].values,
        labels=df['sentiment'].values,
        tokenizer=tokenizer
    )

    train_loader = DataLoader(
        train_data,
        batch_size=16,
        shuffle=True
    )

    # 训练设置
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model = model.to(device)

    optimizer = torch.optim.AdamW(model.parameters(), lr=2e-5)
    num_epochs = 3

    # 训练循环
    for epoch in range(num_epochs):
        model.train()
        total_loss = 0

        for batch in train_loader:
            input_ids = batch['input_ids'].to(device)
            attention_mask = batch['attention_mask'].to(device)
            labels = batch['label'].to(device)

            optimizer.zero_grad()

            outputs = model(
                input_ids=input_ids,
                attention_mask=attention_mask,
                labels=labels
            )

            loss = outputs.loss
            total_loss += loss.item()

            loss.backward()
            optimizer.step()

        avg_loss = total_loss / len(train_loader)
        print(f'Epoch [{epoch+1}/{num_epochs}], Loss: {avg_loss:.4f}')

    # 保存模型
    model.save_pretrained('sentiment_classifier')
    tokenizer.save_pretrained('sentiment_classifier')

def predict_sentiment(text, model, tokenizer):
    # 预处理文本
    encoding = tokenizer.encode_plus(
        text,
        add_special_tokens=True,
        max_length=128,
        return_token_type_ids=False,
        padding='max_length',
        truncation=True,
        return_attention_mask=True,
        return_tensors='pt'
    )

    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    input_ids = encoding['input_ids'].to(device)
    attention_mask = encoding['attention_mask'].to(device)

    # 预测
    model.eval()
    with torch.no_grad():
        outputs = model(
            input_ids=input_ids,
            attention_mask=attention_mask
        )
        predictions = torch.softmax(outputs.logits, dim=1)

    return predictions[0].cpu().numpy()

if __name__ == '__main__':
    # 训练模型
    train_sentiment_classifier()

    # 测试预测
    model = BertForSequenceClassification.from_pretrained('sentiment_classifier')
    tokenizer = BertTokenizer.from_pretrained('sentiment_classifier')

    test_text = "This movie was fantastic! I really enjoyed every moment of it."
    predictions = predict_sentiment(test_text, model, tokenizer)
    sentiment = "Positive" if predictions[1] > predictions[0] else "Negative"
    confidence = max(predictions)

    print(f"Text: {test_text}")
    print(f"Sentiment: {sentiment}")
    print(f"Confidence: {confidence:.2f}")`

const META: LessonMeta = {
  subject: '深度学习',
  chapterTitle: '迁移学习',
  chapterNumber: 9,
  totalChapters: 14,
  subjectHref: '/study/ai/dl',
  prevChapter: { label: '自编码器', href: '/study/ai/dl/autoencoder' },
  nextChapter: { label: '深度学习框架', href: '/study/ai/dl/frameworks' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '理论知识(1)',
    left: (
      <div className="space-y-4">
        <PageTitle>迁移学习概述</PageTitle>

        <SectionTitle>基本概念</SectionTitle>
        <BookParagraph>
          迁移学习是一种机器学习方法，它可以将在一个任务上学到的知识迁移到另一个相关任务上。这种方法的核心思想是：通过利用源任务（source task）中学到的知识来帮助目标任务（target task）的学习。
        </BookParagraph>
        <div className="mb-2">
          <svg width="100%" height="240" viewBox="0 0 800 240">
            {/* 源任务 */}
            <rect x="50" y="40" width="160" height="80" fill="#e2e8f0" stroke="#64748b" strokeWidth="2"/>
            <text x="130" y="30" textAnchor="middle" fill="#64748b">源任务</text>
            <text x="130" y="85" textAnchor="middle" fill="#64748b">大规模数据集</text>
            {/* 预训练模型 */}
            <rect x="280" y="40" width="160" height="80" fill="#93c5fd" stroke="#3b82f6" strokeWidth="2"/>
            <text x="360" y="30" textAnchor="middle" fill="#3b82f6">预训练模型</text>
            <text x="360" y="85" textAnchor="middle" fill="#3b82f6">学到的特征</text>
            {/* 目标任务 */}
            <rect x="520" y="40" width="160" height="80" fill="#86efac" stroke="#22c55e" strokeWidth="2"/>
            <text x="600" y="30" textAnchor="middle" fill="#22c55e">目标任务</text>
            <text x="600" y="85" textAnchor="middle" fill="#22c55e">小规模数据集</text>
            {/* 箭头 */}
            <path d="M210 80 L280 80" stroke="#64748b" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)"/>
            <path d="M440 80 L520 80" stroke="#64748b" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)"/>
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#64748b"/>
              </marker>
            </defs>
          </svg>
        </div>

        <BookParagraph><b>迁移学习的优势：</b></BookParagraph>
        <BookList items={[
          '知识迁移：利用已有模型的知识，避免从零开始学习',
          '减少数据需求：目标任务只需要少量数据就能达到好的效果',
          '加快训练：缩短模型训练时间，提高开发效率',
          '提高性能：改善模型在目标任务上的表现',
          '解决冷启动问题：在数据稀缺的情况下仍能构建有效模型',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookParagraph><b>迁移学习的原理：</b></BookParagraph>
        <BookList items={[
          '特征共享：源任务和目标任务之间存在共同的特征空间',
          '知识表示：预训练模型学习到的特征表示具有通用性',
          '层次化学习：浅层特征通常更通用，深层特征更具体',
          '领域适应：通过调整模型参数来适应目标域的特点',
        ]} />

        <BookParagraph><b>迁移学习的挑战：</b></BookParagraph>
        <BookList items={[
          '负迁移：源任务知识可能对目标任务产生负面影响',
          '领域差异：源域和目标域之间的分布差异',
          '任务相关性：源任务和目标任务的相关程度',
          '模型选择：选择合适的预训练模型和迁移策略',
          '计算资源：预训练模型通常需要较大的计算资源',
        ]} />

        <SectionTitle>迁移学习的类型</SectionTitle>
        <BookParagraph><b>1. 特征迁移</b></BookParagraph>
        <BookList items={[
          '保留预训练模型的特征提取层，只训练新的分类层',
          '适用于目标任务与源任务相似的情况，计算效率高',
          '适合数据量较小的场景',
        ]} />
        <BookParagraph><b>2. 微调（Fine-tuning）</b></BookParagraph>
        <BookList items={[
          '保留预训练模型的部分层，微调部分层的参数',
          '可以调整学习率策略',
          '适用于目标任务与源任务有一定差异的情况，需要更多数据',
        ]} />
        <BookParagraph><b>3. 领域适应</b></BookParagraph>
        <BookList items={[
          '处理源域和目标域的分布差异，减少域偏移',
          '使用领域对抗训练、特征对齐和分布匹配',
          '适用于领域差异较大的情况',
        ]} />
        <BookParagraph><b>4. 多任务学习</b></BookParagraph>
        <BookList items={[
          '同时学习多个相关任务，共享模型参数',
          '任务间的知识共享，提高模型的泛化能力',
          '需要设计合适的任务权重',
        ]} />
      </div>
    ),
  },
  {
    label: '理论知识(2)',
    left: (
      <div className="space-y-4">
        <PageTitle>应用场景</PageTitle>

        <SectionTitle>1. 计算机视觉</SectionTitle>
        <BookParagraph><b>图像分类：</b>使用ImageNet预训练模型，迁移到特定领域的图像分类</BookParagraph>
        <BookParagraph><b>目标检测：</b>基于预训练的特征提取器，迁移到新的检测任务</BookParagraph>
        <BookParagraph><b>语义分割：</b>迁移预训练的特征提取能力，适应新的分割任务</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>2. 自然语言处理</SectionTitle>
        <BookParagraph><b>文本分类：</b>使用BERT等预训练模型，迁移到特定领域的文本分类</BookParagraph>
        <BookParagraph><b>命名实体识别：</b>迁移预训练的语言理解能力，适应新的实体类型</BookParagraph>
        <BookParagraph><b>机器翻译：</b>跨语言迁移，低资源语言翻译</BookParagraph>

        <SectionTitle>3. 语音识别</SectionTitle>
        <BookParagraph><b>跨语言迁移：</b>迁移语音特征提取能力，适应新的语言环境</BookParagraph>
        <BookParagraph><b>说话人识别：</b>迁移声学特征表示，适应新的说话人</BookParagraph>
      </div>
    ),
  },
  {
    label: '代码实践',
    left: (
      <div className="space-y-4">
        <PageTitle>迁移学习实现</PageTitle>

        <SectionTitle>1. 使用PyTorch实现迁移学习</SectionTitle>
        <BookCode language="python" code={pytorchTransferCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>2. 使用TensorFlow实现迁移学习</SectionTitle>
        <BookCode language="python" code={tfTransferCode} />
      </div>
    ),
  },
  {
    label: '例题练习',
    left: (
      <div className="space-y-4">
        <PageTitle>实战练习</PageTitle>

        <SectionTitle>题目一：花卉图像分类</SectionTitle>
        <BookParagraph><b>要求：</b>使用迁移学习实现花卉图像分类任务，使用预训练的ResNet50模型对5种不同的花卉进行分类。</BookParagraph>
        <BookParagraph><b>参考答案：</b></BookParagraph>
        <BookCode language="python" code={flowerClassifierCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>题目二：文本情感分类</SectionTitle>
        <BookParagraph><b>要求：</b>使用BERT预训练模型进行文本情感分类任务，对电影评论进行正面/负面分类。</BookParagraph>
        <BookParagraph><b>参考答案：</b></BookParagraph>
        <BookCode language="python" code={bertSentimentCode} />
      </div>
    ),
  },
]

export default function DlTransferLearningPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

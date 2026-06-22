'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@/app/components/ui/book/BookContent'

const pytorchRnnCode = `import torch
import torch.nn as nn

class RNN(nn.Module):
    def __init__(self, input_size, hidden_size, output_size):
        super(RNN, self).__init__()
        self.hidden_size = hidden_size
        self.rnn = nn.RNN(input_size, hidden_size, batch_first=True)
        self.fc = nn.Linear(hidden_size, output_size)

    def forward(self, x, hidden):
        out, hidden = self.rnn(x, hidden)
        out = self.fc(out)
        return out, hidden

    def init_hidden(self, batch_size):
        return torch.zeros(1, batch_size, self.hidden_size)

# 创建模型实例
input_size = 10
hidden_size = 20
output_size = 5
model = RNN(input_size, hidden_size, output_size)

# 定义损失函数和优化器
criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.01)

# 训练函数
def train(model, train_loader, criterion, optimizer, num_epochs=10):
    for epoch in range(num_epochs):
        hidden = model.init_hidden(batch_size)
        for i, (inputs, labels) in enumerate(train_loader):
            optimizer.zero_grad()
            outputs, hidden = model(inputs, hidden)
            loss = criterion(outputs.view(-1, output_size), labels.view(-1))
            loss.backward()
            optimizer.step()

            if (i+1) % 100 == 0:
                print(f'Epoch [{epoch+1}/{num_epochs}], Step [{i+1}], Loss: {loss.item():.4f}')`

const tfLstmCode = `import tensorflow as tf
from tensorflow.keras import layers, models

def create_lstm_model(input_shape, output_size):
    model = models.Sequential([
        layers.LSTM(64, input_shape=input_shape, return_sequences=True),
        layers.Dropout(0.2),
        layers.LSTM(32),
        layers.Dropout(0.2),
        layers.Dense(output_size, activation='softmax')
    ])
    return model

# 创建模型实例
input_shape = (10, 20)  # 序列长度=10，特征维度=20
output_size = 5
model = create_lstm_model(input_shape, output_size)

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
        validation_split=0.2,
        callbacks=[
            tf.keras.callbacks.EarlyStopping(
                monitor='val_loss',
                patience=3,
                restore_best_weights=True
            )
        ]
    )
    return history`

const textClassLstmCode = `import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
import numpy as np

class TextDataset(Dataset):
    def __init__(self, texts, labels, max_len=100):
        self.texts = texts
        self.labels = labels
        self.max_len = max_len

    def __len__(self):
        return len(self.texts)

    def __getitem__(self, idx):
        text = self.texts[idx]
        label = self.labels[idx]
        # 这里应该添加文本预处理和向量化的代码
        return text, label

class TextLSTM(nn.Module):
    def __init__(self, vocab_size, embedding_dim, hidden_dim, output_dim):
        super(TextLSTM, self).__init__()
        self.embedding = nn.Embedding(vocab_size, embedding_dim)
        self.lstm = nn.LSTM(embedding_dim, hidden_dim, batch_first=True)
        self.fc = nn.Linear(hidden_dim, output_dim)
        self.dropout = nn.Dropout(0.5)

    def forward(self, x):
        embedded = self.embedding(x)
        output, (hidden, cell) = self.lstm(embedded)
        hidden = self.dropout(hidden[-1])
        return self.fc(hidden)

def train_model(model, train_loader, criterion, optimizer, num_epochs=10):
    for epoch in range(num_epochs):
        model.train()
        total_loss = 0
        for batch_idx, (data, target) in enumerate(train_loader):
            optimizer.zero_grad()
            output = model(data)
            loss = criterion(output, target)
            loss.backward()
            optimizer.step()
            total_loss += loss.item()

            if batch_idx % 100 == 99:
                print(f'Epoch: {epoch+1}, Batch: {batch_idx+1}, Loss: {total_loss/100:.4f}')
                total_loss = 0

def main():
    # 设置参数
    vocab_size = 10000
    embedding_dim = 100
    hidden_dim = 256
    output_dim = 2  # 二分类问题

    # 创建模型
    model = TextLSTM(vocab_size, embedding_dim, hidden_dim, output_dim)

    # 定义损失函数和优化器
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=0.001)

    # 加载数据
    # 这里应该添加数据加载的代码

    # 训练模型
    train_model(model, train_loader, criterion, optimizer)

    # 保存模型
    torch.save(model.state_dict(), "text_classification_lstm.pt")

if __name__ == '__main__':
    main()`

const timeSeriesCode = `import tensorflow as tf
from tensorflow.keras import layers, models
import numpy as np
import pandas as pd

def create_sequences(data, seq_length):
    X, y = [], []
    for i in range(len(data) - seq_length):
        X.append(data[i:(i + seq_length)])
        y.append(data[i + seq_length])
    return np.array(X), np.array(y)

def create_lstm_model(seq_length, n_features):
    model = models.Sequential([
        layers.LSTM(50, activation='relu', input_shape=(seq_length, n_features), return_sequences=True),
        layers.Dropout(0.2),
        layers.LSTM(50, activation='relu'),
        layers.Dropout(0.2),
        layers.Dense(1)
    ])
    return model

def prepare_data(data, seq_length, train_split=0.8):
    # 数据标准化
    from sklearn.preprocessing import MinMaxScaler
    scaler = MinMaxScaler()
    scaled_data = scaler.fit_transform(data)

    # 创建序列
    X, y = create_sequences(scaled_data, seq_length)

    # 划分训练集和测试集
    train_size = int(len(X) * train_split)
    X_train, X_test = X[:train_size], X[train_size:]
    y_train, y_test = y[:train_size], y[train_size:]

    return X_train, X_test, y_train, y_test, scaler

def main():
    # 设置参数
    seq_length = 10
    n_features = 1

    # 加载数据
    # 这里应该添加数据加载的代码
    # data = pd.read_csv('time_series_data.csv')

    # 准备数据
    X_train, X_test, y_train, y_test, scaler = prepare_data(data, seq_length)

    # 创建模型
    model = create_lstm_model(seq_length, n_features)

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
    model.save('time_series_lstm.h5')

if __name__ == '__main__':
    main()`

const META: LessonMeta = {
  subject: '深度学习',
  chapterTitle: '循环神经网络',
  chapterNumber: 4,
  totalChapters: 14,
  subjectHref: '/study/ai/dl',
  prevChapter: { label: '卷积神经网络', href: '/study/ai/dl/cnn' },
  nextChapter: { label: '注意力机制', href: '/study/ai/dl/attention' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '理论知识(1)',
    left: (
      <div className="space-y-4">
        <PageTitle>循环神经网络（RNN）概述</PageTitle>

        <SectionTitle>核心思想与优势</SectionTitle>
        <BookParagraph>
          循环神经网络（RNN）是一类专门用于处理序列数据的深度学习模型。其核心思想是通过循环连接传递历史信息，利用参数共享大幅减少模型复杂度，从而有效捕捉时序数据中的长期依赖关系。
        </BookParagraph>
        <BookList items={[
          '输入序列：处理时序数据',
          '隐藏状态：保存历史信息',
          '输出序列：生成预测结果',
          '循环连接：传递历史信息',
          '参数共享：减少模型复杂度',
        ]} />

        <SectionTitle>LSTM与GRU</SectionTitle>
        <BookParagraph>
          改进的RNN结构，解决长序列问题：
        </BookParagraph>
        <div className="mb-2">
          <svg width="100%" height="160" viewBox="0 0 800 160">
            {/* LSTM单元 */}
            <rect x="50" y="40" width="100" height="80" fill="#86efac" stroke="#22c55e" strokeWidth="2"/>
            <text x="100" y="30" textAnchor="middle" fill="#22c55e">LSTM单元</text>
            {/* 门控机制 */}
            <rect x="200" y="50" width="60" height="60" fill="#dcfce7" stroke="#16a34a" strokeWidth="2"/>
            <text x="230" y="135" textAnchor="middle" fill="#16a34a">遗忘门</text>
            <rect x="280" y="50" width="60" height="60" fill="#dcfce7" stroke="#16a34a" strokeWidth="2"/>
            <text x="310" y="135" textAnchor="middle" fill="#16a34a">输入门</text>
            <rect x="360" y="50" width="60" height="60" fill="#dcfce7" stroke="#16a34a" strokeWidth="2"/>
            <text x="390" y="135" textAnchor="middle" fill="#16a34a">输出门</text>
            {/* 箭头 */}
            <path d="M150 80 L200 80" stroke="#64748b" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)"/>
            <path d="M260 80 L280 80" stroke="#64748b" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)"/>
            <path d="M340 80 L360 80" stroke="#64748b" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)"/>
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#64748b"/>
              </marker>
            </defs>
          </svg>
        </div>
        <BookList items={[
          'LSTM：长短期记忆网络 — 遗忘门(控制历史信息)、输入门(控制新信息)、输出门(控制输出信息)',
          'GRU：门控循环单元 — 更新门(控制信息更新)、重置门(控制历史信息)，结构更简单',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>RNN的应用场景</SectionTitle>
        <BookParagraph>
          RNN在序列数据处理中的应用：
        </BookParagraph>
        <div className="mb-2">
          <svg width="100%" height="160" viewBox="0 0 800 160">
            {/* 应用场景 */}
            <rect x="50" y="40" width="120" height="80" fill="#f3e8ff" stroke="#9333ea" strokeWidth="2"/>
            <text x="110" y="30" textAnchor="middle" fill="#9333ea">自然语言处理</text>
            <rect x="210" y="40" width="120" height="80" fill="#f3e8ff" stroke="#9333ea" strokeWidth="2"/>
            <text x="270" y="30" textAnchor="middle" fill="#9333ea">语音识别</text>
            <rect x="370" y="40" width="120" height="80" fill="#f3e8ff" stroke="#9333ea" strokeWidth="2"/>
            <text x="430" y="30" textAnchor="middle" fill="#9333ea">时间序列预测</text>
            <rect x="530" y="40" width="120" height="80" fill="#f3e8ff" stroke="#9333ea" strokeWidth="2"/>
            <text x="590" y="30" textAnchor="middle" fill="#9333ea">机器翻译</text>
          </svg>
        </div>
        <BookList items={[
          '自然语言处理：文本生成、情感分析、命名实体识别',
          '语音识别：语音转文字、语音合成',
          '时间序列预测：股票预测、天气预测',
        ]} />
      </div>
    ),
  },
  {
    label: '代码实践',
    left: (
      <div className="space-y-4">
        <PageTitle>RNN实现</PageTitle>

        <SectionTitle>1. 使用PyTorch实现RNN</SectionTitle>
        <BookCode language="python" code={pytorchRnnCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>2. 使用TensorFlow实现LSTM</SectionTitle>
        <BookCode language="python" code={tfLstmCode} />
      </div>
    ),
  },
  {
    label: '例题练习',
    left: (
      <div className="space-y-4">
        <PageTitle>实战练习</PageTitle>

        <SectionTitle>题目一：文本分类</SectionTitle>
        <BookParagraph><b>要求：</b>使用PyTorch实现一个LSTM模型，对文本数据进行分类。</BookParagraph>
        <BookParagraph><b>参考答案：</b></BookParagraph>
        <BookCode language="python" code={textClassLstmCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>题目二：时间序列预测</SectionTitle>
        <BookParagraph><b>要求：</b>使用TensorFlow实现一个LSTM模型，预测时间序列数据。</BookParagraph>
        <BookParagraph><b>参考答案：</b></BookParagraph>
        <BookCode language="python" code={timeSeriesCode} />
      </div>
    ),
  },
]

export default function DlRnnPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

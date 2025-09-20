'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaRobot, FaBrain, FaChartLine, FaCode, FaLightbulb, FaNetworkWired, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { SiTensorflow, SiPytorch, SiKeras } from 'react-icons/si';

export default function RNNPage() {
  const [activeTab, setActiveTab] = useState('theory');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">循环神经网络</h1>
      
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
            <h2 className="text-2xl font-semibold mb-4">循环神经网络（RNN）概述</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">核心思想与优势</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 mb-4">
                    循环神经网络（RNN）是一类专门用于处理序列数据的深度学习模型。其核心思想是通过循环连接传递历史信息，利用参数共享大幅减少模型复杂度，从而有效捕捉时序数据中的长期依赖关系。
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>输入序列：处理时序数据</li>
                    <li>隐藏状态：保存历史信息</li>
                    <li>输出序列：生成预测结果</li>
                    <li>循环连接：传递历史信息</li>
                    <li>参数共享：减少模型复杂度</li>
                  </ul>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">LSTM与GRU</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 mb-4">
                    改进的RNN结构，解决长序列问题：
                  </p>
                  <div className="mb-4">
                    <svg width="100%" height="200" viewBox="0 0 800 200">
                      {/* LSTM单元 */}
                      <rect x="50" y="50" width="120" height="100" fill="#86efac" stroke="#22c55e" strokeWidth="2"/>
                      <text x="110" y="40" textAnchor="middle" fill="#22c55e">LSTM单元</text>
                      
                      {/* 门控机制 */}
                      <rect x="200" y="50" width="60" height="60" fill="#dcfce7" stroke="#16a34a" strokeWidth="2"/>
                      <text x="230" y="40" textAnchor="middle" fill="#16a34a">遗忘门</text>
                      <rect x="280" y="50" width="60" height="60" fill="#dcfce7" stroke="#16a34a" strokeWidth="2"/>
                      <text x="310" y="40" textAnchor="middle" fill="#16a34a">输入门</text>
                      <rect x="360" y="50" width="60" height="60" fill="#dcfce7" stroke="#16a34a" strokeWidth="2"/>
                      <text x="390" y="40" textAnchor="middle" fill="#16a34a">输出门</text>
                      
                      {/* 箭头 */}
                      <path d="M170 80 L200 80" stroke="#64748b" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)"/>
                      <path d="M260 80 L280 80" stroke="#64748b" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)"/>
                      <path d="M340 80 L360 80" stroke="#64748b" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)"/>
                    </svg>
                  </div>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>LSTM：长短期记忆网络
                      <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                        <li>遗忘门：控制历史信息</li>
                        <li>输入门：控制新信息</li>
                        <li>输出门：控制输出信息</li>
                      </ul>
                    </li>
                    <li>GRU：门控循环单元
                      <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                        <li>更新门：控制信息更新</li>
                        <li>重置门：控制历史信息</li>
                        <li>结构更简单</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">RNN的应用场景</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 mb-4">
                    RNN在序列数据处理中的应用：
                  </p>
                  <div className="mb-4">
                    <svg width="100%" height="200" viewBox="0 0 800 200">
                      {/* 应用场景 */}
                      <rect x="50" y="50" width="120" height="100" fill="#f3e8ff" stroke="#9333ea" strokeWidth="2"/>
                      <text x="110" y="40" textAnchor="middle" fill="#9333ea">自然语言处理</text>
                      
                      <rect x="200" y="50" width="120" height="100" fill="#f3e8ff" stroke="#9333ea" strokeWidth="2"/>
                      <text x="260" y="40" textAnchor="middle" fill="#9333ea">语音识别</text>
                      
                      <rect x="350" y="50" width="120" height="100" fill="#f3e8ff" stroke="#9333ea" strokeWidth="2"/>
                      <text x="410" y="40" textAnchor="middle" fill="#9333ea">时间序列预测</text>
                      
                      <rect x="500" y="50" width="120" height="100" fill="#f3e8ff" stroke="#9333ea" strokeWidth="2"/>
                      <text x="560" y="40" textAnchor="middle" fill="#9333ea">机器翻译</text>
                    </svg>
                  </div>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>自然语言处理
                      <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                        <li>文本生成</li>
                        <li>情感分析</li>
                        <li>命名实体识别</li>
                      </ul>
                    </li>
                    <li>语音识别
                      <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                        <li>语音转文字</li>
                        <li>语音合成</li>
                      </ul>
                    </li>
                    <li>时间序列预测
                      <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                        <li>股票预测</li>
                        <li>天气预测</li>
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
            <h2 className="text-2xl font-semibold mb-4">RNN实现</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">1. 使用PyTorch实现RNN</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm text-gray-800">
{`import torch
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
                print(f'Epoch [{epoch+1}/{num_epochs}], Step [{i+1}], Loss: {loss.item():.4f}')`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">2. 使用TensorFlow实现LSTM</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm text-gray-800">
{`import tensorflow as tf
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
                <h3 className="text-xl font-semibold mb-2">题目一：文本分类</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">要求：</h4>
                  <p className="text-gray-700 mb-4">
                    使用PyTorch实现一个LSTM模型，对文本数据进行分类。
                  </p>
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">参考答案：</h4>
                    <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-sm text-gray-800">
{`import torch
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
    main()`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">题目二：时间序列预测</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">要求：</h4>
                  <p className="text-gray-700 mb-4">
                    使用TensorFlow实现一个LSTM模型，预测时间序列数据。
                  </p>
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">参考答案：</h4>
                    <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-sm text-gray-800">
{`import tensorflow as tf
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
          href="/study/ai/dl/cnn"
          className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 flex items-center"
        >
          <FaArrowLeft className="mr-2" />
          上一课：卷积神经网络
        </Link>
        <Link 
          href="/study/ai/dl/attention"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center"
        >
          下一课：注意力机制
          <FaArrowRight className="ml-2" />
        </Link>
      </div>
    </div>
  );
} 
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function NLPCasesPage() {
  const [activeTab, setActiveTab] = useState('case1');
  const [expandedCode, setExpandedCode] = useState<string | null>(null);

  const tabs = [
    { id: 'case1', label: '文本分类实战' },
    { id: 'case2', label: '情感分析案例' },
    { id: 'case3', label: '命名实体识别' },
    { id: 'case4', label: '机器翻译项目' }
  ];

  const toggleCode = (codeId: string) => {
    setExpandedCode(expandedCode === codeId ? null : codeId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">NLP实战案例</h1>
      
      {/* 标签导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-medium whitespace-nowrap ${
              activeTab === tab.id 
                ? 'border-b-2 border-blue-500 text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 内容区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === 'case1' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">文本分类实战</h2>
            <p className="mb-4">
              使用深度学习模型进行新闻文本分类，实现自动新闻分类系统。
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">项目概述</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>数据集：新闻文本数据集</li>
                  <li>任务：多分类文本分类</li>
                  <li>模型：BERT + 分类头</li>
                  <li>评估指标：准确率、F1分数</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">实现代码</h3>
                <div className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleCode('text-classification')}
                    className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-left font-medium flex justify-between items-center"
                  >
                    <span>文本分类实现</span>
                    <span>{expandedCode === 'text-classification' ? '▼' : '▶'}</span>
                  </button>
                  {expandedCode === 'text-classification' && (
                    <pre className="bg-gray-100 p-4 overflow-x-auto">
                      <code>{`import torch
from transformers import BertTokenizer, BertForSequenceClassification
from torch.utils.data import Dataset, DataLoader
import pandas as pd
import numpy as np

class NewsDataset(Dataset):
    def __init__(self, texts, labels, tokenizer, max_length=512):
        self.texts = texts
        self.labels = labels
        self.tokenizer = tokenizer
        self.max_length = max_length
        
    def __len__(self):
        return len(self.texts)
    
    def __getitem__(self, idx):
        text = str(self.texts[idx])
        label = self.labels[idx]
        
        encoding = self.tokenizer(
            text,
            add_special_tokens=True,
            max_length=self.max_length,
            padding='max_length',
            truncation=True,
            return_tensors='pt'
        )
        
        return {
            'input_ids': encoding['input_ids'].flatten(),
            'attention_mask': encoding['attention_mask'].flatten(),
            'labels': torch.tensor(label, dtype=torch.long)
        }

def train_model(model, train_loader, val_loader, device, epochs=3):
    optimizer = torch.optim.AdamW(model.parameters(), lr=2e-5)
    criterion = torch.nn.CrossEntropyLoss()
    
    for epoch in range(epochs):
        model.train()
        total_loss = 0
        
        for batch in train_loader:
            input_ids = batch['input_ids'].to(device)
            attention_mask = batch['attention_mask'].to(device)
            labels = batch['labels'].to(device)
            
            outputs = model(
                input_ids=input_ids,
                attention_mask=attention_mask,
                labels=labels
            )
            
            loss = outputs.loss
            total_loss += loss.item()
            
            loss.backward()
            optimizer.step()
            optimizer.zero_grad()
        
        # 验证
        model.eval()
        val_loss = 0
        correct = 0
        total = 0
        
        with torch.no_grad():
            for batch in val_loader:
                input_ids = batch['input_ids'].to(device)
                attention_mask = batch['attention_mask'].to(device)
                labels = batch['labels'].to(device)
                
                outputs = model(
                    input_ids=input_ids,
                    attention_mask=attention_mask,
                    labels=labels
                )
                
                val_loss += outputs.loss.item()
                
                _, predicted = torch.max(outputs.logits, 1)
                total += labels.size(0)
                correct += (predicted == labels).sum().item()
        
        print(f'Epoch {epoch+1}:')
        print(f'Training Loss: {total_loss/len(train_loader):.4f}')
        print(f'Validation Loss: {val_loss/len(val_loader):.4f}')
        print(f'Validation Accuracy: {100*correct/total:.2f}%')

# 主程序
def main():
    # 加载数据
    df = pd.read_csv('news_dataset.csv')
    texts = df['text'].values
    labels = df['category'].values
    
    # 初始化tokenizer和模型
    tokenizer = BertTokenizer.from_pretrained('bert-base-chinese')
    model = BertForSequenceClassification.from_pretrained(
        'bert-base-chinese',
        num_labels=len(set(labels))
    )
    
    # 准备数据集
    dataset = NewsDataset(texts, labels, tokenizer)
    train_size = int(0.8 * len(dataset))
    val_size = len(dataset) - train_size
    train_dataset, val_dataset = torch.utils.data.random_split(dataset, [train_size, val_size])
    
    train_loader = DataLoader(train_dataset, batch_size=16, shuffle=True)
    val_loader = DataLoader(val_dataset, batch_size=16)
    
    # 训练模型
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model.to(device)
    train_model(model, train_loader, val_loader, device)
    
    # 保存模型
    torch.save(model.state_dict(), 'news_classifier.pth')

if __name__ == '__main__':
    main()`}</code>
                    </pre>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'case2' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">情感分析案例</h2>
            <p className="mb-4">
              使用深度学习模型进行商品评论情感分析，实现自动情感分类系统。
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">项目概述</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>数据集：商品评论数据集</li>
                  <li>任务：二分类情感分析</li>
                  <li>模型：RoBERTa + 情感分类头</li>
                  <li>评估指标：准确率、精确率、召回率</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">实现代码</h3>
                <div className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleCode('sentiment-analysis')}
                    className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-left font-medium flex justify-between items-center"
                  >
                    <span>情感分析实现</span>
                    <span>{expandedCode === 'sentiment-analysis' ? '▼' : '▶'}</span>
                  </button>
                  {expandedCode === 'sentiment-analysis' && (
                    <pre className="bg-gray-100 p-4 overflow-x-auto">
                      <code>{`import torch
from transformers import RobertaTokenizer, RobertaForSequenceClassification
from torch.utils.data import Dataset, DataLoader
import pandas as pd
import numpy as np
from sklearn.metrics import precision_recall_fscore_support

class ReviewDataset(Dataset):
    def __init__(self, texts, labels, tokenizer, max_length=256):
        self.texts = texts
        self.labels = labels
        self.tokenizer = tokenizer
        self.max_length = max_length
        
    def __len__(self):
        return len(self.texts)
    
    def __getitem__(self, idx):
        text = str(self.texts[idx])
        label = self.labels[idx]
        
        encoding = self.tokenizer(
            text,
            add_special_tokens=True,
            max_length=self.max_length,
            padding='max_length',
            truncation=True,
            return_tensors='pt'
        )
        
        return {
            'input_ids': encoding['input_ids'].flatten(),
            'attention_mask': encoding['attention_mask'].flatten(),
            'labels': torch.tensor(label, dtype=torch.long)
        }

def evaluate_model(model, test_loader, device):
    model.eval()
    all_preds = []
    all_labels = []
    
    with torch.no_grad():
        for batch in test_loader:
            input_ids = batch['input_ids'].to(device)
            attention_mask = batch['attention_mask'].to(device)
            labels = batch['labels'].to(device)
            
            outputs = model(
                input_ids=input_ids,
                attention_mask=attention_mask
            )
            
            _, preds = torch.max(outputs.logits, 1)
            all_preds.extend(preds.cpu().numpy())
            all_labels.extend(labels.cpu().numpy())
    
    precision, recall, f1, _ = precision_recall_fscore_support(
        all_labels, all_preds, average='binary'
    )
    
    return {
        'precision': precision,
        'recall': recall,
        'f1': f1
    }

def train_model(model, train_loader, val_loader, device, epochs=3):
    optimizer = torch.optim.AdamW(model.parameters(), lr=2e-5)
    criterion = torch.nn.CrossEntropyLoss()
    
    best_f1 = 0
    
    for epoch in range(epochs):
        model.train()
        total_loss = 0
        
        for batch in train_loader:
            input_ids = batch['input_ids'].to(device)
            attention_mask = batch['attention_mask'].to(device)
            labels = batch['labels'].to(device)
            
            outputs = model(
                input_ids=input_ids,
                attention_mask=attention_mask,
                labels=labels
            )
            
            loss = outputs.loss
            total_loss += loss.item()
            
            loss.backward()
            optimizer.step()
            optimizer.zero_grad()
        
        # 验证
        metrics = evaluate_model(model, val_loader, device)
        print(f'Epoch {epoch+1}:')
        print(f'Training Loss: {total_loss/len(train_loader):.4f}')
        print(f'Validation Precision: {metrics["precision"]:.4f}')
        print(f'Validation Recall: {metrics["recall"]:.4f}')
        print(f'Validation F1: {metrics["f1"]:.4f}')
        
        if metrics['f1'] > best_f1:
            best_f1 = metrics['f1']
            torch.save(model.state_dict(), 'best_sentiment_model.pth')

# 主程序
def main():
    # 加载数据
    df = pd.read_csv('reviews.csv')
    texts = df['review'].values
    labels = df['sentiment'].values
    
    # 初始化tokenizer和模型
    tokenizer = RobertaTokenizer.from_pretrained('roberta-base')
    model = RobertaForSequenceClassification.from_pretrained(
        'roberta-base',
        num_labels=2
    )
    
    # 准备数据集
    dataset = ReviewDataset(texts, labels, tokenizer)
    train_size = int(0.8 * len(dataset))
    val_size = len(dataset) - train_size
    train_dataset, val_dataset = torch.utils.data.random_split(dataset, [train_size, val_size])
    
    train_loader = DataLoader(train_dataset, batch_size=16, shuffle=True)
    val_loader = DataLoader(val_dataset, batch_size=16)
    
    # 训练模型
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model.to(device)
    train_model(model, train_loader, val_loader, device)

if __name__ == '__main__':
    main()`}</code>
                    </pre>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'case3' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">命名实体识别</h2>
            <p className="mb-4">
              使用深度学习模型进行中文命名实体识别，实现自动实体标注系统。
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">项目概述</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>数据集：中文NER数据集</li>
                  <li>任务：序列标注</li>
                  <li>模型：BiLSTM-CRF</li>
                  <li>评估指标：F1分数</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">实现代码</h3>
                <div className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleCode('ner-implementation')}
                    className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-left font-medium flex justify-between items-center"
                  >
                    <span>NER实现</span>
                    <span>{expandedCode === 'ner-implementation' ? '▼' : '▶'}</span>
                  </button>
                  {expandedCode === 'ner-implementation' && (
                    <pre className="bg-gray-100 p-4 overflow-x-auto">
                      <code>{`import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
import numpy as np
from typing import List, Dict, Tuple

class BiLSTMCRF(nn.Module):
    def __init__(self, vocab_size, embedding_dim, hidden_dim, num_tags):
        super(BiLSTMCRF, self).__init__()
        self.embedding = nn.Embedding(vocab_size, embedding_dim)
        self.lstm = nn.LSTM(
            embedding_dim,
            hidden_dim // 2,
            num_layers=2,
            bidirectional=True,
            batch_first=True
        )
        self.hidden2tag = nn.Linear(hidden_dim, num_tags)
        
        # CRF层
        self.transitions = nn.Parameter(torch.randn(num_tags, num_tags))
        self.start_transitions = nn.Parameter(torch.randn(num_tags))
        self.end_transitions = nn.Parameter(torch.randn(num_tags))
        
    def forward(self, x, mask):
        # 获取词嵌入
        embedded = self.embedding(x)
        
        # LSTM层
        lstm_out, _ = self.lstm(embedded)
        
        # 线性层
        emissions = self.hidden2tag(lstm_out)
        
        return emissions
    
    def viterbi_decode(self, emissions, mask):
        batch_size, seq_length, num_tags = emissions.size()
        
        # 初始化
        viterbi = torch.zeros(batch_size, seq_length, num_tags)
        backpointer = torch.zeros(batch_size, seq_length, num_tags, dtype=torch.long)
        
        # 第一步
        viterbi[:, 0, :] = self.start_transitions + emissions[:, 0, :]
        
        # 动态规划
        for t in range(1, seq_length):
            for i in range(num_tags):
                viterbi[:, t, i] = (
                    viterbi[:, t-1, :] + self.transitions[:, i] + emissions[:, t, i]
                ).max(dim=1)[0]
                backpointer[:, t, i] = (
                    viterbi[:, t-1, :] + self.transitions[:, i]
                ).max(dim=1)[1]
        
        # 回溯
        best_path = torch.zeros(batch_size, seq_length, dtype=torch.long)
        best_path[:, -1] = viterbi[:, -1, :].max(dim=1)[1]
        
        for t in range(seq_length-2, -1, -1):
            best_path[:, t] = backpointer[:, t+1, best_path[:, t+1]]
        
        return best_path

class NERDataset(Dataset):
    def __init__(self, texts, labels, vocab, tag2idx, max_length=128):
        self.texts = texts
        self.labels = labels
        self.vocab = vocab
        self.tag2idx = tag2idx
        self.max_length = max_length
        
    def __len__(self):
        return len(self.texts)
    
    def __getitem__(self, idx):
        text = self.texts[idx]
        labels = self.labels[idx]
        
        # 转换为索引
        text_ids = [self.vocab.get(char, self.vocab['<UNK>']) for char in text]
        label_ids = [self.tag2idx[tag] for tag in labels]
        
        # 填充
        if len(text_ids) < self.max_length:
            text_ids.extend([self.vocab['<PAD>']] * (self.max_length - len(text_ids)))
            label_ids.extend([self.tag2idx['O']] * (self.max_length - len(label_ids)))
        else:
            text_ids = text_ids[:self.max_length]
            label_ids = label_ids[:self.max_length]
        
        return {
            'input_ids': torch.tensor(text_ids),
            'labels': torch.tensor(label_ids)
        }

def train_model(model, train_loader, val_loader, device, epochs=10):
    optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
    criterion = nn.CrossEntropyLoss(ignore_index=0)  # 忽略PAD标签
    
    for epoch in range(epochs):
        model.train()
        total_loss = 0
        
        for batch in train_loader:
            input_ids = batch['input_ids'].to(device)
            labels = batch['labels'].to(device)
            mask = (input_ids != 0).float()
            
            # 前向传播
            emissions = model(input_ids, mask)
            loss = criterion(emissions.view(-1, emissions.size(-1)), labels.view(-1))
            
            # 反向传播
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()
            
            total_loss += loss.item()
        
        # 验证
        model.eval()
        val_loss = 0
        correct = 0
        total = 0
        
        with torch.no_grad():
            for batch in val_loader:
                input_ids = batch['input_ids'].to(device)
                labels = batch['labels'].to(device)
                mask = (input_ids != 0).float()
                
                emissions = model(input_ids, mask)
                loss = criterion(emissions.view(-1, emissions.size(-1)), labels.view(-1))
                val_loss += loss.item()
                
                # 使用Viterbi解码
                predictions = model.viterbi_decode(emissions, mask)
                correct += ((predictions == labels) * mask).sum().item()
                total += mask.sum().item()
        
        print(f'Epoch {epoch+1}:')
        print(f'Training Loss: {total_loss/len(train_loader):.4f}')
        print(f'Validation Loss: {val_loss/len(val_loader):.4f}')
        print(f'Validation Accuracy: {100*correct/total:.2f}%')

# 主程序
def main():
    # 加载数据
    # 这里需要实现数据加载逻辑
    texts = []  # 文本列表
    labels = []  # 标签列表
    
    # 构建词汇表和标签映射
    vocab = {'<PAD>': 0, '<UNK>': 1}
    tag2idx = {'O': 0, 'B-PER': 1, 'I-PER': 2, 'B-LOC': 3, 'I-LOC': 4, 'B-ORG': 5, 'I-ORG': 6}
    
    # 准备数据集
    dataset = NERDataset(texts, labels, vocab, tag2idx)
    train_size = int(0.8 * len(dataset))
    val_size = len(dataset) - train_size
    train_dataset, val_dataset = torch.utils.data.random_split(dataset, [train_size, val_size])
    
    train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)
    val_loader = DataLoader(val_dataset, batch_size=32)
    
    # 初始化模型
    model = BiLSTMCRF(
        vocab_size=len(vocab),
        embedding_dim=100,
        hidden_dim=256,
        num_tags=len(tag2idx)
    )
    
    # 训练模型
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model.to(device)
    train_model(model, train_loader, val_loader, device)
    
    # 保存模型
    torch.save(model.state_dict(), 'ner_model.pth')

if __name__ == '__main__':
    main()`}</code>
                    </pre>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'case4' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">机器翻译项目</h2>
            <p className="mb-4">
              使用Transformer模型实现中英机器翻译系统。
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">项目概述</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>数据集：中英平行语料库</li>
                  <li>任务：序列到序列翻译</li>
                  <li>模型：Transformer</li>
                  <li>评估指标：BLEU分数</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">实现代码</h3>
                <div className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleCode('translation-implementation')}
                    className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-left font-medium flex justify-between items-center"
                  >
                    <span>机器翻译实现</span>
                    <span>{expandedCode === 'translation-implementation' ? '▼' : '▶'}</span>
                  </button>
                  {expandedCode === 'translation-implementation' && (
                    <pre className="bg-gray-100 p-4 overflow-x-auto">
                      <code>{`import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
from transformers import BertTokenizer
import numpy as np
from typing import List, Dict, Tuple

class TranslationDataset(Dataset):
    def __init__(self, source_texts, target_texts, source_tokenizer, target_tokenizer, max_length=128):
        self.source_texts = source_texts
        self.target_texts = target_texts
        self.source_tokenizer = source_tokenizer
        self.target_tokenizer = target_tokenizer
        self.max_length = max_length
        
    def __len__(self):
        return len(self.source_texts)
    
    def __getitem__(self, idx):
        source_text = str(self.source_texts[idx])
        target_text = str(self.target_texts[idx])
        
        # 编码源文本和目标文本
        source_encoding = self.source_tokenizer(
            source_text,
            add_special_tokens=True,
            max_length=self.max_length,
            padding='max_length',
            truncation=True,
            return_tensors='pt'
        )
        
        target_encoding = self.target_tokenizer(
            target_text,
            add_special_tokens=True,
            max_length=self.max_length,
            padding='max_length',
            truncation=True,
            return_tensors='pt'
        )
        
        return {
            'input_ids': source_encoding['input_ids'].flatten(),
            'attention_mask': source_encoding['attention_mask'].flatten(),
            'labels': target_encoding['input_ids'].flatten()
        }

class Transformer(nn.Module):
    def __init__(self, d_model, nhead, num_encoder_layers, num_decoder_layers, dim_feedforward, dropout=0.1):
        super(Transformer, self).__init__()
        self.transformer = nn.Transformer(
            d_model=d_model,
            nhead=nhead,
            num_encoder_layers=num_encoder_layers,
            num_decoder_layers=num_decoder_layers,
            dim_feedforward=dim_feedforward,
            dropout=dropout
        )
        
    def forward(self, src, tgt, src_mask=None, tgt_mask=None):
        return self.transformer(src, tgt, src_mask, tgt_mask)

def train_model(model, train_loader, val_loader, device, epochs=10):
    optimizer = torch.optim.Adam(model.parameters(), lr=0.0001)
    criterion = nn.CrossEntropyLoss(ignore_index=0)  # 忽略PAD标签
    
    for epoch in range(epochs):
        model.train()
        total_loss = 0
        
        for batch in train_loader:
            input_ids = batch['input_ids'].to(device)
            attention_mask = batch['attention_mask'].to(device)
            labels = batch['labels'].to(device)
            
            # 准备目标序列
            tgt_input = labels[:, :-1]
            tgt_output = labels[:, 1:]
            
            # 创建掩码
            tgt_mask = model.transformer.generate_square_subsequent_mask(tgt_input.size(1)).to(device)
            
            # 前向传播
            output = model(
                input_ids,
                tgt_input,
                src_key_padding_mask=~attention_mask.bool(),
                tgt_mask=tgt_mask
            )
            
            loss = criterion(output.view(-1, output.size(-1)), tgt_output.contiguous().view(-1))
            
            # 反向传播
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()
            
            total_loss += loss.item()
        
        # 验证
        model.eval()
        val_loss = 0
        
        with torch.no_grad():
            for batch in val_loader:
                input_ids = batch['input_ids'].to(device)
                attention_mask = batch['attention_mask'].to(device)
                labels = batch['labels'].to(device)
                
                tgt_input = labels[:, :-1]
                tgt_output = labels[:, 1:]
                tgt_mask = model.transformer.generate_square_subsequent_mask(tgt_input.size(1)).to(device)
                
                output = model(
                    input_ids,
                    tgt_input,
                    src_key_padding_mask=~attention_mask.bool(),
                    tgt_mask=tgt_mask
                )
                
                loss = criterion(output.view(-1, output.size(-1)), tgt_output.contiguous().view(-1))
                val_loss += loss.item()
        
        print(f'Epoch {epoch+1}:')
        print(f'Training Loss: {total_loss/len(train_loader):.4f}')
        print(f'Validation Loss: {val_loss/len(val_loader):.4f}')

def translate(model, text, source_tokenizer, target_tokenizer, device, max_length=128):
    model.eval()
    
    # 编码源文本
    source_encoding = source_tokenizer(
        text,
        add_special_tokens=True,
        max_length=max_length,
        padding='max_length',
        truncation=True,
        return_tensors='pt'
    )
    
    input_ids = source_encoding['input_ids'].to(device)
    attention_mask = source_encoding['attention_mask'].to(device)
    
    # 初始化目标序列
    target_ids = torch.ones((1, 1), dtype=torch.long).to(device)
    
    # 自回归生成
    for _ in range(max_length-1):
        tgt_mask = model.transformer.generate_square_subsequent_mask(target_ids.size(1)).to(device)
        
        output = model(
            input_ids,
            target_ids,
            src_key_padding_mask=~attention_mask.bool(),
            tgt_mask=tgt_mask
        )
        
        next_token = output[:, -1, :].argmax(dim=-1, keepdim=True)
        target_ids = torch.cat([target_ids, next_token], dim=1)
        
        if next_token.item() == target_tokenizer.eos_token_id:
            break
    
    # 解码目标序列
    translation = target_tokenizer.decode(target_ids[0], skip_special_tokens=True)
    return translation

# 主程序
def main():
    # 加载数据
    # 这里需要实现数据加载逻辑
    source_texts = []  # 源语言文本列表
    target_texts = []  # 目标语言文本列表
    
    # 初始化tokenizer
    source_tokenizer = BertTokenizer.from_pretrained('bert-base-chinese')
    target_tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
    
    # 准备数据集
    dataset = TranslationDataset(
        source_texts,
        target_texts,
        source_tokenizer,
        target_tokenizer
    )
    
    train_size = int(0.8 * len(dataset))
    val_size = len(dataset) - train_size
    train_dataset, val_dataset = torch.utils.data.random_split(dataset, [train_size, val_size])
    
    train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)
    val_loader = DataLoader(val_dataset, batch_size=32)
    
    # 初始化模型
    model = Transformer(
        d_model=512,
        nhead=8,
        num_encoder_layers=6,
        num_decoder_layers=6,
        dim_feedforward=2048
    )
    
    # 训练模型
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model.to(device)
    train_model(model, train_loader, val_loader, device)
    
    # 保存模型
    torch.save(model.state_dict(), 'translation_model.pth')
    
    # 测试翻译
    test_text = "今天天气真好。"
    translation = translate(model, test_text, source_tokenizer, target_tokenizer, device)
    print(f"源文本: {test_text}")
    print(f"翻译结果: {translation}")

if __name__ == '__main__':
    main()`}</code>
                    </pre>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/ai/nlp/frameworks"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回NLP框架与工具
        </Link>
        <Link 
          href="/study/ai/nlp/interview"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          NLP面试题 →
        </Link>
      </div>
    </div>
  );
} 
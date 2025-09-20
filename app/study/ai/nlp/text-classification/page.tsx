'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TextClassificationPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: '概述' },
    { id: 'traditional', label: '传统方法' },
    { id: 'deep-learning', label: '深度学习方法' },
    { id: 'evaluation', label: '评估指标' },
    { id: 'cases', label: '实战案例' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">文本分类</h1>
      
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
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">文本分类概述</h2>
            <p className="mb-4">
              文本分类是自然语言处理中的基础任务之一，其目标是将文本自动分类到预定义的类别中。文本分类在垃圾邮件过滤、情感分析、主题分类等场景中有着广泛的应用。
            </p>
            
            <div className="my-6">
              <svg className="w-full max-w-2xl mx-auto" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
                  </marker>
                </defs>
                <rect x="50" y="100" width="150" height="80" rx="5" fill="#e3f2fd" stroke="#2196f3" />
                <text x="125" y="145" textAnchor="middle" fill="#1565c0">输入文本</text>
                
                <line x1="200" y1="140" x2="300" y2="140" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)" />
                
                <rect x="300" y="100" width="150" height="80" rx="5" fill="#e8f5e9" stroke="#4caf50" />
                <text x="375" y="145" textAnchor="middle" fill="#2e7d32">特征提取</text>
                
                <line x1="450" y1="140" x2="550" y2="140" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)" />
                
                <rect x="550" y="100" width="150" height="80" rx="5" fill="#fff3e0" stroke="#ff9800" />
                <text x="625" y="145" textAnchor="middle" fill="#e65100">分类器</text>
                
                <line x1="700" y1="140" x2="800" y2="140" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)" />
                
                <rect x="800" y="100" width="150" height="80" rx="5" fill="#f3e5f5" stroke="#9c27b0" />
                <text x="875" y="145" textAnchor="middle" fill="#6a1b9a">分类结果</text>
              </svg>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">应用场景</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>垃圾邮件过滤</li>
                  <li>情感分析</li>
                  <li>新闻分类</li>
                  <li>主题分类</li>
                  <li>意图识别</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">主要挑战</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>文本长度不一</li>
                  <li>一词多义</li>
                  <li>类别不平衡</li>
                  <li>噪声数据</li>
                  <li>新词和未知词</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'traditional' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">传统机器学习方法</h2>
            <p className="mb-4">
              传统的文本分类方法主要基于机器学习算法，包括朴素贝叶斯、SVM、决策树等。这些方法通常需要先进行特征工程，如TF-IDF、词袋模型等。
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">特征提取方法</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>词袋模型(Bag of Words)</li>
                  <li>TF-IDF</li>
                  <li>N-gram特征</li>
                  <li>词性特征</li>
                  <li>文本统计特征</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Python代码示例</h3>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{`import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.svm import LinearSVC
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

# 准备数据
texts = [
    "自然语言处理是人工智能的重要分支",
    "机器学习在自然语言处理中应用广泛",
    "深度学习推动了自然语言处理的发展",
    "词向量是自然语言处理的基础技术",
    "文本分类是自然语言处理的基础任务",
    "情感分析是文本分类的典型应用",
    "垃圾邮件过滤是文本分类的重要应用",
    "主题分类是文本分类的常见任务"
]
labels = [1, 1, 1, 1, 0, 0, 0, 0]  # 1表示NLP相关，0表示文本分类相关

# 划分训练集和测试集
X_train, X_test, y_train, y_test = train_test_split(texts, labels, test_size=0.3, random_state=42)

# 特征提取
vectorizer = TfidfVectorizer()
X_train_tfidf = vectorizer.fit_transform(X_train)
X_test_tfidf = vectorizer.transform(X_test)

# 训练朴素贝叶斯模型
nb_model = MultinomialNB()
nb_model.fit(X_train_tfidf, y_train)
nb_pred = nb_model.predict(X_test_tfidf)

# 训练SVM模型
svm_model = LinearSVC()
svm_model.fit(X_train_tfidf, y_train)
svm_pred = svm_model.predict(X_test_tfidf)

# 评估模型
print("朴素贝叶斯模型评估：")
print(classification_report(y_test, nb_pred))

print("\\nSVM模型评估：")
print(classification_report(y_test, svm_pred))

# 预测新文本
new_texts = [
    "自然语言处理技术发展迅速",
    "文本分类算法不断改进"
]
new_texts_tfidf = vectorizer.transform(new_texts)

nb_predictions = nb_model.predict(new_texts_tfidf)
svm_predictions = svm_model.predict(new_texts_tfidf)

print("\\n新文本预测结果：")
for text, nb_pred, svm_pred in zip(new_texts, nb_predictions, svm_predictions):
    print(f"文本: {text}")
    print(f"朴素贝叶斯预测: {'NLP相关' if nb_pred == 1 else '文本分类相关'}")
    print(f"SVM预测: {'NLP相关' if svm_pred == 1 else '文本分类相关'}")
    print()`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'deep-learning' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">深度学习方法</h2>
            <p className="mb-4">
              深度学习方法在文本分类任务中取得了显著的效果，主要包括CNN、RNN、Transformer等模型。这些方法能够自动学习文本特征，不需要复杂的特征工程。
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">常用深度学习模型</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>TextCNN</li>
                  <li>LSTM/GRU</li>
                  <li>Transformer</li>
                  <li>BERT及其变体</li>
                  <li>预训练语言模型</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Python代码示例</h3>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{`import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
from transformers import BertTokenizer, BertForSequenceClassification
from sklearn.model_selection import train_test_split

# 准备数据
texts = [
    "自然语言处理是人工智能的重要分支",
    "机器学习在自然语言处理中应用广泛",
    "深度学习推动了自然语言处理的发展",
    "词向量是自然语言处理的基础技术",
    "文本分类是自然语言处理的基础任务",
    "情感分析是文本分类的典型应用",
    "垃圾邮件过滤是文本分类的重要应用",
    "主题分类是文本分类的常见任务"
]
labels = [1, 1, 1, 1, 0, 0, 0, 0]  # 1表示NLP相关，0表示文本分类相关

# 划分训练集和测试集
X_train, X_test, y_train, y_test = train_test_split(texts, labels, test_size=0.3, random_state=42)

# 创建数据集类
class TextDataset(Dataset):
    def __init__(self, texts, labels, tokenizer, max_length=128):
        self.texts = texts
        self.labels = labels
        self.tokenizer = tokenizer
        self.max_length = max_length
    
    def __len__(self):
        return len(self.texts)
    
    def __getitem__(self, idx):
        text = self.texts[idx]
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
            'labels': torch.tensor(label)
        }

# 加载预训练模型和分词器
tokenizer = BertTokenizer.from_pretrained('bert-base-chinese')
model = BertForSequenceClassification.from_pretrained('bert-base-chinese', num_labels=2)

# 创建数据加载器
train_dataset = TextDataset(X_train, y_train, tokenizer)
test_dataset = TextDataset(X_test, y_test, tokenizer)

train_dataloader = DataLoader(train_dataset, batch_size=2, shuffle=True)
test_dataloader = DataLoader(test_dataset, batch_size=2)

# 训练模型
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model.to(device)

optimizer = optim.AdamW(model.parameters(), lr=2e-5)
criterion = nn.CrossEntropyLoss()

# 训练循环
def train_epoch(model, dataloader, optimizer, criterion, device):
    model.train()
    total_loss = 0
    
    for batch in dataloader:
        input_ids = batch['input_ids'].to(device)
        attention_mask = batch['attention_mask'].to(device)
        labels = batch['labels'].to(device)
        
        optimizer.zero_grad()
        outputs = model(input_ids=input_ids, attention_mask=attention_mask, labels=labels)
        loss = outputs.loss
        loss.backward()
        optimizer.step()
        
        total_loss += loss.item()
    
    return total_loss / len(dataloader)

# 评估模型
def evaluate(model, dataloader, device):
    model.eval()
    correct = 0
    total = 0
    
    with torch.no_grad():
        for batch in dataloader:
            input_ids = batch['input_ids'].to(device)
            attention_mask = batch['attention_mask'].to(device)
            labels = batch['labels'].to(device)
            
            outputs = model(input_ids=input_ids, attention_mask=attention_mask)
            predictions = torch.argmax(outputs.logits, dim=-1)
            
            correct += (predictions == labels).sum().item()
            total += labels.size(0)
    
    return correct / total

# 训练模型
num_epochs = 3
for epoch in range(num_epochs):
    train_loss = train_epoch(model, train_dataloader, optimizer, criterion, device)
    accuracy = evaluate(model, test_dataloader, device)
    print(f"Epoch {epoch+1}/{num_epochs}")
    print(f"Training Loss: {train_loss:.4f}")
    print(f"Test Accuracy: {accuracy:.4f}")

# 保存模型
model.save_pretrained('bert-text-classifier')

# 预测新文本
def predict(text):
    model.eval()
    encoding = tokenizer(
        text,
        add_special_tokens=True,
        max_length=128,
        padding='max_length',
        truncation=True,
        return_tensors='pt'
    )
    
    input_ids = encoding['input_ids'].to(device)
    attention_mask = encoding['attention_mask'].to(device)
    
    with torch.no_grad():
        outputs = model(input_ids=input_ids, attention_mask=attention_mask)
        predictions = torch.argmax(outputs.logits, dim=-1)
    
    return predictions.item()

# 测试预测
new_texts = [
    "自然语言处理技术发展迅速",
    "文本分类算法不断改进"
]

for text in new_texts:
    prediction = predict(text)
    print(f"文本: {text}")
    print(f"预测类别: {'NLP相关' if prediction == 1 else '文本分类相关'}")
    print()`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'evaluation' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">评估指标</h2>
            <p className="mb-4">
              文本分类任务的评估指标主要包括准确率、精确率、召回率、F1值等。选择合适的评估指标对于模型性能的评估和比较非常重要。
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">常用评估指标</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>准确率(Accuracy)</li>
                  <li>精确率(Precision)</li>
                  <li>召回率(Recall)</li>
                  <li>F1值</li>
                  <li>混淆矩阵</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Python代码示例</h3>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{`import numpy as np
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix
import seaborn as sns
import matplotlib.pyplot as plt

# 准备数据
y_true = [1, 0, 1, 1, 0, 1, 0, 0]
y_pred = [1, 0, 1, 0, 0, 1, 1, 0]

# 计算评估指标
accuracy = accuracy_score(y_true, y_pred)
precision = precision_score(y_true, y_pred)
recall = recall_score(y_true, y_pred)
f1 = f1_score(y_true, y_pred)

print(f"准确率: {accuracy:.4f}")
print(f"精确率: {precision:.4f}")
print(f"召回率: {recall:.4f}")
print(f"F1值: {f1:.4f}")

# 绘制混淆矩阵
cm = confusion_matrix(y_true, y_pred)
plt.figure(figsize=(8, 6))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
plt.title('混淆矩阵')
plt.xlabel('预测标签')
plt.ylabel('真实标签')
plt.show()

# 多分类评估
def evaluate_multi_class(y_true, y_pred, labels):
    print("\\n多分类评估：")
    print(f"准确率: {accuracy_score(y_true, y_pred):.4f}")
    print(f"宏平均精确率: {precision_score(y_true, y_pred, average='macro'):.4f}")
    print(f"宏平均召回率: {recall_score(y_true, y_pred, average='macro'):.4f}")
    print(f"宏平均F1值: {f1_score(y_true, y_pred, average='macro'):.4f}")
    
    # 每个类别的评估指标
    for i, label in enumerate(labels):
        print(f"\\n类别 {label} 的评估指标：")
        print(f"精确率: {precision_score(y_true, y_pred, labels=[i], average='micro'):.4f}")
        print(f"召回率: {recall_score(y_true, y_pred, labels=[i], average='micro'):.4f}")
        print(f"F1值: {f1_score(y_true, y_pred, labels=[i], average='micro'):.4f}")

# 多分类示例
y_true_multi = [0, 1, 2, 0, 1, 2, 0, 1]
y_pred_multi = [0, 1, 1, 0, 2, 2, 0, 1]
labels = ['类别A', '类别B', '类别C']

evaluate_multi_class(y_true_multi, y_pred_multi, labels)`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cases' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">实战案例</h2>
            <p className="mb-4">
              本节将介绍文本分类在实际应用中的案例，包括情感分析、垃圾邮件过滤、新闻分类等。
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">情感分析案例</h3>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{`import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import LinearSVC
from sklearn.metrics import classification_report
import jieba

# 加载数据
# 假设我们有一个包含评论文本和情感标签的数据集
data = pd.read_csv('sentiment_data.csv')
texts = data['text'].values
labels = data['sentiment'].values

# 文本预处理
def preprocess_text(text):
    # 分词
    words = jieba.cut(text)
    # 过滤停用词
    stopwords = set(['的', '了', '和', '是', '就', '都', '而', '及', '与', '这'])
    words = [word for word in words if word not in stopwords]
    return ' '.join(words)

# 预处理所有文本
processed_texts = [preprocess_text(text) for text in texts]

# 划分训练集和测试集
X_train, X_test, y_train, y_test = train_test_split(processed_texts, labels, test_size=0.2, random_state=42)

# 特征提取
vectorizer = TfidfVectorizer(max_features=5000)
X_train_tfidf = vectorizer.fit_transform(X_train)
X_test_tfidf = vectorizer.transform(X_test)

# 训练模型
model = LinearSVC()
model.fit(X_train_tfidf, y_train)

# 评估模型
y_pred = model.predict(X_test_tfidf)
print(classification_report(y_test, y_pred))

# 预测新文本
def predict_sentiment(text):
    processed_text = preprocess_text(text)
    text_tfidf = vectorizer.transform([processed_text])
    prediction = model.predict(text_tfidf)
    return '正面' if prediction[0] == 1 else '负面'

# 测试预测
test_texts = [
    "这个产品质量很好，我很满意",
    "服务态度很差，不推荐购买"
]

for text in test_texts:
    sentiment = predict_sentiment(text)
    print(f"文本: {text}")
    print(f"情感: {sentiment}")
    print()`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">垃圾邮件过滤案例</h3>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{`import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import classification_report
import re

# 加载数据
# 假设我们有一个包含邮件内容和标签的数据集
data = pd.read_csv('spam_data.csv')
texts = data['text'].values
labels = data['label'].values

# 文本预处理
def preprocess_email(text):
    # 转换为小写
    text = text.lower()
    # 移除URL
    text = re.sub(r'http\\S+|www\\S+|https\\S+', '', text, flags=re.MULTILINE)
    # 移除特殊字符
    text = re.sub(r'[^\\w\\s]', '', text)
    # 移除数字
    text = re.sub(r'\\d+', '', text)
    return text

# 预处理所有文本
processed_texts = [preprocess_email(text) for text in texts]

# 划分训练集和测试集
X_train, X_test, y_train, y_test = train_test_split(processed_texts, labels, test_size=0.2, random_state=42)

# 特征提取
vectorizer = CountVectorizer(max_features=5000)
X_train_counts = vectorizer.fit_transform(X_train)
X_test_counts = vectorizer.transform(X_test)

# 训练模型
model = MultinomialNB()
model.fit(X_train_counts, y_train)

# 评估模型
y_pred = model.predict(X_test_counts)
print(classification_report(y_test, y_pred))

# 预测新邮件
def predict_spam(text):
    processed_text = preprocess_email(text)
    text_counts = vectorizer.transform([processed_text])
    prediction = model.predict(text_counts)
    return '垃圾邮件' if prediction[0] == 1 else '正常邮件'

# 测试预测
test_emails = [
    "恭喜您获得100万奖金，请点击链接领取",
    "请查收附件中的会议纪要"
]

for email in test_emails:
    result = predict_spam(email)
    print(f"邮件: {email}")
    print(f"预测结果: {result}")
    print()`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/ai/nlp/word-embeddings"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回词向量
        </Link>
        <Link 
          href="/study/ai/nlp/ner"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          命名实体识别 →
        </Link>
      </div>
    </div>
  );
} 
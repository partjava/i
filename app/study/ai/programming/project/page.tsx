'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AIProjectPage() {
  const [activeTab, setActiveTab] = useState('cases');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'cases', label: '项目案例' },
    { id: 'process', label: '开发流程' },
    { id: 'best-practices', label: '最佳实践' },
    { id: 'tools', label: '开发工具' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">AI项目实战</h1>
      
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
        {activeTab === 'cases' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">项目案例</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 图像分类项目</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      使用PyTorch实现图像分类系统。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 项目结构
project/
├── data/
│   ├── train/
│   ├── val/
│   └── test/
├── models/
│   ├── model.py
│   └── utils.py
├── train.py
├── evaluate.py
└── predict.py

# 模型定义
import torch.nn as nn

class ImageClassifier(nn.Module):
    def __init__(self, num_classes):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(3, 64, kernel_size=3, padding=1),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=2, stride=2),
            nn.Conv2d(64, 128, kernel_size=3, padding=1),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=2, stride=2),
            nn.Conv2d(128, 256, kernel_size=3, padding=1),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=2, stride=2),
        )
        self.classifier = nn.Sequential(
            nn.Linear(256 * 28 * 28, 512),
            nn.ReLU(inplace=True),
            nn.Dropout(),
            nn.Linear(512, num_classes),
        )
    
    def forward(self, x):
        x = self.features(x)
        x = x.view(x.size(0), -1)
        x = self.classifier(x)
        return x

# 训练脚本
def train(model, train_loader, criterion, optimizer, device):
    model.train()
    running_loss = 0.0
    correct = 0
    total = 0
    
    for inputs, labels in train_loader:
        inputs, labels = inputs.to(device), labels.to(device)
        
        optimizer.zero_grad()
        outputs = model(inputs)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()
        
        running_loss += loss.item()
        _, predicted = outputs.max(1)
        total += labels.size(0)
        correct += predicted.eq(labels).sum().item()
    
    return running_loss / len(train_loader), 100. * correct / total`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 自然语言处理项目</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      使用Transformer实现文本分类系统。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 项目结构
project/
├── data/
│   ├── raw/
│   └── processed/
├── models/
│   ├── transformer.py
│   └── tokenizer.py
├── train.py
├── evaluate.py
└── predict.py

# 模型定义
import torch.nn as nn
from transformers import BertModel

class TextClassifier(nn.Module):
    def __init__(self, num_classes):
        super().__init__()
        self.bert = BertModel.from_pretrained('bert-base-uncased')
        self.dropout = nn.Dropout(0.1)
        self.classifier = nn.Linear(768, num_classes)
    
    def forward(self, input_ids, attention_mask):
        outputs = self.bert(
            input_ids=input_ids,
            attention_mask=attention_mask
        )
        pooled_output = outputs[1]
        pooled_output = self.dropout(pooled_output)
        logits = self.classifier(pooled_output)
        return logits

# 训练脚本
def train(model, train_loader, criterion, optimizer, device):
    model.train()
    total_loss = 0
    correct = 0
    total = 0
    
    for batch in train_loader:
        input_ids = batch['input_ids'].to(device)
        attention_mask = batch['attention_mask'].to(device)
        labels = batch['labels'].to(device)
        
        optimizer.zero_grad()
        outputs = model(input_ids, attention_mask)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()
        
        total_loss += loss.item()
        _, predicted = outputs.max(1)
        total += labels.size(0)
        correct += predicted.eq(labels).sum().item()
    
    return total_loss / len(train_loader), 100. * correct / total`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 推荐系统项目</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      使用协同过滤实现推荐系统。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 项目结构
project/
├── data/
│   ├── ratings.csv
│   └── items.csv
├── models/
│   ├── collaborative_filtering.py
│   └── evaluation.py
├── train.py
├── evaluate.py
└── recommend.py

# 模型定义
import torch.nn as nn

class CollaborativeFiltering(nn.Module):
    def __init__(self, num_users, num_items, num_factors):
        super().__init__()
        self.user_factors = nn.Embedding(num_users, num_factors)
        self.item_factors = nn.Embedding(num_items, num_factors)
        
        # 初始化权重
        nn.init.normal_(self.user_factors.weight, std=0.1)
        nn.init.normal_(self.item_factors.weight, std=0.1)
    
    def forward(self, user_ids, item_ids):
        user_emb = self.user_factors(user_ids)
        item_emb = self.item_factors(item_ids)
        return (user_emb * item_emb).sum(dim=1)

# 训练脚本
def train(model, train_loader, criterion, optimizer, device):
    model.train()
    total_loss = 0
    
    for user_ids, item_ids, ratings in train_loader:
        user_ids = user_ids.to(device)
        item_ids = item_ids.to(device)
        ratings = ratings.float().to(device)
        
        optimizer.zero_grad()
        predictions = model(user_ids, item_ids)
        loss = criterion(predictions, ratings)
        loss.backward()
        optimizer.step()
        
        total_loss += loss.item()
    
    return total_loss / len(train_loader)`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'process' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">开发流程</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 需求分析</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      分析项目需求和目标。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 需求分析文档模板

## 1. 项目概述
- 项目背景
- 项目目标
- 项目范围
- 项目约束

## 2. 功能需求
- 核心功能
- 性能要求
- 安全要求
- 可用性要求

## 3. 技术需求
- 开发环境
- 技术栈
- 依赖项
- 部署要求

## 4. 项目计划
- 时间安排
- 资源分配
- 里程碑
- 风险评估`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 数据准备</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      准备和预处理数据。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 数据准备流程

## 1. 数据收集
def collect_data():
    """收集数据"""
    # 从文件加载
    data = pd.read_csv('data.csv')
    
    # 从API获取
    response = requests.get('api_url')
    data = response.json()
    
    # 从数据库读取
    data = pd.read_sql('SELECT * FROM table', conn)
    
    return data

## 2. 数据清洗
def clean_data(data):
    """清洗数据"""
    # 处理缺失值
    data = data.fillna(method='ffill')
    
    # 处理异常值
    data = data[data['value'].between(
        data['value'].quantile(0.01),
        data['value'].quantile(0.99)
    )]
    
    # 处理重复值
    data = data.drop_duplicates()
    
    return data

## 3. 数据转换
def transform_data(data):
    """转换数据"""
    # 特征工程
    data['feature'] = data['col1'] * data['col2']
    
    # 标准化
    scaler = StandardScaler()
    data['scaled'] = scaler.fit_transform(data[['value']])
    
    # 编码
    encoder = LabelEncoder()
    data['encoded'] = encoder.fit_transform(data['category'])
    
    return data`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 模型开发</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      开发和训练模型。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 模型开发流程

## 1. 模型设计
def design_model():
    """设计模型"""
    # 定义模型架构
    model = nn.Sequential(
        nn.Linear(input_size, hidden_size),
        nn.ReLU(),
        nn.Dropout(0.5),
        nn.Linear(hidden_size, output_size)
    )
    
    # 定义损失函数
    criterion = nn.CrossEntropyLoss()
    
    # 定义优化器
    optimizer = optim.Adam(model.parameters())
    
    return model, criterion, optimizer

## 2. 模型训练
def train_model(model, train_loader, criterion, optimizer):
    """训练模型"""
    for epoch in range(num_epochs):
        model.train()
        for batch in train_loader:
            # 前向传播
            outputs = model(batch)
            loss = criterion(outputs, targets)
            
            # 反向传播
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()
        
        # 验证
        model.eval()
        with torch.no_grad():
            val_loss = validate(model, val_loader)
        
        print(f'Epoch {epoch}: val_loss = {val_loss:.4f}')

## 3. 模型评估
def evaluate_model(model, test_loader):
    """评估模型"""
    model.eval()
    predictions = []
    targets = []
    
    with torch.no_grad():
        for batch in test_loader:
            outputs = model(batch)
            pred = outputs.argmax(dim=1)
            predictions.extend(pred.cpu().numpy())
            targets.extend(batch['target'].cpu().numpy())
    
    # 计算指标
    accuracy = accuracy_score(targets, predictions)
    precision = precision_score(targets, predictions)
    recall = recall_score(targets, predictions)
    
    return {
        'accuracy': accuracy,
        'precision': precision,
        'recall': recall
    }`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'best-practices' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">最佳实践</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 代码组织</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      良好的代码组织结构。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 项目结构
project/
├── config/
│   ├── config.yaml
│   └── logging.yaml
├── data/
│   ├── raw/
│   └── processed/
├── models/
│   ├── __init__.py
│   ├── model.py
│   └── utils.py
├── notebooks/
│   └── experiments.ipynb
├── src/
│   ├── __init__.py
│   ├── data/
│   ├── features/
│   ├── models/
│   └── visualization/
├── tests/
│   ├── __init__.py
│   ├── test_data.py
│   └── test_models.py
├── .gitignore
├── README.md
├── requirements.txt
└── setup.py

# 配置文件
# config.yaml
data:
  raw_data_path: data/raw
  processed_data_path: data/processed
  train_size: 0.8
  val_size: 0.1

model:
  name: resnet50
  pretrained: true
  num_classes: 10
  learning_rate: 0.001
  batch_size: 32
  num_epochs: 100

training:
  device: cuda
  num_workers: 4
  early_stopping: true
  patience: 10`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 版本控制</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      使用Git进行版本控制。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# Git工作流

## 1. 初始化仓库
git init
git add .
git commit -m "Initial commit"

## 2. 创建分支
git checkout -b feature/new-model
git checkout -b bugfix/data-processing
git checkout -b experiment/hyperparameters

## 3. 提交更改
git add .
git commit -m "Add new model architecture"
git push origin feature/new-model

## 4. 合并分支
git checkout main
git merge feature/new-model
git push origin main

## 5. 版本标签
git tag -a v1.0.0 -m "First release"
git push origin v1.0.0`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 测试规范</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      编写单元测试和集成测试。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 测试示例

## 1. 单元测试
import pytest

def test_data_loading():
    """测试数据加载"""
    data = load_data('test.csv')
    assert len(data) > 0
    assert all(col in data.columns for col in required_columns)

def test_model_prediction():
    """测试模型预测"""
    model = Model()
    input_data = torch.randn(1, 3, 224, 224)
    output = model(input_data)
    assert output.shape == (1, num_classes)

## 2. 集成测试
def test_training_pipeline():
    """测试训练流程"""
    # 准备数据
    train_loader = get_dataloader('train')
    val_loader = get_dataloader('val')
    
    # 训练模型
    model = train_model(train_loader, val_loader)
    
    # 评估模型
    metrics = evaluate_model(model, val_loader)
    assert metrics['accuracy'] > 0.8

## 3. 性能测试
def test_inference_speed():
    """测试推理速度"""
    model = Model()
    input_data = torch.randn(1, 3, 224, 224)
    
    # 预热
    for _ in range(10):
        model(input_data)
    
    # 测试速度
    start_time = time.time()
    for _ in range(100):
        model(input_data)
    end_time = time.time()
    
    avg_time = (end_time - start_time) / 100
    assert avg_time < 0.1  # 平均推理时间小于100ms`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tools' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">开发工具</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 开发环境</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      配置开发环境。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 环境配置

## 1. 创建虚拟环境
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\\Scripts\\activate  # Windows

## 2. 安装依赖
pip install -r requirements.txt

## 3. 配置IDE
# VSCode设置
{
    "python.linting.enabled": true,
    "python.linting.pylintEnabled": true,
    "python.formatting.provider": "black",
    "editor.formatOnSave": true
}

## 4. 配置Git
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
git config --global core.editor "code --wait"`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 调试工具</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      使用调试工具。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 调试工具使用

## 1. 日志记录
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('debug.log'),
        logging.StreamHandler()
    ]
)

## 2. 断点调试
import pdb

def debug_function():
    pdb.set_trace()  # 设置断点
    # 代码执行到这里会暂停
    result = process_data()
    return result

## 3. 性能分析
import cProfile
import pstats

def profile_function():
    profiler = cProfile.Profile()
    profiler.enable()
    # 要分析的代码
    result = process_data()
    profiler.disable()
    stats = pstats.Stats(profiler)
    stats.sort_stats('cumulative')
    stats.print_stats()`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 监控工具</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      使用监控工具。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 监控工具使用

## 1. TensorBoard
from torch.utils.tensorboard import SummaryWriter

writer = SummaryWriter('runs/experiment_1')

# 记录训练过程
for epoch in range(num_epochs):
    train_loss = train_epoch()
    val_loss = validate_epoch()
    writer.add_scalar('Loss/train', train_loss, epoch)
    writer.add_scalar('Loss/val', val_loss, epoch)

## 2. Weights & Biases
import wandb

wandb.init(project="ai-project")

# 记录指标
wandb.log({
    "train_loss": train_loss,
    "val_loss": val_loss,
    "accuracy": accuracy
})

## 3. Prometheus
from prometheus_client import Counter, Gauge

# 定义指标
request_count = Counter('request_count', 'Total requests')
response_time = Gauge('response_time', 'Response time in seconds')

# 记录指标
@request_count.count_exceptions()
def process_request():
    with response_time.time():
        # 处理请求
        pass`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/ai/programming/deployment"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 模型部署与优化
        </Link>
        <Link 
          href="/study/ai/programming/interview"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          常见问题与面试题 →
        </Link>
      </div>
    </div>
  );
} 
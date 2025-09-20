'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SentimentAnalysisPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedCode, setExpandedCode] = useState<string | null>(null);

  const tabs = [
    { id: 'overview', label: '概述' },
    { id: 'methods', label: '分析方法' },
    { id: 'evaluation', label: '评估指标' },
    { id: 'cases', label: '实战案例' }
  ];

  const toggleCode = (codeId: string) => {
    setExpandedCode(expandedCode === codeId ? null : codeId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">情感分析</h1>
      
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
            <h2 className="text-2xl font-semibold mb-4">情感分析概述</h2>
            <p className="mb-4">
              情感分析(Sentiment Analysis)是自然语言处理的重要任务之一，旨在分析文本中表达的情感倾向。它可以帮助我们理解用户对产品、服务或事件的态度和情感。
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
                <text x="375" y="145" textAnchor="middle" fill="#2e7d32">情感分析模型</text>
                
                <line x1="450" y1="140" x2="550" y2="140" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)" />
                
                <rect x="550" y="100" width="150" height="80" rx="5" fill="#fff3e0" stroke="#ff9800" />
                <text x="625" y="145" textAnchor="middle" fill="#e65100">情感标签</text>
              </svg>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">主要特点</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>情感极性分析</li>
                  <li>情感强度分析</li>
                  <li>多维度情感分析</li>
                  <li>方面级情感分析</li>
                  <li>跨语言情感分析</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">应用场景</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>社交媒体分析</li>
                  <li>产品评论分析</li>
                  <li>舆情监测</li>
                  <li>客户服务</li>
                  <li>市场调研</li>
                </ul>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">情感分析流程</h3>
              <svg className="w-full max-w-3xl mx-auto" viewBox="0 0 900 400" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
                  </marker>
                </defs>
                
                {/* 输入层 */}
                <rect x="50" y="50" width="200" height="60" rx="5" fill="#e3f2fd" stroke="#2196f3" />
                <text x="150" y="85" textAnchor="middle" fill="#1565c0">文本输入</text>
                
                {/* 预处理 */}
                <rect x="50" y="150" width="200" height="60" rx="5" fill="#e8f5e9" stroke="#4caf50" />
                <text x="150" y="185" textAnchor="middle" fill="#2e7d32">文本预处理</text>
                
                {/* 特征提取 */}
                <rect x="350" y="150" width="200" height="60" rx="5" fill="#fff3e0" stroke="#ff9800" />
                <text x="450" y="185" textAnchor="middle" fill="#e65100">特征提取</text>
                
                {/* 情感分类 */}
                <rect x="650" y="150" width="200" height="60" rx="5" fill="#f3e5f5" stroke="#9c27b0" />
                <text x="750" y="185" textAnchor="middle" fill="#6a1b9a">情感分类</text>
                
                {/* 输出层 */}
                <rect x="650" y="250" width="200" height="60" rx="5" fill="#e8f5e9" stroke="#4caf50" />
                <text x="750" y="285" textAnchor="middle" fill="#2e7d32">情感标签</text>
                
                {/* 连接线 */}
                <line x1="250" y1="80" x2="250" y2="150" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <line x1="250" y1="210" x2="350" y2="180" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <line x1="550" y1="180" x2="650" y2="180" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <line x1="750" y1="210" x2="750" y2="250" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)" />
              </svg>
            </div>
          </div>
        )}

        {activeTab === 'methods' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">情感分析方法</h2>
            <p className="mb-4">
              情感分析的方法主要包括基于规则的方法、机器学习方法和深度学习方法。目前主流的分析方法主要基于深度学习和预训练语言模型。
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">主要方法</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>基于词典的方法</li>
                  <li>机器学习方法</li>
                  <li>深度学习方法</li>
                  <li>预训练语言模型</li>
                  <li>混合方法</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Python代码示例</h3>
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
from transformers import BertTokenizer, BertForSequenceClassification
import numpy as np
from sklearn.metrics import accuracy_score, precision_recall_fscore_support

class SentimentAnalyzer:
    def __init__(self, model_name='bert-base-chinese'):
        self.tokenizer = BertTokenizer.from_pretrained(model_name)
        self.model = BertForSequenceClassification.from_pretrained(model_name, num_labels=3)
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.model.to(self.device)
        
    def preprocess_text(self, text):
        # 文本预处理
        return text.strip()
    
    def predict_sentiment(self, text):
        # 预处理文本
        text = self.preprocess_text(text)
        
        # 编码输入文本
        inputs = self.tokenizer(text, return_tensors='pt', padding=True, truncation=True)
        inputs = {k: v.to(self.device) for k, v in inputs.items()}
        
        # 预测情感
        with torch.no_grad():
            outputs = self.model(**inputs)
            predictions = torch.softmax(outputs.logits, dim=1)
            sentiment = torch.argmax(predictions, dim=1).item()
        
        # 情感标签映射
        sentiment_map = {0: '负面', 1: '中性', 2: '正面'}
        return sentiment_map[sentiment]
    
    def batch_predict(self, texts):
        # 批量预测
        results = []
        for text in texts:
            sentiment = self.predict_sentiment(text)
            results.append(sentiment)
        return results
    
    def evaluate(self, texts, labels):
        # 评估模型性能
        predictions = self.batch_predict(texts)
        
        # 计算评估指标
        accuracy = accuracy_score(labels, predictions)
        precision, recall, f1, _ = precision_recall_fscore_support(
            labels, predictions, average='weighted'
        )
        
        return {
            'accuracy': accuracy,
            'precision': precision,
            'recall': recall,
            'f1': f1
        }

# 使用示例
analyzer = SentimentAnalyzer()

# 单条文本分析
text = "这个产品质量很好，我很满意！"
sentiment = analyzer.predict_sentiment(text)
print(f"文本: {text}")
print(f"情感: {sentiment}")

# 批量分析
texts = [
    "这个产品太差了，完全不值这个价。",
    "一般般吧，没什么特别的。",
    "非常好用，推荐购买！"
]

sentiments = analyzer.batch_predict(texts)
for text, sentiment in zip(texts, sentiments):
    print(f"\\n文本: {text}")
    print(f"情感: {sentiment}")

# 评估模型
test_texts = [
    "这个产品太差了，完全不值这个价。",
    "一般般吧，没什么特别的。",
    "非常好用，推荐购买！"
]

test_labels = ['负面', '中性', '正面']
results = analyzer.evaluate(test_texts, test_labels)

print("\\n评估结果：")
print(f"准确率: {results['accuracy']:.4f}")
print(f"精确率: {results['precision']:.4f}")
print(f"召回率: {results['recall']:.4f}")
print(f"F1分数: {results['f1']:.4f}")`}</code>
                    </pre>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'evaluation' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">评估指标</h2>
            <p className="mb-4">
              情感分析的评估主要关注模型的准确性和可靠性。常用的评估指标包括准确率、精确率、召回率和F1分数等。
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">评估指标</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>准确率(Accuracy)</li>
                  <li>精确率(Precision)</li>
                  <li>召回率(Recall)</li>
                  <li>F1分数</li>
                  <li>混淆矩阵</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Python代码示例</h3>
                <div className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleCode('evaluation-code')}
                    className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-left font-medium flex justify-between items-center"
                  >
                    <span>评估指标实现</span>
                    <span>{expandedCode === 'evaluation-code' ? '▼' : '▶'}</span>
                  </button>
                  {expandedCode === 'evaluation-code' && (
                    <pre className="bg-gray-100 p-4 overflow-x-auto">
                      <code>{`import numpy as np
from sklearn.metrics import accuracy_score, precision_recall_fscore_support
from sklearn.metrics import confusion_matrix
import matplotlib.pyplot as plt
import seaborn as sns

def calculate_metrics(y_true, y_pred):
    """
    计算评估指标
    """
    # 计算准确率
    accuracy = accuracy_score(y_true, y_pred)
    
    # 计算精确率、召回率和F1分数
    precision, recall, f1, _ = precision_recall_fscore_support(
        y_true, y_pred, average='weighted'
    )
    
    # 计算混淆矩阵
    cm = confusion_matrix(y_true, y_pred)
    
    return {
        'accuracy': accuracy,
        'precision': precision,
        'recall': recall,
        'f1': f1,
        'confusion_matrix': cm
    }

def plot_confusion_matrix(cm, labels):
    """
    绘制混淆矩阵
    """
    plt.figure(figsize=(8, 6))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
                xticklabels=labels, yticklabels=labels)
    plt.title('混淆矩阵')
    plt.xlabel('预测标签')
    plt.ylabel('真实标签')
    plt.show()

def evaluate_sentiment_analysis(model, test_data, test_labels):
    """
    评估情感分析模型
    """
    # 获取预测结果
    predictions = model.predict(test_data)
    
    # 计算评估指标
    metrics = calculate_metrics(test_labels, predictions)
    
    # 打印评估结果
    print("评估结果：")
    print(f"准确率: {metrics['accuracy']:.4f}")
    print(f"精确率: {metrics['precision']:.4f}")
    print(f"召回率: {metrics['recall']:.4f}")
    print(f"F1分数: {metrics['f1']:.4f}")
    
    # 绘制混淆矩阵
    labels = ['负面', '中性', '正面']
    plot_confusion_matrix(metrics['confusion_matrix'], labels)
    
    return metrics

# 使用示例
# 假设我们有以下测试数据
test_data = [
    "这个产品太差了，完全不值这个价。",
    "一般般吧，没什么特别的。",
    "非常好用，推荐购买！",
    "质量一般，但是价格便宜。",
    "服务态度很差，不推荐。"
]

test_labels = ['负面', '中性', '正面', '中性', '负面']

# 使用之前定义的SentimentAnalyzer类
analyzer = SentimentAnalyzer()

# 评估模型
metrics = evaluate_sentiment_analysis(analyzer, test_data, test_labels)

# 输出详细的评估报告
print("\\n详细评估报告：")
print("=" * 50)
print(f"总样本数: {len(test_data)}")
print(f"准确率: {metrics['accuracy']:.4f}")
print(f"精确率: {metrics['precision']:.4f}")
print(f"召回率: {metrics['recall']:.4f}")
print(f"F1分数: {metrics['f1']:.4f}")
print("=" * 50)`}</code>
                    </pre>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cases' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">实战案例</h2>
            <p className="mb-4">
              本节将介绍情感分析在实际应用中的案例，包括产品评论分析和社交媒体情感分析等。
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">产品评论分析</h3>
                <div className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleCode('product-review')}
                    className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-left font-medium flex justify-between items-center"
                  >
                    <span>产品评论分析实现</span>
                    <span>{expandedCode === 'product-review' ? '▼' : '▶'}</span>
                  </button>
                  {expandedCode === 'product-review' && (
                    <pre className="bg-gray-100 p-4 overflow-x-auto">
                      <code>{`import pandas as pd
import numpy as np
from collections import Counter
import matplotlib.pyplot as plt
import seaborn as sns

class ProductReviewAnalyzer:
    def __init__(self, model):
        self.model = model
        
    def analyze_reviews(self, reviews):
        """
        分析产品评论
        """
        # 情感分析
        sentiments = self.model.batch_predict(reviews)
        
        # 统计情感分布
        sentiment_counts = Counter(sentiments)
        
        # 计算情感比例
        total = len(sentiments)
        sentiment_ratios = {
            sentiment: count/total 
            for sentiment, count in sentiment_counts.items()
        }
        
        return {
            'sentiments': sentiments,
            'counts': sentiment_counts,
            'ratios': sentiment_ratios
        }
    
    def plot_sentiment_distribution(self, sentiment_counts):
        """
        绘制情感分布图
        """
        plt.figure(figsize=(10, 6))
        sentiments = list(sentiment_counts.keys())
        counts = list(sentiment_counts.values())
        
        plt.bar(sentiments, counts)
        plt.title('情感分布')
        plt.xlabel('情感类别')
        plt.ylabel('数量')
        plt.show()
    
    def generate_report(self, reviews, sentiments):
        """
        生成分析报告
        """
        # 统计基本信息
        total_reviews = len(reviews)
        sentiment_counts = Counter(sentiments)
        
        # 计算情感比例
        sentiment_ratios = {
            sentiment: count/total_reviews 
            for sentiment, count in sentiment_counts.items()
        }
        
        # 生成报告
        report = f"""
产品评论分析报告
================
总评论数: {total_reviews}

情感分布:
"""
        for sentiment, ratio in sentiment_ratios.items():
            report += f"{sentiment}: {ratio:.2%}\\n"
        
        return report

# 使用示例
# 假设我们有以下产品评论数据
reviews = [
    "这个产品质量很好，我很满意！",
    "一般般吧，没什么特别的。",
    "太差了，完全不值这个价。",
    "非常好用，推荐购买！",
    "质量一般，但是价格便宜。",
    "服务态度很差，不推荐。",
    "性价比很高，值得购买。",
    "包装很精美，但是产品一般。",
    "物流很快，但是产品有瑕疵。",
    "客服态度很好，解决问题很及时。"
]

# 使用之前定义的SentimentAnalyzer类
analyzer = ProductReviewAnalyzer(SentimentAnalyzer())

# 分析评论
results = analyzer.analyze_reviews(reviews)

# 绘制情感分布图
analyzer.plot_sentiment_distribution(results['counts'])

# 生成分析报告
report = analyzer.generate_report(reviews, results['sentiments'])
print(report)`}</code>
                    </pre>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">社交媒体情感分析</h3>
                <div className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleCode('social-media')}
                    className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-left font-medium flex justify-between items-center"
                  >
                    <span>社交媒体情感分析实现</span>
                    <span>{expandedCode === 'social-media' ? '▼' : '▶'}</span>
                  </button>
                  {expandedCode === 'social-media' && (
                    <pre className="bg-gray-100 p-4 overflow-x-auto">
                      <code>{`import pandas as pd
import numpy as np
from datetime import datetime
import matplotlib.pyplot as plt
import seaborn as sns

class SocialMediaAnalyzer:
    def __init__(self, model):
        self.model = model
        
    def analyze_posts(self, posts, timestamps):
        """
        分析社交媒体帖子
        """
        # 情感分析
        sentiments = self.model.batch_predict(posts)
        
        # 创建DataFrame
        df = pd.DataFrame({
            'post': posts,
            'timestamp': timestamps,
            'sentiment': sentiments
        })
        
        # 转换时间戳
        df['timestamp'] = pd.to_datetime(df['timestamp'])
        
        return df
    
    def analyze_temporal_trends(self, df):
        """
        分析情感随时间的变化趋势
        """
        # 按时间分组统计情感
        df['date'] = df['timestamp'].dt.date
        daily_sentiments = df.groupby(['date', 'sentiment']).size().unstack(fill_value=0)
        
        # 计算每日情感比例
        daily_ratios = daily_sentiments.div(daily_sentiments.sum(axis=1), axis=0)
        
        return daily_ratios
    
    def plot_temporal_trends(self, daily_ratios):
        """
        绘制情感趋势图
        """
        plt.figure(figsize=(12, 6))
        daily_ratios.plot(kind='area', stacked=True)
        plt.title('情感趋势分析')
        plt.xlabel('日期')
        plt.ylabel('情感比例')
        plt.legend(title='情感类别')
        plt.show()
    
    def generate_report(self, df):
        """
        生成分析报告
        """
        # 统计基本信息
        total_posts = len(df)
        sentiment_counts = df['sentiment'].value_counts()
        
        # 计算情感比例
        sentiment_ratios = sentiment_counts / total_posts
        
        # 生成报告
        report = f"""
社交媒体情感分析报告
==================
总帖子数: {total_posts}
时间范围: {df['timestamp'].min()} 至 {df['timestamp'].max()}

情感分布:
"""
        for sentiment, ratio in sentiment_ratios.items():
            report += f"{sentiment}: {ratio:.2%}\\n"
        
        return report

# 使用示例
# 假设我们有以下社交媒体数据
posts = [
    "今天天气真好，心情愉快！",
    "工作太累了，想休息。",
    "新买的手机很好用，推荐！",
    "这家餐厅的服务太差了。",
    "学习新知识很开心。"
]

timestamps = [
    "2024-01-01 10:00:00",
    "2024-01-01 14:30:00",
    "2024-01-02 09:15:00",
    "2024-01-02 12:45:00",
    "2024-01-03 16:20:00"
]

# 使用之前定义的SentimentAnalyzer类
analyzer = SocialMediaAnalyzer(SentimentAnalyzer())

# 分析帖子
df = analyzer.analyze_posts(posts, timestamps)

# 分析时间趋势
daily_ratios = analyzer.analyze_temporal_trends(df)

# 绘制趋势图
analyzer.plot_temporal_trends(daily_ratios)

# 生成分析报告
report = analyzer.generate_report(df)
print(report)`}</code>
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
          href="/study/ai/nlp/text-generation"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回文本生成
        </Link>
        <Link 
          href="/study/ai/nlp/qa"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          问答系统 →
        </Link>
      </div>
    </div>
  );
} 
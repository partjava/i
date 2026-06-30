'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@shared/components/ui/book/BookContent'

const saCode = `import torch
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
        return text.strip()

    def predict_sentiment(self, text):
        text = self.preprocess_text(text)
        inputs = self.tokenizer(text, return_tensors='pt', padding=True, truncation=True)
        inputs = {k: v.to(self.device) for k, v in inputs.items()}
        with torch.no_grad():
            outputs = self.model(**inputs)
            predictions = torch.softmax(outputs.logits, dim=1)
            sentiment = torch.argmax(predictions, dim=1).item()
        sentiment_map = {0: '负面', 1: '中性', 2: '正面'}
        return sentiment_map[sentiment]

    def batch_predict(self, texts):
        results = []
        for text in texts:
            sentiment = self.predict_sentiment(text)
            results.append(sentiment)
        return results

    def evaluate(self, texts, labels):
        predictions = self.batch_predict(texts)
        accuracy = accuracy_score(labels, predictions)
        precision, recall, f1, _ = precision_recall_fscore_support(labels, predictions, average='weighted')
        return {'accuracy': accuracy, 'precision': precision, 'recall': recall, 'f1': f1}

analyzer = SentimentAnalyzer()
text = "这个产品质量很好，我很满意！"
sentiment = analyzer.predict_sentiment(text)
print(f"文本: {text}\\n情感: {sentiment}")

texts = ["这个产品太差了，完全不值这个价。", "一般般吧，没什么特别的。", "非常好用，推荐购买！"]
sentiments = analyzer.batch_predict(texts)
for text, sentiment in zip(texts, sentiments):
    print(f"\\n文本: {text}\\n情感: {sentiment}")`

const evalCode2 = `import numpy as np
from sklearn.metrics import accuracy_score, precision_recall_fscore_support
from sklearn.metrics import confusion_matrix
import matplotlib.pyplot as plt
import seaborn as sns

def calculate_metrics(y_true, y_pred):
    accuracy = accuracy_score(y_true, y_pred)
    precision, recall, f1, _ = precision_recall_fscore_support(y_true, y_pred, average='weighted')
    cm = confusion_matrix(y_true, y_pred)
    return {'accuracy': accuracy, 'precision': precision, 'recall': recall, 'f1': f1, 'confusion_matrix': cm}

def plot_confusion_matrix(cm, labels):
    plt.figure(figsize=(8, 6))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', xticklabels=labels, yticklabels=labels)
    plt.title('混淆矩阵')
    plt.xlabel('预测标签')
    plt.ylabel('真实标签')
    plt.show()

def evaluate_sentiment_analysis(model, test_data, test_labels):
    predictions = model.predict(test_data)
    metrics = calculate_metrics(test_labels, predictions)
    print(f"准确率: {metrics['accuracy']:.4f}")
    print(f"精确率: {metrics['precision']:.4f}")
    print(f"召回率: {metrics['recall']:.4f}")
    print(f"F1分数: {metrics['f1']:.4f}")
    labels = ['负面', '中性', '正面']
    plot_confusion_matrix(metrics['confusion_matrix'], labels)
    return metrics

test_data = ["这个产品太差了，完全不值这个价。", "一般般吧，没什么特别的。", "非常好用，推荐购买！", "质量一般，但是价格便宜。", "服务态度很差，不推荐。"]
test_labels = ['负面', '中性', '正面', '中性', '负面']
analyzer = SentimentAnalyzer()
metrics = evaluate_sentiment_analysis(analyzer, test_data, test_labels)
print(f"总样本数: {len(test_data)}")
print(f"准确率: {metrics['accuracy']:.4f}")`

const reviewCode = `import pandas as pd
import numpy as np
from collections import Counter
import matplotlib.pyplot as plt
import seaborn as sns

class ProductReviewAnalyzer:
    def __init__(self, model):
        self.model = model

    def analyze_reviews(self, reviews):
        sentiments = self.model.batch_predict(reviews)
        sentiment_counts = Counter(sentiments)
        total = len(sentiments)
        sentiment_ratios = {sentiment: count/total for sentiment, count in sentiment_counts.items()}
        return {'sentiments': sentiments, 'counts': sentiment_counts, 'ratios': sentiment_ratios}

    def plot_sentiment_distribution(self, sentiment_counts):
        plt.figure(figsize=(10, 6))
        sentiments = list(sentiment_counts.keys())
        counts = list(sentiment_counts.values())
        plt.bar(sentiments, counts)
        plt.title('情感分布')
        plt.xlabel('情感类别')
        plt.ylabel('数量')
        plt.show()

    def generate_report(self, reviews, sentiments):
        total_reviews = len(reviews)
        sentiment_counts = Counter(sentiments)
        sentiment_ratios = {sentiment: count/total_reviews for sentiment, count in sentiment_counts.items()}
        report = f"产品评论分析报告\\n总评论数: {total_reviews}\\n情感分布:\\n"
        for sentiment, ratio in sentiment_ratios.items():
            report += f"{sentiment}: {ratio:.2%}\\n"
        return report

reviews = ["这个产品质量很好，我很满意！", "一般般吧，没什么特别的。", "太差了，完全不值这个价。", "非常好用，推荐购买！", "质量一般，但是价格便宜。", "服务态度很差，不推荐。", "性价比很高，值得购买。", "包装很精美，但是产品一般。", "物流很快，但是产品有瑕疵。", "客服态度很好，解决问题很及时。"]
analyzer = ProductReviewAnalyzer(SentimentAnalyzer())
results = analyzer.analyze_reviews(reviews)
analyzer.plot_sentiment_distribution(results['counts'])
report = analyzer.generate_report(reviews, results['sentiments'])
print(report)`

const socialCode = `import pandas as pd
import numpy as np
from datetime import datetime
import matplotlib.pyplot as plt
import seaborn as sns

class SocialMediaAnalyzer:
    def __init__(self, model):
        self.model = model

    def analyze_posts(self, posts, timestamps):
        sentiments = self.model.batch_predict(posts)
        df = pd.DataFrame({'post': posts, 'timestamp': timestamps, 'sentiment': sentiments})
        df['timestamp'] = pd.to_datetime(df['timestamp'])
        return df

    def analyze_temporal_trends(self, df):
        df['date'] = df['timestamp'].dt.date
        daily_sentiments = df.groupby(['date', 'sentiment']).size().unstack(fill_value=0)
        daily_ratios = daily_sentiments.div(daily_sentiments.sum(axis=1), axis=0)
        return daily_ratios

    def plot_temporal_trends(self, daily_ratios):
        plt.figure(figsize=(12, 6))
        daily_ratios.plot(kind='area', stacked=True)
        plt.title('情感趋势分析')
        plt.xlabel('日期')
        plt.ylabel('情感比例')
        plt.legend(title='情感类别')
        plt.show()

    def generate_report(self, df):
        total_posts = len(df)
        sentiment_counts = df['sentiment'].value_counts()
        sentiment_ratios = sentiment_counts / total_posts
        report = f"社交媒体情感分析报告\\n总帖子数: {total_posts}\\n时间范围: {df['timestamp'].min()} 至 {df['timestamp'].max()}\\n情感分布:\\n"
        for sentiment, ratio in sentiment_ratios.items():
            report += f"{sentiment}: {ratio:.2%}\\n"
        return report

posts = ["今天天气真好，心情愉快！", "工作太累了，想休息。", "新买的手机很好用，推荐！", "这家餐厅的服务太差了。", "学习新知识很开心。"]
timestamps = ["2024-01-01 10:00:00", "2024-01-01 14:30:00", "2024-01-02 09:15:00", "2024-01-02 12:45:00", "2024-01-03 16:20:00"]
analyzer = SocialMediaAnalyzer(SentimentAnalyzer())
df = analyzer.analyze_posts(posts, timestamps)
daily_ratios = analyzer.analyze_temporal_trends(df)
analyzer.plot_temporal_trends(daily_ratios)
report = analyzer.generate_report(df)
print(report)`

const META: LessonMeta = {
  subject: '自然语言处理', chapterTitle: '情感分析', chapterNumber: 8, totalChapters: 14,
  subjectHref: '/study/ai/nlp',
  prevChapter: { label: '文本生成', href: '/study/ai/nlp/text-generation' },
  nextChapter: { label: '问答系统', href: '/study/ai/nlp/qa' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '概述', left: (<div className="space-y-4"><PageTitle>情感分析概述</PageTitle><BookParagraph>情感分析(Sentiment Analysis)是自然语言处理的重要任务之一，旨在分析文本中表达的情感倾向。它可以帮助我们理解用户对产品、服务或事件的态度和情感。</BookParagraph><SectionTitle>主要特点</SectionTitle><BookList items={['情感极性分析','情感强度分析','多维度情感分析','方面级情感分析','跨语言情感分析']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>应用场景</SectionTitle><BookList items={['社交媒体分析','产品评论分析','舆情监测','客户服务','市场调研']} /></div>),
  },
  {
    label: '分析方法', left: (<div className="space-y-4"><PageTitle>情感分析方法</PageTitle><BookParagraph>情感分析的方法主要包括基于规则的方法、机器学习方法和深度学习方法。目前主流的分析方法主要基于深度学习和预训练语言模型。</BookParagraph><SectionTitle>主要方法</SectionTitle><BookList items={['基于词典的方法','机器学习方法','深度学习方法','预训练语言模型','混合方法']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>情感分析实现</SectionTitle><BookCode language="python" code={saCode} /></div>),
  },
  {
    label: '评估指标', left: (<div className="space-y-4"><PageTitle>评估指标</PageTitle><BookParagraph>情感分析的评估主要关注模型的准确性和可靠性。常用的评估指标包括准确率、精确率、召回率和F1分数等。</BookParagraph><SectionTitle>评估指标</SectionTitle><BookList items={['准确率(Accuracy)','精确率(Precision)','召回率(Recall)','F1分数','混淆矩阵']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>评估指标实现</SectionTitle><BookCode language="python" code={evalCode2} /></div>),
  },
  {
    label: '实战案例', left: (<div className="space-y-4"><PageTitle>实战案例</PageTitle><BookParagraph>本节将介绍情感分析在实际应用中的案例，包括产品评论分析和社交媒体情感分析等。</BookParagraph><SectionTitle>产品评论分析</SectionTitle><BookCode language="python" code={reviewCode} /></div>),
    right: (<div className="space-y-4"><SectionTitle>社交媒体情感分析</SectionTitle><BookCode language="python" code={socialCode} /></div>),
  },
]

export default function NlpSaPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }

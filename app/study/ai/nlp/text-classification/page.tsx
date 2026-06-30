'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@shared/components/ui/book/BookContent'

const mlCode = `import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.svm import LinearSVC
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

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
labels = [1, 1, 1, 1, 0, 0, 0, 0]

X_train, X_test, y_train, y_test = train_test_split(texts, labels, test_size=0.3, random_state=42)

vectorizer = TfidfVectorizer()
X_train_tfidf = vectorizer.fit_transform(X_train)
X_test_tfidf = vectorizer.transform(X_test)

nb_model = MultinomialNB()
nb_model.fit(X_train_tfidf, y_train)
nb_pred = nb_model.predict(X_test_tfidf)

svm_model = LinearSVC()
svm_model.fit(X_train_tfidf, y_train)
svm_pred = svm_model.predict(X_test_tfidf)

print("朴素贝叶斯模型评估：")
print(classification_report(y_test, nb_pred))

print("\\nSVM模型评估：")
print(classification_report(y_test, svm_pred))

new_texts = ["自然语言处理技术发展迅速", "文本分类算法不断改进"]
new_texts_tfidf = vectorizer.transform(new_texts)
nb_predictions = nb_model.predict(new_texts_tfidf)
svm_predictions = svm_model.predict(new_texts_tfidf)

for text, nb_pred, svm_pred in zip(new_texts, nb_predictions, svm_predictions):
    print(f"文本: {text}")
    print(f"朴素贝叶斯预测: {'NLP相关' if nb_pred == 1 else '文本分类相关'}")
    print(f"SVM预测: {'NLP相关' if svm_pred == 1 else '文本分类相关'}")`

const dlCode = `import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
from transformers import BertTokenizer, BertForSequenceClassification
from sklearn.model_selection import train_test_split

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
labels = [1, 1, 1, 1, 0, 0, 0, 0]

X_train, X_test, y_train, y_test = train_test_split(texts, labels, test_size=0.3, random_state=42)

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
        encoding = self.tokenizer(text, add_special_tokens=True, max_length=self.max_length, padding='max_length', truncation=True, return_tensors='pt')
        return {'input_ids': encoding['input_ids'].flatten(), 'attention_mask': encoding['attention_mask'].flatten(), 'labels': torch.tensor(label)}

tokenizer = BertTokenizer.from_pretrained('bert-base-chinese')
model = BertForSequenceClassification.from_pretrained('bert-base-chinese', num_labels=2)

train_dataset = TextDataset(X_train, y_train, tokenizer)
test_dataset = TextDataset(X_test, y_test, tokenizer)
train_dataloader = DataLoader(train_dataset, batch_size=2, shuffle=True)
test_dataloader = DataLoader(test_dataset, batch_size=2)

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model.to(device)
optimizer = optim.AdamW(model.parameters(), lr=2e-5)
criterion = nn.CrossEntropyLoss()

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

num_epochs = 3
for epoch in range(num_epochs):
    train_loss = train_epoch(model, train_dataloader, optimizer, criterion, device)
    accuracy = evaluate(model, test_dataloader, device)
    print(f"Epoch {epoch+1}/{num_epochs}, Loss: {train_loss:.4f}, Acc: {accuracy:.4f}")

model.save_pretrained('bert-text-classifier')

def predict(text):
    model.eval()
    encoding = tokenizer(text, add_special_tokens=True, max_length=128, padding='max_length', truncation=True, return_tensors='pt')
    input_ids = encoding['input_ids'].to(device)
    attention_mask = encoding['attention_mask'].to(device)
    with torch.no_grad():
        outputs = model(input_ids=input_ids, attention_mask=attention_mask)
        predictions = torch.argmax(outputs.logits, dim=-1)
    return predictions.item()

new_texts = ["自然语言处理技术发展迅速", "文本分类算法不断改进"]
for text in new_texts:
    prediction = predict(text)
    print(f"文本: {text}, 预测: {'NLP相关' if prediction == 1 else '文本分类相关'}")`

const evalCode = `import numpy as np
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix
import seaborn as sns
import matplotlib.pyplot as plt

y_true = [1, 0, 1, 1, 0, 1, 0, 0]
y_pred = [1, 0, 1, 0, 0, 1, 1, 0]

accuracy = accuracy_score(y_true, y_pred)
precision = precision_score(y_true, y_pred)
recall = recall_score(y_true, y_pred)
f1 = f1_score(y_true, y_pred)

print(f"准确率: {accuracy:.4f}")
print(f"精确率: {precision:.4f}")
print(f"召回率: {recall:.4f}")
print(f"F1值: {f1:.4f}")

cm = confusion_matrix(y_true, y_pred)
plt.figure(figsize=(8, 6))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
plt.title('混淆矩阵')
plt.xlabel('预测标签')
plt.ylabel('真实标签')
plt.show()

def evaluate_multi_class(y_true, y_pred, labels):
    print("\\n多分类评估：")
    print(f"准确率: {accuracy_score(y_true, y_pred):.4f}")
    print(f"宏平均精确率: {precision_score(y_true, y_pred, average='macro'):.4f}")
    print(f"宏平均召回率: {recall_score(y_true, y_pred, average='macro'):.4f}")
    print(f"宏平均F1值: {f1_score(y_true, y_pred, average='macro'):.4f}")
    for i, label in enumerate(labels):
        print(f"\\n类别{label}: P={precision_score(y_true, y_pred, labels=[i], average='micro'):.4f} R={recall_score(y_true, y_pred, labels=[i], average='micro'):.4f} F1={f1_score(y_true, y_pred, labels=[i], average='micro'):.4f}")

y_true_multi = [0, 1, 2, 0, 1, 2, 0, 1]
y_pred_multi = [0, 1, 1, 0, 2, 2, 0, 1]
evaluate_multi_class(y_true_multi, y_pred_multi, ['类别A', '类别B', '类别C'])`

const sentimentCode = `import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import LinearSVC
from sklearn.metrics import classification_report
import jieba

data = pd.read_csv('sentiment_data.csv')
texts = data['text'].values
labels = data['sentiment'].values

def preprocess_text(text):
    words = jieba.cut(text)
    stopwords = set(['的', '了', '和', '是', '就', '都', '而', '及', '与', '这'])
    words = [word for word in words if word not in stopwords]
    return ' '.join(words)

processed_texts = [preprocess_text(text) for text in texts]
X_train, X_test, y_train, y_test = train_test_split(processed_texts, labels, test_size=0.2, random_state=42)
vectorizer = TfidfVectorizer(max_features=5000)
X_train_tfidf = vectorizer.fit_transform(X_train)
X_test_tfidf = vectorizer.transform(X_test)

model = LinearSVC()
model.fit(X_train_tfidf, y_train)
y_pred = model.predict(X_test_tfidf)
print(classification_report(y_test, y_pred))

def predict_sentiment(text):
    processed_text = preprocess_text(text)
    text_tfidf = vectorizer.transform([processed_text])
    prediction = model.predict(text_tfidf)
    return '正面' if prediction[0] == 1 else '负面'

test_texts = ["这个产品质量很好，我很满意", "服务态度很差，不推荐购买"]
for text in test_texts:
    sentiment = predict_sentiment(text)
    print(f"文本: {text}, 情感: {sentiment}")`

const spamCode = `import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import classification_report
import re

data = pd.read_csv('spam_data.csv')
texts = data['text'].values
labels = data['label'].values

def preprocess_email(text):
    text = text.lower()
    text = re.sub(r'http\\S+|www\\S+|https\\S+', '', text, flags=re.MULTILINE)
    text = re.sub(r'[^\\w\\s]', '', text)
    text = re.sub(r'\\d+', '', text)
    return text

processed_texts = [preprocess_email(text) for text in texts]
X_train, X_test, y_train, y_test = train_test_split(processed_texts, labels, test_size=0.2, random_state=42)
vectorizer = CountVectorizer(max_features=5000)
X_train_counts = vectorizer.fit_transform(X_train)
X_test_counts = vectorizer.transform(X_test)

model = MultinomialNB()
model.fit(X_train_counts, y_train)
y_pred = model.predict(X_test_counts)
print(classification_report(y_test, y_pred))

def predict_spam(text):
    processed_text = preprocess_email(text)
    text_counts = vectorizer.transform([processed_text])
    prediction = model.predict(text_counts)
    return '垃圾邮件' if prediction[0] == 1 else '正常邮件'

test_emails = ["恭喜您获得100万奖金，请点击链接领取", "请查收附件中的会议纪要"]
for email in test_emails:
    result = predict_spam(email)
    print(f"邮件: {email}, 预测: {result}")`

const META: LessonMeta = {
  subject: '自然语言处理', chapterTitle: '文本分类', chapterNumber: 4, totalChapters: 14,
  subjectHref: '/study/ai/nlp',
  prevChapter: { label: '词向量与词嵌入', href: '/study/ai/nlp/word-embeddings' },
  nextChapter: { label: '命名实体识别', href: '/study/ai/nlp/ner' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '概述', left: (<div className="space-y-4"><PageTitle>文本分类概述</PageTitle><BookParagraph>文本分类是自然语言处理中的基础任务之一，其目标是将文本自动分类到预定义的类别中。文本分类在垃圾邮件过滤、情感分析、主题分类等场景中有着广泛的应用。</BookParagraph><SectionTitle>应用场景</SectionTitle><BookList items={['垃圾邮件过滤','情感分析','新闻分类','主题分类','意图识别']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>主要挑战</SectionTitle><BookList items={['文本长度不一','一词多义','类别不平衡','噪声数据','新词和未知词']} /></div>),
  },
  {
    label: '传统方法', left: (<div className="space-y-4"><PageTitle>传统机器学习方法</PageTitle><BookParagraph>传统的文本分类方法主要基于机器学习算法，包括朴素贝叶斯、SVM、决策树等。这些方法通常需要先进行特征工程，如TF-IDF、词袋模型等。</BookParagraph><SectionTitle>特征提取方法</SectionTitle><BookList items={['词袋模型(Bag of Words)','TF-IDF','N-gram特征','词性特征','文本统计特征']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>Python代码示例</SectionTitle><BookCode language="python" code={mlCode} /></div>),
  },
  {
    label: '深度学习方法', left: (<div className="space-y-4"><PageTitle>深度学习方法</PageTitle><BookParagraph>深度学习方法在文本分类任务中取得了显著的效果，主要包括CNN、RNN、Transformer等模型。这些方法能够自动学习文本特征，不需要复杂的特征工程。</BookParagraph><SectionTitle>常用深度学习模型</SectionTitle><BookList items={['TextCNN','LSTM/GRU','Transformer','BERT及其变体','预训练语言模型']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>Python代码示例</SectionTitle><BookCode language="python" code={dlCode} /></div>),
  },
  {
    label: '评估指标', left: (<div className="space-y-4"><PageTitle>评估指标</PageTitle><BookParagraph>文本分类任务的评估指标主要包括准确率、精确率、召回率、F1值等。选择合适的评估指标对于模型性能的评估和比较非常重要。</BookParagraph><SectionTitle>常用评估指标</SectionTitle><BookList items={['准确率(Accuracy)','精确率(Precision)','召回率(Recall)','F1值','混淆矩阵']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>Python代码示例</SectionTitle><BookCode language="python" code={evalCode} /></div>),
  },
  {
    label: '实战案例', left: (<div className="space-y-4"><PageTitle>实战案例</PageTitle><BookParagraph>本节将介绍文本分类在实际应用中的案例，包括情感分析、垃圾邮件过滤、新闻分类等。</BookParagraph><SectionTitle>情感分析案例</SectionTitle><BookCode language="python" code={sentimentCode} /></div>),
    right: (<div className="space-y-4"><SectionTitle>垃圾邮件过滤案例</SectionTitle><BookCode language="python" code={spamCode} /></div>),
  },
]

export default function NlpTextClassificationPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }

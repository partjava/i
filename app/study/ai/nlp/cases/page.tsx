'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@/app/components/ui/book/BookContent'

const tcCode = `import torch
from transformers import BertTokenizer, BertForSequenceClassification
from torch.utils.data import Dataset, DataLoader
import pandas as pd
import numpy as np

class NewsDataset(Dataset):
    def __init__(self, texts, labels, tokenizer, max_length=512):
        self.texts = texts; self.labels = labels; self.tokenizer = tokenizer; self.max_length = max_length
    def __len__(self): return len(self.texts)
    def __getitem__(self, idx):
        text, label = str(self.texts[idx]), self.labels[idx]
        encoding = self.tokenizer(text, add_special_tokens=True, max_length=self.max_length, padding='max_length', truncation=True, return_tensors='pt')
        return {'input_ids': encoding['input_ids'].flatten(), 'attention_mask': encoding['attention_mask'].flatten(), 'labels': torch.tensor(label, dtype=torch.long)}

def train_model(model, train_loader, val_loader, device, epochs=3):
    optimizer = torch.optim.AdamW(model.parameters(), lr=2e-5)
    for epoch in range(epochs):
        model.train(); total_loss = 0
        for batch in train_loader:
            input_ids = batch['input_ids'].to(device); attention_mask = batch['attention_mask'].to(device); labels = batch['labels'].to(device)
            outputs = model(input_ids=input_ids, attention_mask=attention_mask, labels=labels)
            loss = outputs.loss; total_loss += loss.item()
            loss.backward(); optimizer.step(); optimizer.zero_grad()
        model.eval(); correct = 0; total = 0
        with torch.no_grad():
            for batch in val_loader:
                input_ids = batch['input_ids'].to(device); attention_mask = batch['attention_mask'].to(device); labels = batch['labels'].to(device)
                outputs = model(input_ids=input_ids, attention_mask=attention_mask, labels=labels)
                _, predicted = torch.max(outputs.logits, 1); total += labels.size(0); correct += (predicted == labels).sum().item()
        print(f'Epoch {epoch+1}: Loss={total_loss/len(train_loader):.4f}, Acc={100*correct/total:.2f}%')

def main():
    df = pd.read_csv('news_dataset.csv')
    tokenizer = BertTokenizer.from_pretrained('bert-base-chinese')
    model = BertForSequenceClassification.from_pretrained('bert-base-chinese', num_labels=len(set(df['category'])))
    dataset = NewsDataset(df['text'].values, df['category'].values, tokenizer)
    train_size = int(0.8 * len(dataset))
    train_dataset, val_dataset = torch.utils.data.random_split(dataset, [train_size, len(dataset)-train_size])
    train_loader = DataLoader(train_dataset, batch_size=16, shuffle=True)
    val_loader = DataLoader(val_dataset, batch_size=16)
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model.to(device); train_model(model, train_loader, val_loader, device)
    torch.save(model.state_dict(), 'news_classifier.pth')`

const saCode2 = `import torch
from transformers import RobertaTokenizer, RobertaForSequenceClassification
from torch.utils.data import Dataset, DataLoader
import pandas as pd
import numpy as np
from sklearn.metrics import precision_recall_fscore_support

class ReviewDataset(Dataset):
    def __init__(self, texts, labels, tokenizer, max_length=256):
        self.texts = texts; self.labels = labels; self.tokenizer = tokenizer; self.max_length = max_length
    def __len__(self): return len(self.texts)
    def __getitem__(self, idx):
        text, label = str(self.texts[idx]), self.labels[idx]
        encoding = self.tokenizer(text, add_special_tokens=True, max_length=self.max_length, padding='max_length', truncation=True, return_tensors='pt')
        return {'input_ids': encoding['input_ids'].flatten(), 'attention_mask': encoding['attention_mask'].flatten(), 'labels': torch.tensor(label, dtype=torch.long)}

def evaluate_model(model, test_loader, device):
    model.eval(); all_preds, all_labels = [], []
    with torch.no_grad():
        for batch in test_loader:
            input_ids = batch['input_ids'].to(device); attention_mask = batch['attention_mask'].to(device); labels = batch['labels'].to(device)
            outputs = model(input_ids=input_ids, attention_mask=attention_mask)
            _, preds = torch.max(outputs.logits, 1); all_preds.extend(preds.cpu().numpy()); all_labels.extend(labels.cpu().numpy())
    precision, recall, f1, _ = precision_recall_fscore_support(all_labels, all_preds, average='binary')
    return {'precision': precision, 'recall': recall, 'f1': f1}

def train_model(model, train_loader, val_loader, device, epochs=3):
    optimizer = torch.optim.AdamW(model.parameters(), lr=2e-5)
    best_f1 = 0
    for epoch in range(epochs):
        model.train(); total_loss = 0
        for batch in train_loader:
            input_ids = batch['input_ids'].to(device); attention_mask = batch['attention_mask'].to(device); labels = batch['labels'].to(device)
            outputs = model(input_ids=input_ids, attention_mask=attention_mask, labels=labels)
            loss = outputs.loss; total_loss += loss.item()
            loss.backward(); optimizer.step(); optimizer.zero_grad()
        metrics = evaluate_model(model, val_loader, device)
        if metrics['f1'] > best_f1:
            best_f1 = metrics['f1']; torch.save(model.state_dict(), 'best_sentiment_model.pth')
        print(f'Epoch {epoch+1}: Loss={total_loss/len(train_loader):.4f}, P={metrics["precision"]:.4f}, R={metrics["recall"]:.4f}, F1={metrics["f1"]:.4f}')`

const nerCode = `import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
import numpy as np

class BiLSTMCRF(nn.Module):
    def __init__(self, vocab_size, embedding_dim, hidden_dim, num_tags):
        super(BiLSTMCRF, self).__init__()
        self.embedding = nn.Embedding(vocab_size, embedding_dim)
        self.lstm = nn.LSTM(embedding_dim, hidden_dim//2, num_layers=2, bidirectional=True, batch_first=True)
        self.hidden2tag = nn.Linear(hidden_dim, num_tags)
        self.transitions = nn.Parameter(torch.randn(num_tags, num_tags))
        self.start_transitions = nn.Parameter(torch.randn(num_tags))
        self.end_transitions = nn.Parameter(torch.randn(num_tags))
    def forward(self, x, mask):
        embedded = self.embedding(x)
        lstm_out, _ = self.lstm(embedded)
        return self.hidden2tag(lstm_out)
    def viterbi_decode(self, emissions, mask):
        batch_size, seq_length, num_tags = emissions.size()
        viterbi = torch.zeros(batch_size, seq_length, num_tags)
        backpointer = torch.zeros(batch_size, seq_length, num_tags, dtype=torch.long)
        viterbi[:,0,:] = self.start_transitions + emissions[:,0,:]
        for t in range(1, seq_length):
            for i in range(num_tags):
                viterbi[:,t,i] = (viterbi[:,t-1,:] + self.transitions[:,i] + emissions[:,t,i]).max(dim=1)[0]
                backpointer[:,t,i] = (viterbi[:,t-1,:] + self.transitions[:,i]).max(dim=1)[1]
        best_path = torch.zeros(batch_size, seq_length, dtype=torch.long)
        best_path[:,-1] = viterbi[:,-1,:].max(dim=1)[1]
        for t in range(seq_length-2, -1, -1):
            best_path[:,t] = backpointer[:,t+1, best_path[:,t+1]]
        return best_path`

const mtCode = `import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
from transformers import BertTokenizer
import numpy as np

class TranslationDataset(Dataset):
    def __init__(self, source_texts, target_texts, source_tokenizer, target_tokenizer, max_length=128):
        self.source_texts = source_texts; self.target_texts = target_texts; self.source_tokenizer = source_tokenizer; self.target_tokenizer = target_tokenizer; self.max_length = max_length
    def __len__(self): return len(self.source_texts)
    def __getitem__(self, idx):
        src = self.source_tokenizer(str(self.source_texts[idx]), add_special_tokens=True, max_length=self.max_length, padding='max_length', truncation=True, return_tensors='pt')
        tgt = self.target_tokenizer(str(self.target_texts[idx]), add_special_tokens=True, max_length=self.max_length, padding='max_length', truncation=True, return_tensors='pt')
        return {'input_ids': src['input_ids'].flatten(), 'attention_mask': src['attention_mask'].flatten(), 'labels': tgt['input_ids'].flatten()}

class Transformer(nn.Module):
    def __init__(self, d_model=512, nhead=8, num_encoder_layers=6, num_decoder_layers=6, dim_feedforward=2048, dropout=0.1):
        super(Transformer, self).__init__()
        self.transformer = nn.Transformer(d_model=d_model, nhead=nhead, num_encoder_layers=num_encoder_layers, num_decoder_layers=num_decoder_layers, dim_feedforward=dim_feedforward, dropout=dropout)
    def forward(self, src, tgt, src_mask=None, tgt_mask=None, src_key_padding_mask=None):
        return self.transformer(src, tgt, src_mask, tgt_mask, src_key_padding_mask=src_key_padding_mask)`

const META: LessonMeta = {
  subject: '自然语言处理', chapterTitle: 'NLP实战案例', chapterNumber: 12, totalChapters: 14,
  subjectHref: '/study/ai/nlp',
  prevChapter: { label: 'NLP框架与工具', href: '/study/ai/nlp/frameworks' },
  nextChapter: { label: 'NLP面试题', href: '/study/ai/nlp/interview' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '文本分类实战', left: (<div className="space-y-4"><PageTitle>文本分类实战</PageTitle><BookParagraph>使用深度学习模型进行新闻文本分类，实现自动新闻分类系统。</BookParagraph><SectionTitle>项目概述</SectionTitle><BookList items={['数据集：新闻文本数据集','任务：多分类文本分类','模型：BERT + 分类头','评估指标：准确率、F1分数']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>实现代码</SectionTitle><BookCode language="python" code={tcCode} /></div>),
  },
  {
    label: '情感分析案例', left: (<div className="space-y-4"><PageTitle>情感分析案例</PageTitle><BookParagraph>使用深度学习模型进行商品评论情感分析，实现自动情感分类系统。</BookParagraph><SectionTitle>项目概述</SectionTitle><BookList items={['数据集：商品评论数据集','任务：二分类情感分析','模型：RoBERTa + 情感分类头','评估指标：准确率、精确率、召回率']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>实现代码</SectionTitle><BookCode language="python" code={saCode2} /></div>),
  },
  {
    label: '命名实体识别', left: (<div className="space-y-4"><PageTitle>命名实体识别</PageTitle><BookParagraph>使用深度学习模型进行中文命名实体识别，实现自动实体标注系统。</BookParagraph><SectionTitle>项目概述</SectionTitle><BookList items={['数据集：中文NER数据集','任务：序列标注','模型：BiLSTM-CRF','评估指标：F1分数']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>实现代码</SectionTitle><BookCode language="python" code={nerCode} /></div>),
  },
  {
    label: '机器翻译项目', left: (<div className="space-y-4"><PageTitle>机器翻译项目</PageTitle><BookParagraph>使用Transformer模型实现中英机器翻译系统。</BookParagraph><SectionTitle>项目概述</SectionTitle><BookList items={['数据集：中英平行语料库','任务：序列到序列翻译','模型：Transformer','评估指标：BLEU分数']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>实现代码</SectionTitle><BookCode language="python" code={mtCode} /></div>),
  },
]

export default function NlpCasesPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }

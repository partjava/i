'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@/app/components/ui/book/BookContent'

const bertCrfCode = `import torch
import torch.nn as nn
from transformers import BertTokenizer, BertModel
from torchcrf import CRF

class BertCRF(nn.Module):
    def __init__(self, num_labels, bert_model_name='bert-base-chinese'):
        super(BertCRF, self).__init__()
        self.bert = BertModel.from_pretrained(bert_model_name)
        self.dropout = nn.Dropout(0.1)
        self.classifier = nn.Linear(768, num_labels)
        self.crf = CRF(num_labels, batch_first=True)

    def forward(self, input_ids, attention_mask, labels=None):
        outputs = self.bert(input_ids=input_ids, attention_mask=attention_mask)
        sequence_output = outputs[0]
        sequence_output = self.dropout(sequence_output)
        logits = self.classifier(sequence_output)

        if labels is not None:
            loss = -self.crf(logits, labels, mask=attention_mask.bool())
            return loss
        else:
            return self.crf.decode(logits, mask=attention_mask.bool())

# 准备数据
tokenizer = BertTokenizer.from_pretrained('bert-base-chinese')
model = BertCRF(num_labels=7)  # 假设有7个标签类别

# 示例文本
text = "张三在北京大学读书，他来自上海。"

# 文本预处理
tokens = tokenizer(text, return_tensors='pt', padding=True, truncation=True)

# 预测
model.eval()
with torch.no_grad():
    predictions = model(tokens['input_ids'], tokens['attention_mask'])

# 解码预测结果
id2label = {0: 'O', 1: 'B-PER', 2: 'I-PER', 3: 'B-LOC', 4: 'I-LOC', 5: 'B-ORG', 6: 'I-ORG'}
predicted_labels = [id2label[p] for p in predictions[0]]

# 输出结果
tokens = tokenizer.convert_ids_to_tokens(tokens['input_ids'][0])
for token, label in zip(tokens, predicted_labels):
    if token not in ['[CLS]', '[SEP]', '[PAD]']:
        print(f"{token}: {label}")`

const evalCode = `from seqeval.metrics import precision_score, recall_score, f1_score
import numpy as np

def evaluate_ner(y_true, y_pred):
    """
    评估NER模型性能
    y_true: 真实标签序列
    y_pred: 预测标签序列
    """
    # 计算实体级别的评估指标
    precision = precision_score(y_true, y_pred)
    recall = recall_score(y_true, y_pred)
    f1 = f1_score(y_true, y_pred)

    print(f"实体级别准确率: {precision:.4f}")
    print(f"实体级别召回率: {recall:.4f}")
    print(f"实体级别F1值: {f1:.4f}")

    # 计算每个实体类型的评估指标
    entity_types = set()
    for seq in y_true:
        for tag in seq:
            if tag != 'O':
                entity_types.add(tag.split('-')[1])

    print("\\n各实体类型的评估指标：")
    for entity_type in entity_types:
        type_precision = precision_score(y_true, y_pred, mode='strict', scheme='IOB2', suffix=True, average='micro', labels=[f'B-{entity_type}', f'I-{entity_type}'])
        type_recall = recall_score(y_true, y_pred, mode='strict', scheme='IOB2', suffix=True, average='micro', labels=[f'B-{entity_type}', f'I-{entity_type}'])
        type_f1 = f1_score(y_true, y_pred, mode='strict', scheme='IOB2', suffix=True, average='micro', labels=[f'B-{entity_type}', f'I-{entity_type}'])

        print(f"\\n{entity_type}:")
        print(f"准确率: {type_precision:.4f}")
        print(f"召回率: {type_recall:.4f}")
        print(f"F1值: {type_f1:.4f}")

# 示例数据
y_true = [
    ['O', 'B-PER', 'I-PER', 'O', 'B-LOC', 'I-LOC'],
    ['B-ORG', 'I-ORG', 'O', 'B-PER', 'I-PER']
]
y_pred = [
    ['O', 'B-PER', 'I-PER', 'O', 'B-LOC', 'I-LOC'],
    ['B-ORG', 'I-ORG', 'O', 'B-PER', 'O']
]

evaluate_ner(y_true, y_pred)`

const newsNerCode = `import torch
import torch.nn as nn
from transformers import BertTokenizer, BertModel
from torchcrf import CRF
import jieba
import re

class NewsNERModel(nn.Module):
    def __init__(self, num_labels, bert_model_name='bert-base-chinese'):
        super(NewsNERModel, self).__init__()
        self.bert = BertModel.from_pretrained(bert_model_name)
        self.dropout = nn.Dropout(0.1)
        self.classifier = nn.Linear(768, num_labels)
        self.crf = CRF(num_labels, batch_first=True)

    def forward(self, input_ids, attention_mask, labels=None):
        outputs = self.bert(input_ids=input_ids, attention_mask=attention_mask)
        sequence_output = outputs[0]
        sequence_output = self.dropout(sequence_output)
        logits = self.classifier(sequence_output)

        if labels is not None:
            loss = -self.crf(logits, labels, mask=attention_mask.bool())
            return loss
        else:
            return self.crf.decode(logits, mask=attention_mask.bool())

def preprocess_text(text):
    # 文本清洗
    text = re.sub(r'[\\s\\n]+', ' ', text)
    # 分词
    words = list(jieba.cut(text))
    return words

def predict_entities(text, model, tokenizer, id2label):
    # 预处理文本
    words = preprocess_text(text)

    # 转换为模型输入格式
    tokens = tokenizer(words, is_split_into_words=True, return_tensors='pt', padding=True, truncation=True)

    # 预测
    model.eval()
    with torch.no_grad():
        predictions = model(tokens['input_ids'], tokens['attention_mask'])

    # 解码预测结果
    predicted_labels = [id2label[p] for p in predictions[0]]

    # 提取实体
    entities = []
    current_entity = []
    current_type = None

    for word, label in zip(words, predicted_labels):
        if label.startswith('B-'):
            if current_entity:
                entities.append((''.join(current_entity), current_type))
            current_entity = [word]
            current_type = label[2:]
        elif label.startswith('I-'):
            if current_entity:
                current_entity.append(word)
        else:
            if current_entity:
                entities.append((''.join(current_entity), current_type))
                current_entity = []
                current_type = None

    if current_entity:
        entities.append((''.join(current_entity), current_type))

    return entities

# 使用示例
text = """
新华社北京3月15日电（记者张三）中国国家主席习近平15日在北京人民大会堂会见来访的美国总统拜登。
双方就中美关系和共同关心的国际问题深入交换了意见。
"""

# 加载模型和分词器
tokenizer = BertTokenizer.from_pretrained('bert-base-chinese')
model = NewsNERModel(num_labels=7)
id2label = {0: 'O', 1: 'B-PER', 2: 'I-PER', 3: 'B-LOC', 4: 'I-LOC', 5: 'B-ORG', 6: 'I-ORG'}

# 预测实体
entities = predict_entities(text, model, tokenizer, id2label)

# 输出结果
print("识别到的实体：")
for entity, entity_type in entities:
    print(f"{entity}: {entity_type}")`

const medicalNerCode = `import torch
import torch.nn as nn
from transformers import BertTokenizer, BertModel
from torchcrf import CRF
import re

class MedicalNERModel(nn.Module):
    def __init__(self, num_labels, bert_model_name='bert-base-chinese'):
        super(MedicalNERModel, self).__init__()
        self.bert = BertModel.from_pretrained(bert_model_name)
        self.dropout = nn.Dropout(0.1)
        self.classifier = nn.Linear(768, num_labels)
        self.crf = CRF(num_labels, batch_first=True)

    def forward(self, input_ids, attention_mask, labels=None):
        outputs = self.bert(input_ids=input_ids, attention_mask=attention_mask)
        sequence_output = outputs[0]
        sequence_output = self.dropout(sequence_output)
        logits = self.classifier(sequence_output)

        if labels is not None:
            loss = -self.crf(logits, labels, mask=attention_mask.bool())
            return loss
        else:
            return self.crf.decode(logits, mask=attention_mask.bool())

def preprocess_medical_text(text):
    # 医疗文本预处理
    text = re.sub(r'[\\s\\n]+', ' ', text)
    # 处理特殊字符
    text = re.sub(r'[^\\u4e00-\\u9fa5a-zA-Z0-9\\s]', ' ', text)
    return text

def predict_medical_entities(text, model, tokenizer, id2label):
    # 预处理文本
    text = preprocess_medical_text(text)

    # 转换为模型输入格式
    tokens = tokenizer(text, return_tensors='pt', padding=True, truncation=True)

    # 预测
    model.eval()
    with torch.no_grad():
        predictions = model(tokens['input_ids'], tokens['attention_mask'])

    # 解码预测结果
    predicted_labels = [id2label[p] for p in predictions[0]]

    # 提取实体
    entities = []
    current_entity = []
    current_type = None

    tokens = tokenizer.convert_ids_to_tokens(tokens['input_ids'][0])
    for token, label in zip(tokens, predicted_labels):
        if token not in ['[CLS]', '[SEP]', '[PAD]']:
            if label.startswith('B-'):
                if current_entity:
                    entities.append((''.join(current_entity), current_type))
                current_entity = [token]
                current_type = label[2:]
            elif label.startswith('I-'):
                if current_entity:
                    current_entity.append(token)
            else:
                if current_entity:
                    entities.append((''.join(current_entity), current_type))
                    current_entity = []
                    current_type = None

    if current_entity:
        entities.append((''.join(current_entity), current_type))

    return entities

# 使用示例
text = """
患者男，45岁，因发热、咳嗽3天入院。查体：体温38.5℃，呼吸20次/分，血压120/80mmHg。
血常规：白细胞12.5×10^9/L，中性粒细胞85%。胸部CT示右肺下叶炎症。
诊断：社区获得性肺炎。给予头孢曲松2.0g qd ivgtt，连用7天。
"""

# 加载模型和分词器
tokenizer = BertTokenizer.from_pretrained('bert-base-chinese')
model = MedicalNERModel(num_labels=9)
id2label = {
    0: 'O',
    1: 'B-SYMPTOM', 2: 'I-SYMPTOM',  # 症状
    3: 'B-DISEASE', 4: 'I-DISEASE',  # 疾病
    5: 'B-DRUG', 6: 'I-DRUG',        # 药物
    7: 'B-TEST', 8: 'I-TEST'         # 检查
}

# 预测实体
entities = predict_medical_entities(text, model, tokenizer, id2label)

# 输出结果
print("识别到的医疗实体：")
for entity, entity_type in entities:
    print(f"{entity}: {entity_type}")`

const META: LessonMeta = {
  subject: '自然语言处理',
  chapterTitle: '命名实体识别',
  chapterNumber: 5,
  totalChapters: 14,
  subjectHref: '/study/ai/nlp',
  prevChapter: { label: '文本分类', href: '/study/ai/nlp/text-classification' },
  nextChapter: { label: '机器翻译', href: '/study/ai/nlp/machine-translation' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '概述',
    left: (
      <div className="space-y-4">
        <PageTitle>命名实体识别概述</PageTitle>
        <BookParagraph>
          命名实体识别(Named Entity Recognition, NER)是自然语言处理中的基础任务之一，其目标是从文本中识别出具有特定意义的实体，如人名、地名、组织机构名等。
        </BookParagraph>

        <div className="flex justify-center">
          <svg width="100%" height="220" viewBox="0 0 900 220" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="arrowhead_ner" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
              </marker>
            </defs>
            <rect x="30" y="70" width="120" height="70" rx="5" fill="#e3f2fd" stroke="#2196f3" />
            <text x="90" y="110" textAnchor="middle" fill="#1565c0">输入文本</text>
            <line x1="150" y1="105" x2="230" y2="105" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead_ner)" />
            <rect x="230" y="70" width="120" height="70" rx="5" fill="#e8f5e9" stroke="#4caf50" />
            <text x="290" y="110" textAnchor="middle" fill="#2e7d32">实体识别</text>
            <line x1="350" y1="105" x2="430" y2="105" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead_ner)" />
            <rect x="430" y="70" width="120" height="70" rx="5" fill="#fff3e0" stroke="#ff9800" />
            <text x="490" y="110" textAnchor="middle" fill="#e65100">实体分类</text>
            <line x1="550" y1="105" x2="630" y2="105" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead_ner)" />
            <rect x="630" y="70" width="120" height="70" rx="5" fill="#f3e5f5" stroke="#9c27b0" />
            <text x="690" y="110" textAnchor="middle" fill="#6a1b9a">标注结果</text>
          </svg>
        </div>

        <SectionTitle>常见实体类型</SectionTitle>
        <BookList items={[
          '人名(PER)',
          '地名(LOC)',
          '组织机构名(ORG)',
          '时间(TIME)',
          '日期(DATE)',
          '货币(MONEY)',
          '百分比(PERCENT)',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>应用场景</SectionTitle>
        <BookList items={[
          '信息抽取',
          '问答系统',
          '机器翻译',
          '知识图谱构建',
          '文本摘要',
        ]} />
      </div>
    ),
  },
  {
    label: '识别方法',
    left: (
      <div className="space-y-4">
        <PageTitle>命名实体识别方法</PageTitle>
        <BookParagraph>
          命名实体识别的方法主要包括基于规则的方法、统计机器学习方法和深度学习方法。每种方法都有其特点和适用场景。
        </BookParagraph>

        <SectionTitle>主要方法</SectionTitle>
        <BookList items={[
          '基于规则的方法',
          '条件随机场(CRF)',
          'BiLSTM-CRF',
          'BERT-CRF',
          '预训练语言模型',
        ]} />

        <SectionTitle>BERT-CRF模型实现</SectionTitle>
        <BookCode language="python" code={bertCrfCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>方法对比</SectionTitle>
        <BookParagraph>
          基于规则的方法准确率高但可移植性差；CRF方法通过特征工程效果好但依赖人工特征；深度学习方法自动学习特征，性能最优但需要大量标注数据。
        </BookParagraph>
      </div>
    ),
  },
  {
    label: '评估指标',
    left: (
      <div className="space-y-4">
        <PageTitle>评估指标</PageTitle>
        <BookParagraph>
          命名实体识别任务的评估主要关注实体级别的准确率、召回率和F1值，同时也需要考虑边界识别和实体分类的准确性。
        </BookParagraph>

        <SectionTitle>评估指标</SectionTitle>
        <BookList items={[
          '实体级别的准确率',
          '实体级别的召回率',
          '实体级别的F1值',
          '边界识别准确率',
          '实体分类准确率',
        ]} />

        <SectionTitle>评估指标实现</SectionTitle>
        <BookCode language="python" code={evalCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>评估维度</SectionTitle>
        <BookParagraph>
          实体级别的评估同时考虑边界和类型，要求实体边界和类型都正确才算正确。此外也需要按实体类型分别评估，了解模型在不同实体上的表现差异。
        </BookParagraph>
      </div>
    ),
  },
  {
    label: '实战案例',
    left: (
      <div className="space-y-4">
        <PageTitle>实战案例</PageTitle>
        <BookParagraph>
          本节将介绍命名实体识别在实际应用中的案例，包括中文新闻实体识别、医疗文本实体识别等。
        </BookParagraph>

        <SectionTitle>中文新闻实体识别案例</SectionTitle>
        <BookCode language="python" code={newsNerCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>医疗文本实体识别案例</SectionTitle>
        <BookCode language="python" code={medicalNerCode} />
      </div>
    ),
  },
]

export default function NlpNerPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@/app/components/ui/book/BookContent'

const selfAttnCode = `import torch
import torch.nn as nn
import torch.nn.functional as F
import math

class SelfAttention(nn.Module):
    def __init__(self, input_dim, num_heads=8):
        super(SelfAttention, self).__init__()
        self.num_heads = num_heads
        self.head_dim = input_dim // num_heads

        # 定义线性变换层
        self.query = nn.Linear(input_dim, input_dim)
        self.key = nn.Linear(input_dim, input_dim)
        self.value = nn.Linear(input_dim, input_dim)

        # 输出投影层
        self.proj = nn.Linear(input_dim, input_dim)

    def forward(self, x):
        batch_size = x.size(0)

        # 线性变换
        q = self.query(x).view(batch_size, -1, self.num_heads, self.head_dim).transpose(1, 2)
        k = self.key(x).view(batch_size, -1, self.num_heads, self.head_dim).transpose(1, 2)
        v = self.value(x).view(batch_size, -1, self.num_heads, self.head_dim).transpose(1, 2)

        # 计算注意力分数
        scores = torch.matmul(q, k.transpose(-2, -1)) / math.sqrt(self.head_dim)
        attn_weights = F.softmax(scores, dim=-1)

        # 应用注意力权重
        context = torch.matmul(attn_weights, v)

        # 重塑输出
        context = context.transpose(1, 2).contiguous().view(batch_size, -1, self.num_heads * self.head_dim)

        # 输出投影
        output = self.proj(context)

        return output, attn_weights

# 使用示例
def main():
    # 设置参数
    batch_size = 32
    seq_length = 10
    input_dim = 512

    # 创建输入数据
    x = torch.randn(batch_size, seq_length, input_dim)

    # 创建自注意力层
    self_attention = SelfAttention(input_dim)

    # 前向传播
    output, attention_weights = self_attention(x)

    print(f"Input shape: {x.shape}")
    print(f"Output shape: {output.shape}")
    print(f"Attention weights shape: {attention_weights.shape}")

if __name__ == '__main__':
    main()`

const multiHeadAttnCode = `import tensorflow as tf
from tensorflow.keras import layers

class MultiHeadAttention(layers.Layer):
    def __init__(self, d_model, num_heads):
        super(MultiHeadAttention, self).__init__()
        self.num_heads = num_heads
        self.d_model = d_model

        assert d_model % self.num_heads == 0

        self.depth = d_model // self.num_heads

        self.wq = layers.Dense(d_model)
        self.wk = layers.Dense(d_model)
        self.wv = layers.Dense(d_model)

        self.dense = layers.Dense(d_model)

    def split_heads(self, x, batch_size):
        x = tf.reshape(x, (batch_size, -1, self.num_heads, self.depth))
        return tf.transpose(x, perm=[0, 2, 1, 3])

    def call(self, v, k, q, mask):
        batch_size = tf.shape(q)[0]

        q = self.wq(q)
        k = self.wk(k)
        v = self.wv(v)

        q = self.split_heads(q, batch_size)
        k = self.split_heads(k, batch_size)
        v = self.split_heads(v, batch_size)

        # 缩放点积注意力
        scaled_attention = self.scaled_dot_product_attention(q, k, v, mask)

        scaled_attention = tf.transpose(scaled_attention, perm=[0, 2, 1, 3])
        concat_attention = tf.reshape(scaled_attention, (batch_size, -1, self.d_model))

        output = self.dense(concat_attention)

        return output

    def scaled_dot_product_attention(self, q, k, v, mask):
        matmul_qk = tf.matmul(q, k, transpose_b=True)

        dk = tf.cast(tf.shape(k)[-1], tf.float32)
        scaled_attention_logits = matmul_qk / tf.math.sqrt(dk)

        if mask is not None:
            scaled_attention_logits += (mask * -1e9)

        attention_weights = tf.nn.softmax(scaled_attention_logits, axis=-1)
        output = tf.matmul(attention_weights, v)

        return output

# 使用示例
def main():
    # 设置参数
    batch_size = 32
    seq_length = 10
    d_model = 512
    num_heads = 8

    # 创建输入数据
    q = tf.random.normal((batch_size, seq_length, d_model))
    k = tf.random.normal((batch_size, seq_length, d_model))
    v = tf.random.normal((batch_size, seq_length, d_model))

    # 创建多头注意力层
    multi_head_attention = MultiHeadAttention(d_model, num_heads)

    # 前向传播
    output = multi_head_attention(v, k, q, mask=None)

    print(f"Input shape: {q.shape}")
    print(f"Output shape: {output.shape}")

if __name__ == '__main__':
    main()`

const textClassAttnCode = `import torch
import torch.nn as nn
import torch.optim as optim
from torchtext.datasets import IMDB
from torchtext.data.utils import get_tokenizer
from torchtext.vocab import build_vocab_from_iterator
from torch.utils.data import DataLoader
import math

class TextClassificationModel(nn.Module):
    def __init__(self, vocab_size, embed_dim, num_heads, num_classes):
        super(TextClassificationModel, self).__init__()

        self.embedding = nn.Embedding(vocab_size, embed_dim)
        self.attention = nn.MultiheadAttention(embed_dim, num_heads)
        self.fc = nn.Linear(embed_dim, num_classes)

    def forward(self, text):
        # 词嵌入
        embedded = self.embedding(text)

        # 自注意力
        attn_output, _ = self.attention(embedded, embedded, embedded)

        # 池化
        pooled = torch.mean(attn_output, dim=1)

        # 分类
        output = self.fc(pooled)
        return output

def yield_tokens(data_iter, tokenizer):
    for text, _ in data_iter:
        yield tokenizer(text)

def main():
    # 设置参数
    batch_size = 64
    embed_dim = 256
    num_heads = 8
    num_classes = 2
    num_epochs = 5

    # 数据预处理
    tokenizer = get_tokenizer('basic_english')
    train_iter = IMDB(split='train')
    vocab = build_vocab_from_iterator(yield_tokens(train_iter, tokenizer), specials=['<unk>'])
    vocab.set_default_index(vocab['<unk>'])

    def text_pipeline(x): return vocab(tokenizer(x))
    def label_pipeline(x): return int(x) - 1

    # 创建数据加载器
    def collate_batch(batch):
        label_list, text_list = [], []
        for (_label, _text) in batch:
            label_list.append(label_pipeline(_label))
            processed_text = torch.tensor(text_pipeline(_text))
            text_list.append(processed_text)
        return torch.tensor(label_list), torch.nn.utils.rnn.pad_sequence(text_list, padding_value=1.0)

    train_iter = IMDB(split='train')
    train_dataloader = DataLoader(train_iter, batch_size=batch_size, shuffle=True, collate_fn=collate_batch)

    # 创建模型
    model = TextClassificationModel(len(vocab), embed_dim, num_heads, num_classes)

    # 定义损失函数和优化器
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters())

    # 训练模型
    for epoch in range(num_epochs):
        model.train()
        total_loss = 0
        for label, text in train_dataloader:
            optimizer.zero_grad()
            output = model(text)
            loss = criterion(output, label)
            loss.backward()
            optimizer.step()
            total_loss += loss.item()

        print(f'Epoch {epoch+1}, Loss: {total_loss/len(train_dataloader):.4f}')

    # 保存模型
    torch.save(model.state_dict(), "text_classification_model.pt")

if __name__ == '__main__':
    main()`

const translationCode = `import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
import numpy as np

class TranslationDataset(Dataset):
    def __init__(self, source_texts, target_texts, source_vocab, target_vocab):
        self.source_texts = source_texts
        self.target_texts = target_texts
        self.source_vocab = source_vocab
        self.target_vocab = target_vocab

    def __len__(self):
        return len(self.source_texts)

    def __getitem__(self, idx):
        source = torch.tensor([self.source_vocab[word] for word in self.source_texts[idx].split()])
        target = torch.tensor([self.target_vocab[word] for word in self.target_texts[idx].split()])
        return source, target

class Encoder(nn.Module):
    def __init__(self, input_dim, embed_dim, hidden_dim, num_heads):
        super(Encoder, self).__init__()
        self.embedding = nn.Embedding(input_dim, embed_dim)
        self.attention = nn.MultiheadAttention(embed_dim, num_heads)
        self.fc = nn.Linear(embed_dim, hidden_dim)

    def forward(self, x):
        embedded = self.embedding(x)
        attn_output, _ = self.attention(embedded, embedded, embedded)
        return self.fc(attn_output)

class Decoder(nn.Module):
    def __init__(self, output_dim, embed_dim, hidden_dim, num_heads):
        super(Decoder, self).__init__()
        self.embedding = nn.Embedding(output_dim, embed_dim)
        self.attention = nn.MultiheadAttention(embed_dim, num_heads)
        self.fc = nn.Linear(embed_dim, output_dim)

    def forward(self, x, encoder_output):
        embedded = self.embedding(x)
        attn_output, _ = self.attention(embedded, encoder_output, encoder_output)
        return self.fc(attn_output)

class TranslationModel(nn.Module):
    def __init__(self, source_vocab_size, target_vocab_size, embed_dim, hidden_dim, num_heads):
        super(TranslationModel, self).__init__()
        self.encoder = Encoder(source_vocab_size, embed_dim, hidden_dim, num_heads)
        self.decoder = Decoder(target_vocab_size, embed_dim, hidden_dim, num_heads)

    def forward(self, source, target):
        encoder_output = self.encoder(source)
        decoder_output = self.decoder(target, encoder_output)
        return decoder_output

def main():
    # 设置参数
    batch_size = 32
    embed_dim = 256
    hidden_dim = 512
    num_heads = 8
    num_epochs = 10

    # 准备数据（示例）
    source_texts = ["hello world", "how are you", "good morning"]
    target_texts = ["你好 世界", "你好吗", "早上好"]

    # 构建词汇表（示例）
    source_vocab = {"<pad>": 0, "<unk>": 1, "hello": 2, "world": 3, "how": 4, "are": 5, "you": 6, "good": 7, "morning": 8}
    target_vocab = {"<pad>": 0, "<unk>": 1, "你好": 2, "世界": 3, "吗": 4, "早上好": 5}

    # 创建数据集和数据加载器
    dataset = TranslationDataset(source_texts, target_texts, source_vocab, target_vocab)
    dataloader = DataLoader(dataset, batch_size=batch_size, shuffle=True)

    # 创建模型
    model = TranslationModel(
        len(source_vocab),
        len(target_vocab),
        embed_dim,
        hidden_dim,
        num_heads
    )

    # 定义损失函数和优化器
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters())

    # 训练模型
    for epoch in range(num_epochs):
        model.train()
        total_loss = 0
        for source, target in dataloader:
            optimizer.zero_grad()
            output = model(source, target)
            loss = criterion(output.view(-1, len(target_vocab)), target.view(-1))
            loss.backward()
            optimizer.step()
            total_loss += loss.item()

        print(f'Epoch {epoch+1}, Loss: {total_loss/len(dataloader):.4f}')

    # 保存模型
    torch.save(model.state_dict(), "translation_model.pt")

if __name__ == '__main__':
    main()`

const META: LessonMeta = {
  subject: '深度学习',
  chapterTitle: '注意力机制',
  chapterNumber: 5,
  totalChapters: 14,
  subjectHref: '/study/ai/dl',
  prevChapter: { label: '循环神经网络', href: '/study/ai/dl/rnn' },
  nextChapter: { label: 'Transformer架构', href: '/study/ai/dl/transformer' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '理论知识',
    left: (
      <div className="space-y-4">
        <PageTitle>注意力机制（Attention Mechanism）概述</PageTitle>

        <SectionTitle>核心思想与优势</SectionTitle>
        <BookParagraph>
          注意力机制是一种让模型能够动态关注输入数据中重要部分的机制。其核心思想是通过选择性关注、权重分配、上下文感知和并行计算，有效提升模型对长序列数据的处理能力。
        </BookParagraph>
        <div className="mb-2">
          <svg width="100%" height="240" viewBox="0 0 800 240">
            {/* 输入序列 */}
            <rect x="50" y="40" width="240" height="50" fill="#e2e8f0" stroke="#64748b" strokeWidth="2"/>
            <text x="170" y="30" textAnchor="middle" fill="#64748b">输入序列</text>
            {/* 注意力权重 */}
            <rect x="50" y="120" width="240" height="50" fill="#93c5fd" stroke="#3b82f6" strokeWidth="2"/>
            <text x="170" y="110" textAnchor="middle" fill="#3b82f6">注意力权重</text>
            {/* 加权求和 */}
            <rect x="400" y="80" width="100" height="50" fill="#86efac" stroke="#22c55e" strokeWidth="2"/>
            <text x="450" y="70" textAnchor="middle" fill="#22c55e">加权求和</text>
            {/* 输出 */}
            <rect x="580" y="80" width="80" height="50" fill="#fde68a" stroke="#d97706" strokeWidth="2"/>
            <text x="620" y="70" textAnchor="middle" fill="#d97706">输出</text>
            {/* 连接箭头 */}
            <path d="M290 65 L400 105" stroke="#64748b" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)"/>
            <path d="M290 145 L400 105" stroke="#64748b" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)"/>
            <path d="M500 105 L580 105" stroke="#64748b" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)"/>
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#64748b"/>
              </marker>
            </defs>
          </svg>
        </div>
        <BookList items={[
          '选择性关注：模型可以动态地关注输入的不同部分',
          '权重分配：为不同的输入部分分配不同的重要性权重',
          '上下文感知：考虑输入序列的上下文信息',
          '并行计算：可以并行处理输入序列',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>注意力机制的类型</SectionTitle>
        <BookList items={[
          '自注意力（Self-Attention）：计算序列内部元素之间的关系，用于捕获长距离依赖',
          '交叉注意力（Cross-Attention）：计算两个不同序列之间的关系，常用于编码器-解码器架构',
          '多头注意力（Multi-Head Attention）：并行计算多个注意力头，捕获不同子空间的信息',
          '缩放点积注意力（Scaled Dot-Product Attention）：使用缩放因子优化梯度，计算效率高',
        ]} />

        <SectionTitle>应用场景</SectionTitle>
        <BookList items={[
          '机器翻译',
          '文本摘要',
          '问答系统',
          '图像描述生成',
          '语音识别',
          '推荐系统',
        ]} />
      </div>
    ),
  },
  {
    label: '代码实践',
    left: (
      <div className="space-y-4">
        <PageTitle>注意力机制实现</PageTitle>

        <SectionTitle>1. 使用PyTorch实现自注意力机制</SectionTitle>
        <BookCode language="python" code={selfAttnCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>2. 使用TensorFlow实现多头注意力机制</SectionTitle>
        <BookCode language="python" code={multiHeadAttnCode} />
      </div>
    ),
  },
  {
    label: '例题练习',
    left: (
      <div className="space-y-4">
        <PageTitle>实战练习</PageTitle>

        <SectionTitle>题目一：文本分类</SectionTitle>
        <BookParagraph><b>要求：</b>使用注意力机制实现文本分类任务，对IMDB电影评论数据集进行分类。</BookParagraph>
        <BookParagraph><b>参考答案：</b></BookParagraph>
        <BookCode language="python" code={textClassAttnCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>题目二：机器翻译</SectionTitle>
        <BookParagraph><b>要求：</b>使用注意力机制实现简单的机器翻译模型，将英文翻译成中文。</BookParagraph>
        <BookParagraph><b>参考答案：</b></BookParagraph>
        <BookCode language="python" code={translationCode} />
      </div>
    ),
  },
]

export default function DlAttentionPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

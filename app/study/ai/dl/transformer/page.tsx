'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaRobot, FaBrain, FaChartLine, FaCode, FaLightbulb, FaNetworkWired, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { SiTensorflow, SiPytorch, SiKeras } from 'react-icons/si';

export default function TransformerPage() {
  const [activeTab, setActiveTab] = useState('theory');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Transformer架构</h1>
      
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
            <h2 className="text-2xl font-semibold mb-4">Transformer架构概述</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">基本结构</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 mb-4">
                    Transformer是一种基于自注意力机制的神经网络架构：
                  </p>
                  <div className="mb-4">
                    <svg width="100%" height="400" viewBox="0 0 800 400">
                      {/* 编码器-解码器结构 */}
                      <rect x="50" y="50" width="300" height="300" fill="#e2e8f0" stroke="#64748b" strokeWidth="2"/>
                      <text x="200" y="40" textAnchor="middle" fill="#64748b">编码器</text>
                      
                      <rect x="450" y="50" width="300" height="300" fill="#e2e8f0" stroke="#64748b" strokeWidth="2"/>
                      <text x="600" y="40" textAnchor="middle" fill="#64748b">解码器</text>
                      
                      {/* 编码器组件 */}
                      <rect x="100" y="100" width="200" height="50" fill="#93c5fd" stroke="#3b82f6" strokeWidth="2"/>
                      <text x="200" y="130" textAnchor="middle" fill="#3b82f6">多头自注意力</text>
                      
                      <rect x="100" y="170" width="200" height="50" fill="#93c5fd" stroke="#3b82f6" strokeWidth="2"/>
                      <text x="200" y="200" textAnchor="middle" fill="#3b82f6">前馈神经网络</text>
                      
                      <rect x="100" y="240" width="200" height="50" fill="#93c5fd" stroke="#3b82f6" strokeWidth="2"/>
                      <text x="200" y="270" textAnchor="middle" fill="#3b82f6">层归一化</text>
                      
                      {/* 解码器组件 */}
                      <rect x="500" y="100" width="200" height="50" fill="#86efac" stroke="#22c55e" strokeWidth="2"/>
                      <text x="600" y="130" textAnchor="middle" fill="#22c55e">掩码多头自注意力</text>
                      
                      <rect x="500" y="170" width="200" height="50" fill="#86efac" stroke="#22c55e" strokeWidth="2"/>
                      <text x="600" y="200" textAnchor="middle" fill="#22c55e">编码器-解码器注意力</text>
                      
                      <rect x="500" y="240" width="200" height="50" fill="#86efac" stroke="#22c55e" strokeWidth="2"/>
                      <text x="600" y="270" textAnchor="middle" fill="#22c55e">前馈神经网络</text>
                      
                      {/* 连接箭头 */}
                      <path d="M350 200 L450 200" stroke="#64748b" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)"/>
                      
                      {/* 箭头标记定义 */}
                      <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                          <polygon points="0 0, 10 3.5, 0 7" fill="#64748b"/>
                        </marker>
                      </defs>
                    </svg>
                  </div>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>编码器-解码器架构
                      <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                        <li>编码器：处理输入序列</li>
                        <li>解码器：生成输出序列</li>
                        <li>并行计算：提高训练效率</li>
                      </ul>
                    </li>
                    <li>自注意力机制
                      <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                        <li>计算序列内部关系</li>
                        <li>捕捉长距离依赖</li>
                        <li>并行处理能力</li>
                      </ul>
                    </li>
                    <li>位置编码
                      <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                        <li>添加位置信息</li>
                        <li>正弦位置编码</li>
                        <li>可学习的位置编码</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">关键组件详解</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 mb-4">
                    Transformer的核心组件及其功能：
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>多头自注意力
                      <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                        <li>并行计算多个注意力头</li>
                        <li>不同子空间的信息提取</li>
                        <li>增强模型的表达能力</li>
                      </ul>
                    </li>
                    <li>前馈神经网络
                      <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                        <li>两层全连接网络</li>
                        <li>ReLU激活函数</li>
                        <li>特征转换和增强</li>
                      </ul>
                    </li>
                    <li>残差连接和层归一化
                      <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                        <li>缓解梯度消失问题</li>
                        <li>稳定训练过程</li>
                        <li>加速模型收敛</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">变体与改进</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 mb-4">
                    Transformer架构的主要变体和改进：
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>BERT
                      <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                        <li>双向编码器表示</li>
                        <li>掩码语言模型预训练</li>
                        <li>下游任务微调</li>
                      </ul>
                    </li>
                    <li>GPT
                      <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                        <li>单向自回归模型</li>
                        <li>大规模预训练</li>
                        <li>生成式任务</li>
                      </ul>
                    </li>
                    <li>T5
                      <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                        <li>文本到文本转换</li>
                        <li>统一任务框架</li>
                        <li>多任务学习</li>
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
            <h2 className="text-2xl font-semibold mb-4">Transformer实现</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">1. 使用PyTorch实现Transformer</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm text-gray-800">
{`import torch
import torch.nn as nn
import math

class PositionalEncoding(nn.Module):
    """
    位置编码层：为输入序列添加位置信息
    使用正弦和余弦函数生成位置编码，帮助模型理解序列中token的相对位置
    """
    def __init__(self, d_model, max_len=5000):
        super(PositionalEncoding, self).__init__()
        # 创建位置编码矩阵
        pe = torch.zeros(max_len, d_model)
        position = torch.arange(0, max_len, dtype=torch.float).unsqueeze(1)
        div_term = torch.exp(torch.arange(0, d_model, 2).float() * (-math.log(10000.0) / d_model))
        
        # 使用正弦和余弦函数生成位置编码
        pe[:, 0::2] = torch.sin(position * div_term)
        pe[:, 1::2] = torch.cos(position * div_term)
        pe = pe.unsqueeze(0)
        self.register_buffer('pe', pe)

    def forward(self, x):
        # 将位置编码添加到输入中
        return x + self.pe[:, :x.size(1)]

class MultiHeadAttention(nn.Module):
    """
    多头注意力机制：将输入分成多个头，每个头独立计算注意力
    最后将所有头的结果合并，增强模型的表达能力
    """
    def __init__(self, d_model, num_heads):
        super(MultiHeadAttention, self).__init__()
        self.num_heads = num_heads
        self.d_model = d_model
        assert d_model % num_heads == 0  # 确保维度能被头数整除
        
        self.depth = d_model // num_heads
        # 定义查询、键、值的线性变换层
        self.wq = nn.Linear(d_model, d_model)
        self.wk = nn.Linear(d_model, d_model)
        self.wv = nn.Linear(d_model, d_model)
        self.dense = nn.Linear(d_model, d_model)
        
    def scaled_dot_product_attention(self, q, k, v, mask):
        """
        计算缩放点积注意力
        q: 查询矩阵
        k: 键矩阵
        v: 值矩阵
        mask: 掩码矩阵，用于防止关注到填充位置
        """
        # 计算注意力分数
        matmul_qk = torch.matmul(q, k.transpose(-2, -1))
        dk = torch.tensor(k.size(-1), dtype=torch.float32)
        scaled_attention_logits = matmul_qk / torch.sqrt(dk)
        
        # 应用掩码
        if mask is not None:
            scaled_attention_logits += (mask * -1e9)
        
        # 计算注意力权重
        attention_weights = torch.softmax(scaled_attention_logits, dim=-1)
        output = torch.matmul(attention_weights, v)
        return output, attention_weights
    
    def split_heads(self, x, batch_size):
        """
        将输入张量分割成多个头
        """
        x = x.view(batch_size, -1, self.num_heads, self.depth)
        return x.permute(0, 2, 1, 3)
    
    def forward(self, v, k, q, mask):
        batch_size = q.size(0)
        
        # 线性变换
        q = self.wq(q)
        k = self.wk(k)
        v = self.wv(v)
        
        # 分割成多个头
        q = self.split_heads(q, batch_size)
        k = self.split_heads(k, batch_size)
        v = self.split_heads(v, batch_size)
        
        # 计算注意力
        scaled_attention, attention_weights = self.scaled_dot_product_attention(q, k, v, mask)
        
        # 合并多头的结果
        scaled_attention = scaled_attention.permute(0, 2, 1, 3)
        concat_attention = scaled_attention.reshape(batch_size, -1, self.d_model)
        
        # 最后的线性变换
        output = self.dense(concat_attention)
        return output, attention_weights

class EncoderLayer(nn.Module):
    """
    编码器层：包含多头自注意力和前馈神经网络
    每个编码器层都包含残差连接和层归一化
    """
    def __init__(self, d_model, num_heads, dff, rate=0.1):
        super(EncoderLayer, self).__init__()
        
        self.mha = MultiHeadAttention(d_model, num_heads)
        # 前馈神经网络
        self.ffn = nn.Sequential(
            nn.Linear(d_model, dff),
            nn.ReLU(),
            nn.Linear(dff, d_model)
        )
        
        # 层归一化
        self.layernorm1 = nn.LayerNorm(d_model, eps=1e-6)
        self.layernorm2 = nn.LayerNorm(d_model, eps=1e-6)
        
        # Dropout层
        self.dropout1 = nn.Dropout(rate)
        self.dropout2 = nn.Dropout(rate)
    
    def forward(self, x, training, mask):
        # 多头自注意力
        attn_output, _ = self.mha(x, x, x, mask)
        attn_output = self.dropout1(attn_output)
        out1 = self.layernorm1(x + attn_output)  # 残差连接和层归一化
        
        # 前馈神经网络
        ffn_output = self.ffn(out1)
        ffn_output = self.dropout2(ffn_output)
        return self.layernorm2(out1 + ffn_output)  # 残差连接和层归一化

class DecoderLayer(nn.Module):
    """
    解码器层：包含掩码多头自注意力、编码器-解码器注意力和前馈神经网络
    每个解码器层都包含残差连接和层归一化
    """
    def __init__(self, d_model, num_heads, dff, rate=0.1):
        super(DecoderLayer, self).__init__()
        
        # 两个多头注意力层
        self.mha1 = MultiHeadAttention(d_model, num_heads)  # 掩码多头自注意力
        self.mha2 = MultiHeadAttention(d_model, num_heads)  # 编码器-解码器注意力
        
        # 前馈神经网络
        self.ffn = nn.Sequential(
            nn.Linear(d_model, dff),
            nn.ReLU(),
            nn.Linear(dff, d_model)
        )
        
        # 层归一化
        self.layernorm1 = nn.LayerNorm(d_model, eps=1e-6)
        self.layernorm2 = nn.LayerNorm(d_model, eps=1e-6)
        self.layernorm3 = nn.LayerNorm(d_model, eps=1e-6)
        
        # Dropout层
        self.dropout1 = nn.Dropout(rate)
        self.dropout2 = nn.Dropout(rate)
        self.dropout3 = nn.Dropout(rate)
    
    def forward(self, x, enc_output, training, look_ahead_mask, padding_mask):
        # 掩码多头自注意力
        attn1, attn_weights_block1 = self.mha1(x, x, x, look_ahead_mask)
        attn1 = self.dropout1(attn1)
        out1 = self.layernorm1(attn1 + x)
        
        # 编码器-解码器注意力
        attn2, attn_weights_block2 = self.mha2(enc_output, enc_output, out1, padding_mask)
        attn2 = self.dropout2(attn2)
        out2 = self.layernorm2(attn2 + out1)
        
        # 前馈神经网络
        ffn_output = self.ffn(out2)
        ffn_output = self.dropout3(ffn_output)
        return self.layernorm3(ffn_output + out2), attn_weights_block1, attn_weights_block2

class Transformer(nn.Module):
    """
    Transformer模型：完整的编码器-解码器架构
    包含多个编码器层和解码器层，以及位置编码和最终的线性层
    """
    def __init__(self, num_layers, d_model, num_heads, dff, input_vocab_size, target_vocab_size, pe_input, pe_target, rate=0.1):
        super(Transformer, self).__init__()
        
        # 创建多层编码器和解码器
        self.encoder = nn.ModuleList([EncoderLayer(d_model, num_heads, dff, rate) for _ in range(num_layers)])
        self.decoder = nn.ModuleList([DecoderLayer(d_model, num_heads, dff, rate) for _ in range(num_layers)])
        
        # 输入嵌入和位置编码
        self.embedding = nn.Embedding(input_vocab_size, d_model)
        self.pos_encoding = PositionalEncoding(d_model, pe_input)
        
        # 目标嵌入和位置编码
        self.dec_embedding = nn.Embedding(target_vocab_size, d_model)
        self.dec_pos_encoding = PositionalEncoding(d_model, pe_target)
        
        # 最终的线性层
        self.final_layer = nn.Linear(d_model, target_vocab_size)
    
    def create_padding_mask(self, seq):
        """
        创建填充掩码：将填充位置标记为1，其他位置为0
        """
        seq = torch.eq(seq, 0).float()
        return seq.unsqueeze(1).unsqueeze(2)
    
    def create_look_ahead_mask(self, size):
        """
        创建前瞻掩码：防止解码器看到未来的信息
        """
        mask = torch.triu(torch.ones(size, size), diagonal=1)
        return mask
    
    def forward(self, inp, tar, training, enc_padding_mask, look_ahead_mask, dec_padding_mask):
        # 编码器部分
        enc_output = self.embedding(inp)
        enc_output = self.pos_encoding(enc_output)
        
        for i in range(len(self.encoder)):
            enc_output = self.encoder[i](enc_output, training, enc_padding_mask)
        
        # 解码器部分
        dec_output = self.dec_embedding(tar)
        dec_output = self.dec_pos_encoding(dec_output)
        
        for i in range(len(self.decoder)):
            dec_output, block1, block2 = self.decoder[i](
                dec_output, enc_output, training, look_ahead_mask, dec_padding_mask
            )
        
        # 最终输出
        final_output = self.final_layer(dec_output)
        return final_output`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">2. 使用TensorFlow实现Transformer</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm text-gray-800">
{`import tensorflow as tf
from tensorflow.keras import layers, Model
import numpy as np

class PositionalEncoding(layers.Layer):
    """
    位置编码层：为输入序列添加位置信息
    使用正弦和余弦函数生成位置编码，帮助模型理解序列中token的相对位置
    """
    def __init__(self, position, d_model):
        super(PositionalEncoding, self).__init__()
        self.pos_encoding = self.positional_encoding(position, d_model)
    
    def get_angles(self, position, i, d_model):
        """
        计算位置编码的角度
        """
        angles = 1 / tf.pow(10000, (2 * (i // 2)) / tf.cast(d_model, tf.float32))
        return position * angles
    
    def positional_encoding(self, position, d_model):
        """
        生成位置编码矩阵
        """
        angle_rads = self.get_angles(
            position=tf.range(position, dtype=tf.float32)[:, tf.newaxis],
            i=tf.range(d_model, dtype=tf.float32)[tf.newaxis, :],
            d_model=d_model
        )
        
        # 使用正弦和余弦函数生成位置编码
        sines = tf.math.sin(angle_rads[:, 0::2])
        cosines = tf.math.cos(angle_rads[:, 1::2])
        
        pos_encoding = tf.concat([sines, cosines], axis=-1)
        pos_encoding = pos_encoding[tf.newaxis, ...]
        return tf.cast(pos_encoding, tf.float32)
    
    def call(self, inputs):
        # 将位置编码添加到输入中
        return inputs + self.pos_encoding[:, :tf.shape(inputs)[1], :]

class MultiHeadAttention(layers.Layer):
    """
    多头注意力机制：将输入分成多个头，每个头独立计算注意力
    最后将所有头的结果合并，增强模型的表达能力
    """
    def __init__(self, d_model, num_heads):
        super(MultiHeadAttention, self).__init__()
        self.num_heads = num_heads
        self.d_model = d_model
        
        assert d_model % self.num_heads == 0  # 确保维度能被头数整除
        
        self.depth = d_model // self.num_heads
        
        # 定义查询、键、值的线性变换层
        self.wq = layers.Dense(d_model)
        self.wk = layers.Dense(d_model)
        self.wv = layers.Dense(d_model)
        
        self.dense = layers.Dense(d_model)
    
    def split_heads(self, x, batch_size):
        """
        将输入张量分割成多个头
        """
        x = tf.reshape(x, (batch_size, -1, self.num_heads, self.depth))
        return tf.transpose(x, perm=[0, 2, 1, 3])
    
    def call(self, v, k, q, mask):
        batch_size = tf.shape(q)[0]
        
        # 线性变换
        q = self.wq(q)
        k = self.wk(k)
        v = self.wv(v)
        
        # 分割成多个头
        q = self.split_heads(q, batch_size)
        k = self.split_heads(k, batch_size)
        v = self.split_heads(v, batch_size)
        
        # 计算注意力
        scaled_attention = self.scaled_dot_product_attention(q, k, v, mask)
        
        # 合并多头的结果
        scaled_attention = tf.transpose(scaled_attention, perm=[0, 2, 1, 3])
        concat_attention = tf.reshape(scaled_attention, (batch_size, -1, self.d_model))
        
        # 最后的线性变换
        output = self.dense(concat_attention)
        return output
    
    def scaled_dot_product_attention(self, q, k, v, mask):
        """
        计算缩放点积注意力
        q: 查询矩阵
        k: 键矩阵
        v: 值矩阵
        mask: 掩码矩阵，用于防止关注到填充位置
        """
        # 计算注意力分数
        matmul_qk = tf.matmul(q, k, transpose_b=True)
        
        dk = tf.cast(tf.shape(k)[-1], tf.float32)
        scaled_attention_logits = matmul_qk / tf.math.sqrt(dk)
        
        # 应用掩码
        if mask is not None:
            scaled_attention_logits += (mask * -1e9)
        
        # 计算注意力权重
        attention_weights = tf.nn.softmax(scaled_attention_logits, axis=-1)
        output = tf.matmul(attention_weights, v)
        return output

class EncoderLayer(layers.Layer):
    """
    编码器层：包含多头自注意力和前馈神经网络
    每个编码器层都包含残差连接和层归一化
    """
    def __init__(self, d_model, num_heads, dff, rate=0.1):
        super(EncoderLayer, self).__init__()
        
        self.mha = MultiHeadAttention(d_model, num_heads)
        # 前馈神经网络
        self.ffn = tf.keras.Sequential([
            layers.Dense(dff, activation='relu'),
            layers.Dense(d_model)
        ])
        
        # 层归一化
        self.layernorm1 = layers.LayerNormalization(epsilon=1e-6)
        self.layernorm2 = layers.LayerNormalization(epsilon=1e-6)
        
        # Dropout层
        self.dropout1 = layers.Dropout(rate)
        self.dropout2 = layers.Dropout(rate)
    
    def call(self, x, training, mask):
        # 多头自注意力
        attn_output = self.mha(x, x, x, mask)
        attn_output = self.dropout1(attn_output, training=training)
        out1 = self.layernorm1(x + attn_output)  # 残差连接和层归一化
        
        # 前馈神经网络
        ffn_output = self.ffn(out1)
        ffn_output = self.dropout2(ffn_output, training=training)
        return self.layernorm2(out1 + ffn_output)  # 残差连接和层归一化

class DecoderLayer(layers.Layer):
    """
    解码器层：包含掩码多头自注意力、编码器-解码器注意力和前馈神经网络
    每个解码器层都包含残差连接和层归一化
    """
    def __init__(self, d_model, num_heads, dff, rate=0.1):
        super(DecoderLayer, self).__init__()
        
        # 两个多头注意力层
        self.mha1 = MultiHeadAttention(d_model, num_heads)  # 掩码多头自注意力
        self.mha2 = MultiHeadAttention(d_model, num_heads)  # 编码器-解码器注意力
        
        # 前馈神经网络
        self.ffn = tf.keras.Sequential([
            layers.Dense(dff, activation='relu'),
            layers.Dense(d_model)
        ])
        
        # 层归一化
        self.layernorm1 = layers.LayerNormalization(epsilon=1e-6)
        self.layernorm2 = layers.LayerNormalization(epsilon=1e-6)
        self.layernorm3 = layers.LayerNormalization(epsilon=1e-6)
        
        # Dropout层
        self.dropout1 = layers.Dropout(rate)
        self.dropout2 = layers.Dropout(rate)
        self.dropout3 = layers.Dropout(rate)
    
    def call(self, x, enc_output, training, look_ahead_mask, padding_mask):
        # 掩码多头自注意力
        attn1 = self.mha1(x, x, x, look_ahead_mask)
        attn1 = self.dropout1(attn1, training=training)
        out1 = self.layernorm1(attn1 + x)
        
        # 编码器-解码器注意力
        attn2 = self.mha2(enc_output, enc_output, out1, padding_mask)
        attn2 = self.dropout2(attn2, training=training)
        out2 = self.layernorm2(attn2 + out1)
        
        # 前馈神经网络
        ffn_output = self.ffn(out2)
        ffn_output = self.dropout3(ffn_output, training=training)
        return self.layernorm3(ffn_output + out2)

class Transformer(Model):
    """
    Transformer模型：完整的编码器-解码器架构
    包含多个编码器层和解码器层，以及位置编码和最终的线性层
    """
    def __init__(self, num_layers, d_model, num_heads, dff, input_vocab_size, target_vocab_size, pe_input, pe_target, rate=0.1):
        super(Transformer, self).__init__()
        
        # 创建多层编码器和解码器
        self.encoder = [EncoderLayer(d_model, num_heads, dff, rate) for _ in range(num_layers)]
        self.decoder = [DecoderLayer(d_model, num_heads, dff, rate) for _ in range(num_layers)]
        
        # 输入嵌入和位置编码
        self.embedding = layers.Embedding(input_vocab_size, d_model)
        self.pos_encoding = PositionalEncoding(pe_input, d_model)
        
        # 目标嵌入和位置编码
        self.dec_embedding = layers.Embedding(target_vocab_size, d_model)
        self.dec_pos_encoding = PositionalEncoding(pe_target, d_model)
        
        # 最终的线性层
        self.final_layer = layers.Dense(target_vocab_size)
    
    def create_padding_mask(self, seq):
        """
        创建填充掩码：将填充位置标记为1，其他位置为0
        """
        seq = tf.cast(tf.math.equal(seq, 0), tf.float32)
        return seq[:, tf.newaxis, tf.newaxis, :]
    
    def create_look_ahead_mask(self, size):
        """
        创建前瞻掩码：防止解码器看到未来的信息
        """
        mask = 1 - tf.linalg.band_part(tf.ones((size, size)), -1, 0)
        return mask
    
    def call(self, inp, tar, training, enc_padding_mask, look_ahead_mask, dec_padding_mask):
        # 编码器部分
        enc_output = self.embedding(inp)
        enc_output = self.pos_encoding(enc_output)
        
        for i in range(len(self.encoder)):
            enc_output = self.encoder[i](enc_output, training, enc_padding_mask)
        
        # 解码器部分
        dec_output = self.dec_embedding(tar)
        dec_output = self.dec_pos_encoding(dec_output)
        
        for i in range(len(self.decoder)):
            dec_output = self.decoder[i](
                dec_output, enc_output, training, look_ahead_mask, dec_padding_mask
            )
        
        # 最终输出
        final_output = self.final_layer(dec_output)
        return final_output`}
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
                <h3 className="text-xl font-semibold mb-2">题目一：机器翻译</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">要求：</h4>
                  <p className="text-gray-700 mb-4">
                    使用Transformer实现一个英汉翻译模型。
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

class TranslationDataset(Dataset):
    """
    机器翻译数据集类
    用于加载和处理英汉翻译数据
    """
    def __init__(self, source_texts, target_texts, source_vocab, target_vocab):
        self.source_texts = source_texts  # 源语言文本（英文）
        self.target_texts = target_texts  # 目标语言文本（中文）
        self.source_vocab = source_vocab  # 源语言词表
        self.target_vocab = target_vocab  # 目标语言词表
    
    def __len__(self):
        return len(self.source_texts)
    
    def __getitem__(self, idx):
        source = self.source_texts[idx]
        target = self.target_texts[idx]
        return source, target

def create_masks(inp, tar):
    """
    创建注意力掩码
    inp: 输入序列
    tar: 目标序列
    返回：编码器掩码、组合掩码和解码器掩码
    """
    # 编码器填充掩码：防止模型关注到填充位置
    enc_padding_mask = create_padding_mask(inp)
    
    # 解码器填充掩码：防止模型关注到填充位置
    dec_padding_mask = create_padding_mask(inp)
    
    # 前瞻掩码：防止解码器看到未来的信息
    look_ahead_mask = create_look_ahead_mask(tar.shape[1])
    dec_target_padding_mask = create_padding_mask(tar)
    combined_mask = torch.maximum(dec_target_padding_mask, look_ahead_mask)
    
    return enc_padding_mask, combined_mask, dec_padding_mask

def train_step(model, inp, tar, optimizer, criterion):
    """
    训练步骤
    model: Transformer模型
    inp: 输入序列
    tar: 目标序列
    optimizer: 优化器
    criterion: 损失函数
    返回：当前步骤的损失值
    """
    # 准备输入和目标序列
    tar_inp = tar[:, :-1]  # 去掉最后一个token
    tar_real = tar[:, 1:]  # 去掉第一个token
    
    # 创建掩码
    enc_padding_mask, combined_mask, dec_padding_mask = create_masks(inp, tar_inp)
    
    # 前向传播
    optimizer.zero_grad()
    predictions = model(inp, tar_inp, True, enc_padding_mask, combined_mask, dec_padding_mask)
    
    # 计算损失
    loss = criterion(predictions.reshape(-1, predictions.shape[-1]), tar_real.reshape(-1))
    
    # 反向传播和优化
    loss.backward()
    optimizer.step()
    
    return loss.item()

def main():
    """
    主函数：训练机器翻译模型
    """
    # 设置模型参数
    num_layers = 6      # Transformer层数
    d_model = 512      # 模型维度
    num_heads = 8      # 注意力头数
    dff = 2048         # 前馈网络维度
    input_vocab_size = 10000   # 输入词表大小
    target_vocab_size = 10000  # 输出词表大小
    pe_input = 10000   # 输入位置编码长度
    pe_target = 10000  # 输出位置编码长度
    
    # 创建模型
    model = Transformer(
        num_layers, d_model, num_heads, dff,
        input_vocab_size, target_vocab_size,
        pe_input, pe_target
    )
    
    # 定义优化器和损失函数
    optimizer = optim.Adam(model.parameters(), lr=0.0001)
    criterion = nn.CrossEntropyLoss()
    
    # 训练循环
    EPOCHS = 20
    for epoch in range(EPOCHS):
        start = time.time()
        total_loss = 0
        
        # 遍历训练数据
        for batch_idx, (inp, tar) in enumerate(train_loader):
            loss = train_step(model, inp, tar, optimizer, criterion)
            total_loss += loss
            
            # 每100个批次打印一次损失
            if batch_idx % 100 == 0:
                print(f'Epoch {epoch+1} Batch {batch_idx} Loss {loss:.4f}')
        
        # 计算并打印每个epoch的平均损失
        avg_loss = total_loss / len(train_loader)
        print(f'Epoch {epoch+1} Average Loss {avg_loss:.4f}')
        print(f'Time taken for 1 epoch: {time.time() - start:.2f} sec\\n')
    
    # 保存训练好的模型
    torch.save(model.state_dict(), 'translation_model.pth')

if __name__ == '__main__':
    main()`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">题目二：文本摘要生成</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">要求：</h4>
                  <p className="text-gray-700 mb-4">
                    使用Transformer实现一个文本摘要生成模型。
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

class SummarizationDataset(Dataset):
    """
    文本摘要数据集类
    用于加载和处理文章和摘要数据
    """
    def __init__(self, articles, summaries, vocab):
        self.articles = articles    # 原始文章
        self.summaries = summaries  # 对应的摘要
        self.vocab = vocab         # 词表
    
    def __len__(self):
        return len(self.articles)
    
    def __getitem__(self, idx):
        article = self.articles[idx]
        summary = self.summaries[idx]
        return article, summary

def create_masks(inp, tar):
    """
    创建注意力掩码
    inp: 输入文章
    tar: 目标摘要
    返回：编码器掩码、组合掩码和解码器掩码
    """
    # 编码器填充掩码
    enc_padding_mask = create_padding_mask(inp)
    
    # 解码器填充掩码
    dec_padding_mask = create_padding_mask(inp)
    
    # 前瞻掩码
    look_ahead_mask = create_look_ahead_mask(tar.shape[1])
    dec_target_padding_mask = create_padding_mask(tar)
    combined_mask = torch.maximum(dec_target_padding_mask, look_ahead_mask)
    
    return enc_padding_mask, combined_mask, dec_padding_mask

def train_step(model, inp, tar, optimizer, criterion):
    """
    训练步骤
    model: Transformer模型
    inp: 输入文章
    tar: 目标摘要
    optimizer: 优化器
    criterion: 损失函数
    返回：当前步骤的损失值
    """
    # 准备输入和目标序列
    tar_inp = tar[:, :-1]
    tar_real = tar[:, 1:]
    
    # 创建掩码
    enc_padding_mask, combined_mask, dec_padding_mask = create_masks(inp, tar_inp)
    
    # 前向传播
    optimizer.zero_grad()
    predictions = model(inp, tar_inp, True, enc_padding_mask, combined_mask, dec_padding_mask)
    
    # 计算损失
    loss = criterion(predictions.reshape(-1, predictions.shape[-1]), tar_real.reshape(-1))
    
    # 反向传播和优化
    loss.backward()
    optimizer.step()
    
    return loss.item()

def evaluate(model, article, tokenizer, max_length=100):
    """
    使用模型生成摘要
    model: 训练好的Transformer模型
    article: 输入文章
    tokenizer: 分词器
    max_length: 最大生成长度
    返回：生成的摘要
    """
    model.eval()  # 设置为评估模式
    with torch.no_grad():
        # 对输入文章进行编码
        input_ids = tokenizer.encode(article, return_tensors='pt')
        
        # 初始化输出序列（以[CLS]开始）
        output_ids = torch.tensor([[tokenizer.cls_token_id]])
        
        # 自回归生成摘要
        for _ in range(max_length):
            # 创建掩码
            enc_padding_mask, combined_mask, dec_padding_mask = create_masks(input_ids, output_ids)
            
            # 生成下一个token
            predictions = model(input_ids, output_ids, False, enc_padding_mask, combined_mask, dec_padding_mask)
            next_token = predictions[:, -1, :].argmax(dim=-1, keepdim=True)
            
            # 将预测的token添加到输出序列
            output_ids = torch.cat([output_ids, next_token], dim=-1)
            
            # 如果生成了[SEP]标记，则停止生成
            if next_token.item() == tokenizer.sep_token_id:
                break
        
        # 将生成的token序列解码为文本
        summary = tokenizer.decode(output_ids[0], skip_special_tokens=True)
        return summary

def main():
    """
    主函数：训练文本摘要生成模型
    """
    # 设置模型参数
    num_layers = 6      # Transformer层数
    d_model = 512      # 模型维度
    num_heads = 8      # 注意力头数
    dff = 2048         # 前馈网络维度
    vocab_size = 50000 # 词表大小
    pe_input = 10000   # 输入位置编码长度
    pe_target = 10000  # 输出位置编码长度
    
    # 创建模型
    model = Transformer(
        num_layers, d_model, num_heads, dff,
        vocab_size, vocab_size,
        pe_input, pe_target
    )
    
    # 定义优化器和损失函数
    optimizer = optim.Adam(model.parameters(), lr=0.0001)
    criterion = nn.CrossEntropyLoss()
    
    # 训练循环
    EPOCHS = 20
    for epoch in range(EPOCHS):
        start = time.time()
        total_loss = 0
        
        # 遍历训练数据
        for batch_idx, (inp, tar) in enumerate(train_loader):
            loss = train_step(model, inp, tar, optimizer, criterion)
            total_loss += loss
            
            # 每100个批次打印一次损失
            if batch_idx % 100 == 0:
                print(f'Epoch {epoch+1} Batch {batch_idx} Loss {loss:.4f}')
        
        # 计算并打印每个epoch的平均损失
        avg_loss = total_loss / len(train_loader)
        print(f'Epoch {epoch+1} Average Loss {avg_loss:.4f}')
        print(f'Time taken for 1 epoch: {time.time() - start:.2f} sec\\n')
    
    # 保存训练好的模型
    torch.save(model.state_dict(), 'summarization_model.pth')

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
          href="/study/ai/dl/attention"
          className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 flex items-center"
        >
          <FaArrowLeft className="mr-2" />
          上一课：注意力机制
        </Link>
        <Link 
          href="/study/ai/dl/gan"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center"
        >
          下一课：生成对抗网络
          <FaArrowRight className="ml-2" />
        </Link>
      </div>
    </div>
  );
} 
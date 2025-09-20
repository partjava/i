'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function NLPInterviewPage() {
  const [activeTab, setActiveTab] = useState('basic');
  const [expandedAnswer, setExpandedAnswer] = useState<string | null>(null);

  const tabs = [
    { id: 'basic', label: '基础知识' },
    { id: 'model', label: '模型算法' },
    { id: 'practice', label: '实践应用' },
    { id: 'advanced', label: '进阶问题' }
  ];

  const toggleAnswer = (answerId: string) => {
    setExpandedAnswer(expandedAnswer === answerId ? null : answerId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">NLP面试题</h1>
      
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
        {activeTab === 'basic' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">1. 什么是词向量？常见的词向量模型有哪些？</h3>
              <button
                onClick={() => toggleAnswer('word-vector')}
                className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-left font-medium flex justify-between items-center"
              >
                <span>查看答案</span>
                <span>{expandedAnswer === 'word-vector' ? '▼' : '▶'}</span>
              </button>
              {expandedAnswer === 'word-vector' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="mb-2">词向量是将词语映射到低维稠密向量空间的技术，能够捕捉词语之间的语义关系。</p>
                  <p className="mb-2">常见的词向量模型包括：</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Word2Vec：包括CBOW和Skip-gram两种模型</li>
                    <li>GloVe：基于全局词频统计的词向量模型</li>
                    <li>FastText：考虑词内部结构的词向量模型</li>
                    <li>ELMo：基于上下文的动态词向量模型</li>
                    <li>BERT：预训练语言模型生成的上下文相关词向量</li>
                  </ul>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">2. 什么是TF-IDF？它的优缺点是什么？</h3>
              <button
                onClick={() => toggleAnswer('tfidf')}
                className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-left font-medium flex justify-between items-center"
              >
                <span>查看答案</span>
                <span>{expandedAnswer === 'tfidf' ? '▼' : '▶'}</span>
              </button>
              {expandedAnswer === 'tfidf' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="mb-2">TF-IDF（词频-逆文档频率）是一种用于评估词语重要性的统计方法。</p>
                  <p className="mb-2">优点：</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>计算简单，易于实现</li>
                    <li>考虑了词频和文档频率</li>
                    <li>能够突出重要词语</li>
                  </ul>
                  <p className="mb-2 mt-4">缺点：</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>没有考虑词语的位置信息</li>
                    <li>没有考虑词语的语义信息</li>
                    <li>无法处理同义词和多义词</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'model' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">1. BERT模型的主要特点是什么？</h3>
              <button
                onClick={() => toggleAnswer('bert')}
                className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-left font-medium flex justify-between items-center"
              >
                <span>查看答案</span>
                <span>{expandedAnswer === 'bert' ? '▼' : '▶'}</span>
              </button>
              {expandedAnswer === 'bert' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="mb-2">BERT（Bidirectional Encoder Representations from Transformers）的主要特点：</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>双向上下文表示：同时考虑词语的左右上下文</li>
                    <li>预训练任务：包括掩码语言模型（MLM）和下一句预测（NSP）</li>
                    <li>Transformer架构：使用自注意力机制处理序列信息</li>
                    <li>迁移学习：可以针对不同任务进行微调</li>
                    <li>强大的特征提取能力：能够捕捉深层语义信息</li>
                  </ul>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">2. 什么是注意力机制？它的作用是什么？</h3>
              <button
                onClick={() => toggleAnswer('attention')}
                className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-left font-medium flex justify-between items-center"
              >
                <span>查看答案</span>
                <span>{expandedAnswer === 'attention' ? '▼' : '▶'}</span>
              </button>
              {expandedAnswer === 'attention' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="mb-2">注意力机制是一种让模型能够关注输入序列中重要部分的机制。</p>
                  <p className="mb-2">主要作用：</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>解决长序列依赖问题</li>
                    <li>突出重要信息，抑制无关信息</li>
                    <li>提供可解释性</li>
                    <li>提高模型性能</li>
                  </ul>
                  <p className="mb-2 mt-4">常见类型：</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>自注意力（Self-Attention）</li>
                    <li>多头注意力（Multi-Head Attention）</li>
                    <li>交叉注意力（Cross-Attention）</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'practice' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">1. 如何处理文本分类中的类别不平衡问题？</h3>
              <button
                onClick={() => toggleAnswer('imbalance')}
                className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-left font-medium flex justify-between items-center"
              >
                <span>查看答案</span>
                <span>{expandedAnswer === 'imbalance' ? '▼' : '▶'}</span>
              </button>
              {expandedAnswer === 'imbalance' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="mb-2">处理类别不平衡的方法：</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>数据层面：
                      <ul className="list-disc pl-6 mt-1">
                        <li>过采样（如SMOTE）</li>
                        <li>欠采样</li>
                        <li>数据增强</li>
                      </ul>
                    </li>
                    <li>算法层面：
                      <ul className="list-disc pl-6 mt-1">
                        <li>调整类别权重</li>
                        <li>使用适合不平衡数据的损失函数</li>
                        <li>集成学习方法</li>
                      </ul>
                    </li>
                    <li>评估指标：
                      <ul className="list-disc pl-6 mt-1">
                        <li>使用F1分数、AUC等指标</li>
                        <li>混淆矩阵分析</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">2. 如何评估NLP模型的性能？</h3>
              <button
                onClick={() => toggleAnswer('evaluation')}
                className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-left font-medium flex justify-between items-center"
              >
                <span>查看答案</span>
                <span>{expandedAnswer === 'evaluation' ? '▼' : '▶'}</span>
              </button>
              {expandedAnswer === 'evaluation' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="mb-2">NLP模型评估方法：</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>分类任务：
                      <ul className="list-disc pl-6 mt-1">
                        <li>准确率（Accuracy）</li>
                        <li>精确率（Precision）</li>
                        <li>召回率（Recall）</li>
                        <li>F1分数</li>
                        <li>ROC曲线和AUC</li>
                      </ul>
                    </li>
                    <li>序列标注任务：
                      <ul className="list-disc pl-6 mt-1">
                        <li>实体级别的F1分数</li>
                        <li>标签级别的准确率</li>
                      </ul>
                    </li>
                    <li>生成任务：
                      <ul className="list-disc pl-6 mt-1">
                        <li>BLEU分数</li>
                        <li>ROUGE分数</li>
                        <li>人工评估</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'advanced' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">1. 如何解决NLP中的长文本处理问题？</h3>
              <button
                onClick={() => toggleAnswer('long-text')}
                className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-left font-medium flex justify-between items-center"
              >
                <span>查看答案</span>
                <span>{expandedAnswer === 'long-text' ? '▼' : '▶'}</span>
              </button>
              {expandedAnswer === 'long-text' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="mb-2">长文本处理方法：</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>文本分段：
                      <ul className="list-disc pl-6 mt-1">
                        <li>滑动窗口</li>
                        <li>段落划分</li>
                        <li>句子分割</li>
                      </ul>
                    </li>
                    <li>模型改进：
                      <ul className="list-disc pl-6 mt-1">
                        <li>使用长文本专用模型（如Longformer）</li>
                        <li>层次化处理</li>
                        <li>注意力机制优化</li>
                      </ul>
                    </li>
                    <li>特征提取：
                      <ul className="list-disc pl-6 mt-1">
                        <li>关键信息提取</li>
                        <li>文本摘要</li>
                        <li>主题模型</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">2. 如何提高NLP模型的泛化能力？</h3>
              <button
                onClick={() => toggleAnswer('generalization')}
                className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-left font-medium flex justify-between items-center"
              >
                <span>查看答案</span>
                <span>{expandedAnswer === 'generalization' ? '▼' : '▶'}</span>
              </button>
              {expandedAnswer === 'generalization' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="mb-2">提高模型泛化能力的方法：</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>数据增强：
                      <ul className="list-disc pl-6 mt-1">
                        <li>同义词替换</li>
                        <li>回译</li>
                        <li>EDA（Easy Data Augmentation）</li>
                      </ul>
                    </li>
                    <li>正则化技术：
                      <ul className="list-disc pl-6 mt-1">
                        <li>Dropout</li>
                        <li>L1/L2正则化</li>
                        <li>早停（Early Stopping）</li>
                      </ul>
                    </li>
                    <li>预训练和微调：
                      <ul className="list-disc pl-6 mt-1">
                        <li>使用大规模预训练模型</li>
                        <li>领域适应</li>
                        <li>多任务学习</li>
                      </ul>
                    </li>
                    <li>集成学习：
                      <ul className="list-disc pl-6 mt-1">
                        <li>模型集成</li>
                        <li>交叉验证</li>
                        <li>Bagging和Boosting</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/ai/nlp/cases"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回NLP实战案例
        </Link>
        <Link 
          href="/study/ai/nlp/advanced"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          NLP进阶与前沿 →
        </Link>
      </div>
    </div>
  );
} 
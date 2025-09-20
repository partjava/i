'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function NLPBasicPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: '概述' },
    { id: 'history', label: '发展历史' },
    { id: 'applications', label: '应用领域' },
    { id: 'fundamentals', label: '基础知识' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">自然语言处理基础</h1>
      
      {/* 标签导航 */}
      <div className="flex space-x-4 mb-6 border-b">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-medium ${
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
            <h2 className="text-2xl font-semibold mb-4">什么是自然语言处理？</h2>
            <p className="mb-4">
              自然语言处理(Natural Language Processing, NLP)是人工智能和语言学领域的分支学科，致力于让计算机能够理解、解释和生成人类语言。
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">NLP的核心任务</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>文本分类与情感分析</li>
                  <li>命名实体识别</li>
                  <li>机器翻译</li>
                  <li>问答系统</li>
                  <li>文本摘要</li>
                  <li>对话系统</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">NLP的主要挑战</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>语言的歧义性</li>
                  <li>上下文理解</li>
                  <li>多语言处理</li>
                  <li>领域适应</li>
                  <li>资源稀缺</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">NLP发展历史</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">1950-1960年代：规则基础阶段</h3>
                <p>基于语言学规则的系统，如机器翻译系统</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">1970-1980年代：统计方法兴起</h3>
                <p>引入概率统计方法，如隐马尔可夫模型</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">1990-2000年代：机器学习时代</h3>
                <p>支持向量机、决策树等机器学习算法应用</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">2010年代至今：深度学习革命</h3>
                <p>Transformer架构、预训练语言模型的出现</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">NLP应用领域</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">商业应用</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>智能客服</li>
                  <li>市场分析</li>
                  <li>舆情监测</li>
                  <li>智能营销</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">技术应用</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>搜索引擎</li>
                  <li>语音助手</li>
                  <li>机器翻译</li>
                  <li>文本生成</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'fundamentals' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">NLP基础知识</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">文本预处理</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>分词</li>
                  <li>词性标注</li>
                  <li>词干提取</li>
                  <li>停用词过滤</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">语言模型</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>N-gram模型</li>
                  <li>神经网络语言模型</li>
                  <li>预训练语言模型</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">词向量</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Word2Vec</li>
                  <li>GloVe</li>
                  <li>FastText</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/ai"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回AI学习
        </Link>
        <Link 
          href="/study/ai/nlp/preprocessing"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          文本预处理 →
        </Link>
      </div>
    </div>
  );
} 
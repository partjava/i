'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function WordEmbeddingsPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: '概述' },
    { id: 'one-hot', label: 'One-Hot编码' },
    { id: 'word2vec', label: 'Word2Vec' },
    { id: 'glove', label: 'GloVe' },
    { id: 'fasttext', label: 'FastText' },
    { id: 'bert', label: 'BERT' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">词向量与词嵌入</h1>
      
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
            <h2 className="text-2xl font-semibold mb-4">词向量与词嵌入概述</h2>
            <p className="mb-4">
              词向量是将词语映射到低维实数空间的技术，使得词语之间的语义关系可以通过向量空间中的距离和方向来表示。词嵌入是词向量的一种实现方式，它能够捕捉词语之间的语义和语法关系。
            </p>
            
            <div className="my-6">
              <svg className="w-full max-w-2xl mx-auto" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
                  </marker>
                </defs>
                <rect x="50" y="150" width="120" height="60" rx="5" fill="#e3f2fd" stroke="#2196f3" />
                <text x="110" y="185" textAnchor="middle" fill="#1565c0">词语</text>
                
                <line x1="170" y1="180" x2="230" y2="180" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)" />
                
                <rect x="230" y="150" width="120" height="60" rx="5" fill="#e8f5e9" stroke="#4caf50" />
                <text x="290" y="185" textAnchor="middle" fill="#2e7d32">词向量</text>
                
                <line x1="350" y1="180" x2="410" y2="180" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)" />
                
                <rect x="410" y="150" width="120" height="60" rx="5" fill="#fff3e0" stroke="#ff9800" />
                <text x="470" y="185" textAnchor="middle" fill="#e65100">语义空间</text>
                
                <line x1="530" y1="180" x2="590" y2="180" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)" />
                
                <rect x="590" y="150" width="120" height="60" rx="5" fill="#f3e5f5" stroke="#9c27b0" />
                <text x="650" y="185" textAnchor="middle" fill="#6a1b9a">NLP任务</text>
              </svg>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">词向量的优势</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>捕捉词语间的语义关系</li>
                  <li>支持词语相似度计算</li>
                  <li>便于机器学习模型处理</li>
                  <li>降低特征维度</li>
                  <li>提高模型泛化能力</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">应用场景</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>文本分类</li>
                  <li>情感分析</li>
                  <li>机器翻译</li>
                  <li>问答系统</li>
                  <li>命名实体识别</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'one-hot' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">One-Hot编码</h2>
            <p className="mb-4">
              One-Hot编码是最简单的词向量表示方法，它将每个词表示为一个向量，其中只有一个元素为1，其余都为0。虽然简单直观，但存在维度灾难和无法表示词语间关系的问题。
            </p>

            <div className="my-6">
              <svg className="w-full max-w-2xl mx-auto" viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg">
                <rect x="50" y="50" width="700" height="100" fill="#f5f5f5" stroke="#666" />
                <text x="100" y="100" textAnchor="middle" fill="#333" fontSize="20">猫</text>
                <text x="200" y="100" textAnchor="middle" fill="#333" fontSize="20">狗</text>
                <text x="300" y="100" textAnchor="middle" fill="#333" fontSize="20">鱼</text>
                <text x="400" y="100" textAnchor="middle" fill="#333" fontSize="20">鸟</text>
                <line x1="100" y1="120" x2="100" y2="140" stroke="#666" />
                <line x1="200" y1="120" x2="200" y2="140" stroke="#666" />
                <line x1="300" y1="120" x2="300" y2="140" stroke="#666" />
                <line x1="400" y1="120" x2="400" y2="140" stroke="#666" />
                <text x="100" y="160" textAnchor="middle" fill="#666" fontSize="14">[1,0,0,0]</text>
                <text x="200" y="160" textAnchor="middle" fill="#666" fontSize="14">[0,1,0,0]</text>
                <text x="300" y="160" textAnchor="middle" fill="#666" fontSize="14">[0,0,1,0]</text>
                <text x="400" y="160" textAnchor="middle" fill="#666" fontSize="14">[0,0,0,1]</text>
              </svg>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">One-Hot编码的特点</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>简单直观，易于实现</li>
                  <li>向量维度等于词汇表大小</li>
                  <li>任意两个词向量正交</li>
                  <li>无法表示词语间的语义关系</li>
                  <li>维度灾难问题</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Python代码示例</h3>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{`import numpy as np
from sklearn.preprocessing import OneHotEncoder

# 创建词汇表
vocabulary = ['猫', '狗', '鱼', '鸟']

# 创建OneHotEncoder
encoder = OneHotEncoder(sparse=False)

# 将词汇表转换为二维数组
vocabulary_array = np.array(vocabulary).reshape(-1, 1)

# 进行编码
one_hot_vectors = encoder.fit_transform(vocabulary_array)

# 打印结果
for word, vector in zip(vocabulary, one_hot_vectors):
    print(f"{word}: {vector}")

# 创建词到向量的映射
word_to_vector = {word: vector for word, vector in zip(vocabulary, one_hot_vectors)}

# 计算词语相似度（使用余弦相似度）
def cosine_similarity(v1, v2):
    return np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2))

# 测试相似度
print("\\n词语相似度：")
for word1 in vocabulary:
    for word2 in vocabulary:
        if word1 != word2:
            sim = cosine_similarity(word_to_vector[word1], word_to_vector[word2])
            print(f"{word1} 和 {word2} 的相似度: {sim}")`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'word2vec' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Word2Vec</h2>
            <p className="mb-4">
              Word2Vec是一种基于神经网络的词嵌入模型，它通过预测词语的上下文来学习词向量。Word2Vec包含CBOW和Skip-gram两种模型架构。
            </p>

            <div className="my-6">
              <svg className="w-full max-w-2xl mx-auto" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
                  </marker>
                </defs>
                <rect x="50" y="50" width="120" height="60" rx="5" fill="#e3f2fd" stroke="#2196f3" />
                <text x="110" y="85" textAnchor="middle" fill="#1565c0">输入层</text>
                
                <rect x="230" y="50" width="120" height="60" rx="5" fill="#e8f5e9" stroke="#4caf50" />
                <text x="290" y="85" textAnchor="middle" fill="#2e7d32">隐藏层</text>
                
                <rect x="410" y="50" width="120" height="60" rx="5" fill="#fff3e0" stroke="#ff9800" />
                <text x="470" y="85" textAnchor="middle" fill="#e65100">输出层</text>
                
                <line x1="170" y1="80" x2="230" y2="80" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <line x1="350" y1="80" x2="410" y2="80" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)" />
                
                <text x="110" y="150" textAnchor="middle" fill="#666" fontSize="14">CBOW模型</text>
                <text x="110" y="170" textAnchor="middle" fill="#666" fontSize="14">(上下文预测目标词)</text>
                
                <rect x="50" y="200" width="120" height="60" rx="5" fill="#e3f2fd" stroke="#2196f3" />
                <text x="110" y="235" textAnchor="middle" fill="#1565c0">输入层</text>
                
                <rect x="230" y="200" width="120" height="60" rx="5" fill="#e8f5e9" stroke="#4caf50" />
                <text x="290" y="235" textAnchor="middle" fill="#2e7d32">隐藏层</text>
                
                <rect x="410" y="200" width="120" height="60" rx="5" fill="#fff3e0" stroke="#ff9800" />
                <text x="470" y="235" textAnchor="middle" fill="#e65100">输出层</text>
                
                <line x1="170" y1="230" x2="230" y2="230" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <line x1="350" y1="230" x2="410" y2="230" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)" />
                
                <text x="110" y="300" textAnchor="middle" fill="#666" fontSize="14">Skip-gram模型</text>
                <text x="110" y="320" textAnchor="middle" fill="#666" fontSize="14">(目标词预测上下文)</text>
              </svg>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Word2Vec的特点</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>能够捕捉词语间的语义关系</li>
                  <li>支持词语类比运算</li>
                  <li>训练速度快，效果好</li>
                  <li>可以处理大规模语料</li>
                  <li>支持增量训练</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Python代码示例</h3>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{`from gensim.models import Word2Vec
import numpy as np
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt

# 准备训练数据
sentences = [
    ['我', '喜欢', '自然语言', '处理'],
    ['自然语言', '处理', '是', '人工智能', '的', '重要', '分支'],
    ['机器', '学习', '和', '深度学习', '在', '自然语言', '处理', '中', '应用', '广泛'],
    ['词向量', '是', '自然语言', '处理', '的', '基础', '技术'],
    ['Word2Vec', '是', '一种', '常用', '的', '词向量', '模型']
]

# 训练Word2Vec模型
model = Word2Vec(sentences, vector_size=100, window=5, min_count=1, workers=4)

# 保存模型
model.save('word2vec.model')

# 加载模型
model = Word2Vec.load('word2vec.model')

# 获取词向量
word_vectors = model.wv

# 查找相似词
print("与'自然语言'最相似的词：")
print(word_vectors.most_similar('自然语言'))

# 词语类比
print("\\n词语类比：")
print(word_vectors.most_similar(positive=['自然语言', '处理'], negative=['机器']))

# 可视化词向量
def plot_word_vectors(words, vectors):
    # 使用PCA降维
    pca = PCA(n_components=2)
    reduced_vectors = pca.fit_transform(vectors)
    
    # 绘制散点图
    plt.figure(figsize=(10, 8))
    plt.scatter(reduced_vectors[:, 0], reduced_vectors[:, 1])
    
    # 添加词标签
    for i, word in enumerate(words):
        plt.annotate(word, xy=(reduced_vectors[i, 0], reduced_vectors[i, 1]))
    
    plt.title('词向量可视化')
    plt.show()

# 选择一些词进行可视化
words = ['自然语言', '处理', '人工智能', '机器', '学习', '深度学习', '词向量']
vectors = [word_vectors[word] for word in words]
plot_word_vectors(words, vectors)

# 计算词语相似度
def cosine_similarity(v1, v2):
    return np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2))

# 测试相似度
print("\\n词语相似度：")
for word1 in words:
    for word2 in words:
        if word1 != word2:
            sim = cosine_similarity(word_vectors[word1], word_vectors[word2])
            print(f"{word1} 和 {word2} 的相似度: {sim:.4f}")`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'glove' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">GloVe</h2>
            <p className="mb-4">
              GloVe（Global Vectors for Word Representation）是一种基于全局词频统计的词嵌入模型。它通过构建词语共现矩阵，并优化目标函数来学习词向量。
            </p>

            <div className="my-6">
              <svg className="w-full max-w-2xl mx-auto" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
                <rect x="50" y="50" width="700" height="200" fill="#f5f5f5" stroke="#666" />
                <text x="400" y="80" textAnchor="middle" fill="#333" fontSize="20">词语共现矩阵</text>
                
                <line x1="100" y1="100" x2="700" y2="100" stroke="#666" />
                <line x1="100" y1="150" x2="700" y2="150" stroke="#666" />
                <line x1="100" y1="200" x2="700" y2="200" stroke="#666" />
                
                <line x1="200" y1="50" x2="200" y2="250" stroke="#666" />
                <line x1="300" y1="50" x2="300" y2="250" stroke="#666" />
                <line x1="400" y1="50" x2="400" y2="250" stroke="#666" />
                <line x1="500" y1="50" x2="500" y2="250" stroke="#666" />
                <line x1="600" y1="50" x2="600" y2="250" stroke="#666" />
                
                <text x="150" y="125" textAnchor="middle" fill="#666">词1</text>
                <text x="150" y="175" textAnchor="middle" fill="#666">词2</text>
                <text x="150" y="225" textAnchor="middle" fill="#666">词3</text>
                
                <text x="250" y="30" textAnchor="middle" fill="#666">词1</text>
                <text x="350" y="30" textAnchor="middle" fill="#666">词2</text>
                <text x="450" y="30" textAnchor="middle" fill="#666">词3</text>
                <text x="550" y="30" textAnchor="middle" fill="#666">词4</text>
                <text x="650" y="30" textAnchor="middle" fill="#666">词5</text>
              </svg>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">GloVe的特点</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>结合了全局统计信息和局部上下文信息</li>
                  <li>训练速度快，效果好</li>
                  <li>可以处理大规模语料</li>
                  <li>支持增量训练</li>
                  <li>适合处理低频词</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Python代码示例</h3>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{`from gensim.models import KeyedVectors
import numpy as np
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt

# 加载预训练的GloVe模型
# 注意：需要先下载预训练模型
# wget http://nlp.stanford.edu/data/glove.6B.zip
# unzip glove.6B.zip

def load_glove_model(file_path):
    print("加载GloVe模型...")
    model = KeyedVectors.load_word2vec_format(file_path, binary=False)
    print("加载完成！")
    return model

# 加载模型
model = load_glove_model('glove.6B.100d.txt')

# 查找相似词
print("与'king'最相似的词：")
print(model.most_similar('king'))

# 词语类比
print("\\n词语类比：")
print(model.most_similar(positive=['king', 'woman'], negative=['man']))

# 可视化词向量
def plot_word_vectors(words, model):
    # 获取词向量
    vectors = [model[word] for word in words]
    
    # 使用PCA降维
    pca = PCA(n_components=2)
    reduced_vectors = pca.fit_transform(vectors)
    
    # 绘制散点图
    plt.figure(figsize=(10, 8))
    plt.scatter(reduced_vectors[:, 0], reduced_vectors[:, 1])
    
    # 添加词标签
    for i, word in enumerate(words):
        plt.annotate(word, xy=(reduced_vectors[i, 0], reduced_vectors[i, 1]))
    
    plt.title('GloVe词向量可视化')
    plt.show()

# 选择一些词进行可视化
words = ['king', 'queen', 'man', 'woman', 'boy', 'girl', 'child']
plot_word_vectors(words, model)

# 计算词语相似度
def cosine_similarity(v1, v2):
    return np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2))

# 测试相似度
print("\\n词语相似度：")
for word1 in words:
    for word2 in words:
        if word1 != word2:
            sim = cosine_similarity(model[word1], model[word2])
            print(f"{word1} 和 {word2} 的相似度: {sim:.4f}")

# 训练自定义GloVe模型
from glove import Corpus, Glove

# 准备训练数据
sentences = [
    ['我', '喜欢', '自然语言', '处理'],
    ['自然语言', '处理', '是', '人工智能', '的', '重要', '分支'],
    ['机器', '学习', '和', '深度学习', '在', '自然语言', '处理', '中', '应用', '广泛']
]

# 创建语料库
corpus = Corpus()
corpus.fit(sentences, window=5)

# 训练GloVe模型
glove = Glove(no_components=100, learning_rate=0.05)
glove.fit(corpus.matrix, epochs=30, no_threads=4, verbose=True)
glove.add_dictionary(corpus.dictionary)

# 保存模型
glove.save('glove.model')

# 加载模型
glove = Glove.load('glove.model')

# 查找相似词
print("\\n与'自然语言'最相似的词：")
print(glove.most_similar('自然语言', number=5))`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'fasttext' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">FastText</h2>
            <p className="mb-4">
              FastText是Facebook开发的一种词向量模型，它通过将词分解为字符n-gram来学习词向量，能够更好地处理未登录词和形态丰富的语言。
            </p>

            <div className="my-6">
              <svg className="w-full max-w-2xl mx-auto" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
                <rect x="50" y="50" width="700" height="200" fill="#f5f5f5" stroke="#666" />
                <text x="400" y="80" textAnchor="middle" fill="#333" fontSize="20">FastText模型结构</text>
                
                <rect x="100" y="120" width="120" height="60" rx="5" fill="#e3f2fd" stroke="#2196f3" />
                <text x="160" y="155" textAnchor="middle" fill="#1565c0">输入词</text>
                
                <rect x="300" y="120" width="120" height="60" rx="5" fill="#e8f5e9" stroke="#4caf50" />
                <text x="360" y="155" textAnchor="middle" fill="#2e7d32">字符n-gram</text>
                
                <rect x="500" y="120" width="120" height="60" rx="5" fill="#fff3e0" stroke="#ff9800" />
                <text x="560" y="155" textAnchor="middle" fill="#e65100">词向量</text>
                
                <line x1="220" y1="150" x2="300" y2="150" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <line x1="420" y1="150" x2="500" y2="150" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)" />
              </svg>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">FastText的特点</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>能够处理未登录词</li>
                  <li>适合形态丰富的语言</li>
                  <li>训练速度快</li>
                  <li>内存占用小</li>
                  <li>支持多语言</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Python代码示例</h3>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{`from gensim.models import FastText
import numpy as np
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt

# 准备训练数据
sentences = [
    ['我', '喜欢', '自然语言', '处理'],
    ['自然语言', '处理', '是', '人工智能', '的', '重要', '分支'],
    ['机器', '学习', '和', '深度学习', '在', '自然语言', '处理', '中', '应用', '广泛'],
    ['词向量', '是', '自然语言', '处理', '的', '基础', '技术'],
    ['FastText', '是', '一种', '常用', '的', '词向量', '模型']
]

# 训练FastText模型
model = FastText(sentences, vector_size=100, window=5, min_count=1, workers=4)

# 保存模型
model.save('fasttext.model')

# 加载模型
model = FastText.load('fasttext.model')

# 获取词向量
word_vectors = model.wv

# 查找相似词
print("与'自然语言'最相似的词：")
print(word_vectors.most_similar('自然语言'))

# 处理未登录词
print("\\n未登录词'自然语言处理技术'的向量：")
print(word_vectors['自然语言处理技术'])

# 可视化词向量
def plot_word_vectors(words, vectors):
    # 使用PCA降维
    pca = PCA(n_components=2)
    reduced_vectors = pca.fit_transform(vectors)
    
    # 绘制散点图
    plt.figure(figsize=(10, 8))
    plt.scatter(reduced_vectors[:, 0], reduced_vectors[:, 1])
    
    # 添加词标签
    for i, word in enumerate(words):
        plt.annotate(word, xy=(reduced_vectors[i, 0], reduced_vectors[i, 1]))
    
    plt.title('FastText词向量可视化')
    plt.show()

# 选择一些词进行可视化
words = ['自然语言', '处理', '人工智能', '机器', '学习', '深度学习', '词向量']
vectors = [word_vectors[word] for word in words]
plot_word_vectors(words, vectors)

# 计算词语相似度
def cosine_similarity(v1, v2):
    return np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2))

# 测试相似度
print("\\n词语相似度：")
for word1 in words:
    for word2 in words:
        if word1 != word2:
            sim = cosine_similarity(word_vectors[word1], word_vectors[word2])
            print(f"{word1} 和 {word2} 的相似度: {sim:.4f}")

# 使用预训练模型
def load_pretrained_model():
    # 下载预训练模型
    # wget https://dl.fbaipublicfiles.com/fasttext/vectors-wiki/wiki.zh.vec
    model = FastText.load_facebook_model('wiki.zh.vec')
    return model

# 加载预训练模型
# pretrained_model = load_pretrained_model()

# 使用预训练模型进行词语类比
# print("\\n词语类比：")
# print(pretrained_model.wv.most_similar(positive=['北京', '上海'], negative=['东京']))`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bert' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">BERT</h2>
            <p className="mb-4">
              BERT（Bidirectional Encoder Representations from Transformers）是一种基于Transformer的双向预训练语言模型，它能够生成上下文相关的词向量。
            </p>

            <div className="my-6">
              <svg className="w-full max-w-2xl mx-auto" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
                <rect x="50" y="50" width="700" height="300" fill="#f5f5f5" stroke="#666" />
                <text x="400" y="80" textAnchor="middle" fill="#333" fontSize="20">BERT模型结构</text>
                
                <rect x="100" y="120" width="120" height="60" rx="5" fill="#e3f2fd" stroke="#2196f3" />
                <text x="160" y="155" textAnchor="middle" fill="#1565c0">输入层</text>
                
                <rect x="100" y="200" width="120" height="60" rx="5" fill="#e8f5e9" stroke="#4caf50" />
                <text x="160" y="235" textAnchor="middle" fill="#2e7d32">Transformer编码器</text>
                
                <rect x="100" y="280" width="120" height="60" rx="5" fill="#fff3e0" stroke="#ff9800" />
                <text x="160" y="315" textAnchor="middle" fill="#e65100">输出层</text>
                
                <line x1="160" y1="180" x2="160" y2="200" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <line x1="160" y1="260" x2="160" y2="280" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)" />
                
                <text x="400" y="200" textAnchor="middle" fill="#666" fontSize="14">双向注意力机制</text>
                <text x="400" y="220" textAnchor="middle" fill="#666" fontSize="14">多层Transformer</text>
                <text x="400" y="240" textAnchor="middle" fill="#666" fontSize="14">上下文相关表示</text>
              </svg>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">BERT的特点</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>双向上下文表示</li>
                  <li>预训练+微调范式</li>
                  <li>强大的特征提取能力</li>
                  <li>支持多种下游任务</li>
                  <li>处理一词多义问题</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Python代码示例</h3>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{`import torch
from transformers import BertTokenizer, BertModel
import numpy as np
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt

# 加载预训练模型和分词器
tokenizer = BertTokenizer.from_pretrained('bert-base-chinese')
model = BertModel.from_pretrained('bert-base-chinese')

# 准备输入文本
text = "自然语言处理是人工智能的重要分支"

# 对文本进行编码
inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True)

# 获取BERT输出
with torch.no_grad():
    outputs = model(**inputs)

# 获取最后一层的隐藏状态
last_hidden_states = outputs.last_hidden_state

# 获取[CLS]标记的输出作为整个句子的表示
sentence_embedding = last_hidden_states[0][0]

# 获取每个词的表示
word_embeddings = last_hidden_states[0][1:-1]  # 去掉[CLS]和[SEP]

# 将词向量转换为numpy数组
word_embeddings = word_embeddings.numpy()

# 可视化词向量
def plot_word_vectors(words, vectors):
    # 使用PCA降维
    pca = PCA(n_components=2)
    reduced_vectors = pca.fit_transform(vectors)
    
    # 绘制散点图
    plt.figure(figsize=(10, 8))
    plt.scatter(reduced_vectors[:, 0], reduced_vectors[:, 1])
    
    # 添加词标签
    for i, word in enumerate(words):
        plt.annotate(word, xy=(reduced_vectors[i, 0], reduced_vectors[i, 1]))
    
    plt.title('BERT词向量可视化')
    plt.show()

# 获取分词结果
tokens = tokenizer.tokenize(text)
print("分词结果：", tokens)

# 可视化词向量
plot_word_vectors(tokens, word_embeddings)

# 计算词语相似度
def cosine_similarity(v1, v2):
    return np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2))

# 测试相似度
print("\\n词语相似度：")
for i, word1 in enumerate(tokens):
    for j, word2 in enumerate(tokens):
        if i != j:
            sim = cosine_similarity(word_embeddings[i], word_embeddings[j])
            print(f"{word1} 和 {word2} 的相似度: {sim:.4f}")

# 使用BERT进行文本分类
from transformers import BertForSequenceClassification
from torch.utils.data import Dataset, DataLoader

# 准备数据集
class TextDataset(Dataset):
    def __init__(self, texts, labels, tokenizer):
        self.texts = texts
        self.labels = labels
        self.tokenizer = tokenizer
    
    def __len__(self):
        return len(self.texts)
    
    def __getitem__(self, idx):
        text = self.texts[idx]
        label = self.labels[idx]
        
        encoding = self.tokenizer(text, padding='max_length', truncation=True, max_length=128, return_tensors='pt')
        
        return {
            'input_ids': encoding['input_ids'].flatten(),
            'attention_mask': encoding['attention_mask'].flatten(),
            'labels': torch.tensor(label)
        }

# 准备训练数据
train_texts = [
    "自然语言处理是人工智能的重要分支",
    "机器学习在自然语言处理中应用广泛",
    "深度学习推动了自然语言处理的发展",
    "词向量是自然语言处理的基础技术"
]
train_labels = [1, 1, 1, 1]  # 1表示正面评价

# 创建数据集
train_dataset = TextDataset(train_texts, train_labels, tokenizer)

# 创建数据加载器
train_dataloader = DataLoader(train_dataset, batch_size=2, shuffle=True)

# 加载预训练的分类模型
model = BertForSequenceClassification.from_pretrained('bert-base-chinese', num_labels=2)

# 训练模型
optimizer = torch.optim.AdamW(model.parameters(), lr=2e-5)

for epoch in range(3):
    model.train()
    for batch in train_dataloader:
        optimizer.zero_grad()
        outputs = model(**batch)
        loss = outputs.loss
        loss.backward()
        optimizer.step()

# 保存模型
model.save_pretrained('bert-classifier')

# 加载模型
model = BertForSequenceClassification.from_pretrained('bert-classifier')

# 进行预测
def predict(text):
    inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True)
    outputs = model(**inputs)
    predictions = torch.softmax(outputs.logits, dim=-1)
    return predictions.argmax().item()

# 测试预测
test_text = "自然语言处理技术发展迅速"
prediction = predict(test_text)
print(f"\\n预测结果：{'正面' if prediction == 1 else '负面'}")`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/ai/nlp/preprocessing"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回预处理
        </Link>
        <Link 
          href="/study/ai/nlp/text-classification"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          文本分类 →
        </Link>
      </div>
    </div>
  );
} 
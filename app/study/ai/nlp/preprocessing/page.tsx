'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PreprocessingPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: '概述' },
    { id: 'tokenization', label: '分词' },
    { id: 'pos', label: '词性标注' },
    { id: 'stemming', label: '词干提取' },
    { id: 'stopwords', label: '停用词过滤' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">文本预处理</h1>
      
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
            <h2 className="text-2xl font-semibold mb-4">文本预处理概述</h2>
            <p className="mb-4">
              文本预处理是自然语言处理的第一步，它的目的是将原始文本转换为计算机可以理解和处理的格式。良好的预处理可以提高后续NLP任务的效果。
            </p>
            
            <div className="my-6">
              <svg className="w-full max-w-2xl mx-auto" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
                  </marker>
                </defs>
                <rect x="50" y="150" width="120" height="60" rx="5" fill="#e3f2fd" stroke="#2196f3" />
                <text x="110" y="185" textAnchor="middle" fill="#1565c0">原始文本</text>
                
                <line x1="170" y1="180" x2="230" y2="180" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)" />
                
                <rect x="230" y="150" width="120" height="60" rx="5" fill="#e8f5e9" stroke="#4caf50" />
                <text x="290" y="185" textAnchor="middle" fill="#2e7d32">分词</text>
                
                <line x1="350" y1="180" x2="410" y2="180" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)" />
                
                <rect x="410" y="150" width="120" height="60" rx="5" fill="#fff3e0" stroke="#ff9800" />
                <text x="470" y="185" textAnchor="middle" fill="#e65100">词性标注</text>
                
                <line x1="530" y1="180" x2="590" y2="180" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)" />
                
                <rect x="590" y="150" width="120" height="60" rx="5" fill="#f3e5f5" stroke="#9c27b0" />
                <text x="650" y="185" textAnchor="middle" fill="#6a1b9a">特征提取</text>
              </svg>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">预处理的主要步骤</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>文本清洗（去除特殊字符、HTML标签等）</li>
                  <li>分词（将文本切分为单词或词组）</li>
                  <li>词性标注（识别每个词的语法类别）</li>
                  <li>词干提取（将词还原为词干形式）</li>
                  <li>停用词过滤（去除无意义的常用词）</li>
                  <li>大小写转换（统一文本格式）</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">预处理的重要性</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>提高模型性能</li>
                  <li>减少数据噪声</li>
                  <li>统一数据格式</li>
                  <li>降低计算复杂度</li>
                  <li>提高特征提取质量</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tokenization' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">分词</h2>
            <p className="mb-4">
              分词是将连续的文本切分成独立的词语单元的过程。对于中文等没有明确词边界的语言来说，分词尤为重要。
            </p>

            <div className="my-6">
              <svg className="w-full max-w-2xl mx-auto" viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg">
                <rect x="50" y="50" width="700" height="100" fill="#f5f5f5" stroke="#666" />
                <text x="400" y="100" textAnchor="middle" fill="#333" fontSize="20">
                  自然语言处理是人工智能的重要分支
                </text>
                <line x1="150" y1="150" x2="150" y2="170" stroke="#666" />
                <line x1="300" y1="150" x2="300" y2="170" stroke="#666" />
                <line x1="450" y1="150" x2="450" y2="170" stroke="#666" />
                <line x1="600" y1="150" x2="600" y2="170" stroke="#666" />
                <text x="150" y="190" textAnchor="middle" fill="#666">自然语言</text>
                <text x="300" y="190" textAnchor="middle" fill="#666">处理</text>
                <text x="450" y="190" textAnchor="middle" fill="#666">人工智能</text>
                <text x="600" y="190" textAnchor="middle" fill="#666">重要分支</text>
              </svg>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">分词方法</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>基于规则的分词</li>
                  <li>基于统计的分词</li>
                  <li>基于机器学习的分词</li>
                  <li>基于深度学习的分词</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Python代码示例</h3>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{`import jieba

# 精确模式分词
text = "自然语言处理是人工智能的重要分支"
words = jieba.cut(text, cut_all=False)
print("精确模式：", " ".join(words))

# 全模式分词
words = jieba.cut(text, cut_all=True)
print("全模式：", " ".join(words))

# 搜索引擎模式
words = jieba.cut_for_search(text)
print("搜索引擎模式：", " ".join(words))`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pos' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">词性标注</h2>
            <p className="mb-4">
              词性标注是确定句子中每个词的语法类别的过程，如名词、动词、形容词等。这对于理解句子的语法结构和语义非常重要。
            </p>

            <div className="my-6">
              <svg className="w-full max-w-2xl mx-auto" viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg">
                <rect x="50" y="50" width="700" height="100" fill="#f5f5f5" stroke="#666" />
                <text x="150" y="100" textAnchor="middle" fill="#333" fontSize="20">自然</text>
                <text x="300" y="100" textAnchor="middle" fill="#333" fontSize="20">语言</text>
                <text x="450" y="100" textAnchor="middle" fill="#333" fontSize="20">处理</text>
                <text x="600" y="100" textAnchor="middle" fill="#333" fontSize="20">技术</text>
                <text x="150" y="150" textAnchor="middle" fill="#666" fontSize="14">形容词</text>
                <text x="300" y="150" textAnchor="middle" fill="#666" fontSize="14">名词</text>
                <text x="450" y="150" textAnchor="middle" fill="#666" fontSize="14">动词</text>
                <text x="600" y="150" textAnchor="middle" fill="#666" fontSize="14">名词</text>
              </svg>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">常见词性类别</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>名词（n）：表示人、事物、地点等</li>
                  <li>动词（v）：表示动作或状态</li>
                  <li>形容词（a）：表示性质或状态</li>
                  <li>副词（d）：表示程度、方式等</li>
                  <li>介词（p）：表示关系</li>
                  <li>连词（c）：表示连接</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Python代码示例</h3>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{`import jieba.posseg as pseg

text = "自然语言处理技术正在快速发展"
words = pseg.cut(text)

for word, flag in words:
    print(f"{word} ({flag})")

# 输出示例：
# 自然 (a)
# 语言 (n)
# 处理 (v)
# 技术 (n)
# 正在 (d)
# 快速 (d)
# 发展 (v)`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'stemming' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">词干提取</h2>
            <p className="mb-4">
              词干提取是将词语还原为其基本形式的过程，去除词形变化（如时态、复数等）。这有助于减少词汇表大小，提高文本分析的效率。
            </p>

            <div className="my-6">
              <svg className="w-full max-w-2xl mx-auto" viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg">
                <rect x="50" y="50" width="700" height="100" fill="#f5f5f5" stroke="#666" />
                <text x="150" y="100" textAnchor="middle" fill="#333" fontSize="20">running</text>
                <text x="300" y="100" textAnchor="middle" fill="#333" fontSize="20">ran</text>
                <text x="450" y="100" textAnchor="middle" fill="#333" fontSize="20">runs</text>
                <text x="600" y="100" textAnchor="middle" fill="#333" fontSize="20">runner</text>
                <line x1="150" y1="120" x2="150" y2="140" stroke="#666" />
                <line x1="300" y1="120" x2="300" y2="140" stroke="#666" />
                <line x1="450" y1="120" x2="450" y2="140" stroke="#666" />
                <line x1="600" y1="120" x2="600" y2="140" stroke="#666" />
                <text x="150" y="160" textAnchor="middle" fill="#666" fontSize="20">run</text>
                <text x="300" y="160" textAnchor="middle" fill="#666" fontSize="20">run</text>
                <text x="450" y="160" textAnchor="middle" fill="#666" fontSize="20">run</text>
                <text x="600" y="160" textAnchor="middle" fill="#666" fontSize="20">run</text>
              </svg>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">词干提取方法</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Porter词干提取算法</li>
                  <li>Snowball词干提取算法</li>
                  <li>Lancaster词干提取算法</li>
                  <li>基于规则的方法</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Python代码示例</h3>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{`from nltk.stem import PorterStemmer, SnowballStemmer
from nltk.stem.lancaster import LancasterStemmer

# 创建词干提取器
porter = PorterStemmer()
snowball = SnowballStemmer('english')
lancaster = LancasterStemmer()

# 测试词干提取
words = ['running', 'ran', 'runs', 'runner']

print("Porter词干提取：")
for word in words:
    print(f"{word} -> {porter.stem(word)}")

print("\\nSnowball词干提取：")
for word in words:
    print(f"{word} -> {snowball.stem(word)}")

print("\\nLancaster词干提取：")
for word in words:
    print(f"{word} -> {lancaster.stem(word)}")`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'stopwords' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">停用词过滤</h2>
            <p className="mb-4">
              停用词过滤是去除文本中频繁出现但对文本含义贡献不大的词语的过程。这些词通常包括冠词、介词、连词等。
            </p>

            <div className="my-6">
              <svg className="w-full max-w-2xl mx-auto" viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg">
                <rect x="50" y="50" width="700" height="100" fill="#f5f5f5" stroke="#666" />
                <text x="400" y="100" textAnchor="middle" fill="#333" fontSize="20">
                  The quick brown fox jumps over the lazy dog
                </text>
                <line x1="400" y1="120" x2="400" y2="140" stroke="#666" />
                <text x="400" y="160" textAnchor="middle" fill="#666" fontSize="20">
                  quick brown fox jumps lazy dog
                </text>
              </svg>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">常见停用词</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>冠词：the, a, an</li>
                  <li>介词：in, on, at, to</li>
                  <li>连词：and, or, but</li>
                  <li>代词：I, you, he, she</li>
                  <li>助动词：is, are, was, were</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Python代码示例</h3>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{`from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

# 下载停用词（如果还没有下载）
import nltk
nltk.download('stopwords')
nltk.download('punkt')

# 获取停用词列表
stop_words = set(stopwords.words('english'))

# 示例文本
text = "The quick brown fox jumps over the lazy dog"

# 分词
word_tokens = word_tokenize(text)

# 过滤停用词
filtered_sentence = [w for w in word_tokens if not w.lower() in stop_words]

print("原始文本：", text)
print("过滤后：", " ".join(filtered_sentence))`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/ai/nlp/basic"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回基础
        </Link>
        <Link 
          href="/study/ai/nlp/word-embeddings"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          词向量与词嵌入 →
        </Link>
      </div>
    </div>
  );
} 
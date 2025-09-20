'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function NLPFrameworksPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedCode, setExpandedCode] = useState<string | null>(null);

  const tabs = [
    { id: 'overview', label: '框架概述' },
    { id: 'tools', label: '常用工具' },
    { id: 'comparison', label: '框架对比' },
    { id: 'practice', label: '实践指南' }
  ];

  const toggleCode = (codeId: string) => {
    setExpandedCode(expandedCode === codeId ? null : codeId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">NLP框架与工具</h1>
      
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
            <h2 className="text-2xl font-semibold mb-4">NLP框架概述</h2>
            <p className="mb-4">
              自然语言处理领域有多个强大的框架和工具，它们为NLP任务提供了丰富的功能和便捷的开发体验。选择合适的框架对于项目的成功至关重要。
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">主流框架</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Hugging Face Transformers</li>
                  <li>PyTorch</li>
                  <li>TensorFlow</li>
                  <li>spaCy</li>
                  <li>NLTK</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">框架特点</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>预训练模型支持</li>
                  <li>模型训练与部署</li>
                  <li>数据处理工具</li>
                  <li>评估与优化</li>
                  <li>社区支持</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tools' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">常用工具</h2>
            <p className="mb-4">
              NLP开发中常用的工具和库，它们提供了丰富的功能和便捷的开发体验。
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">核心工具</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>文本处理工具</li>
                  <li>分词工具</li>
                  <li>词向量工具</li>
                  <li>评估工具</li>
                  <li>可视化工具</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Python代码示例</h3>
                <div className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleCode('tools-example')}
                    className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-left font-medium flex justify-between items-center"
                  >
                    <span>工具使用示例</span>
                    <span>{expandedCode === 'tools-example' ? '▼' : '▶'}</span>
                  </button>
                  {expandedCode === 'tools-example' && (
                    <pre className="bg-gray-100 p-4 overflow-x-auto">
                      <code>{`# 使用Hugging Face Transformers
from transformers import pipeline, AutoTokenizer, AutoModel

# 文本分类
classifier = pipeline("text-classification")
result = classifier("这是一个很好的产品！")
print(result)

# 使用spaCy进行NLP处理
import spacy
nlp = spacy.load("zh_core_web_sm")
doc = nlp("这是一个示例句子。")
for token in doc:
    print(token.text, token.pos_, token.dep_)

# 使用NLTK进行文本处理
import nltk
from nltk.tokenize import word_tokenize
text = "这是一个示例文本。"
tokens = word_tokenize(text)
print(tokens)`}</code>
                    </pre>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'comparison' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">框架对比</h2>
            <p className="mb-4">
              不同NLP框架的特点和适用场景对比，帮助开发者选择合适的工具。
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">框架特点对比</h3>
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border p-2">框架</th>
                      <th className="border p-2">优势</th>
                      <th className="border p-2">适用场景</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2">Transformers</td>
                      <td className="border p-2">预训练模型丰富，使用简单</td>
                      <td className="border p-2">快速开发，模型应用</td>
                    </tr>
                    <tr>
                      <td className="border p-2">PyTorch</td>
                      <td className="border p-2">灵活性高，动态计算图</td>
                      <td className="border p-2">研究开发，模型训练</td>
                    </tr>
                    <tr>
                      <td className="border p-2">TensorFlow</td>
                      <td className="border p-2">部署方便，生态完善</td>
                      <td className="border p-2">生产环境，大规模部署</td>
                    </tr>
                    <tr>
                      <td className="border p-2">spaCy</td>
                      <td className="border p-2">性能优秀，API友好</td>
                      <td className="border p-2">工业应用，文本处理</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'practice' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">实践指南</h2>
            <p className="mb-4">
              NLP框架和工具的使用实践指南，包括环境配置、开发流程和最佳实践。
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">开发流程</h3>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>环境配置</li>
                  <li>数据准备</li>
                  <li>模型选择</li>
                  <li>训练与评估</li>
                  <li>部署与优化</li>
                </ol>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">最佳实践</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>选择合适的框架</li>
                  <li>数据预处理</li>
                  <li>模型优化</li>
                  <li>性能监控</li>
                  <li>持续改进</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/ai/nlp/dialogue"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回对话系统
        </Link>
        <Link 
          href="/study/ai/nlp/cases"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          NLP实战案例 →
        </Link>
      </div>
    </div>
  );
} 
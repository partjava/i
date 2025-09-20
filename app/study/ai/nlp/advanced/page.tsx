'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function NLPAdvancedPage() {
  const [activeTab, setActiveTab] = useState('trends');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'trends', label: '研究趋势' },
    { id: 'models', label: '前沿模型' },
    { id: 'applications', label: '创新应用' },
    { id: 'challenges', label: '未来挑战' }
  ];

  const toggleContent = (contentId: string) => {
    setExpandedContent(expandedContent === contentId ? null : contentId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">NLP进阶与前沿</h1>
      
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
        {activeTab === 'trends' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">1. 大规模预训练语言模型</h3>
              <button
                onClick={() => toggleContent('pretrained')}
                className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-left font-medium flex justify-between items-center"
              >
                <span>查看详情</span>
                <span>{expandedContent === 'pretrained' ? '▼' : '▶'}</span>
              </button>
              {expandedContent === 'pretrained' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="mb-2">大规模预训练语言模型的发展趋势：</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>模型规模持续增长
                      <ul className="list-disc pl-6 mt-1">
                        <li>GPT-4：1.76万亿参数</li>
                        <li>PaLM：5400亿参数</li>
                        <li>LLaMA：650亿参数</li>
                      </ul>
                    </li>
                    <li>多模态融合
                      <ul className="list-disc pl-6 mt-1">
                        <li>文本-图像联合训练</li>
                        <li>跨模态理解与生成</li>
                        <li>多模态知识表示</li>
                      </ul>
                    </li>
                    <li>高效训练方法
                      <ul className="list-disc pl-6 mt-1">
                        <li>模型压缩与量化</li>
                        <li>分布式训练优化</li>
                        <li>低资源训练技术</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">2. 可解释性与安全性</h3>
              <button
                onClick={() => toggleContent('explainability')}
                className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-left font-medium flex justify-between items-center"
              >
                <span>查看详情</span>
                <span>{expandedContent === 'explainability' ? '▼' : '▶'}</span>
              </button>
              {expandedContent === 'explainability' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="mb-2">可解释性与安全性研究进展：</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>模型可解释性
                      <ul className="list-disc pl-6 mt-1">
                        <li>注意力可视化</li>
                        <li>决策路径分析</li>
                        <li>特征重要性解释</li>
                      </ul>
                    </li>
                    <li>安全性研究
                      <ul className="list-disc pl-6 mt-1">
                        <li>对抗攻击防御</li>
                        <li>隐私保护学习</li>
                        <li>偏见检测与消除</li>
                      </ul>
                    </li>
                    <li>伦理与规范
                      <ul className="list-disc pl-6 mt-1">
                        <li>AI伦理准则</li>
                        <li>负责任AI开发</li>
                        <li>监管与合规</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'models' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">1. 多模态大模型</h3>
              <button
                onClick={() => toggleContent('multimodal')}
                className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-left font-medium flex justify-between items-center"
              >
                <span>查看详情</span>
                <span>{expandedContent === 'multimodal' ? '▼' : '▶'}</span>
              </button>
              {expandedContent === 'multimodal' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="mb-2">多模态大模型发展：</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>代表性模型
                      <ul className="list-disc pl-6 mt-1">
                        <li>GPT-4V：视觉-语言理解</li>
                        <li>DALL-E 3：文本到图像生成</li>
                        <li>CLIP：跨模态对比学习</li>
                      </ul>
                    </li>
                    <li>关键技术
                      <ul className="list-disc pl-6 mt-1">
                        <li>跨模态对齐</li>
                        <li>多模态融合</li>
                        <li>联合表示学习</li>
                      </ul>
                    </li>
                    <li>应用场景
                      <ul className="list-disc pl-6 mt-1">
                        <li>视觉问答</li>
                        <li>图像描述生成</li>
                        <li>多模态检索</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">2. 低资源语言处理</h3>
              <button
                onClick={() => toggleContent('low-resource')}
                className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-left font-medium flex justify-between items-center"
              >
                <span>查看详情</span>
                <span>{expandedContent === 'low-resource' ? '▼' : '▶'}</span>
              </button>
              {expandedContent === 'low-resource' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="mb-2">低资源语言处理技术：</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>迁移学习
                      <ul className="list-disc pl-6 mt-1">
                        <li>跨语言迁移</li>
                        <li>领域适应</li>
                        <li>知识蒸馏</li>
                      </ul>
                    </li>
                    <li>数据增强
                      <ul className="list-disc pl-6 mt-1">
                        <li>回译增强</li>
                        <li>同义词替换</li>
                        <li>数据合成</li>
                      </ul>
                    </li>
                    <li>模型优化
                      <ul className="list-disc pl-6 mt-1">
                        <li>参数共享</li>
                        <li>多任务学习</li>
                        <li>元学习</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">1. 智能对话系统</h3>
              <button
                onClick={() => toggleContent('dialogue')}
                className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-left font-medium flex justify-between items-center"
              >
                <span>查看详情</span>
                <span>{expandedContent === 'dialogue' ? '▼' : '▶'}</span>
              </button>
              {expandedContent === 'dialogue' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="mb-2">智能对话系统创新：</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>多轮对话
                      <ul className="list-disc pl-6 mt-1">
                        <li>上下文理解</li>
                        <li>对话状态跟踪</li>
                        <li>个性化回复</li>
                      </ul>
                    </li>
                    <li>情感交互
                      <ul className="list-disc pl-6 mt-1">
                        <li>情感识别</li>
                        <li>共情生成</li>
                        <li>语气控制</li>
                      </ul>
                    </li>
                    <li>知识增强
                      <ul className="list-disc pl-6 mt-1">
                        <li>知识图谱集成</li>
                        <li>事实一致性</li>
                        <li>实时信息更新</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">2. 智能写作助手</h3>
              <button
                onClick={() => toggleContent('writing')}
                className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-left font-medium flex justify-between items-center"
              >
                <span>查看详情</span>
                <span>{expandedContent === 'writing' ? '▼' : '▶'}</span>
              </button>
              {expandedContent === 'writing' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="mb-2">智能写作助手功能：</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>内容生成
                      <ul className="list-disc pl-6 mt-1">
                        <li>文章续写</li>
                        <li>摘要生成</li>
                        <li>创意写作</li>
                      </ul>
                    </li>
                    <li>文本优化
                      <ul className="list-disc pl-6 mt-1">
                        <li>语法检查</li>
                        <li>风格改进</li>
                        <li>可读性提升</li>
                      </ul>
                    </li>
                    <li>多语言支持
                      <ul className="list-disc pl-6 mt-1">
                        <li>实时翻译</li>
                        <li>跨语言写作</li>
                        <li>本地化适配</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'challenges' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">1. 技术挑战</h3>
              <button
                onClick={() => toggleContent('technical')}
                className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-left font-medium flex justify-between items-center"
              >
                <span>查看详情</span>
                <span>{expandedContent === 'technical' ? '▼' : '▶'}</span>
              </button>
              {expandedContent === 'technical' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="mb-2">主要技术挑战：</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>计算资源
                      <ul className="list-disc pl-6 mt-1">
                        <li>训练成本优化</li>
                        <li>推理效率提升</li>
                        <li>资源消耗控制</li>
                      </ul>
                    </li>
                    <li>模型能力
                      <ul className="list-disc pl-6 mt-1">
                        <li>长文本理解</li>
                        <li>多步推理</li>
                        <li>知识更新</li>
                      </ul>
                    </li>
                    <li>鲁棒性
                      <ul className="list-disc pl-6 mt-1">
                        <li>对抗攻击防御</li>
                        <li>噪声数据处理</li>
                        <li>异常检测</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">2. 社会影响</h3>
              <button
                onClick={() => toggleContent('social')}
                className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-left font-medium flex justify-between items-center"
              >
                <span>查看详情</span>
                <span>{expandedContent === 'social' ? '▼' : '▶'}</span>
              </button>
              {expandedContent === 'social' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="mb-2">社会影响与挑战：</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>伦理问题
                      <ul className="list-disc pl-6 mt-1">
                        <li>偏见与公平性</li>
                        <li>隐私保护</li>
                        <li>责任归属</li>
                      </ul>
                    </li>
                    <li>社会影响
                      <ul className="list-disc pl-6 mt-1">
                        <li>就业影响</li>
                        <li>教育变革</li>
                        <li>文化影响</li>
                      </ul>
                    </li>
                    <li>监管与治理
                      <ul className="list-disc pl-6 mt-1">
                        <li>技术标准</li>
                        <li>法律法规</li>
                        <li>行业规范</li>
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
          href="/study/ai/nlp/interview"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回NLP面试题
        </Link>
        <Link 
          href="/study/ai/cv/basic"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          计算机视觉基础 →
        </Link>
      </div>
    </div>
  );
} 
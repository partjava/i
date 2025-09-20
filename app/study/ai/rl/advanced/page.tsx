'use client';

import React, { useState } from 'react';

export default function RLAdvancedPage() {
  const [activeTab, setActiveTab] = useState('research');
  const [showContent1, setShowContent1] = useState(false);
  const [showContent2, setShowContent2] = useState(false);
  const [showContent3, setShowContent3] = useState(false);
  const [showContent4, setShowContent4] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">强化学习进阶与前沿</h1>
      
      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-8">
        <button 
          className={`px-4 py-2 rounded-lg ${activeTab === 'research' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('research')}
        >
          最新研究
        </button>
        <button 
          className={`px-4 py-2 rounded-lg ${activeTab === 'technology' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('technology')}
        >
          前沿技术
        </button>
        <button 
          className={`px-4 py-2 rounded-lg ${activeTab === 'future' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('future')}
        >
          发展方向
        </button>
      </div>

      {/* 主要内容区域 */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* 最新研究部分 */}
        {activeTab === 'research' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">最新研究进展</h2>
            
            {/* 研究领域1 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">1. 多智能体强化学习</h3>
              <button 
                onClick={() => setShowContent1(!showContent1)}
                className="flex items-center text-blue-500 hover:text-blue-700 mb-2"
              >
                <svg 
                  className={`w-4 h-4 mr-2 transform transition-transform ${showContent1 ? 'rotate-90' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
                {showContent1 ? '隐藏内容' : '显示内容'}
              </button>
              {showContent1 && (
                <div className="mt-4 space-y-4">
                  <p className="text-gray-700">
                    多智能体强化学习是当前研究的热点领域，主要关注多个智能体之间的协作与竞争。
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">主要研究方向：</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>基于博弈论的协作机制</li>
                      <li>去中心化训练方法</li>
                      <li>通信与信息共享</li>
                      <li>群体智能与涌现行为</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">最新突破：</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>AlphaStar：星际争霸2中的多智能体协作</li>
                      <li>OpenAI Five：Dota2中的团队协作</li>
                      <li>MARL算法在机器人集群控制中的应用</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* 研究领域2 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">2. 元学习与迁移学习</h3>
              <button 
                onClick={() => setShowContent2(!showContent2)}
                className="flex items-center text-blue-500 hover:text-blue-700 mb-2"
              >
                <svg 
                  className={`w-4 h-4 mr-2 transform transition-transform ${showContent2 ? 'rotate-90' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
                {showContent2 ? '隐藏内容' : '显示内容'}
              </button>
              {showContent2 && (
                <div className="mt-4 space-y-4">
                  <p className="text-gray-700">
                    元学习和迁移学习致力于提高强化学习算法的泛化能力和学习效率。
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">研究重点：</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>快速适应新环境的能力</li>
                      <li>知识迁移与复用</li>
                      <li>少样本学习</li>
                      <li>终身学习</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">最新进展：</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>MAML（Model-Agnostic Meta-Learning）</li>
                      <li>RL2（Reinforcement Learning with Recurrent Neural Networks）</li>
                      <li>PEARL（Probabilistic Embeddings for Actor-Critic RL）</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 前沿技术部分 */}
        {activeTab === 'technology' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">前沿技术</h2>
            
            {/* 技术领域1 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">1. 深度强化学习新技术</h3>
              <button 
                onClick={() => setShowContent3(!showContent3)}
                className="flex items-center text-blue-500 hover:text-blue-700 mb-2"
              >
                <svg 
                  className={`w-4 h-4 mr-2 transform transition-transform ${showContent3 ? 'rotate-90' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
                {showContent3 ? '隐藏内容' : '显示内容'}
              </button>
              {showContent3 && (
                <div className="mt-4 space-y-4">
                  <p className="text-gray-700">
                    深度强化学习领域不断涌现新的技术和方法，推动着整个领域的发展。
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">主要技术：</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>分布式训练框架</li>
                      <li>混合精度训练</li>
                      <li>模型压缩与加速</li>
                      <li>自监督学习</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">应用案例：</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>大规模并行训练系统</li>
                      <li>边缘设备部署优化</li>
                      <li>实时决策系统</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* 技术领域2 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">2. 强化学习框架与工具</h3>
              <button 
                onClick={() => setShowContent4(!showContent4)}
                className="flex items-center text-blue-500 hover:text-blue-700 mb-2"
              >
                <svg 
                  className={`w-4 h-4 mr-2 transform transition-transform ${showContent4 ? 'rotate-90' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
                {showContent4 ? '隐藏内容' : '显示内容'}
              </button>
              {showContent4 && (
                <div className="mt-4 space-y-4">
                  <p className="text-gray-700">
                    强化学习框架和工具的发展极大地促进了研究和应用的进展。
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">主流框架：</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>Stable Baselines3</li>
                      <li>RLlib</li>
                      <li>Acme</li>
                      <li>CleanRL</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">开发工具：</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>环境模拟器</li>
                      <li>可视化工具</li>
                      <li>实验管理平台</li>
                      <li>性能分析工具</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 发展方向部分 */}
        {activeTab === 'future' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">未来发展方向</h2>
            
            {/* 发展方向1：理论研究 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">1. 理论研究方向</h3>
              <div className="mt-4 space-y-4">
                <p className="text-gray-700">
                  强化学习的理论研究将继续深入，为算法发展提供理论基础。
                </p>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">主要方向：</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>样本效率理论</li>
                    <li>泛化性分析</li>
                    <li>收敛性证明</li>
                    <li>鲁棒性研究</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 发展方向2：应用领域 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">2. 应用领域拓展</h3>
              <div className="mt-4 space-y-4">
                <p className="text-gray-700">
                  强化学习将在更多领域发挥重要作用，推动技术创新。
                </p>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">重点领域：</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>自动驾驶</li>
                    <li>机器人控制</li>
                    <li>医疗诊断</li>
                    <li>金融交易</li>
                    <li>能源管理</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 发展方向3：技术融合 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">3. 技术融合创新</h3>
              <div className="mt-4 space-y-4">
                <p className="text-gray-700">
                  强化学习将与其他技术深度融合，产生新的突破。
                </p>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">融合方向：</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>与因果推理结合</li>
                    <li>与知识图谱融合</li>
                    <li>与量子计算结合</li>
                    <li>与脑科学交叉</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航栏 */}
      <div className="mt-8 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <a 
            href="/study/ai/rl/interview" 
            className="px-4 py-2 bg-gray-500 text-white rounded-lg flex items-center hover:bg-gray-600"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M15 19l-7-7 7-7"
              />
            </svg>
            上一章：强化学习面试题
          </a>
          <a 
            href="/study/ai/rl/basic" 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center hover:bg-blue-600 transition-colors"
          >
            返回：强化学习基础
            <svg 
              className="w-5 h-5 ml-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
} 
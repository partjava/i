'use client';

import React, { useState } from 'react';

export default function RLInterviewPage() {
  const [activeTab, setActiveTab] = useState('theory');
  const [showAnswer1, setShowAnswer1] = useState(false);
  const [showAnswer2, setShowAnswer2] = useState(false);
  const [showAnswer3, setShowAnswer3] = useState(false);
  const [showAnswer4, setShowAnswer4] = useState(false);
  const [showAnswer5, setShowAnswer5] = useState(false);
  const [showAnswer6, setShowAnswer6] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">强化学习面试题</h1>
      
      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-8">
        <button 
          className={`px-4 py-2 rounded-lg ${activeTab === 'theory' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('theory')}
        >
          理论知识
        </button>
        <button 
          className={`px-4 py-2 rounded-lg ${activeTab === 'algorithm' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('algorithm')}
        >
          算法实现
        </button>
        <button 
          className={`px-4 py-2 rounded-lg ${activeTab === 'practice' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('practice')}
        >
          实战应用
        </button>
      </div>

      {/* 主要内容区域 */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* 理论知识部分 */}
        {activeTab === 'theory' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">理论知识面试题</h2>
            
            {/* 问题1 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">问题1：什么是强化学习？它与监督学习和无监督学习有什么区别？</h3>
              <button 
                onClick={() => setShowAnswer1(!showAnswer1)}
                className="flex items-center text-blue-500 hover:text-blue-700 mb-2"
              >
                <svg 
                  className={`w-4 h-4 mr-2 transform transition-transform ${showAnswer1 ? 'rotate-90' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
                {showAnswer1 ? '隐藏答案' : '显示答案'}
              </button>
              {showAnswer1 && (
                <div className="mt-4 space-y-4">
                  <p className="text-gray-700">
                    强化学习是一种通过与环境交互来学习最优策略的机器学习方法。智能体通过执行动作、观察环境反馈（奖励）来学习如何最大化长期累积奖励。
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">主要区别：</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>监督学习：需要标记的训练数据，直接学习输入到输出的映射</li>
                      <li>无监督学习：不需要标记数据，主要发现数据中的模式和结构</li>
                      <li>强化学习：通过试错和反馈来学习，目标是最大化长期奖励</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* 问题2 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">问题2：解释马尔可夫决策过程（MDP）的核心概念。</h3>
              <button 
                onClick={() => setShowAnswer2(!showAnswer2)}
                className="flex items-center text-blue-500 hover:text-blue-700 mb-2"
              >
                <svg 
                  className={`w-4 h-4 mr-2 transform transition-transform ${showAnswer2 ? 'rotate-90' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
                {showAnswer2 ? '隐藏答案' : '显示答案'}
              </button>
              {showAnswer2 && (
                <div className="mt-4 space-y-4">
                  <p className="text-gray-700">
                    MDP是强化学习问题的数学框架，包含以下核心概念：
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>状态空间（S）：环境可能的所有状态集合</li>
                      <li>动作空间（A）：智能体可以执行的所有动作集合</li>
                      <li>转移概率（P）：执行动作后状态转移的概率分布</li>
                      <li>奖励函数（R）：状态转移后获得的即时奖励</li>
                      <li>折扣因子（γ）：用于平衡即时奖励和未来奖励的重要性</li>
                    </ul>
                  </div>
                  <p className="text-gray-700">
                    这些概念共同构成了一个完整的决策过程，智能体的目标是在这个框架下找到最优策略。
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 算法实现部分 */}
        {activeTab === 'algorithm' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">算法实现面试题</h2>
            
            {/* 问题3 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">问题3：解释Q-Learning算法的核心思想和实现步骤。</h3>
              <button 
                onClick={() => setShowAnswer3(!showAnswer3)}
                className="flex items-center text-blue-500 hover:text-blue-700 mb-2"
              >
                <svg 
                  className={`w-4 h-4 mr-2 transform transition-transform ${showAnswer3 ? 'rotate-90' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
                {showAnswer3 ? '隐藏答案' : '显示答案'}
              </button>
              {showAnswer3 && (
                <div className="mt-4 space-y-4">
                  <p className="text-gray-700">
                    Q-Learning是一种基于值迭代的强化学习算法，用于学习状态-动作值函数。
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">核心思想：</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>维护一个Q表，记录每个状态-动作对的价值估计</li>
                      <li>使用时序差分学习更新Q值</li>
                      <li>通过探索和利用的平衡来学习最优策略</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">实现步骤：</h4>
                    <ol className="list-decimal list-inside space-y-2 text-gray-600">
                      <li>初始化Q表</li>
                      <li>选择动作（ε-贪婪策略）</li>
                      <li>执行动作，观察奖励和下一状态</li>
                      <li>更新Q值：Q(s,a) ← Q(s,a) + α[r + γ max Q(s',a') - Q(s,a)]</li>
                      <li>重复步骤2-4直到收敛</li>
                    </ol>
                  </div>
                </div>
              )}
            </div>

            {/* 问题4 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">问题4：解释策略梯度算法的原理和实现方法。</h3>
              <button 
                onClick={() => setShowAnswer4(!showAnswer4)}
                className="flex items-center text-blue-500 hover:text-blue-700 mb-2"
              >
                <svg 
                  className={`w-4 h-4 mr-2 transform transition-transform ${showAnswer4 ? 'rotate-90' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
                {showAnswer4 ? '隐藏答案' : '显示答案'}
              </button>
              {showAnswer4 && (
                <div className="mt-4 space-y-4">
                  <p className="text-gray-700">
                    策略梯度算法直接优化策略函数，通过梯度上升来最大化期望回报。
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">核心原理：</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>参数化策略函数π(a|s;θ)</li>
                      <li>目标函数：最大化期望回报J(θ)</li>
                      <li>策略梯度定理：∇J(θ) = E[∇log π(a|s;θ) * R]</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">实现方法：</h4>
                    <ol className="list-decimal list-inside space-y-2 text-gray-600">
                      <li>定义策略网络结构</li>
                      <li>收集轨迹数据</li>
                      <li>计算策略梯度</li>
                      <li>更新策略参数</li>
                      <li>使用基线减少方差</li>
                    </ol>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 实战应用部分 */}
        {activeTab === 'practice' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">实战应用面试题</h2>
            
            {/* 问题5 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">问题5：如何设计一个强化学习系统来解决实际问题？请详细说明设计步骤和注意事项。</h3>
              <button 
                onClick={() => setShowAnswer5(!showAnswer5)}
                className="flex items-center text-blue-500 hover:text-blue-700 mb-2"
              >
                <svg 
                  className={`w-4 h-4 mr-2 transform transition-transform ${showAnswer5 ? 'rotate-90' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
                {showAnswer5 ? '隐藏答案' : '显示答案'}
              </button>
              {showAnswer5 && (
                <div className="mt-4 space-y-4">
                  <p className="text-gray-700">
                    设计强化学习系统需要综合考虑问题特点、算法选择和实现细节。
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">设计步骤：</h4>
                    <ol className="list-decimal list-inside space-y-2 text-gray-600">
                      <li>问题定义与分析
                        <ul className="list-disc list-inside ml-6 mt-1">
                          <li>明确任务目标</li>
                          <li>分析环境特征</li>
                          <li>确定评估指标</li>
                        </ul>
                      </li>
                      <li>环境建模
                        <ul className="list-disc list-inside ml-6 mt-1">
                          <li>状态空间设计</li>
                          <li>动作空间定义</li>
                          <li>奖励函数设计</li>
                        </ul>
                      </li>
                      <li>算法选择与实现
                        <ul className="list-disc list-inside ml-6 mt-1">
                          <li>基于问题特点选择算法</li>
                          <li>实现核心组件</li>
                          <li>设计训练流程</li>
                        </ul>
                      </li>
                      <li>系统优化与部署
                        <ul className="list-disc list-inside ml-6 mt-1">
                          <li>性能调优</li>
                          <li>稳定性改进</li>
                          <li>部署与监控</li>
                        </ul>
                      </li>
                    </ol>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">注意事项：</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>奖励函数设计要合理，避免稀疏奖励问题</li>
                      <li>状态表示要包含足够信息，但避免维度灾难</li>
                      <li>探索与利用的平衡</li>
                      <li>训练稳定性与收敛性</li>
                      <li>实际部署时的实时性要求</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* 问题6 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">问题6：如何处理强化学习中的常见问题，如探索与利用的平衡、奖励稀疏性等？</h3>
              <button 
                onClick={() => setShowAnswer6(!showAnswer6)}
                className="flex items-center text-blue-500 hover:text-blue-700 mb-2"
              >
                <svg 
                  className={`w-4 h-4 mr-2 transform transition-transform ${showAnswer6 ? 'rotate-90' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
                {showAnswer6 ? '隐藏答案' : '显示答案'}
              </button>
              {showAnswer6 && (
                <div className="mt-4 space-y-4">
                  <p className="text-gray-700">
                    强化学习中的常见问题需要针对性的解决方案。
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">探索与利用平衡：</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>ε-贪婪策略：以ε概率随机探索</li>
                      <li>UCB算法：基于置信上界选择动作</li>
                      <li>Thompson采样：基于后验分布采样</li>
                      <li>熵正则化：鼓励策略的多样性</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">奖励稀疏性：</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>奖励塑形：设计中间奖励</li>
                      <li>课程学习：从简单任务开始</li>
                      <li>模仿学习：从专家示范中学习</li>
                      <li>分层强化学习：分解复杂任务</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">其他常见问题：</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>样本效率：使用经验回放、优先采样</li>
                      <li>过拟合：使用正则化、早停</li>
                      <li>训练不稳定：使用目标网络、梯度裁剪</li>
                      <li>维度灾难：使用函数近似、特征工程</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 底部导航栏 */}
      <div className="mt-8 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <a 
            href="/study/ai/rl/cases" 
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
            上一章：强化学习实战
          </a>
          <a 
            href="/study/ai/rl/advanced" 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center hover:bg-blue-600 transition-colors"
          >
            下一章：进阶与前沿
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
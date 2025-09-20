'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RobotAdvancedPage() {
  const [activeTab, setActiveTab] = useState('research');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'research', label: '研究进展' },
    { id: 'technology', label: '前沿技术' },
    { id: 'trend', label: '发展趋势' },
    { id: 'challenge', label: '技术挑战' }
  ];

  const toggleContent = (contentId: string) => {
    setExpandedContent(expandedContent === contentId ? null : contentId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">机器人进阶与前沿</h1>
      
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
        {activeTab === 'research' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">最新研究进展</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 深度强化学习</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      深度强化学习在机器人控制领域取得了显著进展，特别是在复杂任务的学习和泛化方面。
                      最新的研究集中在样本效率、多任务学习和迁移学习等方面。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">研究重点</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>样本效率优化：
                          <ul className="list-disc pl-6 mt-2">
                            <li>模型预训练</li>
                            <li>经验回放优化</li>
                            <li>分层学习</li>
                          </ul>
                        </li>
                        <li>多任务学习：
                          <ul className="list-disc pl-6 mt-2">
                            <li>任务分解</li>
                            <li>知识迁移</li>
                            <li>元学习</li>
                          </ul>
                        </li>
                        <li>实际应用：
                          <ul className="list-disc pl-6 mt-2">
                            <li>机器人操作</li>
                            <li>运动控制</li>
                            <li>任务规划</li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 人机协作</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      人机协作是机器人研究的重要方向，旨在实现机器人与人类的安全、高效协作。
                      研究重点包括意图理解、安全控制和交互设计等方面。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">研究领域</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>意图理解：
                          <ul className="list-disc pl-6 mt-2">
                            <li>手势识别</li>
                            <li>语音交互</li>
                            <li>行为预测</li>
                          </ul>
                        </li>
                        <li>安全控制：
                          <ul className="list-disc pl-6 mt-2">
                            <li>碰撞检测</li>
                            <li>柔顺控制</li>
                            <li>风险评估</li>
                          </ul>
                        </li>
                        <li>交互设计：
                          <ul className="list-disc pl-6 mt-2">
                            <li>自然交互</li>
                            <li>反馈机制</li>
                            <li>用户体验</li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'technology' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">前沿技术</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 人工智能技术</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      人工智能技术在机器人领域的应用不断深入，包括计算机视觉、自然语言处理、
                      机器学习等方面，为机器人提供了更强大的感知和决策能力。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">技术方向</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>计算机视觉：
                          <ul className="list-disc pl-6 mt-2">
                            <li>目标检测与跟踪</li>
                            <li>场景理解</li>
                            <li>3D重建</li>
                          </ul>
                        </li>
                        <li>自然语言处理：
                          <ul className="list-disc pl-6 mt-2">
                            <li>语音识别</li>
                            <li>语义理解</li>
                            <li>对话系统</li>
                          </ul>
                        </li>
                        <li>机器学习：
                          <ul className="list-disc pl-6 mt-2">
                            <li>深度学习</li>
                            <li>强化学习</li>
                            <li>迁移学习</li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 新型传感器</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      新型传感器技术的发展为机器人提供了更丰富的环境感知能力，
                      包括触觉传感器、柔性传感器、生物传感器等。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">传感器类型</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>触觉传感器：
                          <ul className="list-disc pl-6 mt-2">
                            <li>压力分布</li>
                            <li>温度感知</li>
                            <li>纹理识别</li>
                          </ul>
                        </li>
                        <li>柔性传感器：
                          <ul className="list-disc pl-6 mt-2">
                            <li>可穿戴设备</li>
                            <li>软体机器人</li>
                            <li>人机交互</li>
                          </ul>
                        </li>
                        <li>生物传感器：
                          <ul className="list-disc pl-6 mt-2">
                            <li>生物信号</li>
                            <li>环境监测</li>
                            <li>健康诊断</li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'trend' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">发展趋势</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 智能化趋势</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      机器人智能化是未来发展的主要趋势，包括自主决策、环境适应、
                      任务规划等方面的能力提升。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">发展方向</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>自主决策：
                          <ul className="list-disc pl-6 mt-2">
                            <li>多目标优化</li>
                            <li>不确定性处理</li>
                            <li>实时决策</li>
                          </ul>
                        </li>
                        <li>环境适应：
                          <ul className="list-disc pl-6 mt-2">
                            <li>动态环境</li>
                            <li>未知场景</li>
                            <li>鲁棒性</li>
                          </ul>
                        </li>
                        <li>任务规划：
                          <ul className="list-disc pl-6 mt-2">
                            <li>多任务协调</li>
                            <li>资源优化</li>
                            <li>任务分解</li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 应用领域</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      机器人应用领域不断扩展，从工业制造到服务领域，从医疗健康到
                      教育娱乐，呈现出多元化的发展趋势。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">应用方向</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>工业应用：
                          <ul className="list-disc pl-6 mt-2">
                            <li>智能制造</li>
                            <li>柔性生产</li>
                            <li>质量控制</li>
                          </ul>
                        </li>
                        <li>服务领域：
                          <ul className="list-disc pl-6 mt-2">
                            <li>医疗护理</li>
                            <li>教育陪伴</li>
                            <li>家庭服务</li>
                          </ul>
                        </li>
                        <li>特殊应用：
                          <ul className="list-disc pl-6 mt-2">
                            <li>太空探索</li>
                            <li>深海探测</li>
                            <li>危险作业</li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'challenge' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">技术挑战</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 技术瓶颈</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      机器人技术发展面临多个技术瓶颈，包括感知、决策、控制等方面的挑战，
                      需要跨学科合作来解决。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">主要挑战</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>感知能力：
                          <ul className="list-disc pl-6 mt-2">
                            <li>复杂环境感知</li>
                            <li>多模态融合</li>
                            <li>实时处理</li>
                          </ul>
                        </li>
                        <li>决策能力：
                          <ul className="list-disc pl-6 mt-2">
                            <li>不确定性处理</li>
                            <li>多目标优化</li>
                            <li>实时决策</li>
                          </ul>
                        </li>
                        <li>控制能力：
                          <ul className="list-disc pl-6 mt-2">
                            <li>精确控制</li>
                            <li>柔顺控制</li>
                            <li>自适应控制</li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 未来展望</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      面对技术挑战，机器人领域需要加强基础研究，推动技术创新，
                      促进产学研合作，实现技术突破。
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">发展方向</h5>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>基础研究：
                          <ul className="list-disc pl-6 mt-2">
                            <li>算法创新</li>
                            <li>理论突破</li>
                            <li>技术积累</li>
                          </ul>
                        </li>
                        <li>技术创新：
                          <ul className="list-disc pl-6 mt-2">
                            <li>跨学科融合</li>
                            <li>新技术应用</li>
                            <li>产品创新</li>
                          </ul>
                        </li>
                        <li>产业合作：
                          <ul className="list-disc pl-6 mt-2">
                            <li>产学研结合</li>
                            <li>标准制定</li>
                            <li>生态建设</li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/ai/robot/interview"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回面试题
        </Link>
        <Link 
          href="/study/ai/robot"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          返回机器人首页 →
        </Link>
      </div>
    </div>
  );
} 
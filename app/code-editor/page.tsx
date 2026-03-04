'use client';

import React, { useState } from 'react';
import { Card, Tabs } from 'antd';
import MonacoCodeEditor from '../components/MonacoCodeEditor';
import StudyTimeTracker from '../components/StudyTimeTracker';
import AlgorithmVisualizer from '../components/AlgorithmVisualizer';

export default function CodeEditorPage() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubble');
  const [inputData, setInputData] = useState('5,3,8,4,2,7,1,6');
  const [data, setData] = useState([5, 3, 8, 4, 2, 7, 1, 6]);
  const [speed, setSpeed] = useState(1000);

  const algorithms = [
    // 排序算法
    { id: 'bubble', name: '冒泡排序', icon: '🫧', category: '排序算法', difficulty: '简单', needsData: true },
    { id: 'quick', name: '快速排序', icon: '⚡', category: '排序算法', difficulty: '中等', needsData: true },
    { id: 'merge', name: '归并排序', icon: '🔀', category: '排序算法', difficulty: '中等', needsData: true },
    { id: 'heap', name: '堆排序', icon: '🏔️', category: '排序算法', difficulty: '困难', needsData: true },
    { id: 'insertion', name: '插入排序', icon: '📌', category: '排序算法', difficulty: '简单', needsData: true },
    { id: 'selection', name: '选择排序', icon: '🎯', category: '排序算法', difficulty: '简单', needsData: true },
    // 查找算法
    { id: 'binary', name: '二分查找', icon: '🔍', category: '查找算法', difficulty: '简单', needsData: true },
    { id: 'linear', name: '线性查找', icon: '➡️', category: '查找算法', difficulty: '简单', needsData: true },
    // 数学可视化
    { id: 'fibonacci', name: '斐波那契数列', icon: '🔢', category: '数学可视化', difficulty: '简单', needsData: true },
    { id: 'sine-wave', name: '正弦波', icon: '〰️', category: '数学可视化', difficulty: '简单', needsData: false },
    { id: 'spiral', name: '螺旋线', icon: '🌀', category: '数学可视化', difficulty: '简单', needsData: false },
    { id: 'mandelbrot', name: '曼德博集合', icon: '🎨', category: '数学可视化', difficulty: '中等', needsData: false },
    { id: 'lorenz', name: '洛伦兹吸引子', icon: '🦋', category: '数学可视化', difficulty: '困难', needsData: false },
    { id: 'wave-3d', name: '3D波浪', icon: '🌊', category: '数学可视化', difficulty: '中等', needsData: false },
    { id: 'torus', name: '环面', icon: '🍩', category: '数学可视化', difficulty: '简单', needsData: false },
    { id: 'klein', name: '克莱因瓶', icon: '🫙', category: '数学可视化', difficulty: '困难', needsData: false },
    // 机器学习
    { id: 'kmeans', name: 'K-Means 聚类', icon: '🎯', category: '机器学习', difficulty: '中等', needsData: false },
    { id: 'linear-regression', name: '线性回归', icon: '📈', category: '机器学习', difficulty: '简单', needsData: false },
    { id: 'neural-network', name: '神经网络', icon: '🧠', category: '机器学习', difficulty: '困难', needsData: false },
    { id: 'gradient-descent', name: '梯度下降', icon: '⛰️', category: '机器学习', difficulty: '中等', needsData: false },
    { id: 'decision-tree', name: '决策树', icon: '🌳', category: '机器学习', difficulty: '中等', needsData: false },
  ];

  const currentAlgorithm = algorithms.find(a => a.id === selectedAlgorithm);

  const handleDataChange = (value: string) => {
    setInputData(value);
    const numbers = value.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));
    if (numbers.length > 0) {
      setData(numbers);
    }
  };

  const generateRandomData = () => {
    const count = 8;
    const random = Array.from({ length: count }, () => Math.floor(Math.random() * 20) + 1);
    setData(random);
    setInputData(random.join(','));
  };

  const tabItems = [
    {
      key: 'editor',
      label: (
        <span className="flex items-center gap-2">
          <span>💻</span>
          <span className="hidden sm:inline">代码编辑器</span>
          <span className="sm:hidden">编辑</span>
        </span>
      ),
      children: (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* 学习时间追踪器 */}
          <div className="lg:col-span-1">
            <StudyTimeTracker 
              category="编程" 
              technology="代码编辑器" 
              autoStart={true}
              showControls={true}
              className="mb-4 sticky top-20"
            />
          </div>
          
          {/* 代码编辑器 */}
          <div className="lg:col-span-3">
            <MonacoCodeEditor height={typeof window !== 'undefined' && window.innerWidth < 768 ? "500px" : "700px"} />
          </div>
        </div>
      )
    },
    {
      key: 'visualizer',
      label: (
        <span className="flex items-center gap-2">
          <span>🎨</span>
          <span className="hidden sm:inline">算法可视化</span>
          <span className="sm:hidden">可视化</span>
        </span>
      ),
      children: (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
          {/* 左侧控制面板 */}
          <div className="lg:col-span-1 space-y-4">
            {/* 算法选择 */}
            <Card className="shadow-lg">
              <h3 className="text-lg font-bold mb-3">选择算法</h3>
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {algorithms.map(algo => (
                  <button
                    key={algo.id}
                    onClick={() => setSelectedAlgorithm(algo.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all text-sm ${
                      selectedAlgorithm === algo.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{algo.icon}</span>
                      <div className="flex-1">
                        <div className="font-semibold">{algo.name}</div>
                        <div className="text-xs opacity-75 flex items-center gap-2">
                          <span>{algo.category}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs ${
                            algo.difficulty === '简单' ? 'bg-green-500/20 text-green-300' :
                            algo.difficulty === '中等' ? 'bg-yellow-500/20 text-yellow-300' :
                            'bg-red-500/20 text-red-300'
                          }`}>
                            {algo.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {/* 数据输入 - 只在需要时显示 */}
            {currentAlgorithm?.needsData && (
              <Card className="shadow-lg">
                <h3 className="text-lg font-bold mb-3">输入数据</h3>
                <textarea
                  value={inputData}
                  onChange={(e) => handleDataChange(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-sm"
                  rows={3}
                  placeholder="输入数字，用逗号分隔"
                />
                <button
                  onClick={generateRandomData}
                  className="w-full mt-3 px-4 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all text-sm"
                >
                  🎲 生成随机数据
                </button>
                <div className="mt-2 text-xs text-gray-500">
                  当前: [{data.join(', ')}]
                </div>
              </Card>
            )}

            {/* 算法提示 - 不需要数据时显示 */}
            {!currentAlgorithm?.needsData && (
              <Card className="shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
                <div className="text-center">
                  <div className="text-4xl mb-3">✨</div>
                  <h3 className="text-lg font-bold mb-2 text-gray-800">自动生成数据</h3>
                  <p className="text-sm text-gray-600">
                    此算法会自动生成可视化数据，无需手动输入
                  </p>
                </div>
              </Card>
            )}

            {/* 速度控制 */}
            <Card className="shadow-lg">
              <h3 className="text-lg font-bold mb-3">播放速度</h3>
              <input
                type="range"
                min="100"
                max="2000"
                step="100"
                value={speed}
                onChange={(e) => setSpeed(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="text-center text-gray-600 mt-2 text-sm">
                {speed}ms / 步
              </div>
            </Card>
          </div>

          {/* 右侧可视化区域 */}
          <div className="lg:col-span-3">
            <Card className="shadow-lg">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 -m-6 mb-0 p-4 rounded-t-lg">
                <h2 className="text-xl font-bold text-white">
                  {algorithms.find(a => a.id === selectedAlgorithm)?.icon}{' '}
                  {algorithms.find(a => a.id === selectedAlgorithm)?.name}
                </h2>
              </div>
              
              <div className="mt-6">
                <AlgorithmVisualizer
                  algorithm={selectedAlgorithm}
                  data={data}
                  speed={speed}
                />
              </div>

              {/* 算法说明 */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-base font-bold mb-2">算法说明</h3>
                <div className="text-sm text-gray-700 space-y-1">
                  {getAlgorithmDescription(selectedAlgorithm)}
                </div>
              </div>
            </Card>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        <div className="text-center mb-4 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">
            PartJava 编程实验室
          </h1>
          <p className="text-base md:text-xl text-gray-600">
            在线代码编辑 + 3D 算法可视化
          </p>
        </div>

        {/* 标签页 */}
        <Tabs 
          defaultActiveKey="editor" 
          items={tabItems}
          size="large"
          className="bg-white rounded-lg shadow-lg p-4"
        />

        {/* 功能说明 */}
        <div className="mt-6 md:mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          <Card className="text-center p-3 md:p-4">
            <div className="text-2xl md:text-3xl mb-2 md:mb-4">🎨</div>
            <h3 className="text-sm md:text-lg font-semibold mb-1 md:mb-2">语法高亮</h3>
            <p className="text-xs md:text-sm text-gray-600">
              VS Code 级别的语法高亮
            </p>
          </Card>
          
          <Card className="text-center p-3 md:p-4">
            <div className="text-2xl md:text-3xl mb-2 md:mb-4">⚡</div>
            <h3 className="text-sm md:text-lg font-semibold mb-1 md:mb-2">智能补全</h3>
            <p className="text-xs md:text-sm text-gray-600">
              代码自动补全、错误检测
            </p>
          </Card>
          
          <Card className="text-center p-3 md:p-4">
            <div className="text-2xl md:text-3xl mb-2 md:mb-4">🎯</div>
            <h3 className="text-sm md:text-lg font-semibold mb-1 md:mb-2">3D 可视化</h3>
            <p className="text-xs md:text-sm text-gray-600">
              沉浸式算法动画演示
            </p>
          </Card>
          
          <Card className="text-center p-3 md:p-4">
            <div className="text-2xl md:text-3xl mb-2 md:mb-4">💾</div>
            <h3 className="text-sm md:text-lg font-semibold mb-1 md:mb-2">多种操作</h3>
            <p className="text-xs md:text-sm text-gray-600">
              保存、下载、分享、模板
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

function getAlgorithmDescription(algorithm: string) {
  const descriptions: Record<string, JSX.Element> = {
    bubble: (
      <>
        <p><strong>时间复杂度:</strong> O(n²) | <strong>空间:</strong> O(1)</p>
        <p><strong>原理:</strong> 重复遍历数组，比较相邻元素并交换。</p>
        <p><strong>适用:</strong> 小规模数据，教学演示。</p>
      </>
    ),
    quick: (
      <>
        <p><strong>时间复杂度:</strong> O(n log n) | <strong>空间:</strong> O(log n)</p>
        <p><strong>原理:</strong> 选择基准值，分区递归排序。</p>
        <p><strong>适用:</strong> 大规模数据，实际应用最快。</p>
      </>
    ),
    merge: (
      <>
        <p><strong>时间复杂度:</strong> O(n log n) | <strong>空间:</strong> O(n)</p>
        <p><strong>原理:</strong> 分治法，分割后合并排序。</p>
        <p><strong>适用:</strong> 稳定排序，链表排序。</p>
      </>
    ),
    insertion: (
      <>
        <p><strong>时间复杂度:</strong> O(n²) | <strong>空间:</strong> O(1)</p>
        <p><strong>原理:</strong> 将元素插入到已排序部分的正确位置。</p>
        <p><strong>适用:</strong> 小规模或基本有序的数据。</p>
      </>
    ),
    selection: (
      <>
        <p><strong>时间复杂度:</strong> O(n²) | <strong>空间:</strong> O(1)</p>
        <p><strong>原理:</strong> 每次选择最小元素放到前面。</p>
        <p><strong>适用:</strong> 简单但效率较低。</p>
      </>
    ),
    binary: (
      <>
        <p><strong>时间复杂度:</strong> O(log n) | <strong>空间:</strong> O(1)</p>
        <p><strong>原理:</strong> 在有序数组中二分搜索。</p>
        <p><strong>适用:</strong> 有序数据的快速查找。</p>
      </>
    ),
    linear: (
      <>
        <p><strong>时间复杂度:</strong> O(n) | <strong>空间:</strong> O(1)</p>
        <p><strong>原理:</strong> 顺序遍历查找目标。</p>
        <p><strong>适用:</strong> 无序数据或小规模数据。</p>
      </>
    ),
    fibonacci: (
      <>
        <p><strong>时间复杂度:</strong> O(n) | <strong>空间:</strong> O(n)</p>
        <p><strong>原理:</strong> F(n) = F(n-1) + F(n-2)。</p>
        <p><strong>适用:</strong> 动态规划入门，递归优化。</p>
      </>
    ),
    heap: (
      <>
        <p><strong>时间复杂度:</strong> O(n log n) | <strong>空间:</strong> O(1)</p>
        <p><strong>原理:</strong> 构建最大堆，逐个取出最大值。</p>
        <p><strong>适用:</strong> 优先队列，Top K 问题。</p>
      </>
    ),
    'sine-wave': (
      <>
        <p><strong>数学公式:</strong> y = sin(x + t)</p>
        <p><strong>原理:</strong> 正弦函数的波动传播动画。</p>
        <p><strong>应用:</strong> 信号处理、物理波动、音频可视化。</p>
      </>
    ),
    spiral: (
      <>
        <p><strong>数学公式:</strong> x = r·cos(t), y = t, z = r·sin(t)</p>
        <p><strong>原理:</strong> 阿基米德螺旋线的 3D 扩展。</p>
        <p><strong>应用:</strong> 自然界螺旋结构、DNA 双螺旋。</p>
      </>
    ),
    mandelbrot: (
      <>
        <p><strong>数学公式:</strong> z(n+1) = z(n)² + c</p>
        <p><strong>原理:</strong> 复数迭代，展示分形几何之美。</p>
        <p><strong>应用:</strong> 分形艺术、混沌理论、计算机图形学。</p>
      </>
    ),
    lorenz: (
      <>
        <p><strong>微分方程:</strong> 洛伦兹系统</p>
        <p><strong>原理:</strong> 混沌系统的蝴蝶效应。</p>
        <p><strong>应用:</strong> 气象学、混沌理论、非线性动力学。</p>
      </>
    ),
    'wave-3d': (
      <>
        <p><strong>数学公式:</strong> y = sin(√(x²+z²) - t)</p>
        <p><strong>原理:</strong> 二维平面上的径向波动。</p>
        <p><strong>应用:</strong> 水波模拟、声波传播、地震波。</p>
      </>
    ),
    torus: (
      <>
        <p><strong>参数方程:</strong> 环面参数方程</p>
        <p><strong>原理:</strong> 甜甜圈形状的拓扑结构。</p>
        <p><strong>应用:</strong> 拓扑学、计算机图形学、物理场论。</p>
      </>
    ),
    klein: (
      <>
        <p><strong>拓扑结构:</strong> 四维空间的三维投影</p>
        <p><strong>原理:</strong> 没有内外之分的不可定向曲面。</p>
        <p><strong>应用:</strong> 拓扑学、高维几何、理论物理。</p>
      </>
    ),
    kmeans: (
      <>
        <p><strong>算法类型:</strong> 无监督学习 - 聚类</p>
        <p><strong>原理:</strong> 迭代分配数据点到最近的聚类中心，更新中心位置。</p>
        <p><strong>应用:</strong> 客户分群、图像分割、数据压缩。</p>
      </>
    ),
    'linear-regression': (
      <>
        <p><strong>算法类型:</strong> 监督学习 - 回归</p>
        <p><strong>原理:</strong> 通过梯度下降最小化预测值与真实值的误差。</p>
        <p><strong>应用:</strong> 价格预测、趋势分析、风险评估。</p>
      </>
    ),
    'neural-network': (
      <>
        <p><strong>算法类型:</strong> 深度学习</p>
        <p><strong>原理:</strong> 多层神经元通过前向传播和反向传播学习特征。</p>
        <p><strong>应用:</strong> 图像识别、自然语言处理、语音识别。</p>
      </>
    ),
    'gradient-descent': (
      <>
        <p><strong>算法类型:</strong> 优化算法</p>
        <p><strong>原理:</strong> 沿着梯度的反方向迭代更新参数，寻找最优解。</p>
        <p><strong>应用:</strong> 神经网络训练、参数优化、损失函数最小化。</p>
      </>
    ),
    'decision-tree': (
      <>
        <p><strong>算法类型:</strong> 监督学习 - 分类/回归</p>
        <p><strong>原理:</strong> 通过特征分裂构建树形决策结构。</p>
        <p><strong>应用:</strong> 信用评分、医疗诊断、推荐系统。</p>
      </>
    ),
  };

  return descriptions[algorithm] || <p>暂无说明</p>;
}
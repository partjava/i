'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, Tabs } from 'antd';
import MonacoCodeEditor from '../../_shared/components/MonacoCodeEditor';
import StudyTimeTracker from '../../_shared/components/StudyTimeTracker';
import AlgorithmVisualizer from '../../_shared/components/AlgorithmVisualizer';
import InkWashDecoration from '../../_shared/components/InkWashDecoration';

export default function CodeEditorPage() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubble');
  const [activeCategory, setActiveCategory] = useState('全部');
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
  const categories = ['全部', '排序算法', '查找算法', '数学可视化', '机器学习'];
  const filteredAlgorithms = activeCategory === '全部'
    ? algorithms
    : algorithms.filter(a => a.category === activeCategory);

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
          {/* 左侧控制面板 */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-4">
            {/* 算法选择面板（暗曜蓝玻璃科技卡片） */}
            <div
              className="rounded-2xl p-4 border shadow-xl"
              style={{
                background: 'linear-gradient(165deg, #0d1526 0%, #111c33 100%)',
                borderColor: 'rgba(99, 102, 241, 0.25)',
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
                  <span>算法矩阵</span>
                </h3>
                <span className="text-xs font-mono text-indigo-300 bg-indigo-500/15 border border-indigo-400/30 px-2 py-0.5 rounded-full">
                  {filteredAlgorithms.length} 项
                </span>
              </div>

              {/* 分类筛选胶囊 */}
              <div className="flex flex-wrap gap-1.5 mb-3 pb-3 border-b border-white/10">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                      activeCategory === cat
                        ? 'bg-gradient-to-r from-indigo-500 to-sky-500 text-white shadow-md'
                        : 'bg-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/10'
                    }`}
                  >
                    {cat === '排序算法' ? '排序' : cat === '查找算法' ? '查找' : cat === '数学可视化' ? '数学' : cat}
                  </button>
                ))}
              </div>

              {/* 算法列表（去除横向滚动条） */}
              <div className="space-y-1.5 max-h-[380px] overflow-y-auto overflow-x-hidden pr-1 custom-scrollbar">
                {filteredAlgorithms.map(algo => {
                  const active = selectedAlgorithm === algo.id;
                  return (
                    <button
                      key={algo.id}
                      onClick={() => setSelectedAlgorithm(algo.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl transition-all text-sm border ${
                        active
                          ? 'bg-gradient-to-r from-indigo-600/80 to-sky-600/70 text-white border-indigo-400/60 shadow-lg'
                          : 'bg-white/[0.03] text-slate-300 border-white/5 hover:bg-white/[0.08] hover:border-white/15'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                          {algo.icon}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold truncate text-xs sm:text-sm">{algo.name}</div>
                          <div className="text-[11px] mt-0.5 flex items-center gap-2">
                            <span className={active ? 'text-indigo-100/90' : 'text-slate-400'}>{algo.category}</span>
                            <span
                              className={`px-1.5 py-0.2 rounded text-[10px] font-medium border ${
                                algo.difficulty === '简单'
                                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
                                  : algo.difficulty === '中等'
                                  ? 'bg-amber-500/20 text-amber-300 border-amber-400/30'
                                  : 'bg-rose-500/20 text-rose-300 border-rose-400/30'
                              }`}
                            >
                              {algo.difficulty}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 数据输入 - 只在需要时显示 */}
            {currentAlgorithm?.needsData ? (
              <div
                className="rounded-2xl p-4 border shadow-xl"
                style={{
                  background: 'linear-gradient(165deg, #0d1526 0%, #111c33 100%)',
                  borderColor: 'rgba(99, 102, 241, 0.25)',
                }}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <h3 className="text-sm font-bold text-slate-100">输入序列数据</h3>
                  <span className="text-[11px] font-mono text-slate-400">{data.length} 个元素</span>
                </div>
                <textarea
                  value={inputData}
                  onChange={(e) => handleDataChange(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950/80 border border-indigo-500/30 rounded-xl text-slate-100 font-mono text-xs focus:border-sky-400 focus:outline-none"
                  rows={2}
                  placeholder="输入数字，用逗号分隔"
                />
                <button
                  onClick={generateRandomData}
                  className="w-full mt-2.5 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all hover:brightness-110 shadow-md"
                  style={{
                    background: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)',
                  }}
                >
                  🎲 随机生成测试数组
                </button>
              </div>
            ) : (
              <div
                className="rounded-2xl p-4 border shadow-xl text-center"
                style={{
                  background: 'linear-gradient(165deg, #0d1526 0%, #111c33 100%)',
                  borderColor: 'rgba(99, 102, 241, 0.25)',
                }}
              >
                <div className="text-2xl mb-1.5">✨</div>
                <h3 className="text-sm font-bold text-slate-100 mb-1">数学/模型自动采样</h3>
                <p className="text-xs text-slate-400">
                  该可视化由三维数学方程或训练集自动生成空间点云
                </p>
              </div>
            )}

            {/* 速度控制 */}
            <div
              className="rounded-2xl p-4 border shadow-xl"
              style={{
                background: 'linear-gradient(165deg, #0d1526 0%, #111c33 100%)',
                borderColor: 'rgba(99, 102, 241, 0.25)',
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-slate-100">单步演示间隔</h3>
                <span className="text-xs font-mono text-sky-400 font-semibold">{speed} ms / 步</span>
              </div>
              <input
                type="range"
                min="100"
                max="2000"
                step="100"
                value={speed}
                onChange={(e) => setSpeed(parseInt(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>极速 (100ms)</span>
                <span>慢放 (2000ms)</span>
              </div>
            </div>
          </div>

          {/* 右侧可视化主舞台 */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-4">
            <div
              className="rounded-2xl p-4 sm:p-5 border shadow-2xl"
              style={{
                background: 'linear-gradient(165deg, #0b1120 0%, #0f172a 100%)',
                borderColor: 'rgba(99, 102, 241, 0.28)',
              }}
            >
              {/* 顶部算法标题栏 */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/30 to-sky-500/20 border border-indigo-400/40 flex items-center justify-center text-xl shadow-inner">
                    {currentAlgorithm?.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg sm:text-xl font-bold text-white">
                        {currentAlgorithm?.name}
                      </h2>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 font-medium">
                        {currentAlgorithm?.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      3D 实时空间算法推演 · 支持进度条拖拽回放与单步拆解
                    </p>
                  </div>
                </div>
              </div>

              <AlgorithmVisualizer
                algorithm={selectedAlgorithm}
                data={data}
                speed={speed}
              />

              {/* 算法原理与复杂度卡片 */}
              <div
                className="mt-4 p-4 rounded-xl border"
                style={{
                  background: 'rgba(15, 23, 42, 0.65)',
                  borderColor: 'rgba(255, 255, 255, 0.08)',
                }}
              >
                <h3 className="text-sm font-bold text-indigo-300 mb-2 flex items-center gap-1.5">
                  <span>📐</span>
                  <span>核心复杂度与算法原理</span>
                </h3>
                <div className="text-xs sm:text-sm text-slate-300 space-y-1 leading-relaxed">
                  {getAlgorithmDescription(selectedAlgorithm)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-surface-page py-4 md:py-8">
      {/* 水墨画顶部装饰 */}
      <InkWashDecoration variant="landscape" height={160} className="bg-surface-page -mt-4 md:-mt-8" />
      <InkWashDecoration variant="birds" height={50} className="bg-surface-page -mt-2" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        <div className="text-center mb-4 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-content-primary mb-2 md:mb-4 flex items-center justify-center gap-2">
            <Image src="/images/logo-calligraphy-transparent.png" alt="PartJava" width={921} height={601} className="h-8 md:h-12 w-auto inline-block" />
            <span>编程实验室</span>
          </h1>
          <p className="text-base md:text-xl text-content-secondary">
            在线代码编辑 + 3D 算法可视化
          </p>
        </div>

        {/* 标签页 */}
        <Tabs 
          defaultActiveKey="editor" 
          items={tabItems}
          size="large"
          className="bg-surface-raised rounded-lg shadow-lg p-4"
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

      {/* 水墨画底部装饰 */}
      <InkWashDecoration variant="bamboo" height={100} className="bg-surface-page mt-8" />
      <InkWashDecoration variant="landscape" height={200} className="bg-surface-page" />
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
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, Tabs } from 'antd';
import MonacoCodeEditor from '../../_shared/components/MonacoCodeEditor';
import StudyTimeTracker from '../../_shared/components/StudyTimeTracker';
import AlgorithmVisualizer, {
  ALGORITHM_CATEGORIES,
  ALGORITHM_REGISTRY,
  getAlgorithmMeta,
} from '../../_shared/components/AlgorithmVisualizer';
import InkWashDecoration from '../../_shared/components/InkWashDecoration';

export default function CodeEditorPage() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubble');
  const [activeCategory, setActiveCategory] = useState<string>('全部');
  const [inputData, setInputData] = useState('5,3,8,4,2,7,1,6');
  const [data, setData] = useState([5, 3, 8, 4, 2, 7, 1, 6]);
  const [speed, setSpeed] = useState(900);

  const currentAlgorithm = getAlgorithmMeta(selectedAlgorithm);
  const filteredAlgorithms =
    activeCategory === '全部'
      ? ALGORITHM_REGISTRY
      : ALGORITHM_REGISTRY.filter((a) => a.category === activeCategory);

  const handleDataChange = (value: string) => {
    setInputData(value);
    const numbers = value
      .split(',')
      .map((n) => parseInt(n.trim(), 10))
      .filter((n) => !isNaN(n));
    if (numbers.length > 0) {
      setData(numbers);
    }
  };

  const generateRandomData = () => {
    const count = 8;
    const random = Array.from(
      { length: count },
      () => Math.floor(Math.random() * 20) + 1
    );
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
            <MonacoCodeEditor
              height={
                typeof window !== 'undefined' && window.innerWidth < 768
                  ? '500px'
                  : '700px'
              }
            />
          </div>
        </div>
      ),
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

              {/* 分类筛选胶囊（包含新增「数据结构」分类） */}
              <div className="flex flex-wrap gap-1.5 mb-3 pb-3 border-b border-white/10">
                {ALGORITHM_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                      activeCategory === cat.id
                        ? 'bg-gradient-to-r from-indigo-500 to-sky-500 text-white shadow-md'
                        : 'bg-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/10'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* 算法列表 */}
              <div className="space-y-1.5 max-h-[390px] overflow-y-auto overflow-x-hidden pr-1 custom-scrollbar">
                {filteredAlgorithms.map((algo) => {
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
                          <div className="font-semibold truncate text-xs sm:text-sm">
                            {algo.name}
                          </div>
                          <div className="text-[11px] mt-0.5 flex items-center gap-2">
                            <span
                              className={
                                active ? 'text-indigo-100/90' : 'text-slate-400'
                              }
                            >
                              {algo.category}
                            </span>
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
                  <h3 className="text-sm font-bold text-slate-100">
                    输入序列数据
                  </h3>
                  <span className="text-[11px] font-mono text-slate-400">
                    {data.length} 个元素
                  </span>
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
                    background:
                      'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)',
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
                <h3 className="text-sm font-bold text-slate-100 mb-1">
                  三维空间自动建模
                </h3>
                <p className="text-xs text-slate-400">
                  该算法由三维流形方程、图拓扑或机器学习特征集自动生成空间场景
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
                <h3 className="text-sm font-bold text-slate-100">
                  单步演示间隔
                </h3>
                <span className="text-xs font-mono text-sky-400 font-semibold">
                  {speed} ms / 步
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="2000"
                step="100"
                value={speed}
                onChange={(e) => setSpeed(parseInt(e.target.value, 10))}
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
                      3D 交互式空间推演 · 支持鼠标旋转/滚轮缩放、最佳机位自动适配与时间轴回放
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
                <h3 className="text-sm font-bold text-indigo-300 mb-2.5 flex items-center gap-1.5">
                  <span>📐</span>
                  <span>核心复杂度与算法原理</span>
                </h3>
                <div className="text-xs sm:text-sm text-slate-300 space-y-1.5 leading-relaxed">
                  <p>
                    <strong className="text-sky-300">复杂度与数学特征：</strong>{' '}
                    {currentAlgorithm.complexity}
                  </p>
                  <p>
                    <strong className="text-indigo-300">三维推演原理：</strong>{' '}
                    {currentAlgorithm.principle}
                  </p>
                  <p>
                    <strong className="text-emerald-300">典型工程场景：</strong>{' '}
                    {currentAlgorithm.scenario}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-surface-page py-4 md:py-8">
      {/* 水墨画顶部装饰 */}
      <InkWashDecoration
        variant="landscape"
        height={160}
        className="bg-surface-page -mt-4 md:-mt-8"
      />
      <InkWashDecoration
        variant="birds"
        height={50}
        className="bg-surface-page -mt-2"
      />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        <div className="text-center mb-4 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-content-primary mb-2 md:mb-4 flex items-center justify-center gap-2">
            <Image
              src="/images/logo-calligraphy-transparent.png"
              alt="PartJava"
              width={921}
              height={601}
              className="h-8 md:h-12 w-auto inline-block"
            />
            <span>编程实验室</span>
          </h1>
          <p className="text-base md:text-xl text-content-secondary">
            在线代码编辑 + 3D 算法可视化（31 种核心算法与三维流形）
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
            <h3 className="text-sm md:text-lg font-semibold mb-1 md:mb-2">
              语法高亮
            </h3>
            <p className="text-xs md:text-sm text-gray-600">
              VS Code 级别的语法高亮
            </p>
          </Card>

          <Card className="text-center p-3 md:p-4">
            <div className="text-2xl md:text-3xl mb-2 md:mb-4">⚡</div>
            <h3 className="text-sm md:text-lg font-semibold mb-1 md:mb-2">
              智能补全
            </h3>
            <p className="text-xs md:text-sm text-gray-600">
              代码自动补全、错误检测
            </p>
          </Card>

          <Card className="text-center p-3 md:p-4">
            <div className="text-2xl md:text-3xl mb-2 md:mb-4">🎯</div>
            <h3 className="text-sm md:text-lg font-semibold mb-1 md:mb-2">
              3D 可视化
            </h3>
            <p className="text-xs md:text-sm text-gray-600">
              31 种沉浸式 3D 算法推演
            </p>
          </Card>

          <Card className="text-center p-3 md:p-4">
            <div className="text-2xl md:text-3xl mb-2 md:mb-4">💾</div>
            <h3 className="text-sm md:text-lg font-semibold mb-1 md:mb-2">
              多种操作
            </h3>
            <p className="text-xs md:text-sm text-gray-600">
              保存、下载、分享、模板
            </p>
          </Card>
        </div>
      </div>

      {/* 水墨画底部装饰 */}
      <InkWashDecoration
        variant="bamboo"
        height={100}
        className="bg-surface-page mt-8"
      />
      <InkWashDecoration
        variant="landscape"
        height={200}
        className="bg-surface-page"
      />
    </div>
  );
}

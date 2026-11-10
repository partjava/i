'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MonacoCodeEditor from '../../_shared/components/MonacoCodeEditor';
import StudyTimeTracker from '../../_shared/components/StudyTimeTracker';
import AlgorithmVisualizer, {
  ALGORITHM_CATEGORIES,
  ALGORITHM_REGISTRY,
  getAlgorithmMeta,
} from '../../_shared/components/AlgorithmVisualizer';
import MathFormulaBox from '../../_shared/components/visualizer/MathFormulaBox';
import {
  Terminal,
  Cpu,
  Sparkles,
  ShieldCheck,
  Zap,
  Layers,
  Code2,
  Box,
  Compass,
  Network,
} from 'lucide-react';

export default function CodeEditorPage() {
  const [activeTab, setActiveTab] = useState<'editor' | 'visualizer'>('editor');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubble');
  const [activeCategory, setActiveCategory] = useState<string>('全部');
  const [inputData, setInputData] = useState('5,3,8,4,2,7,1,6');
  const [data, setData] = useState([5, 3, 8, 4, 2, 7, 1, 6]);
  const [speed, setSpeed] = useState(900);
  const [injectedCode, setInjectedCode] = useState<string | undefined>(undefined);
  const [injectedLang, setInjectedLang] = useState<string>('java');

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

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 relative overflow-x-clip py-4 sm:py-8 selection:bg-indigo-500/20 selection:text-indigo-700">
      {/* 现代极简浅色背景微光与网格装饰 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(99,102,241,0.08),transparent)] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-sky-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-indigo-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f060_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f060_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />

      <div
        className={`relative z-10 mx-auto px-3 sm:px-5 lg:px-6 transition-all duration-300 ${
          activeTab === 'visualizer' ? 'max-w-[1720px]' : 'max-w-7xl'
        }`}
      >
        {/* 顶部 Hero 科技工坊主标头（浅色背景适配） */}
        <div className="text-center pt-2 pb-6 md:pb-8">
          {/* 状态徽标小胶囊 */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50/90 border border-indigo-200/80 text-indigo-700 text-xs font-mono font-semibold mb-3 shadow-sm backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>CLOUD DEV STUDIO · DOCKER SANDBOX · 3D MANIFOLDS</span>
          </div>

          <div className="flex items-center justify-center gap-3 mb-2 sm:mb-3">
            <Image
              src="/images/logo-calligraphy-transparent.png"
              alt="PartJava"
              width={921}
              height={601}
              priority
              className="h-9 sm:h-12 w-auto inline-block drop-shadow-sm"
            />
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800 bg-clip-text text-transparent">
              极客代码工坊
            </h1>
          </div>

          <p className="text-xs sm:text-base text-slate-600 max-w-2xl mx-auto font-normal">
            轻量级在线云 IDE · 毫秒级多语言 Docker 隔离沙箱 · 31 种 3D 算法空间推演 · JVM 逐帧变量回放
          </p>

          {/* 核心特性标签行（浅色卡片化呈现） */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3.5 text-xs text-slate-700 font-medium">
            <span className="px-2.5 py-1 rounded-xl bg-white border border-slate-200/90 shadow-sm flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Docker 容器硬隔离</span>
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-white border border-slate-200/90 shadow-sm flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Monaco 智能补全</span>
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-white border border-slate-200/90 shadow-sm flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-sky-600" />
              <span>JVM 栈帧变量回放</span>
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-white border border-slate-200/90 shadow-sm flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>禾桔 AI 诊断修复</span>
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-white border border-slate-200/90 shadow-sm flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-indigo-600" />
              <span>31 种 3D 算法流形 + 同步代码动画</span>
            </span>
            <Link
              href="/knowledge-graph"
              className="px-2.5 py-1 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Network className="w-3.5 h-3.5 text-indigo-600" />
              <span>🌐 全栈知识图谱 →</span>
            </Link>
          </div>
        </div>

        {/* 核心模式切换器（现代极客分段选择器） */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-200/70 border border-slate-300/80 backdrop-blur-md shadow-sm">
            <button
              type="button"
              onClick={() => setActiveTab('editor')}
              className={`flex items-center gap-2.5 px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 ${
                activeTab === 'editor'
                  ? 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-600 text-white shadow-md shadow-indigo-900/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
              }`}
            >
              <Terminal className="w-4 h-4 text-sky-200" />
              <span>💻 极客代码工坊</span>
              <span className="hidden sm:inline-block text-[11px] font-mono px-2 py-0.5 rounded-full bg-black/20 text-indigo-100">
                IDE Studio
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('visualizer')}
              className={`flex items-center gap-2.5 px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 ${
                activeTab === 'visualizer'
                  ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-600 text-white shadow-md shadow-purple-900/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
              }`}
            >
              <Box className="w-4 h-4 text-purple-200" />
              <span>🌌 3D 算法演进矩阵</span>
              <span className="hidden sm:inline-block text-[11px] font-mono px-2 py-0.5 rounded-full bg-black/20 text-purple-100">
                31 种算法
              </span>
            </button>
          </div>
        </div>

        {/* 模式一：极客代码工坊 (IDE Studio) */}
        {activeTab === 'editor' && (
          <div className="space-y-4">
            {/* 工坊辅助工具条（左侧沙箱就绪提示 + 右侧沉浸式伴学计时 HUD） */}
            <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm backdrop-blur-md flex-wrap gap-2.5">
              <div className="flex items-center gap-2.5 text-xs text-slate-700">
                <span className="flex items-center gap-1.5 font-mono text-emerald-600 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Docker Linux Sandbox</span>
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-500 hidden md:inline">
                  纳秒级热重载 · 快捷键 <kbd className="text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-300 font-mono text-[10px] font-semibold">Ctrl+Enter</kbd> 编译执行
                </span>
              </div>

              {/* 沉浸式伴学时钟（HUD 紧凑形态，零占用主画布横向宽度） */}
              <div className="ml-auto">
                <StudyTimeTracker
                  variant="hud"
                  category="编程"
                  technology="代码编辑器"
                  autoStart={true}
                  showControls={true}
                />
              </div>
            </div>

            {/* Monaco 编辑器暗黑专业视窗（全宽主画布） */}
            <MonacoCodeEditor
              height="700px"
              externalCode={injectedCode}
              externalLanguage={injectedLang}
            />
          </div>
        )}

        {/* 模式二：3D 算法演进矩阵 (Visualizer Matrix) */}
        {activeTab === 'visualizer' && (
          <div className="flex flex-col lg:flex-row gap-4 xl:gap-5 items-start">
            {/* 左侧控制与算法列表面板（Sticky 视口悬浮固定，上下滑动页面时始终完整保留在屏幕左侧） */}
            <div className="w-full lg:w-[275px] xl:w-[290px] shrink-0 lg:sticky lg:top-[74px] lg:self-start lg:max-h-[calc(100vh-5.2rem)] flex flex-col gap-3">
              {/* 算法选择卡片 */}
              <div
                className="flex-1 min-h-0 flex flex-col rounded-2xl p-3.5 border shadow-xl"
                style={{
                  background: 'linear-gradient(165deg, #0d1526 0%, #111c33 100%)',
                  borderColor: 'rgba(99, 102, 241, 0.25)',
                }}
              >
                <div className="flex items-center justify-between mb-2.5 shrink-0">
                  <h3 className="text-sm sm:text-base font-bold text-slate-100 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
                    <span>算法流形矩阵</span>
                  </h3>
                  <span className="text-xs font-mono text-indigo-300 bg-indigo-500/15 border border-indigo-400/30 px-2 py-0.5 rounded-full">
                    {filteredAlgorithms.length} 项
                  </span>
                </div>

                {/* 分类筛选胶囊 */}
                <div className="flex flex-wrap gap-1.5 mb-2.5 pb-2.5 border-b border-white/10 shrink-0">
                  {ALGORITHM_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium transition-all ${
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
                <div className="flex-1 min-h-[170px] max-h-[280px] xl:max-h-[330px] space-y-1.5 overflow-y-auto overflow-x-hidden pr-1 custom-scrollbar">
                  {filteredAlgorithms.map((algo) => {
                    const active = selectedAlgorithm === algo.id;
                    return (
                      <button
                        key={algo.id}
                        onClick={() => setSelectedAlgorithm(algo.id)}
                        className={`w-full text-left px-2.5 py-2 rounded-xl transition-all text-sm border ${
                          active
                            ? 'bg-gradient-to-r from-indigo-600/80 to-sky-600/70 text-white border-indigo-400/60 shadow-lg'
                            : 'bg-white/[0.03] text-slate-300 border-white/5 hover:bg-white/[0.08] hover:border-white/15'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-base w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                            {algo.icon}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold truncate text-xs sm:text-[13px]">
                              {algo.name}
                            </div>
                            <div className="text-[10.5px] mt-0.5 flex items-center gap-1.5">
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

              {/* 数据输入 */}
              {currentAlgorithm?.needsData ? (
                <div
                  className="shrink-0 rounded-2xl p-3.5 border shadow-xl"
                  style={{
                    background: 'linear-gradient(165deg, #0d1526 0%, #111c33 100%)',
                    borderColor: 'rgba(99, 102, 241, 0.25)',
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-100">
                      输入序列数据
                    </h3>
                    <span className="text-[11px] font-mono text-slate-400">
                      {data.length} 个元素
                    </span>
                  </div>
                  <textarea
                    value={inputData}
                    onChange={(e) => handleDataChange(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-slate-950/80 border border-indigo-500/30 rounded-xl text-slate-100 font-mono text-xs focus:border-sky-400 focus:outline-none"
                    rows={2}
                    placeholder="输入数字，用逗号分隔"
                  />
                  <button
                    onClick={generateRandomData}
                    className="w-full mt-2 px-3 py-1.5 rounded-xl text-xs font-bold text-white transition-all hover:brightness-110 shadow-md"
                    style={{
                      background:
                        'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)',
                    }}
                  >
                    🎲 随机生成测试序列
                  </button>
                </div>
              ) : (
                <div
                  className="shrink-0 rounded-2xl p-3.5 border shadow-xl text-center"
                  style={{
                    background: 'linear-gradient(165deg, #0d1526 0%, #111c33 100%)',
                    borderColor: 'rgba(99, 102, 241, 0.25)',
                  }}
                >
                  <div className="text-xl mb-1">✨</div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-100 mb-0.5">
                    三维空间自动建模
                  </h3>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    该算法由三维流形方程、图拓扑或动态规划状态集自动生成推演空间
                  </p>
                </div>
              )}

              {/* 演示速度控制 */}
              <div
                className="shrink-0 rounded-2xl p-3.5 border shadow-xl"
                style={{
                  background: 'linear-gradient(165deg, #0d1526 0%, #111c33 100%)',
                  borderColor: 'rgba(99, 102, 241, 0.25)',
                }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-100">
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
                <div className="flex justify-between text-[10.5px] text-slate-400 mt-1">
                  <span>极速 (100ms)</span>
                  <span>慢放 (2000ms)</span>
                </div>
              </div>
            </div>

            {/* 右侧：3D 主舞台与完整代码双联舱 + 深度数学理论 */}
            <div className="flex-1 min-w-0 w-full space-y-4">
              <div
                className="rounded-2xl p-4 sm:p-5 border shadow-2xl"
                style={{
                  background: 'linear-gradient(165deg, #0b1120 0%, #0f172a 100%)',
                  borderColor: 'rgba(99, 102, 241, 0.28)',
                }}
              >
                {/* 顶部标题栏 */}
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
                  onOpenInEditor={(codeToLoad, langToLoad) => {
                    setInjectedCode(codeToLoad);
                    setInjectedLang(langToLoad);
                    setActiveTab('editor');
                  }}
                />

                {/* 算法深度理论与数学建模矩阵 */}
                <div
                  className="mt-5 p-4 sm:p-5 rounded-2xl border space-y-4"
                  style={{
                    background: 'rgba(12, 19, 36, 0.85)',
                    borderColor: 'rgba(99, 102, 241, 0.22)',
                  }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
                    <h3 className="text-sm sm:text-base font-bold text-indigo-200 flex items-center gap-2">
                      <span>📐</span>
                      <span>深度数学原理与四层结构剖析（KaTeX 高清公式排版）</span>
                    </h3>
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-sky-500/15 text-sky-300 border border-sky-400/30">
                      {currentAlgorithm.complexity}
                    </span>
                  </div>

                  {/* 核心数学方程（全宽高清 KaTeX 公式与符号释义卡片） */}
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-sky-500/30 shadow-lg">
                    <div className="text-xs font-bold text-sky-400 mb-2.5 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <span>🧮</span>
                        <span>核心数学方程 / 状态不变式与符号释义</span>
                      </span>
                      <span className="text-[10px] font-mono text-indigo-300 bg-indigo-500/15 px-2 py-0.5 rounded border border-indigo-400/25">
                        KaTeX Mathematical Engine
                      </span>
                    </div>
                    <MathFormulaBox
                      algorithmId={selectedAlgorithm}
                      fallbackText={currentAlgorithm.mathFormula}
                    />
                  </div>

                  {/* 三维几何与空间映射原理 */}
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-indigo-500/25">
                    <div className="text-xs font-bold text-indigo-400 mb-1 flex items-center gap-1.5">
                      <span>🌌</span>
                      <span>三维几何与空间映射原理</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {currentAlgorithm.principle}
                    </p>
                  </div>

                  {/* 四层深度理论递进拆解 */}
                  {currentAlgorithm.deepLayers && currentAlgorithm.deepLayers.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                        <span>🔬</span>
                        <span>由浅入深 · 四层核心机制拆解</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        {currentAlgorithm.deepLayers.map((layerText, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-indigo-400/40 transition-all flex items-start gap-2.5"
                          >
                            <span className="w-5 h-5 rounded-md bg-indigo-500/25 border border-indigo-400/40 text-indigo-200 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                              L{idx + 1}
                            </span>
                            <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed">
                              {layerText}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 工业级底层实现与典型应用 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/25">
                      <div className="text-xs font-bold text-emerald-300 mb-1 flex items-center gap-1.5">
                        <span>⚙️</span>
                        <span>工业级底层优化与实现细节</span>
                      </div>
                      <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed">
                        {currentAlgorithm.implementation}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/25">
                      <div className="text-xs font-bold text-purple-300 mb-1 flex items-center gap-1.5">
                        <span>🚀</span>
                        <span>典型工业与科研应用场景</span>
                      </div>
                      <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed">
                        {currentAlgorithm.scenario}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 底部 Bento Grid: 四大核心极客架构支柱（浅色高质感 Bento 呈现） */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Docker 容器沙箱隔离 */}
          <div className="group relative rounded-2xl p-4 sm:p-5 bg-white border border-slate-200/90 hover:border-emerald-400/60 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center text-lg mb-3 shadow-inner group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                <span>Docker 容器沙箱隔离</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                毫秒级独立轻量容器隔离，基于 Linux cgroups v2 进行 CPU 与内存配额防护，多语言安全编译无污染。
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-100 text-[10px] font-mono font-medium">
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                cgroups v2
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                网络硬隔离
              </span>
            </div>
          </div>

          {/* Card 2: Monaco 智能感知引擎 */}
          <div className="group relative rounded-2xl p-4 sm:p-5 bg-white border border-slate-200/90 hover:border-sky-400/60 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center text-lg mb-3 shadow-inner group-hover:scale-105 transition-transform">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                <span>Monaco 智能代码引擎</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                VS Code 同源核心编辑器，支持智能感知语法高亮、自动补全、多光标编辑与全量键盘快捷键映射。
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-100 text-[10px] font-mono font-medium">
              <span className="px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200">
                IntelliSense
              </span>
              <span className="px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200">
                快捷键映射
              </span>
            </div>
          </div>

          {/* Card 3: JVM 栈帧与变量演进 */}
          <div className="group relative rounded-2xl p-4 sm:p-5 bg-white border border-slate-200/90 hover:border-purple-400/60 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center text-lg mb-3 shadow-inner group-hover:scale-105 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                <span>JVM 栈帧与变量回放</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                独创运行时执行状态回放，单步时间轴回溯局部变量表、操作数栈与空间拓扑结构。
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-100 text-[10px] font-mono font-medium">
              <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                栈帧拓扑
              </span>
              <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                单步断点回溯
              </span>
            </div>
          </div>

          {/* Card 4: 禾桔 AI 诊断与热修复 */}
          <div className="group relative rounded-2xl p-4 sm:p-5 bg-white border border-slate-200/90 hover:border-amber-400/60 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center text-lg mb-3 shadow-inner group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                <span>禾桔 AI 诊断与热修复</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                报错信息自动捕获，大模型深度分析异常根因并生成高精度 Diff 补丁，一键平滑合并代码。
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-100 text-[10px] font-mono font-medium">
              <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                堆栈根因溯源
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                一键 Diff 补丁
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

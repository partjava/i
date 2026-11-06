'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import {
  extractNoteInsightsLocally,
  GraphNodeCategory,
  KnowledgeGraphNode,
  NoteInsightsData,
} from '@shared/lib/note-knowledge-extractor';
import { emitPetCompanionEvent } from '@shared/lib/pet-companion-bus';

const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false });

interface NoteKnowledgeStudioProps {
  noteId: string;
  title: string;
  content: string;
  category?: string;
  technology?: string;
  tags?: string[];
  defaultTab?: 'graph' | 'flashcards';
  onScrollToSection?: (sectionHeading: string) => void;
}

const CATEGORY_META: Record<
  GraphNodeCategory,
  { label: string; color: string; bg: string; border: string }
> = {
  root: {
    label: '核心主题',
    color: '#4f46e5',
    bg: 'bg-indigo-50 text-indigo-700',
    border: 'border-indigo-200',
  },
  chapter: {
    label: '章节模块',
    color: '#0284c7',
    bg: 'bg-sky-50 text-sky-700',
    border: 'border-sky-200',
  },
  concept: {
    label: '核心概念',
    color: '#059669',
    bg: 'bg-emerald-50 text-emerald-700',
    border: 'border-emerald-200',
  },
  code: {
    label: '代码/API',
    color: '#d97706',
    bg: 'bg-amber-50 text-amber-700',
    border: 'border-amber-200',
  },
  pitfall: {
    label: '考点/辨析',
    color: '#e11d48',
    bg: 'bg-rose-50 text-rose-700',
    border: 'border-rose-200',
  },
};

export default function NoteKnowledgeStudio({
  noteId,
  title,
  content,
  category,
  technology,
  tags = [],
  defaultTab = 'graph',
  onScrollToSection,
}: NoteKnowledgeStudioProps) {
  const [activeTab, setActiveTab] = useState<'graph' | 'flashcards'>(defaultTab);
  const [graphLayout, setGraphLayout] = useState<'force' | 'tree'>('force');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [insights, setInsights] = useState<NoteInsightsData>(() =>
    extractNoteInsightsLocally(title, content, category, technology, tags)
  );
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node_root');

  // 闪卡状态
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [masteryMap, setMasteryMap] = useState<Record<string, 'mastered' | 'review'>>({});

  // 当笔记内容变化时初始化本地 AST 图谱与闪卡
  useEffect(() => {
    const localData = extractNoteInsightsLocally(title, content, category, technology, tags);
    setInsights(localData);
    if (localData.nodes.length > 0) {
      setSelectedNodeId(localData.nodes[0].id);
    }
    setCardIndex(0);
    setIsFlipped(false);
    setShowHint(false);
  }, [title, content, category, technology]);

  // 读取本地持久化的闪卡掌握进度
  useEffect(() => {
    if (!noteId || typeof window === 'undefined') return;
    try {
      const saved = localStorage.getItem(`partjava_note_flashcards_${noteId}`);
      if (saved) {
        setMasteryMap(JSON.parse(saved));
      }
    } catch {}
  }, [noteId]);

  const updateCardMastery = (cardId: string, status: 'mastered' | 'review') => {
    setMasteryMap(prev => {
      const next = { ...prev, [cardId]: status };
      try {
        localStorage.setItem(`partjava_note_flashcards_${noteId}`, JSON.stringify(next));
      } catch {}

      // 检查是否全部闪卡已掌握
      const totalCards = insights.flashcards.length;
      const newlyMasteredCount = insights.flashcards.filter(c => next[c.id] === 'mastered').length;
      if (status === 'mastered' && newlyMasteredCount === totalCards && totalCards > 0) {
        emitPetCompanionEvent({
          type: 'celebrate',
          title: '笔记考点全掌握！',
          message: `太厉害了喵！笔记「${title}」的所有 3D 闪卡考点已全部攻克，记忆力拉满！`,
          mood: 'happy',
          speak: true,
        });
      }

      return next;
    });
    // 自动切到下一张未掌握或顺位闪卡
    if (insights.flashcards.length > 1) {
      setTimeout(() => {
        setIsFlipped(false);
        setShowHint(false);
        setCardIndex(prev => (prev + 1) % insights.flashcards.length);
      }, 240);
    }
  };

  // 调用 AI 深度重构图谱与闪卡
  const handleAiReconstruct = async () => {
    if (aiLoading) return;
    setAiLoading(true);
    try {
      const resp = await fetch('/api/ai/note-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          category,
          technology,
          tags,
        }),
      });
      const json = await resp.json();
      if (json?.success && json.data) {
        setInsights(json.data);
        if (json.data.nodes?.length > 0) {
          setSelectedNodeId(json.data.nodes[0].id);
        }
        setCardIndex(0);
        setIsFlipped(false);
        setShowHint(false);
      }
    } catch {
      // 保底保持当前图谱
    } finally {
      setAiLoading(false);
    }
  };

  const selectedNode: KnowledgeGraphNode | undefined = useMemo(() => {
    return (
      insights.nodes.find(n => n.id === selectedNodeId) ||
      insights.nodes[0]
    );
  }, [insights.nodes, selectedNodeId]);

  const relatedLinks = useMemo(() => {
    if (!selectedNode) return [];
    const nodeMap = new Map(insights.nodes.map(n => [n.id, n]));
    return insights.links
      .filter(l => l.source === selectedNode.id || l.target === selectedNode.id)
      .map(l => {
        const isOutgoing = l.source === selectedNode.id;
        const otherId = isOutgoing ? l.target : l.source;
        const otherNode = nodeMap.get(otherId);
        return {
          relation: l.relation,
          direction: isOutgoing ? '→' : '←',
          otherNode,
        };
      })
      .filter(item => !!item.otherNode);
  }, [insights.links, insights.nodes, selectedNode]);

  // ECharts 配置：支持「力导向星系网络」与「层级思维导图」双视图切换
  const chartOption = useMemo(() => {
    const categories: GraphNodeCategory[] = ['root', 'chapter', 'concept', 'code', 'pitfall'];

    if (graphLayout === 'tree') {
      const decorateTreeNode = (node: any): any => {
        const cat: GraphNodeCategory = node.category || 'concept';
        const meta = CATEGORY_META[cat] || CATEGORY_META.concept;
        return {
          name: node.name,
          summary: node.summary,
          category: cat,
          itemStyle: {
            color: meta.color,
            borderColor: '#ffffff',
            borderWidth: 2,
          },
          label: {
            color: '#1e293b',
            backgroundColor: '#f8fafc',
            borderColor: '#e2e8f0',
            borderWidth: 1,
            borderRadius: 6,
            padding: [4, 8],
            fontSize: cat === 'root' ? 13 : 12,
            fontWeight: cat === 'root' || cat === 'chapter' ? 'bold' : 'normal',
          },
          children: Array.isArray(node.children)
            ? node.children.map(decorateTreeNode)
            : [],
        };
      };

      return {
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(15, 23, 42, 0.92)',
          borderColor: 'rgba(99, 102, 241, 0.4)',
          textStyle: { color: '#f8fafc', fontSize: 12 },
          formatter: (params: any) => {
            const d = params.data || {};
            const meta = CATEGORY_META[(d.category as GraphNodeCategory) || 'concept'];
            return `<div style="max-width:260px;white-space:normal;line-height:1.5">
              <div style="font-weight:700;margin-bottom:4px;color:#a5b4fc">${d.name || ''} <span style="font-size:11px;opacity:0.8">[${meta?.label || '节点'}]</span></div>
              <div style="font-size:12px;color:#e2e8f0">${d.summary || '点击节点查看详细解析'}</div>
            </div>`;
          },
        },
        series: [
          {
            type: 'tree',
            data: [decorateTreeNode(insights.tree)],
            top: '6%',
            left: '12%',
            bottom: '6%',
            right: '20%',
            symbolSize: 12,
            orient: 'LR',
            edgeShape: 'curve',
            edgeForkPosition: '50%',
            initialTreeDepth: 3,
            roam: true,
            expandAndCollapse: true,
            animationDuration: 450,
            animationDurationUpdate: 600,
            lineStyle: {
              color: '#94a3b8',
              width: 1.6,
              curveness: 0.45,
            },
          },
        ],
      };
    }

    // 默认：力导向星系知识图谱 (Force-Directed Knowledge Graph)
    return {
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(15, 23, 42, 0.92)',
        borderColor: 'rgba(99, 102, 241, 0.4)',
        textStyle: { color: '#f8fafc', fontSize: 12 },
        formatter: (params: any) => {
          if (params.dataType === 'edge') {
            return `<div style="font-size:12px">关系：<b>${params.data?.relation || '关联'}</b></div>`;
          }
          const d = params.data || {};
          const meta = CATEGORY_META[(d.rawCategory as GraphNodeCategory) || 'concept'];
          return `<div style="max-width:260px;white-space:normal;line-height:1.5">
            <div style="font-weight:700;margin-bottom:4px;color:#a5b4fc">${d.name || ''} <span style="font-size:11px;opacity:0.85">[${meta?.label || '概念'}]</span></div>
            <div style="font-size:12px;color:#e2e8f0">${d.summary || ''}</div>
          </div>`;
        },
      },
      legend: {
        top: 8,
        left: 'center',
        itemWidth: 12,
        itemHeight: 12,
        textStyle: { color: '#475569', fontSize: 12 },
        data: categories.map(c => CATEGORY_META[c].label),
      },
      series: [
        {
          type: 'graph',
          layout: 'force',
          roam: true,
          draggable: true,
          focusNodeAdjacency: true,
          categories: categories.map(c => ({
            name: CATEGORY_META[c].label,
            itemStyle: { color: CATEGORY_META[c].color },
          })),
          data: insights.nodes.map(n => {
            const isSelected = n.id === selectedNode?.id;
            const catIdx = categories.indexOf(n.category);
            return {
              id: n.id,
              name: n.name,
              summary: n.summary,
              rawCategory: n.category,
              category: catIdx >= 0 ? catIdx : 2,
              symbolSize: isSelected ? n.symbolSize + 8 : n.symbolSize,
              itemStyle: {
                color: CATEGORY_META[n.category]?.color || '#059669',
                borderColor: isSelected ? '#1e1b4b' : '#ffffff',
                borderWidth: isSelected ? 3.5 : 2,
                shadowBlur: isSelected ? 18 : 8,
                shadowColor: isSelected
                  ? 'rgba(79, 70, 229, 0.55)'
                  : 'rgba(15, 23, 42, 0.12)',
              },
              label: {
                show: true,
                position: n.category === 'root' ? 'inside' : 'bottom',
                color: n.category === 'root' ? '#ffffff' : '#1e293b',
                fontSize: n.category === 'root' ? 12 : 11,
                fontWeight: n.category === 'root' || n.category === 'chapter' ? 'bold' : 'normal',
                backgroundColor:
                  n.category === 'root' ? 'transparent' : 'rgba(255,255,255,0.86)',
                padding: n.category === 'root' ? [0, 0] : [2, 5],
                borderRadius: 4,
              },
            };
          }),
          links: insights.links.map(l => ({
            source: l.source,
            target: l.target,
            relation: l.relation,
            label: {
              show: true,
              formatter: l.relation,
              fontSize: 10,
              color: '#64748b',
              backgroundColor: 'rgba(248, 250, 252, 0.85)',
              padding: [1, 4],
              borderRadius: 3,
            },
            lineStyle: {
              color: '#94a3b8',
              width: 1.6,
              curveness: 0.16,
              opacity: 0.82,
            },
          })),
          force: {
            repulsion: 420,
            edgeLength: [85, 155],
            gravity: 0.08,
            layoutAnimation: true,
          },
          emphasis: {
            focus: 'adjacency',
            lineStyle: {
              width: 3,
              color: '#4f46e5',
            },
          },
        },
      ],
    };
  }, [graphLayout, insights, selectedNode?.id]);

  const handleChartClick = useCallback(
    (params: any) => {
      if (params?.dataType === 'node' && params.data) {
        if (params.data.id) {
          setSelectedNodeId(String(params.data.id));
        } else if (params.data.name) {
          const match = insights.nodes.find(n => n.name === params.data.name);
          if (match) setSelectedNodeId(match.id);
        }
      }
    },
    [insights.nodes]
  );

  const onEvents = useMemo(
    () => ({
      click: handleChartClick,
    }),
    [handleChartClick]
  );

  const currentCard = insights.flashcards[cardIndex] || insights.flashcards[0];
  const masteredCount = insights.flashcards.filter(
    c => masteryMap[c.id] === 'mastered'
  ).length;

  return (
    <div
      className={`${
        isFullscreen
          ? 'fixed inset-4 z-50 bg-white shadow-2xl flex flex-col'
          : 'mb-8 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 shadow-sm'
      } rounded-2xl border border-slate-200/90 overflow-hidden transition-all duration-300`}
    >
      {/* 顶部控制栏 */}
      <div className="px-5 py-3.5 bg-white/90 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('graph')}
            className={`px-3.5 py-1.5 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'graph'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            <span>🌌</span>
            <span>可视化知识图谱</span>
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full ${
                activeTab === 'graph'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {insights.nodes.length} 节点
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('flashcards')}
            className={`px-3.5 py-1.5 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'flashcards'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            <span>🃏</span>
            <span>3D 记忆闪卡自测</span>
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full ${
                activeTab === 'flashcards'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-emerald-100 text-emerald-700'
              }`}
            >
              {masteredCount}/{insights.flashcards.length} 已掌握
            </span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === 'graph' && (
            <div className="inline-flex rounded-xl bg-slate-100 p-1 text-xs font-medium">
              <button
                type="button"
                onClick={() => setGraphLayout('force')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  graphLayout === 'force'
                    ? 'bg-white text-indigo-600 shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                力导向星系图
              </button>
              <button
                type="button"
                onClick={() => setGraphLayout('tree')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  graphLayout === 'tree'
                    ? 'bg-white text-indigo-600 shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                层级思维导图
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={handleAiReconstruct}
            disabled={aiLoading}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:opacity-95 disabled:opacity-60 transition-all flex items-center gap-1.5 shadow-sm"
            title="调用 DeepSeek 大模型深度分析全文隐藏考点与跨章节关联"
          >
            {aiLoading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                <span>AI 深度提炼中...</span>
              </>
            ) : (
              <>
                <span>✨</span>
                <span>{insights.source === 'ai' ? 'AI 重新提炼' : 'AI 深度重构图谱'}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors text-xs px-2.5 font-medium"
            title={isFullscreen ? '退出全屏' : '全屏展开'}
          >
            {isFullscreen ? '收起全屏' : '全屏视图'}
          </button>
        </div>
      </div>

      {/* 主体内容区：知识图谱 vs 3D 记忆闪卡 */}
      {activeTab === 'graph' ? (
        <div className={`grid grid-cols-1 lg:grid-cols-12 ${isFullscreen ? 'flex-1 min-h-0' : ''}`}>
          {/* 左侧交互式图谱画布 */}
          <div className="lg:col-span-8 relative bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:18px_18px] border-b lg:border-b-0 lg:border-r border-slate-200/80">
            <div className="absolute top-3 left-4 z-10 flex items-center gap-2 pointer-events-none">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/90 border border-slate-200 text-slate-600 shadow-sm">
                {insights.source === 'ai' ? '🤖 DeepSeek 语义知识网络' : '⚡ 实时结构化知识图谱'} · 支持滚轮缩放与拖拽节点
              </span>
            </div>

            <div style={{ height: isFullscreen ? 'calc(100vh - 110px)' : 430, width: '100%' }}>
              <ReactECharts
                option={chartOption}
                style={{ height: '100%', width: '100%' }}
                onEvents={onEvents}
                notMerge={true}
              />
            </div>
          </div>

          {/* 右侧节点知识详情面板 */}
          <div className="lg:col-span-4 p-5 bg-white flex flex-col justify-between">
            {selectedNode ? (
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                      CATEGORY_META[selectedNode.category]?.bg
                    } ${CATEGORY_META[selectedNode.category]?.border}`}
                  >
                    {CATEGORY_META[selectedNode.category]?.label || '核心概念'}
                  </span>
                  {selectedNode.sectionHeading && onScrollToSection && (
                    <button
                      type="button"
                      onClick={() => {
                        if (isFullscreen) setIsFullscreen(false);
                        onScrollToSection(selectedNode.sectionHeading!);
                      }}
                      className="text-xs font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1 bg-indigo-50 px-2.5 py-1 rounded-lg transition-colors"
                    >
                      <span>📍</span>
                      <span>定位原文段落</span>
                    </button>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">{selectedNode.name}</h3>

                <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100 mb-4">
                  {selectedNode.summary}
                </p>

                {selectedNode.snippet && (
                  <div className="mb-4">
                    <div className="text-xs font-semibold text-slate-500 mb-1.5">关键代码 / 表达式</div>
                    <pre className="text-xs font-mono bg-slate-900 text-emerald-300 p-3 rounded-xl overflow-x-auto max-h-32">
                      <code>{selectedNode.snippet}</code>
                    </pre>
                  </div>
                )}

                {relatedLinks.length > 0 && (
                  <div>
                    <div className="text-xs font-semibold text-slate-500 mb-2">
                      知识拓扑关联 ({relatedLinks.length})
                    </div>
                    <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                      {relatedLinks.map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => item.otherNode && setSelectedNodeId(item.otherNode.id)}
                          className="w-full text-left px-3 py-2 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/40 transition-all flex items-center justify-between text-xs group"
                        >
                          <div className="flex items-center gap-1.5 truncate">
                            <span className="text-slate-400 font-mono">{item.direction}</span>
                            <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[11px]">
                              {item.relation}
                            </span>
                            <span className="font-semibold text-slate-800 group-hover:text-indigo-600 truncate">
                              {item.otherNode?.name}
                            </span>
                          </div>
                          <span className="text-slate-400 group-hover:text-indigo-500 shrink-0">查看 →</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-sm text-slate-400 py-12 text-center">
                点击左侧图谱中的任意节点查看详细解析与拓扑关系
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>共 {insights.nodes.length} 个知识节点 · {insights.links.length} 条关系边</span>
              <button
                type="button"
                onClick={() => setActiveTab('flashcards')}
                className="text-indigo-600 hover:text-indigo-700 font-semibold"
              >
                去抽查闪卡 →
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* 3D 翻转记忆闪卡自测区 */
        <div className="p-6 md:p-8 bg-gradient-to-b from-slate-50/70 to-white">
          <div className="max-w-2xl mx-auto">
            {/* 顶部进度条 */}
            <div className="flex items-center justify-between mb-4 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-800">
                  闪卡进度：{cardIndex + 1} / {insights.flashcards.length}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                  已掌握 {masteredCount} 张
                </span>
              </div>
              <div className="flex items-center gap-2">
                {currentCard?.sectionHeading && onScrollToSection && (
                  <button
                    type="button"
                    onClick={() => {
                      if (isFullscreen) setIsFullscreen(false);
                      onScrollToSection(currentCard.sectionHeading!);
                    }}
                    className="text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    📍 定位原文出处
                  </button>
                )}
              </div>
            </div>

            <div className="w-full h-2 bg-slate-200/80 rounded-full overflow-hidden mb-6">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-300"
                style={{
                  width: `${Math.round(
                    (masteredCount / Math.max(1, insights.flashcards.length)) * 100
                  )}%`,
                }}
              />
            </div>

            {/* 3D 翻转卡片容器 */}
            {currentCard && (
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="cursor-pointer select-none"
                style={{ perspective: '1200px' }}
              >
                <div
                  className="relative w-full min-h-[260px] transition-transform duration-500"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                >
                  {/* 正面：问题 */}
                  <div
                    className="w-full min-h-[260px] rounded-2xl bg-white border-2 border-indigo-100 shadow-md p-6 md:p-8 flex flex-col justify-between"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                          {currentCard.tag}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            currentCard.difficulty === '高频考点'
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : currentCard.difficulty === '进阶'
                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}
                        >
                          {currentCard.difficulty}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400">正面 · 问题卡（点击卡片翻转看解析）</span>
                    </div>

                    <div className="my-6">
                      <div className="text-lg md:text-xl font-bold text-slate-900 leading-relaxed">
                        Q: {currentCard.question}
                      </div>

                      {showHint && (
                        <div
                          onClick={e => e.stopPropagation()}
                          className="mt-4 p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-800"
                        >
                          💡 提示：{currentCard.hint}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={e => {
                          e.stopPropagation();
                          setShowHint(!showHint);
                        }}
                        className="text-xs font-medium text-amber-600 hover:text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        {showHint ? '隐藏提示' : '💡 查看思考提示'}
                      </button>
                      <span className="text-xs font-semibold text-indigo-600">
                        点击翻转查看答案 ↻
                      </span>
                    </div>
                  </div>

                  {/* 背面：标准解析 */}
                  <div
                    className="absolute inset-0 w-full min-h-[260px] rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white border-2 border-indigo-400/40 shadow-xl p-6 md:p-8 flex flex-col justify-between"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                        标准解析 · {currentCard.tag}
                      </span>
                      <span className="text-xs text-slate-400">点击卡片翻回正面 ↺</span>
                    </div>

                    <div className="my-4 text-sm md:text-base text-slate-100 leading-relaxed whitespace-pre-line overflow-y-auto max-h-36 pr-1">
                      {currentCard.answer}
                    </div>

                    <div
                      onClick={e => e.stopPropagation()}
                      className="flex items-center justify-between gap-3 pt-3 border-t border-white/10"
                    >
                      <span className="text-xs text-slate-300">自测掌握程度：</span>
                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => updateCardMastery(currentCard.id, 'review')}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                            masteryMap[currentCard.id] === 'review'
                              ? 'bg-amber-500 text-slate-950'
                              : 'bg-white/10 text-amber-300 hover:bg-white/20'
                          }`}
                        >
                          🔄 需再复习
                        </button>
                        <button
                          type="button"
                          onClick={() => updateCardMastery(currentCard.id, 'mastered')}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                            masteryMap[currentCard.id] === 'mastered'
                              ? 'bg-emerald-500 text-slate-950'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 hover:bg-emerald-500/30'
                          }`}
                        >
                          🎯 已掌握
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 底部切卡控制栏 */}
            <div className="mt-5 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setIsFlipped(false);
                  setShowHint(false);
                  setCardIndex(
                    prev =>
                      (prev - 1 + insights.flashcards.length) %
                      insights.flashcards.length
                  );
                }}
                className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors"
              >
                ← 上一张
              </button>

              <div className="flex items-center gap-1.5">
                {insights.flashcards.map((fc, idx) => {
                  const status = masteryMap[fc.id];
                  return (
                    <button
                      key={fc.id}
                      type="button"
                      onClick={() => {
                        setIsFlipped(false);
                        setShowHint(false);
                        setCardIndex(idx);
                      }}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        idx === cardIndex
                          ? 'w-6 bg-indigo-600'
                          : status === 'mastered'
                            ? 'bg-emerald-400'
                            : status === 'review'
                              ? 'bg-amber-400'
                              : 'bg-slate-300'
                      }`}
                      title={`第 ${idx + 1} 张闪卡`}
                    />
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsFlipped(false);
                  setShowHint(false);
                  setCardIndex(prev => (prev + 1) % insights.flashcards.length);
                }}
                className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors"
              >
                下一张 →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

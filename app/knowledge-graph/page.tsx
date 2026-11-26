'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import BrandLogo from '../_shared/components/BrandLogo';
import SiteFooter from '../_shared/components/SiteFooter';
import {
  buildGlobalKnowledgeGraph,
  CURATED_ROADMAPS,
  DOMAIN_META,
  GlobalGraphNode,
  MasteryStatus,
} from '../_shared/lib/global-knowledge-graph';
import { emitPetCompanionEvent } from '../_shared/lib/pet-companion-bus';
import { navigationItems } from '../_shared/data/navigation';
import {
  Network,
  Compass,
  Sparkles,
  BookOpen,
  Code2,
  CheckCircle2,
  Search,
  Layers,
  ArrowRight,
  ArrowLeft,
  GitBranch,
  Flame,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  Eye,
  EyeOff,
  Lock,
} from 'lucide-react';

const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false });
const KnowledgeGalaxy3D = dynamic(() => import('./components/KnowledgeGalaxy3D'), { ssr: false });

const STORAGE_KEY = 'partjava_global_kg_mastery_v1';

export default function GlobalKnowledgeGraphPage() {
  const [viewMode, setViewMode] = useState<'force' | 'radial' | 'roadmap'>('radial');
  const [radial3D, setRadial3D] = useState<boolean>(true);
  const [autoRotate3D, setAutoRotate3D] = useState<boolean>(true);
  const [zoom3DSignal, setZoom3DSignal] = useState<{ dir: 'in' | 'out' | 'reset'; seq: number }>({
    dir: 'reset',
    seq: 0,
  });
  const [domainFilter, setDomainFilter] = useState<string>('全部');
  const [showTopics, setShowTopics] = useState<boolean>(true);
  const [radialExpandAll, setRadialExpandAll] = useState<boolean>(false);
  const [expandedRadialSubject, setExpandedRadialSubject] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedNodeId, setSelectedNodeId] = useState<string>('subj_数据结构与算法');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const echartsInstanceRef = useRef<any>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const [masteryMap, setMasteryMap] = useState<Record<string, MasteryStatus>>({
    subj_Java: 'mastered',
    subj_Python: 'mastered',
    'subj_数据结构与算法': 'learning',
    subj_机器学习: 'learning',
  });

  // Load persisted mastery progress & optional domain/subject URL filters
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const sp = new URLSearchParams(window.location.search);
      const domParam = sp.get('domain');
      const subjParam = sp.get('subject');
      const validDom =
        domParam && ['全部', '计算机', '人工智能', '软件工程', '网络安全'].includes(domParam)
          ? domParam
          : '全部';
      if (validDom !== '全部') {
        setDomainFilter(validDom);
      }
      if (subjParam && subjParam.trim()) {
        const q = subjParam.trim().toLowerCase();
        const domainGraph = buildGlobalKnowledgeGraph({
          domainFilter: validDom,
          includeTopics: false,
        });
        const subjNodes = domainGraph.nodes.filter((n) => n.level === 'subject');
        const matched =
          subjNodes.find((n) => n.name.toLowerCase() === q || n.id.toLowerCase() === `subj_${q}`) ||
          [...subjNodes]
            .sort((a, b) => b.name.length - a.name.length)
            .find((n) => q.includes(n.name.toLowerCase())) ||
          [...subjNodes]
            .sort((a, b) => a.name.length - b.name.length)
            .find((n) => n.name.toLowerCase().includes(q));
        if (matched) {
          setSelectedNodeId(matched.id);
          setExpandedRadialSubject(matched.name);
        }
      }
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setMasteryMap((prev) => ({ ...prev, ...JSON.parse(raw) }));
      }
    } catch {}
  }, []);

  // Listen to fullscreen changes
  useEffect(() => {
    const handleFsChange = () => {
      const isFs = !!document.fullscreenElement;
      setIsFullscreen(isFs);
      setTimeout(() => {
        echartsInstanceRef.current?.resize?.();
      }, 150);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const handleToggleFullscreen = () => {
    if (!canvasContainerRef.current) return;
    if (!document.fullscreenElement) {
      canvasContainerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const handleZoom = (direction: 'in' | 'out') => {
    if (viewMode === 'radial' && radial3D) {
      setZoom3DSignal((prev) => ({ dir: direction, seq: prev.seq + 1 }));
      return;
    }
    const inst = echartsInstanceRef.current;
    if (!inst) return;
    const opt = inst.getOption();
    if (!opt || !opt.series || !opt.series[0]) return;
    const currentZoom = opt.series[0].zoom || 1;
    const nextZoom = direction === 'in' ? Math.min(3.5, currentZoom * 1.25) : Math.max(0.35, currentZoom / 1.25);
    inst.setOption({
      series: [{ zoom: nextZoom }],
    });
  };

  const handleResetZoom = () => {
    if (viewMode === 'radial' && radial3D) {
      setZoom3DSignal((prev) => ({ dir: 'reset', seq: prev.seq + 1 }));
      return;
    }
    const inst = echartsInstanceRef.current;
    if (!inst) return;
    inst.setOption({
      series: [
        {
          zoom: 1,
          center: null,
        },
      ],
    });
  };

  const handleSetMastery = (nodeId: string, status: MasteryStatus) => {
    setMasteryMap((prev) => {
      const next = { ...prev, [nodeId]: status };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
    if (status === 'mastered') {
      emitPetCompanionEvent({
        type: 'celebrate',
        title: '点亮知识星图节点！',
        message: '太棒啦喵！你又掌握了一个核心知识节点，全栈星系正在为你点亮~',
        durationMs: 6000,
      });
    }
  };

  const graphData = useMemo(
    () =>
      buildGlobalKnowledgeGraph({
        domainFilter,
        includeTopics: showTopics,
      }),
    [domainFilter, showTopics]
  );

  // Filtered search results for quick jump
  const searchMatches = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return graphData.nodes
      .filter(
        (n) =>
          n.name.toLowerCase().includes(q) ||
          n.summary.toLowerCase().includes(q) ||
          n.domain.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [graphData.nodes, searchQuery]);

  const selectedNode: GlobalGraphNode = useMemo(() => {
    return (
      graphData.nodes.find((n) => n.id === selectedNodeId) ||
      graphData.nodes.find((n) => n.level === 'subject') ||
      graphData.nodes[0]
    );
  }, [graphData.nodes, selectedNodeId]);

  // Jump to another node by name (e.g. from prerequisite links)
  const handleSelectNodeByName = (name: string) => {
    if (!name || name === '零基础可直接入门' || name === '综合项目实战') return;
    const clean = name.replace(/^[⬅️➡️\s]+/, '').trim();
    const target =
      graphData.nodes.find((n) => n.name === clean || n.name.includes(clean)) ||
      graphData.nodes.find((n) => n.id === `subj_${clean}`);
    if (target) {
      setSelectedNodeId(target.id);
      emitPetCompanionEvent({
        type: 'info',
        title: `已聚焦前置学科「${target.name}」`,
        message: target.summary,
        durationMs: 4500,
      });
    }
  };

  // Statistics
  const stats = useMemo(() => {
    const totalSubjects = Object.values(navigationItems).reduce(
      (acc, arr) => acc + arr.length,
      0
    );
    const totalChapters = Object.values(navigationItems).reduce(
      (acc, arr) =>
        acc + arr.reduce((s, item) => s + (item.subitems?.length || 0), 0),
      0
    );
    const masteredCount = Object.values(masteryMap).filter(
      (v) => v === 'mastered'
    ).length;
    const learningCount = Object.values(masteryMap).filter(
      (v) => v === 'learning'
    ).length;
    return { totalSubjects, totalChapters, masteredCount, learningCount };
  }, [masteryMap]);

  // ECharts Option for Force-Directed Galaxy & Radial Tree
  const chartOption = useMemo(() => {
    if (viewMode === 'radial') {
      const buildSubjectNode = (s: (typeof navigationItems)[string][number], dColor: string, depth: number) => {
        const subjId = `subj_${s.name}`;
        const isSelected = selectedNodeId === subjId;
        const isExpanded = radialExpandAll || expandedRadialSubject === s.name;
        const mastery = masteryMap[subjId];
        const borderColor =
          mastery === 'mastered'
            ? '#10b981'
            : mastery === 'learning'
            ? '#fbbf24'
            : isSelected
            ? '#ffffff'
            : 'rgba(255,255,255,0.45)';
        const topics = isExpanded
          ? (s.subitems || []).slice(0, 8).map((t, idx) => ({
              name: t.name,
              id: `topic_${s.name}_${idx}`,
              depth: depth + 1,
              itemStyle: {
                color: mastery === 'mastered' ? '#10b981' : '#38bdf8',
                borderColor: 'rgba(255,255,255,0.55)',
                borderWidth: 1,
              },
            }))
          : [];

        return {
          name: s.name,
          id: subjId,
          depth,
          collapsed: !isExpanded,
          itemStyle: {
            color: mastery === 'mastered' ? '#10b981' : mastery === 'learning' ? '#f59e0b' : dColor,
            borderColor,
            borderWidth: isSelected ? 3 : mastery ? 2.5 : 1.5,
            shadowBlur: isSelected || isExpanded ? 18 : 6,
            shadowColor: isSelected ? '#38bdf8' : dColor,
          },
          children: topics,
        };
      };

      // 单领域筛选时直接以该领域为中心 360° 扇形平铺，避免被挤进角落 90°
      const treeRoot =
        domainFilter !== '全部' && navigationItems[domainFilter]
          ? {
              name: domainFilter,
              id: `domain_${domainFilter}`,
              depth: 0,
              itemStyle: {
                color: DOMAIN_META[domainFilter]?.color || '#38bdf8',
                borderColor: '#ffffff',
                borderWidth: 3,
                shadowBlur: 22,
                shadowColor: DOMAIN_META[domainFilter]?.color || '#38bdf8',
              },
              children: navigationItems[domainFilter].map((s) =>
                buildSubjectNode(s, DOMAIN_META[domainFilter]?.color || '#38bdf8', 1)
              ),
            }
          : {
              name: '禾硙全栈星系',
              id: 'hub_partjava',
              depth: 0,
              itemStyle: {
                color: '#6366f1',
                borderColor: '#e0e7ff',
                borderWidth: 3,
                shadowBlur: 20,
                shadowColor: 'rgba(99, 102, 241, 0.8)',
              },
              children: Object.entries(navigationItems).map(([dName, subjs]) => {
                const dColor = DOMAIN_META[dName]?.color || '#38bdf8';
                return {
                  name: dName,
                  id: `domain_${dName}`,
                  depth: 1,
                  itemStyle: {
                    color: dColor,
                    borderColor: '#ffffff',
                    borderWidth: 2,
                    shadowBlur: 14,
                    shadowColor: dColor,
                  },
                  children: subjs.map((s) => buildSubjectNode(s, dColor, 2)),
                };
              }),
            };

      return {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(15, 23, 42, 0.94)',
          borderColor: 'rgba(99, 102, 241, 0.5)',
          padding: [10, 14],
          textStyle: { color: '#f8fafc', fontSize: 12 },
          formatter: (params: any) => {
            const data = params.data;
            if (!data) return params.name;
            const depth = data.depth ?? 2;
            const isSubj = String(data.id || '').startsWith('subj_');
            const depthLabel =
              depth === 0
                ? '核心知识枢纽'
                : isSubj
                ? '主干学科体系（点击聚焦展开该分支章节）'
                : depth === 1
                ? '核心技术领域（点击可单域 360° 聚焦）'
                : '章节核心考点';
            return `<div style="max-width:240px;white-space:normal;line-height:1.6;">
              <div style="font-weight:800;color:#38bdf8;font-size:13px;margin-bottom:2px;">${data.name}</div>
              <div style="font-size:11px;color:#94a3b8;margin-bottom:4px;">${depthLabel}</div>
              <div style="font-size:10px;color:#cbd5e1;">💡 点击学科节点可手风琴式展开章节并联动右侧透视舱</div>
            </div>`;
          },
        },
        series: [
          {
            type: 'tree',
            data: [treeRoot],
            layout: 'radial',
            top: '11%',
            bottom: '11%',
            left: '11%',
            right: '11%',
            symbol: 'emptyCircle',
            symbolSize: (_rawVal: any, params: any) => {
              const depth = params?.data?.depth ?? 2;
              if (depth === 0) return 22;
              if (depth === 1) return 15;
              if (depth === 2) return 11;
              return 7;
            },
            initialTreeDepth: radialExpandAll ? 3 : expandedRadialSubject ? 3 : 2,
            expandAndCollapse: false,
            animationDurationUpdate: 550,
            roam: true,
            labelLayout: { hideOverlap: true },
            label: {
              position: 'right',
              align: 'left',
              verticalAlign: 'middle',
              rotate: 'radial',
              distance: 7,
              color: '#f1f5f9',
              fontSize: 11.5,
              fontWeight: 600,
              textBorderColor: '#070e20',
              textBorderWidth: 2.5,
            },
            leaves: {
              label: {
                position: 'right',
                align: 'left',
                verticalAlign: 'middle',
                rotate: 'radial',
                distance: 6,
                color: '#cbd5e1',
                fontSize: 10.5,
                fontWeight: 500,
                textBorderColor: '#070e20',
                textBorderWidth: 2,
              },
            },
            emphasis: {
              focus: 'ancestor',
              blurScope: 'coordinateSystem',
              lineStyle: {
                width: 3,
                color: '#38bdf8',
              },
              label: {
                color: '#ffffff',
                fontWeight: 700,
              },
            },
            lineStyle: {
              color: 'rgba(129, 140, 248, 0.45)',
              width: 1.5,
              curveness: 0.5,
            },
          },
        ],
      };
    }

    // Default: Force-Directed Knowledge Galaxy (四象限星系星座布局 + 防碰撞胶囊标签)
    const categories = ['核心枢纽', '计算机', '人工智能', '软件工程', '网络安全'].map(
      (name) => ({
        name,
        itemStyle: { color: DOMAIN_META[name]?.color || '#38bdf8' },
      })
    );

    const QUADRANT_CENTERS: Record<string, [number, number]> = {
      核心枢纽: [0, 0],
      计算机: [-190, -135],
      人工智能: [190, -135],
      软件工程: [-190, 135],
      网络安全: [190, 135],
    };

    const echartsNodes = graphData.nodes.map((n, index) => {
      const dMeta = DOMAIN_META[n.domain] || DOMAIN_META['计算机'];
      const isSelected = n.id === selectedNode?.id;
      const mastery = masteryMap[n.id];
      const borderColor =
        mastery === 'mastered'
          ? '#10b981'
          : mastery === 'learning'
          ? '#fbbf24'
          : isSelected
          ? '#ffffff'
          : 'rgba(255,255,255,0.42)';

      const qBase = QUADRANT_CENTERS[n.domain] || [0, 0];
      const angle = ((index * 137.5) % 360) * (Math.PI / 180);
      const radius =
        n.level === 'hub' ? 0 : n.level === 'domain' ? 22 : n.level === 'subject' ? 92 + (index % 4) * 20 : 145 + (index % 4) * 18;
      const seedX = n.level === 'hub' ? 0 : qBase[0] + Math.cos(angle) * radius;
      const seedY = n.level === 'hub' ? 0 : qBase[1] + Math.sin(angle) * radius;

      return {
        id: n.id,
        name: n.name,
        x: seedX,
        y: seedY,
        category: categories.findIndex((c) => c.name === n.domain),
        symbolSize: isSelected ? n.symbolSize * 1.25 : n.symbolSize,
        draggable: true,
        itemStyle: {
          color: dMeta.color,
          borderColor,
          borderWidth: isSelected ? 4 : mastery ? 3 : 1.5,
          shadowBlur: isSelected ? 26 : mastery ? 18 : n.level !== 'topic' ? 14 : 6,
          shadowColor:
            mastery === 'mastered'
              ? 'rgba(16, 185, 129, 0.7)'
              : mastery === 'learning'
              ? 'rgba(251, 191, 36, 0.65)'
              : isSelected
              ? '#38bdf8'
              : dMeta.glow,
        },
        label: {
          show: n.level !== 'topic' || domainFilter !== '全部' || isSelected,
          position: 'right',
          distance: 7,
          formatter: '{b}',
          color: isSelected ? '#ffffff' : n.level === 'topic' ? '#cbd5e1' : '#f8fafc',
          fontSize: n.level === 'hub' ? 14 : n.level === 'domain' ? 13 : n.level === 'subject' ? 11.5 : 10,
          fontWeight: n.level === 'topic' ? 500 : 700,
          backgroundColor: n.level !== 'topic' ? 'rgba(8, 16, 36, 0.80)' : 'transparent',
          borderColor: n.level !== 'topic' ? `${dMeta.color}55` : 'transparent',
          borderWidth: n.level !== 'topic' ? 1 : 0,
          borderRadius: 6,
          padding: n.level !== 'topic' ? [3, 7] : 0,
        },
      };
    });

    const echartsLinks = graphData.links.map((l) => {
      const isPrereq = l.relation === 'prerequisite' || l.relation === 'cross-domain';
      return {
        source: l.source,
        target: l.target,
        value: l.label || '',
        symbol: isPrereq ? ['none', 'arrow'] : ['none', 'none'],
        symbolSize: isPrereq ? [4, 9] : [0, 0],
        lineStyle: {
          color:
            l.relation === 'cross-domain'
              ? '#f59e0b'
              : l.relation === 'prerequisite'
              ? '#38bdf8'
              : 'rgba(148, 163, 184, 0.24)',
          width: isPrereq ? 2 : 1.1,
          type: l.relation === 'cross-domain' ? 'dashed' : 'solid',
          curveness: isPrereq ? 0.24 : 0.08,
          opacity: isPrereq ? 0.88 : 0.4,
        },
      };
    });

    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(15, 23, 42, 0.94)',
        borderColor: 'rgba(56, 189, 248, 0.4)',
        padding: [10, 14],
        textStyle: { color: '#f8fafc', fontSize: 12 },
        formatter: (params: any) => {
          if (params.dataType === 'node') {
            const node = graphData.nodes.find((item) => item.id === params.data.id);
            if (!node) return params.name;
            return `<div style="max-width:260px;white-space:normal;line-height:1.6;">
              <div style="font-weight:800;color:#38bdf8;margin-bottom:4px;font-size:13px;">${node.name}</div>
              <div style="font-size:11px;color:#cbd5e1;margin-bottom:4px;">领域：${node.domain} · 难度：${node.difficulty}</div>
              <div style="font-size:11px;color:#94a3b8;">${node.summary}</div>
            </div>`;
          }
          if (params.data?.value) {
            return `依赖关系：${params.data.value}`;
          }
          return '';
        },
      },
      legend: {
        show: true,
        bottom: 12,
        left: 'center',
        textStyle: { color: '#cbd5e1', fontSize: 11 },
        data: categories.map((c) => c.name),
      },
      series: [
        {
          type: 'graph',
          layout: 'force',
          data: echartsNodes,
          links: echartsLinks,
          categories,
          roam: true,
          draggable: true,
          labelLayout: { hideOverlap: true, moveOverlap: 'shiftY' },
          zoom: domainFilter === '全部' ? 0.56 : 0.85,
          force: {
            repulsion: domainFilter === '全部' ? 560 : 520,
            edgeLength: domainFilter === '全部' ? [52, 125] : [55, 125],
            gravity: 0.11,
            friction: 0.28,
            layoutAnimation: true,
          },
          emphasis: {
            focus: 'adjacency',
            lineStyle: { width: 3.5, opacity: 1 },
          },
        },
      ],
    };
  }, [viewMode, graphData, domainFilter, selectedNode, masteryMap, radialExpandAll, expandedRadialSubject, selectedNodeId]);

  const handleChartNodeClick = (params: any) => {
    const id = params?.data?.id;
    if (id) {
      if (graphData.nodes.some((n) => n.id === id)) {
        setSelectedNodeId(id);
      } else if (id.startsWith('subj_')) {
        setSelectedNodeId(id);
      } else if (id.startsWith('domain_')) {
        const dName = id.replace('domain_', '');
        setDomainFilter(dName);
      }
      if (viewMode === 'radial' && id.startsWith('subj_')) {
        const subjName = id.replace('subj_', '');
        setExpandedRadialSubject((prev) => (prev === subjName ? null : subjName));
      }
    }
  };

  const handleAskHeju = (node: GlobalGraphNode) => {
    emitPetCompanionEvent({
      type: 'celebrate',
      title: `禾硙正在为你解析「${node.name}」`,
      message: `${node.summary} 点击顶部导航栏「机器人」或右侧伴学窗即可深入提问喵！`,
      durationMs: 8000,
    });
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('toggle-ai-chat'));
    }
  };

  const currentMastery: MasteryStatus =
    masteryMap[selectedNode?.id] || 'locked';

  return (
    <div className="min-h-[calc(100vh-70px)] bg-surface-page text-content-primary relative overflow-hidden py-4 sm:py-5 transition-colors flex flex-col">
      <div className="flex-1 w-full relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6">
        {/* 顶部 Hero 标题与统计总览 */}
        <div className="text-center pt-1 pb-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface-raised border border-line-subtle text-brand-primary text-xs font-mono font-semibold mb-3 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#D4AD72]" />
            <span>FULL-STACK KNOWLEDGE GALAXY · INTERACTIVE GRAPH</span>
          </div>

          <div className="flex items-center justify-center gap-3 mb-2">
            <BrandLogo variant="full" className="h-11 sm:h-14 w-auto drop-shadow-sm" priority />
            <h1 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-content-primary">
              全栈知识星系图谱
            </h1>
          </div>

          <p className="text-xs sm:text-base text-content-secondary max-w-2xl mx-auto">
            四大核心技术域 · {stats.totalSubjects} 门主干学科 · {stats.totalChapters}+ 知识章节 · 先后置学习依赖导航与 3D 算法演练直达
          </p>

          {/* 顶部统计小卡片 */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-4 text-xs">
            <div className="px-3.5 py-1.5 rounded-xl bg-surface-raised border border-line-subtle shadow-sm flex items-center gap-2">
              <Layers className="w-4 h-4 text-brand-primary" />
              <span className="text-content-secondary">收录学科/章节:</span>
              <strong className="font-mono text-content-primary">
                {stats.totalSubjects} 门 / {stats.totalChapters} 节
              </strong>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-surface-raised border border-line-subtle shadow-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span className="text-content-secondary">已点亮掌握:</span>
              <strong className="font-mono text-emerald-500">
                {stats.masteredCount} 节点
              </strong>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-surface-raised border border-line-subtle shadow-sm flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#D4AD72]" />
              <span className="text-content-secondary">正在攻克:</span>
              <strong className="font-mono text-[#D4AD72]">
                {stats.learningCount} 节点
              </strong>
            </div>
          </div>
        </div>

        {/* 视图模式切换 + 领域筛选 + 节点快速检索条（桌面单行紧凑布局） */}
        <div className="p-2 sm:p-2.5 rounded-2xl bg-surface-raised border border-line-subtle shadow-sm flex flex-wrap xl:flex-nowrap items-center justify-between gap-2">
          {/* 3种图谱模式切换 */}
          <div className="inline-flex p-0.5 rounded-xl bg-surface-muted border border-line-subtle shrink-0">
            <button
              type="button"
              onClick={() => setViewMode('force')}
              className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 whitespace-nowrap ${
                viewMode === 'force'
                  ? 'bg-brand-primary text-content-inverse shadow'
                  : 'text-content-secondary hover:text-content-primary'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              <span>星系力导向图</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('radial')}
              className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 whitespace-nowrap ${
                viewMode === 'radial'
                  ? 'bg-brand-primary text-content-inverse shadow'
                  : 'text-content-secondary hover:text-content-primary'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{radial3D ? '3D 星环知识宇宙' : '360° 径向知识树'}</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('roadmap')}
              className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 whitespace-nowrap ${
                viewMode === 'roadmap'
                  ? 'bg-[#1F7A5C] text-white shadow'
                  : 'text-content-secondary hover:text-content-primary'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>进阶闯关路线</span>
            </button>
          </div>

          {/* 四大技术领域筛选胶囊 */}
          <div className="flex flex-wrap xl:flex-nowrap items-center gap-1">
            {['全部', '计算机', '人工智能', '软件工程', '网络安全'].map((dom) => (
              <button
                key={dom}
                type="button"
                onClick={() => setDomainFilter(dom)}
                className={`px-2 py-1 rounded-xl text-[11px] font-semibold border transition-all whitespace-nowrap ${
                  domainFilter === dom
                    ? 'bg-brand-primary text-content-inverse border-transparent shadow-sm'
                    : 'bg-surface-muted text-content-secondary border-line-subtle hover:bg-brand-soft hover:text-content-primary'
                }`}
              >
                {dom !== '全部' && (
                  <span className="mr-0.5">{DOMAIN_META[dom]?.icon}</span>
                )}
                {dom}
              </button>
            ))}

            {viewMode === 'radial' && (
              <button
                type="button"
                onClick={() => {
                  setRadialExpandAll((v) => !v);
                  if (radialExpandAll) setExpandedRadialSubject(null);
                }}
                className={`px-2 py-1 rounded-xl text-[11px] font-medium border transition-all flex items-center gap-1 whitespace-nowrap ${
                  radialExpandAll
                    ? 'bg-brand-soft text-brand-primary border-line-strong'
                    : 'bg-surface-muted text-content-secondary border-line-subtle hover:bg-brand-soft hover:text-content-primary'
                }`}
              >
                {radialExpandAll ? (
                  <>
                    <EyeOff className="w-3 h-3" />
                    <span>折叠</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3 h-3" />
                    <span>全展</span>
                  </>
                )}
              </button>
            )}

            {viewMode === 'force' && (
              <button
                type="button"
                onClick={() => setShowTopics((v) => !v)}
                className={`px-2 py-1 rounded-xl text-[11px] font-mono border transition-all whitespace-nowrap ${
                  showTopics
                    ? 'bg-brand-soft text-brand-primary border-line-strong'
                    : 'bg-surface-muted text-content-secondary border-line-subtle'
                }`}
              >
                {showTopics ? '含细节' : '仅主干'}
              </button>
            )}
          </div>

          {/* 知识点即时搜索框 */}
          <div className="relative w-full sm:w-44 shrink-0">
            <div className="flex items-center px-3 py-1.5 rounded-xl bg-surface-muted border border-line-subtle focus-within:border-[#D4AD72]">
              <Search className="w-3.5 h-3.5 text-content-muted mr-2 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="检索知识点 (如 Java, 深度学习)..."
                className="w-full bg-transparent text-xs text-content-primary placeholder:text-content-muted focus:outline-none"
              />
            </div>
            {searchMatches.length > 0 && (
              <div className="absolute left-0 right-0 top-10 bg-white rounded-xl border border-slate-200 shadow-xl z-30 py-1 max-h-60 overflow-y-auto">
                {searchMatches.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      setSelectedNodeId(m.id);
                      setSearchQuery('');
                    }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-indigo-50 flex items-center justify-between"
                  >
                    <span className="font-semibold text-slate-800 truncate">
                      {m.name}
                    </span>
                    <span className="text-[10px] text-slate-400 ml-2 shrink-0">
                      {m.domain}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 主体区域：左侧星系图谱/闯关路线 (8列) + 右侧节点深度透视舱 (4列) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* 左侧：星系图谱画布或进阶路线 */}
          <div className="lg:col-span-8">
            {viewMode === 'roadmap' ? (
              <div className="space-y-5">
                {CURATED_ROADMAPS.map((track) => (
                  <div
                    key={track.id}
                    className="rounded-2xl p-5 border shadow-xl text-white"
                    style={{
                      background:
                        'linear-gradient(165deg, #0b1120 0%, #111c33 100%)',
                      borderColor: 'rgba(99, 102, 241, 0.28)',
                    }}
                  >
                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/10">
                      <span className="text-2xl w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">
                        {track.icon}
                      </span>
                      <div>
                        <h2 className="text-base sm:text-lg font-bold text-white">
                          {track.title}
                        </h2>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {track.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {track.steps.map((st, idx) => {
                        const status = masteryMap[st.nodeId] || 'locked';
                        return (
                          <div
                            key={idx}
                            onClick={() => setSelectedNodeId(st.nodeId)}
                            className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                              selectedNode?.id === st.nodeId
                                ? 'bg-indigo-600/25 border-sky-400 shadow-lg'
                                : 'bg-white/[0.04] border-white/10 hover:border-indigo-400/40'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-1.5">
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-200 border border-indigo-400/30">
                                  {st.tag}
                                </span>
                                <span
                                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                    status === 'mastered'
                                      ? 'bg-emerald-500/20 text-emerald-300'
                                      : status === 'learning'
                                      ? 'bg-amber-500/20 text-amber-300'
                                      : 'bg-slate-800 text-slate-400'
                                  }`}
                                >
                                  {status === 'mastered'
                                    ? '✓ 已掌握'
                                    : status === 'learning'
                                    ? '🔥 学习中'
                                    : '待解锁'}
                                </span>
                              </div>
                              <h3 className="text-sm font-bold text-white mb-1">
                                {st.name}
                              </h3>
                              <p className="text-xs text-slate-300/90 leading-relaxed">
                                {st.desc}
                              </p>
                            </div>

                            <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                              <Link
                                href={st.href}
                                onClick={(e) => e.stopPropagation()}
                                className="text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1"
                              >
                                <span>进入章节学习</span>
                                <ArrowRight className="w-3 h-3" />
                              </Link>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSetMastery(
                                    st.nodeId,
                                    status === 'mastered' ? 'learning' : 'mastered'
                                  );
                                }}
                                className="text-emerald-300 hover:underline"
                              >
                                {status === 'mastered' ? '设为学习中' : '标记已掌握'}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                ref={canvasContainerRef}
                className="relative rounded-3xl overflow-hidden border shadow-2xl transition-all duration-300"
                style={{
                  background:
                    'radial-gradient(circle at 50% 45%, #0e1b38 0%, #081024 55%, #030612 100%)',
                  borderColor: 'rgba(99, 102, 241, 0.35)',
                  boxShadow:
                    '0 20px 50px rgba(2, 6, 23, 0.6), inset 0 0 80px rgba(99, 102, 241, 0.08)',
                }}
              >
                {/* 背景精美星轨同心圆线条 */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
                  <div className="w-[320px] h-[320px] rounded-full border border-dashed border-indigo-400/25" />
                  <div className="absolute w-[500px] h-[500px] rounded-full border border-indigo-400/15" />
                  <div className="absolute w-[680px] h-[680px] rounded-full border border-dashed border-sky-400/10" />
                </div>

                {/* 画布顶部 HUD 行：左侧状态 + 右侧交互工具栏（Flex 自适应防遮挡） */}
                <div className="absolute top-3.5 inset-x-3.5 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
                  <div className="flex flex-wrap items-center gap-2 min-w-0">
                    <span className="px-3 py-1 rounded-xl bg-slate-950/85 backdrop-blur-md border border-indigo-400/35 text-xs font-semibold text-indigo-100 shadow-md flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                      <span className="truncate">
                        {viewMode === 'force'
                          ? '力导向知识星系 · 支持滚轮缩放与拖拽'
                          : radial3D
                          ? '3D 星环知识宇宙 · 拖拽旋转与点击飞向聚焦'
                          : radialExpandAll
                          ? '360° 径向知识树 · 全景展开'
                          : '360° 径向知识树 · 点击节点展开'}
                      </span>
                    </span>
                    <span className="px-2.5 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md border border-sky-400/30 text-[11px] font-mono text-sky-300 shadow-md whitespace-nowrap">
                      {graphData.nodes.length} 节点 · {graphData.links.length} 依赖
                    </span>
                  </div>

                  <div className="pointer-events-auto flex items-center gap-1 bg-slate-950/85 backdrop-blur-md p-1 rounded-2xl border border-indigo-400/30 shadow-xl shrink-0">
                    {viewMode === 'radial' && (
                      <div className="inline-flex p-0.5 rounded-xl bg-white/10 border border-white/10 mr-1">
                        <button
                          type="button"
                          onClick={() => setRadial3D(true)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                            radial3D
                              ? 'bg-indigo-500 text-white shadow-sm'
                              : 'text-slate-300 hover:text-white'
                          }`}
                        >
                          3D 宇宙
                        </button>
                        <button
                          type="button"
                          onClick={() => setRadial3D(false)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                            !radial3D
                              ? 'bg-indigo-500 text-white shadow-sm'
                              : 'text-slate-300 hover:text-white'
                          }`}
                        >
                          2D 径向
                        </button>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => handleZoom('in')}
                      title="放大画布"
                      className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-indigo-600/30 transition-colors"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleZoom('out')}
                      title="缩小画布"
                      className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-indigo-600/30 transition-colors"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleResetZoom}
                      title="复位视角"
                      className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-indigo-600/30 transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                    {viewMode === 'radial' && radial3D && (
                      <button
                        type="button"
                        onClick={() => setAutoRotate3D((v) => !v)}
                        title={autoRotate3D ? '暂停星系公转' : '开启星系公转'}
                        className={`px-2 py-1 rounded-xl text-[11px] font-semibold border transition-all whitespace-nowrap ${
                          autoRotate3D
                            ? 'text-amber-200 bg-amber-500/15 border-amber-400/35'
                            : 'text-slate-300 bg-white/5 border-white/15'
                        }`}
                      >
                        {autoRotate3D ? '公转中' : '已暂停'}
                      </button>
                    )}

                    {viewMode === 'radial' && (
                      <button
                        type="button"
                        onClick={() => setRadialExpandAll((v) => !v)}
                        title={radialExpandAll ? '折叠到学科主干' : '展开全部章节'}
                        className="px-2.5 py-1 rounded-xl text-xs font-semibold text-sky-200 bg-sky-500/15 hover:bg-sky-500/25 border border-sky-400/30 transition-all whitespace-nowrap"
                      >
                        {radialExpandAll ? '折叠主干' : '展开全部'}
                      </button>
                    )}

                    <div className="w-px h-4 bg-white/20 mx-0.5" />

                    <button
                      type="button"
                      onClick={handleToggleFullscreen}
                      title={isFullscreen ? '退出全屏' : '全屏透视'}
                      className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-indigo-600/30 transition-colors"
                    >
                      {isFullscreen ? (
                        <Minimize2 className="w-4 h-4" />
                      ) : (
                        <Maximize2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* 画布底端交互与掌握状态图例 */}
                <div className="absolute bottom-3 left-4 right-4 z-10 pointer-events-none flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-300/90 bg-slate-950/75 px-2.5 py-1 rounded-lg backdrop-blur-sm border border-white/10">
                    {viewMode === 'radial'
                      ? radial3D
                        ? '💡 左键 360° 拖拽旋转星系 · 滚轮缩放 · 点击学科星球飞向聚焦并展开章节卫星'
                        : '💡 点击任意学科节点仅展开该分支章节（手风琴聚焦），点击领域可 360° 单域展开'
                      : '💡 四象限星系集群 · 滚轮缩放与拖拽 · 悬停高亮相邻前置/进阶依赖'}
                  </span>
                  <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-300 bg-slate-950/75 px-3 py-1 rounded-lg backdrop-blur-sm border border-white/10">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full border-2 border-emerald-400 bg-emerald-500/40" />
                      已掌握
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full border-2 border-amber-400 bg-amber-500/40" />
                      攻克中
                    </span>
                    {(viewMode === 'force' || (viewMode === 'radial' && radial3D)) && (
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-4 border-t-2 border-dashed border-amber-400" />
                        跨领域依赖
                      </span>
                    )}
                  </div>
                </div>

                <div className="h-[580px] sm:h-[680px] lg:h-[720px] w-full">
                  {viewMode === 'radial' && radial3D ? (
                    <KnowledgeGalaxy3D
                      domainFilter={domainFilter}
                      selectedNodeId={selectedNodeId}
                      masteryMap={masteryMap}
                      expandAll={radialExpandAll}
                      autoRotate={autoRotate3D}
                      links={graphData.links}
                      zoomSignal={zoom3DSignal}
                      height={700}
                      onSelectNode={(nid) => {
                        if (nid.startsWith('domain_')) {
                          setSelectedNodeId(nid);
                        } else {
                          setSelectedNodeId(nid);
                        }
                      }}
                    />
                  ) : (
                    <ReactECharts
                      option={chartOption}
                      style={{ height: '100%', width: '100%' }}
                      onChartReady={(instance: any) => {
                        echartsInstanceRef.current = instance;
                      }}
                      onEvents={{
                        click: handleChartNodeClick,
                      }}
                    />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 右侧：节点深度透视与行动舱 (Node Inspector Studio) */}
          <div className="lg:col-span-4 space-y-4">
            <div
              className="rounded-3xl p-5 sm:p-6 border shadow-2xl text-slate-100 space-y-4.5 transition-all"
              style={{
                background:
                  'linear-gradient(165deg, #0e172e 0%, #091022 60%, #050914 100%)',
                borderColor: 'rgba(99, 102, 241, 0.35)',
                boxShadow:
                  '0 20px 45px rgba(2, 6, 23, 0.6), inset 0 0 40px rgba(99, 102, 241, 0.05)',
              }}
            >
              {/* 顶部节点头信息 */}
              <div className="flex items-start justify-between gap-2 pb-3.5 border-b border-white/10">
                <div>
                  <div className="flex flex-wrap items-center gap-1.5 mb-2">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-bold border shadow-sm"
                      style={{
                        backgroundColor: `${DOMAIN_META[selectedNode?.domain]?.color || '#6366f1'}22`,
                        color: DOMAIN_META[selectedNode?.domain]?.color || '#818cf8',
                        borderColor: `${DOMAIN_META[selectedNode?.domain]?.color || '#6366f1'}44`,
                      }}
                    >
                      {selectedNode?.domain}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-sky-500/15 text-sky-300 border border-sky-400/30">
                      难度: {selectedNode?.difficulty}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {selectedNode?.name}
                  </h2>
                </div>
              </div>

              {/* 掌握状态三档切换器 */}
              <div className="p-3.5 rounded-2xl bg-slate-950/75 border border-white/10 shadow-inner">
                <div className="text-[11px] text-slate-400 mb-2 font-medium flex items-center justify-between">
                  <span>当前掌握状态 (本地自动保存)：</span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {currentMastery === 'mastered'
                      ? '已点亮星系'
                      : currentMastery === 'learning'
                      ? '攻克中'
                      : '未解锁'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      {
                        id: 'locked',
                        label: '待学习',
                        Icon: Lock,
                        activeCls:
                          'bg-slate-700/80 text-white border-slate-400 shadow-md',
                      },
                      {
                        id: 'learning',
                        label: '攻克中',
                        Icon: Flame,
                        activeCls:
                          'bg-amber-500/20 text-[#D4AD72] border-[#D4AD72] shadow-sm',
                      },
                      {
                        id: 'mastered',
                        label: '已掌握',
                        Icon: CheckCircle2,
                        activeCls:
                          'bg-emerald-500/20 text-emerald-300 border-emerald-400 shadow-sm',
                      },
                    ] as const
                  ).map((item) => {
                    const StatusIcon = item.Icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() =>
                          selectedNode && handleSetMastery(selectedNode.id, item.id)
                        }
                        className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1 ${
                          currentMastery === item.id
                            ? item.activeCls
                            : 'bg-slate-900/60 text-slate-400 border-white/5 hover:text-slate-200 hover:bg-slate-900'
                        }`}
                      >
                        <StatusIcon className="w-3.5 h-3.5 shrink-0" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 节点核心概述 */}
              <div className="p-3.5 rounded-2xl bg-slate-950/65 border border-indigo-500/25 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#D4AD72]" />
                <div className="text-xs font-bold text-[#D4AD72] mb-1.5 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  <span>知识模块定位与概述</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pl-1">
                  {selectedNode?.summary}
                </p>
              </div>

              {/* 核心知识点列表 */}
              {selectedNode?.keyPoints && selectedNode.keyPoints.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#D4AD72]" />
                    <span>核心章节与关键考点</span>
                  </div>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {selectedNode.keyPoints.map((pt, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-slate-200 flex items-center gap-2.5 hover:bg-white/[0.08] transition-colors"
                      >
                        <span className="w-5 h-5 rounded-lg bg-indigo-500/25 text-indigo-300 font-mono text-[11px] font-bold flex items-center justify-center shrink-0 border border-indigo-400/20">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="truncate">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 先后置学习路径（支持点击穿梭跳转至关联学科！） */}
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <button
                  type="button"
                  onClick={() =>
                    handleSelectNodeByName(
                      selectedNode?.prerequisites?.[0] || ''
                    )
                  }
                  className="p-3 rounded-2xl bg-slate-950/65 border border-white/10 text-left hover:border-indigo-400/40 hover:bg-slate-900/80 transition-all group"
                >
                  <div className="text-[10px] text-slate-400 mb-1 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1"><ArrowLeft className="w-3 h-3" />前置依赖基础</span>
                    <span className="text-[9px] text-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity">
                      跳转
                    </span>
                  </div>
                  <div className="font-semibold text-slate-200 truncate group-hover:text-sky-300 transition-colors">
                    {selectedNode?.prerequisites?.[0] || '零基础可直接入门'}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleSelectNodeByName(selectedNode?.nextSteps?.[0] || '')
                  }
                  className="p-3 rounded-2xl bg-slate-950/65 border border-white/10 text-left hover:border-indigo-400/40 hover:bg-slate-900/80 transition-all group"
                >
                  <div className="text-[10px] text-slate-400 mb-1 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1">后续进阶方向<ArrowRight className="w-3 h-3" /></span>
                    <span className="text-[9px] text-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity">
                      跳转
                    </span>
                  </div>
                  <div className="font-semibold text-sky-300 truncate group-hover:text-sky-200 transition-colors">
                    {selectedNode?.nextSteps?.[0] || '综合项目实战'}
                  </div>
                </button>
              </div>

              {/* 三大一键直达行动按钮（消除矢量图标 + Emoji 双重堆砌） */}
              <div className="pt-2 space-y-2.5">
                <Link
                  href={selectedNode?.href || '/study'}
                  className="w-full py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm text-[#0E1116] bg-[#D4AD72] hover:bg-[#e0bd86] active:scale-[0.99] transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>进入《{selectedNode?.name}》课程学习</span>
                </Link>

                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/code/editor"
                    className="py-2.5 px-3 rounded-xl font-bold text-xs text-emerald-200 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400/35 transition-all flex items-center justify-center gap-1.5 active:scale-[0.98]"
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>代码工坊演练</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => selectedNode && handleAskHeju(selectedNode)}
                    className="py-2.5 px-3 rounded-xl font-bold text-xs text-[#D4AD72] bg-[#D4AD72]/15 hover:bg-[#D4AD72]/25 border border-[#D4AD72]/35 transition-all flex items-center justify-center gap-1.5 active:scale-[0.98]"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>召唤禾硙讲解</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SiteFooter className="mt-auto !py-3" />
    </div>
  );
}


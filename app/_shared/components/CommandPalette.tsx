'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Box,
  BookOpen,
  Compass,
  Code2,
  Gamepad2,
  Network,
  FileText,
  User,
  Moon,
  Sun,
  Bot,
  CornerDownLeft,
  X,
} from 'lucide-react';
import { ALGORITHM_REGISTRY } from './visualizer/registry';
import { navigationItems } from '../data/navigation';
import { useLocale, UI_DICT } from '../lib/i18n';

type CategoryFilter = 'all' | 'algo' | 'course' | 'action';

interface PaletteEntry {
  id: string;
  category: Exclude<CategoryFilter, 'all'>;
  title: string;
  subtitle: string;
  badge: string;
  keywords: string;
  icon: 'algo' | 'course' | 'challenge' | 'code' | 'game' | 'graph' | 'notes' | 'profile' | 'theme' | 'bot' | 'search';
  action: () => void;
}

export default function CommandPalette() {
  const router = useRouter();
  const locale = useLocale();
  const pt = UI_DICT[locale].palette;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<CategoryFilter>('all');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncTheme = () => {
      setIsDark(document.body.classList.contains('dark'));
    };
    syncTheme();

    const onOpen = () => {
      syncTheme();
      setOpen(true);
      setQuery('');
      setFilter('all');
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    };

    window.addEventListener('open-command-palette', onOpen);
    window.addEventListener('partjava-settings-change', syncTheme);
    return () => {
      window.removeEventListener('open-command-palette', onOpen);
      window.removeEventListener('partjava-settings-change', syncTheme);
    };
  }, []);

  const entries = useMemo<PaletteEntry[]>(() => {
    const quickActions: PaletteEntry[] = [
      {
        id: 'act-challenges',
        category: 'action',
        title: '星图闯关训练',
        subtitle: '11 个进阶阶段 · 215+ 编程题目',
        badge: '核心模块',
        keywords: '星图 闯关 挑战 刷题 oj challenges',
        icon: 'challenge',
        action: () => router.push('/challenges'),
      },
      {
        id: 'act-editor',
        category: 'action',
        title: '极客代码实验室 (IDE)',
        subtitle: 'Docker 多语言隔离沙箱 + JVM 栈帧回放',
        badge: '核心模块',
        keywords: '代码 编辑器 ide c++ java python code editor',
        icon: 'code',
        action: () => router.push('/code/editor'),
      },
      {
        id: 'act-graph',
        category: 'action',
        title: '全栈知识图谱',
        subtitle: '梳理计算机、AI、软件工程与安全前置依赖路径',
        badge: '核心模块',
        keywords: '知识图谱 路线 前置依赖 knowledge graph',
        icon: 'graph',
        action: () => router.push('/knowledge-graph'),
      },
      {
        id: 'act-study',
        category: 'action',
        title: '禾硙全栈课程书院',
        subtitle: '进入 467 节双页翻书讲义索引',
        badge: '学习中心',
        keywords: '课程 书院 学习中心 翻书 study',
        icon: 'course',
        action: () => router.push('/study'),
      },
      {
        id: 'act-game',
        category: 'action',
        title: '极客解压室 · 原生小游戏',
        subtitle: '20 款交互编程与经典算法益智小游戏',
        badge: '解压工具',
        keywords: '游戏 解压 贪吃蛇 俄罗斯方块 game arcade',
        icon: 'game',
        action: () => router.push('/tools/game'),
      },
      {
        id: 'act-notes',
        category: 'action',
        title: '素笺学习笔记',
        subtitle: '查看公开共享笔记与个人学习归档',
        badge: '知识沉淀',
        keywords: '笔记 notes markdown',
        icon: 'notes',
        action: () => router.push('/notes'),
      },
      {
        id: 'act-profile',
        category: 'action',
        title: '个人学习数据与成就',
        subtitle: '查看学习时长趋势、勋章与收藏夹',
        badge: '个人中心',
        keywords: '个人 资料 数据 成就 收藏 profile',
        icon: 'profile',
        action: () => router.push('/profile'),
      },
      {
        id: 'act-theme',
        category: 'action',
        title: isDark ? '切换为浅色素笺主题' : '切换为深色墨砚主题',
        subtitle: '即时切换全站「素笺 × 墨砚」视觉外观',
        badge: '快捷指令',
        keywords: '主题 切换 深色 浅色 dark light theme',
        icon: 'theme',
        action: () => {
          const nextDark = !document.body.classList.contains('dark');
          document.body.classList.toggle('dark', nextDark);
          try {
            localStorage.setItem('theme', nextDark ? 'dark' : 'light');
            const raw = localStorage.getItem('user_settings');
            const parsed = raw ? JSON.parse(raw) : {};
            localStorage.setItem(
              'user_settings',
              JSON.stringify({ ...parsed, theme: nextDark ? 'dark' : 'light', darkMode: nextDark })
            );
          } catch {}
          window.dispatchEvent(
            new CustomEvent('partjava-settings-change', {
              detail: { theme: nextDark ? 'dark' : 'light', darkMode: nextDark },
            })
          );
        },
      },
      {
        id: 'act-ai',
        category: 'action',
        title: '打开「禾桔」AI 伴学助手',
        subtitle: '随时提问课程知识点、代码调试与错题点拨',
        badge: 'AI 助教',
        keywords: 'ai 禾桔 助手 机器人 对话 chat bot',
        icon: 'bot',
        action: () =>
          window.dispatchEvent(new CustomEvent('toggle-ai-chat', { detail: { forceOpen: true } })),
      },
    ];

    const algoEntries: PaletteEntry[] = ALGORITHM_REGISTRY.map((algo) => ({
      id: `algo-${algo.id}`,
      category: 'algo',
      title: `${algo.name}（3D 推演）`,
      subtitle: `${algo.category} · ${algo.difficulty} · ${algo.complexity}`,
      badge: '3D 算法',
      keywords: `${algo.id} ${algo.name} ${algo.category} ${algo.principle} 算法 3d`,
      icon: 'algo',
      action: () =>
        router.push(`/code/editor?tab=visualizer&algo=${encodeURIComponent(algo.id)}`),
    }));

    const courseEntries: PaletteEntry[] = Object.entries(navigationItems).flatMap(
      ([domain, subjects]) =>
        subjects.flatMap((subject) =>
          (subject.subitems || []).map((sub) => ({
            id: `course-${sub.href}`,
            category: 'course' as const,
            title: `${subject.name} · ${sub.name}`,
            subtitle: `${domain}体系课程 · 双页翻书讲义`,
            badge: domain,
            keywords: `${domain} ${subject.name} ${sub.name} 课程 study`,
            icon: 'course' as const,
            action: () => router.push(sub.href),
          }))
        )
    );

    return [...quickActions, ...algoEntries, ...courseEntries];
  }, [isDark, router]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base =
      filter === 'all' ? entries : entries.filter((item) => item.category === filter);

    if (!q) {
      if (filter === 'all') {
        const actions = entries.filter((e) => e.category === 'action');
        const sampleAlgos = entries.filter((e) => e.category === 'algo').slice(0, 6);
        return [...actions, ...sampleAlgos];
      }
      return base.slice(0, 24);
    }

    const tokens = q.split(/\s+/).filter(Boolean);
    const matches = base.filter((item) => {
      const hay = `${item.title} ${item.subtitle} ${item.badge} ${item.keywords}`.toLowerCase();
      return tokens.every((tk) => hay.includes(tk));
    });

    const deepSearchEntry: PaletteEntry = {
      id: `search-${q}`,
      category: 'action',
      title: `全站深度搜索 “${query.trim()}”`,
      subtitle: '跳转到搜索结果页，检索笔记、题目与开发工具正文',
      badge: '全站检索',
      keywords: q,
      icon: 'search',
      action: () => router.push(`/tools/search?q=${encodeURIComponent(query.trim())}`),
    };

    return [...matches.slice(0, 28), deepSearchEntry];
  }, [entries, filter, query, router]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, filter]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) => (filtered.length ? (prev + 1) % filtered.length : 0));
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) =>
          filtered.length ? (prev - 1 + filtered.length) % filtered.length : 0
        );
        return;
      }
      if (e.key === 'Enter' && filtered[activeIndex]) {
        e.preventDefault();
        const item = filtered[activeIndex];
        setOpen(false);
        item.action();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, filtered, activeIndex]);

  useEffect(() => {
    if (!open || !listRef.current) return;
    const activeEl = listRef.current.querySelector<HTMLElement>(`[data-cmd-idx="${activeIndex}"]`);
    activeEl?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex, open]);

  if (!open) return null;

  const renderIcon = (kind: PaletteEntry['icon']) => {
    const cls = 'w-4 h-4 shrink-0';
    switch (kind) {
      case 'algo':
        return <Box className={cls} />;
      case 'course':
        return <BookOpen className={cls} />;
      case 'challenge':
        return <Compass className={cls} />;
      case 'code':
        return <Code2 className={cls} />;
      case 'game':
        return <Gamepad2 className={cls} />;
      case 'graph':
        return <Network className={cls} />;
      case 'notes':
        return <FileText className={cls} />;
      case 'profile':
        return <User className={cls} />;
      case 'theme':
        return isDark ? <Sun className={cls} /> : <Moon className={cls} />;
      case 'bot':
        return <Bot className={cls} />;
      default:
        return <Search className={cls} />;
    }
  };

  return (
    <div
      data-command-palette
      className="fixed inset-0 z-[120] bg-black/45 backdrop-blur-sm flex items-start justify-center pt-[12vh] px-4"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="禾硙 Unolgy 全局快捷命令面板"
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-surface-raised border border-line-strong shadow-[0_28px_80px_rgba(11,16,28,0.42)] overflow-hidden text-content-primary"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 顶部零延迟搜索输入栏 */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-line-subtle">
          <Search className="w-4 h-4 text-brand-primary shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={pt.placeholder}
            className="flex-1 bg-transparent border-0 outline-none text-sm text-content-primary placeholder:text-content-muted"
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="p-1 rounded-lg text-content-muted hover:text-content-primary hover:bg-surface-muted transition-colors"
            aria-label="关闭命令面板"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 分类过滤胶囊 */}
        <div className="flex items-center justify-between gap-2 px-4 py-2 bg-surface-muted/60 border-b border-line-subtle text-xs">
          <div className="flex items-center gap-1.5">
            {(
              [
                { id: 'all', label: pt.tabAll },
                { id: 'algo', label: `${pt.tabAlgo} (${ALGORITHM_REGISTRY.length})` },
                { id: 'course', label: pt.tabCourse },
                { id: 'action', label: pt.tabAction },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  filter === tab.id
                    ? 'bg-brand-primary text-content-inverse shadow-sm'
                    : 'text-content-secondary hover:text-content-primary hover:bg-surface-raised'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <span className="hidden sm:inline font-code text-[11px] text-content-muted">
            {pt.hint}
          </span>
        </div>

        {/* 结果列表（零延迟高亮切换） */}
        <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2 space-y-0.5 custom-scrollbar">
          {filtered.map((item, idx) => {
            const active = idx === activeIndex;
            return (
              <button
                key={item.id}
                type="button"
                data-cmd-idx={idx}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => {
                  setOpen(false);
                  item.action();
                }}
                className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-left ${
                  active
                    ? 'bg-brand-soft text-content-primary border border-brand-primary/25'
                    : 'text-content-secondary hover:bg-surface-muted/70 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      active
                        ? 'bg-brand-primary text-content-inverse'
                        : 'bg-surface-muted text-content-muted'
                    }`}
                  >
                    {renderIcon(item.icon)}
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold truncate">{item.title}</div>
                    <div className="text-xs text-content-muted truncate">{item.subtitle}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] font-code px-2 py-0.5 rounded-md bg-surface-muted text-content-muted border border-line-subtle">
                    {item.badge}
                  </span>
                  {active && <CornerDownLeft className="w-3.5 h-3.5 text-brand-primary" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

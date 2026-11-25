'use client';

import { useEffect, useState } from 'react';

export type Locale = 'zh' | 'en';

const LOCALE_EVENT = 'unolgy-locale-change';

export function getStoredLocale(): Locale {
  if (typeof window === 'undefined') return 'zh';
  try {
    return window.localStorage.getItem('language') === 'en' ? 'en' : 'zh';
  } catch {
    return 'zh';
  }
}

export function setAppLocale(locale: Locale) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem('language', locale);
    document.documentElement.lang = locale;
  } catch {}
  window.dispatchEvent(new CustomEvent(LOCALE_EVENT, { detail: { locale } }));
}

export function useLocale(): Locale {
  const [locale, setLocale] = useState<Locale>('zh');

  useEffect(() => {
    setLocale(getStoredLocale());
    const onChange = (e: Event) => {
      const custom = e as CustomEvent<{ locale?: Locale }>;
      setLocale(custom.detail?.locale || getStoredLocale());
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'language') setLocale(getStoredLocale());
    };
    window.addEventListener(LOCALE_EVENT, onChange);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener(LOCALE_EVENT, onChange);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  return locale;
}

export const UI_DICT = {
  zh: {
    nav: {
      home: '首页',
      notes: '笔记',
      graph: '图谱',
      profile: '资料',
      data: '数据',
      code: '代码',
      challenges: '挑战',
      robot: '机器人',
      searchPlaceholder: '搜索课程、工具、笔记... (Ctrl+K)',
      login: '登录',
      register: '注册',
      notifications: '通知',
      themeToDark: '切换墨砚深色主题',
      themeToLight: '切换素笺浅色主题',
      megaBadge: '学习中心',
      megaSub: '41 门全栈体系课程 · 悬停快速直达',
      megaLink: '查看全栈知识图谱 →',
      menuProfile: '个人资料',
      menuNotes: '我的笔记',
      menuSettings: '设置',
      menuVip: '会员中心',
      menuGame: '极客解压室',
      menuAdmin: '后台管理',
      menuLogout: '退出登录',
    },
    home: {
      eyebrow: '禾硙（hé wèi）· 交互式编程平台',
      brandMeaning: '禾取生息成长，硙喻研磨精思',
      titleLine1: '如禾生息，如硙精研。',
      titleLine2: '让每一行算法立体可见。',
      subtitle: '在线编写并运行多语言代码，观看实时 3D 算法演练，在星图闯关与体系课程中稳步提升编程能力。',
      ctaPrimary: '开始闯关练习',
      ctaSecondary: '进入代码实验室',
      statUsers: '用户',
      statNotes: '笔记',
      statHours: '时长',
      statAlgos: '算法',
      statChapters: '章节',
      statTools: '工具',
      statChallenges: '挑战',
      arsenalTitle: '开发者工具矩阵直达',
      arsenalDesc: '精选 {count} 款研发常用大模型、IDE、论文与竞赛平台',
      arcadeLabel: '极客解压室',
      expandFolders: '展开全部文件夹',
      collapseFolders: '收起工具矩阵',
      expandedBadge: 'Developer Arsenal · 桌面工具矩阵',
      expandedTitle: '常用软件 / 工具官网直达',
      expandedSub: '按知识点分组 · 悬停图标翻转放大预览 · 拖拽文件夹右下角自由调整行列',
      allGroups: '全部',
      resetLayout: '↺ 重置文件夹布局',
      allToolsBtn: '全部 {count} ↗',
      searchToolsPlaceholder: '筛工具名或简介...',
      recentToolsLabel: '最近打开',
      emptySearchTitle: '未找到匹配的工具',
      emptySearchSub: '试试其他关键词吧',
      feedbackNote: '如有更多常用软件建议，欢迎补充！',
    },
    engines: {
      heading: '三大核心学习模块',
      sub: '点击卡片直达对应模块 · 悬停卡片上方浮出页面实时预览，卡片二支持点击数组演示二分',
      academyLink: '进入课程书院',
      card1Unit: '道精选题目',
      card1Title: '星图闯关训练',
      card1Desc: '涵盖 11 个进阶阶段，支持在线编写提交代码、自动评测样例与 AI 思考题解析。',
      card1Stages: ['01 基础', '04 机器学习', '08 大模型'],
      card2Unit: '种算法演示',
      card2Title: '代码与 3D 算法演示',
      card2Desc: '在线编写运行 C++、Java 与 Python，同步观察排序、搜索和机器学习三维过程演示。',
      card2Cta: '3D 推演 →',
      card3Unit: '课程章节',
      card3Title: '知识图谱与翻页课程',
      card3Desc: '按学科梳理前后置学习路线，点击图谱任意节点直达翻书课程与配套笔记。',
      card3Domains: ['计算机', '人工智能', '软件工程', '网络安全'],
      previewLabel: '页面实时微缩预览',
      previewChallengesTitle: '墨砚星穹 · 闯关空间预览',
      previewVisualizerTitle: '3D 算法流形与沙箱联动预览',
      previewGalaxyTitle: '全栈星系图谱 & 实体翻书预览',
    },
    sanctuary: {
      focusMonitor: '3D 书房 · 聚焦代码监视器',
      focusBook: '3D 书房 · 聚焦全息技术手稿',
      focusLamp: '3D 书房 · 激活架构光域',
      focusDefault: '3D 书房 · 点击屏幕或书本直接互动',
      fullscreen: '全屏浏览',
      exitFullscreen: '退出全屏 (ESC)',
    },
    palette: {
      placeholder: '输入算法名（如 二分 / Transformer）、课程章节、游戏或指令...',
      tabAll: '全部推荐',
      tabAlgo: '3D 算法',
      tabCourse: '体系课程',
      tabAction: '功能与指令',
      hint: '↑↓ 选择 · Enter 直达 · Esc 关闭',
    },
    settings: {
      title: '系统设置 System Settings',
      generalTab: '通用',
      notifTab: '通知',
      securityTab: '安全',
      dataTab: '数据',
      themeTitle: '深色模式 Theme',
      themeDesc: '切换界面高对比度纸墨主题',
      langTitle: '语言 Language',
      langDesc: '切换平台核心界面中英文语系（即时生效）',
      fontTitle: '字号大小 Text Size',
      fontDesc: '调整全站文字比例',
      autoSaveTitle: '自动保存 Auto Save',
      autoSaveDesc: '随堂笔记编辑时自动持久化草稿',
      ideThemeTitle: '代码编辑器主题 IDE Theme',
      ideThemeDesc: '设定在线沙箱终端的配色方案',
      small: '小',
      medium: '中',
      large: '大',
    },
    footer: {
      brand: '禾硙 Unolgy',
    },
  },
  en: {
    nav: {
      home: 'Home',
      notes: 'Notes',
      graph: 'Atlas',
      profile: 'Profile',
      data: 'Stats',
      code: 'Code',
      challenges: 'Arena',
      robot: 'Bot',
      searchPlaceholder: 'Search courses, tools, notes... (Ctrl+K)',
      login: 'Sign in',
      register: 'Sign up',
      notifications: 'Notifications',
      themeToDark: 'Switch to Inkstone Dark',
      themeToLight: 'Switch to Porcelain Light',
      megaBadge: 'Academy',
      megaSub: '41 CS Tracks · Hover for instant entry',
      megaLink: 'Explore Knowledge Atlas →',
      menuProfile: 'Profile',
      menuNotes: 'My Notes',
      menuSettings: 'Settings',
      menuVip: 'Membership',
      menuGame: 'Arcade Lab',
      menuAdmin: 'Admin Console',
      menuLogout: 'Sign out',
    },
    home: {
      eyebrow: 'UNOLGY (Hé Wèi) · CS Lab',
      brandMeaning: 'Hé for steady growth · Wèi for deep mastery',
      titleLine1: 'Grow steadily.',
      titleLine2: 'See every algorithm in 3D.',
      subtitle: 'Write and run multi-language code in isolated sandboxes with live 3D visualizers, star-map coding challenges, and structured interactive books.',
      ctaPrimary: 'Start Challenges',
      ctaSecondary: 'Open Code Studio',
      statUsers: 'Users',
      statNotes: 'Notes',
      statHours: 'Hours',
      statAlgos: 'Algos',
      statChapters: 'Lessons',
      statTools: 'Tools',
      statChallenges: 'Arena',
      arsenalTitle: 'Developer Arsenal',
      arsenalDesc: 'Curated {count} essential LLM, IDE, research & competitive coding portals',
      arcadeLabel: 'Arcade Lab',
      expandFolders: 'Expand Folders',
      collapseFolders: 'Collapse Matrix',
      expandedBadge: 'Developer Arsenal · Desktop Folder Matrix',
      expandedTitle: 'Curated Developer Tools & Portals',
      expandedSub: 'Grouped by track · Hover tiles for flip preview · Drag bottom-right corner to resize',
      allGroups: 'All',
      resetLayout: '↺ Reset Layout',
      allToolsBtn: 'All {count} ↗',
      searchToolsPlaceholder: 'Filter tools...',
      recentToolsLabel: 'Recent',
      emptySearchTitle: 'No matching tools found',
      emptySearchSub: 'Try another keyword',
      feedbackNote: 'Have a tool recommendation? Feedback is always welcome!',
    },
    engines: {
      heading: 'Core Learning Engines',
      sub: 'Hover cards for live mini-window previews · Click array cells in Card 2 to run Binary Search',
      academyLink: 'Course Academy',
      card1Unit: 'Challenges',
      card1Title: 'Star-Map Coding Arena',
      card1Desc: '11 progressive stages with live multi-language judging, case traces, and AI hint breakdowns.',
      card1Stages: ['01 Basics', '04 ML Core', '08 LLMs'],
      card2Unit: '3D Algos',
      card2Title: 'Code & 3D Algorithm Lab',
      card2Desc: 'Execute C++, Java, and Python while watching sorting, search, and ML manifolds in real time.',
      card2Cta: 'Launch 3D →',
      card3Unit: 'Lessons',
      card3Title: 'Knowledge Atlas & Books',
      card3Desc: 'Structured prerequisite roadmaps linking interactive nodes straight to dual-page textbooks.',
      card3Domains: ['CS Core', 'AI / ML', 'Software', 'Security'],
      previewLabel: 'LIVE PAGE PREVIEW',
      previewChallengesTitle: 'Obsidian Star-Map · Challenge Arena',
      previewVisualizerTitle: '3D Manifold & Sandbox Sync Preview',
      previewGalaxyTitle: 'Knowledge Atlas & Hardcover Textbook',
    },
    sanctuary: {
      focusMonitor: '3D Study · Focusing Code Display',
      focusBook: '3D Study · Focusing Holographic Book',
      focusLamp: '3D Study · Illuminating Architecture',
      focusDefault: '3D Study · Click monitor or book to interact',
      fullscreen: 'Fullscreen',
      exitFullscreen: 'Exit (ESC)',
    },
    palette: {
      placeholder: 'Type an algorithm (e.g. Binary, Transformer), lesson, game, or command...',
      tabAll: 'Recommended',
      tabAlgo: '3D Algos',
      tabCourse: 'Lessons',
      tabAction: 'Commands',
      hint: '↑↓ Navigate · Enter Open · Esc Close',
    },
    settings: {
      title: 'Settings',
      generalTab: 'General',
      notifTab: 'Alerts',
      securityTab: 'Security',
      dataTab: 'Data',
      themeTitle: 'Appearance Theme',
      themeDesc: 'Toggle high-contrast Porcelain Light / Inkstone Dark theme',
      langTitle: 'Interface Language',
      langDesc: 'Switch primary UI language between Chinese and English instantly',
      fontTitle: 'Text Size',
      fontDesc: 'Adjust global typography scale',
      autoSaveTitle: 'Auto Save',
      autoSaveDesc: 'Automatically persist note drafts while editing',
      ideThemeTitle: 'IDE Editor Theme',
      ideThemeDesc: 'Set syntax color scheme for the cloud code studio',
      small: 'S',
      medium: 'M',
      large: 'L',
    },
    footer: {
      brand: 'Unolgy Studio',
    },
  },
} as const;

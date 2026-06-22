// ============================================================
//  科目主题系统
//  每个方向有独立的主色 + 纸色，组件通过 theme prop 使用
// ============================================================

export interface SubjectTheme {
  id: string
  name: string
  /** 主色（按钮/标签/强调） */
  accent: string
  accentLight: string
  accentDark: string
  /** 页面背景 */
  paperBg: string
  /** 卡片背景 */
  paperCard: string
}

export const THEMES: Record<string, SubjectTheme> = {
  /**
   * 💻 计算机 — 宣纸白 + 鸾尾蓝
   *
   * 配色说明：
   * - accent 主色：用于 Button、BookCover 标题装饰、TagGrid 标签背景
   * - accentLight 浅色：用于 hover 状态、渐变过渡
   * - accentDark 深色：用于文字、边框、强调
   * - paperBg 纸色：LessonLayout 页面背景（仿古纸质感）
   * - paperCard 卡片色：spread 翻页内容的背景色
   *
   * 修改后直接生效，无需改动任何页面文件。
   */
  computer: {
    id: 'computer',
    name: '计算机',
    accent: '#1660AB',      // 主色 鸾尾蓝
    accentLight: '#4a87c4', // 浅蓝 hover
    accentDark: '#0e4a8a',  // 深蓝 文字/边框
    paperBg: '#BDE0FE',     // 纸色 冰川白
    paperCard: '#d8d8db',   // 卡片色
  },

  ai: {
    id: 'ai',
    name: '人工智能',
    accent: '#2B313F',      // 主色 幽谷灰
    accentLight: '#5a6070', // 浅灰 hover
    accentDark: '#1a202f',  // 深灰 文字/边框
    paperBg: '#E2E7BF',     // 纸色 嫩菊绿
    paperCard: '#d8d8db',   // 卡片色
  },

  software: {
    id: 'software',
    name: '软件工程',
    accent: '#373834',      // 主色 蒽油绿
    accentLight: '#5a5b56', // 浅绿灰 hover
    accentDark: '#272823',  // 深绿灰 文字/边框
    paperBg: '#C6E6E8',     // 纸色 海天蓝
    paperCard: '#d8d8db',   // 卡片色
  },

  security: {
    id: 'security',
    name: '网络安全',
    accent: '#707899',      // 主色 紫幽兰
    accentLight: '#9299b5', // 浅紫 hover
    accentDark: '#5a6180',  // 深紫 文字/边框
    paperBg: '#E3E3E5',     // 纸色 烟雨白
    paperCard: '#d8d8db',   // 卡片色
  },
}

/** 计算亮度，用于决定文字用白色还是深色 */
export function isLight(color: string) {
  const hex = color.replace('#', '')
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 > 150
}

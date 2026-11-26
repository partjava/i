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
   * 💻 计算机 — 深墨鸾尾蓝 + 清透云雾纸
   */
  computer: {
    id: 'computer',
    name: '计算机',
    accent: '#1B3B6F',
    accentLight: '#3B82F6',
    accentDark: '#0F2547',
    paperBg: '#F3F7FC',
    paperCard: '#FFFFFF',
  },

  /**
   * 🧠 人工智能 — 星曜靛紫 + 柔雅淡紫宣纸
   */
  ai: {
    id: 'ai',
    name: '人工智能',
    accent: '#4F46E5',
    accentLight: '#7C3AED',
    accentDark: '#3730A3',
    paperBg: '#F5F4FB',
    paperCard: '#FFFFFF',
  },

  /**
   * 🏗️ 软件工程 — 松石青绿 + 清润玉青纸
   */
  software: {
    id: 'software',
    name: '软件工程',
    accent: '#0F766E',
    accentLight: '#14B8A6',
    accentDark: '#115E59',
    paperBg: '#F2FAF7',
    paperCard: '#FFFFFF',
  },

  /**
   * 🛡️ 网络安全 — 鎏金琥珀 + 暖羊皮纸
   */
  security: {
    id: 'security',
    name: '网络安全',
    accent: '#B45309',
    accentLight: '#D97706',
    accentDark: '#92400E',
    paperBg: '#FBF7F0',
    paperCard: '#FFFFFF',
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

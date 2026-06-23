/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ===== 纸墨色系 — 全站统一冷色调 =====
        paper: {
          50:  '#f5f7fa',  // 最白（卡片背景）
          100: '#EDF0F5',  // 宣纸（主背景）冷白
          200: '#e2e6ed',  // 素笺（区块/卡片背景）
          300: '#d1d6e0',  // 纸边（边框/分割线）
          400: '#b8bfcc',  // 旧纸（更淡装饰）
        },
        ink: {
          DEFAULT: '#0C1F3D',  // 深藏青（正文）
          light:   '#3d4f6b',  // 蓝灰（辅助文字）
          lighter: '#6b7d99',  // 浅灰蓝（注释文字）
          fade:    '#a0aec0',  // 更淡（装饰文字）
        },
        // ===== 页面背景 =====
        page: {
          bg:   '#EDF0F5',  // 冷白（同 paper-100）
          dark: '#0C1F3D',  // 深色模式（同 ink）
        },
        // ===== 点缀色（冷色调） =====
        amber: {
          DEFAULT: '#6366f1',  // 靛蓝（主色/强调）
          light:   '#818cf8',
          dark:    '#4f46e5',
          pale:    '#e0e7ff',
        },
        jade: {
          DEFAULT: '#BBFF5C',  // 荧光绿（成功/高亮）
          light:   '#ccff7a',
          pale:    '#e8ffcc',
        },
        rust: {
          DEFAULT: '#8b5cf6',  // 紫罗兰（危险/删除 — 冷色版）
          light:   '#a78bfa',
          pale:    '#ede9fe',
        },
        azure: {
          DEFAULT: '#044BB5',  // 亮蓝（链接）
          light:   '#2a6fd4',
          pale:    '#dce8f7',
        },
      },
      fontFamily: {
        display: ['"Noto Serif SC"', '"Source Han Serif SC"', 'Georgia', 'serif'],
        body:    ['"Noto Sans SC"', '"Source Han Sans SC"', 'system-ui', 'sans-serif'],
        code:    ['"JetBrains Mono"', '"Fira Code"', '"Cascadia Code"', 'monospace'],
      },
      boxShadow: {
        'frost':       '0 4px 24px rgba(12, 31, 61, 0.08), 0 1px 4px rgba(12, 31, 61, 0.04)',
        'frost-lg':    '0 8px 40px rgba(12, 31, 61, 0.10), 0 2px 8px rgba(12, 31, 61, 0.05)',
        'book':        '0 6px 28px rgba(12, 31, 61, 0.09), 0 2px 6px rgba(12, 31, 61, 0.05)',
        'book-hover':  '0 8px 36px rgba(12, 31, 61, 0.12), 0 2px 8px rgba(12, 31, 61, 0.06)',
        'page-left':   '2px 0 16px rgba(12, 31, 61, 0.06)',
        'page-right':  '-2px 0 16px rgba(12, 31, 61, 0.06)',
      },
      animation: {
        'book-exit-forward':  'bookExitForward  0.35s ease-in-out forwards',
        'book-enter-forward': 'bookEnterForward 0.35s ease-in-out forwards',
        'book-exit-back':     'bookExitBack     0.35s ease-in-out forwards',
        'book-enter-back':    'bookEnterBack    0.35s ease-in-out forwards',
        'page-fade-in':       'pageFadeIn       0.3s ease-out forwards',
      },
      keyframes: {
        bookExitForward: {
          '0%':   { transform: 'perspective(1400px) rotateY(0deg) scale(1)', opacity: '1' },
          '100%': { transform: 'perspective(1400px) rotateY(-12deg) scale(0.95)', opacity: '0' },
        },
        bookEnterForward: {
          '0%':   { transform: 'perspective(1400px) rotateY(12deg) scale(0.95) translateX(20px)', opacity: '0' },
          '100%': { transform: 'perspective(1400px) rotateY(0deg) scale(1) translateX(0)', opacity: '1' },
        },
        bookExitBack: {
          '0%':   { transform: 'perspective(1400px) rotateY(0deg) scale(1)', opacity: '1' },
          '100%': { transform: 'perspective(1400px) rotateY(12deg) scale(0.95) translateX(-20px)', opacity: '0' },
        },
        bookEnterBack: {
          '0%':   { transform: 'perspective(1400px) rotateY(-12deg) scale(0.95)', opacity: '0' },
          '100%': { transform: 'perspective(1400px) rotateY(0deg) scale(1)', opacity: '1' },
        },
        pageFadeIn: {
          '0%':   { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

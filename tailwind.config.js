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
        // ===== 纸墨色系 — 书本设计系统 =====
        paper: {
          50:  '#faf8f5',  // 最白
          100: '#f7f4ef',  // 宣纸（主背景）
          200: '#efebe5',  // 素笺（卡片/区块）
          300: '#e3ddd3',  // 纸边（边框）
          400: '#d5cdc2',  // 旧纸（分割线）
        },
        ink: {
          DEFAULT: '#2c2a27',  // 暖黑（正文）
          light:   '#6e6860',  // 暖灰（辅助）
          lighter: '#9a948a',  // 浅灰（注释）
          fade:    '#c4beb4',  // 更淡
        },
        // ===== 点缀色 =====
        amber: {
          DEFAULT: '#a67c52',  // 琥珀（主色/装饰）
          light:   '#c4a88a',
          dark:    '#7d5e3e',
          pale:    '#ebe0d4',
        },
        jade: {
          DEFAULT: '#5a8f6d',  // 玉青（成功/完成）
          light:   '#7aaa8a',
          pale:    '#dcebe0',
        },
        rust: {
          DEFAULT: '#b85a48',  // 赭石（危险/删除）
          light:   '#d07a68',
          pale:    '#f0ddd8',
        },
        azure: {
          DEFAULT: '#5a7fa0',  // 青蓝（链接）
          light:   '#7a9ab8',
          pale:    '#dce6f0',
        },
      },
      fontFamily: {
        display: ['"Noto Serif SC"', '"Source Han Serif SC"', 'Georgia', 'serif'],
        body:    ['"Noto Sans SC"', '"Source Han Sans SC"', 'system-ui', 'sans-serif'],
        code:    ['"JetBrains Mono"', '"Fira Code"', '"Cascadia Code"', 'monospace'],
      },
      boxShadow: {
        'book':        '0 6px 28px rgba(44, 42, 39, 0.09), 0 2px 6px rgba(44, 42, 39, 0.05)',
        'book-hover':  '0 8px 36px rgba(44, 42, 39, 0.12), 0 2px 8px rgba(44, 42, 39, 0.06)',
        'page-left':   '2px 0 16px rgba(44, 42, 39, 0.06)',
        'page-right':  '-2px 0 16px rgba(44, 42, 39, 0.06)',
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

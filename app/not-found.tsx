import Link from 'next/link';

/**
 * 全站 404 页面（App Router 约定文件）
 * 保留纸墨设计基调，提供回首页与常用入口。
 */
export default function NotFound() {
  const quickLinks = [
    { name: '📚 课程中心', href: '/study/computer/java', desc: '四大领域系统学习' },
    { name: '🏆 星际闯关', href: '/challenges', desc: '编程挑战与排行榜' },
    { name: '💻 代码沙箱', href: '/code/editor', desc: '10 种语言在线运行' },
    { name: '📝 我的笔记', href: '/notes', desc: '智能笔记与知识沉淀' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf6f0] px-6 py-16">
      <div className="max-w-lg w-full text-center">
        <div className="text-6xl mb-5">🐈‍⬛</div>
        <h1 className="text-4xl font-bold text-[#5c4033] mb-2">404</h1>
        <p className="text-base text-[#8b7355] mb-1">禾桔在这一页什么也没找到</p>
        <p className="text-sm text-[#a89279] mb-8">
          你要访问的页面可能已被移动或从未存在，去别处逛逛吧。
        </p>
        <div className="grid grid-cols-2 gap-3 mb-8">
          {quickLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block p-4 rounded-2xl border border-[#8b7355]/25 bg-white/70 hover:bg-white hover:border-[#8b7355]/50 transition-all text-left"
            >
              <div className="text-sm font-semibold text-[#5c4033]">{l.name}</div>
              <div className="text-xs text-[#a89279] mt-1">{l.desc}</div>
            </Link>
          ))}
        </div>
        <Link
          href="/"
          className="inline-block px-6 py-2.5 rounded-xl bg-[#8b7355] text-[#faf6f0] text-sm font-medium hover:bg-[#5c4033] transition-colors"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}

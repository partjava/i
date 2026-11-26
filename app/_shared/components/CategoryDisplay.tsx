'use client';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { navigationItems, NavigationItem } from '../data/navigation';

const CATEGORY_THEME: Record<
  string,
  { dot: string; badge: string; count: string }
> = {
  计算机: {
    dot: 'bg-[#1B3B6F] dark:bg-[#38BDF8]',
    badge:
      'bg-[#1B3B6F]/10 text-[#1B3B6F] border-[#1B3B6F]/20 dark:bg-sky-500/15 dark:text-sky-300 dark:border-sky-400/25',
    count: 'bg-[#1B3B6F]/8 text-[#1B3B6F] dark:bg-sky-500/15 dark:text-sky-300',
  },
  人工智能: {
    dot: 'bg-violet-600 dark:bg-violet-400',
    badge:
      'bg-violet-500/10 text-violet-700 border-violet-500/20 dark:bg-violet-500/15 dark:text-violet-300 dark:border-violet-400/25',
    count: 'bg-violet-500/10 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300',
  },
  网络安全: {
    dot: 'bg-amber-600 dark:bg-[#D4AD72]',
    badge:
      'bg-[#D4AD72]/15 text-[#9A7234] border-[#D4AD72]/35 dark:bg-[#D4AD72]/15 dark:text-[#E8CA96] dark:border-[#D4AD72]/30',
    count: 'bg-[#D4AD72]/15 text-[#9A7234] dark:bg-[#D4AD72]/15 dark:text-[#E8CA96]',
  },
  软件工程: {
    dot: 'bg-emerald-600 dark:bg-emerald-400',
    badge:
      'bg-emerald-500/10 text-emerald-700 border-emerald-500/20 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-400/25',
    count: 'bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
  },
};

export default function CategoryDisplay() {
  return (
    <div className="rounded-2xl bg-surface-raised border border-line-subtle shadow-sm p-5 sm:p-7 lg:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
        {Object.entries(navigationItems).map(([category, items]: [string, NavigationItem[]]) => {
          const theme = CATEGORY_THEME[category] || CATEGORY_THEME['计算机'];
          return (
            <div key={category} className="col-span-1 flex flex-col">
              <div className="flex items-center justify-between gap-2 pb-3 mb-3.5 border-b border-line-subtle">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${theme.dot}`} />
                  <h3 className="text-[17px] sm:text-[18px] font-bold font-display text-content-primary tracking-tight truncate">
                    {category}
                  </h3>
                </div>
                <span className={`text-xs font-mono font-semibold px-2 py-0.5 rounded-full shrink-0 tabular-nums ${theme.count}`}>
                  {items.length} 门
                </span>
              </div>

              <div className="grid grid-cols-1 gap-y-1.5">
                {items.map((item: NavigationItem) => {
                  let homepage = '';
                  if (item.subitems && item.subitems.length > 0) {
                    const firstHref = item.subitems[0].href;
                    const parts = firstHref.split('/');
                    homepage = parts.slice(0, -1).join('/');
                  } else {
                    homepage = `/study/${item.name.toLowerCase()}`;
                  }
                  const chapterCount = item.subitems?.length || 0;
                  return (
                    <Link
                      key={item.code}
                      href={homepage}
                      className="group flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-xl border border-transparent hover:border-[#D4AD72]/45 hover:bg-surface-muted/80 dark:hover:bg-white/[0.05] hover:translate-x-0.5 transition-all duration-150"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl border text-[13px] font-bold tracking-tight transition-transform group-hover:scale-105 ${theme.badge}`}
                        >
                          {item.code}
                        </span>
                        <span className="text-[15px] font-medium text-content-primary group-hover:text-brand-primary dark:group-hover:text-[#D4AD72] truncate leading-snug transition-colors">
                          {item.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        {chapterCount > 0 && (
                          <span className="text-xs font-mono text-content-muted tabular-nums">
                            {chapterCount} 讲
                          </span>
                        )}
                        <ChevronRight className="w-4 h-4 text-content-muted opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-brand-primary dark:group-hover:text-[#D4AD72] transition-all" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

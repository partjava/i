'use client';
import Link from 'next/link';
import { navigationItems, NavigationItem } from '../data/navigation';

export default function CategoryDisplay() {
  return (
    <div className="rounded-2xl bg-surface-raised border border-line-subtle shadow-sm p-4 sm:p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {Object.entries(navigationItems).map(([category, items]: [string, NavigationItem[]]) => (
          <div key={category} className="col-span-1">
            <h3 className="text-sm font-semibold text-content-primary mb-2 pb-1.5 border-b border-line-subtle">
              {category}
            </h3>
            <div className="grid grid-cols-1 gap-y-0.5">
              {items.map((item: NavigationItem) => {
                let homepage = '';
                if (item.subitems && item.subitems.length > 0) {
                  const firstHref = item.subitems[0].href;
                  const parts = firstHref.split('/');
                  homepage = parts.slice(0, -1).join('/');
                } else {
                  homepage = `/study/${item.name.toLowerCase()}`;
                }
                return (
                  <Link
                    key={item.code}
                    href={homepage}
                    className="group flex items-center space-x-2.5 text-content-secondary hover:text-content-primary py-1 px-2 rounded-lg hover:bg-brand-soft transition-colors"
                  >
                    <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center bg-brand-soft text-[11px] font-medium text-brand-primary rounded-md">
                      {item.code}
                    </span>
                    <span className="text-[13px] truncate leading-tight">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
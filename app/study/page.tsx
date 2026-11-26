'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import CategoryDisplay from '../_shared/components/CategoryDisplay';
import SiteFooter from '../_shared/components/SiteFooter';

export default function StudyPage() {
  const params = useParams();
  const category = params?.category as string;
  const topic = params?.topic as string;

  return (
    <div className="min-h-[calc(100vh-70px)] bg-surface-page flex flex-col justify-between">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-6 space-y-5">
        <div className="bg-surface-raised shadow-sm rounded-2xl px-6 py-4 sm:px-7 border border-line-subtle">
          {category && topic ? (
            <>
              <h1 className="text-2xl font-bold font-display text-content-primary mb-2">
                {category} - {topic}
              </h1>
              <div className="prose max-w-none">
                <p className="text-content-secondary">
                  这里是 {category} 分类下 {topic} 的学习内容。
                </p>
              </div>
            </>
          ) : (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3 min-w-0">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-muted border border-line-subtle text-brand-primary text-[11px] font-mono font-semibold shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AD72]" />
                  <span>UNOLGY · 课程书院</span>
                </span>
                <h1 className="text-lg sm:text-xl font-display font-bold text-content-primary shrink-0">
                  禾硙全栈课程书院
                </h1>
                <p className="hidden xl:block text-content-muted text-xs truncate">
                  点击下方学科专题直达双页翻书讲义与配套笔记，或前往知识图谱串联全栈路线
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <Link
                  href="/knowledge-graph"
                  className="px-3.5 py-1.5 rounded-xl font-semibold text-xs text-content-inverse bg-brand-primary hover:bg-brand-hover shadow-sm transition-all"
                >
                  进入全栈知识图谱
                </Link>
                <Link
                  href="/code/editor"
                  className="px-3.5 py-1.5 rounded-xl font-semibold text-xs text-content-primary bg-surface-muted hover:bg-brand-soft border border-line-strong transition-all"
                >
                  极客代码工坊 & 3D 算法
                </Link>
              </div>
            </div>
          )}
        </div>
        <CategoryDisplay />
      </div>
      <SiteFooter className="!py-2.5" />
    </div>
  );
} 
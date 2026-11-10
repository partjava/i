'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import CategoryDisplay from '../_shared/components/CategoryDisplay';

export default function StudyPage() {
  const params = useParams();
  const category = params?.category as string;
  const topic = params?.topic as string;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-2xl p-6 border border-slate-200/80 mb-6">
        {category && topic ? (
          <>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {category} - {topic}
            </h1>
            <div className="prose max-w-none">
              <p className="text-gray-600">
                这里是 {category} 分类下 {topic} 的学习内容。
              </p>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
              欢迎来到 PartJava 全栈学习中心
            </h1>
            <p className="text-slate-600 mb-5 text-sm sm:text-base">
              请从下方分类矩阵或左侧导航栏选择感兴趣的主题开始学习，或开启全景星系知识图谱
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/knowledge-graph"
                className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-indigo-600 to-sky-500 hover:brightness-110 shadow-md transition-all"
              >
                🌌 进入全栈知识星系图谱
              </Link>
              <Link
                href="/code/editor"
                className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-all"
              >
                💻 极客代码工坊 & 3D 算法演示
              </Link>
            </div>
          </div>
        )}
      </div>
      <CategoryDisplay />
    </div>
  );
} 
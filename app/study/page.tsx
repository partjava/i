'use client';
import { useParams } from 'next/navigation';
import CategoryDisplay from '../components/CategoryDisplay';

export default function StudyPage() {
  const params = useParams();
  const category = params?.category as string;
  const topic = params?.topic as string;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        {category && topic ? (
          <>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {category} - {topic}
            </h1>
            <div className="prose max-w-none">
              <p className="text-gray-600">
                这里是 {category} 分类下 {topic} 的学习内容。
              </p>
              {/* 这里可以根据不同的分类和主题显示相应的学习内容 */}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              欢迎来到学习中心
            </h1>
            <p className="text-gray-600">
              请从左侧导航栏或顶部菜单选择您感兴趣的主题开始学习
            </p>
          </div>
        )}
      </div>
      <CategoryDisplay />
    </div>
  );
} 
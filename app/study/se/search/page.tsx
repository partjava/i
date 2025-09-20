'use client';
import Link from 'next/link';

export default function SearchPage() {
  const stats = {
    totalLessons: 6,
    difficulty: '中高级',
    duration: '6-8周',
    rating: 4.6
  };

  const roadmap = [
    {
      phase: '基础理论',
      topics: ['搜索引擎基础'],
      duration: '1周'
    },
    {
      phase: '数据采集',
      topics: ['爬虫与数据采集'],
      duration: '2周'
    },
    {
      phase: '索引构建',
      topics: ['索引构建', '查询处理'],
      duration: '2周'
    },
    {
      phase: '实战应用',
      topics: ['Elasticsearch示例', '高级搜索特性'],
      duration: '3周'
    }
  ];

  const features = [
    { icon: '🔍', title: '搜索技术', desc: '完整的搜索引擎技术体系' },
    { icon: '🕷️', title: '数据采集', desc: '高效的网络爬虫技术' },
    { icon: '📝', title: '文本处理', desc: '自然语言处理与索引' },
    { icon: '⚡', title: 'Elasticsearch', desc: '企业级搜索解决方案' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-600 text-white rounded-full text-3xl font-bold mb-6">
            搜
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">智能搜索引擎</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            掌握搜索引擎核心技术，从网络爬虫到智能检索，
            构建高效的企业级搜索系统
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-indigo-600 mb-2">{stats.totalLessons}</div>
            <div className="text-gray-600">课程数量</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-purple-600 mb-2">{stats.difficulty}</div>
            <div className="text-gray-600">难度等级</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-blue-600 mb-2">{stats.duration}</div>
            <div className="text-gray-600">学习周期</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-orange-600 mb-2">{stats.rating}</div>
            <div className="text-gray-600">学员评分</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🌟 课程特色</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="text-2xl">{feature.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                      <p className="text-gray-600 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🗺️ 学习路径</h2>
              <div className="space-y-6">
                {roadmap.map((phase, index) => (
                  <div key={index} className="relative">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                        {index + 1}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{phase.phase}</h3>
                      <span className="ml-auto text-sm text-gray-500">{phase.duration}</span>
                    </div>
                    <div className="ml-12 grid grid-cols-1 md:grid-cols-2 gap-2">
                      {phase.topics.map((topic, topicIndex) => {
                        const topicLinks: { [key: string]: string } = {
                          '搜索引擎基础': '/study/se/search/basic',
                          '爬虫与数据采集': '/study/se/search/crawler',
                          '索引构建': '/study/se/search/index',
                          '查询处理': '/study/se/search/query',
                          'Elasticsearch示例': '/study/se/search/elasticsearch',
                          '高级搜索特性': '/study/se/search/advanced'
                        };
                        
                        return (
                          <Link
                            key={topicIndex}
                            href={topicLinks[topic] || '#'}
                            className="text-sm text-gray-600 bg-gray-50 rounded px-3 py-1 hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-pointer block"
                          >
                            {topic}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🚀 快速开始</h3>
              <div className="space-y-3">
                <Link 
                  href="/study/se/search/basic"
                  className="block w-full bg-indigo-600 text-white text-center py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  开始学习
                </Link>
                <Link 
                  href="/study/se/search/elasticsearch"
                  className="block w-full border border-gray-300 text-gray-700 text-center py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Elasticsearch
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 核心技术</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                  网络爬虫技术
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                  倒排索引算法
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                  相关性排序
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                  分布式搜索
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">💼 职业方向</h3>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg p-3">
                  <div className="font-medium text-indigo-900">搜索工程师</div>
                  <div className="text-sm text-indigo-700">搜索引擎开发与优化</div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-3">
                  <div className="font-medium text-purple-900">爬虫工程师</div>
                  <div className="text-sm text-purple-700">数据采集与处理</div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3">
                  <div className="font-medium text-blue-900">数据挖掘工程师</div>
                  <div className="text-sm text-blue-700">文本挖掘与信息检索</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
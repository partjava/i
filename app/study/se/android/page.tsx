import Link from 'next/link';

export default function AndroidPage() {
  const stats = {
    totalLessons: 11,
    difficulty: '中级',
    duration: '10-12周',
    rating: 4.8
  };

  const roadmap = [
    {
      phase: '开发基础',
      topics: ['概述', '开发环境配置', '基础语法与组件'],
      duration: '3周'
    },
    {
      phase: 'UI与交互',
      topics: ['UI开发与布局', '数据存储与网络', '多媒体与传感器'],
      duration: '3周'
    },
    {
      phase: '高级特性',
      topics: ['高级特性与性能优化', '安全与权限管理'],
      duration: '2周'
    },
    {
      phase: '框架与工程',
      topics: ['第三方库与架构模式', '测试与发布'],
      duration: '2周'
    },
    {
      phase: '实战项目',
      topics: ['实战项目与案例'],
      duration: '2周'
    }
  ];

  const features = [
    { icon: '📱', title: '移动开发', desc: '完整的Android应用开发体系' },
    { icon: '🎨', title: 'UI设计', desc: 'Material Design与现代UI' },
    { icon: '⚡', title: '性能优化', desc: 'Android应用性能调优技术' },
    { icon: '🔐', title: '安全实践', desc: '移动应用安全与权限管理' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 text-white rounded-full text-3xl font-bold mb-6">
            A
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">安卓开发</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            从零开始学习Android开发，掌握现代移动应用开发技术，
            打造优秀的移动应用
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-green-600 mb-2">{stats.totalLessons}</div>
            <div className="text-gray-600">课程数量</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-teal-600 mb-2">{stats.difficulty}</div>
            <div className="text-gray-600">难度等级</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-purple-600 mb-2">{stats.duration}</div>
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
                      <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                        {index + 1}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{phase.phase}</h3>
                      <span className="ml-auto text-sm text-gray-500">{phase.duration}</span>
                    </div>
                    <div className="ml-12 grid grid-cols-1 md:grid-cols-3 gap-2">
                      {phase.topics.map((topic, topicIndex) => {
                        const topicLinks: { [key: string]: string } = {
                          '概述': '/study/se/android/intro',
                          '开发环境配置': '/study/se/android/setup',
                          '基础语法与组件': '/study/se/android/basic',
                          'UI开发与布局': '/study/se/android/ui',
                          '数据存储与网络': '/study/se/android/data-network',
                          '多媒体与传感器': '/study/se/android/media-sensor',
                          '高级特性与性能优化': '/study/se/android/advanced',
                          '安全与权限管理': '/study/se/android/security',
                          '第三方库与架构模式': '/study/se/android/frameworks',
                          '测试与发布': '/study/se/android/testing',
                          '实战项目与案例': '/study/se/android/projects'
                        };
                        
                        return (
                          <Link
                            key={topicIndex}
                            href={topicLinks[topic] || '#'}
                            className="text-sm text-gray-600 bg-gray-50 rounded px-3 py-1 hover:bg-green-50 hover:text-green-600 transition-colors cursor-pointer block"
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
                  href="/study/se/android/intro"
                  className="block w-full bg-green-600 text-white text-center py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  开始学习
                </Link>
                <Link 
                  href="/study/se/android/setup"
                  className="block w-full border border-gray-300 text-gray-700 text-center py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  环境配置
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 核心技术</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  Kotlin/Java
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  Android SDK
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  Jetpack组件
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  Material Design
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">💼 职业方向</h3>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-3">
                  <div className="font-medium text-green-900">Android开发工程师</div>
                  <div className="text-sm text-green-700">移动应用开发与维护</div>
                </div>
                <div className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-lg p-3">
                  <div className="font-medium text-teal-900">移动端架构师</div>
                  <div className="text-sm text-teal-700">移动应用架构设计</div>
                </div>
                <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-lg p-3">
                  <div className="font-medium text-emerald-900">全栈移动工程师</div>
                  <div className="text-sm text-emerald-700">跨平台移动开发</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
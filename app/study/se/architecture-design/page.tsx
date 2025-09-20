import Link from 'next/link';

export default function ArchitectureDesignPage() {
  const stats = {
    totalLessons: 5,
    difficulty: '中高级',
    duration: '6-8周',
    rating: 4.8
  };

  const roadmap = [
    {
      phase: '基础架构',
      topics: ['软件架构基础'],
      duration: '2周'
    },
    {
      phase: '架构风格',
      topics: ['主流架构风格'],
      duration: '2周'
    },
    {
      phase: '设计模式',
      topics: ['常用设计模式'],
      duration: '2周'
    },
    {
      phase: '实战应用',
      topics: ['架构与设计模式实战', '常见面试题与答疑'],
      duration: '2周'
    }
  ];

  const features = [
    { icon: '🏗️', title: '系统架构', desc: '掌握软件系统架构设计原理' },
    { icon: '🎯', title: '设计模式', desc: '深入理解23种经典设计模式' },
    { icon: '⚡', title: '实战导向', desc: '结合真实项目案例学习' },
    { icon: '💡', title: '面试指导', desc: '常见架构设计面试题解析' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 text-white rounded-full text-3xl font-bold mb-6">
            架
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">架构与设计模式</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            掌握软件架构设计核心理念，学习经典设计模式，
            提升系统设计能力，成为优秀的架构师
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-blue-600 mb-2">{stats.totalLessons}</div>
            <div className="text-gray-600">课程数量</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-green-600 mb-2">{stats.difficulty}</div>
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
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                        {index + 1}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{phase.phase}</h3>
                      <span className="ml-auto text-sm text-gray-500">{phase.duration}</span>
                    </div>
                    <div className="ml-12 grid grid-cols-1 md:grid-cols-2 gap-2">
                      {phase.topics.map((topic, topicIndex) => {
                        const topicLinks: { [key: string]: string } = {
                          '软件架构基础': '/study/se/architecture-design/basic',
                          '主流架构风格': '/study/se/architecture-design/styles',
                          '常用设计模式': '/study/se/architecture-design/patterns',
                          '架构与设计模式实战': '/study/se/architecture-design/practice',
                          '常见面试题与答疑': '/study/se/architecture-design/interview'
                        };
                        
                        return (
                          <Link
                            key={topicIndex}
                            href={topicLinks[topic] || '#'}
                            className="text-sm text-gray-600 bg-gray-50 rounded px-3 py-1 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer block"
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
                  href="/study/se/architecture-design/basic"
                  className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  开始学习
                </Link>
                <Link 
                  href="/study/se/architecture-design/patterns"
                  className="block w-full border border-gray-300 text-gray-700 text-center py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  设计模式
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 核心内容</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  分层架构设计
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  微服务架构
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  23种设计模式
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  架构权衡与决策
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">💼 职业方向</h3>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3">
                  <div className="font-medium text-blue-900">软件架构师</div>
                  <div className="text-sm text-blue-700">系统架构设计与规划</div>
                </div>
                <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg p-3">
                  <div className="font-medium text-indigo-900">技术总监</div>
                  <div className="text-sm text-indigo-700">技术团队管理与决策</div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-3">
                  <div className="font-medium text-purple-900">高级开发工程师</div>
                  <div className="text-sm text-purple-700">复杂系统设计开发</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
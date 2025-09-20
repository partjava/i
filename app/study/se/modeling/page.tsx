import Link from 'next/link';

export default function ModelingPage() {
  const stats = {
    totalLessons: 7,
    difficulty: '中级',
    duration: '8-10周',
    rating: 4.5
  };

  const roadmap = [
    {
      phase: '建模基础',
      topics: ['软件建模基础', 'UML建模'],
      duration: '3周'
    },
    {
      phase: '设计模式',
      topics: ['设计模式', '架构设计'],
      duration: '3周'
    },
    {
      phase: '质量保证',
      topics: ['软件测试', '软件维护'],
      duration: '2周'
    },
    {
      phase: '实战应用',
      topics: ['实战案例与项目'],
      duration: '2周'
    }
  ];

  const features = [
    { icon: '📐', title: '建模技术', desc: '完整的软件建模方法体系' },
    { icon: '🎯', title: 'UML设计', desc: '统一建模语言实战应用' },
    { icon: '🏛️', title: '架构设计', desc: '软件架构设计原理与实践' },
    { icon: '🔧', title: '工程实践', desc: '软件工程最佳实践' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-600 text-white rounded-full text-3xl font-bold mb-6">
            模
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">软件建模与设计</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            掌握软件建模与设计核心技术，从UML建模到架构设计，
            提升软件工程实践能力
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-slate-600 mb-2">{stats.totalLessons}</div>
            <div className="text-gray-600">课程数量</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-gray-600 mb-2">{stats.difficulty}</div>
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
                      <div className="w-8 h-8 bg-slate-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                        {index + 1}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{phase.phase}</h3>
                      <span className="ml-auto text-sm text-gray-500">{phase.duration}</span>
                    </div>
                    <div className="ml-12 grid grid-cols-1 md:grid-cols-2 gap-2">
                      {phase.topics.map((topic, topicIndex) => {
                        const topicLinks: { [key: string]: string } = {
                          '软件建模基础': '/study/se/modeling/basic',
                          'UML建模': '/study/se/modeling/uml',
                          '设计模式': '/study/se/modeling/patterns',
                          '架构设计': '/study/se/modeling/architecture',
                          '实战案例与项目': '/study/se/modeling/cases',
                          '软件测试': '/study/se/modeling/testing',
                          '软件维护': '/study/se/modeling/maintenance'
                        };
                        
                        return (
                          <Link
                            key={topicIndex}
                            href={topicLinks[topic] || '#'}
                            className="text-sm text-gray-600 bg-gray-50 rounded px-3 py-1 hover:bg-slate-50 hover:text-slate-600 transition-colors cursor-pointer block"
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
                  href="/study/se/modeling/basic"
                  className="block w-full bg-slate-600 text-white text-center py-3 rounded-lg hover:bg-slate-700 transition-colors"
                >
                  开始学习
                </Link>
                <Link 
                  href="/study/se/modeling/uml"
                  className="block w-full border border-gray-300 text-gray-700 text-center py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  UML建模
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 核心技能</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-slate-600 rounded-full mr-3"></span>
                  需求分析与建模
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-slate-600 rounded-full mr-3"></span>
                  UML图形建模
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-slate-600 rounded-full mr-3"></span>
                  设计模式应用
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-slate-600 rounded-full mr-3"></span>
                  架构评估与优化
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">💼 职业方向</h3>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg p-3">
                  <div className="font-medium text-slate-900">系统分析师</div>
                  <div className="text-sm text-slate-700">需求分析与系统设计</div>
                </div>
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-3">
                  <div className="font-medium text-gray-900">软件设计师</div>
                  <div className="text-sm text-gray-700">软件架构与详细设计</div>
                </div>
                <div className="bg-gradient-to-r from-stone-50 to-stone-100 rounded-lg p-3">
                  <div className="font-medium text-stone-900">技术主管</div>
                  <div className="text-sm text-stone-700">技术团队管理与指导</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
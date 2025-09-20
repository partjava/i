import Link from 'next/link';

export default function StandardsTestingPage() {
  const stats = {
    totalLessons: 9,
    difficulty: '中级',
    duration: '8-10周',
    rating: 4.7
  };

  const roadmap = [
    {
      phase: '规范基础',
      topics: ['开发规范', '测试基础'],
      duration: '2周'
    },
    {
      phase: '测试技术',
      topics: ['单元测试', '集成测试', '系统测试'],
      duration: '3周'
    },
    {
      phase: '自动化与管理',
      topics: ['自动化测试', '测试管理', '专项测试'],
      duration: '3周'
    },
    {
      phase: '实战应用',
      topics: ['实际项目案例'],
      duration: '2周'
    }
  ];

  const features = [
    { icon: '📝', title: '规范体系', desc: '完整的开发规范与最佳实践' },
    { icon: '🧪', title: '测试技术', desc: '全面的软件测试技术栈' },
    { icon: '🤖', title: '自动化', desc: '测试自动化工具与实践' },
    { icon: '📊', title: '质量管控', desc: '软件质量保证与管理' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 text-white rounded-full text-3xl font-bold mb-6">
            规
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">开发规范与测试</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            掌握软件开发规范与测试技术，建立完善的质量保证体系，
            提升软件开发效率与质量
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-green-600 mb-2">{stats.totalLessons}</div>
            <div className="text-gray-600">课程数量</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-emerald-600 mb-2">{stats.difficulty}</div>
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
                          '开发规范': '/study/se/standards-testing/spec',
                          '测试基础': '/study/se/standards-testing/basic',
                          '单元测试': '/study/se/standards-testing/unit',
                          '集成测试': '/study/se/standards-testing/integration',
                          '系统测试': '/study/se/standards-testing/system',
                          '自动化测试': '/study/se/standards-testing/automation',
                          '测试管理': '/study/se/standards-testing/management',
                          '专项测试': '/study/se/standards-testing/special',
                          '实际项目案例': '/study/se/standards-testing/case'
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
                  href="/study/se/standards-testing/spec"
                  className="block w-full bg-green-600 text-white text-center py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  开始学习
                </Link>
                <Link 
                  href="/study/se/standards-testing/basic"
                  className="block w-full border border-gray-300 text-gray-700 text-center py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  测试基础
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 核心技能</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  代码规范与最佳实践
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  测试用例设计
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  自动化测试框架
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  持续集成与部署
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">💼 职业方向</h3>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-3">
                  <div className="font-medium text-green-900">测试工程师</div>
                  <div className="text-sm text-green-700">软件测试与质量保证</div>
                </div>
                <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-lg p-3">
                  <div className="font-medium text-emerald-900">QA工程师</div>
                  <div className="text-sm text-emerald-700">质量控制与流程管理</div>
                </div>
                <div className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-lg p-3">
                  <div className="font-medium text-teal-900">DevOps工程师</div>
                  <div className="text-sm text-teal-700">开发运维一体化</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
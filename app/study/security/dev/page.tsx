import Link from 'next/link';

export default function SecurityDevelopmentPage() {
  const stats = {
    totalLessons: 10,
    difficulty: '中高级',
    duration: '8-10周',
    rating: 4.7
  };

  const roadmap = [
    {
      phase: '基础建设',
      topics: ['安全开发基础', '安全编码规范', '安全设计模式'],
      duration: '3周'
    },
    {
      phase: '质量保障',
      topics: ['安全测试方法', '代码审计', '安全工具使用', '漏洞修复'],
      duration: '4周'
    },
    {
      phase: '运营实施',
      topics: ['安全部署', '安全运维', '安全项目管理'],
      duration: '3周'
    }
  ];

  const features = [
    { icon: '🔧', title: '开发实践', desc: '安全开发生命周期管理' },
    { icon: '🛡️', title: '代码安全', desc: '安全编码规范与审计' },
    { icon: '🔍', title: '漏洞管理', desc: '漏洞发现、修复与防护' },
    { icon: '⚡', title: 'DevSecOps', desc: '安全融入开发运维流程' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-green-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-teal-600 text-white rounded-full text-3xl font-bold mb-6">
            开
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">安全开发</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            将安全融入软件开发全生命周期，掌握安全编码、代码审计、
            漏洞修复等核心技能，构建安全可靠的软件系统
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-teal-600 mb-2">{stats.totalLessons}</div>
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
                      <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                        {index + 1}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{phase.phase}</h3>
                      <span className="ml-auto text-sm text-gray-500">{phase.duration}</span>
                    </div>
                    <div className="ml-12 grid grid-cols-1 md:grid-cols-3 gap-2">
                      {phase.topics.map((topic, topicIndex) => {
                        const topicLinks: { [key: string]: string } = {
                          '安全开发基础': '/study/security/dev/basic',
                          '安全编码规范': '/study/security/dev/coding',
                          '安全设计模式': '/study/security/dev/patterns',
                          '安全测试方法': '/study/security/dev/testing',
                          '代码审计': '/study/security/dev/audit',
                          '安全工具使用': '/study/security/dev/tools',
                          '漏洞修复': '/study/security/dev/fix',
                          '安全部署': '/study/security/dev/deploy',
                          '安全运维': '/study/security/dev/ops',
                          '安全项目管理': '/study/security/dev/project'
                        };
                        
                        return (
                          <Link
                            key={topicIndex}
                            href={topicLinks[topic] || '#'}
                            className="text-sm text-gray-600 bg-gray-50 rounded px-3 py-1 hover:bg-teal-50 hover:text-teal-600 transition-colors cursor-pointer block"
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
                  href="/study/security/dev/basic"
                  className="block w-full bg-teal-600 text-white text-center py-3 rounded-lg hover:bg-teal-700 transition-colors"
                >
                  开始学习
                </Link>
                <Link 
                  href="/study/security/dev/coding"
                  className="block w-full border border-gray-300 text-gray-700 text-center py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  编码规范
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 核心技能</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-teal-600 rounded-full mr-3"></span>
                  安全编码实践
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-teal-600 rounded-full mr-3"></span>
                  代码安全审计
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-teal-600 rounded-full mr-3"></span>
                  漏洞发现修复
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-teal-600 rounded-full mr-3"></span>
                  DevSecOps实践
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">💼 职业方向</h3>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-lg p-3">
                  <div className="font-medium text-teal-900">安全开发工程师</div>
                  <div className="text-sm text-teal-700">安全软件开发专家</div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-3">
                  <div className="font-medium text-green-900">DevSecOps工程师</div>
                  <div className="text-sm text-green-700">安全融入DevOps流程</div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3">
                  <div className="font-medium text-blue-900">应用安全架构师</div>
                  <div className="text-sm text-blue-700">应用安全架构设计</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
import Link from 'next/link';

export default function CloudPage() {
  const stats = {
    totalLessons: 7,
    difficulty: '中高级',
    duration: '8-10周',
    rating: 4.8
  };

  const roadmap = [
    {
      phase: '云计算基础',
      topics: ['概述', '云服务基础'],
      duration: '2周'
    },
    {
      phase: '虚拟化技术',
      topics: ['虚拟化与容器化'],
      duration: '2周'
    },
    {
      phase: '云存储与数据',
      topics: ['云存储与数据库'],
      duration: '2周'
    },
    {
      phase: '安全与运维',
      topics: ['云安全与合规', '自动化与DevOps'],
      duration: '2周'
    },
    {
      phase: '实战应用',
      topics: ['实战案例与应用'],
      duration: '2周'
    }
  ];

  const features = [
    { icon: '☁️', title: '云原生', desc: '现代云原生应用架构与实践' },
    { icon: '🐳', title: '容器化', desc: 'Docker与Kubernetes实战' },
    { icon: '🔧', title: 'DevOps', desc: '持续集成与自动化部署' },
    { icon: '🔒', title: '云安全', desc: '云环境安全与合规管理' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-sky-600 text-white rounded-full text-3xl font-bold mb-6">
            云
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">云计算</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            掌握云计算核心技术，从基础架构到云原生应用，
            成为云计算与DevOps专家
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-sky-600 mb-2">{stats.totalLessons}</div>
            <div className="text-gray-600">课程数量</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-blue-600 mb-2">{stats.difficulty}</div>
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
                      <div className="w-8 h-8 bg-sky-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                        {index + 1}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{phase.phase}</h3>
                      <span className="ml-auto text-sm text-gray-500">{phase.duration}</span>
                    </div>
                    <div className="ml-12 grid grid-cols-1 md:grid-cols-2 gap-2">
                      {phase.topics.map((topic, topicIndex) => {
                        const topicLinks: { [key: string]: string } = {
                          '概述': '/study/se/cloud/intro',
                          '云服务基础': '/study/se/cloud/basic',
                          '虚拟化与容器化': '/study/se/cloud/container',
                          '云存储与数据库': '/study/se/cloud/storage',
                          '云安全与合规': '/study/se/cloud/security',
                          '自动化与DevOps': '/study/se/cloud/devops',
                          '实战案例与应用': '/study/se/cloud/projects'
                        };
                        
                        return (
                          <Link
                            key={topicIndex}
                            href={topicLinks[topic] || '#'}
                            className="text-sm text-gray-600 bg-gray-50 rounded px-3 py-1 hover:bg-sky-50 hover:text-sky-600 transition-colors cursor-pointer block"
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
                  href="/study/se/cloud/intro"
                  className="block w-full bg-sky-600 text-white text-center py-3 rounded-lg hover:bg-sky-700 transition-colors"
                >
                  开始学习
                </Link>
                <Link 
                  href="/study/se/cloud/container"
                  className="block w-full border border-gray-300 text-gray-700 text-center py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  容器化技术
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 核心技术</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-600 rounded-full mr-3"></span>
                  AWS/Azure/GCP
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-600 rounded-full mr-3"></span>
                  Docker & Kubernetes
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-600 rounded-full mr-3"></span>
                  CI/CD管道
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-sky-600 rounded-full mr-3"></span>
                  基础设施即代码
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">💼 职业方向</h3>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-sky-50 to-sky-100 rounded-lg p-3">
                  <div className="font-medium text-sky-900">云架构师</div>
                  <div className="text-sm text-sky-700">云平台架构设计与规划</div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3">
                  <div className="font-medium text-blue-900">DevOps工程师</div>
                  <div className="text-sm text-blue-700">自动化运维与部署</div>
                </div>
                <div className="bg-gradient-to-r from-cyan-50 to-cyan-100 rounded-lg p-3">
                  <div className="font-medium text-cyan-900">云运维工程师</div>
                  <div className="text-sm text-cyan-700">云环境运维与监控</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
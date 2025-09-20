import Link from 'next/link';

export default function SecurityOperationsPage() {
  const stats = {
    totalLessons: 10,
    difficulty: '中高级',
    duration: '8-10周',
    rating: 4.8
  };

  const roadmap = [
    {
      phase: '基础建设',
      topics: ['安全运维基础', '系统加固', '安全监控'],
      duration: '3周'
    },
    {
      phase: '运营管理',
      topics: ['日志分析', '漏洞管理', '补丁管理', '配置管理'],
      duration: '4周'
    },
    {
      phase: '应急响应',
      topics: ['应急响应', '灾难恢复', '安全评估'],
      duration: '3周'
    }
  ];

  const features = [
    { icon: '🛡️', title: '系统加固', desc: '全面的系统安全加固方案' },
    { icon: '📊', title: '监控分析', desc: '7×24安全监控与分析' },
    { icon: '⚡', title: '应急响应', desc: '快速安全事件响应机制' },
    { icon: '🔧', title: '自动化', desc: '安全运维自动化工具' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-600 text-white rounded-full text-3xl font-bold mb-6">
            运
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">安全运维</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            掌握企业级安全运维技能，学习系统加固、安全监控、
            应急响应等核心技术，保障业务系统安全稳定运行
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-orange-600 mb-2">{stats?.totalLessons || 0}</div>
            <div className="text-gray-600">课程数量</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-green-600 mb-2">{stats?.difficulty || 0}</div>
            <div className="text-gray-600">难度等级</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-purple-600 mb-2">{stats?.duration || 0}</div>
            <div className="text-gray-600">学习周期</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-blue-600 mb-2">{stats?.rating || 0}</div>
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
                      <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                        {index + 1}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{phase.phase}</h3>
                      <span className="ml-auto text-sm text-gray-500">{phase.duration}</span>
                    </div>
                    <div className="ml-12 grid grid-cols-1 md:grid-cols-3 gap-2">
                      {phase.topics.map((topic, topicIndex) => {
                        const topicLinks: { [key: string]: string } = {
                          '安全运维基础': '/study/security/ops/basic',
                          '系统加固': '/study/security/ops/hardening',
                          '安全监控': '/study/security/ops/monitor',
                          '日志分析': '/study/security/ops/log',
                          '漏洞管理': '/study/security/ops/vulnerability',
                          '补丁管理': '/study/security/ops/patch',
                          '配置管理': '/study/security/ops/config',
                          '应急响应': '/study/security/ops/incident',
                          '灾难恢复': '/study/security/ops/recovery',
                          '安全评估': '/study/security/ops/assessment'
                        };
                        
                        return (
                          <Link
                            key={topicIndex}
                            href={topicLinks[topic] || '#'}
                            className="text-sm text-gray-600 bg-gray-50 rounded px-3 py-1 hover:bg-orange-50 hover:text-orange-600 transition-colors cursor-pointer block"
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
                  href="/study/security/ops/basic"
                  className="block w-full bg-orange-600 text-white text-center py-3 rounded-lg hover:bg-orange-700 transition-colors"
                >
                  开始学习
                </Link>
                <Link 
                  href="/study/security/ops/hardening"
                  className="block w-full border border-gray-300 text-gray-700 text-center py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  系统加固
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 核心技能</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-600 rounded-full mr-3"></span>
                  系统安全加固
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-600 rounded-full mr-3"></span>
                  安全监控分析
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-600 rounded-full mr-3"></span>
                  漏洞补丁管理
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-600 rounded-full mr-3"></span>
                  应急事件响应
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">💼 职业方向</h3>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-3">
                  <div className="font-medium text-orange-900">安全运维工程师</div>
                  <div className="text-sm text-orange-700">企业安全运维专家</div>
                </div>
                <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-3">
                  <div className="font-medium text-red-900">安全运营专家</div>
                  <div className="text-sm text-red-700">SOC安全运营中心</div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-3">
                  <div className="font-medium text-purple-900">应急响应专家</div>
                  <div className="text-sm text-purple-700">安全事件响应处理</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
import Link from 'next/link';

export default function NetworkSecurityPage() {
  const stats = {
    totalLessons: 10,
    difficulty: '中级',
    duration: '6-8周',
    rating: 4.7
  };

  const roadmap = [
    {
      phase: '基础阶段',
      topics: ['网络安全概述', '网络基础架构', '安全模型与框架'],
      duration: '2周'
    },
    {
      phase: '协议安全',
      topics: ['物理层安全', '数据链路层安全', '网络层安全', '传输层安全'],
      duration: '3周'
    },
    {
      phase: '应用实践',
      topics: ['应用层安全', '网络协议分析', '网络设备安全'],
      duration: '3周'
    }
  ];

  const features = [
    { icon: '🛡️', title: '全面覆盖', desc: '从OSI七层模型全面讲解网络安全' },
    { icon: '🔍', title: '协议分析', desc: '深入理解网络协议安全机制' },
    { icon: '⚡', title: '实战导向', desc: '结合真实网络环境进行安全分析' },
    { icon: '🎯', title: '基础强化', desc: '为后续专业安全技术打好基础' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* 头部标题区域 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 text-white rounded-full text-3xl font-bold mb-6">
            网
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">网络基础安全</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            深入学习网络安全基础知识，掌握网络协议安全机制，理解网络架构安全设计，
            为网络安全专业发展打下坚实基础
          </p>
        </div>

        {/* 统计数据 */}
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
          {/* 课程特色 */}
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

            {/* 学习路径 */}
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
                    <div className="ml-12 grid grid-cols-1 md:grid-cols-3 gap-2">
                      {phase.topics.map((topic, topicIndex) => {
                        // 根据话题名称生成对应的链接
                        const topicLinks: { [key: string]: string } = {
                          '网络安全概述': '/study/security/network/intro',
                          '网络基础架构': '/study/security/network/architecture',
                          '安全模型与框架': '/study/security/network/framework',
                          '物理层安全': '/study/security/network/physical',
                          '数据链路层安全': '/study/security/network/datalink',
                          '网络层安全': '/study/security/network/network',
                          '传输层安全': '/study/security/network/transport',
                          '应用层安全': '/study/security/network/application',
                          '网络协议分析': '/study/security/network/protocol',
                          '网络设备安全': '/study/security/network/device'
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

          {/* 右侧边栏 */}
          <div className="space-y-6">
            {/* 快速开始 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🚀 快速开始</h3>
              <div className="space-y-3">
                <Link 
                  href="/study/security/network/intro"
                  className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  开始学习
                </Link>
                <Link 
                  href="/study/security/network/architecture"
                  className="block w-full border border-gray-300 text-gray-700 text-center py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  网络架构
                </Link>
              </div>
            </div>

            {/* 先修知识 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">📚 先修知识</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  计算机网络基础
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  TCP/IP协议栈
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Linux基础操作
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  信息安全概念
                </li>
              </ul>
            </div>

            {/* 职业方向 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">💼 职业方向</h3>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3">
                  <div className="font-medium text-blue-900">网络安全工程师</div>
                  <div className="text-sm text-blue-700">负责网络安全架构设计与维护</div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-3">
                  <div className="font-medium text-green-900">安全架构师</div>
                  <div className="text-sm text-green-700">设计企业级安全解决方案</div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-3">
                  <div className="font-medium text-purple-900">网络运维工程师</div>
                  <div className="text-sm text-purple-700">维护网络设备和安全策略</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
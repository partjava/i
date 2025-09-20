import Link from 'next/link';

export default function PenetrationTestingPage() {
  const stats = {
    totalLessons: 10,
    difficulty: '高级',
    duration: '10-12周',
    rating: 4.9
  };

  const roadmap = [
    {
      phase: '基础准备',
      topics: ['渗透测试基础', '信息收集', '漏洞扫描'],
      duration: '4周'
    },
    {
      phase: '攻击实施',
      topics: ['漏洞利用', '后渗透测试', 'Web应用测试'],
      duration: '4周'
    },
    {
      phase: '专项测试',
      topics: ['移动应用测试', '无线网络测试', '社会工程学', '渗透测试报告'],
      duration: '4周'
    }
  ];

  const features = [
    { icon: '🎯', title: '实战为王', desc: '真实环境动手实战演练' },
    { icon: '🔍', title: '全面覆盖', desc: 'Web、移动、无线全方位测试' },
    { icon: '⚔️', title: '攻防兼备', desc: '从攻击者视角理解安全' },
    { icon: '📋', title: '规范化', desc: '专业测试流程和报告编写' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100">
      <div className="container mx-auto px-4 py-8">
        {/* 头部标题区域 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-600 text-white rounded-full text-3xl font-bold mb-6">
            渗
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">渗透测试</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            从攻击者视角学习网络安全，掌握渗透测试方法论，
            学习漏洞发现与利用技术，提升安全防护能力
          </p>
        </div>

        {/* 统计数据 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-red-600 mb-2">{stats.totalLessons}</div>
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
                      <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                        {index + 1}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{phase.phase}</h3>
                      <span className="ml-auto text-sm text-gray-500">{phase.duration}</span>
                    </div>
                    <div className="ml-12 grid grid-cols-1 md:grid-cols-3 gap-2">
                      {phase.topics.map((topic, topicIndex) => {
                        // 根据话题名称生成对应的链接
                        const topicLinks: { [key: string]: string } = {
                          '渗透测试基础': '/study/security/penetration/basic',
                          '信息收集': '/study/security/penetration/recon',
                          '漏洞扫描': '/study/security/penetration/scan',
                          '漏洞利用': '/study/security/penetration/exploit',
                          '后渗透测试': '/study/security/penetration/post',
                          'Web应用测试': '/study/security/penetration/web',
                          '移动应用测试': '/study/security/penetration/mobile',
                          '无线网络测试': '/study/security/penetration/wireless',
                          '社会工程学': '/study/security/penetration/social',
                          '渗透测试报告': '/study/security/penetration/report'
                        };
                        
                        return (
                          <Link
                            key={topicIndex}
                            href={topicLinks[topic] || '#'}
                            className="text-sm text-gray-600 bg-gray-50 rounded px-3 py-1 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer block"
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
                  href="/study/security/penetration/basic"
                  className="block w-full bg-red-600 text-white text-center py-3 rounded-lg hover:bg-red-700 transition-colors"
                >
                  开始学习
                </Link>
                <Link 
                  href="/study/security/penetration/recon"
                  className="block w-full border border-gray-300 text-gray-700 text-center py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  信息收集
                </Link>
              </div>
            </div>

            {/* 重要提醒 */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-yellow-800 mb-4">⚠️ 重要提醒</h3>
              <ul className="space-y-2 text-sm text-yellow-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-yellow-600 rounded-full mr-3 mt-2"></span>
                  <span>仅在授权环境中进行测试</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-yellow-600 rounded-full mr-3 mt-2"></span>
                  <span>遵守法律法规和职业道德</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-yellow-600 rounded-full mr-3 mt-2"></span>
                  <span>以防御为目的学习攻击技术</span>
                </li>
              </ul>
            </div>

            {/* 职业方向 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">💼 职业方向</h3>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-3">
                  <div className="font-medium text-red-900">渗透测试工程师</div>
                  <div className="text-sm text-red-700">专业渗透测试服务提供</div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-3">
                  <div className="font-medium text-purple-900">安全顾问</div>
                  <div className="text-sm text-purple-700">企业安全咨询与评估</div>
                </div>
                <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg p-3">
                  <div className="font-medium text-indigo-900">红队成员</div>
                  <div className="text-sm text-indigo-700">企业红蓝对抗演练</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
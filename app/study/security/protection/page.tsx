import Link from 'next/link';

export default function SecurityProtectionPage() {
  const stats = {
    totalLessons: 10,
    difficulty: '中高级',
    duration: '8-10周',
    rating: 4.8
  };

  const roadmap = [
    {
      phase: '身份与访问',
      topics: ['访问控制', '身份认证', '加密技术'],
      duration: '3周'
    },
    {
      phase: '防护技术',
      topics: ['防火墙技术', '入侵检测', '入侵防御', 'VPN技术'],
      duration: '4周'
    },
    {
      phase: '监控与响应',
      topics: ['安全审计', '安全监控', '应急响应'],
      duration: '3周'
    }
  ];

  const features = [
    { icon: '🔒', title: '多层防护', desc: '构建深度防御安全体系' },
    { icon: '⚡', title: '实时检测', desc: '24/7实时威胁监控与响应' },
    { icon: '🛠️', title: '工具实战', desc: '掌握主流安全防护工具使用' },
    { icon: '📊', title: '可视化', desc: '安全态势感知与可视化分析' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
      <div className="container mx-auto px-4 py-8">
        {/* 头部标题区域 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-600 text-white rounded-full text-3xl font-bold mb-6">
            安
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">安全防护</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            掌握企业级安全防护技术，学习访问控制、身份认证、防火墙配置、
            入侵检测与防御，建立完整的安全防护体系
          </p>
        </div>

        {/* 统计数据 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-emerald-600 mb-2">{stats?.totalLessons || 0}</div>
            <div className="text-gray-600">课程数量</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-green-600 mb-2">{stats?.difficulty || '未知'}</div>
            <div className="text-gray-600">难度等级</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-purple-600 mb-2">{stats?.duration || 0}</div>
            <div className="text-gray-600">学习周期</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-orange-600 mb-2">{stats?.rating || 0}</div>
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
                      <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                        {index + 1}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{phase.phase}</h3>
                      <span className="ml-auto text-sm text-gray-500">{phase.duration}</span>
                    </div>
                    <div className="ml-12 grid grid-cols-1 md:grid-cols-3 gap-2">
                      {phase.topics.map((topic, topicIndex) => {
                        // 根据话题名称生成对应的链接
                        const topicLinks: { [key: string]: string } = {
                          '访问控制': '/study/security/protection/access',
                          '身份认证': '/study/security/protection/auth',
                          '加密技术': '/study/security/protection/encryption',
                          '防火墙技术': '/study/security/protection/firewall',
                          '入侵检测': '/study/security/protection/ids',
                          '入侵防御': '/study/security/protection/ips',
                          'VPN技术': '/study/security/protection/vpn',
                          '安全审计': '/study/security/protection/audit',
                          '安全监控': '/study/security/protection/monitor',
                          '应急响应': '/study/security/protection/response'
                        };
                        
                        return (
                          <Link
                            key={topicIndex}
                            href={topicLinks[topic] || '#'}
                            className="text-sm text-gray-600 bg-gray-50 rounded px-3 py-1 hover:bg-emerald-50 hover:text-emerald-600 transition-colors cursor-pointer block"
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
                  href="/study/security/protection/access"
                  className="block w-full bg-emerald-600 text-white text-center py-3 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  开始学习
                </Link>
                <Link 
                  href="/study/security/protection/firewall"
                  className="block w-full border border-gray-300 text-gray-700 text-center py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  防火墙技术
                </Link>
              </div>
            </div>

            {/* 核心技能 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 核心技能</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></span>
                  访问控制策略设计
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></span>
                  防火墙规则配置
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></span>
                  IDS/IPS部署管理
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></span>
                  安全事件响应
                </li>
              </ul>
            </div>

            {/* 职业方向 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">💼 职业方向</h3>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-lg p-3">
                  <div className="font-medium text-emerald-900">安全防护专家</div>
                  <div className="text-sm text-emerald-700">设计和维护企业安全防护体系</div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3">
                  <div className="font-medium text-blue-900">SOC分析师</div>
                  <div className="text-sm text-blue-700">安全运营中心威胁分析</div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-3">
                  <div className="font-medium text-purple-900">网络安全顾问</div>
                  <div className="text-sm text-purple-700">为企业提供安全咨询服务</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
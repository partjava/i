import Link from 'next/link';

export default function FrontendSecurityPage() {
  const stats = {
    totalLessons: 10,
    difficulty: '中级',
    duration: '6-8周',
    rating: 4.7
  };

  const roadmap = [
    {
      phase: '基础防护',
      topics: ['前端安全基础', 'XSS攻击防护', 'CSRF攻击防护'],
      duration: '3周'
    },
    {
      phase: '高级防护',
      topics: ['点击劫持防护', 'SQL注入防护', '文件上传安全', '敏感信息保护'],
      duration: '3周'
    },
    {
      phase: '安全实践',
      topics: ['前端加密', '安全编码实践', '安全测试方法'],
      duration: '2周'
    }
  ];

  const features = [
    { icon: '🌐', title: 'Web安全', desc: '全面的Web前端安全防护' },
    { icon: '🔒', title: '漏洞防护', desc: '常见Web漏洞防护技术' },
    { icon: '🛠️', title: '工具使用', desc: '安全检测工具实际应用' },
    { icon: '📋', title: '最佳实践', desc: '安全编码规范与实践' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-cyan-600 text-white rounded-full text-3xl font-bold mb-6">
            前
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">前端安全</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            掌握Web前端安全核心技术，学习XSS、CSRF等常见攻击防护，
            提升前端应用安全性，保护用户数据安全
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-cyan-600 mb-2">{stats?.totalLessons || 0}</div>
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
            <div className="text-3xl font-bold text-orange-600 mb-2">{stats?.rating || 0}</div>
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
                      <div className="w-8 h-8 bg-cyan-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                        {index + 1}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{phase.phase}</h3>
                      <span className="ml-auto text-sm text-gray-500">{phase.duration}</span>
                    </div>
                    <div className="ml-12 grid grid-cols-1 md:grid-cols-3 gap-2">
                      {phase.topics.map((topic, topicIndex) => {
                        const topicLinks: { [key: string]: string } = {
                          '前端安全基础': '/study/security/frontend/basic',
                          'XSS攻击防护': '/study/security/frontend/xss',
                          'CSRF攻击防护': '/study/security/frontend/csrf',
                          '点击劫持防护': '/study/security/frontend/clickjacking',
                          'SQL注入防护': '/study/security/frontend/sql',
                          '文件上传安全': '/study/security/frontend/upload',
                          '敏感信息保护': '/study/security/frontend/sensitive',
                          '前端加密': '/study/security/frontend/encryption',
                          '安全编码实践': '/study/security/frontend/coding',
                          '安全测试方法': '/study/security/frontend/testing'
                        };
                        
                        return (
                          <Link
                            key={topicIndex}
                            href={topicLinks[topic] || '#'}
                            className="text-sm text-gray-600 bg-gray-50 rounded px-3 py-1 hover:bg-cyan-50 hover:text-cyan-600 transition-colors cursor-pointer block"
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
                  href="/study/security/frontend/basic"
                  className="block w-full bg-cyan-600 text-white text-center py-3 rounded-lg hover:bg-cyan-700 transition-colors"
                >
                  开始学习
                </Link>
                <Link 
                  href="/study/security/frontend/xss"
                  className="block w-full border border-gray-300 text-gray-700 text-center py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  XSS防护
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 核心技能</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-cyan-600 rounded-full mr-3"></span>
                  XSS/CSRF防护技术
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-cyan-600 rounded-full mr-3"></span>
                  安全编码规范
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-cyan-600 rounded-full mr-3"></span>
                  前端加密技术
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-cyan-600 rounded-full mr-3"></span>
                  安全测试方法
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">💼 职业方向</h3>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-cyan-50 to-cyan-100 rounded-lg p-3">
                  <div className="font-medium text-cyan-900">前端安全工程师</div>
                  <div className="text-sm text-cyan-700">专注前端应用安全</div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3">
                  <div className="font-medium text-blue-900">Web安全专家</div>
                  <div className="text-sm text-blue-700">Web应用安全咨询</div>
                </div>
                <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg p-3">
                  <div className="font-medium text-indigo-900">全栈安全开发</div>
                  <div className="text-sm text-indigo-700">安全开发全栈解决方案</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
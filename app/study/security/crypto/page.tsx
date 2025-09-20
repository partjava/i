import Link from 'next/link';

export default function CryptographyPage() {
  const stats = {
    totalLessons: 10,
    difficulty: '中高级',
    duration: '8-10周',
    rating: 4.6
  };

  const roadmap = [
    {
      phase: '基础理论',
      topics: ['密码学基础', '对称加密', '非对称加密'],
      duration: '3周'
    },
    {
      phase: '核心技术',
      topics: ['哈希函数', '数字签名', '密钥管理', '公钥基础设施'],
      duration: '4周'
    },
    {
      phase: '高级应用',
      topics: ['密码协议', '密码分析', '密码学应用'],
      duration: '3周'
    }
  ];

  const features = [
    { icon: '🔐', title: '理论扎实', desc: '深入理解密码学数学基础' },
    { icon: '🧮', title: '算法详解', desc: '主流加密算法原理与实现' },
    { icon: '🛡️', title: '安全应用', desc: '密码学在实际系统中的应用' },
    { icon: '🔍', title: '漏洞分析', desc: '密码系统安全性分析方法' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      <div className="container mx-auto px-4 py-8">
        {/* 头部标题区域 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-600 text-white rounded-full text-3xl font-bold mb-6">
            密
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">密码学</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            掌握现代密码学核心理论与技术，学习加密算法、数字签名、
            密钥管理等关键技术，为信息安全提供坚实理论基础
          </p>
        </div>

        {/* 统计数据 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-indigo-600 mb-2">{stats.totalLessons}</div>
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
                      <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                        {index + 1}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{phase.phase}</h3>
                      <span className="ml-auto text-sm text-gray-500">{phase.duration}</span>
                    </div>
                    <div className="ml-12 grid grid-cols-1 md:grid-cols-3 gap-2">
                      {phase.topics.map((topic, topicIndex) => {
                        // 根据话题名称生成对应的链接
                        const topicLinks: { [key: string]: string } = {
                          '密码学基础': '/study/security/crypto/basic',
                          '对称加密': '/study/security/crypto/symmetric',
                          '非对称加密': '/study/security/crypto/asymmetric',
                          '哈希函数': '/study/security/crypto/hash',
                          '数字签名': '/study/security/crypto/signature',
                          '密钥管理': '/study/security/crypto/key',
                          '公钥基础设施': '/study/security/crypto/pki',
                          '密码协议': '/study/security/crypto/protocol',
                          '密码分析': '/study/security/crypto/analysis',
                          '密码学应用': '/study/security/crypto/application'
                        };
                        
                        return (
                          <Link
                            key={topicIndex}
                            href={topicLinks[topic] || '#'}
                            className="text-sm text-gray-600 bg-gray-50 rounded px-3 py-1 hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-pointer block"
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
                  href="/study/security/crypto/basic"
                  className="block w-full bg-indigo-600 text-white text-center py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  开始学习
                </Link>
                <Link 
                  href="/study/security/crypto/symmetric"
                  className="block w-full border border-gray-300 text-gray-700 text-center py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  对称加密
                </Link>
              </div>
            </div>

            {/* 数学基础 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">📚 数学基础</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                  数论基础
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                  群论与有限域
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                  概率论基础
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                  复杂度理论
                </li>
              </ul>
            </div>

            {/* 职业方向 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">💼 职业方向</h3>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg p-3">
                  <div className="font-medium text-indigo-900">密码学研究员</div>
                  <div className="text-sm text-indigo-700">密码算法设计与分析</div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-3">
                  <div className="font-medium text-purple-900">安全架构师</div>
                  <div className="text-sm text-purple-700">密码系统架构设计</div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3">
                  <div className="font-medium text-blue-900">区块链开发工程师</div>
                  <div className="text-sm text-blue-700">区块链密码学应用</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
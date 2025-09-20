import Link from 'next/link';

export default function BlockchainSecurityPage() {
  const stats = {
    totalLessons: 10,
    difficulty: '高级',
    duration: '10-12周',
    rating: 4.9
  };

  const roadmap = [
    {
      phase: '基础理论',
      topics: ['区块链安全基础', '共识机制安全', '密码学应用'],
      duration: '4周'
    },
    {
      phase: '应用安全',
      topics: ['智能合约安全', '钱包安全', '交易所安全', '挖矿安全'],
      duration: '4周'
    },
    {
      phase: '攻击防护',
      topics: ['51%攻击防护', '双花攻击防护', '区块链审计'],
      duration: '4周'
    }
  ];

  const features = [
    { icon: '⛓️', title: '区块链技术', desc: '深入理解区块链核心技术' },
    { icon: '🔐', title: '智能合约', desc: '智能合约安全开发与审计' },
    { icon: '💰', title: '数字资产', desc: '数字资产安全管理' },
    { icon: '🛡️', title: '攻击防护', desc: '区块链攻击手段与防护' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-600 text-white rounded-full text-3xl font-bold mb-6">
            链
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">区块链安全</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            掌握区块链安全技术，学习智能合约安全、数字资产保护、
            共识机制安全等核心知识，成为区块链安全专家
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-yellow-600 mb-2">{stats.totalLessons}</div>
            <div className="text-gray-600">课程数量</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-red-600 mb-2">{stats.difficulty}</div>
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
                      <div className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                        {index + 1}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{phase.phase}</h3>
                      <span className="ml-auto text-sm text-gray-500">{phase.duration}</span>
                    </div>
                    <div className="ml-12 grid grid-cols-1 md:grid-cols-3 gap-2">
                      {phase.topics.map((topic, topicIndex) => {
                        const topicLinks: { [key: string]: string } = {
                          '区块链安全基础': '/study/security/blockchain/basic',
                          '共识机制安全': '/study/security/blockchain/consensus',
                          '智能合约安全': '/study/security/blockchain/smart-contract',
                          '密码学应用': '/study/security/blockchain/crypto',
                          '钱包安全': '/study/security/blockchain/wallet',
                          '交易所安全': '/study/security/blockchain/exchange',
                          '挖矿安全': '/study/security/blockchain/mining',
                          '51%攻击防护': '/study/security/blockchain/51-attack',
                          '双花攻击防护': '/study/security/blockchain/double-spend',
                          '区块链审计': '/study/security/blockchain/audit'
                        };
                        
                        return (
                          <Link
                            key={topicIndex}
                            href={topicLinks[topic] || '#'}
                            className="text-sm text-gray-600 bg-gray-50 rounded px-3 py-1 hover:bg-yellow-50 hover:text-yellow-600 transition-colors cursor-pointer block"
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
                  href="/study/security/blockchain/basic"
                  className="block w-full bg-yellow-600 text-white text-center py-3 rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  开始学习
                </Link>
                <Link 
                  href="/study/security/blockchain/smart-contract"
                  className="block w-full border border-gray-300 text-gray-700 text-center py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  智能合约
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">📚 先修知识</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-600 rounded-full mr-3"></span>
                  区块链基础技术
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-600 rounded-full mr-3"></span>
                  密码学基础
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-600 rounded-full mr-3"></span>
                  编程基础(Solidity)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-600 rounded-full mr-3"></span>
                  网络安全基础
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">💼 职业方向</h3>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3">
                  <div className="font-medium text-yellow-900">区块链安全工程师</div>
                  <div className="text-sm text-yellow-700">区块链项目安全专家</div>
                </div>
                <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-3">
                  <div className="font-medium text-amber-900">智能合约审计师</div>
                  <div className="text-sm text-amber-700">智能合约安全审计</div>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-3">
                  <div className="font-medium text-orange-900">DeFi安全专家</div>
                  <div className="text-sm text-orange-700">去中心化金融安全</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
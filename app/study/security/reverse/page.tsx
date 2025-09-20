import Link from 'next/link';

export default function ReverseEngineeringPage() {
  const stats = {
    totalLessons: 10,
    difficulty: '高级',
    duration: '12-15周',
    rating: 4.8
  };

  const roadmap = [
    {
      phase: '基础理论',
      topics: ['逆向工程基础', '汇编语言基础', 'PE文件分析', 'ELF文件分析'],
      duration: '5周'
    },
    {
      phase: '分析技术',
      topics: ['动态分析技术', '静态分析技术', '反调试技术'],
      duration: '4周'
    },
    {
      phase: '高级应用',
      topics: ['加壳脱壳', '漏洞挖掘', '恶意代码分析'],
      duration: '6周'
    }
  ];

  const features = [
    { icon: '🔍', title: '深度分析', desc: '深入理解程序内部结构' },
    { icon: '⚙️', title: '工具精通', desc: '掌握专业逆向分析工具' },
    { icon: '🛡️', title: '安全研究', desc: '漏洞挖掘与恶意代码分析' },
    { icon: '🧠', title: '思维训练', desc: '培养逆向思维和分析能力' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-700 text-white rounded-full text-3xl font-bold mb-6">
            逆
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">逆向工程</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            掌握逆向工程核心技术，学习汇编语言、程序分析、
            漏洞挖掘等技能，成为软件安全研究专家
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-gray-700 mb-2">{stats.totalLessons}</div>
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
                      <div className="w-8 h-8 bg-gray-700 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                        {index + 1}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{phase.phase}</h3>
                      <span className="ml-auto text-sm text-gray-500">{phase.duration}</span>
                    </div>
                    <div className="ml-12 grid grid-cols-1 md:grid-cols-3 gap-2">
                      {phase.topics.map((topic, topicIndex) => {
                        const topicLinks: { [key: string]: string } = {
                          '逆向工程基础': '/study/security/reverse/basic',
                          '汇编语言基础': '/study/security/reverse/assembly',
                          'PE文件分析': '/study/security/reverse/pe',
                          'ELF文件分析': '/study/security/reverse/elf',
                          '动态分析技术': '/study/security/reverse/dynamic',
                          '静态分析技术': '/study/security/reverse/static',
                          '反调试技术': '/study/security/reverse/anti-debug',
                          '加壳脱壳': '/study/security/reverse/pack',
                          '漏洞挖掘': '/study/security/reverse/vulnerability',
                          '恶意代码分析': '/study/security/reverse/malware'
                        };
                        
                        return (
                          <Link
                            key={topicIndex}
                            href={topicLinks[topic] || '#'}
                            className="text-sm text-gray-600 bg-gray-50 rounded px-3 py-1 hover:bg-gray-100 hover:text-gray-800 transition-colors cursor-pointer block"
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
                  href="/study/security/reverse/basic"
                  className="block w-full bg-gray-700 text-white text-center py-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  开始学习
                </Link>
                <Link 
                  href="/study/security/reverse/assembly"
                  className="block w-full border border-gray-300 text-gray-700 text-center py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  汇编基础
                </Link>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-yellow-800 mb-4">⚠️ 学习要求</h3>
              <ul className="space-y-2 text-sm text-yellow-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-yellow-600 rounded-full mr-3 mt-2"></span>
                  <span>C/C++编程基础</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-yellow-600 rounded-full mr-3 mt-2"></span>
                  <span>操作系统原理</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-yellow-600 rounded-full mr-3 mt-2"></span>
                  <span>计算机体系结构</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-yellow-600 rounded-full mr-3 mt-2"></span>
                  <span>强烈的学习动机</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">💼 职业方向</h3>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-3">
                  <div className="font-medium text-gray-900">逆向工程师</div>
                  <div className="text-sm text-gray-700">软件逆向分析专家</div>
                </div>
                <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-3">
                  <div className="font-medium text-red-900">安全研究员</div>
                  <div className="text-sm text-red-700">漏洞研究与挖掘</div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-3">
                  <div className="font-medium text-purple-900">恶意代码分析师</div>
                  <div className="text-sm text-purple-700">恶意软件分析与防护</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
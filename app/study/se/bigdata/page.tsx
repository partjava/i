import Link from 'next/link';

export default function BigDataPage() {
  const stats = {
    totalLessons: 8,
    difficulty: '高级',
    duration: '10-12周',
    rating: 4.9
  };

  const roadmap = [
    {
      phase: '基础理论',
      topics: ['概述', '大数据平台与生态'],
      duration: '2周'
    },
    {
      phase: '数据处理',
      topics: ['数据采集与预处理', '分布式存储与计算'],
      duration: '3周'
    },
    {
      phase: '分析挖掘',
      topics: ['数据分析与挖掘', '可视化与BI'],
      duration: '3周'
    },
    {
      phase: '安全运维',
      topics: ['大数据安全与运维'],
      duration: '2周'
    },
    {
      phase: '实战项目',
      topics: ['实战案例与项目'],
      duration: '2周'
    }
  ];

  const features = [
    { icon: '📊', title: '大数据分析', desc: '完整的大数据分析技术栈' },
    { icon: '🔧', title: '分布式计算', desc: 'Hadoop、Spark生态系统' },
    { icon: '📈', title: '数据可视化', desc: '专业的数据可视化与BI' },
    { icon: '🛡️', title: '安全运维', desc: '企业级数据安全管理' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-600 text-white rounded-full text-3xl font-bold mb-6">
            大
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">大数据分析</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            掌握大数据处理与分析技术，从数据采集到商业智能，
            成为数据驱动决策的专家
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-amber-600 mb-2">{stats.totalLessons}</div>
            <div className="text-gray-600">课程数量</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-orange-600 mb-2">{stats.difficulty}</div>
            <div className="text-gray-600">难度等级</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-purple-600 mb-2">{stats.duration}</div>
            <div className="text-gray-600">学习周期</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-green-600 mb-2">{stats.rating}</div>
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
                      <div className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                        {index + 1}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{phase.phase}</h3>
                      <span className="ml-auto text-sm text-gray-500">{phase.duration}</span>
                    </div>
                    <div className="ml-12 grid grid-cols-1 md:grid-cols-2 gap-2">
                      {phase.topics.map((topic, topicIndex) => {
                        const topicLinks: { [key: string]: string } = {
                          '概述': '/study/se/bigdata/intro',
                          '大数据平台与生态': '/study/se/bigdata/platform',
                          '数据采集与预处理': '/study/se/bigdata/ingest',
                          '分布式存储与计算': '/study/se/bigdata/distributed',
                          '数据分析与挖掘': '/study/se/bigdata/analysis',
                          '可视化与BI': '/study/se/bigdata/bi',
                          '大数据安全与运维': '/study/se/bigdata/security',
                          '实战案例与项目': '/study/se/bigdata/projects'
                        };
                        
                        return (
                          <Link
                            key={topicIndex}
                            href={topicLinks[topic] || '#'}
                            className="text-sm text-gray-600 bg-gray-50 rounded px-3 py-1 hover:bg-amber-50 hover:text-amber-600 transition-colors cursor-pointer block"
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
                  href="/study/se/bigdata/intro"
                  className="block w-full bg-amber-600 text-white text-center py-3 rounded-lg hover:bg-amber-700 transition-colors"
                >
                  开始学习
                </Link>
                <Link 
                  href="/study/se/bigdata/platform"
                  className="block w-full border border-gray-300 text-gray-700 text-center py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  大数据平台
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 核心技术</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>
                  Hadoop生态系统
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>
                  Apache Spark
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>
                  数据仓库技术
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-600 rounded-full mr-3"></span>
                  机器学习算法
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">💼 职业方向</h3>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-3">
                  <div className="font-medium text-amber-900">大数据工程师</div>
                  <div className="text-sm text-amber-700">大数据平台开发与维护</div>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-3">
                  <div className="font-medium text-orange-900">数据分析师</div>
                  <div className="text-sm text-orange-700">数据挖掘与商业分析</div>
                </div>
                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3">
                  <div className="font-medium text-yellow-900">数据科学家</div>
                  <div className="text-sm text-yellow-700">机器学习与预测建模</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
import Link from 'next/link';

export default function GamePage() {
  const stats = {
    totalLessons: 10,
    difficulty: '中高级',
    duration: '12-14周',
    rating: 4.8
  };

  const roadmap = [
    {
      phase: '基础入门',
      topics: ['动画基础', '游戏设计'],
      duration: '3周'
    },
    {
      phase: '开发技术',
      topics: ['游戏开发', '游戏引擎'],
      duration: '4周'
    },
    {
      phase: '美术音效',
      topics: ['游戏美术', '游戏音效', '游戏策划'],
      duration: '3周'
    },
    {
      phase: '测试发布',
      topics: ['游戏测试', '游戏发布'],
      duration: '2周'
    },
    {
      phase: '实战项目',
      topics: ['实战案例与项目'],
      duration: '2周'
    }
  ];

  const features = [
    { icon: '🎮', title: '游戏开发', desc: '完整的游戏开发技术栈' },
    { icon: '🎨', title: '美术设计', desc: '游戏美术与视觉设计' },
    { icon: '🔧', title: '游戏引擎', desc: 'Unity、Unreal等主流引擎' },
    { icon: '🎵', title: '音效制作', desc: '游戏音频与音效设计' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-pink-600 text-white rounded-full text-3xl font-bold mb-6">
            动
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">动画与游戏设计</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            掌握游戏开发全流程，从创意设计到技术实现，
            打造引人入胜的游戏作品
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-pink-600 mb-2">{stats.totalLessons}</div>
            <div className="text-gray-600">课程数量</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-rose-600 mb-2">{stats.difficulty}</div>
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
                      <div className="w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                        {index + 1}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{phase.phase}</h3>
                      <span className="ml-auto text-sm text-gray-500">{phase.duration}</span>
                    </div>
                    <div className="ml-12 grid grid-cols-1 md:grid-cols-3 gap-2">
                      {phase.topics.map((topic, topicIndex) => {
                        const topicLinks: { [key: string]: string } = {
                          '动画基础': '/study/se/game/animation',
                          '游戏设计': '/study/se/game/design',
                          '游戏开发': '/study/se/game/development',
                          '游戏测试': '/study/se/game/testing',
                          '游戏发布': '/study/se/game/release',
                          '实战案例与项目': '/study/se/game/projects',
                          '游戏引擎': '/study/se/game/engine',
                          '游戏美术': '/study/se/game/art',
                          '游戏音效': '/study/se/game/sound',
                          '游戏策划': '/study/se/game/planning'
                        };
                        
                        return (
                          <Link
                            key={topicIndex}
                            href={topicLinks[topic] || '#'}
                            className="text-sm text-gray-600 bg-gray-50 rounded px-3 py-1 hover:bg-pink-50 hover:text-pink-600 transition-colors cursor-pointer block"
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
                  href="/study/se/game/design"
                  className="block w-full bg-pink-600 text-white text-center py-3 rounded-lg hover:bg-pink-700 transition-colors"
                >
                  开始学习
                </Link>
                <Link 
                  href="/study/se/game/engine"
                  className="block w-full border border-gray-300 text-gray-700 text-center py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  游戏引擎
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 核心技术</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-pink-600 rounded-full mr-3"></span>
                  Unity 3D引擎
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-pink-600 rounded-full mr-3"></span>
                  Unreal Engine
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-pink-600 rounded-full mr-3"></span>
                  3D建模与动画
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-pink-600 rounded-full mr-3"></span>
                  游戏物理引擎
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">💼 职业方向</h3>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-pink-50 to-pink-100 rounded-lg p-3">
                  <div className="font-medium text-pink-900">游戏开发工程师</div>
                  <div className="text-sm text-pink-700">游戏逻辑与系统开发</div>
                </div>
                <div className="bg-gradient-to-r from-rose-50 to-rose-100 rounded-lg p-3">
                  <div className="font-medium text-rose-900">游戏设计师</div>
                  <div className="text-sm text-rose-700">游戏玩法与关卡设计</div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-3">
                  <div className="font-medium text-purple-900">游戏美术师</div>
                  <div className="text-sm text-purple-700">游戏视觉与动画设计</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
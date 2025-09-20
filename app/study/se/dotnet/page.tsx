import Link from 'next/link';

export default function DotNetPage() {
  const stats = {
    totalLessons: 10,
    difficulty: '中高级',
    duration: '10-12周',
    rating: 4.7
  };

  const roadmap = [
    {
      phase: '基础入门',
      topics: ['概述', '开发环境配置', 'C#基础与语法'],
      duration: '3周'
    },
    {
      phase: 'Web开发',
      topics: ['ASP.NET Web开发', '数据库与EF Core'],
      duration: '3周'
    },
    {
      phase: '高级特性',
      topics: ['服务与中间件', '安全与身份认证'],
      duration: '2周'
    },
    {
      phase: '部署与测试',
      topics: ['部署与运维', '测试与调试'],
      duration: '2周'
    },
    {
      phase: '实战应用',
      topics: ['实战项目与案例'],
      duration: '2周'
    }
  ];

  const features = [
    { icon: '🔷', title: '.NET生态', desc: '完整的.NET开发生态系统' },
    { icon: '🌐', title: 'ASP.NET Core', desc: '现代化Web应用开发框架' },
    { icon: '🗄️', title: 'Entity Framework', desc: '强大的ORM数据访问技术' },
    { icon: '☁️', title: '云原生', desc: 'Azure云服务与容器化部署' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 text-white rounded-full text-3xl font-bold mb-6">
            N
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">.NET开发</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            掌握Microsoft .NET技术栈，从C#语言到ASP.NET Core，
            构建高性能的现代化应用程序
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-blue-600 mb-2">{stats.totalLessons}</div>
            <div className="text-gray-600">课程数量</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-purple-600 mb-2">{stats.difficulty}</div>
            <div className="text-gray-600">难度等级</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-indigo-600 mb-2">{stats.duration}</div>
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
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                        {index + 1}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{phase.phase}</h3>
                      <span className="ml-auto text-sm text-gray-500">{phase.duration}</span>
                    </div>
                    <div className="ml-12 grid grid-cols-1 md:grid-cols-3 gap-2">
                      {phase.topics.map((topic, topicIndex) => {
                        const topicLinks: { [key: string]: string } = {
                          '概述': '/study/se/dotnet/intro',
                          '开发环境配置': '/study/se/dotnet/setup',
                          'C#基础与语法': '/study/se/dotnet/csharp',
                          'ASP.NET Web开发': '/study/se/dotnet/web',
                          '数据库与EF Core': '/study/se/dotnet/db',
                          '服务与中间件': '/study/se/dotnet/service',
                          '安全与身份认证': '/study/se/dotnet/security',
                          '部署与运维': '/study/se/dotnet/deploy',
                          '测试与调试': '/study/se/dotnet/testing',
                          '实战项目与案例': '/study/se/dotnet/projects'
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

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🚀 快速开始</h3>
              <div className="space-y-3">
                <Link 
                  href="/study/se/dotnet/intro"
                  className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  开始学习
                </Link>
                <Link 
                  href="/study/se/dotnet/csharp"
                  className="block w-full border border-gray-300 text-gray-700 text-center py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  C#语法
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 核心技术</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  C# 语言特性
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  ASP.NET Core
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Entity Framework Core
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Azure云服务
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">💼 职业方向</h3>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3">
                  <div className="font-medium text-blue-900">.NET开发工程师</div>
                  <div className="text-sm text-blue-700">企业级.NET应用开发</div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-3">
                  <div className="font-medium text-purple-900">C#软件工程师</div>
                  <div className="text-sm text-purple-700">桌面和Web应用开发</div>
                </div>
                <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg p-3">
                  <div className="font-medium text-indigo-900">云架构师</div>
                  <div className="text-sm text-indigo-700">Azure云平台架构设计</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
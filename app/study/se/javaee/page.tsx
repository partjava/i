import Link from 'next/link';

export default function JavaEEPage() {
  const stats = {
    totalLessons: 17,
    difficulty: '中高级',
    duration: '12-16周',
    rating: 4.9
  };

  const roadmap = [
    {
      phase: '基础入门',
      topics: ['JavaEE概述', 'JavaEE核心组件', '开发工具与环境'],
      duration: '3周'
    },
    {
      phase: 'Web开发',
      topics: ['Web开发基础', '数据库访问技术', 'Web服务'],
      duration: '4周'
    },
    {
      phase: '企业级应用',
      topics: ['企业级服务', '安全与权限管理', 'JavaEE框架'],
      duration: '4周'
    },
    {
      phase: '高级特性',
      topics: ['异步处理与并发', '微服务架构', '性能调优与监控'],
      duration: '3周'
    },
    {
      phase: '现代化开发',
      topics: ['容器化与云服务', 'DevOps与CI/CD', '前沿技术趋势', '实战项目开发', '学习建议'],
      duration: '4周'
    }
  ];

  const features = [
    { icon: '☕', title: '企业级开发', desc: '完整的Java EE企业级应用开发' },
    { icon: '🌐', title: 'Web技术栈', desc: '全面的Web开发技术体系' },
    { icon: '🏗️', title: '微服务架构', desc: '现代微服务架构设计与实现' },
    { icon: '🚀', title: '云原生', desc: '容器化与云服务部署实践' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-600 text-white rounded-full text-3xl font-bold mb-6">
            J
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Java EE</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            掌握Java企业级开发技术栈，从基础组件到微服务架构，
            成为企业级Java开发专家
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-orange-600 mb-2">{stats.totalLessons}</div>
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
            <div className="text-3xl font-bold text-yellow-600 mb-2">{stats.rating}</div>
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
                      <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                        {index + 1}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{phase.phase}</h3>
                      <span className="ml-auto text-sm text-gray-500">{phase.duration}</span>
                    </div>
                    <div className="ml-12 grid grid-cols-1 md:grid-cols-3 gap-2">
                      {phase.topics.map((topic, topicIndex) => {
                        const topicLinks: { [key: string]: string } = {
                          'JavaEE概述': '/study/se/javaee/intro',
                          'JavaEE核心组件': '/study/se/javaee/components',
                          'Web开发基础': '/study/se/javaee/web',
                          '数据库访问技术': '/study/se/javaee/db',
                          '企业级服务': '/study/se/javaee/enterprise',
                          '安全与权限管理': '/study/se/javaee/security',
                          'Web服务': '/study/se/javaee/webservice',
                          'JavaEE框架': '/study/se/javaee/frameworks',
                          '异步处理与并发': '/study/se/javaee/async',
                          '微服务架构': '/study/se/javaee/microservice',
                          '实战项目开发': '/study/se/javaee/project',
                          '开发工具与环境': '/study/se/javaee/tools',
                          '性能调优与监控': '/study/se/javaee/performance',
                          '容器化与云服务': '/study/se/javaee/cloud',
                          'DevOps与CI/CD': '/study/se/javaee/devops',
                          '前沿技术趋势': '/study/se/javaee/trend',
                          '学习建议': '/study/se/javaee/suggestion'
                        };
                        
                        return (
                          <Link
                            key={topicIndex}
                            href={topicLinks[topic] || '#'}
                            className="text-sm text-gray-600 bg-gray-50 rounded px-3 py-1 hover:bg-orange-50 hover:text-orange-600 transition-colors cursor-pointer block"
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
                  href="/study/se/javaee/intro"
                  className="block w-full bg-orange-600 text-white text-center py-3 rounded-lg hover:bg-orange-700 transition-colors"
                >
                  开始学习
                </Link>
                <Link 
                  href="/study/se/javaee/components"
                  className="block w-full border border-gray-300 text-gray-700 text-center py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  核心组件
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 核心技术</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-600 rounded-full mr-3"></span>
                  Servlet & JSP
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-600 rounded-full mr-3"></span>
                  Spring Framework
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-600 rounded-full mr-3"></span>
                  Hibernate/JPA
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-600 rounded-full mr-3"></span>
                  Spring Boot
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">💼 职业方向</h3>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-3">
                  <div className="font-medium text-orange-900">Java后端工程师</div>
                  <div className="text-sm text-orange-700">企业级Java应用开发</div>
                </div>
                <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-3">
                  <div className="font-medium text-red-900">架构师</div>
                  <div className="text-sm text-red-700">系统架构设计与技术选型</div>
                </div>
                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-3">
                  <div className="font-medium text-yellow-900">全栈工程师</div>
                  <div className="text-sm text-yellow-700">前后端全栈开发</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
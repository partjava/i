'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const tabList = [
  { key: 'overview', label: '概述' },
  { key: 'role', label: '架构师职责' },
  { key: 'principle', label: '设计原则' },
  { key: 'view', label: '架构视图' },
  { key: 'svg', label: '架构图' },
  { key: 'code', label: '代码示例' },
  { key: 'uml', label: 'UML类图' },
];

export default function ArchitectureBasicPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">软件架构基础</h1>
      {/* 顶部tab导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        {tabList.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === tab.key ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 min-h-[320px]">
        {activeTab === 'overview' && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">软件架构的定义与作用</h2>
            <div className="prose max-w-none">
              <p>软件架构是指系统在高层次上的结构和组织方式，包括各个组件、模块之间的关系、交互方式以及设计原则。良好的架构能够提升系统的可维护性、可扩展性和可靠性，是大型软件项目成功的关键。</p>
              
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
                <p className="font-bold text-blue-700">架构的核心价值</p>
                <p className="text-blue-700">软件架构是连接业务需求和技术实现的桥梁，它不仅影响系统的质量属性，还决定了团队的工作效率和系统的长期演进能力。</p>
              </div>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">架构与设计的区别</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">软件架构</h4>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>关注系统整体结构</li>
                    <li>涉及高层决策</li>
                    <li>影响系统全局特性</li>
                    <li>与业务目标紧密相关</li>
                    <li>通常是抽象的、概念性的</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">详细设计</h4>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>关注具体组件实现</li>
                    <li>涉及低层实现细节</li>
                    <li>影响局部模块特性</li>
                    <li>与技术实现紧密相关</li>
                    <li>通常是具体的、技术性的</li>
                  </ul>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">架构的重要性</h3>
              <ul className="list-disc pl-6">
                <li>定义系统的主要组件及其职责，确保团队成员对系统有共同理解</li>
                <li>描述组件之间的交互关系，帮助团队理解系统如何协同工作</li>
                <li>为开发、测试、部署等活动提供指导，确保项目按计划进行</li>
                <li>支撑系统的演进和扩展，降低系统维护成本</li>
                <li>提前识别和解决潜在的技术风险</li>
              </ul>
            </div>
          </section>
        )}
        {activeTab === 'role' && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">架构师的职责与能力要求</h2>
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mt-6 mb-3">核心职责</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-700 mb-2 flex items-center">
                    <i className="fa fa-cogs mr-2"></i>技术职责
                  </h4>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>系统整体设计与技术选型</li>
                    <li>制定架构规范与标准</li>
                    <li>解决系统关键技术难题</li>
                    <li>评估和引入新技术</li>
                    <li>性能优化与调优</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-700 mb-2 flex items-center">
                    <i className="fa fa-users mr-2"></i>团队职责
                  </h4>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>指导和评审开发团队的设计</li>
                    <li>推动团队技术进步与知识分享</li>
                    <li>与产品、测试、运维等多方协作</li>
                    <li>培养和提升团队技术能力</li>
                    <li>协调解决团队技术争议</li>
                  </ul>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">能力要求</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-700 mb-2 flex items-center">
                    <i className="fa fa-code mr-2"></i>技术能力
                  </h4>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>广泛的技术栈知识</li>
                    <li>系统设计与架构经验</li>
                    <li>性能优化与调优能力</li>
                    <li>解决复杂问题的能力</li>
                    <li>熟悉行业最佳实践</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-700 mb-2 flex items-center">
                    <i className="fa fa-lightbulb-o mr-2"></i>思维能力
                  </h4>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>抽象思维与建模能力</li>
                    <li>全局视野与战略思维</li>
                    <li>问题分析与决策能力</li>
                    <li>技术前瞻性与创新能力</li>
                    <li>权衡与取舍能力</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-700 mb-2 flex items-center">
                    <i className="fa fa-comments mr-2"></i>沟通能力
                  </h4>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>清晰的技术表达能力</li>
                    <li>跨团队协作能力</li>
                    <li>向上沟通与汇报能力</li>
                    <li>冲突解决与协调能力</li>
                    <li>文档编写与表达能力</li>
                  </ul>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">架构师的成长路径</h3>
              <div className="relative py-10">
                <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform md:-translate-x-1/2"></div>
                <div className="relative z-10 space-y-8">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="order-1 md:w-1/2 md:pr-8 md:text-right">
                      <h4 className="font-semibold text-lg">初级架构师</h4>
                      <p className="text-gray-600">2-5年经验，参与架构设计，熟悉特定领域技术</p>
                    </div>
                    <div className="order-0 md:order-1 flex items-center mb-4 md:mb-0">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-lg">
                        <i className="fa fa-user"></i>
                      </div>
                    </div>
                    <div className="order-2 md:w-1/2 md:pl-8 md:text-left hidden md:block"></div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="order-1 md:w-1/2 md:pr-8 md:text-right hidden md:block"></div>
                    <div className="order-0 md:order-1 flex items-center mb-4 md:mb-0">
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg">
                        <i className="fa fa-user-plus"></i>
                      </div>
                    </div>
                    <div className="order-2 md:w-1/2 md:pl-8 md:text-left">
                      <h4 className="font-semibold text-lg">中级架构师</h4>
                      <p className="text-gray-600">5-8年经验，独立负责子系统架构，解决复杂问题</p>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="order-1 md:w-1/2 md:pr-8 md:text-right">
                      <h4 className="font-semibold text-lg">高级架构师</h4>
                      <p className="text-gray-600">8-12年经验，负责整体架构设计，指导技术方向</p>
                    </div>
                    <div className="order-0 md:order-1 flex items-center mb-4 md:mb-0">
                      <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white shadow-lg">
                        <i className="fa fa-user-circle"></i>
                      </div>
                    </div>
                    <div className="order-2 md:w-1/2 md:pl-8 md:text-left hidden md:block"></div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="order-1 md:w-1/2 md:pr-8 md:text-right hidden md:block"></div>
                    <div className="order-0 md:order-1 flex items-center mb-4 md:mb-0">
                      <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white shadow-lg">
                        <i className="fa fa-star"></i>
                      </div>
                    </div>
                    <div className="order-2 md:w-1/2 md:pl-8 md:text-left">
                      <h4 className="font-semibold text-lg">技术专家/CTO</h4>
                      <p className="text-gray-600">12年以上经验，制定技术战略，引领技术创新</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        {activeTab === 'principle' && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">架构设计的基本原则</h2>
            <div className="prose max-w-none">
              <p>架构设计原则是指导架构师进行系统设计的基本准则，它们帮助确保系统具有良好的质量属性和可维护性。以下是一些核心的架构设计原则：</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-transform duration-300 hover:shadow-md hover:-translate-y-1">
                  <div className="bg-blue-500 text-white p-4">
                    <h3 className="text-xl font-semibold flex items-center">
                      <i className="fa fa-link mr-2"></i>高内聚，低耦合
                    </h3>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-700 mb-3">每个模块应专注于单一职责，模块间依赖关系应最小化。</p>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-sm text-gray-600"><span className="font-semibold">内聚性：</span>衡量模块内部元素关联性的指标，高内聚意味着模块专注于单一功能</p>
                      <p className="text-sm text-gray-600 mt-2"><span className="font-semibold">耦合性：</span>衡量模块间依赖程度的指标，低耦合意味着模块间依赖关系简单</p>
                    </div>
                    <div className="mt-3 text-sm text-blue-600">
                      <p>优点：提高可维护性、可复用性和可测试性</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-transform duration-300 hover:shadow-md hover:-translate-y-1">
                  <div className="bg-green-500 text-white p-4">
                    <h3 className="text-xl font-semibold flex items-center">
                      <i className="fa fa-expand mr-2"></i>可扩展性
                    </h3>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-700 mb-3">系统应设计为易于添加新功能或适应变化，而不需要大规模修改现有代码。</p>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-sm text-gray-600"><span className="font-semibold">开闭原则：</span>对扩展开放，对修改关闭</p>
                      <p className="text-sm text-gray-600 mt-2"><span className="font-semibold">常见实现方式：</span>使用接口、抽象类、插件机制、依赖注入</p>
                    </div>
                    <div className="mt-3 text-sm text-green-600">
                      <p>优点：降低变更成本，支持业务快速迭代</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-transform duration-300 hover:shadow-md hover:-translate-y-1">
                  <div className="bg-purple-500 text-white p-4">
                    <h3 className="text-xl font-semibold flex items-center">
                      <i className="fa fa-wrench mr-2"></i>可维护性
                    </h3>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-700 mb-3">代码结构应清晰，便于理解、修改和修复问题。</p>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-sm text-gray-600"><span className="font-semibold">关键因素：</span>代码可读性、模块化程度、文档完整性</p>
                      <p className="text-sm text-gray-600 mt-2"><span className="font-semibold">实践方法：</span>遵循编码规范、使用设计模式、适当注释</p>
                    </div>
                    <div className="mt-3 text-sm text-purple-600">
                      <p>优点：减少维护成本，提高团队协作效率</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-transform duration-300 hover:shadow-md hover:-translate-y-1">
                  <div className="bg-orange-500 text-white p-4">
                    <h3 className="text-xl font-semibold flex items-center">
                      <i className="fa fa-clone mr-2"></i>可复用性
                    </h3>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-700 mb-3">模块应设计为可在不同项目或场景中复用，减少重复开发。</p>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-sm text-gray-600"><span className="font-semibold">复用级别：</span>代码复用、组件复用、服务复用</p>
                      <p className="text-sm text-gray-600 mt-2"><span className="font-semibold">实现策略：</span>抽象通用功能、标准化接口、创建组件库</p>
                    </div>
                    <div className="mt-3 text-sm text-orange-600">
                      <p>优点：提高开发效率，降低成本，提高质量</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-transform duration-300 hover:shadow-md hover:-translate-y-1">
                  <div className="bg-red-500 text-white p-4">
                    <h3 className="text-xl font-semibold flex items-center">
                    <i className="fa fa-shield mr-2"></i>安全性与健壮性
                    </h3>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-700 mb-3">系统应能抵御异常和攻击，保证稳定运行，即使在不利条件下也能优雅降级。</p>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-sm text-gray-600"><span className="font-semibold">安全设计：</span>身份验证、授权、数据加密、输入验证</p>
                      <p className="text-sm text-gray-600 mt-2"><span className="font-semibold">健壮性设计：</span>错误处理、容错机制、重试策略</p>
                    </div>
                    <div className="mt-3 text-sm text-red-600">
                      <p>优点：保护数据安全，提高系统可靠性</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-transform duration-300 hover:shadow-md hover:-translate-y-1">
                  <div className="bg-indigo-500 text-white p-4">
                    <h3 className="text-xl font-semibold flex items-center">
                      <i className="fa fa-bolt mr-2"></i>性能与效率
                    </h3>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-700 mb-3">合理分配资源，满足业务需求，避免过度设计。</p>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-sm text-gray-600"><span className="font-semibold">关键指标：</span>响应时间、吞吐量、资源利用率</p>
                      <p className="text-sm text-gray-600 mt-2"><span className="font-semibold">优化策略：</span>缓存、异步处理、负载均衡、数据库优化</p>
                    </div>
                    <div className="mt-3 text-sm text-indigo-600">
                      <p>优点：提升用户体验，支持高并发场景</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mt-8 mb-3">原则的权衡与取舍</h3>
              <p>在实际架构设计中，往往需要在不同原则之间进行权衡，因为某些原则之间可能存在冲突。例如：</p>
              <ul className="list-disc pl-6 mt-3">
                <li>可扩展性与性能：过度追求可扩展性可能引入额外的抽象层，影响性能</li>
                <li>安全性与可用性：严格的安全措施可能降低系统的可用性</li>
                <li>可维护性与开发效率：过于复杂的设计模式可能提高可维护性，但增加开发难度</li>
              </ul>
              <p className="mt-3 italic text-gray-600">优秀的架构师需要根据系统的具体需求和约束条件，合理平衡这些原则，找到最适合的解决方案。</p>
            </div>
          </section>
        )}
        {activeTab === 'view' && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">架构视图与文档</h2>
            <div className="prose max-w-none">
              <p>架构视图是从不同角度展示系统架构的方法，帮助不同涉众（开发人员、管理人员、用户等）理解系统的不同方面。</p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">4+1视图模型</h3>
              <p>4+1视图模型是最常用的架构视图方法，由Philippe Kruchten提出，包括以下五个视图：</p>
              
              <div className="relative mt-8 mb-12">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-40 h-40 rounded-full bg-blue-100 flex items-center justify-center border-2 border-blue-300">
                    <span className="font-semibold text-blue-700">场景视图</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow border border-gray-200 relative z-10 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white mb-3 mx-auto">
                      <i className="fa fa-desktop"></i>
                    </div>
                    <h4 className="font-semibold text-center mb-2">逻辑视图</h4>
                    <p className="text-sm text-gray-600 text-center">描述系统的功能模块及其关系，关注系统的静态结构</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow border border-gray-200 relative z-10 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white mb-3 mx-auto">
                      <i className="fa fa-code"></i>
                    </div>
                    <h4 className="font-semibold text-center mb-2">开发视图</h4>
                    <p className="text-sm text-gray-600 text-center">描述模块的实现结构和包依赖，关注软件开发过程中的组织和管理</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow border border-gray-200 relative z-10 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white mb-3 mx-auto">
                      <i className="fa fa-sitemap"></i>
                    </div>
                    <h4 className="font-semibold text-center mb-2">进程视图</h4>
                    <p className="text-sm text-gray-600 text-center">描述系统的并发和通信机制，关注系统的动态行为和运行时特性</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow border border-gray-200 relative z-10 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white mb-3 mx-auto">
                      <i className="fa fa-server"></i>
                    </div>
                    <h4 className="font-semibold text-center mb-2">物理视图</h4>
                    <p className="text-sm text-gray-600 text-center">描述系统的部署结构，关注系统在物理硬件上的分布和配置</p>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">UML（统一建模语言）</h3>
              <p>UML是一种标准化的建模语言，用于可视化、详述、构造和文档化软件系统的制品。在架构设计中，常用的UML图包括：</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                    <i className="fa fa-cubes mr-2"></i>结构型图
                  </h4>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>类图（Class Diagram）</li>
                    <li>对象图（Object Diagram）</li>
                    <li>组件图（Component Diagram）</li>
                    <li>部署图（Deployment Diagram）</li>
                    <li>包图（Package Diagram）</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                    <i className="fa fa-refresh mr-2"></i>行为型图
                  </h4>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>用例图（Use Case Diagram）</li>
                    <li>活动图（Activity Diagram）</li>
                    <li>状态机图（State Machine Diagram）</li>
                    <li>交互概览图（Interaction Overview Diagram）</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                    <i className="fa fa-exchange mr-2"></i>交互型图
                  </h4>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>序列图（Sequence Diagram）</li>
                    <li>通信图（Communication Diagram）</li>
                    <li>定时图（Timing Diagram）</li>
                  </ul>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">架构文档的重要性</h3>
              <p>架构文档是记录和传达系统架构设计的重要工具，它不仅帮助团队成员理解系统，也为后续的维护和演进提供依据。</p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
                <p className="font-semibold text-blue-700">架构文档的核心内容</p>
                <ul className="list-disc pl-5 text-blue-700 mt-2">
                  <li>架构概述与愿景</li>
                  <li>系统上下文与边界</li>
                  <li>关键需求与质量属性</li>
                  <li>架构视图与模型</li>
                  <li>设计决策与理由</li>
                  <li>技术选型与标准</li>
                  <li>演进路线图</li>
                </ul>
              </div>
            </div>
          </section>
        )}
        {activeTab === 'svg' && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">典型分层架构示意图</h2>
            <div className="flex justify-center my-6">
              <svg width="400" height="220" viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="50" y="30" width="300" height="40" fill="#e3e8f7" stroke="#3b82f6" strokeWidth="2" rx="8"/>
                <text x="200" y="55" textAnchor="middle" fontSize="18" fill="#1e293b">表示层（UI）</text>
                <rect x="50" y="80" width="300" height="40" fill="#f1f5f9" stroke="#3b82f6" strokeWidth="2" rx="8"/>
                <text x="200" y="105" textAnchor="middle" fontSize="18" fill="#1e293b">业务逻辑层（BLL）</text>
                <rect x="50" y="130" width="300" height="40" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" rx="8"/>
                <text x="200" y="155" textAnchor="middle" fontSize="18" fill="#1e293b">数据访问层（DAL）</text>
                <rect x="50" y="180" width="300" height="30" fill="#fef9c3" stroke="#f59e42" strokeWidth="2" rx="8"/>
                <text x="200" y="200" textAnchor="middle" fontSize="16" fill="#92400e">数据库</text>
                <line x1="200" y1="70" x2="200" y2="80" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
                <line x1="200" y1="120" x2="200" y2="130" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
                <line x1="200" y1="170" x2="200" y2="180" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
                <defs>
                  <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L10,5 L0,10 L3,5 Z" fill="#64748b" />
                  </marker>
                </defs>
              </svg>
            </div>
            <div className="prose max-w-none">
              <p className="text-center text-gray-500">典型三层架构：UI层 → 业务逻辑层 → 数据访问层 → 数据库</p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">分层架构的特点</h3>
              <ul className="list-disc pl-6">
                <li><b>分离关注点：</b>每层专注于特定类型的功能，降低模块间的耦合</li>
                <li><b>可扩展性：</b>可以独立修改或替换某一层，而不影响其他层</li>
                <li><b>可维护性：</b>每层的职责明确，便于理解和维护</li>
                <li><b>复用性：</b>同一层的组件可以在不同应用中复用</li>
                <li><b>标准化接口：</b>层与层之间通过定义良好的接口通信</li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">分层架构的典型应用场景</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">Web应用</h4>
                  <p className="text-gray-600">表示层（前端页面）、业务逻辑层（后端服务）、数据访问层（数据库操作）</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">企业级应用</h4>
                  <p className="text-gray-600">客户端层、应用服务器层、业务逻辑层、数据层</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">移动应用</h4>
                  <p className="text-gray-600">UI层、业务逻辑层、数据持久层、网络层</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">大型系统</h4>
                  <p className="text-gray-600">可能扩展为多层架构（如增加服务层、网关层等）</p>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">分层架构的潜在问题</h3>
              <ul className="list-disc pl-6">
                <li><b>性能问题：</b>多层之间的调用可能引入额外的开销</li>
                <li><b>过度设计：</b>对于简单系统，分层可能增加不必要的复杂性</li>
                <li><b>层间依赖：</b>如果设计不当，可能导致层间依赖关系混乱</li>
                <li><b>事务管理：</b>跨层事务处理可能变得复杂</li>
              </ul>
            </div>
          </section>
        )}
        {activeTab === 'code' && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">分层架构伪代码示例</h2>
            <div className="prose max-w-none">
              <p>以下是一个简单的分层架构实现示例，展示了三层架构中各层之间的协作方式。</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                    <i className="fa fa-desktop mr-2"></i>表示层（UI）
                  </h4>
                  <p className="text-gray-600">负责处理用户交互，接收请求并返回响应</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                    <i className="fa fa-cogs mr-2"></i>业务逻辑层（BLL）
                  </h4>
                  <p className="text-gray-600">实现核心业务逻辑，处理业务规则和事务</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                    <i className="fa fa-database mr-2"></i>数据访问层（DAL）
                  </h4>
                  <p className="text-gray-600">负责与数据存储交互，执行CRUD操作</p>
                </div>
              </div>
              
              <pre className="bg-gray-100 p-4 rounded mb-4 text-xs overflow-x-auto mt-6">
{`// 表示层（UI） - UserController.js
class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  // 处理用户登录请求
  async handleLogin(req) {
    try {
      // 1. 验证输入参数
      const { username, password } = req.body;
      if (!username || !password) {
        return { status: 400, error: '用户名和密码不能为空' };
      }
      
      // 2. 调用业务逻辑层处理登录
      const user = await this.userService.login(username, password);
      
      // 3. 生成响应
      if (!user) {
        return { status: 401, error: '认证失败' };
      }
      
      // 4. 返回成功响应
      return { status: 200, data: { user, token: generateToken(user) } };
    } catch (error) {
      // 处理异常
      console.error('登录处理失败:', error);
      return { status: 500, error: '服务器内部错误' };
    }
  }
}

// 业务逻辑层（BLL） - UserService.js
class UserService {
  constructor(userRepository, passwordHasher, emailService) {
    this.userRepository = userRepository;
    this.passwordHasher = passwordHasher;
    this.emailService = emailService;
  }

  // 用户登录业务逻辑
  async login(username, password) {
    // 1. 查询用户
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      return null;
    }
    
    // 2. 验证密码
    const isPasswordValid = await this.passwordHasher.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return null;
    }
    
    // 3. 记录登录日志（业务规则）
    await this.logLoginActivity(user.id);
    
    // 4. 检查账户状态（业务规则）
    if (user.isLocked) {
      throw new Error('账户已锁定');
    }
    
    // 5. 如果是首次登录，发送欢迎邮件（业务规则）
    if (!user.hasLoggedInBefore) {
      await this.emailService.sendWelcomeEmail(user.email);
      await this.userRepository.markAsLoggedIn(user.id);
    }
    
    // 6. 返回用户信息
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    };
  }

  // 记录登录活动
  async logLoginActivity(userId) {
    await this.userRepository.recordLoginActivity(userId, new Date());
  }
}

// 数据访问层（DAL） - UserRepository.js
class UserRepository {
  constructor(databaseConnection) {
    this.db = databaseConnection;
  }

  // 根据用户名查找用户
  async findByUsername(username) {
    const query = 'SELECT * FROM users WHERE username = ? LIMIT 1';
    const [rows] = await this.db.execute(query, [username]);
    return rows[0] || null;
  }

  // 记录登录活动
  async recordLoginActivity(userId, timestamp) {
    const query = 'INSERT INTO user_login_history (user_id, login_time) VALUES (?, ?)';
    await this.db.execute(query, [userId, timestamp]);
  }

  // 标记用户为已登录
  async markAsLoggedIn(userId) {
    const query = 'UPDATE users SET has_logged_in_before = true WHERE id = ?';
    await this.db.execute(query, [userId]);
  }
}

// 依赖注入示例 - Application.js
class Application {
  static async initialize() {
    // 1. 初始化数据库连接
    const dbConnection = await createDatabaseConnection({
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'mydb'
    });
    
    // 2. 创建数据访问层组件
    const userRepository = new UserRepository(dbConnection);
    
    // 3. 创建业务逻辑层组件
    const passwordHasher = new PasswordHasher();
    const emailService = new EmailService();
    const userService = new UserService(userRepository, passwordHasher, emailService);
    
    // 4. 创建表示层组件
    const userController = new UserController(userService);
    
    // 5. 启动应用服务器
    const server = new WebServer();
    server.registerController('/api/users', userController);
    server.start(3000);
    
    console.log('应用已启动，监听端口 3000');
  }
}`}
              </pre>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">分层架构的关键优势</h3>
              <ul className="list-disc pl-6">
                <li><b>职责分离：</b>每层专注于特定类型的功能，提高代码的可维护性</li>
                <li><b>松耦合：</b>层与层之间通过接口通信，降低模块间的依赖</li>
                <li><b>可测试性：</b>每层可以独立测试，便于编写单元测试和集成测试</li>
                <li><b>可扩展性：</b>可以独立修改或替换某一层，而不影响其他层</li>
                <li><b>复用性：</b>同一层的组件可以在不同应用中复用</li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">分层架构的最佳实践</h3>
              <ul className="list-disc pl-6">
                <li>严格遵循单向依赖原则（上层依赖下层，下层不依赖上层）</li>
                <li>使用接口定义层与层之间的契约</li>
                <li>避免业务逻辑泄漏到表示层或数据访问层</li>
                <li>使用依赖注入管理组件间的依赖关系</li>
                <li>考虑使用DTO（数据传输对象）在层之间传递数据</li>
              </ul>
            </div>
          </section>
        )}
        {activeTab === 'uml' && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">UML 类图 PlantUML 示例</h2>
            <div className="prose max-w-none">
              <p>UML类图是描述系统静态结构的重要工具，它展示了类、接口、关系等元素。以下是一个简单的分层架构UML类图示例：</p>
              
              <pre className="bg-gray-100 p-4 rounded mb-4 text-xs overflow-x-auto">
{`@startuml
' 设置皮肤参数
skinparam monochrome true
skinparam class {
    BackgroundColor White
    BorderColor Black
    ArrowColor Black
}

' 定义包
package "表示层" as Presentation {
    class UserController {
        + handleLogin(req)
    }
}

package "业务逻辑层" as Business {
    interface UserServiceInterface {
        + login(username, password)
        + register(userData)
    }
    
    class UserServiceImpl implements UserServiceInterface {
        - userRepository: UserRepositoryInterface
        - passwordHasher: PasswordHasherInterface
        - emailService: EmailServiceInterface
        + login(username, password)
        + register(userData)
        # validateUserInput(userData)
        # sendWelcomeEmail(user)
    }
    
    interface PasswordHasherInterface {
        + hash(password)
        + compare(rawPassword, hashedPassword)
    }
    
    class BcryptPasswordHasher implements PasswordHasherInterface {
        + hash(password)
        + compare(rawPassword, hashedPassword)
    }
    
    interface EmailServiceInterface {
        + sendWelcomeEmail(email)
        + sendPasswordResetEmail(email, token)
    }
    
    class SmtpEmailService implements EmailServiceInterface {
        - smtpClient: SmtpClient
        + sendWelcomeEmail(email)
        + sendPasswordResetEmail(email, token)
    }
}

package "数据访问层" as Data {
    interface UserRepositoryInterface {
        + findByUsername(username)
        + create(userData)
        + update(userData)
    }
    
    class UserRepositoryImpl implements UserRepositoryInterface {
        - database: DatabaseConnection
        + findByUsername(username)
        + create(userData)
        + update(userData)
    }
    
    interface DatabaseConnection {
        + execute(query, params)
        + beginTransaction()
        + commit()
        + rollback()
    }
    
    class MySqlConnection implements DatabaseConnection {
        - host: string
        - user: string
        - password: string
        - database: string
        + execute(query, params)
        + beginTransaction()
        + commit()
        + rollback()
    }
}

' 定义关系
UserController --> UserServiceInterface : uses
UserServiceImpl --> UserRepositoryInterface : uses
UserServiceImpl --> PasswordHasherInterface : uses
UserServiceImpl --> EmailServiceInterface : uses
UserRepositoryImpl --> DatabaseConnection : uses
SmtpEmailService --> SmtpClient : uses

' 显示继承关系
UserServiceImpl --|> UserServiceInterface : implements
BcryptPasswordHasher --|> PasswordHasherInterface : implements
SmtpEmailService --|> EmailServiceInterface : implements
UserRepositoryImpl --|> UserRepositoryInterface : implements
MySqlConnection --|> DatabaseConnection : implements

@enduml`}
              </pre>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">UML类图关键元素解释</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">类（Class）</h4>
                  <p className="text-gray-600">矩形框表示，包含类名、属性和方法，分为具体类（实线）和抽象类（虚线）</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">接口（Interface）</h4>
                  <p className="text-gray-600">类名前加&lt;&lt;interface&gt;&gt;标签，只包含方法签名，不包含实现</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">继承关系</h4>
                  <p className="text-gray-600">空心三角形箭头的实线，表示一个类继承另一个类或实现接口</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">依赖关系</h4>
                  <p className="text-gray-600">带箭头的虚线，表示一个类使用另一个类的服务</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">关联关系</h4>
                  <p className="text-gray-600">实线，表示类之间的结构关系，如聚合和组合</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">包（Package）</h4>
                  <p className="text-gray-600">用于组织类和接口，类似文件夹结构，提高模型的可读性</p>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">UML类图的作用</h3>
              <ul className="list-disc pl-6">
                <li>帮助团队成员理解系统的静态结构</li>
                <li>作为设计文档，记录系统设计决策</li>
                <li>在开发前进行架构验证和讨论</li>
                <li>为代码实现提供蓝图</li>
                <li>支持逆向工程，从现有代码生成类图</li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">PlantUML工具</h3>
              <p>PlantUML是一个开源工具，可以通过简单的文本描述生成UML图。它支持多种UML图类型，包括类图、序列图、用例图等。</p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
                <p className="font-semibold text-blue-700">使用PlantUML的优点</p>
                <ul className="list-disc pl-5 text-blue-700 mt-2">
                  <li>文本格式，易于版本控制</li>
                  <li>可以集成到开发工具链中</li>
                  <li>支持自动化生成文档</li>
                  <li>语法简单，学习曲线平缓</li>
                  <li>社区活跃，有丰富的插件和扩展</li>
                </ul>
              </div>
            </div>
          </section>
        )}
      </div>
      {/* 底部导航栏 */}
      <div className="mt-8 flex justify-between">
        <Link href="/study/se/architecture-design" className="px-4 py-2 text-blue-600 hover:text-blue-800">← 返回架构与设计模式</Link>
        <Link href="/study/se/architecture-design/styles" className="px-4 py-2 text-blue-600 hover:text-blue-800">主流架构风格 →</Link>
      </div>
    </div>
  );
}    
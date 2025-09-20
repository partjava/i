'use client';
import React, { useState } from'react';
import Link from 'next/link';

const tabList = [
  { key: 'architecture', label: '架构设计' },
  { key: 'patterns', label: '设计模式' },
  { key: 'principles', label: '设计原则' },
  { key: 'practice', label: '实战问题' },
];

export default function InterviewPage() {
  const [activeTab, setActiveTab] = useState('architecture');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">常见面试题与答疑</h1>
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
        {activeTab === 'architecture' && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">架构设计面试题</h2>
            <div className="prose max-w-none">
              <div className="space-y-8">
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500">
                  <h3 className="text-xl font-semibold mb-3">1. 什么是软件架构？如何设计一个好的软件架构？</h3>
                  <div className="space-y-4">
                    <p className="text-gray-700">软件架构是软件系统的高级结构，它定义了系统的组织方式、组件之间的关系以及设计原则。</p>
                    <div className="bg-white p-4 rounded border">
                      <h4 className="font-semibold mb-2 text-blue-600">设计好的软件架构需要考虑：</h4>
                      <ul className="list-disc pl-5 text-gray-600">
                        <li><span className="inline-block w-6 h-6 bg-blue-100 rounded-full text-blue-600 text-center mr-2">1</span> 可扩展性：系统能够方便地扩展新功能</li>
                        <li><span className="inline-block w-6 h-6 bg-blue-100 rounded-full text-blue-600 text-center mr-2">2</span> 可维护性：系统易于理解和修改</li>
                        <li><span className="inline-block w-6 h-6 bg-blue-100 rounded-full text-blue-600 text-center mr-2">3</span> 可测试性：系统易于进行单元测试和集成测试</li>
                        <li><span className="inline-block w-6 h-6 bg-blue-100 rounded-full text-blue-600 text-center mr-2">4</span> 性能：系统能够满足性能需求</li>
                        <li><span className="inline-block w-6 h-6 bg-blue-100 rounded-full text-blue-600 text-center mr-2">5</span> 安全性：系统具有必要的安全保护措施</li>
                        <li><span className="inline-block w-6 h-6 bg-blue-100 rounded-full text-blue-600 text-center mr-2">6</span> 可用性：系统具有高可用性和容错能力</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-green-500">
                  <h3 className="text-xl font-semibold mb-3">2. 常见的软件架构模式有哪些？各有什么特点？</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded border border-green-300">
                        <h4 className="font-semibold mb-2 text-green-600">分层架构</h4>
                        <ul className="list-disc pl-5 text-gray-600">
                          <li>优点：结构清晰，职责分明</li>
                          <li>缺点：层间耦合，性能开销</li>
                          <li>适用：企业级应用</li>
                        </ul>
                      </div>
                      <div className="bg-white p-4 rounded border border-green-300">
                        <h4 className="font-semibold mb-2 text-green-600">微服务架构</h4>
                        <ul className="list-disc pl-5 text-gray-600">
                          <li>优点：服务独立，易于扩展</li>
                          <li>缺点：分布式复杂性</li>
                          <li>适用：大型分布式系统</li>
                        </ul>
                      </div>
                      <div className="bg-white p-4 rounded border border-green-300">
                        <h4 className="font-semibold mb-2 text-green-600">事件驱动架构</h4>
                        <ul className="list-disc pl-5 text-gray-600">
                          <li>优点：松耦合，高响应性</li>
                          <li>缺点：事件追踪困难</li>
                          <li>适用：实时系统</li>
                        </ul>
                      </div>
                      <div className="bg-white p-4 rounded border border-green-300">
                        <h4 className="font-semibold mb-2 text-green-600">领域驱动设计</h4>
                        <ul className="list-disc pl-5 text-gray-600">
                          <li>优点：业务模型清晰</li>
                          <li>缺点：学习成本高</li>
                          <li>适用：复杂业务系统</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-purple-500">
                  <h3 className="text-xl font-semibold mb-3">3. 如何评估一个软件架构的好坏？</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded border">
                      <h4 className="font-semibold mb-2 text-purple-600">评估维度：</h4>
                      <ul className="list-disc pl-5 text-gray-600">
                        <li><span className="inline-block w-6 h-6 bg-purple-100 rounded-full text-purple-600 text-center mr-2">1</span> 功能性：是否满足所有功能需求</li>
                        <li><span className="inline-block w-6 h-6 bg-purple-100 rounded-full text-purple-600 text-center mr-2">2</span> 质量属性：性能、安全、可用性等</li>
                        <li><span className="inline-block w-6 h-6 bg-purple-100 rounded-full text-purple-600 text-center mr-2">3</span> 可维护性：代码结构、文档完整性</li>
                        <li><span className="inline-block w-6 h-6 bg-purple-100 rounded-full text-purple-600 text-center mr-2">4</span> 可扩展性：是否易于添加新功能</li>
                        <li><span className="inline-block w-6 h-6 bg-purple-100 rounded-full text-purple-600 text-center mr-2">5</span> 技术选型：是否选择了合适的技术栈</li>
                        <li><span className="inline-block w-6 h-6 bg-purple-100 rounded-full text-purple-600 text-center mr-2">6</span> 成本效益：开发维护成本是否合理</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'patterns' && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">设计模式面试题</h2>
            <div className="prose max-w-none">
              <div className="space-y-8">
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500">
                  <h3 className="text-xl font-semibold mb-3">1. 什么是设计模式？为什么要使用设计模式？</h3>
                  <div className="space-y-4">
                    <p className="text-gray-700">设计模式是软件开发中常见问题的可重用解决方案，它们是在特定场景下解决特定问题的经验总结。</p>
                    <div className="bg-white p-4 rounded border">
                      <h4 className="font-semibold mb-2 text-blue-600">使用设计模式的好处：</h4>
                      <ul className="list-disc pl-5 text-gray-600">
                        <li><span className="inline-block w-6 h-6 bg-blue-100 rounded-full text-blue-600 text-center mr-2">1</span> 提高代码复用性</li>
                        <li><span className="inline-block w-6 h-6 bg-blue-100 rounded-full text-blue-600 text-center mr-2">2</span> 提高代码可维护性</li>
                        <li><span className="inline-block w-6 h-6 bg-blue-100 rounded-full text-blue-600 text-center mr-2">3</span> 提高代码可扩展性</li>
                        <li><span className="inline-block w-6 h-6 bg-blue-100 rounded-full text-blue-600 text-center mr-2">4</span> 提高代码可读性</li>
                        <li><span className="inline-block w-6 h-6 bg-blue-100 rounded-full text-blue-600 text-center mr-2">5</span> 降低代码耦合度</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-green-500">
                  <h3 className="text-xl font-semibold mb-3">2. 设计模式分为哪几类？各有什么特点？</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded border border-green-300">
                        <h4 className="font-semibold mb-2 text-green-600">创建型模式</h4>
                        <ul className="list-disc pl-5 text-gray-600">
                          <li>关注对象创建</li>
                          <li>隐藏创建细节</li>
                          <li>提高系统灵活性</li>
                        </ul>
                      </div>
                      <div className="bg-white p-4 rounded border border-green-300">
                        <h4 className="font-semibold mb-2 text-green-600">结构型模式</h4>
                        <ul className="list-disc pl-5 text-gray-600">
                          <li>关注类和对象组合</li>
                          <li>优化系统结构</li>
                          <li>提高系统扩展性</li>
                        </ul>
                      </div>
                      <div className="bg-white p-4 rounded border border-green-300">
                        <h4 className="font-semibold mb-2 text-green-600">行为型模式</h4>
                        <ul className="list-disc pl-5 text-gray-600">
                          <li>关注对象间通信</li>
                          <li>优化对象职责分配</li>
                          <li>提高系统灵活性</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-purple-500">
                  <h3 className="text-xl font-semibold mb-3">3. 如何选择合适的设计模式？</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded border">
                      <h4 className="font-semibold mb-2 text-purple-600">选择考虑因素：</h4>
                      <ul className="list-disc pl-5 text-gray-600">
                        <li><span className="inline-block w-6 h-6 bg-purple-100 rounded-full text-purple-600 text-center mr-2">1</span> 问题类型：明确要解决的具体问题</li>
                        <li><span className="inline-block w-6 h-6 bg-purple-100 rounded-full text-purple-600 text-center mr-2">2</span> 系统需求：考虑系统的功能和非功能需求</li>
                        <li><span className="inline-block w-6 h-6 bg-purple-100 rounded-full text-purple-600 text-center mr-2">3</span> 团队能力：评估团队对模式的熟悉程度</li>
                        <li><span className="inline-block w-6 h-6 bg-purple-100 rounded-full text-purple-600 text-center mr-2">4</span> 维护成本：考虑模式的实现和维护成本</li>
                        <li><span className="inline-block w-6 h-6 bg-purple-100 rounded-full text-purple-600 text-center mr-2">5</span> 性能影响：评估模式对系统性能的影响</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'principles' && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">设计原则面试题</h2>
            <div className="prose max-w-none">
              <div className="space-y-8">
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500">
                  <h3 className="text-xl font-semibold mb-3">1. SOLID原则是什么？请详细解释每个原则。</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded border">
                      <h4 className="font-semibold mb-2 text-blue-600">SOLID原则详解：</h4>
                      <ul className="list-disc pl-5 text-gray-600">
                        <li><span className="inline-block w-6 h-6 bg-blue-100 rounded-full text-blue-600 text-center mr-2">1</span> <b>单一职责原则(SRP)</b>：一个类应该只有一个引起它变化的原因</li>
                        <li><span className="inline-block w-6 h-6 bg-blue-100 rounded-full text-blue-600 text-center mr-2">2</span> <b>开闭原则(OCP)</b>：软件实体应该对扩展开放，对修改关闭</li>
                        <li><span className="inline-block w-6 h-6 bg-blue-100 rounded-full text-blue-600 text-center mr-2">3</span> <b>里氏替换原则(LSP)</b>：子类必须能够替换其父类</li>
                        <li><span className="inline-block w-6 h-6 bg-blue-100 rounded-full text-blue-600 text-center mr-2">4</span> <b>接口隔离原则(ISP)</b>：使用多个专门的接口比使用单个总接口要好</li>
                        <li><span className="inline-block w-6 h-6 bg-blue-100 rounded-full text-blue-600 text-center mr-2">5</span> <b>依赖倒置原则(DIP)</b>：高层模块不应该依赖低层模块，两者都应该依赖抽象</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-green-500">
                  <h3 className="text-xl font-semibold mb-3">2. 如何在项目中应用这些设计原则？</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded border">
                      <h4 className="font-semibold mb-2 text-green-600">应用方法：</h4>
                      <ul className="list-disc pl-5 text-gray-600">
                        <li><span className="inline-block w-6 h-6 bg-green-100 rounded-full text-green-600 text-center mr-2">1</span> 代码审查：定期进行代码审查，确保遵循设计原则</li>
                        <li><span className="inline-block w-6 h-6 bg-green-100 rounded-full text-green-600 text-center mr-2">2</span> 重构：持续重构代码，消除违反原则的地方</li>
                        <li><span className="inline-block w-6 h-6 bg-green-100 rounded-full text-green-600 text-center mr-2">3</span> 培训：对团队成员进行设计原则培训</li>
                        <li><span className="inline-block w-6 h-6 bg-green-100 rounded-full text-green-600 text-center mr-2">4</span> 工具：使用静态代码分析工具检查代码质量</li>
                        <li><span className="inline-block w-6 h-6 bg-green-100 rounded-full text-green-600 text-center mr-2">5</span> 文档：建立设计原则文档和最佳实践指南</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-purple-500">
                  <h3 className="text-xl font-semibold mb-3">3. 设计原则和设计模式的关系是什么？</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded border">
                      <h4 className="font-semibold mb-2 text-purple-600">关系说明：</h4>
                      <ul className="list-disc pl-5 text-gray-600">
                        <li><span className="inline-block w-6 h-6 bg-purple-100 rounded-full text-purple-600 text-center mr-2">1</span> 设计原则是指导思想，设计模式是具体实现</li>
                        <li><span className="inline-block w-6 h-6 bg-purple-100 rounded-full text-purple-600 text-center mr-2">2</span> 设计模式通常遵循一个或多个设计原则</li>
                        <li><span className="inline-block w-6 h-6 bg-purple-100 rounded-full text-purple-600 text-center mr-2">3</span> 设计原则帮助我们评估设计模式的使用是否合理</li>
                        <li><span className="inline-block w-6 h-6 bg-purple-100 rounded-full text-purple-600 text-center mr-2">4</span> 设计模式帮助我们实现设计原则的要求</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'practice' && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">实战问题</h2>
            <div className="prose max-w-none">
              <div className="space-y-8">
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500">
                  <h3 className="text-xl font-semibold mb-3">1. 如何处理设计模式过度使用的问题？</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded border">
                      <h4 className="font-semibold mb-2 text-blue-600">解决方案：</h4>
                      <ul className="list-disc pl-5 text-gray-600">
                        <li><span className="inline-block w-6 h-6 bg-blue-100 rounded-full text-blue-600 text-center mr-2">1</span> 遵循YAGNI原则（You Aren't Gonna Need It）</li>
                        <li><span className="inline-block w-6 h-6 bg-blue-100 rounded-full text-blue-600 text-center mr-2">2</span> 保持代码简单，避免过度设计</li>
                        <li><span className="inline-block w-6 h-6 bg-blue-100 rounded-full text-blue-600 text-center mr-2">3</span> 根据实际需求选择合适的设计模式</li>
                        <li><span className="inline-block w-6 h-6 bg-blue-100 rounded-full text-blue-600 text-center mr-2">4</span> 定期进行代码重构和优化</li>
                        <li><span className="inline-block w-6 h-6 bg-blue-100 rounded-full text-blue-600 text-center mr-2">5</span> 建立代码审查机制</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-green-500">
                  <h3 className="text-xl font-semibold mb-3">2. 如何平衡架构设计的灵活性和复杂性？</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded border">
                      <h4 className="font-semibold mb-2 text-green-600">平衡策略：</h4>
                      <ul className="list-disc pl-5 text-gray-600">
                        <li><span className="inline-block w-6 h-6 bg-green-100 rounded-full text-green-600 text-center mr-2">1</span> 根据项目规模和复杂度选择合适的架构</li>
                        <li><span className="inline-block w-6 h-6 bg-green-100 rounded-full text-green-600 text-center mr-2">2</span> 采用渐进式架构设计方法</li>
                        <li><span className="inline-block w-6 h-6 bg-green-100 rounded-full text-green-600 text-center mr-2">3</span> 保持架构的简单性和可理解性</li>
                        <li><span className="inline-block w-6 h-6 bg-green-100 rounded-full text-green-600 text-center mr-2">4</span> 在必要时才引入复杂性</li>
                        <li><span className="inline-block w-6 h-6 bg-green-100 rounded-full text-green-600 text-center mr-2">5</span> 持续评估和调整架构设计</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-purple-500">
                  <h3 className="text-xl font-semibold mb-3">3. 如何处理架构演进过程中的技术债务？</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded border">
                      <h4 className="font-semibold mb-2 text-purple-600">处理方法：</h4>
                      <ul className="list-disc pl-5 text-gray-600">
                        <li><span className="inline-block w-6 h-6 bg-purple-100 rounded-full text-purple-600 text-center mr-2">1</span> 建立技术债务清单</li>
                        <li><span className="inline-block w-6 h-6 bg-purple-100 rounded-full text-purple-600 text-center mr-2">2</span> 制定优先级和修复计划</li>
                        <li><span className="inline-block w-6 h-6 bg-purple-100 rounded-full text-purple-600 text-center mr-2">3</span> 在迭代中逐步解决技术债务</li>
                        <li><span className="inline-block w-6 h-6 bg-purple-100 rounded-full text-purple-600 text-center mr-2">4</span> 建立预防技术债务的机制</li>
                        <li><span className="inline-block w-6 h-6 bg-purple-100 rounded-full text-purple-600 text-center mr-2">5</span> 定期进行架构评估和重构</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
      {/* 底部导航栏 */}
      <div className="mt-8 flex justify-between">
        <Link href="/study/se/architecture-design/practice" className="px-4 py-2 text-blue-600 hover:text-blue-800">← 架构与设计模式实战</Link>
        <Link href="/study/se/standards-testing" className="px-4 py-2 text-blue-600 hover:text-blue-800">开发规范与测试 →</Link>
      </div>
    </div>
  );
}
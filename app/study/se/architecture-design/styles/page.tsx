'use client';
import React, { useState } from'react';
import Link from 'next/link';

const tabList = [
  { key: 'overview', label: '概述' },
  { key: 'layered', label: '分层架构' },
  { key:'microservices', label: '微服务架构' },
  { key: 'event', label: '事件驱动架构' },
  { key: 'cs', label: 'C/S架构' },
  { key:'soa', label: 'SOA架构' },
  { key: 'pipe', label: '管道-过滤器' },
  { key: 'compare', label: '风格对比与选型' },
];

export default function ArchitectureStylesPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">主流架构风格</h1>
      {/* 顶部tab导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        {tabList.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === tab.key? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 min-h-[320px]">
        {activeTab === 'overview' && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">架构风格概述</h2>
            <div className="prose max-w-none">
              <p>架构风格（Architecture Style）是对系统结构和交互模式的高层抽象，不同风格适用于不同类型的系统和业务需求。合理选择架构风格有助于提升系统的可维护性、可扩展性和性能。</p>
              <ul className="list-disc pl-6">
                <li>分层架构（Layered Architecture）：将系统按功能划分为若干层，层与层之间存在依赖关系，每层负责特定的功能，常见的有表示层、业务逻辑层、数据访问层等。</li>
                <li>微服务架构（Microservices Architecture）：把系统拆分成多个小型、自治的服务，这些服务可以独立部署、独立开发，服务间通过轻量级的通信机制（如RESTful API）进行交互。</li>
                <li>事件驱动架构（Event-Driven Architecture, EDA）：通过事件来触发和协调系统组件之间的交互，组件之间解耦度高，常用消息队列或事件总线来实现异步通信。</li>
                <li>客户端-服务器架构（Client-Server, C/S）：系统分为客户端和服务器端，客户端负责用户界面和交互，服务器端负责数据处理和存储，两者通过网络进行通信。</li>
                <li>面向服务架构（SOA）：将系统功能封装成服务，服务之间通过标准协议（如SOAP、REST）进行通信，强调服务的复用性和松耦合。</li>
                <li>管道-过滤器架构（Pipe and Filter）：系统由一系列过滤器和管道组成，数据通过管道在过滤器之间流动，每个过滤器对数据进行特定的处理。</li>
                <li>单体架构与分布式架构：单体架构是将整个系统作为一个整体进行开发和部署；分布式架构则是将系统拆分成多个部分，分布在不同的节点上运行。</li>
              </ul>
              <p>每种架构风格都有其适用场景、优缺点和典型案例，实际项目中常常结合多种风格进行混合应用。</p>
            </div>
          </section>
        )}
        {activeTab === 'layered' && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">分层架构（Layered Architecture）</h2>
            <div className="prose max-w-none">
              <p>分层架构将系统划分为若干层，每层负责不同的功能，常见三层/四层结构：表示层、业务逻辑层、数据访问层、数据库层。</p>
              <div className="flex justify-center my-6">
                <svg width="400" height="180" viewBox="0 0 400 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="50" y="20" width="300" height="35" fill="#e3e8f7" stroke="#3b82f6" strokeWidth="2" rx="8"/>
                  <text x="200" y="43" textAnchor="middle" fontSize="16" fill="#1e293b">表示层（UI）</text>
                  <rect x="50" y="65" width="300" height="35" fill="#f1f5f9" stroke="#3b82f6" strokeWidth="2" rx="8"/>
                  <text x="200" y="88" textAnchor="middle" fontSize="16" fill="#1e293b">业务逻辑层（BLL）</text>
                  <rect x="50" y="110" width="300" height="35" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" rx="8"/>
                  <text x="200" y="133" textAnchor="middle" fontSize="16" fill="#1e293b">数据访问层（DAL）</text>
                  <rect x="50" y="155" width="300" height="20" fill="#fef9c3" stroke="#f59e42" strokeWidth="2" rx="8"/>
                  <text x="200" y="170" textAnchor="middle" fontSize="14" fill="#92400e">数据库</text>
                  <line x1="200" y1="55" x2="200" y2="65" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
                  <line x1="200" y1="100" x2="200" y2="110" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
                  <line x1="200" y1="145" x2="200" y2="155" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
                  <defs>
                    <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto" markerUnits="strokeWidth">
                      <path d="M0,0 L10,5 L0,10 L3,5 Z" fill="#64748b" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <ul className="list-disc pl-6">
                <li><b>优点：</b>结构清晰，职责分明，易于维护和扩展；每层可以独立开发、测试和部署，降低了系统的复杂性；支持复用，比如业务逻辑层的代码可以在不同的表示层中复用。</li>
                <li><b>缺点：</b>层间调用可能影响性能，因为数据需要在不同层之间传递，增加了调用的开销；过度分层会增加复杂性，导致开发和维护成本上升；层与层之间的紧密依赖关系可能会限制系统的灵活性和可扩展性。</li>
                <li><b>典型应用：</b>Web应用、企业信息系统，如银行的核心业务系统，通过分层架构可以将用户界面、业务处理和数据存储分开，便于团队协作和系统维护。</li>
              </ul>
              <pre className="bg-gray-100 p-4 rounded mb-4 text-xs overflow-x-auto">
{`// 伪代码：三层架构调用流程
const user = uiLayer.handleLogin(request);
// UI层 -> BLL层 -> DAL层
`}
              </pre>
            </div>
          </section>
        )}
        {activeTab ==='microservices' && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">微服务架构（Microservices Architecture）</h2>
            <div className="prose max-w-none">
              <p>微服务架构将系统拆分为多个小型、自治的服务，每个服务独立部署、独立开发，服务间通过API通信。</p>
              <div className="flex justify-center my-6">
                <svg width="400" height="180" viewBox="0 0 400 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="30" y="30" width="80" height="40" fill="#e3e8f7" stroke="#3b82f6" strokeWidth="2" rx="8"/>
                  <text x="70" y="55" textAnchor="middle" fontSize="14" fill="#1e293b">服务A</text>
                  <rect x="160" y="30" width="80" height="40" fill="#f1f5f9" stroke="#3b82f6" strokeWidth="2" rx="8"/>
                  <text x="200" y="55" textAnchor="middle" fontSize="14" fill="#1e293b">服务B</text>
                  <rect x="290" y="30" width="80" height="40" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" rx="8"/>
                  <text x="330" y="55" textAnchor="middle" fontSize="14" fill="#1e293b">服务C</text>
                  <rect x="115" y="110" width="170" height="40" fill="#fef9c3" stroke="#f59e42" strokeWidth="2" rx="8"/>
                  <text x="200" y="135" textAnchor="middle" fontSize="14" fill="#92400e">API网关</text>
                  <line x1="70" y1="70" x2="200" y2="110" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
                  <line x1="200" y1="70" x2="200" y2="110" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
                  <line x1="330" y1="70" x2="200" y2="110" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
                  <defs>
                    <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto" markerUnits="strokeWidth">
                      <path d="M0,0 L10,5 L0,10 L3,5 Z" fill="#64748b" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <ul className="list-disc pl-6">
                <li><b>优点：</b>高可扩展性，可以根据业务需求独立扩展单个服务；易于独立部署，每个服务可以独立进行部署和更新，不影响其他服务；技术异构，不同的服务可以根据需求选择不同的技术栈；容错性好，一个服务的故障不会影响整个系统的运行。</li>
                <li><b>缺点：</b>分布式复杂性高，需要处理服务间的通信、协调和一致性问题；运维成本大，需要管理多个服务的部署、监控和维护；服务间通信延迟，因为服务间通过网络通信，可能会存在延迟和网络故障的问题。</li>
                <li><b>典型应用：</b>大型互联网平台，如电商平台，将用户管理、商品管理、订单管理等功能拆分成不同的微服务，便于团队并行开发和系统扩展；云原生应用，利用微服务架构实现快速部署和弹性伸缩。</li>
              </ul>
              <pre className="bg-gray-100 p-4 rounded mb-4 text-xs overflow-x-auto">
{`// 微服务间RESTful通信示例
// Service A
fetch('http://service-b/api/user/123')
 .then(res => res.json())
 .then(data => console.log(data));
`}
              </pre>
            </div>
          </section>
        )}
        {activeTab === 'event' && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">事件驱动架构（Event-Driven Architecture, EDA）</h2>
            <div className="prose max-w-none">
              <p>事件驱动架构通过事件进行系统内各组件的解耦，常用消息队列或事件总线实现异步通信。</p>
              <div className="flex justify-center my-6">
                <svg width="400" height="120" viewBox="0 0 400 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="30" y="40" width="100" height="40" fill="#e3e8f7" stroke="#3b82f6" strokeWidth="2" rx="8"/>
                  <text x="80" y="65" textAnchor="middle" fontSize="14" fill="#1e293b">事件生产者</text>
                  <rect x="150" y="10" width="100" height="40" fill="#f1f5f9" stroke="#3b82f6" strokeWidth="2" rx="8"/>
                  <text x="200" y="35" textAnchor="middle" fontSize="14" fill="#1e293b">事件总线</text>
                  <rect x="150" y="70" width="100" height="40" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" rx="8"/>
                  <text x="200" y="95" textAnchor="middle" fontSize="14" fill="#1e293b">消息队列</text>
                  <rect x="270" y="40" width="100" height="40" fill="#fef9c3" stroke="#f59e42" strokeWidth="2" rx="8"/>
                  <text x="320" y="65" textAnchor="middle" fontSize="14" fill="#92400e">事件消费者</text>
                  <line x1="130" y1="60" x2="150" y2="30" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
                  <line x1="130" y1="60" x2="150" y2="90" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
                  <line x1="250" y1="30" x2="270" y2="60" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
                  <line x1="250" y1="90" x2="270" y2="60" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
                  <defs>
                    <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto" markerUnits="strokeWidth">
                      <path d="M0,0 L10,5 L0,10 L3,5 Z" fill="#64748b" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <ul className="list-disc pl-6">
                <li><b>优点：</b>高解耦，组件之间通过事件进行通信，降低了组件之间的耦合度；异步处理，能够提高系统的响应速度和吞吐量；易于扩展，可以方便地添加新的事件生产者和消费者。</li>
                <li><b>缺点：</b>调试复杂，由于事件的异步性和分布式特性，调试和排查问题比较困难；事件顺序和一致性难以保证，可能导致数据不一致或重复处理。</li>
                <li><b>缺点：</b>调试复杂，由于事件的异步性和分布式特性，调试和排查问题比较困难；事件顺序和一致性难以保证，在分布式环境中，多个事件的处理顺序和一致性可能会受到网络延迟和故障的影响；系统复杂度增加，需要引入消息队列或事件总线等中间件，增加了系统的复杂度和运维成本。</li>
                <li><b>典型应用：</b>订单系统，当订单状态发生变化时，通过发布事件通知库存、物流等相关系统进行相应的处理；实时数据处理，如金融交易系统，通过事件驱动架构实现实时数据的采集、处理和分析；消息推送系统，如社交平台的消息推送，通过事件驱动架构实现消息的异步推送。</li>
              </ul>
              <pre className="bg-gray-100 p-4 rounded mb-4 text-xs overflow-x-auto">
{`// 事件驱动伪代码
// 生产者
emit('order_created', { orderId: 123 });
// 消费者
on('order_created', (event) => {
  processOrder(event.orderId);
});
`}
              </pre>
            </div>
          </section>
        )}
        {activeTab === 'cs' && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">客户端-服务器架构（C/S）</h2>
            <div className="prose max-w-none">
              <p>C/S架构将系统分为客户端和服务器端，客户端负责用户交互，服务器端负责数据处理和存储。</p>
              <div className="flex justify-center my-6">
                <svg width="400" height="100" viewBox="0 0 400 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="60" y="30" width="100" height="40" fill="#e3e8f7" stroke="#3b82f6" strokeWidth="2" rx="8"/>
                  <text x="110" y="55" textAnchor="middle" fontSize="14" fill="#1e293b">客户端</text>
                  <rect x="240" y="30" width="100" height="40" fill="#f1f5f9" stroke="#3b82f6" strokeWidth="2" rx="8"/>
                  <text x="290" y="55" textAnchor="middle" fontSize="14" fill="#1e293b">服务器端</text>
                  <line x1="160" y1="50" x2="240" y2="50" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
                  <defs>
                    <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto" markerUnits="strokeWidth">
                      <path d="M0,0 L10,5 L0,10 L3,5 Z" fill="#64748b" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <ul className="list-disc pl-6">
                <li><b>优点：</b>结构简单，易于实现，适合小型系统和局域网应用；响应速度快，客户端和服务器直接通信，减少了中间环节的延迟；可以充分利用客户端的资源，如处理能力、存储空间等。</li>
                <li><b>缺点：</b>扩展性有限，随着用户数量的增加，服务器的负载会逐渐加重，扩展能力有限；客户端升级维护成本高，当系统需要升级时，需要更新所有客户端的软件；安全性较低，客户端直接与服务器通信，容易受到网络攻击。</li>
                <li><b>典型应用：</b>桌面软件，如办公软件、图形处理软件等；局域网管理系统，如企业内部的文件共享系统、考勤管理系统等。</li>
              </ul>
              <pre className="bg-gray-100 p-4 rounded mb-4 text-xs overflow-x-auto">
{`// C/S通信伪代码
// 客户端
socket.send('GET /data');
// 服务器端
socket.on('data', (req) => {
  socket.send(fetchData(req));
});
`}
              </pre>
            </div>
          </section>
        )}
        {activeTab ==='soa' && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">面向服务架构（SOA）</h2>
            <div className="prose max-w-none">
              <p>SOA通过服务将系统功能进行封装，服务之间通过标准协议（如SOAP、REST）通信，强调服务复用和松耦合。</p>
              <div className="flex justify-center my-6">
                <svg width="400" height="120" viewBox="0 0 400 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="30" y="50" width="80" height="40" fill="#e3e8f7" stroke="#3b82f6" strokeWidth="2" rx="8"/>
                  <text x="70" y="75" textAnchor="middle" fontSize="14" fill="#1e293b">服务A</text>
                  <rect x="160" y="20" width="80" height="40" fill="#f1f5f9" stroke="#3b82f6" strokeWidth="2" rx="8"/>
                  <text x="200" y="45" textAnchor="middle" fontSize="14" fill="#1e293b">服务总线</text>
                  <rect x="160" y="80" width="80" height="40" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" rx="8"/>
                  <text x="200" y="105" textAnchor="middle" fontSize="14" fill="#1e293b">服务注册中心</text>
                  <rect x="290" y="50" width="80" height="40" fill="#fef9c3" stroke="#f59e42" strokeWidth="2" rx="8"/>
                  <text x="330" y="75" textAnchor="middle" fontSize="14" fill="#92400e">服务B</text>
                  <line x1="110" y1="70" x2="160" y2="40" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
                  <line x1="110" y1="70" x2="160" y2="100" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
                  <line x1="240" y1="40" x2="290" y2="70" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
                  <line x1="240" y1="100" x2="290" y2="70" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
                  <defs>
                    <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto" markerUnits="strokeWidth">
                      <path d="M0,0 L10,5 L0,10 L3,5 Z" fill="#64748b" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <ul className="list-disc pl-6">
                <li><b>优点：</b>服务复用，通过服务的封装和共享，可以提高代码的复用率；松耦合，服务之间通过标准接口通信，降低了服务之间的依赖；易于集成，能够方便地集成不同技术栈的系统和服务；支持业务流程重组，通过服务的组合和编排，可以快速响应业务需求的变化。</li>
                <li><b>缺点：</b>服务治理复杂，需要管理大量的服务，包括服务的注册、发现、监控等；性能开销大，服务间的通信需要通过网络，增加了系统的延迟；开发和运维成本高，需要专门的团队和工具来管理和维护SOA系统。</li>
                <li><b>典型应用：</b>企业级集成平台，如银行的核心业务系统，通过SOA架构将不同的业务系统集成在一起；跨系统集成，如政府部门之间的数据共享平台，通过SOA架构实现不同部门系统之间的数据交换和业务协同。</li>
              </ul>
              <pre className="bg-gray-100 p-4 rounded mb-4 text-xs overflow-x-auto">
{`// SOA服务调用伪代码
// 服务A
serviceBus.call('ServiceB.doSomething', params);
`}
              </pre>
            </div>
          </section>
        )}
        {activeTab === 'pipe' && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">管道-过滤器架构（Pipe and Filter）</h2>
            <div className="prose max-w-none">
              <p>管道-过滤器架构将系统处理过程分为多个独立的过滤器，每个过滤器完成特定功能，数据通过管道在过滤器间流动。</p>
              <div className="flex justify-center my-6">
                <svg width="400" height="80" viewBox="0 0 400 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="30" y="20" width="60" height="40" fill="#e3e8f7" stroke="#3b82f6" strokeWidth="2" rx="8"/>
                  <text x="60" y="45" textAnchor="middle" fontSize="14" fill="#1e293b">输入</text>
                  <rect x="110" y="20" width="60" height="40" fill="#f1f5f9" stroke="#3b82f6" strokeWidth="2" rx="8"/>
                  <text x="140" y="45" textAnchor="middle" fontSize="14" fill="#1e293b">过滤器1</text>
                  <rect x="190" y="20" width="60" height="40" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" rx="8"/>
                  <text x="220" y="45" textAnchor="middle" fontSize="14" fill="#1e293b">过滤器2</text>
                  <rect x="270" y="20" width="60" height="40" fill="#fef9c3" stroke="#f59e42" strokeWidth="2" rx="8"/>
                  <text x="300" y="45" textAnchor="middle" fontSize="14" fill="#92400e">输出</text>
                  <line x1="90" y1="40" x2="110" y2="40" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
                  <line x1="170" y1="40" x2="190" y2="40" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
                  <line x1="250" y1="40" x2="270" y2="40" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)"/>
                  <defs>
                    <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto" markerUnits="strokeWidth">
                      <path d="M0,0 L10,5 L0,10 L3,5 Z" fill="#64748b" />
                    </marker>
                  </defs>
                </svg>
              </div>
              <ul className="list-disc pl-6">
                <li><b>优点：</b>易于扩展和重用，每个过滤器都是独立的，可以方便地添加、删除或替换过滤器；支持并行处理，多个过滤器可以并行处理数据，提高系统的性能；便于维护和测试，每个过滤器可以独立进行测试和维护，降低了系统的复杂度。</li>
                <li><b>缺点：</b>数据格式转换复杂，每个过滤器可能需要处理不同的数据格式，增加了数据转换的复杂度；调试困难，由于数据在多个过滤器之间流动，当出现问题时，难以确定问题所在的过滤器；不适合处理复杂的控制流，对于需要复杂控制逻辑的系统，管道-过滤器架构可能不够灵活。</li>
                <li><b>典型应用：</b>编译器，编译器的前端处理过程通常采用管道-过滤器架构，包括词法分析、语法分析、语义分析等阶段；数据处理流水线，如ETL（提取、转换、加载）工具，将数据从源系统提取出来，经过一系列的转换处理，最终加载到目标系统中。</li>
              </ul>
              <pre className="bg-gray-100 p-4 rounded mb-4 text-xs overflow-x-auto">
{`// 管道-过滤器伪代码
let data = input;
data = filter1(data);
data = filter2(data);
output(data);
`}
              </pre>
            </div>
          </section>
        )}
        {activeTab === 'compare' && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">风格对比与选型建议</h2>
            <div className="prose max-w-none">
              <table className="table-auto w-full text-sm border mt-4">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border px-2 py-1">架构风格</th>
                    <th className="border px-2 py-1">优点</th>
                    <th className="border px-2 py-1">缺点</th>
                    <th className="border px-2 py-1">典型场景</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-2 py-1">分层架构</td>
                    <td className="border px-2 py-1">结构清晰、易维护、职责分明，每层可独立开发、测试和部署，支持代码复用</td>
                    <td className="border px-2 py-1">层间调用可能影响性能，过度分层会增加复杂性，层间依赖可能限制灵活性</td>
                    <td className="border px-2 py-1">Web应用、企业系统，如银行核心业务系统</td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1">微服务架构</td>
                    <td className="border px-2 py-1">高可扩展、独立部署、容错性好，支持技术异构，便于团队并行开发</td>
                    <td className="border px-2 py-1">分布式复杂、运维成本高，服务间通信延迟，服务协调和一致性挑战大</td>
                    <td className="border px-2 py-1">大型互联网平台，如电商平台、云原生应用</td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1">事件驱动架构</td>
                    <td className="border px-2 py-1">高解耦、异步处理、可扩展性好，适合实时数据处理和消息推送</td>
                    <td className="border px-2 py-1">调试复杂、事件顺序和一致性难保证，系统复杂度增加，需要中间件支持</td>
                    <td className="border px-2 py-1">实时数据处理、消息推送，如金融交易系统、社交平台消息推送</td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1">C/S架构</td>
                    <td className="border px-2 py-1">实现简单、适合局域网，响应速度快，可充分利用客户端资源</td>
                    <td className="border px-2 py-1">扩展性差、升级维护难，客户端需要安装和维护，安全性较低</td>
                    <td className="border px-2 py-1">桌面软件、局域网系统，如办公软件、企业内部管理系统</td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1">SOA架构</td>
                    <td className="border px-2 py-1">服务复用、松耦合、易于集成，支持业务流程重组，适合企业级系统集成</td>
                    <td className="border px-2 py-1">治理复杂、性能开销大，开发和运维成本高，需要专门的服务治理机制</td>
                    <td className="border px-2 py-1">企业集成平台，如银行核心业务系统、政府部门数据共享平台</td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1">管道-过滤器</td>
                    <td className="border px-2 py-1">易扩展、支持并行处理，便于维护和测试，适合数据处理流水线</td>
                    <td className="border px-2 py-1">调试难、数据格式转换复杂，不适合复杂控制流，需要统一的数据格式</td>
                    <td className="border px-2 py-1">编译器、数据处理，如ETL工具、媒体处理系统</td>
                  </tr>
                </tbody>
              </table>
              <h3 className="text-xl font-semibold mt-6 mb-3">选型建议</h3>
              <ul className="list-disc pl-6">
                <li>根据业务规模、团队能力、技术栈选择合适的架构风格。小型项目可选单体或分层架构，大型项目推荐微服务或SOA。</li>
                <li>实时性要求高可选事件驱动，数据处理可选管道-过滤器。</li>
                <li>考虑系统的可扩展性、可维护性、性能和安全性等质量属性。</li>
                <li>实际项目常常采用多种风格混合，如微服务架构中可能包含事件驱动的组件，分层架构中可能有部分功能采用微服务方式实现。</li>
                <li>考虑团队的技术能力和经验，选择团队熟悉的架构风格可以降低开发难度和风险。</li>
                <li>考虑系统的演进和扩展需求，选择具有良好扩展性的架构风格可以更好地适应业务的变化。</li>
                <li>权衡架构的复杂性和收益，避免过度设计，选择最适合项目需求的架构风格。</li>
              </ul>
              <h3 className="text-xl font-semibold mt-6 mb-3">架构评估标准</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">功能性需求</h4>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>系统规模和复杂度</li>
                    <li>功能模块的划分和依赖关系</li>
                    <li>业务流程的复杂度</li>
                    <li>数据处理的规模和复杂度</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">非功能性需求</h4>
                  <ul className="list-disc pl-5 text-gray-600">
                    <li>性能和可扩展性</li>
                    <li>可用性和容错性</li>
                    <li>安全性</li>
                    <li>可维护性和可测试性</li>
                    <li>成本和资源限制</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
      {/* 底部导航栏 */}
      <div className="mt-8 flex justify-between">
        <Link href="/study/se/architecture-design/basic" className="px-4 py-2 text-blue-600 hover:text-blue-800">← 软件架构基础</Link>
        <Link href="/study/se/architecture-design/patterns" className="px-4 py-2 text-blue-600 hover:text-blue-800">常用设计模式 →</Link>
      </div>
    </div>
  );
}
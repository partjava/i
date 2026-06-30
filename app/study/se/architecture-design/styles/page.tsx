'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '主流架构风格',
  chapterNumber: 2,
  totalChapters: 5,
  subjectHref: '/study/se/architecture-design',
  prevChapter: { label: '软件架构基础', href: '/study/se/architecture-design/basic' },
  nextChapter: { label: '常用设计模式', href: '/study/se/architecture-design/patterns' },
  theme: THEMES.software,
}

const restfulCode = `// 微服务间RESTful通信示例
// Service A
fetch('http://service-b/api/user/123')
 .then(res => res.json())
 .then(data => console.log(data));`

const eventCode = `// 事件驱动伪代码
// 生产者
emit('order_created', { orderId: 123 });
// 消费者
on('order_created', (event) => {
  processOrder(event.orderId);
});`

const csCode = `// C/S通信伪代码
// 客户端
socket.send('GET /data');
// 服务器端
socket.on('data', (req) => {
  socket.send(fetchData(req));
});`

const soaCode = `// SOA服务调用伪代码
// 服务A
serviceBus.call('ServiceB.doSomething', params);`

const pipeCode = `// 管道-过滤器伪代码
let data = input;
data = filter1(data);
data = filter2(data);
output(data);`

const SPREADS = [
  // ===== 跨页 1: 架构风格概述 =====
  {
    label: '风格概述',
    left: (
      <div className="space-y-4">
        <PageTitle>架构风格概述</PageTitle>
        <BookParagraph>
          架构风格（Architecture Style）是对系统结构和交互模式的高层抽象，不同风格适用于不同类型的系统和业务需求。合理选择架构风格有助于提升系统的可维护性、可扩展性和性能。
        </BookParagraph>
        <SectionTitle>常见架构风格</SectionTitle>
        <BookList items={[
          '分层架构（Layered Architecture）：将系统按功能划分为若干层，层与层之间存在依赖关系，每层负责特定的功能',
          '微服务架构（Microservices Architecture）：把系统拆分成多个小型、自治的服务，可独立部署、独立开发',
          '事件驱动架构（Event-Driven Architecture, EDA）：通过事件来触发和协调系统组件之间的交互',
          '客户端-服务器架构（Client-Server, C/S）：系统分为客户端和服务器端，通过网络进行通信',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>更多架构风格</PageTitle>
        <BookList items={[
          '面向服务架构（SOA）：将系统功能封装成服务，服务间通过标准协议（如SOAP、REST）进行通信',
          '管道-过滤器架构（Pipe and Filter）：由一系列过滤器和管道组成，数据依次流经各个过滤器',
          '单体架构：将整个系统作为一个整体进行开发和部署',
          '分布式架构：将系统拆分成多个部分，分布在不同的节点上运行',
        ]} />
        <BookParagraph>
          每种架构风格都有其适用场景、优缺点和典型案例，实际项目中常常结合多种风格进行混合应用。
        </BookParagraph>
      </div>
    ),
  },

  // ===== 跨页 2: 分层架构 =====
  {
    label: '分层架构',
    left: (
      <div className="space-y-4">
        <PageTitle>分层架构（Layered Architecture）</PageTitle>
        <BookParagraph>分层架构将系统划分为若干层，每层负责不同的功能，常见三层/四层结构：表示层、业务逻辑层、数据访问层、数据库层。</BookParagraph>
        <div className="flex justify-center my-4">
          <svg width="360" height="170" viewBox="0 0 360 170" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="30" y="15" width="300" height="30" fill="#e3e8f7" stroke="#3b82f6" strokeWidth="2" rx="8"/>
            <text x="180" y="35" textAnchor="middle" fontSize="14" fill="#1e293b">表示层（UI）</text>
            <rect x="30" y="55" width="300" height="30" fill="#f1f5f9" stroke="#3b82f6" strokeWidth="2" rx="8"/>
            <text x="180" y="75" textAnchor="middle" fontSize="14" fill="#1e293b">业务逻辑层（BLL）</text>
            <rect x="30" y="95" width="300" height="30" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" rx="8"/>
            <text x="180" y="115" textAnchor="middle" fontSize="14" fill="#1e293b">数据访问层（DAL）</text>
            <rect x="30" y="135" width="300" height="25" fill="#fef9c3" stroke="#f59e42" strokeWidth="2" rx="8"/>
            <text x="180" y="152" textAnchor="middle" fontSize="13" fill="#92400e">数据库</text>
            <line x1="180" y1="45" x2="180" y2="55" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow3)"/>
            <line x1="180" y1="85" x2="180" y2="95" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow3)"/>
            <line x1="180" y1="125" x2="180" y2="135" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow3)"/>
            <defs>
              <marker id="arrow3" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L10,5 L0,10 L3,5 Z" fill="#64748b" />
              </marker>
            </defs>
          </svg>
        </div>
        <BookCode language="bash" code={`// 伪代码：三层架构调用流程
const user = uiLayer.handleLogin(request);
// UI层 -> BLL层 -> DAL层`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>分层架构评估</PageTitle>
        <SectionTitle>优点</SectionTitle>
        <BookList items={[
          '结构清晰，职责分明，易于维护和扩展',
          '每层可以独立开发、测试和部署，降低了系统的复杂性',
          '支持复用，业务逻辑层代码可以在不同的表示层中复用',
        ]} />
        <SectionTitle>缺点</SectionTitle>
        <BookList items={[
          '层间调用可能影响性能，数据需要在不同层之间传递',
          '过度分层会增加复杂性，导致开发和维护成本上升',
          '层间紧密依赖可能限制系统的灵活性和可扩展性',
        ]} />
        <SectionTitle>典型应用</SectionTitle>
        <BookParagraph>Web应用、企业信息系统，如银行的核心业务系统，通过分层架构可以将用户界面、业务处理和数据存储分开，便于团队协作和系统维护。</BookParagraph>
      </div>
    ),
  },

  // ===== 跨页 3: 微服务架构 =====
  {
    label: '微服务架构',
    left: (
      <div className="space-y-4">
        <PageTitle>微服务架构（Microservices）</PageTitle>
        <BookParagraph>微服务架构将系统拆分为多个小型、自治的服务，每个服务独立部署、独立开发，服务间通过API通信。</BookParagraph>
        <div className="flex justify-center my-4">
          <svg width="360" height="170" viewBox="0 0 360 170" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="25" width="80" height="35" fill="#e3e8f7" stroke="#3b82f6" strokeWidth="2" rx="8"/>
            <text x="60" y="48" textAnchor="middle" fontSize="13" fill="#1e293b">服务A</text>
            <rect x="140" y="25" width="80" height="35" fill="#f1f5f9" stroke="#3b82f6" strokeWidth="2" rx="8"/>
            <text x="180" y="48" textAnchor="middle" fontSize="13" fill="#1e293b">服务B</text>
            <rect x="260" y="25" width="80" height="35" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" rx="8"/>
            <text x="300" y="48" textAnchor="middle" fontSize="13" fill="#1e293b">服务C</text>
            <rect x="95" y="105" width="170" height="35" fill="#fef9c3" stroke="#f59e42" strokeWidth="2" rx="8"/>
            <text x="180" y="128" textAnchor="middle" fontSize="13" fill="#92400e">API网关</text>
            <line x1="60" y1="60" x2="180" y2="105" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow4)"/>
            <line x1="180" y1="60" x2="180" y2="105" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow4)"/>
            <line x1="300" y1="60" x2="180" y2="105" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow4)"/>
            <defs>
              <marker id="arrow4" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L10,5 L0,10 L3,5 Z" fill="#64748b" />
              </marker>
            </defs>
          </svg>
        </div>
        <BookCode language="js" code={restfulCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>微服务架构评估</PageTitle>
        <SectionTitle>优点</SectionTitle>
        <BookList items={[
          '高可扩展性，可以根据业务需求独立扩展单个服务',
          '易于独立部署，每个服务可以独立进行部署和更新',
          '技术异构，不同的服务可以根据需求选择不同的技术栈',
          '容错性好，一个服务的故障不会影响整个系统的运行',
        ]} />
        <SectionTitle>缺点</SectionTitle>
        <BookList items={[
          '分布式复杂性高，需要处理服务间的通信、协调和一致性问题',
          '运维成本大，需要管理多个服务的部署、监控和维护',
          '服务间通信延迟，因为服务间通过网络通信',
        ]} />
        <SectionTitle>典型应用</SectionTitle>
        <BookParagraph>大型互联网平台，如电商平台，将用户管理、商品管理、订单管理等功能拆分成不同的微服务，便于团队并行开发和系统扩展。云原生应用，利用微服务架构实现快速部署和弹性伸缩。</BookParagraph>
      </div>
    ),
  },

  // ===== 跨页 4: 事件驱动架构 =====
  {
    label: '事件驱动架构',
    left: (
      <div className="space-y-4">
        <PageTitle>事件驱动架构（EDA）</PageTitle>
        <BookParagraph>事件驱动架构通过事件进行系统内各组件的解耦，常用消息队列或事件总线实现异步通信。</BookParagraph>
        <div className="flex justify-center my-4">
          <svg width="360" height="120" viewBox="0 0 360 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="40" width="90" height="40" fill="#e3e8f7" stroke="#3b82f6" strokeWidth="2" rx="8"/>
            <text x="65" y="65" textAnchor="middle" fontSize="13" fill="#1e293b">事件生产者</text>
            <rect x="135" y="10" width="90" height="35" fill="#f1f5f9" stroke="#3b82f6" strokeWidth="2" rx="8"/>
            <text x="180" y="33" textAnchor="middle" fontSize="13" fill="#1e293b">事件总线</text>
            <rect x="135" y="70" width="90" height="35" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" rx="8"/>
            <text x="180" y="93" textAnchor="middle" fontSize="13" fill="#1e293b">消息队列</text>
            <rect x="250" y="40" width="90" height="40" fill="#fef9c3" stroke="#f59e42" strokeWidth="2" rx="8"/>
            <text x="295" y="65" textAnchor="middle" fontSize="13" fill="#92400e">事件消费者</text>
            <line x1="110" y1="60" x2="135" y2="28" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow5)"/>
            <line x1="110" y1="60" x2="135" y2="88" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow5)"/>
            <line x1="225" y1="28" x2="250" y2="60" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow5)"/>
            <line x1="225" y1="88" x2="250" y2="60" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow5)"/>
            <defs>
              <marker id="arrow5" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L10,5 L0,10 L3,5 Z" fill="#64748b" />
              </marker>
            </defs>
          </svg>
        </div>
        <BookCode language="js" code={eventCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>EDA评估</PageTitle>
        <SectionTitle>优点</SectionTitle>
        <BookList items={[
          '高解耦，组件之间通过事件进行通信，降低了耦合度',
          '异步处理，能够提高系统的响应速度和吞吐量',
          '易于扩展，可以方便地添加新的事件生产者和消费者',
        ]} />
        <SectionTitle>缺点</SectionTitle>
        <BookList items={[
          '调试复杂，由于事件的异步性和分布式特性，调试和排查问题比较困难',
          '事件顺序和一致性难以保证，可能导致数据不一致或重复处理',
          '系统复杂度增加，需要引入消息队列或事件总线等中间件',
        ]} />
        <SectionTitle>典型应用</SectionTitle>
        <BookParagraph>订单系统，当订单状态发生变化时，通过发布事件通知库存、物流等相关系统。实时数据处理，如金融交易系统。消息推送系统，如社交平台的消息推送。</BookParagraph>
      </div>
    ),
  },

  // ===== 跨页 5: C/S + SOA =====
  {
    label: 'C/S与SOA',
    left: (
      <div className="space-y-4">
        <PageTitle>客户端-服务器架构（C/S）</PageTitle>
        <BookParagraph>C/S架构将系统分为客户端和服务器端，客户端负责用户交互，服务器端负责数据处理和存储。</BookParagraph>
        <div className="flex justify-center my-3">
          <svg width="300" height="80" viewBox="0 0 300 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="40" y="20" width="90" height="35" fill="#e3e8f7" stroke="#3b82f6" strokeWidth="2" rx="8"/>
            <text x="85" y="43" textAnchor="middle" fontSize="13" fill="#1e293b">客户端</text>
            <rect x="170" y="20" width="90" height="35" fill="#f1f5f9" stroke="#3b82f6" strokeWidth="2" rx="8"/>
            <text x="215" y="43" textAnchor="middle" fontSize="13" fill="#1e293b">服务器端</text>
            <line x1="130" y1="38" x2="170" y2="38" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow6)"/>
            <defs>
              <marker id="arrow6" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L10,5 L0,10 L3,5 Z" fill="#64748b" />
              </marker>
            </defs>
          </svg>
        </div>
        <SectionTitle>优点</SectionTitle>
        <BookList items={[
          '结构简单，易于实现，适合小型系统和局域网应用',
          '响应速度快，客户端和服务器直接通信',
          '可以充分利用客户端的资源',
        ]} />
        <SectionTitle>缺点</SectionTitle>
        <BookList items={[
          '扩展性有限，随着用户数量增加，服务器负载加重',
          '客户端升级维护成本高',
          '安全性较低，客户端直接与服务器通信',
        ]} />
        <SectionTitle>典型应用</SectionTitle>
        <BookParagraph>桌面软件、局域网管理系统，如办公软件、企业内部的文件共享系统。</BookParagraph>
        <BookCode language="js" code={csCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>面向服务架构（SOA）</PageTitle>
        <BookParagraph>SOA通过服务将系统功能进行封装，服务之间通过标准协议（如SOAP、REST）通信，强调服务复用和松耦合。</BookParagraph>
        <div className="flex justify-center my-3">
          <svg width="340" height="110" viewBox="0 0 340 110" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="45" width="70" height="35" fill="#e3e8f7" stroke="#3b82f6" strokeWidth="2" rx="8"/>
            <text x="55" y="68" textAnchor="middle" fontSize="12" fill="#1e293b">服务A</text>
            <rect x="135" y="15" width="70" height="35" fill="#f1f5f9" stroke="#3b82f6" strokeWidth="2" rx="8"/>
            <text x="170" y="38" textAnchor="middle" fontSize="12" fill="#1e293b">服务总线</text>
            <rect x="135" y="70" width="70" height="35" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" rx="8"/>
            <text x="170" y="93" textAnchor="middle" fontSize="12" fill="#1e293b">服务注册中心</text>
            <rect x="250" y="45" width="70" height="35" fill="#fef9c3" stroke="#f59e42" strokeWidth="2" rx="8"/>
            <text x="285" y="68" textAnchor="middle" fontSize="12" fill="#92400e">服务B</text>
            <line x1="90" y1="63" x2="135" y2="33" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow7)"/>
            <line x1="90" y1="63" x2="135" y2="88" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow7)"/>
            <line x1="205" y1="33" x2="250" y2="63" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow7)"/>
            <line x1="205" y1="88" x2="250" y2="63" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow7)"/>
            <defs>
              <marker id="arrow7" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L10,5 L0,10 L3,5 Z" fill="#64748b" />
              </marker>
            </defs>
          </svg>
        </div>
        <SectionTitle>优点</SectionTitle>
        <BookList items={[
          '服务复用，通过服务的封装和共享提高代码复用率',
          '松耦合，服务之间通过标准接口通信',
          '易于集成，能够方便地集成不同技术栈的系统',
        ]} />
        <SectionTitle>缺点</SectionTitle>
        <BookList items={[
          '服务治理复杂，需要管理大量服务的注册、发现、监控',
          '性能开销大，服务间通信需要通过网络',
          '开发和运维成本高',
        ]} />
        <BookCode language="js" code={soaCode} />
      </div>
    ),
  },

  // ===== 跨页 6: 管道-过滤器 =====
  {
    label: '管道过滤器',
    left: (
      <div className="space-y-4">
        <PageTitle>管道-过滤器架构（Pipe and Filter）</PageTitle>
        <BookParagraph>管道-过滤器架构将系统处理过程分为多个独立的过滤器，每个过滤器完成特定功能，数据通过管道在过滤器间流动。</BookParagraph>
        <div className="flex justify-center my-3">
          <svg width="360" height="70" viewBox="0 0 360 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="15" width="55" height="35" fill="#e3e8f7" stroke="#3b82f6" strokeWidth="2" rx="8"/>
            <text x="47" y="38" textAnchor="middle" fontSize="12" fill="#1e293b">输入</text>
            <rect x="95" y="15" width="55" height="35" fill="#f1f5f9" stroke="#3b82f6" strokeWidth="2" rx="8"/>
            <text x="122" y="38" textAnchor="middle" fontSize="12" fill="#1e293b">过滤器1</text>
            <rect x="170" y="15" width="55" height="35" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" rx="8"/>
            <text x="197" y="38" textAnchor="middle" fontSize="12" fill="#1e293b">过滤器2</text>
            <rect x="245" y="15" width="55" height="35" fill="#fef9c3" stroke="#f59e42" strokeWidth="2" rx="8"/>
            <text x="272" y="38" textAnchor="middle" fontSize="12" fill="#92400e">输出</text>
            <rect x="320" y="15" width="25" height="35" fill="none" />
            <line x1="75" y1="33" x2="95" y2="33" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow8)"/>
            <line x1="150" y1="33" x2="170" y2="33" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow8)"/>
            <line x1="225" y1="33" x2="245" y2="33" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow8)"/>
            <defs>
              <marker id="arrow8" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L10,5 L0,10 L3,5 Z" fill="#64748b" />
              </marker>
            </defs>
          </svg>
        </div>
        <SectionTitle>优点</SectionTitle>
        <BookList items={[
          '易于扩展和重用，每个过滤器都是独立的',
          '支持并行处理，多个过滤器可以并行处理数据',
          '便于维护和测试，每个过滤器可以独立测试',
        ]} />
        <SectionTitle>缺点</SectionTitle>
        <BookList items={[
          '数据格式转换复杂，每个过滤器可能需要处理不同的数据格式',
          '调试困难，数据在多个过滤器之间流动时难以定位问题',
          '不适合处理复杂的控制流',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>管道-过滤器评估</PageTitle>
        <SectionTitle>典型应用</SectionTitle>
        <BookList items={[
          '编译器：编译器的前端处理包括词法分析、语法分析、语义分析等阶段',
          '数据处理流水线：ETL（提取、转换、加载）工具，将数据从源系统提取、转换后加载到目标系统中',
        ]} />
        <BookCode language="js" code={pipeCode} />
        <BookAlert type="info" message="管道-过滤器架构特别适合数据处理流水线场景，每个过滤器独立运行，通过标准数据格式进行通信，易于扩展和并行化。" />
      </div>
    ),
  },

  // ===== 跨页 7: 对比与选型 =====
  {
    label: '对比选型',
    left: (
      <div className="space-y-4">
        <PageTitle>风格对比</PageTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1">架构风格</th>
                <th className="border px-2 py-1">典型场景</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-2 py-1 font-medium">分层架构</td>
                <td className="border px-2 py-1">Web应用、企业系统，如银行核心业务系统</td>
              </tr>
              <tr>
                <td className="border px-2 py-1 font-medium">微服务架构</td>
                <td className="border px-2 py-1">大型互联网平台，如电商平台、云原生应用</td>
              </tr>
              <tr>
                <td className="border px-2 py-1 font-medium">事件驱动架构</td>
                <td className="border px-2 py-1">实时数据处理、消息推送，如金融交易系统</td>
              </tr>
              <tr>
                <td className="border px-2 py-1 font-medium">C/S架构</td>
                <td className="border px-2 py-1">桌面软件、局域网系统，如企业内部管理系统</td>
              </tr>
              <tr>
                <td className="border px-2 py-1 font-medium">SOA架构</td>
                <td className="border px-2 py-1">企业集成平台，如政府部门数据共享平台</td>
              </tr>
              <tr>
                <td className="border px-2 py-1 font-medium">管道-过滤器</td>
                <td className="border px-2 py-1">编译器、数据处理，如ETL工具</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>选型建议</PageTitle>
        <BookList items={[
          '根据业务规模、团队能力、技术栈选择合适的架构风格。小型项目可选单体或分层架构，大型项目推荐微服务或SOA',
          '实时性要求高可选事件驱动，数据处理可选管道-过滤器',
          '考虑系统的可扩展性、可维护性、性能和安全性等质量属性',
          '实际项目常常采用多种风格混合，如微服务架构中包含事件驱动的组件',
          '考虑团队的技术能力和经验，选择团队熟悉的架构风格可以降低风险',
          '权衡架构的复杂性和收益，避免过度设计',
        ]} />
        <SectionTitle>架构评估标准</SectionTitle>
        <BookParagraph><b>功能性需求：</b>系统规模和复杂度、功能模块的划分、业务流程复杂度、数据处理规模。</BookParagraph>
        <BookParagraph><b>非功能性需求：</b>性能和可扩展性、可用性和容错性、安全性、可维护性和可测试性、成本和资源限制。</BookParagraph>
        <BookAlert type="info" message="架构选型没有银弹。每个项目都有其独特的约束条件和目标，关键在于理解各种架构风格的优劣，结合具体场景做出合理的选择。" />
      </div>
    ),
  },
]

export default function ArchitectureStylesPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

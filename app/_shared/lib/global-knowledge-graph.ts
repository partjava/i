import { navigationItems } from '../data/navigation';

export type GlobalNodeLevel = 'hub' | 'domain' | 'subject' | 'topic';
export type MasteryStatus = 'locked' | 'learning' | 'mastered';

export interface GlobalGraphNode {
  id: string;
  name: string;
  level: GlobalNodeLevel;
  domain: string;
  subject?: string;
  code?: string;
  href?: string;
  summary: string;
  keyPoints: string[];
  prerequisites: string[];
  nextSteps: string[];
  visualizerId?: string;
  difficulty: '入门' | '进阶' | '高阶';
  symbolSize: number;
}

export interface GlobalGraphLink {
  source: string;
  target: string;
  relation: 'hierarchy' | 'prerequisite' | 'cross-domain';
  label?: string;
}

export interface LearningRoadmapTrack {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  steps: Array<{
    nodeId: string;
    name: string;
    desc: string;
    href: string;
    tag: string;
  }>;
}

export const DOMAIN_META: Record<
  string,
  { color: string; glow: string; badgeBg: string; icon: string; desc: string }
> = {
  核心枢纽: {
    color: '#6366f1',
    glow: 'rgba(99, 102, 241, 0.55)',
    badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    icon: '🌟',
    desc: 'PartJava 全栈计算机与人工智能知识星系核心枢纽',
  },
  计算机: {
    color: '#0ea5e9',
    glow: 'rgba(14, 165, 233, 0.45)',
    badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
    icon: '💻',
    desc: '编程语言底层、数据结构与算法、操作系统、计算机网络与组成原理',
  },
  人工智能: {
    color: '#8b5cf6',
    glow: 'rgba(139, 92, 246, 0.45)',
    badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
    icon: '🧠',
    desc: '机器学习、深度学习、NLP 与 Transformer 大模型、计算机视觉与强化学习',
  },
  软件工程: {
    color: '#10b981',
    glow: 'rgba(16, 185, 129, 0.45)',
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    icon: '🏗️',
    desc: 'JavaEE 企业级架构、微服务、云计算容器、大数据引擎与前端工程化',
  },
  网络安全: {
    color: '#f59e0b',
    glow: 'rgba(245, 158, 11, 0.45)',
    badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
    icon: '🛡️',
    desc: '密码学、Web 渗透防护、区块链共识机制、主机与云原生安全监控',
  },
};

/**
 * 学科级前置依赖与跨领域联动关系
 */
const SUBJECT_PREREQUISITES: Array<{
  from: string;
  to: string;
  label: string;
  type: 'prerequisite' | 'cross-domain';
}> = [
  { from: 'subj_Java', to: 'subj_数据结构与算法', label: '算法实现底座', type: 'prerequisite' },
  { from: 'subj_C++', to: 'subj_数据结构与算法', label: '高性能STL与指针', type: 'prerequisite' },
  { from: 'subj_数据结构与算法', to: 'subj_操作系统', label: '调度与内存树', type: 'prerequisite' },
  { from: 'subj_操作系统', to: 'subj_计算机网络', label: 'Socket与IO多路复用', type: 'prerequisite' },
  { from: 'subj_计算机组成原理', to: 'subj_操作系统', label: '指令流水与虚拟内存', type: 'prerequisite' },
  { from: 'subj_Java', to: 'subj_JavaEE', label: '企业级微服务进阶', type: 'cross-domain' },
  { from: 'subj_SQL学习', to: 'subj_大数据', label: '分布式存储与计算', type: 'cross-domain' },
  { from: 'subj_Linux', to: 'subj_云计算', label: 'Docker/cgroups容器底座', type: 'cross-domain' },
  { from: 'subj_Python', to: 'subj_机器学习', label: '科学计算与矩阵底座', type: 'cross-domain' },
  { from: 'subj_数据结构与算法', to: 'subj_机器学习', label: '图搜索与最优化理论', type: 'cross-domain' },
  { from: 'subj_机器学习', to: 'subj_深度学习', label: '表征学习与反向传播', type: 'prerequisite' },
  { from: 'subj_深度学习', to: 'subj_自然语言处理', label: 'Transformer自注意力', type: 'prerequisite' },
  { from: 'subj_深度学习', to: 'subj_计算机视觉', label: '卷积流形与ViT', type: 'prerequisite' },
  { from: 'subj_深度学习', to: 'subj_强化学习', label: '深度策略梯度DRL', type: 'prerequisite' },
  { from: 'subj_机器学习', to: 'subj_数据挖掘', label: '特征工程与模式发现', type: 'prerequisite' },
  { from: 'subj_机器学习', to: 'subj_推荐系统', label: '协同过滤与双塔召回', type: 'prerequisite' },
  { from: 'subj_计算机网络', to: 'subj_网络安全', label: '协议栈攻防与TLS', type: 'cross-domain' },
  { from: 'subj_密码学', to: 'subj_区块链安全', label: '零知识证明与椭圆曲线', type: 'prerequisite' },
];

const SUBJECT_VISUALIZER_MAP: Record<string, string> = {
  数据结构与算法: 'quick',
  Java: 'bubble',
  'C++': 'heap',
  Python: 'kmeans',
  机器学习: 'svm',
  深度学习: 'neural-network',
  自然语言处理: 'transformer',
  数据挖掘: 'pca',
  推荐系统: 'kmeans',
  强化学习: 'astar',
};

export const CURATED_ROADMAPS: LearningRoadmapTrack[] = [
  {
    id: 'java-backend-architect',
    title: 'Java 全栈与云原生架构师路线',
    subtitle: '从 JDK 核心语法、JVM 与并发编程，到分布式微服务与容器云原生',
    icon: '☕',
    color: '#0ea5e9',
    steps: [
      {
        nodeId: 'subj_Java',
        name: '1. Java 核心与并发编程',
        desc: '面向对象、集合框架源码、JUC 线程池与 JVM 内存模型',
        href: '/study/computer/java/intro',
        tag: '语言基石',
      },
      {
        nodeId: 'subj_数据结构与算法',
        name: '2. 数据结构与算法核心',
        desc: '红黑树/AVL树、图论最短路、动态规划与高频大厂手撕题',
        href: '/study/computer/ds/basic',
        tag: '算法内功',
      },
      {
        nodeId: 'subj_SQL学习',
        name: '3. MySQL 索引与事务调优',
        desc: 'B+ 树聚簇索引、MVCC 多版本并发控制与慢查询优化',
        href: '/study/computer/sql/intro',
        tag: '存储引擎',
      },
      {
        nodeId: 'subj_操作系统',
        name: '4. 操作系统与 Linux 内核',
        desc: '进程虚拟地址空间、epoll 多路复用与 Linux 容器隔离',
        href: '/study/computer/os/intro',
        tag: '系统底层',
      },
      {
        nodeId: 'subj_JavaEE',
        name: '5. Spring Cloud 微服务架构',
        desc: 'IOC/AOP 原理、分布式事务、服务治理与高并发网关',
        href: '/study/se/javaee/intro',
        tag: '企业架构',
      },
      {
        nodeId: 'subj_云计算',
        name: '6. Docker & Kubernetes 云原生',
        desc: '容器镜像分层、K8s 编排调度、DevOps 持续交付流水线',
        href: '/study/se/cloud/intro',
        tag: '云原生终局',
      },
    ],
  },
  {
    id: 'ai-llm-engineer',
    title: 'AI 算法与大模型工程师路线',
    subtitle: '从 Python 与数学建模出发，贯通统计机器学习、深度学习与 Transformer 大模型',
    icon: '🧠',
    color: '#8b5cf6',
    steps: [
      {
        nodeId: 'subj_Python',
        name: '1. Python 科学计算与工程底座',
        desc: '高阶函数、NumPy 矩阵向量化运算与异步编程',
        href: '/study/computer/python/intro',
        tag: 'AI 语言底座',
      },
      {
        nodeId: 'subj_机器学习',
        name: '2. 经典统计机器学习',
        desc: '线性回归、SVM 核技巧、CART 决策树、K-Means 与 PCA 降维',
        href: '/study/ai/ml/basic',
        tag: '数学建模',
      },
      {
        nodeId: 'subj_深度学习',
        name: '3. 深度神经网络与优化器',
        desc: '反向传播自动微分、CNN/RNN、AdamW 优化器与残差网络',
        href: '/study/ai/dl/basic',
        tag: '深度学习',
      },
      {
        nodeId: 'subj_自然语言处理',
        name: '4. NLP 与 Transformer 自注意力',
        desc: 'Scaled Dot-Product Attention、词向量、预训练语言模型与 RAG',
        href: '/study/ai/nlp/basic',
        tag: '大模型核心',
      },
      {
        nodeId: 'subj_推荐系统',
        name: '5. 工业级推荐系统与向量检索',
        desc: '多路召回、向量数据库检索、冷启动与实时重排架构',
        href: '/study/ai/recsys/basic',
        tag: '工业落地',
      },
      {
        nodeId: 'subj_强化学习',
        name: '6. 强化学习与对齐 (RLHF)',
        desc: '马尔可夫决策过程、Q-Learning、PPO 策略梯度与大模型对齐',
        href: '/study/ai/rl/basic',
        tag: '前沿探索',
      },
    ],
  },
];

/**
 * 构建全站知识星系图谱数据（支持按领域筛选与控制是否展开三级细粒度章节节点）
 */
export function buildGlobalKnowledgeGraph(options?: {
  domainFilter?: string;
  includeTopics?: boolean;
}): {
  nodes: GlobalGraphNode[];
  links: GlobalGraphLink[];
} {
  const domainFilter = options?.domainFilter || '全部';
  const includeTopics = options?.includeTopics ?? true;

  const nodes: GlobalGraphNode[] = [];
  const links: GlobalGraphLink[] = [];
  const nodeIds = new Set<string>();

  // 1. 中心总枢纽节点
  const hubId = 'hub_partjava';
  nodes.push({
    id: hubId,
    name: 'PartJava 全栈知识星系',
    level: 'hub',
    domain: '核心枢纽',
    href: '/study',
    summary:
      '融合四大核心技术域（计算机底层、人工智能与大模型、软件工程架构、网络安全）、26 门主干学科与 260+ 核心章节的全景交互式知识网络。',
    keyPoints: [
      '四大领域全景打通：计算机基础 ↔ AI 大模型 ↔ 企业级架构 ↔ 网络安全',
      '支持前置依赖路径溯源、掌握状态标记与 3D 算法流形一键演练',
      '点击任意节点即可直达对应课程章节或召唤 3D 禾桔 AI 深度伴学',
    ],
    prerequisites: [],
    nextSteps: ['计算机', '人工智能', '软件工程', '网络安全'],
    visualizerId: 'transformer',
    difficulty: '进阶',
    symbolSize: 54,
  });
  nodeIds.add(hubId);

  // 2. 遍历四大技术领域与学科
  Object.entries(navigationItems).forEach(([domainName, subjects]) => {
    if (domainFilter !== '全部' && domainName !== domainFilter) return;

    const domainId = `domain_${domainName}`;
    const dMeta = DOMAIN_META[domainName] || DOMAIN_META['计算机'];

    nodes.push({
      id: domainId,
      name: `${dMeta.icon} ${domainName}`,
      level: 'domain',
      domain: domainName,
      href: '/study',
      summary: dMeta.desc,
      keyPoints: subjects.map((s) => `${s.name}（${s.subitems?.length || 0} 个核心章节）`),
      prerequisites: ['PartJava 全栈知识星系'],
      nextSteps: subjects.slice(0, 5).map((s) => s.name),
      difficulty: '进阶',
      symbolSize: 40,
    });
    nodeIds.add(domainId);

    links.push({
      source: hubId,
      target: domainId,
      relation: 'hierarchy',
    });

    subjects.forEach((subj) => {
      const subjId = `subj_${subj.name}`;
      const subitems = subj.subitems || [];
      const firstHref = subitems[0]?.href || '/study';

      nodes.push({
        id: subjId,
        name: subj.name,
        level: 'subject',
        domain: domainName,
        subject: subj.name,
        code: subj.code,
        href: firstHref,
        summary: `《${subj.name}》属于【${domainName}】技术域，共涵盖 ${subitems.length} 个由浅入深的核心技术模块与实战专题。`,
        keyPoints: subitems.slice(0, 6).map((item) => item.name),
        prerequisites: [domainName],
        nextSteps: subitems.slice(0, 4).map((item) => item.name),
        visualizerId: SUBJECT_VISUALIZER_MAP[subj.name] || 'bubble',
        difficulty:
          subj.name.includes('深度学习') ||
          subj.name.includes('强化学习') ||
          subj.name.includes('操作系统')
            ? '高阶'
            : '进阶',
        symbolSize: 28,
      });
      nodeIds.add(subjId);

      links.push({
        source: domainId,
        target: subjId,
        relation: 'hierarchy',
      });

      // 3. 细粒度章节节点（全选时取前 4 个核心代表章节防拥挤；单领域筛选时展开全部章节）
      if (includeTopics) {
        const limit = domainFilter === '全部' ? 4 : subitems.length;
        subitems.slice(0, limit).forEach((topic, tIdx) => {
          const topicId = `topic_${subj.name}_${tIdx}`;
          nodes.push({
            id: topicId,
            name: topic.name,
            level: 'topic',
            domain: domainName,
            subject: subj.name,
            href: topic.href,
            summary: `【${subj.name}】核心章节《${topic.name}》：涵盖基础原理剖析、核心代码实现与高频面试考点。`,
            keyPoints: [
              `所属学科：${domainName} · ${subj.name}`,
              tIdx > 0
                ? `前置章节：${subitems[tIdx - 1].name}`
                : '本学科入门首章，零门槛直接开启学习',
              tIdx < subitems.length - 1
                ? `后续进阶：${subitems[tIdx + 1].name}`
                : '本学科综合实战收官章节',
            ],
            prerequisites: tIdx > 0 ? [subitems[tIdx - 1].name] : [subj.name],
            nextSteps:
              tIdx < subitems.length - 1 ? [subitems[tIdx + 1].name] : ['项目实战与闯关挑战'],
            visualizerId: SUBJECT_VISUALIZER_MAP[subj.name],
            difficulty: tIdx < 2 ? '入门' : tIdx < 6 ? '进阶' : '高阶',
            symbolSize: 15,
          });
          nodeIds.add(topicId);

          links.push({
            source: subjId,
            target: topicId,
            relation: 'hierarchy',
          });

          // 章节之间的先后递进链
          if (tIdx > 0) {
            const prevTopicId = `topic_${subj.name}_${tIdx - 1}`;
            if (nodeIds.has(prevTopicId)) {
              links.push({
                source: prevTopicId,
                target: topicId,
                relation: 'prerequisite',
                label: '进阶',
              });
            }
          }
        });
      }
    });
  });

  // 4. 注入跨学科/先后置学习依赖有向边
  SUBJECT_PREREQUISITES.forEach((dep) => {
    if (nodeIds.has(dep.from) && nodeIds.has(dep.to)) {
      links.push({
        source: dep.from,
        target: dep.to,
        relation: dep.type,
        label: dep.label,
      });
    }
  });

  return { nodes, links };
}

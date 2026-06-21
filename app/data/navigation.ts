export type NavigationItem = {
  code: string;
  name: string;
  href?: string;
  subitems?: Array<{
    name: string;
    href: string;
  }>;
};

export type NavigationItems = {
  [key: string]: NavigationItem[];
};

export const navigationItems: NavigationItems = {
  '计算机': [
    { 
      code: 'C', 
      name: 'C++',
      subitems: [
        { name: '开发环境配置', href: '/study/computer/cpp/setup' },
        { name: '基础语法', href: '/study/computer/cpp/syntax' },
        { name: '变量和数据类型', href: '/study/computer/cpp/variables' },
        { name: '运算符', href: '/study/computer/cpp/operators' },
        { name: '控制流程', href: '/study/computer/cpp/control' },
        { name: '函数', href: '/study/computer/cpp/functions' },
        { name: '数组和字符串', href: '/study/computer/cpp/arrays' },
        { name: '指针', href: '/study/computer/cpp/pointers' },
        { name: '引用', href: '/study/computer/cpp/references' },
        { name: '结构体和类', href: '/study/computer/cpp/structs' },
        { name: '面向对象编程', href: '/study/computer/cpp/oop' },
        { name: '模板编程', href: '/study/computer/cpp/templates' },
        { name: 'STL标准库', href: '/study/computer/cpp/stl' },
        { name: '文件操作', href: '/study/computer/cpp/file-io' },
        { name: '异常处理', href: '/study/computer/cpp/exceptions' },
        { name: '智能指针', href: '/study/computer/cpp/smart-pointers' },
        { name: '多线程编程', href: '/study/computer/cpp/multithreading' },
        { name: '网络编程', href: '/study/computer/cpp/networking' },
        { name: '项目实战', href: '/study/computer/cpp/projects' },
        { name: 'C++常用头文件', href: '/study/computer/cpp/headers' }
      ]
    },
    { 
      code: 'Py', 
      name: 'Python',
      subitems: [
        { name: 'Python编程入门', href: '/study/computer/python/intro' },
        { name: 'Python基础', href: '/study/computer/python/basic' },
        { name: '数据类型和变量', href: '/study/computer/python/datatypes' },
        { name: '控制流程', href: '/study/computer/python/control' },
        { name: '函数和模块', href: '/study/computer/python/functions' },
        { name: '文件操作', href: '/study/computer/python/file-io' },
        { name: '面向对象编程', href: '/study/computer/python/oop' },
        { name: '异常处理', href: '/study/computer/python/exceptions' },
        { name: '标准库', href: '/study/computer/python/stdlib' },
        { name: '第三方库', href: '/study/computer/python/packages' },
        { name: '项目实战', href: '/study/computer/python/projects' }
      ]
    },
    { 
      code: 'J', 
      name: 'Java',
      subitems: [
        { name: '编程入门', href: '/study/computer/java/intro' },
        { name: '基础语法', href: '/study/computer/java/basic' },
        { name: '流程控制', href: '/study/computer/java/control' },
        { name: '面向对象', href: '/study/computer/java/oop' },
        { name: '常用类与集合', href: '/study/computer/java/collections' },
        { name: '异常处理', href: '/study/computer/java/exceptions' },
        { name: '文件与IO', href: '/study/computer/java/file-io' },
        { name: '多线程与并发', href: '/study/computer/java/thread' },
        { name: '网络编程', href: '/study/computer/java/network' },
        { name: '项目实战', href: '/study/computer/java/projects' }
      ]
    },
    { 
      code: 'S', 
      name: 'SQL学习',
      subitems: [
        { name: '数据库基础与环境', href: '/study/computer/sql/intro' },
        { name: '基本查询（SELECT）', href: '/study/computer/sql/select' },
        { name: '条件与排序', href: '/study/computer/sql/where-order' },
        { name: '多表查询与连接', href: '/study/computer/sql/join' },
        { name: '数据增删改', href: '/study/computer/sql/crud' },
        { name: '聚合与分组', href: '/study/computer/sql/group' },
        { name: '子查询与视图', href: '/study/computer/sql/subquery-view' },
        { name: '索引与性能优化', href: '/study/computer/sql/index-optimize' },
        { name: '实战练习', href: '/study/computer/sql/projects' }
      ]
    },
    { 
      code: '数', 
      name: '数据结构与算法',
      subitems: [
        { name: '基础与复杂度分析', href: '/study/computer/ds/basic' },
        { name: '线性表', href: '/study/computer/ds/linear' },
        { name: '字符串与算法', href: '/study/computer/ds/string' },
        { name: '树与二叉树', href: '/study/computer/ds/tree' },
        { name: '图与图算法', href: '/study/computer/ds/graph' },
        { name: '排序与查找', href: '/study/computer/ds/sort' },
        { name: '哈希表与集合', href: '/study/computer/ds/hash' },
        { name: '递归与分治', href: '/study/computer/ds/recursion' },
        { name: '动态规划', href: '/study/computer/ds/dp' },
        { name: '面试题与实战', href: '/study/computer/ds/interview' }
      ]
    },
    {
      code: '操',
      name: '操作系统',
      subitems: [
        { name: '操作系统概述', href: '/study/computer/os/intro' },
        { name: '进程与线程管理', href: '/study/computer/os/process' },
        { name: '内存管理', href: '/study/computer/os/memory' },
        { name: '文件系统', href: '/study/computer/os/file' },
        { name: '输入输出与设备管理', href: '/study/computer/os/io' },
        { name: '调度算法', href: '/study/computer/os/schedule' },
        { name: '进程同步与互斥', href: '/study/computer/os/sync' },
        { name: '死锁与避免', href: '/study/computer/os/deadlock' },
        { name: '操作系统安全', href: '/study/computer/os/security' },
        { name: '实战与面试', href: '/study/computer/os/projects' }
      ]
    },
    {
      code: 'L',
      name: 'Linux系统',
      subitems: [
        { name: '基础入门', href: '/study/computer/linux/intro' },
        { name: '文件与目录管理', href: '/study/computer/linux/file' },
        { name: '用户与权限管理', href: '/study/computer/linux/user' },
        { name: '软件与包管理', href: '/study/computer/linux/package' },
        { name: '进程与服务管理', href: '/study/computer/linux/process' },
        { name: 'Shell与脚本编程', href: '/study/computer/linux/shell' },
        { name: '网络与安全', href: '/study/computer/linux/network' },
        { name: '性能监控与日志管理', href: '/study/computer/linux/monitor' },
        { name: '实战与面试', href: '/study/computer/linux/practice' },
      ]
    },
    {
      code: '网',
      name: '计算机网络',
      subitems: [
        { name: '网络基础与入门', href: '/study/computer/network/intro' },
        { name: '网络通信原理', href: '/study/computer/network/comm-principle' },
        { name: 'OSI与TCPIP模型', href: '/study/computer/network/model' },
        { name: '物理层与数据链路层', href: '/study/computer/network/link' },
        { name: 'IP与路由', href: '/study/computer/network/ip-routing' },
        { name: 'TCP与UDP', href: '/study/computer/network/tcp-udp' },
        { name: '应用层协议', href: '/study/computer/network/application' },
        { name: '局域网与广域网', href: '/study/computer/network/lan-wan' },
        { name: '无线与移动网络', href: '/study/computer/network/wireless-mobile' },
        { name: 'VPN与代理技术', href: '/study/computer/network/vpn-proxy' },
        { name: '网络安全基础', href: '/study/computer/network/security' },
        { name: '云网络与新技术', href: '/study/computer/network/cloud-newtech' },
        { name: '网络抓包与协议分析', href: '/study/computer/network/sniff-analyze' },
        { name: '网络配置与管理', href: '/study/computer/network/config-manage' },
        { name: '网络项目实战', href: '/study/computer/network/projects' },
        { name: '面试题与答疑', href: '/study/computer/network/interview' },
        { name: '网络进阶与拓展', href: '/study/computer/network/advanced' }
      ]
    },
    { 
      code: '前', 
      name: 'Web前端开发',
      subitems: [
        { name: 'HTML基础', href: '/study/computer/frontend/html' },
        { name: '表单与语义化', href: '/study/computer/frontend/html-forms' },
        { name: 'CSS基础', href: '/study/computer/frontend/css' },
        { name: 'CSS布局', href: '/study/computer/frontend/css-layout' },
        { name: 'CSS动画与过渡', href: '/study/computer/frontend/css-animation' },
        { name: 'CSS高级与预处理器', href: '/study/computer/frontend/css-advanced' },
        { name: '响应式设计', href: '/study/computer/frontend/responsive' },
        { name: 'JavaScript基础', href: '/study/computer/frontend/js' },
        { name: 'ES6+新特性', href: '/study/computer/frontend/es6' },
        { name: 'DOM与事件', href: '/study/computer/frontend/dom' },
        { name: '异步与Promise', href: '/study/computer/frontend/async' },
        { name: '前端安全', href: '/study/computer/frontend/security' },
        { name: '前端工程化', href: '/study/computer/frontend/engineering' },
        { name: '包管理与构建工具', href: '/study/computer/frontend/build-tools' },
        { name: '性能优化', href: '/study/computer/frontend/performance' },
        { name: 'React基础', href: '/study/computer/frontend/react' },
        { name: 'React进阶', href: '/study/computer/frontend/react-advanced' },
        { name: 'Vue基础', href: '/study/computer/frontend/vue' },
        { name: 'Vue进阶', href: '/study/computer/frontend/vue-advanced' },
        { name: '前端项目实战', href: '/study/computer/frontend/projects' }
      ]
    },
    { 
      code: 'G', 
      name: 'Go',
      subitems: [
        { name: 'Go语言入门', href: '/study/computer/go/intro' },
        { name: '开发环境配置', href: '/study/computer/go/setup' },
        { name: '基础语法', href: '/study/computer/go/basic' },
        { name: '数据类型', href: '/study/computer/go/datatypes' },
        { name: '控制流程', href: '/study/computer/go/control' },
        { name: '函数与方法', href: '/study/computer/go/functions' },
        { name: '数组与切片', href: '/study/computer/go/arrays-slices' },
        { name: 'Map与结构体', href: '/study/computer/go/map-struct' },
        { name: '接口与类型系统', href: '/study/computer/go/interfaces' },
        { name: '并发编程', href: '/study/computer/go/concurrency' },
        { name: 'Channel与Goroutine', href: '/study/computer/go/channels' },
        { name: '错误处理', href: '/study/computer/go/error-handling' },
        { name: '包管理与模块', href: '/study/computer/go/packages' },
        { name: '标准库使用', href: '/study/computer/go/stdlib' },
        { name: '文件操作', href: '/study/computer/go/file-io' },
        { name: '网络编程', href: '/study/computer/go/networking' },
        { name: 'HTTP服务开发', href: '/study/computer/go/http' },
        { name: 'RESTful API开发', href: '/study/computer/go/rest' },
        { name: '数据库操作', href: '/study/computer/go/database' },
        { name: '测试与性能优化', href: '/study/computer/go/testing' },
        { name: '微服务开发', href: '/study/computer/go/microservices' },
        { name: '容器化部署', href: '/study/computer/go/docker' },
        { name: '项目实战', href: '/study/computer/go/projects' }
      ]
    },
    { 
      code: 'P', 
      name: 'PHP',
      subitems: [
        { name: 'PHP编程入门', href: '/study/computer/php/intro' },
        { name: '开发环境配置', href: '/study/computer/php/setup' },
        { name: '基础语法与数据类型', href: '/study/computer/php/basic' },
        { name: '数据类型与变量', href: '/study/computer/php/datatypes' },
        { name: '控制流程与函数', href: '/study/computer/php/control-functions' },
        { name: '数组与字符串', href: '/study/computer/php/arrays-strings' },
        { name: '面向对象编程', href: '/study/computer/php/oop' },
        { name: '文件与异常处理', href: '/study/computer/php/file-exception' },
        { name: 'Web开发基础', href: '/study/computer/php/web' },
        { name: '数据库操作', href: '/study/computer/php/db' },
        { name: '会话管理与Cookie', href: '/study/computer/php/session-cookie' },
        { name: '表单处理与数据验证', href: '/study/computer/php/forms-validation' },
        { name: '常用扩展与包管理', href: '/study/computer/php/extensions-composer' },
        { name: '安全与性能优化', href: '/study/computer/php/security-performance' },
        { name: '测试与调试', href: '/study/computer/php/testing-debugging' },
        { name: '框架与项目实战', href: '/study/computer/php/frameworks-projects' },
        { name: '高级特性与底层原理', href: '/study/computer/php/advanced-internals' },
        { name: '并发与异步编程', href: '/study/computer/php/concurrency-async' },
        { name: 'Swoole与高性能开发', href: '/study/computer/php/swoole-highperf' },
        { name: '自动化部署与CI/CD', href: '/study/computer/php/devops-cicd' },
        { name: '云原生与容器化', href: '/study/computer/php/cloud-docker' },
        { name: '常见问题与面试题', href: '/study/computer/php/faq' }
      ]
    },
    { 
      code: '物', 
      name: '物联网',
      subitems: [
        { name: '物联网基础', href: '/study/computer/iot/intro' },
        { name: '通信技术', href: '/study/computer/iot/communication' },
        { name: '传感器技术', href: '/study/computer/iot/sensors' },
        { name: '数据处理', href: '/study/computer/iot/data-processing' },
        { name: '安全防护', href: '/study/computer/iot/security' },
        { name: '应用场景', href: '/study/computer/iot/applications' },
        { name: '开发平台', href: '/study/computer/iot/platforms' },
        { name: '项目实战', href: '/study/computer/iot/projects' }
      ]
    },
    {
      code: '组',
      name: '计算机组成原理',
      subitems: [
        { name: '绪论与发展简史', href: '/study/computer/composition/intro' },
        { name: '系统结构概述', href: '/study/computer/composition/structure' },
        { name: '数据的表示与运算', href: '/study/computer/composition/data' },
        { name: '存储系统', href: '/study/computer/composition/storage' },
        { name: '运算器', href: '/study/computer/composition/alu' },
        { name: '控制器', href: '/study/computer/composition/controller' },
        { name: '总线与输入输出', href: '/study/computer/composition/io' },
        { name: '中央处理器', href: '/study/computer/composition/cpu' },
        { name: '系统性能与优化', href: '/study/computer/composition/performance' },
        { name: '学习建议与资源', href: '/study/computer/composition/resources' }
      ]
    }
  ],
  '人工智能': [
    {
      code: '机',
      name: '机器学习',
      subitems: [
        { name: '机器学习基础', href: '/study/ai/ml/basic' },
        { name: '机器学习项目流程', href: '/study/ai/ml/workflow' },
        { name: '监督学习算法', href: '/study/ai/ml/supervised' },
        { name: '无监督学习算法', href: '/study/ai/ml/unsupervised' },
        { name: '模型评估与选择', href: '/study/ai/ml/evaluation' },
        { name: '特征工程', href: '/study/ai/ml/feature-engineering' },
        { name: '集成学习', href: '/study/ai/ml/ensemble' },
        { name: '机器学习实战案例', href: '/study/ai/ml/cases' },
        { name: '模型部署与优化', href: '/study/ai/ml/deployment' },
        { name: '机器学习面试题', href: '/study/ai/ml/interview' },
        { name: '进阶与前沿', href: '/study/ai/ml/advanced' },
      ]
    },
    { 
      code: '深', 
      name: '深度学习',
      subitems: [
        { name: '深度学习基础', href: '/study/ai/dl/basic' },
        { name: '神经网络基础', href: '/study/ai/dl/neural-networks' },
        { name: '卷积神经网络', href: '/study/ai/dl/cnn' },
        { name: '循环神经网络', href: '/study/ai/dl/rnn' },
        { name: '注意力机制', href: '/study/ai/dl/attention' },
        { name: 'Transformer架构', href: '/study/ai/dl/transformer' },
        { name: '生成对抗网络', href: '/study/ai/dl/gan' },
        { name: '自编码器', href: '/study/ai/dl/autoencoder' },
        { name: '迁移学习', href: '/study/ai/dl/transfer-learning' },
        { name: '深度学习框架', href: '/study/ai/dl/frameworks' },
        { name: '模型压缩与优化', href: '/study/ai/dl/optimization' },
        { name: '深度学习实战', href: '/study/ai/dl/cases' },
        { name: '深度学习面试题', href: '/study/ai/dl/interview' },
        { name: '进阶与前沿', href: '/study/ai/dl/advanced' },
      ]
    },
    { 
      code: '强', 
      name: '强化学习',
      subitems: [
        { name: '强化学习基础', href: '/study/ai/rl/basic' },
        { name: '马尔可夫决策过程', href: '/study/ai/rl/mdp' },
        { name: '动态规划', href: '/study/ai/rl/dynamic-programming' },
        { name: '蒙特卡洛方法', href: '/study/ai/rl/monte-carlo' },
        { name: '时序差分学习', href: '/study/ai/rl/temporal-difference' },
        { name: 'Q-Learning', href: '/study/ai/rl/q-learning' },
        { name: '策略梯度', href: '/study/ai/rl/policy-gradient' },
        { name: 'Actor-Critic算法', href: '/study/ai/rl/actor-critic' },
        { name: '深度强化学习', href: '/study/ai/rl/deep-rl' },
        { name: '多智能体强化学习', href: '/study/ai/rl/multi-agent' },
        { name: '强化学习框架', href: '/study/ai/rl/frameworks' },
        { name: '强化学习实战', href: '/study/ai/rl/cases' },
        { name: '强化学习面试题', href: '/study/ai/rl/interview' },
        { name: '进阶与前沿', href: '/study/ai/rl/advanced' },
      ]
    },
    { 
      code: '自', 
      name: '自然语言处理',
      subitems: [
        { name: 'NLP基础', href: '/study/ai/nlp/basic' },
        { name: '文本预处理', href: '/study/ai/nlp/preprocessing' },
        { name: '词向量与词嵌入', href: '/study/ai/nlp/word-embeddings' },
        { name: '文本分类', href: '/study/ai/nlp/text-classification' },
        { name: '命名实体识别', href: '/study/ai/nlp/ner' },
        { name: '机器翻译', href: '/study/ai/nlp/machine-translation' },
        { name: '文本生成', href: '/study/ai/nlp/text-generation' },
        { name: '情感分析', href: '/study/ai/nlp/sentiment-analysis' },
        { name: '问答系统', href: '/study/ai/nlp/qa' },
        { name: '对话系统', href: '/study/ai/nlp/dialogue' },
        { name: 'NLP框架与工具', href: '/study/ai/nlp/frameworks' },
        { name: 'NLP实战案例', href: '/study/ai/nlp/cases' },
        { name: 'NLP面试题', href: '/study/ai/nlp/interview' },
        { name: '进阶与前沿', href: '/study/ai/nlp/advanced' },
      ]
    },
    { 
      code: '计', 
      name: '计算机视觉',
      subitems: [
        { name: '计算机视觉基础', href: '/study/ai/cv/basic' },
        { name: '图像处理基础', href: '/study/ai/cv/image-processing' },
        { name: '特征提取与匹配', href: '/study/ai/cv/feature-extraction' },
        { name: '目标检测', href: '/study/ai/cv/object-detection' },
        { name: '图像分割', href: '/study/ai/cv/image-segmentation' },
        { name: '人脸识别', href: '/study/ai/cv/face-recognition' },
        { name: '姿态估计', href: '/study/ai/cv/pose-estimation' },
        { name: '视频分析', href: '/study/ai/cv/video-analysis' },
        { name: '3D视觉', href: '/study/ai/cv/3d-vision' },
        { name: '视觉框架与工具', href: '/study/ai/cv/frameworks' },
        { name: '计算机视觉实战', href: '/study/ai/cv/cases' },
        { name: '计算机视觉面试题', href: '/study/ai/cv/interview' },
        { name: '进阶与前沿', href: '/study/ai/cv/advanced' },
      ]
    },
    { 
      code: '推', 
      name: '推荐系统',
      subitems: [
        { name: '推荐系统基础', href: '/study/ai/recsys/basic' },
        { name: '协同过滤', href: '/study/ai/recsys/collaborative-filtering' },
        { name: '基于内容的推荐', href: '/study/ai/recsys/content-based' },
        { name: '矩阵分解', href: '/study/ai/recsys/matrix-factorization' },
        { name: '深度学习推荐', href: '/study/ai/recsys/deep-learning' },
        { name: '推荐系统评估', href: '/study/ai/recsys/evaluation' },
        { name: '冷启动问题', href: '/study/ai/recsys/cold-start' },
        { name: '实时推荐', href: '/study/ai/recsys/real-time' },
        { name: '推荐系统架构', href: '/study/ai/recsys/architecture' },
        { name: '推荐系统实战', href: '/study/ai/recsys/cases' },
        { name: '推荐系统面试题', href: '/study/ai/recsys/interview' },
        { name: '进阶与前沿', href: '/study/ai/recsys/advanced' },
      ]
    },
    { 
      code: '智', 
      name: '智能机器人',
      subitems: [
        { name: '机器人学基础', href: '/study/ai/robot/basic' },
        { name: '运动学与动力学', href: '/study/ai/robot/kinematics' },
        { name: '路径规划', href: '/study/ai/robot/path-planning' },
        { name: '机器人控制', href: '/study/ai/robot/control' },
        { name: '传感器与感知', href: '/study/ai/robot/sensors' },
        { name: '机器人操作系统', href: '/study/ai/robot/ros' },
        { name: '机器人视觉', href: '/study/ai/robot/vision' },
        { name: '机器人导航', href: '/study/ai/robot/navigation' },
        { name: '人机交互', href: '/study/ai/robot/hci' },
        { name: '机器人实战', href: '/study/ai/robot/cases' },
        { name: '机器人面试题', href: '/study/ai/robot/interview' },
        { name: '进阶与前沿', href: '/study/ai/robot/advanced' },
      ]
    },
    {
      code: '程',
      name: '人工智能程序设计',
      subitems: [
        { name: '开发环境配置', href: '/study/ai/programming/environment' },
        { name: 'Python基础', href: '/study/ai/programming/python' },
        { name: 'AI编程规范', href: '/study/ai/programming/coding-standards' },
        { name: 'AI项目开发流程', href: '/study/ai/programming/workflow' },
        { name: 'AI系统架构设计', href: '/study/ai/programming/architecture' },
        { name: '模型部署与优化', href: '/study/ai/programming/deployment' },
        { name: 'AI项目实战', href: '/study/ai/programming/project' },
        { name: '常见问题与面试题', href: '/study/ai/programming/interview' }
      ]
    },
    {
      code: '挖',
      name: '数据挖掘',
      subitems: [
        { name: '数据挖掘基础', href: '/study/ai/datamining/basic' },
        { name: '数据预处理', href: '/study/ai/datamining/preprocessing' },
        { name: '特征工程', href: '/study/ai/datamining/feature-engineering' },
        { name: '关联规则挖掘', href: '/study/ai/datamining/association' },
        { name: '聚类分析', href: '/study/ai/datamining/clustering' },
        { name: '分类与预测', href: '/study/ai/datamining/classification' },
        { name: '异常检测', href: '/study/ai/datamining/anomaly' },
        { name: '数据可视化', href: '/study/ai/datamining/visualization' },
        { name: '数据挖掘实战', href: '/study/ai/datamining/practice' },
        { name: '面试题与前沿', href: '/study/ai/datamining/interview' }
      ]
    },
  ],
  '网络安全': [
    { 
      code: '网', 
      name: '网络基础',
      subitems: [
        { name: '网络安全概述', href: '/study/security/network/intro' },
        { name: '网络基础架构', href: '/study/security/network/architecture' },
        { name: '安全模型与框架', href: '/study/security/network/framework' },
        { name: '物理层安全', href: '/study/security/network/physical' },
        { name: '数据链路层安全', href: '/study/security/network/datalink' },
        { name: '网络层安全', href: '/study/security/network/network' },
        { name: '传输层安全', href: '/study/security/network/transport' },
        { name: '应用层安全', href: '/study/security/network/application' },
        { name: '网络协议分析', href: '/study/security/network/protocol' },
        { name: '网络设备安全', href: '/study/security/network/device' }
      ]
    },
    { 
      code: '安', 
      name: '安全防护',
      subitems: [
        { name: '访问控制', href: '/study/security/protection/access' },
        { name: '身份认证', href: '/study/security/protection/auth' },
        { name: '加密技术', href: '/study/security/protection/encryption' },
        { name: '防火墙技术', href: '/study/security/protection/firewall' },
        { name: '入侵检测', href: '/study/security/protection/ids' },
        { name: '入侵防御', href: '/study/security/protection/ips' },
        { name: 'VPN技术', href: '/study/security/protection/vpn' },
        { name: '安全审计', href: '/study/security/protection/audit' },
        { name: '安全监控', href: '/study/security/protection/monitor' },
        { name: '应急响应', href: '/study/security/protection/response' }
      ]
    },
    { 
      code: '渗', 
      name: '渗透测试',
      subitems: [
        { name: '渗透测试基础', href: '/study/security/penetration/basic' },
        { name: '信息收集', href: '/study/security/penetration/recon' },
        { name: '漏洞扫描', href: '/study/security/penetration/scan' },
        { name: '漏洞利用', href: '/study/security/penetration/exploit' },
        { name: '后渗透测试', href: '/study/security/penetration/post' },
        { name: 'Web应用测试', href: '/study/security/penetration/web' },
        { name: '移动应用测试', href: '/study/security/penetration/mobile' },
        { name: '无线网络测试', href: '/study/security/penetration/wireless' },
        { name: '社会工程学', href: '/study/security/penetration/social' },
        { name: '渗透测试报告', href: '/study/security/penetration/report' }
      ]
    },
    { 
      code: '密', 
      name: '密码学',
      subitems: [
        { name: '密码学基础', href: '/study/security/crypto/basic' },
        { name: '对称加密', href: '/study/security/crypto/symmetric' },
        { name: '非对称加密', href: '/study/security/crypto/asymmetric' },
        { name: '哈希函数', href: '/study/security/crypto/hash' },
        { name: '数字签名', href: '/study/security/crypto/signature' },
        { name: '密钥管理', href: '/study/security/crypto/key' },
        { name: '公钥基础设施', href: '/study/security/crypto/pki' },
        { name: '密码协议', href: '/study/security/crypto/protocol' },
        { name: '密码分析', href: '/study/security/crypto/analysis' },
        { name: '密码学应用', href: '/study/security/crypto/application' }
      ]
    },
    { 
      code: '前', 
      name: '前端安全',
      subitems: [
        { name: '前端安全基础', href: '/study/security/frontend/basic' },
        { name: 'XSS攻击防护', href: '/study/security/frontend/xss' },
        { name: 'CSRF攻击防护', href: '/study/security/frontend/csrf' },
        { name: '点击劫持防护', href: '/study/security/frontend/clickjacking' },
        { name: 'SQL注入防护', href: '/study/security/frontend/sql' },
        { name: '文件上传安全', href: '/study/security/frontend/upload' }, 
        { name: '敏感信息保护', href: '/study/security/frontend/sensitive' },
        { name: '前端加密', href: '/study/security/frontend/encryption' },
        { name: '安全编码实践', href: '/study/security/frontend/coding' },
        { name: '安全测试方法', href: '/study/security/frontend/testing' }
      ]
    },
    { 
      code: '逆', 
      name: '逆向工程',
      subitems: [
        { name: '逆向工程基础', href: '/study/security/reverse/basic' },
        { name: '汇编语言基础', href: '/study/security/reverse/assembly' },
        { name: 'PE文件分析', href: '/study/security/reverse/pe' },
        { name: 'ELF文件分析', href: '/study/security/reverse/elf' },
        { name: '动态分析技术', href: '/study/security/reverse/dynamic' },
        { name: '静态分析技术', href: '/study/security/reverse/static' },
        { name: '反调试技术', href: '/study/security/reverse/anti-debug' },
        { name: '加壳脱壳', href: '/study/security/reverse/pack' },
        { name: '漏洞挖掘', href: '/study/security/reverse/vulnerability' },
        { name: '恶意代码分析', href: '/study/security/reverse/malware' }
      ]
    },
    { 
      code: '开', 
      name: '安全开发',
      subitems: [
        { name: '安全开发基础', href: '/study/security/dev/basic' },
        { name: '安全编码规范', href: '/study/security/dev/coding' },
        { name: '安全设计模式', href: '/study/security/dev/patterns' },
        { name: '安全测试方法', href: '/study/security/dev/testing' },
        { name: '代码审计', href: '/study/security/dev/audit' },
        { name: '安全工具使用', href: '/study/security/dev/tools' },
        { name: '漏洞修复', href: '/study/security/dev/fix' },
        { name: '安全部署', href: '/study/security/dev/deploy' },
        { name: '安全运维', href: '/study/security/dev/ops' },
        { name: '安全项目管理', href: '/study/security/dev/project' }
      ]
    },
    { 
      code: '运', 
      name: '安全运维',
      subitems: [
        { name: '安全运维基础', href: '/study/security/ops/basic' },
        { name: '系统加固', href: '/study/security/ops/hardening' },
        { name: '安全监控', href: '/study/security/ops/monitor' },
        { name: '日志分析', href: '/study/security/ops/log' },
        { name: '漏洞管理', href: '/study/security/ops/vulnerability' },
        { name: '补丁管理', href: '/study/security/ops/patch' },
        { name: '配置管理', href: '/study/security/ops/config' },
        { name: '应急响应', href: '/study/security/ops/incident' },
        { name: '灾难恢复', href: '/study/security/ops/recovery' },
        { name: '安全评估', href: '/study/security/ops/assessment' }
      ]
    },
    { 
      code: '链', 
      name: '区块链安全',
      subitems: [
        { name: '区块链安全基础', href: '/study/security/blockchain/basic' },
        { name: '共识机制安全', href: '/study/security/blockchain/consensus' },
        { name: '智能合约安全', href: '/study/security/blockchain/smart-contract' },
        { name: '密码学应用', href: '/study/security/blockchain/crypto' },
        { name: '钱包安全', href: '/study/security/blockchain/wallet' },
        { name: '交易所安全', href: '/study/security/blockchain/exchange' },
        { name: '挖矿安全', href: '/study/security/blockchain/mining' },
        { name: '51%攻击防护', href: '/study/security/blockchain/51-attack' },
        { name: '双花攻击防护', href: '/study/security/blockchain/double-spend' },
        { name: '区块链审计', href: '/study/security/blockchain/audit' }
      ]
    }
  ],
  '软件工程': [
    { code: '架', 
      name: '架构与设计模式', 
      href: '/study/se/architecture-design', 
      subitems: [
      { name: '软件架构基础', href: '/study/se/architecture-design/basic' },
      { name: '主流架构风格', href: '/study/se/architecture-design/styles' },
      { name: '常用设计模式', href: '/study/se/architecture-design/patterns' },
      { name: '架构与设计模式实战', href: '/study/se/architecture-design/practice' },
      { name: '常见面试题与答疑', href: '/study/se/architecture-design/interview' }
    ] },
    { code: '规', 
      name: '开发规范与测试', 
      href: '/study/se/standards-testing', 
      subitems: [
      { name: '开发规范', href: '/study/se/standards-testing/spec' },
      { name: '测试基础', href: '/study/se/standards-testing/basic' },
      { name: '单元测试', href: '/study/se/standards-testing/unit' },
      { name: '集成测试', href: '/study/se/standards-testing/integration' },
      { name: '系统测试', href: '/study/se/standards-testing/system' },
      { name: '自动化测试', href: '/study/se/standards-testing/automation' },
      { name: '测试管理', href: '/study/se/standards-testing/management' },
      { name: '专项测试', href: '/study/se/standards-testing/special' },
      { name: '实际项目案例', href: '/study/se/standards-testing/case' }
    ] },
    { code: 'J', 
      name: 'Java EE', 
      href: '/study/se/javaee', 
      subitems: [
      { name: 'JavaEE概述', href: '/study/se/javaee/intro' },
      { name: 'JavaEE核心组件', href: '/study/se/javaee/components' },
      { name: 'Web开发基础', href: '/study/se/javaee/web' },
      { name: '数据库访问技术', href: '/study/se/javaee/db' },
      { name: '企业级服务', href: '/study/se/javaee/enterprise' },
      { name: '安全与权限管理', href: '/study/se/javaee/security' },
      { name: 'Web服务', href: '/study/se/javaee/webservice' },
      { name: 'JavaEE框架', href: '/study/se/javaee/frameworks' },
      { name: '异步处理与并发', href: '/study/se/javaee/async' },
      { name: '微服务架构', href: '/study/se/javaee/microservice' },
      { name: '实战项目开发', href: '/study/se/javaee/project' },
      { name: '开发工具与环境', href: '/study/se/javaee/tools' },
      { name: '性能调优与监控', href: '/study/se/javaee/performance' },
      { name: '容器化与云服务', href: '/study/se/javaee/cloud' },
      { name: 'DevOps与CI/CD', href: '/study/se/javaee/devops' },
      { name: '前沿技术趋势', href: '/study/se/javaee/trend' },
      { name: '学习建议', href: '/study/se/javaee/suggestion' }
    ] },
    { code: 'A', 
      name: '安卓开发', 
      href: '/study/se/android', 
      subitems: [
      { name: '概述', href: '/study/se/android/intro' },
      { name: '开发环境配置', href: '/study/se/android/setup' },
      { name: '基础语法与组件', href: '/study/se/android/basic' },
      { name: 'UI开发与布局', href: '/study/se/android/ui' },
      { name: '数据存储与网络', href: '/study/se/android/data-network' },
      { name: '多媒体与传感器', href: '/study/se/android/media-sensor' },
      { name: '高级特性与性能优化', href: '/study/se/android/advanced' },
      { name: '安全与权限管理', href: '/study/se/android/security' },
      { name: '第三方库与架构模式', href: '/study/se/android/frameworks' },
      { name: '测试与发布', href: '/study/se/android/testing' },
      { name: '实战项目与案例', href: '/study/se/android/projects' }
    ] },
    { code: 'N', 
      name: '.NET开发', 
      href: '/study/se/dotnet', 
      subitems: [
      { name: '概述', href: '/study/se/dotnet/intro' },
      { name: '开发环境配置', href: '/study/se/dotnet/setup' },
      { name: 'C#基础与语法', href: '/study/se/dotnet/csharp' },
      { name: 'ASP.NET Web开发', href: '/study/se/dotnet/web' },
      { name: '数据库与EF Core', href: '/study/se/dotnet/db' },
      { name: '服务与中间件', href: '/study/se/dotnet/service' },
      { name: '安全与身份认证', href: '/study/se/dotnet/security' },
      { name: '部署与运维', href: '/study/se/dotnet/deploy' },
      { name: '测试与调试', href: '/study/se/dotnet/testing' },
      { name: '实战项目与案例', href: '/study/se/dotnet/projects' }
    ] },
    { code: '云', 
      name: '云计算', 
      href: '/study/se/cloud', 
      subitems: [
      { name: '概述', href: '/study/se/cloud/intro' },
      { name: '云服务基础', href: '/study/se/cloud/basic' },
      { name: '虚拟化与容器化', href: '/study/se/cloud/container' },
      { name: '云存储与数据库', href: '/study/se/cloud/storage' },
      { name: '云安全与合规', href: '/study/se/cloud/security' },
      { name: '自动化与DevOps', href: '/study/se/cloud/devops' },
      { name: '实战案例与应用', href: '/study/se/cloud/projects' }
    ] },
    { code: '大', 
      name: '大数据分析', 
      href: '/study/se/bigdata', 
      subitems: [
      { name: '概述', href: '/study/se/bigdata/intro' },
      { name: '大数据平台与生态', href: '/study/se/bigdata/platform' },
      { name: '数据采集与预处理', href: '/study/se/bigdata/ingest' },
      { name: '分布式存储与计算', href: '/study/se/bigdata/distributed' },
      { name: '数据分析与挖掘', href: '/study/se/bigdata/analysis' },
      { name: '可视化与BI', href: '/study/se/bigdata/bi' },
      { name: '大数据安全与运维', href: '/study/se/bigdata/security' },
      { name: '实战案例与项目', href: '/study/se/bigdata/projects' }
    ] },
    { code: '搜', 
      name: '智能搜索引擎', 
      href: '/study/se/search', 
      subitems: [
      { name: '搜索引擎基础', href: '/study/se/search/basic' },
      { name: '爬虫与数据采集', href: '/study/se/search/crawler' },
      { name: '索引构建', href: '/study/se/search/index' },
      { name: '查询处理', href: '/study/se/search/query' },
      { name: 'Elasticsearch示例', href: '/study/se/search/elasticsearch' },
      { name: '高级搜索特性', href: '/study/se/search/advanced' }
    ] },
    { code: '模', 
      name: '软件建模与设计', 
      href: '/study/se/modeling', 
      subitems: [
      { name: '软件建模基础', href: '/study/se/modeling/basic' },
      { name: 'UML建模', href: '/study/se/modeling/uml' },
      { name: '设计模式', href: '/study/se/modeling/patterns' },
      { name: '架构设计', href: '/study/se/modeling/architecture' },
      { name: '实战案例与项目', href: '/study/se/modeling/cases' },
      { name: '软件测试', href: '/study/se/modeling/testing' },
      { name: '软件维护', href: '/study/se/modeling/maintenance' }
    ] },
    { code: '动', 
      name: '动画与游戏设计', 
      href: '/study/se/game', 
      subitems: [
      { name: '动画基础', href: '/study/se/game/animation' },
      { name: '游戏设计', href: '/study/se/game/design' },
      { name: '游戏开发', href: '/study/se/game/development' },
      { name: '游戏测试', href: '/study/se/game/testing' },
      { name: '游戏发布', href: '/study/se/game/release' },
      { name: '实战案例与项目', href: '/study/se/game/projects' },
      { name: '游戏引擎', href: '/study/se/game/engine' },
      { name: '游戏美术', href: '/study/se/game/art' },
      { name: '游戏音效', href: '/study/se/game/sound' },
      { name: '游戏策划', href: '/study/se/game/planning' }
    ] }
  ]
}; 
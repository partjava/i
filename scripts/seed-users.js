const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

const dbConfig = {
  host: 'localhost',
  user: 'ecs-user',
  password: '123456',
  database: 'partjava_notes',
  charset: 'utf8mb4'
};

const users = [
  { name: '张伟', email: 'zhangwei@demo.com', domain: '计算机', skills: ['算法', '数据结构', 'C++', 'Python'] },
  { name: '李娜', email: 'lina@demo.com', domain: '数学', skills: ['线性代数', '概率论', '微积分', 'MATLAB'] },
  { name: '王强', email: 'wangqiang@demo.com', domain: '大数据', skills: ['Hadoop', 'Spark', 'Hive', 'Kafka'] },
  { name: '刘洋', email: 'liuyang@demo.com', domain: '运维', skills: ['Linux', 'Docker', 'K8s', 'Nginx'] },
  { name: '陈静', email: 'chenjing@demo.com', domain: '全栈', skills: ['React', 'Node.js', 'MySQL', 'TypeScript'] },
  { name: '赵磊', email: 'zhaolei@demo.com', domain: '软件工程', skills: ['设计模式', 'UML', '敏捷开发', 'Git'] },
];

const noteTemplates = {
  计算机: {
    public: [
      { title: '二叉树的遍历方式总结', content: '## 二叉树遍历\n\n二叉树有三种深度优先遍历方式：\n\n### 前序遍历（根-左-右）\n```python\ndef preorder(root):\n    if not root: return []\n    return [root.val] + preorder(root.left) + preorder(root.right)\n```\n\n### 中序遍历（左-根-右）\n```python\ndef inorder(root):\n    if not root: return []\n    return inorder(root.left) + [root.val] + inorder(root.right)\n```\n\n### 后序遍历（左-右-根）\n```python\ndef postorder(root):\n    if not root: return []\n    return postorder(root.left) + postorder(root.right) + [root.val]\n```\n\n中序遍历BST可以得到有序序列，这是一个重要性质。', category: '计算机', technology: '算法' },
      { title: '动态规划入门：背包问题', content: '## 0-1背包问题\n\n给定n个物品，每个物品有重量w[i]和价值v[i]，背包容量为W，求最大价值。\n\n### 状态定义\n`dp[i][j]` = 前i个物品，容量为j时的最大价值\n\n### 状态转移\n```\ndp[i][j] = max(dp[i-1][j], dp[i-1][j-w[i]] + v[i])\n```\n\n### 代码实现\n```python\ndef knapsack(weights, values, W):\n    n = len(weights)\n    dp = [[0] * (W+1) for _ in range(n+1)]\n    for i in range(1, n+1):\n        for j in range(W+1):\n            dp[i][j] = dp[i-1][j]\n            if j >= weights[i-1]:\n                dp[i][j] = max(dp[i][j], dp[i-1][j-weights[i-1]] + values[i-1])\n    return dp[n][W]\n```\n\n时间复杂度 O(nW)，空间可优化为 O(W)。', category: '计算机', technology: '算法' },
      { title: 'HashMap底层原理详解', content: '## HashMap 原理\n\n### 数据结构\nJava 8 之前：数组 + 链表\nJava 8 之后：数组 + 链表 + 红黑树（链表长度 > 8 时转换）\n\n### put 流程\n1. 计算 key 的 hashCode\n2. 扰动函数：`hash = (h = key.hashCode()) ^ (h >>> 16)`\n3. 取模：`index = hash & (capacity - 1)`\n4. 处理哈希冲突（链地址法）\n\n### 扩容机制\n- 默认容量 16，负载因子 0.75\n- 元素数量超过 `capacity * loadFactor` 时扩容\n- 扩容为原来的 2 倍，重新 rehash\n\n### 为什么容量是2的幂次？\n`hash & (n-1)` 等价于 `hash % n`，位运算更快。', category: '计算机', technology: 'Java' },
      { title: 'TCP三次握手与四次挥手', content: '## TCP 连接管理\n\n### 三次握手\n```\n客户端 → SYN(seq=x)          → 服务端\n客户端 ← SYN+ACK(seq=y,ack=x+1) ← 服务端\n客户端 → ACK(ack=y+1)        → 服务端\n```\n\n**为什么是三次？** 确保双方都能收发数据，两次不够（服务端无法确认客户端能收到）。\n\n### 四次挥手\n```\n客户端 → FIN → 服务端\n客户端 ← ACK ← 服务端\n客户端 ← FIN ← 服务端\n客户端 → ACK → 服务端\n```\n\n**TIME_WAIT 为什么等待 2MSL？**\n1. 确保最后一个 ACK 能到达服务端\n2. 让旧连接的数据包在网络中消失', category: '计算机', technology: '网络' },
      { title: 'LRU缓存算法实现', content: '## LRU Cache\n\n最近最少使用缓存，使用 HashMap + 双向链表实现 O(1) 的 get 和 put。\n\n```python\nfrom collections import OrderedDict\n\nclass LRUCache:\n    def __init__(self, capacity):\n        self.cap = capacity\n        self.cache = OrderedDict()\n    \n    def get(self, key):\n        if key not in self.cache:\n            return -1\n        self.cache.move_to_end(key)\n        return self.cache[key]\n    \n    def put(self, key, value):\n        if key in self.cache:\n            self.cache.move_to_end(key)\n        self.cache[key] = value\n        if len(self.cache) > self.cap:\n            self.cache.popitem(last=False)\n```\n\nOrderedDict 内部就是哈希表 + 双向链表，完美契合 LRU 需求。', category: '计算机', technology: '算法' },
      { title: '排序算法复杂度对比', content: '## 常见排序算法\n\n| 算法 | 平均 | 最坏 | 空间 | 稳定 |\n|------|------|------|------|------|\n| 冒泡 | O(n²) | O(n²) | O(1) | ✓ |\n| 选择 | O(n²) | O(n²) | O(1) | ✗ |\n| 插入 | O(n²) | O(n²) | O(1) | ✓ |\n| 归并 | O(nlogn) | O(nlogn) | O(n) | ✓ |\n| 快排 | O(nlogn) | O(n²) | O(logn) | ✗ |\n| 堆排 | O(nlogn) | O(nlogn) | O(1) | ✗ |\n\n### 快速排序核心\n```python\ndef quicksort(arr, lo, hi):\n    if lo < hi:\n        p = partition(arr, lo, hi)\n        quicksort(arr, lo, p-1)\n        quicksort(arr, p+1, hi)\n```\n\n实际工程中 Arrays.sort() 对基本类型用双轴快排，对对象用 TimSort。', category: '计算机', technology: '算法' },
    ],
    private: [
      { title: '面试题整理：手写Promise', content: '## 手写 Promise\n\n```javascript\nclass MyPromise {\n  constructor(executor) {\n    this.state = "pending";\n    this.value = undefined;\n    this.callbacks = [];\n    executor(\n      v => this._resolve(v),\n      r => this._reject(r)\n    );\n  }\n  _resolve(value) {\n    if (this.state !== "pending") return;\n    this.state = "fulfilled";\n    this.value = value;\n    this.callbacks.forEach(cb => cb.onFulfilled(value));\n  }\n  then(onFulfilled, onRejected) {\n    return new MyPromise((resolve, reject) => {\n      this.callbacks.push({ onFulfilled: v => resolve(onFulfilled(v)) });\n    });\n  }\n}\n```', category: '计算机', technology: 'JavaScript' },
      { title: '刷题记录：滑动窗口专题', content: '## 滑动窗口模板\n\n```python\ndef sliding_window(s):\n    left = 0\n    window = {}\n    res = 0\n    for right in range(len(s)):\n        c = s[right]\n        window[c] = window.get(c, 0) + 1\n        while 窗口需要收缩:\n            d = s[left]\n            window[d] -= 1\n            left += 1\n        res = max(res, right - left + 1)\n    return res\n```\n\n适用题目：最长无重复子串、最小覆盖子串、字符串排列等。', category: '计算机', technology: '算法' },
      { title: 'JVM调优笔记', content: '## JVM 参数调优\n\n```bash\n-Xms2g -Xmx2g          # 堆内存\n-XX:NewRatio=2          # 老年代:新生代 = 2:1\n-XX:+UseG1GC            # 使用G1垃圾收集器\n-XX:MaxGCPauseMillis=200 # 最大GC停顿时间\n-XX:+PrintGCDetails     # 打印GC详情\n```\n\n### GC 选择\n- 小堆（<4G）：CMS 或 G1\n- 大堆（>4G）：G1\n- 低延迟：ZGC（JDK 15+）', category: '计算机', technology: 'Java' },
      { title: '系统设计：短链接服务', content: '## 短链接系统设计\n\n### 核心需求\n- 长URL → 短码（6位）\n- 短码 → 重定向到长URL\n- QPS: 写100/s，读10000/s\n\n### 短码生成\n方案1：自增ID + Base62编码\n方案2：MD5取前6位（有冲突风险）\n\n### 存储\n- MySQL 存映射关系\n- Redis 缓存热点短链\n\n### 预估\n- 每天1亿条，5年 = 1825亿条\n- 每条约500B，总存储约90TB', category: '计算机', technology: '系统设计' },
      { title: '操作系统：进程与线程', content: '## 进程 vs 线程\n\n| 对比 | 进程 | 线程 |\n|------|------|------|\n| 资源 | 独立地址空间 | 共享进程资源 |\n| 切换开销 | 大 | 小 |\n| 通信 | IPC（管道/信号/共享内存） | 共享内存直接通信 |\n| 崩溃影响 | 不影响其他进程 | 可能导致整个进程崩溃 |\n\n### 线程同步\n- 互斥锁（Mutex）：同一时刻只有一个线程访问\n- 信号量（Semaphore）：控制并发数量\n- 条件变量：等待某个条件成立', category: '计算机', technology: '操作系统' },
    ]
  },
  数学: {
    public: [
      { title: '线性代数：矩阵乘法的几何意义', content: '## 矩阵乘法的本质\n\n矩阵乘法不是简单的数字运算，它代表**线性变换的复合**。\n\n### 几何理解\n- 矩阵 A 代表一种线性变换（旋转、缩放、剪切）\n- AB 代表先做 B 变换，再做 A 变换\n\n### 旋转矩阵\n```\nR(θ) = [cosθ  -sinθ]\n       [sinθ   cosθ]\n```\n\n### 特征值与特征向量\n`Av = λv`\n- 特征向量：变换后方向不变的向量\n- 特征值：该方向上的缩放比例\n\n**PCA 主成分分析**就是找协方差矩阵的特征向量。', category: '数学', technology: '线性代数' },
      { title: '概率论：贝叶斯定理应用', content: '## 贝叶斯定理\n\n$$P(A|B) = \\frac{P(B|A) \\cdot P(A)}{P(B)}$$\n\n### 经典例题：癌症检测\n- 患癌概率 P(C) = 0.01\n- 检测阳性且患癌 P(+|C) = 0.9\n- 检测阳性但未患癌 P(+|¬C) = 0.1\n\n**问：检测阳性，真的患癌概率？**\n\n```\nP(C|+) = P(+|C)·P(C) / P(+)\n       = 0.9×0.01 / (0.9×0.01 + 0.1×0.99)\n       = 0.009 / 0.108\n       ≈ 8.3%\n```\n\n结论：即使检测准确率90%，阳性结果真正患癌的概率只有8.3%！', category: '数学', technology: '概率论' },
      { title: '微积分：梯度下降的数学原理', content: '## 梯度下降\n\n### 梯度的含义\n梯度是函数增长最快的方向，负梯度是下降最快的方向。\n\n对于函数 f(x,y)：\n$$\\nabla f = \\left(\\frac{\\partial f}{\\partial x}, \\frac{\\partial f}{\\partial y}\\right)$$\n\n### 更新规则\n$$\\theta := \\theta - \\alpha \\nabla_\\theta J(\\theta)$$\n\n其中 α 是学习率。\n\n### 三种变体\n- **批量梯度下降**：用全部数据，稳定但慢\n- **随机梯度下降**：每次用1条，快但震荡\n- **小批量梯度下降**：折中，实际最常用', category: '数学', technology: '微积分' },
      { title: '数论基础：欧拉定理与RSA加密', content: '## 欧拉定理\n\n若 gcd(a, n) = 1，则：\n$$a^{\\phi(n)} \\equiv 1 \\pmod{n}$$\n\n### RSA 加密原理\n1. 选两个大质数 p, q，令 n = pq\n2. 计算 φ(n) = (p-1)(q-1)\n3. 选 e，使 gcd(e, φ(n)) = 1\n4. 求 d，使 ed ≡ 1 (mod φ(n))\n5. 公钥 (e, n)，私钥 (d, n)\n\n**加密**：c = m^e mod n\n**解密**：m = c^d mod n\n\n安全性基于大数分解的困难性。', category: '数学', technology: '数论' },
      { title: '统计学：假设检验入门', content: '## 假设检验\n\n### 基本流程\n1. 提出原假设 H₀ 和备择假设 H₁\n2. 选择显著性水平 α（通常0.05）\n3. 计算检验统计量\n4. 得出 p 值\n5. p < α 则拒绝 H₀\n\n### t 检验\n用于比较两组均值是否有显著差异：\n$$t = \\frac{\\bar{x}_1 - \\bar{x}_2}{s_p\\sqrt{\\frac{1}{n_1}+\\frac{1}{n_2}}}$$\n\n### 常见误区\n- p 值不是"H₀ 为真的概率"\n- 统计显著 ≠ 实际显著（要看效应量）\n- 多重比较问题：做20次检验，期望有1次假阳性', category: '数学', technology: '统计学' },
    ],
    private: [
      { title: '考研数学：高数重点公式整理', content: '## 高数核心公式\n\n### 极限\n- lim(sinx/x) = 1, x→0\n- lim((1+x)^(1/x)) = e, x→0\n\n### 导数公式\n- (xⁿ)′ = nxⁿ⁻¹\n- (eˣ)′ = eˣ\n- (lnx)′ = 1/x\n- (sinx)′ = cosx\n\n### 积分公式\n- ∫xⁿdx = xⁿ⁺¹/(n+1) + C\n- ∫eˣdx = eˣ + C\n- ∫(1/x)dx = ln|x| + C', category: '数学', technology: '微积分' },
      { title: '线代错题本：行列式计算', content: '## 行列式计算技巧\n\n### 三阶行列式\n对角线法则（萨鲁斯法则）：\n主对角线乘积之和 - 副对角线乘积之和\n\n### 常用性质\n1. 互换两行，行列式变号\n2. 某行乘k，行列式乘k\n3. 某行加另一行的k倍，行列式不变\n\n### 易错点\n- 展开时注意代数余子式的符号 (-1)^(i+j)\n- 上/下三角矩阵的行列式 = 对角线元素之积', category: '数学', technology: '线性代数' },
      { title: '概率论练习：期望与方差', content: '## 常见分布的期望和方差\n\n| 分布 | 期望 | 方差 |\n|------|------|------|\n| 二项 B(n,p) | np | np(1-p) |\n| 泊松 P(λ) | λ | λ |\n| 均匀 U(a,b) | (a+b)/2 | (b-a)²/12 |\n| 指数 E(λ) | 1/λ | 1/λ² |\n| 正态 N(μ,σ²) | μ | σ² |\n\n### 方差公式\nD(X) = E(X²) - [E(X)]²\nD(aX+b) = a²D(X)', category: '数学', technology: '概率论' },
      { title: '数学建模思路整理', content: '## 数学建模步骤\n\n1. **问题分析**：明确目标，确定变量\n2. **假设简化**：合理假设，降低复杂度\n3. **建立模型**：微分方程/优化/统计\n4. **求解模型**：解析解或数值解\n5. **验证模型**：与实际数据对比\n6. **改进模型**：放宽假设，提高精度\n\n### 常用模型\n- 微分方程：人口增长、传染病传播\n- 线性规划：资源分配、运输问题\n- 图论：最短路径、网络流', category: '数学', technology: '数学建模' },
    ]
  },
  大数据: {
    public: [
      { title: 'Hadoop HDFS架构详解', content: '## HDFS 架构\n\n### 核心组件\n- **NameNode**：管理文件系统元数据（文件名、权限、块位置）\n- **DataNode**：存储实际数据块（默认128MB/块）\n- **Secondary NameNode**：定期合并 EditLog 和 FsImage\n\n### 写入流程\n1. 客户端向 NameNode 请求写入\n2. NameNode 返回 DataNode 列表\n3. 客户端向第一个 DN 写数据，DN 之间形成 Pipeline\n4. 写完后向 NameNode 确认\n\n### 副本策略\n默认3副本：第1个在本机，第2个在同机架另一台，第3个在不同机架。', category: '大数据', technology: 'Hadoop' },
      { title: 'Spark RDD vs DataFrame vs Dataset', content: '## Spark 三种数据抽象\n\n### RDD（弹性分布式数据集）\n- 最底层抽象，类型安全\n- 不支持 SQL，优化有限\n- 适合非结构化数据处理\n\n### DataFrame\n- 带 Schema 的分布式数据集\n- 支持 SQL 查询\n- Catalyst 优化器自动优化\n- 运行时类型检查（不安全）\n\n### Dataset\n- DataFrame 的类型安全版本\n- 编译时类型检查\n- 兼具 RDD 的类型安全和 DataFrame 的优化\n\n**推荐**：Scala/Java 用 Dataset，Python 用 DataFrame（Python 没有 Dataset）', category: '大数据', technology: 'Spark' },
      { title: 'Kafka核心概念与消息可靠性', content: '## Kafka 架构\n\n### 核心概念\n- **Topic**：消息分类\n- **Partition**：Topic 的分区，实现并行\n- **Offset**：消息在 Partition 中的位置\n- **Consumer Group**：同组消费者共同消费一个 Topic\n\n### 消息可靠性\n**生产者端**：\n- acks=0：不等确认，最快但可能丢失\n- acks=1：Leader 确认，可能丢失\n- acks=-1：所有副本确认，最安全\n\n**消费者端**：\n- 手动提交 offset，处理完再提交\n- 避免自动提交导致消息丢失\n\n### 为什么 Kafka 快？\n顺序写磁盘 + 零拷贝（sendfile）+ 批量压缩', category: '大数据', technology: 'Kafka' },
      { title: 'Hive SQL优化实战', content: '## Hive 性能优化\n\n### 1. 分区裁剪\n```sql\n-- 好：利用分区过滤\nSELECT * FROM logs WHERE dt = "2026-03-01";\n-- 差：全表扫描\nSELECT * FROM logs WHERE date_format(create_time,"yyyy-MM-dd") = "2026-03-01";\n```\n\n### 2. 避免数据倾斜\n```sql\n-- 加随机前缀打散热点key\nSELECT key, sum(cnt) FROM (\n  SELECT regexp_replace(key, "^[0-9]+_", "") as key, cnt\n  FROM (\n    SELECT concat(cast(rand()*10 as int), "_", key) as key, count(*) cnt\n    FROM t GROUP BY concat(cast(rand()*10 as int), "_", key)\n  ) t1\n) t2 GROUP BY key;\n```\n\n### 3. Map Join\n小表（<25MB）放内存，避免 Reduce 阶段：\n```sql\nSELECT /*+ MAPJOIN(small_table) */ * FROM big_table JOIN small_table ON ...;\n```', category: '大数据', technology: 'Hive' },
      { title: 'Flink流处理：窗口与水位线', content: '## Flink 窗口机制\n\n### 窗口类型\n- **滚动窗口**：固定大小，不重叠（每5分钟统计一次）\n- **滑动窗口**：固定大小，有重叠（每1分钟统计过去5分钟）\n- **会话窗口**：按活动间隔划分\n\n### 水位线（Watermark）\n处理乱序数据的机制：\n```java\nWatermarkStrategy\n  .forBoundedOutOfOrderness(Duration.ofSeconds(5))\n  .withTimestampAssigner((event, ts) -> event.getTimestamp())\n```\n\n水位线 = 当前最大事件时间 - 允许延迟时间\n\n当水位线超过窗口结束时间，触发窗口计算。', category: '大数据', technology: 'Flink' },
    ],
    private: [
      { title: 'Spark调优：内存管理', content: '## Spark 内存模型\n\n### 统一内存管理（1.6+）\n- **执行内存**：Shuffle、Join、Sort 使用\n- **存储内存**：缓存 RDD、广播变量\n- 两者共享，动态调整\n\n### 关键参数\n```\nspark.executor.memory=4g\nspark.executor.memoryFraction=0.6\nspark.memory.storageFraction=0.5\n```\n\n### OOM 排查\n1. 检查数据倾斜\n2. 增加 executor 内存\n3. 减少每个 partition 的数据量\n4. 避免在 driver 端 collect 大数据集', category: '大数据', technology: 'Spark' },
      { title: 'Kafka消费者组再均衡问题', content: '## Consumer Group Rebalance\n\n### 触发条件\n- 消费者加入或离开\n- Topic 分区数变化\n- 消费者心跳超时\n\n### 问题\nRebalance 期间所有消费者停止消费，影响吞吐量。\n\n### 优化\n```properties\n# 增大心跳超时时间\nsession.timeout.ms=30000\n# 增大最大轮询间隔\nmax.poll.interval.ms=300000\n# 减少每次拉取数量，避免处理超时\nmax.poll.records=100\n```\n\n使用静态成员（group.instance.id）避免重启触发 Rebalance。', category: '大数据', technology: 'Kafka' },
      { title: '数仓分层设计规范', content: '## 数据仓库分层\n\n### ODS（操作数据层）\n- 原始数据，不做处理\n- 保留历史，按日期分区\n\n### DWD（数据明细层）\n- 清洗、标准化\n- 维度退化，事实表\n\n### DWS（数据汇总层）\n- 按主题聚合\n- 宽表，减少 JOIN\n\n### ADS（应用数据层）\n- 面向具体业务\n- 直接供报表使用\n\n### 命名规范\n- 表名：层级_业务_主题_粒度\n- 例：dwd_trade_order_detail', category: '大数据', technology: '数据仓库' },
      { title: 'ClickHouse vs Hive 选型', content: '## OLAP 引擎对比\n\n| 对比 | ClickHouse | Hive |\n|------|-----------|------|\n| 查询速度 | 极快（列存+向量化） | 慢（MR） |\n| 数据量 | 百亿级 | 千亿级 |\n| 实时性 | 支持实时写入 | 批处理 |\n| SQL支持 | 大部分 | 完整 |\n| 运维复杂度 | 低 | 高 |\n\n### 选型建议\n- 实时报表、数据量<千亿：ClickHouse\n- 离线分析、超大数据量：Hive\n- 混合场景：Hive 存储 + ClickHouse 查询', category: '大数据', technology: 'ClickHouse' },
      { title: 'Spark Streaming vs Flink对比', content: '## 流处理框架对比\n\n### Spark Streaming\n- 微批处理（Micro-batch）\n- 延迟：秒级\n- 与 Spark 生态无缝集成\n- 状态管理相对简单\n\n### Flink\n- 真正的流处理\n- 延迟：毫秒级\n- 精确一次语义（Exactly-once）\n- 强大的状态管理和时间语义\n\n### 选型\n- 延迟要求 < 1s：Flink\n- 已有 Spark 生态：Spark Structured Streaming\n- 复杂事件处理（CEP）：Flink', category: '大数据', technology: 'Flink' },
      { title: '数据湖 vs 数据仓库', content: '## 数据湖与数据仓库\n\n### 数据仓库\n- 结构化数据\n- Schema-on-Write（写时建模）\n- 高性能查询\n- 代表：Hive、ClickHouse\n\n### 数据湖\n- 原始数据，任意格式\n- Schema-on-Read（读时建模）\n- 灵活但查询慢\n- 代表：S3 + Delta Lake\n\n### 湖仓一体（Lakehouse）\n结合两者优点：\n- Delta Lake / Apache Iceberg / Apache Hudi\n- 支持 ACID 事务\n- 支持 BI 查询性能\n- 统一批流处理', category: '大数据', technology: '数据湖' },
    ]
  },
  运维: {
    public: [
      { title: 'Docker核心概念与常用命令', content: '## Docker 基础\n\n### 核心概念\n- **镜像（Image）**：只读模板\n- **容器（Container）**：镜像的运行实例\n- **仓库（Registry）**：存储镜像\n\n### 常用命令\n```bash\n# 镜像操作\ndocker pull nginx:latest\ndocker images\ndocker rmi nginx\n\n# 容器操作\ndocker run -d -p 80:80 --name web nginx\ndocker ps -a\ndocker exec -it web bash\ndocker stop web && docker rm web\n\n# 查看日志\ndocker logs -f web\n```\n\n### Dockerfile 最佳实践\n- 使用多阶段构建减小镜像体积\n- 合并 RUN 命令减少层数\n- 使用 .dockerignore 排除无用文件', category: '运维', technology: 'Docker' },
      { title: 'Kubernetes Pod调度原理', content: '## K8s 调度流程\n\n### 调度器工作流程\n1. **过滤（Filter）**：排除不满足条件的节点\n   - 资源不足\n   - 节点选择器不匹配\n   - 污点不容忍\n2. **打分（Score）**：对剩余节点打分\n   - 资源均衡\n   - 亲和性\n3. **绑定（Bind）**：选择最高分节点\n\n### 常用调度策略\n```yaml\n# 节点亲和性\naffinity:\n  nodeAffinity:\n    requiredDuringScheduling:\n      nodeSelectorTerms:\n      - matchExpressions:\n        - key: zone\n          operator: In\n          values: [cn-east]\n```', category: '运维', technology: 'Kubernetes' },
      { title: 'Nginx配置：反向代理与负载均衡', content: '## Nginx 核心配置\n\n### 反向代理\n```nginx\nserver {\n    listen 80;\n    server_name example.com;\n    \n    location / {\n        proxy_pass http://127.0.0.1:3000;\n        proxy_set_header Host $host;\n        proxy_set_header X-Real-IP $remote_addr;\n        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n    }\n}\n```\n\n### 负载均衡\n```nginx\nupstream backend {\n    least_conn;  # 最少连接\n    server 10.0.0.1:8080 weight=3;\n    server 10.0.0.2:8080 weight=1;\n    server 10.0.0.3:8080 backup;  # 备用\n}\n```\n\n### 策略\n- round_robin：轮询（默认）\n- least_conn：最少连接\n- ip_hash：同IP固定后端', category: '运维', technology: 'Nginx' },
      { title: 'Linux性能排查：CPU/内存/磁盘', content: '## Linux 性能排查\n\n### CPU\n```bash\ntop -c          # 实时进程\nmpstat -P ALL 1 # 每核CPU使用率\nsar -u 1 5      # CPU历史\n```\n\n### 内存\n```bash\nfree -h         # 内存概览\ncat /proc/meminfo\nvmstat 1        # 虚拟内存统计\n```\n\n### 磁盘 I/O\n```bash\niostat -x 1     # 磁盘详细统计\niotop           # 进程级I/O\nlsof +D /path   # 查看目录下打开的文件\n```\n\n### 网络\n```bash\nnetstat -tunlp  # 端口监听\nss -s           # socket统计\niftop           # 实时流量\n```', category: '运维', technology: 'Linux' },
      { title: 'CI/CD流水线设计', content: '## CI/CD 最佳实践\n\n### 流水线阶段\n```\n代码提交 → 代码检查 → 单元测试 → 构建镜像 → 集成测试 → 部署预发 → 部署生产\n```\n\n### GitHub Actions 示例\n```yaml\nname: Deploy\non:\n  push:\n    branches: [main]\njobs:\n  deploy:\n    runs-on: ubuntu-latest\n    steps:\n    - uses: actions/checkout@v3\n    - name: Build\n      run: docker build -t app .\n    - name: Push\n      run: docker push registry/app\n    - name: Deploy\n      run: ssh server "docker pull && docker restart app"\n```\n\n### 关键原则\n- 快速失败：测试失败立即停止\n- 环境一致：用容器保证环境一致\n- 回滚方便：保留上一版本镜像', category: '运维', technology: 'CI/CD' },
    ],
    private: [
      { title: 'K8s故障排查手册', content: '## K8s 常见问题排查\n\n### Pod 一直 Pending\n```bash\nkubectl describe pod <name>\n# 看 Events 部分\n# 常见原因：资源不足、节点选择器不匹配、PVC未绑定\n```\n\n### Pod CrashLoopBackOff\n```bash\nkubectl logs <pod> --previous  # 查看上次崩溃日志\n```\n\n### 节点 NotReady\n```bash\nkubectl describe node <name>\nsystemctl status kubelet\njournalctl -u kubelet -f\n```\n\n### 网络不通\n```bash\n# 测试 DNS\nkubectl run test --image=busybox --rm -it -- nslookup kubernetes\n# 测试 Pod 间通信\nkubectl exec -it pod1 -- ping pod2-ip\n```', category: '运维', technology: 'Kubernetes' },
      { title: 'Prometheus + Grafana监控搭建', content: '## 监控体系搭建\n\n### Prometheus 配置\n```yaml\nscrape_configs:\n  - job_name: "node"\n    static_configs:\n      - targets: ["localhost:9100"]\n  - job_name: "app"\n    static_configs:\n      - targets: ["app:8080"]\n    metrics_path: /actuator/prometheus\n```\n\n### 常用 PromQL\n```\n# CPU使用率\n100 - (avg by(instance)(rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)\n\n# 内存使用率\n(1 - node_memory_MemAvailable_bytes/node_memory_MemTotal_bytes) * 100\n\n# HTTP错误率\nrate(http_requests_total{status=~"5.."}[5m]) / rate(http_requests_total[5m])\n```', category: '运维', technology: '监控' },
      { title: 'Shell脚本：自动化运维', content: '## Shell 脚本最佳实践\n\n```bash\n#!/bin/bash\nset -euo pipefail  # 遇错退出，未定义变量报错，管道失败退出\n\n# 日志函数\nlog() { echo "[$(date "+%Y-%m-%d %H:%M:%S")] $*"; }\nerror() { log "ERROR: $*" >&2; exit 1; }\n\n# 检查依赖\ncommand -v docker &>/dev/null || error "docker not found"\n\n# 带重试的函数\nretry() {\n  local n=3\n  until "$@"; do\n    ((n--)) || return 1\n    sleep 2\n  done\n}\n\n# 清理函数\ncleanup() { log "Cleaning up..."; }\ntrap cleanup EXIT\n```', category: '运维', technology: 'Shell' },
      { title: 'MySQL主从复制配置', content: '## MySQL 主从复制\n\n### 主库配置\n```ini\n[mysqld]\nserver-id = 1\nlog-bin = mysql-bin\nbinlog-format = ROW\n```\n\n### 从库配置\n```ini\n[mysqld]\nserver-id = 2\nrelay-log = relay-bin\nread-only = 1\n```\n\n### 建立复制\n```sql\n-- 主库\nCREATE USER "repl"@"%" IDENTIFIED BY "password";\nGRANT REPLICATION SLAVE ON *.* TO "repl"@"%";\nSHOW MASTER STATUS;\n\n-- 从库\nCHANGE MASTER TO\n  MASTER_HOST="主库IP",\n  MASTER_USER="repl",\n  MASTER_PASSWORD="password",\n  MASTER_LOG_FILE="mysql-bin.000001",\n  MASTER_LOG_POS=154;\nSTART SLAVE;\n```', category: '运维', technology: 'MySQL' },
    ]
  },
  全栈: {
    public: [
      { title: 'React Hooks最佳实践', content: '## React Hooks 使用指南\n\n### useState 注意事项\n```jsx\n// 函数式更新，避免闭包陷阱\nsetCount(prev => prev + 1);\n\n// 对象状态要展开\nsetUser(prev => ({ ...prev, name: "新名字" }));\n```\n\n### useEffect 依赖数组\n```jsx\n// 只在 userId 变化时执行\nuseEffect(() => {\n  fetchUser(userId);\n}, [userId]);\n\n// 清理副作用\nuseEffect(() => {\n  const timer = setInterval(tick, 1000);\n  return () => clearInterval(timer); // 清理\n}, []);\n```\n\n### useMemo vs useCallback\n- `useMemo`：缓存计算结果\n- `useCallback`：缓存函数引用（传给子组件时用）', category: '全栈', technology: 'React' },
      { title: 'Node.js事件循环深度解析', content: '## Node.js 事件循环\n\n### 六个阶段\n```\ntimers → pending callbacks → idle/prepare → poll → check → close callbacks\n```\n\n- **timers**：执行 setTimeout/setInterval\n- **poll**：获取新的 I/O 事件\n- **check**：执行 setImmediate\n\n### 微任务优先级\n每个阶段结束后，先清空微任务队列：\n1. process.nextTick（优先级最高）\n2. Promise.then\n\n```javascript\nsetTimeout(() => console.log("timer"), 0);\nsetImmediate(() => console.log("immediate"));\nPromise.resolve().then(() => console.log("promise"));\nprocess.nextTick(() => console.log("nextTick"));\n// 输出：nextTick → promise → timer/immediate\n```', category: '全栈', technology: 'Node.js' },
      { title: 'TypeScript高级类型技巧', content: '## TypeScript 进阶\n\n### 条件类型\n```typescript\ntype IsArray<T> = T extends any[] ? true : false;\ntype A = IsArray<string[]>; // true\ntype B = IsArray<string>;   // false\n```\n\n### 映射类型\n```typescript\n// 所有属性变可选\ntype Partial<T> = { [K in keyof T]?: T[K] };\n\n// 所有属性变只读\ntype Readonly<T> = { readonly [K in keyof T]: T[K] };\n```\n\n### infer 推断\n```typescript\n// 提取函数返回类型\ntype ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;\n\ntype Fn = () => string;\ntype R = ReturnType<Fn>; // string\n```', category: '全栈', technology: 'TypeScript' },
      { title: 'Next.js App Router完全指南', content: '## Next.js 13+ App Router\n\n### 文件约定\n```\napp/\n  layout.tsx      # 共享布局\n  page.tsx        # 页面\n  loading.tsx     # 加载状态\n  error.tsx       # 错误边界\n  not-found.tsx   # 404\n  route.ts        # API路由\n```\n\n### Server vs Client 组件\n```tsx\n// Server Component（默认）\nasync function Page() {\n  const data = await fetch("..."); // 直接在服务端请求\n  return <div>{data}</div>;\n}\n\n// Client Component\n"use client";\nfunction Counter() {\n  const [count, setCount] = useState(0); // 可以用 hooks\n  return <button onClick={() => setCount(c => c+1)}>{count}</button>;\n}\n```\n\n### 数据获取\n- Server Component：直接 async/await\n- Client Component：SWR 或 React Query', category: '全栈', technology: 'Next.js' },
      { title: 'RESTful API设计规范', content: '## REST API 最佳实践\n\n### URL 设计\n```\nGET    /api/users          # 获取列表\nGET    /api/users/:id      # 获取单个\nPOST   /api/users          # 创建\nPUT    /api/users/:id      # 全量更新\nPATCH  /api/users/:id      # 部分更新\nDELETE /api/users/:id      # 删除\n```\n\n### 状态码\n- 200 OK\n- 201 Created\n- 400 Bad Request（参数错误）\n- 401 Unauthorized（未认证）\n- 403 Forbidden（无权限）\n- 404 Not Found\n- 500 Internal Server Error\n\n### 统一响应格式\n```json\n{\n  "success": true,\n  "data": {},\n  "message": "操作成功",\n  "code": 200\n}\n```', category: '全栈', technology: 'API设计' },
    ],
    private: [
      { title: 'JWT认证实现与安全注意事项', content: '## JWT 认证\n\n### 结构\nHeader.Payload.Signature\n\n```javascript\n// 生成\nconst token = jwt.sign(\n  { userId: 1, role: "admin" },\n  process.env.JWT_SECRET,\n  { expiresIn: "7d" }\n);\n\n// 验证\ntry {\n  const decoded = jwt.verify(token, process.env.JWT_SECRET);\n} catch (e) {\n  // TokenExpiredError 或 JsonWebTokenError\n}\n```\n\n### 安全注意\n- Secret 要足够长且随机\n- 不要在 Payload 存敏感信息（可被解码）\n- 使用 HTTPS 传输\n- 短过期时间 + Refresh Token 机制\n- 注销时用黑名单（Redis 存已注销 token）', category: '全栈', technology: 'Node.js' },
      { title: 'Redis在项目中的实际应用', content: '## Redis 使用场景\n\n### 1. 缓存\n```javascript\nasync function getUser(id) {\n  const cached = await redis.get(`user:${id}`);\n  if (cached) return JSON.parse(cached);\n  \n  const user = await db.findUser(id);\n  await redis.setex(`user:${id}`, 300, JSON.stringify(user));\n  return user;\n}\n```\n\n### 2. 分布式锁\n```javascript\nconst lock = await redis.set("lock:order", "1", "NX", "EX", 10);\nif (!lock) throw new Error("系统繁忙");\ntry {\n  // 处理订单\n} finally {\n  await redis.del("lock:order");\n}\n```\n\n### 3. 限流\n```javascript\nconst count = await redis.incr(`rate:${ip}`);\nif (count === 1) await redis.expire(`rate:${ip}`, 60);\nif (count > 100) throw new Error("请求过于频繁");\n```', category: '全栈', technology: 'Redis' },
      { title: '前端性能优化清单', content: '## 前端性能优化\n\n### 加载性能\n- 代码分割（React.lazy + Suspense）\n- 图片懒加载（loading="lazy"）\n- 使用 WebP/AVIF 格式\n- CDN 加速静态资源\n- HTTP/2 多路复用\n\n### 渲染性能\n- 避免不必要的重渲染（React.memo）\n- 虚拟列表（react-window）\n- 防抖节流\n- CSS 动画用 transform/opacity（触发合成层）\n\n### 测量工具\n- Lighthouse\n- Chrome DevTools Performance\n- Web Vitals（LCP/FID/CLS）\n\n### 核心指标目标\n- LCP < 2.5s\n- FID < 100ms\n- CLS < 0.1', category: '全栈', technology: 'React' },
      { title: 'MySQL索引优化实战', content: '## MySQL 索引优化\n\n### 索引失效场景\n```sql\n-- 1. 对索引列做函数运算\nWHERE YEAR(create_time) = 2026  -- ❌\nWHERE create_time >= "2026-01-01"  -- ✓\n\n-- 2. 隐式类型转换\nWHERE phone = 13800138000  -- phone是varchar，❌\nWHERE phone = "13800138000"  -- ✓\n\n-- 3. 前导模糊查询\nWHERE name LIKE "%张"  -- ❌\nWHERE name LIKE "张%"  -- ✓\n```\n\n### EXPLAIN 分析\n```sql\nEXPLAIN SELECT * FROM users WHERE email = "test@test.com";\n```\n关注：type（ref > range > index > ALL）、key（使用的索引）、rows（扫描行数）', category: '全栈', technology: 'MySQL' },
    ]
  },
  软件工程: {
    public: [
      { title: '设计模式：单例模式的正确实现', content: '## 单例模式\n\n### 懒汉式（线程不安全）\n```java\npublic class Singleton {\n    private static Singleton instance;\n    private Singleton() {}\n    public static Singleton getInstance() {\n        if (instance == null) {\n            instance = new Singleton();\n        }\n        return instance;\n    }\n}\n```\n\n### 双重检查锁（推荐）\n```java\npublic class Singleton {\n    private volatile static Singleton instance;\n    private Singleton() {}\n    public static Singleton getInstance() {\n        if (instance == null) {\n            synchronized (Singleton.class) {\n                if (instance == null) {\n                    instance = new Singleton();\n                }\n            }\n        }\n        return instance;\n    }\n}\n```\n\n**volatile 的作用**：防止指令重排序，确保 instance 初始化完成后才赋值。', category: '软件工程', technology: '设计模式' },
      { title: 'Git工作流：团队协作规范', content: '## Git 工作流\n\n### Git Flow\n```\nmain        # 生产环境\ndevelop     # 开发主分支\nfeature/*   # 功能分支\nrelease/*   # 发布分支\nhotfix/*    # 紧急修复\n```\n\n### Commit 规范（Conventional Commits）\n```\nfeat: 新功能\nfix: 修复bug\ndocs: 文档更新\nstyle: 代码格式\nrefactor: 重构\ntest: 测试\nchore: 构建/工具\n```\n\n### 常用操作\n```bash\n# 撤销最后一次提交（保留修改）\ngit reset --soft HEAD~1\n\n# 修改最后一次提交信息\ngit commit --amend\n\n# 合并多个提交\ngit rebase -i HEAD~3\n```', category: '软件工程', technology: 'Git' },
      { title: '微服务架构：服务拆分原则', content: '## 微服务拆分\n\n### 拆分原则\n1. **单一职责**：每个服务只做一件事\n2. **高内聚低耦合**：服务内部紧密，服务间松散\n3. **按业务域拆分**（DDD 限界上下文）\n4. **数据库独立**：每个服务有自己的数据库\n\n### 常见问题\n- **分布式事务**：Saga 模式（补偿事务）\n- **服务发现**：Consul / Nacos / Eureka\n- **链路追踪**：Zipkin / Jaeger\n- **API 网关**：统一入口、鉴权、限流\n\n### 什么时候不该用微服务\n- 团队规模小（< 10人）\n- 业务不复杂\n- 初创阶段，需求变化快', category: '软件工程', technology: '微服务' },
      { title: '代码审查：高效Code Review指南', content: '## Code Review 最佳实践\n\n### 审查重点\n1. **正确性**：逻辑是否正确，边界条件\n2. **可读性**：命名是否清晰，注释是否必要\n3. **性能**：有无明显性能问题\n4. **安全性**：SQL注入、XSS、权限检查\n5. **测试**：是否有足够的测试覆盖\n\n### 给出好的评论\n```\n❌ "这段代码很烂"\n✓ "这里可以用 Map 替代嵌套循环，时间复杂度从 O(n²) 降到 O(n)"\n\n❌ "为什么这样写？"\n✓ "这里我理解的是...，你的意图是...吗？"\n```\n\n### PR 大小\n- 理想：< 400 行\n- 超过 800 行：考虑拆分', category: '软件工程', technology: '工程实践' },
      { title: '敏捷开发：Scrum实践总结', content: '## Scrum 框架\n\n### 角色\n- **Product Owner**：管理 Product Backlog，代表业务\n- **Scrum Master**：移除障碍，保护团队\n- **Development Team**：自组织，跨职能\n\n### 事件\n- **Sprint**：1-4周迭代\n- **Sprint Planning**：计划会，选取 Backlog\n- **Daily Scrum**：15分钟站会\n- **Sprint Review**：演示成果\n- **Sprint Retrospective**：回顾改进\n\n### 常见问题\n- 站会变汇报：聚焦障碍，不是进度汇报\n- Sprint 中途加需求：放入下个 Sprint\n- 估点不准：用相对估算（故事点），不是小时', category: '软件工程', technology: '敏捷开发' },
      { title: 'SOLID原则实战解析', content: '## SOLID 原则\n\n### S - 单一职责\n一个类只有一个改变的理由。\n```java\n// ❌ 用户类既处理业务又处理持久化\nclass User { save() {} sendEmail() {} }\n// ✓ 拆分\nclass User {} class UserRepository { save() {} } class EmailService { send() {} }\n```\n\n### O - 开闭原则\n对扩展开放，对修改关闭。用多态替代 if-else。\n\n### L - 里氏替换\n子类可以替换父类使用，不改变程序正确性。\n\n### I - 接口隔离\n不强迫实现不需要的接口，拆分大接口。\n\n### D - 依赖倒置\n依赖抽象，不依赖具体实现。高层模块不依赖低层模块。', category: '软件工程', technology: '设计模式' },
    ],
    private: [
      { title: '重构技巧：消除代码坏味道', content: '## 代码坏味道与重构\n\n### 过长函数\n- 提取方法（Extract Method）\n- 函数超过20行就考虑拆分\n\n### 重复代码\n- 提取公共方法\n- 模板方法模式\n\n### 过多参数\n```java\n// ❌\nvoid createUser(String name, String email, String phone, String address)\n// ✓\nvoid createUser(UserDTO user)\n```\n\n### 注释代替代码\n```java\n// ❌ 用注释解释做什么\n// 检查用户是否成年\nif (user.age >= 18) {}\n// ✓ 用代码表达意图\nif (user.isAdult()) {}\n```', category: '软件工程', technology: '重构' },
      { title: '单元测试：TDD实践', content: '## 测试驱动开发\n\n### TDD 循环\n红（写失败测试）→ 绿（最小实现）→ 重构\n\n### 好的单元测试\n- **Fast**：运行快\n- **Independent**：互不依赖\n- **Repeatable**：可重复\n- **Self-validating**：自动验证\n- **Timely**：及时编写\n\n### Jest 示例\n```javascript\ndescribe("Calculator", () => {\n  test("should add two numbers", () => {\n    expect(add(1, 2)).toBe(3);\n  });\n  \n  test("should handle negative numbers", () => {\n    expect(add(-1, 1)).toBe(0);\n  });\n});\n```\n\n### Mock 使用\n```javascript\njest.mock("../db");\ndb.findUser.mockResolvedValue({ id: 1, name: "test" });\n```', category: '软件工程', technology: '测试' },
      { title: '架构决策记录（ADR）模板', content: '## ADR 模板\n\n### 什么是 ADR\n记录重要架构决策的文档，帮助团队理解"为什么这样做"。\n\n### 模板\n```markdown\n# ADR-001: 使用 PostgreSQL 作为主数据库\n\n## 状态\n已接受\n\n## 背景\n需要选择一个关系型数据库...\n\n## 决策\n使用 PostgreSQL\n\n## 原因\n- 支持 JSON 类型，灵活性高\n- 强大的全文搜索\n- 开源免费\n\n## 后果\n- 团队需要学习 PostgreSQL 特性\n- 与 MySQL 语法略有差异\n```', category: '软件工程', technology: '工程实践' },
      { title: '性能测试：JMeter压测实战', content: '## JMeter 压测\n\n### 测试计划结构\n```\n测试计划\n└── 线程组（100用户，10秒内启动）\n    ├── HTTP请求默认值\n    ├── HTTP请求（登录）\n    ├── HTTP请求（查询）\n    └── 聚合报告\n```\n\n### 关键指标\n- **TPS**：每秒事务数\n- **响应时间**：平均/P95/P99\n- **错误率**：< 1% 为合格\n- **吞吐量**：KB/s\n\n### 压测结论模板\n```\n并发用户：100\n持续时间：10分钟\nTPS：500\n平均响应时间：200ms\nP99响应时间：800ms\n错误率：0.1%\n结论：系统在100并发下表现稳定\n```', category: '软件工程', technology: '测试' },
    ]
  }
};

async function main() {
  const conn = await mysql.createConnection(dbConfig);
  console.log('🔗 连接数据库...');

  for (const user of users) {
    const hash = await bcrypt.hash('Demo@123456', 10);

    // 插入用户
    const [userResult] = await conn.execute(
      `INSERT INTO users (name, email, password, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())
       ON DUPLICATE KEY UPDATE name=VALUES(name)`,
      [user.name, user.email, hash]
    );

    let userId;
    if (userResult.insertId) {
      userId = userResult.insertId;
    } else {
      const [rows] = await conn.execute('SELECT id FROM users WHERE email = ?', [user.email]);
      userId = rows[0].id;
    }

    // 插入 user_profiles
    await conn.execute(
      `INSERT INTO user_profiles (user_id, name, job_title, skills, created_at, updated_at)
       VALUES (?, ?, ?, ?, NOW(), NOW())
       ON DUPLICATE KEY UPDATE name=VALUES(name), skills=VALUES(skills)`,
      [userId, user.name, `${user.domain}工程师`, JSON.stringify(user.skills)]
    );

    const templates = noteTemplates[user.domain];
    if (!templates) { console.log(`⚠️  无模板: ${user.domain}`); continue; }

    // 插入公开笔记
    for (const note of templates.public) {
      await conn.execute(
        `INSERT INTO notes (title, content, category, technology, is_public, author_id, created_at, updated_at)
         VALUES (?, ?, ?, ?, 1, ?, NOW(), NOW())`,
        [note.title, note.content, note.category, note.technology, userId]
      );
    }

    // 插入私人笔记
    for (const note of templates.private) {
      await conn.execute(
        `INSERT INTO notes (title, content, category, technology, is_public, author_id, created_at, updated_at)
         VALUES (?, ?, ?, ?, 0, ?, NOW(), NOW())`,
        [note.title, note.content, note.category, note.technology, userId]
      );
    }

    console.log(`✅ ${user.name} (${user.domain}): ${templates.public.length}篇公开 + ${templates.private.length}篇私人`);
  }

  await conn.end();
  console.log('\n🎉 完成！账号密码统一：Demo@123456');
  console.log('账号列表：');
  users.forEach(u => console.log(`  ${u.email}  ${u.name}  [${u.domain}]`));
}

main().catch(console.error);

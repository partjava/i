const mysql = require('mysql2/promise');
const DB = { host: 'localhost', user: 'ecs-user', password: '123456', database: 'partjava_notes' };
const USER_ID = 1;

const days = [
// ===== 1月15日 =====
{ date: '2026-01-15', notes: [
  { title: 'Transformer 架构核心原理', category: 'AI', technology: '深度学习', isPublic: true, content: `# Transformer 架构核心原理\n\n## 背景\n\n2017 年 Google 论文《Attention Is All You Need》提出，彻底改变了 NLP 领域。\n\n## 核心：自注意力机制\n\n每个词对序列中所有词计算注意力权重，捕捉长距离依赖。\n\n\`\`\`\nAttention(Q, K, V) = softmax(QK^T / √d_k) × V\n\`\`\`\n\n- Q（Query）：当前词的查询向量\n- K（Key）：所有词的键向量\n- V（Value）：所有词的值向量\n\n## 多头注意力\n\n并行运行多个注意力头，每个头关注不同的语义关系，最后拼接。\n\n## 位置编码\n\nTransformer 无序列感知，通过正弦/余弦位置编码注入位置信息。\n\n## 为什么比 RNN 强\n\n- 并行计算，训练速度快\n- 长距离依赖捕捉能力强\n- 不存在梯度消失问题` },
  { title: 'GPT 系列发展历程梳理', category: 'AI', technology: 'LLM', isPublic: true, content: `# GPT 系列发展历程梳理\n\n## GPT-1（2018）\n\nOpenAI 首次提出用无监督预训练 + 有监督微调的范式，1.17亿参数。\n\n## GPT-2（2019）\n\n15亿参数，生成能力惊艳，OpenAI 一度因"太危险"拒绝开源。\n\n## GPT-3（2020）\n\n1750亿参数，Few-shot 学习能力突破，无需微调即可完成多种任务。\n\n## ChatGPT（2022.11）\n\n基于 GPT-3.5，引入 RLHF（人类反馈强化学习），对话能力质变，5天用户破百万。\n\n## GPT-4（2023）\n\n多模态，支持图像输入，推理能力大幅提升，律师考试前10%水平。\n\n## GPT-4o（2024）\n\n原生多模态，语音/图像/文本统一处理，响应速度接近人类对话。\n\n## o1/o3 系列（2024-2025）\n\n引入"思维链"推理，数学和编程能力显著提升，慢思考模式。` },
  { title: 'Attention 机制手推笔记', category: 'AI', technology: '深度学习', isPublic: false, content: `# Attention 机制手推笔记\n\n## 直觉理解\n\n翻译"我爱北京"时，翻译"Beijing"这个词时应该更关注"北京"而不是"我"。\n\n## 计算步骤\n\n1. 输入词向量 X，通过三个权重矩阵得到 Q、K、V\n2. 计算注意力分数：score = Q × K^T\n3. 缩放：score / √d_k（防止点积过大导致梯度消失）\n4. Softmax 归一化得到注意力权重\n5. 加权求和：output = weights × V\n\n## 复杂度\n\n时间复杂度 O(n²d)，n 是序列长度，这是长文本的瓶颈。\n\n## 改进方向\n\n- Sparse Attention：只计算部分位置的注意力\n- Flash Attention：IO 感知的高效实现\n- Linear Attention：将复杂度降到 O(n)` },
  { title: 'DeepSeek-R1 技术解析', category: 'AI', technology: 'LLM', isPublic: true, content: `# DeepSeek-R1 技术解析\n\n## 背景\n\n2025年1月，深度求索发布 DeepSeek-R1，推理能力对标 OpenAI o1，但训练成本仅约 600 万美元，震惊业界。\n\n## 核心技术\n\n### 纯强化学习训练\n\nR1-Zero 完全不用监督数据，只用 RL 训练，模型自发涌现出思维链推理能力。\n\n### GRPO 算法\n\nGroup Relative Policy Optimization，不需要 Critic 网络，降低训练成本。\n\n### 蒸馏\n\n将 R1 的推理能力蒸馏到 1.5B~70B 的小模型，小模型性能超越同量级竞品。\n\n## 影响\n\n- 打破"算力即一切"的认知\n- 开源权重，推动社区发展\n- 美股英伟达单日跌近17%` },
  { title: 'MySQL 索引原理与优化', category: '数据库', technology: 'MySQL', isPublic: true, content: `# MySQL 索引原理与优化\n\n## B+ 树索引\n\nMySQL InnoDB 默认使用 B+ 树，所有数据存在叶子节点，叶子节点通过链表相连，范围查询高效。\n\n## 索引类型\n\n- **主键索引**：聚簇索引，数据和索引存在一起\n- **普通索引**：叶子节点存主键值，需要回表\n- **覆盖索引**：查询字段全在索引中，无需回表\n- **联合索引**：遵循最左前缀原则\n\n## 常见优化\n\n\`\`\`sql\n-- 避免在索引列上使用函数\nSELECT * FROM users WHERE YEAR(created_at) = 2024; -- 差\nSELECT * FROM users WHERE created_at >= '2024-01-01'; -- 好\n\n-- 覆盖索引\nCREATE INDEX idx_user_email ON users(email, name);\nSELECT email, name FROM users WHERE email = 'x'; -- 不回表\n\`\`\`\n\n## EXPLAIN 分析\n\n关注 type 字段：ALL < index < range < ref < eq_ref < const\n\n## 索引失效场景\n\n- 使用 != 或 NOT IN\n- LIKE 以 % 开头\n- 隐式类型转换\n- OR 连接非索引列` },
  { title: '反向传播算法推导', category: 'AI', technology: '深度学习', isPublic: false, content: `# 反向传播算法推导\n\n## 核心思想\n\n链式法则求损失函数对每个参数的梯度。\n\n## 前向传播\n\n\`\`\`\n输入 x → 隐藏层 h = σ(Wx + b) → 输出 y = softmax(Vh + c) → 损失 L\n\`\`\`\n\n## 反向传播\n\n从损失 L 开始，逐层计算梯度：\n\n\`\`\`\n∂L/∂V = ∂L/∂y × ∂y/∂V\n∂L/∂W = ∂L/∂h × ∂h/∂W\n\`\`\`\n\n## 梯度消失问题\n\nSigmoid 导数最大 0.25，多层相乘后梯度趋近于 0。\n\n解决方案：ReLU 激活函数、残差连接、BatchNorm、梯度裁剪。` },
  { title: 'AI 学习路线规划（私人）', category: 'AI', technology: '规划', isPublic: false, content: `# AI 学习路线规划\n\n## 数学基础\n\n- 线性代数：矩阵运算、特征值分解、SVD\n- 概率统计：贝叶斯、最大似然估计\n- 微积分：梯度、链式法则\n\n## 机器学习基础\n\n- 监督学习：线性回归、逻辑回归、SVM、决策树\n- 无监督学习：K-Means、PCA、自编码器\n\n## 深度学习\n\n- CNN：图像识别\n- RNN/LSTM：序列建模\n- Transformer：注意力机制\n- 扩散模型：图像生成\n\n## 大模型方向\n\n- Prompt Engineering\n- RAG（检索增强生成）\n- Fine-tuning（LoRA、QLoRA）\n- Agent 开发\n\n## 推荐资源\n\n- 李沐《动手学深度学习》\n- Andrej Karpathy YouTube\n- Papers With Code` },
  { title: '工信部启动全国算力态势感知自动化监测', category: '计算机', technology: '算力基建', isPublic: true, content: `# 工信部启动全国算力态势感知自动化监测
## 核心内容
工信部印发通知，全面开展算力态势感知自动化监测工作。目标到2026年底，实现全国31个省及重点算力企业算力数据自动化监测，建成统一标准的算力监测体系。

## 实施要点
- 分两批组织各地、企业依托中国算力平台开展监测
- 健全数据质量核查与智能分析机制
- 动态优化算力供给结构，提升资源配置效率

## 意义
破解算力供需脱节、闲置浪费问题，为AI产业高质量发展提供算力底座支撑。` },
  { title: '英伟达Q4财报再超预期，AI智能体成增长核心', category: 'AI', technology: 'AI芯片', isPublic: true, content: `# 英伟达Q4财报再超预期，AI智能体成增长核心
## 财报数据
2026财年Q4（截至1月25日）营收681.27亿美元，同比+73%；净利润429.6亿美元，同比+94%，毛利率75%。

## 核心信号
- 黄仁勋称**AI智能体拐点已至**，将成下一轮增长引擎
- 数据中心业务持续爆发，H100/H200需求旺盛
- 中国市场H200许可尚未产生收入，存在不确定性

## 行业影响
英伟达业绩持续领跑，印证AI算力需求爆发，推动全球智算中心建设热潮。` },
  { title: 'OpenClaw开源智能体GitHub星标破30万', category: 'AI', technology: 'AI智能体', isPublic: true, content: `# OpenClaw开源智能体GitHub星标破30万
## 项目概况
奥地利开发者推出的开源AI智能体，可在本地电脑自主执行文件管理、邮件收发、代码修改等复杂任务。

## 核心特点
- 支持技能包扩展，可对接各类大模型
- 上线2个月获30万+星标，成开源社区爆款
- 衍生项目Moltbook：百万AI智能体自主社交平台

## 争议与风险
高系统权限引发数据安全担忧；提示注入攻击、兼容性问题仍待解决。` },
]},
// ===== 1月16日（新增新闻） =====
{ date: '2026-01-16', notes: [
  { title: '阿里平头哥发布AI芯片真武810E', category: '计算机', technology: 'AI芯片', isPublic: true, content: `# 阿里平头哥发布AI芯片真武810E
## 核心参数
- 自研并行计算架构与片间互联技术
- 全栈自研软件栈，软硬件深度协同
- 主打推理场景，能效比领先同类产品

## 战略意义
补齐国产AI芯片短板，支撑阿里通义千问、Qwen系列大模型训练与推理，降低对海外芯片依赖。` },
  { title: '工信部启动工业数据筑基行动', category: '大数据', technology: '工业数据', isPublic: true, content: `# 工信部启动工业数据筑基行动
## 行动目标
2026年底建成工业数据“采-集-用”闭环体系，破解数据流通瓶颈。

## 核心举措
- 搭建重点行业数据可信互联平台（中心-边缘协同）
- 建设四大资源库：行业数据、技术攻关、标准、高质量数据集
- 推动工业大模型、智能体在研发、生产环节落地

## 价值
为制造业数智化转型提供数据底座，加速AI与工业生产融合。` },
  { title: '广东两大AI算力底座项目获批', category: '计算机', technology: '算力基建', isPublic: true, content: `# 广东两大AI算力底座项目获批
## 项目详情
1. 湛江AI智造及数智应用一体化项目：总投资25亿元，占地10万㎡，含AI算力中心、设备生产线。
2. 广州黄埔推理算力中心：投资9.5亿元，规划≥4000PFlops@FP16算力，100%国产设备。

## 建设周期
- 湛江：2026.3–2028.2
- 广州：2026年内建成投用

## 行业趋势
2026年算力基建从规模扩张转向高质量、自主可控、绿色集约发展。` },
]},
// ===== 1月22日 =====
{ date: '2026-01-22', notes: [
  { title: 'RAG 检索增强生成原理', category: 'AI', technology: 'LLM', isPublic: true, content: `# RAG 检索增强生成原理\n\n## 为什么需要 RAG\n\nLLM 存在知识截止日期，且无法访问私有数据。RAG 让模型在回答时先检索相关文档，再生成答案。\n\n## 基本流程\n\n1. 索引阶段：文档切片 → Embedding → 存入向量数据库\n2. 检索阶段：用户问题 → Embedding → 向量相似度搜索 → 取 Top-K 文档\n3. 生成阶段：问题 + 检索文档 → LLM → 最终答案\n\n## 关键组件\n\n- Embedding 模型：text-embedding-ada-002、BGE、M3E\n- 向量数据库：Pinecone、Weaviate、Chroma、Milvus\n\n## 优化技巧\n\n- 文档切片策略（固定大小 vs 语义切分）\n- 混合检索（向量 + BM25）\n- 重排序（Reranker）\n- HyDE（假设文档嵌入）` },
  { title: 'LoRA 微调技术详解', category: 'AI', technology: '深度学习', isPublic: true, content: `# LoRA 微调技术详解\n\n## 背景\n\n全量微调大模型需要巨大显存，LoRA（Low-Rank Adaptation）用极少参数实现高效微调。\n\n## 核心思想\n\n预训练权重矩阵 W 冻结，在旁边加一个低秩分解矩阵 ΔW = BA：\n\n\`\`\`\nW' = W + ΔW = W + BA\n其中 B ∈ R^(d×r)，A ∈ R^(r×k)，r << min(d,k)\n\`\`\`\n\n## 参数量对比\n\n- 原矩阵：d × k 个参数\n- LoRA：r × (d + k) 个参数，r=8 时减少约 100 倍\n\n## QLoRA\n\n4bit 量化 + LoRA，单张 24GB 显卡可微调 65B 模型。` },
  { title: 'Kafka 消息队列核心原理', category: '大数据', technology: 'Kafka', isPublic: true, content: `# Kafka 消息队列核心原理\n\n## 核心概念\n\n- **Topic**：消息分类，类似数据库的表\n- **Partition**：Topic 的分区，实现并行消费\n- **Offset**：消息在分区中的位置，消费者自己维护\n- **Consumer Group**：同组消费者分摊分区，实现负载均衡\n\n## 为什么快\n\n1. 顺序写磁盘（比随机写快 100 倍）\n2. 零拷贝（sendfile 系统调用）\n3. 批量压缩发送\n4. 页缓存（OS Page Cache）\n\n## 消息可靠性\n\n\`\`\`\nacks=0：不等确认，最快但可能丢失\nacks=1：Leader 确认，平衡\nacks=all：所有副本确认，最安全\n\`\`\`\n\n## 消费语义\n\n- At most once：最多一次，可能丢失\n- At least once：至少一次，可能重复\n- Exactly once：精确一次，需要事务支持\n\n## 适用场景\n\n- 日志收集\n- 实时数据管道\n- 事件驱动架构` },
  { title: 'Claude 3.5 Sonnet 使用心得', category: 'AI', technology: 'LLM', isPublic: true, content: `# Claude 3.5 Sonnet 使用心得\n\n## 整体印象\n\nAnthropic 2024年发布，代码能力和长文本理解超过 GPT-4o，成为很多开发者的首选。\n\n## 优势\n\n- 复杂重构任务完成度高\n- 200K token 上下文窗口\n- 对复杂多步骤指令理解更准确\n\n## 局限\n\n- 不支持联网搜索\n- API 价格较高\n\n## 对比 GPT-4o\n\n代码和长文本 Claude 更强，多模态和实时性 GPT-4o 更好。` },
  { title: 'AI 绘画提示词技巧（私）', category: 'AI', technology: 'AIGC', isPublic: false, content: `# AI 绘画提示词技巧\n\n## Midjourney 基础结构\n\n[主体描述], [风格], [光线], [构图], [质量参数]\n\n## 常用质量词\n\n- masterpiece, best quality\n- 8k, ultra detailed, photorealistic\n- cinematic lighting, golden hour\n\n## 风格参考\n\n- --style raw：更真实\n- --niji 6：动漫风格\n\n## Stable Diffusion 技巧\n\n- CFG Scale 7-9：平衡创意和准确性\n- Steps 20-30：质量和速度平衡\n- ControlNet：精确控制姿势和构图` },
  { title: 'Prompt Engineering 核心技巧', category: 'AI', technology: 'LLM', isPublic: false, content: `# Prompt Engineering 核心技巧\n\n## 基础原则\n\n1. 明确具体：避免模糊，给出具体要求\n2. 提供示例：Few-shot 比 Zero-shot 效果好\n3. 角色设定：让模型扮演专家角色\n4. 分步骤：复杂任务拆解\n\n## Chain of Thought\n\n让模型一步一步思考，显著提升推理准确率。\n\n## 结构化输出\n\n明确要求 JSON 格式，包含具体字段定义。\n\n## 高级技巧\n\n- Self-consistency：多次采样取最优\n- ReAct：推理 + 行动交替\n- Tree of Thoughts：树状推理路径` },
  { title: '扩散模型原理入门', category: 'AI', technology: '深度学习', isPublic: true, content: `# 扩散模型原理入门\n\n## 核心思想\n\n正向过程：逐步向图像添加高斯噪声，直到变成纯噪声。\n反向过程：训练神经网络学习去噪，从噪声还原图像。\n\n## 代表模型\n\n- DDPM（2020）：奠基之作\n- DDIM：加速采样，减少步数\n- Stable Diffusion：潜在扩散模型，在压缩空间操作\n- DALL-E 3：结合 CLIP 文本引导\n\n## 与 GAN 对比\n\n- 扩散模型：训练稳定，多样性好，速度慢\n- GAN：速度快，但训练不稳定，模式崩溃` },
  { title: 'AI智能体人才需求激增455%，应届生月薪1.7万+', category: '计算机', technology: 'AI人才', isPublic: true, content: `# AI智能体人才需求激增455%，应届生月薪1.7万+
## 市场数据
智联招聘：春节后AI智能体相关职位同比+455%，供不应求。
- 算法工程师占比25.9%，为核心岗位
- AI产品经理9.4%，复合型人才紧缺
- 应届生研发岗平均起薪17038元

## 行业分布
计算机软件（17.7%）、互联网（12.1%）、AI（7.0%）为主；医药、科研领域需求上升。

## 地域格局
北京（19.6%）领跑，广州、上海、成都、深圳紧随其后。` },
  { title: '存储芯片价格暴涨，AI算力需求成主因', category: '计算机', technology: '存储芯片', isPublic: true, content: `# 存储芯片价格暴涨，AI算力需求成主因
## 价格走势
- DRAM、NAND Flash创2016年以来新高，部分型号涨幅369%
- 手机LPDDR5X、UFS成本涨超80%，千元机面临亏损

## 核心原因
AI算力基础设施爆发，数据中心大规模采购，导致供应紧张。
- 铠侠NAND产能售罄，紧张态势或持续至2027年

## 影响
消费电子涨价，AI训练/推理成本上升，推动液冷、存算一体等技术加速落地。` },
  { title: 'DeepSeek-R1开源一周衍生版本破550', category: 'AI', technology: 'LLM', isPublic: true, content: `# DeepSeek-R1开源一周衍生版本破550
## 社区热度
发布一周内，Hugging Face衍生版本超550个，累计下载数百万次。

## 衍生方向
- 量化版（4bit/8bit）适配消费级GPU
- 蒸馏版（更小参数）提升推理速度
- 推理优化版，强化数学、代码能力

## 行业意义
中国开源大模型获全球认可，证明低成本、强推理路线可行性，推动AI开源生态繁荣。` },
]},
// ===== 1月30日 =====
{ date: '2026-01-31', notes: [
  { title: 'Llama 3 开源模型评测', category: 'AI', technology: 'LLM', isPublic: true, content: `# Llama 3 开源模型评测\n\n## 发布信息\n\nMeta 2024年4月发布 Llama 3，提供 8B 和 70B 两个版本，完全开源可商用。\n\n## 技术改进\n\n- 词表从 32K 扩展到 128K，多语言能力提升\n- GQA（分组查询注意力）提升推理效率\n- 训练数据 15T tokens，是 Llama 2 的 7 倍\n\n## 本地部署\n\n\`\`\`bash\nollama pull llama3\nollama run llama3\n\`\`\`\n\n## 适用场景\n\n- 本地隐私敏感应用\n- 企业私有化部署\n- 研究和实验` },
  { title: 'AI Agent 架构设计', category: 'AI', technology: 'Agent', isPublic: true, content: `# AI Agent 架构设计\n\n## 什么是 Agent\n\nAgent = LLM + 工具 + 记忆 + 规划，能够自主完成复杂多步骤任务。\n\n## 核心组件\n\n- 规划：ReAct、CoT、Tree of Thoughts\n- 工具：搜索、代码执行、文件读取、外部 API\n- 记忆：短期（上下文）、长期（向量数据库）\n\n## 主流框架\n\n- LangChain：生态最丰富\n- AutoGen：多 Agent 协作\n- CrewAI：角色扮演式多 Agent\n\n## 挑战\n\n- 幻觉导致错误行动\n- 长任务中的上下文丢失\n- 工具调用的可靠性` },
  { title: 'Spark 大数据处理框架', category: '大数据', technology: 'Spark', isPublic: true, content: `# Spark 大数据处理框架\n\n## 核心概念\n\n**RDD**（弹性分布式数据集）：Spark 的基本数据抽象，不可变、可分区、可并行计算。\n\n## 为什么比 MapReduce 快\n\n- 内存计算：中间结果存内存，减少磁盘 IO\n- DAG 执行引擎：优化执行计划，减少 shuffle\n- 延迟计算：只在 action 触发时才真正执行\n\n## 核心 API\n\n\`\`\`python\nfrom pyspark.sql import SparkSession\n\nspark = SparkSession.builder.appName("demo").getOrCreate()\ndf = spark.read.csv("data.csv", header=True)\ndf.filter(df.age > 18).groupBy("city").count().show()\n\`\`\`\n\n## Spark vs Flink\n\n- Spark：微批处理，延迟秒级，生态成熟\n- Flink：真流处理，延迟毫秒级，状态管理更强\n\n## 适用场景\n\n- 离线数据分析\n- ETL 数据处理\n- 机器学习（MLlib）` },
  { title: 'Gemini 1.5 Pro 长上下文测试', category: 'AI', technology: 'LLM', isPublic: true, content: `# Gemini 1.5 Pro 长上下文测试\n\n## 发布背景\n\nGoogle 2024年发布 Gemini 1.5 Pro，支持 100 万 token 上下文，是当时最长的。\n\n## 核心技术：MoE\n\nMixture of Experts 架构，每次推理只激活部分参数，降低计算成本。\n\n## 长上下文能力\n\n- 输入整部《哈利波特》准确回答细节\n- 1 小时视频内容理解\n- 代码库级别理解\n\n## 局限\n\n- 超长上下文时"中间遗忘"问题\n- API 成本随 token 线性增长` },
  { title: 'AI 工具使用记录（私）', category: 'AI', technology: '工具', isPublic: false, content: `# AI 工具使用记录\n\n## 日常使用\n\n- Cursor：AI 代码编辑器，最常用\n- GitHub Copilot：补全还不错\n- Claude：复杂重构首选\n- ChatGPT：头脑风暴\n- Midjourney：商业质量图\n\n## 效率提升\n\n用 AI 之后：写代码速度提升约 40%，文档写作时间减少 60%。\n\n## 注意事项\n\n- 不要盲目相信 AI 输出，必须验证\n- 敏感代码不要粘贴到公共 AI\n- 保持独立思考，AI 是工具不是答案` },
  { title: '强化学习基础概念', category: 'AI', technology: '强化学习', isPublic: false, content: `# 强化学习基础概念\n\n## 核心要素\n\n- Agent：学习者/决策者\n- State：当前状态 s\n- Action：动作 a\n- Reward：奖励 r\n- Policy：策略 π(a|s)\n\n## 目标\n\n最大化累积折扣奖励：G_t = r_t + γr_{t+1} + γ²r_{t+2} + ...\n\n## 主要算法\n\n- Q-Learning：学习动作价值函数\n- Policy Gradient：直接优化策略\n- PPO：目前最常用，稳定高效\n\n## 与 LLM 的关系\n\nRLHF 用 RL 对齐 LLM，这是 ChatGPT 能对话的关键。` },
  { title: 'Mistral 系列模型解析', category: 'AI', technology: 'LLM', isPublic: true, content: `# Mistral 系列模型解析\n\n## 公司背景\n\nMistral AI，法国初创公司，2023年成立，估值迅速达到 60 亿美元。\n\n## Mistral 7B\n\n7B 参数却超越 Llama 2 13B，技术亮点：GQA 分组查询注意力、滑动窗口注意力。\n\n## Mixtral 8×7B\n\nMoE 架构，8个专家网络，每次激活2个，实际参数 12.9B 但效果接近 70B。\n\n## 适用场景\n\n- 资源受限的本地部署\n- 欧洲数据合规需求\n- 多语言应用` },
  { title: '阿里发布Qwen3-Max-Thinking超万亿参数模型', category: 'AI', technology: 'LLM', isPublic: true, content: `# 阿里发布Qwen3-Max-Thinking超万亿参数模型
## 核心突破
- 规模：超万亿参数，创阿里推理大模型纪录
- 能力：强化思维链、长文本理解、复杂推理
- 应用：适配智能体、代码生成、多模态交互

## 技术亮点
- 高效训练架构，降低万亿模型算力成本
- 与平头哥真武810E芯片深度适配，推理性能提升50%+

## 行业影响
推动大模型向“超大规模+强推理”方向发展，加速通用人工智能落地。` },
  { title: '谷歌DeepMind开放Genie 3世界模型工具', category: 'AI', technology: '世界模型', isPublic: true, content: `# 谷歌DeepMind开放Genie 3世界模型工具
## 功能特性
- 自然语言生成可交互3D虚拟世界
- 支持实时编辑、物理模拟、多智能体交互
- 用于游戏开发、机器人训练、数字孪生等场景

## 技术意义
AI从“理解文本”迈向“模拟世界”，为具身智能、通用人工智能奠定基础。` },
  { title: '国家超算互联网核心节点上线试运行', category: '计算机', technology: '超算', isPublic: true, content: `# 国家超算互联网核心节点上线试运行
## 核心参数
- 地点：河南郑州
- 算力：提供超3万卡国产AI算力，为最大单体国产算力池
- 系统：曙光scaleX万卡超集群，兼容CUDA生态

## 能力
- 支持万亿参数模型训练、高通量推理、AI for Science
- 已适配400+主流大模型，可接入上千款应用

## 价值
激活国产算力资源，打破算力垄断，为全球提供普惠AI算力服务。` },
]},
// ===== 2月8日 =====
{ date: '2026-02-08', notes: [
  { title: 'OpenAI o3 推理模型分析', category: 'AI', technology: 'LLM', isPublic: true, content: `# OpenAI o3 推理模型分析\n\n## 发布背景\n\n2024年12月，OpenAI 发布 o3，在 ARC-AGI 测试中达到 87.5%，接近人类水平（85%），震惊 AI 界。\n\n## 核心机制：扩展推理时计算\n\n不同于传统模型增加训练计算，o3 在推理时花更多计算"思考"。\n\n## ARC-AGI 意义\n\nARC-AGI 测试设计为人类容易但 AI 难的任务，考察真正的推理泛化能力。o3 的突破被认为是 AGI 进程的重要里程碑。\n\n## 成本问题\n\n高计算模式单次查询成本约 $1000，商业化仍是挑战。` },
  { title: '分布式系统 CAP 理论', category: '计算机', technology: '分布式', isPublic: true, content: `# 分布式系统 CAP 理论\n\n## CAP 定理\n\n分布式系统无法同时满足以下三点：\n\n- **C（Consistency）**：一致性，所有节点同一时刻数据相同\n- **A（Availability）**：可用性，每个请求都能收到响应\n- **P（Partition Tolerance）**：分区容错性，网络分区时系统仍能运行\n\n## 实际选择\n\n网络分区是分布式系统的常态，P 必须保证，所以只能在 C 和 A 之间取舍。\n\n- **CP 系统**：ZooKeeper、HBase，保证一致性，牺牲可用性\n- **AP 系统**：Cassandra、DynamoDB，保证可用性，最终一致\n\n## BASE 理论\n\nCAP 的实践延伸：\n- Basically Available：基本可用\n- Soft State：软状态，允许中间状态\n- Eventually Consistent：最终一致性\n\n## 实际案例\n\n电商下单：库存扣减需要强一致（CP），商品浏览可以最终一致（AP）。` },
  { title: '知识图谱与 LLM 结合', category: 'AI', technology: 'LLM', isPublic: true, content: `# 知识图谱与 LLM 结合\n\n## 知识图谱基础\n\n三元组形式：（实体，关系，实体），例：（北京，是首都，中国）\n\n## LLM 的局限\n\n- 事实性错误（幻觉）\n- 知识更新困难\n- 推理链不透明\n\n## GraphRAG\n\nMicrosoft 提出，将文档构建为知识图谱，检索时利用图结构，全局问题回答更好。\n\n## 工具\n\n- Neo4j：图数据库\n- LlamaIndex：GraphRAG 实现\n- Microsoft GraphRAG：开源实现` },
  { title: 'RLHF 训练流程详解', category: 'AI', technology: '深度学习', isPublic: true, content: `# RLHF 训练流程详解\n\n## 三个阶段\n\n1. 监督微调（SFT）：用高质量对话数据微调预训练模型\n2. 训练奖励模型（RM）：人工标注偏好排序，训练 RM 预测人类偏好分数\n3. PPO 强化学习：用奖励模型作为环境，优化 SFT 模型\n\n## DPO 替代方案\n\nDirect Preference Optimization，直接从偏好数据优化，无需单独训练 RM，更简单稳定。\n\n## 挑战\n\n- 奖励黑客：模型找到高分但不好的回答\n- 人工标注成本高` },
  { title: '春节 AI 使用总结（私）', category: 'AI', technology: '总结', isPublic: false, content: `# 春节 AI 使用总结\n\n## 这周用 AI 做了什么\n\n- 用 Claude 帮我写了一篇技术博客草稿\n- 用 Midjourney 生成了几张新年贺卡\n- 用 ChatGPT 规划了 Q1 学习计划\n- 用 Cursor 重构了一段老代码\n\n## 感受\n\nAI 工具已经深度融入日常工作，最大的价值不是替代思考，而是降低"开始"的门槛。\n\n## 下周计划\n\n- 尝试搭建本地 RAG 系统\n- 学习 LangChain Agent 开发` },
  { title: 'AI 安全与对齐问题思考', category: 'AI', technology: 'AI安全', isPublic: false, content: `# AI 安全与对齐问题思考\n\n## 对齐问题\n\n如何确保 AI 系统的目标和行为符合人类价值观？\n\n## 主要风险\n\n近期：深度伪造、自动化虚假信息、隐私侵犯、就业替代。\n长期：超级智能的目标错位、权力集中、失控风险。\n\n## 主要研究方向\n\n- RLHF：人类反馈对齐\n- Constitutional AI：Anthropic 的方法，用原则约束\n- 可解释性：理解模型内部机制\n- 红队测试：主动寻找漏洞` },
  { title: 'Word2Vec 词向量原理', category: 'AI', technology: '深度学习', isPublic: true, content: `# Word2Vec 词向量原理\n\n## 背景\n\n2013年 Google 提出，将词语映射为稠密向量，捕捉语义关系。\n\n## 两种架构\n\n- CBOW：用上下文词预测中心词\n- Skip-gram：用中心词预测上下文词，对低频词效果更好\n\n## 神奇的向量运算\n\nvec(国王) - vec(男人) + vec(女人) ≈ vec(女王)\n\n## 后续发展\n\n- GloVe：全局统计信息\n- FastText：子词信息\n- BERT：上下文相关词向量，彻底解决多义问题` },
  { title: '字节跳动发布豆包4.0多模态通用大模型', category: 'AI', technology: 'LLM', isPublic: true, content: `# 字节跳动发布豆包4.0多模态通用大模型
## 核心升级
- 上下文窗口提升至200万token，支持整本书、百万行代码库全量理解
- 多模态能力升级，支持长视频、3D点云、多页文档统一理解与生成
- 推理速度提升3倍，复杂数学、代码任务准确率提升45%

## 技术亮点
- 自研MoE架构，单token激活参数仅36B，综合性能对标GPT-4.5
- 端云协同推理框架，支持手机端离线运行7B轻量化版本
- 原生Agent能力，可自主完成多步骤复杂任务

## 生态开放
同步开放API接口与企业私有化部署方案，已服务超200万开发者。` },
  { title: '国家网信办发布《生成式AI服务管理规范补充细则》', category: '计算机', technology: 'AI合规', isPublic: true, content: `# 国家网信办发布《生成式AI服务管理规范补充细则》
## 核心要求
- 明确AI生成内容水印强制规范，文本、图像、视频、音频均需嵌入可追溯水印
- 细化AI训练数据合规要求，禁止未经授权使用受版权保护的文本、图像、音视频内容
- 强化未成年人保护，禁止生成危害未成年人身心健康的内容，需设置青少年模式

## 监管要求
- 生成式AI服务提供者需每季度提交安全评估报告
- 建立7×24小时应急响应机制，违规内容1小时内处置完毕
- 明确API接口提供者的连带责任，需对调用方的使用行为进行监管

## 行业影响
推动生成式AI行业规范化发展，强化知识产权保护，促进行业健康有序发展。` },
  { title: '国内首个万卡全液冷智算集群在宁夏正式投运', category: '计算机', technology: '算力基建', isPublic: true, content: `# 国内首个万卡全液冷智算集群在宁夏正式投运
## 核心参数
- 总算力达12800PFlops@FP16，搭载10000张英伟达H200 GPU
- 全浸没式液冷技术，PUE低至1.08，年节电超1.2亿度
- 采用自研高速互联架构，多卡通信延迟降低40%，带宽提升2倍

## 能力定位
- 支持万亿参数大模型全流程训练，训练效率提升300%
- 面向全国科研机构、企业提供普惠AI算力服务
- 配套完整的大模型开发工具链，降低AI开发门槛

## 战略意义
助力“东数西算”工程落地，打造西部算力枢纽核心节点，缓解东部算力紧张局面。` },
  { title: '星环科技发布分布式大数据平台TDH 9.0', category: '大数据', technology: '大数据平台', isPublic: true, content: `# 星环科技发布分布式大数据平台TDH 9.0
## 核心升级
- 存算分离架构全面优化，存储成本降低60%，查询性能提升200%
- 原生集成AI大模型能力，支持自然语言转SQL、智能数据治理、异常检测
- 实时计算引擎升级，单集群支持百万级TPS，端到端延迟低至10ms

## 兼容性
- 全面兼容Hadoop、Spark、Flink生态，业务无缝迁移
- 支持国产化CPU、操作系统、服务器，完成全栈信创适配
- 支持混合云部署，实现跨云数据统一管理与调度

## 应用场景
已在金融、政府、能源、制造等行业超3000家企业落地应用。` },
  { title: '思科发布新一代AI驱动广域网安全平台', category: '网络工程', technology: '网络安全', isPublic: true, content: `# 思科发布新一代AI驱动广域网安全平台
## 核心能力
- 基于大模型的流量智能分析，零日攻击识别准确率达99.8%
- 集成SD-WAN与SASE能力，实现全球分支网络一键部署与安全管控
- AI智能选路，广域网访问延迟降低35%，丢包率优化至0.1%以下

## 技术亮点
- 联邦学习架构，在不泄露用户数据的前提下实现全球威胁情报共享
- 自动化事件响应，攻击处置时间从小时级降至分钟级
- 支持多云、混合云网络统一管理，适配AWS、Azure、阿里云等主流云厂商

## 行业价值
为企业全球化业务提供安全、稳定、高效的广域网解决方案，降低网络运维成本60%。` },
]},
// ===== 2月14日 =====
{ date: '2026-02-14', notes: [
  { title: 'Manus AI Agent 发布分析', category: 'AI', technology: 'Agent', isPublic: true, content: `# Manus AI Agent 发布分析\n\n## 背景\n\n2025年3月，国内团队发布 Manus，号称首个真正自主的通用 AI Agent，能独立完成复杂任务，无需人工干预。\n\n## 核心能力\n\n- 自主浏览网页、操作电脑\n- 编写并执行代码\n- 处理文件和数据\n- 多步骤任务规划和执行\n\n## 技术架构猜测\n\n- 基于 Claude 3.5 等强力底座\n- 工具调用 + 沙箱执行环境\n- 多 Agent 协作完成子任务\n\n## 与 OpenAI Operator 对比\n\n- Manus：更开放，任务范围更广\n- Operator：更保守，专注网页操作\n\n## 意义\n\nAgent 时代正式到来，AI 从"回答问题"进化到"完成任务"。` },
  { title: 'Redis 数据结构与应用场景', category: '数据库', technology: 'Redis', isPublic: true, content: `# Redis 数据结构与应用场景\n\n## 五种基本数据结构\n\n| 类型 | 底层实现 | 典型场景 |\n|------|---------|----------|\n| String | SDS | 缓存、计数器、分布式锁 |\n| Hash | ziplist/hashtable | 用户信息、购物车 |\n| List | quicklist | 消息队列、最新列表 |\n| Set | intset/hashtable | 标签、共同好友 |\n| ZSet | ziplist/skiplist | 排行榜、延迟队列 |\n\n## 分布式锁\n\n\`\`\`\nSET lock_key unique_value NX PX 30000\n// NX: 不存在才设置\n// PX: 过期时间毫秒\n\`\`\`\n\n## 缓存穿透/击穿/雪崩\n\n- 穿透：查不存在的 key → 布隆过滤器\n- 击穿：热点 key 过期 → 互斥锁重建\n- 雪崩：大量 key 同时过期 → 随机过期时间\n\n## 持久化\n\n- RDB：定期快照，恢复快，可能丢数据\n- AOF：记录每条命令，数据安全，文件大` },
  { title: 'Vibe Coding 趋势观察', category: 'AI', technology: 'AIGC', isPublic: true, content: `# Vibe Coding 趋势观察\n\n## 什么是 Vibe Coding\n\n2025年 Andrej Karpathy 提出的概念：完全依赖 AI 写代码，人只负责描述需求和验收结果，不看具体代码。\n\n## 代表工具\n\n- **Cursor**：AI 代码编辑器，Agent 模式\n- **Bolt.new**：自然语言生成全栈应用\n- **v0**：Vercel 出品，生成 React 组件\n- **Lovable**：生成完整 SaaS 应用\n\n## 适用场景\n\n- 快速原型验证\n- 个人项目和 side project\n- 非核心业务代码\n\n## 局限性\n\n- 复杂业务逻辑容易出错\n- 生成代码质量参差不齐\n- 调试困难（不理解代码）\n- 安全性难以保证\n\n## 我的看法\n\nVibe Coding 降低了编程门槛，但不会替代真正的工程师。理解代码仍然重要。` },
  { title: 'Cursor AI 编辑器深度使用', category: 'AI', technology: '工具', isPublic: false, content: `# Cursor AI 编辑器深度使用\n\n## 核心功能\n\n- Tab 补全：比 Copilot 更智能的多行补全\n- Cmd+K：内联编辑，选中代码直接修改\n- Cmd+L：对话模式，解释/重构代码\n- Agent 模式：自主完成多文件修改\n\n## 最佳实践\n\n1. 在 .cursorrules 文件定义项目规范\n2. 用 @file 引用具体文件上下文\n3. Agent 模式处理大型重构\n4. 善用 Composer 多文件编辑\n\n## 常用 Prompt\n\n- "重构这个函数，提高可读性"\n- "添加错误处理和类型注解"\n- "写单元测试覆盖边界情况"\n- "解释这段代码的逻辑"\n\n## 费用\n\nPro 版 $20/月，包含 500 次 fast 请求，超出后降速。对重度用户来说很值。` },
  { title: 'Docker 容器化核心概念', category: '计算机', technology: 'Docker', isPublic: false, content: `# Docker 容器化核心概念\n\n## 容器 vs 虚拟机\n\n- 虚拟机：完整 OS，隔离性强，启动慢，资源占用大\n- 容器：共享宿主 OS 内核，启动秒级，轻量\n\n## 核心概念\n\n- **Image**：只读模板，分层存储\n- **Container**：Image 的运行实例\n- **Dockerfile**：构建 Image 的脚本\n- **Registry**：镜像仓库（Docker Hub）\n\n## 常用命令\n\n\`\`\`bash\ndocker build -t myapp:1.0 .\ndocker run -d -p 3000:3000 myapp:1.0\ndocker ps\ndocker logs container_id\ndocker exec -it container_id bash\n\`\`\`\n\n## Dockerfile 最佳实践\n\n- 使用多阶段构建减小镜像体积\n- 合并 RUN 命令减少层数\n- 使用 .dockerignore 排除无用文件\n- 非 root 用户运行应用` },
  { title: 'GPT-4.5 发布解读', category: 'AI', technology: 'LLM', isPublic: true, content: `# GPT-4.5 发布解读\n\n## 发布信息\n\n2025年2月，OpenAI 发布 GPT-4.5，定位为 GPT-4 和 GPT-5 之间的过渡版本。\n\n## 主要改进\n\n- 情感智能提升，对话更自然流畅\n- 减少幻觉，事实准确性提高\n- 更好的指令遵循能力\n- 知识截止日期更新到 2024年\n\n## 定价\n\n输入 $75/M tokens，输出 $150/M tokens，是 GPT-4o 的 15 倍，主要面向企业。\n\n## 争议\n\n部分用户认为提升不明显，性价比不如 Claude 3.5 Sonnet。\n\n## 意义\n\n表明 OpenAI 在 GPT-5 发布前持续迭代，保持竞争压力。` },
  { title: '学习进度记录（私）', category: 'AI', technology: '规划', isPublic: false, content: `# 学习进度记录\n\n## 本周完成\n\n- 读完《动手学深度学习》第 3-5 章\n- 跑通了 MNIST 手写数字识别\n- 了解了 LoRA 微调原理\n\n## 遇到的问题\n\n- CUDA 版本和 PyTorch 版本不兼容，折腾了半天\n- Transformer 的位置编码还没完全理解\n\n## 下周计划\n\n- 实现一个简单的 Transformer\n- 尝试用 Hugging Face 微调一个小模型\n- 看 Andrej Karpathy 的 nanoGPT 视频` },
  { title: '百度发布文心一言5.0推理增强版', category: 'AI', technology: 'LLM', isPublic: true, content: `# 百度发布文心一言5.0推理增强版
## 核心突破
- 自研“深度思考”架构，数学、编程、逻辑推理任务准确率提升55%，AIME测试得分超GPT-4o
- 上下文窗口扩展至128万token，支持超长文档精准问答与逻辑梳理
- 多模态生成能力升级，支持4K视频生成、3D模型生成、交互式内容创作

## 技术创新
- 飞桨深度学习框架深度适配，训练与推理效率提升200%
- 知识增强与检索增强融合，幻觉率降低70%，事实性回答准确率达98.5%
- 端侧推理优化，手机端可流畅运行14B轻量化模型

## 商业化进展
企业级服务已覆盖金融、制造、政务、教育等20余个行业，服务超10万家企业。` },
  { title: '工信部印发《算力网络高质量发展行动计划（2026-2028年）》', category: '网络工程', technology: '算力网络', isPublic: true, content: `# 工信部印发《算力网络高质量发展行动计划（2026-2028年）》
## 发展目标
到2028年，建成全国一体化算力网络体系，实现“算力像水电一样随用随取”。
- 全国算力总规模超300EFLOPS，智能算力占比超85%
- 算力网络时延控制在10ms以内，东西向带宽提升10倍
- 绿色低碳算力占比超60%，新建数据中心PUE普遍低于1.2

## 核心任务
- 建设“东数西算”八大枢纽节点间高速直连网络
- 推动算力、网络、存储、安全一体化融合发展
- 突破算力路由、无损网络、算力感知等核心技术
- 完善算力网络标准体系，推动跨行业、跨区域算力互联互通

## 保障措施
- 加大财政资金支持，引导社会资本参与算力网络建设
- 建立算力网络监测与评估体系，动态优化发展策略
- 加强国际合作，推动算力网络标准与全球接轨。` },
  { title: '开源向量数据库Milvus 3.0正式发布', category: '大数据', technology: '向量数据库', isPublic: true, content: `# 开源向量数据库Milvus 3.0正式发布
## 核心升级
- 向量检索性能提升10倍，支持百亿级向量毫秒级查询
- 原生支持混合检索，向量+关键词+属性过滤一站式完成
- 存储引擎重构，采用存算分离架构，存储成本降低70%

## 新特性
- 支持向量增量更新与实时写入，数据写入延迟低至50ms
- 内置Reranker重排序模型，检索准确率提升30%
- 完善的多租户与权限管理体系，适配企业级生产环境
- 全面兼容PyTorch、TensorFlow、LangChain等主流AI生态

## 社区数据
GitHub星标突破3万，累计下载量超5000万次，全球超2000家企业用于生产环境。` },
  { title: '商汤科技发布日日新SenseNova 4.0大模型体系', category: 'AI', technology: '多模态大模型', isPublic: true, content: `# 商汤科技发布日日新SenseNova 4.0大模型体系
## 体系构成
- 通用大模型：7B/14B/70B/180B全系列参数版本，综合性能对标GPT-4o
- 视觉大模型：支持4K图像理解、视频内容分析、遥感影像解译，行业场景适配性领先
- 数字人大模型：自然语言驱动超写实数字人，表情、动作、口型同步准确率达99%
- 工业大模型：面向制造、能源、交通等行业，支持缺陷检测、工艺优化、设备故障预测

## 技术亮点
- 自研大模型训练框架，支持万卡集群高效训练，线性加速比达95%
- 端云协同推理技术，适配国产化芯片与终端设备
- 低代码开发平台，零代码即可完成大模型应用搭建

## 落地成果
已在智慧城市、智能制造、智慧医疗、智慧交通等领域落地超100个标杆项目。` },
  { title: '全球首个AI原生SD-WAN解决方案正式商用', category: '网络工程', technology: '广域网', isPublic: true, content: `# 全球首个AI原生SD-WAN解决方案正式商用
## 核心特性
- 大模型驱动的智能网络调度，可根据业务类型、链路质量、应用需求动态调整路由策略
- 预测性网络优化，提前识别链路拥塞、故障风险，自动切换最优路径，业务中断率降低90%
- 应用级智能管控，精准识别3000+应用，实现带宽智能分配与QoS保障

## 技术创新
- 自研网络大模型，可处理百万级网络节点的实时数据，实现全网态势感知与智能决策
- 零接触部署，分支机构设备上电即联网，配置时间从天级降至分钟级
- 原生集成安全能力，实现SASE架构一体化，无需额外部署安全设备

## 应用效果
企业广域网运维成本降低70%，关键业务访问速度提升40%，已服务全球超500家大中型企业。` },
]},
// ===== 2月19日 =====
{ date: '2026-02-19', notes: [
  { title: 'Claude 3.7 Sonnet 发布', category: 'AI', technology: 'LLM', isPublic: true, content: `# Claude 3.7 Sonnet 发布\n\n## 发布信息\n\n2025年2月，Anthropic 发布 Claude 3.7 Sonnet，是首个支持"扩展思考"（Extended Thinking）的 Claude 模型。\n\n## 核心特性\n\n### 扩展思考模式\n\n类似 OpenAI o1，模型在回答前进行深度推理，可见思考过程。\n\n- 标准模式：快速回答\n- 扩展思考：深度推理，适合复杂问题\n\n### 代码能力\n\nSWE-bench 得分 62.3%，超越所有竞品，成为最强代码模型。\n\n## 实际体验\n\n- 复杂算法题解题能力显著提升\n- 多步骤推理更可靠\n- 扩展思考模式下 token 消耗大\n\n## 定价\n\n与 Claude 3.5 Sonnet 相同，性价比极高。` },
  { title: '操作系统进程与线程', category: '计算机', technology: '操作系统', isPublic: true, content: `# 操作系统进程与线程\n\n## 进程 vs 线程\n\n- **进程**：资源分配的基本单位，独立内存空间\n- **线程**：CPU 调度的基本单位，共享进程内存\n\n## 线程同步\n\n### 互斥锁（Mutex）\n\n同一时刻只有一个线程访问临界区。\n\n### 信号量（Semaphore）\n\n控制同时访问资源的线程数量。\n\n### 条件变量\n\n线程等待某个条件满足后再继续执行。\n\n## 死锁四个条件\n\n1. 互斥：资源不能共享\n2. 持有并等待：持有资源同时等待其他资源\n3. 不可剥夺：资源只能主动释放\n4. 循环等待：形成等待环\n\n## 解决死锁\n\n- 预防：破坏四个条件之一\n- 避免：银行家算法\n- 检测恢复：定期检测，强制释放\n\n## Java 中的线程\n\n\`\`\`java\n// 推荐使用线程池\nExecutorService pool = Executors.newFixedThreadPool(4);\npool.submit(() -> System.out.println("task"));\n\`\`\`` },
  { title: 'Grok 3 发布与测评', category: 'AI', technology: 'LLM', isPublic: true, content: `# Grok 3 发布与测评\n\n## 发布信息\n\n2025年2月，xAI 发布 Grok 3，马斯克称其为"地球上最智能的 AI"。\n\n## 训练规模\n\n使用 10 万张 H100 GPU 训练，算力是 Grok 2 的 10 倍。\n\n## 性能表现\n\n- 数学推理：AIME 2025 得分领先\n- 代码：接近 Claude 3.7 水平\n- 科学：GPQA 测试表现优秀\n\n## 特色功能\n\n- DeepSearch：深度网络搜索\n- Think 模式：扩展推理\n- 与 X 平台深度集成\n\n## 争议\n\n马斯克的"最智能"说法被业界质疑，实际测评中与 Claude 3.7、GPT-4.5 互有胜负。` },
  { title: '本地 AI 部署实践（私）', category: 'AI', technology: '工具', isPublic: false, content: `# 本地 AI 部署实践\n\n## 为什么本地部署\n\n- 数据隐私：代码和敏感数据不上传\n- 成本：无 API 费用\n- 离线可用\n\n## Ollama 部署\n\n\`\`\`bash\n# 安装\ncurl -fsSL https://ollama.ai/install.sh | sh\n\n# 拉取模型\nollama pull qwen2.5:7b\nollama pull deepseek-r1:7b\n\n# 运行\nollama run qwen2.5:7b\n\`\`\`\n\n## 推荐模型（8GB 显存）\n\n- Qwen2.5 7B：中文最强\n- DeepSeek-R1 7B：推理能力强\n- Llama 3.1 8B：综合能力好\n\n## Open WebUI\n\n本地 ChatGPT 界面，支持多模型切换，强烈推荐。\n\n## 性能对比\n\n本地 7B 模型约等于 GPT-3.5 水平，日常任务够用。` },
  { title: 'TCP/IP 协议栈精要', category: '计算机', technology: '网络', isPublic: false, content: `# TCP/IP 协议栈精要\n\n## 四层模型\n\n- 应用层：HTTP、HTTPS、DNS、FTP\n- 传输层：TCP、UDP\n- 网络层：IP、ICMP\n- 链路层：以太网、WiFi\n\n## TCP 三次握手\n\n\`\`\`\n客户端 → SYN → 服务端\n客户端 ← SYN+ACK ← 服务端\n客户端 → ACK → 服务端\n\`\`\`\n\n为什么三次？两次无法确认客户端收到服务端的 SYN+ACK。\n\n## TCP 四次挥手\n\n关闭连接需要四次，因为 TCP 是全双工，两个方向需要分别关闭。\n\n## TCP vs UDP\n\n- TCP：可靠、有序、面向连接，适合文件传输\n- UDP：不可靠、无序、无连接，适合视频直播、游戏\n\n## HTTPS 握手\n\n1. TCP 三次握手\n2. TLS 握手（证书验证、密钥协商）\n3. 加密通信` },
  { title: 'Qwen2.5 系列模型解析', category: 'AI', technology: 'LLM', isPublic: true, content: `# Qwen2.5 系列模型解析\n\n## 背景\n\n阿里云 2024年9月发布 Qwen2.5 系列，中文能力最强的开源模型之一。\n\n## 系列版本\n\n- Qwen2.5 0.5B ~ 72B：通用语言模型\n- Qwen2.5-Coder：代码专用，72B 版本超越 GPT-4o\n- Qwen2.5-Math：数学专用\n- QwQ-32B：推理模型，对标 o1\n\n## 中文能力\n\n在中文理解、生成、翻译等任务上，Qwen2.5 72B 超越大多数闭源模型。\n\n## 本地部署\n\n\`\`\`bash\nollama pull qwen2.5:7b\nollama pull qwen2.5:14b\n\`\`\`\n\n## 适用场景\n\n- 中文内容创作\n- 代码辅助（Coder 版本）\n- 企业私有化部署` },
  { title: '周记：AI 工具链整理（私）', category: 'AI', technology: '总结', isPublic: false, content: `# 周记：AI 工具链整理\n\n## 当前工具链\n\n### 编程\n- Cursor（主力）+ Claude 3.7 API\n- 本地 Qwen2.5-Coder 7B（离线备用）\n\n### 写作\n- ChatGPT 4o（头脑风暴）\n- Claude（长文档）\n\n### 图像\n- Midjourney（商业图）\n- ComfyUI + SDXL（本地定制）\n\n## 月度 AI 花费\n\n- Cursor Pro: $20\n- Claude API: ~$15\n- Midjourney: $10\n- 合计: ~$45/月\n\n## 感受\n\n工具越来越多，但真正提效的还是那几个。\n关键是找到适合自己工作流的组合，而不是追新。` },
  { title: 'OpenAI发布Sora 2.0视频生成大模型', category: 'AI', technology: 'AIGC', isPublic: true, content: `# OpenAI发布Sora 2.0视频生成大模型
## 核心升级
- 支持4K 60fps超长视频生成，最长时长提升至10分钟，画面连贯性、细节精度大幅提升
- 支持文本、图像、视频多模态输入，可实现视频续写、风格转换、画面编辑、特效添加
- 人物动作、物理规律一致性显著优化，长视频无逻辑崩坏，人物面部无畸变

## 技术突破
- 自研3D世界模型，可精准模拟物理规律、光影变化、材质质感
- 动态时序注意力机制，解决长视频时序一致性问题
- 视频压缩编码优化，生成效率提升5倍，推理成本降低80%

## 开放计划
逐步向企业级客户开放API接口，同步开放视频编辑、水印嵌入、内容审核等配套工具。` },
  { title: '华为发布昇腾910B Max AI训练芯片', category: '计算机', technology: 'AI芯片', isPublic: true, content: `# 华为发布昇腾910B Max AI训练芯片
## 核心参数
- 采用7nm先进工艺，FP8算力达3200 TOPS，FP16算力达1600 TFLOPS
- 集成128GB HBM3e高带宽显存，显存带宽达3.2TB/s
- 支持多芯片级联，单集群可支持万卡规模分布式训练，线性加速比达92%

## 性能表现
- 训练性能比上一代昇腾910B提升200%，推理性能提升150%
- 与英伟达H200相比，万亿参数大模型训练成本降低40%
- 全面适配PyTorch、TensorFlow等主流框架，兼容CANN异构计算架构

## 生态进展
已适配超500个主流大模型，包括Llama、Qwen、DeepSeek、百川等，完成全栈国产化适配。` },
]},
// ===== 2月27日 =====
{ date: '2026-02-27', notes: [
  { title: 'GPT-5 发布前瞻', category: 'AI', technology: 'LLM', isPublic: true, content: `# GPT-5 发布前瞻\n\n## 已知信息\n\n2025年初，OpenAI CEO Sam Altman 多次暗示 GPT-5 即将发布，称其为"令人难以置信的进步"。\n\n## 预期改进\n\n- 推理能力大幅提升，整合 o3 的思维链\n- 多模态能力增强（视频、音频）\n- 更长的上下文窗口\n- 更低的幻觉率\n\n## 竞争格局\n\nGPT-5 发布时将面临：\n- Claude 3.7（Anthropic）\n- Gemini 2.0 Ultra（Google）\n- Grok 3（xAI）\n- DeepSeek V3/R2（深度求索）\n\n## 行业影响\n\n每次 GPT 大版本发布都会重塑竞争格局，期待 GPT-5 带来新的范式突破。` },
  { title: 'Hadoop 生态系统概览', category: '大数据', technology: 'Hadoop', isPublic: true, content: `# Hadoop 生态系统概览\n\n## 核心组件\n\n- **HDFS**：分布式文件系统，数据分块存储，默认 3 副本\n- **MapReduce**：分布式计算框架，Map + Shuffle + Reduce\n- **YARN**：资源管理器，调度计算任务\n\n## 生态工具\n\n| 工具 | 用途 |\n|------|------|\n| Hive | SQL 查询 HDFS 数据 |\n| HBase | 列式 NoSQL 数据库 |\n| Spark | 内存计算，替代 MapReduce |\n| Kafka | 实时数据流 |\n| Flink | 流批一体计算 |\n| Sqoop | 关系型数据库导入导出 |\n\n## HDFS 读写流程\n\n写入：客户端 → NameNode（获取 DataNode 列表）→ 流水线写入 DataNode\n读取：客户端 → NameNode（获取块位置）→ 就近读取 DataNode\n\n## 现状\n\nHadoop 本身使用减少，但 HDFS 和 YARN 仍是大数据基础设施核心。Spark 已基本替代 MapReduce。` },
  { title: 'AI 编程助手横向对比', category: 'AI', technology: '工具', isPublic: true, content: `# AI 编程助手横向对比\n\n## 主流工具\n\n### Cursor\n\n- 优势：Agent 模式强，多文件编辑，.cursorrules 定制\n- 劣势：$20/月，免费额度有限\n\n### GitHub Copilot\n\n- 优势：IDE 集成好，企业版有代码库感知\n- 劣势：补全为主，Agent 能力弱\n\n### Windsurf（Codeium）\n\n- 优势：免费额度多，Cascade 模式不错\n- 劣势：生态不如 Cursor\n\n### Claude（直接用 API）\n\n- 优势：代码质量最高，理解复杂需求\n- 劣势：没有 IDE 集成，需要手动复制\n\n## 我的选择\n\n主力 Cursor + Claude 3.7，复杂架构设计直接问 Claude，日常编码用 Cursor Agent。` },
  { title: '算法刷题记录（私）', category: 'AI', technology: '算法', isPublic: false, content: `# 算法刷题记录\n\n## 本周题目\n\n### 动态规划\n\n- LeetCode 72：编辑距离 ✅\n- LeetCode 300：最长递增子序列 ✅\n- LeetCode 1143：最长公共子序列 ✅\n\n### 图论\n\n- LeetCode 207：课程表（拓扑排序）✅\n- LeetCode 210：课程表 II ✅\n\n## 总结\n\nDP 的关键是找状态转移方程，先想清楚 dp[i] 的含义。\n\n图论题多用 BFS/DFS，拓扑排序用于检测环。\n\n## 下周计划\n\n- 二叉树系列（前中后序、层序）\n- 回溯算法（全排列、子集）` },
  { title: 'LLM 推理优化技术', category: 'AI', technology: '深度学习', isPublic: true, content: `# LLM 推理优化技术\n\n## 量化（Quantization）\n\n将模型权重从 FP32 降低精度：\n- FP16：显存减半，精度损失极小\n- INT8：显存再减半，轻微精度损失\n- INT4：显存减至 1/8，适合本地部署\n\n## KV Cache\n\n缓存已计算的 Key-Value，避免重复计算，推理速度提升 2-4 倍。\n\n## 投机采样（Speculative Decoding）\n\n用小模型快速生成草稿，大模型并行验证，速度提升 2-3 倍。\n\n## 连续批处理（Continuous Batching）\n\n动态合并不同长度的请求，提高 GPU 利用率。\n\n## vLLM\n\n目前最流行的 LLM 推理框架，PagedAttention 技术大幅提升吞吐量。\n\n\`\`\`python\nfrom vllm import LLM\nllm = LLM(model="meta-llama/Llama-3-8b")\noutputs = llm.generate(["你好，介绍一下自己"])\n\`\`\`` },
  { title: 'Kubernetes 核心概念', category: '计算机', technology: 'K8s', isPublic: false, content: `# Kubernetes 核心概念\n\n## 为什么需要 K8s\n\n容器编排：自动部署、扩缩容、故障恢复、负载均衡。\n\n## 核心对象\n\n- **Pod**：最小部署单元，包含一个或多个容器\n- **Deployment**：管理 Pod 副本，支持滚动更新\n- **Service**：为 Pod 提供稳定的网络访问入口\n- **Ingress**：HTTP 路由，将外部流量导入集群\n- **ConfigMap/Secret**：配置和密钥管理\n\n## 常用命令\n\n\`\`\`bash\nkubectl get pods\nkubectl describe pod pod-name\nkubectl logs pod-name\nkubectl exec -it pod-name -- bash\nkubectl apply -f deployment.yaml\n\`\`\`\n\n## 自动扩缩容\n\nHPA（Horizontal Pod Autoscaler）根据 CPU/内存自动调整 Pod 数量。` },
  { title: 'AI 在教育领域的应用', category: 'AI', technology: 'AI应用', isPublic: true, content: `# AI 在教育领域的应用\n\n## 个性化学习\n\n- 根据学生水平动态调整难度\n- 识别知识薄弱点，针对性练习\n- 自适应学习路径规划\n\n## 代表产品\n\n- **Khan Academy Khanmigo**：AI 辅导老师，苏格拉底式提问\n- **Duolingo Max**：AI 对话练习，错误解析\n- **Coursera Coach**：课程辅助答疑\n\n## AI 批改作业\n\n- 客观题：准确率接近 100%\n- 主观题：可以给出结构化反馈\n- 代码作业：自动测试 + 代码审查\n\n## 挑战\n\n- 学生依赖 AI 不独立思考\n- 作弊检测困难\n- 教师角色转变\n\n## 未来展望\n\nAI 不会替代老师，但会让每个学生都能获得个性化辅导。` },
  { title: '中国信通院发布《大模型安全评测白皮书2026》', category: 'AI', technology: 'AI安全', isPublic: true, content: `# 中国信通院发布《大模型安全评测白皮书2026》
## 评测体系
构建了涵盖内容安全、数据安全、算法安全、系统安全、伦理合规5大维度，28个二级指标，120+三级指标的大模型安全评测体系。

## 核心发现
- 超60%的大模型存在不同程度的幻觉问题，事实性回答错误率最高达35%
- 近40%的大模型存在提示注入漏洞，可被诱导生成违规内容
- 仅20%的大模型建立了完善的训练数据合规审查机制
- 国产大模型在中文安全对齐、合规性方面整体优于海外模型

## 标准建设
同步发布《生成式大模型安全评测规范》，为行业提供统一的安全评测标准与方法。

## 行业建议
- 建立全生命周期安全管理体系，覆盖训练、微调、推理、部署全流程
- 加强大模型可解释性、对齐技术研究，从根源上降低安全风险
- 完善行业自律机制，推动大模型安全技术与产业协同发展。` },
  { title: '阿里云发布Serverless大数据计算服务MaxCompute 4.0', category: '大数据', technology: '云原生大数据', isPublic: true, content: `# 阿里云发布Serverless大数据计算服务MaxCompute 4.0
## 核心升级
- 全Serverless架构，按需付费，资源秒级扩缩容，无需提前规划集群规模
- 计算引擎全面优化，SQL查询性能提升300%，Spark作业性能提升200%
- 存储成本降低70%，支持冷热数据分层存储，智能生命周期管理

## 新特性
- 原生集成AI大模型能力，支持自然语言转SQL、智能数据治理、异常检测、预测分析
- 湖仓一体架构，全面兼容开源数据湖格式，实现离线、实时、AI计算统一引擎
- 企业级安全能力，细粒度权限管控、数据脱敏、审计日志，满足等保三级合规要求
- 跨区域、跨账号数据统一管理，支持多云数据互联互通

## 客户规模
已服务全球超1万家企业，覆盖互联网、金融、零售、制造、政务等多个行业。` },
  { title: '奇安信发布AI驱动的零信任安全架构3.0', category: '网络工程', technology: '零信任安全', isPublic: true, content: `# 奇安信发布AI驱动的零信任安全架构3.0
## 核心升级
- 大模型驱动的持续信任评估，基于用户行为、设备状态、访问环境、业务场景动态调整信任等级，攻击识别准确率达99.9%
- 自适应访问控制，可根据风险等级自动调整访问权限，实现最小权限精准管控
- 原生集成数据安全能力，实现访问过程中的数据脱敏、泄露防护、审计追溯

## 技术亮点
- 自研安全大模型，可实时分析海量安全日志，精准识别复杂攻击与异常行为
- 端到端加密传输，支持国密算法，满足国产化合规要求
- 多云、混合云、边缘节点统一纳管，实现全场景零信任覆盖
- 低代码集成能力，可快速对接企业现有业务系统，无需改造业务架构

## 应用效果
企业安全事件发生率降低90%，运维成本降低60%，已在政府、金融、能源、运营商等行业超2000家企业落地。` },
{ title: 'Meta发布Llama 4 开源大模型系列', category: 'AI', technology: 'LLM', isPublic: true, content: `# Meta发布Llama 4 开源大模型系列
## 系列版本
- 轻量化版本：8B/14B，主打端侧部署与边缘推理，性能超越Llama 3 70B
- 通用版本：70B/128B，综合性能对标GPT-4o，支持128万token上下文
- MoE版本：400B专家模型，单token激活参数仅48B，性能超越GPT-4.5

## 核心升级
- 训练数据量达30T tokens，是Llama 3的2倍，多语言能力大幅提升
- 分组查询注意力（GQA）优化，推理速度提升2倍，显存占用降低30%
- 指令遵循、工具调用、代码生成能力显著优化，SWE-bench得分达52%
- 原生支持Agent架构，可自主完成多步骤复杂任务

## 开源协议
完全开源免费，可商用，无需申请授权，无使用门槛，同步开放训练代码与微调工具。` },
  { title: '国家发改委发布《新型数据中心发展三年行动计划（2026-2028年）》', category: '计算机', technology: '数据中心', isPublic: true, content: `# 国家发改委发布《新型数据中心发展三年行动计划（2026-2028年）》
## 发展目标
到2028年，全国新型数据中心算力总规模超300EFLOPS，智能算力占比超85%，新建数据中心PUE普遍低于1.2，绿色低碳算力占比超60%。

## 核心任务
- 优化算力布局，深化“东数西算”工程，推动八大枢纽节点集群化发展
- 推动技术创新，突破液冷、余热回收、存算一体、AI芯片等核心技术
- 推动绿色低碳发展，新建数据中心全面采用液冷、间接蒸发冷却等高效制冷技术
- 完善产业链生态，推动数据中心核心设备国产化替代
- 强化安全保障，建立数据中心全生命周期安全管理体系

## 保障措施
- 加大政策支持力度，对符合要求的新型数据中心给予用地、用电、税收优惠
- 引导社会资本参与新型数据中心建设，鼓励多元化投融资模式
- 建立健全标准体系，完善新型数据中心评测与评估机制
- 加强人才培养，建设跨学科、复合型人才队伍。` },
  { title: '腾讯发布云原生数据湖仓一体平台Iceberg企业版', category: '大数据', technology: '数据湖仓', isPublic: true, content: `# 腾讯发布云原生数据湖仓一体平台Iceberg企业版
## 核心能力
- 湖仓一体架构，实现离线、实时、AI计算统一数据存储与访问，消除数据孤岛
- 高性能查询引擎，支持PB级数据秒级分析，查询性能比开源Iceberg提升5倍
- 事务级ACID支持，实现数据增量更新、快照回滚、并发读写，保证数据一致性

## 核心特性
- 原生集成腾讯混元大模型，支持自然语言数据分析、智能数据治理、异常检测
- 全面兼容Spark、Flink、Trino、Hive等主流计算引擎，业务无缝迁移
- 存算分离架构，存储成本降低60%，计算资源按需扩缩容
- 企业级安全能力，细粒度权限管控、数据脱敏、审计日志，满足金融级合规要求
- 支持混合云、多云部署，实现跨云数据统一管理与分析

## 应用场景
已在游戏、金融、零售、政务等行业超1000家企业落地，支撑日均超100PB数据处理。` },
  { title: '英伟达发布CUDA 13.0，全面优化AI推理性能', category: '计算机', technology: 'AI开发工具', isPublic: true, content: `# 英伟达发布CUDA 13.0，全面优化AI推理性能
## 核心升级
- 针对H100/H200/B100 GPU深度优化，大模型推理性能提升100%，训练吞吐量提升50%
- FP8/INT4量化推理全面优化，支持动态量化，精度损失小于1%，推理速度提升3倍
- 多GPU通信优化，NVLink带宽利用率提升至98%，分布式训练线性加速比达95%

## 新特性
- 原生支持PyTorch 2.5、TensorFlow 2.18等主流框架，无需额外适配
- 新增AI专用算子库，优化Transformer、MoE、注意力机制等核心算子
- 完善的国产化操作系统、CPU适配支持，满足信创环境部署需求
- 开发工具链全面升级，调试、性能分析效率提升200%，降低AI开发门槛

## 生态影响
CUDA生态累计开发者超5000万，已成为AI开发的事实标准，持续引领AI计算技术发展。` },
  { title: '中兴通讯发布5G-A+AI算力融合解决方案', category: '网络工程', technology: '5G-A算力网络', isPublic: true, content: `# 中兴通讯发布5G-A+AI算力融合解决方案
## 核心能力
- 实现5G-A网络与边缘算力深度融合，算力调度时延低至5ms，实现“网络即算力”
- AI原生网络架构，大模型驱动网络智能优化，可根据业务需求动态分配网络与算力资源
- 端边云协同推理，支持大模型在终端、边缘、云端分布式推理，推理速度提升3倍，功耗降低50%

## 技术亮点
- 自研算力路由技术，实现全网算力资源统一感知、调度与管理
- 5G-A通感算一体，支持定位、感知、通信、计算一体化服务
- 轻量化AI推理引擎，适配工业终端、摄像头、无人机等边缘设备
- 内生安全能力，实现网络、算力、数据全链路安全防护

## 应用场景
可广泛应用于工业互联网、智能网联汽车、智慧矿山、智慧城市、AR/VR等行业，已在全国20余个省市落地试点。` },
  { title: '清华大学发布开源具身智能平台EmbodiedGPT 2.0', category: 'AI', technology: '具身智能', isPublic: true, content: `# 清华大学发布开源具身智能平台EmbodiedGPT 2.0
## 核心升级
- 多模态大模型底座升级，支持视觉、语言、力觉、触觉多模态输入，实现环境全维度感知
- 端到端具身智能决策，支持自然语言指令直接转化为机器人动作，无需中间编程
- 长时序任务规划能力，可自主完成复杂多步骤操作任务，任务完成率提升60%

## 技术特性
- 开源7B/14B/70B全系列参数模型，支持消费级GPU部署
- 兼容ROS、MuJoCo、Isaac Sim等主流机器人仿真与真机平台
- 提供完整的微调、部署、仿真工具链，降低具身智能开发门槛
- 支持机械臂、移动机器人、人形机器人等多种机器人形态

## 社区价值
GitHub星标上线一周突破1万，成为全球最热门的开源具身智能平台之一，推动具身智能技术普惠发展。` },
]},
// ===== 3月10日 =====
{ date: '2026-03-10', notes: [
  { title: 'DeepSeek V3 技术报告解读', category: 'AI', technology: 'LLM', isPublic: true, content: `# DeepSeek V3 技术报告解读\n\n## 发布信息\n\n2024年12月，深度求索发布 DeepSeek V3，671B MoE 模型，训练成本约 557 万美元，性能对标 GPT-4o。\n\n## 核心创新\n\n### MLA（多头潜在注意力）\n\n将 KV Cache 压缩到极低维度，显存占用减少 5-13 倍。\n\n### DeepSeekMoE\n\n细粒度专家分割 + 共享专家，每个 token 只激活 37B 参数。\n\n### FP8 混合精度训练\n\n首次在超大规模模型上成功应用 FP8 训练，节省显存和计算。\n\n### 无辅助损失负载均衡\n\n通过动态偏置调整专家负载，不影响模型性能。\n\n## 训练效率\n\n2048 张 H800，训练 2.788M H800 GPU 小时，约 557 万美元。\n\n## 意义\n\n证明了用更少资源训练顶级模型是可能的，对整个行业的成本预期产生冲击。` },
  { title: '数据结构：跳表原理', category: '计算机', technology: '数据结构', isPublic: true, content: `# 数据结构：跳表原理\n\n## 什么是跳表\n\n跳表（Skip List）是一种基于有序链表的数据结构，通过多层索引实现 O(log n) 的查找。\n\n## 核心思想\n\n在有序链表基础上，每隔几个节点建立一层索引，查找时从最高层开始，快速跳过大量节点。\n\n## 时间复杂度\n\n- 查找：O(log n) 期望\n- 插入：O(log n) 期望\n- 删除：O(log n) 期望\n\n## 与红黑树对比\n\n| 特性 | 跳表 | 红黑树 |\n|------|------|--------|\n| 实现复杂度 | 简单 | 复杂 |\n| 范围查询 | 天然支持 | 需要中序遍历 |\n| 内存 | 稍多 | 较少 |\n| 并发 | 更容易实现 | 较难 |\n\n## 应用\n\n- Redis ZSet（有序集合）底层实现\n- LevelDB/RocksDB 的 MemTable\n- 数据库索引` },
  { title: 'AI 代码生成质量评估', category: 'AI', technology: '工具', isPublic: true, content: `# AI 代码生成质量评估\n\n## 评估维度\n\n- **正确性**：代码能否运行，逻辑是否正确\n- **可读性**：命名、注释、结构是否清晰\n- **安全性**：是否存在注入、越权等漏洞\n- **性能**：算法复杂度是否合理\n\n## 主流基准测试\n\n- **HumanEval**：164 道 Python 编程题，pass@1 衡量\n- **SWE-bench**：真实 GitHub Issue 修复，更贴近实际\n- **LiveCodeBench**：持续更新，防止数据污染\n\n## 2025年排名（SWE-bench Verified）\n\n1. Claude 3.7 Sonnet：62.3%\n2. GPT-4.5：38%\n3. DeepSeek V3：42%\n\n## 实际使用建议\n\n- 生成后必须 Code Review\n- 写测试用例验证逻辑\n- 安全敏感代码人工审查\n- 不要直接用于生产，需要理解后再用` },
  { title: '近期 AI 新闻汇总（私）', category: 'AI', technology: '总结', isPublic: false, content: `# 近期 AI 新闻汇总\n\n## 本周大事\n\n- OpenAI 发布 GPT-4.5，情感智能提升\n- Anthropic 融资 35 亿美元，估值 615 亿\n- Google 发布 Gemini 2.0 Flash 正式版\n- Meta 开源 Llama 3.3 70B\n\n## 值得关注\n\n### AI 硬件\n\n英伟达 Blackwell 架构 GPU 开始大规模出货，训练效率提升 4 倍。\n\n### 开源进展\n\n开源模型和闭源模型的差距在缩小，Qwen2.5 72B 已接近 GPT-4o 水平。\n\n## 我的判断\n\n2025年是 Agent 元年，各家都在押注 Agent 方向。\n下半年可能出现真正能用的 AI 助手产品。` },
  { title: 'Java 虚拟机 JVM 内存模型', category: '计算机', technology: 'Java', isPublic: false, content: `# Java 虚拟机 JVM 内存模型\n\n## 运行时数据区\n\n- **堆（Heap）**：对象实例，GC 主要区域\n- **方法区**：类信息、常量、静态变量\n- **虚拟机栈**：每个线程独有，存储栈帧\n- **本地方法栈**：Native 方法\n- **程序计数器**：当前线程执行的字节码行号\n\n## 垃圾回收\n\n### 判断对象存活\n\n- 引用计数法（有循环引用问题）\n- 可达性分析（GC Roots 出发）\n\n### GC 算法\n\n- 标记-清除：产生碎片\n- 标记-整理：无碎片，但移动对象\n- 复制算法：新生代常用\n\n### 分代收集\n\n- 新生代（Eden + Survivor）：Minor GC\n- 老年代：Major GC\n\n## 常见 JVM 参数\n\n\`\`\`\n-Xms512m -Xmx2g  # 堆内存\n-XX:+UseG1GC      # 使用 G1 收集器\n-XX:MaxGCPauseMillis=200  # 最大停顿时间\n\`\`\`` },
  { title: 'Gemini 2.0 系列解析', category: 'AI', technology: 'LLM', isPublic: true, content: `# Gemini 2.0 系列解析\n\n## 发布信息\n\n2025年初，Google 发布 Gemini 2.0 系列，主打 Agentic 能力。\n\n## 系列版本\n\n- **Gemini 2.0 Flash**：速度最快，成本最低，日常使用首选\n- **Gemini 2.0 Pro**：能力最强，复杂任务\n- **Gemini 2.0 Flash Thinking**：推理模型，类似 o1\n\n## 核心改进\n\n- 原生工具使用（搜索、代码执行）\n- 多模态输出（可生成图像和音频）\n- 更强的 Agent 能力\n- 100 万 token 上下文\n\n## 与竞品对比\n\nGemini 2.0 Flash 在速度和价格上有优势，但综合能力仍略逊于 Claude 3.7。\n\n## 免费额度\n\nGoogle AI Studio 提供慷慨的免费额度，适合个人开发者。` },
  { title: '系统设计：短链接服务', category: '计算机', technology: '系统设计', isPublic: true, content: `# 系统设计：短链接服务\n\n## 需求分析\n\n- 输入长 URL，生成 6-8 位短码\n- 访问短链接，302 重定向到原 URL\n- QPS：写 1000/s，读 100000/s\n\n## 核心设计\n\n### 短码生成\n\n方案一：自增 ID + Base62 编码\n\`\`\`\n1000000 → "4c92"\n\`\`\`\n\n方案二：MD5 取前 6 位（有碰撞风险）\n\n### 存储\n\n\`\`\`\nMySQL: id, short_code, long_url, created_at\n索引: short_code（唯一索引）\n\`\`\`\n\n### 缓存\n\nRedis 缓存热点短链接，TTL 24 小时，缓存命中率 > 90%。\n\n## 扩展性\n\n- 读多写少，读服务水平扩展\n- 数据库主从分离\n- CDN 加速静态资源\n\n## 防滥用\n\n- 限流：同 IP 每分钟最多创建 10 个\n- 黑名单：过滤恶意 URL` },
  { title: 'DeepSeek V3 本地部署与推理优化实操', category: 'AI', technology: 'LLM部署', isPublic: true, content: `# DeepSeek V3 本地部署与推理优化实操
## 环境要求
- 硬件：最低16GB显存（INT4量化），推荐24GB+显存；CPU 8核+，内存32GB+
- 软件：Python 3.10+，CUDA 12.1+，PyTorch 2.2+

## 核心部署方案
### 方案1：Ollama一键部署（新手首选）
\`\`\`bash
# 拉取官方INT4量化版（适配16GB显存）
ollama pull deepseek-v3:70b-chat-q4_0
# 启动对话
ollama run deepseek-v3:70b-chat-q4_0
\`\`\`

### 方案2：vLLM生产级部署（高吞吐场景）
\`\`\`python
# 安装依赖
# pip install vllm>=0.6.0

from vllm import LLM, SamplingParams

# 加载模型（INT4量化，适配24GB显存）
llm = LLM(
    model="deepseek-ai/DeepSeek-V3",
    quantization="awq",
    tensor_parallel_size=1,
    gpu_memory_utilization=0.9,
    max_num_batched_tokens=8192
)

# 推理配置
sampling_params = SamplingParams(
    temperature=0.7,
    top_p=0.95,
    max_tokens=2048
)

# 批量推理
prompts = ["你好，介绍一下DeepSeek V3的核心特性"]
outputs = llm.generate(prompts, sampling_params)

# 输出结果
for output in outputs:
    print(output.outputs[0].text)
\`\`\`

## 关键优化技巧
1. **显存优化**：优先使用AWQ/GPTQ INT4量化，比FP16显存占用减少75%，精度损失小于2%
2. **吞吐优化**：开启连续批处理（Continuous Batching），GPU利用率提升300%
3. **长文本优化**：开启MLA多头潜在注意力，KV Cache显存占用减少10倍，支持128K上下文推理
4. **推理加速**：开启PagedAttention + FP8推理，单卡推理速度提升2倍

## 常见坑与解决方案
- 显存不足：降低量化精度、开启张量并行、限制max_model_len
- 中文乱码：确保使用官方Chat版本，tokenizer配置正确
- 推理速度慢：升级vLLM到最新版，开启GPU内存复用` },
  { title: 'vLLM 多模型实例并行部署生产级配置', category: 'AI', technology: '推理优化', isPublic: true, content: `# vLLM 多模型实例并行部署生产级配置
## 核心架构
单台GPU服务器部署多个独立vLLM实例，实现多模型同时服务，通过Nginx反向代理实现统一入口与负载均衡，适配企业级多模型服务场景。

## 环境准备
- 硬件：单台A100 80GB / H100 80GB，或多卡消费级GPU（RTX 4090 24GB * 2）
- 系统：Ubuntu 22.04，Docker 25.0+，CUDA 12.2+
- 网络：服务器内网带宽10Gbps+，端口开放18000-18100

## 分步部署配置
### 1. Docker Compose多实例编排
\`\`\`yaml
# docker-compose.yml
version: '3.8'

services:
  # 实例1：Qwen2.5-72B-INT4
  qwen2_72b:
    image: vllm/vllm-openai:latest
    container_name: vllm-qwen2-72b
    runtime: nvidia
    ports:
      - "18000:8000"
    environment:
      - NVIDIA_VISIBLE_DEVICES=0
    volumes:
      - ~/.cache/huggingface:/root/.cache/huggingface
    command: >
      --model Qwen/Qwen2.5-72B-Instruct-AWQ
      --quantization awq
      --tensor-parallel-size 1
      --port 8000
      --max-model-len 32768
      --gpu-memory-utilization 0.85

  # 实例2：DeepSeek-R1-14B
  deepseek_r1:
    image: vllm/vllm-openai:latest
    container_name: vllm-deepseek-r1
    runtime: nvidia
    ports:
      - "18001:8000"
    environment:
      - NVIDIA_VISIBLE_DEVICES=1
    volumes:
      - ~/.cache/huggingface:/root/.cache/huggingface
    command: >
      --model deepseek-ai/DeepSeek-R1-14B-Chat
      --tensor-parallel-size 1
      --port 8000
      --max-model-len 16384
      --gpu-memory-utilization 0.85

  # 实例3：Llama3-8B（轻量场景）
  llama3_8b:
    image: vllm/vllm-openai:latest
    container_name: vllm-llama3-8b
    runtime: nvidia
    ports:
      - "18002:8000"
    environment:
      - NVIDIA_VISIBLE_DEVICES=0
    volumes:
      - ~/.cache/huggingface:/root/.cache/huggingface
    command: >
      --model meta-llama/Llama-3-8B-Instruct
      --tensor-parallel-size 1
      --port 8000
      --max-model-len 8192
      --gpu-memory-utilization 0.4
\`\`\`

### 2. Nginx反向代理配置（兼容OpenAI API格式）
\`\`\`nginx
# /etc/nginx/conf.d/vllm-proxy.conf
server {
    listen 80;
    server_name vllm-api.local;

    # 统一API入口，按模型名路由到对应实例
    location ~ ^/v1/chat/completions {
        set $target "";
        if ($arg_model ~* "qwen2") {
            set $target http://127.0.0.1:18000;
        }
        if ($arg_model ~* "deepseek-r1") {
            set $target http://127.0.0.1:18001;
        }
        if ($arg_model ~* "llama3") {
            set $target http://127.0.0.1:18002;
        }
        proxy_pass $target;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_read_timeout 300s;
    }
}
\`\`\`

## 生产级保障
1. **资源隔离**：通过NVIDIA_VISIBLE_DEVICES绑定固定GPU，避免实例间显存抢占
2. **健康检查**：配置Docker健康检查，实例异常自动重启
3. **日志监控**：挂载日志目录，对接Prometheus + Grafana监控吞吐、延迟、显存占用
4. **权限管控**：开启API Key鉴权，限制访问IP，避免未授权访问` },
  { title: 'LoRA微调模型合并与生产环境落地指南', category: 'AI', technology: '模型微调', isPublic: true, content: `# LoRA微调模型合并与生产环境落地指南
## 核心原理
LoRA微调仅更新低秩矩阵权重，不修改预训练主干权重，推理时需将LoRA权重与原模型合并，或开启动态加载，实现端到端推理。

## 环境准备
- 依赖：transformers>=4.38.0，peft>=0.10.0，torch>=2.1.0
- 物料：预训练基座模型、LoRA微调输出的adapter权重

## 分步实操
### 1. 模型合并（本地离线合并）
\`\`\`python
from peft import PeftModel
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

# 1. 加载基座模型
base_model_path = "Qwen/Qwen2.5-7B-Instruct"
lora_adapter_path = "./output/qwen2-7b-lora-finetune"
merged_model_path = "./output/qwen2-7b-merged"

tokenizer = AutoTokenizer.from_pretrained(base_model_path, trust_remote_code=True)
base_model = AutoModelForCausalLM.from_pretrained(
    base_model_path,
    torch_dtype=torch.bfloat16,
    device_map="auto",
    trust_remote_code=True
)

# 2. 加载LoRA权重并合并
lora_model = PeftModel.from_pretrained(base_model, lora_adapter_path)
merged_model = lora_model.merge_and_unload()

# 3. 保存合并后的完整模型
merged_model.save_pretrained(merged_model_path, safe_serialization=True)
tokenizer.save_pretrained(merged_model_path)
print(f"模型合并完成，已保存至：{merged_model_path}")
\`\`\`

### 2. 动态加载（不合并，生产环境热加载）
适合频繁切换LoRA适配器的场景，无需重复合并，显存占用更低：
\`\`\`python
from peft import PeftModel
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

base_model = AutoModelForCausalLM.from_pretrained(
    "Qwen/Qwen2.5-7B-Instruct",
    torch_dtype=torch.bfloat16,
    device_map="auto"
)
tokenizer = AutoTokenizer.from_pretrained("Qwen/Qwen2.5-7B-Instruct")

# 动态加载第一个LoRA适配器
model = PeftModel.from_pretrained(base_model, "./output/lora-adapter-1")
# 推理
print(model.generate(**tokenizer("用户问题", return_tensors="pt").to("cuda"), max_new_tokens=512))

# 卸载当前LoRA，加载第二个适配器
model = model.unload()
model = PeftModel.from_pretrained(base_model, "./output/lora-adapter-2")
\`\`\`

## 生产环境落地最佳实践
1. **合并场景选择**
   - 固定场景长期使用：优先离线合并，推理速度更快，无额外开销
   - 多场景频繁切换：使用动态加载，节省存储与加载时间
2. **精度控制**
   - 合并时使用bfloat16/float16精度，避免使用float32导致显存溢出
   - 合并后必须做效果验证，对比微调前后的输出一致性
3. **部署适配**
   - 合并后的模型可直接对接vLLM、Ollama、Text Generation Inference等推理框架
   - 生产环境优先使用INT4/INT8量化，降低部署门槛
4. **版本管理**
   - 模型文件、LoRA权重、微调配置需统一版本管理，记录迭代日志
   - 生产环境模型需做MD5校验，避免文件损坏导致的推理异常` },
  { title: '大模型INT4/INT8量化部署原理与实操', category: 'AI', technology: '推理优化', isPublic: true, content: `# 大模型INT4/INT8量化部署原理与实操
## 量化核心原理
通过降低模型权重与激活值的数值精度，从FP16/BF16降至INT8/INT4，实现显存占用大幅降低、推理速度显著提升，同时最小化精度损失。

| 量化方案 | 显存占用 | 精度损失 | 适用场景 |
|----------|----------|----------|----------|
| FP16     | 100%     | 0%       | 高精度训练/推理 |
| INT8     | 50%      | <1%      | 通用推理、服务部署 |
| INT4     | 25%      | 1%-3%    | 消费级GPU本地部署、边缘设备 |

## 主流量化方案对比
1. **GPTQ**：逐层量化优化，量化后精度损失极小，INT4量化下70B模型可在单张24GB显存显卡运行，是目前生产环境最主流的方案
2. **AWQ**：激活感知权重量化，保留对输出影响最大的权重，精度优于GPTQ，推理速度更快，vLLM、Transformers原生支持
3. **GGUF**：llama.cpp主推的格式，适配CPU+GPU混合推理，是Ollama、本地端侧部署的首选格式
4. **BitsAndBytes**：动态量化，无需离线量化预处理，适合快速验证，推理性能略低于GPTQ/AWQ

## 实操：AWQ量化模型本地部署
### 1. 环境安装
\`\`\`bash
pip install autoawq vllm transformers accelerate
\`\`\`

### 2. 离线量化（自定义模型）
\`\`\`python
from awq import AutoAWQForCausalLM
from transformers import AutoTokenizer

model_path = "Qwen/Qwen2.5-7B-Instruct"
quant_path = "./output/qwen2-7b-awq-int4"
quant_config = { "zero_point": True, "q_group_size": 128, "w_bit": 4, "version": "GEMM" }

# 加载模型
model = AutoAWQForCausalLM.from_pretrained(model_path, device_map="auto")
tokenizer = AutoTokenizer.from_pretrained(model_path, trust_remote_code=True)

# 执行量化
model.quantize(tokenizer, quant_config=quant_config)

# 保存量化模型
model.save_quantized(quant_path, safetensors=True)
tokenizer.save_pretrained(quant_path)
\`\`\`

### 3. 量化模型推理部署
\`\`\`python
from vllm import LLM, SamplingParams

# 加载AWQ量化模型
llm = LLM(
    model="./output/qwen2-7b-awq-int4",
    quantization="awq",
    gpu_memory_utilization=0.9,
    max_model_len=32768
)

# 推理
sampling_params = SamplingParams(temperature=0.7, max_tokens=1024)
output = llm.generate("介绍一下AWQ量化的优势", sampling_params)
print(output[0].outputs[0].text)
\`\`\`

## 量化部署最佳实践
1. **量化精度选择**：7B/14B模型优先INT4，34B/70B模型优先INT8，130B+模型使用INT4+张量并行
2. **场景适配**：服务端部署优先AWQ/GPTQ，端侧/CPU部署优先GGUF，快速验证使用BitsAndBytes
3. **精度验证**：量化后必须在业务数据集上做效果验证，确保精度损失在可接受范围内
4. **推理框架适配**：vLLM对AWQ支持最好，Text Generation Inference对GPTQ支持更完善，Ollama原生支持GGUF` },
  { title: '本地大模型部署踩坑记录（私）', category: 'AI', technology: '部署优化', isPublic: false, content: `# 本地大模型部署踩坑记录
## 本周踩坑与解决方案
### 坑1：RTX 4090部署70B模型显存溢出
- 现象：AWQ INT4量化的70B模型，加载时直接OOM，24GB显存完全占满
- 原因：默认max_model_len设置为128K，KV Cache预分配占用了大量显存
- 解决方案：限制max_model_len为32768，开启gpu_memory_utilization=0.95，成功加载，单轮对话显存占用稳定在22GB左右

### 坑2：Ollama多模型并行运行卡顿
- 现象：同时运行2个7B模型，推理速度骤降，延迟从50ms/token升至500ms/token
- 原因：两个模型争抢同一个GPU的CUDA核心，上下文切换开销过大
- 解决方案：通过CUDA_VISIBLE_DEVICES绑定不同GPU，单卡最多运行1个大模型，并行推理速度恢复正常

### 坑3：量化模型中文输出乱码、断句异常
- 现象：第三方量化的Llama3模型，中文输出频繁出现乱码、句子截断
- 原因：量化时tokenizer配置错误，词表不完整，未正确处理中文字符
- 解决方案：使用官方Chat版本模型，重新量化时同步保存tokenizer配置，替换后恢复正常

### 坑4：vLLM API服务频繁重启
- 现象：高并发请求下，vLLM服务每隔10分钟左右自动重启，无报错日志
- 原因：GPU显存碎片化，长时间运行后显存利用率超过阈值，触发OOM重启
- 解决方案：开启--enforce-eager模式，限制单批次最大token数，设置服务自动重启策略，问题解决

## 总结的部署原则
1. 显存预算=模型权重占用*1.2 + 上下文KV Cache预留，宁多勿少
2. 消费级GPU单卡优先部署7B/14B模型，70B模型至少需要2张24GB显卡
3. 生产环境必须做压力测试，验证7*24小时稳定性，不能只做单次推理验证
4. 优先使用官方发布的量化模型，第三方量化模型必须先做效果验证` },
]},
// ===== 3月14日 =====
{ date: '2026-03-14', notes: [
  { title: 'OpenAI 发布 o3 mini 与 o1 pro', category: 'AI', technology: 'LLM', isPublic: true, content: `# OpenAI 发布 o3 mini 与 o1 pro\n\n## o3 mini\n\n2025年1月发布，小型推理模型，特点：\n- 数学和代码能力接近 o1\n- 速度比 o1 快 3 倍\n- 价格是 o1 的 1/10\n- 支持三种推理强度：low/medium/high\n\n## o1 pro\n\n面向专业用户，使用更多计算资源推理：\n- 复杂科学问题准确率更高\n- 仅在 ChatGPT Pro（$200/月）可用\n\n## 推理模型趋势\n\n2025年推理模型成为标配：\n- OpenAI：o3 mini、o1 pro\n- Anthropic：Claude 3.7 扩展思考\n- Google：Gemini 2.0 Flash Thinking\n- 国内：DeepSeek R1、QwQ\n\n## 选择建议\n\n- 日常编程：o3 mini（性价比高）\n- 复杂数学/科学：o1 pro 或 Claude 3.7 扩展思考\n- 中文推理：DeepSeek R1` },
  { title: 'Elasticsearch 全文搜索原理', category: '大数据', technology: 'Elasticsearch', isPublic: true, content: `# Elasticsearch 全文搜索原理\n\n## 核心概念\n\n- **Index**：类似数据库的表\n- **Document**：JSON 格式的数据记录\n- **Shard**：索引的分片，实现分布式存储\n- **Replica**：副本，提高可用性\n\n## 倒排索引\n\n全文搜索的核心：\n\n\`\`\`\n文档1: "深度学习很有趣"\n文档2: "学习 Python 很重要"\n\n倒排索引:\n"学习" → [文档1, 文档2]\n"深度" → [文档1]\n"Python" → [文档2]\n\`\`\`\n\n## 相关性评分\n\nTF-IDF 算法：\n- TF（词频）：词在文档中出现次数越多，相关性越高\n- IDF（逆文档频率）：词在越少文档中出现，区分度越高\n\n## 常用查询\n\n\`\`\`json\n{\n  "query": {\n    "multi_match": {\n      "query": "深度学习",\n      "fields": ["title^2", "content"]\n    }\n  }\n}\n\`\`\`\n\n## 与 MySQL 对比\n\n- ES：全文搜索、复杂聚合、近实时\n- MySQL：事务、精确查询、关联查询` },
  { title: 'AI 生成内容检测技术', category: 'AI', technology: 'AI安全', isPublic: true, content: `# AI 生成内容检测技术\n\n## 为什么需要检测\n\n- 学术诚信：论文、作业造假\n- 新闻真实性：AI 生成假新闻\n- 版权问题：AI 生成内容的归属\n\n## 检测方法\n\n### 统计特征\n\nAI 文本的困惑度（Perplexity）通常较低，分布更均匀。\n\n### 水印技术\n\n在生成时嵌入不可见水印，检测时验证水印。OpenAI 已在 DALL-E 图像中使用。\n\n### 神经网络检测器\n\n训练分类器区分人类和 AI 文本，如 GPTZero、Turnitin AI。\n\n## 局限性\n\n- 误报率高，可能冤枉人类作者\n- 改写后检测率大幅下降\n- 检测器和生成器的军备竞赛\n\n## 现状\n\n目前没有可靠的 AI 内容检测方法，不建议作为唯一判断依据。` },
  { title: '本周学习总结（私）', category: 'AI', technology: '总结', isPublic: false, content: `# 本周学习总结\n\n## 完成的事\n\n- 看完了 vLLM 的论文，理解了 PagedAttention\n- 用 Ollama 在本地跑通了 DeepSeek R1 7B\n- 整理了 Prompt Engineering 笔记\n\n## 遇到的坑\n\n- 本地 GPU 显存 8GB，跑 14B 模型需要量化\n- Ollama 默认不开启 GPU，需要检查 CUDA 配置\n\n## 有意思的发现\n\nDeepSeek R1 7B 的推理能力比 Llama 3 8B 强很多，特别是数学题。\n\n## 下周计划\n\n- 实现一个简单的 RAG 系统\n- 学习 LangChain 的 Agent 框架\n- 整理 AI 工具使用心得` },
  { title: '微服务架构设计原则', category: '计算机', technology: '架构', isPublic: false, content: `# 微服务架构设计原则\n\n## 核心原则\n\n- **单一职责**：每个服务只做一件事\n- **松耦合**：服务间通过 API 通信，不共享数据库\n- **高内聚**：相关功能放在同一服务\n- **独立部署**：每个服务可以独立发布\n\n## 服务通信\n\n- **同步**：REST API、gRPC\n- **异步**：消息队列（Kafka、RabbitMQ）\n\n## 服务发现\n\n- Consul、Eureka：服务注册与发现\n- Nginx/Envoy：负载均衡\n\n## 挑战\n\n- 分布式事务（Saga 模式）\n- 服务间调用链路追踪（Jaeger、Zipkin）\n- 配置管理（Apollo、Nacos）\n\n## 什么时候用微服务\n\n团队规模 > 20 人，业务复杂度高，需要独立扩缩容时才考虑。\n小团队用单体架构更高效。` },
  { title: 'Anthropic 最新研究进展', category: 'AI', technology: 'AI安全', isPublic: true, content: `# Anthropic 最新研究进展\n\n## 可解释性研究\n\n2024年，Anthropic 发布多篇可解释性论文，尝试理解 Claude 内部机制：\n\n- 发现模型内部存在"特征"对应人类概念\n- 识别出与情绪相关的内部表示\n- 发现模型有时会"欺骗"评估者\n\n## Constitutional AI\n\nAnthropic 的对齐方法：\n1. 用一组原则（Constitution）训练 AI 批评自己的输出\n2. 用 AI 反馈替代部分人类反馈\n3. 减少对人工标注的依赖\n\n## 安全承诺\n\nAnthropic 承诺在 Claude 达到某些能力阈值时暂停部署，进行安全评估。\n\n## 意义\n\nAnthropic 是目前 AI 安全研究最深入的公司，其研究对整个行业有重要参考价值。` },
  { title: 'Python 异步编程 asyncio', category: '计算机', technology: 'Python', isPublic: true, content: `# Python 异步编程 asyncio\n\n## 为什么需要异步\n\nI/O 密集型任务（网络请求、文件读写）大量时间在等待，同步代码浪费 CPU。\n\n## 核心概念\n\n- **协程（Coroutine）**：用 async def 定义，可以暂停和恢复\n- **事件循环（Event Loop）**：调度协程执行\n- **await**：暂停当前协程，等待结果\n\n## 基本用法\n\n\`\`\`python\nimport asyncio\nimport aiohttp\n\nasync def fetch(url):\n    async with aiohttp.ClientSession() as session:\n        async with session.get(url) as resp:\n            return await resp.text()\n\nasync def main():\n    # 并发请求\n    tasks = [fetch(url) for url in urls]\n    results = await asyncio.gather(*tasks)\n\nasyncio.run(main())\n\`\`\`\n\n## 性能对比\n\n100 个并发请求：\n- 同步：100 秒\n- 多线程：~5 秒\n- asyncio：~1 秒\n\n## 注意事项\n\n- CPU 密集型任务用多进程，不用 asyncio\n- 避免在协程中调用阻塞函数` },
  { title: 'OpenClaw 开源智能体本地部署与基础使用教程', category: 'AI', technology: 'AI智能体', isPublic: true, content: `# OpenClaw 开源智能体本地部署与基础使用教程
## 产品简介
OpenClaw是一款开源自托管的AI智能体平台，支持对接本地/云端大模型，可自主执行文件管理、代码编写、邮件收发、网页操作、API调用等复杂任务，实现端到端工作流自动化，是目前最热门的开源AI智能体项目之一。

## 环境要求
- 系统：Windows 10/11、macOS 12+、Ubuntu 22.04+、WSL2（Windows推荐）
- 依赖：Node.js ≥ 22、Python ≥ 3.10、Git
- 硬件：最低4GB内存，推荐8GB+；本地大模型需≥16GB显存
- 模型要求：大模型上下文窗口≥16000 tokens（官方硬性要求）

## 一、3种主流部署方式
### 方式1：一键脚本部署（新手首选，5分钟完成）
#### Windows（管理员PowerShell）
\`\`\`powershell
# 可选：解锁脚本执行权限，避免报错
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
# 执行一键安装命令
iwr -useb https://openclaw.ai/install.ps1 | iex
# 国内网络加速版
# iwr -useb https://clawd.org.cn/install.ps1 | iex
\`\`\`

#### macOS/Linux/WSL2
\`\`\`bash
# 官方一键安装
curl -fsSL https://openclaw.ai/install.sh | bash
# 国内镜像加速版
# curl -fsSL https://openclaw.ai/install.sh | bash -s -- --registry=https://registry.npmmirror.com
\`\`\`

#### 验证安装
安装完成后，终端执行以下命令，输出版本号即代表成功：
\`\`\`bash
openclaw --version
\`\`\`

### 方式2：Docker容器化部署（生产环境推荐，环境隔离）
#### 单容器启动
\`\`\`bash
# 拉取官方镜像
docker pull openclaw/openclaw:latest
# 启动容器，映射端口与数据目录
docker run -d \
  --name openclaw \
  -p 3000:3000 \
  -v ~/.openclaw:/root/.openclaw \
  -v /var/run/docker.sock:/var/run/docker.sock \
  --restart always \
  openclaw/openclaw:latest
\`\`\`

#### Docker Compose编排（推荐）
\`\`\`yaml
# docker-compose.yml
version: '3.8'
services:
  openclaw:
    image: openclaw/openclaw:latest
    container_name: openclaw
    ports:
      - "3000:3000"
    volumes:
      - ./data:/app/data
      - ./config:/app/config
      - ~/.openclaw:/root/.openclaw
      - /var/run/docker.sock:/var/run/docker.sock
    environment:
      - OPENCLAW_HOST=0.0.0.0
      - OPENCLAW_PORT=3000
    restart: always
\`\`\`
启动命令：\`docker-compose up -d\`

### 方式3：源码部署（开发者二次开发）
\`\`\`bash
# 克隆仓库（国内使用Gitee镜像）
git clone https://gitee.com/openclaw-cn/openclaw-cn.git
cd openclaw-cn
# 切换到稳定版
git checkout v2026.3.1-cn
# 安装依赖
pnpm install
# 链接全局CLI
pnpm link --global
# 验证安装
openclaw --version
\`\`\`

## 二、初始化配置与模型对接
### 1. 启动初始化向导
安装完成后，执行以下命令进入交互式配置：
\`\`\`bash
openclaw onboard --install-daemon
\`\`\`
按向导完成以下配置：
1. 选择部署模式：quickstart（快速启动）/ custom（自定义）
2. 配置大模型对接：支持OpenAI、Anthropic、Ollama本地模型、DeepSeek等
3. 设置API Key与模型参数（上下文窗口、温度值等）
4. 配置工作区目录与权限
5. 安装后台守护进程，实现开机自启

### 2. 对接本地Ollama模型（私有化核心）
#### 前提：已安装Ollama并拉取模型
\`\`\`bash
# 拉取符合要求的模型，上下文窗口≥32K
ollama pull qwen2.5:7b
# 自定义模型，扩展上下文窗口至32768 tokens
echo "FROM qwen2.5:7b
PARAMETER num_ctx 32768" > Modelfile
ollama create qwen2.5:7b-32k -f Modelfile
\`\`\`

#### OpenClaw对接配置
1. 初始化向导中选择「Ollama」作为模型提供商
2. 填写Ollama服务地址：默认http://localhost:11434
3. 选择模型名称：qwen2.5:7b-32k
4. 测试连接，验证模型可正常调用
5. 保存配置，启动服务

## 三、基础使用与核心功能实操
### 1. 启动服务与访问面板
\`\`\`bash
# 启动后台服务
openclaw gateway start
# 打开Web管理面板
openclaw dashboard
# 查看服务状态
openclaw status
\`\`\`
默认访问地址：http://localhost:3000

### 2. 核心功能使用示例
#### 示例1：本地文件管理与代码编写
给OpenClaw发送指令：
> 在当前工作区创建一个Python项目，实现一个简单的RAG检索系统，包含文档切片、向量存储、检索生成三个核心模块，添加详细注释与requirements.txt依赖文件

执行流程：
1. OpenClaw自动分析需求，拆解任务步骤
2. 创建项目目录结构，生成对应代码文件
3. 编写requirements.txt依赖清单
4. 自动验证代码语法正确性，返回执行结果

#### 示例2：技能包扩展与自定义工作流
OpenClaw支持通过技能包扩展能力，内置邮件收发、网页浏览、Git操作、API调用等技能，也可自定义技能：
1. 进入Web面板「技能市场」，安装需要的技能包
2. 配置技能的权限与API密钥（如邮件、搜索API）
3. 对话中直接触发技能，无需额外指令
4. 支持通过YAML文件自定义私有技能包

#### 示例3：CLI命令行直接使用
\`\`\`bash
# 直接对话
openclaw chat "帮我写一个Shell脚本，自动备份MySQL数据库并上传到OSS"
# 执行指定工作流
openclaw workflow run --name daily-report
# 查看已安装技能
openclaw skill list
\`\`\`

## 四、安全与最佳实践
1. **权限控制**：不要用root权限运行，工作区目录限制访问范围，避免OpenClaw误删系统文件
2. **网络安全**：公网部署必须开启HTTPS与API Key鉴权，限制访问IP，避免未授权访问
3. **模型选择**：优先使用上下文窗口≥32K的模型，复杂任务推理效果更好
4. **隔离环境**：生产环境推荐使用Docker部署，与系统环境隔离，降低安全风险
5. **日志审计**：开启操作日志，定期审计智能体执行的操作，及时发现异常行为` },
  { title: 'Ollama 多模型并行部署与API服务配置', category: 'AI', technology: '本地部署', isPublic: true, content: `# Ollama 多模型并行部署与API服务配置
## 核心优势
Ollama是本地大模型部署的首选工具，支持一键拉取、运行模型，原生兼容OpenAI API格式，可实现多模型同时运行、对外提供统一API服务，适配个人开发与小型团队生产场景。

## 环境准备
- 系统：Windows 10/11、macOS、Linux、WSL2
- 硬件：推荐NVIDIA GPU（显存≥8GB），AMD GPU/CPU也可运行
- 软件：Ollama 0.3.0+ 版本

## 一、多模型并行部署配置
### 1. 基础环境配置
#### 开启Ollama远程访问与并行配置
##### Linux/macOS/WSL2
编辑systemd配置文件，开启多模型并行与远程访问：
\`\`\`bash
# 编辑服务配置
sudo systemctl edit ollama.service
# 写入以下配置
[Service]
Environment="OLLAMA_HOST=0.0.0.0"
Environment="OLLAMA_PORT=11434"
Environment="OLLAMA_NUM_PARALLEL=4"  # 并行处理请求数
Environment="OLLAMA_MAX_LOADED_MODELS=3"  # 最大同时加载模型数
Environment="OLLAMA_GPU_MEMORY_UTILIZATION=0.9"
# 重启服务生效
sudo systemctl daemon-reload
sudo systemctl restart ollama
\`\`\`

##### Windows
1. 按下Win+R，输入 sysdm.cpl，打开系统属性
2. 切换到「高级」→「环境变量」
3. 新建系统环境变量：
   - 变量名：OLLAMA_HOST，值：0.0.0.0
   - 变量名：OLLAMA_NUM_PARALLEL，值：4
   - 变量名：OLLAMA_MAX_LOADED_MODELS，值：3
4. 重启Ollama服务生效

### 2. 多模型拉取与并行运行
#### 常用模型拉取命令
\`\`\`bash
# 中文通用首选
ollama pull qwen2.5:7b
# 推理能力首选
ollama pull deepseek-r1:7b
# 代码专用
ollama pull qwen2.5-coder:7b
# 轻量极速
ollama pull llama3.2:3b
\`\`\`

#### 并行运行验证
Ollama会自动管理模型加载与显存释放，通过API同时调用多个模型时，自动并行处理：
- 当OLLAMA_MAX_LOADED_MODELS=3时，可同时加载3个模型到显存
- 超出数量时，自动卸载最少使用的模型，释放显存
- 支持CPU+GPU混合加载，显存不足时自动卸载到内存

## 二、OpenAI兼容API服务配置
Ollama原生提供与OpenAI完全兼容的API接口，可直接替换LangChain、Open WebUI、Cursor等工具的API地址。

### 1. API接口说明
| 接口 | 地址 | 兼容OpenAI接口 |
|------|------|----------------|
| 聊天补全 | http://localhost:11434/v1/chat/completions | /v1/chat/completions |
| 文本补全 | http://localhost:11434/v1/completions | /v1/completions |
| 嵌入生成 | http://localhost:11434/v1/embeddings | /v1/embeddings |
| 模型列表 | http://localhost:11434/v1/models | /v1/models |

### 2. API调用示例
#### Python调用（openai库）
\`\`\`python
from openai import OpenAI

# 对接本地Ollama API
client = OpenAI(
    base_url="http://localhost:11434/v1",
    api_key="ollama"  # 随意填写，Ollama不校验
)

# 聊天补全
response = client.chat.completions.create(
    model="qwen2.5:7b",
    messages=[
        {"role": "user", "content": "你好，介绍一下自己"}
    ],
    temperature=0.7,
    max_tokens=1024
)

print(response.choices[0].message.content)
\`\`\`

#### 嵌入生成示例
\`\`\`python
response = client.embeddings.create(
    model="nomic-embed-text",
    input="RAG检索增强生成原理"
)

print(response.data[0].embedding)
\`\`\`

### 3. 公网访问与鉴权配置
#### Nginx反向代理+鉴权
\`\`\`nginx
server {
    listen 80;
    server_name ollama-api.your-domain.com;

    # API Key鉴权
    set $api_key "your-custom-api-key";
    if ($http_authorization != "Bearer $api_key") {
        return 401;
    }

    # 反向代理到Ollama
    location / {
        proxy_pass http://127.0.0.1:11434;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_read_timeout 300s;
        client_max_body_size 2G;
    }
}
\`\`\`

## 三、最佳实践与优化
1. **显存管理**：根据显存大小设置OLLAMA_MAX_LOADED_MODELS，8GB显存建议≤2个模型，24GB显存建议≤3个模型
2. **性能优化**：开启OLLAMA_FLASH_ATTENTION=1环境变量，开启Flash Attention，推理速度提升2倍
3. **模型管理**：优先使用量化模型（q4_0/q4_K_M），平衡速度与精度，降低显存占用
4. **日志排查**：通过 journalctl -u ollama -f（Linux）查看运行日志，定位模型加载、API调用异常
5. **开机自启**：Linux/macOS通过systemd配置开机自启，Windows设置服务自动启动，保证服务持续可用` },
  { title: '本地大模型+LangChain RAG系统全流程实操', category: 'AI', technology: 'RAG', isPublic: true, content: `# 本地大模型+LangChain RAG系统全流程实操
## 系统架构
完全本地化的RAG系统，所有组件均在本地运行，无数据外传，核心组件：
- 大模型：Ollama部署的本地开源大模型（Qwen2.5-7B）
- 嵌入模型：本地开源嵌入模型（BGE-small-zh）
- 向量数据库：Chroma（本地轻量）/Milvus（生产级）
- 框架：LangChain，实现文档处理、检索、生成全流程

## 环境准备
### 1. 安装依赖
\`\`\`bash
pip install langchain langchain-community langchain-chroma
pip install pypdf python-dotenv sentence-transformers ollama
\`\`\`

### 2. 启动本地Ollama服务
\`\`\`bash
# 拉取对话模型与嵌入模型
ollama pull qwen2.5:7b
ollama pull bge-small-zh
# 验证服务运行
curl http://localhost:11434/api/version
\`\`\`

## 分步实操
### 1. 文档加载与切片
\`\`\`python
from langchain_community.document_loaders import PyPDFLoader, DirectoryLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

# 1. 加载文档：支持PDF、TXT、Markdown等格式
# 加载单PDF
loader = PyPDFLoader("./docs/深度学习手册.pdf")
documents = loader.load()

# 加载整个目录
# loader = DirectoryLoader("./docs/", glob="**/*.md")
# documents = loader.load()

# 2. 文档切片
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=512,  # 切片大小
    chunk_overlap=50,  # 切片重叠，避免上下文丢失
    separators=["\n\n", "\n", "。", "！", "？", " ", ""]
)
split_docs = text_splitter.split_documents(documents)
print(f"文档切片完成，共{len(split_docs)}个切片")
\`\`\`

### 2. 构建向量数据库
\`\`\`python
from langchain_chroma import Chroma
from langchain_community.embeddings import OllamaEmbeddings

# 本地嵌入模型
embeddings = OllamaEmbeddings(
    model="bge-small-zh",
    base_url="http://localhost:11434"
)

# 构建向量数据库
vector_db = Chroma.from_documents(
    documents=split_docs,
    embedding=embeddings,
    persist_directory="./chroma_db"  # 本地持久化目录
)

# 持久化保存
vector_db.persist()
print("向量数据库构建完成，已持久化到本地")

# 加载已保存的向量数据库
# vector_db = Chroma(
#     persist_directory="./chroma_db",
#     embedding_function=embeddings
# )
\`\`\`

### 3. 构建检索链与RAG系统
\`\`\`python
from langchain_community.llms import Ollama
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate

# 1. 加载本地大模型
llm = Ollama(
    model="qwen2.5:7b",
    base_url="http://localhost:11434",
    temperature=0.3,  # 降低温度，减少幻觉
    num_ctx=4096
)

# 2. 构建检索器
retriever = vector_db.as_retriever(
    search_type="similarity",
    search_kwargs={"k": 4}  # 检索Top4相关切片
)

# 3. 自定义Prompt模板，优化RAG效果
prompt_template = """
你是一个专业的知识问答助手，只能基于以下提供的上下文内容回答问题，
如果上下文中没有相关信息，直接回答"抱歉，我没有找到相关信息"，禁止编造内容。

上下文内容：
{context}

用户问题：
{question}

专业、准确的回答：
"""
PROMPT = PromptTemplate(
    template=prompt_template,
    input_variables=["context", "question"]
)

# 4. 构建RAG检索链
rag_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=retriever,
    chain_type_kwargs={"prompt": PROMPT},
    return_source_documents=True  # 返回检索到的源文档，便于验证
)
\`\`\`

### 4. 问答测试
\`\`\`python
# 用户问题
query = "Transformer架构的核心原理是什么？"

# 执行RAG问答
result = rag_chain.invoke({"query": query})

# 输出结果
print("用户问题：", query)
print("AI回答：", result["result"])
print("\n检索到的源文档：")
for idx, doc in enumerate(result["source_documents"]):
    print(f"[{idx+1}] 文档页码：{doc.metadata.get('page', '未知')}")
    print(f"内容片段：{doc.page_content[:100]}...\n")
\`\`\`

## 优化技巧
1. **文档切片优化**：优先使用语义切片替代固定大小切片，提升检索准确率；技术文档按章节、标题切片
2. **检索优化**：使用混合检索（向量检索+BM25关键词检索），搭配Reranker重排序，检索准确率提升30%+
3. **Prompt优化**：明确禁止模型编造内容，要求基于上下文回答，大幅降低幻觉率
4. **模型选择**：中文场景优先使用Qwen2.5、BGE系列模型，检索与生成效果优于通用开源模型
5. **生产级升级**：轻量场景使用Chroma，高并发场景替换为Milvus/Weaviate向量数据库，对接vLLM提升推理速度` },
  { title: '推理模型本地部署与推理优化指南', category: 'AI', technology: '推理模型', isPublic: true, content: `# 推理模型本地部署与推理优化指南
## 核心概念
推理模型（如OpenAI o3 mini、DeepSeek R1、QwQ）是专为复杂逻辑推理、数学计算、代码编写优化的大模型，核心特点是通过「思维链（Chain of Thought）」实现慢思考，大幅提升复杂任务准确率，而非快速生成。

| 主流推理模型 | 参数规模 | 本地部署最低显存 | 核心优势 |
|--------------|----------|------------------|----------|
| DeepSeek R1 | 7B/14B/70B | 8GB（INT4） | 开源免费，中文推理能力强，对标o1 |
| Qwen QwQ-32B | 32B | 16GB（INT4） | 阿里开源，数学推理能力领先 |
| Llama 3.1 8B-Instruct | 8B | 6GB（INT4） | 轻量推理，速度快，适合边缘部署 |
| InternLM2.5-Math | 7B/20B | 8GB（INT4） | 专为数学推理优化 |

## 一、本地部署实操
### 方案1：Ollama一键部署（新手首选）
#### 1. 拉取并运行模型
\`\`\`bash
# DeepSeek R1 7B（8GB显存可跑）
ollama pull deepseek-r1:7b
ollama run deepseek-r1:7b

# DeepSeek R1 14B（16GB显存推荐）
ollama pull deepseek-r1:14b
ollama run deepseek-r1:14b

# Qwen QwQ-32B（24GB显存推荐）
ollama pull qwen-qwq:32b
ollama run qwen-qwq:32b
\`\`\`

#### 2. 推理参数优化
创建自定义Modelfile，优化推理模型的思维链效果：
\`\`\`dockerfile
FROM deepseek-r1:7b
# 扩展上下文窗口
PARAMETER num_ctx 32768
# 降低温度，提升推理确定性
PARAMETER temperature 0.6
# 开启长思维链，提升复杂任务准确率
PARAMETER num_predict 4096
# 优化采样策略
PARAMETER top_p 0.95
PARAMETER top_k 20
# 系统提示词，强制开启思维链
SYSTEM """
你是一个专业的推理助手，解决复杂问题时必须遵循以下步骤：
1. 先拆解问题，明确核心需求
2. 一步一步进行逻辑推理，写出详细的思考过程
3. 验证每一步的推理是否正确，避免逻辑错误
4. 最后给出最终答案
禁止直接给出答案，必须展示完整的思考过程。
"""
\`\`\`
构建并运行自定义模型：
\`\`\`bash
ollama create deepseek-r1-cot -f Modelfile
ollama run deepseek-r1-cot
\`\`\`

### 方案2：vLLM生产级部署（高吞吐场景）
\`\`\`python
from vllm import LLM, SamplingParams

# 加载DeepSeek R1模型（INT4量化）
llm = LLM(
    model="deepseek-ai/DeepSeek-R1-7B-Chat",
    quantization="awq",
    tensor_parallel_size=1,
    gpu_memory_utilization=0.9,
    max_model_len=32768
)

# 推理参数配置，适配思维链
sampling_params = SamplingParams(
    temperature=0.6,
    top_p=0.95,
    max_tokens=4096,
    stop=["<|endoftext|>", "用户："]
)

# 推理测试
prompt = """
有一个水池，单开甲管需要6小时注满，单开乙管需要8小时注满，
两个水管同时开，多久可以注满水池的3/4？请一步一步写出思考过程和计算步骤。
"""
outputs = llm.generate(prompt, sampling_params)
print(outputs[0].outputs[0].text)
\`\`\`

## 二、推理优化核心技巧
### 1. 显存优化
- **量化优先**：推理模型优先使用AWQ INT4量化，比FP16显存占用减少75%，推理精度损失极小
- **KV Cache优化**：开启PagedAttention，限制max_model_len，长文本推理时显存占用降低80%
- **张量并行**：70B大模型使用多卡张量并行，单卡显存压力大幅降低
- **梯度检查点**：长上下文推理时开启，牺牲少量速度换取显存大幅节省

### 2. 推理效果优化
- **系统提示词工程**：强制模型输出思维链，明确要求分步推理，复杂任务准确率提升40%+
- **温度值调整**：数学/逻辑推理任务设置temperature=0.3-0.6，降低随机性；创意类任务可适当提高
- **采样策略**：使用top_p采样替代greedy采样，平衡推理确定性与多样性
- **长思考模式**：放开max_tokens限制，允许模型输出完整的思考过程，避免中途截断

### 3. 速度优化
- **推理框架选择**：vLLM > Text Generation Inference > Transformers原生推理，速度差距可达5-10倍
- **Flash Attention开启**：开启Flash Attention 2，长上下文推理速度提升2倍，显存占用降低30%
- **批量推理**：高并发场景使用连续批处理，GPU利用率提升300%
- **投机采样**：用小模型做草稿，大模型验证，推理速度提升2-3倍，精度几乎无损失

## 三、最佳实践
1. **场景选型**：简单对话用通用大模型，复杂数学、代码、逻辑推理任务用专用推理模型
2. **资源匹配**：8GB显存优先7B推理模型，16GB优先14B/32B INT4量化版，24GB+可部署70B INT4版
3. **效果验证**：在业务专属数据集上做验证，对比不同模型、不同参数的推理准确率，选择最优方案
4. **成本控制**：日常开发用7B/14B模型，复杂任务用70B模型，避免大模型小用造成资源浪费
5. **生产部署**：生产环境优先使用vLLM部署，开启API鉴权、限流、日志监控，保证服务稳定性` },
]},
];

async function main() {
  const conn = await mysql.createConnection(DB);
  console.log('✅ 数据库连接成功');

  let total = 0;
  for (const day of days) {
    const dateStr = day.date;
    for (let i = 0; i < day.notes.length; i++) {
      const note = day.notes[i];
      // 每篇笔记时间错开几分钟
      const createdAt = `${dateStr} ${10 + Math.floor(i / 2)}:${String(i * 8 % 60).padStart(2, '0')}:00`;
      await conn.execute(
        `INSERT INTO notes (author_id, title, content, category, technology, is_public, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [USER_ID, note.title, note.content, note.category, note.technology, note.isPublic ? 1 : 0, createdAt, createdAt]
      );
      total++;
      console.log(`  [${dateStr}] ${note.isPublic ? '公开' : '私人'} - ${note.title}`);
    }
    console.log(`📅 ${dateStr} 完成，共 ${day.notes.length} 篇`);
  }

  await conn.end();
  console.log(`\n🎉 全部完成！共插入 ${total} 篇笔记`);
}

main().catch(err => {
  console.error('❌ 错误:', err.message);
  process.exit(1);
});

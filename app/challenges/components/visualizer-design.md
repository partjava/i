# 挑战页知识详情与题目可视化设计

## 接手时先看这里

**大屏详情布局和假占位已在本地代码修复。后续主要工作是补图解内容。** 页面入口是同目录的 [KnowledgeTree.tsx](./KnowledgeTree.tsx)。有图解时左列显示题目和公式，右列显示图解。无图解时正文居中单列。浏览器中的宽窄屏排版仍待复测。

| 阶段 | 图解已接入 | 待补 |
| --- | ---: | ---: |
| 基础知识 `basic-knowledge` | 28 | 0 |
| Python 编程 `python-programming` | 0 | 38 |
| 数学基础 `math-foundation` | 0 | 20 |
| 机器学习 `machine-learning` | 2（SVM） | 24 |
| 深度学习 `deep-learning` | 0 | 14 |
| 计算机视觉 `computer-vision` | 0 | 16 |
| 自然语言处理 `nlp` | 0 | 16 |
| 大模型 `llm` | 0 | 24 |
| 强化学习 `rl` | 0 | 12 |
| 工程部署 `engineering-deployment` | 0 | 10 |
| 项目实战 `project` | 0 | 10 |
| 合计 | 30 | 184 |

- 基础知识已有 14 个章节文件，登记入口是 [basic-knowledge/index.ts](./visualizers/basic-knowledge/index.ts)。看 [OperatingSystemVisualizers.tsx](./visualizers/basic-knowledge/OperatingSystemVisualizers.tsx) 可以了解同一文件怎样放两道题，以及 LRU 图怎样用槽位和箭头解释命中与淘汰。
- 机器学习已有 [SvmVisualizers.tsx](./visualizers/machine-learning/SvmVisualizers.tsx)，包含铰链损失和核函数两个演示。两道题在 `KnowledgeTree.tsx` 内分别匹配。

## 如何给剩余题目补图

1. 从 [题库目录](../../../challenges_bank/) 选对应的 `stage-*.json`。按 `stageId` 和 `subtopicName` 找章节，按 `levelIndex` 找该章的两道题。逐题读 `theoryContent`、`starterCode` 和公开用例，记下 `slug` 与 `levelTitle`。
2. 在 `visualizers/<阶段目录>/` 为该章节新建一个 `<Chapter>Visualizers.tsx`。同一个文件导出两道题各自的演示组件。也可以共用坐标轴、绘图函数和控件，每道题需要自己的图形数据和解释重点。
3. 先确定图要回答的问题，再选图形。用箭头解释投影或数据流，用点和线解释模型或提交关系，用色块解释内存和图像变化，用曲线解释训练指标。交互只加能帮助读图的控件，图形和结果从同一组数据计算。单纯把文字步骤排成卡片不能作为图解验收。确实暂时画不清楚的题先留空。
4. 写完后登记并接入 `KnowledgeTree.tsx` 的 `Visualizer` 选择逻辑，否则组件文件不会出现在页面上。可参照基础知识的阶段登记表，为新阶段增加查找函数。**当前接口接线使用阶段、章节名和关卡标题。** 如果详情接口后续返回稳定的 `slug`，优先改用它匹配。现阶段不要假设题库里的 `slug` 已经出现在详情响应中。
5. 验收时从章节侧栏分别点击两道题，核对题面、公式和图解同步切换。确认大屏是左题右图，分类侧栏展开或窗口缩窄时可上下阅读，暂无图解的题使用居中单列。

例如，补「数学基础 → 向量与空间」时，在 `visualizers/math-foundation/VectorSpaceVisualizers.tsx` 写两套图。第一关画向量投影和平行、垂直分量，第二关画夹角变化与柯西–施瓦茨不等式取等。登记两道题后，分别点两关验证，正文直接用题库数据。

## 题面与判题用例

- 每道题的题面明确写出要实现的函数、参数含义、返回类型与字段，以及影响判题的边界条件。答题页展示公开样例的输入和预期结果，让学生能据此写代码和调试。
- 仓库题库中的 214 道内置题目前没有配置隐藏用例。后续逐题在数据库的 `evaluation_cases` 字段补充隐藏用例，优先覆盖题面已说明的边界条件和常见错误。录入前用参考实现验证预期结果。
- 「运行样例」用于检查公开样例。「提交判题」运行全部公开用例和数据库中的隐藏用例。隐藏用例的输入和预期结果仅供服务端判题使用。

### 旧用例的函数参数兼容问题（已修复）

旧用例曾存在 `input` 作为单个字典传入导致多参数函数评测报「入口参数不匹配」的硬核 Bug。现已通过双重方案彻底修复并已同步上线（Commit `4fbd517`）：
1. **适配器智能拆包**：`onlinecompiler_adapter.py` 增加 `_adapt_args` 与 `_entry` 智能解析，自动将字典输入映射并解包为函数形参。
2. **题库用例标准化**：11 个阶段题库 JSON 与 MySQL 数据库 `star_challenges.test_cases` 均已转换为标准 `args` 数组传参。

---

## 挑战系统全面排查报告与待修复清单（2026-11-11 最新诊断）

针对用户反馈的「做出了题目系统未显示完成」、「后台数据缺失/看不到选择题讲解」等问题，经系统性全链路端到端排查（覆盖前端页面状态、REST 接口协议、Spring Boot 业务逻辑与 MySQL 底层数据），定位到以下 5 项严重问题与数据断裂点：

### 问题 1：做题通过后系统不显示通关（通关状态判定与进度链路断裂）

- **故障现象**：
  学生在做题区点击「提交判题」且控制台显示全部用例 Accepted 后，刷新页面或返回宇宙图、左侧章节树时，关卡依然显示未通关（关卡列表无绿色 `✓` 标记、进度显示 `0/2` 关、顶部栏显示 `0/11 阶段`）。
- **深层根本原因**：
  1. **全站题库接口未注入用户进度**：前端宇宙页与章节树通过 `GET /api/star-challenges` 加载所有关卡元数据，但后端 `ChallengeController.listStarChallenges()` 仅调用了 `challengeMapper.selectList()`，**完全没有接收 `userId`，也没有关联查询 `star_challenge_records` 表**，返回给前端的每一个关卡对象都根本没有 `record` 字段。
  2. **前后端字段命名严重混乱错位**：
     - 后端详情 DTO（`ChallengeDetailResp`）定义的通关字段是 **`completed: boolean`**；
     - 数据库 `star_challenge_records` 表的物理字段是 **`code_passed`**；
     - 宇宙主页（`challenges/page.tsx`）计算成就与亮灯时读取的却是 **`c.record?.isPassed`**；
     - 左侧知识树（`KnowledgeTree.tsx`）勾选关卡时读取的却是 **`lv.record?.codePassed`**；
     - 答题区工作台（`QuizWorkspace.tsx`）缓存判断读取的却是 **`(detail as any).userRecord?.codePassed`**。
     由于 4 个位置各自使用不同的字段名，且全站列表接口压根没有返回 `record`，导致即使数据库中正确记录了用户的通关数据，前端所有界面也永远判定为 `false`。
  3. **「运行样例」与「提交判题」心智差异**：
     「运行样例」默认只评测前 2 组公开样例，业务设计上不落库通关状态；部分用户在运行样例通过后误以为已通关，未继续点击绿色的「提交判题」。

### 问题 2：选择题（Quiz）数据缺失、选对判错、解析无法查看

- **故障现象**：
  部分题目切换到「基础理解题 (Quiz)」时显示「本话题暂无官方选择题」；即使有选择题，用户无论选哪一个选项界面都标红并提示「❌ 回答错误」，且无法直接查看官方解析。
- **深层根本原因**：
  1. **关卡 1093（流水线分析器）选择题数据在数据库中丢失**：
     `challenges_bank/stage-01-basic-knowledge.json` 中明确定义了 2 道非常优质的单选理解题与详细原理解析，但在 MySQL `star_challenge_quizzes` 表中，ID 为 1093 的选择题记录为 **0 条**（历史导入遗漏，其余 213 题有数据）。
  2. **后端 DTO 关键属性遗漏，导致前端判定恒为假**：
     后端 DTO `ChallengeDetailResp.QuizItem` 仅包含 `id`, `question`, `options`, `explanation`，**唯独漏掉了正确答案 `answer`（数据库里的 `correct_index`）**！
     在前端 `TheoryQuizPanel.tsx` 中：
     ```tsx
     const isCorrect = quiz.answer === oIdx;
     // quiz.answer 为 undefined，导致 isCorrect 恒为 false！
     ```
     用户即使选了 100% 正确的选项，界面也会将其标红判定为错（显示「❌ 回答错误」）。
  3. **选择题提交校验接口参数错位**：
     前端 `TheoryQuizPanel` 提交选项答案时以数组下标 `0, 1` 作为键（`answers: { "0": 1 }`），而后端 `ChallengeServiceImpl.submitQuizzes` 却按数据库自增 ID（如 `5004`）作为键读取：`answers.get(quiz.getId().toString())`，导致后端校验永远取到 `null`，整题判定永远不通过。
  4. **解析展示交互逻辑不合理**：
     前端解析组件必须等用户点击选项后才会单次弹出；如果用户刷新页面重新进入，或者想直接预习查看原理，由于前端内存状态 `showQuizExplains` 被重置，无法主动展开解析。

### 问题 3：思考题（AI 自动打分）历史成绩与评语无法回显

- **故障现象**：
  用户在「思考答疑」Tab 提交了思考题并获得了 AI 的具体打分（如 8/10）和评语，但一旦刷新页面或再次进入，输入框和打分历史全部消失，需要重新回答。
- **深层根本原因**：
  - 后端在 `evaluateThinkingQuestion` 评测完毕后，确实已把分数和评语写入了 `star_challenge_records` 表的 `thinking_score` 和 `thinking_feedback`；
  - 但在加载详情的接口（`getChallengeDetail`）和 DTO（`ChallengeDetailResp`）中，**压根没有把上次保存的 `thinkingScore` 和 `thinkingFeedback` 返回给前端**，前端重新挂载时只能将输入框和聊天流置空。

### 问题 4：数据库历史脏数据污染隐患（如 ID 1093 题面曾被覆盖）

- **故障现象**：
  打开第 1 关「流水线性能瓶颈分析器」时，题面正文却赫然写着「### 编程挑战：内存页缓存压力模拟器」（即第 2 关的内容），导致题面、公式与代码样例脱节。
- **深层根本原因**：
  数据库历史批处理时发生过错误覆盖。已针对 ID 1093 进行了紧急 SQL 修复，但反映出数据库与仓库题库 JSON 文件存在全量数据同步验证的需求。

---

## 修复实施规划（待推进）

### 第一阶段（P0 紧急）：打通通关状态与数据字段闭环
1. **改造 `GET /api/star-challenges`**：
   接收当前登录用户的 `userId`，左连接 `star_challenge_records`，在返回的关卡列表中注入统一的 `userRecord: { completed: boolean, codePassed: boolean, thinkingScore: int }`。
2. **统一前端通关状态读取**：
   在 `challenges/page.tsx`、`KnowledgeTree.tsx`、`QuizWorkspace.tsx` 中统一改用 `c.userRecord?.codePassed || c.completed`，确保做完题后星空成就、关卡树勾选 `✓`、关卡数 `2/2` 能够即时且永久亮起。

### 第二阶段（P1 重要）：补齐选择题数据与解析交互
1. **补全 ID 1093 选择题**：从 JSON 将流水线瓶颈分析器的 2 道单选题插入 `star_challenge_quizzes`。
2. **修复选择题判定与解析展示**：
   - 在 `ChallengeDetailResp.QuizItem` 中补齐 `answer`（`correctIndex`）字段；
   - 修正前端 `submit-quiz` 的传参 Key，使其与后端 ID 匹配；
   - 增加「查看官方解析」显式按钮，支持随时阅读题目原理解释。

### 第三阶段（P2 完善）：思考题历史回显与全量题库校验
1. **回显思考题历史得分**：在关卡详情响应中增加 `thinkingScore` 与 `thinkingFeedback`，进入页面自动恢复上次打分结果。
2. **全量数据库同步脚本**：编写 `scripts/sync_db_with_bank.py`，核对 214 道内置题的所有字段，确保数据库与 Git 仓库 100% 保持纯净一致。

## 首批样板与验收

先用「向量与空间」验证两种演示。第一关展示原向量、投影和垂直分量，第二关展示向量夹角变化以及柯西–施瓦茨不等式取等的条件。用暂时没有演示的「矩阵乘法与逆」验证单列。

验证站点分类导航展开和收起时布局都能自然切换。窄屏无页面横向滚动，切换关卡时演示与题目对应，开始闯关入口在首屏可找到。

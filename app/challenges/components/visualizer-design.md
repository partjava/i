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

## 挑战系统全面排查报告与待修复清单（2026-11-11 深度诊断）

针对用户反馈的「每次刷新都跳到同一页面（SVM）」、「做出了题目系统未显示完成」、「后台数据缺失/看不到选择题讲解」等问题，经全链路端到端排查（覆盖前端页面状态、URL 路由同步、REST 接口协议、Spring Boot 业务逻辑与 MySQL 底层数据），共定位出 **8 项核心系统性缺陷与断裂点**：

---

### 问题 1：【核心严重】每次刷新都跳到同一页面（强制重置为第四阶段 机器学习 -> 支持向量机 SVM）

- **故障现象**：
  无论用户正在学习哪个阶段（如阶段 1 基础知识、阶段 2 Python）、或者正在浏览哪个知识点/具体做哪道题，**只要在浏览器点击刷新（F5）或直接回车访问，页面必定向强制重置回：`当前阶段: 机器学习` -> `支持向量机 (SVM)`**。如果用户是在答题工作区（`layer=quiz`），刷新后也会被强行踢入 SVM 的答题面板，当前题目的代码和上下文全部丢失。
- **深层根本原因**：
  1. **前端 State 默认值写死 SVM**：
     在 `app/challenges/page.tsx` 中：
     ```tsx
     const [selectedStage, setSelectedStage] = useState<Stage>(STAGES[3]); // 硬编码默认第四阶段-机器学习！
     const [selectedNodeName, setSelectedNodeName] = useState<string>("支持向量机 (SVM)"); // 硬编码 SVM！
     const [selectedLevelIndex, setSelectedLevelIndex] = useState<number>(0);
     ```
  2. **URL 路由参数完全未同步**：
     `page.tsx` 中的 `setCurrentLayer` 仅在 URL 中写入/清空 `layer` 参数（如 `?layer=tree`），**完全没有把当前选中的 `stage`（阶段ID）、`node`（小节名称）、`level`（关卡下标）同步到 URL SearchParams 中**。
  3. **生命周期恢复断裂**：
     浏览器刷新时，Next.js 重新挂载组件，虽然 `layer=tree` 保留了，但由于 URL 没有 `stage` 和 `node` 参数，React 只能执行上述写死的初始 state，导致永远重置回机器学习 SVM。
- **彻底解决方案**：
  - 改造 `page.tsx` 的初始状态读取：优先从 `window.location.search` 中的 `stage`、`node`、`level` 参数以及 `sessionStorage` 恢复当前位置（默认回退到阶段 1 基础知识，而非阶段 4 机器学习）。
  - 实现统一的 `syncNavigation(layer, stage, node, level)` 导航同步函数：无论用户在宇宙图点击星球、在知识树点击小节、切换关卡、或是进入答题，均通过 `window.history.replaceState` 实时持久化当前路由参数至 URL 与会话存储。

---

### 问题 2：做题通过后系统不显示通关（通关状态判定与进度链路断裂）

- **故障现象**：
  学生在做题区点击「提交判题」且控制台显示全部用例 Accepted 后，顶部栏依然显示 `探索进度: 0/11 阶段`、`已做通关: 0 题`；返回左侧章节树时，各小节依然显示 `0/2` 关，关卡列表无绿色 `✓` 打勾标记。
- **深层根本原因**：
  1. **全站题库接口未注入用户进度**：前端宇宙页与章节树通过 `GET /api/star-challenges` 加载所有关卡元数据，但后端 `ChallengeController.listStarChallenges()` 仅调用了 `challengeMapper.selectList()`，**完全没有接收 `userId`，也没有关联查询 `star_challenge_records` 表**，返回给前端的每一个关卡对象都根本没有 `record` 字段。
  2. **前后端字段命名严重混乱错位**：
     - 后端详情 DTO（`ChallengeDetailResp`）定义的通关字段是 **`completed: boolean`**；
     - 数据库 `star_challenge_records` 表的物理字段是 **`code_passed`**；
     - 宇宙主页（`challenges/page.tsx`）计算成就与亮灯时读取的却是 **`c.record?.isPassed`**；
     - 左侧知识树（`KnowledgeTree.tsx`）勾选关卡时读取的却是 **`lv.record?.codePassed`**；
     - 答题区工作台（`QuizWorkspace.tsx`）缓存判断读取的却是 **`(detail as any).userRecord?.codePassed`**。
     由于 4 个位置各自使用不同的字段名，且全站列表接口压根没有返回 `record`，导致即使数据库中正确记录了用户的通关数据（如用户 `9` 在 `star_challenge_records` 中通关了 1093），前端所有界面也永远判定为 `false`。
  3. **「运行样例」与「提交判题」心智差异**：
     「运行样例」默认只评测前 2 组公开样例，业务设计上不落库通关状态；部分用户在运行样例通过后误以为已通关，未继续点击绿色的「提交判题」。
- **彻底解决方案**：
  - 改造后端 `GET /api/star-challenges`，接收当前登录用户的 `userId`，左连接 `star_challenge_records` 查询该用户的做题记录。
  - 在返回的关卡对象中，同时平铺下发多重兼容字段：`completed: boolean`、`record: { codePassed: boolean, isPassed: boolean, completed: boolean }` 和 `userRecord: { ... }`。
  - 前端各组件统一封装判定辅助函数：`Boolean(c.completed || c.record?.codePassed || c.record?.isPassed || c.userRecord?.codePassed)`。

---

### 问题 3：选择题（Quiz）数据缺失、选对判错、解析无法查看

- **故障现象**：
  部分题目（如关卡 1093）切换到「基础理解题 (Quiz)」时显示「本话题暂无官方选择题」；其他题目中，用户无论选哪一个选项（即使选了标准答案），界面也一律标红判定为错（提示「❌ 回答错误」），且无法直接查看官方解析。
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
     用户即使选了 100% 正确的选项，界面也会将其标红判定为错。
  3. **选择题提交校验接口参数错位**：
     前端 `TheoryQuizPanel` 提交选项答案时以数组下标 `0, 1` 作为键（`answers: { "0": 1 }`），而后端 `ChallengeServiceImpl.submitQuizzes` 却按数据库自增 ID（如 `5004`）作为键读取：`answers.get(quiz.getId().toString())`，导致后端校验永远取到 `null`，整题判定永远不通过。
  4. **解析展示交互逻辑不合理**：
     前端解析组件必须等用户点击选项后才会单次弹出；如果用户刷新页面重新进入，或者想直接预习查看原理，由于前端内存状态 `showQuizExplains` 被重置，无法主动展开解析。
- **彻底解决方案**：
  - 将 1093 题库 JSON 中的 2 道选择题补录到 MySQL `star_challenge_quizzes`。
  - 在 `ChallengeDetailResp.QuizItem` 中补充下发 `answer` 和 `correctIndex` 字段。
  - 后端 `submitQuizzes` 同时支持题目的自增 ID 和 0 开始的数组下标作为 Map Key 查找答案。
  - 前端 `TheoryQuizPanel` 增加独立的「查看题目解析」展开/折叠按钮，允许用户随时查阅官方原理解释。

---

### 问题 4：答题工作台（QuizWorkspace）通过代码后未通知父级更新

- **故障现象**：
  在答题区运行测试并获得 ACCEPTED（全部通过）后，控制台弹出了通关庆祝，但顶部的全局进度栏（`探索进度: 0/11 阶段`、`已做通关: 0 题`）没有数字增长；点击左上角返回知识树后，左侧小节和关卡依然显示 `0/2`、没有绿色打勾 `✓`。必须彻底硬刷新整页（重新触发 `GET /api/star-challenges`）才可能同步。
- **深层根本原因**：
  `QuizWorkspace.tsx` 在代码提交通过后，仅执行了 `setLevels(prev => prev.map(...))` 更新了组件内部的局部 `levels` state；**没有任何向父级 `page.tsx` 的回调事件通知**（如 `onChallengePassed`），导致父级的 `dbChallenges` 依然是旧的未通过数据。
- **彻底解决方案**：
  - 在 `QuizWorkspace` 中定义 `onChallengePassed?: () => void` 属性；
  - 当评测状态满足 `shouldRecordChallengePass` 时，不仅更新本地 `levels`，同时主动触发父级的 `onChallengePassed()`（重新执行 `loadChallenges()`），实现星空、知识树与顶部统计数据的毫秒级即时联动点亮。

---

### 问题 5：通关后官方标准答案代码（Solution）无法查看

- **故障现象**：
  代码评测通过后，编辑器右上角或控制台理应出现「查看官方标答」按钮，但界面上始终没有该入口，或者显示「暂无标准答案」。
- **深层根本原因**：
  1. 后端 `ChallengeDetailResp` 出于安全防作弊考虑未下发 `solutionCode`（这是正确的）；
  2. 后端提供了独立鉴权接口 `GET /api/challenges/{id}/solution`（仅在用户已通关时才允许获取）；
  3. 但前端 `QuizWorkspace.tsx` 直接将 `detail.solutionCode` 传给了 `CodeEditorPanel`，在关卡通过后**从未调用过 `/solution` 接口请求标答**，导致 `solutionCode` 恒为 `undefined`，标答按钮永远处于隐藏状态。
- **彻底解决方案**：
  - 在 `QuizWorkspace` 中监听关卡通关状态，一旦 `detail.completed` 为 true 或实时评测获得 `ACCEPTED`，异步调用 `GET /api/challenges/{id}/solution` 获取标准参考代码并回填至编辑器面板。

---

### 问题 6：思考题（AI 自动打分）历史成绩与评语刷新后丢失

- **故障现象**：
  用户在「思考答疑」Tab 提交了思考题并获得了 AI 的具体打分（如 8/10）和评语，但一旦刷新页面或再次进入，输入框和打分历史全部消失，需要重新回答。
- **深层根本原因**：
  - 后端在 `evaluateThinkingQuestion` 评测完毕后，确实已把分数和评语写入了 `star_challenge_records` 表的 `thinking_score` 和 `thinking_feedback`；
  - 但在加载详情的接口（`getChallengeDetail`）和 DTO（`ChallengeDetailResp`）中，**压根没有把上次保存的 `thinkingScore` 和 `thinkingFeedback` 返回给前端**，前端重新挂载时只能将输入框和聊天流置空。
- **彻底解决方案**：
  - 在 `ChallengeDetailResp` 增加 `thinkingScore` 与 `thinkingFeedback` 属性；
  - 后端查询用户记录时回填这两个字段；前端组件挂载时自动恢复 AI 助教打分评语历史。

---

### 问题 7：答题区小节内切换关卡（Level 1 ↔ Level 2）时状态丢失

- **故障现象**：
  在答题区顶部切换到第 2 关，刷新页面后又变回第 1 关；且切换关卡时未向父组件同步当前关卡下标。
- **深层根本原因**：
  `activeLevelIndex` 仅保存在 `QuizWorkspace` 本地状态，未向父组件及 URL 同步 `level` 参数。
- **彻底解决方案**：
  通过 `onLevelChange` 回调通知父组件同步当前关卡下标至 URL 与 `selectedLevelIndex`。

---

### 问题 8：成就系统里程碑完成度（AchievementsDrawer）写死假数据

- **故障现象**：
  点击右侧栏的「成就」抽屉，前 3 个阶段（基础知识、Python、数学基础）永远显示已点亮（`completed: true`），后 8 个阶段永远显示未解锁（`completed: false`），与用户的真实学习通关进度毫无关联。
- **深层根本原因**：
  `AchievementsDrawer.tsx` 中将 11 个阶段的 `completed` 属性硬编码在静态数组中，没有接收题库通关数据进行动态判定。
- **彻底解决方案**：
  将 `dbChallenges` 传入成就抽屉，动态计算各阶段关卡是否全部通关，由真实数据驱动里程碑的解锁与高亮。

---

## 修复实施规划（排期清单）

| 序号 | 任务模块 | 修复内容 | 涉及文件 | 优先级 |
| :--- | :--- | :--- | :--- | :---: |
| 1 | **页面路由与导航防重置** | URL SearchParams 同步、恢复机制、彻底解决 SVM 刷新跳回 Bug | `challenges/page.tsx` | P0 |
| 2 | **通关判定与全站进度闭环** | 改造 `/api/star-challenges` 注入用户记录，统一多重兼容字段名 | `ChallengeController.java`, `page.tsx`, `KnowledgeTree.tsx` | P0 |
| 3 | **选择题补全与解析展示** | 补全 1093 数据库题库、DTO 增加 answer、增加「查看解析」显式按钮 | `star_challenge_quizzes`, `ChallengeDetailResp.java`, `TheoryQuizPanel.tsx` | P0 |
| 4 | **跨组件状态联动通知** | 评测 Accepted 后通过回调主动刷新父级进度和知识树 | `QuizWorkspace.tsx`, `page.tsx` | P1 |
| 5 | **官方标准答案加载** | 通关后自动调用 `/challenges/{id}/solution` 鉴权拉取标答并展示 | `QuizWorkspace.tsx`, `CodeEditorPanel.tsx` | P1 |
| 6 | **思考题历史成绩回显** | DTO 与详情查询回填 thinkingScore 与 thinkingFeedback | `ChallengeServiceImpl.java`, `ChallengeDetailResp.java` | P1 |
| 7 | **关卡切换 URL 同步** | 顶部 Level 切换时同步 `level` 参数至路由 | `QuizWorkspace.tsx`, `page.tsx` | P2 |
| 8 | **成就抽屉动态化** | 移除硬编码，根据实际通关数据动态点亮 11 阶段里程碑 | `AchievementsDrawer.tsx` | P2 |

## 首批样板与验收

先用「向量与空间」验证两种演示。第一关展示原向量、投影和垂直分量，第二关展示向量夹角变化以及柯西–施瓦茨不等式取等的条件。用暂时没有演示的「矩阵乘法与逆」验证单列。

验证站点分类导航展开和收起时布局都能自然切换。窄屏无页面横向滚动，切换关卡时演示与题目对应，开始闯关入口在首屏可找到。

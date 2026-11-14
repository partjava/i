#!/usr/bin/env python3
"""
Enrich and polish all 214 official challenge problem descriptions (`theoryContent`)
and normalize `latexFormulas` across challenges_bank/stage-*.json.
Idempotent: running repeatedly produces identical JSON output.
"""

from __future__ import annotations

import ast
import glob
import json
import os
import re
from typing import Any

SCRIPTS_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.dirname(SCRIPTS_DIR)
BANK_GLOB = os.path.join(ROOT_DIR, "challenges_bank", "stage-*.json")

CJK_RE = re.compile(r"[\u4e00-\u9fff]")

# ---------------------------------------------------------------------------
# 1. Vivid Analogies & Production Engineering Contexts for all 107 subtopics
# ---------------------------------------------------------------------------
SUBTOPIC_STORIES: dict[str, tuple[str, str]] = {
    # Stage 1: 计算机基础 (14)
    "计算机组成原理": (
        "把 CPU 流水线想象成高铁站的多道并联安检口：正常情况下每分钟稳定放行大量乘客，可一旦某个环节出现读取内存等待（Cache Miss）或路线猜错（分支预测失败），整条队伍就会被迫原地停顿（Stall）。",
        "很多线上服务 CPU 占用看似不高却延迟飙升，根因往往藏在海量指令的停顿周期累加，而非单条算术指令本身的耗时。",
    ),
    "操作系统": (
        "操作系统的内存与缓存调度就像图书管理员整理热门书架：桌面位置有限，把刚翻阅过的书放在手边、把冷门书籍请回地下书库，才能把跑腿取书（磁盘 I/O）降到最低。",
        "如果淘汰策略设计不当或碎片管理失控，高并发下会出现严重的抖动（Thrashing）和内存利用率暴跌。",
    ),
    "计算机网络": (
        "路由匹配就像全国快递分拣中心按「省—市—区—街道」逐级匹配目的地：地址写得越精细（前缀越长），分拣优先级就越高，从而避免包裹走错片区。",
        "子网划分借位或掩码边界算错 1 个比特，就会让整段内网流量黑洞化或与邻近网段发生路由重叠冲突。",
    ),
    "编码系统": (
        "字符编码就像不同国家使用的密码本：发送端用 UTF-8 本子把汉字编成多字节密文，接收端若错拿 Latin-1（单字节）本子去对照，就会吐出一串令人头疼的『锟斤拷』乱码。",
        "更隐蔽的是截断或非法续字节混入日志流——如果直接粗暴解码，整个日志解析管道都会被异常中断。",
    ),
    "常用命令": (
        "命令行管道好比车间里一环扣一环的传送带：上一个工具只专注把文件找出来，下一个工具只负责筛选字段或统计频次，组合起来便能秒级完成复杂运维任务。",
        "最危险的陷阱在于直接拼接用户输入去拼 shell 字符串——文件名里一个空格或分号就能引发命令注入风险。",
    ),
    "文件系统": (
        "如果把硬盘比作大型仓库，Inode 就像记录每箱货物大小和货架编号的『档案卡』，而目录项只是贴在门上的『货品名字条』；文件多到一定程度时，货架还没放满，档案卡却可能先用完了。",
        "日志碎片化产生海量小文件时，往往磁盘空间显示还有富余，新请求却因 Inode 耗尽而报错无法写入。",
    ),
    "权限管理": (
        "Linux 权限与 sudo 规则就像数据中心的门禁分级制度：门卡上明确写了谁能进机房查看日志（r）、谁能调整配置（w）、谁能重启机器（x），严禁图省事发一张『万能通行卡』。",
        "过度开放 777 权限或滥用 NOPASSWD 通配命令，会让一次普通业务漏洞瞬间放大成整台主机失陷。",
    ),
    "进程管理": (
        "进程调度器如同多核厨房里的主厨：必须盯着每个灶台（进程）的火候与虚拟运行时间（vruntime），在阻塞、就绪与运行之间快速切换，避免僵死进程白白占着灶位。",
        "如果父进程忘了及时回收退出子进程或优先级权重失衡，孤儿/僵尸积累与饥饿现象会悄悄拖垮系统吞吐。",
    ),
    "Shell脚本": (
        "自动化运维脚本相当于值班机器人的标准操作手册（SOP）：从日志轮转压缩、安全清理过期归档到异常告警，每一步都必须可重复、可审计、能扛住边界异常。",
        "生产事故常常发生在『昨天跑得好好的脚本今天突然删错目录或漏压缩』——根源通常在于缺少严格的状态校验与安全防护。",
    ),
    "init/clone": (
        "初始化与克隆仓库就像为一栋大楼建立施工总档案库：从拉取历史蓝图、配置 `.gitignore` 屏蔽临时垃圾，到设定远端同步坐标，决定了团队协作的起跑线是否整洁。",
        "一旦在初始提交里误把密钥或上百 MB 的编译缓存推上去，后续每个协作者克隆仓库时都要背负沉重负担。",
    ),
    "add/commit/push": (
        "精准暂存与原子提交就像外科医生按步骤缝合并写病历：把关联改动打包成一个语义内聚的提交（Cohesive Commit），未来排查问题或回滚时才能一目了然。",
        "如果把十几个不相关的功能与调试代码一股脑全塞进一个 commit，出故障后 `git bisect` 与 `revert` 都会变得痛苦不堪。",
    ),
    "branch/merge": (
        "分支模型好比影视后期剪辑的多条平行轨道：新功能在独立支线试验互不打扰，验收合格后再与主干轨道（main）汇合。",
        "若分支长期游离不合并又不定期清理陈旧分支，仓库里很快会堆满真假难辨的僵尸分支与合并灾难。",
    ),
    "rebase": (
        "Git Rebase（变基）像把支线故事重新抄写到最新主线剧情的结尾：让提交历史变成一条干净流畅的直线，免去满屏无意义的 Merge 提交节点。",
        "但如果在多人共享的公共分支上执行 Rebase 改写历史，别人本地的提交树会与远端彻底分叉，引发严重的同步冲突。",
    ),
    "conflict解决": (
        "合并冲突就像两位作者同时修改了书稿的同一段落：Git 会忠实标出 `<<<<<<<`、`=======`、`>>>>>>>` 边界，把最终保留哪一版或如何融合的裁决权交给工程师。",
        "机械地全局选 ours 或 theirs 最容易在不知不觉中『覆盖掉队友昨晚刚修好的线上 Bug』。",
    ),
    # Stage 2: Python编程 (19)
    "变量与数据类型": (
        "类型解析与校验就像快递站入口的电子秤与安检仪：不管上游配置还是表单传来的全是一串文本，入站第一关必须准确拆箱变成整数、浮点、布尔或整数列表，不合格当场报错拦截。",
        "真实线上最怕『隐式错误容忍』——比如把 `'true'` 误当非空字符串直接 `bool('false') == True`，导致开关逻辑彻底反向。",
    ),
    "条件语句": (
        "条件分支就像繁忙十字路口的智能信号灯配时规则：不仅要把常规高低峰值分流清楚，还要提前防范逻辑顺序颠倒导致某个分支永远进不去（死分支）。",
        "多层嵌套与边界开闭区间（`<` vs `<=`）一不留神错写 1 位数，就会让边界样本落入错误等级。",
    ),
    "循环": (
        "循环与批处理调度就像网约车派单或机场摆渡车发车表：既要在单趟容量装满后计算执行时长，还要妥善处理『最后一趟未满载但仍需按批次发车』及批次间冷却间隔。",
        "写循环任务最常见的翻车点是首尾边界多算或少算一次间隔（Off-by-one Error）。",
    ),
    "函数": (
        "良好设计的函数就像工业标准化模块接头：输入签名明确、职责单一、返回值结构契约稳定，才能既自己跑得稳，又让下游调用方放心组合嵌套。",
        "尤其要警惕 Python 可变默认参数与状态污染问题——每次调用都应保持清晰可预测的输入输出映射。",
    ),
    "List 列表": (
        "动态列表（List）相当于一排带编号的可伸缩储物柜：既能按顺序记录事件轨迹，也能用切片、双指针或区间合并把零碎时间段整理成连续区间。",
        "区间归并时如果忘了先按起点排序，或直接边遍历列表边增删元素，下标瞬间就会乱套。",
    ),
    "Tuple 元组": (
        "不可变元组（Tuple）犹如贴了防篡改封条的坐标标签或只读契约：适合用来固定表示点位坐标、版本元组，还能安全充当字典键值做快速索引。",
        "许多初学者容易忽视单元素元组末尾必须加逗号 `(x,)` 的语法细节，以及命名解包带来的可读性红利。",
    ),
    "Dict 字典": (
        "字典（Dict）是底层哈希表驱动的『秒查通讯录』：无论数据规模扩到多大，通过键精确查找平均只需常数时间 $O(1)$，是高频计数与多层配置合并的绝对主力。",
        "深度递归合并嵌套字典时，必须严格区分『同名键对应两边都是字典（继续深合并）』与『非字典直接覆盖』两种情况。",
    ),
    "Set 集合": (
        "集合（Set）好比一场按徽章去重的权限审查会：天然消除重复条目，并用极快的交集（`&` / $\\cap$）、并集（`|` / $\\cup$）、差集（`-` / $\\setminus$）代数运算秒算用户权限重叠与黑白名单差。",
        "若用普通列表两重嵌套循环做交差集对比，时间复杂度会瞬间退化成 $O(n^2)$。",
    ),
    "文件读写": (
        "文件读写就像流式盘点档案室里的成百上千份日志：不能动不动把几个 GB 的文件整个搬进内存，而应逐行扫描过滤并精确统计关键字命中频率。",
        "同时要关注大小写、空白裁剪与上下文资源安全释放，防止句柄泄漏。",
    ),
    "JSON解析": (
        "JSON 数据清洗管道如同把五花八门的异构包裹统一贴标入库：接口传来的年龄可能是 `'18'`，状态可能是 `'true'`，甚至掺杂空值与嵌套列表，必须在管道层先规范化类型再喂给业务或模型。",
        "解析器如果不考虑嵌套结构与异常字段兜底，遇到脏数据就会导致整条 ETL 流水线崩溃。",
    ),
    "CSV数据分析": (
        "处理 CSV 表格数据好比把散落的财务流水账按部门分组汇总（Group-By + Aggregation）：一次遍历把属于同一分组的数值归拢，再分别算出求和、均值、极值与计数。",
        "面对空值字符串、除零风险或大小写混杂的聚合指令，健壮的类型转换与防错处理至关重要。",
    ),
    "Class类": (
        "类与对象是给真实业务实体画『蓝图与工装模具』：以连接池为例，用类把可用队列、繁忙句柄、最大上限和借还锁逻辑封在一起，外部只需调用 `acquire/release` 即可。",
        "面向对象的核心价值在于管理复杂内部生命周期与不变量约束——比如确保繁忙连接数加空闲连接数永不超过上限。",
    ),
    "封装": (
        "封装就好比给精密仪表加上玻璃外壳和合法旋钮：外界想往购物车加减商品或存取账户余额，只能走规范校验方法，绝不允许外部代码随手把库存或余额改成负数。",
        "属性校验缺失往往是状态错乱、折扣超发或非法扣款 Bug 的温床。",
    ),
    "继承": (
        "继承就像是建立技术体系的『公共父类基座』：把所有缓存后端或几何图形共享的基础属性和协议放在基类里，让内存缓存、磁盘缓存等子类只专注各自差异化存储逻辑。",
        "优秀的继承体系必须严格遵守里氏替换原则——子类扩展行为时不能破坏父类对外承诺的方法契约。",
    ),
    "多态": (
        "多态让调度系统拥有『同一句指令、不同执行者各自精彩演出』的能力：业务层只管调用 `formatter.format(record)`，无论是转成纯文本日志、JSON 还是结构化表格都无缝切换。",
        "利用好鸭子类型与统一接口抽象，就能彻底告别臃肿难维护的 `if/elif/else` 类型分支。",
    ),
    "迭代器": (
        "分页迭代器就像按页装订的实体翻页画册：不需要一次性印刷全套一万页，每翻一页时只现算、现切当前页窗口 `[i*size : (i+1)*size]`，读到末尾礼貌抛出 `StopIteration`。",
        "实现 `__iter__` 与 `__next__` 协议后，自定义容器即可直接融入 Python 原生 `for` 循环与解包生态。",
    ),
    "生成器": (
        "生成器（Generator）是懂得『按需懒汉现做』的高级面点师：借助 `yield` 暂停并记住上次执行的现场状态，哪怕要吐出百万级斐波那契流或分页流，内存占用依然接近零。",
        "一旦理解了惰性求值与状态挂起/恢复，许多看似吃内存的大数据流处理代码都能缩减为十行以内。",
    ),
    "装饰器": (
        "装饰器就像给既有函数无缝加装的『可插拔外挂中间件』：无需修改核心业务源码一字一句，就能从外部透明织入缓存记忆化、耗时审计或指数/固定退避自动重试。",
        "切记配合 `functools.wraps` 保护原函数元信息，并在设计 `@retry` 时妥善区分成功早停与最终重试耗尽抛错。",
    ),
    "Lambda表达式": (
        "Lambda 匿名表达式就像现场即兴递出的『一次性排序标尺』：排序规则如果只需要写一行短函数（比如先按优先级降序、再按时间戳升序），用 `lambda` 就地描述最清爽利落。",
        "掌握多字段元组键技巧（例如负号实现数值降序、结合原字段升序），几乎可以一网打尽所有业务多维排序需求。",
    ),
    # Stage 3: 数学基础 (10)
    "向量与空间": (
        "向量就像带箭头的空间指南针：既有方向又有长短，而投影与正交分解相当于问『如果阳光垂直照射到目标路线上，向量在这条路上落下的影子有多长、多偏』。",
        "在推荐系统余弦召回、物理碰撞反弹及注意力计算中，零向量防除零与正交分量累加精度直接决定数值稳定性。",
    ),
    "矩阵乘法与逆": (
        "线性系统 $Ax = b$ 好比一套互相牵制的多个齿轮传动组：只有当矩阵 $A$ 行列式不为零（各方向齿轮不卡死、无冗余共线行）时，逆矩阵 $A^{-1}$ 才存在并能倒推唯一输入解。",
        "数值计算里当矩阵接近奇异（病态矩阵）时，行列式判断门槛比精确 equals zero 更值得重视。",
    ),
    "SVD奇异值分解": (
        "SVD 奇异值分解就像把一张高像素写真画拆解成『粗略轮廓 -> 主体阴影 -> 微小发丝纹理』按重要性排序的无数透明胶片：只保留前 $k$ 张能量最大的胶片叠加，也能以几分之一存储还原神韵。",
        "不仅图片有损压缩依赖它，大模型的低秩微调（LoRA）与推荐矩阵补全背后都是同一套低秩近似思想。",
    ),
    "特征值与特征向量": (
        "把矩阵 $A$ 视作空间形变机器，绝大多数向量被它吞吐后都会歪斜转弯，唯有极少数『骨骼清奇』的方向只被纯粹拉伸而不旋转——它们就是特征向量，而拉伸倍数就是特征值 $\\lambda$。",
        "谷歌早期 PageRank 网页权重排序，正是靠幂迭代不断把初始概率向量乘上转移矩阵，最终收敛到主特征向量。",
    ),
    "贝意斯公式": (
        "贝叶斯推断就像老练侦探破案的动态更新过程：先有一个基于历史经验的『先验怀疑度』$P(C_k)$，每当新证据（如可疑关键词）浮现，就用条件似然概率修正得出最终『后验判定』。",
        "实战写朴素贝叶斯垃圾邮件分类时，直接连乘极小概率极易导致浮点下溢归零，工程上几乎总是转成**对数似然相加**来保精度。",
    ),
    "高斯/伯努利分布": (
        "概率分布好比刻画随机世界规律的模具：伯努利分布专门描述『抛一次硬币成功还是失败』的是非门事件，而高斯分布则像大自然最偏爱的钟形曲线，汇聚了无数微小独立波动的总和。",
        "大数定律与中心极限定理进一步保证：哪怕原始单次抽样分布古怪，足够多次重复采样的均值也必然悄然收敛向正态钟形。",
    ),
    "最大似然估计(MLE)": (
        "最大似然估计遵循一条极其朴素的哲学：『既然这批观测数据已经在我们眼前真实发生了，那参数就该取那个让当前观测结果出现概率最大的值！』",
        "通过把连乘概率目标函数取 $\\log$ 变加和再令导数为零，正态样本的均值和有偏样本方差正是 MLE 给出的完美闭合答案。",
    ),
    "偏导数与梯度": (
        "站在凹凸不平的多维山谷地图某处，如果只沿东边走看坡度叫对 $x$ 求偏导，而把所有方向坡度合在一起指出的『最陡爬坡/下山矢量箭』就是梯度 $\\nabla f$。",
        "手推神经网络反向传播公式极易正负号笔误，用中心差分数值梯度检验对比解析梯度，是每个算法工程师压箱底的『自动验算尺』。",
    ),
    "梯度下降算法": (
        "梯度下降宛如浓雾封山时盲人找谷底的策略：脚底每迈一步先感知当前哪个方向坡最陡，然后沿反方向小心下移步长 $\\eta$；加入动量（Momentum）就像推着重铁球下山，既冲过小坑洼又在平坡稳稳加速。",
        "学习率选太大容易直接一步跨过谷底甚至来回震荡发散，选太小则像乌龟散步半天不到最低点。",
    ),
    "泰勒展开式": (
        "泰勒展开相当于给任何弯曲晦涩的高阶函数画『越来越逼真的局部多项式替身』：零阶用水平直线凑数，一阶借用切线逼近，二阶叠加曲率弧度——取的阶数越多，局部贴合越丝滑。",
        "无论是大模型训练里的二阶牛顿优化近似，还是计算科学库快速估算 $e^x$、$\\sin(x)$、$\\ln(1+x)$，都少不了它。",
    ),
    # Stage 4: 机器学习 (13)
    "线性回归": (
        "线性回归相当于用一根刚性木尺穿过散乱分布的数据星云，让所有点到木尺的竖直误差平方总和最小；如果引入 $L_2$ 岭回归（Ridge），相当于给木尺斜率再绑上一根回正橡皮筋防止倾斜过猛过拟合。",
        "当特征之间共线相关（$X^T X$ 不可逆）或特征维数极高时，解析正规方程求逆不仅耗时还会数值爆炸，此时必须加上正则项或切向迭代求解。",
    ),
    "Logistic回归": (
        "虽然名字里带着『回归』，Logistic/Softmax 回归实际上是一把用 S 曲线（Sigmoid/Softmax）把连续打分平滑捏进 $(0,1)$ 概率区间的分类器，专门输出样本归属各类别的置信度。",
        "实现二元或多元交叉熵损失及 $\\exp$ 时，一定要做好 $\\text{clip}$ 截断与最大值平移稳定技巧，防止溢出产生 `NaN`。",
    ),
    "支持向量机 (SVM)": (
        "SVM 的直觉好比在红蓝两帮人群之间画马路分界线：普通分类器随便找条能隔开两伙人的线就交差，而 SVM 执着于拓出『最宽阔安全的隔离街道（最大间隔 Margin）』，还允许引入软间隔惩罚与核技巧把线性不可分的数据投向高维拉直。",
        "一旦遇到异常噪点越界，合页损失（Hinge Loss）的线性惩罚机制就成了权衡间隔宽度与误分容忍度的核心杠杆。",
    ),
    "决策树": (
        "决策树非常像医生问诊流程或二十个问题猜物游戏：每一次提问都挑最能瞬间『消融不确定性』的那道特征阈值劈开数据集（分类看基尼不纯度/信息增益最大下降，回归看左右子区间方差最小分割）。",
        "构建递归分裂树时必须设好最大深度或最小样本数刹车线，否则树会长成把训练集噪音逐条死记硬背的过拟合大树。",
    ),
    "随机森林": (
        "随机森林体现了『三个臭皮匠顶个诸葛亮』的 Bagging 智慧：每棵决策树只在自助抽样（Bootstrap）约 $63.2\\%$ 的局部数据和随机挑选的特征子集上训练，最后集体投票或平均压低个体方差。",
        "而剩下那 $36.8\\%$ 没被某棵树抽中训练的袋外（OOB）样本，正好天然免费充当该棵树的实时交叉验证集！",
    ),
    "XGBoost": (
        "如果说随机森林是『平行组队一起投票』，那 XGBoost/GBDT 就是『接力棒式错题本精进法』：第一棵弱树先尽力猜一轮，第二棵树专攻前面猜错留下的残差，再由学习率 $\\eta$ 稳妥叠加，一步步把偏差压向极限。",
        "步长过激容易在局部残差上过拟合；调小学习率配合渐进式树模型累加往往是竞赛夺冠的常青策略。",
    ),
    "KNN": (
        "K 近邻（KNN）是『物以类聚、人以群分』的最朴素体现：不做任何复杂前置训练，真有新样本上门问前程时，直接拿尺子量它离历史上最近的 $K$ 位邻居（甚至越近权重越重），票数最多或加权均值就是答案。",
        "如果不提前把各特征尺度和量纲放缩到同一水平线，单位跨度较大的维度（比如万元工资 vs 年龄个位数）会彻底吞没其它维度的话语权。",
    ),
    "K-Means聚类": (
        "K-Means 像在一块空地上选 $K$ 个快递自提点：先把每个包裹分给最近的点，然后把自提点搬迁到各自所辖包裹的几何中心，循环往复直到自提点不再挪动；而 K-Means++ 会聪明地让新选初始点尽量远离已有中心，避免挤成一团。",
        "传统随机初始化最怕踩中局部最优陷阱，且平局距离与空簇异常是工程编写中必测的边界条件。",
    ),
    "DBSCAN": (
        "DBSCAN 基于『社交人气密度』来画朋友圈：不像 K-Means 傻傻画圆形领地，它只要周围 $\\varepsilon$ 半径内的朋友凑够 `MinPts` 人就能点亮为核心骨干，然后滚雪球般连成任意蜿蜒形状的簇，孤零零的独行侠则被直接标记为噪声 `-1`。",
        "$k$-distance 曲线的『拐点（Elbow）』能帮你在真实项目里科学锁定那个恰到好处的邻域半径 $\\varepsilon$。",
    ),
    "层次聚类": (
        "层次聚类就像生物界编纂物种进化家谱树（Dendrogram）：一开始每个点独立门户，随后按『最短距离（Single） / 最长距离（Complete） / 均值距离（Average）』法则由近及远两两合并家族，直到所有人汇为同一祖先。",
        "凝聚策略不同会导致生成的簇形状截然不同——比如 Single 容易连出细长链条，而 Complete 更偏好紧凑球团。",
    ),
    "PCA主成分分析": (
        "PCA 主成分分析就像给三维雕塑选最好的角度拍一张二维定妆照：旋转坐标系对准数据散开程度（方差）最大的主轴方向，勇敢舍弃变化微乎其微的次要方向，用最少维度保住最大信息量。",
        "如果紧接着再对主轴分数按特征值平方根反向放缩（白化 Whitening），还能同时彻底消除各轴尺度的相关性失衡。",
    ),
    "特征标准化": (
        "特征标准化就是把身高（米）、年薪（元）、年龄（岁）等各怀绝技却单位迥异的数值，统一按自身均值平移居中并用标准差缩放到同一尺码上公平竞逐；若数据里偶有千万级土豪离群点，则改用中位数与四分位距（IQR）做抗噪 Robust 放缩。",
        "实战最大红线是『数据泄漏』——绝不能用测试集混合进来求均值与方差，只能拿训练集的缩放参数来变换评估集。",
    ),
    "数据归一化": (
        "各种归一化（Normalization）本质上都在解决『谁来对齐谁的尺度』：批归一化（BatchNorm）在同一批次内跨样本横向拉齐同一个特征通道，而层归一化（LayerNorm）则在单个样本内部沿着自身所有特征对齐——这正是大模型告别变长序列批大小依赖的秘密！",
        "切记 BatchNorm 在训练态和推理态的行为分叉：训练用当批统计并更新滑动均值，推理时则必须锁定累计好的全局 `running` 统计。",
    ),
    # Stage 5: 深度学习 (7)
    "MLP多层感知机": (
        "多层感知机（MLP）就像层层提纯精炼的流水车间：每一层先用权重矩阵 $W$ 做线性旋转拉伸并加偏置 $b$，再通过 ReLU 等非线性激活阀门弯折空间，多层接力即可拟合任意复杂非线性界面。",
        "若没有非线性的激活函数穿插其间，不管堆叠一百层还是十层网络，在代数上都等价于区区一层线性矩阵乘法。",
    ),
    "激活函数与梯度消失": (
        "激活函数充当神经元的放电阈值开关：早期的 Sigmoid/Tanh 在两端输入稍大时斜率趋近零，导致反向传回去的梯度乘着乘着就中途熄火消失；而 ReLU/LeakyReLU/ELU/Swish 正是依次接力解决梯度枯竭与神经元死亡问题的演化之路。",
        "写数值实现时，对 Sigmoid 与 Softmax 保持超大负数的溢出防护是工程稳健性的基石。",
    ),
    "损失函数": (
        "损失函数是模型训练过程中的『考官打分裁判员』：分类预测概率跑偏多大，交叉熵（Cross-Entropy）就给出对应严厉度的高额扣分；而面对正负样本极度悬殊的挑战，Focal Loss 会给轻松答对的简单样本打折降权，集中火力逼模型死磕难例。",
        "记住 $\\log(0)$ 是训练突现 `NaN` 的头号杀手——务必在取对数前把概率安全截断进 $[\\epsilon, 1-\\epsilon]$ 区间。",
    ),
    "反向传播": (
        "反向传播（Backpropagation）本质是微积分链式法则的一笔精确账目倒算：最终总损失出偏差后，从输出端沿着计算图（Autograd DAG）原路回溯逐节点摊派责任，把每一层参数对误差该背多大锅（梯度）精准算清。",
        "如果图里多个分支汇聚到了同一个参数变量，各条路径传回来的上游梯度必须做**累加（+=）**而非覆盖。",
    ),
    "SGD与Adam优化器": (
        "SGD 像照直下山的稳步徒步者，Momentum 替它加上了惯性冲劲跨越平缓小坑，而 Adam 更像是给每个参数都配了一双自适应步长测速跑鞋：不仅看历史一阶方向动量，还根据梯度历史二阶波动幅度自动调节跨步大小。",
        "在实现 Adam 时万万不可漏掉早期训练步数偏差修正 $\\frac{1}{1 - \\beta^t}$，否则最初几轮参数步长会严重偏小缩水。",
    ),
    "Batch Normalization": (
        "Batch Normalization 好比给每一层深层神经元前加装的一台『稳压稳流器』：强行把前一层刚吐出、可能大幅漂移的激活分布重新拉回均值 0 方差 1，再用可学习的 $\\gamma$、$\\beta$ 精细复位，彻底解开『内部协变量偏移』死锁。",
        "对比 LayerNorm 在单条样本特征内独立求统计，BatchNorm 更依赖足够大的批尺寸与准确的动量移动平均追踪。",
    ),
    "Dropout正则化": (
        "Dropout 就像球场训练中刻意随机蒙住部分队员双眼让剩下队友学会兜底：每次前向训练以概率 $p$ 随机关闭神经元防止死抱某条特征大腿共适应；或采用 Inverted Dropout 在训练阶段顺手放大 $1/(1-p)$ 倍，从而让测试阶段原汁原味免改结构全军出战。",
        "评估推理期必须果断关掉随机丢弃掩码；而在测试期刻意保持采样跑多次并求均值，便升级成能估算不确定度的 MC Dropout！",
    ),
    # Stage 6: 计算机视觉 (8)
    "图像滤波与增强": (
        "空间卷积滤波犹如拿着一块透明加权放大镜在图片方格上一格一格滑动加权融合：高斯权重放大镜负责温柔抹平颗粒噪点，拉普拉斯核专挑突变高反差做锐化增强，而直方图均衡则顺手拉满全局对比暗部细节。",
        "边缘像素做 `same` 卷积补零边界和亮度溢出 $[0, 255]$ 裁剪截断，是决定图像不产生黑边或色斑破损的关键。",
    ),
    "边缘检测 (Canny)": (
        "识别图像骨架（Canny / Hough / Harris）遵循一套严密的筛选流水线：先由梯度幅值和角度锁定所有高坡位置，再靠非极大值抑制（NMS）把粗轮廓削细成单像素精细线条，紧接着双阈值滞后连通去伪存真——乃至借助霍夫极坐标投票或矩阵特征寻找到几何直线与稳定角点。",
        "梯度角度分区若错判区间方向，非极大值抑制会把原本清脆的边缘整个削没。",
    ),
    "色彩空间转换": (
        "RGB 就像绘画颜料三原色混合，符合显示器发光规律；但在实际视觉识别光照变化时，HSV/HSI 或 Lab 空间把明度亮度与纯正色调彻底解耦拆开——甚至只需移植目标图的均值方差就能无痛迁移电影色调大片质感。",
        "注意处理无饱和度灰度点时 `H` 通道会出现除零角，此时应规定默认色相值并做好溢出保护。",
    ),
    "SIFT特征提取": (
        "SIFT 就像为图片角落寻找独一无二的『指纹特征锚点』：哪怕照片被旋转歪斜、拉远缩小或是轻微改变明暗，高斯差分金字塔（DoG）抽出的极值点结合梯度方向直方图描述符依然坚如磐石；而对描述子使用近邻比值检验（Lowe's Ratio Test），能果断踢掉九成似是而非的误匹配。",
        "当第二近邻距离接近零时务必加分母守卫，避免出现无意义的比值爆表。",
    ),
    "LeNet/ResNet分类": (
        "LeNet 开启了局部权值共享特征提取的先河，但当网络疯狂堆叠至几十上百层时，梯度回传反而越来越虚弱甚至退化；何恺明提出的 ResNet 残差跳跃连接就像修了一条跨楼层高速电梯 $y = F(x) + x$，哪怕中间卷积层几乎什么都没学成，好特征也能乘原样恒等通路畅行无阻。",
        "注意当残差分支改变空间步长或通道维度时，快捷旁路本身往往也需要投影变换来对齐维度。",
    ),
    "目标检测 (YOLO)": (
        "YOLO（You Only Look Once）彻底改变了早期目标检测『慢吞吞先找疑似框再挨个分类』的旧套路：将画面切割成整齐网格矩阵，每个网格直接单次前向一口气吐出物体框位置、有没有东西的置信度和类别概率，最后靠交并比（IoU）与 NMS 清场去重。",
        "手算损失函数与框重叠交并比时，坐标到底是用 `(x1, y1, x2, y2)` 还是中心宽高 `(cx, cy, w, h)` 务必在写前审清。",
    ),
    "图像分割 (U-Net)": (
        "U-Net 分割网络酷似一座对称的『先深挖语义、再精细还原』桥梁：左边编码器步步缩图提炼『这是不是只猫』的全局宏观语义，右边解码器逐步上采样并用跳跃连接补回左边保存的高清细节边角，并用 Dice / IoU 来精确衡量与像素金标准的贴合度。",
        "面临极端小目标像素占比极少时，普通准确率会虚高欺骗开发者，此时平滑分子分母的 Dice 系数才是最真实的试金石。",
    ),
    "SAM分割大模型": (
        "SAM（Segment Anything）堪称视觉领域的『一触即切交互魔术棒』：极耗算力的图像特征由重型 ViT 编码器预先一次性算成缓存嵌入；此后不管你在画面上点击一个前景红点、画个粗略框还是圈出排除点，轻量化 Mask 解码器都能在几十毫秒内实时切出边缘精准的多个分层掩码。",
        "工程部署时核心技巧正是复用意象 Embedding 与根据 IoU 置信度预测头来择优输出最优掩码。",
    ),
    # Stage 7: 自然语言处理 NLP (8)
    "分词与词性标注": (
        "中文句子词与词之间连成一片没有天然空格边界，分词就是手持词典拿着剪刀找出合理边界的第一道门：从最长词贪心匹配的 FMM，到用数据统计频繁把相邻高频字符粘合并体的 BPE 子词切分器，既防未登录词乱切又控制住词表体积。",
        "切记最大匹配窗口不能超词典最长词长度，且遇到未收录生僻单字时也要单步推进避免陷入死循环。",
    ),
    "TF-IDF特征": (
        "TF-IDF 和 BM25 是工业信息检索屹立数十年的权重公式：『的、了、是』全网随处可见所以不值钱（IDF 低），唯独在整套语料库里极其稀罕却偏偏在你眼前这份文档里频频冒头的专有名词（TF 高 + IDF 高），才是这篇文章真正的灵魂标签！",
        "而升级版的 BM25 更精明地给高词频加上了饱和上限并考虑了文档长度偏置惩罚，从而防止长水文靠无脑堆词霸榜。",
    ),
    "Word2Vec词向量": (
        "Word2Vec 用一句名言概括就是『观其伴而知其意（Distributional Hypothesis）』：经过在百万语料里玩『用周边邻居词猜中心词（CBOW）』或『用中心词反推邻居词（Skip-gram）』的上下文游戏后，每个词都会领悟到一套蕴含语义关系的几何向量坐标，让『国王 - 男人 + 女人 ≈ 女王』水到渠成。",
        "工程实现上矩阵向量相乘算相似度与梯度更新时要注意形状对齐及防除零安全。",
    ),
    "BERT预训练模型": (
        "如果传统单向语言模型只能盲人摸象般从左读到右，那 BERT（双向编码器表示）更像做英语完形填空的高手：把一句话里随机遮住 $15\\%$ 的空 `[MASK]` 掉，允许模型同时扫视前后左右全部上下文后再去精准还原缺失词汇与判断上下句承接关系（NSP）。",
        "正是这种双向上下文全览理解能力，让它一举刷新几乎所有阅读理解与文本分类基准。",
    ),
    "LSTM/GRU序列建模": (
        "循环神经网络（RNN）常因为记忆容量太小读着读着后面就忘了开头（梯度消失/爆炸），而 LSTM 与 GRU 通过巧妙加装三条可控『细胞水门』解决了长程失忆：遗忘门决定删掉哪部分过时信息，输入门写入眼前新重点，输出门决定此刻对外汇报什么状态。",
        "GRU 则进一步将遗忘和写入合并为更轻巧的更新门 `z` 与重置门 `r`，用更少参数量跑出媲美 LSTM 的记忆效果。",
    ),
    "Self-Attention自注意力": (
        "Self-Attention 就像一场大型鸡尾酒会的注意力聚焦魔法：句中每个词同时放出询问『我想找什么（Query）』、牌子『我有什么特征（Key）』与内涵『真被看中我能提供什么（Value）』。距离再远的两个指代词也能直接手拉手算亲和力分数，而除以 $\\sqrt{d_k}$ 恰是为了防止内积随维度飙升导致 Softmax 梯度全饱和归零。",
        "解码生成阶段的因果遮罩（Causal Mask）则是把未来位置的注意力得分封成 $-\\infty$，严防模型考试偷看后面标准答案！",
    ),
    "多头注意力机制": (
        "单头注意力好比用一副滤镜看文章，每次只能专注一种语法指代；而多头注意力（Multi-Head Attention）则相当于同步开启 $h$ 台独立并行聚光灯——A 头专门盯主谓宾结构，B 头专注指代消解，C 头捕捉修辞语气，最终拼合起来投射出全景立体语义理解。",
        "实现中最易踩的坑是把通道总维数 `d_model` 拆分成 `(num_heads, d_k)` 时的张量转置维度顺序别搞错。",
    ),
    "编码与解码器": (
        "编码器-解码器（Encoder-Decoder）就像高水平同声传译搭档：左边编码器先把整段源语言文字嚼碎融化为富含全局信息的上下文张量序列；右边解码器则像挤牙膏一样逐字自回归（Auto-Regressive）生成译文，每生成一字都能借助交叉注意力瞄回源句最相关的位置；若搭配 Beam Search 保留每步最优 $K$ 条路径，更能避开贪心视野短浅造成的全局差句。",
        "记得每次束搜索扩展都要按长度与累计对数概率精细排序修剪，才能保证既精准又不至指数爆炸。",
    ),
    # Stage 8: 大模型 LLM (12)
    "Few-shot提示": (
        "面对零样本可能表现漂移的新任务，给大模型几道高质量带格式答案的样例（Few-shot Prompt）就像考前划出两三道经典例题：比枯燥讲十遍规则更直观管用；更进一步利用嵌入余弦检索动态挑出最像当前难题的历史案例塞进上下文，效果立竿见影。",
        "写 Prompt 拼装或相似度挑拣时要注意分数值相等时的稳定顺序和长度模板保护。",
    ),
    "CoT链式思维": (
        "Chain-of-Thought（思维链）的奥义在于那句神奇的引导——『请一步一步思考（Let's think step by step）』：强迫模型别急着一口报出算术或推理答案，而是把草稿演算过程逐字吐进自回归上下文里，为自己赢取宝贵的中间推理计算空间，再配合一致性校验就能成倍拉高复杂推理准确率。",
        "针对分步验证或推理路径抽取，结构化规则正则提取与空步骤容错清洗往往是系统稳健的关键。",
    ),
    "ReAct框架": (
        "单纯会说的大模型像困在象牙塔里的智者，一遇到实时天气或精准数值计算就会一本正经胡说八道；ReAct 框架打通了『内心思考 Thought → 调用外界手脚工具 Action → 接收现实返回 Observation』闭环循环，赋予智能体主动验证事实与动态改道的生命力。",
        "实现多步 Agent 状态机时务必设置最大步数上限（Max Steps），否则模型一旦陷入重复空转便会无休止死循环烧光 Token。",
    ),
    "LoRA轻量化微调": (
        "面对动辄几百亿参数的庞大的基座模型，全量重训就像为了改几处家具布局而推倒重盖整栋大楼，显存根本扛不住；LoRA 聪明地冻结原本庞大的权重矩阵 $W$，只在旁边焊接两个极瘦长的低秩矩阵乘积 $BA$（秩 $r \\ll d$）来专学新增本领；若先将底座压成 4-bit NF4（QLoRA），消费级单卡也能微调大模型！",
        "工程实践中前向加速需加上缩放因子 $\\alpha/r$，并在推理部署前允许将 $BA$ 无痛加回原矩阵做到『零额外推迟推理』。",
    ),
    "RLHF对齐": (
        "预训练只让模型读万卷书成为博学多才的续写机，却不懂人类什么叫有用、诚实与安全边界；RLHF 与更直接轻量化的 DPO 偏好对齐相当于礼仪与实战教官：拿成对『好回答 vs 差回答』反馈打分做对比强化，让模型内化人类的喜好标准并防止偏离原生语言流畅度太远。",
        "数值上 DPO 公式里面极其敏感的对比对数概率差、参考模型 `pi_ref` 与温度缩放 $\\beta$ 必须分毫不差地对齐。",
    ),
    "Qwen开源大模型": (
        "直接对接类似 Qwen 等真实大模型生产 API 远不是发个请求那么简单：既要像精细管家的记账本那样按不同价格梯度追踪输入与输出 Token 成本预算，还要能边收边拆解底层 Server-Sent Events（SSE）`data: {...}` 碎片流，让用户在字刚吐出来一瞬间就看见流式打字响应。",
        "SSE 流数据经常会半个 JSON 被网络 TCP 包一刀两断切成两段，缓冲拼接直到完整换行再解析是写生产级流式前端/网关的铁律！",
    ),
    "文本切分与清洗": (
        "文档切片（Text Chunking）相当于把一本厚重的专业百科全书裁制成 RAG 检索可随时抽查的小知识卡片：卡片切太碎上下文脉络会支离破碎，切太大不仅浪费检索空间还容易淹没关键句——在每两张相邻卡片之间巧妙留下一段内容重叠区（Overlap），能完美兜住跨边界句子不被一刀劈断。",
        "切分计算下标推进公式若忽略校验 `overlap >= chunk_size` 会立即陷入死循环，工程代码必须守死这一防线。",
    ),
    "向量Embedding": (
        "词或句的文本向量嵌入（Embedding），相当于把飘渺无形的自然语言文字精准翻译成多维几何宇宙里的绝对坐标点：哪怕字面词完全不同——只要一句『怎么重置登录密码』与一句『账号忘记了密钥如何找回』，它们在向量空间里的夹角就会紧密挨在一起，方便后续比对齐与检索。",
        "而在多模态或对比学习微调训练里，拉近正样本余弦距离并推开负样本距离正是对齐度的核心度量。",
    ),
    "向量数据库检索": (
        "面对上千万条文档向量库，若每次查问题都老老实实逐个从头到尾算余弦（暴力搜索），响应必定慢成幻灯片；IVF 倒排簇索引先按大区域锁定最近几个片区搜索，而 HNSW 分层小世界图更是宛如一套立体高速立交桥——先从稀疏顶层远距离跳跃定位，再逐层深入稠密底层精准寻址。",
        "高维检索测评永远要在搜索召回率（Recall@K）和查询耗时之间做出精致的工程折中。",
    ),
    "工具调用 (Tool Use)": (
        "给大模型挂上计算器、搜索与数据库查询工具，如同给高分书生装上真正干活的螺丝刀和望远镜：系统不仅要写对发给模型的工具注册清单，更得在工具异常超时、回传非标准结构数据时拥有稳健的容错调度与多步状态回填记忆。",
        "对于带有上下文滑窗记忆（Short-Term Window）与摘要归档（Long-Term Summary）的智能体，准确压缩旧轮次既能省下巨额 Token 费又不丢失核心前置人设。",
    ),
    "Function Calling": (
        "Function Calling 是大模型与传统代码世界正式签约建交的核心协议桥梁：不再全靠碰运气从一段自然语言里生抠格式，而是约束模型严格输出符合 JSON Schema 类型、必填项与枚举范围规范的结构化参数契约，彻底打通 LLM 与业务后台微服务接口。",
        "校验层务必逐条仔细核验嵌套类型（如区分 Python `bool` 实际上是 `int` 的子类坑！）与 `required` 必填项完整度。",
    ),
    "LangChain/CrewAI": (
        "单一孤立的大模型呼叫只能做单步问答，而 LangChain 式的链式编排与 CrewAI 多智能体团队则像一条协同流水线外加多工位分工合作团队：前置调研员抓取素材、起草员组织语言、审校员对照标准逐条核验，各角色各司其职把复杂大工程分解成可控组件图。",
        "工作流编排里最讲究步骤之间上下游上下文结构清晰传递与任意孤立节点报错时的容错兜底降级。",
    ),
    # Stage 9: 强化学习 RL (6)
    "马尔可夫决策(MDP)": (
        "马尔可夫决策过程（MDP）好比给智能体制定一套完整的闯关棋盘规则书：它现在身处什么状态 $s$、能往哪走一步动作 $a$、落子后环境会按什么转移概率带它去新格子 $s'$，以及每步能拿到多少眼前即时奖励 $R$ 与长远未来折现折扣 $\\gamma$——经典的贝尔曼方程（Bellman Equation）正是揭示当前格子价值如何由所有后继未来格子递归累加的关键规律。",
        "进行价值迭代循环时，需密切跟踪各状态最大变化量并与精度门槛 `theta` 比对确保稳步收敛。",
    ),
    "Q-Learning": (
        "Q-Learning 堪称最典型的『眼观六路探索者（Off-Policy）』：无论它当下为了探索环境故意选了多么鲁莽冒险的一步试错动作，在复盘更新小本本 $Q(s,a)$ 时，它总是冷静拿下一步在理论上能达到的**最优最大值** $\\max_{a'} Q(s',a')$ 来修正现在的评估分；如果逐步降低探索概率 $\\epsilon$（Epsilon Decay），便实现了先广撒网探索、后稳步收敛利用的美妙平衡。",
        "由于离策略学习永远盯着虚构最优下一跳，面对充满悬崖的危险环境时可能会比 SARSA 显得激进冒险许多。",
    ),
    "SARSA": (
        "与永远对照最优理想值做笔记的 Q-Learning 不同，SARSA 是一名极其老实踏实的『言行一致践行者（On-Policy）』：它实际采取什么带偶然试探的动作走到下一步 $a'$，更新当下格子评估分时就诚实用实操出的 $Q(s', a')$ 来结算账单——如果再配上一路沿途留痕的资格迹（Eligibility Trace, SARSA($\\lambda$)），一旦到达终点领赏，所有刚踏过的历史路径功臣还能按衰退比例一站式全部享受到加分红利！",
        "正因如此，面对『悬崖走钢丝』场景，SARSA 会自觉绕开随时可能被随手误触发摔死的安全外侧路。",
    ),
    "DQN算法": (
        "传统表格 Q-Learning 遇上围棋棋盘或像素游戏屏这种亿级状态空间时内存当场崩溃，而 DQN 巧妙请来深度神经网络直接拟合近似 $Q(s,a)$；同时使出两大绝招保住训练不飞——经验回放池打破连续步强关联，双网络目标分离稳定基准标尺；而后继的 Double DQN 更是巧妙拆分『选动作交给当前网，估算真价值交给稳重目标网』一举消除了单一网络盲目高估的宿疾！",
        "写软更新同步目标网权重时，千万要检查参数混合方向 $\\theta_{\\text{target}} \\leftarrow \\tau \\theta + (1-\\tau)\\theta_{\\text{target}}$ 别写反。",
    ),
    "PPO优化": (
        "策略梯度更新中最忌讳好不容易靠几步走运采样就把网络参数猛改一通，一脚直接踩碎策略再也爬不回来；PPO（近端策略优化）宛如给策略进化过程系上一条弹性安全防摔绳——用新旧策略概率比值与 `[1-eps, 1+eps]` 截断护栏死死框住单次更新振幅；如果再搭配 GAE（广义优势估计）综合平滑多步 TD 误差，就能达成大名鼎鼎且稳如磐石的大模型 RLHF 首选底座！",
        "截断目标取 `min` 操作时的符号及优势函数 $A_t$ 正负号方向极易混淆——优势为正说明动作比预期优秀要限制上浮幅度，为负则反其道抑制。",
    ),
    "AC双网络架构": (
        "Actor-Critic（演员-评论家）宛如影坛黄金拍档：台上的演员（Actor）专心决定下一步动作怎么做才飘逸得分，台下的资深评论家（Critic）则拿着价值估计尺计算刚才那步到底比预期强多少还是弱多少（TD Advantage Error），并立刻现场点拨演员往更好方向迭代微调。",
        "面对机械臂旋转角度等连续动作空间时，Actor 往往不再只报一个具体数字，而是同时输出高斯均值 $\\mu(s)$ 与对数标准差 $\\log\\sigma$ 来连续采样！",
    ),
    # Stage 10: 工程部署 (5)
    "FastAPI开发": (
        "训练好的算法如果只躺在本地 Jupyter Notebook 里运行，就像停在测试棚里的概念车无法上路服务用户；利用 FastAPI 把算法包裹成规范契约检验（Validation）、响应结构格式化、自动生成 OpenAPI 说明书与 `async/await` 高并发异步队列的 REST API 服务，是算法走向真实百万请求生产环境的关键一跃！",
        "线上 Web 服务切记别忘了拦截校验入参合法性，绝不放行缺字少段的脏请求直接冲击推理模型。",
    ),
    "模型序列化(ONNX)": (
        "不同框架训练好的模型各自带有沉重且不兼容的环境外壳，而 ONNX 就像打造跨芯片、跨语言无缝运行的通用『工业模型标准集装箱』：不仅把计算图节点拓扑规范打包导出与严谨核对转换前后数值精度一致性，更能借助图算子融合（如 Conv+BN 合体）、常量折叠与死代码剪枝大幅砍掉不必要的内存来回搬运！",
        "任何图优化操作上线前，用对齐容差阈值严守输出对齐红线是避免悄无声息精度崩盘的底线原则。",
    ),
    "Docker镜像打包": (
        "『我本地电脑明明跑得好好的，怎么发到线上服务器就缺这个库少那个依赖报错？』——Docker 容器相当于连同代码与精确环境一起封箱装进标准海运集装箱；而熟练运用多阶段构建（Multi-Stage Build），先把庞大的 GCC 编译工具链甩在中间 `builder` 阶段，只把最后精悍的可执行产物体面地搬进轻量运行镜像里，能轻松把镜像体积从几个 GB 瘦身到百兆级别！",
        "优化层顺序同样大有学问：越少变动的依赖安装步骤放最上方，才能最大化吃满 Docker Build Cache 缓存加速部署。",
    ),
    "Ollama本地推理": (
        "把动辄数十 GB 参数的大模型搬到个人桌面电脑或公司内网机房私有运行，精打细算显得尤为关键：学会按参数规模和精度（FP16 每参 2 字节 vs INT8/INT4 量化压缩）准确预估显存与内存水位，结合自回归解码与实测量化前后相对误差，才能既确保本地推理绝不爆显存（OOM），又保住生成聪明度！",
        "在评估量化损失时要注意分母接近零边界点处理及严格守好精度损耗上线阈值。",
    ),
    "vLLM加速部署": (
        "面对海量并发用户同时与大模型闲聊，传统静态固定对齐（Static Batching）必须硬等批内最慢那条超长废话写完才全体放行，白白把昂贵的 GPU 算力闲在原地空转；vLLM 凭借 PagedAttention 页式显存管理与 Continuous Batching（步级插队连续批调度）彻底释放吞吐量，每一解码步一有完成释放位置的槽位，新排队请求就瞬间秒接补上并发跑起来！",
        "精确估算多头大尺寸历史 KV Cache 显存账本，是配置线上最大并发槽位与防止显存突发 OOM 的必考课。",
    ),
    # Stage 11: 综合项目 (5)
    "AI客服代理": (
        "搭建可落地商用的企业 AI 智能客服系统绝非单纯把大语言模型直接连上去对话：前端要先通过快速语义匹配识别用户找谁（意图分类）并捞出订单号/商品名关键信息（实体抽取），精准分发到售后/物流对应专席；同时系统必须握紧情绪感知底线与连续兜底失败计数红线，该果断无缝转交真人人工坐席时绝不硬撑惹恼客户！",
        "情感分阈值评估与多规则组合判断的顺序逻辑直接关系到线上客诉率与人工成本平衡。",
    ),
    "自动编程助手": (
        "现代 AI 代码编辑器（如自动补全 Copilot 与自动 Code Reviewer）的底层能力其实源自两根支柱：第一是用上下文余弦相似度秒级召回检索高匹配代码片段做上下文感知辅助续写；第二则是深入代码抽象拓扑图计算函数圈复杂度（Cyclomatic Complexity = 边数 - 节点数 + 2）、深度嵌套层级与安全规范审查。",
        "写代码静态审查引擎时准确判定分支节点和独立组件数，才能给开发者报出靠谱有效的重构警告。",
    ),
    "多Agent协同工作流": (
        "遇到单靠一人无法兜底的复杂企业任务，多智能体（Multi-Agent）协同流宛如一家分工井然的项目专班：总规划主管（Decomposer）先把模糊宏大需求切片分解成带有依赖拓扑关系的可独立执行子任务队列，再精准派工并在产生资源时间冲突时通过仲裁决议协调推进通知全员，实现全自动化端到端交付！",
        "任务依赖 DAG 检查、空列表边界及时间冲突区间的并集重叠判定是协作调度系统稳健核心。",
    ),
    "Gradio模型演示": (
        "做再牛的模型如果只能让人在黑框终端里敲 JSON 参数看字也很难推销出圈；Gradio 的核心理念就是用最简洁一致的参数契约，把任何冰冷 Python 核心推理函数一瞬间自动映射包装成包含图片、滑块、文本框输入输出界面的交互网页演示 Demo（并实时联动响应），几分钟即可交付产品原型验证！",
        "手写演示框架内核抽象逻辑时，清晰维护接口 Schema 定义、实时响应钩子和异常友好消息包装尤为关键。",
    ),
    "Streamlit数据看板": (
        "一个让人放心投入生产的 MLOps 数据看板可不只画两张花哨折线图——线上真正要死盯的是模型效果指标（Precision / Recall / F1）是否在悄悄劣化、特征样本分布相比训练集是否发生了隐蔽漂移（如用 PSI 群体稳定性指标监测报警），并把健康状态与结构化实验日志流统统清晰呈现到决策者眼前！",
        "计算 PSI 时当分布占比出现 0 分桶时记得加极小平滑项 epsilon，否则 $\\ln(p/q)$ 会立即报错。",
    ),
}


# ---------------------------------------------------------------------------
# 2. KaTeX Formula Normalizer (fixes broken & pseudo-LaTeX in latexFormulas)
# ---------------------------------------------------------------------------
EXACT_FORMULA_FIXES: dict[str, str] = {
    # Broken / syntax error / % comment bugs
    "SSE: data: {...}\\n\\n": r"\text{SSE: }\texttt{data: \{...\}}\text{（以双换行分隔）}",
    "%group ALL=(ALL) ALL": r"\texttt{\%group ALL=(ALL) ALL}",
    "r=4, w=2, x=1": r"r = 4,\; w = 2,\; x = 1 \quad (\text{权限码合计 } 0\text{--}7)",
    "P(样本被抽中) = 1 - (1-1/N)^N ~ 63.2%": r"P(\text{样本被抽中}) = 1 - \left(1 - \frac{1}{N}\right)^N \approx 63.2\%",
    "L_DPO = -E[log sigma(beta*(log pi(y_w|x) - pi_ref(y_w|x) - log pi(y_l|x) + pi_ref(y_l|x)))": (
        r"\mathcal{L}_{\mathrm{DPO}} = -\mathbb{E}\left[\log\sigma\left(\beta\left("
        r"\log\frac{\pi_\theta(y_w|x)}{\pi_{\mathrm{ref}}(y_w|x)} - "
        r"\log\frac{\pi_\theta(y_l|x)}{\pi_{\mathrm{ref}}(y_l|x)}\right)\right)\right]"
    ),
    # Missing backslashes before LaTeX commands
    "text{FMM: }w = argmax_{w in V} |w| s.t. w in prefix(text)": (
        r"\text{FMM: } w^* = \arg\max_{w \in V,\; w \text{ 为当前前缀}} |w|"
    ),
    "text{TF}(t,d) = f_{t,d}/sum f_{t',d}": (
        r"\text{TF}(t, d) = \frac{f_{t, d}}{\sum_{t'} f_{t', d}}"
    ),
    "text{IDF}(t,D) = log(|D|/(1+|{d in D: t in d}|))": (
        r"\text{IDF}(t, D) = \log\left(\frac{|D|}{1 + |\{d \in D : t \in d\}|}\right)"
    ),
    "hat{y} = softmax(W_2 h)": r"\hat{y} = \operatorname{softmax}(W_2 h)",
    # Common Stage 1-2 CLI/rule expressions rendered safely in KaTeX
    "子网数 = 2^借位数": r"\text{子网数} = 2^{\text{借位数}}",
    "可用主机数 = 2^(32-前缀) - 2": r"\text{可用主机数} = 2^{32 - \text{前缀}} - 2",
    "Base64: 3字节 -> 4字符": r"\text{Base64: } 3\text{ 字节} \longrightarrow 4\text{ 字符}",
    "= 填充使输出长度为 4 的倍数": r"\text{使用 }\texttt{=}\text{ 填充使输出长度为 } 4 \text{ 的倍数}",
    "glob匹配: *.txt 等价于 endsWith('.txt')": r"\text{glob 匹配: }\texttt{*.txt} \iff \text{endsWith}(\texttt{'.txt'})",
    "First-Fit: 选第一个够用的空闲块": r"\text{First-Fit: 选择首个大小} \ge \text{需求量的空闲块}",
    "Best-Fit: 选最小的够用空闲块": r"\text{Best-Fit: 选择满足要求且容量最小的空闲块}",
    "软限制: 超过后开始计时, 超时后视为硬限制": r"\text{软限制: 超出后启动宽限计时，超时则升级为硬限制}",
    "硬限制: 不可超过的绝对上限": r"\text{硬限制: 不可突破的绝对资源上限}",
    "Nice值: -20(最高) ~ 19(最低)": r"\text{Nice 优先级范围: } [-20\text{（最高）},\; 19\text{（最低）}]",
    "vruntime = 实际运行时间 / weight": r"\text{vruntime} = \frac{\text{实际运行时间}}{\text{weight}}",
    "缓存行 = floor(address / line_size)": r"\text{缓存块号} = \lfloor \text{address} / \text{line\_size} \rfloor",
    "HitRate = Hits / Total": r"\text{HitRate} = \frac{\text{Hits}}{\text{Total}}",
    "git branch -d branch_name: 删除已合并分支": r"\texttt{git branch -d <branch>} \text{（安全删除已合并分支）}",
    "git branch -D: 强制删除未合并分支": r"\texttt{git branch -D <branch>} \text{（强制删除未合并分支）}",
    "git rebase -i HEAD~N: 交互式变基": r"\texttt{git rebase -i HEAD\textasciitilde N} \text{（交互式变基重整提交）}",
    "pick/squash/fixup/reword": r"\text{操作指令: }\texttt{pick} / \texttt{squash} / \texttt{fixup} / \texttt{reword}",
    "Auto-merge: 不同行修改 -> 自动合并": r"\text{Auto-merge: 修改不同行} \longrightarrow \text{自动三路合并}",
    "Conflict: 同区域修改 -> 人工处理": r"\text{Conflict: 同区域修改冲突} \longrightarrow \text{标记并交由人工裁决}",
    "Rebase = 在目标分支的 HEAD 上逐个应用提交": r"\text{Rebase} = \text{在目标分支 HEAD 上逐一重放待变基提交}",
    "冲突数 = 累积计算": r"\text{总冲突数} = \sum_{k} \text{Conflicts}(commit_k)",
    "recursive: 默认三路合并": r"\texttt{recursive}: \text{ 默认三路合并策略}",
    "ours: 完全保留当前分支": r"\texttt{ours}: \text{ 冲突处保留当前分支版本}",
    "theirs: 完全接受传入分支": r"\texttt{theirs}: \text{ 冲突处采纳传入分支版本}",
    "sorted(items, key=\\lambda)": r"\texttt{sorted(items, key=lambda x: ...)}",
    "Stack: LIFO": r"\text{Stack: 后进先出（LIFO）}",
    "match(ch) = stack[-1] == pairs[ch]": r"\text{match}(ch) \iff \text{stack}[-1] = \text{pairs}[ch]",
    "target = nums[i] + nums[j]": r"\text{target} = \text{nums}[i] + \text{nums}[j]",
    "complement = target - nums[i]": r"\text{complement} = \text{target} - \text{nums}[i]",
    "s[::-1] = O(n)": r"\text{切片反转 } s[::-1] \implies \text{时间复杂度 } O(n)",
    "merged[-1][1] = max(merged[-1][1], e_i)": r"\text{merged}[-1][1] = \max(\text{merged}[-1][1], e_i)",
    "freq(w) = |{i: word_i = w}|": r"\text{freq}(w) = |\{i : \text{word}_i = w\}|",
    "Top-K = sorted(freq, key=-count)[:k]": r"\text{Top-}K = \text{sorted}(\text{freq}, \text{key}=-count)[:k]",
    "Polymorphism: same interface, different impl": r"\text{多态原则: 统一调用接口，各子类差异实现}",
    "next = current + step": r"\text{next} = \text{current} + \text{step}",
    "DEBUG < INFO < WARN < ERROR < FATAL": r"\mathrm{DEBUG} < \mathrm{INFO} < \mathrm{WARN} < \mathrm{ERROR} < \mathrm{FATAL}",
    "Command = Executable + Args[]": r"\text{Command} = \text{Executable} + \text{Args}[]",
    "Commit = Cohesive(ChangeSet)": r"\text{Commit} = \text{Cohesive}(\text{ChangeSet})",
    "Rebase(feature, newBase) = newBase + replay(featureCommits)": r"\text{Rebase}(feature, newBase) = newBase + \text{replay}(featureCommits)",
    "ConflictBlock = Ours + Theirs": r"\text{ConflictBlock} = \text{Ours} \oplus \text{Theirs}",
    "sudo: user -> command as root": r"\texttt{sudo}: \text{user} \longrightarrow \text{以特权身份执行命令}",
    "logrotate: compress -> rotate -> delete old": r"\text{logrotate}: \text{compress} \to \text{rotate} \to \text{delete old}",
    "|idle| + |busy| = maxSize": r"|\text{idle}| + |\text{busy}| \le \text{maxSize}",
    "format(record, formatter) = formatter.format(record)": r"\text{format}(record, formatter) = formatter.\text{format}(record)",
    # Stage 3-11 pseudo math cleanup
    "|a*b| <= ||a|| * ||b||": r"|a \cdot b| \le \|a\| \, \|b\|",
    "cos(theta) = (a*b) / (||a|| * ||b||)": r"\cos\theta = \frac{a \cdot b}{\|a\| \, \|b\|}",
    "det(A) != 0": r"\det(A) \neq 0",
    "A * A^{-1} = I": r"A A^{-1} = I",
    "A^{-1} = adj(A) / det(A)": r"A^{-1} = \frac{\operatorname{adj}(A)}{\det(A)}",
    "rank(A) = count(sigma_i > eps)": r"\operatorname{rank}(A) = \sum_i \mathbb{I}(\sigma_i > \varepsilon)",
    "A_k = sum_{i=1}^k sigma_i * u_i * v_i^T": r"A_k = \sum_{i=1}^{k} \sigma_i u_i v_i^T",
    "tr(A) = sum(lambda_i)": r"\operatorname{tr}(A) = \sum_i \lambda_i",
    "det(A) = prod(lambda_i)": r"\det(A) = \prod_i \lambda_i",
    "P(B) = P(B|A)P(A) + P(B|~A)P(~A)": r"P(B) = P(B|A)P(A) + P(B|\neg A)P(\neg A)",
    "X_bar ~ N(mu, sigma^2/n)": r"\bar{X} \sim \mathcal{N}\left(\mu,\; \frac{\sigma^2}{n}\right)",
    "mu = 0.5 (for U[0,1])": r"\mu = 0.5 \quad (\text{均匀分布 } U[0, 1])",
    "sigma = sqrt(1/12) (for U[0,1])": r"\sigma = \sqrt{\frac{1}{12}} \quad (\text{均匀分布 } U[0, 1])",
    "L(p|x) = prod p^{x_i} (1-p)^{1-x_i}": r"L(p \mid x) = \prod_{i=1}^{n} p^{x_i}(1-p)^{1-x_i}",
    "log L = sum x_i log p + (n - sum x_i) log(1-p)": r"\log L = \sum_{i=1}^{n} x_i \log p + \left(n - \sum_{i=1}^{n} x_i\right)\log(1-p)",
    "p_MLE = (1/n) sum x_i": r"\hat{p}_{\mathrm{MLE}} = \frac{1}{n}\sum_{i=1}^{n} x_i",
    "grad f = (2x+y, 4y+x)": r"\nabla f = (2x + y,\; 4y + x)",
    "D_v f = grad f * v / ||v||": r"D_v f = \frac{\nabla f \cdot v}{\|v\|}",
    "H = [[2,1],[1,4]]": r"H = \begin{bmatrix} 2 & 1 \\ 1 & 4 \end{bmatrix}",
    "x_{t+1} = x_t - eta * f(x_t)": r"x_{t+1} = x_t - \eta \, \nabla f(x_t)",
    "converges if eta small enough": r"\text{若步长 } \eta \text{ 足够小，迭代稳定收敛}",
    "diverges if eta too large": r"\text{若步长 } \eta \text{ 过大，迭代剧烈震荡发散}",
    "ln(1+x) = sum (-1)^{n+1} x^n / n": r"\ln(1+x) = \sum_{n=1}^{\infty} \frac{(-1)^{n+1} x^n}{n}",
    "converges for |x| < 1": r"\text{收敛域: } |x| < 1",
    "w = (X^T X + lambda I)^{-1} X^T y": r"w = (X^T X + \lambda I)^{-1} X^T y",
    "L2 正则化: lambda * ||w||^2": r"\text{L2 正则惩罚: } \lambda \|w\|_2^2",
    "lambda 越大, 系数越接近 0": r"\lambda \text{ 越大，参数权重向 } 0 \text{ 收缩越明显}",
    "P(y=k|x) = exp(W_k x) / sum(exp(W_j x))": r"P(y = k \mid x) = \frac{\exp(W_k x)}{\sum_j \exp(W_j x)}",
    "L = -sum log P(y_i|x_i)": r"\mathcal{L} = -\sum_i \log P(y_i \mid x_i)",
    "grad = X^T (P - Y_onehot)": r"\nabla_W \mathcal{L} = X^T (P - Y_{\text{onehot}})",
    "K_linear(x,y) = x^T y": r"K_{\text{linear}}(x, y) = x^T y",
    "K_poly(x,y) = (gamma x^T y + r)^d": r"K_{\text{poly}}(x, y) = (\gamma x^T y + r)^d",
    "K_rbf(x,y) = exp(-gamma ||x-y||^2)": r"K_{\text{rbf}}(x, y) = \exp\left(-\gamma \|x - y\|^2\right)",
    "f(x) = sum alpha_i y_i K(x_i, x) + b": r"f(x) = \sum_i \alpha_i y_i K(x_i, x) + b",
    "MSE = (1/n) sum (y_i - bar{y})^2": r"\text{MSE} = \frac{1}{n}\sum_{i=1}^{n}(y_i - \bar{y})^2",
    "Split: argmin (MSE_left + MSE_right)": r"\text{最优分裂点} = \arg\min_{j, s}\left(\text{MSE}_{\text{left}} + \text{MSE}_{\text{right}}\right)",
    "OOB 误差 ~ 测试集误差": r"\text{OOB 袋外误差} \approx \text{独立测试集误差}",
    "F_m(x) = F_{m-1}(x) + lr * h_m(x)": r"F_m(x) = F_{m-1}(x) + \eta \cdot h_m(x)",
    "y_pred = (1/k) sum y_i": r"\hat{y} = \frac{1}{k}\sum_{i \in N_k(x)} y_i",
    "Weighted: y_pred = sum(w_i * y_i) / sum(w_i)": r"\hat{y}_{\text{weighted}} = \frac{\sum_i w_i y_i}{\sum_i w_i}",
    "w_i = 1 / (d(x, x_i) + eps)": r"w_i = \frac{1}{d(x, x_i) + \varepsilon}",
    "P(选x_i) = D(x_i)^2 / sum D(x_j)^2": r"P(\text{选中 } x_i) = \frac{D(x_i)^2}{\sum_j D(x_j)^2}",
    "D(x_i) = min ||x_i - mu||^2": r"D(x_i) = \min_{\mu \in C} \|x_i - \mu\|^2",
    "轮廓系数 = (b-a)/max(a,b)": r"\text{轮廓系数 } s = \frac{b - a}{\max(a, b)}",
    "k-dist: 第 k 近邻距离": r"\text{k-dist: 每个点到其第 } k \text{ 近邻的距离}",
    "eps 选择 k-dist 曲线的拐点": r"\varepsilon \text{ 通常选取排序后 k-dist 曲线的显著拐点}",
    "Z_whiten = Z / sqrt(lambda_i) (Whitening)": r"Z_{\text{whiten}} = \frac{Z}{\sqrt{\lambda_i + \varepsilon}}",
    "Error = ||X - X_k||^2 / ||X||^2": r"\text{重构误差} = \frac{\|X - \hat{X}_k\|_F^2}{\|X\|_F^2}",
    "Robust: x' = (x - median) / IQR": r"x' = \frac{x - \text{median}(x)}{\text{IQR}}",
    "Quantile: rank -> uniform -> normal": r"\text{Quantile: } \text{rank} \to \text{uniform} \to \mathcal{N}(0, 1)",
    "BN: x_hat = (x - mu_b) / sigma_b (per feature)": r"\text{BN: } \hat{x} = \frac{x - \mu_B}{\sigma_B} \quad (\text{按特征通道批内统计})",
    "LN: x_hat = (x - mu_s) / sigma_s (per sample)": r"\text{LN: } \hat{x} = \frac{x - \mu_S}{\sigma_S} \quad (\text{按单样本内全部特征})",
    "BN 训练用 batch 统计，推理用全局统计": r"\text{BN 训练使用当前 Batch 统计，推理使用累计全局统计}",
    "out_h = (H + 2*pad - KH)/stride + 1": r"\text{out}_h = \left\lfloor \frac{H + 2\cdot \text{pad} - K_H}{\text{stride}} \right\rfloor + 1",
    "(I*K)_{i,j} = sum_{u,v} I_{su+i,sv+j}*K_{u,v}": r"(I * K)_{i,j} = \sum_{u,v} I_{s \cdot i + u,\; s \cdot j + v} \cdot K_{u,v}",
    "Leaky: max(alpha*x, x)": r"\text{LeakyReLU}(x) = \max(\alpha x,\; x)",
    "ELU: x if x>0 else alpha*(exp(x)-1)": r"\text{ELU}(x) = \begin{cases} x & x > 0 \\ \alpha(e^x - 1) & x \le 0 \end{cases}",
    "Swish: x*sigmoid(x)": r"\text{Swish}(x) = x \cdot \sigma(x)",
    "FL(p_t) = -(1-p_t)^gamma * log(p_t)": r"\text{FL}(p_t) = -(1 - p_t)^\gamma \log(p_t)",
    "gamma=0 时退化为交叉熵": r"\gamma = 0 \text{ 时退化为标准交叉熵损失}",
    "gamma 越大，对高置信度样本惩罚越小": r"\gamma \text{ 越大，易分类高置信样本权重降得越狠}",
    "计算图: 前向构建, 反向求导": r"\text{Autograd 计算图: 前向动态构图，反向拓扑链式求导}",
    "Momentum: v = beta*v + grad; x -= lr*v": r"v_{t+1} = \beta v_t + g_t,\quad x_{t+1} = x_t - \eta v_{t+1}",
    "Adam: 自适应学习率+动量": r"\text{Adam} = \text{一阶动量（方向）} + \text{自适应二阶矩步长缩放}",
    "train: x_hat = (x-mu_b)/sqrt(var_b+eps)": r"\text{Train: } \hat{x} = \frac{x - \mu_B}{\sqrt{\sigma_B^2 + \varepsilon}}",
    "infer: x_hat = (x-mu_r)/sqrt(var_r+eps)": r"\text{Infer: } \hat{x} = \frac{x - \mu_{\text{running}}}{\sqrt{\sigma_{\text{running}}^2 + \varepsilon}}",
    "running_mu = momentum*momentum+(1-momentum)*mu_b": r"\mu_{\text{running}} \leftarrow (1-\alpha)\mu_{\text{running}} + \alpha \mu_B",
    "MC Dropout: P(y|x) = 1/T sum f_t(x)": r"\text{MC Dropout: } P(y \mid x) \approx \frac{1}{T}\sum_{t=1}^{T} f_t(x)",
    "Alpha Dropout: 保持 SELU 的归一化性质": r"\text{Alpha Dropout: 在随机丢弃后维持零均值单位方差的 SELU 自归一化特性}",
    "CDF(v) = sum P(i)": r"\text{CDF}(v) = \sum_{i=0}^{v} P(i)",
    "v' = round(CDF(v)*255)": r"v' = \operatorname{round}\bigl(\text{CDF}(v) \times 255\bigr)",
    "r = x*cos(theta) + y*sin(theta)": r"r = x\cos\theta + y\sin\theta",
    "L_out = (L_src-mu_src)*std_tgt/std_src+mu_tgt": r"L_{\text{out}} = (L_{\text{src}} - \mu_{\text{src}}) \cdot \frac{\sigma_{\text{tgt}}}{\sigma_{\text{src}}} + \mu_{\text{tgt}}",
    "R = det(M) - k*tr(M)^2": r"R = \det(M) - k \cdot (\operatorname{tr}(M))^2",
    "R>0 角点,R<0 边缘": r"R > 0 \implies \text{角点},\quad R < 0 \implies \text{边缘}",
    "L = lambda*L_coord + L_conf + L_cls": r"\mathcal{L} = \lambda_{\text{coord}}\mathcal{L}_{\text{coord}} + \mathcal{L}_{\text{conf}} + \mathcal{L}_{\text{cls}}",
    "h = 1/C sum W_1 x_c": r"h = \frac{1}{C}\sum_{c=1}^{C} W_1 x_c",
    "P(w_i|context) = softmax(W_o h_i)": r"P(w_i \mid \text{context}) = \operatorname{softmax}(W_o h_i)",
    "L_{MLM} = -sum log P(w_i|context)": r"\mathcal{L}_{\mathrm{MLM}} = -\sum_{i \in M} \log P(w_i \mid \text{context})",
    "f_t = sigmoid(W_f x_t + U_f h_{t-1} + b_f)": r"f_t = \sigma(W_f x_t + U_f h_{t-1} + b_f)",
    "c_t = f_t * c_{t-1} + i_t * tilde{c}_t": r"c_t = f_t \odot c_{t-1} + i_t \odot \tilde{c}_t",
    "Attention(Q,K,V) = softmax(QK^T / sqrt(d_k)) V": r"\operatorname{Attention}(Q, K, V) = \operatorname{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V",
    "MultiHead(Q,K,V) = Concat(head_1,...,head_h) W_O": r"\operatorname{MultiHead}(Q, K, V) = \operatorname{Concat}(\text{head}_1, \dots, \text{head}_h) W_O",
    "P(y_t|y_{<t},X) = softmax(W_o h_t^{dec})": r"P(y_t \mid y_{<t}, X) = \operatorname{softmax}(W_o h_t^{\text{dec}})",
    "BPE: 统计合并最频繁对": r"\text{BPE: 反复统计并合并语料中频次最高的相邻字符对}",
    "BM25 = IDF*(TF/(k1*(1-b+b*|D|/avgDL)+TF))": r"\operatorname{BM25}(q, d) = \sum_{t \in q} \text{IDF}(t) \cdot \frac{\text{TF}(t, d) \cdot (k_1 + 1)}{\text{TF}(t, d) + k_1 \left(1 - b + b \frac{|d|}{\text{avgDL}}\right)}",
    "P(w_c|w_t) = softmax(v_c*u_t)": r"P(w_c \mid w_t) = \frac{\exp(v_c^T u_t)}{\sum_{w} \exp(v_w^T u_t)}",
    "z = sigmoid(W_z*x+U_z*h)": r"z_t = \sigma(W_z x_t + U_z h_{t-1})",
    "h_new = z*h + (1-z)*tanh(...)": r"h_t = (1 - z_t) \odot h_{t-1} + z_t \odot \tilde{h}_t",
    "CrossAttn = softmax(Q*K^T/sqrt(d))*V": r"\operatorname{CrossAttn}(Q, K, V) = \operatorname{softmax}\left(\frac{Q K^T}{\sqrt{d}}\right) V",
    "每步保留 top-K 个候选": r"\text{Beam Search: 每个解码时间步仅保留累计得分最高的 Top-}K\text{ 条候选序列}",
    "P(answer|query) approx P(answer|query, examples_{1..k})": r"P(\text{answer} \mid \text{query}) \approx P(\text{answer} \mid \text{query},\; \text{examples}_{1..k})",
    "sim(q,e_i) = (q * e_i)/(||q||*||e_i||)": r"\operatorname{sim}(q, e_i) = \frac{q \cdot e_i}{\|q\| \, \|e_i\|}",
    "P(answer|problem) = sum_{steps} P(answer|steps) P(steps|problem)": r"P(\text{answer} \mid \text{problem}) = \sum_{\text{steps}} P(\text{answer} \mid \text{steps}) \, P(\text{steps} \mid \text{problem})",
    "Thought -> Action -> Observation -> Thought -> ... -> Answer": r"\text{Thought} \to \text{Action} \to \text{Observation} \to \dots \to \text{Answer}",
    "W' = W + BA, B in R^{d x r}, A in R^{r x d}": r"W' = W + BA, \quad B \in \mathbb{R}^{d \times r},\; A \in \mathbb{R}^{r \times d}",
    "r << min(d, d_model)，通常 r=8 或 16": r"r \ll \min(d_{\text{in}}, d_{\text{out}})\text{，典型取 } r = 8 \text{ 或 } 16",
    "L^{CLIP} = -E[min(r_t A_t, clip(r_t,1-eps,1+eps) A_t)]": r"\mathcal{L}^{\mathrm{CLIP}} = -\mathbb{E}\left[\min\left(r_t(\theta) A_t,\; \operatorname{clip}(r_t(\theta), 1-\varepsilon, 1+\varepsilon) A_t\right)\right]",
    "v_{doc} = 1/N sum_i v_{w_i}": r"v_{\text{doc}} = \frac{1}{N}\sum_{i=1}^{N} v_{w_i}",
    "IVF: 先找最近的 n_probe 个簇，再在这些簇中搜索": r"\text{IVF: 先定位最近的 } n_{\text{probe}} \text{ 个聚类簇，再在簇内精确检索}",
    "Recall@k = |relevant_results ∩ retrieved_results| / k": r"\text{Recall@}k = \frac{|\text{Relevant} \cap \text{Retrieved}_k|}{|\text{Relevant}|}",
    "Model -> ToolCall(args) -> ToolResult -> Model -> ... -> FinalAnswer": r"\text{Model} \to \text{ToolCall}(\text{args}) \to \text{ToolResult} \to \dots \to \text{FinalAnswer}",
    "Chain: Input -> Prompt -> LLM -> Output -> Next Chain": r"\text{Chain}: \text{Input} \to \text{Prompt} \to \text{LLM} \to \text{Output} \to \text{Next Step}",
    "Agent: Think -> Act -> Observe -> Repeat": r"\text{Agent}: \text{Think} \to \text{Act} \to \text{Observe} \to \text{Repeat}",
    "Thought-Action-Observation循环": r"\text{Thought} \longrightarrow \text{Action} \longrightarrow \text{Observation} \text{ 闭环}",
    "NF4: 归一化4位量化": r"\text{NF4: 基于标准正态分位点构造的 4-bit 信息最优化量化表}",
    "QLoRA = 4bit权重 + LoRA适配器": r"\text{QLoRA} = \text{冻结 4-bit 基座权重} + \text{高精度 LoRA 旁路适配器}",
    "Attention = softmax(Q * cache_K^T/sqrt(d)) * cache_V": r"\operatorname{Attention}(Q, K_{\text{cache}}, V_{\text{cache}}) = \operatorname{softmax}\left(\frac{Q K_{\text{cache}}^T}{\sqrt{d}}\right) V_{\text{cache}}",
    "Alignment = mean(sim_pos) - mean(sim_neg)": r"\text{Alignment} = \operatorname{mean}(\text{sim}_{\text{pos}}) - \operatorname{mean}(\text{sim}_{\text{neg}})",
    "HNSW: 多层图, 上层跳过远距离节点": r"\text{HNSW: 分层可导航小世界图，高层长跳跨越远距离空间}",
    "Search: 从顶层贪心搜索到底层": r"\text{HNSW 检索: 顶层贪心快速路由，底层近邻精确收敛}",
    "逐块解析直到完整 JSON": r"\text{逐块缓冲拼接字符流，待闭合完整 JSON 后实时触发回调}",
    "V_{k+1}(s) = max_a sum_{s'} P(s'|s,a)[R(s,a,s') + gamma V_k(s')]": r"V_{k+1}(s) = \max_a \sum_{s'} P(s'|s,a)\bigl[R(s,a,s') + \gamma V_k(s')\bigr]",
    "pi^*(s) = argmax_a sum_{s'} P(s'|s,a)[R + gamma V^*(s')]": r"\pi^*(s) = \arg\max_a \sum_{s'} P(s'|s,a)\bigl[R(s,a,s') + \gamma V^*(s')\bigr]",
    "Q(s,a) <- Q(s,a) + alpha[r + gamma max_a' Q(s',a') - Q(s,a)]": r"Q(s,a) \leftarrow Q(s,a) + \alpha\left[r + \gamma \max_{a'} Q(s',a') - Q(s,a)\right]",
    "Q(s,a) <- Q(s,a) + alpha[r + gamma Q(s',a') - Q(s,a)]": r"Q(s,a) \leftarrow Q(s,a) + \alpha\bigl[r + \gamma Q(s',a') - Q(s,a)\bigr]",
    "L = E[(r + gamma max_{a'} Q_{target}(s',a') - Q_{online}(s,a))^2]": r"\mathcal{L} = \mathbb{E}\left[\left(r + \gamma \max_{a'} Q_{\text{target}}(s',a') - Q_{\text{online}}(s,a)\right)^2\right]",
    "theta_target <- tau * theta_online + (1-tau) * theta_target": r"\theta_{\text{target}} \leftarrow \tau \theta_{\text{online}} + (1 - \tau)\theta_{\text{target}}",
    "L^{CLIP} = -E[min(r_t(theta) A_t, clip(r_t(theta), 1-eps, 1+eps) A_t)]": r"\mathcal{L}^{\mathrm{CLIP}} = -\mathbb{E}\left[\min\left(r_t(\theta) A_t,\; \operatorname{clip}(r_t(\theta), 1-\varepsilon, 1+\varepsilon) A_t\right)\right]",
    "r_t(theta) = pi_theta(a_t|s_t) / pi_{theta_old}(a_t|s_t)": r"r_t(\theta) = \frac{\pi_\theta(a_t \mid s_t)}{\pi_{\theta_{\text{old}}}(a_t \mid s_t)}",
    "nabla J = E[nabla log pi(a|s) * A(s,a)]": r"\nabla_\theta J(\theta) = \mathbb{E}\bigl[\nabla_\theta \log \pi_\theta(a \mid s) \cdot A(s, a)\bigr]",
    "A(s,a) = r + gamma V(s') - V(s) (TD error)": r"A(s, a) \approx r + \gamma V(s') - V(s) \quad (\text{TD 优势误差})",
    "V(s) = max_a sum P(s'|s,a)[R+gamma*V(s')]": r"V(s) = \max_a \sum_{s'} P(s'|s,a)\bigl[R + \gamma V(s')\bigr]",
    "Q(s,a) = sum P(s'|s,a)[R+gamma*max_a'Q(s',a')]": r"Q(s,a) = \sum_{s'} P(s'|s,a)\bigl[R + \gamma \max_{a'} Q(s',a')\bigr]",
    "q_target = r + gamma*Q_target(s', argmax Q_online(s', a))": r"y^{\text{DDQN}} = r + \gamma Q_{\text{target}}\left(s',\; \arg\max_a Q_{\text{online}}(s', a)\right)",
    "GAE: A_t = sum (gamma*lambda)^l * delta_{t+l}": r"\hat{A}_t^{\mathrm{GAE}} = \sum_{l=0}^{\infty} (\gamma \lambda)^l \delta_{t+l}",
    "delta_t = r_t + gamma*V(s_{t+1}) - V(s_t)": r"\delta_t = r_t + \gamma V(s_{t+1}) - V(s_t)",
    "mu(s) = Actor(s)": r"\mu(s) = \text{Actor}_\mu(s)",
    "sigma = exp(log_sigma)": r"\sigma(s) = \exp(\log\sigma(s))",
    "误差 < 1e-4 通常认为精度可接受": r"|\text{out}_{\text{ONNX}} - \text{out}_{\text{src}}| < 10^{-4} \text{ 通常视为导出精度达标}",
    "FROM -> RUN -> COPY -> CMD": r"\texttt{FROM} \to \texttt{RUN} \to \texttt{COPY} \to \texttt{CMD}",
    "RAM ~ model_size_B * 2GB (FP16)": r"\text{RAM} \approx \text{Params (B)} \times 2\text{ GB} \quad (\text{FP16 推理基础内存})",
    "Generate: y_t = argmax P(y | x, y_{<t})": r"y_t = \arg\max_y P(y \mid x, y_{<t})",
    "KV Cache = 2 * num_layers * hidden_size * max_len * bytes_per_elem": (
        r"\text{KV Cache} = 2 \times L_{\text{layers}} \times d_{\text{hidden}} \times L_{\text{max}} \times \text{bytes}"
    ),
    "GraphOpt: fuse(conv+bn) -> constant_fold -> dead_code_elim": (
        r"\text{GraphOpt}: \operatorname{fuse}(\text{Conv+BN}) \to \text{ConstantFold} \to \text{DeadCodeElim}"
    ),
    "FP16: 2字节/参数": r"\text{FP16 精度占用: } 2\text{ 字节/参数}",
    "INT8: 1字节/参数": r"\text{INT8 量化占用: } 1\text{ 字节/参数}",
    "精度损失 = |FP32-FP16| / FP32": r"\text{相对精度损失} = \frac{|\text{FP32} - \text{Quant}|}{|\text{FP32}| + \varepsilon}",
    "Scheduling: 每步检查可加入的新请求": r"\text{Continuous Batching: 每个 Decoding Step 立即吸纳等待队列新请求填满空闲槽位}",
    "Intent = argmax_cat sim(text, cat_examples)": r"\text{Intent} = \arg\max_{c} \operatorname{sim}(\text{text},\; \text{examples}_c)",
    "转人工规则: sentiment < threshold or 3+ failed attempts": r"\text{转人工触发}: \text{sentiment} < \theta \;\lor\; \text{连续失败次数} \ge 3",
    "P(next_tokens | context) = max over snippet_library sim(context, snippet)": (
        r"\text{BestSnippet} = \arg\max_{s \in \text{Lib}} \operatorname{sim}(\text{context}, s)"
    ),
    "PSI = sum((p_i - q_i) * ln(p_i / q_i))": r"\text{PSI} = \sum_i (p_i - q_i) \ln\left(\frac{p_i}{q_i}\right)",
    "CC = E - N + 2P (Cyclomatic Complexity)": r"\text{CC} = E - N + 2P \quad (\text{圈复杂度，判定函数分支路径复杂度})",
    "F1 = 2 * precision * recall / (precision + recall)": r"F_1 = \frac{2 \cdot \text{Precision} \cdot \text{Recall}}{\text{Precision} + \text{Recall}}",
    "数学压缩Ratio = \\frac{k(m+n+1)}{mn}": r"\text{压缩比} = \frac{k(m+n+1)}{mn}",
    "压缩比 = \\frac{k(m+n+1)}{mn}": r"\text{压缩比} = \frac{k(m+n+1)}{mn}",
    "相对误差 = \\frac{\\|num - analytic\\|}{\\|num\\| + \\|analytic\\|}": r"\text{相对误差} = \frac{\|\text{num} - \text{analytic}\|}{\|\text{num}\| + \|\text{analytic}\|}",
    "\\text{核心点} \\iff |N_\\epsilon(p)| \\ge MinPts": r"\text{核心点} \iff |N_\varepsilon(p)| \ge \text{MinPts}",
}


def wrap_cjk_for_latex(s: str) -> str:
    """Wrap raw CJK runs outside existing \\text{...}/\\texttt{...} in \\text{...}."""
    out: list[str] = []
    i = 0
    n = len(s)
    while i < n:
        if s[i : i + 6] == "\\text{" or s[i : i + 8] == "\\texttt{":
            prefix_len = 6 if s[i : i + 6] == "\\text{" else 8
            out.append(s[i : i + prefix_len])
            i += prefix_len
            depth = 1
            while i < n and depth > 0:
                if s[i] == "{" and (i == 0 or s[i - 1] != "\\"):
                    depth += 1
                elif s[i] == "}" and (i == 0 or s[i - 1] != "\\"):
                    depth -= 1
                out.append(s[i])
                i += 1
            continue
        if CJK_RE.match(s[i]):
            j = i
            while j < n and (CJK_RE.match(s[j]) or s[j] in "：；，。、（）0123456789 "):
                # Stop before trailing space followed by pure math operator
                if s[j] == " " and (j + 1 >= n or not CJK_RE.match(s[j + 1])):
                    break
                j += 1
            segment = s[i:j].strip()
            if segment:
                out.append(r"\text{" + segment + "}")
                if j < n and s[j - 1] == " ":
                    out.append(" ")
            i = j
            continue
        out.append(s[i])
        i += 1
    return "".join(out)


def normalize_latex_formula(eq: str) -> str:
    eq = eq.strip()
    if eq in EXACT_FORMULA_FIXES:
        return EXACT_FORMULA_FIXES[eq]
    # Handle any remaining arrow / generic patterns cleanly
    s = eq.replace("->", r" \to ").replace("<-", r" \leftarrow ")
    s = s.replace("<<", r" \ll ").replace(">>", r" \gg ")
    # Escape unescaped %
    s = re.sub(r"(?<!\\)%", r"\\%", s)
    if CJK_RE.search(s):
        s = wrap_cjk_for_latex(s)
    return s.strip()


# ---------------------------------------------------------------------------
# 3. Extract Original Intro (for idempotency) & AST Specifications
# ---------------------------------------------------------------------------
ENRICHED_SPLIT_MARKER = "\n\n#### 🔬 核心原理与机制拆解"


def extract_original_theory(raw_theory: str) -> str:
    """Recover clean pre-enrichment intro whether already enriched or original."""
    if ENRICHED_SPLIT_MARKER in raw_theory:
        head = raw_theory.split(ENRICHED_SPLIT_MARKER, 1)[0].strip()
        lines = head.splitlines()
        # Drop our header ### 🎯 ... and leading > 💡 / > ⚡ callout
        idx = 0
        if idx < len(lines) and lines[idx].startswith("### 🎯 编程挑战："):
            idx += 1
        while idx < len(lines) and not lines[idx].strip():
            idx += 1
        if idx < len(lines) and (lines[idx].startswith("> 💡") or lines[idx].startswith("> ⚡")):
            idx += 1
            while idx < len(lines) and lines[idx].startswith(">"):
                idx += 1
        body = "\n".join(lines[idx:]).strip()
        return body

    # Strip plain header `### 编程挑战：...` if it matches title banner
    lines = raw_theory.strip().splitlines()
    if lines and lines[0].lstrip().startswith("### 编程挑战："):
        lines = lines[1:]
    return "\n".join(lines).strip()


def clean_inline_math_spaces(text: str) -> str:
    """Ensure no leading/trailing spaces inside single `$...$` or trailing CJK clutter."""
    # Fix accidental `$$` display blocks or `$ ... $`
    def _fix_inline(m: re.Match[str]) -> str:
        inner = m.group(1).strip()
        return f"${inner}$"

    return re.sub(r"(?<!\$)\$(?!\$)([^$\n]+?)(?<!\$)\$(?!\$)", _fix_inline, text)


def format_param_list(fn_node: ast.FunctionDef | ast.AsyncFunctionDef) -> str:
    parts: list[str] = []
    for arg in fn_node.args.args:
        if arg.arg == "self":
            continue
        if arg.annotation is not None:
            parts.append(f"{arg.arg}: {ast.unparse(arg.annotation)}")
        else:
            parts.append(arg.arg)
    if fn_node.args.vararg:
        parts.append(f"*{fn_node.args.vararg.arg}")
    if fn_node.args.kwarg:
        parts.append(f"**{fn_node.args.kwarg.arg}")
    ret = f" -> {ast.unparse(fn_node.returns)}" if fn_node.returns is not None else ""
    return f"{fn_node.name}({', '.join(parts)}){ret}"


def inspect_solution_ast(solution_code: str) -> tuple[str, list[tuple[str, str]], dict[str, bool]]:
    """
    Parse solutionCode comments and AST to return:
    - summary: Chinese header `# 【算法思路】...`
    - defs: [(signature, chinese_comment), ...]
    - signals: detected edge-case handling flags from AST
    """
    lines = solution_code.splitlines()
    summary = ""
    for line in lines[:5]:
        s = line.strip()
        if s.startswith("# 【算法思路】"):
            summary = s.replace("# 【算法思路】", "", 1).strip()
            break

    tree = ast.parse(solution_code)
    defs: list[tuple[str, str]] = []

    def _comment_above(lineno: int) -> str:
        idx = lineno - 2
        picked: list[str] = []
        while idx >= 0:
            s = lines[idx].strip()
            if s.startswith("#") and not s.startswith("# 【算法思路】"):
                picked.append(s.lstrip("#").strip())
                idx -= 1
            elif s == "":
                break
            else:
                break
        return "；".join(reversed(picked)) if picked else ""

    for node in tree.body:
        if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)):
            start_lineno = min([d.lineno for d in node.decorator_list] + [node.lineno])
            sig = format_param_list(node)
            cmt = _comment_above(start_lineno)
            defs.append((sig, cmt))
        elif isinstance(node, ast.ClassDef):
            start_lineno = min([d.lineno for d in node.decorator_list] + [node.lineno])
            cls_cmt = _comment_above(start_lineno)
            methods = [
                format_param_list(m)
                for m in node.body
                if isinstance(m, (ast.FunctionDef, ast.AsyncFunctionDef))
                and not (m.name.startswith("__") and m.name != "__init__" and m.name != "__next__")
            ]
            sig = f"class {node.name}" + (f"（含方法 {', '.join(m.split('(')[0] for m in methods[:4])}）" if methods else "")
            defs.append((sig, cls_cmt))

    # Inspect AST signals for targeted edge-case advice
    raises_error = any(isinstance(n, ast.Raise) for n in ast.walk(tree))
    uses_round = any(
        isinstance(n, ast.Call) and isinstance(n.func, ast.Name) and n.func.id == "round"
        for n in ast.walk(tree)
    )
    uses_numpy = "import numpy" in solution_code or "np." in solution_code
    uses_math_div = any(isinstance(n, ast.Div) for n in ast.walk(tree))

    signals = {
        "raises_error": raises_error,
        "uses_round": uses_round,
        "uses_numpy": uses_numpy,
        "uses_math_div": uses_math_div,
    }
    return summary, defs, signals


def compact_json(val: Any, limit: int = 90) -> str:
    txt = json.dumps(val, ensure_ascii=False, separators=(", ", ": "))
    if len(txt) <= limit:
        return txt
    if isinstance(val, dict):
        keys = list(val.keys())
        return "{" + ", ".join(f'"{k}": ...' for k in keys[:3]) + (", ..." if len(keys) > 3 else "") + "}"
    if isinstance(val, list):
        if len(val) > 0:
            head = json.dumps(val[0], ensure_ascii=False, separators=(", ", ": "))
            if len(head) <= limit - 12:
                return f"[{head}, ...]（共 {len(val)} 项）"
        return f"[...共 {len(val)} 项]"
    return txt[: limit - 3] + "..."


def format_sample_trace(item: dict) -> str:
    cases = item.get("testCases") or []
    if not cases:
        return ""
    c = cases[0]
    fn_name = c.get("function") or "entrypoint"
    args = c.get("args", [])
    per_limit = 56 if len(args) > 1 else 100
    arg_str = ", ".join(compact_json(a, per_limit) for a in args)

    if "expectedException" in c:
        return (
            f"例如当触发异常校验边界（样例 `{c.get('name', 'sample 1')}`）："
            f"调用 `{fn_name}({arg_str})` 应当显式抛出 `{c['expectedException']}` 异常，及时拦截非法输入。"
        )
    exp = c.get("expected")
    return (
        f"以首个公开样例 `{c.get('name', 'sample 1')}` 为例：当调用 `{fn_name}({arg_str})` 时，"
        f"程序按上述步骤计算后应稳定返回 `{compact_json(exp, 110)}`。"
    )


def build_edge_tips(item: dict, signals: dict[str, bool]) -> list[str]:
    tips: list[str] = []
    hid = item.get("evaluationCases") or []
    all_cases = (item.get("testCases") or []) + hid

    # 1. Exception expectations
    exc_types = sorted({c["expectedException"] for c in all_cases if "expectedException" in c})
    if exc_types or signals["raises_error"]:
        exc_label = " / ".join(f"`{e}`" for e in exc_types) if exc_types else "`ValueError`"
        tips.append(
            f"**非法输入主动拦截**：当遇到空集合、非正数参数或违反约束的数据时，务必按要求显式 `raise` {exc_label}，不要静默返回 `None` 或吞掉异常。"
        )

    # 2. Floating point precision & numpy coercion
    if signals["uses_round"] or signals["uses_numpy"]:
        extra = "注意通过 `np.asarray(..., dtype=float)` 统一转换数组输入以兼容 Python 原生列表与 NumPy 向量，" if signals["uses_numpy"] else ""
        tips.append(
            f"**数值类型与浮点舍入**：{extra}若结果涉及浮点数或小数保留，需与示例 `round` 位数及 `float` 精度对齐，避免直接拿字符串拼接或整数截断替代。"
        )

    # 3. Zero division / empty collection guard
    has_empty_or_zero_case = any(
        c.get("args") == [[]]
        or c.get("args") == [{}]
        or any(
            (isinstance(a, (list, dict)) and len(a) == 0)
            or (isinstance(a, (int, float)) and a == 0)
            for a in (c.get("args") or [])
        )
        for c in all_cases
    )
    if has_empty_or_zero_case or signals["uses_math_div"]:
        tips.append(
            "**零除与空输入守卫**：遇到空列表、空字典或零分母场景（如模长为 0、样本数为 0）时，必须预先加好判空/判零保护，严防 `ZeroDivisionError` 或 `NaN` 污染输出。"
        )

    # 4. Hidden test awareness (guaranteed without leaking answers)
    if len(hid) >= 2:
        tips.append(
            f"**真题隐藏评测覆盖**：完整判题除了 {len(item.get('testCases') or [])} 个公开样例外，还包含 {len(hid)} 组隐藏边界与压力测试用例；"
            "请务必立足通用逻辑与数据结构设计，切勿针对公开样例硬编码分支。"
        )

    return tips[:3]


def build_principle_bullets(item: dict) -> list[str]:
    """Distill pedagogical conceptual takeaways from quizzes' explanations cleanly."""
    bullets: list[str] = []
    for q in (item.get("quizzes") or [])[:3]:
        exp = (q.get("explanation") or "").strip().rstrip("。")
        if not exp or len(exp) < 10:
            continue
        exp = clean_inline_math_spaces(exp)
        bullets.append(f"- **核心要点**：{exp}。")
    return bullets


def build_rich_theory(item: dict) -> str:
    title = item.get("levelTitle") or item.get("subtopicName") or "算法编程挑战"
    subtopic = item.get("subtopicName") or ""
    level_idx = item.get("levelIndex") or 1
    orig_intro = clean_inline_math_spaces(extract_original_theory(item.get("theoryContent", "")))

    metaphor, pitfall = SUBTOPIC_STORIES[subtopic]
    is_advanced = level_idx >= 2 or item.get("difficulty") == "advanced" or item.get("slug", "").endswith("-l2")

    if is_advanced:
        callout = f"> ⚡ **进阶实战与工程深水区**：{metaphor} 在高并发或复杂真实场景中，{pitfall}"
    else:
        callout = f"> 💡 **场景类比与核心直觉**：{metaphor}"

    # 1. Core principle section
    formulas = [normalize_latex_formula(eq) for eq in (item.get("latexFormulas") or []) if eq and eq.strip()]
    formula_blocks = "\n\n".join(f"$$\n{eq}\n$$" for eq in formulas)
    principle_bullets = "\n".join(build_principle_bullets(item))

    principle_parts = ["#### 🔬 核心原理与机制拆解"]
    if is_advanced:
        principle_parts.append(
            f"相比基础原型，本关更聚焦『**{title}**』在工程落地时的精度、效率与边界稳定性要求，涉及以下关键数学关系与规则："
        )
    else:
        principle_parts.append(
            f"在动手写代码前，先理清『**{title}**』背后的数学建模与核心运行逻辑：{pitfall}"
        )
    if formula_blocks:
        principle_parts.append(formula_blocks)
    if principle_bullets:
        principle_parts.append(principle_bullets)

    # 2. Implementation & trace section
    summary, defs, signals = inspect_solution_ast(item.get("solutionCode", ""))
    task_parts = ["#### 🛠️ 实战任务与样例推演"]
    if summary:
        clean_summary = summary.rstrip("。.!！")
        task_parts.append(f"**解题总纲**：{clean_summary}。")
    if defs:
        sig_lines = []
        for sig, cmt in defs:
            desc = f" — {cmt}" if cmt else ""
            sig_lines.append(f"- `{sig}`{desc}")
        task_parts.append("**需要实现的核心接口与结构**：\n" + "\n".join(sig_lines))
    trace = format_sample_trace(item)
    if trace:
        task_parts.append(f"**输入输出推演**：{trace}")

    # 3. Edge cases & thinking prompt
    tips = build_edge_tips(item, signals)
    edge_parts = ["#### 🚀 边界避坑与进阶思考"]
    if tips:
        edge_parts.append("\n".join(f"- {t}" for t in tips))
    raw_tq = item.get("thinkingQuestion")
    if isinstance(raw_tq, str):
        thinking = raw_tq.strip()
    elif isinstance(raw_tq, list):
        thinking = "；".join(
            (q.get("question", "") if isinstance(q, dict) else str(q)).strip()
            for q in raw_tq
            if (q.get("question", "") if isinstance(q, dict) else str(q)).strip()
        )
    else:
        thinking = ""
    if thinking:
        edge_parts.append(f"> 💭 **延伸思考（写完代码后建议作答）**：{clean_inline_math_spaces(thinking)}")

    sections = [
        f"### 🎯 编程挑战：{title}",
        callout,
        orig_intro,
        "\n\n".join(principle_parts),
        "\n\n".join(task_parts),
        "\n\n".join(edge_parts),
    ]
    return "\n\n".join(s for s in sections if s.strip())


def main() -> int:
    stage_files = sorted(glob.glob(BANK_GLOB))
    if len(stage_files) != 11:
        print(f"ERROR: expected 11 stage files, found {len(stage_files)}")
        return 1

    missing_subtopics: set[str] = set()
    total = 0
    lengths: list[int] = []

    for path in stage_files:
        with open(path, "r", encoding="utf-8") as f:
            items = json.load(f)
        for item in items:
            sub = item.get("subtopicName", "")
            if sub not in SUBTOPIC_STORIES:
                missing_subtopics.add(sub)
        if missing_subtopics:
            continue
        for item in items:
            item["latexFormulas"] = [
                normalize_latex_formula(eq)
                for eq in (item.get("latexFormulas") or [])
                if eq and eq.strip()
            ]
            item["theoryContent"] = build_rich_theory(item)
            total += 1
            lengths.append(len(item["theoryContent"]))

        with open(path, "w", encoding="utf-8") as f:
            json.dump(items, f, ensure_ascii=False, indent=2)
            f.write("\n")

    if missing_subtopics:
        print("ERROR missing SUBTOPIC_STORIES:", sorted(missing_subtopics))
        return 1

    print(
        f"Enriched {total} challenges across {len(stage_files)} files. "
        f"theoryContent length: min={min(lengths)}, avg={sum(lengths)//len(lengths)}, max={max(lengths)}"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

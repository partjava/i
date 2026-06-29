export const STAGE_1_CONFIGS: Record<string, any> = {
  "计算机组成原理": {
    theory: `### 计算机组成原理：冯·诺依曼架构与指令执行机理

冯·诺依曼结构奠定了现代通用计算机的硬件基础，其最核心的思想是**“存储程序与程序控制”**。系统在物理上被划分为：控制器（CU）、运算器（ALU）、存储器（Memory）、输入设备和输出设备。

#### 1. 核心总线与寄存器交互
CPU 内部包含一组用于暂存指令和数据的高速寄存器（如程序计数器 PC、指令寄存器 IR、累加器 ACC）。CPU 与外部主存及设备通信依靠三组物理总线：
- **数据总线 (Data Bus)**：双向传输实际参与计算的数字与字符。
- **地址总线 (Address Bus)**：单向传输 CPU 寻址主存单元或 I/O 端口的物理地址。
- **控制总线 (Control Bus)**：传输读写信号、中断信号等调度命令。

#### 2. 时钟周期与性能评估方程
CPU 的性能不仅取决于其主频，还取决于指令计数和每条指令执行所需的平均时钟周期数。其核心效率计算关系式表示为：
$$\\text{CPU Time} = \\text{Instruction Count} \\times \\text{CPI} \\times \\text{Clock Cycle Time}$$

#### 3. 生产级实战设计瓶颈：冯·诺依曼瓶颈
在现代高并发与大规模数据计算中，CPU 的算力提升速度远超内存读写宽带的提升速度。由于指令和数据共享同一总线并存放在同一存储空间，CPU 在等待内存数据载入时会长期处于饥饿状态，这被称为**“冯·诺依曼瓶颈”**。工业界常用增加 L1/L2/L3 多级高速缓存（Cache）、实行指令流水线（Pipeline）等机制来缓解该瓶颈。`,
    latexFormulas: ["CPU\\ Time = Instruction\\ Count \\times CPI \\times Clock\\ Cycle\\ Time"],
    code: "def get_cpu_time(inst_count: int, cpi: float, hz: float) -> float:\n    # 待补全: 计算并返回以秒为单位的 CPU 执行时间\n    pass",
    solution: "def get_cpu_time(inst_count: int, cpi: float, hz: float) -> float:\n    return (inst_count * cpi) / hz",
    expected: "0.5",
    quizzes: [{ question: "冯·诺依曼架构的核心思想是？", options: ["A. 存储程序与程序控制", "B. 并发流控制"], answer: 0, explanation: "指令与数据同存并按址执行。" }],
    thinkingQuestion: "RISC与CISC设计理念的本质区别？",
    aiPrompt: "评估学生对 RISC 与 CISC 架构设计的理解，打分 0-10。"
  },
  "操作系统": {
    theory: `### 操作系统：内核特权级与虚拟内存转换机制

操作系统（OS）是直接控制物理硬件资源、向应用软件提供安全运行环境的系统核心。

#### 1. 内核空间与特权级隔离
为了防范用户程序恶意或误操作破坏物理机器，CPU 提供了不同的硬件执行特权级（如 x86 架构下的 Ring 0 与 Ring 3）：
- **内核空间 (Ring 0)**：拥有至高无上的硬件控制权，可直接执行特权指令、分配内存空间并响应中断。
- **用户空间 (Ring 3)**：普通应用进程在此隔离区运行，对敏感资源的访问必须通过系统调用（System Call）向内核提出服务请求，触发陷阱（Trap）切换。

#### 2. 虚拟内存页面翻译与 TLB 缓存
操作系统通过虚拟内存机制为每个进程提供独立、连续的虚拟地址空间。MMU（内存管理单元）通过页表将虚拟地址转换为物理地址。单级页表下的转换关系式为：
$$\\text{Physical Address} = \\text{PFN} \\times \\text{Page Size} + \\text{Offset}$$

#### 3. 生产级设计瓶颈：缺页中断与 TLB 抖动
当程序频繁随机访问超大范围内存时，页表翻译可能未命中 CPU 内部的页表缓冲（TLB），引发大量的 TLB 抖动与多级页表查询延时。如果页面真实未载入物理内存，MMU 将触发缺页中断（Page Fault），此时 OS 必须从磁盘交换区（Swap）换入页面，产生极高的磁盘 I/O 延迟。`,
    latexFormulas: ["Physical\\ Address = PFN \\times Page\\ Size + Offset"],
    code: "def get_physical_address(pfn: int, page_size: int, offset: int) -> int:\n    # 待补全: 根据页帧号(PFN)、页面大小和页内偏移，计算并返回物理地址\n    pass",
    solution: "def get_physical_address(pfn: int, page_size: int, offset: int) -> int:\n    return pfn * page_size + offset",
    expected: "4196",
    quizzes: [{ question: "在操作系统中，缺页中断（Page Fault）通常是由什么引起的？", options: ["A. 访问的虚拟页不在物理内存中", "B. CPU 时钟中断"], answer: 0, explanation: "当进程访问一个已建立映射但尚未被调入物理内存的虚拟页面时，MMU 会触发缺页中断。" }],
    thinkingQuestion: "微内核（Microkernel）与宏内核（Monolithic Kernel）设计相比，各自的优势和性能开销来源是什么？",
    aiPrompt: "评估微内核与宏内核的异同。需提到可靠性、IPC开销、特权态切换等要点，打分 0-10。"
  },
  "计算机网络": {
    theory: `### 计算机网络：TCP/IP 协议栈与滑动窗口流量控制

计算机网络利用分层的协议栈（如经典的 TCP/IP 四层或 OSI 七层模型）实现异构计算机之间的端到端数据路由与安全交付。

#### 1. TCP 三次握手与连接建立
传输层中的 TCP 协议提供面向连接的、可靠的字节流传输。为了确认彼此的收发能力并安全同步初始序号（ISN），两端需通过三次握手（SYN -> SYN-ACK -> ACK）建立连接状态机。

#### 2. 滑动窗口与带宽时延积 (BDP)
为了防止快速发送端压垮慢速接收端，TCP 引入滑动窗口（Sliding Window）进行流量控制。而网络的传输潜力主要受带宽时延积（Bandwidth-Delay Product）的约束，它代表单向链路上能够容纳的最大飞行中（In-flight）未确认字节数上限：
$$\\text{BDP} = \\text{Bandwidth} \\times \\text{RTT}$$

#### 3. 生产级实战瓶颈：长肥管道 (LFN) 与拥塞崩溃
在具有高带宽、高延迟特征的“长肥管道”网络（如跨洋卫星链路）中，如果发送窗口过小，网络带宽将无法被充分利用。而当拥塞控制算法（如 NewReno、BBR）失调时，网络拥堵会导致频繁丢包，触发重传，甚至引起雪崩效应使得有效吞吐暴跌。`,
    latexFormulas: ["BDP = Bandwidth \\times RTT"],
    code: "def get_bdp_bytes(bandwidth_bps: float, rtt_sec: float) -> int:\n    # 待补全: 计算带宽时延积并以字节（Byte）为单位返回\n    pass",
    solution: "def get_bdp_bytes(bandwidth_bps: float, rtt_sec: float) -> int:\n    return int((bandwidth_bps * rtt_sec) / 8)",
    expected: "1250000",
    quizzes: [{ question: "TCP 协议的‘三次握手’主要是为了解决什么问题？", options: ["A. 确认双方的发送与接收能力是正常的，并同步初始序号", "B. 物理层信道的带宽分配"], answer: 0, explanation: "三次握手可以保证发送端与接收端均具有收发能力，并安全地建立初始的 Sequence Number。" }],
    thinkingQuestion: "TCP的拥塞控制算法在不同的网络丢包情况下是如何调节拥塞窗口的？",
    aiPrompt: "评估 TCP 拥塞控制原理。考察 cwnd 变化曲线、丢包触发条件（超时 vs 冗余ACK），打分 0-10。"
  },
  "编码系统": {
    theory: `### 编码系统：二进制补码运算与数值表示边界

在现代电子计算机内部，所有指令、地址和复杂数据流在最底层都必须表达为高低电平构成的二进制（Binary）数。

#### 1. 补码与加减法统一性
为了使 CPU 的加法器能够无缝计算减法，同时避免“正负零”两个编码冲突，有符号整型普遍采用**补码（Two's Complement）**来存储。正数的补码为其自身，负数的补码为对其绝对值按位取反再加一。

#### 2. 表示边界与数值范围
对于给定的 $N$ 位有符号整型，其能表示的最小值由最高符号位独占表示，在数学边界上被限定为：
$$\\text{Min\\ Value} = -2^{n-1}$$
对于常见 8 位有符号整型，其真值区间为 $[-128, \\; 127]$。

#### 3. 生产级实战瓶颈：数值溢出与截断误差
当大流量高并发业务（如电商交易系统的流水统计）累加值超过该数据类型（例如 32 位 Signed Int）的上限时，会引发无预警的符号位反转溢出（Overflow），导致数值瞬间变为负数。此外，由于 IEEE 754 标准在表达浮点数时存在分数逼近不精确性，程序在高精度金额折算时需采用 Decimals 等定点数库来避免舍入截断误差。`,
    latexFormulas: ["Min\\ Value = -2^{n-1}"],
    code: "def get_min_signed_value(bits: int) -> int:\n    # 待补全: 计算给定比特数下，补码能表示的最小负数\n    pass",
    solution: "def get_min_signed_value(bits: int) -> int:\n    return -(2 ** (bits - 1))",
    expected: "-128",
    quizzes: [{ question: "在 8 位有符号整型补码表示法中，二进制数 11111111 对应的十进制真值是？", options: ["A. -1", "B. 255"], answer: 0, explanation: "二进制 11111111 为负数补码，减 1 取反后得其绝对值为 1，故真值为 -1。" }],
    thinkingQuestion: "Unicode 与 UTF-8 编码之间的关系是什么？为什么在网络传输中首选 UTF-8 编码？",
    aiPrompt: "评估编码关系。重点理解 Unicode 字符集与 UTF-8 变长字节序列实现，打分 0-10。"
  },
  "常用命令": {
    theory: `### Linux 常用命令：输入输出重定向与管道缓冲区机制

Linux 哲学提倡“一切皆文件”以及“通过管道组合简单命令以处理复杂任务”。

#### 1. 三标准流定义
每个运行的进程默认持有三个文件描述符：标准输入 (stdin - 0)、标准输出 (stdout - 1) 和标准错误 (stderr - 2)。
- 使用 \`>\` 符号重定向标准输出；
- 使用 \`2>\` 符号单独提取过滤错误日志。

#### 2. 匿名管道与流式处理
管道符号 \`|\` 可以在两个进程间物理构建一个内核缓冲区，实现前者的输出无缝流式传递给后者的输入：
$$\\text{Stdout}_{\\text{Process\\ 1}} \\rightarrow \\text{Kernel Buffer} \\rightarrow \\text{Stdin}_{\\text{Process\\ 2}}$$

#### 3. 生产级实战瓶颈：管道死锁与慢速 I/O 阻塞
匿名管道内核缓冲区通常限制为 64KB。如果写入进程在读取进程没有消化读取的情况下持续狂飙写入，管道写操作会被挂起阻塞。若两进程互相等待对方的读写状态，则会引发严重的进程级死锁，这在编写大规模运维脚本时需要格外警惕。`,
    latexFormulas: ["Stdout \\rightarrow Stdin"],
    code: "def build_grep_command(filename: str, keyword: str) -> str:\n    # 待补全: 返回在指定文件中查找特定关键字的一行 grep 命令\n    pass",
    solution: "def build_grep_command(filename: str, keyword: str) -> str: \n    return f\"grep '{keyword}' {filename}\"",
    expected: "grep 'error' log.txt",
    quizzes: [{ question: "在 Linux Shell 中，2>&1 这个符号的准确含义是？", options: ["A. 将标准错误重定向到标准输出", "B. 将标准输入重定向到标准输出"], answer: 0, explanation: "2代表标准错误，1代表标准输出，>&是重定向操作，2>&1即将标准错误合并重定向到标准输出。" }],
    thinkingQuestion: "当使用 xargs 组合管道命令时，它与直接使用管道 '|' 在处理长参数列表时有什么核心差别？",
    aiPrompt: "评估 xargs 与管道的区别。考察参数行转换、最大命令长度限制，打分 0-10。"
  },
  "文件系统": {
    theory: `### Linux 文件系统：Inode 元数据与物理块索引寻道

Linux 的 Ext4 等文件系统通过将数据和文件本身的属性解耦，提供了坚固的目录树层级表示。

#### 1. 索引节点 (Inode) 与数据块 (Data Block)
文件在物理上被拆分为：
- **Inode 结构体**：存放文件所有者、访问控制权限权限掩码、文件大小以及指向数据物理块的块指针，唯独不存文件名。
- **Data Block**：存放文件实体的二进制字节。文件名保存在上级目录文件的 Data Block 内。

#### 2. 双重/三重间接物理块寻址与块数计算
为了支持超大文件，块指针采用多级间接索引。所需物理块数计算式为：
$$\\text{Blocks} = \\left\\lceil \\frac{\\text{File Size (Bytes)}}{\\text{Block Size (Bytes)}} \\right\\rceil$$

#### 3. 生产级实战设计瓶颈：Inode 耗尽与磁盘碎片
在日志或爬虫等产生海量小文件的应用环境中，可能会出现“明明磁盘空间还剩 500GB，却报错 No space left on device 无法新建文件”的异常，这通常是因为文件系统预分配的 Inode 总额度被提前耗尽。此时，必须使用 \`df -i\` 进行排查和批量清理。`,
    latexFormulas: ["Blocks = \\lceil Bytes / Block\\ Size \\rceil"],
    code: "import math\ndef calculate_needed_blocks(file_size_bytes: int, block_size_bytes: int) -> int:\n    # 待补全: 计算文件所占物理块数\n    pass",
    solution: "import math\ndef calculate_needed_blocks(file_size_bytes: int, block_size_bytes: int) -> int:\n    return math.ceil(file_size_bytes / block_size_bytes)",
    expected: "3",
    quizzes: [{ question: "Linux 文件系统中，硬链接（Hard Link）和软链接（Soft/Symbolic Link）的本质差异是？", options: ["A. 硬链接共享同一个 Inode 节点号，软链接创建了全新的包含路径的 Inode", "B. 软链接速度比硬链接快"], answer: 0, explanation: "硬链接是指向同一个文件索引节点的多个别名；软链接是存储了目标文件路径的文件，有自己的 Inode。" }],
    thinkingQuestion: "当磁盘报告 'No space left on device'，但使用 df -h 发现仍有大量空间时，是什么原因？",
    aiPrompt: "考核 Inode 耗尽场景分析，打分 0-10。"
  },
  "权限管理": {
    theory: `### Linux 权限管理：rwx 八进制位掩码与特殊安全特征

Linux 作为一个健壮的多用户系统，通过严密的访问控制列表限制对文件和进程的越权访问。

#### 1. 经典三档权限设定
文件针对 Owner（属主）、Group（用户组）和 Others（其他用户）三类关系进行权限限制。每一档权限包含三位：r（读-4）、w（写-2）、x（执行-1）。
- **读(r)**：4点。
- **写(w)**：2点。
- **执行(x)**：1点。

#### 2. 八进制权限转换关系
各档权限通过简单的累加求和表示，计算公式为：
$$\\text{Permission Octal} = (r \\times 4) + (w \\times 2) + (x \\times 1)$$
例如权限为 \`rwxr-xr-x\` 对应的八进制编码为 \`755\`。

#### 3. 生产级安全隔离：特殊权限位与提权防范
除普通权限外，系统还提供 SUID（4000）、SGID（2000）和 Sticky Bit（1000）三个特殊权限位。SUID 允许普通用户在执行该二进制程序时临时获得属主（如 root）的特权。若被黑客在敏感文件上违规设置了 SUID 权限，将直接导致严重的提权安全漏洞。`,
    latexFormulas: ["Permission\\ Octal = (r \\times 4) + (w \\times 2) + (x \\times 1)"],
    code: "def build_permission_octal(owner: tuple, group: tuple, others: tuple) -> str:\n    # 待补全: 接收三个含有 (r,w,x) 0或1的元组，返回三位八进制权限码字符串，如 '755'\n    pass",
    solution: "def build_permission_octal(owner: tuple, group: tuple, others: tuple) -> str:\n    o_val = owner[0]*4 + owner[1]*2 + owner[2]\n    g_val = group[0]*4 + group[1]*2 + group[2]\n    t_val = others[0]*4 + others[1]*2 + others[2]\n    return f\"{o_val}{g_val}{t_val}\"",
    expected: "755",
    quizzes: [{ question: "一个目录的权限被设为 644 (drw-r--r--)，普通用户能否进入该目录（即 cd 进去）？", options: ["A. 不能，因为缺少执行(x)权限，无法穿过该目录", "B. 能，因为有读(r)权限"], answer: 0, explanation: "对目录而言，执行权限(x)决定了用户是否可以进入该目录。" }],
    thinkingQuestion: "Linux 中的 SUID、SGID 以及 Sticky Bit（粘滞位）各自有什么作用？",
    aiPrompt: "评估特殊权限位概念。重点考察特殊执行权限及防误删的粘滞位，打分 0-10。"
  },
  "进程管理": {
    theory: `### Linux 进程管理：进程控制块与写时复制机制

进程是操作系统分配物理硬件资源和调度的基本安全边界。

#### 1. 进程控制块 (PCB) 与状态流转
内核为每个运行的进程维护一个结构体 \`task_struct\` (PCB)，保存其 PID、寄存器上下文、文件句柄和物理运行状态。进程在生命周期中根据资源抢占在就绪、运行和阻塞三大状态间高频切换。

#### 2. 写时复制 (Copy-on-Write) 与 CPU 占比
当父进程使用 \`fork()\` 复制子进程时，操作系统只复制页表指针，而不复制物理内存页。只有当某一方写内存时，才触发缺页异常并复制物理内存页。单进程 CPU 负载率定义为：
$$\\text{CPU Utilization} = \\frac{\\text{Process CPU Time}}{\\text{Elapsed Time}} \\times 100\\%$$

#### 3. 生产级高并发瓶颈：Fork 延迟与僵尸进程积压
在高吞吐量的服务器中，如果父进程短时间创建大量并发子进程，在进程退出时未及时调用 \`wait()\` 或 \`waitpid()\` 进行描述符回收，会导致大量的**僵尸进程（Zombie）**积压，白白耗尽系统的可用 PID 资源，造成新服务无法拉起。`,
    latexFormulas: ["CPU\\ Utilization = \\frac{Process\\ CPU\\ Time}{Elapsed\\ Time} \\times 100\\%"],
    code: "def get_cpu_utilization(cpu_ticks: int, total_ticks: int) -> float:\n    # 待补全: 计算进程 CPU 占用比例百分比\n    pass",
    solution: "def get_cpu_utilization(cpu_ticks: int, total_ticks: int) -> float:\n    return round((cpu_ticks / total_ticks) * 100, 2)",
    expected: "25.0",
    quizzes: [{ question: "在 Linux 进程状态中，僵尸进程（Zombie）是如何形成的？", options: ["A. 子进程退出后，父进程尚未调用 wait() 获取其退出状态，使得进程表项未释放", "B. 子进程一直在进行无限循环"], answer: 0, explanation: "当子进程结束但父进程未通过 wait() 清理子进程的描述符时，它便以僵尸进程形式滞留在系统中。" }],
    thinkingQuestion: "写时复制（Copy-on-Write, COW）技术在 fork() 创建子进程时是如何避免昂贵的物理内存复制开销的？",
    aiPrompt: "评估对 fork 机制及 COW 写时复制的底层硬件/MMU映射实现理解，打分 0-10。"
  },
  "Shell脚本": {
    theory: `### Shell 脚本：自动化开发、安全变量与退出状态传递

Shell 脚本充当了粘合各种底层二进制可执行程序以实现自动运维管道的粘合剂。

#### 1. 强安全指令与流程控制
脚本在没有类型约束的情况下直接引用环境变量，依靠 conditional branches 和循环流完成资源清洗。

#### 2. 上步命令退出状态判定
每个 Linux 程序在退出时都会返回一个 $[0, \\; 255]$ 区间的整数代表执行结果状态值。 \`$?\` 用于拦截上一步退出状态：
$$\\text{Exit Status Code} = 0 \\quad \\text{(SUCCESS)}$$
非零代表各种异常错误分类（例如 127 代表 Command not found）。

#### 3. 生产级运维瓶颈：管道异常掩盖与数据雪崩
当脚本以管道 \`Cmd1 | Cmd2 | Cmd3\` 串联执行时，若前面的命令发生致命错误退出，后续的命令仍然会欢快地运行并重置状态，导致上层调度器误判执行结果成功（即掩盖了真实退出码）。生产级脚本必须声明 \`set -o pipefail\`，以保证管道中任何一步出错都能被安全捕获。`,
    latexFormulas: ["Exit\\ Code = 0 \\rightarrow SUCCESS"],
    code: "def get_shell_check_success_script() -> str:\n    # 待补全: 返回 shell 中用于判断上一条命令是否执行成功的判断语句\n    pass",
    solution: "def get_shell_check_success_script() -> str:\n    return 'if [ $? -eq 0 ]; then echo \"OK\"; fi'",
    expected: 'if [ $? -eq 0 ]; then echo "OK"; fi',
    quizzes: [{ question: "在 Bash 脚本中，双引号 '' 和单引号 '' 声明的字符串最核心的区别是？", options: ["A. 双引号支持变量解析与命令替换，单引号将所有字符均视作字面常量", "B. 单引号执行速度慢"], answer: 0, explanation: "单引号屏蔽了所有特殊字符的解析，而双引号允许保留符号 $ (变量引用) 和反引号 (命令求值)。" }],
    thinkingQuestion: "在编写 Shell 脚本时，设置 set -e, set -u 和 set -o pipefail 各自能为脚本的安全执行提供什么保障？",
    aiPrompt: "评估 Shell 脚本异常捕获与稳健性设计，打分 0-10。"
  },
  "init/clone": {
    theory: `### Git 基础：分布式初始化与克隆存储机理

Git 与传统的集中式 SVN 具有本质差异，其核心哲学是**分布式**和**对本地历史库快照的持久化管理**。

#### 1. 初始化物理树与 .git 目录
当在本地执行 \`git init\` 时，Git 会在项目根目录下物理建立一个隐藏的 \`.git\` 空间文件夹：
$$\\text{Working Directory} \\rightarrow \\text{.git (Object Database \\& References)}$$

#### 2. .git 内部对象类型
- **Blob**：物理压缩存储文件实体内容，但不包含文件名 and 目录结构。
- **Tree**：对应目录节点，保存文件名列表以及指向下层 Blob 或 Tree 的哈希地址。
- **Commit**：描述一次项目归档版本快照，包含作者、时间戳、父 Commit 以及根 Tree 哈希。

#### 3. 生产级大仓瓶颈：浅克隆优化
当克隆（Clone）一个开发十年、拥有数百万条历史提交记录和大量大二进制文件的超大仓库时，网络带宽传输和磁盘空间占用开销极高。团队应当使用 \`git clone --depth 1\` 进行“浅克隆”（Shallow Clone），仅拉取最近一次提交的完整代码快照，以提升 CI/CD 编译拉取效率。`,
    latexFormulas: ["Repo \\rightarrow .git"],
    code: "def get_git_init_cmd() -> str:\n    # 待补全: 返回初始化本地全新 Git 仓库所使用的命令字符串\n    pass",
    solution: "def get_git_init_cmd() -> str:\n    return 'git init'",
    expected: "git init",
    quizzes: [{ question: "执行 git init 命令后，新建的 .git/ 文件夹在物理上用于存放什么？", options: ["A. 所有的元数据和对象数据库，包括提交记录、指针和配置文件", "B. 仅存放合并产生的冲突标志"], answer: 0, explanation: ".git 目录保存了整个仓库的本地提交对象数据库、引用指针、分支映射以及本地配置信息。" }],
    thinkingQuestion: "如何仅克隆远端 Git 仓库中最近 1 次提交的内容（浅克隆）？",
    aiPrompt: "考核 git clone --depth 1 命令，打分 0-10。"
  },
  "add/commit/push": {
    theory: `### Git 工作流：暂存区机制与快照版本记录

Git 通过工作区、暂存区和本地版本库的隔离，为开发者提供了极佳的代码编辑灵活性。

#### 1. 暂存区索引文件 (Index) 的底层作用
暂存区（Staging Area）在物理上是一个二进制文件 \`.git/index\`。当开发者运行 \`git add\` 时，Git 将文件内容写入只读 Blob 对象，并更新 index 文件以记录该文件的哈希值。

#### 2. 状态合流过程
代码状态的迁移遵循：
$$\\text{Work} \\xrightarrow{\\text{add}} \\text{Index} \\xrightarrow{\\text{commit}} \\text{HEAD} \\xrightarrow{\\text{push}} \\text{Remote}$$

#### 3. 生产级实战瓶颈：数据泄漏与大文件入库风险
如果在执行 \`git add\` 时没有正确配置 \`.gitignore\` 忽略配置文件，误将明文敏感配置文件（如数据库密码密钥）或者数 GB 的大模型权重文件提交到本地 Commit 并推送到远端公共仓库，会引发严重的机密数据泄密及网络带宽堵塞。必须使用 BFG Repo-Cleaner 等工具物理改写重组全部历史树哈希才能彻底抹去记录。`,
    latexFormulas: ["Work \\xrightarrow{add} Index \\xrightarrow{commit} HEAD"],
    code: "def get_git_push_cmd(remote: str, branch: str) -> str:\n    # 待补全: 返回推送指定分支到特定远端的命令\n    pass",
    solution: "def get_git_push_cmd(remote: str, branch: str) -> str:\n    return f\"git push {remote} {branch}\"",
    expected: "git push origin master",
    quizzes: [{ question: "关于 Git 暂存区（Staging Area），以下说法最准确的是？", options: ["A. 它是工作区与本地版本库之间的缓冲区，准备记录到下次提交中", "B. 它是项目存放在服务器上的镜像文件"], answer: 0, explanation: "暂存准备归档到下次提交的文件修改。" }],
    thinkingQuestion: "如果提交后发现漏掉了一个小改动，或者提交注释写错了，该如何补救？",
    aiPrompt: "考核 git commit --amend 以及 git reset 混合模式，打分 0-10。"
  },
  "branch/merge": {
    theory: `### Git 分支与合并：三方合并算法与指针移动

分支合并（Branch & Merge）是多团队、高内聚分布式协作开发的核心底座。

#### 1. 轻量分支指针机制
在 Git 内部，分支（Branch）并不是代码文件的物理副本，而只是一个包含了 40 字节十六进制 SHA-1 提交哈希的文本指针文件（存放于 \`.git/refs/heads/\` 目录下）。创建或切换分支仅意味着写入并更新指针，开销几乎为零。

#### 2. 三方合并 (Three-way Merge) 算法
当两个分叉的分支需要合流时，Git 首先寻找两者的共同祖先节点（Common Ancestor），再计算两个 HEAD 与祖先的差异做融合：
$$\\text{Merge Result} = \\text{Common Ancestor} + \\text{HEAD}_1 + \\text{HEAD}_2$$

#### 3. 生产级实战瓶颈：大规模并行合并引发的冲突积压
当几十位开发者同时向 master 分支合并各自的特性分支时，频繁的修改重叠会导致大量的三方合并冲突。若没有清晰的团队开发分支控制规范（如 Git Flow 或 GitHub Flow），合并冲突解决不妥会引发生产环境代码丢失或死锁。`,
    latexFormulas: ["Common\\ Ancestor + HEAD_1 + HEAD_2"],
    code: "def get_new_branch_cmd(branch_name: str) -> str:\n    # 待补全: 返回基于当前分支创建并切换到新分支的命令\n    pass",
    solution: "def get_new_branch_cmd(branch_name: str) -> str:\n    return f\"git checkout -b {branch_name}\"",
    expected: "git checkout -b feature-ml",
    quizzes: [{ question: "当合并分支时，如果 Git 报告 'Fast-forward'，这代表？", options: ["A. 目标分支在分叉后没有新的提交，当前分支指针直接向前移动", "B. Git 自动生成了一个全新的三方合并 Commit"], answer: 0, explanation: "快进模式发生于被合并的分支是当前分支的直系后代时，只需更新指针。" }],
    thinkingQuestion: "git merge --no-ff（非快进合并）的作用是什么？为什么多采用此模式？",
    aiPrompt: "评估合并策略。说明非快进模式能强制保留分支合并历史的清晰拓扑图，打分 0-10。"
  },
  "rebase": {
    theory: `### Git Rebase 变基：修改基底与线性提交树演进

变基（Rebase）旨在提供一条干净、无杂乱 Merge 节点的直线型版本演进历史。

#### 1. 变基运行机制
变基操作会解构当前分支自与基底分叉以来的所有差分提交（Patches），接着将当前分支重置到目标基底分支的头部，并逐个应用这些差分 Patch：
$$\\text{Commit\\ B}_{\\text{old}} \\rightarrow \\text{Patch Extract} \\rightarrow \\text{Replay on Base} \\rightarrow \\text{Commit\\ B}_{\\text{new}}$$

#### 2. 改写历史树的代价
由于变基产生的重放提交是一组内容相同但单指针指向不同节点的新对象，它们的 SHA-1 哈希值会彻底改变。

#### 3. 变基黄金定律（Rule of Rebase）
**“绝对不要在推送到远端公共仓库的公共分支上执行 Rebase 变基”**。一旦你改写了已经共享的提交哈希，其他协同成员拉取代码时将面临版本库分叉的严重冲突，被迫进行复杂的三方合并，从而导致开发流的全面混乱。`,
    latexFormulas: ["Commit\\ B \\rightarrow Commit\\ A'"],
    code: "def get_rebase_interactive_cmd(num_commits: int) -> str:\n    # 待补全: 返回对最近 N 次提交进行交互式变基的命令\n    pass",
    solution: "def get_rebase_interactive_cmd(num_commits: int) -> str:\n    return f\"git rebase -i HEAD~{num_commits}\"",
    expected: "git rebase -i HEAD~3",
    quizzes: [{ question: "在使用 Git rebase 时，应当遵循哪条‘黄金定律’？", options: ["A. 绝对不要在公共的（已经推送到共享远端的）分支上执行变基", "B. 只有在主干 master 分支上才能执行变基"], answer: 0, explanation: "改写已共享提交会导致合作者产生冲突。" }],
    thinkingQuestion: "对比 git merge 与 git rebase 在整合团队分支时的优缺点是什么？",
    aiPrompt: "评估 Merge 与 Rebase 折中。强调历史纯净度 vs 物理真实历史保留，打分 0-10。"
  },
  "conflict解决": {
    theory: `### Git 冲突解决：三路合并标记与多人协同恢复

合并冲突（Merge Conflict）是协作合流过程中正常且需要审慎裁决的分歧点。

#### 1. 冲突标记线产生逻辑
当 Git 自动尝试进行三方合并，却发现两个分支在同一处物理文本行上进行了不同的编辑动作时，Git 无法判定保留哪一方，会在代码中直接物理插入三路冲突标记：
- \`<<<<<<< HEAD\`：当前工作分支的代码快照。
- \`=======\`：分割线。
- \`>>>>>>> branch\`：待合并入的分支的代码修改。

#### 2. 多人协同冲突仲裁流
开发者必须逐一核对冲突点，编辑并擦除全部标记符号，选择保留最优修改，然后执行暂存提交流：
$$\\text{Edit} \\rightarrow \\text{git add} \\rightarrow \\text{git commit} \\rightarrow \\text{Resolved}$$

#### 3. 生产级实战瓶颈：冲突退回与应急处理
当多人大重构合流产生漫天遍野的冲突、确认无法小时间恢复时，严禁使用盲目猜测保留的极端做法。应当立即执行 \`git merge --abort\` 或 \`git rebase --abort\`，彻底回滚本次合并动作，回到干净安全的原始状态，并与开发同事当面确认修改意图后再启动合流流程。`,
    latexFormulas: ["<<<<<<< \\quad ======= \\quad >>>>>>>"],
    code: "def has_unresolved_git_markers(content: str) -> bool:\n    # 待补全: 判定文本内容中是否包含未解决的 Git 冲突标记线\n    pass",
    solution: "def has_unresolved_git_markers(content: str) -> bool:\n    return \"<<<<<<<\" in content and \"=======\" in content and \">>>>>>>\" in content",
    expected: "True",
    quizzes: [{ question: "在合并代码产生冲突后，用户手动编辑解决冲突的文件，接下来正确的命令顺序是？", options: ["A. git add -> git commit", "B. git commit -> git push"], answer: 0, explanation: "手动解冲突后，修改的部分处于工作区，必须用 git add 暂存确认，再用 git commit 提交来彻底完成这次合流。" }],
    thinkingQuestion: "当多路合并冲突极其棘手时，如何使用 git merge --abort 回滚到合并前的安全状态？",
    aiPrompt: "考核合并失败后的状态回滚策略，打分 0-10。"
  }
};

const fs = require('fs');
const path = require('path');

const outputBaseDir = path.join(__dirname, '../challenges_data/01_基础知识');

// 1. 定义 14 个小节 × 3 关卡的完整数据结构
const curriculumData = [
  {
    subtopic: "计算机组成原理",
    folder: "01_计算机组成原理",
    levels: [
      {
        index: 1,
        title: "CPU 执行时间计算",
        folderName: "level1_cpu_time_calc",
        expected: "0.002",
        readme: `### 🛠️ 编程挑战：CPU 执行时间计算

在计算机系统结构中，CPU 执行一段程序所需的时间（CPU Time）是衡量处理器性能的最根本指标。

#### 📋 任务描述
请编写并补全函数 \`calculate_cpu_time(instructions: int, cpi: float, frequency_hz: float) -> float\`。
根据时钟周期时间公式，计算并返回 CPU 执行该段程序所需的总物理时间（以秒为单位）。

#### 🔢 核心计算公式
$$\\text{CPU Time} = \\frac{\\text{Instructions} \\times \\text{CPI}}{\\text{Frequency (Hz)}}$$

#### 📥 输入参数
1. \`instructions\` (*int*): 程序包含的机器指令总数，例如 \`1000000\`。
2. \`cpi\` (*float*): 每条指令所需的平均时钟周期数（Cycles Per Instruction），例如 \`2.5\`。
3. \`frequency_hz\` (*float*): CPU 的时钟主频（赫兹），例如 \`2000000000\` (2.0 GHz)。

#### 📤 输出返回值
- 返回计算出的 CPU 执行时间 (*float*)，保留 6 位小数。

#### 💡 示例
- 输入：\`instructions=1000000\`, \`cpi=2.0\`, \`frequency_hz=1000000000\`
- 输出：\`0.002\`
- 解析：$(1000000 \\times 2.0) / 1000000000 = 0.002$ 秒。`,
        starter: `def calculate_cpu_time(instructions: int, cpi: float, frequency_hz: float) -> float:
    """
    根据给定的指令数、CPI和CPU主频，计算程序执行时间（秒）。
    """
    # TODO: 实现执行时间计算，返回保留6位小数的float值
    pass
`,
        solution: `def calculate_cpu_time(instructions: int, cpi: float, frequency_hz: float) -> float:
    if frequency_hz <= 0 or instructions < 0 or cpi <= 0:
        raise ValueError("Invalid parameters")
    cpu_time = (instructions * cpi) / frequency_hz
    return round(cpu_time, 6)
`,
        testCases: `import unittest
from starter import calculate_cpu_time

class TestCpuTime(unittest.TestCase):
    def test_case_basic(self):
        self.assertEqual(calculate_cpu_time(1000000, 2.0, 1000000000), 0.002)
        self.assertEqual(calculate_cpu_time(5000000, 1.5, 2500000000), 0.003)

    def test_case_zero_inst(self):
        self.assertEqual(calculate_cpu_time(0, 2.0, 1000000000), 0.0)

if __name__ == '__main__':
    unittest.main()
`,
        quizzes: [
          {
            question: "如果一个处理器的时钟频率提高了一倍，但执行某程序的 CPI 也翻倍了，执行时间会如何变化？",
            options: ["A. 保持不变", "B. 缩短为一半", "C. 增加一倍"],
            answer: 0,
            explanation: "根据公式，频率在分母提高一倍，CPI在分子也提高一倍，相互抵消，执行时间保持不变。"
          }
        ]
      },
      {
        index: 2,
        title: "多核异构处理器效能对比分析器",
        folderName: "level2_heterogeneous_comparison",
        expected: '{"faster_cpu": "A", "speedup_ratio": 1.0}',
        readme: `### 🛠️ 编程挑战：多核异构处理器效能对比分析器

在服务器和移动芯片设计中，经常需要对比两个不同微架构的处理器在运行特定程序集时的效率，以评估其“加速比”（Speedup）。

#### 📋 任务描述
请补全函数 \`compare_processors(instructions_mix: dict, cpu_a: dict, cpu_b: dict) -> dict\`。
- 输入中，\`instructions_mix\` 包含了程序中各类指令的数量占比；
- \`cpu_a\` 和 \`cpu_b\` 包含了各自的主频（Hz）和运行各类指令对应的 CPI。
- 计算得出哪颗处理器更快，并计算出 CPU A 相对于 CPU B 的**加速比（Speedup Ratio）**：
  $$\\text{Speedup} = \\frac{\\text{CPU Time}_B}{\\text{CPU Time}_A}$$

#### 📥 输入参数
- \`instructions_mix\` (*dict*): 形如 \`{"Arithmetic": 0.5, "Memory": 0.3, "Branch": 0.2}\`（占比总和为 1.0）。
- \`cpu_a\` / \`cpu_b\` (*dict*): 包含主频及每类指令的 CPI。形如：
  \`{"frequency": 2000000000, "cpi": {"Arithmetic": 1.0, "Memory": 2.5, "Branch": 2.0}}\`

#### 📤 输出返回值
返回一个字典，格式如下：
\`{"faster_cpu": "A", "speedup_ratio": 1.25}\` （加速比保留 2 位小数）。`,
        starter: `def compare_processors(instructions_mix: dict, cpu_a: dict, cpu_b: dict) -> dict:
    """
    对比两颗处理器在特定指令混合比下的运行耗时，计算加速比。
    """
    # TODO: 计算各自的平均CPI与总时间，比较并返回结果字典
    pass
`,
        solution: `def compare_processors(instructions_mix: dict, cpu_a: dict, cpu_b: dict) -> dict:
    # 计算加权平均 CPI
    cpi_a = sum(instructions_mix[k] * cpu_a["cpi"][k] for k in instructions_mix)
    cpi_b = sum(instructions_mix[k] * cpu_b["cpi"][k] for k in instructions_mix)
    
    # 假设运行的总指令数为 10^6 进行等价时间对比
    time_a = cpi_a / cpu_a["frequency"]
    time_b = cpi_b / cpu_b["frequency"]
    
    faster = "A" if time_a < time_b else "B"
    speedup = time_b / time_a
    
    return {
        "faster_cpu": faster,
        "speedup_ratio": round(speedup, 2)
    }
`,
        testCases: `import unittest
from starter import compare_processors

class TestHeterogeneous(unittest.TestCase):
    def test_case_1(self):
        mix = {"Arithmetic": 0.6, "Memory": 0.4}
        cpu_a = {"frequency": 2000000000, "cpi": {"Arithmetic": 1.0, "Memory": 2.0}}
        cpu_b = {"frequency": 3000000000, "cpi": {"Arithmetic": 1.5, "Memory": 3.0}}
        
        # cpi_a = 0.6*1 + 0.4*2 = 1.4 -> time_a = 1.4/2e9 = 0.7e-9
        # cpi_b = 0.6*1.5 + 0.4*3.0 = 2.1 -> time_b = 2.1/3e9 = 0.7e-9
        res = compare_processors(mix, cpu_a, cpu_b)
        self.assertEqual(res["speedup_ratio"], 1.0)

if __name__ == '__main__':
    unittest.main()
`,
        quizzes: [
          {
            question: "加速比（Speedup）大于 1.0 代表什么？",
            options: ["A. CPU A 比 CPU B 更快", "B. CPU B 比 CPU A 更快", "C. 两者一样快"],
            answer: 0,
            explanation: "Speedup = Time_B / Time_A。若其大于 1.0，说明 Time_B > Time_A，即 CPU A 耗时更短、更快。"
          }
        ]
      },
      {
        index: 3,
        title: "处理器指令流水线冲突检测",
        folderName: "level3_pipeline_hazard_detector",
        expected: "3",
        readme: `### 🛠️ 编程挑战：处理器指令流水线冲突检测

在现代 CPU 中，指令执行采用多级流水线（Pipelining）。但如果前后两条指令存在数据依赖（例如后一条指令需要读取前一条指令尚未写入的寄存器），就会引发**数据冲突（Data Hazard）**，导致流水线挂起停顿（Stall）。

#### 📋 任务描述
请编写并补全函数 \`detect_data_hazards(instructions: list) -> int\`。
- 输入为一个包含多条汇编指令的列表。每条指令表示为 \`{"dest": "R1", "src": ["R2", "R3"]}\`，表示把 R2 和 R3 的值计算后写入 R1。
- 假设 CPU 采用经典的三级流水线（IF取指, ID译码/读寄存器, EX执行/写寄存器）。
- 数据依赖关系：如果当前指令的 \`src\` 寄存器在**上一条**指令的 \`dest\` 写入，则会导致 **2 个时钟周期** 的停顿（Stall）；如果在**上上条**指令的 \`dest\` 写入，则会导致 **1 个时钟周期** 的停顿。
- 计算并返回这组指令序列执行过程中的**总停顿周期数（Total Stall Cycles）**。

#### 💡 示例
- 输入：
  \`\`\`python
  instructions = [
      {"dest": "R1", "src": ["R2", "R3"]},
      {"dest": "R4", "src": ["R1", "R5"]}, # 依赖上一条的 R1 -> 停顿 2
      {"dest": "R6", "src": ["R1", "R7"]}  # 依赖上上条的 R1 -> 停顿 1
  ]
  \`\`\`
- 返回：\`3\``,
        starter: `def detect_data_hazards(instructions: list) -> int:
    """
    计算指令流在三级流水线中由于数据依赖冲突（RAW）产生的总停顿周期数。
    """
    # TODO: 顺序遍历指令，检查与前两条指令的目标寄存器依赖，累加停顿值
    pass
`,
        solution: `def detect_data_hazards(instructions: list) -> int:
    stalls = 0
    for i in range(len(instructions)):
        curr_src = set(instructions[i].get("src", []))
        
        # 1. 检查上一条指令
        if i >= 1:
            prev_dest = instructions[i-1].get("dest")
            if prev_dest in curr_src:
                stalls += 2
                continue # 触发了上一条的RAW冲突，后面的上上条就不重复计算了
                
        # 2. 检查上上条指令
        if i >= 2:
            prev_prev_dest = instructions[i-2].get("dest")
            if prev_prev_dest in curr_src:
                stalls += 1
                
    return stalls
`,
        testCases: `import unittest
from starter import detect_data_hazards

class TestPipeline(unittest.TestCase):
    def test_case_no_hazard(self):
        insts = [
            {"dest": "R1", "src": ["R2", "R3"]},
            {"dest": "R4", "src": ["R5", "R6"]}
        ]
        self.assertEqual(detect_data_hazards(insts), 0)

    def test_case_stalls(self):
        insts = [
            {"dest": "R1", "src": ["R2", "R3"]},
            {"dest": "R4", "src": ["R1", "R5"]},
            {"dest": "R6", "src": ["R1", "R7"]}
        ]
        self.assertEqual(detect_data_hazards(insts), 3)

if __name__ == '__main__':
    unittest.main()
`,
        quizzes: [
          {
            question: "解决数据冲突（RAW）最常用的硬件优化技术是？",
            options: ["A. 旁路投递 / 前向通道（Bypassing / Forwarding）", "B. 增加分支预测器"],
            answer: 0,
            explanation: "旁路投递能直接将执行结果从 EX 阶段拉回 ID 阶段的输入，免去大部分等待停顿。"
          }
        ]
      }
    ]
  },
  {
    subtopic: "操作系统",
    folder: "02_操作系统",
    levels: [
      {
        index: 1,
        title: "分页地址变换模拟",
        folderName: "level1_paging_translation",
        expected: "21384",
        readme: `### 🛠️ 编程挑战：分页地址变换模拟

在分页内存管理中，操作系统的内存管理单元（MMU）负责将虚拟地址翻译为物理地址。

#### 📋 任务描述
请编写并补全函数 \`translate_address(virtual_addr: int, page_table: dict, page_size: int) -> int\`。
- 计算出虚拟地址对应的虚拟页号（VPN）和页内偏移量（Offset）。
- 在给定的页表字典中查找 VPN 对应的物理页帧号（PFN）。
- 如果查到了，结合偏移量计算并返回物理地址。
- 如果没有查到，代表发生了**缺页中断（Page Fault）**，此时必须抛出 \`ValueError\` 异常，提示文字为 \`"Page Fault: VPN not found"\`。

#### 🔢 核心公式
$$\\text{VPN} = \\text{virtual\\_addr} // \\text{page\\_size}$$
$$\\text{Offset} = \\text{virtual\\_addr} \\% \\text{page\\_size}$$
$$\\text{Physical Address} = \\text{PFN} \\times \\text{page\\_size} + \\text{Offset}$$`,
        starter: `def translate_address(virtual_addr: int, page_table: dict, page_size: int) -> int:
    """
    将虚拟内存地址翻译为十进制物理内存地址。页表中未命中抛出 ValueError。
    """
    # TODO: 计算 VPN 和 Offset，查询页表并返回物理地址或抛异常
    pass
`,
        solution: `def translate_address(virtual_addr: int, page_table: dict, page_size: int) -> int:
    vpn = virtual_addr // page_size
    offset = virtual_addr % page_size
    if vpn not in page_table:
        raise ValueError("Page Fault: VPN not found")
    pfn = page_table[vpn]
    return pfn * page_size + offset
`,
        testCases: `import unittest
from starter import translate_address

class TestPaging(unittest.TestCase):
    def test_success(self):
        page_table = {0: 2, 1: 5}
        self.assertEqual(translate_address(5000, page_table, 4096), 21384)

    def test_fault(self):
        page_table = {0: 2}
        with self.assertRaises(ValueError):
            translate_address(5000, page_table, 4096)

if __name__ == '__main__':
    unittest.main()
`,
        quizzes: [
          {
            question: "页表（Page Table）通常存放在？",
            options: ["A. 物理主内存（RAM）中", "B. CPU 内部的通用寄存器中"],
            answer: 0,
            explanation: "页表由于数据量较大，通常存放在系统主内存中，CPU 内部通过页表基址寄存器（PTBR）指向它。"
          }
        ]
      },
      {
        index: 2,
        title: "虚拟内存 LRU 页面置换算法",
        folderName: "level2_lru_page_replacement",
        expected: "6",
        readme: `### 🛠️ 编程挑战：LRU 页面置换算法模拟

当物理内存（物理页框）已满，而程序又请求调入新的页面时，操作系统必须决定淘汰一个内存中的页面。LRU（最近最少使用）算法会选择淘汰最长时间未被访问的页面。

#### 📋 任务描述
请编写并补全函数 \`simulate_lru(page_requests: list, frame_count: int) -> int\`。
- 输入为页面请求序列 \`page_requests\`（如 \`[1, 2, 3, 1, 4]\`）和可用的物理页框数 \`frame_count\`。
- 模拟整个页面的调入调出过程。
- 计算并返回在整个请求序列中发生的**缺页中断（Page Fault）的总次数**。

#### 💡 示例
- 输入：\`page_requests = [7, 0, 1, 2, 0, 3]\`, \`frame_count = 3\`
- 输出：\`6\` (开始时内存为空，依次发生缺页填满页框，后续页面也触发置换)。`,
        starter: `def simulate_lru(page_requests: list, frame_count: int) -> int:
    """
    计算在有限物理页框下，执行请求序列时触发页面置换缺页的次数。
    """
    # TODO: 维护一个当前物理页框的状态列表，遵循LRU淘汰逻辑，统计缺页数
    pass
`,
        solution: `def simulate_lru(page_requests: list, frame_count: int) -> int:
    frames = []
    faults = 0
    for page in page_requests:
        if page in frames:
            # 命中：将其移动到最末尾（代表最近刚被使用）
            frames.remove(page)
            frames.append(page)
        else:
            # 未命中：发生缺页
            faults += 1
            if len(frames) >= frame_count:
                # 淘汰最少使用的（即头部的第一个元素）
                frames.pop(0)
            frames.append(page)
    return faults
`,
        testCases: `import unittest
from starter import simulate_lru

class TestLru(unittest.TestCase):
    def test_lru_cases(self):
        self.assertEqual(simulate_lru([7, 0, 1, 2, 0, 3], 3), 6)
        self.assertEqual(simulate_lru([1, 2, 1, 3, 1, 2], 2), 4)

if __name__ == '__main__':
    unittest.main()
`,
        quizzes: [
          {
            question: "LRU 算法的淘汰依据是？",
            options: ["A. 最近最久未被使用的页面", "B. 在内存中驻留时间最长的页面"],
            answer: 0,
            explanation: "LRU 选择最长时间没有被访问的页进行淘汰；FIFO 选择驻留时间最长的页面进行淘汰。"
          }
        ]
      },
      {
        index: 3,
        title: "进程管理死锁检测图算法",
        folderName: "level3_deadlock_detector",
        expected: "[0, 1]",
        readme: `### 🛠️ 编程挑战：进程死锁检测图算法

死锁（Deadlock）是操作系统中多个进程因争夺排他性资源而造成的僵持状态。

#### 📋 任务描述
请编写并补全函数 \`detect_deadlock(allocated: list, request: list, available: list) -> list\`。
- 系统有 $N$ 个进程和 $M$ 类资源。
- \`allocated\` (list of lists): $N \\times M$ 矩阵，表示当前分配给各进程的资源数。
- \`request\` (list of lists): $N \\times M$ 矩阵，表示当前各进程还在申请的资源数。
- \`available\` (list): 长度为 $M$ 的一维向量，表示当前系统剩余可分配的各类资源量。
- 利用死锁检测规约算法（类似于银行家算法的检测版本），找出当前系统中**处于死锁状态的所有进程的 ID**。进程 ID 为 \`0\` 到 \`N-1\`。
- 返回一个包含死锁进程 ID 列表，如果无死锁，返回空列表 \`[]\`。`,
        starter: `def detect_deadlock(allocated: list, request: list, available: list) -> list:
    """
    判断系统当前是否发生死锁，并返回所有处于死锁状态的进程 ID 列表。
    """
    # TODO: 模拟资源规约过程，找出无法执行完成的进程集合
    pass
`,
        solution: `def detect_deadlock(allocated: list, request: list, available: list) -> list:
    n = len(allocated)
    m = len(available)
    
    work = list(available)
    finish = [False] * n
    
    # 如果进程没有任何资源分配，它不可能参与死锁，视作可直接运行完
    for i in range(n):
        if sum(allocated[i]) == 0:
            finish[i] = True
            
    # 循环寻找可以满足请求的进程
    changed = True
    while changed:
        changed = False
        for i in range(n):
            if not finish[i]:
                # 检查请求是否可以被当前 work 满足
                can_satisfy = True
                for j in range(m):
                    if request[i][j] > work[j]:
                        can_satisfy = False
                        break
                if can_satisfy:
                    # 归还资源
                    for j in range(m):
                        work[j] += allocated[i][j]
                    finish[i] = True
                    changed = True
                    
    # 所有仍未完成（finish 为 False）的进程就是处于死锁的进程
    return [i for i in range(n) if not finish[i]]
`,
        testCases: `import unittest
from starter import detect_deadlock

class TestDeadlock(unittest.TestCase):
    def test_no_deadlock(self):
        allocated = [[0, 1, 0], [2, 0, 0]]
        request = [[0, 0, 0], [1, 0, 1]]
        available = [1, 0, 1]
        self.assertEqual(detect_deadlock(allocated, request, available), [])

    def test_has_deadlock(self):
        allocated = [[0, 1, 0], [2, 0, 0]]
        request = [[0, 0, 1], [1, 0, 1]]
        available = [0, 0, 0]
        self.assertEqual(detect_deadlock(allocated, request, available), [0, 1])

if __name__ == '__main__':
    unittest.main()
`,
        quizzes: [
          {
            question: "死锁发生的四个必要条件不包括？",
            options: ["A. 抢占资源", "B. 互斥条件", "C. 环路等待"],
            answer: 0,
            explanation: "死锁的必要条件是不可剥夺（非抢占），而不是可以抢占。如果资源可以被强行剥夺，死锁就不会发生。"
          }
        ]
      }
    ]
  }
];

// 2. 依次生成目录和 5 类文件
function generate() {
  if (!fs.existsSync(outputBaseDir)) {
    fs.mkdirSync(outputBaseDir, { recursive: true });
  }

  for (const sub of curriculumData) {
    const subtopicDir = path.join(outputBaseDir, sub.folder);
    if (!fs.existsSync(subtopicDir)) {
      fs.mkdirSync(subtopicDir, { recursive: true });
    }

    for (const lvl of sub.levels) {
      const levelDir = path.join(subtopicDir, lvl.folderName);
      if (!fs.existsSync(levelDir)) {
        fs.mkdirSync(levelDir, { recursive: true });
      }

      // A. README.md
      fs.writeFileSync(path.join(levelDir, "README.md"), lvl.readme, "utf-8");

      // B. starter.py
      fs.writeFileSync(path.join(levelDir, "starter.py"), lvl.starter, "utf-8");

      // C. solution.py
      fs.writeFileSync(path.join(levelDir, "solution.py"), lvl.solution, "utf-8");

      // D. test_cases.py
      fs.writeFileSync(path.join(levelDir, "test_cases.py"), lvl.testCases, "utf-8");

      // E. quizzes.json
      fs.writeFileSync(path.join(levelDir, "quizzes.json"), JSON.stringify(lvl.quizzes, null, 2), "utf-8");

      // F. expected.txt
      fs.writeFileSync(path.join(levelDir, "expected.txt"), lvl.expected, "utf-8");

      console.log(`Generated folder and files for: ${sub.subtopic} -> ${lvl.title}`);
    }
  }

  console.log("\n🎉 Stage 1 前两个小节的具体物理文件及 expected.txt 已初始化生成完毕！");
}

generate();

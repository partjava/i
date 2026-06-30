'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookAlert, BookList,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: '动态分析技术',
  chapterNumber: 5,
  totalChapters: 10,
  subjectHref: '/study/security/reverse',
  prevChapter: { label: 'ELF文件分析', href: '/study/security/reverse/elf' },
  nextChapter: { label: '静态分析技术', href: '/study/security/reverse/static' },
  theme: THEMES.security,
}

const gdbCode = `# GDB基本调试命令
$ gdb ./program
(gdb) break main
(gdb) run
(gdb) next
(gdb) step
(gdb) print variable
(gdb) x/10x $esp
(gdb) backtrace
(gdb) info registers
(gdb) continue`

const straceCode = `# Strace系统调用跟踪
$ strace -f -e trace=open,read,write ./program

# Ltrace库函数跟踪
$ ltrace -f -e malloc+free+@libc.so.* ./program

# Valgrind内存检测
$ valgrind --leak-check=full ./program`

const pythonMem = `from ctypes import *
from pwn import *

def analyze_memory():
    p = process('./program')
    gdb.attach(p, '''break *main\\ncontinue''')
    leak = p.read(8)
    addr = u64(leak)
    print(f"Leaked address: {hex(addr)}")
    payload = p64(addr)
    p.write(payload)
    p.interactive()`

const SPREADS = [
  {
    label: '概述',
    left: (
      <div className="space-y-4">
        <PageTitle>动态分析概述</PageTitle>
        <BookParagraph>
          动态分析是在程序运行时对其行为进行分析的技术。通过观察程序的实际执行过程，可以获取程序的运行时特征、数据流向、API调用等信息。动态分析是逆向工程中不可或缺的重要手段。
        </BookParagraph>
        <SectionTitle>主要特点</SectionTitle>
        <BookList items={['实时性：观察程序实际运行状态，获取运行时数据', '交互性：可以控制程序执行，修改运行时数据，注入代码', '准确性：直接观察真实行为，获取实际数据，验证分析结果']} />
        <SectionTitle>应用场景</SectionTitle>
        <BookList items={['漏洞分析：定位漏洞触发点，分析成因，验证利用', '恶意代码分析：行为分析、网络通信、文件操作', '程序调试：定位错误，分析崩溃原因', 'API监控：系统调用跟踪，库函数调用分析']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>基本流程</SectionTitle>
        <BookList items={['环境准备：调试器配置、监控工具设置、虚拟机环境', '运行控制：断点设置、单步执行、条件中断', '数据分析：内存检查、寄存器分析、调用栈分析', '行为分析：API调用序列、数据流向、控制流程']} />
      </div>
    ),
  },
  {
    label: '调试工具',
    left: (
      <div className="space-y-4">
        <PageTitle>调试工具</PageTitle>
        <SectionTitle>GDB</SectionTitle>
        <BookList items={['基本功能：断点管理、单步执行、变量查看、内存检查', '高级特性：条件断点、反向调试、Python脚本、远程调试']} />
        <SectionTitle>LLDB</SectionTitle>
        <BookList items={['LLVM项目调试器，支持多平台', '提供Python脚本接口，支持远程调试']} />
        <BookCode language="bash" code={gdbCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>动态分析工具</SectionTitle>
        <BookList items={['Strace：系统调用跟踪，信号处理，进程跟踪', 'Ltrace：库函数跟踪，参数和返回值分析', 'Valgrind：内存检查、内存泄漏、线程错误、性能分析']} />
        <SectionTitle>进程监控工具</SectionTitle>
        <BookList items={['Process Monitor：文件操作、注册表、网络、进程线程', 'API Monitor：API调用跟踪、参数监控、调用栈跟踪']} />
        <BookCode language="bash" code={straceCode} />
      </div>
    ),
  },
  {
    label: '分析技术',
    left: (
      <div className="space-y-4">
        <PageTitle>分析技术</PageTitle>
        <SectionTitle>断点技术</SectionTitle>
        <BookList items={['软件断点：INT 3指令，代码修改，临时断点', '硬件断点：调试寄存器，内存访问，条件触发', '条件断点：表达式判断，计数器，数据监控']} />
        <SectionTitle>单步执行</SectionTitle>
        <BookList items={['指令级单步', '过程级单步', '源码级单步', '条件执行']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>内存分析技术</SectionTitle>
        <BookList items={['内存查看：布局分析、数据结构、字符串搜索', '内存修改：数据修改、代码修改、内存补丁、代码注入']} />
        <SectionTitle>API监控技术</SectionTitle>
        <BookList items={['API Hook：IAT Hook、Inline Hook、远程注入', '系统调用Hook：SSDT Hook、Syscall Hook、驱动层Hook']} />
      </div>
    ),
  },
  {
    label: '实践案例',
    left: (
      <div className="space-y-4">
        <PageTitle>基本调试实践</PageTitle>
        <BookCode language="bash" code={`# GDB分析缓冲区溢出
$ gdb ./vulnerable_program
(gdb) run $(python -c 'print "A"*100')
(gdb) x/32x $esp
(gdb) info frame`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>内存分析实践</PageTitle>
        <BookCode language="python" code={pythonMem} />
        <BookAlert type="info" message="Valgrind检测：valgrind --leak-check=full ./program。Strace跟踪：strace -f -e trace=open,read,write ./program。" />
      </div>
    ),
  },
]

export default function DynamicAnalysisPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

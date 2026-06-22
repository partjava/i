'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookAlert, BookList,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: 'ELF文件分析',
  chapterNumber: 4,
  totalChapters: 10,
  subjectHref: '/study/security/reverse',
  prevChapter: { label: 'PE文件分析', href: '/study/security/reverse/pe' },
  nextChapter: { label: '动态分析技术', href: '/study/security/reverse/dynamic' },
  theme: THEMES.security,
}

const readelfP = `# 使用readelf查看程序头表
$ readelf -l /bin/ls

Elf file type is DYN (Shared object file)
Entry point 0x5850

Program Headers:
  Type     Offset           VirtAddr           Flags  Align
  PHDR     0x40             0x40               R      0x8
  INTERP   0x238            0x238              R      0x1
  LOAD     0x0              0x0                R E    0x200000
  LOAD     0x1e4b0          0x21e4b0           RW     0x200000
  DYNAMIC  0x1e4e0          0x21e4e0           RW     0x8
  NOTE     0x254            0x254              R      0x4
  GNU_STACK 0x0             0x0                RW     0x10`

const pythonElf = `import elftools.elf.elffile as elffile

def analyze_elf_file(file_path):
    with open(file_path, 'rb') as f:
        elf = elffile.ELFFile(f)

        print("ELF文件头信息:")
        print(f"文件类型: {elf.header['e_type']}")
        print(f"机器类型: {elf.header['e_machine']}")
        print(f"入口点: {hex(elf.header['e_entry'])}")

        print("\\n节表信息:")
        for section in elf.iter_sections():
            print(f"节名: {section.name}")
            print(f"类型: {section['sh_type']}")
            print(f"地址: {hex(section['sh_addr'])}")
            print(f"大小: {section['sh_size']}")

        print("\\n符号表信息:")
        symtab = elf.get_section_by_name('.symtab')
        if symtab:
            for symbol in symtab.iter_symbols():
                print(f"符号名: {symbol.name}, 类型: {symbol['st_info']['type']}, 值: {hex(symbol['st_value'])}")

analyze_elf_file("example")`

const pythonDynamic = `import elftools.elf.dynamic as dynamic
from elftools.elf.elffile import ELFFile

def analyze_dynamic_info(file_path):
    with open(file_path, 'rb') as f:
        elf = ELFFile(f)
        dynamic = elf.get_section_by_name('.dynamic')
        if dynamic:
            print("动态链接信息:")
            for tag in dynamic.iter_tags():
                if tag.entry.d_tag == 'DT_NEEDED':
                    print(f"依赖库: {tag.needed}")

        plt = elf.get_section_by_name('.plt')
        got = elf.get_section_by_name('.got')
        if plt and got:
            print(f"\\nPLT地址: {hex(plt['sh_addr'])}")
            print(f"GOT地址: {hex(got['sh_addr'])}")`

const SPREADS = [
  {
    label: '概述',
    left: (
      <div className="space-y-4">
        <PageTitle>ELF文件概述</PageTitle>
        <BookParagraph>
          ELF（Executable and Linkable Format）是Linux和其他类Unix系统下的可执行文件、目标代码、共享库和核心转储的标准文件格式。理解ELF文件结构对于逆向工程、安全分析和软件开发都至关重要。
        </BookParagraph>
        <SectionTitle>ELF文件类型</SectionTitle>
        <BookList items={['ET_REL (1): 可重定位文件，如.o文件', 'ET_EXEC (2): 可执行文件，如/bin/ls', 'ET_DYN (3): 共享目标文件，如.so文件', 'ET_CORE (4): 核心转储文件']} />
        <SectionTitle>ELF文件特点</SectionTitle>
        <BookList items={['跨平台兼容：支持x86、x86-64、ARM、MIPS等架构', '动态链接：支持共享库运行时加载', '可重定位：支持PIC地址无关代码', '符号表：包含丰富的调试和符号信息', '节表：灵活的数据组织方式']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>ELF文件应用场景</SectionTitle>
        <BookList items={['程序分析：函数调用关系、控制流、数据流分析', '漏洞挖掘：缓冲区溢出、格式化字符串、整数溢出', '恶意软件分析：行为分析、特征提取、家族分类', '软件保护：代码混淆、反调试、完整性校验', '性能优化：内存使用、函数调用开销分析']} />
        <SectionTitle>ELF文件标识</SectionTitle>
        <BookCode language="bash" code={`$ hexdump -C -n 16 /bin/ls
00000000  7f 45 4c 46 02 01 01 00  ...|.ELF....|
# 7f 45 4c 46: ELF魔数  02: 64位  01: 小端序`} />
      </div>
    ),
  },
  {
    label: '文件结构',
    left: (
      <div className="space-y-4">
        <PageTitle>ELF文件结构详解</PageTitle>
        <SectionTitle>文件头结构（Elf64_Ehdr）</SectionTitle>
        <BookCode language="cpp" code={`typedef struct {
    unsigned char e_ident[16];    // ELF标识
    uint16_t e_type;             // 文件类型
    uint16_t e_machine;          // 机器类型
    uint32_t e_version;          // 版本
    uint64_t e_entry;            // 入口点
    uint64_t e_phoff;            // 程序头表偏移
    uint64_t e_shoff;            // 节头表偏移
    uint32_t e_flags;            // 标志
    uint16_t e_ehsize;           // ELF头大小
    uint16_t e_phentsize;        // 程序头表项大小
    uint16_t e_phnum;            // 程序头表项数量
    uint16_t e_shentsize;        // 节头表项大小
    uint16_t e_shnum;            // 节头表项数量
    uint16_t e_shstrndx;         // 节名字符串表索引
} Elf64_Ehdr;`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>节头表与程序头表</SectionTitle>
        <BookCode language="cpp" code={`// 节头表 (Section Header)
typedef struct {
    uint32_t sh_name;            // 节名索引
    uint32_t sh_type;            // 节类型
    uint64_t sh_flags;           // 节标志
    uint64_t sh_addr;            // 虚拟地址
    uint64_t sh_offset;          // 文件偏移
    uint64_t sh_size;            // 节大小
    uint32_t sh_link;            // 链接索引
    uint32_t sh_info;            // 附加信息
    uint64_t sh_addralign;       // 对齐要求
    uint64_t sh_entsize;         // 表项大小
} Elf64_Shdr;

// 程序头表 (Program Header)
typedef struct {
    uint32_t p_type;             // 段类型
    uint32_t p_flags;            // 段标志
    uint64_t p_offset;           // 文件偏移
    uint64_t p_vaddr;            // 虚拟地址
    uint64_t p_paddr;            // 物理地址
    uint64_t p_filesz;           // 文件大小
    uint64_t p_memsz;            // 内存大小
    uint64_t p_align;            // 对齐要求
} Elf64_Phdr;`} />
      </div>
    ),
  },
  {
    label: '分析工具',
    left: (
      <div className="space-y-4">
        <PageTitle>ELF文件分析工具</PageTitle>
        <SectionTitle>标准工具</SectionTitle>
        <BookList items={['readelf：Linux自带，查看头信息、节表、程序头表', 'objdump：GNU Binutils，反汇编、查看符号表', 'nm：查看符号表', 'ldd：查看动态链接库依赖']} />
        <SectionTitle>反汇编工具</SectionTitle>
        <BookList items={['IDA Pro：支持ELF结构分析、图形界面', 'Ghidra：NSA开源，支持反编译']} />
        <SectionTitle>调试器</SectionTitle>
        <BookList items={['GDB：GNU调试器，支持源码级调试', 'LLDB：LLVM调试器，Python脚本接口']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>实际例题：分析文件段信息</SectionTitle>
        <BookCode language="bash" code={readelfP} />
        <SectionTitle>分析符号表</SectionTitle>
        <BookCode language="bash" code={`$ nm -D /bin/ls | head -20
0000000000000000 A _IO_stdin_used
                 U __libc_start_main
                 U abort
                 U calloc
                 U printf
                 U malloc
                 U free
                 U strlen
                 U strcmp`} />
      </div>
    ),
  },
  {
    label: '实践案例',
    left: (
      <div className="space-y-4">
        <PageTitle>基本ELF文件分析</PageTitle>
        <BookCode language="python" code={pythonElf} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>动态链接分析</PageTitle>
        <BookCode language="python" code={pythonDynamic} />
        <BookAlert type="info" message="动态链接器（ld.so）通过PLT（过程链接表）和GOT（全局偏移表）实现延迟绑定。PLT用于函数调用跳转，GOT存储外部符号地址。" />
      </div>
    ),
  },
]

export default function ELFAnalysisPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

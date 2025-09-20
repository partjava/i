"use client";
import { useState } from "react";
import Link from "next/link";

export default function ELFAnalysisPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">ELF文件分析</h1>
      
      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "overview"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          概述
        </button>
        <button
          onClick={() => setActiveTab("structure")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "structure"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          文件结构
        </button>
        <button
          onClick={() => setActiveTab("tools")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "tools"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          分析工具
        </button>
        <button
          onClick={() => setActiveTab("practice")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "practice"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          实践案例
        </button>
      </div>

      {/* 内容区域 */}
      <div className="space-y-6">
        {activeTab === "overview" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">ELF文件概述</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 什么是ELF文件</h4>
              <p className="mb-4">
                ELF（Executable and Linkable Format）是Linux和其他类Unix系统下的可执行文件、目标代码、共享库和核心转储的标准文件格式。ELF文件包含了程序运行所需的所有信息，如代码、数据、符号表、重定位信息等。理解ELF文件结构对于逆向工程、安全分析和软件开发都至关重要。
              </p>

              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">ELF文件类型</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>ET_REL (1): 可重定位文件，如.o文件</li>
                  <li>ET_EXEC (2): 可执行文件，如/bin/ls</li>
                  <li>ET_DYN (3): 共享目标文件，如.so文件</li>
                  <li>ET_CORE (4): 核心转储文件</li>
                </ul>

                <h5 className="font-semibold mb-2">ELF文件标识</h5>
                <pre className="bg-gray-200 p-2 rounded mb-4">
                  <code>{`e_ident[0-3]: 魔数 (0x7F, 'E', 'L', 'F')
e_ident[4]: 文件类 (1=32位, 2=64位)
e_ident[5]: 数据编码 (1=小端, 2=大端)
e_ident[6]: ELF版本 (1=当前版本)
e_ident[7-15]: 保留字节`}</code>
                </pre>

                <h5 className="font-semibold mb-2">实际例题：识别ELF文件</h5>
                <pre className="bg-gray-200 p-2 rounded mb-4">
                  <code>{`# 使用hexdump查看ELF文件头
$ hexdump -C -n 16 /bin/ls
00000000  7f 45 4c 46 02 01 01 00  00 00 00 00 00 00 00 00  |.ELF............|

# 分析结果：
# 7f 45 4c 46: ELF魔数
# 02: 64位文件
# 01: 小端序
# 01: ELF版本1`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">2. ELF文件的特点</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ul className="list-disc pl-6 mb-4">
                  <li>跨平台兼容：支持多种CPU架构和操作系统
                    <ul className="list-disc pl-6 mt-2">
                      <li>x86, x86-64, ARM, MIPS等架构</li>
                      <li>Linux, FreeBSD, Android等系统</li>
                    </ul>
                  </li>
                  <li>动态链接：支持动态链接库（.so文件）
                    <ul className="list-disc pl-6 mt-2">
                      <li>运行时加载共享库</li>
                      <li>支持符号版本控制</li>
                      <li>支持延迟绑定</li>
                    </ul>
                  </li>
                  <li>可重定位：支持代码和数据在不同内存地址加载
                    <ul className="list-disc pl-6 mt-2">
                      <li>支持地址无关代码（PIC）</li>
                      <li>支持基址重定位</li>
                      <li>支持符号重定位</li>
                    </ul>
                  </li>
                  <li>符号表：包含丰富的调试和符号信息
                    <ul className="list-disc pl-6 mt-2">
                      <li>全局符号和局部符号</li>
                      <li>弱符号和强符号</li>
                      <li>调试符号信息</li>
                    </ul>
                  </li>
                  <li>节表：灵活的数据组织方式
                    <ul className="list-disc pl-6 mt-2">
                      <li>代码段和数据段分离</li>
                      <li>支持自定义节</li>
                      <li>支持节对齐和权限控制</li>
                    </ul>
                  </li>
                  <li>程序头表：描述段（Segment）信息
                    <ul className="list-disc pl-6 mt-2">
                      <li>可加载段</li>
                      <li>动态链接信息</li>
                      <li>程序解释器</li>
                    </ul>
                  </li>
                </ul>

                <h5 className="font-semibold mb-2">实际例题：查看ELF文件段信息</h5>
                <pre className="bg-gray-200 p-2 rounded mb-4">
                  <code>{`# 使用readelf查看程序头表
$ readelf -l /bin/ls

Elf file type is DYN (Shared object file)
Entry point 0x5850
There are 9 program headers, starting at offset 64

Program Headers:
  Type           Offset             VirtAddr           PhysAddr
                 FileSiz            MemSiz              Flags  Align
  PHDR           0x0000000000000040 0x0000000000000040 0x0000000000000040
                 0x00000000000001f8 0x00000000000001f8  R      0x8
  INTERP         0x0000000000000238 0x0000000000000238 0x0000000000000238
                 0x000000000000001c 0x000000000000001c  R      0x1
      [Requesting program interpreter: /lib64/ld-linux-x86-64.so.2]
  LOAD           0x0000000000000000 0x0000000000000000 0x0000000000000000
                 0x000000000001e4a8 0x000000000001e4a8  R E    0x200000
  LOAD           0x000000000001e4b0 0x000000000021e4b0 0x000000000021e4b0
                 0x00000000000013b8 0x00000000000013b8  RW     0x200000
  DYNAMIC        0x000000000001e4e0 0x000000000021e4e0 0x000000000021e4e0
                 0x00000000000001f0 0x00000000000001f0  RW     0x8
  NOTE           0x0000000000000254 0x0000000000000254 0x0000000000000254
                 0x0000000000000044 0x0000000000000044  R      0x4
  GNU_EH_FRAME   0x000000000001b6a0 0x000000000001b6a0 0x000000000001b6a0
                 0x0000000000000844 0x0000000000000844  R      0x4
  GNU_STACK      0x0000000000000000 0x0000000000000000 0x0000000000000000
                 0x0000000000000000 0x0000000000000000  RW     0x10
  GNU_RELRO      0x000000000001e4b0 0x000000000021e4b0 0x000000000021e4b0
                 0x0000000000001350 0x0000000000001350  R      0x1`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">3. ELF文件的应用场景</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ul className="list-disc pl-6 mb-4">
                  <li>程序分析：分析程序的结构和行为
                    <ul className="list-disc pl-6 mt-2">
                      <li>函数调用关系分析</li>
                      <li>控制流分析</li>
                      <li>数据流分析</li>
                    </ul>
                  </li>
                  <li>漏洞挖掘：发现程序中的安全漏洞
                    <ul className="list-disc pl-6 mt-2">
                      <li>缓冲区溢出检测</li>
                      <li>格式化字符串漏洞</li>
                      <li>整数溢出检测</li>
                    </ul>
                  </li>
                  <li>恶意软件分析：分析病毒、木马等恶意程序
                    <ul className="list-disc pl-6 mt-2">
                      <li>行为分析</li>
                      <li>特征提取</li>
                      <li>家族分类</li>
                    </ul>
                  </li>
                  <li>软件保护：实现软件加密和保护机制
                    <ul className="list-disc pl-6 mt-2">
                      <li>代码混淆</li>
                      <li>反调试技术</li>
                      <li>完整性校验</li>
                    </ul>
                  </li>
                  <li>性能优化：分析程序的资源使用和性能特征
                    <ul className="list-disc pl-6 mt-2">
                      <li>内存使用分析</li>
                      <li>函数调用开销</li>
                      <li>热点代码识别</li>
                    </ul>
                  </li>
                  <li>兼容性研究：分析不同版本程序之间的差异
                    <ul className="list-disc pl-6 mt-2">
                      <li>ABI兼容性</li>
                      <li>API变化分析</li>
                      <li>版本迁移</li>
                    </ul>
                  </li>
                </ul>

                <h5 className="font-semibold mb-2">实际例题：分析ELF文件符号表</h5>
                <pre className="bg-gray-200 p-2 rounded mb-4">
                  <code>{`# 使用nm查看符号表
$ nm -D /bin/ls

0000000000000000 A _IO_stdin_used
                 w __cxa_finalize
                 w __gmon_start__
                 w _ITM_deregisterTMCloneTable
                 w _ITM_registerTMCloneTable
                 U __libc_start_main
                 U __stack_chk_fail
                 U abort
                 U acl_extended_file
                 U acl_get_entry
                 U acl_get_tag_type
                 U acl_to_text
                 U bindtextdomain
                 U calloc
                 U clock_gettime
                 U closedir
                 U dcgettext
                 U dirfd
                 U dprintf
                 U endgrent
                 U endpwent
                 U error
                 U exit
                 U fchdir
                 U fchownat
                 U fclose
                 U fcntl
                 U fflush
                 U fgetfilecon
                 U fgetxattr
                 U fnmatch
                 U fopen
                 U fprintftime
                 U fprintf
                 U fputs
                 U freadlinkat
                 U free
                 U fstatat
                 U fts_children
                 U fts_close
                 U fts_open
                 U fts_read
                 U fts_set
                 U getenv
                 U getgrgid
                 U getgrnam
                 U getopt_long
                 U getpwnam
                 U getpwuid
                 U getxattr
                 U hash_get_n_entries
                 U hash_get_n_buckets
                 U hash_get_max_bucket_length
                 U hash_string
                 U iconv_open
                 U iswprint
                 U lchown
                 U lgetfilecon
                 U linkat
                 U llistxattr
                 U localeconv
                 U localtime
                 U lstat
                 U malloc
                 U mbrtowc
                 U mbsinit
                 U mbsrtowcs
                 U memcmp
                 U memcpy
                 U mempcpy
                 U memset
                 U mknodat
                 U mktime
                 U mmap
                 U mprotect
                 U mremap
                 U newlocale
                 U nl_langinfo
                 U openat
                 U opendir
                 U parse_gnu_standard_options_only
                 U posix_fadvise
                 U posix_openpt
                 U pread
                 U printf
                 U putchar
                 U puts
                 U qsort
                 U raise
                 U readdir
                 U readlink
                 U readlinkat
                 U realloc
                 U regcomp
                 U regexec
                 U regfree
                 U removexattr
                 U renameat
                 U rmdir
                 U setenv
                 U setlocale
                 U setvbuf
                 U sigaction
                 U siginterrupt
                 U stat
                 U strcasecmp
                 U strchr
                 U strcmp
                 U strcoll
                 U strcpy
                 U strcspn
                 U strdup
                 U strerror
                 U strftime
                 U strlen
                 U strncasecmp
                 U strncmp
                 U strncpy
                 U strndup
                 U strnlen
                 U strpbrk
                 U strrchr
                 U strspn
                 U strstr
                 U strtod
                 U strtol
                 U strtoul
                 U strverscmp
                 U symlinkat
                 U sysconf
                 U time
                 U tzset
                 U uname
                 U unlinkat
                 U unsetenv
                 U utime
                 U utimensat
                 U vfprintf
                 U vprintf
                 U wcrtomb
                 U wcscoll
                 U wcslen
                 U wcsnrtombs
                 U wcsrtombs
                 U wcstombs
                 U wctob
                 U wctomb
                 U wcwidth
                 U write`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">4. ELF文件分析的基本概念</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">文件头</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>魔数：标识ELF文件格式
                    <ul className="list-disc pl-6 mt-2">
                      <li>固定值：0x7F 0x45 0x4C 0x46</li>
                      <li>用于快速识别文件类型</li>
                    </ul>
                  </li>
                  <li>文件类型：可执行文件、可重定位文件、共享目标文件等
                    <ul className="list-disc pl-6 mt-2">
                      <li>ET_REL (1): 可重定位文件</li>
                      <li>ET_EXEC (2): 可执行文件</li>
                      <li>ET_DYN (3): 共享目标文件</li>
                      <li>ET_CORE (4): 核心转储文件</li>
                    </ul>
                  </li>
                  <li>机器类型：支持的CPU架构
                    <ul className="list-disc pl-6 mt-2">
                      <li>EM_386 (3): Intel 80386</li>
                      <li>EM_X86_64 (62): AMD x86-64</li>
                      <li>EM_ARM (40): ARM</li>
                      <li>EM_MIPS (8): MIPS</li>
                    </ul>
                  </li>
                  <li>入口点：程序执行的起始地址
                    <ul className="list-disc pl-6 mt-2">
                      <li>可执行文件的代码入口</li>
                      <li>相对于基址的偏移</li>
                    </ul>
                  </li>
                </ul>

                <h5 className="font-semibold mb-2">节表</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>.text：代码段
                    <ul className="list-disc pl-6 mt-2">
                      <li>包含可执行代码</li>
                      <li>只读属性</li>
                      <li>可执行属性</li>
                    </ul>
                  </li>
                  <li>.data：已初始化数据段
                    <ul className="list-disc pl-6 mt-2">
                      <li>包含已初始化的全局变量</li>
                      <li>读写属性</li>
                    </ul>
                  </li>
                  <li>.bss：未初始化数据段
                    <ul className="list-disc pl-6 mt-2">
                      <li>包含未初始化的全局变量</li>
                      <li>读写属性</li>
                      <li>不占用文件空间</li>
                    </ul>
                  </li>
                  <li>.rodata：只读数据段
                    <ul className="list-disc pl-6 mt-2">
                      <li>包含常量数据</li>
                      <li>只读属性</li>
                    </ul>
                  </li>
                  <li>.symtab：符号表
                    <ul className="list-disc pl-6 mt-2">
                      <li>包含所有符号信息</li>
                      <li>用于链接和调试</li>
                    </ul>
                  </li>
                  <li>.strtab：字符串表
                    <ul className="list-disc pl-6 mt-2">
                      <li>存储符号名称</li>
                      <li>存储节名称</li>
                    </ul>
                  </li>
                  <li>.rel：重定位表
                    <ul className="list-disc pl-6 mt-2">
                      <li>包含重定位信息</li>
                      <li>用于动态链接</li>
                    </ul>
                  </li>
                </ul>

                <h5 className="font-semibold mb-2">程序头表</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>LOAD：可加载段
                    <ul className="list-disc pl-6 mt-2">
                      <li>包含代码和数据</li>
                      <li>指定内存权限</li>
                      <li>指定文件偏移</li>
                    </ul>
                  </li>
                  <li>DYNAMIC：动态链接信息
                    <ul className="list-disc pl-6 mt-2">
                      <li>包含动态链接库列表</li>
                      <li>包含重定位信息</li>
                      <li>包含符号表信息</li>
                    </ul>
                  </li>
                  <li>INTERP：程序解释器
                    <ul className="list-disc pl-6 mt-2">
                      <li>指定动态链接器路径</li>
                      <li>用于加载共享库</li>
                    </ul>
                  </li>
                  <li>NOTE：注释信息
                    <ul className="list-disc pl-6 mt-2">
                      <li>包含版本信息</li>
                      <li>包含ABI信息</li>
                    </ul>
                  </li>
                </ul>

                <h5 className="font-semibold mb-2">实际例题：分析ELF文件节表</h5>
                <pre className="bg-gray-200 p-2 rounded mb-4">
                  <code>{`# 使用readelf查看节表
$ readelf -S /bin/ls

There are 31 section headers, starting at offset 0x1b168:

Section Headers:
  [Nr] Name              Type             Address           Offset
       Size              EntSize          Flags  Link  Info  Align
  [ 0]                   NULL             0000000000000000  00000000
       0000000000000000  0000000000000000           0     0     0
  [ 1] .interp           PROGBITS         0000000000000238  00000238
       000000000000001c  0000000000000000   A       0     0     1
  [ 2] .note.ABI-tag     NOTE             0000000000000254  00000254
       0000000000000020  0000000000000000   A       0     0     4
  [ 3] .note.gnu.build-id NOTE             0000000000000274  00000274
       0000000000000024  0000000000000000   A       0     0     4
  [ 4] .gnu.hash         GNU_HASH         0000000000000298  00000298
       00000000000000a4  0000000000000000   A       5     0     8
  [ 5] .dynsym           DYNSYM           0000000000000340  00000340
       0000000000000c48  0000000000000018   A       6     1     8
  [ 6] .dynstr           STRTAB           0000000000000f88  00000f88
       00000000000005c2  0000000000000000   A       0     0     1
  [ 7] .gnu.version      VERSYM           000000000000154a  0000154a
       0000000000000108  0000000000000002   A       5     0     2
  [ 8] .gnu.version_r    VERNEED          0000000000001658  00001658
       00000000000000f0  0000000000000000   A       6     2     8
  [ 9] .rela.dyn         RELA             0000000000001748  00001748
       0000000000000c18  0000000000000018   A       5     0     8
  [10] .rela.plt         RELA             0000000000002360  00002360
       0000000000000a08  0000000000000018  AI       5    24     8
  [11] .init             PROGBITS         0000000000003000  00003000
       0000000000000017  0000000000000000  AX       0     0     4
  [12] .plt              PROGBITS         0000000000003020  00003020
       00000000000006b0  0000000000000010  AX       0     0     16
  [13] .plt.got          PROGBITS         00000000000036d0  000036d0
       0000000000000008  0000000000000008  AX       0     0     8
  [14] .text             PROGBITS         00000000000036e0  000036e0
       0000000000017f2a  0000000000000000  AX       0     0     16
  [15] .fini             PROGBITS         000000000001b60c  0001b60c
       0000000000000009  0000000000000000  AX       0     0     4
  [16] .rodata           PROGBITS         000000000001b620  0001b620
       0000000000003f20  0000000000000000   A       0     0     32
  [17] .eh_frame_hdr     PROGBITS         000000000001f540  0001f540
       0000000000000844  0000000000000000   A       0     0     4
  [18] .eh_frame         PROGBITS         000000000001fd88  0001fd88
       0000000000002c24  0000000000000000   A       0     0     8
  [19] .init_array       INIT_ARRAY       00000000000229b0  000229b0
       0000000000000008  0000000000000008  WA       0     0     8
  [20] .fini_array       FINI_ARRAY       00000000000229b8  000229b8
       0000000000000008  0000000000000008  WA       0     0     8
  [21] .data.rel.ro      PROGBITS         00000000000229c0  000229c0
       0000000000000b20  0000000000000000  WA       0     0     32
  [22] .dynamic          DYNAMIC          00000000000234e0  000234e0
       00000000000001f0  0000000000000010  WA       6     0     8
  [23] .got              PROGBITS         00000000000236d0  000236d0
       0000000000000330  0000000000000008  WA       0     0     8
  [24] .data             PROGBITS         0000000000023a00  00023a00
       0000000000000a60  0000000000000000  WA       0     0     32
  [25] .bss              NOBITS           0000000000024460  00024460
       0000000000001a68  0000000000000000  WA       0     0     32
  [26] .comment          PROGBITS         0000000000000000  00024460
       0000000000000029  0000000000000001  MS       0     0     1
  [27] .symtab           SYMTAB           0000000000000000  00024490
       0000000000000c48  0000000000000018          28    47     8
  [28] .strtab           STRTAB           0000000000000000  000250d8
       00000000000004c2  0000000000000000           0     0     1
  [29] .shstrtab         STRTAB           0000000000000000  0002559a
       0000000000000109  0000000000000000           0     0     1
  [30] .gnu_debuglink    PROGBITS         0000000000000000  000256a4
       0000000000000034  0000000000000000           0     0     4`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === "structure" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">ELF文件结构详解</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. ELF文件头结构</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`typedef struct {
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
} Elf64_Ehdr;`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">2. 节头表结构</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`typedef struct {
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
} Elf64_Shdr;`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">3. 程序头表结构</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`typedef struct {
    uint32_t p_type;             // 段类型
    uint32_t p_flags;            // 段标志
    uint64_t p_offset;           // 文件偏移
    uint64_t p_vaddr;            // 虚拟地址
    uint64_t p_paddr;            // 物理地址
    uint64_t p_filesz;           // 文件大小
    uint64_t p_memsz;            // 内存大小
    uint64_t p_align;            // 对齐要求
} Elf64_Phdr;`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">4. 符号表结构</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`typedef struct {
    uint32_t st_name;            // 符号名索引
    unsigned char st_info;       // 符号类型和绑定信息
    unsigned char st_other;      // 保留
    uint16_t st_shndx;           // 节索引
    uint64_t st_value;           // 符号值
    uint64_t st_size;            // 符号大小
} Elf64_Sym;`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === "tools" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">ELF文件分析工具</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 反汇编工具</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">IDA Pro</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>功能最强大的交互式反汇编器</li>
                  <li>支持ELF文件结构分析</li>
                  <li>提供图形化界面和脚本扩展</li>
                  <li>具有强大的分析功能和插件系统</li>
                  <li>支持反编译和调试功能</li>
                </ul>

                <h5 className="font-semibold mb-2">Ghidra</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>NSA开发的开源软件逆向工具</li>
                  <li>支持ELF文件分析</li>
                  <li>提供反编译和调试功能</li>
                  <li>具有协作功能和脚本扩展</li>
                  <li>支持插件开发</li>
                </ul>
              </div>

              <h4 className="font-semibold">2. ELF文件分析工具</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">readelf</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>Linux系统自带工具</li>
                  <li>查看ELF文件头信息</li>
                  <li>分析节表和程序头表</li>
                  <li>查看符号表和重定位信息</li>
                  <li>支持动态链接信息分析</li>
                </ul>

                <h5 className="font-semibold mb-2">objdump</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>GNU Binutils工具集</li>
                  <li>反汇编代码段</li>
                  <li>查看节表信息</li>
                  <li>分析符号表</li>
                  <li>支持多种输出格式</li>
                </ul>
              </div>

              <h4 className="font-semibold">3. 调试工具</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">GDB</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>GNU调试器</li>
                  <li>支持源码级调试</li>
                  <li>提供反汇编功能</li>
                  <li>支持断点和监视点</li>
                  <li>支持脚本扩展</li>
                </ul>

                <h5 className="font-semibold mb-2">LLDB</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>LLVM项目调试器</li>
                  <li>支持多平台调试</li>
                  <li>提供Python脚本接口</li>
                  <li>支持远程调试</li>
                  <li>界面友好，功能强大</li>
                </ul>
              </div>

              <h4 className="font-semibold">4. 其他实用工具</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">nm</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>查看符号表</li>
                  <li>分析函数和变量</li>
                  <li>支持多种输出格式</li>
                  <li>适合符号分析</li>
                </ul>

                <h5 className="font-semibold mb-2">ldd</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>查看动态链接库依赖</li>
                  <li>分析共享库关系</li>
                  <li>检查库版本</li>
                  <li>适合依赖分析</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "practice" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">实践案例</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 基本ELF文件分析</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 使用Python分析ELF文件结构
import elftools.elf.elffile as elffile
import elftools.elf.sections as sections

def analyze_elf_file(file_path):
    try:
        # 打开ELF文件
        with open(file_path, 'rb') as f:
            elf = elffile.ELFFile(f)
            
            # 分析文件头
            print("ELF文件头信息:")
            print(f"文件类型: {elf.header['e_type']}")
            print(f"机器类型: {elf.header['e_machine']}")
            print(f"入口点: {hex(elf.header['e_entry'])}")
            
            # 分析节表
            print("\n节表信息:")
            for section in elf.iter_sections():
                print(f"节名: {section.name}")
                print(f"类型: {section['sh_type']}")
                print(f"地址: {hex(section['sh_addr'])}")
                print(f"大小: {section['sh_size']}")
                print("---")
            
            # 分析符号表
            print("\n符号表信息:")
            symtab = elf.get_section_by_name('.symtab')
            if symtab:
                for symbol in symtab.iter_symbols():
                    print(f"符号名: {symbol.name}")
                    print(f"类型: {symbol['st_info']['type']}")
                    print(f"绑定: {symbol['st_info']['bind']}")
                    print(f"值: {hex(symbol['st_value'])}")
                    print("---")
                    
    except Exception as e:
        print(f"分析出错: {str(e)}")

# 使用示例
analyze_elf_file("example")`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">2. 动态链接分析</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">动态链接机制</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>动态链接器
                    <ul className="list-disc pl-6 mt-2">
                      <li>ld.so：Linux动态链接器</li>
                      <li>加载共享库</li>
                      <li>符号解析</li>
                      <li>重定位处理</li>
                    </ul>
                  </li>
                  <li>PLT（Procedure Linkage Table）
                    <ul className="list-disc pl-6 mt-2">
                      <li>延迟绑定机制</li>
                      <li>函数调用跳转表</li>
                      <li>首次调用解析</li>
                    </ul>
                  </li>
                  <li>GOT（Global Offset Table）
                    <ul className="list-disc pl-6 mt-2">
                      <li>全局偏移表</li>
                      <li>存储外部符号地址</li>
                      <li>支持地址无关代码</li>
                    </ul>
                  </li>
                </ul>

                <h5 className="font-semibold mb-2">实际例题：分析动态链接信息</h5>
                <pre className="bg-gray-200 p-2 rounded mb-4">
                  <code>{`# 使用readelf查看动态段信息
$ readelf -d /bin/ls

Dynamic section at offset 0x234e0 contains 24 entries:
  Tag        Type                         Name/Value
 0x0000000000000001 (NEEDED)             Shared library: [libselinux.so.1]
 0x0000000000000001 (NEEDED)             Shared library: [libacl.so.1]
 0x0000000000000001 (NEEDED)             Shared library: [libc.so.6]
 0x000000000000000c (INIT)               0x3000
 0x000000000000000d (FINI)               0x1b60c
 0x0000000000000019 (INIT_ARRAY)         0x229b0
 0x000000000000001b (INIT_ARRAYSZ)       8 (bytes)
 0x000000000000001a (FINI_ARRAY)         0x229b8
 0x000000000000001c (FINI_ARRAYSZ)       8 (bytes)
 0x000000006ffffef5 (GNU_HASH)           0x298
 0x0000000000000005 (STRTAB)             0xf88
 0x0000000000000006 (SYMTAB)             0x340
 0x000000000000000a (STRSZ)              1474 (bytes)
 0x000000000000000b (SYMENT)             24 (bytes)
 0x0000000000000015 (DEBUG)              0x0
 0x0000000000000003 (PLTGOT)             0x236d0
 0x0000000000000002 (PLTRELSZ)           2568 (bytes)
 0x0000000000000014 (PLTREL)             RELA
 0x0000000000000017 (JMPREL)             0x2360
 0x0000000000000007 (RELA)               0x1748
 0x0000000000000008 (RELASZ)             3096 (bytes)
 0x0000000000000009 (RELAENT)            24 (bytes)
 0x000000006ffffffe (VERNEED)            0x1658
 0x000000006fffffff (VERNEEDNUM)         1

# 使用ldd查看动态链接库依赖
$ ldd /bin/ls
        linux-vdso.so.1 (0x00007ffd4f5f1000)
        libselinux.so.1 => /lib/x86_64-linux-gnu/libselinux.so.1 (0x00007f7c7c5f2000)
        libacl.so.1 => /lib/x86_64-linux-gnu/libacl.so.1 (0x00007f7c7c3e8000)
        libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f7c7bff6000)
        libpcre2-8.so.0 => /lib/x86_64-linux-gnu/libpcre2-8.so.0 (0x00007f7c7bd64000)
        libdl.so.2 => /lib/x86_64-linux-gnu/libdl.so.2 (0x00007f7c7bb60000)
        /lib64/ld-linux-x86-64.so.2 (0x00007f7c7c83c000)
        libattr.so.1 => /lib/x86_64-linux-gnu/libattr.so.1 (0x00007f7c7b958000)`}</code>
                </pre>

                <h5 className="font-semibold mb-2">动态链接分析代码示例</h5>
                <pre className="bg-gray-200 p-2 rounded mb-4">
                  <code>{`# 使用Python分析动态链接信息
import elftools.elf.dynamic as dynamic
from elftools.elf.elffile import ELFFile

def analyze_dynamic_info(file_path):
    with open(file_path, 'rb') as f:
        elf = ELFFile(f)
        
        # 获取动态段
        dynamic = elf.get_section_by_name('.dynamic')
        if dynamic:
            print("动态链接信息:")
            for tag in dynamic.iter_tags():
                print(f"标签: {tag.entry.d_tag}")
                print(f"值: {tag.entry.d_val}")
                if tag.entry.d_tag == 'DT_NEEDED':
                    print(f"依赖库: {tag.needed}")
                print("---")
        
        # 分析PLT/GOT
        plt = elf.get_section_by_name('.plt')
        got = elf.get_section_by_name('.got')
        if plt and got:
            print("\nPLT/GOT信息:")
            print(f"PLT地址: {hex(plt['sh_addr'])}")
            print(f"GOT地址: {hex(got['sh_addr'])}")
            
            # 分析PLT条目
            plt_entries = plt.data_size // plt['sh_entsize']
            print(f"PLT条目数: {plt_entries}")
            
            # 分析GOT条目
            got_entries = got.data_size // got['sh_entsize']
            print(f"GOT条目数: {got_entries}")

# 使用示例
analyze_dynamic_info("example")`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">3. 重定位分析</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">重定位类型</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>R_X86_64_64
                    <ul className="list-disc pl-6 mt-2">
                      <li>64位绝对地址重定位</li>
                      <li>用于全局变量</li>
                    </ul>
                  </li>
                  <li>R_X86_64_PC32
                    <ul className="list-disc pl-6 mt-2">
                      <li>32位PC相对重定位</li>
                      <li>用于函数调用</li>
                    </ul>
                  </li>
                  <li>R_X86_64_GOTPCREL
                    <ul className="list-disc pl-6 mt-2">
                      <li>GOT相对重定位</li>
                      <li>用于动态符号</li>
                    </ul>
                  </li>
                  <li>R_X86_64_PLT32
                    <ul className="list-disc pl-6 mt-2">
                      <li>PLT相对重定位</li>
                      <li>用于函数调用</li>
                    </ul>
                  </li>
                </ul>

                <h5 className="font-semibold mb-2">实际例题：分析重定位信息</h5>
                <pre className="bg-gray-200 p-2 rounded mb-4">
                  <code>{`# 使用readelf查看重定位信息
$ readelf -r /bin/ls

Relocation section '.rela.dyn' at offset 0x1748 contains 129 entries:
  Offset          Info           Type           Sym. Value    Sym. Name + Addend
0000000023a00  000000000008 R_X86_64_RELATIVE                    1b60c
0000000023a08  000000000008 R_X86_64_RELATIVE                    1b620
0000000023a10  000000000008 R_X86_64_RELATIVE                    1b630
0000000023a18  000000000008 R_X86_64_RELATIVE                    1b640
0000000023a20  000000000008 R_X86_64_RELATIVE                    1b650
0000000023a28  000000000008 R_X86_64_RELATIVE                    1b660
0000000023a30  000000000008 R_X86_64_RELATIVE                    1b670
0000000023a38  000000000008 R_X86_64_RELATIVE                    1b680
0000000023a40  000000000008 R_X86_64_RELATIVE                    1b690
0000000023a48  000000000008 R_X86_64_RELATIVE                    1b6a0
...

Relocation section '.rela.plt' at offset 0x2360 contains 107 entries:
  Offset          Info           Type           Sym. Value    Sym. Name + Addend
00000000236d0  000100000007 R_X86_64_JUMP_SLOT 0000000000000000 __libc_start_main + 0
00000000236d8  000200000007 R_X86_64_JUMP_SLOT 0000000000000000 __gmon_start__ + 0
00000000236e0  000300000007 R_X86_64_JUMP_SLOT 0000000000000000 abort + 0
00000000236e8  000400000007 R_X86_64_JUMP_SLOT 0000000000000000 __errno_location + 0
00000000236f0  000500000007 R_X86_64_JUMP_SLOT 0000000000000000 strncmp + 0
00000000236f8  000600000007 R_X86_64_JUMP_SLOT 0000000000000000 _ITM_deregisterTMCloneTable + 0
0000000023700  000700000007 R_X86_64_JUMP_SLOT 0000000000000000 _ITM_registerTMCloneTable + 0
0000000023708  000800000007 R_X86_64_JUMP_SLOT 0000000000000000 __cxa_finalize + 0
...`}</code>
                </pre>

                <h5 className="font-semibold mb-2">重定位分析代码示例</h5>
                <pre className="bg-gray-200 p-2 rounded mb-4">
                  <code>{`# 使用Python分析重定位信息
import elftools.elf.sections as sections
from elftools.elf.elffile import ELFFile

def analyze_relocations(file_path):
    with open(file_path, 'rb') as f:
        elf = ELFFile(f)
        
        # 分析重定位节
        for section in elf.iter_sections():
            if isinstance(section, sections.RelocationSection):
                print(f"\n重定位节: {section.name}")
                print(f"类型: {section['sh_type']}")
                print(f"链接节: {section['sh_link']}")
                print(f"信息节: {section['sh_info']}")
                print("重定位条目:")
                
                for reloc in section.iter_relocations():
                    print(f"偏移: {hex(reloc['r_offset'])}")
                    print(f"类型: {reloc['r_info_type']}")
                    print(f"符号: {reloc['r_info_sym']}")
                    
                    # 获取符号名称
                    symtab = elf.get_section(section['sh_link'])
                    if symtab:
                        symbol = symtab.get_symbol(reloc['r_info_sym'])
                        if symbol:
                            print(f"符号名: {symbol.name}")
                    print("---")
        
        # 分析PLT重定位
        plt_rel = elf.get_section_by_name('.rela.plt')
        if plt_rel:
            print("\nPLT重定位信息:")
            for reloc in plt_rel.iter_relocations():
                print(f"GOT偏移: {hex(reloc['r_offset'])}")
                print(f"类型: {reloc['r_info_type']}")
                print(f"符号索引: {reloc['r_info_sym']}")
                print("---")

# 使用示例
analyze_relocations("example")`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">4. 加壳检测</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">常见加壳类型</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>UPX
                    <ul className="list-disc pl-6 mt-2">
                      <li>开源压缩壳</li>
                      <li>特征：UPX!标记</li>
                      <li>可自动脱壳</li>
                    </ul>
                  </li>
                  <li>ASPack
                    <ul className="list-disc pl-6 mt-2">
                      <li>Windows专用壳</li>
                      <li>特征：ASPack标记</li>
                      <li>代码段压缩</li>
                    </ul>
                  </li>
                  <li>Themida
                    <ul className="list-disc pl-6 mt-2">
                      <li>商业保护壳</li>
                      <li>反调试保护</li>
                      <li>代码虚拟化</li>
                    </ul>
                  </li>
                  <li>VMProtect
                    <ul className="list-disc pl-6 mt-2">
                      <li>代码虚拟化保护</li>
                      <li>反调试技术</li>
                      <li>代码混淆</li>
                    </ul>
                  </li>
                </ul>

                <h5 className="font-semibold mb-2">实际例题：检测加壳</h5>
                <pre className="bg-gray-200 p-2 rounded mb-4">
                  <code>{`# 使用strings查看字符串特征
$ strings -a /bin/ls | grep -i "upx\|aspack\|themida\|vmprotect"

# 使用file命令查看文件类型
$ file /bin/ls
/bin/ls: ELF 64-bit LSB shared object, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, for GNU/Linux 3.2.0, BuildID[sha1]=9567f9a28e66f4d7ec4baf31cfbf68d0410f0ae6, stripped

# 使用readelf查看节表
$ readelf -S /bin/ls | grep -i "upx\|aspack\|themida\|vmprotect"`}</code>
                </pre>

                <h5 className="font-semibold mb-2">加壳检测代码示例</h5>
                <pre className="bg-gray-200 p-2 rounded mb-4">
                  <code>{`# 使用Python检测ELF文件是否加壳
import elftools.elf.elffile as elffile
import re

def detect_packing(file_path):
    try:
        with open(file_path, 'rb') as f:
            elf = elffile.ELFFile(f)
            
            # 检查特征
            packing_signatures = {
                'UPX': b'UPX!',
                'ASPack': b'ASPack',
                'Themida': b'Themida',
                'VMProtect': b'VMProtect'
            }
            
            # 检查节名称
            section_names = [section.name for section in elf.iter_sections()]
            print("节名称:", section_names)
            
            # 检查可疑节名
            suspicious_sections = ['UPX', 'ASPack', 'Themida', 'VMProtect']
            for section in section_names:
                if any(sig in section for sig in suspicious_sections):
                    print(f"发现可疑节名: {section}")
            
            # 检查代码段特征
            for section in elf.iter_sections():
                if section['sh_type'] == 'SHT_PROGBITS':
                    data = section.data()
                    for packer, signature in packing_signatures.items():
                        if signature in data:
                            print(f"发现{packer}特征")
            
            # 检查动态链接库
            for section in elf.iter_sections():
                if section['sh_type'] == 'SHT_DYNAMIC':
                    for tag in section.iter_tags():
                        if tag.entry.d_tag == 'DT_NEEDED':
                            lib_name = tag.needed
                            if any(packer.lower() in lib_name.lower() 
                                  for packer in packing_signatures.keys()):
                                print(f"发现可疑库: {lib_name}")
            
            # 检查入口点特征
            entry_point = elf.header['e_entry']
            print(f"入口点: {hex(entry_point)}")
            
            # 检查代码段权限
            for section in elf.iter_sections():
                if section['sh_type'] == 'SHT_PROGBITS':
                    flags = section['sh_flags']
                    if flags & 0x4:  # SHF_EXECINSTR
                        print(f"可执行节: {section.name}")
                        print(f"权限: {hex(flags)}")
            
            # 检查重定位信息
            reloc_count = 0
            for section in elf.iter_sections():
                if isinstance(section, sections.RelocationSection):
                    reloc_count += 1
            print(f"重定位节数量: {reloc_count}")
            
            # 检查符号表
            symtab = elf.get_section_by_name('.symtab')
            if symtab:
                symbol_count = 0
                for symbol in symtab.iter_symbols():
                    symbol_count += 1
                print(f"符号数量: {symbol_count}")
            
            # 检查字符串表
            strtab = elf.get_section_by_name('.strtab')
            if strtab:
                strings = strtab.data().decode('utf-8', errors='ignore')
                suspicious_strings = re.findall(r'[A-Za-z0-9_]{8,}', strings)
                print("可疑字符串:", suspicious_strings[:10])
                
    except Exception as e:
        print(f"检测加壳时出错: {str(e)}")

# 使用示例
detect_packing("example")`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 导航链接 */}
      <div className="mt-8 flex justify-between">
        <Link
          href="/study/security/reverse/pe"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← PE文件分析
        </Link>
        <Link
          href="/study/security/reverse/dynamic"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          动态分析技术 →
        </Link>
      </div>
    </div>
  );
} 
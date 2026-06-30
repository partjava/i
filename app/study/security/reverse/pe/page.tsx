'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookAlert, BookList,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: 'PE文件分析',
  chapterNumber: 3,
  totalChapters: 10,
  subjectHref: '/study/security/reverse',
  prevChapter: { label: '汇编语言基础', href: '/study/security/reverse/assembly' },
  nextChapter: { label: 'ELF文件分析', href: '/study/security/reverse/elf' },
  theme: THEMES.security,
}

const pythonPe = `import pefile

def analyze_pe_file(file_path):
    pe = pefile.PE(file_path)

    print("DOS头信息:")
    print(f"Magic Number: {hex(pe.DOS_HEADER.e_magic)}")
    print(f"PE头偏移: {hex(pe.DOS_HEADER.e_lfanew)}")

    print("\\nPE头信息:")
    print(f"机器类型: {hex(pe.FILE_HEADER.Machine)}")
    print(f"节数量: {pe.FILE_HEADER.NumberOfSections}")

    print("\\n节表信息:")
    for section in pe.sections:
        print(f"节名称: {section.Name.decode().rstrip('\\x00')}")
        print(f"虚拟地址: {hex(section.VirtualAddress)}")
        print(f"虚拟大小: {hex(section.Misc_VirtualSize)}")

    print("\\n导入表信息:")
    for entry in pe.DIRECTORY_ENTRY_IMPORT:
        print(f"DLL名称: {entry.dll.decode()}")
        for imp in entry.imports:
            print(f"  函数: {imp.name.decode() if imp.name else '序号: ' + str(imp.ordinal)}")

analyze_pe_file("example.exe")`

const pythonPeExtract = `import pefile
import os

def extract_resources(file_path, output_dir):
    pe = pefile.PE(file_path)
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    if hasattr(pe, 'DIRECTORY_ENTRY_RESOURCE'):
        for resource_type in pe.DIRECTORY_ENTRY_RESOURCE.entries:
            type_name = resource_type.name or pefile.RESOURCE_TYPE.get(
                resource_type.struct.Id, 'Unknown')
            type_dir = os.path.join(output_dir, str(type_name))
            if not os.path.exists(type_dir):
                os.makedirs(type_dir)

            for resource_id in resource_type.directory.entries:
                id_name = resource_id.name or str(resource_id.struct.Id)
                for resource_lang in resource_id.directory.entries:
                    data_rva = resource_lang.data.struct.OffsetToData
                    size = resource_lang.data.struct.Size
                    data = pe.get_memory_mapped_image()[data_rva:data_rva+size]
                    with open(os.path.join(type_dir, f"{id_name}_{resource_lang.struct.Id}.bin"), 'wb') as f:
                        f.write(data)

extract_resources("example.exe", "extracted_resources")`

const SPREADS = [
  {
    label: '概述',
    left: (
      <div className="space-y-4">
        <PageTitle>PE文件概述</PageTitle>
        <BookParagraph>
          PE（Portable Executable）文件是Windows操作系统下的可执行文件格式，包括.exe、.dll、.sys等文件类型。PE文件包含了程序运行所需的所有信息，如代码、数据、资源、导入导出表等。
        </BookParagraph>
        <SectionTitle>PE文件的特点</SectionTitle>
        <BookList items={['模块化结构：由多个节（Section）组成', '可重定位：支持代码和数据在不同内存地址加载', '资源管理：支持图标、字符串、对话框等', '导入导出：支持动态链接库功能', '调试信息：可以包含调试符号和行号信息', '数字签名：支持代码签名和验证']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>应用场景与基本概念</SectionTitle>
        <BookList items={['程序分析：分析程序的结构和行为', '漏洞挖掘：发现程序中的安全漏洞', '恶意软件分析：分析病毒、木马等恶意程序', '软件保护：实现加密和保护机制']} />
        <BookAlert type="info" message="文件头：DOS头(MZ签名) → PE头 → 可选头。节表：代码节(.text)、数据节(.data)、资源节(.rsrc)、导入节(.idata)、导出节(.edata)。数据目录：导入表、导出表、资源表、重定位表、调试信息。" />
      </div>
    ),
  },
  {
    label: '文件结构',
    left: (
      <div className="space-y-4">
        <PageTitle>PE文件结构详解</PageTitle>
        <SectionTitle>DOS头结构</SectionTitle>
        <BookCode language="cpp" code={`typedef struct _IMAGE_DOS_HEADER {
    WORD   e_magic;      // DOS签名 "MZ"
    WORD   e_cblp;       // 最后页中的字节数
    WORD   e_cp;         // 页数
    WORD   e_crlc;       // 重定位元素个数
    WORD   e_cparhdr;    // 头部大小
    WORD   e_minalloc;   // 最小附加内存
    WORD   e_maxalloc;   // 最大附加内存
    WORD   e_ss;         // 初始SS值
    WORD   e_sp;         // 初始SP值
    WORD   e_csum;       // 校验和
    WORD   e_ip;         // 初始IP值
    WORD   e_cs;         // 初始CS值
    WORD   e_lfarlc;     // 重定位表文件地址
    WORD   e_ovno;       // 覆盖号
    WORD   e_res[4];     // 保留字
    WORD   e_oemid;      // OEM标识符
    WORD   e_oeminfo;    // OEM信息
    WORD   e_res2[10];   // 保留字
    LONG   e_lfanew;     // PE头偏移
} IMAGE_DOS_HEADER;`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>PE头与节表结构</SectionTitle>
        <BookCode language="cpp" code={`typedef struct _IMAGE_FILE_HEADER {
    WORD    Machine;              // 运行平台
    WORD    NumberOfSections;     // 节的数量
    DWORD   TimeDateStamp;        // 文件创建时间
    DWORD   PointerToSymbolTable; // 符号表偏移
    DWORD   NumberOfSymbols;      // 符号数量
    WORD    SizeOfOptionalHeader; // 可选头大小
    WORD    Characteristics;      // 文件属性
} IMAGE_FILE_HEADER;

typedef struct _IMAGE_SECTION_HEADER {
    BYTE    Name[8];             // 节名称
    union { DWORD PhysicalAddress;
            DWORD VirtualSize; } Misc;
    DWORD   VirtualAddress;      // 虚拟地址
    DWORD   SizeOfRawData;       // 原始数据大小
    DWORD   PointerToRawData;    // 原始数据偏移
    DWORD   PointerToRelocations;// 重定位信息偏移
    DWORD   PointerToLinenumbers;// 行号信息偏移
    WORD    NumberOfRelocations; // 重定位数量
    WORD    NumberOfLinenumbers; // 行号数量
    DWORD   Characteristics;     // 节属性
} IMAGE_SECTION_HEADER;`} />
      </div>
    ),
  },
  {
    label: '分析工具',
    left: (
      <div className="space-y-4">
        <PageTitle>PE文件分析工具</PageTitle>
        <SectionTitle>反汇编工具</SectionTitle>
        <BookList items={['IDA Pro：功能最强大的交互式反汇编器，支持PE分析', 'Ghidra：NSA开源逆向工具，提供反编译功能']} />
        <SectionTitle>PE专用工具</SectionTitle>
        <BookList items={['PE Explorer：专业的PE文件分析工具', 'CFF Explorer：免费的PE文件分析工具，支持编辑']} />
        <SectionTitle>调试工具</SectionTitle>
        <BookList items={['x64dbg：开源Windows调试器，支持32/64位', 'OllyDbg：Windows 32位调试器，适合初学者']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>其他工具</SectionTitle>
        <BookList items={['HxD：十六进制编辑器', 'Process Monitor：系统活动监控工具']} />
      </div>
    ),
  },
  {
    label: '实践案例',
    left: (
      <div className="space-y-4">
        <PageTitle>基本PE文件分析</PageTitle>
        <BookCode language="python" code={pythonPe} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>资源提取</PageTitle>
        <BookCode language="python" code={pythonPeExtract} />
      </div>
    ),
  },
]

export default function PEAnalysisPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

"use client";
import { useState } from "react";
import Link from "next/link";

export default function PEAnalysisPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">PE文件分析</h1>
      
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
            <h3 className="text-xl font-semibold mb-3">PE文件概述</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 什么是PE文件</h4>
              <p className="mb-4">
                PE（Portable Executable）文件是Windows操作系统下的可执行文件格式，包括.exe、.dll、.sys等文件类型。PE文件包含了程序运行所需的所有信息，如代码、数据、资源、导入导出表等。理解PE文件结构对于逆向工程、安全分析和软件开发都至关重要。
              </p>

              <h4 className="font-semibold">2. PE文件的特点</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ul className="list-disc pl-6 mb-4">
                  <li>模块化结构：PE文件由多个节（Section）组成，每个节存储不同类型的数据</li>
                  <li>可重定位：支持代码和数据在不同内存地址加载</li>
                  <li>资源管理：支持存储和管理各种资源（图标、字符串、对话框等）</li>
                  <li>导入导出：支持动态链接库（DLL）的导入导出功能</li>
                  <li>调试信息：可以包含调试符号和行号信息</li>
                  <li>数字签名：支持代码签名和验证</li>
                </ul>
              </div>

              <h4 className="font-semibold">3. PE文件的应用场景</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ul className="list-disc pl-6 mb-4">
                  <li>程序分析：分析程序的结构和行为</li>
                  <li>漏洞挖掘：发现程序中的安全漏洞</li>
                  <li>恶意软件分析：分析病毒、木马等恶意程序</li>
                  <li>软件保护：实现软件加密和保护机制</li>
                  <li>性能优化：分析程序的资源使用和性能特征</li>
                  <li>兼容性研究：分析不同版本程序之间的差异</li>
                </ul>
              </div>

              <h4 className="font-semibold">4. PE文件分析的基本概念</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">文件头</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>DOS头：包含DOS兼容性信息</li>
                  <li>PE头：包含PE文件的基本信息</li>
                  <li>可选头：包含程序运行时的信息</li>
                </ul>

                <h5 className="font-semibold mb-2">节表</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>代码节：存储程序的执行代码</li>
                  <li>数据节：存储程序的全局数据</li>
                  <li>资源节：存储程序的资源数据</li>
                  <li>导入节：存储导入函数信息</li>
                  <li>导出节：存储导出函数信息</li>
                </ul>

                <h5 className="font-semibold mb-2">数据目录</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>导入表：记录程序使用的DLL函数</li>
                  <li>导出表：记录程序导出的函数</li>
                  <li>资源表：记录程序的资源信息</li>
                  <li>重定位表：记录需要重定位的地址</li>
                  <li>调试信息：记录程序的调试数据</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "structure" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">PE文件结构详解</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. DOS头结构</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`typedef struct _IMAGE_DOS_HEADER {
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
} IMAGE_DOS_HEADER;`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">2. PE头结构</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`typedef struct _IMAGE_FILE_HEADER {
    WORD    Machine;              // 运行平台
    WORD    NumberOfSections;     // 节的数量
    DWORD   TimeDateStamp;        // 文件创建时间
    DWORD   PointerToSymbolTable; // 符号表偏移
    DWORD   NumberOfSymbols;      // 符号数量
    WORD    SizeOfOptionalHeader; // 可选头大小
    WORD    Characteristics;      // 文件属性
} IMAGE_FILE_HEADER;

typedef struct _IMAGE_OPTIONAL_HEADER {
    WORD    Magic;                // 魔数
    BYTE    MajorLinkerVersion;   // 链接器主版本
    BYTE    MinorLinkerVersion;   // 链接器次版本
    DWORD   SizeOfCode;           // 代码段大小
    DWORD   SizeOfInitializedData;// 已初始化数据大小
    DWORD   SizeOfUninitializedData;// 未初始化数据大小
    DWORD   AddressOfEntryPoint;  // 程序入口点
    DWORD   BaseOfCode;           // 代码段基址
    DWORD   BaseOfData;           // 数据段基址
    DWORD   ImageBase;            // 程序基址
    DWORD   SectionAlignment;     // 节对齐
    DWORD   FileAlignment;        // 文件对齐
    WORD    MajorOperatingSystemVersion; // 操作系统主版本
    WORD    MinorOperatingSystemVersion; // 操作系统次版本
    WORD    MajorImageVersion;    // 程序主版本
    WORD    MinorImageVersion;    // 程序次版本
    WORD    MajorSubsystemVersion;// 子系统主版本
    WORD    MinorSubsystemVersion;// 子系统次版本
    DWORD   Win32VersionValue;    // 保留
    DWORD   SizeOfImage;          // 程序大小
    DWORD   SizeOfHeaders;        // 头大小
    DWORD   CheckSum;             // 校验和
    WORD    Subsystem;            // 子系统
    WORD    DllCharacteristics;   // DLL特征
    DWORD   SizeOfStackReserve;   // 栈保留大小
    DWORD   SizeOfStackCommit;    // 栈提交大小
    DWORD   SizeOfHeapReserve;    // 堆保留大小
    DWORD   SizeOfHeapCommit;     // 堆提交大小
    DWORD   LoaderFlags;          // 加载器标志
    DWORD   NumberOfRvaAndSizes;  // 数据目录数量
    IMAGE_DATA_DIRECTORY DataDirectory[16]; // 数据目录
} IMAGE_OPTIONAL_HEADER;`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">3. 节表结构</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`typedef struct _IMAGE_SECTION_HEADER {
    BYTE    Name[8];             // 节名称
    union {
        DWORD   PhysicalAddress; // 物理地址
        DWORD   VirtualSize;     // 虚拟大小
    } Misc;
    DWORD   VirtualAddress;      // 虚拟地址
    DWORD   SizeOfRawData;       // 原始数据大小
    DWORD   PointerToRawData;    // 原始数据偏移
    DWORD   PointerToRelocations;// 重定位信息偏移
    DWORD   PointerToLinenumbers;// 行号信息偏移
    WORD    NumberOfRelocations; // 重定位数量
    WORD    NumberOfLinenumbers; // 行号数量
    DWORD   Characteristics;     // 节属性
} IMAGE_SECTION_HEADER;`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">4. 导入表结构</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`typedef struct _IMAGE_IMPORT_DESCRIPTOR {
    union {
        DWORD   Characteristics;  // 特征
        DWORD   OriginalFirstThunk; // 原始导入表
    };
    DWORD   TimeDateStamp;       // 时间戳
    DWORD   ForwarderChain;      // 转发链
    DWORD   Name;                // DLL名称
    DWORD   FirstThunk;          // 导入地址表
} IMAGE_IMPORT_DESCRIPTOR;

typedef struct _IMAGE_THUNK_DATA {
    union {
        DWORD ForwarderString;   // 转发字符串
        DWORD Function;          // 函数地址
        DWORD Ordinal;           // 序号
        DWORD AddressOfData;     // 数据地址
    } u1;
} IMAGE_THUNK_DATA;`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === "tools" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">PE文件分析工具</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 反汇编工具</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">IDA Pro</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>功能最强大的交互式反汇编器</li>
                  <li>支持PE文件结构分析</li>
                  <li>提供图形化界面和脚本扩展</li>
                  <li>具有强大的分析功能和插件系统</li>
                  <li>支持反编译和调试功能</li>
                </ul>

                <h5 className="font-semibold mb-2">Ghidra</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>NSA开发的开源软件逆向工具</li>
                  <li>支持PE文件分析</li>
                  <li>提供反编译和调试功能</li>
                  <li>具有协作功能和脚本扩展</li>
                  <li>支持插件开发</li>
                </ul>
              </div>

              <h4 className="font-semibold">2. PE文件分析工具</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">PE Explorer</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>专业的PE文件分析工具</li>
                  <li>查看和编辑资源</li>
                  <li>分析导入导出表</li>
                  <li>支持反汇编功能</li>
                  <li>提供十六进制编辑器</li>
                </ul>

                <h5 className="font-semibold mb-2">CFF Explorer</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>免费的PE文件分析工具</li>
                  <li>查看和编辑PE头</li>
                  <li>分析节表结构</li>
                  <li>支持资源编辑</li>
                  <li>提供导入导出表分析</li>
                </ul>
              </div>

              <h4 className="font-semibold">3. 调试工具</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">x64dbg</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>开源Windows调试器</li>
                  <li>支持32位和64位程序</li>
                  <li>提供反汇编和调试功能</li>
                  <li>支持插件扩展</li>
                  <li>界面现代化，功能强大</li>
                </ul>

                <h5 className="font-semibold mb-2">OllyDbg</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>Windows平台下的32位调试器</li>
                  <li>界面友好，易于使用</li>
                  <li>支持插件扩展</li>
                  <li>提供反汇编和调试功能</li>
                  <li>适合初学者使用</li>
                </ul>
              </div>

              <h4 className="font-semibold">4. 其他实用工具</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">HxD</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>十六进制编辑器</li>
                  <li>支持大文件编辑</li>
                  <li>提供数据比较功能</li>
                  <li>支持磁盘编辑</li>
                </ul>

                <h5 className="font-semibold mb-2">Process Monitor</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>系统活动监控工具</li>
                  <li>跟踪文件系统活动</li>
                  <li>监控注册表访问</li>
                  <li>分析程序行为</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "practice" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">实践案例</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 基本PE文件分析</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 使用Python分析PE文件结构
import pefile

def analyze_pe_file(file_path):
    try:
        # 加载PE文件
        pe = pefile.PE(file_path)
        
        # 分析DOS头
        print("DOS头信息:")
        print(f"Magic Number: {hex(pe.DOS_HEADER.e_magic)}")
        print(f"PE头偏移: {hex(pe.DOS_HEADER.e_lfanew)}")
        
        # 分析PE头
        print("\nPE头信息:")
        print(f"机器类型: {hex(pe.FILE_HEADER.Machine)}")
        print(f"节数量: {pe.FILE_HEADER.NumberOfSections}")
        print(f"时间戳: {pe.FILE_HEADER.TimeDateStamp}")
        
        # 分析节表
        print("\n节表信息:")
        for section in pe.sections:
            print(f"节名称: {section.Name.decode().rstrip('\\x00')}")
            print(f"虚拟地址: {hex(section.VirtualAddress)}")
            print(f"虚拟大小: {hex(section.Misc_VirtualSize)}")
            print(f"原始数据大小: {hex(section.SizeOfRawData)}")
            print("---")
            
        # 分析导入表
        print("\n导入表信息:")
        for entry in pe.DIRECTORY_ENTRY_IMPORT:
            print(f"DLL名称: {entry.dll.decode()}")
            for imp in entry.imports:
                print(f"  函数: {imp.name.decode() if imp.name else '序号: ' + str(imp.ordinal)}")
                
    except Exception as e:
        print(f"分析出错: {str(e)}")

# 使用示例
analyze_pe_file("example.exe")`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">2. 导入表分析</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 使用C++分析导入表
#include <windows.h>
#include <iostream>

void AnalyzeImportTable(const char* filePath) {
    // 打开文件
    HANDLE hFile = CreateFileA(filePath, GENERIC_READ, FILE_SHARE_READ, 
                             NULL, OPEN_EXISTING, FILE_ATTRIBUTE_NORMAL, NULL);
    if (hFile == INVALID_HANDLE_VALUE) {
        std::cout << "无法打开文件" << std::endl;
        return;
    }

    // 创建文件映射
    HANDLE hMapping = CreateFileMapping(hFile, NULL, PAGE_READONLY, 0, 0, NULL);
    if (!hMapping) {
        CloseHandle(hFile);
        return;
    }

    // 映射视图
    LPVOID pBase = MapViewOfFile(hMapping, FILE_MAP_READ, 0, 0, 0);
    if (!pBase) {
        CloseHandle(hMapping);
        CloseHandle(hFile);
        return;
    }

    // 获取DOS头
    PIMAGE_DOS_HEADER pDosHeader = (PIMAGE_DOS_HEADER)pBase;
    if (pDosHeader->e_magic != IMAGE_DOS_SIGNATURE) {
        std::cout << "无效的DOS签名" << std::endl;
        goto cleanup;
    }

    // 获取PE头
    PIMAGE_NT_HEADERS pNtHeaders = (PIMAGE_NT_HEADERS)((BYTE*)pBase + pDosHeader->e_lfanew);
    if (pNtHeaders->Signature != IMAGE_NT_SIGNATURE) {
        std::cout << "无效的PE签名" << std::endl;
        goto cleanup;
    }

    // 获取导入表
    PIMAGE_IMPORT_DESCRIPTOR pImportDesc = (PIMAGE_IMPORT_DESCRIPTOR)((BYTE*)pBase + 
        pNtHeaders->OptionalHeader.DataDirectory[IMAGE_DIRECTORY_ENTRY_IMPORT].VirtualAddress);

    // 遍历导入表
    while (pImportDesc->Name) {
        // 获取DLL名称
        const char* dllName = (const char*)((BYTE*)pBase + pImportDesc->Name);
        std::cout << "DLL: " << dllName << std::endl;

        // 获取导入函数
        PIMAGE_THUNK_DATA pThunk = (PIMAGE_THUNK_DATA)((BYTE*)pBase + pImportDesc->FirstThunk);
        while (pThunk->u1.Function) {
            if (pThunk->u1.Ordinal & IMAGE_ORDINAL_FLAG) {
                std::cout << "  序号: " << (pThunk->u1.Ordinal & 0xFFFF) << std::endl;
            } else {
                PIMAGE_IMPORT_BY_NAME pImportByName = (PIMAGE_IMPORT_BY_NAME)((BYTE*)pBase + pThunk->u1.AddressOfData);
                std::cout << "  函数: " << pImportByName->Name << std::endl;
            }
            pThunk++;
        }
        pImportDesc++;
    }

cleanup:
    UnmapViewOfFile(pBase);
    CloseHandle(hMapping);
    CloseHandle(hFile);
}`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">3. 资源分析</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 使用Python提取PE文件资源
import pefile
import os

def extract_resources(file_path, output_dir):
    try:
        # 加载PE文件
        pe = pefile.PE(file_path)
        
        # 确保输出目录存在
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)
            
        # 遍历资源
        if hasattr(pe, 'DIRECTORY_ENTRY_RESOURCE'):
            for resource_type in pe.DIRECTORY_ENTRY_RESOURCE.entries:
                # 获取资源类型名称
                if resource_type.name is not None:
                    type_name = resource_type.name
                else:
                    type_name = pefile.RESOURCE_TYPE.get(resource_type.struct.Id, 'Unknown')
                
                # 创建资源类型目录
                type_dir = os.path.join(output_dir, str(type_name))
                if not os.path.exists(type_dir):
                    os.makedirs(type_dir)
                
                # 遍历资源ID
                for resource_id in resource_type.directory.entries:
                    if resource_id.name is not None:
                        id_name = resource_id.name
                    else:
                        id_name = str(resource_id.struct.Id)
                    
                    # 遍历资源语言
                    for resource_lang in resource_id.directory.entries:
                        # 获取资源数据
                        data_rva = resource_lang.data.struct.OffsetToData
                        size = resource_lang.data.struct.Size
                        data = pe.get_memory_mapped_image()[data_rva:data_rva+size]
                        
                        # 保存资源
                        lang_id = resource_lang.struct.Id
                        file_name = f"{id_name}_{lang_id}.bin"
                        file_path = os.path.join(type_dir, file_name)
                        
                        with open(file_path, 'wb') as f:
                            f.write(data)
                        print(f"已保存资源: {file_path}")
                        
    except Exception as e:
        print(f"提取资源时出错: {str(e)}")

# 使用示例
extract_resources("example.exe", "extracted_resources")`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">4. 加壳分析</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 使用Python检测PE文件是否加壳
import pefile
import re

def detect_packing(file_path):
    try:
        # 加载PE文件
        pe = pefile.PE(file_path)
        
        # 检查特征
        packing_signatures = {
            'UPX': rb'UPX!',
            'ASPack': rb'ASPack',
            'PECompact': rb'PEC2',
            'Themida': rb'Themida',
            'VMProtect': rb'VMProtect'
        }
        
        # 检查节名称
        section_names = [section.Name.decode().rstrip('\\x00') for section in pe.sections]
        print("节名称:", section_names)
        
        # 检查可疑节名
        suspicious_sections = ['UPX', 'ASPack', 'PEC2', 'Themida', 'VMProtect']
        for section in section_names:
            if any(sig in section for sig in suspicious_sections):
                print(f"发现可疑节名: {section}")
        
        # 检查代码段特征
        for section in pe.sections:
            if section.Name.decode().rstrip('\\x00') == '.text':
                data = pe.get_memory_mapped_image()[section.VirtualAddress:section.VirtualAddress+section.SizeOfRawData]
                for packer, signature in packing_signatures.items():
                    if signature in data:
                        print(f"发现{packer}特征")
        
        # 检查导入表
        if hasattr(pe, 'DIRECTORY_ENTRY_IMPORT'):
            for entry in pe.DIRECTORY_ENTRY_IMPORT:
                dll_name = entry.dll.decode().lower()
                if any(packer.lower() in dll_name for packer in packing_signatures.keys()):
                    print(f"发现可疑DLL: {dll_name}")
        
        # 检查资源段
        if hasattr(pe, 'DIRECTORY_ENTRY_RESOURCE'):
            for resource_type in pe.DIRECTORY_ENTRY_RESOURCE.entries:
                if resource_type.name is not None:
                    resource_name = resource_type.name
                    if any(packer.lower() in resource_name.lower() for packer in packing_signatures.keys()):
                        print(f"发现可疑资源: {resource_name}")
        
    except Exception as e:
        print(f"检测加壳时出错: {str(e)}")

# 使用示例
detect_packing("example.exe")`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 导航链接 */}
      <div className="mt-8 flex justify-between">
        <Link
          href="/study/security/reverse/assembly"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 汇编语言基础
        </Link>
        <Link
          href="/study/security/reverse/elf"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ELF文件分析 →
        </Link>
      </div>
    </div>
  );
} 
"use client";
import { useState } from "react";
import Link from "next/link";

export default function PackUnpackPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">加壳脱壳技术</h1>
      
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
          onClick={() => setActiveTab("packing")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "packing"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          加壳技术
        </button>
        <button
          onClick={() => setActiveTab("unpacking")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "unpacking"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          脱壳方法
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
            <h3 className="text-xl font-semibold mb-3">加壳脱壳概述</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 什么是加壳脱壳</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="mb-4">
                  加壳是一种对可执行文件进行保护的技术，通过加密、压缩或混淆等方式来保护程序代码。脱壳则是逆向分析加壳程序的过程，目的是还原原始程序。
                </p>

                <h5 className="font-semibold mb-2">主要目的</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>代码保护
                    <ul className="list-disc pl-6 mt-2">
                      <li>防止逆向分析</li>
                      <li>保护知识产权</li>
                      <li>防止破解和盗版</li>
                    </ul>
                  </li>
                  <li>程序压缩
                    <ul className="list-disc pl-6 mt-2">
                      <li>减小文件体积</li>
                      <li>加快下载速度</li>
                      <li>节省存储空间</li>
                    </ul>
                  </li>
                  <li>反调试
                    <ul className="list-disc pl-6 mt-2">
                      <li>增加调试难度</li>
                      <li>防止动态分析</li>
                      <li>保护核心算法</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <h4 className="font-semibold">2. 加壳技术的分类</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ul className="list-disc pl-6 mb-4">
                  <li>压缩壳
                    <ul className="list-disc pl-6 mt-2">
                      <li>UPX</li>
                      <li>ASPack</li>
                      <li>PECompact</li>
                    </ul>
                  </li>
                  <li>加密壳
                    <ul className="list-disc pl-6 mt-2">
                      <li>Themida</li>
                      <li>VMProtect</li>
                      <li>Enigma Protector</li>
                    </ul>
                  </li>
                  <li>虚拟机保护
                    <ul className="list-disc pl-6 mt-2">
                      <li>代码虚拟化</li>
                      <li>指令转换</li>
                      <li>虚拟指令集</li>
                    </ul>
                  </li>
                  <li>反调试壳
                    <ul className="list-disc pl-6 mt-2">
                      <li>调试器检测</li>
                      <li>时间检测</li>
                      <li>环境检测</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "packing" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">加壳技术</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 基本加壳流程</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">加壳步骤</h5>
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 基本加壳流程示例
class Packer {
private:
    // 1. 读取原始PE文件
    bool readOriginalFile(const char* filename) {
        // 读取文件头
        // 读取节表
        // 读取代码段
        // 读取数据段
        return true;
    }
    
    // 2. 压缩/加密代码
    bool compressCode() {
        // 选择压缩算法
        // 压缩代码段
        // 压缩数据段
        return true;
    }
    
    // 3. 添加解压/解密代码
    bool addUnpacker() {
        // 生成解压代码
        // 添加解密代码
        // 添加反调试代码
        return true;
    }
    
    // 4. 重建PE文件
    bool rebuildPE() {
        // 修改PE头
        // 添加新节
        // 修改入口点
        // 保存文件
        return true;
    }
    
public:
    // 执行加壳
    bool pack(const char* inputFile, const char* outputFile) {
        if (!readOriginalFile(inputFile)) return false;
        if (!compressCode()) return false;
        if (!addUnpacker()) return false;
        if (!rebuildPE()) return false;
        return true;
    }
};`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">2. 高级加壳技术</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">代码虚拟化</h5>
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 代码虚拟化示例
class CodeVirtualizer {
private:
    // 虚拟指令集
    struct VirtualInstruction {
        uint8_t opcode;
        uint32_t operand1;
        uint32_t operand2;
    };
    
    // 虚拟化代码
    bool virtualizeCode(const uint8_t* code, size_t size) {
        // 1. 分析原始指令
        // 2. 转换为虚拟指令
        // 3. 生成虚拟机代码
        // 4. 添加解释器
        return true;
    }
    
    // 生成虚拟机
    bool generateVM() {
        // 1. 实现虚拟指令集
        // 2. 实现解释器
        // 3. 添加反调试
        // 4. 添加完整性检查
        return true;
    }
    
public:
    // 执行代码虚拟化
    bool virtualize(const char* inputFile, const char* outputFile) {
        // 读取原始代码
        // 执行虚拟化
        // 生成虚拟机
        // 保存结果
        return true;
    }
};`}</code>
                </pre>

                <h5 className="font-semibold mb-2">反调试保护</h5>
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 反调试保护示例
class AntiDebugProtection {
private:
    // 添加反调试代码
    bool addAntiDebug() {
        // 1. 检测调试器
        // 2. 检测断点
        // 3. 检测内存修改
        // 4. 检测代码注入
        return true;
    }
    
    // 添加完整性检查
    bool addIntegrityCheck() {
        // 1. 计算代码哈希
        // 2. 检查内存完整性
        // 3. 检查PE头完整性
        // 4. 检查导入表完整性
        return true;
    }
    
public:
    // 添加保护
    bool protect(const char* inputFile, const char* outputFile) {
        // 读取文件
        // 添加反调试
        // 添加完整性检查
        // 保存结果
        return true;
    }
};`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === "unpacking" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">脱壳方法</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 静态脱壳</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">特征识别</h5>
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 识别常见壳的特征
bool identifyPacker(const char* filename) {
    // 读取文件头
    FILE* fp = fopen(filename, "rb");
    if (!fp) return false;
    
    // 读取PE头
    IMAGE_DOS_HEADER dosHeader;
    fread(&dosHeader, sizeof(dosHeader), 1, fp);
    
    // 检查特征
    if (dosHeader.e_magic != IMAGE_DOS_SIGNATURE) {
        fclose(fp);
        return false;
    }
    
    // 检查常见壳的特征
    const char* signatures[] = {
        "UPX",
        "ASPack",
        "PECompact",
        "Themida",
        "VMProtect"
    };
    
    // 搜索特征字符串
    char buffer[1024];
    while (fread(buffer, 1, sizeof(buffer), fp)) {
        for (const char* sig : signatures) {
            if (strstr(buffer, sig)) {
                fclose(fp);
                return true;
            }
        }
    }
    
    fclose(fp);
    return false;
}`}</code>
                </pre>

                <h5 className="font-semibold mb-2">手动脱壳</h5>
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 手动脱壳步骤
class ManualUnpacker {
private:
    // 1. 定位解压代码
    bool locateUnpacker() {
        // 分析入口点
        // 跟踪执行流程
        // 定位解压函数
        return true;
    }
    
    // 2. 提取原始代码
    bool extractOriginalCode() {
        // 跟踪解压过程
        // 记录内存变化
        // 提取解压后的代码
        return true;
    }
    
    // 3. 修复PE文件
    bool fixPE() {
        // 修复PE头
        // 修复节表
        // 修复导入表
        // 修复重定位表
        return true;
    }
    
public:
    // 执行手动脱壳
    bool unpack(const char* inputFile, const char* outputFile) {
        if (!locateUnpacker()) return false;
        if (!extractOriginalCode()) return false;
        if (!fixPE()) return false;
        return true;
    }
};`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">2. 动态脱壳</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">内存转储</h5>
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 内存转储示例
class MemoryDumper {
private:
    // 等待程序解压完成
    bool waitForUnpacking() {
        // 设置断点
        // 监控内存变化
        // 检测解压完成
        return true;
    }
    
    // 转储内存
    bool dumpMemory() {
        // 获取进程句柄
        // 读取内存内容
        // 保存到文件
        return true;
    }
    
    // 修复转储文件
    bool fixDump() {
        // 修复PE头
        // 修复节表
        // 修复导入表
        return true;
    }
    
public:
    // 执行内存转储
    bool dump(const char* processName, const char* outputFile) {
        if (!waitForUnpacking()) return false;
        if (!dumpMemory()) return false;
        if (!fixDump()) return false;
        return true;
    }
};`}</code>
                </pre>

                <h5 className="font-semibold mb-2">调试器辅助</h5>
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 调试器辅助脱壳
class DebuggerAssistedUnpacker {
private:
    // 设置断点
    bool setBreakpoints() {
        // 设置入口点断点
        // 设置内存访问断点
        // 设置API断点
        return true;
    }
    
    // 跟踪执行
    bool traceExecution() {
        // 单步执行
        // 记录内存变化
        // 分析执行流程
        return true;
    }
    
    // 提取代码
    bool extractCode() {
        // 定位解压后的代码
        // 提取代码段
        // 提取数据段
        return true;
    }
    
public:
    // 执行调试器辅助脱壳
    bool unpack(const char* inputFile, const char* outputFile) {
        if (!setBreakpoints()) return false;
        if (!traceExecution()) return false;
        if (!extractCode()) return false;
        return true;
    }
};`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === "practice" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">实践案例</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. UPX脱壳案例</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// UPX脱壳步骤
1. 识别UPX特征
   - 检查PE头中的UPX标记
   - 检查节表特征
   - 检查入口点特征

2. 定位解压代码
   - 入口点通常在UPX0节
   - 解压代码在UPX1节
   - 原始代码在UPX2节

3. 设置断点
   - 在入口点设置断点
   - 在解压完成后设置断点
   - 在跳转到OEP时设置断点

4. 执行程序
   - 运行到入口点
   - 跟踪解压过程
   - 等待跳转到OEP

5. 转储内存
   - 在OEP处转储内存
   - 修复PE头
   - 修复节表
   - 修复导入表

6. 保存文件
   - 保存修复后的文件
   - 验证文件完整性
   - 测试程序功能`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">2. VMProtect脱壳案例</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// VMProtect脱壳步骤
1. 分析保护特征
   - 检查VMProtect标记
   - 分析虚拟化代码
   - 识别反调试特征

2. 绕过反调试
   - 修改PEB标志
   - 修改调试器检测
   - 修改时间检测

3. 定位虚拟机
   - 分析入口点
   - 定位虚拟机代码
   - 分析虚拟指令集

4. 跟踪执行
   - 设置内存断点
   - 跟踪虚拟机执行
   - 记录内存变化

5. 提取代码
   - 定位原始代码
   - 提取代码段
   - 提取数据段

6. 修复文件
   - 修复PE头
   - 修复节表
   - 修复导入表
   - 修复重定位表

7. 验证结果
   - 测试程序功能
   - 验证代码完整性
   - 检查是否有遗漏`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 导航链接 */}
      <div className="mt-8 flex justify-between">
        <Link
          href="/study/security/reverse/anti-debug"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 反调试技术
        </Link>
        <Link
          href="/study/security/reverse/vulnerability"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          漏洞挖掘 →
        </Link>
      </div>
    </div>
  );
} 
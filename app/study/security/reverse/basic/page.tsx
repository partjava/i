"use client";
import { useState } from "react";
import Link from "next/link";

export default function ReverseEngineeringBasicPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">逆向工程基础</h1>
      
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
          onClick={() => setActiveTab("tools")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "tools"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          工具
        </button>
        <button
          onClick={() => setActiveTab("techniques")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "techniques"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          技术
        </button>
        <button
          onClick={() => setActiveTab("practice")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "practice"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          实践
        </button>
      </div>

      {/* 内容区域 */}
      <div className="space-y-6">
        {activeTab === "overview" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">逆向工程概述</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 什么是逆向工程</h4>
              <p className="mb-4">
                逆向工程是通过分析软件、硬件或系统的结构和功能，以理解其工作原理的过程。在安全领域，逆向工程是理解恶意软件、发现漏洞和进行安全评估的重要工具。逆向工程不仅限于分析代码，还包括理解程序的行为、数据流和通信协议。
              </p>

              <h4 className="font-semibold">2. 逆向工程的应用领域</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ul className="list-disc pl-6 mb-4">
                  <li>恶意软件分析：分析病毒、木马等恶意程序的行为和特征</li>
                  <li>漏洞挖掘：发现软件中的安全漏洞和缺陷</li>
                  <li>软件保护机制研究：分析软件的保护措施和破解方法</li>
                  <li>协议分析：理解网络协议和通信机制</li>
                  <li>固件分析：分析嵌入式设备的固件和功能</li>
                  <li>软件兼容性研究：分析不同版本软件之间的差异</li>
                  <li>性能优化：通过分析代码找出性能瓶颈</li>
                  <li>知识产权保护：检测软件盗版和侵权行为</li>
                </ul>
              </div>

              <h4 className="font-semibold">3. 逆向工程的基本概念</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">静态分析</h5>
                <p className="mb-2">
                  在不运行程序的情况下分析代码，包括：
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>反汇编分析：将机器码转换为汇编代码进行分析</li>
                  <li>代码结构分析：分析程序的整体结构和控制流</li>
                  <li>字符串分析：查找程序中的字符串和常量</li>
                  <li>资源分析：分析程序中的资源文件</li>
                  <li>符号分析：分析程序的符号表和调试信息</li>
                  <li>依赖分析：分析程序的依赖关系和导入导出表</li>
                </ul>

                <h5 className="font-semibold mb-2">动态分析</h5>
                <p className="mb-2">
                  在程序运行时进行分析，包括：
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>调试分析：使用调试器跟踪程序执行</li>
                  <li>内存分析：分析程序的内存使用和数据结构</li>
                  <li>网络流量分析：分析程序的网络通信</li>
                  <li>行为分析：分析程序的运行行为和特征</li>
                  <li>API调用分析：分析程序的系统调用和API使用</li>
                  <li>性能分析：分析程序的性能特征和瓶颈</li>
                </ul>
              </div>

              <h4 className="font-semibold">4. 逆向工程的法律和道德问题</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ul className="list-disc pl-6 mb-4">
                  <li>知识产权保护：尊重软件的知识产权</li>
                  <li>法律合规：遵守相关法律法规</li>
                  <li>道德准则：遵循职业道德和行业规范</li>
                  <li>授权许可：确保有合法的授权进行逆向分析</li>
                  <li>数据保护：保护分析过程中获取的敏感信息</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "tools" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">常用工具</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 反汇编工具</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">IDA Pro</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>功能最强大的交互式反汇编器</li>
                  <li>支持多种处理器架构</li>
                  <li>提供图形化界面和脚本扩展</li>
                  <li>具有强大的分析功能和插件系统</li>
                  <li>支持反编译和调试功能</li>
                </ul>

                <h5 className="font-semibold mb-2">Ghidra</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>NSA开发的开源软件逆向工具</li>
                  <li>支持多种文件格式和处理器架构</li>
                  <li>提供反编译和调试功能</li>
                  <li>具有协作功能和脚本扩展</li>
                  <li>支持插件开发</li>
                </ul>

                <h5 className="font-semibold mb-2">Radare2</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>开源的反汇编和调试框架</li>
                  <li>命令行界面，适合自动化分析</li>
                  <li>支持多种文件格式和处理器架构</li>
                  <li>提供脚本扩展和插件系统</li>
                  <li>具有强大的分析功能</li>
                </ul>
              </div>

              <h4 className="font-semibold">2. 调试工具</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">OllyDbg</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>Windows平台下的32位调试器</li>
                  <li>界面友好，易于使用</li>
                  <li>支持插件扩展</li>
                  <li>提供反汇编和调试功能</li>
                  <li>适合初学者使用</li>
                </ul>

                <h5 className="font-semibold mb-2">x64dbg</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>开源Windows调试器</li>
                  <li>支持32位和64位程序</li>
                  <li>提供反汇编和调试功能</li>
                  <li>支持插件扩展</li>
                  <li>界面现代化，功能强大</li>
                </ul>

                <h5 className="font-semibold mb-2">GDB</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>GNU调试器，跨平台</li>
                  <li>支持多种处理器架构</li>
                  <li>提供丰富的调试命令</li>
                  <li>支持远程调试</li>
                  <li>适合Linux平台使用</li>
                </ul>
              </div>

              <h4 className="font-semibold">3. 网络分析工具</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">Wireshark</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>功能强大的网络协议分析器</li>
                  <li>支持多种协议解析</li>
                  <li>提供实时捕获和分析功能</li>
                  <li>支持过滤和搜索功能</li>
                  <li>适合网络协议分析</li>
                </ul>

                <h5 className="font-semibold mb-2">Fiddler</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>Web调试代理工具</li>
                  <li>支持HTTP/HTTPS流量分析</li>
                  <li>提供请求修改和重放功能</li>
                  <li>支持脚本扩展</li>
                  <li>适合Web应用分析</li>
                </ul>

                <h5 className="font-semibold mb-2">Burp Suite</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>Web应用安全测试工具</li>
                  <li>提供代理、扫描、爬虫等功能</li>
                  <li>支持插件扩展</li>
                  <li>适合Web安全测试</li>
                  <li>提供专业版和社区版</li>
                </ul>
              </div>

              <h4 className="font-semibold">4. 其他实用工具</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">PE Explorer</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>PE文件分析工具</li>
                  <li>查看资源、导入导出表</li>
                  <li>支持反汇编功能</li>
                  <li>提供十六进制编辑器</li>
                </ul>

                <h5 className="font-semibold mb-2">Process Monitor</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>系统活动监控工具</li>
                  <li>跟踪文件系统活动</li>
                  <li>监控注册表访问</li>
                  <li>分析程序行为</li>
                </ul>

                <h5 className="font-semibold mb-2">HxD</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>十六进制编辑器</li>
                  <li>支持大文件编辑</li>
                  <li>提供数据比较功能</li>
                  <li>支持磁盘编辑</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "techniques" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">逆向工程技术</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 静态分析技术</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">代码分析</h5>
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 1. 识别关键函数
void main() {
    // 分析程序入口点
    // 识别关键函数调用
    // 分析控制流
}

// 2. 字符串分析
// 查找硬编码的字符串
const char* password = "admin123";
const char* api_key = "xyz123";

// 3. 资源分析
// 分析程序资源
// 提取图标、图片等资源

// 4. 依赖分析
// 分析导入导出表
// 识别使用的库和函数`}</code>
                </pre>

                <h5 className="font-semibold mb-2">反混淆技术</h5>
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 1. 控制流平坦化
// 原始代码
if (condition) {
    do_something();
} else {
    do_else();
}

// 混淆后的代码
switch(state) {
    case 0:
        if (condition) state = 1;
        else state = 2;
        break;
    case 1:
        do_something();
        state = 3;
        break;
    case 2:
        do_else();
        state = 3;
        break;
    case 3:
        // 结束
        break;
}

// 2. 字符串加密
// 原始字符串
const char* str = "Hello World";

// 加密后的字符串
const char* encrypted = "H3ll0_W0rld";
const char* key = "XOR_KEY";`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">2. 动态分析技术</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">调试技术</h5>
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 1. 断点设置
breakpoint main
breakpoint 0x401000

// 2. 内存分析
// 查看内存内容
x/10x $esp
x/10i $eip

// 3. 寄存器分析
// 查看寄存器状态
info registers
print $eax

// 4. 栈分析
// 查看栈内容
x/20x $esp
backtrace`}</code>
                </pre>

                <h5 className="font-semibold mb-2">行为分析</h5>
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 1. API调用跟踪
// 监控系统调用
ntdll!NtCreateFile
kernel32!CreateFileA

// 2. 网络通信分析
// 监控网络连接
connect(ip, port)
send(data)
recv(buffer)

// 3. 文件操作分析
// 监控文件访问
CreateFile
ReadFile
WriteFile`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">3. 高级分析技术</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">反调试技术</h5>
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 1. 检测调试器
IsDebuggerPresent()
CheckRemoteDebuggerPresent()

// 2. 时间检测
GetTickCount()
QueryPerformanceCounter()

// 3. 异常处理
try {
    // 可能触发异常的代码
} catch {
    // 处理异常
}`}</code>
                </pre>

                <h5 className="font-semibold mb-2">代码注入技术</h5>
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 1. DLL注入
LoadLibrary()
CreateRemoteThread()

// 2. 代码注入
WriteProcessMemory()
VirtualAllocEx()

// 3. API钩子
SetWindowsHookEx()
DetourAttach()`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === "practice" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">实践案例</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 简单程序分析</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 示例程序
#include <stdio.h>
#include <string.h>

int check_password(const char* input) {
    const char* password = "secret123";
    return strcmp(input, password) == 0;
}

int main() {
    char input[100];
    printf("Enter password: ");
    scanf("%s", input);
    
    if (check_password(input)) {
        printf("Access granted!\n");
    } else {
        printf("Access denied!\n");
    }
    return 0;
}

// 分析步骤：
// 1. 使用IDA Pro加载程序
// 2. 定位main函数
// 3. 分析check_password函数
// 4. 查找硬编码的密码
// 5. 使用调试器跟踪程序执行`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">2. 网络协议分析</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 示例：分析网络通信
// 1. 使用Wireshark捕获流量
// 2. 分析协议格式
// 3. 识别关键数据包
// 4. 分析数据包内容

// 示例数据包格式
struct Packet {
    uint32_t magic;      // 魔数：0x12345678
    uint16_t type;       // 包类型
    uint16_t length;     // 数据长度
    uint8_t data[];      // 数据内容
};

// 分析步骤：
// 1. 识别协议特征
// 2. 分析数据包结构
// 3. 提取关键信息
// 4. 重现通信过程`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">3. 恶意软件分析</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 示例：分析恶意软件
// 1. 静态分析
// - 使用IDA Pro分析代码
// - 识别关键函数
// - 分析字符串和资源
// - 分析导入导出表

// 2. 动态分析
// - 使用调试器跟踪执行
// - 监控系统调用
// - 分析网络通信
// - 观察文件操作

// 3. 行为分析
// - 记录程序行为
// - 分析感染机制
// - 识别传播方式
// - 提取特征码`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">4. 软件保护分析</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 示例：分析软件保护
// 1. 分析保护机制
// - 识别加密算法
// - 分析授权验证
// - 检查反调试措施
// - 分析代码混淆

// 2. 破解技术
// - 绕过授权验证
// - 修改关键代码
// - 提取加密密钥
// - 去除保护措施

// 3. 防护建议
// - 加强代码混淆
// - 使用硬件绑定
// - 实现完整性检查
// - 添加反调试措施`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 导航链接 */}
      <div className="mt-8 flex justify-between">
        <Link
          href="/study/security/reverse/basic"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 逆向工程基础
        </Link>
        <Link
          href="/study/security/reverse/assembly"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          汇编语言基础 →
        </Link>
      </div>
    </div>
  );
} 
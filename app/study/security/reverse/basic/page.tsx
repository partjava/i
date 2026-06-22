'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookAlert, BookList,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: '逆向工程基础',
  chapterNumber: 1,
  totalChapters: 10,
  subjectHref: '/study/security/reverse',
  nextChapter: { label: '汇编语言基础', href: '/study/security/reverse/assembly' },
  theme: THEMES.security,
}

const staticCode = `// 1. 识别关键函数
void main() {
    // 分析程序入口点
    // 识别关键函数调用
    // 分析控制流
}

// 2. 字符串分析
const char* password = "admin123";
const char* api_key = "xyz123";

// 3. 资源分析
// 分析程序资源，提取图标、图片等资源

// 4. 依赖分析
// 分析导入导出表，识别使用的库和函数`

const deobfuscationCode = `// 1. 控制流平坦化
// 原始代码
if (condition) { do_something(); }
else { do_else(); }

// 混淆后的代码
switch(state) {
    case 0: if (condition) state = 1; else state = 2; break;
    case 1: do_something(); state = 3; break;
    case 2: do_else(); state = 3; break;
    case 3: break;
}

// 2. 字符串加密
const char* str = "Hello World";           // 原始字符串
const char* encrypted = "H3ll0_W0rld";    // 加密后的字符串`

const debugCode = `// 1. 断点设置
breakpoint main
breakpoint 0x401000

// 2. 内存分析
x/10x $esp    // 查看栈顶内存
x/10i $eip    // 查看当前指令

// 3. 寄存器分析
info registers
print $eax

// 4. 栈分析
x/20x $esp
backtrace`

const behaviorCode = `// 1. API调用跟踪
ntdll!NtCreateFile
kernel32!CreateFileA

// 2. 网络通信分析
connect(ip, port)
send(data)
recv(buffer)

// 3. 文件操作分析
CreateFile
ReadFile
WriteFile`

const antiDebugCode = `// 1. 检测调试器
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
}`

const injectCode = `// 1. DLL注入
LoadLibrary()
CreateRemoteThread()

// 2. 代码注入
WriteProcessMemory()
VirtualAllocEx()

// 3. API钩子
SetWindowsHookEx()
DetourAttach()`

const SPREADS = [
  {
    label: '概述',
    left: (
      <div className="space-y-4">
        <PageTitle>逆向工程概述</PageTitle>
        <SectionTitle>1. 什么是逆向工程</SectionTitle>
        <BookParagraph>
          逆向工程是通过分析软件、硬件或系统的结构和功能，以理解其工作原理的过程。在安全领域，逆向工程是理解恶意软件、发现漏洞和进行安全评估的重要工具。
        </BookParagraph>
        <SectionTitle>2. 应用领域</SectionTitle>
        <BookList items={[
          '恶意软件分析：分析病毒、木马等恶意程序的行为和特征',
          '漏洞挖掘：发现软件中的安全漏洞和缺陷',
          '软件保护机制研究：分析软件的保护措施和破解方法',
          '协议分析：理解网络协议和通信机制',
          '固件分析：分析嵌入式设备的固件和功能',
          '软件兼容性研究 / 性能优化 / 知识产权保护',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>3. 逆向工程的基本概念</SectionTitle>
        <BookAlert type="info" message="静态分析：在不运行程序的情况下分析代码，包括反汇编分析、代码结构分析、字符串分析、资源分析、符号分析和依赖分析。" />
        <BookAlert type="info" message="动态分析：在程序运行时进行分析，包括调试分析、内存分析、网络流量分析、行为分析、API调用分析和性能分析。" />
        <SectionTitle>4. 法律和道德问题</SectionTitle>
        <BookList items={[
          '知识产权保护：尊重软件的知识产权',
          '法律合规：遵守相关法律法规',
          '道德准则：遵循职业道德和行业规范',
          '授权许可：确保有合法的授权进行逆向分析',
          '数据保护：保护分析过程中获取的敏感信息',
        ]} />
      </div>
    ),
  },
  {
    label: '工具',
    left: (
      <div className="space-y-4">
        <PageTitle>常用工具</PageTitle>
        <SectionTitle>1. 反汇编工具</SectionTitle>
        <SectionTitle>IDA Pro</SectionTitle>
        <BookList items={['功能最强大的交互式反汇编器', '支持多种处理器架构', '提供图形化界面和脚本扩展', '具有强大的分析功能和插件系统', '支持反编译和调试功能']} />
        <SectionTitle>Ghidra</SectionTitle>
        <BookList items={['NSA开发的开源软件逆向工具', '支持多种文件格式和处理器架构', '提供反编译和调试功能', '具有协作功能和脚本扩展']} />
        <SectionTitle>Radare2</SectionTitle>
        <BookList items={['开源的反汇编和调试框架', '命令行界面，适合自动化分析', '支持多种文件格式和处理器架构', '提供脚本扩展和插件系统']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>2. 调试工具</SectionTitle>
        <BookList items={[
          'OllyDbg：Windows平台32位调试器，界面友好，适合初学者',
          'x64dbg：开源Windows调试器，支持32/64位，功能强大',
          'GDB：GNU调试器，跨平台，支持多种架构，适合Linux',
        ]} />
        <SectionTitle>3. 网络分析工具</SectionTitle>
        <BookList items={[
          'Wireshark：功能强大的网络协议分析器',
          'Fiddler：Web调试代理工具，支持HTTP/HTTPS',
          'Burp Suite：Web应用安全测试工具',
        ]} />
        <SectionTitle>4. 其他实用工具</SectionTitle>
        <BookList items={[
          'PE Explorer：PE文件分析工具',
          'Process Monitor：系统活动监控工具',
          'HxD：十六进制编辑器',
        ]} />
      </div>
    ),
  },
  {
    label: '技术',
    left: (
      <div className="space-y-4">
        <PageTitle>逆向工程技术</PageTitle>
        <SectionTitle>1. 静态分析技术</SectionTitle>
        <BookCode language="cpp" code={staticCode} />
        <SectionTitle>反混淆技术</SectionTitle>
        <BookCode language="cpp" code={deobfuscationCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>2. 动态分析技术</SectionTitle>
        <SectionTitle>调试技术</SectionTitle>
        <BookCode language="asm" code={debugCode} />
        <SectionTitle>行为分析</SectionTitle>
        <BookCode language="cpp" code={behaviorCode} />
      </div>
    ),
  },
  {
    label: '实践',
    left: (
      <div className="space-y-4">
        <PageTitle>实践案例</PageTitle>
        <SectionTitle>1. 简单程序分析</SectionTitle>
        <BookCode language="cpp" code={`#include <stdio.h>
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
        printf("Access granted!\\n");
    } else {
        printf("Access denied!\\n");
    }
    return 0;
}`} />
        <BookList items={['使用IDA Pro加载程序', '定位main函数', '分析check_password函数', '查找硬编码的密码', '使用调试器跟踪程序执行']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>2. 网络协议分析</SectionTitle>
        <BookAlert type="info" message="使用Wireshark捕获流量 → 分析协议格式 → 识别关键数据包 → 分析数据包内容。示例数据包格式：魔数0x12345678、包类型、数据长度、数据内容。" />
        <SectionTitle>3. 恶意软件分析</SectionTitle>
        <BookList items={[
          '静态分析：使用IDA Pro分析代码，识别关键函数和字符串',
          '动态分析：使用调试器跟踪执行，监控系统调用',
          '行为分析：记录程序行为，分析感染机制，提取特征码',
        ]} />
        <SectionTitle>4. 软件保护分析</SectionTitle>
        <BookList items={[
          '分析保护机制：识别加密算法、授权验证、反调试措施',
          '破解技术：绕过授权验证、修改关键代码、提取加密密钥',
          '防护建议：加强代码混淆、使用硬件绑定、实现完整性检查',
        ]} />
      </div>
    ),
  },
]

export default function ReverseEngineeringBasicPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

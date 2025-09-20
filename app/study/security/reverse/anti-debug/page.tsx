"use client";
import { useState } from "react";
import Link from "next/link";

export default function AntiDebugPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">反调试技术</h1>
      
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
          onClick={() => setActiveTab("techniques")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "techniques"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          技术原理
        </button>
        <button
          onClick={() => setActiveTab("detection")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "detection"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          检测方法
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
            <h3 className="text-xl font-semibold mb-3">反调试技术概述</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 什么是反调试技术</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="mb-4">
                  反调试技术是一系列用于检测和阻止程序被调试器分析的技术手段。这些技术主要用于保护软件的知识产权、防止逆向工程和恶意代码分析。
                </p>

                <h5 className="font-semibold mb-2">主要目的</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>保护知识产权
                    <ul className="list-disc pl-6 mt-2">
                      <li>防止代码被逆向分析</li>
                      <li>保护核心算法</li>
                      <li>防止破解和盗版</li>
                    </ul>
                  </li>
                  <li>增强安全性
                    <ul className="list-disc pl-6 mt-2">
                      <li>防止恶意代码分析</li>
                      <li>保护敏感数据</li>
                      <li>防止漏洞利用</li>
                    </ul>
                  </li>
                  <li>防止篡改
                    <ul className="list-disc pl-6 mt-2">
                      <li>检测程序修改</li>
                      <li>防止补丁注入</li>
                      <li>保护程序完整性</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <h4 className="font-semibold">2. 反调试技术的分类</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ul className="list-disc pl-6 mb-4">
                  <li>调试器检测
                    <ul className="list-disc pl-6 mt-2">
                      <li>进程检测</li>
                      <li>窗口检测</li>
                      <li>特征检测</li>
                    </ul>
                  </li>
                  <li>时间检测
                    <ul className="list-disc pl-6 mt-2">
                      <li>时间戳检测</li>
                      <li>执行时间检测</li>
                      <li>定时器检测</li>
                    </ul>
                  </li>
                  <li>环境检测
                    <ul className="list-disc pl-6 mt-2">
                      <li>虚拟机检测</li>
                      <li>沙箱检测</li>
                      <li>系统特征检测</li>
                    </ul>
                  </li>
                  <li>代码保护
                    <ul className="list-disc pl-6 mt-2">
                      <li>代码混淆</li>
                      <li>加密保护</li>
                      <li>完整性校验</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "techniques" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">技术原理</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. Windows平台反调试技术</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">API检测</h5>
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 检测调试器API示例
BOOL IsDebuggerPresent() {
    return ::IsDebuggerPresent();
}

BOOL CheckRemoteDebugger() {
    BOOL isDebuggerPresent = FALSE;
    CheckRemoteDebuggerPresent(GetCurrentProcess(), &isDebuggerPresent);
    return isDebuggerPresent;
}

// 检测调试器窗口
BOOL FindDebuggerWindow() {
    HWND hwnd = FindWindowA("OllyDbg", NULL);
    if (hwnd) return TRUE;
    
    hwnd = FindWindowA("x64dbg", NULL);
    if (hwnd) return TRUE;
    
    return FALSE;
}`}</code>
                </pre>

                <h5 className="font-semibold mb-2">PEB检测</h5>
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 通过PEB检测调试器
BOOL CheckPEB() {
    BOOL isDebugged = FALSE;
    
    // 获取PEB
    PPEB pPeb = (PPEB)__readgsqword(0x60);
    
    // 检查BeingDebugged标志
    if (pPeb->BeingDebugged) {
        isDebugged = TRUE;
    }
    
    // 检查NtGlobalFlag
    if (pPeb->NtGlobalFlag & 0x70) {
        isDebugged = TRUE;
    }
    
    return isDebugged;
}`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">2. Linux平台反调试技术</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">ptrace检测</h5>
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 使用ptrace检测调试器
bool isDebuggerAttached() {
    if (ptrace(PTRACE_TRACEME, 0, 0, 0) == -1) {
        return true;  // 调试器已附加
    }
    
    // 解除跟踪
    ptrace(PTRACE_TRACEME, 0, 0, 0);
    return false;
}

// 检查/proc/self/status
bool checkProcStatus() {
    FILE* fp = fopen("/proc/self/status", "r");
    if (!fp) return false;
    
    char line[256];
    while (fgets(line, sizeof(line), fp)) {
        if (strncmp(line, "TracerPid:", 10) == 0) {
            int tracerPid = atoi(line + 10);
            fclose(fp);
            return tracerPid != 0;
        }
    }
    
    fclose(fp);
    return false;
}`}</code>
                </pre>

                <h5 className="font-semibold mb-2">时间检测</h5>
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 使用时间检测调试器
bool checkTiming() {
    struct timespec start, end;
    clock_gettime(CLOCK_MONOTONIC, &start);
    
    // 执行一些操作
    for (int i = 0; i < 1000000; i++) {
        __asm__ __volatile__("nop");
    }
    
    clock_gettime(CLOCK_MONOTONIC, &end);
    
    // 计算执行时间
    double elapsed = (end.tv_sec - start.tv_sec) +
                    (end.tv_nsec - start.tv_nsec) / 1e9;
    
    // 如果执行时间过长，可能被调试
    return elapsed > 0.1;  // 阈值可调整
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === "detection" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">检测方法</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 调试器特征检测</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">进程检测</h5>
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 检测常见调试器进程
bool checkDebuggerProcess() {
    const char* debuggers[] = {
        "ollydbg.exe",
        "x64dbg.exe",
        "ida.exe",
        "ida64.exe",
        "windbg.exe",
        "radare2.exe",
        "gdb.exe"
    };
    
    HANDLE snapshot = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);
    if (snapshot == INVALID_HANDLE_VALUE) return false;
    
    PROCESSENTRY32W processEntry;
    processEntry.dwSize = sizeof(processEntry);
    
    if (Process32FirstW(snapshot, &processEntry)) {
        do {
            for (const char* debugger : debuggers) {
                if (_wcsicmp(processEntry.szExeFile, debugger) == 0) {
                    CloseHandle(snapshot);
                    return true;
                }
            }
        } while (Process32NextW(snapshot, &processEntry));
    }
    
    CloseHandle(snapshot);
    return false;
}`}</code>
                </pre>

                <h5 className="font-semibold mb-2">窗口检测</h5>
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 检测调试器窗口
bool checkDebuggerWindows() {
    const char* windowClasses[] = {
        "OLLYDBG",
        "IDALog",
        "IDALog64",
        "IDARegister",
        "IDARegister64",
        "IDADisassembly",
        "IDADisassembly64",
        "IDAView",
        "IDAView64",
        "IDAHexView",
        "IDAHexView64",
        "IDAGraph",
        "IDAGraph64"
    };
    
    for (const char* className : windowClasses) {
        if (FindWindowA(className, NULL)) {
            return true;
        }
    }
    
    return false;
}`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">2. 环境检测</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">虚拟机检测</h5>
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 检测虚拟机
bool checkVirtualMachine() {
    // 检查常见虚拟机特征
    const char* vmSignatures[] = {
        "VMware",
        "VBox",
        "QEMU",
        "Xen",
        "innotek"
    };
    
    // 检查系统信息
    char computerName[MAX_COMPUTERNAME_LENGTH + 1];
    DWORD size = sizeof(computerName);
    GetComputerNameA(computerName, &size);
    
    for (const char* signature : vmSignatures) {
        if (strstr(computerName, signature)) {
            return true;
        }
    }
    
    // 检查设备
    HANDLE hDevice = CreateFileA("\\\\.\\VBoxMiniRdrDN", 
                                GENERIC_READ, 
                                FILE_SHARE_READ | FILE_SHARE_WRITE, 
                                NULL, 
                                OPEN_EXISTING, 
                                0, 
                                NULL);
    if (hDevice != INVALID_HANDLE_VALUE) {
        CloseHandle(hDevice);
        return true;
    }
    
    return false;
}`}</code>
                </pre>

                <h5 className="font-semibold mb-2">沙箱检测</h5>
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 检测沙箱环境
bool checkSandbox() {
    // 检查系统资源
    SYSTEM_INFO sysInfo;
    GetSystemInfo(&sysInfo);
    
    // 检查CPU核心数
    if (sysInfo.dwNumberOfProcessors < 2) {
        return true;
    }
    
    // 检查内存大小
    MEMORYSTATUSEX memInfo;
    memInfo.dwLength = sizeof(memInfo);
    GlobalMemoryStatusEx(&memInfo);
    
    if (memInfo.ullTotalPhys < 2 * 1024 * 1024 * 1024) { // 2GB
        return true;
    }
    
    // 检查磁盘空间
    ULARGE_INTEGER freeBytesAvailable;
    ULARGE_INTEGER totalBytes;
    ULARGE_INTEGER totalFreeBytes;
    
    if (GetDiskFreeSpaceExA("C:\\", 
                           &freeBytesAvailable, 
                           &totalBytes, 
                           &totalFreeBytes)) {
        if (totalBytes.QuadPart < 60 * 1024 * 1024 * 1024) { // 60GB
            return true;
        }
    }
    
    return false;
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === "practice" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">实践案例</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 综合反调试示例</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 综合反调试类
class AntiDebug {
private:
    // 调试器检测
    bool checkDebugger() {
        if (IsDebuggerPresent()) return true;
        if (checkRemoteDebugger()) return true;
        if (checkPEB()) return true;
        if (checkDebuggerProcess()) return true;
        if (checkDebuggerWindows()) return true;
        return false;
    }
    
    // 时间检测
    bool checkTiming() {
        LARGE_INTEGER freq, start, end;
        QueryPerformanceFrequency(&freq);
        QueryPerformanceCounter(&start);
        
        // 执行一些操作
        for (int i = 0; i < 1000000; i++) {
            __asm__ __volatile__("nop");
        }
        
        QueryPerformanceCounter(&end);
        
        double elapsed = (end.QuadPart - start.QuadPart) * 1000.0 / freq.QuadPart;
        return elapsed > 100.0; // 100ms阈值
    }
    
    // 环境检测
    bool checkEnvironment() {
        if (checkVirtualMachine()) return true;
        if (checkSandbox()) return true;
        return false;
    }
    
public:
    // 执行所有检测
    bool isBeingDebugged() {
        if (checkDebugger()) return true;
        if (checkTiming()) return true;
        if (checkEnvironment()) return true;
        return false;
    }
    
    // 反调试处理
    void handleAntiDebug() {
        if (isBeingDebugged()) {
            // 可以采取的措施
            // 1. 退出程序
            ExitProcess(0);
            
            // 2. 执行假代码
            // executeFakeCode();
            
            // 3. 清除敏感数据
            // clearSensitiveData();
            
            // 4. 触发蓝屏
            // triggerBlueScreen();
        }
    }
};`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">2. 反调试绕过技术</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 反调试绕过示例
class AntiDebugBypass {
private:
    // 修改PEB标志
    void patchPEB() {
        PPEB pPeb = (PPEB)__readgsqword(0x60);
        pPeb->BeingDebugged = 0;
        pPeb->NtGlobalFlag &= ~0x70;
    }
    
    // 修改调试器检测API
    void hookDebuggerAPI() {
        // 使用Inline Hook修改IsDebuggerPresent返回值
        BYTE patch[] = {0x31, 0xC0, 0xC3}; // xor eax, eax; ret
        WriteProcessMemory(GetCurrentProcess(),
                          (LPVOID)IsDebuggerPresent,
                          patch,
                          sizeof(patch),
                          NULL);
    }
    
    // 修改时间检测
    void patchTiming() {
        // 使用API Hook修改GetTickCount返回值
        // 或修改QueryPerformanceCounter返回值
    }
    
public:
    // 执行所有绕过
    void bypassAntiDebug() {
        patchPEB();
        hookDebuggerAPI();
        patchTiming();
    }
};`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 导航链接 */}
      <div className="mt-8 flex justify-between">
        <Link
          href="/study/security/reverse/static"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 静态分析技术
        </Link>
        <Link
          href="/study/security/reverse/pack"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          加壳脱壳 →
        </Link>
      </div>
    </div>
  );
} 
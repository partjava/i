'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookAlert, BookList,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: '反调试技术',
  chapterNumber: 7,
  totalChapters: 10,
  subjectHref: '/study/security/reverse',
  prevChapter: { label: '静态分析技术', href: '/study/security/reverse/static' },
  nextChapter: { label: '加壳脱壳', href: '/study/security/reverse/pack' },
  theme: THEMES.security,
}

const apiDetectionCode = `// 检测调试器API示例
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
}`

const pebDetectionCode = `// 通过PEB检测调试器
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
}`

const ptraceCode = `// 使用ptrace检测调试器
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
}`

const timingCode = `// 使用时间检测调试器
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
}`

const processDetectionCode = `// 检测常见调试器进程
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
}`

const windowDetectionCode = `// 检测调试器窗口
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
}`

const vmDetectionCode = `// 检测虚拟机
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
}`

const sandboxCode = `// 检测沙箱环境
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
}`

const antiDebugClassCode = `// 综合反调试类
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
};`

const bypassCode = `// 反调试绕过示例
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
};`

const SPREADS = [
  {
    label: '概述',
    left: (
      <div className="space-y-4">
        <PageTitle>反调试技术概述</PageTitle>
        <SectionTitle>1. 什么是反调试技术</SectionTitle>
        <BookParagraph>
          反调试技术是一系列用于检测和阻止程序被调试器分析的技术手段。这些技术主要用于保护软件的知识产权、防止逆向工程和恶意代码分析。
        </BookParagraph>
        <SectionTitle>主要目的</SectionTitle>
        <BookList items={[
          '保护知识产权：防止代码被逆向分析、保护核心算法、防止破解和盗版',
          '增强安全性：防止恶意代码分析、保护敏感数据、防止漏洞利用',
          '防止篡改：检测程序修改、防止补丁注入、保护程序完整性',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>2. 反调试技术的分类</SectionTitle>
        <BookList items={[
          '调试器检测：进程检测、窗口检测、特征检测',
          '时间检测：时间戳检测、执行时间检测、定时器检测',
          '环境检测：虚拟机检测、沙箱检测、系统特征检测',
          '代码保护：代码混淆、加密保护、完整性校验',
        ]} />
      </div>
    ),
  },
  {
    label: '技术原理',
    left: (
      <div className="space-y-4">
        <PageTitle>技术原理</PageTitle>
        <SectionTitle>1. Windows平台反调试技术</SectionTitle>
        <SectionTitle>API检测</SectionTitle>
        <BookCode language="cpp" code={apiDetectionCode} />
        <SectionTitle>PEB检测</SectionTitle>
        <BookCode language="cpp" code={pebDetectionCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>2. Linux平台反调试技术</SectionTitle>
        <SectionTitle>ptrace检测</SectionTitle>
        <BookCode language="cpp" code={ptraceCode} />
        <SectionTitle>时间检测</SectionTitle>
        <BookCode language="cpp" code={timingCode} />
      </div>
    ),
  },
  {
    label: '检测方法',
    left: (
      <div className="space-y-4">
        <PageTitle>检测方法</PageTitle>
        <SectionTitle>1. 调试器特征检测</SectionTitle>
        <SectionTitle>进程检测</SectionTitle>
        <BookCode language="cpp" code={processDetectionCode} />
        <SectionTitle>窗口检测</SectionTitle>
        <BookCode language="cpp" code={windowDetectionCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>2. 环境检测</SectionTitle>
        <SectionTitle>虚拟机检测</SectionTitle>
        <BookCode language="cpp" code={vmDetectionCode} />
        <SectionTitle>沙箱检测</SectionTitle>
        <BookCode language="cpp" code={sandboxCode} />
      </div>
    ),
  },
  {
    label: '实践案例',
    left: (
      <div className="space-y-4">
        <PageTitle>实践案例</PageTitle>
        <SectionTitle>1. 综合反调试示例</SectionTitle>
        <BookCode language="cpp" code={antiDebugClassCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>2. 反调试绕过技术</SectionTitle>
        <BookCode language="cpp" code={bypassCode} />
      </div>
    ),
  },
]

export default function AntiDebugPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

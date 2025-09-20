"use client";
import { useState } from "react";
import Link from "next/link";

export default function DynamicAnalysisPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">动态分析技术</h1>
      
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
          调试工具
        </button>
        <button
          onClick={() => setActiveTab("techniques")}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "techniques"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          分析技术
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
            <h3 className="text-xl font-semibold mb-3">动态分析概述</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 什么是动态分析</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="mb-4">
                  动态分析是在程序运行时对其行为进行分析的技术。通过观察程序的实际执行过程，可以获取程序的运行时特征、数据流向、API调用等信息。动态分析是逆向工程中不可或缺的重要手段。
                </p>

                <h5 className="font-semibold mb-2">主要特点</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>实时性
                    <ul className="list-disc pl-6 mt-2">
                      <li>观察程序实际运行状态</li>
                      <li>获取运行时数据</li>
                      <li>分析程序行为</li>
                    </ul>
                  </li>
                  <li>交互性
                    <ul className="list-disc pl-6 mt-2">
                      <li>可以控制程序执行</li>
                      <li>修改运行时数据</li>
                      <li>注入代码和补丁</li>
                    </ul>
                  </li>
                  <li>准确性
                    <ul className="list-disc pl-6 mt-2">
                      <li>直接观察真实行为</li>
                      <li>获取实际数据</li>
                      <li>验证分析结果</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <h4 className="font-semibold">2. 动态分析的应用场景</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ul className="list-disc pl-6 mb-4">
                  <li>漏洞分析
                    <ul className="list-disc pl-6 mt-2">
                      <li>定位漏洞触发点</li>
                      <li>分析漏洞成因</li>
                      <li>验证漏洞利用</li>
                    </ul>
                  </li>
                  <li>恶意代码分析
                    <ul className="list-disc pl-6 mt-2">
                      <li>行为分析</li>
                      <li>网络通信</li>
                      <li>文件操作</li>
                    </ul>
                  </li>
                  <li>程序调试
                    <ul className="list-disc pl-6 mt-2">
                      <li>定位程序错误</li>
                      <li>分析崩溃原因</li>
                      <li>性能分析</li>
                    </ul>
                  </li>
                  <li>API监控
                    <ul className="list-disc pl-6 mt-2">
                      <li>系统调用跟踪</li>
                      <li>库函数调用</li>
                      <li>参数分析</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <h4 className="font-semibold">3. 动态分析的基本流程</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ul className="list-disc pl-6 mb-4">
                  <li>环境准备
                    <ul className="list-disc pl-6 mt-2">
                      <li>调试器配置</li>
                      <li>监控工具设置</li>
                      <li>虚拟机环境</li>
                    </ul>
                  </li>
                  <li>运行控制
                    <ul className="list-disc pl-6 mt-2">
                      <li>断点设置</li>
                      <li>单步执行</li>
                      <li>条件中断</li>
                    </ul>
                  </li>
                  <li>数据分析
                    <ul className="list-disc pl-6 mt-2">
                      <li>内存检查</li>
                      <li>寄存器分析</li>
                      <li>调用栈分析</li>
                    </ul>
                  </li>
                  <li>行为分析
                    <ul className="list-disc pl-6 mt-2">
                      <li>API调用序列</li>
                      <li>数据流向</li>
                      <li>控制流程</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "tools" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">调试工具</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 调试器</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">GDB</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>基本功能
                    <ul className="list-disc pl-6 mt-2">
                      <li>断点管理</li>
                      <li>单步执行</li>
                      <li>变量查看</li>
                      <li>内存检查</li>
                    </ul>
                  </li>
                  <li>高级特性
                    <ul className="list-disc pl-6 mt-2">
                      <li>条件断点</li>
                      <li>反向调试</li>
                      <li>Python脚本</li>
                      <li>远程调试</li>
                    </ul>
                  </li>
                </ul>

                <h5 className="font-semibold mb-2">LLDB</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>基本功能
                    <ul className="list-disc pl-6 mt-2">
                      <li>源码级调试</li>
                      <li>断点设置</li>
                      <li>数据查看</li>
                      <li>表达式求值</li>
                    </ul>
                  </li>
                  <li>高级特性
                    <ul className="list-disc pl-6 mt-2">
                      <li>自定义命令</li>
                      <li>Python API</li>
                      <li>插件系统</li>
                      <li>性能分析</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <h4 className="font-semibold">2. 动态分析工具</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">Strace</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>系统调用跟踪</li>
                  <li>信号处理</li>
                  <li>进程跟踪</li>
                  <li>性能统计</li>
                </ul>

                <h5 className="font-semibold mb-2">Ltrace</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>库函数跟踪</li>
                  <li>参数显示</li>
                  <li>返回值分析</li>
                  <li>统计信息</li>
                </ul>

                <h5 className="font-semibold mb-2">Valgrind</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>内存检查</li>
                  <li>内存泄漏</li>
                  <li>线程错误</li>
                  <li>性能分析</li>
                </ul>
              </div>

              <h4 className="font-semibold">3. 进程监控工具</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">Process Monitor</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>文件操作</li>
                  <li>注册表访问</li>
                  <li>网络活动</li>
                  <li>进程和线程</li>
                </ul>

                <h5 className="font-semibold mb-2">API Monitor</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>API调用跟踪</li>
                  <li>参数监控</li>
                  <li>返回值分析</li>
                  <li>调用栈跟踪</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "techniques" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">分析技术</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 基本调试技术</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">断点技术</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>软件断点
                    <ul className="list-disc pl-6 mt-2">
                      <li>INT 3指令</li>
                      <li>代码修改</li>
                      <li>临时断点</li>
                    </ul>
                  </li>
                  <li>硬件断点
                    <ul className="list-disc pl-6 mt-2">
                      <li>调试寄存器</li>
                      <li>内存访问</li>
                      <li>条件触发</li>
                    </ul>
                  </li>
                  <li>条件断点
                    <ul className="list-disc pl-6 mt-2">
                      <li>表达式判断</li>
                      <li>计数器</li>
                      <li>数据监控</li>
                    </ul>
                  </li>
                </ul>

                <h5 className="font-semibold mb-2">单步执行</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>指令级单步</li>
                  <li>过程级单步</li>
                  <li>源码级单步</li>
                  <li>条件执行</li>
                </ul>
              </div>

              <h4 className="font-semibold">2. 内存分析技术</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">内存查看</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>内存布局</li>
                  <li>数据结构</li>
                  <li>字符串搜索</li>
                  <li>模式匹配</li>
                </ul>

                <h5 className="font-semibold mb-2">内存修改</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>数据修改</li>
                  <li>代码修改</li>
                  <li>内存补丁</li>
                  <li>代码注入</li>
                </ul>
              </div>

              <h4 className="font-semibold">3. API监控技术</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">Hook技术</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>API Hook
                    <ul className="list-disc pl-6 mt-2">
                      <li>IAT Hook</li>
                      <li>Inline Hook</li>
                      <li>远程注入</li>
                    </ul>
                  </li>
                  <li>系统调用Hook
                    <ul className="list-disc pl-6 mt-2">
                      <li>SSDT Hook</li>
                      <li>Syscall Hook</li>
                      <li>驱动层Hook</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "practice" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">实践案例</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 基本调试实践</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`# GDB基本调试命令
$ gdb ./program
(gdb) break main
(gdb) run
(gdb) next
(gdb) step
(gdb) print variable
(gdb) x/10x $esp
(gdb) backtrace
(gdb) info registers
(gdb) continue`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">2. API监控实践</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`# Strace示例
$ strace -f -e trace=open,read,write ./program

# Ltrace示例
$ ltrace -f -e malloc+free+@libc.so.* ./program`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">3. 内存分析实践</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`# 使用Python进行内存分析
from ctypes import *
from pwn import *

def analyze_memory():
    # 启动进程
    p = process('./program')
    
    # 附加调试器
    gdb.attach(p, '''
        break *main
        continue
    ''')
    
    # 读取内存
    leak = p.read(8)
    addr = u64(leak)
    print(f"Leaked address: {hex(addr)}")
    
    # 修改内存
    payload = p64(addr)
    p.write(payload)
    
    # 继续执行
    p.interactive()

# 使用示例
analyze_memory()`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">4. 漏洞分析实践</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`# 使用GDB分析缓冲区溢出
$ gdb ./vulnerable_program
(gdb) run $(python -c 'print "A"*100')
(gdb) x/32x $esp
(gdb) info frame
(gdb) bt

# 使用Valgrind检测内存错误
$ valgrind --leak-check=full ./program`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 导航链接 */}
      <div className="mt-8 flex justify-between">
        <Link
          href="/study/security/reverse/elf"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← ELF文件分析
        </Link>
        <Link
          href="/study/security/reverse/static"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          静态分析技术 →
        </Link>
      </div>
    </div>
  );
} 
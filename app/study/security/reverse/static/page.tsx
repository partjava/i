"use client";
import { useState } from "react";
import Link from "next/link";

export default function StaticAnalysisPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">静态分析技术</h1>
      
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
          分析技术
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
            <h3 className="text-xl font-semibold mb-3">静态分析概述</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 什么是静态分析</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="mb-4">
                  静态分析是在不执行程序的情况下，通过分析程序的源代码、二进制代码或中间表示来理解程序的结构、行为和潜在问题的技术。它是软件安全分析和逆向工程中的重要方法。
                </p>

                <h5 className="font-semibold mb-2">主要特点</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>全面性
                    <ul className="list-disc pl-6 mt-2">
                      <li>分析所有可能的执行路径</li>
                      <li>发现潜在的问题和漏洞</li>
                      <li>理解程序整体结构</li>
                    </ul>
                  </li>
                  <li>安全性
                    <ul className="list-disc pl-6 mt-2">
                      <li>无需运行目标程序</li>
                      <li>避免恶意代码执行</li>
                      <li>保护分析环境</li>
                    </ul>
                  </li>
                  <li>可重复性
                    <ul className="list-disc pl-6 mt-2">
                      <li>分析结果稳定</li>
                      <li>便于自动化</li>
                      <li>支持持续集成</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <h4 className="font-semibold">2. 静态分析的应用场景</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ul className="list-disc pl-6 mb-4">
                  <li>代码审查
                    <ul className="list-disc pl-6 mt-2">
                      <li>代码质量评估</li>
                      <li>编码规范检查</li>
                      <li>最佳实践验证</li>
                    </ul>
                  </li>
                  <li>安全分析
                    <ul className="list-disc pl-6 mt-2">
                      <li>漏洞检测</li>
                      <li>恶意代码识别</li>
                      <li>安全策略验证</li>
                    </ul>
                  </li>
                  <li>逆向工程
                    <ul className="list-disc pl-6 mt-2">
                      <li>程序结构分析</li>
                      <li>算法识别</li>
                      <li>协议分析</li>
                    </ul>
                  </li>
                  <li>性能优化
                    <ul className="list-disc pl-6 mt-2">
                      <li>代码优化</li>
                      <li>资源使用分析</li>
                      <li>瓶颈识别</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <h4 className="font-semibold">3. 静态分析的基本流程</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ul className="list-disc pl-6 mb-4">
                  <li>预处理
                    <ul className="list-disc pl-6 mt-2">
                      <li>代码解析</li>
                      <li>中间表示生成</li>
                      <li>符号表构建</li>
                    </ul>
                  </li>
                  <li>分析阶段
                    <ul className="list-disc pl-6 mt-2">
                      <li>控制流分析</li>
                      <li>数据流分析</li>
                      <li>依赖分析</li>
                    </ul>
                  </li>
                  <li>结果生成
                    <ul className="list-disc pl-6 mt-2">
                      <li>问题报告</li>
                      <li>优化建议</li>
                      <li>文档生成</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "techniques" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">分析技术</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 控制流分析</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">基本概念</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>控制流图(CFG)
                    <ul className="list-disc pl-6 mt-2">
                      <li>基本块识别</li>
                      <li>跳转关系分析</li>
                      <li>循环结构识别</li>
                    </ul>
                  </li>
                  <li>路径分析
                    <ul className="list-disc pl-6 mt-2">
                      <li>可达性分析</li>
                      <li>路径约束求解</li>
                      <li>死代码检测</li>
                    </ul>
                  </li>
                </ul>

                <h5 className="font-semibold mb-2">应用场景</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>代码覆盖率分析</li>
                  <li>死代码消除</li>
                  <li>循环优化</li>
                  <li>漏洞检测</li>
                </ul>
              </div>

              <h4 className="font-semibold">2. 数据流分析</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">基本概念</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>定义-使用链
                    <ul className="list-disc pl-6 mt-2">
                      <li>变量定义点</li>
                      <li>使用点分析</li>
                      <li>数据依赖关系</li>
                    </ul>
                  </li>
                  <li>别名分析
                    <ul className="list-disc pl-6 mt-2">
                      <li>指针分析</li>
                      <li>引用分析</li>
                      <li>别名关系推导</li>
                    </ul>
                  </li>
                </ul>

                <h5 className="font-semibold mb-2">应用场景</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>变量未初始化检测</li>
                  <li>内存泄漏检测</li>
                  <li>数据竞争检测</li>
                  <li>代码优化</li>
                </ul>
              </div>

              <h4 className="font-semibold">3. 符号执行</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">基本概念</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>符号状态
                    <ul className="list-disc pl-6 mt-2">
                      <li>符号变量</li>
                      <li>路径约束</li>
                      <li>状态空间</li>
                    </ul>
                  </li>
                  <li>约束求解
                    <ul className="list-disc pl-6 mt-2">
                      <li>SMT求解器</li>
                      <li>路径可行性</li>
                      <li>反例生成</li>
                    </ul>
                  </li>
                </ul>

                <h5 className="font-semibold mb-2">应用场景</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>漏洞挖掘</li>
                  <li>测试用例生成</li>
                  <li>程序验证</li>
                  <li>反例构造</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "tools" && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">分析工具</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 代码分析工具</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">静态分析器</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>Clang Static Analyzer
                    <ul className="list-disc pl-6 mt-2">
                      <li>路径敏感分析</li>
                      <li>内存错误检测</li>
                      <li>空指针检查</li>
                    </ul>
                  </li>
                  <li>Coverity
                    <ul className="list-disc pl-6 mt-2">
                      <li>深度代码分析</li>
                      <li>安全漏洞检测</li>
                      <li>质量度量</li>
                    </ul>
                  </li>
                </ul>

                <h5 className="font-semibold mb-2">代码检查工具</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>SonarQube
                    <ul className="list-disc pl-6 mt-2">
                      <li>代码质量检查</li>
                      <li>安全漏洞扫描</li>
                      <li>技术债务分析</li>
                    </ul>
                  </li>
                  <li>PMD
                    <ul className="list-disc pl-6 mt-2">
                      <li>代码规范检查</li>
                      <li>最佳实践验证</li>
                      <li>自定义规则</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <h4 className="font-semibold">2. 二进制分析工具</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">反汇编器</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>IDA Pro
                    <ul className="list-disc pl-6 mt-2">
                      <li>交互式反汇编</li>
                      <li>代码分析</li>
                      <li>脚本扩展</li>
                    </ul>
                  </li>
                  <li>Ghidra
                    <ul className="list-disc pl-6 mt-2">
                      <li>开源反汇编</li>
                      <li>协作分析</li>
                      <li>插件系统</li>
                    </ul>
                  </li>
                </ul>

                <h5 className="font-semibold mb-2">符号执行工具</h5>
                <ul className="list-disc pl-6 mb-4">
                  <li>Angr
                    <ul className="list-disc pl-6 mt-2">
                      <li>二进制分析</li>
                      <li>符号执行</li>
                      <li>漏洞挖掘</li>
                    </ul>
                  </li>
                  <li>KLEE
                    <ul className="list-disc pl-6 mt-2">
                      <li>LLVM符号执行</li>
                      <li>测试生成</li>
                      <li>错误检测</li>
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
              <h4 className="font-semibold">1. 代码分析实践</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">使用Clang Static Analyzer</h5>
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 示例代码：包含潜在问题的C程序
#include <stdio.h>
#include <stdlib.h>

void memory_leak_example() {
    int* ptr = (int*)malloc(sizeof(int));
    *ptr = 42;
    // 内存泄漏：没有释放ptr
    return;
}

void null_pointer_example(int* ptr) {
    if (ptr == NULL) {
        printf("指针为空\n");
        return;
    }
    // 潜在的空指针解引用
    printf("值: %d\n", *ptr);
}

void buffer_overflow_example() {
    char buffer[10];
    // 潜在的缓冲区溢出
    strcpy(buffer, "这是一个很长的字符串");
}

int main() {
    memory_leak_example();
    null_pointer_example(NULL);
    buffer_overflow_example();
    return 0;
}

// 使用Clang Static Analyzer分析
$ clang --analyze source.c

// 分析结果示例
source.c:8:5: warning: Potential memory leak
    int* ptr = (int*)malloc(sizeof(int));
    ^~~~~~~~~
source.c:15:5: warning: Null pointer dereference
    printf("值: %d\n", *ptr);
    ^~~~~~~~~~~~~~~~~~~~~
source.c:20:5: warning: Buffer overflow
    strcpy(buffer, "这是一个很长的字符串");
    ^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`}</code>
                </pre>

                <h5 className="font-semibold mb-2">使用SonarQube</h5>
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`# sonar-project.properties配置示例
sonar.projectKey=my-project
sonar.projectName=My Project
sonar.projectVersion=1.0

sonar.sources=src
sonar.tests=test
sonar.java.binaries=target/classes
sonar.java.test.binaries=target/test-classes

# 代码质量规则配置
sonar.qualitygate.wait=true
sonar.qualitygate.conditions=coverage,duplicated_lines,code_smells

# 运行SonarQube分析
$ sonar-scanner

# 分析结果示例
INFO: Analysis report generated in /path/to/report
INFO: Analysis report compressed in /path/to/report.zip
INFO: Analysis complete in 5s
INFO: Quality gate is passed`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">2. 二进制分析实践</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">使用Angr进行符号执行</h5>
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`# 示例：使用Angr分析二进制文件
import angr
import claripy

def analyze_binary(binary_path):
    # 创建项目
    p = angr.Project(binary_path)
    
    # 创建符号变量
    input_size = 32
    input_data = claripy.BVS('input', input_size * 8)
    
    # 设置入口点
    state = p.factory.entry_state(args=[binary_path, input_data])
    
    # 创建模拟管理器
    simgr = p.factory.simgr(state)
    
    # 定义目标状态
    def is_successful(state):
        return b"success" in state.posix.dumps(1)
    
    def should_abort(state):
        return b"fail" in state.posix.dumps(1)
    
    # 执行符号执行
    simgr.explore(find=is_successful, avoid=should_abort)
    
    # 分析结果
    if simgr.found:
        solution_state = simgr.found[0]
        solution = solution_state.solver.eval(input_data, cast_to=bytes)
        print(f"找到解决方案: {solution}")
    else:
        print("未找到解决方案")

# 使用示例
analyze_binary("./target_binary")

# 输出示例
找到解决方案: b'correct_input_here'`}</code>
                </pre>

                <h5 className="font-semibold mb-2">使用IDA Pro进行反汇编分析</h5>
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`# IDAPython脚本示例：分析函数调用关系
from idaapi import *
from idautils import *
from idc import *

def analyze_function_calls():
    # 获取所有函数
    functions = Functions()
    
    # 分析每个函数
    for func_addr in functions:
        func_name = get_func_name(func_addr)
        print(f"分析函数: {func_name}")
        
        # 获取函数对象
        func = get_func(func_addr)
        if not func:
            continue
            
        # 分析函数调用
        for ref in CodeRefsTo(func_addr, 0):
            caller = get_func(ref)
            if caller:
                print(f"  被调用自: {get_func_name(caller.start_ea)}")
        
        # 分析函数内部调用
        for ref in CodeRefsFrom(func_addr, 0):
            callee = get_func(ref)
            if callee:
                print(f"  调用: {get_func_name(callee.start_ea)}")
        
        # 分析函数特征
        print(f"  函数大小: {func.size()}")
        print(f"  局部变量数量: {len(get_func_attrs(func_addr).locals)}")
        print("---")

# 运行分析
analyze_function_calls()

# 输出示例
分析函数: main
  被调用自: _start
  调用: printf
  调用: scanf
  函数大小: 0x50
  局部变量数量: 3
---`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">3. 漏洞分析实践</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h5 className="font-semibold mb-2">使用KLEE进行符号执行测试</h5>
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`// 示例代码：包含漏洞的C程序
#include <klee/klee.h>
#include <stdio.h>
#include <string.h>

void vulnerable_function(char* input) {
    char buffer[10];
    // 缓冲区溢出漏洞
    strcpy(buffer, input);
    printf("输入: %s\n", buffer);
}

int main() {
    char input[20];
    // 使用KLEE符号变量
    klee_make_symbolic(input, sizeof(input), "input");
    
    // 添加约束条件
    klee_assume(input[19] == '\\0');
    
    // 调用易受攻击的函数
    vulnerable_function(input);
    
    return 0;
}

// 编译命令
$ clang -emit-llvm -c -g -O0 -Xclang -disable-O0-optnone test.c -o test.bc

// 运行KLEE
$ klee test.bc

// KLEE输出示例
KLEE: output directory is "klee-out-0"
KLEE: done: total instructions = 100
KLEE: done: completed paths = 3
KLEE: done: generated tests = 3`}</code>
                </pre>

                <h5 className="font-semibold mb-2">使用Coverity进行安全分析</h5>
                <pre className="bg-gray-200 p-2 rounded">
                  <code>{`# Coverity分析配置示例
# cov-project.xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE coverity SYSTEM "coverity-issue.dtd">
<coverity>
    <project>
        <name>MyProject</name>
        <description>Security Analysis Project</description>
        <language>c</language>
        <buildCommand>make</buildCommand>
        <analysisCommand>cov-analyze --dir cov-int --all</analysisCommand>
    </project>
</coverity>

# 运行Coverity分析
$ cov-build --dir cov-int make
$ cov-analyze --dir cov-int --all
$ cov-commit-defects --dir cov-int --url https://scan.coverity.com

# 分析结果示例
Coverity Static Analysis complete
Total issues found: 15
  - Memory leaks: 3
  - Buffer overflows: 5
  - Null pointer dereferences: 2
  - Resource leaks: 2
  - Other issues: 3`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 导航链接 */}
      <div className="mt-8 flex justify-between">
        <Link
          href="/study/security/reverse/dynamic"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 动态分析技术
        </Link>
        <Link
          href="/study/security/reverse/anti-debug"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          反调试技术 →
        </Link>
      </div>
    </div>
  );
} 
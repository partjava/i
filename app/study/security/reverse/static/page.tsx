'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookAlert, BookList,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: '静态分析技术',
  chapterNumber: 6,
  totalChapters: 10,
  subjectHref: '/study/security/reverse',
  prevChapter: { label: '动态分析技术', href: '/study/security/reverse/dynamic' },
  nextChapter: { label: '反调试技术', href: '/study/security/reverse/anti-debug' },
  theme: THEMES.security,
}

const clangCode = `// 示例代码：包含潜在问题的C程序
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
        printf("指针为空\\n");
        return;
    }
    // 潜在的空指针解引用
    printf("值: %d\\n", *ptr);
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
source.c:15:5: warning: Null pointer dereference
source.c:20:5: warning: Buffer overflow`

const sonarCode = `# sonar-project.properties配置示例
sonar.projectKey=my-project
sonar.projectName=My Project
sonar.projectVersion=1.0
sonar.sources=src
sonar.tests=test
sonar.java.binaries=target/classes
sonar.java.test.binaries=target/test-classes
sonar.qualitygate.wait=true
sonar.qualitygate.conditions=coverage,duplicated_lines,code_smells

# 运行SonarQube分析
$ sonar-scanner

# 分析结果示例
INFO: Analysis report generated in /path/to/report
INFO: Analysis complete in 5s
INFO: Quality gate is passed`

const angrCode = `# 示例：使用Angr分析二进制文件
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
analyze_binary("./target_binary")`

const idaCode = `# IDAPython脚本示例：分析函数调用关系
from idaapi import *
from idautils import *
from idc import *

def analyze_function_calls():
    functions = Functions()
    for func_addr in functions:
        func_name = get_func_name(func_addr)
        print(f"分析函数: {func_name}")
        func = get_func(func_addr)
        if not func:
            continue
        for ref in CodeRefsTo(func_addr, 0):
            caller = get_func(ref)
            if caller:
                print(f"  被调用自: {get_func_name(caller.start_ea)}")
        for ref in CodeRefsFrom(func_addr, 0):
            callee = get_func(ref)
            if callee:
                print(f"  调用: {get_func_name(callee.start_ea)}")
        print(f"  函数大小: {func.size()}")
        print(f"  局部变量数量: {len(get_func_attrs(func_addr).locals)}")
        print("---")

analyze_function_calls()`

const kleeCode = `// 示例代码：包含漏洞的C程序
#include <klee/klee.h>
#include <stdio.h>
#include <string.h>

void vulnerable_function(char* input) {
    char buffer[10];
    strcpy(buffer, input);     // 缓冲区溢出漏洞
    printf("输入: %s\\n", buffer);
}

int main() {
    char input[20];
    klee_make_symbolic(input, sizeof(input), "input");
    klee_assume(input[19] == '\\0');
    vulnerable_function(input);
    return 0;
}

// 编译 & 运行
$ clang -emit-llvm -c -g -O0 -Xclang -disable-O0-optnone test.c -o test.bc
$ klee test.bc

// KLEE输出示例
KLEE: output directory is "klee-out-0"
KLEE: done: total instructions = 100
KLEE: done: completed paths = 3
KLEE: done: generated tests = 3`

const coverityCode = `# Coverity分析配置示例 (cov-project.xml)
<?xml version="1.0" encoding="UTF-8"?>
<coverity>
    <project>
        <name>MyProject</name>
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
  - Other issues: 3`

const SPREADS = [
  // ===== 跨页 1: 概述 =====
  {
    label: '概述',
    left: (
      <div className="space-y-4">
        <PageTitle>静态分析概述</PageTitle>
        <SectionTitle>1. 什么是静态分析</SectionTitle>
        <BookParagraph>
          静态分析是在不执行程序的情况下，通过分析程序的源代码、二进制代码或中间表示来理解程序的结构、行为和潜在问题的技术。它是软件安全分析和逆向工程中的重要方法。
        </BookParagraph>
        <SectionTitle>主要特点</SectionTitle>
        <BookList items={[
          '全面性：分析所有可能的执行路径，发现潜在的问题和漏洞，理解程序整体结构',
          '安全性：无需运行目标程序，避免恶意代码执行，保护分析环境',
          '可重复性：分析结果稳定，便于自动化，支持持续集成',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>2. 应用场景</SectionTitle>
        <BookList items={[
          '代码审查：代码质量评估、编码规范检查、最佳实践验证',
          '安全分析：漏洞检测、恶意代码识别、安全策略验证',
          '逆向工程：程序结构分析、算法识别、协议分析',
          '性能优化：代码优化、资源使用分析、瓶颈识别',
        ]} />
        <SectionTitle>3. 基本流程</SectionTitle>
        <BookList items={[
          '预处理：代码解析、中间表示生成、符号表构建',
          '分析阶段：控制流分析、数据流分析、依赖分析',
          '结果生成：问题报告、优化建议、文档生成',
        ]} />
      </div>
    ),
  },

  // ===== 跨页 2: 分析技术 =====
  {
    label: '分析技术',
    left: (
      <div className="space-y-4">
        <PageTitle>分析技术</PageTitle>
        <SectionTitle>1. 控制流分析</SectionTitle>
        <BookParagraph>基本概念：控制流图(CFG)包括基本块识别、跳转关系分析、循环结构识别。路径分析包括可达性分析、路径约束求解、死代码检测。</BookParagraph>
        <BookAlert type="info" message="应用场景：代码覆盖率分析、死代码消除、循环优化、漏洞检测。" />
        <SectionTitle>2. 数据流分析</SectionTitle>
        <BookParagraph>基本概念：定义-使用链分析变量定义点和使用点，识别数据依赖关系。别名分析包括指针分析、引用分析、别名关系推导。</BookParagraph>
        <BookAlert type="info" message="应用场景：变量未初始化检测、内存泄漏检测、数据竞争检测、代码优化。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>3. 符号执行</SectionTitle>
        <BookParagraph>符号执行使用符号变量代替具体值，通过路径约束求解发现程序中的潜在错误和漏洞。</BookParagraph>
        <SectionTitle>基本概念</SectionTitle>
        <BookList items={[
          '符号状态：符号变量、路径约束、状态空间',
          '约束求解：SMT求解器、路径可行性、反例生成',
        ]} />
        <SectionTitle>应用场景</SectionTitle>
        <BookList items={[
          '漏洞挖掘',
          '测试用例生成',
          '程序验证',
          '反例构造',
        ]} />
      </div>
    ),
  },

  // ===== 跨页 3: 分析工具 =====
  {
    label: '分析工具',
    left: (
      <div className="space-y-4">
        <PageTitle>代码分析工具</PageTitle>
        <SectionTitle>静态分析器</SectionTitle>
        <BookList items={[
          'Clang Static Analyzer：路径敏感分析、内存错误检测、空指针检查',
          'Coverity：深度代码分析、安全漏洞检测、质量度量',
        ]} />
        <SectionTitle>代码检查工具</SectionTitle>
        <BookList items={[
          'SonarQube：代码质量检查、安全漏洞扫描、技术债务分析',
          'PMD：代码规范检查、最佳实践验证、自定义规则',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>二进制分析工具</PageTitle>
        <SectionTitle>反汇编器</SectionTitle>
        <BookList items={[
          'IDA Pro：交互式反汇编、代码分析、脚本扩展',
          'Ghidra：开源反汇编、协作分析、插件系统',
        ]} />
        <SectionTitle>符号执行工具</SectionTitle>
        <BookList items={[
          'Angr：二进制分析、符号执行、漏洞挖掘',
          'KLEE：LLVM符号执行、测试生成、错误检测',
        ]} />
      </div>
    ),
  },

  // ===== 跨页 4: 实践案例 =====
  {
    label: '实践案例',
    left: (
      <div className="space-y-4">
        <PageTitle>代码分析实践</PageTitle>
        <SectionTitle>使用Clang Static Analyzer</SectionTitle>
        <BookCode language="cpp" code={clangCode} />
        <SectionTitle>使用SonarQube</SectionTitle>
        <BookCode language="bash" code={sonarCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>二进制分析实践</PageTitle>
        <SectionTitle>使用Angr进行符号执行</SectionTitle>
        <BookCode language="python" code={angrCode} />
        <SectionTitle>使用IDA Pro进行反汇编分析</SectionTitle>
        <BookCode language="python" code={idaCode} />
        <SectionTitle>使用KLEE进行符号执行测试</SectionTitle>
        <BookCode language="cpp" code={kleeCode} />
        <SectionTitle>使用Coverity进行安全分析</SectionTitle>
        <BookCode language="bash" code={coverityCode} />
      </div>
    ),
  },
]

export default function StaticAnalysisPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

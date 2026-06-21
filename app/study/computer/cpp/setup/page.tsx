'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  StepList,
  BookAlert,
  BookParagraph,
  BookList,
  BookCode,
  TagGrid,
} from '@/app/components/ui/book/BookContent'
import { DesktopOutlined, CodeOutlined, ToolOutlined, ExperimentOutlined } from '@ant-design/icons'

// ========== 章节元信息 ==========

const META: LessonMeta = {
  subject: 'C++编程',
  chapterTitle: '开发环境配置',
  chapterNumber: 1,
  totalChapters: 18,
  subjectHref: '/study/computer/cpp',
  nextChapter: { label: '基础语法', href: '/study/computer/cpp/syntax' },
  theme: THEMES.computer,
}

// ========== 内容（每个标签 = 两页） ==========

const SPREADS = [
  // 跨页 1: Windows环境 ---------------------------------
  {
    label: 'Windows环境',
    left: (
      <div className="space-y-4">
        <PageTitle icon={<DesktopOutlined />}>Windows 环境配置</PageTitle>
        <StepList
          items={[
            {
              title: '下载 MinGW 编译器',
              content: (
                <div className="space-y-2">
                  <BookParagraph>
                    访问 MinGW-w64 官网下载安装程序，建议选择 x86_64 架构版本。
                  </BookParagraph>
                  <div className="p-2 bg-paper-200 rounded text-xs font-code text-azure break-all">
                    <a href="https://sourceforge.net/projects/mingw-w64/files/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                      https://sourceforge.net/projects/mingw-w64/files/
                    </a>
                  </div>
                  <BookAlert type="info" message="建议选择最新版本，架构选 x86_64，线程模型选 posix" />
                </div>
              ),
            },
            {
              title: '安装 MinGW',
              content: (
                <BookList items={[
                  '运行下载的安装程序',
                  'Version: 选择最新版本',
                  'Architecture: x86_64',
                  'Threads: posix',
                  'Exception: seh',
                  '选择安装路径（建议默认路径 C:\\mingw64）',
                ]} />
              ),
            },
          ]}
        />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle icon={<DesktopOutlined />}>环境变量与验证</PageTitle>
        <StepList
          items={[
            {
              title: '配置环境变量',
              content: (
                <BookList items={[
                  '右键「此电脑」→ 属性 → 高级系统设置',
                  '点击「环境变量」',
                  '编辑 Path 变量，新增 C:\\mingw64\\bin',
                  '点击确定保存',
                ]} />
              ),
            },
            {
              title: '验证安装',
              content: (
                <div className="space-y-2">
                  <BookParagraph>打开命令提示符，输入以下命令验证：</BookParagraph>
                  <BookCode language="bash" code="g++ --version" />
                  <BookAlert type="success" message="看到版本号输出 = 环境配置完成" />
                </div>
              ),
            },
          ]}
        />
      </div>
    ),
  },

  // 跨页 2: VSCode配置 ----------------------------------
  {
    label: 'VSCode配置',
    left: (
      <div className="space-y-4">
        <PageTitle icon={<CodeOutlined />}>安装 VS Code</PageTitle>
        <StepList
          items={[
            {
              title: '下载并安装 VS Code',
              content: (
                <div className="space-y-2">
                  <BookParagraph>从官网下载 Visual Studio Code 安装程序。</BookParagraph>
                  <div className="p-2 bg-paper-200 rounded text-xs font-code text-azure break-all">
                    <a href="https://code.visualstudio.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                      https://code.visualstudio.com/
                    </a>
                  </div>
                </div>
              ),
            },
            {
              title: '安装 C++ 扩展',
              content: (
                <div className="space-y-2">
                  <BookParagraph>在 VS Code 扩展市场搜索并安装：</BookParagraph>
                  <BookList items={[
                    'C/C++（微软官方）',
                    'C/C++ Extension Pack',
                    'Code Runner（可选）',
                  ]} />
                  <BookAlert type="info" message="按 Ctrl+Shift+X 打开扩展面板" />
                </div>
              ),
            },
          ]}
        />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle icon={<CodeOutlined />}>配置编译环境</PageTitle>
        <StepList
          items={[
            {
              title: '创建工作目录',
              content: <BookParagraph>在桌面上创建一个新的 C++ 项目文件夹。</BookParagraph>,
            },
            {
              title: '创建 .vscode 配置',
              content: (
                <BookCode
                  language="json"
                  showLineNumbers
                  maxLines={10}
                  code={'{\n  "version": "2.0.0",\n  "tasks": [\n    {\n      "type": "cppbuild",\n      "label": "C/C++: g++ 编译",\n      "command": "g++",\n      "args": [\n        "-fdiagnostics-color=always",\n        "-g",\n        "${file}",\n        "-o",\n        "${fileDirname}/${fileBasenameNoExtension}.exe"\n      ],\n      "group": {\n        "kind": "build",\n        "isDefault": true\n      }\n    }\n  ]\n}'}
                />
              ),
            },
          ]}
        />
      </div>
    ),
  },

  // 跨页 3: 测试环境 ------------------------------------
  {
    label: '测试环境',
    left: (
      <div className="space-y-4">
        <PageTitle icon={<ToolOutlined />}>创建测试程序</PageTitle>
        <BookParagraph>
          创建一个新文件 <code className="px-1 py-0.5 bg-paper-200 rounded text-xs font-code">hello.cpp</code>：
        </BookParagraph>
        <BookCode
          language="cpp"
          showLineNumbers
         
          code={`#include <iostream>
using namespace std;

int main() {
    cout << "Hello, C++!" << endl;
    return 0;
}`}
        />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle icon={<ToolOutlined />}>编译运行</PageTitle>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-ink mb-2">方法一：命令行</h3>
            <BookCode language="bash" code="g++ hello.cpp -o hello\n./hello" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-ink mb-2">方法二：VS Code</h3>
            <BookList items={[
              '打开 hello.cpp，按 F5 运行',
              '或按 Ctrl+Alt+N（Code Runner）',
            ]} />
          </div>
          <BookAlert type="success" message={'如果看到 "Hello, C++!" 输出，恭喜配置成功！'} />
        </div>
      </div>
    ),
  },

  // 跨页 4: 练习例题 ------------------------------------
  {
    label: '练习例题',
    left: (
      <div className="space-y-4">
        <PageTitle icon={<ExperimentOutlined />}>题目描述</PageTitle>
        <div className="p-4 bg-paper-200/80 rounded-md border border-paper-300">
          <p className="text-sm text-ink font-medium mb-3">创建一个 C++ 程序：</p>
          <BookList items={[
            '输出 "Welcome to C++ Programming!"',
            '输出编译器版本信息',
            '等待回车后退出',
          ]} />
        </div>
        <h3 className="text-sm font-medium text-ink mt-4 mb-2">要求</h3>
        <BookList items={[
          '使用 iostream 库',
          '使用 endl 换行',
          '使用 cin.get() 等待输入',
          '使用 __cplusplus 宏',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle icon={<ExperimentOutlined />}>参考代码</PageTitle>
        <BookCode
          language="cpp"
          showLineNumbers
          code={`#include <iostream>
using namespace std;

int main() {
    cout << "Welcome to C++ Programming!" << endl;
    cout << "C++ Standard: " << __cplusplus << endl;
    cout << "按回车键退出...";
    cin.get();
    return 0;
}`}
        />
        <h3 className="text-sm font-medium text-ink mt-4 mb-2">知识点</h3>
        <TagGrid items={['程序基本结构', 'iostream 库', '标准输入输出', '__cplusplus 宏', '命名空间', 'main 函数']} />
        <BookAlert type="warning" message="确保已正确配置 g++ 编译器" />
      </div>
    ),
  },
]

// ========== 页面 ==========

export default function SetupPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

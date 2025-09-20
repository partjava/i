'use client';

import { useState } from 'react';
import { Card, Tabs, Steps, Button, Alert, Progress } from 'antd';
import { CodeBlock } from '@/app/components/ui/CodeBlock';
import { 
  DesktopOutlined, 
  CodeOutlined, 
  ToolOutlined,
  CheckCircleOutlined,
  ExperimentOutlined,
  RightOutlined 
} from '@ant-design/icons';

const { TabPane } = Tabs;

export default function SetupPage() {
  const [activeTab, setActiveTab] = useState('1');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">C++ 开发环境配置</h1>
              <p className="text-gray-600 mt-2">配置你的第一个C++开发环境，开始编程之旅</p>
            </div>
            <Progress type="circle" percent={5} size={80} strokeColor="#1890ff" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <Tabs activeKey={activeTab} onChange={setActiveTab}>
            <TabPane 
              tab={
                <span>
                  <DesktopOutlined />
                  Windows环境
                </span>
              } 
              key="1"
            >
              <Steps
                direction="vertical"
                current={-1}
                items={[
                  {
                    title: '下载MinGW编译器',
                    description: (
                      <div className="py-4">
                        <p className="mb-4">访问 MinGW 官网下载安装程序：</p>
                        <Alert
                          message="下载链接"
                          description={
                            <a href="https://sourceforge.net/projects/mingw-w64/files/" 
                               target="_blank" 
                               rel="noopener noreferrer"
                               className="text-blue-500 hover:text-blue-600"
                            >
                              https://sourceforge.net/projects/mingw-w64/files/
                            </a>
                          }
                          type="info"
                          showIcon
                        />
                      </div>
                    )
                  },
                  {
                    title: '安装MinGW',
                    description: (
                      <div className="py-4">
                        <p className="mb-4">1. 运行下载的安装程序</p>
                        <p className="mb-4">2. 选择安装选项：</p>
                        <ul className="list-disc pl-6 mb-4">
                          <li>Version: 最新版本</li>
                          <li>Architecture: x86_64</li>
                          <li>Threads: posix</li>
                          <li>Exception: seh</li>
                        </ul>
                        <p>3. 选择安装路径（建议默认路径）</p>
                      </div>
                    )
                  },
                  {
                    title: '配置环境变量',
                    description: (
                      <div className="py-4">
                        <p className="mb-4">1. 打开系统环境变量设置</p>
                        <p className="mb-4">2. 编辑 Path 变量，添加 MinGW 的 bin 目录：</p>
                        <CodeBlock language="bash">
                          C:\mingw64\bin
                        </CodeBlock>
                      </div>
                    )
                  },
                  {
                    title: '验证安装',
                    description: (
                      <div className="py-4">
                        <p className="mb-4">打开命令提示符，输入以下命令：</p>
                        <CodeBlock language="bash">
                          g++ --version
                        </CodeBlock>
                        <p className="mt-4">如果显示版本信息，说明安装成功。</p>
                      </div>
                    )
                  }
                ]}
              />
            </TabPane>

            <TabPane 
              tab={
                <span>
                  <CodeOutlined />
                  VSCode配置
                </span>
              } 
              key="2"
            >
              <Steps
                direction="vertical"
                current={-1}
                items={[
                  {
                    title: '安装VSCode',
                    description: (
                      <div className="py-4">
                        <p className="mb-4">从官网下载并安装VSCode：</p>
                        <Alert
                          message="下载链接"
                          description={
                            <a href="https://code.visualstudio.com/" 
                               target="_blank" 
                               rel="noopener noreferrer"
                               className="text-blue-500 hover:text-blue-600"
                            >
                              https://code.visualstudio.com/
                            </a>
                          }
                          type="info"
                          showIcon
                        />
                      </div>
                    )
                  },
                  {
                    title: '安装C++扩展',
                    description: (
                      <div className="py-4">
                        <p className="mb-4">在VSCode中安装以下扩展：</p>
                        <ul className="list-disc pl-6">
                          <li>C/C++</li>
                          <li>C/C++ Extension Pack</li>
                          <li>Code Runner（可选）</li>
                        </ul>
                      </div>
                    )
                  },
                  {
                    title: '配置C++环境',
                    description: (
                      <div className="py-4">
                        <p className="mb-4">1. 创建工作目录</p>
                        <p className="mb-4">2. 创建.vscode文件夹，添加配置文件：</p>
                        <p className="mb-2">tasks.json:</p>
                        <CodeBlock language="json">
                          {`{
  "version": "2.0.0",
  "tasks": [
    {
      "type": "cppbuild",
      "label": "C/C++: g++.exe build active file",
      "command": "g++",
      "args": [
        "-fdiagnostics-color=always",
        "-g",
        "\${file}",
        "-o",
        "\${fileDirname}/\${fileBasenameNoExtension}.exe"
      ],
      "options": {
        "cwd": "\${fileDirname}"
      },
      "problemMatcher": ["$gcc"],
      "group": {
        "kind": "build",
        "isDefault": true
      }
    }
  ]
}`}
                        </CodeBlock>
                      </div>
                    )
                  }
                ]}
              />
            </TabPane>

            <TabPane 
              tab={
                <span>
                  <ToolOutlined />
                  测试环境
                </span>
              } 
              key="3"
            >
              <div className="space-y-6">
                <Card title="创建测试程序">
                  <p className="mb-4">创建一个新文件 hello.cpp：</p>
                  <CodeBlock language="cpp">
                    {`#include <iostream>
using namespace std;

int main() {
    cout << "Hello, C++!" << endl;
    return 0;
}`}
                  </CodeBlock>
                </Card>

                <Card title="编译运行">
                  <p className="mb-4">方法1：使用命令行</p>
                  <CodeBlock language="bash">
                    {`g++ hello.cpp -o hello
./hello`}
                  </CodeBlock>

                  <p className="mb-4 mt-6">方法2：使用VSCode</p>
                  <ul className="list-disc pl-6">
                    <li>打开hello.cpp</li>
                    <li>按F5运行程序</li>
                    <li>或使用Code Runner插件的运行按钮</li>
                  </ul>
                </Card>

                <Alert
                  message="成功标准"
                  description="如果看到输出 'Hello, C++!'，说明环境配置成功！"
                  type="success"
                  showIcon
                  icon={<CheckCircleOutlined />}
                />
              </div>
            </TabPane>

            <TabPane 
              tab={
                <span>
                  <ExperimentOutlined />
                  练习例题
                </span>
              } 
              key="4"
            >
              <div className="space-y-6">
                <Card title="例题：创建并运行第一个C++程序">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium">题目描述</h3>
                      <p className="mt-2">创建一个C++程序，实现以下功能：</p>
                      <ul className="list-disc pl-6 mt-2">
                        <li>输出一行文字："Welcome to C++ Programming!"</li>
                        <li>输出当前的编译器版本信息</li>
                        <li>等待用户按回车键后退出</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium">参考代码</h3>
                      <CodeBlock language="cpp">
                        {`#include <iostream>
using namespace std;

int main() {
    // 输出欢迎信息
    cout << "Welcome to C++ Programming!" << endl;
    
    // 输出编译器版本信息
    cout << "Compiler version: " << __cplusplus << endl;
    
    // 等待用户输入
    cout << "按回车键退出..." << endl;
    cin.get();
    
    return 0;
}`}
                      </CodeBlock>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium">知识点</h3>
                      <ul className="list-disc pl-6">
                        <li>基本的C++程序结构</li>
                        <li>iostream库的使用</li>
                        <li>标准输入输出</li>
                        <li>预定义宏的使用</li>
                      </ul>
                    </div>

                    <Alert
                      message="提示"
                      description={
                        <ul className="list-disc pl-6">
                          <li>确保已正确配置g++编译器</li>
                          <li>使用 VS Code 创建新的 .cpp 文件</li>
                          <li>使用 F5 或终端命令编译运行</li>
                          <li>观察程序的输出结果</li>
                        </ul>
                      }
                      type="info"
                      showIcon
                    />
                  </div>
                </Card>
              </div>
            </TabPane>
          </Tabs>
        </div>

        {/* 底部导航 */}
        <div className="flex justify-between mt-8">
          <Button disabled>
            上一课
          </Button>
          <Button type="primary" href="/study/cpp/syntax">
            下一课：基础语法
          </Button>
        </div>
      </div>
    </div>
  );
} 
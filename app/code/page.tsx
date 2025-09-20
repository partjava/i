'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import CodeEditor from '@/app/components/CodeEditor';
import { Card, Typography, Steps, Alert } from 'antd';
import { CodeOutlined, PlayCircleOutlined, SaveOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export default function CodeEditorPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div className="flex justify-center items-center min-h-screen">加载中...</div>;
  }

  if (!session) {
    return null;
  }

  const steps = [
    {
      title: '选择语言',
      description: '从下拉菜单选择编程语言',
      icon: <CodeOutlined />
    },
    {
      title: '编写代码',
      description: '在左侧编辑器中输入代码',
      icon: <CodeOutlined />
    },
    {
      title: '输入数据',
      description: '如需要，在右侧输入测试数据',
      icon: <SaveOutlined />
    },
    {
      title: '运行代码',
      description: '点击运行按钮查看结果',
      icon: <PlayCircleOutlined />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <Title level={1} className="text-4xl font-bold text-gray-800 mb-4">
            <CodeOutlined className="mr-3 text-blue-600" />
            在线代码编辑器
          </Title>
          <Paragraph className="text-lg text-gray-600 max-w-2xl mx-auto">
            支持多种编程语言的在线编译和运行环境。安全沙箱执行，实时查看结果。
          </Paragraph>
        </div>

        {/* 使用说明 */}
        <Card className="mb-8 shadow-lg">
          <Title level={3} className="text-center mb-6">使用说明</Title>
          <Steps
            current={-1}
            items={steps}
            className="mb-6"
          />
          <Alert
            message="温馨提示"
            description="代码执行有10秒超时限制，请避免编写无限循环或长时间运行的程序。服务器会自动检测可用的编程语言环境。"
            type="info"
            showIcon
            className="mt-4"
          />
        </Card>

        {/* 代码编辑器 */}
        <Card className="shadow-lg">
          <CodeEditor height="500px" />
        </Card>

        {/* 支持的语言说明 */}
        <Card className="mt-8 shadow-lg">
          <Title level={3} className="mb-4">支持的编程语言</Title>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Python</h4>
              <p className="text-sm text-gray-600">支持 Python 3.x，包含常用库</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">JavaScript</h4>
              <p className="text-sm text-gray-600">Node.js 运行环境</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="font-semibold text-red-800 mb-2">Java</h4>
              <p className="text-sm text-gray-600">JDK 编译和运行</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">C++</h4>
              <p className="text-sm text-gray-600">GCC 编译器</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">C</h4>
              <p className="text-sm text-gray-600">GCC 编译器</p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h4 className="font-semibold text-indigo-800 mb-2">Go</h4>
              <p className="text-sm text-gray-600">Go 编译器</p>
            </div>
            <div className="bg-pink-50 p-4 rounded-lg">
              <h4 className="font-semibold text-pink-800 mb-2">PHP</h4>
              <p className="text-sm text-gray-600">PHP 解释器</p>
            </div>
          </div>
          <Alert
            message="注意"
            description="实际可用的语言取决于服务器环境配置。编辑器会自动检测并显示当前可用的语言。"
            type="warning"
            showIcon
            className="mt-4"
          />
        </Card>

        {/* 代码示例 */}
        <Card className="mt-8 shadow-lg">
          <Title level={3} className="mb-4">代码示例</Title>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Python 示例</h4>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
{`# 计算斐波那契数列
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

n = int(input("请输入数字: "))
print(f"第{n}个斐波那契数是: {fibonacci(n)}")`}
              </pre>
            </div>
            <div>
              <h4 className="font-semibold mb-2">C++ 示例</h4>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
{`#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cout << "请输入数组大小: ";
    cin >> n;
    
    vector<int> arr(n);
    cout << "请输入数组元素: ";
    for(int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    
    // 冒泡排序
    for(int i = 0; i < n-1; i++) {
        for(int j = 0; j < n-i-1; j++) {
            if(arr[j] > arr[j+1]) {
                swap(arr[j], arr[j+1]);
            }
        }
    }
    
    cout << "排序后: ";
    for(int x : arr) {
        cout << x << " ";
    }
    return 0;
}`}
              </pre>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 
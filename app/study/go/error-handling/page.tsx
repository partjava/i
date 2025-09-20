'use client';

import { useState } from 'react';

const tabs = [
  { key: 'basic', label: '错误处理基础' },
  { key: 'custom', label: '自定义错误' },
  { key: 'defer', label: 'defer与panic' },
  { key: 'best', label: '错误处理最佳实践' },
  { key: 'practice', label: '例题与练习' },
  { key: 'faq', label: '常见问题' },
];

export default function GoErrorHandlingPage() {
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 mt-4">Go语言错误处理</h1>
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none ${
                activeTab === tab.key
                  ? 'border-blue-500 text-blue-600 font-bold'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="bg-white rounded-lg shadow p-8">
        {activeTab === 'basic' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">错误处理基础</h2>
            <p>Go语言采用多返回值方式进行错误处理，约定<code>error</code>类型为错误信息。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`import "errors"

func div(a, b int) (int, error) {
    if b == 0 {
        return 0, errors.New("除数不能为0")
    }
    return a / b, nil
}

res, err := div(10, 0)
if err != nil {
    fmt.Println("出错：", err)
} else {
    fmt.Println("结果：", res)
}`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>error是接口类型，nil表示无错误。</li>
              <li>Go推荐优先返回错误而不是抛出异常。</li>
            </ul>
          </div>
        )}
        {activeTab === 'custom' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">自定义错误</h2>
            <p>可通过实现<code>error</code>接口自定义错误类型，便于携带更多上下文信息。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`type MyError struct {
    Code int
    Msg  string
}

func (e *MyError) Error() string {
    return fmt.Sprintf("[错误码%d] %s", e.Code, e.Msg)
}

func test(flag bool) error {
    if !flag {
        return &MyError{Code: 1001, Msg: "flag为false"}
    }
    return nil
}

err := test(false)
if err != nil {
    fmt.Println(err)
}`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>自定义错误可携带错误码、上下文等信息。</li>
              <li>可通过类型断言判断错误类型。</li>
            </ul>
          </div>
        )}
        {activeTab === 'defer' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">defer与panic</h2>
            <p><code>defer</code>用于延迟执行，<code>panic</code>用于抛出异常，<code>recover</code>可捕获异常防止程序崩溃。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`func safeDiv(a, b int) (res int) {
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("捕获panic：", r)
            res = 0
        }
    }()
    if b == 0 {
        panic("除数为0")
    }
    return a / b
}

fmt.Println(safeDiv(10, 0))`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>defer常用于资源释放、日志、异常捕获。</li>
              <li>panic会中断流程，recover可恢复。</li>
            </ul>
          </div>
        )}
        {activeTab === 'best' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">错误处理最佳实践</h2>
            <p>推荐做法：就地处理错误、错误包装、分层处理、日志记录等。</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`// 错误包装
import "fmt"

func readFile(name string) error {
    if name == "" {
        return fmt.Errorf("文件名为空: %w", errors.New("参数错误"))
    }
    return nil
}

err := readFile("")
if err != nil {
    fmt.Println("读取失败：", err)
}`}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>使用fmt.Errorf("...%w", err)包装错误，便于追踪。</li>
              <li>分层处理，底层返回错误，上层决定如何处理。</li>
            </ul>
          </div>
        )}
        {activeTab === 'practice' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">例题与练习</h2>
            <p className="mb-2 font-semibold">例题1：实现一个带错误处理的文件读取函数</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`import "os"

func ReadFile(name string) ([]byte, error) {
    f, err := os.Open(name)
    if err != nil {
        return nil, err
    }
    defer f.Close()
    return io.ReadAll(f)
}

content, err := ReadFile("test.txt")
if err != nil {
    fmt.Println("读取失败：", err)
} else {
    fmt.Println(string(content))
}`}
            </pre>
            <p className="mb-2 font-semibold">例题2：自定义错误类型并使用</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`type AgeError struct {
    Age int
}

func (e *AgeError) Error() string {
    return fmt.Sprintf("年龄非法: %d", e.Age)
}

func CheckAge(age int) error {
    if age < 0 || age > 150 {
        return &AgeError{Age: age}
    }
    return nil
}

err := CheckAge(200)
if err != nil {
    fmt.Println(err)
}`}
            </pre>
            <p className="mb-2 font-semibold">练习：实现一个panic安全的函数</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{`func SafeRun(fn func()) (err error) {
    defer func() {
        if r := recover(); r != nil {
            err = fmt.Errorf("panic: %v", r)
        }
    }()
    fn()
    return nil
}

err := SafeRun(func() {
    panic("出错了")
})
fmt.Println(err)`}
            </pre>
          </div>
        )}
        {activeTab === 'faq' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">常见问题</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <b>Q: error和panic的区别？</b><br />
                A: error用于可预期错误，panic用于不可恢复的严重错误。
              </li>
              <li>
                <b>Q: defer执行顺序？</b><br />
                A: 后注册的defer先执行（类似栈）。
              </li>
              <li>
                <b>Q: 如何判断error类型？</b><br />
                A: 可用类型断言或errors.Is/errors.As。
              </li>
            </ul>
          </div>
        )}
        <div className="mt-8 flex justify-between">
          <a
            href="/study/go/channels"
            className="inline-flex items-center bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            上一页：Channel与Goroutine
          </a>
          <a
            href="/study/go/packages"
            className="inline-flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            下一页：包与模块
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
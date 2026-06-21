'use client';

import { useState } from 'react';
import { Card, Tabs, Progress, Alert } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { CodeBlock } from '@/app/components/ui/CodeBlock';
import Link from 'next/link';
import React from 'react';
import { 
  ExceptionOutlined, 
  SafetyOutlined, 
  ThunderboltOutlined, 
  ExperimentOutlined 
} from '@ant-design/icons';

const { TabPane } = Tabs;

export default function ExceptionsPage() {
  const [activeTab, setActiveTab] = useState('1');

  const tabItems = [
    {
      key: '1',
      label: (
        <span>
          <ExceptionOutlined />
          异常基础
        </span>
      ),
      children: (
        <Card title="异常处理基础" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">try-catch 语句</h3>
            <p>使用 try-catch 块捕获和处理异常。</p>
            <CodeBlock language="cpp">
              {`#include <iostream>
#include <stdexcept>
using namespace std;

double divide(double a, double b) {
    if (b == 0) {
        throw runtime_error("除数不能为零！");
    }
    return a / b;
}

int main() {
    try {
        cout << divide(10, 2) << endl;  // 正常执行
        cout << divide(10, 0) << endl;  // 抛出异常
    }
    catch (const runtime_error& e) {
        cerr << "捕获到运行时错误: " << e.what() << endl;
    }
    catch (const exception& e) {
        cerr << "捕获到标准异常: " << e.what() << endl;
    }
    catch (...) {
        cerr << "捕获到未知异常" << endl;
    }
    
    cout << "程序继续执行..." << endl;
    return 0;
}`}
            </CodeBlock>
            <Alert
              className="mt-4"
              message="异常处理的优点"
              description={
                <ul className="list-disc pl-6">
                  <li>将错误处理代码与正常业务逻辑分离</li>
                  <li>可以在调用栈中传播异常</li>
                  <li>支持不同类型的异常处理</li>
                  <li>确保资源正确释放</li>
                </ul>
              }
              type="info"
              showIcon
            />
          </div>
        </Card>
      ),
    },
    {
      key: '2',
      label: (
        <span>
          <SafetyOutlined />
          异常安全
        </span>
      ),
      children: (
        <Card title="RAII与异常安全" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">RAII与资源管理</h3>
            <p>使用RAII技术确保资源安全释放。</p>
            <CodeBlock language="cpp">
              {`#include <iostream>
#include <memory>
#include <fstream>

class Resource {
private:
    std::string name;
    
public:
    Resource(const std::string& n) : name(n) {
        std::cout << "获取资源: " << name << std::endl;
    }
    
    ~Resource() {
        std::cout << "释放资源: " << name << std::endl;
    }
    
    void use() {
        std::cout << "使用资源: " << name << std::endl;
    }
};

void unsafe_function() {
    Resource* r1 = new Resource("数据库连接");
    Resource* r2 = new Resource("文件句柄");
    
    // 如果这里抛出异常，资源将泄露
    throw std::runtime_error("发生错误");
    
    delete r2;
    delete r1;
}

void safe_function() {
    // 使用智能指针自动管理资源
    std::unique_ptr<Resource> r1(new Resource("数据库连接"));
    std::unique_ptr<Resource> r2(new Resource("文件句柄"));
    
    // 即使抛出异常，资源也会被正确释放
    throw std::runtime_error("发生错误");
}

// RAII文件处理示例
class FileHandler {
private:
    std::ofstream file;
    
public:
    FileHandler(const std::string& filename) {
        file.open(filename);
        if (!file.is_open()) {
            throw std::runtime_error("无法打开文件");
        }
    }
    
    ~FileHandler() {
        if (file.is_open()) {
            file.close();
        }
    }
    
    void write(const std::string& data) {
        if (!file.is_open()) {
            throw std::runtime_error("文件未打开");
        }
        file << data;
    }
};

int main() {
    try {
        unsafe_function();
    }
    catch (const std::exception& e) {
        std::cerr << "unsafe_function 异常: " << e.what() << std::endl;
    }
    
    try {
        safe_function();
    }
    catch (const std::exception& e) {
        std::cerr << "safe_function 异常: " << e.what() << std::endl;
    }
    
    try {
        FileHandler file("test.txt");
        file.write("Hello, World!");
    }
    catch (const std::exception& e) {
        std::cerr << "文件操作异常: " << e.what() << std::endl;
    }
}`}
            </CodeBlock>
            <Alert
              className="mt-4"
              message="RAII原则"
              description={
                <ul className="list-disc pl-6">
                  <li>在构造函数中获取资源</li>
                  <li>在析构函数中释放资源</li>
                  <li>使用智能指针管理动态内存</li>
                  <li>保证异常发生时资源也能正确释放</li>
                </ul>
              }
              type="info"
              showIcon
            />
          </div>
        </Card>
      ),
    },
    {
      key: '3',
      label: (
        <span>
          <ThunderboltOutlined />
          异常层次
        </span>
      ),
      children: (
        <Card title="异常层次与自定义异常" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">标准异常与自定义异常</h3>
            <p>C++异常层次结构与创建自定义异常。</p>
            <CodeBlock language="cpp">
              {`#include <iostream>
#include <stdexcept>
#include <string>
using namespace std;

// 自定义异常类
class DatabaseException : public runtime_error {
private:
    int errorCode;
    
public:
    DatabaseException(const string& message, int code)
        : runtime_error(message), errorCode(code) {}
    
    int getErrorCode() const {
        return errorCode;
    }
};

// 具体异常类型
class ConnectionException : public DatabaseException {
public:
    ConnectionException(const string& message, int code)
        : DatabaseException(message, code) {}
};

class QueryException : public DatabaseException {
private:
    string queryString;
    
public:
    QueryException(const string& message, int code, const string& query)
        : DatabaseException(message, code), queryString(query) {}
    
    string getQuery() const {
        return queryString;
    }
};

// 模拟数据库操作
void executeQuery(const string& query) {
    if (query.empty()) {
        throw QueryException("查询语句不能为空", 1001, query);
    }
    
    if (query.find("SELECT") == string::npos) {
        throw QueryException("不支持的查询类型", 1002, query);
    }
    
    // 模拟连接错误
    if (rand() % 10 == 0) {
        throw ConnectionException("数据库连接中断", 2001);
    }
    
    cout << "执行查询: " << query << endl;
}

int main() {
    try {
        executeQuery("SELECT * FROM users");
        executeQuery("");  // 将抛出QueryException
    } catch (const QueryException& e) {
        cout << "查询异常: " << e.what() << endl;
        cout << "错误代码: " << e.getErrorCode() << endl;
        cout << "问题查询: " << e.getQuery() << endl;
    } catch (const ConnectionException& e) {
        cout << "连接异常: " << e.what() << endl;
        cout << "错误代码: " << e.getErrorCode() << endl;
    } catch (const DatabaseException& e) {
        cout << "数据库异常: " << e.what() << endl;
        cout << "错误代码: " << e.getErrorCode() << endl;
    } catch (const exception& e) {
        cout << "标准异常: " << e.what() << endl;
    } catch (...) {
        cout << "未知异常" << endl;
    }
    
    return 0;
}`}
            </CodeBlock>
            <Alert
              className="mt-4"
              message="异常层次结构"
              description={
                <ul className="list-disc pl-6">
                  <li>从具体到一般的捕获顺序</li>
                  <li>通过继承创建自定义异常</li>
                  <li>添加额外信息到异常类中</li>
                  <li>重用标准异常类作为基类</li>
                </ul>
              }
              type="info"
              showIcon
            />
          </div>
        </Card>
      ),
    },
    {
      key: '4',
      label: (
        <span>
          <ExperimentOutlined />
          练习例题
        </span>
      ),
      children: (
        <Card title="例题：文件解析器" className="mb-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">题目描述</h3>
              <p className="mt-2">实现一个文件解析器，能够处理各种错误情况：</p>
              <ul className="list-disc pl-6 mt-2">
                <li>文件不存在或打开失败</li>
                <li>文件格式错误</li>
                <li>文件内容解析错误</li>
                <li>数值转换错误</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium">参考代码</h3>
              <CodeBlock language="cpp">
                {`#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <stdexcept>
#include <sstream>
using namespace std;

// 自定义异常层次结构
class FileParserException : public runtime_error {
public:
    FileParserException(const string& message)
        : runtime_error(message) {}
};

class FileNotFoundException : public FileParserException {
private:
    string filename;
    
public:
    FileNotFoundException(const string& filename)
        : FileParserException("无法打开文件: " + filename),
          filename(filename) {}
    
    string getFilename() const { return filename; }
};

class FormatException : public FileParserException {
private:
    int lineNumber;
    
public:
    FormatException(const string& message, int line)
        : FileParserException(message + " (行号: " + to_string(line) + ")"),
          lineNumber(line) {}
    
    int getLineNumber() const { return lineNumber; }
};

class DataRecord {
public:
    int id;
    string name;
    double value;
    
    void display() const {
        cout << "ID: " << id << ", 名称: " << name << ", 值: " << value << endl;
    }
};

class FileParser {
public:
    vector<DataRecord> parseFile(const string& filename) {
        ifstream file(filename);
        if (!file.is_open()) {
            throw FileNotFoundException(filename);
        }
        
        vector<DataRecord> records;
        string line;
        int lineNumber = 0;
        
        while (getline(file, line)) {
            lineNumber++;
            
            // 跳过空行和注释
            if (line.empty() || line[0] == '#') {
                continue;
            }
            
            try {
                DataRecord record = parseLine(line, lineNumber);
                records.push_back(record);
            } catch (const FormatException& e) {
                // 记录错误但继续解析
                cerr << "警告: " << e.what() << endl;
            }
        }
        
        if (records.empty()) {
            throw FileParserException("文件不包含有效数据记录");
        }
        
        return records;
    }
    
private:
    DataRecord parseLine(const string& line, int lineNumber) {
        istringstream iss(line);
        string part;
        vector<string> parts;
        
        // 分割字符串
        while (getline(iss, part, ',')) {
            parts.push_back(part);
        }
        
        if (parts.size() != 3) {
            throw FormatException("格式错误：每行需要3个字段", lineNumber);
        }
        
        DataRecord record;
        
        try {
            record.id = stoi(parts[0]);
        } catch (...) {
            throw FormatException("ID必须是整数", lineNumber);
        }
        
        record.name = parts[1];
        if (record.name.empty()) {
            throw FormatException("名称不能为空", lineNumber);
        }
        
        try {
            record.value = stod(parts[2]);
        } catch (...) {
            throw FormatException("值必须是数字", lineNumber);
        }
        
        return record;
    }
};

// 文件处理器，展示RAII原则
class FileProcessor {
public:
    void processFile(const string& filename) {
        try {
            cout << "开始处理文件: " << filename << endl;
            
            FileParser parser;
            vector<DataRecord> records = parser.parseFile(filename);
            
            cout << "成功解析 " << records.size() << " 条记录:" << endl;
            for (const auto& record : records) {
                record.display();
            }
            
        } catch (const FileNotFoundException& e) {
            cerr << "错误: " << e.what() << endl;
            cerr << "请检查文件 '" << e.getFilename() << "' 是否存在并可访问" << endl;
        } catch (const FormatException& e) {
            cerr << "格式错误: " << e.what() << endl;
        } catch (const FileParserException& e) {
            cerr << "解析错误: " << e.what() << endl;
        } catch (const exception& e) {
            cerr << "未预期的错误: " << e.what() << endl;
        }
        
        cout << "文件处理完成" << endl;
    }
};

int main() {
    FileProcessor processor;
    
    // 有效文件
    processor.processFile("data.csv");
    
    // 不存在的文件
    processor.processFile("nonexistent.csv");
    
    return 0;
}`}
              </CodeBlock>
            </div>
            
            <h3 className="text-lg font-medium mt-6">知识点</h3>
            <ul className="list-disc pl-6 mt-2">
              <li>异常层次结构设计</li>
              <li>文件操作异常处理</li>
              <li>错误恢复和报告</li>
              <li>RAII原则应用</li>
              <li>嵌套异常处理</li>
            </ul>
            
            <div className="bg-blue-50 p-4 rounded-md mt-4">
              <div className="flex items-center text-blue-700 font-medium mb-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">i</span>
                运行示例
              </div>
              <pre className="text-sm text-gray-800 whitespace-pre-wrap">
{`开始处理文件: data.csv
成功解析 3 条记录:
ID: 1, 名称: 产品A, 值: 10.5
ID: 2, 名称: 产品B, 值: 20.75
ID: 3, 名称: 产品C, 值: 15.3
文件处理完成

开始处理文件: nonexistent.csv
错误: 无法打开文件: nonexistent.csv
请检查文件 'nonexistent.csv' 是否存在并可访问
文件处理完成`}
              </pre>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-md mt-4">
              <div className="flex items-center text-yellow-700 font-medium mb-2">
                <span className="bg-yellow-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">!</span>
                提示
              </div>
              <ul className="list-disc pl-6">
                <li>考虑添加事务式处理，在错误发生时回滚已完成的操作</li>
                <li>实现日志记录功能，记录异常和处理情况</li>
                <li>扩展支持更多文件格式和更复杂的解析规则</li>
                <li>添加异常中立代码，确保资源正确释放</li>
              </ul>
            </div>
          </div>
        </Card>
      ),
    },
    {
      key: '5',
      label: (
        <span>
          <ExperimentOutlined />
          练习例题
        </span>
      ),
      children: (
        <Card title="例题：安全网络客户端" className="mb-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">题目描述</h3>
              <p className="mt-2">实现一个安全的网络客户端，针对各种网络错误提供异常处理：</p>
              <ul className="list-disc pl-6 mt-2">
                <li>连接失败</li>
                <li>超时错误</li>
                <li>数据传输错误</li>
                <li>资源清理和重试机制</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium">参考代码</h3>
              <CodeBlock language="cpp">
                {`#include <iostream>
#include <string>
#include <chrono>
#include <thread>
#include <memory>
#include <random>
#include <vector>
using namespace std;

// 模拟网络错误的异常层次
class NetworkException : public runtime_error {
public:
    NetworkException(const string& message)
        : runtime_error(message) {}
};

class ConnectionException : public NetworkException {
public:
    ConnectionException(const string& message)
        : NetworkException(message) {}
};

class TimeoutException : public NetworkException {
private:
    int timeoutMs;
    
public:
    TimeoutException(const string& operation, int ms)
        : NetworkException("操作 '" + operation + "' 超时: " + to_string(ms) + "ms"),
          timeoutMs(ms) {}
          
    int getTimeoutMs() const { return timeoutMs; }
};

class DataTransferException : public NetworkException {
private:
    size_t bytesTransferred;
    size_t totalBytes;
    
public:
    DataTransferException(const string& message, size_t transferred, size_t total)
        : NetworkException(message),
          bytesTransferred(transferred),
          totalBytes(total) {}
    
    size_t getBytesTransferred() const { return bytesTransferred; }
    size_t getTotalBytes() const { return totalBytes; }
    double getCompletionPercentage() const { 
        return (totalBytes > 0) ? 
            (static_cast<double>(bytesTransferred) / totalBytes * 100.0) : 0.0;
    }
};

// 安全资源管理的连接类
class Connection {
private:
    string hostname;
    int port;
    bool connected;
    
    // 随机数生成器模拟错误
    mt19937 rng;
    uniform_int_distribution<int> dist;
    
public:
    Connection(const string& host, int p)
        : hostname(host), port(p), connected(false),
          rng(random_device{}()), dist(1, 10) {
        cout << "创建到 " << hostname << ":" << port << " 的连接对象" << endl;
    }
    
    ~Connection() {
        if (connected) {
            disconnect();
        }
        cout << "销毁连接对象" << endl;
    }
    
    void connect(int timeoutMs = 5000) {
        cout << "尝试连接到 " << hostname << ":" << port 
             << " (超时: " << timeoutMs << "ms)" << endl;
        
        // 模拟连接延迟
        this_thread::sleep_for(chrono::milliseconds(500));
        
        // 模拟连接错误
        int errorCode = dist(rng);
        if (errorCode <= 2) {
            throw ConnectionException("无法连接到服务器: " + hostname);
        }
        if (errorCode == 3) {
            throw TimeoutException("connect", timeoutMs);
        }
        
        connected = true;
        cout << "连接成功!" << endl;
    }
    
    void disconnect() {
        if (!connected) {
            return;
        }
        
        cout << "断开连接..." << endl;
        connected = false;
    }
    
    vector<char> sendRequest(const string& request, int timeoutMs = 3000) {
        if (!connected) {
            throw NetworkException("发送前必须先连接");
        }
        
        cout << "发送请求: " << request << endl;
        
        // 模拟请求延迟
        this_thread::sleep_for(chrono::milliseconds(300));
        
        // 模拟发送错误
        int errorCode = dist(rng);
        if (errorCode == 1) {
            throw DataTransferException("发送请求失败", 
                                      request.length() / 2, 
                                      request.length());
        }
        if (errorCode == 2) {
            throw TimeoutException("sendRequest", timeoutMs);
        }
        
        // 模拟响应
        vector<char> response(100);
        for (size_t i = 0; i < response.size(); ++i) {
            response[i] = 'A' + (i % 26);
        }
        
        // 模拟接收错误
        if (errorCode == 3) {
            throw DataTransferException("接收响应失败", 
                                      response.size() / 3, 
                                      response.size());
        }
        
        cout << "收到 " << response.size() << " 字节的响应" << endl;
        return response;
    }
};

// 安全网络客户端
class NetworkClient {
private:
    string hostname;
    int port;
    int maxRetries;
    int timeoutMs;
    
public:
    NetworkClient(const string& host, int p, int retries = 3, int timeout = 5000)
        : hostname(host), port(p), maxRetries(retries), timeoutMs(timeout) {}
    
    vector<char> executeRequest(const string& request) {
        for (int attempt = 1; attempt <= maxRetries; ++attempt) {
            cout << "请求尝试 " << attempt << "/" << maxRetries << endl;
            
            unique_ptr<Connection> conn;
            try {
                // 创建连接
                conn = make_unique<Connection>(hostname, port);
                
                // 建立连接
                conn->connect(timeoutMs);
                
                // 发送请求并获取响应
                vector<char> response = conn->sendRequest(request, timeoutMs);
                
                // 正常断开连接
                conn->disconnect();
                
                return response;
                
            } catch (const TimeoutException& e) {
                cerr << "超时错误: " << e.what() << endl;
                cerr << "尝试重新连接..." << endl;
                
                // 继续下一次重试
                continue;
                
            } catch (const DataTransferException& e) {
                cerr << "数据传输错误: " << e.what() << endl;
                cerr << "已完成: " << e.getCompletionPercentage() << "%" << endl;
                
                if (attempt < maxRetries) {
                    cerr << "尝试重新传输..." << endl;
                    continue;
                } else {
                    cerr << "达到最大重试次数，放弃传输" << endl;
                    throw; // 重新抛出异常
                }
                
            } catch (const ConnectionException& e) {
                cerr << "连接错误: " << e.what() << endl;
                
                if (attempt < maxRetries) {
                    cerr << "尝试重新连接..." << endl;
                    
                    // 增加等待时间，避免立即重连
                    this_thread::sleep_for(chrono::milliseconds(1000));
                    continue;
                } else {
                    cerr << "达到最大重试次数，无法连接" << endl;
                    throw; // 重新抛出异常
                }
                
            } catch (const NetworkException& e) {
                cerr << "网络错误: " << e.what() << endl;
                throw; // 重新抛出其他网络异常
            }
        }
        
        throw NetworkException("所有重试都失败了");
    }
};

int main() {
    try {
        NetworkClient client("example.com", 80, 3);
        vector<char> response = client.executeRequest("GET /index.html HTTP/1.1");
        
        cout << "请求成功，收到 " << response.size() << " 字节的数据" << endl;
        
    } catch (const NetworkException& e) {
        cerr << "网络操作失败: " << e.what() << endl;
    } catch (const exception& e) {
        cerr << "未预期的错误: " << e.what() << endl;
    }
    
    return 0;
}`}
              </CodeBlock>
            </div>
            
            <h3 className="text-lg font-medium mt-6">知识点</h3>
            <ul className="list-disc pl-6 mt-2">
              <li>面向网络编程的异常设计</li>
              <li>RAII原则确保资源释放</li>
              <li>智能指针管理动态资源</li>
              <li>异常重试机制</li>
              <li>异常的层次捕获</li>
            </ul>
            
            <div className="bg-blue-50 p-4 rounded-md mt-4">
              <div className="flex items-center text-blue-700 font-medium mb-2">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">i</span>
                运行示例
              </div>
              <pre className="text-sm text-gray-800 whitespace-pre-wrap">
{`请求尝试 1/3
创建到 example.com:80 的连接对象
尝试连接到 example.com:80 (超时: 5000ms)
连接成功!
发送请求: GET /index.html HTTP/1.1
收到 100 字节的响应
断开连接...
销毁连接对象
请求成功，收到 100 字节的数据`}
              </pre>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-md mt-4">
              <div className="flex items-center text-yellow-700 font-medium mb-2">
                <span className="bg-yellow-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">!</span>
                提示
              </div>
              <ul className="list-disc pl-6">
                <li>实现更细粒度的超时控制</li>
                <li>添加重试策略，如指数退避</li>
                <li>添加断线重连和会话恢复功能</li>
                <li>实现异步请求处理</li>
              </ul>
            </div>
          </div>
        </Card>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 课程头部 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">异常处理</h1>
              <p className="text-gray-600 mt-2">学习C++异常处理机制和RAII技术</p>
            </div>
            <Progress type="circle" percent={75} size={80} />
          </div>
        </div>

        {/* 课程内容 */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <Tabs activeKey={activeTab} onChange={setActiveTab} className="p-6" items={tabItems} />
        </div>

        {/* 底部导航 */}
        <div className="flex justify-between mt-8">
          <Link 
            href="/study/cpp/file-io" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <LeftOutlined className="mr-2" />
            上一课：文件操作
          </Link>
          <Link
            href="/study/cpp/smart-pointers"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            下一课：智能指针
            <RightOutlined className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 
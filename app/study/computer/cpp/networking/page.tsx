'use client';

import { useState } from 'react';
import { Card, Tabs, Progress, Alert } from 'antd';
import { LeftOutlined, RightOutlined, ApiOutlined, CloudOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { CodeBlock } from '@/app/components/ui/CodeBlock';
import Link from 'next/link';
import React from 'react';

export default function NetworkingPage() {
  const [activeTab, setActiveTab] = useState('1');

  const tabItems = [
    {
      key: '1',
      label: <span><ApiOutlined /> Socket基础</span>,
      children: (
        <Card title="Socket编程基础" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">Socket API基础</h3>
            <p>使用Socket API进行网络通信的基础知识。</p>
            <CodeBlock language="cpp">
              {`#include <iostream>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <string.h>
using namespace std;

// 基本的Socket服务器
int createServer(int port) {
    int serverSocket = socket(AF_INET, SOCK_STREAM, 0);
    if (serverSocket == -1) {
        cerr << "创建socket失败" << endl;
        return -1;
    }
    
    sockaddr_in serverAddr;
    serverAddr.sin_family = AF_INET;
    serverAddr.sin_port = htons(port);
    serverAddr.sin_addr.s_addr = INADDR_ANY;
    
    if (bind(serverSocket, (struct sockaddr*)&serverAddr, sizeof(serverAddr)) < 0) {
        cerr << "绑定失败" << endl;
        return -1;
    }
    
    if (listen(serverSocket, 5) < 0) {
        cerr << "监听失败" << endl;
        return -1;
    }
    
    cout << "服务器启动，监听端口 " << port << endl;
    return serverSocket;
}

// 基本的Socket客户端
int createClient(const char* serverIP, int port) {
    int clientSocket = socket(AF_INET, SOCK_STREAM, 0);
    if (clientSocket == -1) {
        cerr << "创建socket失败" << endl;
        return -1;
    }
    
    sockaddr_in serverAddr;
    serverAddr.sin_family = AF_INET;
    serverAddr.sin_port = htons(port);
    inet_pton(AF_INET, serverIP, &serverAddr.sin_addr);
    
    if (connect(clientSocket, (struct sockaddr*)&serverAddr, sizeof(serverAddr)) < 0) {
        cerr << "连接失败" << endl;
        return -1;
    }
    
    cout << "已连接到服务器" << endl;
    return clientSocket;
}`}
            </CodeBlock>
            <Alert
              className="mt-4"
              message="Socket编程基础知识"
              description={
                <ul className="list-disc pl-6">
                  <li>Socket是网络通信的基本接口</li>
                  <li>支持TCP和UDP协议</li>
                  <li>包含服务器端和客户端两种角色</li>
                  <li>需要处理字节序转换</li>
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
      label: <span><CloudOutlined /> TCP通信</span>,
      children: (
        <Card title="TCP通信实现" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">TCP服务器和客户端</h3>
            <p>实现基于TCP协议的可靠通信。</p>
            <CodeBlock language="cpp">
              {`#include <iostream>
#include <thread>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <string.h>
using namespace std;

// TCP服务器处理客户端连接
void handleClient(int clientSocket) {
    char buffer[1024] = {0};
    while (true) {
        // 接收数据
        int bytesRead = recv(clientSocket, buffer, sizeof(buffer), 0);
        if (bytesRead <= 0) {
            cout << "客户端断开连接" << endl;
            break;
        }
        
        cout << "收到: " << buffer << endl;
        
        // 发送响应
        string response = "服务器已收到消息: ";
        response += buffer;
        send(clientSocket, response.c_str(), response.length(), 0);
        
        memset(buffer, 0, sizeof(buffer));
    }
    close(clientSocket);
}

// TCP服务器主循环
void runServer(int port) {
    int serverSocket = createServer(port);
    if (serverSocket < 0) return;
    
    while (true) {
        sockaddr_in clientAddr;
        socklen_t clientLen = sizeof(clientAddr);
        
        int clientSocket = accept(serverSocket, (struct sockaddr*)&clientAddr, &clientLen);
        if (clientSocket < 0) {
            cerr << "接受连接失败" << endl;
            continue;
        }
        
        // 为每个客户端创建新线程
        thread clientThread(handleClient, clientSocket);
        clientThread.detach();
    }
    
    close(serverSocket);
}

// TCP客户端示例
void runClient(const char* serverIP, int port) {
    int clientSocket = createClient(serverIP, port);
    if (clientSocket < 0) return;
    
    string message;
    while (true) {
        cout << "输入消息 (输入'quit'退出): ";
        getline(cin, message);
        
        if (message == "quit") break;
        
        // 发送消息
        send(clientSocket, message.c_str(), message.length(), 0);
        
        // 接收响应
        char buffer[1024] = {0};
        recv(clientSocket, buffer, sizeof(buffer), 0);
        cout << "服务器响应: " << buffer << endl;
    }
    
    close(clientSocket);
}`}
            </CodeBlock>
            <Alert
              className="mt-4"
              message="TCP通信特点"
              description={
                <ul className="list-disc pl-6">
                  <li>面向连接的可靠通信</li>
                  <li>数据按顺序到达</li>
                  <li>自动处理丢包和重传</li>
                  <li>适合要求可靠性的应用</li>
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
      label: <span><ThunderboltOutlined /> UDP通信</span>,
      children: (
        <Card title="UDP通信实现" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">UDP数据报通信</h3>
            <p>实现基于UDP协议的快速通信。</p>
            <CodeBlock language="cpp">
              {`#include <iostream>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <string.h>
using namespace std;

// UDP服务器
void runUDPServer(int port) {
    int serverSocket = socket(AF_INET, SOCK_DGRAM, 0);
    if (serverSocket < 0) {
        cerr << "创建socket失败" << endl;
        return;
    }
    
    sockaddr_in serverAddr;
    serverAddr.sin_family = AF_INET;
    serverAddr.sin_port = htons(port);
    serverAddr.sin_addr.s_addr = INADDR_ANY;
    
    if (bind(serverSocket, (struct sockaddr*)&serverAddr, sizeof(serverAddr)) < 0) {
        cerr << "绑定失败" << endl;
        return;
    }
    
    cout << "UDP服务器启动，监听端口 " << port << endl;
    
    char buffer[1024];
    while (true) {
        sockaddr_in clientAddr;
        socklen_t clientLen = sizeof(clientAddr);
        
        // 接收数据
        int bytesRead = recvfrom(serverSocket, buffer, sizeof(buffer), 0,
                               (struct sockaddr*)&clientAddr, &clientLen);
        
        if (bytesRead > 0) {
            buffer[bytesRead] = '\\0';
            cout << "收到来自 " << inet_ntoa(clientAddr.sin_addr) 
                 << ":" << ntohs(clientAddr.sin_port)
                 << " 的消息: " << buffer << endl;
            
            // 发送响应
            string response = "已收到消息";
            sendto(serverSocket, response.c_str(), response.length(), 0,
                  (struct sockaddr*)&clientAddr, clientLen);
        }
    }
    
    close(serverSocket);
}

// UDP客户端
void runUDPClient(const char* serverIP, int port) {
    int clientSocket = socket(AF_INET, SOCK_DGRAM, 0);
    if (clientSocket < 0) {
        cerr << "创建socket失败" << endl;
        return;
    }
    
    sockaddr_in serverAddr;
    serverAddr.sin_family = AF_INET;
    serverAddr.sin_port = htons(port);
    inet_pton(AF_INET, serverIP, &serverAddr.sin_addr);
    
    string message;
    while (true) {
        cout << "输入消息 (输入'quit'退出): ";
        getline(cin, message);
        
        if (message == "quit") break;
        
        // 发送消息
        sendto(clientSocket, message.c_str(), message.length(), 0,
               (struct sockaddr*)&serverAddr, sizeof(serverAddr));
        
        // 接收响应
        char buffer[1024] = {0};
        sockaddr_in responseAddr;
        socklen_t responseLen = sizeof(responseAddr);
        
        recvfrom(clientSocket, buffer, sizeof(buffer), 0,
                 (struct sockaddr*)&responseAddr, &responseLen);
                 
        cout << "服务器响应: " << buffer << endl;
    }
    
    close(clientSocket);
}`}
            </CodeBlock>
            <Alert
              className="mt-4"
              message="UDP通信特点"
              description={
                <ul className="list-disc pl-6">
                  <li>无连接的数据报通信</li>
                  <li>不保证数据按顺序到达</li>
                  <li>不保证数据可靠性</li>
                  <li>适合实时性要求高的应用</li>
                </ul>
              }
              type="info"
              showIcon
            />
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
              <h1 className="text-3xl font-bold text-gray-900">网络编程</h1>
              <p className="text-gray-600 mt-2">学习C++网络编程的基础知识和实践应用</p>
            </div>
            <Progress type="circle" percent={85} size={80} strokeColor="#722ed1" />
          </div>
        </div>

        {/* 课程内容 */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <Tabs activeKey={activeTab} onChange={setActiveTab} className="p-6" items={tabItems} />
        </div>

        {/* 底部导航 */}
        <div className="flex justify-between mt-8">
          <Link 
            href="/study/cpp/multithreading" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <LeftOutlined className="mr-2" />
            上一课：多线程编程
          </Link>
          <Link
            href="/study/cpp/projects"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            下一课：项目实战
            <RightOutlined className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 
'use client';

import { useState } from 'react';
import { Card, Tabs, Progress, Alert } from 'antd';
import { LeftOutlined, CommentOutlined, FileOutlined, DatabaseOutlined, RightOutlined } from '@ant-design/icons';
import { CodeBlock } from '@/app/components/ui/CodeBlock';
import Link from 'next/link';
import React from 'react';

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState('1');

  const tabItems = [
    {
      key: '1',
      label: <span><CommentOutlined /> 聊天室项目</span>,
      children: (
        <Card title="多人聊天室实现" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">聊天室服务器</h3>
            <p>使用TCP实现多人聊天室功能。</p>
            <CodeBlock language="cpp">
              {`#include <iostream>
#include <vector>
#include <thread>
#include <mutex>
#include <string>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <string.h>
using namespace std;

class ChatServer {
private:
    int serverSocket;
    vector<int> clientSockets;
    mutex clientsMutex;
    
    // 广播消息给所有客户端
    void broadcast(const string& message, int excludeSocket = -1) {
        lock_guard<mutex> lock(clientsMutex);
        for (int clientSocket : clientSockets) {
            if (clientSocket != excludeSocket) {
                send(clientSocket, message.c_str(), message.length(), 0);
            }
        }
    }
    
    // 处理单个客户端
    void handleClient(int clientSocket) {
        char buffer[1024];
        string welcomeMsg = "欢迎加入聊天室！";
        send(clientSocket, welcomeMsg.c_str(), welcomeMsg.length(), 0);
        
        while (true) {
            memset(buffer, 0, sizeof(buffer));
            int bytesRead = recv(clientSocket, buffer, sizeof(buffer), 0);
            
            if (bytesRead <= 0) {
                // 客户端断开连接
                {
                    lock_guard<mutex> lock(clientsMutex);
                    auto it = find(clientSockets.begin(), clientSockets.end(), clientSocket);
                    if (it != clientSockets.end()) {
                        clientSockets.erase(it);
                    }
                }
                string disconnectMsg = "一个用户离开了聊天室";
                broadcast(disconnectMsg, clientSocket);
                close(clientSocket);
                break;
            }
            
            // 广播消息
            string message = string(buffer);
            broadcast(message, clientSocket);
        }
    }

public:
    ChatServer(int port) {
        serverSocket = socket(AF_INET, SOCK_STREAM, 0);
        if (serverSocket == -1) {
            throw runtime_error("创建socket失败");
        }
        
        sockaddr_in serverAddr;
        serverAddr.sin_family = AF_INET;
        serverAddr.sin_port = htons(port);
        serverAddr.sin_addr.s_addr = INADDR_ANY;
        
        if (bind(serverSocket, (struct sockaddr*)&serverAddr, sizeof(serverAddr)) < 0) {
            throw runtime_error("绑定失败");
        }
        
        if (listen(serverSocket, 5) < 0) {
            throw runtime_error("监听失败");
        }
        
        cout << "聊天室服务器启动，监听端口 " << port << endl;
    }
    
    void start() {
        while (true) {
            sockaddr_in clientAddr;
            socklen_t clientLen = sizeof(clientAddr);
            
            int clientSocket = accept(serverSocket, (struct sockaddr*)&clientAddr, &clientLen);
            if (clientSocket < 0) {
                cerr << "接受连接失败" << endl;
                continue;
            }
            
            {
                lock_guard<mutex> lock(clientsMutex);
                clientSockets.push_back(clientSocket);
            }
            
            // 为新客户端创建线程
            thread clientThread(&ChatServer::handleClient, this, clientSocket);
            clientThread.detach();
            
            string newUserMsg = "新用户加入聊天室";
            broadcast(newUserMsg, clientSocket);
        }
    }
    
    ~ChatServer() {
        close(serverSocket);
    }
};`}
            </CodeBlock>
            <Alert
              className="mt-4"
              message="聊天室功能特点"
              description={
                <ul className="list-disc pl-6">
                  <li>支持多客户端同时连接</li>
                  <li>实时消息广播</li>
                  <li>线程安全的客户端管理</li>
                  <li>优雅的连接和断开处理</li>
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
      label: <span><FileOutlined /> 文件传输</span>,
      children: (
        <Card title="文件传输系统" className="mb-6">
          <div className="space-y-4 mt-4">
            <h3 className="text-xl font-semibold mb-4">文件传输实现</h3>
            <p>实现基于TCP的文件传输功能。</p>
            <CodeBlock language="cpp">
              {`#include <iostream>
#include <fstream>
#include <vector>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <string.h>
using namespace std;

class FileTransfer {
private:
    static const int BUFFER_SIZE = 8192;
    
    // 发送文件大小信息
    static void sendFileSize(int socket, size_t fileSize) {
        send(socket, &fileSize, sizeof(fileSize), 0);
    }
    
    // 接收文件大小信息
    static size_t receiveFileSize(int socket) {
        size_t fileSize;
        recv(socket, &fileSize, sizeof(fileSize), 0);
        return fileSize;
    }

public:
    // 发送文件
    static bool sendFile(int socket, const string& filePath) {
        ifstream file(filePath, ios::binary);
        if (!file) {
            cerr << "无法打开文件: " << filePath << endl;
            return false;
        }
        
        // 获取文件大小
        file.seekg(0, ios::end);
        size_t fileSize = file.tellg();
        file.seekg(0, ios::beg);
        
        // 发送文件大小
        sendFileSize(socket, fileSize);
        
        // 发送文件内容
        vector<char> buffer(BUFFER_SIZE);
        size_t totalSent = 0;
        
        while (totalSent < fileSize) {
            size_t remaining = fileSize - totalSent;
            size_t toRead = min(remaining, (size_t)BUFFER_SIZE);
            
            file.read(buffer.data(), toRead);
            size_t bytesRead = file.gcount();
            
            size_t bytesSent = send(socket, buffer.data(), bytesRead, 0);
            if (bytesSent <= 0) {
                cerr << "发送文件失败" << endl;
                file.close();
                return false;
            }
            
            totalSent += bytesSent;
            
            // 显示进度
            float progress = (float)totalSent / fileSize * 100;
            cout << "\\r发送进度: " << progress << "%" << flush;
        }
        
        cout << endl << "文件发送完成" << endl;
        file.close();
        return true;
    }
    
    // 接收文件
    static bool receiveFile(int socket, const string& savePath) {
        // 接收文件大小
        size_t fileSize = receiveFileSize(socket);
        cout << "准备接收文件，大小: " << fileSize << " 字节" << endl;
        
        ofstream file(savePath, ios::binary);
        if (!file) {
            cerr << "无法创建文件: " << savePath << endl;
            return false;
        }
        
        // 接收文件内容
        vector<char> buffer(BUFFER_SIZE);
        size_t totalReceived = 0;
        
        while (totalReceived < fileSize) {
            size_t remaining = fileSize - totalReceived;
            size_t toReceive = min(remaining, (size_t)BUFFER_SIZE);
            
            size_t bytesReceived = recv(socket, buffer.data(), toReceive, 0);
            if (bytesReceived <= 0) {
                cerr << "接收文件失败" << endl;
                file.close();
                return false;
            }
            
            file.write(buffer.data(), bytesReceived);
            totalReceived += bytesReceived;
            
            // 显示进度
            float progress = (float)totalReceived / fileSize * 100;
            cout << "\\r接收进度: " << progress << "%" << flush;
        }
        
        cout << endl << "文件接收完成" << endl;
        file.close();
        return true;
    }
};

// 文件服务器示例
class FileServer {
private:
    int serverSocket;
    string saveDir;

public:
    FileServer(int port, const string& saveDirectory) 
        : saveDir(saveDirectory) {
        serverSocket = socket(AF_INET, SOCK_STREAM, 0);
        if (serverSocket == -1) {
            throw runtime_error("创建socket失败");
        }
        
        sockaddr_in serverAddr;
        serverAddr.sin_family = AF_INET;
        serverAddr.sin_port = htons(port);
        serverAddr.sin_addr.s_addr = INADDR_ANY;
        
        if (bind(serverSocket, (struct sockaddr*)&serverAddr, sizeof(serverAddr)) < 0) {
            throw runtime_error("绑定失败");
        }
        
        if (listen(serverSocket, 5) < 0) {
            throw runtime_error("监听失败");
        }
        
        cout << "文件服务器启动，监听端口 " << port << endl;
    }
    
    void start() {
        while (true) {
            sockaddr_in clientAddr;
            socklen_t clientLen = sizeof(clientAddr);
            
            int clientSocket = accept(serverSocket, (struct sockaddr*)&clientAddr, &clientLen);
            if (clientSocket < 0) {
                cerr << "接受连接失败" << endl;
                continue;
            }
            
            // 接收文件名
            char filename[256] = {0};
            recv(clientSocket, filename, sizeof(filename), 0);
            
            string savePath = saveDir + "/" + filename;
            cout << "接收文件: " << savePath << endl;
            
            // 接收文件
            if (FileTransfer::receiveFile(clientSocket, savePath)) {
                string response = "文件上传成功";
                send(clientSocket, response.c_str(), response.length(), 0);
            } else {
                string response = "文件上传失败";
                send(clientSocket, response.c_str(), response.length(), 0);
            }
            
            close(clientSocket);
        }
    }
    
    ~FileServer() {
        close(serverSocket);
    }
};`}
            </CodeBlock>
            <Alert
              className="mt-4"
              message="文件传输系统特点"
              description={
                <ul className="list-disc pl-6">
                  <li>支持大文件传输</li>
                  <li>显示传输进度</li>
                  <li>错误处理和恢复</li>
                  <li>服务器端自动保存</li>
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
              <h1 className="text-3xl font-bold text-gray-900">项目实战</h1>
              <p className="text-gray-600 mt-2">通过实际项目学习C++网络编程和多线程应用</p>
            </div>
            <Progress type="circle" percent={90} size={80} strokeColor="#eb2f96" />
          </div>
        </div>

        {/* 课程内容 */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <Tabs activeKey={activeTab} onChange={setActiveTab} className="p-6" items={tabItems} />
        </div>

        {/* 底部导航 */}
        <div className="flex justify-between mt-8">
          <Link 
            href="/study/cpp/networking" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <LeftOutlined className="mr-2" />
            上一课：网络编程
          </Link>
          <Link
            href="/study/cpp/headers"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            下一课：C++常用头文件
            <RightOutlined className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
} 
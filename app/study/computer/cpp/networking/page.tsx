'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
  TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'C++编程',
  chapterTitle: '网络编程',
  chapterNumber: 18,
  totalChapters: 18,
  subjectHref: '/study/computer/cpp',
  prevChapter: { label: '多线程编程', href: '/study/computer/cpp/multithreading' },
  nextChapter: { label: '项目实战', href: '/study/computer/cpp/projects' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: 'Socket基础',
    left: (
      <div className="space-y-4">
        <PageTitle>Socket API 基础</PageTitle>
        <BookParagraph>使用 Socket API 进行网络通信的基础知识。</BookParagraph>
        <BookCode language="cpp" showLineNumbers code={`#include <iostream>
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
}`} />
        <BookAlert type="info" message="Socket 是网络通信的基本接口，支持 TCP 和 UDP 协议。服务器端和客户端角色不同，需要处理字节序转换" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>Socket 选项与工具</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`// 设置Socket选项
void setSocketOptions(int sock) {
    // 地址复用
    int opt = 1;
    setsockopt(sock, SOL_SOCKET,
        SO_REUSEADDR, &opt, sizeof(opt));

    // 超时设置
    struct timeval timeout;
    timeout.tv_sec = 5;
    timeout.tv_usec = 0;
    setsockopt(sock, SOL_SOCKET,
        SO_RCVTIMEO, &timeout, sizeof(timeout));

    // 禁用Nagle算法（降低延迟）
    int flag = 1;
    setsockopt(sock, IPPROTO_TCP,
        TCP_NODELAY, &flag, sizeof(flag));
}

// 字节序转换
// htons: host to network short
// htonl: host to network long
// ntohs: network to host short
// ntohl: network to host long`} />
      </div>
    ),
  },
  {
    label: 'TCP通信',
    left: (
      <div className="space-y-4">
        <PageTitle>TCP 服务器与客户端</PageTitle>
        <BookParagraph>实现基于 TCP 协议的可靠通信。</BookParagraph>
        <BookCode language="cpp" showLineNumbers code={`// TCP服务器处理客户端连接
void handleClient(int clientSocket) {
    char buffer[1024] = {0};
    while (true) {
        int bytesRead = recv(clientSocket, buffer, sizeof(buffer), 0);
        if (bytesRead <= 0) {
            cout << "客户端断开连接" << endl;
            break;
        }

        cout << "收到: " << buffer << endl;

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
        if (clientSocket < 0) continue;

        thread clientThread(handleClient, clientSocket);
        clientThread.detach();
    }
    close(serverSocket);
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>TCP 客户端示例</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`// TCP客户端
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
}`} />
        <BookAlert type="info" message="TCP 面向连接的可靠通信，数据按顺序到达，自动处理丢包和重传。适合要求可靠性的应用" />
      </div>
    ),
  },
  {
    label: 'UDP通信',
    left: (
      <div className="space-y-4">
        <PageTitle>UDP 服务器</PageTitle>
        <BookParagraph>实现基于 UDP 协议的快速通信。</BookParagraph>
        <BookCode language="cpp" showLineNumbers code={`// UDP服务器
void runUDPServer(int port) {
    int serverSocket = socket(AF_INET, SOCK_DGRAM, 0);
    if (serverSocket < 0) { cerr << "创建socket失败" << endl; return; }

    sockaddr_in serverAddr;
    serverAddr.sin_family = AF_INET;
    serverAddr.sin_port = htons(port);
    serverAddr.sin_addr.s_addr = INADDR_ANY;

    if (bind(serverSocket, (struct sockaddr*)&serverAddr, sizeof(serverAddr)) < 0) {
        cerr << "绑定失败" << endl; return;
    }

    cout << "UDP服务器启动，监听端口 " << port << endl;

    char buffer[1024];
    while (true) {
        sockaddr_in clientAddr;
        socklen_t clientLen = sizeof(clientAddr);

        int bytesRead = recvfrom(serverSocket, buffer, sizeof(buffer), 0,
                               (struct sockaddr*)&clientAddr, &clientLen);
        if (bytesRead > 0) {
            buffer[bytesRead] = '\\0';
            cout << "收到来自 " << inet_ntoa(clientAddr.sin_addr)
                 << ":" << ntohs(clientAddr.sin_port)
                 << " 的消息: " << buffer << endl;

            string response = "已收到消息";
            sendto(serverSocket, response.c_str(), response.length(), 0,
                  (struct sockaddr*)&clientAddr, clientLen);
        }
    }
    close(serverSocket);
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>UDP 客户端</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`// UDP客户端
void runUDPClient(const char* serverIP, int port) {
    int clientSocket = socket(AF_INET, SOCK_DGRAM, 0);
    sockaddr_in serverAddr;
    serverAddr.sin_family = AF_INET;
    serverAddr.sin_port = htons(port);
    inet_pton(AF_INET, serverIP, &serverAddr.sin_addr);

    string message;
    while (true) {
        cout << "输入消息 (输入'quit'退出): ";
        getline(cin, message);
        if (message == "quit") break;

        sendto(clientSocket, message.c_str(), message.length(), 0,
               (struct sockaddr*)&serverAddr, sizeof(serverAddr));

        char buffer[1024] = {0};
        sockaddr_in responseAddr;
        socklen_t responseLen = sizeof(responseAddr);
        recvfrom(clientSocket, buffer, sizeof(buffer), 0,
                 (struct sockaddr*)&responseAddr, &responseLen);
        cout << "服务器响应: " << buffer << endl;
    }
    close(clientSocket);
}`} />
        <BookAlert type="warning" message="UDP 无连接不可靠，但速度快延迟低。适合视频流、DNS 查询等可以容忍丢包的场景" />
        <TagGrid items={['socket', 'TCP', 'UDP', 'bind', 'listen', 'connect', 'send', 'recv']} />
      </div>
    ),
  },
]

export default function NetworkingPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

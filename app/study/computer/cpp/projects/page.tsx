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
  chapterTitle: '项目实战',
  chapterNumber: 19,
  totalChapters: 18,
  subjectHref: '/study/computer/cpp',
  prevChapter: { label: '网络编程', href: '/study/computer/cpp/networking' },
  nextChapter: { label: 'C++常用头文件', href: '/study/computer/cpp/headers' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '聊天室项目',
    left: (
      <div className="space-y-4">
        <PageTitle>多人聊天室 — 服务器</PageTitle>
        <BookParagraph>使用 TCP 实现多人聊天室功能，综合运用 Socket、多线程和容器。</BookParagraph>
        <BookCode language="cpp" showLineNumbers code={`class ChatServer {
private:
    int serverSocket;
    vector<int> clientSockets;
    mutex clientsMutex;

    void broadcast(const string& message, int excludeSocket = -1) {
        lock_guard<mutex> lock(clientsMutex);
        for (int clientSocket : clientSockets) {
            if (clientSocket != excludeSocket) {
                send(clientSocket, message.c_str(), message.length(), 0);
            }
        }
    }

    void handleClient(int clientSocket) {
        char buffer[1024];
        string welcomeMsg = "欢迎加入聊天室！";
        send(clientSocket, welcomeMsg.c_str(), welcomeMsg.length(), 0);

        while (true) {
            memset(buffer, 0, sizeof(buffer));
            int bytesRead = recv(clientSocket, buffer, sizeof(buffer), 0);

            if (bytesRead <= 0) {
                {
                    lock_guard<mutex> lock(clientsMutex);
                    auto it = find(clientSockets.begin(), clientSockets.end(), clientSocket);
                    if (it != clientSockets.end()) clientSockets.erase(it);
                }
                broadcast("一个用户离开了聊天室", clientSocket);
                close(clientSocket);
                break;
            }
            broadcast(string(buffer), clientSocket);
        }
    }`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>服务器主循环</PageTitle>
        <BookCode language="cpp" showLineNumbers code={`public:
    ChatServer(int port) {
        serverSocket = socket(AF_INET, SOCK_STREAM, 0);
        if (serverSocket == -1) throw runtime_error("创建socket失败");

        sockaddr_in serverAddr;
        serverAddr.sin_family = AF_INET;
        serverAddr.sin_port = htons(port);
        serverAddr.sin_addr.s_addr = INADDR_ANY;

        if (bind(serverSocket, (struct sockaddr*)&serverAddr, sizeof(serverAddr)) < 0)
            throw runtime_error("绑定失败");
        if (listen(serverSocket, 5) < 0)
            throw runtime_error("监听失败");
    }

    void start() {
        cout << "聊天室服务器已启动..." << endl;
        while (true) {
            sockaddr_in clientAddr;
            socklen_t clientLen = sizeof(clientAddr);
            int clientSocket = accept(serverSocket, (struct sockaddr*)&clientAddr, &clientLen);
            if (clientSocket < 0) continue;

            {
                lock_guard<mutex> lock(clientsMutex);
                clientSockets.push_back(clientSocket);
            }
            thread(&ChatServer::handleClient, this, clientSocket).detach();
        }
    }
};`} />
        <BookAlert type="info" message="本项目综合了 Socket 编程、多线程（每个客户端一个线程）、mutex 同步、STL 容器等核心技术" />
      </div>
    ),
  },
  {
    label: '项目展示',
    left: (
      <div className="space-y-4">
        <PageTitle>聊天室客户端</PageTitle>
        <BookParagraph>聊天室客户端负责连接服务器、发送和接收消息。</BookParagraph>
        <BookCode language="cpp" showLineNumbers code={`void chatClient(const char* serverIP, int port) {
    int clientSocket = socket(AF_INET, SOCK_STREAM, 0);
    sockaddr_in serverAddr;
    serverAddr.sin_family = AF_INET;
    serverAddr.sin_port = htons(port);
    inet_pton(AF_INET, serverIP, &serverAddr.sin_addr);

    if (connect(clientSocket, (struct sockaddr*)&serverAddr, sizeof(serverAddr)) < 0) {
        cerr << "连接服务器失败" << endl;
        return;
    }

    // 启动接收线程
    thread recvThread([clientSocket]() {
        char buffer[1024];
        while (true) {
            memset(buffer, 0, sizeof(buffer));
            int bytesRead = recv(clientSocket, buffer, sizeof(buffer), 0);
            if (bytesRead <= 0) break;
            cout << buffer << endl;
        }
    });
    recvThread.detach();

    // 主线程发送消息
    string message;
    while (getline(cin, message)) {
        if (message == "/quit") break;
        send(clientSocket, message.c_str(), message.length(), 0);
    }
    close(clientSocket);
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>更多项目思路</PageTitle>
        <div className="space-y-3">
          {[
            { title: '文件传输工具', desc: '使用 Socket 实现文件上传下载，支持断点续传和进度显示' },
            { title: '简易编译器', desc: '集成词法分析、语法分析，将 C++ 源码编译为中间代码' },
            { title: '迷你数据库', desc: '实现 B+ 树索引、SQL 解析、事务日志的基本功能' },
            { title: 'HTTP 服务器', desc: '实现 HTTP/1.1 协议，支持静态文件服务和 CGI 脚本' },
          ].map((item, i) => (
            <div key={i} className="flex gap-3 p-3 rounded-md bg-paper-200/60">
              <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold"
                style={{ background: `${THEMES.computer.accent}15`, color: THEMES.computer.accent }}>
                {i + 1}
              </span>
              <div>
                <h3 className="text-sm font-medium text-ink">{item.title}</h3>
                <p className="text-xs text-ink-light">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <BookAlert type="info" message="选择感兴趣的项目动手实践，遇到问题先调试定位再查阅资料，编程能力的提升在于解决实际问题的过程" />
      </div>
    ),
  },
]

export default function ProjectsPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

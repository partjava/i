'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { Button, Input, Spin, Alert, message } from 'antd';
import { SendOutlined, RobotOutlined, UserOutlined, CopyOutlined } from '@ant-design/icons';

// 定义消息类型
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  contentBlocks?: ContentBlock[];
}

interface ContentBlock {
  type: 'text' | 'code';
  content: any;
}

interface CodeContent {
  language: string;
  code: string;
}

export default function AIAssistantPage() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  // 初始化欢迎消息
  useEffect(() => {
    const welcomeMessage: Message = {
      id: 'welcome',
      role: 'assistant',
      content: '你好！我是PartJava AI助手，有什么我可以帮助你的吗？',
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, []);

  // 自动滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 发送消息到AI服务
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: input,
          conversation_id: conversationId,
          user_id: session?.user?.id || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error(`请求失败: ${response.status}`);
      }

      const data = await response.json();

      // 如果没有对话ID，保存新创建的对话ID
      if (!conversationId && data.conversation_id) {
        setConversationId(data.conversation_id);
      }

      const aiMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: data.answer,
        timestamp: new Date(),
        contentBlocks: data.content_blocks,
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error('AI请求错误:', err);
      setError(err instanceof Error ? err.message : '请求失败，请稍后再试');
      message.error('AI请求失败，请稍后再试');
    } finally {
      setLoading(false);
    }
  };

  // 处理输入框回车事件
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // 复制代码到剪贴板
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => message.success('已复制到剪贴板'))
      .catch(() => message.error('复制失败'));
  };

  // 渲染代码块
  const renderCodeBlock = (block: ContentBlock, index: number) => {
    if (block.type !== 'code') return null;
    
    const codeContent = block.content as CodeContent;
    return (
      <div key={index} className="relative mt-2 mb-4 rounded-md overflow-hidden">
        <div className="flex justify-between items-center bg-gray-800 text-gray-200 px-4 py-2 text-sm">
          <span>{codeContent.language}</span>
          <Button 
            type="text" 
            size="small" 
            icon={<CopyOutlined />} 
            onClick={() => copyToClipboard(codeContent.code)}
            className="text-gray-200 hover:text-white"
          >
            复制
          </Button>
        </div>
        <pre className="bg-gray-900 text-green-400 p-4 overflow-x-auto">
          <code>{codeContent.code}</code>
        </pre>
      </div>
    );
  };

  // 渲染消息内容
  const renderMessageContent = (message: Message) => {
    if (!message.contentBlocks) {
      return <p className="whitespace-pre-wrap">{message.content}</p>;
    }

    // 如果有内容块，处理复杂内容
    return (
      <div>
        {message.contentBlocks.map((block, index) => {
          if (block.type === 'code') {
            return renderCodeBlock(block, index);
          } else {
            return <p key={index} className="whitespace-pre-wrap">{block.content}</p>;
          }
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 pb-16">
      <div className="bg-white shadow-sm p-4 flex items-center">
        <RobotOutlined className="text-blue-500 text-xl mr-2" />
        <h1 className="text-xl font-semibold">AI助手</h1>
      </div>

      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white border border-gray-200'
              }`}
            >
              <div className="flex items-center mb-1">
                {message.role === 'assistant' ? (
                  <RobotOutlined className="mr-1" />
                ) : (
                  <UserOutlined className="mr-1" />
                )}
                <span className="text-xs opacity-75">
                  {message.role === 'assistant' ? 'AI助手' : '我'}
                </span>
              </div>
              {renderMessageContent(message)}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg p-4 bg-white border border-gray-200">
              <Spin size="small" /> <span className="ml-2">AI正在思考...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 错误提示 */}
      {error && (
        <div className="px-4 mb-2">
          <Alert message={error} type="error" showIcon closable />
        </div>
      )}

      {/* 输入框 */}
      <div className="bg-white border-t border-gray-200 p-3 safe-area-inset-bottom">
        <div className="flex">
          <Input.TextArea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="输入你的问题..."
            autoSize={{ minRows: 1, maxRows: 4 }}
            className="flex-1 mr-2"
            disabled={loading}
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={sendMessage}
            loading={loading}
            className="flex-shrink-0"
          />
        </div>
        <div className="text-xs text-gray-400 mt-1 text-center">
          提示: 按Enter发送，Shift+Enter换行
        </div>
      </div>
    </div>
  );
}


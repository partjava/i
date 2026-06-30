'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@shared/hooks/useAuth';
import { Button, Input, Spin, Alert, message } from 'antd';
import { SendOutlined, RobotOutlined, UserOutlined, CopyOutlined } from '@ant-design/icons';

//
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
  const { data: session } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  //
  useEffect(() => {
    const welcomeMessage: Message = {
      id: 'welcome',
      role: 'assistant',
      content: '你好！我是AI助手，有什么可以帮助你的？',
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, []);

  //
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  //
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
      const response = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: input,
          conversationId: conversationId ? Number(conversationId) : undefined,
          user_id: session?.user?.id || undefined,
        }),
      });

      if (!response.ok) {
        //
      }

      const result = await response.json();
      const data = result.data || result;

      //
      if (!conversationId && data.conversationId) {
        setConversationId(data.conversationId);
      }

      const aiMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: data.answer,
        timestamp: new Date(),
        contentBlocks: data.contentBlocks,
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      //
      //
      //
    } finally {
      setLoading(false);
    }
  };

  //
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  //
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      //
      //
  };

  //
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
            //
          </Button>
        </div>
        <pre className="bg-gray-900 text-green-400 p-4 overflow-x-auto">
          <code>{codeContent.code}</code>
        </pre>
      </div>
    );
  };

  //
  const renderMessageContent = (message: Message) => {
    if (!message.contentBlocks) {
      return <p className="whitespace-pre-wrap">{message.content}</p>;
    }

    //
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
        //
      </div>

      //
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
                  //
                </span>
              </div>
              {renderMessageContent(message)}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg p-4 bg-white border border-gray-200">
              //
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      //
      {error && (
        <div className="px-4 mb-2">
          <Alert message={error} type="error" showIcon closable />
        </div>
      )}

      //
      <div className="bg-white border-t border-gray-200 p-3 safe-area-inset-bottom">
        <div className="flex">
          <Input.TextArea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            //
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
          //
        </div>
      </div>
    </div>
  );
}




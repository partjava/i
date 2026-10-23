'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { soundSynth } from '../RetroAudioSynth';

interface CodeSnippet {
  title: string;
  code: string;
  lang: string;
}

const SNIPPETS: Record<string, CodeSnippet[]> = {
  java: [
    { title: 'Main 入口方法', code: 'public static void main(String[] args)', lang: 'Java' },
    { title: '泛型集合初始化', code: 'List<String> list = new ArrayList<>();', lang: 'Java' },
    { title: '并发安全映射表', code: 'Map<String, Object> cache = new ConcurrentHashMap<>();', lang: 'Java' },
    { title: 'Stream 流式过滤与收集', code: 'list.stream().filter(Objects::nonNull).collect(Collectors.toList());', lang: 'Java' },
    { title: 'Spring 依赖注入', code: '@Autowired private UserService userService;', lang: 'Java' },
    { title: 'Optional 优雅判空', code: 'return Optional.ofNullable(user).orElseThrow();', lang: 'Java' },
    { title: 'CompletableFuture 异步任务', code: 'CompletableFuture.supplyAsync(() -> fetchRemoteData());', lang: 'Java' },
  ],
  keywords: [
    { title: '微服务架构技术栈', code: 'SpringCloud Kubernetes Docker Redis Kafka Nginx', lang: 'DevOps' },
    { title: '数据库与中间件', code: 'PostgreSQL MongoDB Elasticsearch RabbitMQ ClickHouse', lang: 'DB' },
    { title: '后端核心设计模式', code: 'Singleton Factory Observer Strategy Decorator Proxy', lang: 'DesignPattern' },
  ],
  english: [
    { title: '极客格言 1', code: 'Talk is cheap. Show me the code.', lang: 'English' },
    { title: '极客格言 2', code: 'Stay hungry, stay foolish.', lang: 'English' },
    { title: '极客格言 3', code: 'First, solve the problem. Then, write the code.', lang: 'English' },
  ],
};

export default function TypingRace({
  state,
  onMove
}: {
  state: any;
  onMove: (a: string, p?: any) => void;
}) {
  const [category, setCategory] = useState<'java' | 'keywords' | 'english'>('java');
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [errorsCount, setErrorsCount] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentSnippet = SNIPPETS[category][snippetIndex % SNIPPETS[category].length];
  const targetCode = currentSnippet.code;

  // 重置对局
  const resetRace = useCallback(() => {
    setUserInput('');
    setStartTime(null);
    setElapsed(0);
    setCompleted(false);
    setWpm(0);
    setAccuracy(100);
    setErrorsCount(0);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  useEffect(() => {
    resetRace();
  }, [category, snippetIndex, resetRace]);

  // 计时器与 WPM 实时计算
  useEffect(() => {
    if (startTime && !completed) {
      timerRef.current = setInterval(() => {
        const now = Date.now();
        const seconds = (now - startTime) / 1000;
        setElapsed(seconds);

        // WPM = (字符数 / 5) / 分钟
        if (seconds > 0) {
          const words = userInput.length / 5;
          const currentWpm = Math.round((words / seconds) * 60);
          setWpm(currentWpm);
        }
      }, 200);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTime, completed, userInput.length]);

  // 输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (completed) return;

    const val = e.target.value;
    if (!startTime && val.length === 1) {
      setStartTime(Date.now());
    }

    soundSynth.playKey();

    // 统计错误数
    const lastCharIdx = val.length - 1;
    if (lastCharIdx >= 0 && val[lastCharIdx] !== targetCode[lastCharIdx]) {
      setErrorsCount(c => c + 1);
    }

    setUserInput(val);

    // 实时准确率
    if (val.length > 0) {
      let correctChars = 0;
      for (let i = 0; i < val.length; i++) {
        if (val[i] === targetCode[i]) correctChars++;
      }
      setAccuracy(Math.round((correctChars / val.length) * 100));
    }

    // 完成判断
    if (val === targetCode) {
      setCompleted(true);
      soundSynth.playWin();
      const finalSec = startTime ? (Date.now() - startTime) / 1000 : 1;
      const finalWpm = Math.round((targetCode.length / 5 / finalSec) * 60);
      setWpm(finalWpm);
      onMove('finish', { wpm: finalWpm, accuracy, snippet: currentSnippet.title });
    }
  };

  const nextSnippet = () => {
    setSnippetIndex(i => i + 1);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', userSelect: 'none', width: 480 }}>
      {/* 题库分类选择 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 12 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {[
            { id: 'java', name: '☕ Java 真实代码' },
            { id: 'keywords', name: '🚀 架构与中间件' },
            { id: 'english', name: '🔡 极客金句' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => { setCategory(item.id as any); setSnippetIndex(0); }}
              style={{
                padding: '5px 12px',
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                background: category === item.id ? '#4f8cff' : '#2a2e3d',
                color: category === item.id ? '#fff' : '#9aa4bf',
              }}
            >
              {item.name}
            </button>
          ))}
        </div>

        <button
          onClick={nextSnippet}
          style={{
            padding: '5px 14px',
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            background: '#334155',
            color: '#fff',
          }}
        >
          ⏭️ 下一段代码
        </button>
      </div>

      {/* 实时仪表板 (WPM / 准确率 / 计时) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: 14, padding: '10px 18px', background: '#1c2230', borderRadius: 8, fontSize: 14 }}>
        <div>⚡ 速度: <b style={{ color: '#38bdf8', fontSize: 20 }}>{wpm}</b> <span style={{ fontSize: 11, color: '#888' }}>WPM</span></div>
        <div>🎯 准确率: <b style={{ color: accuracy >= 95 ? '#10b981' : '#f59e0b', fontSize: 18 }}>{accuracy}%</b></div>
        <div>⏱️ 耗时: <b style={{ color: '#fff' }}>{elapsed.toFixed(1)}s</b></div>
        <div>进度: <b style={{ color: '#4f8cff' }}>{userInput.length}/{targetCode.length}</b></div>
      </div>

      {/* 代码显示终端窗体 */}
      <div
        style={{
          width: '100%',
          background: '#0d1117',
          border: '1px solid #30363d',
          borderRadius: 10,
          padding: '18px 22px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
          marginBottom: 16,
          textAlign: 'left',
          fontFamily: '"JetBrains Mono", Consolas, "Courier New", monospace',
        }}
      >
        {/* 终端顶部小红黄绿按钮 */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f56' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#27c93f' }} />
          <span style={{ fontSize: 11, color: '#6e7681', marginLeft: 8 }}>{currentSnippet.title} ({currentSnippet.lang})</span>
        </div>

        {/* 逐字比对字符渲染 */}
        <div style={{ fontSize: 18, lineHeight: 1.6, wordBreak: 'break-all', minHeight: 60 }}>
          {targetCode.split('').map((char, i) => {
            let color = '#6e7681'; // 默认未敲入字符：灰色
            let bg = 'transparent';
            const userChar = userInput[i];

            if (userChar != null) {
              if (userChar === char) {
                color = '#38ef7d'; // 敲对：荧光青绿
              } else {
                color = '#ff4757'; // 敲错：鲜艳红
                bg = 'rgba(255, 71, 87, 0.2)';
              }
            }

            const isCurrent = i === userInput.length;

            return (
              <span
                key={i}
                style={{
                  color,
                  backgroundColor: bg,
                  borderBottom: isCurrent ? '2px solid #38bdf8' : 'none',
                  animation: isCurrent ? 'pulse 0.8s infinite' : 'none',
                }}
              >
                {char}
              </span>
            );
          })}
        </div>
      </div>

      {/* 隐藏的真实输入框与聚焦提示 */}
      <div style={{ width: '100%', position: 'relative' }}>
        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder={completed ? "🎉 编译通过！点击下方按钮继续" : "从键盘直接敲入代码..."}
          disabled={completed}
          autoFocus
          style={{
            width: '100%',
            height: 48,
            padding: '10px 16px',
            fontSize: 16,
            borderRadius: 8,
            border: '2px solid #3b82f6',
            background: '#1e293b',
            color: '#fff',
            fontFamily: 'monospace',
            outline: 'none',
          }}
        />
      </div>

      {/* 完成祝贺与终端跑屏 */}
      {completed && (
        <div style={{ marginTop: 14, width: '100%', padding: 14, background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: '#10b981', fontWeight: 'bold', fontSize: 16 }}>✅ BUILD SUCCESSFUL!</span>
            <div style={{ fontSize: 13, color: '#aaa', marginTop: 2 }}>最终手速: <b style={{ color: '#fff' }}>{wpm} WPM</b> | 准确率: <b style={{ color: '#fff' }}>{accuracy}%</b></div>
          </div>
          <button
            onClick={nextSnippet}
            style={{
              padding: '8px 20px',
              borderRadius: 6,
              border: 'none',
              background: '#10b981',
              color: '#fff',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            挑战下一段 ➔
          </button>
        </div>
      )}

      <div style={{ marginTop: 10, fontSize: 12, color: '#888' }}>
        <span>💡 敲击伴随客制化麻将机械键盘清脆音，实时呈现程序员手速 (WPM) 与准确率！</span>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';

export default function TypingRace({ state, onMove }: { state: any; onMove: (a: string, p?: any) => void }) {
  const word = state?.currentWord || '';
  const idx = state?.currentIndex ?? 0;
  const total = state?.total ?? 0;
  const correct = state?.correct ?? 0;
  const wrong = state?.wrong ?? 0;
  const [input, setInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started || timeLeft <= 0) return;
    const t = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(t);
  }, [started, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && started) {
      // Game over by timeout
    }
  }, [timeLeft, started]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!word || !input.trim()) return;
    if (!started) setStarted(true);
    onMove('type', { word: input.trim() });
    setInput('');
  };

  const progress = total > 0 ? (idx / total * 100) : 0;

  return (
    <div style={{ padding: 20, color: '#fff', textAlign: 'center' }}>
      <div style={{ fontSize: 14, color: '#888', marginBottom: 10 }}>
        ⏱ {timeLeft}s | ✅ {correct} | ❌ {wrong} | {idx}/{total}
      </div>
      <div style={{ width: '100%', height: 6, background: '#333', borderRadius: 3, marginBottom: 20 }}>
        <div style={{ width: `${progress}%`, height: '100%', background: '#4f8cff', borderRadius: 3, transition: 'width 0.3s' }} />
      </div>
      {word ? (
        <>
          <div style={{ fontSize: 36, fontWeight: 'bold', margin: '30px 0', letterSpacing: 2, color: '#ffd700' }}>
            {word}
          </div>
          <form onSubmit={handleSubmit}>
            <input
              value={input} onChange={e => setInput(e.target.value)}
              placeholder="输入上面的单词..."
              style={{ padding: '10px 16px', fontSize: 18, borderRadius: 6, border: 'none', width: 250, textAlign: 'center' }}
              autoFocus
            />
          </form>
        </>
      ) : (
        <div style={{ fontSize: 24, color: '#4caf50' }}>🎉 完成！</div>
      )}
    </div>
  );
}

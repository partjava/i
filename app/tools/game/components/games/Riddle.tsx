'use client';

import React, { useState } from 'react';

export default function Riddle({ state, onMove }: { state: any; onMove: (a: string, p?: any) => void }) {
  const question = state?.currentQuestion;
  const idx = state?.currentIndex ?? 0;
  const total = state?.total ?? 0;
  const lastResult = state?.lastResult;
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim()) onMove('guess', { answer: answer.trim() });
    setAnswer('');
  };

  if (!question) return <div style={{ color: '#fff', padding: 40, textAlign: 'center', fontSize: 18 }}>没有更多谜题了</div>;

  return (
    <div style={{ padding: 20, color: '#fff', textAlign: 'center' }}>
      <div style={{ marginBottom: 10, fontSize: 14, color: '#888' }}>{idx + 1} / {total}</div>
      <div style={{ fontSize: 22, margin: '20px 0', minHeight: 60, lineHeight: 1.5 }}>{question}</div>
      {lastResult && (
        <div style={{ margin: '10px 0', fontSize: 16, color: lastResult === 'correct' ? '#4caf50' : '#ff6b6b' }}>
          {lastResult === 'correct' ? '✅ 答对了！' : `❌ 答案是: ${lastResult}`}
        </div>
      )}
      <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
        <input
          value={answer} onChange={e => setAnswer(e.target.value)}
          placeholder="输入答案..."
          style={{ padding: '8px 16px', fontSize: 16, borderRadius: 6, border: 'none', width: 200 }}
          autoFocus
        />
        <button type="submit" style={{ marginLeft: 8, padding: '8px 20px', fontSize: 16, borderRadius: 6, border: 'none', background: '#4f8cff', color: '#fff', cursor: 'pointer' }}>
          确定
        </button>
      </form>
    </div>
  );
}

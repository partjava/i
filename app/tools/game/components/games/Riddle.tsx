'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { soundSynth } from '../RetroAudioSynth';

interface RiddleItem {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  category: string;
}

const RIDDLE_DATABASE: RiddleItem[] = [
  {
    category: '极客脑洞',
    question: '为什么程序员总是分不清万圣节 (Halloween) 和圣诞节 (Christmas)？',
    options: ['因为加班太多', '因为 Oct 31 == Dec 25 (八进制31等于十进制25)', '因为没有女朋友', '因为都在冬天'],
    answer: '因为 Oct 31 == Dec 25 (八进制31等于十进制25)',
    explanation: '八进制 31: 3*8 + 1 = 25，正好等于十进制 25！极客经典谐音梗。',
  },
  {
    category: '极客脑洞',
    question: '程序员向朋友借了 1000 块钱，后来还钱时还了多少钱？',
    options: ['1000 块', '1024 块 (凑个整)', '1008 块', '996 块'],
    answer: '1024 块 (凑个整)',
    explanation: '在程序员的眼中，1024 (2^10) 才是真正的整数！',
  },
  {
    category: '极客脑洞',
    question: '世界上只有 10 种人，请问是指哪两种？',
    options: ['好人和坏人', '男人和女人', '懂二进制的和不懂二进制的', '写代码的和改Bug的'],
    answer: '懂二进制的和不懂二进制的',
    explanation: '二进制中的 10 转换为十进制正是 2！',
  },
  {
    category: '极客脑洞',
    question: '程序员出门买包子，妻子说：“买一斤包子，如果看到卖西瓜的，买一个。”结果程序员买了什么？',
    options: ['一个西瓜', '一斤包子和一个西瓜', '一个包子', '空手回家'],
    answer: '一个包子',
    explanation: '因为“看到卖西瓜的”条件为真，执行了分支语句“买一个”，于是买了一个包子。',
  },
  {
    category: '极客脑洞',
    question: 'Java 程序员最害怕听到哪一句话？',
    options: ['“今晚通宵发版”', '“又报 NullPointerException 空指针了”', '“需求要重构”', '“服务器 CPU 100% 报警”'],
    answer: '“又报 NullPointerException 空指针了”',
    explanation: 'NullPointerException 是每个 Java 程序员心中永恒的痛！',
  },
  {
    category: '趣味字谜',
    question: '“一月一日非今天” —— 打一字？',
    options: ['明', '朝', '春', '旦'],
    answer: '明',
    explanation: '“一月一日”组合即为“日”和“月”，合成一个“明”字。',
  },
  {
    category: '趣味字谜',
    question: '“一人一张口，下面长只手” —— 打一字？',
    options: ['拿', '盒', '哈', '合'],
    answer: '拿',
    explanation: '“合”即“一人一口”，下面长一只“手”，合为“拿”。',
  },
  {
    category: '脑筋急转弯',
    question: '什么东西越洗越脏，不洗反而能吃？',
    options: ['泥鳅', '水', '萝卜', '抹布'],
    answer: '水',
    explanation: '水洗了别的东西就变脏了，不洗的水干净能喝！',
  },
];

export default function Riddle({
  state,
  onMove
}: {
  state: any;
  onMove: (a: string, p?: any) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [score, setScore] = useState(0);

  const currentRiddle = RIDDLE_DATABASE[currentIndex % RIDDLE_DATABASE.length];

  const handleSelect = (option: string) => {
    if (showResult) return;
    setSelectedOption(option);
    setShowResult(true);

    const isCorrect = option === currentRiddle.answer;
    if (isCorrect) {
      soundSynth.playWin();
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      if (nextStreak > maxStreak) setMaxStreak(nextStreak);
      setScore(s => s + 100 * nextStreak);
      onMove('correct', { question: currentRiddle.question, streak: nextStreak });
    } else {
      soundSynth.playGameOver();
      setStreak(0);
      onMove('wrong', { question: currentRiddle.question });
    }
  };

  const nextQuestion = () => {
    setSelectedOption(null);
    setShowResult(false);
    setCurrentIndex(i => i + 1);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', userSelect: 'none', width: 460 }}>
      {/* 顶部统计条 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: 12, padding: '8px 16px', background: '#1c2230', borderRadius: 8, fontSize: 13, color: '#bbb' }}>
        <div>类型: <b style={{ color: '#38bdf8' }}>{currentRiddle.category}</b></div>
        <div>连续答对: <b style={{ color: streak > 1 ? '#ff5722' : '#10b981' }}>{streak > 1 ? `🔥 x${streak}` : streak}</b></div>
        <div>积分: <b style={{ color: '#ffd700' }}>{score}</b></div>
      </div>

      {/* 谜题卡片主体 */}
      <div
        style={{
          width: '100%',
          background: '#0f172a',
          border: '1px solid #334155',
          borderRadius: 12,
          padding: '24px 20px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
          marginBottom: 16,
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 13, color: '#64748b', marginBottom: 8 }}>
          QUESTION #{currentIndex + 1}
        </div>
        <div style={{ fontSize: 20, fontWeight: 'bold', color: '#f8fafc', lineHeight: 1.5, minHeight: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {currentRiddle.question}
        </div>
      </div>

      {/* 4 个可选项按钮 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
        {currentRiddle.options.map((opt, i) => {
          const isSelected = selectedOption === opt;
          const isCorrect = opt === currentRiddle.answer;

          let btnBg = '#1e293b';
          let btnBorder = '#334155';
          let textColor = '#fff';

          if (showResult) {
            if (isCorrect) {
              btnBg = '#065f46';
              btnBorder = '#10b981';
            } else if (isSelected) {
              btnBg = '#881337';
              btnBorder = '#f43f5e';
            }
          }

          return (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              disabled={showResult}
              style={{
                width: '100%',
                padding: '12px 18px',
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 600,
                textAlign: 'left',
                border: `2px solid ${btnBorder}`,
                background: btnBg,
                color: textColor,
                cursor: showResult ? 'default' : 'pointer',
                transition: 'all 0.15s',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <span style={{ width: 26, height: 26, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>
                {['A', 'B', 'C', 'D'][i]}
              </span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>

      {/* 结果与解析展开 */}
      {showResult && (
        <div style={{ marginTop: 14, width: '100%', padding: '14px 18px', background: selectedOption === currentRiddle.answer ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)', border: `1px solid ${selectedOption === currentRiddle.answer ? '#10b981' : '#ef4444'}`, borderRadius: 8 }}>
          <div style={{ fontWeight: 'bold', fontSize: 16, color: selectedOption === currentRiddle.answer ? '#10b981' : '#ef4444', marginBottom: 4 }}>
            {selectedOption === currentRiddle.answer ? '🎉 恭喜回答正确!' : '❌ 回答错误!'}
          </div>
          <div style={{ fontSize: 13, color: '#ccc', lineHeight: 1.5, marginBottom: 12 }}>
            💡 解析：{currentRiddle.explanation}
          </div>
          <button
            onClick={nextQuestion}
            style={{
              padding: '8px 22px',
              borderRadius: 6,
              border: 'none',
              background: '#4f8cff',
              color: '#fff',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            下一题 ➔
          </button>
        </div>
      )}
    </div>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';

interface EyeProps {
  mouseX: number;
  mouseY: number;
  eyeCenterX: number;
  eyeCenterY: number;
  size?: number;
}

function Eye({ mouseX, mouseY, eyeCenterX, eyeCenterY, size = 28 }: EyeProps) {
  const maxMove = size * 0.28;
  const dx = mouseX - eyeCenterX;
  const dy = mouseY - eyeCenterY;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const move = Math.min(dist, maxMove * 4) / (maxMove * 4) * maxMove;
  const px = (dx / dist) * move;
  const py = (dy / dist) * move;

  const pupilSize = size * 0.38;
  const glintSize = pupilSize * 0.28;

  return (
    <div className="relative rounded-full bg-white shadow-inner flex items-center justify-center"
      style={{ width: size, height: size, boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.15)' }}>
      {/* 瞳孔 */}
      <div className="absolute rounded-full bg-gray-900 flex items-center justify-center transition-none"
        style={{
          width: pupilSize, height: pupilSize,
          transform: `translate(${px}px, ${py}px)`,
        }}>
        {/* 高光 */}
        <div className="absolute rounded-full bg-white"
          style={{ width: glintSize, height: glintSize, top: '15%', left: '20%' }} />
      </div>
    </div>
  );
}

export default function EyePet() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);
  const [mood, setMood] = useState<'happy' | 'curious' | 'sleepy'>('happy');
  const containerRef = useRef<HTMLDivElement>(null);
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);
  const [leftCenter, setLeftCenter] = useState({ x: 0, y: 0 });
  const [rightCenter, setRightCenter] = useState({ x: 0, y: 0 });
  const [bounce, setBounce] = useState(false);

  // 鼠标追踪
  useEffect(() => {
    const onMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // 更新眼睛中心坐标
  useEffect(() => {
    const update = () => {
      if (leftEyeRef.current) {
        const r = leftEyeRef.current.getBoundingClientRect();
        setLeftCenter({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
      }
      if (rightEyeRef.current) {
        const r = rightEyeRef.current.getBoundingClientRect();
        setRightCenter({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
      }
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update);
    };
  }, []);

  // 随机眨眼
  useEffect(() => {
    const blinkLoop = () => {
      const delay = 2000 + Math.random() * 3000;
      setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 150);
        blinkLoop();
      }, delay);
    };
    blinkLoop();
  }, []);

  // 随机心情切换
  useEffect(() => {
    const moods: Array<'happy' | 'curious' | 'sleepy'> = ['happy', 'curious', 'sleepy'];
    const loop = () => {
      const delay = 5000 + Math.random() * 8000;
      setTimeout(() => {
        setMood(moods[Math.floor(Math.random() * moods.length)]);
        loop();
      }, delay);
    };
    loop();
  }, []);

  // 随机弹跳
  useEffect(() => {
    const loop = () => {
      const delay = 3000 + Math.random() * 4000;
      setTimeout(() => {
        setBounce(true);
        setTimeout(() => setBounce(false), 600);
        loop();
      }, delay);
    };
    loop();
  }, []);

  const mouthPath = {
    happy: 'M 36 58 Q 50 70 64 58',
    curious: 'M 38 62 Q 50 62 62 62',
    sleepy: 'M 38 64 Q 50 56 62 64',
  };

  const bodyColor = {
    happy: ['#818cf8', '#6366f1'],
    curious: ['#67e8f9', '#22d3ee'],
    sleepy: ['#a78bfa', '#8b5cf6'],
  };

  const [c1, c2] = bodyColor[mood];

  return (
    <div ref={containerRef}
      className="select-none"
      style={{
        animation: bounce ? 'petBounce 0.6s ease' : undefined,
        filter: 'drop-shadow(0 8px 24px rgba(99,102,241,0.35))',
      }}>
      <style>{`
        @keyframes petBounce {
          0%   { transform: translateY(0); }
          30%  { transform: translateY(-18px); }
          60%  { transform: translateY(-6px); }
          80%  { transform: translateY(-12px); }
          100% { transform: translateY(0); }
        }
        @keyframes petFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
      `}</style>

      <svg width="120" height="140" viewBox="0 0 100 120"
        style={{ animation: bounce ? undefined : 'petFloat 3s ease-in-out infinite' }}>
        <defs>
          <radialGradient id="bodyGrad" cx="40%" cy="35%">
            <stop offset="0%" stopColor={c1} />
            <stop offset="100%" stopColor={c2} />
          </radialGradient>
          <radialGradient id="shadowGrad" cx="50%" cy="50%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.15)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
        </defs>

        {/* 阴影 */}
        <ellipse cx="50" cy="115" rx="22" ry="5" fill="url(#shadowGrad)" />

        {/* 身体 */}
        <circle cx="50" cy="58" r="38" fill="url(#bodyGrad)" />

        {/* 高光 */}
        <ellipse cx="36" cy="34" rx="10" ry="7" fill="rgba(255,255,255,0.25)" transform="rotate(-20,36,34)" />

        {/* 耳朵/触角 */}
        <circle cx="24" cy="24" r="7" fill={c2} />
        <circle cx="76" cy="24" r="7" fill={c2} />
        <circle cx="24" cy="24" r="4" fill={c1} />
        <circle cx="76" cy="24" r="4" fill={c1} />

        {/* 腮红 */}
        <ellipse cx="22" cy="65" rx="8" ry="5" fill="rgba(255,150,150,0.35)" />
        <ellipse cx="78" cy="65" rx="8" ry="5" fill="rgba(255,150,150,0.35)" />
      </svg>

      {/* 眼睛（用 HTML 覆盖在 SVG 上，方便追踪） */}
      <div className="absolute" style={{ top: 0, left: 0, width: 120, height: 140, pointerEvents: 'none' }}>
        {/* 左眼 */}
        <div ref={leftEyeRef} className="absolute"
          style={{ left: 26, top: 44, width: 28, height: 28 }}>
          <div className="w-full h-full overflow-hidden rounded-full"
            style={{ transform: blink ? 'scaleY(0.08)' : 'scaleY(1)', transition: 'transform 0.08s' }}>
            <Eye mouseX={mouse.x} mouseY={mouse.y}
              eyeCenterX={leftCenter.x} eyeCenterY={leftCenter.y} size={28} />
          </div>
        </div>

        {/* 右眼 */}
        <div ref={rightEyeRef} className="absolute"
          style={{ left: 66, top: 44, width: 28, height: 28 }}>
          <div className="w-full h-full overflow-hidden rounded-full"
            style={{ transform: blink ? 'scaleY(0.08)' : 'scaleY(1)', transition: 'transform 0.08s' }}>
            <Eye mouseX={mouse.x} mouseY={mouse.y}
              eyeCenterX={rightCenter.x} eyeCenterY={rightCenter.y} size={28} />
          </div>
        </div>

        {/* 嘴巴 */}
        <svg className="absolute" style={{ left: 0, top: 0, width: 120, height: 140 }} viewBox="0 0 100 120">
          <path d={mouthPath[mood]} stroke="rgba(255,255,255,0.9)" strokeWidth="2.5"
            fill="none" strokeLinecap="round"
            style={{ transition: 'd 0.4s ease' }} />
        </svg>
      </div>
    </div>
  );
}

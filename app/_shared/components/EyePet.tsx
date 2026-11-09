'use client';

import React, { useEffect, useRef, useState } from 'react';

export interface EyePetProps {
  /** 当前聚焦的表单字段：账号/邮箱、密码、或无 */
  focusField?: 'none' | 'account' | 'password' | 'confirm';
  /** 是否开启了明文显示密码（开启时猫咪悄悄挪开一只爪子偷看） */
  showPassword?: boolean;
  /** 是否处于报错状态 */
  hasError?: boolean;
  /** 是否处于成功/欢呼状态 */
  isSuccess?: boolean;
  /** 当前账号输入长度（用于让视线随打字进度轻微横向移动） */
  inputLength?: number;
  /** 自定义气泡文案 */
  customBubble?: string;
  /** 紧凑模式（用于手机端挂件） */
  compact?: boolean;
}

export default function EyePet({
  focusField = 'none',
  showPassword = false,
  hasError = false,
  isSuccess = false,
  inputLength = 0,
  customBubble,
  compact = false,
}: EyePetProps) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);
  const [bounce, setBounce] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [center, setCenter] = useState({ x: 0, y: 0 });

  const isCoveringEyes = focusField === 'password' || focusField === 'confirm';
  const isPeeking = isCoveringEyes && showPassword;

  // 鼠标追踪
  useEffect(() => {
    const onMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // 更新组件中心坐标
  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const r = containerRef.current.getBoundingClientRect();
        setCenter({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
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

  // 随机自然眨眼
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let innerTimer: ReturnType<typeof setTimeout>;
    const blinkLoop = () => {
      const delay = 2400 + Math.random() * 2800;
      timer = setTimeout(() => {
        setBlink(true);
        innerTimer = setTimeout(() => setBlink(false), 140);
        blinkLoop();
      }, delay);
    };
    blinkLoop();
    return () => {
      clearTimeout(timer);
      clearTimeout(innerTimer);
    };
  }, []);

  // 计算眼珠偏移量
  let pupilX = 0;
  let pupilY = 0;
  if (focusField === 'account') {
    // 打字时视线看向右侧表单并随字数轻微移动
    const progress = Math.min(inputLength, 20) / 20;
    pupilX = 3 + progress * 4;
    pupilY = 2;
  } else if (center.x || center.y) {
    const dx = mouse.x - center.x;
    const dy = mouse.y - center.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    const maxMove = 5.5;
    const move = (Math.min(dist, 240) / 240) * maxMove;
    pupilX = (dx / dist) * move;
    pupilY = (dy / dist) * move;
  }

  // 头部随视线轻微歪头/转动
  const headTilt = isCoveringEyes
    ? isPeeking
      ? -4
      : 0
    : hasError
    ? -8
    : Math.max(-6, Math.min(6, pupilX * 0.8));

  // 状态气泡文案
  const bubbleText =
    customBubble ||
    (hasError
      ? '哎呀，填写的信息好像有点小问题喵~'
      : isSuccess
      ? '太棒啦！欢迎来到 PartJava 喵 ✨'
      : isPeeking
      ? '偷偷露只眼帮你检查密码有没有输错 🫣'
      : isCoveringEyes
      ? '非礼勿视！禾桔绝不偷看你的密码喵 🙈'
      : focusField === 'account'
      ? '正在认真核对你的账号信息喵~ ✍️'
      : '嗨！我是伴学灵宠禾桔，鼠标动动看我眼神喵~');

  const scale = compact ? 0.58 : 1;

  return (
    <div
      ref={containerRef}
      onClick={() => {
        setBounce(true);
        setTimeout(() => setBounce(false), 600);
      }}
      className="relative inline-flex flex-col items-center select-none cursor-pointer group"
      style={{
        transform: `scale(${scale})`,
        transformOrigin: compact ? 'top right' : 'center center',
      }}
      title="点击摸摸禾桔喵~"
    >
      {/* 顶部互动对话气泡（非紧凑模式下展示） */}
      {!compact && (
        <div
          className={`mb-2 px-3.5 py-1.5 rounded-2xl text-xs font-medium shadow-sm border transition-all duration-300 flex items-center gap-1.5 ${
            hasError
              ? 'bg-rose-50 border-rose-200 text-rose-700'
              : isCoveringEyes
              ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
              : 'bg-white/95 border-slate-200/90 text-slate-700'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
          <span>{bubbleText}</span>
        </div>
      )}

      {/* 黑猫禾桔 SVG 主体 */}
      <div
        className="relative transition-transform duration-300"
        style={{
          transform: bounce ? 'translateY(-12px) scale(1.04)' : 'translateY(0)',
          filter: 'drop-shadow(0 12px 24px rgba(15, 23, 42, 0.16))',
        }}
      >
        <svg
          width="150"
          height="136"
          viewBox="0 0 150 136"
          className="overflow-visible"
        >
          <defs>
            {/* 丝绒黑猫主材质渐变 */}
            <radialGradient id="catFurGrad" cx="45%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#262936" />
              <stop offset="55%" stopColor="#12141d" />
              <stop offset="100%" stopColor="#090a10" />
            </radialGradient>
            {/* 耳廓粉嫩内耳渐变 */}
            <linearGradient id="earPinkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f472b6" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.35" />
            </linearGradient>
            {/* 底部光环渐变 */}
            <radialGradient id="floorRingGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(99, 102, 241, 0.28)" />
              <stop offset="70%" stopColor="rgba(56, 189, 248, 0.12)" />
              <stop offset="100%" stopColor="rgba(99, 102, 241, 0)" />
            </radialGradient>
          </defs>

          {/* 底部科技星环投影 */}
          <ellipse cx="75" cy="126" rx="46" ry="8" fill="url(#floorRingGrad)" />
          <ellipse
            cx="75"
            cy="126"
            rx="34"
            ry="4.5"
            fill="none"
            stroke="rgba(99, 102, 241, 0.35)"
            strokeWidth="1.2"
            strokeDasharray="4 3"
          />

          {/* 灵动摇摆的猫尾巴 */}
          <path
            d="M 105 110 Q 134 102 132 78 Q 130 66 122 70"
            fill="none"
            stroke="#12141d"
            strokeWidth="10"
            strokeLinecap="round"
            style={{
              transformOrigin: '105px 110px',
              animation: 'catTailWag 3.2s ease-in-out infinite',
            }}
          />

          {/* 圆润身体 */}
          <path
            d="M 46 88 C 42 110, 48 124, 75 124 C 102 124, 108 110, 104 88 Z"
            fill="url(#catFurGrad)"
          />

          {/* 头部整体组（支持歪头与呼吸微动） */}
          <g
            style={{
              transform: `rotate(${headTilt}deg) translate(${pupilX * 0.35}px, ${pupilY * 0.25}px)`,
              transformOrigin: '75px 68px',
              transition: 'transform 0.22s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            {/* 左耳 */}
            <path
              d="M 32 54 L 22 14 Q 22 8 28 11 L 58 34 Z"
              fill="url(#catFurGrad)"
              stroke="#2e3346"
              strokeWidth="1"
            />
            <path
              d="M 34 48 L 27 20 L 51 36 Z"
              fill="url(#earPinkGrad)"
            />

            {/* 右耳 */}
            <path
              d="M 118 54 L 128 14 Q 128 8 122 11 L 92 34 Z"
              fill="url(#catFurGrad)"
              stroke="#2e3346"
              strokeWidth="1"
            />
            <path
              d="M 116 48 L 123 20 L 99 36 Z"
              fill="url(#earPinkGrad)"
            />

            {/* 圆润黑猫脸庞 */}
            <ellipse
              cx="75"
              cy="64"
              rx="46"
              ry="38"
              fill="url(#catFurGrad)"
              stroke="#2a2f42"
              strokeWidth="1.2"
            />

            {/* 头顶丝绒逆光高光弧 */}
            <path
              d="M 48 34 Q 75 26 102 34"
              fill="none"
              stroke="rgba(255, 255, 255, 0.16)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* 左右胡须 */}
            <g stroke="rgba(255,255,255,0.45)" strokeWidth="1.3" strokeLinecap="round">
              <line x1="28" y1="66" x2="12" y2="63" />
              <line x1="27" y1="72" x2="10" y2="73" />
              <line x1="122" y1="66" x2="138" y2="63" />
              <line x1="123" y1="72" x2="140" y2="73" />
            </g>

            {/* 粉嫩羞涩腮红 */}
            <ellipse
              cx="42"
              cy="73"
              rx="7"
              ry="4"
              fill={isCoveringEyes || isSuccess ? 'rgba(244, 114, 182, 0.55)' : 'rgba(244, 114, 182, 0.28)'}
            />
            <ellipse
              cx="108"
              cy="73"
              rx="7"
              ry="4"
              fill={isCoveringEyes || isSuccess ? 'rgba(244, 114, 182, 0.55)' : 'rgba(244, 114, 182, 0.28)'}
            />

            {/* 眼睛区域 */}
            {isSuccess || bounce ? (
              /* 开心弯弯笑眼 ^ ^ */
              <g stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" fill="none">
                <path d="M 46 60 Q 54 50 62 60" />
                <path d="M 88 60 Q 96 50 104 60" />
              </g>
            ) : (
              /* 灵动跟随鼠标的发光双眸 */
              <g>
                {/* 左眼 */}
                <g
                  style={{
                    transform: `translate(${pupilX}px, ${pupilY}px) scaleY(${blink ? 0.08 : 1})`,
                    transformOrigin: '54px 58px',
                    transition: blink ? 'transform 0.06s' : 'transform 0.04s linear',
                  }}
                >
                  <rect
                    x="49"
                    y="47"
                    width="10"
                    height="22"
                    rx="5"
                    fill="#ffffff"
                    style={{ filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.7))' }}
                  />
                  <circle cx="52" cy="52" r="2" fill="#e0e7ff" />
                </g>

                {/* 右眼 */}
                <g
                  style={{
                    transform: `translate(${pupilX}px, ${pupilY}px) scaleY(${
                      blink || isPeeking ? (isPeeking ? 0.65 : 0.08) : 1
                    })`,
                    transformOrigin: '96px 58px',
                    transition: blink ? 'transform 0.06s' : 'transform 0.04s linear',
                  }}
                >
                  <rect
                    x="91"
                    y="47"
                    width="10"
                    height="22"
                    rx="5"
                    fill="#ffffff"
                    style={{ filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.7))' }}
                  />
                  <circle cx="94" cy="52" r="2" fill="#e0e7ff" />
                </g>
              </g>
            )}

            {/* 经典像素品字形小嘴 / 惊讶嘴型 */}
            {hasError ? (
              <ellipse cx="75" cy="76" rx="4" ry="4.5" fill="none" stroke="#ffffff" strokeWidth="2.2" />
            ) : (
              <g fill="#ffffff">
                {/* 鼻尖小亮点 */}
                <rect x="73" y="68" width="4" height="3.5" rx="1" fill="#f472b6" />
                {/* ω 猫嘴 */}
                <path
                  d="M 67 74 Q 71 79 75 74 Q 79 79 83 74"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            )}
          </g>

          {/* 左右小猫爪（平时乖巧搭在胸前，输入密码时高高举起捂住眼睛！） */}
          {/* 左爪 */}
          <g
            style={{
              transform: isCoveringEyes
                ? 'translate(8px, -48px) rotate(24deg)'
                : 'translate(0px, 0px) rotate(0deg)',
              transformOrigin: '50px 112px',
              transition: 'transform 0.32s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <ellipse
              cx="50"
              cy="112"
              rx="13"
              ry="16"
              fill="#191c28"
              stroke="#333952"
              strokeWidth="1.5"
            />
            {/* 粉嫩肉垫 */}
            <circle cx="50" cy="113" r="4.2" fill="#f472b6" opacity="0.85" />
            <circle cx="44" cy="106" r="2.2" fill="#f472b6" opacity="0.85" />
            <circle cx="50" cy="104" r="2.2" fill="#f472b6" opacity="0.85" />
            <circle cx="56" cy="106" r="2.2" fill="#f472b6" opacity="0.85" />
          </g>

          {/* 右爪（当点击显示密码 isPeeking 时，右爪悄悄往右下挪开露出右眼！） */}
          <g
            style={{
              transform: isCoveringEyes
                ? isPeeking
                  ? 'translate(4px, -24px) rotate(8deg)'
                  : 'translate(-8px, -48px) rotate(-24deg)'
                : 'translate(0px, 0px) rotate(0deg)',
              transformOrigin: '100px 112px',
              transition: 'transform 0.32s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <ellipse
              cx="100"
              cy="112"
              rx="13"
              ry="16"
              fill="#191c28"
              stroke="#333952"
              strokeWidth="1.5"
            />
            {/* 粉嫩肉垫 */}
            <circle cx="100" cy="113" r="4.2" fill="#f472b6" opacity="0.85" />
            <circle cx="94" cy="106" r="2.2" fill="#f472b6" opacity="0.85" />
            <circle cx="100" cy="104" r="2.2" fill="#f472b6" opacity="0.85" />
            <circle cx="106" cy="106" r="2.2" fill="#f472b6" opacity="0.85" />
          </g>
        </svg>
      </div>

      <style>{`
        @keyframes catTailWag {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(10deg); }
        }
      `}</style>
    </div>
  );
}

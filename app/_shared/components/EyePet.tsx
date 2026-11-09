'use client';

import React, { useEffect, useRef, useState } from 'react';

export interface EyePetProps {
  /** 当前聚焦的表单字段：账号/邮箱、密码、或无 */
  focusField?: 'none' | 'account' | 'password' | 'confirm';
  /** 是否开启了明文显示密码（开启时猫咪悄悄挪开一只白手套偷看） */
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

/**
 * 禾桔 (TsuYi) 高还原度二头身奶牛猫互动组件
 * 复刻参考图：梨形包子脸、八字白面具、金琥珀琉璃大眼（内层虹膜+大瞳孔随鼠标平滑转动）、
 * 粉嫩耳窝、花生豆立体 ω 吻部、粉鼻头、胸前 V 形白围兜与山竹白手套（输密码捂眼/明文偷看）
 */
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

  // 鼠标全局追踪
  useEffect(() => {
    const onMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // 更新组件屏幕中心坐标
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
      const delay = 2500 + Math.random() * 2800;
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

  // 计算琥珀虹膜与大瞳孔在眼眶内的平滑位移
  let irisX = 0;
  let irisY = 0;
  if (focusField === 'account') {
    const progress = Math.min(inputLength, 22) / 22;
    irisX = 2.5 + progress * 3.8;
    irisY = 1.8;
  } else if (center.x || center.y) {
    const dx = mouse.x - center.x;
    const dy = mouse.y - center.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    const maxMove = 5.2;
    const move = (Math.min(dist, 240) / 240) * maxMove;
    irisX = (dx / dist) * move;
    irisY = (dy / dist) * move;
  }

  // 圆脑袋随视线轻微歪头
  const headTilt = isCoveringEyes
    ? isPeeking
      ? -3.5
      : 0
    : hasError
    ? -6.5
    : Math.max(-5, Math.min(5, irisX * 0.72));

  // 互动气泡文案
  const bubbleText =
    customBubble ||
    (hasError
      ? '哎呀，填写的信息好像有点小问题喵~'
      : isSuccess
      ? '太棒啦！禾桔欢迎你来到 PartJava 喵 ✨'
      : isPeeking
      ? '偷偷露只眼帮你检查密码有没有输错 🫣'
      : isCoveringEyes
      ? '非礼勿视！禾桔绝不偷看你的密码喵 🙈'
      : focusField === 'account'
      ? '正在认真核对你的账号信息喵~ ✍️'
      : '嗨！我是禾桔 TsuYi，动动鼠标看我大眼睛喵~');

  const scale = compact ? 0.54 : 1;

  return (
    <div
      ref={containerRef}
      onClick={() => {
        setBounce(true);
        setTimeout(() => setBounce(false), 620);
      }}
      className="relative inline-flex flex-col items-center select-none cursor-pointer group"
      style={{
        transform: `scale(${scale})`,
        transformOrigin: compact ? 'top right' : 'center center',
      }}
      title="点击摸摸禾桔的圆脑袋喵~"
    >
      {/* 顶部互动对话气泡 */}
      {!compact && (
        <div
          className={`mb-1.5 px-3.5 py-1 rounded-2xl text-xs font-medium shadow-sm border transition-all duration-300 flex items-center gap-1.5 ${
            hasError
              ? 'bg-rose-50 border-rose-200 text-rose-700'
              : isCoveringEyes
              ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
              : 'bg-white/95 border-slate-200/90 text-slate-700'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          <span>{bubbleText}</span>
        </div>
      )}

      {/* 二头身奶牛猫「禾桔」高清矢量毛绒画布 */}
      <div
        className="relative transition-transform duration-300"
        style={{
          transform: bounce ? 'translateY(-11px) scale(1.03)' : 'translateY(0)',
          filter: 'drop-shadow(0 12px 22px rgba(15, 23, 42, 0.16))',
        }}
      >
        <svg
          width="176"
          height="182"
          viewBox="0 0 200 208"
          className="overflow-visible"
        >
          <defs>
            {/* 边缘蓬松毛刺 SVG 滤镜（让猫耳、胖脸颊与白围兜呈现参考图的真实细密绒毛边缘，而内部100%实心无噪点！） */}
            <filter id="hejuFluffyEdge" x="-12%" y="-12%" width="124%" height="124%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.75"
                numOctaves="3"
                seed="7"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="3.2"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>

            <filter id="hejuSoftFur" x="-8%" y="-8%" width="116%" height="116%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.9"
                numOctaves="2"
                seed="12"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="2.1"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>

            {/* 炭黑丝绒毛发渐变 */}
            <radialGradient id="hejuBlackFur" cx="46%" cy="32%" r="64%">
              <stop offset="0%" stopColor="#2b2e38" />
              <stop offset="48%" stopColor="#181a20" />
              <stop offset="100%" stopColor="#0d0e12" />
            </radialGradient>

            {/* 奶油白蓬松腮毛与下巴渐变（内部实心柔滑，底部带温暖体积阴影） */}
            <radialGradient id="hejuCreamWhite" cx="50%" cy="38%" r="62%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="68%" stopColor="#f4f5f7" />
              <stop offset="92%" stopColor="#e2e5ec" />
              <stop offset="100%" stopColor="#cfd4df" />
            </radialGradient>

            {/* 立体花生豆吻部（ω 嘴包）渐变 */}
            <radialGradient id="hejuMuzzlePad" cx="45%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="70%" stopColor="#f3f4f6" />
              <stop offset="100%" stopColor="#d5d9e2" />
            </radialGradient>

            {/* 粉嫩内耳渐变 */}
            <linearGradient id="hejuInnerEar" x1="0%" y1="0%" x2="20%" y2="100%">
              <stop offset="0%" stopColor="#f47292" />
              <stop offset="55%" stopColor="#e05275" />
              <stop offset="100%" stopColor="#9e2f4b" />
            </linearGradient>

            {/* 桃粉爱心鼻头渐变 */}
            <radialGradient id="hejuPinkNose" cx="38%" cy="30%" r="68%">
              <stop offset="0%" stopColor="#ff9ebb" />
              <stop offset="55%" stopColor="#ec6285" />
              <stop offset="100%" stopColor="#c83e62" />
            </radialGradient>

            {/* 金琥珀色虹膜径向渐变（复刻参考图暖金琥珀色外环） */}
            <radialGradient id="hejuAmberIris" cx="50%" cy="50%" r="50%">
              <stop offset="55%" stopColor="#b86b14" />
              <stop offset="76%" stopColor="#f3a833" />
              <stop offset="92%" stopColor="#fbd065" />
              <stop offset="100%" stopColor="#783f08" />
            </radialGradient>

            {/* 深浓咖啡黑大瞳孔渐变 */}
            <radialGradient id="hejuDarkPupil" cx="50%" cy="42%" r="55%">
              <stop offset="0%" stopColor="#140b07" />
              <stop offset="78%" stopColor="#1f110b" />
              <stop offset="100%" stopColor="#3b2114" />
            </radialGradient>

            {/* 左眼眶裁剪蒙版（确保眼珠在眼眶内部平滑转动不溢出） */}
            <clipPath id="hejuLeftEyeClip">
              <ellipse cx="67" cy="84" rx="17.5" ry="16" transform="rotate(-4 67 84)" />
            </clipPath>
            {/* 右眼眶裁剪蒙版 */}
            <clipPath id="hejuRightEyeClip">
              <ellipse cx="133" cy="84" rx="17.5" ry="16" transform="rotate(4 133 84)" />
            </clipPath>
          </defs>

          {/* 地面柔和投影 */}
          <ellipse cx="100" cy="195" rx="54" ry="8" fill="rgba(15, 23, 42, 0.12)" />

          {/* ================= 1. 身体与尾巴层（敦实二头身坐姿） ================= */}
          <g>
            {/* 右后侧毛茸茸小短尾 */}
            <path
              d="M 134 176 Q 162 172 158 158 Q 154 148 136 160 Z"
              fill="#14161d"
              filter="url(#hejuFluffyEdge)"
              style={{
                transformOrigin: '134px 172px',
                animation: 'hejuTailWag 3.2s ease-in-out infinite',
              }}
            />

            {/* 敦实小身体（炭黑外披肩） */}
            <path
              d="M 62 126 C 54 148, 54 176, 58 190 L 142 190 C 146 176, 146 148, 138 126 Z"
              fill="url(#hejuBlackFur)"
              filter="url(#hejuFluffyEdge)"
            />

            {/* 胸前标志性心形/V形大白围兜（内部实心奶油白，边缘毛茸茸） */}
            <path
              d="M 70 128 Q 100 134 130 128 C 128 148, 115 168, 100 177 C 85 168, 72 148, 70 128 Z"
              fill="url(#hejuCreamWhite)"
              filter="url(#hejuSoftFur)"
            />

            {/* 后脚两侧微露的白爪尖 */}
            <ellipse cx="62" cy="188" rx="9" ry="6" fill="url(#hejuCreamWhite)" filter="url(#hejuSoftFur)" />
            <ellipse cx="138" cy="188" rx="9" ry="6" fill="url(#hejuCreamWhite)" filter="url(#hejuSoftFur)" />

            {/* 前腿黑色袖管（当不捂眼时自然垂立在胸前） */}
            {!isCoveringEyes && (
              <g>
                <path
                  d="M 65 148 L 63 184 L 94 184 L 93 156 Z"
                  fill="url(#hejuBlackFur)"
                  filter="url(#hejuSoftFur)"
                />
                <path
                  d="M 107 156 L 106 184 L 137 184 L 135 148 Z"
                  fill="url(#hejuBlackFur)"
                  filter="url(#hejuSoftFur)"
                />
              </g>
            )}
          </g>

          {/* ================= 2. 二头身大包子头层（随鼠标灵动歪头） ================= */}
          <g
            style={{
              transform: `rotate(${headTilt}deg) translate(${irisX * 0.28}px, ${irisY * 0.2}px)`,
              transformOrigin: '100px 92px',
              transition: 'transform 0.22s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            {/* 左猫耳（外圈蓬松黑毛 + 内部粉嫩耳窝 + 耳道口细毛） */}
            <g>
              <path
                d="M 38 68 C 28 42, 30 18, 40 14 C 50 10, 72 24, 84 40 Z"
                fill="url(#hejuBlackFur)"
                filter="url(#hejuFluffyEdge)"
              />
              <path
                d="M 45 58 C 39 40, 41 25, 47 23 C 53 21, 67 31, 74 42 Z"
                fill="url(#hejuInnerEar)"
              />
              {/* 耳廓内侧深色耳毛簇 */}
              <path
                d="M 43 56 L 52 48 M 45 60 L 56 52 M 68 38 L 60 44"
                stroke="#181a22"
                strokeWidth="2.2"
                strokeLinecap="round"
                opacity="0.75"
              />
            </g>

            {/* 右猫耳 */}
            <g>
              <path
                d="M 162 68 C 172 42, 170 18, 160 14 C 150 10, 128 24, 116 40 Z"
                fill="url(#hejuBlackFur)"
                filter="url(#hejuFluffyEdge)"
              />
              <path
                d="M 155 58 C 161 40, 159 25, 153 23 C 147 21, 133 31, 126 42 Z"
                fill="url(#hejuInnerEar)"
              />
              <path
                d="M 157 56 L 148 48 M 155 60 L 144 52 M 132 38 L 140 44"
                stroke="#181a22"
                strokeWidth="2.2"
                strokeLinecap="round"
                opacity="0.75"
              />
            </g>

            {/* 梨形大包子头黑色基底（上窄下宽，双颊饱满圆润） */}
            <path
              d="M 100 30
                 C 134 30, 156 48, 164 76
                 C 173 106, 156 134, 100 135
                 C 44 134, 27 106, 36 76
                 C 44 48, 66 30, 100 30 Z"
              fill="url(#hejuBlackFur)"
              filter="url(#hejuFluffyEdge)"
            />

            {/* 标志性「八字白面具 + 胖嘟嘟白脸颊与圆下巴」（内部实心纯白，边缘细密绒毛过渡） */}
            <path
              d="M 100 54
                 C 104 64, 108 78, 115 88
                 C 126 98, 146 102, 158 108
                 C 148 126, 128 136, 100 136
                 C 72 136, 52 126, 42 108
                 C 54 102, 74 98, 85 88
                 C 92 78, 96 64, 100 54 Z"
              fill="url(#hejuCreamWhite)"
              filter="url(#hejuSoftFur)"
            />

            {/* 眉心八字白尖顶部的柔和灰白过渡绒毛 */}
            <path
              d="M 100 47 C 103 55, 106 66, 109 74 L 91 74 C 94 66, 97 55, 100 47 Z"
              fill="url(#hejuCreamWhite)"
              opacity="0.78"
              filter="url(#hejuFluffyEdge)"
            />

            {/* 下巴底部的柔和体积阴影弧线（塑造圆滚滚的胖下巴立体感） */}
            <path
              d="M 60 122 Q 100 136 140 122"
              fill="none"
              stroke="rgba(180, 188, 204, 0.45)"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* ================= 3. 分层可动金琥珀琉璃大眼 ================= */}
            {isSuccess || bounce ? (
              /* 开心弯弯月牙笑眼 ^ ^ */
              <g>
                <path
                  d="M 50 86 Q 67 68 84 86"
                  fill="none"
                  stroke="#f5b041"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <path
                  d="M 50 84 Q 67 66 84 84"
                  fill="none"
                  stroke="#140b07"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <path
                  d="M 116 86 Q 133 68 150 86"
                  fill="none"
                  stroke="#f5b041"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <path
                  d="M 116 84 Q 133 66 150 84"
                  fill="none"
                  stroke="#140b07"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </g>
            ) : (
              <g>
                {/* ---------- 左眼 ---------- */}
                <g
                  style={{
                    transform: `scaleY(${blink ? 0.06 : 1})`,
                    transformOrigin: '67px 84px',
                    transition: 'transform 0.08s ease',
                  }}
                >
                  {/* 眼眶深色外包边（浓密黑眼线） */}
                  <ellipse
                    cx="67"
                    cy="84"
                    rx="19"
                    ry="17.5"
                    transform="rotate(-4 67 84)"
                    fill="#0b0c10"
                  />

                  {/* 眼眶内部裁剪区：金琥珀虹膜 + 超大深褐瞳孔 + 双高光（随鼠标平滑转动！） */}
                  <g clipPath="url(#hejuLeftEyeClip)">
                    {/* 暖金底衬 */}
                    <rect x="45" y="64" width="44" height="40" fill="#d98a26" />

                    {/* 随鼠标移动的虹膜与大瞳孔组 */}
                    <g
                      style={{
                        transform: `translate(${irisX}px, ${irisY}px)`,
                        transition: 'transform 0.05s linear',
                      }}
                    >
                      {/* 金琥珀色虹膜外环 */}
                      <circle cx="67" cy="84" r="17" fill="url(#hejuAmberIris)" />
                      {/* 超大深咖啡黑瞳孔（占 75%，无辜专注感的核心） */}
                      <circle cx="67" cy="84" r="12.6" fill="url(#hejuDarkPupil)" />
                      {/* 瞳孔底部暖棕微光反射弧 */}
                      <path
                        d="M 59 91 Q 67 96 75 91"
                        fill="none"
                        stroke="rgba(217, 138, 38, 0.38)"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                      {/* 左上柔光窗大高光（复刻参考图弧形大高光） */}
                      <ellipse
                        cx="61"
                        cy="77.5"
                        rx="5.2"
                        ry="3.4"
                        transform="rotate(-28 61 77.5)"
                        fill="rgba(255, 255, 255, 0.94)"
                      />
                      {/* 右上晶莹小圆点高光 */}
                      <circle cx="73.5" cy="78.5" r="2.1" fill="rgba(255, 255, 255, 0.92)" />
                    </g>

                    {/* 上眼睑自然阴影压边（增加深邃立体感） */}
                    <path
                      d="M 46 72 Q 67 66 88 74 L 88 64 L 46 64 Z"
                      fill="rgba(10, 12, 16, 0.32)"
                    />
                  </g>
                </g>

                {/* ---------- 右眼 ---------- */}
                <g
                  style={{
                    transform: `scaleY(${
                      blink ? 0.06 : isPeeking ? 0.72 : 1
                    })`,
                    transformOrigin: '133px 84px',
                    transition: 'transform 0.08s ease',
                  }}
                >
                  {/* 眼眶深色外包边 */}
                  <ellipse
                    cx="133"
                    cy="84"
                    rx="19"
                    ry="17.5"
                    transform="rotate(4 133 84)"
                    fill="#0b0c10"
                  />

                  <g clipPath="url(#hejuRightEyeClip)">
                    <rect x="111" y="64" width="44" height="40" fill="#d98a26" />

                    <g
                      style={{
                        transform: `translate(${irisX}px, ${irisY}px)`,
                        transition: 'transform 0.05s linear',
                      }}
                    >
                      <circle cx="133" cy="84" r="17" fill="url(#hejuAmberIris)" />
                      <circle cx="133" cy="84" r="12.6" fill="url(#hejuDarkPupil)" />
                      <path
                        d="M 125 91 Q 133 96 141 91"
                        fill="none"
                        stroke="rgba(217, 138, 38, 0.38)"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                      {/* 左上柔光窗大高光 */}
                      <ellipse
                        cx="127"
                        cy="77.5"
                        rx="5.2"
                        ry="3.4"
                        transform="rotate(-28 127 77.5)"
                        fill="rgba(255, 255, 255, 0.94)"
                      />
                      {/* 右上晶莹小圆点高光 */}
                      <circle cx="139.5" cy="78.5" r="2.1" fill="rgba(255, 255, 255, 0.92)" />
                    </g>

                    <path
                      d="M 112 74 Q 133 66 154 72 L 154 64 L 112 64 Z"
                      fill="rgba(10, 12, 16, 0.32)"
                    />
                  </g>
                </g>
              </g>
            )}

            {/* ================= 4. 花生豆立体吻部（ω 胖嘴包）+ 粉鼻头 + 胡须 ================= */}
            <g>
              {/* ω 微笑唇线底部柔和阴影 */}
              <path
                d="M 81 105 Q 90 113 100 103 Q 110 113 119 105"
                fill="none"
                stroke="#8c92a4"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* 左花生豆饱满吻部肉垫 */}
              <ellipse
                cx="90.5"
                cy="99.5"
                rx="11.5"
                ry="8.2"
                transform="rotate(-8 90.5 99.5)"
                fill="url(#hejuMuzzlePad)"
              />
              {/* 右花生豆饱满吻部肉垫 */}
              <ellipse
                cx="109.5"
                cy="99.5"
                rx="11.5"
                ry="8.2"
                transform="rotate(8 109.5 99.5)"
                fill="url(#hejuMuzzlePad)"
              />

              {/* 清晰的 ω 微笑唇线与人中 */}
              <path
                d="M 82 103.5 Q 91 111 100 101.5 Q 109 111 118 103.5"
                fill="none"
                stroke="#525866"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line
                x1="100"
                y1="95"
                x2="100"
                y2="102"
                stroke="#525866"
                strokeWidth="1.8"
                strokeLinecap="round"
              />

              {/* 报错时微微张开的小粉嘴 */}
              {hasError && (
                <ellipse cx="100" cy="107" rx="3.8" ry="3.2" fill="#e05275" />
              )}

              {/* 桃粉立体爱心小鼻头（带高光） */}
              <path
                d="M 93.5 91.5
                   C 93.5 88.5, 106.5 88.5, 106.5 91.5
                   C 106.5 94.5, 102.5 97.5, 100 98.5
                   C 97.5 97.5, 93.5 94.5, 93.5 91.5 Z"
                fill="url(#hejuPinkNose)"
              />
              <ellipse
                cx="98.5"
                cy="91"
                rx="2.6"
                ry="1.1"
                fill="rgba(255, 255, 255, 0.65)"
              />

              {/* 两侧晶莹微弯的三根白胡须（复刻参考图脸颊胡须） */}
              <g
                fill="none"
                stroke="rgba(255, 255, 255, 0.88)"
                strokeWidth="1.25"
                strokeLinecap="round"
                style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.25))' }}
              >
                {/* 左侧三根胡须 */}
                <path d="M 78 96 Q 58 92 42 94" />
                <path d="M 79 99.5 Q 58 99 40 103" />
                <path d="M 81 103 Q 62 105 46 111" />
                {/* 右侧三根胡须 */}
                <path d="M 122 96 Q 142 92 158 94" />
                <path d="M 121 99.5 Q 142 99 160 103" />
                <path d="M 119 103 Q 138 105 154 111" />
              </g>
            </g>
          </g>

          {/* ================= 5. 山竹白手套前爪（平时乖巧并拢，输密码时举起捂住大眼睛！） ================= */}
          {/* 左白手套前爪 */}
          <g
            style={{
              transform: isCoveringEyes
                ? 'translate(-12px, -96px) rotate(22deg)'
                : 'translate(0px, 0px) rotate(0deg)',
              transformOrigin: '80px 185px',
              transition: 'transform 0.34s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {/* 捂眼时连带的黑色小手臂 */}
            {isCoveringEyes && (
              <path
                d="M 54 205 L 64 176 L 92 178 L 86 208 Z"
                fill="url(#hejuBlackFur)"
                filter="url(#hejuSoftFur)"
              />
            )}
            {/* 圆滚滚的山竹白爪 */}
            <ellipse
              cx="80"
              cy="185"
              rx="15.5"
              ry="10.5"
              fill="url(#hejuCreamWhite)"
              filter="url(#hejuSoftFur)"
            />
            {/* 山竹脚趾分界线 */}
            <path
              d="M 73 181 Q 72 188 73 193 M 80 180 Q 80 188 80 194 M 87 181 Q 88 188 87 193"
              fill="none"
              stroke="#c4cad8"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </g>

          {/* 右白手套前爪（点击显示密码 isPeeking 时，右爪悄悄往右下挪开露出右眼偷看！） */}
          <g
            style={{
              transform: isCoveringEyes
                ? isPeeking
                  ? 'translate(16px, -64px) rotate(-8deg)'
                  : 'translate(12px, -96px) rotate(-22deg)'
                : 'translate(0px, 0px) rotate(0deg)',
              transformOrigin: '120px 185px',
              transition: 'transform 0.34s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {isCoveringEyes && (
              <path
                d="M 114 208 L 108 178 L 136 176 L 146 205 Z"
                fill="url(#hejuBlackFur)"
                filter="url(#hejuSoftFur)"
              />
            )}
            <ellipse
              cx="120"
              cy="185"
              rx="15.5"
              ry="10.5"
              fill="url(#hejuCreamWhite)"
              filter="url(#hejuSoftFur)"
            />
            <path
              d="M 113 181 Q 112 188 113 193 M 120 180 Q 120 188 120 194 M 127 181 Q 128 188 127 193"
              fill="none"
              stroke="#c4cad8"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </div>

      <style>{`
        @keyframes hejuTailWag {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(11deg); }
        }
      `}</style>
    </div>
  );
}

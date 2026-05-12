'use client';

interface InkWashDecorationProps {
  variant?: 'mountains' | 'mist' | 'bamboo' | 'birds' | 'divider' | 'landscape';
  className?: string;
  height?: number;
}

export default function InkWashDecoration({
  variant = 'mountains',
  className = '',
  height = 200,
}: InkWashDecorationProps) {
  const w = 1200;
  const h = height;

  switch (variant) {
    case 'mountains':
      return (
        <div className={`w-full overflow-hidden ${className}`}>
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none" style={{ height }}>
            <defs>
              <filter id="ink-blur-m">
                <feGaussianBlur stdDeviation="3" />
              </filter>
              <filter id="ink-blur-m-2">
                <feGaussianBlur stdDeviation="6" />
              </filter>
            </defs>
            {/* 远山 - 最淡 */}
            <path d={`M0 ${h*0.75} Q${w*0.15} ${h*0.3} ${w*0.3} ${h*0.45} Q${w*0.45} ${h*0.6} ${w*0.55} ${h*0.35} Q${w*0.7} ${h*0.55} ${w*0.85} ${h*0.4} Q${w*0.95} ${h*0.5} ${w} ${h*0.65} L${w} ${h} L0 ${h} Z`}
              fill="#8b7355" opacity="0.18" filter="url(#ink-blur-m-2)" />
            {/* 中山 */}
            <path d={`M0 ${h*0.85} Q${w*0.1} ${h*0.5} ${w*0.25} ${h*0.6} Q${w*0.4} ${h*0.7} ${w*0.5} ${h*0.48} Q${w*0.65} ${h*0.65} ${w*0.8} ${h*0.5} Q${w*0.9} ${h*0.6} ${w} ${h*0.75} L${w} ${h} L0 ${h} Z`}
              fill="#7a5c3e" opacity="0.28" filter="url(#ink-blur-m)" />
            {/* 近山 */}
            <path d={`M0 ${h*0.92} Q${w*0.08} ${h*0.7} ${w*0.2} ${h*0.78} Q${w*0.35} ${h*0.85} ${w*0.45} ${h*0.65} Q${w*0.55} ${h*0.72} ${w*0.7} ${h*0.7} Q${w*0.85} ${h*0.78} ${w} ${h*0.88} L${w} ${h} L0 ${h} Z`}
              fill="#5c4033" opacity="0.42" />
            {/* 松树点缀 */}
            <g opacity="0.25">
              <line x1={w*0.15} y1={h*0.67} x2={w*0.15} y2={h*0.8} stroke="#5c4033" strokeWidth="3" strokeLinecap="round" />
              <path d={`M${w*0.13} ${h*0.55} Q${w*0.15} ${h*0.62} ${w*0.17} ${h*0.55}`} fill="none" stroke="#5c4033" strokeWidth="2" />
              <path d={`M${w*0.135} ${h*0.6} Q${w*0.15} ${h*0.66} ${w*0.165} ${h*0.6}`} fill="none" stroke="#5c4033" strokeWidth="2" />
            </g>
          </svg>
        </div>
      );

    case 'mist':
      return (
        <div className={`w-full overflow-hidden ${className}`}>
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none" style={{ height }}>
            <defs>
              <filter id="mist-blur">
                <feGaussianBlur stdDeviation="12" />
              </filter>
              <filter id="mist-blur-2">
                <feGaussianBlur stdDeviation="20" />
              </filter>
            </defs>
            {/* 雾层1 */}
            <ellipse cx={w*0.25} cy={h*0.6} rx={w*0.35} ry={h*0.25} fill="#c4a882" opacity="0.08" filter="url(#mist-blur-2)" />
            {/* 雾层2 */}
            <ellipse cx={w*0.6} cy={h*0.5} rx={w*0.3} ry={h*0.3} fill="#d4c8b8" opacity="0.06" filter="url(#mist-blur-2)" />
            {/* 雾层3 */}
            <ellipse cx={w*0.8} cy={h*0.55} rx={w*0.25} ry={h*0.2} fill="#c4a882" opacity="0.07" filter="url(#mist-blur)" />
            {/* 丝状云雾 */}
            <path d={`M${w*0.05} ${h*0.5} Q${w*0.15} ${h*0.35} ${w*0.3} ${h*0.45} Q${w*0.45} ${h*0.55} ${w*0.55} ${h*0.4} Q${w*0.7} ${h*0.5} ${w*0.85} ${h*0.42} Q${w*0.95} ${h*0.38} ${w} ${h*0.45}`}
              fill="none" stroke="#d4c8b8" strokeWidth="1.5" opacity="0.12" filter="url(#mist-blur)" />
          </svg>
        </div>
      );

    case 'bamboo':
      return (
        <div className={`w-full overflow-hidden ${className}`}>
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none" style={{ height }}>
            <defs>
              <filter id="bamboo-blur">
                <feGaussianBlur stdDeviation="1.5" />
              </filter>
            </defs>
            {/* 竹竿1 */}
            <g opacity="0.25" stroke="#5a6b3a" strokeWidth="3" fill="none">
              <line x1={w*0.1} y1={h*0.05} x2={w*0.1} y2={h*0.95} strokeLinecap="round" />
              {/* 竹节 */}
              <ellipse cx={w*0.1} cy={h*0.3} rx="6" ry="2" fill="#5a6b3a" opacity="0.4" />
              <ellipse cx={w*0.1} cy={h*0.55} rx="6" ry="2" fill="#5a6b3a" opacity="0.4" />
              <ellipse cx={w*0.1} cy={h*0.78} rx="6" ry="2" fill="#5a6b3a" opacity="0.4" />
            </g>
            {/* 竹叶 */}
            <g opacity="0.2" fill="#4a6741" filter="url(#bamboo-blur)">
              <path d={`M${w*0.1} ${h*0.2} Q${w*0.13} ${h*0.12} ${w*0.16} ${h*0.18} Q${w*0.14} ${h*0.22} ${w*0.1} ${h*0.2}`} />
              <path d={`M${w*0.1} ${h*0.2} Q${w*0.07} ${h*0.14} ${w*0.05} ${h*0.19} Q${w*0.07} ${h*0.23} ${w*0.1} ${h*0.2}`} />
              <path d={`M${w*0.1} ${h*0.45} Q${w*0.13} ${h*0.38} ${w*0.15} ${h*0.43} Q${w*0.13} ${h*0.47} ${w*0.1} ${h*0.45}`} />
            </g>
            {/* 竹竿2 */}
            <g opacity="0.18" stroke="#5a6b3a" strokeWidth="2.5" fill="none">
              <line x1={w*0.88} y1={h*0.1} x2={w*0.88} y2={h*0.9} strokeLinecap="round" />
              <ellipse cx={w*0.88} cy={h*0.35} rx="5" ry="1.5" fill="#5a6b3a" opacity="0.35" />
              <ellipse cx={w*0.88} cy={h*0.65} rx="5" ry="1.5" fill="#5a6b3a" opacity="0.35" />
            </g>
            {/* 竹叶2 */}
            <g opacity="0.15" fill="#4a6741" filter="url(#bamboo-blur)">
              <path d={`M${w*0.88} ${h*0.25} Q${w*0.91} ${h*0.18} ${w*0.93} ${h*0.23} Q${w*0.91} ${h*0.27} ${w*0.88} ${h*0.25}`} />
              <path d={`M${w*0.88} ${h*0.25} Q${w*0.85} ${h*0.2} ${w*0.83} ${h*0.24} Q${w*0.85} ${h*0.28} ${w*0.88} ${h*0.25}`} />
            </g>
          </svg>
        </div>
      );

    case 'birds':
      return (
        <div className={`w-full overflow-hidden ${className}`}>
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none" style={{ height }}>
            <g opacity="0.3" stroke="#5c4033" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              {/* 飞鸟1 */}
              <path d={`M${w*0.2} ${h*0.3} Q${w*0.22} ${h*0.22} ${w*0.24} ${h*0.3} Q${w*0.26} ${h*0.22} ${w*0.28} ${h*0.3}`} />
              {/* 飞鸟2 */}
              <path d={`M${w*0.25} ${h*0.45} Q${w*0.265} ${h*0.38} ${w*0.28} ${h*0.45} Q${w*0.295} ${h*0.38} ${w*0.31} ${h*0.45}`} />
              {/* 飞鸟3 - 远 */}
              <path d={`M${w*0.5} ${h*0.2} Q${w*0.515} ${h*0.14} ${w*0.53} ${h*0.2} Q${w*0.545} ${h*0.14} ${w*0.56} ${h*0.2}`} opacity="0.6" strokeWidth="1" />
              {/* 飞鸟4 - 远 */}
              <path d={`M${w*0.55} ${h*0.32} Q${w*0.56} ${h*0.27} ${w*0.57} ${h*0.32} Q${w*0.58} ${h*0.27} ${w*0.59} ${h*0.32}`} opacity="0.5" strokeWidth="1" />
              {/* 飞鸟5 */}
              <path d={`M${w*0.7} ${h*0.4} Q${w*0.72} ${h*0.33} ${w*0.74} ${h*0.4} Q${w*0.76} ${h*0.33} ${w*0.78} ${h*0.4}`} />
            </g>
          </svg>
        </div>
      );

    case 'divider':
      return (
        <div className={`w-full ${className}`}>
          <div className="relative flex items-center justify-center" style={{ height }}>
            <svg viewBox={`0 0 ${w} 60`} className="w-full" preserveAspectRatio="none" style={{ height: 60 }}>
              <defs>
                <filter id="div-blur">
                  <feGaussianBlur stdDeviation="2" />
                </filter>
              </defs>
              {/* 左水墨笔触 */}
              <path d={`M0 40 Q${w*0.1} 15 ${w*0.25} 25 Q${w*0.4} 35 ${w*0.45} 20`}
                fill="none" stroke="#7a5c3e" strokeWidth="2" opacity="0.22" filter="url(#div-blur)" strokeLinecap="round" />
              {/* 右水墨笔触 */}
              <path d={`M${w} 35 Q${w*0.85} 18 ${w*0.7} 28 Q${w*0.55} 38 ${w*0.5} 22`}
                fill="none" stroke="#7a5c3e" strokeWidth="1.5" opacity="0.18" filter="url(#div-blur)" strokeLinecap="round" />
              {/* 中间墨点 */}
              <circle cx={w*0.5} cy={30} r="4" fill="#8b7355" opacity="0.18" filter="url(#div-blur)" />
              {/* 点缀圆圈 */}
              <circle cx={w*0.15} cy={45} r="2" fill="#a0846c" opacity="0.12" />
              <circle cx={w*0.85} cy={42} r="2" fill="#a0846c" opacity="0.12" />
            </svg>
          </div>
        </div>
      );

    case 'landscape':
    default:
      return (
        <div className={`w-full overflow-hidden ${className}`}>
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none" style={{ height }}>
            <defs>
              <filter id="ink-blur-l">
                <feGaussianBlur stdDeviation="8" />
              </filter>
              <filter id="ink-blur-l-2">
                <feGaussianBlur stdDeviation="4" />
              </filter>
              <filter id="ink-blur-l-3">
                <feGaussianBlur stdDeviation="2" />
              </filter>
              <linearGradient id="sky-fade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f5f0e8" stopOpacity="0" />
                <stop offset="60%" stopColor="#d4c8b8" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#e8ddd0" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* 天空微染 */}
            <rect width={w} height={h} fill="url(#sky-fade)" />

            {/* 落日 */}
            <circle cx={w*0.82} cy={h*0.3} r="30" fill="#d4a888" opacity="0.12" filter="url(#ink-blur-l-3)" />
            <circle cx={w*0.82} cy={h*0.3} r="22" fill="#e8c8a8" opacity="0.2" />

            {/* 远山 - 极淡 */}
            <path d={`M0 ${h} L0 ${h*0.6} Q${w*0.12} ${h*0.25} ${w*0.22} ${h*0.4} Q${w*0.32} ${h*0.55} ${w*0.4} ${h*0.32} Q${w*0.5} ${h*0.5} ${w*0.58} ${h*0.38} Q${w*0.7} ${h*0.52} ${w*0.82} ${h*0.35} Q${w*0.9} ${h*0.45} ${w} ${h*0.5} L${w} ${h} Z`}
              fill="#8b7355" opacity="0.09" filter="url(#ink-blur-l)" />

            {/* 中山 */}
            <path d={`M0 ${h} L0 ${h*0.75} Q${w*0.08} ${h*0.45} ${w*0.18} ${h*0.58} Q${w*0.3} ${h*0.7} ${w*0.38} ${h*0.5} Q${w*0.48} ${h*0.62} ${w*0.55} ${h*0.48} Q${w*0.65} ${h*0.6} ${w*0.72} ${h*0.5} Q${w*0.8} ${h*0.58} ${w*0.9} ${h*0.48} Q${w*0.95} ${h*0.55} ${w} ${h*0.6} L${w} ${h} Z`}
              fill="#7a5c3e" opacity="0.15" filter="url(#ink-blur-l-2)" />

            {/* 近山 - 稍浓 */}
            <path d={`M0 ${h} L0 ${h*0.88} Q${w*0.06} ${h*0.65} ${w*0.15} ${h*0.75} Q${w*0.25} ${h*0.85} ${w*0.33} ${h*0.68} Q${w*0.42} ${h*0.78} ${w*0.5} ${h*0.72} Q${w*0.6} ${h*0.8} ${w*0.68} ${h*0.7} Q${w*0.78} ${h*0.78} ${w*0.88} ${h*0.7} Q${w*0.95} ${h*0.75} ${w} ${h*0.78} L${w} ${h} Z`}
              fill="#5c4033" opacity="0.24" filter="url(#ink-blur-l-3)" />

            {/* 水面 */}
            <path d={`M0 ${h*0.88} L0 ${h} L${w} ${h} L${w} ${h*0.88} Z`} fill="#f0ebe0" opacity="0.08" />

            {/* 水面波纹 */}
            <path d={`M${w*0.2} ${h*0.92} Q${w*0.3} ${h*0.9} ${w*0.4} ${h*0.92} Q${w*0.5} ${h*0.94} ${w*0.6} ${h*0.92}`}
              fill="none" stroke="#8b7355" strokeWidth="0.8" opacity="0.1" />
            <path d={`M${w*0.5} ${h*0.95} Q${w*0.6} ${h*0.93} ${w*0.7} ${h*0.95} Q${w*0.8} ${h*0.97} ${w*0.9} ${h*0.95}`}
              fill="none" stroke="#8b7355" strokeWidth="0.6" opacity="0.07" />

            {/* 飞鸟 */}
            <g opacity="0.25" stroke="#5c4033" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d={`M${w*0.35} ${h*0.22} Q${w*0.36} ${h*0.17} ${w*0.37} ${h*0.22} Q${w*0.38} ${h*0.17} ${w*0.39} ${h*0.22}`} />
              <path d={`M${w*0.4} ${h*0.18} Q${w*0.408} ${h*0.14} ${w*0.416} ${h*0.18} Q${w*0.424} ${h*0.14} ${w*0.432} ${h*0.18}`} />
              <path d={`M${w*0.33} ${h*0.26} Q${w*0.338} ${h*0.22} ${w*0.346} ${h*0.26} Q${w*0.354} ${h*0.22} ${w*0.362} ${h*0.26}`} />
              <path d={`M${w*0.6} ${h*0.15} Q${w*0.606} ${h*0.12} ${w*0.612} ${h*0.15} Q${w*0.618} ${h*0.12} ${w*0.624} ${h*0.15}`} opacity="0.5" />
            </g>

            {/* 孤舟 */}
            <g opacity="0.18" transform={`translate(${w*0.48}, ${h*0.88})`}>
              <path d="M-8,0 Q0,-3 8,0" fill="none" stroke="#5c4033" strokeWidth="1.5" />
              <line x1="0" y1="-3" x2="0" y2="-10" stroke="#5c4033" strokeWidth="0.8" />
            </g>
          </svg>
        </div>
      );
  }
}

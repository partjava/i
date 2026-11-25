'use client';
import { useState } from 'react';
import styles from './ToolCard.module.css';

interface ToolCardProps {
  name: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  url: string;
  desc: string;
  color: string;
  isDark?: boolean;
  onVisit?: (name: string) => void;
}

function getHexLuminance(hex: string): number {
  const m = hex.trim().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!m) return 128;
  let raw = m[1];
  if (raw.length === 3) {
    raw = raw
      .split('')
      .map((c) => c + c)
      .join('');
  }
  const r = parseInt(raw.slice(0, 2), 16);
  const g = parseInt(raw.slice(2, 4), 16);
  const b = parseInt(raw.slice(4, 6), 16);
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

export default function ToolCard({
  name,
  icon: Icon,
  url,
  desc,
  color,
  isDark = true,
  onVisit,
}: ToolCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleInteraction = () => {
    if (window.innerWidth < 768) {
      setIsFlipped(!isFlipped);
    }
  };

  // Direction A：深色模式统一采用磨砂玻璃底座 + 温润象牙白提亮单色图标，彻底告别“白膏药”补丁；浅色保持素笺精致卡片
  const luminance = getHexLuminance(color);
  const isVeryDarkBrand = luminance < 75;
  const isMidDarkBrand = luminance >= 75 && luminance < 145;

  const iconColor = isDark && isVeryDarkBrand ? '#F2EDE4' : color;
  const auraColor = isVeryDarkBrand ? '#D4AD72' : color;
  const iconPadBackground = isDark
    ? `radial-gradient(circle at 50% 26%, ${auraColor}28 0%, rgba(255, 255, 255, 0.055) 75%)`
    : 'linear-gradient(160deg, #FFFFFF 0%, #F4F6FA 100%)';
  const iconPadBorder = isDark
    ? '1px solid rgba(242, 233, 220, 0.13)'
    : '1px solid rgba(15, 29, 51, 0.09)';
  const iconFilter = isDark
    ? isVeryDarkBrand
      ? 'drop-shadow(0 2px 10px rgba(242, 237, 228, 0.22))'
      : isMidDarkBrand
      ? `brightness(1.45) saturate(1.22) drop-shadow(0 0 10px ${color}70)`
      : `drop-shadow(0 0 8px ${color}55)`
    : `drop-shadow(0 2px 6px ${color}33)`;

  return (
    <div
      className={`relative w-full aspect-square select-none ${isFlipped ? 'z-30' : 'z-10'}`}
      style={{ perspective: '950px' }}
      onMouseEnter={() => {
        if (window.innerWidth >= 768) {
          setIsFlipped(true);
        }
      }}
      onMouseLeave={() => {
        setIsFlipped(false);
      }}
      onClick={handleInteraction}
    >
      <div
        className={`${styles.inner} relative w-full h-full`}
        data-flipped={isFlipped}
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.48s cubic-bezier(0.22, 1, 0.36, 1)',
          transform: isFlipped
            ? 'rotateY(180deg) scale(1.12) translateY(-4px)'
            : 'rotateY(0deg) scale(1) translateY(0px)',
        }}
      >
        {/* 正面：去外层方框的通透 Launchpad 磁贴（直接突出 56px 品牌微光图标底座 + 工具名） */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            if (window.innerWidth < 768 && !isFlipped) {
              e.preventDefault();
              return;
            }
            onVisit?.(name);
          }}
          className="absolute inset-0 flex flex-col items-center justify-center px-1.5 py-2"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            borderRadius: '20px',
            background: 'transparent',
            border: '1px solid transparent',
            gap: '8px',
            zIndex: isFlipped ? 0 : 1,
          }}
        >
          <div
            className="flex items-center justify-center flex-shrink-0 transition-transform duration-200"
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: iconPadBackground,
              border: iconPadBorder,
              boxShadow: isDark
                ? '0 8px 20px rgba(0, 0, 0, 0.34), inset 0 1px 0 rgba(255, 255, 255, 0.16)'
                : '0 6px 14px rgba(15, 29, 51, 0.06), inset 0 1px 0 #FFFFFF',
            }}
          >
            <Icon
              style={{
                color: iconColor,
                fontSize: 28,
                filter: iconFilter,
              }}
            />
          </div>

          <span
            className="font-medium text-[12px] leading-[1.2] text-center truncate w-full px-1"
            style={{ color: isDark ? '#E8E2D6' : '#0F1D33' }}
          >
            {name}
          </span>
        </a>

        {/* 背面：翻转放大预览小窗 */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => onVisit?.(name)}
          className="absolute inset-0 flex flex-col justify-between overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderRadius: '20px',
            background: isDark
              ? 'linear-gradient(165deg, #222834 0%, #151921 100%)'
              : 'linear-gradient(165deg, #FFFFFF 0%, #F4F5F7 100%)',
            border: isDark
              ? '1.5px solid rgba(212, 173, 114, 0.78)'
              : '1.5px solid rgba(27, 59, 111, 0.45)',
            boxShadow: isDark
              ? '0 20px 42px rgba(0, 0, 0, 0.72), 0 0 22px rgba(212, 173, 114, 0.22)'
              : '0 20px 38px rgba(15, 29, 51, 0.16)',
            zIndex: isFlipped ? 1 : 0,
          }}
        >
          <div
            className="flex items-center justify-between px-2.5 py-1.5 border-b"
            style={{
              background: isDark ? 'rgba(12, 15, 20, 0.65)' : 'rgba(235, 238, 243, 0.8)',
              borderColor: isDark ? 'rgba(242, 233, 220, 0.08)' : 'rgba(15, 29, 51, 0.08)',
            }}
          >
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-400/85" />
              <span className="w-2 h-2 rounded-full bg-amber-400/85" />
              <span className="w-2 h-2 rounded-full bg-emerald-400/85" />
            </div>
            <span
              className="text-[10px] font-mono tracking-wider uppercase font-semibold"
              style={{ color: isDark ? '#D4AD72' : '#1B3B6F' }}
            >
              OPEN
            </span>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center px-2.5 py-1 text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1 w-full">
              <Icon
                className="flex-shrink-0"
                style={{ color: isDark && isVeryDarkBrand ? '#F2E9DC' : color, fontSize: 15 }}
              />
              <span
                className="font-bold text-[13px] truncate"
                style={{ color: isDark ? '#D4AD72' : '#1B3B6F' }}
              >
                {name}
              </span>
            </div>
            <p
              className="text-[11.5px] leading-[1.35] break-words line-clamp-3"
              style={{ color: isDark ? '#F2E9DC' : '#42526B' }}
            >
              {desc}
            </p>
          </div>

          <div className="px-2.5 pb-2 flex justify-center">
            <span
              className="w-full py-1 rounded-full text-center font-semibold text-[11px] tracking-wide"
              style={{
                background: isDark
                  ? 'linear-gradient(135deg, #DFB980 0%, #C29656 100%)'
                  : 'linear-gradient(135deg, #1B3B6F 0%, #0F1D33 100%)',
                color: isDark ? '#121417' : '#FFFFFF',
                boxShadow: isDark
                  ? '0 4px 12px rgba(212, 173, 114, 0.35)'
                  : '0 4px 10px rgba(27, 59, 111, 0.25)',
              }}
            >
              访问官网 →
            </span>
          </div>
        </a>
      </div>
    </div>
  );
}

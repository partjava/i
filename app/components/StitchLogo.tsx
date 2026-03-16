export default function StitchLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 左耳 */}
      <ellipse cx="22" cy="28" rx="10" ry="16" fill="#5b8dd9" transform="rotate(-20 22 28)" />
      <ellipse cx="22" cy="30" rx="5" ry="10" fill="#f4a7b9" transform="rotate(-20 22 30)" />
      {/* 右耳 */}
      <ellipse cx="78" cy="28" rx="10" ry="16" fill="#5b8dd9" transform="rotate(20 78 28)" />
      <ellipse cx="78" cy="30" rx="5" ry="10" fill="#f4a7b9" transform="rotate(20 78 30)" />

      {/* 头部 */}
      <ellipse cx="50" cy="55" rx="38" ry="36" fill="#6ba3e8" />
      {/* 头顶毛发 */}
      <path d="M38 22 Q42 14 46 20 Q50 10 54 20 Q58 14 62 22" stroke="#4a7fd4" strokeWidth="2.5" strokeLinecap="round" fill="none"/>

      {/* 脸部浅色区 */}
      <ellipse cx="50" cy="62" rx="22" ry="18" fill="#a8c8f0" />

      {/* 左眼白 */}
      <ellipse cx="35" cy="48" rx="11" ry="12" fill="#1a1a2e" />
      <ellipse cx="35" cy="48" rx="9" ry="10" fill="#2d1b00" />
      <circle cx="31" cy="44" r="3.5" fill="white" />
      <circle cx="33" cy="43" r="1.5" fill="white" />

      {/* 右眼白 */}
      <ellipse cx="65" cy="48" rx="11" ry="12" fill="#1a1a2e" />
      <ellipse cx="65" cy="48" rx="9" ry="10" fill="#2d1b00" />
      <circle cx="61" cy="44" r="3.5" fill="white" />
      <circle cx="63" cy="43" r="1.5" fill="white" />

      {/* 鼻子 */}
      <ellipse cx="50" cy="57" rx="9" ry="8" fill="#5a4fcf" />
      <ellipse cx="50" cy="57" rx="7" ry="6" fill="#6b5ce7" />
      <ellipse cx="47" cy="54" rx="2.5" ry="2" fill="#8b7ff0" opacity="0.6" />

      {/* 嘴巴 */}
      <path d="M30 70 Q50 82 70 70" fill="#e8735a" stroke="#c0392b" strokeWidth="1.5" />
      {/* 上排牙齿 */}
      <path d="M30 70 Q50 82 70 70" fill="none" stroke="white" strokeWidth="0" />
      <rect x="33" y="68" width="6" height="5" rx="1" fill="white" />
      <rect x="41" y="69" width="6" height="5" rx="1" fill="white" />
      <rect x="49" y="70" width="6" height="5" rx="1" fill="white" />
      <rect x="57" y="69" width="6" height="5" rx="1" fill="white" />
      {/* 下排牙齿 */}
      <rect x="36" y="74" width="5" height="4" rx="1" fill="white" />
      <rect x="44" y="75" width="5" height="4" rx="1" fill="white" />
      <rect x="52" y="75" width="5" height="4" rx="1" fill="white" />

      {/* 眉毛 */}
      <path d="M26 38 Q35 33 42 38" stroke="#3a5fa0" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M58 38 Q65 33 74 38" stroke="#3a5fa0" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

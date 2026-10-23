'use client';

import React from 'react';

export default function StitchLogo({
  size = 32,
  className = ''
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src="/images/mascot-pixel-cat.png"
        alt="PartJava 吉祥物"
        className="w-full h-full object-contain pointer-events-none drop-shadow-sm"
        style={{
          imageRendering: 'pixelated',
        }}
        draggable={false}
      />
    </div>
  );
}

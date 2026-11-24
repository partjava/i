'use client';

import React from 'react';
import Image from 'next/image';

interface BrandLogoProps {
  /** 'full' renders the horizontal emblem + wordmark; 'mark' renders the circular emblem only; 'grain' renders the golden stalk. */
  variant?: 'full' | 'mark' | 'grain';
  /** 'auto' switches automatically with body.dark; 'for-light' uses dark ink; 'for-dark' uses white ink. */
  tone?: 'auto' | 'for-light' | 'for-dark';
  className?: string;
  priority?: boolean;
}

export default function BrandLogo({
  variant = 'full',
  tone = 'auto',
  className = '',
  priority = false,
}: BrandLogoProps) {
  const hasHeight = /(?:^|\s)(?:[a-z0-9-]+:)*!?h-/.test(className);
  const defaultFullHeight = hasHeight ? '' : 'h-10';

  if (variant === 'grain') {
    return (
      <Image
        src="/images/heauio/logo-grain.png"
        alt="禾硙 Unolgy"
        width={1024}
        height={1024}
        priority={priority}
        className={`h-7 w-7 object-contain select-none ${className}`}
        draggable={false}
      />
    );
  }

  if (variant === 'mark') {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-full bg-white/90 p-0.5 shadow-sm ring-1 ring-slate-900/10 ${className}`}
      >
        <Image
          src="/images/heauio/logo-mark.png"
          alt="禾硙 Unolgy"
          width={1024}
          height={1024}
          priority={priority}
          className="h-full w-full object-contain select-none"
          draggable={false}
        />
      </span>
    );
  }

  if (tone === 'for-light') {
    return (
      <Image
        src="/images/heauio/heauio-dark.png"
        alt="禾硙 Unolgy"
        width={942}
        height={436}
        priority={priority}
        className={`${defaultFullHeight} w-auto object-contain select-none ${className}`}
        draggable={false}
      />
    );
  }

  if (tone === 'for-dark') {
    return (
      <Image
        src="/images/heauio/heauio-light.png"
        alt="禾硙 Unolgy"
        width={942}
        height={436}
        priority={priority}
        className={`${defaultFullHeight} w-auto object-contain select-none ${className}`}
        draggable={false}
      />
    );
  }

  return (
    <span className="inline-flex items-center select-none">
      <Image
        src="/images/heauio/heauio-dark.png"
        alt="禾硙 Unolgy"
        width={942}
        height={436}
        priority={priority}
        className={`brand-logo-for-light ${defaultFullHeight} w-auto object-contain ${className}`}
        draggable={false}
      />
      <Image
        src="/images/heauio/heauio-light.png"
        alt="禾硙 Unolgy"
        width={942}
        height={436}
        priority={priority}
        className={`brand-logo-for-dark ${defaultFullHeight} w-auto object-contain ${className}`}
        draggable={false}
      />
    </span>
  );
}

'use client';

import React, { useEffect, useRef } from 'react';

export const SpaceDust: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // 随机生成 180 颗微弱星尘
    const stars = Array.from({ length: 180 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.5 + 0.3,
      speed: Math.random() * 0.04 + 0.01,
      angle: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.7 + 0.3
    }));

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const animate = () => {
      // 宇宙深邃暗色背景
      ctx.fillStyle = '#020206';
      ctx.fillRect(0, 0, width, height);

      // 绘制放射性星云渐变滤镜
      const grad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        20,
        width / 2,
        height / 2,
        Math.max(width, height)
      );
      grad.addColorStop(0, '#0c0a22');
      grad.addColorStop(0.4, '#060511');
      grad.addColorStop(1, '#020206');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 渲染粒子
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        // 缓慢匀速漂移
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;

        // 越界回收
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 -z-10 pointer-events-none" />;
};

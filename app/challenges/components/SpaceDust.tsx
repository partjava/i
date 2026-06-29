'use client';

import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  r: number;
  speed: number;
  angle: number;
  opacity: number;
}

interface Snowflake {
  x: number;
  y: number;
  r: number;
  speedY: number;
  speedX: number;
  opacity: number;
  swingSpeed: number;
  swingRange: number;
  swingAngle: number;
}

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

    // 1. 随机生成 150 颗微弱星尘 (背景层，慢速随机漂移)
    const stars: Star[] = Array.from({ length: 150 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.2 + 0.3,
      speed: Math.random() * 0.03 + 0.01,
      angle: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.5 + 0.2
    }));

    // 2. 随机生成 70 颗羽化微光雪花粒子 (中景/前景层，缓缓飘落+正弦摆动)
    const snowflakes: Snowflake[] = Array.from({ length: 70 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2.8 + 1.0, // 雪花大小: 1.0px 到 3.8px
      speedY: Math.random() * 0.5 + 0.2, // 竖直下落速度
      speedX: Math.random() * 0.15 - 0.05, // 水平微风偏向
      opacity: Math.random() * 0.6 + 0.2, // 初始透明度
      swingSpeed: Math.random() * 0.015 + 0.005, // 摆动频率
      swingRange: Math.random() * 1.2 + 0.4, // 摆动幅度
      swingAngle: Math.random() * Math.PI * 2
    }));

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const animate = () => {
      // 保持 Canvas 透明，以展示底层 HTML 容器的水墨山水和藏青配色
      ctx.clearRect(0, 0, width, height);

      // 绘制极其柔和的半透明星空底色渐变，衬托宇宙深邃感
      const grad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        20,
        width / 2,
        height / 2,
        Math.max(width, height)
      );
      grad.addColorStop(0, 'rgba(99, 102, 241, 0.06)'); // 极其微弱的靛蓝底色
      grad.addColorStop(0.5, 'rgba(12, 31, 61, 0.03)'); // 极其微弱的墨蓝底色
      grad.addColorStop(1, 'rgba(12, 31, 61, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // A. 绘制背景星尘
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(237, 240, 245, ${star.opacity})`;
        ctx.fill();

        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;

        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;
      });

      // B. 绘制缓缓飘落的正弦雪花粒子
      snowflakes.forEach((flake) => {
        ctx.beginPath();
        
        // 创建羽化微光效果：圆心纯白，边缘带出淡淡的极光玉色(#BBFF5C)
        const flakeGrad = ctx.createRadialGradient(
          flake.x,
          flake.y,
          0,
          flake.x,
          flake.y,
          flake.r
        );
        flakeGrad.addColorStop(0, `rgba(255, 255, 255, ${flake.opacity})`);
        flakeGrad.addColorStop(0.3, `rgba(187, 255, 92, ${flake.opacity * 0.6})`);
        flakeGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = flakeGrad;

        ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
        ctx.fill();

        // 雪花运动：竖直飘落 + 正弦左右轻摆 + 微风倾斜
        flake.swingAngle += flake.swingSpeed;
        const swing = Math.sin(flake.swingAngle) * flake.swingRange;
        flake.y += flake.speedY;
        flake.x += flake.speedX + swing;

        // 越界重置：雪花落地后重新移回顶部
        if (flake.y > height) {
          flake.y = -10;
          flake.x = Math.random() * width;
          flake.opacity = Math.random() * 0.6 + 0.2;
        }
        if (flake.x < -10) flake.x = width + 10;
        if (flake.x > width + 10) flake.x = -10;
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

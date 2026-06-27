import { useEffect } from "react";
import { AI_TERMS } from "../data/stages";

// 🎨 丰富的科幻霓虹色彩板 (Vivid Neon Color Palette)
const COLOR_PALETTE = [
  "168, 85, 247",  // 霓虹紫 (Purple)
  "6, 182, 212",   // 霓虹青 (Cyan)
  "99, 102, 241",  // 蓝靛色 (Indigo)
  "16, 185, 129",  // 翡翠绿 (Emerald Green)
  "251, 191, 36",  // 琥珀金 (Amber Gold)
  "255, 138, 101", // 珊瑚橙 (Coral Orange)
  "236, 72, 153",  // 玫红色 (Hot Pink)
  "56, 189, 248",  // 天蓝色 (Sky Blue)
  "239, 68, 68",   // 亮红色 (Neon Red)
  "20, 184, 166",  // 蓝绿色 (Teal)
  "163, 230, 53"   // 柠檬绿 (Lime Green)
];

export default function StarBackground() {
    useEffect(() => {
        const canvas = document.getElementById("stars") as HTMLCanvasElement;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;

        const resize = () => {
            canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
            canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
        };

        resize();
        window.addEventListener("resize", resize);

        // 🧠 稠密的 AI 词汇墙粒子（增加到 85 个词汇，实现满屏背景效果）
        const terms = Array.from({ length: 85 }, () => {
            const word = AI_TERMS[Math.floor(Math.random() * AI_TERMS.length)];
            return {
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                text: word,
                // 💡 字体变大，且大小在合理范围内随机分布（16px - 36px 之间，产生远近层级景深感）
                fontSize: Math.floor(Math.random() * 21) + 16, 
                opacity: 1.0, // 💡 保持 100% 不透明度供查看
                speedX: (Math.random() - 0.5) * 0.15, // 缓动漂移
                speedY: -(0.06 + Math.random() * 0.12),
                // 💡 从丰富的调色板中随机抽取颜色，拒绝色彩单调
                color: COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)]
            };
        });

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 绘制纯黑背景底色
            ctx.fillStyle = "#000000";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 绘制大字体、不透明的“AI 术语背景墙”
            ctx.globalAlpha = 1.0;
            terms.forEach(t => {
                ctx.font = `bold ${t.fontSize}px 'Courier New', Monaco, monospace`;
                ctx.fillStyle = `rgba(${t.color}, ${t.opacity})`;
                ctx.fillText(t.text, t.x, t.y);

                // 更新浮移位置
                t.x += t.speedX;
                t.y += t.speedY;

                // 循环翻滚重置逻辑（飘出屏幕重置）
                if (t.y < -40) { // 字体变大后，越界范围稍微拓宽，防止被截断
                    t.y = canvas.height + 40;
                    t.x = Math.random() * canvas.width;
                }
                if (t.x < -120) t.x = canvas.width + 50;
                if (t.x > canvas.width + 120) t.x = -50;
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas id="stars" className="absolute inset-0 pointer-events-none z-0 bg-black" />;
}
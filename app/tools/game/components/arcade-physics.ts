export interface MovingBall { x: number; y: number; vx: number; vy: number; radius: number }

/** Resolve against the nearest point, reflecting the side actually hit. */
export function bounceOffBrick(ball: MovingBall, brick: { x: number; y: number; w: number; h: number }): boolean {
  const nearestX = Math.max(brick.x, Math.min(brick.x + brick.w, ball.x));
  const nearestY = Math.max(brick.y, Math.min(brick.y + brick.h, ball.y));
  let dx = ball.x - nearestX, dy = ball.y - nearestY;
  let distance = Math.hypot(dx, dy);
  if (distance >= ball.radius) return false;
  if (distance < 0.0001) {
    const edges = [
      { distance: ball.x - brick.x, x: -1, y: 0 },
      { distance: brick.x + brick.w - ball.x, x: 1, y: 0 },
      { distance: ball.y - brick.y, x: 0, y: -1 },
      { distance: brick.y + brick.h - ball.y, x: 0, y: 1 },
    ].sort((a, b) => a.distance - b.distance);
    dx = edges[0].x; dy = edges[0].y;
    distance = -edges[0].distance;
  } else { dx /= distance; dy /= distance; }
  ball.x += dx * (ball.radius - distance + 0.01);
  ball.y += dy * (ball.radius - distance + 0.01);
  const dot = ball.vx * dx + ball.vy * dy;
  if (dot >= 0) return false;
  ball.vx -= 2 * dot * dx;
  ball.vy -= 2 * dot * dy;
  return true;
}

/** Match a pinball flipper's visible segment, rather than an invisible rectangle. */
export function bounceOffFlipper(
  ball: { x: number; y: number; vx: number; vy: number; r: number },
  x1: number, y1: number, x2: number, y2: number, active: boolean, toward: number,
): boolean {
  const sx = x2 - x1, sy = y2 - y1;
  const length2 = sx * sx + sy * sy;
  if (!length2) return false;
  const t = Math.max(0, Math.min(1, ((ball.x - x1) * sx + (ball.y - y1) * sy) / length2));
  const x = x1 + sx * t, y = y1 + sy * t;
  const dx = ball.x - x, dy = ball.y - y;
  const distance = Math.hypot(dx, dy);
  if (distance > ball.r + 5 || dy > 5) return false;
  const nx = distance > 0.001 ? dx / distance : 0;
  const ny = distance > 0.001 ? dy / distance : -1;
  const dot = ball.vx * nx + ball.vy * ny;
  if (dot >= 0 && !active) return false;
  ball.x = x + nx * (ball.r + 5.1);
  ball.y = y + ny * (ball.r + 5.1);
  if (active) {
    ball.vy = -11.5;
    ball.vx = toward * (2.5 + 2 * t);
  } else {
    ball.vx -= 1.65 * Math.min(0, dot) * nx;
    ball.vy -= 1.65 * Math.min(0, dot) * ny;
  }
  return true;
}

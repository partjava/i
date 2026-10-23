import * as THREE from 'three';

const textureCache = new Map<string, THREE.CanvasTexture>();

export interface BadgeOptions {
  text: string;
  subText?: string;
  borderColor?: string;
  bgColor?: string;
  textColor?: string;
  scale?: [number, number];
  fontSize?: number;
}

/**
 * High-DPI cached 3D text badge sprite generator.
 * Prevents per-step CanvasTexture recreation and memory leaks.
 */
export function createHudBadge(
  position: THREE.Vector3 | [number, number, number],
  options: BadgeOptions
): THREE.Sprite {
  const {
    text,
    subText,
    borderColor = '#38bdf8',
    bgColor = 'rgba(11, 18, 34, 0.86)',
    textColor = '#f8fafc',
    scale = subText ? [2.8, 1.15] : [2.1, 0.82],
    fontSize = 30,
  } = options;

  const cacheKey = `${text}|${subText || ''}|${borderColor}|${bgColor}|${textColor}|${fontSize}`;
  let texture = textureCache.get(cacheKey);

  if (!texture && typeof document !== 'undefined') {
    const canvas = document.createElement('canvas');
    canvas.width = 384;
    canvas.height = subText ? 160 : 120;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Rounded pill background
      const pad = 10;
      const w = canvas.width - pad * 2;
      const h = canvas.height - pad * 2;
      const r = 24;

      ctx.beginPath();
      ctx.roundRect(pad, pad, w, h, r);
      ctx.fillStyle = bgColor;
      ctx.fill();

      ctx.lineWidth = 4;
      ctx.strokeStyle = borderColor;
      ctx.stroke();

      // Main label
      ctx.fillStyle = textColor;
      ctx.font = `bold ${fontSize}px "Inter", "Microsoft YaHei", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      if (subText) {
        ctx.fillText(text, canvas.width / 2, canvas.height * 0.38);
        ctx.fillStyle = borderColor;
        ctx.font = `600 ${Math.round(fontSize * 0.72)}px "JetBrains Mono", monospace`;
        ctx.fillText(subText, canvas.width / 2, canvas.height * 0.7);
      } else {
        ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 1);
      }
    }

    texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.needsUpdate = true;

    // Keep cache bounded
    if (textureCache.size > 400) {
      const firstKey = textureCache.keys().next().value;
      if (firstKey) {
        textureCache.get(firstKey)?.dispose();
        textureCache.delete(firstKey);
      }
    }
    textureCache.set(cacheKey, texture);
  }

  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: false,
    depthWrite: false,
  });

  const sprite = new THREE.Sprite(material);
  if (Array.isArray(position)) {
    sprite.position.set(position[0], position[1], position[2]);
  } else {
    sprite.position.copy(position);
  }
  sprite.scale.set(scale[0], scale[1], 1);
  sprite.renderOrder = 10;
  return sprite;
}

/**
 * Helper to create a glowing 3D curved energy arc between two 3D points.
 */
export function createEnergyArc(
  start: THREE.Vector3,
  end: THREE.Vector3,
  arcHeight: number,
  color: number,
  radius = 0.07,
  opacity = 0.9
): THREE.Mesh {
  const mid = new THREE.Vector3()
    .addVectors(start, end)
    .multiplyScalar(0.5);
  mid.y += arcHeight;

  const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
  const geometry = new THREE.TubeGeometry(curve, 28, radius, 10, false);
  const material = new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: 0.9,
    metalness: 0.5,
    roughness: 0.2,
    transparent: opacity < 1,
    opacity,
  });
  return new THREE.Mesh(geometry, material);
}

/**
 * Helper to create a straight glowing cylinder beam between two 3D points.
 */
export function createGlowingBeam(
  start: THREE.Vector3,
  end: THREE.Vector3,
  radius: number,
  color: number,
  opacity = 0.8
): THREE.Mesh {
  const curve = new THREE.LineCurve3(start, end);
  const geometry = new THREE.TubeGeometry(curve, 8, radius, 8, false);
  const material = new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: 0.75,
    metalness: 0.5,
    roughness: 0.25,
    transparent: opacity < 1,
    opacity,
  });
  return new THREE.Mesh(geometry, material);
}

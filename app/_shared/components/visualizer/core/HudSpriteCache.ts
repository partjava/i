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
 * Uses large, bold typography that fills the badge pill for crisp readability at any zoom level.
 */
export function createHudBadge(
  position: THREE.Vector3 | [number, number, number],
  options: BadgeOptions
): THREE.Sprite {
  const {
    text,
    subText,
    borderColor = '#38bdf8',
    bgColor = 'rgba(7, 12, 24, 0.92)',
    textColor = '#ffffff',
    scale = subText ? [2.85, 1.38] : [2.25, 1.05],
    fontSize = subText ? 54 : 68,
  } = options;

  const cacheKey = `v2|${text}|${subText || ''}|${borderColor}|${bgColor}|${textColor}|${fontSize}`;
  let texture = textureCache.get(cacheKey);

  if (!texture && typeof document !== 'undefined') {
    const canvas = document.createElement('canvas');
    // Dynamic width based on text length so numbers are large and nevertiny
    const charUnits = Math.max(
      text.length,
      subText ? Math.ceil(subText.length * 0.78) : 0,
      2.2
    );
    canvas.width = Math.min(Math.max(Math.round(charUnits * 62 + 80), 240), 640);
    canvas.height = subText ? 184 : 132;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const pad = 8;
      const w = canvas.width - pad * 2;
      const h = canvas.height - pad * 2;
      const r = 26;

      // Outer subtle glow
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(pad, pad, w, h, r);
      ctx.fillStyle = bgColor;
      ctx.shadowColor = borderColor;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.restore();

      // Crisp border
      ctx.beginPath();
      ctx.roundRect(pad, pad, w, h, r);
      ctx.lineWidth = 5.5;
      ctx.strokeStyle = borderColor;
      ctx.stroke();

      // Main label (large & bold)
      ctx.fillStyle = textColor;
      ctx.font = `800 ${fontSize}px "Inter", "JetBrains Mono", "Microsoft YaHei", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      if (subText) {
        ctx.fillText(text, canvas.width / 2, canvas.height * 0.37, w - 20);
        ctx.fillStyle = borderColor;
        ctx.font = `700 ${Math.round(fontSize * 0.68)}px "JetBrains Mono", "Microsoft YaHei", monospace`;
        ctx.fillText(subText, canvas.width / 2, canvas.height * 0.73, w - 20);
      } else {
        ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 2, w - 20);
      }
    }

    texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.needsUpdate = true;

    if (textureCache.size > 500) {
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
  // slightly boost overall sprite scale for readability
  sprite.scale.set(scale[0] * 1.18, scale[1] * 1.18, 1);
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
  radius = 0.075,
  opacity = 0.92
): THREE.Mesh {
  const mid = new THREE.Vector3()
    .addVectors(start, end)
    .multiplyScalar(0.5);
  mid.y += arcHeight;

  const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
  const geometry = new THREE.TubeGeometry(curve, 32, radius, 10, false);
  const material = new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: 0.95,
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
  opacity = 0.85
): THREE.Mesh {
  const curve = new THREE.LineCurve3(start, end);
  const geometry = new THREE.TubeGeometry(curve, 8, radius, 8, false);
  const material = new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: 0.8,
    metalness: 0.5,
    roughness: 0.22,
    transparent: opacity < 1,
    opacity,
  });
  return new THREE.Mesh(geometry, material);
}

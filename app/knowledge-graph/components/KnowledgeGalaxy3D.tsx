'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { navigationItems } from '../../_shared/data/navigation';
import {
  DOMAIN_META,
  GlobalGraphLink,
  MasteryStatus,
} from '../../_shared/lib/global-knowledge-graph';

export interface KnowledgeGalaxy3DProps {
  domainFilter: string;
  selectedNodeId: string;
  masteryMap: Record<string, MasteryStatus>;
  expandAll: boolean;
  autoRotate: boolean;
  links: GlobalGraphLink[];
  zoomSignal: { dir: 'in' | 'out' | 'reset'; seq: number };
  onSelectNode: (nodeId: string) => void;
  height?: number;
}

interface GalaxyNodeMeta {
  id: string;
  name: string;
  level: 'hub' | 'domain' | 'subject' | 'topic';
  domain: string;
  color: string;
  pos: THREE.Vector3;
  radius: number;
  mesh: THREE.Mesh;
  labelSprite?: THREE.Sprite;
}

function makeGlowTexture(hex: string): THREE.CanvasTexture {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const c = new THREE.Color(hex);
  const r = Math.round(c.r * 255);
  const g = Math.round(c.g * 255);
  const b = Math.round(c.b * 255);
  const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, `rgba(${r},${g},${b},0.92)`);
  grad.addColorStop(0.28, `rgba(${r},${g},${b},0.48)`);
  grad.addColorStop(0.65, `rgba(${r},${g},${b},0.10)`);
  grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

function makePillLabelSprite(
  text: string,
  accentHex: string,
  level: 'hub' | 'domain' | 'subject' | 'topic',
  isSelected: boolean
): { sprite: THREE.Sprite; baseScale: [number, number] } {
  const dpr = 2;
  const fontSize = level === 'hub' ? 28 : level === 'domain' ? 24 : level === 'subject' ? 20 : 17;
  const padX = level === 'topic' ? 14 : 18;
  const padY = level === 'topic' ? 8 : 10;

  const measureCanvas = document.createElement('canvas');
  const mctx = measureCanvas.getContext('2d')!;
  mctx.font = `${level === 'topic' ? 500 : 700} ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif`;
  const cleanText = text.length > 14 ? `${text.slice(0, 13)}…` : text;
  const tw = Math.ceil(mctx.measureText(cleanText).width);

  const w = Math.max(64, tw + padX * 2);
  const h = fontSize + padY * 2;
  const canvas = document.createElement('canvas');
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  const ctx = canvas.getContext('2d')!;
  ctx.scale(dpr, dpr);

  const radius = h / 2;
  ctx.beginPath();
  ctx.moveTo(radius, 0);
  ctx.arcTo(w, 0, w, h, radius);
  ctx.arcTo(w, h, 0, h, radius);
  ctx.arcTo(0, h, 0, 0, radius);
  ctx.arcTo(0, 0, w, 0, radius);
  ctx.closePath();

  ctx.fillStyle = isSelected ? 'rgba(15, 29, 51, 0.94)' : 'rgba(7, 14, 32, 0.80)';
  ctx.fill();

  ctx.lineWidth = isSelected ? 2.2 : 1.3;
  ctx.strokeStyle = isSelected ? '#ffffff' : `${accentHex}99`;
  ctx.stroke();

  ctx.font = `${level === 'topic' ? 500 : 700} ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif`;
  ctx.fillStyle = isSelected ? '#ffffff' : level === 'topic' ? '#cbd5e1' : '#f8fafc';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(cleanText, w / 2, h / 2 + 0.5);

  const tex = new THREE.CanvasTexture(canvas);
  tex.minFilter = THREE.LinearFilter;
  tex.needsUpdate = true;

  const mat = new THREE.SpriteMaterial({
    map: tex,
    transparent: true,
    depthTest: true,
    depthWrite: false,
  });
  const sprite = new THREE.Sprite(mat);
  const worldScaleFactor = level === 'hub' ? 0.088 : level === 'domain' ? 0.076 : level === 'subject' ? 0.055 : 0.042;
  const sx = w * worldScaleFactor;
  const sy = h * worldScaleFactor;
  sprite.scale.set(sx, sy, 1);
  return { sprite, baseScale: [sx, sy] };
}

export default function KnowledgeGalaxy3D({
  domainFilter,
  selectedNodeId,
  masteryMap,
  expandAll,
  autoRotate,
  links,
  zoomSignal,
  onSelectNode,
  height = 670,
}: KnowledgeGalaxy3DProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [hoveredInfo, setHoveredInfo] = useState<{
    name: string;
    domain: string;
    levelLabel: string;
    x: number;
    y: number;
  } | null>(null);
  const [webglError, setWebglError] = useState(false);

  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const flyTargetPosRef = useRef<THREE.Vector3 | null>(null);
  const flyLookAtRef = useRef<THREE.Vector3 | null>(null);
  const onSelectRef = useRef(onSelectNode);
  onSelectRef.current = onSelectNode;
  const autoRotateRef = useRef(autoRotate);
  autoRotateRef.current = autoRotate;

  // Respond to external HUD zoom/reset clicks
  useEffect(() => {
    const cam = cameraRef.current;
    const ctrl = controlsRef.current;
    if (!cam || !ctrl || zoomSignal.seq === 0) return;

    flyTargetPosRef.current = null;
    flyLookAtRef.current = null;

    if (zoomSignal.dir === 'reset') {
      flyTargetPosRef.current = new THREE.Vector3(0, 22, domainFilter === '全部' ? 104 : 76);
      flyLookAtRef.current = new THREE.Vector3(0, 0, 0);
      return;
    }

    const offset = cam.position.clone().sub(ctrl.target);
    const factor = zoomSignal.dir === 'in' ? 0.78 : 1.28;
    const nextLen = THREE.MathUtils.clamp(offset.length() * factor, 22, 165);
    offset.setLength(nextLen);
    cam.position.copy(ctrl.target).add(offset);
    ctrl.update();
  }, [zoomSignal]);

  useEffect(() => {
    const container = hostRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch {
      setWebglError(true);
      return;
    }

    const width = Math.max(320, container.clientWidth);
    const h = Math.max(420, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, h);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(46, width / h, 0.5, 600);
    camera.position.set(0, 22, domainFilter === '全部' ? 104 : 76);
    cameraRef.current = camera;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.065;
    controls.minDistance = 18;
    controls.maxDistance = 170;
    controls.rotateSpeed = 0.72;
    controls.zoomSpeed = 0.85;
    controlsRef.current = controls;

    const stopFly = () => {
      flyTargetPosRef.current = null;
      flyLookAtRef.current = null;
    };
    controls.addEventListener('start', stopFly);

    // Subtle lights for 3D spheres
    scene.add(new THREE.AmbientLight(0xdbeafe, 1.35));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.6);
    dirLight.position.set(35, 55, 45);
    scene.add(dirLight);
    const rimLight = new THREE.PointLight(0xd4ad72, 2.2, 160);
    rimLight.position.set(-40, -25, -35);
    scene.add(rimLight);

    // Disposable tracking
    const disposables: Array<{ dispose: () => void }> = [];
    const track = <T extends { dispose: () => void }>(item: T): T => {
      disposables.push(item);
      return item;
    };

    // 1. Background starfield
    const starCount = 460;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 95 + (i % 7) * 18;
      const theta = ((i * 137.508) % 360) * (Math.PI / 180);
      const phi = Math.acos(1 - 2 * ((i + 0.5) / starCount));
      starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPos[i * 3 + 1] = r * Math.cos(phi);
      starPos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    const starGeo = track(new THREE.BufferGeometry());
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = track(
      new THREE.PointsMaterial({ color: 0x93c5fd, size: 0.55, transparent: true, opacity: 0.45 })
    );
    scene.add(new THREE.Points(starGeo, starMat));

    // 2. Astrolabe orbital rings around galaxy center
    const ringGeo1 = track(new THREE.TorusGeometry(21, 0.08, 12, 120));
    const ringMat1 = track(
      new THREE.MeshBasicMaterial({ color: 0x6366f1, transparent: true, opacity: 0.22 })
    );
    const astrolabe1 = new THREE.Mesh(ringGeo1, ringMat1);
    astrolabe1.rotation.x = Math.PI / 2.25;
    scene.add(astrolabe1);

    const ringGeo2 = track(new THREE.TorusGeometry(39, 0.08, 12, 140));
    const ringMat2 = track(
      new THREE.MeshBasicMaterial({ color: 0xd4ad72, transparent: true, opacity: 0.18 })
    );
    const astrolabe2 = new THREE.Mesh(ringGeo2, ringMat2);
    astrolabe2.rotation.x = Math.PI / 2.4;
    astrolabe2.rotation.y = 0.28;
    scene.add(astrolabe2);

    // 3. Build hierarchical 3D layout
    const galaxyGroup = new THREE.Group();
    scene.add(galaxyGroup);

    const nodeMetaMap = new Map<string, GalaxyNodeMeta>();
    const pickableMeshes: THREE.Mesh[] = [];
    const sphereGeoLow = track(new THREE.SphereGeometry(1, 24, 24));
    const glowTexCache = new Map<string, THREE.CanvasTexture>();
    const getGlow = (hex: string) => {
      if (!glowTexCache.has(hex)) glowTexCache.set(hex, track(makeGlowTexture(hex)));
      return glowTexCache.get(hex)!;
    };

    const addNode = (opts: {
      id: string;
      name: string;
      level: 'hub' | 'domain' | 'subject' | 'topic';
      domain: string;
      color: string;
      pos: THREE.Vector3;
      radius: number;
      showLabel: boolean;
      mastery?: MasteryStatus;
    }) => {
      const isSelected = selectedNodeId === opts.id;
      const mat = track(
        new THREE.MeshStandardMaterial({
          color: opts.color,
          emissive: opts.color,
          emissiveIntensity: isSelected ? 0.85 : opts.level === 'hub' ? 0.7 : 0.42,
          roughness: 0.28,
          metalness: 0.22,
        })
      );
      const mesh = new THREE.Mesh(sphereGeoLow, mat);
      mesh.position.copy(opts.pos);
      mesh.scale.setScalar(isSelected ? opts.radius * 1.25 : opts.radius);
      mesh.userData = { nodeId: opts.id };
      galaxyGroup.add(mesh);
      pickableMeshes.push(mesh);

      // Soft halo sprite
      const haloMat = track(
        new THREE.SpriteMaterial({
          map: getGlow(isSelected ? '#38bdf8' : opts.color),
          transparent: true,
          opacity: isSelected ? 0.92 : opts.level === 'topic' ? 0.48 : 0.72,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      const halo = new THREE.Sprite(haloMat);
      halo.position.copy(opts.pos);
      const haloSize = opts.radius * (isSelected ? 5.6 : 4.1);
      halo.scale.set(haloSize, haloSize, 1);
      galaxyGroup.add(halo);

      // Mastery / selection halo ring
      if (opts.mastery === 'mastered' || opts.mastery === 'learning' || isSelected) {
        const ringColor =
          opts.mastery === 'mastered'
            ? 0x10b981
            : opts.mastery === 'learning'
            ? 0xfbbf24
            : 0x38bdf8;
        const mRingGeo = track(new THREE.TorusGeometry(opts.radius * 1.55, 0.11, 10, 40));
        const mRingMat = track(
          new THREE.MeshBasicMaterial({ color: ringColor, transparent: true, opacity: 0.9 })
        );
        const mRing = new THREE.Mesh(mRingGeo, mRingMat);
        mRing.position.copy(opts.pos);
        mRing.rotation.x = Math.PI / 2.8;
        mRing.rotation.y = 0.4;
        galaxyGroup.add(mRing);
      }

      let labelSprite: THREE.Sprite | undefined;
      if (opts.showLabel) {
        const { sprite } = makePillLabelSprite(opts.name, opts.color, opts.level, isSelected);
        if (sprite.material.map) track(sprite.material.map);
        track(sprite.material);
        sprite.position.set(opts.pos.x, opts.pos.y + opts.radius + (opts.level === 'topic' ? 1.15 : 1.65), opts.pos.z);
        galaxyGroup.add(sprite);
        labelSprite = sprite;
      }

      nodeMetaMap.set(opts.id, {
        id: opts.id,
        name: opts.name,
        level: opts.level,
        domain: opts.domain,
        color: opts.color,
        pos: opts.pos.clone(),
        radius: opts.radius,
        mesh,
        labelSprite,
      });
    };

    const addConnection = (from: THREE.Vector3, to: THREE.Vector3, colorHex: string, opacity: number, curved = false) => {
      let points: THREE.Vector3[];
      if (curved) {
        const mid = from.clone().add(to).multiplyScalar(0.5);
        const lift = mid.clone().normalize().multiplyScalar(Math.max(8, from.distanceTo(to) * 0.25));
        mid.add(lift);
        const curve = new THREE.QuadraticBezierCurve3(from, mid, to);
        points = curve.getPoints(28);
      } else {
        points = [from, to];
      }
      const lineGeo = track(new THREE.BufferGeometry().setFromPoints(points));
      const lineMat = track(
        new THREE.LineBasicMaterial({ color: colorHex, transparent: true, opacity })
      );
      galaxyGroup.add(new THREE.Line(lineGeo, lineMat));
    };

    const singleDomain = domainFilter !== '全部' && navigationItems[domainFilter];
    const domainDirs: Record<string, THREE.Vector3> = {
      计算机: new THREE.Vector3(-1, 0.58, 0.55).normalize(),
      人工智能: new THREE.Vector3(1, 0.52, 0.45).normalize(),
      软件工程: new THREE.Vector3(-0.92, -0.56, -0.58).normalize(),
      网络安全: new THREE.Vector3(0.95, -0.52, -0.52).normalize(),
    };

    if (!singleDomain) {
      addNode({
        id: 'hub_partjava',
        name: '禾硙全栈星系',
        level: 'hub',
        domain: '核心枢纽',
        color: '#6366f1',
        pos: new THREE.Vector3(0, 0, 0),
        radius: 3.1,
        showLabel: true,
      });
    }

    const entries = Object.entries(navigationItems).filter(
      ([dName]) => domainFilter === '全部' || dName === domainFilter
    );

    entries.forEach(([dName, subjs]) => {
      const dColor = DOMAIN_META[dName]?.color || '#38bdf8';
      const dPos = singleDomain
        ? new THREE.Vector3(0, 0, 0)
        : domainDirs[dName].clone().multiplyScalar(19);

      addNode({
        id: `domain_${dName}`,
        name: dName,
        level: 'domain',
        domain: dName,
        color: dColor,
        pos: dPos,
        radius: singleDomain ? 3.0 : 2.35,
        showLabel: true,
      });

      if (!singleDomain) {
        addConnection(new THREE.Vector3(0, 0, 0), dPos, dColor, 0.45, false);
      }

      // Build orthonormal basis around domain direction so subjects fan out in a spacious 3D cone
      const axis = singleDomain ? new THREE.Vector3(0, 1, 0) : domainDirs[dName].clone().normalize();
      const upRef = Math.abs(axis.y) < 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
      const tangentA = new THREE.Vector3().crossVectors(axis, upRef).normalize();
      const tangentB = new THREE.Vector3().crossVectors(axis, tangentA).normalize();

      subjs.forEach((subj, sIdx) => {
        const subjId = `subj_${subj.name}`;
        let sPos: THREE.Vector3;

        if (singleDomain) {
          // Full 360 Fibonacci spherical shell around single domain
          const phi = Math.acos(1 - (2 * (sIdx + 0.5)) / Math.max(1, subjs.length));
          const theta = Math.PI * (1 + Math.sqrt(5)) * sIdx;
          const r = 24 + (sIdx % 2) * 3.5;
          sPos = new THREE.Vector3(
            r * Math.sin(phi) * Math.cos(theta),
            r * Math.cos(phi) * 0.72,
            r * Math.sin(phi) * Math.sin(theta)
          );
        } else {
          // 3D cone cluster radiating out from each domain star
          const frac = (sIdx + 0.5) / Math.max(1, subjs.length);
          const coneAngle = 0.36 + frac * 0.62;
          const spin = sIdx * 2.39996;
          const shellR = 20 + (sIdx % 3) * 3.8;
          const dir = axis
            .clone()
            .multiplyScalar(Math.cos(coneAngle))
            .add(tangentA.clone().multiplyScalar(Math.sin(coneAngle) * Math.cos(spin)))
            .add(tangentB.clone().multiplyScalar(Math.sin(coneAngle) * Math.sin(spin)))
            .normalize();
          sPos = dPos.clone().add(dir.multiplyScalar(shellR));
        }

        const isSubjectFocused = selectedNodeId === subjId || (selectedNodeId === 'hub_partjava' && sIdx === 0 && dName === '计算机');
        addNode({
          id: subjId,
          name: subj.name,
          level: 'subject',
          domain: dName,
          color: dColor,
          pos: sPos,
          radius: isSubjectFocused ? 1.55 : 1.25,
          showLabel: true,
          mastery: masteryMap[subjId],
        });
        addConnection(dPos, sPos, dColor, 0.34, false);

        // Topic satellites: render when focused or when expandAll is enabled
        const showTopicsForThis = expandAll || selectedNodeId === subjId;
        if (showTopicsForThis) {
          const topics = (subj.subitems || []).slice(0, 8);
          topics.forEach((t, tIdx) => {
            const ang = (tIdx / Math.max(1, topics.length)) * Math.PI * 2;
            const satR = singleDomain ? 5.6 : 4.8;
            const tPos = sPos
              .clone()
              .add(new THREE.Vector3(Math.cos(ang) * satR, Math.sin(ang * 2) * 1.4, Math.sin(ang) * satR));
            const tid = `topic_${subj.name}_${tIdx}`;
            addNode({
              id: tid,
              name: t.name,
              level: 'topic',
              domain: dName,
              color: '#38bdf8',
              pos: tPos,
              radius: 0.55,
              showLabel: selectedNodeId === subjId || expandAll,
            });
            addConnection(sPos, tPos, '#38bdf8', 0.42, false);
          });
        }
      });
    });

    // 4. Cross-domain & prerequisite 3D glowing arcs + traveling light particles
    const arcPulses: Array<{ curve: THREE.QuadraticBezierCurve3; mesh: THREE.Mesh; speed: number; offset: number }> = [];
    const pulseGeo = track(new THREE.SphereGeometry(0.28, 10, 10));

    links.forEach((lnk, i) => {
      if (lnk.relation === 'hierarchy') return;
      const srcMeta = nodeMetaMap.get(lnk.source);
      const dstMeta = nodeMetaMap.get(lnk.target);
      if (!srcMeta || !dstMeta) return;
      const arcColor = lnk.relation === 'cross-domain' ? '#f59e0b' : '#38bdf8';
      addConnection(srcMeta.pos, dstMeta.pos, arcColor, 0.62, true);

      const mid = srcMeta.pos.clone().add(dstMeta.pos).multiplyScalar(0.5);
      mid.add(mid.clone().normalize().multiplyScalar(Math.max(8, srcMeta.pos.distanceTo(dstMeta.pos) * 0.25)));
      const curve = new THREE.QuadraticBezierCurve3(srcMeta.pos, mid, dstMeta.pos);
      const pMat = track(new THREE.MeshBasicMaterial({ color: arcColor }));
      const pMesh = new THREE.Mesh(pulseGeo, pMat);
      galaxyGroup.add(pMesh);
      arcPulses.push({ curve, mesh: pMesh, speed: 0.16 + (i % 4) * 0.03, offset: (i * 0.23) % 1 });
    });

    // Pointer raycast for hover tooltip & click fly-to
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let downX = 0;
    let downY = 0;

    const getHit = (ev: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(pickableMeshes, false);
      return { hits, rect, localX: ev.clientX - rect.left, localY: ev.clientY - rect.top };
    };

    const onPointerDown = (ev: PointerEvent) => {
      downX = ev.clientX;
      downY = ev.clientY;
    };

    const onPointerMove = (ev: PointerEvent) => {
      const { hits, localX, localY } = getHit(ev);
      if (hits.length > 0) {
        const nid = hits[0].object.userData?.nodeId as string;
        const meta = nodeMetaMap.get(nid);
        if (meta) {
          renderer.domElement.style.cursor = 'pointer';
          setHoveredInfo({
            name: meta.name,
            domain: meta.domain,
            levelLabel:
              meta.level === 'hub'
                ? '全栈核心星核'
                : meta.level === 'domain'
                ? '核心技术领域'
                : meta.level === 'subject'
                ? '主干学科星球 · 点击飞向聚焦'
                : '章节考点卫星',
            x: localX,
            y: localY,
          });
          return;
        }
      }
      renderer.domElement.style.cursor = 'grab';
      setHoveredInfo(null);
    };

    const onPointerUp = (ev: PointerEvent) => {
      const dist = Math.hypot(ev.clientX - downX, ev.clientY - downY);
      if (dist > 6) return; // Was dragging orbit, not clicking
      const { hits } = getHit(ev);
      if (hits.length > 0) {
        const nid = hits[0].object.userData?.nodeId as string;
        const meta = nodeMetaMap.get(nid);
        if (meta) {
          const dirOut = meta.pos.lengthSq() > 1 ? meta.pos.clone().normalize() : new THREE.Vector3(0, 0.35, 1).normalize();
          const viewOffset = dirOut.multiplyScalar(22).add(new THREE.Vector3(0, 7, 12));
          flyLookAtRef.current = meta.pos.clone();
          flyTargetPosRef.current = meta.pos.clone().add(viewOffset);
          onSelectRef.current(nid);
        }
      }
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('pointerup', onPointerUp);

    // ResizeObserver
    const ro = new ResizeObserver((entriesObs) => {
      const cr = entriesObs[0]?.contentRect;
      if (!cr || cr.width < 10) return;
      camera.aspect = cr.width / h;
      camera.updateProjectionMatrix();
      renderer.setSize(cr.width, h);
    });
    ro.observe(container);

    // Animation loop
    let rafId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      astrolabe1.rotation.z = elapsed * 0.05;
      astrolabe2.rotation.z = -elapsed * 0.035;

      // Animate prerequisite flow particles
      for (const p of arcPulses) {
        const t = (elapsed * p.speed + p.offset) % 1;
        p.mesh.position.copy(p.curve.getPointAt(t));
      }

      // Smooth camera fly-to when node clicked
      if (flyTargetPosRef.current && flyLookAtRef.current) {
        camera.position.lerp(flyTargetPosRef.current, 0.075);
        controls.target.lerp(flyLookAtRef.current, 0.085);
        if (camera.position.distanceTo(flyTargetPosRef.current) < 0.35) {
          flyTargetPosRef.current = null;
          flyLookAtRef.current = null;
        }
      }

      controls.autoRotate = autoRotateRef.current && !flyTargetPosRef.current;
      controls.autoRotateSpeed = 0.55;
      controls.update();

      // Depth fade far-side sprite labels to prevent visual clutter
      const camDist = camera.position.distanceTo(controls.target);
      nodeMetaMap.forEach((meta) => {
        if (!meta.labelSprite) return;
        const d = camera.position.distanceTo(meta.pos);
        const rel = THREE.MathUtils.clamp(1.28 - (d - camDist * 0.65) / Math.max(30, camDist * 0.85), 0.25, 1);
        (meta.labelSprite.material as THREE.SpriteMaterial).opacity =
          meta.id === selectedNodeId ? 1 : rel;
      });

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      controls.removeEventListener('start', stopFly);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      controls.dispose();
      disposables.forEach((d) => {
        try {
          d.dispose();
        } catch {}
      });
      renderer.dispose();
      container.innerHTML = '';
    };
  }, [domainFilter, selectedNodeId, masteryMap, expandAll, links, height]);

  if (webglError) {
    return (
      <div className="flex items-center justify-center text-slate-300 text-sm" style={{ height }}>
        当前浏览器环境暂不支持 WebGL 3D 渲染，请点击右上角切换至「2D 径向」视图。
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden" style={{ height }}>
      <div ref={hostRef} className="w-full h-full select-none" />

      {hoveredInfo && (
        <div
          className="pointer-events-none absolute z-30 max-w-[230px] rounded-xl bg-slate-950/92 backdrop-blur-md border border-sky-400/40 px-3 py-2 shadow-xl text-xs"
          style={{
            left: Math.min(Math.max(12, hoveredInfo.x + 14), 560),
            top: Math.max(54, hoveredInfo.y - 16),
          }}
        >
          <div className="font-bold text-sky-300">{hoveredInfo.name}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {hoveredInfo.domain} · {hoveredInfo.levelLabel}
          </div>
        </div>
      )}
    </div>
  );
}

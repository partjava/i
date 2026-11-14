import * as THREE from 'three';
import { CameraPreset } from '../types';

export class SceneManager {
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public renderer: THREE.WebGLRenderer;
  public contentGroup: THREE.Group;

  private canvas: HTMLCanvasElement;
  private animId: number | null = null;
  private resizeObserver: ResizeObserver | null = null;

  // Spherical orbit camera state
  private target = new THREE.Vector3(0, 2.5, 0);
  private desiredTarget = new THREE.Vector3(0, 2.5, 0);
  private spherical = new THREE.Spherical(20, Math.PI * 0.36, 0);
  private desiredSpherical = new THREE.Spherical(20, Math.PI * 0.36, 0);
  private activePreset: CameraPreset = {
    position: [0, 6.2, 20.5],
    target: [0, 3.0, 0],
    autoOrbitSpeed: 0.12,
  };

  private isDragging = false;
  private dragMode: 'rotate' | 'pan' = 'rotate';
  private prevPointer = { x: 0, y: 0 };
  private userInteractedRecently = false;
  private interactionTimer: ReturnType<typeof setTimeout> | null = null;
  public autoOrbitEnabled = true;

  private pointLight1: THREE.PointLight;
  private pointLight2: THREE.PointLight;
  private starField: THREE.Points | null = null;
  private stageRingOuter: THREE.Mesh | null = null;
  private stageRingInner: THREE.Mesh | null = null;
  private stepEnterTime = 0;
  private stepTransitionDone = true;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x070c18);
    this.scene.fog = new THREE.FogExp2(0x070c18, 0.015);

    const w = Math.max(canvas.clientWidth, 320);
    const h = Math.max(canvas.clientHeight, 240);

    this.camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 300);

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setSize(w, h, false);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;

    // Studio lighting
    const ambient = new THREE.AmbientLight(0xdbeafe, 0.72);
    this.scene.add(ambient);

    const hemi = new THREE.HemisphereLight(0x93c5fd, 0x0f172a, 0.45);
    this.scene.add(hemi);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.15);
    dirLight.position.set(12, 22, 15);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    this.scene.add(dirLight);

    this.pointLight1 = new THREE.PointLight(0x38bdf8, 0.85, 65);
    this.pointLight1.position.set(-12, 8, 8);
    this.scene.add(this.pointLight1);

    this.pointLight2 = new THREE.PointLight(0x818cf8, 0.85, 65);
    this.pointLight2.position.set(12, 8, -8);
    this.scene.add(this.pointLight2);

    // Subtle holographic stage grid
    const grid = new THREE.GridHelper(32, 32, 0x1e293b, 0x0f172a);
    grid.position.y = -0.05;
    const gridMat = grid.material as THREE.Material;
    if (gridMat) {
      gridMat.transparent = true;
      gridMat.opacity = 0.55;
    }
    this.scene.add(grid);

    // Dual counter-rotating holographic rings beneath the stage
    const outerGeo = new THREE.RingGeometry(11.8, 12.12, 72);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.22,
    });
    this.stageRingOuter = new THREE.Mesh(outerGeo, outerMat);
    this.stageRingOuter.rotation.x = -Math.PI / 2;
    this.stageRingOuter.position.y = -0.04;
    this.scene.add(this.stageRingOuter);

    const innerGeo = new THREE.RingGeometry(8.2, 8.42, 64);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.24,
    });
    this.stageRingInner = new THREE.Mesh(innerGeo, innerMat);
    this.stageRingInner.rotation.x = -Math.PI / 2;
    this.stageRingInner.position.y = -0.035;
    this.scene.add(this.stageRingInner);

    // Ambient volumetric starfield around the holographic stage
    const starCount = 160;
    const starPos = new Float32Array(starCount * 3);
    const starCol = new Float32Array(starCount * 3);
    const palette = [
      new THREE.Color(0x38bdf8),
      new THREE.Color(0x818cf8),
      new THREE.Color(0xa855f7),
      new THREE.Color(0x34d399),
    ];
    for (let i = 0; i < starCount; i++) {
      const seed = i + 1;
      const angle = ((seed * 137.5) % 360) * (Math.PI / 180);
      const radius = 16 + ((seed * 19.3) % 24);
      const y = -1.5 + ((seed * 7.7) % 22);
      starPos[i * 3] = Math.cos(angle) * radius;
      starPos[i * 3 + 1] = y;
      starPos[i * 3 + 2] = Math.sin(angle) * radius;
      const c = palette[i % palette.length];
      starCol[i * 3] = c.r;
      starCol[i * 3 + 1] = c.g;
      starCol[i * 3 + 2] = c.b;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starCol, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.16,
      vertexColors: true,
      transparent: true,
      opacity: 0.68,
      depthWrite: false,
    });
    this.starField = new THREE.Points(starGeo, starMat);
    this.scene.add(this.starField);

    // Dedicated group for algorithm content
    this.contentGroup = new THREE.Group();
    this.scene.add(this.contentGroup);

    this.applyCameraPreset(this.activePreset, true);
    this.bindEvents();
    this.startLoop();
  }

  public applyCameraPreset(preset: CameraPreset, immediate = false) {
    this.activePreset = preset;
    this.desiredTarget.set(preset.target[0], preset.target[1], preset.target[2]);

    const offset = new THREE.Vector3(
      preset.position[0] - preset.target[0],
      preset.position[1] - preset.target[1],
      preset.position[2] - preset.target[2]
    );
    this.desiredSpherical.setFromVector3(offset);

    if (immediate) {
      this.target.copy(this.desiredTarget);
      this.spherical.copy(this.desiredSpherical);
      this.updateCameraFromSpherical();
    }
  }

  public resetCamera() {
    this.userInteractedRecently = false;
    this.applyCameraPreset(this.activePreset, false);
  }

  public zoomBy(deltaFactor: number) {
    this.desiredSpherical.radius = THREE.MathUtils.clamp(
      this.desiredSpherical.radius * deltaFactor,
      6,
      44
    );
  }

  public clearContent() {
    while (this.contentGroup.children.length > 0) {
      const child = this.contentGroup.children[0];
      this.contentGroup.remove(child);
      this.disposeObject(child);
    }
  }

  private disposeObject(obj: THREE.Object3D) {
    obj.traverse((node: any) => {
      if (node.geometry) {
        node.geometry.dispose();
      }
      if (node.material) {
        if (Array.isArray(node.material)) {
          node.material.forEach((m: any) => m.dispose?.());
        } else {
          // Do not dispose shared cached sprite textures
          node.material.dispose?.();
        }
      }
    });
  }

  private updateCameraFromSpherical() {
    const aspect = this.camera.aspect || 1.5;
    // 当分屏模式下 3D 画布宽高比变窄时，自动微调视距以保证横向柱体/节点完整呈现在画面中央
    const aspectCompensation =
      aspect < 1.32 ? Math.min(1.22, 1.32 / Math.max(aspect, 0.78)) : 1.0;
    const effectiveSpherical = this.spherical.clone();
    effectiveSpherical.radius *= aspectCompensation;
    const offset = new THREE.Vector3().setFromSpherical(effectiveSpherical);
    this.camera.position.copy(this.target).add(offset);
    this.camera.lookAt(this.target);
  }

  private markUserInteraction() {
    this.userInteractedRecently = true;
    if (this.interactionTimer) clearTimeout(this.interactionTimer);
    this.interactionTimer = setTimeout(() => {
      this.userInteractedRecently = false;
    }, 4500);
  }

  private onPointerDown = (e: PointerEvent) => {
    this.isDragging = true;
    this.dragMode = e.button === 2 || e.shiftKey ? 'pan' : 'rotate';
    this.prevPointer = { x: e.clientX, y: e.clientY };
    this.canvas.setPointerCapture?.(e.pointerId);
    this.markUserInteraction();
  };

  private onPointerMove = (e: PointerEvent) => {
    if (!this.isDragging) return;
    const dx = e.clientX - this.prevPointer.x;
    const dy = e.clientY - this.prevPointer.y;
    this.prevPointer = { x: e.clientX, y: e.clientY };

    if (this.dragMode === 'rotate') {
      this.desiredSpherical.theta -= dx * 0.0065;
      this.desiredSpherical.phi = THREE.MathUtils.clamp(
        this.desiredSpherical.phi - dy * 0.006,
        0.15,
        Math.PI * 0.48
      );
    } else {
      const panSpeed = this.desiredSpherical.radius * 0.0015;
      this.desiredTarget.x -= dx * panSpeed;
      this.desiredTarget.y = THREE.MathUtils.clamp(
        this.desiredTarget.y + dy * panSpeed,
        -2,
        10
      );
    }
    this.markUserInteraction();
  };

  private onPointerUp = (e: PointerEvent) => {
    this.isDragging = false;
    this.canvas.releasePointerCapture?.(e.pointerId);
  };

  private onWheel = (e: WheelEvent) => {
    e.preventDefault();
    const factor = e.deltaY > 0 ? 1.08 : 0.92;
    this.zoomBy(factor);
    this.markUserInteraction();
  };

  private onContextMenu = (e: MouseEvent) => {
    e.preventDefault();
  };

  public resize = () => {
    if (!this.canvas) return;
    const w = this.canvas.clientWidth;
    const h = this.canvas.clientHeight;
    if (!w || !h) return;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h, false);
  };

  private handleResize = () => {
    this.resize();
  };

  private bindEvents() {
    this.canvas.addEventListener('pointerdown', this.onPointerDown);
    window.addEventListener('pointermove', this.onPointerMove);
    window.addEventListener('pointerup', this.onPointerUp);
    this.canvas.addEventListener('wheel', this.onWheel, { passive: false });
    this.canvas.addEventListener('contextmenu', this.onContextMenu);

    this.resizeObserver = new ResizeObserver(this.handleResize);
    this.resizeObserver.observe(this.canvas);
    window.addEventListener('resize', this.handleResize);
  }

  public triggerStepTransition() {
    this.contentGroup.children.forEach((child) => {
      if (child.userData.baseY === undefined) {
        child.userData.baseY = child.position.y;
      }
      if (!child.userData.baseScale) {
        child.userData.baseScale = child.scale.clone();
      }
      child.scale.copy(child.userData.baseScale).multiplyScalar(0.88);
      child.position.y = child.userData.baseY - 0.16;
    });
    this.stepEnterTime = performance.now();
    this.stepTransitionDone = false;
  }

  private startLoop() {
    let time = 0;
    const animate = () => {
      this.animId = requestAnimationFrame(animate);
      time += 0.005;

      // Gentle ambient orbit when user isn't actively dragging
      if (this.autoOrbitEnabled && !this.isDragging && !this.userInteractedRecently) {
        const speed = this.activePreset.autoOrbitSpeed ?? 0.12;
        this.desiredSpherical.theta =
          Math.sin(time * speed * 2.5) * 0.18;
      }

      // Smooth damping towards desired spherical & target
      this.spherical.radius += (this.desiredSpherical.radius - this.spherical.radius) * 0.12;
      this.spherical.phi += (this.desiredSpherical.phi - this.spherical.phi) * 0.12;
      this.spherical.theta += (this.desiredSpherical.theta - this.spherical.theta) * 0.12;
      this.target.lerp(this.desiredTarget, 0.12);

      this.updateCameraFromSpherical();

      // Smooth 320ms cubic-out entrance transition on step change
      if (!this.stepTransitionDone && this.stepEnterTime > 0) {
        const elapsed = performance.now() - this.stepEnterTime;
        const t = Math.min(1, elapsed / 320);
        const ease = 1 - Math.pow(1 - t, 3);
        const scaleFactor = 0.88 + 0.12 * ease;
        const yOffset = -0.16 * (1 - ease);
        this.contentGroup.children.forEach((child) => {
          const baseScale = child.userData.baseScale as THREE.Vector3 | undefined;
          const baseY = child.userData.baseY as number | undefined;
          if (baseScale) {
            child.scale.copy(baseScale).multiplyScalar(scaleFactor);
          }
          if (typeof baseY === 'number') {
            child.position.y = baseY + yOffset;
          }
        });
        if (t >= 1) {
          this.stepTransitionDone = true;
        }
      }

      // Ambient holographic rings & volumetric starfield rotation
      if (this.starField) {
        this.starField.rotation.y += 0.0005;
      }
      if (this.stageRingOuter) {
        this.stageRingOuter.rotation.z += 0.0012;
      }
      if (this.stageRingInner) {
        this.stageRingInner.rotation.z -= 0.0018;
      }

      // Traveling energy photons & active glow modulation
      this.contentGroup.traverse((node: any) => {
        if (node.userData?.orbitCurve) {
          const curve = node.userData.orbitCurve as THREE.Curve<THREE.Vector3>;
          const u =
            (((time * (node.userData.orbitSpeed || 0.75) * 3.2 +
              (node.userData.orbitOffset || 0)) %
              1) +
              1) %
            1;
          curve.getPointAt(u, node.position);
        }
        if (node.userData?.pulseGlow && node.material?.emissiveIntensity !== undefined) {
          const base = node.userData.baseEmissive ?? 0.8;
          const phase = node.userData.phaseOffset ?? 0;
          node.material.emissiveIntensity = base * (0.78 + 0.35 * Math.sin(time * 18 + phase));
        }
      });

      // Dynamic lights
      this.pointLight1.position.x = Math.sin(time) * 12;
      this.pointLight1.position.z = Math.cos(time) * 12;
      this.pointLight2.position.x = Math.cos(time) * 12;
      this.pointLight2.position.z = Math.sin(time) * 12;

      this.renderer.render(this.scene, this.camera);
    };
    animate();
  }

  public dispose() {
    if (this.animId) cancelAnimationFrame(this.animId);
    if (this.interactionTimer) clearTimeout(this.interactionTimer);
    this.resizeObserver?.disconnect();
    window.removeEventListener('resize', this.handleResize);
    this.canvas.removeEventListener('pointerdown', this.onPointerDown);
    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('pointerup', this.onPointerUp);
    this.canvas.removeEventListener('wheel', this.onWheel);
    this.canvas.removeEventListener('contextmenu', this.onContextMenu);
    this.clearContent();
    if (this.starField) {
      this.scene.remove(this.starField);
      this.disposeObject(this.starField);
      this.starField = null;
    }
    if (this.stageRingOuter) {
      this.scene.remove(this.stageRingOuter);
      this.disposeObject(this.stageRingOuter);
      this.stageRingOuter = null;
    }
    if (this.stageRingInner) {
      this.scene.remove(this.stageRingInner);
      this.disposeObject(this.stageRingInner);
      this.stageRingInner = null;
    }
    this.renderer.dispose();
  }
}

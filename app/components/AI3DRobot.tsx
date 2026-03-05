'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'antd';
import * as THREE from 'three';

// 优化的AI 3D机器人组件
export default function AI3DRobot({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const animationIdRef = useRef<number>();
  const robotGroupRef = useRef<THREE.Group>();
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isWaving, setIsWaving] = useState(false);

  // 创建卡通渲染渐变纹理 - 史迪奇蓝色
  const createToonGradient = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 1;
    const context = canvas.getContext('2d');
    if (!context) return null;
    
    const gradient = context.createLinearGradient(0, 0, 256, 0);
    gradient.addColorStop(0, '#3a5f8a');
    gradient.addColorStop(0.5, '#5b9bd5');
    gradient.addColorStop(1, '#7eb8e8');
    
    context.fillStyle = gradient;
    context.fillRect(0, 0, 256, 1);
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.NearestFilter;
    return texture;
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    // 获取容器尺寸
    const container = canvasRef.current.parentElement;
    if (!container) return;

    const getContainerSize = () => {
      const rect = container.getBoundingClientRect();
      return {
        width: rect.width,
        height: rect.height
      };
    };

    const { width, height } = getContainerSize();

    // 初始化Three.js场景
    const scene = new THREE.Scene();
    // 渐变背景色
    scene.background = new THREE.Color(0x87CEEB);
    scene.fog = new THREE.Fog(0x87CEEB, 5, 15);
    
    const camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    );
    camera.position.set(0, 2, 8); // 调整相机位置以适应更大的机器人

    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // 改进的光照系统
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    scene.add(directionalLight);

    // 添加补光
    const fillLight = new THREE.DirectionalLight(0x88ccff, 0.3);
    fillLight.position.set(-5, 5, -5);
    scene.add(fillLight);

    // 创建史迪奇风格的机器人模型
    const robotGroup = new THREE.Group();
    robotGroupRef.current = robotGroup;

    // 史迪奇蓝色材质
    const toonBodyMaterial = new THREE.MeshToonMaterial({ 
      color: 0x5b9bd5,
      emissive: 0x4a7fb8,
      emissiveIntensity: 0.15,
      gradientMap: createToonGradient()
    });

    // 梨形身体
    const bodyGeometry = new THREE.SphereGeometry(0.45, 32, 32);
    bodyGeometry.scale(1, 1.1, 0.9);
    const body = new THREE.Mesh(bodyGeometry, toonBodyMaterial);
    body.position.y = 0.4;
    body.castShadow = true;
    robotGroup.add(body);

    // 浅蓝色肚子
    const bellyGeometry = new THREE.SphereGeometry(0.35, 32, 32);
    bellyGeometry.scale(0.9, 1, 0.8);
    const bellyMaterial = new THREE.MeshToonMaterial({ 
      color: 0xb8d8f0,
      gradientMap: createToonGradient()
    });
    const belly = new THREE.Mesh(bellyGeometry, bellyMaterial);
    belly.position.set(0, 0.35, 0.25);
    robotGroup.add(belly);

    // 大圆头
    const headGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    headGeometry.scale(1, 0.95, 0.9);
    const headMaterial = new THREE.MeshToonMaterial({ 
      color: 0x5b9bd5,
      emissive: 0x4a7fb8,
      emissiveIntensity: 0.15,
      gradientMap: createToonGradient()
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.3;
    head.castShadow = true;
    robotGroup.add(head);

    // 史迪奇标志性大耳朵
    const earGeometry = new THREE.SphereGeometry(0.25, 16, 16);
    earGeometry.scale(0.6, 1.5, 0.4);
    const earMaterial = new THREE.MeshToonMaterial({ 
      color: 0x5b9bd5,
      gradientMap: createToonGradient()
    });
    
    const earInnerGeometry = new THREE.SphereGeometry(0.18, 16, 16);
    earInnerGeometry.scale(0.5, 1.3, 0.3);
    const earInnerMaterial = new THREE.MeshToonMaterial({ 
      color: 0xe89ac7,
      gradientMap: createToonGradient()
    });
    
    const leftEar = new THREE.Mesh(earGeometry, earMaterial);
    leftEar.position.set(-0.35, 1.75, -0.1);
    leftEar.rotation.z = -0.3;
    leftEar.castShadow = true;
    robotGroup.add(leftEar);
    
    const leftEarInner = new THREE.Mesh(earInnerGeometry, earInnerMaterial);
    leftEarInner.position.set(-0.35, 1.75, 0.05);
    leftEarInner.rotation.z = -0.3;
    robotGroup.add(leftEarInner);
    
    const rightEar = new THREE.Mesh(earGeometry, earMaterial);
    rightEar.position.set(0.35, 1.75, -0.1);
    rightEar.rotation.z = 0.3;
    rightEar.castShadow = true;
    robotGroup.add(rightEar);
    
    const rightEarInner = new THREE.Mesh(earInnerGeometry, earInnerMaterial);
    rightEarInner.position.set(0.35, 1.75, 0.05);
    rightEarInner.rotation.z = 0.3;
    robotGroup.add(rightEarInner);

    // 超大动漫眼睛 - 更大更圆，几乎占据整个脸
    const eyeWhiteGeometry = new THREE.SphereGeometry(0.22, 32, 32);
    const eyeWhiteMaterial = new THREE.MeshToonMaterial({ 
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 0.3
    });
    
    const leftEyeWhite = new THREE.Mesh(eyeWhiteGeometry, eyeWhiteMaterial);
    leftEyeWhite.scale.set(1.1, 1.4, 0.6);
    leftEyeWhite.position.set(-0.15, 1.35, 0.42);
    robotGroup.add(leftEyeWhite);
    
    const rightEyeWhite = new THREE.Mesh(eyeWhiteGeometry, eyeWhiteMaterial);
    rightEyeWhite.scale.set(1.1, 1.4, 0.6);
    rightEyeWhite.position.set(0.15, 1.35, 0.42);
    robotGroup.add(rightEyeWhite);

    // 深棕色瞳孔 - 更大更圆
    const pupilGeometry = new THREE.SphereGeometry(0.12, 24, 24);
    const pupilMaterial = new THREE.MeshToonMaterial({ 
      color: 0x2d1810,
      emissive: 0x1a0e09,
      emissiveIntensity: 0.2
    });
    
    const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    leftPupil.scale.set(1, 1.3, 0.8);
    leftPupil.position.set(-0.15, 1.37, 0.5);
    robotGroup.add(leftPupil);
    
    const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    rightPupil.scale.set(1, 1.3, 0.8);
    rightPupil.position.set(0.15, 1.37, 0.5);
    robotGroup.add(rightPupil);

    // 超大高光点 - 让眼睛更有神
    const highlightGeometry = new THREE.SphereGeometry(0.06, 16, 16);
    const highlightMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffffff,
      transparent: true,
      opacity: 1
    });
    
    const leftHighlight = new THREE.Mesh(highlightGeometry, highlightMaterial);
    leftHighlight.position.set(-0.12, 1.44, 0.52);
    robotGroup.add(leftHighlight);
    
    const rightHighlight = new THREE.Mesh(highlightGeometry, highlightMaterial);
    rightHighlight.position.set(0.18, 1.44, 0.52);
    robotGroup.add(rightHighlight);

    // 小高光点
    const smallHighlightGeometry = new THREE.SphereGeometry(0.03, 12, 12);
    const leftSmallHighlight = new THREE.Mesh(smallHighlightGeometry, highlightMaterial);
    leftSmallHighlight.position.set(-0.19, 1.4, 0.52);
    robotGroup.add(leftSmallHighlight);
    
    const rightSmallHighlight = new THREE.Mesh(smallHighlightGeometry, highlightMaterial);
    rightSmallHighlight.position.set(0.11, 1.4, 0.52);
    robotGroup.add(rightSmallHighlight);

    // 超大鼻子 - 在眼睛中间
    const noseGeometry = new THREE.SphereGeometry(0.16, 24, 24);
    noseGeometry.scale(1, 0.85, 1.2);
    const noseMaterial = new THREE.MeshToonMaterial({ 
      color: 0x3a5f8a,
      emissive: 0x2d4a6f,
      emissiveIntensity: 0.2,
      gradientMap: createToonGradient()
    });
    const nose = new THREE.Mesh(noseGeometry, noseMaterial);
    nose.position.set(0, 1.2, 0.52);
    robotGroup.add(nose);
    
    // 鼻孔
    const nostrilGeometry = new THREE.SphereGeometry(0.03, 12, 12);
    const nostrilMaterial = new THREE.MeshToonMaterial({ 
      color: 0x1a0e09,
      emissive: 0x000000,
      emissiveIntensity: 0.1
    });
    
    const leftNostril = new THREE.Mesh(nostrilGeometry, nostrilMaterial);
    leftNostril.position.set(-0.05, 1.18, 0.62);
    robotGroup.add(leftNostril);
    
    const rightNostril = new THREE.Mesh(nostrilGeometry, nostrilMaterial);
    rightNostril.position.set(0.05, 1.18, 0.62);
    robotGroup.add(rightNostril);

    // 超大嘴巴 - 更夸张的笑容
    const mouthCurve = new THREE.EllipseCurve(
      0, 0,
      0.32, 0.2,
      Math.PI * 0.05, Math.PI * 0.95,
      false,
      0
    );
    const mouthPoints = mouthCurve.getPoints(50);
    const mouthGeometry = new THREE.BufferGeometry().setFromPoints(mouthPoints);
    const mouthMaterial = new THREE.LineBasicMaterial({ 
      color: 0x2d1810, 
      linewidth: 5
    });
    const mouth = new THREE.Line(mouthGeometry, mouthMaterial);
    mouth.position.set(0, 0.98, 0.48);
    mouth.rotation.x = Math.PI;
    robotGroup.add(mouth);
    
    // 粉色舌头
    const tongueGeometry = new THREE.SphereGeometry(0.18, 20, 20);
    tongueGeometry.scale(1.2, 0.6, 0.8);
    const tongueMaterial = new THREE.MeshToonMaterial({ 
      color: 0xff6b9d,
      emissive: 0xff4081,
      emissiveIntensity: 0.2,
      gradientMap: createToonGradient()
    });
    const tongue = new THREE.Mesh(tongueGeometry, tongueMaterial);
    tongue.position.set(0, 0.92, 0.46);
    robotGroup.add(tongue);

    // 更多更大的牙齿
    const toothGeometry = new THREE.BoxGeometry(0.05, 0.08, 0.03);
    const toothMaterial = new THREE.MeshToonMaterial({ 
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 0.2,
      gradientMap: createToonGradient()
    });
    
    // 上排牙齿
    for (let i = 0; i < 8; i++) {
      const tooth = new THREE.Mesh(toothGeometry, toothMaterial);
      const angle = (i / 7) * Math.PI * 0.7 + Math.PI * 0.15;
      tooth.position.set(
        Math.cos(angle) * 0.28,
        1.02,
        0.47 + Math.sin(angle) * 0.06
      );
      tooth.rotation.y = -angle;
      robotGroup.add(tooth);
    }
    
    // 下排牙齿
    for (let i = 0; i < 6; i++) {
      const tooth = new THREE.Mesh(toothGeometry, toothMaterial);
      const angle = (i / 5) * Math.PI * 0.6 + Math.PI * 0.2;
      tooth.position.set(
        Math.cos(angle) * 0.25,
        0.88,
        0.46 + Math.sin(angle) * 0.05
      );
      tooth.rotation.y = -angle;
      robotGroup.add(tooth);
    }

    // 短粗手臂
    const armGeometry = new THREE.CapsuleGeometry(0.11, 0.35, 12, 16);
    const armMaterial = new THREE.MeshToonMaterial({ 
      color: 0x5b9bd5,
      gradientMap: createToonGradient()
    });
    
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.5, 0.5, 0);
    leftArm.rotation.z = 0.6;
    leftArm.castShadow = true;
    robotGroup.add(leftArm);
    
    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(0.5, 0.5, 0);
    rightArm.rotation.z = -0.6;
    rightArm.castShadow = true;
    robotGroup.add(rightArm);

    // 三指手掌
    const handGeometry = new THREE.SphereGeometry(0.13, 12, 12);
    const handMaterial = new THREE.MeshToonMaterial({ 
      color: 0x5b9bd5,
      gradientMap: createToonGradient()
    });
    
    const leftHand = new THREE.Mesh(handGeometry, handMaterial);
    leftHand.position.set(-0.68, 0.25, 0);
    leftHand.castShadow = true;
    robotGroup.add(leftHand);
    
    const rightHand = new THREE.Mesh(handGeometry, handMaterial);
    rightHand.position.set(0.68, 0.25, 0);
    rightHand.castShadow = true;
    robotGroup.add(rightHand);

    // 手指
    const fingerGeometry = new THREE.CapsuleGeometry(0.03, 0.08, 6, 8);
    for (let hand = 0; hand < 2; hand++) {
      const xPos = hand === 0 ? -0.68 : 0.68;
      for (let i = 0; i < 3; i++) {
        const finger = new THREE.Mesh(fingerGeometry, handMaterial);
        const angle = (i - 1) * 0.4;
        finger.position.set(
          xPos + Math.sin(angle) * 0.1 * (hand === 0 ? -1 : 1),
          0.18,
          Math.cos(angle) * 0.08
        );
        finger.rotation.z = angle * (hand === 0 ? 1 : -1);
        robotGroup.add(finger);
      }
    }

    // 短粗的腿
    const legGeometry = new THREE.CapsuleGeometry(0.13, 0.3, 12, 16);
    const legMaterial = new THREE.MeshToonMaterial({ 
      color: 0x5b9bd5,
      gradientMap: createToonGradient()
    });
    
    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.2, -0.25, 0);
    leftLeg.castShadow = true;
    robotGroup.add(leftLeg);
    
    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(0.2, -0.25, 0);
    rightLeg.castShadow = true;
    robotGroup.add(rightLeg);

    // 大脚掌
    const footGeometry = new THREE.SphereGeometry(0.15, 12, 12);
    footGeometry.scale(1.2, 0.6, 1.4);
    const footMaterial = new THREE.MeshToonMaterial({ 
      color: 0x5b9bd5,
      gradientMap: createToonGradient()
    });
    
    const leftFoot = new THREE.Mesh(footGeometry, footMaterial);
    leftFoot.position.set(-0.2, -0.55, 0.05);
    leftFoot.castShadow = true;
    robotGroup.add(leftFoot);
    
    const rightFoot = new THREE.Mesh(footGeometry, footMaterial);
    rightFoot.position.set(0.2, -0.55, 0.05);
    rightFoot.castShadow = true;
    robotGroup.add(rightFoot);

    // 脚趾
    const toeGeometry = new THREE.SphereGeometry(0.04, 8, 8);
    for (let foot = 0; foot < 2; foot++) {
      const xPos = foot === 0 ? -0.2 : 0.2;
      for (let i = 0; i < 3; i++) {
        const toe = new THREE.Mesh(toeGeometry, footMaterial);
        toe.position.set(
          xPos + (i - 1) * 0.08,
          -0.6,
          0.15
        );
        robotGroup.add(toe);
      }
    }

    // 小尾巴
    const tailGeometry = new THREE.ConeGeometry(0.08, 0.25, 12);
    const tailMaterial = new THREE.MeshToonMaterial({ 
      color: 0x5b9bd5,
      gradientMap: createToonGradient()
    });
    const tail = new THREE.Mesh(tailGeometry, tailMaterial);
    tail.position.set(0, 0.3, -0.4);
    tail.rotation.x = Math.PI / 2;
    robotGroup.add(tail);

    // 动漫风格的地面 - 更鲜艳的颜色
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.MeshToonMaterial({ 
      color: 0x66bb6a,
      gradientMap: createToonGradient()
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1;
    ground.receiveShadow = true;
    scene.add(ground);

    // 彩色网格
    const gridHelper = new THREE.GridHelper(20, 40, 0x4caf50, 0x81c784);
    gridHelper.position.y = -0.98;
    gridHelper.material.opacity = 0.5;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    // 添加漂浮的星星装饰
    const starGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const starMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffeb3b,
      transparent: true,
      opacity: 0.8
    });
    
    for (let i = 0; i < 15; i++) {
      const star = new THREE.Mesh(starGeometry, starMaterial);
      star.position.set(
        (Math.random() - 0.5) * 10,
        Math.random() * 3 + 1,
        (Math.random() - 0.5) * 10
      );
      scene.add(star);
    }

    // 添加漂浮的心形装饰
    const heartShape2 = new THREE.Shape();
    heartShape2.moveTo(0, 0);
    heartShape2.bezierCurveTo(0, -0.03, -0.05, -0.03, -0.05, 0);
    heartShape2.bezierCurveTo(-0.05, 0.02, -0.05, 0.04, 0, 0.08);
    heartShape2.bezierCurveTo(0.05, 0.04, 0.05, 0.02, 0.05, 0);
    heartShape2.bezierCurveTo(0.05, -0.03, 0, -0.03, 0, 0);
    
    const floatingHeartGeometry = new THREE.ShapeGeometry(heartShape2);
    const floatingHeartMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xff69b4,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide
    });
    
    for (let i = 0; i < 8; i++) {
      const heart = new THREE.Mesh(floatingHeartGeometry, floatingHeartMaterial);
      heart.position.set(
        (Math.random() - 0.5) * 8,
        Math.random() * 3 + 0.5,
        (Math.random() - 0.5) * 8
      );
      heart.rotation.y = Math.random() * Math.PI;
      scene.add(heart);
    }

    scene.add(robotGroup);
    
    // 放大机器人并调整位置
    robotGroup.scale.set(2.5, 2.5, 2.5); // 放大 2.5 倍
    robotGroup.position.y = 0.5; // 稍微抬高一点

    // 存储引用
    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    // 模拟加载进度
    const loadingInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(loadingInterval);
          setIsLoading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    // 动画循环 - 史迪奇风格动画
    let time = 0;
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      time += 0.01;
      
      if (robotGroup) {
        robotGroup.rotation.y += 0.006;
        robotGroup.position.y = Math.sin(time * 0.8) * 0.06;
        
        // 头部动画
        const headMesh = robotGroup.children.find(child => 
          child instanceof THREE.Mesh && 
          child.geometry instanceof THREE.SphereGeometry &&
          child.position.y > 1.2 && child.position.y < 1.4
        );
        if (headMesh) {
          headMesh.rotation.y = Math.sin(time * 1) * 0.15;
          headMesh.rotation.x = Math.sin(time * 0.7) * 0.06;
          headMesh.rotation.z = Math.sin(time * 0.5) * 0.04;
        }
        
        // 耳朵摆动
        const ears = robotGroup.children.filter(child => 
          child instanceof THREE.Mesh && 
          child.position.y > 1.7
        );
        ears.forEach((ear, index) => {
          if (ear instanceof THREE.Mesh) {
            const direction = index % 2 === 0 ? 1 : -1;
            const baseRotation = direction * 0.3;
            ear.rotation.z = baseRotation + Math.sin(time * 1.5 + index) * 0.2;
            ear.rotation.x = Math.sin(time * 1.2) * 0.1;
          }
        });
        
        // 眨眼 - 更频繁更生动
        const eyeWhites = robotGroup.children.filter(child => 
          child instanceof THREE.Mesh && 
          child.position.y > 1.3 && 
          child.position.y < 1.4 &&
          child.scale.y > 1.3
        );
        
        const blinkCycle = (time * 0.8) % 3; // 更频繁的眨眼
        if (blinkCycle < 0.12) {
          const blinkScale = 1 - (blinkCycle / 0.12) * 0.9;
          eyeWhites.forEach(eye => {
            eye.scale.y = 1.4 * blinkScale;
          });
        } else if (blinkCycle < 0.24) {
          const blinkScale = ((blinkCycle - 0.12) / 0.12) * 0.9;
          eyeWhites.forEach(eye => {
            eye.scale.y = 1.4 * (0.1 + blinkScale);
          });
        } else {
          eyeWhites.forEach(eye => {
            eye.scale.y = 1.4;
          });
        }
        
        // 瞳孔移动 - 更大幅度的移动
        const pupils = robotGroup.children.filter(child => 
          child instanceof THREE.Mesh && 
          child.position.y > 1.35 && 
          child.position.y < 1.4 &&
          child.position.z > 0.48
        );
        pupils.forEach((pupil, index) => {
          const baseX = index === 0 ? -0.15 : 0.15;
          pupil.position.x = baseX + Math.sin(time * 0.5) * 0.04;
          pupil.position.y = 1.37 + Math.cos(time * 0.7) * 0.025;
        });
        
        // 鼻子呼吸动画
        const nose = robotGroup.children.find(child => 
          child instanceof THREE.Mesh && 
          child.position.y > 1.15 && 
          child.position.y < 1.25 &&
          child.position.z > 0.5
        );
        if (nose instanceof THREE.Mesh) {
          nose.scale.setScalar(1 + Math.sin(time * 2.5) * 0.05);
        }
        
        // 舌头动画
        const tongue = robotGroup.children.find(child => 
          child instanceof THREE.Mesh && 
          child.position.y > 0.9 && 
          child.position.y < 0.95 &&
          child.position.z > 0.45
        );
        if (tongue instanceof THREE.Mesh) {
          tongue.position.y = 0.92 + Math.sin(time * 1.5) * 0.02;
          tongue.scale.x = 1.2 + Math.sin(time * 2) * 0.05;
        }
        
        // 手臂摆动
        const arms = robotGroup.children.filter(child => 
          child instanceof THREE.Mesh && 
          child.position.y > 0.45 && 
          child.position.y < 0.55 &&
          Math.abs(child.position.x) > 0.45
        );
        arms.forEach((arm, index) => {
          const direction = index === 0 ? 1 : -1;
          arm.rotation.z = direction * (0.6 + Math.sin(time * 1.3 + index) * 0.2);
          arm.rotation.x = Math.sin(time * 1.1) * 0.1;
        });
        
        // 尾巴摆动
        const tail = robotGroup.children.find(child => 
          child instanceof THREE.Mesh && 
          child.geometry instanceof THREE.ConeGeometry &&
          child.position.z < 0
        );
        if (tail instanceof THREE.Mesh) {
          tail.rotation.y = Math.sin(time * 2) * 0.4;
          tail.rotation.z = Math.sin(time * 1.8) * 0.2;
        }
      }
      
      renderer.render(scene, camera);
    };
    animate();

    // 处理窗口大小变化
    const handleResize = () => {
      if (!canvasRef.current || !camera || !renderer || !container) return;
      
      const { width, height } = getContainerSize();
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    
    // 使用ResizeObserver监听容器大小变化
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (renderer) {
        renderer.dispose();
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl animate-slideUp w-full h-full max-w-6xl max-h-[95vh] flex flex-col overflow-hidden">
        <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-lg sm:text-xl">🤖</span>
            </div>
            <h2 className="text-base sm:text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AI 虚拟助手
            </h2>
          </div>
          <Button 
            onClick={onClose} 
            className="hover:bg-red-50 border-red-200 text-red-600 hover:text-red-700 hover:border-red-300 transition-all duration-200" 
            size="small"
          >
            关闭
          </Button>
        </div>
        
        <div className="flex-1 relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden">
          <canvas 
            ref={canvasRef} 
            className="w-full h-full block"
            style={{ background: 'linear-gradient(to bottom, #87CEEB 0%, #98FB98 100%)' }}
          />
          
          {isLoading && (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-blue-900 bg-opacity-95 flex items-center justify-center backdrop-blur-sm">
              <div className="text-center text-white max-w-sm px-4">
                <div className="text-5xl sm:text-6xl mb-6 animate-bounce">🤖</div>
                <div className="text-xl sm:text-2xl font-bold mb-4 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                  正在初始化 AI 助手...
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3 mb-3 overflow-hidden shadow-inner">
                  <div 
                    className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300 shadow-lg"
                    style={{ width: `${loadingProgress}%` }}
                  >
                    <div className="w-full h-full bg-white opacity-30 animate-pulse"></div>
                  </div>
                </div>
                <div className="text-base sm:text-lg font-semibold text-blue-200">{loadingProgress}%</div>
                <div className="mt-4 text-xs sm:text-sm text-gray-300">加载 3D 引擎和 AI 模型...</div>
              </div>
            </div>
          )}
          
          {!isLoading && (
            <div className="absolute bottom-2 sm:bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-lg px-3 sm:px-4">
              <div className="bg-white bg-opacity-95 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-2xl border border-gray-200">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-xl sm:text-2xl">🤖</span>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-800">AI 3D 机器人</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
                        <span className="text-xs text-gray-500 font-medium">在线服务中</span>
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:block text-2xl animate-bounce">👋</div>
                </div>
                
                <p className="text-gray-600 mb-4 text-xs sm:text-sm leading-relaxed">
                  你好！我是你的智能学习助手，随时准备帮助你解答问题、提供建议。
                </p>
                
                <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3">
                  <button 
                    className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-xs sm:text-sm font-medium flex items-center justify-center space-x-2"
                    onClick={() => {/* 开始对话逻辑 */}}
                  >
                    <span className="text-base sm:text-lg">💬</span>
                    <span>开始对话</span>
                  </button>
                  <button 
                    className="group bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-xs sm:text-sm font-medium flex items-center justify-center space-x-2"
                    onClick={() => {/* 自定义外观逻辑 */}}
                  >
                    <span className="text-base sm:text-lg">🎨</span>
                    <span>自定义外观</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <button 
                    className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-xs sm:text-sm font-medium flex items-center justify-center space-x-2"
                    onClick={() => {/* 学习建议逻辑 */}}
                  >
                    <span className="text-base sm:text-lg">📚</span>
                    <span>学习建议</span>
                  </button>
                  <button 
                    className="group bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-xs sm:text-sm font-medium flex items-center justify-center space-x-2"
                    onClick={() => {/* 代码助手逻辑 */}}
                  >
                    <span className="text-base sm:text-lg">💻</span>
                    <span>代码助手</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

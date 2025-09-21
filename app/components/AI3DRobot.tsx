'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'antd';
import * as THREE from 'three';

// 原创AI 3D机器人组件
export default function AI3DRobot({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const animationIdRef = useRef<number>();
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

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
    scene.background = new THREE.Color(0x87CEEB); // 天蓝色背景
    
    const camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    );
    camera.position.set(0, 1.6, 3);

    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      antialias: true,
      alpha: false
    });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 添加光照
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // 创建简单的机器人模型
    const robotGroup = new THREE.Group();

    // 机器人身体
    const bodyGeometry = new THREE.CylinderGeometry(0.3, 0.4, 1.2, 8);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x8B5CF6 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.6;
    body.castShadow = true;
    robotGroup.add(body);

    // 机器人头部
    const headGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const headMaterial = new THREE.MeshPhongMaterial({ color: 0x8B5CF6 });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.4;
    head.castShadow = true;
    robotGroup.add(head);

    // 机器人眼睛
    const eyeGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const eyeMaterial = new THREE.MeshPhongMaterial({ color: 0x00BFFF });
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.1, 1.45, 0.25);
    robotGroup.add(leftEye);
    
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.1, 1.45, 0.25);
    robotGroup.add(rightEye);

    // 机器人手臂
    const armGeometry = new THREE.CylinderGeometry(0.08, 0.1, 0.8, 8);
    const armMaterial = new THREE.MeshPhongMaterial({ color: 0x8B5CF6 });
    
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.5, 0.8, 0);
    leftArm.rotation.z = 0.3;
    leftArm.castShadow = true;
    robotGroup.add(leftArm);
    
    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(0.5, 0.8, 0);
    rightArm.rotation.z = -0.3;
    rightArm.castShadow = true;
    robotGroup.add(rightArm);

    // 机器人腿部
    const legGeometry = new THREE.CylinderGeometry(0.1, 0.12, 0.8, 8);
    const legMaterial = new THREE.MeshPhongMaterial({ color: 0x8B5CF6 });
    
    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.2, -0.4, 0);
    leftLeg.castShadow = true;
    robotGroup.add(leftLeg);
    
    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(0.2, -0.4, 0);
    rightLeg.castShadow = true;
    robotGroup.add(rightLeg);

    // 添加地面
    const groundGeometry = new THREE.PlaneGeometry(10, 10);
    const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x90EE90 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1;
    ground.receiveShadow = true;
    scene.add(ground);

    scene.add(robotGroup);

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

    // 动画循环
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      // 机器人轻微摆动
      if (robotGroup) {
        robotGroup.rotation.y += 0.01;
        head.rotation.y = Math.sin(Date.now() * 0.002) * 0.1;
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
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-2xl animate-slideUp w-full h-full max-w-6xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-bold">AI虚拟角色</h2>
          <Button onClick={onClose} className="hover:bg-red-50" size="small">关闭</Button>
        </div>
        
        <div className="flex-1 relative bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden">
          <canvas 
            ref={canvasRef} 
            className="w-full h-full block"
            style={{ background: 'linear-gradient(to bottom, #87CEEB, #98FB98)' }}
          />
          
          {isLoading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-2xl mb-4">🤖</div>
                <div className="text-lg mb-2">正在初始化3D引擎...</div>
                <div className="w-64 bg-gray-300 rounded-full h-2 mb-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${loadingProgress}%` }}
                  ></div>
                </div>
                <div className="text-sm">{loadingProgress}%</div>
              </div>
            </div>
          )}
          
          {!isLoading && (
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-md px-2 sm:px-0">
              <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg p-3 sm:p-4 shadow-lg">
                <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3 text-gray-800">Ai 3D机器人</h3>
                <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm">智能对话助手已就绪</p>
                
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 sm:px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 text-xs sm:text-sm">
                    💬 开始对话
                  </button>
                  <button className="bg-purple-500 hover:bg-purple-600 text-white px-2 sm:px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 text-xs sm:text-sm">
                    🎨 自定义外观
                  </button>
                </div>
                
                <div className="mt-2 sm:mt-3 flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-500">在线状态</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

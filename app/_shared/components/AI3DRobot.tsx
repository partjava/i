'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button, Input } from 'antd';
import { SendOutlined, CloseOutlined } from '@ant-design/icons';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const vscDarkPlus = require('react-syntax-highlighter/dist/styles/vs2015').default || require('react-syntax-highlighter/dist/styles/vs2015');
import remarkGfm from 'remark-gfm';
import { buildSpaceCapsuleRoom } from './SpaceCapsuleRoom3D';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

type CatPosture = 'standing' | 'crouching' | 'custom';

export default function AI3DRobot({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number>();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 3D 引用：挂载点与两种形态缓存
  const robotAnchorRef = useRef<THREE.Group>();
  const virtualPropsRef = useRef<THREE.Group>();
  const modelsCacheRef = useRef<{
    standing?: THREE.Group;
    crouching?: THREE.Group;
    custom?: THREE.Group;
  }>({});
  const bounceTimeRef = useRef<number>(0);

  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [posture, setPosture] = useState<CatPosture>('standing');
  const [showVirtualProps, setShowVirtualProps] = useState(true);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '你好！我是袋子，欢迎来到 PartJava 温暖书房！你可以点击下方按钮切换我的「站立 / 爬起」形态，或者直接向我提问哦~ 🐾',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // 自动滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 提示横幅
  const notifyError = useCallback((msg: string) => {
    setErrorBanner(msg);
    setTimeout(() => {
      setErrorBanner(null);
    }, 4500);
  }, []);

  // 归一化并接地 GLB 模型到书房地毯中央
  const prepareFittedModel = useCallback((modelScene: THREE.Object3D): THREE.Group => {
    const wrapper = new THREE.Group();
    wrapper.add(modelScene);

    const bb = new THREE.Box3().setFromObject(modelScene);
    const size = bb.getSize(new THREE.Vector3());
    const center = bb.getCenter(new THREE.Vector3());

    if (size.y > 0) {
      const s = Math.min(2.2 / size.y, 2.3 / Math.max(size.x, size.z));
      modelScene.scale.setScalar(s);
      modelScene.position.set(-center.x * s, -bb.min.y * s, -center.z * s);
    }

    modelScene.traverse((o: any) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });

    return wrapper;
  }, []);

  // 切换书房中央展示的模型形态
  const activatePostureModel = useCallback((targetPosture: CatPosture) => {
    const anchor = robotAnchorRef.current;
    if (!anchor) return;

    const targetModel = modelsCacheRef.current[targetPosture];
    if (!targetModel) return;

    while (anchor.children.length > 0) {
      anchor.remove(anchor.children[0]);
    }
    anchor.add(targetModel);
    bounceTimeRef.current = 1.0; // 触发轻盈切换弹跳动画
    setPosture(targetPosture);
  }, []);

  // 切换虚实结合科技配饰显示状态
  const toggleVirtualProps = () => {
    const next = !showVirtualProps;
    setShowVirtualProps(next);
    if (virtualPropsRef.current) {
      virtualPropsRef.current.visible = next;
    }
  };

  // AI回复函数
  const getAIResponse = async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error('AI服务响应失败');
      }

      const data = await response.json();
      return data.reply || data.answer || '抱歉，我现在有点累了，稍后再聊吧~';
    } catch (error) {
      console.error('AI对话失败:', error);
      return getPresetResponse(userMessage);
    }
  };

  // 预设回复
  const getPresetResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();

    if (msg.includes('你好') || msg.includes('hi') || msg.includes('hello')) {
      return '你好呀！我是袋子，很高兴在温暖书房见到你！有什么我可以帮助你的吗？🐾';
    }
    if (msg.includes('学习') || msg.includes('怎么学')) {
      return '学习编程最重要的是多练习！建议你从基础开始，每天坚持写代码，遇到问题多思考。我可以帮你解答具体的技术问题哦！💪';
    }
    if (msg.includes('笔记')) {
      return '做笔记是个好习惯！你可以在"笔记"页面创建新笔记，记录学习心得。支持Markdown格式，还能设置公开/私密哦！📝';
    }
    if (msg.includes('挑战') || msg.includes('练习')) {
      return '想提升编程能力？去"挑战"页面试试吧！那里有各种难度的编程题目，还有排行榜系统，快来挑战自己吧！🏆';
    }
    if (msg.includes('代码') || msg.includes('编辑器')) {
      return '我们有在线代码编辑器！支持多种编程语言，可以实时运行和测试代码。去"代码"页面试试吧！💻';
    }
    if (msg.includes('谢谢') || msg.includes('感谢')) {
      return '不客气！能帮到你我很开心！有其他问题随时问我哦~😄';
    }
    if (msg.includes('再见') || msg.includes('拜拜')) {
      return '再见！记得常来书房找我玩哦！祝你学习愉快！👋';
    }

    return '嗯嗯，我明白了！你还想了解什么呢？我可以帮你解答学习、笔记、挑战等方面的问题哦！🤔';
  };

  // 发送消息
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // 提问时触发猫咪姿态互动
    const nextForm: CatPosture = posture === 'standing' ? 'crouching' : 'standing';
    if (modelsCacheRef.current[nextForm]) {
      activatePostureModel(nextForm);
    }

    setTimeout(async () => {
      const aiResponse = await getAIResponse(userMessage.text);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 800);
  };

  // 快捷回复
  const handleQuickReply = (text: string) => {
    setShowChat(true);
    setInputValue(text);
    setTimeout(async () => {
      const userMessage: Message = {
        id: Date.now().toString(),
        text,
        sender: 'user',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);
      setInputValue('');
      setIsTyping(true);

      const aiResponse = await getAIResponse(text);
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: aiResponse,
          sender: 'ai',
          timestamp: new Date()
        }
      ]);
      setIsTyping(false);
    }, 100);
  };

  // 支持拖入自定义 GLB 文件预览
  const handleDropGLB = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const file = e.dataTransfer.files?.[0];
    if (!file || !/\.glb$/i.test(file.name)) {
      notifyError('请拖入 .glb 模型文件');
      return;
    }

    const url = URL.createObjectURL(file);
    const loader = new GLTFLoader();
    loader.load(
      url,
      gltf => {
        const fitted = prepareFittedModel(gltf.scene);
        modelsCacheRef.current.custom = fitted;
        activatePostureModel('custom');
        URL.revokeObjectURL(url);
      },
      undefined,
      () => {
        notifyError('GLB 无法读取，请检查文件是否完整。');
        URL.revokeObjectURL(url);
      }
    );
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    const container = canvasRef.current.parentElement;
    if (!container) return;

    const getContainerSize = () => {
      const rect = container.getBoundingClientRect();
      return {
        width: Math.max(rect.width, 300),
        height: Math.max(rect.height, 300)
      };
    };

    const { width, height } = getContainerSize();

    // ==========================================
    // 1. 场景、相机与写实渲染器初始化
    // ==========================================
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      width < 760 ? 45 : 34,
      width / height,
      0.1,
      80
    );
    camera.position.set(0, 3.08, 12.2);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height, false);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const orbit = new OrbitControls(camera, renderer.domElement);
    orbit.target.set(0, 1.55, -2.0);
    orbit.enableDamping = true;
    orbit.dampingFactor = 0.045;
    orbit.enablePan = false;
    orbit.minDistance = 8.2;
    orbit.maxDistance = 14.2;
    orbit.minPolarAngle = 1.02;
    orbit.maxPolarAngle = 1.44;
    orbit.minAzimuthAngle = -0.26;
    orbit.maxAzimuthAngle = 0.26;
    orbit.update();

    // 构建「PartJava · 温暖书房」与虚实结合动态配饰
    const warmStudyRoom = buildSpaceCapsuleRoom(scene);
    robotAnchorRef.current = warmStudyRoom.robotAnchor;
    virtualPropsRef.current = warmStudyRoom.virtualPropsGroup;
    (window as any).robotAnchor = warmStudyRoom.robotAnchor;

    // 加载两个形态的猫咪 GLB 模型：
    // 1) /models/cat-standing.glb (black plush cat 3d model.glb - 站立形态)
    // 2) /models/cat-crouching.glb (fluffy black cat 3d model.glb - 爬起形态)
    const loader = new GLTFLoader();
    let standingLoaded = false;
    let crouchingLoaded = false;

    const updateProgress = (prog: number) => {
      setLoadingProgress(prev => Math.max(prev, Math.min(99, Math.round(prog))));
    };

    loader.load(
      '/models/cat-standing.glb',
      gltf => {
        const fitted = prepareFittedModel(gltf.scene);
        modelsCacheRef.current.standing = fitted;
        standingLoaded = true;
        activatePostureModel('standing');
        setLoadingProgress(100);
        setIsLoading(false);
      },
      xhr => {
        if (xhr.total > 0) {
          updateProgress((xhr.loaded / xhr.total) * 85);
        }
      },
      err => {
        console.error('加载站立形态 GLB 失败:', err);
        setIsLoading(false);
      }
    );

    loader.load(
      '/models/cat-crouching.glb',
      gltf => {
        const fitted = prepareFittedModel(gltf.scene);
        modelsCacheRef.current.crouching = fitted;
        crouchingLoaded = true;
        if (!standingLoaded) {
          activatePostureModel('crouching');
          setLoadingProgress(100);
          setIsLoading(false);
        }
      },
      undefined,
      err => {
        console.error('加载爬起形态 GLB 失败:', err);
      }
    );

    // 暴露全局 URL 加载接口兼容原脚本
    (window as any).loadRobotFromURL = (url: string) => {
      loader.load(
        url,
        g => {
          const fitted = prepareFittedModel(g.scene);
          modelsCacheRef.current.custom = fitted;
          activatePostureModel('custom');
        },
        undefined,
        console.error
      );
    };

    // 动画循环：自然呼吸、微幅摆动与姿态切换弹跳
    let time = 0;
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      time += 0.016;

      orbit.update();
      warmStudyRoom.update(time);

      if (warmStudyRoom.robotAnchor) {
        // 姿态切换时的轻盈弹跳衰减
        let jumpOffset = 0;
        if (bounceTimeRef.current > 0) {
          bounceTimeRef.current = Math.max(0, bounceTimeRef.current - 0.045);
          jumpOffset = Math.sin(bounceTimeRef.current * Math.PI) * 0.22;
        }

        // 正面朝向镜头，仅做极其自然的微幅呼吸与左右轻轻摇头，绝不转到背面
        warmStudyRoom.robotAnchor.position.y = 0.016 + Math.sin(time * 2.1) * 0.018 + jumpOffset;
        warmStudyRoom.robotAnchor.rotation.y = Math.sin(time * 0.75) * 0.12;
      }

      renderer.render(scene, camera);
    };
    animate();

    // 响应式窗口适配
    const handleResize = () => {
      if (!canvasRef.current || !container) return;
      const { width: w, height: h } = getContainerSize();
      camera.aspect = w / h;
      camera.fov = w < 760 ? 45 : 34;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };

    window.addEventListener('resize', handleResize);
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      orbit.dispose();
      renderer.dispose();
    };
  }, [activatePostureModel, prepareFittedModel]);

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div
        className="bg-[#1c1a17] rounded-2xl shadow-2xl animate-slideUp w-full h-full max-w-6xl max-h-[95vh] flex flex-col overflow-hidden border border-[#d4a36a]/25"
        onDragOver={e => {
          e.preventDefault();
          setIsDraggingOver(true);
        }}
        onDragLeave={e => {
          if (!e.relatedTarget) setIsDraggingOver(false);
        }}
        onDrop={handleDropGLB}
      >
        {/* 顶部标题栏与姿态切换控制栏 */}
        <div className="flex flex-wrap justify-between items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 border-b border-[#d4a36a]/20 bg-[#221f1b]/95 text-[#f4eadc] z-10">
          <div className="flex items-center space-x-3">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#d4a36a] shadow-[0_0_8px_rgba(212,163,106,0.8)]" />
            <span className="font-serif font-semibold tracking-[0.18em] text-sm sm:text-base text-[#f7efe4]">
              PartJava · 温暖书房
            </span>
            <span className="hidden md:inline-block text-[11px] font-serif tracking-[0.15em] text-[#e9dac3]/75">
              A PLACE TO LEARN · A PLACE TO CREATE
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {/* 双形态切换按钮组 */}
            <div className="flex items-center bg-[#141210] p-0.5 rounded-lg border border-[#d4a36a]/25">
              <button
                onClick={() => activatePostureModel('standing')}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  posture === 'standing'
                    ? 'bg-[#d4a36a] text-[#1c1a17] shadow-sm font-semibold'
                    : 'text-[#e9dac3]/80 hover:text-white'
                }`}
              >
                🐱 站立形态
              </button>
              <button
                onClick={() => activatePostureModel('crouching')}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  posture === 'crouching'
                    ? 'bg-[#d4a36a] text-[#1c1a17] shadow-sm font-semibold'
                    : 'text-[#e9dac3]/80 hover:text-white'
                }`}
              >
                🐾 爬起形态
              </button>
            </div>

            {/* 虚实配饰切换按钮 */}
            <button
              onClick={toggleVirtualProps}
              className={`hidden sm:inline-flex items-center px-2.5 py-1 rounded-lg text-xs border transition-all ${
                showVirtualProps
                  ? 'bg-[#56b6c2]/20 border-[#56b6c2]/50 text-[#a8e4ec]'
                  : 'bg-[#141210] border-white/10 text-[#e9dac3]/60'
              }`}
              title="切换全息看板、水冷主机与能量光环配饰"
            >
              ✨ 虚实配饰
            </button>

            <Button
              onClick={onClose}
              size="small"
              className="bg-[#302422] hover:bg-[#462d2a] border-[#d68273]/40 text-[#fcebe8]"
            >
              关闭
            </Button>
          </div>
        </div>

        {/* 3D 书房主视口 */}
        <div className="flex-1 relative bg-[#1c1a17] overflow-hidden">
          <canvas
            ref={canvasRef}
            className={`w-full h-full block transition-all duration-500 ${
              showChat ? 'opacity-35 blur-[2px] scale-[0.98]' : 'opacity-100'
            }`}
          />

          {/* 电影感柔光暗角，不遮挡中心视觉 */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(14, 13, 12, 0.36) 0%, rgba(14, 13, 12, 0.06) 18%, transparent 32%, transparent 78%, rgba(12, 11, 10, 0.45) 100%), radial-gradient(ellipse at 50% 52%, transparent 48%, rgba(10, 9, 8, 0.34) 100%)'
            }}
          />

          {/* GLB 拖拽上传覆盖层 */}
          {isDraggingOver && (
            <div className="absolute inset-5 z-20 border-2 border-dashed border-[#ddb982]/80 rounded-2xl grid place-items-center text-[#f7efe4] bg-[#141210]/70 backdrop-blur-md text-base sm:text-lg tracking-wider">
              释放鼠标，将 GLB 模型放入书房中央展示区
            </div>
          )}

          {/* 错误提示条 */}
          {errorBanner && (
            <div className="absolute top-5 left-1/2 -translate-x-1/2 z-20 bg-[#301816]/90 border border-[#d68273]/40 backdrop-blur-md text-[#fcebe8] px-5 py-2.5 rounded-xl text-xs tracking-wide shadow-xl">
              {errorBanner}
            </div>
          )}

          {/* 加载进度覆盖层 */}
          {isLoading && (
            <div className="absolute inset-0 bg-[#1c1a17]/90 flex items-center justify-center backdrop-blur-sm z-20">
              <div className="text-center text-[#f4eadc] max-w-sm px-4">
                <div className="text-5xl mb-5 animate-bounce">🐱</div>
                <div className="text-lg sm:text-xl font-serif font-semibold mb-4 tracking-wider text-[#f7efe4]">
                  正在布置温暖书房与 3D 模型...
                </div>
                <div className="w-64 bg-[#2c2723] rounded-full h-2.5 mb-3 overflow-hidden border border-[#d4a36a]/30 mx-auto">
                  <div
                    className="bg-gradient-to-r from-[#b8935c] to-[#e5c07b] h-full rounded-full transition-all duration-300"
                    style={{ width: `${loadingProgress}%` }}
                  />
                </div>
                <div className="text-sm font-mono text-[#d4a36a]">{loadingProgress}%</div>
              </div>
            </div>
          )}

          {/* 底部轻量悬浮交互栏（紧凑半透明设计，完全不遮挡地毯中央的 3D 猫咪模型） */}
          {!isLoading && !showChat && (
            <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 w-full max-w-xl px-3 sm:px-4 z-10">
              <div className="bg-[#1a1714]/82 backdrop-blur-md rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 shadow-2xl border border-[#d4a36a]/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() =>
                      activatePostureModel(posture === 'standing' ? 'crouching' : 'standing')
                    }
                    className="w-10 h-10 bg-gradient-to-br from-[#d4a36a] to-[#9c7142] rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform flex-shrink-0"
                    title="点击切换猫咪站立/爬起形态"
                  >
                    <span className="text-xl">{posture === 'standing' ? '🐱' : '🐾'}</span>
                  </button>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm sm:text-base font-bold text-[#f7efe4]">
                        袋子 · 3D 书房伴侣
                      </h3>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] bg-[#d4a36a]/20 text-[#e9dac3] border border-[#d4a36a]/30">
                        {posture === 'standing'
                          ? '站立形态'
                          : posture === 'crouching'
                          ? '爬起形态'
                          : '自定义模型'}
                      </span>
                    </div>
                    <p className="text-xs text-[#e9dac3]/75 mt-0.5">
                      拖拽画面可环视书房 · 点击头像切换姿态 · 支持直接拖入 .glb 预览
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => setShowChat(true)}
                    className="flex-1 sm:flex-initial bg-gradient-to-r from-[#d4a36a] to-[#b8894e] hover:from-[#dfb076] hover:to-[#c69658] text-[#1c1a17] px-4 py-2 rounded-xl transition-all duration-200 font-semibold text-xs sm:text-sm shadow-md whitespace-nowrap"
                  >
                    💬 开始对话
                  </button>
                  <button
                    onClick={() => handleQuickReply('我想学习编程，有什么建议吗？')}
                    className="flex-1 sm:flex-initial bg-[#2c2723] hover:bg-[#3a332d] text-[#f4eadc] border border-[#d4a36a]/35 px-3.5 py-2 rounded-xl transition-all duration-200 text-xs sm:text-sm whitespace-nowrap"
                  >
                    📚 学习建议
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 聊天抽屉窗口 */}
          {!isLoading && showChat && (
            <div className="absolute inset-3 sm:inset-6 flex items-center justify-center z-20">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 flex flex-col w-full h-full max-w-4xl">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-amber-50 to-orange-50 rounded-t-2xl flex-shrink-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#d4a36a] to-[#8d5b44] rounded-full flex items-center justify-center shadow-md">
                      <span className="text-white text-xl">🐱</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-800">袋子 AI助手 · 温暖书房</h3>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-gray-500">在线 · 智能对话中</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    size="small"
                    onClick={() => setShowChat(false)}
                    className="text-gray-600 hover:text-gray-900 hover:bg-amber-100/60"
                  >
                    <CloseOutlined /> 返回 3D 书房
                  </Button>
                </div>

                {/* 消息列表 */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-gray-50/90">
                  {messages.map(msg => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                    >
                      {msg.sender === 'ai' && (
                        <div className="w-8 h-8 bg-gradient-to-br from-[#d4a36a] to-[#8d5b44] rounded-full flex items-center justify-center mr-2 flex-shrink-0 shadow-md">
                          <span className="text-white text-sm">🐱</span>
                        </div>
                      )}
                      <div
                        className={`max-w-[85%] px-4 py-3 rounded-2xl shadow-sm ${
                          msg.sender === 'user'
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                            : 'bg-white text-gray-800 border border-gray-200'
                        }`}
                      >
                        {msg.sender === 'user' ? (
                          <p className="text-sm whitespace-pre-wrap break-words">{msg.text}</p>
                        ) : (
                          <div className="text-sm prose prose-sm max-w-none">
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              components={{
                                code({ className, children, ...props }: any) {
                                  const match = /language-(\w+)/.exec(className || '');
                                  const isInline = !match;

                                  return !isInline && match ? (
                                    <div className="my-2 rounded-lg overflow-hidden">
                                      <SyntaxHighlighter
                                        style={vscDarkPlus}
                                        language={match[1]}
                                        PreTag="div"
                                        customStyle={{
                                          margin: 0,
                                          borderRadius: '0.5rem',
                                          background: '#1e1e1e',
                                          padding: '1rem',
                                          fontSize: '13px',
                                          lineHeight: '1.6'
                                        }}
                                        {...props}
                                      >
                                        {String(children).replace(/\n$/, '')}
                                      </SyntaxHighlighter>
                                    </div>
                                  ) : (
                                    <code className="bg-gray-200 px-1.5 py-0.5 rounded text-xs font-mono text-red-600" {...props}>
                                      {children}
                                    </code>
                                  );
                                }
                              }}
                            >
                              {msg.text}
                            </ReactMarkdown>
                          </div>
                        )}
                        <span className={`text-xs opacity-70 mt-1 block ${msg.sender === 'user' ? 'text-white' : 'text-gray-500'}`}>
                          {msg.timestamp.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 px-4 py-2 rounded-2xl">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* 快捷回复 */}
                <div className="px-4 sm:px-6 py-3 border-t border-gray-200 bg-white flex-shrink-0">
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    <button
                      onClick={() => handleQuickReply('如何学习编程？')}
                      className="px-4 py-2 text-xs bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 whitespace-nowrap transition-all hover:shadow-md flex-shrink-0"
                    >
                      💡 如何学习编程？
                    </button>
                    <button
                      onClick={() => handleQuickReply('推荐学习资源')}
                      className="px-4 py-2 text-xs bg-purple-50 text-purple-600 rounded-full hover:bg-purple-100 whitespace-nowrap transition-all hover:shadow-md flex-shrink-0"
                    >
                      📚 推荐学习资源
                    </button>
                    <button
                      onClick={() => handleQuickReply('代码编辑器怎么用？')}
                      className="px-4 py-2 text-xs bg-green-50 text-green-600 rounded-full hover:bg-green-100 whitespace-nowrap transition-all hover:shadow-md flex-shrink-0"
                    >
                      💻 代码编辑器
                    </button>
                    <button
                      onClick={() => handleQuickReply('如何做笔记？')}
                      className="px-4 py-2 text-xs bg-orange-50 text-orange-600 rounded-full hover:bg-orange-100 whitespace-nowrap transition-all hover:shadow-md flex-shrink-0"
                    >
                      📝 如何做笔记
                    </button>
                  </div>
                </div>

                {/* 输入框 */}
                <div className="px-4 sm:px-6 py-4 border-t border-gray-200 bg-white rounded-b-2xl flex-shrink-0">
                  <div className="flex items-center space-x-3">
                    <Input
                      value={inputValue}
                      onChange={e => setInputValue(e.target.value)}
                      onPressEnter={handleSendMessage}
                      placeholder="输入消息，按回车发送..."
                      disabled={isTyping}
                      className="flex-1 rounded-full"
                      size="large"
                    />
                    <Button
                      type="primary"
                      icon={<SendOutlined />}
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isTyping}
                      size="large"
                      className="bg-gradient-to-r from-[#d4a36a] to-[#8d5b44] border-0 rounded-full px-6 hover:shadow-lg"
                    >
                      发送
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

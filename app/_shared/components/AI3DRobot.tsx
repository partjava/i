'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import { SendOutlined } from '@ant-design/icons';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const vscDarkPlus =
  require('react-syntax-highlighter/dist/styles/vs2015').default ||
  require('react-syntax-highlighter/dist/styles/vs2015');
import remarkGfm from 'remark-gfm';
import { buildSpaceCapsuleRoom } from './SpaceCapsuleRoom3D';
import {
  SITTING_CAT_PROFILE,
  UPRIGHT_CAT_PROFILE,
  CatFaceTuning
} from './cat/catProfiles';
import {
  buildRiggedCatFromGLB,
  RiggedCatController
} from './cat/catShaderAndRig';
import NotePreviewModal from './ai/NotePreviewModal';
import styles from './AI3DRobot.module.css';

interface SiteLinkItem {
  category: string;
  subject: string;
  name: string;
  href: string;
}

interface CitationItem {
  index: number;
  title: string;
  url: string;
  domain: string;
  snippet: string;
}

interface NoteDraftItem {
  title: string;
  content: string;
  category: string;
  technology: string;
  subcategory: string;
  tags: string[];
  isPublic: boolean;
}

interface AgentStepItem {
  phase: 'plan' | 'act' | 'observe';
  tool?: string;
  label: string;
  detail?: string;
  status?: 'running' | 'done';
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  siteLinks?: SiteLinkItem[];
  citations?: CitationItem[];
  noteDraft?: NoteDraftItem;
  activeAgents?: string[];
  modelUsed?: string;
  agentSteps?: AgentStepItem[];
  offline?: boolean;
}

type CatPosture = 'standing' | 'crouching' | 'custom';
type BubbleSide = 'right' | 'left';

// 采集当前背后打开页面的正文上下文（供站内伴读与笔记提炼使用）
function collectCurrentPageContext(): { pathname: string; contextText: string } {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return { pathname: '', contextText: '' };
  }
  const pathname = window.location.pathname;
  const h = document.querySelector('main h1, main h2, h1');
  const title = h?.textContent?.trim() || document.title || '';
  const mainEl = document.querySelector('main');
  const rawText = mainEl?.textContent || '';
  const cleaned = rawText.replace(/\s{3,}/g, '\n').trim();
  const body =
    cleaned.length > 6000
      ? cleaned.slice(0, 6000) + '\n...(内容过长已截断)'
      : cleaned;
  if (!title && !body) {
    return { pathname, contextText: '' };
  }
  return {
    pathname,
    contextText: `[当前学习页面]\n标题: ${title}\n路径: ${pathname}\n\n页面内容:\n${body}`
  };
}

export default function AI3DRobot({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const bubbleBoxRef = useRef<HTMLDivElement>(null);
  const animationIdRef = useRef<number>();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // SVG 嘴巴放射线 DOM 引用（60FPS 零延迟实时更新坐标）
  const mouthDotRef = useRef<SVGCircleElement>(null);
  const mouthPulseRef = useRef<SVGCircleElement>(null);
  const calloutPathRef = useRef<SVGPathElement>(null);
  const calloutGlowPathRef = useRef<SVGPathElement>(null);
  const bubbleAnchorDotRef = useRef<SVGCircleElement>(null);
  const bubbleSideRef = useRef<BubbleSide>('right');

  // 3D 挂载点与装配好的双形态灵动黑猫控制器缓存
  const robotAnchorRef = useRef<THREE.Group>();
  const virtualPropsRef = useRef<THREE.Group>();
  const riggedCatsRef = useRef<{
    standing?: RiggedCatController;
    crouching?: RiggedCatController;
    custom?: RiggedCatController;
  }>({});
  const activeCatRef = useRef<RiggedCatController | undefined>();
  const mouseNDCRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [posture, setPosture] = useState<CatPosture>('standing');
  const [showVirtualProps, setShowVirtualProps] = useState(true);
  const [showTuningPanel, setShowTuningPanel] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('study-room-visibility', { detail: true }));
    return () => { window.dispatchEvent(new CustomEvent('study-room-visibility', { detail: false })); };
  }, []);

  const [rimStrength, setRimStrength] = useState(1.45);
  const [whiteTipStrength, setWhiteTipStrength] = useState(1.0);
  const [showFurTufts, setShowFurTufts] = useState(true);
  const [faceTuning, setFaceTuning] = useState<CatFaceTuning>(
    SITTING_CAT_PROFILE.face
  );
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);

  // 3D 嘴巴放射气泡与工具能力状态
  const [bubbleSide, setBubbleSide] = useState<BubbleSide>('right');
  const [showBubble, setShowBubble] = useState(true);
  const [showHistoryMode, setShowHistoryMode] = useState(false);
  const [enableWebSearch, setEnableWebSearch] = useState(false);
  const [searchStatusText, setSearchStatusText] = useState<string | null>(null);
  const [currentModelName, setCurrentModelName] = useState('deepseek-flash');

  // 笔记预览弹窗状态（复用 NotePreviewModal）
  const [previewNote, setPreviewNote] = useState<any>(null);
  const [showNotePreview, setShowNotePreview] = useState(false);
  const [savingNote, setSavingNote] = useState(false);
  const [savedNoteTip, setSavedNoteTip] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      text: '我是袋子，陪你一起学习。\n\n可以帮你解释知识点、找站内课程，或把对话整理成笔记。',
      sender: 'ai',
      timestamp: new Date(),

    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // ===== 多模态：语音输入（Web Speech API）与朗读（TTS）=====
  const [micListening, setMicListening] = useState(false);
  const [ttsOn, setTtsOn] = useState(false);
  const recognitionRef = useRef<any>(null);
  const notifyErrorRef = useRef<((msg: string) => void) | null>(null);

  // ===== 端云协同：Transformers.js 端侧语义缓存（可选开关）=====
  const [edgeAiOn, setEdgeAiOn] = useState(false);
  const [edgeStatus, setEdgeStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const [edgeProgress, setEdgeProgress] = useState(0);
  const fullAnswerRef = useRef<string>('');

  useEffect(() => {
    try {
      setTtsOn(window.localStorage.getItem('partjava-tts-on') === '1');
      setEdgeAiOn(window.localStorage.getItem('partjava-edge-ai') === '1');
    } catch {}
  }, []);

  const toggleTts = useCallback(() => {
    setTtsOn(prev => {
      const next = !prev;
      try {
        window.localStorage.setItem('partjava-tts-on', next ? '1' : '0');
      } catch {}
      if (!next && typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      return next;
    });
  }, []);

  const toggleEdgeAi = useCallback(async () => {
    const next = !edgeAiOn;
    setEdgeAiOn(next);
    try {
      window.localStorage.setItem('partjava-edge-ai', next ? '1' : '0');
    } catch {}
    if (next && edgeStatus === 'idle') {
      setEdgeStatus('loading');
      try {
        const { getEmbedder } = await import('@shared/lib/edge-ai');
        await getEmbedder(pct => setEdgeProgress(pct));
        setEdgeStatus('ready');
      } catch {
        setEdgeStatus('error');
      }
    }
  }, [edgeAiOn, edgeStatus]);

  // 语音识别开关（Chrome/Edge/Safari 支持 webkitSpeechRecognition；实现见 notifyError 之后）
  const toggleMic = useCallback(() => {
    if (typeof window === 'undefined') return;
    const SpeechRecognitionCtor =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionCtor) {
      notifyErrorRef.current?.('当前浏览器不支持语音识别，推荐使用 Chrome / Edge');
      return;
    }
    if (micListening) {
      recognitionRef.current?.stop();
      return;
    }
    const recognition = new SpeechRecognitionCtor();
    recognition.lang = 'zh-CN';
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.onresult = (event: any) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setInputValue(transcript);
    };
    recognition.onend = () => setMicListening(false);
    recognition.onerror = () => setMicListening(false);
    recognitionRef.current = recognition;
    setMicListening(true);
    recognition.start();
  }, [micListening]);

  // TTS：朗读 AI 回答（剥离 Markdown 装饰，取正文前段）
  const speakAnswer = useCallback((text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    const plain = text
      .replace(/```[\s\S]*?```/g, ' 代码块 ')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/[#>*_~|-]+/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .trim()
      .slice(0, 600);
    if (!plain) return;
    const utterance = new SpeechSynthesisUtterance(plain);
    utterance.lang = 'zh-CN';
    utterance.rate = 1.05;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }, []);

  useEffect(() => {
    bubbleSideRef.current = bubbleSide;
  }, [bubbleSide]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, showHistoryMode]);

  const notifyError = useCallback((msg: string) => {
    setErrorBanner(msg);
    setTimeout(() => {
      setErrorBanner(null);
    }, 4500);
  }, []);

  // notifyError 在 toggleMic 之前声明（引用顺序需要），通过 ref 解耦
  useEffect(() => {
    notifyErrorRef.current = notifyError;
  }, [notifyError]);

  // 激活指定形态的灵动黑猫模型
  const activatePostureModel = useCallback((targetPosture: CatPosture) => {
    const anchor = robotAnchorRef.current;
    const catCtrl = riggedCatsRef.current[targetPosture];
    if (!anchor || !catCtrl) return;

    while (anchor.children.length > 0) {
      anchor.remove(anchor.children[0]);
    }
    anchor.add(catCtrl.root);
    activeCatRef.current = catCtrl;
    catCtrl.triggerHappyJump();
    setPosture(targetPosture);
    setFaceTuning({ ...catCtrl.profile.face });
  }, []);

  // 撸猫互动：触发 ^ ^ 笑眼 + 跳跃 + 竖耳摇尾
  const handlePetCat = () => {
    activeCatRef.current?.triggerHappyJump();
  };

  // 切换环绕虚拟物品显示/隐藏
  const toggleVirtualProps = () => {
    const next = !showVirtualProps;
    setShowVirtualProps(next);
    if (virtualPropsRef.current) {
      virtualPropsRef.current.visible = next;
    }
  };

  // 实时微调当前猫咪的像素五官位置
  const handleFaceTuningChange = (patch: Partial<CatFaceTuning>) => {
    const next = { ...faceTuning, ...patch };
    setFaceTuning(next);
    activeCatRef.current?.updateFaceTuning(patch);
  };

  // 实时微调逆光银边与立体绒毛
  const handleShaderChange = (opts: {
    rim?: number;
    whiteTip?: number;
    tufts?: boolean;
  }) => {
    if (opts.rim !== undefined) setRimStrength(opts.rim);
    if (opts.whiteTip !== undefined) setWhiteTipStrength(opts.whiteTip);
    if (opts.tufts !== undefined) setShowFurTufts(opts.tufts);
    activeCatRef.current?.updateRimAndFur({
      rimStrength: opts.rim,
      whiteTipStrength: opts.whiteTip,
      showFurTufts: opts.tufts
    });
  };

  // 一键将笔记草稿保存到后端 /api/notes
  const handleDirectSaveNote = async (noteData: any) => {
    if (!noteData || savingNote) return;
    setSavingNote(true);
    setSavedNoteTip(null);
    try {
      const payload = {
        title: noteData.title || `袋子提炼笔记 - ${new Date().toLocaleString()}`,
        content: noteData.content || '',
        category: noteData.category || '后端',
        technology: noteData.technology || 'Java',
        subcategory: noteData.subcategory || '',
        tags: Array.isArray(noteData.tags)
          ? noteData.tags
          : String(noteData.tags || '')
              .split(/[,，\s]+/)
              .filter(Boolean),
        isPublic: !!noteData.isPublic
      };
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await res.json().catch(() => null);
      if (!res.ok || result?.success === false) {
        throw new Error(result?.message || '保存笔记请求失败');
      }
      activeCatRef.current?.triggerHappyJump();
      setSavedNoteTip('已保存到我的笔记。');
      setShowNotePreview(false);
    } catch (err: any) {
      notifyError(`保存笔记失败：${err?.message || '请检查登录状态'}`);
    } finally {
      setSavingNote(false);
    }
  };

  // 核心：调用四大智能体 SSE 流式接口 (/api/ai/agent/stream)，实时驱动猫嘴跳动与气泡渲染
  const dispatchAgentMessage = async (
    rawText: string,
    opts?: { explicitAgent?: string; forceSearch?: boolean }
  ) => {
    const text = rawText.trim();
    if (!text || isTyping) return;

    const useSearch = opts?.forceSearch ?? enableWebSearch;
    setShowBubble(true);
    setSavedNoteTip(null);
    fullAnswerRef.current = '';

    // 端云协同：端侧语义缓存命中 → 浏览器本地离线秒回（仅普通问答；显式智能体/联网不缓存）
    if (edgeAiOn && !opts?.explicitAgent && !useSearch) {
      try {
        const { embedText, findSemanticMatch } = await import('@shared/lib/edge-ai');
        if (edgeStatus !== 'ready') setEdgeStatus('loading');
        const qVec = await embedText(text, pct => setEdgeProgress(pct));
        setEdgeStatus('ready');
        if (qVec) {
          const hit = findSemanticMatch(qVec);
          if (hit && Date.now() - hit.ts < 7 * 24 * 3600 * 1000) {
            const now = Date.now();
            setMessages(prev => [
              ...prev,
              { id: `u-${now}`, text, sender: 'user', timestamp: new Date() },
              {
                id: `ai-${now + 1}`,
                text: `⚡ **端侧缓存命中**（浏览器本地语义匹配，未请求云端）\n\n${hit.a}`,
                sender: 'ai',
                timestamp: new Date(),
                activeAgents: ['⚡ 端侧语义缓存·Transformers.js'],
                modelUsed: 'edge-cache'
              }
            ]);
            setInputValue('');
            activeCatRef.current?.triggerHappyJump?.();
            if (ttsOn) speakAnswer(hit.a);
            return;
          }
        }
      } catch {
        /* 端侧不可用时静默走云端 */
      }
    }

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      text,
      sender: 'user',
      timestamp: new Date()
    };
    const aiMsgId = `ai-${Date.now() + 1}`;
    const placeholderAiMsg: Message = {
      id: aiMsgId,
      text: '',
      sender: 'ai',
      timestamp: new Date(),
      siteLinks: [],
      citations: [],
      activeAgents: []
    };

    const historySnapshot = messages.slice(-6).map(m => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text
    }));

    setMessages(prev => [...prev, userMsg, placeholderAiMsg]);
    setInputValue('');
    setIsTyping(true);
    setSearchStatusText('正在整理回答…');

    // 启动 3D 黑猫歪头/说话状态
    activeCatRef.current?.setMood('curious');
    activeCatRef.current?.setTalking(true);

    const { pathname, contextText } = collectCurrentPageContext();

    try {
      const response = await fetch('/api/ai/agent/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: historySnapshot,
          pageContext: contextText,
          currentPathname: pathname,
          enableWebSearch: useSearch,
          explicitAgent: opts?.explicitAgent
        })
      });

      if (!response.ok || !response.body) {
        throw new Error('回答服务暂时不可用，请稍后重试');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const blocks = buffer.split('\n\n');
        buffer = blocks.pop() || '';

        for (const block of blocks) {
          const lines = block.split('\n');
          let eventName = 'message';
          let dataRaw = '';
          for (const ln of lines) {
            if (ln.startsWith('event:')) {
              eventName = ln.slice(6).trim();
            } else if (ln.startsWith('data:')) {
              dataRaw += ln.slice(5).trim();
            }
          }
          if (!dataRaw) continue;

          try {
            const payload = JSON.parse(dataRaw);

            if (eventName === 'agent_meta') {
              const reaction = payload.reaction || {};
              if (reaction.posture === 'crouching' || reaction.posture === 'standing') {
                activatePostureModel(reaction.posture);
              }
              if (reaction.mood) {
                activeCatRef.current?.setMood(reaction.mood);
              }
              if (payload.model) {
                setCurrentModelName(payload.model);
              }
              setMessages(prev =>
                prev.map(m =>
                  m.id === aiMsgId
                    ? {
                        ...m,
                        activeAgents: payload.activeAgents,
                        modelUsed: payload.model,
                        offline: !!payload.offline
                      }
                    : m
                )
              );
            } else if (eventName === 'search_status') {
              setSearchStatusText(payload.text
                ? String(payload.text).replace(/DeepSeek[-\w.]*/gi, '搜索服务').replace(/\bPro\b\s*/gi, '')
                : null);
            } else if (eventName === 'site_links') {
              setMessages(prev =>
                prev.map(m =>
                  m.id === aiMsgId ? { ...m, siteLinks: payload.links || [] } : m
                )
              );
            } else if (eventName === 'citations') {
              setSearchStatusText(null);
              setMessages(prev =>
                prev.map(m =>
                  m.id === aiMsgId
                    ? { ...m, citations: payload.citations || [] }
                    : m
                )
              );
            } else if (eventName === 'note_draft') {
              setSearchStatusText(null);
              activeCatRef.current?.triggerHappyJump();
              if (payload.note) {
                setPreviewNote(payload.note);
                setShowNotePreview(true);
              }
              setMessages(prev =>
                prev.map(m =>
                  m.id === aiMsgId ? { ...m, noteDraft: payload.note } : m
                )
              );
            } else if (eventName === 'agent_step') {
              // Function Calling Agent 的 plan → act → observe 执行轨迹
              const step: AgentStepItem = {
                phase: payload.phase || 'act',
                tool: payload.tool,
                label: payload.label || payload.tool || '执行工具',
                detail: payload.detail,
                status: payload.status
              };
              setMessages(prev =>
                prev.map(m =>
                  m.id === aiMsgId
                    ? { ...m, agentSteps: [...(m.agentSteps || []), step] }
                    : m
                )
              );
              if (step.phase === 'act') {
                setSearchStatusText(`正在执行 ${step.label}…`);
              } else if (step.phase === 'observe') {
                setSearchStatusText(null);
              }
            } else if (eventName === 'cat_command') {
              // LLM 通过 set_companion_state 工具实时控制 3D 黑猫神态
              if (
                payload.posture === 'crouching' ||
                payload.posture === 'standing'
              ) {
                activatePostureModel(payload.posture);
              }
              if (payload.mood) {
                activeCatRef.current?.setMood(payload.mood);
              }
              if (payload.action === 'jump') {
                activeCatRef.current?.triggerHappyJump();
              }
            } else if (eventName === 'token') {
              setSearchStatusText(null);
              const tokenText = payload.text || '';
              if (tokenText) {
                fullAnswerRef.current += tokenText;
                activeCatRef.current?.setTalking(true);
                setMessages(prev =>
                  prev.map(m =>
                    m.id === aiMsgId ? { ...m, text: m.text + tokenText } : m
                  )
                );
              }
            } else if (eventName === 'done') {
              setSearchStatusText(null);
              activeCatRef.current?.setTalking(false);
              // TTS 朗读完整回答 + 端侧缓存沉淀（均为后台异步，不阻塞 UI）
              if (fullAnswerRef.current) {
                if (ttsOn) speakAnswer(fullAnswerRef.current);
                if (edgeAiOn && fullAnswerRef.current.length > 12) {
                  import('@shared/lib/edge-ai')
                    .then(({ embedText, saveEdgeCacheEntry }) =>
                      embedText(text).then(vec => {
                        if (vec) saveEdgeCacheEntry(text, fullAnswerRef.current, vec);
                      })
                    )
                    .catch(() => {});
                }
              }
            }
          } catch {
            // ignore malformed chunk
          }
        }
      }
    } catch (err) {
      console.error('流式回答不可用，尝试普通对话接口:', err);
      try {
        const fallbackRes = await fetch('/api/ai/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text, pageContext: contextText })
        });
        const data = await fallbackRes.json();
        const reply =
          data?.reply || data?.answer || '喵~ 我刚刚走神啦，请再和我说一次吧！';
        setMessages(prev =>
          prev.map(m => (m.id === aiMsgId ? { ...m, text: reply } : m))
        );
      } catch {
        setMessages(prev =>
          prev.map(m =>
            m.id === aiMsgId
              ? {
                  ...m,
                  text: '喵呜~ 网络好像打了个盹，你可以试试点击下方快捷按钮或稍后重试🐾'
                }
              : m
          )
        );
      }
    } finally {
      setIsTyping(false);
      setSearchStatusText(null);
      setTimeout(() => {
        activeCatRef.current?.setTalking(false);
      }, 450);
    }
  };

  // 拖入任意 GLB 文件一键注入炭黑逆光绒毛 + 像素五官 + 骨骼级呼吸歪头律动
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
        const lowerName = file.name.toLowerCase();
        const preset = lowerName.includes('fluffy')
          ? UPRIGHT_CAT_PROFILE
          : lowerName.includes('plush')
          ? SITTING_CAT_PROFILE
          : undefined;
        const rigged = buildRiggedCatFromGLB(gltf.scene, preset, 2.18);
        riggedCatsRef.current.custom = rigged;
        activatePostureModel('custom');
        setShowTuningPanel(true);
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

    // 构建「PartJava · 温暖书房」与环绕虚拟配饰
    const warmStudyRoom = buildSpaceCapsuleRoom(scene);
    robotAnchorRef.current = warmStudyRoom.robotAnchor;
    virtualPropsRef.current = warmStudyRoom.virtualPropsGroup;
    (window as any).robotAnchor = warmStudyRoom.robotAnchor;

    // 专属摄影棚级双侧背光轮廓聚光灯（Rim SpotLights），打亮黑猫银白耳缘与绒毛轮廓
    const rimSpotL = new THREE.SpotLight(
      0xeef6ff,
      18,
      8.5,
      Math.PI / 3,
      0.65,
      1.6
    );
    rimSpotL.position.set(-1.6, 3.4, -3.2);
    rimSpotL.target.position.set(0, 1.1, -1.55);
    scene.add(rimSpotL, rimSpotL.target);

    const rimSpotR = new THREE.SpotLight(
      0xfff2e2,
      16,
      8.5,
      Math.PI / 3,
      0.65,
      1.6
    );
    rimSpotR.position.set(1.6, 3.4, -3.2);
    rimSpotR.target.position.set(0, 1.1, -1.55);
    scene.add(rimSpotR, rimSpotR.target);

    // 监听鼠标移动（用于猫咪眼神与头部跟随）并支持点击猫咪触发 ^ ^ 笑眼跳跃
    const raycaster = new THREE.Raycaster();
    const pointerVec = new THREE.Vector2();
    let pointerDownPos = { x: 0, y: 0 };

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseNDCRef.current = { x: nx, y: ny };
    };

    const onPointerDown = (e: PointerEvent) => {
      pointerDownPos = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = (e: PointerEvent) => {
      const moveDist = Math.hypot(
        e.clientX - pointerDownPos.x,
        e.clientY - pointerDownPos.y
      );
      if (moveDist > 6 || !warmStudyRoom.robotAnchor) return;

      const rect = container.getBoundingClientRect();
      pointerVec.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerVec.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      raycaster.setFromCamera(pointerVec, camera);
      const hits = raycaster.intersectObjects(
        warmStudyRoom.robotAnchor.children,
        true
      );
      if (hits.length > 0) {
        activeCatRef.current?.triggerHappyJump();
        setShowBubble(true);
      }
    };

    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerdown', onPointerDown);
    container.addEventListener('pointerup', onPointerUp);

    // 加载并注入两个形态的猫咪 GLB 模型：
    // 1) /models/cat-standing.glb (乖巧坐姿形态)
    // 2) /models/cat-crouching.glb (站立张望形态)
    const loader = new GLTFLoader();
    let standingReady = false;

    const updateProgress = (prog: number) => {
      setLoadingProgress(prev => Math.max(prev, Math.min(99, Math.round(prog))));
    };

    loader.load(
      '/models/cat-standing.glb',
      gltf => {
        const rigged = buildRiggedCatFromGLB(
          gltf.scene,
          SITTING_CAT_PROFILE,
          2.18
        );
        riggedCatsRef.current.standing = rigged;
        standingReady = true;
        activatePostureModel('standing');
        setLoadingProgress(100);
        setIsLoading(false);
      },
      xhr => {
        if (xhr.total > 0) {
          updateProgress((xhr.loaded / xhr.total) * 88);
        }
      },
      err => {
        console.error('加载坐姿黑猫 GLB 失败:', err);
        setIsLoading(false);
      }
    );

    loader.load(
      '/models/cat-crouching.glb',
      gltf => {
        const rigged = buildRiggedCatFromGLB(
          gltf.scene,
          UPRIGHT_CAT_PROFILE,
          2.18
        );
        riggedCatsRef.current.crouching = rigged;
        if (!standingReady) {
          activatePostureModel('crouching');
          setLoadingProgress(100);
          setIsLoading(false);
        }
      },
      undefined,
      err => {
        console.error('加载站起黑猫 GLB 失败:', err);
      }
    );

    (window as any).loadRobotFromURL = (url: string) => {
      loader.load(
        url,
        g => {
          const rigged = buildRiggedCatFromGLB(g.scene, undefined, 2.18);
          riggedCatsRef.current.custom = rigged;
          activatePostureModel('custom');
        },
        undefined,
        console.error
      );
    };

    // 渲染与动画主循环（含 60FPS 黑猫“品”字嘴 -> 全息对话气泡动态放射线计算）
    const clock = new THREE.Clock();
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.getElapsedTime();

      orbit.update();
      warmStudyRoom.update(elapsed);

      if (activeCatRef.current) {
        activeCatRef.current.update(dt, elapsed, mouseNDCRef.current);
      }

      renderer.render(scene, camera);

      // 实时计算黑猫“品”字嘴在屏幕上的 2D 像素坐标并更新 SVG 全息放射引线
      if (
        activeCatRef.current &&
        viewportRef.current &&
        bubbleBoxRef.current &&
        calloutPathRef.current &&
        calloutGlowPathRef.current &&
        mouthDotRef.current &&
        mouthPulseRef.current &&
        bubbleAnchorDotRef.current
      ) {
        const vRect = viewportRef.current.getBoundingClientRect();
        const bRect = bubbleBoxRef.current.getBoundingClientRect();
        if (vRect.width > 0 && vRect.height > 0 && bRect.width > 0) {
          const mouthCoord = activeCatRef.current.getMouthScreenCoord(
            camera,
            vRect.width,
            vRect.height
          );
          const mx = mouthCoord.x;
          const my = mouthCoord.y;

          const side = bubbleSideRef.current;
          // 气泡连接点：若气泡在右侧，连在气泡左边缘偏上；若气泡在左侧，连在气泡右边缘偏上
          const targetX =
            side === 'right'
              ? bRect.left - vRect.left
              : bRect.right - vRect.left;
          const targetY =
            bRect.top - vRect.top + Math.min(82, bRect.height * 0.28);

          // 科幻折线拐点（从嘴巴斜向上放射出一段，再水平折入气泡边缘）
          const dir = side === 'right' ? 1 : -1;
          const elbowX = mx + dir * Math.min(75, Math.abs(targetX - mx) * 0.42);
          const elbowY = targetY;

          const dPath = `M ${mx.toFixed(1)} ${my.toFixed(1)} L ${elbowX.toFixed(
            1
          )} ${elbowY.toFixed(1)} L ${targetX.toFixed(1)} ${targetY.toFixed(1)}`;

          calloutPathRef.current.setAttribute('d', dPath);
          calloutGlowPathRef.current.setAttribute('d', dPath);
          mouthDotRef.current.setAttribute('cx', mx.toFixed(1));
          mouthDotRef.current.setAttribute('cy', my.toFixed(1));
          mouthPulseRef.current.setAttribute('cx', mx.toFixed(1));
          mouthPulseRef.current.setAttribute('cy', my.toFixed(1));
          bubbleAnchorDotRef.current.setAttribute('cx', targetX.toFixed(1));
          bubbleAnchorDotRef.current.setAttribute('cy', targetY.toFixed(1));
        }
      }
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
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerdown', onPointerDown);
      container.removeEventListener('pointerup', onPointerUp);
      resizeObserver.disconnect();
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      orbit.dispose();
      renderer.dispose();
    };
  }, [activatePostureModel]);

  // 取出最新一条 AI 回复用于嘴巴放射气泡展示
  const latestAiMessage =
    [...messages].reverse().find(m => m.sender === 'ai') || messages[0];
  const latestUserMessage = [...messages]
    .reverse()
    .find(m => m.sender === 'user');

  return createPortal(
    <div role="dialog" aria-modal="true" aria-label="温暖书房" style={{ zIndex: 2000 }} className="fixed inset-0 z-[2000] bg-black/65 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div
        className={`${styles.dialog} bg-[#1c1a17] rounded-2xl shadow-2xl animate-slideUp w-full h-full max-w-6xl max-h-[95vh] flex flex-col overflow-hidden border border-[#d4a36a]/25`}
        onDragOver={e => {
          e.preventDefault();
          setIsDraggingOver(true);
        }}
        onDragLeave={e => {
          if (!e.relatedTarget) setIsDraggingOver(false);
        }}
        onDrop={handleDropGLB}
      >
        <div className={styles.header}>
          <div className={styles.brand}>
            <span aria-hidden="true" className={styles.brandDot} />
            <span>PartJava · 温暖书房</span>
          </div>
          <div className={styles.headerActions}>
            <button type="button" aria-expanded={showSettings} aria-controls="study-room-settings"
              onClick={() => { setShowSettings(value => !value); setShowTuningPanel(false); }}>
              外观设置
            </button>
            <button type="button" onClick={onClose}>关闭</button>
          </div>
          {showSettings && (
            <div id="study-room-settings" className={styles.settings} role="region" aria-label="书房设置">
              <div className={styles.settingsTitle}>书房与猫咪</div>
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
                🐱 乖巧坐姿
              </button>
              <button
                onClick={() => activatePostureModel('crouching')}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  posture === 'crouching'
                    ? 'bg-[#d4a36a] text-[#1c1a17] shadow-sm font-semibold'
                    : 'text-[#e9dac3]/80 hover:text-white'
                }`}
              >
                🐾 爬起站姿
              </button>
            </div>

            {/* 嘴巴放射气泡左/右方向切换 */}
            <button
              onClick={() => {
                setShowBubble(true);
                setBubbleSide(prev => (prev === 'right' ? 'left' : 'right'));
              }}
              className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs border border-[#d4a36a]/40 bg-[#141210] text-[#f7efe4] hover:bg-[#d4a36a]/20 transition-all"
              title="调整聊天窗位置"
            >
              {bubbleSide === 'right' ? '聊天窗移到左侧' : '聊天窗移到右侧'}
            </button>

            {/* 撸猫开心笑眼互动按钮 */}
            <button
              onClick={handlePetCat}
              className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs border border-[#d4a36a]/40 bg-[#d4a36a]/15 text-[#f7efe4] hover:bg-[#d4a36a]/30 transition-all"
              title="点击触发 ^ ^ 眯眼笑跳跃互动"
            >
              摸摸猫
            </button>

            {/* 毛色逆光 & 五官微调面板开关 */}
            <button
              onClick={() => { setShowTuningPanel(!showTuningPanel); setShowSettings(false); }}
              className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs border transition-all ${
                showTuningPanel
                  ? 'bg-[#d4a36a] text-[#1c1a17] border-[#d4a36a] font-semibold'
                  : 'bg-[#141210] border-white/15 text-[#e9dac3]/80 hover:text-white'
              }`}
            >
              五官与毛色微调
            </button>

            {/* 虚拟配饰隐藏/显示切换按钮 */}
            <button
              onClick={toggleVirtualProps}
              className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs border transition-all ${
                showVirtualProps
                  ? 'bg-[#56b6c2]/20 border-[#56b6c2]/50 text-[#a8e4ec]'
                  : 'bg-[#141210] border-white/15 text-[#e9dac3]/70'
              }`}
              title="显示或隐藏猫身边的配饰"
            >
              {showVirtualProps ? '✨ 隐藏配饰' : '✨ 显示配饰'}
            </button>


              <div className={styles.modelInfo}>
                当前服务：{currentModelName}
                {currentModelName === 'offline-smart-fallback' && (
                  <span className="ml-1.5 px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-semibold border border-amber-400/40">
                    离线降级模式
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 3D 书房主视口 */}
        <div
          ref={viewportRef}
          className="flex-1 relative bg-[#1c1a17] overflow-hidden"
        >
          <canvas ref={canvasRef} className="w-full h-full block" />

          {/* 电影感柔光暗角，不遮挡中心视觉 */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(14, 13, 12, 0.32) 0%, rgba(14, 13, 12, 0.04) 18%, transparent 32%, transparent 78%, rgba(12, 11, 10, 0.48) 100%), radial-gradient(ellipse at 50% 52%, transparent 50%, rgba(10, 9, 8, 0.32) 100%)'
            }}
          />

          {/* ==========================================================
              核心亮点：从黑猫“品”字嘴巴实时放射出的 SVG 全息引线 + 悬浮对话窗
             ========================================================== */}
          {!isLoading && showBubble && (
            <>
              {/* 全屏透明 SVG 层：起点实时锁定黑猫 3D 品字嘴坐标，终点连接气泡框边缘 */}
              <svg aria-hidden="true" className={`${styles.connector} pointer-events-none absolute inset-0 w-full h-full z-10 overflow-visible hidden sm:block`} style={{ opacity: isTyping ? 0.35 : 0 }}>
                <defs>
                  <linearGradient
                    id="catMouthBeamGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                    <stop offset="35%" stopColor="#f3d19c" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#d4a36a" stopOpacity="0.75" />
                  </linearGradient>
                  <filter
                    id="catBeamGlow"
                    x="-20%"
                    y="-20%"
                    width="140%"
                    height="140%"
                  >
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* 外发光扩散轨 */}
                <path
                  ref={calloutGlowPathRef}
                  d="M 0 0 L 0 0"
                  fill="none"
                  stroke="#d4a36a"
                  strokeWidth="1.8"
                  strokeOpacity="0.10"

                />
                {/* 主放射全息折线 */}
                <path
                  ref={calloutPathRef}
                  d="M 0 0 L 0 0"
                  fill="none"
                  stroke="url(#catMouthBeamGrad)"
                  strokeWidth="1"
                  strokeDasharray="3 4"

                />
                {/* 黑猫“品”字嘴锚点脉冲光环 */}
                <circle
                  ref={mouthPulseRef}
                  cx="0"
                  cy="0"
                  r="3"
                  fill="none"
                  stroke="#f5d5a3"
                  strokeWidth="1.5"
                  strokeOpacity="0.65"

                />
                <circle
                  ref={mouthDotRef}
                  cx="0"
                  cy="0"
                  r="2"
                  fill="#ffffff"
                  stroke="#d4a36a"
                  strokeWidth="2"

                />
                {/* 气泡侧边接入锚点 */}
                <circle
                  ref={bubbleAnchorDotRef}
                  cx="0"
                  cy="0"
                  r="2"
                  fill="#d4a36a"
                  stroke="#fff8ee"
                  strokeWidth="1.5"
                />
              </svg>

              {/* 从嘴巴放射出的半透明暖金深色毛玻璃聊天窗口（支持居右或居左） */}
              <div
                ref={bubbleBoxRef}
                className={`${styles.bubble} absolute top-3 sm:top-5 ${
                  bubbleSide === 'right'
                    ? 'right-3 sm:right-5'
                    : 'left-3 sm:left-5'
                } z-10 w-[calc(100%-1.5rem)] sm:w-[410px] md:w-[450px] max-h-[calc(100%-155px)] flex flex-col bg-[#161310]/88 backdrop-blur-xl rounded-2xl border border-[#d4a36a]/45 shadow-[0_16px_48px_rgba(0,0,0,0.65),0_0_24px_rgba(212,163,106,0.18)] transition-all duration-300`}
              >
                {/* 气泡顶部栏：显示当前工作的工具能力徽章与控制按钮 */}
                <div className={styles.bubbleHeader}>
                  <div className="flex items-center space-x-2 min-w-0">
                    <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                      <span
                        className={`${isTyping ? 'animate-ping' : 'hidden'} absolute inline-flex h-full w-full rounded-full opacity-40 ${
                          isTyping ? 'bg-amber-400' : 'bg-emerald-400'
                        }`}
                      />
                      <span
                        className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                          isTyping ? 'bg-amber-400' : 'bg-emerald-400'
                        }`}
                      />
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#f7efe4] truncate">
                      袋子 · 学习助手
                    </span>
                  </div>

                  <div className="flex items-center space-x-1.5 flex-shrink-0">
                    <button
                      onClick={() => setShowHistoryMode(!showHistoryMode)}
                      className={`px-2 py-0.5 rounded text-[11px] border transition-all ${
                        showHistoryMode
                          ? 'bg-[#d4a36a] text-[#1c1a17] border-[#d4a36a] font-semibold'
                          : 'bg-white/5 text-[#e9dac3] border-white/15 hover:bg-white/10'
                      }`}
                      title="查看最新回复或完整对话"
                    >
                      {showHistoryMode
                        ? '最新回复'
                        : `历史（${messages.length}）`}
                    </button>
                    <button
                      onClick={() =>
                        setBubbleSide(prev =>
                          prev === 'right' ? 'left' : 'right'
                        )
                      }
                      className="px-1.5 py-0.5 rounded text-[11px] bg-white/5 hover:bg-white/15 text-[#e9dac3] border border-white/10"
                      title="调整聊天窗位置"
                    >
                      {bubbleSide === 'right' ? '◀左' : '右▶'}
                    </button>
                    <button
                      onClick={() => setShowBubble(false)}
                      className="px-1.5 py-0.5 rounded text-[11px] bg-white/5 hover:bg-red-500/30 text-[#e9dac3]/70 hover:text-white"
                      title="收起对话"
                    >
                      ─
                    </button>
                  </div>
                </div>

                {/* 气泡内容区：支持「单条最新放射模式」与「完整历史模式」 */}
                <div className="flex-1 overflow-y-auto p-3.5 space-y-3 text-xs sm:text-sm text-[#f5ece0] custom-scrollbar">
                  {!showHistoryMode ? (
                    <>
                      {/* 用户刚才问的问题小胶囊 */}
                      {latestUserMessage && (
                        <div className="flex justify-end">
                          <div className="max-w-[88%] px-3 py-1.5 rounded-xl bg-[#d4a36a]/20 border border-[#d4a36a]/40 text-[#fcefd9] text-xs">
                            <span className="opacity-70 mr-1">你:</span>
                            {latestUserMessage.text}
                          </div>
                        </div>
                      )}

                      {/* 实时搜索/写笔记状态提示 */}
                      {searchStatusText && (
                        <div className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-amber-500/15 border border-amber-400/35 text-amber-200 text-xs animate-pulse">
                          <span>⚡</span>
                          <span>{searchStatusText}</span>
                        </div>
                      )}

                      {/* 黑猫嘴巴说出的流式 Markdown 内容 */}
                      {latestAiMessage && (
                        <div className="space-y-3">
                          {/* Function Calling Agent 执行轨迹（plan → act → observe） */}
                          {latestAiMessage.agentSteps &&
                            latestAiMessage.agentSteps.length > 0 && (
                              <div className="rounded-xl bg-black/30 border border-[#d4a36a]/25 overflow-hidden">
                                <div className="px-2.5 py-1.5 text-[10px] font-semibold text-[#d4a36a] flex items-center gap-1.5 bg-[#d4a36a]/10">
                                  <span>🧠 智能体执行轨迹</span>
                                  <span className="opacity-60 font-normal">
                                    自主决策 · {latestAiMessage.agentSteps.length} 步
                                  </span>
                                  {latestAiMessage.offline && (
                                    <span className="ml-auto px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/40">
                                      离线降级模式
                                    </span>
                                  )}
                                </div>
                                <div className="px-2.5 py-1.5 space-y-1 max-h-28 overflow-y-auto custom-scrollbar">
                                  {latestAiMessage.agentSteps.map((step, i) => (
                                    <div
                                      key={i}
                                      className="flex items-start gap-1.5 text-[11px] leading-snug"
                                    >
                                      <span
                                        className={
                                          step.phase === 'plan'
                                            ? 'text-[#b8a4e8]'
                                            : step.phase === 'act'
                                            ? step.status === 'running'
                                              ? 'text-[#f3c687] animate-pulse'
                                              : 'text-[#f3c687]'
                                            : 'text-emerald-400'
                                        }
                                      >
                                        {step.phase === 'plan'
                                          ? '💭'
                                          : step.phase === 'act'
                                          ? '⚡'
                                          : '✓'}
                                      </span>
                                      <span className="text-[#e8dcc8] font-medium flex-shrink-0">
                                        {step.label}
                                      </span>
                                      {step.detail && (
                                        <span className="text-gray-400/90 truncate">
                                          {step.detail}
                                        </span>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                          <div className="prose prose-invert prose-sm max-w-none text-[#f4eadc] leading-relaxed">
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              components={{
                                a({ href, children, ...props }: any) {
                                  const isInternal =
                                    href && href.startsWith('/');
                                  return (
                                    <a
                                      href={href}
                                      onClick={e => {
                                        if (isInternal) {
                                          e.preventDefault();
                                          onClose();
                                          router.push(href);
                                        }
                                      }}
                                      target={isInternal ? undefined : '_blank'}
                                      rel={
                                        isInternal
                                          ? undefined
                                          : 'noopener noreferrer'
                                      }
                                      className="text-[#f3c687] underline hover:text-[#ffe0b2] font-medium"
                                      {...props}
                                    >
                                      {children}
                                    </a>
                                  );
                                },
                                code({
                                  className,
                                  children,
                                  ...props
                                }: any) {
                                  const match = /language-(\w+)/.exec(
                                    className || ''
                                  );
                                  return match ? (
                                    <div className="my-2 rounded-lg overflow-hidden border border-white/10">
                                      <SyntaxHighlighter
                                        style={vscDarkPlus}
                                        language={match[1]}
                                        PreTag="div"
                                        customStyle={{
                                          margin: 0,
                                          background: '#0e0d0b',
                                          padding: '0.75rem',
                                          fontSize: '12px'
                                        }}
                                        {...props}
                                      >
                                        {String(children).replace(/\n$/, '')}
                                      </SyntaxHighlighter>
                                    </div>
                                  ) : (
                                    <code
                                      className="bg-white/10 px-1.5 py-0.5 rounded text-xs font-mono text-[#f5c88c]"
                                      {...props}
                                    >
                                      {children}
                                    </code>
                                  );
                                }
                              }}
                            >
                              {latestAiMessage.text ||
                                (isTyping ? '喵呜~ 正在思考中...' : '')}
                            </ReactMarkdown>
                          </div>

                          {/* 站内检索输出：310+ 页面一键直达胶囊 */}
                          {latestAiMessage.siteLinks &&
                            latestAiMessage.siteLinks.length > 0 && (
                              <div className="pt-2 border-t border-white/10">
                                <div className="text-[11px] text-[#d4a36a] font-semibold mb-1.5 flex items-center gap-1">
                                  <span>相关课程</span>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                  {latestAiMessage.siteLinks.map((lnk, i) => (
                                    <button
                                      key={i}
                                      onClick={() => {
                                        onClose();
                                        router.push(lnk.href);
                                      }}
                                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs bg-[#d4a36a]/20 hover:bg-[#d4a36a] text-[#f7efe4] hover:text-[#1c1a17] border border-[#d4a36a]/45 transition-all font-medium"
                                    >
                                      <span>📖 {lnk.name}</span>
                                      <span className="opacity-75">→</span>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}

                          {/* 联网深搜输出：权威网站外链卡片 */}
                          {latestAiMessage.citations &&
                            latestAiMessage.citations.length > 0 && (
                              <div className="pt-2 border-t border-white/10">
                                <div className="text-[11px] text-[#63c7ff] font-semibold mb-1.5 flex items-center gap-1">
                                  <span>
                                    参考资料
                                  </span>
                                </div>
                                <div className="space-y-1.5">
                                  {latestAiMessage.citations.map(cite => (
                                    <a
                                      key={cite.index}
                                      href={cite.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="block p-2 rounded-xl bg-[#1f2933]/75 hover:bg-[#273645] border border-[#56b6c2]/40 transition-all group"
                                    >
                                      <div className="flex items-center justify-between gap-2">
                                        <span className="text-xs font-semibold text-[#a8e4ec] group-hover:underline truncate">
                                          [{cite.index}] {cite.title}
                                        </span>
                                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/40 text-[#7fd4e0] font-mono flex-shrink-0">
                                          {cite.domain} ↗
                                        </span>
                                      </div>
                                      {cite.snippet && (
                                        <p className="text-[11px] text-gray-300/80 line-clamp-2 mt-1">
                                          {cite.snippet}
                                        </p>
                                      )}
                                    </a>
                                  ))}
                                </div>
                              </div>
                            )}

                          {/* 笔记提炼输出：结构化 Markdown 笔记保存与预览卡片 */}
                          {latestAiMessage.noteDraft && (
                            <div className="p-3 rounded-xl bg-gradient-to-br from-[#2b2319] to-[#1e1913] border border-[#d4a36a]/60 space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-[#f5d5a3]">
                                  笔记草稿
                                </span>
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#d4a36a]/25 text-[#f7efe4]">
                                  {latestAiMessage.noteDraft.category} ·{' '}
                                  {latestAiMessage.noteDraft.technology}
                                </span>
                              </div>
                              <div className="text-xs font-semibold text-white truncate">
                                《{latestAiMessage.noteDraft.title}》
                              </div>
                              <div className="flex flex-wrap items-center gap-2 pt-1">
                                <button
                                  onClick={() => { setPreviewNote(latestAiMessage.noteDraft); setShowNotePreview(true); }}
                                  disabled={savingNote}
                                  className={styles.previewButton}
                                >预览并保存</button>
                                <span className="text-xs text-[#c8bba9]">确认内容后，再保存到我的笔记。</span>
                              </div>
                              {savedNoteTip && (
                                <div className="flex items-center justify-between text-xs text-emerald-300 pt-1">
                                  <span>{savedNoteTip}</span>
                                  <button
                                    onClick={() => {
                                      onClose();
                                      router.push('/notes');
                                    }}
                                    className="underline hover:text-white"
                                  >
                                    前往笔记中心查看 →
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    /* 完整历史对话流模式 */
                    <div className="space-y-3">
                      {messages.map(msg => (
                        <div
                          key={msg.id}
                          className={`flex ${
                            msg.sender === 'user'
                              ? 'justify-end'
                              : 'justify-start'
                          }`}
                        >
                          <div
                            className={`max-w-[88%] px-3 py-2 rounded-xl text-xs ${
                              msg.sender === 'user'
                                ? 'bg-[#d4a36a] text-[#1c1a17] font-medium'
                                : 'bg-white/10 text-[#f4eadc] border border-white/10'
                            }`}
                          >
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {msg.text}
                            </ReactMarkdown>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* 当气泡最小化时，提供一键唤起悬浮小标 */}
          {!isLoading && !showBubble && (
            <button
              onClick={() => setShowBubble(true)}
              className="absolute top-4 right-4 z-10 px-3.5 py-2 rounded-full bg-[#1a1714]/90 border border-[#d4a36a]/50 text-[#f7efe4] text-xs shadow-xl hover:bg-[#d4a36a] hover:text-[#1c1a17] transition-all font-semibold"
            >
              打开对话
            </button>
          )}

          {/* 右上角「毛色逆光 & 像素五官微调」悬浮控制面板 */}
          {showTuningPanel && (
            <div className="absolute top-3 left-3 z-20 w-72 bg-[#161412]/92 backdrop-blur-md border border-[#d4a36a]/35 rounded-xl p-3.5 text-xs text-[#f4eadc] shadow-2xl space-y-2.5">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="font-semibold text-[#d4a36a]">
                  五官与毛色微调
                </span>
                <button
                  onClick={() => setShowTuningPanel(false)}
                  className="text-[#e9dac3]/60 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>Fresnel 逆光银边强度</span>
                  <span className="font-mono text-[#d4a36a]">
                    {rimStrength.toFixed(2)}
                  </span>
                </div>
                <input
                  type="range"
                  min={0.2}
                  max={2.6}
                  step={0.05}
                  value={rimStrength}
                  onChange={e =>
                    handleShaderChange({ rim: parseFloat(e.target.value) })
                  }
                  className="w-full accent-[#d4a36a]"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>耳缘 & 尾尖银白毛浓度</span>
                  <span className="font-mono text-[#d4a36a]">
                    {whiteTipStrength.toFixed(2)}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={1.6}
                  step={0.05}
                  value={whiteTipStrength}
                  onChange={e =>
                    handleShaderChange({ whiteTip: parseFloat(e.target.value) })
                  }
                  className="w-full accent-[#d4a36a]"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>像素眼高度 (Eye Y)</span>
                  <span className="font-mono text-[#d4a36a]">
                    {faceTuning.eyeY.toFixed(3)}
                  </span>
                </div>
                <input
                  type="range"
                  min={0.48}
                  max={0.82}
                  step={0.004}
                  value={faceTuning.eyeY}
                  onChange={e =>
                    handleFaceTuningChange({ eyeY: parseFloat(e.target.value) })
                  }
                  className="w-full accent-[#d4a36a]"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>两眼间距 (Spacing)</span>
                  <span className="font-mono text-[#d4a36a]">
                    {faceTuning.eyeSpacing.toFixed(3)}
                  </span>
                </div>
                <input
                  type="range"
                  min={0.1}
                  max={0.34}
                  step={0.004}
                  value={faceTuning.eyeSpacing}
                  onChange={e =>
                    handleFaceTuningChange({
                      eyeSpacing: parseFloat(e.target.value)
                    })
                  }
                  className="w-full accent-[#d4a36a]"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>品字嘴高度 (Mouth Y)</span>
                  <span className="font-mono text-[#d4a36a]">
                    {faceTuning.mouthY.toFixed(3)}
                  </span>
                </div>
                <input
                  type="range"
                  min={0.42}
                  max={0.72}
                  step={0.004}
                  value={faceTuning.mouthY}
                  onChange={e =>
                    handleFaceTuningChange({
                      mouthY: parseFloat(e.target.value)
                    })
                  }
                  className="w-full accent-[#d4a36a]"
                />
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-white/10">
                <span>3D 表面立体绒毛簇</span>
                <input
                  type="checkbox"
                  checked={showFurTufts}
                  onChange={e =>
                    handleShaderChange({ tufts: e.target.checked })
                  }
                  className="accent-[#d4a36a] w-4 h-4"
                />
              </div>
            </div>
          )}

          {/* GLB 拖拽上传覆盖层 */}
          {isDraggingOver && (
            <div className="absolute inset-5 z-20 border-2 border-dashed border-[#ddb982]/80 rounded-2xl grid place-items-center text-[#f7efe4] bg-[#141210]/70 backdrop-blur-md text-base sm:text-lg tracking-wider">
              释放鼠标，将 GLB 模型放入书房中央并自动注入炭黑绒毛与像素五官
            </div>
          )}

          {/* 错误提示条 */}
          {errorBanner && (
            <div className="absolute top-5 left-1/2 -translate-x-1/2 z-30 bg-[#301816]/90 border border-[#d68273]/40 backdrop-blur-md text-[#fcebe8] px-5 py-2.5 rounded-xl text-xs tracking-wide shadow-xl">
              {errorBanner}
            </div>
          )}

          {/* 加载进度覆盖层 */}
          {isLoading && (
            <div className="absolute inset-0 bg-[#1c1a17]/90 flex items-center justify-center backdrop-blur-sm z-20">
              <div className="text-center text-[#f4eadc] max-w-sm px-4">
                <div className="text-5xl mb-5 animate-bounce">🐱</div>
                <div className="text-lg sm:text-xl font-serif font-semibold mb-4 tracking-wider text-[#f7efe4]">
                  正在布置书房…
                </div>
                <div className="w-64 bg-[#2c2723] rounded-full h-2.5 mb-3 overflow-hidden border border-[#d4a36a]/30 mx-auto">
                  <div
                    className="bg-gradient-to-r from-[#b8935c] to-[#e5c07b] h-full rounded-full transition-all duration-300"
                    style={{ width: `${loadingProgress}%` }}
                  />
                </div>
                <div className="text-sm font-mono text-[#d4a36a]">
                  {loadingProgress}%
                </div>
              </div>
            </div>
          )}

          {/* ==========================================================
              底部常驻直聊输入坞（Chat Dock）：无需弹窗，直接与 AI 黑猫对话
             ========================================================== */}
          {!isLoading && (
            <div className={`${styles.dock} absolute bottom-2.5 sm:bottom-4 left-1/2 -translate-x-1/2 w-full max-w-3xl px-3 sm:px-4 z-20`}>
              <div className={styles.composer}>
                <div className={styles.shortcuts} aria-label="学习快捷操作">
                  <button disabled={isTyping} onClick={() => dispatchAgentMessage('请解释当前页面的核心知识点，并举一个容易理解的例子。', { explicitAgent: 'navigator' })}>解释当前页</button>
                  <button disabled={isTyping} onClick={() => dispatchAgentMessage('请根据当前页面内容，帮我找相关的站内课程与练习。', { explicitAgent: 'navigator' })}>找课程</button>
                  <button disabled={isTyping} onClick={() => dispatchAgentMessage('请结合当前页面和我们的对话，整理一份学习笔记草稿，供我预览后保存。', { explicitAgent: 'note' })}>整理笔记</button>
                  <button disabled={isTyping} onClick={() => dispatchAgentMessage('请结合我的问题，帮我制定一份循序渐进的学习路线。')}>学习路线</button>
                </div>

                {/* 第二排：姿态切换 + Pro 联网深搜开关 + 直接输入框 + 发送按钮 */}
                <div className="flex items-center gap-2">
                  {/* DeepSeek-V4-Pro 联网深搜独立开关 */}
                  <button
                    onClick={() => setEnableWebSearch(!enableWebSearch)}
                    className={`px-2.5 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1 flex-shrink-0 ${
                      enableWebSearch
                        ? 'bg-[#1d3b47] border-[#56b6c2] text-[#a8e4ec] shadow-[0_0_12px_rgba(86,182,194,0.35)]'
                        : 'bg-[#24201c] border-white/15 text-[#e9dac3]/70 hover:text-white'
                    }`}
                    title="开启后可联网查找相关资料"
                    aria-label={enableWebSearch ? '联网搜索：开' : '联网搜索：关'}
                    aria-pressed={enableWebSearch}
                  >
                    <span>🌐</span>
                    <span className="hidden sm:inline">
                      {enableWebSearch ? '联网搜索：开' : '联网搜索：关'}
                    </span>
                  </button>

                  {/* TTS 朗读开关（多模态输出） */}
                  <button
                    onClick={toggleTts}
                    className={`px-2.5 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1 flex-shrink-0 ${
                      ttsOn
                        ? 'bg-[#3a2f1d] border-[#d4a36a] text-[#f5d5a3] shadow-[0_0_12px_rgba(212,163,106,0.35)]'
                        : 'bg-[#24201c] border-white/15 text-[#e9dac3]/70 hover:text-white'
                    }`}
                    title={ttsOn ? '语音朗读：开（回答完成后自动朗读）' : '语音朗读：关'}
                    aria-pressed={ttsOn}
                  >
                    <span>{ttsOn ? '🔊' : '🔈'}</span>
                    <span className="hidden sm:inline">朗读</span>
                  </button>

                  {/* 端侧语义缓存开关（Transformers.js，端云协同） */}
                  <button
                    onClick={toggleEdgeAi}
                    disabled={edgeStatus === 'loading'}
                    className={`px-2.5 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1 flex-shrink-0 ${
                      edgeAiOn
                        ? 'bg-[#1d3b2f] border-[#7bd88f] text-[#c9f2d4] shadow-[0_0_12px_rgba(123,216,143,0.3)]'
                        : 'bg-[#24201c] border-white/15 text-[#e9dac3]/70 hover:text-white'
                    }`}
                    title={
                      edgeStatus === 'loading'
                        ? `端侧模型下载中 ${edgeProgress}%（首次约120MB，之后本地缓存）`
                        : '浏览器本地语义缓存（Transformers.js）：相似问题离线秒回'
                    }
                    aria-pressed={edgeAiOn}
                  >
                    <span>{edgeStatus === 'loading' ? '⏳' : '📦'}</span>
                    <span className="hidden sm:inline">
                      {edgeStatus === 'loading' ? `${edgeProgress}%` : '端侧'}
                    </span>
                  </button>

                  <input
                    type="text"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        dispatchAgentMessage(inputValue);
                      }
                    }}
                    placeholder={
                      enableWebSearch
                        ? '输入问题，联网查找相关资料…'
                        : '问知识点、找课程，或整理学习笔记…'
                    }
                    disabled={isTyping}
                    className="flex-1 min-w-0 bg-[#100e0c]/90 text-[#f7efe4] placeholder-[#e9dac3]/45 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-[#d4a36a]/30 focus:outline-none focus:border-[#d4a36a] transition-colors"
                  />

                  {/* 语音输入麦克风（Web Speech API，多模态输入） */}
                  <button
                    onClick={toggleMic}
                    disabled={isTyping}
                    className={`px-3 py-2.5 rounded-xl border transition-all flex-shrink-0 ${
                      micListening
                        ? 'bg-red-500/25 border-red-400/70 text-red-200 animate-pulse'
                        : 'bg-[#24201c] border-white/15 text-[#e9dac3]/80 hover:text-white'
                    }`}
                    title={micListening ? '正在聆听，点击停止' : '语音输入（普通话）'}
                    aria-label={micListening ? '停止语音输入' : '开始语音输入'}
                    aria-pressed={micListening}
                  >
                    <span>🎤</span>
                  </button>

                  <button
                    onClick={() => dispatchAgentMessage(inputValue)}
                    disabled={!inputValue.trim() || isTyping}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d4a36a] to-[#b8894e] hover:from-[#e2b478] hover:to-[#c8985a] text-[#1c1a17] font-bold text-xs sm:text-sm shadow-md transition-all disabled:opacity-45 flex items-center gap-1.5 flex-shrink-0"
                  >
                    <SendOutlined />
                    <span>{isTyping ? '思考中' : '发送'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 笔记预览与微调弹窗（复用项目原有的 NotePreviewModal 组件） */}
      {showNotePreview && previewNote && (
        <NotePreviewModal
          note={previewNote}
          onChange={setPreviewNote}
          onClose={() => setShowNotePreview(false)}
          onSave={() => handleDirectSaveNote(previewNote)}
          loading={savingNote}
        />
      )}
    </div>,
    document.body
  );
}

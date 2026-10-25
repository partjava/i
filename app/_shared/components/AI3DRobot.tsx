'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
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
import CatStage from './ai-robot/CatStage';
import ChatPanel from './ai-robot/ChatPanel';
import Composer from './ai-robot/Composer';
import styles from './AI3DRobot.module.css';
import {
  Message,
  CatPosture,
  BubbleSide,
  StageMood,
  ThoughtBubbleState,
  collectCurrentPageContext
} from './ai-robot/types';

// 工具名 → 思维气泡图标（B5）
const TOOL_THOUGHT_ICON: Record<string, string> = {
  search_site_pages: '🧭',
  web_search: '🌐',
  draft_note: '📝',
  set_companion_state: '🐾',
};

// 亲密度持久化（A4 情绪记忆）
const AFFECTION_KEY = 'heju-affection-v1';
interface AffectionRecord { score: number; lastSeen: number }
function loadAffection(): AffectionRecord {
  try {
    const raw = window.localStorage.getItem(AFFECTION_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (typeof parsed?.score === 'number' && typeof parsed?.lastSeen === 'number') {
        return parsed;
      }
    }
  } catch {}
  return { score: 50, lastSeen: Date.now() };
}
function saveAffection(rec: AffectionRecord) {
  try {
    window.localStorage.setItem(AFFECTION_KEY, JSON.stringify(rec));
  } catch {}
}

export default function AI3DRobot({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const bubbleBoxRef = useRef<HTMLDivElement>(null);
  const stageContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 3D 挂载点与双形态猫控制器（传递给 CatStage 使用）
  const robotAnchorRef = useRef<THREE.Group>();
  const virtualPropsRef = useRef<THREE.Group>();
  const riggedCatsRef = useRef<{
    standing?: RiggedCatController;
    crouching?: RiggedCatController;
    custom?: RiggedCatController;
  }>({});
  const activeCatRef = useRef<RiggedCatController | undefined>();

  // ===== 舞台与展示状态 =====
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [posture, setPosture] = useState<CatPosture>('standing');
  const [showVirtualProps, setShowVirtualProps] = useState(true);
  const [showTuningPanel, setShowTuningPanel] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [rimStrength, setRimStrength] = useState(1.45);
  const [whiteTipStrength, setWhiteTipStrength] = useState(1.0);
  const [showFurTufts, setShowFurTufts] = useState(true);
  const [faceTuning, setFaceTuning] = useState<CatFaceTuning>(SITTING_CAT_PROFILE.face);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const [bubbleSide, setBubbleSide] = useState<BubbleSide>('right');
  const [showBubble, setShowBubble] = useState(true);
  const [showHistoryMode, setShowHistoryMode] = useState(false);
  const [currentModelName, setCurrentModelName] = useState('deepseek-flash');
  // C10 宣纸暖光主题：让对话 UI 与主站纸墨风视觉连续
  const [paperTheme, setPaperTheme] = useState(false);

  // ===== 灵气系统：灯光情绪 / 思维气泡 / 亲密度 / 用户输入 =====
  const [stageMood, setStageMood] = useState<StageMood>('idle');
  const [thought, setThought] = useState<ThoughtBubbleState | null>(null);
  const [affection, setAffection] = useState(50);
  const welcomeBackRef = useRef(false);
  const [userTyping, setUserTyping] = useState(false);
  const userTypingTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const stageMoodRevertRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // ===== 笔记弹窗 =====
  const [previewNote, setPreviewNote] = useState<any>(null);
  const [showNotePreview, setShowNotePreview] = useState(false);
  const [savingNote, setSavingNote] = useState(false);
  const [savedNoteTip, setSavedNoteTip] = useState<string | null>(null);

  // ===== 对话与多模态 =====
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      text: '我是禾桔，陪你一起学习。\n\n可以帮你解释知识点、找站内课程，或把对话整理成笔记。',
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [searchStatusText, setSearchStatusText] = useState<string | null>(null);
  const [micListening, setMicListening] = useState(false);
  const [ttsOn, setTtsOn] = useState(false);
  const recognitionRef = useRef<any>(null);
  const notifyErrorRef = useRef<((msg: string) => void) | null>(null);

  // ===== 端云协同：端侧语义缓存 =====
  const [edgeAiOn, setEdgeAiOn] = useState(false);
  const [edgeStatus, setEdgeStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const [edgeProgress, setEdgeProgress] = useState(0);
  const fullAnswerRef = useRef<string>('');

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('study-room-visibility', { detail: true }));
    return () => { window.dispatchEvent(new CustomEvent('study-room-visibility', { detail: false })); };
  }, []);

  // ===== A4 情绪记忆：挂载时读取，久别重逢会降亲密度并唤醒特殊反应 =====
  useEffect(() => {
    try {
      setTtsOn(window.localStorage.getItem('partjava-tts-on') === '1');
      setEdgeAiOn(window.localStorage.getItem('partjava-edge-ai') === '1');
      setPaperTheme(window.localStorage.getItem('heju-paper-theme') === '1');
    } catch {}
    const rec = loadAffection();
    const days = (Date.now() - rec.lastSeen) / 86400000;
    if (days > 1.5) {
      welcomeBackRef.current = days > 2; // 超过两天算久别重逢
      rec.score = Math.max(20, rec.score - 15);
    }
    rec.lastSeen = Date.now();
    saveAffection(rec);
    setAffection(rec.score);
    // 模型就绪后来一个「想念你」的开场反应
    setTimeout(() => {
      if (welcomeBackRef.current) {
        activeCatRef.current?.setMood('curious');
        activeCatRef.current?.triggerHappyJump();
      }
    }, 5200);
    // 页面关闭时持久化最近陪伴时间
    const onHide = () => saveAffection({ score: affectionRef.current, lastSeen: Date.now() });
    window.addEventListener('beforeunload', onHide);
    return () => window.removeEventListener('beforeunload', onHide);
  }, []);

  const affectionRef = useRef(affection);
  affectionRef.current = affection;

  const bumpAffection = useCallback((delta: number) => {
    setAffection(prev => {
      const next = Math.max(0, Math.min(100, prev + delta));
      saveAffection({ score: next, lastSeen: Date.now() });
      return next;
    });
  }, []);

  /** 给后端的伴侣状态提示（A4：影响回复语气） */
  const companionHint = useCallback((): string => {
    const score = affectionRef.current;
    if (welcomeBackRef.current) return '用户离开了好几天刚回来，可以自然地表达一点想念';
    if (score >= 75) return '用户与你是熟识伙伴，语气可以更亲昵放松';
    if (score < 30) return '你与用户还比较陌生，保持友好但稍微矜持';
    return '';
  }, []);

  // ===== 舞台情绪调度（B5/B8 的状态机） =====
  const setStageMoodTemp = useCallback((mood: StageMood, revertMs?: number) => {
    setStageMood(mood);
    if (stageMoodRevertRef.current) clearTimeout(stageMoodRevertRef.current);
    if (revertMs) {
      stageMoodRevertRef.current = setTimeout(() => setStageMood('idle'), revertMs);
    }
  }, []);

  // ===== B6 产出物飞行动画：从猫的位置抛出 emoji 到对话气泡 =====
  const spawnFlyEmojis = useCallback((emoji: string, count: number) => {
    const stage = stageContainerRef.current;
    const bubble = bubbleBoxRef.current;
    if (!stage || !bubble || typeof document === 'undefined') return;
    const sRect = stage.getBoundingClientRect();
    const bRect = bubble.getBoundingClientRect();
    for (let i = 0; i < count; i++) {
      const el = document.createElement('span');
      el.textContent = emoji;
      el.style.cssText = `position:fixed;z-index:2100;font-size:${18 + Math.random() * 10}px;pointer-events:none;left:0;top:0;filter:drop-shadow(0 2px 6px rgba(0,0,0,.5));`;
      document.body.appendChild(el);
      const sx = sRect.left + sRect.width * 0.42 + (Math.random() - 0.5) * 60;
      const sy = sRect.top + sRect.height * 0.55 + (Math.random() - 0.5) * 40;
      const ex = bRect.left + bRect.width * 0.3 + (Math.random() - 0.5) * 80;
      const ey = bRect.top + bRect.height * 0.35;
      const midX = (sx + ex) / 2 + (Math.random() - 0.5) * 120;
      const midY = Math.min(sy, ey) - 60 - Math.random() * 50;
      const anim = el.animate(
        [
          { transform: `translate(${sx}px, ${sy}px) scale(0.4)`, opacity: 0 },
          { transform: `translate(${midX}px, ${midY}px) scale(1.15)`, opacity: 1, offset: 0.55 },
          { transform: `translate(${ex}px, ${ey}px) scale(0.75)`, opacity: 0 },
        ],
        { duration: 620 + Math.random() * 220, delay: i * 90, easing: 'cubic-bezier(.22,.68,.44,1)' }
      );
      anim.onfinish = () => el.remove();
      anim.oncancel = () => el.remove();
    }
  }, []);

  const notifyError = useCallback((msg: string) => {
    setErrorBanner(msg);
    setTimeout(() => setErrorBanner(null), 4500);
  }, []);
  useEffect(() => { notifyErrorRef.current = notifyError; }, [notifyError]);

  // ===== 多模态开关 =====
  const toggleTts = useCallback(() => {
    setTtsOn(prev => {
      const next = !prev;
      try { window.localStorage.setItem('partjava-tts-on', next ? '1' : '0'); } catch {}
      if (!next && typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      return next;
    });
  }, []);

  const toggleEdgeAi = useCallback(async () => {
    const next = !edgeAiOn;
    setEdgeAiOn(next);
    try { window.localStorage.setItem('partjava-edge-ai', next ? '1' : '0'); } catch {}
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

  const toggleMic = useCallback(() => {
    if (typeof window === 'undefined') return;
    const SpeechRecognitionCtor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
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
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, showHistoryMode]);

  // ===== 3D 控制回调 =====
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

  const handlePetCat = () => {
    activeCatRef.current?.triggerHappyJump();
    bumpAffection(1);
  };

  const toggleVirtualProps = () => {
    const next = !showVirtualProps;
    setShowVirtualProps(next);
    if (virtualPropsRef.current) {
      virtualPropsRef.current.visible = next;
    }
  };

  const handleFaceTuningChange = (patch: Partial<CatFaceTuning>) => {
    const next = { ...faceTuning, ...patch };
    setFaceTuning(next);
    activeCatRef.current?.updateFaceTuning(patch);
  };

  const handleShaderChange = (opts: { rim?: number; whiteTip?: number; tufts?: boolean }) => {
    if (opts.rim !== undefined) setRimStrength(opts.rim);
    if (opts.whiteTip !== undefined) setWhiteTipStrength(opts.whiteTip);
    if (opts.tufts !== undefined) setShowFurTufts(opts.tufts);
    activeCatRef.current?.updateRimAndFur({
      rimStrength: opts.rim,
      whiteTipStrength: opts.whiteTip,
      showFurTufts: opts.tufts
    });
  };

  // ===== GLB 拖入 =====
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

  // ===== 笔记保存 =====
  const handleDirectSaveNote = async (noteData: any) => {
    if (!noteData || savingNote) return;
    setSavingNote(true);
    setSavedNoteTip(null);
    try {
      const payload = {
        title: noteData.title || `禾桔提炼笔记 - ${new Date().toLocaleString()}`,
        content: noteData.content || '',
        category: noteData.category || '后端',
        technology: noteData.technology || 'Java',
        subcategory: noteData.subcategory || '',
        tags: Array.isArray(noteData.tags)
          ? noteData.tags
          : String(noteData.tags || '').split(/[,，\s]+/).filter(Boolean),
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
      setStageMoodTemp('celebrate', 1300);
      setSavedNoteTip('已保存到我的笔记。');
      setShowNotePreview(false);
      bumpAffection(2);
    } catch (err: any) {
      notifyError(`保存笔记失败：${err?.message || '请检查登录状态'}`);
    } finally {
      setSavingNote(false);
    }
  };

  // ============================================================
  // 核心：Agent SSE 流式调度（驱动猫嘴 / 执行轨迹 / 思维气泡 / 灯光）
  // ============================================================
  const dispatchAgentMessage = async (
    rawText: string,
    opts?: { explicitAgent?: string; forceSearch?: boolean }
  ) => {
    const text = rawText.trim();
    if (!text || isTyping) return;

    const useSearch = opts?.forceSearch ?? enableWebSearchProxyRef.current;
    setShowBubble(true);
    setSavedNoteTip(null);
    fullAnswerRef.current = '';

    // A4：夸奖关键词提升亲密度
    if (/谢谢|爱你|可爱|真棒|厉害|摸摸|好猫|喜欢你/.test(text)) {
      bumpAffection(3);
    }

    // 端云协同：端侧语义缓存命中 → 离线秒回
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
            setStageMoodTemp('celebrate', 1200);
            if (ttsOn) speakAnswer(hit.a);
            return;
          }
        }
      } catch {
        /* 端侧不可用时静默走云端 */
      }
    }

    const userMsg: Message = { id: `u-${Date.now()}`, text, sender: 'user', timestamp: new Date() };
    const aiMsgId = `ai-${Date.now() + 1}`;
    const placeholderAiMsg: Message = {
      id: aiMsgId, text: '', sender: 'ai', timestamp: new Date(),
      siteLinks: [], citations: [], activeAgents: []
    };
    const historySnapshot = messages.slice(-6).map(m => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text
    }));

    setMessages(prev => [...prev, userMsg, placeholderAiMsg]);
    setInputValue('');
    setIsTyping(true);
    setSearchStatusText('正在整理回答…');
    setStageMoodTemp('thinking');
    setThought({ phase: 'thinking', icon: '💭', label: '思考中' });

    activeCatRef.current?.setMood('curious');
    activeCatRef.current?.setTalking(true);

    const { pathname, contextText } = collectCurrentPageContext();
    const hint = companionHint();

    try {
      const response = await fetch('/api/ai/agent/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: historySnapshot,
          pageContext: hint ? `${contextText}\n\n[伴侣状态提示：${hint}]` : contextText,
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
      let firstTokenSeen = false;

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
            if (ln.startsWith('event:')) eventName = ln.slice(6).trim();
            else if (ln.startsWith('data:')) dataRaw += ln.slice(5).trim();
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
                    ? { ...m, activeAgents: payload.activeAgents, modelUsed: payload.model, offline: !!payload.offline }
                    : m
                )
              );
            } else if (eventName === 'search_status') {
              setSearchStatusText(payload.text
                ? String(payload.text).replace(/DeepSeek[-\w.]*/gi, '搜索服务').replace(/\bPro\b\s*/gi, '')
                : null);
              if (payload.stage === 'searching') {
                setStageMoodTemp('searching');
                setThought({ phase: 'tool', icon: '🌐', label: '联网检索' });
              } else if (payload.stage === 'writing_note') {
                setThought({ phase: 'tool', icon: '📝', label: '提炼笔记' });
              }
            } else if (eventName === 'site_links') {
              setMessages(prev =>
                prev.map(m => (m.id === aiMsgId ? { ...m, siteLinks: payload.links || [] } : m))
              );
              if ((payload.links || []).length > 0) {
                spawnFlyEmojis('📖', Math.min(3, payload.links.length));
              }
            } else if (eventName === 'citations') {
              setSearchStatusText(null);
              setMessages(prev =>
                prev.map(m => (m.id === aiMsgId ? { ...m, citations: payload.citations || [] } : m))
              );
              if ((payload.citations || []).length > 0) {
                spawnFlyEmojis('🌐', 2);
              }
            } else if (eventName === 'note_draft') {
              setSearchStatusText(null);
              activeCatRef.current?.triggerHappyJump();
              if (payload.note) {
                setPreviewNote(payload.note);
                setShowNotePreview(true);
              }
              setMessages(prev =>
                prev.map(m => (m.id === aiMsgId ? { ...m, noteDraft: payload.note } : m))
              );
              spawnFlyEmojis('📝', 1);
            } else if (eventName === 'agent_step') {
              const step = {
                phase: payload.phase || 'act',
                tool: payload.tool,
                label: payload.label || payload.tool || '执行工具',
                detail: payload.detail,
                status: payload.status
              };
              setMessages(prev =>
                prev.map(m =>
                  m.id === aiMsgId ? { ...m, agentSteps: [...(m.agentSteps || []), step] } : m
                )
              );
              if (step.phase === 'act') {
                setSearchStatusText(`正在执行 ${step.label}…`);
                setThought({
                  phase: 'tool',
                  icon: TOOL_THOUGHT_ICON[step.tool || ''] || '⚙️',
                  label: step.label.replace(/^\S+\s/, '') || '执行工具',
                });
              } else if (step.phase === 'observe') {
                setSearchStatusText(null);
              }
            } else if (eventName === 'cat_command') {
              if (payload.posture === 'crouching' || payload.posture === 'standing') {
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
                if (!firstTokenSeen) {
                  firstTokenSeen = true;
                  setStageMoodTemp('speaking');
                  setThought({ phase: 'speaking', icon: '🗣', label: '回答中' });
                }
                fullAnswerRef.current += tokenText;
                activeCatRef.current?.setTalking(true);
                setMessages(prev =>
                  prev.map(m => (m.id === aiMsgId ? { ...m, text: m.text + tokenText } : m))
                );
              }
            } else if (eventName === 'done') {
              setSearchStatusText(null);
              activeCatRef.current?.setTalking(false);
              setThought(null);
              setStageMoodTemp('celebrate', 1300);
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
      setThought(null);
      try {
        const fallbackRes = await fetch('/api/ai/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text, pageContext: contextText })
        });
        const data = await fallbackRes.json();
        const reply = data?.reply || data?.answer || '喵~ 我刚刚走神啦，请再和我说一次吧！';
        setMessages(prev => prev.map(m => (m.id === aiMsgId ? { ...m, text: reply } : m)));
      } catch {
        setMessages(prev =>
          prev.map(m =>
            m.id === aiMsgId
              ? { ...m, text: '喵呜~ 网络好像打了个盹，你可以试试点击下方快捷按钮或稍后重试🐾' }
              : m
          )
        );
      }
    } finally {
      setIsTyping(false);
      setSearchStatusText(null);
      setThought(null);
      setTimeout(() => {
        activeCatRef.current?.setTalking(false);
      }, 450);
    }
  };

  // enableWebSearch 在 dispatch 闭包里的最新值
  const [enableWebSearch, setEnableWebSearch] = useState(false);
  const enableWebSearchProxyRef = useRef(enableWebSearch);
  enableWebSearchProxyRef.current = enableWebSearch;

  // 用户输入活动（驱动猫看输入框）
  const handleInputChange = useCallback((v: string) => {
    setInputValue(v);
    setUserTyping(true);
    if (userTypingTimerRef.current) clearTimeout(userTypingTimerRef.current);
    userTypingTimerRef.current = setTimeout(() => setUserTyping(false), 2200);
  }, []);

  const latestAiMessage = [...messages].reverse().find(m => m.sender === 'ai') || messages[0];
  const latestUserMessage = [...messages].reverse().find(m => m.sender === 'user');

  const handleNavigate = useCallback((href: string) => {
    onClose();
    router.push(href);
  }, [onClose, router]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="温暖书房"
      style={{ zIndex: 2000 }}
      className="fixed inset-0 z-[2000] bg-black/65 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-fadeIn"
    >
      <div
        className={`${styles.dialog} ${paperTheme ? styles.paperTheme : ''} bg-[#1c1a17] rounded-2xl shadow-2xl animate-slideUp w-full h-full max-w-6xl max-h-[95vh] flex flex-col overflow-hidden border border-[#d4a36a]/25`}
        onDragOver={e => { e.preventDefault(); setIsDraggingOver(true); }}
        onDragLeave={e => { if (!e.relatedTarget) setIsDraggingOver(false); }}
        onDrop={handleDropGLB}
      >
        {/* 顶部栏 + 外观设置 */}
        <div className={styles.header}>
          <div className={styles.brand}>
            <span aria-hidden="true" className={styles.brandDot} />
            <span>PartJava · 温暖书房</span>
            <span className={styles.affectionMeter} title={`亲密度 ${affection}/100：常来陪禾桔、夸夸它会让它更活泼`}>
              {'❤'.repeat(Math.max(1, Math.round(affection / 25)))}
              <span className={styles.affectionNum}>{affection}</span>
            </span>
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
              <div className={styles.settingsTitle}>书房与禾桔</div>
              <div className="flex items-center bg-[#141210] p-0.5 rounded-lg border border-[#d4a36a]/25">
                <button
                  onClick={() => activatePostureModel('standing')}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                    posture === 'standing' ? 'bg-[#d4a36a] text-[#1c1a17] shadow-sm font-semibold' : 'text-[#e9dac3]/80 hover:text-white'
                  }`}
                >
                  🐱 乖巧坐姿
                </button>
                <button
                  onClick={() => activatePostureModel('crouching')}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                    posture === 'crouching' ? 'bg-[#d4a36a] text-[#1c1a17] shadow-sm font-semibold' : 'text-[#e9dac3]/80 hover:text-white'
                  }`}
                >
                  🐾 爬起站姿
                </button>
              </div>

              <button
                onClick={() => { setShowBubble(true); setBubbleSide(prev => (prev === 'right' ? 'left' : 'right')); }}
                className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs border border-[#d4a36a]/40 bg-[#141210] text-[#f7efe4] hover:bg-[#d4a36a]/20 transition-all"
                title="调整聊天窗位置"
              >
                {bubbleSide === 'right' ? '聊天窗移到左侧' : '聊天窗移到右侧'}
              </button>

              <button
                onClick={handlePetCat}
                className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs border border-[#d4a36a]/40 bg-[#d4a36a]/15 text-[#f7efe4] hover:bg-[#d4a36a]/30 transition-all"
                title="点击触发 ^ ^ 眯眼笑跳跃互动"
              >
                摸摸禾桔
              </button>

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

              <button
                onClick={() => {
                  setPaperTheme(p => {
                    const next = !p;
                    try { window.localStorage.setItem('heju-paper-theme', next ? '1' : '0'); } catch {}
                    return next;
                  });
                }}
                className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs border transition-all ${
                  paperTheme
                    ? 'bg-[#d4a36a] text-[#1c1a17] border-[#d4a36a] font-semibold'
                    : 'bg-[#141210] border-white/15 text-[#e9dac3]/80 hover:text-white'
                }`}
                title="对话 UI 切换为宣纸暖光配色，与主站纸墨风呼应"
              >
                {paperTheme ? '📜 宣纸暖光：开' : '📜 宣纸暖光'}
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

        {/* 3D 舞台 + 对话气泡 + 输入坞 */}
        <div className="flex-1 relative bg-[#1c1a17] overflow-hidden">
          <div ref={stageContainerRef} className="absolute inset-0">
            <CatStage
              containerRef={stageContainerRef}
              bubbleBoxRef={bubbleBoxRef}
              robotAnchorRef={robotAnchorRef}
              virtualPropsRef={virtualPropsRef}
              riggedCatsRef={riggedCatsRef}
              activeCatRef={activeCatRef}
              activatePostureModel={activatePostureModel}
              isLoading={isLoading}
              loadingProgress={loadingProgress}
              isTyping={isTyping}
              userTyping={userTyping}
              micListening={micListening}
              stageMood={stageMood}
              thought={thought}
              affection={affection}
              bubbleSide={bubbleSide}
              onCatClick={() => { setShowBubble(true); bumpAffection(1); }}
              onPetRegion={() => bumpAffection(2)}
              onProgress={pct => setLoadingProgress(prev => Math.max(prev, Math.min(99, Math.round(pct))))}
              onModelReady={() => { setLoadingProgress(100); setIsLoading(false); }}
              showTuningPanel={showTuningPanel}
              rimStrength={rimStrength}
              whiteTipStrength={whiteTipStrength}
              faceTuning={faceTuning}
              showFurTufts={showFurTufts}
              onShaderChange={handleShaderChange}
              onFaceTuningChange={handleFaceTuningChange}
              onCloseTuning={() => setShowTuningPanel(false)}
              isDraggingOver={isDraggingOver}
              errorBanner={errorBanner}
            />
          </div>

          {!isLoading && showBubble && (
            <ChatPanel
              bubbleBoxRef={bubbleBoxRef}
              messagesEndRef={messagesEndRef}
              bubbleSide={bubbleSide}
              isTyping={isTyping}
              showHistoryMode={showHistoryMode}
              messages={messages}
              latestAiMessage={latestAiMessage}
              latestUserMessage={latestUserMessage}
              searchStatusText={searchStatusText}
              savingNote={savingNote}
              savedNoteTip={savedNoteTip}
              onToggleHistory={() => setShowHistoryMode(!showHistoryMode)}
              onToggleSide={() => setBubbleSide(prev => (prev === 'right' ? 'left' : 'right'))}
              onCollapse={() => setShowBubble(false)}
              onNavigate={handleNavigate}
              onPreviewNote={(note) => { setPreviewNote(note); setShowNotePreview(true); }}
            />
          )}

          {/* 气泡收起时的一键唤起 */}
          {!isLoading && !showBubble && (
            <button
              onClick={() => setShowBubble(true)}
              className="absolute top-4 right-4 z-10 px-3.5 py-2 rounded-full bg-[#1a1714]/90 border border-[#d4a36a]/50 text-[#f7efe4] text-xs shadow-xl hover:bg-[#d4a36a] hover:text-[#1c1a17] transition-all font-semibold"
            >
              打开对话
            </button>
          )}

          {!isLoading && (
            <Composer
              isTyping={isTyping}
              inputValue={inputValue}
              setInputValue={handleInputChange}
              onSend={dispatchAgentMessage}
              onShortcut={(t, o) => dispatchAgentMessage(t, o)}
              enableWebSearch={enableWebSearch}
              onToggleSearch={() => setEnableWebSearch(!enableWebSearch)}
              ttsOn={ttsOn}
              onToggleTts={toggleTts}
              edgeAiOn={edgeAiOn}
              edgeStatus={edgeStatus}
              edgeProgress={edgeProgress}
              onToggleEdge={toggleEdgeAi}
              micListening={micListening}
              onToggleMic={toggleMic}
            />
          )}
        </div>
      </div>

      {/* 笔记预览与微调弹窗 */}
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

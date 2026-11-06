'use client';

export type PetCompanionEventType =
  | 'celebrate'
  | 'error_diagnosis'
  | 'stuck_hint'
  | 'info';

export interface PetCompanionEventDetail {
  id?: string;
  type: PetCompanionEventType;
  title: string;
  message: string;
  promptToAsk?: string;
  mood?: 'happy' | 'curious' | 'normal';
  speak?: boolean;
  durationMs?: number;
}

const EVENT_NAME = 'partjava-pet-companion-event';
const SPEAK_STATE_EVENT = 'partjava-pet-speaking-state';

/**
 * 向全站顶栏 AI 助手按钮与 3D 灵宠「禾桔」广播主动伴学事件
 */
export function emitPetCompanionEvent(detail: PetCompanionEventDetail) {
  if (typeof window === 'undefined') return;
  const payload: PetCompanionEventDetail = {
    id: detail.id || `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    durationMs: 9000,
    ...detail,
  };
  window.dispatchEvent(new CustomEvent<PetCompanionEventDetail>(EVENT_NAME, { detail: payload }));

  if (detail.speak) {
    speakWithHeju(detail.message);
  }
}

export function subscribePetCompanionEvent(
  handler: (detail: PetCompanionEventDetail) => void
): () => void {
  if (typeof window === 'undefined') return () => {};
  const listener = (e: Event) => {
    const custom = e as CustomEvent<PetCompanionEventDetail>;
    if (custom.detail) {
      handler(custom.detail);
    }
  };
  window.addEventListener(EVENT_NAME, listener);
  return () => window.removeEventListener(EVENT_NAME, listener);
}

/**
 * 使用浏览器 Web Speech API 让「禾桔」朗读指定文本，并同步广播口型开合状态
 */
export function speakWithHeju(text: string, onEnd?: () => void) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    onEnd?.();
    return;
  }
  try {
    window.speechSynthesis.cancel();
    const cleaned = text
      .replace(/```[\s\S]*?```/g, '代码片段')
      .replace(/[`#*>-]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 260);
    if (!cleaned) {
      onEnd?.();
      return;
    }

    const utter = new SpeechSynthesisUtterance(cleaned);
    utter.lang = 'zh-CN';
    utter.rate = 1.05;
    utter.pitch = 1.15;

    utter.onstart = () => {
      window.dispatchEvent(new CustomEvent<boolean>(SPEAK_STATE_EVENT, { detail: true }));
    };
    utter.onend = () => {
      window.dispatchEvent(new CustomEvent<boolean>(SPEAK_STATE_EVENT, { detail: false }));
      onEnd?.();
    };
    utter.onerror = () => {
      window.dispatchEvent(new CustomEvent<boolean>(SPEAK_STATE_EVENT, { detail: false }));
      onEnd?.();
    };

    window.speechSynthesis.speak(utter);
  } catch {
    onEnd?.();
  }
}

export function stopHejuSpeech() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    window.dispatchEvent(new CustomEvent<boolean>(SPEAK_STATE_EVENT, { detail: false }));
  } catch {}
}

export function subscribePetSpeakingState(handler: (speaking: boolean) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const listener = (e: Event) => {
    handler(Boolean((e as CustomEvent<boolean>).detail));
  };
  window.addEventListener(SPEAK_STATE_EVENT, listener);
  return () => window.removeEventListener(SPEAK_STATE_EVENT, listener);
}

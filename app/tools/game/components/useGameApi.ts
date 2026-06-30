'use client';

import { useCallback, useRef, useState } from 'react';

export interface GameStateData {
  gameId: string;
  gameType: string;
  gameOver: boolean;
  score: number;
  winner: string | null;
  state: any; // 游戏特定的状态
}

/** 统一的游戏 API 钩子 */
export function useGameApi(gameType: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  /** 创建新游戏 */
  const createGame = useCallback(async (config?: Record<string, any>): Promise<GameStateData | null> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/game/${gameType}/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: config ? JSON.stringify(config) : '{}',
      });
      if (!res.ok) throw new Error(`创建游戏失败: ${res.status}`);
      return await res.json();
    } catch (e: any) {
      setError(e.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [gameType]);

  /** 执行操作 (回合制) */
  const makeMove = useCallback(async (gameId: string, action: string, payload?: Record<string, any>): Promise<GameStateData | null> => {
    try {
      const res = await fetch(`/api/game/${gameType}/${gameId}/move`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, payload: payload || {} }),
      });
      if (!res.ok) throw new Error(`操作失败: ${res.status}`);
      return await res.json();
    } catch (e: any) {
      setError(e.message);
      return null;
    }
  }, [gameType]);

  /** 获取当前状态 */
  const getState = useCallback(async (gameId: string): Promise<GameStateData | null> => {
    try {
      const res = await fetch(`/api/game/${gameType}/${gameId}`);
      if (!res.ok) throw new Error(`获取状态失败: ${res.status}`);
      return await res.json();
    } catch (e: any) {
      setError(e.message);
      return null;
    }
  }, [gameType]);

  /** 发送输入 (实时游戏) */
  const sendInput = useCallback(async (gameId: string, action: string, payload?: Record<string, any>): Promise<GameStateData | null> => {
    try {
      const res = await fetch(`/api/game/${gameType}/${gameId}/input`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, payload: payload || {} }),
      });
      if (!res.ok) throw new Error(`发送输入失败: ${res.status}`);
      return await res.json();
    } catch (e: any) {
      setError(e.message);
      return null;
    }
  }, [gameType]);

  /** 开始 SSE 流 (实时游戏, 调用 onState 回调) */
  const startStream = useCallback((gameId: string, onState: (data: GameStateData) => void) => {
    stopStream();
    const es = new EventSource(`/api/game/${gameType}/${gameId}/stream`);
    es.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onState(data);
      } catch { /* ignore parse errors */ }
    };
    es.onerror = () => { es.close(); };
    eventSourceRef.current = es;
  }, [gameType]);

  const stopStream = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
  }, []);

  /** 停止游戏 */
  const stopGame = useCallback(async (gameId: string) => {
    stopStream();
    try {
      await fetch(`/api/game/${gameType}/${gameId}/stop`, { method: 'POST' });
    } catch { /* ignore */ }
  }, [gameType, stopStream]);

  return { createGame, makeMove, getState, sendInput, startStream, stopStream, stopGame, loading, error };
}

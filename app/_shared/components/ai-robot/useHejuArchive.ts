import { useCallback, useEffect, useRef, useState } from 'react';
import { archiveRequest, type ArchivedConversation, type ArchivedMessage } from './archive-client';
import type { Message } from './types';

export function welcomeMessages(): Message[] {
  return [{ id: 'welcome-1', text: '我是禾桔，陪你一起学习。\n\n可以帮你解释知识点、找站内课程，或把对话整理成笔记。', sender: 'ai', timestamp: new Date() }];
}

export function useHejuArchive(account: string | null, setMessages: React.Dispatch<React.SetStateAction<Message[]>>) {
  const [sessions, setSessions] = useState<ArchivedConversation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<number | null>(null);
  const activeRef = useRef<number | null>(null);
  const ownerRef = useRef(account);
  const generation = useRef(0);
  ownerRef.current = account;
  useEffect(() => {
    generation.current++;
    activeRef.current = null; setActiveId(null); setSessions([]); setError(null); setLoading(false);
    setMessages(welcomeMessages());
  }, [account, setMessages]);
  useEffect(() => () => { generation.current++; }, []);

  const refresh = useCallback(async () => {
    if (!account) return;
    const current = generation.current;
    setLoading(true); setError(null);
    try {
      const data = await archiveRequest<{conversations: ArchivedConversation[]}>('');
      if (current === generation.current && ownerRef.current === account) setSessions(data.conversations || []);
    } catch (error) {
      if (current === generation.current) setError(error instanceof Error ? error.message : '历史加载失败');
    } finally { if (current === generation.current) setLoading(false); }
  }, [account]);

  const choose = useCallback(async (id: number) => {
    if (!account) return false;
    const current = ++generation.current;
    setLoading(true); setError(null);
    try {
      const data = await archiveRequest<{messages: ArchivedMessage[]}>(`/${id}/messages`);
      if (current !== generation.current || ownerRef.current !== account) return false;
      setMessages(data.messages.filter(item => item.role === 'user' || item.role === 'assistant').map(item => ({
        id: `archive-${item.id}`, text: item.content, sender: item.role === 'user' ? 'user' : 'ai', timestamp: new Date(item.createdAt),
      })));
      activeRef.current = id; setActiveId(id); return true;
    } catch (error) {
      if (current === generation.current) setError(error instanceof Error ? error.message : '对话加载失败');
      return false;
    } finally { if (current === generation.current) setLoading(false); }
  }, [account, setMessages]);

  const newChat = useCallback(() => {
    generation.current++;
    activeRef.current = null; setActiveId(null); setError(null); setLoading(false); setMessages(welcomeMessages());
  }, [setMessages]);

  const save = useCallback(async (userMessage: string, assistantMessage: string) => {
    if (!account || ownerRef.current !== account || !assistantMessage.trim()) return;
    const current = generation.current;
    try {
      let id = activeRef.current;
      if (!id) {
        const created = await archiveRequest<{id: number}>('', {method: 'POST'});
        if (current !== generation.current || ownerRef.current !== account) return;
        id = created.id;
        activeRef.current = id; setActiveId(id);
      }
      if (current !== generation.current || ownerRef.current !== account) return;
      await archiveRequest(`/${id}/messages`, {method: 'POST', body: JSON.stringify({userMessage, assistantMessage})});
      if (current === generation.current && ownerRef.current === account) setError(null);
    } catch {
      if (current === generation.current) setError('这轮对话未能保存到账户，当前窗口仍可查看；关闭后可能丢失。');
    }
  }, [account]);
  return { sessions, loading, error, activeId, refresh, choose, newChat, save };
}

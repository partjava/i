export interface ArchivedConversation { id: number; title: string; updatedAt: string; firstMsg?: string; }
export interface ArchivedMessage { id: number; role: 'user' | 'assistant'; content: string; createdAt: string; }
export async function archiveRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`/api/ai/conversations${path}`, {
    credentials: 'include', cache: 'no-store', ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  });
  const body = await response.json().catch(() => null);
  if (!response.ok || !body || body.success === false) throw new Error(body?.message || '会话请求失败，请重试');
  return body.data ?? body;
}

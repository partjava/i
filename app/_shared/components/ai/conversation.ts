export interface ConversationMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  failed?: boolean;
}

export function meaningfulMessages<T extends ConversationMessage>(messages: T[]): T[] {
  return messages.filter(message => message.content.trim() && !message.failed
    && !/^(welcome|err-|sys-)/.test(message.id));
}

export function conversationHistory(messages: ConversationMessage[]) {
  return meaningfulMessages(messages).slice(-8).map(({ role, content }) => ({ role, content: content.slice(0, 3000) }));
}

export function conversationText(messages: ConversationMessage[]) {
  const useful = meaningfulMessages(messages);
  if (!useful.some(message => message.role === 'user')) return '';
  return useful.map(message => `${message.role === 'user' ? '我' : 'AI助手'}: ${message.content}`).join('\n');
}

/** Build a page-isolated sessionStorage key so conversations never leak across routes or accounts. */
export function buildPageStorageKey(baseKey: string, userScope: string | number | undefined, pathname: string | null | undefined): string {
  const cleanUser = String(userScope || 'guest').trim() || 'guest';
  const cleanPath = (pathname || '/').trim().replace(/\/+$/, '') || '/';
  return `${baseKey}:${cleanUser}:${cleanPath}`;
}

/** Normalize legacy brand names ("PartJava 学习助手") in cached messages. */
export function sanitizeLegacyAssistantText(text: string): string {
  return String(text || '').replace(/PartJava\s*学习助手/gi, '禾硙 AI 助手');
}

/** Hash all context so local matching cannot reuse another account/page/dialogue's answer. */
export async function cacheScope(account: string, pathname: string, page: string, history: unknown): Promise<string> {
  const data = new TextEncoder().encode(JSON.stringify([account, pathname, page, history]));
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash), byte => byte.toString(16).padStart(2, '0')).join('');
}

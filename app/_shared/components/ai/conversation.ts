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

/** Hash all context so local matching cannot reuse another account/page/dialogue's answer. */
export async function cacheScope(account: string, pathname: string, page: string, history: unknown): Promise<string> {
  const data = new TextEncoder().encode(JSON.stringify([account, pathname, page, history]));
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash), byte => byte.toString(16).padStart(2, '0')).join('');
}

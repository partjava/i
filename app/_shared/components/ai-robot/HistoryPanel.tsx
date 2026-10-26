import type { ArchivedConversation } from './archive-client';

export default function HistoryPanel({sessions, loading, error, signedIn, disabled, activeId, onChoose, onRefresh, onNew, onCurrent, onClose}: {
  sessions: ArchivedConversation[]; loading: boolean; error: string | null; signedIn: boolean; disabled: boolean; activeId: number | null;
  onChoose: (id: number) => void; onRefresh: () => void; onNew: () => void; onCurrent: () => void; onClose: () => void;
}) {
  return <section role="dialog" aria-label="禾桔对话历史" className="absolute inset-x-3 top-4 sm:left-auto sm:right-5 sm:w-[420px] z-40 max-h-[75%] flex flex-col rounded-2xl border border-[#d4a36a]/40 bg-[#24201c] text-[#f4eadc] shadow-2xl">
    <div className="flex items-center justify-between gap-2 p-4 border-b border-white/10">
      <strong>对话历史</strong><button onClick={onClose} aria-label="关闭对话历史">关闭</button>
    </div>
    <div className="flex gap-3 p-3 text-sm border-b border-white/10">
      <button disabled={disabled || loading} onClick={onNew}>新对话</button>
      <button onClick={onCurrent}>当前对话</button>
      {signedIn && <button disabled={loading || disabled} onClick={onRefresh}>刷新列表</button>}
    </div>
    <div className="overflow-y-auto p-3 space-y-2 text-sm">
      {!signedIn && <p>登录后可以保存和查看该账号的历史会话。游客对话只保留在当前窗口。</p>}
      {error && <p role="alert" className="text-amber-200">{error}</p>}
      {loading && <p role="status">正在加载对话…</p>}
      {signedIn && !loading && !error && sessions.length === 0 && <p className="text-[#c8bba9]">暂无已保存的会话。以前未保存的窗口对话无法从服务器恢复。</p>}
      {sessions.map(item => <button key={item.id} disabled={disabled || loading} onClick={() => onChoose(item.id)} className={`block w-full text-left rounded-xl p-3 border ${activeId === item.id ? 'border-[#d4a36a] bg-white/10' : 'border-white/10 hover:bg-white/5'}`}>
        <span className="block truncate">{item.title || '未命名对话'}</span>
        <time className="block mt-1 text-xs text-[#c8bba9]">{new Date(item.updatedAt).toLocaleString('zh-CN')}</time>
      </button>)}
    </div>
  </section>;
}

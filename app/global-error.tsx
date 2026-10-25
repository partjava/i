'use client';

/**
 * 全局错误边界（App Router 约定文件）
 * 根布局本身抛错时触发，必须自带 <html>/<body> 结构。
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="zh">
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#faf6f0',
            padding: '24px',
          }}
        >
          <div
            style={{
              maxWidth: 420,
              textAlign: 'center',
              padding: '48px 32px',
              borderRadius: 24,
              border: '1px solid rgba(139,115,85,0.25)',
              background: 'rgba(255,255,255,0.7)',
            }}
          >
            <div style={{ fontSize: 44, marginBottom: 16 }}>🙀</div>
            <h1 style={{ fontSize: 22, color: '#5c4033', margin: '0 0 8px' }}>应用出现了异常</h1>
            <p style={{ fontSize: 13, color: '#8b7355', lineHeight: 1.7, margin: '0 0 20px' }}>
              根组件渲染失败，页面没能加载出来。
              <br />
              {error.digest ? `错误标识：${error.digest}` : '请稍后重试。'}
            </p>
            <button
              onClick={reset}
              style={{
                padding: '10px 24px',
                borderRadius: 12,
                border: 'none',
                background: '#8b7355',
                color: '#faf6f0',
                fontSize: 14,
                cursor: 'pointer',
              }}
            >
              重新加载
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}

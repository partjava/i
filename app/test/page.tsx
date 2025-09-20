export default function TestPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">测试页面</h1>
      <p>如果你能看到这个页面，说明基本路由工作正常。</p>
      <p>当前时间：{new Date().toLocaleString()}</p>
    </div>
  )
} 
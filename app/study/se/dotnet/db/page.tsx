'use client';
export default function DotnetDbPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">数据库与EF Core</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">数据库连接字符串</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=demo;User Id=sa;Password=your_password;"
}`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">EF Core实体与上下文</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`public class User {
    public int Id { get; set; }
    public string Name { get; set; }
}
public class AppDbContext : DbContext {
    public DbSet<User> Users { get; set; }
}`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">数据迁移与更新</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`# 添加迁移
dotnet ef migrations add Init
# 更新数据库
dotnet ef database update`}
        </pre>
      </div>
      <div className="mt-10 flex justify-between">
        <a href="/study/se/dotnet/web" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← ASP.NET Web开发
        </a>
        <a href="/study/se/dotnet/service" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          服务与中间件 →
        </a>
      </div>
    </div>
  );
} 
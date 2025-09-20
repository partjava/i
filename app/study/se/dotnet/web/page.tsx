'use client';
export default function DotnetWebPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">ASP.NET Web开发</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">MVC控制器示例</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`public class HomeController : Controller {
    public IActionResult Index() {
        return View();
    }
}`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">Web API示例</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase {
    [HttpGet]
    public IEnumerable<string> Get() => new[] { "Tom", "Jerry" };
}`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">路由与中间件</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`app.UseRouting();
app.UseEndpoints(endpoints => {
    endpoints.MapControllers();
});`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">Razor视图</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`<h1>Hello @Model.Name</h1>`}
        </pre>
      </div>
      <div className="mt-10 flex justify-between">
        <a href="/study/se/dotnet/csharp" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← C#基础与语法
        </a>
        <a href="/study/se/dotnet/db" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          数据库与EF Core →
        </a>
      </div>
    </div>
  );
} 
 'use client';
export default function DotnetCSharpPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">C#基础与语法</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">基本语法与数据类型</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`int a = 10;
string name = "Tom";
bool isActive = true;`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">面向对象编程</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`public class Person {
    public string Name { get; set; }
    public void SayHello() {
        Console.WriteLine($"Hello, {Name}");
    }
}`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">委托与事件</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`public delegate void Notify(string msg);
public event Notify OnNotify;`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">LINQ用法</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`var nums = new List<int> {1,2,3,4};
var even = nums.Where(n => n % 2 == 0).ToList();`}
        </pre>
      </div>
      <div className="mt-10 flex justify-between">
        <a href="/study/se/dotnet/setup" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← 开发环境配置
        </a>
        <a href="/study/se/dotnet/web" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ASP.NET Web开发 →
        </a>
      </div>
    </div>
  );
}
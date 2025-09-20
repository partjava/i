'use client';
export default function AndroidTestingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">测试与发布</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">单元测试（JUnit）</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`@Test
public void testAdd() {
    assertEquals(4, 2 + 2);
}`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">UI自动化测试（Espresso）</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`onView(withId(R.id.btn_click)).perform(click());
onView(withId(R.id.tv_hello)).check(matches(withText("Hello Android")));`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">打包与签名</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`// 生成签名密钥
keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-key`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">发布到应用市场</h2>
        <ul className="mb-4 space-y-2 text-gray-700">
          <li>• 生成release APK</li>
          <li>• 填写应用信息与截图</li>
          <li>• 上传APK并提交审核</li>
        </ul>
      </div>
      <div className="mt-10 flex justify-between">
        <a href="/study/se/android/frameworks" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← 第三方库与架构模式
        </a>
        <a href="/study/se/android/projects" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          实战项目与案例 →
        </a>
      </div>
    </div>
  );
} 
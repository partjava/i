'use client';
export default function AndroidIntroPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">安卓开发概述</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">平台简介</h2>
        <p className="mb-4 text-gray-700">Android是基于Linux的开源移动操作系统，广泛应用于手机、平板、智能硬件等领域。</p>
        <h2 className="text-2xl font-bold mb-4">发展历程</h2>
        <ul className="mb-4 space-y-2 text-gray-700">
          <li>• 2008年首个Android手机发布</li>
          <li>• 2014年Android成为全球最大移动平台</li>
          <li>• 持续迭代，支持多种设备形态</li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">主流应用场景</h2>
        <ul className="mb-4 space-y-2 text-gray-700">
          <li>• 移动App开发</li>
          <li>• 物联网与智能硬件</li>
          <li>• 车载系统、电视、可穿戴设备</li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">Hello World代码示例</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }
}`}
        </pre>
      </div>
      <div className="mt-10 flex justify-end">
        <a href="/study/se/android/setup" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          开发环境配置 →
        </a>
      </div>
    </div>
  );
} 
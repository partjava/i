'use client';
export default function CloudBasicPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">云服务基础</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">云服务类型</h2>
        <ul className="mb-4 space-y-2 text-gray-700">
          <li>• 公有云：如阿里云、腾讯云、AWS</li>
          <li>• 私有云：企业自建云平台</li>
          <li>• 混合云：公有云+私有云结合</li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">主流云服务商对比</h2>
        <table className="mb-4 w-full text-left border">
          <thead><tr><th className="border px-2">厂商</th><th className="border px-2">代表产品</th></tr></thead>
          <tbody>
            <tr><td className="border px-2">阿里云</td><td className="border px-2">ECS、OSS、RDS</td></tr>
            <tr><td className="border px-2">腾讯云</td><td className="border px-2">CVM、COS、CDB</td></tr>
            <tr><td className="border px-2">AWS</td><td className="border px-2">EC2、S3、RDS</td></tr>
            <tr><td className="border px-2">Azure</td><td className="border px-2">VM、Blob、SQL Database</td></tr>
          </tbody>
        </table>
        <h2 className="text-2xl font-bold mb-4">云服务API调用示例</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`import aliyunsdkcore.client
client = aliyunsdkcore.client.AcsClient(...)
# 调用云API`}
        </pre>
      </div>
      <div className="mt-10 flex justify-between">
        <a href="/study/se/cloud/intro" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← 概述
        </a>
        <a href="/study/se/cloud/container" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          虚拟化与容器化 →
        </a>
      </div>
    </div>
  );
} 
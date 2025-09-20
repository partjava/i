'use client';
export default function CloudIntroPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">云计算概述</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">云计算定义</h2>
        <p className="mb-4 text-gray-700">云计算是一种基于互联网的计算方式，通过虚拟化技术将计算、存储、网络等资源以服务形式提供，按需分配、弹性伸缩。</p>
        <h2 className="text-2xl font-bold mb-4">发展历程</h2>
        <ul className="mb-4 space-y-2 text-gray-700">
          <li>• 2006年AWS提出云计算概念</li>
          <li>• 2010年后云服务商快速发展</li>
          <li>• 2020年云原生、Serverless等新趋势</li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">主流服务模式</h2>
        <ul className="mb-4 space-y-2 text-gray-700">
          <li>• IaaS：基础设施即服务（如ECS、虚拟机）</li>
          <li>• PaaS：平台即服务（如数据库、消息队列）</li>
          <li>• SaaS：软件即服务（如企业邮箱、在线协作）</li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">云计算Hello World（Python调用云API）</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`import boto3
client = boto3.client('s3')
for bucket in client.list_buckets()['Buckets']:
    print(bucket['Name'])`}
        </pre>
      </div>
      <div className="mt-10 flex justify-end">
        <a href="/study/se/cloud/basic" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          云服务基础 →
        </a>
      </div>
    </div>
  );
} 
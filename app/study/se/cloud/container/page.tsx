'use client';
export default function CloudContainerPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">虚拟化与容器化</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">虚拟机与容器对比</h2>
        <ul className="mb-4 space-y-2 text-gray-700">
          <li>• 虚拟机：资源隔离好，启动慢，资源占用高</li>
          <li>• 容器：轻量级，启动快，易于弹性伸缩</li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">Docker基础命令</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`docker build -t myapp .
docker run -d -p 8080:80 myapp`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">Kubernetes部署示例</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: 2
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: myapp
        image: myapp:latest
        ports:
        - containerPort: 80`}
        </pre>
      </div>
      <div className="mt-10 flex justify-between">
        <a href="/study/se/cloud/basic" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← 云服务基础
        </a>
        <a href="/study/se/cloud/storage" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          云存储与数据库 →
        </a>
      </div>
    </div>
  );
} 
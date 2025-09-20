'use client';
export default function CloudProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">实战案例与应用</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">典型云上架构设计</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`# 三层架构：负载均衡+应用层+数据库
- SLB -> ECS集群 -> RDS数据库`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">云原生应用部署</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`kubectl apply -f deployment.yaml
kubectl get pods`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">常见问题与面试题</h2>
        <ul className="mb-4 space-y-2 text-gray-700">
          <li>• 云计算和传统IT架构的区别？</li>
          <li>• 如何保障云上数据安全？</li>
          <li>• 云原生的优势有哪些？</li>
        </ul>
      </div>
      <div className="mt-10 flex justify-start">
        <a href="/study/se/cloud/devops" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← 自动化与DevOps
        </a>
      </div>
    </div>
  );
} 
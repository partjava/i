'use client';
export default function CloudSecurityPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">云安全与合规</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">云安全挑战</h2>
        <ul className="mb-4 space-y-2 text-gray-700">
          <li>• 数据泄露与访问控制</li>
          <li>• DDoS攻击与防护</li>
          <li>• 多租户隔离</li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">身份与访问管理（IAM）</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`# 创建子用户并授权
aws iam create-user --user-name devuser
aws iam attach-user-policy --user-name devuser --policy-arn arn:aws:iam::aws:policy/AdministratorAccess`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">合规标准</h2>
        <ul className="mb-4 space-y-2 text-gray-700">
          <li>• ISO 27001</li>
          <li>• 等保合规</li>
          <li>• GDPR</li>
        </ul>
      </div>
      <div className="mt-10 flex justify-between">
        <a href="/study/se/cloud/storage" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← 云存储与数据库
        </a>
        <a href="/study/se/cloud/devops" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          自动化与DevOps →
        </a>
      </div>
    </div>
  );
} 
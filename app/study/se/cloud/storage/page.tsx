'use client';
export default function CloudStoragePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">云存储与数据库</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">对象存储（OSS/S3）</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`# AWS S3上传文件
import boto3
s3 = boto3.client('s3')
s3.upload_file('local.txt', 'mybucket', 'remote.txt')`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">块存储与文件存储</h2>
        <ul className="mb-4 space-y-2 text-gray-700">
          <li>• 块存储：适合数据库、虚拟机磁盘</li>
          <li>• 文件存储：适合共享文件、NFS</li>
        </ul>
        <h2 className="text-2xl font-bold mb-4">云数据库（RDS/NoSQL）</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`# 连接云数据库
import pymysql
conn = pymysql.connect(host='rds.aliyuncs.com', user='root', password='***')`}
        </pre>
      </div>
      <div className="mt-10 flex justify-between">
        <a href="/study/se/cloud/container" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← 虚拟化与容器化
        </a>
        <a href="/study/se/cloud/security" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          云安全与合规 →
        </a>
      </div>
    </div>
  );
} 
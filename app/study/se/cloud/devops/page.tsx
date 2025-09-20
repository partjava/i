'use client';
export default function CloudDevopsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">自动化与DevOps</h1>
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-4">基础设施即代码（IaC）</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`# Terraform创建ECS
resource "alicloud_instance" "web" {
  instance_name = "web-1"
  ...
}`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">CI/CD流水线</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
{`stages:
  - build
  - deploy
build:
  script: mvn package
deploy:
  script: kubectl apply -f k8s/`}
        </pre>
        <h2 className="text-2xl font-bold mb-4">自动化运维脚本</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`#!/bin/bash
aws s3 sync ./static s3://mybucket/static`}
        </pre>
      </div>
      <div className="mt-10 flex justify-between">
        <a href="/study/se/cloud/security" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← 云安全与合规
        </a>
        <a href="/study/se/cloud/projects" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          实战案例与应用 →
        </a>
      </div>
    </div>
  );
} 
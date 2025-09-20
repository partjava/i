"use client";
import React, { useState } from "react";
import Link from "next/link";

const tabList = [
  { key: "code", label: "代码规范" },
  { key: "arch", label: "架构设计规范" },
  { key: "api", label: "接口设计规范" },
  { key: "db", label: "数据库设计规范" },
  { key: "deploy", label: "部署规范" },
  { key: "git", label: "版本控制规范" },
  { key: "team", label: "团队协作规范" },
  { key: "doc", label: "文档规范" }
];

const tabContent: Record<string, { desc: string[]; exampleTitle: string; example: React.ReactNode }> = {
  code: {
    desc: [
      "统一代码风格（如缩进、命名、注释等）",
      "推荐使用自动化格式化工具（如 Prettier、ESLint、Checkstyle 等）",
      "保持代码整洁、可读、易维护"
    ],
    exampleTitle: "实例：ESLint 配置片段（JavaScript）",
    example: (
      <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">
{`// .eslintrc.js
module.exports = {
  extends: ['eslint:recommended'],
  rules: {
    indent: ['error', 2],
    'no-unused-vars': 'warn',
    'semi': ['error', 'always']
  }
};`}
      </pre>
    )
  },
  arch: {
    desc: [
      "明确分层与模块边界，遵循高内聚低耦合原则",
      "架构设计需有文档说明，并随变更及时更新",
      "重要架构决策需团队评审"
    ],
    exampleTitle: "实例：典型三层架构示意（伪代码）",
    example: (
      <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">
{`// Controller
function getUser(req, res) {
  const user = userService.getUserById(req.params.id);
  res.json(user);
}
// Service
const userService = {
  getUserById(id) {
    return userDao.findById(id);
  }
};
// DAO
const userDao = {
  findById(id) {
    // 数据库查询实现
  }
};`}
      </pre>
    )
  },
  api: {
    desc: [
      "遵循 RESTful API 设计原则，接口命名清晰",
      "接口文档自动化（如 Swagger/OpenAPI）",
      "统一错误码与返回结构，便于前后端协作"
    ],
    exampleTitle: "实例：RESTful API 设计（用户查询）",
    example: (
      <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">
{`GET /api/users/{id}
返回：
{
  "code": 0,
  "data": {
    "id": 123,
    "name": "张三"
  },
  "msg": "success"
}`}
      </pre>
    )
  },
  db: {
    desc: [
      "表结构命名统一，字段类型与约束明确",
      "设计前需评审，变更需记录",
      "避免冗余字段，保证数据一致性"
    ],
    exampleTitle: "实例：用户表设计（MySQL）",
    example: (
      <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">
{`CREATE TABLE user (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);`}
      </pre>
    )
  },
  deploy: {
    desc: [
      "统一部署流程（如 CI/CD）",
      "环境变量与配置分离，敏感信息不入库",
      "支持灰度发布与回滚机制"
    ],
    exampleTitle: "实例：CI/CD 流程 YAML 片段（GitHub Actions）",
    example: (
      <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">
{`name: CI
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: 安装依赖
        run: npm install
      - name: 运行测试
        run: npm test`}
      </pre>
    )
  },
  git: {
    desc: [
      "采用分支管理策略（如 Git Flow）",
      "提交信息规范，便于追溯",
      "代码合并与冲突处理流程明确"
    ],
    exampleTitle: "实例：Git 提交信息规范",
    example: (
      <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">
{`feat: 新增用户注册功能
fix: 修复登录接口参数校验
refactor: 优化订单模块结构`}
      </pre>
    )
  },
  team: {
    desc: [
      "推行代码评审机制，提升代码质量",
      "任务分配与进度同步，定期站会",
      "会议与文档记录，便于团队知识沉淀"
    ],
    exampleTitle: "实例：代码评审流程简述",
    example: (
      <div className="bg-gray-100 p-4 rounded text-xs">
        <ol className="list-decimal pl-5">
          <li>开发者提交 Pull Request</li>
          <li>团队成员进行代码评审，提出建议</li>
          <li>开发者根据建议修改并重新提交</li>
          <li>评审通过后合并代码</li>
        </ol>
      </div>
    )
  },
  doc: {
    desc: [
      "需求、设计、接口、部署等文档齐全",
      "文档结构清晰，便于查阅和维护",
      "定期更新，保证文档与实际一致"
    ],
    exampleTitle: "实例：接口文档结构示例",
    example: (
      <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">
{`# 用户注册接口
- 路径：POST /api/register
- 请求参数：
  - name: string
  - email: string
  - password: string
- 返回：
  - code: int
  - msg: string
  - data: object`}
      </pre>
    )
  }
};

export default function SpecPage() {
  const [activeTab, setActiveTab] = useState("code");
  const current = tabContent[activeTab];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">开发规范</h1>
      {/* Tab 导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        {tabList.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === tab.key ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* 内容区 */}
      <div className="bg-white rounded-lg shadow-md p-6 min-h-[320px]">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">{tabList.find(t => t.key === activeTab)?.label}</h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-2 mb-6">
          {current.desc.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
        <div>
          <h3 className="font-semibold mb-2">{current.exampleTitle}</h3>
          {current.example}
        </div>
      </div>
      {/* 底部导航 */}
      <div className="mt-10 flex justify-between">
        <Link href="/study/se/standards-testing" className="px-4 py-2 text-blue-600 hover:text-blue-800">← 返回目录</Link>
        <Link href="/study/se/standards-testing/basic" className="px-4 py-2 text-blue-600 hover:text-blue-800">测试基础 →</Link>
      </div>
    </div>
  );
}

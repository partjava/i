"use client";
import React, { useState } from "react";
import Link from "next/link";

const tabList = [
  { key: "concept", label: "集成测试概念" },
  { key: "compare", label: "与单元测试对比" },
  { key: "strategy", label: "集成测试策略" },
  { key: "framework", label: "集成测试框架" },
  { key: "example", label: "集成测试示例" },
  { key: "best", label: "最佳实践" }
];

// 定义测试框架数据结构
type TestFramework = {
  name: string;
  language: string;
  description: string;
  features: string[];
  example: string;
};

// 集成测试框架列表
const integrationFrameworks: TestFramework[] = [
  {
    name: "Postman",
    language: "多语言",
    description: "流行的 API 测试工具，支持自动化测试、请求参数化和测试报告生成。",
    features: ["可视化界面", "环境变量", "断言库", "测试集合", "CI/CD 集成"],
    example: "// Postman 测试脚本\npm.test(\"Status code is 200\", function() {\n    pm.response.to.have.status(200);\n});"
  },
  {
    name: "REST Assured",
    language: "Java",
    description: "Java 语言的 REST API 测试框架，简化了 HTTP 请求和响应的验证。",
    features: ["流畅的 API", "JSON/XML 验证", "参数化测试", "与 JUnit/TestNG 集成"],
    example: "given().\n    param(\"key1\", \"value1\").\nwhen().\n    get(\"/resource\").\nthen().\n    statusCode(200);"
  },
  {
    name: "SuperTest",
    language: "JavaScript",
    description: "Node.js 中用于测试 HTTP 服务器的库，通常与 Mocha 或 Jest 一起使用。",
    features: ["简单的 API", "Promise 支持", "中间件测试", "流式响应处理"],
    example: "it('responds with json', function(done) {\n  request(app)\n    .get('/users')\n    .set('Accept', 'application/json')\n    .expect('Content-Type', /json/)\n    .expect(200, done);\n});"
  },
  {
    name: "Robot Framework",
    language: "多语言",
    description: "通用的自动化测试框架，支持关键字驱动的测试方法。",
    features: ["可扩展", "多种测试库", "HTML 报告", "适合集成和端到端测试"],
    example: "*** Test Cases ***\nValid Login\n    Open Browser    http://example.com    Chrome\n    Input Text    id=username    demo\n    Input Text    id=password    mode\n    Click Button    id=login\n    Page Should Contain    Welcome"
  }
];

// 定义测试示例数据结构
type TestExample = {
  title: string;
  description: string;
  setupCode: string;
  testCode: string;
  expectedOutput: string;
};

// 测试示例列表
const testExamples: TestExample[] = [
  {
    title: "Web API 集成测试 (Node.js + SuperTest)",
    description: "测试一个简单的 Express.js API，验证用户注册和登录流程",
    setupCode: `// app.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// 用户数据库
const users = [];

// 注册接口
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  if (users.some(u => u.username === username)) {
    return res.status(400).json({ error: '用户名已存在' });
  }
  users.push({ username, password });
  res.status(201).json({ message: '注册成功' });
});

// 登录接口
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ error: '认证失败' });
  }
  res.json({ token: 'fake-token' });
});

module.exports = app;`,
    testCode: `// app.test.js
const request = require('supertest');
const app = require('./app');

describe('用户认证 API 测试', () => {
  describe('POST /api/register', () => {
    it('应该注册新用户', async () => {
      const response = await request(app)
        .post('/api/register')
        .send({ username: 'test', password: 'test123' });
      
      expect(response.statusCode).toBe(201);
      expect(response.body.message).toBe('注册成功');
    });

    it('应该拒绝重复用户名', async () => {
      // 先注册一个用户
      await request(app)
        .post('/api/register')
        .send({ username: 'existing', password: 'password' });
      
      // 尝试使用相同用户名注册
      const response = await request(app)
        .post('/api/register')
        .send({ username: 'existing', password: 'password' });
      
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('用户名已存在');
    });
  });

  describe('POST /api/login', () => {
    it('应该登录成功', async () => {
      // 先注册用户
      await request(app)
        .post('/api/register')
        .send({ username: 'loginTest', password: 'pass' });
      
      // 登录测试
      const response = await request(app)
        .post('/api/login')
        .send({ username: 'loginTest', password: 'pass' });
      
      expect(response.statusCode).toBe(200);
      expect(response.body.token).toBeDefined();
    });

    it('应该拒绝无效凭证', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({ username: 'wrong', password: 'wrong' });
      
      expect(response.statusCode).toBe(401);
      expect(response.body.error).toBe('认证失败');
    });
  });
});`,
    expectedOutput: `用户认证 API 测试
  POST /api/register
    ✓ 应该注册新用户 (42ms)
    ✓ 应该拒绝重复用户名 (18ms)
  POST /api/login
    ✓ 应该登录成功 (20ms)
    ✓ 应该拒绝无效凭证 (13ms)

4 passing (85ms)`
  },
  {
    title: "数据库集成测试 (Python + pytest + SQLite)",
    description: "测试一个简单的数据库操作类，验证数据的增删改查功能",
    setupCode: `// database.py
import sqlite3

class Database:
    def __init__(self, db_file):
        self.conn = sqlite3.connect(db_file)
        self.cursor = self.conn.cursor()
        self.create_table()
    
    def create_table(self):
        self.cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL
        )
        ''')
        self.conn.commit()
    
    def add_user(self, name, email):
        try:
            self.cursor.execute(
                "INSERT INTO users (name, email) VALUES (?, ?)",
                (name, email)
            )
            self.conn.commit()
            return self.cursor.lastrowid
        except sqlite3.IntegrityError:
            return None
    
    def get_user(self, email):
        self.cursor.execute("SELECT * FROM users WHERE email=?", (email,))
        return self.cursor.fetchone()
    
    def update_user(self, email, new_name):
        self.cursor.execute(
            "UPDATE users SET name=? WHERE email=?",
            (new_name, email)
        )
        self.conn.commit()
        return self.cursor.rowcount
    
    def delete_user(self, email):
        self.cursor.execute("DELETE FROM users WHERE email=?", (email,))
        self.conn.commit()
        return self.cursor.rowcount
    
    def close(self):
        self.conn.close()`,
    testCode: `// test_database.py
import pytest
from database import Database
import os

@pytest.fixture
def db():
    # 使用内存数据库进行测试
    db = Database(":memory:")
    yield db
    db.close()

def test_add_user(db):
    # 添加用户
    user_id = db.add_user("John Doe", "john@example.com")
    assert user_id is not None
    
    # 验证用户存在
    user = db.get_user("john@example.com")
    assert user is not None
    assert user[1] == "John Doe"
    assert user[2] == "john@example.com"

def test_add_duplicate_email(db):
    # 添加第一个用户
    db.add_user("John Doe", "john@example.com")
    
    # 尝试添加相同邮箱的用户
    user_id = db.add_user("Jane Doe", "john@example.com")
    assert user_id is None

def test_update_user(db):
    # 添加用户
    db.add_user("John Doe", "john@example.com")
    
    # 更新用户
    rows_affected = db.update_user("john@example.com", "John Updated")
    assert rows_affected == 1
    
    # 验证更新
    user = db.get_user("john@example.com")
    assert user[1] == "John Updated"

def test_delete_user(db):
    # 添加用户
    db.add_user("John Doe", "john@example.com")
    
    # 删除用户
    rows_affected = db.delete_user("john@example.com")
    assert rows_affected == 1
    
    # 验证用户已删除
    user = db.get_user("john@example.com")
    assert user is None`,
    expectedOutput: `============================= test session starts ==============================
platform darwin -- Python 3.9.7, pytest-7.2.1, pluggy-1.0.0
rootdir: /path/to/project
collected 4 items

test_database.py ....                                                        [100%]

============================== 4 passed in 0.01s ===============================`
  }
];

const tabContent: Record<string, { desc: string[]; exampleTitle: string; example: React.ReactNode }> = {
  concept: {
    desc: [
      "集成测试是测试系统中不同组件之间交互的过程，确保这些组件能够正确地协同工作。",
      "集成测试的主要目的是发现单元测试无法检测到的接口和交互问题，如数据传递错误、组件间依赖问题等。",
      "集成测试通常在单元测试之后、系统测试之前进行，是软件测试流程中的重要环节。",
      "集成测试可以分为不同的级别，如组件集成测试、子系统集成测试和系统集成测试。"
    ],
    exampleTitle: "集成测试在软件开发流程中的位置",
    example: (
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <svg width="600" height="250" viewBox="0 0 600 250" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* 背景网格 */}
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f0f0f0" strokeWidth="0.5" />
          </pattern>
          <rect width="600" height="250" fill="url(#grid)" />
          
          {/* 开发阶段 */}
          <rect x="50" y="50" width="100" height="40" fill="#e3f2fd" stroke="#2196f3" strokeWidth="2" rx="4" />
          <text x="100" y="75" textAnchor="middle" fontSize="14" fill="#1e293b">需求分析</text>
          
          <rect x="180" y="50" width="100" height="40" fill="#e3f2fd" stroke="#2196f3" strokeWidth="2" rx="4" />
          <text x="230" y="75" textAnchor="middle" fontSize="14" fill="#1e293b">设计阶段</text>
          
          <rect x="310" y="50" width="100" height="40" fill="#e3f2fd" stroke="#2196f3" strokeWidth="2" rx="4" />
          <text x="360" y="75" textAnchor="middle" fontSize="14" fill="#1e293b">编码阶段</text>
          
          <rect x="440" y="50" width="100" height="40" fill="#e3f2fd" stroke="#2196f3" strokeWidth="2" rx="4" />
          <text x="490" y="75" textAnchor="middle" fontSize="14" fill="#1e293b">部署阶段</text>
          
          {/* 测试阶段 */}
          <rect x="120" y="130" width="100" height="40" fill="#e8f5e9" stroke="#4caf50" strokeWidth="2" rx="4" />
          <text x="170" y="155" textAnchor="middle" fontSize="14" fill="#1e293b">单元测试</text>
          
          <rect x="250" y="130" width="100" height="40" fill="#c8e6c9" stroke="#4caf50" strokeWidth="2" rx="4" />
          <text x="300" y="155" textAnchor="middle" fontSize="14" fill="#1e293b">集成测试</text>
          
          <rect x="380" y="130" width="100" height="40" fill="#a5d6a7" stroke="#4caf50" strokeWidth="2" rx="4" />
          <text x="430" y="155" textAnchor="middle" fontSize="14" fill="#1e293b">系统测试</text>
          
          <rect x="510" y="130" width="100" height="40" fill="#81c784" stroke="#4caf50" strokeWidth="2" rx="4" />
          <text x="560" y="155" textAnchor="middle" fontSize="14" fill="#1e293b">验收测试</text>
          
          {/* 连接线 */}
          <line x1="150" y1="90" x2="170" y2="130" stroke="#90caf9" strokeWidth="2" strokeDasharray="5,3" />
          <line x1="280" y1="90" x2="290" y2="130" stroke="#90caf9" strokeWidth="2" strokeDasharray="5,3" />
          <line x1="410" y1="90" x2="420" y2="130" stroke="#90caf9" strokeWidth="2" strokeDasharray="5,3" />
          
          {/* 箭头标记 */}
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#90caf9" />
            </marker>
          </defs>
          
          {/* 阶段箭头 */}
          <line x1="150" y1="70" x2="180" y2="70" stroke="#2196f3" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <line x1="280" y1="70" x2="310" y2="70" stroke="#2196f3" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <line x1="410" y1="70" x2="440" y2="70" stroke="#2196f3" strokeWidth="2" markerEnd="url(#arrowhead)" />
          
          <line x1="220" y1="150" x2="250" y2="150" stroke="#4caf50" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <line x1="350" y1="150" x2="380" y2="150" stroke="#4caf50" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <line x1="480" y1="150" x2="510" y2="150" stroke="#4caf50" strokeWidth="2" markerEnd="url(#arrowhead)" />
          
          {/* 标题 */}
          <text x="300" y="20" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1e293b">软件开发与测试流程</text>
          
          {/* 图例 */}
          <rect x="50" y="200" width="20" height="10" fill="#e3f2fd" stroke="#2196f3" strokeWidth="2" />
          <text x="80" y="208" fontSize="12" fill="#1e293b">开发阶段</text>
          
          <rect x="180" y="200" width="20" height="10" fill="#e8f5e9" stroke="#4caf50" strokeWidth="2" />
          <text x="210" y="208" fontSize="12" fill="#1e293b">测试阶段</text>
        </svg>
      </div>
    )
  },
  compare: {
    desc: [
      "单元测试关注单个组件或函数的功能正确性，而集成测试关注组件之间的交互和协作。",
      "单元测试通常由开发人员编写，而集成测试可能涉及开发人员、测试人员和质量保证工程师。",
      "单元测试通常使用模拟对象隔离被测试单元，而集成测试使用真实的依赖组件或服务。",
      "单元测试执行速度快，可以频繁运行，而集成测试通常执行时间较长，需要更多资源。",
      "单元测试主要发现代码逻辑错误，而集成测试主要发现接口不匹配、数据传递错误和组件间协作问题。"
    ],
    exampleTitle: "单元测试与集成测试的对比",
    example: (
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <svg width="600" height="300" viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* 背景网格 */}
          <pattern id="grid-light" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f8f8f8" strokeWidth="0.5" />
          </pattern>
          <rect width="600" height="300" fill="url(#grid-light)" />
          
          {/* 单元测试部分 */}
          <rect x="50" y="50" width="220" height="200" fill="#e8f5e9" stroke="#4caf50" strokeWidth="2" rx="8" />
          <text x="160" y="80" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#2e7d32">单元测试</text>
          
          <rect x="80" y="110" width="160" height="30" fill="#a5d6a7" stroke="#4caf50" strokeWidth="1" rx="4" />
          <text x="160" y="130" textAnchor="middle" fontSize="12" fill="#1e293b">被测试函数</text>
          
          <rect x="60" y="150" width="40" height="30" fill="#ef9a9a" stroke="#f44336" strokeWidth="1" rx="4" />
          <text x="80" y="170" textAnchor="middle" fontSize="10" fill="#1e293b">Mock A</text>
          
          <rect x="120" y="150" width="40" height="30" fill="#ef9a9a" stroke="#f44336" strokeWidth="1" rx="4" />
          <text x="140" y="170" textAnchor="middle" fontSize="10" fill="#1e293b">Mock B</text>
          
          <rect x="180" y="150" width="40" height="30" fill="#ef9a9a" stroke="#f44336" strokeWidth="1" rx="4" />
          <text x="200" y="170" textAnchor="middle" fontSize="10" fill="#1e293b">Mock C</text>
          
          <line x1="160" y1="140" x2="80" y2="150" stroke="#f44336" strokeWidth="1.5" markerEnd="url(#arrowhead-red)" />
          <line x1="160" y1="140" x2="140" y2="150" stroke="#f44336" strokeWidth="1.5" markerEnd="url(#arrowhead-red)" />
          <line x1="160" y1="140" x2="200" y2="150" stroke="#f44336" strokeWidth="1.5" markerEnd="url(#arrowhead-red)" />
          
          {/* 集成测试部分 */}
          <rect x="330" y="50" width="220" height="200" fill="#e3f2fd" stroke="#2196f3" strokeWidth="2" rx="8" />
          <text x="440" y="80" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0d47a1">集成测试</text>
          
          <rect x="360" y="110" width="40" height="30" fill="#90caf9" stroke="#2196f3" strokeWidth="1" rx="4" />
          <text x="380" y="130" textAnchor="middle" fontSize="10" fill="#1e293b">组件 A</text>
          
          <rect x="420" y="110" width="40" height="30" fill="#90caf9" stroke="#2196f3" strokeWidth="1" rx="4" />
          <text x="440" y="130" textAnchor="middle" fontSize="10" fill="#1e293b">组件 B</text>
          
          <rect x="480" y="110" width="40" height="30" fill="#90caf9" stroke="#2196f3" strokeWidth="1" rx="4" />
          <text x="500" y="130" textAnchor="middle" fontSize="10" fill="#1e293b">组件 C</text>
          
          <line x1="380" y1="140" x2="440" y2="140" stroke="#2196f3" strokeWidth="1.5" markerEnd="url(#arrowhead-blue)" />
          <line x1="440" y1="140" x2="500" y2="140" stroke="#2196f3" strokeWidth="1.5" markerEnd="url(#arrowhead-blue)" />
          
          <rect x="400" y="170" width="80" height="30" fill="#bbdefb" stroke="#2196f3" strokeWidth="1" rx="4" />
          <text x="440" y="190" textAnchor="middle" fontSize="10" fill="#1e293b">数据库</text>
          
          <line x1="440" y1="140" x2="440" y2="170" stroke="#2196f3" strokeWidth="1.5" markerEnd="url(#arrowhead-blue)" />
          
          {/* 对比表格 */}
          <rect x="120" y="260" width="160" height="30" fill="#f1f8e9" stroke="#8bc34a" strokeWidth="1" rx="4" />
          <text x="200" y="280" textAnchor="middle" fontSize="12" fill="#1e293b">隔离测试单元</text>
          
          <rect x="320" y="260" width="160" height="30" fill="#e8eaf6" stroke="#3949ab" strokeWidth="1" rx="4" />
          <text x="400" y="280" textAnchor="middle" fontSize="12" fill="#1e293b">测试组件交互</text>
          
          {/* 箭头定义 */}
          <defs>
            <marker id="arrowhead-blue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#2196f3" />
            </marker>
            <marker id="arrowhead-red" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#f44336" />
            </marker>
          </defs>
          
          {/* 标题 */}
          <text x="300" y="30" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1e293b">单元测试 vs 集成测试</text>
        </svg>
      </div>
    )
  },
  strategy: {
    desc: [
      "大爆炸集成：一次性将所有组件集成在一起进行测试，适用于小型项目或紧急情况。",
      "自顶向下集成：从系统的顶层组件开始，逐步向下集成和测试下层组件。",
      "自底向上集成：从系统的底层组件开始，逐步向上集成和测试上层组件。",
      "三明治集成：结合自顶向下和自底向上的方法，同时测试顶层和底层组件，中间层逐步集成。",
      "基于风险的集成：优先集成和测试高风险的组件和接口。",
      "基于功能的集成：按照功能模块进行集成和测试，确保每个功能模块正常工作。"
    ],
    exampleTitle: "集成测试策略对比",
    example: (
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <svg width="600" height="350" viewBox="0 0 600 350" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* 自顶向下集成 */}
          <g transform="translate(50, 50)">
            <text x="100" y="-10" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e293b">自顶向下集成</text>
            
            <circle cx="100" cy="20" r="20" fill="#bbdefb" stroke="#2196f3" strokeWidth="2" />
            <text x="100" y="25" textAnchor="middle" fontSize="12" fill="#1e293b">A</text>
            
            <circle cx="60" cy="60" r="20" fill="#e3f2fd" stroke="#2196f3" strokeWidth="1.5" />
            <text x="60" y="65" textAnchor="middle" fontSize="12" fill="#1e293b">B</text>
            
            <circle cx="140" cy="60" r="20" fill="#e3f2fd" stroke="#2196f3" strokeWidth="1.5" />
            <text x="140" y="65" textAnchor="middle" fontSize="12" fill="#1e293b">C</text>
            
            <circle cx="30" cy="100" r="20" fill="#e3f2fd" stroke="#2196f3" strokeWidth="1.5" />
            <text x="30" y="105" textAnchor="middle" fontSize="12" fill="#1e293b">D</text>
            
            <circle cx="90" cy="100" r="20" fill="#e3f2fd" stroke="#2196f3" strokeWidth="1.5" />
            <text x="90" y="105" textAnchor="middle" fontSize="12" fill="#1e293b">E</text>
            
            <circle cx="150" cy="100" r="20" fill="#e3f2fd" stroke="#2196f3" strokeWidth="1.5" />
            <text x="150" y="105" textAnchor="middle" fontSize="12" fill="#1e293b">F</text>
            
            <line x1="100" y1="40" x2="60" y2="40" stroke="#2196f3" strokeWidth="1.5" markerEnd="url(#arrowhead-blue)" />
            <line x1="100" y1="40" x2="140" y2="40" stroke="#2196f3" strokeWidth="1.5" markerEnd="url(#arrowhead-blue)" />
            
            <line x1="60" y1="80" x2="30" y2="80" stroke="#2196f3" strokeWidth="1.5" markerEnd="url(#arrowhead-blue)" />
            <line x1="60" y1="80" x2="90" y2="80" stroke="#2196f3" strokeWidth="1.5" markerEnd="url(#arrowhead-blue)" />
            
            <line x1="140" y1="80" x2="150" y2="80" stroke="#2196f3" strokeWidth="1.5" markerEnd="url(#arrowhead-blue)" />
            
            {/* 测试顺序 */}
            <text x="120" y="140" fontSize="12" fill="#1e293b">测试顺序: A → B → C → D → E → F</text>
          </g>
          
          {/* 自底向上集成 */}
          <g transform="translate(350, 50)">
            <text x="100" y="-10" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e293b">自底向上集成</text>
            
            <circle cx="100" cy="20" r="20" fill="#e3f2fd" stroke="#2196f3" strokeWidth="1.5" />
            <text x="100" y="25" textAnchor="middle" fontSize="12" fill="#1e293b">A</text>
            
            <circle cx="60" cy="60" r="20" fill="#e3f2fd" stroke="#2196f3" strokeWidth="1.5" />
            <text x="60" y="65" textAnchor="middle" fontSize="12" fill="#1e293b">B</text>
            
            <circle cx="140" cy="60" r="20" fill="#e3f2fd" stroke="#2196f3" strokeWidth="1.5" />
            <text x="140" y="65" textAnchor="middle" fontSize="12" fill="#1e293b">C</text>
            
            <circle cx="30" cy="100" r="20" fill="#bbdefb" stroke="#2196f3" strokeWidth="2" />
            <text x="30" y="105" textAnchor="middle" fontSize="12" fill="#1e293b">D</text>
            
            <circle cx="90" cy="100" r="20" fill="#bbdefb" stroke="#2196f3" strokeWidth="2" />
            <text x="90" y="105" textAnchor="middle" fontSize="12" fill="#1e293b">E</text>
            
            <circle cx="150" cy="100" r="20" fill="#bbdefb" stroke="#2196f3" strokeWidth="2" />
            <text x="150" y="105" textAnchor="middle" fontSize="12" fill="#1e293b">F</text>
            
            <line x1="100" y1="40" x2="60" y2="40" stroke="#2196f3" strokeWidth="1.5" />
            <line x1="100" y1="40" x2="140" y2="40" stroke="#2196f3" strokeWidth="1.5" />
            
            <line x1="60" y1="80" x2="30" y2="80" stroke="#2196f3" strokeWidth="1.5" />
            <line x1="60" y1="80" x2="90" y2="80" stroke="#2196f3" strokeWidth="1.5" />
            
            <line x1="140" y1="80" x2="150" y2="80" stroke="#2196f3" strokeWidth="1.5" />
            
            {/* 测试顺序 */}
            <text x="120" y="140" fontSize="12" fill="#1e293b">测试顺序: D → E → F → B → C → A</text>
          </g>
          
          {/* 三明治集成 */}
          <g transform="translate(50, 200)">
            <text x="100" y="-10" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e293b">三明治集成</text>
            
            <circle cx="100" cy="20" r="20" fill="#bbdefb" stroke="#2196f3" strokeWidth="2" />
            <text x="100" y="25" textAnchor="middle" fontSize="12" fill="#1e293b">A</text>
            
            <circle cx="60" cy="60" r="20" fill="#e3f2fd" stroke="#2196f3" strokeWidth="1.5" />
            <text x="60" y="65" textAnchor="middle" fontSize="12" fill="#1e293b">B</text>
            
            <circle cx="140" cy="60" r="20" fill="#e3f2fd" stroke="#2196f3" strokeWidth="1.5" />
            <text x="140" y="65" textAnchor="middle" fontSize="12" fill="#1e293b">C</text>
            
            <circle cx="30" cy="100" r="20" fill="#bbdefb" stroke="#2196f3" strokeWidth="2" />
            <text x="30" y="105" textAnchor="middle" fontSize="12" fill="#1e293b">D</text>
            
            <circle cx="90" cy="100" r="20" fill="#bbdefb" stroke="#2196f3" strokeWidth="2" />
            <text x="90" y="105" textAnchor="middle" fontSize="12" fill="#1e293b">E</text>
            
            <circle cx="150" cy="100" r="20" fill="#bbdefb" stroke="#2196f3" strokeWidth="2" />
            <text x="150" y="105" textAnchor="middle" fontSize="12" fill="#1e293b">F</text>
            
            <line x1="100" y1="40" x2="60" y2="40" stroke="#2196f3" strokeWidth="1.5" markerEnd="url(#arrowhead-blue)" />
            <line x1="100" y1="40" x2="140" y2="40" stroke="#2196f3" strokeWidth="1.5" markerEnd="url(#arrowhead-blue)" />
            
            <line x1="60" y1="80" x2="30" y2="80" stroke="#2196f3" strokeWidth="1.5" markerEnd="url(#arrowhead-blue)" />
            <line x1="60" y1="80" x2="90" y2="80" stroke="#2196f3" strokeWidth="1.5" markerEnd="url(#arrowhead-blue)" />
            
            <line x1="140" y1="80" x2="150" y2="80" stroke="#2196f3" strokeWidth="1.5" markerEnd="url(#arrowhead-blue)" />
            
            {/* 测试顺序 */}
            <text x="120" y="140" fontSize="12" fill="#1e293b">测试顺序: A → D → E → F → B → C</text>
          </g>
          
          {/* 大爆炸集成 */}
          <g transform="translate(350, 200)">
            <text x="100" y="-10" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e293b">大爆炸集成</text>
            
            <circle cx="100" cy="20" r="20" fill="#ef9a9a" stroke="#f44336" strokeWidth="2" />
            <text x="100" y="25" textAnchor="middle" fontSize="12" fill="#1e293b">A</text>
            
            <circle cx="60" cy="60" r="20" fill="#ef9a9a" stroke="#f44336" strokeWidth="2" />
            <text x="60" y="65" textAnchor="middle" fontSize="12" fill="#1e293b">B</text>
            
            <circle cx="140" cy="60" r="20" fill="#ef9a9a" stroke="#f44336" strokeWidth="2" />
            <text x="140" y="65" textAnchor="middle" fontSize="12" fill="#1e293b">C</text>
            
            <circle cx="30" cy="100" r="20" fill="#ef9a9a" stroke="#f44336" strokeWidth="2" />
            <text x="30" y="105" textAnchor="middle" fontSize="12" fill="#1e293b">D</text>
            
            <circle cx="90" cy="100" r="20" fill="#ef9a9a" stroke="#f44336" strokeWidth="2" />
            <text x="90" y="105" textAnchor="middle" fontSize="12" fill="#1e293b">E</text>
            
            <circle cx="150" cy="100" r="20" fill="#ef9a9a" stroke="#f44336" strokeWidth="2" />
            <text x="150" y="105" textAnchor="middle" fontSize="12" fill="#1e293b">F</text>
            
            <line x1="100" y1="40" x2="60" y2="40" stroke="#f44336" strokeWidth="1.5" />
            <line x1="100" y1="40" x2="140" y2="40" stroke="#f44336" strokeWidth="1.5" />
            
            <line x1="60" y1="80" x2="30" y2="80" stroke="#f44336" strokeWidth="1.5" />
            <line x1="60" y1="80" x2="90" y2="80" stroke="#f44336" strokeWidth="1.5" />
            
            <line x1="140" y1="80" x2="150" y2="80" stroke="#f44336" strokeWidth="1.5" />
            
            {/* 测试顺序 */}
            <text x="120" y="140" fontSize="12" fill="#1e293b">测试顺序: 一次性测试所有组件</text>
          </g>
          
          {/* 箭头定义 */}
          <defs>
            <marker id="arrowhead-blue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#2196f3" />
            </marker>
          </defs>
          
          {/* 标题 */}
          <text x="300" y="180" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1e293b">集成测试策略对比</text>
        </svg>
      </div>
    )
  },
  framework: {
    desc: [
      "集成测试框架提供了自动化测试组件间交互的基础设施，支持测试发现、执行和结果报告。",
      "选择合适的集成测试框架取决于项目的技术栈、测试需求和团队偏好。",
      "一些框架专注于特定类型的集成测试，如 API 测试、数据库测试或 UI 集成测试。",
      "现代集成测试框架通常支持与 CI/CD 工具集成，实现自动化测试流水线。"
    ],
    exampleTitle: "常见集成测试框架对比",
    example: (
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <table className="w-full bg-white rounded-lg border border-gray-200 text-sm">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="p-3 text-left font-medium">框架名称</th>
              <th className="p-3 text-left font-medium">编程语言</th>
              <th className="p-3 text-left font-medium">适用场景</th>
              <th className="p-3 text-left font-medium">特点</th>
            </tr>
          </thead>
          <tbody>
            {integrationFrameworks.map((framework, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="p-3 font-medium border-b border-gray-200">{framework.name}</td>
                <td className="p-3 border-b border-gray-200">{framework.language}</td>
                <td className="p-3 border-b border-gray-200">
                  <div className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded inline-block mb-1">API 测试</div>
                  <div className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded inline-block mb-1">自动化测试</div>
                  <div className="text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded inline-block">测试报告</div>
                </td>
                <td className="p-3 border-b border-gray-200">
                  <ul className="list-disc pl-5 space-y-1">
                    {framework.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* 框架特性雷达图 */}
        <div className="mt-6">
          <h4 className="font-semibold mb-2 text-gray-800">框架特性对比雷达图</h4>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* 背景网格 */}
              <g transform="translate(200, 150)">
                {/* 圆形网格 */}
                <circle cx="0" cy="0" r="100" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                <circle cx="0" cy="0" r="80" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                <circle cx="0" cy="0" r="60" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                <circle cx="0" cy="0" r="40" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                <circle cx="0" cy="0" r="20" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                
                {/* 坐标轴 */}
                <line x1="0" y1="0" x2="0" y2="-100" stroke="#cbd5e1" strokeWidth="1" />
                <line x1="0" y1="0" x2="70.7" y2="-70.7" stroke="#cbd5e1" strokeWidth="1" />
                <line x1="0" y1="0" x2="100" y2="0" stroke="#cbd5e1" strokeWidth="1" />
                <line x1="0" y1="0" x2="70.7" y2="70.7" stroke="#cbd5e1" strokeWidth="1" />
                <line x1="0" y1="0" x2="0" y2="100" stroke="#cbd5e1" strokeWidth="1" />
                <line x1="0" y1="0" x2="-70.7" y2="70.7" stroke="#cbd5e1" strokeWidth="1" />
                <line x1="0" y1="0" x2="-100" y2="0" stroke="#cbd5e1" strokeWidth="1" />
                <line x1="0" y1="0" x2="-70.7" y2="-70.7" stroke="#cbd5e1" strokeWidth="1" />
                
                {/* 标签 */}
                <text x="0" y="-110" textAnchor="middle" fontSize="10" fill="#475569">易用性</text>
                <text x="80" y="-80" textAnchor="middle" fontSize="10" fill="#475569">社区支持</text>
                <text x="110" y="0" textAnchor="middle" fontSize="10" fill="#475569">功能丰富度</text>
                <text x="80" y="80" textAnchor="middle" fontSize="10" fill="#475569">性能</text>
                <text x="0" y="110" textAnchor="middle" fontSize="10" fill="#475569">集成能力</text>
                <text x="-80" y="80" textAnchor="middle" fontSize="10" fill="#475569">文档质量</text>
                <text x="-110" y="0" textAnchor="middle" fontSize="10" fill="#475569">学习曲线</text>
                <text x="-80" y="-80" textAnchor="middle" fontSize="10" fill="#475569">灵活性</text>
                
                {/* Postman 数据 */}
                <polygon points="0,-80 56.56,-56.56 80,0 56.56,56.56 0,90 -56.56,56.56 -80,0 -56.56,-56.56" fill="rgba(33, 150, 243, 0.2)" stroke="#2196f3" strokeWidth="2" />
                <circle cx="0" cy="-80" r="3" fill="#2196f3" />
                <circle cx="56.56" cy="-56.56" r="3" fill="#2196f3" />
                <circle cx="80" cy="0" r="3" fill="#2196f3" />
                <circle cx="56.56" cy="56.56" r="3" fill="#2196f3" />
                <circle cx="0" cy="90" r="3" fill="#2196f3" />
                <circle cx="-56.56" cy="56.56" r="3" fill="#2196f3" />
                <circle cx="-80" cy="0" r="3" fill="#2196f3" />
                <circle cx="-56.56" cy="-56.56" r="3" fill="#2196f3" />
                
                {/* REST Assured 数据 */}
                <polygon points="0,-70 70.7,-40 60,0 40,40 0,70 -40,40 -60,0 -70.7,-40" fill="rgba(76, 175, 80, 0.2)" stroke="#4caf50" strokeWidth="2" />
                <circle cx="0" cy="-70" r="3" fill="#4caf50" />
                <circle cx="70.7" cy="-40" r="3" fill="#4caf50" />
                <circle cx="60" cy="0" r="3" fill="#4caf50" />
                <circle cx="40" cy="40" r="3" fill="#4caf50" />
                <circle cx="0" cy="70" r="3" fill="#4caf50" />
                <circle cx="-40" cy="40" r="3" fill="#4caf50" />
                <circle cx="-60" cy="0" r="3" fill="#4caf50" />
                <circle cx="-70.7" cy="-40" r="3" fill="#4caf50" />
                
                {/* 图例 */}
                <circle cx="320" cy="20" r="5" fill="#2196f3" />
                <text x="335" cy="24" fontSize="10" fill="#475569">Postman</text>
                
                <circle cx="320" cy="40" r="5" fill="#4caf50" />
                <text x="335" cy="44" fontSize="10" fill="#475569">REST Assured</text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    )
  },
  example: {
    desc: [
      "集成测试示例展示了如何测试多个组件之间的交互，通常涉及真实的数据库、API 或其他外部服务。",
      "示例包括测试环境的设置、测试数据的准备、测试用例的编写和测试结果的验证。",
      "集成测试需要考虑测试数据的隔离性和测试环境的可重复性。",
      "通常使用测试替身（如测试数据库、mock 服务）来控制测试环境并提高测试效率。"
    ],
    exampleTitle: "集成测试完整示例",
    example: (
      <div className="space-y-6">
        {testExamples.map((example, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold mb-2 text-gray-800">{example.title}</h4>
            <p className="text-gray-600 text-sm mb-3">{example.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-gray-700 mb-1 text-xs uppercase">设置代码</h5>
                <pre className="bg-white p-3 rounded-lg border border-gray-200 text-gray-800 text-xs overflow-x-auto font-mono">
                  {example.setupCode}
                </pre>
              </div>
              <div>
                <h5 className="font-medium text-gray-700 mb-1 text-xs uppercase">测试代码</h5>
                <pre className="bg-white p-3 rounded-lg border border-gray-200 text-gray-800 text-xs overflow-x-auto font-mono">
                  {example.testCode}
                </pre>
              </div>
            </div>
            
            <div className="mt-4">
              <h5 className="font-medium text-gray-700 mb-1 text-xs uppercase">预期输出</h5>
              <pre className="bg-white p-3 rounded-lg border border-gray-200 text-gray-800 text-xs overflow-x-auto font-mono">
                {example.expectedOutput}
              </pre>
            </div>
          </div>
        ))}
        
        {/* 测试覆盖率图表 */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h4 className="font-semibold mb-2 text-gray-800">测试覆盖率可视化</h4>
          <svg width="500" height="200" viewBox="0 0 500 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* 背景 */}
            <rect width="500" height="200" rx="4" fill="#f8fafc" />
            
            {/* 标题 */}
            <text x="250" y="20" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e293b">集成测试覆盖率报告</text>
            
            {/* 坐标轴 */}
            <line x1="50" y1="160" x2="450" y2="160" stroke="#94a3b8" strokeWidth="1" />
            <line x1="50" y1="30" x2="50" y2="160" stroke="#94a3b8" strokeWidth="1" />
            
            {/* Y轴刻度 */}
            <line x1="45" y1="160" x2="50" y2="160" stroke="#94a3b8" strokeWidth="1" />
            <text x="40" y="163" textAnchor="end" fontSize="10" fill="#64748b">0%</text>
            
            <line x1="45" y1="120" x2="50" y2="120" stroke="#94a3b8" strokeWidth="1" />
            <text x="40" y="123" textAnchor="end" fontSize="10" fill="#64748b">25%</text>
            
            <line x1="45" y1="80" x2="50" y2="80" stroke="#94a3b8" strokeWidth="1" />
            <text x="40" y="83" textAnchor="end" fontSize="10" fill="#64748b">50%</text>
            
            <line x1="45" y1="40" x2="50" y2="40" stroke="#94a3b8" strokeWidth="1" />
            <text x="40" y="43" textAnchor="end" fontSize="10" fill="#64748b">75%</text>
            
            <line x1="45" y1="30" x2="50" y2="30" stroke="#94a3b8" strokeWidth="1" />
            <text x="40" y="33" textAnchor="end" fontSize="10" fill="#64748b">100%</text>
            
            {/* X轴标签 */}
            <text x="100" y="180" textAnchor="middle" fontSize="10" fill="#64748b">API 测试</text>
            <text x="180" y="180" textAnchor="middle" fontSize="10" fill="#64748b">数据库测试</text>
            <text x="260" y="180" textAnchor="middle" fontSize="10" fill="#64748b">服务间通信</text>
            <text x="340" y="180" textAnchor="middle" fontSize="10" fill="#64748b">UI 集成</text>
            <text x="420" y="180" textAnchor="middle" fontSize="10" fill="#64748b">第三方集成</text>
            
            {/* 柱状图 */}
            <rect x="80" y="80" width="40" height="80" fill="#3b82f6" rx="2" />
            <text x="100" y="75" textAnchor="middle" fontSize="10" fill="#1e293b">50%</text>
            
            <rect x="160" y="60" width="40" height="100" fill="#3b82f6" rx="2" />
            <text x="180" y="55" textAnchor="middle" fontSize="10" fill="#1e293b">62.5%</text>
            
            <rect x="240" y="40" width="40" height="120" fill="#3b82f6" rx="2" />
            <text x="260" y="35" textAnchor="middle" fontSize="10" fill="#1e293b">75%</text>
            
            <rect x="320" y="100" width="40" height="60" fill="#3b82f6" rx="2" />
            <text x="340" y="95" textAnchor="middle" fontSize="10" fill="#1e293b">37.5%</text>
            
            <rect x="400" y="120" width="40" height="40" fill="#f97316" rx="2" />
            <text x="420" y="115" textAnchor="middle" fontSize="10" fill="#1e293b">25%</text>
            
            {/* 总体覆盖率 */}
            <circle cx="470" cy="100" r="30" fill="#f8fafc" stroke="#4ade80" strokeWidth="5" />
            <text x="470" y="105" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#166534">56%</text>
            <text x="470" y="125" textAnchor="middle" fontSize="8" fill="#475569">总体覆盖率</text>
          </svg>
        </div>
      </div>
    )
  },
  best: {
    desc: [
      "编写清晰、独立的测试用例，每个测试只验证一个特定的功能点。",
      "使用测试装置 (Fixture) 管理测试环境的设置和清理，确保测试环境的可重复性。",
      "测试边界条件和异常情况，确保系统在各种情况下都能正确响应。",
      "保持测试数据的一致性和隔离性，避免测试之间的相互影响。",
      "使用断言验证预期结果，提供明确的错误信息以便快速定位问题。",
      "将集成测试集成到 CI/CD 流水线中，确保每次代码变更都能自动运行测试。",
      "监控测试覆盖率，但不要过度追求高覆盖率，重点关注关键业务逻辑和高风险区域。",
      "定期维护测试代码，随着系统的演进更新测试用例。"
    ],
    exampleTitle: "集成测试最佳实践",
    example: (
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 最佳实践列表 */}
          <div>
            <h4 className="font-semibold mb-3 text-gray-800">测试设计</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">专注于组件间交互，而非内部实现细节</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">使用真实依赖组件，除非它们不可控或代价高昂</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">测试用例应独立且可重复执行</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">使用有意义的测试名称，清晰表达测试目的</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-exclamation-circle text-yellow-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">避免测试过于庞大的组件组合，保持测试的粒度适中</span>
              </li>
            </ul>
            
            <h4 className="font-semibold mt-6 mb-3 text-gray-800">测试环境</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">使用与生产环境相似的测试环境</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">使用测试专用的数据库或其他资源，避免污染生产数据</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">测试前后清理测试数据，确保测试环境的一致性</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-exclamation-circle text-yellow-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">考虑使用容器化技术（如 Docker）创建隔离的测试环境</span>
              </li>
            </ul>
          </div>
          
          {/* 测试执行和报告 */}
          <div>
            <h4 className="font-semibold mb-3 text-gray-800">测试执行</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">将集成测试作为 CI/CD 流水线的一部分自动执行</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">设置合理的测试超时时间，避免测试执行过长</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">捕获并记录详细的测试执行日志，便于问题排查</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-exclamation-circle text-yellow-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">对于依赖外部服务的测试，考虑使用测试替身或模拟器</span>
              </li>
            </ul>
            
            <h4 className="font-semibold mt-6 mb-3 text-gray-800">测试报告</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">生成清晰、易读的测试报告，显示测试结果和覆盖率</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">分析测试失败原因，区分是测试代码问题还是被测试系统问题</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-check-circle text-green-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">监控测试稳定性，识别并修复不稳定的测试</span>
              </li>
              <li className="flex items-start">
                <i className="fa fa-exclamation-circle text-yellow-600 mt-0.5 mr-2"></i>
                <span className="text-gray-800">定期审查测试覆盖率，确保关键业务流程被充分测试</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* 测试流程状态机 */}
        <div className="mt-6">
          <h4 className="font-semibold mb-3 text-gray-800">集成测试流程状态机</h4>
          <svg width="500" height="200" viewBox="0 0 500 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* 状态机背景 */}
            <rect width="500" height="200" rx="4" fill="#f8fafc" />
            
            {/* 状态节点 */}
            <circle cx="100" cy="100" r="40" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" />
            <text x="100" y="105" textAnchor="middle" fontSize="12" fill="#1e293b">准备环境</text>
            
            <circle cx="220" cy="100" r="40" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" />
            <text x="220" y="105" textAnchor="middle" fontSize="12" fill="#1e293b">执行测试</text>
            
            <circle cx="340" cy="100" r="40" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" />
            <text x="340" y="105" textAnchor="middle" fontSize="12" fill="#1e293b">分析结果</text>
            
            <circle cx="460" cy="100" r="40" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" />
            <text x="460" y="105" textAnchor="middle" fontSize="12" fill="#1e293b">修复问题</text>
            
            {/* 箭头 */}
            <defs>
              <marker id="arrowhead-blue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
              </marker>
            </defs>
            
            <line x1="140" y1="100" x2="180" y2="100" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead-blue)" />
            <line x1="260" y1="100" x2="300" y2="100" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead-blue)" />
            <line x1="380" y1="100" x2="420" y2="100" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead-blue)" />
            
            {/* 循环箭头 */}
            <path d="M460,60 A40,40 0 0,1 460,140" fill="none" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead-blue)" />
            
            {/* 状态转换条件 */}
            <text x="160" y="85" textAnchor="middle" fontSize="10" fill="#64748b">环境就绪</text>
            <text x="280" y="85" textAnchor="middle" fontSize="10" fill="#64748b">测试完成</text>
            <text x="400" y="85" textAnchor="middle" fontSize="10" fill="#64748b">发现问题</text>
            <text x="460" y="40" textAnchor="middle" fontSize="10" fill="#64748b">重新测试</text>
            
            {/* 通过路径 */}
            <circle cx="340" cy="40" r="25" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
            <text x="340" y="45" textAnchor="middle" fontSize="10" fill="#166534">全部通过</text>
            <line x1="340" y1="65" x2="340" y2="75" stroke="#16a34a" strokeWidth="2" markerEnd="url(#arrowhead-blue)" />
          </svg>
        </div>
      </div>
    )
  }
};

export default function IntegrationTestPage() {
  const [activeTab, setActiveTab] = useState("concept");
  const current = tabContent[activeTab];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">集成测试</h1>
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
      <div className="bg-white rounded-lg shadow-sm p-6 min-h-[320px] border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">{tabList.find(t => t.key === activeTab)?.label}</h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-2 mb-6">
          {current.desc.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
        <div>
          <h3 className="font-semibold mb-2 text-gray-800">{current.exampleTitle}</h3>
          {current.example}
        </div>
      </div>
      {/* 底部导航 */}
      <div className="mt-10 flex justify-between">
        <Link href="/study/se/standards-testing/unit" className="px-4 py-2 text-blue-600 hover:text-blue-800">单元测试 →</Link>
        <Link href="/study/se/standards-testing/system" className="px-4 py-2 text-blue-600 hover:text-blue-800">系统测试 →</Link>
      </div>
    </div>
  );
}
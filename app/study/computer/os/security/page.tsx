"use client";

import React from 'react';
import { Typography, Card, Alert, Button, Table, Tabs } from 'antd';

const { Title, Paragraph, Text } = Typography;

export default function OSSecurityPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Title level={2}>操作系统安全</Title>
      <Tabs defaultActiveKey="concept" type="card" size="large">
        {/* Tab 1: 安全基本概念 */}
        <Tabs.TabPane tab="安全基本概念" key="concept">
          <Paragraph>
            <b>安全目标与威胁类型：</b><br />
            操作系统安全目标包括保密性、完整性、可用性。常见威胁有未授权访问、恶意软件、拒绝服务攻击、信息泄露等。
          </Paragraph>
          <Paragraph>
            <b>安全结构图：</b>
          </Paragraph>
          <div style={{overflowX: 'auto', margin: '16px 0'}}>
            {/* 优化后的安全结构SVG */}
            <svg width="520" height="180" viewBox="0 0 520 180">
              <rect x="30" y="70" width="120" height="40" fill="#f5faff" stroke="#1976d2" rx="16" />
              <text x="90" y="95" textAnchor="middle" fontSize="16" fill="#1976d2">安全目标</text>
              <rect x="320" y="20" width="120" height="40" fill="#fff9c4" stroke="#fbc02d" rx="16" />
              <text x="380" y="45" textAnchor="middle" fontSize="16" fill="#bfa000">保密性</text>
              <rect x="320" y="70" width="120" height="40" fill="#e0f2f1" stroke="#388e3c" rx="16" />
              <text x="380" y="95" textAnchor="middle" fontSize="16" fill="#388e3c">完整性</text>
              <rect x="320" y="120" width="120" height="40" fill="#e3f2fd" stroke="#1976d2" rx="16" />
              <text x="380" y="145" textAnchor="middle" fontSize="16" fill="#1976d2">可用性</text>
              <g stroke="#1976d2" strokeWidth="2" markerEnd="url(#arrow)">
                <line x1="150" y1="90" x2="320" y2="40" />
                <line x1="150" y1="90" x2="320" y2="90" />
                <line x1="150" y1="90" x2="320" y2="140" />
              </g>
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L10,5 L0,10 Z" fill="#1976d2" />
                </marker>
              </defs>
            </svg>
          </div>
        </Tabs.TabPane>
        {/* Tab 2: 认证与访问控制 */}
        <Tabs.TabPane tab="认证与访问控制" key="auth">
          <Paragraph>
            <b>用户认证与访问控制模型：</b><br />
            用户认证常用口令、生物特征、双因素等。访问控制模型包括自主访问控制（DAC）、强制访问控制（MAC）、基于角色的访问控制（RBAC）。
          </Paragraph>
          <Paragraph style={{marginTop: 16}}>
            <b>认证与访问控制流程图：</b>
          </Paragraph>
          <div style={{overflowX: 'auto', margin: '16px 0'}}>
            {/* 认证与访问控制流程SVG */}
            <svg width="700" height="160" viewBox="0 0 700 160">
              <rect x="60" y="60" width="120" height="40" fill="#e3f2fd" stroke="#1976d2" rx="10" />
              <text x="120" y="85" textAnchor="middle" fontSize="14">用户输入</text>
              <rect x="220" y="60" width="120" height="40" fill="#ffe082" stroke="#fbc02d" rx="10" />
              <text x="280" y="85" textAnchor="middle" fontSize="14">认证模块</text>
              <rect x="380" y="60" width="120" height="40" fill="#c8e6c9" stroke="#388e3c" rx="10" />
              <text x="440" y="85" textAnchor="middle" fontSize="14">访问控制</text>
              <rect x="540" y="60" width="120" height="40" fill="#bbdefb" stroke="#1976d2" rx="10" />
              <text x="600" y="85" textAnchor="middle" fontSize="14">资源访问</text>
              <g stroke="#1976d2" strokeWidth="2" markerEnd="url(#arrow)">
                <line x1="180" y1="80" x2="220" y2="80" />
                <line x1="340" y1="80" x2="380" y2="80" />
                <line x1="500" y1="80" x2="540" y2="80" />
              </g>
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L10,5 L0,10 Z" fill="#1976d2" />
                </marker>
              </defs>
            </svg>
          </div>
          <Paragraph>
            <b>访问控制伪代码（RBAC示例）：</b>
          </Paragraph>
          <Card style={{marginBottom: 16}}>
            <pre style={{fontSize: 14, background: '#f6f8fa', padding: 12, borderRadius: 8, overflowX: 'auto'}}>{`
// RBAC访问控制伪代码
if (user.hasRole("admin") && resource.isPermitted("write")) {
    grantAccess();
} else {
    denyAccess();
}
`}</pre>
          </Card>
        </Tabs.TabPane>
        {/* Tab 3: 安全机制与防护 */}
        <Tabs.TabPane tab="安全机制与防护" key="defense">
          <Paragraph>
            <b>常见安全机制：</b>加密、审计、完整性校验、恶意软件防护、入侵检测等。
          </Paragraph>
          <Paragraph style={{marginTop: 16}}>
            <b>安全机制原理图：</b>
          </Paragraph>
          <div style={{overflowX: 'auto', margin: '16px 0'}}>
            {/* 优化后的安全机制原理SVG */}
            <svg width="700" height="200" viewBox="0 0 700 200">
              {/* 数据输入 */}
              <rect x="60" y="80" width="100" height="40" fill="#e3f2fd" stroke="#1976d2" rx="10" />
              <text x="110" y="105" textAnchor="middle" fontSize="14">数据</text>
              {/* 加密模块 */}
              <rect x="200" y="40" width="120" height="40" fill="#ffe082" stroke="#fbc02d" rx="10" />
              <text x="260" y="65" textAnchor="middle" fontSize="14">加密模块</text>
              {/* 审计模块 */}
              <rect x="200" y="120" width="120" height="40" fill="#c8e6c9" stroke="#388e3c" rx="10" />
              <text x="260" y="145" textAnchor="middle" fontSize="14">审计模块</text>
              {/* 完整性校验 */}
              <rect x="360" y="40" width="120" height="40" fill="#b3e5fc" stroke="#0288d1" rx="10" />
              <text x="420" y="65" textAnchor="middle" fontSize="14">完整性校验</text>
              {/* 入侵检测 */}
              <rect x="360" y="120" width="120" height="40" fill="#f8bbd0" stroke="#c2185b" rx="10" />
              <text x="420" y="145" textAnchor="middle" fontSize="14">入侵检测</text>
              {/* 防护/检测 */}
              <rect x="540" y="80" width="100" height="40" fill="#bbdefb" stroke="#1976d2" rx="10" />
              <text x="590" y="105" textAnchor="middle" fontSize="14">防护/响应</text>
              {/* 箭头 */}
              <g stroke="#1976d2" strokeWidth="2" markerEnd="url(#arrow)">
                <line x1="160" y1="100" x2="200" y2="60" />
                <line x1="160" y1="100" x2="200" y2="140" />
                <line x1="320" y1="60" x2="360" y2="60" />
                <line x1="320" y1="140" x2="360" y2="140" />
                <line x1="480" y1="60" x2="540" y2="100" />
                <line x1="480" y1="140" x2="540" y2="100" />
              </g>
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L10,5 L0,10 Z" fill="#1976d2" />
                </marker>
              </defs>
            </svg>
          </div>
          {/* 代码部分优化与补充 */}
          <Paragraph style={{marginTop: 24, fontWeight: 600, fontSize: 16}}>安全机制核心实现伪代码与注释</Paragraph>
          <Paragraph><b>1. 文件完整性校验</b>（如哈希/摘要算法）</Paragraph>
          <Card style={{marginBottom: 16}}>
            <pre style={{fontSize: 14, background: '#f6f8fa', padding: 12, borderRadius: 8, overflowX: 'auto'}}>{`
// 计算文件哈希值（伪代码）
char* calcHash(char* file) {
    // 读取文件内容，计算哈希（如MD5/SHA-1）
    // 返回哈希字符串
}
// 校验完整性
bool checkIntegrity(char* file, char* hash) {
    return strcmp(calcHash(file), hash) == 0;
}
`}</pre>
          </Card>
          <Paragraph><b>2. 审计日志记录</b>（安全事件追踪）</Paragraph>
          <Card style={{marginBottom: 16}}>
            <pre style={{fontSize: 14, background: '#f6f8fa', padding: 12, borderRadius: 8, overflowX: 'auto'}}>{`
// 审计日志记录伪代码
void auditLog(char* user, char* action) {
    // 记录用户操作到安全日志文件
    FILE* log = fopen("audit.log", "a");
    fprintf(log, "%s: %s\n", user, action);
    fclose(log);
}
`}</pre>
          </Card>
          <Paragraph><b>3. 入侵检测</b>（特征匹配/异常检测）</Paragraph>
          <Card style={{marginBottom: 16}}>
            <pre style={{fontSize: 14, background: '#f6f8fa', padding: 12, borderRadius: 8, overflowX: 'auto'}}>{`
// 简单特征匹配入侵检测
bool detectIntrusion(char* log) {
    if (strstr(log, "unauthorized access") != NULL)
        return true; // 检测到入侵特征
    return false;
}
// 异常检测（伪代码）
bool anomalyDetect(float cpuUsage) {
    return cpuUsage > 0.9; // CPU使用率异常高
}
`}</pre>
          </Card>
          <Paragraph><b>4. 恶意软件防护</b>（多策略伪代码）</Paragraph>
          <Card style={{marginBottom: 16}}>
            <pre style={{fontSize: 14, background: '#f6f8fa', padding: 12, borderRadius: 8, overflowX: 'auto'}}>{`
// 恶意软件检测与隔离
if (scanFile(file) == MALWARE) {
    quarantine(file); // 隔离文件
}
// 多策略：签名+行为分析
if (matchSignature(file) || suspiciousBehavior(file)) {
    quarantine(file);
}
`}</pre>
          </Card>
          <Paragraph><b>5. 简单对称加密示例</b></Paragraph>
          <Card style={{marginBottom: 16}}>
            <pre style={{fontSize: 14, background: '#f6f8fa', padding: 12, borderRadius: 8, overflowX: 'auto'}}>{`
// 简单对称加密示例
void encrypt(char* data, int len, char key) {
    for (int i = 0; i < len; i++) {
        data[i] ^= key; // 异或加密
    }
}
`}</pre>
          </Card>
        </Tabs.TabPane>
        {/* Tab 4: 高频面试题与解析 */}
        <Tabs.TabPane tab="高频面试题与解析" key="examples">
          <Title level={4} style={{marginTop: 0, marginBottom: 24, textAlign: 'center'}}>高频面试题与解析</Title>
          <Paragraph style={{fontSize: 16, marginBottom: 10}}>
            <b>选择题：</b>
          </Paragraph>
          <Paragraph style={{fontSize: 15, marginBottom: 8}}>
            <b>例题1：</b> 操作系统安全的三大目标包括：
          </Paragraph>
          <ul style={{fontSize: 15, marginBottom: 8}}>
            <li>A. 保密性、完整性、可用性</li>
            <li>B. 认证性、加密性、可用性</li>
            <li>C. 完整性、隔离性、审计性</li>
            <li>D. 保密性、加密性、隔离性</li>
          </ul>
          <Paragraph style={{color: '#388e3c', marginBottom: 8}}><b>答案：</b>A</Paragraph>
          <Paragraph style={{color: '#666', marginBottom: 18}}><b>原理解释：</b>操作系统安全的三大目标是保密性、完整性和可用性。
          </Paragraph>

          <Paragraph style={{fontSize: 16, marginBottom: 10}}>
            <b>判断题：</b>
          </Paragraph>
          <Paragraph style={{fontSize: 15, marginBottom: 8}}>
            <b>例题2：</b> RBAC模型是一种基于角色的访问控制方法。（  ）
          </Paragraph>
          <Paragraph style={{color: '#388e3c', marginBottom: 8}}><b>答案：</b>√</Paragraph>
          <Paragraph style={{color: '#666', marginBottom: 18}}><b>原理解释：</b>RBAC（Role-Based Access Control）是基于角色的访问控制。
          </Paragraph>

          <Paragraph style={{fontSize: 16, marginBottom: 10}}>
            <b>简答题：</b>
          </Paragraph>
          <Paragraph style={{fontSize: 15, marginBottom: 8}}>
            <b>例题3：</b> 简述操作系统中常见的安全防护机制。
          </Paragraph>
          <Paragraph style={{color: '#388e3c', marginBottom: 8}}><b>答案要点：</b>加密、访问控制、审计、恶意软件防护、入侵检测等。
          </Paragraph>
          <Paragraph style={{color: '#666', marginBottom: 18}}><b>原理解释：</b>这些机制共同保障系统安全，防止未授权访问和攻击。
          </Paragraph>

          <Paragraph style={{fontSize: 16, marginBottom: 10}}>
            <b>案例题：</b>
          </Paragraph>
          <Paragraph style={{fontSize: 15, marginBottom: 8}}>
            <b>例题4：</b> 某系统采用RBAC模型，用户A属于"管理员"角色，能否访问只允许"普通用户"访问的资源？为什么？
          </Paragraph>
          <Paragraph style={{color: '#388e3c', marginBottom: 8}}><b>答案：</b>不一定，需看管理员角色是否包含普通用户权限。
          </Paragraph>
          <Paragraph style={{color: '#666', marginBottom: 18}}><b>原理解释：</b>RBAC模型中，权限分配取决于角色的权限集合，管理员未必拥有所有普通用户权限。
          </Paragraph>
        </Tabs.TabPane>
      </Tabs>
      <Alert
        message="学习建议"
        description={
          <ul>
            <li>理解操作系统安全的基本目标和威胁类型</li>
            <li>掌握认证、访问控制、加密等核心机制</li>
            <li>多做例题，强化理解和应用能力</li>
          </ul>
        }
        type="info"
        showIcon
      />
      <div className="flex justify-between mt-6">
        <Button type="default" size="large" href="/study/os/deadlock">
          上一章：死锁与避免
        </Button>
        <Button type="primary" size="large" href="/study/os/projects">
          下一章：实战与面试
        </Button>
      </div>
    </div>
  );
} 
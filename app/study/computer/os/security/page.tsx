'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
  TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '操作系统',
  chapterTitle: '操作系统安全',
  chapterNumber: 9,
  totalChapters: 10,
  subjectHref: '/study/computer/os',
  prevChapter: { label: '死锁与避免', href: '/study/computer/os/deadlock' },
  nextChapter: { label: '实战与面试', href: '/study/computer/os/projects' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '安全基本概念',
    left: (
      <div className="space-y-4">
        <PageTitle>安全目标与威胁类型</PageTitle>
        <BookParagraph>
          操作系统安全目标包括<strong>保密性</strong>、<strong>完整性</strong>、<strong>可用性</strong>。常见威胁有未授权访问、恶意软件、拒绝服务攻击、信息泄露等。
        </BookParagraph>
        <SectionTitle>三大安全目标</SectionTitle>
        <BookList items={[
          '保密性（Confidentiality）：防止信息未授权泄露',
          '完整性（Integrity）：防止信息未授权修改',
          '可用性（Availability）：确保系统和服务可用',
        ]} />
        <BookAlert type="info" message="CIA三元组（保密性、完整性、可用性）是信息安全领域最基础的安全模型。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>安全结构图</PageTitle>
        <div style={{ overflowX: 'auto', margin: '16px 0' }}>
          <svg width="520" height="180" viewBox="0 0 520 180">
            <rect x="30" y="70" width="120" height="40" fill="#f5faff" stroke="#1976d2" rx="16" />
            <text x="90" y="95" textAnchor="middle" fontSize="16" fill="#1976d2">安全目标</text>
            <rect x="320" y="20" width="120" height="40" fill="#fff9c4" stroke="#fbc02d" rx="16" />
            <text x="380" y="45" textAnchor="middle" fontSize="16" fill="#bfa000">保密性</text>
            <rect x="320" y="70" width="120" height="40" fill="#e0f2f1" stroke="#388e3c" rx="16" />
            <text x="380" y="95" textAnchor="middle" fontSize="16" fill="#388e3c">完整性</text>
            <rect x="320" y="120" width="120" height="40" fill="#e3f2fd" stroke="#1976d2" rx="16" />
            <text x="380" y="145" textAnchor="middle" fontSize="16" fill="#1976d2">可用性</text>
            <g stroke="#1976d2" strokeWidth="2">
              <line x1="150" y1="90" x2="320" y2="40" />
              <line x1="150" y1="90" x2="320" y2="90" />
              <line x1="150" y1="90" x2="320" y2="140" />
            </g>
          </svg>
        </div>
        <SectionTitle>常见安全威胁</SectionTitle>
        <BookList items={[
          '未授权访问：绕过认证访问系统资源',
          '恶意软件：病毒、蠕虫、木马、勒索软件',
          '拒绝服务攻击（DoS/DDoS）：耗尽系统资源',
          '信息泄露：敏感数据被窃取',
          '提权攻击：获取更高权限',
        ]} />
        <TagGrid items={['安全目标', '保密性', '完整性', '可用性', 'CIA']} />
      </div>
    ),
  },
  {
    label: '认证与访问控制',
    left: (
      <div className="space-y-4">
        <PageTitle>用户认证与访问控制模型</PageTitle>
        <BookParagraph>
          用户认证常用口令、生物特征、双因素等。访问控制模型包括自主访问控制（DAC）、强制访问控制（MAC）、基于角色的访问控制（RBAC）。
        </BookParagraph>
        <SectionTitle>认证与访问控制流程</SectionTitle>
        <div style={{ overflowX: 'auto', margin: '16px 0' }}>
          <svg width="700" height="160" viewBox="0 0 700 160">
            <rect x="60" y="60" width="120" height="40" fill="#e3f2fd" stroke="#1976d2" rx="10" />
            <text x="120" y="85" textAnchor="middle" fontSize="14">用户输入</text>
            <rect x="220" y="60" width="120" height="40" fill="#ffe082" stroke="#fbc02d" rx="10" />
            <text x="280" y="85" textAnchor="middle" fontSize="14">认证模块</text>
            <rect x="380" y="60" width="120" height="40" fill="#c8e6c9" stroke="#388e3c" rx="10" />
            <text x="440" y="85" textAnchor="middle" fontSize="14">访问控制</text>
            <rect x="540" y="60" width="120" height="40" fill="#bbdefb" stroke="#1976d2" rx="10" />
            <text x="600" y="85" textAnchor="middle" fontSize="14">资源访问</text>
            <g stroke="#1976d2" strokeWidth="2">
              <line x1="180" y1="80" x2="220" y2="80" />
              <line x1="340" y1="80" x2="380" y2="80" />
              <line x1="500" y1="80" x2="540" y2="80" />
            </g>
          </svg>
        </div>
        <BookParagraph>
          RBAC（Role-Based Access Control）基于角色的访问控制是目前大多数系统采用的主流模型。
        </BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>访问控制模型对比</PageTitle>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2" style={{ borderColor: '#90caf9' }}>
                <th className="text-left p-2 font-semibold">模型</th>
                <th className="text-left p-2 font-semibold">特点</th>
                <th className="text-left p-2 font-semibold">适用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b" style={{ borderColor: '#e0e0e0' }}>
                <td className="p-2 font-medium">DAC</td>
                <td className="p-2">资源所有者自主控制访问</td>
                <td className="p-2">个人系统、共享文件</td>
              </tr>
              <tr className="border-b" style={{ borderColor: '#e0e0e0' }}>
                <td className="p-2 font-medium">MAC</td>
                <td className="p-2">系统统一控制，用户不可更改</td>
                <td className="p-2">军事、政府机密系统</td>
              </tr>
              <tr>
                <td className="p-2 font-medium">RBAC</td>
                <td className="p-2">按角色分配权限，管理灵活</td>
                <td className="p-2">企业信息系统</td>
              </tr>
            </tbody>
          </table>
        </div>
        <BookParagraph>RBAC访问控制伪代码：</BookParagraph>
        <BookCode language="cpp" code={`// RBAC访问控制伪代码
if (user.hasRole("admin") && resource.isPermitted("write")) {
    grantAccess();
} else {
    denyAccess();
}`} />
        <TagGrid items={['DAC', 'MAC', 'RBAC', '认证', '访问控制']} />
      </div>
    ),
  },
  {
    label: '安全机制与防护',
    left: (
      <div className="space-y-4">
        <PageTitle>常见安全机制</PageTitle>
        <BookParagraph>
          常见安全机制包括加密、审计、完整性校验、恶意软件防护、入侵检测等，它们共同保障系统安全。
        </BookParagraph>
        <SectionTitle>安全机制原理图</SectionTitle>
        <div style={{ overflowX: 'auto', margin: '16px 0' }}>
          <svg width="700" height="200" viewBox="0 0 700 200">
            <rect x="60" y="80" width="100" height="40" fill="#e3f2fd" stroke="#1976d2" rx="10" />
            <text x="110" y="105" textAnchor="middle" fontSize="14">数据</text>
            <rect x="200" y="40" width="120" height="40" fill="#ffe082" stroke="#fbc02d" rx="10" />
            <text x="260" y="65" textAnchor="middle" fontSize="14">加密模块</text>
            <rect x="200" y="120" width="120" height="40" fill="#c8e6c9" stroke="#388e3c" rx="10" />
            <text x="260" y="145" textAnchor="middle" fontSize="14">审计模块</text>
            <rect x="360" y="40" width="120" height="40" fill="#b3e5fc" stroke="#0288d1" rx="10" />
            <text x="420" y="65" textAnchor="middle" fontSize="14">完整性校验</text>
            <rect x="360" y="120" width="120" height="40" fill="#f8bbd0" stroke="#c2185b" rx="10" />
            <text x="420" y="145" textAnchor="middle" fontSize="14">入侵检测</text>
            <rect x="540" y="80" width="100" height="40" fill="#bbdefb" stroke="#1976d2" rx="10" />
            <text x="590" y="105" textAnchor="middle" fontSize="14">防护/响应</text>
            <g stroke="#1976d2" strokeWidth="2">
              <line x1="160" y1="100" x2="200" y2="60" />
              <line x1="160" y1="100" x2="200" y2="140" />
              <line x1="320" y1="60" x2="360" y2="60" />
              <line x1="320" y1="140" x2="360" y2="140" />
              <line x1="480" y1="60" x2="540" y2="100" />
              <line x1="480" y1="140" x2="540" y2="100" />
            </g>
          </svg>
        </div>
        <SectionTitle>1. 文件完整性校验</SectionTitle>
        <BookCode language="cpp" code={`// 计算文件哈希值（伪代码）
char* calcHash(char* file) {
    // 读取文件内容，计算哈希（如MD5/SHA-1）
    // 返回哈希字符串
}
// 校验完整性
bool checkIntegrity(char* file, char* hash) {
    return strcmp(calcHash(file), hash) == 0;
}`} />
        <SectionTitle>2. 审计日志记录</SectionTitle>
        <BookCode language="cpp" code={`// 审计日志记录伪代码
void auditLog(char* user, char* action) {
    // 记录用户操作到安全日志文件
    FILE* log = fopen("audit.log", "a");
    fprintf(log, "%s: %s\\n", user, action);
    fclose(log);
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>更多安全机制实现</PageTitle>
        <SectionTitle>3. 入侵检测</SectionTitle>
        <BookCode language="cpp" code={`// 简单特征匹配入侵检测
bool detectIntrusion(char* log) {
    if (strstr(log, "unauthorized access") != NULL)
        return true; // 检测到入侵特征
    return false;
}
// 异常检测（伪代码）
bool anomalyDetect(float cpuUsage) {
    return cpuUsage > 0.9; // CPU使用率异常高
}`} />
        <SectionTitle>4. 恶意软件防护</SectionTitle>
        <BookCode language="cpp" code={`// 恶意软件检测与隔离
if (scanFile(file) == MALWARE) {
    quarantine(file); // 隔离文件
}
// 多策略：签名+行为分析
if (matchSignature(file) || suspiciousBehavior(file)) {
    quarantine(file);
}`} />
        <SectionTitle>5. 简单对称加密</SectionTitle>
        <BookCode language="cpp" code={`// 简单对称加密示例
void encrypt(char* data, int len, char key) {
    for (int i = 0; i < len; i++) {
        data[i] ^= key; // 异或加密
    }
}`} />
        <BookAlert type="info" message="安全机制应多层次部署（纵深防御），单一安全机制无法应对所有威胁。" />
        <TagGrid items={['加密', '审计', '完整性', '入侵检测', '恶意软件防护']} />
      </div>
    ),
  },
  {
    label: '高频面试题',
    left: (
      <div className="space-y-4">
        <PageTitle>高频面试题与解析</PageTitle>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">选择题：</p>
          <p className="font-semibold mb-1">例题1：</p>
          <p className="text-sm mb-2">操作系统安全的三大目标包括：</p>
          <BookList items={[
            'A. 保密性、完整性、可用性',
            'B. 认证性、加密性、可用性',
            'C. 完整性、隔离性、审计性',
            'D. 保密性、加密性、隔离性',
          ]} />
          <p className="text-sm font-semibold" style={{ color: '#388e3c' }}>答案：A</p>
          <p className="text-xs" style={{ color: '#666' }}>原理解释：操作系统安全的三大目标是保密性、完整性和可用性。</p>
        </div>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-1">例题2（判断）：</p>
          <p className="text-sm mb-2">RBAC模型是一种基于角色的访问控制方法。（ ）</p>
          <p className="text-sm font-semibold" style={{ color: '#388e3c' }}>答案：√</p>
          <p className="text-xs" style={{ color: '#666' }}>原理解释：RBAC（Role-Based Access Control）是基于角色的访问控制。</p>
        </div>
        <div className="rounded-lg p-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-1">例题3（简答）：</p>
          <p className="text-sm mb-2">简述操作系统中常见的安全防护机制。</p>
          <p className="text-sm font-semibold" style={{ color: '#388e3c' }}>答案要点：</p>
          <p className="text-xs" style={{ color: '#666' }}>加密、访问控制、审计、恶意软件防护、入侵检测等。这些机制共同保障系统安全，防止未授权访问和攻击。</p>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>案例题</PageTitle>
        <div className="rounded-lg p-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-1">例题4（案例）：</p>
          <p className="text-sm mb-2">某系统采用RBAC模型，用户A属于「管理员」角色，能否访问只允许「普通用户」访问的资源？为什么？</p>
          <p className="text-sm font-semibold" style={{ color: '#388e3c' }}>答案：不一定，需看管理员角色是否包含普通用户权限。</p>
          <p className="text-xs" style={{ color: '#666' }}>原理解释：RBAC模型中，权限分配取决于角色的权限集合，管理员未必拥有所有普通用户权限。</p>
        </div>
        <TagGrid items={['面试题', 'CIA', 'RBAC', 'DAC', 'MAC', '安全机制']} />
      </div>
    ),
  },
  {
    label: '学习建议',
    left: (
      <div className="space-y-4">
        <PageTitle>学习建议</PageTitle>
        <BookParagraph>
          操作系统安全是信息安全的基础，需要从基本原理到实践全面掌握。
        </BookParagraph>
        <BookList items={[
          '理解操作系统安全的基本目标和威胁类型',
          '掌握认证、访问控制、加密等核心机制',
          '多做例题，强化理解和应用能力',
          '关注系统安全漏洞和防御技术',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>关键知识点</PageTitle>
        <BookParagraph>
          本章核心概念总结：
        </BookParagraph>
        <BookList items={[
          'CIA三元组：保密性、完整性、可用性',
          '访问控制模型：DAC、MAC、RBAC',
          '安全机制：加密、审计、完整性校验',
          '入侵检测：特征匹配与异常检测',
          '纵深防御：多层次安全防护策略',
        ]} />
        <TagGrid items={['学习建议', 'CIA', '访问控制', '加密', '入侵检测']} />
      </div>
    ),
  },
]

export default function OsSecurityPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

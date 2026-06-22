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
  subject: '网络安全',
  chapterTitle: '访问控制',
  chapterNumber: 1,
  totalChapters: 10,
  subjectHref: '/study/security/protection',
  nextChapter: { label: '身份认证', href: '/study/security/protection/auth' },
  theme: THEMES.security,
}

const SPREADS = [
  {
    label: '基础原理',
    left: (
      <div className="space-y-4">
        <PageTitle>访问控制基础原理</PageTitle>
        <BookParagraph>访问控制（Access Control）是指对用户、设备或进程访问系统资源的权限进行管理和限制，防止未授权访问和滥用。它是信息安全的核心机制之一，广泛应用于操作系统、网络设备、数据库、Web应用等各类系统。</BookParagraph>
        <BookList items={[
          '核心目标：确保只有被授权的主体能够访问特定资源',
          '三要素：主体（Subject）、客体（Object）、权限（Permission）',
          '常见场景：文件访问、网络流量、数据库操作、API接口等',
        ]} />
        <div style={{ textAlign: 'center', margin: '16px 0' }}>
          <svg width="480" height="100" viewBox="0 0 480 100">
            <rect x="30" y="30" width="80" height="40" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" rx="8" />
            <text x="70" y="55" fontSize="14" fill="#0ea5e9" textAnchor="middle">主体</text>
            <rect x="200" y="30" width="80" height="40" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" rx="8" />
            <text x="240" y="55" fontSize="14" fill="#db2777" textAnchor="middle">访问控制</text>
            <rect x="370" y="30" width="80" height="40" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="8" />
            <text x="410" y="55" fontSize="14" fill="#ef4444" textAnchor="middle">客体</text>
            <line x1="110" y1="50" x2="200" y2="50" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow_ac)" />
            <line x1="280" y1="50" x2="370" y2="50" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow_ac)" />
            <defs>
              <marker id="arrow_ac" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L8,4 L0,8" fill="#64748b" />
              </marker>
            </defs>
          </svg>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>核心概念</PageTitle>
        <BookAlert type="info" message="访问控制的本质是在主体和客体之间建立授权关系。主体可以是用户、进程或设备；客体可以是文件、数据库、网络资源或API接口。权限定义了主体对客体可以执行的操作（读、写、执行、删除等）。" />
        <TagGrid items={['身份认证', '授权管理', '权限校验', '审计日志', '最小权限']} />
      </div>
    ),
  },
  {
    label: '类型与模型',
    left: (
      <div className="space-y-4">
        <PageTitle>访问控制类型与模型</PageTitle>
        <SectionTitle>1. 自主访问控制（DAC）</SectionTitle>
        <BookList items={[
          '资源所有者自主决定谁可以访问',
          '常见于Linux/Unix文件权限（rwx）',
          '灵活性高，但安全性较低',
        ]} />
        <SectionTitle>2. 强制访问控制（MAC）</SectionTitle>
        <BookList items={[
          '系统根据安全标签统一控制',
          '常见于政府/军用系统（如SELinux）',
          '安全性高，但灵活性低',
        ]} />
        <SectionTitle>3. 基于角色的访问控制（RBAC）</SectionTitle>
        <BookList items={[
          '通过角色关联权限，用户被分配角色',
          '最常见的企业级访问控制模型',
          '简化权限管理，易于审计',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>更多模型与对比</PageTitle>
        <SectionTitle>4. 基于属性的访问控制（ABAC）</SectionTitle>
        <BookList items={[
          '基于用户属性、资源属性、环境条件动态决策',
          '精细化控制，适合云环境和微服务',
        ]} />
        <BookAlert type="info" message="DAC灵活但安全风险高；MAC安全严格但管理复杂；RBAC平衡了安全和管理成本，是企业首选；ABAC提供最细粒度的控制，适合复杂授权场景。" />
      </div>
    ),
  },
  {
    label: '常见技术',
    left: (
      <div className="space-y-4">
        <PageTitle>常见访问控制技术</PageTitle>
        <BookList items={[
          'ACL（访问控制列表）：路由器和交换机使用，控制网络流量',
          '文件系统权限：Linux的chmod/chown，Windows的NTFS权限',
          '数据库访问控制：GRANT/REVOKE语句控制表和视图的权限',
          'Web应用权限：基于RBAC/ABAC的接口权限控制',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>RBAC实践</PageTitle>
        <BookCode language="sql" code={`-- 创建角色并赋予权限
CREATE ROLE analyst;
GRANT SELECT ON orders TO analyst;
GRANT SELECT ON customers TO analyst;

-- 将角色分配给用户
GRANT analyst TO alice;
GRANT analyst TO bob;`} />
      </div>
    ),
  },
  {
    label: '配置示例',
    left: (
      <div className="space-y-4">
        <PageTitle>Linux文件权限配置</PageTitle>
        <BookCode language="bash" code={`# 查看文件权限
ls -l /etc/passwd

# 修改文件权限
chmod 750 sensitive.txt     # 所有者:rwx 用户组:r-x 其他人:---
chown alice:admin file.txt  # 修改所有者和组

# ACL配置（扩展权限）
setfacl -m u:bob:r file.txt   # 给bob用户读权限
getfacl file.txt               # 查看ACL`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>Web API权限校验</PageTitle>
        <BookCode language="python" code={`from flask import Flask, request, abort

app = Flask(__name__)

# RBAC权限装饰器
def require_role(role):
    def decorator(f):
        def wrapper(*args, **kwargs):
            user_role = request.headers.get('X-User-Role')
            if user_role != role:
                abort(403)
            return f(*args, **kwargs)
        return wrapper
    return decorator

@app.route('/api/admin')
@require_role('admin')
def admin_panel():
    return '管理员面板'`} />
      </div>
    ),
  },
  {
    label: '实际案例',
    left: (
      <div className="space-y-4">
        <PageTitle>访问控制实际案例</PageTitle>
        <BookList items={[
          '案例1：某公司因ACL配置错误，导致外部人员可访问内部Jenkins服务器，源代码泄露。启示：精确配置ACL，遵循最小权限原则。',
          '案例2：某电商平台因RBAC设计缺陷，普通用户可越权访问管理员接口。启示：权限模型需严格验证，接口层做二次校验。',
          '案例3：某云平台因访问密钥泄露，攻击者通过API非法操作大量资源。启示：密钥管理需安全，启用多因素认证。',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>最佳实践</PageTitle>
        <BookList items={[
          '遵循最小权限原则（Principle of Least Privilege）',
          '实施职责分离（SoD），避免权力过度集中',
          '定期审计权限分配，回收过期权限',
          '使用集中认证和授权系统（如LDAP、OAuth）',
          '记录和分析访问日志，及时发现异常',
          '启用多因素认证（MFA），增强身份验证',
        ]} />
      </div>
    ),
  },
]

export default function AccessControlPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

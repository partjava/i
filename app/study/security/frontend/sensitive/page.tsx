'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookAlert, BookList,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: '敏感信息保护',
  chapterNumber: 7,
  totalChapters: 10,
  subjectHref: '/study/security/frontend',
  prevChapter: { label: '文件上传安全', href: '/study/security/frontend/upload' },
  nextChapter: { label: '前端加密', href: '/study/security/frontend/encryption' },
  theme: THEMES.security,
}

const leakExamples = `// 1. 源代码注释泄露
// TODO: 使用生产环境数据库连接
// const dbUrl = 'mongodb://admin:password@prod-db:27017';

// 2. 错误信息泄露
try {
  // 业务逻辑
} catch (error) {
  console.error('数据库连接失败:', error);
}

// 3. 调试信息泄露
console.log('用户信息:', user);

// 4. 配置文件泄露
{
  "database": {
    "host": "prod-db.example.com",
    "user": "admin",
    "password": "secret123"
  }
}

// 5. 日志信息泄露
logger.info('用户登录成功', { userId: 123, ip: '192.168.1.1' });`

const codeLevelCode = `// 1. 移除敏感注释
// 不安全的注释
// const dbUrl = 'mongodb://admin:password@prod-db:27017';

// 安全的注释
// 使用环境变量配置数据库连接

// 2. 安全的错误处理
try {
  // 业务逻辑
} catch (error) {
  console.error('操作失败');
  logger.error('数据库连接失败', { error: error.message });
}

// 3. 安全的日志
logger.info('用户登录', { userId: 123 });`

const configCode = `// 1. 使用环境变量（安全）
const config = {
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  }
};

// 2. 环境配置文件 .env
DB_HOST=localhost
DB_USER=dev
DB_PASSWORD=dev123
JWT_SECRET=your-secret-key

// 3. 配置验证
const Joi = require('joi');
const schema = Joi.object({
  database: Joi.object({
    host: Joi.string().required(),
    user: Joi.string().required(),
    password: Joi.string().required()
  }),
  jwt: Joi.object({ secret: Joi.string().required() })
});
const { error } = schema.validate(config);
if (error) throw new Error(\`配置验证失败: \${error.message}\`);`

const maskCode = `// 1. 手机号脱敏
function maskPhone(phone) {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
}

// 2. 身份证号脱敏
function maskIdCard(idCard) {
  return idCard.replace(/(\d{4})\d{10}(\d{4})/, '$1**********$2');
}

// 3. 邮箱脱敏
function maskEmail(email) {
  const [name, domain] = email.split('@');
  return \`\${name.charAt(0)}***@\${domain}\`;
}

// 4. 银行卡号脱敏
function maskBankCard(cardNo) {
  return cardNo.replace(/(\d{4})\d{8}(\d{4})/, '$1********$2');
}`

const userProfileCase = `// 前端实现
function UserProfile({ user }) {
  return (
    <div>
      <h2>用户信息</h2>
      <p>姓名: {maskName(user.name)}</p>
      <p>手机: {maskPhone(user.phone)}</p>
      <p>邮箱: {maskEmail(user.email)}</p>
      <p>身份证: {maskIdCard(user.idCard)}</p>
    </div>
  );
}

// 后端实现
app.get('/api/user/profile', async (req, res) => {
  try {
    const user = await db.users.findById(req.user.id);
    const safeUser = {
      name: maskName(user.name),
      phone: maskPhone(user.phone),
      email: maskEmail(user.email),
      idCard: maskIdCard(user.idCard)
    };
    res.json(safeUser);
  } catch (error) {
    logger.error('获取用户信息失败', { error: error.message });
    res.status(500).json({ error: '获取用户信息失败' });
  }
});`

const logCase = `// 1. 日志中间件
const logMiddleware = (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    logger.info('请求完成', {
      method: req.method, url: req.url,
      status: res.statusCode,
      duration: Date.now() - start, ip: req.ip
    });
  });
  next();
};

// 2. 错误日志
app.use((err, req, res, next) => {
  logger.error('请求错误', {
    method: req.method, url: req.url, error: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
  res.status(500).json({ error: '服务器错误' });
});`

const SPREADS = [
  {
    label: '攻击概述',
    left: (
      <div className="space-y-4">
        <PageTitle>敏感信息保护概述</PageTitle>
        <SectionTitle>1. 敏感信息定义</SectionTitle>
        <BookParagraph>
          敏感信息是指那些一旦泄露可能会对个人、组织或系统造成损害的信息，包括但不限于个人身份信息、财务信息、医疗记录、商业机密等。
        </BookParagraph>
        <SectionTitle>2. 敏感信息类型</SectionTitle>
        <BookList items={['个人身份信息（PII）', '支付卡信息（PCI）', '医疗健康信息（PHI）', '商业机密信息', '系统配置信息']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>3. 常见泄露场景</SectionTitle>
        <BookList items={['源代码泄露', '配置文件泄露', '日志信息泄露', '错误信息泄露', '注释信息泄露']} />
      </div>
    ),
  },
  {
    label: '攻击原理',
    left: (
      <div className="space-y-4">
        <PageTitle>攻击原理</PageTitle>
        <SectionTitle>1. 信息泄露途径</SectionTitle>
        <BookList items={['源代码注释', '错误信息', '调试信息', '配置文件', '日志文件']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>2. 攻击方式</SectionTitle>
        <BookCode language="javascript" code={leakExamples} />
      </div>
    ),
  },
  {
    label: '防御方案',
    left: (
      <div className="space-y-4">
        <PageTitle>防御方案</PageTitle>
        <SectionTitle>1. 代码层面防护</SectionTitle>
        <BookCode language="javascript" code={codeLevelCode} />
        <SectionTitle>2. 配置管理</SectionTitle>
        <BookCode language="javascript" code={configCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>3. 数据脱敏</SectionTitle>
        <BookCode language="javascript" code={maskCode} />
      </div>
    ),
  },
  {
    label: '实战案例',
    left: (
      <div className="space-y-4">
        <PageTitle>用户信息展示</PageTitle>
        <BookCode language="javascript" code={userProfileCase} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>日志记录</PageTitle>
        <BookCode language="javascript" code={logCase} />
      </div>
    ),
  },
]

export default function SensitiveInfoProtectionPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import { PageTitle, SectionTitle, BookParagraph, BookCode, BookList } from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '开发规范',
  chapterNumber: 1,
  totalChapters: 9,
  subjectHref: '/study/se/standards-testing',
  nextChapter: { label: '测试基础', href: '/study/se/standards-testing/basic' },
  theme: THEMES.software,
}

const eslintCode = `// .eslintrc.js
module.exports = {
  extends: ['eslint:recommended'],
  rules: {
    indent: ['error', 2],
    'no-unused-vars': 'warn',
    'semi': ['error', 'always']
  }
};`

const archCode = `// Controller
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
};`

const apiCode = `GET /api/users/{id}
返回：
{
  "code": 0,
  "data": {
    "id": 123,
    "name": "张三"
  },
  "msg": "success"
}`

const dbCode = `CREATE TABLE user (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);`

const deployCode = `name: CI
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: 安装依赖
        run: npm install
      - name: 运行测试
        run: npm test`

const gitCode = `feat: 新增用户注册功能
fix: 修复登录接口参数校验
refactor: 优化订单模块结构`

const SPREADS = [
  {
    label: '代码规范',
    left: (
      <div className="space-y-4">
        <PageTitle>代码规范</PageTitle>
        <SectionTitle>核心要求</SectionTitle>
        <BookList items={['统一代码风格（如缩进、命名、注释等）', '推荐使用自动化格式化工具（如 Prettier、ESLint、Checkstyle 等）', '保持代码整洁、可读、易维护']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>实例：ESLint 配置片段（JavaScript）</SectionTitle>
        <BookCode language="javascript" code={eslintCode} />
      </div>
    ),
  },
  {
    label: '架构设计规范',
    left: (
      <div className="space-y-4">
        <PageTitle>架构设计规范</PageTitle>
        <SectionTitle>核心原则</SectionTitle>
        <BookList items={['明确分层与模块边界，遵循高内聚低耦合原则', '架构设计需有文档说明，并随变更及时更新', '重要架构决策需团队评审']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>实例：典型三层架构示意（伪代码）</SectionTitle>
        <BookCode language="javascript" code={archCode} />
      </div>
    ),
  },
  {
    label: '接口设计规范',
    left: (
      <div className="space-y-4">
        <PageTitle>接口设计规范</PageTitle>
        <SectionTitle>核心要求</SectionTitle>
        <BookList items={['遵循 RESTful API 设计原则，接口命名清晰', '接口文档自动化（如 Swagger/OpenAPI）', '统一错误码与返回结构，便于前后端协作']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>实例：RESTful API 设计（用户查询）</SectionTitle>
        <BookCode language="json" code={apiCode} />
      </div>
    ),
  },
  {
    label: '数据库设计规范',
    left: (
      <div className="space-y-4">
        <PageTitle>数据库设计规范</PageTitle>
        <SectionTitle>核心要求</SectionTitle>
        <BookList items={['表结构命名统一，字段类型与约束明确', '设计前需评审，变更需记录', '避免冗余字段，保证数据一致性']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>实例：用户表设计（MySQL）</SectionTitle>
        <BookCode language="sql" code={dbCode} />
      </div>
    ),
  },
  {
    label: '部署规范',
    left: (
      <div className="space-y-4">
        <PageTitle>部署规范</PageTitle>
        <SectionTitle>核心要求</SectionTitle>
        <BookList items={['统一部署流程（如 CI/CD）', '环境变量与配置分离，敏感信息不入库', '支持灰度发布与回滚机制']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>实例：CI/CD 流程 YAML 片段（GitHub Actions）</SectionTitle>
        <BookCode language="yaml" code={deployCode} />
      </div>
    ),
  },
  {
    label: '版本控制规范',
    left: (
      <div className="space-y-4">
        <PageTitle>版本控制规范</PageTitle>
        <SectionTitle>核心要求</SectionTitle>
        <BookList items={['采用分支管理策略（如 Git Flow）', '提交信息规范，便于追溯', '代码合并与冲突处理流程明确']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>实例：Git 提交信息规范</SectionTitle>
        <BookCode language="text" code={gitCode} />
      </div>
    ),
  },
  {
    label: '团队协作规范',
    left: (
      <div className="space-y-4">
        <PageTitle>团队协作规范</PageTitle>
        <SectionTitle>核心要求</SectionTitle>
        <BookList items={['推行代码评审机制，提升代码质量', '任务分配与进度同步，定期站会', '会议与文档记录，便于团队知识沉淀']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>实例：代码评审流程简述</SectionTitle>
        <BookList items={['开发者提交 Pull Request', '团队成员进行代码评审，提出建议', '开发者根据建议修改并重新提交', '评审通过后合并代码']} ordered />
      </div>
    ),
  },
  {
    label: '文档规范',
    left: (
      <div className="space-y-4">
        <PageTitle>文档规范</PageTitle>
        <SectionTitle>核心要求</SectionTitle>
        <BookList items={['需求、设计、接口、部署等文档齐全', '文档结构清晰，便于查阅和维护', '定期更新，保证文档与实际一致']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>实例：接口文档结构示例</SectionTitle>
        <BookCode language="text" code={`# 用户注册接口
- 路径：POST /api/register
- 请求参数：
  - name: string
  - email: string
  - password: string
- 返回：
  - code: int
  - msg: string
  - data: object`} />
      </div>
    ),
  },
]

export default function SpecPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }

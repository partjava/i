'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, SectionTitle, BookParagraph, BookCode, BookList } from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '集成测试',
  chapterNumber: 4,
  totalChapters: 9,
  subjectHref: '/study/se/standards-testing',
  prevChapter: { label: '单元测试', href: '/study/se/standards-testing/unit' },
  nextChapter: { label: '系统测试', href: '/study/se/standards-testing/system' },
  theme: THEMES.software,
}

const apiTestCode = `// app.test.js
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
      await request(app)
        .post('/api/register')
        .send({ username: 'existing', password: 'password' });
      const response = await request(app)
        .post('/api/register')
        .send({ username: 'existing', password: 'password' });
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('用户名已存在');
    });
  });

  describe('POST /api/login', () => {
    it('应该登录成功', async () => {
      await request(app)
        .post('/api/register')
        .send({ username: 'loginTest', password: 'pass' });
      const response = await request(app)
        .post('/api/login')
        .send({ username: 'loginTest', password: 'pass' });
      expect(response.statusCode).toBe(200);
      expect(response.body.token).toBeDefined();
    });
  });
});`

const dbTestCode = `// test_database.py
import pytest
from database import Database

@pytest.fixture
def db():
    db = Database(":memory:")
    yield db
    db.close()

def test_add_user(db):
    user_id = db.add_user("John Doe", "john@example.com")
    assert user_id is not None
    user = db.get_user("john@example.com")
    assert user[1] == "John Doe"

def test_add_duplicate_email(db):
    db.add_user("John Doe", "john@example.com")
    user_id = db.add_user("Jane Doe", "john@example.com")
    assert user_id is None

def test_update_user(db):
    db.add_user("John Doe", "john@example.com")
    rows_affected = db.update_user("john@example.com", "John Updated")
    assert rows_affected == 1

def test_delete_user(db):
    db.add_user("John Doe", "john@example.com")
    rows_affected = db.delete_user("john@example.com")
    assert rows_affected == 1`

const SPREADS = [
  {
    label: '集成测试概念',
    left: (
      <div className="space-y-4">
        <PageTitle>集成测试概念</PageTitle>
        <BookList items={['集成测试是测试系统中不同组件之间交互的过程，确保这些组件能够正确地协同工作。', '主要目的是发现单元测试无法检测到的接口和交互问题，如数据传递错误、组件间依赖问题等。', '通常在单元测试之后、系统测试之前进行，是软件测试流程中的重要环节。', '可以分为不同的级别，如组件集成测试、子系统集成测试和系统集成测试。']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>集成测试位置</SectionTitle>
        <div className="bg-paper-200/40 p-4 rounded-lg border border-paper-300/60">
          <svg width="400" height="200" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="30" width="70" height="35" fill="#e3f2fd" stroke="#2196f3" strokeWidth="2" rx="4" />
            <text x="55" y="52" textAnchor="middle" fontSize="12" fill="#1e293b">需求分析</text>
            <rect x="110" y="30" width="70" height="35" fill="#e3f2fd" stroke="#2196f3" strokeWidth="2" rx="4" />
            <text x="145" y="52" textAnchor="middle" fontSize="12" fill="#1e293b">设计</text>
            <rect x="200" y="30" width="70" height="35" fill="#e3f2fd" stroke="#2196f3" strokeWidth="2" rx="4" />
            <text x="235" y="52" textAnchor="middle" fontSize="12" fill="#1e293b">编码</text>
            <rect x="290" y="30" width="70" height="35" fill="#e3f2fd" stroke="#2196f3" strokeWidth="2" rx="4" />
            <text x="325" y="52" textAnchor="middle" fontSize="12" fill="#1e293b">部署</text>
            <rect x="65" y="100" width="70" height="35" fill="#c8e6c9" stroke="#4caf50" strokeWidth="2" rx="4" />
            <text x="100" y="122" textAnchor="middle" fontSize="12" fill="#1e293b">单元测试</text>
            <rect x="155" y="100" width="70" height="35" fill="#a5d6a7" stroke="#4caf50" strokeWidth="2" rx="4" />
            <text x="190" y="122" textAnchor="middle" fontSize="12" fill="#1e293b">集成测试</text>
            <rect x="245" y="100" width="70" height="35" fill="#81c784" stroke="#4caf50" strokeWidth="2" rx="4" />
            <text x="280" y="122" textAnchor="middle" fontSize="12" fill="#1e293b">系统测试</text>
            <rect x="335" y="100" width="70" height="35" fill="#66bb6a" stroke="#4caf50" strokeWidth="2" rx="4" />
            <text x="370" y="122" textAnchor="middle" fontSize="12" fill="#1e293b">验收测试</text>
            <line x1="90" y1="65" x2="100" y2="100" stroke="#90caf9" strokeWidth="2" strokeDasharray="5,3" />
            <line x1="235" y1="65" x2="190" y2="100" stroke="#90caf9" strokeWidth="2" strokeDasharray="5,3" />
            <line x1="325" y1="65" x2="280" y2="100" stroke="#90caf9" strokeWidth="2" strokeDasharray="5,3" />
          </svg>
        </div>
      </div>
    ),
  },
  {
    label: '与单元测试对比',
    left: (
      <div className="space-y-4">
        <PageTitle>与单元测试对比</PageTitle>
        <BookList items={['单元测试关注单个组件/函数的功能正确性；集成测试关注组件之间的交互和协作。', '单元测试通常由开发人员编写；集成测试可能涉及开发、测试和质量保证工程师。', '单元测试使用 Mock 隔离被测试单元；集成测试使用真实的依赖组件或服务。', '单元测试执行速度快，可频繁运行；集成测试执行时间较长，需更多资源。', '单元测试主要发现代码逻辑错误；集成测试主要发现接口不匹配、数据传递错误等。']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>对比维度和结果</SectionTitle>
        <div className="space-y-2 text-sm">
          <div className="grid grid-cols-3 gap-1 bg-paper-200/40 p-2 rounded">
            <span className="font-medium">维度</span>
            <span className="font-medium text-blue-600">系统测试</span>
            <span className="font-medium text-green-600">集成测试</span>
          </div>
          <div className="grid grid-cols-3 gap-1 border-t border-paper-300/40 p-2">
            <span>测试目标</span><span className="text-sm">验证整个系统</span><span className="text-sm">验证组件交互</span>
          </div>
          <div className="grid grid-cols-3 gap-1 border-t border-paper-300/40 p-2">
            <span>测试范围</span><span className="text-sm">整个系统</span><span className="text-sm">一组组件</span>
          </div>
          <div className="grid grid-cols-3 gap-1 border-t border-paper-300/40 p-2">
            <span>测试环境</span><span className="text-sm">接近生产环境</span><span className="text-sm">简化环境</span>
          </div>
          <div className="grid grid-cols-3 gap-1 border-t border-paper-300/40 p-2">
            <span>测试人员</span><span className="text-sm">独立测试团队</span><span className="text-sm">开发/测试团队</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    label: '集成测试策略',
    left: (
      <div className="space-y-4">
        <PageTitle>集成测试策略</PageTitle>
        <BookList items={['大爆炸集成：一次性集成所有组件，适用于小型项目或紧急情况。', '自顶向下集成：从顶层组件开始，逐步向下集成和测试下层组件。', '自底向上集成：从底层组件开始，逐步向上集成和测试上层组件。', '三明治集成：结合自顶向下和自底向上的方法。', '基于风险的集成：优先集成和测试高风险组件和接口。', '基于功能的集成：按照功能模块进行集成和测试。']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>策略对比</SectionTitle>
        <div className="bg-paper-200/40 p-4 rounded-lg border border-paper-300/60">
          <div className="text-sm font-medium mb-2">自顶向下: A → B → C → D → E → F</div>
          <svg width="280" height="120" viewBox="0 0 280 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="140" cy="20" r="18" fill="#bbdefb" stroke="#2196f3" strokeWidth="2" />
            <text x="140" y="25" textAnchor="middle" fontSize="12" fill="#1e293b">A</text>
            <circle cx="90" cy="60" r="18" fill="#e3f2fd" stroke="#2196f3" strokeWidth="1.5" />
            <text x="90" y="65" textAnchor="middle" fontSize="12" fill="#1e293b">B</text>
            <circle cx="190" cy="60" r="18" fill="#e3f2fd" stroke="#2196f3" strokeWidth="1.5" />
            <text x="190" y="65" textAnchor="middle" fontSize="12" fill="#1e293b">C</text>
            <circle cx="50" cy="100" r="18" fill="#e3f2fd" stroke="#2196f3" strokeWidth="1.5" />
            <text x="50" y="105" textAnchor="middle" fontSize="12" fill="#1e293b">D</text>
            <circle cx="130" cy="100" r="18" fill="#e3f2fd" stroke="#2196f3" strokeWidth="1.5" />
            <text x="130" y="105" textAnchor="middle" fontSize="12" fill="#1e293b">E</text>
            <circle cx="210" cy="100" r="18" fill="#e3f2fd" stroke="#2196f3" strokeWidth="1.5" />
            <text x="210" y="105" textAnchor="middle" fontSize="12" fill="#1e293b">F</text>
            <line x1="128" y1="35" x2="100" y2="45" stroke="#2196f3" strokeWidth="1.5" />
            <line x1="152" y1="35" x2="180" y2="45" stroke="#2196f3" strokeWidth="1.5" />
            <line x1="82" y1="78" x2="58" y2="85" stroke="#2196f3" strokeWidth="1.5" />
            <line x1="98" y1="78" x2="122" y2="85" stroke="#2196f3" strokeWidth="1.5" />
            <line x1="182" y1="78" x2="202" y2="85" stroke="#2196f3" strokeWidth="1.5" />
          </svg>
          <div className="text-sm font-medium mt-3 mb-2">自底向上: D → E → F → B → C → A</div>
          <div className="text-sm font-medium">大爆炸: 一次性测试所有组件</div>
        </div>
      </div>
    ),
  },
  {
    label: '集成测试框架',
    left: (
      <div className="space-y-4">
        <PageTitle>集成测试框架</PageTitle>
        <BookList items={['Postman：流行的 API 测试工具，支持自动化测试、请求参数化和测试报告生成。', 'REST Assured：Java 语言的 REST API 测试框架，简化 HTTP 请求和响应的验证。', 'SuperTest：Node.js 中用于测试 HTTP 服务器的库，常与 Mocha 或 Jest 配合使用。', 'Robot Framework：通用的自动化测试框架，支持关键字驱动的测试方法。']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>框架代码示例</SectionTitle>
        <div className="space-y-3">
          <div className="bg-paper-200/40 p-3 rounded border border-paper-300/60">
            <div className="font-medium text-sm mb-1">SuperTest (Node.js)</div>
            <BookCode language="javascript" code="request(app).get('/users').set('Accept', 'application/json').expect(200, done);" maxLines={3} />
          </div>
          <div className="bg-paper-200/40 p-3 rounded border border-paper-300/60">
            <div className="font-medium text-sm mb-1">REST Assured (Java)</div>
            <BookCode language="java" code={`given().param("key1","value1").when().get("/resource").then().statusCode(200);`} maxLines={3} />
          </div>
          <div className="bg-paper-200/40 p-3 rounded border border-paper-300/60">
            <div className="font-medium text-sm mb-1">Robot Framework</div>
            <BookCode language="text" code="*** Test Cases ***\nValid Login\n    Open Browser    http://example.com    Chrome\n    Input Text    id=username    demo" maxLines={5} />
          </div>
        </div>
      </div>
    ),
  },
  {
    label: '集成测试示例',
    left: (
      <div className="space-y-4">
        <PageTitle>集成测试示例</PageTitle>
        <SectionTitle>Web API 集成测试 (Node.js + SuperTest)</SectionTitle>
        <BookParagraph>测试一个简单的 Express.js API，验证用户注册和登录流程。</BookParagraph>
        <BookCode language="javascript" code={apiTestCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>数据库集成测试 (Python + pytest + SQLite)</SectionTitle>
        <BookParagraph>测试一个简单的数据库操作类，验证数据的增删改查功能。</BookParagraph>
        <BookCode language="python" code={dbTestCode} />
      </div>
    ),
  },
  {
    label: '最佳实践',
    left: (
      <div className="space-y-4">
        <PageTitle>最佳实践</PageTitle>
        <SectionTitle>测试设计</SectionTitle>
        <BookList items={['专注于组件间交互，而非内部实现细节', '使用真实依赖组件，除非不可控或代价高昂', '测试用例应独立且可重复执行', '使用有意义的测试名称，清晰表达测试目的']} />
        <SectionTitle>测试环境</SectionTitle>
        <BookList items={['使用与生产环境相似的测试环境', '使用测试专用数据库或资源，避免污染生产数据', '测试前后清理测试数据，确保环境一致性']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>测试执行</SectionTitle>
        <BookList items={['将集成测试作为 CI/CD 流水线的一部分自动执行', '设置合理的测试超时时间，避免测试执行过长', '捕获并记录详细的测试执行日志', '对于依赖外部服务的测试，考虑使用测试替身或模拟器']} />
        <SectionTitle>测试报告</SectionTitle>
        <BookList items={['生成清晰易读的测试报告，显示测试结果和覆盖率', '分析测试失败原因，区分测试代码问题还是系统问题', '监控测试稳定性，识别并修复不稳定的测试', '定期审查测试覆盖率，确保关键业务流程被充分测试']} />
      </div>
    ),
  },
]

export default function IntegrationTestPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }

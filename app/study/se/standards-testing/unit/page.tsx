'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import { PageTitle, SectionTitle, BookParagraph, BookCode, BookList } from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '单元测试',
  chapterNumber: 3,
  totalChapters: 9,
  subjectHref: '/study/se/standards-testing',
  prevChapter: { label: '测试基础', href: '/study/se/standards-testing/basic' },
  nextChapter: { label: '集成测试', href: '/study/se/standards-testing/integration' },
  theme: THEMES.software,
}

const sumCode = `// sum.js
function sum(a, b) {
  return a + b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('除数不能为零');
  }
  return a / b;
}

module.exports = { sum, divide };`

const sumTestCode = `// sum.test.js
const { sum, divide } = require('./sum');

describe('sum 函数测试', () => {
  test('两个正数相加', () => {
    // Arrange
    const a = 1;
    const b = 2;

    // Act
    const result = sum(a, b);

    // Assert
    expect(result).toBe(3);
  });

  test('正数和负数相加', () => {
    expect(sum(5, -3)).toBe(2);
  });
});

describe('divide 函数测试', () => {
  test('正常除法', () => {
    expect(divide(10, 2)).toBe(5);
  });

  test('除以零应抛出错误', () => {
    expect(() => divide(10, 0)).toThrow('除数不能为零');
  });
});`

const SPREADS = [
  {
    label: '单元测试概念',
    left: (
      <div className="space-y-4">
        <PageTitle>单元测试概念</PageTitle>
        <BookList items={['单元测试是对最小可测试单元（如函数、方法、类）进行测试的过程。', '主要目的是验证代码的功能是否正确，确保每个单元都能按预期工作。', '通常由开发人员编写，应该是自动化的、独立的、可重复执行的。', '良好的单元测试可以提高代码质量、简化调试过程、支持重构和持续集成。']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>测试金字塔</SectionTitle>
        <div className="bg-paper-200/40 p-4 rounded-lg border border-paper-300/60">
          <svg width="280" height="180" viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="40,140 140,50 240,140" fill="#e3e8f7" stroke="#3b82f6" strokeWidth="2" />
            <polygon points="60,120 140,70 220,120" fill="#f1f5f9" stroke="#3b82f6" strokeWidth="2" />
            <polygon points="80,100 140,90 200,100" fill="#e0f2fe" stroke="#3b82f6" strokeWidth="2" />
            <text x="140" y="120" textAnchor="middle" fontSize="14" fill="#1e293b">单元测试</text>
            <text x="140" y="90" textAnchor="middle" fontSize="14" fill="#1e293b">集成测试</text>
            <text x="140" y="65" textAnchor="middle" fontSize="14" fill="#1e293b">端到端测试</text>
            <text x="140" y="165" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1e293b">测试金字塔</text>
          </svg>
        </div>
      </div>
    ),
  },
  {
    label: '单元测试框架',
    left: (
      <div className="space-y-4">
        <PageTitle>单元测试框架</PageTitle>
        <BookParagraph>单元测试框架提供了编写和运行测试的基础设施，包括测试发现、断言库、测试报告等功能。不同的编程语言通常有自己流行的测试框架。</BookParagraph>
        <BookList items={['Jest (JavaScript/TypeScript)：零配置、快照测试、并行测试', 'JUnit (Java)：注解驱动、参数化测试、测试套件', 'pytest (Python)：断言重写、测试装置、参数化、插件系统', 'xUnit.net (C#)：灵活的测试发现、理论测试、并行执行']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>框架示例对比</SectionTitle>
        <div className="space-y-2 text-sm">
          <div className="bg-paper-200/40 p-3 rounded border border-paper-300/60">
            <div className="font-medium">Jest</div>
            <BookCode language="javascript" code="test('adds 1 + 2 to equal 3', () => { expect(sum(1, 2)).toBe(3); });" maxLines={3} />
          </div>
          <div className="bg-paper-200/40 p-3 rounded border border-paper-300/60">
            <div className="font-medium">JUnit</div>
            <BookCode language="java" code="@Test public void testAddition() { assertEquals(3, Calculator.add(1, 2)); }" maxLines={3} />
          </div>
          <div className="bg-paper-200/40 p-3 rounded border border-paper-300/60">
            <div className="font-medium">pytest</div>
            <BookCode language="python" code="def test_addition(): assert add(1, 2) == 3" maxLines={3} />
          </div>
        </div>
      </div>
    ),
  },
  {
    label: '单元测试示例',
    left: (
      <div className="space-y-4">
        <PageTitle>单元测试示例</PageTitle>
        <BookParagraph>单元测试通常遵循 Arrange-Act-Assert (AAA) 模式。测试用例应该专注于一个特定的功能点，保持测试的独立性和原子性。</BookParagraph>
        <BookParagraph>被测试的代码 (sum.js)：</BookParagraph>
        <BookCode language="javascript" code={sumCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>测试代码 (sum.test.js)</SectionTitle>
        <BookCode language="javascript" code={sumTestCode} />
      </div>
    ),
  },
  {
    label: '最佳实践',
    left: (
      <div className="space-y-4">
        <PageTitle>最佳实践</PageTitle>
        <BookList items={['保持测试代码与生产代码的隔离，通常放在单独的测试目录中。', '编写原子测试，每个测试只关注一个功能点，确保测试的独立性。', '使用有意义的测试名称，清晰表达测试目的。', '测试边界条件和异常情况，确保代码的健壮性。', '定期运行测试，理想情况下每次代码变更后都运行测试。', '保持测试代码的质量，与生产代码同样对待。', '使用测试覆盖率工具评估测试的完整性，但不要仅追求高覆盖率。']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>检查清单</SectionTitle>
        <BookList items={['每个测试只验证一个特定的功能点', '测试名称清晰描述测试场景', '使用测试装置 (Fixture) 共享公共设置', '测试执行时间短，避免依赖外部资源', '处理边界条件（如空值、最大值、最小值）', '使用 Mock 对象隔离外部依赖', '避免在测试中使用随机数据，确保测试可重复', '不要为了提高覆盖率而编写无意义的测试']} />
      </div>
    ),
  },
]

export default function UnitTestPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }

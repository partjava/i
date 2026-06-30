'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
  TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'SQL 学习',
  chapterTitle: '多表查询与连接',
  chapterNumber: 4,
  totalChapters: 9,
  subjectHref: '/study/computer/sql',
  prevChapter: { label: '条件与排序', href: '/study/computer/sql/where-order' },
  nextChapter: { label: '数据增删改', href: '/study/computer/sql/crud' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '连接类型',
    left: (
      <div className="space-y-4">
        <PageTitle>SQL 连接类型</PageTitle>
        <BookParagraph>SQL支持多种表连接方式，用于从多个表中联合查询数据。不同的连接类型决定了结果集中包含哪些记录。</BookParagraph>
        <BookList ordered items={[
          'INNER JOIN（内连接）— 只返回两表中匹配的记录',
          'LEFT JOIN（左外连接）— 返回左表所有记录及右表匹配记录',
          'RIGHT JOIN（右外连接）— 返回右表所有记录及左表匹配记录',
          'CROSS JOIN（交叉连接）— 笛卡尔积，返回所有组合',
        ]} />
        <BookCode language="sql" code={`-- INNER JOIN 语法
SELECT s.name, c.name AS 班级
FROM students s
INNER JOIN classes c ON s.class_id = c.id;

-- LEFT JOIN
SELECT s.name, c.name AS 班级
FROM students s
LEFT JOIN classes c ON s.class_id = c.id;

-- RIGHT JOIN
SELECT s.name, c.name AS 班级
FROM students s
RIGHT JOIN classes c ON s.class_id = c.id;

-- CROSS JOIN
SELECT s.name, c.name
FROM students s
CROSS JOIN classes c;`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookAlert type="info" message="ON后写连接条件，避免产生笛卡尔积。可用表别名（如 s、c）简化SQL。INNER可省略，直接写JOIN默认内连接。" />
        <h3 className="text-sm font-medium text-ink mt-4">连接类型对比</h3>
        <BookList items={[
          'INNER JOIN → 两表交集（匹配到的数据）',
          'LEFT JOIN → 左表全部 + 右表匹配（无匹配则为NULL）',
          'RIGHT JOIN → 右表全部 + 左表匹配（无匹配则为NULL）',
          'CROSS JOIN → 所有可能组合（慎用！）',
        ]} />
        <BookAlert type="warning" message="避免无条件JOIN，否则会产生笛卡尔积导致大量无用数据。多表连接建议为连接字段加索引以提升性能。" />
      </div>
    ),
  },
  {
    label: '多表复杂查询',
    left: (
      <div className="space-y-4">
        <PageTitle>多表与子查询结合</PageTitle>
        <BookParagraph>实际开发中常将多表连接与子查询结合使用，实现复杂的业务查询需求。</BookParagraph>
        <BookCode language="sql" code={`-- 三表连接：学生 + 班级 + 班主任
SELECT s.name AS 学生,
       c.name AS 班级,
       t.name AS 班主任
FROM students s
INNER JOIN classes c ON s.class_id = c.id
INNER JOIN teachers t ON c.teacher_id = t.id;

-- 子查询结合连接：成绩大于班级平均分的学生
SELECT s.name, sc.score, c.name AS 班级
FROM students s
JOIN scores sc ON s.id = sc.student_id
JOIN classes c ON s.class_id = c.id
WHERE sc.score > (
  SELECT AVG(score)
  FROM scores
  WHERE class_id = s.class_id
);`} />
        <BookAlert type="success" message="多表连接时注意字段歧义，需加表前缀。子查询可与JOIN结合实现复杂业务需求，如分组内比较。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>自连接与不等值连接</PageTitle>
        <BookParagraph>自连接用于在同一张表内进行关联查询，常见于树形结构或对比分析场景。</BookParagraph>
        <BookCode language="sql" code={`-- 自连接：查找同班同龄的学生对
SELECT a.name AS 学生1,
       b.name AS 学生2,
       a.age
FROM students a
JOIN students b
  ON a.class_id = b.class_id
  AND a.age = b.age
  AND a.id < b.id;

-- 不等值连接：分数区间匹配
SELECT s.name, s.score, g.level
FROM students s
JOIN score_grade g
  ON s.score BETWEEN g.min_score AND g.max_score;`} />
        <BookAlert type="success" message="自连接必须使用表别名区分同一张表。不等值连接（用BETWEEN、>、<等）适合区间匹配场景，注意性能影响。" />
      </div>
    ),
  },
  {
    label: '进阶技巧',
    left: (
      <div className="space-y-4">
        <PageTitle>进阶技巧与易错点</PageTitle>
        <BookParagraph>多表查询中常见的坑和优化方法，掌握这些可以避免很多问题：</BookParagraph>
        <BookList items={[
          'LEFT/RIGHT JOIN 结果中，未匹配行字段为 NULL，需注意处理',
          'ON 与 WHERE 条件混用易导致结果异常',
          '多表字段重名需加表前缀，否则报错',
          '复杂查询可拆分为视图或临时表，便于维护',
          '多表连接时先用 WHERE 缩小数据范围再 JOIN 可提升性能',
        ]} />
        <BookAlert type="warning" message="ON 中的条件在JOIN时应用，WHERE中的条件在JOIN后过滤。LEFT JOIN 时把右表的过滤条件放 WHERE 会导致 LEFT JOIN 退化为 INNER JOIN。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>性能优化建议</PageTitle>
        <BookCode language="sql" code={`-- 优化前：大表全量JOIN再过滤
SELECT s.name, c.name
FROM students s
JOIN classes c ON s.class_id = c.id
WHERE s.age > 18;     -- JOIN 后再过滤

-- 优化后：先过滤再 JOIN（小表驱动大表）
SELECT s.name, c.name
FROM (SELECT * FROM students WHERE age > 18) s
JOIN classes c ON s.class_id = c.id;

-- 或者内联视图 + 索引
-- 为 class_id 添加索引
CREATE INDEX idx_class_id ON students(class_id);`} />
        <BookAlert type="info" message="JOIN 字段建议加索引。小表驱动大表可提升效率。使用 EXPLAIN 分析执行计划，避免全表扫描。" />
        <TagGrid items={['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', '自连接', '子查询', '索引']} />
      </div>
    ),
  },
  {
    label: '综合练习',
    left: (
      <div className="space-y-4">
        <PageTitle>课后练习</PageTitle>
        <BookParagraph>通过以下练习掌握多表查询：</BookParagraph>
        <BookList items={[
          '查询每个学生的姓名、班级名和班主任姓名',
          '查询每个班级的平均分，并列出高于本班平均分的学生姓名和分数',
          '查询所有没有成绩记录的学生姓名',
          '查找同班且同姓的学生对',
          '优化一条包含多表连接和分组的慢SQL',
        ]} />
        <BookAlert type="info" message="多练习多表连接与子查询，掌握实际业务场景的SQL写法。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>参考代码</PageTitle>
        <BookCode language="sql" code={`-- 三表连接
SELECT s.name, c.name AS 班级, t.name AS 班主任
FROM students s
JOIN classes c ON s.class_id = c.id
JOIN teachers t ON c.teacher_id = t.id;

-- 高于班级平均分
SELECT s.name, sc.score, c.name AS 班级
FROM students s
JOIN scores sc ON s.id = sc.student_id
JOIN classes c ON s.class_id = c.id
WHERE sc.score > (
  SELECT AVG(score) FROM scores WHERE class_id = c.id
);

-- 无成绩记录的学生
SELECT s.name
FROM students s
LEFT JOIN scores sc ON s.id = sc.student_id
WHERE sc.id IS NULL;

-- 同班同姓学生对
SELECT a.name, b.name, a.class_id
FROM students a
JOIN students b
  ON a.class_id = b.class_id
  AND LEFT(a.name, 1) = LEFT(b.name, 1)
  AND a.id < b.id;`} />
        <BookAlert type="success" message="LEFT JOIN + IS NULL 用于查找不存在的关联数据。自连接需用别名且加条件避免重复。子查询结合JOIN实现分组内比较。" />
      </div>
    ),
  },
]

export default function SqlJoinPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

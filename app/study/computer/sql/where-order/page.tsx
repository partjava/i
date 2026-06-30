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
  chapterTitle: '条件与排序',
  chapterNumber: 3,
  totalChapters: 9,
  subjectHref: '/study/computer/sql',
  prevChapter: { label: '基本查询（SELECT）', href: '/study/computer/sql/select' },
  nextChapter: { label: '多表查询与连接', href: '/study/computer/sql/join' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: 'WHERE条件',
    left: (
      <div className="space-y-4">
        <PageTitle>WHERE 条件查询</PageTitle>
        <BookParagraph>WHERE用于指定查询的筛选条件，只返回满足条件的记录。它是SQL查询中最常用的子句之一，支持多种条件表达式。</BookParagraph>
        <BookCode language="sql" code={`-- 基本条件
SELECT * FROM students WHERE age > 18;

-- 精确匹配
SELECT * FROM students WHERE name = '张三';

-- 范围查询
SELECT * FROM students WHERE score BETWEEN 60 AND 90;

-- 集合查询
SELECT * FROM students WHERE class_id IN (1, 3, 5);

-- 模糊匹配
SELECT * FROM students WHERE name LIKE '张%';
SELECT * FROM students WHERE name LIKE '%明%';
SELECT * FROM students WHERE name LIKE '_三';`} />
        <BookAlert type="info" message="WHERE后可跟多种条件表达式。常用运算符：=、!=、>、<、>=、<=、LIKE、IN、BETWEEN。LIKE中%匹配任意字符，_匹配单个字符。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>比较与逻辑运算</PageTitle>
        <BookParagraph>可用AND、OR、NOT组合多个条件，构建更精确的筛选逻辑。</BookParagraph>
        <BookCode language="sql" code={`-- AND：同时满足
SELECT * FROM students
WHERE age >= 18 AND gender = '男';

-- OR：满足其一
SELECT * FROM students
WHERE class_id = 1 OR class_id = 2;

-- NOT：取反
SELECT * FROM students
WHERE NOT gender = '女';

-- 混合条件（括号优先）
SELECT * FROM students
WHERE (class_id = 1 OR class_id = 2)
  AND score > 80;

-- NULL 判断
SELECT * FROM students
WHERE score IS NULL;

SELECT * FROM students
WHERE score IS NOT NULL;`} />
        <BookAlert type="success" message="AND为且，OR为或，NOT为非。混合使用多个条件时建议加括号明确优先级，避免歧义。IS NULL / IS NOT NULL 用于判断空值。" />
      </div>
    ),
  },
  {
    label: 'ORDER BY排序',
    left: (
      <div className="space-y-4">
        <PageTitle>ORDER BY 排序</PageTitle>
        <BookParagraph>ORDER BY用于对查询结果排序，默认升序（ASC），可指定降序（DESC）。支持多字段排序，从左到右依次决定优先级。</BookParagraph>
        <BookCode language="sql" code={`-- 升序（默认）
SELECT * FROM students ORDER BY age;

-- 降序
SELECT * FROM students ORDER BY score DESC;

-- 多字段排序
SELECT * FROM students
ORDER BY class_id ASC, score DESC;

-- 结合 WHERE
SELECT * FROM students
WHERE gender = '女'
ORDER BY score DESC;

-- 按表达式排序
SELECT name, score FROM students
ORDER BY score + 10 DESC;

-- 按别名排序
SELECT name, score AS 成绩 FROM students
ORDER BY 成绩 DESC;`} />
        <BookAlert type="info" message="ORDER BY可指定多个字段，先后顺序影响排序结果。ASC为升序（默认），DESC为降序。可使用字段位置简写：ORDER BY 2 DESC（按第2列降序）。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>分页查询 LIMIT</PageTitle>
        <BookParagraph>LIMIT用于限制返回的记录数，常与OFFSET结合实现分页查询。</BookParagraph>
        <BookCode language="sql" code={`-- 限制返回条数
SELECT * FROM students LIMIT 5;

-- 分页查询
SELECT * FROM students
LIMIT 10 OFFSET 0;   -- 第1页

SELECT * FROM students
LIMIT 10 OFFSET 10;  -- 第2页

-- LIMIT + OFFSET 简写
SELECT * FROM students
LIMIT 10, 10;  -- LIMIT 偏移量, 条数

-- 结合排序实现分页
SELECT * FROM students
ORDER BY id
LIMIT 10 OFFSET 20;  -- 第3页`} />
        <BookAlert type="success" message="分页查询在Web开发中非常常见，一般配合ORDER BY使用以保证顺序稳定。MySQL中OFFSET可以省略，LIMIT 10, 20表示从第10条开始取20条。" />
        <TagGrid items={['WHERE', 'ORDER BY', 'ASC', 'DESC', 'LIMIT', 'OFFSET', '分页']} />
      </div>
    ),
  },
  {
    label: '综合练习',
    left: (
      <div className="space-y-4">
        <PageTitle>课后练习</PageTitle>
        <BookParagraph>通过以下练习巩固条件筛选与排序：</BookParagraph>
        <BookList items={[
          '查询 students 表中年龄大于20的所有学生',
          '查询所有女生，按成绩从高到低排序',
          '查询姓名以"李"开头的学生，按年龄升序排序',
          '查询成绩在80到90之间的学生，按班级分组后按成绩降序排列',
          '分页查询第2页数据，每页显示5条',
        ]} />
        <BookAlert type="info" message="多练习WHERE和ORDER BY，掌握条件筛选与排序技巧。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>参考代码</PageTitle>
        <BookCode language="sql" code={`-- 年龄大于20
SELECT * FROM students WHERE age > 20;

-- 女生按成绩降序
SELECT * FROM students
WHERE gender = '女'
ORDER BY score DESC;

-- 姓"李"按年龄升序
SELECT * FROM students
WHERE name LIKE '李%'
ORDER BY age ASC;

-- 成绩区间排序
SELECT * FROM students
WHERE score BETWEEN 80 AND 90
ORDER BY class_id, score DESC;

-- 第2页（每页5条）
SELECT * FROM students
ORDER BY id
LIMIT 5 OFFSET 5;`} />
        <BookAlert type="success" message='LIKE配合%实现模糊匹配。ORDER BY多个字段用逗号分隔。LIMIT OFFSET分页时注意OFFSET = (页码-1) * 每页条数。' />
      </div>
    ),
  },
]

export default function SqlWhereOrderPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

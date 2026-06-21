'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
  TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'SQL 学习',
  chapterTitle: '基本查询（SELECT）',
  chapterNumber: 2,
  totalChapters: 9,
  subjectHref: '/study/computer/sql',
  prevChapter: { label: '数据库基础与环境', href: '/study/computer/sql/intro' },
  nextChapter: { label: '条件与排序', href: '/study/computer/sql/where-order' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: 'SELECT语法',
    left: (
      <div className="space-y-4">
        <PageTitle>SELECT 语法基础</PageTitle>
        <BookParagraph>SELECT语句用于从数据库表中查询数据，是SQL最常用的语句。通过SELECT可以查询指定字段、全部字段、进行运算和函数处理。</BookParagraph>
        <BookCode language="sql" code={`-- 基本语法
SELECT 字段1, 字段2 FROM 表名;

-- 查询所有字段
SELECT * FROM students;

-- 查询指定字段
SELECT name, age FROM students;

-- 使用表达式
SELECT name, age, age + 1 AS 明年年龄 FROM students;

-- 查询常量
SELECT 'Hello' AS greeting;`} />
        <BookAlert type="info" message="SELECT后可指定多个字段，用逗号分隔。FROM指定要查询的表。* 表示所有字段，但建议实际开发中明确列出字段名以提高可读性和性能。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>字段选择与限定</PageTitle>
        <BookParagraph>灵活选择需要的字段是高效查询的基础。可以根据需求仅返回必要的列，减少数据传输量。</BookParagraph>
        <BookCode language="sql" code={`-- 选择部分字段
SELECT name, age, gender FROM students;

-- 使用表名前缀（多表时避免歧义）
SELECT students.name, students.age FROM students;

-- 结合运算
SELECT name, score, score * 0.9 AS 折后分 FROM students;

-- 使用函数
SELECT UPPER(name) AS 大写姓名, LENGTH(name) AS 名字长度 FROM students;`} />
        <BookAlert type="success" message="明确列出字段名比使用 * 更高效，也更易于维护。结合函数和表达式可在查询时直接完成数据处理。" />
        <TagGrid items={['SELECT', 'FROM', '字段选择', '表达式', '函数']} />
      </div>
    ),
  },
  {
    label: '去重与别名',
    left: (
      <div className="space-y-4">
        <PageTitle>DISTINCT 去重</PageTitle>
        <BookParagraph>使用DISTINCT关键字可以去除查询结果中的重复行，只返回唯一值。DISTINCT作用于所有选定字段的组合。</BookParagraph>
        <BookCode language="sql" code={`-- 去重单字段
SELECT DISTINCT age FROM students;

-- 多字段去重（组合唯一）
SELECT DISTINCT class_id, gender FROM students;

-- 统计去重后的数量
SELECT COUNT(DISTINCT class_id) AS 班级数 FROM students;`} />
        <BookAlert type="info" message="DISTINCT 放在 SELECT 后，作用于所有查询字段的组合。多字段时只有当所有字段值都相同时才视为重复。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>别名 AS</PageTitle>
        <BookParagraph>使用AS为字段或表起别名，使查询结果更清晰易读。AS关键字可以省略，直接用空格分隔。</BookParagraph>
        <BookCode language="sql" code={`-- 字段别名
SELECT name AS 姓名, age AS 年龄 FROM students;

-- 省略 AS
SELECT name 姓名, age 年龄 FROM students;

-- 带空格的别名需加引号
SELECT name AS "学生姓名" FROM students;

-- 表别名（简化多表查询）
SELECT s.name, c.name AS 班级名
FROM students s
JOIN classes c ON s.class_id = c.id;`} />
        <BookAlert type="info" message="AS 可省略，直接写空格。别名包含空格或特殊字符时需要加引号。表别名在多表连接时非常实用。" />
      </div>
    ),
  },
  {
    label: '综合练习',
    left: (
      <div className="space-y-4">
        <PageTitle>课后练习</PageTitle>
        <BookParagraph>通过以下练习掌握SELECT查询的多种用法：</BookParagraph>
        <BookList items={[
          '查询 students 表的所有数据',
          '查询 students 表中所有不重复的 age',
          '查询 students 表的 name 和 age，并将 name 显示为"姓名"',
          '查询所有学生的姓名和年龄加5后的结果',
          '统计 students 表中不同班级的数量',
        ]} />
        <BookAlert type="info" message="多练习SELECT语句，熟悉字段选择和结果处理。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>参考代码</PageTitle>
        <BookCode language="sql" code={`-- 查询所有数据
SELECT * FROM students;

-- 去重年龄
SELECT DISTINCT age FROM students;

-- 别名显示
SELECT name AS 姓名, age FROM students;

-- 表达式查询
SELECT name, age + 5 AS 五年后年龄 FROM students;

-- 统计不同班级数
SELECT COUNT(DISTINCT class_id) AS 班级总数 FROM students;`} />
        <BookAlert type="success" message="DISTINCT放在SELECT后，AS可省略。合理使用别名和表达式能让查询结果更直观。" />
        <TagGrid items={['SELECT', 'DISTINCT', 'AS', '别名', '表达式']} />
      </div>
    ),
  },
]

export default function SqlSelectPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

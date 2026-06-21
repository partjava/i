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
  chapterTitle: '实战练习',
  chapterNumber: 9,
  totalChapters: 9,
  subjectHref: '/study/computer/sql',
  prevChapter: { label: '索引与性能优化', href: '/study/computer/sql/index-optimize' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '业务场景实战',
    left: (
      <div className="space-y-4">
        <PageTitle>业务数据分析实战</PageTitle>
        <BookParagraph>结合实际业务场景，综合运用SQL知识完成以下数据分析任务。这些场景涵盖常见的报表统计、异常检测和排名查询。</BookParagraph>
        <BookList items={[
          '统计每个班级的及格率、最高分、最低分',
          '找出所有成绩异常（如分数 < 0 或 > 100）的学生',
          '查询每个班级分数排名前3的学生姓名和分数',
          '统计各科老师的平均授课学生数',
          '查询连续3次考试都进步的学生',
        ]} />
        <BookAlert type="info" message="可结合分组、聚合、窗口函数等知识点完成。建议先理清业务逻辑再写SQL。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>参考答案</PageTitle>
        <BookCode language="sql" code={`-- 班级及格率、最高分、最低分
SELECT class_id,
  COUNT(CASE WHEN score >= 60 THEN 1 END) * 1.0 / COUNT(*) AS 及格率,
  MAX(score) AS 最高分,
  MIN(score) AS 最低分
FROM students
GROUP BY class_id;

-- 成绩异常检查
SELECT * FROM students
WHERE score < 0 OR score > 100;

-- 各班前3名
SELECT name, class_id, score
FROM (
  SELECT name, class_id, score,
    ROW_NUMBER() OVER(PARTITION BY class_id ORDER BY score DESC) AS rn
  FROM students
) t
WHERE rn <= 3;`} />
        <BookAlert type="success" message="分组统计用GROUP BY + 聚合函数。CASE WHEN实现条件计数。窗口函数ROW_NUMBER()实现组内排名。" />
      </div>
    ),
  },
  {
    label: '综合查询与优化',
    left: (
      <div className="space-y-4">
        <PageTitle>综合查询与优化</PageTitle>
        <BookParagraph>完成以下综合查询与优化任务，提升复杂SQL的编写和调优能力：</BookParagraph>
        <BookList items={[
          '查询所有分数高于班级平均分的学生及其班级名',
          '优化一条包含多表连接和分组的慢SQL',
          '分析一条SQL的执行计划，指出是否走索引并优化',
          '设计一个学生成绩汇总查询，同时显示总分、排名、班级平均分',
        ]} />
        <BookAlert type="success" message="注意SQL写法、索引设计与EXPLAIN分析。多表连接时先缩小数据范围再JOIN。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>参考代码</PageTitle>
        <BookCode language="sql" code={`-- 高于班级平均分的学生
SELECT s.name, s.score, c.name AS 班级
FROM students s
JOIN classes c ON s.class_id = c.id
WHERE s.score > (
  SELECT AVG(score)
  FROM students
  WHERE class_id = s.class_id
);

-- 成绩汇总（显示总分、排名、班级平均分）
SELECT s.name, s.score,
  RANK() OVER(ORDER BY s.score DESC) AS 全校排名,
  AVG(s.score) OVER(PARTITION BY s.class_id) AS 班级平均分
FROM students s
ORDER BY s.score DESC;

-- EXPLAIN 分析执行计划
EXPLAIN SELECT s.name, s.score
FROM students s
WHERE s.class_id = 1
ORDER BY s.score DESC;`} />
        <BookAlert type="success" message="相关子查询 + JOIN 实现跨表比较。窗口函数可同时实现排名和分组统计。EXPLAIN 检查是否走 class_id 索引。" />
      </div>
    ),
  },
  {
    label: '面试真题',
    left: (
      <div className="space-y-4">
        <PageTitle>面试真题与解析</PageTitle>
        <BookParagraph>精选常见SQL面试题，涵盖分组、窗口函数、索引优化等高频考点：</BookParagraph>
        <BookList items={[
          '如何查询每个班级分数第二高的学生？',
          '如何找出有重复手机号的学生？',
          'SQL优化常见思路有哪些？',
          '窗口函数和 GROUP BY 的区别是什么？',
          '什么是索引的最左前缀原则？',
        ]} />
        <BookAlert type="warning" message="多练习窗口函数、分组、索引优化等高频考点。面试中不仅要会写SQL，还要能讲清楚优化思路。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>参考代码</PageTitle>
        <BookCode language="sql" code={`-- 每个班级分数第二高的学生
SELECT name, class_id, score
FROM (
  SELECT name, class_id, score,
    DENSE_RANK() OVER(
      PARTITION BY class_id ORDER BY score DESC
    ) AS rk
  FROM students
) t
WHERE rk = 2;

-- 有重复手机号的学生
SELECT phone, COUNT(*) AS 人数
FROM students
GROUP BY phone
HAVING COUNT(*) > 1;

-- 查找重复数据明细
SELECT * FROM students
WHERE phone IN (
  SELECT phone FROM students
  GROUP BY phone
  HAVING COUNT(*) > 1
)
ORDER BY phone;`} />
        <BookAlert type="success" message="DENSE_RANK() 实现分组排名（不跳号）。GROUP BY + HAVING COUNT(*) > 1 查找重复数据。窗口函数不减少行数，GROUP BY 会合并行。" />
      </div>
    ),
  },
  {
    label: '综合练习',
    left: (
      <div className="space-y-4">
        <PageTitle>综合练习</PageTitle>
        <BookParagraph>以下练习综合运用所学SQL知识，从简单到复杂逐步进阶：</BookParagraph>
        <BookList items={[
          '查询所有分数高于班级平均分的学生及其班级名',
          '统计每个班级的及格率、最高分、最低分',
          '查询每个班级分数排名前3的学生姓名和分数',
          '找出有重复手机号的学生',
          '优化一条包含多表连接和分组的慢SQL',
          '使用窗口函数实现分组内累计求和',
        ]} />
        <BookAlert type="info" message="建议多动手练习，遇到慢SQL及时分析优化。SQL技能需要在实际使用中不断积累。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>参考答案与解析</PageTitle>
        <BookCode language="sql" code={`-- 各练习参考答案汇总

-- 1. 高于班级平均分
SELECT s.name, s.score, c.name AS 班级
FROM students s
JOIN classes c ON s.class_id = c.id
WHERE s.score > (
  SELECT AVG(score) FROM students WHERE class_id = s.class_id
);

-- 2. 班级及格率
SELECT class_id,
  COUNT(CASE WHEN score >= 60 THEN 1 END) * 1.0 / COUNT(*) AS 及格率,
  MAX(score) AS 最高分, MIN(score) AS 最低分
FROM students
GROUP BY class_id;

-- 3. 各班前3名
SELECT name, class_id, score FROM (
  SELECT name, class_id, score,
    ROW_NUMBER() OVER(PARTITION BY class_id ORDER BY score DESC) AS rn
  FROM students
) t WHERE rn <= 3;

-- 4. 重复手机号
SELECT phone, COUNT(*) FROM students
GROUP BY phone HAVING COUNT(*) > 1;

-- 5. 分组内累计
SELECT name, class_id, score,
  SUM(score) OVER(PARTITION BY class_id ORDER BY score DESC) AS 班级累计
FROM students;`} />
        <BookAlert type="success" message="相关子查询 + JOIN 实现分组内比较。窗口函数 ROW_NUMBER() 和 SUM() OVER 分别实现排名和累计，是数据分析的利器。" />
        <TagGrid items={['实战', '面试', '优化', '窗口函数', '索引', '分组统计']} />
      </div>
    ),
  },
]

export default function SqlProjectsPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

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
  chapterTitle: '聚合与分组',
  chapterNumber: 6,
  totalChapters: 9,
  subjectHref: '/study/computer/sql',
  prevChapter: { label: '数据增删改', href: '/study/computer/sql/crud' },
  nextChapter: { label: '子查询与视图', href: '/study/computer/sql/subquery-view' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '聚合函数',
    left: (
      <div className="space-y-4">
        <PageTitle>常用聚合函数</PageTitle>
        <BookParagraph>SQL聚合函数用于对一组数据进行统计计算，常与GROUP BY结合完成分组统计。它们是数据分析的核心工具。</BookParagraph>
        <BookCode language="sql" code={`-- 常用聚合函数
SELECT COUNT(*)       AS 总人数,
       AVG(score)     AS 平均分,
       MAX(score)     AS 最高分,
       MIN(score)     AS 最低分,
       SUM(score)     AS 总分
FROM students;

-- COUNT 不同用法
SELECT COUNT(*)       FROM students;  -- 所有行
SELECT COUNT(1)       FROM students;  -- 等价于 COUNT(*)
SELECT COUNT(age)     FROM students;  -- 非 NULL 的 age 数量
SELECT COUNT(DISTINCT class_id) FROM students;  -- 去重统计

-- 聚合函数忽略 NULL
SELECT AVG(score) FROM students;    -- 忽略 NULL
SELECT SUM(score) / COUNT(*) FROM students;  -- 含 NULL 计算`} />
        <BookAlert type="info" message="COUNT统计行数，SUM求和，AVG平均，MAX/MIN最大最小。聚合函数忽略NULL值。COUNT(*)和COUNT(1)性能相近，都统计所有行。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>聚合函数进阶</PageTitle>
        <BookParagraph>聚合函数可与条件表达式结合，实现更灵活的统计：</BookParagraph>
        <BookCode language="sql" code={`-- 条件统计
SELECT COUNT(CASE WHEN score >= 60 THEN 1 END) AS 及格人数,
       COUNT(*) AS 总人数
FROM students;

-- 统计各分数段
SELECT
  SUM(CASE WHEN score >= 90 THEN 1 ELSE 0 END) AS 优秀,
  SUM(CASE WHEN score >= 60 AND score < 90 THEN 1 ELSE 0 END) AS 良好,
  SUM(CASE WHEN score < 60 THEN 1 ELSE 0 END) AS 不及格
FROM students;

-- 聚合运算
SELECT AVG(score) AS 平均分,
       MAX(score) - MIN(score) AS 分差,
       VARIANCE(score) AS 方差,
       STDDEV(score) AS 标准差
FROM students;`} />
        <BookAlert type="success" message="CASE WHEN + 聚合函数可实现条件统计。VARIANCE和STDDEV用于数据分析中的离散度度量。" />
      </div>
    ),
  },
  {
    label: 'GROUP BY与HAVING',
    left: (
      <div className="space-y-4">
        <PageTitle>GROUP BY 分组统计</PageTitle>
        <BookParagraph>GROUP BY用于将数据按指定字段分组，配合聚合函数实现分组统计。分组后SELECT中只能出现分组字段或聚合函数。</BookParagraph>
        <BookCode language="sql" code={`-- 按班级统计平均分
SELECT class_id,
       AVG(score) 平均分,
       COUNT(*) 人数
FROM students
GROUP BY class_id;

-- 多字段分组
SELECT class_id, gender,
       COUNT(*) 人数,
       AVG(score) 平均分
FROM students
GROUP BY class_id, gender
ORDER BY class_id;

-- WHERE + GROUP BY
SELECT class_id, AVG(score) 平均分
FROM students
WHERE score IS NOT NULL
GROUP BY class_id;`} />
        <BookAlert type="info" message="WHERE用于分组前过滤，HAVING用于分组后过滤。可多字段分组。SELECT中非聚合列必须出现在GROUP BY中。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>HAVING 分组后过滤</PageTitle>
        <BookParagraph>HAVING类似于WHERE但作用于分组后的结果集，可以使用聚合函数作为过滤条件。</BookParagraph>
        <BookCode language="sql" code={`-- HAVING 过滤分组
SELECT class_id,
       AVG(score) 平均分
FROM students
GROUP BY class_id
HAVING AVG(score) > 80;

-- WHERE + GROUP BY + HAVING 执行顺序
SELECT class_id,
       COUNT(*) 人数,
       AVG(score) 平均分
FROM students
WHERE gender = '女'         -- ① 先过滤行
GROUP BY class_id          -- ② 再分组
HAVING AVG(score) > 75     -- ③ 后过滤组
ORDER BY 平均分 DESC;       -- ④ 最后排序

-- 查询人数大于10的班级
SELECT class_id, COUNT(*) 人数
FROM students
GROUP BY class_id
HAVING COUNT(*) > 10;`} />
        <BookAlert type="success" message="执行顺序：WHERE → GROUP BY → HAVING → ORDER BY。WHERE不能使用聚合函数，HAVING可以。HAVING 条件中不能使用别名（MySQL除外）。" />
      </div>
    ),
  },
  {
    label: '窗口函数',
    left: (
      <div className="space-y-4">
        <PageTitle>复杂聚合与窗口函数</PageTitle>
        <BookParagraph>窗口函数（Window Function）可在不改变行数的情况下实现分组内排名、累计和、移动平均等复杂统计，是SQL进阶的重要知识点。</BookParagraph>
        <BookCode language="sql" code={`-- 分组内排名
SELECT name, class_id, score,
  ROW_NUMBER() OVER(
    PARTITION BY class_id
    ORDER BY score DESC
  ) AS 班内排名
FROM students;

-- RANK / DENSE_RANK 排名
SELECT name, score,
  RANK() OVER(ORDER BY score DESC) AS 排名,        -- 并列跳号
  DENSE_RANK() OVER(ORDER BY score DESC) AS 密集排名 -- 并列不跳号
FROM students;

-- 累计和
SELECT name, score,
  SUM(score) OVER(
    ORDER BY score DESC
  ) AS 累计分
FROM students;`} />
        <BookAlert type="info" message="窗口函数需MySQL 8.0+支持。OVER(PARTITION BY ... ORDER BY ...) 实现分组内统计。ROW_NUMBER()始终不重复，RANK()并列会跳号，DENSE_RANK()并列不跳号。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>窗口函数进阶</PageTitle>
        <BookParagraph>窗口函数还支持滑动窗口、前后行引用等高级功能：</BookParagraph>
        <BookCode language="sql" code={`-- 滑动平均（前2行到当前行）
SELECT name, score,
  AVG(score) OVER(
    ORDER BY score DESC
    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
  ) AS 移动平均
FROM students;

-- 分区累计
SELECT name, class_id, score,
  SUM(score) OVER(
    PARTITION BY class_id
    ORDER BY score DESC
  ) AS 班级累计
FROM students;

-- LAG/LEAD 前后行引用
SELECT name, score,
  LAG(score, 1) OVER(ORDER BY score DESC) AS 上一名,
  LEAD(score, 1) OVER(ORDER BY score DESC) AS 下一名
FROM students;

-- FIRST_VALUE / LAST_VALUE
SELECT name, score,
  FIRST_VALUE(name) OVER(ORDER BY score DESC) AS 第一名,
  LAST_VALUE(name) OVER(
    ORDER BY score DESC
    RANGE BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
  ) AS 最后一名
FROM students;`} />
        <BookAlert type="success" message="窗口函数是SQL进阶必备技能，特别适合数据分析场景。注意窗口默认范围是 RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW。" />
      </div>
    ),
  },
  {
    label: '综合练习',
    left: (
      <div className="space-y-4">
        <PageTitle>课后练习</PageTitle>
        <BookParagraph>通过练习掌握聚合与分组：</BookParagraph>
        <BookList items={[
          '统计每个班级的学生人数和平均分',
          '查询平均分大于85的班级编号和平均分',
          '查询每个班级分数最高的前两名学生姓名、分数及班级编号',
          '统计每个班级各性别人数',
          '计算全体学生的总分排名（使用窗口函数）',
        ]} />
        <BookAlert type="info" message="多练习分组统计与窗口函数，掌握数据分析常用SQL。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>参考代码</PageTitle>
        <BookCode language="sql" code={`-- 班级人数和平均分
SELECT class_id,
  COUNT(*) 人数,
  AVG(score) 平均分
FROM students
GROUP BY class_id;

-- 平均分大于85
SELECT class_id, AVG(score) 平均分
FROM students
GROUP BY class_id
HAVING AVG(score) > 85;

-- 各班前两名
SELECT name, class_id, score
FROM (
  SELECT name, class_id, score,
    ROW_NUMBER() OVER(
      PARTITION BY class_id ORDER BY score DESC
    ) AS rn
  FROM students
) t
WHERE rn <= 2;

-- 各班级性别统计
SELECT class_id, gender,
  COUNT(*) 人数
FROM students
GROUP BY class_id, gender
ORDER BY class_id;

-- 总分排名
SELECT name, score,
  RANK() OVER(ORDER BY score DESC) 排名
FROM students;`} />
        <BookAlert type="success" message="窗口函数 ROW_NUMBER() 分组内排名可实现「每组前N」需求。GROUP BY + HAVING 是分组统计的标准写法。" />
      </div>
    ),
  },
]

export default function SqlGroupPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

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
  chapterTitle: '子查询与视图',
  chapterNumber: 7,
  totalChapters: 9,
  subjectHref: '/study/computer/sql',
  prevChapter: { label: '聚合与分组', href: '/study/computer/sql/group' },
  nextChapter: { label: '索引与性能优化', href: '/study/computer/sql/index-optimize' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '子查询类型',
    left: (
      <div className="space-y-4">
        <PageTitle>子查询类型与用法</PageTitle>
        <BookParagraph>子查询是嵌套在另一个SQL语句中的查询，可分为标量子查询、行子查询、表子查询和相关子查询。常与IN、EXISTS、ANY、ALL等关键字结合使用。</BookParagraph>
        <BookCode language="sql" code={`-- 标量子查询（返回单值）
SELECT name FROM students
WHERE class_id = (
  SELECT id FROM classes WHERE name = '高三一班'
);

-- 表子查询（作为临时表）
SELECT * FROM (
  SELECT * FROM students WHERE age > 18
) t;

-- 行子查询（多字段比较）
SELECT * FROM students
WHERE (class_id, score) = (
  SELECT class_id, MAX(score)
  FROM students
  GROUP BY class_id
  LIMIT 1
);`} />
        <BookAlert type="info" message="相关子查询可引用外层表字段。标量子查询返回单个值，表子查询可当作临时表使用。子查询必须用括号包裹。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>IN / EXISTS 用法</PageTitle>
        <BookParagraph>IN和EXISTS都用于判断是否存在关联数据，但执行效率和使用场景有所不同。</BookParagraph>
        <BookCode language="sql" code={`-- IN：值在子查询结果集中
SELECT name FROM students
WHERE class_id IN (
  SELECT id FROM classes WHERE grade = 3
);

-- NOT IN：值不在子查询结果集中
SELECT name FROM students
WHERE class_id NOT IN (
  SELECT id FROM classes WHERE grade = 1
);

-- EXISTS：存在关联数据
SELECT name FROM students s
WHERE EXISTS (
  SELECT 1 FROM scores sc
  WHERE sc.student_id = s.id
);

-- NOT EXISTS：不存在关联数据
SELECT name FROM students s
WHERE NOT EXISTS (
  SELECT 1 FROM scores sc
  WHERE sc.student_id = s.id
);

-- ANY / ALL 比较
SELECT * FROM students
WHERE score > ALL (
  SELECT score FROM students WHERE class_id = 1
);`} />
        <BookAlert type="success" message="EXISTS适合判断是否存在关联数据，查到即停，性能优于IN（大数据集时）。NOT IN注意NULL值问题，NOT EXISTS更安全。EXISTS 中 SELECT 1 只是习惯写法。" />
      </div>
    ),
  },
  {
    label: '视图创建与应用',
    left: (
      <div className="space-y-4">
        <PageTitle>视图的创建与应用</PageTitle>
        <BookParagraph>视图（VIEW）是虚拟表，基于SQL查询结果动态生成，不存储实际数据。视图可简化复杂查询、增强数据安全性和逻辑复用性。</BookParagraph>
        <BookCode language="sql" code={`-- 创建视图
CREATE VIEW v_high_score AS
SELECT name, score FROM students WHERE score > 90;

-- 查询视图（与查询普通表一样）
SELECT * FROM v_high_score;

-- 创建多表视图
CREATE VIEW v_student_info AS
SELECT s.name AS 姓名,
       c.name AS 班级,
       t.name AS 班主任
FROM students s
JOIN classes c ON s.class_id = c.id
JOIN teachers t ON c.teacher_id = t.id;

-- 使用视图简化业务查询
SELECT * FROM v_student_info WHERE 班级 = '高三一班';`} />
        <BookAlert type="success" message="视图本身不存储数据，基于原表动态生成。可用于权限隔离—只暴露视图不暴露原表。视图可简化复杂多表查询，提高代码复用性。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>视图管理与高级用法</PageTitle>
        <BookParagraph>视图支持更新、替换和删除操作，但需要注意其限制条件。</BookParagraph>
        <BookCode language="sql" code={`-- 更新视图定义
CREATE OR REPLACE VIEW v_high_score AS
SELECT name, score FROM students WHERE score > 95;

-- 删除视图
DROP VIEW v_high_score;

-- 创建可更新视图
CREATE VIEW v_active_students AS
SELECT id, name, age, class_id
FROM students
WHERE status = 'active';

-- 通过视图更新数据
UPDATE v_active_students
SET age = age + 1
WHERE class_id = 2;

-- 检查视图状态
SHOW CREATE VIEW v_high_score;

-- 带 WITH CHECK OPTION
CREATE VIEW v_adult_students AS
SELECT * FROM students WHERE age >= 18
WITH CHECK OPTION;
-- 以下会报错（年龄不满足视图条件）
-- INSERT INTO v_adult_students (name, age) VALUES ('小明', 15);`} />
        <BookAlert type="info" message="WITH CHECK OPTION 防止通过视图插入不符合视图条件的数据。并非所有视图都可更新（如含 DISTINCT、GROUP BY 的视图不可更新）。" />
        <TagGrid items={['子查询', 'IN', 'EXISTS', 'ANY', 'ALL', '视图', 'CREATE VIEW']} />
      </div>
    ),
  },
  {
    label: '进阶技巧',
    left: (
      <div className="space-y-4">
        <PageTitle>子查询与视图进阶</PageTitle>
        <BookParagraph>实际开发中常用嵌套子查询与视图优化实现复杂查询逻辑：</BookParagraph>
        <BookCode language="sql" code={`-- 嵌套子查询：查询每个班级分数最高的学生
SELECT name, class_id, score FROM students
WHERE (class_id, score) IN (
  SELECT class_id, MAX(score)
  FROM students
  GROUP BY class_id
);

-- 视图优化：复杂多表查询封装
CREATE VIEW v_class_stats AS
SELECT c.name AS 班级,
       COUNT(s.id) AS 人数,
       AVG(sc.score) AS 平均分
FROM classes c
LEFT JOIN students s ON c.id = s.class_id
LEFT JOIN scores sc ON s.id = sc.student_id
GROUP BY c.id, c.name;

-- 使用优化后的视图
SELECT * FROM v_class_stats
WHERE 平均分 > 80
ORDER BY 平均分 DESC;`} />
        <BookAlert type="info" message="嵌套子查询可实现分组极值筛选。视图可提升查询复用性和安全性，将复杂业务逻辑封装在视图中简化上层查询。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>子查询性能对比</PageTitle>
        <BookParagraph>不同子查询写法在性能上差异明显，选择合适的写法至关重要。</BookParagraph>
        <BookCode language="sql" code={`-- 情况1：用 IN 还是 EXISTS？
-- EXISTS 适合大数据集、相关子查询
SELECT * FROM students s
WHERE EXISTS (
  SELECT 1 FROM scores sc
  WHERE sc.student_id = s.id AND sc.score > 90
);

-- 情况2：用 JOIN 代替子查询
-- 子查询写法
SELECT name FROM students
WHERE class_id IN (
  SELECT id FROM classes WHERE grade = 3
);

-- JOIN 改写（通常更高效）
SELECT s.name
FROM students s
JOIN classes c ON s.class_id = c.id
WHERE c.grade = 3;

-- 情况3：用派生表
SELECT t.class_id, t.avg_score
FROM (
  SELECT class_id, AVG(score) avg_score
  FROM students GROUP BY class_id
) t
WHERE t.avg_score > 80;`} />
        <BookAlert type="success" message="能用JOIN时优先用JOIN而非子查询。EXISTS在大数据集下通常比IN快。派生表（FROM中的子查询）需起别名。" />
      </div>
    ),
  },
  {
    label: '综合练习',
    left: (
      <div className="space-y-4">
        <PageTitle>课后练习</PageTitle>
        <BookParagraph>通过以下练习掌握子查询与视图：</BookParagraph>
        <BookList items={[
          '查询所有有成绩记录的学生姓名',
          '创建一个视图，显示所有分数大于班级平均分的学生姓名、分数和班级',
          '只允许部分用户查询 v_above_avg 视图，如何实现？',
          '使用子查询找出每个班级分数最高的学生',
          '用 JOIN 改写一个 IN 子查询，比较执行效率',
        ]} />
        <BookAlert type="info" message="多练习子查询与视图设计，提升SQL复杂场景处理能力。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>参考代码</PageTitle>
        <BookCode language="sql" code={`-- 有成绩记录的学生
SELECT name FROM students
WHERE EXISTS (
  SELECT 1 FROM scores
  WHERE scores.student_id = students.id
);

-- 视图：高于班级平均分
CREATE VIEW v_above_avg AS
SELECT s.name, s.score, s.class_id
FROM students s
WHERE s.score > (
  SELECT AVG(score)
  FROM students
  WHERE class_id = s.class_id
);

-- 授权访问视图
GRANT SELECT ON v_above_avg TO 'user'@'host';

-- 各班分数最高的学生
SELECT name, class_id, score FROM students
WHERE (class_id, score) IN (
  SELECT class_id, MAX(score)
  FROM students
  GROUP BY class_id
);

-- IN 子查询转 JOIN
SELECT s.name FROM students s
JOIN classes c ON s.class_id = c.id
WHERE c.grade = 3;`} />
        <BookAlert type="success" message="EXISTS判断是否有关联数据。GRANT SELECT可控制视图访问权限。JOIN改写子查询通常更高效。" />
      </div>
    ),
  },
]

export default function SqlSubqueryViewPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

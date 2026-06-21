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
  chapterTitle: '数据增删改',
  chapterNumber: 5,
  totalChapters: 9,
  subjectHref: '/study/computer/sql',
  prevChapter: { label: '多表查询与连接', href: '/study/computer/sql/join' },
  nextChapter: { label: '聚合与分组', href: '/study/computer/sql/group' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: 'INSERT插入',
    left: (
      <div className="space-y-4">
        <PageTitle>INSERT 多种用法</PageTitle>
        <BookParagraph>INSERT用于向表中插入数据，支持单行、多行、子查询等多种写法，灵活应对不同场景。</BookParagraph>
        <BookCode language="sql" code={`-- 单行插入（指定字段）
INSERT INTO students (name, age, gender)
VALUES ('张三', 18, '男');

-- 单行插入（全部字段）
INSERT INTO students
VALUES (NULL, '李四', 19, '女', 85.5);

-- 多行插入（高效）
INSERT INTO students (name, age, gender)
VALUES ('王五', 20, '男'),
       ('赵六', 19, '女'),
       ('孙七', 21, '男');

-- 子查询插入（数据迁移）
INSERT INTO graduates (name, age)
SELECT name, age FROM students WHERE age > 22;

-- 插入默认值
INSERT INTO students DEFAULT VALUES;

-- 重复键处理
INSERT INTO students (id, name) VALUES (1, '张三')
ON DUPLICATE KEY UPDATE name = '张三';`} />
        <BookAlert type="info" message="多行插入可提升效率。子查询插入常用于数据迁移和备份。未指定字段将插入默认值。ON DUPLICATE KEY UPDATE 用于冲突时更新。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>INSERT 进阶技巧</PageTitle>
        <BookParagraph>处理大量数据插入时的优化策略和注意事项：</BookParagraph>
        <BookCode language="sql" code={`-- 忽略重复（不报错、不插入）
INSERT IGNORE INTO students (id, name)
VALUES (1, '张三'), (2, '李四');

-- 替换（先删后插）
REPLACE INTO students (id, name, age)
VALUES (1, '张三', 20);

-- 从其他表批量导入
INSERT INTO students (name, age, gender)
SELECT name, age, gender
FROM temp_students
WHERE age > 0;

-- 插入后获取自增ID
INSERT INTO students (name) VALUES ('新同学');
SELECT LAST_INSERT_ID();`} />
        <BookAlert type="success" message="INSERT IGNORE 忽略重复键错误。REPLACE 相当于 DELETE + INSERT。LAST_INSERT_ID() 获取当前连接最后插入的自增ID。" />
      </div>
    ),
  },
  {
    label: 'UPDATE更新',
    left: (
      <div className="space-y-4">
        <PageTitle>UPDATE 进阶</PageTitle>
        <BookParagraph>UPDATE可批量修改数据，支持表达式运算和子查询，灵活应对各种数据修正需求。</BookParagraph>
        <BookCode language="sql" code={`-- 单条件批量更新
UPDATE students
SET age = age + 1
WHERE class_id = 2;

-- 多条件更新
UPDATE students
SET score = score + 5
WHERE gender = '女' AND score < 80;

-- 多字段更新
UPDATE students
SET score = 60, age = 20
WHERE name = '张三';

-- 子查询更新
UPDATE students
SET class_id = (
  SELECT id FROM classes WHERE name = '高三一班'
)
WHERE name = '张三';

-- 使用 CASE 做条件更新
UPDATE students
SET score = CASE
  WHEN score >= 90 THEN score + 2
  WHEN score >= 60 THEN score + 5
  ELSE score + 10
END;`} />
        <BookAlert type="success" message="UPDATE可结合表达式实现批量修正。子查询更新需保证唯一性，否则可能报错。CASE WHEN 可实现按条件差异化更新。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>UPDATE 注意事项</PageTitle>
        <BookParagraph>UPDATE 操作不可逆，执行前务必确认条件是否正确。</BookParagraph>
        <BookCode language="sql" code={`-- 先查询再更新（安全操作）
-- 第一步：查看要修改的数据
SELECT * FROM students WHERE class_id = 2;

-- 第二步：确认后执行更新
UPDATE students SET age = age + 1 WHERE class_id = 2;

-- 多表关联更新
UPDATE students s
JOIN classes c ON s.class_id = c.id
SET s.class_id = c.id
WHERE c.name = '高三一班';

-- 限制更新条数
UPDATE students
SET score = 100
ORDER BY score ASC
LIMIT 3;`} />
        <BookAlert type="warning" message="UPDATE 前建议先用 SELECT 预览受影响的数据。多表关联更新使用 JOIN 语法。LIMIT 限制更新行数可降低误操作风险。建议在事务中执行重要更新。" />
      </div>
    ),
  },
  {
    label: 'DELETE删除',
    left: (
      <div className="space-y-4">
        <PageTitle>DELETE 与 TRUNCATE</PageTitle>
        <BookParagraph>DELETE用于按条件删除，TRUNCATE清空整表。两者在性能、可回滚性和日志记录上有本质区别。</BookParagraph>
        <BookCode language="sql" code={`-- 条件删除
DELETE FROM students WHERE score < 60;

-- 清空表（不可回滚）
TRUNCATE TABLE logs;

-- 子查询删除
DELETE FROM students
WHERE class_id NOT IN (
  SELECT id FROM classes
);

-- 多表删除
DELETE s
FROM students s
JOIN classes c ON s.class_id = c.id
WHERE c.name = '高三一班';

-- 外键约束下的删除需注意顺序
DELETE FROM students WHERE class_id = 1;
DELETE FROM classes WHERE id = 1;

-- 误操作防护（先测试SQL）
DELETE FROM students WHERE 1=0; -- 实际不会删除`} />
        <BookAlert type="warning" message="DELETE无WHERE会删除全表，操作前务必确认。TRUNCATE不可回滚且重置自增ID，慎用！外键约束可能导致删除失败，需先删子表再删主表。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>DELETE 进阶与安全</PageTitle>
        <BookParagraph>生产环境下的删除操作需要格外谨慎：</BookParagraph>
        <BookCode language="sql" code={`-- 使用事务保障安全
START TRANSACTION;

DELETE FROM students WHERE score < 60;

-- 确认无误后提交
COMMIT;
-- 如有问题回滚
-- ROLLBACK;

-- 软删除（推荐）
ALTER TABLE students ADD COLUMN is_deleted TINYINT DEFAULT 0;

-- 软删除查询
SELECT * FROM students WHERE is_deleted = 0;

-- 定期清理软删除数据
DELETE FROM students WHERE is_deleted = 1 AND updated_at < NOW() - INTERVAL 30 DAY;`} />
        <BookAlert type="info" message="生产环境推荐软删除（标记删除），保留数据可追溯。重要操作先 BEGIN 事务，确认后再 COMMIT。备份数据是最后的安全网。" />
        <TagGrid items={['INSERT', 'UPDATE', 'DELETE', 'TRUNCATE', '事务', '软删除']} />
      </div>
    ),
  },
  {
    label: '综合练习',
    left: (
      <div className="space-y-4">
        <PageTitle>课后练习</PageTitle>
        <BookParagraph>通过练习掌握数据增删改操作：</BookParagraph>
        <BookList items={[
          '批量将所有 score 小于 60 的学生分数加 10 分',
          '将所有"高三一班"的学生转入"高三二班"',
          '删除所有没有成绩记录的学生',
          '误删了 students 表所有数据，如何恢复？',
          '使用事务安全地更新一批学生的班级信息',
        ]} />
        <BookAlert type="info" message="操作前建议备份数据，批量操作需谨慎。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>参考代码</PageTitle>
        <BookCode language="sql" code={`-- 不及格加分
UPDATE students SET score = score + 10 WHERE score < 60;

-- 转班
UPDATE students SET class_id = (
  SELECT id FROM classes WHERE name = '高三二班'
) WHERE class_id = (
  SELECT id FROM classes WHERE name = '高三一班'
);

-- 删除无成绩记录的学生
DELETE FROM students
WHERE id NOT IN (SELECT student_id FROM scores);

-- 误删恢复（需有备份）
-- SOURCE 备份文件路径;

-- 事务安全更新
START TRANSACTION;
UPDATE students SET class_id = 2 WHERE class_id = 1;
-- 确认无误后
COMMIT;
-- ROLLBACK;`} />
        <BookAlert type="success" message="子查询实现批量转班。NOT IN + 子查询删除无关联数据。SOURCE命令从备份文件恢复。事务保证数据一致性。" />
      </div>
    ),
  },
]

export default function SqlCrudPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

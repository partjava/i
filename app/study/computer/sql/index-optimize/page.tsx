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
  chapterTitle: '索引与性能优化',
  chapterNumber: 8,
  totalChapters: 9,
  subjectHref: '/study/computer/sql',
  prevChapter: { label: '子查询与视图', href: '/study/computer/sql/subquery-view' },
  nextChapter: { label: '实战练习', href: '/study/computer/sql/projects' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '索引基础',
    left: (
      <div className="space-y-4">
        <PageTitle>索引基础与类型</PageTitle>
        <BookParagraph>索引可加速数据检索，类似于书的目录。合理设计索引可大幅提升查询效率，但过多索引会影响写入性能。MySQL InnoDB 使用B+树结构存储索引。</BookParagraph>
        <BookCode language="sql" code={`-- 创建普通索引
CREATE INDEX idx_name ON students(name);

-- 创建唯一索引（值不可重复）
CREATE UNIQUE INDEX idx_unique_email ON students(email);

-- 创建复合索引（多列组合）
CREATE INDEX idx_class_score ON students(class_id, score);

-- 创建前缀索引（字符串前N个字符）
CREATE INDEX idx_name_prefix ON students(name(3));

-- 删除索引
DROP INDEX idx_name ON students;

-- 查看索引
SHOW INDEX FROM students;`} />
        <BookAlert type="info" message="索引底层常用B+树结构。普通索引允许重复值，唯一索引保证唯一性。复合索引遵循「最左前缀」原则——查询条件必须从索引最左列开始才能用到索引。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>索引设计原则</PageTitle>
        <BookParagraph>好的索引设计需要考虑查询模式、数据分布和写负载：</BookParagraph>
        <BookList items={[
          '为经常出现在 WHERE、JOIN、ORDER BY 中的字段建索引',
          '复合索引将选择性高的列放在最左边',
          '避免在索引列上做运算或函数处理',
          '索引不是越多越好——影响 INSERT/UPDATE 性能',
          '小表（数据量 < 1000）无需加索引，全表扫描更快',
          '使用 EXPLAIN 检查 SQL 是否走索引',
        ]} />
        <BookCode language="sql" code={`-- 用 EXPLAIN 分析查询是否走索引
EXPLAIN SELECT * FROM students WHERE class_id = 1;

-- 结果中 key 列显示使用的索引
-- type 列：ALL（全表扫描）→ index → range → ref → const（最优）`} />
        <BookAlert type="success" message="EXPLAIN 可查看SQL是否走索引及执行计划。type列从ALL到const表示性能依次提升。关注 key、rows、Extra 三列。" />
      </div>
    ),
  },
  {
    label: '查询优化技巧',
    left: (
      <div className="space-y-4">
        <PageTitle>查询优化技巧</PageTitle>
        <BookParagraph>通过EXPLAIN分析SQL执行计划，定位慢查询并优化：</BookParagraph>
        <BookCode language="sql" code={`-- 查看执行计划
EXPLAIN SELECT * FROM students WHERE class_id = 1 AND score > 80;

-- 慢查询日志（定位性能瓶颈）
-- MySQL 配置
SET GLOBAL slow_query_log = ON;
SET GLOBAL long_query_time = 2;  -- 超过2秒的记录

-- 查看慢查询日志
SHOW VARIABLES LIKE 'slow_query_log_file';`} />
        <BookAlert type="success" message="EXPLAIN可查看SQL是否走索引。慢查询日志可定位性能瓶颈。重点关注 rows 字段——扫描行数越少越好。" />
        <h3 className="text-sm font-medium text-ink mt-4">常见优化方法</h3>
        <BookList items={[
          '优先使用索引字段做条件',
          '避免 SELECT *，只查需要的字段',
          '合理拆分复杂SQL，减少嵌套深度',
          '避免在 WHERE 中对索引字段做函数运算',
          '使用 UNION ALL 代替 OR（可走索引）',
          '大数据量分页优化（延迟关联）',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>SQL 优化实战</PageTitle>
        <BookCode language="sql" code={`-- 优化前：避免函数运算
-- 索引失效
SELECT * FROM students WHERE LEFT(name, 1) = '张';

-- 优化后：改用范围查询（可利用索引）
SELECT * FROM students WHERE name LIKE '张%';

-- 优化前：避免隐式类型转换
SELECT * FROM students WHERE phone = 13800138000;  -- phone 是字符串

-- 优化后
SELECT * FROM students WHERE phone = '13800138000';

-- 优化前：避免 SELECT *
SELECT * FROM students WHERE class_id = 1;

-- 优化后：只取需要的字段
SELECT id, name, score FROM students WHERE class_id = 1;

-- 分页优化（延迟关联）
-- 优化前
SELECT * FROM students ORDER BY id LIMIT 100000, 10;
-- 优化后
SELECT s.* FROM students s
JOIN (SELECT id FROM students ORDER BY id LIMIT 100000, 10) tmp
ON s.id = tmp.id;`} />
        <BookAlert type="warning" message="对索引字段做运算或函数会导致索引失效！隐式类型转换也使索引失效。分页越深越慢，延迟关联可大幅提升深分页性能。" />
      </div>
    ),
  },
  {
    label: '事务与锁',
    left: (
      <div className="space-y-4">
        <PageTitle>索引与事务、锁</PageTitle>
        <BookParagraph>索引失效、事务隔离与锁机制是性能优化中需要重点关注的内容：</BookParagraph>
        <BookCode language="sql" code={`-- 索引失效场景汇总
-- 1. 函数运算
SELECT * FROM students WHERE LEFT(name,1) = '张';
-- 2. 隐式类型转换
SELECT * FROM students WHERE phone = 13800138000;
-- 3. 复合索引不满足最左前缀
--   索引 idx_a_b_c(a,b,c)
SELECT * FROM t WHERE b = 1 AND c = 2;  -- 不走索引！
-- 4. LIKE 以 % 开头
SELECT * FROM students WHERE name LIKE '%明';
-- 5. OR 条件含非索引字段
SELECT * FROM students WHERE id = 1 OR age = 20;`} />
        <BookAlert type="warning" message="对索引字段做运算/函数会导致索引失效！高并发下需合理选择事务隔离级别。死锁需通过日志和监控排查。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>事务隔离级别与锁</PageTitle>
        <BookCode language="sql" code={`-- 事务隔离级别
SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;    -- PG/Oracle 默认
SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ;    -- MySQL 默认
SET SESSION TRANSACTION ISOLATION LEVEL SERIALIZABLE;

-- 查看当前隔离级别
SELECT @@transaction_isolation;

-- 查看当前锁状态
SHOW ENGINE INNODB STATUS;

-- 事务示例
START TRANSACTION;
UPDATE students SET score = score + 10 WHERE id = 1;
-- 暂停，另一个事务可以看到当前修改吗？
-- 取决于隔离级别：
--   READ UNCOMMITTED → 脏读
--   READ COMMITTED   → 不可重复读
--   REPEATABLE READ  → 可重复读（MySQL默认，防幻读）
COMMIT;`} />
        <BookAlert type="info" message="隔离级别从低到高：RU → RC → RR → Serializable。隔离级别越高，数据一致性越好，但并发性能越低。MVCC（多版本并发控制）是InnoDB实现RR级别不阻塞读的关键。" />
      </div>
    ),
  },
  {
    label: '综合练习',
    left: (
      <div className="space-y-4">
        <PageTitle>课后练习</PageTitle>
        <BookParagraph>通过练习掌握索引与SQL优化：</BookParagraph>
        <BookList items={[
          '为 students 表的 class_id 和 score 字段设计高效索引，并写出创建语句',
          '优化 SQL：SELECT * FROM students WHERE score + 10 > 90',
          '简述如何排查和解决死锁问题',
          '使用 EXPLAIN 分析一条慢查询，指出是否走索引',
          '设计一个复合索引，满足以下查询：WHERE class_id = 1 AND score > 80 ORDER BY age',
        ]} />
        <BookAlert type="info" message="多关注索引设计与SQL优化，提升数据库性能。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>参考代码</PageTitle>
        <BookCode language="sql" code={`-- 创建复合索引（class_id + score）
CREATE INDEX idx_class_score ON students(class_id, score);

-- 优化函数运算（避免对索引字段做运算）
-- 原：WHERE score + 10 > 90
-- 改：WHERE score > 80

-- 死锁排查
SHOW ENGINE INNODB STATUS;
-- 分析SQL顺序，统一事务中表的访问顺序
-- 优化大事务，拆分为小事务

-- 复合索引设计
-- 查询：WHERE class_id = 1 AND score > 80 ORDER BY age
CREATE INDEX idx_csa ON students(class_id, score, age);
-- 最左前缀：class_id 等值 → score 范围 → age 排序

-- EXPLAIN 使用
EXPLAIN SELECT id, name FROM students
WHERE class_id = 1 AND score > 80
ORDER BY age;`} />
        <BookAlert type="success" message="复合索引设计遵循「最左前缀」原则。索引字段顺序：等值条件 → 范围条件 → ORDER BY 字段。死锁排查需分析事务顺序和索引使用情况。" />
      </div>
    ),
  },
]

export default function SqlIndexOptimizePage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

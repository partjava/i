-- 把演示用户（id 2-7）的笔记时间随机分散到 2026-01-20 ~ 2026-02-28
UPDATE notes
SET
  created_at = TIMESTAMP(
    DATE_ADD('2026-01-20', INTERVAL FLOOR(RAND() * 39) DAY),
    SEC_TO_TIME(FLOOR(RAND() * 86400))
  ),
  updated_at = created_at
WHERE author_id IN (2, 3, 4, 5, 6, 7);

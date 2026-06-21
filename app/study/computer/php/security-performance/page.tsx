'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList, TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'PHP', chapterTitle: '安全与性能优化', chapterNumber: 14, totalChapters: 22,
  subjectHref: '/study/computer/php',
  prevChapter: { label: '常用扩展与包管理', href: '/study/computer/php/extensions-composer' },
  nextChapter: { label: '测试与调试', href: '/study/computer/php/testing-debugging' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '安全基础',
    left: (<div className="space-y-4"><PageTitle>安全基础</PageTitle><BookCode language="php" code={`<?php
// 输入验证
function sanitize($data) {
    return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
}

// SQL注入防护（PDO）
$stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
$stmt->execute([$id]);

// 密码安全
$hash = password_hash($pwd, PASSWORD_BCRYPT);
if (password_verify($input, $hash)) { }
?>`} /></div>),
    right: (<div className="space-y-4"><SectionTitle>常见漏洞</SectionTitle><BookCode language="php" code={`<?php
// XSS防护
echo htmlspecialchars($input, ENT_QUOTES, 'UTF-8');

// CSRF令牌
$_SESSION['token'] = bin2hex(random_bytes(32));

// 文件上传安全
$ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
$allowed = ['jpg', 'png', 'gif'];
if (!in_array($ext, $allowed)) die("不允许的格式");
?>`} /><TagGrid items={['XSS', 'SQL注入', 'CSRF', 'password_hash', '上传安全']} /></div>),
  },
  {
    label: '性能优化',
    left: (<div className="space-y-4"><SectionTitle>性能优化</SectionTitle><BookCode language="php" code={`<?php
// OPcache（php.ini）
opcache.enable=1
opcache.memory_consumption=128

// Redis缓存
$redis->setex("user:1", 3600, json_encode($user));

// 批量插入
$pdo->beginTransaction();
foreach ($data as $row) {
    $stmt->execute($row);
}
$pdo->commit();
?>`} /></div>),
    right: (<div className="space-y-4"><SectionTitle>代码优化</SectionTitle><BookCode language="php" code={`<?php
// 避免循环中的重复查询
$users = $db->query("SELECT * FROM users");
foreach ($users as $user) { /* 不重复查询 */ }

// 使用生成器处理大数据
function getLines($file) {
    foreach (file($file) as $line) { yield $line; }
}

// 使用SplFixedArray提高性能
$arr = new SplFixedArray(10000);
?>`} /><TagGrid items={['OPcache', 'Redis', '批量插入', '生成器', 'SplFixedArray']} /></div>),
  },
]

export default function PhpSecurityPerformancePage() { return <LessonLayout meta={META} spreads={SPREADS} /> }

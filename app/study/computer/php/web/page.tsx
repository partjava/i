'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList, TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'PHP', chapterTitle: 'Web开发基础', chapterNumber: 9, totalChapters: 22,
  subjectHref: '/study/computer/php',
  prevChapter: { label: '文件与异常处理', href: '/study/computer/php/file-exception' },
  nextChapter: { label: '数据库操作', href: '/study/computer/php/db' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '表单与请求',
    left: (<div className="space-y-4"><PageTitle>表单与请求</PageTitle><BookParagraph>PHP通过$_GET、$_POST、$_REQUEST获取请求数据。</BookParagraph><BookCode language="php" code={`<!-- form.html -->
<form method="POST" action="handler.php">
  <input name="username" />
  <input type="password" name="pwd" />
  <button>提交</button>
</form>

<?php // handler.php
$name = $_POST['username'] ?? '';
$pwd = $_POST['pwd'] ?? '';
echo "欢迎, $name";
?>`} /></div>),
    right: (<div className="space-y-4"><SectionTitle>Session与Cookie</SectionTitle><BookCode language="php" code={`<?php
session_start(); // 启动会话
$_SESSION['user_id'] = 1;  // 设置session

setcookie("lang", "zh-CN", time()+3600); // 设置cookie
echo $_COOKIE['lang'] ?? '默认'; // 读取cookie

// 删除
session_destroy();
setcookie("lang", "", time()-3600);
?>`} /><TagGrid items={['$_GET', '$_POST', 'session', 'setcookie', 'form']} /></div>),
  },
  {
    label: '安全与练习',
    left: (<div className="space-y-4"><SectionTitle>常用安全</SectionTitle><BookCode language="php" code={`<?php
// XSS防护
echo htmlspecialchars($userInput, ENT_QUOTES, 'UTF-8');

// SQL注入防护（PDO）
$stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
$stmt->execute([$id]);

// CSRF防护
$token = bin2hex(random_bytes(32));
$_SESSION['csrf_token'] = $token;
?>`} /></div>),
    right: (<div className="space-y-4"><SectionTitle>练习</SectionTitle><BookList items={['实现登录表单处理', '设置并读取Cookie', '使用session实现购物车']} /><TagGrid items={['XSS', 'SQL注入', 'CSRF', 'htmlspecialchars', '安全']} /></div>),
  },
]

export default function PhpWebPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }

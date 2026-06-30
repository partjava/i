'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList, TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'PHP', chapterTitle: '会话管理与Cookie', chapterNumber: 11, totalChapters: 22,
  subjectHref: '/study/computer/php',
  prevChapter: { label: '数据库操作', href: '/study/computer/php/db' },
  nextChapter: { label: '表单处理与数据验证', href: '/study/computer/php/forms-validation' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: 'Session基础',
    left: (<div className="space-y-4"><PageTitle>会话基础</PageTitle><BookCode language="php" code={`<?php
session_start(); // 启动会话

// 设置session
$_SESSION['user_id'] = 1;
$_SESSION['username'] = "Tom";

// 读取session
echo $_SESSION['username'];

// 删除session
unset($_SESSION['username']);
session_destroy(); // 销毁所有session
?>`} /></div>),
    right: (<div className="space-y-4"><SectionTitle>Cookie基础</SectionTitle><BookCode language="php" code={`<?php
// 设置cookie（过期时间1小时）
setcookie("lang", "zh-CN", time()+3600, "/");

// 读取cookie
echo $_COOKIE['lang'] ?? '默认';

// 删除cookie
setcookie("lang", "", time()-3600, "/");

// 安全配置
setcookie("token", "abc", [
    'expires' => time()+3600,
    'httponly' => true,
    'secure' => true,
    'samesite' => 'Strict',
]);
?>`} /><TagGrid items={['session_start', '$_SESSION', 'setcookie', 'httponly', 'samesite']} /></div>),
  },
  {
    label: '安全与练习',
    left: (<div className="space-y-4"><SectionTitle>会话安全</SectionTitle><BookCode language="php" code={`<?php
// 安全配置
ini_set('session.cookie_httponly', 1);
ini_set('session.cookie_secure', 1);
ini_set('session.cookie_samesite', 'Strict');
ini_set('session.use_only_cookies', 1);

// 记住登录
if ($_POST['remember']) {
    $token = bin2hex(random_bytes(32));
    setcookie("remember_token", $token, time()+86400*30);
}
?>`} /></div>),
    right: (<div className="space-y-4"><SectionTitle>练习</SectionTitle><BookList items={['实现用户登录保持session', '设置安全Cookie', '实现"记住我"功能']} /><TagGrid items={['httponly', 'secure', 'samesite', '记住登录', 'random_bytes']} /></div>),
  },
]

export default function PhpSessionCookiePage() { return <LessonLayout meta={META} spreads={SPREADS} /> }

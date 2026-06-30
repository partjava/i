'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList, TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'PHP', chapterTitle: '数据库操作', chapterNumber: 10, totalChapters: 22,
  subjectHref: '/study/computer/php',
  prevChapter: { label: 'Web开发基础', href: '/study/computer/php/web' },
  nextChapter: { label: '会话管理与Cookie', href: '/study/computer/php/session-cookie' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: 'MySQL基础与连接',
    left: (
      <div className="space-y-4">
        <PageTitle>MySQL基础</PageTitle>
        <BookParagraph>MySQL是最常用的开源关系型数据库，适合Web开发。常用数据类型：INT、VARCHAR、TEXT、DATE、FLOAT等。基本操作：创建数据库、表，插入、查询、更新、删除数据。</BookParagraph>
        <BookCode language="sql" code={`-- 创建数据库
CREATE DATABASE testdb;

-- 创建表
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50),
  age INT
);

-- 插入数据
INSERT INTO users (name, age) VALUES ("Tom", 20);

-- 查询数据
SELECT * FROM users;

-- 更新数据
UPDATE users SET age=21 WHERE name="Tom";

-- 删除数据
DELETE FROM users WHERE name="Tom";`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>连接数据库</SectionTitle>
        <BookParagraph>PHP常用<code>mysqli</code>或<code>PDO</code>扩展连接MySQL。连接时需指定主机、用户名、密码、数据库名，连接失败要有错误处理。</BookParagraph>
        <BookCode language="php" code={`<?php
// mysqli方式
$conn = new mysqli("localhost", "root", "", "testdb");
if ($conn->connect_error) {
  die("连接失败: " . $conn->connect_error);
}

// PDO方式（推荐）
try {
  $pdo = new PDO("mysql:host=localhost;dbname=testdb", "root", "");
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
  echo "连接失败: " . $e->getMessage();
}
?>`} />
      </div>
    ),
  },
  {
    label: '增删改查与安全',
    left: (
      <div className="space-y-4">
        <PageTitle>增删改查（CRUD）</PageTitle>
        <BookParagraph>CRUD即创建（Create）、读取（Read）、更新（Update）、删除（Delete）。PHP可用SQL语句操作数据库，注意SQL注入风险，推荐用预处理。</BookParagraph>
        <BookCode language="php" code={`<?php
$conn = new mysqli("localhost", "root", "", "testdb");

// 插入
$conn->query("INSERT INTO users (name, age) VALUES (\"Alice\", 22)");

// 查询
$result = $conn->query("SELECT * FROM users");
while ($row = $result->fetch_assoc()) {
  echo $row["name"] . ", " . $row["age"] . "<br>";
}

// 更新
$conn->query("UPDATE users SET age=23 WHERE name=\"Alice\"");

// 删除
$conn->query("DELETE FROM users WHERE name=\"Alice\"");
?>`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>预处理与安全</SectionTitle>
        <BookParagraph>预处理语句可防止SQL注入。推荐使用<code>mysqli</code>或<code>PDO</code>的预处理功能，参数绑定可自动转义特殊字符。</BookParagraph>
        <BookCode language="php" code={`<?php
// mysqli预处理
$conn = new mysqli("localhost", "root", "", "testdb");
$stmt = $conn->prepare("SELECT * FROM users WHERE name = ?");
$stmt->bind_param("s", $name);
$name = "Bob";
$stmt->execute();
$result = $stmt->get_result();
while ($row = $result->fetch_assoc()) {
  echo $row["name"];
}

// PDO预处理
$pdo = new PDO("mysql:host=localhost;dbname=testdb", "root", "");
$stmt = $pdo->prepare("SELECT * FROM users WHERE name = ?");
$stmt->execute(["Bob"]);
?>`} />
        <TagGrid items={['prepare', 'bind_param', '预处理', 'SQL注入', '安全']} />
      </div>
    ),
  },
  {
    label: 'PDO用法',
    left: (
      <div className="space-y-4">
        <PageTitle>PDO用法</PageTitle>
        <BookParagraph>PDO（PHP Data Objects）是通用数据库访问接口，支持多种数据库，推荐用异常处理。常用方法：<code>prepare</code>、<code>execute</code>、<code>fetch</code>、<code>fetchAll</code>。</BookParagraph>
        <BookCode language="php" code={`<?php
try {
  $pdo = new PDO("mysql:host=localhost;dbname=testdb", "root", "");
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  // 插入
  $stmt = $pdo->prepare("INSERT INTO users (name, age) VALUES (?, ?)");
  $stmt->execute(["Eve", 25]);

  // 查询
  $stmt = $pdo->query("SELECT * FROM users");
  foreach ($stmt as $row) {
    echo $row["name"] . ", " . $row["age"] . "<br>";
  }

  // 更新
  $stmt = $pdo->prepare("UPDATE users SET age=? WHERE name=?");
  $stmt->execute([26, "Eve"]);

  // 删除
  $stmt = $pdo->prepare("DELETE FROM users WHERE name=?");
  $stmt->execute(["Eve"]);

} catch (PDOException $e) {
  echo $e->getMessage();
}
?>`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>常见问题</SectionTitle>
        <BookParagraph><b>Q: 连接数据库报错怎么办？</b><br />A: 检查主机、端口、用户名、密码、数据库名是否正确。</BookParagraph>
        <BookParagraph><b>Q: 如何防止SQL注入？</b><br />A: 一定要用预处理语句，不要拼接SQL。</BookParagraph>
        <BookParagraph><b>Q: 查询结果乱码？</b><br />A: 设置数据库和连接编码为utf8mb4。</BookParagraph>
        <div className="mt-6">
          <SectionTitle>练习</SectionTitle>
          <BookList items={[
            '用mysqli实现用户信息的增删改查',
            '用PDO实现留言板功能',
            '实现安全的登录验证（防SQL注入）',
            '尝试捕获并处理数据库异常',
          ]} />
        </div>
        <TagGrid items={['mysqli', 'PDO', 'query', 'fetch', 'CRUD', 'prepare', 'bind_param', 'SQL注入', '分页', 'utf8mb4']} />
      </div>
    ),
  },
]

export default function PhpDbPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }

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
  chapterTitle: '数据库基础与环境',
  chapterNumber: 1,
  totalChapters: 9,
  subjectHref: '/study/computer/sql',
  nextChapter: { label: '基本查询（SELECT）', href: '/study/computer/sql/select' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: 'MySQL简介',
    left: (
      <div className="space-y-4">
        <PageTitle>MySQL 简介</PageTitle>
        <BookParagraph>MySQL是最流行的开源关系型数据库管理系统，广泛应用于Web开发、数据分析等领域。MySQL支持SQL标准，易学易用，跨平台，性能高，社区活跃，常用于网站后台、数据仓库、企业应用等。</BookParagraph>
        <BookParagraph>MySQL是关系型数据库，数据以表格形式存储，支持多种存储引擎，默认InnoDB。</BookParagraph>
        <h3 className="text-sm font-medium text-ink mt-4">适用场景</h3>
        <BookList items={[
          'Web 网站后台 — LAMP/LNMP 架构标配',
          '数据仓库 — 结构化数据存储与分析',
          '企业应用 — ERP、CRM 等系统',
          '嵌入式 — 轻量级应用数据存储',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookAlert type="info" message="MySQL 是关系型数据库，数据以表格形式存储。支持多种存储引擎，默认 InnoDB 支持事务和外键。" />
        <h3 className="text-sm font-medium text-ink mt-4">核心特性</h3>
        <BookList items={[
          '支持 SQL 标准，语法简洁易用',
          '跨平台支持（Windows / Linux / macOS）',
          '高性能查询，支持索引和查询优化',
          '社区活跃，生态丰富，文档完善',
          '支持事务（ACID）、外键、存储过程',
        ]} />
      </div>
    ),
  },
  {
    label: '安装与连接',
    left: (
      <div className="space-y-4">
        <PageTitle>安装与环境配置</PageTitle>
        <BookParagraph>MySQL支持Windows、Linux、Mac等多平台，可通过官网下载安装包或包管理器安装。</BookParagraph>
        <BookCode language="bash" code={`# Windows：官网下载并安装 MySQL Installer

# Mac
brew install mysql

# Ubuntu / Debian
sudo apt-get install mysql-server

# CentOS / RHEL
sudo yum install mysql-server`} />
        <BookParagraph>安装后可通过命令行启动服务：</BookParagraph>
        <BookCode language="bash" code={`# Windows
net start mysql

# Mac / Linux
mysql.server start

# 使用 systemctl（现代 Linux）
sudo systemctl start mysql
sudo systemctl enable mysql   # 开机自启`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>客户端与连接方式</PageTitle>
        <BookParagraph>MySQL可通过命令行或图形化客户端连接：</BookParagraph>
        <BookCode language="bash" code={`# 命令行连接
mysql -u root -p

# 远程连接
mysql -h 服务器IP -u 用户名 -p

# 指定端口
mysql -h 127.0.0.1 -P 3306 -u root -p`} />
        <BookAlert type="info" message="本地连接无需-h参数，远程需开放3306端口。连接失败多为防火墙或权限问题。" />
        <h3 className="text-sm font-medium text-ink mt-4">图形化工具</h3>
        <BookList items={[
          'MySQL Workbench — 官方图形化管理工具',
          'DBeaver — 开源通用数据库客户端',
          'Navicat — 商业级数据库管理工具',
          'TablePlus — 现代化原生数据库客户端',
        ]} />
        <BookAlert type="success" message="安装时建议设置root密码。生产环境避免使用root用户，应创建专用账号并分配最小权限。" />
      </div>
    ),
  },
  {
    label: '基本操作',
    left: (
      <div className="space-y-4">
        <PageTitle>数据库基本操作</PageTitle>
        <BookParagraph>常用数据库操作包括创建、删除、切换和查看数据库：</BookParagraph>
        <BookCode language="sql" code={`-- 创建数据库
CREATE DATABASE testdb;

-- 查看所有数据库
SHOW DATABASES;

-- 切换数据库
USE testdb;

-- 查看当前数据库
SELECT DATABASE();

-- 删除数据库
DROP DATABASE testdb;`} />
        <BookAlert type="success" message="SQL语句不区分大小写，建议用分号结尾。操作数据库需有相应权限。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>数据表基本操作</PageTitle>
        <BookCode language="sql" code={`-- 创建表
CREATE TABLE students (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  age INT DEFAULT 18,
  gender CHAR(1),
  score DECIMAL(5,2)
);

-- 查看表结构
DESC students;

-- 查看所有表
SHOW TABLES;

-- 删除表
DROP TABLE students;`} />
        <BookAlert type="info" message="CREATE TABLE 定义字段名、类型和约束。PRIMARY KEY 指定主键，AUTO_INCREMENT 自动递增，NOT NULL 非空约束，DEFAULT 默认值。" />
        <TagGrid items={['CREATE DATABASE', 'DROP', 'SHOW', 'USE', 'CREATE TABLE', '数据类型']} />
      </div>
    ),
  },
  {
    label: '综合练习',
    left: (
      <div className="space-y-4">
        <PageTitle>课后练习</PageTitle>
        <BookParagraph>通过以下练习巩固数据库基础与操作：</BookParagraph>
        <BookList items={[
          '写出MySQL命令行连接本地数据库的完整命令',
          '创建名为 company 的数据库，并切换到该数据库',
          '在 company 库中创建一张 employees 表，包含 id、name、position、salary 字段',
          '使用 DESC 查看 employees 表结构',
          '删除名为 test 的数据库',
        ]} />
        <BookAlert type="info" message="多练习命令行和SQL基本操作，熟悉数据库管理流程。" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>参考代码</PageTitle>
        <BookCode language="bash" code={`# 连接本地数据库
mysql -u root -p`} />
        <BookCode language="sql" code={`-- 创建并切换到 company 数据库
CREATE DATABASE company;
USE company;

-- 创建 employees 表
CREATE TABLE employees (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  position VARCHAR(50),
  salary DECIMAL(10,2)
);

-- 查看表结构
DESC employees;

-- 删除 test 数据库
DROP DATABASE test;`} />
        <BookAlert type="success" message="解析：-u指定用户名，-p提示输入密码。CREATE DATABASE创建数据库，USE切换，DESC查看表结构，DROP DATABASE删除数据库。" />
      </div>
    ),
  },
]

export default function SqlIntroPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

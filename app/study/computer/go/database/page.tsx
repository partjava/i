'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookList,
  TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'Go语言',
  chapterTitle: '数据库操作',
  chapterNumber: 19,
  totalChapters: 23,
  subjectHref: '/study/computer/go',
  prevChapter: { label: 'RESTful API开发', href: '/study/computer/go/rest' },
  nextChapter: { label: '测试与性能优化', href: '/study/computer/go/testing' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '数据库基础与连接',
    left: (
      <div className="space-y-4">
        <PageTitle>数据库基础</PageTitle>
        <BookParagraph>Go常用database/sql标准库操作MySQL、PostgreSQL、SQLite等主流数据库。</BookParagraph>
        <BookList items={[
          '需安装对应驱动，如github.com/go-sql-driver/mysql、github.com/lib/pq等',
          '支持原生SQL、事务、预处理、连接池等',
        ]} />
        <SectionTitle>连接与配置</SectionTitle>
        <BookParagraph>以MySQL为例，演示数据库连接与配置：</BookParagraph>
        <BookCode language="go" code={`import (
    "database/sql"
    _ "github.com/go-sql-driver/mysql"
)

func main() {
    dsn := "user:password@tcp(127.0.0.1:3306)/testdb?charset=utf8mb4&parseTime=True"
    db, err := sql.Open("mysql", dsn)
    if err != nil { panic(err) }
    defer db.Close()
    // 设置最大连接数
    db.SetMaxOpenConns(10)
    db.SetMaxIdleConns(5)
    db.SetConnMaxLifetime(time.Hour)
}`} />
        <BookList items={[
          'DSN格式：user:password@tcp(host:port)/dbname',
          '建议设置连接池参数',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>CRUD操作</SectionTitle>
        <BookParagraph>演示原生SQL的增删改查：</BookParagraph>
        <BookCode language="go" code={`// 插入数据
stmt, _ := db.Prepare("INSERT INTO users(name, age) VALUES(?, ?)")
res, err := stmt.Exec("Tom", 20)
id, _ := res.LastInsertId()

// 查询单条
var name string
err := db.QueryRow("SELECT name FROM users WHERE id=?", id).Scan(&name)

// 查询多条
rows, _ := db.Query("SELECT id, name FROM users")
defer rows.Close()
for rows.Next() {
    var id int
    var name string
    rows.Scan(&id, &name)
    fmt.Println(id, name)
}

// 更新
db.Exec("UPDATE users SET age=? WHERE id=?", 21, id)

// 删除
db.Exec("DELETE FROM users WHERE id=?", id)`} />
        <BookList items={[
          '推荐使用Prepare防SQL注入',
          'QueryRow/Query/Exec分别用于查一条、多条、执行',
        ]} />
        <TagGrid items={['sql.Open', 'DSN', '连接池', 'CRUD', 'Prepare']} />
      </div>
    ),
  },
  {
    label: '事务与ORM',
    left: (
      <div className="space-y-4">
        <PageTitle>事务与预处理</PageTitle>
        <BookParagraph>演示事务处理与批量预处理：</BookParagraph>
        <BookCode language="go" code={`// 开启事务
tx, err := db.Begin()
if err != nil { panic(err) }
defer tx.Rollback()

// 执行多条SQL
_, err = tx.Exec("UPDATE accounts SET balance=balance-100 WHERE id=1")
_, err = tx.Exec("UPDATE accounts SET balance=balance+100 WHERE id=2")

// 提交事务
if err := tx.Commit(); err != nil { panic(err) }

// 预处理批量插入
stmt, _ := db.Prepare("INSERT INTO logs(msg) VALUES(?)")
for i := 0; i < 10; i++ {
    stmt.Exec(fmt.Sprintf("log-%d", i))
}`} />
        <BookList items={[
          'Begin/Commit/Rollback管理事务',
          '预处理适合批量插入/更新',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>ORM与进阶</SectionTitle>
        <BookParagraph>常用GORM库简化数据库操作：</BookParagraph>
        <BookCode language="go" code={`import (
    "gorm.io/gorm"
    "gorm.io/driver/mysql"
)

type User struct {
    ID   uint
    Name string
    Age  int
}

db, _ := gorm.Open(mysql.Open(dsn), &gorm.Config{})
db.AutoMigrate(&User{})

// 新增
db.Create(&User{Name: "Tom", Age: 20})

// 查询
var users []User
db.Where("age > ?", 18).Find(&users)

// 更新
db.Model(&User{}).Where("name = ?", "Tom").Update("age", 21)

// 删除
db.Delete(&User{}, 1)`} />
        <BookList items={[
          'GORM支持模型迁移、链式查询、事务等',
          '适合中大型项目',
        ]} />
        <TagGrid items={['事务', 'Begin/Commit', 'Rollback', 'GORM', 'AutoMigrate']} />
      </div>
    ),
  },
  {
    label: '例题与练习',
    left: (
      <div className="space-y-4">
        <PageTitle>例题与练习</PageTitle>
        <BookParagraph><b>例题1：实现用户注册与登录（原生SQL）</b></BookParagraph>
        <BookCode language="go" code={`// 注册
stmt, _ := db.Prepare("INSERT INTO users(name, password) VALUES(?, ?)")
stmt.Exec("alice", "123456")

// 登录
var pwd string
err := db.QueryRow("SELECT password FROM users WHERE name=?", "alice").Scan(&pwd)
if pwd == "123456" {
    fmt.Println("登录成功")
} else {
    fmt.Println("密码错误")
}`} />
        <BookParagraph><b>例题2：GORM实现分页查询</b></BookParagraph>
        <BookCode language="go" code={`var users []User
db.Offset(10).Limit(10).Find(&users)`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>练习</SectionTitle>
        <BookParagraph><b>练习：实现转账接口（事务）</b></BookParagraph>
        <BookCode language="go" code={`tx, _ := db.Begin()
tx.Exec("UPDATE accounts SET balance=balance-100 WHERE id=1")
tx.Exec("UPDATE accounts SET balance=balance+100 WHERE id=2")
tx.Commit()`} />
        <TagGrid items={['注册登录', '分页', '转账', '事务', '练习']} />
      </div>
    ),
  },
  {
    label: '常见问题',
    left: (
      <div className="space-y-4">
        <PageTitle>常见问题</PageTitle>
        <BookParagraph><b>Q: 如何防止SQL注入？</b><br />A: 使用Prepare和参数化查询。</BookParagraph>
        <BookParagraph><b>Q: 连接池参数如何设置？</b><br />A: 用SetMaxOpenConns、SetMaxIdleConns等方法。</BookParagraph>
        <BookParagraph><b>Q: GORM和原生SQL如何选择？</b><br />A: 小项目用原生SQL，复杂业务推荐GORM。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <TagGrid items={['FAQ', 'SQL注入', 'Prepare', '连接池', 'GORM vs 原生']} />
      </div>
    ),
  },
]

export default function GoDatabasePage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

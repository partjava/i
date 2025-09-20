'use client';

import { useState } from 'react';

const tabs = [
  { key: 'basic', label: '数据库基础' },
  { key: 'connect', label: '连接与配置' },
  { key: 'crud', label: 'CRUD操作' },
  { key: 'tx', label: '事务与预处理' },
  { key: 'orm', label: 'ORM与进阶' },
  { key: 'practice', label: '例题与练习' },
  { key: 'faq', label: '常见问题' },
];

export default function GoDatabasePage() {
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 mt-4">Go语言数据库操作</h1>
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none ${
                activeTab === tab.key
                  ? 'border-blue-500 text-blue-600 font-bold'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="bg-white rounded-lg shadow p-8">
        {activeTab === 'basic' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">数据库基础</h2>
            <p>Go常用database/sql标准库操作MySQL、PostgreSQL、SQLite等主流数据库。</p>
            <ul className="list-disc pl-6 mt-2">
              <li>需安装对应驱动，如<code>github.com/go-sql-driver/mysql</code>、<code>github.com/lib/pq</code>等</li>
              <li>支持原生SQL、事务、预处理、连接池等</li>
            </ul>
          </div>
        )}
        {activeTab === 'connect' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">连接与配置</h2>
            <p>以MySQL为例，演示数据库连接与配置：</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  'import (',
  '    "database/sql"',
  '    _ "github.com/go-sql-driver/mysql"',
  ')',
  '',
  'func main() {',
  '    dsn := "user:password@tcp(127.0.0.1:3306)/testdb?charset=utf8mb4&parseTime=True"',
  '    db, err := sql.Open("mysql", dsn)',
  '    if err != nil {',
  '        panic(err)',
  '    }',
  '    defer db.Close()',
  '    // 设置最大连接数',
  '    db.SetMaxOpenConns(10)',
  '    db.SetMaxIdleConns(5)',
  '    db.SetConnMaxLifetime(time.Hour)',
  '}',
].join('\n')}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>DSN格式：<code>user:password@tcp(host:port)/dbname</code></li>
              <li>建议设置连接池参数</li>
            </ul>
          </div>
        )}
        {activeTab === 'crud' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">CRUD操作</h2>
            <p>演示原生SQL的增删改查：</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '// 插入数据',
  'stmt, _ := db.Prepare("INSERT INTO users(name, age) VALUES(?, ?)")',
  'res, err := stmt.Exec("Tom", 20)',
  'id, _ := res.LastInsertId()',
  '',
  '// 查询单条',
  'var name string',
  'err := db.QueryRow("SELECT name FROM users WHERE id=?", id).Scan(&name)',
  '',
  '// 查询多条',
  'rows, _ := db.Query("SELECT id, name FROM users")',
  'defer rows.Close()',
  'for rows.Next() {',
  '    var id int',
  '    var name string',
  '    rows.Scan(&id, &name)',
  '    fmt.Println(id, name)',
  '}',
  '',
  '// 更新',
  'db.Exec("UPDATE users SET age=? WHERE id=?", 21, id)',
  '',
  '// 删除',
  'db.Exec("DELETE FROM users WHERE id=?", id)',
].join('\n')}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>推荐使用Prepare防SQL注入</li>
              <li>QueryRow/Query/Exec分别用于查一条、多条、执行</li>
            </ul>
          </div>
        )}
        {activeTab === 'tx' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">事务与预处理</h2>
            <p>演示事务处理与批量预处理：</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '// 开启事务',
  'tx, err := db.Begin()',
  'if err != nil { panic(err) }',
  'defer tx.Rollback()',
  '',
  '// 执行多条SQL',
  '_, err = tx.Exec("UPDATE accounts SET balance=balance-100 WHERE id=1")',
  '_, err = tx.Exec("UPDATE accounts SET balance=balance+100 WHERE id=2")',
  '',
  '// 提交事务',
  'if err := tx.Commit(); err != nil { panic(err) }',
  '',
  '// 预处理批量插入',
  'stmt, _ := db.Prepare("INSERT INTO logs(msg) VALUES(?)")',
  'for i := 0; i < 10; i++ {',
  '    stmt.Exec(fmt.Sprintf("log-%d", i))',
  '}',
].join('\n')}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>Begin/Commit/Rollback管理事务</li>
              <li>预处理适合批量插入/更新</li>
            </ul>
          </div>
        )}
        {activeTab === 'orm' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">ORM与进阶</h2>
            <p>常用GORM库简化数据库操作：</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  'import (',
  '    "gorm.io/gorm"',
  '    "gorm.io/driver/mysql"',
  ')',
  '',
  'type User struct {',
  '    ID   uint',
  '    Name string',
  '    Age  int',
  '}',
  '',
  'db, _ := gorm.Open(mysql.Open(dsn), &gorm.Config{})',
  'db.AutoMigrate(&User{})',
  '',
  '// 新增',
  'db.Create(&User{Name: "Tom", Age: 20})',
  '',
  '// 查询',
  'var users []User',
  'db.Where("age > ?", 18).Find(&users)',
  '',
  '// 更新',
  'db.Model(&User{}).Where("name = ?", "Tom").Update("age", 21)',
  '',
  '// 删除',
  'db.Delete(&User{}, 1)',
].join('\n')}
            </pre>
            <ul className="list-disc pl-6 mt-2">
              <li>GORM支持模型迁移、链式查询、事务等</li>
              <li>适合中大型项目</li>
            </ul>
          </div>
        )}
        {activeTab === 'practice' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">例题与练习</h2>
            <p className="mb-2 font-semibold">例题1：实现用户注册与登录（原生SQL）</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '// 注册',
  'stmt, _ := db.Prepare("INSERT INTO users(name, password) VALUES(?, ?)")',
  'stmt.Exec("alice", "123456")',
  '',
  '// 登录',
  'var pwd string',
  'err := db.QueryRow("SELECT password FROM users WHERE name=?", "alice").Scan(&pwd)',
  'if pwd == "123456" {',
  '    fmt.Println("登录成功")',
  '} else {',
  '    fmt.Println("密码错误")',
  '}',
].join('\n')}
            </pre>
            <p className="mb-2 font-semibold">例题2：GORM实现分页查询</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  'var users []User',
  'db.Offset(10).Limit(10).Find(&users)',
].join('\n')}
            </pre>
            <p className="mb-2 font-semibold">练习：实现转账接口（事务）</p>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  'tx, _ := db.Begin()',
  'tx.Exec("UPDATE accounts SET balance=balance-100 WHERE id=1")',
  'tx.Exec("UPDATE accounts SET balance=balance+100 WHERE id=2")',
  'tx.Commit()',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'faq' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">常见问题</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><b>Q: 如何防止SQL注入？</b><br />A: 使用Prepare和参数化查询。</li>
              <li><b>Q: 连接池参数如何设置？</b><br />A: 用SetMaxOpenConns、SetMaxIdleConns等方法。</li>
              <li><b>Q: GORM和原生SQL如何选择？</b><br />A: 小项目用原生SQL，复杂业务推荐GORM。</li>
            </ul>
          </div>
        )}
        <div className="mt-8 flex justify-between">
          <a
            href="/study/go/rest"
            className="inline-flex items-center bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            上一页：RESTful API开发
          </a>
          <a
            href="/study/go/testing"
            className="inline-flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            下一页：测试与性能优化
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
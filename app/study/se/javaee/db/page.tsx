'use client';
import { useState } from 'react';

const tabs = [
  { key: 'overview', label: '概述' },
  { key: 'jdbc', label: 'JDBC' },
  { key: 'jpa', label: 'JPA' },
  { key: 'hibernate', label: 'Hibernate' },
  { key: 'example', label: '实用示例' },
];

export default function JavaEEDbPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 页面大标题 */}
      <h1 className="text-4xl font-bold mb-6">数据库访问技术</h1>

      {/* 下划线风格Tab栏 */}
      <div className="flex border-b mb-6 space-x-8">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-2 text-lg font-medium focus:outline-none transition-colors duration-200
              ${activeTab === tab.key
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-blue-500'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-8">
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">数据库访问技术概述</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">JavaEE中的数据持久化</h3>
              <p className="text-gray-700 leading-relaxed">
                数据库访问是企业级应用开发的重要组成部分。JavaEE提供了多种数据持久化技术，包括JDBC、JPA和Hibernate等，帮助开发者高效、安全地与关系型数据库进行交互。
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 p-5 rounded-lg">
                <h3 className="text-xl font-bold mb-3">常用技术</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• JDBC - Java数据库连接标准API</li>
                  <li>• JPA - Java持久化API，简化ORM开发</li>
                  <li>• Hibernate - 主流ORM框架，JPA实现之一</li>
                </ul>
              </div>
              <div className="bg-yellow-50 p-5 rounded-lg">
                <h3 className="text-xl font-bold mb-3">开发环境</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• 数据库（如MySQL、PostgreSQL等）</li>
                  <li>• JDBC驱动</li>
                  <li>• JPA/Hibernate依赖包</li>
                  <li>• 配置文件（如persistence.xml、hibernate.cfg.xml）</li>
                </ul>
              </div>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">技术对比</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><b>JDBC：</b> 直接操作SQL，灵活但代码量大，适合底层控制。</li>
                <li><b>JPA：</b> 标准化ORM，简化对象与表的映射，开发效率高。</li>
                <li><b>Hibernate：</b> 功能强大的ORM框架，实现了JPA规范，支持更多高级特性。</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'jdbc' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">JDBC基础</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">什么是JDBC？</h3>
              <p className="text-gray-700 leading-relaxed">
                JDBC（Java Database Connectivity）是Java访问关系型数据库的标准API。通过JDBC，开发者可以使用Java代码执行SQL语句，实现数据的增删改查。
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">JDBC基本流程</h3>
              <ol className="list-decimal pl-6 text-gray-700 space-y-1">
                <li>加载数据库驱动</li>
                <li>建立数据库连接</li>
                <li>创建Statement对象</li>
                <li>执行SQL语句</li>
                <li>处理结果集</li>
                <li>关闭资源</li>
              </ol>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">示例代码</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`// 导入JDBC包
import java.sql.*;

public class JdbcDemo {
    public static void main(String[] args) throws Exception {
        Class.forName("com.mysql.cj.jdbc.Driver");
        Connection conn = DriverManager.getConnection(
            "jdbc:mysql://localhost:3306/testdb", "root", "password");
        Statement stmt = conn.createStatement();
        ResultSet rs = stmt.executeQuery("SELECT * FROM users");
        while (rs.next()) {
            System.out.println(rs.getString("username"));
        }
        rs.close();
        stmt.close();
        conn.close();
    }
}`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'jpa' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">JPA简介</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">什么是JPA？</h3>
              <p className="text-gray-700 leading-relaxed">
                JPA（Java Persistence API）是Java官方提出的ORM（对象关系映射）标准。它通过注解或XML将Java对象与数据库表进行映射，极大简化了数据持久化开发。
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">JPA基本注解</h3>
              <ul className="space-y-2 text-gray-700">
                <li>@Entity：声明实体类</li>
                <li>@Table：指定表名</li>
                <li>@Id：主键</li>
                <li>@Column：字段映射</li>
                <li>@GeneratedValue：主键生成策略</li>
              </ul>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">示例代码</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "username")
    private String username;

    // getter/setter 省略
}`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'hibernate' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Hibernate简介</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">什么是Hibernate？</h3>
              <p className="text-gray-700 leading-relaxed">
                Hibernate是流行的Java ORM框架，实现了JPA规范，提供了更丰富的特性，如缓存、懒加载、查询语言（HQL）等，广泛应用于企业级开发。
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Hibernate配置</h3>
              <ul className="space-y-2 text-gray-700">
                <li>hibernate.cfg.xml 配置数据库连接和实体映射</li>
                <li>SessionFactory 管理会话</li>
                <li>HQL 查询语言</li>
              </ul>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">示例代码</h3>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
Session session = sessionFactory.openSession();
session.beginTransaction();
User user = new User();
user.setUsername("Tom");
session.save(user);
session.getTransaction().commit();
session.close();`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'example' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">实用示例</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">综合案例：用户注册</h3>
              <p className="text-gray-700 leading-relaxed">
                结合JDBC/JPA/Hibernate实现用户注册功能，包含数据校验、持久化和异常处理。
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">常见问题与优化</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 连接池的使用（如HikariCP、C3P0）</li>
                <li>• SQL注入防护</li>
                <li>• 性能调优（如懒加载、缓存）</li>
              </ul>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">参考资料</h3>
              <ul className="space-y-2 text-gray-700">
                <li><a href="https://docs.oracle.com/javase/tutorial/jdbc/" className="text-blue-600 underline" target="_blank">JDBC官方教程</a></li>
                <li><a href="https://jakarta.ee/specifications/persistence/" className="text-blue-600 underline" target="_blank">JPA规范</a></li>
                <li><a href="https://hibernate.org/orm/documentation/" className="text-blue-600 underline" target="_blank">Hibernate文档</a></li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="mt-10 flex justify-between">
        <a href="/study/se/javaee/web" className="px-4 py-2 text-blue-600 hover:text-blue-800">
          ← Web开发基础
        </a>
        <a
          href="/study/se/javaee/enterprise"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          企业级服务 →
        </a>
      </div>
    </div>
  );
} 
'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
  TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '软件工程',
  chapterTitle: '数据库访问技术',
  chapterNumber: 4,
  totalChapters: 17,
  subjectHref: '/study/se/javaee',
  prevChapter: { label: 'Web开发基础', href: '/study/se/javaee/web' },
  nextChapter: { label: '企业级服务', href: '/study/se/javaee/enterprise' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: '概述',
    left: (
      <div className="space-y-4">
        <PageTitle>数据库访问技术概述</PageTitle>
        <BookParagraph>数据库访问是企业级应用开发的重要组成部分。JavaEE提供了多种数据持久化技术，包括JDBC、JPA和Hibernate等，帮助开发者高效、安全地与关系型数据库进行交互。</BookParagraph>
        <h3 className="text-sm font-medium text-ink mt-4">常用技术</h3>
        <BookList items={[
          'JDBC：Java数据库连接标准API',
          'JPA：Java持久化API，简化ORM开发',
          'Hibernate：主流ORM框架，JPA实现之一',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">开发环境</h3>
        <BookList items={[
          '数据库（如MySQL、PostgreSQL等）',
          'JDBC驱动',
          'JPA/Hibernate依赖包',
          '配置文件（如persistence.xml、hibernate.cfg.xml）',
        ]} />
        <h3 className="text-sm font-medium text-ink mt-4">技术对比</h3>
        <BookList items={[
          'JDBC：直接操作SQL，灵活但代码量大，适合底层控制',
          'JPA：标准化ORM，简化对象与表的映射，开发效率高',
          'Hibernate：功能强大的ORM框架，实现了JPA规范，支持更多高级特性',
        ]} />
        <TagGrid items={['JDBC', 'JPA', 'Hibernate', 'ORM', '持久化']} />
      </div>
    ),
  },
  {
    label: 'JDBC',
    left: (
      <div className="space-y-4">
        <PageTitle>JDBC基础</PageTitle>
        <BookParagraph>JDBC（Java Database Connectivity）是Java访问关系型数据库的标准API。通过JDBC，开发者可以使用Java代码执行SQL语句，实现数据的增删改查。</BookParagraph>
        <h3 className="text-sm font-medium text-ink mt-4">JDBC基本流程</h3>
        <BookList items={[
          '加载数据库驱动',
          '建立数据库连接',
          '创建Statement对象',
          '执行SQL语句',
          '处理结果集',
          '关闭资源',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookCode language="java" code={`// 导入JDBC包
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
}`} />
        <BookAlert type="info" message="JDBC 4.0+ 支持自动加载驱动（通过SPI机制），不再需要显式调用 Class.forName()。建议使用PreparedStatement防止SQL注入。" />
        <TagGrid items={['Connection', 'Statement', 'ResultSet', 'PreparedStatement', '连接池']} />
      </div>
    ),
  },
  {
    label: 'JPA',
    left: (
      <div className="space-y-4">
        <PageTitle>JPA（Java Persistence API）</PageTitle>
        <BookParagraph>JPA是Java官方提出的ORM（对象关系映射）标准。它通过注解或XML将Java对象与数据库表进行映射，极大简化了数据持久化开发。</BookParagraph>
        <h3 className="text-sm font-medium text-ink mt-4">JPA基本注解</h3>
        <BookList items={[
          '@Entity：声明实体类',
          '@Table：指定表名',
          '@Id：主键',
          '@Column：字段映射',
          '@GeneratedValue：主键生成策略',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookCode language="java" code={`@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "username")
    private String username;

    // getter/setter 省略
}`} />
        <BookAlert type="info" message="JPA支持多种主键生成策略：AUTO、IDENTITY、SEQUENCE、TABLE。Spring Data JPA进一步简化了数据访问层的开发。" />
        <TagGrid items={['@Entity', '@Id', '@Column', 'EntityManager', 'JPQL']} />
      </div>
    ),
  },
  {
    label: 'Hibernate',
    left: (
      <div className="space-y-4">
        <PageTitle>Hibernate框架</PageTitle>
        <BookParagraph>Hibernate是流行的Java ORM框架，实现了JPA规范，提供了更丰富的特性，如缓存、懒加载、查询语言（HQL）等，广泛应用于企业级开发。</BookParagraph>
        <BookCode language="java" code={`SessionFactory sessionFactory = new Configuration()
    .configure().buildSessionFactory();
Session session = sessionFactory.openSession();
session.beginTransaction();
User user = new User();
user.setUsername("Tom");
session.save(user);
session.getTransaction().commit();
session.close();`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">Hibernate配置要点</h3>
        <BookList items={[
          'hibernate.cfg.xml 配置数据库连接和实体映射',
          'SessionFactory 管理会话',
          'HQL 查询语言',
          '支持一级缓存和二级缓存',
          '支持懒加载（Lazy Loading）',
        ]} />
        <BookAlert type="success" message="Hibernate 6.x 完全实现了 Jakarta Persistence 3.x 规范。使用 Hibernate Validate 可以方便地进行数据校验。" />
        <TagGrid items={['SessionFactory', 'HQL', 'Criteria', '缓存', '懒加载']} />
      </div>
    ),
  },
  {
    label: '实用示例',
    left: (
      <div className="space-y-4">
        <PageTitle>综合案例：用户注册</PageTitle>
        <BookParagraph>结合JDBC/JPA/Hibernate实现用户注册功能，包含数据校验、持久化和异常处理。</BookParagraph>
        <h3 className="text-sm font-medium text-ink mt-4">常见问题与优化</h3>
        <BookList items={[
          '连接池的使用（如HikariCP、C3P0）',
          'SQL注入防护',
          '性能调优（如懒加载、缓存）',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink mt-4">参考资源</h3>
        <BookList items={[
          'JDBC官方教程：docs.oracle.com/javase/tutorial/jdbc/',
          'JPA规范：jakarta.ee/specifications/persistence/',
          'Hibernate文档：hibernate.org/orm/documentation/',
        ]} />
        <BookAlert type="info" message="实际开发中，推荐使用 Spring Data JPA + HikariCP 的组合，既获得JPA的开发效率，又保证连接池的性能。" />
        <TagGrid items={['HikariCP', '连接池', 'SQL注入', '性能优化']} />
      </div>
    ),
  },
]

export default function JavaEEDbPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

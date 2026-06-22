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
  chapterTitle: '实战项目与案例',
  chapterNumber: 10,
  totalChapters: 10,
  subjectHref: '/study/se/dotnet',
  prevChapter: { label: '测试与调试', href: '/study/se/dotnet/testing' },
  theme: THEMES.software,
}

const SPREADS = [
  {
    label: '项目开发',
    left: (
      <div className="space-y-4">
        <PageTitle>项目开发流程</PageTitle>
        <BookParagraph>一个完整的.NET项目从需求到上线需要经过多个阶段。</BookParagraph>
        <BookList items={[
          '需求分析与原型设计——明确业务需求和功能范围',
          '架构设计与技术选型——选择合适的设计模式和技术栈',
          '代码开发与测试——遵循编码规范，编写单元测试',
          '代码审查与重构——团队代码审查，持续优化质量',
          '部署上线与运维——自动化部署，监控和运维保障',
        ]} />
        <BookAlert type="info" message="建议使用 Git 进行版本管理，采用 GitFlow 或 Trunk-Based 分支策略" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>综合案例：Todo API</PageTitle>
        <BookParagraph>一个完整的Todo List API，展示CRUD操作的实现。</BookParagraph>
        <BookCode language="csharp" showLineNumbers code={`[ApiController]
[Route("api/todos")]
public class TodoController : ControllerBase {
    private readonly AppDbContext _db;

    public TodoController(AppDbContext db) {
        _db = db;
    }

    [HttpGet]
    public IActionResult GetAll()
        => Ok(_db.Todos.ToList());

    [HttpPost]
    public IActionResult AddTodo([FromBody] Todo todo) {
        _db.Todos.Add(todo);
        _db.SaveChanges();
        return Created($"/api/todos/{todo.Id}", todo);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, Todo todo) {
        var existing = _db.Todos.Find(id);
        if (existing == null) return NotFound();
        existing.Title = todo.Title;
        existing.IsDone = todo.IsDone;
        _db.SaveChanges();
        return Ok(existing);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id) {
        var todo = _db.Todos.Find(id);
        if (todo == null) return NotFound();
        _db.Todos.Remove(todo);
        _db.SaveChanges();
        return NoContent();
    }
}`} />
        <TagGrid items={['CRUD', 'API', 'EF Core', 'REST', '实战', '项目']} />
      </div>
    ),
  },
  {
    label: '面试准备',
    left: (
      <div className="space-y-4">
        <PageTitle>常见问题与面试题</PageTitle>
        <BookParagraph>以下是一些常见的.NET开发面试题，帮助巩固所学知识。</BookParagraph>
        <BookList items={[
          'EF Core与Dapper的区别？——ORM vs 轻量级映射，性能 vs 便利性',
          '如何实现依赖注入？——通过构造函数注入，注册到IServiceCollection',
          '.NET如何做API安全？——JWT认证、HTTPS、CORS、输入校验',
          '值类型和引用类型的区别？——栈 vs 堆，值传递 vs 引用传递',
          'async/await 的工作原理？——状态机机制，非阻塞等待',
          '中间件的执行顺序？——按注册顺序形成管道，每个中间件可决定是否调用下一个',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>学习建议</PageTitle>
        <BookParagraph>掌握.NET开发需要持续学习和实践，以下是一些建议：</BookParagraph>
        <BookList items={[
          '打牢基础——深入学习C#语言特性和.NET运行时原理',
          '动手实践——参与开源项目或自己动手构建完整项目',
          '跟进行业动态——关注 .NET 官方博客和社区动态',
          '阅读源码——阅读优秀开源项目的源码，学习设计模式',
          '软技能提升——代码审查、技术文档撰写、团队协作',
        ]} />
        <BookAlert type="success" message="学完本课程后，你已经掌握了.NET开发的基础知识。继续实践，不断进步！" />
      </div>
    ),
  },
]

export default function DotnetProjectsPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

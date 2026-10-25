'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, BookParagraph, BookCode, BookAlert, BookList, TagGrid } from '@shared/components/ui/book/BookContent'

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
<BookParagraph>{"原TodoController保留CRUD教学目的，依赖Todo实体、AppDbContext、服务注册和数据库迁移。新增内容补输入输出契约、授权、并发与交付验证；不把同步数据库调用和无归属过滤的简化例直接当生产方案。"}</BookParagraph>
        <BookParagraph>一个完整的.NET项目从需求到上线需要经过多个阶段。</BookParagraph>
<BookParagraph>{"功能清单应变成请求和结果：新增标题如何校验、返回何种状态、资源由谁拥有、重复请求如何处理。每项都配固定样本和失败路径，再决定架构与依赖；CRUD方法齐全不等于API可供客户端可靠使用。"}</BookParagraph>
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
<BookParagraph>{"控制器片段依赖实体、上下文、服务注册与迁移，且需在数据库查询中加归属范围。客户端不能自由提交OwnerId，修改应有版本冲突策略。先用两位用户和三条任务手算允许结果，再进行集成验证，防止单用户演示掩盖越权和覆盖。"}</BookParagraph>
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
{ label: "把Todo API定义成一份契约", left: (<div className="space-y-4">
<PageTitle>{"把Todo API定义成一份契约"}</PageTitle>
<BookParagraph>{"首版提供新增、分页读取、完成切换和删除，任务包含稳定id、标题、拥有者、创建时刻与版本。标题一到五十个规范化字符，OwnerId来自可信身份，不能由请求随意指定。每个端点写明输入、成功状态、失败与重试语义。例如新增成功返回201与可读取位置，找不到返回404，旧版本修改返回409。没有这些约定，控制器即使具备CRUD方法也无法保证客户端可靠协作。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"推演一：创建任务的端到端链路"}</PageTitle>
<BookParagraph>{"客户端提交标题与操作号，路由匹配后绑定DTO，身份验证建立用户，业务层校验并查询操作号是否已处理，数据库事务保存任务与操作结果，响应返回资源地址。响应丢失后重试同一操作号应返回同一业务结果，而不是重复创建。幂等范围要明确绑定用户和请求内容；同操作号但标题变化应拒绝或按契约处理，不能默默覆盖，日志用请求号追踪各次尝试。"}</BookParagraph>
</div>) },
{ label: "把需求映射到持久化不变量", left: (<div className="space-y-4">
<PageTitle>{"把需求映射到持久化不变量"}</PageTitle>
<BookParagraph>{"任务id唯一只解决记录身份，操作号唯一解决请求重放，版本解决并发覆盖，归属字段支持授权过滤，它们各有职责。下表把故障与不变量对应起来，便于审查数据库约束和服务实现。应用内先查再插入仍存在竞态，需要数据库约束承担最终保护，再把冲突转换成稳定响应。不能把一个静态字典当作多实例共享防重状态，重启或扩容后它不会自动保留。"}</BookParagraph>
<div className="overflow-x-auto"><table className="w-full text-sm border-collapse"><thead><tr><th className="border-b p-2 text-left">{"不变量"}</th><th className="border-b p-2 text-left">{"防止的故障"}</th><th className="border-b p-2 text-left">{"实现证据"}</th></tr></thead><tbody><tr><td className="border-b p-2 align-top">{"业务id唯一"}</td><td className="border-b p-2 align-top">{"记录身份混乱"}</td><td className="border-b p-2 align-top">{"主键与查询契约"}</td></tr><tr><td className="border-b p-2 align-top">{"用户+操作号唯一"}</td><td className="border-b p-2 align-top">{"响应丢失后重复创建"}</td><td className="border-b p-2 align-top">{"事务和唯一约束"}</td></tr><tr><td className="border-b p-2 align-top">{"版本匹配"}</td><td className="border-b p-2 align-top">{"旧数据静默覆盖"}</td><td className="border-b p-2 align-top">{"条件更新与409"}</td></tr><tr><td className="border-b p-2 align-top">{"归属过滤"}</td><td className="border-b p-2 align-top">{"跨用户读取或删除"}</td><td className="border-b p-2 align-top">{"授权规则与拒绝测试"}</td></tr></tbody></table></div>
</div>), right: (<div className="space-y-4">
<PageTitle>{"可运行：请求重放与内容冲突模型"}</PageTitle>
<BookParagraph>{"以下Python 3代码在内存模拟同一用户操作号，输出1和1，断言只有一条任务。它不是HTTP服务，也不保证真实并发原子性；生产要用数据库事务与唯一约束。代码同时检查同号不同内容，帮助固定幂等契约。把此规则转成C#单元测试后，再用两个并发集成请求验证真实存储能维持不变量，不能只测试串行模型就宣称解决所有竞态。"}</BookParagraph>
<BookCode language="python" showLineNumbers code={"operations = {}\ntasks = []\ndef create(user, operation, title):\n    key = (user, operation)\n    if key in operations:\n        previous_title, task_id = operations[key]\n        if previous_title != title:\n            raise ValueError('operation conflict')\n        return task_id\n    task_id = len(tasks) + 1\n    tasks.append((task_id, user, title))\n    operations[key] = (title, task_id)\n    return task_id\nprint(create('u1', 'op1', 'Review'))\nprint(create('u1', 'op1', 'Review'))\nassert len(tasks) == 1"} />
</div>) },
{ label: "推演二：完成切换与旧版本冲突", left: (<div className="space-y-4">
<PageTitle>{"推演二：完成切换与旧版本冲突"}</PageTitle>
<BookParagraph>{"两个设备都看到未完成、版本3，设备A完成后版本4，设备B基于版本3修改标题。无条件覆盖整个实体可能把完成状态重新设为false。请求DTO只接受本次允许修改的字段，并携带旧版本，更新条件匹配失败时返回冲突，让客户端重新加载。PUT整体替换与PATCH部分修改有不同契约，不能仅换HTTP方法名就假设语义正确；失败响应应告诉客户端可以如何恢复。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"列表与删除同样需要授权"}</PageTitle>
<BookParagraph>{"读取列表先按当前用户或租户过滤，再按稳定顺序分页；删除也要在相同授权范围内定位资源。先全表Find再把实体返回，会绕过归属边界。删除是否幂等、重复删除返回204还是404可由契约选择，但要一致并避免泄露其他用户信息。删除任务和关联附件时要考虑事务与外部存储清理，不能因为数据库行不存在就保证磁盘或对象存储副本已经删除。"}</BookParagraph>
</div>) },
{ label: "练习：以故障场景验收项目", left: (<div className="space-y-4">
<PageTitle>{"练习：以故障场景验收项目"}</PageTitle>
<BookParagraph>{"准备两位用户、三条任务，验证合法创建、空标题、重复操作、其他用户读取、旧版本修改、数据库失败和进程重启。验收：无越权、无意外重复、无静默丢失更新，错误状态可供客户端判断，201地址有效，日志不含令牌或任务明文。参考思路：每个场景先手写请求响应与预期行数，再执行集成测试，使用独立数据库隔离用例，不靠人工顺序确保测试通过。"}</BookParagraph>
</div>), right: (<div className="space-y-4">
<PageTitle>{"交付说明要覆盖运行与恢复"}</PageTitle>
<BookParagraph>{"README包括SDK选择、目标框架、包依赖、数据库建立、配置注入、启动地址和验证命令；部署说明记录产物标识、迁移与回滚前提。功能未包含刷新令牌、跨设备冲突合并或附件清理时明确列出限制。面试复盘应能追踪一次请求从身份到数据库的过程，指出失败在事务前还是后、可否重试及如何判定。技术栈列表只能解释采用了什么，不能代替对业务一致性的证明。"}</BookParagraph>
<BookList items={[<a key="https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-web-api" href="https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-web-api" target="_blank" rel="noopener noreferrer" className="underline">{"ASP.NET Core控制器API教程"}</a>, <a key="https://learn.microsoft.com/en-us/ef/core/saving/concurrency" href="https://learn.microsoft.com/en-us/ef/core/saving/concurrency" target="_blank" rel="noopener noreferrer" className="underline">{"EF Core并发控制"}</a>]} />
</div>) },
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

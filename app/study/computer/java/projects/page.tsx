'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, BookParagraph, BookCode, BookAlert, BookList, TagGrid } from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'Java 编程', chapterTitle: '项目实战', chapterNumber: 10, totalChapters: 10,
  subjectHref: '/study/computer/java',
  prevChapter: { label: '网络编程', href: '/study/computer/java/network' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '项目介绍',
    left: (
      <div className="space-y-4">
        <PageTitle>通讯录管理系统</PageTitle>
        <BookParagraph>综合运用 Java I/O、集合、面向对象等知识，实现一个命令行通讯录管理系统。支持联系人增删改查，数据持久化到文件。</BookParagraph>
        <BookCode language="java" showLineNumbers code={`public class Contact implements Serializable {
    private String name;
    private String phone;
    private String email;
    private String group;

    public Contact(String name, String phone) {
        this.name = name;
        this.phone = phone;
    }
    // getter/setter...
}`} />
        <BookAlert type="info" message="项目目标：实现一个完整的 CRUD 应用。通过这个项目巩固 Java 核心知识：OOP、集合、IO、异常处理" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>功能设计</PageTitle>
        <BookList items={[
          '添加联系人（姓名、电话、邮箱、分组）',
          '显示所有联系人列表',
          '按姓名搜索联系人',
          '修改联系人信息',
          '删除联系人',
          '数据持久化到文件（序列化）',
        ]} />
      </div>
    ),
  },
  {
    label: '项目思路',
    left: (
      <div className="space-y-4">
        <PageTitle>更多项目方向</PageTitle>
        <div className="space-y-3">
          {[
            { title: '简易计算器', desc: 'Swing/JavaFX 图形界面，支持表达式计算' },
            { title: '文件搜索工具', desc: '递归搜索文件，支持通配符和正则匹配' },
            { title: '文本编辑器', desc: '基本的文本编辑功能，支持打开和保存文件' },
            { title: '聊天室应用', desc: 'Socket 多线程聊天室，支持群聊和私聊' },
          ].map((item, i) => (
            <div key={i} className="flex gap-3 p-2.5 rounded-md bg-paper-200/60">
              <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold"
                style={{ background: `${THEMES.computer.accent}15`, color: THEMES.computer.accent }}>{i + 1}</span>
              <div>
                <h3 className="text-sm font-medium text-ink">{item.title}</h3>
                <p className="text-xs text-ink-light">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>学习建议</PageTitle>
        <BookList items={[
          '先设计好类结构再开始编码',
          '分模块实现，逐步集成',
          '编写单元测试验证功能',
          '使用 Git 管理代码版本',
          '完成后再重构优化代码',
        ]} />
        <BookAlert type="info" message="与 C++ 相比，Java 更注重面向对象设计。写代码前先思考类的职责划分和接口设计" />
        <TagGrid items={['项目实战', 'CRUD', '文件IO', 'OOP', '设计模式']} />
      </div>
    ),
  },
]

export default function ProjectsPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

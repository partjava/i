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
  subject: 'Java 编程',
  chapterTitle: '编程入门',
  chapterNumber: 1,
  totalChapters: 10,
  subjectHref: '/study/computer/java',
  nextChapter: { label: '基础语法', href: '/study/computer/java/basic' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: 'Java简介',
    left: (
      <div className="space-y-4">
        <PageTitle>Java 简介与开发环境</PageTitle>
        <BookParagraph>Java是一门广泛应用于企业级开发、移动端、Web和大数据等领域的面向对象编程语言。其跨平台、稳定、安全的特性使其成为全球最受欢迎的编程语言之一。</BookParagraph>
        <BookAlert type="info" message="Java 的核心优势：跨平台（一次编写到处运行）、自动内存管理（GC）、丰富的生态系统、强大的社区支持" />
        <h3 className="text-sm font-medium text-ink mt-4">开发环境搭建</h3>
        <BookList items={[
          '下载并安装 JDK（推荐 Oracle JDK 或 OpenJDK 17+）',
          '配置环境变量 JAVA_HOME 和 Path',
          '推荐 IDE：IntelliJ IDEA、Eclipse、VS Code',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>验证安装</PageTitle>
        <BookCode language="bash" showLineNumbers code={`# 检查Java安装
java -version
# 输出示例
# java version "17.0.2" 2022-01-18

# 检查编译器
javac -version

# 检查 Java Home
echo $JAVA_HOME  # Mac/Linux
echo %JAVA_HOME% # Windows`} />
        <BookAlert type="success" message="看到版本号输出说明 JDK 安装成功。如果提示找不到命令，请检查环境变量配置" />
      </div>
    ),
  },
  {
    label: '第一个程序',
    left: (
      <div className="space-y-4">
        <PageTitle>HelloWorld 程序</PageTitle>
        <BookParagraph>Java程序的基本结构由类、主方法（main）组成。每个Java程序都需要一个入口点，即 main 方法。</BookParagraph>
        <BookCode language="java" showLineNumbers code={`public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}`} />
        <h3 className="text-sm font-medium text-ink mt-2">编译与运行</h3>
        <BookCode language="bash" showLineNumbers maxLines={0} code={`javac HelloWorld.java
java HelloWorld`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>程序结构详解</PageTitle>
        <BookParagraph>理解 Java 程序的基本结构是入门的第一步：</BookParagraph>
        <BookList items={[
          'public class — 类定义，类名必须与文件名一致',
          'public static void main — 主方法，程序的入口',
          'String[] args — 命令行参数',
          'System.out.println — 控制台输出',
          '每条语句以分号 ; 结尾',
        ]} />
        <BookAlert type="warning" message="Java 是大小写敏感的语言，HelloWorld 和 helloworld 是不同的。类名使用帕斯卡命名法（首字母大写）" />
        <TagGrid items={['JDK', 'JRE', 'JVM', '编译', '运行', 'main 方法']} />
      </div>
    ),
  },
  {
    label: '练习例题',
    left: (
      <div className="space-y-4">
        <PageTitle>课后练习</PageTitle>
        <div className="p-3 bg-paper-200/80 rounded-md border border-paper-300">
          <p className="text-sm text-ink font-medium mb-1">练习题</p>
          <BookList items={[
            '编写程序输出你的姓名和年龄',
            '修改 HelloWorld 输出多行文字',
            '尝试在代码中添加中文注释',
            '使用 System.out.printf 格式化输出',
          ]} />
        </div>
        <BookAlert type="info" message="动手实践是最好的学习方式。尝试修改代码，观察输出变化，理解每行代码的作用" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>参考代码</PageTitle>
        <BookCode language="java" showLineNumbers code={`public class MyInfo {
    public static void main(String[] args) {
        // 输出个人信息
        System.out.println("姓名: 张三");
        System.out.println("年龄: 20");
        System.out.println("爱好: 编程");

        // 格式化输出
        System.out.printf("圆周率: %.2f%n", 3.14159);
    }
}`} />
        <BookAlert type="success" message={'运行结果：输出个人信息和格式化后的圆周率 3.14'} />
      </div>
    ),
  },
]

export default function JavaIntroPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

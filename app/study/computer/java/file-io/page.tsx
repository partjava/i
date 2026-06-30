'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import { PageTitle, BookParagraph, BookCode, BookAlert, BookList, TagGrid } from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'Java 编程', chapterTitle: '文件与IO', chapterNumber: 7, totalChapters: 10,
  subjectHref: '/study/computer/java',
  prevChapter: { label: '异常处理', href: '/study/computer/java/exceptions' },
  nextChapter: { label: '多线程与并发', href: '/study/computer/java/thread' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '文件读写',
    left: (
      <div className="space-y-4">
        <PageTitle>字节流与字符流</PageTitle>
        <BookParagraph>Java 的 IO 体系分为字节流和字符流两大类。字节流处理二进制数据，字符流处理文本数据。</BookParagraph>
        <BookCode language="java" showLineNumbers code={`// 字符流（文本）
try (BufferedReader reader = new BufferedReader(
        new FileReader("input.txt"))) {
    String line;
    while ((line = reader.readLine()) != null) {
        System.out.println(line);
    }
}

try (BufferedWriter writer = new BufferedWriter(
        new FileWriter("output.txt"))) {
    writer.write("Hello World");
    writer.newLine();
}

// 字节流（二进制）
try (FileInputStream in = new FileInputStream("photo.jpg");
     FileOutputStream out = new FileOutputStream("copy.jpg")) {
    byte[] buffer = new byte[1024];
    int len;
    while ((len = in.read(buffer)) != -1) {
        out.write(buffer, 0, len);
    }
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>NIO 与 Files</PageTitle>
        <BookCode language="java" showLineNumbers code={`import java.nio.file.*;

// Files 工具类（Java 7+）
String content = Files.readString(
    Path.of("input.txt"));
System.out.println(content);

Files.writeString(
    Path.of("output.txt"),
    "Hello NIO",
    StandardOpenOption.CREATE);

// 目录操作
Files.list(Path.of("."))
    .forEach(System.out::println);

// 文件属性
System.out.println(Files.size(Path.of("file.txt")));
System.out.println(Files.getLastModifiedTime(Path.of("file.txt")));

// 复制/移动
Files.copy(Path.of("src.txt"), Path.of("dst.txt"),
    StandardCopyOption.REPLACE_EXISTING);
Files.move(Path.of("old.txt"), Path.of("new.txt"));`} />
        <BookAlert type="info" message="NIO 的 Files 类简化了文件操作。优先使用 NIO 而非传统的 File 类" />
      </div>
    ),
  },
  {
    label: '序列化',
    left: (
      <div className="space-y-4">
        <PageTitle>对象序列化</PageTitle>
        <BookCode language="java" showLineNumbers code={`// 实现 Serializable
public class Student implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private transient int age;  // 不序列化
    // getter/setter...
}

// 序列化
try (ObjectOutputStream oos = new ObjectOutputStream(
        new FileOutputStream("student.dat"))) {
    oos.writeObject(new Student("Alice", 20));
}

// 反序列化
try (ObjectInputStream ois = new ObjectInputStream(
        new FileInputStream("student.dat"))) {
    Student s = (Student) ois.readObject();
    System.out.println(s.getName());
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>IO 体系总结</PageTitle>
        <BookList items={[
          'InputStream/OutputStream — 字节流抽象基类',
          'Reader/Writer — 字符流抽象基类',
          'BufferedInputStream — 带缓冲提高性能',
          'InputStreamReader — 字节转字符桥梁',
          'PrintWriter — 格式化文本输出',
          'Files（NIO）— 简化文件操作',
        ]} />
        <BookAlert type="info" message="使用 try-with-resources 自动关闭资源，避免手动 close 遗漏导致资源泄漏" />
        <TagGrid items={['File', 'Stream', 'Reader', 'Writer', 'NIO', '序列化']} />
      </div>
    ),
  },
]

export default function FileIOPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import { PageTitle, BookParagraph, BookCode, BookAlert, BookList, TagGrid } from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'Java 编程', chapterTitle: '异常处理', chapterNumber: 6, totalChapters: 10,
  subjectHref: '/study/computer/java',
  prevChapter: { label: '常用类与集合', href: '/study/computer/java/collections' },
  nextChapter: { label: '文件与IO', href: '/study/computer/java/file-io' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '异常机制',
    left: (
      <div className="space-y-4">
        <PageTitle>try-catch-finally</PageTitle>
        <BookParagraph>异常处理是 Java 程序健壮性的重要保障。通过 try-catch 机制，程序可以从异常状态中恢复并继续执行。</BookParagraph>
        <BookCode language="java" showLineNumbers code={`try {
    int result = 10 / 0;  // 抛出异常
    System.out.println("不会执行");
} catch (ArithmeticException e) {
    System.out.println("除数不能为零");
    System.out.println(e.getMessage());
} catch (Exception e) {
    System.out.println("其他错误: " + e);
} finally {
    System.out.println("总是执行");
}

// try-with-resources（自动关闭资源）
try (BufferedReader br = new BufferedReader(
        new FileReader("file.txt"))) {
    System.out.println(br.readLine());
} catch (IOException e) {
    e.printStackTrace();
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>异常类型</PageTitle>
        <BookCode language="java" showLineNumbers code={`// 检查型异常（必须处理）
try {
    Thread.sleep(1000);
} catch (InterruptedException e) {
    Thread.currentThread().interrupt();
}

// 非检查型异常（可选处理）
int[] arr = new int[5];
arr[10] = 1;  // ArrayIndexOutOfBoundsException

// 抛出异常
public void withdraw(double amount) {
    if (amount > balance) {
        throw new IllegalArgumentException(
            "余额不足");
    }
    balance -= amount;
}

// throws 声明
public void readFile() throws IOException {
    Files.readString(Path.of("test.txt"));
}`} />
      </div>
    ),
  },
  {
    label: '自定义异常',
    left: (
      <div className="space-y-4">
        <PageTitle>自定义异常类</PageTitle>
        <BookCode language="java" showLineNumbers code={`public class BankException extends Exception {
    private double balance;
    private double amount;

    public BankException(String msg, double b, double a) {
        super(msg);
        this.balance = b;
        this.amount = a;
    }

    public double getBalance() { return balance; }
}

// 使用
public void transfer(double amount) throws BankException {
    if (amount > balance)
        throw new BankException("余额不足", balance, amount);
    balance -= amount;
}

// 调用
try {
    account.transfer(1000);
} catch (BankException e) {
    System.out.println("余额: " + e.getBalance());
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>最佳实践</PageTitle>
        <BookList items={[
          '异常应用于异常情况，不用做流程控制',
          '捕获具体异常而非通用的 Exception',
          '在恰当层级处理异常，不要吞异常',
          '使用 finally 或 try-with-resources 释放资源',
          '自定义异常继承 Exception 或 RuntimeException',
          '记录异常日志以便排查问题',
        ]} />
        <BookAlert type="warning" message="不要捕获异常后什么都不做，这会导致问题难以排查。至少应该打印日志或重新抛出" />
        <TagGrid items={['try-catch', 'finally', 'throws', 'throw', 'Exception', 'try-with-resources']} />
      </div>
    ),
  },
]

export default function ExceptionsPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import { PageTitle, BookParagraph, BookCode, BookAlert, BookList, TagGrid } from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'Java 编程', chapterTitle: '流程控制', chapterNumber: 3, totalChapters: 10,
  subjectHref: '/study/computer/java',
  prevChapter: { label: '基础语法', href: '/study/computer/java/basic' },
  nextChapter: { label: '面向对象', href: '/study/computer/java/oop' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '条件语句',
    left: (
      <div className="space-y-4">
        <PageTitle>if-else 语句</PageTitle>
        <BookParagraph>条件语句让程序根据不同的条件执行不同的分支，是编程逻辑的基础。</BookParagraph>
        <BookCode language="java" showLineNumbers code={`int score = 85;
if (score >= 90) System.out.println("优秀");
else if (score >= 80) System.out.println("良好");
else if (score >= 60) System.out.println("及格");
else System.out.println("不及格");

String result = (score >= 60) ? "通过" : "不通过";`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>switch 语句</PageTitle>
        <BookCode language="java" showLineNumbers code={`int day = 3;
switch (day) {
    case 1: System.out.println("周一"); break;
    case 2: System.out.println("周二"); break;
    case 3: System.out.println("周三"); break;
    default: System.out.println("周末");
}

// Java 14+ switch 表达式
String result = switch (day) {
    case 1,2,3,4,5 -> "工作日";
    case 6,7 -> "周末";
    default -> "无效";
};`} />
      </div>
    ),
  },
  {
    label: '循环',
    left: (
      <div className="space-y-4">
        <PageTitle>for / while</PageTitle>
        <BookCode language="java" showLineNumbers code={`for (int i = 0; i < 5; i++)
    System.out.print(i + " ");

int[] arr = {1, 2, 3, 4, 5};
for (int num : arr) System.out.print(num + " ");

int count = 0;
while (count < 5) {
    System.out.print(count + " ");
    count++;
}

do {
    System.out.print("至少执行一次");
} while (false);`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>break / continue</PageTitle>
        <BookCode language="java" showLineNumbers code={`for (int i = 1; i <= 10; i++) {
    if (i == 5) break;      // 1 2 3 4
    System.out.print(i + " ");
}

for (int i = 1; i <= 5; i++) {
    if (i == 3) continue;   // 1 2 4 5
    System.out.print(i + " ");
}

// 标签 break
outer:
for (int i = 0; i < 3; i++)
    for (int j = 0; j < 3; j++)
        if (i == 1 && j == 1) break outer;`} />
      </div>
    ),
  },
  {
    label: '练习',
    left: (<div className="space-y-4"><PageTitle>猜数字游戏</PageTitle><BookList items={['随机1-100', '用户猜', '提示大小', '记录次数']} /><TagGrid items={['循环', '条件', '随机数']} /></div>),
    right: (
      <div className="space-y-4">
        <PageTitle>参考代码</PageTitle>
        <BookCode language="java" showLineNumbers code={`import java.util.*;
public class GuessGame {
    public static void main(String[] args) {
        int secret = new Random().nextInt(100) + 1;
        Scanner sc = new Scanner(System.in);
        int guess, tries = 0;
        do {
            System.out.print("猜一个数: ");
            guess = sc.nextInt(); tries++;
            if (guess > secret) System.out.println("太大");
            else if (guess < secret) System.out.println("太小");
        } while (guess != secret);
        System.out.println("共 " + tries + " 次");
    }
}`} />
      </div>
    ),
  },
]

export default function JavaControlPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

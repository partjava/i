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
  subject: 'Java 编程',
  chapterTitle: '基础语法',
  chapterNumber: 2,
  totalChapters: 10,
  subjectHref: '/study/computer/java',
  prevChapter: { label: '编程入门', href: '/study/computer/java/intro' },
  nextChapter: { label: '流程控制', href: '/study/computer/java/control' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '变量与类型',
    left: (
      <div className="space-y-4">
        <PageTitle>变量与数据类型</PageTitle>
        <BookParagraph>Java是静态类型语言，变量在使用前必须声明类型。Java提供了 byte、short、int、long、float、double、char、boolean 八种基本类型。</BookParagraph>
        <BookCode language="java" showLineNumbers code={`int age = 25;
long money = 100000L;    // 后缀L
float pi = 3.14f;        // 后缀f
double price = 99.99;
char grade = 'A';
boolean isOk = true;
String name = "Alice";   // 引用类型
final double PI = 3.14;  // 常量`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>运算符</PageTitle>
        <BookCode language="java" showLineNumbers code={`int a = 10, b = 3;
System.out.println(a + b);   // 13
System.out.println(a / b);   // 3（整数除法）
System.out.println(a % b);   // 1
System.out.println(a++);     // 10
System.out.println(++a);    // 12

// 类型转换
double d = a;        // 隐式
int i = (int) 3.14;  // 显式→3`} />
        <BookAlert type="info" message="Java 是强类型语言。整数除法截断小数，浮点数注意精度问题" />
      </div>
    ),
  },
  {
    label: '字符串与数组',
    left: (
      <div className="space-y-4">
        <PageTitle>字符串</PageTitle>
        <BookCode language="java" showLineNumbers code={`String s = "Hello Java";
System.out.println(s.length());      // 10
System.out.println(s.substring(6));  // Java
System.out.println(s.indexOf("J"));  // 6
System.out.println(s.toUpperCase());
System.out.println(s.replace("Java", "World"));

// StringBuilder 高效拼接
StringBuilder sb = new StringBuilder();
sb.append("Hello").append(" ").append("Java");
System.out.println(sb.toString());`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>数组</PageTitle>
        <BookCode language="java" showLineNumbers code={`int[] arr = {1, 2, 3, 4, 5};
for (int i = 0; i < arr.length; i++) {
    System.out.print(arr[i] + " ");
}
for (int num : arr) {
    System.out.print(num + " ");
}

// 多维数组
int[][] matrix = {{1, 2}, {3, 4}};
System.out.println(matrix[0][1]);  // 2

// 工具类
import java.util.Arrays;
Arrays.sort(arr);
System.out.println(Arrays.toString(arr));`} />
        <TagGrid items={['变量', '数据类型', '运算符', '字符串', '数组']} />
      </div>
    ),
  },
  {
    label: '练习',
    left: (
      <div className="space-y-4">
        <PageTitle>课后练习</PageTitle>
        <BookList items={['声明多种类型变量并输出', '摄氏度和华氏度转换', '统计数组奇偶数', '反转字符串']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>参考代码</PageTitle>
        <BookCode language="java" showLineNumbers code={`public class Practice {
    public static void main(String[] args) {
        int[] nums = {12, 7, 9, 24, 5};
        int even = 0, odd = 0;
        for (int n : nums) {
            if (n % 2 == 0) even++;
            else odd++;
        }
        System.out.println("偶数:" + even + " 奇数:" + odd);
    }
}`} />
      </div>
    ),
  },
]

export default function JavaBasicPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

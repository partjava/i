'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import { PageTitle, BookParagraph, BookCode, BookAlert, BookList, TagGrid } from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'Java 编程', chapterTitle: '常用类与集合', chapterNumber: 5, totalChapters: 10,
  subjectHref: '/study/computer/java',
  prevChapter: { label: '面向对象', href: '/study/computer/java/oop' },
  nextChapter: { label: '异常处理', href: '/study/computer/java/exceptions' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '集合框架',
    left: (
      <div className="space-y-4">
        <PageTitle>List 和 Set</PageTitle>
        <BookParagraph>Java 集合框架提供了丰富的数据结构，List 存储有序可重复元素，Set 存储无序不可重复元素。</BookParagraph>
        <BookCode language="java" showLineNumbers code={`import java.util.*;

// ArrayList
List<String> list = new ArrayList<>();
list.add("Apple"); list.add("Banana"); list.add("Apple");
System.out.println(list.get(0));  // Apple
for (String s : list) System.out.print(s + " ");

// HashSet
Set<Integer> set = new HashSet<>();
set.add(3); set.add(1); set.add(3); set.add(2);
System.out.println(set);  // [1, 2, 3] 去重+无序

// TreeSet（有序）
Set<Integer> tree = new TreeSet<>();
tree.add(3); tree.add(1); tree.add(2);
System.out.println(tree);  // [1, 2, 3] 排序`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>Map 和 Queue</PageTitle>
        <BookCode language="java" showLineNumbers code={`// HashMap
Map<String, Integer> map = new HashMap<>();
map.put("Alice", 95);
map.put("Bob", 89);
System.out.println(map.get("Alice"));      // 95
for (Map.Entry<String, Integer> e : map.entrySet())
    System.out.println(e.getKey() + ":" + e.getValue());

// Queue
Queue<String> queue = new LinkedList<>();
queue.offer("A"); queue.offer("B");
System.out.println(queue.poll());  // A

// Stack
Deque<String> stack = new ArrayDeque<>();
stack.push("A"); stack.push("B");
System.out.println(stack.pop());  // B`} />
      </div>
    ),
  },
  {
    label: '常用类',
    left: (
      <div className="space-y-4">
        <PageTitle>String / Math / Date</PageTitle>
        <BookCode language="java" showLineNumbers code={`// String 常用方法
String s = "  Hello World  ";
System.out.println(s.trim());          // "Hello World"
System.out.println(s.contains("llo")); // true
System.out.println(s.split(" ").length); // 3

// Math 类
System.out.println(Math.max(10, 20));  // 20
System.out.println(Math.pow(2, 10));   // 1024.0
System.out.println(Math.random());     // 0.0~1.0

// 日期时间
LocalDate date = LocalDate.now();
LocalTime time = LocalTime.now();
System.out.println(date.plusDays(1));
System.out.println(DateTimeFormatter
    .ofPattern("yyyy-MM-dd").format(date));`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>Optional 与 Stream</PageTitle>
        <BookCode language="java" showLineNumbers code={`// Optional
Optional<String> opt = Optional.of("hello");
opt.ifPresent(s -> System.out.println(s));
String val = opt.orElse("default");

// Stream API
List<Integer> nums = Arrays.asList(1,2,3,4,5);
List<Integer> result = nums.stream()
    .filter(n -> n % 2 == 0)
    .map(n -> n * n)
    .collect(Collectors.toList());
System.out.println(result);  // [4, 16]

// 统计
int sum = nums.stream()
    .mapToInt(Integer::intValue)
    .sum();`} />
        <TagGrid items={['List', 'Set', 'Map', 'Stream', 'Optional', '集合']} />
      </div>
    ),
  },
  {
    label: '练习',
    left: (<div className="space-y-4"><PageTitle>单词频率统计</PageTitle><BookList items={['读取文本', '统计词频', '按频率排序', '输出Top10']} /></div>),
    right: (
      <div className="space-y-4">
        <PageTitle>参考代码</PageTitle>
        <BookCode language="java" showLineNumbers code={`Map<String, Integer> freq = new HashMap<>();
String text = "hello world hello java world";
for (String word : text.split(" ")) {
    freq.put(word, freq.getOrDefault(word, 0) + 1);
}
freq.entrySet().stream()
    .sorted(Map.Entry.<String, Integer>
        comparingByValue().reversed())
    .forEach(e -> System.out.println(e.getKey() + ": " + e.getValue()));`} />
      </div>
    ),
  },
]

export default function CollectionsPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

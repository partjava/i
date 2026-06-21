'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList, TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'PHP', chapterTitle: '面向对象编程', chapterNumber: 7, totalChapters: 22,
  subjectHref: '/study/computer/php',
  prevChapter: { label: '数组与字符串', href: '/study/computer/php/arrays-strings' },
  nextChapter: { label: '文件与异常处理', href: '/study/computer/php/file-exception' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '类与对象',
    left: (<div className="space-y-4"><PageTitle>类与对象</PageTitle><BookCode language="php" code={`<?php
class User {
    public $name;
    private $email;
    protected $role;
    public function __construct($name) { $this->name = $name; }
    public function greet() { return "Hello, {$this->name}!"; }
}
$user = new User("Tom");
echo $user->greet();
?>`} /></div>),
    right: (<div className="space-y-4"><SectionTitle>继承与多态</SectionTitle><BookCode language="php" code={`<?php
class Animal { public function speak() { return "..."; } }
class Dog extends Animal { public function speak() { return "汪汪"; } }
class Cat extends Animal { public function speak() { return "喵喵"; } }
function makeSound(Animal $a) { echo $a->speak(); }
makeSound(new Dog()); makeSound(new Cat());
?>`} /><TagGrid items={['class', '继承', '多态', 'public', 'private']} /></div>),
  },
  {
    label: '接口与魔术方法',
    left: (<div className="space-y-4"><SectionTitle>接口与trait</SectionTitle><BookCode language="php" code={`<?php
interface Logger { public function log($msg); }
trait Timestamp {
    public function getTime() { return date("Y-m-d H:i:s"); }
}
class FileLogger implements Logger {
    use Timestamp;
    public function log($msg) { echo "[{$this->getTime()}] $msg"; }
}
?>`} /></div>),
    right: (<div className="space-y-4"><SectionTitle>魔术方法</SectionTitle><BookCode language="php" code={`<?php
class Magic {
    private $data = [];
    public function __get($name) { return $this->data[$name] ?? null; }
    public function __set($name, $value) { $this->data[$name] = $value; }
    public function __toString() { return json_encode($this->data); }
}
$m = new Magic(); $m->name = "PHP"; echo $m->name;
?>`} /><TagGrid items={['接口', 'trait', '__get', '__set', '__toString']} /></div>),
  },
  {
    label: '练习与FAQ',
    left: (<div className="space-y-4"><PageTitle>练习</PageTitle><BookList items={['定义一个Product类', '实现接口和继承', '使用trait复用代码']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>常见问题</SectionTitle><BookParagraph><b>public/private/protected区别？</b>public任何地方，private仅本类，protected本类和子类。</BookParagraph><BookParagraph><b>接口和抽象类区别？</b>接口只定义方法签名，抽象类可包含实现。</BookParagraph><TagGrid items={['封装', '接口 vs 抽象类', 'trait', '练习']} /></div>),
  },
]

export default function PhpOopPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }

'use client';

import { useState } from 'react';

const tabs = [
  { key: 'class', label: '类与对象' },
  { key: 'prop', label: '属性与方法' },
  { key: 'inherit', label: '继承与多态' },
  { key: 'interface', label: '接口与trait' },
  { key: 'magic', label: '魔术方法' },
  { key: 'code', label: '代码示例' },
  { key: 'faq', label: '常见问题' },
  { key: 'practice', label: '练习' },
];

export default function PhpOopPage() {
  const [activeTab, setActiveTab] = useState('class');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 mt-4">面向对象编程</h1>
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none ${
                activeTab === tab.key
                  ? 'border-blue-500 text-blue-600 font-bold'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="bg-white rounded-lg shadow p-8">
        {activeTab === 'class' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">类与对象</h2>
            <ul className="list-disc pl-6 mt-2">
              <li>用<code>class</code>定义类，<code>new</code>创建对象</li>
              <li>构造方法<code>__construct</code></li>
              <li>对象属性和方法访问用<code>-&gt;</code></li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  'class Person {',
  '  public $name;',
  '  function __construct($name) { $this->name = $name; }',
  '  function sayHi() { echo "Hi, I am $this->name"; }',
  '}',
  '$p = new Person("Tom");',
  '$p->sayHi();',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'prop' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">属性与方法</h2>
            <ul className="list-disc pl-6 mt-2">
              <li>属性可设public、protected、private访问修饰符</li>
              <li>静态属性和方法用<code>static</code>声明，访问用<code>::</code></li>
              <li>常量用<code>const</code>定义</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  'class Counter {',
  '  public static $count = 0;',
  '  const VERSION = "1.0";',
  '  public function inc() { self::$count++; }',
  '}',
  'Counter::$count = 10;',
  '$c = new Counter();',
  '$c->inc();',
  'echo Counter::$count;',
  'echo Counter::VERSION;',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'inherit' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">继承与多态</h2>
            <ul className="list-disc pl-6 mt-2">
              <li>用<code>extends</code>实现类继承</li>
              <li>父类方法可被子类重写（override）</li>
              <li>父类方法用<code>parent::</code>调用</li>
              <li>多态：父类引用指向子类对象</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  'class Animal {',
  '  function speak() { echo "..."; }',
  '}',
  'class Dog extends Animal {',
  '  function speak() { echo "汪汪"; }',
  '}',
  '$a = new Dog();',
  '$a->speak();',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'interface' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">接口与trait</h2>
            <ul className="list-disc pl-6 mt-2">
              <li>接口用<code>interface</code>定义，类用<code>implements</code>实现</li>
              <li>trait实现代码复用，类用<code>use</code>引入</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  'interface Logger { function log($msg); }',
  'class FileLogger implements Logger {',
  '  function log($msg) { echo $msg; }',
  '}',
  'trait T { function hi() { echo "hi"; } }',
  'class A { use T; }',
  '$a = new A(); $a->hi();',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'magic' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">魔术方法</h2>
            <ul className="list-disc pl-6 mt-2">
              <li>常用魔术方法：<code>__construct</code>、<code>__destruct</code>、<code>__get</code>、<code>__set</code>、<code>__call</code>、<code>__toString</code></li>
              <li>可用于属性访问、方法调用、对象转字符串等场景</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  'class Demo {',
  '  private $data = [];',
  '  function __get($k) { return $this->data[$k] ?? null; }',
  '  function __set($k, $v) { $this->data[$k] = $v; }',
  '  function __toString() { return json_encode($this->data); }',
  '}',
  '$d = new Demo();',
  '$d->x = 1;',
  'echo $d->x;',
  'echo $d;',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'code' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">代码示例</h2>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// 类与对象',
  'class User {',
  '  public $name;',
  '  function __construct($name) { $this->name = $name; }',
  '  function hi() { echo "Hi, $this->name"; }',
  '}',
  '$u = new User("Alice");',
  '$u->hi();',
  '',
  '// 继承',
  'class Cat extends User {',
  '  function hi() { echo "喵，我是 $this->name"; }',
  '}',
  '$c = new Cat("Kitty");',
  '$c->hi();',
  '',
  '// 接口与trait',
  'interface I { function f(); }',
  'trait T { function f() { echo "T"; } }',
  'class B implements I { use T; }',
  '$b = new B(); $b->f();',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'faq' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">常见问题</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><b>Q: PHP支持多继承吗？</b><br />A: 不支持多继承，可用trait实现代码复用。</li>
              <li><b>Q: 构造方法和析构方法分别是什么？</b><br />A: <code>__construct</code>和<code>__destruct</code>。</li>
              <li><b>Q: 如何实现接口多实现？</b><br />A: 用逗号分隔多个接口名。</li>
            </ul>
          </div>
        )}
        {activeTab === 'practice' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">练习</h2>
            <ul className="list-decimal pl-6 space-y-2">
              <li>定义一个类，包含属性和方法，创建对象并调用</li>
              <li>实现一个继承关系，子类重写父类方法</li>
              <li>定义一个接口和一个trait，并让类实现和引入</li>
              <li>实现__get和__set魔术方法访问私有属性</li>
            </ul>
          </div>
        )}
        <div className="mt-8 flex justify-between">
          <a
            href="/study/php/arrays-strings"
            className="inline-flex items-center bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            上一页：数组与字符串
          </a>
          <a
            href="/study/php/file-exception"
            className="inline-flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            下一页：文件与异常处理
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
} 
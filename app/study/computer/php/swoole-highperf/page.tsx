'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList, TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'PHP', chapterTitle: 'Swoole与高性能开发', chapterNumber: 19, totalChapters: 22,
  subjectHref: '/study/computer/php',
  prevChapter: { label: '并发与异步编程', href: '/study/computer/php/concurrency-async' },
  nextChapter: { label: '自动化部署与CI/CD', href: '/study/computer/php/devops-cicd' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: 'Swoole基础',
    left: (<div className="space-y-4"><PageTitle>Swoole基础</PageTitle><BookParagraph>Swoole使PHP支持高性能网络通信和协程。</BookParagraph><BookCode language="php" code={`<?php
// HTTP服务器
$http = new Swoole\\Http\\Server("0.0.0.0", 9501);
$http->on("request", function ($req, $res) {
    $res->end("Hello Swoole");
});
$http->start();

// WebSocket服务器
$ws = new Swoole\\WebSocket\\Server("0.0.0.0", 9502);
$ws->on("message", function ($ws, $frame) {
    $ws->push($frame->fd, "收到: " . $frame->data);
});
$ws->start();
?>`} /></div>),
    right: (<div className="space-y-4"><SectionTitle>协程编程</SectionTitle><BookCode language="php" code={`<?php
go(function () {
    // 协程MySQL
    $db = new Swoole\\Coroutine\\MySQL();
    $db->connect(['host'=>'127.0.0.1','user'=>'root','password'=>'','database'=>'test']);
    $res = $db->query("SELECT * FROM users");

    // 协程Channel
    $ch = new Swoole\\Coroutine\\Channel();
    go(function () use ($ch) { $ch->push("data"); });
    $data = $ch->pop();
});
?>`} /><TagGrid items={['Swoole', 'HTTP server', 'WebSocket', '协程', 'Channel']} /></div>),
  },
  {
    label: '进程管理',
    left: (<div className="space-y-4"><SectionTitle>进程管理</SectionTitle><BookCode language="php" code={`<?php
// Process
$proc = new Swoole\\Process(function ($p) {
    $p->write("子进程数据");
});
$proc->start();
echo $proc->read();

// Process Pool
$pool = new Swoole\\Process\\Pool(4);
$pool->on("WorkerStart", function ($pool, $id) {
    echo "Worker #$id 启动";
});
$pool->start();
?>`} /></div>),
    right: (<div className="space-y-4"><SectionTitle>练习</SectionTitle><BookList items={['搭建Swoole HTTP服务器', '用协程实现并发MySQL查询', '实现WebSocket聊天室']} /><TagGrid items={['Process', 'Pool', 'Table', '内存', '性能']} /></div>),
  },
]

export default function PhpSwooleHighperfPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }

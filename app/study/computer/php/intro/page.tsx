'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookList,
  TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'PHP',
  chapterTitle: 'PHP编程入门',
  chapterNumber: 1,
  totalChapters: 22,
  subjectHref: '/study/computer/php',
  nextChapter: { label: '开发环境配置', href: '/study/computer/php/setup' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '语言简介',
    left: (
      <div className="space-y-4">
        <PageTitle>语言简介</PageTitle>
        <BookParagraph>PHP（全称：PHP: Hypertext Preprocessor）是一种广泛应用于Web开发的开源脚本语言，语法简单，易于上手，拥有庞大的社区和丰富的扩展库。PHP可嵌入HTML，适合快速开发动态网站和API。</BookParagraph>
        <BookList items={['跨平台，支持Linux、Windows、macOS', '主流Web服务器（Apache、Nginx）均支持', '广泛应用于CMS、博客、电商、API等场景']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>Hello World</PageTitle>
        <BookParagraph>PHP文件以.php为后缀，代码可直接嵌入HTML。</BookParagraph>
        <BookCode language="php" code={`<?php
echo "Hello, World!";
?>`} />
        <BookParagraph>将上述代码保存为hello.php，在命令行运行php hello.php，或放到Web服务器访问。</BookParagraph>
        <TagGrid items={['PHP', 'Web', '脚本', '开源', '后端']} />
      </div>
    ),
  },
  {
    label: '开发环境与FAQ',
    left: (
      <div className="space-y-4">
        <PageTitle>开发环境</PageTitle>
        <BookParagraph>PHP开发环境常见选择：</BookParagraph>
        <BookList items={[
          '本地安装：直接下载安装PHP（php.net）',
          '集成环境：XAMPP、WampServer、Laragon等一键集成PHP+MySQL+Apache',
          '容器化：使用Docker快速搭建开发环境',
        ]} />
        <BookCode language="bash" code={`# Docker方式示例
docker run --rm -it -v $PWD:/app -w /app php:8.2-cli php hello.php`} />
        <BookParagraph>推荐使用VSCode、PhpStorm等现代IDE进行开发。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>常见问题</SectionTitle>
        <BookParagraph><b>PHP和JS、Python相比有什么特点？</b>PHP专注Web后端，易于部署，生态成熟，适合中小型Web项目。</BookParagraph>
        <BookParagraph><b>PHP还能学吗？</b>依然有大量网站和企业在用，WordPress、Laravel等生态活跃。</BookParagraph>
        <BookParagraph><b>PHP必须配合Web服务器用吗？</b>CLI模式可直接运行脚本，Web开发需配合服务器。</BookParagraph>
        <SectionTitle>练习</SectionTitle>
        <BookList items={['编写一个hello.php，输出你的名字', '尝试用命令行和Web两种方式运行PHP脚本', '查找并安装一个本地PHP集成环境']} />
        <TagGrid items={['XAMPP', 'Docker', 'VSCode', 'PhpStorm', '练习']} />
      </div>
    ),
  },
]

export default function PhpIntroPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

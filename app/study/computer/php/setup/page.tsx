'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookList,
  TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'PHP',
  chapterTitle: '开发环境配置',
  chapterNumber: 2,
  totalChapters: 22,
  subjectHref: '/study/computer/php',
  prevChapter: { label: 'PHP编程入门', href: '/study/computer/php/intro' },
  nextChapter: { label: '基础语法与数据类型', href: '/study/computer/php/basic' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '安装与集成环境',
    left: (
      <div className="space-y-4">
        <PageTitle>本地安装</PageTitle>
        <BookParagraph>PHP支持多平台安装，以下为各系统安装方式：</BookParagraph>
        <BookCode language="bash" code={`# macOS
brew install php
# Ubuntu/Debian
sudo apt install php
# Windows
从 php.net/downloads 下载安装包`} />
        <BookParagraph>查看版本：php -v</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>集成环境</SectionTitle>
        <BookParagraph>集成环境可一键安装PHP+MySQL+Apache/Nginx：</BookParagraph>
        <BookList items={['XAMPP：跨平台，支持Windows/macOS/Linux', 'WampServer：Windows专用', 'Laragon：Windows专用，轻量级', 'MAMP：macOS专用']} />
        <SectionTitle>Docker环境</SectionTitle>
        <BookCode language="bash" code={`docker run --rm -it -v $PWD:/app -w /app php:8.2-cli php hello.php`} />
        <TagGrid items={['XAMPP', 'brew', 'apt', 'Docker', 'PHP 8']} />
      </div>
    ),
  },
  {
    label: 'IDE与练习',
    left: (
      <div className="space-y-4">
        <PageTitle>IDE与插件</PageTitle>
        <BookList items={['VSCode + PHP IntelliSense + PHP Debug', 'PhpStorm：专业PHP IDE', 'Sublime Text + PHP插件']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>常见问题</SectionTitle>
        <BookParagraph><b>PHP需要装什么扩展？</b>推荐：pdo_mysql、mbstring、gd、curl、openssl、json。</BookParagraph>
        <BookParagraph><b>如何确认PHP已安装？</b>命令行执行 php -v 看到版本信息即成功。</BookParagraph>
        <SectionTitle>练习</SectionTitle>
        <BookList items={['安装PHP环境，运行php -v', '搭建Laragon/XAMPP运行PHP', '用Docker运行PHP脚本']} />
        <TagGrid items={['VSCode', 'PhpStorm', '扩展', '安装', '练习']} />
      </div>
    ),
  },
]

export default function PhpSetupPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

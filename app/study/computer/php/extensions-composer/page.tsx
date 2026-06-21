'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList, TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'PHP', chapterTitle: '常用扩展与包管理', chapterNumber: 13, totalChapters: 22,
  subjectHref: '/study/computer/php',
  prevChapter: { label: '表单处理与数据验证', href: '/study/computer/php/forms-validation' },
  nextChapter: { label: '安全与性能优化', href: '/study/computer/php/security-performance' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '常用扩展',
    left: (
      <div className="space-y-4">
        <PageTitle>常用扩展</PageTitle>
        <BookParagraph>PHP提供了丰富的内置扩展和第三方扩展。使用phpinfo()查看已安装的扩展，通过extension_loaded()检查扩展是否加载。</BookParagraph>
        <BookCode language="php" code={`<?php
// 检查扩展是否加载
if (extension_loaded("mysqli")) {
  echo "MySQLi扩展已加载";
}

// 常用扩展示例
// 1. PDO扩展
try {
  $pdo = new PDO("mysql:host=localhost;dbname=test", "username", "password");
} catch (PDOException $e) {
  echo "连接失败: " . $e->getMessage();
}

// 2. GD扩展（图像处理）
if (extension_loaded("gd")) {
  $image = imagecreate(200, 200);
  $bg = imagecolorallocate($image, 255, 255, 255);
  $text_color = imagecolorallocate($image, 0, 0, 0);
  imagestring($image, 5, 50, 50, "Hello World", $text_color);
  imagepng($image, "hello.png");
  imagedestroy($image);
}

// 3. cURL扩展
if (extension_loaded("curl")) {
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, "https://example.com");
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  $response = curl_exec($ch);
  curl_close($ch);
}
?>`} />
        <TagGrid items={['扩展', 'GD', 'cURL', 'PDO', 'mysqli']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>Composer基础</SectionTitle>
        <BookParagraph>Composer是PHP的依赖管理工具。使用composer.json定义项目依赖，通过composer install安装依赖。</BookParagraph>
        <BookCode language="json" code={`{
  "name": "my/project",
  "description": "My PHP Project",
  "type": "project",
  "require": {
    "php": "^8.0",
    "monolog/monolog": "^2.0",
    "guzzlehttp/guzzle": "^7.0"
  },
  "require-dev": {
    "phpunit/phpunit": "^9.0",
    "symfony/var-dumper": "^5.0"
  },
  "autoload": {
    "psr-4": {
      "My\\Project\\": "src/"
    }
  }
}`} />
        <BookCode language="bash" code={`composer install          // 安装依赖
composer update           // 更新依赖
composer require package/name  // 添加新依赖
composer remove package/name   // 移除依赖
composer show             // 查看已安装的包`} />
      </div>
    ),
  },
  {
    label: '包管理与自动加载',
    left: (
      <div className="space-y-4">
        <SectionTitle>包管理</SectionTitle>
        <BookParagraph>使用Composer管理项目依赖。版本约束确保依赖兼容性，可配置私有包仓库或使用本地包。</BookParagraph>
        <BookCode language="json" code={`{
  "require": {
    // 精确版本
    "vendor/package": "1.2.3",
    // 版本范围
    "vendor/package": ">=1.0 <2.0",
    // 通配符
    "vendor/package": "1.2.*",
    // 波浪号
    "vendor/package": "~1.2",
    // 脱字符
    "vendor/package": "^1.2.3"
  }
}

// 使用私有包仓库
{
  "repositories": [
    {
      "type": "composer",
      "url": "https://packages.example.com"
    }
  ],
  "require": {
    "mycompany/private-package": "^1.0"
  }
}

// 使用本地包
{
  "repositories": [
    {
      "type": "path",
      "url": "../my-local-package"
    }
  ]
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>自动加载</SectionTitle>
        <BookParagraph>Composer提供PSR-4自动加载标准。使用vendor/autoload.php加载依赖，可自定义自动加载规则。</BookParagraph>
        <BookCode language="php" code={`<?php
// 引入Composer自动加载
require __DIR__ . "/vendor/autoload.php";

// 使用自动加载的类
use Monolog\\Logger;
use Monolog\\Handler\\StreamHandler;

// 创建日志实例
$log = new Logger("name");
$log->pushHandler(new StreamHandler("app.log", Logger::WARNING));
?>`} />
        <BookCode language="json" code={`// 自定义自动加载
{
  "autoload": {
    "psr-4": {
      "My\\Namespace\\": "src/"
    },
    "files": [
      "src/helpers.php"
    ],
    "classmap": [
      "src/legacy/"
    ]
  }
}`} />
        <BookCode language="bash" code={`// 重新生成自动加载文件
composer dump-autoload`} />
        <TagGrid items={['PSR-4', 'autoload', 'vendor', 'Composer']} />
      </div>
    ),
  },
  {
    label: '最佳实践',
    left: (
      <div className="space-y-4">
        <SectionTitle>最佳实践</SectionTitle>
        <BookParagraph>使用语义化版本控制，合理管理依赖版本，利用Composer脚本自动化任务。</BookParagraph>
        <BookCode language="json" code={`{
  "name": "my/project",
  "description": "My PHP Project",
  "type": "project",
  "license": "MIT",
  "authors": [
    {
      "name": "Your Name",
      "email": "your@email.com"
    }
  ],
  "require": {
    "php": "^8.0",
    "ext-json": "*",
    "ext-pdo": "*"
  },
  "require-dev": {
    "phpunit/phpunit": "^9.0",
    "symfony/var-dumper": "^5.0"
  },
  "autoload": {
    "psr-4": {
      "My\\Project\\": "src/"
    }
  },
  "scripts": {
    "post-install-cmd": [
      "My\\Project\\Installer::postInstall"
    ],
    "post-update-cmd": [
      "My\\Project\\Installer::postUpdate"
    ],
    "test": "phpunit"
  },
  "config": {
    "sort-packages": true,
    "optimize-autoloader": true
  }
}`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>常见问题</SectionTitle>
        <BookParagraph><b>Q: 如何解决依赖冲突？</b><br />A: 使用<code>composer why</code>查看依赖关系，调整版本约束。</BookParagraph>
        <BookParagraph><b>Q: 如何更新所有依赖？</b><br />A: 使用<code>composer update</code>，或指定包名<code>composer update vendor/package</code>。</BookParagraph>
        <BookParagraph><b>Q: 如何创建自己的包？</b><br />A: 创建composer.json，遵循PSR-4标准，发布到Packagist。</BookParagraph>
      </div>
    ),
  },
  {
    label: '练习',
    left: (
      <div className="space-y-4">
        <PageTitle>练习</PageTitle>
        <BookList items={[
          '创建一个新的Composer项目，添加常用依赖',
          '实现自定义自动加载规则',
          '创建并发布一个简单的PHP包',
          '使用Composer脚本自动化项目部署',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>标签汇总</SectionTitle>
        <TagGrid items={['Composer', '扩展', 'GD', 'cURL', 'PDO', 'PSR-4', 'autoload', '依赖管理', '最佳实践', 'Packagist', '脚本']} />
      </div>
    ),
  },
]

export default function PhpExtensionsComposerPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }

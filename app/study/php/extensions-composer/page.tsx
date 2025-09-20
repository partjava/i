'use client';

import { useState } from 'react';

const tabs = [
  { key: 'extensions', label: '常用扩展' },
  { key: 'composer-basic', label: 'Composer基础' },
  { key: 'package-management', label: '包管理' },
  { key: 'autoloading', label: '自动加载' },
  { key: 'best-practices', label: '最佳实践' },
  { key: 'faq', label: '常见问题' },
  { key: 'exercise', label: '练习' },
];

export default function PhpExtensionsComposerPage() {
  const [activeTab, setActiveTab] = useState('extensions');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 mt-4">常用扩展与包管理</h1>
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
        {activeTab === 'extensions' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">常用扩展</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>PHP提供了丰富的内置扩展和第三方扩展。</li>
              <li>使用<code>phpinfo()</code>查看已安装的扩展。</li>
              <li>通过<code>extension_loaded()</code>检查扩展是否加载。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// 检查扩展是否加载',
  'if (extension_loaded("mysqli")) {',
  '  echo "MySQLi扩展已加载";',
  '}',
  '',
  '// 常用扩展示例',
  '// 1. PDO扩展',
  'try {',
  '  $pdo = new PDO("mysql:host=localhost;dbname=test", "username", "password");',
  '} catch (PDOException $e) {',
  '  echo "连接失败: " . $e->getMessage();',
  '}',
  '',
  '// 2. GD扩展（图像处理）',
  'if (extension_loaded("gd")) {',
  '  $image = imagecreate(200, 200);',
  '  $bg = imagecolorallocate($image, 255, 255, 255);',
  '  $text_color = imagecolorallocate($image, 0, 0, 0);',
  '  imagestring($image, 5, 50, 50, "Hello World", $text_color);',
  '  imagepng($image, "hello.png");',
  '  imagedestroy($image);',
  '}',
  '',
  '// 3. cURL扩展',
  'if (extension_loaded("curl")) {',
  '  $ch = curl_init();',
  '  curl_setopt($ch, CURLOPT_URL, "https://example.com");',
  '  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);',
  '  $response = curl_exec($ch);',
  '  curl_close($ch);',
  '}',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'composer-basic' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Composer基础</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Composer是PHP的依赖管理工具。</li>
              <li>使用<code>composer.json</code>定义项目依赖。</li>
              <li>通过<code>composer install</code>安装依赖。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '// composer.json示例',
  '{',
  '  "name": "my/project",',
  '  "description": "My PHP Project",',
  '  "type": "project",',
  '  "require": {',
  '    "php": "^8.0",',
  '    "monolog/monolog": "^2.0",',
  '    "guzzlehttp/guzzle": "^7.0"',
  '  },',
  '  "require-dev": {',
  '    "phpunit/phpunit": "^9.0",',
  '    "symfony/var-dumper": "^5.0"',
  '  },',
  '  "autoload": {',
  '    "psr-4": {',
  '      "My\\Project\\": "src/"',
  '    }',
  '  }',
  '}',
  '',
  '// 常用Composer命令',
  '// 安装依赖',
  'composer install',
  '',
  '// 更新依赖',
  'composer update',
  '',
  '// 添加新依赖',
  'composer require package/name',
  '',
  '// 移除依赖',
  'composer remove package/name',
  '',
  '// 查看已安装的包',
  'composer show',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'package-management' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">包管理</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>使用Composer管理项目依赖。</li>
              <li>版本约束确保依赖兼容性。</li>
              <li>使用私有包仓库。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// 版本约束示例',
  '// composer.json',
  '{',
  '  "require": {',
  '    // 精确版本',
  '    "vendor/package": "1.2.3",',
  '    // 版本范围',
  '    "vendor/package": ">=1.0 <2.0",',
  '    // 通配符',
  '    "vendor/package": "1.2.*",',
  '    // 波浪号',
  '    "vendor/package": "~1.2",',
  '    // 脱字符',
  '    "vendor/package": "^1.2.3"',
  '  }',
  '}',
  '',
  '// 使用私有包仓库',
  '{',
  '  "repositories": [',
  '    {',
  '      "type": "composer",',
  '      "url": "https://packages.example.com"',
  '    }',
  '  ],',
  '  "require": {',
  '    "mycompany/private-package": "^1.0"',
  '  }',
  '}',
  '',
  '// 使用本地包',
  '{',
  '  "repositories": [',
  '    {',
  '      "type": "path",',
  '      "url": "../my-local-package"',
  '    }',
  '  ]',
  '}',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'autoloading' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">自动加载</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Composer提供PSR-4自动加载标准。</li>
              <li>使用<code>vendor/autoload.php</code>加载依赖。</li>
              <li>自定义自动加载规则。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// 引入Composer自动加载',
  'require __DIR__ . "/vendor/autoload.php";',
  '',
  '// 使用自动加载的类',
  'use Monolog\\Logger;',
  'use Monolog\\Handler\\StreamHandler;',
  '',
  '// 创建日志实例',
  '$log = new Logger("name");',
  '$log->pushHandler(new StreamHandler("app.log", Logger::WARNING));',
  '',
  '// 自定义自动加载',
  '// composer.json',
  '{',
  '  "autoload": {',
  '    "psr-4": {',
  '      "My\\Namespace\\": "src/"',
  '    },',
  '    "files": [',
  '      "src/helpers.php"',
  '    ],',
  '    "classmap": [',
  '      "src/legacy/"',
  '    ]',
  '  }',
  '}',
  '',
  '// 重新生成自动加载文件',
  'composer dump-autoload',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'best-practices' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">最佳实践</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>使用语义化版本控制。</li>
              <li>合理管理依赖版本。</li>
              <li>使用Composer脚本。</li>
            </ul>
            <pre className="bg-gray-100 p-2 rounded text-sm mt-2">
{[
  '<?php',
  '// composer.json最佳实践示例',
  '{',
  '  "name": "my/project",',
  '  "description": "My PHP Project",',
  '  "type": "project",',
  '  "license": "MIT",',
  '  "authors": [',
  '    {',
  '      "name": "Your Name",',
  '      "email": "your@email.com"',
  '    }',
  '  ],',
  '  "require": {',
  '    "php": "^8.0",',
  '    "ext-json": "*",',
  '    "ext-pdo": "*"',
  '  },',
  '  "require-dev": {',
  '    "phpunit/phpunit": "^9.0",',
  '    "symfony/var-dumper": "^5.0"',
  '  },',
  '  "autoload": {',
  '    "psr-4": {',
  '      "My\\Project\\": "src/"',
  '    }',
  '  },',
  '  "scripts": {',
  '    "post-install-cmd": [',
  '      "My\\Project\\Installer::postInstall"',
  '    ],',
  '    "post-update-cmd": [',
  '      "My\\Project\\Installer::postUpdate"',
  '    ],',
  '    "test": "phpunit"',
  '  },',
  '  "config": {',
  '    "sort-packages": true,',
  '    "optimize-autoloader": true',
  '  }',
  '}',
  '?>',
].join('\n')}
            </pre>
          </div>
        )}
        {activeTab === 'faq' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">常见问题</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><b>Q: 如何解决依赖冲突？</b><br />A: 使用<code>composer why</code>查看依赖关系，调整版本约束。</li>
              <li><b>Q: 如何更新所有依赖？</b><br />A: 使用<code>composer update</code>，或指定包名<code>composer update vendor/package</code>。</li>
              <li><b>Q: 如何创建自己的包？</b><br />A: 创建composer.json，遵循PSR-4标准，发布到Packagist。</li>
            </ul>
          </div>
        )}
        {activeTab === 'exercise' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">练习</h2>
            <ul className="list-decimal pl-6 space-y-2">
              <li>创建一个新的Composer项目，添加常用依赖。</li>
              <li>实现自定义自动加载规则。</li>
              <li>创建并发布一个简单的PHP包。</li>
              <li>使用Composer脚本自动化项目部署。</li>
            </ul>
          </div>
        )}
        <div className="mt-8 flex justify-between">
          <a
            href="/study/php/forms-validation"
            className="inline-flex items-center bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            上一页：表单处理与数据验证
          </a>
          <a
            href="/study/php/security-performance"
            className="inline-flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            下一页：安全与性能优化
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
} 
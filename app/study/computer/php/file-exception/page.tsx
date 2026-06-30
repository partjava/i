'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList, TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'PHP', chapterTitle: '文件与异常处理', chapterNumber: 8, totalChapters: 22,
  subjectHref: '/study/computer/php',
  prevChapter: { label: '面向对象编程', href: '/study/computer/php/oop' },
  nextChapter: { label: 'Web开发基础', href: '/study/computer/php/web' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '文件操作基础',
    left: (
      <div className="space-y-4">
        <PageTitle>文件操作基础</PageTitle>
        <BookParagraph>PHP通过内置函数进行文件操作，如fopen、fclose、fread、fwrite等。常用模式：r（只读）、w（只写）、a（追加）、r+（读写）。文件操作前建议判断文件是否存在：file_exists。</BookParagraph>
        <BookCode language="php" code={`<?php
// 检查文件是否存在
if (file_exists("test.txt")) {
  echo "文件存在";
} else {
  echo "文件不存在";
}

// 打开文件（只读）
$handle = fopen("test.txt", "r");
if ($handle) {
  // 关闭文件
  fclose($handle);
}
?>`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>文件读写</SectionTitle>
        <BookParagraph>读取文件内容：fread、file_get_contents。写入文件内容：fwrite、file_put_contents。逐行读取：fgets。文件指针操作：feof、rewind。</BookParagraph>
        <BookCode language="php" code={`<?php
// 读取整个文件内容
$content = file_get_contents("test.txt");
echo $content;

// 逐行读取文件
$handle = fopen("test.txt", "r");
if ($handle) {
  while (($line = fgets($handle)) !== false) {
    echo $line;
  }
  fclose($handle);
}

// 写入文件
$handle = fopen("test.txt", "w");
if ($handle) {
  fwrite($handle, "Hello, world!\\n");
  fclose($handle);
}

// 追加内容
file_put_contents("test.txt", "追加内容\\n", FILE_APPEND);
?>`} />
        <TagGrid items={['file_get_contents', 'fopen', 'fwrite', 'fgets', 'feof']} />
      </div>
    ),
  },
  {
    label: '异常处理',
    left: (
      <div className="space-y-4">
        <PageTitle>异常处理</PageTitle>
        <BookParagraph>PHP通过try...catch结构进行异常捕获。抛出异常用throw new Exception()。可自定义异常类继承自Exception。finally块用于收尾操作。</BookParagraph>
        <BookCode language="php" code={`<?php
try {
  // 可能抛出异常的代码
  throw new Exception("发生错误");
} catch (Exception $e) {
  echo "捕获异常: " . $e->getMessage();
} finally {
  echo "无论如何都会执行";
}

// 自定义异常类
class MyException extends Exception {}
try {
  throw new MyException("自定义异常");
} catch (MyException $e) {
  echo $e->getMessage();
}
?>`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>文件与异常结合</SectionTitle>
        <BookParagraph>文件操作时应结合异常处理，提升健壮性。可针对文件不存在、权限不足等情况抛出异常。资源释放建议放在finally中。</BookParagraph>
        <BookCode language="php" code={`<?php
function readFileSafe($filename) {
  if (!file_exists($filename)) {
    throw new Exception("文件不存在");
  }
  $handle = fopen($filename, "r");
  if (!$handle) {
    throw new Exception("无法打开文件");
  }
  try {
    $content = fread($handle, filesize($filename));
    return $content;
  } finally {
    fclose($handle); // 保证资源释放
  }
}

try {
  $data = readFileSafe("test.txt");
  echo $data;
} catch (Exception $e) {
  echo $e->getMessage();
}
?>`} />
      </div>
    ),
  },
  {
    label: '代码示例',
    left: (
      <div className="space-y-4">
        <SectionTitle>代码示例</SectionTitle>
        <BookParagraph><b>读取配置文件</b>：完整错误处理，包括文件存在检查、打开文件、逐行读取、feof验证，finally确保关闭句柄。</BookParagraph>
        <BookCode language="php" code={`<?php
// 读取文件并处理异常，带详细注释
function loadConfig($file) {
  // 检查文件是否存在
  if (!file_exists($file)) {
    throw new Exception("配置文件不存在");
  }
  $handle = fopen($file, "r");
  if (!$handle) {
    throw new Exception("无法打开配置文件");
  }
  $config = "";
  try {
    while (($line = fgets($handle)) !== false) {
      $config .= $line;
    }
    if (!feof($handle)) {
      throw new Exception("读取配置文件出错");
    }
    return $config;
  } finally {
    fclose($handle); // 关闭文件句柄
  }
}

try {
  $cfg = loadConfig("config.ini");
  echo $cfg;
} catch (Exception $e) {
  echo "错误: " . $e->getMessage();
}
?>`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>日志写入与异常处理</SectionTitle>
        <BookParagraph><b>日志写入函数</b>：使用fwrite追加日志，try/finally确保文件句柄关闭，写入失败时抛出异常。</BookParagraph>
        <BookCode language="php" code={`<?php
// 写文件并处理异常
function saveLog($msg) {
  $file = "log.txt";
  $handle = fopen($file, "a");
  if (!$handle) {
    throw new Exception("无法写入日志");
  }
  try {
    fwrite($handle, date("Y-m-d H:i:s ") . $msg . "\\n");
  } finally {
    fclose($handle);
  }
}
try {
  saveLog("用户登录");
} catch (Exception $e) {
  echo $e->getMessage();
}
?>`} />
        <BookParagraph><b>常用函数说明</b>：file_exists检查文件、fopen打开文件、fgets逐行读取、fwrite写入内容、feof检查文件结尾、fclose关闭句柄。</BookParagraph>
      </div>
    ),
  },
  {
    label: '常见问题与练习',
    left: (
      <div className="space-y-4">
        <SectionTitle>常见问题</SectionTitle>
        <BookParagraph><b>Q: 文件操作失败时如何处理？</b><br />A: 建议结合异常处理，及时抛出并捕获异常，避免程序崩溃。</BookParagraph>
        <BookParagraph><b>Q: 如何优雅关闭文件？</b><br />A: 推荐用finally块关闭文件句柄，确保资源释放。</BookParagraph>
        <BookParagraph><b>Q: PHP7+的异常处理和早期有何不同？</b><br />A: PHP7引入Throwable接口，Error和Exception都可被catch。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>练习</PageTitle>
        <BookList items={[
          '编写一个函数，安全读取指定文件内容，要求用异常处理',
          '实现一个日志写入函数，写入失败时抛出异常',
          '模拟文件不存在、权限不足等异常场景并处理',
          '用finally块确保文件资源被正确释放',
        ]} />
        <TagGrid items={['文件操作', '异常处理', 'try', 'catch', 'finally', 'fopen', 'fwrite', 'fgets', 'Exception', '练习']} />
      </div>
    ),
  },
]

export default function PhpFileExceptionPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }

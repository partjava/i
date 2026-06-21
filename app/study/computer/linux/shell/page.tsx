'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
  TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'Linux系统',
  chapterTitle: 'Shell与脚本编程',
  chapterNumber: 6,
  totalChapters: 9,
  subjectHref: '/study/computer/linux',
  prevChapter: { label: '进程与服务管理', href: '/study/computer/linux/process' },
  nextChapter: { label: '网络与安全', href: '/study/computer/linux/network' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: 'Shell基础',
    left: (
      <div className="space-y-4">
        <PageTitle>Shell基础</PageTitle>
        <BookParagraph><strong>Shell类型：</strong></BookParagraph>
        <BookList items={['Bash：最常用的Shell', 'Zsh：功能强大的Shell', 'Fish：用户友好的Shell', 'Ksh：Korn Shell']} />
        <BookParagraph><strong>Shell特性：</strong></BookParagraph>
        <BookList items={['命令解释器', '脚本编程语言', '环境变量管理', '命令历史记录', '命令补全']} />
        <BookAlert type="info" message="Shell脚本第一行通常是 #!/bin/bash，使用 chmod +x script.sh 添加执行权限，使用 ./script.sh 或 bash script.sh 运行脚本" />
        <SectionTitle>脚本编程基础</SectionTitle>
        <BookCode language="bash" code={`#!/bin/bash
# 变量定义
name="world"

# 条件判断
if [ "$name" = "world" ]; then
  echo "Hello, $name!"
fi

# 循环
for i in {1..5}; do
  echo $i
done

# 函数
greet() { echo "Hi, $1!"; }
greet Alice`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>常用特殊变量</PageTitle>
        <BookCode language="bash" code={`$0    # 脚本名称
$1-$9 # 位置参数
$#    # 参数个数
$@    # 所有参数
$?    # 上一条命令的返回值`} />
        <SectionTitle>文本处理命令</SectionTitle>
        <BookCode language="bash" code={`# 文本搜索
grep 'pattern' file.txt

# 流编辑器
sed 's/old/new/g' file.txt

# 文本分析
awk '{print $1}' file.txt

# 字段提取
cut -d: -f1 /etc/passwd

# 排序
sort file.txt

# 去重
uniq file.txt`} />
        <SectionTitle>文件操作命令</SectionTitle>
        <BookCode language="bash" code={`# 查找文件
find /home -name "*.sh"

# 参数传递
find . -type f | xargs wc -l

# 归档
tar -czvf archive.tar.gz dir/

# 压缩
gzip file.txt

# 同步
rsync -av src/ dest/`} />
        <BookAlert type="info" message="管道：command1 | command2，重定向：command &gt; file，后台运行：command &，命令替换：$(command)" />
        <TagGrid items={['Bash', 'Zsh', 'grep', 'sed', 'awk', 'find']} />
      </div>
    ),
  },
  {
    label: '实战脚本案例',
    left: (
      <div className="space-y-4">
        <PageTitle>Shell脚本案例</PageTitle>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">备份脚本</p>
          <BookCode language="bash" code={`#!/bin/bash
# 备份脚本
BACKUP_DIR="/backup"
DATE=$(date +%Y%m%d)
tar -czf $BACKUP_DIR/backup_$DATE.tar.gz /data
find $BACKUP_DIR -mtime +7 -delete`} />
          <p className="text-xs mt-1" style={{ color: '#666' }}>tar创建压缩备份，find删除7天前的旧备份</p>
        </div>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">日志分析脚本</p>
          <BookCode language="bash" code={`#!/bin/bash
# 日志分析脚本
LOG_FILE="/var/log/nginx/access.log"
awk '{print $1}' $LOG_FILE | sort | uniq -c | sort -nr | head -n 10`} />
          <p className="text-xs mt-1" style={{ color: '#666' }}>awk提取IP，sort排序，uniq统计，head显示前10</p>
        </div>
        <div className="rounded-lg p-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">系统监控脚本</p>
          <BookCode language="bash" code={`#!/bin/bash
# 系统监控脚本
CPU=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}')
MEM=$(free -m | awk '/Mem:/ {print $3}')
echo "CPU使用率: $CPU%"
echo "内存使用: $MEM MB"`} />
          <p className="text-xs mt-1" style={{ color: '#666' }}>top和free命令获取系统资源使用情况</p>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>Shell编程技巧</PageTitle>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">处理命令行参数</p>
          <BookCode language="bash" code={`#!/bin/bash
# 处理命令行参数
while getopts "a:b:c" opt; do
  case $opt in
    a) arg_a=$OPTARG ;;
    b) arg_b=$OPTARG ;;
    c) flag_c=true ;;
  esac
done`} />
          <p className="text-xs mt-1" style={{ color: '#666' }}>getopts处理命令行参数，支持选项和参数</p>
        </div>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">错误处理和日志记录</p>
          <BookCode language="bash" code={`#!/bin/bash
log_file="/var/log/script.log"
exec 1>>$log_file
exec 2>&1
set -e
trap 'echo "Error at line $LINENO"' ERR`} />
          <p className="text-xs mt-1" style={{ color: '#666' }}>重定向输出到日志，设置错误处理和捕获</p>
        </div>
        <div className="rounded-lg p-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">并发处理</p>
          <BookCode language="bash" code={`#!/bin/bash
for i in {1..10}; do
  (process $i) &
done
wait`} />
          <p className="text-xs mt-1" style={{ color: '#666' }}>使用后台运行&和wait命令实现并发处理</p>
        </div>
        <TagGrid items={['脚本', '备份', '日志分析', '监控', '并发', '错误处理']} />
      </div>
    ),
  },
  {
    label: '面试高频题',
    left: (
      <div className="space-y-4">
        <PageTitle>面试高频题</PageTitle>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">解释Shell中的重定向</p>
          <BookList items={[
            '> 标准输出重定向（覆盖）',
            '>> 标准输出重定向（追加）',
            '< 标准输入重定向',
            '2> 标准错误重定向',
            '&> 标准输出和错误重定向',
          ]} />
        </div>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">解释Shell中的变量作用域</p>
          <BookList items={[
            '局部变量：函数内部定义，只在函数内有效',
            '全局变量：脚本中定义，整个脚本有效',
            '环境变量：使用export导出，子进程可见',
            '特殊变量：系统预定义的特殊变量（$?、$0等）',
          ]} />
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>面试题与编程技巧</PageTitle>
        <div className="rounded-lg p-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">如何编写安全的Shell脚本？</p>
          <BookList items={[
            '使用 set -e 在出错时退出',
            '使用 set -u 检查未定义变量',
            '使用 trap 处理信号',
            '避免使用 eval',
            '检查用户输入',
            '使用引号保护变量',
          ]} />
        </div>
        <BookAlert type="info" message="Shell编程技巧：使用 [[ ]] 进行条件测试比 [ ] 更安全，使用 $(command) 获取命令输出比反引号更方便。" />
        <TagGrid items={['重定向', '变量作用域', '安全脚本', 'trap', 'set']} />
      </div>
    ),
  },
]

export default function LinuxShellPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

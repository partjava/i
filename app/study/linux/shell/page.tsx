"use client";

import React from 'react';
import { Typography, Tabs, Card, Alert, Button, Space, Collapse } from 'antd';

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

// 实战案例数据
const practicalCases = [
  {
    title: "Shell脚本案例",
    cases: [
      {
        problem: "编写一个备份脚本",
        solution: `#!/bin/bash
# 备份脚本
BACKUP_DIR="/backup"
DATE=$(date +%Y%m%d)
tar -czf $BACKUP_DIR/backup_$DATE.tar.gz /data
find $BACKUP_DIR -mtime +7 -delete`,
        explanation: "使用tar命令创建压缩备份，使用find命令删除7天前的旧备份"
      },
      {
        problem: "编写一个日志分析脚本",
        solution: `#!/bin/bash
# 日志分析脚本
LOG_FILE="/var/log/nginx/access.log"
awk '{print $1}' $LOG_FILE | sort | uniq -c | sort -nr | head -n 10`,
        explanation: "使用awk提取IP地址，sort排序，uniq统计，head显示前10个结果"
      },
      {
        problem: "编写一个系统监控脚本",
        solution: `#!/bin/bash
# 系统监控脚本
CPU=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}')
MEM=$(free -m | awk '/Mem:/ {print $3}')
echo "CPU使用率: $CPU%"
echo "内存使用: $MEM MB"`,
        explanation: "使用top和free命令获取系统资源使用情况"
      }
    ]
  },
  {
    title: "Shell编程技巧",
    cases: [
      {
        problem: "处理命令行参数",
        solution: `#!/bin/bash
# 处理命令行参数
while getopts "a:b:c" opt; do
  case $opt in
    a) arg_a=$OPTARG ;;
    b) arg_b=$OPTARG ;;
    c) flag_c=true ;;
  esac
done`,
        explanation: "使用getopts处理命令行参数，支持选项和参数"
      },
      {
        problem: "错误处理和日志记录",
        solution: `#!/bin/bash
# 错误处理和日志记录
log_file="/var/log/script.log"
exec 1>>$log_file
exec 2>&1
set -e
trap 'echo "Error at line $LINENO"' ERR`,
        explanation: "重定向输出到日志文件，设置错误处理和捕获"
      },
      {
        problem: "并发处理",
        solution: `#!/bin/bash
# 并发处理
for i in {1..10}; do
  (process $i) &
done
wait`,
        explanation: "使用后台运行和wait命令实现并发处理"
      }
    ]
  }
];

const tabItems = [
  {
    key: 'basic',
    label: 'Shell基础',
    children: (
      <Card title="Shell基础" className="mb-4">
        <Paragraph>
          <b>Shell类型：</b>
          <ul>
            <li>Bash：最常用的Shell</li>
            <li>Zsh：功能强大的Shell</li>
            <li>Fish：用户友好的Shell</li>
            <li>Ksh：Korn Shell</li>
          </ul>
        </Paragraph>
        <Paragraph>
          <b>Shell特性：</b>
          <ul>
            <li>命令解释器</li>
            <li>脚本编程语言</li>
            <li>环境变量管理</li>
            <li>命令历史记录</li>
            <li>命令补全</li>
          </ul>
        </Paragraph>
        <Alert
          message="要点"
          description={
            <ul>
              <li>Shell脚本第一行通常是<Text code>#!/bin/bash</Text></li>
              <li>使用<Text code>chmod +x script.sh</Text>添加执行权限</li>
              <li>使用<Text code>./script.sh</Text>或<Text code>bash script.sh</Text>运行脚本</li>
            </ul>
          }
          type="info"
          showIcon
        />
      </Card>
    ),
  },
  {
    key: 'script',
    label: '脚本编程',
    children: (
      <Card title="脚本编程" className="mb-4">
        <Paragraph>
          <b>典型Shell脚本结构：</b>
          <pre className="bg-gray-100 rounded p-4 text-sm overflow-x-auto">{
`#!/bin/bash
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
greet() {
  echo "Hi, $1!"
}
greet Alice
`}</pre>
        </Paragraph>
        <Paragraph>
          <b>常用特殊变量：</b>
          <pre className="bg-gray-100 rounded p-4 text-sm overflow-x-auto">{
`$0    # 脚本名称
$1-$9 # 位置参数
$#    # 参数个数
$@    # 所有参数
$?    # 上一条命令的返回值
`}</pre>
        </Paragraph>
        <Alert
          message="编程技巧"
          description={
            <ul>
              <li>使用<Text code>set -e</Text>在出错时退出</li>
              <li>使用<Text code>trap</Text>捕获信号</li>
              <li>使用<Text code>[[ ]]</Text>进行条件测试</li>
              <li>使用<Text code>$(command)</Text>获取命令输出</li>
            </ul>
          }
          type="info"
          showIcon
        />
      </Card>
    ),
  },
  {
    key: 'command',
    label: '常用命令',
    children: (
      <Card title="常用命令" className="mb-4">
        <Paragraph>
          <b>文本处理命令：</b>
          <pre className="bg-gray-100 rounded p-4 text-sm overflow-x-auto">{
`# 文本搜索
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
uniq file.txt
`}</pre>
        </Paragraph>
        <Paragraph>
          <b>文件操作命令：</b>
          <pre className="bg-gray-100 rounded p-4 text-sm overflow-x-auto">{
`# 查找文件
find /home -name "*.sh"

# 参数传递
find . -type f | xargs wc -l

# 归档
tar -czvf archive.tar.gz dir/

# 压缩
gzip file.txt

# 同步
rsync -av src/ dest/
`}</pre>
        </Paragraph>
        <Alert
          message="命令组合"
          description={
            <ul>
              <li>管道：<Text code>{`command1 | command2`}</Text></li>
              <li>重定向：<Text code>{`command > file`}</Text></li>
              <li>后台运行：<Text code>{`command &`}</Text></li>
              <li>命令替换：<Text code>{`$(command)`}</Text></li>
            </ul>
          }
          type="info"
          showIcon
        />
      </Card>
    ),
  },
  {
    key: 'case',
    label: '实战案例与面试题',
    children: (
      <Card title="实战案例与面试题" className="mb-4">
        {practicalCases.map((section, index) => (
          <div key={index} className="mb-6">
            <Title level={4}>{section.title}</Title>
            {section.cases.map((caseItem, caseIndex) => (
              <div key={caseIndex} className="mb-4">
                <Paragraph>
                  <b>问题：</b> {caseItem.problem}
                </Paragraph>
                <Collapse>
                  <Panel header="查看解决方案" key={caseIndex}>
                    <div className="space-y-2">
                      <Paragraph>
                        <b>代码：</b> <Text code>{caseItem.solution}</Text>
                      </Paragraph>
                      <Paragraph>
                        <b>解释：</b> {caseItem.explanation}
                      </Paragraph>
                    </div>
                  </Panel>
                </Collapse>
              </div>
            ))}
          </div>
        ))}
        <div className="mt-6">
          <Title level={4}>面试高频题</Title>
          <Collapse>
            <Panel header="解释Shell中的重定向" key="1">
              <Paragraph>
                Shell重定向的类型：
              </Paragraph>
              <ul>
                <li><Text code>{" > "}</Text>：标准输出重定向（覆盖）</li>
                <li><Text code>{" >> "}</Text>：标准输出重定向（追加）</li>
                <li><Text code>{" < "}</Text>：标准输入重定向</li>
                <li><Text code>{" 2> "}</Text>：标准错误重定向</li>
                <li><Text code>{" &> "}</Text>：标准输出和错误重定向</li>
              </ul>
            </Panel>
            <Panel header="解释Shell中的变量作用域" key="2">
              <Paragraph>
                Shell变量的作用域：
              </Paragraph>
              <ul>
                <li>局部变量：函数内部定义，只在函数内有效</li>
                <li>全局变量：脚本中定义，整个脚本有效</li>
                <li>环境变量：使用export导出，子进程可见</li>
                <li>特殊变量：系统预定义的特殊变量</li>
              </ul>
            </Panel>
            <Panel header="如何编写安全的Shell脚本？" key="3">
              <Paragraph>
                编写安全Shell脚本的建议：
              </Paragraph>
              <ul>
                <li>使用<Text code>set -e</Text>在出错时退出</li>
                <li>使用<Text code>set -u</Text>检查未定义变量</li>
                <li>使用<Text code>trap</Text>处理信号</li>
                <li>避免使用eval</li>
                <li>检查用户输入</li>
                <li>使用引号保护变量</li>
              </ul>
            </Panel>
          </Collapse>
        </div>
      </Card>
    ),
  },
];

export default function LinuxShellPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Title level={2}>Shell与脚本编程</Title>
      <Tabs defaultActiveKey="basic" items={tabItems} />
      <div className="flex justify-between mt-6">
        <Button size="large" href="/study/linux/process">
          上一章：进程与服务管理
        </Button>
        <Button type="primary" size="large" href="/study/linux/network">
          下一章：网络与安全
        </Button>
      </div>
    </div>
  );
} 
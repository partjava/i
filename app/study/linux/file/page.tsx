"use client";

import React from 'react';
import { Typography, Tabs, Card, Alert, Button, Space, Collapse } from 'antd';

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

// 1. 基础概念框架
const basicConcepts = [
  {
    title: "文件系统结构",
    content: (
      <div>
        <Paragraph>
          Linux 采用类 Unix 的目录树结构，所有内容都挂载在根目录 <Text code>/</Text> 下。
        </Paragraph>
        <Alert
          message="核心概念"
          description={
            <ul>
              <li>一切皆文件：设备、进程、网络等都以文件形式存在</li>
              <li>目录结构：/bin、/etc、/home、/usr、/var、/tmp、/root、/dev、/proc、/lib</li>
              <li>统一标准：不同发行版目录结构基本一致</li>
            </ul>
          }
          type="info"
          showIcon
        />
      </div>
    )
  },
  {
    title: "文件类型",
    content: (
      <div>
        <Paragraph>
          <b>常见文件类型：</b>
        </Paragraph>
        <ul>
          <li>普通文件 (-)：文本、二进制、数据文件等</li>
          <li>目录文件 (d)：包含其他文件的容器</li>
          <li>链接文件 (l)：硬链接和软链接</li>
          <li>设备文件 (c/b)：字符设备和块设备</li>
          <li>套接字文件 (s)：进程间通信</li>
          <li>管道文件 (p)：进程间通信</li>
        </ul>
      </div>
    )
  }
];

// 2. 命令操作框架
const commandOperations = [
  {
    title: "基础命令",
    commands: [
      { cmd: "ls", desc: "列出目录内容" },
      { cmd: "cd", desc: "切换目录" },
      { cmd: "pwd", desc: "显示当前目录" },
      { cmd: "mkdir", desc: "创建目录" },
      { cmd: "rmdir", desc: "删除空目录" },
      { cmd: "touch", desc: "创建文件" },
      { cmd: "cp", desc: "复制文件/目录" },
      { cmd: "mv", desc: "移动/重命名文件" },
      { cmd: "rm", desc: "删除文件" }
    ]
  },
  {
    title: "高级命令",
    commands: [
      { cmd: "find", desc: "查找文件" },
      { cmd: "grep", desc: "文本搜索" },
      { cmd: "awk", desc: "文本处理" },
      { cmd: "sed", desc: "流编辑器" },
      { cmd: "tar", desc: "归档工具" },
      { cmd: "chmod", desc: "修改权限" },
      { cmd: "chown", desc: "修改所有者" },
      { cmd: "ln", desc: "创建链接" }
    ]
  }
];

// 3. 实战案例框架
const practicalCases = [
  {
    title: "文件操作案例",
    cases: [
      {
        problem: "批量重命名文件",
        solution: "for f in *.txt; do mv \"$f\" \"new_$f\"; done",
        explanation: "使用for循环遍历所有.txt文件，使用mv命令重命名，注意使用引号处理文件名中的空格"
      },
      {
        problem: "查找并删除大文件",
        solution: "find /var -type f -size +100M -delete",
        explanation: "使用find命令查找/var目录下大于100M的文件并直接删除，-type f指定只查找文件，-size +100M指定大小，-delete直接删除"
      },
      {
        problem: "统计文件行数",
        solution: "find . -name \"*.txt\" | xargs wc -l",
        explanation: "先使用find查找所有txt文件，通过管道传给xargs，再使用wc -l统计行数"
      }
    ]
  },
  {
    title: "权限管理案例",
    cases: [
      {
        problem: "设置目录权限",
        solution: "chmod -R 755 directory",
        explanation: "-R表示递归修改，755表示所有者有rwx权限，组和其他用户有rx权限"
      },
      {
        problem: "修改文件所有者",
        solution: "chown user:group file",
        explanation: "将文件的所有者改为user，所属组改为group"
      },
      {
        problem: "设置特殊权限",
        solution: "chmod +s file  # 设置SUID",
        explanation: "SUID权限允许其他用户以文件所有者的身份执行该文件"
      }
    ]
  }
];

// 4. 常见问题框架
const commonIssues = [
  {
    title: "文件操作问题",
    issues: [
      {
        problem: "误删文件",
        solution: "定期备份，使用rm -i，考虑使用回收站"
      },
      {
        problem: "磁盘空间不足",
        solution: "使用df/du检查，清理日志和临时文件"
      },
      {
        problem: "文件权限问题",
        solution: "检查ls -l输出，使用chmod/chown修复"
      }
    ]
  },
  {
    title: "命令使用问题",
    issues: [
      {
        problem: "命令不熟悉",
        solution: "使用man命令查看手册，或--help参数"
      },
      {
        problem: "参数记不住",
        solution: "创建常用命令的别名或脚本"
      },
      {
        problem: "操作失误",
        solution: "使用-i参数，谨慎使用rm -rf"
      }
    ]
  }
];

// 整合所有内容到Tabs
const tabItems = [
  {
    key: 'basic',
    label: '基础概念',
    children: (
      <Card title="基础概念" className="mb-4">
        {basicConcepts.map((concept, index) => (
          <div key={index} className="mb-6">
            <Title level={4}>{concept.title}</Title>
            {concept.content}
          </div>
        ))}
      </Card>
    ),
  },
  {
    key: 'commands',
    label: '命令操作',
    children: (
      <Card title="命令操作" className="mb-4">
        <div className="mb-6">
          <Title level={4}>基础命令</Title>
          <pre className="bg-gray-100 rounded p-4 text-sm overflow-x-auto">{`
# 列出目录内容
ls -l

# 切换目录
cd /path/to/dir

# 显示当前目录
pwd

# 创建目录
mkdir newdir

# 删除空目录
rmdir olddir

# 创建新文件
touch file.txt

# 复制文件/目录
cp file.txt /tmp/
cp -r dir1 dir2

# 移动/重命名文件
mv old.txt new.txt

# 删除文件
rm file.txt
`}</pre>
        </div>
        <div className="mb-6">
          <Title level={4}>高级命令</Title>
          <pre className="bg-gray-100 rounded p-4 text-sm overflow-x-auto">{`
# 查找文件
find /home -name "*.txt"

# 文本搜索
grep 'pattern' file.txt

# 文本处理
awk '{print $1}' file.txt

# 流编辑器
sed 's/old/new/g' file.txt

# 归档与解压
tar -czvf archive.tar.gz dir/

# 修改权限
chmod 755 script.sh

# 修改所有者
chown user:group file.txt

# 创建软链接
ln -s /path/to/file linkname
`}</pre>
        </div>
      </Card>
    ),
  },
  {
    key: 'cases',
    label: '实战案例',
    children: (
      <Card title="实战案例" className="mb-4">
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
                        <b>命令：</b> <Text code>{caseItem.solution}</Text>
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
      </Card>
    ),
  },
  {
    key: 'issues',
    label: '常见问题',
    children: (
      <Card title="常见问题" className="mb-4">
        {commonIssues.map((section, index) => (
          <div key={index} className="mb-6">
            <Title level={4}>{section.title}</Title>
            {section.issues.map((issue, issueIndex) => (
              <div key={issueIndex} className="mb-4">
                <Alert
                  message={issue.problem}
                  description={issue.solution}
                  type="warning"
                  showIcon
                />
              </div>
            ))}
          </div>
        ))}
      </Card>
    ),
  },
];

export default function LinuxFilePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Title level={2}>文件与目录管理</Title>
      <Tabs defaultActiveKey="basic" items={tabItems} />
      <div className="flex justify-between mt-6">
        <Button size="large" href="/study/linux/intro">
          上一章：基础入门
        </Button>
        <Button type="primary" size="large" href="/study/linux/user">
          下一章：用户与权限管理
        </Button>
      </div>
    </div>
  );
} 
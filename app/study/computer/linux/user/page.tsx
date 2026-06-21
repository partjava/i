"use client";

import React from 'react';
import { Typography, Tabs, Card, Alert, Button, Space, Collapse } from 'antd';

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

// 实战案例数据
const practicalCases = [
  {
    title: "用户管理案例",
    cases: [
      {
        problem: "批量创建多个用户并设置相同权限",
        solution: "for user in user1 user2 user3; do useradd -m -s /bin/bash $user; echo \"$user:password\" | chpasswd; usermod -aG sudo $user; done",
        explanation: "使用for循环创建多个用户，-m创建家目录，-s设置shell，设置密码，并添加到sudo组"
      },
      {
        problem: "限制用户只能访问特定目录",
        solution: "chroot /path/to/jail user",
        explanation: "使用chroot将用户限制在特定目录，需要配合其他权限设置使用"
      },
      {
        problem: "实现用户只能执行特定命令",
        solution: "username ALL=(ALL) /usr/bin/apt, /usr/bin/dpkg",
        explanation: "在sudoers文件中配置，限制用户只能执行apt和dpkg命令"
      }
    ]
  },
  {
    title: "权限管理案例",
    cases: [
      {
        problem: "设置目录权限，让组内用户可读写，其他用户只读",
        solution: "chmod -R 775 directory && chown -R :groupname directory",
        explanation: "775表示所有者有rwx，组有rwx，其他用户有rx权限，并设置目录所属组"
      },
      {
        problem: "设置SUID权限，让普通用户执行需要root权限的命令",
        solution: "chmod u+s /usr/bin/command",
        explanation: "SUID权限允许其他用户以文件所有者的身份执行该命令"
      },
      {
        problem: "设置粘滞位，防止用户删除其他用户的文件",
        solution: "chmod +t directory",
        explanation: "粘滞位确保只有文件所有者、目录所有者或root才能删除文件"
      }
    ]
  }
];

const tabItems = [
  {
    key: 'user',
    label: '用户管理基础',
    children: (
      <Card title="用户管理基础" className="mb-4">
        <Paragraph>
          <b>用户类型：</b>
          <ul>
            <li>root用户：超级管理员，UID为0</li>
            <li>系统用户：系统服务使用，UID 1-999</li>
            <li>普通用户：日常使用，UID 1000+</li>
          </ul>
        </Paragraph>
        <Paragraph>
          <b>用户配置文件：</b>
          <ul>
            <li>/etc/passwd：用户基本信息</li>
            <li>/etc/shadow：用户密码信息</li>
            <li>/etc/group：用户组信息</li>
          </ul>
        </Paragraph>
        <Alert
          message="要点"
          description={
            <ul>
              <li>用户信息以冒号分隔，如：username:x:1000:1000:User Name:/home/username:/bin/bash</li>
              <li>shadow文件只有root可读，增强安全性</li>
              <li>建议日常使用普通用户，需要root权限时使用sudo</li>
            </ul>
          }
          type="info"
          showIcon
        />
      </Card>
    ),
  },
  {
    key: 'cmd',
    label: '用户管理命令',
    children: (
      <Card title="用户管理命令" className="mb-4">
        <Paragraph>
          <b>常用命令：</b>
          <pre className="bg-gray-100 rounded p-4 text-sm overflow-x-auto">{
`# 创建用户
sudo useradd -m -s /bin/bash username

# 设置密码
sudo passwd username

# 修改用户（添加到sudo组）
sudo usermod -aG sudo username

# 删除用户及家目录
sudo userdel -r username

# 查看用户信息
id username

# 查看当前用户
whoami

# 切换用户
su - username

# 以root权限执行命令
sudo command
`}</pre>
        </Paragraph>
        <Alert
          message="实操要点"
          description={
            <ul>
              <li>创建用户：<Text code>useradd -m -s /bin/bash username</Text></li>
              <li>设置密码：<Text code>passwd username</Text></li>
              <li>修改用户：<Text code>usermod -aG sudo username</Text></li>
              <li>删除用户：<Text code>userdel -r username</Text></li>
            </ul>
          }
          type="info"
          showIcon
        />
      </Card>
    ),
  },
  {
    key: 'group',
    label: '用户组管理',
    children: (
      <Card title="用户组管理" className="mb-4">
        <Paragraph>
          <b>用户组类型：</b>
          <ul>
            <li>主组：用户创建时自动创建，与用户名相同</li>
            <li>附加组：用户可加入多个附加组</li>
            <li>系统组：系统服务使用</li>
          </ul>
        </Paragraph>
        <Paragraph>
          <b>常用命令：</b>
          <pre className="bg-gray-100 rounded p-4 text-sm overflow-x-auto">{
`# 创建组
sudo groupadd groupname

# 修改组名
sudo groupmod -n newgroup oldgroup

# 删除组
sudo groupdel groupname

# 添加用户到组
sudo usermod -aG groupname username

# 查看用户所属组
groups username

# 管理组成员
gpasswd -a username groupname
`}</pre>
        </Paragraph>
        <Alert
          message="实操要点"
          description={
            <ul>
              <li>创建组：<Text code>groupadd groupname</Text></li>
              <li>添加用户到组：<Text code>usermod -aG groupname username</Text></li>
              <li>查看用户组：<Text code>groups username</Text></li>
            </ul>
          }
          type="info"
          showIcon
        />
      </Card>
    ),
  },
  {
    key: 'perm',
    label: '文件权限管理',
    children: (
      <Card title="文件权限管理" className="mb-4">
        <Paragraph>
          <b>常用权限命令：</b>
          <pre className="bg-gray-100 rounded p-4 text-sm overflow-x-auto">{
`# 修改权限（数字法）
sudo chmod 755 file

# 修改权限（符号法）
sudo chmod u+x,g-w,o=rx file

# 修改所有者
sudo chown user:group file

# 递归修改目录权限
sudo chmod -R 755 dir

# 设置SUID权限
sudo chmod u+s file

# 设置粘滞位
sudo chmod +t directory
`}</pre>
        </Paragraph>
        <Alert
          message="实操要点"
          description={
            <ul>
              <li>修改权限：<Text code>chmod 755 file</Text> 或 <Text code>chmod u+x,g-w,o=rx file</Text></li>
              <li>修改所有者：<Text code>chown user:group file</Text></li>
              <li>递归修改：<Text code>chmod -R 755 dir</Text></li>
            </ul>
          }
          type="info"
          showIcon
        />
      </Card>
    ),
  },
  {
    key: 'sudo',
    label: 'sudo权限管理',
    children: (
      <Card title="sudo权限管理" className="mb-4">
        <Paragraph>
          <b>sudo配置：</b> /etc/sudoers 文件
        </Paragraph>
        <Paragraph>
          <b>常用配置：</b>
          <ul>
            <li>允许用户执行所有命令：<Text code>username ALL=(ALL) ALL</Text></li>
            <li>允许组执行所有命令：<Text code>%groupname ALL=(ALL) ALL</Text></li>
            <li>允许执行特定命令：<Text code>username ALL=(ALL) /usr/bin/apt</Text></li>
          </ul>
        </Paragraph>
        <Alert
          message="安全建议"
          description={
            <ul>
              <li>使用visudo编辑sudoers文件，避免语法错误</li>
              <li>限制sudo权限范围，避免滥用</li>
              <li>定期审计sudo使用记录</li>
            </ul>
          }
          type="warning"
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
        <div className="mt-6">
          <Title level={4}>面试高频题</Title>
          <Collapse>
            <Panel header="解释Linux用户权限模型" key="1">
              <Paragraph>
                Linux用户权限模型基于以下核心概念：
              </Paragraph>
              <ul>
                <li>用户和组：每个用户属于一个主组和多个附加组</li>
                <li>文件权限：rwx（读/写/执行）权限分别对应所有者、组和其他用户</li>
                <li>特殊权限：SUID、SGID、粘滞位等特殊权限位</li>
                <li>权限继承：目录权限影响其下文件的默认权限</li>
              </ul>
            </Panel>
            <Panel header="如何实现最小权限原则？" key="2">
              <Paragraph>
                实现最小权限原则的方法：
              </Paragraph>
              <ul>
                <li>使用普通用户而非root进行日常操作</li>
                <li>合理设置文件和目录权限</li>
                <li>使用sudo限制特定命令的执行</li>
                <li>定期审计用户权限</li>
                <li>及时撤销不再需要的权限</li>
              </ul>
            </Panel>
            <Panel header="如何排查权限相关的问题？" key="3">
              <Paragraph>
                权限问题排查步骤：
              </Paragraph>
              <ul>
                <li>使用ls -l查看文件和目录权限</li>
                <li>检查用户所属组（groups命令）</li>
                <li>查看sudo权限（sudo -l）</li>
                <li>检查特殊权限位</li>
                <li>查看系统日志（/var/log/auth.log）</li>
              </ul>
            </Panel>
          </Collapse>
        </div>
      </Card>
    ),
  },
];

export default function LinuxUserPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Title level={2}>用户与权限管理</Title>
      <Tabs defaultActiveKey="user" items={tabItems} />
      <div className="flex justify-between mt-6">
        <Button size="large" href="/study/linux/file">
          上一章：文件与目录管理
        </Button>
        <Button type="primary" size="large" href="/study/linux/package">
          下一章：软件与包管理
        </Button>
      </div>
    </div>
  );
} 
"use client";

import React from 'react';
import { Typography, Tabs, Card, Alert, Button } from 'antd';

const { Title, Paragraph, Text } = Typography;

const tabItems = [
  {
    key: 'history',
    label: 'Linux简介与发展历史',
    children: (
      <Card title="Linux简介与发展历史" className="mb-4">
        <Paragraph>
          <Text strong>Linux</Text> 是一种自由和开放源代码的类UNIX操作系统，最初由Linus Torvalds于1991年开发。它以高稳定性、高安全性、强大网络功能著称，广泛应用于服务器、嵌入式、云计算等领域。
        </Paragraph>
        <Alert
          message="要点"
          description={
            <ul>
              <li>Linux 完全开源，任何人都可以自由使用、修改和分发。</li>
              <li>多用户、多任务、支持多种硬件平台。</li>
              <li>拥有庞大的开源社区和丰富的软件生态。</li>
            </ul>
          }
          type="info"
          showIcon
        />
        <Paragraph>
          <b>发展大事记：</b>
          <ul>
            <li>1991年：Linus Torvalds 发布第一个 Linux 内核版本。</li>
            <li>1992年：Linux 内核采用 GPL 协议，成为自由软件。</li>
            <li>1993年：Debian、Slackware 等早期发行版诞生。</li>
            <li>2000年后：企业级应用兴起，RedHat、SUSE 等商业发行版流行。</li>
            <li>2010年后：云计算、物联网、移动设备等新领域广泛采用 Linux。</li>
          </ul>
        </Paragraph>
      </Card>
    ),
  },
  {
    key: 'distro',
    label: '常见发行版对比与选择',
    children: (
      <Card title="常见发行版对比与选择" className="mb-4">
        <Paragraph>
          Linux有众多发行版，适合不同场景。常见有：
        </Paragraph>
        <ul>
          <li><b>Ubuntu：</b>社区活跃，资料丰富，适合新手和开发者。</li>
          <li><b>CentOS/AlmaLinux：</b>企业级服务器常用，稳定性高。</li>
          <li><b>Debian：</b>极致稳定，适合服务器和嵌入式。</li>
          <li><b>Deepin：</b>国产桌面版，界面友好。</li>
          <li><b>Arch：</b>极简DIY，适合进阶用户。</li>
        </ul>
        <Alert
          message="选择建议"
          description={
            <ul>
              <li>新手推荐 Ubuntu 或 Deepin。</li>
              <li>服务器推荐 CentOS/AlmaLinux 或 Debian。</li>
              <li>喜欢折腾可选 Arch。</li>
            </ul>
          }
          type="info"
          showIcon
        />
      </Card>
    ),
  },
  {
    key: 'env',
    label: '环境准备与安装',
    children: (
      <Card title="环境准备与安装" className="mb-4">
        <Paragraph>
          <b>常见学习环境：</b>
          <ul>
            <li>虚拟机（VirtualBox/VMware）：适合本地实验，安全不影响主系统。</li>
            <li>云服务器（阿里云、腾讯云、AWS等）：适合远程开发和部署。</li>
            <li>WSL（Windows子系统）：适合Windows用户快速体验Linux。</li>
            <li>实体机安装：适合有硬件资源和动手能力的同学。</li>
          </ul>
        </Paragraph>
        <Alert
          message="安装建议"
          description={
            <ul>
              <li>建议新手用虚拟机或WSL，方便重装和快照。</li>
              <li>下载官方ISO镜像，按发行版官网教程安装。</li>
              <li>多用命令行，少依赖图形界面。</li>
            </ul>
          }
          type="info"
          showIcon
        />
      </Card>
    ),
  },
  {
    key: 'login',
    label: '系统启动与登录',
    children: (
      <Card title="系统启动与登录" className="mb-4">
        <Paragraph>
          <b>启动流程：</b> 加电 → BIOS/UEFI → 引导加载器（GRUB） → 内核加载 → 系统初始化（systemd） → 登录界面
        </Paragraph>
        <Paragraph>
          <b>登录方式：</b>
          <ul>
            <li>本地登录：用户名+密码</li>
            <li>远程登录：SSH（推荐用Xshell、MobaXterm、Windows Terminal等工具）</li>
          </ul>
        </Paragraph>
        <Paragraph>
          <b>常用登录命令示例：</b>
          <pre>{`
# 本地登录（虚拟机/实体机）
# 输入用户名和密码即可

# 远程SSH登录
ssh user@192.168.1.100

# 切换用户
su - username

# 退出登录
exit
`}</pre>
        </Paragraph>
        <Alert
          message="要点"
          description={
            <ul>
              <li>root为超级用户，普通用户权限受限，建议日常用普通用户。</li>
              <li>远程登录需先启动SSH服务。</li>
            </ul>
          }
          type="info"
          showIcon
        />
      </Card>
    ),
  },
  {
    key: 'cli',
    label: '图形界面与命令行基础',
    children: (
      <Card title="图形界面与命令行基础" className="mb-4">
        <Paragraph>
          <b>图形界面：</b> GNOME、KDE、Xfce等，适合桌面体验。
        </Paragraph>
        <Paragraph>
          <b>命令行：</b> Shell（bash/zsh等），是Linux学习和运维的核心。
        </Paragraph>
        <Paragraph>
          <b>常用快捷键：</b>
          <ul>
            <li><b>Tab</b>：命令/文件名自动补全</li>
            <li><b>Ctrl+C</b>：中断当前命令</li>
            <li><b>Ctrl+L</b>：清屏</li>
            <li><b>Ctrl+R</b>：历史命令搜索</li>
          </ul>
        </Paragraph>
        <Paragraph>
          <b>常用命令行操作示例：</b>
          <pre>{`
# 查看当前路径
pwd

# 列出当前目录文件
ls -l

# 切换目录
cd /home/user

# 清屏
clear
`}</pre>
        </Paragraph>
        <Alert
          message="学习建议"
          description={
            <ul>
              <li>多用命令行，熟悉常用快捷键。</li>
              <li>遇到问题多查官方文档和社区。</li>
            </ul>
          }
          type="info"
          showIcon
        />
      </Card>
    ),
  },
  {
    key: 'tips',
    label: '新手学习建议与常见问题',
    children: (
      <Card title="新手学习建议与常见问题" className="mb-4">
        <Paragraph>
          <b>学习建议：</b>
          <ul>
            <li>边学边练，遇到问题多查资料。</li>
            <li>多用命令行，少依赖图形界面。</li>
            <li>养成写学习笔记和总结的习惯。</li>
            <li>多做实操题和小项目。</li>
          </ul>
        </Paragraph>
        <Paragraph>
          <b>常见问题与命令：</b>
          <pre>{`
# 查看命令帮助
man ls
ls --help

# 查看最近登录用户
last

# 查看系统信息
uname -a

# 重启系统
sudo reboot
`}</pre>
        </Paragraph>
        <Paragraph>
          <b>常见问题：</b>
          <ul>
            <li>命令输错怎么办？——用<code>man 命令名</code>查帮助，或<code>--help</code>参数。</li>
            <li>系统卡死/黑屏？——重启虚拟机，查日志排查原因。</li>
            <li>忘记root密码？——可用单用户模式重置。</li>
          </ul>
        </Paragraph>
      </Card>
    ),
  },
];

export default function LinuxIntroPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Title level={2}>基础入门</Title>
      <Tabs defaultActiveKey="history" items={tabItems} />
      <div className="flex justify-end mt-6">
        <Button type="primary" size="large" href="/study/linux/file">
          下一章：文件与目录管理
        </Button>
      </div>
    </div>
  );
} 
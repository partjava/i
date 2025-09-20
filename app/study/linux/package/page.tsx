"use client";

import React from 'react';
import { Typography, Tabs, Card, Alert, Button, Space, Collapse } from 'antd';

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

// 实战案例数据
const practicalCases = [
  {
    title: "包管理案例",
    cases: [
      {
        problem: "批量安装多个软件包",
        solution: "apt-get install package1 package2 package3",
        explanation: "使用apt-get install命令可以一次性安装多个软件包，系统会自动解决依赖关系"
      },
      {
        problem: "查找特定软件包",
        solution: "apt-cache search keyword",
        explanation: "使用apt-cache search命令可以根据关键词搜索软件包，支持模糊匹配"
      },
      {
        problem: "清理不需要的包",
        solution: "apt-get autoremove && apt-get clean",
        explanation: "autoremove删除自动安装的依赖包，clean清理下载的包缓存"
      }
    ]
  },
  {
    title: "软件编译安装案例",
    cases: [
      {
        problem: "从源码编译安装软件",
        solution: "./configure && make && make install",
        explanation: "标准的源码编译安装步骤：配置、编译、安装"
      },
      {
        problem: "指定安装路径",
        solution: "./configure --prefix=/usr/local/software",
        explanation: "使用--prefix参数指定软件安装路径"
      },
      {
        problem: "卸载源码安装的软件",
        solution: "make uninstall",
        explanation: "如果软件支持，可以使用make uninstall卸载，否则需要手动删除文件"
      }
    ]
  }
];

const tabItems = [
  {
    key: 'basic',
    label: '包管理基础',
    children: (
      <Card title="包管理基础" className="mb-4">
        <Paragraph>
          <b>包管理系统：</b>
          <ul>
            <li>Debian/Ubuntu：APT (Advanced Package Tool)</li>
            <li>RedHat/CentOS：RPM (Red Hat Package Manager)</li>
            <li>Arch Linux：Pacman</li>
            <li>通用：Snap、Flatpak</li>
          </ul>
        </Paragraph>
        <Paragraph>
          <b>软件包类型：</b>
          <ul>
            <li>二进制包：预编译好的程序</li>
            <li>源码包：需要编译安装</li>
            <li>依赖包：程序运行所需的库和工具</li>
          </ul>
        </Paragraph>
        <Alert
          message="要点"
          description={
            <ul>
              <li>使用包管理器可以自动解决依赖关系</li>
              <li>建议优先使用系统包管理器安装软件</li>
              <li>定期更新软件包以获取安全补丁</li>
            </ul>
          }
          type="info"
          showIcon
        />
      </Card>
    ),
  },
  {
    key: 'apt',
    label: 'APT包管理',
    children: (
      <Card title="APT包管理" className="mb-4">
        <Paragraph>
          <b>常用命令：</b>
          <pre className="bg-gray-100 rounded p-4 text-sm overflow-x-auto">{
`# 更新软件包列表
sudo apt update

# 升级所有软件包
sudo apt upgrade

# 安装软件包
sudo apt install package

# 卸载软件包
sudo apt remove package

# 搜索软件包
apt search keyword

# 显示软件包信息
apt show package

# 列出所有软件包
apt list --installed
`}</pre>
        </Paragraph>
        <Alert
          message="实操要点"
          description={
            <ul>
              <li>安装前先更新：<Text code>apt update && apt upgrade</Text></li>
              <li>查看软件信息：<Text code>apt show package</Text></li>
              <li>清理缓存：<Text code>apt clean</Text></li>
            </ul>
          }
          type="info"
          showIcon
        />
      </Card>
    ),
  },
  {
    key: 'rpm',
    label: 'RPM包管理',
    children: (
      <Card title="RPM包管理" className="mb-4">
        <Paragraph>
          <b>常用命令：</b>
          <pre className="bg-gray-100 rounded p-4 text-sm overflow-x-auto">{
`# 安装软件包
sudo rpm -ivh package.rpm

# 卸载软件包
sudo rpm -e package

# 查询软件包
rpm -qa | grep package

# 查看包信息
rpm -qi package

# 验证软件包
rpm -V package

# 使用yum安装（自动解决依赖）
sudo yum install package

# 使用yum卸载
sudo yum remove package

# 使用yum更新
sudo yum update
`}</pre>
        </Paragraph>
        <Alert
          message="实操要点"
          description={
            <ul>
              <li>安装本地包：<Text code>rpm -ivh package.rpm</Text></li>
              <li>查询已安装包：<Text code>rpm -qa | grep package</Text></li>
              <li>查看包信息：<Text code>rpm -qi package</Text></li>
            </ul>
          }
          type="info"
          showIcon
        />
      </Card>
    ),
  },
  {
    key: 'source',
    label: '源码安装',
    children: (
      <Card title="源码安装" className="mb-4">
        <Paragraph>
          <b>常用命令：</b>
          <pre className="bg-gray-100 rounded p-4 text-sm overflow-x-auto">{
`# 下载源码包
wget http://example.com/software.tar.gz

# 解压源码包
tar -xzvf software.tar.gz

# 进入源码目录
cd software

# 配置编译选项
./configure --prefix=/usr/local/software

# 编译源码
make

# 安装软件
sudo make install

# 清理编译文件
make clean
`}</pre>
        </Paragraph>
        <Alert
          message="注意事项"
          description={
            <ul>
              <li>确保安装必要的编译工具和依赖库</li>
              <li>注意查看README和INSTALL文件</li>
              <li>建议使用--prefix指定安装路径</li>
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
            <Panel header="解释APT和RPM的区别" key="1">
              <Paragraph>
                APT和RPM的主要区别：
              </Paragraph>
              <ul>
                <li>APT是Debian/Ubuntu的包管理系统，RPM是RedHat/CentOS的包管理系统</li>
                <li>APT自动解决依赖关系，RPM需要手动处理依赖</li>
                <li>APT使用.deb包格式，RPM使用.rpm包格式</li>
                <li>APT的配置文件在/etc/apt/，RPM的配置文件在/etc/yum.repos.d/</li>
              </ul>
            </Panel>
            <Panel header="如何处理软件包依赖问题？" key="2">
              <Paragraph>
                处理依赖问题的方法：
              </Paragraph>
              <ul>
                <li>使用包管理器自动解决（apt/yum）</li>
                <li>手动安装依赖包</li>
                <li>使用--nodeps参数（不推荐）</li>
                <li>使用容器或虚拟环境隔离依赖</li>
              </ul>
            </Panel>
            <Panel header="如何排查软件安装问题？" key="3">
              <Paragraph>
                排查安装问题的步骤：
              </Paragraph>
              <ul>
                <li>查看错误信息</li>
                <li>检查依赖关系</li>
                <li>查看日志文件</li>
                <li>检查系统环境</li>
                <li>尝试手动安装依赖</li>
              </ul>
            </Panel>
          </Collapse>
        </div>
      </Card>
    ),
  },
];

export default function LinuxPackagePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Title level={2}>软件与包管理</Title>
      <Tabs defaultActiveKey="basic" items={tabItems} />
      <div className="flex justify-between mt-6">
        <Button size="large" href="/study/linux/user">
          上一章：用户与权限管理
        </Button>
        <Button type="primary" size="large" href="/study/linux/process">
          下一章：进程与服务管理
        </Button>
      </div>
    </div>
  );
} 
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
  chapterTitle: '用户与权限管理',
  chapterNumber: 3,
  totalChapters: 9,
  subjectHref: '/study/computer/linux',
  prevChapter: { label: '文件与目录管理', href: '/study/computer/linux/file' },
  nextChapter: { label: '软件与包管理', href: '/study/computer/linux/package' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '用户管理基础',
    left: (
      <div className="space-y-4">
        <PageTitle>用户管理基础</PageTitle>
        <BookParagraph>
          <strong>用户类型：</strong>
        </BookParagraph>
        <BookList items={[
          'root用户：超级管理员，UID为0',
          '系统用户：系统服务使用，UID 1-999',
          '普通用户：日常使用，UID 1000+',
        ]} />
        <BookParagraph>
          <strong>用户配置文件：</strong>
        </BookParagraph>
        <BookList items={[
          '/etc/passwd：用户基本信息',
          '/etc/shadow：用户密码信息',
          '/etc/group：用户组信息',
        ]} />
        <BookAlert type="info" message="用户信息以冒号分隔，如：username:x:1000:1000:User Name:/home/username:/bin/bash，shadow文件只有root可读，增强安全性，建议日常使用普通用户，需要root权限时使用sudo" />
        <SectionTitle>用户管理命令</SectionTitle>
        <BookCode language="bash" code={`# 创建用户
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
sudo command`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>用户组管理</PageTitle>
        <BookParagraph>
          <strong>用户组类型：</strong>
        </BookParagraph>
        <BookList items={[
          '主组：用户创建时自动创建，与用户名相同',
          '附加组：用户可加入多个附加组',
          '系统组：系统服务使用',
        ]} />
        <SectionTitle>常用命令</SectionTitle>
        <BookCode language="bash" code={`# 创建组
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
gpasswd -a username groupname`} />
        <BookAlert type="info" message="创建组：groupadd groupname，添加用户到组：usermod -aG groupname username，查看用户组：groups username" />
        <TagGrid items={['useradd', 'usermod', 'userdel', 'passwd', 'groupadd', 'gpasswd']} />
      </div>
    ),
  },
  {
    label: '文件权限管理',
    left: (
      <div className="space-y-4">
        <PageTitle>文件权限管理</PageTitle>
        <BookParagraph>
          <strong>常用权限命令：</strong>
        </BookParagraph>
        <BookCode language="bash" code={`# 修改权限（数字法）
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
sudo chmod +t directory`} />
        <BookAlert type="info" message="修改权限：chmod 755 file 或 chmod u+x,g-w,o=rx file，修改所有者：chown user:group file，递归修改：chmod -R 755 dir" />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>sudo权限管理</PageTitle>
        <BookParagraph>
          <strong>sudo配置：</strong> /etc/sudoers 文件
        </BookParagraph>
        <BookParagraph>
          <strong>常用配置：</strong>
        </BookParagraph>
        <BookList items={[
          '允许用户执行所有命令：username ALL=(ALL) ALL',
          '允许组执行所有命令：%groupname ALL=(ALL) ALL',
          '允许执行特定命令：username ALL=(ALL) /usr/bin/apt',
        ]} />
        <BookAlert type="warning" message="使用visudo编辑sudoers文件，避免语法错误，限制sudo权限范围，避免滥用，定期审计sudo使用记录" />
        <TagGrid items={['chmod', 'chown', 'SUID', 'SGID', '粘滞位', 'sudo']} />
      </div>
    ),
  },
  {
    label: '实战案例',
    left: (
      <div className="space-y-4">
        <PageTitle>用户管理案例</PageTitle>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">批量创建多个用户并设置相同权限</p>
          <p className="text-sm mb-2">使用for循环创建多个用户，设置密码并添加到sudo组。</p>
          <BookCode language="bash" code={`for user in user1 user2 user3; do
  useradd -m -s /bin/bash $user
  echo "$user:password" | chpasswd
  usermod -aG sudo $user
done`} />
          <p className="text-xs mt-1" style={{ color: '#666' }}>-m创建家目录，-s设置shell，chpasswd设置密码，usermod添加到sudo组</p>
        </div>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">限制用户只能访问特定目录</p>
          <BookCode language="bash" code={`chroot /path/to/jail user`} />
          <p className="text-xs" style={{ color: '#666' }}>使用chroot将用户限制在特定目录，需要配合其他权限设置使用</p>
        </div>
        <div className="rounded-lg p-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">限制用户只能执行特定命令</p>
          <BookCode language="bash" code={`username ALL=(ALL) /usr/bin/apt, /usr/bin/dpkg`} />
          <p className="text-xs" style={{ color: '#666' }}>在sudoers文件中配置，限制用户只能执行apt和dpkg命令</p>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>权限管理案例</PageTitle>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">设置目录权限，组用户可读写，其他用户只读</p>
          <BookCode language="bash" code={`chmod -R 775 directory && chown -R :groupname directory`} />
          <p className="text-xs" style={{ color: '#666' }}>775：所有者rwx，组rwx，其他rx。同时设置目录所属组</p>
        </div>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">设置SUID权限，让普通用户执行需要root权限的命令</p>
          <BookCode language="bash" code={`chmod u+s /usr/bin/command`} />
          <p className="text-xs" style={{ color: '#666' }}>SUID允许其他用户以文件所有者的身份执行该命令</p>
        </div>
        <div className="rounded-lg p-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">设置粘滞位，防止用户删除其他用户的文件</p>
          <BookCode language="bash" code={`chmod +t directory`} />
          <p className="text-xs" style={{ color: '#666' }}>粘滞位确保只有文件所有者、目录所有者或root才能删除文件</p>
        </div>
        <TagGrid items={['批量创建', 'chroot', 'SUID', '粘滞位', 'sudoers', '权限']} />
      </div>
    ),
  },
  {
    label: '面试高频题',
    left: (
      <div className="space-y-4">
        <PageTitle>面试高频题</PageTitle>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">解释Linux用户权限模型</p>
          <BookList items={[
            '用户和组：每个用户属于一个主组和多个附加组',
            '文件权限：rwx（读/写/执行）分别对应所有者、组和其他用户',
            '特殊权限：SUID、SGID、粘滞位等特殊权限位',
            '权限继承：目录权限影响其下文件的默认权限（umask）',
          ]} />
        </div>
        <div className="rounded-lg p-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">如何实现最小权限原则？</p>
          <BookList items={[
            '使用普通用户而非root进行日常操作',
            '合理设置文件和目录权限',
            '使用sudo限制特定命令的执行',
            '定期审计用户权限',
            '及时撤销不再需要的权限',
          ]} />
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>权限排查与面试题</PageTitle>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">如何排查权限相关的问题？</p>
          <BookList items={[
            '使用ls -l查看文件和目录权限',
            '检查用户所属组（groups命令）',
            '查看sudo权限（sudo -l）',
            '检查特殊权限位',
            '查看系统日志（/var/log/auth.log）',
          ]} />
        </div>
        <BookParagraph>
          Linux的权限模型是面试高频考点，重点理解用户/组/权限三元组以及特殊权限的作用。
        </BookParagraph>
        <BookAlert type="info" message="最小权限原则是安全设计的核心理念，应始终只授予完成任务所需的最小权限集合。" />
        <TagGrid items={['面试题', '权限模型', '最小权限', 'SUID', '粘滞位', '排查']} />
      </div>
    ),
  },
]

export default function LinuxUserPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

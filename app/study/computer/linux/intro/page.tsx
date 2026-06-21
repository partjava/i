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
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'Linux系统',
  chapterTitle: '基础入门',
  chapterNumber: 1,
  totalChapters: 9,
  subjectHref: '/study/computer/linux',
  nextChapter: { label: '文件与目录管理', href: '/study/computer/linux/file' },
  theme: THEMES.computer,
}

const SPREADS = [
  // ===== 跨页 1: Linux简介与发行版 =====
  {
    label: 'Linux简介与发展历史',
    left: (
      <div className="space-y-4">
        <PageTitle>Linux简介与发展历史</PageTitle>
        <BookParagraph>
          <strong>Linux</strong> 是一种自由和开放源代码的类UNIX操作系统，最初由Linus Torvalds于1991年开发。它以高稳定性、高安全性、强大网络功能著称，广泛应用于服务器、嵌入式、云计算等领域。
        </BookParagraph>
        <BookAlert type="info" message="要点">
          <BookList items={[
            'Linux 完全开源，任何人都可以自由使用、修改和分发。',
            '多用户、多任务、支持多种硬件平台。',
            '拥有庞大的开源社区和丰富的软件生态。',
          ]} />
        </BookAlert>
        <div>
          <h3 className="text-sm font-medium text-ink mt-4 mb-2">发展大事记</h3>
          <BookList items={[
            '1991年：Linus Torvalds 发布第一个 Linux 内核版本。',
            '1992年：Linux 内核采用 GPL 协议，成为自由软件。',
            '1993年：Debian、Slackware 等早期发行版诞生。',
            '2000年后：企业级应用兴起，RedHat、SUSE 等商业发行版流行。',
            '2010年后：云计算、物联网、移动设备等新领域广泛采用 Linux。',
          ]} />
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>常见发行版对比与选择</PageTitle>
        <BookParagraph>
          Linux有众多发行版，适合不同场景。常见有：
        </BookParagraph>
        <BookList items={[
          'Ubuntu：社区活跃，资料丰富，适合新手和开发者。',
          'CentOS/AlmaLinux：企业级服务器常用，稳定性高。',
          'Debian：极致稳定，适合服务器和嵌入式。',
          'Deepin：国产桌面版，界面友好。',
          'Arch：极简DIY，适合进阶用户。',
        ]} />
        <BookAlert type="info" message="选择建议">
          <BookList items={[
            '新手推荐 Ubuntu 或 Deepin。',
            '服务器推荐 CentOS/AlmaLinux 或 Debian。',
            '喜欢折腾可选 Arch。',
          ]} />
        </BookAlert>
      </div>
    ),
  },

  // ===== 跨页 2: 环境准备与登录 =====
  {
    label: '环境准备与系统登录',
    left: (
      <div className="space-y-4">
        <PageTitle>环境准备与安装</PageTitle>
        <BookParagraph>
          <b>常见学习环境：</b>
        </BookParagraph>
        <BookList items={[
          '虚拟机（VirtualBox/VMware）：适合本地实验，安全不影响主系统。',
          '云服务器（阿里云、腾讯云、AWS等）：适合远程开发和部署。',
          'WSL（Windows子系统）：适合Windows用户快速体验Linux。',
          '实体机安装：适合有硬件资源和动手能力的同学。',
        ]} />
        <BookAlert type="info" message="安装建议">
          <BookList items={[
            '建议新手用虚拟机或WSL，方便重装和快照。',
            '下载官方ISO镜像，按发行版官网教程安装。',
            '多用命令行，少依赖图形界面。',
          ]} />
        </BookAlert>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>系统启动与登录</PageTitle>
        <BookParagraph>
          <b>启动流程：</b> 加电 → BIOS/UEFI → 引导加载器（GRUB） → 内核加载 → 系统初始化（systemd） → 登录界面
        </BookParagraph>
        <BookParagraph>
          <b>登录方式：</b>
        </BookParagraph>
        <BookList items={[
          '本地登录：用户名+密码',
          '远程登录：SSH（推荐用Xshell、MobaXterm、Windows Terminal等工具）',
        ]} />
        <BookParagraph>
          <b>常用登录命令示例：</b>
        </BookParagraph>
        <BookCode
          language="bash"
          code={`# 本地登录（虚拟机/实体机）
# 输入用户名和密码即可

# 远程SSH登录
ssh user@192.168.1.100

# 切换用户
su - username

# 退出登录
exit`}
        />
        <BookAlert type="info" message="要点">
          <BookList items={[
            'root为超级用户，普通用户权限受限，建议日常用普通用户。',
            '远程登录需先启动SSH服务。',
          ]} />
        </BookAlert>
      </div>
    ),
  },

  // ===== 跨页 3: 命令行与学习建议 =====
  {
    label: '命令行与学习建议',
    left: (
      <div className="space-y-4">
        <PageTitle>图形界面与命令行基础</PageTitle>
        <BookParagraph>
          <b>图形界面：</b> GNOME、KDE、Xfce等，适合桌面体验。
        </BookParagraph>
        <BookParagraph>
          <b>命令行：</b> Shell（bash/zsh等），是Linux学习和运维的核心。
        </BookParagraph>
        <div>
          <h3 className="text-sm font-medium text-ink mt-4 mb-2">常用快捷键</h3>
          <BookList items={[
            'Tab：命令/文件名自动补全',
            'Ctrl+C：中断当前命令',
            'Ctrl+L：清屏',
            'Ctrl+R：历史命令搜索',
          ]} />
        </div>
        <div>
          <h3 className="text-sm font-medium text-ink mt-4 mb-2">常用命令行操作示例</h3>
          <BookCode
            language="bash"
            code={`# 查看当前路径
pwd

# 列出当前目录文件
ls -l

# 切换目录
cd /home/user

# 清屏
clear`}
          />
        </div>
        <BookAlert type="info" message="学习建议">
          <BookList items={[
            '多用命令行，熟悉常用快捷键。',
            '遇到问题多查官方文档和社区。',
          ]} />
        </BookAlert>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>新手学习建议与常见问题</PageTitle>
        <div>
          <h3 className="text-sm font-medium text-ink mt-4 mb-2">学习建议</h3>
          <BookList items={[
            '边学边练，遇到问题多查资料。',
            '多用命令行，少依赖图形界面。',
            '养成写学习笔记和总结的习惯。',
            '多做实操题和小项目。',
          ]} />
        </div>
        <div>
          <h3 className="text-sm font-medium text-ink mt-4 mb-2">常见问题与命令</h3>
          <BookCode
            language="bash"
            code={`# 查看命令帮助
man ls
ls --help

# 查看最近登录用户
last

# 查看系统信息
uname -a

# 重启系统
sudo reboot`}
          />
        </div>
        <div>
          <h3 className="text-sm font-medium text-ink mt-4 mb-2">常见问题</h3>
          <BookList items={[
            '命令输错怎么办？——用 man 命令名 查帮助，或 --help 参数。',
            '系统卡死/黑屏？——重启虚拟机，查日志排查原因。',
            '忘记root密码？——可用单用户模式重置。',
          ]} />
        </div>
      </div>
    ),
  },
]

export default function LinuxIntroPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

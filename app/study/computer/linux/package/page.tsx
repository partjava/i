'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
  TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'Linux系统',
  chapterTitle: '软件与包管理',
  chapterNumber: 4,
  totalChapters: 9,
  subjectHref: '/study/computer/linux',
  prevChapter: { label: '用户与权限管理', href: '/study/computer/linux/user' },
  nextChapter: { label: '进程与服务管理', href: '/study/computer/linux/process' },
  theme: THEMES.computer,
}

const SPREADS = [
  {
    label: '包管理基础',
    left: (
      <div className="space-y-4">
        <PageTitle>包管理基础</PageTitle>
        <BookParagraph><strong>包管理系统：</strong></BookParagraph>
        <BookList items={[
          'Debian/Ubuntu：APT (Advanced Package Tool)',
          'RedHat/CentOS：RPM (Red Hat Package Manager)',
          'Arch Linux：Pacman',
          '通用：Snap、Flatpak',
        ]} />
        <BookParagraph><strong>软件包类型：</strong></BookParagraph>
        <BookList items={[
          '二进制包：预编译好的程序',
          '源码包：需要编译安装',
          '依赖包：程序运行所需的库和工具',
        ]} />
        <BookAlert type="info" message="使用包管理器可以自动解决依赖关系，建议优先使用系统包管理器安装软件，定期更新软件包以获取安全补丁。" />
        <SectionTitle>APT包管理</SectionTitle>
        <BookCode language="bash" code={`# 更新软件包列表
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

# 列出已安装软件包
apt list --installed`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>RPM包管理</PageTitle>
        <BookCode language="bash" code={`# 安装软件包
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
sudo yum update`} />
        <BookAlert type="info" message="安装本地包：rpm -ivh package.rpm，查询已安装包：rpm -qa | grep package，查看包信息：rpm -qi package" />
        <SectionTitle>源码安装</SectionTitle>
        <BookCode language="bash" code={`# 下载源码包
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
make clean`} />
        <BookAlert type="warning" message="确保安装必要的编译工具和依赖库，注意查看README和INSTALL文件，建议使用--prefix指定安装路径" />
        <TagGrid items={['APT', 'RPM', '源码安装', 'yum', 'dnf', 'pacman']} />
      </div>
    ),
  },
  {
    label: '实战案例',
    left: (
      <div className="space-y-4">
        <PageTitle>包管理案例</PageTitle>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">批量安装多个软件包</p>
          <BookCode language="bash" code={`apt-get install package1 package2 package3`} />
          <p className="text-xs mt-1" style={{ color: '#666' }}>使用apt-get install一次性安装多个软件包，系统会自动解决依赖关系</p>
        </div>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">查找特定软件包</p>
          <BookCode language="bash" code={`apt-cache search keyword`} />
          <p className="text-xs mt-1" style={{ color: '#666' }}>根据关键词搜索软件包，支持模糊匹配</p>
        </div>
        <div className="rounded-lg p-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">清理不需要的包</p>
          <BookCode language="bash" code={`apt-get autoremove && apt-get clean`} />
          <p className="text-xs mt-1" style={{ color: '#666' }}>autoremove删除自动安装的依赖包，clean清理下载的包缓存</p>
        </div>
        <SectionTitle>软件编译安装案例</SectionTitle>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">从源码编译安装软件</p>
          <BookCode language="bash" code={`./configure && make && make install`} />
          <p className="text-xs mt-1" style={{ color: '#666' }}>标准的源码编译安装步骤：配置、编译、安装</p>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>更多安装案例</PageTitle>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">指定安装路径</p>
          <BookCode language="bash" code={`./configure --prefix=/usr/local/software`} />
          <p className="text-xs mt-1" style={{ color: '#666' }}>使用--prefix参数指定软件安装路径</p>
        </div>
        <div className="rounded-lg p-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">卸载源码安装的软件</p>
          <BookCode language="bash" code={`make uninstall`} />
          <p className="text-xs mt-1" style={{ color: '#666' }}>如果软件支持，可以使用make uninstall卸载，否则需要手动删除文件</p>
        </div>
        <SectionTitle>面试高频题</SectionTitle>
        <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">APT和RPM的区别</p>
          <BookList items={[
            'APT是Debian/Ubuntu的包管理，RPM是RedHat/CentOS的包管理',
            'APT自动解决依赖关系，RPM需要手动处理依赖',
            'APT使用.deb包格式，RPM使用.rpm包格式',
            'APT配置在/etc/apt/，RPM配置在/etc/yum.repos.d/',
          ]} />
        </div>
        <div className="rounded-lg p-4" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p className="font-semibold mb-2">如何处理软件包依赖问题？</p>
          <BookList items={[
            '使用包管理器自动解决（apt/yum）',
            '手动安装依赖包',
            '使用--nodeps参数（不推荐）',
            '使用容器或虚拟环境隔离依赖',
          ]} />
        </div>
        <TagGrid items={['apt', 'rpm', 'yum', '源码编译', '依赖', '面试题']} />
      </div>
    ),
  },
]

export default function LinuxPackagePage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

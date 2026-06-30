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
  BookDivider,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: 'Linux系统',
  chapterTitle: '文件与目录管理',
  chapterNumber: 2,
  totalChapters: 9,
  subjectHref: '/study/computer/linux',
  prevChapter: { label: '基础入门', href: '/study/computer/linux/intro' },
  nextChapter: { label: '用户与权限管理', href: '/study/computer/linux/user' },
  theme: THEMES.computer,
}

const SPREADS = [
  // ===== 跨页 1: 基础概念与命令操作 =====
  {
    label: '基础概念与命令',
    left: (
      <div className="space-y-4">
        <PageTitle>基础概念</PageTitle>
        <SectionTitle>文件系统结构</SectionTitle>
        <BookParagraph>
          Linux 采用类 Unix 的目录树结构，所有内容都挂载在根目录 <code className="px-1 py-0.5 bg-paper-200 rounded text-xs font-code text-amber-dark">/</code> 下。
        </BookParagraph>
        <BookAlert type="info" message="核心概念">
          <BookList items={[
            '一切皆文件：设备、进程、网络等都以文件形式存在',
            '目录结构：/bin、/etc、/home、/usr、/var、/tmp、/root、/dev、/proc、/lib',
            '统一标准：不同发行版目录结构基本一致',
          ]} />
        </BookAlert>
        <SectionTitle>文件类型</SectionTitle>
        <BookParagraph><b>常见文件类型：</b></BookParagraph>
        <BookList items={[
          '普通文件 (-)：文本、二进制、数据文件等',
          '目录文件 (d)：包含其他文件的容器',
          '链接文件 (l)：硬链接和软链接',
          '设备文件 (c/b)：字符设备和块设备',
          '套接字文件 (s)：进程间通信',
          '管道文件 (p)：进程间通信',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>命令操作</PageTitle>
        <SectionTitle>基础命令</SectionTitle>
        <BookCode
          language="bash"
          code={`# 列出目录内容
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
rm file.txt`}
        />
        <SectionTitle>高级命令</SectionTitle>
        <BookCode
          language="bash"
          code={`# 查找文件
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
ln -s /path/to/file linkname`}
        />
      </div>
    ),
  },

  // ===== 跨页 2: 实战案例与常见问题 =====
  {
    label: '实战案例与问题',
    left: (
      <div className="space-y-4">
        <PageTitle>实战案例</PageTitle>
        <SectionTitle>文件操作案例</SectionTitle>

        <div className="mb-4">
          <BookParagraph><b>问题：</b> 批量重命名文件</BookParagraph>
          <BookCode
            language="bash"
            code={`for f in *.txt; do mv "$f" "new_$f"; done`}
          />
          <BookParagraph>使用for循环遍历所有.txt文件，使用mv命令重命名，注意使用引号处理文件名中的空格</BookParagraph>
        </div>

        <div className="mb-4">
          <BookParagraph><b>问题：</b> 查找并删除大文件</BookParagraph>
          <BookCode
            language="bash"
            code={`find /var -type f -size +100M -delete`}
          />
          <BookParagraph>使用find命令查找/var目录下大于100M的文件并直接删除，-type f指定只查找文件，-size +100M指定大小，-delete直接删除</BookParagraph>
        </div>

        <div className="mb-4">
          <BookParagraph><b>问题：</b> 统计文件行数</BookParagraph>
          <BookCode
            language="bash"
            code={`find . -name "*.txt" | xargs wc -l`}
          />
          <BookParagraph>先使用find查找所有txt文件，通过管道传给xargs，再使用wc -l统计行数</BookParagraph>
        </div>

        <BookDivider />

        <SectionTitle>权限管理案例</SectionTitle>

        <div className="mb-4">
          <BookParagraph><b>问题：</b> 设置目录权限</BookParagraph>
          <BookCode
            language="bash"
            code={`chmod -R 755 directory`}
          />
          <BookParagraph>-R表示递归修改，755表示所有者有rwx权限，组和其他用户有rx权限</BookParagraph>
        </div>

        <div className="mb-4">
          <BookParagraph><b>问题：</b> 修改文件所有者</BookParagraph>
          <BookCode
            language="bash"
            code={`chown user:group file`}
          />
          <BookParagraph>将文件的所有者改为user，所属组改为group</BookParagraph>
        </div>

        <div className="mb-4">
          <BookParagraph><b>问题：</b> 设置特殊权限</BookParagraph>
          <BookCode
            language="bash"
            code={`chmod +s file  # 设置SUID`}
          />
          <BookParagraph>SUID权限允许其他用户以文件所有者的身份执行该文件</BookParagraph>
        </div>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>常见问题</PageTitle>
        <SectionTitle>文件操作问题</SectionTitle>

        <BookAlert type="warning" message="误删文件">
          <BookParagraph>定期备份，使用rm -i，考虑使用回收站</BookParagraph>
        </BookAlert>

        <BookAlert type="warning" message="磁盘空间不足">
          <BookParagraph>使用df/du检查，清理日志和临时文件</BookParagraph>
        </BookAlert>

        <BookAlert type="warning" message="文件权限问题">
          <BookParagraph>检查ls -l输出，使用chmod/chown修复</BookParagraph>
        </BookAlert>

        <BookDivider />

        <SectionTitle>命令使用问题</SectionTitle>

        <BookAlert type="warning" message="命令不熟悉">
          <BookParagraph>使用man命令查看手册，或--help参数</BookParagraph>
        </BookAlert>

        <BookAlert type="warning" message="参数记不住">
          <BookParagraph>创建常用命令的别名或脚本</BookParagraph>
        </BookAlert>

        <BookAlert type="warning" message="操作失误">
          <BookParagraph>使用-i参数，谨慎使用rm -rf</BookParagraph>
        </BookAlert>
      </div>
    ),
  },
]

export default function LinuxFilePage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookAlert, BookList, BookDivider, TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '安全运维',
  chapterTitle: '系统加固',
  chapterNumber: 2,
  totalChapters: 10,
  subjectHref: '/study/security/ops',
  prevChapter: { label: '安全运维基础', href: '/study/security/ops/basic' },
  nextChapter: { label: '安全监控', href: '/study/security/ops/monitor' },
  theme: THEMES.security,
}

// ─── 外部常量：大段代码 ───

const osHardeningScript = `# 禁用root远程登录
sudo sed -i 's/^PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config
# 修改SSH端口
sudo sed -i 's/^#Port 22/Port 2222/' /etc/ssh/sshd_config
# 关闭不必要服务
sudo systemctl disable telnet
touch /etc/nologin
# 开启自动安全更新（Debian/Ubuntu）
sudo apt install unattended-upgrades
sudo dpkg-reconfigure --priority=low unattended-upgrades`

const ufwConfig = `# UFW防火墙基本配置
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 2222/tcp
sudo ufw enable`

const nginxSecurityConfig = `# Nginx安全配置片段
server_tokens off;
add_header X-Frame-Options DENY;
add_header X-Content-Type-Options nosniff;
add_header X-XSS-Protection "1; mode=block";
# 只允许HTTPS
listen 443 ssl;
ssl_protocols TLSv1.2 TLSv1.3;`

const ansibleHardening = `# 关闭不必要服务的Ansible任务
- name: Disable telnet
  service:
    name: telnet
    enabled: no
    state: stopped

# 修改SSH配置
- name: Set SSH PermitRootLogin to no
  lineinfile:
    path: /etc/ssh/sshd_config
    regexp: '^PermitRootLogin'
    line: 'PermitRootLogin no'`

// ─── 页面内容 ───

const SPREADS = [
  {
    label: '概述',
    left: (
      <div className="space-y-4">
        <PageTitle>系统加固概述</PageTitle>
        <BookParagraph>
          系统加固是指通过一系列安全措施，减少操作系统、网络、应用等各层面的安全风险，提升整体防御能力。加固不仅仅是打补丁，更包括配置优化、权限收敛、服务裁剪、日志审计等多方面内容。
        </BookParagraph>
        <SectionTitle>加固目标</SectionTitle>
        <BookList items={[
          '防止未授权访问和恶意攻击',
          '减少系统暴露面和弱点',
          '提升安全事件发现和响应能力',
          '满足合规和审计要求',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>加固的范畴</PageTitle>
        <BookParagraph>
          安全加固覆盖信息系统的各个层面，从底层的操作系统到上层的应用系统，以及连接它们的网络基础设施，都需要进行针对性的安全强化。
        </BookParagraph>
        <BookAlert type="info" message="系统加固是一个持续的过程，而非一次性工作。随着新漏洞的发现和业务的变化，加固策略需要不断调整和优化。" />
      </div>
    ),
  },
  {
    label: '加固原则',
    left: (
      <div className="space-y-4">
        <PageTitle>系统加固原则</PageTitle>
        <SectionTitle>最小权限原则</SectionTitle>
        <BookParagraph>只赋予用户和进程完成任务所需的最小权限，防止权限滥用。</BookParagraph>
        <SectionTitle>最小暴露面原则</SectionTitle>
        <BookParagraph>关闭不必要的端口、服务和功能，减少攻击入口。</BookParagraph>
        <SectionTitle>分层防御</SectionTitle>
        <BookParagraph>多层次安全防护，单点失效不影响整体安全。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>更多原则</PageTitle>
        <SectionTitle>及时更新</SectionTitle>
        <BookParagraph>及时修补系统和应用漏洞，防止被已知漏洞攻击。</BookParagraph>
        <SectionTitle>可审计性</SectionTitle>
        <BookParagraph>开启日志审计，便于安全事件溯源和责任追踪。</BookParagraph>
        <SectionTitle>自动化与标准化</SectionTitle>
        <BookParagraph>通过自动化工具和标准化流程提升加固效率和一致性。</BookParagraph>
        <BookAlert type="success" message="遵循以上六大原则，可以系统性地构建一个安全、可靠的生产环境。" />
      </div>
    ),
  },
  {
    label: '操作系统加固',
    left: (
      <div className="space-y-4">
        <PageTitle>操作系统加固</PageTitle>
        <SectionTitle>账户与权限管理</SectionTitle>
        <BookList items={[
          '禁用或删除无用账户，定期检查用户列表',
          '强制使用复杂密码策略，定期更换密码',
          '限制root/管理员账户远程登录',
          '采用sudo最小授权原则',
        ]} />
        <SectionTitle>服务与端口加固</SectionTitle>
        <BookList items={[
          '关闭不必要的服务（如telnet、ftp、rsh等）',
          '只开放业务所需端口，其他全部关闭',
          '使用防火墙（如iptables、ufw）进行访问控制',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>系统补丁与更新</SectionTitle>
        <BookList items={[
          '定期检查并安装操作系统和软件补丁',
          '可配置自动更新，减少人工疏漏',
        ]} />
        <SectionTitle>配置加固示例</SectionTitle>
        <BookCode language="bash" code={osHardeningScript} maxLines={0} />
      </div>
    ),
  },
  {
    label: '网络加固',
    left: (
      <div className="space-y-4">
        <PageTitle>网络加固</PageTitle>
        <BookList items={[
          '部署边界防火墙，限制外部访问',
          '使用VLAN、子网划分隔离不同业务',
          '启用入侵检测/防御系统（IDS/IPS）',
          '加密敏感数据传输（如启用HTTPS、VPN）',
          '关闭不必要的网络协议（如IPv6、ICMP）',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>防火墙配置示例</SectionTitle>
        <BookCode language="bash" code={ufwConfig} maxLines={0} />
        <BookAlert type="info" message="防火墙是网络加固的第一道防线，建议采用默认拒绝策略，只放行业务必需的端口和协议。" />
      </div>
    ),
  },
  {
    label: '应用加固',
    left: (
      <div className="space-y-4">
        <PageTitle>应用加固</PageTitle>
        <BookList items={[
          '关闭或限制调试、测试接口',
          '对外API需鉴权和限流',
          '敏感配置文件权限收敛',
          'Web应用启用WAF防护',
          '定期代码审计和依赖漏洞扫描',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>Web服务器加固示例</SectionTitle>
        <BookCode language="nginx" code={nginxSecurityConfig} maxLines={0} />
        <BookAlert type="warning" message="Web服务器是攻击的主要目标，除了配置安全头部外，还应定期更新版本、移除不必要的模块。" />
      </div>
    ),
  },
  {
    label: '自动化与工具',
    left: (
      <div className="space-y-4">
        <PageTitle>自动化与工具</PageTitle>
        <BookList items={[
          'Ansible/SaltStack：批量配置和加固自动化',
          'OpenSCAP：自动化安全基线检查',
          'Lynis：Linux系统安全审计工具',
          'OSQuery：SQL风格查询系统安全状态',
          '自定义Shell/Python脚本批量加固',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>Ansible批量加固示例</SectionTitle>
        <BookCode language="yaml" code={ansibleHardening} maxLines={0} />
        <BookAlert type="success" message="自动化工具可以大幅提升加固效率和一致性，建议将加固策略纳入CI/CD流程。" />
      </div>
    ),
  },
  {
    label: '实践案例',
    left: (
      <div className="space-y-4">
        <PageTitle>系统加固实践案例</PageTitle>
        <SectionTitle>案例：企业Linux服务器加固</SectionTitle>
        <BookList items={[
          '账户清理：删除无用账户，禁用root远程登录',
          '服务裁剪：只保留nginx、sshd等必要服务',
          '端口收敛：只开放80、443、2222端口',
          '配置防火墙和Fail2ban防爆破',
          '定期自动更新和漏洞扫描',
          '日志集中收集与审计',
        ]} ordered />
        <BookDivider />
        <TagGrid items={['系统加固', '安全运维', '防火墙', 'SSH安全', '自动化', '审计']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>常见问题与建议</SectionTitle>
        <BookList items={[
          '加固后需充分测试，防止误伤业务',
          '建议分阶段、分批次实施加固',
          '做好加固前的备份和回滚方案',
          '持续关注安全通告和新漏洞',
        ]} />
        <BookAlert type="warning" message="安全加固是攻防对抗的动态过程，没有一劳永逸的解决方案。需要持续监控、定期评估、及时调整。" />
      </div>
    ),
  },
]

export default function SecurityOpsHardeningPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

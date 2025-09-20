'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function SecurityOpsHardeningPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 顶部返回导航 */}
      <div className="mb-4">
        <Link href="/study/security/ops" className="px-4 py-2 text-blue-600 hover:text-blue-800">← 返回安全运维</Link>
      </div>
      <h1 className="text-3xl font-bold mb-8">系统加固</h1>

      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        <button onClick={() => setActiveTab('overview')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>概述</button>
        <button onClick={() => setActiveTab('principle')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'principle' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>加固原则</button>
        <button onClick={() => setActiveTab('os')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'os' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>操作系统加固</button>
        <button onClick={() => setActiveTab('network')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'network' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>网络加固</button>
        <button onClick={() => setActiveTab('app')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'app' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>应用加固</button>
        <button onClick={() => setActiveTab('auto')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'auto' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>自动化与工具</button>
        <button onClick={() => setActiveTab('case')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'case' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>实践案例</button>
      </div>

      {/* 内容区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">系统加固概述</h3>
            <div className="prose max-w-none">
              <p>系统加固是指通过一系列安全措施，减少操作系统、网络、应用等各层面的安全风险，提升整体防御能力。加固不仅仅是打补丁，更包括配置优化、权限收敛、服务裁剪、日志审计等多方面内容。</p>
              <ul className="list-disc pl-6">
                <li>防止未授权访问和恶意攻击</li>
                <li>减少系统暴露面和弱点</li>
                <li>提升安全事件发现和响应能力</li>
                <li>满足合规和审计要求</li>
              </ul>
            </div>
          </div>
        )}
        {activeTab === 'principle' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">系统加固原则</h3>
            <div className="prose max-w-none">
              <ul className="list-disc pl-6">
                <li><b>最小权限原则：</b>只赋予用户和进程完成任务所需的最小权限，防止权限滥用。</li>
                <li><b>最小暴露面原则：</b>关闭不必要的端口、服务和功能，减少攻击入口。</li>
                <li><b>分层防御：</b>多层次安全防护，单点失效不影响整体安全。</li>
                <li><b>及时更新：</b>及时修补系统和应用漏洞，防止被已知漏洞攻击。</li>
                <li><b>可审计性：</b>开启日志审计，便于安全事件溯源和责任追踪。</li>
                <li><b>自动化与标准化：</b>通过自动化工具和标准化流程提升加固效率和一致性。</li>
              </ul>
            </div>
          </div>
        )}
        {activeTab === 'os' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">操作系统加固</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold text-lg mb-2">账户与权限管理</h4>
              <ul className="list-disc pl-6">
                <li>禁用或删除无用账户，定期检查用户列表</li>
                <li>强制使用复杂密码策略，定期更换密码</li>
                <li>限制root/管理员账户远程登录</li>
                <li>采用sudo最小授权原则</li>
              </ul>
              <h4 className="font-semibold text-lg mb-2">服务与端口加固</h4>
              <ul className="list-disc pl-6">
                <li>关闭不必要的服务（如telnet、ftp、rsh等）</li>
                <li>只开放业务所需端口，其他全部关闭</li>
                <li>使用防火墙（如iptables、ufw）进行访问控制</li>
              </ul>
              <h4 className="font-semibold text-lg mb-2">系统补丁与更新</h4>
              <ul className="list-disc pl-6">
                <li>定期检查并安装操作系统和软件补丁</li>
                <li>可配置自动更新，减少人工疏漏</li>
              </ul>
              <h4 className="font-semibold text-lg mb-2">配置加固示例</h4>
              <pre className="bg-gray-100 p-4 rounded mb-4">
{`# 禁用root远程登录
sudo sed -i 's/^PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config
# 修改SSH端口
sudo sed -i 's/^#Port 22/Port 2222/' /etc/ssh/sshd_config
# 关闭不必要服务
sudo systemctl disable telnet
touch /etc/nologin
# 开启自动安全更新（Debian/Ubuntu）
sudo apt install unattended-upgrades
sudo dpkg-reconfigure --priority=low unattended-upgrades`}
              </pre>
            </div>
          </div>
        )}
        {activeTab === 'network' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">网络加固</h3>
            <div className="prose max-w-none">
              <ul className="list-disc pl-6">
                <li>部署边界防火墙，限制外部访问</li>
                <li>使用VLAN、子网划分隔离不同业务</li>
                <li>启用入侵检测/防御系统（IDS/IPS）</li>
                <li>加密敏感数据传输（如启用HTTPS、VPN）</li>
                <li>关闭不必要的网络协议（如IPv6、ICMP）</li>
              </ul>
              <h4 className="font-semibold text-lg mb-2">防火墙配置示例</h4>
              <pre className="bg-gray-100 p-4 rounded mb-4">
{`# UFW防火墙基本配置
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 2222/tcp
sudo ufw enable`}
              </pre>
            </div>
          </div>
        )}
        {activeTab === 'app' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">应用加固</h3>
            <div className="prose max-w-none">
              <ul className="list-disc pl-6">
                <li>关闭或限制调试、测试接口</li>
                <li>对外API需鉴权和限流</li>
                <li>敏感配置文件权限收敛</li>
                <li>Web应用启用WAF防护</li>
                <li>定期代码审计和依赖漏洞扫描</li>
              </ul>
              <h4 className="font-semibold text-lg mb-2">Web服务器加固示例</h4>
              <pre className="bg-gray-100 p-4 rounded mb-4">
{`# Nginx安全配置片段
server_tokens off;
add_header X-Frame-Options DENY;
add_header X-Content-Type-Options nosniff;
add_header X-XSS-Protection "1; mode=block";
# 只允许HTTPS
listen 443 ssl;
ssl_protocols TLSv1.2 TLSv1.3;`}
              </pre>
            </div>
          </div>
        )}
        {activeTab === 'auto' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">自动化与工具</h3>
            <div className="prose max-w-none">
              <ul className="list-disc pl-6">
                <li>Ansible/SaltStack：批量配置和加固自动化</li>
                <li>OpenSCAP：自动化安全基线检查</li>
                <li>Lynis：Linux系统安全审计工具</li>
                <li>OSQuery：SQL风格查询系统安全状态</li>
                <li>自定义Shell/Python脚本批量加固</li>
              </ul>
              <h4 className="font-semibold text-lg mb-2">Ansible批量加固示例</h4>
              <pre className="bg-gray-100 p-4 rounded mb-4">
{`# 关闭不必要服务的Ansible任务
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
    line: 'PermitRootLogin no'`}
              </pre>
            </div>
          </div>
        )}
        {activeTab === 'case' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">系统加固实践案例</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold text-lg mb-2">案例：企业Linux服务器加固</h4>
              <ol className="list-decimal pl-6">
                <li>账户清理：删除无用账户，禁用root远程登录</li>
                <li>服务裁剪：只保留nginx、sshd等必要服务</li>
                <li>端口收敛：只开放80、443、2222端口</li>
                <li>配置防火墙和Fail2ban防爆破</li>
                <li>定期自动更新和漏洞扫描</li>
                <li>日志集中收集与审计</li>
              </ol>
              <h4 className="font-semibold text-lg mb-2">常见问题与建议</h4>
              <ul className="list-disc pl-6">
                <li>加固后需充分测试，防止误伤业务</li>
                <li>建议分阶段、分批次实施加固</li>
                <li>做好加固前的备份和回滚方案</li>
                <li>持续关注安全通告和新漏洞</li>
              </ul>
            </div>
          </div>
        )}
      </div>
      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/security/ops/basic"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回基础
        </Link>
        <Link 
          href="/study/security/ops/monitor"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          安全监控 →
        </Link>
      </div>
    </div>
  );
} 
"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function SecurityOpsPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">安全运维</h1>
      
      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'overview'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          概述
        </button>
        <button
          onClick={() => setActiveTab('system')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'system'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          系统运维
        </button>
        <button
          onClick={() => setActiveTab('network')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'network'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          网络运维
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'security'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          安全管理
        </button>
        <button
          onClick={() => setActiveTab('monitor')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'monitor'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          监控告警
        </button>
        <button
          onClick={() => setActiveTab('incident')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'incident'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          应急响应
        </button>
      </div>

      {/* 内容区域 */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">安全运维概述</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 安全运维的重要性</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="mb-4">
                  安全运维是确保信息系统持续安全运行的关键环节，它涵盖了从系统维护、网络管理到安全防护的全方位工作。
                  良好的安全运维可以：
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>预防安全事件的发生</li>
                  <li>及时发现和处理安全威胁</li>
                  <li>确保业务的连续性</li>
                  <li>降低安全事件带来的损失</li>
                  <li>提升系统的整体安全性</li>
                </ul>
              </div>

              <h4 className="font-semibold">2. 安全运维的主要内容</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ul className="list-disc pl-6 mb-4">
                  <li>系统运维
                    <ul className="list-disc pl-6 mt-2 text-sm">
                      <li>系统配置管理</li>
                      <li>补丁管理</li>
                      <li>账号管理</li>
                      <li>日志管理</li>
                    </ul>
                  </li>
                  <li>网络运维
                    <ul className="list-disc pl-6 mt-2 text-sm">
                      <li>网络架构维护</li>
                      <li>网络设备管理</li>
                      <li>流量监控</li>
                      <li>安全策略维护</li>
                    </ul>
                  </li>
                  <li>安全管理
                    <ul className="list-disc pl-6 mt-2 text-sm">
                      <li>安全策略制定</li>
                      <li>安全评估</li>
                      <li>安全加固</li>
                      <li>安全培训</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <h4 className="font-semibold">3. 安全运维的工作流程</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ul className="list-disc pl-6 mb-4">
                  <li>日常运维
                    <ul className="list-disc pl-6 mt-2 text-sm">
                      <li>系统巡检</li>
                      <li>性能监控</li>
                      <li>安全检查</li>
                      <li>日志分析</li>
                    </ul>
                  </li>
                  <li>变更管理
                    <ul className="list-disc pl-6 mt-2 text-sm">
                      <li>变更申请</li>
                      <li>风险评估</li>
                      <li>变更实施</li>
                      <li>变更验证</li>
                    </ul>
                  </li>
                  <li>应急响应
                    <ul className="list-disc pl-6 mt-2 text-sm">
                      <li>预警监测</li>
                      <li>事件响应</li>
                      <li>故障恢复</li>
                      <li>总结改进</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'system' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">系统运维</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 系统配置管理</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="mb-2">配置管理脚本示例：</p>
                <pre className="bg-gray-200 p-2 rounded text-xs overflow-x-auto">
                  <code>{`#!/bin/bash
# system_config.sh

# 系统参数配置
configure_system() {
    # 设置最大文件描述符
    echo "* soft nofile 65535" >> /etc/security/limits.conf
    echo "* hard nofile 65535" >> /etc/security/limits.conf
    
    # 设置系统参数
    cat > /etc/sysctl.d/99-security.conf << EOF
    # 内核参数优化
    net.ipv4.tcp_max_syn_backlog = 8192
    net.ipv4.tcp_syncookies = 1
    net.ipv4.tcp_max_tw_buckets = 5000
    net.ipv4.tcp_fin_timeout = 30
    
    # 内存参数优化
    vm.swappiness = 10
    vm.dirty_ratio = 60
    vm.dirty_background_ratio = 30
    
    # 文件系统参数
    fs.file-max = 2097152
    fs.inotify.max_user_watches = 524288
EOF
    sysctl -p /etc/sysctl.d/99-security.conf
}

# 服务管理
manage_services() {
    # 禁用不必要的服务
    SERVICES_TO_DISABLE=(
        "telnet"
        "rsh"
        "rlogin"
        "rexec"
        "tftp"
    )
    
    for service in "\${SERVICES_TO_DISABLE[@]}"; do
        systemctl disable "\$service"
        systemctl stop "\$service"
    done
    
    # 配置必要服务
    SERVICES_TO_ENABLE=(
        "sshd"
        "firewalld"
        "auditd"
    )
    
    for service in "\${SERVICES_TO_ENABLE[@]}"; do
        systemctl enable "\$service"
        systemctl start "\$service"
    done
}

# 执行配置
configure_system
manage_services`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">2. 补丁管理</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="mb-2">补丁管理脚本示例：</p>
                <pre className="bg-gray-200 p-2 rounded text-xs overflow-x-auto">
                  <code>{`#!/bin/bash
# patch_management.sh

# 配置变量
LOG_FILE="/var/log/patch_management.log"
BACKUP_DIR="/var/backups/system"
DATE=\\\$(date +%Y%m%d)

# 日志函数
log() {
    echo "[\\$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "\$LOG_FILE"
}

# 系统备份
backup_system() {
    log "开始系统备份..."
    mkdir -p "\$BACKUP_DIR/\$DATE"
    
    # 备份重要配置文件
    tar -czf "\$BACKUP_DIR/\$DATE/etc_backup.tar.gz" /etc/
    
    # 备份包管理器数据库
    cp -r /var/lib/rpm "\$BACKUP_DIR/\$DATE/"
    
    log "系统备份完成"
}

# 更新系统
update_system() {
    log "开始系统更新..."
    
    # 更新包管理器缓存
    yum clean all
    yum makecache
    
    # 列出可用更新
    yum list updates > "\$BACKUP_DIR/\$DATE/available_updates.txt"
    
    # 安装安全更新
    yum update --security -y
    
    # 记录已安装的更新
    yum history > "\$BACKUP_DIR/\$DATE/update_history.txt"
    
    log "系统更新完成"
}

# 验证更新
verify_update() {
    log "开始验证更新..."
    
    # 检查系统状态
    systemctl list-units --state=failed > "\$BACKUP_DIR/\$DATE/failed_services.txt"
    
    # 检查关键服务
    CRITICAL_SERVICES=(
        "sshd"
        "firewalld"
        "nginx"
        "mysql"
    )
    
    for service in "\${CRITICAL_SERVICES[@]}"; do
        if ! systemctl is-active --quiet "\$service"; then
            log "警告: 服务 \$service 未运行"
        fi
    done
    
    log "更新验证完成"
}

# 主函数
main() {
    log "开始补丁管理流程..."
    
    backup_system
    update_system
    verify_update
    
    log "补丁管理流程完成"
}

main`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">3. 账号管理</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="mb-2">账号管理脚本示例：</p>
                <pre className="bg-gray-200 p-2 rounded text-xs overflow-x-auto">
                  <code>{`#!/bin/bash
# account_management.sh

# 配置变量
LOG_FILE="/var/log/account_management.log"
ACCOUNT_POLICY="/etc/security/account_policy.conf"

# 日志函数
log() {
    echo "[\\$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "\$LOG_FILE"
}

# 配置密码策略
configure_password_policy() {
    log "配置密码策略..."
    
    cat > /etc/security/pwquality.conf << EOF
# 密码最小长度
minlen = 12

# 最少大写字母个数
ucredit = -1

# 最少小写字母个数
lcredit = -1

# 最少数字个数
dcredit = -1

# 最少特殊字符个数
ocredit = -1

# 新密码中允许包含旧密码中字符的最大个数
difok = 8

# 强制使用不同类型的字符
minclass = 4
EOF

    # 配置密码过期策略
    sed -i 's/PASS_MAX_DAYS.*/PASS_MAX_DAYS   90/' /etc/login.defs
    sed -i 's/PASS_MIN_DAYS.*/PASS_MIN_DAYS   7/' /etc/login.defs
    sed -i 's/PASS_WARN_AGE.*/PASS_WARN_AGE   14/' /etc/login.defs
    
    log "密码策略配置完成"
}

# 审计账号
audit_accounts() {
    log "开始账号审计..."
    
    # 检查特权账号
    echo "特权账号列表：" > /var/log/account_audit.log
    grep "sudo" /etc/group >> /var/log/account_audit.log
    
    # 检查空密码账号
    echo "\\n空密码账号：" >> /var/log/account_audit.log
    awk -F: '($2 == "" ) { print $1 }' /etc/shadow >> /var/log/account_audit.log
    
    # 检查UID为0的账号
    echo "\\nUID为0的账号：" >> /var/log/account_audit.log
    awk -F: '($3 == 0) { print $1 }' /etc/passwd >> /var/log/account_audit.log
    
    log "账号审计完成"
}

# 清理过期账号
cleanup_accounts() {
    log "开始清理过期账号..."
    
    # 获取所有过期账号
    EXPIRED_ACCOUNTS=\\\$(awk -F: '($8 != "" && $8 < '\\$(date +%s)') { print $1 }' /etc/shadow)
    
    for account in \$EXPIRED_ACCOUNTS; do
        log "删除过期账号: \$account"
        userdel -r "\$account"
    done
    
    log "过期账号清理完成"
}

# 主函数
main() {
    log "开始账号管理流程..."
    
    configure_password_policy
    audit_accounts
    cleanup_accounts
    
    log "账号管理流程完成"
}

main`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'network' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">网络运维</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 网络配置管理</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="mb-2">网络配置脚本示例：</p>
                <pre className="bg-gray-200 p-2 rounded text-xs overflow-x-auto">
                  <code>{`#!/bin/bash
# network_config.sh

# 配置变量
LOG_FILE="/var/log/network_config.log"
BACKUP_DIR="/var/backups/network"
DATE=\\\$(date +%Y%m%d)

# 日志函数
log() {
    echo "[\\$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "\$LOG_FILE"
}

# 备份网络配置
backup_network_config() {
    log "备份网络配置..."
    
    mkdir -p "\$BACKUP_DIR/\$DATE"
    
    # 备份网络配置文件
    cp -r /etc/sysconfig/network-scripts "\$BACKUP_DIR/\$DATE/"
    cp /etc/hosts "\$BACKUP_DIR/\$DATE/"
    cp /etc/resolv.conf "\$BACKUP_DIR/\$DATE/"
    
    # 导出路由表
    ip route show > "\$BACKUP_DIR/\$DATE/routes.txt"
    
    # 导出iptables规则
    iptables-save > "\$BACKUP_DIR/\$DATE/iptables.rules"
    
    log "网络配置备份完成"
}

# 配置网络接口
configure_network_interfaces() {
    log "配置网络接口..."
    
    # 配置主网卡
    cat > /etc/sysconfig/network-scripts/ifcfg-eth0 << EOF
TYPE=Ethernet
BOOTPROTO=static
DEFROUTE=yes
NAME=eth0
DEVICE=eth0
ONBOOT=yes
IPADDR=192.168.1.100
NETMASK=255.255.255.0
GATEWAY=192.168.1.1
DNS1=8.8.8.8
DNS2=8.8.4.4
EOF

    # 重启网络服务
    systemctl restart network
    
    log "网络接口配置完成"
}

# 配置防火墙规则
configure_firewall() {
    log "配置防火墙规则..."
    
    # 清除现有规则
    iptables -F
    
    # 设置默认策略
    iptables -P INPUT DROP
    iptables -P FORWARD DROP
    iptables -P OUTPUT ACCEPT
    
    # 允许已建立的连接
    iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
    
    # 允许本地回环
    iptables -A INPUT -i lo -j ACCEPT
    
    # 允许SSH访问
    iptables -A INPUT -p tcp --dport 22 -j ACCEPT
    
    # 允许HTTP/HTTPS访问
    iptables -A INPUT -p tcp --dport 80 -j ACCEPT
    iptables -A INPUT -p tcp --dport 443 -j ACCEPT
    
    # 保存规则
    iptables-save > /etc/sysconfig/iptables
    
    log "防火墙规则配置完成"
}

# 配置路由
configure_routing() {
    log "配置路由..."
    
    # 添加静态路由
    ip route add 10.0.0.0/24 via 192.168.1.254
    
    # 保存路由配置
    echo "10.0.0.0/24 via 192.168.1.254" >> /etc/sysconfig/network-scripts/route-eth0
    
    log "路由配置完成"
}

# 主函数
main() {
    log "开始网络配置管理..."
    
    backup_network_config
    configure_network_interfaces
    configure_firewall
    configure_routing
    
    log "网络配置管理完成"
}

main`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">2. 网络监控</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="mb-2">网络监控脚本示例：</p>
                <pre className="bg-gray-200 p-2 rounded text-xs overflow-x-auto">
                  <code>{`#!/bin/bash
# network_monitor.sh

# 配置变量
LOG_FILE="/var/log/network_monitor.log"
ALERT_THRESHOLD=80  # 流量告警阈值(%)
INTERFACE="eth0"    # 监控的网络接口

# 日志函数
log() {
    echo "[\\$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "\$LOG_FILE"
}

# 监控网络连接
monitor_connections() {
    log "监控网络连接..."
    
    # 检查TCP连接状态
    netstat -ant | awk '{print $6}' | sort | uniq -c > /tmp/tcp_stats.txt
    
    # 检查连接数
    TOTAL_CONN=\\\$(netstat -ant | wc -l)
    if [ \$TOTAL_CONN -gt 1000 ]; then
        log "警告: 连接数过高 (\$TOTAL_CONN)"
    fi
    
    # 检查ESTABLISHED连接
    ESTAB_CONN=\\\$(netstat -ant | grep ESTABLISHED | wc -l)
    log "当前ESTABLISHED连接数: \$ESTAB_CONN"
}

# 监控网络流量
monitor_traffic() {
    log "监控网络流量..."
    
    # 获取接口流量统计
    RX_BYTES=\\\$(cat /sys/class/net/\$INTERFACE/statistics/rx_bytes)
    TX_BYTES=\\\$(cat /sys/class/net/\$INTERFACE/statistics/tx_bytes)
    
    # 计算流量率
    sleep 1
    RX_BYTES_NEW=\\\$(cat /sys/class/net/\$INTERFACE/statistics/rx_bytes)
    TX_BYTES_NEW=\\\$(cat /sys/class/net/\$INTERFACE/statistics/tx_bytes)
    
    RX_RATE=\\\$(( (RX_BYTES_NEW - RX_BYTES) / 1024 ))
    TX_RATE=\\\$(( (TX_BYTES_NEW - TX_BYTES) / 1024 ))
    
    log "接收速率: \${RX_RATE}KB/s"
    log "发送速率: \${TX_RATE}KB/s"
    
    # 检查是否超过阈值
    if [ \$RX_RATE -gt \$ALERT_THRESHOLD ] || [ \$TX_RATE -gt \$ALERT_THRESHOLD ]; then
        log "警告: 网络流量超过阈值"
    fi
}

# 监控网络延迟
monitor_latency() {
    log "监控网络延迟..."
    
    # 检查关键服务器延迟
    HOSTS=(
        "8.8.8.8"
        "114.114.114.114"
        "gateway"
    )
    
    for host in "\${HOSTS[@]}"; do
        PING_RESULT=\\\$(ping -c 3 \$host | tail -1 | awk '{print $4}' | cut -d '/' -f 2)
        log "\$host 平均延迟: \${PING_RESULT}ms"
        
        if [ \\\$(echo "\$PING_RESULT > 100" | bc) -eq 1 ]; then
            log "警告: \$host 延迟过高"
        fi
    done
}

# 主函数
main() {
    log "开始网络监控..."
    
    while true; do
        monitor_connections
        monitor_traffic
        monitor_latency
        sleep 60
    done
}

main`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">安全管理</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 安全策略管理</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="mb-2">安全策略配置示例：</p>
                <pre className="bg-gray-200 p-2 rounded text-xs overflow-x-auto">
                  <code>{`#!/bin/bash
# security_policy.sh

# 配置变量
LOG_FILE="/var/log/security_policy.log"
POLICY_DIR="/etc/security/policies"
DATE=\\\$(date +%Y%m%d)

# 日志函数
log() {
    echo "[\\$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "\$LOG_FILE"
}

# 配置SELinux策略
configure_selinux() {
    log "配置SELinux策略..."
    
    # 启用SELinux
    sed -i 's/SELINUX=disabled/SELINUX=enforcing/' /etc/selinux/config
    
    # 配置SELinux策略
    semanage port -a -t http_port_t -p tcp 8080
    semanage port -a -t ssh_port_t -p tcp 2222
    
    # 设置文件上下文
    semanage fcontext -a -t httpd_sys_content_t "/var/www/html(/.*)?"
    restorecon -R -v /var/www/html
    
    log "SELinux策略配置完成"
}

# 配置审计策略
configure_audit() {
    log "配置审计策略..."
    
    cat > /etc/audit/rules.d/audit.rules << EOF
# 删除所有现有规则
-D

# 设置缓冲区大小
-b 8192

# 监控用户和组的变更
-w /etc/group -p wa -k identity
-w /etc/passwd -p wa -k identity
-w /etc/shadow -p wa -k identity

# 监控系统调用
-a exit,always -F arch=b64 -S execve -k exec
-a exit,always -F arch=b32 -S execve -k exec

# 监控特权命令
-a exit,always -F path=/usr/bin/sudo -F perm=x -k sudo_log
-a exit,always -F path=/bin/su -F perm=x -k su_log

# 监控系统时间变更
-a exit,always -F arch=b64 -S adjtimex -S settimeofday -k time-change
-a exit,always -F arch=b32 -S adjtimex -S settimeofday -k time-change

# 监控网络配置变更
-w /etc/sysconfig/network-scripts/ -p wa -k network_changes
EOF

    # 重启审计服务
    service auditd restart
    
    log "审计策略配置完成"
}

# 配置访问控制策略
configure_access_control() {
    log "配置访问控制策略..."
    
    # 配置sudo策略
    cat > /etc/sudoers.d/custom << EOF
# 允许wheel组使用所有命令
%wheel ALL=(ALL) ALL

# 允许运维组使用特定命令
%ops ALL=(ALL) /bin/systemctl restart httpd, /bin/systemctl status httpd

# 要求输入密码
Defaults timestamp_timeout=15
EOF
    
    # 配置PAM策略
    cat > /etc/pam.d/system-auth << EOF
#%PAM-1.0
auth        required      pam_env.so
auth        required      pam_faillock.so preauth audit silent deny=5 unlock_time=900
auth        sufficient    pam_unix.so nullok try_first_pass
auth        [default=die] pam_faillock.so authfail audit deny=5 unlock_time=900
auth        requisite     pam_succeed_if.so uid >= 1000 quiet_success
auth        required      pam_deny.so

account     required      pam_unix.so
account     sufficient    pam_localuser.so
account     sufficient    pam_succeed_if.so uid < 1000 quiet
account     required      pam_permit.so

password    requisite     pam_pwquality.so try_first_pass local_users_only retry=3 authtok_type=
password    sufficient    pam_unix.so sha512 shadow nullok try_first_pass use_authtok
password    required      pam_deny.so

session     optional      pam_keyinit.so revoke
session     required      pam_limits.so
session     [success=1 default=ignore] pam_succeed_if.so service in crond quiet use_uid
session     required      pam_unix.so
EOF
    
    log "访问控制策略配置完成"
}

# 配置加密策略
configure_crypto_policy() {
    log "配置加密策略..."
    
    # 设置系统加密策略
    update-crypto-policies --set DEFAULT
    
    # 配置SSH加密选项
    cat > /etc/ssh/sshd_config.d/crypto.conf << EOF
# 密钥交换算法
KexAlgorithms curve25519-sha256@libssh.org,ecdh-sha2-nistp521,ecdh-sha2-nistp384,ecdh-sha2-nistp256

# 加密算法
Ciphers chacha20-poly1305@openssh.com,aes256-gcm@openssh.com,aes128-gcm@openssh.com,aes256-ctr,aes192-ctr,aes128-ctr

# MAC算法
MACs hmac-sha2-512-etm@openssh.com,hmac-sha2-256-etm@openssh.com,umac-128-etm@openssh.com

# 主机密钥算法
HostKeyAlgorithms ssh-ed25519,ssh-ed25519-cert-v01@openssh.com,rsa-sha2-512,rsa-sha2-256
EOF

    # 重启SSH服务
    systemctl restart sshd
    
    log "加密策略配置完成"
}

# 主函数
main() {
    log "开始安全策略配置..."
    
    configure_selinux
    configure_audit
    configure_access_control
    configure_crypto_policy
    
    log "安全策略配置完成"
}

main`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">2. 安全评估</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="mb-2">安全评估脚本示例：</p>
                <pre className="bg-gray-200 p-2 rounded text-xs overflow-x-auto">
                  <code>{`#!/bin/bash
# security_assessment.sh

# 配置变量
LOG_FILE="/var/log/security_assessment.log"
REPORT_DIR="/var/log/security/assessment"
DATE=\\\$(date +%Y%m%d)

# 日志函数
log() {
    echo "[\\$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "\$LOG_FILE"
}

# 系统基线检查
check_system_baseline() {
    log "执行系统基线检查..."
    
    mkdir -p "\$REPORT_DIR/\$DATE"
    
    # 检查系统信息
    uname -a > "\$REPORT_DIR/\$DATE/system_info.txt"
    
    # 检查已安装的包
    rpm -qa --last > "\$REPORT_DIR/\$DATE/installed_packages.txt"
    
    # 检查运行的服务
    systemctl list-units --type=service > "\$REPORT_DIR/\$DATE/running_services.txt"
    
    # 检查开机启动项
    systemctl list-unit-files --type=service > "\$REPORT_DIR/\$DATE/service_status.txt"
    
    # 检查系统用户
    cat /etc/passwd > "\$REPORT_DIR/\$DATE/system_users.txt"
    
    # 检查特权用户
    grep -v -E "^#" /etc/sudoers > "\$REPORT_DIR/\$DATE/sudo_users.txt"
    
    log "系统基线检查完成"
}

# 漏洞扫描
scan_vulnerabilities() {
    log "执行漏洞扫描..."
    
    # 更新漏洞数据库
    yum update openscap-scanner -y
    
    # 执行扫描
    oscap oval eval --results "\$REPORT_DIR/\$DATE/vulnerability_scan.xml" \\
                    --report "\$REPORT_DIR/\$DATE/vulnerability_report.html" \\
                    /usr/share/xml/scap/ssg/content/ssg-rhel7-ds.xml
    
    log "漏洞扫描完成"
}

# 配置检查
check_configurations() {
    log "检查安全配置..."
    
    # 检查SELinux状态
    sestatus > "\$REPORT_DIR/\$DATE/selinux_status.txt"
    
    # 检查防火墙规则
    iptables-save > "\$REPORT_DIR/\$DATE/firewall_rules.txt"
    
    # 检查SSH配置
    sshd -T > "\$REPORT_DIR/\$DATE/ssh_config.txt"
    
    # 检查密码策略
    cat /etc/security/pwquality.conf > "\$REPORT_DIR/\$DATE/password_policy.txt"
    
    # 检查审计配置
    auditctl -l > "\$REPORT_DIR/\$DATE/audit_rules.txt"
    
    log "安全配置检查完成"
}

# 生成报告
generate_report() {
    log "生成评估报告..."
    
    cat > "\$REPORT_DIR/\$DATE/assessment_report.html" << EOF
<!DOCTYPE html>
<html>
<head>
    <title>安全评估报告 - \$DATE</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { color: #333; }
        .section { margin: 20px 0; }
        .finding { margin: 10px 0; padding: 10px; border: 1px solid #ddd; }
    </style>
</head>
<body>
    <h1>安全评估报告</h1>
    <div class="section">
        <h2>系统信息</h2>
        <pre>\\\$(cat "\$REPORT_DIR/\$DATE/system_info.txt")</pre>
    </div>
    <div class="section">
        <h2>漏洞扫描结果</h2>
        <pre>\\\$(cat "\$REPORT_DIR/\$DATE/vulnerability_scan.xml")</pre>
    </div>
    <div class="section">
        <h2>配置检查结果</h2>
        <pre>\\\$(cat "\$REPORT_DIR/\$DATE/selinux_status.txt")</pre>
    </div>
</body>
</html>
EOF
    
    log "评估报告生成完成"
}

# 主函数
main() {
    log "开始安全评估..."
    
    check_system_baseline
    scan_vulnerabilities
    check_configurations
    generate_report
    
    log "安全评估完成"
}

main`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'monitor' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">监控告警</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 系统监控</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="mb-2">Prometheus监控配置示例：</p>
                <pre className="bg-gray-200 p-2 rounded text-xs overflow-x-auto">
                  <code>{`# prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

alerting:
  alertmanagers:
    - static_configs:
        - targets: ['localhost:9093']

rule_files:
  - "alert_rules.yml"

scrape_configs:
  - job_name: 'node'
    static_configs:
      - targets: ['localhost:9100']
    metrics_path: '/metrics'
    scheme: 'https'
    tls_config:
      cert_file: '/etc/prometheus/certs/node-exporter.crt'
      key_file: '/etc/prometheus/certs/node-exporter.key'

  - job_name: 'app'
    static_configs:
      - targets: ['localhost:8080']
    metrics_path: '/metrics'
    scheme: 'https'
    tls_config:
      cert_file: '/etc/prometheus/certs/app.crt'
      key_file: '/etc/prometheus/certs/app.key'

# alert_rules.yml
groups:
  - name: system_alerts
    rules:
      - alert: HighCPUUsage
        expr: 100 - (avg by(instance) (irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 80
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "高CPU使用率"
          description: "实例 {{ $labels.instance }} CPU使用率超过80%"

      - alert: HighMemoryUsage
        expr: (node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes) / node_memory_MemTotal_bytes * 100 > 85
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "高内存使用率"
          description: "实例 {{ $labels.instance }} 内存使用率超过85%"

      - alert: DiskSpaceLow
        expr: (node_filesystem_size_bytes - node_filesystem_free_bytes) / node_filesystem_size_bytes * 100 > 90
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "磁盘空间不足"
          description: "实例 {{ $labels.instance }} 磁盘使用率超过90%"

      - alert: ServiceDown
        expr: up == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "服务不可用"
          description: "实例 {{ $labels.instance }} 已停止响应"`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">2. 日志监控</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="mb-2">ELK日志监控配置示例：</p>
                <pre className="bg-gray-200 p-2 rounded text-xs overflow-x-auto">
                  <code>{`# filebeat.yml
filebeat.inputs:
- type: log
  enabled: true
  paths:
    - /var/log/nginx/*.log
  fields:
    type: nginx
  fields_under_root: true
  json.keys_under_root: true
  json.add_error_key: true

- type: log
  enabled: true
  paths:
    - /var/log/app/*.log
  fields:
    type: application
  fields_under_root: true
  json.keys_under_root: true
  json.add_error_key: true

processors:
  - add_host_metadata: ~
  - add_cloud_metadata: ~
  - add_docker_metadata: ~
  - add_kubernetes_metadata: ~

output.elasticsearch:
  hosts: ["localhost:9200"]
  protocol: https
  ssl.certificate: "/etc/filebeat/certs/filebeat.crt"
  ssl.key: "/etc/filebeat/certs/filebeat.key"
  ssl.verification_mode: "certificate"

# logstash.conf
input {
  beats {
    port => 5044
    ssl => true
    ssl_certificate => "/etc/logstash/certs/logstash.crt"
    ssl_key => "/etc/logstash/certs/logstash.key"
  }
}

filter {
  if [type] == "nginx" {
    grok {
      match => { "message" => "%{COMBINEDAPACHELOG}" }
    }
    date {
      match => [ "timestamp", "dd/MMM/yyyy:HH:mm:ss Z" ]
    }
  }
  
  if [type] == "application" {
    json {
      source => "message"
    }
    date {
      match => [ "@timestamp", "ISO8601" ]
    }
  }
}

output {
  elasticsearch {
    hosts => ["localhost:9200"]
    index => "%{[@metadata][beat]}-%{[@metadata][version]}-%{+YYYY.MM.dd}"
    ssl => true
    ssl_certificate_verification => true
    ssl_certificate => "/etc/logstash/certs/logstash.crt"
    ssl_key => "/etc/logstash/certs/logstash.key"
  }
}`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">3. 告警配置</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="mb-2">Alertmanager配置示例：</p>
                <pre className="bg-gray-200 p-2 rounded text-xs overflow-x-auto">
                  <code>{`# alertmanager.yml
global:
  resolve_timeout: 5m
  smtp_smarthost: 'smtp.example.com:587'
  smtp_from: 'alertmanager@example.com'
  smtp_auth_username: 'alertmanager'
  smtp_auth_password: 'password'

route:
  group_by: ['alertname', 'cluster', 'service']
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 4h
  receiver: 'team-ops'
  routes:
  - match:
      severity: critical
    receiver: 'team-ops-pager'
    repeat_interval: 1h

receivers:
- name: 'team-ops'
  email_configs:
  - to: 'team-ops@example.com'
    send_resolved: true

- name: 'team-ops-pager'
  email_configs:
  - to: 'team-ops-pager@example.com'
    send_resolved: true
  webhook_configs:
  - url: 'http://pagerduty-api-url'
    send_resolved: true

inhibit_rules:
  - source_match:
      severity: 'critical'
    target_match:
      severity: 'warning'
    equal: ['alertname', 'cluster', 'service']`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'incident' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">应急响应</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold">1. 应急响应流程</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ul className="list-disc pl-6 mb-4">
                  <li>发现与报告
                    <ul className="list-disc pl-6 mt-2 text-sm">
                      <li>监控系统告警</li>
                      <li>用户报告</li>
                      <li>安全设备告警</li>
                      <li>日志异常</li>
                    </ul>
                  </li>
                  <li>分类与分级
                    <ul className="list-disc pl-6 mt-2 text-sm">
                      <li>事件类型判断</li>
                      <li>影响范围评估</li>
                      <li>危害程度评估</li>
                      <li>响应级别确定</li>
                    </ul>
                  </li>
                  <li>响应与处置
                    <ul className="list-disc pl-6 mt-2 text-sm">
                      <li>应急小组启动</li>
                      <li>证据收集</li>
                      <li>现场处置</li>
                      <li>系统恢复</li>
                    </ul>
                  </li>
                  <li>总结与改进
                    <ul className="list-disc pl-6 mt-2 text-sm">
                      <li>事件分析</li>
                      <li>原因溯源</li>
                      <li>改进建议</li>
                      <li>预防措施</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <h4 className="font-semibold">2. 应急处置脚本</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="mb-2">应急处置脚本示例：</p>
                <pre className="bg-gray-200 p-2 rounded text-xs overflow-x-auto">
                  <code>{`#!/bin/bash
# incident_response.sh

# 配置变量
LOG_FILE="/var/log/incident_response.log"
BACKUP_DIR="/var/backups/incident"
DATE=\\\$(date +%Y%m%d_%H%M%S)
EVIDENCE_DIR="/var/evidence/\$DATE"

# 日志函数
log() {
    echo "[\\$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "\$LOG_FILE"
}

# 收集系统信息
collect_system_info() {
    log "收集系统信息..."
    
    mkdir -p "\$EVIDENCE_DIR/system"
    
    # 系统基本信息
    uname -a > "\$EVIDENCE_DIR/system/uname.txt"
    uptime > "\$EVIDENCE_DIR/system/uptime.txt"
    free -m > "\$EVIDENCE_DIR/system/memory.txt"
    df -h > "\$EVIDENCE_DIR/system/disk.txt"
    
    # 进程信息
    ps auxf > "\$EVIDENCE_DIR/system/processes.txt"
    lsof > "\$EVIDENCE_DIR/system/open_files.txt"
    
    # 网络信息
    netstat -antup > "\$EVIDENCE_DIR/system/network_connections.txt"
    netstat -rn > "\$EVIDENCE_DIR/system/routing_table.txt"
    iptables-save > "\$EVIDENCE_DIR/system/firewall_rules.txt"
    
    log "系统信息收集完成"
}

# 收集日志
collect_logs() {
    log "收集日志..."
    
    mkdir -p "\$EVIDENCE_DIR/logs"
    
    # 系统日志
    cp /var/log/messages* "\$EVIDENCE_DIR/logs/"
    cp /var/log/secure* "\$EVIDENCE_DIR/logs/"
    cp /var/log/audit/audit.log* "\$EVIDENCE_DIR/logs/"
    
    # 应用日志
    cp /var/log/nginx/* "\$EVIDENCE_DIR/logs/nginx/"
    cp /var/log/apache2/* "\$EVIDENCE_DIR/logs/apache/"
    cp /var/log/mysql/* "\$EVIDENCE_DIR/logs/mysql/"
    
    # 压缩日志
    cd "\$EVIDENCE_DIR"
    tar -czf logs.tar.gz logs/
    
    log "日志收集完成"
}

# 网络分析
analyze_network() {
    log "分析网络..."
    
    mkdir -p "\$EVIDENCE_DIR/network"
    
    # 捕获网络流量
    tcpdump -i any -w "\$EVIDENCE_DIR/network/capture.pcap" &
    TCPDUMP_PID=\$!
    sleep 300  # 捕获5分钟
    kill \$TCPDUMP_PID
    
    # 分析可疑连接
    netstat -antup | grep ESTABLISHED > "\$EVIDENCE_DIR/network/established_connections.txt"
    netstat -antup | grep LISTEN > "\$EVIDENCE_DIR/network/listening_ports.txt"
    
    log "网络分析完成"
}

# 进程分析
analyze_processes() {
    log "分析进程..."
    
    mkdir -p "\$EVIDENCE_DIR/processes"
    
    # 检查可疑进程
    ps auxf | grep -i "COMMAND\\|defunct\\|zombie\\|root" > "\$EVIDENCE_DIR/processes/suspicious.txt"
    
    # 检查定时任务
    crontab -l > "\$EVIDENCE_DIR/processes/crontab.txt"
    ls -la /etc/cron* > "\$EVIDENCE_DIR/processes/cron_jobs.txt"
    
    # 检查启动项
    systemctl list-unit-files > "\$EVIDENCE_DIR/processes/systemd_units.txt"
    
    log "进程分析完成"
}

# 文件分析
analyze_files() {
    log "分析文件..."
    
    mkdir -p "\$EVIDENCE_DIR/files"
    
    # 查找最近修改的文件
    find / -type f -mtime -1 > "\$EVIDENCE_DIR/files/recent_modified.txt"
    
    # 查找SUID文件
    find / -perm -4000 > "\$EVIDENCE_DIR/files/suid_files.txt"
    
    # 查找可疑文件
    find / -name "*.php" -o -name "*.jsp" -o -name "*.asp" > "\$EVIDENCE_DIR/files/web_files.txt"
    
    log "文件分析完成"
}

# 系统加固
harden_system() {
    log "执行系统加固..."
    
    # 停止可疑进程
    for pid in \\\$(ps aux | grep -i "suspicious_process" | awk '{print \$2}'); do
        kill -9 \$pid
    done
    
    # 删除可疑文件
    find / -name "*.php" -mtime -1 -delete
    
    # 重置防火墙规则
    iptables -F
    iptables -P INPUT DROP
    iptables -P FORWARD DROP
    iptables -P OUTPUT ACCEPT
    iptables -A INPUT -i lo -j ACCEPT
    iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
    iptables -A INPUT -p tcp --dport 22 -j ACCEPT
    
    # 更新密码策略
    sed -i 's/PASS_MAX_DAYS.*/PASS_MAX_DAYS   90/' /etc/login.defs
    sed -i 's/PASS_MIN_DAYS.*/PASS_MIN_DAYS   7/' /etc/login.defs
    sed -i 's/PASS_WARN_AGE.*/PASS_WARN_AGE   14/' /etc/login.defs
    
    log "系统加固完成"
}

# 生成报告
generate_report() {
    log "生成报告..."
    
    cat > "\$EVIDENCE_DIR/incident_report.html" << EOF
<!DOCTYPE html>
<html>
<head>
    <title>安全事件响应报告 - \$DATE</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { color: #333; }
        .section { margin: 20px 0; }
        .finding { margin: 10px 0; padding: 10px; border: 1px solid #ddd; }
    </style>
</head>
<body>
    <h1>安全事件响应报告</h1>
    <div class="section">
        <h2>事件概述</h2>
        <p>时间：\\\$(date)</p>
        <p>类型：安全事件响应</p>
    </div>
    <div class="section">
        <h2>系统信息</h2>
        <pre>\\\$(cat "\$EVIDENCE_DIR/system/uname.txt")</pre>
    </div>
    <div class="section">
        <h2>网络分析</h2>
        <pre>\\\$(cat "\$EVIDENCE_DIR/network/established_connections.txt")</pre>
    </div>
    <div class="section">
        <h2>进程分析</h2>
        <pre>\\\$(cat "\$EVIDENCE_DIR/processes/suspicious.txt")</pre>
    </div>
    <div class="section">
        <h2>处置措施</h2>
        <ul>
            <li>系统加固</li>
            <li>删除可疑文件</li>
            <li>更新安全策略</li>
        </ul>
    </div>
</body>
</html>
EOF
    
    log "报告生成完成"
}

# 主函数
main() {
    log "开始应急响应..."
    
    collect_system_info
    collect_logs
    analyze_network
    analyze_processes
    analyze_files
    harden_system
    generate_report
    
    log "应急响应完成"
}

main`}</code>
                </pre>
              </div>

              <h4 className="font-semibold">3. 应急预案</h4>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <ul className="list-disc pl-6 mb-4">
                  <li>DDoS攻击预案
                    <ul className="list-disc pl-6 mt-2 text-sm">
                      <li>启动流量清洗</li>
                      <li>开启防护策略</li>
                      <li>调整系统配置</li>
                      <li>通知相关方</li>
                    </ul>
                  </li>
                  <li>数据泄露预案
                    <ul className="list-disc pl-6 mt-2 text-sm">
                      <li>隔离受影响系统</li>
                      <li>排查泄露源</li>
                      <li>评估影响范围</li>
                      <li>采取补救措施</li>
                    </ul>
                  </li>
                  <li>系统入侵预案
                    <ul className="list-disc pl-6 mt-2 text-sm">
                      <li>断开网络连接</li>
                      <li>保存现场证据</li>
                      <li>分析入侵途径</li>
                      <li>清除后门</li>
                    </ul>
                  </li>
                  <li>勒索软件预案
                    <ul className="list-disc pl-6 mt-2 text-sm">
                      <li>隔离受感染主机</li>
                      <li>备份重要数据</li>
                      <li>分析传播途径</li>
                      <li>系统恢复</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 导航链接 */}
        <div className="mt-8 flex justify-between">
          <Link
            href="/study/security/dev/deploy"
            className="px-4 py-2 text-blue-600 hover:text-blue-800"
          >
            ← 安全部署
          </Link>
          <Link
            href="/study/security/dev/project"
            className="px-4 py-2 text-blue-600 hover:text-blue-800"
          >
            安全项目管理 →
          </Link>
        </div>
      </div>
    </div>
  );
} 
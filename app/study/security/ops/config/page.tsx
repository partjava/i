'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function SecurityOpsConfigPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 顶部返回导航 */}
      <div className="mb-4">
        <Link href="/study/security/ops" className="px-4 py-2 text-blue-600 hover:text-blue-800">← 返回安全运维</Link>
      </div>
      <h1 className="text-3xl font-bold mb-8">配置管理</h1>

      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        <button onClick={() => setActiveTab('overview')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>概述</button>
        <button onClick={() => setActiveTab('baseline')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'baseline' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>基线配置</button>
        <button onClick={() => setActiveTab('change')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'change' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>变更管理</button>
        <button onClick={() => setActiveTab('compliance')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'compliance' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>合规检查</button>
        <button onClick={() => setActiveTab('automation')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'automation' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>自动化管理</button>
        <button onClick={() => setActiveTab('case')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'case' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>实践案例</button>
      </div>

      {/* 内容区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">配置管理概述</h3>
            <div className="prose max-w-none">
              <p>配置管理是安全运维的核心工作之一，通过建立和维护系统配置基线，确保系统安全性和稳定性。配置管理需要建立规范的流程，确保配置变更的可控性和可追溯性。</p>
              <ul className="list-disc pl-6">
                <li>建立配置基线</li>
                <li>管理配置变更</li>
                <li>执行合规检查</li>
                <li>自动化配置管理</li>
                <li>配置审计和报告</li>
              </ul>
            </div>
          </div>
        )}
        {activeTab === 'baseline' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">基线配置管理</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold text-lg mb-2">基线配置工具</h4>
              <ul className="list-disc pl-6">
                <li>OpenSCAP</li>
                <li>CIS-CAT</li>
                <li>Ansible</li>
                <li>自定义基线脚本</li>
              </ul>
              <h4 className="font-semibold text-lg mb-2">OpenSCAP基线配置示例</h4>
              <pre className="bg-gray-100 p-4 rounded mb-4">
{`# 安装OpenSCAP工具
yum install -y openscap-scanner scap-security-guide

# 生成基线扫描报告
oscap xccdf eval --profile xccdf_org.ssgproject.content_profile_rht-ccp \\
    --results scan-results.xml \\
    --report scan-report.html \\
    /usr/share/xml/scap/ssg/content/ssg-rhel7-ds.xml

# 自动修复基线问题
oscap xccdf eval --profile xccdf_org.ssgproject.content_profile_rht-ccp \\
    --remediate \\
    /usr/share/xml/scap/ssg/content/ssg-rhel7-ds.xml`}
              </pre>
              <h4 className="font-semibold text-lg mb-2">Ansible基线配置示例</h4>
              <pre className="bg-gray-100 p-4 rounded mb-4">
{`---
# 系统基线配置Playbook
- name: 系统基线配置
  hosts: all
  become: yes
  tasks:
    - name: 配置密码策略
      lineinfile:
        path: /etc/login.defs
        regexp: "^{{ item.key }}"
        line: "{{ item.key }} {{ item.value }}"
      with_items:
        - { key: "PASS_MAX_DAYS", value: "90" }
        - { key: "PASS_MIN_DAYS", value: "7" }
        - { key: "PASS_MIN_LEN", value: "12" }
    
    - name: 配置SSH安全选项
      lineinfile:
        path: /etc/ssh/sshd_config
        regexp: "^{{ item.key }}"
        line: "{{ item.key }} {{ item.value }}"
      with_items:
        - { key: "PermitRootLogin", value: "no" }
        - { key: "Protocol", value: "2" }
        - { key: "X11Forwarding", value: "no" }
        - { key: "MaxAuthTries", value: "3" }
      notify: restart sshd
    
    - name: 配置防火墙规则
      firewalld:
        service: "{{ item }}"
        permanent: yes
        state: enabled
      with_items:
        - ssh
        - http
        - https
    
    - name: 配置系统审计
      lineinfile:
        path: /etc/audit/audit.rules
        line: "{{ item }}"
      with_items:
        - "-w /etc/passwd -p wa -k identity"
        - "-w /etc/group -p wa -k identity"
        - "-w /etc/shadow -p wa -k identity"
        - "-w /etc/sudoers -p wa -k sudoers"
      notify: restart auditd
    
    - name: 配置系统日志
      lineinfile:
        path: /etc/rsyslog.conf
        line: "{{ item }}"
      with_items:
        - "*.info;mail.none;authpriv.none;cron.none /var/log/messages"
        - "authpriv.* /var/log/secure"
        - "*.emerg :omusrmsg:*"
    
    - name: 配置系统限制
      lineinfile:
        path: /etc/security/limits.conf
        line: "{{ item }}"
      with_items:
        - "* soft nofile 65535"
        - "* hard nofile 65535"
        - "* soft nproc 65535"
        - "* hard nproc 65535"
    
    - name: 配置系统服务
      service:
        name: "{{ item.name }}"
        state: "{{ item.state }}"
        enabled: "{{ item.enabled }}"
      with_items:
        - { name: "firewalld", state: "started", enabled: "yes" }
        - { name: "auditd", state: "started", enabled: "yes" }
        - { name: "rsyslog", state: "started", enabled: "yes" }
    
  handlers:
    - name: restart sshd
      service:
        name: sshd
        state: restarted
    
    - name: restart auditd
      service:
        name: auditd
        state: restarted`}
              </pre>
            </div>
          </div>
        )}
        {activeTab === 'change' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">配置变更管理</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold text-lg mb-2">变更管理工具</h4>
              <ul className="list-disc pl-6">
                <li>Git版本控制</li>
                <li>Ansible Tower</li>
                <li>Puppet Enterprise</li>
                <li>自定义变更脚本</li>
              </ul>
              <h4 className="font-semibold text-lg mb-2">Python配置变更管理脚本示例</h4>
              <pre className="bg-gray-100 p-4 rounded mb-4">
{`import os
import json
import logging
import subprocess
from datetime import datetime
from typing import Dict, List
from dataclasses import dataclass
from enum import Enum

class ChangeStatus(Enum):
    PENDING = "pending"
    APPROVED = "approved"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    FAILED = "failed"
    ROLLED_BACK = "rolled_back"

@dataclass
class ConfigChange:
    id: str
    description: str
    target_systems: List[str]
    changes: List[Dict]
    status: ChangeStatus
    requester: str
    approver: str
    created_at: datetime
    completed_at: datetime = None
    rollback_plan: Dict = None

class ConfigChangeManager:
    def __init__(self, config_path: str):
        self.config_path = config_path
        self.changes: Dict[str, ConfigChange] = {}
        self.logger = self._setup_logger()
        self._load_config()
    
    def _setup_logger(self):
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            filename=f'config_change_{datetime.now().strftime("%Y%m%d")}.log'
        )
        return logging.getLogger(__name__)
    
    def _load_config(self):
        """加载配置文件"""
        try:
            with open(self.config_path, 'r') as f:
                self.config = json.load(f)
        except Exception as e:
            self.logger.error(f"Error loading config: {e}")
            self.config = {}
    
    def create_change(self, change: ConfigChange):
        """创建配置变更请求"""
        self.changes[change.id] = change
        self.logger.info(f"Created change request: {change.id}")
    
    def approve_change(self, change_id: str, approver: str):
        """审批配置变更"""
        if change_id in self.changes:
            change = self.changes[change_id]
            change.status = ChangeStatus.APPROVED
            change.approver = approver
            self.logger.info(f"Change {change_id} approved by {approver}")
    
    def execute_change(self, change_id: str) -> bool:
        """执行配置变更"""
        if change_id not in self.changes:
            return False
        
        change = self.changes[change_id]
        if change.status != ChangeStatus.APPROVED:
            return False
        
        change.status = ChangeStatus.IN_PROGRESS
        success = True
        
        try:
            # 备份当前配置
            self._backup_configs(change)
            
            # 执行变更
            for system in change.target_systems:
                for config_change in change.changes:
                    result = self._apply_change(system, config_change)
                    if not result['success']:
                        success = False
                        break
            
            if success:
                change.status = ChangeStatus.COMPLETED
                change.completed_at = datetime.now()
            else:
                self.rollback_change(change_id)
        except Exception as e:
            self.logger.error(f"Error executing change {change_id}: {e}")
            self.rollback_change(change_id)
            success = False
        
        return success
    
    def rollback_change(self, change_id: str) -> bool:
        """回滚配置变更"""
        if change_id not in self.changes:
            return False
        
        change = self.changes[change_id]
        if not change.rollback_plan:
            return False
        
        try:
            # 执行回滚
            for system in change.target_systems:
                for rollback_step in change.rollback_plan.get(system, []):
                    result = self._apply_change(system, rollback_step)
                    if not result['success']:
                        return False
            
            change.status = ChangeStatus.ROLLED_BACK
            return True
        except Exception as e:
            self.logger.error(f"Error rolling back change {change_id}: {e}")
            return False
    
    def _backup_configs(self, change: ConfigChange):
        """备份配置"""
        for system in change.target_systems:
            for config_change in change.changes:
                backup_path = f"backups/{change.id}/{system}/{config_change['file']}"
                os.makedirs(os.path.dirname(backup_path), exist_ok=True)
                
                cmd = f"ssh {system} 'cat {config_change['file']}' > {backup_path}"
                subprocess.run(cmd, shell=True, check=True)
    
    def _apply_change(self, system: str, change: Dict) -> Dict:
        """应用配置变更"""
        try:
            if change['type'] == 'file':
                # 文件变更
                cmd = f"ssh {system} 'echo \"{change['content']}\" > {change['file']}'"
            elif change['type'] == 'service':
                # 服务变更
                cmd = f"ssh {system} 'systemctl {change['action']} {change['service']}'"
            else:
                return {'success': False, 'error': 'Unsupported change type'}
            
            result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
            return {
                'success': result.returncode == 0,
                'output': result.stdout,
                'error': result.stderr
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e)
            }

# 使用示例
if __name__ == '__main__':
    # 创建配置变更管理器
    ccm = ConfigChangeManager('config_change.json')
    
    # 创建配置变更请求
    change = ConfigChange(
        id='CHANGE-2024-001',
        description='更新SSH配置',
        target_systems=['server1', 'server2'],
        changes=[
            {
                'type': 'file',
                'file': '/etc/ssh/sshd_config',
                'content': 'PermitRootLogin no\nMaxAuthTries 3'
            }
        ],
        status=ChangeStatus.PENDING,
        requester='admin',
        approver='',
        created_at=datetime.now()
    )
    
    # 添加变更请求
    ccm.create_change(change)
    
    # 审批变更
    ccm.approve_change('CHANGE-2024-001', 'security_admin')
    
    # 执行变更
    if ccm.execute_change('CHANGE-2024-001'):
        print("配置变更成功")
    else:
        print("配置变更失败，已回滚")`}
              </pre>
            </div>
          </div>
        )}
        {activeTab === 'compliance' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">配置合规检查</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold text-lg mb-2">合规检查工具</h4>
              <ul className="list-disc pl-6">
                <li>OpenSCAP合规检查</li>
                <li>CIS基准检查</li>
                <li>自定义合规脚本</li>
                <li>合规报告生成</li>
              </ul>
              <h4 className="font-semibold text-lg mb-2">Python合规检查脚本示例</h4>
              <pre className="bg-gray-100 p-4 rounded mb-4">
{`import os
import json
import logging
import subprocess
from datetime import datetime
from typing import Dict, List
from dataclasses import dataclass
from enum import Enum

class ComplianceLevel(Enum):
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"

@dataclass
class ComplianceCheck:
    id: str
    name: str
    description: str
    level: ComplianceLevel
    check_command: str
    remediation_command: str
    expected_result: str

class ComplianceChecker:
    def __init__(self, config_path: str):
        self.config_path = config_path
        self.checks: List[ComplianceCheck] = []
        self.logger = self._setup_logger()
        self._load_config()
    
    def _setup_logger(self):
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            filename=f'compliance_check_{datetime.now().strftime("%Y%m%d")}.log'
        )
        return logging.getLogger(__name__)
    
    def _load_config(self):
        """加载合规检查配置"""
        try:
            with open(self.config_path, 'r') as f:
                config = json.load(f)
                for check in config['checks']:
                    self.checks.append(ComplianceCheck(**check))
        except Exception as e:
            self.logger.error(f"Error loading config: {e}")
    
    def run_check(self, target: str, check_id: str = None) -> Dict:
        """运行合规检查"""
        results = {
            'target': target,
            'timestamp': datetime.now().isoformat(),
            'checks': []
        }
        
        checks_to_run = [c for c in self.checks if check_id is None or c.id == check_id]
        
        for check in checks_to_run:
            try:
                # 执行检查命令
                cmd = f"ssh {target} '{check.check_command}'"
                result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
                
                check_result = {
                    'id': check.id,
                    'name': check.name,
                    'level': check.level.value,
                    'status': 'passed' if result.stdout.strip() == check.expected_result else 'failed',
                    'output': result.stdout,
                    'error': result.stderr
                }
                
                results['checks'].append(check_result)
                self.logger.info(f"Check {check.id} completed with status {check_result['status']}")
            except Exception as e:
                self.logger.error(f"Error running check {check.id}: {e}")
                results['checks'].append({
                    'id': check.id,
                    'name': check.name,
                    'level': check.level.value,
                    'status': 'error',
                    'error': str(e)
                })
        
        return results
    
    def remediate(self, target: str, check_id: str) -> Dict:
        """修复不合规项"""
        check = next((c for c in self.checks if c.id == check_id), None)
        if not check:
            return {'success': False, 'error': 'Check not found'}
        
        try:
            # 执行修复命令
            cmd = f"ssh {target} '{check.remediation_command}'"
            result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
            
            return {
                'success': result.returncode == 0,
                'output': result.stdout,
                'error': result.stderr
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e)
            }
    
    def generate_report(self, results: Dict) -> str:
        """生成合规报告"""
        report = f"""合规检查报告
目标系统: {results['target']}
检查时间: {results['timestamp']}

检查结果:
"""
        
        for check in results['checks']:
            report += f"""
检查项: {check['name']}
级别: {check['level']}
状态: {check['status']}
输出: {check['output']}
"""
            if check['error']:
                report += f"错误: {check['error']}\n"
        
        return report

# 使用示例
if __name__ == '__main__':
    # 创建合规检查器
    checker = ComplianceChecker('compliance_config.json')
    
    # 运行所有检查
    results = checker.run_check('server1')
    
    # 生成报告
    report = checker.generate_report(results)
    print(report)
    
    # 修复不合规项
    for check in results['checks']:
        if check['status'] == 'failed':
            print(f"修复检查项 {check['name']}...")
            result = checker.remediate('server1', check['id'])
            if result['success']:
                print("修复成功")
            else:
                print(f"修复失败: {result['error']}")`}
              </pre>
            </div>
          </div>
        )}
        {activeTab === 'automation' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">自动化配置管理</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold text-lg mb-2">自动化工具</h4>
              <ul className="list-disc pl-6">
                <li>Ansible自动化</li>
                <li>Puppet自动化</li>
                <li>Chef自动化</li>
                <li>自定义自动化脚本</li>
              </ul>
              <h4 className="font-semibold text-lg mb-2">Ansible自动化配置示例</h4>
              <pre className="bg-gray-100 p-4 rounded mb-4">
{`---
# 自动化配置管理Playbook
- name: 自动化配置管理
  hosts: all
  become: yes
  vars:
    config_version: "1.0.0"
    backup_dir: "/backup/configs"
  
  tasks:
    - name: 创建备份目录
      file:
        path: "{{ backup_dir }}"
        state: directory
        mode: '0755'
    
    - name: 备份当前配置
      shell: |
        timestamp=$(date +%Y%m%d_%H%M%S)
        tar -czf {{ backup_dir }}/config_backup_$+{timestamp}.tar.gz /etc
      args:
        creates: "{{ backup_dir }}/config_backup_*.tar.gz"
    
    - name: 配置系统参数
      lineinfile:
        path: /etc/sysctl.conf
        regexp: "^{{ item.key }}"
        line: "{{ item.key }} = {{ item.value }}"
      with_items:
        - { key: "net.ipv4.ip_forward", value: "0" }
        - { key: "net.ipv4.conf.all.accept_redirects", value: "0" }
        - { key: "net.ipv4.conf.all.accept_source_route", value: "0" }
        - { key: "net.ipv4.conf.all.log_martians", value: "1" }
      notify: reload sysctl
    
    - name: 配置系统服务
      service:
        name: "{{ item.name }}"
        state: "{{ item.state }}"
        enabled: "{{ item.enabled }}"
      with_items:
        - { name: "firewalld", state: "started", enabled: "yes" }
        - { name: "auditd", state: "started", enabled: "yes" }
        - { name: "rsyslog", state: "started", enabled: "yes" }
    
    - name: 配置系统日志
      template:
        src: templates/rsyslog.conf.j2
        dest: /etc/rsyslog.conf
        mode: '0644'
      notify: restart rsyslog
    
    - name: 配置审计规则
      template:
        src: templates/audit.rules.j2
        dest: /etc/audit/audit.rules
        mode: '0640'
      notify: restart auditd
    
    - name: 配置防火墙规则
      firewalld:
        service: "{{ item }}"
        permanent: yes
        state: enabled
      with_items:
        - ssh
        - http
        - https
    
    - name: 配置SSH服务
      template:
        src: templates/sshd_config.j2
        dest: /etc/ssh/sshd_config
        mode: '0600'
      notify: restart sshd
    
    - name: 配置系统限制
      template:
        src: templates/limits.conf.j2
        dest: /etc/security/limits.conf
        mode: '0644'
    
    - name: 配置系统用户
      user:
        name: "{{ item.name }}"
        state: present
        groups: "{{ item.groups }}"
        shell: "{{ item.shell }}"
        password: "{{ item.password | password_hash('sha512') }}"
      with_items:
        - { name: "admin", groups: "wheel", shell: "/bin/bash", password: "{{ admin_password }}" }
        - { name: "auditor", groups: "audit", shell: "/bin/bash", password: "{{ auditor_password }}" }
    
    - name: 配置sudo权限
      template:
        src: templates/sudoers.j2
        dest: /etc/sudoers.d/security
        mode: '0440'
    
    - name: 配置系统监控
      template:
        src: templates/monitoring.conf.j2
        dest: /etc/monitoring/monitoring.conf
        mode: '0644'
      notify: restart monitoring
    
    - name: 验证配置
      shell: |
        # 检查系统服务状态
        systemctl is-active firewalld
        systemctl is-active auditd
        systemctl is-active rsyslog
        
        # 检查系统参数
        sysctl -a | grep -E "net.ipv4.ip_forward|net.ipv4.conf.all.accept_redirects"
        
        # 检查审计规则
        auditctl -l
        
        # 检查防火墙规则
        firewall-cmd --list-all
      register: verification_result
      changed_when: false
    
    - name: 显示验证结果
      debug:
        var: verification_result.stdout_lines
  
  handlers:
    - name: reload sysctl
      shell: sysctl -p
      changed_when: false
    
    - name: restart rsyslog
      service:
        name: rsyslog
        state: restarted
    
    - name: restart auditd
      service:
        name: auditd
        state: restarted
    
    - name: restart sshd
      service:
        name: sshd
        state: restarted
    
    - name: restart monitoring
      service:
        name: monitoring
        state: restarted`}
              </pre>
            </div>
          </div>
        )}
        {activeTab === 'case' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">配置管理实践案例</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold text-lg mb-2">案例：企业配置管理体系建设</h4>
              <ol className="list-decimal pl-6">
                <li>建立配置管理制度和流程</li>
                <li>部署自动化配置管理系统</li>
                <li>实施配置变更管理机制</li>
                <li>建立配置审计和报告机制</li>
                <li>定期进行配置管理评估</li>
              </ol>
              <h4 className="font-semibold text-lg mb-2">Python配置管理系统示例</h4>
              <pre className="bg-gray-100 p-4 rounded mb-4">
{`import os
import json
import logging
import subprocess
from datetime import datetime
from typing import Dict, List
from dataclasses import dataclass
from enum import Enum

class ConfigStatus(Enum):
    ACTIVE = "active"
    PENDING = "pending"
    DEPRECATED = "deprecated"
    TESTING = "testing"

@dataclass
class SystemConfig:
    id: str
    name: str
    description: str
    version: str
    status: ConfigStatus
    target_systems: List[str]
    config_files: List[Dict]
    dependencies: List[str]
    created_at: datetime
    updated_at: datetime = None

class ConfigManagementSystem:
    def __init__(self, config_path: str):
        self.config_path = config_path
        self.configs: Dict[str, SystemConfig] = {}
        self.logger = self._setup_logger()
        self._load_config()
    
    def _setup_logger(self):
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            filename=f'config_management_{datetime.now().strftime("%Y%m%d")}.log'
        )
        return logging.getLogger(__name__)
    
    def _load_config(self):
        """加载配置"""
        try:
            with open(self.config_path, 'r') as f:
                config = json.load(f)
                for cfg in config['configs']:
                    self.configs[cfg['id']] = SystemConfig(**cfg)
        except Exception as e:
            self.logger.error(f"Error loading config: {e}")
    
    def add_config(self, config: SystemConfig):
        """添加新配置"""
        self.configs[config.id] = config
        self.logger.info(f"Added new config: {config.id}")
    
    def update_config(self, config_id: str, updates: Dict):
        """更新配置"""
        if config_id in self.configs:
            config = self.configs[config_id]
            for key, value in updates.items():
                setattr(config, key, value)
            config.updated_at = datetime.now()
            self.logger.info(f"Updated config: {config_id}")
    
    def deploy_config(self, config_id: str) -> bool:
        """部署配置"""
        if config_id not in self.configs:
            return False
        
        config = self.configs[config_id]
        success = True
        
        try:
            # 备份当前配置
            self._backup_configs(config)
            
            # 部署新配置
            for system in config.target_systems:
                for config_file in config.config_files:
                    result = self._deploy_config_file(system, config_file)
                    if not result['success']:
                        success = False
                        break
            
            if success:
                config.status = ConfigStatus.ACTIVE
                config.updated_at = datetime.now()
            else:
                self.rollback_config(config_id)
        except Exception as e:
            self.logger.error(f"Error deploying config {config_id}: {e}")
            self.rollback_config(config_id)
            success = False
        
        return success
    
    def rollback_config(self, config_id: str) -> bool:
        """回滚配置"""
        if config_id not in self.configs:
            return False
        
        config = self.configs[config_id]
        try:
            # 恢复备份的配置
            for system in config.target_systems:
                for config_file in config.config_files:
                    result = self._restore_config_file(system, config_file)
                    if not result['success']:
                        return False
            
            config.status = ConfigStatus.DEPRECATED
            return True
        except Exception as e:
            self.logger.error(f"Error rolling back config {config_id}: {e}")
            return False
    
    def _backup_configs(self, config: SystemConfig):
        """备份配置"""
        for system in config.target_systems:
            for config_file in config.config_files:
                backup_path = f"backups/{config.id}/{system}/{config_file['path']}"
                os.makedirs(os.path.dirname(backup_path), exist_ok=True)
                
                cmd = f"ssh {system} 'cat {config_file['path']}' > {backup_path}"
                subprocess.run(cmd, shell=True, check=True)
    
    def _deploy_config_file(self, system: str, config_file: Dict) -> Dict:
        """部署配置文件"""
        try:
            # 创建临时文件
            temp_file = f"temp_{config_file['path'].replace('/', '_')}"
            with open(temp_file, 'w') as f:
                f.write(config_file['content'])
            
            # 传输文件
            cmd = f"scp {temp_file} {system}:{config_file['path']}"
            result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
            
            # 清理临时文件
            os.remove(temp_file)
            
            return {
                'success': result.returncode == 0,
                'output': result.stdout,
                'error': result.stderr
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e)
            }
    
    def _restore_config_file(self, system: str, config_file: Dict) -> Dict:
        """恢复配置文件"""
        try:
            backup_path = f"backups/{config_file['id']}/{system}/{config_file['path']}"
            cmd = f"scp {backup_path} {system}:{config_file['path']}"
            result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
            
            return {
                'success': result.returncode == 0,
                'output': result.stdout,
                'error': result.stderr
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e)
            }
    
    def verify_config(self, config_id: str) -> Dict:
        """验证配置"""
        if config_id not in self.configs:
            return {'success': False, 'error': 'Config not found'}
        
        config = self.configs[config_id]
        results = {
            'config_id': config_id,
            'timestamp': datetime.now().isoformat(),
            'systems': {}
        }
        
        for system in config.target_systems:
            system_results = []
            for config_file in config.config_files:
                try:
                    # 检查文件内容
                    cmd = f"ssh {system} 'cat {config_file['path']}'"
                    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
                    
                    system_results.append({
                        'file': config_file['path'],
                        'status': 'matched' if result.stdout == config_file['content'] else 'mismatched',
                        'content': result.stdout
                    })
                except Exception as e:
                    system_results.append({
                        'file': config_file['path'],
                        'status': 'error',
                        'error': str(e)
                    })
            
            results['systems'][system] = system_results
        
        return results

# 使用示例
if __name__ == '__main__':
    # 创建配置管理系统
    cms = ConfigManagementSystem('config_management.json')
    
    # 创建新配置
    config = SystemConfig(
        id='CONFIG-2024-001',
        name='安全基线配置',
        description='系统安全基线配置',
        version='1.0.0',
        status=ConfigStatus.PENDING,
        target_systems=['server1', 'server2'],
        config_files=[
            {
                'path': '/etc/ssh/sshd_config',
                'content': 'PermitRootLogin no\nMaxAuthTries 3'
            }
        ],
        dependencies=[],
        created_at=datetime.now()
    )
    
    # 添加配置
    cms.add_config(config)
    
    # 部署配置
    if cms.deploy_config('CONFIG-2024-001'):
        print("配置部署成功")
        
        # 验证配置
        results = cms.verify_config('CONFIG-2024-001')
        print(json.dumps(results, indent=2))
    else:
        print("配置部署失败，已回滚")`}
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/security/ops/patch"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回补丁管理
        </Link>
        <Link 
          href="/study/security/ops/incident"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          应急响应 →
        </Link>
      </div>
    </div>
  );
} 
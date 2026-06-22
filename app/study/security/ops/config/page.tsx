'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookList,
  TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: '配置管理',
  chapterNumber: 7,
  totalChapters: 4,
  subjectHref: '/study/security/ops',
  prevChapter: { label: '补丁管理', href: '/study/security/ops/patch' },
  nextChapter: { label: '应急响应', href: '/study/security/ops/incident' },
  theme: THEMES.security,
}

const SPREADS = [
  {
    label: '概述',
    left: (
      <div className="space-y-4">
        <PageTitle>配置管理概述</PageTitle>
        <BookParagraph>配置管理是安全运维的核心工作之一，通过建立和维护系统配置基线，确保系统安全性和稳定性。配置管理需要建立规范的流程，确保配置变更的可控性和可追溯性。</BookParagraph>
        <SectionTitle>配置管理目标</SectionTitle>
        <BookList items={[
          '建立配置基线',
          '管理配置变更',
          '执行合规检查',
          '自动化配置管理',
          '配置审计和报告',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>基线配置管理</PageTitle>
        <BookParagraph>基线配置管理是配置管理的基础工作，通过制定和实施安全配置基线，确保所有系统满足最低安全要求。常见的基线配置包括密码策略、SSH安全选项、防火墙规则、系统审计和日志配置等。</BookParagraph>
        <SectionTitle>基线配置工具</SectionTitle>
        <TagGrid items={[
          'OpenSCAP',
          'CIS-CAT',
          'Ansible',
          '自定义基线脚本',
        ]} />
      </div>
    ),
  },
  {
    label: '基线配置',
    left: (
      <div className="space-y-4">
        <PageTitle>OpenSCAP基线配置</PageTitle>
        <BookParagraph>OpenSCAP是一个开源的安全合规扫描工具，支持多种安全基线标准。它基于SCAP（Security Content Automation Protocol）协议，可以执行自动化安全扫描和合规检查。</BookParagraph>
        <BookCode language="bash" code={`# 安装OpenSCAP工具
yum install -y openscap-scanner scap-security-guide

# 生成基线扫描报告
oscap xccdf eval --profile xccdf_org.ssgproject.content_profile_rht-ccp \\
    --results scan-results.xml \\
    --report scan-report.html \\
    /usr/share/xml/scap/ssg/content/ssg-rhel7-ds.xml

# 自动修复基线问题
oscap xccdf eval --profile xccdf_org.ssgproject.content_profile_rht-ccp \\
    --remediate \\
    /usr/share/xml/scap/ssg/content/ssg-rhel7-ds.xml`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>Ansible基线配置</PageTitle>
        <BookParagraph>Ansible是一种自动化运维工具，可以用于批量配置系统基线。以下示例展示了一个完整的系统基线配置Playbook，涵盖密码策略、SSH安全、防火墙、审计、日志和系统服务等配置项。</BookParagraph>
        <BookCode language="yaml" code={`---
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
        state: restarted`} />
      </div>
    ),
  },
  {
    label: '变更管理',
    left: (
      <div className="space-y-4">
        <PageTitle>配置变更管理</PageTitle>
        <BookParagraph>配置变更管理是确保系统配置变更可控、可追溯的关键过程。通过规范的变更流程，可以有效降低变更风险，确保系统稳定运行。</BookParagraph>
        <SectionTitle>变更管理工具</SectionTitle>
        <TagGrid items={[
          'Git版本控制',
          'Ansible Tower',
          'Puppet Enterprise',
          '自定义变更脚本',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>Python变更管理脚本</PageTitle>
        <BookParagraph>以下示例展示了一个完整的Python配置变更管理系统，包含变更请求的创建、审批、执行和回滚等核心功能，支持多系统批量变更操作。</BookParagraph>
        <BookCode language="python" code={`import os
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
        try:
            with open(self.config_path, 'r') as f:
                self.config = json.load(f)
        except Exception as e:
            self.logger.error(f"Error loading config: {e}")
            self.config = {}

    def create_change(self, change: ConfigChange):
        self.changes[change.id] = change
        self.logger.info(f"Created change request: {change.id}")

    def approve_change(self, change_id: str, approver: str):
        if change_id in self.changes:
            change = self.changes[change_id]
            change.status = ChangeStatus.APPROVED
            change.approver = approver
            self.logger.info(f"Change {change_id} approved by {approver}")

    def execute_change(self, change_id: str) -> bool:
        if change_id not in self.changes:
            return False
        change = self.changes[change_id]
        if change.status != ChangeStatus.APPROVED:
            return False
        change.status = ChangeStatus.IN_PROGRESS
        success = True
        try:
            self._backup_configs(change)
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
        if change_id not in self.changes:
            return False
        change = self.changes[change_id]
        if not change.rollback_plan:
            return False
        try:
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
        for system in change.target_systems:
            for config_change in change.changes:
                backup_path = f"backups/{change.id}/{system}/{config_change['file']}"
                os.makedirs(os.path.dirname(backup_path), exist_ok=True)
                cmd = f"ssh {system} 'cat {config_change['file']}' > {backup_path}"
                subprocess.run(cmd, shell=True, check=True)

    def _apply_change(self, system: str, change: Dict) -> Dict:
        try:
            if change['type'] == 'file':
                cmd = f"ssh {system} 'echo \"{change['content']}\" > {change['file']}'"
            elif change['type'] == 'service':
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
            return {'success': False, 'error': str(e)}

# 使用示例
if __name__ == '__main__':
    ccm = ConfigChangeManager('config_change.json')
    change = ConfigChange(
        id='CHANGE-2024-001',
        description='更新SSH配置',
        target_systems=['server1', 'server2'],
        changes=[{
            'type': 'file',
            'file': '/etc/ssh/sshd_config',
            'content': 'PermitRootLogin no\\nMaxAuthTries 3'
        }],
        status=ChangeStatus.PENDING,
        requester='admin',
        approver='',
        created_at=datetime.now()
    )
    ccm.create_change(change)
    ccm.approve_change('CHANGE-2024-001', 'security_admin')
    if ccm.execute_change('CHANGE-2024-001'):
        print("配置变更成功")
    else:
        print("配置变更失败，已回滚")`} />
      </div>
    ),
  },
  {
    label: '合规检查',
    left: (
      <div className="space-y-4">
        <PageTitle>配置合规检查</PageTitle>
        <BookParagraph>合规检查是确保系统配置符合安全标准和法规要求的重要手段，通过定期检查可以发现配置偏差并及时修复。常见的合规标准包括CIS基准、等保2.0、ISO 27001等。</BookParagraph>
        <SectionTitle>合规检查工具</SectionTitle>
        <TagGrid items={[
          'OpenSCAP合规检查',
          'CIS基准检查',
          '自定义合规脚本',
          '合规报告生成',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>Python合规检查脚本</PageTitle>
        <BookParagraph>以下示例展示了一个完整的Python合规检查工具，支持定义自定义检查项、自动执行检查和修复，并生成合规报告。</BookParagraph>
        <BookCode language="python" code={`import os
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
        try:
            with open(self.config_path, 'r') as f:
                config = json.load(f)
                for check in config['checks']:
                    self.checks.append(ComplianceCheck(**check))
        except Exception as e:
            self.logger.error(f"Error loading config: {e}")

    def run_check(self, target: str, check_id: str = None) -> Dict:
        results = {
            'target': target,
            'timestamp': datetime.now().isoformat(),
            'checks': []
        }
        checks_to_run = [c for c in self.checks
                        if check_id is None or c.id == check_id]
        for check in checks_to_run:
            try:
                cmd = f"ssh {target} '{check.check_command}'"
                result = subprocess.run(cmd, shell=True,
                    capture_output=True, text=True)
                check_result = {
                    'id': check.id,
                    'name': check.name,
                    'level': check.level.value,
                    'status': 'passed' if result.stdout.strip()
                        == check.expected_result else 'failed',
                    'output': result.stdout,
                    'error': result.stderr
                }
                results['checks'].append(check_result)
                self.logger.info(f"Check {check.id} completed "
                    f"with status {check_result['status']}")
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
        check = next((c for c in self.checks if c.id == check_id), None)
        if not check:
            return {'success': False, 'error': 'Check not found'}
        try:
            cmd = f"ssh {target} '{check.remediation_command}'"
            result = subprocess.run(cmd, shell=True,
                capture_output=True, text=True)
            return {
                'success': result.returncode == 0,
                'output': result.stdout,
                'error': result.stderr
            }
        except Exception as e:
            return {'success': False, 'error': str(e)}

    def generate_report(self, results: Dict) -> str:
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
                report += f"错误: {check['error']}\\n"
        return report

# 使用示例
if __name__ == '__main__':
    checker = ComplianceChecker('compliance_config.json')
    results = checker.run_check('server1')
    report = checker.generate_report(results)
    print(report)
    for check in results['checks']:
        if check['status'] == 'failed':
            print(f"修复检查项 {check['name']}...")
            result = checker.remediate('server1', check['id'])
            if result['success']:
                print("修复成功")
            else:
                print(f"修复失败: {result['error']}")`} />
      </div>
    ),
  },
  {
    label: '自动化管理',
    left: (
      <div className="space-y-4">
        <PageTitle>自动化配置管理</PageTitle>
        <BookParagraph>自动化配置管理是提高运维效率、减少人为错误的关键手段。通过自动化工具，可以实现配置的标准化、批量部署和持续监控，确保系统配置的一致性和合规性。</BookParagraph>
        <SectionTitle>自动化工具</SectionTitle>
        <TagGrid items={[
          'Ansible自动化',
          'Puppet自动化',
          'Chef自动化',
          '自定义自动化脚本',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>Ansible自动化配置</PageTitle>
        <BookParagraph>以下示例展示了一个完整的Ansible自动化配置管理Playbook，涵盖配置备份、系统参数配置、服务管理、模板部署和配置验证等环节。</BookParagraph>
        <BookCode language="yaml" code={`---
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

    - name: 验证配置
      shell: |
        systemctl is-active firewalld
        systemctl is-active auditd
        systemctl is-active rsyslog
        sysctl -a | grep -E "net.ipv4.ip_forward|net.ipv4.conf.all.accept_redirects"
        auditctl -l
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
        state: restarted`} />
      </div>
    ),
  },
  {
    label: '实践案例',
    left: (
      <div className="space-y-4">
        <PageTitle>配置管理实践案例</PageTitle>
        <BookParagraph>以下是一个企业配置管理体系建设的完整案例，展示了从制度建设到自动化管理的全过程，帮助建立规范、高效的配置管理能力。</BookParagraph>
        <SectionTitle>企业配置管理体系建设</SectionTitle>
        <BookList items={[
          '建立配置管理制度和流程',
          '部署自动化配置管理系统',
          '实施配置变更管理机制',
          '建立配置审计和报告机制',
          '定期进行配置管理评估',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>Python配置管理系统</PageTitle>
        <BookParagraph>以下示例展示了一个完整的Python配置管理系统，支持配置的添加、更新、部署、回滚和验证等完整生命周期管理。</BookParagraph>
        <BookCode language="python" code={`import os
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
        try:
            with open(self.config_path, 'r') as f:
                config = json.load(f)
                for cfg in config['configs']:
                    self.configs[cfg['id']] = SystemConfig(**cfg)
        except Exception as e:
            self.logger.error(f"Error loading config: {e}")

    def add_config(self, config: SystemConfig):
        self.configs[config.id] = config
        self.logger.info(f"Added new config: {config.id}")

    def update_config(self, config_id: str, updates: Dict):
        if config_id in self.configs:
            config = self.configs[config_id]
            for key, value in updates.items():
                setattr(config, key, value)
            config.updated_at = datetime.now()
            self.logger.info(f"Updated config: {config_id}")

    def deploy_config(self, config_id: str) -> bool:
        if config_id not in self.configs:
            return False
        config = self.configs[config_id]
        success = True
        try:
            self._backup_configs(config)
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
        if config_id not in self.configs:
            return False
        config = self.configs[config_id]
        try:
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
        for system in config.target_systems:
            for config_file in config.config_files:
                backup_path = f"backups/{config.id}/{system}/{config_file['path']}"
                os.makedirs(os.path.dirname(backup_path), exist_ok=True)
                cmd = f"ssh {system} 'cat {config_file['path']}' > {backup_path}"
                subprocess.run(cmd, shell=True, check=True)

    def _deploy_config_file(self, system: str, config_file: Dict) -> Dict:
        try:
            temp_file = f"temp_{config_file['path'].replace('/', '_')}"
            with open(temp_file, 'w') as f:
                f.write(config_file['content'])
            cmd = f"scp {temp_file} {system}:{config_file['path']}"
            result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
            os.remove(temp_file)
            return {
                'success': result.returncode == 0,
                'output': result.stdout,
                'error': result.stderr
            }
        except Exception as e:
            return {'success': False, 'error': str(e)}

    def _restore_config_file(self, system: str, config_file: Dict) -> Dict:
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
            return {'success': False, 'error': str(e)}

    def verify_config(self, config_id: str) -> Dict:
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
                    cmd = f"ssh {system} 'cat {config_file['path']}'"
                    result = subprocess.run(cmd, shell=True,
                        capture_output=True, text=True)
                    system_results.append({
                        'file': config_file['path'],
                        'status': 'matched' if result.stdout
                            == config_file['content'] else 'mismatched',
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
    cms = ConfigManagementSystem('config_management.json')
    config = SystemConfig(
        id='CONFIG-2024-001',
        name='安全基线配置',
        description='系统安全基线配置',
        version='1.0.0',
        status=ConfigStatus.PENDING,
        target_systems=['server1', 'server2'],
        config_files=[{
            'path': '/etc/ssh/sshd_config',
            'content': 'PermitRootLogin no\\nMaxAuthTries 3'
        }],
        dependencies=[],
        created_at=datetime.now()
    )
    cms.add_config(config)
    if cms.deploy_config('CONFIG-2024-001'):
        print("配置部署成功")
        results = cms.verify_config('CONFIG-2024-001')
        print(json.dumps(results, indent=2))
    else:
        print("配置部署失败，已回滚")`} />
      </div>
    ),
  },
]

export default function SecurityOpsConfigPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

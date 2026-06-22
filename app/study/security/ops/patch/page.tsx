'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookList,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: '补丁管理',
  chapterNumber: 6,
  totalChapters: 10,
  subjectHref: '/study/security/ops',
  prevChapter: { label: '漏洞管理', href: '/study/security/ops/vulnerability' },
  nextChapter: { label: '配置管理', href: '/study/security/ops/config' },
  theme: THEMES.security,
}

// ==================== 代码常量 ====================

const CODE_POWERSHELL = `# 检查Windows更新状态
function Get-WindowsUpdateStatus {
    $session = New-Object -ComObject Microsoft.Update.Session
    $searcher = $session.CreateUpdateSearcher()
    $result = $searcher.Search("IsInstalled=0 and Type='Software'")

    $updates = @()
    foreach ($update in $result.Updates) {
        $updates += [PSCustomObject]@{
            Title = $update.Title
            Description = $update.Description
            KB = $update.KBArticleIDs
            Size = $update.MaxDownloadSize
            Priority = $update.Priority
        }
    }

    return $updates
}

# 安装Windows更新
function Install-WindowsUpdates {
    param(
        [string[]]$KBList
    )

    $session = New-Object -ComObject Microsoft.Update.Session
    $searcher = $session.CreateUpdateSearcher()
    $downloader = $session.CreateUpdateDownloader()
    $installer = $session.CreateUpdateInstaller()

    $updates = @()
    foreach ($kb in $KBList) {
        $result = $searcher.Search("KBArticleID='$kb'")
        $updates += $result.Updates
    }

    if ($updates.Count -gt 0) {
        $downloader.Updates = $updates
        $downloader.Download()

        $installer.Updates = $updates
        $result = $installer.Install()

        return @{
            ResultCode = $result.ResultCode
            RebootRequired = $result.RebootRequired
            UpdatesInstalled = $updates.Count
        }
    }

    return $null
}

# 使用示例
$updates = Get-WindowsUpdateStatus
$updates | Format-Table -AutoSize

# 安装特定KB补丁
$result = Install-WindowsUpdates -KBList @("KB5005565", "KB5005566")
if ($result) {
    Write-Host "安装结果: $($result.ResultCode)"
    Write-Host "需要重启: $($result.RebootRequired)"
}`

const CODE_SHELL = `#!/bin/bash
# Linux补丁管理脚本

# 检测系统类型
detect_os() {
    if [ -f /etc/debian_version ]; then
        echo "debian"
    elif [ -f /etc/redhat-release ]; then
        echo "redhat"
    else
        echo "unknown"
    fi
}

# 更新系统包
update_system() {
    local os_type=$(detect_os)

    case $os_type in
        "debian")
            apt-get update
            apt-get upgrade -y
            ;;
        "redhat")
            yum update -y
            ;;
        *)
            echo "Unsupported OS type"
            exit 1
            ;;
    esac
}

# 检查特定包版本
check_package_version() {
    local package=$1
    local os_type=$(detect_os)

    case $os_type in
        "debian")
            dpkg -l | grep $package
            ;;
        "redhat")
            rpm -q $package
            ;;
    esac
}

# 安装特定包
install_package() {
    local package=$1
    local os_type=$(detect_os)

    case $os_type in
        "debian")
            apt-get install -y $package
            ;;
        "redhat")
            yum install -y $package
            ;;
    esac
}

# 检查安全更新
check_security_updates() {
    local os_type=$(detect_os)

    case $os_type in
        "debian")
            apt-get update
            apt-get upgrade -s | grep -i security
            ;;
        "redhat")
            yum check-update --security
            ;;
    esac
}

# 主函数
main() {
    echo "开始系统补丁管理..."

    # 更新系统
    update_system

    # 检查安全更新
    echo "检查安全更新..."
    check_security_updates

    # 检查关键包版本
    echo "检查关键包版本..."
    check_package_version "openssl"
    check_package_version "kernel"

    echo "补丁管理完成"
}

main`

const CODE_PYTHON_APP = `import subprocess
import json
import logging
from datetime import datetime
from typing import List, Dict

class ApplicationPatchManager:
    def __init__(self, app_type: str):
        self.app_type = app_type
        self.logger = self._setup_logger()

    def _setup_logger(self):
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            filename=f'patch_{datetime.now().strftime("%Y%m%d")}.log'
        )
        return logging.getLogger(__name__)

    def check_updates(self) -> List[Dict]:
        """检查应用更新"""
        if self.app_type == 'python':
            return self._check_pip_updates()
        elif self.app_type == 'node':
            return self._check_npm_updates()
        else:
            raise ValueError(f"Unsupported app type: {self.app_type}")

    def _check_pip_updates(self) -> List[Dict]:
        """检查Python包更新"""
        try:
            result = subprocess.run(
                ['pip', 'list', '--outdated', '--format=json'],
                capture_output=True,
                text=True
            )
            return json.loads(result.stdout)
        except Exception as e:
            self.logger.error(f"Error checking pip updates: {e}")
            return []

    def _check_npm_updates(self) -> List[Dict]:
        """检查Node包更新"""
        try:
            result = subprocess.run(
                ['npm', 'outdated', '--json'],
                capture_output=True,
                text=True
            )
            return json.loads(result.stdout)
        except Exception as e:
            self.logger.error(f"Error checking npm updates: {e}")
            return []

    def apply_patch(self, package: str, version: str) -> bool:
        """应用补丁"""
        try:
            if self.app_type == 'python':
                subprocess.run(['pip', 'install', f'{package}=={version}'])
            elif self.app_type == 'node':
                subprocess.run(['npm', 'install', f'{package}@{version}'])

            self.logger.info(f"Successfully patched {package} to version {version}")
            return True
        except Exception as e:
            self.logger.error(f"Error applying patch: {e}")
            return False

    def verify_patch(self, package: str, version: str) -> bool:
        """验证补丁安装"""
        try:
            if self.app_type == 'python':
                result = subprocess.run(
                    ['pip', 'show', package],
                    capture_output=True,
                    text=True
                )
                return version in result.stdout
            elif self.app_type == 'node':
                result = subprocess.run(
                    ['npm', 'list', package],
                    capture_output=True,
                    text=True
                )
                return version in result.stdout
        except Exception as e:
            self.logger.error(f"Error verifying patch: {e}")
            return False

# 使用示例
if __name__ == '__main__':
    # Python应用补丁管理
    python_patcher = ApplicationPatchManager('python')
    updates = python_patcher.check_updates()

    for update in updates:
        print(f"Updating {update['name']} from {update['version']} to {update['latest_version']}")
        if python_patcher.apply_patch(update['name'], update['latest_version']):
            if python_patcher.verify_patch(update['name'], update['latest_version']):
                print(f"Successfully patched {update['name']}")
            else:
                print(f"Failed to verify patch for {update['name']}")
        else:
            print(f"Failed to patch {update['name']}")`

const CODE_ANSIBLE = `---
# 补丁管理Playbook
- name: 系统补丁管理
  hosts: all
  become: yes
  tasks:
    - name: 检测操作系统
      set_fact:
        os_family: "{{ ansible_os_family }}"

    - name: 更新Debian系统
      apt:
        update_cache: yes
        upgrade: dist
      when: os_family == "Debian"

    - name: 更新RedHat系统
      yum:
        name: '*'
        state: latest
      when: os_family == "RedHat"

    - name: 检查安全更新
      shell: |
        {% if os_family == "Debian" %}
        apt-get update && apt-get upgrade -s | grep -i security
        {% elif os_family == "RedHat" %}
        yum check-update --security
        {% endif %}
      register: security_updates
      changed_when: false

    - name: 显示安全更新
      debug:
        var: security_updates.stdout_lines

    - name: 安装安全更新
      shell: |
        {% if os_family == "Debian" %}
        apt-get update && apt-get upgrade -y
        {% elif os_family == "RedHat" %}
        yum update -y --security
        {% endif %}
      when: security_updates.stdout != ""

    - name: 检查是否需要重启
      shell: |
        {% if os_family == "Debian" %}
        [ -f /var/run/reboot-required ]
        {% elif os_family == "RedHat" %}
        needs-restarting -r
        {% endif %}
      register: reboot_required
      changed_when: false
      failed_when: false

    - name: 提示需要重启
      debug:
        msg: "系统需要重启以完成补丁安装"
      when: reboot_required.rc == 0`

const CODE_VERIFY = `import subprocess
import json
import nmap
from typing import Dict, List
from datetime import datetime

class PatchVerification:
    def __init__(self, target: str):
        self.target = target
        self.nm = nmap.PortScanner()

    def verify_system_patch(self, patch_id: str) -> Dict:
        """验证系统补丁安装"""
        result = {
            'patch_id': patch_id,
            'target': self.target,
            'verification_date': datetime.now().isoformat(),
            'status': 'Unknown',
            'details': []
        }

        # 检查系统版本
        try:
            version_check = subprocess.run(
                ['ssh', self.target, 'uname -a'],
                capture_output=True,
                text=True
            )
            result['details'].append(f'System version: {version_check.stdout}')
        except Exception as e:
            result['details'].append(f'Error checking version: {e}')

        # 检查补丁状态
        try:
            patch_check = subprocess.run(
                ['ssh', self.target, f'rpm -q {patch_id}'],
                capture_output=True,
                text=True
            )
            if patch_check.returncode == 0:
                result['status'] = 'Installed'
            else:
                result['status'] = 'Not Installed'
        except Exception as e:
            result['details'].append(f'Error checking patch: {e}')

        return result

    def verify_security_patch(self, cve_id: str) -> Dict:
        """验证安全补丁效果"""
        result = {
            'cve_id': cve_id,
            'target': self.target,
            'verification_date': datetime.now().isoformat(),
            'status': 'Unknown',
            'details': []
        }

        # 执行漏洞扫描
        self.nm.scan(self.target, arguments='-sV --script vuln')

        # 检查特定CVE
        if cve_id in str(self.nm[self.target].get('script', {})):
            result['status'] = 'Vulnerable'
            result['details'].append('Vulnerability still exists')
        else:
            result['status'] = 'Fixed'
            result['details'].append('Vulnerability not detected')

        return result

    def verify_application_patch(self, app_name: str, version: str) -> Dict:
        """验证应用补丁安装"""
        result = {
            'app_name': app_name,
            'target': self.target,
            'verification_date': datetime.now().isoformat(),
            'status': 'Unknown',
            'details': []
        }

        # 检查应用版本
        try:
            version_check = subprocess.run(
                ['ssh', self.target, f'{app_name} --version'],
                capture_output=True,
                text=True
            )
            if version in version_check.stdout:
                result['status'] = 'Updated'
            else:
                result['status'] = 'Not Updated'
            result['details'].append(f'Current version: {version_check.stdout}')
        except Exception as e:
            result['details'].append(f'Error checking version: {e}')

        return result

# 使用示例
if __name__ == '__main__':
    verifier = PatchVerification('192.168.1.100')

    # 验证系统补丁
    system_result = verifier.verify_system_patch('kernel-3.10.0-1160.45.1.el7')
    print(json.dumps(system_result, indent=2))

    # 验证安全补丁
    security_result = verifier.verify_security_patch('CVE-2021-1234')
    print(json.dumps(security_result, indent=2))

    # 验证应用补丁
    app_result = verifier.verify_application_patch('nginx', '1.20.1')
    print(json.dumps(app_result, indent=2))`

const CODE_SYSTEM = `import os
import json
import logging
import subprocess
from datetime import datetime
from typing import Dict, List
from dataclasses import dataclass
from enum import Enum

class PatchStatus(Enum):
    PENDING = "pending"
    TESTING = "testing"
    APPROVED = "approved"
    INSTALLED = "installed"
    FAILED = "failed"
    ROLLED_BACK = "rolled_back"

@dataclass
class Patch:
    id: str
    name: str
    description: str
    version: str
    release_date: str
    status: PatchStatus
    target_systems: List[str]
    test_results: Dict
    install_results: Dict
    rollback_results: Dict

class PatchManagementSystem:
    def __init__(self, config_path: str):
        self.config_path = config_path
        self.patches: Dict[str, Patch] = {}
        self.logger = self._setup_logger()
        self._load_config()

    def _setup_logger(self):
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            filename=f'patch_management_{datetime.now().strftime("%Y%m%d")}.log'
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

    def add_patch(self, patch: Patch):
        """添加新补丁"""
        self.patches[patch.id] = patch
        self.logger.info(f"Added new patch: {patch.id}")

    def update_patch_status(self, patch_id: str, status: PatchStatus):
        """更新补丁状态"""
        if patch_id in self.patches:
            self.patches[patch_id].status = status
            self.logger.info(f"Updated patch {patch_id} status to {status}")

    def test_patch(self, patch_id: str) -> bool:
        """测试补丁"""
        if patch_id not in self.patches:
            return False

        patch = self.patches[patch_id]
        self.update_patch_status(patch_id, PatchStatus.TESTING)

        try:
            for system in patch.target_systems:
                result = self._install_patch(system, patch)
                patch.test_results[system] = result

            if all(result.get('success', False) for result in patch.test_results.values()):
                self.update_patch_status(patch_id, PatchStatus.APPROVED)
                return True
            else:
                self.update_patch_status(patch_id, PatchStatus.FAILED)
                return False
        except Exception as e:
            self.logger.error(f"Error testing patch {patch_id}: {e}")
            self.update_patch_status(patch_id, PatchStatus.FAILED)
            return False

    def install_patch(self, patch_id: str) -> bool:
        """安装补丁"""
        if patch_id not in self.patches:
            return False

        patch = self.patches[patch_id]
        if patch.status != PatchStatus.APPROVED:
            return False

        try:
            for system in patch.target_systems:
                result = self._install_patch(system, patch)
                patch.install_results[system] = result

            if all(result.get('success', False) for result in patch.install_results.values()):
                self.update_patch_status(patch_id, PatchStatus.INSTALLED)
                return True
            else:
                self.rollback_patch(patch_id)
                return False
        except Exception as e:
            self.logger.error(f"Error installing patch {patch_id}: {e}")
            self.rollback_patch(patch_id)
            return False

    def rollback_patch(self, patch_id: str) -> bool:
        """回滚补丁"""
        if patch_id not in self.patches:
            return False

        patch = self.patches[patch_id]
        try:
            for system in patch.target_systems:
                result = self._rollback_patch(system, patch)
                patch.rollback_results[system] = result

            if all(result.get('success', False) for result in patch.rollback_results.values()):
                self.update_patch_status(patch_id, PatchStatus.ROLLED_BACK)
                return True
            else:
                return False
        except Exception as e:
            self.logger.error(f"Error rolling back patch {patch_id}: {e}")
            return False

    def _install_patch(self, system: str, patch: Patch) -> Dict:
        """在指定系统安装补丁"""
        try:
            cmd = f"ssh {system} 'yum install -y {patch.name}-{patch.version}'"
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

    def _rollback_patch(self, system: str, patch: Patch) -> Dict:
        """在指定系统回滚补丁"""
        try:
            cmd = f"ssh {system} 'yum downgrade -y {patch.name}-{patch.version}'"
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
    pms = PatchManagementSystem('patch_config.json')

    patch = Patch(
        id='PATCH-2024-001',
        name='openssl',
        description='修复OpenSSL安全漏洞',
        version='1.1.1k',
        release_date='2024-01-01',
        status=PatchStatus.PENDING,
        target_systems=['server1', 'server2'],
        test_results={},
        install_results={},
        rollback_results={}
    )

    pms.add_patch(patch)

    if pms.test_patch('PATCH-2024-001'):
        if pms.install_patch('PATCH-2024-001'):
            print("补丁安装成功")
        else:
            print("补丁安装失败，已回滚")
    else:
        print("补丁测试失败")`

// ==================== SPREADS ====================

const SPREADS = [
  {
    label: '补丁管理概述',
    left: (
      <div className="space-y-4">
        <PageTitle>补丁管理概述</PageTitle>
        <BookParagraph>
          补丁管理是安全运维的重要工作，通过及时安装安全补丁，可以有效防范已知漏洞带来的安全风险。补丁管理需要建立规范的流程，确保补丁安装的及时性、可靠性和可控性。
        </BookParagraph>
        <SectionTitle>补丁管理流程</SectionTitle>
        <BookList items={[
          '及时获取和评估安全补丁',
          '制定补丁安装计划和优先级',
          '测试补丁兼容性和稳定性',
          '执行补丁安装和验证',
          '监控补丁安装效果',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>平台补丁工具</PageTitle>
        <SectionTitle>Windows补丁管理工具</SectionTitle>
        <BookList items={[
          'Windows Update',
          'WSUS (Windows Server Update Services)',
          'SCCM (System Center Configuration Manager)',
          'PowerShell补丁管理脚本',
        ]} />
        <SectionTitle>Linux补丁管理工具</SectionTitle>
        <BookList items={[
          'apt/yum包管理器',
          'Spacewalk/Satellite',
          'Ansible补丁管理',
          'Shell补丁管理脚本',
        ]} />
      </div>
    ),
  },
  {
    label: '平台补丁脚本',
    left: (
      <div className="space-y-4">
        <PageTitle>Windows PowerShell补丁脚本</PageTitle>
        <BookCode language="powershell" code={CODE_POWERSHELL} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>Linux Shell补丁脚本</PageTitle>
        <BookCode language="bash" code={CODE_SHELL} />
      </div>
    ),
  },
  {
    label: '应用与自动化',
    left: (
      <div className="space-y-4">
        <PageTitle>应用补丁管理</PageTitle>
        <SectionTitle>应用补丁管理工具</SectionTitle>
        <BookList items={[
          '应用包管理器（npm, pip, composer等）',
          '容器镜像更新',
          'CI/CD补丁部署',
          '自动化补丁脚本',
        ]} />
        <BookCode language="python" code={CODE_PYTHON_APP} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>自动化补丁管理</PageTitle>
        <SectionTitle>自动化工具</SectionTitle>
        <BookList items={[
          'Ansible补丁管理',
          'Puppet补丁管理',
          'Chef补丁管理',
          '自定义自动化脚本',
        ]} />
        <BookCode language="yaml" code={CODE_ANSIBLE} />
      </div>
    ),
  },
  {
    label: '验证与案例',
    left: (
      <div className="space-y-4">
        <PageTitle>补丁验证</PageTitle>
        <SectionTitle>验证方法</SectionTitle>
        <BookList items={[
          '版本检查',
          '功能测试',
          '安全扫描',
          '系统监控',
        ]} />
        <BookCode language="python" code={CODE_VERIFY} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>实践案例</PageTitle>
        <SectionTitle>企业补丁管理体系建设</SectionTitle>
        <BookList ordered items={[
          '建立补丁管理制度和流程',
          '部署自动化补丁管理系统',
          '实施补丁测试和验证机制',
          '建立补丁回滚机制',
          '定期进行补丁管理评估',
        ]} />
        <BookCode language="python" code={CODE_SYSTEM} />
      </div>
    ),
  },
]

export default function SecurityOpsPatchPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

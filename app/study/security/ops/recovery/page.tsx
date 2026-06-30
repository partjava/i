'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: '灾难恢复',
  chapterNumber: 9,
  totalChapters: 10,
  subjectHref: '/study/security/ops',
  prevChapter: { label: '应急响应', href: '/study/security/ops/incident' },
  nextChapter: { label: '安全评估', href: '/study/security/ops/assessment' },
  theme: THEMES.security,
}

const backupManagerCode = `import os
import json
import logging
import subprocess
from datetime import datetime
from typing import Dict, List
from dataclasses import dataclass
from enum import Enum

class BackupType(Enum):
    FULL = "full"
    INCREMENTAL = "incremental"
    DIFFERENTIAL = "differential"

@dataclass
class BackupConfig:
    type: BackupType
    source_path: str
    target_path: str
    schedule: str
    retention: int
    compression: bool = True
    encryption: bool = True

class BackupManager:
    def __init__(self, config_path: str):
        self.config_path = config_path
        self.configs: Dict[str, BackupConfig] = {}
        self.logger = self._setup_logger()
        self._load_config()

    def _setup_logger(self):
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            filename=f'backup_{datetime.now().strftime("%Y%m%d")}.log'
        )
        return logging.getLogger(__name__)

    def _load_config(self):
        """加载备份配置"""
        try:
            with open(self.config_path, 'r') as f:
                config = json.load(f)
                for backup in config['backups']:
                    self.configs[backup['id']] = BackupConfig(**backup)
        except Exception as e:
            self.logger.error(f"Error loading config: {e}")

    def perform_backup(self, backup_id: str) -> Dict:
        """执行备份"""
        if backup_id not in self.configs:
            return {'success': False, 'error': 'Backup config not found'}

        config = self.configs[backup_id]
        try:
            if config.type == BackupType.FULL:
                return self._perform_full_backup(config)
            elif config.type == BackupType.INCREMENTAL:
                return self._perform_incremental_backup(config)
            else:
                return self._perform_differential_backup(config)
        except Exception as e:
            return {'success': False, 'error': str(e)}

    def _perform_full_backup(self, config: BackupConfig) -> Dict:
        """执行完全备份"""
        try:
            # 创建备份目录
            backup_dir = f"{config.target_path}/{datetime.now().strftime('%Y%m%d_%H%M%S')}"
            os.makedirs(backup_dir, exist_ok=True)

            # 执行备份
            cmd = f"rsync -avz --delete {config.source_path} {backup_dir}"
            if config.compression:
                cmd += " --compress"
            if config.encryption:
                cmd += " --encrypt"

            result = subprocess.run(cmd, shell=True, capture_output=True, text=True)

            return {
                'success': result.returncode == 0,
                'backup_dir': backup_dir,
                'output': result.stdout
            }
        except Exception as e:
            return {'success': False, 'error': str(e)}

    def _perform_incremental_backup(self, config: BackupConfig) -> Dict:
        """执行增量备份"""
        try:
            # 获取上次备份时间
            last_backup = self._get_last_backup_time(config)

            # 创建备份目录
            backup_dir = f"{config.target_path}/{datetime.now().strftime('%Y%m%d_%H%M%S')}"
            os.makedirs(backup_dir, exist_ok=True)

            # 执行增量备份
            cmd = f"rsync -avz --delete --link-dest={last_backup} {config.source_path} {backup_dir}"
            if config.compression:
                cmd += " --compress"
            if config.encryption:
                cmd += " --encrypt"

            result = subprocess.run(cmd, shell=True, capture_output=True, text=True)

            return {
                'success': result.returncode == 0,
                'backup_dir': backup_dir,
                'output': result.stdout
            }
        except Exception as e:
            return {'success': False, 'error': str(e)}

    def _perform_differential_backup(self, config: BackupConfig) -> Dict:
        """执行差异备份"""
        try:
            # 获取上次完全备份时间
            last_full_backup = self._get_last_full_backup_time(config)

            # 创建备份目录
            backup_dir = f"{config.target_path}/{datetime.now().strftime('%Y%m%d_%H%M%S')}"
            os.makedirs(backup_dir, exist_ok=True)

            # 执行差异备份
            cmd = f"rsync -avz --delete --link-dest={last_full_backup} {config.source_path} {backup_dir}"
            if config.compression:
                cmd += " --compress"
            if config.encryption:
                cmd += " --encrypt"

            result = subprocess.run(cmd, shell=True, capture_output=True, text=True)

            return {
                'success': result.returncode == 0,
                'backup_dir': backup_dir,
                'output': result.stdout
            }
        except Exception as e:
            return {'success': False, 'error': str(e)}

    def _get_last_backup_time(self, config: BackupConfig) -> str:
        """获取上次备份时间"""
        try:
            cmd = f"ls -t {config.target_path} | head -n 1"
            result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
            return result.stdout.strip()
        except Exception:
            return None

    def _get_last_full_backup_time(self, config: BackupConfig) -> str:
        """获取上次完全备份时间"""
        try:
            cmd = f"ls -t {config.target_path}/*_full | head -n 1"
            result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
            return result.stdout.strip()
        except Exception:
            return None

# 使用示例
if __name__ == '__main__':
    # 创建备份管理器
    bm = BackupManager('backup_config.json')

    # 执行完全备份
    result = bm.perform_backup('daily_full')
    print(json.dumps(result, indent=2))

    # 执行增量备份
    result = bm.perform_backup('hourly_incremental')
    print(json.dumps(result, indent=2))

    # 执行差异备份
    result = bm.perform_backup('weekly_differential')
    print(json.dumps(result, indent=2))`

const disasterRecoveryCode = `import os
import shutil
import logging
from datetime import datetime

class DisasterRecovery:
    def __init__(self, backup_dir, restore_dir, log_file='dr.log'):
        self.backup_dir = backup_dir
        self.restore_dir = restore_dir
        logging.basicConfig(filename=log_file, level=logging.INFO)

    def full_backup(self, src):
        date_str = datetime.now().strftime('%Y%m%d_%H%M%S')
        backup_path = os.path.join(self.backup_dir, f'full_{date_str}')
        shutil.copytree(src, backup_path)
        logging.info(f'Full backup completed: {backup_path}')
        return backup_path

    def incremental_backup(self, src, last_backup):
        date_str = datetime.now().strftime('%Y%m%d_%H%M%S')
        backup_path = os.path.join(self.backup_dir, f'incremental_{date_str}')
        os.makedirs(backup_path, exist_ok=True)
        for root, dirs, files in os.walk(src):
            for file in files:
                src_file = os.path.join(root, file)
                rel_path = os.path.relpath(src_file, src)
                backup_file = os.path.join(last_backup, rel_path)
                if not os.path.exists(backup_file) or os.path.getmtime(src_file) > os.path.getmtime(backup_file):
                    dest_file = os.path.join(backup_path, rel_path)
                    os.makedirs(os.path.dirname(dest_file), exist_ok=True)
                    shutil.copy2(src_file, dest_file)
        logging.info(f'Incremental backup completed: {backup_path}')
        return backup_path

    def restore(self, backup_path):
        for item in os.listdir(backup_path):
            s = os.path.join(backup_path, item)
            d = os.path.join(self.restore_dir, item)
            if os.path.isdir(s):
                shutil.copytree(s, d, dirs_exist_ok=True)
            else:
                shutil.copy2(s, d)
        logging.info(f'Restore completed from {backup_path} to {self.restore_dir}')

# 使用示例
if __name__ == '__main__':
    dr = DisasterRecovery('/backup', '/data')
    full = dr.full_backup('/data')
    inc = dr.incremental_backup('/data', full)
    dr.restore(full)`

const simulateFailureCode = `import subprocess

def simulate_failure(target_service):
    subprocess.run(['systemctl', 'stop', target_service])
    print(f"{target_service} 已停止，模拟故障。")

def auto_recover(target_service):
    subprocess.run(['systemctl', 'start', target_service])
    print(f"{target_service} 已自动恢复。")

def check_service(target_service):
    result = subprocess.run(['systemctl', 'is-active', target_service], capture_output=True, text=True)
    print(f"{target_service} 状态: {result.stdout.strip()}")

if __name__ == '__main__':
    simulate_failure('nginx')
    auto_recover('nginx')
    check_service('nginx')`

const SPREADS = [
  {
    label: '概述',
    left: (
      <div className="space-y-4">
        <PageTitle>灾难恢复概述</PageTitle>
        <BookParagraph>
          灾难恢复是确保业务连续性的重要组成部分，通过制定完善的恢复计划和策略，在发生灾难时能够快速恢复系统和数据，保证业务正常运行。
        </BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>核心任务</SectionTitle>
        <BookList items={[
          '制定灾难恢复计划',
          '建立备份策略',
          '设计恢复流程',
          '定期演练测试',
          '持续改进优化',
        ]} />
      </div>
    ),
  },
  {
    label: '恢复计划',
    left: (
      <div className="space-y-4">
        <PageTitle>灾难恢复计划</PageTitle>
        <SectionTitle>计划要素</SectionTitle>
        <BookParagraph>
          灾难恢复计划是组织应对灾难的指导性文件，需要全面考虑风险评估、恢复目标、组织架构和资源准备等关键要素。
        </BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookList ordered items={[
          <span key="1">风险评估<BookList tight items={['识别潜在风险', '评估影响程度', '确定恢复优先级']} /></span>,
          <span key="2">恢复目标<BookList tight items={['恢复时间目标(RTO)', '恢复点目标(RPO)', '业务影响分析']} /></span>,
          <span key="3">组织架构<BookList tight items={['恢复团队职责', '沟通机制', '决策流程']} /></span>,
          <span key="4">资源准备<BookList tight items={['硬件资源', '软件资源', '人力资源']} /></span>,
        ]} />
      </div>
    ),
  },
  {
    label: '备份策略',
    left: (
      <div className="space-y-4">
        <PageTitle>备份策略</PageTitle>
        <SectionTitle>备份类型</SectionTitle>
        <BookList items={[
          <span key="1">完全备份<BookList tight items={['备份所有数据', '恢复时间最短', '存储空间需求大']} /></span>,
          <span key="2">增量备份<BookList tight items={['只备份变化数据', '存储空间需求小', '恢复时间较长']} /></span>,
          <span key="3">差异备份<BookList tight items={['备份与完全备份的差异', '平衡存储和恢复时间', '适合定期备份']} /></span>,
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>备份策略示例</SectionTitle>
        <BookCode language="python" code={backupManagerCode} />
        <SectionTitle>进阶：自动化备份与恢复脚本</SectionTitle>
        <BookCode language="python" code={disasterRecoveryCode} />
      </div>
    ),
  },
  {
    label: '恢复流程',
    left: (
      <div className="space-y-4">
        <PageTitle>恢复流程</PageTitle>
        <SectionTitle>恢复步骤</SectionTitle>
        <BookParagraph>
          当灾难发生时，需要按照标准化的恢复流程进行操作，确保恢复过程有序、高效，最大限度地减少业务中断时间。
        </BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookList ordered items={[
          <span key="1">灾难评估<BookList tight items={['确认灾难范围', '评估影响程度', '确定恢复优先级']} /></span>,
          <span key="2">恢复准备<BookList tight items={['准备恢复环境', '检查备份完整性', '准备恢复工具']} /></span>,
          <span key="3">系统恢复<BookList tight items={['恢复操作系统', '恢复应用程序', '恢复配置文件']} /></span>,
          <span key="4">数据恢复<BookList tight items={['恢复数据库', '恢复文件系统', '验证数据完整性']} /></span>,
          <span key="5">业务恢复<BookList tight items={['启动业务系统', '验证业务功能', '监控系统状态']} /></span>,
        ]} />
      </div>
    ),
  },
  {
    label: '演练测试',
    left: (
      <div className="space-y-4">
        <PageTitle>演练测试</PageTitle>
        <SectionTitle>测试类型</SectionTitle>
        <BookList items={[
          <span key="1">桌面演练<BookList tight items={['讨论恢复流程', '验证计划完整性', '培训团队成员']} /></span>,
          <span key="2">功能测试<BookList tight items={['测试备份恢复', '验证恢复流程', '检查工具可用性']} /></span>,
          <span key="3">全面演练<BookList tight items={['模拟真实灾难', '执行完整恢复', '评估恢复效果']} /></span>,
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>进阶：灾难演练自动化脚本</SectionTitle>
        <BookCode language="python" code={simulateFailureCode} />
      </div>
    ),
  },
  {
    label: '实践案例',
    left: (
      <div className="space-y-4">
        <PageTitle>实践案例</PageTitle>
        <SectionTitle>案例一：数据中心火灾</SectionTitle>
        <BookList ordered items={[
          <span key="1">事件描述<BookList tight items={['数据中心发生火灾', '部分设备损毁', '业务系统中断']} /></span>,
          <span key="2">恢复过程<BookList tight items={['启动备用数据中心', '恢复关键系统', '迁移业务数据']} /></span>,
          <span key="3">经验总结<BookList tight items={['完善灾备方案', '加强应急演练', '优化恢复流程']} /></span>,
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>案例二：勒索软件攻击</SectionTitle>
        <BookList ordered items={[
          <span key="1">事件描述<BookList tight items={['系统感染勒索软件', '数据被加密', '业务无法运行']} /></span>,
          <span key="2">恢复过程<BookList tight items={['隔离受感染系统', '恢复备份数据', '重建系统环境']} /></span>,
          <span key="3">经验总结<BookList tight items={['加强安全防护', '完善备份策略', '提高恢复效率']} /></span>,
        ]} />
      </div>
    ),
  },
]

export default function SecurityOpsRecoveryPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

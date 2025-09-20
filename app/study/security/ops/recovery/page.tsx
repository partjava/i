'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function SecurityOpsRecoveryPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 顶部返回导航 */}
      <div className="mb-4">
        <Link href="/study/security/ops" className="px-4 py-2 text-blue-600 hover:text-blue-800">← 返回安全运维</Link>
      </div>
      <h1 className="text-3xl font-bold mb-8">灾难恢复</h1>

      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        <button onClick={() => setActiveTab('overview')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>概述</button>
        <button onClick={() => setActiveTab('plan')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'plan' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>恢复计划</button>
        <button onClick={() => setActiveTab('backup')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'backup' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>备份策略</button>
        <button onClick={() => setActiveTab('recovery')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'recovery' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>恢复流程</button>
        <button onClick={() => setActiveTab('test')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'test' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>演练测试</button>
        <button onClick={() => setActiveTab('case')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'case' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>实践案例</button>
      </div>

      {/* 内容区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">灾难恢复概述</h3>
            <div className="prose max-w-none">
              <p>灾难恢复是确保业务连续性的重要组成部分，通过制定完善的恢复计划和策略，在发生灾难时能够快速恢复系统和数据，保证业务正常运行。</p>
              <ul className="list-disc pl-6">
                <li>制定灾难恢复计划</li>
                <li>建立备份策略</li>
                <li>设计恢复流程</li>
                <li>定期演练测试</li>
                <li>持续改进优化</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'plan' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">灾难恢复计划</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold text-lg mb-2">计划要素</h4>
              <ol className="list-decimal pl-6">
                <li>风险评估
                  <ul className="list-disc pl-6">
                    <li>识别潜在风险</li>
                    <li>评估影响程度</li>
                    <li>确定恢复优先级</li>
                  </ul>
                </li>
                <li>恢复目标
                  <ul className="list-disc pl-6">
                    <li>恢复时间目标(RTO)</li>
                    <li>恢复点目标(RPO)</li>
                    <li>业务影响分析</li>
                  </ul>
                </li>
                <li>组织架构
                  <ul className="list-disc pl-6">
                    <li>恢复团队职责</li>
                    <li>沟通机制</li>
                    <li>决策流程</li>
                  </ul>
                </li>
                <li>资源准备
                  <ul className="list-disc pl-6">
                    <li>硬件资源</li>
                    <li>软件资源</li>
                    <li>人力资源</li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>
        )}

        {activeTab === 'backup' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">备份策略</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold text-lg mb-2">备份类型</h4>
              <ul className="list-disc pl-6">
                <li>完全备份
                  <ul className="list-disc pl-6">
                    <li>备份所有数据</li>
                    <li>恢复时间最短</li>
                    <li>存储空间需求大</li>
                  </ul>
                </li>
                <li>增量备份
                  <ul className="list-disc pl-6">
                    <li>只备份变化数据</li>
                    <li>存储空间需求小</li>
                    <li>恢复时间较长</li>
                  </ul>
                </li>
                <li>差异备份
                  <ul className="list-disc pl-6">
                    <li>备份与完全备份的差异</li>
                    <li>平衡存储和恢复时间</li>
                    <li>适合定期备份</li>
                  </ul>
                </li>
              </ul>

              <h4 className="font-semibold text-lg mb-2">备份策略示例</h4>
              <pre className="bg-gray-100 p-4 rounded mb-4">
{`import os
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
    print(json.dumps(result, indent=2))`}
              </pre>
              <h4 className="font-semibold text-lg mb-2">进阶：自动化备份与恢复脚本</h4>
              <pre className="bg-gray-100 p-4 rounded mb-4">
{`import os
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
    dr.restore(full)`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'recovery' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">恢复流程</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold text-lg mb-2">恢复步骤</h4>
              <ol className="list-decimal pl-6">
                <li>灾难评估
                  <ul className="list-disc pl-6">
                    <li>确认灾难范围</li>
                    <li>评估影响程度</li>
                    <li>确定恢复优先级</li>
                  </ul>
                </li>
                <li>恢复准备
                  <ul className="list-disc pl-6">
                    <li>准备恢复环境</li>
                    <li>检查备份完整性</li>
                    <li>准备恢复工具</li>
                  </ul>
                </li>
                <li>系统恢复
                  <ul className="list-disc pl-6">
                    <li>恢复操作系统</li>
                    <li>恢复应用程序</li>
                    <li>恢复配置文件</li>
                  </ul>
                </li>
                <li>数据恢复
                  <ul className="list-disc pl-6">
                    <li>恢复数据库</li>
                    <li>恢复文件系统</li>
                    <li>验证数据完整性</li>
                  </ul>
                </li>
                <li>业务恢复
                  <ul className="list-disc pl-6">
                    <li>启动业务系统</li>
                    <li>验证业务功能</li>
                    <li>监控系统状态</li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>
        )}

        {activeTab === 'test' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">演练测试</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold text-lg mb-2">测试类型</h4>
              <ul className="list-disc pl-6">
                <li>桌面演练
                  <ul className="list-disc pl-6">
                    <li>讨论恢复流程</li>
                    <li>验证计划完整性</li>
                    <li>培训团队成员</li>
                  </ul>
                </li>
                <li>功能测试
                  <ul className="list-disc pl-6">
                    <li>测试备份恢复</li>
                    <li>验证恢复流程</li>
                    <li>检查工具可用性</li>
                  </ul>
                </li>
                <li>全面演练
                  <ul className="list-disc pl-6">
                    <li>模拟真实灾难</li>
                    <li>执行完整恢复</li>
                    <li>评估恢复效果</li>
                  </ul>
                </li>
              </ul>
              <h4 className="font-semibold text-lg mb-2">进阶：灾难演练自动化脚本</h4>
              <pre className="bg-gray-100 p-4 rounded mb-4">
{`import subprocess

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
    check_service('nginx')`}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'case' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">实践案例</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold text-lg mb-2">案例一：数据中心火灾</h4>
              <ol className="list-decimal pl-6">
                <li>事件描述
                  <ul className="list-disc pl-6">
                    <li>数据中心发生火灾</li>
                    <li>部分设备损毁</li>
                    <li>业务系统中断</li>
                  </ul>
                </li>
                <li>恢复过程
                  <ul className="list-disc pl-6">
                    <li>启动备用数据中心</li>
                    <li>恢复关键系统</li>
                    <li>迁移业务数据</li>
                  </ul>
                </li>
                <li>经验总结
                  <ul className="list-disc pl-6">
                    <li>完善灾备方案</li>
                    <li>加强应急演练</li>
                    <li>优化恢复流程</li>
                  </ul>
                </li>
              </ol>

              <h4 className="font-semibold text-lg mb-2">案例二：勒索软件攻击</h4>
              <ol className="list-decimal pl-6">
                <li>事件描述
                  <ul className="list-disc pl-6">
                    <li>系统感染勒索软件</li>
                    <li>数据被加密</li>
                    <li>业务无法运行</li>
                  </ul>
                </li>
                <li>恢复过程
                  <ul className="list-disc pl-6">
                    <li>隔离受感染系统</li>
                    <li>恢复备份数据</li>
                    <li>重建系统环境</li>
                  </ul>
                </li>
                <li>经验总结
                  <ul className="list-disc pl-6">
                    <li>加强安全防护</li>
                    <li>完善备份策略</li>
                    <li>提高恢复效率</li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/security/ops/incident"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回应急响应
        </Link>
        <Link 
          href="/study/security/ops/assessment"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          安全评估 →
        </Link>
      </div>
    </div>
  );
} 
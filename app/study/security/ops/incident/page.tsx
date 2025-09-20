'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function SecurityOpsIncidentPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 顶部返回导航 */}
      <div className="mb-4">
        <Link href="/study/security/ops" className="px-4 py-2 text-blue-600 hover:text-blue-800">← 返回安全运维</Link>
      </div>
      <h1 className="text-3xl font-bold mb-8">应急响应</h1>

      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        <button onClick={() => setActiveTab('overview')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>概述</button>
        <button onClick={() => setActiveTab('process')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'process' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>响应流程</button>
        <button onClick={() => setActiveTab('tools')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'tools' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>工具使用</button>
        <button onClick={() => setActiveTab('analysis')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'analysis' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>分析技术</button>
        <button onClick={() => setActiveTab('recovery')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'recovery' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>恢复措施</button>
        <button onClick={() => setActiveTab('case')} className={`px-4 py-2 font-medium whitespace-nowrap ${activeTab === 'case' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>实践案例</button>
      </div>

      {/* 内容区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">应急响应概述</h3>
            <div className="prose max-w-none">
              <p>应急响应是安全运维的重要工作，通过及时发现、分析和处置安全事件，降低安全风险，保护系统和数据安全。应急响应需要建立规范的流程，确保响应的及时性、有效性和可追溯性。</p>
              <ul className="list-disc pl-6">
                <li>建立应急响应机制</li>
                <li>制定响应流程和预案</li>
                <li>准备应急工具和资源</li>
                <li>开展应急演练和培训</li>
                <li>总结和改进响应能力</li>
              </ul>
            </div>
          </div>
        )}
        {activeTab === 'process' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">应急响应流程</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold text-lg mb-2">响应流程阶段</h4>
              <ol className="list-decimal pl-6">
                <li>准备阶段
                  <ul className="list-disc pl-6">
                    <li>建立应急响应团队</li>
                    <li>制定响应预案</li>
                    <li>准备应急工具</li>
                    <li>开展应急培训</li>
                  </ul>
                </li>
                <li>检测阶段
                  <ul className="list-disc pl-6">
                    <li>监控系统告警</li>
                    <li>分析异常行为</li>
                    <li>确认安全事件</li>
                    <li>评估事件影响</li>
                  </ul>
                </li>
                <li>分析阶段
                  <ul className="list-disc pl-6">
                    <li>收集事件信息</li>
                    <li>分析攻击路径</li>
                    <li>确定攻击来源</li>
                    <li>评估系统状态</li>
                  </ul>
                </li>
                <li>处置阶段
                  <ul className="list-disc pl-6">
                    <li>隔离受影响系统</li>
                    <li>清除恶意代码</li>
                    <li>修复系统漏洞</li>
                    <li>恢复系统服务</li>
                  </ul>
                </li>
                <li>恢复阶段
                  <ul className="list-disc pl-6">
                    <li>验证系统安全</li>
                    <li>恢复业务服务</li>
                    <li>监控系统状态</li>
                    <li>总结响应过程</li>
                  </ul>
                </li>
              </ol>
              <h4 className="font-semibold text-lg mb-2">Python应急响应流程管理脚本示例</h4>
              <pre className="bg-gray-100 p-4 rounded mb-4">
{`import os
import json
import logging
import subprocess
from datetime import datetime
from typing import Dict, List
from dataclasses import dataclass
from enum import Enum

class IncidentStatus(Enum):
    DETECTED = "detected"
    ANALYZING = "analyzing"
    CONTAINING = "containing"
    ERADICATING = "eradicating"
    RECOVERING = "recovering"
    RESOLVED = "resolved"

@dataclass
class SecurityIncident:
    id: str
    title: str
    description: str
    severity: str
    status: IncidentStatus
    affected_systems: List[str]
    detection_time: datetime
    resolution_time: datetime = None
    analysis_results: Dict = None
    containment_actions: List[Dict] = None
    eradication_actions: List[Dict] = None
    recovery_actions: List[Dict] = None

class IncidentResponseManager:
    def __init__(self, config_path: str):
        self.config_path = config_path
        self.incidents: Dict[str, SecurityIncident] = {}
        self.logger = self._setup_logger()
        self._load_config()
    
    def _setup_logger(self):
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            filename=f'incident_response_{datetime.now().strftime("%Y%m%d")}.log'
        )
        return logging.getLogger(__name__)
    
    def _load_config(self):
        """加载配置"""
        try:
            with open(self.config_path, 'r') as f:
                self.config = json.load(f)
        except Exception as e:
            self.logger.error(f"Error loading config: {e}")
            self.config = {}
    
    def create_incident(self, incident: SecurityIncident):
        """创建安全事件"""
        self.incidents[incident.id] = incident
        self.logger.info(f"Created incident: {incident.id}")
    
    def update_incident_status(self, incident_id: str, status: IncidentStatus):
        """更新事件状态"""
        if incident_id in self.incidents:
            self.incidents[incident_id].status = status
            self.logger.info(f"Updated incident {incident_id} status to {status}")
    
    def analyze_incident(self, incident_id: str) -> Dict:
        """分析安全事件"""
        if incident_id not in self.incidents:
            return {'success': False, 'error': 'Incident not found'}
        
        incident = self.incidents[incident_id]
        self.update_incident_status(incident_id, IncidentStatus.ANALYZING)
        
        analysis_results = {
            'incident_id': incident_id,
            'analysis_time': datetime.now().isoformat(),
            'affected_systems': {},
            'attack_vectors': [],
            'indicators': []
        }
        
        try:
            # 分析每个受影响系统
            for system in incident.affected_systems:
                system_analysis = self._analyze_system(system)
                analysis_results['affected_systems'][system] = system_analysis
                
                # 收集攻击向量和指标
                if 'attack_vectors' in system_analysis:
                    analysis_results['attack_vectors'].extend(system_analysis['attack_vectors'])
                if 'indicators' in system_analysis:
                    analysis_results['indicators'].extend(system_analysis['indicators'])
            
            incident.analysis_results = analysis_results
            return analysis_results
        except Exception as e:
            self.logger.error(f"Error analyzing incident {incident_id}: {e}")
            return {'success': False, 'error': str(e)}
    
    def contain_incident(self, incident_id: str) -> bool:
        """控制安全事件"""
        if incident_id not in self.incidents:
            return False
        
        incident = self.incidents[incident_id]
        self.update_incident_status(incident_id, IncidentStatus.CONTAINING)
        
        try:
            containment_actions = []
            
            # 对每个受影响系统执行控制措施
            for system in incident.affected_systems:
                actions = self._contain_system(system)
                containment_actions.extend(actions)
            
            incident.containment_actions = containment_actions
            return True
        except Exception as e:
            self.logger.error(f"Error containing incident {incident_id}: {e}")
            return False
    
    def eradicate_incident(self, incident_id: str) -> bool:
        """清除安全事件"""
        if incident_id not in self.incidents:
            return False
        
        incident = self.incidents[incident_id]
        self.update_incident_status(incident_id, IncidentStatus.ERADICATING)
        
        try:
            eradication_actions = []
            
            # 对每个受影响系统执行清除措施
            for system in incident.affected_systems:
                actions = self._eradicate_system(system)
                eradication_actions.extend(actions)
            
            incident.eradication_actions = eradication_actions
            return True
        except Exception as e:
            self.logger.error(f"Error eradicating incident {incident_id}: {e}")
            return False
    
    def recover_systems(self, incident_id: str) -> bool:
        """恢复系统"""
        if incident_id not in self.incidents:
            return False
        
        incident = self.incidents[incident_id]
        self.update_incident_status(incident_id, IncidentStatus.RECOVERING)
        
        try:
            recovery_actions = []
            
            # 对每个受影响系统执行恢复措施
            for system in incident.affected_systems:
                actions = self._recover_system(system)
                recovery_actions.extend(actions)
            
            incident.recovery_actions = recovery_actions
            incident.status = IncidentStatus.RESOLVED
            incident.resolution_time = datetime.now()
            return True
        except Exception as e:
            self.logger.error(f"Error recovering systems for incident {incident_id}: {e}")
            return False
    
    def _analyze_system(self, system: str) -> Dict:
        """分析系统状态"""
        try:
            # 收集系统信息
            system_info = self._collect_system_info(system)
            
            # 分析系统日志
            log_analysis = self._analyze_system_logs(system)
            
            # 分析网络连接
            network_analysis = self._analyze_network_connections(system)
            
            # 分析进程状态
            process_analysis = self._analyze_processes(system)
            
            return {
                'system_info': system_info,
                'log_analysis': log_analysis,
                'network_analysis': network_analysis,
                'process_analysis': process_analysis,
                'attack_vectors': self._identify_attack_vectors(system_info, log_analysis, network_analysis, process_analysis),
                'indicators': self._identify_indicators(system_info, log_analysis, network_analysis, process_analysis)
            }
        except Exception as e:
            return {'error': str(e)}
    
    def _contain_system(self, system: str) -> List[Dict]:
        """控制系统"""
        actions = []
        try:
            # 隔离网络
            actions.append(self._isolate_network(system))
            
            # 停止可疑服务
            actions.append(self._stop_suspicious_services(system))
            
            # 阻止可疑进程
            actions.append(self._block_suspicious_processes(system))
            
            return actions
        except Exception as e:
            return [{'error': str(e)}]
    
    def _eradicate_system(self, system: str) -> List[Dict]:
        """清除系统威胁"""
        actions = []
        try:
            # 移除恶意文件
            actions.append(self._remove_malicious_files(system))
            
            # 修复系统配置
            actions.append(self._fix_system_config(system))
            
            # 更新安全补丁
            actions.append(self._update_security_patches(system))
            
            return actions
        except Exception as e:
            return [{'error': str(e)}]
    
    def _recover_system(self, system: str) -> List[Dict]:
        """恢复系统"""
        actions = []
        try:
            # 恢复网络连接
            actions.append(self._restore_network(system))
            
            # 启动正常服务
            actions.append(self._start_normal_services(system))
            
            # 验证系统状态
            actions.append(self._verify_system_state(system))
            
            return actions
        except Exception as e:
            return [{'error': str(e)}]
    
    def _collect_system_info(self, system: str) -> Dict:
        """收集系统信息"""
        try:
            cmd = f"ssh {system} 'uname -a; cat /etc/os-release; df -h; free -m'"
            result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
            return {'output': result.stdout}
        except Exception as e:
            return {'error': str(e)}
    
    def _analyze_system_logs(self, system: str) -> Dict:
        """分析系统日志"""
        try:
            cmd = f"ssh {system} 'tail -n 1000 /var/log/syslog /var/log/auth.log'"
            result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
            return {'output': result.stdout}
        except Exception as e:
            return {'error': str(e)}
    
    def _analyze_network_connections(self, system: str) -> Dict:
        """分析网络连接"""
        try:
            cmd = f"ssh {system} 'netstat -tuln; ss -tuln'"
            result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
            return {'output': result.stdout}
        except Exception as e:
            return {'error': str(e)}
    
    def _analyze_processes(self, system: str) -> Dict:
        """分析进程状态"""
        try:
            cmd = f"ssh {system} 'ps aux; top -b -n 1'"
            result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
            return {'output': result.stdout}
        except Exception as e:
            return {'error': str(e)}
    
    def _identify_attack_vectors(self, system_info: Dict, log_analysis: Dict, network_analysis: Dict, process_analysis: Dict) -> List[str]:
        """识别攻击向量"""
        attack_vectors = []
        # 实现攻击向量识别逻辑
        return attack_vectors
    
    def _identify_indicators(self, system_info: Dict, log_analysis: Dict, network_analysis: Dict, process_analysis: Dict) -> List[Dict]:
        """识别威胁指标"""
        indicators = []
        # 实现威胁指标识别逻辑
        return indicators
    
    def _isolate_network(self, system: str) -> Dict:
        """隔离网络"""
        try:
            cmd = f"ssh {system} 'iptables -A INPUT -j DROP; iptables -A OUTPUT -j DROP'"
            result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
            return {'action': 'isolate_network', 'success': result.returncode == 0}
        except Exception as e:
            return {'action': 'isolate_network', 'error': str(e)}
    
    def _stop_suspicious_services(self, system: str) -> Dict:
        """停止可疑服务"""
        try:
            cmd = f"ssh {system} 'systemctl stop suspicious_service'"
            result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
            return {'action': 'stop_services', 'success': result.returncode == 0}
        except Exception as e:
            return {'action': 'stop_services', 'error': str(e)}
    
    def _block_suspicious_processes(self, system: str) -> Dict:
        """阻止可疑进程"""
        try:
            cmd = f"ssh {system} 'killall suspicious_process'"
            result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
            return {'action': 'block_processes', 'success': result.returncode == 0}
        except Exception as e:
            return {'action': 'block_processes', 'error': str(e)}
    
    def _remove_malicious_files(self, system: str) -> Dict:
        """移除恶意文件"""
        try:
            cmd = f"ssh {system} 'rm -f /path/to/malicious/file'"
            result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
            return {'action': 'remove_files', 'success': result.returncode == 0}
        except Exception as e:
            return {'action': 'remove_files', 'error': str(e)}
    
    def _fix_system_config(self, system: str) -> Dict:
        """修复系统配置"""
        try:
            cmd = f"ssh {system} 'restorecon -R /etc'"
            result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
            return {'action': 'fix_config', 'success': result.returncode == 0}
        except Exception as e:
            return {'action': 'fix_config', 'error': str(e)}
    
    def _update_security_patches(self, system: str) -> Dict:
        """更新安全补丁"""
        try:
            cmd = f"ssh {system} 'yum update -y --security'"
            result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
            return {'action': 'update_patches', 'success': result.returncode == 0}
        except Exception as e:
            return {'action': 'update_patches', 'error': str(e)}
    
    def _restore_network(self, system: str) -> Dict:
        """恢复网络连接"""
        try:
            cmd = f"ssh {system} 'iptables -F'"
            result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
            return {'action': 'restore_network', 'success': result.returncode == 0}
        except Exception as e:
            return {'action': 'restore_network', 'error': str(e)}
    
    def _start_normal_services(self, system: str) -> Dict:
        """启动正常服务"""
        try:
            cmd = f"ssh {system} 'systemctl start normal_service'"
            result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
            return {'action': 'start_services', 'success': result.returncode == 0}
        except Exception as e:
            return {'action': 'start_services', 'error': str(e)}
    
    def _verify_system_state(self, system: str) -> Dict:
        """验证系统状态"""
        try:
            cmd = f"ssh {system} 'systemctl status; netstat -tuln'"
            result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
            return {'action': 'verify_state', 'success': result.returncode == 0, 'output': result.stdout}
        except Exception as e:
            return {'action': 'verify_state', 'error': str(e)}

# 使用示例
if __name__ == '__main__':
    # 创建应急响应管理器
    irm = IncidentResponseManager('incident_response.json')
    
    # 创建安全事件
    incident = SecurityIncident(
        id='INCIDENT-2024-001',
        title='可疑网络连接',
        description='检测到可疑的网络连接尝试',
        severity='high',
        status=IncidentStatus.DETECTED,
        affected_systems=['server1', 'server2'],
        detection_time=datetime.now()
    )
    
    # 添加事件
    irm.create_incident(incident)
    
    # 分析事件
    analysis_results = irm.analyze_incident('INCIDENT-2024-001')
    print(json.dumps(analysis_results, indent=2))
    
    # 控制事件
    if irm.contain_incident('INCIDENT-2024-001'):
        # 清除事件
        if irm.eradicate_incident('INCIDENT-2024-001'):
            # 恢复系统
            if irm.recover_systems('INCIDENT-2024-001'):
                print("事件响应完成")
            else:
                print("系统恢复失败")
        else:
            print("事件清除失败")
    else:
        print("事件控制失败")`}
              </pre>
            </div>
          </div>
        )}
        {activeTab === 'tools' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">应急响应工具</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold text-lg mb-2">常用工具</h4>
              <ul className="list-disc pl-6">
                <li>日志分析工具
                  <ul className="list-disc pl-6">
                    <li>ELK Stack</li>
                    <li>Splunk</li>
                    <li>Graylog</li>
                  </ul>
                </li>
                <li>网络分析工具
                  <ul className="list-disc pl-6">
                    <li>Wireshark</li>
                    <li>tcpdump</li>
                    <li>Nmap</li>
                  </ul>
                </li>
                <li>系统分析工具
                  <ul className="list-disc pl-6">
                    <li>Volatility</li>
                    <li>Autopsy</li>
                    <li>FTK Imager</li>
                  </ul>
                </li>
                <li>恶意代码分析工具
                  <ul className="list-disc pl-6">
                    <li>IDA Pro</li>
                    <li>Ghidra</li>
                    <li>OllyDbg</li>
                  </ul>
                </li>
              </ul>
              <h4 className="font-semibold text-lg mb-2">Python应急响应工具脚本示例</h4>
              <pre className="bg-gray-100 p-4 rounded mb-4">
{`import os
import json
import logging
import subprocess
from datetime import datetime
from typing import Dict, List
from dataclasses import dataclass
from enum import Enum

class ToolType(Enum):
    LOG_ANALYSIS = "log_analysis"
    NETWORK_ANALYSIS = "network_analysis"
    SYSTEM_ANALYSIS = "system_analysis"
    MALWARE_ANALYSIS = "malware_analysis"

@dataclass
class AnalysisTool:
    name: str
    type: ToolType
    command: str
    description: str
    output_format: str

class IncidentResponseTools:
    def __init__(self, config_path: str):
        self.config_path = config_path
        self.tools: Dict[str, AnalysisTool] = {}
        self.logger = self._setup_logger()
        self._load_config()
    
    def _setup_logger(self):
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            filename=f'incident_tools_{datetime.now().strftime("%Y%m%d")}.log'
        )
        return logging.getLogger(__name__)
    
    def _load_config(self):
        """加载工具配置"""
        try:
            with open(self.config_path, 'r') as f:
                config = json.load(f)
                for tool in config['tools']:
                    self.tools[tool['name']] = AnalysisTool(**tool)
        except Exception as e:
            self.logger.error(f"Error loading config: {e}")
    
    def analyze_logs(self, target: str, log_path: str) -> Dict:
        """分析日志"""
        try:
            # 使用ELK Stack分析日志
            if 'elasticsearch' in self.tools:
                return self._analyze_with_elasticsearch(target, log_path)
            
            # 使用Splunk分析日志
            elif 'splunk' in self.tools:
                return self._analyze_with_splunk(target, log_path)
            
            # 使用基本日志分析
            else:
                return self._analyze_logs_basic(target, log_path)
        except Exception as e:
            return {'error': str(e)}
    
    def analyze_network(self, target: str, pcap_file: str = None) -> Dict:
        """分析网络流量"""
        try:
            # 使用Wireshark分析
            if 'wireshark' in self.tools:
                return self._analyze_with_wireshark(target, pcap_file)
            
            # 使用tcpdump分析
            elif 'tcpdump' in self.tools:
                return self._analyze_with_tcpdump(target)
            
            # 使用基本网络分析
            else:
                return self._analyze_network_basic(target)
        except Exception as e:
            return {'error': str(e)}
    
    def analyze_system(self, target: str, memory_dump: str = None) -> Dict:
        """分析系统状态"""
        try:
            # 使用Volatility分析内存
            if memory_dump and 'volatility' in self.tools:
                return self._analyze_with_volatility(target, memory_dump)
            
            # 使用基本系统分析
            else:
                return self._analyze_system_basic(target)
        except Exception as e:
            return {'error': str(e)}
    
    def analyze_malware(self, target: str, sample_path: str) -> Dict:
        """分析恶意代码"""
        try:
            # 使用IDA Pro分析
            if 'ida_pro' in self.tools:
                return self._analyze_with_idapro(target, sample_path)
            
            # 使用Ghidra分析
            elif 'ghidra' in self.tools:
                return self._analyze_with_ghidra(target, sample_path)
            
            # 使用基本恶意代码分析
            else:
                return self._analyze_malware_basic(target, sample_path)
        except Exception as e:
            return {'error': str(e)}
    
    def _analyze_with_elasticsearch(self, target: str, log_path: str) -> Dict:
        """使用Elasticsearch分析日志"""
        try:
            # 发送日志到Elasticsearch
            cmd = f"ssh {target} 'cat {log_path} | curl -X POST -H \"Content-Type: application/json\" -d @- http://elasticsearch:9200/logs/_doc'"
            result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
            
            # 查询分析结果
            cmd = "curl -X GET \"http://elasticsearch:9200/logs/_search?pretty\" -H \"Content-Type: application/json\" -d '{\"query\": {\"match_all\": {}}}'"
            result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
            
            return {'output': result.stdout}
        except Exception as e:
            return {'error': str(e)}
    
    def _analyze_with_splunk(self, target: str, log_path: str) -> Dict:
        """使用Splunk分析日志"""
        try:
            # 发送日志到Splunk
            cmd = f"ssh {target} 'cat {log_path} | curl -k https://splunk:8088/services/collector/event -H \"Authorization: Splunk token\" -d @-'"
            result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
            
            # 查询分析结果
            cmd = "curl -k https://splunk:8089/services/search/jobs/export -H \"Authorization: Splunk token\" -d 'search=search * | head 100'"
            result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
            
            return {'output': result.stdout}
        except Exception as e:
            return {'error': str(e)}
    
    def _analyze_logs_basic(self, target: str, log_path: str) -> Dict:
        """基本日志分析"""
        try:
            # 分析系统日志
            cmd = f"ssh {target} 'grep -i \"error\\|warning\\|critical\" {log_path}'"
            result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
            
            return {'output': result.stdout}
        except Exception as e:
            return {'error': str(e)}
    
    def _analyze_with_wireshark(self, target: str, pcap_file: str) -> Dict:
        """使用Wireshark分析网络流量"""
        try:
            if pcap_file:
                # 分析PCAP文件
                cmd = f"tshark -r {pcap_file} -q -z io,phs"
                result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
            else:
                # 实时捕获分析
                cmd = f"ssh {target} 'tcpdump -i any -w -' | tshark -i - -q -z io,phs"
                result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
            
            return {'output': result.stdout}
        except Exception as e:
            return {'error': str(e)}
    
    def _analyze_with_tcpdump(self, target: str) -> Dict:
        """使用tcpdump分析网络流量"""
        try:
            cmd = f"ssh {target} 'tcpdump -i any -n -tttt'"
            result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
            
            return {'output': result.stdout}
        except Exception as e:
            return {'error': str(e)}
    
    def _analyze_network_basic(self, target: str) -> Dict:
        """基本网络分析"""
        try:
            # 检查网络连接
            cmd = f"ssh {target} 'netstat -tuln; ss -tuln'"
            result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
            
            return {'output': result.stdout}
        except Exception as e:
            return {'error': str(e)}
    
    def _analyze_with_volatility(self, target: str, memory_dump: str) -> Dict:
        """使用Volatility分析内存"""
        try:
            # 分析进程
            cmd = f"volatility -f {memory_dump} --profile=Win7SP1x64 pslist"
            result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
            
            # 分析网络连接
            cmd = f"volatility -f {memory_dump} --profile=Win7SP1x64 netscan"
            result2 = subprocess.run(cmd, shell=True, capture_output=True, text=True)
            
            return {
                'processes': result.stdout,
                'network_connections': result2.stdout
            }
        except Exception as e:
            return {'error': str(e)}
    
    def _analyze_system_basic(self, target: str) -> Dict:
        """基本系统分析"""
        try:
            # 检查系统信息
            cmd = f"ssh {target} 'uname -a; cat /etc/os-release; df -h; free -m'"
            result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
            
            return {'output': result.stdout}
        except Exception as e:
            return {'error': str(e)}
    
    def _analyze_with_idapro(self, target: str, sample_path: str) -> Dict:
        """使用IDA Pro分析恶意代码"""
        try:
            # 启动IDA Pro分析
            cmd = f"idal -A -Sanalysis_script.idc {sample_path}"
            result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
            
            return {'output': result.stdout}
        except Exception as e:
            return {'error': str(e)}
    
    def _analyze_with_ghidra(self, target: str, sample_path: str) -> Dict:
        """使用Ghidra分析恶意代码"""
        try:
            # 启动Ghidra分析
            cmd = f"analyzeHeadless {sample_path} -import {sample_path} -script analysis_script.java"
            result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
            
            return {'output': result.stdout}
        except Exception as e:
            return {'error': str(e)}
    
    def _analyze_malware_basic(self, target: str, sample_path: str) -> Dict:
        """基本恶意代码分析"""
        try:
            # 检查文件信息
            cmd = f"ssh {target} 'file {sample_path}; strings {sample_path}'"
            result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
            
            return {'output': result.stdout}
        except Exception as e:
            return {'error': str(e)}

# 使用示例
if __name__ == '__main__':
    # 创建应急响应工具管理器
    tools = IncidentResponseTools('incident_tools.json')
    
    # 分析日志
    log_analysis = tools.analyze_logs('server1', '/var/log/syslog')
    print(json.dumps(log_analysis, indent=2))
    
    # 分析网络流量
    network_analysis = tools.analyze_network('server1')
    print(json.dumps(network_analysis, indent=2))
    
    # 分析系统状态
    system_analysis = tools.analyze_system('server1')
    print(json.dumps(system_analysis, indent=2))
    
    # 分析恶意代码
    malware_analysis = tools.analyze_malware('server1', '/path/to/malware')
    print(json.dumps(malware_analysis, indent=2))`}
              </pre>
            </div>
          </div>
        )}
        {activeTab === 'analysis' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">应急响应分析技术</h3>
            <div className="prose max-w-none">
              <ul className="list-disc pl-6">
                <li>日志分析：系统日志、应用日志、安全日志的收集与分析，发现异常行为和攻击痕迹。</li>
                <li>网络流量分析：抓包分析、流量溯源、异常流量检测，识别攻击路径和数据泄露。</li>
                <li>系统取证分析：内存、进程、文件、注册表等系统取证，定位攻击手法和后门。</li>
                <li>恶意代码分析：静态分析与动态分析结合，识别恶意代码行为和传播方式。</li>
              </ul>
              <h4 className="font-semibold text-lg mb-2">Python分析技术脚本示例</h4>
              <pre className="bg-gray-100 p-4 rounded mb-4">
{`import os
import subprocess
from typing import List

def analyze_logs(log_path: str) -> str:
    return subprocess.getoutput(f'grep -i "error|fail|unauthorized" {log_path}')

def analyze_network(target: str) -> str:
    return subprocess.getoutput(f'nmap -sV {target}')

def analyze_processes() -> str:
    return subprocess.getoutput('ps aux')

def analyze_malware(file_path: str) -> str:
    return subprocess.getoutput(f'strings {file_path}')

if __name__ == '__main__':
    print(analyze_logs('/var/log/auth.log'))
    print(analyze_network('192.168.1.1'))
    print(analyze_processes())
    print(analyze_malware('/tmp/suspicious.exe'))`}
              </pre>
            </div>
          </div>
        )}
        {activeTab === 'recovery' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">应急响应恢复措施</h3>
            <div className="prose max-w-none">
              <ul className="list-disc pl-6">
                <li>系统恢复：重装操作系统、恢复配置、修复受损文件。</li>
                <li>数据恢复：从备份恢复数据、修复数据库、验证数据完整性。</li>
                <li>服务恢复：重启服务、切换备用系统、恢复业务流程。</li>
                <li>安全加固：修补漏洞、加强访问控制、提升监控能力。</li>
              </ul>
              <h4 className="font-semibold text-lg mb-2">Python恢复措施脚本示例</h4>
              <pre className="bg-gray-100 p-4 rounded mb-4">
{`import os
import subprocess

def restore_system():
    os.system('systemctl restart sshd')
    os.system('systemctl restart nginx')

def restore_data(backup_path: str, target_path: str):
    os.system(f'cp -r {backup_path}/* {target_path}/')

def patch_system():
    os.system('apt update && apt upgrade -y')

if __name__ == '__main__':
    restore_system()
    restore_data('/backup', '/var/www/html')
    patch_system()`}
              </pre>
            </div>
          </div>
        )}
        {activeTab === 'case' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">应急响应实践案例</h3>
            <div className="prose max-w-none">
              <h4 className="font-semibold text-lg mb-2">案例一：Web服务器DDoS攻击</h4>
              <ol className="list-decimal pl-6">
                <li>事件发现：监控发现流量异常，服务器响应缓慢。</li>
                <li>事件分析：抓包分析流量，确认DDoS攻击，识别攻击源。</li>
                <li>事件处置：封禁攻击IP，启用防护策略，调整网络配置。</li>
                <li>系统恢复：重启服务，验证业务恢复，优化防护措施。</li>
              </ol>
              <h4 className="font-semibold text-lg mb-2">案例二：数据库SQL注入攻击</h4>
              <ol className="list-decimal pl-6">
                <li>事件发现：日志发现异常SQL语句，数据被篡改。</li>
                <li>事件分析：分析SQL日志，定位注入点，评估影响。</li>
                <li>事件处置：修复代码漏洞，恢复数据备份，提升输入校验。</li>
                <li>系统恢复：验证数据完整性，恢复服务，强化安全策略。</li>
              </ol>
              <h4 className="font-semibold text-lg mb-2">案例三：勒索软件感染</h4>
              <ol className="list-decimal pl-6">
                <li>事件发现：文件被加密，出现勒索提示。</li>
                <li>事件分析：分析感染范围，识别勒索软件类型。</li>
                <li>事件处置：隔离受感染主机，清除恶意程序，恢复备份文件。</li>
                <li>系统恢复：重建系统环境，恢复业务，完善备份和防护。</li>
              </ol>
              <h4 className="font-semibold text-lg mb-2">Python案例管理脚本示例</h4>
              <pre className="bg-gray-100 p-4 rounded mb-4">
{`import json
from datetime import datetime
from typing import List

class IncidentCase:
    def __init__(self, case_id, case_type, systems, time):
        self.case_id = case_id
        self.case_type = case_type
        self.systems = systems
        self.time = time
        self.steps = []
    def add_step(self, desc):
        self.steps.append({'desc': desc, 'time': datetime.now().isoformat()})
    def to_json(self):
        return json.dumps(self.__dict__, indent=2, default=str)

if __name__ == '__main__':
    case = IncidentCase('CASE-001', 'ddos', ['web1'], datetime.now())
    case.add_step('发现异常流量')
    case.add_step('分析流量特征')
    case.add_step('封禁攻击IP')
    case.add_step('恢复服务')
    print(case.to_json())`}
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/security/ops/config"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回配置管理
        </Link>
        <Link 
          href="/study/security/ops/recovery"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          灾难恢复 →
        </Link>
      </div>
    </div>
  );
} 
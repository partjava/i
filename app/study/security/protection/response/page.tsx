'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function SecurityResponsePage() {
  const [activeTab, setActiveTab] = useState('intro');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">应急响应</h1>

      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        <button
          onClick={() => setActiveTab('intro')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'intro'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          基础概念
        </button>
        <button
          onClick={() => setActiveTab('process')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'process'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          响应流程
        </button>
        <button
          onClick={() => setActiveTab('code')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'code'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          代码示例
        </button>
        <button
          onClick={() => setActiveTab('cases')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'cases'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          实践案例
        </button>
      </div>

      {/* 内容区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === 'intro' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">应急响应基础概念</h3>
            
            <div className="prose max-w-none">
              <h4 className="font-semibold text-lg mb-2">什么是应急响应？</h4>
              <p className="mb-4">
                应急响应是指在发生安全事件时，通过一系列预定的流程和措施，快速发现、分析、处置和恢复的过程。它是安全防护体系中的重要环节，通过及时有效的响应，可以最大限度地减少安全事件造成的损失。
              </p>

              <h4 className="font-semibold text-lg mb-2">应急响应的目标</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">1. 快速响应</h5>
                  <p className="text-sm text-gray-700">
                    确保在安全事件发生时能够快速响应：
                    <ul className="list-disc pl-6 mt-2">
                      <li>及时发现：通过监控系统及时发现安全事件</li>
                      <li>快速分析：快速分析事件性质和影响范围</li>
                      <li>及时处置：采取有效措施进行处置</li>
                      <li>快速恢复：尽快恢复系统正常运行</li>
                    </ul>
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">2. 损失控制</h5>
                  <p className="text-sm text-gray-700">
                    控制安全事件造成的损失：
                    <ul className="list-disc pl-6 mt-2">
                      <li>数据保护：保护重要数据不被泄露或破坏</li>
                      <li>业务影响：最小化对业务的影响</li>
                      <li>声誉保护：保护企业声誉</li>
                      <li>合规要求：满足相关合规要求</li>
                    </ul>
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">3. 经验总结</h5>
                  <p className="text-sm text-gray-700">
                    从事件中总结经验教训：
                    <ul className="list-disc pl-6 mt-2">
                      <li>事件分析：深入分析事件原因</li>
                      <li>流程优化：优化应急响应流程</li>
                      <li>能力提升：提升团队响应能力</li>
                      <li>预防措施：完善预防措施</li>
                    </ul>
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">4. 持续改进</h5>
                  <p className="text-sm text-gray-700">
                    持续改进应急响应能力：
                    <ul className="list-disc pl-6 mt-2">
                      <li>演练培训：定期进行应急演练</li>
                      <li>工具优化：优化应急响应工具</li>
                      <li>流程完善：完善响应流程</li>
                      <li>预案更新：及时更新应急预案</li>
                    </ul>
                  </p>
                </div>
              </div>

              {/* SVG图表：应急响应生命周期 */}
              <div className="my-8">
                <svg width="800" height="400" viewBox="0 0 800 400" className="w-full">
                  <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{stopColor: '#4F46E5', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: '#7C3AED', stopOpacity: 1}} />
                    </linearGradient>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#4F46E5"/>
                    </marker>
                  </defs>
                  
                  {/* 背景圆环 */}
                  <circle cx="400" cy="200" r="150" fill="none" stroke="#E5E7EB" strokeWidth="2"/>
                  
                  {/* 主要阶段 */}
                  <g transform="translate(400,200)">
                    {/* 准备阶段 */}
                    <g transform="rotate(-45)">
                      <rect x="-60" y="-30" width="120" height="60" rx="10" fill="url(#grad1)" opacity="0.9"/>
                      <text x="0" y="5" textAnchor="middle" fill="white" className="text-sm font-medium">准备阶段</text>
                    </g>
                    
                    {/* 检测阶段 */}
                    <g transform="rotate(45)">
                      <rect x="-60" y="-30" width="120" height="60" rx="10" fill="url(#grad1)" opacity="0.9"/>
                      <text x="0" y="5" textAnchor="middle" fill="white" className="text-sm font-medium">检测阶段</text>
                    </g>
                    
                    {/* 分析阶段 */}
                    <g transform="rotate(135)">
                      <rect x="-60" y="-30" width="120" height="60" rx="10" fill="url(#grad1)" opacity="0.9"/>
                      <text x="0" y="5" textAnchor="middle" fill="white" className="text-sm font-medium">分析阶段</text>
                    </g>
                    
                    {/* 处置阶段 */}
                    <g transform="rotate(225)">
                      <rect x="-60" y="-30" width="120" height="60" rx="10" fill="url(#grad1)" opacity="0.9"/>
                      <text x="0" y="5" textAnchor="middle" fill="white" className="text-sm font-medium">处置阶段</text>
                    </g>
                  </g>
                  
                  {/* 连接箭头 */}
                  <path d="M 400 50 L 400 350" stroke="#4F46E5" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  <path d="M 50 200 L 750 200" stroke="#4F46E5" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  
                  {/* 中心点 */}
                  <circle cx="400" cy="200" r="10" fill="#4F46E5"/>
                </svg>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'process' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">应急响应流程</h3>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">1. 准备阶段</h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    <b>准备工作：</b>
                    <ul className="list-disc pl-6 mt-1">
                      <li>建立应急响应团队</li>
                      <li>制定应急预案</li>
                      <li>准备应急工具</li>
                      <li>建立沟通机制</li>
                    </ul>
                  </p>
                  <p className="text-sm text-gray-700">
                    <b>关键要素：</b>
                    <ul className="list-disc pl-6 mt-1">
                      <li>明确职责分工</li>
                      <li>建立响应流程</li>
                      <li>准备技术工具</li>
                      <li>建立联系清单</li>
                    </ul>
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">2. 检测阶段</h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    <b>检测方法：</b>
                    <ul className="list-disc pl-6 mt-1">
                      <li>监控系统告警</li>
                      <li>日志分析</li>
                      <li>异常行为检测</li>
                      <li>威胁情报匹配</li>
                    </ul>
                  </p>
                  <p className="text-sm text-gray-700">
                    <b>关键指标：</b>
                    <ul className="list-disc pl-6 mt-1">
                      <li>告警准确性</li>
                      <li>检测及时性</li>
                      <li>覆盖范围</li>
                      <li>误报率</li>
                    </ul>
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">3. 分析阶段</h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    <b>分析内容：</b>
                    <ul className="list-disc pl-6 mt-1">
                      <li>事件性质</li>
                      <li>影响范围</li>
                      <li>攻击路径</li>
                      <li>损失评估</li>
                    </ul>
                  </p>
                  <p className="text-sm text-gray-700">
                    <b>分析方法：</b>
                    <ul className="list-disc pl-6 mt-1">
                      <li>日志分析</li>
                      <li>流量分析</li>
                      <li>系统检查</li>
                      <li>证据收集</li>
                    </ul>
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">4. 处置阶段</h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    <b>处置措施：</b>
                    <ul className="list-disc pl-6 mt-1">
                      <li>隔离受影响系统</li>
                      <li>阻断攻击源</li>
                      <li>修复漏洞</li>
                      <li>恢复系统</li>
                    </ul>
                  </p>
                  <p className="text-sm text-gray-700">
                    <b>注意事项：</b>
                    <ul className="list-disc pl-6 mt-1">
                      <li>保护证据</li>
                      <li>避免二次伤害</li>
                      <li>及时沟通</li>
                      <li>记录过程</li>
                    </ul>
                  </p>
                </div>
              </div>
            </div>

            {/* SVG图表：应急响应流程图 */}
            <div className="my-8">
              <svg width="800" height="400" viewBox="0 0 800 400" className="w-full">
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#4F46E5"/>
                  </marker>
                </defs>
                
                {/* 流程框 */}
                <g>
                  {/* 准备阶段 */}
                  <rect x="50" y="50" width="120" height="60" rx="10" fill="#4F46E5" opacity="0.9"/>
                  <text x="110" y="85" textAnchor="middle" fill="white" className="text-sm font-medium">准备阶段</text>
                  
                  {/* 检测阶段 */}
                  <rect x="250" y="50" width="120" height="60" rx="10" fill="#4F46E5" opacity="0.9"/>
                  <text x="310" y="85" textAnchor="middle" fill="white" className="text-sm font-medium">检测阶段</text>
                  
                  {/* 分析阶段 */}
                  <rect x="450" y="50" width="120" height="60" rx="10" fill="#4F46E5" opacity="0.9"/>
                  <text x="510" y="85" textAnchor="middle" fill="white" className="text-sm font-medium">分析阶段</text>
                  
                  {/* 处置阶段 */}
                  <rect x="650" y="50" width="120" height="60" rx="10" fill="#4F46E5" opacity="0.9"/>
                  <text x="710" y="85" textAnchor="middle" fill="white" className="text-sm font-medium">处置阶段</text>
                </g>
                
                {/* 连接箭头 */}
                <path d="M 170 80 L 250 80" stroke="#4F46E5" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                <path d="M 370 80 L 450 80" stroke="#4F46E5" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                <path d="M 570 80 L 650 80" stroke="#4F46E5" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                
                {/* 子流程 */}
                <g>
                  {/* 准备阶段子流程 */}
                  <rect x="50" y="150" width="120" height="40" rx="5" fill="#E5E7EB"/>
                  <text x="110" y="175" textAnchor="middle" className="text-sm">建立团队</text>
                  
                  <rect x="50" y="200" width="120" height="40" rx="5" fill="#E5E7EB"/>
                  <text x="110" y="225" textAnchor="middle" className="text-sm">制定预案</text>
                  
                  {/* 检测阶段子流程 */}
                  <rect x="250" y="150" width="120" height="40" rx="5" fill="#E5E7EB"/>
                  <text x="310" y="175" textAnchor="middle" className="text-sm">监控告警</text>
                  
                  <rect x="250" y="200" width="120" height="40" rx="5" fill="#E5E7EB"/>
                  <text x="310" y="225" textAnchor="middle" className="text-sm">日志分析</text>
                  
                  {/* 分析阶段子流程 */}
                  <rect x="450" y="150" width="120" height="40" rx="5" fill="#E5E7EB"/>
                  <text x="510" y="175" textAnchor="middle" className="text-sm">事件分析</text>
                  
                  <rect x="450" y="200" width="120" height="40" rx="5" fill="#E5E7EB"/>
                  <text x="510" y="225" textAnchor="middle" className="text-sm">影响评估</text>
                  
                  {/* 处置阶段子流程 */}
                  <rect x="650" y="150" width="120" height="40" rx="5" fill="#E5E7EB"/>
                  <text x="710" y="175" textAnchor="middle" className="text-sm">系统隔离</text>
                  
                  <rect x="650" y="200" width="120" height="40" rx="5" fill="#E5E7EB"/>
                  <text x="710" y="225" textAnchor="middle" className="text-sm">漏洞修复</text>
                </g>
                
                {/* 垂直连接线 */}
                <path d="M 110 110 L 110 150" stroke="#4F46E5" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                <path d="M 310 110 L 310 150" stroke="#4F46E5" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                <path d="M 510 110 L 510 150" stroke="#4F46E5" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                <path d="M 710 110 L 710 150" stroke="#4F46E5" strokeWidth="2" markerEnd="url(#arrowhead)"/>
              </svg>
            </div>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">应急响应代码示例</h3>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">1. 日志分析脚本</h4>
                <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
                  <code>{`# 日志分析脚本
import re
from datetime import datetime
import pandas as pd

class LogAnalyzer:
    def __init__(self, log_file):
        self.log_file = log_file
        self.patterns = {
            'failed_login': r'Failed password for .* from (\\S+)',
            'successful_login': r'Accepted password for .* from (\\S+)',
            'port_scan': r'Connection from (\\S+) .* port \\d+',
            'malware': r'Malware detected: (\\S+)'
        }
    
    def analyze_logs(self):
        results = {
            'failed_logins': [],
            'successful_logins': [],
            'port_scans': [],
            'malware_detections': []
        }
        
        with open(self.log_file, 'r') as f:
            for line in f:
                for event_type, pattern in self.patterns.items():
                    match = re.search(pattern, line)
                    if match:
                        timestamp = self._extract_timestamp(line)
                        ip = match.group(1)
                        results[event_type + 's'].append({
                            'timestamp': timestamp,
                            'ip': ip,
                            'raw_line': line.strip()
                        })
        
        return self._generate_report(results)
    
    def _extract_timestamp(self, line):
        # 提取时间戳的逻辑
        timestamp_pattern = r'\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}'
        match = re.search(timestamp_pattern, line)
        if match:
            return datetime.strptime(match.group(), '%Y-%m-%d %H:%M:%S')
        return None
    
    def _generate_report(self, results):
        report = {
            'summary': {
                'total_events': sum(len(v) for v in results.values()),
                'event_types': {k: len(v) for k, v in results.items()}
            },
            'details': results
        }
        return report

# 使用示例
analyzer = LogAnalyzer('security.log')
report = analyzer.analyze_logs()
print(report['summary'])`}</code>
                </pre>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">2. 应急响应自动化脚本</h4>
                <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
                  <code>{`# 应急响应自动化脚本
import subprocess
import logging
import json
from datetime import datetime

class IncidentResponse:
    def __init__(self):
        self.logger = self._setup_logger()
        self.incident_id = datetime.now().strftime('%Y%m%d_%H%M%S')
    
    def _setup_logger(self):
        logger = logging.getLogger('incident_response')
        logger.setLevel(logging.INFO)
        handler = logging.FileHandler(f'incident_{self.incident_id}.log')
        formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
        handler.setFormatter(formatter)
        logger.addHandler(handler)
        return logger
    
    def isolate_system(self, system_ip):
        """隔离受影响的系统"""
        try:
            # 更新防火墙规则
            subprocess.run(['iptables', '-A', 'INPUT', '-s', system_ip, '-j', 'DROP'])
            self.logger.info(f'System {system_ip} has been isolated')
            return True
        except Exception as e:
            self.logger.error(f'Failed to isolate system {system_ip}: {str(e)}')
            return False
    
    def collect_evidence(self, system_ip):
        """收集系统证据"""
        evidence = {
            'system_info': self._get_system_info(system_ip),
            'network_connections': self._get_network_connections(system_ip),
            'process_list': self._get_process_list(system_ip),
            'log_files': self._collect_logs(system_ip)
        }
        
        # 保存证据
        with open(f'evidence_{self.incident_id}.json', 'w') as f:
            json.dump(evidence, f, indent=4)
        
        self.logger.info(f'Evidence collected for system {system_ip}')
        return evidence
    
    def _get_system_info(self, system_ip):
        """获取系统信息"""
        try:
            result = subprocess.run(['ssh', system_ip, 'uname -a'], 
                                 capture_output=True, text=True)
            return result.stdout
        except Exception as e:
            self.logger.error(f'Failed to get system info: {str(e)}')
            return None
    
    def _get_network_connections(self, system_ip):
        """获取网络连接信息"""
        try:
            result = subprocess.run(['ssh', system_ip, 'netstat -tuln'], 
                                 capture_output=True, text=True)
            return result.stdout
        except Exception as e:
            self.logger.error(f'Failed to get network connections: {str(e)}')
            return None
    
    def _get_process_list(self, system_ip):
        """获取进程列表"""
        try:
            result = subprocess.run(['ssh', system_ip, 'ps aux'], 
                                 capture_output=True, text=True)
            return result.stdout
        except Exception as e:
            self.logger.error(f'Failed to get process list: {str(e)}')
            return None
    
    def _collect_logs(self, system_ip):
        """收集日志文件"""
        log_files = [
            '/var/log/auth.log',
            '/var/log/syslog',
            '/var/log/messages'
        ]
        
        logs = {}
        for log_file in log_files:
            try:
                result = subprocess.run(['ssh', system_ip, f'cat {log_file}'], 
                                     capture_output=True, text=True)
                logs[log_file] = result.stdout
            except Exception as e:
                self.logger.error(f'Failed to collect log {log_file}: {str(e)}')
        
        return logs

# 使用示例
response = IncidentResponse()
system_ip = '192.168.1.100'

# 隔离系统
if response.isolate_system(system_ip):
    # 收集证据
    evidence = response.collect_evidence(system_ip)
    print(f'Incident response completed. Evidence saved to evidence_{response.incident_id}.json')`}</code>
                </pre>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">3. 威胁情报查询脚本</h4>
                <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
                  <code>{`# 威胁情报查询脚本
import requests
import json
from datetime import datetime

class ThreatIntelligence:
    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = 'https://api.threatintel.com/v1'
        self.headers = {
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json'
        }
    
    def query_ip(self, ip):
        """查询IP地址的威胁情报"""
        endpoint = f'{self.base_url}/ip/{ip}'
        try:
            response = requests.get(endpoint, headers=self.headers)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f'Error querying IP {ip}: {str(e)}')
            return None
    
    def query_domain(self, domain):
        """查询域名的威胁情报"""
        endpoint = f'{self.base_url}/domain/{domain}'
        try:
            response = requests.get(endpoint, headers=self.headers)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f'Error querying domain {domain}: {str(e)}')
            return None
    
    def query_hash(self, file_hash):
        """查询文件哈希的威胁情报"""
        endpoint = f'{self.base_url}/hash/{file_hash}'
        try:
            response = requests.get(endpoint, headers=self.headers)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f'Error querying hash {file_hash}: {str(e)}')
            return None
    
    def analyze_results(self, results):
        """分析威胁情报结果"""
        if not results:
            return None
        
        analysis = {
            'timestamp': datetime.now().isoformat(),
            'risk_score': results.get('risk_score', 0),
            'threat_types': results.get('threat_types', []),
            'confidence': results.get('confidence', 0),
            'recommendations': results.get('recommendations', [])
        }
        
        return analysis

# 使用示例
api_key = 'your_api_key_here'
ti = ThreatIntelligence(api_key)

# 查询IP地址
ip_info = ti.query_ip('192.168.1.100')
if ip_info:
    analysis = ti.analyze_results(ip_info)
    print(json.dumps(analysis, indent=4))

# 查询域名
domain_info = ti.query_domain('example.com')
if domain_info:
    analysis = ti.analyze_results(domain_info)
    print(json.dumps(analysis, indent=4))

# 查询文件哈希
hash_info = ti.query_hash('abc123...')
if hash_info:
    analysis = ti.analyze_results(hash_info)
    print(json.dumps(analysis, indent=4))`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cases' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-3">应急响应实践案例</h3>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">案例1：勒索软件攻击应急响应</h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    <b>背景：</b>某企业遭受勒索软件攻击，多个系统被加密
                  </p>
                  <p className="text-sm text-gray-700">
                    <b>挑战：</b>
                    <ul className="list-disc pl-6 mt-1">
                      <li>系统范围广，影响严重</li>
                      <li>数据加密，业务中断</li>
                      <li>攻击来源不明</li>
                      <li>恢复时间紧迫</li>
                    </ul>
                  </p>
                  <p className="text-sm text-gray-700">
                    <b>响应过程：</b>
                    <ul className="list-disc pl-6 mt-1">
                      <li>立即隔离受感染系统</li>
                      <li>分析攻击路径和方式</li>
                      <li>评估数据损失情况</li>
                      <li>启动备份恢复流程</li>
                      <li>加强安全防护措施</li>
                    </ul>
                  </p>
                  <p className="text-sm text-gray-700">
                    <b>经验总结：</b>
                    <ul className="list-disc pl-6 mt-1">
                      <li>定期备份的重要性</li>
                      <li>及时更新安全补丁</li>
                      <li>加强员工安全意识</li>
                      <li>完善应急响应流程</li>
                    </ul>
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">案例2：数据泄露事件应急响应</h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    <b>背景：</b>某电商平台发生用户数据泄露事件
                  </p>
                  <p className="text-sm text-gray-700">
                    <b>挑战：</b>
                    <ul className="list-disc pl-6 mt-1">
                      <li>涉及用户隐私数据</li>
                      <li>影响范围大</li>
                      <li>合规要求严格</li>
                      <li>公众关注度高</li>
                    </ul>
                  </p>
                  <p className="text-sm text-gray-700">
                    <b>响应过程：</b>
                    <ul className="list-disc pl-6 mt-1">
                      <li>确认泄露范围和影响</li>
                      <li>通知相关用户</li>
                      <li>配合监管部门调查</li>
                      <li>加强数据安全措施</li>
                      <li>发布公开声明</li>
                    </ul>
                  </p>
                  <p className="text-sm text-gray-700">
                    <b>经验总结：</b>
                    <ul className="list-disc pl-6 mt-1">
                      <li>数据分类分级管理</li>
                      <li>完善访问控制机制</li>
                      <li>建立数据泄露预案</li>
                      <li>加强安全审计</li>
                    </ul>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/security/protection/monitor"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 安全监控
        </Link>
        <Link 
          href="/study/security/protection"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          返回安全防护 →
        </Link>
      </div>
    </div>
  );
} 
'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle,
  SectionTitle,
  BookParagraph,
  BookCode,
  BookAlert,
  BookList,
  TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '网络安全',
  chapterTitle: '应急响应',
  chapterNumber: 10,
  totalChapters: 10,
  subjectHref: '/study/security/protection',
  prevChapter: { label: '安全监控', href: '/study/security/protection/monitor' },
  theme: THEMES.security,
}

const logAnalyzerCode = `import re
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
print(report['summary'])`

const incidentResponseCode = `import subprocess
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
        with open(f'evidence_{self.incident_id}.json', 'w') as f:
            json.dump(evidence, f, indent=4)
        self.logger.info(f'Evidence collected for system {system_ip}')
        return evidence

    def _get_system_info(self, system_ip):
        try:
            result = subprocess.run(['ssh', system_ip, 'uname -a'], capture_output=True, text=True)
            return result.stdout
        except Exception as e:
            self.logger.error(f'Failed to get system info: {str(e)}')
            return None

    def _get_network_connections(self, system_ip):
        try:
            result = subprocess.run(['ssh', system_ip, 'netstat -tuln'], capture_output=True, text=True)
            return result.stdout
        except Exception as e:
            self.logger.error(f'Failed to get network connections: {str(e)}')
            return None

    def _get_process_list(self, system_ip):
        try:
            result = subprocess.run(['ssh', system_ip, 'ps aux'], capture_output=True, text=True)
            return result.stdout
        except Exception as e:
            self.logger.error(f'Failed to get process list: {str(e)}')
            return None

    def _collect_logs(self, system_ip):
        log_files = ['/var/log/auth.log', '/var/log/syslog', '/var/log/messages']
        logs = {}
        for log_file in log_files:
            try:
                result = subprocess.run(['ssh', system_ip, f'cat {log_file}'], capture_output=True, text=True)
                logs[log_file] = result.stdout
            except Exception as e:
                self.logger.error(f'Failed to collect log {log_file}: {str(e)}')
        return logs

# 使用示例
response = IncidentResponse()
system_ip = '192.168.1.100'
if response.isolate_system(system_ip):
    evidence = response.collect_evidence(system_ip)
    print(f'Incident response completed. Evidence saved to evidence_{response.incident_id}.json')`

const threatIntelCode = `import requests
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
        endpoint = f'{self.base_url}/ip/{ip}'
        try:
            response = requests.get(endpoint, headers=self.headers)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f'Error querying IP {ip}: {str(e)}')
            return None

    def query_domain(self, domain):
        endpoint = f'{self.base_url}/domain/{domain}'
        try:
            response = requests.get(endpoint, headers=self.headers)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f'Error querying domain {domain}: {str(e)}')
            return None

    def query_hash(self, file_hash):
        endpoint = f'{self.base_url}/hash/{file_hash}'
        try:
            response = requests.get(endpoint, headers=self.headers)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f'Error querying hash {file_hash}: {str(e)}')
            return None

    def analyze_results(self, results):
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
ip_info = ti.query_ip('192.168.1.100')
if ip_info:
    analysis = ti.analyze_results(ip_info)
    print(json.dumps(analysis, indent=4))
domain_info = ti.query_domain('example.com')
if domain_info:
    analysis = ti.analyze_results(domain_info)
    print(json.dumps(analysis, indent=4))
hash_info = ti.query_hash('abc123...')
if hash_info:
    analysis = ti.analyze_results(hash_info)
    print(json.dumps(analysis, indent=4))`

const SPREADS = [
  {
    label: '基础概念',
    left: (
      <div className="space-y-4">
        <PageTitle>应急响应基础概念</PageTitle>
        <BookParagraph>应急响应是指在发生安全事件时，通过一系列预定的流程和措施，快速发现、分析、处置和恢复的过程。它是安全防护体系中的重要环节，通过及时有效的响应，可以最大限度地减少安全事件造成的损失。</BookParagraph>
        <SectionTitle>应急响应的目标</SectionTitle>
        <BookList items={[
          '快速响应：及时发现安全事件，快速分析事件性质和影响范围，采取有效措施进行处置，尽快恢复系统正常运行',
          '损失控制：保护重要数据不被泄露或破坏，最小化对业务的影响，保护企业声誉，满足相关合规要求',
          '经验总结：深入分析事件原因，优化应急响应流程，提升团队响应能力，完善预防措施',
          '持续改进：定期进行应急演练，优化应急响应工具，完善响应流程，及时更新应急预案',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>应急响应生命周期</PageTitle>
        <BookList items={[
          '准备阶段：建立应急响应团队，制定应急预案，准备应急工具，建立沟通机制，明确职责分工',
          '检测阶段：监控系统告警，日志分析，异常行为检测，威胁情报匹配，关注告警准确性和检测及时性',
          '分析阶段：分析事件性质、影响范围、攻击路径和损失评估，使用日志分析、流量分析、系统检查和证据收集',
          '处置阶段：隔离受影响系统，阻断攻击源，修复漏洞，恢复系统，注意保护证据，避免二次伤害',
        ]} />
      </div>
    ),
  },
  {
    label: '响应流程',
    left: (
      <div className="space-y-4">
        <PageTitle>应急响应流程详解</PageTitle>
        <SectionTitle>1. 准备阶段</SectionTitle>
        <BookParagraph>建立应急响应团队，制定应急预案，准备技术工具，建立联系清单，明确职责分工。</BookParagraph>
        <SectionTitle>2. 检测阶段</SectionTitle>
        <BookParagraph>通过监控系统告警、日志分析、异常行为检测、威胁情报匹配等方式发现安全事件。</BookParagraph>
        <SectionTitle>3. 分析阶段</SectionTitle>
        <BookParagraph>分析事件性质、影响范围、攻击路径，评估损失。使用日志分析、流量分析、系统检查等方法。</BookParagraph>
        <SectionTitle>4. 处置阶段</SectionTitle>
        <BookParagraph>隔离受影响系统，阻断攻击源，修复漏洞，恢复系统。注意保护证据，避免二次伤害，及时沟通，记录过程。</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>实践案例</PageTitle>
        <SectionTitle>案例1：勒索软件攻击应急响应</SectionTitle>
        <BookParagraph>某企业遭受勒索软件攻击，多个系统被加密。响应过程：立即隔离受感染系统，分析攻击路径和方式，评估数据损失情况，启动备份恢复流程，加强安全防护措施。经验：定期备份的重要性、及时更新安全补丁、加强员工安全意识。</BookParagraph>
        <SectionTitle>案例2：数据泄露事件应急响应</SectionTitle>
        <BookParagraph>某电商平台发生用户数据泄露事件。响应过程：确认泄露范围和影响，通知相关用户，配合监管部门调查，加强数据安全措施，发布公开声明。经验：数据分类分级管理、完善访问控制机制、建立数据泄露预案。</BookParagraph>
      </div>
    ),
  },
  {
    label: '代码示例',
    left: (
      <div className="space-y-4">
        <PageTitle>日志分析脚本</PageTitle>
        <BookCode language="python" code={logAnalyzerCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>应急响应自动化脚本</PageTitle>
        <BookCode language="python" code={incidentResponseCode} />
      </div>
    ),
  },
  {
    label: '威胁情报',
    left: (
      <div className="space-y-4">
        <PageTitle>威胁情报查询脚本</PageTitle>
        <BookCode language="python" code={threatIntelCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>总结与最佳实践</PageTitle>
        <BookList items={[
          '建立完善的应急响应预案和团队',
          '定期进行应急演练和培训',
          '部署自动化响应工具',
          '建立威胁情报收集和分析机制',
          '加强备份和容灾能力',
          '持续改进应急响应流程',
          '建立安全事件报告和追溯机制',
        ]} />
      </div>
    ),
  },
]

export default function SecurityResponsePage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

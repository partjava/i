'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AIArchitecturePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'overview', label: '架构概述' },
    { id: 'components', label: '组件设计' },
    { id: 'scaling', label: '扩展性设计' },
    { id: 'security', label: '安全设计' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">AI系统架构设计</h1>
      
      {/* 标签导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-medium whitespace-nowrap ${
              activeTab === tab.id 
                ? 'border-b-2 border-blue-500 text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 内容区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">架构概述</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 整体架构</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      AI系统的整体架构设计需要考虑多个方面，包括数据处理、模型训练、服务部署等。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# AI系统整体架构

## 1. 数据层
- 数据采集
- 数据存储
- 数据预处理
- 数据版本控制

## 2. 模型层
- 模型训练
- 模型评估
- 模型版本管理
- 模型部署

## 3. 服务层
- API服务
- 负载均衡
- 服务监控
- 故障恢复

## 4. 应用层
- 用户界面
- 业务逻辑
- 权限控制
- 日志记录

## 5. 基础设施层
- 计算资源
- 存储资源
- 网络资源
- 安全防护`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 架构模式</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      选择合适的架构模式可以提高系统的可维护性和可扩展性。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 常见架构模式

## 1. 微服务架构
- 服务解耦
- 独立部署
- 技术栈灵活
- 扩展性好

## 2. 事件驱动架构
- 异步处理
- 松耦合
- 高并发
- 实时响应

## 3. 分层架构
- 职责分离
- 代码复用
- 维护简单
- 测试方便

## 4. 管道架构
- 数据处理
- 模块化
- 可组合
- 并行处理

## 5. 领域驱动设计
- 业务建模
- 领域隔离
- 代码组织
- 团队协作`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 技术选型</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      根据系统需求选择合适的技术栈。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 技术栈选型

## 1. 开发语言
- Python: 数据处理、模型训练
- Java/Go: 服务开发
- JavaScript: 前端开发

## 2. 框架选择
- 深度学习: PyTorch/TensorFlow
- Web服务: Flask/FastAPI
- 微服务: Spring Cloud
- 前端: React/Vue

## 3. 数据库
- 关系型: MySQL/PostgreSQL
- NoSQL: MongoDB/Redis
- 时序: InfluxDB
- 图数据库: Neo4j

## 4. 中间件
- 消息队列: Kafka/RabbitMQ
- 缓存: Redis
- 搜索引擎: Elasticsearch
- 服务发现: Consul

## 5. 部署工具
- 容器: Docker
- 编排: Kubernetes
- CI/CD: Jenkins
- 监控: Prometheus`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'components' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">组件设计</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 数据处理组件</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      数据处理组件负责数据的采集、清洗和转换。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 数据处理组件设计

## 1. 数据采集器
class DataCollector:
    def __init__(self, config):
        self.config = config
    
    def collect(self):
        """采集数据"""
        pass
    
    def validate(self):
        """验证数据"""
        pass

## 2. 数据清洗器
class DataCleaner:
    def __init__(self, config):
        self.config = config
    
    def clean(self, data):
        """清洗数据"""
        pass
    
    def transform(self, data):
        """转换数据"""
        pass

## 3. 数据存储
class DataStorage:
    def __init__(self, config):
        self.config = config
    
    def save(self, data):
        """保存数据"""
        pass
    
    def load(self):
        """加载数据"""
        pass

## 4. 数据版本控制
class DataVersionControl:
    def __init__(self, config):
        self.config = config
    
    def version(self, data):
        """版本控制"""
        pass
    
    def rollback(self, version):
        """回滚版本"""
        pass`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 模型训练组件</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      模型训练组件负责模型的训练、评估和优化。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 模型训练组件设计

## 1. 模型定义
class Model:
    def __init__(self, config):
        self.config = config
        self.model = self.build_model()
    
    def build_model(self):
        """构建模型"""
        pass
    
    def compile(self):
        """编译模型"""
        pass

## 2. 训练器
class Trainer:
    def __init__(self, model, data):
        self.model = model
        self.data = data
    
    def train(self):
        """训练模型"""
        pass
    
    def evaluate(self):
        """评估模型"""
        pass

## 3. 优化器
class Optimizer:
    def __init__(self, model):
        self.model = model
    
    def optimize(self):
        """优化模型"""
        pass
    
    def tune(self):
        """调优参数"""
        pass

## 4. 模型管理
class ModelManager:
    def __init__(self, config):
        self.config = config
    
    def save(self, model):
        """保存模型"""
        pass
    
    def load(self, path):
        """加载模型"""
        pass`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 服务组件</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      服务组件负责模型的部署和API服务。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 服务组件设计

## 1. API服务
class APIService:
    def __init__(self, model):
        self.model = model
    
    def predict(self, data):
        """预测接口"""
        pass
    
    def batch_predict(self, data):
        """批量预测"""
        pass

## 2. 负载均衡
class LoadBalancer:
    def __init__(self, config):
        self.config = config
    
    def route(self, request):
        """路由请求"""
        pass
    
    def health_check(self):
        """健康检查"""
        pass

## 3. 服务监控
class ServiceMonitor:
    def __init__(self, config):
        self.config = config
    
    def monitor(self):
        """监控服务"""
        pass
    
    def alert(self):
        """告警"""
        pass

## 4. 故障恢复
class FaultRecovery:
    def __init__(self, config):
        self.config = config
    
    def detect(self):
        """检测故障"""
        pass
    
    def recover(self):
        """恢复服务"""
        pass`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'scaling' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">扩展性设计</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 水平扩展</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      通过增加节点数量来提高系统容量。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 水平扩展设计

## 1. 服务复制
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ai-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: ai-service
  template:
    metadata:
      labels:
        app: ai-service
    spec:
      containers:
      - name: ai-service
        image: ai-service:latest
        ports:
        - containerPort: 8000

## 2. 负载均衡
apiVersion: v1
kind: Service
metadata:
  name: ai-service
spec:
  selector:
    app: ai-service
  ports:
  - port: 80
    targetPort: 8000
  type: LoadBalancer

## 3. 自动扩缩容
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: ai-service
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: ai-service
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 80`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 垂直扩展</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      通过增加单个节点的资源来提高系统性能。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 垂直扩展设计

## 1. 资源限制
apiVersion: v1
kind: Pod
metadata:
  name: ai-service
spec:
  containers:
  - name: ai-service
    image: ai-service:latest
    resources:
      requests:
        memory: "1Gi"
        cpu: "500m"
      limits:
        memory: "2Gi"
        cpu: "1000m"

## 2. GPU支持
apiVersion: v1
kind: Pod
metadata:
  name: ai-service
spec:
  containers:
  - name: ai-service
    image: ai-service:latest
    resources:
      limits:
        nvidia.com/gpu: 1

## 3. 存储扩展
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: ai-data
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 100Gi`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 分布式设计</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      通过分布式架构提高系统的可用性和性能。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 分布式设计

## 1. 数据分片
class DataSharding:
    def __init__(self, config):
        self.config = config
    
    def shard(self, data):
        """数据分片"""
        pass
    
    def merge(self, shards):
        """合并分片"""
        pass

## 2. 任务调度
class TaskScheduler:
    def __init__(self, config):
        self.config = config
    
    def schedule(self, tasks):
        """调度任务"""
        pass
    
    def monitor(self):
        """监控任务"""
        pass

## 3. 状态同步
class StateSync:
    def __init__(self, config):
        self.config = config
    
    def sync(self):
        """同步状态"""
        pass
    
    def resolve(self):
        """解决冲突"""
        pass

## 4. 故障转移
class Failover:
    def __init__(self, config):
        self.config = config
    
    def detect(self):
        """检测故障"""
        pass
    
    def transfer(self):
        """转移服务"""
        pass`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">安全设计</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 认证授权</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      实现用户认证和权限控制。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 认证授权设计

## 1. 用户认证
class Authentication:
    def __init__(self, config):
        self.config = config
    
    def login(self, credentials):
        """用户登录"""
        pass
    
    def verify(self, token):
        """验证令牌"""
        pass

## 2. 权限控制
class Authorization:
    def __init__(self, config):
        self.config = config
    
    def check(self, user, resource):
        """检查权限"""
        pass
    
    def grant(self, user, permission):
        """授予权限"""
        pass

## 3. 角色管理
class RoleManager:
    def __init__(self, config):
        self.config = config
    
    def assign(self, user, role):
        """分配角色"""
        pass
    
    def revoke(self, user, role):
        """撤销角色"""
        pass

## 4. 访问控制
class AccessControl:
    def __init__(self, config):
        self.config = config
    
    def allow(self, user, action):
        """允许访问"""
        pass
    
    def deny(self, user, action):
        """拒绝访问"""
        pass`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 数据安全</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      保护数据的安全性和隐私性。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 数据安全设计

## 1. 数据加密
class DataEncryption:
    def __init__(self, config):
        self.config = config
    
    def encrypt(self, data):
        """加密数据"""
        pass
    
    def decrypt(self, data):
        """解密数据"""
        pass

## 2. 数据脱敏
class DataMasking:
    def __init__(self, config):
        self.config = config
    
    def mask(self, data):
        """脱敏数据"""
        pass
    
    def unmask(self, data):
        """还原数据"""
        pass

## 3. 数据备份
class DataBackup:
    def __init__(self, config):
        self.config = config
    
    def backup(self):
        """备份数据"""
        pass
    
    def restore(self):
        """恢复数据"""
        pass

## 4. 数据审计
class DataAudit:
    def __init__(self, config):
        self.config = config
    
    def log(self, action):
        """记录操作"""
        pass
    
    def analyze(self):
        """分析日志"""
        pass`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 系统安全</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      保护系统的安全性和稳定性。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 系统安全设计

## 1. 网络安全
class NetworkSecurity:
    def __init__(self, config):
        self.config = config
    
    def firewall(self):
        """防火墙"""
        pass
    
    def vpn(self):
        """VPN"""
        pass

## 2. 入侵检测
class IntrusionDetection:
    def __init__(self, config):
        self.config = config
    
    def detect(self):
        """检测入侵"""
        pass
    
    def alert(self):
        """告警"""
        pass

## 3. 漏洞扫描
class VulnerabilityScan:
    def __init__(self, config):
        self.config = config
    
    def scan(self):
        """扫描漏洞"""
        pass
    
    def fix(self):
        """修复漏洞"""
        pass

## 4. 安全监控
class SecurityMonitor:
    def __init__(self, config):
        self.config = config
    
    def monitor(self):
        """监控安全"""
        pass
    
    def report(self):
        """报告问题"""
        pass`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/ai/programming/workflow"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← AI项目开发流程
        </Link>
        <Link 
          href="/study/ai/programming/deployment"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          模型部署与优化 →
        </Link>
      </div>
    </div>
  );
} 
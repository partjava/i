'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AIWorkflowPage() {
  const [activeTab, setActiveTab] = useState('planning');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'planning', label: '项目规划' },
    { id: 'development', label: '开发流程' },
    { id: 'testing', label: '测试部署' },
    { id: 'maintenance', label: '维护优化' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">AI项目开发流程</h1>
      
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
        {activeTab === 'planning' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">项目规划</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 需求分析</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      在开始AI项目之前，需要进行详细的需求分析。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 需求分析清单

## 业务需求
- 项目目标
- 预期效果
- 业务约束
- 时间要求

## 技术需求
- 算法选择
- 性能要求
- 部署环境
- 集成需求

## 数据需求
- 数据来源
- 数据质量
- 数据量
- 数据格式

## 资源需求
- 硬件资源
- 软件资源
- 人力资源
- 预算限制`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 项目规划</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      制定详细的项目计划，包括时间安排和资源分配。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 项目计划模板

## 项目概述
- 项目名称
- 项目描述
- 项目目标
- 项目范围

## 时间安排
1. 准备阶段 (2周)
   - 环境搭建
   - 数据收集
   - 需求确认

2. 开发阶段 (4周)
   - 模型设计
   - 代码实现
   - 单元测试

3. 测试阶段 (2周)
   - 集成测试
   - 性能测试
   - 问题修复

4. 部署阶段 (1周)
   - 系统部署
   - 文档编写
   - 培训支持

## 资源分配
- 项目经理
- 算法工程师
- 开发工程师
- 测试工程师
- 运维工程师

## 风险管理
- 技术风险
- 进度风险
- 资源风险
- 应对策略`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 技术选型</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      选择合适的开发框架和工具。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 技术选型清单

## 开发框架
- PyTorch/TensorFlow
- Scikit-learn
- OpenCV
- NLTK/SpaCy

## 开发工具
- IDE: PyCharm/VSCode
- 版本控制: Git
- 项目管理: Jira
- 文档工具: Sphinx

## 部署工具
- Docker
- Kubernetes
- CI/CD: Jenkins
- 监控: Prometheus

## 测试工具
- 单元测试: pytest
- 性能测试: locust
- 代码质量: pylint
- 覆盖率: coverage`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'development' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">开发流程</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 环境搭建</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      搭建开发环境，包括开发工具和依赖包。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 环境搭建步骤

## 1. 创建虚拟环境
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\\Scripts\\activate   # Windows

## 2. 安装依赖
pip install -r requirements.txt

## 3. 配置开发工具
# .vscode/settings.json
{
    "python.linting.enabled": true,
    "python.linting.pylintEnabled": true,
    "python.formatting.provider": "black"
}

## 4. 配置Git
git init
git add .
git commit -m "Initial commit"

## 5. 配置Docker
# Dockerfile
FROM python:3.8
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 代码开发</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      按照项目计划进行代码开发。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 开发流程示例

## 1. 数据处理模块
class DataProcessor:
    def __init__(self, config):
        self.config = config
    
    def load_data(self):
        """加载数据"""
        pass
    
    def preprocess(self):
        """数据预处理"""
        pass
    
    def split_data(self):
        """数据分割"""
        pass

## 2. 模型定义
class Model:
    def __init__(self, config):
        self.config = config
        self.model = self.build_model()
    
    def build_model(self):
        """构建模型"""
        pass
    
    def train(self, data):
        """训练模型"""
        pass
    
    def evaluate(self, data):
        """评估模型"""
        pass

## 3. 训练流程
def train_pipeline():
    # 加载配置
    config = load_config()
    
    # 准备数据
    processor = DataProcessor(config)
    data = processor.load_data()
    
    # 训练模型
    model = Model(config)
    model.train(data)
    
    # 评估模型
    results = model.evaluate(data)
    
    return results`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 版本控制</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      使用Git进行版本控制，管理代码变更。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# Git工作流程

## 1. 分支管理
# 创建开发分支
git checkout -b develop

# 创建功能分支
git checkout -b feature/new-model

## 2. 代码提交
# 添加修改
git add .

# 提交修改
git commit -m "feat: add new model architecture"

## 3. 代码合并
# 合并到开发分支
git checkout develop
git merge feature/new-model

# 合并到主分支
git checkout main
git merge develop

## 4. 版本发布
# 创建标签
git tag -a v1.0.0 -m "First release"

# 推送标签
git push origin v1.0.0`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'testing' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">测试部署</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 单元测试</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      编写单元测试，确保代码质量。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 单元测试示例

## 1. 测试配置
# conftest.py
import pytest

@pytest.fixture
def sample_data():
    return {
        'input': [1, 2, 3],
        'output': [2, 4, 6]
    }

## 2. 测试用例
# test_model.py
def test_model_initialization():
    model = Model(config)
    assert model is not None
    assert model.model is not None

def test_model_prediction(sample_data):
    model = Model(config)
    predictions = model.predict(sample_data['input'])
    assert len(predictions) == len(sample_data['output'])
    assert all(p == o for p, o in zip(predictions, sample_data['output']))

## 3. 运行测试
# 运行所有测试
pytest

# 运行特定测试
pytest test_model.py

# 生成覆盖率报告
pytest --cov=src tests/`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 性能测试</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      进行性能测试，确保系统性能满足要求。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 性能测试示例

## 1. 模型性能测试
def test_model_performance():
    # 准备测试数据
    test_data = generate_test_data(1000)
    
    # 测试推理时间
    start_time = time.time()
    predictions = model.predict(test_data)
    inference_time = time.time() - start_time
    
    # 测试内存使用
    memory_usage = get_memory_usage()
    
    # 测试GPU使用
    gpu_usage = get_gpu_usage()
    
    # 输出测试结果
    print(f"推理时间: {inference_time:.2f}秒")
    print(f"内存使用: {memory_usage:.2f}MB")
    print(f"GPU使用: {gpu_usage:.2f}%")

## 2. API性能测试
from locust import HttpUser, task, between

class APIUser(HttpUser):
    wait_time = between(1, 3)
    
    @task
    def test_prediction(self):
        self.client.post("/predict", json={
            "data": [1, 2, 3]
        })

## 3. 运行性能测试
# 运行模型测试
python test_performance.py

# 运行API测试
locust -f test_api.py`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 部署流程</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      部署系统到生产环境。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 部署流程示例

## 1. Docker部署
# 构建镜像
docker build -t ai-model:latest .

# 运行容器
docker run -d -p 8000:8000 ai-model:latest

## 2. Kubernetes部署
# 部署配置
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ai-model
spec:
  replicas: 3
  selector:
    matchLabels:
      app: ai-model
  template:
    metadata:
      labels:
        app: ai-model
    spec:
      containers:
      - name: ai-model
        image: ai-model:latest
        ports:
        - containerPort: 8000

## 3. 监控配置
# Prometheus配置
scrape_configs:
  - job_name: 'ai-model'
    static_configs:
      - targets: ['ai-model:8000']

# Grafana仪表板
- CPU使用率
- 内存使用率
- 请求延迟
- 错误率`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'maintenance' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">维护优化</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 性能监控</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      监控系统性能，及时发现和解决问题。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 性能监控示例

## 1. 系统监控
# 监控指标
- CPU使用率
- 内存使用率
- 磁盘使用率
- 网络流量

## 2. 应用监控
# 监控指标
- 请求延迟
- 错误率
- 并发数
- 响应时间

## 3. 模型监控
# 监控指标
- 预测准确率
- 模型延迟
- 资源使用
- 数据分布

## 4. 告警配置
# 告警规则
- CPU > 80%
- 内存 > 90%
- 错误率 > 1%
- 延迟 > 100ms`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 模型优化</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      优化模型性能，提高预测准确率。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 模型优化示例

## 1. 模型压缩
# 量化
model = torch.quantization.quantize_dynamic(
    model, {torch.nn.Linear}, dtype=torch.qint8
)

# 剪枝
pruner = torch.nn.utils.prune.l1_unstructured
pruner(model.linear, name='weight', amount=0.3)

## 2. 模型蒸馏
# 教师模型
teacher_model = load_teacher_model()

# 学生模型
student_model = create_student_model()

# 蒸馏训练
def distillation_loss(student_logits, teacher_logits, labels):
    # 计算蒸馏损失
    pass

## 3. 模型更新
# 增量学习
def update_model(model, new_data):
    # 使用新数据更新模型
    pass

# 模型重训练
def retrain_model(model, full_data):
    # 使用完整数据重新训练
    pass`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 系统维护</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      维护系统稳定性，确保服务质量。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 系统维护示例

## 1. 日志管理
# 日志配置
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('app.log'),
        logging.StreamHandler()
    ]
)

## 2. 备份策略
# 数据备份
def backup_data():
    # 备份数据
    pass

# 模型备份
def backup_model():
    # 备份模型
    pass

## 3. 故障恢复
# 健康检查
def health_check():
    # 检查系统健康状态
    pass

# 自动恢复
def auto_recovery():
    # 自动恢复系统
    pass

## 4. 版本更新
# 更新检查
def check_updates():
    # 检查更新
    pass

# 自动更新
def auto_update():
    # 自动更新系统
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
          href="/study/ai/programming/coding-standards"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← AI编程规范
        </Link>
        <Link 
          href="/study/ai/programming/architecture"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          AI系统架构设计 →
        </Link>
      </div>
    </div>
  );
} 
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ModelDeploymentPage() {
  const [activeTab, setActiveTab] = useState('deployment');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'deployment', label: '模型部署' },
    { id: 'optimization', label: '性能优化' },
    { id: 'monitoring', label: '监控维护' },
    { id: 'scaling', label: '扩展部署' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">模型部署与优化</h1>
      
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
        {activeTab === 'deployment' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">模型部署</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 模型打包</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      将训练好的模型打包成可部署的格式。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# PyTorch模型打包
import torch

# 保存模型
def save_model(model, path):
    """保存模型到文件"""
    torch.save({
        'model_state_dict': model.state_dict(),
        'optimizer_state_dict': optimizer.state_dict(),
        'epoch': epoch,
        'loss': loss,
    }, path)

# 加载模型
def load_model(path):
    """从文件加载模型"""
    checkpoint = torch.load(path)
    model.load_state_dict(checkpoint['model_state_dict'])
    optimizer.load_state_dict(checkpoint['optimizer_state_dict'])
    epoch = checkpoint['epoch']
    loss = checkpoint['loss']
    return model, optimizer, epoch, loss

# TensorFlow模型打包
import tensorflow as tf

# 保存模型
def save_model(model, path):
    """保存模型到文件"""
    model.save(path)

# 加载模型
def load_model(path):
    """从文件加载模型"""
    model = tf.keras.models.load_model(path)
    return model

# ONNX模型转换
import torch.onnx

# 转换为ONNX格式
def convert_to_onnx(model, input_shape, path):
    """将模型转换为ONNX格式"""
    dummy_input = torch.randn(input_shape)
    torch.onnx.export(model, dummy_input, path,
                     input_names=['input'],
                     output_names=['output'],
                     dynamic_axes={'input': {0: 'batch_size'},
                                 'output': {0: 'batch_size'}})`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 容器化部署</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      使用Docker容器化部署模型服务。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# Dockerfile
FROM python:3.8-slim

# 安装依赖
COPY requirements.txt .
RUN pip install -r requirements.txt

# 复制应用代码
COPY . .

# 设置环境变量
ENV MODEL_PATH=/app/models
ENV PORT=8000

# 启动服务
CMD ["python", "app.py"]

# 构建镜像
docker build -t ai-model:latest .

# 运行容器
docker run -d -p 8000:8000 ai-model:latest

# 使用GPU
docker run -d --gpus all -p 8000:8000 ai-model:latest

# 使用数据卷
docker run -d -v /host/path:/container/path -p 8000:8000 ai-model:latest`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. API服务</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      提供RESTful API服务接口。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# FastAPI服务
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

# 配置CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 加载模型
model = load_model("model.pth")

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    """预测接口"""
    # 读取文件
    contents = await file.read()
    
    # 预处理数据
    data = preprocess(contents)
    
    # 模型预测
    prediction = model.predict(data)
    
    return {"prediction": prediction.tolist()}

@app.get("/health")
async def health_check():
    """健康检查"""
    return {"status": "healthy"}

# 启动服务
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'optimization' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">性能优化</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 模型优化</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      优化模型性能和资源使用。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 模型量化
import torch.quantization

# 量化模型
def quantize_model(model):
    """量化模型"""
    # 准备量化
    model.qconfig = torch.quantization.get_default_qconfig('fbgemm')
    torch.quantization.prepare(model, inplace=True)
    
    # 校准
    calibrate(model, calibration_data)
    
    # 转换
    torch.quantization.convert(model, inplace=True)
    return model

# 模型剪枝
import torch.nn.utils.prune as prune

# 剪枝模型
def prune_model(model, amount=0.3):
    """剪枝模型"""
    for name, module in model.named_modules():
        if isinstance(module, torch.nn.Conv2d):
            prune.l1_unstructured(module, name='weight', amount=amount)
    return model

# 模型蒸馏
class DistillationLoss(nn.Module):
    def __init__(self, alpha=0.5, temperature=2.0):
        super().__init__()
        self.alpha = alpha
        self.temperature = temperature
    
    def forward(self, student_logits, teacher_logits, labels):
        # 计算蒸馏损失
        distillation_loss = nn.KLDivLoss()(
            F.log_softmax(student_logits / self.temperature, dim=1),
            F.softmax(teacher_logits / self.temperature, dim=1)
        ) * (self.temperature ** 2)
        
        # 计算学生损失
        student_loss = F.cross_entropy(student_logits, labels)
        
        # 总损失
        total_loss = self.alpha * distillation_loss + (1 - self.alpha) * student_loss
        return total_loss`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 推理优化</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      优化模型推理性能。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 批处理优化
def batch_predict(model, data, batch_size=32):
    """批量预测"""
    predictions = []
    for i in range(0, len(data), batch_size):
        batch = data[i:i + batch_size]
        batch_pred = model(batch)
        predictions.extend(batch_pred)
    return predictions

# 缓存优化
from functools import lru_cache

@lru_cache(maxsize=128)
def cached_predict(input_data):
    """缓存预测结果"""
    return model.predict(input_data)

# 并行处理
from concurrent.futures import ThreadPoolExecutor

def parallel_predict(data_list):
    """并行预测"""
    with ThreadPoolExecutor(max_workers=4) as executor:
        predictions = list(executor.map(model.predict, data_list))
    return predictions

# GPU优化
def gpu_predict(model, data):
    """GPU预测"""
    # 移动数据到GPU
    data = data.cuda()
    
    # 使用CUDA流
    with torch.cuda.stream(torch.cuda.Stream()):
        predictions = model(data)
    
    # 同步GPU
    torch.cuda.synchronize()
    return predictions`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 内存优化</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      优化内存使用和资源管理。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 内存管理
import gc

def optimize_memory():
    """优化内存使用"""
    # 清理缓存
    torch.cuda.empty_cache()
    
    # 强制垃圾回收
    gc.collect()
    
    # 释放不需要的张量
    del unused_tensor
    torch.cuda.empty_cache()

# 资源限制
def limit_resources():
    """限制资源使用"""
    # 设置CPU线程数
    torch.set_num_threads(4)
    
    # 设置GPU内存分配
    torch.cuda.set_per_process_memory_fraction(0.8)
    
    # 设置最大内存使用
    torch.cuda.set_max_memory_allocated(1024 * 1024 * 1024)  # 1GB

# 内存监控
def monitor_memory():
    """监控内存使用"""
    # 获取GPU内存使用
    gpu_memory = torch.cuda.memory_allocated()
    
    # 获取CPU内存使用
    import psutil
    cpu_memory = psutil.Process().memory_info().rss
    
    return {
        'gpu_memory': gpu_memory,
        'cpu_memory': cpu_memory
    }`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'monitoring' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">监控维护</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 性能监控</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      监控系统性能和资源使用。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 性能监控
import time
import psutil
import torch

class PerformanceMonitor:
    def __init__(self):
        self.metrics = {}
    
    def start_monitoring(self):
        """开始监控"""
        self.start_time = time.time()
        self.start_memory = psutil.Process().memory_info().rss
    
    def end_monitoring(self):
        """结束监控"""
        self.end_time = time.time()
        self.end_memory = psutil.Process().memory_info().rss
        
        # 计算指标
        self.metrics['execution_time'] = self.end_time - self.start_time
        self.metrics['memory_usage'] = self.end_memory - self.start_memory
        self.metrics['gpu_memory'] = torch.cuda.memory_allocated()
        
        return self.metrics

# 使用示例
monitor = PerformanceMonitor()
monitor.start_monitoring()

# 执行操作
result = model.predict(data)

# 结束监控
metrics = monitor.end_monitoring()
print(f"执行时间: {metrics['execution_time']:.2f}秒")
print(f"内存使用: {metrics['memory_usage'] / 1024 / 1024:.2f}MB")
print(f"GPU内存: {metrics['gpu_memory'] / 1024 / 1024:.2f}MB")`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 日志记录</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      记录系统运行日志。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 日志记录
import logging
from logging.handlers import RotatingFileHandler

class Logger:
    def __init__(self, name, log_file):
        self.logger = logging.getLogger(name)
        self.logger.setLevel(logging.INFO)
        
        # 文件处理器
        file_handler = RotatingFileHandler(
            log_file,
            maxBytes=10*1024*1024,  # 10MB
            backupCount=5
        )
        file_handler.setLevel(logging.INFO)
        
        # 控制台处理器
        console_handler = logging.StreamHandler()
        console_handler.setLevel(logging.INFO)
        
        # 格式化
        formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        file_handler.setFormatter(formatter)
        console_handler.setFormatter(formatter)
        
        # 添加处理器
        self.logger.addHandler(file_handler)
        self.logger.addHandler(console_handler)
    
    def info(self, message):
        """记录信息"""
        self.logger.info(message)
    
    def error(self, message):
        """记录错误"""
        self.logger.error(message)
    
    def warning(self, message):
        """记录警告"""
        self.logger.warning(message)

# 使用示例
logger = Logger('model_service', 'model.log')
logger.info('模型服务启动')
logger.error('预测失败')
logger.warning('内存使用过高')`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 告警系统</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      实现系统告警机制。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 告警系统
import smtplib
from email.mime.text import MIMEText
import requests

class AlertSystem:
    def __init__(self, config):
        self.config = config
        self.thresholds = {
            'cpu_usage': 80,
            'memory_usage': 80,
            'gpu_usage': 80,
            'error_rate': 0.01
        }
    
    def check_metrics(self, metrics):
        """检查指标"""
        alerts = []
        
        # 检查CPU使用率
        if metrics['cpu_usage'] > self.thresholds['cpu_usage']:
            alerts.append(f"CPU使用率过高: {metrics['cpu_usage']}%")
        
        # 检查内存使用率
        if metrics['memory_usage'] > self.thresholds['memory_usage']:
            alerts.append(f"内存使用率过高: {metrics['memory_usage']}%")
        
        # 检查GPU使用率
        if metrics['gpu_usage'] > self.thresholds['gpu_usage']:
            alerts.append(f"GPU使用率过高: {metrics['gpu_usage']}%")
        
        # 检查错误率
        if metrics['error_rate'] > self.thresholds['error_rate']:
            alerts.append(f"错误率过高: {metrics['error_rate']}")
        
        return alerts
    
    def send_alert(self, alerts):
        """发送告警"""
        if not alerts:
            return
        
        # 发送邮件
        self.send_email(alerts)
        
        # 发送钉钉
        self.send_dingtalk(alerts)
        
        # 发送短信
        self.send_sms(alerts)
    
    def send_email(self, alerts):
        """发送邮件"""
        msg = MIMEText('\\n'.join(alerts))
        msg['Subject'] = '系统告警'
        msg['From'] = self.config['email_from']
        msg['To'] = self.config['email_to']
        
        with smtplib.SMTP(self.config['smtp_server']) as server:
            server.send_message(msg)
    
    def send_dingtalk(self, alerts):
        """发送钉钉"""
        url = self.config['dingtalk_webhook']
        data = {
            'msgtype': 'text',
            'text': {
                'content': '\\n'.join(alerts)
            }
        }
        requests.post(url, json=data)
    
    def send_sms(self, alerts):
        """发送短信"""
        # 实现短信发送逻辑
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
              <h3 className="text-xl font-semibold mb-3">扩展部署</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 负载均衡</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      实现负载均衡和请求分发。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 负载均衡配置
apiVersion: v1
kind: Service
metadata:
  name: ai-model-service
spec:
  selector:
    app: ai-model
  ports:
  - port: 80
    targetPort: 8000
  type: LoadBalancer

# Nginx配置
http {
    upstream ai_model {
        server 10.0.0.1:8000;
        server 10.0.0.2:8000;
        server 10.0.0.3:8000;
    }
    
    server {
        listen 80;
        
        location / {
            proxy_pass http://ai_model;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }
}

# 健康检查
def health_check():
    """健康检查"""
    try:
        response = requests.get('http://localhost:8000/health')
        return response.status_code == 200
    except:
        return False

# 服务发现
class ServiceDiscovery:
    def __init__(self):
        self.services = {}
    
    def register(self, service_id, address):
        """注册服务"""
        self.services[service_id] = {
            'address': address,
            'status': 'healthy',
            'last_check': time.time()
        }
    
    def deregister(self, service_id):
        """注销服务"""
        if service_id in self.services:
            del self.services[service_id]
    
    def get_healthy_services(self):
        """获取健康服务"""
        return [
            service for service in self.services.values()
            if service['status'] == 'healthy'
        ]`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 自动扩缩容</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      实现自动扩缩容机制。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# Kubernetes自动扩缩容
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: ai-model-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: ai-model
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 80
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80

# 自定义扩缩容
class AutoScaler:
    def __init__(self, config):
        self.config = config
        self.metrics = {}
    
    def collect_metrics(self):
        """收集指标"""
        self.metrics['cpu_usage'] = self.get_cpu_usage()
        self.metrics['memory_usage'] = self.get_memory_usage()
        self.metrics['request_rate'] = self.get_request_rate()
    
    def should_scale(self):
        """判断是否需要扩缩容"""
        if self.metrics['cpu_usage'] > 80:
            return 'scale_up'
        elif self.metrics['cpu_usage'] < 20:
            return 'scale_down'
        return None
    
    def scale(self, action):
        """执行扩缩容"""
        if action == 'scale_up':
            self.increase_replicas()
        elif action == 'scale_down':
            self.decrease_replicas()
    
    def increase_replicas(self):
        """增加副本数"""
        current = self.get_current_replicas()
        if current < self.config['max_replicas']:
            self.set_replicas(current + 1)
    
    def decrease_replicas(self):
        """减少副本数"""
        current = self.get_current_replicas()
        if current > self.config['min_replicas']:
            self.set_replicas(current - 1)`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 分布式部署</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      实现分布式部署和任务调度。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 分布式训练
import torch.distributed as dist
import torch.multiprocessing as mp

def setup(rank, world_size):
    """设置分布式环境"""
    os.environ['MASTER_ADDR'] = 'localhost'
    os.environ['MASTER_PORT'] = '12355'
    dist.init_process_group("nccl", rank=rank, world_size=world_size)

def cleanup():
    """清理分布式环境"""
    dist.destroy_process_group()

def train(rank, world_size):
    """分布式训练"""
    setup(rank, world_size)
    
    # 创建模型
    model = Model().to(rank)
    model = DistributedDataParallel(model, device_ids=[rank])
    
    # 训练循环
    for epoch in range(epochs):
        for batch in train_loader:
            loss = train_step(model, batch)
            loss.backward()
            optimizer.step()
    
    cleanup()

# 启动分布式训练
if __name__ == "__main__":
    world_size = torch.cuda.device_count()
    mp.spawn(train, args=(world_size,), nprocs=world_size)

# 分布式推理
class DistributedInference:
    def __init__(self, model, world_size):
        self.model = model
        self.world_size = world_size
    
    def distribute_data(self, data):
        """分发数据"""
        chunk_size = len(data) // self.world_size
        return [data[i:i + chunk_size] for i in range(0, len(data), chunk_size)]
    
    def gather_results(self, results):
        """收集结果"""
        return [item for sublist in results for item in sublist]
    
    def predict(self, data):
        """分布式预测"""
        # 分发数据
        chunks = self.distribute_data(data)
        
        # 并行预测
        with ThreadPoolExecutor(max_workers=self.world_size) as executor:
            results = list(executor.map(self.model.predict, chunks))
        
        # 收集结果
        return self.gather_results(results)`}
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
          href="/study/ai/programming/architecture"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← AI系统架构设计
        </Link>
        <Link 
          href="/study/ai/programming/project"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          AI项目实战 →
        </Link>
      </div>
    </div>
  );
} 
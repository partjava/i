'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaRobot, FaBrain, FaChartLine, FaCode, FaLightbulb, FaNetworkWired, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { SiScikitlearn, SiPandas, SiNumpy } from 'react-icons/si';

export default function ModelDeploymentPage() {
  const [activeTab, setActiveTab] = useState('theory');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">模型部署与优化</h1>
      
      {/* 进度条 */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '90%' }}></div>
      </div>

      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('theory')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'theory'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          理论知识
        </button>
        <button
          onClick={() => setActiveTab('practice')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'practice'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          代码实践
        </button>
        <button
          onClick={() => setActiveTab('exercise')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'exercise'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          例题练习
        </button>
      </div>

      {activeTab === 'theory' ? (
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">模型部署概述</h2>
            <p className="text-gray-700 mb-4">
              模型部署是将训练好的机器学习模型应用到生产环境的过程。这个过程需要考虑性能、可扩展性、可维护性等多个方面。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">部署方式</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>REST API服务</li>
                  <li>微服务架构</li>
                  <li>批处理系统</li>
                  <li>实时流处理</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">性能优化</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>模型压缩</li>
                  <li>量化技术</li>
                  <li>硬件加速</li>
                  <li>并行计算</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">监控与维护</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>性能监控</li>
                  <li>模型更新</li>
                  <li>版本控制</li>
                  <li>错误处理</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">部署流程</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full mt-1">
                  <FaCode className="text-blue-500 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold">1. 模型序列化</h3>
                  <p className="text-gray-700">将训练好的模型保存为可部署的格式</p>
                  <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                    <li>使用pickle或joblib保存模型</li>
                    <li>考虑模型版本控制</li>
                    <li>保存模型元数据</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-full mt-1">
                  <FaNetworkWired className="text-green-500 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold">2. API开发</h3>
                  <p className="text-gray-700">构建模型服务的API接口</p>
                  <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                    <li>使用Flask或FastAPI构建API</li>
                    <li>实现请求验证和错误处理</li>
                    <li>添加日志和监控</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-full mt-1">
                  <FaChartLine className="text-purple-500 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold">3. 性能优化</h3>
                  <p className="text-gray-700">优化模型和服务性能</p>
                  <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                    <li>模型量化和压缩</li>
                    <li>批处理请求</li>
                    <li>缓存机制</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-yellow-100 p-3 rounded-full mt-1">
                  <FaLightbulb className="text-yellow-500 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold">4. 部署与监控</h3>
                  <p className="text-gray-700">部署服务并建立监控系统</p>
                  <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                    <li>容器化部署</li>
                    <li>负载均衡</li>
                    <li>性能监控</li>
                    <li>自动扩缩容</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : null}

      {activeTab === 'practice' ? (
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">模型序列化</h2>
            <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm text-gray-800">
{`# 使用joblib保存模型
import joblib
from sklearn.ensemble import RandomForestClassifier

# 训练模型
model = RandomForestClassifier()
model.fit(X_train, y_train)

# 保存模型
joblib.dump(model, 'model.joblib')

# 保存模型元数据
model_metadata = {
    'version': '1.0.0',
    'features': feature_names,
    'training_date': datetime.now().isoformat(),
    'metrics': {
        'accuracy': accuracy_score(y_test, y_pred),
        'precision': precision_score(y_test, y_pred),
        'recall': recall_score(y_test, y_pred)
    }
}
with open('model_metadata.json', 'w') as f:
    json.dump(model_metadata, f)`}
              </pre>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">FastAPI服务开发</h2>
            <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm text-gray-800">
{`from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import numpy as np

app = FastAPI()

# 加载模型
model = joblib.load('model.joblib')

# 定义请求模型
class PredictionRequest(BaseModel):
    features: list[float]

# 定义响应模型
class PredictionResponse(BaseModel):
    prediction: int
    probability: float

@app.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    try:
        # 转换输入数据
        features = np.array(request.features).reshape(1, -1)
        
        # 进行预测
        prediction = model.predict(features)[0]
        probability = model.predict_proba(features).max()
        
        return PredictionResponse(
            prediction=int(prediction),
            probability=float(probability)
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 健康检查端点
@app.get("/health")
async def health_check():
    return {"status": "healthy"}`}
              </pre>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Docker部署</h2>
            <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm text-gray-800">
{`# Dockerfile
FROM python:3.9-slim

WORKDIR /app

# 安装依赖
COPY requirements.txt .
RUN pip install -r requirements.txt

# 复制应用代码和模型
COPY . .

# 暴露端口
EXPOSE 8000

# 启动应用
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

# requirements.txt
fastapi==0.68.0
uvicorn==0.15.0
scikit-learn==0.24.2
joblib==1.0.1
numpy==1.21.2
pydantic==1.8.2`}
              </pre>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">性能优化</h2>
            <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm text-gray-800">
{`# 模型量化
import onnx
from skl2onnx import convert_sklearn
from skl2onnx.common.data_types import FloatTensorType

# 转换为ONNX格式
initial_type = [('float_input', FloatTensorType([None, n_features]))]
onx = convert_sklearn(model, initial_types=initial_type)
onnx.save_model(onx, "model.onnx")

# 批处理预测
@app.post("/batch_predict")
async def batch_predict(requests: list[PredictionRequest]):
    try:
        # 收集所有特征
        features = np.array([req.features for req in requests])
        
        # 批量预测
        predictions = model.predict(features)
        probabilities = model.predict_proba(features).max(axis=1)
        
        return [
            PredictionResponse(
                prediction=int(pred),
                probability=float(prob)
            )
            for pred, prob in zip(predictions, probabilities)
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 使用Redis缓存
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from fastapi_cache.decorator import cache

@app.on_event("startup")
async def startup():
    redis = aioredis.from_url("redis://localhost")
    FastAPICache.init(RedisBackend(redis), prefix="fastapi-cache")

@app.post("/predict")
@cache(expire=3600)  # 缓存1小时
async def predict(request: PredictionRequest):
    # ... 预测逻辑 ...`}
              </pre>
            </div>
          </section>
        </div>
      ) : null}

      {activeTab === 'exercise' ? (
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">实践题目</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">题目一：模型部署</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">要求：</h4>
                  <p className="text-gray-700 mb-4">
                    将用户流失预测模型部署为REST API服务，要求：
                  </p>
                  <ul className="list-decimal list-inside text-gray-700 space-y-2">
                    <li>使用FastAPI构建API</li>
                    <li>实现模型加载和预测接口</li>
                    <li>添加请求验证和错误处理</li>
                    <li>添加健康检查接口</li>
                    <li>实现日志记录和监控</li>
                    <li>使用Docker容器化部署</li>
                  </ul>
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">参考答案：</h4>
                    <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-sm text-gray-800">
{`from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import numpy as np
import logging
from typing import List, Dict
import uvicorn
from prometheus_client import Counter, Histogram
import time

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# 定义请求模型
class PredictionRequest(BaseModel):
    features: List[float]
    
class PredictionResponse(BaseModel):
    prediction: float
    probability: float

# 创建FastAPI应用
app = FastAPI(title="用户流失预测API")

# 加载模型
try:
    model = joblib.load('churn_model.joblib')
    logger.info("模型加载成功")
except Exception as e:
    logger.error(f"模型加载失败: {str(e)}")
    raise

# 定义监控指标
PREDICTION_COUNT = Counter(
    'prediction_total',
    'Total number of predictions made'
)
PREDICTION_LATENCY = Histogram(
    'prediction_latency_seconds',
    'Time spent processing prediction request'
)

@app.get("/health")
async def health_check():
    """健康检查接口"""
    return {"status": "healthy"}

@app.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    """预测接口"""
    try:
        # 记录开始时间
        start_time = time.time()
        
        # 验证输入
        if len(request.features) != model.n_features_in_:
            raise HTTPException(
                status_code=400,
                detail=f"特征数量不匹配，期望{model.n_features_in_}个特征"
            )
            
        # 转换输入
        features = np.array(request.features).reshape(1, -1)
        
        # 预测
        prediction = model.predict(features)[0]
        probability = model.predict_proba(features)[0][1]
        
        # 记录预测结果
        logger.info(f"预测结果: {prediction}, 概率: {probability}")
        
        # 更新监控指标
        PREDICTION_COUNT.inc()
        PREDICTION_LATENCY.observe(time.time() - start_time)
        
        return PredictionResponse(
            prediction=float(prediction),
            probability=float(probability)
        )
        
    except Exception as e:
        logger.error(f"预测失败: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Dockerfile
"""
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
"""

# requirements.txt
"""
fastapi==0.68.1
uvicorn==0.15.0
joblib==1.0.1
numpy==1.21.2
pydantic==1.8.2
prometheus-client==0.11.0
"""

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">题目二：性能优化</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">要求：</h4>
                  <p className="text-gray-700 mb-4">
                    优化推荐系统API服务，要求：
                  </p>
                  <ul className="list-decimal list-inside text-gray-700 space-y-2">
                    <li>实现批量预测接口</li>
                    <li>添加Redis缓存层</li>
                    <li>优化模型推理性能</li>
                    <li>实现负载均衡</li>
                    <li>添加性能监控指标</li>
                    <li>实现自动扩缩容</li>
                  </ul>
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">参考答案：</h4>
                    <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-sm text-gray-800">
{`from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import numpy as np
import torch
import redis
import json
from typing import List, Dict
import logging
from prometheus_client import Counter, Histogram, Gauge
import time
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

# 配置日志
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# 定义请求和响应模型
class BatchPredictionRequest(BaseModel):
    user_ids: List[int]
    item_ids: List[int]

class BatchPredictionResponse(BaseModel):
    predictions: List[float]
    metadata: Dict

# 创建FastAPI应用
app = FastAPI(title="推荐系统API")

# 配置CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 初始化Redis连接
redis_client = redis.Redis(
    host='localhost',
    port=6379,
    db=0,
    decode_responses=True
)

# 加载模型
model = torch.load('recommendation_model.pt')
model.eval()

# 定义监控指标
BATCH_PREDICTION_COUNT = Counter(
    'batch_prediction_total',
    'Total number of batch predictions made'
)
PREDICTION_LATENCY = Histogram(
    'prediction_latency_seconds',
    'Time spent processing prediction request'
)
CACHE_HIT_RATIO = Gauge(
    'cache_hit_ratio',
    'Ratio of cache hits to total requests'
)

@app.post("/batch_predict", response_model=BatchPredictionResponse)
async def batch_predict(request: BatchPredictionRequest):
    """批量预测接口"""
    try:
        start_time = time.time()
        
        # 检查缓存
        cache_key = f"pred:{request.user_ids[0]}:{request.item_ids[0]}"
        cached_result = redis_client.get(cache_key)
        
        if cached_result:
            CACHE_HIT_RATIO.inc()
            return json.loads(cached_result)
            
        # 准备输入数据
        user_tensor = torch.tensor(request.user_ids, dtype=torch.long)
        item_tensor = torch.tensor(request.item_ids, dtype=torch.long)
        
        # 批量预测
        with torch.no_grad():
            predictions = model(user_tensor, item_tensor)
            predictions = predictions.numpy().tolist()
            
        # 缓存结果
        response = BatchPredictionResponse(
            predictions=predictions,
            metadata={
                "batch_size": len(request.user_ids),
                "timestamp": time.time()
            }
        )
        redis_client.setex(
            cache_key,
            3600,  # 1小时过期
            json.dumps(response.dict())
        )
        
        # 更新监控指标
        BATCH_PREDICTION_COUNT.inc()
        PREDICTION_LATENCY.observe(time.time() - start_time)
        
        return response
        
    except Exception as e:
        logger.error(f"批量预测失败: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Kubernetes部署配置
"""
apiVersion: apps/v1
kind: Deployment
metadata:
  name: recommendation-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: recommendation-api
  template:
    metadata:
      labels:
        app: recommendation-api
    spec:
      containers:
      - name: api
        image: recommendation-api:latest
        ports:
        - containerPort: 8000
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1Gi"
            cpu: "1000m"
        readinessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 5
          periodSeconds: 10
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: recommendation-api-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: recommendation-api
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
"""

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">评分标准</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">功能完整性（40分）</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>API接口实现（15分）</li>
                  <li>错误处理机制（10分）</li>
                  <li>监控和日志（10分）</li>
                  <li>部署配置（5分）</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">性能优化（40分）</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>响应时间（15分）</li>
                  <li>并发处理能力（15分）</li>
                  <li>资源利用率（10分）</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">代码质量（20分）</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>代码结构（5分）</li>
                  <li>注释和文档（5分）</li>
                  <li>测试覆盖率（5分）</li>
                  <li>最佳实践（5分）</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      ) : null}

      {/* 导航链接 */}
      <div className="flex justify-between mt-8">
        <Link 
          href="/study/ai/ml/cases"
          className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 flex items-center"
        >
          <FaArrowLeft className="mr-2" />
          上一课：机器学习实战案例
        </Link>
        <Link 
          href="/study/ai/ml/interview"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center"
        >
          下一课：机器学习面试题
          <FaArrowRight className="ml-2" />
        </Link>
      </div>
    </div>
  );
} 
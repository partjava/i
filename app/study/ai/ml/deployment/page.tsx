'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList, TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '机器学习', chapterTitle: '模型部署与优化', chapterNumber: 9, totalChapters: 11,
  subjectHref: '/study/ai/ml',
  prevChapter: { label: '实战案例', href: '/study/ai/ml/cases' },
  nextChapter: { label: '机器学习面试题', href: '/study/ai/ml/interview' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '理论知识',
    left: (<div className="space-y-4"><PageTitle>模型部署概述</PageTitle><BookParagraph>模型部署是将训练好的机器学习模型应用到生产环境的过程。这个过程需要考虑性能、可扩展性、可维护性等多个方面。</BookParagraph><div className="grid grid-cols-3 gap-3 my-4"><div className="bg-paper-200/40 rounded-md p-3 border border-paper-300/60"><h4 className="text-xs font-semibold text-ink mb-2">部署方式</h4><ul className="text-xs text-ink-light space-y-1 list-disc list-inside"><li>REST API服务</li><li>微服务架构</li><li>批处理系统</li><li>实时流处理</li></ul></div><div className="bg-paper-200/40 rounded-md p-3 border border-paper-300/60"><h4 className="text-xs font-semibold text-ink mb-2">性能优化</h4><ul className="text-xs text-ink-light space-y-1 list-disc list-inside"><li>模型压缩</li><li>量化技术</li><li>硬件加速</li><li>并行计算</li></ul></div><div className="bg-paper-200/40 rounded-md p-3 border border-paper-300/60"><h4 className="text-xs font-semibold text-ink mb-2">监控与维护</h4><ul className="text-xs text-ink-light space-y-1 list-disc list-inside"><li>性能监控</li><li>模型更新</li><li>版本控制</li><li>错误处理</li></ul></div></div></div>),
    right: (<div className="space-y-4"><SectionTitle>部署流程</SectionTitle><div className="space-y-5 my-2"><div className="flex gap-3"><div className="flex-shrink-0 w-7 h-7 rounded-full bg-amber/10 border border-amber/30 text-amber text-xs font-semibold flex items-center justify-center mt-0.5">1</div><div><h4 className="text-sm font-medium text-ink">模型序列化</h4><p className="text-xs text-ink-light mt-1">将训练好的模型保存为可部署的格式</p><ul className="text-xs text-ink-light mt-1 space-y-0.5 list-disc list-inside"><li>使用pickle或joblib保存模型</li><li>考虑模型版本控制</li><li>保存模型元数据</li></ul></div></div><div className="flex gap-3"><div className="flex-shrink-0 w-7 h-7 rounded-full bg-amber/10 border border-amber/30 text-amber text-xs font-semibold flex items-center justify-center mt-0.5">2</div><div><h4 className="text-sm font-medium text-ink">API开发</h4><p className="text-xs text-ink-light mt-1">构建模型服务的API接口</p><ul className="text-xs text-ink-light mt-1 space-y-0.5 list-disc list-inside"><li>使用Flask或FastAPI构建API</li><li>实现请求验证和错误处理</li><li>添加日志和监控</li></ul></div></div><div className="flex gap-3"><div className="flex-shrink-0 w-7 h-7 rounded-full bg-amber/10 border border-amber/30 text-amber text-xs font-semibold flex items-center justify-center mt-0.5">3</div><div><h4 className="text-sm font-medium text-ink">性能优化</h4><p className="text-xs text-ink-light mt-1">优化模型和服务性能</p><ul className="text-xs text-ink-light mt-1 space-y-0.5 list-disc list-inside"><li>模型量化和压缩</li><li>批处理请求</li><li>缓存机制</li></ul></div></div><div className="flex gap-3"><div className="flex-shrink-0 w-7 h-7 rounded-full bg-amber/10 border border-amber/30 text-amber text-xs font-semibold flex items-center justify-center mt-0.5">4</div><div><h4 className="text-sm font-medium text-ink">部署与监控</h4><p className="text-xs text-ink-light mt-1">部署服务并建立监控系统</p><ul className="text-xs text-ink-light mt-1 space-y-0.5 list-disc list-inside"><li>容器化部署</li><li>负载均衡</li><li>性能监控</li><li>自动扩缩容</li></ul></div></div></div><TagGrid items={['FastAPI', 'Docker', 'ONNX', 'Prometheus', 'MLOps']} /></div>),
  },
  {
    label: '代码实践',
    left: (<div className="space-y-4"><PageTitle>模型序列化</PageTitle><BookCode language="python" code={`# 使用joblib保存模型
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
    json.dump(model_metadata, f)`} /><SectionTitle>FastAPI服务开发</SectionTitle><BookCode language="python" code={`from fastapi import FastAPI, HTTPException
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
    return {"status": "healthy"}`} /></div>),
    right: (<div className="space-y-4"><SectionTitle>Docker部署</SectionTitle><BookCode language="dockerfile" code={`FROM python:3.9-slim

WORKDIR /app

# 安装依赖
COPY requirements.txt .
RUN pip install -r requirements.txt

# 复制应用代码和模型
COPY . .

# 暴露端口
EXPOSE 8000

# 启动应用
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]`} /><BookCode language="text" code={`# requirements.txt
fastapi==0.68.0
uvicorn==0.15.0
scikit-learn==0.24.2
joblib==1.0.1
numpy==1.21.2
pydantic==1.8.2`} /><SectionTitle>性能优化</SectionTitle><BookCode language="python" code={`# 模型量化
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
    # ... 预测逻辑 ...`} /><TagGrid items={['FastAPI', 'Docker', '序列化', 'API', '部署']} /></div>),
  },
  {
    label: '例题练习',
    left: (<div className="space-y-4"><PageTitle>题目一：模型部署</PageTitle><BookParagraph><b>要求：</b>将用户流失预测模型部署为REST API服务，要求：</BookParagraph><BookList items={['使用FastAPI构建API', '实现模型加载和预测接口', '添加请求验证和错误处理', '添加健康检查接口', '实现日志记录和监控', '使用Docker容器化部署']} /><BookCode language="python" code={`from fastapi import FastAPI, HTTPException
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
    uvicorn.run(app, host="0.0.0.0", port=8000)`} /></div>),
    right: (<div className="space-y-4"><PageTitle>题目二：性能优化</PageTitle><BookParagraph><b>要求：</b>优化推荐系统API服务，要求：</BookParagraph><BookList items={['实现批量预测接口', '添加Redis缓存层', '优化模型推理性能', '实现负载均衡', '添加性能监控指标', '实现自动扩缩容']} /><BookCode language="python" code={`from fastapi import FastAPI, HTTPException
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
    uvicorn.run(app, host="0.0.0.0", port=8000)`} /><SectionTitle>评分标准</SectionTitle><div className="grid grid-cols-3 gap-3 my-2"><div className="bg-paper-200/40 rounded-md p-3 border border-paper-300/60"><h4 className="text-xs font-semibold text-ink mb-2">功能完整性（40分）</h4><ul className="text-xs text-ink-light space-y-1 list-disc list-inside"><li>API接口实现（15分）</li><li>错误处理机制（10分）</li><li>监控和日志（10分）</li><li>部署配置（5分）</li></ul></div><div className="bg-paper-200/40 rounded-md p-3 border border-paper-300/60"><h4 className="text-xs font-semibold text-ink mb-2">性能优化（40分）</h4><ul className="text-xs text-ink-light space-y-1 list-disc list-inside"><li>响应时间（15分）</li><li>并发处理能力（15分）</li><li>资源利用率（10分）</li></ul></div><div className="bg-paper-200/40 rounded-md p-3 border border-paper-300/60"><h4 className="text-xs font-semibold text-ink mb-2">代码质量（20分）</h4><ul className="text-xs text-ink-light space-y-1 list-disc list-inside"><li>代码结构（5分）</li><li>注释和文档（5分）</li><li>测试覆盖率（5分）</li><li>最佳实践（5分）</li></ul></div></div><TagGrid items={['模型部署', '性能优化', 'FastAPI', 'Docker', 'Kubernetes']} /></div>),
  },
]

export default function MlDeploymentPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }

'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DataMiningBasicPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'overview', label: '数据挖掘概述' },
    { id: 'concepts', label: '基本概念' },
    { id: 'applications', label: '应用场景' },
    { id: 'tools', label: '工具介绍' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">数据挖掘基础</h1>
      
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
              <h3 className="text-xl font-semibold mb-3">数据挖掘概述</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 什么是数据挖掘</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      数据挖掘是从大量数据中提取出隐含的、先前未知的、潜在有用的信息和知识的过程。它是数据库、统计学、机器学习、模式识别等多个领域的交叉学科。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 数据挖掘的基本定义
数据挖掘 = 数据 + 挖掘
- 数据：结构化、半结构化、非结构化数据
- 挖掘：发现模式、关联、趋势、异常等

# 数据挖掘的特点
1. 自动性：自动发现模式
2. 有效性：发现的知识必须是有用的
3. 新颖性：发现的知识必须是新的
4. 可理解性：发现的知识必须是可以理解的
5. 可操作性：发现的知识必须是可以应用的`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 数据挖掘的发展历史</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      数据挖掘的发展历程。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 数据挖掘发展历程
1. 早期阶段（1960-1980）
   - 统计分析方法
   - 机器学习算法
   - 专家系统

2. 发展阶段（1980-2000）
   - 数据库技术发展
   - 数据仓库出现
   - 商业智能兴起

3. 成熟阶段（2000-至今）
   - 大数据时代
   - 深度学习应用
   - 云计算支持
   - 实时分析需求`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 数据挖掘的基本流程</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      数据挖掘的标准流程。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# CRISP-DM流程
1. 业务理解
   - 确定业务目标
   - 评估现状
   - 确定数据挖掘目标
   - 制定项目计划

2. 数据理解
   - 收集初始数据
   - 描述数据
   - 探索数据
   - 验证数据质量

3. 数据准备
   - 选择数据
   - 清洗数据
   - 构建数据
   - 整合数据
   - 格式化数据

4. 建模
   - 选择建模技术
   - 设计测试方案
   - 构建模型
   - 评估模型

5. 评估
   - 评估结果
   - 回顾过程
   - 确定下一步

6. 部署
   - 计划部署
   - 计划监控和维护
   - 生成最终报告
   - 项目回顾`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'concepts' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">基本概念</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 数据类型</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      数据挖掘中常见的数据类型。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 数据类型
1. 结构化数据
   - 关系型数据库
   - 表格数据
   - 时间序列数据

2. 半结构化数据
   - XML文件
   - JSON数据
   - HTML网页

3. 非结构化数据
   - 文本数据
   - 图像数据
   - 音频数据
   - 视频数据

# 数据特征
1. 数值型特征
   - 连续型：身高、体重、温度
   - 离散型：年龄、数量、次数

2. 类别型特征
   - 有序类别：等级、评分
   - 无序类别：性别、颜色

3. 时间型特征
   - 时间戳
   - 日期
   - 时间段`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 数据质量</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      数据质量问题和处理方法。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 数据质量问题
1. 缺失值
   - 完全随机缺失
   - 随机缺失
   - 非随机缺失

2. 异常值
   - 统计异常
   - 业务异常
   - 技术异常

3. 噪声数据
   - 测量误差
   - 录入错误
   - 系统误差

# 处理方法
1. 缺失值处理
   - 删除法
   - 均值/中位数填充
   - 模型预测填充
   - 多重插补

2. 异常值处理
   - 统计方法
   - 聚类方法
   - 基于距离的方法
   - 基于密度的方法

3. 噪声处理
   - 平滑处理
   - 滤波
   - 小波变换
   - 主成分分析`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 数据预处理</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      数据预处理的基本步骤。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 数据预处理步骤
1. 数据清洗
   - 处理缺失值
   - 处理异常值
   - 处理重复值
   - 处理噪声

2. 数据转换
   - 标准化
   - 归一化
   - 离散化
   - 编码转换

3. 特征选择
   - 过滤法
   - 包装法
   - 嵌入法
   - 降维方法

# 代码示例
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler

# 1. 数据加载
df = pd.read_csv('data.csv')

# 2. 处理缺失值
df = df.fillna(df.mean())

# 3. 处理异常值
Q1 = df['value'].quantile(0.25)
Q3 = df['value'].quantile(0.75)
IQR = Q3 - Q1
df = df[df['value'].between(Q1 - 1.5*IQR, Q3 + 1.5*IQR)]

# 4. 标准化
scaler = StandardScaler()
df['value_scaled'] = scaler.fit_transform(df[['value']])

# 5. 特征选择
from sklearn.feature_selection import SelectKBest, f_classif
selector = SelectKBest(f_classif, k=5)
X_selected = selector.fit_transform(X, y)`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">应用场景</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 商业智能</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      商业智能领域的应用。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 商业智能应用
1. 客户分析
   - 客户细分
   - 客户价值分析
   - 客户流失预测
   - 客户生命周期管理

2. 市场分析
   - 市场趋势分析
   - 竞争对手分析
   - 产品定位分析
   - 价格策略分析

3. 销售分析
   - 销售预测
   - 交叉销售
   - 向上销售
   - 销售渠道优化

# 代码示例
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

# 客户细分
def customer_segmentation(data):
    # 数据预处理
    scaler = StandardScaler()
    data_scaled = scaler.fit_transform(data)
    
    # 聚类分析
    kmeans = KMeans(n_clusters=4, random_state=42)
    clusters = kmeans.fit_predict(data_scaled)
    
    # 分析结果
    data['cluster'] = clusters
    cluster_analysis = data.groupby('cluster').mean()
    
    return cluster_analysis`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 金融领域</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      金融领域的应用。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 金融领域应用
1. 风险管理
   - 信用风险评估
   - 欺诈检测
   - 市场风险分析
   - 操作风险分析

2. 投资分析
   - 股票预测
   - 投资组合优化
   - 市场趋势分析
   - 风险评估

3. 智能投顾
   - 个性化投资建议
   - 资产配置优化
   - 风险偏好分析
   - 投资组合管理

# 代码示例
import numpy as np
from sklearn.ensemble import RandomForestClassifier

# 信用风险评估
def credit_risk_assessment(data):
    # 特征工程
    X = data.drop('default', axis=1)
    y = data['default']
    
    # 模型训练
    model = RandomForestClassifier(n_estimators=100)
    model.fit(X, y)
    
    # 特征重要性分析
    feature_importance = pd.DataFrame({
        'feature': X.columns,
        'importance': model.feature_importances_
    })
    
    return model, feature_importance`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 医疗健康</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      医疗健康领域的应用。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 医疗健康应用
1. 疾病诊断
   - 影像诊断
   - 病理分析
   - 基因诊断
   - 症状分析

2. 药物研发
   - 药物筛选
   - 副作用预测
   - 临床试验分析
   - 药物相互作用

3. 健康管理
   - 健康风险评估
   - 个性化医疗方案
   - 远程医疗
   - 健康监测

# 代码示例
import tensorflow as tf
from tensorflow.keras import layers

# 医学影像分析
def medical_image_analysis():
    model = tf.keras.Sequential([
        layers.Conv2D(32, 3, activation='relu', input_shape=(224, 224, 3)),
        layers.MaxPooling2D(),
        layers.Conv2D(64, 3, activation='relu'),
        layers.MaxPooling2D(),
        layers.Conv2D(64, 3, activation='relu'),
        layers.Flatten(),
        layers.Dense(64, activation='relu'),
        layers.Dense(1, activation='sigmoid')
    ])
    
    model.compile(
        optimizer='adam',
        loss='binary_crossentropy',
        metrics=['accuracy']
    )
    
    return model`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tools' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">工具介绍</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. Python工具包</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      常用的Python数据挖掘工具包。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 常用Python工具包
1. 数据处理
   - NumPy：数值计算
   - Pandas：数据分析
   - SciPy：科学计算

2. 机器学习
   - Scikit-learn：机器学习算法
   - TensorFlow：深度学习
   - PyTorch：深度学习

3. 数据可视化
   - Matplotlib：基础绘图
   - Seaborn：统计可视化
   - Plotly：交互式可视化

# 环境配置
# requirements.txt
numpy==1.21.0
pandas==1.3.0
scikit-learn==0.24.2
tensorflow==2.6.0
torch==1.9.0
matplotlib==3.4.2
seaborn==0.11.1
plotly==5.1.0

# 安装命令
pip install -r requirements.txt`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 开发环境</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      数据挖掘开发环境配置。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 开发环境配置
1. IDE选择
   - PyCharm：专业Python IDE
   - VS Code：轻量级编辑器
   - Jupyter Notebook：交互式开发

2. 环境管理
   - Anaconda：科学计算环境
   - Virtualenv：虚拟环境
   - Docker：容器化环境

3. 版本控制
   - Git：代码版本控制
   - GitHub：代码托管
   - GitLab：代码管理

# 环境配置示例
# 1. 创建虚拟环境
python -m venv datamining_env
source datamining_env/bin/activate  # Linux/Mac
datamining_env\\Scripts\\activate  # Windows

# 2. 安装依赖
pip install -r requirements.txt

# 3. 配置Jupyter
jupyter notebook --generate-config
jupyter notebook password`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 开发流程</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      数据挖掘项目开发流程。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 项目结构
project/
├── data/
│   ├── raw/
│   └── processed/
├── notebooks/
│   └── analysis.ipynb
├── src/
│   ├── data/
│   ├── features/
│   ├── models/
│   └── visualization/
├── tests/
├── requirements.txt
└── README.md

# 开发流程
1. 数据获取
   - 数据源选择
   - 数据下载
   - 数据存储

2. 数据预处理
   - 数据清洗
   - 特征工程
   - 数据转换

3. 模型开发
   - 模型选择
   - 参数调优
   - 模型评估

4. 结果分析
   - 结果可视化
   - 结果解释
   - 报告生成`}
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
          href="/study/ai/datamining"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回数据挖掘目录
        </Link>
        <Link 
          href="/study/ai/datamining/preprocessing"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          数据预处理 →
        </Link>
      </div>
    </div>
  );
} 
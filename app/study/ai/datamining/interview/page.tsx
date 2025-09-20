'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function DataMiningInterviewPage() {
  const [activeTab, setActiveTab] = useState('interview');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">面试题与前沿</h1>

      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        <button
          onClick={() => setActiveTab('interview')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'interview'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          面试题
        </button>
        <button
          onClick={() => setActiveTab('frontier')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'frontier'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          前沿技术
        </button>
      </div>

      {/* 内容区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === 'interview' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">常见面试题</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 数据预处理</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      数据预处理是数据挖掘的重要环节，面试中经常涉及相关问题。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 常见问题

1. 如何处理缺失值？
   - 删除法：直接删除包含缺失值的样本
   - 均值/中位数填充：用统计量填充缺失值
   - 模型预测填充：使用机器学习模型预测缺失值
   - 多重插补：生成多个可能的填充值

2. 如何处理异常值？
   - 统计方法：Z-score、IQR法
   - 基于距离的方法：K近邻、马氏距离
   - 基于密度的方法：LOF、DBSCAN
   - 基于聚类的方法：K-means、层次聚类

3. 如何进行特征选择？
   - 过滤法：方差分析、相关性分析
   - 包装法：递归特征消除、前向选择
   - 嵌入法：Lasso正则化、决策树特征重要性

4. 如何处理类别特征？
   - 标签编码：将类别转换为整数
   - 独热编码：将类别转换为二进制向量
   - 目标编码：基于目标变量的统计量
   - 哈希编码：将类别映射到固定维度的向量

# 代码示例
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.feature_selection import SelectKBest, f_classif

# 1. 处理缺失值
def handle_missing_values(df, method='mean'):
    if method == 'mean':
        imputer = SimpleImputer(strategy='mean')
    elif method == 'median':
        imputer = SimpleImputer(strategy='median')
    elif method == 'most_frequent':
        imputer = SimpleImputer(strategy='most_frequent')
    else:
        raise ValueError("Invalid imputation method")
    
    return pd.DataFrame(
        imputer.fit_transform(df),
        columns=df.columns
    )

# 2. 处理异常值
def handle_outliers(df, column, method='zscore'):
    if method == 'zscore':
        mean = df[column].mean()
        std = df[column].std()
        df[column] = df[column].clip(
            lower=mean-3*std,
            upper=mean+3*std
        )
    elif method == 'iqr':
        Q1 = df[column].quantile(0.25)
        Q3 = df[column].quantile(0.75)
        IQR = Q3 - Q1
        df[column] = df[column].clip(
            lower=Q1-1.5*IQR,
            upper=Q3+1.5*IQR
        )
    else:
        raise ValueError("Invalid outlier handling method")
    
    return df

# 3. 特征选择
def select_features(X, y, k=10):
    selector = SelectKBest(f_classif, k=k)
    X_selected = selector.fit_transform(X, y)
    return X_selected, selector.get_support()

# 4. 类别特征编码
def encode_categorical_features(df, columns, method='onehot'):
    if method == 'onehot':
        return pd.get_dummies(df, columns=columns)
    elif method == 'label':
        from sklearn.preprocessing import LabelEncoder
        df_encoded = df.copy()
        for col in columns:
            le = LabelEncoder()
            df_encoded[col] = le.fit_transform(df[col])
        return df_encoded
    else:
        raise ValueError("Invalid encoding method")`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 机器学习算法</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      机器学习算法是数据挖掘的核心，面试中经常考察算法原理和实现。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 常见问题

1. 决策树算法原理？
   - 信息增益：选择信息增益最大的特征作为分裂点
   - 基尼指数：选择基尼指数最小的特征作为分裂点
   - 剪枝：预剪枝和后剪枝防止过拟合
   - 优点：可解释性强、处理非线性关系
   - 缺点：容易过拟合、对噪声敏感

2. 随机森林算法原理？
   - 集成学习：多个决策树的组合
   - 随机性：随机选择特征和样本
   - 投票机制：多数投票决定最终结果
   - 优点：抗过拟合、处理高维数据
   - 缺点：计算复杂度高、模型解释性差

3. SVM算法原理？
   - 最大间隔：寻找最优分类超平面
   - 核技巧：处理非线性分类问题
   - 软间隔：处理噪声和异常值
   - 优点：泛化能力强、处理高维数据
   - 缺点：计算复杂度高、对大规模数据不友好

4. 聚类算法原理？
   - K-means：基于距离的聚类
   - 层次聚类：自底向上或自顶向下
   - DBSCAN：基于密度的聚类
   - 优点：无监督学习、发现数据模式
   - 缺点：需要确定参数、对噪声敏感

# 代码示例
import numpy as np
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.cluster import KMeans

# 1. 决策树
def decision_tree_example(X, y):
    model = DecisionTreeClassifier(
        max_depth=5,
        min_samples_split=10,
        random_state=42
    )
    model.fit(X, y)
    return model

# 2. 随机森林
def random_forest_example(X, y):
    model = RandomForestClassifier(
        n_estimators=100,
        max_depth=5,
        random_state=42
    )
    model.fit(X, y)
    return model

# 3. SVM
def svm_example(X, y):
    model = SVC(
        kernel='rbf',
        C=1.0,
        random_state=42
    )
    model.fit(X, y)
    return model

# 4. K-means
def kmeans_example(X, n_clusters=3):
    model = KMeans(
        n_clusters=n_clusters,
        random_state=42
    )
    model.fit(X)
    return model`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 模型评估</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      模型评估是机器学习项目的重要环节，面试中经常考察评估指标和方法。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 常见问题

1. 分类模型评估指标？
   - 准确率：正确预测的样本比例
   - 精确率：预测为正的样本中实际为正的比例
   - 召回率：实际为正的样本中预测为正的比例
   - F1分数：精确率和召回率的调和平均
   - ROC曲线：不同阈值下的TPR和FPR
   - AUC：ROC曲线下的面积

2. 回归模型评估指标？
   - MSE：均方误差
   - RMSE：均方根误差
   - MAE：平均绝对误差
   - R2：决定系数
   - 调整R2：考虑特征数量的R2

3. 交叉验证方法？
   - K折交叉验证：将数据分为K份
   - 留一法：每次留一个样本作为测试集
   - 分层交叉验证：保持类别比例
   - 时间序列交叉验证：考虑时间顺序

4. 过拟合和欠拟合？
   - 过拟合：模型在训练集表现好，测试集表现差
   - 欠拟合：模型在训练集和测试集表现都差
   - 解决方法：正则化、早停、数据增强

# 代码示例
import numpy as np
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score,
    f1_score, roc_auc_score, mean_squared_error,
    r2_score
)
from sklearn.model_selection import cross_val_score

# 1. 分类模型评估
def evaluate_classification(y_true, y_pred, y_pred_proba=None):
    metrics = {
        'accuracy': accuracy_score(y_true, y_pred),
        'precision': precision_score(y_true, y_pred),
        'recall': recall_score(y_true, y_pred),
        'f1': f1_score(y_true, y_pred)
    }
    
    if y_pred_proba is not None:
        metrics['auc'] = roc_auc_score(y_true, y_pred_proba)
    
    return metrics

# 2. 回归模型评估
def evaluate_regression(y_true, y_pred):
    metrics = {
        'mse': mean_squared_error(y_true, y_pred),
        'rmse': np.sqrt(mean_squared_error(y_true, y_pred)),
        'r2': r2_score(y_true, y_pred)
    }
    return metrics

# 3. 交叉验证
def cross_validate_model(model, X, y, cv=5):
    scores = cross_val_score(
        model, X, y,
        cv=cv,
        scoring='accuracy'
    )
    return scores.mean(), scores.std()

# 4. 学习曲线
def plot_learning_curve(model, X, y):
    from sklearn.model_selection import learning_curve
    import matplotlib.pyplot as plt
    
    train_sizes, train_scores, test_scores = learning_curve(
        model, X, y,
        cv=5,
        n_jobs=-1,
        train_sizes=np.linspace(0.1, 1.0, 10)
    )
    
    train_mean = np.mean(train_scores, axis=1)
    train_std = np.std(train_scores, axis=1)
    test_mean = np.mean(test_scores, axis=1)
    test_std = np.std(test_scores, axis=1)
    
    plt.figure(figsize=(10, 6))
    plt.plot(train_sizes, train_mean, label='训练集得分')
    plt.plot(train_sizes, test_mean, label='测试集得分')
    plt.fill_between(train_sizes,
                     train_mean - train_std,
                     train_mean + train_std,
                     alpha=0.1)
    plt.fill_between(train_sizes,
                     test_mean - test_std,
                     test_mean + test_std,
                     alpha=0.1)
    plt.xlabel('训练样本数')
    plt.ylabel('得分')
    plt.title('学习曲线')
    plt.legend()
    plt.show()`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'frontier' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">前沿技术</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 深度学习</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      深度学习在数据挖掘中的应用。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 深度学习应用

1. 自动特征工程
   - 自动编码器：学习数据表示
   - 变分自编码器：生成新样本
   - 深度特征选择：自动选择重要特征

2. 序列数据挖掘
   - LSTM：处理时间序列数据
   - GRU：简化版LSTM
   - Transformer：处理长序列数据

3. 图数据挖掘
   - GCN：图卷积网络
   - GAT：图注意力网络
   - GraphSAGE：大规模图学习

4. 异常检测
   - 自编码器：重构误差检测
   - GAN：生成对抗网络
   - 深度置信网络：概率模型

# 代码示例
import torch
import torch.nn as nn
import torch.optim as optim

# 1. 自动编码器
class AutoEncoder(nn.Module):
    def __init__(self, input_dim, hidden_dim):
        super(AutoEncoder, self).__init__()
        self.encoder = nn.Sequential(
            nn.Linear(input_dim, hidden_dim),
            nn.ReLU()
        )
        self.decoder = nn.Sequential(
            nn.Linear(hidden_dim, input_dim),
            nn.Sigmoid()
        )
    
    def forward(self, x):
        x = self.encoder(x)
        x = self.decoder(x)
        return x

# 2. LSTM
class LSTMModel(nn.Module):
    def __init__(self, input_dim, hidden_dim, output_dim):
        super(LSTMModel, self).__init__()
        self.lstm = nn.LSTM(
            input_dim,
            hidden_dim,
            batch_first=True
        )
        self.fc = nn.Linear(hidden_dim, output_dim)
    
    def forward(self, x):
        lstm_out, _ = self.lstm(x)
        output = self.fc(lstm_out[:, -1, :])
        return output

# 3. 图卷积网络
class GCN(nn.Module):
    def __init__(self, input_dim, hidden_dim, output_dim):
        super(GCN, self).__init__()
        self.conv1 = nn.Linear(input_dim, hidden_dim)
        self.conv2 = nn.Linear(hidden_dim, output_dim)
    
    def forward(self, x, adj):
        x = torch.relu(self.conv1(torch.matmul(adj, x)))
        x = self.conv2(torch.matmul(adj, x))
        return x

# 4. 异常检测
class AnomalyDetector(nn.Module):
    def __init__(self, input_dim, hidden_dim):
        super(AnomalyDetector, self).__init__()
        self.encoder = nn.Sequential(
            nn.Linear(input_dim, hidden_dim),
            nn.ReLU(),
            nn.Linear(hidden_dim, hidden_dim//2),
            nn.ReLU()
        )
        self.decoder = nn.Sequential(
            nn.Linear(hidden_dim//2, hidden_dim),
            nn.ReLU(),
            nn.Linear(hidden_dim, input_dim),
            nn.Sigmoid()
        )
    
    def forward(self, x):
        x = self.encoder(x)
        x = self.decoder(x)
        return x
    
    def detect_anomaly(self, x, threshold=0.1):
        x_recon = self.forward(x)
        error = torch.mean((x - x_recon)**2, dim=1)
        return error > threshold`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 联邦学习</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      联邦学习在数据隐私保护中的应用。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 联邦学习应用

1. 基本概念
   - 分布式学习：多个参与方共同训练模型
   - 数据隐私：原始数据不离开本地
   - 模型聚合：中心服务器聚合模型参数
   - 安全通信：加密传输模型参数

2. 算法类型
   - FedAvg：联邦平均算法
   - FedProx：近端项优化
   - FedSGD：随机梯度下降
   - FedOpt：优化器选择

3. 应用场景
   - 医疗数据：保护患者隐私
   - 金融数据：保护交易信息
   - 物联网：边缘设备协同学习
   - 移动设备：用户行为分析

4. 挑战与解决方案
   - 通信效率：模型压缩、稀疏化
   - 数据异构：个性化联邦学习
   - 安全性：差分隐私、安全聚合
   - 激励机制：贡献度评估

# 代码示例
import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np

# 1. 联邦平均算法
class FedAvg:
    def __init__(self, model, clients):
        self.model = model
        self.clients = clients
    
    def train_round(self):
        # 客户端本地训练
        client_models = []
        for client in self.clients:
            model = client.train()
            client_models.append(model)
        
        # 模型聚合
        self.aggregate_models(client_models)
    
    def aggregate_models(self, client_models):
        # 计算平均参数
        with torch.no_grad():
            for param in self.model.parameters():
                param.data = torch.mean(
                    torch.stack([model.state_dict()[param.name]
                               for model in client_models]),
                    dim=0
                )

# 2. 客户端类
class Client:
    def __init__(self, model, data, optimizer):
        self.model = model
        self.data = data
        self.optimizer = optimizer
    
    def train(self, epochs=5):
        for epoch in range(epochs):
            for batch in self.data:
                self.optimizer.zero_grad()
                loss = self.compute_loss(batch)
                loss.backward()
                self.optimizer.step()
        return self.model

# 3. 安全聚合
class SecureAggregation:
    def __init__(self, n_clients):
        self.n_clients = n_clients
    
    def generate_keys(self):
        # 生成密钥对
        keys = []
        for _ in range(self.n_clients):
            key = np.random.randn(100)
            keys.append(key)
        return keys
    
    def encrypt_gradients(self, gradients, keys):
        # 加密梯度
        encrypted = []
        for grad, key in zip(gradients, keys):
            encrypted.append(grad + key)
        return encrypted
    
    def decrypt_gradients(self, encrypted, keys):
        # 解密梯度
        decrypted = []
        for enc, key in zip(encrypted, keys):
            decrypted.append(enc - key)
        return decrypted

# 4. 差分隐私
class DifferentialPrivacy:
    def __init__(self, epsilon=1.0):
        self.epsilon = epsilon
    
    def add_noise(self, gradients):
        # 添加拉普拉斯噪声
        noise = np.random.laplace(
            scale=1.0/self.epsilon,
            size=gradients.shape
        )
        return gradients + noise
    
    def clip_gradients(self, gradients, max_norm=1.0):
        # 梯度裁剪
        norm = np.linalg.norm(gradients)
        if norm > max_norm:
            gradients = gradients * max_norm / norm
        return gradients`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 可解释性</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      机器学习模型的可解释性研究。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 可解释性方法

1. 特征重要性
   - SHAP值：基于博弈论的特征贡献
   - LIME：局部线性近似
   - 特征排列重要性：随机打乱特征
   - 部分依赖图：特征与预测关系

2. 决策路径
   - 决策树可视化：树结构展示
   - 规则提取：从黑盒模型提取规则
   - 反事实解释：最小改变预测
   - 锚点解释：局部决策边界

3. 模型透明度
   - 线性模型：系数解释
   - 决策树：路径解释
   - 规则集：if-then规则
   - 贝叶斯网络：概率关系

4. 可视化方法
   - 特征重要性图：条形图
   - 决策边界图：散点图
   - 部分依赖图：曲线图
   - 热力图：特征交互

# 代码示例
import numpy as np
import shap
import lime
import matplotlib.pyplot as plt

# 1. SHAP值
def compute_shap_values(model, X):
    explainer = shap.TreeExplainer(model)
    shap_values = explainer.shap_values(X)
    
    # 绘制摘要图
    shap.summary_plot(shap_values, X)
    
    return shap_values

# 2. LIME解释
def explain_prediction(model, X, instance):
    explainer = lime.lime_tabular.LimeTabularExplainer(
        X,
        feature_names=X.columns,
        class_names=['0', '1'],
        mode='classification'
    )
    
    # 生成解释
    exp = explainer.explain_instance(
        instance,
        model.predict_proba
    )
    
    # 绘制解释图
    exp.show_in_notebook()
    
    return exp

# 3. 部分依赖图
def plot_partial_dependence(model, X, feature):
    from sklearn.inspection import partial_dependence
    
    # 计算部分依赖
    pdp = partial_dependence(
        model,
        X,
        [feature],
        kind='average'
    )
    
    # 绘制部分依赖图
    plt.figure(figsize=(10, 6))
    plt.plot(pdp[1][0], pdp[0][0])
    plt.xlabel(feature)
    plt.ylabel('预测值')
    plt.title('部分依赖图')
    plt.show()
    
    return pdp

# 4. 特征重要性
def plot_feature_importance(model, feature_names):
    # 获取特征重要性
    importances = model.feature_importances_
    
    # 排序
    indices = np.argsort(importances)[::-1]
    
    # 绘制特征重要性图
    plt.figure(figsize=(10, 6))
    plt.title('特征重要性')
    plt.bar(range(len(importances)), importances[indices])
    plt.xticks(range(len(importances)),
               [feature_names[i] for i in indices],
               rotation=45)
    plt.tight_layout()
    plt.show()
    
    return importances`}
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
          href="/study/ai/datamining/practice"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回数据挖掘实战
        </Link>
        <Link 
          href="/study/ai/datamining"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          返回数据挖掘目录
        </Link>
      </div>
    </div>
  );
} 
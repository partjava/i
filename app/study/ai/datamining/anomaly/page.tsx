'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AnomalyDetectionPage() {
  const [activeTab, setActiveTab] = useState('basic');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'basic', label: '基本概念' },
    { id: 'algorithms', label: '算法实现' },
    { id: 'applications', label: '实际应用' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">异常检测</h1>
      
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
        {activeTab === 'basic' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">异常检测基本概念</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 基本定义</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      异常检测是一种识别数据中异常模式的技术。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 基本概念
1. 异常（Anomaly）
   - 偏离正常模式
   - 罕见事件
   - 异常行为

2. 检测方法
   - 统计方法
   - 机器学习方法
   - 深度学习方法

3. 评估指标
   - 准确率
   - 召回率
   - F1分数
   - ROC曲线

# 示例
数据集：
X = [
    [1, 2],
    [2, 1],
    [8, 9],
    [9, 8],
    [100, 100]  # 异常点
]

检测结果：
异常点：[100, 100]`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 异常类型</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      异常可以根据不同的特征进行分类。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 异常类型
1. 点异常
   - 单个数据点异常
   - 全局异常
   - 局部异常

2. 上下文异常
   - 时间序列异常
   - 空间异常
   - 行为异常

3. 集体异常
   - 群体异常
   - 模式异常
   - 关系异常

# 特点比较
1. 点异常
   - 优点：容易检测
   - 缺点：可能误报

2. 上下文异常
   - 优点：考虑上下文
   - 缺点：计算复杂

3. 集体异常
   - 优点：发现复杂模式
   - 缺点：需要领域知识`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 应用场景</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      异常检测在各个领域都有广泛的应用。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 应用场景
1. 金融风控
   - 欺诈交易
   - 异常支付
   - 洗钱检测

2. 网络安全
   - 入侵检测
   - 异常访问
   - 恶意行为

3. 工业监控
   - 设备故障
   - 异常生产
   - 质量控制

4. 医疗诊断
   - 疾病检测
   - 异常症状
   - 药物反应

# 实际案例
1. 信用卡欺诈
   - 异常交易
   - 异常地点
   - 异常金额

2. 网络入侵
   - 异常流量
   - 异常访问
   - 异常行为`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'algorithms' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">异常检测算法实现</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 基于统计的异常检测</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      使用统计方法检测异常。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 基于统计的异常检测
import numpy as np
from scipy import stats
import matplotlib.pyplot as plt

class StatisticalAnomalyDetection:
    def __init__(self, threshold=3):
        self.threshold = threshold
        self.mean = None
        self.std = None
    
    def fit(self, X):
        # 计算均值和标准差
        self.mean = np.mean(X, axis=0)
        self.std = np.std(X, axis=0)
        return self
    
    def predict(self, X):
        # 计算Z分数
        z_scores = np.abs((X - self.mean) / self.std)
        
        # 标记异常点
        anomalies = np.any(z_scores > self.threshold, axis=1)
        
        return anomalies
    
    def plot_anomalies(self, X, anomalies):
        plt.figure(figsize=(10, 6))
        
        # 绘制正常点
        normal = X[~anomalies]
        plt.scatter(normal[:, 0], normal[:, 1], 
                   c='blue', label='正常点')
        
        # 绘制异常点
        if np.any(anomalies):
            abnormal = X[anomalies]
            plt.scatter(abnormal[:, 0], abnormal[:, 1],
                       c='red', marker='x', s=100,
                       label='异常点')
        
        plt.title('统计异常检测结果')
        plt.legend()
        plt.show()

# 使用示例
X = np.random.randn(100, 2)
# 添加一些异常点
X[0] = [10, 10]
X[1] = [-10, -10]

detector = StatisticalAnomalyDetection(threshold=3)
detector.fit(X)
anomalies = detector.predict(X)
detector.plot_anomalies(X, anomalies)`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 基于隔离森林的异常检测</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      使用隔离森林算法检测异常。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 基于隔离森林的异常检测
import numpy as np
from sklearn.ensemble import IsolationForest
import matplotlib.pyplot as plt

class IsolationForestAnomalyDetection:
    def __init__(self, contamination=0.1):
        self.contamination = contamination
        self.model = None
    
    def fit(self, X):
        # 创建隔离森林模型
        self.model = IsolationForest(
            contamination=self.contamination,
            random_state=42
        )
        
        # 训练模型
        self.model.fit(X)
        
        return self
    
    def predict(self, X):
        # 预测异常点
        predictions = self.model.predict(X)
        
        # 转换预测结果
        anomalies = predictions == -1
        
        return anomalies
    
    def plot_anomalies(self, X, anomalies):
        plt.figure(figsize=(10, 6))
        
        # 绘制正常点
        normal = X[~anomalies]
        plt.scatter(normal[:, 0], normal[:, 1], 
                   c='blue', label='正常点')
        
        # 绘制异常点
        if np.any(anomalies):
            abnormal = X[anomalies]
            plt.scatter(abnormal[:, 0], abnormal[:, 1],
                       c='red', marker='x', s=100,
                       label='异常点')
        
        plt.title('隔离森林异常检测结果')
        plt.legend()
        plt.show()

# 使用示例
X = np.random.randn(100, 2)
# 添加一些异常点
X[0] = [10, 10]
X[1] = [-10, -10]

detector = IsolationForestAnomalyDetection(contamination=0.1)
detector.fit(X)
anomalies = detector.predict(X)
detector.plot_anomalies(X, anomalies)`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 基于自编码器的异常检测</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      使用自编码器检测异常。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 基于自编码器的异常检测
import numpy as np
import tensorflow as tf
from tensorflow.keras import layers, Model
import matplotlib.pyplot as plt

class AutoencoderAnomalyDetection:
    def __init__(self, encoding_dim=2, threshold=0.1):
        self.encoding_dim = encoding_dim
        self.threshold = threshold
        self.autoencoder = None
        self.encoder = None
        self.decoder = None
    
    def _build_autoencoder(self, input_dim):
        # 编码器
        input_layer = layers.Input(shape=(input_dim,))
        encoded = layers.Dense(32, activation='relu')(input_layer)
        encoded = layers.Dense(16, activation='relu')(encoded)
        encoded = layers.Dense(self.encoding_dim, activation='relu')(encoded)
        
        # 解码器
        decoded = layers.Dense(16, activation='relu')(encoded)
        decoded = layers.Dense(32, activation='relu')(decoded)
        decoded = layers.Dense(input_dim, activation='sigmoid')(decoded)
        
        # 构建模型
        self.autoencoder = Model(input_layer, decoded)
        self.encoder = Model(input_layer, encoded)
        
        # 编译模型
        self.autoencoder.compile(optimizer='adam', loss='mse')
    
    def fit(self, X, epochs=50, batch_size=32):
        # 构建自编码器
        self._build_autoencoder(X.shape[1])
        
        # 训练模型
        self.autoencoder.fit(
            X, X,
            epochs=epochs,
            batch_size=batch_size,
            shuffle=True,
            validation_split=0.2,
            verbose=0
        )
        
        return self
    
    def predict(self, X):
        # 重构数据
        X_pred = self.autoencoder.predict(X)
        
        # 计算重构误差
        mse = np.mean(np.power(X - X_pred, 2), axis=1)
        
        # 标记异常点
        anomalies = mse > self.threshold
        
        return anomalies
    
    def plot_anomalies(self, X, anomalies):
        plt.figure(figsize=(10, 6))
        
        # 绘制正常点
        normal = X[~anomalies]
        plt.scatter(normal[:, 0], normal[:, 1], 
                   c='blue', label='正常点')
        
        # 绘制异常点
        if np.any(anomalies):
            abnormal = X[anomalies]
            plt.scatter(abnormal[:, 0], abnormal[:, 1],
                       c='red', marker='x', s=100,
                       label='异常点')
        
        plt.title('自编码器异常检测结果')
        plt.legend()
        plt.show()

# 使用示例
X = np.random.randn(100, 2)
# 添加一些异常点
X[0] = [10, 10]
X[1] = [-10, -10]

detector = AutoencoderAnomalyDetection(encoding_dim=2, threshold=0.1)
detector.fit(X)
anomalies = detector.predict(X)
detector.plot_anomalies(X, anomalies)`}
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
              <h3 className="text-xl font-semibold mb-3">实际应用</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 信用卡欺诈检测</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      异常检测在信用卡欺诈检测中的应用。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 信用卡欺诈检测
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import IsolationForest
import matplotlib.pyplot as plt

# 加载数据
def load_credit_card_data(file_path):
    df = pd.read_csv(file_path)
    return df

# 数据预处理
def preprocess_credit_card_data(df):
    # 选择特征
    features = ['amount', 'time', 'v1', 'v2', 'v3']
    X = df[features].values
    
    # 标准化
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    return X_scaled, features

# 欺诈检测模型
def fraud_detection_model(X):
    # 创建隔离森林模型
    model = IsolationForest(
        contamination=0.01,
        random_state=42
    )
    
    # 训练模型
    model.fit(X)
    
    return model

# 评估模型
def evaluate_fraud_model(model, X):
    # 预测异常点
    predictions = model.predict(X)
    
    # 转换预测结果
    anomalies = predictions == -1
    
    return anomalies

# 可视化结果
def plot_fraud_results(X, anomalies, features):
    plt.figure(figsize=(12, 8))
    
    # 绘制正常交易
    normal = X[~anomalies]
    plt.scatter(normal[:, 0], normal[:, 1], 
               c='blue', label='正常交易')
    
    # 绘制异常交易
    if np.any(anomalies):
        abnormal = X[anomalies]
        plt.scatter(abnormal[:, 0], abnormal[:, 1],
                   c='red', marker='x', s=100,
                   label='异常交易')
    
    plt.xlabel(features[0])
    plt.ylabel(features[1])
    plt.title('信用卡交易异常检测')
    plt.legend()
    plt.show()

# 应用示例
def credit_card_analysis(file_path):
    # 加载数据
    df = load_credit_card_data(file_path)
    
    # 数据预处理
    X, features = preprocess_credit_card_data(df)
    
    # 训练模型
    model = fraud_detection_model(X)
    
    # 检测异常
    anomalies = evaluate_fraud_model(model, X)
    
    # 可视化结果
    plot_fraud_results(X, anomalies, features)
    
    # 分析异常交易
    analyze_fraud_transactions(df, anomalies)

# 分析异常交易
def analyze_fraud_transactions(df, anomalies):
    if np.any(anomalies):
        print("\\n异常交易分析：")
        print(f"异常交易数量: {np.sum(anomalies)}")
        print(f"异常交易比例: {np.sum(anomalies) / len(df):.2%}")
        
        # 分析异常交易特征
        fraud_transactions = df[anomalies]
        print("\\n异常交易特征统计：")
        print(fraud_transactions.describe())
        
        # 生成风险报告
        generate_risk_report(fraud_transactions)

# 生成风险报告
def generate_risk_report(fraud_transactions):
    print("\\n风险报告：")
    print("1. 高风险交易特征：")
    print(f"- 平均交易金额: {fraud_transactions['amount'].mean():.2f}")
    print(f"- 最大交易金额: {fraud_transactions['amount'].max():.2f}")
    print(f"- 交易时间分布: {fraud_transactions['time'].describe()}")
    
    print("\\n2. 风险等级：")
    if fraud_transactions['amount'].mean() > 1000:
        print("- 高风险：大额异常交易")
    elif fraud_transactions['amount'].mean() > 500:
        print("- 中风险：中等金额异常交易")
    else:
        print("- 低风险：小额异常交易")`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 网络入侵检测</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      异常检测在网络入侵检测中的应用。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 网络入侵检测
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import IsolationForest
import matplotlib.pyplot as plt

# 加载数据
def load_network_data(file_path):
    df = pd.read_csv(file_path)
    return df

# 数据预处理
def preprocess_network_data(df):
    # 选择特征
    features = ['duration', 'protocol_type', 'service', 'flag', 'src_bytes']
    X = df[features].values
    
    # 标准化
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    return X_scaled, features

# 入侵检测模型
def intrusion_detection_model(X):
    # 创建隔离森林模型
    model = IsolationForest(
        contamination=0.01,
        random_state=42
    )
    
    # 训练模型
    model.fit(X)
    
    return model

# 评估模型
def evaluate_intrusion_model(model, X):
    # 预测异常点
    predictions = model.predict(X)
    
    # 转换预测结果
    anomalies = predictions == -1
    
    return anomalies

# 可视化结果
def plot_intrusion_results(X, anomalies, features):
    plt.figure(figsize=(12, 8))
    
    # 绘制正常流量
    normal = X[~anomalies]
    plt.scatter(normal[:, 0], normal[:, 1], 
               c='blue', label='正常流量')
    
    # 绘制异常流量
    if np.any(anomalies):
        abnormal = X[anomalies]
        plt.scatter(abnormal[:, 0], abnormal[:, 1],
                   c='red', marker='x', s=100,
                   label='异常流量')
    
    plt.xlabel(features[0])
    plt.ylabel(features[1])
    plt.title('网络流量异常检测')
    plt.legend()
    plt.show()

# 应用示例
def network_analysis(file_path):
    # 加载数据
    df = load_network_data(file_path)
    
    # 数据预处理
    X, features = preprocess_network_data(df)
    
    # 训练模型
    model = intrusion_detection_model(X)
    
    # 检测异常
    anomalies = evaluate_intrusion_model(model, X)
    
    # 可视化结果
    plot_intrusion_results(X, anomalies, features)
    
    # 分析异常流量
    analyze_intrusion_traffic(df, anomalies)

# 分析异常流量
def analyze_intrusion_traffic(df, anomalies):
    if np.any(anomalies):
        print("\\n异常流量分析：")
        print(f"异常流量数量: {np.sum(anomalies)}")
        print(f"异常流量比例: {np.sum(anomalies) / len(df):.2%}")
        
        # 分析异常流量特征
        intrusion_traffic = df[anomalies]
        print("\\n异常流量特征统计：")
        print(intrusion_traffic.describe())
        
        # 生成安全报告
        generate_security_report(intrusion_traffic)

# 生成安全报告
def generate_security_report(intrusion_traffic):
    print("\\n安全报告：")
    print("1. 异常流量特征：")
    print(f"- 平均持续时间: {intrusion_traffic['duration'].mean():.2f}")
    print(f"- 最大持续时间: {intrusion_traffic['duration'].max():.2f}")
    print(f"- 协议类型分布: {intrusion_traffic['protocol_type'].value_counts()}")
    
    print("\\n2. 安全等级：")
    if intrusion_traffic['duration'].mean() > 1000:
        print("- 高风险：长时间异常连接")
    elif intrusion_traffic['duration'].mean() > 500:
        print("- 中风险：中等时间异常连接")
    else:
        print("- 低风险：短时间异常连接")`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 工业设备故障检测</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      异常检测在工业设备故障检测中的应用。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 工业设备故障检测
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import IsolationForest
import matplotlib.pyplot as plt

# 加载数据
def load_equipment_data(file_path):
    df = pd.read_csv(file_path)
    return df

# 数据预处理
def preprocess_equipment_data(df):
    # 选择特征
    features = ['temperature', 'pressure', 'vibration', 'speed', 'power']
    X = df[features].values
    
    # 标准化
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    return X_scaled, features

# 故障检测模型
def fault_detection_model(X):
    # 创建隔离森林模型
    model = IsolationForest(
        contamination=0.01,
        random_state=42
    )
    
    # 训练模型
    model.fit(X)
    
    return model

# 评估模型
def evaluate_fault_model(model, X):
    # 预测异常点
    predictions = model.predict(X)
    
    # 转换预测结果
    anomalies = predictions == -1
    
    return anomalies

# 可视化结果
def plot_fault_results(X, anomalies, features):
    plt.figure(figsize=(12, 8))
    
    # 绘制正常数据
    normal = X[~anomalies]
    plt.scatter(normal[:, 0], normal[:, 1], 
               c='blue', label='正常数据')
    
    # 绘制异常数据
    if np.any(anomalies):
        abnormal = X[anomalies]
        plt.scatter(abnormal[:, 0], abnormal[:, 1],
                   c='red', marker='x', s=100,
                   label='异常数据')
    
    plt.xlabel(features[0])
    plt.ylabel(features[1])
    plt.title('设备运行异常检测')
    plt.legend()
    plt.show()

# 应用示例
def equipment_analysis(file_path):
    # 加载数据
    df = load_equipment_data(file_path)
    
    # 数据预处理
    X, features = preprocess_equipment_data(df)
    
    # 训练模型
    model = fault_detection_model(X)
    
    # 检测异常
    anomalies = evaluate_fault_model(model, X)
    
    # 可视化结果
    plot_fault_results(X, anomalies, features)
    
    # 分析异常数据
    analyze_fault_data(df, anomalies)

# 分析异常数据
def analyze_fault_data(df, anomalies):
    if np.any(anomalies):
        print("\\n异常数据分析：")
        print(f"异常数据数量: {np.sum(anomalies)}")
        print(f"异常数据比例: {np.sum(anomalies) / len(df):.2%}")
        
        # 分析异常数据特征
        fault_data = df[anomalies]
        print("\\n异常数据特征统计：")
        print(fault_data.describe())
        
        # 生成故障报告
        generate_fault_report(fault_data)

# 生成故障报告
def generate_fault_report(fault_data):
    print("\\n故障报告：")
    print("1. 异常特征：")
    print(f"- 平均温度: {fault_data['temperature'].mean():.2f}")
    print(f"- 最大温度: {fault_data['temperature'].max():.2f}")
    print(f"- 平均压力: {fault_data['pressure'].mean():.2f}")
    print(f"- 最大压力: {fault_data['pressure'].max():.2f}")
    
    print("\\n2. 故障等级：")
    if fault_data['temperature'].mean() > 100:
        print("- 高风险：温度过高")
    elif fault_data['pressure'].mean() > 80:
        print("- 中风险：压力过高")
    else:
        print("- 低风险：轻微异常")`}
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
          href="/study/ai/datamining/classification"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回分类预测
        </Link>
        <Link 
          href="/study/ai/datamining/visualization"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          数据可视化 →
        </Link>
      </div>
    </div>
  );
} 
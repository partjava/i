'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function DataMiningPracticePage() {
  const [activeTab, setActiveTab] = useState('retail');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">数据挖掘实战</h1>

      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        <button
          onClick={() => setActiveTab('retail')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'retail'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          零售分析
        </button>
        <button
          onClick={() => setActiveTab('finance')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'finance'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          金融风控
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === 'security'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          网络安全
        </button>
      </div>

      {/* 内容区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === 'retail' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">零售分析实战</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 客户分群分析</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      使用RFM模型对客户进行分群，实现精准营销。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# RFM客户分群
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt

# 加载数据
def load_customer_data(file_path):
    df = pd.read_csv(file_path)
    return df

# 计算RFM指标
def calculate_rfm(df):
    # 计算最近一次购买时间
    df['recency'] = (pd.to_datetime('today') - pd.to_datetime(df['last_purchase'])).dt.days
    
    # 计算购买频率
    frequency = df.groupby('customer_id')['order_id'].count()
    
    # 计算购买金额
    monetary = df.groupby('customer_id')['amount'].sum()
    
    # 合并RFM指标
    rfm = pd.DataFrame({
        'recency': df.groupby('customer_id')['recency'].min(),
        'frequency': frequency,
        'monetary': monetary
    })
    
    return rfm

# 客户分群
def customer_segmentation(rfm, n_clusters=4):
    # 数据标准化
    scaler = StandardScaler()
    rfm_scaled = scaler.fit_transform(rfm)
    
    # K-means聚类
    kmeans = KMeans(n_clusters=n_clusters, random_state=42)
    rfm['cluster'] = kmeans.fit_predict(rfm_scaled)
    
    return rfm

# 分析客户群特征
def analyze_segments(rfm):
    # 计算每个群的平均RFM值
    segment_analysis = rfm.groupby('cluster').agg({
        'recency': 'mean',
        'frequency': 'mean',
        'monetary': 'mean'
    })
    
    # 计算每个群的客户数量
    segment_size = rfm['cluster'].value_counts()
    
    return segment_analysis, segment_size

# 可视化结果
def plot_segments(rfm):
    plt.figure(figsize=(12, 8))
    
    # 绘制散点图
    scatter = plt.scatter(
        rfm['recency'],
        rfm['frequency'],
        c=rfm['cluster'],
        cmap='viridis',
        s=rfm['monetary']/100
    )
    
    plt.xlabel('最近购买时间')
    plt.ylabel('购买频率')
    plt.title('客户分群结果')
    
    # 添加图例
    legend1 = plt.legend(*scatter.legend_elements(),
                        title="客户群")
    plt.add_artist(legend1)
    
    plt.show()

# 应用示例
def retail_analysis(file_path):
    # 加载数据
    df = load_customer_data(file_path)
    
    # 计算RFM指标
    rfm = calculate_rfm(df)
    
    # 客户分群
    rfm = customer_segmentation(rfm)
    
    # 分析结果
    segment_analysis, segment_size = analyze_segments(rfm)
    
    # 可视化
    plot_segments(rfm)
    
    return segment_analysis, segment_size`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 商品关联分析</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      使用Apriori算法挖掘商品之间的关联规则。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 商品关联分析
import pandas as pd
from mlxtend.frequent_patterns import apriori
from mlxtend.frequent_patterns import association_rules
import matplotlib.pyplot as plt

# 加载数据
def load_transaction_data(file_path):
    df = pd.read_csv(file_path)
    return df

# 数据预处理
def preprocess_data(df):
    # 创建购物篮数据
    basket = df.pivot_table(
        index='transaction_id',
        columns='product_id',
        values='quantity',
        aggfunc='sum',
        fill_value=0
    )
    
    # 转换为二进制数据
    basket = (basket > 0).astype(int)
    
    return basket

# 挖掘关联规则
def mine_association_rules(basket, min_support=0.01, min_confidence=0.5):
    # 生成频繁项集
    frequent_itemsets = apriori(
        basket,
        min_support=min_support,
        use_colnames=True
    )
    
    # 生成关联规则
    rules = association_rules(
        frequent_itemsets,
        metric='confidence',
        min_threshold=min_confidence
    )
    
    return rules

# 可视化规则
def plot_rules(rules):
    plt.figure(figsize=(10, 6))
    plt.scatter(rules['support'], rules['confidence'],
                alpha=0.5, s=rules['lift']*100)
    
    plt.xlabel('支持度')
    plt.ylabel('置信度')
    plt.title('关联规则分布')
    
    # 添加规则标签
    for i, rule in rules.iterrows():
        plt.annotate(
            f"{rule['antecedents']} -> {rule['consequents']}",
            (rule['support'], rule['confidence']),
            xytext=(5, 5),
            textcoords='offset points'
        )
    
    plt.show()

# 生成营销建议
def generate_recommendations(rules):
    recommendations = []
    
    for _, rule in rules.iterrows():
        if rule['lift'] > 1:
            recommendations.append({
                'antecedent': rule['antecedents'],
                'consequent': rule['consequents'],
                'confidence': rule['confidence'],
                'lift': rule['lift']
            })
    
    return recommendations

# 应用示例
def product_association_analysis(file_path):
    # 加载数据
    df = load_transaction_data(file_path)
    
    # 数据预处理
    basket = preprocess_data(df)
    
    # 挖掘关联规则
    rules = mine_association_rules(basket)
    
    # 可视化规则
    plot_rules(rules)
    
    # 生成建议
    recommendations = generate_recommendations(rules)
    
    return recommendations`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'finance' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">金融风控实战</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 信用风险评估</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      使用机器学习模型评估客户信用风险。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 信用风险评估
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, roc_auc_score
import matplotlib.pyplot as plt

# 加载数据
def load_credit_data(file_path):
    df = pd.read_csv(file_path)
    return df

# 特征工程
def feature_engineering(df):
    # 处理缺失值
    df = df.fillna(df.mean())
    
    # 处理类别特征
    categorical_cols = df.select_dtypes(include=['object']).columns
    df = pd.get_dummies(df, columns=categorical_cols)
    
    return df

# 模型训练
def train_model(X, y):
    # 数据分割
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    
    # 数据标准化
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # 训练模型
    model = RandomForestClassifier(
        n_estimators=100,
        max_depth=10,
        random_state=42
    )
    model.fit(X_train_scaled, y_train)
    
    return model, X_test_scaled, y_test

# 模型评估
def evaluate_model(model, X_test, y_test):
    # 预测概率
    y_pred_proba = model.predict_proba(X_test)[:, 1]
    
    # 计算AUC
    auc = roc_auc_score(y_test, y_pred_proba)
    
    # 生成分类报告
    y_pred = model.predict(X_test)
    report = classification_report(y_test, y_pred)
    
    return auc, report

# 特征重要性分析
def analyze_feature_importance(model, feature_names):
    # 获取特征重要性
    importances = model.feature_importances_
    
    # 排序
    indices = np.argsort(importances)[::-1]
    
    # 绘制特征重要性
    plt.figure(figsize=(10, 6))
    plt.title('特征重要性')
    plt.bar(range(len(importances)), importances[indices])
    plt.xticks(range(len(importances)), 
               [feature_names[i] for i in indices],
               rotation=45)
    plt.tight_layout()
    plt.show()

# 应用示例
def credit_risk_analysis(file_path):
    # 加载数据
    df = load_credit_data(file_path)
    
    # 特征工程
    df = feature_engineering(df)
    
    # 准备数据
    X = df.drop('default', axis=1)
    y = df['default']
    
    # 训练模型
    model, X_test, y_test = train_model(X, y)
    
    # 评估模型
    auc, report = evaluate_model(model, X_test, y_test)
    
    # 分析特征重要性
    analyze_feature_importance(model, X.columns)
    
    return auc, report`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 欺诈检测</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      使用异常检测算法识别欺诈交易。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 欺诈检测
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import IsolationForest
from sklearn.metrics import precision_recall_curve
import matplotlib.pyplot as plt

# 加载数据
def load_transaction_data(file_path):
    df = pd.read_csv(file_path)
    return df

# 特征工程
def feature_engineering(df):
    # 时间特征
    df['hour'] = pd.to_datetime(df['timestamp']).dt.hour
    df['day'] = pd.to_datetime(df['timestamp']).dt.day
    
    # 交易特征
    df['amount_log'] = np.log1p(df['amount'])
    
    # 用户特征
    user_stats = df.groupby('user_id').agg({
        'amount': ['mean', 'std', 'count']
    })
    user_stats.columns = ['avg_amount', 'std_amount', 'tx_count']
    df = df.merge(user_stats, on='user_id')
    
    return df

# 异常检测
def detect_fraud(df, contamination=0.01):
    # 准备特征
    features = ['amount_log', 'hour', 'day', 
                'avg_amount', 'std_amount', 'tx_count']
    X = df[features]
    
    # 数据标准化
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    # 训练模型
    model = IsolationForest(
        contamination=contamination,
        random_state=42
    )
    df['is_fraud'] = model.fit_predict(X_scaled)
    
    return df

# 评估结果
def evaluate_detection(df):
    # 计算精确率-召回率曲线
    precision, recall, thresholds = precision_recall_curve(
        df['is_fraud'],
        df['amount']
    )
    
    # 绘制曲线
    plt.figure(figsize=(10, 6))
    plt.plot(recall, precision)
    plt.xlabel('召回率')
    plt.ylabel('精确率')
    plt.title('精确率-召回率曲线')
    plt.show()
    
    # 计算F1分数
    f1_scores = 2 * (precision * recall) / (precision + recall)
    best_threshold = thresholds[np.argmax(f1_scores)]
    
    return best_threshold

# 应用示例
def fraud_detection_analysis(file_path):
    # 加载数据
    df = load_transaction_data(file_path)
    
    # 特征工程
    df = feature_engineering(df)
    
    # 异常检测
    df = detect_fraud(df)
    
    # 评估结果
    best_threshold = evaluate_detection(df)
    
    return df, best_threshold`}
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
              <h3 className="text-xl font-semibold mb-3">网络安全实战</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 入侵检测</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      使用机器学习模型检测网络入侵行为。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 入侵检测
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix
import matplotlib.pyplot as plt
import seaborn as sns

# 加载数据
def load_network_data(file_path):
    df = pd.read_csv(file_path)
    return df

# 特征工程
def feature_engineering(df):
    # 处理缺失值
    df = df.fillna(df.mean())
    
    # 处理类别特征
    categorical_cols = df.select_dtypes(include=['object']).columns
    df = pd.get_dummies(df, columns=categorical_cols)
    
    return df

# 模型训练
def train_model(X, y):
    # 数据分割
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    
    # 数据标准化
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # 训练模型
    model = RandomForestClassifier(
        n_estimators=100,
        max_depth=10,
        random_state=42
    )
    model.fit(X_train_scaled, y_train)
    
    return model, X_test_scaled, y_test

# 模型评估
def evaluate_model(model, X_test, y_test):
    # 预测
    y_pred = model.predict(X_test)
    
    # 生成分类报告
    report = classification_report(y_test, y_pred)
    
    # 绘制混淆矩阵
    cm = confusion_matrix(y_test, y_pred)
    plt.figure(figsize=(10, 8))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
    plt.title('混淆矩阵')
    plt.xlabel('预测标签')
    plt.ylabel('真实标签')
    plt.show()
    
    return report

# 特征重要性分析
def analyze_feature_importance(model, feature_names):
    # 获取特征重要性
    importances = model.feature_importances_
    
    # 排序
    indices = np.argsort(importances)[::-1]
    
    # 绘制特征重要性
    plt.figure(figsize=(10, 6))
    plt.title('特征重要性')
    plt.bar(range(len(importances)), importances[indices])
    plt.xticks(range(len(importances)), 
               [feature_names[i] for i in indices],
               rotation=45)
    plt.tight_layout()
    plt.show()

# 应用示例
def intrusion_detection_analysis(file_path):
    # 加载数据
    df = load_network_data(file_path)
    
    # 特征工程
    df = feature_engineering(df)
    
    # 准备数据
    X = df.drop('attack_type', axis=1)
    y = df['attack_type']
    
    # 训练模型
    model, X_test, y_test = train_model(X, y)
    
    # 评估模型
    report = evaluate_model(model, X_test, y_test)
    
    # 分析特征重要性
    analyze_feature_importance(model, X.columns)
    
    return report`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 日志分析</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      使用关联规则挖掘分析系统日志。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 日志分析
import pandas as pd
import numpy as np
from mlxtend.frequent_patterns import apriori
from mlxtend.frequent_patterns import association_rules
import matplotlib.pyplot as plt

# 加载数据
def load_log_data(file_path):
    df = pd.read_csv(file_path)
    return df

# 数据预处理
def preprocess_logs(df):
    # 时间特征
    df['timestamp'] = pd.to_datetime(df['timestamp'])
    df['hour'] = df['timestamp'].dt.hour
    df['day'] = df['timestamp'].dt.day
    
    # 事件特征
    df['event_type'] = df['event_type'].astype('category')
    df['event_id'] = df['event_type'].cat.codes
    
    return df

# 生成事件序列
def generate_event_sequences(df, window_size=5):
    sequences = []
    
    for i in range(len(df) - window_size + 1):
        sequence = df['event_id'].iloc[i:i+window_size].tolist()
        sequences.append(sequence)
    
    return sequences

# 挖掘关联规则
def mine_association_rules(sequences, min_support=0.01, min_confidence=0.5):
    # 转换为二进制矩阵
    unique_events = set()
    for seq in sequences:
        unique_events.update(seq)
    
    binary_matrix = pd.DataFrame(
        [[1 if event in seq else 0 for event in unique_events]
         for seq in sequences]
    )
    
    # 生成频繁项集
    frequent_itemsets = apriori(
        binary_matrix,
        min_support=min_support,
        use_colnames=True
    )
    
    # 生成关联规则
    rules = association_rules(
        frequent_itemsets,
        metric='confidence',
        min_threshold=min_confidence
    )
    
    return rules

# 可视化规则
def plot_rules(rules):
    plt.figure(figsize=(10, 6))
    plt.scatter(rules['support'], rules['confidence'],
                alpha=0.5, s=rules['lift']*100)
    
    plt.xlabel('支持度')
    plt.ylabel('置信度')
    plt.title('事件关联规则分布')
    
    # 添加规则标签
    for i, rule in rules.iterrows():
        plt.annotate(
            f"{rule['antecedents']} -> {rule['consequents']}",
            (rule['support'], rule['confidence']),
            xytext=(5, 5),
            textcoords='offset points'
        )
    
    plt.show()

# 应用示例
def log_analysis(file_path):
    # 加载数据
    df = load_log_data(file_path)
    
    # 数据预处理
    df = preprocess_logs(df)
    
    # 生成事件序列
    sequences = generate_event_sequences(df)
    
    # 挖掘关联规则
    rules = mine_association_rules(sequences)
    
    # 可视化规则
    plot_rules(rules)
    
    return rules`}
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
          href="/study/ai/datamining/visualization"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回数据可视化
        </Link>
        <Link 
          href="/study/ai/datamining/interview"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          面试题与前沿 →
        </Link>
      </div>
    </div>
  );
} 
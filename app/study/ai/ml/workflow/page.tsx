'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaDatabase, FaChartLine, FaCode, FaTools, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import { SiScikitlearn, SiPandas, SiNumpy, SiJupyter } from 'react-icons/si';

export default function MLWorkflowPage() {
  const [activeTab, setActiveTab] = useState('theory');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">机器学习项目流程</h1>
      
      {/* 进度条 */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '20%' }}></div>
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
      </div>

      {activeTab === 'theory' ? (
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">项目流程概述</h2>
            <p className="text-gray-700 mb-4">
              一个完整的机器学习项目通常包含以下步骤：问题定义、数据收集、数据预处理、特征工程、模型训练、模型评估和部署。每个步骤都至关重要，需要仔细规划和执行。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">前期准备</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>明确项目目标和需求</li>
                  <li>确定评估指标</li>
                  <li>收集相关数据</li>
                  <li>准备开发环境</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">后期工作</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>模型优化和调参</li>
                  <li>模型部署和维护</li>
                  <li>性能监控和更新</li>
                  <li>文档编写和分享</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">实际案例：电商用户流失预测</h2>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-700 mb-2">1. 问题定义</h3>
                <p className="text-gray-700">预测哪些用户可能会在未来30天内流失，以便提前进行挽留。</p>
                <ul className="list-disc list-inside text-gray-600 mt-2">
                  <li>目标：预测用户流失概率</li>
                  <li>评估指标：准确率、召回率、F1分数</li>
                  <li>时间范围：未来30天</li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-700 mb-2">2. 数据收集</h3>
                <p className="text-gray-700">收集用户行为数据、交易数据、基本信息等。</p>
                <ul className="list-disc list-inside text-gray-600 mt-2">
                  <li>用户行为：浏览记录、搜索记录、购物车操作</li>
                  <li>交易数据：订单金额、购买频率、退款情况</li>
                  <li>用户信息：注册时间、会员等级、活跃度</li>
                </ul>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-700 mb-2">3. 特征工程</h3>
                <p className="text-gray-700">构建预测用户流失的关键特征。</p>
                <ul className="list-disc list-inside text-gray-600 mt-2">
                  <li>时间特征：最近一次购买距今天数</li>
                  <li>行为特征：日均浏览时长、搜索次数</li>
                  <li>交易特征：客单价、复购率、退款率</li>
                  <li>用户特征：会员等级、活跃度评分</li>
                </ul>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-700 mb-2">4. 模型训练与评估</h3>
                <p className="text-gray-700">选择合适的模型并进行训练和评估。</p>
                <ul className="list-disc list-inside text-gray-600 mt-2">
                  <li>模型选择：XGBoost、LightGBM</li>
                  <li>参数调优：网格搜索最优参数</li>
                  <li>评估结果：准确率85%，召回率80%</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">详细工作流程</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full mt-1">
                  <FaDatabase className="text-blue-500 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold">1. 数据收集与预处理</h3>
                  <p className="text-gray-700">数据是机器学习项目的基础，质量直接影响模型效果</p>
                  <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                    <li>数据来源：公开数据集、爬虫、API等</li>
                    <li>数据清洗：处理缺失值、异常值、重复值</li>
                    <li>数据转换：标准化、归一化、编码</li>
                    <li>数据验证：检查数据质量和完整性</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-full mt-1">
                  <FaTools className="text-green-500 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold">2. 特征工程</h3>
                  <p className="text-gray-700">特征工程是提升模型性能的关键步骤</p>
                  <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                    <li>特征选择：相关性分析、重要性评估</li>
                    <li>特征构建：组合特征、时间特征、统计特征</li>
                    <li>特征转换：多项式特征、交互特征</li>
                    <li>特征降维：PCA、LDA等</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-full mt-1">
                  <FaChartLine className="text-purple-500 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold">3. 模型训练与评估</h3>
                  <p className="text-gray-700">选择合适的模型并进行训练和评估</p>
                  <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                    <li>模型选择：根据问题类型选择合适算法</li>
                    <li>参数调优：网格搜索、随机搜索、贝叶斯优化</li>
                    <li>交叉验证：K折交叉验证、留一法</li>
                    <li>性能评估：准确率、精确率、召回率、F1分数</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-yellow-100 p-3 rounded-full mt-1">
                  <FaCheckCircle className="text-yellow-500 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold">4. 模型部署与维护</h3>
                  <p className="text-gray-700">将模型部署到生产环境并持续维护</p>
                  <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                    <li>模型保存：序列化、版本控制</li>
                    <li>接口开发：REST API、gRPC等</li>
                    <li>性能监控：延迟、吞吐量、资源使用</li>
                    <li>模型更新：增量学习、在线学习</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">完整项目示例：房价预测</h2>
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
              <pre className="overflow-x-auto text-gray-800">
                <code>{`import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score

# 1. 数据加载和探索
df = pd.read_csv('housing.csv')
print("数据集基本信息：")
print(df.info())
print("\\n数据统计描述：")
print(df.describe())

# 2. 数据预处理
# 处理缺失值
df = df.fillna(df.mean())

# 特征工程
df['rooms_per_household'] = df['total_rooms'] / df['households']
df['bedrooms_per_room'] = df['total_bedrooms'] / df['total_rooms']
df['population_per_household'] = df['population'] / df['households']

# 3. 特征选择
features = ['longitude', 'latitude', 'housing_median_age', 'total_rooms',
           'total_bedrooms', 'population', 'households', 'median_income',
           'rooms_per_household', 'bedrooms_per_room', 'population_per_household']
X = df[features]
y = df['median_house_value']

# 4. 数据分割
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 5. 特征标准化
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# 6. 模型训练
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train_scaled, y_train)

# 7. 模型评估
y_pred = model.predict(X_test_scaled)
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"\\n模型评估结果：")
print(f"均方误差 (MSE): {mse:.2f}")
print(f"决定系数 (R²): {r2:.2f}")

# 8. 特征重要性分析
feature_importance = pd.DataFrame({
    'feature': features,
    'importance': model.feature_importances_
})
print("\\n特征重要性：")
print(feature_importance.sort_values('importance', ascending=False))`}</code>
              </pre>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">数据可视化分析</h2>
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
              <pre className="overflow-x-auto text-gray-800">
                <code>{`import matplotlib.pyplot as plt
import seaborn as sns

# 1. 相关性分析
plt.figure(figsize=(12, 8))
sns.heatmap(df.corr(), annot=True, cmap='coolwarm')
plt.title('特征相关性热力图')
plt.show()

# 2. 目标变量分布
plt.figure(figsize=(10, 6))
sns.histplot(df['median_house_value'], bins=50)
plt.title('房价分布')
plt.show()

# 3. 特征与目标变量关系
plt.figure(figsize=(12, 6))
sns.scatterplot(data=df, x='median_income', y='median_house_value')
plt.title('收入与房价关系')
plt.show()

# 4. 特征重要性可视化
plt.figure(figsize=(10, 6))
sns.barplot(data=feature_importance.sort_values('importance', ascending=False),
            x='importance', y='feature')
plt.title('特征重要性')
plt.show()`}</code>
              </pre>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">用户流失预测示例</h2>
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
              <pre className="overflow-x-auto text-gray-800">
                <code>{`import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from xgboost import XGBClassifier
from sklearn.metrics import classification_report

# 1. 数据加载
df = pd.read_csv('user_behavior.csv')

# 2. 特征工程
# 计算用户活跃度
df['activity_score'] = df['daily_views'] * 0.3 + df['search_count'] * 0.4 + df['cart_operations'] * 0.3

# 计算购买行为特征
df['days_since_last_purchase'] = (pd.Timestamp.now() - pd.to_datetime(df['last_purchase_date'])).dt.days
df['purchase_frequency'] = df['total_purchases'] / df['days_since_registration']
df['refund_rate'] = df['refund_count'] / df['total_purchases']

# 3. 特征选择
features = ['activity_score', 'days_since_last_purchase', 'purchase_frequency',
           'refund_rate', 'member_level', 'avg_order_value']
X = df[features]
y = df['churned']  # 是否流失的标签

# 4. 数据分割
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 5. 特征标准化
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# 6. 模型训练
model = XGBClassifier(
    n_estimators=100,
    learning_rate=0.1,
    max_depth=5,
    random_state=42
)
model.fit(X_train_scaled, y_train)

# 7. 模型评估
y_pred = model.predict(X_test_scaled)
print("\\n分类报告：")
print(classification_report(y_test, y_pred))

# 8. 特征重要性分析
feature_importance = pd.DataFrame({
    'feature': features,
    'importance': model.feature_importances_
})
print("\\n特征重要性：")
print(feature_importance.sort_values('importance', ascending=False))`}</code>
              </pre>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">用户行为分析可视化</h2>
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
              <pre className="overflow-x-auto text-gray-800">
                <code>{`import matplotlib.pyplot as plt
import seaborn as sns

# 1. 用户活跃度分布
plt.figure(figsize=(10, 6))
sns.histplot(data=df, x='activity_score', hue='churned', bins=30)
plt.title('用户活跃度分布')
plt.show()

# 2. 购买频率与流失关系
plt.figure(figsize=(10, 6))
sns.boxplot(data=df, x='churned', y='purchase_frequency')
plt.title('购买频率与用户流失关系')
plt.show()

# 3. 会员等级与流失率
plt.figure(figsize=(10, 6))
churn_by_level = df.groupby('member_level')['churned'].mean()
sns.barplot(x=churn_by_level.index, y=churn_by_level.values)
plt.title('会员等级与流失率关系')
plt.show()

# 4. 特征相关性热力图
plt.figure(figsize=(12, 8))
sns.heatmap(df[features + ['churned']].corr(), annot=True, cmap='coolwarm')
plt.title('特征相关性分析')
plt.show()`}</code>
              </pre>
            </div>
          </section>
        </div>
      )}

      {/* 导航链接 */}
      <div className="flex justify-between mt-8">
        <Link
          href="/study/ai/ml/basic"
          className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
        >
          上一课：机器学习基础
        </Link>
        <Link
          href="/study/ai/ml/supervised"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          下一课：监督学习算法
        </Link>
      </div>
    </div>
  );
} 
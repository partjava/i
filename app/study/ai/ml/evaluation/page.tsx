'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaRobot, FaBrain, FaChartLine, FaCode, FaLightbulb, FaNetworkWired, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { SiScikitlearn, SiPandas, SiNumpy } from 'react-icons/si';

export default function ModelEvaluationPage() {
  const [activeTab, setActiveTab] = useState('theory');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">模型评估与选择</h1>
      
      {/* 进度条 */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '50%' }}></div>
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
            <h2 className="text-2xl font-semibold mb-4">模型评估概述</h2>
            <p className="text-gray-700 mb-4">
              模型评估是机器学习中的重要环节，用于衡量模型的性能和泛化能力。选择合适的评估指标和评估方法对于模型的选择和优化至关重要。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">分类问题评估</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>准确率（Accuracy）</li>
                  <li>精确率（Precision）</li>
                  <li>召回率（Recall）</li>
                  <li>F1分数</li>
                  <li>ROC曲线和AUC</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">回归问题评估</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>均方误差（MSE）</li>
                  <li>均方根误差（RMSE）</li>
                  <li>平均绝对误差（MAE）</li>
                  <li>决定系数（R²）</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">评估方法</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>留出法（Hold-out）</li>
                  <li>交叉验证（Cross-validation）</li>
                  <li>自助法（Bootstrap）</li>
                  <li>时间序列验证</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">评估指标详解</h2>
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full mt-1">
                  <FaChartLine className="text-blue-500 text-xl" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">1. 分类问题评估指标</h3>
                  <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                    <svg width="100%" height="200" viewBox="0 0 400 200">
                      {/* 混淆矩阵示意图 */}
                      <rect x="50" y="50" width="100" height="100" fill="#93C5FD" />
                      <rect x="150" y="50" width="100" height="100" fill="#FCA5A5" />
                      <rect x="50" y="150" width="100" height="100" fill="#FCA5A5" />
                      <rect x="150" y="150" width="100" height="100" fill="#93C5FD" />
                      <text x="100" y="100" textAnchor="middle" fill="white">TP</text>
                      <text x="200" y="100" textAnchor="middle" fill="white">FP</text>
                      <text x="100" y="200" textAnchor="middle" fill="white">FN</text>
                      <text x="200" y="200" textAnchor="middle" fill="white">TN</text>
                    </svg>
                  </div>
                  <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                    <li>准确率 = (TP + TN) / (TP + TN + FP + FN)</li>
                    <li>精确率 = TP / (TP + FP)</li>
                    <li>召回率 = TP / (TP + FN)</li>
                    <li>F1分数 = 2 * (精确率 * 召回率) / (精确率 + 召回率)</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-full mt-1">
                  <FaBrain className="text-green-500 text-xl" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">2. 回归问题评估指标</h3>
                  <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                    <svg width="100%" height="200" viewBox="0 0 400 200">
                      {/* 回归误差示意图 */}
                      <line x1="50" y1="150" x2="350" y2="50" stroke="#10B981" strokeWidth="2" />
                      <circle cx="100" cy="120" r="3" fill="#059669" />
                      <circle cx="200" cy="80" r="3" fill="#059669" />
                      <circle cx="300" cy="40" r="3" fill="#059669" />
                      <line x1="100" y1="120" x2="100" y2="100" stroke="#6EE7B7" strokeWidth="1" />
                      <line x1="200" y1="80" x2="200" y2="60" stroke="#6EE7B7" strokeWidth="1" />
                      <line x1="300" y1="40" x2="300" y2="20" stroke="#6EE7B7" strokeWidth="1" />
                    </svg>
                  </div>
                  <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                    <li>MSE = 1/n * Σ(y_true - y_pred)²</li>
                    <li>RMSE = √MSE</li>
                    <li>MAE = 1/n * Σ|y_true - y_pred|</li>
                    <li>R² = 1 - Σ(y_true - y_pred)² / Σ(y_true - y_mean)²</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-full mt-1">
                  <FaNetworkWired className="text-purple-500 text-xl" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">3. 交叉验证</h3>
                  <p className="text-gray-700">通过将数据集分成多个子集，轮流使用不同子集作为训练集和验证集</p>
                  <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                    <svg width="100%" height="200" viewBox="0 0 400 200">
                      {/* 交叉验证示意图 */}
                      <rect x="50" y="50" width="300" height="100" fill="#DDD6FE" />
                      <line x1="125" y1="50" x2="125" y2="150" stroke="#8B5CF6" strokeWidth="2" />
                      <line x1="200" y1="50" x2="200" y2="150" stroke="#8B5CF6" strokeWidth="2" />
                      <line x1="275" y1="50" x2="275" y2="150" stroke="#8B5CF6" strokeWidth="2" />
                      <text x="87.5" y="100" textAnchor="middle" fill="#4C1D95">训练集</text>
                      <text x="162.5" y="100" textAnchor="middle" fill="#4C1D95">验证集</text>
                      <text x="237.5" y="100" textAnchor="middle" fill="#4C1D95">训练集</text>
                      <text x="312.5" y="100" textAnchor="middle" fill="#4C1D95">训练集</text>
                    </svg>
                  </div>
                  <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                    <li>K折交叉验证</li>
                    <li>留一交叉验证</li>
                    <li>分层交叉验证</li>
                    <li>时间序列交叉验证</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : activeTab === 'practice' ? (
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">模型评估代码示例</h2>
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
              <pre className="overflow-x-auto text-gray-800">
                <code>{`import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.linear_model import LogisticRegression, LinearRegression
import matplotlib.pyplot as plt

# 1. 分类问题评估示例
def classification_evaluation():
    # 生成示例数据
    X = np.random.randn(100, 2)
    y = (X[:, 0] + X[:, 1] > 0).astype(int)
    
    # 划分训练集和测试集
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    
    # 训练模型
    model = LogisticRegression()
    model.fit(X_train, y_train)
    
    # 预测
    y_pred = model.predict(X_test)
    
    # 计算评估指标
    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred)
    recall = recall_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)
    
    print(f"准确率: {accuracy:.3f}")
    print(f"精确率: {precision:.3f}")
    print(f"召回率: {recall:.3f}")
    print(f"F1分数: {f1:.3f}")
    
    # 交叉验证
    cv_scores = cross_val_score(model, X, y, cv=5)
    print(f"\\n5折交叉验证分数: {cv_scores}")
    print(f"平均交叉验证分数: {cv_scores.mean():.3f}")

# 2. 回归问题评估示例
def regression_evaluation():
    # 生成示例数据
    X = np.random.randn(100, 2)
    y = 2 * X[:, 0] + 3 * X[:, 1] + np.random.randn(100) * 0.1
    
    # 划分训练集和测试集
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    
    # 训练模型
    model = LinearRegression()
    model.fit(X_train, y_train)
    
    # 预测
    y_pred = model.predict(X_test)
    
    # 计算评估指标
    mse = mean_squared_error(y_test, y_pred)
    rmse = np.sqrt(mse)
    r2 = r2_score(y_test, y_pred)
    
    print(f"\\n均方误差 (MSE): {mse:.3f}")
    print(f"均方根误差 (RMSE): {rmse:.3f}")
    print(f"决定系数 (R²): {r2:.3f}")
    
    # 可视化预测结果
    plt.figure(figsize=(10, 6))
    plt.scatter(y_test, y_pred, alpha=0.5)
    plt.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()], 'r--')
    plt.xlabel('真实值')
    plt.ylabel('预测值')
    plt.title('回归预测结果')
    plt.show()

# 运行评估示例
if __name__ == "__main__":
    print("运行分类问题评估...")
    classification_evaluation()
    print("\\n运行回归问题评估...")
    regression_evaluation()`}</code>
              </pre>
            </div>
          </section>
        </div>
      ) : (
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">例题1：分类模型评估</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">问题描述</h3>
                <p className="text-gray-700">
                  评估一个二分类模型在信用卡欺诈检测任务中的性能，并选择合适的评估指标。
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">数据集</h3>
                <pre className="overflow-x-auto text-gray-800">
                  <code>{`# 示例数据
交易ID  交易金额  交易时间  交易地点  是否欺诈
001     1000      10:00    北京      0
002     5000      10:30    上海      1
003     2000      11:00    广州      0
004     8000      11:30    深圳      1
...`}</code>
                </pre>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">解决方案</h3>
                <pre className="overflow-x-auto text-gray-800">
                  <code>{`# 1. 数据预处理
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix

# 加载数据
df = pd.read_csv('credit_card_fraud.csv')

# 特征工程
X = df[['交易金额', '交易时间', '交易地点']]
y = df['是否欺诈']

# 数据标准化
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# 2. 模型训练与评估
X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.2, random_state=42
)

# 训练模型
model = LogisticRegression()
model.fit(X_train, y_train)

# 预测
y_pred = model.predict(X_test)

# 3. 评估结果
print("\\n分类报告：")
print(classification_report(y_test, y_pred))

print("\\n混淆矩阵：")
print(confusion_matrix(y_test, y_pred))

# 4. 分析结果
# - 由于欺诈检测中，漏报（FN）的成本很高，应该重点关注召回率
# - 如果精确率过低，可以考虑调整决策阈值
# - 使用F1分数作为综合评估指标`}</code>
                </pre>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">例题2：回归模型评估</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">问题描述</h3>
                <p className="text-gray-700">
                  评估一个房价预测模型的性能，并分析不同评估指标的意义。
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">数据集</h3>
                <pre className="overflow-x-auto text-gray-800">
                  <code>{`# 示例数据
房屋ID  面积  卧室数  卫生间数  距离地铁  价格
001     80    2      1        500      300
002     120   3      2        1000     450
003     150   4      2        2000     600
004     200   5      3        3000     800
...`}</code>
                </pre>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">解决方案</h3>
                <pre className="overflow-x-auto text-gray-800">
                  <code>{`# 1. 数据预处理
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
import matplotlib.pyplot as plt

# 加载数据
df = pd.read_csv('house_prices.csv')

# 特征工程
X = df[['面积', '卧室数', '卫生间数', '距离地铁']]
y = df['价格']

# 数据标准化
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# 2. 模型训练与评估
X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.2, random_state=42
)

# 训练模型
model = LinearRegression()
model.fit(X_train, y_train)

# 预测
y_pred = model.predict(X_test)

# 3. 计算评估指标
mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
r2 = r2_score(y_test, y_pred)

print(f"\\n均方误差 (MSE): {mse:.2f}")
print(f"均方根误差 (RMSE): {rmse:.2f}")
print(f"决定系数 (R²): {r2:.2f}")

# 4. 可视化分析
plt.figure(figsize=(10, 6))
plt.scatter(y_test, y_pred, alpha=0.5)
plt.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()], 'r--')
plt.xlabel('实际价格')
plt.ylabel('预测价格')
plt.title('房价预测结果对比')
plt.show()

# 5. 分析结果
# - RMSE表示预测误差的平均大小，单位与目标变量相同
# - R²表示模型解释的方差比例，越接近1越好
# - 通过散点图可以直观地看出预测值与实际值的偏差`}</code>
                </pre>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* 导航链接 */}
      <div className="flex justify-between mt-8">
        <Link 
          href="/study/ai/ml/unsupervised"
          className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 flex items-center"
        >
          <FaArrowLeft className="mr-2" />
          上一课：无监督学习算法
        </Link>
        <Link 
          href="/study/ai/ml/feature-engineering"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center"
        >
          下一课：特征工程
          <FaArrowRight className="ml-2" />
        </Link>
      </div>
    </div>
  );
} 
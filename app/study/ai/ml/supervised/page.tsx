'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaRobot, FaBrain, FaChartLine, FaCode, FaLightbulb } from 'react-icons/fa';
import { SiScikitlearn, SiPandas, SiNumpy } from 'react-icons/si';

export default function SupervisedLearningPage() {
  const [activeTab, setActiveTab] = useState('theory');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">监督学习算法</h1>
      
      {/* 进度条 */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '30%' }}></div>
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
            <h2 className="text-2xl font-semibold mb-4">监督学习概述</h2>
            <p className="text-gray-700 mb-4">
              监督学习是机器学习中最常用的方法之一，它通过已标记的训练数据学习输入到输出的映射关系。主要包括分类和回归两大类问题。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">分类问题</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>目标：预测离散类别</li>
                  <li>应用：垃圾邮件检测、图像分类</li>
                  <li>评估：准确率、精确率、召回率</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">回归问题</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>目标：预测连续值</li>
                  <li>应用：房价预测、销量预测</li>
                  <li>评估：MSE、RMSE、R²</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">常用算法详解</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full mt-1">
                  <FaChartLine className="text-blue-500 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold">1. 线性回归</h3>
                  <p className="text-gray-700">通过线性方程拟合数据，预测连续值</p>
                  <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                    <li>原理：最小化均方误差</li>
                    <li>优点：简单直观、计算效率高</li>
                    <li>缺点：只能处理线性关系</li>
                    <li>应用：房价预测、销量预测</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-full mt-1">
                  <FaBrain className="text-green-500 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold">2. 逻辑回归</h3>
                  <p className="text-gray-700">用于二分类问题，输出概率值</p>
                  <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                    <li>原理：Sigmoid函数映射概率</li>
                    <li>优点：可解释性强、训练速度快</li>
                    <li>缺点：只能处理线性可分问题</li>
                    <li>应用：信用评分、疾病诊断</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-full mt-1">
                  <FaRobot className="text-purple-500 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold">3. 决策树</h3>
                  <p className="text-gray-700">通过树形结构进行决策</p>
                  <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                    <li>原理：信息增益/基尼系数</li>
                    <li>优点：可解释性强、处理非线性关系</li>
                    <li>缺点：容易过拟合</li>
                    <li>应用：客户分类、风险评估</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-yellow-100 p-3 rounded-full mt-1">
                  <FaLightbulb className="text-yellow-500 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold">4. 支持向量机</h3>
                  <p className="text-gray-700">寻找最优分类边界</p>
                  <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                    <li>原理：最大化分类间隔</li>
                    <li>优点：泛化能力强、处理高维数据</li>
                    <li>缺点：计算复杂度高</li>
                    <li>应用：文本分类、图像识别</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : activeTab === 'practice' ? (
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">算法实现示例</h2>
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
              <pre className="overflow-x-auto text-gray-800">
                <code>{`import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, mean_squared_error

# 1. 线性回归示例
def linear_regression_example():
    # 生成示例数据
    X = np.random.rand(100, 2)  # 特征
    y = 2 * X[:, 0] + 3 * X[:, 1] + np.random.randn(100)  # 目标值
    
    # 数据分割
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
    
    # 模型训练
    model = LinearRegression()
    model.fit(X_train, y_train)
    
    # 预测和评估
    y_pred = model.predict(X_test)
    mse = mean_squared_error(y_test, y_pred)
    print(f"线性回归 MSE: {mse:.4f}")
    print(f"系数: {model.coef_}")

# 2. 逻辑回归示例
def logistic_regression_example():
    # 生成二分类数据
    X = np.random.randn(100, 2)
    y = (X[:, 0] + X[:, 1] > 0).astype(int)
    
    # 数据分割
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
    
    # 模型训练
    model = LogisticRegression()
    model.fit(X_train, y_train)
    
    # 预测和评估
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"逻辑回归准确率: {accuracy:.4f}")

# 3. 决策树示例
def decision_tree_example():
    # 生成多分类数据
    X = np.random.randn(100, 2)
    y = np.zeros(100)
    y[X[:, 0] > 0] = 1
    y[X[:, 1] > 0] = 2
    
    # 数据分割
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
    
    # 模型训练
    model = DecisionTreeClassifier(max_depth=3)
    model.fit(X_train, y_train)
    
    # 预测和评估
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"决策树准确率: {accuracy:.4f}")

# 4. SVM示例
def svm_example():
    # 生成非线性分类数据
    X = np.random.randn(100, 2)
    y = (X[:, 0]**2 + X[:, 1]**2 > 1).astype(int)
    
    # 数据分割
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
    
    # 特征标准化
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # 模型训练
    model = SVC(kernel='rbf')
    model.fit(X_train_scaled, y_train)
    
    # 预测和评估
    y_pred = model.predict(X_test_scaled)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"SVM准确率: {accuracy:.4f}")

# 运行所有示例
if __name__ == "__main__":
    print("运行监督学习算法示例...")
    linear_regression_example()
    logistic_regression_example()
    decision_tree_example()
    svm_example()`}</code>
              </pre>
            </div>
          </section>
        </div>
      ) : (
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">例题1：房价预测</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">问题描述</h3>
                <p className="text-gray-700">
                  给定房屋的特征数据（面积、卧室数、位置等），预测房屋价格。这是一个典型的回归问题。
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">数据集</h3>
                <pre className="overflow-x-auto text-gray-800">
                  <code>{`# 示例数据
面积(平方米)  卧室数  位置评分  价格(万元)
120          3      8.5     280
150          4      9.0     350
80           2      7.5     180
200          5      9.5     450
...`}</code>
                </pre>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">解决方案</h3>
                <pre className="overflow-x-auto text-gray-800">
                  <code>{`# 1. 数据预处理
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

# 加载数据
df = pd.read_csv('house_prices.csv')

# 特征标准化
scaler = StandardScaler()
X = scaler.fit_transform(df[['面积', '卧室数', '位置评分']])
y = df['价格']

# 2. 模型训练
from sklearn.linear_model import LinearRegression
model = LinearRegression()
model.fit(X, y)

# 3. 预测新数据
new_house = scaler.transform([[130, 3, 8.8]])
predicted_price = model.predict(new_house)
print(f"预测价格: {predicted_price[0]:.2f}万元")`}</code>
                </pre>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">例题2：信用评分</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">问题描述</h3>
                <p className="text-gray-700">
                  根据用户的个人信息和信用历史，预测用户是否会违约。这是一个二分类问题。
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">数据集</h3>
                <pre className="overflow-x-auto text-gray-800">
                  <code>{`# 示例数据
年龄  收入(万)  信用历史(年)  违约记录  是否违约
35   15       5           0       0
28   8        2           1       1
45   25       10          0       0
32   12       3           2       1
...`}</code>
                </pre>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">解决方案</h3>
                <pre className="overflow-x-auto text-gray-800">
                  <code>{`# 1. 数据预处理
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

# 加载数据
df = pd.read_csv('credit_scores.csv')

# 特征标准化
scaler = StandardScaler()
X = scaler.fit_transform(df[['年龄', '收入', '信用历史', '违约记录']])
y = df['是否违约']

# 2. 模型训练
from sklearn.ensemble import RandomForestClassifier
model = RandomForestClassifier(n_estimators=100)
model.fit(X, y)

# 3. 预测新用户
new_user = scaler.transform([[30, 12, 4, 1]])
predicted_default = model.predict(new_user)
print(f"预测结果: {'可能违约' if predicted_default[0] == 1 else '不会违约'}")`}</code>
                </pre>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* 导航链接 */}
      <div className="flex justify-between mt-8">
        <Link
          href="/study/ai/ml/workflow"
          className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
        >
          上一课：机器学习项目流程
        </Link>
        <Link
          href="/study/ai/ml/unsupervised"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          下一课：无监督学习算法
        </Link>
      </div>
    </div>
  );
} 
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaPython, FaDatabase, FaChartLine, FaCode, FaRobot, FaBrain, FaChartBar } from 'react-icons/fa';
import { SiScikitlearn, SiPandas, SiNumpy, SiJupyter } from 'react-icons/si';

export default function MLBasicPage() {
  const [activeTab, setActiveTab] = useState('theory');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">机器学习基础</h1>
      
      {/* 进度条 */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '10%' }}></div>
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
            <h2 className="text-2xl font-semibold mb-4">什么是机器学习？</h2>
            <p className="text-gray-700 mb-4">
              机器学习是人工智能的一个分支，它使计算机系统能够从数据中学习和改进，而无需明确编程。通过算法和统计模型，机器可以从经验中学习，并随着数据的增加而不断改进。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">主要类型</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>监督学习：通过标记数据学习输入到输出的映射关系</li>
                  <li>无监督学习：从未标记数据中发现隐藏的模式和结构</li>
                  <li>强化学习：通过与环境交互学习最优策略</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">应用场景</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>图像识别：人脸识别、物体检测</li>
                  <li>自然语言处理：机器翻译、情感分析</li>
                  <li>推荐系统：个性化推荐、内容分发</li>
                  <li>预测分析：股票预测、天气预测</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">机器学习工作流程</h2>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <FaDatabase className="text-blue-500 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold">1. 数据收集与预处理</h3>
                  <p className="text-gray-700">收集数据、清洗数据、特征工程、数据标准化</p>
                  <ul className="list-disc list-inside text-gray-600 mt-2">
                    <li>数据清洗：处理缺失值、异常值</li>
                    <li>特征工程：特征选择、特征转换</li>
                    <li>数据标准化：归一化、标准化</li>
                  </ul>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <FaChartLine className="text-green-500 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold">2. 模型选择与训练</h3>
                  <p className="text-gray-700">选择合适的算法、训练模型、参数调优</p>
                  <ul className="list-disc list-inside text-gray-600 mt-2">
                    <li>算法选择：根据问题类型选择合适的算法</li>
                    <li>模型训练：使用训练数据训练模型</li>
                    <li>参数调优：使用交叉验证优化模型参数</li>
                  </ul>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <FaCode className="text-purple-500 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold">3. 模型评估与优化</h3>
                  <p className="text-gray-700">评估模型性能、优化模型、部署应用</p>
                  <ul className="list-disc list-inside text-gray-600 mt-2">
                    <li>性能评估：准确率、精确率、召回率等指标</li>
                    <li>模型优化：过拟合处理、欠拟合处理</li>
                    <li>模型部署：模型保存、API接口开发</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">机器学习工具与框架</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <SiNumpy className="text-blue-500 text-xl" />
                  <h3 className="font-semibold">NumPy</h3>
                </div>
                <p className="text-gray-700">科学计算基础库，提供多维数组和矩阵运算</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <SiPandas className="text-green-500 text-xl" />
                  <h3 className="font-semibold">Pandas</h3>
                </div>
                <p className="text-gray-700">数据分析库，提供数据结构和数据分析工具</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <SiScikitlearn className="text-orange-500 text-xl" />
                  <h3 className="font-semibold">Scikit-learn</h3>
                </div>
                <p className="text-gray-700">机器学习算法库，提供各种机器学习算法实现</p>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">环境配置</h2>
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
              <pre className="overflow-x-auto text-gray-800">
                <code>{`# 创建虚拟环境
python -m venv ml_env

# 激活虚拟环境
# Windows
ml_env\\Scripts\\activate
# Linux/Mac
source ml_env/bin/activate

# 安装必要的包
pip install numpy pandas scikit-learn matplotlib jupyter`}</code>
              </pre>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">第一个机器学习程序</h2>
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
              <pre className="overflow-x-auto text-gray-800">
                <code>{`import numpy as np
import pandas as pd
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

# 加载数据
iris = load_iris()
X = iris.data
y = iris.target

# 划分训练集和测试集
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 创建并训练模型
model = LogisticRegression()
model.fit(X_train, y_train)

# 预测并评估
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"模型准确率: {accuracy:.2f}")`}</code>
              </pre>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">数据可视化示例</h2>
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
              <pre className="overflow-x-auto text-gray-800">
                <code>{`import matplotlib.pyplot as plt
import seaborn as sns

# 创建数据
data = pd.DataFrame(iris.data, columns=iris.feature_names)
data['target'] = iris.target

# 绘制散点图
plt.figure(figsize=(10, 6))
sns.scatterplot(
    data=data,
    x='sepal length (cm)',
    y='sepal width (cm)',
    hue='target'
)
plt.title('鸢尾花数据集散点图')
plt.show()`}</code>
              </pre>
            </div>
          </section>
        </div>
      )}

      {/* 导航链接 */}
      <div className="flex justify-end mt-8">
        <Link
          href="/study/ai/ml/workflow"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          下一课：机器学习项目流程
        </Link>
      </div>
    </div>
  );
} 
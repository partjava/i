'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaRobot, FaBrain, FaChartLine, FaCode, FaLightbulb, FaNetworkWired, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { SiScikitlearn, SiPandas, SiNumpy } from 'react-icons/si';

export default function EnsembleLearningPage() {
  const [activeTab, setActiveTab] = useState('theory');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">集成学习</h1>
      
      {/* 进度条 */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
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
            <h2 className="text-2xl font-semibold mb-4">什么是集成学习？</h2>
            <p className="text-gray-700 mb-4">
              集成学习就像是"三个臭皮匠，顶个诸葛亮"。通过组合多个简单的模型，我们可以得到比单个模型更好的预测结果。
            </p>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-blue-800 mb-2">举个生活例子：</h3>
              <p className="text-blue-700">
                想象你在参加一个知识竞赛。如果只有你一个人答题，可能会因为知识盲点而答错。但如果是一个团队一起答题，每个人负责自己擅长的领域，最后综合大家的答案，正确率就会大大提高。集成学习就是这样的原理。
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Bagging（装袋）</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>多个模型并行训练</li>
                  <li>每个模型使用不同的数据子集</li>
                  <li>最终投票或平均得到结果</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Boosting（提升）</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>多个模型串行训练</li>
                  <li>后面的模型关注前面模型的错误</li>
                  <li>逐步提升整体性能</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Stacking（堆叠）</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>组合不同类型的模型</li>
                  <li>使用一个模型学习如何组合</li>
                  <li>发挥各个模型的优势</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">常见的集成学习方法</h2>
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full mt-1">
                  <FaChartLine className="text-blue-500 text-xl" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">1. 随机森林（Random Forest）</h3>
                  <div className="bg-gray-50 p-4 rounded-lg mt-2">
                    <h4 className="font-medium mb-2">实际例子：信用评分</h4>
                    <p className="text-gray-700 mb-2">
                      使用多个决策树，每棵树关注不同的特征组合，最终综合所有树的预测结果。
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>优点：不容易过拟合，可以处理高维数据</li>
                      <li>缺点：模型可能比较大，训练时间较长</li>
                      <li>适用场景：分类和回归问题</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-full mt-1">
                  <FaBrain className="text-green-500 text-xl" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">2. XGBoost</h3>
                  <div className="bg-gray-50 p-4 rounded-lg mt-2">
                    <h4 className="font-medium mb-2">实际例子：房价预测</h4>
                    <p className="text-gray-700 mb-2">
                      通过梯度提升的方式，逐步构建决策树，每棵树都试图修正前面树的错误。
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>优点：预测准确度高，训练速度快</li>
                      <li>缺点：需要仔细调参，可能过拟合</li>
                      <li>适用场景：结构化数据，竞赛常用</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-full mt-1">
                  <FaNetworkWired className="text-purple-500 text-xl" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">3. LightGBM</h3>
                  <div className="bg-gray-50 p-4 rounded-lg mt-2">
                    <h4 className="font-medium mb-2">实际例子：用户行为预测</h4>
                    <p className="text-gray-700 mb-2">
                      使用基于直方图的算法，更高效地构建决策树，适合大规模数据。
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>优点：训练速度快，内存占用小</li>
                      <li>缺点：对参数敏感，需要调优</li>
                      <li>适用场景：大规模数据集</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : activeTab === 'practice' ? (
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">集成学习代码示例</h2>
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
              <pre className="overflow-x-auto text-gray-800">
                <code>{`import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import xgboost as xgb
import lightgbm as lgb

# 1. 准备数据
# 假设我们有一个信用评分数据集
data = {
    '年龄': [25, 35, 45, 55, 65],
    '收入': [5000, 8000, 12000, 15000, 20000],
    '工作年限': [2, 5, 10, 15, 20],
    '信用评分': [1, 1, 0, 0, 1]  # 1表示良好，0表示不良
}
df = pd.DataFrame(data)

# 2. 划分特征和目标变量
X = df[['年龄', '收入', '工作年限']]
y = df['信用评分']

# 3. 划分训练集和测试集
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 4. 随机森林模型
rf_model = RandomForestClassifier(
    n_estimators=100,  # 树的数量
    max_depth=5,       # 树的深度
    random_state=42
)
rf_model.fit(X_train, y_train)
rf_pred = rf_model.predict(X_test)
print("随机森林准确率:", accuracy_score(y_test, rf_pred))

# 5. XGBoost模型
xgb_model = xgb.XGBClassifier(
    n_estimators=100,
    max_depth=5,
    learning_rate=0.1,
    random_state=42
)
xgb_model.fit(X_train, y_train)
xgb_pred = xgb_model.predict(X_test)
print("XGBoost准确率:", accuracy_score(y_test, xgb_pred))

# 6. LightGBM模型
lgb_model = lgb.LGBMClassifier(
    n_estimators=100,
    max_depth=5,
    learning_rate=0.1,
    random_state=42
)
lgb_model.fit(X_train, y_train)
lgb_pred = lgb_model.predict(X_test)
print("LightGBM准确率:", accuracy_score(y_test, lgb_pred))

# 7. 模型集成（投票）
def ensemble_predict(models, X):
    predictions = []
    for model in models:
        pred = model.predict(X)
        predictions.append(pred)
    # 多数投票
    return np.apply_along_axis(
        lambda x: np.argmax(np.bincount(x)),
        axis=0,
        arr=np.array(predictions)
    )

# 集成预测
models = [rf_model, xgb_model, lgb_model]
ensemble_pred = ensemble_predict(models, X_test)
print("集成模型准确率:", accuracy_score(y_test, ensemble_pred))

# 8. 输出详细评估报告
print("\\n集成模型评估报告：")
print(classification_report(y_test, ensemble_pred))`}</code>
              </pre>
            </div>
          </section>
        </div>
      ) : (
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">例题1：信用评分预测</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">问题描述</h3>
                <p className="text-gray-700">
                  使用集成学习方法预测用户的信用评分，判断用户是否具有良好的信用记录。
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">数据集</h3>
                <pre className="overflow-x-auto text-gray-800">
                  <code>{`# 信用评分数据示例
用户ID  年龄  月收入  工作年限  信用卡数  贷款次数  信用评分
001     25    5000    2        1        0        1
002     35    8000    5        2        1        1
003     45    12000   10       3        2        0
...`}</code>
                </pre>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">解决方案</h3>
                <pre className="overflow-x-auto text-gray-800">
                  <code>{`# 1. 导入必要的库
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import accuracy_score, classification_report
import xgboost as xgb
import lightgbm as lgb

# 2. 加载数据
df = pd.read_csv('credit_score.csv')

# 3. 特征工程
X = df[['年龄', '月收入', '工作年限', '信用卡数', '贷款次数']]
y = df['信用评分']

# 4. 划分训练集和测试集
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 5. 训练多个模型
# 随机森林
rf_model = RandomForestClassifier(
    n_estimators=100,
    max_depth=5,
    random_state=42
)
rf_model.fit(X_train, y_train)

# XGBoost
xgb_model = xgb.XGBClassifier(
    n_estimators=100,
    max_depth=5,
    learning_rate=0.1,
    random_state=42
)
xgb_model.fit(X_train, y_train)

# LightGBM
lgb_model = lgb.LGBMClassifier(
    n_estimators=100,
    max_depth=5,
    learning_rate=0.1,
    random_state=42
)
lgb_model.fit(X_train, y_train)

# 6. 模型评估
models = {
    '随机森林': rf_model,
    'XGBoost': xgb_model,
    'LightGBM': lgb_model
}

for name, model in models.items():
    pred = model.predict(X_test)
    print(f"\\n{name}模型评估：")
    print(classification_report(y_test, pred))

# 7. 集成预测
def ensemble_predict(models, X):
    predictions = []
    for model in models.values():
        pred = model.predict(X)
        predictions.append(pred)
    return np.apply_along_axis(
        lambda x: np.argmax(np.bincount(x)),
        axis=0,
        arr=np.array(predictions)
    )

# 8. 输出集成结果
ensemble_pred = ensemble_predict(models, X_test)
print("\\n集成模型评估：")
print(classification_report(y_test, ensemble_pred))`}</code>
                </pre>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">例题2：房价预测集成</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">问题描述</h3>
                <p className="text-gray-700">
                  使用集成学习方法预测房屋价格，比较不同集成方法的性能。
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">数据集</h3>
                <pre className="overflow-x-auto text-gray-800">
                  <code>{`# 房价数据示例
房屋ID  面积  卧室数  卫生间数  建造年份  所在区域  距离地铁  价格
001     80    2      1        1990     海淀区    500      300
002     120   3      2        2000     朝阳区    1000     450
003     150   4      2        2010     西城区    2000     600
...`}</code>
                </pre>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">解决方案</h3>
                <pre className="overflow-x-auto text-gray-800">
                  <code>{`# 1. 导入必要的库
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import mean_squared_error, r2_score
import xgboost as xgb
import lightgbm as lgb

# 2. 加载数据
df = pd.read_csv('house_prices.csv')

# 3. 特征工程
X = df[['面积', '卧室数', '卫生间数', '建造年份', '距离地铁']]
y = df['价格']

# 4. 划分训练集和测试集
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 5. 训练多个模型
# 随机森林
rf_model = RandomForestRegressor(
    n_estimators=100,
    max_depth=5,
    random_state=42
)
rf_model.fit(X_train, y_train)

# XGBoost
xgb_model = xgb.XGBRegressor(
    n_estimators=100,
    max_depth=5,
    learning_rate=0.1,
    random_state=42
)
xgb_model.fit(X_train, y_train)

# LightGBM
lgb_model = lgb.LGBMRegressor(
    n_estimators=100,
    max_depth=5,
    learning_rate=0.1,
    random_state=42
)
lgb_model.fit(X_train, y_train)

# 6. 模型评估
models = {
    '随机森林': rf_model,
    'XGBoost': xgb_model,
    'LightGBM': lgb_model
}

for name, model in models.items():
    pred = model.predict(X_test)
    mse = mean_squared_error(y_test, pred)
    r2 = r2_score(y_test, pred)
    print(f"\\n{name}模型评估：")
    print(f"均方误差 (MSE): {mse:.2f}")
    print(f"决定系数 (R²): {r2:.2f}")

# 7. 集成预测（加权平均）
def ensemble_predict(models, X, weights=None):
    if weights is None:
        weights = [1/len(models)] * len(models)
    
    predictions = []
    for model, weight in zip(models.values(), weights):
        pred = model.predict(X)
        predictions.append(pred * weight)
    
    return np.sum(predictions, axis=0)

# 8. 输出集成结果
ensemble_pred = ensemble_predict(models, X_test)
mse = mean_squared_error(y_test, ensemble_pred)
r2 = r2_score(y_test, ensemble_pred)
print("\\n集成模型评估：")
print(f"均方误差 (MSE): {mse:.2f}")
print(f"决定系数 (R²): {r2:.2f}")`}</code>
                </pre>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* 导航链接 */}
      <div className="flex justify-between mt-8">
        <Link 
          href="/study/ai/ml/feature-engineering"
          className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 flex items-center"
        >
          <FaArrowLeft className="mr-2" />
          上一课：特征工程
        </Link>
        <Link 
          href="/study/ai/ml/cases"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center"
        >
          下一课：机器学习实战案例
          <FaArrowRight className="ml-2" />
        </Link>
      </div>
    </div>
  );
} 
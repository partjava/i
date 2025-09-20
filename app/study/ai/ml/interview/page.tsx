'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaRobot, FaBrain, FaChartLine, FaCode, FaLightbulb, FaNetworkWired, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { SiScikitlearn, SiPandas, SiNumpy } from 'react-icons/si';

export default function MLInterviewPage() {
  const [activeTab, setActiveTab] = useState('theory');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">机器学习面试题</h1>
      
      {/* 进度条 */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '95%' }}></div>
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
            <h2 className="text-2xl font-semibold mb-4">机器学习基础</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">1. 监督学习vs无监督学习</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">问题：</h4>
                  <p className="text-gray-700 mb-4">
                    请解释监督学习和无监督学习的主要区别，并各举两个实际应用场景。
                  </p>
                  <h4 className="font-semibold mb-2">参考答案：</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>监督学习：使用标记数据进行训练，目标是学习输入到输出的映射关系
                      <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                        <li>应用场景：图像分类、垃圾邮件检测</li>
                      </ul>
                    </li>
                    <li>无监督学习：使用未标记数据，目标是发现数据中的模式和结构
                      <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                        <li>应用场景：客户分群、异常检测</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">2. 过拟合与欠拟合</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">问题：</h4>
                  <p className="text-gray-700 mb-4">
                    什么是过拟合和欠拟合？如何识别和解决这些问题？
                  </p>
                  <h4 className="font-semibold mb-2">参考答案：</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>过拟合：模型在训练集上表现很好，但在测试集上表现差
                      <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                        <li>解决方法：正则化、交叉验证、早停</li>
                      </ul>
                    </li>
                    <li>欠拟合：模型在训练集和测试集上表现都不好
                      <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                        <li>解决方法：增加模型复杂度、特征工程</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">算法与模型</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">3. 决策树与随机森林</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">问题：</h4>
                  <p className="text-gray-700 mb-4">
                    解释决策树和随机森林的工作原理，以及它们的优缺点。
                  </p>
                  <h4 className="font-semibold mb-2">参考答案：</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>决策树：
                      <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                        <li>优点：易于理解和解释、可处理非线性关系</li>
                        <li>缺点：容易过拟合、对数据敏感</li>
                      </ul>
                    </li>
                    <li>随机森林：
                      <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                        <li>优点：抗过拟合、稳定性好、可处理高维数据</li>
                        <li>缺点：计算成本高、模型解释性较差</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : null}

      {activeTab === 'practice' ? (
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">代码实现</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">1. 实现K-means聚类</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">要求：</h4>
                  <p className="text-gray-700 mb-4">
                    不使用sklearn，手动实现K-means聚类算法。
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm text-gray-800">
{`import numpy as np

def kmeans(X, k, max_iters=100):
    # 随机初始化聚类中心
    centroids = X[np.random.choice(X.shape[0], k, replace=False)]
    
    for _ in range(max_iters):
        # 计算每个样本到聚类中心的距离
        distances = np.sqrt(((X - centroids[:, np.newaxis])**2).sum(axis=2))
        
        # 分配样本到最近的聚类中心
        labels = np.argmin(distances, axis=0)
        
        # 更新聚类中心
        new_centroids = np.array([X[labels == i].mean(axis=0) for i in range(k)])
        
        # 如果聚类中心不再变化，则停止迭代
        if np.all(centroids == new_centroids):
            break
            
        centroids = new_centroids
    
    return labels, centroids`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">2. 实现交叉验证</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">要求：</h4>
                  <p className="text-gray-700 mb-4">
                    实现K折交叉验证，不使用sklearn。
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm text-gray-800">
{`def k_fold_cross_validation(X, y, k, model):
    n_samples = len(X)
    fold_size = n_samples // k
    scores = []
    
    for i in range(k):
        # 划分训练集和验证集
        val_start = i * fold_size
        val_end = (i + 1) * fold_size
        
        X_val = X[val_start:val_end]
        y_val = y[val_start:val_end]
        
        X_train = np.concatenate([X[:val_start], X[val_end:]])
        y_train = np.concatenate([y[:val_start], y[val_end:]])
        
        # 训练模型
        model.fit(X_train, y_train)
        
        # 评估模型
        score = model.score(X_val, y_val)
        scores.append(score)
    
    return np.mean(scores), np.std(scores)`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : null}

      {activeTab === 'exercise' ? (
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">实战练习</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">题目一：特征工程</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">要求：</h4>
                  <p className="text-gray-700 mb-4">
                    实现一个特征工程类，完成以下任务：
                  </p>
                  <ul className="list-decimal list-inside text-gray-700 space-y-2">
                    <li>处理缺失值</li>
                    <li>特征编码</li>
                    <li>特征选择</li>
                    <li>特征缩放</li>
                    <li>特征交互</li>
                  </ul>
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">参考答案：</h4>
                    <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-sm text-gray-800">
{`import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.feature_selection import SelectKBest, f_classif
from sklearn.impute import SimpleImputer
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

class FeatureEngineering:
    def __init__(self, categorical_features, numerical_features):
        self.categorical_features = categorical_features
        self.numerical_features = numerical_features
        self.preprocessor = None
        
    def fit_transform(self, X):
        """训练并转换数据"""
        # 创建预处理管道
        numeric_transformer = Pipeline(steps=[
            ('imputer', SimpleImputer(strategy='median')),
            ('scaler', StandardScaler())
        ])
        
        categorical_transformer = Pipeline(steps=[
            ('imputer', SimpleImputer(strategy='most_frequent')),
            ('onehot', OneHotEncoder(handle_unknown='ignore'))
        ])
        
        # 组合转换器
        self.preprocessor = ColumnTransformer(
            transformers=[
                ('num', numeric_transformer, self.numerical_features),
                ('cat', categorical_transformer, self.categorical_features)
            ])
            
        # 训练并转换数据
        X_processed = self.preprocessor.fit_transform(X)
        return X_processed
        
    def transform(self, X):
        """转换新数据"""
        if self.preprocessor is None:
            raise ValueError("必须先调用fit_transform方法")
        return self.preprocessor.transform(X)
        
    def select_features(self, X, y, k=10):
        """特征选择"""
        selector = SelectKBest(score_func=f_classif, k=k)
        X_selected = selector.fit_transform(X, y)
        
        # 获取选中的特征名称
        selected_features = selector.get_support()
        feature_names = (self.numerical_features + 
                        self.preprocessor.named_transformers_['cat']
                        .named_steps['onehot'].get_feature_names_out(self.categorical_features))
        selected_feature_names = feature_names[selected_features]
        
        return X_selected, selected_feature_names
        
    def create_interaction_features(self, X, feature_pairs):
        """创建特征交互"""
        X_interaction = X.copy()
        
        for f1, f2 in feature_pairs:
            interaction_name = f"{f1}_{f2}_interaction"
            X_interaction[interaction_name] = X[f1] * X[f2]
            
        return X_interaction

# 使用示例
def main():
    # 创建示例数据
    data = {
        'age': [25, 30, np.nan, 35, 40],
        'income': [50000, 60000, 70000, np.nan, 90000],
        'education': ['Bachelor', 'Master', 'PhD', 'Bachelor', 'Master'],
        'experience': [2, 5, 8, 3, 10]
    }
    df = pd.DataFrame(data)
    
    # 定义特征类型
    categorical_features = ['education']
    numerical_features = ['age', 'income', 'experience']
    
    # 创建特征工程对象
    fe = FeatureEngineering(categorical_features, numerical_features)
    
    # 处理数据
    X_processed = fe.fit_transform(df)
    
    # 特征选择
    y = np.array([0, 1, 1, 0, 1])  # 示例标签
    X_selected, selected_features = fe.select_features(X_processed, y, k=5)
    
    # 创建特征交互
    interaction_pairs = [('age', 'experience'), ('income', 'experience')]
    X_with_interactions = fe.create_interaction_features(df, interaction_pairs)
    
    print("处理后的特征数量:", X_processed.shape[1])
    print("选中的特征:", selected_features)
    print("交互特征:", X_with_interactions.columns.tolist())`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">题目二：模型调优</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">要求：</h4>
                  <p className="text-gray-700 mb-4">
                    实现一个模型调优类，完成以下任务：
                  </p>
                  <ul className="list-decimal list-inside text-gray-700 space-y-2">
                    <li>超参数搜索</li>
                    <li>交叉验证</li>
                    <li>学习曲线分析</li>
                    <li>特征重要性分析</li>
                    <li>模型集成</li>
                  </ul>
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">参考答案：</h4>
                    <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-sm text-gray-800">
{`import numpy as np
from sklearn.model_selection import GridSearchCV, learning_curve
from sklearn.ensemble import RandomForestClassifier, VotingClassifier
from sklearn.metrics import accuracy_score
import matplotlib.pyplot as plt
import pandas as pd

class ModelTuner:
    def __init__(self, base_model, param_grid):
        self.base_model = base_model
        self.param_grid = param_grid
        self.best_model = None
        self.best_params = None
        
    def grid_search(self, X, y, cv=5):
        """网格搜索最优参数"""
        grid_search = GridSearchCV(
            self.base_model,
            self.param_grid,
            cv=cv,
            scoring='accuracy',
            n_jobs=-1
        )
        grid_search.fit(X, y)
        
        self.best_model = grid_search.best_estimator_
        self.best_params = grid_search.best_params_
        
        return self.best_model, self.best_params
        
    def plot_learning_curve(self, X, y, title="学习曲线"):
        """绘制学习曲线"""
        train_sizes, train_scores, test_scores = learning_curve(
            self.best_model,
            X,
            y,
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
        plt.plot(train_sizes, test_mean, label='验证集得分')
        plt.fill_between(train_sizes, train_mean - train_std, train_mean + train_std, alpha=0.1)
        plt.fill_between(train_sizes, test_mean - test_std, test_mean + test_std, alpha=0.1)
        plt.xlabel('训练样本数')
        plt.ylabel('得分')
        plt.title(title)
        plt.legend(loc='best')
        plt.grid(True)
        plt.show()
        
    def analyze_feature_importance(self, feature_names):
        """分析特征重要性"""
        if not hasattr(self.best_model, 'feature_importances_'):
            raise ValueError("模型不支持特征重要性分析")
            
        importance = self.best_model.feature_importances_
        indices = np.argsort(importance)[::-1]
        
        plt.figure(figsize=(10, 6))
        plt.title('特征重要性')
        plt.bar(range(len(importance)), importance[indices])
        plt.xticks(range(len(importance)), [feature_names[i] for i in indices], rotation=45)
        plt.tight_layout()
        plt.show()
        
        return pd.DataFrame({
            'feature': feature_names,
            'importance': importance
        }).sort_values('importance', ascending=False)
        
    def create_ensemble(self, models, X, y):
        """创建集成模型"""
        estimators = [(f'model_{i}', model) for i, model in enumerate(models)]
        ensemble = VotingClassifier(estimators=estimators, voting='soft')
        ensemble.fit(X, y)
        
        return ensemble

# 使用示例
def main():
    # 创建示例数据
    X = np.random.randn(100, 5)
    y = np.random.randint(0, 2, 100)
    feature_names = ['feature1', 'feature2', 'feature3', 'feature4', 'feature5']
    
    # 定义参数网格
    param_grid = {
        'n_estimators': [100, 200, 300],
        'max_depth': [None, 10, 20, 30],
        'min_samples_split': [2, 5, 10]
    }
    
    # 创建模型调优器
    tuner = ModelTuner(RandomForestClassifier(), param_grid)
    
    # 网格搜索
    best_model, best_params = tuner.grid_search(X, y)
    print("最优参数:", best_params)
    
    # 绘制学习曲线
    tuner.plot_learning_curve(X, y)
    
    # 分析特征重要性
    importance_df = tuner.analyze_feature_importance(feature_names)
    print("特征重要性:")
    print(importance_df)
    
    # 创建集成模型
    models = [
        RandomForestClassifier(n_estimators=100),
        RandomForestClassifier(n_estimators=200),
        RandomForestClassifier(n_estimators=300)
    ]
    ensemble = tuner.create_ensemble(models, X, y)
    
    # 评估集成模型
    y_pred = ensemble.predict(X)
    accuracy = accuracy_score(y, y_pred)
    print("集成模型准确率:", accuracy)`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : null}

      {/* 导航链接 */}
      <div className="flex justify-between mt-8">
        <Link 
          href="/study/ai/ml/deployment"
          className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 flex items-center"
        >
          <FaArrowLeft className="mr-2" />
          上一课：模型部署与优化
        </Link>
        <Link 
          href="/study/ai/ml/advanced"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center"
        >
          下一课：进阶与前沿
          <FaArrowRight className="ml-2" />
        </Link>
      </div>
    </div>
  );
} 
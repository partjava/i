'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ClassificationPage() {
  const [activeTab, setActiveTab] = useState('basic');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'basic', label: '基本概念' },
    { id: 'algorithms', label: '算法实现' },
    { id: 'applications', label: '实际应用' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">分类预测</h1>
      
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
              <h3 className="text-xl font-semibold mb-3">分类预测基本概念</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 基本定义</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      分类预测是一种监督学习方法，用于预测离散的类别标签。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 基本概念
1. 分类（Classification）
   - 预测离散类别
   - 二分类问题
   - 多分类问题

2. 评估指标
   - 准确率（Accuracy）
   - 精确率（Precision）
   - 召回率（Recall）
   - F1分数

3. 混淆矩阵
   - 真阳性（TP）
   - 假阳性（FP）
   - 真阴性（TN）
   - 假阴性（FN）

# 示例
数据集：
X = [
    [1, 2],
    [2, 1],
    [8, 9],
    [9, 8]
]
y = [0, 0, 1, 1]

预测结果：
y_pred = [0, 0, 1, 1]
准确率 = 1.0`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 分类算法</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      分类算法可以根据不同的特征进行分类。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 分类算法
1. 基于树
   - 决策树
   - 随机森林
   - 梯度提升树

2. 基于概率
   - 朴素贝叶斯
   - 逻辑回归
   - 最大熵模型

3. 基于距离
   - K近邻
   - SVM
   - 神经网络

# 特点比较
1. 决策树
   - 优点：可解释性强
   - 缺点：容易过拟合

2. 随机森林
   - 优点：抗过拟合
   - 缺点：计算复杂度高

3. SVM
   - 优点：泛化能力强
   - 缺点：对大规模数据慢`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 应用场景</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      分类预测在各个领域都有广泛的应用。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 应用场景
1. 金融风控
   - 信用评分
   - 欺诈检测
   - 风险评估

2. 医疗诊断
   - 疾病预测
   - 药物反应
   - 治疗方案

3. 图像识别
   - 目标检测
   - 人脸识别
   - 场景分类

4. 自然语言
   - 文本分类
   - 情感分析
   - 垃圾邮件检测

# 实际案例
1. 信用评分
   - 基于历史数据
   - 基于行为特征
   - 基于社交网络

2. 医疗诊断
   - 基于症状
   - 基于检查结果
   - 基于基因数据`}
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
              <h3 className="text-xl font-semibold mb-3">分类算法实现</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 决策树算法</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      决策树是一种基本的分类与回归方法。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 决策树算法实现
import numpy as np
from sklearn.tree import DecisionTreeClassifier
import matplotlib.pyplot as plt

class DecisionTree:
    def __init__(self, max_depth=None, min_samples_split=2):
        self.max_depth = max_depth
        self.min_samples_split = min_samples_split
        self.tree = None
    
    def fit(self, X, y):
        # 创建决策树分类器
        self.tree = DecisionTreeClassifier(
            max_depth=self.max_depth,
            min_samples_split=self.min_samples_split,
            random_state=42
        )
        
        # 训练模型
        self.tree.fit(X, y)
        
        return self
    
    def predict(self, X):
        return self.tree.predict(X)
    
    def predict_proba(self, X):
        return self.tree.predict_proba(X)
    
    def plot_tree(self):
        from sklearn.tree import plot_tree
        plt.figure(figsize=(20,10))
        plot_tree(self.tree, feature_names=None, class_names=None, filled=True)
        plt.show()
    
    def evaluate(self, X, y):
        from sklearn.metrics import accuracy_score, classification_report
        
        # 预测
        y_pred = self.predict(X)
        
        # 计算准确率
        accuracy = accuracy_score(y, y_pred)
        
        # 生成分类报告
        report = classification_report(y, y_pred)
        
        return accuracy, report

# 使用示例
X = np.random.randn(100, 2)
y = (X[:, 0] + X[:, 1] > 0).astype(int)

dt = DecisionTree(max_depth=3)
dt.fit(X, y)
dt.plot_tree()

accuracy, report = dt.evaluate(X, y)
print(f"准确率: {accuracy:.2f}")
print("\\n分类报告:")
print(report)`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 随机森林算法</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      随机森林是一种集成学习方法。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 随机森林算法实现
import numpy as np
from sklearn.ensemble import RandomForestClassifier
import matplotlib.pyplot as plt

class RandomForest:
    def __init__(self, n_estimators=100, max_depth=None):
        self.n_estimators = n_estimators
        self.max_depth = max_depth
        self.forest = None
    
    def fit(self, X, y):
        # 创建随机森林分类器
        self.forest = RandomForestClassifier(
            n_estimators=self.n_estimators,
            max_depth=self.max_depth,
            random_state=42
        )
        
        # 训练模型
        self.forest.fit(X, y)
        
        return self
    
    def predict(self, X):
        return self.forest.predict(X)
    
    def predict_proba(self, X):
        return self.forest.predict_proba(X)
    
    def plot_feature_importance(self, feature_names=None):
        # 获取特征重要性
        importances = self.forest.feature_importances_
        
        # 排序
        indices = np.argsort(importances)[::-1]
        
        # 绘制特征重要性
        plt.figure(figsize=(10, 6))
        plt.title('特征重要性')
        plt.bar(range(len(importances)), importances[indices])
        
        if feature_names is not None:
            plt.xticks(range(len(importances)), 
                      [feature_names[i] for i in indices], 
                      rotation=45)
        
        plt.tight_layout()
        plt.show()
    
    def evaluate(self, X, y):
        from sklearn.metrics import accuracy_score, classification_report
        
        # 预测
        y_pred = self.predict(X)
        
        # 计算准确率
        accuracy = accuracy_score(y, y_pred)
        
        # 生成分类报告
        report = classification_report(y, y_pred)
        
        return accuracy, report

# 使用示例
X = np.random.randn(100, 2)
y = (X[:, 0] + X[:, 1] > 0).astype(int)

rf = RandomForest(n_estimators=100, max_depth=3)
rf.fit(X, y)
rf.plot_feature_importance(['特征1', '特征2'])

accuracy, report = rf.evaluate(X, y)
print(f"准确率: {accuracy:.2f}")
print("\\n分类报告:")
print(report)`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. SVM算法</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      SVM是一种强大的分类算法。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# SVM算法实现
import numpy as np
from sklearn.svm import SVC
import matplotlib.pyplot as plt

class SVM:
    def __init__(self, kernel='rbf', C=1.0):
        self.kernel = kernel
        self.C = C
        self.svm = None
    
    def fit(self, X, y):
        # 创建SVM分类器
        self.svm = SVC(
            kernel=self.kernel,
            C=self.C,
            probability=True,
            random_state=42
        )
        
        # 训练模型
        self.svm.fit(X, y)
        
        return self
    
    def predict(self, X):
        return self.svm.predict(X)
    
    def predict_proba(self, X):
        return self.svm.predict_proba(X)
    
    def plot_decision_boundary(self, X, y):
        # 创建网格
        h = 0.02
        x_min, x_max = X[:, 0].min() - 1, X[:, 0].max() + 1
        y_min, y_max = X[:, 1].min() - 1, X[:, 1].max() + 1
        xx, yy = np.meshgrid(np.arange(x_min, x_max, h),
                            np.arange(y_min, y_max, h))
        
        # 预测网格点的类别
        Z = self.predict(np.c_[xx.ravel(), yy.ravel()])
        Z = Z.reshape(xx.shape)
        
        # 绘制决策边界
        plt.figure(figsize=(10, 6))
        plt.contourf(xx, yy, Z, alpha=0.4)
        plt.scatter(X[:, 0], X[:, 1], c=y, alpha=0.8)
        plt.title('SVM决策边界')
        plt.show()
    
    def evaluate(self, X, y):
        from sklearn.metrics import accuracy_score, classification_report
        
        # 预测
        y_pred = self.predict(X)
        
        # 计算准确率
        accuracy = accuracy_score(y, y_pred)
        
        # 生成分类报告
        report = classification_report(y, y_pred)
        
        return accuracy, report

# 使用示例
X = np.random.randn(100, 2)
y = (X[:, 0] + X[:, 1] > 0).astype(int)

svm = SVM(kernel='rbf', C=1.0)
svm.fit(X, y)
svm.plot_decision_boundary(X, y)

accuracy, report = svm.evaluate(X, y)
print(f"准确率: {accuracy:.2f}")
print("\\n分类报告:")
print(report)`}
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
                  <h4 className="font-semibold mb-2">1. 信用评分</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      分类预测在信用评分中有重要应用。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 信用评分应用
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
import matplotlib.pyplot as plt

# 加载数据
def load_credit_data(file_path):
    df = pd.read_csv(file_path)
    return df

# 数据预处理
def preprocess_credit_data(df):
    # 选择特征
    features = ['age', 'income', 'credit_history', 'debt_ratio']
    X = df[features].values
    y = df['default'].values
    
    # 标准化
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    return X_scaled, y, features

# 信用评分模型
def credit_scoring_model(X, y):
    # 划分训练集和测试集
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    
    # 训练随机森林模型
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    return model, X_test, y_test

# 评估模型
def evaluate_credit_model(model, X_test, y_test):
    from sklearn.metrics import accuracy_score, classification_report, roc_curve, auc
    
    # 预测
    y_pred = model.predict(X_test)
    y_pred_proba = model.predict_proba(X_test)[:, 1]
    
    # 计算准确率
    accuracy = accuracy_score(y_test, y_pred)
    
    # 生成分类报告
    report = classification_report(y_test, y_pred)
    
    # 计算ROC曲线
    fpr, tpr, _ = roc_curve(y_test, y_pred_proba)
    roc_auc = auc(fpr, tpr)
    
    return accuracy, report, fpr, tpr, roc_auc

# 可视化结果
def plot_credit_results(fpr, tpr, roc_auc):
    plt.figure(figsize=(10, 6))
    plt.plot(fpr, tpr, color='darkorange', lw=2,
             label=f'ROC曲线 (AUC = {roc_auc:.2f})')
    plt.plot([0, 1], [0, 1], color='navy', lw=2, linestyle='--')
    plt.xlim([0.0, 1.0])
    plt.ylim([0.0, 1.05])
    plt.xlabel('假阳性率')
    plt.ylabel('真阳性率')
    plt.title('信用评分模型ROC曲线')
    plt.legend(loc="lower right")
    plt.show()

# 应用示例
def credit_analysis(file_path):
    # 加载数据
    df = load_credit_data(file_path)
    
    # 数据预处理
    X, y, features = preprocess_credit_data(df)
    
    # 训练模型
    model, X_test, y_test = credit_scoring_model(X, y)
    
    # 评估模型
    accuracy, report, fpr, tpr, roc_auc = evaluate_credit_model(
        model, X_test, y_test
    )
    
    # 输出结果
    print(f"准确率: {accuracy:.2f}")
    print("\\n分类报告:")
    print(report)
    
    # 可视化结果
    plot_credit_results(fpr, tpr, roc_auc)
    
    # 分析特征重要性
    analyze_feature_importance(model, features)

# 分析特征重要性
def analyze_feature_importance(model, features):
    importances = model.feature_importances_
    indices = np.argsort(importances)[::-1]
    
    plt.figure(figsize=(10, 6))
    plt.title('特征重要性')
    plt.bar(range(len(importances)), importances[indices])
    plt.xticks(range(len(importances)), 
               [features[i] for i in indices], 
               rotation=45)
    plt.tight_layout()
    plt.show()`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 医疗诊断</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      分类预测在医疗诊断中有重要应用。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 医疗诊断应用
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
import matplotlib.pyplot as plt

# 加载数据
def load_medical_data(file_path):
    df = pd.read_csv(file_path)
    return df

# 数据预处理
def preprocess_medical_data(df):
    # 选择特征
    features = ['age', 'blood_pressure', 'cholesterol', 'glucose']
    X = df[features].values
    y = df['disease'].values
    
    # 标准化
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    return X_scaled, y, features

# 医疗诊断模型
def medical_diagnosis_model(X, y):
    # 划分训练集和测试集
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    
    # 训练SVM模型
    model = SVC(kernel='rbf', probability=True, random_state=42)
    model.fit(X_train, y_train)
    
    return model, X_test, y_test

# 评估模型
def evaluate_medical_model(model, X_test, y_test):
    from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
    import seaborn as sns
    
    # 预测
    y_pred = model.predict(X_test)
    
    # 计算准确率
    accuracy = accuracy_score(y_test, y_pred)
    
    # 生成分类报告
    report = classification_report(y_test, y_pred)
    
    # 计算混淆矩阵
    cm = confusion_matrix(y_test, y_pred)
    
    return accuracy, report, cm

# 可视化结果
def plot_medical_results(cm, class_names):
    plt.figure(figsize=(10, 8))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
                xticklabels=class_names,
                yticklabels=class_names)
    plt.title('医疗诊断混淆矩阵')
    plt.xlabel('预测类别')
    plt.ylabel('真实类别')
    plt.show()

# 应用示例
def medical_analysis(file_path):
    # 加载数据
    df = load_medical_data(file_path)
    
    # 数据预处理
    X, y, features = preprocess_medical_data(df)
    
    # 训练模型
    model, X_test, y_test = medical_diagnosis_model(X, y)
    
    # 评估模型
    accuracy, report, cm = evaluate_medical_model(model, X_test, y_test)
    
    # 输出结果
    print(f"准确率: {accuracy:.2f}")
    print("\\n分类报告:")
    print(report)
    
    # 可视化结果
    class_names = ['健康', '疾病']
    plot_medical_results(cm, class_names)
    
    # 分析诊断结果
    analyze_diagnosis_results(model, X_test, y_test, features)

# 分析诊断结果
def analyze_diagnosis_results(model, X_test, y_test, features):
    # 获取预测概率
    y_pred_proba = model.predict_proba(X_test)
    
    # 计算每个类别的平均概率
    class_probs = {}
    for i in range(len(np.unique(y_test))):
        mask = y_test == i
        class_probs[i] = np.mean(y_pred_proba[mask], axis=0)
    
    # 可视化概率分布
    plt.figure(figsize=(10, 6))
    for i, probs in class_probs.items():
        plt.bar(range(len(probs)), probs, 
                label=f'类别 {i}')
    plt.title('诊断概率分布')
    plt.xlabel('类别')
    plt.ylabel('平均概率')
    plt.legend()
    plt.show()`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 图像分类</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      分类预测在图像分类中有重要应用。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 图像分类应用
import numpy as np
import cv2
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
import matplotlib.pyplot as plt

# 加载图像
def load_images(image_paths, labels):
    images = []
    for path in image_paths:
        img = cv2.imread(path)
        img = cv2.resize(img, (64, 64))
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        images.append(img)
    return np.array(images)

# 特征提取
def extract_features(images):
    # 将图像展平为特征向量
    n_samples = len(images)
    features = images.reshape(n_samples, -1)
    
    # 标准化
    scaler = StandardScaler()
    features_scaled = scaler.fit_transform(features)
    
    return features_scaled

# 图像分类模型
def image_classification_model(X, y):
    # 划分训练集和测试集
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    
    # 训练随机森林模型
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    return model, X_test, y_test

# 评估模型
def evaluate_image_model(model, X_test, y_test):
    from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
    import seaborn as sns
    
    # 预测
    y_pred = model.predict(X_test)
    
    # 计算准确率
    accuracy = accuracy_score(y_test, y_pred)
    
    # 生成分类报告
    report = classification_report(y_test, y_pred)
    
    # 计算混淆矩阵
    cm = confusion_matrix(y_test, y_pred)
    
    return accuracy, report, cm

# 可视化结果
def plot_image_results(cm, class_names):
    plt.figure(figsize=(10, 8))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
                xticklabels=class_names,
                yticklabels=class_names)
    plt.title('图像分类混淆矩阵')
    plt.xlabel('预测类别')
    plt.ylabel('真实类别')
    plt.show()

# 应用示例
def image_analysis(image_paths, labels, class_names):
    # 加载图像
    images = load_images(image_paths, labels)
    
    # 特征提取
    X = extract_features(images)
    
    # 训练模型
    model, X_test, y_test = image_classification_model(X, labels)
    
    # 评估模型
    accuracy, report, cm = evaluate_image_model(model, X_test, y_test)
    
    # 输出结果
    print(f"准确率: {accuracy:.2f}")
    print("\\n分类报告:")
    print(report)
    
    # 可视化结果
    plot_image_results(cm, class_names)
    
    # 分析分类结果
    analyze_classification_results(model, X_test, y_test, images, class_names)

# 分析分类结果
def analyze_classification_results(model, X_test, y_test, images, class_names):
    # 获取预测概率
    y_pred_proba = model.predict_proba(X_test)
    
    # 选择一些样本进行可视化
    n_samples = min(5, len(X_test))
    indices = np.random.choice(len(X_test), n_samples, replace=False)
    
    plt.figure(figsize=(15, 3))
    for i, idx in enumerate(indices):
        plt.subplot(1, n_samples, i + 1)
        plt.imshow(images[idx])
        plt.title(f'真实: {class_names[y_test[idx]]}\\n'
                 f'预测: {class_names[np.argmax(y_pred_proba[idx])]}')
        plt.axis('off')
    plt.tight_layout()
    plt.show()`}
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
          href="/study/ai/datamining/clustering"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回聚类分析
        </Link>
        <Link 
          href="/study/ai/datamining/anomaly"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          异常检测 →
        </Link>
      </div>
    </div>
  );
} 
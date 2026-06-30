'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList, TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '机器学习',
  chapterTitle: '监督学习算法',
  chapterNumber: 3,
  totalChapters: 11,
  subjectHref: '/study/ai/ml',
  prevChapter: { label: '机器学习项目流程', href: '/study/ai/ml/workflow' },
  nextChapter: { label: '无监督学习算法', href: '/study/ai/ml/unsupervised' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '理论知识',
    left: (
      <div className="space-y-4">
        <PageTitle>监督学习算法</PageTitle>
        <SectionTitle>监督学习概述</SectionTitle>
        <BookParagraph>监督学习是机器学习中最常用的方法之一，它通过已标记的训练数据学习输入到输出的映射关系。主要包括分类和回归两大类问题。</BookParagraph>
        <SectionTitle>分类问题</SectionTitle>
        <BookList items={['目标：预测离散类别', '应用：垃圾邮件检测、图像分类', '评估：准确率、精确率、召回率']} />
        <SectionTitle>回归问题</SectionTitle>
        <BookList items={['目标：预测连续值', '应用：房价预测、销量预测', '评估：MSE、RMSE、R²']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>常用算法详解</SectionTitle>
        <SectionTitle>1. 线性回归</SectionTitle>
        <BookParagraph>通过线性方程拟合数据，预测连续值</BookParagraph>
        <BookList items={['原理：最小化均方误差', '优点：简单直观、计算效率高', '缺点：只能处理线性关系', '应用：房价预测、销量预测']} />
        <SectionTitle>2. 逻辑回归</SectionTitle>
        <BookParagraph>用于二分类问题，输出概率值</BookParagraph>
        <BookList items={['原理：Sigmoid函数映射概率', '优点：可解释性强、训练速度快', '缺点：只能处理线性可分问题', '应用：信用评分、疾病诊断']} />
        <SectionTitle>3. 决策树</SectionTitle>
        <BookParagraph>通过树形结构进行决策</BookParagraph>
        <BookList items={['原理：信息增益/基尼系数', '优点：可解释性强、处理非线性关系', '缺点：容易过拟合', '应用：客户分类、风险评估']} />
        <SectionTitle>4. 支持向量机</SectionTitle>
        <BookParagraph>寻找最优分类边界</BookParagraph>
        <BookList items={['原理：最大化分类间隔', '优点：泛化能力强、处理高维数据', '缺点：计算复杂度高', '应用：文本分类、图像识别']} />
        <TagGrid items={['线性回归', '逻辑回归', '决策树', 'SVM', '分类', '回归']} />
      </div>
    ),
  },
  {
    label: '代码实践',
    left: (
      <div className="space-y-4">
        <PageTitle>算法实现示例</PageTitle>
        <BookCode language="python" code={`import numpy as np
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
    print(f"逻辑回归准确率: {accuracy:.4f}")`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookCode language="python" code={`# 3. 决策树示例
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
    svm_example()`} />
        <TagGrid items={['LinearRegression', 'LogisticRegression', 'DecisionTree', 'SVM', 'Scikit-learn']} />
      </div>
    ),
  },
  {
    label: '例题练习',
    left: (
      <div className="space-y-4">
        <PageTitle>例题1：房价预测</PageTitle>
        <SectionTitle>问题描述</SectionTitle>
        <BookParagraph>给定房屋的特征数据（面积、卧室数、位置等），预测房屋价格。这是一个典型的回归问题。</BookParagraph>
        <SectionTitle>数据集</SectionTitle>
        <BookCode language="text" code={`# 示例数据
面积(平方米)  卧室数  位置评分  价格(万元)
120          3      8.5     280
150          4      9.0     350
80           2      7.5     180
200          5      9.5     450
...`} />
        <SectionTitle>解决方案</SectionTitle>
        <BookCode language="python" code={`# 1. 数据预处理
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
print(f"预测价格: {predicted_price[0]:.2f}万元")`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>例题2：信用评分</PageTitle>
        <SectionTitle>问题描述</SectionTitle>
        <BookParagraph>根据用户的个人信息和信用历史，预测用户是否会违约。这是一个二分类问题。</BookParagraph>
        <SectionTitle>数据集</SectionTitle>
        <BookCode language="text" code={`# 示例数据
年龄  收入(万)  信用历史(年)  违约记录  是否违约
35   15       5           0       0
28   8        2           1       1
45   25       10          0       0
32   12       3           2       1
...`} />
        <SectionTitle>解决方案</SectionTitle>
        <BookCode language="python" code={`# 1. 数据预处理
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
print(f"预测结果: {'可能违约' if predicted_default[0] == 1 else '不会违约'}")`} />
        <TagGrid items={['线性回归', '随机森林', '分类', '回归', '例题']} />
      </div>
    ),
  },
]

export default function MlSupervisedPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

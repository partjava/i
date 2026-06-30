'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList, TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '机器学习',
  chapterTitle: '模型评估与选择',
  chapterNumber: 5,
  totalChapters: 11,
  subjectHref: '/study/ai/ml',
  prevChapter: { label: '无监督学习算法', href: '/study/ai/ml/unsupervised' },
  nextChapter: { label: '特征工程', href: '/study/ai/ml/feature-engineering' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '理论知识',
    left: (
      <div className="space-y-4">
        <PageTitle>模型评估与选择</PageTitle>

        <SectionTitle>模型评估概述</SectionTitle>
        <BookParagraph>
          模型评估是机器学习流程中的关键环节，用于衡量模型的泛化能力和预测效果。
          不同任务类型需要不同的评估指标和方法。合理的评估能帮助我们选择最佳模型、
          诊断模型问题、防止过拟合，并为模型优化提供方向。
        </BookParagraph>

        <div className="grid grid-cols-3 gap-2">
          {['分类问题评估', '回归问题评估', '评估方法'].map((item) => (
            <span key={item} className="px-3 py-2 bg-amber/5 text-amber-dark text-xs rounded-md text-center border border-amber/10">
              {item}
            </span>
          ))}
        </div>

        <SectionTitle>评估指标详解</SectionTitle>

        <h4 className="text-xs font-medium text-ink mt-4 mb-2">分类评估指标</h4>
        <BookParagraph>
          分类问题通常使用混淆矩阵（Confusion Matrix）来展示预测结果，
          并基于此计算各项评估指标。混淆矩阵记录了真正例(TP)、假正例(FP)、
          假反例(FN)和真反例(TN)的数量。
        </BookParagraph>

        <svg width="100%" height="180" viewBox="0 0 400 180" className="my-3">
          <rect x="50" y="40" width="100" height="100" fill="#93C5FD" />
          <rect x="150" y="40" width="100" height="100" fill="#FCA5A5" />
          <rect x="50" y="140" width="100" height="100" fill="#FCA5A5" />
          <rect x="150" y="140" width="100" height="100" fill="#93C5FD" />
          <text x="100" y="90" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">TP</text>
          <text x="200" y="90" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">FP</text>
          <text x="100" y="190" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">FN</text>
          <text x="200" y="190" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">TN</text>
        </svg>

        <BookList items={[
          '准确率（Accuracy）：正确预测的比例，即 (TP + TN) / (TP + FP + FN + TN)',
          '精确率（Precision）：预测为正类中实际为正类的比例，即 TP / (TP + FP)',
          '召回率（Recall）：实际为正类中被正确预测的比例，即 TP / (TP + FN)',
          'F1分数：精确率和召回率的调和平均，即 2 * (P * R) / (P + R)',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h4 className="text-xs font-medium text-ink mt-3 mb-2">回归评估指标</h4>
        <BookParagraph>
          回归问题的评估主要关注预测值与真实值之间的误差大小。
          常用的回归评估指标包括MSE、RMSE、MAE和决定系数R²。
        </BookParagraph>

        <svg width="100%" height="180" viewBox="0 0 400 180" className="my-3">
          <line x1="50" y1="140" x2="350" y2="40" stroke="#10B981" strokeWidth="2" />
          <circle cx="100" cy="115" r="4" fill="#059669" />
          <circle cx="200" cy="80" r="4" fill="#059669" />
          <circle cx="300" cy="45" r="4" fill="#059669" />
          <line x1="100" y1="115" x2="100" y2="95" stroke="#6EE7B7" strokeWidth="1.5" strokeDasharray="3,2" />
          <line x1="200" y1="80" x2="200" y2="60" stroke="#6EE7B7" strokeWidth="1.5" strokeDasharray="3,2" />
          <line x1="300" y1="45" x2="300" y2="25" stroke="#6EE7B7" strokeWidth="1.5" strokeDasharray="3,2" />
          <text x="200" y="170" textAnchor="middle" fill="#10B981" fontSize="10">回归线 vs 实际数据点（误差线）</text>
        </svg>

        <BookList items={[
          'MSE（均方误差）：预测值与真实值差的平方的均值，对大误差惩罚更大',
          'RMSE：MSE的平方根，与原始数据的单位一致，更易解释',
          'MAE（平均绝对误差）：预测值与真实值绝对误差的均值，对异常值鲁棒',
          'R²（决定系数）：模型解释方差的比例，取值范围[0,1]，越接近1越好',
        ]} />

        <h4 className="text-xs font-medium text-ink mt-4 mb-2">交叉验证</h4>
        <BookParagraph>
          交叉验证是一种评估模型泛化性能的统计方法。K折交叉验证将数据集分成K份，
          每次取K-1份训练、1份验证，重复K次取平均结果，减少评估结果的方差。
        </BookParagraph>

        <svg width="100%" height="160" viewBox="0 0 400 160" className="my-3">
          <rect x="40" y="30" width="320" height="100" fill="#DDD6FE" rx="4" />
          <line x1="120" y1="30" x2="120" y2="130" stroke="#8B5CF6" strokeWidth="2.5" />
          <line x1="200" y1="30" x2="200" y2="130" stroke="#8B5CF6" strokeWidth="2.5" />
          <line x1="280" y1="30" x2="280" y2="130" stroke="#8B5CF6" strokeWidth="2.5" />
          <text x="80" y="80" textAnchor="middle" fill="#4C1D95" fontSize="12" fontWeight="bold">训练集</text>
          <text x="160" y="80" textAnchor="middle" fill="#4C1D95" fontSize="12" fontWeight="bold">验证集</text>
          <text x="240" y="80" textAnchor="middle" fill="#4C1D95" fontSize="12" fontWeight="bold">训练集</text>
          <text x="320" y="80" textAnchor="middle" fill="#4C1D95" fontSize="12" fontWeight="bold">训练集</text>
        </svg>

        <TagGrid items={['准确率', '精确率', '召回率', 'F1', 'MSE', '交叉验证']} />
      </div>
    ),
  },
  {
    label: '代码实践',
    left: (
      <div className="space-y-4">
        <PageTitle>模型评估代码实践</PageTitle>
        <BookParagraph>
          以下代码展示了分类问题和回归问题的完整评估流程，
          包括模型训练、预测、评估指标计算和交叉验证。
        </BookParagraph>
        <BookCode language="python" code={`import numpy as np
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
    print(f"平均交叉验证分数: {cv_scores.mean():.3f}")`} />

        <BookParagraph>
          <b>分类评估：</b>使用LogisticRegression模型，计算准确率、精确率、召回率和F1分数，
          并通过5折交叉验证评估模型的稳定性。
        </BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookCode language="python" code={`# 2. 回归问题评估示例
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
    plt.plot([y_test.min(), y_test.max()],
             [y_test.min(), y_test.max()], 'r--')
    plt.xlabel('真实值')
    plt.ylabel('预测值')
    plt.title('回归预测结果')
    plt.show()

# 运行评估示例
if __name__ == "__main__":
    print("运行分类问题评估...")
    classification_evaluation()
    print("\\n运行回归问题评估...")
    regression_evaluation()`} />

        <BookParagraph>
          <b>回归评估：</b>使用LinearRegression模型，计算MSE、RMSE和R²指标，
          并通过散点图直观比较预测值与真实值的拟合效果。
        </BookParagraph>

        <TagGrid items={['评估指标', '交叉验证', 'Logistic回归', '线性回归', '分类', '回归']} />
      </div>
    ),
  },
  {
    label: '例题练习',
    left: (
      <div className="space-y-4">
        <PageTitle>例题练习</PageTitle>

        <SectionTitle>例题1：分类模型评估（信用卡欺诈检测）</SectionTitle>
        <BookParagraph>
          某银行风控部门需要建立信用卡欺诈检测模型，根据交易记录判断是否存在欺诈行为。
          现有数据包括交易金额、交易类型、交易时间等特征，请使用逻辑回归模型进行分类，
          并通过分类评估报告和混淆矩阵评估模型效果。
        </BookParagraph>

        <h4 className="text-xs font-medium text-ink mt-3 mb-2">数据集</h4>
        <BookCode language="python" code={`# 示例数据
交易ID    交易金额  交易类型  交易时间  用户历史交易  是否欺诈
0001     150.00   线上      22:30     120          0
0002     5000.00  境外      03:15     3            1
0003     200.00   线下      14:00     450          0
0004     8000.00  线上      01:45     1            1
0005     350.00   线下      18:30     230          0
0006     12000.00 境外      02:00     2            1
0007     80.00    线下      10:00     500          0
0008     3000.00  线上      20:00     80           0`} />

        <h4 className="text-xs font-medium text-ink mt-3 mb-2">解决方案</h4>
        <BookCode language="python" code={`# 1. 数据准备
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix

# 加载数据
df = pd.read_csv('credit_card.csv')

# 特征工程：对交易类型进行独热编码
df_encoded = pd.get_dummies(df, columns=['交易类型'])
X = df_encoded.drop('是否欺诈', axis=1)
y = df_encoded['是否欺诈']

# 2. 划分数据集
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42
)

# 3. 模型训练
model = LogisticRegression()
model.fit(X_train, y_train)

# 4. 预测与评估
y_pred = model.predict(X_test)

print("分类评估报告：")
print(classification_report(y_test, y_pred))
print("\\n混淆矩阵：")
print(confusion_matrix(y_test, y_pred))

# 分析结果
accuracy = (y_pred == y_test).mean()
print(f"\\n准确率: {accuracy:.3f}")`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>例题2：回归模型评估（房价预测）</SectionTitle>
        <BookParagraph>
          某房产中介希望建立房价预测模型，帮助客户估算房屋价格。
          现有房屋数据包括面积、卧室数、卫生间数、位置评分和房龄，
          请使用线性回归模型进行预测，并通过MSE、RMSE和R²评估模型效果。
        </BookParagraph>

        <h4 className="text-xs font-medium text-ink mt-3 mb-2">数据集</h4>
        <BookCode language="python" code={`# 示例数据
房屋ID  面积(㎡)  卧室数  卫生间数  位置评分  房龄  价格(万元)
001     120      3       2        9.5     5    450
002     85       2       1        7.0     10   280
003     150      4       3        8.5     3    520
004     60       1       1        6.0     15   180
005     100      3       2        8.0     8    380
006     140      3       2        9.0     2    490
007     75       2       1        6.5     12   250
008     180      4       3        9.5     1    600`} />

        <h4 className="text-xs font-medium text-ink mt-3 mb-2">解决方案</h4>
        <BookCode language="python" code={`# 1. 数据准备
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
import matplotlib.pyplot as plt

# 加载数据
df = pd.read_csv('house_data.csv')

# 2. 特征与目标
X = df[['面积(㎡)', '卧室数', '卫生间数', '位置评分', '房龄']]
y = df['价格(万元)']

# 3. 划分数据集
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 4. 模型训练
model = LinearRegression()
model.fit(X_train, y_train)

# 5. 预测与评估
y_pred = model.predict(X_test)

mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
r2 = r2_score(y_test, y_pred)

print(f"均方误差 (MSE): {mse:.2f}")
print(f"均方根误差 (RMSE): {rmse:.2f}")
print(f"决定系数 (R²): {r2:.3f}")

# 6. 可视化
plt.figure(figsize=(10, 6))
plt.scatter(y_test, y_pred, alpha=0.5)
plt.plot([y_test.min(), y_test.max()],
         [y_test.min(), y_test.max()], 'r--')
plt.xlabel('真实价格')
plt.ylabel('预测价格')
plt.title('房价预测结果')
plt.show()

# 分析特征系数
print(f"\\n模型特征系数: {model.coef_}")`} />

        <TagGrid items={['分类评估', '回归评估', '欺诈检测', '房价预测', '模型评估']} />
      </div>
    ),
  },
]

export default function MlEvaluationPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }

'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList, TagGrid,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '机器学习',
  chapterTitle: '机器学习项目流程',
  chapterNumber: 2,
  totalChapters: 11,
  subjectHref: '/study/ai/ml',
  prevChapter: { label: '机器学习基础', href: '/study/ai/ml/basic' },
  nextChapter: { label: '监督学习算法', href: '/study/ai/ml/supervised' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '理论知识',
    left: (
      <div className="space-y-4">
        <PageTitle>机器学习项目流程</PageTitle>
        <BookParagraph>一个完整的机器学习项目通常包含以下步骤：问题定义、数据收集、数据预处理、特征工程、模型训练、模型评估和部署。每个步骤都至关重要，需要仔细规划和执行。</BookParagraph>
        <SectionTitle>前期准备</SectionTitle>
        <BookList items={['明确项目目标和需求', '确定评估指标', '收集相关数据', '准备开发环境']} />
        <SectionTitle>后期工作</SectionTitle>
        <BookList items={['模型优化和调参', '模型部署和维护', '性能监控和更新', '文档编写和分享']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>1. 数据收集与预处理</SectionTitle>
        <BookParagraph>数据是机器学习项目的基础，质量直接影响模型效果</BookParagraph>
        <BookList items={['数据来源：公开数据集、爬虫、API等', '数据清洗：处理缺失值、异常值、重复值', '数据转换：标准化、归一化、编码', '数据验证：检查数据质量和完整性']} />
        <SectionTitle>2. 特征工程</SectionTitle>
        <BookParagraph>特征工程是提升模型性能的关键步骤</BookParagraph>
        <BookList items={['特征选择：相关性分析、重要性评估', '特征构建：组合特征、时间特征、统计特征', '特征转换：多项式特征、交互特征', '特征降维：PCA、LDA等']} />
        <SectionTitle>3. 模型训练与评估</SectionTitle>
        <BookParagraph>选择合适的模型并进行训练和评估</BookParagraph>
        <BookList items={['模型选择：根据问题类型选择合适算法', '参数调优：网格搜索、随机搜索、贝叶斯优化', '交叉验证：K折交叉验证、留一法', '性能评估：准确率、精确率、召回率、F1分数']} />
        <SectionTitle>4. 模型部署与维护</SectionTitle>
        <BookParagraph>将模型部署到生产环境并持续维护</BookParagraph>
        <BookList items={['模型保存：序列化、版本控制', '接口开发：REST API、gRPC等', '性能监控：延迟、吞吐量、资源使用', '模型更新：增量学习、在线学习']} />
      </div>
    ),
  },
  {
    label: '案例详解',
    left: (
      <div className="space-y-4">
        <SectionTitle>实际案例：电商用户流失预测</SectionTitle>
        <SectionTitle>1. 问题定义</SectionTitle>
        <BookParagraph>预测哪些用户可能会在未来30天内流失，以便提前进行挽留。</BookParagraph>
        <BookList items={['目标：预测用户流失概率', '评估指标：准确率、召回率、F1分数', '时间范围：未来30天']} />
        <SectionTitle>2. 数据收集</SectionTitle>
        <BookParagraph>收集用户行为数据、交易数据、基本信息等。</BookParagraph>
        <BookList items={['用户行为：浏览记录、搜索记录、购物车操作', '交易数据：订单金额、购买频率、退款情况', '用户信息：注册时间、会员等级、活跃度']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>3. 特征工程</SectionTitle>
        <BookParagraph>构建预测用户流失的关键特征。</BookParagraph>
        <BookList items={['时间特征：最近一次购买距今天数', '行为特征：日均浏览时长、搜索次数', '交易特征：客单价、复购率、退款率', '用户特征：会员等级、活跃度评分']} />
        <SectionTitle>4. 模型训练与评估</SectionTitle>
        <BookParagraph>选择合适的模型并进行训练和评估。</BookParagraph>
        <BookList items={['模型选择：XGBoost、LightGBM', '参数调优：网格搜索最优参数', '评估结果：准确率85%，召回率80%']} />
        <TagGrid items={['项目流程', '数据预处理', '特征工程', '模型评估', '部署']} />
      </div>
    ),
  },
  {
    label: '代码实践',
    left: (
      <div className="space-y-4">
        <PageTitle>完整项目示例：房价预测</PageTitle>
        <BookCode language="python" code={`import numpy as np
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
print(f"决定系数 (R\\u00b2): {r2:.2f}")

# 8. 特征重要性分析
feature_importance = pd.DataFrame({
    'feature': features,
    'importance': model.feature_importances_
})
print("\\n特征重要性：")
print(feature_importance.sort_values('importance', ascending=False))`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>数据可视化分析</SectionTitle>
        <BookCode language="python" code={`import matplotlib.pyplot as plt
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
plt.show()`} />
        <TagGrid items={['RandomForest', '特征工程', '可视化', 'Scikit-learn']} />
      </div>
    ),
  },
  {
    label: '用户流失预测',
    left: (
      <div className="space-y-4">
        <SectionTitle>用户流失预测示例</SectionTitle>
        <BookCode language="python" code={`import pandas as pd
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
print(feature_importance.sort_values('importance', ascending=False))`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>用户行为分析可视化</SectionTitle>
        <BookCode language="python" code={`import matplotlib.pyplot as plt
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
plt.show()`} />
        <TagGrid items={['XGBoost', '用户流失', '特征工程', '分类模型']} />
      </div>
    ),
  },
]

export default function MlWorkflowPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

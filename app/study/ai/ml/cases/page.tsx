'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaRobot, FaBrain, FaChartLine, FaCode, FaLightbulb, FaNetworkWired, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { SiScikitlearn, SiPandas, SiNumpy } from 'react-icons/si';

export default function MLCasesPage() {
  const [activeTab, setActiveTab] = useState('case1');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">机器学习实战案例</h1>
      
      {/* 进度条 */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '80%' }}></div>
      </div>

      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('case1')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'case1'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          案例一：电商用户流失预测
        </button>
        <button
          onClick={() => setActiveTab('case2')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'case2'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          案例二：信用卡欺诈检测
        </button>
        <button
          onClick={() => setActiveTab('case3')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'case3'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          案例三：商品推荐系统
        </button>
      </div>

      {activeTab === 'case1' ? (
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">电商用户流失预测</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">项目背景</h3>
                <p className="text-gray-700">
                  电商平台需要预测哪些用户可能会流失，以便及时采取挽留措施。本项目使用机器学习方法，基于用户的历史行为数据，预测用户在未来30天内是否会流失。
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">数据准备</h3>
                <pre className="overflow-x-auto text-gray-800">
                  <code>{`# 用户行为数据示例
用户ID  注册时间    最近登录  购买次数  消费金额  浏览时长  收藏数  购物车数  流失标记
001     2023-01-01  2024-01-15  5        1000     120       3       2        0
002     2023-02-01  2024-01-20  8        2000     180       5       3        0
003     2023-03-01  2024-01-25  2        500      60        1       1        1
...`}</code>
                </pre>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">特征工程</h3>
                <pre className="overflow-x-auto text-gray-800">
                  <code>{`import pandas as pd
import numpy as np
from datetime import datetime

# 1. 加载数据
df = pd.read_csv('user_behavior.csv')

# 2. 时间特征处理
df['注册时间'] = pd.to_datetime(df['注册时间'])
df['最近登录'] = pd.to_datetime(df['最近登录'])

# 计算用户注册时长（天）
df['注册时长'] = (datetime.now() - df['注册时间']).dt.days

# 计算最近登录距离现在的时间（天）
df['最近登录间隔'] = (datetime.now() - df['最近登录']).dt.days

# 3. 用户行为特征
# 计算用户活跃度
df['活跃度'] = df['浏览时长'] / df['最近登录间隔']

# 计算购买频率
df['购买频率'] = df['购买次数'] / df['注册时长']

# 计算平均消费金额
df['平均消费'] = df['消费金额'] / df['购买次数']

# 4. 特征选择
features = [
    '注册时长', '最近登录间隔', '购买次数', '消费金额',
    '浏览时长', '收藏数', '购物车数', '活跃度',
    '购买频率', '平均消费'
]

X = df[features]
y = df['流失标记']`}</code>
                </pre>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">模型训练与评估</h3>
                <pre className="overflow-x-auto text-gray-800">
                  <code>{`from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, roc_auc_score
import xgboost as xgb

# 1. 数据预处理
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 标准化特征
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# 2. 训练模型
# 随机森林
rf_model = RandomForestClassifier(
    n_estimators=100,
    max_depth=5,
    random_state=42
)
rf_model.fit(X_train_scaled, y_train)

# XGBoost
xgb_model = xgb.XGBClassifier(
    n_estimators=100,
    max_depth=5,
    learning_rate=0.1,
    random_state=42
)
xgb_model.fit(X_train_scaled, y_train)

# 3. 模型评估
models = {
    '随机森林': rf_model,
    'XGBoost': xgb_model
}

for name, model in models.items():
    pred = model.predict(X_test_scaled)
    proba = model.predict_proba(X_test_scaled)[:, 1]
    
    print(f"\\n{name}模型评估：")
    print(classification_report(y_test, pred))
    print(f"AUC分数: {roc_auc_score(y_test, proba):.3f}")

# 4. 特征重要性分析
rf_importance = pd.DataFrame({
    '特征': features,
    '重要性': rf_model.feature_importances_
}).sort_values('重要性', ascending=False)

print("\\n特征重要性：")
print(rf_importance)`}</code>
                </pre>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">模型部署与应用</h3>
                <pre className="overflow-x-auto text-gray-800">
                  <code>{`import joblib
import pandas as pd
from datetime import datetime

# 1. 保存模型
joblib.dump(rf_model, 'churn_prediction_model.pkl')
joblib.dump(scaler, 'feature_scaler.pkl')

# 2. 预测函数
def predict_churn(user_data):
    # 加载模型和标准化器
    model = joblib.load('churn_prediction_model.pkl')
    scaler = joblib.load('feature_scaler.pkl')
    
    # 特征工程
    user_data['注册时长'] = (datetime.now() - pd.to_datetime(user_data['注册时间'])).dt.days
    user_data['最近登录间隔'] = (datetime.now() - pd.to_datetime(user_data['最近登录'])).dt.days
    user_data['活跃度'] = user_data['浏览时长'] / user_data['最近登录间隔']
    user_data['购买频率'] = user_data['购买次数'] / user_data['注册时长']
    user_data['平均消费'] = user_data['消费金额'] / user_data['购买次数']
    
    # 选择特征
    features = [
        '注册时长', '最近登录间隔', '购买次数', '消费金额',
        '浏览时长', '收藏数', '购物车数', '活跃度',
        '购买频率', '平均消费'
    ]
    
    # 标准化特征
    X = scaler.transform(user_data[features])
    
    # 预测
    churn_prob = model.predict_proba(X)[:, 1]
    
    return churn_prob

# 3. 使用示例
new_user = pd.DataFrame({
    '注册时间': ['2023-06-01'],
    '最近登录': ['2024-01-20'],
    '购买次数': [3],
    '消费金额': [800],
    '浏览时长': [90],
    '收藏数': [2],
    '购物车数': [1]
})

churn_probability = predict_churn(new_user)
print(f"用户流失概率: {churn_probability[0]:.2%}")`}</code>
                </pre>
              </div>
            </div>
          </section>
        </div>
      ) : activeTab === 'case2' ? (
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">信用卡欺诈检测</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">项目背景</h3>
                <p className="text-gray-700">
                  信用卡欺诈检测是一个典型的二分类问题，需要从大量交易数据中识别出欺诈交易。由于欺诈交易通常只占很小比例，这是一个典型的类别不平衡问题。
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">数据准备</h3>
                <pre className="overflow-x-auto text-gray-800">
                  <code>{`# 交易数据示例
交易ID  时间戳  交易金额  商户类型  交易地点  持卡人年龄  持卡人收入  欺诈标记
001     1234567  1000     超市      北京      35         50000      0
002     1234568  5000     珠宝店    上海      45         80000      1
003     1234569  2000     餐厅      广州      28         40000      0
...`}</code>
                </pre>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">特征工程与数据平衡</h3>
                <pre className="overflow-x-auto text-gray-800">
                  <code>{`import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from imblearn.over_sampling import SMOTE
from imblearn.under_sampling import RandomUnderSampler
from imblearn.pipeline import Pipeline

# 1. 加载数据
df = pd.read_csv('credit_card_transactions.csv')

# 2. 特征工程
# 时间特征
df['小时'] = pd.to_datetime(df['时间戳'], unit='s').dt.hour
df['星期'] = pd.to_datetime(df['时间戳'], unit='s').dt.dayofweek

# 交易特征
df['交易金额/收入'] = df['交易金额'] / df['持卡人收入']
df['交易金额/年龄'] = df['交易金额'] / df['持卡人年龄']

# 3. 特征选择
features = [
    '交易金额', '商户类型', '交易地点', '持卡人年龄',
    '持卡人收入', '小时', '星期', '交易金额/收入',
    '交易金额/年龄'
]

X = df[features]
y = df['欺诈标记']

# 4. 数据平衡
# 创建采样管道
sampler = Pipeline([
    ('over', SMOTE(random_state=42)),
    ('under', RandomUnderSampler(random_state=42))
])

# 应用采样
X_balanced, y_balanced = sampler.fit_resample(X, y)

print("原始数据分布：")
print(pd.Series(y).value_counts())
print("\\n平衡后数据分布：")
print(pd.Series(y_balanced).value_counts())`}</code>
                </pre>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">模型训练与评估</h3>
                <pre className="overflow-x-auto text-gray-800">
                  <code>{`from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix
import xgboost as xgb

# 1. 划分训练集和测试集
X_train, X_test, y_train, y_test = train_test_split(
    X_balanced, y_balanced, test_size=0.2, random_state=42
)

# 2. 训练模型
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

# 3. 模型评估
models = {
    '随机森林': rf_model,
    'XGBoost': xgb_model
}

for name, model in models.items():
    pred = model.predict(X_test)
    print(f"\\n{name}模型评估：")
    print(classification_report(y_test, pred))
    print("混淆矩阵：")
    print(confusion_matrix(y_test, pred))

# 4. 特征重要性分析
rf_importance = pd.DataFrame({
    '特征': features,
    '重要性': rf_model.feature_importances_
}).sort_values('重要性', ascending=False)

print("\\n特征重要性：")
print(rf_importance)`}</code>
                </pre>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">实时欺诈检测系统</h3>
                <pre className="overflow-x-auto text-gray-800">
                  <code>{`import joblib
import pandas as pd
from datetime import datetime

# 1. 保存模型
joblib.dump(rf_model, 'fraud_detection_model.pkl')

# 2. 实时检测函数
def detect_fraud(transaction_data):
    # 加载模型
    model = joblib.load('fraud_detection_model.pkl')
    
    # 特征工程
    transaction_data['小时'] = pd.to_datetime(transaction_data['时间戳'], unit='s').dt.hour
    transaction_data['星期'] = pd.to_datetime(transaction_data['时间戳'], unit='s').dt.dayofweek
    transaction_data['交易金额/收入'] = transaction_data['交易金额'] / transaction_data['持卡人收入']
    transaction_data['交易金额/年龄'] = transaction_data['交易金额'] / transaction_data['持卡人年龄']
    
    # 选择特征
    features = [
        '交易金额', '商户类型', '交易地点', '持卡人年龄',
        '持卡人收入', '小时', '星期', '交易金额/收入',
        '交易金额/年龄'
    ]
    
    # 预测
    fraud_prob = model.predict_proba(transaction_data[features])[:, 1]
    
    return fraud_prob

# 3. 使用示例
new_transaction = pd.DataFrame({
    '时间戳': [1234570],
    '交易金额': [3000],
    '商户类型': ['电子产品'],
    '交易地点': ['深圳'],
    '持卡人年龄': [30],
    '持卡人收入': [60000]
})

fraud_probability = detect_fraud(new_transaction)
print(f"欺诈概率: {fraud_probability[0]:.2%}")

# 4. 风险等级判断
def get_risk_level(prob):
    if prob < 0.3:
        return "低风险"
    elif prob < 0.7:
        return "中风险"
    else:
        return "高风险"

risk_level = get_risk_level(fraud_probability[0])
print(f"风险等级: {risk_level}")`}</code>
                </pre>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">商品推荐系统</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">项目背景</h3>
                <p className="text-gray-700">
                  电商平台需要为用户推荐可能感兴趣的商品，提高用户购买转化率。本项目实现了一个基于协同过滤和内容推荐的混合推荐系统。
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">数据准备</h3>
                <pre className="overflow-x-auto text-gray-800">
                  <code>{`# 用户行为数据示例
用户ID  商品ID  评分  浏览时长  购买标记  时间戳
001     101     5     120       1        1234567
001     102     4     90        1        1234568
002     101     3     60        0        1234569
...`}</code>
                </pre>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">协同过滤推荐</h3>
                <pre className="overflow-x-auto text-gray-800">
                  <code>{`import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from scipy.sparse import csr_matrix

# 1. 加载数据
df = pd.read_csv('user_behavior.csv')

# 2. 构建用户-商品评分矩阵
user_item_matrix = df.pivot(
    index='用户ID',
    columns='商品ID',
    values='评分'
).fillna(0)

# 3. 计算用户相似度
user_similarity = cosine_similarity(user_item_matrix)

# 4. 基于用户的协同过滤
def user_based_recommendation(user_id, n_recommendations=5):
    # 获取用户相似度
    user_idx = user_item_matrix.index.get_loc(user_id)
    user_sim = user_similarity[user_idx]
    
    # 获取用户未评分的商品
    user_ratings = user_item_matrix.iloc[user_idx]
    unrated_items = user_ratings[user_ratings == 0].index
    
    # 计算预测评分
    predictions = []
    for item in unrated_items:
        item_idx = user_item_matrix.columns.get_loc(item)
        item_ratings = user_item_matrix.iloc[:, item_idx]
        
        # 计算加权评分
        pred_rating = np.sum(user_sim * item_ratings) / np.sum(np.abs(user_sim))
        predictions.append((item, pred_rating))
    
    # 返回推荐结果
    return sorted(predictions, key=lambda x: x[1], reverse=True)[:n_recommendations]

# 5. 使用示例
user_id = '001'
recommendations = user_based_recommendation(user_id)
print(f"为用户 {user_id} 的推荐商品：")
for item, score in recommendations:
    print(f"商品 {item}: 预测评分 {score:.2f}")`}</code>
                </pre>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">内容推荐</h3>
                <pre className="overflow-x-auto text-gray-800">
                  <code>{`from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# 1. 商品特征数据
products = pd.DataFrame({
    '商品ID': [101, 102, 103, 104, 105],
    '类别': ['手机', '电脑', '耳机', '平板', '手表'],
    '品牌': ['苹果', '华为', '索尼', '苹果', '小米'],
    '价格区间': ['高端', '高端', '中端', '高端', '中端'],
    '描述': [
        '最新款iPhone，搭载A15芯片',
        '华为MateBook，轻薄本',
        '索尼降噪耳机，音质出色',
        'iPad Pro，专业创作',
        '小米智能手表，运动健康'
    ]
})

# 2. 构建商品特征向量
tfidf = TfidfVectorizer(stop_words='english')
product_features = tfidf.fit_transform(products['描述'])

# 3. 计算商品相似度
product_similarity = cosine_similarity(product_features)

# 4. 基于内容的推荐
def content_based_recommendation(product_id, n_recommendations=3):
    # 获取商品索引
    product_idx = products[products['商品ID'] == product_id].index[0]
    
    # 获取相似商品
    similar_scores = product_similarity[product_idx]
    similar_indices = similar_scores.argsort()[::-1][1:n_recommendations+1]
    
    # 返回推荐结果
    recommendations = []
    for idx in similar_indices:
        recommendations.append((
            products.iloc[idx]['商品ID'],
            products.iloc[idx]['描述'],
            similar_scores[idx]
        ))
    
    return recommendations

# 5. 使用示例
product_id = 101
recommendations = content_based_recommendation(product_id)
print(f"与商品 {product_id} 相似的商品：")
for item_id, desc, score in recommendations:
    print(f"商品 {item_id}: {desc} (相似度: {score:.2f})")`}</code>
                </pre>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">混合推荐系统</h3>
                <pre className="overflow-x-auto text-gray-800">
                  <code>{`# 1. 混合推荐函数
def hybrid_recommendation(user_id, product_id, n_recommendations=5):
    # 获取协同过滤推荐
    cf_recommendations = user_based_recommendation(user_id, n_recommendations)
    
    # 获取内容推荐
    content_recommendations = content_based_recommendation(product_id, n_recommendations)
    
    # 合并推荐结果
    recommendations = {}
    
    # 添加协同过滤推荐
    for item, score in cf_recommendations:
        recommendations[item] = score * 0.6  # 权重0.6
    
    # 添加内容推荐
    for item, _, score in content_recommendations:
        if item in recommendations:
            recommendations[item] += score * 0.4  # 权重0.4
        else:
            recommendations[item] = score * 0.4
    
    # 返回最终推荐结果
    return sorted(recommendations.items(), key=lambda x: x[1], reverse=True)[:n_recommendations]

# 2. 使用示例
user_id = '001'
product_id = 101
recommendations = hybrid_recommendation(user_id, product_id)
print(f"混合推荐结果：")
for item, score in recommendations:
    print(f"商品 {item}: 综合得分 {score:.2f}")

# 3. 推荐系统评估
def evaluate_recommendations(user_id, recommendations, actual_purchases):
    # 计算命中率
    hits = len(set(recommendations) & set(actual_purchases))
    hit_rate = hits / len(recommendations)
    
    # 计算覆盖率
    coverage = len(set(recommendations)) / len(products)
    
    return {
        '命中率': hit_rate,
        '覆盖率': coverage
    }

# 4. 评估示例
actual_purchases = [102, 103, 105]
recommended_items = [item for item, _ in recommendations]
metrics = evaluate_recommendations(user_id, recommended_items, actual_purchases)
print("\\n推荐系统评估：")
for metric, value in metrics.items():
    print(f"{metric}: {value:.2%}")`}</code>
                </pre>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* 导航链接 */}
      <div className="flex justify-between mt-8">
        <Link 
          href="/study/ai/ml/ensemble"
          className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 flex items-center"
        >
          <FaArrowLeft className="mr-2" />
          上一课：集成学习
        </Link>
        <Link 
          href="/study/ai/ml/deployment"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center"
        >
          下一课：模型部署与优化
          <FaArrowRight className="ml-2" />
        </Link>
      </div>
    </div>
  );
} 
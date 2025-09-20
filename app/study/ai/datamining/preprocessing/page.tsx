'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DataPreprocessingPage() {
  const [activeTab, setActiveTab] = useState('cleaning');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'cleaning', label: '数据清洗' },
    { id: 'transformation', label: '数据转换' },
    { id: 'feature', label: '特征工程' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">数据预处理</h1>
      
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
        {activeTab === 'cleaning' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">数据清洗</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 缺失值处理</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      缺失值是数据集中常见的问题，需要根据具体情况选择合适的处理方法。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 缺失值处理方法
1. 删除法
   - 删除包含缺失值的行
   - 删除缺失值比例过高的列
   - 适用于缺失值较少的情况

2. 统计量填充
   - 数值型：均值、中位数、众数
   - 分位数填充
   - 适用于随机缺失

3. 模型预测填充
   - 回归模型预测
   - 分类模型预测
   - 适用于非随机缺失

4. 多重插补
   - 基于统计模型
   - 考虑缺失值的不确定性
   - 生成多个可能的填充值

# 代码示例
import pandas as pd
import numpy as np
from sklearn.impute import SimpleImputer, KNNImputer

# 1. 删除法
df_drop = df.dropna()  # 删除任何包含缺失值的行
df_drop_cols = df.dropna(axis=1, thresh=0.8)  # 删除缺失值比例超过20%的列

# 2. 统计量填充
# 均值填充
imputer_mean = SimpleImputer(strategy='mean')
df_mean = pd.DataFrame(imputer_mean.fit_transform(df), columns=df.columns)

# 中位数填充
imputer_median = SimpleImputer(strategy='median')
df_median = pd.DataFrame(imputer_median.fit_transform(df), columns=df.columns)

# 3. KNN填充
imputer_knn = KNNImputer(n_neighbors=5)
df_knn = pd.DataFrame(imputer_knn.fit_transform(df), columns=df.columns)

# 4. 多重插补
from sklearn.experimental import enable_iterative_imputer
from sklearn.impute import IterativeImputer

imputer_iter = IterativeImputer(random_state=42)
df_iter = pd.DataFrame(imputer_iter.fit_transform(df), columns=df.columns)`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 异常值处理</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      异常值检测和处理是数据清洗的重要环节，需要结合业务场景选择合适的处理方法。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 异常值检测方法
1. 统计方法
   - Z-score法
   - IQR法
   - 3-sigma法则

2. 基于距离的方法
   - 欧氏距离
   - 马氏距离
   - K近邻

3. 基于密度的方法
   - LOF（局部异常因子）
   - DBSCAN
   - 孤立森林

# 代码示例
import numpy as np
from scipy import stats
from sklearn.ensemble import IsolationForest
from sklearn.neighbors import LocalOutlierFactor

# 1. Z-score法
def detect_outliers_zscore(data, threshold=3):
    z_scores = np.abs(stats.zscore(data))
    return np.where(z_scores > threshold)

# 2. IQR法
def detect_outliers_iqr(data):
    Q1 = np.percentile(data, 25)
    Q3 = np.percentile(data, 75)
    IQR = Q3 - Q1
    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR
    return np.where((data < lower_bound) | (data > upper_bound))

# 3. 孤立森林
def detect_outliers_iforest(data):
    clf = IsolationForest(contamination=0.1, random_state=42)
    return clf.fit_predict(data)

# 4. LOF
def detect_outliers_lof(data):
    clf = LocalOutlierFactor(contamination=0.1)
    return clf.fit_predict(data)

# 异常值处理
def handle_outliers(df, column, method='iqr'):
    if method == 'iqr':
        Q1 = df[column].quantile(0.25)
        Q3 = df[column].quantile(0.75)
        IQR = Q3 - Q1
        df[column] = df[column].clip(lower=Q1-1.5*IQR, upper=Q3+1.5*IQR)
    elif method == 'zscore':
        mean = df[column].mean()
        std = df[column].std()
        df[column] = df[column].clip(lower=mean-3*std, upper=mean+3*std)
    return df`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 重复值处理</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      重复值会影响数据分析的准确性，需要根据业务需求决定是否删除。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 重复值处理方法
1. 完全重复
   - 删除完全相同的行
   - 保留第一次出现的记录
   - 保留最后一次出现的记录

2. 部分重复
   - 基于关键字段去重
   - 合并重复记录
   - 保留最新/最旧记录

# 代码示例
import pandas as pd

# 1. 完全重复
# 删除完全重复的行
df_drop_duplicates = df.drop_duplicates()

# 保留第一次出现的记录
df_keep_first = df.drop_duplicates(keep='first')

# 保留最后一次出现的记录
df_keep_last = df.drop_duplicates(keep='last')

# 2. 部分重复
# 基于特定列去重
df_drop_duplicates_subset = df.drop_duplicates(subset=['col1', 'col2'])

# 合并重复记录
def merge_duplicates(df, key_columns, agg_dict):
    return df.groupby(key_columns).agg(agg_dict).reset_index()

# 示例：合并重复记录，保留最新数据
df_merged = df.sort_values('timestamp').drop_duplicates(
    subset=['user_id', 'product_id'],
    keep='last'
)`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'transformation' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">数据转换</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 标准化与归一化</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      数据标准化和归一化是常用的数据转换方法，用于消除量纲影响。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 数据转换方法
1. 标准化（Standardization）
   - Z-score标准化
   - 均值方差标准化
   - 适用于数据近似正态分布

2. 归一化（Normalization）
   - Min-Max归一化
   - 最大绝对值归一化
   - 适用于数据分布范围有限

3. 鲁棒缩放（Robust Scaling）
   - 基于分位数
   - 对异常值不敏感
   - 适用于数据存在异常值

# 代码示例
import numpy as np
from sklearn.preprocessing import StandardScaler, MinMaxScaler, RobustScaler

# 1. 标准化
def standardize_data(data):
    scaler = StandardScaler()
    return scaler.fit_transform(data)

# 2. 归一化
def normalize_data(data):
    scaler = MinMaxScaler()
    return scaler.fit_transform(data)

# 3. 鲁棒缩放
def robust_scale_data(data):
    scaler = RobustScaler()
    return scaler.fit_transform(data)

# 实际应用示例
def preprocess_numerical_features(df, columns, method='standard'):
    df_processed = df.copy()
    
    for col in columns:
        if method == 'standard':
            df_processed[col] = standardize_data(df[[col]])
        elif method == 'normalize':
            df_processed[col] = normalize_data(df[[col]])
        elif method == 'robust':
            df_processed[col] = robust_scale_data(df[[col]])
    
    return df_processed`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 类别特征编码</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      类别特征需要转换为数值形式才能用于机器学习模型。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 类别特征编码方法
1. 标签编码（Label Encoding）
   - 将类别转换为整数
   - 适用于有序类别
   - 可能引入错误的顺序关系

2. 独热编码（One-Hot Encoding）
   - 将类别转换为二进制向量
   - 适用于无序类别
   - 可能造成维度爆炸

3. 目标编码（Target Encoding）
   - 基于目标变量的统计量
   - 适用于高基数类别
   - 可能造成数据泄露

# 代码示例
import pandas as pd
from sklearn.preprocessing import LabelEncoder, OneHotEncoder
from category_encoders import TargetEncoder

# 1. 标签编码
def label_encode(df, columns):
    df_encoded = df.copy()
    for col in columns:
        le = LabelEncoder()
        df_encoded[col] = le.fit_transform(df[col])
    return df_encoded

# 2. 独热编码
def one_hot_encode(df, columns):
    df_encoded = df.copy()
    for col in columns:
        dummies = pd.get_dummies(df[col], prefix=col)
        df_encoded = pd.concat([df_encoded, dummies], axis=1)
        df_encoded.drop(col, axis=1, inplace=True)
    return df_encoded

# 3. 目标编码
def target_encode(df, columns, target_col):
    df_encoded = df.copy()
    for col in columns:
        te = TargetEncoder()
        df_encoded[col] = te.fit_transform(df[col], df[target_col])
    return df_encoded

# 实际应用示例
def encode_categorical_features(df, columns, method='onehot', target_col=None):
    if method == 'label':
        return label_encode(df, columns)
    elif method == 'onehot':
        return one_hot_encode(df, columns)
    elif method == 'target' and target_col:
        return target_encode(df, columns, target_col)
    else:
        raise ValueError("Invalid encoding method")`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 时间特征处理</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      时间特征的处理对于时间序列分析非常重要。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 时间特征处理方法
1. 时间特征提取
   - 年、月、日
   - 星期、季度
   - 小时、分钟
   - 时间差

2. 周期性特征
   - 正弦余弦转换
   - 周期性编码
   - 时间窗口特征

3. 时间序列特征
   - 滞后特征
   - 滑动窗口统计
   - 趋势特征

# 代码示例
import pandas as pd
import numpy as np
from datetime import datetime

# 1. 基本时间特征提取
def extract_time_features(df, date_column):
    df_features = df.copy()
    df_features[date_column] = pd.to_datetime(df_features[date_column])
    
    # 提取基本时间特征
    df_features['year'] = df_features[date_column].dt.year
    df_features['month'] = df_features[date_column].dt.month
    df_features['day'] = df_features[date_column].dt.day
    df_features['hour'] = df_features[date_column].dt.hour
    df_features['dayofweek'] = df_features[date_column].dt.dayofweek
    df_features['quarter'] = df_features[date_column].dt.quarter
    
    return df_features

# 2. 周期性特征
def add_cyclic_features(df, date_column):
    df_cyclic = df.copy()
    df_cyclic[date_column] = pd.to_datetime(df_cyclic[date_column])
    
    # 月份周期性特征
    df_cyclic['month_sin'] = np.sin(2 * np.pi * df_cyclic[date_column].dt.month/12)
    df_cyclic['month_cos'] = np.cos(2 * np.pi * df_cyclic[date_column].dt.month/12)
    
    # 星期周期性特征
    df_cyclic['dayofweek_sin'] = np.sin(2 * np.pi * df_cyclic[date_column].dt.dayofweek/7)
    df_cyclic['dayofweek_cos'] = np.cos(2 * np.pi * df_cyclic[date_column].dt.dayofweek/7)
    
    return df_cyclic

# 3. 时间序列特征
def add_time_series_features(df, date_column, value_column, windows=[3, 7, 14]):
    df_ts = df.copy()
    df_ts[date_column] = pd.to_datetime(df_ts[date_column])
    df_ts = df_ts.sort_values(date_column)
    
    # 添加滞后特征
    for lag in [1, 2, 3]:
        df_ts[f'{value_column}_lag_{lag}'] = df_ts[value_column].shift(lag)
    
    # 添加滑动窗口特征
    for window in windows:
        df_ts[f'{value_column}_rolling_mean_{window}'] = df_ts[value_column].rolling(window=window).mean()
        df_ts[f'{value_column}_rolling_std_{window}'] = df_ts[value_column].rolling(window=window).std()
    
    return df_ts`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'feature' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">特征工程</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 特征选择</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      特征选择是特征工程的重要环节，用于选择最相关的特征。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 特征选择方法
1. 过滤法（Filter）
   - 方差分析
   - 相关性分析
   - 信息增益
   - 卡方检验

2. 包装法（Wrapper）
   - 递归特征消除
   - 前向选择
   - 后向消除
   - 遗传算法

3. 嵌入法（Embedded）
   - Lasso正则化
   - Ridge正则化
   - 决策树特征重要性
   - 随机森林特征重要性

# 代码示例
import numpy as np
import pandas as pd
from sklearn.feature_selection import (
    VarianceThreshold, SelectKBest, f_classif,
    RFE, SelectFromModel
)
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import Lasso

# 1. 过滤法
def filter_methods(X, y):
    # 方差分析
    selector_var = VarianceThreshold(threshold=0.01)
    X_var = selector_var.fit_transform(X)
    
    # 相关性分析
    selector_kbest = SelectKBest(f_classif, k=5)
    X_kbest = selector_kbest.fit_transform(X, y)
    
    return X_var, X_kbest

# 2. 包装法
def wrapper_methods(X, y):
    # 递归特征消除
    estimator = RandomForestClassifier(n_estimators=100)
    selector_rfe = RFE(estimator, n_features_to_select=5)
    X_rfe = selector_rfe.fit_transform(X, y)
    
    return X_rfe

# 3. 嵌入法
def embedded_methods(X, y):
    # Lasso正则化
    selector_lasso = SelectFromModel(Lasso(alpha=0.01))
    X_lasso = selector_lasso.fit_transform(X, y)
    
    # 随机森林特征重要性
    selector_rf = SelectFromModel(
        RandomForestClassifier(n_estimators=100),
        threshold='median'
    )
    X_rf = selector_rf.fit_transform(X, y)
    
    return X_lasso, X_rf

# 实际应用示例
def select_features(X, y, method='filter'):
    if method == 'filter':
        return filter_methods(X, y)
    elif method == 'wrapper':
        return wrapper_methods(X, y)
    elif method == 'embedded':
        return embedded_methods(X, y)
    else:
        raise ValueError("Invalid feature selection method")`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 特征构建</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      特征构建是通过组合或转换现有特征来创建新特征。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 特征构建方法
1. 数值特征组合
   - 加减乘除
   - 多项式特征
   - 交互特征

2. 类别特征组合
   - 特征交叉
   - 分组统计
   - 条件特征

3. 文本特征构建
   - TF-IDF
   - 词向量
   - 文本统计特征

# 代码示例
import numpy as np
import pandas as pd
from sklearn.preprocessing import PolynomialFeatures
from sklearn.feature_extraction.text import TfidfVectorizer

# 1. 数值特征组合
def create_numerical_features(df, columns):
    df_features = df.copy()
    
    # 多项式特征
    poly = PolynomialFeatures(degree=2, include_bias=False)
    poly_features = poly.fit_transform(df[columns])
    poly_feature_names = [f'poly_{i}' for i in range(poly_features.shape[1])]
    df_poly = pd.DataFrame(poly_features, columns=poly_feature_names)
    
    # 交互特征
    for i in range(len(columns)):
        for j in range(i+1, len(columns)):
            col1, col2 = columns[i], columns[j]
            df_features[f'{col1}_{col2}_interact'] = df[col1] * df[col2]
    
    return pd.concat([df_features, df_poly], axis=1)

# 2. 类别特征组合
def create_categorical_features(df, columns):
    df_features = df.copy()
    
    # 特征交叉
    for i in range(len(columns)):
        for j in range(i+1, len(columns)):
            col1, col2 = columns[i], columns[j]
            df_features[f'{col1}_{col2}_cross'] = df[col1].astype(str) + '_' + df[col2].astype(str)
    
    # 分组统计
    for col in columns:
        group_stats = df.groupby(col).agg({
            'target': ['mean', 'std', 'count']
        }).reset_index()
        group_stats.columns = [f'{col}_target_mean', f'{col}_target_std', f'{col}_count']
        df_features = df_features.merge(group_stats, on=col, how='left')
    
    return df_features

# 3. 文本特征构建
def create_text_features(df, text_column):
    # TF-IDF特征
    tfidf = TfidfVectorizer(max_features=100)
    tfidf_features = tfidf.fit_transform(df[text_column])
    tfidf_feature_names = [f'tfidf_{i}' for i in range(tfidf_features.shape[1])]
    df_tfidf = pd.DataFrame(tfidf_features.toarray(), columns=tfidf_feature_names)
    
    # 文本统计特征
    df['text_length'] = df[text_column].str.len()
    df['word_count'] = df[text_column].str.split().str.len()
    df['char_count'] = df[text_column].str.count('')
    
    return pd.concat([df, df_tfidf], axis=1)`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 特征降维</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      特征降维用于减少特征数量，同时保留重要信息。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 特征降维方法
1. 线性降维
   - 主成分分析（PCA）
   - 线性判别分析（LDA）
   - 因子分析（FA）

2. 非线性降维
   - t-SNE
   - UMAP
   - 自编码器

3. 稀疏降维
   - 稀疏PCA
   - 稀疏自编码器
   - 字典学习

# 代码示例
import numpy as np
from sklearn.decomposition import PCA, FactorAnalysis
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
from sklearn.manifold import TSNE
import umap

# 1. 线性降维
def linear_dimension_reduction(X, y=None, method='pca', n_components=2):
    if method == 'pca':
        reducer = PCA(n_components=n_components)
        return reducer.fit_transform(X)
    elif method == 'lda' and y is not None:
        reducer = LinearDiscriminantAnalysis(n_components=n_components)
        return reducer.fit_transform(X, y)
    elif method == 'fa':
        reducer = FactorAnalysis(n_components=n_components)
        return reducer.fit_transform(X)
    else:
        raise ValueError("Invalid linear dimension reduction method")

# 2. 非线性降维
def nonlinear_dimension_reduction(X, method='tsne', n_components=2):
    if method == 'tsne':
        reducer = TSNE(n_components=n_components)
        return reducer.fit_transform(X)
    elif method == 'umap':
        reducer = umap.UMAP(n_components=n_components)
        return reducer.fit_transform(X)
    else:
        raise ValueError("Invalid nonlinear dimension reduction method")

# 3. 稀疏降维
def sparse_dimension_reduction(X, method='sparse_pca', n_components=2):
    if method == 'sparse_pca':
        from sklearn.decomposition import SparsePCA
        reducer = SparsePCA(n_components=n_components)
        return reducer.fit_transform(X)
    else:
        raise ValueError("Invalid sparse dimension reduction method")

# 实际应用示例
def reduce_dimensions(X, y=None, method='pca', n_components=2):
    if method in ['pca', 'lda', 'fa']:
        return linear_dimension_reduction(X, y, method, n_components)
    elif method in ['tsne', 'umap']:
        return nonlinear_dimension_reduction(X, method, n_components)
    elif method in ['sparse_pca']:
        return sparse_dimension_reduction(X, method, n_components)
    else:
        raise ValueError("Invalid dimension reduction method")`}
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
          href="/study/ai/datamining/basic"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回数据挖掘基础
        </Link>
        <Link 
          href="/study/ai/datamining/feature-engineering"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          特征工程 →
        </Link>
      </div>
    </div>
  );
} 
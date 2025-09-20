'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FeatureEngineeringPage() {
  const [activeTab, setActiveTab] = useState('selection');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'selection', label: '特征选择' },
    { id: 'construction', label: '特征构建' },
    { id: 'reduction', label: '特征降维' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">特征工程</h1>
      
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
        {activeTab === 'selection' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">特征选择</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 过滤法（Filter）</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      过滤法是一种基于特征统计特性的特征选择方法，不依赖于具体的机器学习算法。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 过滤法特征选择
1. 方差分析
   - 删除方差接近0的特征
   - 适用于数值型特征
   - 简单高效

2. 相关性分析
   - 计算特征与目标变量的相关性
   - 选择相关性强的特征
   - 适用于数值型特征

3. 信息增益
   - 计算特征的信息增益
   - 选择信息增益大的特征
   - 适用于分类问题

4. 卡方检验
   - 计算特征与目标变量的卡方值
   - 选择卡方值大的特征
   - 适用于分类问题

# 代码示例
import numpy as np
import pandas as pd
from sklearn.feature_selection import (
    VarianceThreshold, SelectKBest, f_classif,
    mutual_info_classif, chi2
)

# 1. 方差分析
def variance_selection(X, threshold=0.01):
    selector = VarianceThreshold(threshold=threshold)
    return selector.fit_transform(X)

# 2. 相关性分析
def correlation_selection(X, y, k=10):
    selector = SelectKBest(f_classif, k=k)
    return selector.fit_transform(X, y)

# 3. 信息增益
def information_gain_selection(X, y, k=10):
    selector = SelectKBest(mutual_info_classif, k=k)
    return selector.fit_transform(X, y)

# 4. 卡方检验
def chi2_selection(X, y, k=10):
    selector = SelectKBest(chi2, k=k)
    return selector.fit_transform(X, y)

# 实际应用示例
def filter_feature_selection(X, y, method='variance', **kwargs):
    if method == 'variance':
        return variance_selection(X, **kwargs)
    elif method == 'correlation':
        return correlation_selection(X, y, **kwargs)
    elif method == 'information_gain':
        return information_gain_selection(X, y, **kwargs)
    elif method == 'chi2':
        return chi2_selection(X, y, **kwargs)
    else:
        raise ValueError("Invalid filter method")`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 包装法（Wrapper）</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      包装法是一种基于具体机器学习算法的特征选择方法，通过评估特征子集的性能来选择特征。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 包装法特征选择
1. 递归特征消除（RFE）
   - 递归地删除特征
   - 基于模型的特征重要性
   - 适用于任何模型

2. 前向选择
   - 逐步添加特征
   - 评估每个特征的影响
   - 适用于特征数量较少

3. 后向消除
   - 逐步删除特征
   - 评估每个特征的影响
   - 适用于特征数量较多

4. 遗传算法
   - 模拟自然选择过程
   - 优化特征子集
   - 适用于大规模特征选择

# 代码示例
import numpy as np
from sklearn.feature_selection import RFE
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score

# 1. 递归特征消除
def recursive_feature_elimination(X, y, n_features_to_select=10):
    estimator = RandomForestClassifier(n_estimators=100)
    selector = RFE(estimator, n_features_to_select=n_features_to_select)
    return selector.fit_transform(X, y)

# 2. 前向选择
def forward_selection(X, y, n_features_to_select=10):
    n_features = X.shape[1]
    selected_features = []
    
    for i in range(n_features_to_select):
        best_score = -np.inf
        best_feature = None
        
        for feature in range(n_features):
            if feature not in selected_features:
                current_features = selected_features + [feature]
                X_subset = X[:, current_features]
                score = cross_val_score(
                    LogisticRegression(),
                    X_subset,
                    y,
                    cv=5
                ).mean()
                
                if score > best_score:
                    best_score = score
                    best_feature = feature
        
        selected_features.append(best_feature)
    
    return X[:, selected_features]

# 3. 后向消除
def backward_elimination(X, y, n_features_to_select=10):
    n_features = X.shape[1]
    selected_features = list(range(n_features))
    
    while len(selected_features) > n_features_to_select:
        worst_score = np.inf
        worst_feature = None
        
        for feature in selected_features:
            current_features = selected_features.copy()
            current_features.remove(feature)
            X_subset = X[:, current_features]
            score = cross_val_score(
                LogisticRegression(),
                X_subset,
                y,
                cv=5
            ).mean()
            
            if score < worst_score:
                worst_score = score
                worst_feature = feature
        
        selected_features.remove(worst_feature)
    
    return X[:, selected_features]

# 实际应用示例
def wrapper_feature_selection(X, y, method='rfe', **kwargs):
    if method == 'rfe':
        return recursive_feature_elimination(X, y, **kwargs)
    elif method == 'forward':
        return forward_selection(X, y, **kwargs)
    elif method == 'backward':
        return backward_elimination(X, y, **kwargs)
    else:
        raise ValueError("Invalid wrapper method")`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 嵌入法（Embedded）</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      嵌入法是一种将特征选择过程嵌入到模型训练过程中的方法。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 嵌入法特征选择
1. Lasso正则化
   - 使用L1正则化
   - 自动进行特征选择
   - 适用于线性模型

2. Ridge正则化
   - 使用L2正则化
   - 缩小特征系数
   - 适用于线性模型

3. 决策树特征重要性
   - 基于特征对不纯度的贡献
   - 适用于决策树模型
   - 可以处理非线性关系

4. 随机森林特征重要性
   - 基于特征对预测的贡献
   - 适用于随机森林模型
   - 可以处理高维特征

# 代码示例
import numpy as np
from sklearn.linear_model import Lasso, Ridge
from sklearn.ensemble import RandomForestClassifier
from sklearn.feature_selection import SelectFromModel

# 1. Lasso正则化
def lasso_selection(X, y, alpha=0.01):
    selector = SelectFromModel(Lasso(alpha=alpha))
    return selector.fit_transform(X, y)

# 2. Ridge正则化
def ridge_selection(X, y, alpha=1.0):
    selector = SelectFromModel(Ridge(alpha=alpha))
    return selector.fit_transform(X, y)

# 3. 决策树特征重要性
def tree_importance_selection(X, y, threshold='median'):
    selector = SelectFromModel(
        RandomForestClassifier(n_estimators=100),
        threshold=threshold
    )
    return selector.fit_transform(X, y)

# 4. 随机森林特征重要性
def forest_importance_selection(X, y, threshold='median'):
    selector = SelectFromModel(
        RandomForestClassifier(n_estimators=100),
        threshold=threshold
    )
    return selector.fit_transform(X, y)

# 实际应用示例
def embedded_feature_selection(X, y, method='lasso', **kwargs):
    if method == 'lasso':
        return lasso_selection(X, y, **kwargs)
    elif method == 'ridge':
        return ridge_selection(X, y, **kwargs)
    elif method == 'tree':
        return tree_importance_selection(X, y, **kwargs)
    elif method == 'forest':
        return forest_importance_selection(X, y, **kwargs)
    else:
        raise ValueError("Invalid embedded method")`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'construction' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">特征构建</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 数值特征组合</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      数值特征组合是通过数学运算将多个数值特征组合成新的特征。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 数值特征组合方法
1. 基本运算
   - 加减乘除
   - 幂运算
   - 对数运算

2. 多项式特征
   - 二次项
   - 三次项
   - 交互项

3. 统计特征
   - 均值
   - 方差
   - 分位数

# 代码示例
import numpy as np
import pandas as pd
from sklearn.preprocessing import PolynomialFeatures

# 1. 基本运算
def basic_operations(df, columns):
    df_features = df.copy()
    
    # 加减乘除
    for i in range(len(columns)):
        for j in range(i+1, len(columns)):
            col1, col2 = columns[i], columns[j]
            df_features[f'{col1}_plus_{col2}'] = df[col1] + df[col2]
            df_features[f'{col1}_minus_{col2}'] = df[col1] - df[col2]
            df_features[f'{col1}_times_{col2}'] = df[col1] * df[col2]
            df_features[f'{col1}_div_{col2}'] = df[col1] / df[col2]
    
    # 幂运算
    for col in columns:
        df_features[f'{col}_squared'] = df[col] ** 2
        df_features[f'{col}_cubed'] = df[col] ** 3
    
    # 对数运算
    for col in columns:
        df_features[f'{col}_log'] = np.log1p(df[col])
    
    return df_features

# 2. 多项式特征
def polynomial_features(df, columns, degree=2):
    poly = PolynomialFeatures(degree=degree, include_bias=False)
    poly_features = poly.fit_transform(df[columns])
    poly_feature_names = [f'poly_{i}' for i in range(poly_features.shape[1])]
    return pd.DataFrame(poly_features, columns=poly_feature_names)

# 3. 统计特征
def statistical_features(df, columns):
    df_features = df.copy()
    
    # 均值
    df_features['mean'] = df[columns].mean(axis=1)
    
    # 方差
    df_features['var'] = df[columns].var(axis=1)
    
    # 分位数
    df_features['q25'] = df[columns].quantile(0.25, axis=1)
    df_features['q75'] = df[columns].quantile(0.75, axis=1)
    
    return df_features

# 实际应用示例
def create_numerical_features(df, columns, method='basic', **kwargs):
    if method == 'basic':
        return basic_operations(df, columns)
    elif method == 'polynomial':
        return polynomial_features(df, columns, **kwargs)
    elif method == 'statistical':
        return statistical_features(df, columns)
    else:
        raise ValueError("Invalid numerical feature construction method")`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 类别特征组合</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      类别特征组合是通过组合多个类别特征来创建新的特征。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 类别特征组合方法
1. 特征交叉
   - 两两组合
   - 多特征组合
   - 条件组合

2. 分组统计
   - 计数统计
   - 比例统计
   - 条件统计

3. 目标编码
   - 均值编码
   - 概率编码
   - 计数编码

# 代码示例
import pandas as pd
import numpy as np

# 1. 特征交叉
def feature_crossing(df, columns):
    df_features = df.copy()
    
    # 两两组合
    for i in range(len(columns)):
        for j in range(i+1, len(columns)):
            col1, col2 = columns[i], columns[j]
            df_features[f'{col1}_{col2}_cross'] = df[col1].astype(str) + '_' + df[col2].astype(str)
    
    # 多特征组合
    if len(columns) > 2:
        df_features['multi_cross'] = df[columns].apply(
            lambda x: '_'.join(x.astype(str)),
            axis=1
        )
    
    return df_features

# 2. 分组统计
def group_statistics(df, group_columns, value_columns):
    df_features = df.copy()
    
    # 计数统计
    for col in group_columns:
        group_counts = df.groupby(col).size().reset_index(name=f'{col}_count')
        df_features = df_features.merge(group_counts, on=col, how='left')
    
    # 比例统计
    for col in group_columns:
        group_ratios = df.groupby(col).size().reset_index(name=f'{col}_ratio')
        group_ratios[f'{col}_ratio'] = group_ratios[f'{col}_ratio'] / len(df)
        df_features = df_features.merge(group_ratios, on=col, how='left')
    
    # 条件统计
    for col in group_columns:
        for val_col in value_columns:
            group_means = df.groupby(col)[val_col].mean().reset_index(name=f'{col}_{val_col}_mean')
            df_features = df_features.merge(group_means, on=col, how='left')
    
    return df_features

# 3. 目标编码
def target_encoding(df, columns, target_col):
    df_features = df.copy()
    
    # 均值编码
    for col in columns:
        target_means = df.groupby(col)[target_col].mean().reset_index(name=f'{col}_target_mean')
        df_features = df_features.merge(target_means, on=col, how='left')
    
    # 概率编码
    for col in columns:
        target_probs = df.groupby(col)[target_col].mean().reset_index(name=f'{col}_target_prob')
        df_features = df_features.merge(target_probs, on=col, how='left')
    
    # 计数编码
    for col in columns:
        target_counts = df.groupby(col)[target_col].count().reset_index(name=f'{col}_target_count')
        df_features = df_features.merge(target_counts, on=col, how='left')
    
    return df_features

# 实际应用示例
def create_categorical_features(df, columns, method='cross', **kwargs):
    if method == 'cross':
        return feature_crossing(df, columns)
    elif method == 'group':
        return group_statistics(df, columns, **kwargs)
    elif method == 'target':
        return target_encoding(df, columns, **kwargs)
    else:
        raise ValueError("Invalid categorical feature construction method")`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 文本特征构建</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      文本特征构建是将文本数据转换为数值特征的过程。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 文本特征构建方法
1. TF-IDF
   - 词频-逆文档频率
   - 考虑词的重要性
   - 适用于文本分类

2. 词向量
   - Word2Vec
   - GloVe
   - FastText
   - 适用于语义分析

3. 文本统计特征
   - 文本长度
   - 词数统计
   - 字符统计
   - 适用于文本分析

# 代码示例
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from gensim.models import Word2Vec
import re

# 1. TF-IDF
def tfidf_features(df, text_column, max_features=100):
    tfidf = TfidfVectorizer(max_features=max_features)
    tfidf_features = tfidf.fit_transform(df[text_column])
    tfidf_feature_names = [f'tfidf_{i}' for i in range(tfidf_features.shape[1])]
    return pd.DataFrame(tfidf_features.toarray(), columns=tfidf_feature_names)

# 2. 词向量
def word2vec_features(df, text_column, vector_size=100):
    # 分词
    sentences = df[text_column].apply(lambda x: x.split())
    
    # 训练Word2Vec模型
    model = Word2Vec(sentences, vector_size=vector_size, window=5, min_count=1)
    
    # 获取文档向量
    def get_document_vector(text):
        words = text.split()
        word_vectors = [model.wv[word] for word in words if word in model.wv]
        if word_vectors:
            return np.mean(word_vectors, axis=0)
        return np.zeros(vector_size)
    
    # 创建特征
    word2vec_features = df[text_column].apply(get_document_vector)
    word2vec_feature_names = [f'word2vec_{i}' for i in range(vector_size)]
    return pd.DataFrame(word2vec_features.tolist(), columns=word2vec_feature_names)

# 3. 文本统计特征
def text_statistical_features(df, text_column):
    df_features = df.copy()
    
    # 文本长度
    df_features['text_length'] = df[text_column].str.len()
    
    # 词数统计
    df_features['word_count'] = df[text_column].str.split().str.len()
    
    # 字符统计
    df_features['char_count'] = df[text_column].str.count('')
    
    # 特殊字符统计
    df_features['special_char_count'] = df[text_column].str.count(r'[^a-zA-Z0-9\s]')
    
    # 数字统计
    df_features['digit_count'] = df[text_column].str.count(r'\d')
    
    # 大写字母统计
    df_features['upper_case_count'] = df[text_column].str.count(r'[A-Z]')
    
    return df_features

# 实际应用示例
def create_text_features(df, text_column, method='tfidf', **kwargs):
    if method == 'tfidf':
        return tfidf_features(df, text_column, **kwargs)
    elif method == 'word2vec':
        return word2vec_features(df, text_column, **kwargs)
    elif method == 'statistical':
        return text_statistical_features(df, text_column)
    else:
        raise ValueError("Invalid text feature construction method")`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reduction' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">特征降维</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 线性降维</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      线性降维是通过线性变换将高维特征映射到低维空间。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 线性降维方法
1. 主成分分析（PCA）
   - 基于方差最大化
   - 正交变换
   - 适用于数值型特征

2. 线性判别分析（LDA）
   - 基于类别可分性
   - 有监督降维
   - 适用于分类问题

3. 因子分析（FA）
   - 基于潜在因子
   - 考虑特征相关性
   - 适用于高维数据

# 代码示例
import numpy as np
from sklearn.decomposition import PCA, FactorAnalysis
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis

# 1. 主成分分析
def pca_reduction(X, n_components=2):
    pca = PCA(n_components=n_components)
    return pca.fit_transform(X)

# 2. 线性判别分析
def lda_reduction(X, y, n_components=2):
    lda = LinearDiscriminantAnalysis(n_components=n_components)
    return lda.fit_transform(X, y)

# 3. 因子分析
def fa_reduction(X, n_components=2):
    fa = FactorAnalysis(n_components=n_components)
    return fa.fit_transform(X)

# 实际应用示例
def linear_dimension_reduction(X, y=None, method='pca', n_components=2):
    if method == 'pca':
        return pca_reduction(X, n_components)
    elif method == 'lda' and y is not None:
        return lda_reduction(X, y, n_components)
    elif method == 'fa':
        return fa_reduction(X, n_components)
    else:
        raise ValueError("Invalid linear dimension reduction method")`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 非线性降维</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      非线性降维是通过非线性变换将高维特征映射到低维空间。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 非线性降维方法
1. t-SNE
   - 基于概率分布
   - 保持局部结构
   - 适用于可视化

2. UMAP
   - 基于流形学习
   - 保持全局结构
   - 适用于大规模数据

3. 自编码器
   - 基于神经网络
   - 学习非线性映射
   - 适用于复杂数据

# 代码示例
import numpy as np
from sklearn.manifold import TSNE
import umap
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense

# 1. t-SNE
def tsne_reduction(X, n_components=2):
    tsne = TSNE(n_components=n_components)
    return tsne.fit_transform(X)

# 2. UMAP
def umap_reduction(X, n_components=2):
    reducer = umap.UMAP(n_components=n_components)
    return reducer.fit_transform(X)

# 3. 自编码器
def autoencoder_reduction(X, n_components=2):
    # 构建自编码器
    input_dim = X.shape[1]
    encoding_dim = n_components
    
    # 编码器
    encoder = Sequential([
        Dense(128, activation='relu', input_shape=(input_dim,)),
        Dense(64, activation='relu'),
        Dense(encoding_dim, activation='relu')
    ])
    
    # 解码器
    decoder = Sequential([
        Dense(64, activation='relu', input_shape=(encoding_dim,)),
        Dense(128, activation='relu'),
        Dense(input_dim, activation='sigmoid')
    ])
    
    # 自编码器
    autoencoder = Sequential([encoder, decoder])
    autoencoder.compile(optimizer='adam', loss='mse')
    
    # 训练自编码器
    autoencoder.fit(X, X, epochs=50, batch_size=32, verbose=0)
    
    # 获取降维结果
    return encoder.predict(X)

# 实际应用示例
def nonlinear_dimension_reduction(X, method='tsne', n_components=2):
    if method == 'tsne':
        return tsne_reduction(X, n_components)
    elif method == 'umap':
        return umap_reduction(X, n_components)
    elif method == 'autoencoder':
        return autoencoder_reduction(X, n_components)
    else:
        raise ValueError("Invalid nonlinear dimension reduction method")`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 稀疏降维</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      稀疏降维是通过稀疏表示将高维特征映射到低维空间。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 稀疏降维方法
1. 稀疏PCA
   - 基于L1正则化
   - 产生稀疏解
   - 适用于高维数据

2. 稀疏自编码器
   - 基于稀疏约束
   - 学习稀疏表示
   - 适用于复杂数据

3. 字典学习
   - 基于稀疏编码
   - 学习字典
   - 适用于信号处理

# 代码示例
import numpy as np
from sklearn.decomposition import SparsePCA, DictionaryLearning
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
from tensorflow.keras.regularizers import l1

# 1. 稀疏PCA
def sparse_pca_reduction(X, n_components=2):
    spca = SparsePCA(n_components=n_components)
    return spca.fit_transform(X)

# 2. 稀疏自编码器
def sparse_autoencoder_reduction(X, n_components=2):
    # 构建稀疏自编码器
    input_dim = X.shape[1]
    encoding_dim = n_components
    
    # 编码器
    encoder = Sequential([
        Dense(128, activation='relu', input_shape=(input_dim,)),
        Dense(64, activation='relu'),
        Dense(encoding_dim, activation='relu', activity_regularizer=l1(1e-5))
    ])
    
    # 解码器
    decoder = Sequential([
        Dense(64, activation='relu', input_shape=(encoding_dim,)),
        Dense(128, activation='relu'),
        Dense(input_dim, activation='sigmoid')
    ])
    
    # 自编码器
    autoencoder = Sequential([encoder, decoder])
    autoencoder.compile(optimizer='adam', loss='mse')
    
    # 训练自编码器
    autoencoder.fit(X, X, epochs=50, batch_size=32, verbose=0)
    
    # 获取降维结果
    return encoder.predict(X)

# 3. 字典学习
def dictionary_learning_reduction(X, n_components=2):
    dl = DictionaryLearning(n_components=n_components)
    return dl.fit_transform(X)

# 实际应用示例
def sparse_dimension_reduction(X, method='sparse_pca', n_components=2):
    if method == 'sparse_pca':
        return sparse_pca_reduction(X, n_components)
    elif method == 'sparse_autoencoder':
        return sparse_autoencoder_reduction(X, n_components)
    elif method == 'dictionary_learning':
        return dictionary_learning_reduction(X, n_components)
    else:
        raise ValueError("Invalid sparse dimension reduction method")`}
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
          href="/study/ai/datamining/preprocessing"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回数据预处理
        </Link>
        <Link 
          href="/study/ai/datamining/association"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          关联规则挖掘 →
        </Link>
      </div>
    </div>
  );
} 
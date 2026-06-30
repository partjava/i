'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList, TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '机器学习', chapterTitle: '面试题', chapterNumber: 10, totalChapters: 11,
  subjectHref: '/study/ai/ml',
  prevChapter: { label: '模型部署与优化', href: '/study/ai/ml/deployment' },
  nextChapter: { label: '进阶与前沿', href: '/study/ai/ml/advanced' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '理论面试题',
    left: (
      <div className="space-y-4">
        <PageTitle>机器学习面试题</PageTitle>
        <SectionTitle>机器学习基础</SectionTitle>
        <BookParagraph>
          <b>1. 监督学习 vs 无监督学习</b>
        </BookParagraph>
        <BookParagraph>
          <b>问题：</b>请解释监督学习和无监督学习的主要区别，并各举两个实际应用场景。
        </BookParagraph>
        <BookParagraph><b>参考答案：</b></BookParagraph>
        <BookList items={[
          <>监督学习：使用标记数据进行训练，目标是学习输入到输出的映射关系
            <BookList items={['应用场景：图像分类、垃圾邮件检测']} tight />
          </>,
          <>无监督学习：使用未标记数据，目标是发现数据中的模式和结构
            <BookList items={['应用场景：客户分群、异常检测']} tight />
          </>,
        ]} />
        <BookParagraph>
          <b>2. 过拟合与欠拟合</b>
        </BookParagraph>
        <BookParagraph>
          <b>问题：</b>什么是过拟合和欠拟合？如何识别和解决这些问题？
        </BookParagraph>
        <BookParagraph><b>参考答案：</b></BookParagraph>
        <BookList items={[
          <>过拟合：模型在训练集上表现很好，但在测试集上表现差
            <BookList items={['解决方法：正则化、交叉验证、早停']} tight />
          </>,
          <>欠拟合：模型在训练集和测试集上表现都不好
            <BookList items={['解决方法：增加模型复杂度、特征工程']} tight />
          </>,
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>算法与模型</SectionTitle>
        <BookParagraph>
          <b>3. 决策树与随机森林</b>
        </BookParagraph>
        <BookParagraph>
          <b>问题：</b>解释决策树和随机森林的工作原理，以及它们的优缺点。
        </BookParagraph>
        <BookParagraph><b>参考答案：</b></BookParagraph>
        <BookList items={[
          <>决策树：
            <BookList items={[
              '优点：易于理解和解释、可处理非线性关系',
              '缺点：容易过拟合、对数据敏感',
            ]} tight />
          </>,
          <>随机森林：
            <BookList items={[
              '优点：抗过拟合、稳定性好、可处理高维数据',
              '缺点：计算成本高、模型解释性较差',
            ]} tight />
          </>,
        ]} />
        <TagGrid items={['监督学习', '无监督学习', '过拟合', '欠拟合', '决策树', '随机森林']} />
      </div>
    ),
  },
  {
    label: '代码面试题',
    left: (
      <div className="space-y-4">
        <PageTitle>代码实践面试题</PageTitle>
        <BookParagraph><b>1. 手写K-Means聚类</b></BookParagraph>
        <BookParagraph>
          不使用sklearn，手动实现K-means聚类算法。
        </BookParagraph>
        <BookCode language="python" code={`import numpy as np

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

    return labels, centroids`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookParagraph><b>2. 手写K折交叉验证</b></BookParagraph>
        <BookParagraph>
          实现K折交叉验证，不使用sklearn。
        </BookParagraph>
        <BookCode language="python" code={`def k_fold_cross_validation(X, y, k, model):
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

    return np.mean(scores), np.std(scores)`} />
        <TagGrid items={['K-Means', '交叉验证', '手写算法', '面试', '代码']} />
      </div>
    ),
  },
  {
    label: '例题练习',
    left: (
      <div className="space-y-4">
        <PageTitle>实战练习</PageTitle>
        <SectionTitle>题目一：特征工程</SectionTitle>
        <BookParagraph>
          实现一个特征工程类，完成以下任务：
        </BookParagraph>
        <BookList ordered items={[
          '处理缺失值',
          '特征编码',
          '特征选择',
          '特征缩放',
          '特征交互',
        ]} />
        <BookParagraph><b>参考答案：</b></BookParagraph>
        <BookCode language="python" code={`import numpy as np
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
    print("交互特征:", X_with_interactions.columns.tolist())`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>题目二：模型调优</SectionTitle>
        <BookParagraph>
          实现一个模型调优类，完成以下任务：
        </BookParagraph>
        <BookList ordered items={[
          '超参数搜索',
          '交叉验证',
          '学习曲线分析',
          '特征重要性分析',
          '模型集成',
        ]} />
        <BookParagraph><b>参考答案：</b></BookParagraph>
        <BookCode language="python" code={`import numpy as np
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
    print("集成模型准确率:", accuracy)`} />
        <TagGrid items={['特征工程', '模型调优', 'Pipeline', 'GridSearch', '特征选择', '集成学习']} />
      </div>
    ),
  },
]

export default function MlInterviewPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }

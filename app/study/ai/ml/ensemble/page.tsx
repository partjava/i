'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList, TagGrid, BookAlert,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '机器学习', chapterTitle: '集成学习', chapterNumber: 7, totalChapters: 11,
  subjectHref: '/study/ai/ml',
  prevChapter: { label: '特征工程', href: '/study/ai/ml/feature-engineering' },
  nextChapter: { label: '机器学习实战案例', href: '/study/ai/ml/cases' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '理论知识',
    left: (
      <div className="space-y-4">
        <PageTitle>集成学习</PageTitle>
        <SectionTitle>什么是集成学习？</SectionTitle>
        <BookParagraph>集成学习就像是'三个臭皮匠，顶个诸葛亮'。单个模型（基学习器）可能有各种偏差和局限，但通过组合多个不同的模型，让它们'投票'或'协作'，往往能得到比任何单个模型都更好的预测效果。集成学习是机器学习竞赛（如Kaggle）中的核心技术。</BookParagraph>
        <BookAlert type="info" message="想象你在参加一个知识竞赛。你一个人可能答对80%的题，但如果找来三个擅长不同领域的队友：Alice精通数学、Bob擅长历史、Carol熟悉地理，你们小组讨论后一起作答，正确率可能飙升到95%。集成学习就是'组建最强团队'的策略——每个模型各有所长，合在一起就无敌了。" />
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="bg-azure-pale/30 rounded-lg p-3 border border-azure/20">
            <h4 className="text-xs font-semibold text-ink mb-2">Bagging</h4>
            <BookList tight items={['并行训练多个同质模型', '通过Bootstrap采样降低方差', '代表：随机森林']} />
          </div>
          <div className="bg-azure-pale/30 rounded-lg p-3 border border-azure/20">
            <h4 className="text-xs font-semibold text-ink mb-2">Boosting</h4>
            <BookList tight items={['串行训练，逐步纠正错误', '重点关注之前分错的样本', '代表：XGBoost、LightGBM']} />
          </div>
          <div className="bg-azure-pale/30 rounded-lg p-3 border border-azure/20">
            <h4 className="text-xs font-semibold text-ink mb-2">Stacking</h4>
            <BookList tight items={['组合异构模型的预测结果', '元学习器学习最佳组合方式', '进阶策略，效果通常更好']} />
          </div>
        </div>
        <SectionTitle>常见的集成学习方法</SectionTitle>
        <BookParagraph><b>1. 随机森林（Random Forest）：</b>基于Bagging思想构建多棵决策树，每棵树在随机采样的数据和随机选择的特征上训练，最终取平均（回归）或投票（分类）。</BookParagraph>
        <div className="text-xs text-ink-lighter pl-4 border-l-2 border-amber/30 mb-3"><b>实践案例 - 信用评分：</b>银行用随机森林评估贷款申请。每棵树看到的是不同的用户特征子集：有的侧重收入，有的侧重历史信用，有的侧重职业稳定性。综合所有树的判断，模型准确率从单棵决策树的72%提升到89%。</div>
        <BookList tight items={['优点：抗过拟合能力强，不需要特征缩放', '缺点：模型较大，预测速度较慢', '适用场景：分类问题、特征重要性分析']} />
        <BookParagraph><b>2. XGBoost（极致梯度提升）：</b>基于Boosting思想的梯度提升框架，通过逐步添加决策树来纠正前一步的残差，是目前最流行的机器学习算法之一。</BookParagraph>
        <div className="text-xs text-ink-lighter pl-4 border-l-2 border-amber/30 mb-3"><b>实践案例 - 房价预测：</b>第一棵树根据面积预测房价为300万，残差是+50万；第二棵树专门学习残差，预测+30万；第三棵树预测剩余残差。三棵树加总得380万，比单棵树准确得多。Kaggle房价预测竞赛中，XGBoost是冠军标配。</div>
        <BookList tight items={['优点：预测精度高，自带正则化防止过拟合', '缺点：超参数较多，调参复杂', '适用场景：回归问题、分类问题、排序问题']} />
        <BookParagraph><b>3. LightGBM（轻量级梯度提升）：</b>微软推出的高效梯度提升框架，采用基于直方图的算法和叶节点生长策略，训练速度相比XGBoost大幅提升。</BookParagraph>
        <div className="text-xs text-ink-lighter pl-4 border-l-2 border-amber/30 mb-3"><b>实践案例 - 用户行为预测：</b>某互联网公司需要预测用户点击率，数据规模达到100万用户×1000维特征。XGBoost训练需要6小时，LightGBM只需40分钟，精度还提高了0.5%。大数据场景下LightGBM是更优选择。</div>
        <BookList tight items={['优点：训练速度快，内存占用少，支持类别特征', '缺点：数据量较小容易过拟合', '适用场景：大规模数据、高维特征、分类/回归/排序']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <TagGrid items={['Bagging', 'Boosting', 'Stacking', '随机森林', 'XGBoost', 'LightGBM']} />
      </div>
    ),
  },
  {
    label: '代码实践',
    left: (
      <div className="space-y-4">
        <PageTitle>集成学习代码实践</PageTitle>
        <BookCode language="python" code={`import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import xgboost as xgb
import lightgbm as lgb

# 1. 准备数据
data = {
    '年龄': [25, 35, 45, 55, 65],
    '收入': [5000, 8000, 12000, 15000, 20000],
    '工作年限': [2, 5, 10, 15, 20],
    '信用评分': [1, 1, 0, 0, 1]
}
df = pd.DataFrame(data)

X = df[['年龄', '收入', '工作年限']]
y = df['信用评分']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 随机森林
rf_model = RandomForestClassifier(n_estimators=100, max_depth=5, random_state=42)
rf_model.fit(X_train, y_train)
rf_pred = rf_model.predict(X_test)
print("随机森林准确率:", accuracy_score(y_test, rf_pred))

# XGBoost
xgb_model = xgb.XGBClassifier(n_estimators=100, max_depth=5, learning_rate=0.1, random_state=42)
xgb_model.fit(X_train, y_train)
xgb_pred = xgb_model.predict(X_test)
print("XGBoost准确率:", accuracy_score(y_test, xgb_pred))

# LightGBM
lgb_model = lgb.LGBMClassifier(n_estimators=100, max_depth=5, learning_rate=0.1, random_state=42)
lgb_model.fit(X_train, y_train)
lgb_pred = lgb_model.predict(X_test)
print("LightGBM准确率:", accuracy_score(y_test, lgb_pred))

# 模型集成（投票）
def ensemble_predict(models, X):
    predictions = []
    for model in models:
        pred = model.predict(X)
        predictions.append(pred)
    return np.apply_along_axis(
        lambda x: np.argmax(np.bincount(x)),
        axis=0,
        arr=np.array(predictions)
    )

models = [rf_model, xgb_model, lgb_model]
ensemble_pred = ensemble_predict(models, X_test)
print("集成模型准确率:", accuracy_score(y_test, ensemble_pred))

print("\\n集成模型评估报告：")
print(classification_report(y_test, ensemble_pred))`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>实践要点</SectionTitle>
        <BookParagraph>集成学习是提升模型性能最有效的手段之一，合理使用可以获得显著的效果提升。</BookParagraph>
        <BookList items={[
          '基学习器的多样性是关键：使用不同类型的模型或不同的数据子集',
          'Boosting模型需要小心过拟合，控制学习率和树深度',
          'Stacking可以尝试多种元学习器（逻辑回归、线性模型等）',
          '实际项目中常使用交叉验证来评估集成效果',
        ]} />
        <TagGrid items={['随机森林', 'XGBoost', 'LightGBM', 'Voting', '集成策略']} />
      </div>
    ),
  },
  {
    label: '习题练习',
    left: (
      <div className="space-y-4">
        <PageTitle>例题1：信用评分预测</PageTitle>
        <BookParagraph>使用集成学习方法构建信用评分预测模型。给定用户的基本信息和信用历史，预测用户的信用等级。</BookParagraph>
        <div className="text-xs text-ink-lighter font-mono bg-paper-200/40 rounded p-2 mb-3">
          数据集示例：<br />
          用户ID | 年龄 | 月收入 | 工作年限 | 信用卡数 | 贷款次数 | 信用评分
        </div>
        <BookCode language="python" code={`import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import xgboost as xgb
import lightgbm as lgb

# 示例数据
data = {
    '用户ID': [1, 2, 3, 4, 5, 6, 7, 8],
    '年龄': [28, 35, 42, 25, 50, 32, 45, 38],
    '月收入': [8000, 15000, 20000, 6000, 30000, 10000, 25000, 18000],
    '工作年限': [3, 8, 15, 1, 20, 5, 12, 10],
    '信用卡数': [2, 3, 4, 1, 5, 2, 3, 3],
    '贷款次数': [1, 2, 0, 1, 3, 0, 2, 1],
    '信用评分': [1, 0, 0, 1, 0, 1, 0, 1]
}
df = pd.DataFrame(data)

X = df.drop(['用户ID', '信用评分'], axis=1)
y = df['信用评分']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)

# 随机森林
rf = RandomForestClassifier(n_estimators=100, max_depth=5, random_state=42)
rf.fit(X_train, y_train)
rf_pred = rf.predict(X_test)
print("随机森林准确率:", accuracy_score(y_test, rf_pred))

# XGBoost
xgb_model = xgb.XGBClassifier(n_estimators=100, max_depth=3, learning_rate=0.1, random_state=42)
xgb_model.fit(X_train, y_train)
xgb_pred = xgb_model.predict(X_test)
print("XGBoost准确率:", accuracy_score(y_test, xgb_pred))

# LightGBM
lgb_model = lgb.LGBMClassifier(n_estimators=100, max_depth=3, learning_rate=0.1, random_state=42)
lgb_model.fit(X_train, y_train)
lgb_pred = lgb_model.predict(X_test)
print("LightGBM准确率:", accuracy_score(y_test, lgb_pred))`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>例题2：房价预测集成</PageTitle>
        <BookParagraph>使用集成学习方法构建房价预测模型。给定房屋的特征信息，预测房屋价格。尝试使用加权平均组合多个回归模型的预测结果。</BookParagraph>
        <div className="text-xs text-ink-lighter font-mono bg-paper-200/40 rounded p-2 mb-3">
          数据集示例：<br />
          房屋ID | 面积 | 卧室数 | 卫生间数 | 建造年份 | 所在区域 | 距离地铁 | 价格
        </div>
        <BookCode language="python" code={`import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import xgboost as xgb
import lightgbm as lgb

# 示例数据
data = {
    '房屋ID': [1, 2, 3, 4, 5, 6, 7, 8],
    '面积': [80, 120, 150, 60, 200, 90, 110, 180],
    '卧室数': [2, 3, 3, 1, 4, 2, 3, 3],
    '卫生间数': [1, 2, 2, 1, 3, 1, 2, 2],
    '建造年份': [2000, 2010, 2020, 1995, 2023, 2005, 2015, 2018],
    '所在区域': ['朝阳', '海淀', '朝阳', '丰台', '海淀', '朝阳', '海淀', '丰台'],
    '距离地铁': [0.5, 1.2, 2.0, 0.3, 3.5, 0.8, 1.5, 2.5],
    '价格': [300, 500, 600, 200, 800, 350, 450, 700]
}
df = pd.DataFrame(data)

# 特征工程
df['房龄'] = 2024 - df['建造年份']
df = pd.get_dummies(df, columns=['所在区域'], prefix='区域')

X = df.drop(['房屋ID', '价格'], axis=1)
y = df['价格']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)

# 随机森林回归
rf_reg = RandomForestRegressor(n_estimators=100, max_depth=5, random_state=42)
rf_reg.fit(X_train, y_train)
rf_pred = rf_reg.predict(X_test)
print("RF MSE:", mean_squared_error(y_test, rf_pred))

# XGBoost回归
xgb_reg = xgb.XGBRegressor(n_estimators=100, max_depth=3, learning_rate=0.1, random_state=42)
xgb_reg.fit(X_train, y_train)
xgb_pred = xgb_reg.predict(X_test)
print("XGB MSE:", mean_squared_error(y_test, xgb_pred))

# LightGBM回归
lgb_reg = lgb.LGBMRegressor(n_estimators=100, max_depth=3, learning_rate=0.1, random_state=42)
lgb_reg.fit(X_train, y_train)
lgb_pred = lgb_reg.predict(X_test)
print("LGB MSE:", mean_squared_error(y_test, lgb_pred))

# 加权平均集成
weights = [0.3, 0.4, 0.3]  # 根据验证集表现分配权重
ensemble_pred = (weights[0] * rf_pred +
                 weights[1] * xgb_pred +
                 weights[2] * lgb_pred)
print("集成模型 MSE:", mean_squared_error(y_test, ensemble_pred))`} />
      </div>
    ),
  },
]

export default function MlEnsemblePage() { return <LessonLayout meta={META} spreads={SPREADS} /> }

'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList, TagGrid, BookAlert,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '机器学习', chapterTitle: '特征工程', chapterNumber: 6, totalChapters: 11,
  subjectHref: '/study/ai/ml',
  prevChapter: { label: '模型评估与选择', href: '/study/ai/ml/evaluation' },
  nextChapter: { label: '集成学习', href: '/study/ai/ml/ensemble' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '理论知识',
    left: (
      <div className="space-y-4">
        <PageTitle>特征工程</PageTitle>
        <SectionTitle>什么是特征工程？</SectionTitle>
        <BookParagraph>特征工程就像是给机器学习模型准备'食材'的过程。无论你的厨艺（算法）有多好，如果食材（特征）本身不新鲜、不干净，最终做出来的菜（模型）也不会好吃。特征工程就是要把原始数据'加工'成模型能够理解和有效利用的特征，这是机器学习项目中最关键也最耗时的步骤之一。</BookParagraph>
        <BookAlert type="info" message="想象你在教一个小朋友认识水果。你拿出一个苹果说'这是红色的、圆圆的、有把儿的水果'，小朋友就学会了如何识别苹果。这里的'红色'、'圆圆'、'有把儿'就是特征。特征工程就是要找出这些最有辨识度的特征，让模型能像小朋友一样快速准确地识别各种事物。" />
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="bg-azure-pale/30 rounded-lg p-3 border border-azure/20">
            <h4 className="text-xs font-semibold text-ink mb-2">特征提取</h4>
            <BookList tight items={['从原始数据中提取有用信息', '处理文本、图像、时间等', '创建新特征组合']} />
          </div>
          <div className="bg-azure-pale/30 rounded-lg p-3 border border-azure/20">
            <h4 className="text-xs font-semibold text-ink mb-2">特征转换</h4>
            <BookList tight items={['标准化和归一化处理', '对数/指数变换', '离散化与分箱']} />
          </div>
          <div className="bg-azure-pale/30 rounded-lg p-3 border border-azure/20">
            <h4 className="text-xs font-semibold text-ink mb-2">特征选择</h4>
            <BookList tight items={['过滤低重要性特征', '降低维度减少过拟合', '提升模型训练速度']} />
          </div>
        </div>
        <SectionTitle>常见的特征工程方法</SectionTitle>
        <BookParagraph><b>1. 数值型特征处理：</b>数值型特征通常需要标准化或归一化，特别是使用基于距离的算法时。</BookParagraph>
        <div className="text-xs text-ink-lighter pl-4 border-l-2 border-amber/30 mb-3"><b>实践案例 - 房价预测：</b>面积（50~500㎡）和卧室数（1~5间）量纲不同，模型会认为面积更重要。通过标准化（Z-score）让所有特征在同一尺度上，模型才能正确学习。</div>
        <BookList tight items={['标准化（StandardScaler）：将数据转换为均值为0，标准差为1', '归一化（MinMaxScaler）：将数据缩放到[0,1]区间', '对数转换：处理长尾分布，使数据更接近正态分布']} />
        <BookParagraph><b>2. 类别型特征处理：</b>机器学习模型无法直接处理文本形式的类别数据，需要将其转换为数值。</BookParagraph>
        <div className="text-xs text-ink-lighter pl-4 border-l-2 border-amber/30 mb-3"><b>实践案例 - 用户画像：</b>用户所在城市（北京、上海、广州）需要转为数值。独热编码将其变为'是否北京''是否上海''是否广州'三个特征，每个城市对应一个特征为1。</div>
        <BookList tight items={['独热编码（One-Hot Encoding）：创建虚拟变量，每个类别一列', '标签编码（Label Encoding）：将类别映射为整数（有序类别适用）', '目标编码（Target Encoding）：用目标变量的均值替换类别值']} />
        <BookParagraph><b>3. 时间特征处理：</b>时间数据具有周期性、趋势性等特性，需要特殊处理才能被模型利用。</BookParagraph>
        <div className="text-xs text-ink-lighter pl-4 border-l-2 border-amber/30 mb-3"><b>实践案例 - 销售预测：</b>分析某电商平台销售数据，提取'星期几'、'是否节假日'、'距上次促销天数'等时间特征，模型发现周五和节前销量明显上升。</div>
        <BookList tight items={['提取年/月/日/星期/小时等时间分量', '计算时间差（距上次购买天数等）', '周期性编码（用sin/cos处理周期性变化）']} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <TagGrid items={['特征提取', '特征选择', '标准化', '独热编码', 'PCA', '分箱']} />
      </div>
    ),
  },
  {
    label: '代码实践',
    left: (
      <div className="space-y-4">
        <PageTitle>特征工程代码实践</PageTitle>
        <BookCode language="python" code={`import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

# 1. 准备示例数据
data = {
    '用户ID': [1, 2, 3, 4, 5],
    '年龄': [25, 35, 45, 55, 65],
    '性别': ['男', '女', '男', '女', '男'],
    '消费金额': [1000, 2000, 3000, 4000, 5000],
    '购买时间': ['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04', '2024-01-05']
}
df = pd.DataFrame(data)

# 2. 数值型特征处理
def process_numeric_features(df):
    scaler = StandardScaler()
    df['标准化年龄'] = scaler.fit_transform(df[['年龄']])
    df['标准化消费金额'] = scaler.fit_transform(df[['消费金额']])
    df['消费金额/年龄'] = df['消费金额'] / df['年龄']
    return df

# 3. 类别型特征处理
def process_categorical_features(df):
    encoder = OneHotEncoder(sparse=False)
    gender_encoded = encoder.fit_transform(df[['性别']])
    df['性别_男'] = gender_encoded[:, 0]
    df['性别_女'] = gender_encoded[:, 1]
    return df

# 4. 时间特征处理
def process_time_features(df):
    df['购买时间'] = pd.to_datetime(df['购买时间'])
    df['购买年份'] = df['购买时间'].dt.year
    df['购买月份'] = df['购买时间'].dt.month
    df['购买星期'] = df['购买时间'].dt.dayofweek
    return df

# 5. 特征工程流水线
def feature_engineering_pipeline(df):
    df = process_numeric_features(df)
    df = process_categorical_features(df)
    df = process_time_features(df)
    return df

print("原始数据：")
print(df)
print("\\n处理后的数据：")
processed_df = feature_engineering_pipeline(df)
print(processed_df)`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>实践要点</SectionTitle>
        <BookParagraph>特征工程是机器学习项目中最关键的环节，好的特征能显著提升模型的上限。</BookParagraph>
        <BookList items={[
          '处理实际数据时需考虑缺失值和异常值',
          '高基数类别特征建议使用目标编码代替独热编码',
          '时间特征可进一步构造滞后变量和滑动窗口',
          '特征选择可以通过模型重要性或统计检验筛选',
        ]} />
        <TagGrid items={['StandardScaler', 'OneHotEncoder', '特征构建', '数据预处理', '流水线']} />
      </div>
    ),
  },
  {
    label: '习题练习',
    left: (
      <div className="space-y-4">
        <PageTitle>例题1：电商用户特征工程</PageTitle>
        <BookParagraph>某电商平台收集了用户的基本信息和行为数据，请构建特征工程流水线，提取有价值的特征用于用户价值预测。</BookParagraph>
        <div className="text-xs text-ink-lighter font-mono bg-paper-200/40 rounded p-2 mb-3">
          数据集示例：<br />
          用户ID | 注册时间 | 年龄 | 性别 | 会员等级 | 最近购买时间 | 消费金额
        </div>
        <BookCode language="python" code={`import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, OneHotEncoder, LabelEncoder

# 示例数据
data = {
    '用户ID': [101, 102, 103, 104, 105],
    '注册时间': ['2023-01-15', '2023-03-20', '2023-06-10', '2023-09-05', '2024-01-01'],
    '年龄': [28, 35, 42, 31, 26],
    '性别': ['男', '女', '女', '男', '女'],
    '会员等级': ['黄金', '铂金', '钻石', '黄金', '铂金'],
    '最近购买时间': ['2024-06-01', '2024-05-15', '2024-06-10', '2024-03-20', '2024-06-15'],
    '消费金额': [5000, 12000, 30000, 8000, 15000]
}
df = pd.DataFrame(data)

# 1. 时间特征：注册时长（天）
df['注册时间'] = pd.to_datetime(df['注册时间'])
current_date = pd.Timestamp('2024-06-15')
df['注册时长'] = (current_date - df['注册时间']).dt.days

# 2. 时间特征：最近购买间隔
df['最近购买时间'] = pd.to_datetime(df['最近购买时间'])
df['最近购买间隔'] = (current_date - df['最近购买时间']).dt.days

# 3. 类别编码：会员等级（有序）
level_map = {'黄金': 1, '铂金': 2, '钻石': 3}
df['会员等级编码'] = df['会员等级'].map(level_map)

# 4. 独热编码：性别
df['性别_男'] = (df['性别'] == '男').astype(int)
df['性别_女'] = (df['性别'] == '女').astype(int)

# 5. 数值标准化
scaler = StandardScaler()
df['标准化年龄'] = scaler.fit_transform(df[['年龄']])
df['标准化消费金额'] = scaler.fit_transform(df[['消费金额']])

# 6. 新特征：用户价值评分
df['用户价值'] = df['消费金额'] / (df['注册时长'] + 1)
df['购买频率'] = df['注册时长'] / (df['最近购买间隔'] + 1)

print("特征工程结果：")
print(df[['用户ID', '注册时长', '最近购买间隔', '会员等级编码',
          '标准化年龄', '标准化消费金额', '用户价值', '购买频率']])`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <PageTitle>例题2：房价预测特征工程</PageTitle>
        <BookParagraph>给定房屋数据，构建特征工程流水线，为房价预测模型准备高质量特征。</BookParagraph>
        <div className="text-xs text-ink-lighter font-mono bg-paper-200/40 rounded p-2 mb-3">
          数据集示例：<br />
          房屋ID | 面积 | 卧室数 | 卫生间数 | 建造年份 | 所在区域 | 距离地铁 | 价格
        </div>
        <BookCode language="python" code={`import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, OneHotEncoder

# 示例数据
data = {
    '房屋ID': [1, 2, 3, 4, 5],
    '面积': [80, 120, 150, 60, 200],
    '卧室数': [2, 3, 3, 1, 4],
    '卫生间数': [1, 2, 2, 1, 3],
    '建造年份': [2000, 2010, 2020, 1995, 2023],
    '所在区域': ['朝阳', '海淀', '朝阳', '丰台', '海淀'],
    '距离地铁': [0.5, 1.2, 2.0, 0.3, 3.5],
    '价格': [300, 500, 600, 200, 800]
}
df = pd.DataFrame(data)

# 1. 数值标准化
scaler = StandardScaler()
df['标准化面积'] = scaler.fit_transform(df[['面积']])
df['标准化距离地铁'] = scaler.fit_transform(df[['距离地铁']])

# 2. 构造房龄
current_year = 2024
df['房龄'] = current_year - df['建造年份']

# 3. 区域独热编码
area_dummies = pd.get_dummies(df['所在区域'], prefix='区域')
df = pd.concat([df, area_dummies], axis=1)

# 4. 新特征：单价
df['单价'] = df['价格'] / df['面积']

# 5. 新特征：房间密度
df['房间密度'] = (df['卧室数'] + df['卫生间数']) / df['面积']

# 6. 新特征：交通便利度
df['交通便利度'] = 1 / (df['距离地铁'] + 0.1)

# 7. 特征交互
df['区域房龄'] = df['房龄']
for area in ['朝阳', '海淀', '丰台']:
    df[f'区域_{area}_房龄'] = df[f'区域_{area}'] * df['房龄']

print("特征工程结果：")
feature_cols = ['房屋ID', '标准化面积', '标准化距离地铁', '房龄', '单价',
                '房间密度', '交通便利度']
print(df[feature_cols])`} />
      </div>
    ),
  },
]

export default function MlFeatureEngineeringPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }

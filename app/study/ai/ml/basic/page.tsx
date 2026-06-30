'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList, TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '机器学习',
  chapterTitle: '机器学习基础',
  chapterNumber: 1,
  totalChapters: 11,
  subjectHref: '/study/ai/ml',
  nextChapter: { label: '机器学习项目流程', href: '/study/ai/ml/workflow' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '理论知识',
    left: (<div className="space-y-4"><PageTitle>什么是机器学习？</PageTitle><BookParagraph>机器学习是人工智能的一个分支，它使计算机系统能够从数据中学习和改进，而无需明确编程。通过算法和统计模型，机器可以从经验中学习，并随着数据的增加而不断改进。</BookParagraph><SectionTitle>主要类型</SectionTitle><BookList items={['监督学习：通过标记数据学习输入到输出的映射关系', '无监督学习：从未标记数据中发现隐藏的模式和结构', '强化学习：通过与环境交互学习最优策略']} /><SectionTitle>应用场景</SectionTitle><BookList items={['图像识别：人脸识别、物体检测', '自然语言处理：机器翻译、情感分析', '推荐系统：个性化推荐、内容分发', '预测分析：股票预测、天气预测']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>机器学习工作流程</SectionTitle><BookParagraph><b>1. 数据收集与预处理：</b>收集数据、清洗数据、特征工程、数据标准化</BookParagraph><BookList items={['数据清洗：处理缺失值、异常值', '特征工程：特征选择、特征转换', '数据标准化：归一化、标准化']} /><BookParagraph><b>2. 模型选择与训练：</b>选择合适的算法、训练模型、参数调优</BookParagraph><BookList items={['算法选择：根据问题类型选择合适的算法', '模型训练：使用训练数据训练模型', '参数调优：使用交叉验证优化模型参数']} /><BookParagraph><b>3. 模型评估与优化：</b>评估模型性能、优化模型、部署应用</BookParagraph><BookList items={['性能评估：准确率、精确率、召回率等指标', '模型优化：过拟合处理、欠拟合处理', '模型部署：模型保存、API接口开发']} /><TagGrid items={['监督学习', '无监督学习', '强化学习', '工作流程', '评估']} /></div>),
  },
  {
    label: '工具与环境',
    left: (<div className="space-y-4"><PageTitle>机器学习工具与框架</PageTitle><BookParagraph><b>NumPy：</b>科学计算基础库，提供多维数组和矩阵运算</BookParagraph><BookParagraph><b>Pandas：</b>数据分析库，提供数据结构和数据分析工具</BookParagraph><BookParagraph><b>Scikit-learn：</b>机器学习算法库，提供各种机器学习算法实现</BookParagraph></div>),
    right: (<div className="space-y-4"><SectionTitle>环境配置</SectionTitle><BookCode language="bash" code={`# 创建虚拟环境
python -m venv ml_env

# 激活虚拟环境
# Windows
ml_env\\Scripts\\activate
# Linux/Mac
source ml_env/bin/activate

# 安装必要的包
pip install numpy pandas scikit-learn matplotlib jupyter`} /><TagGrid items={['NumPy', 'Pandas', 'Scikit-learn', 'Jupyter', '环境配置']} /></div>),
  },
  {
    label: '代码实践',
    left: (<div className="space-y-4"><PageTitle>第一个机器学习程序</PageTitle><BookCode language="python" code={`import numpy as np
import pandas as pd
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

# 加载数据
iris = load_iris()
X = iris.data
y = iris.target

# 划分训练集和测试集
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 创建并训练模型
model = LogisticRegression()
model.fit(X_train, y_train)

# 预测并评估
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"模型准确率: {accuracy:.2f}")`} /></div>),
    right: (<div className="space-y-4"><SectionTitle>数据可视化示例</SectionTitle><BookCode language="python" code={`import matplotlib.pyplot as plt
import seaborn as sns

# 创建数据
data = pd.DataFrame(iris.data, columns=iris.feature_names)
data['target'] = iris.target

# 绘制散点图
plt.figure(figsize=(10, 6))
sns.scatterplot(
    data=data,
    x='sepal length (cm)',
    y='sepal width (cm)',
    hue='target'
)
plt.title('鸢尾花数据集散点图')
plt.show()`} /><TagGrid items={['Python', 'Scikit-learn', 'Logistic回归', 'Iris', '可视化']} /></div>),
  },
]

export default function MlBasicPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }

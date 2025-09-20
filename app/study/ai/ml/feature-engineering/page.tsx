'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaRobot, FaBrain, FaChartLine, FaCode, FaLightbulb, FaNetworkWired, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { SiScikitlearn, SiPandas, SiNumpy } from 'react-icons/si';

export default function FeatureEngineeringPage() {
  const [activeTab, setActiveTab] = useState('theory');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">特征工程</h1>
      
      {/* 进度条 */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
      </div>

      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('theory')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'theory'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          理论知识
        </button>
        <button
          onClick={() => setActiveTab('practice')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'practice'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          代码实践
        </button>
        <button
          onClick={() => setActiveTab('exercise')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'exercise'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          例题练习
        </button>
      </div>

      {activeTab === 'theory' ? (
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">什么是特征工程？</h2>
            <p className="text-gray-700 mb-4">
              特征工程就像是给机器学习模型准备"食材"的过程。就像做菜需要把食材切好、调味一样，特征工程就是把原始数据转换成模型更容易"消化"的形式。
            </p>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-blue-800 mb-2">举个生活例子：</h3>
              <p className="text-blue-700">
                想象你在教一个小朋友认识水果。如果直接给他看整个水果，他可能很难记住。但如果你把水果切成小块，告诉他"这是甜的"、"这是酸的"，他就能更容易理解和记忆。特征工程就是做类似的事情，把复杂的数据变成模型容易理解的形式。
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">特征提取</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>从原始数据中提取有用信息</li>
                  <li>例如：从日期提取星期几</li>
                  <li>例如：从地址提取城市名</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">特征转换</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>将数据转换成合适的格式</li>
                  <li>例如：文本转数字</li>
                  <li>例如：类别转独热编码</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">特征选择</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>选择最重要的特征</li>
                  <li>例如：删除重复信息</li>
                  <li>例如：选择相关性高的特征</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">常见的特征工程方法</h2>
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full mt-1">
                  <FaChartLine className="text-blue-500 text-xl" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">1. 数值型特征处理</h3>
                  <div className="bg-gray-50 p-4 rounded-lg mt-2">
                    <h4 className="font-medium mb-2">实际例子：房价预测</h4>
                    <p className="text-gray-700 mb-2">
                      原始数据：房屋面积（平方米）、价格（万元）
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>标准化：把所有价格都转换到0-1之间</li>
                      <li>归一化：把面积和价格都调整到相同范围</li>
                      <li>对数转换：处理特别大的数值</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-full mt-1">
                  <FaBrain className="text-green-500 text-xl" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">2. 类别型特征处理</h3>
                  <div className="bg-gray-50 p-4 rounded-lg mt-2">
                    <h4 className="font-medium mb-2">实际例子：用户画像</h4>
                    <p className="text-gray-700 mb-2">
                      原始数据：用户性别、职业、兴趣爱好
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>独热编码：把性别"男/女"变成[1,0]和[0,1]</li>
                      <li>标签编码：把职业转换成数字编号</li>
                      <li>目标编码：用目标变量的平均值编码</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-full mt-1">
                  <FaNetworkWired className="text-purple-500 text-xl" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">3. 时间特征处理</h3>
                  <div className="bg-gray-50 p-4 rounded-lg mt-2">
                    <h4 className="font-medium mb-2">实际例子：销售预测</h4>
                    <p className="text-gray-700 mb-2">
                      原始数据：交易日期、时间
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>提取时间特征：年、月、日、星期几</li>
                      <li>计算时间差：距离某个重要日期的天数</li>
                      <li>周期性编码：把时间转换成循环特征</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : activeTab === 'practice' ? (
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">特征工程代码示例</h2>
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
              <pre className="overflow-x-auto text-gray-800">
                <code>{`import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

# 1. 准备示例数据
# 假设我们有一个电商数据集
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
    # 标准化
    scaler = StandardScaler()
    df['标准化年龄'] = scaler.fit_transform(df[['年龄']])
    df['标准化消费金额'] = scaler.fit_transform(df[['消费金额']])
    
    # 创建新特征
    df['消费金额/年龄'] = df['消费金额'] / df['年龄']
    
    return df

# 3. 类别型特征处理
def process_categorical_features(df):
    # 独热编码
    encoder = OneHotEncoder(sparse=False)
    gender_encoded = encoder.fit_transform(df[['性别']])
    df['性别_男'] = gender_encoded[:, 0]
    df['性别_女'] = gender_encoded[:, 1]
    
    return df

# 4. 时间特征处理
def process_time_features(df):
    # 转换日期格式
    df['购买时间'] = pd.to_datetime(df['购买时间'])
    
    # 提取时间特征
    df['购买年份'] = df['购买时间'].dt.year
    df['购买月份'] = df['购买时间'].dt.month
    df['购买星期'] = df['购买时间'].dt.dayofweek
    
    return df

# 5. 特征工程流水线
def feature_engineering_pipeline(df):
    # 数值特征处理
    df = process_numeric_features(df)
    
    # 类别特征处理
    df = process_categorical_features(df)
    
    # 时间特征处理
    df = process_time_features(df)
    
    return df

# 运行特征工程
print("原始数据：")
print(df)
print("\\n处理后的数据：")
processed_df = feature_engineering_pipeline(df)
print(processed_df)`}</code>
              </pre>
            </div>
          </section>
        </div>
      ) : (
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">例题1：电商用户特征工程</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">问题描述</h3>
                <p className="text-gray-700">
                  对电商平台的用户数据进行特征工程，为后续的用户行为预测做准备。
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">原始数据</h3>
                <pre className="overflow-x-auto text-gray-800">
                  <code>{`# 用户数据示例
用户ID  注册时间    年龄  性别  会员等级  最近购买时间  消费金额
001     2023-01-01  25   男   黄金     2024-01-15    1000
002     2023-02-01  30   女   钻石     2024-01-20    2000
003     2023-03-01  35   男   普通     2024-01-25    500
...`}</code>
                </pre>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">解决方案</h3>
                <pre className="overflow-x-auto text-gray-800">
                  <code>{`# 1. 导入必要的库
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from datetime import datetime

# 2. 加载数据
df = pd.read_csv('user_data.csv')

# 3. 时间特征处理
df['注册时间'] = pd.to_datetime(df['注册时间'])
df['最近购买时间'] = pd.to_datetime(df['最近购买时间'])

# 计算用户注册时长（天）
df['注册时长'] = (datetime.now() - df['注册时间']).dt.days

# 计算最近购买距离现在的时间（天）
df['最近购买间隔'] = (datetime.now() - df['最近购买时间']).dt.days

# 4. 类别特征处理
# 会员等级独热编码
encoder = OneHotEncoder(sparse=False)
member_level_encoded = encoder.fit_transform(df[['会员等级']])
df['会员等级_普通'] = member_level_encoded[:, 0]
df['会员等级_黄金'] = member_level_encoded[:, 1]
df['会员等级_钻石'] = member_level_encoded[:, 2]

# 性别编码
df['性别'] = df['性别'].map({'男': 1, '女': 0})

# 5. 数值特征处理
# 标准化年龄和消费金额
scaler = StandardScaler()
df['标准化年龄'] = scaler.fit_transform(df[['年龄']])
df['标准化消费金额'] = scaler.fit_transform(df[['消费金额']])

# 6. 创建新特征
# 计算用户价值
df['用户价值'] = df['消费金额'] / df['注册时长']

# 计算购买频率
df['购买频率'] = df['消费金额'] / df['最近购买间隔']

# 7. 输出处理后的特征
print("处理后的特征：")
print(df[['用户ID', '注册时长', '最近购买间隔', '标准化年龄', 
          '标准化消费金额', '用户价值', '购买频率']].head())`}</code>
                </pre>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">例题2：房价预测特征工程</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">问题描述</h3>
                <p className="text-gray-700">
                  对房屋数据进行特征工程，为房价预测模型准备特征。
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">原始数据</h3>
                <pre className="overflow-x-auto text-gray-800">
                  <code>{`# 房屋数据示例
房屋ID  面积  卧室数  卫生间数  建造年份  所在区域  距离地铁  价格
001     80    2      1        1990     海淀区    500      300
002     120   3      2        2000     朝阳区    1000     450
003     150   4      2        2010     西城区    2000     600
...`}</code>
                </pre>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">解决方案</h3>
                <pre className="overflow-x-auto text-gray-800">
                  <code>{`# 1. 导入必要的库
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from datetime import datetime

# 2. 加载数据
df = pd.read_csv('house_data.csv')

# 3. 数值特征处理
# 标准化面积和距离地铁
scaler = StandardScaler()
df['标准化面积'] = scaler.fit_transform(df[['面积']])
df['标准化距离地铁'] = scaler.fit_transform(df[['距离地铁']])

# 计算房龄
current_year = datetime.now().year
df['房龄'] = current_year - df['建造年份']

# 4. 类别特征处理
# 区域独热编码
encoder = OneHotEncoder(sparse=False)
area_encoded = encoder.fit_transform(df[['所在区域']])
df['区域_海淀'] = area_encoded[:, 0]
df['区域_朝阳'] = area_encoded[:, 1]
df['区域_西城'] = area_encoded[:, 2]

# 5. 创建新特征
# 计算每平方米价格
df['单价'] = df['价格'] / df['面积']

# 计算房间密度
df['房间密度'] = (df['卧室数'] + df['卫生间数']) / df['面积']

# 计算交通便利度（距离地铁的倒数）
df['交通便利度'] = 1 / (df['距离地铁'] + 1)  # 加1避免除零

# 6. 特征组合
# 区域和房龄的交互特征
df['区域房龄'] = df['所在区域'].astype('category').cat.codes * df['房龄']

# 7. 输出处理后的特征
print("处理后的特征：")
print(df[['房屋ID', '标准化面积', '标准化距离地铁', '房龄', 
          '单价', '房间密度', '交通便利度']].head())`}</code>
                </pre>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* 导航链接 */}
      <div className="flex justify-between mt-8">
        <Link 
          href="/study/ai/ml/evaluation"
          className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 flex items-center"
        >
          <FaArrowLeft className="mr-2" />
          上一课：模型评估与选择
        </Link>
        <Link 
          href="/study/ai/ml/ensemble"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center"
        >
          下一课：集成学习
          <FaArrowRight className="ml-2" />
        </Link>
      </div>
    </div>
  );
} 
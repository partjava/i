'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DataVisualizationPage() {
  const [activeTab, setActiveTab] = useState('basic');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'basic', label: '基本概念' },
    { id: 'tools', label: '可视化工具' },
    { id: 'applications', label: '实际应用' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">数据可视化</h1>
      
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
        {activeTab === 'basic' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">数据可视化基本概念</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 基本定义</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      数据可视化是将数据以图形化的方式展示，帮助人们更好地理解数据。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 基本概念
1. 数据可视化
   - 数据图形化
   - 信息展示
   - 交互式探索

2. 可视化类型
   - 统计图表
   - 地理信息图
   - 网络关系图
   - 时间序列图

3. 设计原则
   - 简洁性
   - 可读性
   - 交互性
   - 美观性

# 示例
数据：
sales = {
    'Jan': 100,
    'Feb': 120,
    'Mar': 150,
    'Apr': 180,
    'May': 200
}

可视化：
柱状图、折线图、饼图等`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 可视化类型</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      不同类型的数据适合不同的可视化方式。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 可视化类型
1. 统计图表
   - 柱状图：比较数值
   - 折线图：趋势分析
   - 饼图：占比分析
   - 散点图：相关性分析

2. 地理信息图
   - 地图：空间分布
   - 热力图：密度分布
   - 气泡图：多维度数据

3. 网络关系图
   - 节点图：关系网络
   - 树状图：层级结构
   - 桑基图：流向分析

4. 时间序列图
   - 折线图：趋势变化
   - 面积图：累计变化
   - 日历图：周期性变化

# 选择指南
1. 数值比较：柱状图
2. 趋势分析：折线图
3. 占比分析：饼图
4. 相关性：散点图
5. 地理分布：地图
6. 关系网络：节点图`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 设计原则</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      好的数据可视化需要遵循一定的设计原则。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 设计原则
1. 简洁性
   - 去除冗余元素
   - 突出重要信息
   - 保持视觉清晰

2. 可读性
   - 合适的字体大小
   - 清晰的标签
   - 适当的颜色对比

3. 交互性
   - 数据筛选
   - 缩放功能
   - 详细信息展示

4. 美观性
   - 协调的配色
   - 平衡的布局
   - 专业的风格

# 最佳实践
1. 选择合适的图表类型
2. 使用清晰的颜色编码
3. 添加必要的说明文字
4. 保持一致的视觉风格
5. 考虑用户交互需求`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tools' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">可视化工具</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. Matplotlib</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      Python最基础的可视化库。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# Matplotlib示例
import matplotlib.pyplot as plt
import numpy as np

# 创建数据
x = np.linspace(0, 10, 100)
y = np.sin(x)

# 创建图表
plt.figure(figsize=(10, 6))
plt.plot(x, y, 'b-', label='sin(x)')
plt.title('正弦函数')
plt.xlabel('x')
plt.ylabel('y')
plt.grid(True)
plt.legend()

# 显示图表
plt.show()

# 多子图示例
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))

# 第一个子图
ax1.plot(x, y, 'r-')
ax1.set_title('正弦函数')
ax1.grid(True)

# 第二个子图
ax2.plot(x, np.cos(x), 'g-')
ax2.set_title('余弦函数')
ax2.grid(True)

plt.tight_layout()
plt.show()`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. Seaborn</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      基于Matplotlib的统计数据可视化库。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# Seaborn示例
import seaborn as sns
import pandas as pd
import numpy as np

# 创建示例数据
np.random.seed(42)
data = pd.DataFrame({
    'A': np.random.normal(0, 1, 100),
    'B': np.random.normal(0, 1, 100),
    'C': np.random.choice(['X', 'Y', 'Z'], 100)
})

# 设置样式
sns.set_style('whitegrid')

# 创建图表
plt.figure(figsize=(12, 8))

# 散点图
sns.scatterplot(data=data, x='A', y='B', hue='C')
plt.title('散点图示例')

# 显示图表
plt.show()

# 多图表示例
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15, 5))

# 第一个子图：箱线图
sns.boxplot(data=data, x='C', y='A', ax=ax1)
ax1.set_title('箱线图')

# 第二个子图：小提琴图
sns.violinplot(data=data, x='C', y='B', ax=ax2)
ax2.set_title('小提琴图')

plt.tight_layout()
plt.show()`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. Plotly</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      交互式数据可视化库。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# Plotly示例
import plotly.express as px
import plotly.graph_objects as go
import pandas as pd
import numpy as np

# 创建示例数据
np.random.seed(42)
data = pd.DataFrame({
    'x': np.random.normal(0, 1, 100),
    'y': np.random.normal(0, 1, 100),
    'category': np.random.choice(['A', 'B', 'C'], 100)
})

# 创建散点图
fig = px.scatter(data, x='x', y='y', color='category',
                 title='交互式散点图')
fig.show()

# 创建3D散点图
fig = go.Figure(data=[go.Scatter3d(
    x=data['x'],
    y=data['y'],
    z=np.random.normal(0, 1, 100),
    mode='markers',
    marker=dict(
        size=8,
        color=data['category'].map({'A': 0, 'B': 1, 'C': 2}),
        opacity=0.8
    )
)])

fig.update_layout(title='3D散点图')
fig.show()

# 创建多图表
fig = make_subplots(rows=1, cols=2)

# 第一个子图：散点图
fig.add_trace(
    go.Scatter(x=data['x'], y=data['y'], mode='markers'),
    row=1, col=1
)

# 第二个子图：直方图
fig.add_trace(
    go.Histogram(x=data['x']),
    row=1, col=2
)

fig.update_layout(height=500, width=1000, title_text="多图表示例")
fig.show()`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">实际应用</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 销售数据分析</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      使用数据可视化分析销售数据。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 销售数据分析
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.express as px

# 加载数据
def load_sales_data(file_path):
    df = pd.read_csv(file_path)
    return df

# 数据预处理
def preprocess_sales_data(df):
    # 转换日期
    df['date'] = pd.to_datetime(df['date'])
    
    # 添加时间特征
    df['year'] = df['date'].dt.year
    df['month'] = df['date'].dt.month
    df['day'] = df['date'].dt.day
    
    return df

# 销售趋势分析
def analyze_sales_trend(df):
    # 按日期统计销售额
    daily_sales = df.groupby('date')['amount'].sum().reset_index()
    
    # 创建趋势图
    plt.figure(figsize=(12, 6))
    plt.plot(daily_sales['date'], daily_sales['amount'])
    plt.title('销售趋势')
    plt.xlabel('日期')
    plt.ylabel('销售额')
    plt.grid(True)
    plt.show()

# 产品分析
def analyze_products(df):
    # 按产品统计销售额
    product_sales = df.groupby('product')['amount'].sum().reset_index()
    
    # 创建饼图
    plt.figure(figsize=(10, 10))
    plt.pie(product_sales['amount'], labels=product_sales['product'],
            autopct='%1.1f%%')
    plt.title('产品销售占比')
    plt.show()

# 地区分析
def analyze_regions(df):
    # 按地区统计销售额
    region_sales = df.groupby('region')['amount'].sum().reset_index()
    
    # 创建柱状图
    plt.figure(figsize=(10, 6))
    sns.barplot(x='region', y='amount', data=region_sales)
    plt.title('地区销售分布')
    plt.xlabel('地区')
    plt.ylabel('销售额')
    plt.show()

# 交互式分析
def interactive_analysis(df):
    # 创建交互式散点图
    fig = px.scatter(df, x='amount', y='quantity',
                     color='product', size='amount',
                     hover_data=['date', 'region'],
                     title='销售数据交互式分析')
    fig.show()
    
    # 创建交互式热力图
    pivot_table = df.pivot_table(
        values='amount',
        index='region',
        columns='product',
        aggfunc='sum'
    )
    
    fig = px.imshow(pivot_table,
                    title='地区-产品销售额热力图')
    fig.show()

# 应用示例
def sales_analysis(file_path):
    # 加载数据
    df = load_sales_data(file_path)
    
    # 数据预处理
    df = preprocess_sales_data(df)
    
    # 分析销售趋势
    analyze_sales_trend(df)
    
    # 分析产品
    analyze_products(df)
    
    # 分析地区
    analyze_regions(df)
    
    # 交互式分析
    interactive_analysis(df)
    
    # 生成报告
    generate_sales_report(df)

# 生成销售报告
def generate_sales_report(df):
    print("\\n销售报告：")
    print("1. 总体情况：")
    print(f"- 总销售额: {df['amount'].sum():.2f}")
    print(f"- 平均销售额: {df['amount'].mean():.2f}")
    print(f"- 最大销售额: {df['amount'].max():.2f}")
    
    print("\\n2. 产品分析：")
    product_stats = df.groupby('product')['amount'].agg(['sum', 'mean', 'count'])
    print(product_stats)
    
    print("\\n3. 地区分析：")
    region_stats = df.groupby('region')['amount'].agg(['sum', 'mean', 'count'])
    print(region_stats)`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 股票数据分析</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      使用数据可视化分析股票数据。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 股票数据分析
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.graph_objects as go
from plotly.subplots import make_subplots

# 加载数据
def load_stock_data(file_path):
    df = pd.read_csv(file_path)
    return df

# 数据预处理
def preprocess_stock_data(df):
    # 转换日期
    df['date'] = pd.to_datetime(df['date'])
    
    # 计算技术指标
    df['MA5'] = df['close'].rolling(window=5).mean()
    df['MA20'] = df['close'].rolling(window=20).mean()
    df['MA60'] = df['close'].rolling(window=60).mean()
    
    return df

# K线图分析
def analyze_candlestick(df):
    # 创建K线图
    fig = go.Figure(data=[go.Candlestick(
        x=df['date'],
        open=df['open'],
        high=df['high'],
        low=df['low'],
        close=df['close']
    )])
    
    # 添加移动平均线
    fig.add_trace(go.Scatter(
        x=df['date'],
        y=df['MA5'],
        name='MA5',
        line=dict(color='blue')
    ))
    
    fig.add_trace(go.Scatter(
        x=df['date'],
        y=df['MA20'],
        name='MA20',
        line=dict(color='red')
    ))
    
    fig.update_layout(
        title='股票K线图',
        yaxis_title='价格',
        xaxis_title='日期'
    )
    
    fig.show()

# 成交量分析
def analyze_volume(df):
    # 创建成交量图
    fig = go.Figure()
    
    # 添加成交量柱状图
    fig.add_trace(go.Bar(
        x=df['date'],
        y=df['volume'],
        name='成交量'
    ))
    
    fig.update_layout(
        title='成交量分析',
        yaxis_title='成交量',
        xaxis_title='日期'
    )
    
    fig.show()

# 技术指标分析
def analyze_indicators(df):
    # 创建多子图
    fig = make_subplots(rows=2, cols=1,
                       shared_xaxes=True,
                       vertical_spacing=0.03,
                       subplot_titles=('价格', '技术指标'))
    
    # 添加K线图
    fig.add_trace(go.Candlestick(
        x=df['date'],
        open=df['open'],
        high=df['high'],
        low=df['low'],
        close=df['close']
    ), row=1, col=1)
    
    # 添加移动平均线
    fig.add_trace(go.Scatter(
        x=df['date'],
        y=df['MA5'],
        name='MA5',
        line=dict(color='blue')
    ), row=1, col=1)
    
    fig.add_trace(go.Scatter(
        x=df['date'],
        y=df['MA20'],
        name='MA20',
        line=dict(color='red')
    ), row=1, col=1)
    
    # 添加成交量
    fig.add_trace(go.Bar(
        x=df['date'],
        y=df['volume'],
        name='成交量'
    ), row=2, col=1)
    
    fig.update_layout(
        title='股票技术分析',
        yaxis_title='价格',
        xaxis_title='日期'
    )
    
    fig.show()

# 应用示例
def stock_analysis(file_path):
    # 加载数据
    df = load_stock_data(file_path)
    
    # 数据预处理
    df = preprocess_stock_data(df)
    
    # 分析K线图
    analyze_candlestick(df)
    
    # 分析成交量
    analyze_volume(df)
    
    # 分析技术指标
    analyze_indicators(df)
    
    # 生成报告
    generate_stock_report(df)

# 生成股票报告
def generate_stock_report(df):
    print("\\n股票分析报告：")
    print("1. 价格统计：")
    print(f"- 最高价: {df['high'].max():.2f}")
    print(f"- 最低价: {df['low'].min():.2f}")
    print(f"- 平均价: {df['close'].mean():.2f}")
    
    print("\\n2. 成交量统计：")
    print(f"- 最大成交量: {df['volume'].max()}")
    print(f"- 平均成交量: {df['volume'].mean():.2f}")
    
    print("\\n3. 技术指标：")
    print(f"- MA5: {df['MA5'].iloc[-1]:.2f}")
    print(f"- MA20: {df['MA20'].iloc[-1]:.2f}")
    print(f"- MA60: {df['MA60'].iloc[-1]:.2f}")`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 地理数据可视化</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      使用数据可视化展示地理数据。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 地理数据可视化
import pandas as pd
import folium
from folium.plugins import HeatMap
import plotly.express as px
import geopandas as gpd

# 加载数据
def load_geo_data(file_path):
    df = pd.read_csv(file_path)
    return df

# 数据预处理
def preprocess_geo_data(df):
    # 确保经纬度数据
    df['latitude'] = pd.to_numeric(df['latitude'])
    df['longitude'] = pd.to_numeric(df['longitude'])
    
    return df

# 创建地图
def create_map(df):
    # 创建基础地图
    m = folium.Map(location=[df['latitude'].mean(),
                           df['longitude'].mean()],
                  zoom_start=10)
    
    # 添加标记
    for idx, row in df.iterrows():
        folium.Marker(
            location=[row['latitude'], row['longitude']],
            popup=row['name'],
            icon=folium.Icon(color='red', icon='info-sign')
        ).add_to(m)
    
    return m

# 创建热力图
def create_heatmap(df):
    # 创建基础地图
    m = folium.Map(location=[df['latitude'].mean(),
                           df['longitude'].mean()],
                  zoom_start=10)
    
    # 添加热力图
    heat_data = [[row['latitude'], row['longitude']]
                 for idx, row in df.iterrows()]
    
    HeatMap(heat_data).add_to(m)
    
    return m

# 创建交互式地图
def create_interactive_map(df):
    # 创建散点图
    fig = px.scatter_geo(df,
                        lat='latitude',
                        lon='longitude',
                        hover_name='name',
                        size='value',
                        color='category',
                        projection='natural earth')
    
    fig.update_layout(title='地理数据分布')
    fig.show()

# 创建区域地图
def create_region_map(df, shapefile_path):
    # 加载地理数据
    gdf = gpd.read_file(shapefile_path)
    
    # 合并数据
    merged = gdf.merge(df, on='region')
    
    # 创建地图
    fig = px.choropleth(merged,
                       geojson=merged.geometry,
                       locations=merged.index,
                       color='value',
                       hover_name='region',
                       projection='mercator')
    
    fig.update_geos(fitbounds='locations')
    fig.update_layout(title='区域数据分布')
    fig.show()

# 应用示例
def geo_analysis(file_path, shapefile_path=None):
    # 加载数据
    df = load_geo_data(file_path)
    
    # 数据预处理
    df = preprocess_geo_data(df)
    
    # 创建基础地图
    m = create_map(df)
    m.save('map.html')
    
    # 创建热力图
    heatmap = create_heatmap(df)
    heatmap.save('heatmap.html')
    
    # 创建交互式地图
    create_interactive_map(df)
    
    # 如果有区域数据，创建区域地图
    if shapefile_path:
        create_region_map(df, shapefile_path)
    
    # 生成报告
    generate_geo_report(df)

# 生成地理报告
def generate_geo_report(df):
    print("\\n地理数据分析报告：")
    print("1. 数据分布：")
    print(f"- 数据点数量: {len(df)}")
    print(f"- 覆盖区域: {df['region'].nunique()}")
    
    print("\\n2. 区域统计：")
    region_stats = df.groupby('region')['value'].agg(['sum', 'mean', 'count'])
    print(region_stats)
    
    print("\\n3. 类别分布：")
    category_stats = df.groupby('category')['value'].agg(['sum', 'mean', 'count'])
    print(category_stats)`}
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
          href="/study/ai/datamining/anomaly"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回异常检测
        </Link>
        <Link 
          href="/study/ai/datamining/practice"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          数据挖掘实战 →
        </Link>
      </div>
    </div>
  );
} 
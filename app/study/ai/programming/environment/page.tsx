'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AIEnvironmentPage() {
  const [activeTab, setActiveTab] = useState('python');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'python', label: 'Python环境' },
    { id: 'frameworks', label: '深度学习框架' },
    { id: 'tools', label: '开发工具' },
    { id: 'cloud', label: '云平台' }
  ];

  const toggleContent = (contentId: string) => {
    setExpandedContent(expandedContent === contentId ? null : contentId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">AI开发环境与工具</h1>
      
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
        {activeTab === 'python' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Python环境配置</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. Python环境安装</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      Python是AI开发的首选语言，本节将详细介绍如何配置Python开发环境。
                      推荐使用Anaconda或Miniconda来管理Python环境和包。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">环境配置步骤：</h5>
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 1. 安装Anaconda
# 访问 https://www.anaconda.com/products/distribution 下载安装包

# 2. 创建新的Python环境
conda create -n ai_env python=3.9

# 3. 激活环境
conda activate ai_env

# 4. 安装基础包
conda install numpy pandas matplotlib scikit-learn

# 5. 安装深度学习框架
conda install pytorch torchvision torchaudio -c pytorch

# 6. 验证安装
python -c "import torch; print(torch.__version__)"`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 虚拟环境管理</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      使用虚拟环境可以隔离不同项目的依赖，避免包版本冲突。
                      以下是常用的虚拟环境管理命令和最佳实践。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">虚拟环境管理命令：</h5>
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 创建虚拟环境
python -m venv myenv

# 激活虚拟环境
# Windows
myenv\\Scripts\\activate
# Linux/Mac
source myenv/bin/activate

# 安装依赖
pip install -r requirements.txt

# 导出依赖
pip freeze > requirements.txt

# 退出虚拟环境
deactivate`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 包管理最佳实践</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      良好的包管理实践可以提高开发效率和项目可维护性。
                      本节介绍包管理的常用工具和最佳实践。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">常用AI开发包说明：</h5>
                      <div className="space-y-4">
                        <div>
                          <h6 className="font-semibold">数据处理与科学计算</h6>
                          <ul className="list-disc pl-6 space-y-2">
                            <li><code>numpy</code>: 用于科学计算的基础包，提供多维数组对象和各种派生对象</li>
                            <li><code>pandas</code>: 用于数据分析和处理的库，提供DataFrame等数据结构</li>
                            <li><code>scipy</code>: 科学计算库，包含线性代数、优化、积分等算法</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h6 className="font-semibold">机器学习与深度学习</h6>
                          <ul className="list-disc pl-6 space-y-2">
                            <li><code>scikit-learn</code>: 机器学习库，包含分类、回归、聚类等算法</li>
                            <li><code>torch</code>: PyTorch深度学习框架，提供张量计算和自动求导</li>
                            <li><code>tensorflow</code>: Google的深度学习框架，支持分布式训练</li>
                            <li><code>keras</code>: 高级神经网络API，可运行在TensorFlow上</li>
                          </ul>
                        </div>

                        <div>
                          <h6 className="font-semibold">数据可视化</h6>
                          <ul className="list-disc pl-6 space-y-2">
                            <li><code>matplotlib</code>: 基础绘图库，支持各种静态图表</li>
                            <li><code>seaborn</code>: 基于matplotlib的统计数据可视化库</li>
                            <li><code>plotly</code>: 交互式绘图库，支持动态图表</li>
                          </ul>
                        </div>

                        <div>
                          <h6 className="font-semibold">开发工具</h6>
                          <ul className="list-disc pl-6 space-y-2">
                            <li><code>jupyter</code>: 交互式开发环境，支持代码、文本和可视化</li>
                            <li><code>ipykernel</code>: Jupyter的Python内核</li>
                            <li><code>pytest</code>: 单元测试框架</li>
                            <li><code>black</code>: 代码格式化工具</li>
                            <li><code>flake8</code>: 代码质量检查工具</li>
                          </ul>
                        </div>

                        <div>
                          <h6 className="font-semibold">自然语言处理</h6>
                          <ul className="list-disc pl-6 space-y-2">
                            <li><code>nltk</code>: 自然语言处理工具包</li>
                            <li><code>spacy</code>: 工业级NLP库</li>
                            <li><code>transformers</code>: Hugging Face的预训练模型库</li>
                          </ul>
                        </div>

                        <div>
                          <h6 className="font-semibold">计算机视觉</h6>
                          <ul className="list-disc pl-6 space-y-2">
                            <li><code>opencv-python</code>: 计算机视觉库</li>
                            <li><code>pillow</code>: 图像处理库</li>
                            <li><code>torchvision</code>: PyTorch的计算机视觉工具包</li>
                          </ul>
                        </div>
                      </div>

                      <h5 className="font-semibold mt-6 mb-2">requirements.txt示例：</h5>
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# requirements.txt
# 数据处理
numpy==1.21.0
pandas==1.3.0
scipy==1.7.0

# 机器学习与深度学习
scikit-learn==0.24.2
torch==1.9.0
torchvision==0.10.0
tensorflow==2.6.0
keras==2.6.0

# 数据可视化
matplotlib==3.4.2
seaborn==0.11.1
plotly==5.1.0

# 开发工具
jupyter==1.0.0
ipykernel==6.0.0
pytest==6.2.5
black==21.7b0
flake8==3.9.2

# 自然语言处理
nltk==3.6.2
spacy==3.1.0
transformers==4.8.2

# 计算机视觉
opencv-python==4.5.3.56
pillow==8.3.1`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'frameworks' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">深度学习框架</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. PyTorch</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      PyTorch是一个开源的机器学习库，提供了灵活的深度学习开发平台。
                      本节介绍PyTorch的基本使用和最佳实践。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">PyTorch示例代码：</h5>
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`import torch
import torch.nn as nn
import torch.optim as optim

# 定义神经网络
class SimpleNN(nn.Module):
    def __init__(self):
        super(SimpleNN, self).__init__()
        self.layer1 = nn.Linear(10, 64)
        self.layer2 = nn.Linear(64, 32)
        self.layer3 = nn.Linear(32, 1)
        self.relu = nn.ReLU()
        
    def forward(self, x):
        x = self.relu(self.layer1(x))
        x = self.relu(self.layer2(x))
        x = self.layer3(x)
        return x

# 创建模型实例
model = SimpleNN()

# 定义损失函数和优化器
criterion = nn.MSELoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# 训练循环
def train(model, dataloader, criterion, optimizer):
    model.train()
    for batch_idx, (data, target) in enumerate(dataloader):
        optimizer.zero_grad()
        output = model(data)
        loss = criterion(output, target)
        loss.backward()
        optimizer.step()
        
# 模型评估
def evaluate(model, dataloader):
    model.eval()
    with torch.no_grad():
        for data, target in dataloader:
            output = model(data)
            # 计算评估指标`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. TensorFlow</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      TensorFlow是Google开发的深度学习框架，提供了完整的工具链和生态系统。
                      本节介绍TensorFlow的基本使用和高级特性。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">TensorFlow示例代码：</h5>
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`import tensorflow as tf
from tensorflow.keras import layers, models

# 定义模型
def create_model():
    model = models.Sequential([
        layers.Dense(64, activation='relu', input_shape=(10,)),
        layers.Dropout(0.2),
        layers.Dense(32, activation='relu'),
        layers.Dense(1)
    ])
    return model

# 创建模型实例
model = create_model()

# 编译模型
model.compile(
    optimizer='adam',
    loss='mse',
    metrics=['mae']
)

# 训练模型
history = model.fit(
    train_data,
    train_labels,
    epochs=10,
    batch_size=32,
    validation_split=0.2
)

# 模型评估
test_loss, test_mae = model.evaluate(test_data, test_labels)

# 模型预测
predictions = model.predict(new_data)`}
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
              <h3 className="text-xl font-semibold mb-3">开发工具</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. Jupyter Notebook</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      Jupyter Notebook是数据科学和机器学习开发的重要工具，
                      提供了交互式的开发环境和可视化功能。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">Jupyter使用示例：</h5>
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 安装Jupyter
pip install jupyter

# 启动Jupyter Notebook
jupyter notebook

# 在notebook中使用matplotlib
%matplotlib inline
import matplotlib.pyplot as plt
import numpy as np

# 数据可视化示例
x = np.linspace(0, 10, 100)
y = np.sin(x)
plt.plot(x, y)
plt.title('Sine Wave')
plt.show()

# 使用pandas进行数据分析
import pandas as pd
df = pd.read_csv('data.csv')
df.head()
df.describe()`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. VS Code</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      Visual Studio Code是一个强大的代码编辑器，提供了丰富的AI开发插件和工具。
                      本节介绍VS Code的AI开发配置和常用插件。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">VS Code配置示例：</h5>
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`// settings.json
{
    "python.linting.enabled": true,
    "python.linting.pylintEnabled": true,
    "python.formatting.provider": "black",
    "editor.formatOnSave": true,
    "python.analysis.typeCheckingMode": "basic",
    "jupyter.enabled": true,
    "python.terminal.activateEnvironment": true
}

// 推荐的VS Code插件
// 1. Python
// 2. Pylance
// 3. Jupyter
// 4. Python Test Explorer
// 5. Python Docstring Generator
// 6. GitLens
// 7. Docker`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cloud' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">云平台</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. Google Colab</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      Google Colab提供了免费的GPU和TPU资源，是进行AI开发和实验的理想平台。
                      本节介绍Colab的基本使用和高级特性。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">Colab使用示例：</h5>
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 检查GPU是否可用
import torch
print(torch.cuda.is_available())

# 挂载Google Drive
from google.colab import drive
drive.mount('/content/drive')

# 安装自定义包
!pip install transformers

# 使用TPU
import tensorflow as tf
tpu = tf.distribute.cluster_resolver.TPUClusterResolver()
tf.config.experimental_connect_to_cluster(tpu)
tf.tpu.experimental.initialize_tpu_system(tpu)

# 数据可视化
import matplotlib.pyplot as plt
%matplotlib inline`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. AWS SageMaker</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      AWS SageMaker是亚马逊提供的机器学习平台，提供了完整的开发、训练和部署环境。
                      本节介绍SageMaker的基本使用和最佳实践。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-semibold mb-2">SageMaker示例代码：</h5>
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`import sagemaker
from sagemaker.pytorch import PyTorch

# 创建SageMaker会话
session = sagemaker.Session()

# 定义训练脚本
estimator = PyTorch(
    entry_point='train.py',
    role='SageMakerRole',
    instance_count=1,
    instance_type='ml.p3.2xlarge',
    framework_version='1.8.0',
    py_version='py3'
)

# 开始训练
estimator.fit({
    'train': 's3://bucket/train',
    'test': 's3://bucket/test'
})

# 部署模型
predictor = estimator.deploy(
    initial_instance_count=1,
    instance_type='ml.m5.large'
)

# 进行预测
predictor.predict(data)`}
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
          href="/study/ai/programming"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回人工智能程序设计首页
        </Link>
        <Link 
          href="/study/ai/programming/python"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          Python基础→
        </Link>
      </div>
    </div>
  );
} 
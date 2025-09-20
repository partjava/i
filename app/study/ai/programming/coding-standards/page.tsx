'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AICodingStandardsPage() {
  const [activeTab, setActiveTab] = useState('code');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'code', label: '代码规范' },
    { id: 'doc', label: '文档规范' },
    { id: 'practice', label: '最佳实践' },
    { id: 'review', label: '代码审查' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">AI编程规范</h1>
      
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
        {activeTab === 'code' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">代码规范</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 命名规范</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      AI项目中的命名需要清晰、一致且具有描述性。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 变量命名
# 好的命名
model_accuracy = 0.95
training_epochs = 100
learning_rate = 0.001

# 不好的命名
acc = 0.95
ep = 100
lr = 0.001

# 函数命名
def train_model():
    pass

def evaluate_performance():
    pass

# 类命名
class NeuralNetwork:
    pass

class DataPreprocessor:
    pass

# 常量命名
MAX_BATCH_SIZE = 32
DEFAULT_LEARNING_RATE = 0.001
MODEL_SAVE_PATH = "models/"`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 代码结构</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      代码应该遵循清晰的层次结构，便于维护和扩展。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 标准项目结构
project/
├── data/               # 数据目录
│   ├── raw/           # 原始数据
│   └── processed/     # 处理后的数据
├── models/            # 模型文件
├── src/               # 源代码
│   ├── data/         # 数据处理模块
│   ├── models/       # 模型定义
│   ├── training/     # 训练相关
│   └── utils/        # 工具函数
├── tests/            # 测试文件
├── configs/          # 配置文件
└── notebooks/        # Jupyter notebooks

# 模块化示例
# src/models/model.py
class Model:
    def __init__(self, config):
        self.config = config
    
    def build(self):
        pass
    
    def train(self):
        pass

# src/training/trainer.py
class Trainer:
    def __init__(self, model, data):
        self.model = model
        self.data = data
    
    def train(self):
        pass

# src/utils/helpers.py
def load_config(path):
    pass

def save_model(model, path):
    pass`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 注释规范</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      注释应该清晰、准确，并遵循统一的格式。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`"""
模块级文档字符串
描述模块的功能、使用方法和注意事项
"""

def process_data(data, batch_size=32):
    """
    处理输入数据
    
    参数:
        data (np.ndarray): 输入数据数组
        batch_size (int): 批处理大小
    
    返回:
        np.ndarray: 处理后的数据
    
    异常:
        ValueError: 当输入数据格式不正确时
    """
    # 数据预处理
    processed = normalize_data(data)
    
    # 批处理
    batches = split_into_batches(processed, batch_size)
    
    return batches

class Model:
    """模型类，实现神经网络模型"""
    
    def __init__(self, input_size, hidden_size):
        """
        初始化模型
        
        参数:
            input_size (int): 输入维度
            hidden_size (int): 隐藏层维度
        """
        self.input_size = input_size
        self.hidden_size = hidden_size`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'doc' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">文档规范</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. README规范</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      README文件应该包含项目的基本信息、安装说明和使用方法。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 项目名称

## 项目简介
简要描述项目的目的和功能

## 环境要求
- Python 3.8+
- PyTorch 1.8+
- CUDA 11.0+ (GPU版本)

## 安装说明
\`\`\`bash
# 克隆仓库
git clone https://github.com/username/project.git

# 安装依赖
pip install -r requirements.txt
\`\`\`

## 使用方法
1. 数据准备
2. 模型训练
3. 模型评估

## 项目结构
\`\`\`
project/
├── data/
├── models/
└── src/
\`\`\`

## 贡献指南
说明如何参与项目开发

## 许可证
MIT License`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. API文档</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      API文档应该详细说明每个接口的功能、参数和返回值。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# API文档示例

## Model类

### 初始化
\`\`\`python
Model(input_size: int, hidden_size: int, output_size: int)
\`\`\`

参数:
- input_size: 输入维度
- hidden_size: 隐藏层维度
- output_size: 输出维度

### 方法

#### train
\`\`\`python
train(data: np.ndarray, labels: np.ndarray, epochs: int = 100)
\`\`\`

训练模型

参数:
- data: 训练数据
- labels: 标签
- epochs: 训练轮数

返回:
- dict: 训练历史记录

#### predict
\`\`\`python
predict(data: np.ndarray) -> np.ndarray
\`\`\`

使用模型进行预测

参数:
- data: 输入数据

返回:
- np.ndarray: 预测结果`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 实验文档</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      实验文档应该记录实验设计、过程和结果。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 实验报告模板

## 实验目的
描述实验的目标和预期结果

## 实验设计
- 数据集
- 模型架构
- 训练参数
- 评估指标

## 实验过程
1. 数据预处理
2. 模型训练
3. 结果分析

## 实验结果
### 性能指标
- 准确率: 95%
- 精确率: 94%
- 召回率: 96%
- F1分数: 95%

### 可视化结果
[插入图表]

## 结论
总结实验结果和发现

## 改进建议
提出可能的改进方向`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'practice' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">最佳实践</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 代码组织</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      良好的代码组织可以提高可维护性和可扩展性。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 配置管理
class Config:
    def __init__(self):
        self.data_path = "data/"
        self.model_path = "models/"
        self.batch_size = 32
        self.learning_rate = 0.001

# 数据加载
class DataLoader:
    def __init__(self, config):
        self.config = config
    
    def load_data(self):
        pass
    
    def preprocess(self):
        pass

# 模型定义
class Model:
    def __init__(self, config):
        self.config = config
    
    def build(self):
        pass
    
    def train(self):
        pass

# 训练流程
def train_pipeline():
    # 加载配置
    config = Config()
    
    # 准备数据
    data_loader = DataLoader(config)
    data = data_loader.load_data()
    
    # 训练模型
    model = Model(config)
    model.train(data)`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 错误处理</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      合理的错误处理可以提高代码的健壮性。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 自定义异常
class ModelError(Exception):
    pass

class DataError(Exception):
    pass

# 错误处理示例
def load_model(path):
    try:
        model = torch.load(path)
        return model
    except FileNotFoundError:
        raise ModelError(f"模型文件不存在: {path}")
    except Exception as e:
        raise ModelError(f"加载模型时发生错误: {str(e)}")

def process_data(data):
    try:
        if data is None:
            raise DataError("输入数据为空")
        if not isinstance(data, np.ndarray):
            raise DataError("输入数据格式错误")
        return preprocess(data)
    except DataError as e:
        logger.error(f"数据处理错误: {str(e)}")
        raise
    except Exception as e:
        logger.error(f"未知错误: {str(e)}")
        raise`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 性能优化</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      性能优化可以提高代码的执行效率。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 使用生成器
def data_generator(batch_size):
    while True:
        batch = []
        for _ in range(batch_size):
            sample = next_sample()
            batch.append(sample)
        yield batch

# 使用多进程
from multiprocessing import Pool

def process_batch(batch):
    return [process_sample(sample) for sample in batch]

with Pool() as pool:
    results = pool.map(process_batch, batches)

# 使用GPU加速
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = model.to(device)
data = data.to(device)

# 使用缓存
from functools import lru_cache

@lru_cache(maxsize=128)
def expensive_computation(x):
    return x * x`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'review' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">代码审查</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 审查清单</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      代码审查应该关注代码质量、性能和安全性。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 代码审查清单

## 代码质量
- 命名是否清晰、一致
- 函数是否单一职责
- 代码是否重复
- 注释是否充分
- 错误处理是否完善

## 性能
- 是否有性能瓶颈
- 是否使用了适当的数据结构
- 是否避免了不必要的计算
- 是否合理使用了缓存

## 安全性
- 是否处理了异常情况
- 是否验证了输入数据
- 是否保护了敏感信息
- 是否避免了安全漏洞

## 可维护性
- 代码结构是否清晰
- 是否遵循了设计模式
- 是否易于测试
- 是否易于扩展`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 审查流程</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      代码审查应该遵循规范的流程。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 代码审查流程

1. 提交代码
   - 完成功能开发
   - 通过单元测试
   - 提交代码审查

2. 审查代码
   - 检查代码质量
   - 检查性能问题
   - 检查安全问题
   - 提供修改建议

3. 修改代码
   - 根据建议修改代码
   - 更新测试用例
   - 重新提交审查

4. 合并代码
   - 通过审查
   - 合并到主分支
   - 部署到测试环境

5. 验证功能
   - 功能测试
   - 性能测试
   - 安全测试`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 工具使用</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      使用工具可以提高代码审查的效率。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 代码质量工具
- pylint: 代码风格检查
- flake8: 代码质量检查
- black: 代码格式化
- mypy: 类型检查

# 性能分析工具
- cProfile: 性能分析
- memory_profiler: 内存分析
- line_profiler: 行级性能分析

# 安全工具
- bandit: 安全漏洞检查
- safety: 依赖包安全检查
- pyup: 依赖包更新检查

# 测试工具
- pytest: 单元测试
- coverage: 代码覆盖率
- tox: 测试环境管理`}
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
          href="/study/ai/programming/python"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← Python基础
        </Link>
        <Link 
          href="/study/ai/programming/workflow"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          AI项目开发流程 →
        </Link>
      </div>
    </div>
  );
} 
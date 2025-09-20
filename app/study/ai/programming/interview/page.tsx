'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function InterviewPage() {
  const [activeTab, setActiveTab] = useState('common');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'common', label: '常见问题' },
    { id: 'interview', label: '面试题' },
    { id: 'frontier', label: '前沿技术' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">常见问题与面试题</h1>
      
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
        {activeTab === 'common' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">常见问题</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 环境配置问题</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      常见环境配置问题及解决方案。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 1. CUDA版本不匹配
问题：PyTorch与CUDA版本不兼容
解决方案：
- 检查CUDA版本：nvidia-smi
- 安装对应版本PyTorch：
  pip install torch==1.9.0+cu111 -f https://download.pytorch.org/whl/torch_stable.html

# 2. 依赖冲突
问题：包版本冲突
解决方案：
- 创建新的虚拟环境
- 使用conda管理依赖
- 使用requirements.txt指定版本

# 3. 内存不足
问题：GPU内存不足
解决方案：
- 减小batch size
- 使用梯度累积
- 使用混合精度训练
- 使用模型并行`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 训练问题</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      常见训练问题及解决方案。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 1. 过拟合
问题：模型在训练集表现好，测试集表现差
解决方案：
- 增加正则化
- 使用Dropout
- 数据增强
- 早停
- 交叉验证

# 2. 欠拟合
问题：模型在训练集和测试集表现都差
解决方案：
- 增加模型复杂度
- 减少正则化
- 增加训练轮数
- 调整学习率
- 特征工程

# 3. 梯度消失/爆炸
问题：训练不稳定
解决方案：
- 使用BatchNorm
- 使用残差连接
- 梯度裁剪
- 使用合适的激活函数
- 调整权重初始化`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 部署问题</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      常见部署问题及解决方案。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 1. 模型大小
问题：模型文件过大
解决方案：
- 模型量化
- 模型剪枝
- 知识蒸馏
- 模型压缩

# 2. 推理速度
问题：推理速度慢
解决方案：
- 模型优化
- 使用TensorRT
- 批处理
- 模型并行
- 硬件加速

# 3. 服务稳定性
问题：服务不稳定
解决方案：
- 负载均衡
- 服务监控
- 自动扩缩容
- 故障恢复
- 日志记录`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'interview' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">面试题</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 机器学习基础</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      机器学习基础面试题。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 1. 过拟合和欠拟合
Q: 什么是过拟合和欠拟合？如何解决？
A: 
- 过拟合：模型在训练集表现好，测试集表现差
- 欠拟合：模型在训练集和测试集表现都差
解决方案：
- 过拟合：增加正则化、使用Dropout、数据增强、早停
- 欠拟合：增加模型复杂度、减少正则化、增加训练轮数

# 2. 正则化
Q: 什么是正则化？有哪些常见的正则化方法？
A:
- L1正则化：稀疏性，特征选择
- L2正则化：权重衰减，防止过拟合
- Dropout：随机丢弃神经元
- BatchNorm：归一化，加速训练
- 数据增强：增加数据多样性

# 3. 评估指标
Q: 常用的模型评估指标有哪些？
A:
- 分类：准确率、精确率、召回率、F1分数、ROC、AUC
- 回归：MSE、MAE、R2
- 聚类：轮廓系数、Calinski-Harabasz指数
- 推荐：NDCG、MAP、MRR`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 深度学习</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      深度学习面试题。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 1. 激活函数
Q: 常用的激活函数有哪些？各有什么特点？
A:
- ReLU：计算简单，解决梯度消失，可能出现死亡ReLU
- Leaky ReLU：解决死亡ReLU问题
- ELU：输出均值接近0，加快收敛
- Sigmoid：输出范围(0,1)，用于二分类
- Tanh：输出范围(-1,1)，用于分类

# 2. 优化器
Q: 常用的优化器有哪些？各有什么特点？
A:
- SGD：简单，可能陷入局部最优
- Momentum：加速收敛，减少震荡
- Adam：自适应学习率，收敛快
- RMSprop：自适应学习率，适合非平稳目标
- AdaGrad：自适应学习率，适合稀疏数据

# 3. 损失函数
Q: 常用的损失函数有哪些？各适用于什么场景？
A:
- MSE：回归问题
- CrossEntropy：分类问题
- Focal Loss：处理类别不平衡
- Triplet Loss：度量学习
- Contrastive Loss：对比学习`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 计算机视觉</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      计算机视觉面试题。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 1. CNN
Q: CNN的主要组件有哪些？各有什么作用？
A:
- 卷积层：特征提取
- 池化层：降维，提取主要特征
- 全连接层：分类
- 激活函数：引入非线性
- BatchNorm：加速训练
- Dropout：防止过拟合

# 2. 目标检测
Q: 常见的目标检测算法有哪些？各有什么特点？
A:
- R-CNN系列：两阶段，精度高，速度慢
- YOLO系列：单阶段，速度快，精度略低
- SSD：单阶段，多尺度特征
- RetinaNet：解决类别不平衡
- CenterNet：关键点检测

# 3. 图像分割
Q: 图像分割的主要方法有哪些？
A:
- FCN：全卷积网络
- U-Net：编码器-解码器结构
- Mask R-CNN：实例分割
- DeepLab：空洞卷积
- PSPNet：金字塔池化`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'frontier' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">前沿技术</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">1. 大语言模型</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      大语言模型技术。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 1. 模型架构
- Transformer架构
- 自注意力机制
- 位置编码
- 多头注意力
- 前馈神经网络

# 2. 训练方法
- 预训练
- 微调
- 指令微调
- RLHF
- 持续学习

# 3. 应用场景
- 文本生成
- 对话系统
- 代码生成
- 知识问答
- 文本摘要`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">2. 多模态学习</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      多模态学习技术。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 1. 模型架构
- CLIP：图像-文本对比学习
- DALL-E：文本生成图像
- Stable Diffusion：扩散模型
- Flamingo：多模态对话
- CoCa：对比学习

# 2. 训练方法
- 对比学习
- 跨模态预训练
- 多任务学习
- 知识蒸馏
- 迁移学习

# 3. 应用场景
- 图像生成
- 视频理解
- 跨模态检索
- 多模态对话
- 视觉问答`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">3. 强化学习</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      强化学习技术。
                    </p>
                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                      <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto">
{`# 1. 算法
- DQN：深度Q网络
- A3C：异步优势演员评论家
- PPO：近端策略优化
- SAC：软演员评论家
- TD3：双延迟DDPG

# 2. 训练方法
- 经验回放
- 目标网络
- 优先经验回放
- 多步学习
- 分布式训练

# 3. 应用场景
- 游戏AI
- 机器人控制
- 自动驾驶
- 资源调度
- 推荐系统`}
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
          href="/study/ai/programming/project"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← AI项目实战
        </Link>
        <Link 
          href="/study/ai/programming"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          返回编程目录 →
        </Link>
      </div>
    </div>
  );
} 
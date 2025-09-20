'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaArrowRight, FaQuestionCircle, FaBookOpen, FaLightbulb } from 'react-icons/fa';

export default function DLInterviewPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">深度学习面试题</h1>

      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-lg ${activeTab === 'overview' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          面试概览
        </button>
        <button
          onClick={() => setActiveTab('basic')}
          className={`px-4 py-2 rounded-lg ${activeTab === 'basic' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          基础知识题
        </button>
        <button
          onClick={() => setActiveTab('engineering')}
          className={`px-4 py-2 rounded-lg ${activeTab === 'engineering' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          工程与实战题
        </button>
        <button
          onClick={() => setActiveTab('open')}
          className={`px-4 py-2 rounded-lg ${activeTab === 'open' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          开放性题
        </button>
      </div>

      {/* 面试概览 */}
      {activeTab === 'overview' && (
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center"><FaBookOpen className="mr-2" />面试题概览</h2>
          <p className="text-gray-700 mb-2">
            深度学习面试通常会考查基础理论、模型理解、工程实践、项目经验和前沿技术等方面。建议系统复习基础知识，结合项目经历，注重实际问题的分析与解决能力。
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>基础理论：神经网络结构、反向传播、激活函数、损失函数等</li>
            <li>模型理解：常见网络（CNN、RNN、Transformer等）原理与应用</li>
            <li>工程实践：模型调优、过拟合处理、部署与优化</li>
            <li>项目经验：实际项目流程、遇到的问题与解决方案</li>
            <li>前沿技术：最新论文、行业动态、创新应用</li>
          </ul>
        </section>
      )}

      {/* 基础知识题 */}
      {activeTab === 'basic' && (
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center"><FaQuestionCircle className="mr-2" />基础知识题</h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-6 mb-4">
            <li>
              <b>简述神经网络的基本结构和前向、反向传播过程。</b>
              <div className="mt-2 text-gray-600 text-sm">
                <b>详细解析：</b><br />
                神经网络由输入层、若干隐藏层和输出层组成。每层由若干神经元（节点）构成，层与层之间通过权重连接。<br />
                <b>前向传播：</b> 输入数据经过每一层的线性变换（加权求和）和非线性激活函数，最终输出预测结果。<br />
                <b>反向传播：</b> 通过损失函数计算预测与真实值的误差，利用链式法则从输出层向输入层逐层计算梯度，更新参数以最小化损失。<br />
                <b>常见考点：</b> 层次结构、激活函数、损失函数、参数更新。<br />
                <b>代码示例：</b>
                <pre className="bg-gray-50 p-2 rounded-lg overflow-x-auto">
{`# PyTorch前向与反向传播示例
output = model(input)
loss = criterion(output, target)
loss.backward()  # 自动计算梯度
optimizer.step() # 更新参数`}
                </pre>
              </div>
            </li>
            <li>
              <b>常见的激活函数有哪些？各自优缺点是什么？</b>
              <div className="mt-2 text-gray-600 text-sm">
                <b>详细解析：</b><br />
                <b>Sigmoid：</b> 输出范围(0,1)，易于理解，但易梯度消失，收敛慢。<br />
                <b>Tanh：</b> 输出范围(-1,1)，零均值，收敛快于Sigmoid，但仍有梯度消失问题。<br />
                <b>ReLU：</b> 计算简单，收敛快，常用于深层网络，但神经元可能"死亡"。<br />
                <b>LeakyReLU：</b> 解决ReLU"死亡"问题，负区间有微小斜率。<br />
                <b>常见考点：</b> 梯度消失、激活函数选择对训练的影响。<br />
                <b>代码示例：</b>
                <pre className="bg-gray-50 p-2 rounded-lg overflow-x-auto">
{`import torch.nn as nn
nn.ReLU()
nn.Sigmoid()
nn.Tanh()`}
                </pre>
              </div>
            </li>
            <li>
              <b>什么是过拟合？如何防止过拟合？</b>
              <div className="mt-2 text-gray-600 text-sm">
                <b>详细解析：</b><br />
                过拟合是指模型在训练集上表现很好，但在新数据（测试集）上效果差，泛化能力弱。<br />
                <b>防止方法：</b> 正则化（L1/L2）、Dropout、数据增强、早停（Early Stopping）、增加数据量、简化模型结构等。<br />
                <b>常见考点：</b> 各种防止过拟合的方法原理及适用场景。<br />
                <b>代码示例：</b>
                <pre className="bg-gray-50 p-2 rounded-lg overflow-x-auto">
{`# Dropout示例
import torch.nn as nn
nn.Dropout(p=0.5)`}
                </pre>
              </div>
            </li>
            <li>
              <b>简述卷积神经网络（CNN）的核心思想及典型应用。</b>
              <div className="mt-2 text-gray-600 text-sm">
                <b>详细解析：</b><br />
                CNN通过卷积层提取局部空间特征，参数共享和稀疏连接减少参数量。常包含卷积层、池化层、全连接层。<br />
                <b>典型应用：</b> 图像分类、目标检测、语义分割、人脸识别等。<br />
                <b>常见考点：</b> 卷积核、步幅、池化、特征图、参数量计算。<br />
                <b>代码示例：</b>
                <pre className="bg-gray-50 p-2 rounded-lg overflow-x-auto">
{`import torch.nn as nn
nn.Conv2d(3, 16, kernel_size=3, stride=1, padding=1)
nn.MaxPool2d(2)`}
                </pre>
              </div>
            </li>
            <li>
              <b>反向传播算法的基本原理是什么？</b>
              <div className="mt-2 text-gray-600 text-sm">
                <b>详细解析：</b><br />
                反向传播利用链式法则，逐层计算损失函数对每个参数的梯度。通过自动微分框架（如PyTorch、TensorFlow）可自动完成。<br />
                <b>常见考点：</b> 链式法则、梯度消失/爆炸、参数更新。<br />
                <b>代码示例：</b>
                <pre className="bg-gray-50 p-2 rounded-lg overflow-x-auto">
{`loss.backward()  # 自动反向传播
optimizer.step()  # 参数更新`}
                </pre>
              </div>
            </li>
          </ol>
        </section>
      )}

      {/* 工程与实战题 */}
      {activeTab === 'engineering' && (
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center"><FaLightbulb className="mr-2" />工程与实战题</h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-6 mb-4">
            <li>
              <b>你在实际项目中遇到过哪些模型调优的难点？如何解决？</b>
              <div className="mt-2 text-gray-600 text-sm">
                <b>详细解析：</b><br />
                常见难点包括：学习率选择、网络结构设计、数据不平衡、训练不收敛等。<br />
                <b>解决思路：</b> 使用学习率衰减、自动调参工具（如Optuna）、尝试不同结构、数据增强、采样、正则化等。<br />
                <b>实际案例：</b> 在图像分类项目中，采用余弦退火调整学习率，提升了模型收敛速度和最终精度。
              </div>
            </li>
            <li>
              <b>如何将深度学习模型部署到生产环境？需要注意哪些问题？</b>
              <div className="mt-2 text-gray-600 text-sm">
                <b>详细解析：</b><br />
                常用部署方式有：导出ONNX模型、使用TensorRT加速、封装RESTful API、容器化部署（Docker）。<br />
                <b>注意事项：</b> 推理速度、内存/显存占用、兼容性、监控、自动扩缩容等。<br />
                <b>代码示例：</b>
                <pre className="bg-gray-50 p-2 rounded-lg overflow-x-auto">
{`# PyTorch导出ONNX
import torch
model = ...
dummy_input = torch.randn(1, 3, 224, 224)
torch.onnx.export(model, dummy_input, 'model.onnx')`}
                </pre>
              </div>
            </li>
            <li>
              <b>请简述一次完整的深度学习项目流程。</b>
              <div className="mt-2 text-gray-600 text-sm">
                <b>详细解析：</b><br />
                1. 需求分析 2. 数据收集与预处理 3. 模型设计与选择 4. 训练与调优 5. 评估与测试 6. 部署上线 7. 监控与维护。<br />
                <b>实际案例：</b> 在医疗影像项目中，先标注数据，后用ResNet训练，最终部署到医院服务器。
              </div>
            </li>
            <li>
              <b>如何处理训练数据中的异常值和缺失值？</b>
              <div className="mt-2 text-gray-600 text-sm">
                <b>详细解析：</b><br />
                异常值可用箱线图、Z-score等方法检测，缺失值可用均值/中位数/众数填充，或直接删除。<br />
                <b>实际案例：</b> 在金融风控项目中，使用中位数填充缺失值，提升了模型稳定性。
              </div>
            </li>
            <li>
              <b>你如何保证实验的可复现性？</b>
              <div className="mt-2 text-gray-600 text-sm">
                <b>详细解析：</b><br />
                固定随机种子、记录依赖包版本、保存训练参数和模型、使用Git管理代码、记录实验日志。<br />
                <b>代码示例：</b>
                <pre className="bg-gray-50 p-2 rounded-lg overflow-x-auto">
{`import torch
import numpy as np
import random
seed = 42
torch.manual_seed(seed)
np.random.seed(seed)
random.seed(seed)`}
                </pre>
              </div>
            </li>
          </ol>
        </section>
      )}

      {/* 开放性题 */}
      {activeTab === 'open' && (
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center"><FaQuestionCircle className="mr-2" />开放性/思考题</h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-4 mb-4">
            <li>你如何看待大模型（如GPT、BERT等）在实际应用中的优势与挑战？</li>
            <li>请谈谈你对深度学习未来发展的看法。</li>
            <li>如果让你设计一个端到端的AI系统，你会如何架构？</li>
            <li>请结合你的项目经历，分享一次印象深刻的技术难题及解决过程。</li>
            <li>你认为深度学习与传统机器学习的最大区别是什么？</li>
          </ol>
        </section>
      )}

      {/* 导航链接 */}
      <div className="flex justify-between mt-8">
        <Link 
          href="/study/ai/dl/cases"
          className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 flex items-center"
        >
          <FaArrowLeft className="mr-2" />
          上一课：深度学习实战
        </Link>
        <Link 
          href="/study/ai/dl/advanced"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center"
        >
          下一课：进阶与前沿
          <FaArrowRight className="ml-2" />
        </Link>
      </div>
    </div>
  );
} 
'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '深度学习',
  chapterTitle: '深度学习面试题',
  chapterNumber: 13,
  totalChapters: 14,
  subjectHref: '/study/ai/dl',
  prevChapter: { label: '深度学习实战', href: '/study/ai/dl/cases' },
  nextChapter: { label: '进阶与前沿', href: '/study/ai/dl/advanced' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '面试概览',
    left: (
      <div className="space-y-4">
        <PageTitle>面试题概览</PageTitle>
        <BookParagraph>
          深度学习面试通常会考查基础理论、模型理解、工程实践、项目经验和前沿技术等方面。建议系统复习基础知识，结合项目经历，注重实际问题的分析与解决能力。
        </BookParagraph>
        <BookList items={[
          '基础理论：神经网络结构、反向传播、激活函数、损失函数等',
          '模型理解：常见网络（CNN、RNN、Transformer等）原理与应用',
          '工程实践：模型调优、过拟合处理、部署与优化',
          '项目经验：实际项目流程、遇到的问题与解决方案',
          '前沿技术：最新论文、行业动态、创新应用',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>面试准备建议</SectionTitle>
        <BookList items={[
          '系统复习基础理论，确保概念清晰',
          '准备2-3个完整的项目经历介绍',
          '关注行业前沿技术动态',
          '多动手实践，理解代码实现细节',
          '准备开放性问题的思考框架',
        ]} />
      </div>
    ),
  },
  {
    label: '基础知识题',
    left: (
      <div className="space-y-4">
        <PageTitle>基础知识题</PageTitle>

        <BookParagraph><b>1. 简述神经网络的基本结构和前向、反向传播过程。</b></BookParagraph>
        <BookParagraph>
          <b>详细解析：</b>神经网络由输入层、若干隐藏层和输出层组成。每层由若干神经元（节点）构成，层与层之间通过权重连接。<br />
          <b>前向传播：</b>输入数据经过每一层的线性变换（加权求和）和非线性激活函数，最终输出预测结果。<br />
          <b>反向传播：</b>通过损失函数计算预测与真实值的误差，利用链式法则从输出层向输入层逐层计算梯度，更新参数以最小化损失。<br />
          <b>常见考点：</b>层次结构、激活函数、损失函数、参数更新。<br />
          <b>代码示例：</b>
        </BookParagraph>
        <BookCode language="python" code={`# PyTorch前向与反向传播示例
output = model(input)
loss = criterion(output, target)
loss.backward()  # 自动计算梯度
optimizer.step() # 更新参数`} />

        <BookParagraph><b>2. 常见的激活函数有哪些？各自优缺点是什么？</b></BookParagraph>
        <BookParagraph>
          <b>详细解析：</b><br />
          <b>Sigmoid：</b>输出范围(0,1)，易于理解，但易梯度消失，收敛慢。<br />
          <b>Tanh：</b>输出范围(-1,1)，零均值，收敛快于Sigmoid，但仍有梯度消失问题。<br />
          <b>ReLU：</b>计算简单，收敛快，常用于深层网络，但神经元可能「死亡」。<br />
          <b>LeakyReLU：</b>解决ReLU「死亡」问题，负区间有微小斜率。<br />
          <b>常见考点：</b>梯度消失、激活函数选择对训练的影响。
        </BookParagraph>
        <BookCode language="python" code={`import torch.nn as nn
nn.ReLU()
nn.Sigmoid()
nn.Tanh()`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookParagraph><b>3. 什么是过拟合？如何防止过拟合？</b></BookParagraph>
        <BookParagraph>
          <b>详细解析：</b>过拟合是指模型在训练集上表现很好，但在新数据（测试集）上效果差，泛化能力弱。<br />
          <b>防止方法：</b>正则化（L1/L2）、Dropout、数据增强、早停（Early Stopping）、增加数据量、简化模型结构等。<br />
          <b>常见考点：</b>各种防止过拟合的方法原理及适用场景。
        </BookParagraph>
        <BookCode language="python" code={`# Dropout示例
import torch.nn as nn
nn.Dropout(p=0.5)`} />

        <BookParagraph><b>4. 简述卷积神经网络（CNN）的核心思想及典型应用。</b></BookParagraph>
        <BookParagraph>
          <b>详细解析：</b>CNN通过卷积层提取局部空间特征，参数共享和稀疏连接减少参数量。常包含卷积层、池化层、全连接层。<br />
          <b>典型应用：</b>图像分类、目标检测、语义分割、人脸识别等。<br />
          <b>常见考点：</b>卷积核、步幅、池化、特征图、参数量计算。
        </BookParagraph>
        <BookCode language="python" code={`import torch.nn as nn
nn.Conv2d(3, 16, kernel_size=3, stride=1, padding=1)
nn.MaxPool2d(2)`} />

        <BookParagraph><b>5. 反向传播算法的基本原理是什么？</b></BookParagraph>
        <BookParagraph>
          <b>详细解析：</b>反向传播利用链式法则，逐层计算损失函数对每个参数的梯度。通过自动微分框架（如PyTorch、TensorFlow）可自动完成。<br />
          <b>常见考点：</b>链式法则、梯度消失/爆炸、参数更新。
        </BookParagraph>
        <BookCode language="python" code={`loss.backward()  # 自动反向传播
optimizer.step()  # 参数更新`} />
      </div>
    ),
  },
  {
    label: '工程与实战题',
    left: (
      <div className="space-y-4">
        <PageTitle>工程与实战题</PageTitle>

        <BookParagraph><b>1. 你在实际项目中遇到过哪些模型调优的难点？如何解决？</b></BookParagraph>
        <BookParagraph>
          <b>详细解析：</b>常见难点包括：学习率选择、网络结构设计、数据不平衡、训练不收敛等。<br />
          <b>解决思路：</b>使用学习率衰减、自动调参工具（如Optuna）、尝试不同结构、数据增强、采样、正则化等。<br />
          <b>实际案例：</b>在图像分类项目中，采用余弦退火调整学习率，提升了模型收敛速度和最终精度。
        </BookParagraph>

        <BookParagraph><b>2. 如何将深度学习模型部署到生产环境？需要注意哪些问题？</b></BookParagraph>
        <BookParagraph>
          <b>详细解析：</b>常用部署方式有：导出ONNX模型、使用TensorRT加速、封装RESTful API、容器化部署（Docker）。<br />
          <b>注意事项：</b>推理速度、内存/显存占用、兼容性、监控、自动扩缩容等。
        </BookParagraph>
        <BookCode language="python" code={`# PyTorch导出ONNX
import torch
model = ...
dummy_input = torch.randn(1, 3, 224, 224)
torch.onnx.export(model, dummy_input, 'model.onnx')`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookParagraph><b>3. 请简述一次完整的深度学习项目流程。</b></BookParagraph>
        <BookParagraph>
          <b>详细解析：</b>1. 需求分析 2. 数据收集与预处理 3. 模型设计与选择 4. 训练与调优 5. 评估与测试 6. 部署上线 7. 监控与维护。<br />
          <b>实际案例：</b>在医疗影像项目中，先标注数据，后用ResNet训练，最终部署到医院服务器。
        </BookParagraph>

        <BookParagraph><b>4. 如何处理训练数据中的异常值和缺失值？</b></BookParagraph>
        <BookParagraph>
          <b>详细解析：</b>异常值可用箱线图、Z-score等方法检测，缺失值可用均值/中位数/众数填充，或直接删除。<br />
          <b>实际案例：</b>在金融风控项目中，使用中位数填充缺失值，提升了模型稳定性。
        </BookParagraph>

        <BookParagraph><b>5. 你如何保证实验的可复现性？</b></BookParagraph>
        <BookParagraph>
          <b>详细解析：</b>固定随机种子、记录依赖包版本、保存训练参数和模型、使用Git管理代码、记录实验日志。
        </BookParagraph>
        <BookCode language="python" code={`import torch
import numpy as np
import random
seed = 42
torch.manual_seed(seed)
np.random.seed(seed)
random.seed(seed)`} />
      </div>
    ),
  },
  {
    label: '开放性题',
    left: (
      <div className="space-y-4">
        <PageTitle>开放性/思考题</PageTitle>
        <BookList items={[
          '你如何看待大模型（如GPT、BERT等）在实际应用中的优势与挑战？',
          '请谈谈你对深度学习未来发展的看法。',
          '如果让你设计一个端到端的AI系统，你会如何架构？',
          '请结合你的项目经历，分享一次印象深刻的技术难题及解决过程。',
          '你认为深度学习与传统机器学习的最大区别是什么？',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>答题建议</SectionTitle>
        <BookList items={[
          '结合自身项目经验回答，体现实践能力',
          '展现系统思维能力，从多个角度分析',
          '体现出对技术细节的理解深度',
          '关注工程实现和落地效果',
          '展现学习能力和对新技术的热情',
        ]} />
      </div>
    ),
  },
]

export default function DlInterviewPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

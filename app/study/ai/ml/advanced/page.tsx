'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList, TagGrid,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '机器学习', chapterTitle: '进阶与前沿', chapterNumber: 11, totalChapters: 11,
  subjectHref: '/study/ai/ml',
  prevChapter: { label: '面试题', href: '/study/ai/ml/interview' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '前沿技术',
    left: (
      <div className="space-y-4">
        <PageTitle>机器学习前沿技术</PageTitle>
        <SectionTitle>联邦学习</SectionTitle>
        <BookParagraph>
          联邦学习是一种分布式机器学习方法，允许多个设备或服务器在保护数据隐私的前提下协同训练模型。
        </BookParagraph>
        <BookParagraph><b>主要特点：</b></BookParagraph>
        <BookList items={[
          <>数据隐私保护
            <BookList items={[
              '原始数据保留在本地',
              '只传输模型参数',
            ]} tight />
          </>,
          <>分布式训练
            <BookList items={[
              '多设备协同',
              '异步更新',
            ]} tight />
          </>,
          <>应用场景
            <BookList items={[
              '医疗数据共享',
              '金融风控',
              '移动设备个性化',
            ]} tight />
          </>,
        ]} />
        <SectionTitle>自监督学习</SectionTitle>
        <BookParagraph>
          自监督学习是一种无需人工标注的学习方法，通过设计预训练任务来学习数据的内在表示。
        </BookParagraph>
        <BookParagraph><b>主要方法：</b></BookParagraph>
        <BookList items={[
          <>对比学习
            <BookList items={[
              'SimCLR',
              'MoCo',
            ]} tight />
          </>,
          <>掩码预测
            <BookList items={[
              'BERT',
              'MAE',
            ]} tight />
          </>,
          <>应用领域
            <BookList items={[
              '计算机视觉',
              '自然语言处理',
              '语音识别',
            ]} tight />
          </>,
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>可解释AI（XAI）</SectionTitle>
        <BookParagraph>
          可解释性AI致力于使机器学习模型的决策过程更加透明和可理解。
        </BookParagraph>
        <BookParagraph><b>主要技术：</b></BookParagraph>
        <BookList items={[
          <>模型解释方法
            <BookList items={[
              'SHAP值',
              'LIME',
              '特征重要性',
            ]} tight />
          </>,
          <>可解释模型
            <BookList items={[
              '决策树',
              '规则集',
              '线性模型',
            ]} tight />
          </>,
          <>应用价值
            <BookList items={[
              '医疗诊断',
              '金融风控',
              '法律决策',
            ]} tight />
          </>,
        ]} />
        <TagGrid items={['联邦学习', '自监督', 'XAI', 'SHAP', 'LIME', '对比学习']} />
      </div>
    ),
  },
  {
    label: '代码实践',
    left: (
      <div className="space-y-4">
        <PageTitle>联邦平均算法</PageTitle>
        <BookCode language="python" code={`import torch
import torch.nn as nn
import torch.optim as optim

class FederatedAveraging:
    def __init__(self, model, clients):
        self.global_model = model
        self.clients = clients

    def train_round(self):
        # 收集客户端模型
        client_models = []
        for client in self.clients:
            # 客户端本地训练
            client_model = client.train()
            client_models.append(client_model)

        # 联邦平均
        with torch.no_grad():
            for param in self.global_model.parameters():
                param.data = torch.zeros_like(param.data)

            for client_model in client_models:
                for param, client_param in zip(
                    self.global_model.parameters(),
                    client_model.parameters()
                ):
                    param.data += client_param.data / len(self.clients)

        return self.global_model`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>自监督学习对比学习</SectionTitle>
        <BookCode language="python" code={`import torch
import torch.nn as nn
import torch.nn.functional as F

class ContrastiveLearning(nn.Module):
    def __init__(self, encoder):
        super().__init__()
        self.encoder = encoder
        self.projection = nn.Sequential(
            nn.Linear(encoder.output_dim, 512),
            nn.ReLU(),
            nn.Linear(512, 128)
        )

    def forward(self, x1, x2):
        # 编码
        z1 = self.encoder(x1)
        z2 = self.encoder(x2)

        # 投影
        p1 = self.projection(z1)
        p2 = self.projection(z2)

        # 归一化
        p1 = F.normalize(p1, dim=1)
        p2 = F.normalize(p2, dim=1)

        # 计算对比损失
        logits = torch.matmul(p1, p2.t())
        labels = torch.arange(logits.size(0))
        loss = F.cross_entropy(logits, labels)

        return loss`} />
        <TagGrid items={['PyTorch', '联邦学习', '对比学习', '自监督', 'SimCLR']} />
      </div>
    ),
  },
  {
    label: '例题练习',
    left: (
      <div className="space-y-4">
        <PageTitle>实战练习</PageTitle>
        <SectionTitle>题目一：联邦学习系统</SectionTitle>
        <BookParagraph>
          实现一个简单的联邦学习系统，包含以下功能：
        </BookParagraph>
        <BookList ordered items={[
          '多客户端训练',
          '模型聚合',
          '差分隐私保护',
          '通信优化',
          '性能评估',
        ]} />
        <BookParagraph><b>提示：</b></BookParagraph>
        <BookList items={[
          '使用PyTorch实现模型',
          '考虑使用差分隐私库',
          '实现模型压缩',
        ]} />
        <BookParagraph><b>参考答案：</b></BookParagraph>
        <BookCode language="python" code={`import torch
import torch.nn as nn
import torch.optim as optim
from opacus import PrivacyEngine
import numpy as np

class FederatedClient:
    def __init__(self, model, data, privacy_engine=None):
        self.model = model
        self.data = data
        self.privacy_engine = privacy_engine
        self.optimizer = optim.SGD(self.model.parameters(), lr=0.01)

    def train(self, epochs=1):
        self.model.train()
        for epoch in range(epochs):
            for batch in self.data:
                self.optimizer.zero_grad()
                loss = self.train_step(batch)
                loss.backward()
                self.optimizer.step()
        return self.model

class FederatedServer:
    def __init__(self, model, clients):
        self.global_model = model
        self.clients = clients

    def train_round(self, epochs=1):
        # 客户端训练
        client_models = []
        for client in self.clients:
            client_model = client.train(epochs)
            client_models.append(client_model)

        # 模型聚合
        self.aggregate_models(client_models)

        # 评估性能
        metrics = self.evaluate()
        return metrics

    def aggregate_models(self, client_models):
        with torch.no_grad():
            for param in self.global_model.parameters():
                param.data = torch.zeros_like(param.data)

            for client_model in client_models:
                for param, client_param in zip(
                    self.global_model.parameters(),
                    client_model.parameters()
                ):
                    param.data += client_param.data / len(self.clients)

    def evaluate(self):
        # 实现性能评估逻辑
        pass

# 使用示例
def main():
    # 初始化模型和客户端
    model = nn.Sequential(
        nn.Linear(10, 64),
        nn.ReLU(),
        nn.Linear(64, 2)
    )

    # 创建差分隐私引擎
    privacy_engine = PrivacyEngine(
        model,
        batch_size=32,
        sample_size=1000,
        alphas=[1.1, 2.0, 10.0],
        noise_multiplier=1.0,
        max_grad_norm=1.0,
    )

    # 创建客户端
    clients = [
        FederatedClient(model, data, privacy_engine)
        for data in client_datasets
    ]

    # 创建服务器
    server = FederatedServer(model, clients)

    # 训练过程
    for round in range(10):
        metrics = server.train_round()
        print(f"Round {round} metrics:", metrics)`} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>题目二：可解释性分析</SectionTitle>
        <BookParagraph>
          对深度学习模型进行可解释性分析，完成以下任务：
        </BookParagraph>
        <BookList ordered items={[
          '实现SHAP值计算',
          '生成特征重要性图',
          '分析模型决策路径',
          '生成解释报告',
          '评估解释质量',
        ]} />
        <BookParagraph><b>提示：</b></BookParagraph>
        <BookList items={[
          '使用SHAP库',
          '可视化分析结果',
          '考虑计算效率',
        ]} />
        <BookParagraph><b>参考答案：</b></BookParagraph>
        <BookCode language="python" code={`import shap
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
from sklearn.metrics import accuracy_score
import lime
import lime.lime_tabular

class ModelExplainer:
    def __init__(self, model, feature_names):
        self.model = model
        self.feature_names = feature_names

    def compute_shap_values(self, X):
        # 创建SHAP解释器
        explainer = shap.DeepExplainer(self.model, X)
        shap_values = explainer.shap_values(X)
        return shap_values

    def plot_feature_importance(self, shap_values, X):
        # 绘制特征重要性图
        shap.summary_plot(
            shap_values,
            X,
            feature_names=self.feature_names,
            show=False
        )
        plt.title("Feature Importance")
        plt.tight_layout()
        plt.savefig("feature_importance.png")
        plt.close()

    def analyze_decision_path(self, X, instance_idx):
        # 使用LIME分析单个实例的决策路径
        explainer = lime.lime_tabular.LimeTabularExplainer(
            X,
            feature_names=self.feature_names,
            class_names=['class_0', 'class_1'],
            mode='classification'
        )

        exp = explainer.explain_instance(
            X[instance_idx],
            self.model.predict_proba,
            num_features=10
        )
        exp.show_in_notebook()

    def generate_explanation_report(self, X, y_true):
        # 计算SHAP值
        shap_values = self.compute_shap_values(X)

        # 生成特征重要性图
        self.plot_feature_importance(shap_values, X)

        # 分析决策路径
        for i in range(min(5, len(X))):
            self.analyze_decision_path(X, i)

        # 评估解释质量
        quality_metrics = self.evaluate_explanation_quality(X, y_true)

        return {
            'shap_values': shap_values,
            'feature_importance_plot': 'feature_importance.png',
            'quality_metrics': quality_metrics
        }

    def evaluate_explanation_quality(self, X, y_true):
        # 评估解释质量
        shap_values = self.compute_shap_values(X)

        # 计算特征重要性得分
        feature_importance = np.abs(shap_values).mean(axis=0)

        # 计算模型预测的准确性
        y_pred = self.model.predict(X)
        accuracy = accuracy_score(y_true, y_pred)

        return {
            'feature_importance_scores': feature_importance,
            'model_accuracy': accuracy
        }

# 使用示例
def main():
    # 假设我们有一个训练好的模型和数据集
    model = load_trained_model()
    X = load_data()
    y_true = load_labels()
    feature_names = ['feature1', 'feature2', ...]

    # 创建解释器
    explainer = ModelExplainer(model, feature_names)

    # 生成解释报告
    report = explainer.generate_explanation_report(X, y_true)

    # 打印评估结果
    print("Explanation Quality Metrics:")
    print(report['quality_metrics'])

if __name__ == "__main__":
    main()`} />
        <TagGrid items={['SHAP', 'LIME', '可解释AI', '特征重要性', '模型解释', 'XAI']} />
      </div>
    ),
  },
]

export default function MlAdvancedPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }

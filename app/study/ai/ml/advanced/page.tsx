'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaRobot, FaBrain, FaChartLine, FaCode, FaLightbulb, FaNetworkWired, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { SiScikitlearn, SiPandas, SiNumpy } from 'react-icons/si';

export default function MLAdvancedPage() {
  const [activeTab, setActiveTab] = useState('theory');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">机器学习进阶与前沿</h1>
      
      {/* 进度条 */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '100%' }}></div>
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
            <h2 className="text-2xl font-semibold mb-4">前沿技术</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">1. 联邦学习</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">概述：</h4>
                  <p className="text-gray-700 mb-4">
                    联邦学习是一种分布式机器学习方法，允许多个设备或服务器在保护数据隐私的前提下协同训练模型。
                  </p>
                  <h4 className="font-semibold mb-2">主要特点：</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>数据隐私保护
                      <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                        <li>原始数据保留在本地</li>
                        <li>只传输模型参数</li>
                      </ul>
                    </li>
                    <li>分布式训练
                      <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                        <li>多设备协同</li>
                        <li>异步更新</li>
                      </ul>
                    </li>
                    <li>应用场景
                      <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                        <li>医疗数据共享</li>
                        <li>金融风控</li>
                        <li>移动设备个性化</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">2. 自监督学习</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">概述：</h4>
                  <p className="text-gray-700 mb-4">
                    自监督学习是一种无需人工标注的学习方法，通过设计预训练任务来学习数据的内在表示。
                  </p>
                  <h4 className="font-semibold mb-2">主要方法：</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>对比学习
                      <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                        <li>SimCLR</li>
                        <li>MoCo</li>
                      </ul>
                    </li>
                    <li>掩码预测
                      <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                        <li>BERT</li>
                        <li>MAE</li>
                      </ul>
                    </li>
                    <li>应用领域
                      <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                        <li>计算机视觉</li>
                        <li>自然语言处理</li>
                        <li>语音识别</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">新兴研究方向</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">3. 可解释性AI</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">概述：</h4>
                  <p className="text-gray-700 mb-4">
                    可解释性AI致力于使机器学习模型的决策过程更加透明和可理解。
                  </p>
                  <h4 className="font-semibold mb-2">主要技术：</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>模型解释方法
                      <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                        <li>SHAP值</li>
                        <li>LIME</li>
                        <li>特征重要性</li>
                      </ul>
                    </li>
                    <li>可解释模型
                      <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                        <li>决策树</li>
                        <li>规则集</li>
                        <li>线性模型</li>
                      </ul>
                    </li>
                    <li>应用价值
                      <ul className="list-disc list-inside text-gray-600 ml-4 mt-2">
                        <li>医疗诊断</li>
                        <li>金融风控</li>
                        <li>法律决策</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : null}

      {activeTab === 'practice' ? (
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">联邦学习实现</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">1. 联邦平均算法</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">实现：</h4>
                  <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm text-gray-800">
{`import torch
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
                    
        return self.global_model`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">2. 自监督学习实现</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">实现：</h4>
                  <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm text-gray-800">
{`import torch
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
        
        return loss`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : null}

      {activeTab === 'exercise' ? (
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">实战练习</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">题目一：联邦学习系统</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">要求：</h4>
                  <p className="text-gray-700 mb-4">
                    实现一个简单的联邦学习系统，包含以下功能：
                  </p>
                  <ul className="list-decimal list-inside text-gray-700 space-y-2">
                    <li>多客户端训练</li>
                    <li>模型聚合</li>
                    <li>差分隐私保护</li>
                    <li>通信优化</li>
                    <li>性能评估</li>
                  </ul>
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">提示：</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>使用PyTorch实现模型</li>
                      <li>考虑使用差分隐私库</li>
                      <li>实现模型压缩</li>
                    </ul>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">参考答案：</h4>
                    <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-sm text-gray-800">
{`import torch
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
        print(f"Round {round} metrics:", metrics)`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">题目二：可解释性分析</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">要求：</h4>
                  <p className="text-gray-700 mb-4">
                    对深度学习模型进行可解释性分析，完成以下任务：
                  </p>
                  <ul className="list-decimal list-inside text-gray-700 space-y-2">
                    <li>实现SHAP值计算</li>
                    <li>生成特征重要性图</li>
                    <li>分析模型决策路径</li>
                    <li>生成解释报告</li>
                    <li>评估解释质量</li>
                  </ul>
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">提示：</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>使用SHAP库</li>
                      <li>可视化分析结果</li>
                      <li>考虑计算效率</li>
                    </ul>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">参考答案：</h4>
                    <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-sm text-gray-800">
{`import shap
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
    main()`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : null}

      {/* 导航链接 */}
      <div className="flex justify-between mt-8">
        <Link 
          href="/study/ai/ml/interview"
          className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 flex items-center"
        >
          <FaArrowLeft className="mr-2" />
          上一课：机器学习面试题
        </Link>
        <Link 
          href="/study/ai/dl/basic"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center"
        >
          下一课：深度学习基础
          <FaArrowRight className="ml-2" />
        </Link>
      </div>
    </div>
  );
} 
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DeepLearningRecommendationPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  const tabs = [
    { id: 'overview', label: '概述' },
    { id: 'models', label: '模型架构' },
    { id: 'implementation', label: '实现方法' },
    { id: 'applications', label: '应用实践' }
  ];

  const toggleContent = (contentId: string) => {
    setExpandedContent(expandedContent === contentId ? null : contentId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">深度学习推荐</h1>
      
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
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">深度学习推荐简介</h3>
              <div className="prose max-w-none">
                <p className="mb-4">
                  深度学习推荐系统利用深度神经网络强大的特征提取和表示学习能力，能够自动学习用户和物品的复杂特征表示，
                  从而提供更精准的个性化推荐。相比传统推荐方法，深度学习推荐具有更强的表达能力和更好的泛化性能。
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">深度学习推荐的主要特点</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>自动特征提取和学习</li>
                    <li>强大的非线性建模能力</li>
                    <li>端到端训练和优化</li>
                    <li>支持多模态数据融合</li>
                    <li>可扩展性好</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">基本原理</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">核心思想</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>使用深度神经网络学习用户和物品的表示</li>
                    <li>通过多层非线性变换提取高阶特征</li>
                    <li>端到端训练优化推荐目标</li>
                    <li>支持多任务学习和迁移学习</li>
                  </ul>
                </div>

                {/* 深度学习推荐架构图 */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">深度学习推荐系统架构</h4>
                  <svg className="w-full h-64" viewBox="0 0 800 300">
                    <defs>
                      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{stopColor: '#4F46E5', stopOpacity: 0.8}} />
                        <stop offset="100%" style={{stopColor: '#7C3AED', stopOpacity: 0.8}} />
                      </linearGradient>
                    </defs>
                    {/* 输入层 */}
                    <rect x="50" y="50" width="150" height="200" rx="5" fill="url(#grad1)" />
                    <text x="125" y="150" textAnchor="middle" fill="white" className="font-medium">输入层</text>
                    
                    {/* 隐藏层 */}
                    <rect x="250" y="50" width="150" height="200" rx="5" fill="url(#grad1)" />
                    <text x="325" y="150" textAnchor="middle" fill="white" className="font-medium">隐藏层</text>
                    
                    {/* 输出层 */}
                    <rect x="450" y="50" width="150" height="200" rx="5" fill="url(#grad1)" />
                    <text x="525" y="150" textAnchor="middle" fill="white" className="font-medium">输出层</text>
                    
                    {/* 预测层 */}
                    <rect x="650" y="50" width="100" height="200" rx="5" fill="url(#grad1)" />
                    <text x="700" y="150" textAnchor="middle" fill="white" className="font-medium">预测</text>
                    
                    {/* 连接线 */}
                    <line x1="200" y1="150" x2="250" y2="150" stroke="#4B5563" strokeWidth="2" />
                    <line x1="400" y1="150" x2="450" y2="150" stroke="#4B5563" strokeWidth="2" />
                    <line x1="600" y1="150" x2="650" y2="150" stroke="#4B5563" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">应用场景</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">典型应用</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>视频推荐</li>
                    <li>电商推荐</li>
                    <li>新闻推荐</li>
                    <li>音乐推荐</li>
                    <li>社交网络推荐</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">适用条件</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>数据量充足</li>
                    <li>特征复杂多样</li>
                    <li>需要高精度推荐</li>
                    <li>计算资源充足</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'models' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">模型架构</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">深度协同过滤</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      深度协同过滤（DeepCF）将传统协同过滤与深度学习相结合，通过多层神经网络学习用户和物品的交互特征。
                    </p>
                    <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                      <pre>{`class DeepCF(nn.Module):
    def __init__(self, num_users, num_items, num_factors=32):
        super(DeepCF, self).__init__()
        self.user_embedding = nn.Embedding(num_users, num_factors)
        self.item_embedding = nn.Embedding(num_items, num_factors)
        
        self.fc_layers = nn.Sequential(
            nn.Linear(num_factors * 2, 64),
            nn.ReLU(),
            nn.Linear(64, 32),
            nn.ReLU(),
            nn.Linear(32, 1)
        )
    
    def forward(self, user_input, item_input):
        user_embedding = self.user_embedding(user_input)
        item_embedding = self.item_embedding(item_input)
        
        concat = torch.cat([user_embedding, item_embedding], dim=1)
        output = self.fc_layers(concat)
        return torch.sigmoid(output)`}</pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Wide & Deep</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      Wide & Deep模型结合了线性模型（Wide）和深度神经网络（Deep）的优点，能够同时学习记忆和泛化能力。
                    </p>
                    <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                      <pre>{`class WideDeep(nn.Module):
    def __init__(self, num_features, embedding_dim=16):
        super(WideDeep, self).__init__()
        self.wide = nn.Linear(num_features, 1)
        
        self.deep = nn.Sequential(
            nn.Linear(num_features, embedding_dim),
            nn.ReLU(),
            nn.Linear(embedding_dim, 32),
            nn.ReLU(),
            nn.Linear(32, 1)
        )
    
    def forward(self, x):
        wide_out = self.wide(x)
        deep_out = self.deep(x)
        return torch.sigmoid(wide_out + deep_out)`}</pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">DeepFM</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      DeepFM模型结合了因子分解机（FM）和深度神经网络，能够自动学习特征间的低阶和高阶交互。
                    </p>
                    <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                      <pre>{`class DeepFM(nn.Module):
    def __init__(self, num_features, embedding_dim=16):
        super(DeepFM, self).__init__()
        self.embedding = nn.Embedding(num_features, embedding_dim)
        
        self.fm = nn.Linear(num_features, 1)
        
        self.deep = nn.Sequential(
            nn.Linear(num_features * embedding_dim, 128),
            nn.ReLU(),
            nn.Linear(128, 64),
            nn.ReLU(),
            nn.Linear(64, 1)
        )
    
    def forward(self, x):
        # FM部分
        fm_input = self.embedding(x)
        fm_output = self.fm(x)
        
        # Deep部分
        deep_input = fm_input.view(-1, fm_input.size(1) * fm_input.size(2))
        deep_output = self.deep(deep_input)
        
        return torch.sigmoid(fm_output + deep_output)`}</pre>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">NCF</h4>
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      神经协同过滤（NCF）使用神经网络替代传统矩阵分解中的点积操作，能够学习更复杂的用户-物品交互模式。
                    </p>
                    <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                      <pre>{`class NCF(nn.Module):
    def __init__(self, num_users, num_items, num_factors=32):
        super(NCF, self).__init__()
        self.user_embedding = nn.Embedding(num_users, num_factors)
        self.item_embedding = nn.Embedding(num_items, num_factors)
        
        self.mlp = nn.Sequential(
            nn.Linear(num_factors * 2, 64),
            nn.ReLU(),
            nn.Linear(64, 32),
            nn.ReLU(),
            nn.Linear(32, 16),
            nn.ReLU(),
            nn.Linear(16, 1)
        )
    
    def forward(self, user_input, item_input):
        user_embedding = self.user_embedding(user_input)
        item_embedding = self.item_embedding(item_input)
        
        concat = torch.cat([user_embedding, item_embedding], dim=1)
        output = self.mlp(concat)
        return torch.sigmoid(output)`}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'implementation' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">实现方法</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">数据预处理</h4>
                  <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                    <pre>{`def preprocess_data(data):
    # 特征工程
    categorical_features = ['user_id', 'item_id', 'category']
    numerical_features = ['price', 'rating']
    
    # 类别特征编码
    for feature in categorical_features:
        le = LabelEncoder()
        data[feature] = le.fit_transform(data[feature])
    
    # 数值特征标准化
    scaler = StandardScaler()
    data[numerical_features] = scaler.fit_transform(data[numerical_features])
    
    return data`}</pre>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">模型训练</h4>
                  <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                    <pre>{`def train_model(model, train_loader, criterion, optimizer, num_epochs):
    for epoch in range(num_epochs):
        model.train()
        total_loss = 0
        
        for batch in train_loader:
            user_input = batch['user_id']
            item_input = batch['item_id']
            labels = batch['label']
            
            # 前向传播
            predictions = model(user_input, item_input)
            loss = criterion(predictions, labels)
            
            # 反向传播
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()
            
            total_loss += loss.item()
        
        avg_loss = total_loss / len(train_loader)
        print(f'Epoch {epoch+1}, Loss: {avg_loss:.4f}')`}</pre>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">模型评估</h4>
                  <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                    <pre>{`def evaluate_model(model, test_loader):
    model.eval()
    predictions = []
    actuals = []
    
    with torch.no_grad():
        for batch in test_loader:
            user_input = batch['user_id']
            item_input = batch['item_id']
            labels = batch['label']
            
            outputs = model(user_input, item_input)
            predictions.extend(outputs.cpu().numpy())
            actuals.extend(labels.cpu().numpy())
    
    # 计算评估指标
    auc = roc_auc_score(actuals, predictions)
    ndcg = ndcg_score(actuals, predictions)
    
    return {'auc': auc, 'ndcg': ndcg}`}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">应用实践</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">实际应用案例</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>YouTube视频推荐</li>
                    <li>Netflix电影推荐</li>
                    <li>Amazon商品推荐</li>
                    <li>Google Play应用推荐</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">最佳实践</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>数据质量保证</li>
                    <li>特征工程优化</li>
                    <li>模型选择与调优</li>
                    <li>在线服务部署</li>
                    <li>A/B测试验证</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">常见问题与解决方案</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>冷启动问题</li>
                    <li>数据稀疏性</li>
                    <li>计算效率</li>
                    <li>模型更新</li>
                    <li>推荐多样性</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/ai/recsys/matrix-factorization"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回矩阵分解
        </Link>
        <Link 
          href="/study/ai/recsys/evaluation"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          推荐系统评估 →
        </Link>
      </div>
    </div>
  );
} 
'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@shared/components/ui/book/BookContent'

const deepcfCode = `class DeepCF(nn.Module):
    def __init__(self, num_users, num_items, num_factors=32):
        super(DeepCF, self).__init__()
        self.user_embedding = nn.Embedding(num_users, num_factors)
        self.item_embedding = nn.Embedding(num_items, num_factors)
        self.fc_layers = nn.Sequential(
            nn.Linear(num_factors * 2, 64), nn.ReLU(),
            nn.Linear(64, 32), nn.ReLU(),
            nn.Linear(32, 1))
    def forward(self, user_input, item_input):
        concat = torch.cat([self.user_embedding(user_input), self.item_embedding(item_input)], dim=1)
        return torch.sigmoid(self.fc_layers(concat))`

const wideDeepCode = `class WideDeep(nn.Module):
    def __init__(self, num_features, embedding_dim=16):
        super(WideDeep, self).__init__()
        self.wide = nn.Linear(num_features, 1)
        self.deep = nn.Sequential(
            nn.Linear(num_features, embedding_dim), nn.ReLU(),
            nn.Linear(embedding_dim, 32), nn.ReLU(),
            nn.Linear(32, 1))
    def forward(self, x):
        return torch.sigmoid(self.wide(x) + self.deep(x))`

const deepfmCode = `class DeepFM(nn.Module):
    def __init__(self, num_features, embedding_dim=16):
        super(DeepFM, self).__init__()
        self.embedding = nn.Embedding(num_features, embedding_dim)
        self.fm = nn.Linear(num_features, 1)
        self.deep = nn.Sequential(
            nn.Linear(num_features * embedding_dim, 128), nn.ReLU(),
            nn.Linear(128, 64), nn.ReLU(),
            nn.Linear(64, 1))
    def forward(self, x):
        fm_input = self.embedding(x)
        deep_out = self.deep(fm_input.view(-1, fm_input.size(1) * fm_input.size(2)))
        return torch.sigmoid(self.fm(x) + deep_out)`

const ncfCode = `class NCF(nn.Module):
    def __init__(self, num_users, num_items, num_factors=32):
        super(NCF, self).__init__()
        self.user_embedding = nn.Embedding(num_users, num_factors)
        self.item_embedding = nn.Embedding(num_items, num_factors)
        self.mlp = nn.Sequential(
            nn.Linear(num_factors * 2, 64), nn.ReLU(),
            nn.Linear(64, 32), nn.ReLU(),
            nn.Linear(32, 16), nn.ReLU(),
            nn.Linear(16, 1))
    def forward(self, user_input, item_input):
        concat = torch.cat([self.user_embedding(user_input), self.item_embedding(item_input)], dim=1)
        return torch.sigmoid(self.mlp(concat))`

const META: LessonMeta = {
  subject: '推荐系统', chapterTitle: '深度学习推荐', chapterNumber: 5, totalChapters: 12,
  subjectHref: '/study/ai/recsys',
  prevChapter: { label: '矩阵分解', href: '/study/ai/recsys/matrix-factorization' },
  nextChapter: { label: '推荐系统评估', href: '/study/ai/recsys/evaluation' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '概述', left: (<div className="space-y-4"><PageTitle>深度学习推荐简介</PageTitle><BookParagraph>深度学习推荐系统利用深度神经网络强大的特征提取和表示学习能力，能够自动学习用户和物品的复杂特征表示，从而提供更精准的个性化推荐。相比传统推荐方法，深度学习推荐具有更强的表达能力和更好的泛化性能。</BookParagraph><SectionTitle>主要特点</SectionTitle><BookList items={['自动特征提取和学习','强大的非线性建模能力','端到端训练和优化','支持多模态数据融合','可扩展性好']} /><SectionTitle>核心思想</SectionTitle><BookList items={['使用深度神经网络学习用户和物品的表示','通过多层非线性变换提取高阶特征','端到端训练优化推荐目标','支持多任务学习和迁移学习']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>应用场景</SectionTitle><BookList items={['视频推荐：YouTube','电商推荐：Amazon','新闻推荐：Google News','音乐推荐：Spotify','社交网络推荐']} /><SectionTitle>适用条件</SectionTitle><BookList items={['数据量充足','特征复杂多样','需要高精度推荐','计算资源充足']} /></div>),
  },
  {
    label: '模型架构', left: (<div className="space-y-4"><PageTitle>深度协同过滤（DeepCF）</PageTitle><BookParagraph>DeepCF将传统协同过滤与深度学习相结合，通过多层神经网络学习用户和物品的交互特征。</BookParagraph><BookCode language="python" code={deepcfCode} /><PageTitle>Wide & Deep</PageTitle><BookParagraph>Wide & Deep模型结合了线性模型（Wide）和深度神经网络（Deep）的优点，能够同时学习记忆和泛化能力。</BookParagraph><BookCode language="python" code={wideDeepCode} /></div>),
    right: (<div className="space-y-4"><PageTitle>DeepFM</PageTitle><BookParagraph>DeepFM模型结合了因子分解机（FM）和深度神经网络，能够自动学习特征间的低阶和高阶交互。</BookParagraph><BookCode language="python" code={deepfmCode} /><PageTitle>NCF（神经协同过滤）</PageTitle><BookParagraph>神经协同过滤（NCF）使用神经网络替代传统矩阵分解中的点积操作，能够学习更复杂的用户-物品交互模式。</BookParagraph><BookCode language="python" code={ncfCode} /></div>),
  },
  {
    label: '实现方法', left: (<div className="space-y-4"><PageTitle>实现方法</PageTitle><SectionTitle>数据预处理</SectionTitle><BookCode language="python" code={`def preprocess_data(data):\n    categorical_features = ['user_id', 'item_id', 'category']\n    numerical_features = ['price', 'rating']\n    for f in categorical_features:\n        data[f] = LabelEncoder().fit_transform(data[f])\n    scaler = StandardScaler()\n    data[numerical_features] = scaler.fit_transform(data[numerical_features])\n    return data`} /><SectionTitle>模型训练</SectionTitle><BookCode language="python" code={`def train_model(model, train_loader, criterion, optimizer, num_epochs):\n    for epoch in range(num_epochs):\n        model.train(); total_loss = 0\n        for batch in train_loader:\n            preds = model(batch['user_id'], batch['item_id'])\n            loss = criterion(preds, batch['label'])\n            optimizer.zero_grad(); loss.backward(); optimizer.step()\n            total_loss += loss.item()\n        print(f'Epoch {epoch+1}, Loss: {total_loss/len(train_loader):.4f}')`} /></div>),
    right: (<div className="space-y-4"><SectionTitle>模型评估</SectionTitle><BookCode language="python" code={`def evaluate_model(model, test_loader):\n    model.eval(); preds, actuals = [], []\n    with torch.no_grad():\n        for batch in test_loader:\n            outputs = model(batch['user_id'], batch['item_id'])\n            preds.extend(outputs.cpu().numpy())\n            actuals.extend(batch['label'].cpu().numpy())\n    return {'auc': roc_auc_score(actuals, preds), 'ndcg': ndcg_score(actuals, preds)}`} /></div>),
  },
  {
    label: '应用实践', left: (<div className="space-y-4"><PageTitle>应用实践</PageTitle><SectionTitle>实际应用案例</SectionTitle><BookList items={['YouTube视频推荐','Netflix电影推荐','Amazon商品推荐','Google Play应用推荐']} /><SectionTitle>最佳实践</SectionTitle><BookList items={['数据质量保证','特征工程优化','模型选择与调优','在线服务部署','A/B测试验证']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>常见问题与解决方案</SectionTitle><BookList items={['冷启动问题','数据稀疏性','计算效率','模型更新','推荐多样性']} /></div>),
  },
]

export default function RecSysDeepLearningPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }

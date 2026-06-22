'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '推荐系统', chapterTitle: '推荐系统评估', chapterNumber: 6, totalChapters: 12,
  subjectHref: '/study/ai/recsys',
  prevChapter: { label: '深度学习推荐', href: '/study/ai/recsys/deep-learning' },
  nextChapter: { label: '冷启动问题', href: '/study/ai/recsys/cold-start' },
  theme: THEMES.ai,
}

const SPREADS = [
  { label: '概述', left: (<div className="space-y-4"><PageTitle>推荐系统评估概述</PageTitle><BookParagraph>推荐系统评估是推荐系统开发中至关重要的环节。通过科学的评估方法，可以客观地衡量推荐算法的性能，指导模型的优化和迭代。评估分为离线评估和在线评估两大类。</BookParagraph><SectionTitle>评估的重要性</SectionTitle><BookList items={['衡量推荐算法的有效性','指导模型优化方向','比较不同算法性能','监控线上系统表现']} /></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '评估指标', left: (<div className="space-y-4"><PageTitle>离线评估指标</PageTitle><SectionTitle>准确率指标</SectionTitle><BookList items={['准确率（Precision）：推荐物品中用户感兴趣的比率','召回率（Recall）：用户感兴趣的物品被推荐的比率','F1分数：Precision和Recall的调和平均','AUC-ROC：评估排序性能']} /><SectionTitle>排序指标</SectionTitle><BookList items={['NDCG：归一化折损累积增益，考虑位置权重','MAP：平均精度均值，综合多个查询','MRR：平均倒数排名，关注第一个相关结果','Hit Rate：命中率']} /></div>), right: (<div className="space-y-4"><SectionTitle>在线评估指标</SectionTitle><BookParagraph><b>用户行为指标：</b>点击率（CTR）、转化率（CVR）、停留时间、用户活跃度</BookParagraph><BookParagraph><b>业务指标：</b>GMV（总交易额）、ARPU（平均用户收入）、留存率、用户满意度</BookParagraph></div>) },
  { label: '评估方法', left: (<div className="space-y-4"><PageTitle>评估方法</PageTitle><SectionTitle>离线评估</SectionTitle><BookList items={['留出法：按比例划分训练集和测试集','交叉验证：K折交叉验证','时间序列划分：按时间划分训练测试集','A/B测试：在线对比实验']} /><SectionTitle>评估流程</SectionTitle><BookList items={['数据准备和预处理','模型训练和预测','指标计算和分析','结果对比和优化']} /></div>), right: (<div className="space-y-4"><br /></div>) },
  { label: '实践案例', left: (<div className="space-y-4"><PageTitle>实践案例</PageTitle><SectionTitle>评估代码示例</SectionTitle><BookCode language="python" code={`from sklearn.metrics import roc_auc_score, ndcg_score\ndef evaluate_recommender(ground_truth, predictions):\n    auc = roc_auc_score(ground_truth, predictions)\n    ndcg_val = ndcg_score([ground_truth], [predictions])\n    precision = sum((p > 0.5) == g for p, g in zip(predictions, ground_truth)) / len(ground_truth)\n    return {'auc': auc, 'ndcg': ndcg_val, 'precision': precision}`} /></div>), right: (<div className="space-y-4"><br /></div>) },
]

export default function RecSysEvalPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }

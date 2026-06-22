'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookList,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '计算机视觉', chapterTitle: '进阶与前沿', chapterNumber: 13, totalChapters: 13,
  subjectHref: '/study/ai/cv',
  prevChapter: { label: '计算机视觉面试题', href: '/study/ai/cv/interview' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '前沿技术', left: (<div className="space-y-4"><PageTitle>前沿技术</PageTitle><SectionTitle>Vision Transformer (ViT)</SectionTitle><BookList items={['将图像分割为固定大小的patch','使用位置编码保持空间信息','自注意力机制处理全局关系','在大规模数据集上表现优异']} /><SectionTitle>Swin Transformer</SectionTitle><BookList items={['层次化设计','滑动窗口注意力机制','多尺度特征提取','计算效率更高']} /><SectionTitle>对比学习</SectionTitle><BookList items={['SimCLR：端到端对比学习','MoCo：动量对比学习','BYOL：自监督表示学习','无需标注数据']} /></div>),
    right: (<div className="space-y-4"><br /><SectionTitle>掩码图像建模</SectionTitle><BookList items={['MAE：掩码自编码器','BEiT：双向编码器','自监督预训练','迁移学习效果好']} /></div>),
  },
  {
    label: '发展趋势', left: (<div className="space-y-4"><PageTitle>发展趋势</PageTitle><SectionTitle>多模态融合</SectionTitle><BookList items={['视觉-语言预训练','跨模态理解','多模态生成','统一表示学习']} /><SectionTitle>小样本学习</SectionTitle><BookList items={['元学习','迁移学习','数据增强','少样本适应']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>边缘计算</SectionTitle><BookList items={['模型轻量化','实时推理','低功耗设计','分布式部署']} /><SectionTitle>可解释性</SectionTitle><BookList items={['注意力可视化','决策解释','可信AI','公平性分析']} /></div>),
  },
  {
    label: '研究热点', left: (<div className="space-y-4"><PageTitle>研究热点</PageTitle><SectionTitle>表示学习</SectionTitle><BookList items={['自监督预训练','对比学习','知识蒸馏','特征解耦']} /><SectionTitle>模型架构</SectionTitle><BookList items={['注意力机制','动态网络','神经架构搜索','混合架构']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>3D视觉</SectionTitle><BookList items={['点云处理','3D重建','深度估计','场景理解']} /><SectionTitle>视频理解</SectionTitle><BookList items={['时序建模','动作识别','视频生成','多视角学习']} /></div>),
  },
  {
    label: '未来展望', left: (<div className="space-y-4"><PageTitle>未来展望</PageTitle><SectionTitle>通用视觉模型</SectionTitle><BookList items={['统一架构','多任务学习','持续学习','知识迁移']} /><SectionTitle>认知智能</SectionTitle><BookList items={['场景理解','因果推理','常识推理','多模态交互']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>智能交互</SectionTitle><BookList items={['AR/VR应用','人机协作','智能助手','情感交互']} /><SectionTitle>产业升级</SectionTitle><BookList items={['智能制造','智慧城市','医疗健康','自动驾驶']} /></div>),
  },
]

export default function CvAdvancedPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }

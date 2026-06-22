'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookList,
} from '@/app/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '深度学习',
  chapterTitle: '进阶与前沿',
  chapterNumber: 14,
  totalChapters: 14,
  subjectHref: '/study/ai/dl',
  prevChapter: { label: '深度学习面试题', href: '/study/ai/dl/interview' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '进阶知识',
    left: (
      <div className="space-y-4">
        <PageTitle>进阶知识</PageTitle>
        <BookList items={[
          '自注意力机制（Self-Attention）：捕捉序列中任意位置之间的依赖关系，是Transformer的核心',
          'Transformer架构：基于自注意力的深度学习模型，广泛应用于NLP、CV等领域',
          '预训练与微调（Pre-training & Fine-tuning）：先在大规模数据上预训练，再在下游任务上微调，提升泛化能力',
          '多模态学习：融合图像、文本、语音等多种模态信息，提升模型理解能力',
          '大模型与参数高效化：如GPT、BERT、ViT等，及其高效推理与压缩技术',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>学习建议</SectionTitle>
        <BookParagraph>
          进阶学习需要扎实的基础知识和持续的前沿跟踪。建议您多读经典论文、参与开源项目、动手实践最新模型，将理论与实践相结合。
        </BookParagraph>
      </div>
    ),
  },
  {
    label: '前沿进展',
    left: (
      <div className="space-y-4">
        <PageTitle>前沿进展</PageTitle>
        <BookList items={[
          '大语言模型（LLM）：如GPT-4、Llama、ERNIE等，推动NLP和多模态智能发展',
          '扩散模型（Diffusion Model）：如Stable Diffusion、DALL·E等，生成式AI领域的突破',
          '视觉Transformer（ViT）：将Transformer应用于图像识别，取得SOTA性能',
          '多模态融合：CLIP、BLIP等模型实现图文联合理解与生成',
          '自动机器学习（AutoML）：如NAS、自动调参，提升模型开发效率',
          'AI安全与可解释性：对抗样本、模型可解释性、隐私保护等成为研究热点',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>研究方向</SectionTitle>
        <BookParagraph>
          当前深度学习的前沿研究主要集中在以下几个方向：更大规模的模型、更高效的训练方法、更广泛的跨模态应用、以及更可靠的AI系统。
        </BookParagraph>
      </div>
    ),
  },
  {
    label: '实用资源',
    left: (
      <div className="space-y-4">
        <PageTitle>实用资源</PageTitle>
        <SectionTitle>论文推荐</SectionTitle>
        <BookParagraph>
          <a href="https://arxiv.org/abs/1706.03762" className="text-blue-600 underline" target="_blank">Attention is All You Need</a> — Transformer架构的开创性论文
        </BookParagraph>
        <BookParagraph>
          <a href="https://arxiv.org/abs/1810.04805" className="text-blue-600 underline" target="_blank">BERT: Pre-training of Deep Bidirectional Transformers</a>
        </BookParagraph>
        <BookParagraph>
          <a href="https://arxiv.org/abs/2006.11239" className="text-blue-600 underline" target="_blank">An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale</a>
        </BookParagraph>

        <SectionTitle>开源项目</SectionTitle>
        <BookParagraph>
          <a href="https://github.com/huggingface/transformers" className="text-blue-600 underline" target="_blank">HuggingFace Transformers</a> — 最流行的Transformer模型库
        </BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <BookParagraph>
          <a href="https://github.com/ultralytics/yolov5" className="text-blue-600 underline" target="_blank">YOLOv5</a> — 主流目标检测框架
        </BookParagraph>
        <BookParagraph>
          <a href="https://github.com/openai/whisper" className="text-blue-600 underline" target="_blank">OpenAI Whisper</a> — 通用语音识别模型
        </BookParagraph>

        <SectionTitle>学习网站</SectionTitle>
        <BookParagraph>
          <a href="https://paperswithcode.com/" className="text-blue-600 underline" target="_blank">Papers with Code</a> — 论文与代码追踪
        </BookParagraph>
        <BookParagraph>
          <a href="https://www.deeplearning.ai/" className="text-blue-600 underline" target="_blank">DeepLearning.AI</a> — 深度学习在线课程
        </BookParagraph>
        <BookParagraph>
          <a href="https://www.kaggle.com/" className="text-blue-600 underline" target="_blank">Kaggle</a> — 数据科学竞赛平台
        </BookParagraph>

        <SectionTitle>社区与资讯</SectionTitle>
        <BookParagraph>
          <a href="https://www.zhihu.com/topic/19554298/hot" className="text-blue-600 underline" target="_blank">知乎-深度学习</a> — 中文社区讨论
        </BookParagraph>
        <BookParagraph>
          <a href="https://www.reddit.com/r/MachineLearning/" className="text-blue-600 underline" target="_blank">Reddit ML</a> — 英文社区讨论
        </BookParagraph>
      </div>
    ),
  },
  {
    label: '探索与思考',
    left: (
      <div className="space-y-4">
        <PageTitle>探索与思考</PageTitle>
        <BookList items={[
          '你如何看待AI大模型对未来社会和行业的影响？',
          '深度学习还有哪些瓶颈和挑战？',
          '你最感兴趣的前沿方向是什么？为什么？',
          '如何平衡AI创新与伦理安全？',
          '未来你希望在哪些领域用AI创造价值？',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>持续学习</SectionTitle>
        <BookParagraph>
          深度学习领域发展迅速，保持持续学习的习惯至关重要。建议定期阅读顶会论文（NeurIPS、ICML、ICLR、CVPR、ACL等），关注领域内知名研究机构和实验室的最新成果。
        </BookParagraph>
      </div>
    ),
  },
]

export default function DlAdvancedPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

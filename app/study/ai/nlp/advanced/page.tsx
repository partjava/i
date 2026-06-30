'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookList,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '自然语言处理', chapterTitle: '进阶与前沿', chapterNumber: 14, totalChapters: 14,
  subjectHref: '/study/ai/nlp',
  prevChapter: { label: 'NLP面试题', href: '/study/ai/nlp/interview' },
  theme: THEMES.ai,
}

const SPREADS = [
  { label: '研究趋势', left: (<div className="space-y-4"><PageTitle>研究趋势</PageTitle><SectionTitle>1. 大规模预训练语言模型</SectionTitle><BookParagraph>大规模预训练语言模型（如GPT-4、BERT、LLaMA等）持续推动NLP领域的发展。这些模型通过在海量数据上预训练，学习到了丰富的语言知识和推理能力。</BookParagraph><SectionTitle>2. 多模态学习</SectionTitle><BookParagraph>将文本、图像、语音等多种模态信息进行联合建模，实现跨模态的理解与生成。代表模型有CLIP、DALL-E等。</BookParagraph><SectionTitle>3. 指令微调与对齐</SectionTitle><BookParagraph>通过指令微调（Instruction Tuning）和人类反馈强化学习（RLHF）使语言模型更好地遵循人类意图，提高模型的有用性和安全性。</BookParagraph></div>),
    right: (<div className="space-y-4"><br /><SectionTitle>4. 高效训练与部署</SectionTitle><BookParagraph>研究如何在有限的计算资源下训练和部署大模型，包括模型压缩、蒸馏、量化等技术。</BookParagraph><SectionTitle>5. 可解释NLP</SectionTitle><BookParagraph>提高NLP模型的可解释性和透明度，使模型的决策过程更加可理解和可信。</BookParagraph></div>),
  },
  { label: '前沿模型', left: (<div className="space-y-4"><PageTitle>前沿模型</PageTitle><SectionTitle>1. GPT系列</SectionTitle><BookParagraph>OpenAI的GPT系列模型（GPT-3、GPT-4、InstructGPT）在文本生成、推理、对话等方面展现出了强大的能力，推动了AI领域的快速发展。</BookParagraph><SectionTitle>2. LLaMA系列</SectionTitle><BookParagraph>Meta推出的开源大语言模型系列，包括LLaMA和LLaMA-2等，为研究和应用提供了高质量的基础模型。</BookParagraph></div>),
    right: (<div className="space-y-4"><br /><SectionTitle>3. ChatGLM</SectionTitle><BookParagraph>清华大学开发的中英双语大语言模型，针对中文场景进行了优化，在中文NLP任务上表现优异。</BookParagraph><SectionTitle>4. 其他重要模型</SectionTitle><BookList items={['PaLM：Google的大语言模型','Claude：Anthropic的对话助手','Mistral：高效开源模型','Gemini：Google的多模态模型']} /></div>),
  },
  { label: '创新应用', left: (<div className="space-y-4"><PageTitle>创新应用</PageTitle><SectionTitle>1. AI写作助手</SectionTitle><BookParagraph>基于语言模型的AI写作工具可以辅助用户进行文章创作、邮件撰写、代码编写等任务，提高工作效率。</BookParagraph><SectionTitle>2. 智能编程助手</SectionTitle><BookParagraph>如GitHub Copilot等AI编程助手，能够根据自然语言描述生成代码，极大地提高了软件开发效率。</BookParagraph></div>),
    right: (<div className="space-y-4"><br /><SectionTitle>3. AI教育辅导</SectionTitle><BookParagraph>基于NLP技术的智能教育系统能够提供个性化学习辅导、自动批改作业、智能问答等服务。</BookParagraph><SectionTitle>4. 医疗NLP</SectionTitle><BookParagraph>NLP在医疗领域的应用包括病历分析、医学文献挖掘、辅助诊断、药物发现等。</BookParagraph></div>),
  },
  { label: '未来挑战', left: (<div className="space-y-4"><PageTitle>未来挑战</PageTitle><SectionTitle>1. 模型幻觉</SectionTitle><BookParagraph>大语言模型可能生成看似合理但实际上不正确的内容，如何减少模型幻觉是一个重要研究方向。</BookParagraph><SectionTitle>2. 安全与伦理</SectionTitle><BookParagraph>确保AI系统的安全性和伦理性，防止生成有害内容、歧视性输出，保护用户隐私。</BookParagraph></div>),
    right: (<div className="space-y-4"><br /><SectionTitle>3. 数据与计算效率</SectionTitle><BookParagraph>如何用更少的数据和计算资源训练出高质量的模型，降低AI的门槛和环境影响。</BookParagraph><SectionTitle>4. 评估与对齐</SectionTitle><BookParagraph>如何有效评估大模型的性能，确保模型的行为符合人类价值观和预期。</BookParagraph></div>),
  },
]

export default function NlpAdvancedPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }

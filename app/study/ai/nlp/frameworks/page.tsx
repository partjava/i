'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList, BookDivider,
} from '@shared/components/ui/book/BookContent'

const toolsCode = `# 使用Hugging Face Transformers
from transformers import pipeline, AutoTokenizer, AutoModel

# 文本分类
classifier = pipeline("text-classification")
result = classifier("这是一个很好的产品！")
print(result)

# 使用spaCy进行NLP处理
import spacy
nlp = spacy.load("zh_core_web_sm")
doc = nlp("这是一个示例句子。")
for token in doc:
    print(token.text, token.pos_, token.dep_)

# 使用NLTK进行文本处理
import nltk
from nltk.tokenize import word_tokenize
text = "这是一个示例文本。"
tokens = word_tokenize(text)
print(tokens)`

const META: LessonMeta = {
  subject: '自然语言处理', chapterTitle: 'NLP框架与工具', chapterNumber: 11, totalChapters: 14,
  subjectHref: '/study/ai/nlp',
  prevChapter: { label: '对话系统', href: '/study/ai/nlp/dialogue' },
  nextChapter: { label: 'NLP实战案例', href: '/study/ai/nlp/cases' },
  theme: THEMES.ai,
}

const SPREADS = [
  { label: '框架概述', left: (<div className="space-y-4"><PageTitle>NLP框架概述</PageTitle><BookParagraph>自然语言处理领域有多个强大的框架和工具，它们为NLP任务提供了丰富的功能和便捷的开发体验。选择合适的框架对于项目的成功至关重要。</BookParagraph><SectionTitle>主流框架</SectionTitle><BookList items={['Hugging Face Transformers','PyTorch','TensorFlow','spaCy','NLTK']} /></div>), right: (<div className="space-y-4"><SectionTitle>框架特点</SectionTitle><BookList items={['预训练模型支持','模型训练与部署','数据处理工具','评估与优化','社区支持']} /></div>) },
  { label: '常用工具', left: (<div className="space-y-4"><PageTitle>常用工具</PageTitle><BookParagraph>NLP开发中常用的工具和库，它们提供了丰富的功能和便捷的开发体验。</BookParagraph><SectionTitle>核心工具</SectionTitle><BookList items={['文本处理工具','分词工具','词向量工具','评估工具','可视化工具']} /></div>), right: (<div className="space-y-4"><SectionTitle>工具使用示例</SectionTitle><BookCode language="python" code={toolsCode} /></div>) },
  { label: '框架对比', left: (<div className="space-y-4"><PageTitle>框架对比</PageTitle><BookParagraph>不同NLP框架的特点和适用场景对比，帮助开发者选择合适的工具。</BookParagraph><SectionTitle>框架特点对比</SectionTitle><table className="min-w-full border-collapse"><thead><tr className="bg-gray-100"><th className="border p-2">框架</th><th className="border p-2">优势</th><th className="border p-2">适用场景</th></tr></thead><tbody><tr><td className="border p-2">Transformers</td><td className="border p-2">预训练模型丰富，使用简单</td><td className="border p-2">快速开发，模型应用</td></tr><tr><td className="border p-2">PyTorch</td><td className="border p-2">灵活性高，动态计算图</td><td className="border p-2">研究开发，模型训练</td></tr><tr><td className="border p-2">TensorFlow</td><td className="border p-2">部署方便，生态完善</td><td className="border p-2">生产环境，大规模部署</td></tr><tr><td className="border p-2">spaCy</td><td className="border p-2">性能优秀，API友好</td><td className="border p-2">工业应用，文本处理</td></tr></tbody></table></div>), right: (<div className="space-y-4"><SectionTitle>选择建议</SectionTitle><BookParagraph>选择框架时需要综合考虑项目需求、团队技术栈、框架生态等因素。建议从简单任务开始，逐步探索更适合的工具。</BookParagraph></div>) },
  { label: '实践指南', left: (<div className="space-y-4"><PageTitle>实践指南</PageTitle><BookParagraph>NLP框架和工具的使用实践指南，包括环境配置、开发流程和最佳实践。</BookParagraph><SectionTitle>开发流程</SectionTitle><BookList items={['环境配置','数据准备','模型选择','训练与评估','部署与优化']} ordered /></div>), right: (<div className="space-y-4"><SectionTitle>最佳实践</SectionTitle><BookList items={['选择合适的框架','数据预处理','模型优化','性能监控','持续改进']} /></div>) },
]

export default function NlpFrameworksPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }

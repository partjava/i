'use client'

import BookCover from '@shared/components/ui/book/BookCover'
import { THEMES } from '@shared/components/ui/book/theme'
import { SectionTitle, BookParagraph, BookList } from '@shared/components/ui/book/BookContent'

const CHAPTERS = [
  { number: 1, title: 'NLP基础', description: '自然语言处理基本概念和原理', href: '/study/ai/nlp/basic' },
  { number: 2, title: '文本预处理', description: '文本清洗、分词、标注等预处理技术', href: '/study/ai/nlp/preprocessing' },
  { number: 3, title: '词向量与词嵌入', description: 'Word2Vec、GloVe、FastText等词向量技术', href: '/study/ai/nlp/word-embeddings' },
  { number: 4, title: '文本分类', description: '情感分析、主题分类等文本分类任务', href: '/study/ai/nlp/text-classification' },
  { number: 5, title: '命名实体识别', description: 'NER任务及其实现方法', href: '/study/ai/nlp/ner' },
  { number: 6, title: '机器翻译', description: '统计机器翻译和神经机器翻译', href: '/study/ai/nlp/machine-translation' },
  { number: 7, title: '文本生成', description: '自动文本生成和语言模型', href: '/study/ai/nlp/text-generation' },
  { number: 8, title: '情感分析', description: '情感分析技术和应用', href: '/study/ai/nlp/sentiment-analysis' },
  { number: 9, title: '问答系统', description: '智能问答系统设计与实现', href: '/study/ai/nlp/qa' },
  { number: 10, title: '对话系统', description: '聊天机器人和对话管理', href: '/study/ai/nlp/dialogue' },
  { number: 11, title: 'NLP框架与工具', description: 'spaCy、NLTK、Transformers等工具', href: '/study/ai/nlp/frameworks' },
  { number: 12, title: 'NLP实战案例', description: '真实业务场景的NLP应用', href: '/study/ai/nlp/cases' },
  { number: 13, title: 'NLP面试题', description: 'NLP面试高频问题', href: '/study/ai/nlp/interview' },
  { number: 14, title: '进阶与前沿', description: '最新技术发展和研究方向', href: '/study/ai/nlp/advanced' },
]

const learningPath = [
  { phase: '第一阶段：基础入门', description: '掌握NLP基本概念和文本处理技术', courses: ['NLP基础(40分钟)', '文本预处理(45分钟)'] },
  { phase: '第二阶段：核心技术', description: '学习词向量和基础NLP任务', courses: ['词向量与词嵌入(50分钟)', '文本分类(60分钟)', '命名实体识别(45分钟)'] },
  { phase: '第三阶段：高级应用', description: '掌握复杂NLP任务和生成技术', courses: ['机器翻译(70分钟)', '文本生成(60分钟)', '情感分析(40分钟)'] },
  { phase: '第四阶段：系统开发', description: '构建完整的NLP应用系统', courses: ['问答系统(80分钟)', '对话系统(90分钟)', 'NLP框架与工具(50分钟)'] },
  { phase: '第五阶段：实战进阶', description: '完成项目实战，掌握前沿技术', courses: ['NLP实战案例(100分钟)', 'NLP面试题(45分钟)', '进阶与前沿(60分钟)'] },
]

export default function NlpHomePage() {
  return (
    <div className="space-y-8">
      <BookCover
        title="自然语言处理"
        subtitle="Natural Language Processing"
        description="自然语言处理（NLP）让计算机理解和生成人类语言，是人工智能最具挑战性的领域之一。从机器翻译到智能对话，NLP技术正在改变我们与机器交互的方式。"
        chapterCount={CHAPTERS.length}
        totalHours={180}
        chapters={CHAPTERS}
        icon="🗣️"
        startHref="/study/ai/nlp/basic"
        theme={THEMES.ai}
      />

      {/* 学习路径 */}
      <div className="bg-white rounded-2xl shadow-md p-8 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">学习路径</h2>
        <div className="space-y-6">
          {learningPath.map((phase, pi) => (
            <div key={pi} className="border-l-4 border-blue-500 pl-4 py-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-medium">阶段{pi + 1}</span>
                <h3 className="text-lg font-bold text-gray-900">{phase.phase}</h3>
              </div>
              <p className="text-gray-600 text-sm mb-2">{phase.description}</p>
              <div className="flex flex-wrap gap-2">
                {phase.courses.map((c, ci) => (
                  <span key={ci} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">{c}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 技术特色 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6 text-center"><div className="text-3xl mb-2">🗣️</div><h3 className="font-semibold text-gray-900">语言理解</h3><p className="text-gray-600 text-sm">让机器理解人类语言的含义</p></div>
        <div className="bg-white rounded-xl shadow-sm p-6 text-center"><div className="text-3xl mb-2">🚀</div><h3 className="font-semibold text-gray-900">应用广泛</h3><p className="text-gray-600 text-sm">搜索、翻译、客服等各个领域</p></div>
        <div className="bg-white rounded-xl shadow-sm p-6 text-center"><div className="text-3xl mb-2">🏆</div><h3 className="font-semibold text-gray-900">前景广阔</h3><p className="text-gray-600 text-sm">ChatGPT引领的AI语言革命</p></div>
        <div className="bg-white rounded-xl shadow-sm p-6 text-center"><div className="text-3xl mb-2">📖</div><h3 className="font-semibold text-gray-900">技术丰富</h3><p className="text-gray-600 text-sm">从传统方法到深度学习全覆盖</p></div>
      </div>

      {/* 职业方向 */}
      <div className="bg-white rounded-2xl shadow-md p-8 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">职业方向</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl"><div className="text-2xl">👨‍💻</div><div><h4 className="font-semibold text-gray-900">NLP算法工程师</h4><p className="text-gray-600 text-sm">专注自然语言处理算法研发</p></div></div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl"><div className="text-2xl">🤖</div><div><h4 className="font-semibold text-gray-900">对话系统工程师</h4><p className="text-gray-600 text-sm">开发智能客服和聊天机器人</p></div></div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl"><div className="text-2xl">🔍</div><div><h4 className="font-semibold text-gray-900">文本挖掘工程师</h4><p className="text-gray-600 text-sm">从文本数据中挖掘有价值信息</p></div></div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl"><div className="text-2xl">📋</div><div><h4 className="font-semibold text-gray-900">AI产品经理</h4><p className="text-gray-600 text-sm">规划和管理NLP相关产品</p></div></div>
        </div>
      </div>
    </div>
  )
}

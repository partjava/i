'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookList,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '自然语言处理',
  chapterTitle: 'NLP基础',
  chapterNumber: 1,
  totalChapters: 14,
  subjectHref: '/study/ai/nlp',
  nextChapter: { label: '文本预处理', href: '/study/ai/nlp/preprocessing' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '概述',
    left: (
      <div className="space-y-4">
        <PageTitle>什么是自然语言处理？</PageTitle>
        <BookParagraph>
          自然语言处理(Natural Language Processing, NLP)是人工智能和语言学领域的分支学科，致力于让计算机能够理解、解释和生成人类语言。
        </BookParagraph>

        <SectionTitle>NLP的核心任务</SectionTitle>
        <BookList items={[
          '文本分类与情感分析',
          '命名实体识别',
          '机器翻译',
          '问答系统',
          '文本摘要',
          '对话系统',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>NLP的主要挑战</SectionTitle>
        <BookList items={[
          '语言的歧义性',
          '上下文理解',
          '多语言处理',
          '领域适应',
          '资源稀缺',
        ]} />
      </div>
    ),
  },
  {
    label: '发展历史',
    left: (
      <div className="space-y-4">
        <PageTitle>NLP发展历史</PageTitle>

        <SectionTitle>1950-1960年代：规则基础阶段</SectionTitle>
        <BookParagraph>基于语言学规则的系统，如机器翻译系统</BookParagraph>

        <SectionTitle>1970-1980年代：统计方法兴起</SectionTitle>
        <BookParagraph>引入概率统计方法，如隐马尔可夫模型</BookParagraph>

        <SectionTitle>1990-2000年代：机器学习时代</SectionTitle>
        <BookParagraph>支持向量机、决策树等机器学习算法应用</BookParagraph>

        <SectionTitle>2010年代至今：深度学习革命</SectionTitle>
        <BookParagraph>Transformer架构、预训练语言模型的出现</BookParagraph>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>里程碑事件</SectionTitle>
        <BookList items={[
          '1950年：图灵测试提出',
          '1966年：ELIZA对话系统',
          '1990年：统计机器翻译',
          '2003年：神经概率语言模型',
          '2013年：Word2Vec',
          '2017年：Transformer',
          '2018年：BERT',
        ]} />
      </div>
    ),
  },
  {
    label: '应用领域',
    left: (
      <div className="space-y-4">
        <PageTitle>NLP应用领域</PageTitle>

        <SectionTitle>商业应用</SectionTitle>
        <BookList items={[
          '智能客服',
          '市场分析',
          '舆情监测',
          '智能营销',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>技术应用</SectionTitle>
        <BookList items={[
          '搜索引擎',
          '语音助手',
          '机器翻译',
          '文本生成',
        ]} />
      </div>
    ),
  },
  {
    label: '基础知识',
    left: (
      <div className="space-y-4">
        <PageTitle>NLP基础知识</PageTitle>

        <SectionTitle>文本预处理</SectionTitle>
        <BookList items={[
          '分词',
          '词性标注',
          '词干提取',
          '停用词过滤',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>语言模型</SectionTitle>
        <BookList items={[
          'N-gram模型',
          '神经网络语言模型',
          '预训练语言模型',
        ]} />

        <SectionTitle>词向量</SectionTitle>
        <BookList items={[
          'Word2Vec',
          'GloVe',
          'FastText',
        ]} />
      </div>
    ),
  },
]

export default function NlpBasicPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

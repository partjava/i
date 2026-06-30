'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookList,
} from '@shared/components/ui/book/BookContent'

const META: LessonMeta = {
  subject: '自然语言处理', chapterTitle: 'NLP面试题', chapterNumber: 13, totalChapters: 14,
  subjectHref: '/study/ai/nlp',
  prevChapter: { label: 'NLP实战案例', href: '/study/ai/nlp/cases' },
  nextChapter: { label: '进阶与前沿', href: '/study/ai/nlp/advanced' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '基础知识', left: (<div className="space-y-4"><PageTitle>基础知识面试题</PageTitle><SectionTitle>1. 什么是词向量？常见的词向量模型有哪些？</SectionTitle><BookParagraph>词向量是将词语映射到低维稠密向量空间的技术，能够捕捉词语之间的语义关系。</BookParagraph><BookParagraph>常见的词向量模型包括：</BookParagraph><BookList items={['Word2Vec：包括CBOW和Skip-gram两种模型','GloVe：基于全局词频统计的词向量模型','FastText：考虑词内部结构的词向量模型','ELMo：基于上下文的动态词向量模型','BERT：预训练语言模型生成的上下文相关词向量']} /></div>),
    right: (<div className="space-y-4"><br /><SectionTitle>2. 什么是TF-IDF？它的优缺点是什么？</SectionTitle><BookParagraph>TF-IDF（词频-逆文档频率）是一种用于评估词语重要性的统计方法。</BookParagraph><BookParagraph><b>优点：</b></BookParagraph><BookList items={['计算简单，易于实现','考虑了词频和文档频率','能够突出重要词语']} /><BookParagraph><b>缺点：</b></BookParagraph><BookList items={['没有考虑词语的位置信息','没有考虑词语的语义信息','无法处理同义词和多义词']} /></div>),
  },
  {
    label: '模型算法', left: (<div className="space-y-4"><PageTitle>模型算法面试题</PageTitle><SectionTitle>1. BERT模型的主要特点是什么？</SectionTitle><BookParagraph>BERT（Bidirectional Encoder Representations from Transformers）的主要特点：</BookParagraph><BookList items={['双向上下文表示：同时考虑词语的左右上下文','预训练任务：包括掩码语言模型（MLM）和下一句预测（NSP）','Transformer架构：使用自注意力机制处理序列信息','迁移学习：可以针对不同任务进行微调','强大的特征提取能力：能够捕捉深层语义信息']} /></div>),
    right: (<div className="space-y-4"><br /><SectionTitle>2. 什么是注意力机制？它的作用是什么？</SectionTitle><BookParagraph>注意力机制是一种让模型能够关注输入序列中重要部分的机制。</BookParagraph><BookParagraph><b>主要作用：</b></BookParagraph><BookList items={['解决长序列依赖问题','突出重要信息，抑制无关信息','提供可解释性','提高模型性能']} /><BookParagraph><b>常见类型：</b></BookParagraph><BookList items={['自注意力（Self-Attention）','多头注意力（Multi-Head Attention）','交叉注意力（Cross-Attention）']} /></div>),
  },
  {
    label: '实践应用', left: (<div className="space-y-4"><PageTitle>实践应用面试题</PageTitle><SectionTitle>1. 如何处理文本分类中的类别不平衡问题？</SectionTitle><BookParagraph>处理类别不平衡的方法：</BookParagraph><BookParagraph><b>数据层面：</b></BookParagraph><BookList items={['过采样（如SMOTE）','欠采样','数据增强']} /><BookParagraph><b>算法层面：</b></BookParagraph><BookList items={['调整类别权重','使用适合不平衡数据的损失函数','集成学习方法']} /><BookParagraph><b>评估指标：</b></BookParagraph><BookList items={['使用F1分数、AUC等指标','混淆矩阵分析']} /></div>),
    right: (<div className="space-y-4"><br /><SectionTitle>2. 如何评估NLP模型的性能？</SectionTitle><BookParagraph>NLP模型评估方法：</BookParagraph><BookParagraph><b>分类任务：</b></BookParagraph><BookList items={['准确率（Accuracy）','精确率（Precision）','召回率（Recall）','F1分数','ROC曲线和AUC']} /><BookParagraph><b>序列标注任务：</b></BookParagraph><BookList items={['实体级别的F1分数','标签级别的准确率']} /><BookParagraph><b>生成任务：</b></BookParagraph><BookList items={['BLEU分数','ROUGE分数','人工评估']} /></div>),
  },
  {
    label: '进阶问题', left: (<div className="space-y-4"><PageTitle>进阶问题</PageTitle><SectionTitle>1. 如何解决NLP中的长文本处理问题？</SectionTitle><BookParagraph>长文本处理方法：</BookParagraph><BookParagraph><b>文本分段：</b></BookParagraph><BookList items={['滑动窗口','段落划分','句子分割']} /><BookParagraph><b>模型改进：</b></BookParagraph><BookList items={['使用长文本专用模型（如Longformer）','层次化处理','注意力机制优化']} /><BookParagraph><b>特征提取：</b></BookParagraph><BookList items={['关键信息提取','文本摘要','主题模型']} /></div>),
    right: (<div className="space-y-4"><br /><SectionTitle>2. 如何提高NLP模型的泛化能力？</SectionTitle><BookParagraph>提高模型泛化能力的方法：</BookParagraph><BookParagraph><b>数据增强：</b></BookParagraph><BookList items={['同义词替换','回译','EDA（Easy Data Augmentation）']} /><BookParagraph><b>正则化技术：</b></BookParagraph><BookList items={['Dropout','L1/L2正则化','早停（Early Stopping）']} /><BookParagraph><b>预训练和微调：</b></BookParagraph><BookList items={['使用大规模预训练模型','领域适应','多任务学习']} /><BookParagraph><b>集成学习：</b></BookParagraph><BookList items={['模型集成','交叉验证','Bagging和Boosting']} /></div>),
  },
]

export default function NlpInterviewPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }

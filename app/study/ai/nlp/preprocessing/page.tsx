'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@shared/components/ui/book/BookContent'

const jiebaCode = `import jieba

# 精确模式分词
text = "自然语言处理是人工智能的重要分支"
words = jieba.cut(text, cut_all=False)
print("精确模式：", " ".join(words))

# 全模式分词
words = jieba.cut(text, cut_all=True)
print("全模式：", " ".join(words))

# 搜索引擎模式
words = jieba.cut_for_search(text)
print("搜索引擎模式：", " ".join(words))`

const posCode = `import jieba.posseg as pseg

text = "自然语言处理技术正在快速发展"
words = pseg.cut(text)

for word, flag in words:
    print(f"{word} ({flag})")

# 输出示例：
# 自然 (a)
# 语言 (n)
# 处理 (v)
# 技术 (n)
# 正在 (d)
# 快速 (d)
# 发展 (v)`

const stemCode = `from nltk.stem import PorterStemmer, SnowballStemmer
from nltk.stem.lancaster import LancasterStemmer

porter = PorterStemmer()
snowball = SnowballStemmer('english')
lancaster = LancasterStemmer()

words = ['running', 'ran', 'runs', 'runner']

print("Porter词干提取：")
for word in words:
    print(f"{word} -> {porter.stem(word)}")

print("\\nSnowball词干提取：")
for word in words:
    print(f"{word} -> {snowball.stem(word)}")

print("\\nLancaster词干提取：")
for word in words:
    print(f"{word} -> {lancaster.stem(word)}")`

const stopwordsCode = `from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import nltk
nltk.download('stopwords')
nltk.download('punkt')

stop_words = set(stopwords.words('english'))

text = "The quick brown fox jumps over the lazy dog"
word_tokens = word_tokenize(text)
filtered_sentence = [w for w in word_tokens if not w.lower() in stop_words]

print("原始文本：", text)
print("过滤后：", " ".join(filtered_sentence))`

const META: LessonMeta = {
  subject: '自然语言处理', chapterTitle: '文本预处理', chapterNumber: 2, totalChapters: 14,
  subjectHref: '/study/ai/nlp',
  prevChapter: { label: 'NLP基础', href: '/study/ai/nlp/basic' },
  nextChapter: { label: '词向量与词嵌入', href: '/study/ai/nlp/word-embeddings' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '概述', left: (<div className="space-y-4"><PageTitle>文本预处理概述</PageTitle><BookParagraph>文本预处理是自然语言处理的第一步，它的目的是将原始文本转换为计算机可以理解和处理的格式。良好的预处理可以提高后续NLP任务的效果。</BookParagraph><div className="flex justify-center"><svg width="100%" height="160" viewBox="0 0 700 160"><rect x="30" y="50" width="100" height="50" rx="5" fill="#e3f2fd"/><text x="80" y="80" textAnchor="middle" fill="#1565c0">原始文本</text><line x1="130" y1="75" x2="180" y2="75" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead_pp)"/><rect x="180" y="50" width="100" height="50" rx="5" fill="#e8f5e9"/><text x="230" y="80" textAnchor="middle" fill="#2e7d32">分词</text><line x1="280" y1="75" x2="330" y2="75" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead_pp)"/><rect x="330" y="50" width="100" height="50" rx="5" fill="#fff3e0"/><text x="380" y="80" textAnchor="middle" fill="#e65100">词性标注</text><line x1="430" y1="75" x2="480" y2="75" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead_pp)"/><rect x="480" y="50" width="100" height="50" rx="5" fill="#f3e5f5"/><text x="530" y="80" textAnchor="middle" fill="#6a1b9a">特征提取</text></svg></div><SectionTitle>预处理的主要步骤</SectionTitle><BookList items={['文本清洗（去除特殊字符、HTML标签等）','分词（将文本切分为单词或词组）','词性标注（识别每个词的语法类别）','词干提取（将词还原为词干形式）','停用词过滤（去除无意义的常用词）','大小写转换（统一文本格式）']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>预处理的重要性</SectionTitle><BookList items={['提高模型性能','减少数据噪声','统一数据格式','降低计算复杂度','提高特征提取质量']} /></div>),
  },
  {
    label: '分词', left: (<div className="space-y-4"><PageTitle>分词</PageTitle><BookParagraph>分词是将连续的文本切分成独立的词语单元的过程。对于中文等没有明确词边界的语言来说，分词尤为重要。</BookParagraph><SectionTitle>分词方法</SectionTitle><BookList items={['基于规则的分词','基于统计的分词','基于机器学习的分词','基于深度学习的分词']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>Python代码示例</SectionTitle><BookCode language="python" code={jiebaCode} /></div>),
  },
  {
    label: '词性标注', left: (<div className="space-y-4"><PageTitle>词性标注</PageTitle><BookParagraph>词性标注是确定句子中每个词的语法类别的过程，如名词、动词、形容词等。这对于理解句子的语法结构和语义非常重要。</BookParagraph><SectionTitle>常见词性类别</SectionTitle><BookList items={['名词（n）：表示人、事物、地点等','动词（v）：表示动作或状态','形容词（a）：表示性质或状态','副词（d）：表示程度、方式等','介词（p）：表示关系','连词（c）：表示连接']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>Python代码示例</SectionTitle><BookCode language="python" code={posCode} /></div>),
  },
  {
    label: '词干提取', left: (<div className="space-y-4"><PageTitle>词干提取</PageTitle><BookParagraph>词干提取是将词语还原为其基本形式的过程，去除词形变化（如时态、复数等）。这有助于减少词汇表大小，提高文本分析的效率。</BookParagraph><SectionTitle>词干提取方法</SectionTitle><BookList items={['Porter词干提取算法','Snowball词干提取算法','Lancaster词干提取算法','基于规则的方法']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>Python代码示例</SectionTitle><BookCode language="python" code={stemCode} /></div>),
  },
  {
    label: '停用词过滤', left: (<div className="space-y-4"><PageTitle>停用词过滤</PageTitle><BookParagraph>停用词过滤是去除文本中频繁出现但对文本含义贡献不大的词语的过程。这些词通常包括冠词、介词、连词等。</BookParagraph><SectionTitle>常见停用词</SectionTitle><BookList items={['冠词：the, a, an','介词：in, on, at, to','连词：and, or, but','代词：I, you, he, she','助动词：is, are, was, were']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>Python代码示例</SectionTitle><BookCode language="python" code={stopwordsCode} /></div>),
  },
]

export default function NlpPreprocessingPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }

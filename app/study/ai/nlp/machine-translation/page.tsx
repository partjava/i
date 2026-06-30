'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@shared/components/ui/book/BookContent'

const transformerMtCode = `import torch
import torch.nn as nn
from transformers import MarianMTModel, MarianTokenizer

class TransformerMT:
    def __init__(self, model_name='Helsinki-NLP/opus-mt-en-zh'):
        self.tokenizer = MarianTokenizer.from_pretrained(model_name)
        self.model = MarianMTModel.from_pretrained(model_name)
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.model.to(self.device)

    def translate(self, text, max_length=128):
        # 对输入文本进行编码
        inputs = self.tokenizer(text, return_tensors="pt", padding=True, truncation=True)
        inputs = {k: v.to(self.device) for k, v in inputs.items()}

        # 生成翻译
        with torch.no_grad():
            outputs = self.model.generate(
                **inputs,
                max_length=max_length,
                num_beams=5,
                length_penalty=0.6,
                early_stopping=True
            )

        # 解码翻译结果
        translated = self.tokenizer.batch_decode(outputs, skip_special_tokens=True)
        return translated[0]

# 使用示例
translator = TransformerMT()

# 英文到中文翻译
english_text = "Machine translation is an important application of natural language processing."
chinese_translation = translator.translate(english_text)
print(f"英文原文: {english_text}")
print(f"中文翻译: {chinese_translation}")

# 批量翻译
english_texts = [
    "Artificial intelligence is transforming our world.",
    "Deep learning has revolutionized machine translation."
]
translations = [translator.translate(text) for text in english_texts]
for src, tgt in zip(english_texts, translations):
    print(f"\\n原文: {src}")
    print(f"翻译: {tgt}")`

const bleuCode = `from nltk.translate.bleu_score import sentence_bleu, SmoothingFunction
import numpy as np

# 准备数据
reference = "Machine translation is an important application of natural language processing."
candidate = "Machine translation is an important field of natural language processing."

# 分词
reference_tokens = reference.lower().split()
candidate_tokens = candidate.lower().split()

# 计算BLEU分数
smoothie = SmoothingFunction().method4
bleu_score = sentence_bleu([reference_tokens], candidate_tokens,
                          smoothing_function=smoothie)

print(f"BLEU分数: {bleu_score:.4f}")

# 多参考翻译评估
references = [
    "Machine translation is an important application of NLP.",
    "Machine translation is an important application of natural language processing."
]
candidate = "Machine translation is an important application of natural language processing."

ref_tokens = [ref.lower().split() for ref in references]
cand_tokens = candidate.lower().split()

bleu_score_multi = sentence_bleu(ref_tokens, cand_tokens,
                                 smoothing_function=smoothie)
print(f"多参考BLEU分数: {bleu_score_multi:.4f}")`

const mtCaseCode = `from transformers import MarianMTModel, MarianTokenizer
import torch

class BatchTranslator:
    def __init__(self, src_lang='en', tgt_lang='zh'):
        model_name = f'Helsinki-NLP/opus-mt-{src_lang}-{tgt_lang}'
        self.tokenizer = MarianTokenizer.from_pretrained(model_name)
        self.model = MarianMTModel.from_pretrained(model_name)
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.model.to(self.device)

    def translate_batch(self, texts, batch_size=16, max_length=128):
        translations = []
        for i in range(0, len(texts), batch_size):
            batch = texts[i:i+batch_size]
            inputs = self.tokenizer(batch, return_tensors="pt",
                                   padding=True, truncation=True, max_length=max_length)
            inputs = {k: v.to(self.device) for k, v in inputs.items()}

            with torch.no_grad():
                outputs = self.model.generate(
                    **inputs, max_length=max_length,
                    num_beams=4, length_penalty=0.6,
                    early_stopping=True
                )

            batch_translations = self.tokenizer.batch_decode(
                outputs, skip_special_tokens=True
            )
            translations.extend(batch_translations)

            print(f"已翻译 {min(i+batch_size, len(texts))}/{len(texts)} 条")

        return translations

# 使用示例
translator = BatchTranslator('en', 'zh')

texts = [
    "The Transformer architecture has revolutionized machine translation.",
    "Attention mechanisms allow the model to focus on relevant parts of the input.",
    "Neural machine translation achieves state-of-the-art results on many language pairs.",
    "The encoder-decoder architecture is the foundation of modern MT systems.",
    "Pre-trained language models have further improved translation quality."
]

translations = translator.translate_batch(texts)

for src, tgt in zip(texts, translations):
    print(f"\\n原文: {src}")
    print(f"翻译: {tgt}")`

const META: LessonMeta = {
  subject: '自然语言处理',
  chapterTitle: '机器翻译',
  chapterNumber: 6,
  totalChapters: 14,
  subjectHref: '/study/ai/nlp',
  prevChapter: { label: '命名实体识别', href: '/study/ai/nlp/ner' },
  nextChapter: { label: '文本生成', href: '/study/ai/nlp/text-generation' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '概述',
    left: (
      <div className="space-y-4">
        <PageTitle>机器翻译概述</PageTitle>
        <BookParagraph>
          机器翻译(Machine Translation, MT)是自然语言处理的重要应用领域，旨在将一种语言的文本自动翻译成另一种语言。随着深度学习技术的发展，机器翻译的质量得到了显著提升。
        </BookParagraph>

        <div className="flex justify-center">
          <svg width="100%" height="200" viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="arrowhead_mt" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
              </marker>
            </defs>
            <rect x="40" y="60" width="140" height="70" rx="5" fill="#e3f2fd" stroke="#2196f3" />
            <text x="110" y="100" textAnchor="middle" fill="#1565c0">源语言文本</text>
            <line x1="180" y1="95" x2="260" y2="95" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead_mt)" />
            <rect x="260" y="60" width="140" height="70" rx="5" fill="#e8f5e9" stroke="#4caf50" />
            <text x="330" y="100" textAnchor="middle" fill="#2e7d32">翻译模型</text>
            <line x1="400" y1="95" x2="480" y2="95" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead_mt)" />
            <rect x="480" y="60" width="140" height="70" rx="5" fill="#fff3e0" stroke="#ff9800" />
            <text x="550" y="100" textAnchor="middle" fill="#e65100">目标语言文本</text>
          </svg>
        </div>

        <SectionTitle>主要特点</SectionTitle>
        <BookList items={[
          '端到端翻译',
          '上下文理解',
          '多语言支持',
          '实时翻译',
          '专业领域适应',
        ]} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>应用场景</SectionTitle>
        <BookList items={[
          '跨语言交流',
          '文档翻译',
          '网页翻译',
          '字幕翻译',
          '多语言内容创作',
        ]} />
      </div>
    ),
  },
  {
    label: '翻译方法',
    left: (
      <div className="space-y-4">
        <PageTitle>机器翻译方法</PageTitle>
        <BookParagraph>
          机器翻译的方法经历了从基于规则到统计方法，再到深度学习的演进过程。目前主流的翻译方法主要基于神经网络架构。
        </BookParagraph>

        <SectionTitle>主要方法</SectionTitle>
        <BookList items={[
          '基于规则的机器翻译',
          '统计机器翻译',
          '神经机器翻译',
          'Transformer架构',
          '多语言翻译模型',
        ]} />

        <SectionTitle>Transformer翻译模型实现</SectionTitle>
        <BookCode language="python" code={transformerMtCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>方法对比</SectionTitle>
        <BookParagraph>
          基于规则的方法依赖语言学家编写的规则，维护成本高且覆盖面有限。统计机器翻译利用平行语料自动学习翻译规律，但需要大量特征工程。神经机器翻译实现了端到端学习，显著提升了翻译质量，特别是Transformer架构的出现带来了质的飞跃。
        </BookParagraph>
      </div>
    ),
  },
  {
    label: '评估指标',
    left: (
      <div className="space-y-4">
        <PageTitle>评估指标</PageTitle>
        <BookParagraph>
          机器翻译的评估主要关注翻译的准确性、流畅性和语义保持度。常用的评估指标包括BLEU、METEOR、ROUGE等。
        </BookParagraph>

        <SectionTitle>评估指标</SectionTitle>
        <BookList items={[
          'BLEU (Bilingual Evaluation Understudy)',
          'METEOR (Metric for Evaluation of Translation with Explicit ORdering)',
          'ROUGE (Recall-Oriented Understudy for Gisting Evaluation)',
          'TER (Translation Edit Rate)',
          '人工评估',
        ]} />

        <SectionTitle>BLEU计算</SectionTitle>
        <BookParagraph>
          BLEU通过比较候选翻译与参考翻译的n-gram重合度来评估翻译质量，取值范围0-1，值越高表示翻译质量越好。
        </BookParagraph>
        <BookCode language="python" code={bleuCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>BLEU详解</SectionTitle>
        <BookParagraph>
          BLEU的计算公式综合考虑了精确率和简短惩罚。精确率计算n-gram的匹配程度，简短惩罚防止生成过短的翻译。
        </BookParagraph>
        <BookParagraph>
          <b>优点：</b>计算速度快、与人工评估相关性高、语言无关<br />
          <b>缺点：</b>只考虑词形匹配、无法评估语义、对创造性翻译不友好
        </BookParagraph>

        <SectionTitle>其他指标</SectionTitle>
        <BookList items={[
          'METEOR：考虑同义词和词干匹配',
          'TER：计算翻译编辑距离',
          '人工评估：最准确但成本最高',
        ]} />
      </div>
    ),
  },
  {
    label: '实战案例',
    left: (
      <div className="space-y-4">
        <PageTitle>实战案例</PageTitle>
        <BookParagraph>
          本节将介绍机器翻译在实际应用中的案例，包括批量翻译、领域自适应翻译等。
        </BookParagraph>

        <SectionTitle>批量翻译系统</SectionTitle>
        <BookParagraph>
          使用MarianMT构建一个批量翻译系统，支持英译中和中译英，并提供批处理功能。
        </BookParagraph>
        <BookCode language="python" code={mtCaseCode} />
      </div>
    ),
    right: (
      <div className="space-y-4">
        <SectionTitle>领域自适应翻译</SectionTitle>
        <BookParagraph>
          在实际应用中，通用翻译模型在特定领域（如医疗、法律、技术）的表现可能不够理想。领域自适应翻译通过对领域数据微调来提升翻译质量。
        </BookParagraph>
        <BookList items={[
          '收集领域平行语料',
          '在基础模型上继续训练',
          '使用领域术语词典',
          '评估领域翻译质量',
        ]} />

        <SectionTitle>翻译系统优化</SectionTitle>
        <BookList items={[
          '使用批处理提高吞吐量',
          '束搜索(Beam Search)优化',
          '长度惩罚控制翻译长度',
          '覆盖惩罚避免重复翻译',
        ]} />
      </div>
    ),
  },
]

export default function NlpMtPage() {
  return <LessonLayout meta={META} spreads={SPREADS} />
}

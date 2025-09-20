'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function MachineTranslationPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedCode, setExpandedCode] = useState<string | null>(null);

  const tabs = [
    { id: 'overview', label: '概述' },
    { id: 'methods', label: '翻译方法' },
    { id: 'evaluation', label: '评估指标' },
    { id: 'cases', label: '实战案例' }
  ];

  const toggleCode = (codeId: string) => {
    setExpandedCode(expandedCode === codeId ? null : codeId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">机器翻译</h1>
      
      {/* 标签导航 */}
      <div className="flex space-x-4 mb-6 border-b overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-medium whitespace-nowrap ${
              activeTab === tab.id 
                ? 'border-b-2 border-blue-500 text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 内容区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">机器翻译概述</h2>
            <p className="mb-4">
              机器翻译(Machine Translation, MT)是自然语言处理的重要应用领域，旨在将一种语言的文本自动翻译成另一种语言。随着深度学习技术的发展，机器翻译的质量得到了显著提升。
            </p>
            
            <div className="my-6">
              <svg className="w-full max-w-2xl mx-auto" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
                  </marker>
                </defs>
                <rect x="50" y="100" width="150" height="80" rx="5" fill="#e3f2fd" stroke="#2196f3" />
                <text x="125" y="145" textAnchor="middle" fill="#1565c0">源语言文本</text>
                
                <line x1="200" y1="140" x2="300" y2="140" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)" />
                
                <rect x="300" y="100" width="150" height="80" rx="5" fill="#e8f5e9" stroke="#4caf50" />
                <text x="375" y="145" textAnchor="middle" fill="#2e7d32">翻译模型</text>
                
                <line x1="450" y1="140" x2="550" y2="140" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)" />
                
                <rect x="550" y="100" width="150" height="80" rx="5" fill="#fff3e0" stroke="#ff9800" />
                <text x="625" y="145" textAnchor="middle" fill="#e65100">目标语言文本</text>
              </svg>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">主要特点</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>端到端翻译</li>
                  <li>上下文理解</li>
                  <li>多语言支持</li>
                  <li>实时翻译</li>
                  <li>专业领域适应</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">应用场景</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>跨语言交流</li>
                  <li>文档翻译</li>
                  <li>网页翻译</li>
                  <li>字幕翻译</li>
                  <li>多语言内容创作</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'methods' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">机器翻译方法</h2>
            <p className="mb-4">
              机器翻译的方法经历了从基于规则到统计方法，再到深度学习的演进过程。目前主流的翻译方法主要基于神经网络架构。
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">主要方法</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>基于规则的机器翻译</li>
                  <li>统计机器翻译</li>
                  <li>神经机器翻译</li>
                  <li>Transformer架构</li>
                  <li>多语言翻译模型</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Python代码示例</h3>
                <div className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleCode('transformer-mt')}
                    className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-left font-medium flex justify-between items-center"
                  >
                    <span>Transformer翻译模型实现</span>
                    <span>{expandedCode === 'transformer-mt' ? '▼' : '▶'}</span>
                  </button>
                  {expandedCode === 'transformer-mt' && (
                    <pre className="bg-gray-100 p-4 overflow-x-auto">
                      <code>{`import torch
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
    print(f"翻译: {tgt}")`}</code>
                    </pre>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'evaluation' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">评估指标</h2>
            <p className="mb-4">
              机器翻译的评估主要关注翻译的准确性、流畅性和语义保持度。常用的评估指标包括BLEU、METEOR、ROUGE等。
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">评估指标</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>BLEU (Bilingual Evaluation Understudy)</li>
                  <li>METEOR (Metric for Evaluation of Translation with Explicit ORdering)</li>
                  <li>ROUGE (Recall-Oriented Understudy for Gisting Evaluation)</li>
                  <li>TER (Translation Edit Rate)</li>
                  <li>人工评估</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Python代码示例</h3>
                <div className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleCode('evaluation-code')}
                    className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-left font-medium flex justify-between items-center"
                  >
                    <span>评估指标实现</span>
                    <span>{expandedCode === 'evaluation-code' ? '▼' : '▶'}</span>
                  </button>
                  {expandedCode === 'evaluation-code' && (
                    <pre className="bg-gray-100 p-4 overflow-x-auto">
                      <code>{`from nltk.translate.bleu_score import sentence_bleu, corpus_bleu
from nltk.translate.meteor_score import meteor_score
from rouge import Rouge
import nltk
import jieba

def evaluate_translation(reference, candidate):
    """
    评估翻译质量
    reference: 参考翻译
    candidate: 候选翻译
    """
    # 分词
    ref_tokens = list(jieba.cut(reference))
    cand_tokens = list(jieba.cut(candidate))
    
    # 计算BLEU分数
    bleu_score = sentence_bleu([ref_tokens], cand_tokens)
    
    # 计算METEOR分数
    meteor_score_value = meteor_score([ref_tokens], cand_tokens)
    
    # 计算ROUGE分数
    rouge = Rouge()
    rouge_scores = rouge.get_scores(candidate, reference)[0]
    
    return {
        'BLEU': bleu_score,
        'METEOR': meteor_score_value,
        'ROUGE-1': rouge_scores['rouge-1']['f'],
        'ROUGE-2': rouge_scores['rouge-2']['f'],
        'ROUGE-L': rouge_scores['rouge-l']['f']
    }

def evaluate_corpus(references, candidates):
    """
    评估翻译语料库
    references: 参考翻译列表
    candidates: 候选翻译列表
    """
    # 准备BLEU评估数据
    ref_tokens = [list(jieba.cut(ref)) for ref in references]
    cand_tokens = [list(jieba.cut(cand)) for cand in candidates]
    
    # 计算语料库BLEU分数
    corpus_bleu_score = corpus_bleu([[ref] for ref in ref_tokens], cand_tokens)
    
    # 计算平均METEOR分数
    meteor_scores = [meteor_score([ref], cand) for ref, cand in zip(ref_tokens, cand_tokens)]
    avg_meteor = sum(meteor_scores) / len(meteor_scores)
    
    # 计算平均ROUGE分数
    rouge = Rouge()
    rouge_scores = rouge.get_scores(candidates, references, avg=True)
    
    return {
        'Corpus BLEU': corpus_bleu_score,
        'Average METEOR': avg_meteor,
        'ROUGE-1': rouge_scores['rouge-1']['f'],
        'ROUGE-2': rouge_scores['rouge-2']['f'],
        'ROUGE-L': rouge_scores['rouge-l']['f']
    }

# 使用示例
reference = "机器翻译是自然语言处理的重要应用。"
candidate = "机器翻译是NLP的重要应用领域。"

# 评估单个翻译
scores = evaluate_translation(reference, candidate)
print("单个翻译评估结果：")
for metric, score in scores.items():
    print(f"{metric}: {score:.4f}")

# 评估翻译语料库
references = [
    "机器翻译是自然语言处理的重要应用。",
    "深度学习技术显著提升了翻译质量。"
]
candidates = [
    "机器翻译是NLP的重要应用领域。",
    "深度学习大大提高了翻译的准确性。"
]

corpus_scores = evaluate_corpus(references, candidates)
print("\\n语料库评估结果：")
for metric, score in corpus_scores.items():
    print(f"{metric}: {score:.4f}")`}</code>
                    </pre>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cases' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">实战案例</h2>
            <p className="mb-4">
              本节将介绍机器翻译在实际应用中的案例，包括多语言翻译系统、专业领域翻译等。
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">多语言翻译系统</h3>
                <div className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleCode('multilingual-mt')}
                    className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-left font-medium flex justify-between items-center"
                  >
                    <span>多语言翻译实现</span>
                    <span>{expandedCode === 'multilingual-mt' ? '▼' : '▶'}</span>
                  </button>
                  {expandedCode === 'multilingual-mt' && (
                    <pre className="bg-gray-100 p-4 overflow-x-auto">
                      <code>{`import torch
from transformers import MBartForConditionalGeneration, MBart50TokenizerFast

class MultilingualTranslator:
    def __init__(self):
        self.model = MBartForConditionalGeneration.from_pretrained("facebook/mbart-large-50-many-to-many-mmt")
        self.tokenizer = MBart50TokenizerFast.from_pretrained("facebook/mbart-large-50-many-to-many-mmt")
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.model.to(self.device)
        
        # 语言代码映射
        self.lang_codes = {
            'en': 'en_XX',
            'zh': 'zh_CN',
            'ja': 'ja_XX',
            'ko': 'ko_KR',
            'fr': 'fr_XX',
            'de': 'de_DE',
            'es': 'es_XX',
            'ru': 'ru_RU'
        }
    
    def translate(self, text, src_lang, tgt_lang, max_length=128):
        # 设置源语言和目标语言
        self.tokenizer.src_lang = self.lang_codes[src_lang]
        
        # 编码输入文本
        inputs = self.tokenizer(text, return_tensors="pt", padding=True, truncation=True)
        inputs = {k: v.to(self.device) for k, v in inputs.items()}
        
        # 生成翻译
        with torch.no_grad():
            outputs = self.model.generate(
                **inputs,
                forced_bos_token_id=self.tokenizer.lang_code_to_id[self.lang_codes[tgt_lang]],
                max_length=max_length,
                num_beams=5,
                length_penalty=0.6,
                early_stopping=True
            )
        
        # 解码翻译结果
        translated = self.tokenizer.batch_decode(outputs, skip_special_tokens=True)
        return translated[0]

# 使用示例
translator = MultilingualTranslator()

# 多语言翻译示例
texts = [
    ("Hello, how are you?", "en", "zh"),
    ("人工智能正在改变世界。", "zh", "en"),
    ("こんにちは、元気ですか？", "ja", "zh"),
    ("안녕하세요, 잘 지내세요?", "ko", "en")
]

for text, src, tgt in texts:
    translation = translator.translate(text, src, tgt)
    print(f"\\n原文 ({src}): {text}")
    print(f"翻译 ({tgt}): {translation}")

# 批量翻译
def batch_translate(texts, src_lang, tgt_lang):
    translations = []
    for text in texts:
        translation = translator.translate(text, src_lang, tgt_lang)
        translations.append(translation)
    return translations

# 批量翻译示例
english_texts = [
    "Machine translation is an important technology.",
    "Deep learning has revolutionized many fields.",
    "Natural language processing is fascinating."
]

chinese_translations = batch_translate(english_texts, "en", "zh")
for src, tgt in zip(english_texts, chinese_translations):
    print(f"\\n英文: {src}")
    print(f"中文: {tgt}")`}</code>
                    </pre>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">专业领域翻译</h3>
                <div className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleCode('domain-mt')}
                    className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-left font-medium flex justify-between items-center"
                  >
                    <span>专业领域翻译实现</span>
                    <span>{expandedCode === 'domain-mt' ? '▼' : '▶'}</span>
                  </button>
                  {expandedCode === 'domain-mt' && (
                    <pre className="bg-gray-100 p-4 overflow-x-auto">
                      <code>{`import torch
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer
import json

class DomainSpecificTranslator:
    def __init__(self, model_path, domain_glossary_path=None):
        self.model = AutoModelForSeq2SeqLM.from_pretrained(model_path)
        self.tokenizer = AutoTokenizer.from_pretrained(model_path)
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.model.to(self.device)
        
        # 加载领域术语表
        self.domain_glossary = {}
        if domain_glossary_path:
            with open(domain_glossary_path, 'r', encoding='utf-8') as f:
                self.domain_glossary = json.load(f)
    
    def preprocess_text(self, text):
        """预处理文本，处理领域特定术语"""
        for term, translation in self.domain_glossary.items():
            text = text.replace(term, f"<{translation}>")
        return text
    
    def postprocess_text(self, text):
        """后处理文本，恢复领域特定术语"""
        for term, translation in self.domain_glossary.items():
            text = text.replace(f"<{translation}>", translation)
        return text
    
    def translate(self, text, max_length=128):
        # 预处理
        processed_text = self.preprocess_text(text)
        
        # 编码输入文本
        inputs = self.tokenizer(processed_text, return_tensors="pt", padding=True, truncation=True)
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
        translated = self.tokenizer.batch_decode(outputs, skip_special_tokens=True)[0]
        
        # 后处理
        final_translation = self.postprocess_text(translated)
        return final_translation

# 使用示例
# 医疗领域术语表
medical_glossary = {
    "COVID-19": "新型冠状病毒肺炎",
    "PCR": "聚合酶链式反应",
    "CT": "计算机断层扫描",
    "MRI": "磁共振成像",
    "ICU": "重症监护室"
}

# 保存术语表
with open('medical_glossary.json', 'w', encoding='utf-8') as f:
    json.dump(medical_glossary, f, ensure_ascii=False, indent=2)

# 初始化医疗领域翻译器
medical_translator = DomainSpecificTranslator(
    model_path="Helsinki-NLP/opus-mt-en-zh",
    domain_glossary_path="medical_glossary.json"
)

# 医疗文本翻译示例
medical_texts = [
    "The patient was diagnosed with COVID-19 and admitted to ICU.",
    "The doctor ordered a CT scan and MRI to examine the patient's condition.",
    "PCR test results confirmed the diagnosis."
]

for text in medical_texts:
    translation = medical_translator.translate(text)
    print(f"\\n英文: {text}")
    print(f"中文: {translation}")

# 法律领域翻译示例
legal_glossary = {
    "plaintiff": "原告",
    "defendant": "被告",
    "court": "法院",
    "judge": "法官",
    "verdict": "判决"
}

with open('legal_glossary.json', 'w', encoding='utf-8') as f:
    json.dump(legal_glossary, f, ensure_ascii=False, indent=2)

legal_translator = DomainSpecificTranslator(
    model_path="Helsinki-NLP/opus-mt-en-zh",
    domain_glossary_path="legal_glossary.json"
)

legal_texts = [
    "The plaintiff filed a lawsuit against the defendant.",
    "The judge will announce the verdict next week.",
    "The court has scheduled a hearing for next month."
]

for text in legal_texts:
    translation = legal_translator.translate(text)
    print(f"\\n英文: {text}")
    print(f"中文: {translation}")`}</code>
                    </pre>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex justify-between">
        <Link 
          href="/study/ai/nlp/ner"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回命名实体识别
        </Link>
        <Link 
          href="/study/ai/nlp/text-generation"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          文本生成 →
        </Link>
      </div>
    </div>
  );
} 
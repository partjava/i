'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TextGenerationPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedCode, setExpandedCode] = useState<string | null>(null);

  const tabs = [
    { id: 'overview', label: '概述' },
    { id: 'methods', label: '生成方法' },
    { id: 'evaluation', label: '评估指标' },
    { id: 'cases', label: '实战案例' }
  ];

  const toggleCode = (codeId: string) => {
    setExpandedCode(expandedCode === codeId ? null : codeId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">文本生成</h1>
      
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
            <h2 className="text-2xl font-semibold mb-4">文本生成概述</h2>
            <p className="mb-4">
              文本生成(Text Generation)是自然语言处理的重要任务之一，旨在根据给定的输入生成连贯、有意义的文本。随着大规模预训练语言模型的发展，文本生成的质量和多样性得到了显著提升。
            </p>
            
            <div className="my-6">
              <svg className="w-full max-w-2xl mx-auto" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
                  </marker>
                </defs>
                <rect x="50" y="100" width="150" height="80" rx="5" fill="#e3f2fd" stroke="#2196f3" />
                <text x="125" y="145" textAnchor="middle" fill="#1565c0">输入提示</text>
                
                <line x1="200" y1="140" x2="300" y2="140" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)" />
                
                <rect x="300" y="100" width="150" height="80" rx="5" fill="#e8f5e9" stroke="#4caf50" />
                <text x="375" y="145" textAnchor="middle" fill="#2e7d32">生成模型</text>
                
                <line x1="450" y1="140" x2="550" y2="140" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)" />
                
                <rect x="550" y="100" width="150" height="80" rx="5" fill="#fff3e0" stroke="#ff9800" />
                <text x="625" y="145" textAnchor="middle" fill="#e65100">生成文本</text>
              </svg>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">主要特点</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>上下文理解</li>
                  <li>连贯性生成</li>
                  <li>多样性输出</li>
                  <li>可控生成</li>
                  <li>多模态融合</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">应用场景</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>对话系统</li>
                  <li>内容创作</li>
                  <li>摘要生成</li>
                  <li>代码生成</li>
                  <li>故事创作</li>
                </ul>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">生成过程示意图</h3>
              <svg className="w-full max-w-3xl mx-auto" viewBox="0 0 900 400" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
                  </marker>
                </defs>
                
                {/* 输入层 */}
                <rect x="50" y="50" width="200" height="60" rx="5" fill="#e3f2fd" stroke="#2196f3" />
                <text x="150" y="85" textAnchor="middle" fill="#1565c0">输入提示</text>
                
                {/* 编码器 */}
                <rect x="50" y="150" width="200" height="60" rx="5" fill="#e8f5e9" stroke="#4caf50" />
                <text x="150" y="185" textAnchor="middle" fill="#2e7d32">编码器</text>
                
                {/* 注意力机制 */}
                <rect x="350" y="150" width="200" height="60" rx="5" fill="#fff3e0" stroke="#ff9800" />
                <text x="450" y="185" textAnchor="middle" fill="#e65100">注意力机制</text>
                
                {/* 解码器 */}
                <rect x="650" y="150" width="200" height="60" rx="5" fill="#f3e5f5" stroke="#9c27b0" />
                <text x="750" y="185" textAnchor="middle" fill="#6a1b9a">解码器</text>
                
                {/* 输出层 */}
                <rect x="650" y="250" width="200" height="60" rx="5" fill="#e8f5e9" stroke="#4caf50" />
                <text x="750" y="285" textAnchor="middle" fill="#2e7d32">生成文本</text>
                
                {/* 连接线 */}
                <line x1="250" y1="80" x2="250" y2="150" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <line x1="250" y1="210" x2="350" y2="180" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <line x1="550" y1="180" x2="650" y2="180" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <line x1="750" y1="210" x2="750" y2="250" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)" />
                
                {/* 循环连接 */}
                <path d="M 750 180 C 800 180, 800 100, 750 100" stroke="#666" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
                <text x="800" y="140" textAnchor="middle" fill="#666">自回归生成</text>
              </svg>
            </div>
          </div>
        )}

        {activeTab === 'methods' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">文本生成方法</h2>
            <p className="mb-4">
              文本生成的方法主要包括基于规则的方法、统计语言模型和深度学习方法。目前主流的生成方法主要基于大规模预训练语言模型。
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">主要方法</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>基于规则的方法</li>
                  <li>统计语言模型</li>
                  <li>RNN/LSTM生成</li>
                  <li>Transformer架构</li>
                  <li>预训练语言模型</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Python代码示例</h3>
                <div className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleCode('gpt-generation')}
                    className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-left font-medium flex justify-between items-center"
                  >
                    <span>GPT文本生成实现</span>
                    <span>{expandedCode === 'gpt-generation' ? '▼' : '▶'}</span>
                  </button>
                  {expandedCode === 'gpt-generation' && (
                    <pre className="bg-gray-100 p-4 overflow-x-auto">
                      <code>{`import torch
from transformers import GPT2LMHeadModel, GPT2Tokenizer

class TextGenerator:
    def __init__(self, model_name='gpt2'):
        self.tokenizer = GPT2Tokenizer.from_pretrained(model_name)
        self.model = GPT2LMHeadModel.from_pretrained(model_name)
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.model.to(self.device)
        
    def generate_text(self, prompt, max_length=100, num_return_sequences=1):
        # 编码输入文本
        inputs = self.tokenizer.encode(prompt, return_tensors='pt')
        inputs = inputs.to(self.device)
        
        # 生成文本
        with torch.no_grad():
            outputs = self.model.generate(
                inputs,
                max_length=max_length,
                num_return_sequences=num_return_sequences,
                no_repeat_ngram_size=2,
                do_sample=True,
                top_k=50,
                top_p=0.95,
                temperature=0.7,
                pad_token_id=self.tokenizer.eos_token_id
            )
        
        # 解码生成的文本
        generated_texts = []
        for output in outputs:
            text = self.tokenizer.decode(output, skip_special_tokens=True)
            generated_texts.append(text)
        
        return generated_texts

# 使用示例
generator = TextGenerator()

# 单次生成
prompt = "人工智能正在改变世界，"
generated = generator.generate_text(prompt)
print(f"输入提示: {prompt}")
print(f"生成文本: {generated[0]}")

# 多次生成
prompts = [
    "春天来了，",
    "科技的发展，",
    "未来的世界，"
]

for prompt in prompts:
    generated = generator.generate_text(prompt, num_return_sequences=2)
    print(f"\\n输入提示: {prompt}")
    for i, text in enumerate(generated, 1):
        print(f"生成文本 {i}: {text}")

# 控制生成参数
def generate_with_params(prompt, temperature=0.7, top_p=0.9, top_k=50):
    generator = TextGenerator()
    inputs = generator.tokenizer.encode(prompt, return_tensors='pt')
    inputs = inputs.to(generator.device)
    
    with torch.no_grad():
        outputs = generator.model.generate(
            inputs,
            max_length=100,
            num_return_sequences=1,
            do_sample=True,
            temperature=temperature,
            top_p=top_p,
            top_k=top_k,
            pad_token_id=generator.tokenizer.eos_token_id
        )
    
    return generator.tokenizer.decode(outputs[0], skip_special_tokens=True)

# 不同参数生成示例
prompt = "人工智能的未来，"
print("\\n不同参数的生成结果：")
print(f"温度=0.5: {generate_with_params(prompt, temperature=0.5)}")
print(f"温度=1.0: {generate_with_params(prompt, temperature=1.0)}")
print(f"温度=1.5: {generate_with_params(prompt, temperature=1.5)}")`}</code>
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
              文本生成的评估主要关注生成文本的质量、多样性和相关性。常用的评估指标包括困惑度、BLEU、ROUGE等。
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">评估指标</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>困惑度(Perplexity)</li>
                  <li>BLEU分数</li>
                  <li>ROUGE分数</li>
                  <li>人工评估</li>
                  <li>多样性指标</li>
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
                      <code>{`import torch
import torch.nn.functional as F
from nltk.translate.bleu_score import sentence_bleu
from rouge import Rouge
import numpy as np
from collections import Counter

def calculate_perplexity(model, tokenizer, text):
    """
    计算困惑度
    """
    inputs = tokenizer.encode(text, return_tensors='pt')
    with torch.no_grad():
        outputs = model(inputs, labels=inputs)
        loss = outputs.loss
    return torch.exp(loss).item()

def calculate_bleu(reference, candidate):
    """
    计算BLEU分数
    """
    reference_tokens = reference.split()
    candidate_tokens = candidate.split()
    return sentence_bleu([reference_tokens], candidate_tokens)

def calculate_rouge(reference, candidate):
    """
    计算ROUGE分数
    """
    rouge = Rouge()
    scores = rouge.get_scores(candidate, reference)[0]
    return scores

def calculate_diversity(texts):
    """
    计算生成文本的多样性
    """
    # 计算词汇多样性
    all_words = []
    for text in texts:
        all_words.extend(text.split())
    unique_words = set(all_words)
    vocabulary_diversity = len(unique_words) / len(all_words)
    
    # 计算n-gram多样性
    def get_ngrams(text, n):
        words = text.split()
        return [' '.join(words[i:i+n]) for i in range(len(words)-n+1)]
    
    bigrams = []
    for text in texts:
        bigrams.extend(get_ngrams(text, 2))
    bigram_diversity = len(set(bigrams)) / len(bigrams)
    
    return {
        'vocabulary_diversity': vocabulary_diversity,
        'bigram_diversity': bigram_diversity
    }

def evaluate_generation(model, tokenizer, reference_texts, generated_texts):
    """
    综合评估生成结果
    """
    results = {}
    
    # 计算困惑度
    perplexities = []
    for text in generated_texts:
        perplexity = calculate_perplexity(model, tokenizer, text)
        perplexities.append(perplexity)
    results['perplexity'] = np.mean(perplexities)
    
    # 计算BLEU分数
    bleu_scores = []
    for ref, gen in zip(reference_texts, generated_texts):
        bleu = calculate_bleu(ref, gen)
        bleu_scores.append(bleu)
    results['bleu'] = np.mean(bleu_scores)
    
    # 计算ROUGE分数
    rouge_scores = []
    for ref, gen in zip(reference_texts, generated_texts):
        rouge = calculate_rouge(ref, gen)
        rouge_scores.append(rouge)
    results['rouge'] = {
        'rouge-1': np.mean([s['rouge-1']['f'] for s in rouge_scores]),
        'rouge-2': np.mean([s['rouge-2']['f'] for s in rouge_scores]),
        'rouge-l': np.mean([s['rouge-l']['f'] for s in rouge_scores])
    }
    
    # 计算多样性
    diversity = calculate_diversity(generated_texts)
    results['diversity'] = diversity
    
    return results

# 使用示例
from transformers import GPT2LMHeadModel, GPT2Tokenizer

# 加载模型和分词器
model = GPT2LMHeadModel.from_pretrained('gpt2')
tokenizer = GPT2Tokenizer.from_pretrained('gpt2')

# 示例文本
reference_texts = [
    "人工智能正在改变我们的生活方式。",
    "深度学习技术带来了革命性的突破。",
    "自然语言处理技术日新月异。"
]

generated_texts = [
    "人工智能正在改变我们的世界。",
    "深度学习带来了技术革新。",
    "NLP技术发展迅速。"
]

# 评估生成结果
results = evaluate_generation(model, tokenizer, reference_texts, generated_texts)

# 输出评估结果
print("评估结果：")
print(f"困惑度: {results['perplexity']:.4f}")
print(f"BLEU分数: {results['bleu']:.4f}")
print("ROUGE分数:")
print(f"  ROUGE-1: {results['rouge']['rouge-1']:.4f}")
print(f"  ROUGE-2: {results['rouge']['rouge-2']:.4f}")
print(f"  ROUGE-L: {results['rouge']['rouge-l']:.4f}")
print("多样性指标:")
print(f"  词汇多样性: {results['diversity']['vocabulary_diversity']:.4f}")
print(f"  二元语法多样性: {results['diversity']['bigram_diversity']:.4f}")`}</code>
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
              本节将介绍文本生成在实际应用中的案例，包括故事生成、对话生成等。
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">故事生成</h3>
                <div className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleCode('story-generation')}
                    className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-left font-medium flex justify-between items-center"
                  >
                    <span>故事生成实现</span>
                    <span>{expandedCode === 'story-generation' ? '▼' : '▶'}</span>
                  </button>
                  {expandedCode === 'story-generation' && (
                    <pre className="bg-gray-100 p-4 overflow-x-auto">
                      <code>{`import torch
from transformers import GPT2LMHeadModel, GPT2Tokenizer
import random

class StoryGenerator:
    def __init__(self, model_name='gpt2'):
        self.tokenizer = GPT2Tokenizer.from_pretrained(model_name)
        self.model = GPT2LMHeadModel.from_pretrained(model_name)
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.model.to(self.device)
        
        # 故事开头模板
        self.story_templates = [
            "从前有一个{character}，",
            "在一个{place}，",
            "很久以前，",
            "有一天，"
        ]
        
        # 角色和地点
        self.characters = ["王子", "公主", "魔法师", "勇士", "商人", "农民"]
        self.places = ["城堡", "森林", "村庄", "城市", "山谷", "海边"]
    
    def generate_story(self, max_length=200, num_return_sequences=1):
        # 随机选择故事开头
        template = random.choice(self.story_templates)
        if "{character}" in template:
            template = template.format(character=random.choice(self.characters))
        elif "{place}" in template:
            template = template.format(place=random.choice(self.places))
        
        # 编码输入文本
        inputs = self.tokenizer.encode(template, return_tensors='pt')
        inputs = inputs.to(self.device)
        
        # 生成故事
        with torch.no_grad():
            outputs = self.model.generate(
                inputs,
                max_length=max_length,
                num_return_sequences=num_return_sequences,
                no_repeat_ngram_size=2,
                do_sample=True,
                top_k=50,
                top_p=0.95,
                temperature=0.8,
                pad_token_id=self.tokenizer.eos_token_id
            )
        
        # 解码生成的故事
        stories = []
        for output in outputs:
            story = self.tokenizer.decode(output, skip_special_tokens=True)
            stories.append(story)
        
        return stories

# 使用示例
generator = StoryGenerator()

# 生成单个故事
story = generator.generate_story()
print("生成的故事：")
print(story[0])

# 生成多个故事
stories = generator.generate_story(num_return_sequences=3)
print("\\n生成的多个故事：")
for i, story in enumerate(stories, 1):
    print(f"\\n故事 {i}:")
    print(story)

# 自定义故事生成
def generate_custom_story(character, place, max_length=200):
    generator = StoryGenerator()
    prompt = f"从前有一个{character}，住在{place}。"
    
    inputs = generator.tokenizer.encode(prompt, return_tensors='pt')
    inputs = inputs.to(generator.device)
    
    with torch.no_grad():
        outputs = generator.model.generate(
            inputs,
            max_length=max_length,
            num_return_sequences=1,
            do_sample=True,
            top_k=50,
            top_p=0.95,
            temperature=0.8,
            pad_token_id=generator.tokenizer.eos_token_id
        )
    
    return generator.tokenizer.decode(outputs[0], skip_special_tokens=True)

# 自定义故事示例
custom_story = generate_custom_story("魔法师", "神秘的森林")
print("\\n自定义故事：")
print(custom_story)`}</code>
                    </pre>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">对话生成</h3>
                <div className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleCode('dialogue-generation')}
                    className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-left font-medium flex justify-between items-center"
                  >
                    <span>对话生成实现</span>
                    <span>{expandedCode === 'dialogue-generation' ? '▼' : '▶'}</span>
                  </button>
                  {expandedCode === 'dialogue-generation' && (
                    <pre className="bg-gray-100 p-4 overflow-x-auto">
                      <code>{`import torch
from transformers import GPT2LMHeadModel, GPT2Tokenizer
import json

class DialogueGenerator:
    def __init__(self, model_name='gpt2'):
        self.tokenizer = GPT2Tokenizer.from_pretrained(model_name)
        self.model = GPT2LMHeadModel.from_pretrained(model_name)
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.model.to(self.device)
        
        # 加载对话模板
        self.templates = {
            'greeting': [
                "你好，{name}！",
                "很高兴见到你，{name}。",
                "你好啊，{name}！"
            ],
            'farewell': [
                "再见，{name}！",
                "下次见，{name}。",
                "保重，{name}！"
            ],
            'question': [
                "你觉得{topic}怎么样？",
                "你对{topic}有什么看法？",
                "能告诉我关于{topic}的事情吗？"
            ]
        }
        
        # 对话主题
        self.topics = [
            "人工智能",
            "机器学习",
            "深度学习",
            "自然语言处理",
            "计算机视觉"
        ]
    
    def format_dialogue(self, speaker, text):
        return f"{speaker}: {text}"
    
    def generate_response(self, context, max_length=100):
        # 编码输入文本
        inputs = self.tokenizer.encode(context, return_tensors='pt')
        inputs = inputs.to(self.device)
        
        # 生成回复
        with torch.no_grad():
            outputs = self.model.generate(
                inputs,
                max_length=max_length,
                num_return_sequences=1,
                do_sample=True,
                top_k=50,
                top_p=0.95,
                temperature=0.7,
                pad_token_id=self.tokenizer.eos_token_id
            )
        
        # 解码生成的回复
        response = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        return response
    
    def generate_dialogue(self, num_turns=5):
        dialogue = []
        context = ""
        
        for i in range(num_turns):
            if i == 0:
                # 生成开场白
                template = random.choice(self.templates['greeting'])
                text = template.format(name="小明")
                dialogue.append(self.format_dialogue("AI", text))
                context = text
            elif i == num_turns - 1:
                # 生成结束语
                template = random.choice(self.templates['farewell'])
                text = template.format(name="小明")
                dialogue.append(self.format_dialogue("AI", text))
            else:
                # 生成对话内容
                if i % 2 == 0:
                    # AI的回复
                    response = self.generate_response(context)
                    dialogue.append(self.format_dialogue("AI", response))
                    context = response
                else:
                    # 用户的回复
                    template = random.choice(self.templates['question'])
                    topic = random.choice(self.topics)
                    text = template.format(topic=topic)
                    dialogue.append(self.format_dialogue("用户", text))
                    context = text
        
        return dialogue

# 使用示例
generator = DialogueGenerator()

# 生成对话
dialogue = generator.generate_dialogue()
print("生成的对话：")
for turn in dialogue:
    print(turn)

# 自定义对话生成
def generate_custom_dialogue(topic, num_turns=3):
    generator = DialogueGenerator()
    dialogue = []
    context = f"让我们来讨论{topic}。"
    
    for i in range(num_turns):
        if i % 2 == 0:
            # AI的回复
            response = generator.generate_response(context)
            dialogue.append(generator.format_dialogue("AI", response))
            context = response
        else:
            # 用户的回复
            template = random.choice(generator.templates['question'])
            text = template.format(topic=topic)
            dialogue.append(generator.format_dialogue("用户", text))
            context = text
    
    return dialogue

# 自定义对话示例
custom_dialogue = generate_custom_dialogue("人工智能的未来")
print("\\n自定义对话：")
for turn in custom_dialogue:
    print(turn)`}</code>
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
          href="/study/ai/nlp/machine-translation"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回机器翻译
        </Link>
        <Link 
          href="/study/ai/nlp/sentiment-analysis"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          情感分析 →
        </Link>
      </div>
    </div>
  );
} 
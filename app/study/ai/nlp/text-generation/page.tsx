'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@/app/components/ui/book/BookContent'

const gptCode = `import torch
from transformers import GPT2LMHeadModel, GPT2Tokenizer

class TextGenerator:
    def __init__(self, model_name='gpt2'):
        self.tokenizer = GPT2Tokenizer.from_pretrained(model_name)
        self.model = GPT2LMHeadModel.from_pretrained(model_name)
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.model.to(self.device)

    def generate_text(self, prompt, max_length=100, num_return_sequences=1):
        inputs = self.tokenizer.encode(prompt, return_tensors='pt')
        inputs = inputs.to(self.device)
        with torch.no_grad():
            outputs = self.model.generate(
                inputs, max_length=max_length, num_return_sequences=num_return_sequences,
                no_repeat_ngram_size=2, do_sample=True, top_k=50, top_p=0.95,
                temperature=0.7, pad_token_id=self.tokenizer.eos_token_id
            )
        generated_texts = []
        for output in outputs:
            text = self.tokenizer.decode(output, skip_special_tokens=True)
            generated_texts.append(text)
        return generated_texts

generator = TextGenerator()
prompt = "人工智能正在改变世界，"
generated = generator.generate_text(prompt)
print(f"输入提示: {prompt}")
print(f"生成文本: {generated[0]}")

def generate_with_params(prompt, temperature=0.7, top_p=0.9, top_k=50):
    generator = TextGenerator()
    inputs = generator.tokenizer.encode(prompt, return_tensors='pt')
    inputs = inputs.to(generator.device)
    with torch.no_grad():
        outputs = generator.model.generate(
            inputs, max_length=100, num_return_sequences=1, do_sample=True,
            temperature=temperature, top_p=top_p, top_k=top_k,
            pad_token_id=generator.tokenizer.eos_token_id
        )
    return generator.tokenizer.decode(outputs[0], skip_special_tokens=True)

prompt = "人工智能的未来，"
print(f"温度=0.5: {generate_with_params(prompt, temperature=0.5)}")
print(f"温度=1.0: {generate_with_params(prompt, temperature=1.0)}")
print(f"温度=1.5: {generate_with_params(prompt, temperature=1.5)}")`

const evalCode = `import torch
import torch.nn.functional as F
from nltk.translate.bleu_score import sentence_bleu
from rouge import Rouge
import numpy as np
from collections import Counter

def calculate_perplexity(model, tokenizer, text):
    inputs = tokenizer.encode(text, return_tensors='pt')
    with torch.no_grad():
        outputs = model(inputs, labels=inputs)
        loss = outputs.loss
    return torch.exp(loss).item()

def calculate_bleu(reference, candidate):
    reference_tokens = reference.split()
    candidate_tokens = candidate.split()
    return sentence_bleu([reference_tokens], candidate_tokens)

def calculate_rouge(reference, candidate):
    rouge = Rouge()
    scores = rouge.get_scores(candidate, reference)[0]
    return scores

def calculate_diversity(texts):
    all_words = []
    for text in texts:
        all_words.extend(text.split())
    unique_words = set(all_words)
    vocabulary_diversity = len(unique_words) / len(all_words)
    def get_ngrams(text, n):
        words = text.split()
        return [' '.join(words[i:i+n]) for i in range(len(words)-n+1)]
    bigrams = []
    for text in texts:
        bigrams.extend(get_ngrams(text, 2))
    bigram_diversity = len(set(bigrams)) / len(bigrams)
    return {'vocabulary_diversity': vocabulary_diversity, 'bigram_diversity': bigram_diversity}

def evaluate_generation(model, tokenizer, reference_texts, generated_texts):
    results = {}
    perplexities = [calculate_perplexity(model, tokenizer, text) for text in generated_texts]
    results['perplexity'] = np.mean(perplexities)
    bleu_scores = [calculate_bleu(ref, gen) for ref, gen in zip(reference_texts, generated_texts)]
    results['bleu'] = np.mean(bleu_scores)
    rouge_scores = [calculate_rouge(ref, gen) for ref, gen in zip(reference_texts, generated_texts)]
    results['rouge'] = {'rouge-1': np.mean([s['rouge-1']['f'] for s in rouge_scores]), 'rouge-2': np.mean([s['rouge-2']['f'] for s in rouge_scores]), 'rouge-l': np.mean([s['rouge-l']['f'] for s in rouge_scores])}
    diversity = calculate_diversity(generated_texts)
    results['diversity'] = diversity
    return results

from transformers import GPT2LMHeadModel, GPT2Tokenizer
model = GPT2LMHeadModel.from_pretrained('gpt2')
tokenizer = GPT2Tokenizer.from_pretrained('gpt2')

reference_texts = ["人工智能正在改变我们的生活方式。", "深度学习技术带来了革命性的突破。", "自然语言处理技术日新月异。"]
generated_texts = ["人工智能正在改变我们的世界。", "深度学习带来了技术革新。", "NLP技术发展迅速。"]
results = evaluate_generation(model, tokenizer, reference_texts, generated_texts)
print(f"困惑度: {results['perplexity']:.4f}")
print(f"BLEU分数: {results['bleu']:.4f}")
print(f"ROUGE-1: {results['rouge']['rouge-1']:.4f}, ROUGE-2: {results['rouge']['rouge-2']:.4f}, ROUGE-L: {results['rouge']['rouge-l']:.4f}")
print(f"词汇多样性: {results['diversity']['vocabulary_diversity']:.4f}, 二元语法多样性: {results['diversity']['bigram_diversity']:.4f}")`

const storyCode = `import torch
from transformers import GPT2LMHeadModel, GPT2Tokenizer
import random

class StoryGenerator:
    def __init__(self, model_name='gpt2'):
        self.tokenizer = GPT2Tokenizer.from_pretrained(model_name)
        self.model = GPT2LMHeadModel.from_pretrained(model_name)
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.model.to(self.device)
        self.story_templates = ["从前有一个{character}，", "在一个{place}，", "很久以前，", "有一天，"]
        self.characters = ["王子", "公主", "魔法师", "勇士", "商人", "农民"]
        self.places = ["城堡", "森林", "村庄", "城市", "山谷", "海边"]

    def generate_story(self, max_length=200, num_return_sequences=1):
        template = random.choice(self.story_templates)
        if "{character}" in template:
            template = template.format(character=random.choice(self.characters))
        elif "{place}" in template:
            template = template.format(place=random.choice(self.places))
        inputs = self.tokenizer.encode(template, return_tensors='pt')
        inputs = inputs.to(self.device)
        with torch.no_grad():
            outputs = self.model.generate(
                inputs, max_length=max_length, num_return_sequences=num_return_sequences,
                no_repeat_ngram_size=2, do_sample=True, top_k=50, top_p=0.95,
                temperature=0.8, pad_token_id=self.tokenizer.eos_token_id
            )
        stories = [self.tokenizer.decode(output, skip_special_tokens=True) for output in outputs]
        return stories

generator = StoryGenerator()
story = generator.generate_story()
print("生成的故事：")
print(story[0])

stories = generator.generate_story(num_return_sequences=3)
for i, story in enumerate(stories, 1):
    print(f"\\n故事 {i}:")
    print(story)

def generate_custom_story(character, place, max_length=200):
    generator = StoryGenerator()
    prompt = f"从前有一个{character}，住在{place}。"
    inputs = generator.tokenizer.encode(prompt, return_tensors='pt')
    inputs = inputs.to(generator.device)
    with torch.no_grad():
        outputs = generator.model.generate(
            inputs, max_length=max_length, num_return_sequences=1,
            do_sample=True, top_k=50, top_p=0.95, temperature=0.8,
            pad_token_id=generator.tokenizer.eos_token_id
        )
    return generator.tokenizer.decode(outputs[0], skip_special_tokens=True)

custom_story = generate_custom_story("魔法师", "神秘的森林")
print("\\n自定义故事：")
print(custom_story)`

const dialogueGenCode = `import torch
from transformers import GPT2LMHeadModel, GPT2Tokenizer
import random
import json

class DialogueGenerator:
    def __init__(self, model_name='gpt2'):
        self.tokenizer = GPT2Tokenizer.from_pretrained(model_name)
        self.model = GPT2LMHeadModel.from_pretrained(model_name)
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.model.to(self.device)
        self.templates = {
            'greeting': ["你好，{name}！", "很高兴见到你，{name}。", "你好啊，{name}！"],
            'farewell': ["再见，{name}！", "下次见，{name}。", "保重，{name}！"],
            'question': ["你觉得{topic}怎么样？", "你对{topic}有什么看法？", "能告诉我关于{topic}的事情吗？"]
        }
        self.topics = ["人工智能", "机器学习", "深度学习", "自然语言处理", "计算机视觉"]

    def format_dialogue(self, speaker, text):
        return f"{speaker}: {text}"

    def generate_response(self, context, max_length=100):
        inputs = self.tokenizer.encode(context, return_tensors='pt')
        inputs = inputs.to(self.device)
        with torch.no_grad():
            outputs = self.model.generate(
                inputs, max_length=max_length, num_return_sequences=1,
                do_sample=True, top_k=50, top_p=0.95, temperature=0.7,
                pad_token_id=self.tokenizer.eos_token_id
            )
        return self.tokenizer.decode(outputs[0], skip_special_tokens=True)

    def generate_dialogue(self, num_turns=5):
        dialogue = []
        context = ""
        for i in range(num_turns):
            if i == 0:
                template = random.choice(self.templates['greeting'])
                text = template.format(name="小明")
                dialogue.append(self.format_dialogue("AI", text))
                context = text
            elif i == num_turns - 1:
                template = random.choice(self.templates['farewell'])
                text = template.format(name="小明")
                dialogue.append(self.format_dialogue("AI", text))
            else:
                if i % 2 == 0:
                    response = self.generate_response(context)
                    dialogue.append(self.format_dialogue("AI", response))
                    context = response
                else:
                    template = random.choice(self.templates['question'])
                    topic = random.choice(self.topics)
                    text = template.format(topic=topic)
                    dialogue.append(self.format_dialogue("用户", text))
                    context = text
        return dialogue

generator = DialogueGenerator()
dialogue = generator.generate_dialogue()
print("生成的对话：")
for turn in dialogue:
    print(turn)

def generate_custom_dialogue(topic, num_turns=3):
    generator = DialogueGenerator()
    dialogue = []
    context = f"让我们来讨论{topic}。"
    for i in range(num_turns):
        if i % 2 == 0:
            response = generator.generate_response(context)
            dialogue.append(generator.format_dialogue("AI", response))
            context = response
        else:
            template = random.choice(generator.templates['question'])
            text = template.format(topic=topic)
            dialogue.append(generator.format_dialogue("用户", text))
            context = text
    return dialogue

custom_dialogue = generate_custom_dialogue("人工智能的未来")
print("\\n自定义对话：")
for turn in custom_dialogue:
    print(turn)`

const META: LessonMeta = {
  subject: '自然语言处理', chapterTitle: '文本生成', chapterNumber: 7, totalChapters: 14,
  subjectHref: '/study/ai/nlp',
  prevChapter: { label: '机器翻译', href: '/study/ai/nlp/machine-translation' },
  nextChapter: { label: '情感分析', href: '/study/ai/nlp/sentiment-analysis' },
  theme: THEMES.ai,
}

const SPREADS = [
  {
    label: '概述', left: (<div className="space-y-4"><PageTitle>文本生成概述</PageTitle><BookParagraph>文本生成(Text Generation)是自然语言处理的重要任务之一，旨在根据给定的输入生成连贯、有意义的文本。随着大规模预训练语言模型的发展，文本生成的质量和多样性得到了显著提升。</BookParagraph><SectionTitle>主要特点</SectionTitle><BookList items={['上下文理解','连贯性生成','多样性输出','可控生成','多模态融合']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>应用场景</SectionTitle><BookList items={['对话系统','内容创作','摘要生成','代码生成','故事创作']} /></div>),
  },
  {
    label: '生成方法', left: (<div className="space-y-4"><PageTitle>文本生成方法</PageTitle><BookParagraph>文本生成的方法主要包括基于规则的方法、统计语言模型和深度学习方法。目前主流的生成方法主要基于大规模预训练语言模型。</BookParagraph><SectionTitle>主要方法</SectionTitle><BookList items={['基于规则的方法','统计语言模型','RNN/LSTM生成','Transformer架构','预训练语言模型']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>GPT文本生成实现</SectionTitle><BookCode language="python" code={gptCode} /></div>),
  },
  {
    label: '评估指标', left: (<div className="space-y-4"><PageTitle>评估指标</PageTitle><BookParagraph>文本生成的评估主要关注生成文本的质量、多样性和相关性。常用的评估指标包括困惑度、BLEU、ROUGE等。</BookParagraph><SectionTitle>评估指标</SectionTitle><BookList items={['困惑度(Perplexity)','BLEU分数','ROUGE分数','人工评估','多样性指标']} /></div>),
    right: (<div className="space-y-4"><SectionTitle>评估指标实现</SectionTitle><BookCode language="python" code={evalCode} /></div>),
  },
  {
    label: '实战案例', left: (<div className="space-y-4"><PageTitle>实战案例</PageTitle><BookParagraph>本节将介绍文本生成在实际应用中的案例，包括故事生成、对话生成等。</BookParagraph><SectionTitle>故事生成</SectionTitle><BookCode language="python" code={storyCode} /></div>),
    right: (<div className="space-y-4"><SectionTitle>对话生成</SectionTitle><BookCode language="python" code={dialogueGenCode} /></div>),
  },
]

export default function NlpTgPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }

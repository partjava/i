'use client'

import LessonLayout, { type LessonMeta } from '@/app/components/ui/book/LessonLayout'
import { THEMES } from '@/app/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@/app/components/ui/book/BookContent'

const dialogueSystemCode = `import torch
from transformers import BertTokenizer, BertForSequenceClassification
from typing import List, Dict, Tuple
import numpy as np

class DialogueSystem:
    def __init__(self, model_name='bert-base-chinese'):
        self.tokenizer = BertTokenizer.from_pretrained(model_name)
        self.model = BertForSequenceClassification.from_pretrained(model_name)
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.model.to(self.device)
        self.conversation_history = []

    def preprocess_input(self, text: str) -> str:
        return text.strip()

    def update_history(self, user_input: str, system_response: str):
        self.conversation_history.append({'user': user_input, 'system': system_response})

    def get_context(self, max_turns: int = 3) -> str:
        recent_history = self.conversation_history[-max_turns:]
        context = ""
        for turn in recent_history:
            context += f"用户: {turn['user']}\\n系统: {turn['system']}\\n"
        return context

    def generate_response(self, user_input: str) -> str:
        user_input = self.preprocess_input(user_input)
        context = self.get_context()
        inputs = self.tokenizer(context + user_input, return_tensors='pt', padding=True, truncation=True, max_length=512)
        inputs = {k: v.to(self.device) for k, v in inputs.items()}
        with torch.no_grad():
            outputs = self.model(**inputs)
            logits = outputs.logits
            response_id = torch.argmax(logits, dim=1).item()
            response = self.get_response_template(response_id)
        self.update_history(user_input, response)
        return response

    def get_response_template(self, response_id: int) -> str:
        templates = {0: "我明白了，请继续。", 1: "这个问题很有趣，让我想想。", 2: "抱歉，我需要更多信息。", 3: "我理解您的意思了。", 4: "让我为您解释一下。"}
        return templates.get(response_id, "抱歉，我现在无法回答这个问题。")

    def clear_history(self):
        self.conversation_history = []

dialogue_system = DialogueSystem()
conversation = ["你好，请问你是谁？", "你能帮我做什么？", "我想了解一下人工智能。", "谢谢你的解释。"]
for user_input in conversation:
    response = dialogue_system.generate_response(user_input)
    print(f"用户: {user_input}\\n系统: {response}\\n")`

const dialogueEvalCode = `import numpy as np
from typing import List, Dict, Tuple
from nltk.translate.bleu_score import sentence_bleu
from rouge import Rouge

def bleu_score(prediction: str, reference: str) -> float:
    reference = [reference.split()]
    candidate = prediction.split()
    return sentence_bleu(reference, candidate)

def rouge_score(prediction: str, reference: str) -> float:
    rouge = Rouge()
    scores = rouge.get_scores(prediction, reference)
    return scores[0]['rouge-l']['f']

def dialogue_success_rate(predictions: List[str], references: List[str], task_completion: List[bool]) -> float:
    total = len(predictions)
    if total == 0: return 0.0
    successful = sum(1 for p, r, t in zip(predictions, references, task_completion) if bleu_score(p, r) > 0.5 and t)
    return successful / total

def user_satisfaction(predictions: List[str], references: List[str], ratings: List[int]) -> float:
    total = len(predictions)
    if total == 0: return 0.0
    quality_scores = [bleu_score(p, r) for p, r in zip(predictions, references)]
    satisfaction = sum(q * r for q, r in zip(quality_scores, ratings)) / total
    return satisfaction

def task_completion_rate(tasks: List[Dict]) -> float:
    total = len(tasks)
    if total == 0: return 0.0
    completed = sum(1 for task in tasks if task['completed'])
    return completed / total

def evaluate_dialogue_system(predictions, references, task_completion, user_ratings, tasks):
    return {
        'bleu': np.mean([bleu_score(p, r) for p, r in zip(predictions, references)]),
        'rouge': np.mean([rouge_score(p, r) for p, r in zip(predictions, references)]),
        'success_rate': dialogue_success_rate(predictions, references, task_completion),
        'satisfaction': user_satisfaction(predictions, references, user_ratings),
        'task_completion': task_completion_rate(tasks)
    }

predictions = ["我明白了，让我为您解释一下。", "这个问题很有趣，让我想想。", "抱歉，我需要更多信息。"]
references = ["我理解您的意思，让我为您详细说明。", "这是个很好的问题，让我为您解答。", "为了给您更好的回答，请提供更多细节。"]
task_completion = [True, True, False]
user_ratings = [4, 5, 3]
tasks = [{'id': 1, 'completed': True}, {'id': 2, 'completed': True}, {'id': 3, 'completed': False}]
metrics = evaluate_dialogue_system(predictions, references, task_completion, user_ratings, tasks)
print(f"BLEU: {metrics['bleu']:.4f}, ROUGE: {metrics['rouge']:.4f}, 成功率: {metrics['success_rate']:.4f}, 满意度: {metrics['satisfaction']:.4f}, 任务完成度: {metrics['task_completion']:.4f}")`

const assistantCode = `import pandas as pd
import numpy as np
from typing import List, Dict, Tuple
from datetime import datetime

class SmartAssistant:
    def __init__(self, dialogue_system):
        self.dialogue_system = dialogue_system
        self.user_preferences = {}
        self.reminders = []
        self.tasks = []

    def set_user_preference(self, user_id: str, preferences: Dict):
        self.user_preferences[user_id] = preferences

    def add_reminder(self, user_id: str, reminder: Dict):
        self.reminders.append({'user_id': user_id, 'time': reminder['time'], 'content': reminder['content'], 'completed': False})

    def add_task(self, user_id: str, task: Dict):
        self.tasks.append({'user_id': user_id, 'title': task['title'], 'description': task['description'], 'due_date': task['due_date'], 'completed': False})

    def process_command(self, user_id: str, command: str) -> str:
        preferences = self.user_preferences.get(user_id, {})
        if "设置提醒" in command:
            time = command.split("在")[1].split("提醒")[0]
            content = command.split("提醒")[1]
            self.add_reminder(user_id, {'time': time, 'content': content})
            return f"好的，我会在{time}提醒您{content}"
        elif "添加任务" in command:
            title = command.split("添加任务")[1].split("，")[0]
            description = command.split("，")[1] if "，" in command else ""
            due_date = command.split("截止日期")[1] if "截止日期" in command else None
            self.add_task(user_id, {'title': title, 'description': description, 'due_date': due_date})
            return f"已添加任务：{title}"
        elif "查看任务" in command:
            user_tasks = [t for t in self.tasks if t['user_id'] == user_id]
            if not user_tasks: return "您当前没有待办任务。"
            response = "您的任务列表：\\n"
            for task in user_tasks:
                response += f"- {task['title']}"
                if task['description']: response += f": {task['description']}"
                if task['due_date']: response += f" (截止: {task['due_date']})"
                response += "\\n"
            return response
        elif "查看提醒" in command:
            user_reminders = [r for r in self.reminders if r['user_id'] == user_id]
            if not user_reminders: return "您当前没有设置提醒。"
            response = "您的提醒列表：\\n"
            for reminder in user_reminders:
                response += f"- {reminder['time']}: {reminder['content']}\\n"
            return response
        else:
            return self.dialogue_system.generate_response(command)

assistant = SmartAssistant(DialogueSystem())
assistant.set_user_preference("user1", {'language': 'zh', 'notification': True, 'theme': 'dark'})
commands = ["设置提醒在明天早上9点提醒我开会", "添加任务完成报告，截止日期明天", "查看任务", "查看提醒", "今天天气怎么样？"]
for command in commands:
    response = assistant.process_command("user1", command)
    print(f"用户: {command}\\n助手: {response}\\n")`

const csBotCode = `import pandas as pd
import numpy as np
from typing import List, Dict, Tuple
from datetime import datetime

class CustomerServiceBot:
    def __init__(self, dialogue_system):
        self.dialogue_system = dialogue_system
        self.knowledge_base = {}
        self.conversation_history = {}
        self.faq = {}

    def add_knowledge(self, category: str, question: str, answer: str):
        if category not in self.knowledge_base:
            self.knowledge_base[category] = {}
        self.knowledge_base[category][question] = answer

    def add_faq(self, question: str, answer: str):
        self.faq[question] = answer

    def find_best_match(self, question: str) -> Tuple[str, float]:
        best_match = None
        best_score = 0.0
        for faq_question in self.faq.keys():
            _, score = self.dialogue_system.find_answer(question, faq_question)
            if score > best_score: best_score, best_match = score, faq_question
        for category in self.knowledge_base.values():
            for kb_question in category.keys():
                _, score = self.dialogue_system.find_answer(question, kb_question)
                if score > best_score: best_score, best_match = score, kb_question
        return best_match, best_score

    def process_query(self, user_id: str, query: str) -> str:
        if user_id not in self.conversation_history:
            self.conversation_history[user_id] = []
        self.conversation_history[user_id].append({'timestamp': datetime.now(), 'query': query})
        best_match, score = self.find_best_match(query)
        if score > 0.7:
            answer = self.faq[best_match] if best_match in self.faq else next(cat[best_match] for cat in self.knowledge_base.values() if best_match in cat)
        else:
            answer = "抱歉，我暂时无法回答这个问题。请稍后联系人工客服。"
        self.conversation_history[user_id][-1]['answer'] = answer
        self.conversation_history[user_id][-1]['confidence'] = score
        return answer

bot = CustomerServiceBot(DialogueSystem())
bot.add_faq("如何退货？", "您可以在收到商品后7天内申请退货，请登录您的账户，在订单详情页面点击'申请退货'按钮。")
bot.add_faq("运费是多少？", "普通商品满99元免运费，不满99元收取10元运费。")
bot.add_knowledge("支付", "支持哪些支付方式？", "我们支持支付宝、微信支付、银行卡等多种支付方式。")
bot.add_knowledge("配送", "多久能收到商品？", "一般情况下，订单确认后24小时内发货，快递送达时间约为3-5天。")

for q in ["我想退货，应该怎么操作？", "买的东西不满99元，要付多少运费？", "你们支持哪些支付方式？", "多久能收到商品？", "你们有实体店吗？"]:
    answer = bot.process_query("customer1", q)
    print(f"用户: {q}\\n机器人: {answer}\\n")`

const META: LessonMeta = {
  subject: '自然语言处理', chapterTitle: '对话系统', chapterNumber: 10, totalChapters: 14,
  subjectHref: '/study/ai/nlp',
  prevChapter: { label: '问答系统', href: '/study/ai/nlp/qa' },
  nextChapter: { label: 'NLP框架与工具', href: '/study/ai/nlp/frameworks' },
  theme: THEMES.ai,
}

const SPREADS = [
  { label: '概述', left: (<div className="space-y-4"><PageTitle>对话系统概述</PageTitle><BookParagraph>对话系统(Dialogue System)是自然语言处理的重要应用之一，旨在实现人机之间的自然对话交互。它广泛应用于智能助手、客服机器人、智能家居等领域。</BookParagraph><SectionTitle>主要特点</SectionTitle><BookList items={['多轮对话能力','上下文理解','意图识别','情感理解','个性化响应']} /></div>), right: (<div className="space-y-4"><SectionTitle>应用场景</SectionTitle><BookList items={['智能助手','客服机器人','智能家居','教育辅导','医疗咨询']} /></div>) },
  { label: '主要方法', left: (<div className="space-y-4"><PageTitle>主要方法</PageTitle><BookParagraph>对话系统的方法主要包括基于规则的方法、检索式对话、生成式对话和混合式对话等。目前主流的对话系统主要基于深度学习和预训练语言模型。</BookParagraph><SectionTitle>主要方法</SectionTitle><BookList items={['基于规则的方法','检索式对话','生成式对话','混合式对话','预训练语言模型']} /></div>), right: (<div className="space-y-4"><SectionTitle>对话系统实现</SectionTitle><BookCode language="python" code={dialogueSystemCode} /></div>) },
  { label: '评估指标', left: (<div className="space-y-4"><PageTitle>评估指标</PageTitle><BookParagraph>对话系统的评估主要关注对话的流畅性、相关性和任务完成度。常用的评估指标包括BLEU、ROUGE、对话成功率等。</BookParagraph><SectionTitle>评估指标</SectionTitle><BookList items={['BLEU分数','ROUGE分数','对话成功率','用户满意度','任务完成度']} /></div>), right: (<div className="space-y-4"><SectionTitle>评估指标实现</SectionTitle><BookCode language="python" code={dialogueEvalCode} /></div>) },
  { label: '实战案例', left: (<div className="space-y-4"><PageTitle>实战案例</PageTitle><BookParagraph>本节将介绍对话系统在实际应用中的案例，包括智能助手和客服机器人等。</BookParagraph><SectionTitle>智能助手</SectionTitle><BookCode language="python" code={assistantCode} /></div>), right: (<div className="space-y-4"><SectionTitle>客服机器人</SectionTitle><BookCode language="python" code={csBotCode} /></div>) },
]

export default function NlpDialoguePage() { return <LessonLayout meta={META} spreads={SPREADS} /> }

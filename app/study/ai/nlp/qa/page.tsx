'use client'

import LessonLayout, { type LessonMeta } from '@shared/components/ui/book/LessonLayout'
import { THEMES } from '@shared/components/ui/book/theme'
import {
  PageTitle, SectionTitle, BookParagraph, BookCode, BookList,
} from '@shared/components/ui/book/BookContent'

const qaSystemCode = `import torch
from transformers import BertTokenizer, BertForQuestionAnswering
import numpy as np
from typing import List, Dict, Tuple

class QASystem:
    def __init__(self, model_name='bert-base-chinese'):
        self.tokenizer = BertTokenizer.from_pretrained(model_name)
        self.model = BertForQuestionAnswering.from_pretrained(model_name)
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.model.to(self.device)

    def preprocess_question(self, question: str) -> str:
        return question.strip()

    def preprocess_context(self, context: str) -> str:
        return context.strip()

    def find_answer(self, question: str, context: str) -> Tuple[str, float]:
        question = self.preprocess_question(question)
        context = self.preprocess_context(context)
        inputs = self.tokenizer(question, context, return_tensors='pt', padding=True, truncation=True, max_length=512)
        inputs = {k: v.to(self.device) for k, v in inputs.items()}
        with torch.no_grad():
            outputs = self.model(**inputs)
            start_scores = outputs.start_logits
            end_scores = outputs.end_logits
            start_idx = torch.argmax(start_scores)
            end_idx = torch.argmax(end_scores)
            confidence = torch.softmax(start_scores, dim=1)[0][start_idx].item() * torch.softmax(end_scores, dim=1)[0][end_idx].item()
            answer_tokens = inputs['input_ids'][0][start_idx:end_idx+1]
            answer = self.tokenizer.decode(answer_tokens)
        return answer, confidence

    def batch_find_answers(self, questions: List[str], contexts: List[str]) -> List[Tuple[str, float]]:
        results = []
        for question, context in zip(questions, contexts):
            answer, confidence = self.find_answer(question, context)
            results.append((answer, confidence))
        return results

qa_system = QASystem()
question = "什么是人工智能？"
context = "人工智能是计算机科学的一个分支，它致力于研究和开发能够模拟、延伸和扩展人类智能的理论、方法、技术及应用系统。"
answer, confidence = qa_system.find_answer(question, context)
print(f"问题: {question}\\n答案: {answer}\\n置信度: {confidence:.4f}")`

const qaEvalCode = `import numpy as np
from typing import List, Tuple, Dict
from nltk.translate.bleu_score import sentence_bleu
from rouge import Rouge

def exact_match(prediction: str, ground_truth: str) -> float:
    return float(prediction.strip() == ground_truth.strip())

def f1_score(prediction: str, ground_truth: str) -> float:
    pred_tokens = prediction.split()
    truth_tokens = ground_truth.split()
    common = set(pred_tokens) & set(truth_tokens)
    if len(pred_tokens) == 0 or len(truth_tokens) == 0:
        return 0.0
    precision = len(common) / len(pred_tokens)
    recall = len(common) / len(truth_tokens)
    if precision + recall == 0:
        return 0.0
    return 2 * precision * recall / (precision + recall)

def rouge_score(prediction: str, ground_truth: str) -> float:
    rouge = Rouge()
    scores = rouge.get_scores(prediction, ground_truth)
    return scores[0]['rouge-l']['f']

def bleu_score(prediction: str, ground_truth: str) -> float:
    reference = [ground_truth.split()]
    candidate = prediction.split()
    return sentence_bleu(reference, candidate)

def evaluate_qa_system(predictions: List[str], ground_truths: List[str]) -> Dict[str, float]:
    metrics = {'exact_match': [], 'f1': [], 'rouge': [], 'bleu': []}
    for pred, truth in zip(predictions, ground_truths):
        metrics['exact_match'].append(exact_match(pred, truth))
        metrics['f1'].append(f1_score(pred, truth))
        metrics['rouge'].append(rouge_score(pred, truth))
        metrics['bleu'].append(bleu_score(pred, truth))
    return {metric: np.mean(scores) for metric, scores in metrics.items()}

predictions = ["人工智能是计算机科学的一个分支", "机器学习是人工智能的一个分支", "深度学习是机器学习的一个分支"]
ground_truths = ["人工智能是计算机科学的一个分支，致力于研究和开发能够模拟人类智能的系统", "机器学习是人工智能的一个分支，使用统计方法让计算机从数据中学习", "深度学习是机器学习的一个分支，使用多层神经网络学习数据的层次化表示"]
metrics = evaluate_qa_system(predictions, ground_truths)
print(f"精确匹配: {metrics['exact_match']:.4f}, F1: {metrics['f1']:.4f}, ROUGE: {metrics['rouge']:.4f}, BLEU: {metrics['bleu']:.4f}")`

const customerCode = `import pandas as pd
import numpy as np
from typing import List, Dict, Tuple
from datetime import datetime

class CustomerServiceQA:
    def __init__(self, qa_system):
        self.qa_system = qa_system
        self.knowledge_base = {}
        self.conversation_history = []

    def add_knowledge(self, question: str, answer: str):
        self.knowledge_base[question] = answer

    def find_best_match(self, question: str) -> Tuple[str, float]:
        best_match = None
        best_score = 0.0
        for kb_question in self.knowledge_base.keys():
            _, score = self.qa_system.find_answer(question, kb_question)
            if score > best_score:
                best_score = score
                best_match = kb_question
        return best_match, best_score

    def answer_question(self, question: str) -> str:
        self.conversation_history.append({'timestamp': datetime.now(), 'question': question})
        best_match, score = self.find_best_match(question)
        if score > 0.7:
            answer = self.knowledge_base[best_match]
        else:
            answer = "抱歉，我暂时无法回答这个问题。请稍后联系人工客服。"
        self.conversation_history[-1]['answer'] = answer
        self.conversation_history[-1]['confidence'] = score
        return answer

    def generate_report(self) -> str:
        total_questions = len(self.conversation_history)
        answered_questions = sum(1 for q in self.conversation_history if q['confidence'] > 0.7)
        report = f"智能客服系统报告\\n总问题数: {total_questions}\\n已回答: {answered_questions}\\n回答率: {answered_questions/total_questions:.2%}"
        return report

qa_system = QASystem()
cs = CustomerServiceQA(qa_system)
cs.add_knowledge("如何退货？", "您可以在收到商品后7天内申请退货，请登录您的账户，在订单详情页面点击'申请退货'按钮。")
cs.add_knowledge("运费是多少？", "普通商品满99元免运费，不满99元收取10元运费。")
cs.add_knowledge("如何修改收货地址？", "在订单发货前，您可以登录账户，在订单详情页面点击'修改地址'按钮进行修改。")

for q in ["我想退货，应该怎么操作？", "买的东西不满99元，要付多少运费？", "我的收货地址写错了，能改吗？", "你们支持货到付款吗？"]:
    answer = cs.answer_question(q)
    print(f"问题: {q}\\n回答: {answer}\\n")`

const educationCode = `import pandas as pd
import numpy as np
from typing import List, Dict, Tuple
from datetime import datetime

class EducationQA:
    def __init__(self, qa_system):
        self.qa_system = qa_system
        self.knowledge_base = {}
        self.student_records = {}

    def add_knowledge(self, subject: str, question: str, answer: str):
        if subject not in self.knowledge_base:
            self.knowledge_base[subject] = {}
        self.knowledge_base[subject][question] = answer

    def find_best_match(self, subject: str, question: str) -> Tuple[str, float]:
        if subject not in self.knowledge_base:
            return None, 0.0
        best_match = None
        best_score = 0.0
        for kb_question in self.knowledge_base[subject].keys():
            _, score = self.qa_system.find_answer(question, kb_question)
            if score > best_score:
                best_score = score
                best_match = kb_question
        return best_match, best_score

    def answer_question(self, student_id: str, subject: str, question: str) -> str:
        if student_id not in self.student_records:
            self.student_records[student_id] = []
        self.student_records[student_id].append({'timestamp': datetime.now(), 'subject': subject, 'question': question})
        best_match, score = self.find_best_match(subject, question)
        answer = self.knowledge_base[subject][best_match] if score > 0.7 else "抱歉，我暂时无法回答这个问题。"
        self.student_records[student_id][-1]['answer'] = answer
        self.student_records[student_id][-1]['confidence'] = score
        return answer

    def generate_report(self, student_id: str) -> str:
        records = self.student_records.get(student_id, [])
        total = len(records)
        answered = sum(1 for r in records if r['confidence'] > 0.7)
        return f"学生{student_id}: 共{total}题, 已回答{answered}, 回答率{answered/total:.2%}"

qa = EducationQA(QASystem())
qa.add_knowledge("数学", "什么是二次函数？", "二次函数是形如f(x)=ax²+bx+c（a≠0）的函数，其图像为抛物线。")
qa.add_knowledge("数学", "如何求二次函数的顶点？", "二次函数f(x)=ax²+bx+c的顶点坐标为(-b/2a, f(-b/2a))。")
qa.add_knowledge("物理", "什么是牛顿第一定律？", "牛顿第一定律指出：一个物体如果不受外力作用，将保持静止状态或匀速直线运动状态。")
qa.add_knowledge("物理", "如何计算物体的加速度？", "物体的加速度等于物体所受的合外力除以物体的质量，即a=F/m。")

for subject, question in [("数学", "二次函数是什么？"), ("数学", "怎么求二次函数的顶点坐标？"), ("物理", "什么是牛顿第一定律？"), ("物理", "加速度怎么算？"), ("化学", "什么是氧化还原反应？")]:
    answer = qa.answer_question("2024001", subject, question)
    print(f"{subject}: {question}\\n{answer}\\n")`

const META: LessonMeta = {
  subject: '自然语言处理', chapterTitle: '问答系统', chapterNumber: 9, totalChapters: 14,
  subjectHref: '/study/ai/nlp',
  prevChapter: { label: '情感分析', href: '/study/ai/nlp/sentiment-analysis' },
  nextChapter: { label: '对话系统', href: '/study/ai/nlp/dialogue' },
  theme: THEMES.ai,
}

const SPREADS = [
  { label: '概述', left: (<div className="space-y-4"><PageTitle>问答系统概述</PageTitle><BookParagraph>问答系统(Question Answering System)是自然语言处理的重要应用之一，旨在根据用户的问题自动生成准确的答案。它广泛应用于智能客服、搜索引擎、教育辅导等领域。</BookParagraph><SectionTitle>主要特点</SectionTitle><BookList items={['基于知识库的问答','开放域问答','阅读理解式问答','多轮对话问答','跨语言问答']} /></div>), right: (<div className="space-y-4"><SectionTitle>应用场景</SectionTitle><BookList items={['智能客服','搜索引擎','教育辅导','医疗咨询','法律咨询']} /></div>) },
  { label: '主要方法', left: (<div className="space-y-4"><PageTitle>主要方法</PageTitle><BookParagraph>问答系统的方法主要包括基于规则的方法、检索式问答、生成式问答和混合式问答等。目前主流的问答系统主要基于深度学习和预训练语言模型。</BookParagraph><SectionTitle>主要方法</SectionTitle><BookList items={['基于规则的方法','检索式问答','生成式问答','混合式问答','预训练语言模型']} /></div>), right: (<div className="space-y-4"><SectionTitle>问答系统实现</SectionTitle><BookCode language="python" code={qaSystemCode} /></div>) },
  { label: '评估指标', left: (<div className="space-y-4"><PageTitle>评估指标</PageTitle><BookParagraph>问答系统的评估主要关注答案的准确性和相关性。常用的评估指标包括精确匹配、F1分数、ROUGE分数等。</BookParagraph><SectionTitle>评估指标</SectionTitle><BookList items={['精确匹配(Exact Match)','F1分数','ROUGE分数','BLEU分数','人工评估']} /></div>), right: (<div className="space-y-4"><SectionTitle>评估指标实现</SectionTitle><BookCode language="python" code={qaEvalCode} /></div>) },
  { label: '实战案例', left: (<div className="space-y-4"><PageTitle>实战案例</PageTitle><BookParagraph>本节将介绍问答系统在实际应用中的案例，包括智能客服系统和教育辅导系统等。</BookParagraph><SectionTitle>智能客服系统</SectionTitle><BookCode language="python" code={customerCode} /></div>), right: (<div className="space-y-4"><SectionTitle>教育辅导系统</SectionTitle><BookCode language="python" code={educationCode} /></div>) },
]

export default function NlpQaPage() { return <LessonLayout meta={META} spreads={SPREADS} /> }

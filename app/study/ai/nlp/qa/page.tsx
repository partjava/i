'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function QASystemPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedCode, setExpandedCode] = useState<string | null>(null);

  const tabs = [
    { id: 'overview', label: '概述' },
    { id: 'methods', label: '主要方法' },
    { id: 'evaluation', label: '评估指标' },
    { id: 'cases', label: '实战案例' }
  ];

  const toggleCode = (codeId: string) => {
    setExpandedCode(expandedCode === codeId ? null : codeId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">问答系统</h1>
      
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
            <h2 className="text-2xl font-semibold mb-4">问答系统概述</h2>
            <p className="mb-4">
              问答系统(Question Answering System)是自然语言处理的重要应用之一，旨在根据用户的问题自动生成准确的答案。它广泛应用于智能客服、搜索引擎、教育辅导等领域。
            </p>
            
            <div className="my-6">
              <svg className="w-full max-w-2xl mx-auto" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
                  </marker>
                </defs>
                <rect x="50" y="100" width="150" height="80" rx="5" fill="#e3f2fd" stroke="#2196f3" />
                <text x="125" y="145" textAnchor="middle" fill="#1565c0">用户问题</text>
                
                <line x1="200" y1="140" x2="300" y2="140" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)" />
                
                <rect x="300" y="100" width="150" height="80" rx="5" fill="#e8f5e9" stroke="#4caf50" />
                <text x="375" y="145" textAnchor="middle" fill="#2e7d32">问答系统</text>
                
                <line x1="450" y1="140" x2="550" y2="140" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)" />
                
                <rect x="550" y="100" width="150" height="80" rx="5" fill="#fff3e0" stroke="#ff9800" />
                <text x="625" y="145" textAnchor="middle" fill="#e65100">答案</text>
              </svg>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">主要特点</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>基于知识库的问答</li>
                  <li>开放域问答</li>
                  <li>阅读理解式问答</li>
                  <li>多轮对话问答</li>
                  <li>跨语言问答</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">应用场景</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>智能客服</li>
                  <li>搜索引擎</li>
                  <li>教育辅导</li>
                  <li>医疗咨询</li>
                  <li>法律咨询</li>
                </ul>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">问答系统流程</h3>
              <svg className="w-full max-w-3xl mx-auto" viewBox="0 0 900 400" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
                  </marker>
                </defs>
                
                {/* 输入层 */}
                <rect x="50" y="50" width="200" height="60" rx="5" fill="#e3f2fd" stroke="#2196f3" />
                <text x="150" y="85" textAnchor="middle" fill="#1565c0">问题输入</text>
                
                {/* 问题理解 */}
                <rect x="50" y="150" width="200" height="60" rx="5" fill="#e8f5e9" stroke="#4caf50" />
                <text x="150" y="185" textAnchor="middle" fill="#2e7d32">问题理解</text>
                
                {/* 知识检索 */}
                <rect x="350" y="150" width="200" height="60" rx="5" fill="#fff3e0" stroke="#ff9800" />
                <text x="450" y="185" textAnchor="middle" fill="#e65100">知识检索</text>
                
                {/* 答案生成 */}
                <rect x="650" y="150" width="200" height="60" rx="5" fill="#f3e5f5" stroke="#9c27b0" />
                <text x="750" y="185" textAnchor="middle" fill="#6a1b9a">答案生成</text>
                
                {/* 输出层 */}
                <rect x="650" y="250" width="200" height="60" rx="5" fill="#e8f5e9" stroke="#4caf50" />
                <text x="750" y="285" textAnchor="middle" fill="#2e7d32">答案输出</text>
                
                {/* 连接线 */}
                <line x1="250" y1="80" x2="250" y2="150" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <line x1="250" y1="210" x2="350" y2="180" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <line x1="550" y1="180" x2="650" y2="180" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <line x1="750" y1="210" x2="750" y2="250" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)" />
              </svg>
            </div>
          </div>
        )}

        {activeTab === 'methods' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">主要方法</h2>
            <p className="mb-4">
              问答系统的方法主要包括基于规则的方法、检索式问答、生成式问答和混合式问答等。目前主流的问答系统主要基于深度学习和预训练语言模型。
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">主要方法</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>基于规则的方法</li>
                  <li>检索式问答</li>
                  <li>生成式问答</li>
                  <li>混合式问答</li>
                  <li>预训练语言模型</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Python代码示例</h3>
                <div className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleCode('qa-system')}
                    className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-left font-medium flex justify-between items-center"
                  >
                    <span>问答系统实现</span>
                    <span>{expandedCode === 'qa-system' ? '▼' : '▶'}</span>
                  </button>
                  {expandedCode === 'qa-system' && (
                    <pre className="bg-gray-100 p-4 overflow-x-auto">
                      <code>{`import torch
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
        # 问题预处理
        return question.strip()
    
    def preprocess_context(self, context: str) -> str:
        # 上下文预处理
        return context.strip()
    
    def find_answer(self, question: str, context: str) -> Tuple[str, float]:
        # 预处理
        question = self.preprocess_question(question)
        context = self.preprocess_context(context)
        
        # 编码输入
        inputs = self.tokenizer(
            question,
            context,
            return_tensors='pt',
            padding=True,
            truncation=True,
            max_length=512
        )
        inputs = {k: v.to(self.device) for k, v in inputs.items()}
        
        # 获取答案
        with torch.no_grad():
            outputs = self.model(**inputs)
            start_scores = outputs.start_logits
            end_scores = outputs.end_logits
            
            # 获取最可能的开始和结束位置
            start_idx = torch.argmax(start_scores)
            end_idx = torch.argmax(end_scores)
            
            # 计算答案的置信度
            confidence = torch.softmax(start_scores, dim=1)[0][start_idx].item() * \
                        torch.softmax(end_scores, dim=1)[0][end_idx].item()
            
            # 获取答案文本
            answer_tokens = inputs['input_ids'][0][start_idx:end_idx+1]
            answer = self.tokenizer.decode(answer_tokens)
        
        return answer, confidence
    
    def batch_find_answers(self, questions: List[str], contexts: List[str]) -> List[Tuple[str, float]]:
        # 批量获取答案
        results = []
        for question, context in zip(questions, contexts):
            answer, confidence = self.find_answer(question, context)
            results.append((answer, confidence))
        return results

# 使用示例
qa_system = QASystem()

# 单条问答
question = "什么是人工智能？"
context = "人工智能是计算机科学的一个分支，它致力于研究和开发能够模拟、延伸和扩展人类智能的理论、方法、技术及应用系统。"
answer, confidence = qa_system.find_answer(question, context)
print(f"问题: {question}")
print(f"答案: {answer}")
print(f"置信度: {confidence:.4f}")

# 批量问答
questions = [
    "什么是机器学习？",
    "深度学习是什么？",
    "自然语言处理是什么？"
]

contexts = [
    "机器学习是人工智能的一个分支，它使用统计方法让计算机系统能够从数据中学习。",
    "深度学习是机器学习的一个分支，它使用多层神经网络来学习数据的层次化表示。",
    "自然语言处理是人工智能的一个分支，它致力于让计算机理解和处理人类语言。"
]

results = qa_system.batch_find_answers(questions, contexts)
for question, (answer, confidence) in zip(questions, results):
    print(f"\\n问题: {question}")
    print(f"答案: {answer}")
    print(f"置信度: {confidence:.4f}")`}</code>
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
              问答系统的评估主要关注答案的准确性和相关性。常用的评估指标包括精确匹配、F1分数、ROUGE分数等。
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">评估指标</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>精确匹配(Exact Match)</li>
                  <li>F1分数</li>
                  <li>ROUGE分数</li>
                  <li>BLEU分数</li>
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
                      <code>{`import numpy as np
from typing import List, Tuple
from nltk.translate.bleu_score import sentence_bleu
from rouge import Rouge

def exact_match(prediction: str, ground_truth: str) -> float:
    """
    计算精确匹配分数
    """
    return float(prediction.strip() == ground_truth.strip())

def f1_score(prediction: str, ground_truth: str) -> float:
    """
    计算F1分数
    """
    pred_tokens = prediction.split()
    truth_tokens = ground_truth.split()
    
    # 计算共同词数
    common = set(pred_tokens) & set(truth_tokens)
    
    if len(pred_tokens) == 0 or len(truth_tokens) == 0:
        return 0.0
    
    # 计算精确率和召回率
    precision = len(common) / len(pred_tokens)
    recall = len(common) / len(truth_tokens)
    
    # 计算F1分数
    if precision + recall == 0:
        return 0.0
    return 2 * precision * recall / (precision + recall)

def rouge_score(prediction: str, ground_truth: str) -> float:
    """
    计算ROUGE分数
    """
    rouge = Rouge()
    scores = rouge.get_scores(prediction, ground_truth)
    return scores[0]['rouge-l']['f']

def bleu_score(prediction: str, ground_truth: str) -> float:
    """
    计算BLEU分数
    """
    reference = [ground_truth.split()]
    candidate = prediction.split()
    return sentence_bleu(reference, candidate)

def evaluate_qa_system(
    predictions: List[str],
    ground_truths: List[str]
) -> Dict[str, float]:
    """
    评估问答系统
    """
    metrics = {
        'exact_match': [],
        'f1': [],
        'rouge': [],
        'bleu': []
    }
    
    for pred, truth in zip(predictions, ground_truths):
        metrics['exact_match'].append(exact_match(pred, truth))
        metrics['f1'].append(f1_score(pred, truth))
        metrics['rouge'].append(rouge_score(pred, truth))
        metrics['bleu'].append(bleu_score(pred, truth))
    
    # 计算平均分数
    return {
        metric: np.mean(scores)
        for metric, scores in metrics.items()
    }

# 使用示例
# 假设我们有以下预测和真实答案
predictions = [
    "人工智能是计算机科学的一个分支",
    "机器学习是人工智能的一个分支",
    "深度学习是机器学习的一个分支"
]

ground_truths = [
    "人工智能是计算机科学的一个分支，致力于研究和开发能够模拟人类智能的系统",
    "机器学习是人工智能的一个分支，使用统计方法让计算机从数据中学习",
    "深度学习是机器学习的一个分支，使用多层神经网络学习数据的层次化表示"
]

# 评估系统
metrics = evaluate_qa_system(predictions, ground_truths)

# 输出评估结果
print("评估结果：")
print(f"精确匹配: {metrics['exact_match']:.4f}")
print(f"F1分数: {metrics['f1']:.4f}")
print(f"ROUGE分数: {metrics['rouge']:.4f}")
print(f"BLEU分数: {metrics['bleu']:.4f}")`}</code>
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
              本节将介绍问答系统在实际应用中的案例，包括智能客服系统和教育辅导系统等。
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">智能客服系统</h3>
                <div className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleCode('customer-service')}
                    className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-left font-medium flex justify-between items-center"
                  >
                    <span>智能客服系统实现</span>
                    <span>{expandedCode === 'customer-service' ? '▼' : '▶'}</span>
                  </button>
                  {expandedCode === 'customer-service' && (
                    <pre className="bg-gray-100 p-4 overflow-x-auto">
                      <code>{`import pandas as pd
import numpy as np
from typing import List, Dict, Tuple
from datetime import datetime

class CustomerServiceQA:
    def __init__(self, qa_system):
        self.qa_system = qa_system
        self.knowledge_base = {}
        self.conversation_history = []
        
    def add_knowledge(self, question: str, answer: str):
        """
        添加知识到知识库
        """
        self.knowledge_base[question] = answer
    
    def find_best_match(self, question: str) -> Tuple[str, float]:
        """
        在知识库中查找最匹配的问题
        """
        best_match = None
        best_score = 0.0
        
        for kb_question in self.knowledge_base.keys():
            # 使用问答系统计算相似度
            _, score = self.qa_system.find_answer(question, kb_question)
            if score > best_score:
                best_score = score
                best_match = kb_question
        
        return best_match, best_score
    
    def answer_question(self, question: str) -> str:
        """
        回答用户问题
        """
        # 记录对话历史
        self.conversation_history.append({
            'timestamp': datetime.now(),
            'question': question
        })
        
        # 查找最匹配的问题
        best_match, score = self.find_best_match(question)
        
        if score > 0.7:  # 设置相似度阈值
            answer = self.knowledge_base[best_match]
        else:
            answer = "抱歉，我暂时无法回答这个问题。请稍后联系人工客服。"
        
        # 记录回答
        self.conversation_history[-1]['answer'] = answer
        self.conversation_history[-1]['confidence'] = score
        
        return answer
    
    def get_conversation_history(self) -> List[Dict]:
        """
        获取对话历史
        """
        return self.conversation_history
    
    def generate_report(self) -> str:
        """
        生成服务报告
        """
        total_questions = len(self.conversation_history)
        answered_questions = sum(1 for q in self.conversation_history if q['confidence'] > 0.7)
        
        report = f"""
智能客服系统报告
==============
总问题数: {total_questions}
已回答问题数: {answered_questions}
回答率: {answered_questions/total_questions:.2%}

最近对话:
"""
        for q in self.conversation_history[-5:]:  # 显示最近5条对话
            report += f"\\n时间: {q['timestamp']}"
            report += f"\\n问题: {q['question']}"
            report += f"\\n回答: {q['answer']}"
            report += f"\\n置信度: {q['confidence']:.4f}\\n"
        
        return report

# 使用示例
# 初始化问答系统
qa_system = QASystem()
customer_service = CustomerServiceQA(qa_system)

# 添加知识库
customer_service.add_knowledge(
    "如何退货？",
    "您可以在收到商品后7天内申请退货，请登录您的账户，在订单详情页面点击'申请退货'按钮。"
)

customer_service.add_knowledge(
    "运费是多少？",
    "普通商品满99元免运费，不满99元收取10元运费。特殊商品可能收取额外运费，具体以商品页面显示为准。"
)

customer_service.add_knowledge(
    "如何修改收货地址？",
    "在订单发货前，您可以登录账户，在订单详情页面点击'修改地址'按钮进行修改。"
)

# 模拟用户咨询
questions = [
    "我想退货，应该怎么操作？",
    "买的东西不满99元，要付多少运费？",
    "我的收货地址写错了，能改吗？",
    "你们支持货到付款吗？"
]

# 回答用户问题
for question in questions:
    answer = customer_service.answer_question(question)
    print(f"\\n问题: {question}")
    print(f"回答: {answer}")

# 生成服务报告
report = customer_service.generate_report()
print("\\n" + report)`}</code>
                    </pre>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">教育辅导系统</h3>
                <div className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleCode('education-qa')}
                    className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-left font-medium flex justify-between items-center"
                  >
                    <span>教育辅导系统实现</span>
                    <span>{expandedCode === 'education-qa' ? '▼' : '▶'}</span>
                  </button>
                  {expandedCode === 'education-qa' && (
                    <pre className="bg-gray-100 p-4 overflow-x-auto">
                      <code>{`import pandas as pd
import numpy as np
from typing import List, Dict, Tuple
from datetime import datetime

class EducationQA:
    def __init__(self, qa_system):
        self.qa_system = qa_system
        self.knowledge_base = {}
        self.student_records = {}
        
    def add_knowledge(self, subject: str, question: str, answer: str):
        """
        添加学科知识
        """
        if subject not in self.knowledge_base:
            self.knowledge_base[subject] = {}
        self.knowledge_base[subject][question] = answer
    
    def find_best_match(self, subject: str, question: str) -> Tuple[str, float]:
        """
        在学科知识库中查找最匹配的问题
        """
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
        """
        回答学生问题
        """
        # 记录学生提问
        if student_id not in self.student_records:
            self.student_records[student_id] = []
        
        self.student_records[student_id].append({
            'timestamp': datetime.now(),
            'subject': subject,
            'question': question
        })
        
        # 查找最匹配的问题
        best_match, score = self.find_best_match(subject, question)
        
        if score > 0.7:  # 设置相似度阈值
            answer = self.knowledge_base[subject][best_match]
        else:
            answer = "抱歉，我暂时无法回答这个问题。请稍后咨询老师。"
        
        # 记录回答
        self.student_records[student_id][-1]['answer'] = answer
        self.student_records[student_id][-1]['confidence'] = score
        
        return answer
    
    def get_student_record(self, student_id: str) -> List[Dict]:
        """
        获取学生提问记录
        """
        return self.student_records.get(student_id, [])
    
    def generate_report(self, student_id: str) -> str:
        """
        生成学习报告
        """
        if student_id not in self.student_records:
            return "未找到该学生的记录。"
        
        records = self.student_records[student_id]
        total_questions = len(records)
        answered_questions = sum(1 for r in records if r['confidence'] > 0.7)
        
        # 统计各学科问题数量
        subject_counts = {}
        for record in records:
            subject = record['subject']
            subject_counts[subject] = subject_counts.get(subject, 0) + 1
        
        report = f"""
学习报告
==============
学生ID: {student_id}
总问题数: {total_questions}
已回答问题数: {answered_questions}
回答率: {answered_questions/total_questions:.2%}

各学科问题分布:
"""
        for subject, count in subject_counts.items():
            report += f"\\n{subject}: {count}个问题"
        
        report += "\\n\\n最近问题记录:"
        for record in records[-5:]:  # 显示最近5条记录
            report += f"\\n\\n时间: {record['timestamp']}"
            report += f"\\n学科: {record['subject']}"
            report += f"\\n问题: {record['question']}"
            report += f"\\n回答: {record['answer']}"
            report += f"\\n置信度: {record['confidence']:.4f}"
        
        return report

# 使用示例
# 初始化问答系统
qa_system = QASystem()
education_qa = EducationQA(qa_system)

# 添加数学知识
education_qa.add_knowledge(
    "数学",
    "什么是二次函数？",
    "二次函数是形如f(x)=ax²+bx+c（a≠0）的函数，其图像为抛物线。"
)

education_qa.add_knowledge(
    "数学",
    "如何求二次函数的顶点？",
    "二次函数f(x)=ax²+bx+c的顶点坐标为(-b/2a, f(-b/2a))。"
)

# 添加物理知识
education_qa.add_knowledge(
    "物理",
    "什么是牛顿第一定律？",
    "牛顿第一定律，也称为惯性定律，指出：一个物体如果不受外力作用，将保持静止状态或匀速直线运动状态。"
)

education_qa.add_knowledge(
    "物理",
    "如何计算物体的加速度？",
    "物体的加速度等于物体所受的合外力除以物体的质量，即a=F/m。"
)

# 模拟学生提问
student_id = "2024001"
questions = [
    ("数学", "二次函数是什么？"),
    ("数学", "怎么求二次函数的顶点坐标？"),
    ("物理", "什么是牛顿第一定律？"),
    ("物理", "加速度怎么算？"),
    ("化学", "什么是氧化还原反应？")
]

# 回答学生问题
for subject, question in questions:
    answer = education_qa.answer_question(student_id, subject, question)
    print(f"\\n学科: {subject}")
    print(f"问题: {question}")
    print(f"回答: {answer}")

# 生成学习报告
report = education_qa.generate_report(student_id)
print("\\n" + report)`}</code>
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
          href="/study/ai/nlp/sentiment-analysis"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回情感分析
        </Link>
        <Link 
          href="/study/ai/nlp/dialogue"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          对话系统 →
        </Link>
      </div>
    </div>
  );
} 
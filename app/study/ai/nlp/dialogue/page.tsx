'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DialogueSystemPage() {
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
      <h1 className="text-3xl font-bold mb-6">对话系统</h1>
      
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
            <h2 className="text-2xl font-semibold mb-4">对话系统概述</h2>
            <p className="mb-4">
              对话系统(Dialogue System)是自然语言处理的重要应用之一，旨在实现人机之间的自然对话交互。它广泛应用于智能助手、客服机器人、智能家居等领域。
            </p>
            
            <div className="my-6">
              <svg className="w-full max-w-2xl mx-auto" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
                  </marker>
                </defs>
                <rect x="50" y="100" width="150" height="80" rx="5" fill="#e3f2fd" stroke="#2196f3" />
                <text x="125" y="145" textAnchor="middle" fill="#1565c0">用户输入</text>
                
                <line x1="200" y1="140" x2="300" y2="140" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)" />
                
                <rect x="300" y="100" width="150" height="80" rx="5" fill="#e8f5e9" stroke="#4caf50" />
                <text x="375" y="145" textAnchor="middle" fill="#2e7d32">对话系统</text>
                
                <line x1="450" y1="140" x2="550" y2="140" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)" />
                
                <rect x="550" y="100" width="150" height="80" rx="5" fill="#fff3e0" stroke="#ff9800" />
                <text x="625" y="145" textAnchor="middle" fill="#e65100">系统响应</text>
              </svg>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">主要特点</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>多轮对话能力</li>
                  <li>上下文理解</li>
                  <li>意图识别</li>
                  <li>情感理解</li>
                  <li>个性化响应</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">应用场景</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>智能助手</li>
                  <li>客服机器人</li>
                  <li>智能家居</li>
                  <li>教育辅导</li>
                  <li>医疗咨询</li>
                </ul>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">对话系统流程</h3>
              <svg className="w-full max-w-3xl mx-auto" viewBox="0 0 900 400" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
                  </marker>
                </defs>
                
                {/* 输入层 */}
                <rect x="50" y="50" width="200" height="60" rx="5" fill="#e3f2fd" stroke="#2196f3" />
                <text x="150" y="85" textAnchor="middle" fill="#1565c0">用户输入</text>
                
                {/* 自然语言理解 */}
                <rect x="50" y="150" width="200" height="60" rx="5" fill="#e8f5e9" stroke="#4caf50" />
                <text x="150" y="185" textAnchor="middle" fill="#2e7d32">自然语言理解</text>
                
                {/* 对话管理 */}
                <rect x="350" y="150" width="200" height="60" rx="5" fill="#fff3e0" stroke="#ff9800" />
                <text x="450" y="185" textAnchor="middle" fill="#e65100">对话管理</text>
                
                {/* 自然语言生成 */}
                <rect x="650" y="150" width="200" height="60" rx="5" fill="#f3e5f5" stroke="#9c27b0" />
                <text x="750" y="185" textAnchor="middle" fill="#6a1b9a">自然语言生成</text>
                
                {/* 输出层 */}
                <rect x="650" y="250" width="200" height="60" rx="5" fill="#e8f5e9" stroke="#4caf50" />
                <text x="750" y="285" textAnchor="middle" fill="#2e7d32">系统响应</text>
                
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
              对话系统的方法主要包括基于规则的方法、检索式对话、生成式对话和混合式对话等。目前主流的对话系统主要基于深度学习和预训练语言模型。
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">主要方法</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>基于规则的方法</li>
                  <li>检索式对话</li>
                  <li>生成式对话</li>
                  <li>混合式对话</li>
                  <li>预训练语言模型</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Python代码示例</h3>
                <div className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleCode('dialogue-system')}
                    className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-left font-medium flex justify-between items-center"
                  >
                    <span>对话系统实现</span>
                    <span>{expandedCode === 'dialogue-system' ? '▼' : '▶'}</span>
                  </button>
                  {expandedCode === 'dialogue-system' && (
                    <pre className="bg-gray-100 p-4 overflow-x-auto">
                      <code>{`import torch
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
        # 输入预处理
        return text.strip()
    
    def update_history(self, user_input: str, system_response: str):
        # 更新对话历史
        self.conversation_history.append({
            'user': user_input,
            'system': system_response
        })
    
    def get_context(self, max_turns: int = 3) -> str:
        # 获取最近的对话上下文
        recent_history = self.conversation_history[-max_turns:]
        context = ""
        for turn in recent_history:
            context += f"用户: {turn['user']}\\n系统: {turn['system']}\\n"
        return context
    
    def generate_response(self, user_input: str) -> str:
        # 预处理输入
        user_input = self.preprocess_input(user_input)
        
        # 获取对话上下文
        context = self.get_context()
        
        # 编码输入
        inputs = self.tokenizer(
            context + user_input,
            return_tensors='pt',
            padding=True,
            truncation=True,
            max_length=512
        )
        inputs = {k: v.to(self.device) for k, v in inputs.items()}
        
        # 生成响应
        with torch.no_grad():
            outputs = self.model(**inputs)
            logits = outputs.logits
            response_id = torch.argmax(logits, dim=1).item()
            
            # 这里应该有一个响应模板库
            response = self.get_response_template(response_id)
        
        # 更新对话历史
        self.update_history(user_input, response)
        
        return response
    
    def get_response_template(self, response_id: int) -> str:
        # 响应模板库
        templates = {
            0: "我明白了，请继续。",
            1: "这个问题很有趣，让我想想。",
            2: "抱歉，我需要更多信息。",
            3: "我理解您的意思了。",
            4: "让我为您解释一下。"
        }
        return templates.get(response_id, "抱歉，我现在无法回答这个问题。")
    
    def clear_history(self):
        # 清空对话历史
        self.conversation_history = []

# 使用示例
dialogue_system = DialogueSystem()

# 模拟对话
conversation = [
    "你好，请问你是谁？",
    "你能帮我做什么？",
    "我想了解一下人工智能。",
    "谢谢你的解释。"
]

for user_input in conversation:
    response = dialogue_system.generate_response(user_input)
    print(f"用户: {user_input}")
    print(f"系统: {response}\\n")

# 获取对话历史
print("对话历史:")
for turn in dialogue_system.conversation_history:
    print(f"用户: {turn['user']}")
    print(f"系统: {turn['system']}\\n")`}</code>
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
              对话系统的评估主要关注对话的流畅性、相关性和任务完成度。常用的评估指标包括BLEU、ROUGE、对话成功率等。
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">评估指标</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>BLEU分数</li>
                  <li>ROUGE分数</li>
                  <li>对话成功率</li>
                  <li>用户满意度</li>
                  <li>任务完成度</li>
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
from typing import List, Dict, Tuple
from nltk.translate.bleu_score import sentence_bleu
from rouge import Rouge

def bleu_score(prediction: str, reference: str) -> float:
    """
    计算BLEU分数
    """
    reference = [reference.split()]
    candidate = prediction.split()
    return sentence_bleu(reference, candidate)

def rouge_score(prediction: str, reference: str) -> float:
    """
    计算ROUGE分数
    """
    rouge = Rouge()
    scores = rouge.get_scores(prediction, reference)
    return scores[0]['rouge-l']['f']

def dialogue_success_rate(
    predictions: List[str],
    references: List[str],
    task_completion: List[bool]
) -> float:
    """
    计算对话成功率
    """
    total = len(predictions)
    if total == 0:
        return 0.0
    
    successful = sum(1 for p, r, t in zip(predictions, references, task_completion)
                    if bleu_score(p, r) > 0.5 and t)
    return successful / total

def user_satisfaction(
    predictions: List[str],
    references: List[str],
    ratings: List[int]
) -> float:
    """
    计算用户满意度
    """
    total = len(predictions)
    if total == 0:
        return 0.0
    
    # 计算响应质量分数
    quality_scores = [bleu_score(p, r) for p, r in zip(predictions, references)]
    
    # 结合用户评分
    satisfaction = sum(q * r for q, r in zip(quality_scores, ratings)) / total
    return satisfaction

def task_completion_rate(tasks: List[Dict]) -> float:
    """
    计算任务完成度
    """
    total = len(tasks)
    if total == 0:
        return 0.0
    
    completed = sum(1 for task in tasks if task['completed'])
    return completed / total

def evaluate_dialogue_system(
    predictions: List[str],
    references: List[str],
    task_completion: List[bool],
    user_ratings: List[int],
    tasks: List[Dict]
) -> Dict[str, float]:
    """
    评估对话系统
    """
    metrics = {
        'bleu': np.mean([bleu_score(p, r) for p, r in zip(predictions, references)]),
        'rouge': np.mean([rouge_score(p, r) for p, r in zip(predictions, references)]),
        'success_rate': dialogue_success_rate(predictions, references, task_completion),
        'satisfaction': user_satisfaction(predictions, references, user_ratings),
        'task_completion': task_completion_rate(tasks)
    }
    
    return metrics

# 使用示例
# 假设我们有以下预测和参考响应
predictions = [
    "我明白了，让我为您解释一下。",
    "这个问题很有趣，让我想想。",
    "抱歉，我需要更多信息。"
]

references = [
    "我理解您的意思，让我为您详细说明。",
    "这是个很好的问题，让我为您解答。",
    "为了给您更好的回答，请提供更多细节。"
]

# 任务完成情况
task_completion = [True, True, False]

# 用户评分（1-5分）
user_ratings = [4, 5, 3]

# 任务列表
tasks = [
    {'id': 1, 'completed': True},
    {'id': 2, 'completed': True},
    {'id': 3, 'completed': False}
]

# 评估系统
metrics = evaluate_dialogue_system(
    predictions,
    references,
    task_completion,
    user_ratings,
    tasks
)

# 输出评估结果
print("评估结果：")
print(f"BLEU分数: {metrics['bleu']:.4f}")
print(f"ROUGE分数: {metrics['rouge']:.4f}")
print(f"对话成功率: {metrics['success_rate']:.4f}")
print(f"用户满意度: {metrics['satisfaction']:.4f}")
print(f"任务完成度: {metrics['task_completion']:.4f}")`}</code>
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
              本节将介绍对话系统在实际应用中的案例，包括智能助手和客服机器人等。
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">智能助手</h3>
                <div className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleCode('smart-assistant')}
                    className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-left font-medium flex justify-between items-center"
                  >
                    <span>智能助手实现</span>
                    <span>{expandedCode === 'smart-assistant' ? '▼' : '▶'}</span>
                  </button>
                  {expandedCode === 'smart-assistant' && (
                    <pre className="bg-gray-100 p-4 overflow-x-auto">
                      <code>{`import pandas as pd
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
        """
        设置用户偏好
        """
        self.user_preferences[user_id] = preferences
    
    def add_reminder(self, user_id: str, reminder: Dict):
        """
        添加提醒
        """
        self.reminders.append({
            'user_id': user_id,
            'time': reminder['time'],
            'content': reminder['content'],
            'completed': False
        })
    
    def add_task(self, user_id: str, task: Dict):
        """
        添加任务
        """
        self.tasks.append({
            'user_id': user_id,
            'title': task['title'],
            'description': task['description'],
            'due_date': task['due_date'],
            'completed': False
        })
    
    def process_command(self, user_id: str, command: str) -> str:
        """
        处理用户命令
        """
        # 获取用户偏好
        preferences = self.user_preferences.get(user_id, {})
        
        # 处理命令
        if "设置提醒" in command:
            # 解析提醒信息
            time = command.split("在")[1].split("提醒")[0]
            content = command.split("提醒")[1]
            self.add_reminder(user_id, {
                'time': time,
                'content': content
            })
            return f"好的，我会在{time}提醒您{content}"
        
        elif "添加任务" in command:
            # 解析任务信息
            title = command.split("添加任务")[1].split("，")[0]
            description = command.split("，")[1] if "，" in command else ""
            due_date = command.split("截止日期")[1] if "截止日期" in command else None
            
            self.add_task(user_id, {
                'title': title,
                'description': description,
                'due_date': due_date
            })
            return f"已添加任务：{title}"
        
        elif "查看任务" in command:
            # 获取用户的任务列表
            user_tasks = [t for t in self.tasks if t['user_id'] == user_id]
            if not user_tasks:
                return "您当前没有待办任务。"
            
            response = "您的任务列表：\\n"
            for task in user_tasks:
                response += f"- {task['title']}"
                if task['description']:
                    response += f": {task['description']}"
                if task['due_date']:
                    response += f" (截止日期: {task['due_date']})"
                response += "\\n"
            return response
        
        elif "查看提醒" in command:
            # 获取用户的提醒列表
            user_reminders = [r for r in self.reminders if r['user_id'] == user_id]
            if not user_reminders:
                return "您当前没有设置提醒。"
            
            response = "您的提醒列表：\\n"
            for reminder in user_reminders:
                response += f"- {reminder['time']}: {reminder['content']}\\n"
            return response
        
        else:
            # 使用对话系统生成响应
            return self.dialogue_system.generate_response(command)
    
    def get_user_summary(self, user_id: str) -> str:
        """
        获取用户摘要
        """
        # 获取用户的任务和提醒
        user_tasks = [t for t in self.tasks if t['user_id'] == user_id]
        user_reminders = [r for r in self.reminders if r['user_id'] == user_id]
        
        summary = f"用户 {user_id} 的摘要：\\n"
        
        # 添加任务信息
        summary += "\\n待办任务：\\n"
        for task in user_tasks:
            if not task['completed']:
                summary += f"- {task['title']}"
                if task['due_date']:
                    summary += f" (截止日期: {task['due_date']})"
                summary += "\\n"
        
        # 添加提醒信息
        summary += "\\n提醒事项：\\n"
        for reminder in user_reminders:
            if not reminder['completed']:
                summary += f"- {reminder['time']}: {reminder['content']}\\n"
        
        return summary

# 使用示例
# 初始化对话系统
dialogue_system = DialogueSystem()
assistant = SmartAssistant(dialogue_system)

# 设置用户偏好
assistant.set_user_preference("user1", {
    'language': 'zh',
    'notification': True,
    'theme': 'dark'
})

# 模拟用户命令
commands = [
    "设置提醒在明天早上9点提醒我开会",
    "添加任务完成报告，截止日期明天",
    "查看任务",
    "查看提醒",
    "今天天气怎么样？"
]

# 处理命令
for command in commands:
    response = assistant.process_command("user1", command)
    print(f"用户: {command}")
    print(f"助手: {response}\\n")

# 获取用户摘要
summary = assistant.get_user_summary("user1")
print(summary)`}</code>
                    </pre>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">客服机器人</h3>
                <div className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleCode('customer-service-bot')}
                    className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-left font-medium flex justify-between items-center"
                  >
                    <span>客服机器人实现</span>
                    <span>{expandedCode === 'customer-service-bot' ? '▼' : '▶'}</span>
                  </button>
                  {expandedCode === 'customer-service-bot' && (
                    <pre className="bg-gray-100 p-4 overflow-x-auto">
                      <code>{`import pandas as pd
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
        """
        添加知识到知识库
        """
        if category not in self.knowledge_base:
            self.knowledge_base[category] = {}
        self.knowledge_base[category][question] = answer
    
    def add_faq(self, question: str, answer: str):
        """
        添加常见问题
        """
        self.faq[question] = answer
    
    def find_best_match(self, question: str) -> Tuple[str, float]:
        """
        在知识库中查找最匹配的问题
        """
        best_match = None
        best_score = 0.0
        
        # 在FAQ中查找
        for faq_question in self.faq.keys():
            _, score = self.dialogue_system.find_answer(question, faq_question)
            if score > best_score:
                best_score = score
                best_match = faq_question
        
        # 在知识库中查找
        for category in self.knowledge_base.values():
            for kb_question in category.keys():
                _, score = self.dialogue_system.find_answer(question, kb_question)
                if score > best_score:
                    best_score = score
                    best_match = kb_question
        
        return best_match, best_score
    
    def process_query(self, user_id: str, query: str) -> str:
        """
        处理用户查询
        """
        # 记录对话历史
        if user_id not in self.conversation_history:
            self.conversation_history[user_id] = []
        
        self.conversation_history[user_id].append({
            'timestamp': datetime.now(),
            'query': query
        })
        
        # 查找最匹配的问题
        best_match, score = self.find_best_match(query)
        
        if score > 0.7:  # 设置相似度阈值
            # 在FAQ中查找
            if best_match in self.faq:
                answer = self.faq[best_match]
            else:
                # 在知识库中查找
                for category in self.knowledge_base.values():
                    if best_match in category:
                        answer = category[best_match]
                        break
        else:
            answer = "抱歉，我暂时无法回答这个问题。请稍后联系人工客服。"
        
        # 记录回答
        self.conversation_history[user_id][-1]['answer'] = answer
        self.conversation_history[user_id][-1]['confidence'] = score
        
        return answer
    
    def get_conversation_history(self, user_id: str) -> List[Dict]:
        """
        获取对话历史
        """
        return self.conversation_history.get(user_id, [])
    
    def generate_report(self, user_id: str) -> str:
        """
        生成服务报告
        """
        if user_id not in self.conversation_history:
            return "未找到该用户的对话记录。"
        
        history = self.conversation_history[user_id]
        total_queries = len(history)
        answered_queries = sum(1 for q in history if q['confidence'] > 0.7)
        
        report = f"""
客服机器人服务报告
==============
用户ID: {user_id}
总查询数: {total_queries}
已回答查询数: {answered_queries}
回答率: {answered_queries/total_queries:.2%}

最近对话:
"""
        for q in history[-5:]:  # 显示最近5条对话
            report += f"\\n时间: {q['timestamp']}"
            report += f"\\n问题: {q['query']}"
            report += f"\\n回答: {q['answer']}"
            report += f"\\n置信度: {q['confidence']:.4f}\\n"
        
        return report

# 使用示例
# 初始化对话系统
dialogue_system = DialogueSystem()
bot = CustomerServiceBot(dialogue_system)

# 添加FAQ
bot.add_faq(
    "如何退货？",
    "您可以在收到商品后7天内申请退货，请登录您的账户，在订单详情页面点击'申请退货'按钮。"
)

bot.add_faq(
    "运费是多少？",
    "普通商品满99元免运费，不满99元收取10元运费。特殊商品可能收取额外运费，具体以商品页面显示为准。"
)

# 添加知识库
bot.add_knowledge(
    "支付",
    "支持哪些支付方式？",
    "我们支持支付宝、微信支付、银行卡等多种支付方式。"
)

bot.add_knowledge(
    "配送",
    "多久能收到商品？",
    "一般情况下，订单确认后24小时内发货，快递送达时间约为3-5天。"
)

# 模拟用户咨询
user_id = "customer1"
queries = [
    "我想退货，应该怎么操作？",
    "买的东西不满99元，要付多少运费？",
    "你们支持哪些支付方式？",
    "多久能收到商品？",
    "你们有实体店吗？"
]

# 处理用户查询
for query in queries:
    answer = bot.process_query(user_id, query)
    print(f"用户: {query}")
    print(f"机器人: {answer}\\n")

# 生成服务报告
report = bot.generate_report(user_id)
print(report)`}</code>
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
          href="/study/ai/nlp/qa"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          ← 返回问答系统
        </Link>
        <Link 
          href="/study/ai/nlp/frameworks"
          className="px-4 py-2 text-blue-600 hover:text-blue-800"
        >
          NLP框架与工具 →
        </Link>
      </div>
    </div>
  );
} 
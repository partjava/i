import openai
import time
import uuid
import requests
import json
import warnings
import re
from urllib3.exceptions import InsecureRequestWarning
from typing import List, Optional, Dict, Any, Tuple
from datetime import datetime

# 抑制不安全请求的警告
warnings.simplefilter('ignore', InsecureRequestWarning)

from config import settings
from models import ConversationMessage, Conversation, ContentType, ContentBlock, MessageRole, CodeBlock
from db.database import Database

class AIService:
    """AI服务类，支持多个AI提供商"""
    
    def __init__(self):
        """初始化AI服务"""
        self.ai_provider = settings.AI_PROVIDER
        
        # 初始化 OpenAI 客户端（如果使用）
        if self.ai_provider == "openai" and settings.OPENAI_API_KEY:
            self.openai_client = openai.OpenAI(
                api_key=settings.OPENAI_API_KEY,
                base_url=settings.OPENAI_BASE_URL
            )
        
        # DeepSeek 配置
        self.deepseek_api_key = settings.DEEPSEEK_API_KEY
        self.deepseek_base_url = settings.DEEPSEEK_BASE_URL
        self.deepseek_model = settings.DEEPSEEK_MODEL
        
        # 通用配置
        self.max_tokens = settings.MAX_TOKENS
        self.temperature = settings.TEMPERATURE
        self.top_p = settings.TOP_P
        self.frequency_penalty = settings.FREQUENCY_PENALTY
        self.presence_penalty = settings.PRESENCE_PENALTY
        
        # 初始化数据库连接
        self.db = Database()
        
        # 内存缓存（可选，用于提高性能）
        self.cache = {}
    
    def generate_response(self, question: str, conversation_id: Optional[str] = None, 
                         user_id: Optional[str] = None, context: Optional[str] = None) -> Dict[str, Any]:
        """
        生成AI响应
        
        Args:
            question: 用户问题
            conversation_id: 对话ID
            user_id: 用户ID
            context: 上下文信息
            
        Returns:
            包含AI响应的字典
        """
        start_time = time.time()
        
        try:
            # 构建消息历史
            messages = self._build_messages(question, conversation_id, context)
            
            # 检查是否有API密钥，如果没有则使用模拟模式
            if (self.ai_provider == "deepseek" and not self.deepseek_api_key) or \
               (self.ai_provider == "openai" and not hasattr(self, 'openai_client')):
                print("API密钥未设置，使用模拟模式")
                answer, tokens_used = self._mock_api_response(question, messages)
            else:
                # 根据提供商调用不同的API
                if self.ai_provider == "deepseek":
                    answer, tokens_used = self._call_deepseek_api(messages)
                elif self.ai_provider == "openai":
                    answer, tokens_used = self._call_openai_api(messages)
                else:
                    raise Exception(f"不支持的AI提供商: {self.ai_provider}")
            
            # 处理回答内容，解析出结构化内容
            parsed_answer, content_blocks = self._parse_answer(answer)
            
            # 计算响应时间
            response_time = time.time() - start_time
            
            # 保存对话
            if conversation_id:
                self._save_conversation(conversation_id, user_id, question, parsed_answer, content_blocks)
            
            result = {
                "answer": parsed_answer,
                "conversation_id": conversation_id,
                "tokens_used": tokens_used,
                "model_used": self._get_current_model(),
                "response_time": response_time,
                "timestamp": datetime.now()
            }
            
            # 如果有结构化内容，添加到结果中
            if content_blocks:
                result["content_blocks"] = content_blocks
                result["has_code"] = any(block.type == ContentType.CODE for block in content_blocks)
                
            return result
            
        except Exception as e:
            raise Exception(f"生成响应时发生错误: {str(e)}")
            
    def _mock_api_response(self, question: str, messages: List[Dict[str, str]]) -> tuple[str, int]:
        """
        模拟API响应，用于API密钥未设置时
        
        Args:
            question: 用户问题
            messages: 消息历史
            
        Returns:
            模拟的回答和token数量
        """
        # 简单的问答逻辑
        if "python" in question.lower() and "代码" in question:
            answer = """好的，这是一个简单的Python代码示例：

```python
def hello_world():
    print("Hello, World!")
    
    # 调用函数
    return "Hello from Python!"

# 主程序
if __name__ == "__main__":
    result = hello_world()
    print(result)
```

这段代码定义了一个函数，并在主程序中调用它。你可以根据需要修改这个例子。"""
        elif "java" in question.lower() and "代码" in question:
            answer = """这是一个Java代码示例：

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        // 调用方法
        String result = sayHello();
        System.out.println(result);
    }
    
    public static String sayHello() {
        return "Hello from Java!";
    }
}
```

这是一个基本的Java类，包含main方法和一个自定义方法。"""
        else:
            answer = f"""你好！我是AI助手，很高兴为你提供帮助。

你问的是："{question}"

由于当前处于模拟模式（API密钥未设置），我只能提供有限的回答。如果你需要更全面的回答，请配置API密钥。

你可以尝试以下操作：
1. 在config.py文件中设置DEEPSEEK_API_KEY或OPENAI_API_KEY
2. 重启应用服务器
3. 再次尝试提问

如果你只是想测试功能，可以尝试问我一些简单的问题，比如"写一个Python代码"或"写一个Java代码"。"""
        
        # 模拟token数量
        tokens_used = len(answer) // 4
        
        return answer, tokens_used
    
    def _parse_answer(self, answer: str) -> Tuple[str, List[ContentBlock]]:
        """
        解析AI回答，提取结构化内容
        
        Args:
            answer: AI原始回答
            
        Returns:
            处理后的纯文本回答和结构化内容块列表
        """
        content_blocks = []
        parsed_answer = answer
        
        # 处理代码块 ```language\ncode\n```
        # 更精确的正则表达式，确保能够匹配各种格式的代码块
        code_pattern = r"```([a-zA-Z0-9_+-]*)?\s*([\s\S]*?)\s*```"
        code_matches = list(re.finditer(code_pattern, answer))
        
        # 如果有代码块，处理它们并添加到content_blocks
        if code_matches:
            # 创建内容块
            for i, match in enumerate(code_matches):
                language = match.group(1) or "text"
                code = match.group(2)
                
                # 保留代码的原始格式，不添加额外空格
                code_content = {
                    "language": language.strip(),
                    "code": code  # 保留原始格式
                }
                
                # 创建代码块内容块
                block = ContentBlock(
                    type=ContentType.CODE,
                    content=code_content
                )
                
                content_blocks.append(block)
                
                # 在纯文本中替换代码块为标记
                start, end = match.span()
                marker = f"[CODE_BLOCK_{i}]"
                parsed_answer = parsed_answer[:start] + marker + parsed_answer[end:]
            
            # 确保所有纯文本部分都被正确处理
            text_parts = []
            last_end = 0
            
            # 按照代码块标记拆分纯文本
            for i, match in enumerate(code_matches):
                start, end = match.span()
                if start > last_end:
                    # 添加代码块前的文本
                    text_part = answer[last_end:start]
                    if text_part.strip():
                        text_parts.append(self._format_text_with_paragraphs(text_part))
                
                # 添加代码块标记
                text_parts.append(f"[CODE_BLOCK_{i}]")
                last_end = end
            
            # 添加最后一部分文本
            if last_end < len(answer):
                text_part = answer[last_end:]
                if text_part.strip():
                    text_parts.append(self._format_text_with_paragraphs(text_part))
            
            # 重建带有代码块标记的解析后答案
            parsed_answer = "".join(text_parts)
        else:
            # 如果没有代码块，直接格式化整个文本
            parsed_answer = self._format_text_with_paragraphs(answer)
        
        return parsed_answer, content_blocks
    
    def _format_text_with_paragraphs(self, text: str) -> str:
        """格式化文本，确保适当的段落和换行"""
        if not text:
            return ""
            
        # 标准化换行符（将\r\n转换为\n）
        text = text.replace('\r\n', '\n')
        
        # 确保文本末尾有换行
        if not text.endswith("\n"):
            text = text + "\n"
            
        # 处理连续的换行，确保段落之间有一个空行
        text = re.sub(r'\n{3,}', '\n\n', text)
        
        # 确保句点后有空格
        text = re.sub(r'\.([A-Z])', r'. \1', text)
        
        # 确保问号和感叹号后有空格
        text = re.sub(r'([?!])([A-Z])', r'\1 \2', text)
        
        # 确保段落之间有明确的分隔
        paragraphs = text.split('\n\n')
        formatted_paragraphs = []
        
        for p in paragraphs:
            if p.strip():  # 只处理非空段落
                # 不再在换行符前添加空格，保留原始格式
                formatted_paragraphs.append(p)
        
        # 重新组合文本，确保段落之间有两个换行
        formatted_text = '\n\n'.join(formatted_paragraphs)
        
        return formatted_text
    
    def _call_deepseek_api(self, messages: List[Dict[str, str]]) -> tuple[str, int]:
        """调用 DeepSeek API"""
        if not self.deepseek_api_key:
            raise Exception("DeepSeek API Key 未设置")
        
        url = f"{self.deepseek_base_url}/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {self.deepseek_api_key}",
            "Content-Type": "application/json"
        }
        
        data = {
            "model": self.deepseek_model,
            "messages": messages,
            "max_tokens": self.max_tokens,
            "temperature": self.temperature,
            "top_p": self.top_p,
            "frequency_penalty": self.frequency_penalty,
            "presence_penalty": self.presence_penalty
        }
        
        # 禁用SSL验证
        response = requests.post(url, headers=headers, json=data, timeout=30, verify=False)
        
        if response.status_code != 200:
            error_msg = f"DeepSeek API 错误: {response.status_code}"
            try:
                error_data = response.json()
                error_msg += f" - {error_data.get('error', {}).get('message', '')}"
            except:
                pass
            raise Exception(error_msg)
        
        result = response.json()
        answer = result["choices"][0]["message"]["content"].strip()
        tokens_used = result["usage"]["total_tokens"]
        
        return answer, tokens_used
    
    def _call_openai_api(self, messages: List[Dict[str, str]]) -> tuple[str, int]:
        """调用 OpenAI API"""
        if not hasattr(self, 'openai_client'):
            raise Exception("OpenAI 客户端未初始化")
        
        try:
            # 将消息转换为OpenAI期望的格式
            formatted_messages = []
            for msg in messages:
                formatted_messages.append({
                    "role": msg["role"],
                    "content": msg["content"]
                })
            
            response = self.openai_client.chat.completions.create(
                model=settings.OPENAI_MODEL,
                messages=formatted_messages,
                max_tokens=self.max_tokens,
                temperature=self.temperature,
                top_p=self.top_p,
                frequency_penalty=self.frequency_penalty,
                presence_penalty=self.presence_penalty
            )
            
            # 添加空值检查
            content = response.choices[0].message.content
            answer = content.strip() if content is not None else ""
            tokens_used = response.usage.total_tokens if response.usage is not None else 0
            
            return answer, tokens_used
        except Exception as e:
            print(f"OpenAI API调用错误: {str(e)}")
            raise
    
    def _get_current_model(self) -> str:
        """获取当前使用的模型名称"""
        if self.ai_provider == "deepseek":
            return self.deepseek_model
        elif self.ai_provider == "openai":
            return settings.OPENAI_MODEL
        else:
            return "unknown"
    
    def _build_messages(self, question: str, conversation_id: Optional[str], 
                       context: Optional[str] = None) -> List[Dict[str, str]]:
        """构建发送给AI的消息列表"""
        messages = []
        
        # 添加系统提示
        system_prompt = """你是一个智能助手，请准确、有帮助地回答用户的问题。

格式要求：
1. 使用适当的段落分隔不同主题，每个段落之间空一行
2. 使用清晰的换行增强可读性
3. 代码块使用```language和```包裹，例如：
   ```python
   def hello_world():
       print("Hello, World!")
   ```
4. 保持代码的原始格式和缩进，不要将所有代码挤在一行
5. 列表项使用适当的缩进和换行

请确保回复格式美观，便于阅读。特别是代码块，应该保持良好的缩进和格式。"""

        if context:
            system_prompt += f"\n\n上下文信息：{context}"
        
        messages.append({"role": "system", "content": system_prompt})
        
        # 添加历史对话
        if conversation_id:
            conversation_messages = self._get_conversation_messages(conversation_id)
            if conversation_messages:
                # 只使用最近10条消息
                for msg in conversation_messages[-10:]:
                    messages.append({
                        "role": msg["role"],
                        "content": msg["content"]
                    })
        
        # 添加当前问题
        messages.append({"role": "user", "content": question})
        
        return messages
    
    def _get_conversation_messages(self, conversation_id: str) -> List[Dict[str, Any]]:
        """从数据库获取对话历史消息"""
        return self.db.get_conversation_messages(conversation_id)
    
    def _save_conversation(self, conversation_id: str, user_id: Optional[str], 
                          question: str, answer: str, content_blocks: Optional[List[ContentBlock]] = None):
        """保存对话记录到数据库"""
        # 检查对话是否存在，不存在则创建
        conversation = self.db.get_conversation(conversation_id)
        if not conversation:
            conversation_id = self.db.create_conversation(user_id)
        
        # 添加用户问题
        self.db.add_message(
            conversation_id=conversation_id,
            role=MessageRole.USER,
            content=question
        )
        
        # 添加AI回答
        content_blocks_dicts = None
        if content_blocks:
            # 将ContentBlock对象转换为字典
            content_blocks_dicts = [block.dict() for block in content_blocks]
        
        self.db.add_message(
            conversation_id=conversation_id,
            role=MessageRole.ASSISTANT,
            content=answer,
            content_blocks=content_blocks_dicts
        )
    
    def create_conversation(self, user_id: Optional[str] = None) -> str:
        """创建新的对话"""
        return self.db.create_conversation(user_id)
    
    def get_conversation(self, conversation_id: str) -> Optional[Dict[str, Any]]:
        """获取对话记录"""
        return self.db.get_conversation(conversation_id)
    
    def delete_conversation(self, conversation_id: str) -> bool:
        """删除对话记录"""
        return self.db.delete_conversation(conversation_id)
    
    def get_conversation_history(self, conversation_id: str) -> List[Dict[str, Any]]:
        """获取对话历史"""
        return self.db.get_conversation_messages(conversation_id)
    
    def get_user_conversations(self, user_id: str) -> List[Dict[str, Any]]:
        """获取用户的所有对话"""
        return self.db.get_user_conversations(user_id)
        
    def get_recent_conversations(self, limit: int = 10, skip: int = 0) -> List[Dict[str, Any]]:
        """获取最近的对话列表"""
        try:
            return self.db.get_recent_conversations(limit, skip)
        except Exception as e:
            print(f"获取最近对话错误: {str(e)}")
            # 如果出错，返回空列表
            return []
            
    def __del__(self):
        """析构函数，确保关闭数据库连接"""
        try:
            if hasattr(self, 'db'):
                self.db.close()
        except:
            pass 
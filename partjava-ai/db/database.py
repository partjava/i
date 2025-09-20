import sqlite3
import os
import sys
from typing import List, Dict, Any, Optional, Union
from datetime import datetime
import json
import uuid
import logging

# 配置日志
logging.basicConfig(level=logging.INFO, 
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger('database')

# 导入配置
try:
    from config import settings
    DB_PATH = settings.DATABASE_PATH
except ImportError:
    DB_PATH = "data/conversations.db"
    logger.warning("无法导入配置，使用默认数据库路径")

class Database:
    """数据库连接类，提供对话历史的持久化存储"""
    
    def __init__(self, db_path: Optional[str] = None):
        """初始化数据库连接"""
        # 使用传入的路径或配置中的路径
        self.db_path = db_path or DB_PATH
        
        try:
            # 确保数据目录存在
            db_dir = os.path.dirname(self.db_path)
            if db_dir:  # 如果是内存数据库，db_dir可能为空
                os.makedirs(db_dir, exist_ok=True)
                logger.info(f"数据目录创建完成: {db_dir}")
            
            # 创建数据库连接
            self.connection = sqlite3.connect(self.db_path, check_same_thread=False)
            self.connection.row_factory = sqlite3.Row
            logger.info(f"数据库连接成功: {self.db_path}")
            
            # 初始化数据库表
            self._init_tables()
        except Exception as e:
            logger.error(f"数据库初始化失败: {str(e)}")
            print(f"数据库初始化错误: {str(e)}", file=sys.stderr)
            # 使用内存数据库作为备用
            self.db_path = ":memory:"
            self.connection = sqlite3.connect(":memory:")
            self.connection.row_factory = sqlite3.Row
            logger.warning("回退到内存数据库")
            self._init_tables()
    
    def _init_tables(self):
        """初始化数据库表结构"""
        cursor = self.connection.cursor()
        
        # 创建对话表
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS conversations (
            conversation_id TEXT PRIMARY KEY,
            user_id TEXT NULL,
            created_at TIMESTAMP NOT NULL,
            updated_at TIMESTAMP NOT NULL
        )
        ''')
        
        # 创建消息表
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS messages (
            message_id TEXT PRIMARY KEY,
            conversation_id TEXT NOT NULL,
            role TEXT NOT NULL,
            content TEXT NOT NULL,
            content_blocks TEXT NULL,
            timestamp TIMESTAMP NOT NULL,
            FOREIGN KEY (conversation_id) REFERENCES conversations(conversation_id)
        )
        ''')
        
        self.connection.commit()
        logger.info("数据库表初始化完成")
        
        # 检查是否有现有对话
        cursor.execute("SELECT COUNT(*) as count FROM conversations")
        count = cursor.fetchone()["count"]
        logger.info(f"数据库中现有对话数: {count}")
    
    def create_conversation(self, user_id: Optional[str] = None) -> str:
        """创建新的对话"""
        cursor = self.connection.cursor()
        conversation_id = str(uuid.uuid4())
        now = datetime.now().isoformat()
        
        cursor.execute(
            "INSERT INTO conversations (conversation_id, user_id, created_at, updated_at) VALUES (?, ?, ?, ?)",
            (conversation_id, user_id, now, now)
        )
        self.connection.commit()
        logger.info(f"创建新对话: {conversation_id}")
        
        return conversation_id
    
    def add_message(self, conversation_id: str, role: str, content: str, 
                   content_blocks: Optional[List[Dict[str, Any]]] = None) -> str:
        """添加消息到对话"""
        cursor = self.connection.cursor()
        message_id = str(uuid.uuid4())
        now = datetime.now().isoformat()
        
        # 序列化content_blocks为JSON
        content_blocks_json = json.dumps(content_blocks) if content_blocks else None
        
        # 插入消息
        cursor.execute(
            "INSERT INTO messages (message_id, conversation_id, role, content, content_blocks, timestamp) VALUES (?, ?, ?, ?, ?, ?)",
            (message_id, conversation_id, role, content, content_blocks_json, now)
        )
        
        # 更新对话的updated_at
        cursor.execute(
            "UPDATE conversations SET updated_at = ? WHERE conversation_id = ?",
            (now, conversation_id)
        )
        
        self.connection.commit()
        return message_id
    
    def get_conversation(self, conversation_id: str) -> Optional[Dict[str, Any]]:
        """获取对话信息"""
        cursor = self.connection.cursor()
        cursor.execute(
            "SELECT conversation_id, user_id, created_at, updated_at FROM conversations WHERE conversation_id = ?",
            (conversation_id,)
        )
        
        row = cursor.fetchone()
        if not row:
            return None
        
        conversation = {
            "conversation_id": row["conversation_id"],
            "user_id": row["user_id"],
            "created_at": row["created_at"],
            "updated_at": row["updated_at"],
            "messages": self.get_conversation_messages(conversation_id)
        }
        
        return conversation
    
    def get_conversation_messages(self, conversation_id: str) -> List[Dict[str, Any]]:
        """获取对话的消息列表"""
        cursor = self.connection.cursor()
        cursor.execute(
            "SELECT message_id, role, content, content_blocks, timestamp FROM messages WHERE conversation_id = ? ORDER BY timestamp",
            (conversation_id,)
        )
        
        messages = []
        for row in cursor.fetchall():
            # 解析content_blocks JSON
            content_blocks_json = row["content_blocks"]
            content_blocks = json.loads(content_blocks_json) if content_blocks_json else None
            
            message = {
                "message_id": row["message_id"],
                "role": row["role"],
                "content": row["content"],
                "content_blocks": content_blocks,
                "timestamp": row["timestamp"]
            }
            messages.append(message)
        
        return messages
    
    def delete_conversation(self, conversation_id: str) -> bool:
        """删除对话及其消息"""
        cursor = self.connection.cursor()
        
        # 首先检查对话是否存在
        cursor.execute("SELECT conversation_id FROM conversations WHERE conversation_id = ?", (conversation_id,))
        if not cursor.fetchone():
            return False
        
        # 删除对话的所有消息
        cursor.execute("DELETE FROM messages WHERE conversation_id = ?", (conversation_id,))
        
        # 删除对话本身
        cursor.execute("DELETE FROM conversations WHERE conversation_id = ?", (conversation_id,))
        
        self.connection.commit()
        return True
    
    def get_user_conversations(self, user_id: str) -> List[Dict[str, Any]]:
        """获取用户的所有对话"""
        cursor = self.connection.cursor()
        cursor.execute(
            "SELECT conversation_id, created_at, updated_at FROM conversations WHERE user_id = ? ORDER BY updated_at DESC",
            (user_id,)
        )
        
        conversations = []
        for row in cursor.fetchall():
            conversation = {
                "conversation_id": row["conversation_id"],
                "created_at": row["created_at"],
                "updated_at": row["updated_at"]
            }
            conversations.append(conversation)
        
        return conversations
    
    def get_recent_conversations(self, limit: int = 10, skip: int = 0) -> List[Dict[str, Any]]:
        """获取最近的对话列表，支持分页"""
        cursor = self.connection.cursor()
        cursor.execute(
            "SELECT conversation_id, user_id, created_at, updated_at FROM conversations ORDER BY updated_at DESC LIMIT ? OFFSET ?",
            (limit, skip)
        )
        
        conversations = []
        for row in cursor.fetchall():
            # 获取对话的第一条消息作为预览
            preview_cursor = self.connection.cursor()
            preview_cursor.execute(
                "SELECT content FROM messages WHERE conversation_id = ? AND role = 'user' ORDER BY timestamp ASC LIMIT 1",
                (row["conversation_id"],)
            )
            preview_row = preview_cursor.fetchone()
            preview = preview_row["content"] if preview_row else "无预览"
            
            # 限制预览长度
            if len(preview) > 50:
                preview = preview[:50] + "..."
            
            # 获取消息数量
            count_cursor = self.connection.cursor()
            count_cursor.execute(
                "SELECT COUNT(*) as message_count FROM messages WHERE conversation_id = ?",
                (row["conversation_id"],)
            )
            count_row = count_cursor.fetchone()
            message_count = count_row["message_count"] if count_row else 0
            
            conversation = {
                "conversation_id": row["conversation_id"],
                "user_id": row["user_id"],
                "preview": preview,
                "message_count": message_count,
                "created_at": row["created_at"],
                "updated_at": row["updated_at"]
            }
            conversations.append(conversation)
        
        return conversations
    
    def close(self):
        """关闭数据库连接"""
        if self.connection:
            self.connection.close() 
import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock
import json

from main import app

client = TestClient(app)

class TestAPI:
    """API测试类"""
    
    def test_root_endpoint(self):
        """测试根端点"""
        response = client.get("/")
        assert response.status_code == 200
        assert "AI智能问答系统" in response.text
    
    def test_health_check(self):
        """测试健康检查端点"""
        response = client.get("/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert "version" in data
        assert "model_info" in data
    
    @patch('services.ai_service.AIService.client.chat.completions.create')
    def test_ask_question_success(self, mock_openai):
        """测试成功发送问题"""
        # 模拟OpenAI响应
        mock_response = MagicMock()
        mock_response.choices = [MagicMock()]
        mock_response.choices[0].message.content = "你好！我是AI助手。"
        mock_response.usage.total_tokens = 50
        mock_openai.return_value = mock_response
        
        question_data = {
            "question": "你好，请介绍一下自己"
        }
        
        response = client.post("/ask", json=question_data)
        assert response.status_code == 200
        
        data = response.json()
        assert "answer" in data
        assert "conversation_id" in data
        assert "tokens_used" in data
        assert data["answer"] == "你好！我是AI助手。"
    
    def test_ask_question_invalid_input(self):
        """测试无效输入"""
        # 空问题
        response = client.post("/ask", json={"question": ""})
        assert response.status_code == 422
        
        # 缺少问题字段
        response = client.post("/ask", json={})
        assert response.status_code == 422
    
    @patch('services.ai_service.AIService.client.chat.completions.create')
    def test_ask_question_api_error(self, mock_openai):
        """测试API错误处理"""
        # 模拟API错误
        mock_openai.side_effect = Exception("API Error")
        
        question_data = {
            "question": "测试问题"
        }
        
        response = client.post("/ask", json=question_data)
        assert response.status_code == 500
    
    def test_create_conversation(self):
        """测试创建对话"""
        response = client.post("/conversations")
        assert response.status_code == 200
        
        data = response.json()
        assert "conversation_id" in data
        assert "message" in data
    
    def test_get_models(self):
        """测试获取模型信息"""
        response = client.get("/models")
        assert response.status_code == 200
        
        data = response.json()
        assert "current_model" in data
        assert "available_models" in data
        assert "model_config" in data
    
    def test_not_found_handler(self):
        """测试404错误处理"""
        response = client.get("/nonexistent")
        assert response.status_code == 404

class TestConversationManagement:
    """对话管理测试"""
    
    def test_conversation_flow(self):
        """测试完整对话流程"""
        # 1. 创建对话
        response = client.post("/conversations")
        assert response.status_code == 200
        conversation_id = response.json()["conversation_id"]
        
        # 2. 发送问题
        with patch('services.ai_service.AIService.client.chat.completions.create') as mock_openai:
            mock_response = MagicMock()
            mock_response.choices = [MagicMock()]
            mock_response.choices[0].message.content = "这是回答"
            mock_response.usage.total_tokens = 30
            mock_openai.return_value = mock_response
            
            question_data = {
                "question": "测试问题",
                "conversation_id": conversation_id
            }
            
            response = client.post("/ask", json=question_data)
            assert response.status_code == 200
        
        # 3. 获取对话历史
        response = client.get(f"/conversations/{conversation_id}/history")
        assert response.status_code == 200
        
        # 4. 删除对话
        response = client.delete(f"/conversations/{conversation_id}")
        assert response.status_code == 200
    
    def test_conversation_not_found(self):
        """测试对话不存在的情况"""
        fake_id = "fake-conversation-id"
        
        # 获取不存在的对话
        response = client.get(f"/conversations/{fake_id}")
        assert response.status_code == 404
        
        # 获取不存在的对话历史
        response = client.get(f"/conversations/{fake_id}/history")
        assert response.status_code == 404
        
        # 删除不存在的对话
        response = client.delete(f"/conversations/{fake_id}")
        assert response.status_code == 404

if __name__ == "__main__":
    pytest.main([__file__]) 
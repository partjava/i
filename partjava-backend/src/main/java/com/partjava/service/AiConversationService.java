package com.partjava.service;

import com.partjava.dto.response.ConversationResp;
import com.partjava.entity.AiMessage;

import java.util.List;

public interface AiConversationService {

    // 1. 获取某个用户的所有对话列表（含首条消息预览）
    List<ConversationResp> getUserConversations(Long userId);

    // 2. 创建新对话会话，返回生成的自增 ID
    Long createConversation(Long userId);

    // 3. 获取某个对话下的所有消息链（内置越权检测）
    List<AiMessage> getConversationMessages(Long userId, Long convId);

    // 4. 保存单轮对话消息流（写入 user 及 assistant，并自动截取前 20 字热更新标题）
    void saveDialog(Long userId, Long convId, String userMsg, String assistantMsg);
}

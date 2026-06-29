package com.partjava.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.partjava.dto.response.ConversationResp;
import com.partjava.entity.AiConversation;
import com.partjava.entity.AiMessage;
import com.partjava.repository.AiConversationMapper;
import com.partjava.repository.AiMessageMapper;
import com.partjava.service.AiConversationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AiConversationServiceImpl implements AiConversationService {

    private final AiConversationMapper aiConversationMapper;
    private final AiMessageMapper aiMessageMapper;

    @Autowired
    public AiConversationServiceImpl(AiConversationMapper aiConversationMapper, AiMessageMapper aiMessageMapper) {
        this.aiConversationMapper = aiConversationMapper;
        this.aiMessageMapper = aiMessageMapper;
    }

    @Override
    public List<ConversationResp> getUserConversations(Long userId) {
        return aiConversationMapper.selectUserConversations(userId);
    }

    @Transactional
    public Long createNewConversation(Long userId) {
        AiConversation conversation = AiConversation.builder()
                .userId(userId)
                .title("新对话")
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        aiConversationMapper.insert(conversation);
        return conversation.getId();
    }

    // 实现原本设计中的重名兼容接口
    @Override
    public Long createConversation(Long userId) {
        return createNewConversation(userId);
    }

    @Override
    public List<AiMessage> getConversationMessages(Long userId, Long convId) {
        // 1. 越权校验，核查当前会话是否属于当前登录用户
        AiConversation conv = aiConversationMapper.selectById(convId);
        if (conv == null || !conv.getUserId().equals(userId)) {
            throw new IllegalArgumentException("对话不存在或无权访问该资源");
        }

        // 2. 顺序拉取消息记录
        return aiMessageMapper.selectList(
                new LambdaQueryWrapper<AiMessage>()
                        .eq(AiMessage::getConversationId, convId)
                        .orderByAsc(AiMessage::getCreatedAt)
        );
    }

    @Override
    @Transactional
    public void saveDialog(Long userId, Long convId, String userMsg, String assistantMsg) {
        // 1. 越权校验，确认会话归属
        AiConversation conv = aiConversationMapper.selectById(convId);
        if (conv == null || !conv.getUserId().equals(userId)) {
            throw new IllegalArgumentException("对话不存在或无权访问该资源");
        }

        // 2. 写入用户发送的提问消息
        AiMessage userMessage = AiMessage.builder()
                .conversationId(convId)
                .role("user")
                .content(userMsg)
                .createdAt(LocalDateTime.now())
                .build();
        aiMessageMapper.insert(userMessage);

        // 3. 写入 AI 的回复消息
        AiMessage assistantMessage = AiMessage.builder()
                .conversationId(convId)
                .role("assistant")
                .content(assistantMsg)
                .createdAt(LocalDateTime.now())
                .build();
        aiMessageMapper.insert(assistantMessage);

        // 4. 判断是否更新会话标题 (若是首次聊天，则截取前 20 字作为会话名称)
        if ("新对话".equals(conv.getTitle())) {
            String title = userMsg.trim();
            if (title.length() > 20) {
                title = title.substring(0, 20) + "...";
            }
            conv.setTitle(title);
        }

        // 5. 热更新会话的最后活跃时间
        conv.setUpdatedAt(LocalDateTime.now());
        aiConversationMapper.updateById(conv);
    }
}

package com.partjava.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.partjava.dto.request.SaveMessageReq;
import com.partjava.dto.response.ConversationResp;
import com.partjava.entity.AiMessage;
import com.partjava.entity.User;
import com.partjava.repository.UserMapper;
import com.partjava.service.AiConversationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AiConversationController {

    private final AiConversationService aiConversationService;
    private final UserMapper userMapper;

    @Autowired
    public AiConversationController(AiConversationService aiConversationService, UserMapper userMapper) {
        this.aiConversationService = aiConversationService;
        this.userMapper = userMapper;
    }

    // 辅助方法：获取当前已登录的用户实体
    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userMapper.selectOne(
                new LambdaQueryWrapper<User>().eq(User::getUsername, username)
        );
        if (user == null) {
            throw new IllegalArgumentException("当前登录状态失效，请重新登录");
        }
        return user;
    }

    // 1. 获取当前用户所有的对话归档列表
    @GetMapping("/conversations")
    public Map<String, Object> getConversations() {
        User user = getCurrentUser();
        List<ConversationResp> conversations = aiConversationService.getUserConversations(user.getId());
        return Map.of("conversations", conversations);
    }

    // 2. 建立新对话会话
    @PostMapping("/conversations")
    public Map<String, Object> createConversation() {
        User user = getCurrentUser();
        Long newConvId = aiConversationService.createConversation(user.getId());
        return Map.of("id", newConvId);
    }

    // 3. 读取某会话下的全部历史消息 (内置所有权验证)
    @GetMapping("/conversations/{id}/messages")
    public Map<String, Object> getMessages(@PathVariable("id") Long convId) {
        User user = getCurrentUser();
        List<AiMessage> messages = aiConversationService.getConversationMessages(user.getId(), convId);
        return Map.of("messages", messages);
    }

    // 4. 保存新的一轮对话消息（双向写入）
    @PostMapping("/conversations/{id}/messages")
    public Map<String, Object> saveDialog(
            @PathVariable("id") Long convId,
            @RequestBody SaveMessageReq req) {
        User user = getCurrentUser();
        
        if (req.getUserMessage() == null || req.getUserMessage().trim().isEmpty() ||
            req.getAssistantMessage() == null || req.getAssistantMessage().trim().isEmpty()) {
            throw new IllegalArgumentException("消息内容不能为空");
        }

        aiConversationService.saveDialog(
                user.getId(),
                convId,
                req.getUserMessage(),
                req.getAssistantMessage()
        );
        return Map.of("success", true);
    }
}

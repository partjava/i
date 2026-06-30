package com.partjava.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.partjava.entity.AiMessage;
import com.partjava.repository.AiMessageMapper;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/ai")
public class AiChatController {

    private final AiMessageMapper aiMessageMapper;
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(10))
            .build();

    @Value("${ai.api-key:}")
    private String apiKey;

    @Value("${ai.api-url:https://api.openai.com/v1}")
    private String apiUrl;

    @Autowired
    public AiChatController(AiMessageMapper aiMessageMapper) {
        this.aiMessageMapper = aiMessageMapper;
    }

    /**
     * AI 对话端点 — 返回 JSON（前端统一格式）
     */
    @PostMapping("/chat")
    public ChatResp chat(@RequestBody ChatReq req) {
        String prompt = req.getResolvedPrompt();
        if (prompt == null) {
            throw new IllegalArgumentException("问题内容不能为空");
        }

        Long convId = req.getConversationId();
        String answer;

        // 若未配置 API Key，Mock 回复
        if (apiKey == null || apiKey.trim().isEmpty() || apiKey.startsWith("${")) {
            log.warn("🚨 [AI Chat Mock 降级] 未配置 ai.api-key，使用 Mock 回复");
            answer = "你好！我是您的 PartJava AI 智能助手。检测到系统目前处于本地开发降级模式（未配置真实的 ai.api-key）。\n\n"
                    + "您的提问是：" + prompt;
        } else {
            answer = callLLM(prompt);
        }

        // 保存对话消息历史
        if (convId != null && convId > 0) {
            saveConversationMessages(convId, prompt, answer);
        }

        ChatResp resp = new ChatResp();
        resp.setReply(answer);
        resp.setConversationId(convId);
        return resp;
    }

    /**
     * 调用大模型（非流式），返回完整文本
     */
    private String callLLM(String prompt) {
        try {
            Map<String, Object> bodyMap = new HashMap<>();
            bodyMap.put("model", "deepseek-v4-flash");
            bodyMap.put("stream", false);
            bodyMap.put("messages", List.of(Map.of("role", "user", "content", prompt)));

            HttpRequest httpRequest = HttpRequest.newBuilder()
                    .uri(URI.create(apiUrl + "/chat/completions"))
                    .header("Content-Type", "application/json")
                    .header("Authorization", "Bearer " + apiKey)
                    .POST(HttpRequest.BodyPublishers.ofString(objectMapper.writeValueAsString(bodyMap), StandardCharsets.UTF_8))
                    .build();

            HttpResponse<String> response = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
            if (response.statusCode() != 200) {
                log.warn("大模型 API 响应失败，HTTP 状态码: {}", response.statusCode());
                return "抱歉，AI 服务暂时不可用，请稍后再试。";
            }
            JsonNode node = objectMapper.readTree(response.body());
            String content = node.path("choices").path(0).path("message").path("content").asText("");
            return content.isBlank() ? "抱歉，AI 未能生成有效回复。" : content;
        } catch (Exception e) {
            log.error("大模型请求异常", e);
            return "抱歉，AI 服务请求异常，请稍后再试。";
        }
    }

    /**
     * 保存提问和回答消息历史至 ai_messages 物理表中
     */
    private void saveConversationMessages(Long convId, String prompt, String assistantReply) {
        if (convId == null || convId <= 0) {
            return;
        }
        try {
            // 保存用户消息
            AiMessage userMsg = AiMessage.builder()
                    .conversationId(convId)
                    .role("user")
                    .content(prompt)
                    .createdAt(LocalDateTime.now())
                    .build();
            aiMessageMapper.insert(userMsg);

            // 保存 AI 消息
            AiMessage assistantMsg = AiMessage.builder()
                    .conversationId(convId)
                    .role("assistant")
                    .content(assistantReply)
                    .createdAt(LocalDateTime.now())
                    .build();
            aiMessageMapper.insert(assistantMsg);
        } catch (Exception e) {
            log.error("持久化 AI 会话消息历史失败", e);
        }
    }

    @Data
    public static class ChatReq {
        private Long conversationId;
        private String prompt;
        private String message; // 前端发的是 message，后端兼容

        /** 取 prompt 或 message，message 优先 */
        public String getResolvedPrompt() {
            if (prompt != null && !prompt.trim().isEmpty()) return prompt.trim();
            if (message != null && !message.trim().isEmpty()) return message.trim();
            return null;
        }
    }

    @Data
    public static class ChatResp {
        private String reply;
        private Long conversationId;
    }
}

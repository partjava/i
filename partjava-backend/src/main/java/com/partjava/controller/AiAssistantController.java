package com.partjava.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.partjava.common.api.ApiResponse;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/ai")
public class AiAssistantController {

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(10))
            .build();

    @Value("${ai.api-key:}")
    private String apiKey;

    @Value("${ai.api-url:https://api.openai.com/v1}")
    private String apiUrl;

    @PostMapping("/assistant")
    public ApiResponse<AssistantResp> assistant(@RequestBody AssistantReq req) {
        String question = req.getQuestion() != null ? req.getQuestion() : req.getPrompt();
        if (question == null || question.trim().isEmpty()) {
            throw new IllegalArgumentException("Question cannot be empty");
        }

        String answer = shouldUseMock() ? mockAnswer(question.trim()) : requestModel(question.trim());
        AssistantResp resp = new AssistantResp();
        resp.setAnswer(answer);
        resp.setConversationId(req.getConversationId());
        resp.setContentBlocks(new ArrayList<>());
        return ApiResponse.success(resp);
    }

    private boolean shouldUseMock() {
        return apiKey == null || apiKey.trim().isEmpty() || apiKey.startsWith("${");
    }

    private String requestModel(String question) {
        try {
            Map<String, Object> bodyMap = new HashMap<>();
            bodyMap.put("model", "deepseek-v4-flash");
            bodyMap.put("stream", false);
            bodyMap.put("messages", List.of(Map.of("role", "user", "content", question)));

            HttpRequest httpRequest = HttpRequest.newBuilder()
                    .uri(URI.create(apiUrl + "/chat/completions"))
                    .header("Content-Type", "application/json")
                    .header("Authorization", "Bearer " + apiKey)
                    .POST(HttpRequest.BodyPublishers.ofString(objectMapper.writeValueAsString(bodyMap), StandardCharsets.UTF_8))
                    .build();

            HttpResponse<String> response = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
            if (response.statusCode() != 200) {
                log.warn("AI assistant request failed with status {}", response.statusCode());
                return mockAnswer(question);
            }
            JsonNode node = objectMapper.readTree(response.body());
            String content = node.path("choices").path(0).path("message").path("content").asText("");
            return content.isBlank() ? mockAnswer(question) : content;
        } catch (Exception e) {
            log.warn("AI assistant request failed, falling back to mock response", e);
            return mockAnswer(question);
        }
    }

    private String mockAnswer(String question) {
        return "你好，我是 PartJava AI 助手。当前后端已接管 AI 助手接口。你刚才的问题是：" + question;
    }

    @Data
    public static class AssistantReq {
        private String question;
        private String prompt;
        private Long conversationId;
        private Long userId;
    }

    @Data
    public static class AssistantResp {
        private String answer;
        private Long conversationId;
        private List<Map<String, Object>> contentBlocks;
    }
}

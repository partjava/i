package com.partjava.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.partjava.entity.AiMessage;
import com.partjava.repository.AiMessageMapper;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Slf4j
@RestController
@RequestMapping("/api/ai")
public class AiChatController {

    private final AiMessageMapper aiMessageMapper;
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final ExecutorService executorService = Executors.newVirtualThreadPerTaskExecutor(); // JDK 21 虚拟线程池
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
     * 流式 AI 对话中转端点 (SSE 长连接传输)
     */
    @PostMapping(value = "/chat", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter streamAiChat(@RequestBody ChatReq req) {
        SseEmitter emitter = new SseEmitter(Duration.ofMinutes(5).toMillis());
        
        if (req.getPrompt() == null || req.getPrompt().trim().isEmpty()) {
            try {
                emitter.send(SseEmitter.event().data("错误：问题内容不能为空"));
                emitter.complete();
            } catch (Exception ignored) {}
            return emitter;
        }

        String prompt = req.getPrompt().trim();
        Long convId = req.getConversationId();

        // 异步在虚拟线程中执行，防请求阻塞
        executorService.submit(() -> {
            StringBuilder fullResponse = new StringBuilder();

            // 1. 若未配置 API Key，直接执行 Mock 降级打字机流
            if (apiKey == null || apiKey.trim().isEmpty() || apiKey.startsWith("${")) {
                log.warn("🚨 [AI Chat Mock 降级] 当前未配置 ai.api-key，进入模拟 SSE 打字机流模式！");
                runMockStream(emitter, prompt, convId, fullResponse);
                return;
            }

            try {
                // 2. 构造符合 OpenAI 标准的 Request Body
                Map<String, Object> bodyMap = new HashMap<>();
                bodyMap.put("model", "gpt-4o-mini");
                bodyMap.put("stream", true);
                
                List<Map<String, String>> messagesList = new ArrayList<>();
                messagesList.add(Map.of("role", "user", "content", prompt));
                bodyMap.put("messages", messagesList);

                String jsonBody = objectMapper.writeValueAsString(bodyMap);

                HttpRequest httpRequest = HttpRequest.newBuilder()
                        .uri(URI.create(apiUrl + "/chat/completions"))
                        .header("Content-Type", "application/json")
                        .header("Authorization", "Bearer " + apiKey)
                        .POST(HttpRequest.BodyPublishers.ofString(jsonBody, StandardCharsets.UTF_8))
                        .build();

                // 3. 以流式 InputStream 形式读取响应
                HttpResponse<InputStream> response = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofInputStream());
                
                if (response.statusCode() != 200) {
                    log.error("大模型 API 响应失败，HTTP 状态码: {}", response.statusCode());
                    runMockStream(emitter, prompt, convId, fullResponse);
                    return;
                }

                try (BufferedReader reader = new BufferedReader(new InputStreamReader(response.body(), StandardCharsets.UTF_8))) {
                    String line;
                    while ((line = reader.readLine()) != null) {
                        if (line.startsWith("data:")) {
                            String data = line.substring(5).trim();
                            if (data.equals("[DONE]")) {
                                break;
                            }
                            
                            try {
                                JsonNode node = objectMapper.readTree(data);
                                String content = node.path("choices").path(0).path("delta").path("content").asText("");
                                if (!content.isEmpty()) {
                                    fullResponse.append(content);
                                    emitter.send(SseEmitter.event().data(content));
                                }
                            } catch (Exception e) {
                                // 忽略单行 json 解析失败
                            }
                        }
                    }
                }

                emitter.complete();
                
                // 4. 保存此次问答消息历史
                saveConversationMessages(convId, prompt, fullResponse.toString());

            } catch (Exception e) {
                log.error("大模型流式请求异常，执行 Mock 降级", e);
                runMockStream(emitter, prompt, convId, fullResponse);
            }
        });

        return emitter;
    }

    /**
     * 运行 Mock 打字流效果回复
     */
    private void runMockStream(SseEmitter emitter, String prompt, Long convId, StringBuilder fullResponse) {
        String mockResponse = "你好！我是您的 PartJava AI 智能助手。检测到系统目前处于本地开发降级模式（未在 application.yml 中配置真实的 `ai.api-key`）。\n\n"
                + "为了不中断您的学习调试流程，我这里模拟了 SSE 长连接的打字流输出效果！\n\n"
                + "您的提问是：“" + prompt + "”。这通常是一个很好的 Java 学习切入点。在 PartJava 中，您可以点击右侧的 Playground 或进入各个编程挑战题来进行亲手编写实践。祝您学有所成！";

        fullResponse.append(mockResponse);

        try {
            // 每 2 个字分段发送，并睡眠 80 毫秒，呈现打字机的视觉流效果
            int chunkSize = 2;
            for (int i = 0; i < mockResponse.length(); i += chunkSize) {
                int endIdx = Math.min(i + chunkSize, mockResponse.length());
                String chunk = mockResponse.substring(i, endIdx);
                
                emitter.send(SseEmitter.event().data(chunk));
                Thread.sleep(80);
            }
            emitter.complete();

            // 保存此次 Mock 对话历史
            saveConversationMessages(convId, prompt, mockResponse);

        } catch (Exception e) {
            log.error("Mock 流式输出或保存历史时异常", e);
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
    }
}

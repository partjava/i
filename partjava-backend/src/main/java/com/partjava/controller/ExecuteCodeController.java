package com.partjava.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/execute-code")
public class ExecuteCodeController {

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(10))
            .build();

    @Value("${judge0.api-key:}")
    private String apiKey;

    @Value("${judge0.api-host:judge0-ce.p.rapidapi.com}")
    private String apiHost;

    // Judge0 CE API 语言 ID 映射
    private static final Map<String, Integer> LANGUAGE_IDS = new HashMap<>();
    static {
        LANGUAGE_IDS.put("python", 71);
        LANGUAGE_IDS.put("javascript", 63);
        LANGUAGE_IDS.put("java", 62);
        LANGUAGE_IDS.put("cpp", 54);
        LANGUAGE_IDS.put("c", 50);
        LANGUAGE_IDS.put("go", 60);
        LANGUAGE_IDS.put("php", 68);
        LANGUAGE_IDS.put("rust", 73);
        LANGUAGE_IDS.put("csharp", 51);
        LANGUAGE_IDS.put("typescript", 74);
    }

    /**
     * 接收 Playground 代码请求，调用 Judge0 在线编译执行或触发 Mock 降级
     */
    @PostMapping
    public ExecuteCodeResp executeCode(@RequestBody ExecuteCodeReq req) {
        if (req.getCode() == null || req.getCode().trim().isEmpty()) {
            ExecuteCodeResp resp = new ExecuteCodeResp();
            resp.setSuccess(false);
            resp.setError("代码内容不能为空");
            return resp;
        }

        String language = req.getLanguage() != null ? req.getLanguage().toLowerCase() : "python";
        Integer languageId = LANGUAGE_IDS.get(language);
        if (languageId == null) {
            ExecuteCodeResp resp = new ExecuteCodeResp();
            resp.setSuccess(false);
            resp.setError("暂不支持此编程语言: " + language);
            return resp;
        }

        // 1. 判断是否未配置 Key，若未配置则直接触发 Mock 降级，避免本地抛 API 授权异常
        if (apiKey == null || apiKey.trim().isEmpty() || apiKey.startsWith("${")) {
            log.warn("🚨 [Judge0 Mock 降级] 当前未配置 judge0.api-key，进入模拟运行模式！");
            return triggerMockExecution(req.getCode(), language);
        }

        try {
            // 2. 构造 POST 提交申请到 Judge0 CE
            Map<String, Object> requestBodyMap = new HashMap<>();
            requestBodyMap.put("language_id", languageId);
            requestBodyMap.put("source_code", req.getCode());
            requestBodyMap.put("stdin", req.getInput() != null ? req.getInput() : "");
            requestBodyMap.put("base64_encoded", false);
            requestBodyMap.put("wait", false);

            String requestBodyJson = objectMapper.writeValueAsString(requestBodyMap);

            HttpRequest postRequest = HttpRequest.newBuilder()
                    .uri(URI.create("https://" + apiHost + "/submissions"))
                    .header("content-type", "application/json")
                    .header("x-rapidapi-host", apiHost)
                    .header("x-rapidapi-key", apiKey)
                    .POST(HttpRequest.BodyPublishers.ofString(requestBodyJson, StandardCharsets.UTF_8))
                    .build();

            HttpResponse<String> postResponse = httpClient.send(postRequest, HttpResponse.BodyHandlers.ofString());
            if (postResponse.statusCode() != 201 && postResponse.statusCode() != 200) {
                log.error("Judge0 提交申请失败，HTTP 状态码: {}, 详情: {}", postResponse.statusCode(), postResponse.body());
                return triggerMockExecution(req.getCode(), language);
            }

            JsonNode rootNode = objectMapper.readTree(postResponse.body());
            String token = rootNode.path("token").asText();
            if (token == null || token.isEmpty()) {
                log.error("Judge0 提交未返回合法 token，响应体: {}", postResponse.body());
                return triggerMockExecution(req.getCode(), language);
            }

            // 3. 开启轮询，最多等待 10 秒
            JsonNode resultNode = null;
            int attempts = 0;
            while (attempts < 10) {
                Thread.sleep(1000);
                
                HttpRequest getRequest = HttpRequest.newBuilder()
                        .uri(URI.create("https://" + apiHost + "/submissions/" + token + "?base64_encoded=true&fields=*"))
                        .header("x-rapidapi-host", apiHost)
                        .header("x-rapidapi-key", apiKey)
                        .GET()
                        .build();

                HttpResponse<String> getResponse = httpClient.send(getRequest, HttpResponse.BodyHandlers.ofString());
                if (getResponse.statusCode() == 200) {
                    resultNode = objectMapper.readTree(getResponse.body());
                    JsonNode statusNode = resultNode.path("status");
                    int statusId = statusNode.path("id").asInt();
                    
                    // 3=Accepted, 4=Wrong Answer, 5=Time Limit Exceeded, 6=Compilation Error, etc.
                    // 1=In Queue, 2=Processing. 非 1 非 2 说明执行已出结果
                    if (statusId != 1 && statusId != 2) {
                        break;
                    }
                }
                attempts++;
            }

            if (resultNode == null) {
                ExecuteCodeResp timeoutResp = new ExecuteCodeResp();
                timeoutResp.setSuccess(false);
                timeoutResp.setError("获取执行结果超时");
                return timeoutResp;
            }

            // 4. 解析结果并强制 Base64 解码输出
            ExecuteCodeResp finalResp = new ExecuteCodeResp();
            finalResp.setSuccess(true);
            finalResp.setStatus(resultNode.path("status").path("description").asText("Unknown"));
            finalResp.setTime(resultNode.path("time").asDouble(0.0));
            finalResp.setMemory(resultNode.path("memory").asInt(0));

            // 解码 stdout
            String rawStdout = resultNode.path("stdout").asText("");
            finalResp.setOutput(decodeBase64(rawStdout));

            // 解码编译或运行错误信息
            String rawStderr = resultNode.path("stderr").asText("");
            String rawCompile = resultNode.path("compile_output").asText("");
            String rawMessage = resultNode.path("message").asText("");

            if (!rawStderr.isEmpty()) {
                finalResp.setError(decodeBase64(rawStderr));
            } else if (!rawCompile.isEmpty()) {
                finalResp.setError(decodeBase64(rawCompile));
            } else if (!rawMessage.isEmpty()) {
                finalResp.setError(decodeBase64(rawMessage));
            } else {
                finalResp.setError("");
            }

            return finalResp;

        } catch (Exception e) {
            log.error("调用 Judge0 API 抛出异常，降级执行 Mock", e);
            return triggerMockExecution(req.getCode(), language);
        }
    }

    /**
     * 降级运行：模拟代码的控制台输出
     */
    private ExecuteCodeResp triggerMockExecution(String code, String language) {
        ExecuteCodeResp resp = new ExecuteCodeResp();
        resp.setSuccess(true);
        resp.setStatus("Accepted (Mocked)");
        resp.setTime(0.05);
        resp.setMemory(240);
        resp.setError("");

        // 简易语法结果推导
        if (code.contains("print(") || code.contains("System.out.print") || code.contains("console.log")) {
            // 简单截取引号中的内容，比如 print("Hello")
            try {
                int start = code.indexOf("\"");
                int end = code.indexOf("\"", start + 1);
                if (start != -1 && end != -1) {
                    resp.setOutput(code.substring(start + 1, end) + "\n");
                    return resp;
                }
            } catch (Exception ignored) {}
        }

        // 默认兜底模拟返回
        resp.setOutput("[Mock 模拟环境执行成功 (" + language + ")]\n程序运行完成。");
        return resp;
    }

    private String decodeBase64(String base64Str) {
        if (base64Str == null || base64Str.isEmpty()) {
            return "";
        }
        try {
            // 处理 URL 安全的 Base64 格式
            String clean = base64Str.replace('-', '+').replace('_', '/').trim();
            byte[] bytes = Base64.getDecoder().decode(clean);
            return new String(bytes, StandardCharsets.UTF_8);
        } catch (Exception e) {
            // 解码失败说明可能原本就是明文，直接返回
            return base64Str;
        }
    }

    @Data
    public static class ExecuteCodeReq {
        private String code;
        private String language;
        private String input;
    }

    @Data
    public static class ExecuteCodeResp {
        private Boolean success;
        private String status;
        private Double time;
        private Integer memory;
        private String output;
        private String error;
    }
}

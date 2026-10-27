package com.partjava.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.net.URI;
import java.net.http.*;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.*;
import java.util.concurrent.*;
import java.util.concurrent.Flow;

@Slf4j
@RestController
@RequestMapping("/api/execute-code")
public class ExecuteCodeController {
    private static final int MAX_CODE = 64 * 1024;
    private static final int MAX_INPUT = 16 * 1024;
    private static final int MAX_OUTPUT = 64 * 1024;
    private static final int MAX_RESPONSE = 256 * 1024;
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final HttpClient httpClient = HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(3)).build();
    private final Duration totalTimeout = Duration.ofSeconds(12);
    private final Duration pollInterval = Duration.ofMillis(250);

    @Value("${judge0.api-key:}")
    private String apiKey;
    @Value("${judge0.api-host:judge0-ce.p.rapidapi.com}")
    private String apiHost;

    private static final Map<String, Integer> LANGUAGE_IDS = Map.of(
            "python", 71, "javascript", 63, "java", 62, "cpp", 54, "c", 50,
            "go", 60, "php", 68, "rust", 73, "csharp", 51, "typescript", 74);

    @PostMapping
    public ExecuteCodeResp executeCode(@RequestBody ExecuteCodeReq req) {
        if (req == null || req.getCode() == null || req.getCode().isBlank()) {
            return failure("SYSTEM_ERROR", "代码内容不能为空");
        }
        if (req.getCode().getBytes(StandardCharsets.UTF_8).length > MAX_CODE
                || (req.getInput() != null && req.getInput().getBytes(StandardCharsets.UTF_8).length > MAX_INPUT)) {
            return failure("SYSTEM_ERROR", "代码或标准输入超出大小限制");
        }
        String language = req.getLanguage() == null ? "python" : req.getLanguage().trim().toLowerCase(Locale.ROOT);
        Integer languageId = LANGUAGE_IDS.get(language);
        if (languageId == null) return failure("SYSTEM_ERROR", "暂不支持此编程语言");
        if (apiKey == null || apiKey.isBlank() || apiKey.trim().startsWith("${")) {
            return failure("SERVICE_UNAVAILABLE", "代码执行服务未配置，请稍后重试");
        }

        long deadline = System.nanoTime() + totalTimeout.toNanos();
        try {
            // Restrict provider configuration to a hostname: no arbitrary URL paths or credentials.
            if (apiHost == null || !apiHost.matches("[A-Za-z0-9.-]+")) {
                return failure("SERVICE_UNAVAILABLE", "代码执行服务配置无效");
            }
            String body = objectMapper.writeValueAsString(Map.of(
                    "language_id", languageId, "source_code", req.getCode(),
                    "stdin", req.getInput() == null ? "" : req.getInput(),
                    "cpu_time_limit", 3, "wall_time_limit", 5, "memory_limit", 128000,
                    "max_file_size", MAX_OUTPUT / 1024, "enable_network", false));
            HttpRequest post = request("/submissions?base64_encoded=false&wait=false", deadline)
                    .header("content-type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(body, StandardCharsets.UTF_8)).build();
            HttpResponse<String> submitted = send(post);
            if (submitted.statusCode() != 200 && submitted.statusCode() != 201) return providerFailure(submitted.statusCode());
            String token = objectMapper.readTree(submitted.body()).path("token").asText("");
            if (!token.matches("[A-Za-z0-9_-]{1,128}")) return failure("SYSTEM_ERROR", "执行服务返回无效结果");

            while (System.nanoTime() < deadline) {
                HttpRequest poll = request("/submissions/" + token
                        + "?base64_encoded=true&fields=status,stdout,stderr,compile_output,time,memory", deadline).GET().build();
                HttpResponse<String> response = send(poll);
                if (response.statusCode() != 200) return providerFailure(response.statusCode());
                if (System.nanoTime() >= deadline) return failure("SYSTEM_BUSY", "执行服务响应超时，请稍后重试");
                JsonNode result = objectMapper.readTree(response.body());
                int statusId = result.path("status").path("id").asInt(-1);
                if (statusId != 1 && statusId != 2) return terminalResult(result, statusId);
                long remaining = deadline - System.nanoTime();
                if (remaining > 0) TimeUnit.NANOSECONDS.sleep(Math.min(remaining, pollInterval.toNanos()));
            }
            return failure("SYSTEM_BUSY", "执行服务排队或处理超时，请稍后重试");
        } catch (HttpTimeoutException | TimeoutException e) {
            return failure("SYSTEM_BUSY", "执行服务响应超时，请稍后重试");
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            return failure("SERVICE_UNAVAILABLE", "执行请求已中断");
        } catch (Exception e) {
            // Never log provider bodies, headers, tokens, submitted code or exception messages.
            log.warn("Code execution provider failed ({})", e.getClass().getSimpleName());
            return failure("SERVICE_UNAVAILABLE", "执行服务暂时不可用，请稍后重试");
        }
    }

    private HttpRequest.Builder request(String path, long deadline) throws TimeoutException {
        long remaining = deadline - System.nanoTime();
        if (remaining <= 0) throw new TimeoutException();
        return HttpRequest.newBuilder(URI.create("https://" + apiHost + path))
                .timeout(Duration.ofNanos(Math.min(remaining, Duration.ofSeconds(3).toNanos())))
                .header("x-rapidapi-host", apiHost).header("x-rapidapi-key", apiKey);
    }

    private HttpResponse<String> send(HttpRequest request) throws Exception {
        CompletableFuture<HttpResponse<String>> pending = httpClient.sendAsync(request, info -> new BoundedBodySubscriber());
        try {
            return pending.get(request.timeout().orElseThrow().toNanos(), TimeUnit.NANOSECONDS);
        } catch (TimeoutException | InterruptedException e) {
            pending.cancel(true);
            throw e;
        }
    }

    private ExecuteCodeResp providerFailure(int code) {
        return failure(code == 429 ? "SYSTEM_BUSY" : "SERVICE_UNAVAILABLE", "执行服务暂时不可用，请稍后重试");
    }

    private ExecuteCodeResp terminalResult(JsonNode result, int statusId) {
        String status = switch (statusId) {
            case 3 -> "ACCEPTED";
            case 5 -> "TIME_LIMIT_EXCEEDED";
            case 6 -> "COMPILE_ERROR";
            case 8 -> "OUTPUT_LIMIT_EXCEEDED";
            case 7, 9, 10, 11, 14 -> "RUNTIME_ERROR";
            default -> "SYSTEM_ERROR";
        };
        // Status 12/13 are provider failures; their diagnostic message is not user output.
        if (status.equals("SYSTEM_ERROR")) return failure(status, "执行服务未能完成运行");
        String output = decode(result.path("stdout").asText(""));
        String error = decode(result.path(statusId == 6 ? "compile_output" : "stderr").asText(""));
        if (output.length() > MAX_OUTPUT || error.length() > MAX_OUTPUT) {
            ExecuteCodeResp limited = failure("OUTPUT_LIMIT_EXCEEDED", "程序输出超出大小限制");
            limited.setOutput(output.substring(0, Math.min(output.length(), MAX_OUTPUT)));
            return limited;
        }
        ExecuteCodeResp resp = failure(status, error);
        resp.setSuccess(statusId == 3);
        resp.setOutput(output);
        resp.setTime(Math.max(0, result.path("time").asDouble(0)));
        resp.setMemory(Math.max(0, result.path("memory").asInt(0)));
        if (!resp.getSuccess() && error.isEmpty()) resp.setError("程序执行失败: " + status);
        return resp;
    }

    private String decode(String encoded) {
        if (encoded.isEmpty()) return "";
        return new String(Base64.getDecoder().decode(encoded), StandardCharsets.UTF_8);
    }

    private ExecuteCodeResp failure(String status, String error) {
        ExecuteCodeResp resp = new ExecuteCodeResp();
        resp.setSuccess(false);
        resp.setStatus(status);
        resp.setOutput("");
        resp.setError(error);
        resp.setTime(0.0);
        resp.setMemory(0);
        return resp;
    }

    /** Bounds bytes while receiving the body; request timeout includes full body delivery. */
    private static class BoundedBodySubscriber implements HttpResponse.BodySubscriber<String> {
        private final CompletableFuture<String> body = new CompletableFuture<>();
        private final ByteArrayOutputStream bytes = new ByteArrayOutputStream();
        private Flow.Subscription subscription;
        public CompletionStage<String> getBody() { return body; }
        public void onSubscribe(Flow.Subscription value) { subscription = value; value.request(1); }
        public void onNext(List<ByteBuffer> buffers) {
            for (ByteBuffer buffer : buffers) {
                if (buffer.remaining() > MAX_RESPONSE - bytes.size()) {
                    subscription.cancel();
                    body.completeExceptionally(new IllegalStateException("Provider response exceeds limit"));
                    return;
                }
                byte[] chunk = new byte[buffer.remaining()];
                buffer.get(chunk);
                bytes.writeBytes(chunk);
            }
            subscription.request(1);
        }
        public void onError(Throwable error) { body.completeExceptionally(error); }
        public void onComplete() { body.complete(bytes.toString(StandardCharsets.UTF_8)); }
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

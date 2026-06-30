package com.partjava.service.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.partjava.dto.JudgementResult;
import com.partjava.service.SandboxService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.InputStream;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.time.Duration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.Semaphore;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
public class SandboxServiceImpl implements SandboxService {

    private final Semaphore sandboxSemaphore = new Semaphore(4);
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final HttpClient httpClient = HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(15)).build();
    private static final String PISTON_API = "https://emkc.org/api/v2/piston/execute";

    @Override
    public JudgementResult evaluateCode(String userCode, String evaluationScript, double timeLimitSec) {
        String fullScript = userCode + "\n\n" + evaluationScript;

        // 1. 优先免费在线 API (Piston)
        try {
            JudgementResult r = tryPiston(fullScript);
            if (r != null) return r;
        } catch (Exception e) {
            log.info("Piston API 不可用: {}", e.getMessage());
        }

        // 2. 降级本地执行
        return executeLocally(fullScript, timeLimitSec);
    }

    private JudgementResult tryPiston(String fullScript) {
        try {
            Map<String, Object> body = new HashMap<>();
            body.put("language", "python");
            body.put("version", "3.10.0");
            body.put("files", List.of(Map.of("name", "solution.py", "content", fullScript)));
            body.put("stdin", "");
            body.put("compile_timeout", 10000);
            body.put("run_timeout", (int) (5000));

            HttpRequest req = HttpRequest.newBuilder()
                    .uri(URI.create(PISTON_API))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(objectMapper.writeValueAsString(body), StandardCharsets.UTF_8))
                    .build();

            HttpResponse<String> resp = httpClient.send(req, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
            if (resp.statusCode() != 200) return null;

            JsonNode node = objectMapper.readTree(resp.body());
            String output = node.path("run").path("output").asText("");
            if (output.isEmpty()) output = node.path("run").path("stderr").asText("");

            return parseOutput(output, 50);
        } catch (Exception e) {
            return null;
        }
    }

    private JudgementResult executeLocally(String fullScript, double timeLimitSec) {
        boolean acquired = false;
        try {
            acquired = sandboxSemaphore.tryAcquire(10, TimeUnit.SECONDS);
            if (!acquired) return new JudgementResult("SYSTEM_BUSY", "系统评测繁忙，请稍后再试", 0);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            return new JudgementResult("SYSTEM_ERROR", "评测排队中断", 0);
        }

        File tempFile = null;
        try {
            tempFile = File.createTempFile("sol_" + UUID.randomUUID(), ".py");
            Files.writeString(tempFile.toPath(), fullScript, StandardCharsets.UTF_8);

            long startTime = System.currentTimeMillis();
            Process process;
            try {
                new ProcessBuilder("docker", "version").start().waitFor(2, TimeUnit.SECONDS);
                process = new ProcessBuilder("docker", "run", "--rm", "--network", "none",
                        "-m", "256m", "--cpus", "0.5",
                        "-v", tempFile.getAbsolutePath() + ":/app/solution.py:ro",
                        "python:3.11-slim", "python", "/app/solution.py")
                        .redirectErrorStream(true).start();
            } catch (Exception ex) {
                process = new ProcessBuilder("python3", tempFile.getAbsolutePath())
                        .redirectErrorStream(true).start();
            }

            boolean completed = process.waitFor((long) (timeLimitSec + 3), TimeUnit.SECONDS);
            if (!completed) { process.destroyForcibly(); return new JudgementResult("TIME_LIMIT_EXCEEDED", "评测超时", 0); }

            long duration = System.currentTimeMillis() - startTime;
            String outputLog;
            try (InputStream is = process.getInputStream()) { outputLog = new String(is.readAllBytes(), StandardCharsets.UTF_8).trim(); }
            return parseOutput(outputLog, duration);
        } catch (Exception e) {
            log.error("沙箱系统异常", e);
            return new JudgementResult("SYSTEM_ERROR", "评测内部错误: " + e.getMessage(), 0);
        } finally {
            if (tempFile != null && tempFile.exists()) tempFile.delete();
            if (acquired) sandboxSemaphore.release();
        }
    }

    private JudgementResult parseOutput(String output, long duration) {
        if (output.contains("__TEST_STATUS__:PASSED")) {
            String[] parts = output.split("__TEST_STATUS__:PASSED", 2);
            String msg = parts.length > 1 ? parts[1].trim() : "通过";
            if (msg.startsWith("|")) msg = msg.substring(1);
            return new JudgementResult("ACCEPTED", msg, duration);
        } else if (output.contains("__TEST_STATUS__:FAILED")) {
            String[] parts = output.split("__TEST_STATUS__:FAILED", 2);
            String msg = parts.length > 1 ? parts[1].trim() : output;
            if (msg.startsWith("|")) msg = msg.substring(1);
            return new JudgementResult("WRONG_ANSWER", msg, duration);
        }
        return new JudgementResult("RUNTIME_ERROR", output, duration);
    }
}

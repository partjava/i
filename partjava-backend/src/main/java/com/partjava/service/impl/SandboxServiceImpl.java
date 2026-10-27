package com.partjava.service.impl;

import com.fasterxml.jackson.databind.*;
import com.fasterxml.jackson.databind.node.*;
import com.partjava.dto.JudgementResult;
import com.partjava.service.SandboxService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.URI;
import java.net.http.*;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.*;
import java.util.concurrent.*;
import java.util.concurrent.Flow;

/** Challenge execution uses native OnlineCompiler APIs exclusively; no local or simulated fallback. */
@Service
public class SandboxServiceImpl implements SandboxService {
    private static final int MAX_SOURCE = 64 * 1024;
    private static final int MAX_RESPONSE = 256 * 1024;
    private static final int MAX_MESSAGE = 16 * 1024;
    private final ObjectMapper mapper = new ObjectMapper()
            .enable(DeserializationFeature.USE_BIG_DECIMAL_FOR_FLOATS)
            .enable(DeserializationFeature.USE_BIG_INTEGER_FOR_INTS);
    private final HttpClient client;
    private final Semaphore requests = new Semaphore(1, true);
    private final Duration batchTimeout = Duration.ofSeconds(70);
    private final Duration totalTimeout = Duration.ofSeconds(180);
    @Value("${onlinecompiler.api-key:${ONLINECOMPILER_API_KEY:}}")
    private String apiKey = "";
    @Value("${onlinecompiler.base-url:${ONLINECOMPILER_BASE_URL:https://api.onlinecompiler.io}}")
    private String baseUrl = "https://api.onlinecompiler.io";
    @Value("${onlinecompiler.compiler:${ONLINECOMPILER_COMPILER:python-3.14}}")
    private String compiler = "python-3.14";
    @Value("${onlinecompiler.batch-size:${ONLINECOMPILER_BATCH_SIZE:8}}")
    private int batchSize = 8;

    public SandboxServiceImpl() {
        this(HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(5))
                .followRedirects(HttpClient.Redirect.NEVER).build());
    }
    SandboxServiceImpl(HttpClient client) { this.client = client; }

    @Override
    public JudgementResult evaluateCode(String userCode, String evaluationScript, double timeLimitSec) {
        long start = System.nanoTime();
        if (userCode == null || userCode.isBlank()) return result("COMPILE_ERROR", "代码不能为空", start);
        if (bytes(userCode) > MAX_SOURCE) return result("SYSTEM_ERROR", "代码超过 64 KiB 限制", start);
        if (apiKey == null || apiKey.isBlank() || apiKey.trim().startsWith("${")) {
            return result("SERVICE_UNAVAILABLE", "OnlineCompiler 判题服务尚未配置 API Key，本次未记录通关", start);
        }
        boolean acquired = false;
        long deadline = start + totalTimeout.toNanos();
        try {
            validateConfiguration();
            if (evaluationScript == null || bytes(evaluationScript) > 1024 * 1024) throw new IllegalArgumentException("测试配置缺失或过大");
            JsonNode spec = mapper.readTree(evaluationScript);
            if (spec == null || !spec.isObject() || !spec.path("cases").isArray() || spec.path("cases").size() > 64) {
                throw new IllegalArgumentException("题目 cases 必须为数组，最多 64 个用例");
            }
            ArrayNode cases = (ArrayNode) spec.get("cases");
            // Validate every batch before starting any billable provider work.
            List<ObjectNode> tests = prepareTests(cases);
            String program = cases.isEmpty() ? userCode : wrappedProgram(userCode);
            if (bytes(program) > 100000) throw new IllegalArgumentException("适配后的代码超过 OnlineCompiler 100 KB 限制");
            if (!Double.isFinite(timeLimitSec) || timeLimitSec <= 0 || timeLimitSec > 5) {
                throw new IllegalArgumentException("单个用例运行时限必须大于 0 且不超过 5 秒");
            }
            acquired = requests.tryAcquire(100, TimeUnit.MILLISECONDS);
            if (!acquired) return result("SYSTEM_BUSY", "判题服务繁忙，请稍后重试；本次未提交远程执行", start);
            if (cases.isEmpty()) return executeOnly(userCode, timeLimitSec, deadline, start);
            int passed = 0;
            StringBuilder details = new StringBuilder();
            for (int offset = 0; offset < tests.size(); offset += batchSize) {
                List<ObjectNode> batch = tests.subList(offset, Math.min(offset + batchSize, tests.size()));
                ObjectNode body = commonBody(program, timeLimitSec);
                body.set("tests", mapper.valueToTree(batch));
                body.put("checker", "exact"); body.put("scoring", "all_or_nothing"); body.put("stop_on_failure", true);
                long requestCap = batch.size() <= 2 ? Duration.ofSeconds(60).toNanos() : batchTimeout.toNanos();
                JsonNode response = post("/api/run-tests/", body, deadline, Math.min(requestCap, batchTimeout.toNanos()));
                BatchResult assessed = assessBatch(response, batch, offset);
                passed += assessed.passed();
                append(details, assessed.message());
                if (!"ACCEPTED".equals(assessed.status())) {
                    return result(assessed.status(), passed + "/" + tests.size() + " 个用例通过；未记录通关。\n" + details, start);
                }
            }
            if (System.nanoTime() >= deadline) throw new TimeoutException();
            return result("ACCEPTED", passed + "/" + tests.size() + " 个用例通过\n" + details, start);
        } catch (ProviderFailure exception) {
            return result(exception.status, exception.getMessage(), start);
        } catch (HttpTimeoutException | TimeoutException exception) {
            return result("SERVICE_UNAVAILABLE", "判题服务等待超时，未完成全部用例，不记录通关；不会自动重试或重复计费", start);
        } catch (InterruptedException exception) {
            Thread.currentThread().interrupt();
            return result("SERVICE_UNAVAILABLE", "判题请求已中断，未完成全部用例，不记录通关", start);
        } catch (IllegalArgumentException exception) {
            return result("SYSTEM_ERROR", exception.getMessage(), start);
        } catch (Exception exception) {
            // No raw provider bodies, authorization headers, code or hidden inputs in logs/messages.
            return result("SERVICE_UNAVAILABLE", "OnlineCompiler 判题服务暂时不可用，本次未记录通关", start);
        } finally {
            if (acquired) requests.release();
        }
    }

    private void validateConfiguration() {
        String key = apiKey.trim();
        if (key.isEmpty() || key.chars().anyMatch(value -> value < 33 || value > 126)) {
            throw new IllegalArgumentException("OnlineCompiler API Key 配置格式无效");
        }
        URI uri;
        try { uri = URI.create(baseUrl); }
        catch (RuntimeException exception) { throw new IllegalArgumentException("OnlineCompiler base-url 配置格式无效"); }
        if (!"https".equalsIgnoreCase(uri.getScheme()) || uri.getHost() == null || uri.getUserInfo() != null
                || uri.getRawQuery() != null || uri.getRawFragment() != null
                || (uri.getPath() != null && !Set.of("", "/").contains(uri.getPath()))) {
            throw new IllegalArgumentException("OnlineCompiler base-url 必须是 HTTPS 服务地址");
        }
        if (compiler == null || !compiler.matches("python-[A-Za-z0-9.-]+")) throw new IllegalArgumentException("函数适配仅支持配置 Python compiler");
        if (batchSize < 1 || batchSize > 8) throw new IllegalArgumentException("OnlineCompiler batch-size 必须在 1 到 8 之间");
    }

    private ObjectNode commonBody(String code, double seconds) {
        ObjectNode body = mapper.createObjectNode();
        body.put("compiler", compiler); body.put("code", code); body.put("time_limit", seconds);
        return body;
    }

    private JudgementResult executeOnly(String code, double seconds, long deadline, long start) throws Exception {
        ObjectNode body = commonBody(code, seconds); body.put("input", "");
        JsonNode response = post("/api/run-code-sync/", body, deadline, Duration.ofSeconds(35).toNanos());
        if (!response.isObject() || !response.path("status").isTextual() || !response.path("exit_code").isIntegralNumber()
                || !response.path("output").isTextual() || !response.path("error").isTextual() || !response.path("truncated").isBoolean()) {
            return result("SYSTEM_ERROR", "执行服务返回格式不完整，未判定通过", start);
        }
        int exit = response.path("exit_code").asInt(-1);
        if (exit == 124) return result("TIME_LIMIT_EXCEEDED", "程序运行超出时限", start);
        if (response.path("truncated").asBoolean()) return result("OUTPUT_LIMIT_EXCEEDED", "程序输出已截断，无法展示完整结果", start);
        if (exit != 0 || !"success".equals(response.path("status").asText()) || hasSignal(response)) {
            return result("RUNTIME_ERROR", "程序执行失败\n" + response.path("error").asText(), start);
        }
        return result("EXECUTED", "程序已真实执行；本题暂无测试用例，不判定通关。\n"
                + response.path("output").asText() + (response.path("error").asText().isEmpty() ? "" : "\n标准错误：\n" + response.path("error").asText()), start);
    }

    private List<ObjectNode> prepareTests(ArrayNode cases) throws IOException {
        List<ObjectNode> tests = new ArrayList<>();
        int combinedBytes = 0;
        for (JsonNode test : cases) {
            if (!test.isObject()) throw new IllegalArgumentException("每个测试用例必须是对象");
            boolean exception = test.has("expectedException");
            if (exception && (test.has("expected") || test.has("expectedOutput"))) throw new IllegalArgumentException("expectedException 不能与 expected 同时配置");
            if (!exception && !test.has("expected") && !test.has("expectedOutput")) throw new IllegalArgumentException("用例缺少 expected 或 expectedException");
            if (test.has("hidden") && !test.get("hidden").isBoolean()) throw new IllegalArgumentException("hidden 必须为布尔值");
            String mode = test.path("mode").asText("function");
            if (!Set.of("function", "stdin").contains(mode)) throw new IllegalArgumentException("mode 必须为 function 或 stdin");
            ObjectNode input = mapper.createObjectNode(); input.put("mode", mode); input.put("capture_exception", exception);
            if (mode.equals("stdin")) {
                JsonNode stdin = test.has("stdin") ? test.get("stdin") : test.path("input");
                if (!stdin.isMissingNode() && !stdin.isTextual()) throw new IllegalArgumentException("stdin 模式 input/stdin 必须为字符串");
                input.put("stdin", stdin.asText(""));
            } else {
                ArrayNode args = mapper.createArrayNode();
                if (test.has("args")) {
                    if (!test.get("args").isArray()) throw new IllegalArgumentException("args 必须为数组");
                    args = (ArrayNode) test.get("args");
                } else if (test.has("input") && !(test.get("input").isTextual() && test.get("input").asText().isEmpty())) {
                    JsonNode value = test.get("input");
                    if (value.isTextual()) {
                        try { JsonNode parsed = mapper.readTree(value.asText()); if (parsed != null) value = parsed; } catch (IOException ignored) { }
                    }
                    args.add(value);
                }
                JsonNode kwargs = test.has("kwargs") ? test.get("kwargs") : mapper.createObjectNode();
                if (!kwargs.isObject()) throw new IllegalArgumentException("kwargs 必须为对象");
                input.set("args", args); input.set("kwargs", kwargs);
                String entry = test.path("function").asText(test.path("entryPoint").asText(""));
                if (!entry.isEmpty() && !entry.matches("[A-Za-z][A-Za-z0-9_]*(\\.[A-Za-z][A-Za-z0-9_]*)?")) throw new IllegalArgumentException("function/entryPoint 必须为公开函数名或 Solution.method");
                input.put("function", entry);
            }
            ObjectNode expected = mapper.createObjectNode();
            if (exception) {
                if (!test.get("expectedException").isTextual() || !test.get("expectedException").asText().matches("[A-Za-z][A-Za-z0-9_]*")) throw new IllegalArgumentException("expectedException 必须为异常类名");
                expected.set("exception", test.get("expectedException"));
            } else {
                JsonNode value = test.has("expected") ? test.get("expected") : test.get("expectedOutput");
                if (mode.equals("stdin") && !value.isTextual()) throw new IllegalArgumentException("stdin 模式 expected 必须为字符串");
                boolean legacy = !test.has("args") && !test.has("kwargs") && !test.has("mode");
                if (legacy && value.isTextual()) {
                    String text = value.asText();
                    if (text.equals("True")) value = BooleanNode.TRUE;
                    else if (text.equals("False")) value = BooleanNode.FALSE;
                    else if (text.equals("None")) value = NullNode.instance;
                    else try { JsonNode parsed = mapper.readTree(text); if (parsed != null) value = parsed; } catch (IOException ignored) { }
                }
                expected.set("value", value);
            }
            String in = mapper.writeValueAsString(input), out = canonical(expected);
            if (bytes(in) > 100000 || bytes(out) > 65536) throw new IllegalArgumentException("测试输入或预期结果超过 OnlineCompiler 大小限制");
            combinedBytes += bytes(in) + bytes(out);
            if (combinedBytes > 1024 * 1024) throw new IllegalArgumentException("测试输入和预期输出合计超过 1 MiB");
            ObjectNode nativeTest = mapper.createObjectNode();
            nativeTest.put("input", in); nativeTest.put("expected_output", out); nativeTest.put("hidden", test.path("hidden").asBoolean(false));
            tests.add(nativeTest);
        }
        return tests;
    }

    private String wrappedProgram(String source) throws IOException {
        try (var stream = getClass().getResourceAsStream("/sandbox/onlinecompiler_adapter.py")) {
            if (stream == null) throw new IOException("OnlineCompiler adapter unavailable");
            return new String(stream.readAllBytes(), StandardCharsets.UTF_8)
                    .replace("__PARTJAVA_SOURCE_B64__", Base64.getEncoder().encodeToString(source.getBytes(StandardCharsets.UTF_8)));
        }
    }

    /** Same JSON spelling as the Python adapter: sorted object keys and plain finite decimal numbers. */
    private String canonical(JsonNode node) throws IOException {
        if (node.isNumber()) {
            return node.decimalValue().stripTrailingZeros().toPlainString();
        }
        if (node.isArray()) {
            List<String> values = new ArrayList<>(); for (JsonNode value : node) values.add(canonical(value));
            return "[" + String.join(",", values) + "]";
        }
        if (node.isObject()) {
            List<String> keys = new ArrayList<>(); node.fieldNames().forEachRemaining(keys::add); keys.sort((left, right) -> Arrays.compare(left.codePoints().toArray(), right.codePoints().toArray()));
            List<String> values = new ArrayList<>(); for (String key : keys) values.add(mapper.writeValueAsString(key) + ":" + canonical(node.get(key)));
            return "{" + String.join(",", values) + "}";
        }
        return mapper.writeValueAsString(node);
    }

    private record BatchResult(String status, int passed, String message) {}
    private BatchResult assessBatch(JsonNode response, List<ObjectNode> batch, int offset) {
        if (!response.isObject() || !response.path("verdict").isTextual() || !response.path("total").isIntegralNumber()
                || !response.path("passed").isIntegralNumber() || response.path("total").asInt(-1) != batch.size()
                || !response.path("tests").isArray() || response.path("tests").size() != batch.size()) {
            return new BatchResult("SYSTEM_ERROR", 0, "判题服务未返回全部用例，未判定通过\n");
        }
        StringBuilder detail = new StringBuilder();
        String firstFailure = null; int accepted = 0;
        Set<String> verdicts = Set.of("accepted", "wrong_answer", "compilation_error", "runtime_error", "time_limit_exceeded", "memory_limit_exceeded", "output_limit_exceeded", "internal_error", "skipped");
        for (int i = 0; i < batch.size(); i++) {
            JsonNode test = response.path("tests").get(i);
            String verdict = test.path("verdict").asText("");
            if (!verdicts.contains(verdict) || !test.path("hidden").isBoolean()
                    || test.path("hidden").asBoolean() != batch.get(i).path("hidden").asBoolean()) {
                return new BatchResult("SYSTEM_ERROR", accepted, "判题服务返回无效的用例结果\n");
            }
            if (verdict.equals("accepted")) {
                if ((test.has("exit_code") && (!test.path("exit_code").isIntegralNumber() || test.path("exit_code").asInt(-1) != 0)) || hasSignal(test)) {
                    return new BatchResult("SYSTEM_ERROR", accepted, "判题服务通过结果包含异常退出状态\n");
                }
                accepted++;
            }
            else if (firstFailure == null || firstFailure.equals("skipped")) firstFailure = verdict;
            append(detail, "用例 " + (offset + i + 1) + (batch.get(i).path("hidden").asBoolean() ? "（隐藏）" : "") + "：" + verdict + "\n");
            // Trust our own hidden flag, never a provider field, before exposing any diagnostic.
            if (!batch.get(i).path("hidden").asBoolean() && !verdict.equals("accepted") && !verdict.equals("skipped")) {
                if (test.path("output").isTextual() && !test.path("output").asText().isEmpty()) append(detail, "输出：" + test.path("output").asText() + "\n");
                if (test.path("error").isTextual() && !test.path("error").asText().isEmpty()) append(detail, "诊断：" + test.path("error").asText() + "\n");
            }
        }
        if (response.path("passed").asInt(-1) != accepted) return new BatchResult("SYSTEM_ERROR", accepted, "判题服务通过数量不一致\n");
        String overall = response.path("verdict").asText();
        if (overall.equals("accepted")) {
            if (accepted != batch.size()) return new BatchResult("SYSTEM_ERROR", accepted, "部分用例尚未通过，不判定通关\n");
            return new BatchResult("ACCEPTED", accepted, detail.toString());
        }
        if (overall.equals("incomplete") || ("skipped".equals(firstFailure))) {
            return new BatchResult("SYSTEM_BUSY", accepted, detail + "远程判题未完成全部用例，请稍后重试；本次未记录通关\n");
        }
        if (firstFailure == null || !overall.equals(firstFailure)) return new BatchResult("SYSTEM_ERROR", accepted, "判题服务总体结果与用例结果不一致\n");
        String status = switch (overall) {
            case "wrong_answer" -> "WRONG_ANSWER";
            case "compilation_error" -> "COMPILE_ERROR";
            case "runtime_error", "memory_limit_exceeded" -> "RUNTIME_ERROR";
            case "time_limit_exceeded" -> "TIME_LIMIT_EXCEEDED";
            case "output_limit_exceeded" -> "OUTPUT_LIMIT_EXCEEDED";
            default -> "SYSTEM_ERROR";
        };
        boolean visible = batch.stream().noneMatch(test -> test.path("hidden").asBoolean());
        if (visible && overall.equals("compilation_error") && response.path("compile_error").isTextual()) append(detail, response.path("compile_error").asText() + "\n");
        if (overall.equals("runtime_error")) append(detail, "请检查程序、函数入口及 args/kwargs 参数配置。\n");
        if (overall.equals("memory_limit_exceeded")) append(detail, "程序超过运行内存限制。\n");
        return new BatchResult(status, accepted, detail.toString());
    }

    private JsonNode post(String path, JsonNode body, long deadline, long capNanos) throws Exception {
        long remaining = Math.min(capNanos, deadline - System.nanoTime());
        if (remaining <= 0) throw new TimeoutException();
        HttpRequest request = HttpRequest.newBuilder(URI.create(baseUrl.replaceAll("/+$", "") + path))
                .timeout(Duration.ofNanos(remaining)).header("Authorization", apiKey.trim())
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(mapper.writeValueAsString(body), StandardCharsets.UTF_8)).build();
        CompletableFuture<HttpResponse<String>> pending = client.sendAsync(request, info -> new BoundedBodySubscriber());
        HttpResponse<String> response;
        try { response = pending.get(remaining, TimeUnit.NANOSECONDS); }
        catch (TimeoutException | InterruptedException exception) { pending.cancel(true); throw exception; }
        catch (ExecutionException exception) {
            if (exception.getCause() instanceof HttpTimeoutException) throw new TimeoutException();
            throw exception;
        }
        if (System.nanoTime() >= deadline) throw new TimeoutException();
        if (response.statusCode() != 200) {
            throw switch (response.statusCode()) {
                case 429 -> new ProviderFailure("SYSTEM_BUSY", "OnlineCompiler 配额、待处理任务或并发已达限制，请稍后重试；未记录通关");
                case 401, 403 -> new ProviderFailure("SERVICE_UNAVAILABLE", "OnlineCompiler 授权不可用，请管理员检查 API Key；未记录通关");
                case 400, 413, 422 -> new ProviderFailure("SYSTEM_ERROR", "OnlineCompiler 拒绝判题配置，请管理员检查编译器、用例大小和时限；未记录通关");
                default -> new ProviderFailure("SERVICE_UNAVAILABLE", "OnlineCompiler 服务暂时不可用，请稍后重试；未记录通关");
            };
        }
        if (response.body() == null || bytes(response.body()) > MAX_RESPONSE) throw new ProviderFailure("SYSTEM_ERROR", "判题服务返回内容超过大小限制");
        JsonNode json = mapper.readTree(response.body());
        if (json == null) throw new ProviderFailure("SYSTEM_ERROR", "判题服务返回空响应");
        return json;
    }

    private static boolean hasSignal(JsonNode response) {
        JsonNode signal = response.path("signal");
        return !signal.isMissingNode() && !signal.isNull() && !signal.asText().isBlank() && !signal.asText().equals("0");
    }
    private static int bytes(String value) { return value.getBytes(StandardCharsets.UTF_8).length; }
    private static void append(StringBuilder target, String value) {
        if (target.length() < MAX_MESSAGE) target.append(value, 0, Math.min(value.length(), MAX_MESSAGE - target.length()));
    }
    private static JudgementResult result(String status, String message, long start) {
        return new JudgementResult(status, message.length() <= MAX_MESSAGE ? message : message.substring(0, MAX_MESSAGE),
                TimeUnit.NANOSECONDS.toMillis(System.nanoTime() - start));
    }
    private static class ProviderFailure extends Exception {
        private final String status;
        ProviderFailure(String status, String message) { super(message); this.status = status; }
    }
    private static class BoundedBodySubscriber implements HttpResponse.BodySubscriber<String> {
        private final CompletableFuture<String> body = new CompletableFuture<>();
        private final ByteArrayOutputStream bytes = new ByteArrayOutputStream();
        private Flow.Subscription subscription;
        public CompletionStage<String> getBody() { return body; }
        public void onSubscribe(Flow.Subscription value) { subscription = value; value.request(1); }
        public void onNext(List<ByteBuffer> buffers) {
            for (ByteBuffer buffer : buffers) {
                if (buffer.remaining() > MAX_RESPONSE - bytes.size()) {
                    subscription.cancel(); body.completeExceptionally(new IOException("Provider response too large")); return;
                }
                byte[] chunk = new byte[buffer.remaining()]; buffer.get(chunk); bytes.writeBytes(chunk);
            }
            subscription.request(1);
        }
        public void onError(Throwable error) { body.completeExceptionally(error); }
        public void onComplete() { body.complete(bytes.toString(StandardCharsets.UTF_8)); }
    }
}

package com.partjava.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;
import java.net.http.*;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.*;
import java.util.concurrent.Flow;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class ExecuteCodeControllerTest {
    private final HttpClient transport = mock(HttpClient.class);
    private final ExecuteCodeController controller = new ExecuteCodeController();

    private ExecuteCodeController configured() {
        ReflectionTestUtils.setField(controller, "apiKey", "local-test-secret");
        ReflectionTestUtils.setField(controller, "apiHost", "judge0.invalid");
        ReflectionTestUtils.setField(controller, "httpClient", transport);
        ReflectionTestUtils.setField(controller, "totalTimeout", Duration.ofMillis(80));
        ReflectionTestUtils.setField(controller, "pollInterval", Duration.ofMillis(2));
        return controller;
    }
    private ExecuteCodeController.ExecuteCodeReq request() {
        var req = new ExecuteCodeController.ExecuteCodeReq();
        req.setCode("print(input())"); req.setLanguage("python"); req.setInput("hello\n");
        return req;
    }
    @SuppressWarnings("unchecked")
    private java.util.concurrent.CompletableFuture<HttpResponse<String>> response(int status, String body) {
        return java.util.concurrent.CompletableFuture.completedFuture(new HttpResponse<String>() {
            public int statusCode() { return status; }
            public String body() { return body; }
            public HttpRequest request() { return null; }
            public Optional<HttpResponse<String>> previousResponse() { return Optional.empty(); }
            public HttpHeaders headers() { return HttpHeaders.of(Map.of(), (a,b) -> true); }
            public Optional<javax.net.ssl.SSLSession> sslSession() { return Optional.empty(); }
            public java.net.URI uri() { return java.net.URI.create("https://judge0.invalid"); }
            public HttpClient.Version version() { return HttpClient.Version.HTTP_1_1; }
        });
    }
    private String terminal(int id, String stdout, String error) throws Exception {
        return new ObjectMapper().writeValueAsString(Map.of("status", Map.of("id", id),
                "stdout", Base64.getEncoder().encodeToString(stdout.getBytes(StandardCharsets.UTF_8)),
                "stderr", Base64.getEncoder().encodeToString(error.getBytes(StandardCharsets.UTF_8)),
                "compile_output", Base64.getEncoder().encodeToString(error.getBytes(StandardCharsets.UTF_8)),
                "time", "0.03", "memory", 1234));
    }
    private void replies(String terminal) throws Exception {
        when(transport.sendAsync(any(HttpRequest.class), any(HttpResponse.BodyHandler.class)))
                .thenReturn(response(201, "{\"token\":\"local-token\"}"), response(200, terminal));
    }
    @Test void unresponsiveTransportIsCanceledByTotalDeadline() throws Exception {
        configured();
        java.util.concurrent.CompletableFuture<HttpResponse<String>> pending = new java.util.concurrent.CompletableFuture<>();
        when(transport.sendAsync(any(HttpRequest.class), any(HttpResponse.BodyHandler.class))).thenReturn(pending);
        var result = assertTimeoutPreemptively(Duration.ofSeconds(2), () -> controller.executeCode(request()));
        assertFalse(result.getSuccess()); assertEquals("SYSTEM_BUSY", result.getStatus());
        assertTrue(pending.isCancelled());
    }
    @Test void oversizedProviderResponseIsCanceledBeforeBufferingIt() throws Exception {
        var type = Class.forName("com.partjava.controller.ExecuteCodeController$BoundedBodySubscriber");
        var constructor = type.getDeclaredConstructor(); constructor.setAccessible(true);
        @SuppressWarnings("unchecked")
        var subscriber = (HttpResponse.BodySubscriber<String>) constructor.newInstance();
        var subscription = mock(Flow.Subscription.class);
        subscriber.onSubscribe(subscription);
        subscriber.onNext(List.of(ByteBuffer.allocate(256 * 1024 + 1)));
        verify(subscription).cancel();
        assertTrue(subscriber.getBody().toCompletableFuture().isCompletedExceptionally());
    }
    @Test void transportExceptionAndRateLimitingAreExplicitFailures() throws Exception {
        configured();
        when(transport.sendAsync(any(HttpRequest.class), any(HttpResponse.BodyHandler.class)))
                .thenReturn(java.util.concurrent.CompletableFuture.failedFuture(new java.io.IOException("sensitive details")));
        var failed = controller.executeCode(request());
        assertFalse(failed.getSuccess()); assertEquals("SERVICE_UNAVAILABLE", failed.getStatus());
        assertFalse(failed.getError().contains("sensitive"));
        when(transport.sendAsync(any(HttpRequest.class), any(HttpResponse.BodyHandler.class)))
                .thenReturn(response(429, "private quota details"));
        var limited = controller.executeCode(request());
        assertFalse(limited.getSuccess()); assertEquals("SYSTEM_BUSY", limited.getStatus());
    }
    @Test void missingProviderKeyNeverPretendsCodeRan() {
        ReflectionTestUtils.setField(controller, "apiKey", "");
        var result = controller.executeCode(request());
        assertFalse(result.getSuccess()); assertEquals("SERVICE_UNAVAILABLE", result.getStatus());
        assertEquals("", result.getOutput()); verifyNoInteractions(transport);
    }
    @Test void providerHttpFailureNeverReturnsItsBodyOrFakeOutput() throws Exception {
        configured();
        when(transport.sendAsync(any(HttpRequest.class), any(HttpResponse.BodyHandler.class)))
                .thenReturn(response(403, "secret provider body"));
        var result = controller.executeCode(request());
        assertFalse(result.getSuccess()); assertEquals("SERVICE_UNAVAILABLE", result.getStatus());
        assertEquals("", result.getOutput()); assertFalse(result.getError().contains("secret"));
    }
    @Test void queuedOrProcessingUntilDeadlineIsBusyAndNeverAccepted() throws Exception {
        configured(); replies("{\"status\":{\"id\":2}}");
        var result = assertTimeoutPreemptively(Duration.ofSeconds(2), () -> controller.executeCode(request()));
        assertFalse(result.getSuccess()); assertEquals("SYSTEM_BUSY", result.getStatus());
        assertEquals("", result.getOutput());
    }
    @Test void compilerFailureIsUnsuccessfulWithDecodedDiagnostic() throws Exception {
        configured(); replies(terminal(6, "", "Syntax error"));
        var result = controller.executeCode(request());
        assertFalse(result.getSuccess()); assertEquals("COMPILE_ERROR", result.getStatus());
        assertEquals("Syntax error", result.getError());
    }
    @Test void onlyAcceptedExecutionSucceedsAndStdinAndLanguageReachProvider() throws Exception {
        configured(); replies(terminal(3, "hello\n", ""));
        var result = controller.executeCode(request());
        assertTrue(result.getSuccess()); assertEquals("ACCEPTED", result.getStatus());
        assertEquals("hello\n", result.getOutput()); assertEquals(0.03, result.getTime());
        var captor = org.mockito.ArgumentCaptor.forClass(HttpRequest.class);
        verify(transport, times(2)).sendAsync(captor.capture(), any(HttpResponse.BodyHandler.class));
        HttpRequest submission = captor.getAllValues().getFirst();
        assertTrue(submission.uri().getQuery().contains("wait=false"));
        assertTrue(submission.timeout().orElseThrow().toMillis() <= 80);
        var bytes = new java.io.ByteArrayOutputStream();
        submission.bodyPublisher().orElseThrow().subscribe(new Flow.Subscriber<ByteBuffer>() {
            public void onSubscribe(Flow.Subscription s) { s.request(Long.MAX_VALUE); }
            public void onNext(ByteBuffer b) { byte[] value = new byte[b.remaining()]; b.get(value); bytes.writeBytes(value); }
            public void onError(Throwable t) { fail(t); }
            public void onComplete() { }
        });
        var body = new ObjectMapper().readTree(bytes.toString(StandardCharsets.UTF_8));
        assertEquals(71, body.path("language_id").asInt()); assertEquals("hello\n", body.path("stdin").asText());
        assertFalse(body.path("enable_network").asBoolean());
    }
    @Test void runtimeLimitAndUnknownStatusesNeverSucceed() throws Exception {
        configured();
        for (var entry : Map.of(5,"TIME_LIMIT_EXCEEDED",7,"RUNTIME_ERROR",8,"OUTPUT_LIMIT_EXCEEDED",11,"RUNTIME_ERROR",12,"SYSTEM_ERROR",13,"SYSTEM_ERROR",0,"SYSTEM_ERROR",4,"SYSTEM_ERROR").entrySet()) {
            replies(terminal(entry.getKey(), "", "failure"));
            var result = controller.executeCode(request());
            assertFalse(result.getSuccess()); assertEquals(entry.getValue(), result.getStatus());
        }
    }
    @Test void invalidTokenAndMalformedEncodingCannotBecomeSuccess() throws Exception {
        configured();
        when(transport.sendAsync(any(HttpRequest.class), any(HttpResponse.BodyHandler.class)))
                .thenReturn(response(201, "{\"token\":\"../oops\"}"));
        assertEquals("SYSTEM_ERROR", controller.executeCode(request()).getStatus());
        replies("{\"status\":{\"id\":3},\"stdout\":\"!notbase64!\"}");
        assertFalse(controller.executeCode(request()).getSuccess());
    }
    @Test void outputLimitAndInputLimitsAreExplicitFailures() throws Exception {
        configured(); replies(terminal(3, "a".repeat(65537), ""));
        var result = controller.executeCode(request());
        assertFalse(result.getSuccess()); assertEquals("OUTPUT_LIMIT_EXCEEDED", result.getStatus());
        assertEquals(65536, result.getOutput().length());
        reset(transport);
        var req = request(); req.setCode("a".repeat(65537));
        assertFalse(controller.executeCode(req).getSuccess());
        req = request(); req.setInput("a".repeat(16385));
        assertFalse(controller.executeCode(req).getSuccess()); verifyNoInteractions(transport);
    }
}

package com.partjava.service.impl;

import com.fasterxml.jackson.databind.*;
import com.fasterxml.jackson.databind.node.*;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;
import java.io.ByteArrayOutputStream;
import java.net.URI;
import java.net.http.*;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.*;
import java.util.concurrent.*;
import java.util.concurrent.Flow;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class OnlineCompilerSandboxTest {
 private final ObjectMapper mapper = new ObjectMapper();
 private final HttpClient transport = mock(HttpClient.class);
 private final SandboxServiceImpl sandbox = new SandboxServiceImpl(transport);
 private final List<HttpRequest> sent = new ArrayList<>();
 private final Deque<CompletableFuture<HttpResponse<String>>> replies = new ArrayDeque<>();
 private static final String SOURCE = "def solve(*args, **kwargs): return 3";
 private void configured() {
  ReflectionTestUtils.setField(sandbox,"apiKey","local-raw-key");
  when(transport.sendAsync(any(HttpRequest.class),any(HttpResponse.BodyHandler.class))).thenAnswer(invocation -> {
   sent.add(invocation.getArgument(0));
   if(replies.isEmpty()) throw new AssertionError("Unexpected remote call");
   return replies.removeFirst();
  });
 }
 private CompletableFuture<HttpResponse<String>> http(int status,String body) {
  return CompletableFuture.completedFuture(new HttpResponse<String>() {
   public int statusCode(){return status;} public String body(){return body;}
   public HttpRequest request(){return null;} public Optional<HttpResponse<String>> previousResponse(){return Optional.empty();}
   public HttpHeaders headers(){return HttpHeaders.of(Map.of(),(a,b)->true);}
   public Optional<javax.net.ssl.SSLSession> sslSession(){return Optional.empty();}
   public URI uri(){return URI.create("https://api.onlinecompiler.io");}
   public HttpClient.Version version(){return HttpClient.Version.HTTP_1_1;}
  });
 }
 private ObjectNode test(String verdict,boolean hidden) {
  ObjectNode node=mapper.createObjectNode();node.put("verdict",verdict);node.put("hidden",hidden);return node;
 }
 private ObjectNode batch(String overall,ObjectNode... tests) {
  ObjectNode node=mapper.createObjectNode();node.put("verdict",overall);node.put("total",tests.length);
  node.put("passed",Arrays.stream(tests).filter(t->t.path("verdict").asText().equals("accepted")).count());
  node.set("tests",mapper.valueToTree(tests));return node;
 }
 private void enqueue(JsonNode body) throws Exception {replies.add(http(200,mapper.writeValueAsString(body)));}
 private String spec(int count) throws Exception {
  ArrayNode cases=mapper.createArrayNode();
  for(int i=0;i<count;i++){ObjectNode test=mapper.createObjectNode();test.put("function","solve");test.set("args",mapper.createArrayNode().add(i));test.put("expected",3);cases.add(test);}
  return mapper.writeValueAsString(Map.of("cases",cases));
 }
 private JsonNode requestBody(int index) throws Exception {
  ByteArrayOutputStream out=new ByteArrayOutputStream();
  sent.get(index).bodyPublisher().orElseThrow().subscribe(new Flow.Subscriber<ByteBuffer>(){
   public void onSubscribe(Flow.Subscription s){s.request(Long.MAX_VALUE);} public void onNext(ByteBuffer b){byte[] bytes=new byte[b.remaining()];b.get(bytes);out.writeBytes(bytes);}
   public void onError(Throwable t){fail(t);}public void onComplete(){}
  });
  return mapper.readTree(out.toString(StandardCharsets.UTF_8));
 }
 @Test void rejectsSourceAbove64KiBBeforeAnyExecution() {
  assertEquals("SYSTEM_ERROR",sandbox.evaluateCode("x".repeat(65537),"{\"cases\":[]}",5).getStatus());verifyNoInteractions(transport);
 }
 @Test void missingKeyIsExplicitAndNeverCallsAnyProvider() throws Exception {
  var result=sandbox.evaluateCode(SOURCE,spec(1),5);
  assertEquals("SERVICE_UNAVAILABLE",result.getStatus());verifyNoInteractions(transport);
 }
 @Test void nativeRequestUsesRawAuthorizationAndTypedExpectedValuesOutsideProgram() throws Exception {
  configured();enqueue(batch("accepted",test("accepted",true)));
  String cases="{\"cases\":[{\"entryPoint\":\"solve\",\"args\":[1,2],\"kwargs\":{},\"expected\":\"hidden-secret\",\"hidden\":true}]}";
  assertEquals("ACCEPTED",sandbox.evaluateCode(SOURCE,cases,5).getStatus());
  HttpRequest req=sent.getFirst();assertEquals("https://api.onlinecompiler.io/api/run-tests/",req.uri().toString());
  assertEquals("local-raw-key",req.headers().firstValue("Authorization").orElseThrow());
  assertTrue(req.timeout().orElseThrow().toSeconds()<=60);
  var body=requestBody(0);assertEquals("python-3.14",body.path("compiler").asText());assertEquals("exact",body.path("checker").asText());
  assertEquals("all_or_nothing",body.path("scoring").asText());assertTrue(body.path("stop_on_failure").asBoolean());assertEquals(5,body.path("time_limit").asInt());
  String wrapped=body.path("code").asText();assertFalse(wrapped.contains("hidden-secret"));assertFalse(wrapped.contains("__PARTJAVA_SOURCE_B64__"));
  var nativeTest=body.path("tests").get(0);assertTrue(nativeTest.path("hidden").asBoolean());
  assertEquals("{\"value\":\"hidden-secret\"}",nativeTest.path("expected_output").asText());
  assertFalse(nativeTest.path("input").asText().contains("hidden-secret"));
  var input=mapper.readTree(nativeTest.path("input").asText());assertEquals("solve",input.path("function").asText());assertEquals(2,input.path("args").size());
 }
 @Test void moreThanEightCasesUseSequentialBatchesAndOnlyFinalSuccessIsAccepted() throws Exception {
  configured();ObjectNode[] first=new ObjectNode[8];Arrays.setAll(first,i->test("accepted",false));enqueue(batch("accepted",first));enqueue(batch("accepted",test("accepted",false)));
  assertEquals("ACCEPTED",sandbox.evaluateCode(SOURCE,spec(9),5).getStatus());assertEquals(2,sent.size());
  assertEquals(8,requestBody(0).path("tests").size());assertEquals(1,requestBody(1).path("tests").size());
 }
 @Test void laterBatchFailureNeverCreditsEarlierPassingBatch() throws Exception {
  configured();ObjectNode[] first=new ObjectNode[8];Arrays.setAll(first,i->test("accepted",false));enqueue(batch("accepted",first));enqueue(batch("wrong_answer",test("wrong_answer",false)));
  var result=sandbox.evaluateCode(SOURCE,spec(9),5);assertEquals("WRONG_ANSWER",result.getStatus());assertTrue(result.getMessage().contains("8/9"));assertEquals(2,sent.size());
 }
 @Test void firstFailureStopsBeforeAnotherBillableBatch() throws Exception {
  configured();ObjectNode[] first=new ObjectNode[8];Arrays.setAll(first,i->test(i==0?"wrong_answer":"skipped",false));enqueue(batch("wrong_answer",first));
  assertEquals("WRONG_ANSWER",sandbox.evaluateCode(SOURCE,spec(9),5).getStatus());assertEquals(1,sent.size());
 }
 @Test void missingPartialSkippedAndContradictoryResultsNeverPass() throws Exception {
  List<JsonNode> invalid=List.of(mapper.readTree("{}"),batch("accepted",test("accepted",false)),batch("accepted",test("accepted",false),test("skipped",false)),batch("accepted",test("accepted",false),test("wrong_answer",false)),batch("wrong_answer",test("accepted",false),test("accepted",false)));
  for(JsonNode response:invalid){configured();enqueue(response);assertNotEquals("ACCEPTED",sandbox.evaluateCode(SOURCE,spec(2),5).getStatus());}
 }
 @Test void incompleteBatchIsBusyAndNeverAutomaticallyRetried() throws Exception {
  configured();enqueue(batch("incomplete",test("accepted",false),test("skipped",false)));
  assertEquals("SYSTEM_BUSY",sandbox.evaluateCode(SOURCE,spec(2),5).getStatus());assertEquals(1,sent.size());
 }
 @Test void providerHttpErrorsHaveSafeExplicitStatusesAndNoRetries() throws Exception {
  for(var item:Map.of(401,"SERVICE_UNAVAILABLE",403,"SERVICE_UNAVAILABLE",429,"SYSTEM_BUSY",500,"SERVICE_UNAVAILABLE",400,"SYSTEM_ERROR").entrySet()){
   configured();replies.add(http(item.getKey(),"sensitive-provider-body local-raw-key"));
   var result=sandbox.evaluateCode(SOURCE,spec(1),5);assertEquals(item.getValue(),result.getStatus());assertFalse(result.getMessage().contains("sensitive-provider-body"));assertFalse(result.getMessage().contains("local-raw-key"));
  }
  assertEquals(5,sent.size());
 }
 @Test void nativeFailureVerdictsRemainDistinct() throws Exception {
  for(var item:Map.of("compilation_error","COMPILE_ERROR","runtime_error","RUNTIME_ERROR","time_limit_exceeded","TIME_LIMIT_EXCEEDED","output_limit_exceeded","OUTPUT_LIMIT_EXCEEDED","memory_limit_exceeded","RUNTIME_ERROR","internal_error","SYSTEM_ERROR").entrySet()){
   configured();enqueue(batch(item.getKey(),test(item.getKey(),false)));assertEquals(item.getValue(),sandbox.evaluateCode(SOURCE,spec(1),5).getStatus());
  }
 }
 @Test void hiddenOutputAndErrorAreNeverDisclosedEvenIfProviderSendsThem() throws Exception {
  configured();ObjectNode hidden=test("runtime_error",true);hidden.put("output","secret-output");hidden.put("error","secret-error");ObjectNode response=batch("runtime_error",hidden);response.put("compile_error","secret-compile");enqueue(response);
  String cases="{\"cases\":[{\"args\":[],\"expected\":3,\"hidden\":true}]}";
  var result=sandbox.evaluateCode(SOURCE,cases,5);assertEquals("RUNTIME_ERROR",result.getStatus());assertFalse(result.getMessage().contains("secret-"));
 }
 @Test void noCasesRunsRawSyncAndNeverAwardsCompletion() throws Exception {
  configured();enqueue(mapper.readTree("{\"status\":\"success\",\"exit_code\":0,\"output\":\"hello\\n\",\"error\":\"\",\"truncated\":false,\"signal\":null}"));
  var result=sandbox.evaluateCode("print('hello')","{\"cases\":[]}",5);assertEquals("EXECUTED",result.getStatus());assertTrue(result.getMessage().contains("hello"));
  assertTrue(sent.getFirst().uri().getPath().equals("/api/run-code-sync/"));assertEquals("print('hello')",requestBody(0).path("code").asText());assertEquals("",requestBody(0).path("input").asText());
 }
 @Test void syncMissingExitStatusOrTruncatedOutputDoesNotSucceed() throws Exception {
  configured();enqueue(mapper.readTree("{\"status\":\"success\",\"output\":\"x\",\"error\":\"\",\"truncated\":false}"));assertEquals("SYSTEM_ERROR",sandbox.evaluateCode("print(1)","{\"cases\":[]}",5).getStatus());
  enqueue(mapper.readTree("{\"status\":\"success\",\"exit_code\":0,\"output\":\"x\",\"error\":\"\",\"truncated\":true}"));assertEquals("OUTPUT_LIMIT_EXCEEDED",sandbox.evaluateCode("print(1)","{\"cases\":[]}",5).getStatus());
 }
 @Test void timeoutCancelsTransportWithoutClaimingStudentTimeout() throws Exception {
  configured();ReflectionTestUtils.setField(sandbox,"batchTimeout",Duration.ofMillis(20));
  CompletableFuture<HttpResponse<String>> pending=new CompletableFuture<>();replies.add(pending);
  var result=assertTimeoutPreemptively(Duration.ofSeconds(2),()->sandbox.evaluateCode(SOURCE,spec(1),5));
  assertEquals("SERVICE_UNAVAILABLE",result.getStatus());assertTrue(result.getMessage().contains("未完成全部用例"));assertTrue(pending.isCancelled());assertEquals(1,sent.size());
 }
 @Test void totalDeadlinePreventsPartialCompletionFromBecomingAccepted() throws Exception {
  configured();ReflectionTestUtils.setField(sandbox,"totalTimeout",Duration.ofMillis(35));
  ObjectNode[] first=new ObjectNode[8];Arrays.setAll(first,i->test("accepted",false));enqueue(batch("accepted",first));
  CompletableFuture<HttpResponse<String>> pending=new CompletableFuture<>();replies.add(pending);
  var result=assertTimeoutPreemptively(Duration.ofSeconds(2),()->sandbox.evaluateCode(SOURCE,spec(9),5));assertEquals("SERVICE_UNAVAILABLE",result.getStatus());assertTrue(pending.isCancelled());
 }
 @Test void malformedResponsesAndTransportExceptionsNeverFabricateSuccess() throws Exception {
  configured();replies.add(http(200,"not json"));assertNotEquals("ACCEPTED",sandbox.evaluateCode(SOURCE,spec(1),5).getStatus());
  replies.add(CompletableFuture.failedFuture(new java.io.IOException("secret key")));var result=sandbox.evaluateCode(SOURCE,spec(1),5);assertEquals("SERVICE_UNAVAILABLE",result.getStatus());assertFalse(result.getMessage().contains("secret key"));
 }
 @Test void invalidFinalCaseStopsBeforeAnyBillableRequest() throws Exception {
  configured();ObjectNode root=(ObjectNode)mapper.readTree(spec(9));((ObjectNode)root.path("cases").get(8)).put("args","not-array");
  assertEquals("SYSTEM_ERROR",sandbox.evaluateCode(SOURCE,root.toString(),5).getStatus());verify(transport,never()).sendAsync(any(HttpRequest.class),any(HttpResponse.BodyHandler.class));
 }
 @Test void canonicalEnvelopeSortsNestedKeysAndNormalizesNumbersWithoutUntrustedText() throws Exception {
  configured();enqueue(batch("accepted",test("accepted",false)));
  String cases="{\"cases\":[{\"args\":[],\"expected\":{\"z\":[1.0,0.000001,-0.0],\"a\":true}}]}";
  assertEquals("ACCEPTED",sandbox.evaluateCode(SOURCE,cases,5).getStatus());
  assertEquals("{\"value\":{\"a\":true,\"z\":[1,0.000001,0]}}",requestBody(0).path("tests").get(0).path("expected_output").asText());
 }
 @Test void expectedExceptionNameNeverReachesSubmittedProgramOrInput() throws Exception {
  configured();enqueue(batch("accepted",test("accepted",false)));
  assertEquals("ACCEPTED",sandbox.evaluateCode(SOURCE,"{\"cases\":[{\"args\":[],\"expectedException\":\"ValueError\"}]}",5).getStatus());
  var body=requestBody(0);var nativeTest=body.path("tests").get(0);assertEquals("{\"exception\":\"ValueError\"}",nativeTest.path("expected_output").asText());
  var input=mapper.readTree(nativeTest.path("input").asText());assertTrue(input.path("capture_exception").asBoolean());assertFalse(input.has("expectedException"));
 }
 @Test void stdinAndLegacySingleArgumentAreAdaptedWithoutGuessingMultipleArguments() throws Exception {
  configured();enqueue(batch("accepted",test("accepted",false),test("accepted",false)));
  String cases="{\"cases\":[{\"mode\":\"stdin\",\"input\":\"hello\\n\",\"expected\":\"hello\\n\"},{\"input\":\"[1,2]\",\"expected\":3}]}";
  assertEquals("ACCEPTED",sandbox.evaluateCode(SOURCE,cases,5).getStatus());var tests=requestBody(0).path("tests");
  assertEquals("hello\n",mapper.readTree(tests.get(0).path("input").asText()).path("stdin").asText());
  var args=mapper.readTree(tests.get(1).path("input").asText()).path("args");assertEquals(1,args.size());assertTrue(args.get(0).isArray());
 }
 @Test void maximumSourceStillFitsNativeHundredKilobyteCodeLimit() throws Exception {
  configured();enqueue(batch("accepted",test("accepted",false)));
  assertEquals("ACCEPTED",sandbox.evaluateCode("#".repeat(65536),spec(1),5).getStatus());assertTrue(requestBody(0).path("code").asText().getBytes(StandardCharsets.UTF_8).length<=100000);
 }
 @Test void oversizedProviderBodyIsRejectedEvenWhenTransportFixtureBypassesSubscriber() throws Exception {
  configured();replies.add(http(200," ".repeat(256*1024+1)));assertEquals("SYSTEM_ERROR",sandbox.evaluateCode(SOURCE,spec(1),5).getStatus());
 }
 @Test void malformedAuthorizationNeverLeaksConfiguredKey() throws Exception {
  configured();ReflectionTestUtils.setField(sandbox,"apiKey","secret-key\nbad-value");
  var result=sandbox.evaluateCode(SOURCE,spec(1),5);assertEquals("SYSTEM_ERROR",result.getStatus());assertFalse(result.getMessage().contains("secret-key"));assertEquals(0,sent.size());
 }
 @Test void acceptedVerdictWithFailureExitCodeOrSignalIsRejected() throws Exception {
  configured();ObjectNode test=test("accepted",false);test.put("exit_code",1);enqueue(batch("accepted",test));assertEquals("SYSTEM_ERROR",sandbox.evaluateCode(SOURCE,spec(1),5).getStatus());
  test=test("accepted",false);test.put("signal",9);enqueue(batch("accepted",test));assertEquals("SYSTEM_ERROR",sandbox.evaluateCode(SOURCE,spec(1),5).getStatus());
 }
 @Test void mixedVisibilityDoesNotExposeHiddenCompileDiagnostics() throws Exception {
  configured();ObjectNode response=batch("compilation_error",test("compilation_error",true),test("skipped",false));response.put("compile_error","hidden-compile-input");enqueue(response);
  String cases="{\"cases\":[{\"args\":[],\"expected\":3,\"hidden\":true},{\"args\":[],\"expected\":3}]}";
  var result=sandbox.evaluateCode(SOURCE,cases,5);assertEquals("COMPILE_ERROR",result.getStatus());assertFalse(result.getMessage().contains("hidden-compile-input"));
 }
 @Test void responseSubscriberCancelsBeforeBufferingBeyondCap() throws Exception {
  var type=Class.forName("com.partjava.service.impl.SandboxServiceImpl$BoundedBodySubscriber");var constructor=type.getDeclaredConstructor();constructor.setAccessible(true);
  @SuppressWarnings("unchecked") var subscriber=(HttpResponse.BodySubscriber<String>)constructor.newInstance();var subscription=mock(Flow.Subscription.class);subscriber.onSubscribe(subscription);subscriber.onNext(List.of(ByteBuffer.allocate(256*1024+1)));
  verify(subscription).cancel();assertTrue(subscriber.getBody().toCompletableFuture().isCompletedExceptionally());
 }
}
